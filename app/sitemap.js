import { client } from '@/sanity/lib/client'

const baseUrl = 'https://www.healthfirstmedicorp.com'

export const revalidate = 3600

// Next stringifies a Date via toISOString() but passes a string through
// untouched, so date-only lastmod means passing a string.
const day = (value) => new Date(value).toISOString().slice(0, 10)

export default async function sitemap() {
  const products = await client.fetch(
    `*[_type == "allProducts" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  )

  const newestProduct = products.reduce(
    (latest, p) => (p._updatedAt > latest ? p._updatedAt : latest),
    '1970-01-01T00:00:00Z'
  )

  return [
    { url: baseUrl, lastModified: day(newestProduct), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: '2026-09-02', changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/contact-us`, lastModified: '2026-09-02', changeFrequency: 'yearly', priority: 0.4 },
    ...products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: day(p._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ]
}
