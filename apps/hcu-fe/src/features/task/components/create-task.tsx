import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@hcu-fe/ui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTask } from '@/features/task/api/create-task';
import { toast } from 'react-toastify';

const formSchema = z.object({
  task: z.string().min(1, 'Task cannot be empty').max(100, 'Task is too long'),
});

export const CreateTask = () => {
  const createTaskMutation = useCreateTask({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Task Created');
      },
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
    },
  });

  const addTask = (values: z.infer<typeof formSchema>) => {
    createTaskMutation.mutate({
      data: {
        title: values.task,
      },
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addTask)} className="mb-6">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex space-x-2">
                  <Input
                    {...field}
                    placeholder="Enter a new task"
                    className="flex-grow text-sm p-2 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
                  />
                  <Button
                    disabled={createTaskMutation.isPending}
                    type="submit"
                    size="sm"
                    className="my-auto px-4 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm transition duration-200"
                  >
                    Add
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 mt-1 text-xs" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
