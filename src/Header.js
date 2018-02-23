import React from 'react';
import { NavLink } from 'react-router-dom';
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Sketchy Bookmark</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={ this.state.collapsed ? "collapse navbar-collapse" : "collapse navbar-collapse show" }  id="navbarColor03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" activeClassName="active" to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to='/categories'>Bookmarks</NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}