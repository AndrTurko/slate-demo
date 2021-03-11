import React, { useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

export function SlateEditor({ id, text, updateText }) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={text} onChange={value => updateText(id, value)}>
      <Editable placeholder="Enter some plain text..." />
    </Slate>
  )
}
