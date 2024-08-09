'use client';

import { FC, useState } from 'react';
import EmptyState from './EmptyState';
import Categories from './navbar/Categories';
import dynamic from 'next/dynamic';
import { EventsList } from '@/app/types';
import ItemList from './ItemList';
import { Map } from 'lucide-react';
import { MapProvider } from '@/providers/map-provider';
import { PageStateProvider } from '@/providers/page-provider';
import MapPage from './Map';
import Container from './ui/container';

interface IndexPageProps {
  eventList: EventsList;
}

// const MapPage = dynamic(() => import('@/components/Map'), {
//   ssr: false
// });

const IndexPage: FC<IndexPageProps> = ({ eventList }) => {
  const [isMap, setIsMap] = useState(false);

  const handleMapAndList = (e: any) => {
    e.preventDefault();
    setIsMap(!isMap);
  };

  const scrollHandler = (e: any) => {
    console.log('window ', window);
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      200
    ) {
      console.log('yes');
      // setFetching(true);
      window.removeEventListener('scroll', scrollHandler);
    }
  };

  // console.log('typeof window ', typeof window);

  // if (typeof window !== 'undefined') {
  //   console.log('window ', window);
  //   // window.addEventListener('scroll', scrollHandler);
  // } else {
  //   null;
  // }

  // const [data, setData] = useState([]);
  // const [fetching, setFetching] = useState(true);
  // const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   fetch('https://api.ipgeolocation.io/getip')
  //     .then((res) => res.json())
  //     .then(({ ip }) =>
  //       getGeoByIP(ip).then((res) => {
  //         if (res.city.toLowerCase() === 'moscow') {
  //           return push(`/moskva/muzei-i-galerei`)
  //         }
  //         if (res.city.toLowerCase() === 'saint-petersburg') {
  //           return push(`/sankt-peterburg/muzei-i-galerei`)
  //         }
  //         if (res.city.toLowerCase() === 'rostov-on-don') {
  //           return push(`/rostov-na-donu/muzei-i-galerei`)
  //         }
  //         return push(`/${res.city}`)
  //       })
  //     )
  // }, [])

  // let currentQuery = {}

  // if (params) {
  //   currentQuery = queryString.parse(params.toString())
  // }

  // useEffect(() => {
  //   if (fetching) {
  //     getAllPlaces(currentPage, categoryParams, localeParams)
  //       .then((fetchData) => {
  //         setData([...data, ...fetchData.data])

  //         // const updateQuery: any = {
  //         //   ...currentQuery,
  //         //   page: +currentPage + 20,
  //         // }
  //         // const url = queryString.stringifyUrl(
  //         //   {
  //         //     url: '/',
  //         //     query: updateQuery,
  //         //   },
  //         //   { skipNull: true }
  //         // )

  //         // router.push(url, undefined, { shallow: true })
  //         setCurrentPage((prevState) => prevState + 20)
  //       })
  //       .catch(() => {
  //         throw new Error('Ошибка сервера')
  //       })
  //       .finally(() => setFetching(false))
  //   }
  // }, [fetching, categoryParams, localeParams])

  // useEffect(() => {
  //   if (categoryParams || localeParams) {
  //     getAllPlaces(0, categoryParams, localeParams)
  //       .then((fetchData) => {
  //         setData([...fetchData.data])
  //       })
  //       .catch(() => {
  //         throw new Error('Ошибка сервера')
  //       })
  //       .finally(() => setCurrentPage(20))
  //   }
  // }, [categoryParams, localeParams])

  return (
    <>
      <Categories />
      <div className="">
        {!eventList.count && <EmptyState showReset />}
        {isMap ? (
          <div className="absolute w-full h-full flex">
            <div className="h-full w-full">
              <MapPage data={eventList.results} />
            </div>
          </div>
        ) : (
          <Container>
            <ItemList items={eventList.results} />
          </Container>
        )}
        <div className="fixed bottom-5 flex w-full justify-center">
          <button
            type="button"
            onClick={handleMapAndList}
            className="gap-4 flex w-56 items-center justify-center rounded-full bg-[#2F00A6] py-2 px-4 text-white shadow-2xl hover:shadow-2xl hover:shadow-black hover:transition-transform"
          >
            {isMap ? 'Показать списком' : 'Показать карту'}
            <Map />
          </button>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
