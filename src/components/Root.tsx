import React from 'react';
import { Nav } from './Nav';

export const Root: React.FC = () => {
  return (
    <div
      className="h-full w-full"
      style={{ display: 'grid', gridTemplateRows: 'auto 80px' }}
    >
      <main className="overflow-auto">
        <div />
      </main>
      <div className="shadow-2xl" style={{ gridRow: 2 }}>
        <Nav />
      </div>
    </div>
  );
};
