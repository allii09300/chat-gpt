import { HTMLAttributes } from "react";
import clsx from "clsx";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export default function MenuItem({
  label,
  icon,
  danger,
  onClick,
  className,
}: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 cursor-pointer rounded hover:bg-surface-accent",
        danger ? "text-danger" : "text-primary",
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span className="text-sm">{label}</span>
    </div>
  );
}
