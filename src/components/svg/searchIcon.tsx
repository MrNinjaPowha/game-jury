import { CSSProperties } from 'react';

export default function SearchIcon() {
  const lineStroke: CSSProperties = {
    fill: 'none',
    strokeWidth: 15,
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
  };

  return (
    <svg className="stroke-gray-800 dark:stroke-gray-200" viewBox="0 0 100 100">
      <circle style={lineStroke} cx="61.4" cy="38.6" r="28.6" />
      <line style={lineStroke} x1="10" y1="90" x2="41.2" y2="58.8" />
    </svg>
  );
}
