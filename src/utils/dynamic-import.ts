
export const dynamicImport = async (
  pathName: string
): Promise<{ [key: string]: any }> => {
  const mod = await import(pathName);
  return mod;
};