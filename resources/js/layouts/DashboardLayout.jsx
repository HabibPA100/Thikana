import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardFooter from '../components/DashboardFooter';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardHeader />
      <main className="container mx-auto py-4">{children}</main>
      {/* <DashboardFooter /> */}
    </div>
  );
}