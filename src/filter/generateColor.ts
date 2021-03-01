import { randomIntegerInRange, randomFloatInRange } from "~/util/random";
/*
  These functions generate randomized colors from within a specified range of values
  within a specific color space.  Values not given will be randomized in the full range.
*/

// TypeScript shenanegains stolen from TypeScript PR
// https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674514787
// I'm sure there's a better way to do this now, but this is not anything
// serious so I'm just using the first thing that worked for me
type BuildPowersOf2LengthArrays<
  N extends number,
  R extends never[][]
> = R[0][N] extends never
  ? R
  : BuildPowersOf2LengthArrays<N, [[...R[0], ...R[0]], ...R]>;

type ConcatLargestUntilDone<
  N extends number,
  R extends never[][],
  B extends never[]
> = B["length"] extends N
  ? B
  : [...R[0], ...B][N] extends never
  ? ConcatLargestUntilDone<
      N,
      R extends [R[0], ...infer U] ? (U extends never[][] ? U : never) : never,
      B
    >
  : ConcatLargestUntilDone<
      N,
      R extends [R[0], ...infer U] ? (U extends never[][] ? U : never) : never,
      [...R[0], ...B]
    >;

type Replace<R extends any[], T> = { [K in keyof R]: T };

type TupleOf<T, N extends number> = number extends N
  ? T[]
  : {
      [K in N]: BuildPowersOf2LengthArrays<K, [[never]]> extends infer U
        ? U extends never[][]
          ? Replace<ConcatLargestUntilDone<K, U, []>, T>
          : never
        : never;
    }[N];

type RangeOf<N extends number> = Partial<TupleOf<unknown, N>>["length"];

export type RGBValue = RangeOf<256>;
export type RGBRange = {
  min: RGBValue;
  max: RGBValue;
};

type Degree = number; // Technically unbound since it will wrap
export type Hue = Degree;
export type HueRange = {
  readonly min: Hue;
  readonly max: Hue;
};

export type Percent = RangeOf<100>;
export type PercentRange = {
  readonly min: Percent;
  readonly max: Percent;
};

export type Alpha = number; // RangeOf<1> doesn't work?
export type AlphaRange = {
  readonly min: Alpha;
  readonly max: Alpha;
};

type Value = Percent | Alpha | Degree | RGBValue;
type Range = PercentRange | AlphaRange | HueRange | RGBRange;

const isRange = (value: Value | Range): value is Range => {
  return typeof value !== "number";
};

// Generate RGBA
interface RGBARange {
  readonly red?: RGBValue | RGBRange;
  readonly green?: RGBValue | RGBRange;
  readonly blue?: RGBValue | RGBRange;
  readonly alpha?: Alpha | AlphaRange;
}
export const generateColorRGBA = ({ red, green, blue, alpha }: RGBARange) => {
  const [redValue, blueValue, greenValue] = [red, green, blue].map((color) => {
    if (color === undefined) {
      return randomIntegerInRange(0, 255);
    }

    if (isRange(color)) {
      return randomIntegerInRange(color.min, color.max);
    }

    return color;
  });

  const alphaValue = [alpha].map((alpha) => {
    if (alpha === undefined) {
      return Math.random();
    }

    if (isRange(alpha)) {
      return randomFloatInRange(alpha.min, alpha.max, 5);
    }

    return alpha;
  });

  return `rgba(${redValue}, ${blueValue}, ${greenValue}, ${alphaValue})`;
};

// Generate HSLA
interface HSLARange {
  readonly hue?: Hue | HueRange;
  readonly saturation?: Percent | PercentRange;
  readonly lightness?: Percent | PercentRange;
  readonly alpha?: Alpha | AlphaRange;
}
export const generateColorHSLA = ({
  hue,
  saturation,
  lightness,
  alpha,
}: HSLARange) => {
  const hueValue = [hue].map((hue) => {
    if (hue === undefined) {
      return randomIntegerInRange(0, 360);
    }

    if (isRange(hue)) {
      return randomIntegerInRange(hue.min, hue.max);
    }

    return hue;
  });

  const [saturationValue, lightnessValue] = [saturation, lightness].map(
    (value) => {
      if (value === undefined) {
        return randomIntegerInRange(0, 100);
      }

      if (isRange(value)) {
        return randomIntegerInRange(value.min, value.max);
      }

      return value;
    }
  );

  const alphaValue = [alpha].map((alpha) => {
    if (alpha === undefined) {
      return Math.random();
    }

    if (isRange(alpha)) {
      return randomFloatInRange(alpha.min, alpha.max, 5);
    }

    return alpha;
  });

  return `hsla(${hueValue}, ${saturationValue}, ${lightnessValue}, ${alphaValue})`;
};
