import React from 'react';
import './App.css';
import Header from './Header.js';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Categories from './pages/Categories.js';
import Home from './pages/Home.js';
import fire from './fire.js';
import CategoryPage from './pages/Categories/CategoryPage.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      bookmarks: [],
      categories: [],
    };
  }
  componentDidMount() {
    const bRef = fire.database().ref().child('bookmarks');
    bRef.on('value', snap => {
      this.setState({
        bookmarks: snap.val(),
      });
    });

    // bookmarksRef.on('value', snap => {
    //   console.log(snap);
    //   this.setState({
    //     bookmarks: snap.val(),
    //   });
    // });
  }
  componentWillMount() {
    const categoryRef = fire.database().ref().child('categories');
    const previousCategories = this.state.categories;

    categoryRef.on('child_added', (snap, index) => {
      previousCategories.push({
        icon: snap.val().icon,
        title: snap.val().title,
        id: snap.key,
      })
      this.setState({
        categories: previousCategories,
      });
    });

    categoryRef.on('child_removed', (snap, index) => {
      for (var i = 0; i < previousCategories.length; i++) {
        if (previousCategories[i].id === snap.key) {
          previousCategories.splice(i, 1);
        }
      }
      this.setState({
        categories: previousCategories,
      });
    });
  }
  createNewCategory(catTitle, icon) {
    const categoryRef = fire.database().ref().child('categories');

    categoryRef.push().set({
      icon: icon,
      title: catTitle,
    })
  }
  handleSavingBookmark() {
    // const rootRef = fire.database().ref().child('links-bookmark');
    // const bookmarksRef = rootRef.child('bookmarks');
    
    // currentBookmarks.push(this.state.url);
    // this.setState({
    //   bookmarks: currentBookmarks,
    // });
  }
  handleUrlChangeEvent(url) {
    this.setState({
      url,
    });
  }
  render() {
    return (
      <div className="App">
          <Router>
            <div>
              <Header className="App-header" />
              <div className="container">
                <Route exact path="/"  render={props => (
                  <Home
                    {...props}
                    changeUrl={this.handleUrlChangeEvent.bind(this)}
                    handleSave={this.handleSavingBookmark.bind(this)}
                  />
                )}/>
                <Route path="/categories" render= {props => (
                  <Categories 
                    {...props}
                    categories={this.state.categories}
                    createNewCategory={this.createNewCategory.bind(this)}
                  />
                )}/>
                <Route path="/category/:id" render= {props => (
                  <CategoryPage
                    {...props}
                  />
                )}/>
              </div>
            </div>
          </Router>
      </div>
    );
  }
}


