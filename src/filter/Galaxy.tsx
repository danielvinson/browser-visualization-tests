import React, { useEffect, useRef, useState } from "react";
import { perlin2d } from "~/util/noise";
import { perlin2 } from "~/util/perlin";
import {
  AlphaRange,
  generateColorHSLA,
  generateColorRGBA,
  RGBRange,
} from "../util/generateColor";

/*
        gradient.addColorStop(0, "rgba(94, 26, 60, 0.99)");
        gradient.addColorStop(0.3181818181818182, "rgba(176, 46, 46, 0.5)");
        gradient.addColorStop(0.3383838383838384, "rgba(176, 48, 51, 0.46)");
        gradient.addColorStop(0.6717171717171717, "rgba(178, 89, 148, 0.73)");
        gradient.addColorStop(1, "rgb(59, 47, 132)");
*/

const colorStops = [0, 0.2, 0.4, 0.6, 0.8, 1];
const washedOutPallette = {
  red: { min: 94, max: 176 } as RGBRange,
  green: { min: 26, max: 89 } as RGBRange,
  blue: { min: 51, max: 60 } as RGBRange,
  alpha: { min: 0.1, max: 0.3 } as AlphaRange,
};

const nightSkyPallette = {
  red: { min: 2, max: 10 } as RGBRange,
  green: { min: 3, max: 20 } as RGBRange,
  blue: { min: 30, max: 90 } as RGBRange,
  alpha: { min: 0.3, max: 0.5 } as AlphaRange,
};

const getColorIndicesForCoord = (x: number, y: number, width: number) => {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

export const Galaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) {
        canvas.width = 800;
        canvas.height = 600;

        const image = context.createImageData(canvas.width, canvas.height);
        let data = image.data;

        for (var x = 0; x < canvas.width; x++) {
          for (var y = 0; y < canvas.height; y++) {
            const [
              redIndex,
              greenIndex,
              blueIndex,
              alphaIndex,
            ] = getColorIndicesForCoord(x, y, canvas.width);
            var value = Math.abs(perlin2(x / 4, y / 4));
            value *= 325;

            data[redIndex] = 255 - (Math.max(0, (255 - value) * 8));
            data[greenIndex] = 255 - (Math.max(0, (255 - value) * 8));
            data[blueIndex] = 255 - (Math.max(0, (255 - value) * 8));
            data[alphaIndex] = 255;
          }
        }

        context.putImageData(image, 0, 0);

        var gradient = context.createRadialGradient(0, 0, 0, 0, 0, 600);
        gradient.addColorStop(
          colorStops[0],
          generateColorRGBA(nightSkyPallette)
        );
        gradient.addColorStop(
          colorStops[1],
          generateColorRGBA(nightSkyPallette)
        );
        gradient.addColorStop(
          colorStops[2],
          generateColorRGBA(nightSkyPallette)
        );
        gradient.addColorStop(
          colorStops[3],
          generateColorRGBA(nightSkyPallette)
        );
        gradient.addColorStop(
          colorStops[4],
          generateColorRGBA(nightSkyPallette)
        );
        context.fillStyle = gradient;
        context.fillRect(0, 0, 800, 600);

        var gradient = context.createRadialGradient(canvas.width, canvas.height, 0, 0, 0, 800);
        gradient.addColorStop(
          colorStops[0],
          generateColorRGBA(washedOutPallette)
        );
        gradient.addColorStop(
          colorStops[1],
          generateColorRGBA(washedOutPallette)
        );
        gradient.addColorStop(
          colorStops[2],
          generateColorRGBA(washedOutPallette)
        );
        gradient.addColorStop(
          colorStops[3],
          generateColorRGBA(washedOutPallette)
        );
        gradient.addColorStop(
          colorStops[4],
          generateColorRGBA(washedOutPallette)
        );
        context.fillStyle = gradient;
        context.fillRect(0, 0, 800, 600);
      }
    }
  }, [canvasRef]);

  return (
    <canvas
      style={{ width: "800", height: "600", padding: 0, margin: 0 }}
      ref={canvasRef}
    />
  );
};
