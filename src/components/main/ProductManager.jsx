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
// TODO IMPLEMENT SEARCH
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
      pageOfItems: [],
      query:'',
      nameError:'',
      brandError:'',
      priceError:"",
      imageUrlError:"",
      producerError:'',
      productTypeError:'',
      descriptionError:'',
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log('valid')
      this.setState({
        nameError: "", brandError: '', descriptionError: '', producerError: '', productTypeError: '', priceError: "", imageUrlError: '', product: [],
        id: "",
        name: "",
        brand: "",
        price: "",
        producer: "",
        imageUrl: "",
        productType: "",
        description:""});
      this.handleAdd()
      Swal.fire({
        type: 'success',
        title: 'Success!',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  validate = () => {
    console.log('here')
    let nameError = "";
    let brandError = '';
    let producerError ='';
    let productTypeError= '';
    let descriptionError ='';
    let priceError = "";
    let imageUrlError = ''
    // let passwordError = "";

    if (!this.state.name || this.state.name.length <= 4) {
      nameError = "Name cannot be blank, and it has to be longer than 4 characters";
    }
    if (!this.state.brand) {
      brandError = "Brand cannot be blank";
    }
    if (!this.state.price || this.state.price <= 0) {
      priceError = "Price cannot be blank, and its value has to be greater than 0";
    }
    if (!this.state.producer ) {
      producerError = "Producer cannot be blank";
    }
    if (!this.state.imageUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
      imageUrlError = "Product type cannot be blank, and it has to be a link to an image";
    }
    if (!this.state.productType || this.state.productType.length <= 4) {
      productTypeError = "Product type cannot be blank, and it has to be longer than 4 characters";
    }
    if (!this.state.description || this.state.description.length <= 15) {
      descriptionError = "Description cannot be blank, and it has to be longer than 15 characters";
    }
    if (nameError || brandError || producerError || productTypeError || descriptionError ||priceError||imageUrlError) {
      this.setState({ nameError,brandError,producerError,productTypeError,descriptionError,priceError,imageUrlError });
      return false;
    }
    return true;
  };
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

  handleSearchChange(e){
    this.setState({
      query: e.target.value,
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
          <div className="col-3 search-bar mx-auto"><input className='form-control' type='text' placeholder='Search by name' onChange={this.handleSearchChange}/></div>
          <div className='add-new'>
            <a href="#add-form"><button
              className="btn mybtn text-left"
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
              <i className="fas fa-plus" /> Add New Product
            </button></a>     
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
                <th>Type</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {this.state.pageOfItems.filter(searchingFor(this.state.query)).map(p => (
              <tr>
                <td>{p._id}</td>
                <td>
                  <Link to={`/viewDetail/${p._id}`}>{p.name}</Link>
                </td>
                <td>{p.brand}</td>
                <td>{p.price}</td>
                <td>{p.productType}</td>
                <td className="text-center">
                <a href="#add-form">
                    <button
                      className="btn btn-secondary"
                      type="button"
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
              items={this.state.product}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
        <div id='add-form' className='mx-auto'>
          <h2>Add/Edit Form</h2>
          <p className="text">*Click New to add new</p>
          <form action="form-control" onSubmit={this.handleSubmit}>
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
                     
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nameError}
                    </div>
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
                   
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                {this.state.brandError}
              </div>
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
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.priceError}
                    </div>
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
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.producerError}
                    </div>
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
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.imageUrlError}
                    </div>
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
                  
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.productTypeError}
                    </div>
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
                  /><div style={{ fontSize: 12, color: "red" }}>
                    {this.state.descriptionError}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center padding">
              <button
                type="submit"
                className="btn mybtn"
              >
                <i className="fas fa-save" />
                Save Changes
                              </button>
              <button
                type="button"
                className="btn btn-secondary"
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
        <UpButton />
        <Footer />
      </ProductManagerWrapper>
    );
  }
}

function searchingFor(query) {
  return function (x) {
    return x.name.toLowerCase().includes(query.toLowerCase()) || !query;
  };
}
const ProductManagerWrapper = styled.div`
.form-control-md{
  max-width: 30rem;
}
.buttons{
  margin-top: 3rem
  margin-left: 40rem
}
.padding button{
  margin-left:2rem;
  magin-right: 2rem;
}
#add-form{
  margin: 5rem 15rem 5rem 15rem !important
}
.mybtn{
  background: transparent;
  color:#ff4c3b;
  border-color: #ff4c3b;
}
.add-new{
  margin-top:-3.3rem;
  margin-right: 5rem!important;
}
.search-bar{
  margin-top: 1.5rem;
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
  .link {
    color: grey !important;
  }
  .btn-danger{
    padding-left: 2.1rem;
    padding-right: 2.1rem;
  }
  .btn-secondary {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .model-title {
    margin-bottom: -1rem;
  }
  .text {
    font-size: 10px !important;
    margin-top: 0.5rem;
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
