export type FC<P extends object = {}> = (props: React.PropsWithChildren<P>) => React.ReactNode;

export type Compound<C extends Record<string, FC<any>>, P extends object = {}> = FC<P> & C;

export type RawEntity<T extends object> = { [P in keyof T]: null extends T[P] ? string | null : string };

export type DataState = "loading" | "done" | "error";
