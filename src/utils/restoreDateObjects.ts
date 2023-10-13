export const restoreDateObjects = <T extends Record<string, any>, P extends keyof T>(
  object: T,
  properties: P[]
): { [K in keyof T]: K extends P ? null extends T[K] ? T[K] : Date : T[K] } => {
  const result: Record<keyof T, any> = { ...object };

  properties.forEach((prop) => {
    if (result[prop]) {
      result[prop] = new Date(result[prop]);
    }
  });

  return result;
};

export const restoreDateObjectsInArray = <T extends Record<string, any>, P extends keyof T>(
  array: T[],
  properties: P[]
) => {
  return array.map((element) => restoreDateObjects(element, properties));
};
