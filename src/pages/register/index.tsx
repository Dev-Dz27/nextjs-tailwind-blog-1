import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAsyncFn } from 'react-use';
import cl from 'classnames';

export interface RegisterData {
  email: string;
  password: string;
  agree: boolean;
}

export default function Register() {
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm<RegisterData>({
    defaultValues: {},
  });
  const router = useRouter();
  const [state, doFetch] = useAsyncFn(async (data) => {
    const response = await axios.post('/api/auth/register', data);
    return response.data;
  }, []);
  const onSubmit = async (data: RegisterData) => {
    if (!data.agree) {
      setError('请先同意使用条款！');
      return;
    }
    const res = await doFetch(data);
    if (res.success) {
      router.push('/login');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="mx-auto w-full max-w-sm bg-skin-off-base p-10 shadow-lg">
        <h2 className="mt-2 text-3xl leading-9 font-extrabold text-skin-primary">
          注册
        </h2>

        <div className="mt-8">
          {error && (
            <div className="p-3 border border-red-500 text-red-600 bg-red-100 flex justify-between items-center">
              <span>{error}</span>
              <svg
                onClick={() => setError('')}
                className="w-5 h-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium leading-5">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="text"
                    ref={register({
                      required: true,
                      pattern: new RegExp('.+@.+..+'),
                    })}
                  />
                </div>
              </div>
              {errors.email?.type === 'required' && (
                <div className="mt-1 text-red-600">Email is required</div>
              )}
              {errors.email?.type === 'pattern' && (
                <div className="mt-1 text-red-600">Email error</div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium leading-5">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
              </div>
              {errors.password && (
                <div className="mt-1 text-red-600">Password is required</div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name="agree"
                    type="checkbox"
                    ref={register}
                    className=""
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm leading-5"
                  >
                    同意
                  </label>
                </div>

                <div className="text-sm leading-5">
                  <a
                    href="#"
                    className="font-medium text-skin-primary focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    使用条款
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button
                  disabled={state.loading}
                  type="submit"
                  className={cl('btn w-full btn-primary btn-lg', {
                    'opacity-50': state.loading,
                  })}
                >
                  {state.loading ? 'loading' : '注册'}
                </button>
              </div>

              <div className="mt-6">
                <div className="mt-6">
                  已有账号，去
                  <Link href="/register">
                    <a className="text-skin-primary">注册</a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
