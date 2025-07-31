export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  BROKER = 'broker',
  USER = 'user'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Role-specific data
  brokerId?: string; // For users under a broker
  adminId?: string; // For brokers under an admin
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

// Permission-based access control
export interface Permissions {
  // Super Admin permissions
  managePlatform: boolean;
  manageAllAdmins: boolean;
  manageAllBrokers: boolean;
  viewPlatformAnalytics: boolean;
  manageSubscriptions: boolean;
  manageAuditLogs: boolean;
  
  // Admin permissions
  manageBrokers: boolean;
  manageUsers: boolean;
  approveStrategies: boolean;
  setBrokerRules: boolean;
  viewAnalytics: boolean;
  
  // Broker permissions
  createUsers: boolean;
  approveUserStrategies: boolean;
  createBrokerStrategies: boolean;
  viewPnL: boolean;
  sendNotifications: boolean;
  
  // User permissions
  addApiKeys: boolean;
  selectStrategies: boolean;
  viewDashboard: boolean;
  viewTradeLogs: boolean;
}

export const getRolePermissions = (role: UserRole): Permissions => {
  const basePermissions: Permissions = {
    managePlatform: false,
    manageAllAdmins: false,
    manageAllBrokers: false,
    viewPlatformAnalytics: false,
    manageSubscriptions: false,
    manageAuditLogs: false,
    manageBrokers: false,
    manageUsers: false,
    approveStrategies: false,
    setBrokerRules: false,
    viewAnalytics: false,
    createUsers: false,
    approveUserStrategies: false,
    createBrokerStrategies: false,
    viewPnL: false,
    sendNotifications: false,
    addApiKeys: false,
    selectStrategies: false,
    viewDashboard: false,
    viewTradeLogs: false,
  };

  switch (role) {
    case UserRole.SUPER_ADMIN:
      return {
        ...basePermissions,
        managePlatform: true,
        manageAllAdmins: true,
        manageAllBrokers: true,
        viewPlatformAnalytics: true,
        manageSubscriptions: true,
        manageAuditLogs: true,
        manageBrokers: true,
        manageUsers: true,
        approveStrategies: true,
        setBrokerRules: true,
        viewAnalytics: true,
        createUsers: true,
        approveUserStrategies: true,
        createBrokerStrategies: true,
        viewPnL: true,
        sendNotifications: true,
        addApiKeys: true,
        selectStrategies: true,
        viewDashboard: true,
        viewTradeLogs: true,
      };
    
    case UserRole.ADMIN:
      return {
        ...basePermissions,
        manageBrokers: true,
        manageUsers: true,
        approveStrategies: true,
        setBrokerRules: true,
        viewAnalytics: true,
        viewDashboard: true,
      };
    
    case UserRole.BROKER:
      return {
        ...basePermissions,
        createUsers: true,
        approveUserStrategies: true,
        createBrokerStrategies: true,
        viewPnL: true,
        sendNotifications: true,
        viewDashboard: true,
        viewTradeLogs: true,
      };
    
    case UserRole.USER:
      return {
        ...basePermissions,
        addApiKeys: true,
        selectStrategies: true,
        viewDashboard: true,
        viewTradeLogs: true,
      };
    
    default:
      return basePermissions;
  }
};