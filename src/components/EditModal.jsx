"use client";
import { categories } from "../helpers/taskConfig";

export function EditModal({ editableValue, setEditableValue, task, setTasks, newArray, setShowEditable }) {
  function edit(e) {
    e.preventDefault();
    if (editableValue.title == "" || editableValue.description == "") {
      return;
    }

    if (newArray && newArray.length > 0) {
      newArray.forEach((el) => {
        if (el.id == task.id) {
          el.title = editableValue.title;
          el.description = editableValue.description;
          el.category = editableValue.category;

          localStorage.clear();
          localStorage.setItem("tasks", JSON.stringify(newArray));
        }
      });
      setTasks(newArray);
    }
    setShowEditable(false);
  }

  return (
    /* edit modal */
    <>
      <div className={`flex absolute h-screen w-full top-0 left-0 p-10 flex-col justify-center items-center `}>
        <div className="overlay bg-black opacity-85 absolute left-0 top-0 w-full h-full"></div>

        <div className=" absolute w-11/12 lg:w-1/2 2xl:w-6/12 mx-auto rounded-lg border-gray-100 bg-gray-50 z-20 shadow-md text-black">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-b-gray-200 rounded-t ">
            <h3 className="text-lg font-semibold">Edit Task</h3>
            <button
              onClick={() => {
                setShowEditable(false);
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
              edit(e);
            }}
          >
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Title
                </label>
                <input
                  onChange={(e) => {
                    setEditableValue({ ...editableValue, title: e.target.value });
                  }}
                  defaultValue={task.title}
                  id="title"
                  rows="4"
                  className="block p-2.5 w-full text-sm   rounded-lg border  focus:ring-blue-500 focus:border-blue-500  shadow-md resize-none"
                  placeholder="Task title..."
                ></input>
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Description
                </label>
                <textarea
                  onChange={(e) => {
                    setEditableValue({ ...editableValue, description: e.target.value });
                  }}
                  defaultValue={task.description}
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm   rounded-lg border  focus:ring-blue-500 focus:border-blue-500  shadow-md resize-none"
                  placeholder="Task description..."
                ></textarea>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  onChange={(e) => {
                    setEditableValue({ ...editableValue, category: e.target.value });
                  }}
                  id="category"
                  value={editableValue.category}
                  className=" border  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-md"
                >
                  <option disabled="Select category">Category</option>
                  {categories.map((category, index) => {
                    return <option key={index}>{category}</option>;
                  })}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
