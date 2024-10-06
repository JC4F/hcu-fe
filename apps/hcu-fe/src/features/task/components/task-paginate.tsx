import { Button } from '@hcu-fe/ui';

type TaskPaginateProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const TaskPaginate = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: TaskPaginateProps) => {
  return (
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
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 text-xs px-2 py-1"
      >
        Next
      </Button>
    </div>
  );
};
