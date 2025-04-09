import { useState, useEffect, useOptimistic } from "react";
import "./budgettracker.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import BudgetProvider from "./context/BudgetContext";
import { get_Transaction } from "../api.js";
function App() {
  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    state.transactions,
    (prev, newItem) => [...prev, newItem]
  );
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get_Transaction();
        const totalAmount = response.reduce(
          (acc, transaction) => acc + Number(transaction.amount),
          0
        );
        setAmount(totalAmount);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <BudgetProvider>
      <div className="container">
        <h1 className="">Budget Tracker</h1>
        <div className="balance-box">
          <h3>Balance</h3>
          <p className="balance" id="balance">
            {amount}€
          </p>
        </div>
        <TransactionForm />
        <TransactionList />
      </div>
    </BudgetProvider>
  );
}

export default App;
