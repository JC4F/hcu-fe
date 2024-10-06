import { ContentLayout } from '@/components/layouts';
import { Button, Spinner } from '@hcu-fe/ui';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

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
          <Button>Task App</Button>
        </ErrorBoundary>
      </Suspense>
    </ContentLayout>
  );
};
