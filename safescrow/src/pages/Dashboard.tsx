import React from 'react';
import SidebarNav from '../components/dashboard/SidebarNav';
import Topbar from '../components/dashboard/Topbar';
import DashboardCards from '../components/dashboard/DashboardCards';
import ActionButtons from '../components/dashboard/ActionButtons';
import GetStartedSteps from '../components/dashboard/GetStartedSteps';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 bg-gray-50">
          <h1 className="text-2xl font-semibold mb-6">Welcome, Arthur</h1>
          <ActionButtons />
          <DashboardCards />
          <GetStartedSteps />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 