import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteWater,
  fetchWatersMonth,
  fetchWaters,
} from '../../redux/water/operations';
import {
  selectMonthlyWaters,
  selectSelectedDate,
} from '../../redux/water/selectors';
import { Loader } from 'components/Loader/Loader';
import sprite from '../../img/svg/sprite.svg';
import css from './DeleteWaterModal.module.css';

export const DeleteWaterModal = ({ onClose, selectedWater }) => {
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const monthlyWaters = useSelector(selectMonthlyWaters);
  const selectedDate = useSelector(selectSelectedDate);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const handleDelete = () => {
    setLoad(true);
    dispatch(deleteWater(selectedWater._id))
      .unwrap()
      .then(() => {
        toast.success('Water successfully deleted!', {
          style: {
            border: '1px solid #0d47a1',
            padding: '16px',
            color: '#9BE1A0',
          },
          iconTheme: {
            primary: '#9BE1A0',
            secondary: '#fff',
          },
        });
        setLoad(false);
        dispatch(fetchWaters(selectedDate)); 
        dispatch(fetchWatersMonth(currentMonth)); 
        onClose();
      })
      .catch(() => {
        toast.error('Oops, something went wrong!', {
          style: {
            border: '1px solid #F1041B',
            padding: '16px',
            color: '#323F47',
          },
          iconTheme: {
            primary: '#F1041B',
            secondary: '#fff',
          },
        });
        setLoad(false);
      });
  };

  useEffect(() => {}, [monthlyWaters]);

  return (
    <div className={css.modalContainer}>
      <div className={css.buttonContainer}>
        <button className={css.closeButton} type="button" onClick={onClose}>
          <svg className={css.icon} width="14" height="14">
            <use xlinkHref={`${sprite}#icon-exsit`}></use>
          </svg>
        </button>
      </div>
      <div className={css.contentContainer}>
        <h2 className={css.title}>Delete entry</h2>
        <p className={css.question}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.buttons}>
          <button
            className={css.yesButton}
            type="button"
            onClick={handleDelete}
          >
            {load ? <Loader /> : 'Delete'}
          </button>
          <button className={css.noButton} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
