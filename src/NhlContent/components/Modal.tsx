import CloseButton from "./CloseButton";

type ModalType = {
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ closeModal, children }: ModalType) => {
  return (
    <div
      className={`modal relative z-10`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
      <div className="fixed inset-0 z-10 w-screen w-100 overflow-y-auto transform">
        <div
          className={`flex min-h-full items-center justify-center text-center`}
        >
          <div
            className={`flex flex-col p-3 overflow-hidden sm:rounded-lg bg-white dark:bg-stone-900 shadow-2xl sm:w-full sm:max-w-lg`}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal} />
            {children}
          </div>
          <p className="text-sm text-gray-500 mt-2"></p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
