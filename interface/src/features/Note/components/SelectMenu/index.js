import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './SelectMenu.scss';

const MENU_HEIGHT = 150;

const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Page Title',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Subheading',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
  },
  {
    id: 'image',
    tag: 'img',
    label: 'Image',
  },
];

const SelectMenu = ({ oncloseMenu, onSelection, position }) => {
  const [tagList, setTagList] = useState(allowedTags);
  const [selectedTag, setSelectedTag] = useState(null);

  // If the tag selector menu is display outside the top viewport,
  // we display it below the block
  const isMenuOutsideOfTopViewport = position.y - MENU_HEIGHT < 0;
  const y = !isMenuOutsideOfTopViewport
    ? position.y - MENU_HEIGHT
    : position.y + MENU_HEIGHT / 3;
  const x = position.x;

  // Attach listener to allow tag selection via keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSelection(tagList[selectedTag].tag);
      } else if (e.key === 'Tab' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === null || selectedTag === tagList.length - 1
            ? 0
            : selectedTag + 1;

        setSelectedTag(newSelectedTag);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === null || selectedTag === 0
            ? tagList.length - 1
            : selectedTag - 1;

        setSelectedTag(newSelectedTag);
      } else {
        oncloseMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tagList, selectedTag, onSelection, oncloseMenu]);

  return (
    <div
      className='select-menu'
      style={{
        top: y,
        left: x,
        justifyContent: !isMenuOutsideOfTopViewport ? 'flex-end' : 'flex-start',
      }}
    >
      <div className='select-menu-items'>
        {tagList.map((tagItem, index) => {
          return (
            <div
              key={index}
              data-tag={tagItem.tag}
              tabIndex='0'
              onClick={() => onSelection(tagItem.tag)}
              className={classNames('select-menu-tag', {
                selected: tagList.indexOf(tagItem) === selectedTag,
              })}
            >
              {tagItem.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectMenu;
