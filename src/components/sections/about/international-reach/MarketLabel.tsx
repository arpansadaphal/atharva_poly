import { ExportRoute } from '@/types/international-reach';

interface MarketLabelProps {
  route: ExportRoute;
  index: number;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const MarketLabel: React.FC<MarketLabelProps> = ({ route, index, active, onHover, onLeave, onClick }) => {
  // In real implementation, position is calculated from COBE's anchor or manual projection.
  // For prototype, we approximate positions.
  const left = index === 0 ? '30%' : '35%';
  const top = index === 0 ? '40%' : '55%';

  return (
    <div
      className={`market-label absolute ${active ? 'active' : ''}`}
      style={{ left, top }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`${route.destinationLabel} – ${route.region}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {route.destinationLabel}
      <span className="region">{route.region}</span>
    </div>
  );
};

export default MarketLabel;