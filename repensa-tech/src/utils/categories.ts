import type { ProductCategory } from '../types/api'

export const galleryCategories = [
  'Todo',
  'Microcontroladores',
  'Sensores',
  'Memorias',
  'Displays',
  'Cables',
  'Energía',
  'Otros',
] as const

export type GalleryCategory = (typeof galleryCategories)[number]

const categoryToApi: Record<Exclude<GalleryCategory, 'Todo'>, ProductCategory> =
  {
    Microcontroladores: 'microcontrollers',
    Sensores: 'sensors',
    Memorias: 'memory',
    Displays: 'displays',
    Cables: 'cables',
    Energía: 'power',
    Otros: 'other',
  }

export function toApiCategory(
  category: GalleryCategory,
): ProductCategory | undefined {
  if (category === 'Todo') return undefined
  return categoryToApi[category]
}
