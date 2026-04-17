import React from 'react';
import Header from '../components/Header';

export default function AppLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-4">{children}</main>
    </div>
  );
}