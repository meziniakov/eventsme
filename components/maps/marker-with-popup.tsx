'use client';

import { YMap } from '@yandex/ymaps3-types';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ReactifyApi } from '../../providers/map-provider';
import getPopupPosition from './helpers/get-popup-position';
import { EventItem } from '@/app/types';
import Image from 'next/image';

interface MarkerWithPopupProps {
  mapRef: React.MutableRefObject<(YMap & { container: HTMLElement }) | null>;
  event: EventItem;
  selected: boolean;
  reactifyApi: ReactifyApi;
  selectPlace: (id: string | null) => void;
}

const MarkerWithPopup = ({
  mapRef,
  event,
  selected,
  reactifyApi,
  selectPlace
}: MarkerWithPopupProps) => {
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [position, setPosition] = useState<React.CSSProperties>({
    visibility: 'hidden',
    opacity: '0'
  });

  const updatePositionAndShow = useCallback(() => {
    const map = mapRef?.current?.container;
    const marker = markerRef?.current;
    const popup = popupRef?.current;

    if (!map || !marker || !popup) return;

    setPosition({
      ...getPopupPosition(map, popup, marker),
      visibility: 'visible',
      opacity: '1'
    });
  }, [mapRef]);

  useEffect(() => {
    if (selected) updatePositionAndShow();
  }, [selected, updatePositionAndShow]);

  const { YMapMarker } = reactifyApi;

  return (
    <YMapMarker
      key={event.id}
      zIndex={selected ? 10 : 1}
      coordinates={[
        event?.place?.coords?.lon || event.location.coords.lon,
        event?.place?.coords?.lat || event.location?.coords.lat
      ]}
    >
      <div
        onMouseEnter={() => selectPlace(event.id.toString())}
        onMouseLeave={() => selectPlace(null)}
      >
        <div
          ref={markerRef}
          className="absolute bottom-0 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div
            className={`text-white whitespace-nowrap py-1 px-2 rounded text-sm shadow ${
              selected ? 'bg-slate-600' : 'bg-slate-700'
            }`}
          >
            {event.price}
          </div>
        </div>
        {selected ? (
          <div
            ref={popupRef}
            className="absolute transform -translate-x-1/2 transition-opacity"
            style={{ ...position }}
          >
            <div className="w-64">
              <Image
                src={event.images[0].image || ''}
                alt=""
                className="rounded-t-lg"
                width={260}
                height={160}
              />
              <div className="bg-white p-4 rounded-b-lg text-sm shadow w-full h-full">
                <div className="text-lg">{event.short_title}</div>
                <div className="text-sm">{event.description}</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </YMapMarker>
  );
};

export default memo(MarkerWithPopup);
