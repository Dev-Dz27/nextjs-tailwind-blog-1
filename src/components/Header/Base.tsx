import React, { ReactElement } from 'react';
import Link from 'next/link';
import { email, github, name } from '../../config';
import { useMe } from '../../hooks';

interface Props {
  children: ReactElement;
}

export default function Header({ children }: Props): ReactElement {
  const { user, getUser } = useMe();
  return (
    <header
      id="header"
      className="relative top-0 z-50 right-0 left-0 bg-skin-off-base"
    >
      <div className="mx-auto lg:max-w-4xl md:max-w-3xl h-16 flex justify-between items-center">
        <div className="flex-shrink-0 mr-24">
          <Link href="/">
            <a className="flex items-center">
              <span className="text-3xl font-extrabold mr-2">M</span>
              <span>{name}</span>
            </a>
          </Link>
        </div>
        <nav className="flex-1 flex items-center">{children}</nav>
        <div className="flex-1 flex items-center justify-end ml-10 space-x-3">
          <a href={github} rel="noreferrer" target="_blank">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
          </a>
          <a href={`mailto:${email}`} rel="noreferrer" target="_blank">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
          {user ? (
            <Link href="/admin">
              <a>{user.email}</a>
            </Link>
          ) : (
            <Link href="/login">
              <a>
                <button className="btn">登录</button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
