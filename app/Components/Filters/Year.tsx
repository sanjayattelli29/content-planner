import { useTasks } from "@/context/taskContext";
import React from "react";

function Year() {
  const { year, setYear } = useTasks();

  const [activeIndex, setActiveIndex] = React.useState(2024);

  return (
    <div className="relative p-3 flex flex-around w-[8vw] items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">
       
        <button className="bg-stone-200 p-1 rounded-md" onClick={()=>{setYear(year-1); setActiveIndex(year-1); }}>&lt;</button>
        <label
          className={`relative px-2 z-10 font-medium text-lg rounded-md `}
        >
          {activeIndex}
        </label>
        <button className="bg-stone-200 p-1 rounded-md" onClick={()=>{setYear(year+1); setActiveIndex(year+1); }}>&gt;</button>
      
    </div>
  );
}

export default Year;
