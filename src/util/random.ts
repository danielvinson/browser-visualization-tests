export const randomIntegerInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomFloatInRange = (min: number, max: number, precision: number) => {
  return parseFloat((Math.random() * (min - max) + max).toFixed(precision));
};
