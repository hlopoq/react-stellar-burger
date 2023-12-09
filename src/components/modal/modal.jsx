import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/modalDataSlice";

function Modal({ children }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    function closePopupEsc(evt) {
      if (evt.key === "Escape") {
        dispatch(closeModal());
      }
    }

    document.addEventListener("keydown", closePopupEsc);
    return () => {
      document.removeEventListener("keydown", closePopupEsc);
    };
  }, [dispatch]);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={style.modal} onClick={(evt) => evt.stopPropagation()}>
        <button
          onClick={() => dispatch(closeModal())}
          className={style.closeButton}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.querySelector("#modals")
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
