import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Booking {
  id: string;
  roomId: string;
  timeSlot: string; // e.g., '08:00 - 10:00'
  date: string; // e.g., '2026-09-24'
}

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  isSlotBooked: (roomId: string, date: string, timeSlot: string) => boolean;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      removeBooking: (id) => set((state) => ({ bookings: state.bookings.filter(b => b.id !== id) })),
      isSlotBooked: (roomId, date, timeSlot) => {
        return get().bookings.some(
          (b) => b.roomId === roomId && b.date === date && b.timeSlot === timeSlot
        );
      },
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
