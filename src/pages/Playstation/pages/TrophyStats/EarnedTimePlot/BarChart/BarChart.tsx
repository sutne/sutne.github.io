import { Box, type SxProps, alpha, useTheme } from '@mui/material';
import { BarChartPainter } from './BarChartPainter';

export type Bar = {
  label: string;
  count: number;
};
export type Section = {
  label: string;
  bars: Bar[];
};
export function BarChart(props: { sections: Section[]; sx?: SxProps }) {
  const theme = useTheme();
  const highestValue = props.sections.reduce(
    (max, section) =>
      Math.max(
        max,
        section.bars.reduce((max, bar) => Math.max(max, bar.count), 0),
      ),
    0,
  );
  const sectionCount = props.sections.length;
  const sectionBarCount = props.sections[0].bars.length;
  const barCount = sectionCount * sectionBarCount;

  // ensure all sections are of equal size
  for (const section of props.sections) {
    if (section.bars.length !== sectionBarCount) {
      throw new Error('sections has inconsistent bar counts!');
    }
  }

  function initializeCanvas(canvas: HTMLCanvasElement) {
    if (!canvas) return;
    const painter = new BarChartPainter(
      canvas,
      {
        barCount,
        highestValue,
      },
      {
        fontSize: 18,
        color: {
          line: alpha(theme.palette.text.primary, 0.1),
          barFill: 'rgb(19, 105, 227)',
          barHover: alpha(theme.palette.text.primary, 0.1),
          text: alpha(theme.palette.text.primary, 0.7),
          tooltip: {
            background: alpha(theme.palette.background.paper, 0.5),
            text: theme.palette.text.primary,
            border: alpha(theme.palette.text.primary, 0.2),
          },
        },
      },
    );
    requestAnimationFrame(() => update(painter));
  }

  let mouse: { x: number; y: number } | undefined = undefined;
  let elapsed = 0;
  let prevFrameTime: number | undefined = undefined;
  const animationDuration = 1000; // ms
  function update(painter: BarChartPainter) {
    const dt = prevFrameTime ? performance.now() - prevFrameTime : 0;
    elapsed += dt;
    prevFrameTime = performance.now();

    painter.clear();
    painter.drawBorder();
    painter.drawSections(props.sections.map((section) => section.label));
    painter.drawTicks();

    const animationPoint = Math.min(1, elapsed / animationDuration);
    for (let i = 0; i < barCount; i++) {
      const sectionIndex = Math.floor(i / sectionBarCount);
      const barIndex = i % sectionBarCount;
      const count = props.sections[sectionIndex].bars[barIndex].count;
      const t = Math.min(1, (animationPoint * 2 - i / barCount) * 2);
      if (t < 0) break;
      const cubicEaseOut = (t - 1) ** 3 + 1;
      painter.drawBar(i, count * cubicEaseOut);
    }

    if (mouse) {
      const barIndex = painter.getBarIndex(mouse);
      if (barIndex !== undefined) {
        const sectionIndex = Math.floor(barIndex / sectionBarCount);
        const sectionBarIndex = barIndex % sectionBarCount;
        const section = props.sections[sectionIndex];
        const bar = section?.bars[sectionBarIndex];
        if (bar) {
          painter.drawCursor(
            mouse,
            `${bar.label}\n${bar.count} Earned Trophies`,
          );
        }
      }
    }
    requestAnimationFrame(() => update(painter));
  }

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handleMouseLeave() {
    mouse = undefined;
  }

  const style = getStyle();
  return (
    <Box sx={{ ...style.container, ...(props.sx ?? {}) }}>
      <canvas
        ref={initializeCanvas}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style.canvas}
      />
    </Box>
  );
  function getStyle() {
    return {
      container: {
        width: '100%',
        aspectRatio: 1.618,
      },
      canvas: {
        cursor: 'crosshair',
      },
    };
  }
}
