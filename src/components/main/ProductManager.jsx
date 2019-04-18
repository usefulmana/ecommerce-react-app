import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Header from "../secondary/Header";
import Navbar from "../secondary/NavBar";
import Footer from "../secondary/Footer";
import UpButton from "../secondary/UpButton";
import { Link } from "react-router-dom";
import Paginate from "./../secondary/Paginate";
const url = "http://rmit.chickenkiller.com:8080/products";

// TODO IMPLEMENT PAGINATION
export default class ProductManager extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      id: "",
      name: "",
      brand: "",
      price: "",
      producer: "",
      imageUrl: "",
      productType: "",
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }
  fetchProduct() {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let data = json.filter(d => d._id !== "");
        this.setState({ product: data });
      });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems, state: this.state });
  }
  componentDidMount() {
    this.fetchProduct();
  }

  handleChange(e) {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleAdd() {
    if (this.state.id == "") {
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({
          name: this.state.name,
          brand: this.state.brand,
          price: this.state.price,
          producer: this.state.producer,
          imageUrl: this.state.imageUrl,
          description: this.state.description,
          productType: this.state.productType
        })
      }).then(res => this.fetchProduct());
    } else {
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "put",
        body: JSON.stringify({
          _id: this.state.id,
          name: this.state.name,
          brand: this.state.brand,
          price: this.state.price,
          producer: this.state.producer,
          imageUrl: this.state.imageUrl,
          description: this.state.description,
          productType: this.state.productType
        })
      }).then(res => {
        console.log(res);
        this.fetchProduct();
      });
    }
  }

  handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo this operation",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        fetch(url + "/" + id, {
          method: "delete"
        }).then(res => this.fetchProduct());
      }
    });
  }

  handleEdit(
    id,
    name,
    brand,
    price,
    producer,
    imageUrl,
    description,
    productType
  ) {
    this.setState({
      id: id,
      name: name,
      brand: brand,
      price: price,
      producer: producer,
      imageUrl: imageUrl,
      description: description,
      productType: productType
    });
  }

  render() {
    console.log(this.state.product);
    console.log(this.state.pageOfItems);
    return (
      <ProductManagerWrapper>
        <Header />
        <Navbar />
        <div className="row bg-light">
          <div className="col-lg-4 text-muted">
            <p> PRODUCT LIST </p>
          </div>
          <div className="col-lg-8 text-right">
            <Link to="/">
              <a className="text-muted">HOME</a>
            </Link>
            /
            <Link to="/productManager">
              <a className="text-muted">PRODUCT MANAGER</a>
            </Link>
          </div>
        </div>
        <div className="row">
          <div>
            <button
              className="btn btn-primary text-left"
              data-toggle="modal"
              data-target="#mymodal"
            >
              <i className="fas fa-plus" /> Add New Product
            </button>
          </div>
        </div>
        <div className='table-css'>
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {this.state.pageOfItems.map(p => (
              <tr>
                <td>{p._id}</td>
                <td>
                  <Link to={`/viewDetail/${p._id}`}>{p.name}</Link>
                </td>
                <td>{p.brand}</td>
                <td>{p.price}</td>
                <td className="text-center">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-toggle="modal"
                    data-target="#mymodal"
                    onClick={this.handleEdit.bind(
                      this,
                      p._id,
                      p.name,
                      p.brand,
                      p.price,
                      p.producer,
                      p.imageUrl,
                      p.description,
                      p.productType
                    )}
                  >
                    {" "}
                    <i className="fas fa-edit" />
                    Edit
                  </button>
                  <div className="modal fade right" tabindex="-1" id="mymodal">
                    <div className="modal-dialog modal-side model-bottom-right modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3 className="text-left model-title">
                            Add/Edit Form <br />
                            <p className="text">*Click New to add new</p>{" "}
                          </h3>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                        </div>
                        <div className="modal-body">
                          <form action="form-control">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    Name
                                  </p>
                                  <div>
                                    <input
                                      type="text"
                                      name="name"
                                      value={this.state.name}
                                      onChange={this.handleChange.bind(this)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    Brand
                                  </p>
                                  <div>
                                    <input
                                      type="text"
                                      name="brand"
                                      value={this.state.brand}
                                      onChange={this.handleChange.bind(this)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    Price
                                  </p>
                                  <div>
                                    <input
                                      type="text"
                                      name="price"
                                      value={this.state.price}
                                      onChange={this.handleChange.bind(this)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    Producer
                                  </p>
                                  <div>
                                    <input
                                      type="text"
                                      name="producer"
                                      value={this.state.producer}
                                      onChange={this.handleChange.bind(this)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    imageUrl
                                  </p>
                                  <div>
                                    <input
                                      type="imageUrl"
                                      name="imageUrl"
                                      value={this.state.imageUrl}
                                      onChange={this.handleChange.bind(this)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    Product Type
                                  </p>
                                  <div>
                                    <input
                                      type="productType"
                                      name="productType"
                                      value={this.state.productType}
                                      onChange={this.handleChange.bind(this)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <p className="font-weight-bold text-left">
                                    Description
                                  </p>
                                  <textarea
                                    row="5"
                                    type="text"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange.bind(this)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="text-center padding">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.handleAdd.bind(this)}
                                data-dismiss="modal"
                              >
                                <i className="fas fa-save" />
                                Save Changes
                              </button>
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  this.setState({
                                    name: "",
                                    brand: "",
                                    price: "",
                                    producer: "",
                                    imageUrl: "",
                                    description: "",
                                    productType: ""
                                  })
                                }
                              >
                                <i className="fas fa-eraser" />
                                New
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.handleDelete.bind(this, p._id)}
                  >
                    {" "}
                    <i className="fas fa-trash" />
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <div className="paginate">
            <Paginate
              items={this.state.product}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
        <UpButton />
        <Footer />
      </ProductManagerWrapper>
    );
  }
}
const ProductManagerWrapper = styled.div`
  .link {
    color: grey !important;
  }
  .btn-dark {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .model-title {
    margin-bottom: -1rem;
  }
  .text {
    font-size: 10px !important;
    margin-top: 0.5rem;
m;
  }
  th {
    text-align: center;
  }
  .form-group p {
    margin-bottom: 0.4rem;
    margin-left: 0.2rem;
  }

  .form-group input {
    width: 100%;
  }
  .padding button {
    margin-top: 2rem;
  }

  textarea {
    width: 100%;
    height: 100%;
  }

  .row button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 106.6rem;
  }
  .col-lg-4 {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-left: 4rem;
  }
  .col-lg-8 {
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-right: 4rem;
  }
  .col-lg-8 a {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
`;
