import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { products, getProductBySlug } from '@/lib/products-data'
import ProductDetailClient from './client' // we'll create a client component for interactivity

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} | Atharva Polymers`,
    description: product.tagline,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}