export type MarketStatus = 'confirmed' | 'confidential';

export interface ExportRoute {
  id: string;                     // stable key, e.g. 'united-states'
  destinationLabel: string;       // 'United States' – empty for confidential
  status: MarketStatus;
  /** [lat, lng] – matches COBE's native tuple order. */
  coordinates: [number, number] | null;   // null only for confidential
  region?: string;                // e.g. 'North America'
}

export interface OriginPoint {
  label: string;                  // 'MIDC Ranjangaon, Pune'
  coordinates: [number, number];  // [lat, lng]
  coordinateDisplay: string;      // '18.78°N 74.18°E'
}