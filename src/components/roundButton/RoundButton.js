import classNames from 'classnames';
import styles from './RoundButton.module.css'

export function RoundButton({ children, onClick, absolute, pivot, small }) {
  return <button
    onClick={onClick}
    className={classNames(
      styles.RoundButton,
      absolute && styles.absolute,
      pivot && styles.pivot,
      small && styles.small
    )}
    >{children}</button>
}
