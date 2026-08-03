import type { SpecSection } from '@/types/products'

interface SpecificationTableProps {
  sections: SpecSection[]
}

export default function SpecificationTable({ sections }: SpecificationTableProps) {
  return (
    <div id="technical-specs">
      {sections.map((section, si) => (
        <div key={si} className={si > 0 ? 'mt-12' : ''}>
          <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-[0.08em] pb-3 border-b border-slate-200">
            {section.title}
          </h3>
          <table className="w-full table-fixed border-collapse mt-2">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[40%] text-left text-[11px] uppercase tracking-[0.08em] text-slate-400 font-semibold py-3 pr-4 border-b border-slate-200"
                >
                  Property
                </th>
                <th
                  scope="col"
                  className="w-[20%] text-left text-[11px] uppercase tracking-[0.08em] text-slate-400 font-semibold py-3 pr-4 border-b border-slate-200"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="w-[20%] text-left text-[11px] uppercase tracking-[0.08em] text-slate-400 font-semibold py-3 pr-4 border-b border-slate-200"
                >
                  Unit
                </th>
                <th
                  scope="col"
                  className="w-[20%] hidden md:table-cell text-left text-[11px] uppercase tracking-[0.08em] text-slate-400 font-semibold py-3 pr-4 border-b border-slate-200"
                >
                  Test Standard
                </th>
              </tr>
            </thead>
            <tbody>
              {section.specs.map((spec, i) => (
                <tr key={i}>
                  <td className="text-[14px] text-slate-500 py-4 pr-4 border-b border-slate-200 align-top">
                    {spec.property}
                  </td>
                  <td className="text-[14px] font-semibold text-slate-900 py-4 pr-4 border-b border-slate-200 align-top">
                    {spec.value}
                  </td>
                  <td className="text-[14px] text-slate-400 py-4 pr-4 border-b border-slate-200 align-top">
                    {spec.unit}
                  </td>
                  <td className="text-[13px] text-slate-400 py-4 pr-4 border-b border-slate-200 hidden md:table-cell align-top">
                    {spec.standard || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}