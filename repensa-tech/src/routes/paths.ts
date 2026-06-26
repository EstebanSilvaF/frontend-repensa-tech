export const paths = {
  home: '/',
  gallery: '/inicio',
  login: '/login',
  register: '/register',
  publish: '/publish',
  history: '/history',
  favorites: '/favorites',
  profile: '/profile',
  chat: '/chat',
  productDetail: (id: string) => `/producto/${id}`,
} as const
