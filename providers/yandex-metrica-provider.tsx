'use client';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import { ReactNode } from 'react';

const YandexMetrica = (props: { children?: ReactNode }) => {
  return (
    <YandexMetricaProvider
      tagID={parseInt(process.env.YANDEX_METRICA_ID || '')}
      initParameters={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
      }}
    >
      {props.children}
    </YandexMetricaProvider>
  );
};

export default YandexMetrica;
