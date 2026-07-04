import { prisma } from "../../../lib/prisma";
export const findAllReservations = async (page, limit, filters = {}) => {
    const skip = (page - 1) * limit;
    const whereClause = {
        deletedAt: null,
    };
    if (filters.status)
        whereClause.status = filters.status;
    if (filters.pickupDateFrom || filters.pickupDateTo) {
        whereClause.pickupDate = {};
        if (filters.pickupDateFrom)
            whereClause.pickupDate.gte = new Date(filters.pickupDateFrom);
        if (filters.pickupDateTo) {
            const endDate = new Date(filters.pickupDateTo);
            endDate.setHours(23, 59, 59, 999);
            whereClause.pickupDate.lte = endDate;
        }
    }
    if (filters.returnDateFrom || filters.returnDateTo) {
        whereClause.returnDate = {};
        if (filters.returnDateFrom)
            whereClause.returnDate.gte = new Date(filters.returnDateFrom);
        if (filters.returnDateTo) {
            const endDate = new Date(filters.returnDateTo);
            endDate.setHours(23, 59, 59, 999);
            whereClause.returnDate.lte = endDate;
        }
    }
    if (filters.phoneNumber) {
        whereClause.phoneNumber = { contains: filters.phoneNumber, mode: "insensitive" };
    }
    if (filters.customerEmail) {
        whereClause.customerEmail = { contains: filters.customerEmail, mode: "insensitive" };
    }
    const [data, total] = await Promise.all([
        prisma.booking.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: { vehicle: true },
            skip,
            take: limit,
        }),
        prisma.booking.count({ where: whereClause }),
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
// --- ADDED MISSING FUNCTIONS BELOW ---
export const createReservation = async (data) => {
    return prisma.booking.create({
        data: {
            vehicleId: data.vehicleId,
            phoneNumber: data.phoneNumber,
            pickupDate: new Date(data.pickupDate),
            returnDate: new Date(data.returnDate),
            pickupLocationId: data.pickupLocationId,
            returnLocationId: data.returnLocationId,
            totalPrice: data.totalPrice,
            customerFirstName: data.customerFirstName,
            customerLastName: data.customerLastName,
            customerEmail: data.customerEmail,
            customerNotes: data.customerNotes,
            packageData: data.packageData,
            addonsData: data.addonsData,
        },
    });
};
export const findReservationById = async (id) => {
    return prisma.booking.findFirst({
        where: { id, deletedAt: null },
        include: { vehicle: true },
    });
};
export const updateReservation = async (id, data) => {
    return prisma.booking.update({
        where: { id },
        data,
    });
};
export const updateReservationStatus = async (id, status) => {
    return prisma.booking.update({
        where: { id },
        data: { status },
    });
};
export const updateReservationQuote = async (id, totalPrice) => {
    return prisma.booking.update({
        where: { id },
        data: { totalPrice },
    });
};
export const softDeleteReservation = async (id) => {
    return prisma.booking.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
export const findReservationsByPhoneNumber = async (phoneNumber) => {
    const normalizedSearch = phoneNumber.replace(/\D/g, "");
    if (!normalizedSearch)
        return [];
    const matchingIds = await prisma.$queryRaw `
    SELECT id FROM "Booking" 
    WHERE "deletedAt" IS NULL 
    AND regexp_replace("phoneNumber", '[^0-9]', '', 'g') LIKE ${`%${normalizedSearch}%`}
  `;
    const ids = matchingIds.map(row => row.id);
    if (ids.length === 0)
        return [];
    return prisma.booking.findMany({
        where: { id: { in: ids }, deletedAt: null },
        include: { vehicle: true },
        orderBy: { createdAt: "desc" },
    });
};
