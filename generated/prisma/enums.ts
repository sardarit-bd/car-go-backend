

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  EMPLOYEE: 'EMPLOYEE'
} as const

export type Role = (typeof Role)[keyof typeof Role]


export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
} as const

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]
