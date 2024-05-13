import React, { useState } from 'react';
import css from './Slider.module.css';

export const Slider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={css.container}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className={css.input}
      />
    </div>
  );
}

