import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { LucideIcon } from 'lucide-react';
import queryString from 'query-string';

interface CategoryBoxProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  path?: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  value,
  // path,
  selected
}) => {
  const { push } = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      categories: value
    };
    if (params?.get('categories') === value) {
      delete updateQuery.categories;
    }
    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updateQuery
      },
      { skipNull: true }
    );

    push(url);
  }, [label, push, value, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        cursor-pointer 
        flex-col 
        items-center
        justify-center
        gap-2
        border-b-2
        p-3
        transition
        hover:border-b-fuchsia-900
        hover:text-fuchsia-900
        ${selected ? 'border-b-fuchsia-900' : 'border-transparent'}
        ${selected ? 'text-fuchsia-900' : 'text-neutral-500'}
    `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};
export default CategoryBox;
