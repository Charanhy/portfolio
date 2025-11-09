import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading...', showSpinner = true }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {showSpinner && (
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
      )}
      <p className="text-gray-400 text-lg">{message}</p>
      <p className="text-gray-500 text-sm mt-2">Please wait while we load your content...</p>
    </div>
  );
};

export default LoadingState;
