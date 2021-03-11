import React, {useState} from 'react';
import {createPortal} from 'react-dom';

import {
  closestCenter,
  DragOverlay,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,

  SortableContext,
  sortableKeyboardCoordinates,

  rectSortingStrategy,
} from '@dnd-kit/sortable';


import {Item} from '../item';
import {Wrapper} from '../wrapper';
import {SortableItem} from '../sortableItem';


export function Sortable({
  activationConstraint,
  adjustScale = false,
  Container,
  collisionDetection = closestCenter,
  strategy = rectSortingStrategy,
  handle = true,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  isDisabled = () => false,
  modifiers,
  useDragOverlay = true,
  items,
  setItems,
  removeItem,
  updateText
}) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const getIndex = id => items.findIndex(item => item.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  console.log('activeIndex', activeIndex);
  console.log('activeId', activeId);
  console.log('items', items);

  return (
    <div>
      <DndContext
        sensors={sensors} // TODO
        collisionDetection={collisionDetection} // TODO
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
        modifiers={modifiers} // TODO
      >
        <Wrapper center>
          <SortableContext items={items.map(item => item.id)} strategy={strategy}>
            <Container>
              {items.map((value, index) => ( // TODO
                <SortableItem
                  key={value.id}
                  id={value.id}
                  text={value.text}
                  handle={handle}
                  index={index}
                  style={getItemStyles}
                  wrapperStyle={wrapperStyle}
                  disabled={isDisabled(value.id)} // TODO
                  useDragOverlay={useDragOverlay}
                  removeItem={removeItem}
                  updateText={updateText}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {/* {useDragOverlay // TODO
        ? createPortal(
            <DragOverlay adjustScale={adjustScale}>
              {activeId ? (
                <Item
                  value={items[activeIndex]}
                  handle={handle}

                  wrapperStyle={wrapperStyle({
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex],
                  })}
                  style={getItemStyles({
                    id: items[activeIndex],
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
        : null} */}
    </DndContext>
    </div>
  );
}
