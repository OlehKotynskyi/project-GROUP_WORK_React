import sprite from "../../img/svg/sprite.svg";
import css from "./DeleteWaterModal.module.css";

export const DeleteWaterModal = ({ onClose }) => {
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
                <p className={css.question}>Are you sure you want to delete the entry?</p>
                <div className={css.buttons}>
                    <button className={css.yesButton} type="button">Delete</button>
                    <button className={css.noButton} type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};