// Centralized API Endpoints and Hub routes

export const API_ENDPOINTS = {
  AUTH: {
    // Conditional query param helper for SSO return URL
    LOGIN: (returnUrl?: string) =>
      returnUrl ? `/api/auth/login?returnUrl=${encodeURIComponent(returnUrl)}` : '/api/auth/login',
    CURRENT_USER: '/api/auth/user',
    LOGOUT: '/api/auth/logout',
  },
  MACHINES: {
    ROOT: '/api/v1/admin/machines',
    BY_ID: (id: string) => `/api/v1/admin/machines/${id}`,
    DASHBOARD: (id: string) => `/api/v1/admin/machines/${id}/dashboard`,
    PROVISION: '/api/v1/admin/machines/provision',
  },
  STREAMING_ACCESS: {
    GRANTS: '/api/v1/admin/streaming-access/grants',
    REVOKE: (grantId: string) => `/api/v1/admin/streaming-access/grants/${grantId}/revoke`,
  },
  HUBS: {
    LOBBY: '/hubs/lobby',
  },
} as const;
