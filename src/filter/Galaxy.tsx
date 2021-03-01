import React, { useEffect, useRef } from "react";
import { AlphaRange, generateColorHSLA, generateColorRGBA, RGBRange } from "./generateColor";

type Color = {
  readonly r: string;
  readonly g: string;
  readonly b: string;
  readonly a: string;
};

interface Props {
  readonly colors: Array<Color>;
}

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
  alpha: { min: 0.7, max: 0.9 } as AlphaRange,
};

const color1 = generateColorRGBA({
  red: washedOutPallette.red,
  green: { min: 26, max: 89 },
  blue: { min: 51, max: 60 },
  alpha: { min: 0.7, max: 0.9 },
});
const color2 = generateColorRGBA({
  red: { min: 94, max: 176 },
  green: { min: 26, max: 89 },
  blue: { min: 51, max: 60 },
  alpha: { min: 0.7, max: 0.9 },
});
const color3 = generateColorRGBA({
  red: { min: 94, max: 176 },
  green: { min: 26, max: 89 },
  blue: { min: 51, max: 60 },
  alpha: { min: 0.7, max: 0.9 },
});

export const Galaxy = ({}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(color1, color2, color3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) {
        canvas.width = 300;
        canvas.height = 300;
        var gradient = context.createRadialGradient(0, 0, 0, 0, 0, 280);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(0.3181818181818182, color2);
        gradient.addColorStop(0.3383838383838384, color3);
        gradient.addColorStop(0.6717171717171717, color2);
        gradient.addColorStop(1, color1);
        context.fillStyle = gradient;
        context.fillRect(0, 0, 800, 600);
      }
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
