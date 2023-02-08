import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import { persistor, store } from '../app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function App({ Component, pageProps, ...appProps }) {
    if (['/auth/login', '/auth/register','/story/:id'].includes(appProps.router.pathname))
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        );
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ProtectedRoute>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ProtectedRoute>
            </PersistGate>
        </Provider>
    );
}
