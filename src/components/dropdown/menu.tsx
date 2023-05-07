import { HTMLAttributes } from 'react';

export default function DropdownMenu(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`dropdown-menu invisible absolute right-0 z-10 mt-2 max-w-max rounded-md border border-gray-300 bg-gray-200 py-2 opacity-0 shadow-md transition-opacity duration-150 data-[expanded=true]:visible data-[expanded=true]:opacity-100 dark:border-slate-700 dark:bg-slate-800 ${props.className}`}
    ></div>
  );
}
