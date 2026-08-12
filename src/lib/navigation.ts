/**
 * lib/navigation.ts — Navbar mega menu configuration.
 *
 * Kept separate from lib/data.ts intentionally: this is structural nav
 * config (mega menu columns), not page content. Splitting it out keeps
 * data.ts focused on site content and keeps the Navbar's data import small
 * and easy to scan. If this ever needs to vary by locale/CMS, this is the
 * one file to touch.
 */

export type MegaIcon =
  | 'layers'
  | 'cpu'
  | 'flask'
  | 'car'
  | 'package'
  | 'shopping-bag'
  | 'building2'
  | 'file-text'
  | 'shield'
  | 'wrench'

export interface MegaMenuLink {
  label: string
  href: string
  icon: MegaIcon
  desc?: string
}

export interface MegaMenuData {
  categories: MegaMenuLink[]
  industries: MegaMenuLink[]
  resources: MegaMenuLink[]
}

export const megaMenuData: MegaMenuData = {
  categories: [
    {
      label: 'Caps & Enclosures',
      desc: 'Standard and custom caps, closures and container components',
      href: '/products?category=caps-enclosures',
      icon: 'layers',
    },
    {
      label: 'Automotive Parts',
      desc: 'Precision components for Toro, Ditch Witch and off-road vehicles',
      href: '/products?category=automotive-parts',
      icon: 'car',
    },
    {
      label: 'Toro Optimus Parts',
      desc: 'Exclusive components for autonomous lawnmower systems',
      href: '/products?category=toro-optimus',
      icon: 'cpu',
    },
  ],
  industries: [
    { label: 'Automotive', href: '/industries/automotive', icon: 'car' },
    { label: 'Appliances', href: '/industries/appliances', icon: 'package' },
    { label: 'Industrial & Others', href: '/industries/others', icon: 'wrench' },
  ],
  resources: [
    {
      label: 'Technical Data Sheets',
      desc: 'Download product specifications',
      href: '/products#downloads',
      icon: 'file-text',
    },
    {
      label: 'Quality & Certifications',
      desc: 'IATF 16949, ISO 9001, ISO 14001, ISO 45001',
      href: '/manufacturing#certifications',
      icon: 'shield',
    },
    {
      label: 'Manufacturing Capabilities',
      desc: 'Production scale and process overview',
      href: '/manufacturing',
      icon: 'wrench',
    },
    {
      label: 'Request a Sample',
      desc: 'Material samples for evaluation',
      href: '/contact?inquiry=technical',
      icon: 'package',
    },
  ],
}