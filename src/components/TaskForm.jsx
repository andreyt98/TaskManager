"use client";
import { useState, useEffect } from "react";
import { categories } from "../helpers/taskConfig";

export const TaskForm = ({ tasks, setTasks }) => {
  const [inputValues, setInputValues] = useState({ title: "", description: "", category: "none" });
  useEffect(() => {
    localStorage.setItem("newTasks", JSON.stringify(tasks));
  }, [tasks]);
  const submitTask = (e) => {
    e.preventDefault();
    
    const newTaskObj = {
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      state: "new",
      title: inputValues.title,
      description: inputValues.description,
      category: inputValues.category,
    };

    let newTaskArray;
    if (tasks.length < 1) {
      newTaskArray = [newTaskObj];
    } else {
      newTaskArray = [...tasks,newTaskObj];
    }
    setTasks(newTaskArray);
    localStorage.setItem("newTasks", JSON.stringify(newTaskArray));

    setInputValues({ title: "", description: "", category: "none" });
    e.target.reset();
  };

  return (
    <form
      className="max-w-lg mx-auto"
      onSubmit={(e) => {
        submitTask(e);
      }}
    >
      <div className="flex relative w-full">
        {/* title */}
        <input
          onChange={(e) => {
            setInputValues({ ...inputValues, title: e.target.value });
          }}
          value={inputValues.title}
          type="text"
          style={{ borderRadius: "10px 0px 0px 10px" }}
          className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 border border-gray-400 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Title..."
          required
        />
        {/* description */}
        <input
          onChange={(e) => {
            setInputValues({ ...inputValues, description: e.target.value });
          }}
          value={inputValues.description}
          type="text"
          style={{ borderRadius: "0" }}
          className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 border border-gray-400 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description..."
          required
        />

        {/* category selector*/}
        <select
          onChange={(e) => {
            if (e.target.value != "No category") {
              setInputValues({ ...inputValues, category: e.target.value });
            } else {
              setInputValues({ ...inputValues, category: "none" });
            }
          }}
          defaultValue={"Category"}
          className="border border-gray-400 outline-none text-sm text-black bg-gray-50 p-1 hover:bg-gray-100 cursor-pointer"
          style={{ borderRadius: "0px" }}
        >
          <option disabled>Category</option>
          {categories.map((category, index) => {
            return <option key={index}>{category}</option>;
          })}
        </select>

        {/* submit button */}
        <button type="submit" className="p-2.5 text-sm rounded-e-lg bg-blue-600  hover:bg-blue-700 focus:ring-4 focus:outline-none">
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};
