import { useEffect, useMemo, useRef, useState } from 'react'
import AppNavbar from '../components/layout/AppNavbar'
import ArrowRightIcon from '../components/icons/ArrowRightIcon'
import SearchIcon from '../components/icons/SearchIcon'
import {
  MOCK_CONVERSATIONS,
  type MockConversation,
  type MockMessage,
} from '../data/mockChats'
import './ChatPage.css'

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function formatTimeNow(): string {
  return new Date().toLocaleTimeString('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function LocationPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function renderMessageContent(content: string) {
  const linkMatch = content.match(/(https?:\/\/\S+)/)
  if (!linkMatch) return content

  const [before, after] = content.split(linkMatch[0])
  return (
    <>
      {before}
      <a
        href={linkMatch[0]}
        className="chat-panel__bubble-link"
        target="_blank"
        rel="noreferrer"
      >
        {linkMatch[0]}
      </a>
      {after}
    </>
  )
}

interface ConversationState extends MockConversation {
  messages: MockMessage[]
}

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [conversations, setConversations] = useState<ConversationState[]>(
    () => MOCK_CONVERSATIONS.map((c) => ({ ...c, messages: [...c.messages] })),
  )
  const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0]?.id ?? '')
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')

  const activeChat = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  )

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return conversations

    return conversations.filter(
      (c) =>
        c.contactName.toLowerCase().includes(query) ||
        c.productName.toLowerCase().includes(query) ||
        c.lastMessage.toLowerCase().includes(query),
    )
  }, [conversations, search])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChat?.id, activeChat?.messages.length])

  function selectConversation(id: string) {
    setActiveId(id)
    setDraft('')
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    )
  }

  function handleSend() {
    const content = draft.trim()
    if (!content || !activeChat) return

    const newMessage: MockMessage = {
      id: `local-${Date.now()}`,
      type: 'text',
      content,
      sentAt: formatTimeNow(),
      isOutgoing: true,
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: content,
              lastMessageAt: newMessage.sentAt,
            }
          : c,
      ),
    )
    setDraft('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-page">
      <AppNavbar />

      <main className="chat-page__main">
        <div className="chat-page__shell">
          <aside className="chat-sidebar" aria-label="Lista de conversaciones">
            <div className="chat-sidebar__header">
              <h1 className="chat-sidebar__title">Mensajes</h1>
              <div className="chat-sidebar__search">
                <SearchIcon className="chat-sidebar__search-icon" />
                <input
                  type="search"
                  className="chat-sidebar__search-input"
                  placeholder="Busca conversación"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Buscar conversación"
                />
              </div>
            </div>

            <ul className="chat-sidebar__list">
              {filteredConversations.map((conversation) => {
                const isActive = conversation.id === activeId

                return (
                  <li key={conversation.id}>
                    <button
                      type="button"
                      className={`chat-sidebar__item${
                        isActive ? ' chat-sidebar__item--active' : ''
                      }`}
                      onClick={() => selectConversation(conversation.id)}
                    >
                      <span
                        className="chat-sidebar__avatar"
                        style={{ background: conversation.avatarColor }}
                        aria-hidden="true"
                      >
                        {getInitials(conversation.contactName)}
                      </span>

                      <div className="chat-sidebar__content">
                        <div className="chat-sidebar__row">
                          <span className="chat-sidebar__name">
                            {conversation.contactName}
                          </span>
                          <span className="chat-sidebar__time">
                            {conversation.lastMessageAt}
                          </span>
                        </div>
                        <span className="chat-sidebar__product-tag">
                          {conversation.productName}
                        </span>
                        <p className="chat-sidebar__preview">
                          {conversation.lastMessage}
                        </p>
                      </div>

                      {conversation.unreadCount > 0 && (
                        <div className="chat-sidebar__meta">
                          <span
                            className="chat-sidebar__badge"
                            aria-label={`${conversation.unreadCount} sin leer`}
                          >
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          <section className="chat-panel" aria-label="Conversación activa">
            {activeChat ? (
              <>
                <header className="chat-panel__header">
                  <div className="chat-panel__header-main">
                    <span
                      className="chat-panel__avatar"
                      style={{ background: activeChat.avatarColor }}
                      aria-hidden="true"
                    >
                      {getInitials(activeChat.contactName)}
                    </span>
                    <div>
                      <p className="chat-panel__contact-name">
                        {activeChat.contactName}
                      </p>
                      <p className="chat-panel__contact-subtitle">
                        {activeChat.contactSubtitle}
                      </p>
                    </div>
                  </div>
                  <span className="chat-panel__product-chip" title={activeChat.productName}>
                    <span className="chat-panel__product-chip-dot" aria-hidden="true" />
                    {activeChat.productName}
                  </span>
                </header>

                <div className="chat-panel__messages">
                  <div className="chat-panel__date-separator">HOY</div>

                  {activeChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-panel__message chat-panel__message--${
                        message.isOutgoing ? 'outgoing' : 'incoming'
                      }`}
                    >
                      {message.type === 'appointment' ? (
                        <div className="chat-panel__bubble chat-panel__bubble--appointment">
                          <span className="chat-panel__appointment-icon">
                            <LocationPinIcon />
                          </span>
                          <span>{message.content}</span>
                        </div>
                      ) : (
                        <div
                          className={`chat-panel__bubble chat-panel__bubble--${
                            message.isOutgoing ? 'outgoing' : 'incoming'
                          }`}
                        >
                          {renderMessageContent(message.content)}
                        </div>
                      )}
                      <time className="chat-panel__timestamp">{message.sentAt}</time>
                    </div>
                  ))}
                  <div ref={messagesEndRef} aria-hidden="true" />
                </div>

                <form
                  className="chat-panel__composer"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                >
                  <div className="chat-panel__input-wrap">
                    <input
                      type="text"
                      className="chat-panel__input"
                      placeholder="Escribe un mensaje..."
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={handleKeyDown}
                      aria-label="Escribe un mensaje"
                    />
                  </div>
                  <button
                    type="submit"
                    className="chat-panel__send-btn"
                    disabled={!draft.trim()}
                    aria-label="Enviar mensaje"
                  >
                    <ArrowRightIcon />
                  </button>
                </form>
              </>
            ) : (
              <p className="chat-panel__empty">
                <span className="chat-panel__empty-icon" aria-hidden="true">
                  💬
                </span>
                Selecciona una conversación para ver los mensajes.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
