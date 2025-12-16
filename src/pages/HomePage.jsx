import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import data from "../database.json";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableCard({ id, children, darkMode, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab active:cursor-grabbing relative"
      {...attributes}
      {...listeners}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={`absolute top-2 right-2 z-10 p-1 rounded-full ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
            : "bg-gray-200 hover:bg-gray-300 text-gray-600"
        } transition-colors cursor-pointer`}
      >
        <X className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
}

export function HomePage({ darkMode, setCurrentPage, setScrollToPayTuition }) {
  const [cardOrder, setCardOrder] = useState([
    "tasks",
    "announcements",
    "events",
    "schedule",
    "tuition",
    "grades",
  ]);
  const redColor = "#9b0001";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCardOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteCard = (cardId) => {
    setCardOrder((items) => items.filter((id) => id !== cardId));
  };

  const renderCard = (cardId) => {
    switch (cardId) {
      case "tasks":
        return (
          <SortableCard
            id="tasks"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  My Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Holds Section */}
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center justify-between p-4 h-auto ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Holds
                    </h3>
                    <span
                      className="text-lg font-bold"
                      style={{
                        color:
                          data.tasks.holds > 0
                            ? redColor
                            : darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      {data.tasks.holds}
                    </span>
                  </Button>

                  {/* To Do List Section */}
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center justify-between p-4 h-auto ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      To Do List
                    </h3>
                    <span
                      className="text-lg font-bold"
                      style={{
                        color:
                          data.tasks.toDos > 0
                            ? redColor
                            : darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      {data.tasks.toDos}
                    </span>
                  </Button>

                  {/* Messages Section */}
                  <Button
                    variant="ghost"
                    className={`w-full flex items-center justify-between p-4 h-auto ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Messages
                    </h3>
                    <span
                      className="text-lg font-bold"
                      style={{
                        color:
                          data.tasks.messages > 0
                            ? redColor
                            : darkMode
                            ? "white"
                            : "black",
                      }}
                    >
                      {data.tasks.messages}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "schedule":
        return (
          <SortableCard
            id="schedule"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`space-y-4 ${
                    data.schedule.length > 2
                      ? "max-h-64 overflow-y-auto pr-2"
                      : ""
                  }`}
                >
                  {data.schedule.map((classItem, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {classItem.course}
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {classItem.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "tuition":
        return (
          <SortableCard
            id="tuition"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } self-start`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Tuition Due
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p
                    className={`text-4xl font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    ${data.tuition.amount.toLocaleString()}
                  </p>
                </div>
                {data.tuition.amount > 0 && (
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: redColor }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setScrollToPayTuition(true);
                      setCurrentPage("financial-services");
                      setTimeout(() => setScrollToPayTuition(false), 500);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    Pay Due
                  </Button>
                )}
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "announcements":
        return (
          <SortableCard
            id="announcements"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  {data.announcements.map((announcement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {announcement.title}
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {announcement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      case "events":
        return (
          <SortableCard
            id="events"
            darkMode={darkMode}
            onDelete={handleDeleteCard}
          >
            <Card
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : ""
              } min-h-[280px] flex flex-col`}
            >
              <CardHeader>
                <CardTitle
                  className="text-xl font-bold"
                  style={{ color: redColor }}
                >
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  {data.events.map((event, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {event.title}
                      </p>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {event.date}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SortableCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-12">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext items={cardOrder} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl">
            {cardOrder.map((cardId) => renderCard(cardId))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
