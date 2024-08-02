'use client';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

interface NavBarProps {
  isMain: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isMain }) => {
  return (
    <>
      {isMain ? (
        <div className="fixed z-10 mx-auto w-full bg-white px-4 shadow-sm sm:px-2 md:px-10 xl:px-20">
          <div className="border-b-[1px] py-4">
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[2520px]">
          <div
            className="fixed z-10 mx-auto w-full border-b-[1px] bg-white px-4 shadow-sm
        sm:px-2
        md:px-10
        xl:px-20"
          >
            <div className="mx-auto max-w-screen-xl py-4">
              <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo />
                <Search />
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
