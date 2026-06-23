import type { Chat, OpenChatRequest } from '../types/api'
import { apiClient } from './client'

export const chatService = {
  openChat: (body: OpenChatRequest) =>
    apiClient.post<Chat>('/chats', { body }),
}
