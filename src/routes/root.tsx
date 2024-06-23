import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import { Outlet } from 'react-router-dom';
import { UserSVG } from './components/user-svg';
import { InboxSVG } from './components/inbox-svg';
import { useRef } from 'react';

export const Root = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogInnerRef = useRef<HTMLDivElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const handleDialogClick = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const dialogInnerStopPropagation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <>
      <nav className="w-[220px] h-dvh border-0 border-r border-solid border-gray-300 text-sm px-3 pt-3">
        <div className="flex gap-1 justify-between">
          <div>
            <header className="flex items-center gap-2 w-5 h-5 bg-[#d5e5d6] justify-center">
              <UserSVG
                name="User"
                width={16}
                height={16}
                className=" text-[#00ae28] "
              />
            </header>
          </div>
          <div className="flex gap-1">
            <button className="h-7 min-w-7 flex items-center justify-center hover:bg-[#e1e1e1] hover:rounded-md">
              <MagnifyingGlass size={16} color="#575859" />
            </button>
            <button
              onClick={toggleDialog}
              className="h-7 min-w-7 flex items-center justify-center hover:bg-[#e1e1e1] hover:rounded-md"
            >
              <Plus size={16} color="#575859" />
            </button>

            {/* <Dialog
              handleDialogClick={handleDialogClick}
              dialogInnerStopPropagation={dialogInnerStopPropagation}
              dialogRef={dialogRef}
              dialogInnerRef={dialogInnerRef}
            /> */}
          </div>
        </div>
        <div className="pt-2">
          <ul className="flex flex-col gap-1">
            <li className="hover:bg-[#e1e1e1] hover:rounded-md group ">
              <a href="" className="flex items-center gap-3 pl-6 h-7">
                <InboxSVG
                  name="Inbox"
                  width={16}
                  height={16}
                  className="text-[#575859] group-hover:text-black"
                />
                Issues
              </a>
            </li>
            <div className="ml-8 pl-4 border-0 border-l border-solid border-gray-300 flex flex-col gap-1">
              <li className=" hover:bg-[#e1e1e1] hover:rounded-md">
                <a href="" className="flex items-center gap-2 h-7 pl-1">
                  Active
                </a>
              </li>
              <li className=" hover:bg-[#e1e1e1] hover:rounded-md">
                <a href="" className="flex items-center gap-2 h-7 pl-1">
                  Backlog
                </a>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      <section className="root-outlet w-full ">
        <Outlet
          context={{
            handleDialogClick,
            dialogInnerStopPropagation,
            dialogInnerRef,
            dialogRef,
          }}
        />
      </section>
    </>
  );
};
