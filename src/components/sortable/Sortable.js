import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {
  DragOverlay,
  DndContext
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import {Item} from '../item';
import {Wrapper} from '../wrapper';
import {SortableItem} from '../sortableItem';
import { GridContainer } from '../gridContainer';

export function Sortable({
  adjustScale = false,
  strategy = rectSortingStrategy,
  handle = true,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  useDragOverlay = true,
  items,
  setItems,
  removeItem,
  updateText
}) {
  const [activeId, setActiveId] = useState(null);
  const getIndex = id => items.findIndex(item => item.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  return (
    <div>
      <DndContext
        onDragStart={({active}) => {
          if (!active) {
            return;
          }
          setActiveId(active.id);
        }}
        onDragEnd={({over}) => {
          setActiveId(null);

          if (over) {
            const overIndex = getIndex(over.id);
            if (activeIndex !== overIndex) {
              setItems((items) => arrayMove(items, activeIndex, overIndex));
            }
          }
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <Wrapper center>
          <SortableContext items={items.map(item => item.id)} strategy={strategy}>
            <GridContainer columns={2}>
              {items.map((item, index) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  handle={handle}
                  index={index}
                  style={getItemStyles}
                  wrapperStyle={wrapperStyle}
                  useDragOverlay={useDragOverlay}
                  removeItem={removeItem}
                  updateText={updateText}
              />
            ))}
          </GridContainer>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay adjustScale={adjustScale}>
              {activeId ? (
                <Item
                  id={items[activeIndex].id}
                  handle={handle}
                  text={items[activeIndex].text}
                  wrapperStyle={wrapperStyle({
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex].id,
                  })}
                  style={getItemStyles({
                    id: items[activeIndex].id,
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
    </div>
  );
}
