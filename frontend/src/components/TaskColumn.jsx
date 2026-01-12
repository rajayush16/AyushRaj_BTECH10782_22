import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, status, tasks, onEdit, onDelete }) => {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
          {tasks.length}
        </span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-1 flex-col gap-3 rounded-xl border border-dashed p-2 transition ${
              snapshot.isDraggingOver
                ? 'border-emerald-400/60 bg-emerald-500/10'
                : 'border-slate-800'
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;