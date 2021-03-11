import classNames from 'classnames';
import styles from './DeleteButton.module.css'

export function DeleteButton({ children, onClick, remove }) {
  return <button
    onClick={onClick}
    className={styles.DeleteButton}
    />
}
