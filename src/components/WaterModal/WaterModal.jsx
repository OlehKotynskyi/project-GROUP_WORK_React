import sprite from "../../img/svg/sprite.svg";
import css from "./WaterModal.module.css";

export const WaterModal = ({children, modal, onClose}) => {
    return (
        <div>
            <div className={css.modal}>
                <div className={css.buttonContainer}>
                    <button className={css.button} type="button" onClick={onClose}>
                        <svg className={css.icon} width="14" height="14">
                            <use xlinkHref={`${sprite}#icon-exsit`}></use>
                        </svg>
                    </button>
                </div>
                <div className={css.container}>
                    {modal.content === "add" && <h2 className={css.title}>Add water</h2>}
                    {modal.content === "edit" && <h2 className={css.title}>Edit the entered amount <br></br> of water</h2>}
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};