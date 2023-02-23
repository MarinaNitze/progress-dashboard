import React, { useEffect, useRef } from 'react';

type ProgressChartProps = {
  numberOfSegments: number;
  implementedCount: number;
};
export default function ProgressChart({
  numberOfSegments,
  implementedCount,
}: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      drawSegments(context, numberOfSegments, implementedCount);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height="130"
      width="130"
      title={`${implementedCount} out of ${numberOfSegments}`}
    />
  );
}

// Inspired by https://www.codeblocq.com/2016/04/Create-a-Pie-Chart-with-HTML5-canvas/
const drawSegments = (
  context: CanvasRenderingContext2D,
  numberOfSegments: number,
  implementedCount: number,
) => {
  // Size of space between segments in px
  const BORDER_WIDTH = 2;
  // Length of radius of each segment in px
  const SEGMENT_LENGTH = 60;
  // Offset from top left (0,0) of 130x130 canvas in px
  const CENTER_OFFSET = 65;

  // In HTML canvas, vertical line is at pi * 1.5 degrees,
  // so use this as the initial angle to start drawing segments from
  let endAngle = Math.PI * 1.5;

  // Intermediate variables to use for drawing each segment
  let beginAngle, offsetX, offsetY, medianAngle;

  for (var i = 0; i < numberOfSegments; i = i + 1) {
    beginAngle = endAngle;
    endAngle = endAngle + Math.PI * (2 / numberOfSegments);
    medianAngle = (endAngle + beginAngle) / 2;
    offsetX = Math.cos(medianAngle) * BORDER_WIDTH;
    offsetY = Math.sin(medianAngle) * BORDER_WIDTH;
    context.beginPath();
    context.fillStyle = i < implementedCount ? '#f2b039' : '#D9D9D9';
    context.moveTo(CENTER_OFFSET + offsetX, CENTER_OFFSET + offsetY);
    context.arc(
      CENTER_OFFSET + offsetX,
      CENTER_OFFSET + offsetY,
      SEGMENT_LENGTH,
      beginAngle,
      endAngle,
    );
    context.lineTo(CENTER_OFFSET + offsetX, CENTER_OFFSET + offsetY);
    context.fill();
  }
};
