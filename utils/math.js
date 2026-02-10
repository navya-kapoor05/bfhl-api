const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) throw new Error("Invalid input");
  let a = 0, b = 1;
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const primeFilter = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Invalid input");
  return arr.filter(isPrime);
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const hcf = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Invalid input");
  return arr.reduce((a, b) => gcd(a, b));
};

const lcm = (arr) => {
  if (!Array.isArray(arr)) throw new Error("Invalid input");
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
};

module.exports = {
  fibonacci,
  primeFilter,
  lcm,
  hcf
};
