import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio is Loading...</h1>
        <p className="text-gray-400">If you see this, React is working!</p>
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm">Check the browser console for errors (F12)</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
