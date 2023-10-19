import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: ' g6',
      path: '/g6',
      component: './GSix',
    },
    {
      name: 'simple-g6',
      path: '/simple',
      component: './Simple',
    },
    {
      name: 'treeMap',
      path: '/treeMap',
      component: './treeMap',
    },
  ],
  npmClient: 'yarn',
});
