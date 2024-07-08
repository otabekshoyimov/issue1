import { Outlet } from 'react-router-dom';
import { RefObject, useRef, useState } from 'react';
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

  const [isNavVisible, setIsNavVisible] = useState(false);
  const handleIsNavVisibleClick = () => {
    setIsNavVisible((prevState) => !prevState);
    console.log('Nav visibility toggled:', !isNavVisible);
  };

  return (
    <>
      <div className="flex flex-row w-full h-full min-h-full">
        <div>
          <RootSidebar openDialog={openDialog} isNavVisible={isNavVisible} />
        </div>
        <div className="root-outlet flex-col flex-shrink-0 basis-0 min-w-0 ">
          <Outlet
            context={{
              handleDialogClick,
              dialogInnerStopPropagation,
              dialogInnerRef,
              dialogRef,
              handleIsNavVisibleClick,
            }}
          />
        </div>
      </div>
    </>
  );
};

export type OutletContext = {
  handleDialogClick: (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => void;

  dialogInnerStopPropagation: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  dialogRef: RefObject<HTMLDialogElement>;
  dialogInnerRef: RefObject<HTMLDivElement>;
  handleIsNavVisibleClick: () => void;
};
