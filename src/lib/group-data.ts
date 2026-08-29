// // src/lib/group-data.ts

// export interface GroupCompany {
//   id: string;
//   shortName: string;
//   fullName: string;
//   sectorDescriptor: string;
//   isPrimary: boolean;
//   websiteUrl?: string | null;
//   image: string;       // Full URL to temporary industry image
//   logoUrl?: string;    // Optional: actual logo URL (not used yet, we use initials overlay)
// }

// export const groupCompanies: GroupCompany[] = [
//   {
//     id: 'metal',
//     shortName: 'Metal',
//     fullName: 'Atharva Metal & Engineering Pvt. Ltd.',
//     sectorDescriptor: 'Sheet Metal Fabrication',
//     isPrimary: false,
//     websiteUrl: 'https://example.com/metal',
//     image: 'https://picsum.photos/id/1015/2400/800', // industrial scene
//   },
//   {
//     id: 'corrugations',
//     shortName: 'Corrugations',
//     fullName: 'Atharva Corrugations Pvt. Ltd.',
//     sectorDescriptor: 'Corrugated Packaging',
//     isPrimary: false,
//     websiteUrl: 'https://example.com/corrugations',
//     image: 'https://picsum.photos/id/1043/2400/800',
//   },
//   {
//     id: 'thermofoam',
//     shortName: 'ThermoFoam',
//     fullName: 'ThermoFoam Eng Pvt. Ltd.',
//     sectorDescriptor: 'EPS Thermoforming',
//     isPrimary: false,
//     websiteUrl: 'https://example.com/thermofoam',
//     image: 'https://picsum.photos/id/1060/2400/800',
//   },
//   {
//     id: 'biopharma',
//     shortName: 'Biopharma',
//     fullName: 'Atharva Biopharma Pvt. Ltd.',
//     sectorDescriptor: 'Biopharma Manufacturing',
//     isPrimary: false,
//     websiteUrl: 'https://example.com/biopharma',
//     image: 'https://picsum.photos/id/1080/2400/800',
//   },
//   {
//     id: 'polymers',
//     shortName: 'Polymers',
//     fullName: 'Atharva Polymers Pvt. Ltd.',
//     sectorDescriptor: 'Precision Polymer Manufacturing',
//     isPrimary: true,
//     websiteUrl: null,
//     image: 'https://picsum.photos/id/1074/2400/800',
//   },
// ];

// src/lib/group-data.ts
// import metalImg from '@/assets/group/metal.jpg';
// import corrugationsImg from '@/assets/group/corrugations.jpeg';
// import thermofoamImg from '@/assets/group/thermofoam.png';
// import biopharmaImg from '@/assets/group/biopharma.png';
// import polymersImg from '@/assets/group/polymers.jpg';

export interface GroupCompany {
  id: string;
  shortName: string;
  fullName: string;
  sectorDescriptor: string;
  isPrimary: boolean;
  websiteUrl?: string | null;
  image: string;
  logoUrl?: string;
}

export const groupCompanies: GroupCompany[] = [
  {
    id: 'metal',
    shortName: 'Metal',
    fullName: 'Atharva Metal & Engineering Pvt. Ltd.',
    sectorDescriptor: 'Sheet Metal Fabrication',
    isPrimary: false,
    websiteUrl: 'https://atharvametals.com/',
    image: "/assets/group/metal.jpg", // or metalImg if using Next.js Image component
  },
  {
    id: 'corrugations',
    shortName: 'Corrugations',
    fullName: 'Atharva Corrugations Pvt. Ltd.',
    sectorDescriptor: 'Corrugated Packaging',
    isPrimary: false,
    websiteUrl: 'https://example.com/corrugations',
    image: "/assets/group/corrugations.jpeg",
  },
  {
    id: 'thermofoam',
    shortName: 'ThermoFoam',
    fullName: 'ThermoFoam Eng Pvt. Ltd.',
    sectorDescriptor: 'EPS Thermoforming',
    isPrimary: false,
    websiteUrl: 'https://example.com/thermofoam',
    image: "/assets/group/thermofoam.png",
  },
  {
    id: 'biopharma',
    shortName: 'Biopharma',
    fullName: 'Atharva Biopharma Pvt. Ltd.',
    sectorDescriptor: 'Biopharma Manufacturing',
    isPrimary: false,
    websiteUrl: 'https://example.com/biopharma',
    image: "/assets/group/biopharma.png",
  },
  {
    id: 'polymers',
    shortName: 'Polymers',
    fullName: 'Atharva Polymers Pvt. Ltd.',
    sectorDescriptor: 'Precision Polymer Manufacturing',
    isPrimary: true,
    websiteUrl: null,
    image: "/assets/group/polymers.jpg",
  },
];