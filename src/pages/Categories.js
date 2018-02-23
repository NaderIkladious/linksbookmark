import React from 'react';
import Category from './Categories/Category.js';
import NewCategoryForm from './Categories/NewCategoryForm.js';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formActive: false,
      categoryChosen: false,
    }
  }
  navigateToCategory(id) {
    this.setState({
      categoryChosen: true,
    })
    setTimeout(() => {
      this.props.history.push('/category/' + id);
    }, 500);
  }
  render () {
    return (
      <div className={this.state.categoryChosen ? "row categories category-chosen" : "row categories"}>
        {
          this.props.categories.map((category) => {
            return (
              <Category
               key={category.id}
               id={category.id}
               categoryTitle={category.title}
               categoryIcon={category.icon}
               navigateToCategory={this.navigateToCategory.bind(this)}
              />
            )}
          )
        }
        <div className="col-sm-3">
          <NewCategoryForm 
            saveNewCat={this.props.createNewCategory.bind(this)} />
        </div>
      </div>
    );   
  }
}