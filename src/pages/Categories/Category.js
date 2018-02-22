import React from 'react';
import {Link} from 'react-router-dom';

export default class Category extends React.Component {
  render() {
    return (
      <div className="col-sm-3" key={this.props.index}>
        <Link to={'/category/' + this.props.id}>
          <div className="card border-primary mb-3">
            <div className="card-body text-primary">
              <i className={this.props.categoryIcon + ' fa-10x'}></i>
              <h4 className="card-title">{this.props.categoryTitle}</h4>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}