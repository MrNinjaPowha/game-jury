import { CSSProperties } from 'react';

export default function Logo() {
  const red: CSSProperties = { fill: 'hsl(0, 80%, 50%)' };
  const darkRed: CSSProperties = { fill: 'hsl(0, 80%, 35%)' };

  return (
    <svg viewBox="0 0 60 100">
      <polyline
        style={darkRed}
        points="51.18 66.22 0 66.22 0 0 60 0 60 8.78 8.82 8.78 8.82 57.43 51.18 57.43 51.18 39.71 27.44 39.71 27.44 30.93 60 30.93 60 66.22"
      />
      <polyline
        style={darkRed}
        points="60 65 60 100 0 100 0 81 8.82 81 8.82 91.22 51.18 91.22 51.18 65"
      />
      <polygon style={red} points="27.44 30.93 60 30.93 51.18 39.71 27.44 39.71 27.44 30.93" />
      <polygon style={red} points="0 0 60 0 60 8.78 8.82 8.78 8.82 57.43 0 66.22 0 0" />
      <polyline style={red} points="8.82 91.22 8.82 81 0 81 0 100" />
    </svg>
  );
}
