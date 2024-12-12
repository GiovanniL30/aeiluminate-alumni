import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Notification Toast Message
 *
 * @author Giovanni Leo
 */

const config = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
};

const ToastNotification = {
  success: (message) => {
    toast.success(message, config);
  },

  error: (message) => {
    toast.error(message, config);
  },

  warning: (message) => {
    toast.warning(message, config);
  },

  info: (message) => {
    toast.info(message, config);
  },
};

export default ToastNotification;
