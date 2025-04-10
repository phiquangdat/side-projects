import { useContext, useActionState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import SubmitButton from "./SubmitButton";
export default function TransactionForm({ setOptimisticTransactions }) {
  const { addTransaction } = useContext(BudgetContext);
  async function handleCreateTransaction(prevFormState, formData) {
    const description = formData.get("description");
    const amount = Number(formData.get("amount"));
    const category = formData.get("category");
    let errors = [];

    if (description.trim() == "") {
      errors.push("Please enter description");
    }

    if (!amount) {
      errors.push("Amount is not valid");
    }

    if (category.trim() == "") {
      errors.push("Please select a category");
    }
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          description,
          amount,
          category,
        },
      };
    }
    const transaction = {
      id: Math.random(),
      description,
      amount,
      category,
      isOptimistic: true,
    };
    setOptimisticTransactions((prev) => [...prev, transaction]);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    addTransaction({ ...transaction, isOptimistic: false });

    return { errors: null };
  }
  const [formState, formAction] = useActionState(handleCreateTransaction, {
    errors: null,
  });
  return (
    <form action={formAction}>
      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        defaultValue={formState.enteredValues?.description}
      ></input>

      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        name="amount"
        defaultValue={formState.enteredValues?.amount}
      ></input>

      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        defaultValue={formState.enteredValues?.category}
      >
        <option value="salary">Salary</option>
        <option value="gasoline">Gasoline</option>
        <option value="food">Food</option>
        <option value="magazines">Magazines</option>
      </select>
      {formState.errors && (
        <ul className="errors">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <SubmitButton pending_text="Loading" actual_text="Add Transaction" />
    </form>
  );
}
