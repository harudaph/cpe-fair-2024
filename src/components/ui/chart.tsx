import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";
import { useChart, ChartConfig } from "./ChartContext"; // your ChartContext file

// Define Recharts payload item type
export type ChartPayloadItem = {
  name?: string;
  dataKey?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
};

// Tooltip Props
interface ChartTooltipContentProps {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: string;
  labelFormatter?: (value: string | number, payload?: ChartPayloadItem[]) => React.ReactNode;
  formatter?: (value: string | number, name?: string, item?: ChartPayloadItem, index?: number) => React.ReactNode;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelClassName?: string;
  className?: string;
  color?: string;
  nameKey?: string;
  labelKey?: string;
}

// Fully typed ChartTooltipContent
export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload = [],
  label,
  labelFormatter,
  formatter,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  labelClassName,
  className,
  color,
  nameKey,
  labelKey,
  ...rest
}) => {
  const { config } = useChart();

  // ✅ useMemo called unconditionally
  const tooltipLabel = React.useMemo<React.ReactNode>(() => {
    if (payload.length === 0 || hideLabel) return null;

    const item: ChartPayloadItem = payload[0];
    const key = labelKey || item.dataKey || item.name || "value";
    const itemConfig = config[key] as { label?: React.ReactNode; icon?: React.ComponentType };

    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    // Ensure value is string or number
    const formattedValue: string | number | undefined =
      value === undefined || value === null
        ? undefined
        : typeof value === "string" || typeof value === "number"
        ? value
        : String(value);

    if (labelFormatter && formattedValue !== undefined) {
      return <div className={cn("font-medium", labelClassName)}>{labelFormatter(formattedValue, payload)}</div>;
    }

    if (formattedValue === undefined) return null;
    return <div className={cn("font-medium", labelClassName)}>{formattedValue}</div>;
  }, [payload, label, labelFormatter, hideLabel, labelClassName, config, labelKey]);

  // ✅ Early return after useMemo
  if (!active || payload.length === 0) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
      {...rest}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item: ChartPayloadItem, index: number) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = config[key] as { label?: React.ReactNode; icon?: React.ComponentType };
          const indicatorColor = color || (item.payload?.fill as string) || item.color;

          return (
            <div
              key={item.dataKey ?? index}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px]",
                    indicator === "dot"
                      ? "h-2.5 w-2.5"
                      : indicator === "line"
                      ? "w-1"
                      : "w-0 border-[1.5px] border-dashed bg-transparent"
                  )}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                <div className="grid gap-1.5">
                  {nestLabel ? tooltipLabel : null}
                  <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                </div>
                {item.value !== undefined && (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Legend Props
interface ChartLegendContentProps {
  payload?: ChartPayloadItem[];
  hideIcon?: boolean;
  verticalAlign?: "top" | "bottom";
  nameKey?: string;
  className?: string;
}

// Fully typed ChartLegendContent
export const ChartLegendContent: React.FC<ChartLegendContentProps> = ({
  payload = [],
  hideIcon = false,
  verticalAlign = "bottom",
  nameKey,
  className,
  ...props
}) => {
  const { config } = useChart();

  if (!payload.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
      {...props}
    >
      {payload.map((item) => {
        const key = nameKey || item.dataKey || "value";
        const itemConfig = config[key];

        return (
          <div key={item.value} className={cn("[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3")}>
            {itemConfig?.icon && !hideIcon ? <itemConfig.icon /> : <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
};
