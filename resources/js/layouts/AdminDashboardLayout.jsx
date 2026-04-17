import React from 'react';
import AdminDashboardHeader from '../components/AdminDashboardHeader';

export default function AdminDashboardLayout({ children }) {
  return (
    <div>
      <AdminDashboardHeader />
      <main className="container mx-auto py-4">{children}</main>
      {/* <DashboardFooter /> */}
    </div>
  );
}