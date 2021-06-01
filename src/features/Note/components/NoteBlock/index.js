import React from 'react';
import ContentEditable from 'react-contenteditable';
import setCaretToEnd from 'utils/setCaretToEnd';
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
    this.contentEditable = React.createRef();

    this.state = {
      html: '',
      tag: 'p',

      htmlBackup: null,
      previousKey: '',
      selectMenuIsOpen: false,
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

    document.addEventListener('click', this.closeSelectMenuHandler);
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

  render() {
    return (
      <div>
        {this.state.selectMenuIsOpen && (
          <div className='select-menu-modal'>
            <SelectMenu
              onSelection={this.tagSelectionHandler}
              oncloseMenu={this.closeSelectMenuHandler}
            />
          </div>
        )}

        <ContentEditable
          className='block'
          innerRef={this.contentEditable}
          html={this.state.html}
          tagName={this.state.tag}
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDownHandler}
          onKeyUp={this.onKeyUpHandler}
          data-position={this.props.position}
        />
      </div>
    );
  }
}

export default NoteBlock;
