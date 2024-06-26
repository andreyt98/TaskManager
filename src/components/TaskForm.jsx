"use client";
import { useState, useContext } from "react";
import { categories } from "../helpers/taskConfig.ts";
import { Context } from "@/context/Context";
import { submitTask } from "@/helpers/submitTask";

export const TaskForm = () => {
  const [inputValues, setInputValues] = useState({ title: "", description: "", category: "none" });
  const [showEditable, setShowEditable] = useState(false);
  const { newTasks, setNewTasks, setMessage } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    submitTask(inputValues, newTasks,setNewTasks);

    event.target.reset();
    setInputValues({ title: "", description: "", category: "none" });
    setShowEditable(false);
    setMessage({ message: "Task added successfully!", severity: "success", open: true });
  };

  return (
    <>
      <button
        className=" flex gap-2 px-5 py-2.5  lg:text-lg  rounded-3xl bg-blue-500  hover:bg-blue-600 focus:ring-4 focus:outline-none hover:scale-105 transition-all duration-200"
        onClick={() => {
          setShowEditable(true);
        }}
      >
        {" "}
        New Task
        <svg className="w-5 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
        </svg>
      </button>

      {showEditable && (
        <div className={`flex fixed z-20 h-screen w-full top-0 left-0 p-10 flex-col justify-center items-center `}>
          <div
            className="overlay bg-black opacity-85 absolute left-0 top-0 w-full h-full"
            onClick={() => {
              setShowEditable(false);
              setInputValues({ title: "", description: "", category: "none" });
            }}
          ></div>

          <div className=" max-md:-translate-y-14  absolute w-11/12 lg:w-1/2 2xl:w-6/12 mx-auto rounded-lg border-gray-100 bg-gray-50 z-20 shadow-md text-black">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-b-gray-200 rounded-t ">
              <h3 className="text-lg font-semibold">Add a new task</h3>
              <button
                onClick={() => {
                  setShowEditable(false);
                  setInputValues({ title: "", description: "", category: "none" });
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>

            <form
              className="p-4 md:p-5"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="grid gap-6 mb-4 grid-cols-2 ">
                <div className="col-span-2">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Title
                  </label>
                  <input
                    onChange={(e) => {
                      setInputValues({ ...inputValues, title: e.target.value });
                    }}
                    value={inputValues.title}
                    required
                    id="title"
                    rows="4"
                    className="block p-2.5 w-full text-sm   rounded-lg border  focus:ring-blue-500 focus:border-blue-500  shadow-md resize-none"
                    placeholder="add a title..."
                  ></input>
                </div>

                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Description
                  </label>
                  <textarea
                    onChange={(e) => {
                      setInputValues({ ...inputValues, description: e.target.value });
                    }}
                    value={inputValues.description}
                    required
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm   rounded-lg border  focus:ring-blue-500 focus:border-blue-500  shadow-md resize-none"
                    placeholder="add a description..."
                  ></textarea>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                    Category
                  </label>
                  <select
                    onChange={(e) => {
                      setInputValues({ ...inputValues, category: e.target.value });
                    }}
                    id="category"
                    value={inputValues.category}
                    className=" border  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-md"
                  >
                    <option disabled>Category</option>
                    {categories.map((category, index) => {
                      return <option key={index}>{category}</option>;
                    })}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="text-white mt-2  max-sm:w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center "
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
