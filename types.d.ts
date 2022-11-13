export type IOption<V = string> = {
    // label?: string | React.ReactNode;
    label?: string;
    value: V;
    children?: React.ReactNode;
}

export type IPageData = {
    page: number;
    size: number;
    recordsTotal: number;
}

export type IRequestResult<V> = {
    pagination: IPageData;
    data: IOption<V>[];
};