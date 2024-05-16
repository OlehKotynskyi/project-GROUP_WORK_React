// src/components/WaterProgressBar.jsx
export const WaterProgressBar = ({ currentAmount, dailyNorm }) => {
  const percentage = (currentAmount / dailyNorm) * 100;

  return (
    <div>
      <progress value={currentAmount} max={dailyNorm} />
      <p>{percentage}% of daily norm</p>
    </div>
  );
};
