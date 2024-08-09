import { EventItem } from '@/app/types';
import queryString from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/events`;

const getEvent = async (id: string | undefined): Promise<EventItem> => {
  const url = queryString.stringifyUrl({
    url: URL + `/${id}`,
    query: {
      fields:
        'id,publication_date,dates,tags,slug,place,participants,title,images,short_title,categories,description,body_text,location,tagline,age_restriction,price,is_free,favorites_count,comments_count,site_url',
      expand: 'images,place,location,dates,participants,category'
    }
  });

  const res = await fetch(`${url}`);

  let eventList = await res.json();

  return eventList;
};
export default getEvent;
