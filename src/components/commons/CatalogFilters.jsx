import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as categoriesHelper from "../../helpers/categories";
import * as dksHelper from "../../helpers/dks";
import * as filtersActions from "../../store/filters/actions";

class CatalogFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      dks: [],
      selected: {
        category: undefined,
        dk: undefined
      }
    };
  }

  async componentDidMount() {
    this.setState({
      categories: await categoriesHelper.getCategories(),
      dks: await dksHelper.getDks()
    });
  }

  async onChangeCategory(categoryId) {
    await this.setState({
      selected: {
        ...this.state.selected,
        category: this.state.categories.find(category => +category.id === +categoryId)
      }
    });
    this.props.dispatch(filtersActions.setFilters(this.state.selected));
  }

  async onChangeDk(dkId) {
    await this.setState({
      selected: {
        ...this.state.selected,
        dk: this.state.dks.find(dk => +dk.id === +dkId)
      }
    });
    this.props.dispatch(filtersActions.setFilters(this.state.selected));
  }

  render() {
    return (
      <div className="p-3 shadow-sm">
        <h2 className="mb-3">Фільтри</h2>
        <Form.Group>
          <Form.Label>Категорії</Form.Label>
          <Form.Control as="select" onChange={event => this.onChangeCategory(event.target.value)}>
            <option value={undefined}>Категорія не обрана</option>
            {this.state.categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>ДК</Form.Label>
          <Form.Control as="select" onChange={event => this.onChangeDk(event.target.value)}>
            <option value={undefined}>ДК не обраний</option>
            {this.state.dks.map(dk => (
              <option value={dk.id} key={dk.id}>
                {`${dk.id} - ${dk.title}`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(CatalogFilters);
