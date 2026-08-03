import Link from 'next/link'

interface InquiryBannerProps {
  heading?: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function InquiryBanner({
  heading = "Can't find exactly what you need?",
  subtext = 'Our technical team can discuss custom compounds, specific grades, and non-standard requirements.',
  ctaLabel = 'Talk to Our Technical Team',
  ctaHref = '/contact',
}: InquiryBannerProps) {
  return (
    <section
      className="bg-slate-50 py-16 border-t border-slate-200 border-b border-slate-200"
      aria-label="Can't find what you need?"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[22px] font-semibold text-slate-900">{heading}</p>
            <p className="text-[15px] text-slate-600 mt-2 max-w-[460px]">{subtext}</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
            <Link
              href={ctaHref}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-[15px]"
            >
              {ctaLabel}
            </Link>
            <span className="text-[13px] text-slate-400">
              or{' '}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="text-[#25D366] font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                chat on WhatsApp
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}