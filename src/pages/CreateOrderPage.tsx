import React from 'react';
import { CreateOrderWizard } from 'components/orders';
import { Topbar, SidebarNav } from 'components/layout';

const CreateOrderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-8 pt-0">
          <CreateOrderWizard />
        </main>
      </div>
    </div>
  );
};

export default CreateOrderPage; 