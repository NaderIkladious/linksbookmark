import React from 'react';
import {Link} from 'react-router-dom';

export default class Category extends React.Component {
  handleNavigate(id) {
    this.props.navigateToCategory(id);
  }
  render() {
    return (
      <div className="col-sm-3" key={this.props.index}>
        <div className="card border-primary mb-3" onClick={this.handleNavigate.bind(this, this.props.id)}>
          <div className="card-body text-primary">
            <i className={this.props.categoryIcon + ' fa-10x'}></i>
            <h4 className="card-title">{this.props.categoryTitle}</h4>
          </div>
        </div>
      </div>
    )
  }
}