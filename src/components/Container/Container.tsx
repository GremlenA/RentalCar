import s from "./Container.module.css";

interface Props {
  children: React.ReactNode;
  className?: string; // Проверь, есть ли эта строка
}

export default function Container({ children, className = "" }: Props) {
  // Важно: мы склеиваем базовый класс контейнера и тот, что передаем снаружи
  return <div className={`${s.container} ${className}`}>{children}</div>;
}