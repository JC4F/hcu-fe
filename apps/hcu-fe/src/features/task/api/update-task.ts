import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Task } from '@/types/api';

import { getTasksQueryOptions } from './get-tasks';

export const updateTaskInputSchema = z.object({
  complete: z.boolean({ required_error: 'Required' }),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

export const updateTask = ({
  data,
  taskId,
}: {
  data: UpdateTaskInput;
  taskId: string;
}): Promise<Task> => {
  return api.patch(`/tasks/${taskId}`, data);
};

type UseUpdateTaskOptions = {
  mutationConfig?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({
  mutationConfig,
}: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getTasksQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTask,
  });
};
