import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import {rectSortingStrategy} from '@dnd-kit/sortable';

import { Sortable } from '../sortable';
import { GridContainer } from '../gridContainer';
import styles from './Container.module.css';
import { Wrapper } from '../wrapper';

export function Container() {
  const [items, setItems] = useState([ 1, nanoid() ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item !== id))
  }
  const addItem = () => {
    setItems([nanoid(), ...items])
  }

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
    />
  </Wrapper>
}
