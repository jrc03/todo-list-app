import TaskCard from "./TaskCard";

export default function TaskList() {
  return (
    <div className="space-y-3">
      <TaskCard />
      <TaskCard />
    </div>
  );
}