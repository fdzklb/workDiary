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
    {
        name: 'dndPro',
        path: '/dndPro',
        loader: () => import('../pages/dndPro')
    },
    {
        name: 'dnd',
        path: '/dnd',
        loader: () => import('../pages/dnd')
    },
];

export default routes