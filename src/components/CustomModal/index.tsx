"use client";

// Imports
import { ReactNode, useState, useEffect, useRef } from "react";

// Types
interface CustomModalProps {
  isOpen?: boolean;
  styling?: string;
  hasCloseButton?: boolean;
  buttonContent?: ReactNode;
  buttonStyling?: string;
  children: ReactNode;
}

/**
 * @component
 * @description Custom modal based on given parameter.
 *
 * @param {CustomModalProps} props Parameters for customization
 * @returns {JSX.Element}
 */
function CustomModal({
  isOpen = false,
  styling = "",
  hasCloseButton = false,
  buttonContent,
  buttonStyling,
  children,
}: CustomModalProps): JSX.Element {
  // Dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialog: HTMLDialogElement | null = dialogRef.current;

  // Component internal state
  const [openModal, setOpenModal] = useState(false);
  const closeDialogHandler = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // Check if dialog exists, if our component receives a signal to tell it to appear and if the internal state of this component is set at its default value
    if (!!dialog && isOpen === true && openModal === false) {
      setOpenModal(true);
    }

    // Manage the opening & closing of the component
    if (!!dialog) {
      if (openModal === true) {
        dialog.showModal();

        dialog.addEventListener("click", (e) => {
          const dialogDimensions = dialog.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            setOpenModal(false);
          }
        });
      }

      if (openModal === false) {
        dialog.close();
      }
    }
  }, [dialog, isOpen, openModal]);

  const defaultStyling =
    "w-1/2 h-1/2 flex flex-col justify-center items-center gap-4 rounded-md shadow";

  return (
    <dialog
      ref={dialogRef}
      className={`${defaultStyling} ${
        openModal === false ? "hidden" : "visible"
      } ${styling}`}
    >
      {children}

      {hasCloseButton && (
        <button
          autoFocus
          onClick={closeDialogHandler}
          className={buttonStyling}
        >
          {buttonContent}
        </button>
      )}
    </dialog>
  );
}

export default CustomModal;
