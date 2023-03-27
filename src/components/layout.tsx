import { PropsWithChildren } from 'react';
import Footer from './footer/footer';
import Header from './header/header';

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
