import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskStats } from '@/components/TaskStats';
import { EmptyState } from '@/components/EmptyState';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CheckSquare } from 'lucide-react';

const Index = () => {
  const {
    tasks,
    allTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    stats,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    updateSubtask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
                <p className="text-sm text-muted-foreground">Organize your day, achieve your goals</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats */}
          <section>
            <TaskStats stats={stats} />
          </section>

          {/* Add Task */}
          <section>
            <AddTaskForm onAdd={addTask} />
          </section>

          {/* Filters */}
          <section>
            <TaskFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              stats={stats}
            />
          </section>

          {/* Task List */}
          <section>
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="group">
                    <TaskCard
                      task={task}
                      onToggle={toggleComplete}
                      onDelete={deleteTask}
                      onUpdate={updateTask}
                      onAddSubtask={addSubtask}
                      onToggleSubtask={toggleSubtask}
                      onDeleteSubtask={deleteSubtask}
                      onUpdateSubtask={updateSubtask}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState filters={filters} hasAnyTasks={allTasks.length > 0} />
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
