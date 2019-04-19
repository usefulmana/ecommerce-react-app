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

export default class ProductTypeManager extends Component {
  constructor() {
    super();
    this.state = {
      productType: [],
      id: "",
      name: "",
      pageOfItems: [],
      query: "",
      nameError: ""
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      // clear form
      this.setState({ nameError: "", name: "" });
      this.handleAdd();
      Swal.fire({
        type: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };
  validate = () => {
    let nameError = "";
    // let passwordError = "";

    if (!this.state.name || this.state.name.length <= 4) {
      nameError =
        "Name cannot be blank, and it has to be longer than 4 characters";
    }
    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    return true;
  };
  fetchProductType() {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        let data = json.filter(d => d._id !== "");
        this.setState({ productType: data });
      });
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems, state: this.state });
  }
  componentDidMount() {
    this.fetchProductType();
  }
  handleSearchChange(e) {
    this.setState({
      query: e.target.value
    });
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
          <div className="col-3 search-bar mx-auto">
            <input
              className="form-control"
              type="text"
              placeholder="Search by name"
              onChange={this.handleSearchChange}
            />
          </div>
          <div className="add-new">
            <a href="#add-form">
              <button
                className="btn mybtn text-left"
                onClick={() =>
                  this.setState({
                    name: ""
                  })
                }
              >
                <i className="fas fa-plus" /> Add New Type
              </button>
            </a>
          </div>
        </div>
        <div className="table-control">
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {this.state.pageOfItems
              .filter(searchingFor(this.state.query))
              .map(p => (
                <tr>
                  <td>{p._id}</td>
                  <td>{p.name}</td>
                  <td className="text-center">
                    <a href="#add-form">
                      <button
                        href="#add-form"
                        className="btn btn-secondary"
                        type="button"
                        onClick={this.handleEdit.bind(this, p._id, p.name)}
                      >
                        {" "}
                        <i className="fas fa-edit" />
                        Edit
                      </button>
                    </a>
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
        <div id="add-form" className="mx-auto">
          <h2>Add/Edit Form</h2>
          <p className="text">*Click New to add new</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <strong>
                {" "}
                <label for="name">Name</label>
              </strong>

              <input
                type="text"
                id="name"
                value={this.state.name}
                name="name"
                className="form-control-lg"
                onChange={this.handleChange.bind(this)}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameError}
              </div>
            </div>
            <div className="buttons">
              <button type="submit" class="btn mybtn">
                <i className="fas fa-save" />
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    name: ""
                  })
                }
              >
                <i className="fas fa-eraser" />
                New
              </button>
            </div>
          </form>
        </div>
        <UpButton />
        <Footer />
      </ProductTypeManagerWrapper>
    );
  }
}
function searchingFor(query) {
  return function(x) {
    return x.name.toLowerCase().includes(query.toLowerCase()) || !query;
  };
}
const ProductTypeManagerWrapper = styled.div`
.form-control-lg{
  max-height: 2.5rem;
}
.table-control{
  min-height: 10rem !important;
}
.buttons{
  margin-top: 3rem
  margin-left: 12rem
}
.buttons button{
  margin-left:2rem;
  magin-right: 2rem;
}
#add-form{
  margin: 5rem 35rem 5rem 35rem !important
}
.mybtn{
  background: transparent;
  color:#ff4c3b;
  border-color: #ff4c3b;
}
.add-new{
  margin-top:-4.5rem;
  margin-left: 10.6rem;
  margin-bottom: 2rem
}
.search-bar{
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  width: 10%;
}
.search-bar input{
   border-radius: 15px;
}
.search-bar input:focus {
    border-color: #ff4c3b !important;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px #ff4c3b !important;
    outline: 0 none;
  }
  .btn-danger{
    padding-left: 2.1rem;
    padding-right: 2.1rem;
  }
  .btn-secondary {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .text {
    font-size: 10px !important;
    margin-top: 0.5rem;
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
