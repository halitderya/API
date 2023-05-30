import { ButtonProps } from "../types";
import "./button.css";

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  classname,
  coordinates,
}) => (
  <button className={classname} onClick={onClick}>
    {label}
  </button>
);

export const RemoveButton: React.FC<ButtonProps> = ({
  onClick,
  label,
  classname,
}) => <Button onClick={onClick} label={label} classname={classname} />;

export const SelectButton: React.FC<ButtonProps> = ({
  onClick,
  label,
  classname,
  coordinates,
}) => (
  <Button
    onClick={onClick}
    label={label}
    classname={classname}
    coordinates={coordinates}
  />
);
