import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type ModalProps = {
  title: string;
  message: ReactNode;
  titleConfirm: string;
  titleCancel?: string;
  type?: "exclude" | "confirm" | "default";
  show: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function Modal(props: ModalProps) {
  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {props.title}
            </h2>

            {props.message}

            <div className="flex gap-4 justify-center">
              <button
                onClick={props.onConfirm}
                className={`${
                  props.type === "exclude"
                    ? "bg-red-600 hover:bg-red-700"
                    : props.type === "confirm"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white px-5 py-2 rounded-lg shadow-md transition`}
              >
                {props.titleConfirm}
              </button>
              {props.titleCancel && (
                <button
                  onClick={props.onCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md transition"
                >
                  {props.titleCancel}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
