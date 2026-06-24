export const paths = {
  home: '/',
  gallery: '/inicio',
  login: '/login',
  register: '/register',
  publish: '/publish',
  history: '/history',
  chat: '/chat',
  chatWithId: (id: string) => `/chat?chatId=${id}`,
  productDetail: (id: string) => `/producto/${id}`,
} as const
