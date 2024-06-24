import { RefObject } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CloseSVG } from './components/close-button';
import { UserSVG } from './components/user-svg';

export const Index = () => {
  return (
    <>
      <main className="bg-[#fbfbfb] mb-2 rounded-md">
        <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
          <div className="flex items-center h-9 gap-10 pl-8">
            <span>All issues</span>
            <button className="outline-1 outline-dashed outline-gray-300 rounded-sm text-gray-500 px-1">
              + Filter
            </button>
          </div>
        </header>

        <section className="text-sm">
          <header className="px-8 py-2 bg-gray-100 border-0 border-b border-solid border-gray-300">
            Backlog
          </header>
          <main>
            <div className="border-0 border-b border-solid border-gray-300 px-8 py-2">
              Issue 1
            </div>
          </main>
        </section>
      </main>
      <Dialog />
    </>
  );
};

const Dialog = () => {
  const {
    dialogInnerRef,
    dialogInnerStopPropagation,
    handleDialogClick,
    dialogRef,
  } = useOutletContext<DialogProps>();
  return (
    <>
      <dialog
        id="dialog"
        ref={dialogRef}
        onClick={handleDialogClick}
        className="shadow-lg"
      >
        <div
          id="dialog-inner"
          ref={dialogInnerRef}
          onClick={dialogInnerStopPropagation}
        >
          <header className="flex justify-between items-center ">
            <button className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <span className="flex items-center border border-solid border-gray-300 rounded-sm">
                <UserSVG name="User" color="#00ae28" width={12} height={12} />
              </span>
              New Issue
            </button>

            <button className="flex justify-end hover:bg-gray-200 hover:rounded-md">
              <span className=" rounded-md px-1  text-sm leading-none py-1">
                <CloseSVG name="CloseButton" width={16} height={16} />
              </span>
            </button>
          </header>
          <main>
            <div className="pb-2 pt-2">
              <form className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  <input type="text" placeholder="Issue title" />
                </label>
                <label htmlFor="">
                  <input type="text" placeholder="Add description" />
                </label>
              </form>
            </div>
          </main>

          <footer>
            <div className="flex gap-4 text-sm text-gray-500">
              <button className="">Backlog</button>
              <button className="">Priority</button>
              <button className="">Add labels</button>
            </div>
            <span className="flex justify-end ">
              <button className="bg-purple-400 rounded-md px-2 text-white text-sm py-1">
                Create Issue
              </button>
            </span>
          </footer>
        </div>
      </dialog>
    </>
  );
};
type DialogProps = {
  handleDialogClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;
  dialogInnerStopPropagation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  dialogInnerRef: RefObject<HTMLDivElement>;
};
