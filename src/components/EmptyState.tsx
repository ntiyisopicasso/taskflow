import { ClipboardList, Search, Filter } from 'lucide-react';
import { TaskFilters } from '@/types/task';

interface EmptyStateProps {
  filters: TaskFilters;
  hasAnyTasks: boolean;
}

export const EmptyState = ({ filters, hasAnyTasks }: EmptyStateProps) => {
  const isFiltered = filters.search || filters.status !== 'all' || filters.category !== 'all';

  if (!hasAnyTasks) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No tasks yet
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Start organizing your day by adding your first task. Click the button above to get started!
        </p>
      </div>
    );
  }

  if (isFiltered) {
    const icon = filters.search ? Search : Filter;
    const Icon = icon;
    
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No matching tasks
        </h3>
        <p className="text-muted-foreground max-w-sm">
          {filters.search 
            ? `No tasks found matching "${filters.search}"`
            : "No tasks match your current filters. Try adjusting them to see more results."
          }
        </p>
      </div>
    );
  }

  return null;
};
