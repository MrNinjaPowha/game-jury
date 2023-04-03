import { CSSProperties } from 'react';

const iconColors = {
  light: '#1f2937',
  dark: '#e5e7eb',
};

function LightThemeIcon(props: { color?: string }) {
  const color = props.color || iconColors.light;

  const lineStroke: CSSProperties = {
    stroke: color,
    strokeWidth: 10,
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
  };

  return (
    <svg viewBox="0 0 100 100">
      <circle style={{ fill: color }} cx="50" cy="50" r="20" />
      <line style={lineStroke} x1="50" y1="92.5" x2="50" y2="77.5" />
      <line style={lineStroke} x1="13.2" y1="71.2" x2="26.2" y2="63.7" />
      <line style={lineStroke} x1="13.2" y1="28.8" x2="26.2" y2="36.3" />
      <line style={lineStroke} x1="50" y1="7.5" x2="50" y2="22.5" />
      <line style={lineStroke} x1="86.8" y1="28.7" x2="73.8" y2="36.2" />
      <line style={lineStroke} x1="86.8" y1="71.2" x2="73.8" y2="63.7" />
    </svg>
  );
}

function DarkThemeIcon(props: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100">
      <path
        style={{ fill: props.color || iconColors.dark }}
        d="M46.1,5.9c9.1,2.6,11,24.1,4.1,48C43.4,77.8,30.4,95,21.3,92.4c23.9,6.9,48.8-6.9,55.7-30.8C83.8,37.7,70,12.7,46.1,5.9z"
      />
    </svg>
  );
}

export default function ThemeIcon(props: { icon: string; activeTheme: string }) {
  const color = props.activeTheme === 'light' ? iconColors.light : iconColors.dark;
  const icons: { [key: string]: JSX.Element } = {
    light: <LightThemeIcon color={color} />,
    dark: <DarkThemeIcon color={color} />,
  };

  return icons[props.icon];
}
