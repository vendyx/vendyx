export const getParamName = (type: 'page' | 'size' | 'search', queryParamPrefix?: string) => {
  if (!queryParamPrefix) return type;

  return `${queryParamPrefix}_${type}`;
};

export const parseDataTableSearchParams = (
  searchParams: Record<string, string | undefined>,
  queryParamPrefix?: string
) => {
  const page = searchParams[getParamName('page', queryParamPrefix)];
  const size = searchParams[getParamName('size', queryParamPrefix)];
  const search = searchParams[getParamName('search', queryParamPrefix)];

  return {
    page: page ? Number(page) : 1,
    size: size ? Number(size) : 10,
    search: search ?? ''
  };
};

export const getSkip = (page: number, size: number) => {
  if (page === 1) return 0;

  return size * (page - 1);
};

// TODO: use `string | undefined` instead of optional parameter
export type DataTableSearchParams = {
  page?: string;
  size?: string;
  search?: string;
};
