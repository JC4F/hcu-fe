import { useDeleteTask } from '@/features/task/api/delete-task';
import { useUpdateTask } from '@/features/task/api/update-task';
import { Task } from '@/types/api';
import { Button, Checkbox } from '@hcu-fe/ui';
import { ClipboardList, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const deleteTaskMutation = useDeleteTask({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Task Deleted');
      },
    },
  });

  const updateTaskMutation = useUpdateTask({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Task Updated');
      },
    },
  });

  const updateTask = (id: string, complete: boolean) => {
    updateTaskMutation.mutate({ data: { complete }, taskId: id });
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate({ taskId: id });
  };

  const isUpdating = updateTaskMutation.isPending;
  const updateTaskId = updateTaskMutation.variables?.taskId;
  const isDeleting = deleteTaskMutation.isPending;
  const deleteTaskId = deleteTaskMutation.variables?.taskId;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <ClipboardList className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Add a new task or change your filter</p>
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md shadow-sm transition-all duration-300"
        >
          <Checkbox
            id={`task-${task.id}`}
            checked={task.complete}
            disabled={isUpdating && updateTaskId === task.id}
            onCheckedChange={() => updateTask(task.id, !task.complete)}
            className="w-4 h-4"
          />
          <label
            // htmlFor={`task-${task.id}`}
            className={`flex-grow text-sm ${
              task.complete ? 'line-through text-gray-500' : 'text-gray-800'
            } truncate`}
          >
            {task.title}
          </label>
          <Button
            variant="ghost"
            size="sm"
            disabled={isDeleting && deleteTaskId === task.id}
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-1 transition duration-200"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
