import { useOutletContext } from 'react-router-dom';
import { OpenNavSVG } from '../../../shared/components/svgs/open.nav';
import { Button } from './button';
import { OutletContext } from '../../root';

type IssuesHeaderProps = {
  handleSelecetedIssue: () => void;
  selectedIssues: string[];
};
export const IssuesHeader = (props: IssuesHeaderProps) => {
  const outletContext = useOutletContext<OutletContext>();
  return (
    <>
      <header className="  text-sm border-0 border-b border-solid border-gray-300 ">
        <div className="flex px-4 h-9 gap-10 ">
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() => {
                outletContext.handleIsNavVisibleClick();
              }}
              className="flex items-center hover:bg-gray-300 p-1 rounded-md nav-btn z-[97] relative lg:hidden"
            >
              <OpenNavSVG name="OpenNav" width={16} height={16} />
            </button>
            <span>All issues</span>
          </div>
          <div className="flex-grow justify-end flex items-center">
            <Button
              text="Delete"
              onClick={props.handleSelecetedIssue}
              disabled={props.selectedIssues.length === 0}
            />
          </div>
        </div>
      </header>
    </>
  );
};
