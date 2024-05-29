import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { addWater } from '../../redux/water/operations';
import { Loader } from 'components/Loader/Loader';
import sprite from '../../img/svg/sprite.svg';
import css from './WaterForm.module.css';

const schema = Yup.object().shape({
  amount: Yup.number('Must be a number')
    .typeError('Must be a number')
    .lessThan(1001, 'Too much')
    .positive('The data is not entered correctly')
    .integer('Must be more than 0')
    .required('Required field!'),
  time: Yup.string().required('Required field!'),
});

function getCurrentTime() {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export const AddWaterForm = ({ onClose }) => {
  const [load, setLoad] = useState(false);
  const [timeWithSeconds, setTimeWithSeconds] = useState(getCurrentTime());

  const currentTime = timeWithSeconds.slice(0, 5);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: currentTime,
      amount: 50,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    setLoad(true);
    const timeToSend = getCurrentTime();
    setTimeWithSeconds(timeToSend);
    dispatch(addWater({ timeDose: timeToSend, amountDose: values.amount }))
      .unwrap()
      .then(() => {
        toast.success('Water successfully added!', {
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

  const amount = watch('amount', 50);
  const time = watch('time', currentTime);

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
  const handleKeyDown = event => {
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };

  return (
    <div>
      <h3 className={css.title}>Choose a value:</h3>
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
              onKeyDown={handleKeyDown}
            />
            {errors.amount && (
              <p className={css.error}>{errors.amount.message}</p>
            )}
          </div>
        </div>
        <button className={css.saveButton} type="submit" disabled={load}>
          {load ? <Loader /> : 'Save'}
        </button>
      </form>
    </div>
  );
};
