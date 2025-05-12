export type TaskStatus = 'pending' | 'completed';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
};

export type TaskFilter = 'all' | 'pending' | 'completed';

export type Theme = 'light' | 'dark';