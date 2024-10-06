import { ContentLayout } from '@/components/layouts';
import { getTasksQueryOptions } from '@/features/task/api/get-tasks';
import { TaskComponent } from '@/features/task/components';
import { Spinner } from '@hcu-fe/ui';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

export const taskLoader = (queryClient: QueryClient) => async () => {
  const query = getTasksQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const TaskRoute = () => {
  const location = useLocation();
  return (
    <ContentLayout title="Task">
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <TaskComponent />
        </ErrorBoundary>
      </Suspense>
    </ContentLayout>
  );
};
