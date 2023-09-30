type ClassName = string | Record<string, unknown> | undefined;

export const cx = (...classNames: ClassName[]) => {
  const result = [];

  for (const className of classNames) {
    if (typeof className === "string") {
      result.push(className);
    } else if (typeof className === "object" && className !== null) {
      for (const cn in className) {
        if (className[cn]) {
          result.push(cn);
        }
      }
    }
  }

  return result.length > 0 ? result.join(" ") : undefined;
};
