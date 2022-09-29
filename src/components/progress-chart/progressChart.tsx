import React, { useRef, useEffect } from 'react';

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
      var borderWidth = 2;
      var segmentLength = 60;
      var centerOffset = 65;
      var endAngle = Math.PI * 1.5;
      var beginAngle, offsetX, offsetY, medianAngle;

      for (var i = 0; i < numberOfSegments; i = i + 1) {
        beginAngle = endAngle;
        endAngle = endAngle + Math.PI * (2 / numberOfSegments);
        medianAngle = (endAngle + beginAngle) / 2;
        offsetX = Math.cos(medianAngle) * borderWidth;
        offsetY = Math.sin(medianAngle) * borderWidth;
        context.beginPath();
        context.fillStyle = i < implementedCount ? '#f2b039' : '#D9D9D9';
        context.moveTo(centerOffset + offsetX, centerOffset + offsetY);
        context.arc(
          centerOffset + offsetX,
          centerOffset + offsetY,
          segmentLength,
          beginAngle,
          endAngle,
        );
        context.lineTo(centerOffset + offsetX, centerOffset + offsetY);
        context.fill();
      }
    }
  }, []);

  return <canvas ref={canvasRef} height="130" width="130" />;
}
