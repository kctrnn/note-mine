import blockApi from 'api/blockApi';
import usePrevious from 'hooks/usePrevious';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import setCaretToEnd from 'utils/setCaretToEnd';
import uid from 'utils/uid';
import NoteBlock from '../../components/NoteBlock';
import './EditPage.scss';

const EditPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentBlockId, setCurrentBlockId] = useState(null);

  const { pageId } = useParams();
  const pid = 5;
  const userId = 2;

  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    const fetchBlockList = async (pageId) => {
      try {
        const response = await blockApi.getByPageId(pageId);
        setBlocks(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlockList(pageId);
  }, [pageId]);

  useEffect(() => {
    if (blocks !== prevBlocks) {
    }
  }, [blocks, prevBlocks]);

  const handleSaveClick = () => {
    const blockIds = blocks.map((block) => block.blockId);

    const fetchBlockList = async (pageId) => {
      try {
        const response = await blockApi.getByPageId(pageId);
        const proBlocks = [...response];
        proBlocks.forEach((block) => {
          const position = blockIds.findIndex((id) => id === block.blockId) + 1;

          blockApi.update(block.id, {
            ...block,
            position: `${position}${pageId}`,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlockList(pageId);
  };

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks?.length + 1 === blocks.length) {
      const nextBlockPosition =
        blocks.map((block) => block.blockId).indexOf(currentBlockId) + 1 + 1;

      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );

      if (nextBlock) {
        nextBlock.focus();
      }
    }

    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks?.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks
        .map((block) => block.blockId)
        .indexOf(currentBlockId);

      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      );

      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, currentBlockId, prevBlocks]);

  const updateBlockHandler = async (currentBlock) => {
    const index = blocks.map((b) => b.blockId).indexOf(currentBlock.id);
    // const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];

    updatedBlocks[index] = {
      ...updatedBlocks[index],

      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };

    setBlocks(updatedBlocks);

    // const idBlock = blocks.find(
    //   (block) => block.blockId === currentBlock.id
    // )?.id;

    // if (idBlock) {
    //   blockApi.update(idBlock, {
    //     ...updatedBlocks[index],
    //   });
    // }
  };

  const addBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b.blockId).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = {
      blockId: uid(),
      tag: 'p',
      html: '',
      imageUrl: '',
      page: pid,
      creator: userId,
    };

    blockApi.add(newBlock);

    updatedBlocks.splice(index + 1, 0, newBlock);

    updatedBlocks[index] = {
      ...updatedBlocks[index],

      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };

    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);

    const index = blocks.map((block) => block.blockId).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];

    if (blocks.length === 1) {
      updatedBlocks.push({
        blockId: uid(),
        tag: 'h1',
        html: '',
        imageUrl: '',
        page: pid,
        creator: userId,
      });
    }

    const idBlock = blocks.find(
      (block) => block.blockId === currentBlock.id
    ).id;
    blockApi.delete(idBlock);

    updatedBlocks.splice(index, 1);

    setBlocks(updatedBlocks);
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);

    setBlocks(updatedBlocks);
  };

  return (
    <div className='note-edit'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={pageId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='note-page'
            >
              {blocks.map((block) => {
                const position =
                  blocks.map((block) => block.blockId).indexOf(block.blockId) +
                  1;

                return (
                  <NoteBlock
                    key={block.blockId}
                    id={block.blockId}
                    position={position}
                    tag={block.tag}
                    html={block.html}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    updateBlock={updateBlockHandler}
                  />
                );
              })}

              {provided.placeholder}

              <button onClick={handleSaveClick}>Save</button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

EditPage.propTypes = {
  pageId: PropTypes.string,
};

EditPage.defaultProps = {
  pageId: '',
};

export default EditPage;
