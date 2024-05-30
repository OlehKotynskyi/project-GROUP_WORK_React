import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const LoaderBase = () => {
  return (
    <div className={css.containerBase}>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
