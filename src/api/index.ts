export async function method<T, R = T>({
  path,
  params,
  fetchOptions,
  process,
}: {
  path: string;
  params: Record<string, any>;
  fetchOptions?: RequestInit;
  process?: (response: T) => R;
}): Promise<R> {
  const paramsString = new URLSearchParams(params).toString();
  const res = await fetch(`${path}${paramsString ? "?" + paramsString : ""}`, fetchOptions);

  if (process) {
    return process(await res.json());
  }

  return res.json();
}
