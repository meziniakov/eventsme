export type LocationType = {
  slug: string;
  name?: string;
  timezone?: string;
  coords?: { lat: number; lon: number };
};

export const locations = [
  {
    slug: 'msk',
    name: 'Москва',
    timezone: 'GMT+03:00',
    coords: { lat: 55.753676, lon: 37.61989899999998 }
  },
  {
    slug: 'ekb',
    name: 'Екатеринбург',
    timezone: 'Asia/Yekaterinburg',
    coords: { lat: 56.838606999999996, lon: 60.60551400000001 }
  },
  {
    slug: 'sochi',
    name: 'Сочи',
    timezone: 'GMT+03:00',
    coords: { lat: 43.5992, lon: 39.7257 }
  },
  {
    slug: 'nsk',
    name: 'Новосибирск',
    timezone: 'GMT+04:00',
    coords: { lat: 55.0415, lon: 82.9346 }
  },
  {
    slug: 'kzn',
    name: 'Казань',
    timezone: 'GMT+03:00',
    coords: { lat: 55.795792999999975, lon: 49.106584999999995 }
  },
  {
    slug: 'nnv',
    name: 'Нижний Новгород',
    timezone: 'GMT+03:00',
    coords: { lat: 56.32688699999997, lon: 44.00598599999999 }
  },
  {
    slug: 'spb',
    name: 'Санкт-Петербург',
    timezone: 'GMT+03:00',
    coords: { lat: 59.93909499999997, lon: 30.315867999999988 }
  }
];
