import { CheckCircle2, Circle, AlertCircle, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export const TaskStats = ({ stats }: TaskStatsProps) => {
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={ListTodo}
        label="Total Tasks"
        value={stats.total}
        color="primary"
      />
      <StatCard
        icon={Circle}
        label="Active"
        value={stats.active}
        color="default"
      />
      <StatCard
        icon={CheckCircle2}
        label="Completed"
        value={stats.completed}
        color="success"
        subtitle={`${completionRate}%`}
      />
      <StatCard
        icon={AlertCircle}
        label="Overdue"
        value={stats.overdue}
        color="danger"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: 'primary' | 'success' | 'danger' | 'default';
  subtitle?: string;
}

const StatCard = ({ icon: Icon, label, value, color, subtitle }: StatCardProps) => {
  return (
    <div className="task-card p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "p-2 rounded-lg",
          color === 'primary' && "bg-primary/10 text-primary",
          color === 'success' && "bg-status-completed/10 text-status-completed",
          color === 'danger' && "bg-destructive/10 text-destructive",
          color === 'default' && "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
