import { Link, useLocation } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import IconDown from '../icons/down';

type DropdownMenuProps = {
  label: string;
  options: { label: string; path: string }[];
};

export default function DropdownMenu({ label, options }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li ref={menuRef} className="relative" onClick={() => setIsOpen(!isOpen)}>
      <span
        className={`subtitle-sm p-1 cursor-pointer ${
          options.some((option) => location.pathname.startsWith(option.path))
            ? 'text-emerald-500 border-b-[1px] border-b-emerald-500'
            : 'text-white hover:text-emerald-500'
        }`}
      >
        {label}
        <IconDown
          className={`w-4 h-4 inline-block ml-1 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </span>
      {isOpen && (
        <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 w-48">
          {options.map((option, index) => (
            <li
              key={index}
              className={`hover:bg-gray-100 ${
                location.pathname === option.path
                  ? 'text-emerald-500'
                  : 'text-slate-900'
              }`}
            >
              <Link
                to={option.path}
                className="block px-4 py-2 text-sm hover:text-shadow-emerald-600"
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
