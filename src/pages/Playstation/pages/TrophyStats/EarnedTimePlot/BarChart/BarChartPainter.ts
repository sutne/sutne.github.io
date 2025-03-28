type Pos = {
  x: number;
  y: number;
};
type MetaData = {
  barCount: number;
  highestValue: number;
};
type Style = {
  fontSize: number;
  color: {
    line: string;
    barFill: string;
    barHover: string;
    text: string;
    tooltip: {
      background: string;
      border: string;
      text: string;
    };
  };
};

export class BarChartPainter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private data: MetaData;
  private style: Style;

  private lineHeight: number;
  private dividerWidth = 1;
  private tickLabelPadding = 4;
  private tickLineExtention = 6;
  private tickAreaWidth: number;

  private chartArea: {
    bottomLeft: Pos;
    topRight: Pos;
  };
  private chartWidth: number;
  private chartHeight: number;
  private barWidth: number;

  constructor(canvas: HTMLCanvasElement, metaData: MetaData, style: Style) {
    if (!canvas) throw new Error('Canvas not initialized!');
    this.canvas = canvas;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.data = metaData;
    this.style = style;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No context!');
    this.ctx = ctx;
    this.ctx.font = `${style.fontSize}px serif`;

    const measurement = this.ctx.measureText('Anything');
    this.lineHeight =
      measurement.fontBoundingBoxAscent + measurement.fontBoundingBoxDescent;

    this.tickAreaWidth =
      this.getTextWidth(metaData.highestValue) +
      this.tickLabelPadding +
      this.tickLineExtention;

    this.chartArea = {
      bottomLeft: {
        x: this.tickAreaWidth + this.dividerWidth,
        y: this.lineHeight + this.dividerWidth,
      },
      topRight: {
        x: this.width - this.dividerWidth,
        y: this.height - this.lineHeight / 2,
      },
    };
    this.chartWidth =
      this.chartArea.topRight.x + 1 - this.chartArea.bottomLeft.x;
    this.chartHeight =
      this.chartArea.topRight.y + 1 - this.chartArea.bottomLeft.y;
    this.barWidth = this.chartWidth / this.data.barCount;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBorder() {
    this.ctx.strokeStyle = this.style.color.line;
    this.ctx.lineWidth = this.dividerWidth;
    this.drawLine(
      { x: this.tickAreaWidth, y: 0 },
      { x: this.tickAreaWidth, y: this.height },
    );
    this.drawLine(
      { x: this.width - 1, y: 0 },
      { x: this.width - 1, y: this.height },
    );
    this.drawLine(
      { x: this.tickAreaWidth, y: this.lineHeight + 1 },
      { x: this.width, y: this.lineHeight + 1 },
    );
  }

  drawSections(sections: string[]) {
    this.ctx.strokeStyle = this.style.color.line;
    this.ctx.lineWidth = this.dividerWidth;
    const sectionCount = sections.length;
    for (let section = 0; section < sectionCount; section++) {
      const sectionWidth = this.chartWidth / sectionCount;
      const x = this.chartArea.bottomLeft.x + (section + 1) * sectionWidth;
      const start = { x: x, y: 0 };
      const end = { x: x, y: this.height };
      this.drawLine(start, end);
      this.ctx.fillStyle = this.style.color.text;
      this.write(
        sections[section],
        {
          x: x - sectionWidth / 2,
          y: this.lineHeight,
        },
        'center',
        'top',
      );
    }
  }

  drawTicks() {
    const tickGap = Math.ceil(this.data.highestValue / 15 / 5) * 5; // max 15 ticks, round to nearest 5
    if (tickGap <= 0) return;

    this.ctx.strokeStyle = this.style.color.line;
    this.ctx.lineWidth = this.dividerWidth;
    const singleValueHeight = this.chartHeight / this.data.highestValue;
    for (let i = 0; i <= this.data.highestValue; i += tickGap) {
      const y = this.chartArea.bottomLeft.y + i * singleValueHeight;
      const start = { x: this.tickAreaWidth - this.tickLineExtention, y: y };
      const end = { x: this.width, y: y };
      this.drawLine(start, end);
      this.ctx.fillStyle = this.style.color.text;
      this.write(
        `${i}`,
        {
          x:
            this.tickAreaWidth - this.tickLineExtention - this.tickLabelPadding,
          y: y,
        },
        'right',
        'middle',
      );
    }
  }

  drawBar(index: number, value: number) {
    this.ctx.fillStyle = this.style.color.barFill;
    const height = (this.chartHeight / this.data.highestValue) * value;
    const bottomLeft = {
      x: this.chartArea.bottomLeft.x + index * this.barWidth,
      y: this.chartArea.bottomLeft.y,
    };
    this.drawRect(bottomLeft, this.barWidth, height);
  }

  drawCursor(pos: Pos, label?: string) {
    const barIndex = this.getBarIndex(pos);
    if (barIndex === undefined) return;
    const bottomLeft = {
      x: this.chartArea.bottomLeft.x + barIndex * this.barWidth,
      y: this.chartArea.bottomLeft.y,
    };
    this.ctx.fillStyle = this.style.color.barHover;
    this.drawRect(bottomLeft, this.barWidth, this.height);
    if (label) {
      this.drawTextBox(
        label,
        {
          x: pos.x + 8,
          y: this.height - pos.y + 8,
        },
        12,
      );
    }
  }

  getBarIndex(pos: Pos): number | undefined {
    const minX = this.tickAreaWidth + this.dividerWidth - 1;
    if (pos.x <= minX || this.width <= pos.x) return undefined;
    return Math.floor((pos.x - minX) / this.barWidth);
  }

  private drawTextBox(text: string, bottomLeft: Pos, padding: number) {
    const lines = text.split('\n').reverse(); // text is written bottom up
    const textWidth = lines.reduce(
      (max, line) => Math.max(max, this.getTextWidth(line)),
      0,
    );
    const textHeight = lines.length * this.lineHeight;
    this.ctx.fillStyle = this.style.color.tooltip.background;
    this.ctx.strokeStyle = this.style.color.tooltip.border;
    const boxWidth = textWidth + 2 * padding;
    const boxHeight = textHeight + 2 * (padding - 4);
    const margin = 4;
    const x = Math.min(this.width - boxWidth - margin, bottomLeft.x);
    const y = Math.min(
      Math.max(bottomLeft.y, this.lineHeight + margin),
      this.height - boxHeight - margin,
    );
    this.drawRoundedRect(
      {
        x: x,
        y: y,
      },
      boxWidth,
      boxHeight,
      padding,
    );
    this.ctx.fillStyle = this.style.color.tooltip.text;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      this.write(
        line,
        {
          x: x + padding,
          y: y + (padding - 4) + i * (textHeight / lines.length),
        },
        'left',
        'bottom',
      );
    }
  }

  private drawLine(start: Pos, end: Pos) {
    const alignment = this.ctx.lineWidth % 2 === 0 ? 0 : 0.5; // lines are drawn
    this.ctx.beginPath();
    this.ctx.moveTo(
      Math.round(start.x) + alignment,
      Math.round(this.height - start.y) + alignment,
    );
    this.ctx.lineTo(
      Math.round(end.x) + alignment,
      Math.round(this.height - end.y) + alignment,
    );
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private drawRect(bottomLeft: Pos, width: number, height: number) {
    this.ctx.fillRect(
      Math.ceil(bottomLeft.x),
      Math.floor(this.height - (bottomLeft.y + height)),
      Math.ceil(width),
      Math.ceil(height),
    );
  }

  private drawRoundedRect(
    bottomLeft: Pos,
    width: number,
    height: number,
    borderRadius: number,
  ) {
    this.ctx.beginPath();
    this.ctx.roundRect(
      Math.ceil(bottomLeft.x),
      Math.floor(this.height - (bottomLeft.y + height)),
      Math.ceil(width),
      Math.ceil(height),
      borderRadius,
    );
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }

  private write(
    text: string,
    pos: Pos,
    alignment: CanvasTextAlign = 'center',
    baseline: CanvasTextBaseline = 'alphabetic',
  ) {
    this.ctx.textAlign = alignment;
    this.ctx.textBaseline = baseline;
    this.ctx.fillText(text, pos.x, this.height - pos.y);
  }

  private getTextWidth(text: string | number): number {
    return this.ctx.measureText(`${text}`).width;
  }
}
