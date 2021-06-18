import blockApi from 'api/blockApi';
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

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);

    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.handleDragIconClick = this.handleDragIconClick.bind(this);
    this.handleTurnIntoClick = this.handleTurnIntoClick.bind(this);

    this.openActionMenu = this.openActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);

    this.calculateActionMenuPosition =
      this.calculateActionMenuPosition.bind(this);
    this.calculateSelectMenuPosition =
      this.calculateSelectMenuPosition.bind(this);

    this.handleImageUpload = this.handleImageUpload.bind(this);

    this.contentEditable = React.createRef();
    this.fileInput = null;

    this.state = {
      html: '',
      tag: 'p',
      imageUrl: '',

      htmlBackup: null,
      previousKey: '',

      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      },

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
      html: this.props.html,
      tag: this.props.tag,
      imageUrl: this.props.imageUrl,
    });
  }

  componentDidUpdate(prevProps, prevState) {
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
    this.setState({ html: e.target.value });
  }

  handleFocus() {
    this.setState({ isTyping: true });
  }

  handleBlur() {
    this.setState({ isTyping: false });
  }

  onKeyDownHandler(e) {
    if (
      e.key === 'Enter' &&
      this.state.previousKey !== 'Shift' &&
      !this.state.selectMenuIsOpen
    ) {
      e.preventDefault();

      this.props.addBlock({
        id: this.props.id,

        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        ref: this.contentEditable.current,
      });
    }

    this.setState({ previousKey: e.key });
  }

  handleDragIconClick(e) {
    const dragHandle = e.target;
    this.openActionMenu(dragHandle);
  }

  openActionMenu(parent) {
    const { x, y } = this.calculateActionMenuPosition(parent);

    this.setState({
      actionMenuIsOpen: true,
      actionMenuPosition: { x: x, y: y },
    });

    setTimeout(() => {
      document.addEventListener('click', this.closeActionMenu, false);
    }, 100);
  }

  closeActionMenu() {
    this.setState({
      actionMenuIsOpen: false,
      actionMenuPosition: { x: null, y: null },
    });

    document.removeEventListener('click', this.closeActionMenu);
  }

  openSelectMenuHandler() {
    const { x, y } = this.calculateSelectMenuPosition();

    this.setState({
      selectMenuPosition: { x, y },
      selectMenuIsOpen: true,

      htmlBackup: this.state.html,
    });

    setTimeout(() => {
      document.addEventListener('click', this.closeSelectMenuHandler);
    }, 100);

    // document.addEventListener('click', this.closeSelectMenuHandler);
  }

  closeSelectMenuHandler() {
    this.setState({
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null },

      htmlBackup: null,
    });

    document.removeEventListener('click', this.closeSelectMenuHandler);
  }

  tagSelectionHandler(tag) {
    if (tag === 'img') {
      this.setState({ tag: tag }, () => {
        this.closeSelectMenuHandler();

        if (this.fileInput) {
          // Open the native file picker
          this.fileInput.click();
        }
        // Add new block so that the user can continue writing
        // after adding an image
        this.props.addBlock({
          id: this.props.id,

          html: '',
          tag: 'p',
          imageUrl: '',
          ref: this.contentEditable.current,
        });
      });
    } else {
      this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
        setCaretToEnd(this.contentEditable.current);
        this.closeSelectMenuHandler();
      });
    }
  }

  calculateActionMenuPosition(parent) {
    const x = parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
    const y = parent.offsetTop - parent.scrollTop + parent.clientTop + 35;

    return { x, y };
  }

  calculateSelectMenuPosition() {
    const { x: actionX, y: actionY } = this.state.actionMenuPosition;
    return { x: actionX - 40, y: actionY };
  }

  handleTurnIntoClick = () => {
    this.openSelectMenuHandler();
  };

  async handleImageUpload() {
    if (this.fileInput && this.fileInput.files[0]) {
      const imageFile = this.fileInput.files[0];

      const formData = new FormData();
      formData.append('files', imageFile);

      try {
        const response = await blockApi.uploadImage(formData);
        const { url } = response[0].formats.small;

        this.setState({ imageUrl: url });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <div className='note-block'>
        {this.state.selectMenuIsOpen && (
          <SelectMenu
            position={this.state.selectMenuPosition}
            onSelection={this.tagSelectionHandler}
            oncloseMenu={this.closeSelectMenuHandler}
          />
        )}

        {this.state.actionMenuIsOpen && (
          <ActionMenu
            position={this.state.actionMenuPosition}
            deleteBlock={() => this.props.deleteBlock({ id: this.props.id })}
            openSelectMenu={this.handleTurnIntoClick}
          />
        )}

        {this.props.position === 1 && this.state.tag !== 'img' && (
          <ContentEditable
            className='block-text title'
            innerRef={this.contentEditable}
            html={this.state.html}
            tagName={this.state.tag}
            onChange={this.onChangeHandler}
            // onKeyDown={this.onKeyDownHandler}
            data-position={this.props.position}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
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
                {this.state.tag !== 'img' && (
                  <ContentEditable
                    className='block-text'
                    innerRef={this.contentEditable}
                    html={this.state.html}
                    tagName={this.state.tag}
                    onChange={this.onChangeHandler}
                    onKeyDown={this.onKeyDownHandler}
                    data-position={this.props.position}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                  />
                )}

                {this.state.tag === 'img' && (
                  <div
                    className='block-image'
                    data-position={this.props.position}
                    data-tag={this.state.tag}
                    ref={this.contentEditable}
                  >
                    <input
                      id={`${this.props.id}_fileInput`}
                      name={this.state.tag}
                      type='file'
                      onChange={this.handleImageUpload}
                      ref={(ref) => (this.fileInput = ref)}
                      hidden
                    />

                    {!this.state.imageUrl && (
                      <label htmlFor={`${this.props.id}_fileInput`}>
                        No Image Selected. Click To Select
                      </label>
                    )}

                    {this.state.imageUrl && (
                      <img
                        src={
                          process.env.REACT_APP_API_URL + this.state.imageUrl
                        }
                        alt=''
                      />
                    )}
                  </div>
                )}

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
