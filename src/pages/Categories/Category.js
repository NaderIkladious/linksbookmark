import React from 'react';
import './Category.css';

export default class Category extends React.Component {
  handleNavigate = id => {
    this.props.navigateToCategory(id);
  };
  render() {
    return (
      <div className="col-sm-3">
        <div className="card border-primary mb-3" onClick={() => this.handleNavigate(this.props.id)}>
          <div className="card-body text-primary">
            <i className={`${this.props.categoryIcon} fa-10x`} />
            <h4 className="card-title">{this.props.categoryTitle}</h4>
          </div>
        </div>
      </div>
    );
  }
}
