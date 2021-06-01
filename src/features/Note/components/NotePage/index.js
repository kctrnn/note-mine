import usePrevious from 'hooks/usePrevious';
import React, { useEffect, useState } from 'react';
import uid from 'utils/uid';
import NoteBlock from '../NoteBlock';
import './NotePage.scss';

const initBlocks = [
  { id: uid(), html: 'Welcome to kctrnn', tag: 'h1' },
  { id: uid(), html: 'I am <b>kctrnn</b>', tag: 'h2' },
  { id: uid(), html: '<i>Fucking coding</i>', tag: 'p' },
];

const NotePage = () => {
  const [blocks, setBlocks] = useState(initBlocks);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const prevBlocks = usePrevious(blocks);

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks?.length + 1 === blocks.length) {
      const nextBlockPosition =
        blocks.map((block) => block.id).indexOf(currentBlockId) + 1 + 1;

      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );

      if (nextBlock) {
        nextBlock.focus();
      }
    }

    // If a block was deleted, move the caret to the end of the last block
  }, [blocks, currentBlockId, prevBlocks]);

  const updatePageHandler = (updatedBlock) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.id === updatedBlock.id) {
        return {
          ...block,
          tag: updatedBlock.tag,
          html: updatedBlock.html,
        };
      }

      return block;
    });

    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);

    const newBlock = { id: uid(), html: '', tag: 'p' };
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);

    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);

    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock) => {
    const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];

    if (blocks.length === 1) {
      updatedBlocks.push({ id: uid(), html: '', tag: 'h1' });
    }

    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  return (
    <div className='note-page'>
      {blocks.map((block, index) => (
        <NoteBlock
          key={block.id}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
          position={index + 1}
        />
      ))}
    </div>
  );
};

NotePage.propTypes = {};

export default NotePage;
