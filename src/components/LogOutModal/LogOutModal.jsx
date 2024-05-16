import sprite from "../../img/svg/sprite.svg";
import css from "./LogOutModal.module.css";

export const LogOutModal = ({ onClose }) => {
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
                    <button className={css.yesButton} type="button">Log out</button>
                    <button className={css.noButton} type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};