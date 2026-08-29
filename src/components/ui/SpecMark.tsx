import React from 'react';

/**
 * Signature Specification Mark – a thin blue line with a small circle accent.
 * Used as the visual anchor for section eyebrows across the site.
 */
const SpecMark: React.FC = () => {
  return (
    <span
      className="inline-block align-middle relative"
      aria-hidden="true"
    >
      {/* Thin blue line */}
      <span className="block w-8 h-[2px] bg-blue-500 rounded-full" />
      {/* Small circle on the left */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border border-blue-500 rounded-full opacity-70" />
    </span>
  );
};

export default SpecMark;