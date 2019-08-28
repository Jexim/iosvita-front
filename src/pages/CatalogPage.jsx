import React, { Component } from "react";
import { Row, Col, Card, Button, Modal, Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import CatalogFilters from "../components/commons/CatalogFilters";
import MainHeader from "../components/commons/MainHeader";
import * as basketActions from "../store/basket/actions";
import * as productsHelper from "../helpers/products";
import * as purchasesHelper from "../helpers/purchases";

class CatalogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      count: 0,
      selected: null
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters !== this.props.filters && this.props.filters) {
      this.fetchProducts();
    }
  }

  async fetchProducts() {
    let filters = {};

    if (this.props.filters) {
      if (this.props.filters["category"]) filters["CategoryId"] = this.props.filters["category"].id;
      if (this.props.filters["dk"]) filters["DkId"] = this.props.filters["dk"].id;
    }

    const productsInfo = await productsHelper.getProducts({ filters });

    this.setState({
      products: productsInfo.rows,
      count: productsInfo.count
    });
  }

  selectProduct(product) {
    this.setState({
      selected: product
    });
  }

  closeSelected() {
    this.setState({ selected: null });
  }

  async addProductToBasket(product) {
    await this.props.dispatch(basketActions.addSelectedProduct(product, 1));
    this.setState({ selected: null });
  }

  async createPrchase() {
    try {
      const purchase = await purchasesHelper.createPurchase(
        this.props.selectedProducts.map(selectedProduct => ({
          id: selectedProduct.product.id,
          count: selectedProduct.count
        }))
      );

      alert(`Ваш номер замовлення  ${purchase.id}`);
      this.props.dispatch(basketActions.clearAll());
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  render() {
    return (
      <div>
        <MainHeader />
        <Container style={{ maxWidth: "100%" }}>
          <Row>
            <Col xs={3}>
              <CatalogFilters />
            </Col>
            <Col xs={6}>
              <h2 className="mt-3">Каталог</h2>
              {!!this.props.filters && (
                <div>{Object.keys(this.props.filters).map(filterKey => this.props.filters[filterKey] && <div key={this.props.filters[filterKey].id}>{this.props.filters[filterKey].title}</div>)}</div>
              )}
              <div className="d-flex flex-row">
                {this.state.products.map(product => (
                  <Card style={{ width: "18rem" }} key={product.id} className="m-3">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title style={{ maxHeight: 70, overflow: "hidden" }}>{product.title}</Card.Title>
                      <Card.Text style={{ maxHeight: 200, overflow: "hidden" }}>{product.description}</Card.Text>
                      <Button variant="primary" onClick={() => this.selectProduct(product)}>
                        Деталі
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
                {!this.state.products.length && <h1>Товарів за данними фільтрами не знайдено</h1>}
              </div>
            </Col>
            {!!this.props.selectedProducts && !!this.props.selectedProducts.length && (
              <Col xs={3}>
                <h2 className="mt-3">Замовлення</h2>
                {this.props.selectedProducts.map((selectedProduct, index) => (
                  <div key={index} className="shadow-sm p-3 rounded">
                    <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{selectedProduct.product.title}</div>
                    <div>
                      {selectedProduct.count} x {selectedProduct.product.price} = {selectedProduct.count * selectedProduct.product.price} грн.
                    </div>
                    <div></div>
                  </div>
                ))}
                <Button onClick={() => this.createPrchase()} style={{ width: "100%" }} className="mt-3">
                  Оформити замовлення
                </Button>
              </Col>
            )}
          </Row>
        </Container>
        {!!this.state.selected && (
          <Modal show={!!this.state.selected} onHide={() => this.closeSelected()}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selected.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={this.state.selected.image} style={{ maxWidth: "100%" }} />
              {!this.props.token && <h5>Зареэструйтесь або ввійдіть в свій аккаунт для замовлення</h5>}
              <p className="mt-3">{this.state.selected.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.closeSelected()}>
                Закрити
              </Button>
              {!!this.props.token && (
                <Button variant="primary" onClick={() => this.addProductToBasket(this.state.selected)}>
                  Замовити
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    filters: state.filters.filters,
    selectedProducts: state.basket.selectedProducts,
    token: state.auth.token
  };
}

export default connect(mapStateToProps)(CatalogPage);
