import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../Includes/Header';
import Categories from './Categories/Categories';
import Home from './Home/Home';
import fire from '../fire';
import CategoryPage from './Categories/CategoryPage';
import Search from './Search/Search';
import './App.css';

export default class App extends React.Component {
  componentWillMount() {
    const categoryRef = fire
      .database()
      .ref()
      .child('categories');
    const previousCategories = this.state.categories;

    // Listener when item added to store
    categoryRef.on('child_added', (snap, index) => {
      previousCategories.push({
        icon: snap.val().icon,
        title: snap.val().title,
        id: snap.key
      });
      this.setState({
        categories: previousCategories
      });
    });
    // Listener when item removed from store
    categoryRef.on('child_removed', (snap, index) => {
      for (var i = 0; i < previousCategories.length; i++) {
        if (previousCategories[i].id === snap.key) {
          previousCategories.splice(i, 1);
        }
      }
      this.setState({
        categories: previousCategories
      });
    });
  }
  // Initialize State
  state = {
    categories: [],
    searchTerm: ''
  };
  handleSearchTermChange = searchTerm => {
    this.setState({
      searchTerm
    });
  };
  createNewCategory = (catTitle, icon) => {
    const categoryRef = fire
      .database()
      .ref()
      .child('categories');

    categoryRef.push().set({
      icon: icon,
      title: catTitle
    });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header
              className="App-header"
              searchTerm={this.state.searchTerm}
              handleSearchTermChange={this.handleSearchTermChange}
            />
            <div className="container">
              <Switch>
                <Route exact path="/" render={props => <Home {...props} />} />
                <Route
                  path="/categories"
                  render={props => (
                    <Categories
                      {...props}
                      categories={this.state.categories}
                      createNewCategory={this.createNewCategory}
                    />
                  )}
                />
                <Route path="/category/:id" render={props => <CategoryPage {...props} />} />
                <Route path="/search" render={props => <Search {...props} />} />
                <Route
                  component={() => (
                    <h1 className="not-found">
                      <span>404</span>Page Not Found!
                    </h1>
                  )}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
