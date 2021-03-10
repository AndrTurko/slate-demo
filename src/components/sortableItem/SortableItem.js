import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import './SortableItem.module.css';
import { Item } from '../item';

export function SortableItem({
  disabled,
  id,
  index,
  handle,
  style,
  useDragOverlay,
  wrapperStyle,
  removeItem
}) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    disabled,
  });

  return (
    <Item
      ref={setNodeRef}
      value={id}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      transform={transform}
      transition={!useDragOverlay && isDragging ? 'none' : transition}
      wrapperStyle={wrapperStyle({index, isDragging, id})}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      removeItem={removeItem}
      {...attributes}
    />
  );
}
