'use client';
import Link from 'next/link';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400']
});

const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-start">
      <Link href={'/'}>
        <span
          className={`${pacifico.className + ' text-fuchsia-900 text-4xl font-extrabold'}`}
        >
          eventsme
        </span>
      </Link>
    </div>
  );
};
export default Logo;
