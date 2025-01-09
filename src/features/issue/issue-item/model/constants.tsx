import { BacklogIcon } from "../../../../shared/ui/icons/backlog-icon";
import { CancelledIcon } from "../../../../shared/ui/icons/cancelled-icon";
import { DoneIcon } from "../../../../shared/ui/icons/done-icon";
import { InProgressIcon } from "../../../../shared/ui/icons/in-progess-icon";
import { TodoIcon } from "../../../../shared/ui/icons/todo-icon";

export const ISSUE_STATUSES = [
  {
    key: "Backlog",
    text: "Backlog",
    icon: (
      <BacklogIcon
        name="Backlog"
        width={20}
        height={20}
        className="flex items-center"
      />
    ),
  },
  {
    key: "Todo",
    text: "Todo",
    icon: (
      <TodoIcon
        name="Todo"
        width={20}
        height={20}
        className="flex items-center"
      />
    ),
  },
  {
    key: "InProgress",
    text: "In Progress",
    icon: (
      <InProgressIcon
        name="InProgress"
        width={20}
        height={20}
        className="flex items-center"
      />
    ),
  },
  {
    key: "Done",
    text: "Done",
    icon: (
      <DoneIcon
        name="Done"
        width={20}
        height={20}
        className="flex items-center"
      />
    ),
  },
  {
    key: "Cancelled",
    text: "Cancelled",
    icon: (
      <CancelledIcon
        name="Cancelled"
        width={20}
        height={20}
        className="flex items-center"
      />
    ),
  },
] as const;

export type Issue_Status = keyof typeof ISSUE_STATUSES;