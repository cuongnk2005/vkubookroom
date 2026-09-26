import { mockRooms, Room } from '../data/mockRooms';

export const fetchRooms = async (): Promise<Room[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockRooms);
    }, 800);
  });
};
