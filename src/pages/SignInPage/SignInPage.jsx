// //src/pages/SignInPage.jsx
// function SignInPage() {
//   return <h1>SignInPage</h1>;
// }

// export default SignInPage;



// src/pages/TrackerPage/TrackerPage.jsx
import { WaterMainInfo } from '../../components/WaterMainInfo/WaterMainInfo.jsx';
// import { WaterDetailedInfo } from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import { AddWaterBtn } from '../../components/AddWaterBtn/AddWaterBtn';
import style from '../Base.module.css';
import css from './SignInPage.module.css'
function TrackerPage() {
  return (
    <div className={`${style.container} ${css.homePageContainer}`}>
      <WaterMainInfo />
      {/* <WaterDetailedInfo /> */}
      {/* <AddWaterBtn /> */}
    </div>
  );
}

export default TrackerPage;