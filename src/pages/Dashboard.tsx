import React from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { DashboardCards, ActionButtons, GetStartedSteps } from 'components/dashboard';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Welcome, Akinkanju</h1>
            <div className="flex items-center">
              <ActionButtons />
            </div>
          </div>
          <DashboardCards />
          <GetStartedSteps />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;