import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import DropdownButton from './button';
import DropdownMenu from './menu';
import DropdownLink from './link';
import DropdownOption from './option';

type DropdownProps = HTMLAttributes<HTMLDivElement>;

export default function Dropdown(props: DropdownProps) {
  const self = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    self.current?.querySelector('.dropdown-button')?.addEventListener('click', () => {
      setExpanded(!expanded);
    });
    self.current?.querySelectorAll('.dropdown-option').forEach((button) =>
      button.addEventListener('click', () => {
        setExpanded(false);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const menu = self.current?.querySelector('.dropdown-menu');
    if (menu) {
      menu.setAttribute('data-expanded', `${expanded}`);
    }
  }, [expanded]);

  function handleBlur(event: React.FocusEvent<HTMLDivElement, HTMLButtonElement>) {
    let blurred = true;
    self.current?.querySelector('.dropdown-menu')?.childNodes.forEach((child) => {
      if (child === event.relatedTarget) {
        blurred = false;
      }
    });

    setExpanded(!blurred);
  }

  return (
    <div {...props} className={`relative ${props.className}`} onBlur={handleBlur} ref={self}></div>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Link = DropdownLink;
Dropdown.Option = DropdownOption;
