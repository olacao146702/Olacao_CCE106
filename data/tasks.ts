export type Task = {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'Pending' | 'Completed';
  };
  
  export const defaultTasks: Task[] = [
    {
      id: '1',
      title: 'React Native with Expo',
      subject: 'Mobile Development',
      dueDate: 'August 25, 2026',
      status: 'Pending',
    },
    {
      id: '2',
      title: 'IT12',
      subject: 'Project Proposal',
      dueDate: 'September 19, 2026',
      status: 'Completed',
    },
    {
      id: '3',
      title: 'Pseudocode & Flowchart',
      subject: 'C# WinForms',
      dueDate: 'September 20, 2026',
      status: 'Pending',
    },
    {
      id: '4',
      title: 'Programming Quiz',
      subject: 'Object-Oriented Programming',
      dueDate: 'September 21, 2026',
      status: 'Completed',
    },
    {
      id: '5',
      title: 'Research Paper',
      subject: 'Research Methods',
      dueDate: 'September 23, 2026',
      status: 'Pending',
    },
    {
      id: '6',
      title: 'Presentation Slides',
      subject: 'Professional Development',
      dueDate: 'September 24, 2026',
      status: 'Completed',
    },
  ];
  
  export const TASKS_STORAGE_KEY = 'studyflow_tasks';