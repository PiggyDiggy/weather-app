export type FC<P extends object = {}> = (props: React.PropsWithChildren<P>) => React.ReactNode;

export type Compound<C extends Record<string, FC<any>>, P extends object = {}> = FC<P> & C;
