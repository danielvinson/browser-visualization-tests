import React, { useEffect, useRef } from "react";
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
  alpha: { min: 0.3, max: 0.5 } as AlphaRange,
};

const nightSkyPallette = {
  red: { min: 2, max: 10 } as RGBRange,
  green: { min: 3, max: 20 } as RGBRange,
  blue: { min: 30, max: 90 } as RGBRange,
  alpha: { min: 0.8, max: 0.9 } as AlphaRange,
}



export const Galaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) {
        canvas.width = 800;
        canvas.height = 600;

        var gradient = context.createRadialGradient(0, 0, 0, 0, 0, 600);
        gradient.addColorStop(colorStops[0], generateColorRGBA(nightSkyPallette));
        gradient.addColorStop(colorStops[1], generateColorRGBA(nightSkyPallette));
        gradient.addColorStop(colorStops[2], generateColorRGBA(nightSkyPallette));
        gradient.addColorStop(colorStops[3], generateColorRGBA(nightSkyPallette));
        gradient.addColorStop(colorStops[4], generateColorRGBA(nightSkyPallette));
        context.fillStyle = gradient;
        context.fillRect(0, 0, 800, 600);

        var gradient = context.createRadialGradient(0, 0, 0, 0, 0, 600);
        gradient.addColorStop(colorStops[0], generateColorRGBA(washedOutPallette));
        gradient.addColorStop(colorStops[1], generateColorRGBA(washedOutPallette));
        gradient.addColorStop(colorStops[2], generateColorRGBA(washedOutPallette));
        gradient.addColorStop(colorStops[3], generateColorRGBA(washedOutPallette));
        gradient.addColorStop(colorStops[4], generateColorRGBA(washedOutPallette));
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
