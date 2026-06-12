/**
 * NoiseOverlay — Signature Device 2: Material Surface Depth
 *
 * Applies a fine monochromatic noise grain at 3.5% opacity to dark sections.
 * Makes dark surfaces feel like premium material (polymer composite, machined
 * plate) rather than a flat CSS colour fill.
 *
 * USAGE RULES (from IMPLEMENTATION_MASTER_PLAN.md §2.4):
 * ✓ Applied to:  Hero, Impact Metrics, Manufacturing (dark half),
 *                Certifications, Contact CTA
 * ✗ NOT applied: Footer (functional dark, not atmospheric),
 *                Cards, light sections, interactive elements
 *
 * Place as the FIRST child of any dark section with `relative overflow-hidden`.
 *
 * @example
 * <section className="bg-slate-900 relative overflow-hidden py-[120px]">
 *   <NoiseOverlay />
 *   <div className="...">content</div>
 * </section>
 */

// SVG fractal noise — copy exactly, do not modify baseFrequency or numOctaves.
const NOISE_BG =
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        backgroundImage: NOISE_BG,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        opacity: 0.035,
      }}
    />
  )
}