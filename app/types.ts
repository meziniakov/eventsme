export interface EventsList {
  count: number;
  next: string | null;
  previous: string | null;
  results: EventItem[];
}

export interface EventDates {
  start_date: string;
  start_time: string;
  start: number;
  end_date: string;
  end_time: string;
  end: number;
  is_continuous: boolean;
  is_endless: boolean;
  is_startless: boolean;
  schedules: Shedule[];
  use_place_schedule: boolean;
}

export interface Shedule {
  days_of_week: number[];
  start_time: string | null;
  end_time: string | null;
}

export type Thumbnails = {
  [key: string]: string;
};

export type Source = {
  name: string;
  link: string;
};

export interface EventImage {
  image: string;
  thumbnails?: Thumbnails;
  source?: Source;
}

export type Coords = {
  lat: number;
  lon: number;
};

export interface Place {
  id: number;
  title: string;
  slug: string;
  address: string;
  phone: string;
  subway: string;
  location: string;
  site_url: string;
  is_closed: boolean;
  coords: Coords;
  is_stub: boolean;
}

export type Location = {
  slug: string;
  name: string;
  timezone: string;
  coords: Coords;
  language: string;
  currency: string;
};

export interface EventItem {
  id: number;
  slug: string;
  place?: Place;
  publication_date: number;
  dates?: EventDates[];
  title: string;
  description: string;
  body_text: string;
  tagline: string;
  age_restriction: string | number;
  price: string;
  is_free: string | boolean;
  location: Location;
  images: EventImage[];
  categories?: string[];
  tags?: string[];
  short_title: string;
}
