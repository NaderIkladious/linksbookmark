import React from 'react';
import './NewCategoryForm.css';

export default class NewCategoryForm extends React.Component {
  state = {
    formActive: false,
    chosenIcon: 'fas fa-bookmark',
    newCategoryTitle: '',
    availableIcons: [
      'fas fa-bookmark',
      'fas fa-archive',
      'far fa-arrow-alt-circle-up',
      'far fa-arrow-alt-circle-down',
      'fas fa-basketball-ball',
      'far fa-bell',
      'fab fa-blogger',
      'fas fa-book',
      'fas fa-bullhorn',
      'fas fa-camera',
      'fas fa-chart-bar',
      'fas fa-chart-line',
      'fas fa-certificate',
      'fas fa-check',
      'fas fa-chess',
      'far fa-check-circle',
      'fas fa-cloud',
      'fas fa-comment-alt',
      'far fa-credit-card',
      'fas fa-cut',
      'fas fa-database',
      'fas fa-envelope',
      'fas fa-exclamation-circle',
      'fas fa-gamepad',
      'fas fa-frown',
      'fas fa-heart',
      'fab fa-itunes-note',
      'fas fa-paper-plane',
      'fas fa-quote-left',
      'fas fa-trash-alt',
      'fab fa-youtube',
      'fas fa-code'
    ]
  };
  cancelNewCat = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      formActive: false,
      chosenIcon: 'fas fa-bookmark',
      newCategoryTitle: ''
    });
  };
  showSelection = event => {
    event.stopPropagation();
    event.preventDefault();
    document.getElementById('change-box').style.display = 'block';
  };
  enableForm = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      formActive: true
    });
  };
  changeTheIcon = event => {
    this.setState({
      chosenIcon: event.target.className
    });
    document.getElementById('change-box').style.display = 'none';
  };
  categoryTitleChange = event => {
    this.setState({
      newCategoryTitle: event.target.value
    });
  };
  saveNewCategory() {
    this.props.saveNewCat(this.state.newCategoryTitle, this.state.chosenIcon);
    this.setState({
      chosenIcon: 'fas fa-bookmark',
      newCategoryTitle: ''
    });
  }
  render() {
    return (
      <div className="card border-primary mb-3 js-add-category" onClick={this.enableForm}>
        <div className={this.state.formActive ? 'card-body text-primary hidden' : 'card-body text-primary'}>
          <i className="fas fa-plus-circle fa-10x add-cat" />
          <h4 className="card-title">Add Category</h4>
        </div>
        <div className={this.state.formActive ? 'add-category-form' : 'add-category-form hidden'}>
          <div>
            <i className={`${this.state.chosenIcon} fa-10x toggle-change`} onClick={this.showSelection} />
            <div id="change-box">
              {this.state.availableIcons.map((icon, index) => (
                <i className={icon} key={icon} onClick={this.changeTheIcon} />
              ))}
            </div>
          </div>
          <input onChange={this.categoryTitleChange} placeholder="Click To Edit" />
          <button className="badge badge-pill badge-danger" onClick={this.cancelNewCat}>
            Cancel
          </button>
          <button className="badge badge-pill badge-success" onClick={this.saveNewCategory}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
