import React, { useEffect, useRef } from 'react';

const NOT_IMPLEMENTED_FILL = '#d9d9d9';
const IN_PROGRESS_FILL = '#fae4ba';
const DONT_KNOW_FILL = '#ffffff';
const IMPLEMENTED_FILL = '#f2b039';

type ProgressChartProps = {
  numberOfSegments: number;
  implementedCount?: number;
  inProgressCount?: number;
  dontKnowCount?: number;
};
export default function ProgressChart({
  numberOfSegments,
  implementedCount = 0,
  inProgressCount = 0,
  dontKnowCount = 0,
}: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      drawSegments(
        context,
        numberOfSegments,
        implementedCount,
        inProgressCount,
        dontKnowCount,
      );
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      height="260"
      width="260"
      style={{ width: '130px', height: '130px' }}
      title={`${implementedCount} out of ${numberOfSegments}`}
    />
  );
}

// Inspired by https://www.codeblocq.com/2016/04/Create-a-Pie-Chart-with-HTML5-canvas/
const drawSegments = (
  context: CanvasRenderingContext2D,
  numberOfSegments: number,
  implementedCount: number,
  inProgressCount: number,
  dontKnowCount: number,
) => {
  // Size of space between segments in px
  const BORDER_WIDTH = 2;
  // Length of radius of each segment in px
  const SEGMENT_LENGTH = 60;
  // Offset from top left (0,0) of 130x130 canvas in px
  const CENTER_OFFSET = 65;

  // Calculate indices necessary to draw sequential sections
  // of each type (first: full implemented, then in progress,
  // then don't know, and assume not implemented for remainer
  // of segments based on 'numberOfSegments')
  const implementedTerminalIndex = implementedCount;
  const inProgressTerminalIndex = implementedTerminalIndex + inProgressCount;
  const dontKnowTerminalIndex = inProgressTerminalIndex + dontKnowCount;

  // In HTML canvas, vertical line is at pi * 1.5 degrees,
  // so use this as the initial angle to start drawing segments from
  let endAngle = Math.PI * 1.5;

  // Intermediate variables to use for drawing each segment
  let beginAngle, offsetX, offsetY, medianAngle;

  // Scale drawing to increase size with higher resolution
  context.scale(2, 2);

  for (var i = 0; i < numberOfSegments; i = i + 1) {
    beginAngle = endAngle;
    endAngle = endAngle + Math.PI * (2 / numberOfSegments);
    medianAngle = (endAngle + beginAngle) / 2;
    offsetX = Math.cos(medianAngle) * BORDER_WIDTH;
    offsetY = Math.sin(medianAngle) * BORDER_WIDTH;
    context.beginPath();
    context.fillStyle =
      i < implementedTerminalIndex
        ? IMPLEMENTED_FILL
        : i < inProgressTerminalIndex
        ? IN_PROGRESS_FILL
        : i < dontKnowTerminalIndex
        ? DONT_KNOW_FILL
        : NOT_IMPLEMENTED_FILL;

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

    // If drawing a 'dont know' segment, set appropriate line styles
    // and then draw the lines!
    if (i < dontKnowTerminalIndex && i >= inProgressTerminalIndex) {
      context.strokeStyle = NOT_IMPLEMENTED_FILL;
      context.lineWidth = 1;
      context.stroke();
    }
  }
};
