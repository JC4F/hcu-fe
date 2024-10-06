import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Task, Meta } from '@/types/api';

export const getTasks = (
  page = 1
): Promise<{
  data: Task[];
  meta: Meta;
}> => {
  return api.get(`/tasks`, {
    params: {
      page,
    },
  });
};

export const getTasksQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['tasks', { page }] : ['tasks'],
    queryFn: () => getTasks(page),
  });
};

type UseTasksOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

export const useTasks = ({ queryConfig, page }: UseTasksOptions) => {
  return useQuery({
    ...getTasksQueryOptions({ page }),
    ...queryConfig,
  });
};
