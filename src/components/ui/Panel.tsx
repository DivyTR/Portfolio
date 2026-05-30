import type { CSSProperties, ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
};

/**
 * Reusable translucent glass panel. The 3D world shows through it,
 * which is what produces the layered, immersive depth.
 */
export function Panel({ children, className = "", hover = false, style }: PanelProps) {
  return (
    <div
      style={style}
      className={`glass-panel ${hover ? "glass-panel-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
