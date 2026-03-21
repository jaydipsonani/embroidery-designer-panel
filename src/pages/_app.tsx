import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/assets/styles/globals.scss';
import '../assets/styles/nprogress.scss';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import GlobalLoader from '@/components/globalLoader';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
// Configure NProgress (optional)
NProgress.configure({ showSpinner: false });
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
    const [isglobalLoaderActive, setIsglobalLoaderActive] = useState(false);


  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const handleStart = () => setIsglobalLoaderActive(true);
    const handleComplete = () => setIsglobalLoaderActive(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <GlobalLoader isActive={isglobalLoaderActive} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
