import { Dispatch, SetStateAction } from "react";
import { typeOfTaskObject } from "./submitTask";

export const deleteTask = (task: typeOfTaskObject, setTasks: Dispatch<SetStateAction<typeOfTaskObject[]>>) => {
  Object.entries(localStorage).forEach((localSEntry) => {
    const valueOfEntry = JSON.parse(localSEntry[1]);
    let arrayToModify: typeOfTaskObject[];
    let arrayNameToMod: string;
    let resultArray: typeOfTaskObject[];

    if (valueOfEntry && valueOfEntry.length > 0) {
      valueOfEntry.forEach((ObjectsFromLSArrays: typeOfTaskObject) => {
        if (ObjectsFromLSArrays.id == task.id) {
          arrayNameToMod = localSEntry[0];
          arrayToModify = JSON.parse(localSEntry[1]);

          resultArray = arrayToModify.filter((element) => {
            return element.id != task.id;
          });

          localStorage.setItem(arrayNameToMod, JSON.stringify(resultArray));
          setTasks(resultArray);
        }
      });
    }
  });
};
