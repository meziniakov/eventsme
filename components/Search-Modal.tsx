'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { ru } from 'date-fns/locale';

import { getUnixTime, format } from 'date-fns';
import useSearchModal from '@/hooks/useSearchModal';
import Modal from './modals/Modal';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import Heading from './Heading';
import { locations } from '@/lib/locations';

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const query = searchModal.search;
  const location = searchModal.location;
  const dateRange = searchModal.dateRange;

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      location: location.slug,
      query
    };

    if (dateRange?.from) {
      updateQuery.from = getUnixTime(dateRange?.from);
    }
    if (dateRange?.to) {
      updateQuery.to = getUnixTime(dateRange?.to);
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: updateQuery
      },
      { skipNull: true }
    );

    searchModal.onClose();
    router.push(url);
  }, [searchModal, dateRange, location, params, router]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Что ищем?" subtitle="Настройте фильтры под себя" />
      <div className="grid gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => searchModal.setSearch(e.target.value)}
          placeholder="Поиск"
        />
        <Select
          value={location.slug}
          onValueChange={(value) => searchModal.setLocation(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem key={location.slug} value={location.slug}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !dateRange?.from && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange?.to ? (
                  <>
                    {format(dateRange?.from, 'd LLL y', { locale: ru })} -{' '}
                    {format(dateRange?.to, 'd LLL y', { locale: ru })}
                  </>
                ) : (
                  format(dateRange?.from, 'd LLL y', { locale: ru })
                )
              ) : (
                <span>Выбрать дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(dateRange) =>
                searchModal.setDateRange({
                  from: dateRange?.from,
                  to: dateRange?.to
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  return (
    <Modal
      onClose={searchModal.onClose}
      isOpen={searchModal.isOpen}
      onSubmit={onSubmit}
      title="Фильтры"
      actionLabel="Искать"
      body={bodyContent}
    />
  );
};

export default SearchModal;
