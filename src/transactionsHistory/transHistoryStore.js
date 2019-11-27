// @flow - pragma use here explained below
import { useReducer, useEffect } from "react";
import { getValue, setValue } from "../useHooks/useLocalStorage";
import initData from "../data/transactions.json";

export type Transaction = {
  +amount: string,
  +categoryCode: string,
  +merchant: string,
  +merchantLogo?: string,
  +transactionDate: number,
  +transactionType: "Transaction" | "Online Transfer" | "Card Payment"
};

// casting to the following signature (initData : {     [key : 'data']: Array <
// Transaction > })

export type TransHistory = {
  +transactions: Array<Transaction>,
  +selected?: ?Transaction
};

type TransferData = {
  toAcct: string,
  amount: number
};

type ActionSelect = {
  type: "TRANS_SELECT",
  data: {
    transaction: Transaction
  }
};
type ActionAdd = {
  type: "TRANS_ADD",
  data: TransferData
};
type ActionCancel = {
  type: "TRANS_CANCEL"
};
type ActionList = {
  type: "TRANS_LISTALL"
};
export type TransHistoryAction =
  | ActionSelect
  | ActionAdd
  | ActionList
  | ActionCancel;

const transHistoryReducer = (
  state: TransHistory,
  action: TransHistoryAction
): TransHistory => {
  switch (action.type) {
    case "TRANS_CANCEL":
      return {
        ...state,
        selected: null
      };
    case "TRANS_LISTALL":
      return state;
    case "TRANS_SELECT":
      return {
        ...state,
        selected: action.data.transaction
      };
    case "TRANS_ADD":
      const transactions: Array<Transaction> = state.transactions
        ? [...state.transactions]
        : [];
      transactions.unshift({
        amount: (+action.data.amount).toFixed(2),
        categoryCode: "red",
        merchant: action.data.toAcct,
        transactionDate: new Date().getTime(),
        transactionType: "Online Transfer"
      });
      return { transactions };
    default:
      return state;
  }
};
let initialState: TransHistory = {
  transactions: initData.data || [],
  selected: null
};
initialState = getValue<_, TransHistory>("transHistory", initialState);

export default () => {
  // @note useReducer also stores the state value
  // @note here we are supplying types to the generic callable useReducer. However, as of react-scripts 3.1.1,
  // builds may not properly strip these types (even WITH flow-bin installed, AND .flowconfig option "all": true).
  // The workaround is to include the @flow pragma/directive in the FIRST line of of this script
  const [transHistory, dispatch] = useReducer<TransHistory, TransHistoryAction>(
    transHistoryReducer,
    initialState
  );
  useEffect(() => setValue("transHistory", transHistory), [transHistory]);

  return [transHistory, dispatch];
};
