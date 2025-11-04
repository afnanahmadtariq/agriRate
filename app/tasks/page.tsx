'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/shared/dashboard-layout';
import { ModernCard } from '@/components/ModernCard';
import { ModernButton } from '@/components/ModernButton';
import { ModernInput } from '@/components/ModernInput';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/app/hooks/useLanguage';
import type { Task, ChecklistItem } from '@/app/types';

// Mock task data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Irrigate wheat field',
    titleUrdu: 'گندم کے کھیت میں پانی دیں',
    description: 'Water the main wheat field in section A',
    category: 'irrigation',
    priority: 'high',
    status: 'pending',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    checklist: [
      { id: 'c1', text: 'Check water pump', completed: true },
      { id: 'c2', text: 'Clean irrigation channels', completed: false },
      { id: 'c3', text: 'Monitor water distribution', completed: false },
    ],
    userId: 'user1',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Apply fertilizer to cotton',
    titleUrdu: 'کپاس میں کھاد ڈالیں',
    description: 'Apply NPK fertilizer to cotton field',
    category: 'fertilizer',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    checklist: [
      { id: 'c4', text: 'Purchase fertilizer', completed: true },
      { id: 'c5', text: 'Apply fertilizer', completed: false },
    ],
    userId: 'user1',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Pest inspection',
    titleUrdu: 'کیڑوں کا معائنہ',
    description: 'Check all fields for pest infestation',
    category: 'pestControl',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    userId: 'user1',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Harvest tomatoes',
    titleUrdu: 'ٹماٹر کی کٹائی',
    description: 'Harvest ripe tomatoes from greenhouse',
    category: 'harvest',
    priority: 'high',
    status: 'completed',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    userId: 'user1',
    createdAt: new Date(),
    completedAt: new Date(),
  },
];

