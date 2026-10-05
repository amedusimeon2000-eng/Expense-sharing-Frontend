export class Constants {
  /** Set VITE_API_BASE_URL only to point at another backend (e.g. a local one). */
  static API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'https://splitbook-backend.onrender.com/api';
}
