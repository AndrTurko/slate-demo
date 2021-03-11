import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import {rectSortingStrategy} from '@dnd-kit/sortable';

import { Sortable } from '../sortable';
import { GridContainer } from '../gridContainer';
import styles from './Container.module.css';
import { Wrapper } from '../wrapper';

export function Container() {
  const [items, setItems] = useState([
    {
      id: nanoid(),
      text: [{
        children: [
          { text: 'This is editable plain text, just like a <textarea>!' },
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
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    }]} , ...items])
  }
  const updateText = (id, text) => {
    console.log('text', text);
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

    console.log('newItems', newItems);

  };

  return <Wrapper center column>
    <button className={styles.AddButton} onClick={() => addItem()} />
    <Sortable
      items={items}
      setItems={setItems}
      adjustScale={true}
      Container={(props) => <GridContainer {...props} columns={2} />}
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
