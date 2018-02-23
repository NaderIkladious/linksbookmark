import React from 'react';
import fire from '../fire.js';
import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      dropdownOpened: 'dropdown-menu',
      chosenCategory: false,
      newBookmarkUrl: '',
    }
    console.log(this);
  }
  handleSaving(e) {
    e.preventDefault();
    const bookmarksRef = fire.database().ref().child('bookmarks');
    const bookmarkUrl = this.state.newBookmarkUrl;
    const categoryId = this.state.chosenCategory.id
    let x = fetch('https://linkpreview.herokuapp.com/scrap', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: bookmarkUrl,
      })
    });
    x.then(res => res.json())
     .catch(error => console.error('Error:', error))
     .then(response => {
        bookmarksRef.push().set({
          categoryId: categoryId,
          url: bookmarkUrl,
          title: response[bookmarkUrl].title,
          favicon: response[bookmarkUrl].favicon,
        });
        this.showAlert(response[bookmarkUrl].title);
     });
    this.setState({
      dropdownOpened: 'dropdown-menu',
      chosenCategory: false,
      newBookmarkUrl: '',
    });
  }
  showAlert(title) {
    let note = document.createElement('div');
    note.className = 'alert alert-dismissible alert-success timed'
    note.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>Bookmark Saved "' + title + '".';
    document.body.append(note);
    setTimeout(() => {
      note.classList.add('alert-viewed');
    }, 0)
    setTimeout(() => {
      note.classList.remove('alert-viewed');
    }, 3000);
  }
  handleUrlChange(e) {
    const url = e.target.value;
    this.setState({
      newBookmarkUrl: url
    })
  }
  closeDropdown(e) {
    this.setState({
      dropdownOpened: 'dropdown-menu',
    })
  }
  openDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      dropdownOpened: "dropdown-menu opened",
    })
  }
  getCurrentCategory() {
    let chosenCategory = this.state.chosenCategory;
    return (
      <i className={chosenCategory.icon} key={chosenCategory.id}><span>{chosenCategory.title}</span></i>
    )
  }
  changeCurrentCategory(e) {
    e.preventDefault();
    e.stopPropagation();
    let id = e.target.getAttribute('catid');
    for (var i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].id === id) {
        this.setState({
          chosenCategory: this.state.categories[i],
          dropdownOpened: 'dropdown-menu',
        })
        break;
      }
    }
  }
  componentWillMount() {
    const availableCategories = fire.database().ref().child('categories');
    let previousCategories = this.state.categories;

    availableCategories.on('child_added', (category) => {
      previousCategories.push({
        id: category.key,
        icon: category.val().icon,
        title: category.val().title,
      });
      this.setState({
        categories: previousCategories,
      });
    })
  }
  render () {
    return (
      <div className="jumbotron" onClick={this.closeDropdown.bind(this)}>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-4"/>
        <div className="form-group">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Paste url here ..." aria-label="http://........" aria-describedby="basic-addon2" onChange={this.handleUrlChange.bind(this)}/>
            <div className="dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.openDropdown.bind(this)}>{this.state.chosenCategory ? this.getCurrentCategory() : 'Choose a category'}</a>
              <div className={this.state.dropdownOpened} x-placement="bottom-start">
                {
                  this.state.categories.map(cat => {
                    return (
                      <button className="dropdown-item" key={cat.id} catid={cat.id} onClick={this.changeCurrentCategory.bind(this)}>
                        <i className={cat.icon + ''}><span>{cat.title}</span></i>
                      </button>
                    )
                  })
                }
              </div>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleSaving.bind(this)}>Button</button>
            </div>
          </div>
        </div>
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/" role="button">Learn more</a>
        </p>
      </div>

    )
  }
}