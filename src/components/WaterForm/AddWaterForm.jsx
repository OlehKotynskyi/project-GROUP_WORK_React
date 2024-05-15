import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
// import toast from 'react-hot-toast';
import css from "./WaterForm.module.css";
// import { useDispatch } from ;
// import { addWater} from ;

const schema = Yup.object().shape({
    amount: Yup.number()
        .positive()
        .integer()
        .required("Required field!"),
    time: Yup.string().required("Required field!"),
});

const date = new Date();

export const AddWaterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            time: `${date.getHours()}:${date.getMinutes()}`,
            amount: 50,
        }
    });

    // const dispatch = useDispatch();

    
    // const handleSubmit = (values, actions) => {
    //     dispatch(addWater({ ...values }))
    //         .unwrap()
    //         .then(() => {
    //             toast.success('Contact successfully added!', {
    //                 style: {
    //                     border: '1px solid #0d47a1',
    //                     padding: '16px',
    //                     color: '#111',
    //                 },
    //                 iconTheme: {
    //                     primary: '#2196f3',
    //                     secondary: '#fff',
    //                 },
    //             });
    //         })
    //         .catch(() => {
    //             toast.error('Oops, something go wrong!', {
    //                 style: {
    //                     border: '1px solid #F1041B',
    //                     padding: '16px',
    //                     color: '#111',
    //                 },
    //                 iconTheme: {
    //                     primary: '#F1041B',
    //                     secondary: '#fff',
    //                 },
    //             });
    //             })
    // };

    const amount = watch("amount", 50);
    const time = watch("time", "00:00");
    const onSubmit = (data) => console.log(data);

    const handleIncrement = () => {
        setValue("amount", Math.floor(parseInt(amount) / 50) * 50 + 50);
    };

    const handleDecrement = () => {
        if (amount <= 50) {
            return;
        }
        setValue("amount", Math.floor(parseInt(amount) / 50) * 50 - 50);
    };

  return (
    <div>
      <h3 className={css.title}>Choose a value</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.stepperItem}>
          <p className={css.itemTitle}>Amount of water:</p>
          <div className={css.stepper}>
            <button className={css.stepButton} type="button" onClick={handleDecrement}>-</button>
            <p className={css.stepperAmount}>{amount} ml</p>
            <button className={css.stepButton} type="button" onClick={handleIncrement}>+</button>
          </div>
        </div>
        <div className={css.inputItem}>
          <div className={css.item}>
            <label className={css.itemTitle} htmlFor="time">Recording time:</label>
            <input className={css.input}
              id="time"
              type="time"
              value={time}
              onChange={(e) => setValue("time", e.target.value)}
            />
            <p>{errors.time?.message}</p>
          </div>
          <div className={css.item}>
            <label className={css.amountLabel} htmlFor="amount">Enter the value of the water used:</label>
            <input className={css.input} type="number" name="amount" {...register("amount")} />
            <p>{errors.amount?.message}</p>
          </div>
        </div>
        <button className={css.saveButton} type="submit">Save</button>
      </form>
    </div>
  );
};