
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/student/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/student/home",
    "route": "/student"
  },
  {
    "renderMode": 2,
    "route": "/student/home"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23639, hash: 'e1b2e27508716fff0ce98ef517640ea47a8ab75effb69f3ce18e88046f6aadf1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17213, hash: 'f49c15f0d04cb71d8f896cb3c5a77f3c7c41e5cef7ba9eb6da689eb8bb9a699d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'student/home/index.html': {size: 60094, hash: 'b828e728133e936caf88b2f945d0afcd53ed492ef99756ea5e964e9594a817d2', text: () => import('./assets-chunks/student_home_index_html.mjs').then(m => m.default)},
    'styles-CXQUZ3PB.css': {size: 6979, hash: 'mYIPdabeAag', text: () => import('./assets-chunks/styles-CXQUZ3PB_css.mjs').then(m => m.default)}
  },
};
