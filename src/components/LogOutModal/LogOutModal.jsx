import { useState } from "react";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { Loader } from "../Loader/Loader";
import { signOut } from "../../redux/auth/operations";
import sprite from "../../img/svg/sprite.svg";
import css from "./LogOutModal.module.css";

export const LogOutModal = ({ onClose }) => {
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();

    const handleClick = (actions) => {
        setLoad(true);
        dispatch(signOut())
            .unwrap()
            .then(() => {
                toast.success('Goodbye!', {
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
            .catch(setLoad(false))
    };

    return (
        <div className={css.modalContainer}>
            <div className={css.buttonContainer}>
                <button className={css.closeButton} type="button" onClick={onClose}>
                    <svg className={css.icon}>
                        <use xlinkHref={`${sprite}#icon-exsit`}></use>
                    </svg>
                </button>
            </div>
            <div className={css.contentContainer}>
                <h2 className={css.title}>Log out</h2>
                <p className={css.question}>Do you really want to leave?</p>
                <div className={css.buttons}>
                    <button className={css.yesButton} type="button" onClick={handleClick}>{load ? <Loader /> : "Log out"}</button>
                    <button className={css.noButton} type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};