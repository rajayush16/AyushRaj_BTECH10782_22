const TaskCard = ({ task, onEdit, onDelete }) => {
  const due = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date';
  const created = task.created_at
    ? new Date(task.created_at).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">{task.title}</h3>
          <p className="mt-1 break-words text-xs text-slate-300">{task.description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-full border border-rose-600/60 px-3 py-1 text-xs text-rose-200 hover:border-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-400">Due: {due}</div>
      <div className="mt-1 text-[11px] text-slate-500">Created: {created}</div>
    </div>
  );
};

export default TaskCard;
