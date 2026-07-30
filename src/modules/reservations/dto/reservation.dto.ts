// backend/src/modules/reservations/dto/reservation.dto.ts

export interface PackageSnapshotDto {
  id: string;
  name: string;
  price: number;
}

export interface AddonSnapshotDto {
  id: string;
  name: string;
  price: number;
}

export interface CreateReservationDto {
  vehicleId: string;
  phoneNumber: string;
  pickupDate: Date | string; // Yup can return Date objects or strings depending on config
  returnDate: Date | string;
  pickupLocationId?: string | null;
  returnLocationId?: string | null;
  customPickupAddress?: string | null;
  customReturnAddress?: string | null;
  totalPrice: number;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerNotes?: string | null;
  packageData?: PackageSnapshotDto | null;
  addonsData?: AddonSnapshotDto[] | null;
}

export interface UpdateReservationDto extends Partial<CreateReservationDto> {
  // Inherits all fields but makes them optional for partial updates
}
