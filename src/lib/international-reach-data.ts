import { ExportRoute, OriginPoint } from '@/types/international-reach';

export const origin: OriginPoint = {
  label: 'MIDC Ranjangaon, Pune',
  // ⚠ Approximate – confirm exact facility pin with client
  coordinates: [18.78, 74.18],
  coordinateDisplay: '18.78°N 74.18°E',
};

export const exportRoutes: ExportRoute[] = [
  {
    id: 'united-states',
    destinationLabel: 'United States',
    status: 'confirmed',
    coordinates: [37.0902, -95.7129],
    region: 'North America',
  },
  {
    id: 'mexico',
    destinationLabel: 'Mexico',
    status: 'confirmed',
    coordinates: [23.6345, -102.5528],
    region: 'North America',
  },
  {
    id: 'confidential-1',
    destinationLabel: '',
    status: 'confidential',
    coordinates: null,
  },
  {
    id: 'confidential-2',
    destinationLabel: '',
    status: 'confidential',
    coordinates: null,
  },
];

/** Filter to only routes safe to render on maps/globe. */
export const getRenderableRoutes = (): ExportRoute[] =>
  exportRoutes.filter((route) => route.status === 'confirmed' && route.coordinates);