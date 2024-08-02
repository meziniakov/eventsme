'use client';

import { useCallback, useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import Avatar from './Avatar';
import MenuItem from './MenuItem';
import { Menu } from 'lucide-react';

const UserMenu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toogleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative">
      <div className="z-10 flex flex-row items-center gap-3">
        {/* <div
          onClick={placeModal.onOpen}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Добавить объект
        </div> */}
        <div
          onClick={toogleOpen}
          ref={ref}
          className="
        flex
        cursor-pointer
        flex-row
        items-center
        gap-3
        rounded-full
        border-[1px]
        border-neutral-200
        p-4
        transition
        hover:shadow-md
        md:px-2
        md:py-1
        "
        >
          <Menu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            z-40
            w-[40vw]
            overflow-hidden
            rounded-xl
            bg-white
            text-sm
            shadow-md
            md:w-3/4
          "
        >
          <div className="relative z-50 flex cursor-pointer flex-col">
            <MenuItem onClick={() => {}} label="Войти" />
            <MenuItem onClick={() => {}} label="Регистрация" />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
