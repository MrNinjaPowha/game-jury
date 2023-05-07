import { ButtonHTMLAttributes } from 'react';

export default function DropdownOption(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`dropdown-option btn-default w-full min-w-max p-4 py-1 data-[current=true]:!bg-inherit ${props.className}`}
    ></button>
  );
}
