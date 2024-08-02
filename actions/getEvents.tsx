import { EventsList } from '@/app/types';
import queryString from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/events`;

export interface Query {
  page?: number;
  page_size?: number;
  fields?:
    | 'id'
    | 'publication_date'
    | 'dates'
    | 'slug'
    | 'place'
    | 'title'
    | 'images'
    | 'short_title'
    | 'categories'
    | 'description'
    | 'body_text'
    | 'location'
    | 'tagline'
    | 'age_restriction'
    | 'price'
    | 'is_free';
  expand?:
    | 'images'
    | 'place'
    | 'location'
    | 'dates'
    | 'participants'
    | 'category';
  order_by?: '-rank' | '-id';
  text_format?: string;
  actual_since?: number;
  location?: string;
  from?: number;
  to?: number;
  actual_until?: number;
  categories?: string | string[] | undefined;
  category?: string | string[] | undefined;
}

const getEventList = async (query: Query | undefined): Promise<EventsList> => {
  const url = queryString.stringifyUrl({
    url: URL,
    query: {
      categories: query?.categories,
      page: 1,
      page_size: 10,
      location: query?.location,
      fields:
        'id,publication_date,dates,slug,place,title,images,short_title,categories,description,body_text,location,tagline,age_restriction,price,is_free',
      expand: 'images,place,location,dates,participants,category',
      order_by: '-rank,-id',
      text_format: 'html',
      actual_since: query?.from,
      actual_until: query?.to
    }
  });

  const res = await fetch(`${url}`);

  let eventList = await res.json();

  return eventList;
};
export default getEventList;
