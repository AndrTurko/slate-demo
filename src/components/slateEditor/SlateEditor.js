import React, { useState, useMemo } from 'react'
import { Node, createEditor } from 'slate'
import { Slate, Editable, withReact, useFocused } from 'slate-react'
import { withHistory } from 'slate-history'

const initialValue = [
  {
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
]

export function SlateEditor({ id, text, updateText }) {
  const [value, setValue] = useState(text)
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const focused = useFocused();
  console.log('focused', focused);
  // console.log('editor', editor);
  // console.log('value', value);

  console.log("id ", id);

  return (
    <Slate key={id} id={id} editor={editor} value={text} onChange={value => {
      console.log('Slate onChange value', value, editor);
      // setValue(value)
      if(value !== text) {
        updateText(id, value)
      }
      }}

      >
      <Editable placeholder="Enter some plain text..." />
    </Slate>
  )
}
