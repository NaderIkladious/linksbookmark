import React from 'react';
import './bookmark.css';
import fire from '../../fire';

export default class Bookmark extends React.Component {
  state = {
    editMode: false,
    editValue: this.props.bookmark.title
  };
  removeBookmark = id => {
    this.props.removeBookmark(id);
  };
  enableEditing = () => {
    if (this.state.editMode) {
      const editedBookmark = Object.assign({}, this.props.bookmark, { title: this.state.editValue });
      Reflect.deleteProperty(editedBookmark, 'id');
      fire
        .database()
        .ref()
        .child(`/bookmarks/${this.props.bookmark.id}`)
        .set(editedBookmark);
      this.setState({
        editMode: false
      });
    } else {
      this.setState({
        editMode: true
      });
    }
  };
  changeTitle = event => {
    const title = event.target.value;
    this.setState({
      editValue: title
    });
  };
  returnAppropriateTitle() {
    if (this.state.editMode) {
      return (
        <div className="title-edit">
          <input value={this.state.editValue} onChange={this.changeTitle} type="text" />{' '}
          <span>{this.props.bookmark.url}</span>
        </div>
      );
    } else {
      return (
        <a href={this.props.bookmark.url} target="_blank">
          {this.props.bookmark.title || this.props.bookmark.url}
          <span>{this.props.bookmark.url}</span>
        </a>
      );
    }
  }
  render() {
    return (
      <tr className="table-active" key={this.props.bookmark.id}>
        <th scope="row">
          <img alt={this.props.bookmark.title} src={this.props.bookmark.favicon} />
        </th>
        <td>{this.returnAppropriateTitle()}</td>
        <td>
          <ul className="bookmark-options">
            <li>
              <i className={this.state.editMode ? 'fas fa-check-circle' : 'fas fa-edit'} onClick={this.enableEditing} />
            </li>
            <li>
              <i className="fas fa-times" onClick={() => this.removeBookmark(this.props.bookmark.id)} />
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}
