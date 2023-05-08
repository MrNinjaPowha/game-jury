import LoadingButton from '@/components/loadingButton';
import Logo from '@/components/svg/logo';
import { User, validateUser } from '@/helpers/account/user-validation';
import { formatDate } from '@/helpers/datetime';
import { AuthenticateResponse } from '@/pages/api/users/authenticate';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  const form = {
    username: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    birthdate: useRef<HTMLInputElement>(null),
  };

  async function onSubmit() {
    if (!(form.username.current && form.password.current && form.birthdate.current)) {
      setFormError('could not retrieve input value, please try again later.');
      return;
    }
    if (!form.birthdate.current.valueAsDate) {
      setFormError('no birthdate set.');
      return;
    }

    setFormError('');
    setLoading(true);

    const user: User = {
      username: form.username.current.value,
      password: form.password.current.value,
      birthdate: form.birthdate.current.valueAsDate,
    };

    const formResponse = await validateUser(user);

    if (typeof formResponse === 'string') {
      setFormError(formResponse);
      setLoading(false);
      return;
    }

    try {
      await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(user),
      });

      login(user.username, user.password);
    } catch (err) {
      setFormError('something went wrong, please try again later.');
      setLoading(false);
    }
  }

  async function login(username: string, password: string) {
    try {
      const response = await fetch('/api/users/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const authentication: AuthenticateResponse = await response.json();

      if (!authentication.success) {
        setFormError(authentication.error);
        setLoading(false);
        return;
      }
      if (!authentication.token) {
        setFormError('something went wrong, please try again later.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', authentication.token);
    } catch (err) {
      console.error(err);
    }

    window.location.assign('/');
  }

  return (
    <>
      <Head>
        <title>Game Jury - Register</title>
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
            className="block rounded-sm p-1 dark:bg-slate-700"
            id="username"
            type="text"
            ref={form.username}
          />
          <label className="mt-2 block text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="block rounded-sm p-1 dark:bg-slate-700"
            id="password"
            type="password"
            ref={form.password}
          />
          <label className="mt-2 block text-sm" htmlFor="birthdate">
            Year born
          </label>
          <input
            className="block rounded-sm p-1 dark:bg-slate-700"
            id="birthdate"
            type="date"
            ref={form.birthdate}
            max={formatDate(new Date())}
            min="1900-01-01"
            pattern="\d{4}-\d{2}-\d{2}"
          />
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div className="mt-4 flex gap-2">
            <LoadingButton
              className="btn btn-blue"
              onClick={onSubmit}
              loading={loading}
              spinnerClass="border-t-gray-200 border-gray-200/30"
            >
              Register
            </LoadingButton>
            <Link className="btn btn-default" href={'/account/login'}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
