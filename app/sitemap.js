import { client } from '@/sanity/lib/client' // your existing Sanity client

const baseUrl = 'https://www.healthfirstmedicorp.com'

export default async function sitemap() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  )

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about-us`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact-us`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  return [...staticUrls, ...productUrls]
}