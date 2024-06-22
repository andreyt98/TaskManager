"use client";
import { useState, useEffect } from "react";
import { categories } from "../helpers/taskConfig";

export const TaskForm = ({ tasks, setTasks }) => {
  const [inputValues, setInputValues] = useState({ description: "", category: "none" });

  return (
    <form className="max-w-lg mx-auto" onSubmit={submitTask}>
      <div className="flex relative w-full">
        {/* description */}
        <input
          onChange={(e) => {
            setInputValues({ ...inputValues, description: e.target.value });
          }}
          value={inputValues.description}
          type="text"
          style={{ borderRadius: "10px 0px 0px 10px" }}
          className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50  rounded-l-md  border border-gray-400 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your task..."
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
          className="border border-gray-400 outline-none text-xs text-black bg-gray-50 p-1 "
          style={{ borderRadius: "0px" }}
        >
          <option disabled>Category</option>
          {categories.map((category, index) => {
            return <option key={index}>{category}</option>;
          })}
        </select>

        {/* submit button */}
        <button type="submit" className="p-2.5 text-sm rounded-e-lg bg-blue-600  hover:bg-blue-700 focus:ring-4 focus:outline-none">
          <svg className="w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};
