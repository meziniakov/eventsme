import ItemSingle from '@/components/ItemSingle';
import { EventItem } from '../types';
import getEvent from '@/actions/getEvent';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  const id = params?.slug?.split('-')?.pop();

  const event: EventItem = await getEvent(id);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: event.title + ' | Eventsme',
    description: event.title + ', описание, фото, контакты | Eventsme'
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const id = params?.slug?.split('-')?.pop();

  const data: EventItem = await getEvent(id);

  return <ItemSingle data={data} />;
};

export default SinglePage;
