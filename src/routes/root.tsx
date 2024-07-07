import { Outlet } from 'react-router-dom';
import { RefObject, useRef } from 'react';
import { RootSidebar } from './shared/components/root-sidebar';

export const Root = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogInnerRef = useRef<HTMLDivElement>(null);

  const openDialog = () => {
    if (!dialogRef.current) {
      return;
    }

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
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
      <RootSidebar openDialog={openDialog} />
      <div className="root-outlet w-full ">
        <Outlet
          context={{
            handleDialogClick,
            dialogInnerStopPropagation,
            dialogInnerRef,
            dialogRef,
          }}
        />
      </div>
    </>
  );
};

export type TOutletContext = {
  handleDialogClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;

  dialogInnerStopPropagation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  dialogInnerRef: RefObject<HTMLDivElement>;
};
