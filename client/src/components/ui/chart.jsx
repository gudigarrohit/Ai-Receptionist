import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef(function ChartContainer(
  { id, className, children, config, ...props },
  ref
) {

  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }) => {

  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme] ||
      itemConfig.color;

    return color ? `--color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`)
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef(function ChartTooltipContent(
  {
    active,
    payload,
    className,
    hideLabel = false,
    hideIndicator = false,
    indicator = "dot",
    label,
    formatter,
  },
  ref
) {

  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {payload.map((item, index) => {

        const indicatorColor =
          item.payload.fill || item.color;

        return (
          <div
            key={index}
            className="flex items-center gap-2"
          >

            {!hideIndicator && (
              <div
                className="h-2 w-2 rounded"
                style={{
                  backgroundColor: indicatorColor,
                }}
              />
            )}

            <span className="text-muted-foreground">
              {item.name}
            </span>

            <span className="font-medium ml-auto">
              {item.value}
            </span>

          </div>
        );
      })}
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef(function ChartLegendContent(
  { className, payload },
  ref
) {

  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        className
      )}
    >

      {payload.map((item) => (

        <div
          key={item.value}
          className="flex items-center gap-1.5"
        >

          <div
            className="h-2 w-2 rounded"
            style={{
              backgroundColor: item.color
            }}
          />

          {config[item.dataKey]?.label || item.value}

        </div>

      ))}

    </div>
  );
});

ChartLegendContent.displayName = "ChartLegend";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle
};