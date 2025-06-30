import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Builder.io Dashboard</h1>h1>
      </header>header>
      
      <div className="dashboard-content">
        {children}
      </div>div>
      
      <footer className="dashboard-footer">
        <p>&copy; 2024 Builder.io Project</p>p>
      </footer>footer>
    </div>div>
  );
};

export default DashboardLayout;</div>
