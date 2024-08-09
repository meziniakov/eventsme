'use client';

import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';

import { EventItem } from '@/app/types';
import { ArrowUp, Heart, MapPin, Star } from 'lucide-react';

type Props = {
  data: EventItem;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ItemSingle: FC<Props> = ({ data }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <div className="w-full text-gray-700 antialiased mx-auto bg-white px-4 shadow-sm sm:px-2 md:px-10 xl:px-20">
        <div className="flex w-full flex-col space-y-2 py-2">
          <div className="flex">
            <h1 className="text-2xl font-extrabold">{data?.title}</h1>
          </div>
          <div className="flex justify-end md:justify-between">
            <div className="hidden items-center md:flex">
              <Star className="h-4 text-red-600" />
              {''} ∙ {'нет отзывов'}∙ <MapPin className="h-4" />{' '}
              {data?.place?.address}
            </div>
            <div className="flex">
              <div className="mr-3 flex items-center">
                <span className="mr-2">
                  <Heart className="h-4" />
                </span>
                <span className="hidden sm:block">Сохранить</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">
                  <ArrowUp size={16} />
                </span>
                <span className=" hidden cursor-pointer sm:block">
                  Поделиться
                </span>
              </div>
            </div>
          </div>
          {data?.images && data?.images?.length > 2 ? (
            <section className="overflow-hidden text-neutral-700">
              <div className="mx-auto p-1">
                <div className="flex flex-wrap">
                  <div className="flex w-2/3 flex-wrap pr-2">
                    <div
                      className={`${
                        isLoading && 'animate-pulse'
                      } relative h-96 w-full overflow-hidden rounded-l-lg bg-gray-200`}
                    >
                      <Image
                        src={data?.images[0].image || ''}
                        alt={data?.title || ''}
                        width={580}
                        height={300}
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        className={cn(
                          'group-hover:opacity-75 h-full w-full duration-700 ease-in-out rounded-l-lg object-cover object-center brightness-90 transition',
                          isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                        )}
                        onLoadingComplete={() => setLoading(false)}
                      />
                    </div>
                  </div>
                  <div className="flex h-96 w-1/3 flex-wrap">
                    <div
                      className={`${
                        isLoading && 'animate-pulse'
                      } h-1/2 w-full rounded-tr-lg bg-gray-200`}
                    >
                      <Image
                        src={data?.images[1]?.image || ''}
                        alt={data?.images[1]?.source?.name || data?.title}
                        width={250}
                        height={190}
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        className={cn(
                          'group-hover:opacity-75 h-full w-full duration-700 ease-in-out rounded-tr-lg object-cover object-center brightness-90 transition',
                          isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                        )}
                        onLoadingComplete={() => setLoading(false)}
                      />
                    </div>
                    <div className="h-1/2 w-full pt-2">
                      <div
                        className={`${
                          isLoading && 'animate-pulse'
                        } h-full w-full rounded-br-lg bg-gray-200`}
                      >
                        <Image
                          src={data?.images[2]?.image || ''}
                          alt={data?.images[2]?.source?.name || data?.title}
                          width={250}
                          height={190}
                          style={{ transform: 'translate3d(0, 0, 0)' }}
                          className={cn(
                            'group-hover:opacity-75 h-full w-full duration-700 ease-in-out rounded-br-lg object-cover object-center brightness-90 transition',
                            isLoading
                              ? 'grayscale blur-2xl scale-110'
                              : 'grayscale-0 blur-0 scale-100'
                          )}
                          onLoadingComplete={() => setLoading(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="overflow-hidden text-neutral-700">
              <div className="mx-auto p-1">
                <div className="flex flex-wrap">
                  <div className="flex w-full flex-wrap">
                    <div className="h-96 w-full p-0.5 md:p-0.5">
                      <Image
                        src={data?.images[0].image || ''}
                        alt={data?.title}
                        width={1100}
                        height={300}
                        className="block h-full w-full rounded-lg object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <div className="grid grid-cols-1 justify-between lg:grid-cols-3">
            {data.place && (
              <div className="mt-10 flex flex-col lg:col-span-2 lg:pr-10">
                <div className="flex justify-between">
                  <div className="">
                    <div className="">
                      <h3 className="text-xl font-extrabold">
                        {data?.place.title}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4" />
                      {data?.place?.address}
                    </div>
                  </div>
                  <div className="">
                    {/* {data.organization?.name} */}
                    {/* <img
                    className="h-14 rounded-full"
                    alt={data.organization?.name}
                    src={data.organization.subordi}
                  /> */}
                  </div>
                </div>
                <hr className="my-8 h-px border-[0.5px] bg-gray-200" />
                <div
                  dangerouslySetInnerHTML={{ __html: data?.body_text }}
                ></div>
                {/* <hr className="my-8 h-px border-[0.5px] bg-gray-200" /> */}
              </div>
            )}
            <div className="mt-10 lg:col-span-1">
              <div className="sticky top-20 mb-9 w-full flex-col rounded-lg border bg-white p-5 shadow-xl">
                <div className="flex flex-col justify-start gap-4">
                  <div className="flex flex-col text-sm">
                    <div className="text-sm">Телефон:</div>
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <div className=""></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="z-0 flex text-sm">Источник - &nbsp;</div>
            </div>
          </div>
          {/* <hr className="my-8 h-px border-[0.5px] bg-gray-200" /> */}
          {/* {external_reviews && (
            <>
              <div className="flex flex-col py-4">
                <h3 className="mb-7 flex text-xl font-extrabold">
                  <img src="/assets/images/star.svg" width="20" alt="Рейтинг" />
                  {external_reviews.rating}∙{' '}
                  {room.external_reviews_localizedCounter} на{' '}
                  {external_reviews.site}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {external_reviews.reviews.map((review, i) => {
                    return (
                      i < 6 && (
                        <div key={review.name + i} className="flex-col">
                          <div className="flex">
                            <div className="mr-4">
                              <img
                                alt={review.name}
                                className="h-14 rounded-full"
                                src={review.avatar}
                              />
                            </div>
                            <div className="flex-col">
                              <div className="font-extrabold">
                                {review.name}
                              </div>
                              <div className="text-sm font-light">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <p className="">{review.comment}</p>
                          </div>
                        </div>
                      )
                    )
                  })}
                </div>
              </div>
              <hr className="my-8 h-px border-[0.5px] bg-gray-200" />
            </>
          )} */}
          {data?.tags && data.tags?.length > 0 && (
            <div className="flex flex-col py-5">
              <h3 className="mb-3 text-xl font-extrabold">Теги</h3>
              <div className="flex flex-wrap items-end justify-start space-x-2 space-y-2">
                {data?.tags.map((tag, i) => (
                  <span
                    key={i}
                    className=" inline-block whitespace-nowrap rounded-[0.27rem] bg-orange-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col py-5">
            <h3 className="mb-3 text-xl font-extrabold">Местоположение</h3>
            <div className="flex h-96 w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemSingle;
