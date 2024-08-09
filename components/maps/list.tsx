'use client';
import { memo } from 'react';
import { usePageState } from '../../providers/page-provider';
import Card from './card';
import { EventItem } from '@/app/types';

const List = ({ events }: { events: EventItem[] }) => {
  const { selectPlace } = usePageState();

  return (
    <div className="space-y-2 h-full overflow-y-auto">
      {events.map((event) => (
        <Card key={event.id} event={event} selectPlace={selectPlace} />
      ))}
    </div>
  );
};

export default memo(List);
