import { useTasks } from "@/context/taskContext";
import React from "react";

function Months() {
  const { month, setMonth } = useTasks();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const months = [ 'All','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  return (
    <div className="relative p-3 flex flex-around w-[60vw] items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">
       
      { months.map((month, index) => (
        <button
          key={index}
          className={`relative px-2 z-10 font-medium text-lg rounded-md ${
            activeIndex === index ? "text-[#3aafae] bg-stone-200" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setMonth(month.toLowerCase());
          }}
        >
          {month}
        </button>
      ))}
    </div>
  );
}

export default Months;
