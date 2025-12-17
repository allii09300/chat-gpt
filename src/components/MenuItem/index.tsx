import { HTMLAttributes } from "react";

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
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-bg-chat-user ${
        danger ? "text-red-500" : "text-text-default"
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span className="text-sm">{label}</span>
    </div>
  );
}
