import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({ onClick, label }) => (
  <button onClick={onClick}>{label}</button>
);

export const RemoveButton: React.FC<ButtonProps> = ({ onClick, label }) => (
  <Button onClick={onClick} label={label} />
);

export const SelectButton: React.FC<ButtonProps> = ({ onClick, label }) => (
  <Button onClick={onClick} label={label} />
);
