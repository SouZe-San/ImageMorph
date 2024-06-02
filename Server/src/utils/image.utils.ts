// Function to get the greatest common divisor
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

interface Dimensions {
  width: number;
  height: number;
}
// Function to generate width and height based on ratio

export const generateDimensions = (ratio: String, base: number = 64): Dimensions => {
  if (ratio === "1:1") {
    return { width: 512, height: 512 };
  }

  const [widthRatio, heightRatio] = ratio.split(":").map(Number);
  const commonDivisor = gcd(widthRatio, heightRatio);
  const widthUnit = widthRatio / commonDivisor;
  const heightUnit = heightRatio / commonDivisor;

  let width = widthUnit * base;
  let height = heightUnit * base;

  // Ensure the dimensions are multiples of base
  while (width % base !== 0 || height % base !== 0) {
    width += widthUnit * base;
    height += heightUnit * base;
  }

  return { width, height };
};

export const isString = (input: any) => {
  return typeof input === "string";
};
