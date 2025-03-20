import React from "react";

function TransactionList({ transactions, onRemove }) {
  return (
    <div>
      <h2>Transactions</h2>
      <ul className="transaction-list">
        {transactions.map((transaction, index) => (
          <li
            className={transaction.amount > 0 ? "income" : "expense"}
            key={index}
            onClick={() => onRemove(transaction.id)}
          >
            <span>{transaction.text}</span>
            <span>${transaction.amount}</span>
            <button>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
