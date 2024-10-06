import { useState, useEffect, useRef } from 'react';
import { Spinner, Tabs, TabsContent, TabsList, TabsTrigger } from '@hcu-fe/ui';
import { TaskList } from '@/features/task/components/task-list';
import { useTasks } from '@/features/task/api/get-tasks';
import { CreateTask } from '@/features/task/components/create-task';
import { capitalizeFirstLetter } from '@/utils/string';
import { TaskPaginate } from '@/features/task/components/task-paginate';

type Tab = 'all' | 'complete' | 'incomplete';
const tabs: Tab[] = ['all', 'complete', 'incomplete'];
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
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-sm text-sm py-1 px-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                {capitalizeFirstLetter(tab)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div
            className="overflow-hidden transition-[height] duration-300 ease-in-out"
            style={{ height: contentHeight ? `${contentHeight}px` : 'auto' }}
          >
            <div ref={contentRef}>
              {isLoading ? (
                <Spinner size="default" />
              ) : (
                tabs.map((tab) => (
                  <TabsContent key={tab} value={tab}>
                    <TaskList tasks={paginatedTasks} />
                  </TabsContent>
                ))
              )}
            </div>
          </div>
        </Tabs>
        {paginatedTasks.length > 0 && (
          <TaskPaginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
