import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import ContentForManager from '../components/ContentForManager';
import ContentForNormaluser from '../components/ContentForNormaluser'
import Login from '../components/Login'

const routes = [
    {
        path: '/content-for-manager',
        name: 'ContentForManager',
        component: ContentForManager
    },
    {
        path: '/content-for-normaluser',
        name: 'ContentForNormaluser',
        component: ContentForNormaluser
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'defaultPage',
        component: Login
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;