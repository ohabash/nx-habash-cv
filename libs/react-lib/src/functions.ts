export function zipArrays(arr1: any[], arr2: any[]): Array<any> {
  const result = [];
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    result.push(arr1[i], arr2[i]);
  }
  return result;
}

export const timeout = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
