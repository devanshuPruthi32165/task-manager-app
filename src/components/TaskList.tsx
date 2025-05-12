import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList: React.FC = () => {
  const { filteredTasks, reorderTasks, activeFilter } = useTasks();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    
    // Dropped outside the list or no movement
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    // Only allow reordering if we're in the 'all' filter view
    if (activeFilter === 'all') {
      reorderTasks(result.source.index, result.destination.index);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
        <ClipboardList className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          {activeFilter === 'all' 
            ? "Add a new task to get started!" 
            : activeFilter === 'completed' 
              ? "You haven't completed any tasks yet."
              : "No pending tasks left. Great job!"}
        </p>
      </div>
    );
  }

  // Only use drag and drop when in 'all' filter view
  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Droppable 
        droppableId="taskList" 
        isDropDisabled={activeFilter !== 'all'}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`transition-all duration-200 ${isDragging ? 'opacity-95' : 'opacity-100'}`}
          >
            {filteredTasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
                isDragDisabled={activeFilter !== 'all'}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="outline-none"
                  >
                    <TaskItem 
                      task={task} 
                      index={index} 
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(TaskList);