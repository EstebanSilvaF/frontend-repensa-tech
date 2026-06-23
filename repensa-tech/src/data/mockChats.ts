export type MockMessageType = 'text' | 'appointment'

export interface MockMessage {
  id: string
  type: MockMessageType
  content: string
  sentAt: string
  isOutgoing: boolean
}

export interface MockConversation {
  id: string
  contactName: string
  contactSubtitle: string
  productName: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  avatarColor: string
  messages: MockMessage[]
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: 'chat-1',
    contactName: 'Juan Rodríguez',
    contactSubtitle: 'Ing. Electrónica - UNAL',
    productName: 'Arduino uno R3',
    lastMessage: 'Me interesa mucho, ¿sigue disponible?',
    lastMessageAt: '10:37 a.m.',
    unreadCount: 2,
    avatarColor: '#1a9c6e',
    messages: [
      {
        id: 'm1',
        type: 'text',
        content: 'Hola, vi tu Arduino en Re-Pensa. ¿Sigue disponible?',
        sentAt: '10:30 a.m.',
        isOutgoing: false,
      },
      {
        id: 'm2',
        type: 'text',
        content:
          '¡Hola! Sí, está disponible. Lo tengo en muy buen estado, apenas lo usé un semestre en el laboratorio.',
        sentAt: '10:32 a.m.',
        isOutgoing: true,
      },
      {
        id: 'm3',
        type: 'text',
        content: 'Perfecto, me interesa mucho. ¿Cuál sería el precio final?',
        sentAt: '10:34 a.m.',
        isOutgoing: false,
      },
      {
        id: 'm4',
        type: 'text',
        content:
          'El precio es $80.000 negociable. ¿Te quedaría bien recogerlo en el Bloque E?',
        sentAt: '10:35 a.m.',
        isOutgoing: true,
      },
      {
        id: 'm5',
        type: 'text',
        content: 'Me interesa mucho, ¿sigue disponible?',
        sentAt: '10:36 a.m.',
        isOutgoing: false,
      },
      {
        id: 'm6',
        type: 'appointment',
        content: 'Encuentro acordado · Miércoles · 2:00 PM · Bloque E',
        sentAt: '10:37 a.m.',
        isOutgoing: true,
      },
    ],
  },
  {
    id: 'chat-2',
    contactName: 'Sara Cifuentes',
    contactSubtitle: 'Ing. Industrial - UNAL',
    productName: 'RAM DDR3 4GB',
    lastMessage: 'El miércoles a las 2 me funciona perfecto',
    lastMessageAt: '9:15 a.m.',
    unreadCount: 0,
    avatarColor: '#3b82f6',
    messages: [
      {
        id: 'm1',
        type: 'text',
        content: 'Hola Sara, ¿la calculadora sigue disponible?',
        sentAt: '9:00 a.m.',
        isOutgoing: true,
      },
      {
        id: 'm2',
        type: 'text',
        content: 'Sí, está en perfecto estado. ¿Cuándo podrías recogerla?',
        sentAt: '9:05 a.m.',
        isOutgoing: false,
      },
      {
        id: 'm3',
        type: 'text',
        content: 'El miércoles a las 2 me funciona perfecto',
        sentAt: '9:15 a.m.',
        isOutgoing: false,
      },
    ],
  },
  {
    id: 'chat-3',
    contactName: 'Mónica Gaitán',
    contactSubtitle: 'Ing. Sistemas - UNAL',
    productName: 'Sensor HC-SR04',
    lastMessage: 'Gracias por la info, te escribo mañana',
    lastMessageAt: 'Ayer',
    unreadCount: 0,
    avatarColor: '#f97316',
    messages: [
      {
        id: 'm1',
        type: 'text',
        content: '¿La protoboard incluye cables jumper?',
        sentAt: '4:20 p.m.',
        isOutgoing: true,
      },
      {
        id: 'm2',
        type: 'text',
        content: 'Sí, vienen unos 20 cables de colores variados.',
        sentAt: '4:45 p.m.',
        isOutgoing: false,
      },
      {
        id: 'm3',
        type: 'text',
        content: 'Gracias por la info, te escribo mañana',
        sentAt: '5:10 p.m.',
        isOutgoing: false,
      },
    ],
  },
]
