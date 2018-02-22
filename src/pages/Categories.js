import React from 'react';
import Category from './Categories/Category.js';
import NewCategoryForm from './Categories/NewCategoryForm.js';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formActive: false,
    }
  }
  render () {
    return (
      <div className="row categories">
        {
          this.props.categories.map((category) => {
            return (
              <Category
               id={category.id}
               categoryTitle={category.title}
               categoryIcon={category.icon}
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