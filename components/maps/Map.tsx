'use client';

import {
  YMap,
  YMapLocationRequest
} from '@yandex/ymaps3-types/imperative/YMap';
import { useDebouncedCallback } from 'use-debounce';
import React, { useMemo, useRef, useState } from 'react';
import { useMap } from '../../providers/map-provider';
import MarkerWithPopup from './marker-with-popup';
import { getBboxByCoordinates } from './helpers/get-bbox-by-coordinates';
import { usePageState } from '../../providers/page-provider';
import Loading from './loading';
import { EventItem } from '@/app/types';

export type Place = {
  id: string;
  label: string;
  text: string;
  longitude: number;
  latitude: number;
};

interface MapProps {
  events: EventItem[];
}

export const Map = ({ events }: MapProps) => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);
  const { selectedPlaceId, setBounds, selectPlace } = usePageState();
  const startBounds = useMemo(
    () =>
      getBboxByCoordinates(
        events.map((event) => [
          event?.place?.coords?.lon || 32,
          event?.place?.coords?.lat || 54
        ])
      ),
    [events]
  );
  const [location] = useState<YMapLocationRequest>(
    startBounds ? { bounds: startBounds } : { zoom: 0 }
  );
  const setBoundsDebounced = useDebouncedCallback(
    (value) => setBounds(value),
    500
  );
  const { reactifyApi } = useMap();

  if (!reactifyApi) return <Loading />;

  const {
    YMap,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer
  } = reactifyApi;

  return (
    <YMap margin={[20, 20, 20, 20]} location={location} ref={mapRef}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener
        onUpdate={({ location }) => {
          setBoundsDebounced(location.bounds);
        }}
      />

      {events.map((event) => (
        <MarkerWithPopup
          key={event.id}
          event={event}
          mapRef={mapRef}
          reactifyApi={reactifyApi}
          selected={selectedPlaceId === event.id.toString()}
          selectPlace={selectPlace}
        />
      ))}
    </YMap>
  );
};
