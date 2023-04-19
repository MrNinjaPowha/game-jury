import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SearchIcon from '../svg/searchIcon';
import LoadingSpinner from '../loadingSpinner';
import { GamesList } from '@/pages/api/db/get-games-list';

export default function SearchBar() {
  const dropdown = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState<GamesList[]>();

  useEffect(() => {
    fetch('/api/db/get-games-list')
      .then((res) => res.json())
      .then((res) => {
        setSearchData(res);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchResults =
    searchData?.map((game) => {
      return (
        <Link
          className="btn-default block p-2 px-4 text-xl"
          href={`/games/${game.titleSlug}`}
          tabIndex={expanded ? 0 : -1}
          key={game.titleSlug}
        >
          {game.title}
        </Link>
      );
    }) ?? null;

  function handleBlur(event: React.FocusEvent<HTMLDivElement, HTMLButtonElement>) {
    let blurred = true;
    dropdown.current?.childNodes.forEach((child) => {
      if (child === event.relatedTarget) {
        blurred = false;
      }
    });

    setExpanded(!blurred);
  }

  return (
    <div className="relative hidden h-10 max-w-md flex-1 md:flex" onBlur={handleBlur}>
      <input
        className="w-full flex-1 rounded-l-full border bg-gray-200 px-6 text-lg shadow dark:border-slate-600 dark:bg-slate-700"
        type="search"
        placeholder="Search"
        onFocus={() => setExpanded(true)}
      ></input>
      <button className="w-12 rounded-r-full border border-gray-200 bg-gray-300 p-2 shadow transition-colors duration-150 hover:bg-gray-350 focus-visible:bg-gray-350 active:bg-gray-400 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus-visible:bg-slate-600 dark:active:bg-slate-500">
        <SearchIcon />
      </button>
      <div
        className="absolute inset-x-0 top-full z-10 mt-1 rounded-md border border-gray-300 bg-gray-200 py-2 shadow-md transition-opacity duration-150 data-[expanded=false]:invisible data-[expanded=false]:opacity-0 dark:border-slate-700 dark:bg-slate-800"
        data-expanded={expanded}
        ref={dropdown}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          searchResults ?? <p className="p-2 px-4">Error: Could not load searchdata</p>
        )}
      </div>
    </div>
  );
}
