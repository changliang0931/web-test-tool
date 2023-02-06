import { lazy } from 'react';
// project import
import Loadable from '../components/Loadable';
import Layout from "../layout"
// render 
const Aptos = Loadable(lazy(() => import('../pages/Aptos')));
const Ethereum = Loadable(lazy(() => import('../pages/Ethereum')));
const Home = Loadable(lazy(() => import('../pages/Home')));
const EosPage = Loadable(lazy(() => import('../pages/Eos')));
// const TronPage = Loadable(lazy(() => import('../pages/Tron')));
const MainRoutes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'aptos',
            element: <Aptos />
        },
        {
            path: 'ethereum',
            element: <Ethereum />
        },
        {
            path: 'eos',
            element: <EosPage />
        },
        // {
        //     path: 'tron',
        //     element: <TronPage />
        // },
        {
            path: 'polkadot',
            element: <EosPage />
        },
    ]
};

export default MainRoutes;