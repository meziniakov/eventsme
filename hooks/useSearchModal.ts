import { create } from 'zustand';

import { categories, type ICategory } from '@/components/navbar/Categories';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { locations, LocationType } from '@/lib/locations';

interface ModalProps {
  isOpen: boolean;
  search?: string;
  setSearch: (search: string) => void;
  category: ICategory;
  setCategory: (category: ICategory) => void;
  location: LocationType;
  setLocation: (slug: string) => void;
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<ModalProps>((set) => ({
  isOpen: false,
  search: '',
  setSearch: (search: string) => set(() => ({ search })),
  category: categories[0],
  setCategory: (category: ICategory) => set(() => ({ category })),
  location: locations[0],
  setLocation: (slug: string) =>
    set(() => ({
      location: locations.find((location) => location.slug === slug)
    })),
  dateRange: {
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 2)
  },
  setDateRange: (dateRange: DateRange) => set(() => ({ dateRange })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
export default useSearchModal;
