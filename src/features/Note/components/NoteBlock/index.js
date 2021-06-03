import classNames from 'classnames';
import Icons from 'constants/icons';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable from 'react-contenteditable';
import setCaretToEnd from 'utils/setCaretToEnd';
import ActionMenu from '../ActionMenu';
import SelectMenu from '../SelectMenu';
import './NoteBlock.scss';

class NoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.handleDragIconClick = this.handleDragIconClick.bind(this);
    this.calculateActionMenuPosition =
      this.calculateActionMenuPosition.bind(this);
    this.openActionMenu = this.openActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
    this.handleTurnIntoClick = this.handleTurnIntoClick.bind(this);

    this.contentEditable = React.createRef();

    this.state = {
      html: '',
      tag: 'p',

      htmlBackup: null,
      previousKey: '',

      selectMenuIsOpen: false,

      actionMenuIsOpen: false,
      actionMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prevProps, prevState) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;

    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeActionMenu);
  }

  onChangeHandler(e) {
    this.setState({ html: e.target.value });
  }

  onKeyDownHandler(e) {
    if (e.key === '/') {
      this.setState({ htmlBackup: this.state.html });
    }

    if (e.key === 'Enter') {
      if (this.state.previousKey !== 'Shift') {
        e.preventDefault();

        this.props.addBlock({
          id: this.props.id,
          ref: this.contentEditable.current,
        });
      }
    }

    this.setState({ previousKey: e.key });
  }

  onKeyUpHandler(e) {
    if (e.key === '/') {
      this.openSelectMenuHandler();
    }
  }

  openSelectMenuHandler() {
    this.setState({
      selectMenuIsOpen: true,
    });

    setTimeout(() => {
      document.addEventListener('click', this.closeSelectMenuHandler);
    }, 100);
  }

  closeSelectMenuHandler() {
    this.setState({
      htmlBackup: null,
      selectMenuIsOpen: false,
    });

    document.removeEventListener('click', this.closeSelectMenuHandler);
  }

  tagSelectionHandler(tag) {
    this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
      setCaretToEnd(this.contentEditable.current);
      this.closeSelectMenuHandler();
    });
  }

  calculateActionMenuPosition(parent) {
    const x = parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
    const y = parent.offsetTop - parent.scrollTop + parent.clientTop + 35;

    return { x, y };
  }

  openActionMenu(parent) {
    const { x, y } = this.calculateActionMenuPosition(parent);

    this.setState({
      ...this.state,
      actionMenuIsOpen: true,
      actionMenuPosition: { x: x, y: y },
    });

    // Add listener asynchronously to avoid conflicts with
    // the double click of the text selection
    setTimeout(() => {
      document.addEventListener('click', this.closeActionMenu, false);
    }, 100);
  }

  closeActionMenu() {
    this.setState({
      ...this.state,
      actionMenuIsOpen: false,
      actionMenuPosition: { x: null, y: null },
    });

    document.removeEventListener('click', this.closeActionMenu);
  }

  handleDragIconClick(e) {
    const dragHandle = e.target;
    this.openActionMenu(dragHandle);
  }

  handleTurnIntoClick = () => {
    this.setState({ htmlBackup: this.state.html });
    this.openSelectMenuHandler();
  };

  render() {
    return (
      <div className='note-block'>
        {this.state.selectMenuIsOpen && (
          <div className='select-menu-modal'>
            <SelectMenu
              onSelection={this.tagSelectionHandler}
              oncloseMenu={this.closeSelectMenuHandler}
            />
          </div>
        )}

        {this.state.actionMenuIsOpen && (
          <ActionMenu
            position={this.state.actionMenuPosition}
            deleteBlock={() => this.props.deleteBlock({ id: this.props.id })}
            openSelectMenu={this.handleTurnIntoClick}
          />
        )}

        <Draggable draggableId={this.props.id} index={this.props.position}>
          {(provided, snapshot) => (
            <div
              className={classNames('block', {
                isDragging: snapshot.isDragging,
              })}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <ContentEditable
                className='block-text'
                innerRef={this.contentEditable}
                html={this.state.html}
                tagName={this.state.tag}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
                onKeyUp={this.onKeyUpHandler}
                data-position={this.props.position}
              />

              <span
                className='block-icon'
                onClick={this.handleDragIconClick}
                {...provided.dragHandleProps}
              >
                <img src={Icons.DRAG_ICON} alt='drag-icon' />
              </span>
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}

export default NoteBlock;
