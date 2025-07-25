// Content Security Policy configuration
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for Vite dev
  'style-src': ["'self'", "'unsafe-inline'"], // Needed for Tailwind
  'img-src': ["'self'", "data:", "https:"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'connect-src': ["'self'", "https://api.rcsb.org", "wss://localhost:*"], // PDB API + dev WebSocket
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
}

// Rate limiting configuration
export const RATE_LIMITS = {
  API_REQUESTS_PER_MINUTE: 60,
  CONTACT_FORM_PER_HOUR: 5,
  AUTH_ATTEMPTS_PER_HOUR: 10,
}

// Input validation patterns
export const VALIDATION_PATTERNS = {
  PDB_ID: /^[A-Za-z0-9]{4}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SAFE_STRING: /^[a-zA-Z0-9\s\-_.@]+$/,
}

// Security headers for production
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}

// Sanitize and validate file uploads
export const validateFileUpload = (file: File): boolean => {
  const allowedTypes = ['text/plain', 'chemical/x-pdb', 'application/json']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  return allowedTypes.includes(file.type) && file.size <= maxSize
}

// Generate secure random tokens
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}