'use client';

import useSearchModal from '@/hooks/useSearchModal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Search = () => {
  const searchModal = useSearchModal();
  const location = searchModal.location;
  const search = searchModal.search;
  const dateRange = useSearchModal((state: any) => state.dateRange);

  return (
    <div
      onClick={searchModal.onOpen}
      className="cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">
          {`${
            search && search?.length < 6
              ? search
              : `${search?.substring(0, 13)}...`
          }` || 'Поиск...'}{' '}
        </div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          {location.name || 'Город'}
        </div>
        <div className="hidden flex-row items-center gap-3 border-x-[1px] px-6 text-sm font-semibold md:block">
          <div className="hidden sm:block">
            {dateRange?.from ? (
              dateRange?.to ? (
                <>
                  {format(dateRange?.from, 'd LLL', { locale: ru })} -{' '}
                  {format(dateRange?.to, 'd LLL', { locale: ru })}
                </>
              ) : (
                format(dateRange?.from, 'd LLL', { locale: ru })
              )
            ) : (
              <span>Даты</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
