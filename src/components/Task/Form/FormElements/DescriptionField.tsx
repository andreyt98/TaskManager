import { ITask } from "../../../../Types/task";

function DescriptionField({ inputValues, setInputValues }: { inputValues:ITask, setInputValues: (values: ITask) => void }) {
  return (
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
  );
}

export default DescriptionField