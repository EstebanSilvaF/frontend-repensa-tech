import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { chatService } from '../api/chatService'
import { ApiError } from '../api/client'
import { productService } from '../api/productService'
import AppFooter from '../components/layout/AppFooter'
import AppNavbar from '../components/layout/AppNavbar'
import ImagePlaceholderIcon from '../components/icons/ImagePlaceholderIcon'
import { getMockProductById } from '../data/mockProducts'
import { useAuth } from '../hooks/useAuth'
import { paths } from '../routes/paths'
import type { Product } from '../types/api'
import { formatPrice } from '../utils/formatPrice'
import { formatRelativeTime } from '../utils/formatRelativeTime'
import { getCategoryLabel, getConditionLabel } from '../utils/productLabels'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpeningChat, setIsOpeningChat] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isOwnProduct = Boolean(product && user && product.seller_id === user.id)

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate(paths.login)
    }
  }, [isAuthenticated, isAuthLoading, navigate])

  useEffect(() => {
    if (!isAuthenticated || !id) return

    let cancelled = false

    async function loadProduct() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await productService.getProductById(id!)
        if (!cancelled) setProduct(data)
      } catch {
        const mock = getMockProductById(id!)
        if (!cancelled) {
          if (mock) {
            setProduct(mock)
          } else {
            setError('No se encontró el producto')
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadProduct()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated, id])

  async function handleOpenChat() {
    if (!product || isOwnProduct || isOpeningChat) return

    setIsOpeningChat(true)
    setChatError(null)

    try {
      const chat = await chatService.openChat(product.id)
      navigate(paths.chatWithId(chat.id))
    } catch (err) {
      setChatError(
        err instanceof ApiError ? err.message : 'No se pudo abrir el chat',
      )
    } finally {
      setIsOpeningChat(false)
    }
  }

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="product-detail-page">
        <AppNavbar />
        <p className="product-detail-page__status">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <AppNavbar />

      <main className="product-detail-page__main">
        <Link to={paths.gallery} className="product-detail-page__back">
          ← Volver
        </Link>

        <h1 className="product-detail-page__title">Detalle del producto</h1>

        {isLoading ? (
          <p className="product-detail-page__status">Cargando producto...</p>
        ) : error || !product ? (
          <p className="product-detail-page__status product-detail-page__status--error" role="alert">
            {error ?? 'Producto no encontrado'}
          </p>
        ) : (
          <article className="product-detail-card">
            <div className="product-detail-card__image">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} />
              ) : (
                <ImagePlaceholderIcon />
              )}
            </div>

            <div className="product-detail-card__info">
              <h2 className="product-detail-card__name">{product.name}</h2>

              <div className="product-detail-card__price-row">
                {product.is_donation ? (
                  <span className="product-detail-card__donation">Donación</span>
                ) : (
                  <span className="product-detail-card__price">
                    {formatPrice(product.price, false)}
                  </span>
                )}
                {!product.is_donation && (
                  <span className="product-detail-card__payment-note">
                    Pago en persona al encontrarse
                  </span>
                )}
              </div>

              {product.description && (
                <p className="product-detail-card__description">
                  {product.description}
                </p>
              )}

              <dl className="product-detail-card__meta">
                <div className="product-detail-card__meta-row">
                  <dt>Estado</dt>
                  <dd>{getConditionLabel(product.condition)}</dd>
                </div>
                <div className="product-detail-card__meta-row">
                  <dt>Categoría</dt>
                  <dd>{getCategoryLabel(product.category)}</dd>
                </div>
                <div className="product-detail-card__meta-row">
                  <dt>Publicado</dt>
                  <dd>{formatRelativeTime(product.created_at)}</dd>
                </div>
                {product.seller_name && (
                  <div className="product-detail-card__meta-row">
                    <dt>Vendedor</dt>
                    <dd>{product.seller_name}</dd>
                  </div>
                )}
              </dl>

              <div className="product-detail-card__actions">
                <button
                  type="button"
                  className="product-detail-card__btn product-detail-card__btn--primary"
                  onClick={() => void handleOpenChat()}
                  disabled={isOwnProduct || isOpeningChat}
                >
                  {isOpeningChat ? 'Abriendo chat...' : 'Abrir chat con vendedor'}
                </button>
                <button type="button" className="product-detail-card__btn product-detail-card__btn--secondary">
                  Reservar producto
                </button>
              </div>

              {isOwnProduct && (
                <p className="product-detail-card__disclaimer">
                  No puedes chatear sobre tu propio producto.
                </p>
              )}

              {chatError && (
                <p className="product-detail-page__status product-detail-page__status--error" role="alert">
                  {chatError}
                </p>
              )}

              <p className="product-detail-card__disclaimer">
                Reserva = bloqueas este producto 7 días pagando una tarifa pequeña.
                Si no compras, pierdes la tarifa.
              </p>
            </div>
          </article>
        )}
      </main>

      <AppFooter variant="light" />
    </div>
  )
}
