import React from 'react';

export default class NewCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        'fas fa-code',
      ]
    }
  }
  cancelNewCat(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      formActive: false,
      chosenIcon: 'fas fa-bookmark',
      newCategoryTitle: '',
    });
  }
  showSelection(e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('change-box').style.display = "block";
  }
  enableForm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      formActive: true,
    })
  }
  changeTheIcon(e) {
    this.setState({
      chosenIcon: e.target.className
    });
    document.getElementById('change-box').style.display = "none";
  }
  categoryTitleChange(e) {
    this.setState({
      newCategoryTitle: e.target.value,
    })
  }
  saveNewCategory() {
    this.props.saveNewCat(this.state.newCategoryTitle, this.state.chosenIcon);
    this.setState({
      chosenIcon: 'fas fa-bookmark',
      newCategoryTitle: '',
    })
  }
  render() {
    return (
      <div className="card border-primary mb-3 js-add-category" onClick={this.enableForm.bind(this)}>
        <div className={this.state.formActive ? "card-body text-primary hidden" : "card-body text-primary"}>
          <i className="fas fa-plus-circle fa-10x add-cat"></i>
          <h4 className="card-title">Add Category</h4>
        </div>
        <div className={this.state.formActive ? "add-category-form" : "add-category-form hidden"}>
          <div>
            <i className={this.state.chosenIcon + ' fa-10x toggle-change'} onClick={this.showSelection.bind(this)}></i>
            <div id="change-box">
              {
                this.state.availableIcons.map((icon, index) => {
                  return (
                    <i className={icon} key={index} onClick={this.changeTheIcon.bind(this)}></i>
                  )
                })
              }
            </div>
          </div>
          <input onChange={this.categoryTitleChange.bind(this)} placeholder="Click To Edit"/>
          <button class="badge badge-pill badge-danger" onClick={this.cancelNewCat.bind(this)}>Cancel</button>
          <button class="badge badge-pill badge-success" onClick={this.saveNewCategory.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}