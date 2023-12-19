const routes = [
    {
        name: '首页',
        path: '/',
        loader: () => import('../pages/home')
    },
    {
        name: 'drag',
        path: '/drag',
        loader: () => import('../pages/drag')
    },
];

export default routes