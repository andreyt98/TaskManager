import { useContext, useState } from "react";
import { RepositoryContext } from "../../../context/Context";
import { setShowTaskModal } from "../../../store/slices/UISlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../../../Types/task";
import SubmitButton from "./FormElements/SubmitButton";
import TitleField from "./FormElements/TitleField";
import DescriptionField from "./FormElements/DescriptionField";
import CategoryField from "./FormElements/CategoryField";

function TaskForm() {
  const { repo } = useContext(RepositoryContext);
  const { activeTaskValues } = useSelector((state: RootState) => state.taskSlice);

  const isNewTask = activeTaskValues === null;

  const [inputValues, setInputValues] = useState<ITask>(
    activeTaskValues || {
      id: 0,
      category: { id: 0, category_name: "Select..." },
      status: { id: 0, status: "new" },
      title: "",
      description: "",
      created_at: "",
    }
  );

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (task: ITask) => (isNewTask ? repo.addTask(task) : repo.updateTask(task)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatch(setShowTaskModal(false));
    },
  });

  return (
    <form
      className="p-4 md:p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (inputValues.category.id === 0) {
          const select = document.getElementById("category");
          select?.focus();
          return;
        }

        mutate(
          isNewTask
            ? {
                ...inputValues,
                id: 0, // la vamos a agregar para darle un id en el localstorage pero en el backend no se ocupa porque agrega el el automaticamente
                status: { id: 1, status: "new" },
              }
            : inputValues
        );

        // try {
        //   if (isNewTask) {
        //     await repo.addTask({
        //       id: 0, // la vamos a agregar para darle un id en el localstorage pero en el backend no se ocupa porque agrega el el automaticamente
        //       user_id: 0, // si signup -> user_id del usuario autenticado, si no 0 ya que es irrelevante para usuarios no autenticados
        //       status: { id: 1, status: "new" },
        //       title: inputValues.title,
        //       category: inputValues.category,
        //       description: inputValues.description,
        //     });
        //     // dispatch(setShowTaskModal(false));
        //     // if (authState == "off") {
        //     //   const LSTasks = JSON.parse(localStorage.getItem("newTasks") || "[]");
        //     //   dispatch(setNewTasks(LSTasks));
        //     // }
        //   } else {
        //     await repo.updateTask(inputValues);
        //     dispatch(setShowTaskModal(false));

        //     // if (authState == "off") {
        //     //   const LSTasks = JSON.parse(localStorage.getItem(convertStatus(activeTaskValues.status)) || "");
        //     //   switch (activeTaskValues.status) {
        //     //     case "new":
        //     //       dispatch(setNewTasks(LSTasks));
        //     //       break;
        //     //     case "in progress":
        //     //       dispatch(setInProgressTasks(LSTasks));
        //     //       break;
        //     //     case "completed":
        //     //       dispatch(setCompletedTasks(LSTasks));
        //     //       break;
        //     //   }
        //     // }
        //   }
        // } catch (error) {
        //   console.error("Error on task: ", error);
        // }
      }}
    >
      <div className="grid gap-6 mb-4 grid-cols-2 ">
        <TitleField inputValues={inputValues} setInputValues={setInputValues} />
        <DescriptionField inputValues={inputValues} setInputValues={setInputValues} />
        <CategoryField inputValues={inputValues} setInputValues={setInputValues} />
      </div>

      <SubmitButton />
    </form>
  );
}

export default TaskForm;
