'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { EventItem } from '@/app/types';

type Props = {
  item: EventItem;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Item: React.FC<Props> = ({ item }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/${item?.slug}-${item?.id}`}>
      <div
        className={`${
          isLoading && 'animate-pulse'
        } relative aspect-square w-full overflow-hidden rounded-lg bg-gray-400 hover:shadow-lg`}
      >
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={item?.images[0]?.image || ''}
          alt={item?.short_title || ''}
          style={{ transform: 'translate3d(0, 0, 0)' }}
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out rounded-lg object-cover brightness-90 transition group-hover:brightness-110',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="pt-2">
        <div className="">
          <p className="text-sm font-bold text-gray-900">
            {item?.categories?.join(',')}
          </p>
        </div>
        <div className="">
          <p className=" text-lg">{item?.title}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-700">{item.location?.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Item;
