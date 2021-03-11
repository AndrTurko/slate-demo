import React, { useEffect } from 'react';
import classNames from 'classnames';


import { Handle } from '../handle';

import styles from './Item.module.css';
import { SlateEditor } from "../slateEditor";

export const Item = React.memo(
  React.forwardRef(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        height,
        index,
        listeners,
        sorting,
        style,
        transition,
        transform,
        id,
        wrapperStyle,
        removeItem,
        updateText,
        text,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      return <li
        className={classNames(
          styles.Wrapper,
          fadeIn && styles.fadeIn,
          sorting && styles.sorting,
          dragOverlay && styles.dragOverlay
        )}
        style={
          {
            ...wrapperStyle,
            transition,
            '--translate-x': transform
              ? `${Math.round(transform.x)}px`
              : undefined,
            '--translate-y': transform
              ? `${Math.round(transform.y)}px`
              : undefined,
            '--scale-x': transform?.scaleX
              ? `${transform.scaleX}`
              : undefined,
            '--scale-y': transform?.scaleY
              ? `${transform.scaleY}`
              : undefined,
            '--index': index,
            '--color': color,
          }
        }
        ref={ref}
      >
        <div
          className={classNames(
            styles.Item,
            dragging && styles.dragging,
            handle && styles.withHandle,
            dragOverlay && styles.dragOverlay,
            disabled && styles.disabled,
            color && styles.color
          )}
          tabIndex={!handle ? 0 : undefined}
          style={style}
          {...(!handle ? listeners : undefined)}
          {...props}
        >
          <SlateEditor id={id} text={text} updateText={updateText} />
          <button className={styles.DeleteButton} onClick={() => removeItem(id)} />
          {handle ? <Handle {...listeners} /> : null}
        </div>
      </li>
    }
  )
);
