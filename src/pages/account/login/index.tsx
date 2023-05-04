import LoadingButton from '@/components/loadingButton';
import Logo from '@/components/svg/logo';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  async function onSubmit() {
    if (!(username.current && password.current)) {
      setFormError('could not retrieve input value, please try again later.');
      return;
    }

    setLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/users/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          username: username.current.value,
          password: password.current.value,
        }),
      });
      const verified: boolean = await response.json();

      if (verified) {
        window.location.assign('/');
      } else {
        setFormError('username or password incorrect');
        setLoading(false);
      }
    } catch (err) {
      setFormError('something went wrong, please try again later.');
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Game Jury - Login</title>
      </Head>
      <div className="mx-auto flex min-h-screen items-center justify-center bg-gray-200 dark:bg-slate-900">
        <div className="rounded-md bg-gray-100 p-8 py-4 shadow dark:bg-slate-800 dark:shadow-xl">
          <h1 className="flex select-none items-center gap-2 p-8 py-4 font-montserrat text-2xl font-semibold">
            <div className="w-5 flex-shrink-0">
              <Logo />
            </div>
            GAME JURY
          </h1>
          <label className="block text-sm" htmlFor="username">
            Username
          </label>
          <input
            className="block rounded p-1 dark:bg-slate-700"
            id="username"
            type="text"
            ref={username}
          />
          <label className="mt-2 block text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="block rounded-sm p-1 dark:bg-slate-700"
            id="password"
            type="password"
            ref={password}
          />
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div className="mt-4 flex gap-2">
            <LoadingButton
              className="btn btn-blue"
              onClick={onSubmit}
              loading={loading}
              spinnerClass="border-t-gray-200 border-gray-200/30"
            >
              Login
            </LoadingButton>
            <Link className="link text-sm" href={'/account/register'}>
              Don&apos;t have an account yet?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
