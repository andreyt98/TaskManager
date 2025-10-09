import { useContext, useEffect, useState } from "react";
import { categories } from "../../helpers/taskConfig";
import { RepositoryContext } from "../../context/Context";
import { convertStatus } from "../../repositories/localStorageRepository/localStorageRepository";
import { setShowTaskModal } from "../../store/slices/UISlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setNewTasks, setInProgressTasks, setCompletedTasks } from "../../store/slices/taskSlice";
import { useQuery } from "@tanstack/react-query";
import { getTasksCategories } from "../../repositories/PostgreRepository/postgreRepository";

function TaskForm() {
  const { repo } = useContext(RepositoryContext);
  const { activeTaskValues } = useSelector((state: RootState) => state.taskSlice);
  const { authState } = useSelector((state: RootState) => state.auth);

  const isNewTask = activeTaskValues === null;

  const { title, description, category } = activeTaskValues || {};

  const [inputValues, setInputValues] = useState({ title: title, description: description, category: category });
  const [tasksCategories, setTasksCategories] = useState(categories);

  const dispatch = useDispatch();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["tasks-categories"],
    queryFn: () => getTasksCategories(),
  });

  useEffect(() => {
    if (data && isSuccess) {
      console.log(data);
      setTasksCategories(data);
    }
  }, [data, error, isLoading, isSuccess]);

  return (
    <form
      className="p-4 md:p-5"
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          if (isNewTask) {
            await repo.addTask({
              id: 0,
              status: "new",
              title: inputValues.title,
              category: inputValues.category,
              description: inputValues.description,
            });
            // dispatch(setShowTaskModal(false));
            if (authState == "off") {
              const LSTasks = JSON.parse(localStorage.getItem("newTasks") || "[]");
              dispatch(setNewTasks(LSTasks));
            }
          } else {
            await repo.updateTask(inputValues, activeTaskValues);
            dispatch(setShowTaskModal(false));

            if (authState == "off") {
              const LSTasks = JSON.parse(localStorage.getItem(convertStatus(activeTaskValues.status)) || "");
              switch (activeTaskValues.status) {
                case "new":
                  dispatch(setNewTasks(LSTasks));
                  break;
                case "in progress":
                  dispatch(setInProgressTasks(LSTasks));
                  break;
                case "completed":
                  dispatch(setCompletedTasks(LSTasks));
                  break;
              }
            }
          }
        } catch (error) {
          console.error("Error on task: ", error);
        }
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
            id="description"
            rows={4}
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
            required
            value={inputValues.category}
            className=" border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-md"
          >
            <option disabled selected>
              Select...
            </option>
            {tasksCategories.map((category, index) => {
              return (
                <option key={category.id} defaultValue={"Select..."} data-category-id={category.id}>
                  {category.category_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <button type="submit" className="btn-primary mt-2 max-sm:w-full rounded-lg text-sm !px-5 !py-3">
        {isNewTask ? "Add" : "Update"}
      </button>
    </form>
  );
}

export default TaskForm;
