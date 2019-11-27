import * as React from "react";
import transHistoryStore from "./transHistoryStore";
import { type TransHistoryAction, type Transaction } from "./transHistoryStore";
import dateFormat from "dateformat";

const shortDate = (val?: number): ?string => {
  if (!val) return;

  let d = new Date(val);
  if (!isNaN(d.valueOf())) {
    return dateFormat(d, "mmm. d");
  }
};

const TransLogo = ({ item }: { item: Transaction }) => {
  if (item.merchantLogo) {
    return (
      <span
        className="mLogo"
        style={{ backgroundImage: "url(" + item.merchantLogo + ")" }}
      ></span>
    );
  }
  return <span className="tLogo">{item.merchant.charAt(0)}</span>;
};

/**
 * return a transaction history listing
 * sample
 * "amount": "82.02",
 * "categoryCode": "#12a580",
 * "merchant": "The Tea Lounge",
 * "merchantLogo": "",
 * "transactionDate": 1476933842000,
 * "transactionType": "Card Payment"
 */
const TransItem = ({ item, idx }: { item: Transaction, idx: number }) => {
  return (
    <li className="transItem" data-idx={idx}>
      <span
        className="tCatCode"
        style={{ backgroundColor: item.categoryCode }}
      ></span>
      <span className="tDate">{shortDate(item.transactionDate)}</span>
      <span>
        <TransLogo item={item} />
      </span>
      <span className="tDescript">
        <span className="mName">{item.merchant}</span>
        <span className="tType">{item.transactionType}</span>
      </span>
      <span className="tAmount">{item.amount}</span>
    </li>
  );
};
type transHistoryProps = {
  toDispatch?: TransHistoryAction
};

const TransHistory = ({ toDispatch }: transHistoryProps) => {
  const [{ transactions }, dispatch] = transHistoryStore();
  React.useEffect(() => {
    toDispatch && dispatch(toDispatch);
  }, [toDispatch, dispatch]);
  let transItems;
  if (!transactions.length) {
    transItems = <li>No Transactions to Display</li>;
  } else {
    transItems = transactions.map((item, idx) => (
      <TransItem
        item={item}
        idx={idx}
        key={idx}
        onTransItemClick={dispatch.bind({ type: "TRANS_SELECT", data: idx })}
      />
    ));
  }

  return (
    <div className="card">
      <div className="card-header">
        <i className="icon briefcase"></i>
        Recent Transactions
      </div>
      <div className="card-content">
        <ul className="transHstry">{transItems}</ul>
      </div>
    </div>
  );
};

export default TransHistory;
