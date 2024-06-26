import { Dispatch, SetStateAction } from "react";
import { typeOfInputValues, typeOfTaskObject } from "./submitTask";

export const editTask = (editableValue: typeOfInputValues, task: typeOfTaskObject, setTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>) => {
 
  if (editableValue.title == "" || editableValue.description == "") {
    return;
  }

  Object.entries(localStorage).forEach((localSEntry) => {
    const valueOfEntry = JSON.parse(localSEntry[1]);
    let arrayToModify: typeOfTaskObject[];
    let arrayNameToModify: string;
    let modifiedObject: typeOfTaskObject;
    let resultArray: typeOfTaskObject[];

    if (valueOfEntry && valueOfEntry.length > 0) {
      valueOfEntry.forEach((ObjectsFromLSArrays: typeOfTaskObject) => {
        if (ObjectsFromLSArrays.id == task.id) {
          arrayNameToModify = localSEntry[0];
          arrayToModify = JSON.parse(localSEntry[1]);
          modifiedObject = ObjectsFromLSArrays;
          modifiedObject.title = editableValue.title;
          modifiedObject.description = editableValue.description;
          modifiedObject.category = editableValue.category;

          resultArray = arrayToModify.filter((element) => {
            return element.id != task.id;
          });

          resultArray.push(modifiedObject);

          localStorage.setItem(arrayNameToModify, JSON.stringify(resultArray));
          setTasks(resultArray);
        }
      });
    }
  });
};
