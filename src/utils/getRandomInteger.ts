export const getRandomInteger = (max: number) => {
  const randomNumber = Math.random() * max;

  const scaledNumber = Math.floor(randomNumber);

  return scaledNumber;
};
