import React from 'react';
import './bookmark.css';

export default class Bookmark extends React.Component {
  constructor(props) {
    super(props);
  }
  removeBookmark(id) {
    this.props.removeBookmark(id);
  }
  render() {
    return (
      <tr className="table-active" key={this.props.bookmark.id}>
        <th scope="row"><img alt={this.props.bookmark.title} src={this.props.bookmark.favicon} /></th>
        <td><a href={this.props.bookmark.url} target="_blank">
          {this.props.bookmark.title || this.props.bookmark.url}
          <span>{this.props.bookmark.url}</span>
        </a></td>
        <td>
          <ul className="bookmark-options">
            <li><i className="fas fa-edit"></i></li>
            <li><i className="fas fa-times" onClick={this.removeBookmark.bind(this, this.props.bookmark.id)}></i></li>
          </ul>
        </td>
      </tr>
    )
  }
}