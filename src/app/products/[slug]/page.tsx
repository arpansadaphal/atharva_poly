import { getProductBySlug, products } from '@/lib/products-data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductDetailHeader from '@/components/sections/products/ProductDetailHeader'
import ProductOverview from '@/components/sections/products/ProductOverview'
import ProductSpecifications from '@/components/sections/products/ProductSpecifications'
import ProductApplications from '@/components/sections/products/ProductApplications'
import ProductDownloads from '@/components/sections/products/ProductDownloads'
import ProductFAQ from '@/components/sections/products/ProductFAQ'
import RelatedProducts from '@/components/sections/products/RelatedProducts'
import ProductInquiryCTA from '@/components/sections/products/ProductInquiryCTA'

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `https://www.atharvapolymers.com/products/${product.slug}`,
      images: [{ url: product.images.hero, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://www.atharvapolymers.com/products/${product.slug}`,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <ProductDetailHeader product={product} />
      <ProductOverview product={product} />
      <ProductSpecifications product={product} />
      <ProductApplications product={product} />
      <ProductDownloads product={product} />
      <ProductFAQ product={product} />
      <RelatedProducts product={product} />
      <ProductInquiryCTA product={product} />
    </>
  )
}