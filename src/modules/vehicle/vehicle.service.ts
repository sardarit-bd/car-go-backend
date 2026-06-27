import * as vehicleRepository from "./vehicle.repository";
import { GetVehiclesQuery } from "./vehicle.validator";

const MS_IN_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const addDays = (date: Date, days: number): Date =>
  new Date(date.getTime() + days * MS_IN_DAY);

const resolveSearchDates = (
  pickupDate?: Date,
  returnDate?: Date,
): { pickupDate: Date; returnDate: Date } => {
  const effectivePickup = pickupDate
    ? startOfDay(pickupDate)
    : addDays(startOfDay(new Date()), 1); 

  const effectiveReturn = returnDate
    ? startOfDay(returnDate)
    : addDays(effectivePickup, 2);

  return { pickupDate: effectivePickup, returnDate: effectiveReturn };
};

export const getAvailableVehicles = async (query: GetVehiclesQuery) => {
  const { model, seats, location, pickupDate, returnDate } = query;
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  const { pickupDate: effectivePickup, returnDate: effectiveReturn } =
    resolveSearchDates(pickupDate, returnDate);

  const skip = (page - 1) * limit;

  const filters = {
    model,
    seats,
    location,
    pickupDate: effectivePickup,
    returnDate: effectiveReturn,
  };

  const [vehicles, total] = await Promise.all([
    vehicleRepository.findAvailableVehicles(filters, { skip, take: limit }),
    vehicleRepository.countAvailableVehicles(filters),
  ]);

  return {
    vehicles,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};