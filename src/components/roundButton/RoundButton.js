import classNames from 'classnames';
import styles from './RoundButton.module.css'

export function RoundButton({ children, onClick, remove }) {
  return <button
    onClick={onClick}
    className={classNames(
      styles.RoundButton,
      remove && styles.remove
    )}
    >{children}</button>
}
