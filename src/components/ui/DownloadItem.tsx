import { FileText, Award, AlertTriangle, BookOpen, Download } from 'lucide-react'
import type { ProductDownload } from '@/types/products'

interface DownloadItemProps {
  download: ProductDownload
}

const iconMap = {
  datasheet: FileText,
  certificate: Award,
  sds: AlertTriangle,
  guide: BookOpen,
}

export default function DownloadItem({ download }: DownloadItemProps) {
  const Icon = iconMap[download.type] || FileText

  return (
    <div className="flex items-center justify-between border-b border-slate-200 last:border-b-0 py-5">
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-slate-400 flex-shrink-0" />
        <div>
          <p className="text-[16px] font-semibold text-slate-900">{download.title}</p>
          <p className="text-[13px] text-slate-400">{download.fileSizeLabel}</p>
        </div>
      </div>
      <a
        href={download.href}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="text-[14px] font-medium text-blue-600 hover:text-blue-700 flex-shrink-0 flex items-center gap-1"
      >
        Download <Download className="w-4 h-4" />
      </a>
    </div>
  )
}