import React, { useEffect, useRef } from "react";
import { simplex2, simplex3, perlin2, perlin3, seed } from "~/util/perlin";

const getColorIndicesForCoord = (x: number, y: number, width: number) => {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

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

        seed(Math.random() * 65536);

        const image = context.createImageData(width, height);
        let data = image.data;

        for (var x = 0; x < canvas.width; x++) {
          for (var y = 0; y < canvas.height; y++) {
            // Canvas image data is stored sequentially, this gets data from indexes
            const [redIndex, greenIndex, blueIndex, alphaIndex] = getColorIndicesForCoord(x, y, width);
            var value = Math.abs(perlin2(x / 3, y / 3));
            value *= 325;

            data[redIndex] = 255 - (Math.max(0, (255 - value) * 8));
            data[greenIndex] = 255 - (Math.max(0, (255 - value) * 8));
            data[blueIndex] = 255 - (Math.max(0, (255 - value) * 8));
            data[alphaIndex] = 255;
          }
        }

        context.putImageData(image, 0, 0);
      }
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};
