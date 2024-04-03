"use client";

// Imports
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { desactivateAlert } from "@/store/eventsSlice";

// Components
import CustomModal from "@components/CustomModal";
import CustomIcon from "@components/Icon";
import { StateType } from "@store/index";

/**
 * @name Event
 * @description Manage events to display to the user when a major action was performed.
 *
 * @returns {JSX.Element}
 */
function Event(): JSX.Element {
  const isEventExist = useSelector(
    (state: StateType) => state.events.employeeCreation
  );
  const [newEmployeeCreationEvent, setNewEmployeeCreationEvent] =
    useState(isEventExist);
  const dispatch = useDispatch();

  useEffect(() => {
    setNewEmployeeCreationEvent(isEventExist);

    dispatch(desactivateAlert());
  }, [isEventExist, dispatch]);

  return (
    <CustomModal
      isOpen={newEmployeeCreationEvent}
      hasCloseButton
      buttonContent={"Close"}
      buttonStyling={
        "w-20 text-white bg-primary rounded-lg drop-shadow-md py-2 px-4 mt-8 hover:font-bold hover:bg-blue-800 hover:translate-y-px"
      }
    >
      <>
        <CustomIcon name={"newEmployee"} styling={"text-primary text-6xl"} />
        <p className="text-lg">New Employee Created !</p>
      </>
    </CustomModal>
  );
}

export default Event;
