"use client";

export function TasksContainer({ tasks, setTasks, setEditClicked, setClickedId }) {
  return (
    <section className=" p-2 flex flex-col justify-center lg:flex-row gap-8 w-full lg:w-11/12 xl:w-9/12">
      <div className="border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg">
        <p className="bg-gray-100 text-orange-700 text-xs inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-orange-600">New tasks</p>
      </div>

      <div className="border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg">
        <p className="bg-gray-100 text-yellow-600 text-xs  inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-yellow-500">In progress</p>
      </div>

      <div className="border  rounded-lg px-4 py-8 w-full flex flex-col gap-4 shadow-lg">
        <p className="bg-gray-100 text-green-600 text-xs  inline-flex items-center px-2.5 py-0.5 rounded-md font-semibold border-l-8 border-l-green-600">Completed</p>
      </div>
    </section>
  );
}
