export const generateToken = () => {
  return [...Array(36)]
    .map(() => (Math.random() * 36 | 0).toString(36))
    .join('');
};