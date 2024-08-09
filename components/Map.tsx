'use client';
import { EventItem } from '@/app/types';
import { useMap } from '@/providers/map-provider';
import { useMemo, useRef, useState, type FC } from 'react';
import Loading from './maps/loading';
import { YMap, YMapLocationRequest } from '@yandex/ymaps3-types';
import MarkerWithPopup from './maps/marker-with-popup';
import { usePageState } from '@/providers/page-provider';
import { useDebouncedCallback } from 'use-debounce';
import { getBboxByCoordinates } from './maps/helpers/get-bbox-by-coordinates';

type Props = {
  data: EventItem[];
};

const MapPage: FC<Props> = ({ data }: Props) => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);
  const { selectedPlaceId, setBounds, selectPlace } = usePageState();

  const startBounds = useMemo(
    () =>
      getBboxByCoordinates(
        data.map((event) => [
          event?.place?.coords?.lon || 32,
          event?.place?.coords?.lat || 54
        ])
      ),
    [data]
  );
  const [location] = useState<YMapLocationRequest>(
    startBounds ? { bounds: startBounds } : { zoom: 0 }
  );
  const setBoundsDebounced = useDebouncedCallback(
    (value) => setBounds(value),
    500
  );

  const { reactifyApi } = useMap();
  console.log('reactifyApi ', reactifyApi);

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
      // onUpdate={({ location }) => {
      //   setBoundsDebounced(location.bounds);
      // }}
      />

      {data.map((event) => (
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

    // <YMaps>
    //   <Map defaultState={defaultState} className="h-screen w-screen">
    //     {data.map((event, i) => (
    //       <Placemark
    //         key={event.id}
    //         modules={['geoObject.addon.balloon']}
    //         defaultGeometry={[
    //           event?.place?.coords?.lat,
    //           event?.place?.coords?.lon
    //         ]}
    //         options={{
    //           iconLayout: template
    //         //   properties={{
    //         //     // iconContent: `${event.place?.title}`,
    //         //     iconCaption: `${event.place?.title}`,
    //         //     preset: 'islands#yellowDotIcon',
    //         //     balloonContent: `<div className="absolute transform -translate-x-1/2 transition-opacity">
    //         //   <div className="w-64">
    //         //     <div className="bg-white p-4 rounded-b-lg text-sm shadow w-full h-full">
    //         //       <div className="text-lg">${event.short_title}</div>
    //         //       <div className="text-sm">${event.description}</div>
    //         //     </div>
    //         //   </div>
    //         // </div>`,
    //         //     balloonContentHeader:
    //         // `<img
    //         //         src=${event.images[0].image || ''}
    //         //         alt=""
    //         //         className="rounded-t-lg"
    //         //         width=${260}
    //         //         height=${160}
    //         //       />`

    //         //     //     balloonContentBody: `<div
    //         //     //   className="absolute transform -translate-x-1/2 transition-opacity"
    //         //     // >
    //         //     //   <div className="w-64">

    //         //     //     <div className="bg-white p-4 rounded-b-lg text-sm shadow w-full h-full">
    //         //     //       <div className="text-lg">${event.short_title}</div>
    //         //     //       <div className="text-sm">${event.description}</div>
    //         //     //     </div>
    //         //     //   </div>
    //         //     // </div>`
    //         //     //         `<div class="flex flex-col">
    //         //     //   <div class="text-lg font-semibold leading-7">${event.price} ₽ <span className="text-xs">/ сутки</span ></div>
    //         //     //   <div class="">${event.title}</div>
    //         //     //   <div class=""><img src=${event.images[0].image} class="h-32" /></div>
    //         //     // </div>`
    //         //   }}
    //       />
    //     ))}
    //   </Map>
    // </YMaps>
  );
};

export default MapPage;
