export function genRandomId(): number {
  const min = 100;
  const max = 99999;

  return Math.ceil(Math.random() * (max - min) + min);
}
