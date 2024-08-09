import getEventList, { Query } from '@/actions/getEvents';
import IndexPage from '@/components/IndexPage';
import { MapProvider } from '@/providers/map-provider';
import { PageStateProvider } from '@/providers/page-provider';

const Index = async ({
  searchParams
}: {
  searchParams: { [key: string]: Query | undefined };
}) => {
  const eventList = await getEventList(searchParams);

  const apiUrl = `https://api-maps.yandex.ru/3.0/?apikey=${process.env.REACT_APP_YMAP_KEY}&lang=ru_RU`;

  return (
    <PageStateProvider>
      <MapProvider apiUrl={apiUrl}>
        <IndexPage eventList={eventList} />
      </MapProvider>
    </PageStateProvider>
  );
};

export default Index;
