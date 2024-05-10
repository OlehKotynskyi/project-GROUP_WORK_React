import groupAvatars from '../../img/avatars/group-avatars.png';

import css from './AdvantagesSection.module.css';

export default function AdvantagesSection() {
  return (
    <>
      <section className={css.section}>
        <div className={css.customersWrapper}>
          <img
            className={css.groupImg}
            src={groupAvatars}
            alt=""
            width={61}
            height={28}
          />

          <p className={css.caption}>
            Our <span>happy</span> customers
          </p>
        </div>
        <ul className={css.list}>
          <li className={`${css.item} ${css.itemHabit}`}>
            <a className={`${css.link} ${css.linkHabit}`}>Habit drive</a>
          </li>
          <li className={`${css.item} ${css.itemStat}`}>
            <a className={`${css.link} ${css.linkStat}`}>View statistics</a>
          </li>
          <li className={`${css.item} ${css.itemRate}`}>
            <a className={`${css.link} ${css.linkRate}`}>
              Personal rate setting
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
