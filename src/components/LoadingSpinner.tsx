
import { Truck } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 40 }: LoadingSpinnerProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="animate-bounce mb-4">
          <div className="h-16 w-16 bg-kargon-red rounded-full flex items-center justify-center">
            <Truck className="text-white" size={size} />
          </div>
        </div>
        <div className="text-2xl font-bold text-kargon-dark">XPREXX</div>
        <div className="mt-2 text-sm text-gray-600">Express Delivery Solutions</div>
        <div className="mt-4 flex space-x-1">
          <div className="h-3 w-3 bg-kargon-red rounded-full animate-pulse"></div>
          <div className="h-3 w-3 bg-kargon-red rounded-full animate-pulse delay-150"></div>
          <div className="h-3 w-3 bg-kargon-red rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
