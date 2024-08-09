import { memo } from 'react';
import { EventItem } from '@/app/types';

const Card = ({
  event,
  selectPlace
}: {
  event: EventItem;
  selectPlace: (id: string | null) => void;
}) => (
  <div
    onMouseEnter={() => selectPlace(event.id.toString())}
    onMouseLeave={() => selectPlace(null)}
    className="p-4 rounded-lg bg-slate-700 hover:bg-slate-600"
  >
    {event.title}
  </div>
);

export default memo(Card);
