export const paths = {
  home: '/',
  gallery: '/inicio',
  login: '/login',
  register: '/register',
  publish: '/publish',
  history: '/history',
  chat: '/chat',
  productDetail: (id: string) => `/producto/${id}`,
} as const
