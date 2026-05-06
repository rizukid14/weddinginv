export interface DashboardUser {
  uid: string;
  email: string;
  displayName?: string;
  weddingSlug?: string;   // linked wedding document ID
  createdAt: string;
}
