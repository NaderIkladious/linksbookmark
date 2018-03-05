import React from 'react';
import Category from './Category';
import NewCategoryForm from './NewCategoryForm';
import './Categories.css';

export default class Categories extends React.Component {
  state = {
    categoryChosen: false
  };
  navigateToCategory = id => {
    this.setState({
      categoryChosen: true
    });
    // Natvigate with delay to add fade animation
    setTimeout(() => {
      this.props.history.push(`/category/${id}`);
    }, 500);
  };
  render() {
    return (
      <div className={this.state.categoryChosen ? 'row categories category-chosen' : 'row categories'}>
        {this.props.categories.map(category => (
          <Category
            key={category.id}
            id={category.id}
            categoryTitle={category.title}
            categoryIcon={category.icon}
            navigateToCategory={this.navigateToCategory}
          />
        ))}
        <div className="col-sm-3">
          <NewCategoryForm saveNewCat={this.props.createNewCategory} />
        </div>
      </div>
    );
  }
}
