import { useQuery } from "@tanstack/react-query";
import { getTasksCategories } from "../../../../repositories/PostgreRepository/postgreRepository";
import { ITask } from "../../../../Types/task";

function CategoryField({ inputValues, setInputValues }: { inputValues:ITask, setInputValues: (values: ITask) => void }) {
  const { data: taskCategories } = useQuery({
    queryKey: ["tasks-categories"],
    queryFn: () => getTasksCategories(),
  });
  return (
    <div className="col-span-2 sm:col-span-1">
      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
        Category
      </label>
      <select
        onChange={(e) => {
          setInputValues({ ...inputValues, category: { id: Number(e.target.options[e.target.selectedIndex].getAttribute("data-category-id")), category_name: e.target.value } });
        }}
        id="category"
        required
        value={inputValues.category.category_name}
        className=" border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-md"
      >
        <option disabled selected data-category-id={"0"}>
          Select...
        </option>
        {taskCategories &&
          taskCategories.map((category: { id: number; category_name: string }, index: number) => {
            return (
              <option key={category.id} defaultValue={"Select..."} data-category-id={category.id}>
                {category.category_name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default CategoryField;
