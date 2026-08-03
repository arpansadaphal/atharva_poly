'use client'

import { MessageCircle, Phone, Mail } from 'lucide-react'
import { businessInfo } from '@/lib/contact-data'
import { buildWhatsAppURL } from '@/lib/whatsapp'

export default function BusinessInfoPanel() {
  return (
    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-4">QUICK CONTACT</p>

      {/* WhatsApp */}
      <a
        href={buildWhatsAppURL({ context: 'contact' })}
        target="_blank"
        rel="noopener"
        className="flex items-start gap-4 py-3"
        aria-label="Chat with Atharva Polymers on WhatsApp"
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-[16px] font-semibold text-slate-900">Chat on WhatsApp</p>
          <p className="text-[13px] text-slate-400">For fastest response</p>
        </div>
      </a>

      <hr className="border-t border-slate-200 my-4" />

      {/* Phone */}
      <div className="flex items-center gap-4 py-2">
        <Phone className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <span className="text-[15px] text-slate-700">{businessInfo.phone}</span>
      </div>

      {/* Email */}
      <div className="flex items-center gap-4 py-2">
        <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <span className="text-[15px] text-slate-700">{businessInfo.email}</span>
      </div>

      <hr className="border-t border-slate-200 my-4" />

      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-2">OFFICE HOURS</p>
      <p className="text-[14px] text-slate-600">{businessInfo.workingHours}</p>

      <hr className="border-t border-slate-200 my-4" />

      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-2">MANUFACTURING FACILITY</p>
      <p className="text-[14px] text-slate-600 leading-5">
        {businessInfo.manufacturingAddress.line1}, {businessInfo.manufacturingAddress.city}<br />
        {businessInfo.manufacturingAddress.state}, {businessInfo.manufacturingAddress.country}
      </p>

      <hr className="border-t border-slate-200 my-4" />

      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-2">COMMERCIAL OFFICE</p>
      <p className="text-[14px] text-slate-600 leading-5">
        {businessInfo.commercialAddress.line1}, {businessInfo.commercialAddress.city}<br />
        {businessInfo.commercialAddress.state}, {businessInfo.commercialAddress.country}
      </p>
    </div>
  )
}