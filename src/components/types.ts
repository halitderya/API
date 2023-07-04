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
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  classname: string;
  
}
export interface topBarProps{
  onSearch: (term: string) => void;
  categoryList?: string[];
  onCategoryChange: (selectedcategory:string) => void;
  onCorsChange:(cors:boolean) => void;
}