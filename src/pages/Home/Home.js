import React from 'react';
import fire from '../../fire';
import './Home.css';

export default class Home extends React.Component {
  componentWillMount() {
    const availableCategories = fire
      .database()
      .ref()
      .child('categories');
    let previousCategories = this.state.categories;

    // Listener wheهn item added to store
    availableCategories.on('child_added', category => {
      previousCategories.push({
        id: category.key,
        icon: category.val().icon,
        title: category.val().title
      });
      this.setState({
        categories: previousCategories
      });
    });
  }
  // Initialize State
  state = {
    categories: [],
    dropdownOpened: 'dropdown-menu',
    chosenCategory: false,
    newBookmarkUrl: ''
  };
  isValidUrl = url => {
    let regx = new RegExp(
      /(((http|ftp|https):\/{2})+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z#+%@./_-]+))?(\?[0-9a-zA-Z+%@/&[\];=_-]+)?)?))\b/
    );
    return regx.exec(url);
  };
  handleSaving = event => {
    event.preventDefault();
    const bookmarksRef = fire
      .database()
      .ref()
      .child('bookmarks');
    const bookmarkUrl = this.state.newBookmarkUrl;
    if (!this.isValidUrl(bookmarkUrl)) {
      this.showAlert(bookmarkUrl, 'danger');
      return;
    }
    const categoryId = this.state.chosenCategory.id;
    // Call API Endpoint to get link metadata
    let x = fetch('https://linkpreview.herokuapp.com/scrap', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: bookmarkUrl
      })
    });
    x
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        // Add New Bookmark with the data recived from scrapping
        bookmarksRef.push().set({
          categoryId: categoryId,
          url: bookmarkUrl,
          title: response[bookmarkUrl].title,
          favicon: response[bookmarkUrl].favicon
        });
        // Show message that bookmark was added successfully
        this.showAlert(response[bookmarkUrl].title);
      });
    // Reset State
    this.setState({
      dropdownOpened: 'dropdown-menu',
      chosenCategory: false,
      newBookmarkUrl: ''
    });
  };
  showAlert = (title, type = 'success') => {
    let note = document.createElement('div');
    note.className = `alert alert-dismissible alert-${type} timed`;
    if (type === 'success') {
      note.innerHTML = `
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Bookmark Saved "${title}".`;
    } else {
      note.innerHTML = `
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Please use a valid URL, "${title}".`;
    }
    document.body.append(note);
    setTimeout(() => {
      note.classList.add('alert-viewed');
    }, 0);
    setTimeout(() => {
      note.classList.remove('alert-viewed');
    }, 3000);
  };
  handleUrlChange = event => {
    const url = event.target.value;
    this.setState({
      newBookmarkUrl: url
    });
  };
  closeDropdown = event => {
    this.setState({
      dropdownOpened: 'dropdown-menu'
    });
  };
  openDropdown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dropdownOpened: 'dropdown-menu opened'
    });
  };
  getCurrentCategory() {
    let { chosenCategory } = this.state;
    return (
      <i className={chosenCategory.icon} key={chosenCategory.id}>
        <span>{chosenCategory.title}</span>
      </i>
    );
  }
  changeCurrentCategory = event => {
    event.preventDefault();
    event.stopPropagation();
    let id = event.target.getAttribute('catid');
    for (var i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].id === id) {
        this.setState({
          chosenCategory: this.state.categories[i],
          dropdownOpened: 'dropdown-menu'
        });
        break;
      }
    }
  };
  render() {
    return (
      <div className="jumbotron" onClick={this.closeDropdown}>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content
          or information.
        </p>
        <hr className="my-4" />
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Paste url here ..."
              aria-label="http://........"
              aria-describedby="basic-addon2"
              onChange={this.handleUrlChange}
            />
            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.openDropdown}
              >
                {this.state.chosenCategory ? this.getCurrentCategory() : 'Choose a category'}
              </a>
              <div className={this.state.dropdownOpened} x-placement="bottom-start">
                {this.state.categories.map(cat => (
                  <button className="dropdown-item" key={cat.id} catid={cat.id} onClick={this.changeCurrentCategory}>
                    <i className={`${cat.icon} `}>
                      <span>{cat.title}</span>
                    </i>
                  </button>
                ))}
              </div>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleSaving}>
                Save
              </button>
            </div>
          </div>
        </div>
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/" role="button">
            Learn more
          </a>
        </p>
      </div>
    );
  }
}
