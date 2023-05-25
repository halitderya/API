export interface RowDataProps {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}
export interface ApiResponse {
  count: number;
  entries: RowDataProps[];
}
export interface ButtonProps {
  onClick: () => void;
  label: string;
}