import { useEffect, useMemo, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import TaskColumn from '../components/TaskColumn';
import TaskFormModal from '../components/TaskFormModal';
import useAuth from '../hooks/useAuth';

const Board = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTask, setActiveTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const grouped = useMemo(() => {
    return {
      pending: tasks.filter((task) => task.status === 'pending'),
      'in-progress': tasks.filter((task) => task.status === 'in-progress'),
      completed: tasks.filter((task) => task.status === 'completed'),
    };
  }, [tasks]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination, source } = result;
    if (destination.droppableId === source.droppableId) return;

    const nextStatus = destination.droppableId;
    const previous = [...tasks];

    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId ? { ...task, status: nextStatus } : task
      )
    );

    try {
      await api.put(`/tasks/${draggableId}`, { status: nextStatus });
    } catch (err) {
      setTasks(previous);
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleNewTask = () => {
    setActiveTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setActiveTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (task) => {
    if (!window.confirm('Delete this task?')) return;
    setError('');
    try {
      await api.delete(`/tasks/${task._id}`);
      setTasks((prev) => prev.filter((item) => item._id !== task._id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleSubmit = async (payload) => {
    setError('');
    try {
      if (activeTask) {
        const response = await api.put(`/tasks/${activeTask._id}`, payload);
        setTasks((prev) =>
          prev.map((task) => (task._id === activeTask._id ? response.data.data : task))
        );
      } else {
        const response = await api.post('/tasks', payload);
        setTasks((prev) => [response.data.data, ...prev]);
      }
      setIsModalOpen(false);
      setActiveTask(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Kanban</p>
            <h1 className="text-3xl font-semibold">Task Management Board</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleNewTask}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              New task
            </button>
            <Link
              to="/profile"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
            >
              Logout
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="mt-10 text-sm text-slate-400">Loading tasks...</div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <DragDropContext onDragEnd={handleDragEnd}>
              <TaskColumn
                title="Pending"
                status="pending"
                tasks={grouped.pending}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <TaskColumn
                title="In Progress"
                status="in-progress"
                tasks={grouped['in-progress']}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <TaskColumn
                title="Completed"
                status="completed"
                tasks={grouped.completed}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </DragDropContext>
          </div>
        )}

        {!loading && tasks.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
            No tasks yet. Create your first task to get started.
          </div>
        ) : null}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={activeTask}
      />
    </div>
  );
};

export default Board;