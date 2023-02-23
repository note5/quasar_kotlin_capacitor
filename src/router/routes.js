
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { name: "auth-page", path: '/auth/:component?/:id?', component: () => import('src/pages/Authentication/Authentication.vue') }, // authentication routes
      { name: "registration-page", path: '/signup/:component?/:id?', component: () => import('src/pages/Authentication/Registration.vue') }, // registration routes

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
