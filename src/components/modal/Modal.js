import React, { forwardRef, useState } from "react";
import modals from "./modals"
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { modalClose } from "../../utils/modal"; 
import { useSelector } from "react-redux";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Modal({name,data}) {

  const currentModal = modals.find(m => m.name === name)

  const {isOpen}= useSelector(state=> state.modal)
  const [fullWidth, setFullWidth] = useState(false);

  const handleClose = () => {
    modalClose()
  };

  return (
    <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={name === "update-todo-modal" ? "sm" : "xs"}
        fullWidth={`${fullWidth}`}
        TransitionComponent={Transition}
      >
        <currentModal.element data={data}/>
      </Dialog>
  );
}

export default Modal;
