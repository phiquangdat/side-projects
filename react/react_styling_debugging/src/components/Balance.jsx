import React from "react";
import TransactionList from "./TransactionList";

function Balance({ transactions }) {
  const amount =
    transactions ?? transactions.map((transaction) => transaction.amount);
  const balance = amount.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="balance">
      <h2>${balance}</h2>
    </div>
  );
}

export default Balance;
