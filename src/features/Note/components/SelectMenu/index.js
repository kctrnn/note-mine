import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './SelectMenu.scss';

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

const SelectMenu = ({ oncloseMenu, onSelection }) => {
  const [tagList, setTagList] = useState(allowedTags);
  const [selectedTag, setSelectedTag] = useState(null);

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
    <div className='select-menu'>
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
