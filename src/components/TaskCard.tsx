import { useState } from 'react';
import { Task, Priority, Category } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Trash2, 
  Edit2, 
  Check, 
  X,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SubtaskList } from './SubtaskList';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, title: string) => void;
}

const priorityLabels: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const categoryLabels: Record<Category, string> = {
  work: 'Work',
  personal: 'Personal',
  study: 'Study',
  health: 'Health',
};

const getCategoryClass = (category: Category) => {
  return `category-${category}`;
};

const getPriorityClass = (priority: Priority) => {
  return `priority-${priority}`;
};

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  
  const daysUntil = differenceInDays(date, new Date());
  if (daysUntil > 0 && daysUntil <= 7) {
    return format(date, 'EEEE');
  }
  
  return format(date, 'MMM d');
};

const getDueDateStatus = (dateString: string, completed: boolean) => {
  if (completed) return 'normal';
  const date = new Date(dateString);
  if (isPast(date) && !isToday(date)) return 'overdue';
  if (isToday(date) || isTomorrow(date)) return 'due-soon';
  return 'normal';
};

export const TaskCard = ({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdate,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onUpdateSubtask,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const dueDateStatus = task.dueDate ? getDueDateStatus(task.dueDate, task.completed) : null;
  const hasSubtasks = task.subtasks.length > 0;
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;

  return (
    <div 
      className={cn(
        "task-card p-4 animate-fade-in",
        task.completed && "task-completed"
      )}
    >
      <div className="flex gap-3">
        {/* Priority indicator */}
        <div className={cn("priority-indicator self-stretch", getPriorityClass(task.priority))} />
        
        {/* Checkbox */}
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className={cn(
              "h-5 w-5 rounded-full border-2 transition-all",
              task.completed && "animate-check"
            )}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="h-8"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-2">
                <h3 className={cn(
                  "font-medium text-foreground leading-tight flex-1",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h3>
                
                {/* Expand/Collapse button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 -mt-0.5"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={cn("category-badge", getCategoryClass(task.category))}>
                  {categoryLabels[task.category]}
                </span>
                
                <span className="text-xs text-muted-foreground">
                  {priorityLabels[task.priority]} priority
                </span>
                
                {task.dueDate && (
                  <span className={cn(
                    "flex items-center gap-1 text-xs",
                    dueDateStatus === 'overdue' && "status-overdue font-medium",
                    dueDateStatus === 'due-soon' && "status-due-soon",
                    dueDateStatus === 'normal' && "text-muted-foreground"
                  )}>
                    {dueDateStatus === 'overdue' && <AlertCircle className="h-3 w-3" />}
                    <Calendar className="h-3 w-3" />
                    {formatDueDate(task.dueDate)}
                  </span>
                )}

                {/* Subtasks indicator */}
                {hasSubtasks && !isExpanded && (
                  <span className="text-xs text-muted-foreground">
                    {completedSubtasks}/{task.subtasks.length} subtasks
                  </span>
                )}
              </div>

              {/* Subtasks */}
              {isExpanded && (
                <SubtaskList
                  taskId={task.id}
                  subtasks={task.subtasks}
                  onAddSubtask={onAddSubtask}
                  onToggleSubtask={onToggleSubtask}
                  onDeleteSubtask={onDeleteSubtask}
                  onUpdateSubtask={onUpdateSubtask}
                  disabled={task.completed}
                />
              )}
            </>
          )}
        </div>
        
        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
