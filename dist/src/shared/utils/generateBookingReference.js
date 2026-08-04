// backend/src/shared/utils/generateBookingReference.ts
// Excludes 0/O, 1/I, L to avoid visual confusion on printed vouchers or over the phone
const CHARSET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const REFERENCE_LENGTH = 5;
export const generateBookingReference = () => {
    let reference = "";
    for (let i = 0; i < REFERENCE_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * CHARSET.length);
        reference += CHARSET[randomIndex];
    }
    return reference;
};
