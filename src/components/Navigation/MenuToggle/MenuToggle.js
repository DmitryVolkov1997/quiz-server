import classes from "./MenuToggle.module.scss";

const MenuToggle = ({onToggle, isOpen}) => {
    const cls = [classes.burger, isOpen ? classes.open : classes.close]

    return (
      <button className={cls.join(" ")} onClick={onToggle}>
          <span></span>
      </button>
    );
};

export default MenuToggle;
