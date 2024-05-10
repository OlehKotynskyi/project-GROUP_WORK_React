// src/components/WaterForm.jsx
import { useState } from 'react';

export const WaterForm = ({ date, amount, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    date: date || '',
    amount: amount || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Amount:
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};
