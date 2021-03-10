import React from 'react';
import classNames from 'classnames';

import styles from './Wrapper.module.css';


export function Wrapper({children, center, style, column}) {
  return (
    <div
      className={classNames(styles.Wrapper, center && styles.center, column && styles.column)}
      style={style}
    >
      {children}
    </div>
  );
}
