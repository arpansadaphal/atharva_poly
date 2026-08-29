'use client';

import dynamic from 'next/dynamic';

const InternationalReach = dynamic(() => import('./InternationalReach'), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900" />, // optional
});

export default InternationalReach;