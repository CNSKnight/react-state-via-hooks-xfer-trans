import { getValue, setValue } from '../useHooks/useLocalStorage';
import { useEffect, useReducer } from 'react';
import initData from '../data/transactions.json';

const transHistoryReducer = (state, action) => {
    let trans;
    switch (action.type) {
        case 'TRANS_CANCEL':
        case 'TRANS_LISTALL':
            return state;
        case 'TRANS_SELECT':
            // tbc
            break;
        case 'TRANS_ADD':
            trans = [...state.transactions];
            trans.unshift({
                amount: (+action.data.amount).toFixed(2),
                categoryCode: 'red',
                merchant: action.data.toAcct,
                transactionDate: (new Date()).getTime(),
                transactionType: 'Transfer'
            });
            return { transactions: trans }
        default:
            return state;
    }
}

export default () => {
    // also stores the state value
    const [transHistory, dispatch] = useReducer(transHistoryReducer, getValue('transHistory', {
        transactions: initData.data || []
    }));
    useEffect(() => setValue('transHistory', transHistory), [transHistory]);

    return [transHistory, dispatch];
}