import { getValue, setValue } from '../useHooks/useLocalStorage';
import { useEffect, useReducer } from 'react';

// user's starting balance
const user = {
    fromLabel: 'Free Checking(4692) - Available ',
    toAcct: '',
    amount: null,
    balance: 5824.76
}

const queueInit = () => ({ data: { ...user }, phase: null });

// Transfer Form Reducer
const xferQueueReducer = (state, action) => {
    let queue;
    switch (action.type) {
        case 'XFER_QUEUE':
            queue = { ...state };
            queue.data[action.data.name] = action.data.value;
            queue.phase = queue.data.toAcct || queue.data.amount ? 'editing' : null;
            return queue;
        case 'XFER_SUBMIT':
            queue = { ...state };
            queue.phase = 'submit';
            return queue;
        case 'XFER_XFER':
            user.balance = +(user.balance -= state.data.amount).toFixed(2);
            return queueInit();
        case 'XFER_CLEAR':
            return queueInit();
        default:
            return state ? state : queueInit(); // cannot return undefined
    }
}

export default () => {
    // also stores the state value
    const [xferQueue, dispatch] = useReducer(xferQueueReducer, getValue('xferQueue', queueInit()));
    useEffect(() => setValue('xferQueue', xferQueue), [xferQueue]);

    return [xferQueue, dispatch];
}