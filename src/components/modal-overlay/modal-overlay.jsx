import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/modalDataSlice";

export default function ModalOverlay({ children }) {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(closeModal())} className={style.overlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.object.isRequired,
};
