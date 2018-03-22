import Home from './client/home/Home';
import Hot from './client/pages/Hot';
import Latest from './client/pages/Latest';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  }, {
    path: '/hot',
    component: Hot,
  }, {
    path: '/latest',
    component: Latest,
  }
]

export default routes
