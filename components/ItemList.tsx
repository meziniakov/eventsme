'use client';
import { EventItem } from 'app/types';
import Item from './Item';

export type Props = {
  items: EventItem[] | [];
};

const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 items-start justify-center gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {items?.map((item: EventItem) => <Item key={item.id} item={item} />)}
    </div>
  );
};
export default ItemList;
