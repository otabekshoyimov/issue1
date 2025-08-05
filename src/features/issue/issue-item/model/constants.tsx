import { BacklogIcon } from "../../../../shared/ui/icons/backlog-icon";
import { CancelledIcon } from "../../../../shared/ui/icons/cancelled-icon";
import { DoneIcon } from "../../../../shared/ui/icons/done-icon";
import { InProgressIcon } from "../../../../shared/ui/icons/in-progess-icon";
import { TodoIcon } from "../../../../shared/ui/icons/todo-icon";

export const ISSUE_STATUSES = [
  {
    key: "Backlog",
    label: "Backlog",
    icon: <BacklogIcon name="Backlog" width={14} height={14} className="flex items-center" />,
  },
  {
    key: "Todo",
    label: "Todo",
    icon: <TodoIcon name="Todo" width={14} height={14} className="flex items-center" />,
  },
  {
    key: "InProgress",
    label: "In Progress",
    icon: <InProgressIcon name="InProgress" width={14} height={14} className="flex items-center" />,
  },
  {
    key: "Done",
    label: "Done",
    icon: <DoneIcon name="Done" width={14} height={14} className="flex items-center" />,
  },
  {
    key: "Cancelled",
    label: "Cancelled",
    icon: <CancelledIcon name="Cancelled" width={14} height={14} className="flex items-center" />,
  },
] as const;

export type Issue_Status = keyof typeof ISSUE_STATUSES;
