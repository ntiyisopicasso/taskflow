import { useState } from 'react';
import { Subtask } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubtaskListProps {
  taskId: string;
  subtasks: Subtask[];
  onAddSubtask: (taskId: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, title: string) => void;
  disabled?: boolean;
}

export const SubtaskList = ({
  taskId,
  subtasks,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onUpdateSubtask,
  disabled = false,
}: SubtaskListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(taskId, newSubtaskTitle.trim());
      setNewSubtaskTitle('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (subtask: Subtask) => {
    setEditingId(subtask.id);
    setEditTitle(subtask.title);
  };

  const handleSaveEdit = (subtaskId: string) => {
    if (editTitle.trim()) {
      onUpdateSubtask(taskId, subtaskId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const completedCount = subtasks.filter(st => st.completed).length;
  const totalCount = subtasks.length;

  return (
    <div className="mt-3 space-y-2">
      {/* Progress indicator */}
      {totalCount > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {completedCount}/{totalCount}
          </span>
        </div>
      )}

      {/* Subtask items */}
      <div className="space-y-1">
        {subtasks.map((subtask) => (
          <div 
            key={subtask.id} 
            className={cn(
              "flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-muted/50 group transition-colors animate-fade-in",
              disabled && "opacity-60"
            )}
          >
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => !disabled && onToggleSubtask(taskId, subtask.id)}
              disabled={disabled}
              className="h-4 w-4 rounded"
            />
            
            {editingId === subtask.id ? (
              <div className="flex-1 flex gap-1">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(subtask.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  className="h-6 text-sm py-0"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleSaveEdit(subtask.id)}
                >
                  <Check className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <>
                <span 
                  className={cn(
                    "flex-1 text-sm cursor-pointer",
                    subtask.completed && "line-through text-muted-foreground"
                  )}
                  onClick={() => !disabled && handleStartEdit(subtask)}
                >
                  {subtask.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDeleteSubtask(taskId, subtask.id)}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add subtask */}
      {isAdding ? (
        <div className="flex gap-2 animate-fade-in">
          <Input
            placeholder="Subtask title..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddSubtask();
              if (e.key === 'Escape') {
                setIsAdding(false);
                setNewSubtaskTitle('');
              }
            }}
            className="h-8 text-sm"
            autoFocus
          />
          <Button size="sm" className="h-8" onClick={handleAddSubtask}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8"
            onClick={() => {
              setIsAdding(false);
              setNewSubtaskTitle('');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          onClick={() => !disabled && setIsAdding(true)}
          disabled={disabled}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add subtask
        </button>
      )}
    </div>
  );
};
