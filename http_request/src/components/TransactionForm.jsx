import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function TransactionForm() {
    const { addTransaction } = useContext(BudgetContext);

    function handleAdd(event) {
        event.preventDefault();
        const transaction = {
            id: Math.random(),
            description: event.target.description.value,
            amount: parseFloat(event.target.amount.value),
            category: event.target.category.value
        }
        addTransaction(transaction);
    }
    return (
        <form onSubmit={handleAdd}>
            <label htmlFor="description">Description</label>
            <input id="description" name="description"></input>

            <label htmlFor="amount">Amount</label>
            <input id="amount" name="amount"></input>

            <label htmlFor="category">Category</label>
            <select id="category" name="category">
                <option value="salary">Salary</option>
                <option value="gasoline">Gasoline</option>
                <option value="food">Food</option>
                <option value="magazines">Magazines</option>
            </select>

            <button type="submit">Add Transaction</button>
        </form>
    );
}