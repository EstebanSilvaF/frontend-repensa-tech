import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../api/productService'
import AppNavbar from '../components/layout/AppNavbar'
import ImagePlaceholderIcon from '../components/icons/ImagePlaceholderIcon'
import SearchIcon from '../components/icons/SearchIcon'
import { useAuth } from '../hooks/useAuth'
import type { Product } from '../types/api'
import {
  galleryCategories,
  toApiCategory,
  type GalleryCategory,
} from '../utils/categories'
import { formatPrice } from '../utils/formatPrice'
import './StartPage.css'

export default function StartPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Todo')
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      setProducts([])
      setError(null)
      return
    }

    let cancelled = false

    async function loadProducts() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await productService.getProducts({
          category: toApiCategory(activeCategory),
          search: search.trim() || undefined,
        })
        if (!cancelled) setProducts(data)
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudieron cargar los productos',
          )
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    const timeoutId = window.setTimeout(loadProducts, 300)
    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [isAuthenticated, activeCategory, search])

  return (
    <div className="start-page">
      <AppNavbar />

      <main className="start-page__main">
        <div className="start-page__search">
          <SearchIcon className="start-page__search-icon" />
          <input
            type="search"
            className="start-page__search-input"
            placeholder="Busca componentes de hardware o elementos necesarios"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!isAuthenticated}
          />
        </div>

        <div className="start-page__filters" role="group" aria-label="Categorías">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`start-page__filter${
                activeCategory === category ? ' start-page__filter--active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
              disabled={!isAuthenticated}
            >
              {category}
            </button>
          ))}
        </div>

        {isAuthLoading ? (
          <p className="start-page__status">Cargando...</p>
        ) : !isAuthenticated ? (
          <div className="start-page__status start-page__status--auth">
            <p>Inicia sesión para ver los productos de tu universidad.</p>
            <div className="start-page__status-actions">
              <Link to="/login" className="start-page__status-link">
                Iniciar sesión
              </Link>
              <Link to="/register" className="start-page__status-link">
                Regístrate
              </Link>
            </div>
          </div>
        ) : isLoading ? (
          <p className="start-page__status">Cargando productos...</p>
        ) : error ? (
          <p className="start-page__status start-page__status--error" role="alert">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className="start-page__status">
            No hay productos disponibles con estos filtros.
          </p>
        ) : (
          <div className="start-page__grid">
            {products.map((product) => (
              <article key={product.id} className="start-page__card">
                <div className="start-page__card-image">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="start-page__card-img"
                    />
                  ) : (
                    <ImagePlaceholderIcon />
                  )}
                </div>
                <div className="start-page__card-body">
                  <h2 className="start-page__card-title">{product.name}</h2>
                  <p className="start-page__card-price">
                    {formatPrice(product.price, product.is_donation)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
