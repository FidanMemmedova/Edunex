export const mapKeyValue = (data: any) => {
  return Object.entries(data).map(([key, value]) => ({
    key,
    value,
  }));
};
