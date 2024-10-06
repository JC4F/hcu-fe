import { useNotifications } from '@/components/ui/notifications';
import { useDeleteTask } from '@/features/task/api/delete-task';
import { useUpdateTask } from '@/features/task/api/update-task';
import { Task } from '@/types/api';
import { Button, Checkbox } from '@hcu-fe/ui';
import { ClipboardList, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [removedTaskIds, setRemovedTaskIds] = useState<string[]>([]);

  const { addNotification } = useNotifications();
  const deleteTaskMutation = useDeleteTask({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Task Deleted',
        });
      },
    },
  });

  const updateTaskMutation = useUpdateTask({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Task Updated',
        });
      },
    },
  });

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <ClipboardList className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Add a new task or change your filter</p>
      </div>
    );
  }

  const updateTask = (id: string, complete: boolean) => {
    updateTaskMutation.mutate({ data: { complete }, taskId: id });
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate({ taskId: id });
    setRemovedTaskIds([...removedTaskIds, id]);
    setTimeout(() => {
      setRemovedTaskIds(removedTaskIds.filter((taskId) => taskId !== id));
    }, 300);
  };

  const isUpdating = updateTaskMutation.isPending;
  const isDeleting = deleteTaskMutation.isPending;

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center space-x-2 p-2 bg-gray-50 rounded-md shadow-sm transition-all duration-300 ${
            removedTaskIds.includes(task.id)
              ? 'opacity-0 transform translate-x-full'
              : 'opacity-100 transform translate-x-0'
          }`}
        >
          <Checkbox
            id={`task-${task.id}`}
            checked={task.complete}
            disabled={isUpdating}
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
            disabled={isDeleting}
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
