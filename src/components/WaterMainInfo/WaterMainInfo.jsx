// src/components/WaterMainInfo.jsx
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma.jsx';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar.jsx';

export const WaterMainInfo = () => {
  // Assuming dailyNorm is passed as props from parent component
  const dailyNorm = 2000; // Example value, replace with actual value
  return (
    <div>
      <WaterDailyNorma dailyNorm={dailyNorm} />
      <WaterProgressBar currentAmount={1500} dailyNorm={dailyNorm} />
      {/* Moving AddWaterBtn to TrackerPage */}
    </div>
  );
};
