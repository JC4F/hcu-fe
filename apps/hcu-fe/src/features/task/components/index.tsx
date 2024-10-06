import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@hcu-fe/ui';
import { TaskList } from '@/features/task/components/task-list';
import { useTasks } from '@/features/task/api/get-tasks';
import { CreateTask } from '@/features/task/components/create-task';

const ITEMS_PER_PAGE = 8;

export const TaskComponent = () => {
  const { data, isLoading } = useTasks({});
  const tasks = data?.data || [];

  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + 8);
    }
  }, [tasks, filter, currentPage]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.complete;
    if (filter === 'incomplete') return !task.complete;
    return true;
  });

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Task Manager
        </h1>
        <CreateTask />
        <Tabs defaultValue="all" onValueChange={setFilter} className="mb-4">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-md">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-sm text-sm py-1 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 rounded-sm text-sm py-1 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="incomplete"
              className="flex-1 rounded-sm text-sm py-1 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Incomplete
            </TabsTrigger>
          </TabsList>
          <div
            className="overflow-hidden transition-[height] duration-300 ease-in-out"
            style={{ height: contentHeight ? `${contentHeight}px` : 'auto' }}
          >
            <div ref={contentRef}>
              {isLoading ? (
                <Spinner size="default" />
              ) : (
                <>
                  <TabsContent value="all">
                    <TaskList tasks={paginatedTasks} />
                  </TabsContent>
                  <TabsContent value="completed">
                    <TaskList tasks={paginatedTasks} />
                  </TabsContent>
                  <TabsContent value="incomplete">
                    <TaskList tasks={paginatedTasks} />
                  </TabsContent>
                </>
              )}
            </div>
          </div>
        </Tabs>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 text-xs px-2 py-1"
          >
            Previous
          </Button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 text-xs px-2 py-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
