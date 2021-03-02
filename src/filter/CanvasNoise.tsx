import React, { useEffect, useRef } from "react";
import { perlin2d } from "~/util/noise";

export const Noise = () => {
  const width = 800;
  const height = 600;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) {
        canvas.width = width;
        canvas.height = height;

        const image = context.createImageData(width, height);
        let data = image.data;

        for (var x = 0; x < canvas.width; x++) {
          for (var y = 0; y < canvas.height; y++) {
            var value = Math.abs(perlin2d(x / 100, y / 100));
            value *= 256;

            var cell = (x + y * canvas.width) * 4;
            data[cell] = data[cell + 1] = data[cell + 2] = value;
            data[cell] += Math.max(0, (25 - value) * 8);
            data[cell + 3] = 255; // alpha.
          }
        }

        context.fillStyle = "black";
        context.fillRect(0, 0, 100, 100);
        context.putImageData(image, 0, 0);
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};
