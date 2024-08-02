import Categories from '@/components/navbar/Categories';
import EmptyState from '@/components/EmptyState';
import ItemList from '@/components/ItemList';
import getEventList, { Query } from '@/actions/getEvents';

const Index = async ({
  searchParams
}: {
  searchParams: { [key: string]: Query | undefined };
}) => {
  const eventList = await getEventList(searchParams);

  // const [data, setData] = useState([]);
  // const [fetching, setFetching] = useState(true);
  // const [currentPage, setCurrentPage] = useState(0);

  // const scrollHandler = (e: any) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //     200
  //   ) {
  //     setFetching(true);
  //   }
  // };

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

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return () => {
  //     document.removeEventListener('scroll', scrollHandler)
  //   }
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
    <div className="w-full text-gray-700 antialiased mx-auto bg-white px-4 shadow-sm sm:px-2 md:px-10 xl:px-20">
      <div className="sticky top-[77px] z-10 w-full bg-white shadow-sm">
        <Categories />
      </div>
      <div className="pt-[83px]">
        {!eventList.count && <EmptyState showReset />}
        <ItemList items={eventList.results} />
      </div>
    </div>
  );
};

export default Index;
