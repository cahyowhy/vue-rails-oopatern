import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

const homeComponent = () => import('./pages/home').then(({ HomeComponent }) => HomeComponent);
const aboutComponent = () => import('./pages/about').then(({ AboutComponent }) => AboutComponent);
const listComponent = () => import('./components/list').then(({ ListComponent }) => ListComponent);

if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './pages/home';
  const aboutModuleId = './pages/about';
  const listModuleId = './components/list';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./pages/home', () => reload(homeModuleId, (<any>require('./pages/home')).HomeComponent)));

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./pages/about', () => reload(aboutModuleId, (<any>require('./pages/about')).AboutComponent)));

  makeHot(listModuleId, listComponent,
    module.hot.accept('./components/list', () => reload(listModuleId, (<any>require('./components/list')).ListComponent)));
}

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
  },
  {
    path: '/about',
    component: aboutComponent,
  },
  {
    path: '/list',
    component: listComponent,
  }
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
