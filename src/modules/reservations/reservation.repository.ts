import { prisma } from "../../../lib/prisma";
import { BookingStatus, Prisma } from "../../../generated/prisma/client";

interface FilterOptions {
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  pickupDateFrom?: string;
  pickupDateTo?: string;
  returnDateFrom?: string;
  returnDateTo?: string;
  phoneNumber?: string;
  customerEmail?: string;
}

export const findAllReservations = async (
  page: number,
  limit: number,
  filters: FilterOptions = {}
) => {
  const skip = (page - 1) * limit;

  // Build where clause dynamically based on filters
  const whereClause: Prisma.BookingWhereInput = {
    deletedAt: null,
  };

  if (filters.status) {
    whereClause.status = filters.status;
  }

  if (filters.pickupDateFrom || filters.pickupDateTo) {
    whereClause.pickupDate = {};
    if (filters.pickupDateFrom) {
      whereClause.pickupDate.gte = new Date(filters.pickupDateFrom);
    }
    if (filters.pickupDateTo) {
      // Include the entire end date by setting to end of day
      const endDate = new Date(filters.pickupDateTo);
      endDate.setHours(23, 59, 59, 999);
      whereClause.pickupDate.lte = endDate;
    }
  }

  if (filters.returnDateFrom || filters.returnDateTo) {
    whereClause.returnDate = {};
    if (filters.returnDateFrom) {
      whereClause.returnDate.gte = new Date(filters.returnDateFrom);
    }
    if (filters.returnDateTo) {
      const endDate = new Date(filters.returnDateTo);
      endDate.setHours(23, 59, 59, 999);
      whereClause.returnDate.lte = endDate;
    }
  }

  if (filters.phoneNumber) {
    whereClause.phoneNumber = {
      contains: filters.phoneNumber,
      mode: "insensitive",
    };
  }

  if (filters.customerEmail) {
    whereClause.customerEmail = {
      contains: filters.customerEmail,
      mode: "insensitive",
    };
  }

  // Fetch the paginated data and the total count concurrently
  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { vehicle: true },
      skip,
      take: limit,
    }),
    prisma.booking.count({
      where: whereClause,
    }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};