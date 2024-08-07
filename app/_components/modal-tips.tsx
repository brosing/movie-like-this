interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-90 transition-opacity duration-500 p-4"
            onClick={onClose}
          ></div>
          <div
            className={`fixed inset-x-0 top-[35%] z-20 w-[80%] max-w-xl mx-auto rounded-2xl bg-neutral-100 dark:bg-neutral-800 transition-opacity duration-1000 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 uppercase">Tips</h2>
              <p>
                Using only movie title is fine, but for a better results you may
                include movie / series region & release date.{" "}
                <br className="hidden md:block" />
                If the title is too common, you can add some details as well.{" "}
              </p>
              <p className="mt-4 font-semibold">
                Example: You series netflix / Parasite, Korea, 2019.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
