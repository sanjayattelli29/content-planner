"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filteredTasks, filteredTasksByMonth, filteredTasksByYear } from "@/utils/utilities";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";
import Months from "./Components/Filters/Months";
import Year from "./Components/Filters/Year";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority, month, year } = useTasks();

  // Memoize the filtering process for better performance
  const filtered = useMemo(() => filteredTasks(tasks, priority), [tasks, priority]);
  const monthFilter = useMemo(() => filteredTasksByMonth(filtered, month), [filtered, month]);
  const yearFilter = useMemo(() => filteredTasksByYear(monthFilter, year), [monthFilter, year]);

  useEffect(() => {
    setPriority("all");
    document.documentElement.style.zoom = "95%"; // ⚠️ Alternative: Move to CSS
  }, []);

  return (
    <main className="m-6 h-full">
      {/* Header & Filters */}
      <div className="flex justify-between flex-wrap">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

      <br />

      <div className="flex justify-between flex-wrap">
        <Months />
        <Year />
      </div>

      <br />

      {/* Task Sections */}
      {["All Tasks", "Incomplete Tasks", "Completed Tasks"].map((title, index) => {
        const filteredList =
          index === 1
            ? yearFilter.filter((task) => !task.completed) // Incomplete Tasks
            : index === 2
            ? yearFilter.filter((task) => task.completed) // Completed Tasks
            : yearFilter; // All Tasks

        return (
          <section key={title}>
            <h1 className="text-2xl font-bold">{title}</h1>
            <motion.div
              className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {filteredList.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}

              {/* Add Task Button */}
              {index === 0 && (
                <motion.button
                  className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
                    hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
                  onClick={openModalForAdd}
                  variants={item}
                >
                  Add New Task
                </motion.button>
              )}
            </motion.div>
          </section>
        );
      })}
    </main>
  );
}
