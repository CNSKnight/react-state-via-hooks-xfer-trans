import React from 'react';
import xferQueueStore from './xferQueueStore';
import { isFinite, toNumber } from 'lodash';

const FieldGroup = ({ id, label, ...props }) => {
  return (
    <div className={"pbInputBloc " + props.className || ''}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}

const Prompt = (props) => props.phase === 'submit' ? <div className="previewPrompt">PREVIEW</div> : null;

const XferForm = ({ setToDispatch }) => {
  const [{ data, phase }, dispatch] = xferQueueStore();
  const canSubmit = !!(data.toAcct && data.amount);
  return (
    <div className="card xfer">
      <div className="card-header">
        <i className="icon arrows"></i>
        Make a Transfer
      </div>
      <div className={'card-content ' + phase}>
        <Prompt phase={phase}></Prompt>
        <form>
          <FieldGroup
            id="xferFrom"
            label="From Account"
            type="text"
            disabled="disabled"
            value={data.fromLabel + '$' + (data.balance ? data.balance.toFixed(2) : '0.00')}
            name="fromAcct"
          />
          <FieldGroup
            id="xferTo"
            label="To Account"
            type="text"
            placeholder="Enter receiving account"
            value={data.toAcct || ""}
            name="toAcct"
            onChange={e => {
              e.preventDefault()
              dispatch({ type: 'XFER_QUEUE', data: { name: 'toAcct', value: e.target.value } })
            }}
          />
          <FieldGroup
            id="xferAmt"
            label="Amount"
            className="prefix"
            type="number"
            placeholder="0.00"
            value={data.amount || ""}
            name="amount"
            onChange={e => {
              e.preventDefault();
              // enusure numberable
              if (isFinite(toNumber(e.target.value))) {
                const dp = e.target.value.split('').reverse().indexOf('.');
                // constrain the precision
                if (dp < 3) {
                  dispatch({ type: 'XFER_QUEUE', data: { name: 'amount', value: e.target.value } });
                }
              }
            }}
          />
          <div className="actions">
            <button className="btn" name="action" type="SUBMIT" disabled={!canSubmit}
              onClick={e => {
                e.preventDefault();
                if (phase === 'submit') {
                  dispatch({ type: 'XFER_SUBMIT' });
                } else {
                  dispatch({ type: 'XFER_XFER' });
                  setToDispatch({ type: 'TRANS_ADD', data: { toAcct: data.toAcct, amount: data.amount } });
                }
              }}>{phase === 'submit' ? 'TRANSFER' : 'SUBMIT'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default XferForm;
