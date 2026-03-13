import s from "./Container.module.css";

interface Props {
  children: React.ReactNode;
  className?: string; 
}

export default function Container({ children, className = "" }: Props) {

  return <div className={`${s.container} ${className}`}>{children}</div>;
}