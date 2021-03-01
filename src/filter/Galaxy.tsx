import React, { useEffect, useRef } from "react";

type Color = {
  readonly r: string;
  readonly g: string;
  readonly b: string;
  readonly a: string;
}

interface Props {
  readonly colors: Array<Color>;
}

export const Galaxy = ({}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const context = canvas.getContext("2d");
      if (context !== null) {
        canvas.width = 300;
        canvas.height = 300;
        var gradient = context.createLinearGradient(126, 0, 0, 270);
        gradient.addColorStop(0, "rgba(94, 26, 60, 0.99)");
        gradient.addColorStop(0.3181818181818182, "rgba(176, 46, 46, 0.5)");
        gradient.addColorStop(0.3383838383838384, "rgba(176, 48, 51, 0.46)");
        gradient.addColorStop(0.6717171717171717, "rgba(178, 89, 148, 0.73)");
        gradient.addColorStop(1, "rgb(59, 47, 132)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 300, 300);
      }
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
