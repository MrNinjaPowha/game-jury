import { ButtonHTMLAttributes } from 'react';

export default function DropdownButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`dropdown-button ${props.className}`}></button>;
}
