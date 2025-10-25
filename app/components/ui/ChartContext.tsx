"use client";

import * as React from "react";

// ------------------------------
// Type for chart configuration
// ------------------------------
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;            // Label to show in tooltip/legend
    icon?: React.ComponentType;         // Optional icon to show
    color?: string;                     // Optional fixed color
    theme?: Record<"light" | "dark", string>; // Optional color per theme
  };
};

// ------------------------------
// Context props
// ------------------------------
type ChartContextProps = {
  config: ChartConfig;
};

// ------------------------------
// Create context
// ------------------------------
export const ChartContext = React.createContext<ChartContextProps | null>(null);

// ------------------------------
// Hook to use the context
// ------------------------------
export function useChart(): ChartContextProps {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartProvider />");
  }
  return context;
}
