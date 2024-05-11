// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import YupPassword from 'yup-password';
// import { Formik } from 'formik';

YupPassword(Yup);
const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email field is required'),
  password: Yup.string()
    .password('Password must be at least 6 characters long')
    .required('Password field is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password field is required'),
});

// export const SignUp = () => {
//   // const email = '';
//   // const password = '';
//   // const confirmPassword = '';
//   // const dispatch = { useDispatch };
//   // const handleSumbit = evt => {
//   //   evt.preventDefault();
//   //   const form = evt.target;
//   //   dispatch({
//   //     email: form.elements.name.value,
//   //     password: form.elements.name.value,
//   //     confirmPassword: form.elements.name.value,
//   //   });
//   // };
// };

export const SingUp = () => {
  const {
    register,
    handleSumbit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSumbit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          type="text"
          // name="email"
          {...register('email')}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="text" {...register('password', { required: true })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Repeat Password</label>
        <input type="password" {...register('repeatPassword')} />
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};
