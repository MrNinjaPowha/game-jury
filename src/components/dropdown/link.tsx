import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export default function DropdownLink(props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      {...props}
      className={`btn-default flex w-full min-w-max items-center justify-end p-4 py-1 data-[current=true]:pointer-events-none data-[current=true]:!bg-inherit ${props.className}`}
    ></Link>
  );
}