export default function TasksPage() {
  const { t, language } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('irrigation');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');

  const categoryIcons: Record<Task['category'], string> = {
    irrigation: '💧',
    pestControl: '🐛',
    fertilizer: '🌱',
    harvest: '🌾',
    preparation: '🚜',
    other: '📝',
  };

  const categoryLabels = {
    irrigation: { en: 'Irrigation', ur: 'آبپاشی', roman: 'Aabpashi' },
    pestControl: { en: 'Pest Control', ur: 'کیڑوں سے بچاؤ', roman: 'Keeray se Bachao' },
    fertilizer: { en: 'Fertilizer', ur: 'کھاد', roman: 'Khaad' },
    harvest: { en: 'Harvest', ur: 'کٹائی', roman: 'Kataai' },
    preparation: { en: 'Preparation', ur: 'تیاری', roman: 'Tayari' },
    other: { en: 'Other', ur: 'دیگر', roman: 'Deejar' },
  };

  const filteredTasks = tasks.filter((task) => filter === 'all' || task.status === filter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: 'user1',
      createdAt: new Date(),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const handleToggleStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === 'completed' ? 'pending' : task.status === 'pending' ? 'in-progress' : 'completed';
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date() : undefined,
          };
        }
        return task;
      })
    );
  };

  const handleToggleChecklist = (taskId: string, checklistId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId && task.checklist) {
          return {
            ...task,
            checklist: task.checklist.map((item) =>
              item.id === checklistId ? { ...item, completed: !item.completed } : item
            ),
          };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <DashboardLayout
      title={t({ en: 'Farm Tasks', ur: 'فارم کے کام', roman: 'Farm ke Kaam' })}
      userRole="farmer"
    >
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ModernCard variant="elevated" padding="md" hoverable onClick={() => setFilter('all')}>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Total Tasks', ur: 'کل کام', roman: 'Kul Kaam' })}
            </p>
            <p className="text-3xl font-bold" style={{ color: 'var(--agri-dark)' }}>
              {stats.total}
            </p>
          </div>
        </ModernCard>

        <ModernCard variant="elevated" padding="md" hoverable onClick={() => setFilter('pending')}>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Pending', ur: 'زیر التواء', roman: 'Zer-e-Iltawa' })}
            </p>
            <p className="text-3xl font-bold" style={{ color: 'var(--color-warning)' }}>
              {stats.pending}
            </p>
          </div>
        </ModernCard>

        <ModernCard variant="elevated" padding="md" hoverable onClick={() => setFilter('in-progress')}>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'In Progress', ur: 'جاری', roman: 'Jari' })}
            </p>
            <p className="text-3xl font-bold" style={{ color: 'var(--color-info)' }}>
              {stats.inProgress}
            </p>
          </div>
        </ModernCard>

        <ModernCard variant="elevated" padding="md" hoverable onClick={() => setFilter('completed')}>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Completed', ur: 'مکمل', roman: 'Mukammal' })}
            </p>
            <p className="text-3xl font-bold" style={{ color: 'var(--color-success)' }}>
              {stats.completed}
            </p>
          </div>
        </ModernCard>
      </div>

      {/* Add Task Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
            <ModernButton
              key={status}
              variant={filter === status ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {t({
                en: status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1),
                ur: status === 'all' ? 'تمام' : status === 'pending' ? 'زیر التواء' : status === 'in-progress' ? 'جاری' : 'مکمل',
                roman: status === 'all' ? 'Tamam' : status === 'pending' ? 'Pending' : status === 'in-progress' ? 'Jari' : 'Mukammal',
              })}
            </ModernButton>
          ))}
        </div>
        <ModernButton variant="primary" size="md" onClick={() => setShowAddTask(!showAddTask)}>
          {showAddTask ? '✕' : '+'} {t({ en: 'Add Task', ur: 'کام شامل کریں', roman: 'Kaam Shamil Karain' })}
        </ModernButton>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <ModernCard variant="outlined" padding="lg" className="mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
            {t({ en: 'New Task', ur: 'نیا کام', roman: 'Naya Kaam' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModernInput
              label={t({ en: 'Task Title', ur: 'کام کا عنوان', roman: 'Kaam ka Unwaan' })}
              type="text"
              placeholder={t({ en: 'Enter task...', ur: 'کام درج کریں...', roman: 'Kaam Darj Karain' })}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t({ en: 'Category', ur: 'قسم', roman: 'Qisam' })}
              </label>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as Task['category'])}
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {categoryIcons[key as Task['category']]} {t(label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t({ en: 'Priority', ur: 'ترجیح', roman: 'Tarjeeh' })}
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <option value="high">{t({ en: 'High', ur: 'زیادہ', roman: 'Zyada' })}</option>
                <option value="medium">{t({ en: 'Medium', ur: 'درمیانی', roman: 'Darmiyani' })}</option>
                <option value="low">{t({ en: 'Low', ur: 'کم', roman: 'Kam' })}</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <ModernButton variant="primary" size="md" onClick={handleAddTask}>
              {t({ en: 'Add Task', ur: 'شامل کریں', roman: 'Shamil Karain' })}
            </ModernButton>
            <ModernButton variant="secondary" size="md" onClick={() => setShowAddTask(false)}>
              {t({ en: 'Cancel', ur: 'منسوخ', roman: 'Mansookh' })}
            </ModernButton>
          </div>
        </ModernCard>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <ModernCard key={task.id} variant="outlined" padding="lg" hoverable>
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <button
                onClick={() => handleToggleStatus(task.id)}
                className="mt-1 flex-shrink-0"
              >
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    task.status === 'completed' ? 'bg-[var(--color-success)] border-[var(--color-success)]' : 'border-[var(--color-border)]'
                  }`}
                >
                  {task.status === 'completed' && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Task Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{categoryIcons[task.category]}</span>
                      <h3
                        className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}
                        style={{ color: 'var(--agri-dark)' }}
                      >
                        {language === 'ur' && task.titleUrdu ? task.titleUrdu : task.title}
                      </h3>
                    </div>
                    {task.description && (
                      <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {task.priority}
                    </StatusBadge>
                    <StatusBadge
                      status={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'info' : 'warning'}
                      size="sm"
                    >
                      {task.status}
                    </StatusBadge>
                  </div>
                </div>

                {/* Checklist */}
                {task.checklist && task.checklist.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {task.checklist.map((item) => (
                      <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleChecklist(task.id, item.id)}
                          className="w-4 h-4 rounded"
                          style={{ accentColor: 'var(--agri-dark)' }}
                        />
                        <span
                          className={`text-sm ${item.completed ? 'line-through opacity-60' : ''}`}
                          style={{ color: 'var(--color-text)' }}
                        >
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{t(categoryLabels[task.category])}</span>
                    {task.dueDate && (
                      <span className="flex items-center gap-1">
                        📅 {task.dueDate.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <ModernButton variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                    🗑️ {t({ en: 'Delete', ur: 'حذف کریں', roman: 'Hazf Karain' })}
                  </ModernButton>
                </div>
              </div>
            </div>
          </ModernCard>
        ))}

        {filteredTasks.length === 0 && (
          <ModernCard variant="outlined" padding="lg">
            <div className="text-center py-8">
              <p className="text-xl mb-2">📋</p>
              <p style={{ color: 'var(--color-text-muted)' }}>
                {t({ en: 'No tasks found', ur: 'کوئی کام نہیں ملا', roman: 'Koi Kaam Nahi Mila' })}
              </p>
            </div>
          </ModernCard>
        )}
      </div>
    </DashboardLayout>
  );
}
