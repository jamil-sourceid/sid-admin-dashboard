export interface Permission {
  module: string;
  permissions: string[];
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface DashboardLayoutprops {
  children?: React.ReactNode;
  pageTag?: string;
  pageTitle?: string;
  pageDesc?: string;
  pageClass?: string;
  customComponent?: React.ReactNode; // New prop for a custom component
}
