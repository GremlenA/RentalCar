import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

export interface Vehicle {
  id: string;
  year: number;
  brand: string; 
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface VehicleFilters {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  brands: string[];
  favorites: string[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  hasMore: boolean;
  filters: VehicleFilters;
  
  fetchVehicles: (searchFilters?: VehicleFilters, isNewSearch?: boolean) => Promise<void>;
  fetchBrands: () => Promise<void>;
  toggleFavorite: (vehicleId: string) => void;
  setFilters: (filters: VehicleFilters) => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      brands: [],
      favorites: [],
      isLoading: false,
      page: 1,
      totalPages: 1,
      hasMore: false,
      filters: {},

      setFilters: (newFilters) => set({ filters: newFilters }),

      fetchBrands: async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
          set({ brands: response.data });
        } catch (error) {
          console.error("Ошибка загрузки брендов:", error);
        }
      },

      fetchVehicles: async (searchFilters = {}, isNewSearch = false) => {
        // Запобігаємо дублюванню запитів
        if (get().isLoading) return;
        
        // 1. ПОПЕРЕДНЄ СКИДАННЯ: Очищаємо результати ДО відправки запиту
        if (isNewSearch) {
          set({ 
            isLoading: true, 
            vehicles: [], // Скидаємо масив машин миттєво
            page: 1,      // Повертаємось на першу сторінку
            filters: searchFilters 
          });
        } else {
          set({ isLoading: true });
        }
        
        // Беремо актуальну сторінку зі стейту
        const pageToFetch = get().page;

        try {
          const params = {
            page: pageToFetch,
            limit: 12,
            ...searchFilters,
          };

          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cars`, { params });
          const { cars, totalPages } = response.data;

          set((state) => ({
            // Якщо це новий пошук — записуємо свіжі дані, якщо ні — додаємо до старих (Load more)
            vehicles: isNewSearch ? cars : [...state.vehicles, ...cars],
            page: pageToFetch + 1, // Готуємо наступну сторінку
            totalPages: totalPages,
            hasMore: pageToFetch < totalPages,
            isLoading: false,
          }));
        } catch (error) {
          console.error("Ошибка загрузки машин:", error);
          set({ isLoading: false, hasMore: false });
        }
      },

      toggleFavorite: (vehicleId) => {
        const { favorites } = get();
        const isFav = favorites.includes(vehicleId);
        set({
          favorites: isFav 
            ? favorites.filter(id => id !== vehicleId) 
            : [...favorites, vehicleId]
        });
      },
    }),
    {
      name: 'vehicle-storage',
      storage: createJSONStorage(() => localStorage),
      // Зберігаємо в LocalStorage тільки масив favorites (вибрані машини)
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);