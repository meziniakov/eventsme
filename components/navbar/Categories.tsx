'use client';
import {
  Baby,
  Camera,
  FerrisWheel,
  GraduationCap,
  Handshake,
  Images,
  PartyPopper,
  PersonStanding,
  Popcorn,
  RollerCoaster,
  Shell,
  Shirt,
  ShoppingBag,
  Theater
} from 'lucide-react';
import CategoryBox from './CategoryBox';
import { useSearchParams } from 'next/navigation';
import Container from '../ui/container';

export interface ICategory {
  id: number;
  label: string;
  slug: string;
  value?: string;
  path?: string;
  icon: any;
}

export const categories: ICategory[] = [
  {
    id: 45,
    slug: 'business-events',
    label: 'Бизнес',
    icon: Handshake
  },
  {
    id: 9,
    slug: 'cinema',
    label: 'Кинопоказы',
    icon: Popcorn
  },
  {
    id: 1,
    slug: 'concert',
    label: 'Концерты',
    icon: Theater
  },
  {
    id: 3,
    slug: 'education',
    label: 'Обучение',
    icon: GraduationCap
  },
  {
    id: 47,
    slug: 'entertainment',
    label: 'Развлечения',
    icon: FerrisWheel
  },
  {
    id: 6,
    slug: 'exhibition',
    label: 'Выставки',
    icon: Images
  },
  {
    id: 10,
    slug: 'fashion',
    label: 'Мода',
    icon: Shirt
  },
  {
    id: 8,
    slug: 'festival',
    label: 'Фестивали',
    icon: PersonStanding
  },
  {
    id: 12,
    slug: 'holiday',
    label: 'Праздники',
    icon: Shell
  },
  {
    id: 36,
    slug: 'kids',
    label: 'Детям',
    icon: Baby
  },
  {
    id: 4,
    slug: 'party',
    label: 'Вечеринки',
    icon: PartyPopper
  },
  {
    id: 40,
    slug: 'photo',
    label: 'Фотография',
    icon: Camera
  },
  {
    id: 46,
    slug: 'recreation',
    label: 'Активный отдых',
    icon: RollerCoaster
  },
  {
    id: 27,
    slug: 'shopping',
    label: 'Шопинг (Магазины)',
    icon: ShoppingBag
  }
  // {
  //   id: 39,
  //   slug: 'other',
  //   label: 'Разное'
  // },
  // {
  //   id: 28,
  //   slug: 'quest',
  //   label: 'Квесты'
  // },
  // {
  //   id: 13,
  //   slug: 'social-activity',
  //   label: 'Благотворительность'
  // },
  // {
  //   id: 25,
  //   slug: 'stock',
  //   label: 'Акции и скидки'
  // },
  // {
  //   id: 2,
  //   slug: 'theater',
  //   label: 'Спектакли'
  // },
  // {
  //   id: 7,
  //   slug: 'tour',
  //   label: 'Экскурсии'
  // },
  // {
  //   id: 14,
  //   slug: 'yarmarki-razvlecheniya-yarmarki',
  //   label: 'Ярмарки (Развлечения, Ярмарки)'
  // }
];

const Categories = () => {
  const params = useSearchParams();
  const categoryParams = params.get('categories');

  return (
    <div className="sticky top-[74px] z-10 w-full bg-white shadow-sm">
      <Container>
        <div className="flex flex-row items-center justify-between gap-4 overflow-x-auto">
          {categories.map((category: ICategory) => (
            <CategoryBox
              key={category.label}
              icon={category.icon}
              label={category.label}
              // path={category.path}
              value={category.slug}
              selected={categoryParams === category.slug}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Categories;
