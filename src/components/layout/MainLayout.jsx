import React, { memo } from 'react';
import { Header } from './Header';

export const MainLayout = memo(({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-100 shadow-sm border p-6 transition-colors duration-200">
          {children}
        </div>
      </main>
    </div>
  );
});