import React from 'react';
import fire from '../../fire.js';
import './CategoryPage.css';
import Bookmark from '../bookmarks/bookmark';

export default class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      category: {},
      animateReady: false,
    };
  }
  componentDidMount() {
    const category = fire.database().ref().child('categories').child(this.props.match.params.id);
    category.on('value', (cat) => {
      this.setState({
        category: {
          id: this.props.match.params.id,
          title: cat.val().title,
          icon: cat.val().icon,
        },
        animateReady: true,
      });
    });
  }
  removeBookmark(bookmarkId) {
    fire.database().ref().child('bookmarks/'+bookmarkId).remove();
  }
  componentWillMount() {
    const bookmarks = fire.database().ref().child('bookmarks');
    let previousBookmarks = this.state.bookmarks;

    bookmarks
      .orderByChild('categoryId')
      .equalTo(this.props.match.params.id)
      .on('child_added', bookmark => {
        previousBookmarks.push({
          id: bookmark.key,
          title: bookmark.val().title,
          url: bookmark.val().url,
          favicon: bookmark.val().favicon
        })
        this.setState({
          bookmarks: previousBookmarks,
        });
      });
    bookmarks.on('child_removed', bookmark => {
      for (var i = 0; i < previousBookmarks.length; i++) {
        if (previousBookmarks[i].id === bookmark.key) {
          previousBookmarks.splice(i, 1);
        }
      }
      this.setState({
        bookmarks: previousBookmarks,
      })
    });
  }
  render() {
    return (
      <div className={this.state.animateReady ? "category-page animate" :"category-page"}>
        <div className="category-small">
          <div className="category-icon">
            <i className={this.state.category.icon + ' fa-10x'}></i>
          </div>
          <div className="category-title">
            <h5>{this.state.category.title}</h5>
          </div>
        </div>
        <div className="bookmarks">
          <table className="table table-hover">
            <tbody>
              {
                this.state.bookmarks.map(bookmark => {
                  return (
                    <Bookmark 
                      bookmark={bookmark}
                      removeBookmark={this.removeBookmark.bind(this)}
                    />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}