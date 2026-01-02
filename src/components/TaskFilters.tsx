import { TaskFilters as Filters, FilterStatus, Category } from '@/types/task';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const categoryOptions: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'study', label: 'Study' },
  { value: 'health', label: 'Health' },
];

export const TaskFilters = ({ filters, onFiltersChange, stats }: TaskFiltersProps) => {
  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 pr-10"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter('search', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        {statusOptions.map((option) => {
          const count = option.value === 'all' 
            ? stats.total 
            : option.value === 'active' 
              ? stats.active 
              : stats.completed;
          
          return (
            <button
              key={option.value}
              onClick={() => updateFilter('status', option.value)}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                filters.status === option.value
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
              <span className={cn(
                "ml-1.5 text-xs",
                filters.status === option.value 
                  ? "text-muted-foreground" 
                  : "text-muted-foreground/70"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categoryOptions.map((option) => (
          <Button
            key={option.value}
            variant={filters.category === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter('category', option.value)}
            className={cn(
              "transition-all",
              filters.category === option.value && "shadow-md"
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Overdue warning */}
      {stats.overdue > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-sm">
          <span className="font-medium">{stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
};
