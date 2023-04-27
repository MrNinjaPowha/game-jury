import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100 text-gray-800 dark:bg-slate-900 dark:text-gray-200">
        <Main />
        <NextScript />
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
