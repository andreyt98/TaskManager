import { ITask } from "../../../../Types/task";

function TitleField({ inputValues, setInputValues }: { inputValues:ITask, setInputValues: (values: ITask) => void }) {
  return (
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
  );
}

export default TitleField;
