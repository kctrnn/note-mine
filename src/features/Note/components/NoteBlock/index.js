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
    this.handleBlur = this.handleBlur.bind(this);

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

      isTyping: false,
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      html: this.props.html,
      tag: this.props.tag,
      imageUrl: this.props.imageUrl,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // update the page on the server if one of the following is true
    // 1. user stopped typing and the html content has changed & no placeholder set
    // 2. user changed the tag & no placeholder set
    // 3. user changed the image & no placeholder set
    const stoppedTyping = prevState.isTyping && !this.state.isTyping;
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    const imageChanged = this.props.imageUrl !== this.state.imageUrl;

    if ((stoppedTyping && htmlChanged) || tagChanged || imageChanged) {
      this.props.updateBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeActionMenu);
  }

  onChangeHandler(e) {
    this.setState({ ...this.state, html: e.target.value });
  }

  handleBlur(e) {
    this.setState({ ...this.state, isTyping: false });
  }

  onKeyDownHandler(e) {
    if (e.key === '/') {
      this.setState({ htmlBackup: this.state.html });
    }

    if (
      e.key === 'Enter' &&
      this.state.previousKey !== 'Shift' &&
      !this.state.selectMenuIsOpen
    ) {
      e.preventDefault();

      this.props.addBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
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

        {this.props.position === 1 && (
          <ContentEditable
            className='block-text title'
            innerRef={this.contentEditable}
            html={this.state.html}
            tagName={this.state.tag}
            onChange={this.onChangeHandler}
            // onKeyDown={this.onKeyDownHandler}
            // onKeyUp={this.onKeyUpHandler}
            data-position={this.props.position}
          />
        )}

        {this.props.position !== 1 && (
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
                  onBlur={this.handleBlur}
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
        )}
      </div>
    );
  }
}

export default NoteBlock;
