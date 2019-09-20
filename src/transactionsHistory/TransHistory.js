import React, { useEffect } from 'react';
import transHistoryStore from './transHistoryStore';
import dateFormat from 'dateformat';

const shortDate = val => {
    if (!val) return;

    let d = new Date(val);
    if (!isNaN(d.valueOf())) {
        return dateFormat(d, 'mmm. d');
    }
}

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
const TransItem = ({ item, idx }) => {
    return (
        <li className="transItem" data-idx={idx}>
            <span className="tCatCode" style={{ backgroundColor: item.categoryCode }}></span>
            <span className="tDate">{shortDate(item.transactionDate)}</span>
            <span>
                <span className="mLogo" style={{ backgroundImage: 'url(' + item.merchantLogo + ')' }}></span>
            </span>
            <span className="tDescript">
                <span className="mName">{item.merchant}</span>
                <span className="tType">{item.transactionType}</span>
            </span>
            <span className="tAmount">{item.amount}</span>
        </li>
    );
}

const TransHistory = ({ toDispatch }) => {
    const [{ transactions }, dispatch] = transHistoryStore();
    useEffect(() => {
        toDispatch && dispatch(toDispatch);
    }, [toDispatch, dispatch])
    let transItems;
    if (!transactions.length) {
        transItems = <li>No Transactions to Display</li>;
    } else {
        transItems = transactions.map((item, idx) =>
            <TransItem
                item={item}
                idx={idx.toString()}
                key={idx.toString()}
                onTransItemClick={dispatch.bind({ type: 'TRANS_SELECT', data: idx })}
            />
        );
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
