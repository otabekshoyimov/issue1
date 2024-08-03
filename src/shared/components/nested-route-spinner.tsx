import { RefreshCw } from 'lucide-react';

export const NestedRouteSpinner = () => {
  return (
    <>
      <div className="spinner-overlay">
        <RefreshCw className="animate-spin" color="#7a7a7a" size={20} />
      </div>
    </>
  );
};
