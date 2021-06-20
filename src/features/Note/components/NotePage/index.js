import { Button, makeStyles } from '@material-ui/core';
import blockApi from 'api/blockApi';
import usePrevious from 'hooks/usePrevious';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import setCaretToEnd from 'utils/setCaretToEnd';
import uid from 'utils/uid';
import NoteBlock from '../NoteBlock';
import './NotePage.scss';

const useStyles = makeStyles(() => ({
  saveBtn: {
    alignSelf: 'flex-end',
    marginTop: '5rem',
    fontSize: '1.4rem',
    fontFamily: `'Poppins', sans-serif`,
    textTransform: 'none',
  },
}));

const NotePage = ({ pageId }) => {
  const [blocks, setBlocks] = useState([]);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const [isSave, setIsSave] = useState(false);

  const userCurrent = useSelector((state) => state.user.current);
  const userId = userCurrent.id;
  const { pages } = userCurrent;
  const pid = pages.find((page) => page.pageId === pageId).id;

  const prevBlocks = usePrevious(blocks);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // fetch blocks by pageId
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

  const handleSaveClick = () => {
    setIsSave((x) => !x);
    const blockIds = blocks.map((block) => block.blockId);

    const fetchBlockList = async (pageId) => {
      try {
        const response = await blockApi.getByPageId(pageId);
        const proBlocks = [...response];

        proBlocks.forEach((block) => {
          const position = blockIds.findIndex((id) => id === block.blockId) + 1;

          blockApi.update(block.id, {
            // ...block,
            position: `${position}${pageId}`,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlockList(pageId);

    enqueueSnackbar('Save successfully 🥰🥰', {
      variant: 'info',
    });
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
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];

    updatedBlocks[index] = {
      ...updatedBlocks[index],

      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };

    const idBlock = blocks.find(
      (block) => block.blockId === currentBlock.id
    ).id;

    blockApi.update(idBlock, {
      ...updatedBlocks[index],
    });

    setBlocks(updatedBlocks);

    if (oldBlock.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
      deleteImageOnServer(oldBlock.imageUrl);
    }
  };

  const addBlockHandler = async (currentBlock) => {
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

    const newProBlock = await blockApi.add(newBlock);
    updatedBlocks.splice(index + 1, 0, newProBlock);

    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);

    const index = blocks.map((block) => block.blockId).indexOf(currentBlock.id);
    const deletedBlock = blocks[index];
    const updatedBlocks = [...blocks];

    const idBlock = blocks.find(
      (block) => block.blockId === currentBlock.id
    ).id;

    updatedBlocks.splice(index, 1);

    setBlocks(updatedBlocks);
    if (deletedBlock.tag === 'img' && deletedBlock.imageUrl) {
      deleteImageOnServer(deletedBlock.imageUrl);
    }

    blockApi.delete(idBlock);
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

  const deleteImageOnServer = async (imageUrl) => {
    try {
      const url = imageUrl.replace('small_', '');
      const res = await blockApi.getImages({
        url: url,
      });
      const { id } = res[0];

      if (id) {
        await blockApi.deleteImage(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='note-page'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={pageId}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block) => {
                const position =
                  blocks.map((block) => block.blockId).indexOf(block.blockId) +
                  1;

                return (
                  <NoteBlock
                    key={block.blockId}
                    position={position}
                    id={block.blockId}
                    tag={block.tag}
                    html={block.html}
                    imageUrl={block.imageUrl}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    updateBlock={updateBlockHandler}
                    isSave={isSave}
                  />
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        variant='contained'
        color='primary'
        className={classes.saveBtn}
        onClick={handleSaveClick}
        disableElevation
      >
        Save
      </Button>
    </div>
  );
};

NotePage.propTypes = {
  pageId: PropTypes.string,
};

NotePage.defaultProps = {
  pageId: '',
};

export default NotePage;
