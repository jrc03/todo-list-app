import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <Header />
      <TaskForm />
      <FilterBar />
      <TaskList />
    </>
  );
}

export default App;
