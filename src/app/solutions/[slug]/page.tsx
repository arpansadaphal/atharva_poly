import { getProductBySlug, products } from '@/lib/solutions-data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductDetailHeader from '@/components/sections/solutions/ProductDetailHeader'
import ProductOverview from '@/components/sections/solutions/ProductOverview'
import ProductSpecifications from '@/components/sections/solutions/ProductSpecifications'
import ProductApplications from '@/components/sections/solutions/ProductApplications'
import ProductDownloads from '@/components/sections/solutions/ProductDownloads'
import ProductFAQ from '@/components/sections/solutions/ProductFAQ'
import RelatedProducts from '@/components/sections/solutions/RelatedProducts'
import ProductInquiryCTA from '@/components/sections/solutions/ProductInquiryCTA'

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
      url: `https://www.atharvapolymers.com/solutions/${product.slug}`,
      images: [{ url: product.images.hero, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://www.atharvapolymers.com/solutions/${product.slug}`,
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