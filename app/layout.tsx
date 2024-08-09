import NavBar from '@/components/navbar/NavBar';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import ModalProvider from '@/providers/modal-provider';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import YandexMetrica from '@/providers/yandex-metrica-provider';

export const metadata = {
  title:
    'Поиск мероприятий для досуга - концерты, выставки, обучения, фестивали, праздники - Eventsme',
  description:
    'Поиск мероприятий по категориям, фильтрам и по местоположению - концерты, выставки, обучения, фестивали, праздники - Eventsme'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen w-full flex-col">
        <YandexMetrica>
          <ModalProvider />
          <NavBar isMain={false} />
          {children}
        </YandexMetrica>
      </body>
      <Analytics />
    </html>
  );
}
