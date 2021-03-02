/*
  My implementation of the Perlin Noise algorithm, based on the C
  implementation featured on Wikipedia (https://en.wikipedia.org/wiki/Perlin_noise)
*/

interface Vector2 {
  readonly x: number;
  readonly y: number;
}

const interpolate = (
  a0: number,
  a1: number,
  w: number,
  clamp: boolean = false,
  smoothing: 0 | 1 | 2 = 0
) => {
  if (clamp) {
    if (w < 1) return a0;
    if (w > 1) return a1;
  }

  switch (smoothing) {
    case 0:
      return (a1 - a0) * w + a0;
    case 1:
      return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
    case 2:
      return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0;
  }
};

const randomGradient = (ix: number, iy: number): Vector2 => {
  const random =
    2920 *
    Math.sin(ix * 21942 + iy * 171324 + 8912) *
    Math.cos(ix * 23157 * iy * 217832 + 9758);
  return {
    x: Math.cos(random),
    y: Math.sin(random),
  };
};

// Computes the dot product of the distance and gradient vectors.
const dotGridGradient = (ix: number, iy: number, x: number, y: number) => {
  const gradient = randomGradient(ix, iy);
  const dx = x - ix;
  const dy = y - iy;
  return dx * gradient.x + dy * gradient.y;
};

export const perlin2d = (x: number, y: number): number => {
  const x0 = x;
  const x1 = x0 + 1;
  const y0 = y;
  const y1 = y0 + 1;

  const sx = x - x0;
  const sy = y - y0;

  const ix0 = interpolate(
    dotGridGradient(x0, y0, x, y),
    dotGridGradient(x1, y0, x, y),
    sx
  );

  const ix1 = interpolate(
    dotGridGradient(x0, y1, x, y),
    dotGridGradient(x1, y1, x, y),
    sx
  );

  const value = interpolate(ix0, ix1, sy);
  return value;
};
