import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import css from './WaterForm.module.css';
import sprite from '../../img/svg/sprite.svg';
import {
  patchWater,
  fetchWatersMonth,
  fetchWaters,
} from '../../redux/water/operations';
import { Loader } from 'components/Loader/Loader';
import { selectSelectedDate } from '../../redux/water/selectors';
import { useSelector } from 'react-redux';

const schema = Yup.object().shape({
  amount: Yup.number('Must be a number')
    .typeError('Must be a number')
    .lessThan(1001, 'Too much')
    .positive('The data is not entered correctly')
    .integer('Must be more than 0')
    .required('Required field!'),
  time: Yup.string().required('Required field!'),
});
 const handleKeyDown = event => {
   if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
     event.preventDefault();
   }
 };

export const EditWaterForm = ({ onClose, selectedWater }) => {
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: selectedWater.timeDose,
      amount: selectedWater.amountDose,
    },
  });

  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const onSubmit = values => {
    setLoad(true);
    dispatch(
      patchWater({
        _id: selectedWater._id,
        timeDose: values.time,
        amountDose: values.amount,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Water successfully edited!', {
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
        dispatch(fetchWatersMonth(selectedDate.slice(0, 7)));
        onClose();
      })
      .catch(() => {
        toast.error('Oops, something go wrong!', {
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

  const amount = watch('amount', selectedWater.amountDose);
  const time = watch('time', selectedWater.timeDose);

  const handleIncrement = () => {
    if (amount >= 999) {
      return;
    }
    setValue('amount', Math.floor(parseInt(amount) / 50) * 50 + 50);
  };

  const handleDecrement = () => {
    if (amount <= 50) {
      return;
    }
    setValue('amount', Math.floor(parseInt(amount) / 50) * 50 - 50);
  };

  return (
    <div>
      <h3 className={css.title}>Correct entered data:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.stepperItem}>
          <p className={css.itemTitle}>Amount of water:</p>
          <div className={css.stepper}>
            <button
              className={css.stepButton}
              type="button"
              onClick={handleDecrement}
            >
              <svg className={css.icon} width="14" height="14">
                <use xlinkHref={`${sprite}#icon-minus`}></use>
              </svg>
            </button>
            <p className={css.stepperAmount}>{amount} ml</p>
            <button
              className={css.stepButton}
              type="button"
              onClick={handleIncrement}
            >
              <svg className={css.icon} width="14" height="14">
                <use xlinkHref={`${sprite}#icon-plus`}></use>
              </svg>
            </button>
          </div>
        </div>
        <div className={css.inputItem}>
          <div className={css.item}>
            <label className={css.itemTitle} htmlFor="time">
              Recording time:
            </label>
            <input
              className={`${css.input} ${errors.time && css.inputError}`}
              id="time"
              type="time"
              value={time}
              onChange={e => setValue('time', e.target.value)}
              {...register('time')}
              onKeyDown={handleKeyDown}
            />
            {errors.time && <p className={css.error}>{errors.time.message}</p>}
          </div>
          <div className={css.item}>
            <label className={css.amountLabel} htmlFor="amount">
              Enter the value of the water used:
            </label>
            <input
              className={`${css.input} ${errors.amount && css.inputError}`}
              type="number"
              name="amount"
              {...register('amount')}
            />
            {errors.amount && (
              <p className={css.error}>{errors.amount.message}</p>
            )}
          </div>
        </div>
        <button className={css.saveButton} type="submit">
          {load ? <Loader /> : 'Save'}
        </button>
      </form>
    </div>
  );
};
