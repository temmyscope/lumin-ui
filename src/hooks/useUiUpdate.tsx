import { useContext } from "react";
import { AppContext } from "../context";

const useUiUpdate = () => {

  const [ appStates, setAppStates ] = useContext(AppContext);

  const ForceUiUpdate = (value: number) => {
    setAppStates({ ...appStates, forceUiUpdate: value });
  }

  return { 
    forceUiUpdate: appStates.forceUiUpdate, ForceUiUpdate
  };
}

export { useUiUpdate }