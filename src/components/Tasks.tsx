import CategoryBadge from "./Task/CategoryBadge";
import ActionMenu from "./Task/ActionMenu";
import { ITask } from "../Types/task";
import { useEffect } from "react";

const Tasks = ({ setTasks, task }: { setTasks: (task: ITask | []) => void; task: ITask }) => {
  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <div className={"task  border border-gray-300 flex flex-col items-center justify-space-between bg-gray-100 rounded-md text-black"}>
      {/* title and dropdown */}
      <div className="flex w-full justify-between border-b border-b-slate-300 p-2 transition-all duration-200">
        <p className="font-semibold">{task.title}</p>

        <ActionMenu task={task} setTasks={setTasks} />
      </div>

      {/*task  description   and category*/}
      <div className="task text-start w-full p-2 flex flex-col gap-6">
        {/* description */}
        <p className=" font-light text-sm">{task.description}</p>

        {task.category != "none" && <CategoryBadge category={task.category} />}
      </div>
    </div>
  );
};

export default Tasks;
