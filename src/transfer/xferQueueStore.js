// @flow
import { getValue, setValue } from "../useHooks/useLocalStorage";
import { useReducer, useEffect } from "react";

type XferData = {
  +fromLabel: string,
  +toAcct: string,
  +amount: number,
  +balance: number
};

export type XferQueue = { +data: XferData, +phase: "" | "editing" | "submit" };
// user's starting balance
const user = {
  fromLabel: "Free Checking(4692) - Available ",
  toAcct: "",
  amount: 0,
  balance: 5824.76
};

const queueInit = (): XferQueue => ({
  data: {
    ...user
  },
  phase: ""
});

export type XferQueueAction =
  | {
      type: "XFER_QUEUE",
      data: {
        name: string,
        value: string
      }
    }
  | {
      type: "XFER_SUBMIT" | "XFER_XFER" | "XFER_CLEAR"
    };

// Transfer Form Reducer
const xferQueueReducer = (
  state: XferQueue,
  action: XferQueueAction
): XferQueue => {
  let queue;
  switch (action.type) {
    case "XFER_QUEUE":
      queue = {
        ...state
      };
      queue.data[action.data.name] = action.data.value;
      queue.phase = queue.data.toAcct || queue.data.amount ? "editing" : "";
      return queue;
    case "XFER_SUBMIT":
      queue = {
        ...state
      };
      queue.phase = "submit";
      return queue;
    case "XFER_XFER":
      if (state.data.amount) {
        user.balance = +(user.balance -= state.data.amount).toFixed(2);
      }
      return queueInit();
    case "XFER_CLEAR":
      return queueInit();
    default:
      return state ? state : queueInit(); // cannot return undefined
  }
};

const initVal = getValue("xferQueue", queueInit());

const xferQueueStore = () => {
  // @note useReducer also stores the state value
  // @note here we are supplying types to the generic callable useReducer. However, as of react-scripts 3.1.1,
  // builds may not properly strip these types (even WITH flow-bin installed, AND .flowconfig option "all": true).
  // The workaround is to include the @flow pragma/directive in the FIRST line of of this script
  const [xferQueue, dispatch] = useReducer<XferQueue, XferQueueAction>(
    xferQueueReducer,
    initVal
  );
  useEffect(() => setValue("xferQueue", xferQueue), [xferQueue]);
  return [xferQueue, dispatch];
};
export { xferQueueStore };
