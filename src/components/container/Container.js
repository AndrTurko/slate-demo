import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import {rectSortingStrategy} from '@dnd-kit/sortable';

import { Sortable } from '../sortable';
import styles from './Container.module.css';
import { Wrapper } from '../wrapper';

export function Container() {
  const [items, setItems] = useState([
    {
      id: nanoid(),
      text: [{
        children: [
          { text: 'Some text' },
        ],
      }]
    }
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }
  const addItem = () => {
    setItems([ {id:nanoid(), text: [{
      children: [
        { text: 'Some text' },
      ],
    }]} , ...items])
  }
  const updateText = (id, text) => {
    const newItems = items.map(item => {
      if(item.id === id) {
        return {
          ...item,
          text
        }
      } else {
        return item;
      }
    })

    setItems(newItems);
  };

  return <Wrapper center column>
    <button className={styles.AddButton} onClick={() => addItem()} />
    <Sortable
      items={items}
      setItems={setItems}
      adjustScale={true}
      strategy={rectSortingStrategy}
      wrapperStyle={() => ({
        width: 400,
        height: 140,
      })}
      modifiers={[restrictToWindowEdges]}
      removeItem={removeItem}
      updateText={updateText}
    />
  </Wrapper>
}
