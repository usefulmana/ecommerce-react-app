import React, { Component } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import Header from "../secondary/Header";
import Navbar from "../secondary/NavBar";
import Footer from "../secondary/Footer";
import UpButton from "../secondary/UpButton";
import { Link } from "react-router-dom";
import Paginate from "./../secondary/Paginate";
const url = "http://rmit.chickenkiller.com:8080/productTypes";

// TODO IMPLEMENT PAGINATION
// TODO PRODUCT TYPE LINK
export default class ProductTypeManager extends Component {
  constructor() {
    super();
    this.state = {
      productType: [],
      id: "",
      name: "",
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }
  fetchProductType() {
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ productType: json }));
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems, state: this.state });
  }
  componentDidMount() {
    this.fetchProductType();
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
          name: this.state.name
        })
      }).then(res => this.fetchProductType());
    } else {
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "put",
        body: JSON.stringify({
          _id: this.state.id,
          name: this.state.name
        })
      }).then(res => {
        console.log(res);
        this.fetchProductType();
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
        }).then(res => this.fetchProductType());
      }
    });
  }

  handleEdit(id, name) {
    this.setState({
      id: id,
      name: name
    });
  }
  render() {
    return (
      <ProductTypeManagerWrapper>
        <Header />
        <Navbar />
        <div className="row bg-light">
          <div className="col-lg-4 text-muted">
            <p> PRODUCT TYPE LIST </p>
          </div>
          <div className="col-lg-8 text-right">
            <Link to="/">
              <a className="text-muted">HOME</a>
            </Link>
            /
            <Link to="/productTypeManager">
              <a className="text-muted">PRODUCT TYPE MANAGER</a>
            </Link>
          </div>
        </div>
        <div className="row">
          <h3> Product List </h3>
          <div>
            <button
              className="btn btn-primary text-left"
              data-toggle="modal"
              data-target="#mymodal"
            >
              <i className="fas fa-plus" /> Add New Type
            </button>
          </div>
        </div>
        <div>
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {this.state.pageOfItems.map(p => (
              <tr>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td className="text-center">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-toggle="modal"
                    data-target="#mymodal"
                    onClick={this.handleEdit.bind(this, p._id, p.name)}
                  >
                    {" "}
                    <i className="fas fa-edit" />
                    Edit
                  </button>
                  <div className="modal fade right" tabindex="-1" id="mymodal">
                    <div className="modal-dialog modal-side model-bottom-right modal-sm">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3 className="text-left model-title">
                            Add/Edit Form{" "}
                            <p className="text">*Click New to add new</p>
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
                            <div className="form-group">
                              <p className="font-weight-bold text-left">Name</p>
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
                                    description: ""
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
              items={this.state.productType}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
        <UpButton />
        <Footer />
      </ProductTypeManagerWrapper>
    );
  }
}

const ProductTypeManagerWrapper = styled.div`
  .btn-dark {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .text {
    font-size: 10px !important;
    margin-top: 0.5rem;
  }
  .model-title {
    margin-bottom: -1rem;
  }
  .form-group p {
    margin-bottom: 0.4rem;
    margin-left: 0.2rem;
  }

  .form-group input {
    width: 100%;
  }
  .padding {
    margin-top: 1.5rem;
  }

  textarea {
    width: 100%;
    height: 100%;
  }

  .row h3 {
    padding: 1rem 0 0.2rem 3rem;
  }

  .row button {
    margin-top: 0.7rem;
    margin-left: 84.2rem;
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
  th {
    text-align: center;
  }
`;
