// lib/auth.ts
export function isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('authToken');
      return !!token;
    }
    return false;
  }
  