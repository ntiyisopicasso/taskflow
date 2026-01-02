import { useState } from 'react';
import { Priority, Category } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  ChevronDown,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAdd: (
    title: string,
    priority: Priority,
    category: Category,
    dueDate?: string,
    description?: string
  ) => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(
      title.trim(),
      priority,
      category,
      dueDate?.toISOString(),
      description.trim() || undefined
    );

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate(undefined);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate(undefined);
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground group"
      >
        <Plus className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span className="font-medium">Add new task</span>
      </button>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="task-card p-4 animate-fade-in border-primary/30"
    >
      <div className="space-y-4">
        {/* Title */}
        <Input
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
          autoFocus
        />

        {/* Description */}
        <Textarea
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[60px] resize-none border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
        />

        {/* Options row */}
        <div className="flex flex-wrap gap-2">
          {/* Priority */}
          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            <SelectTrigger className="w-[130px] h-9">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", `priority-${priority}`)} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full priority-high" />
                  High
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full priority-medium" />
                  Medium
                </div>
              </SelectItem>
              <SelectItem value="low">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full priority-low" />
                  Low
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Category */}
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>

          {/* Due Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, 'MMM d') : 'Due date'}
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setDueDate(undefined)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    </form>
  );
};
