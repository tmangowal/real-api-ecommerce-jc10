import React, { Component } from 'react';
import {connect} from 'react-redux'
import ProductBox from '../../2.components/General/ProductBox';
import Axios from 'axios'
import {urlApi} from '../../3.helpers/database'
import swal from 'sweetalert'
import Carousel from '../../2.components/General/Carousel'
import {Link} from 'react-router-dom'
import { toggleUserId, getCartLength } from '../../redux/1.actions';

// GIT PULL ORIGIN MASTER
class Home extends Component {
    state = {
        productData : []
    }

    checkCartLength = () => {
        Axios.get(urlApi + 'cart?userId=' + this.props.id)
        .then(res => {
            this.props.getCartLength(res.data.length)
        })
        .catch(err => {
            console.log(err)
        })
    }

    addToCart = (productObj) => {
        let cartObj = {
            productId : productObj.id,
            userId : this.props.id,
            quantity : 1,
            price : productObj.harga,
            img : productObj.img,
            discount : productObj.discount,
            productName : productObj.nama
        }
        // localhost:2000/cart?userId=2&productId=1
        Axios.get(urlApi + `cart?userId=${this.props.id}&productId=${productObj.id}`)
        .then((res) => {
            if(res.data.length > 0){
                cartObj.quantity = parseInt(res.data[0].quantity) + parseInt(1)
                Axios.put(urlApi + 'cart/' + res.data[0].id, cartObj)
                .then((res) => {
                    swal('Add to cart', 'Item added to cart', 'success')
                    this.checkCartLength()
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                Axios.post(urlApi + 'cart', cartObj)
                .then((res) => {
                    swal('Add to cart', 'Item added to cart', 'success')
                    this.checkCartLength()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.getDataProducts()
    }

    getDataProducts = () => {
        Axios.get(urlApi + 'products')
        .then((res) => {
            this.setState({productData : res.data})
        })
        .catch((err) => {
            console.log(err)
            swal('Error', 'System Error', 'error')
        })
    }

    renderProducts = () => {
        let jsx = this.state.productData.map(val => {
            return(
                <ProductBox nama={val.nama} harga={val.harga} discount={val.discount} img={val.img} id={val.id} addCartFn={() => this.addToCart(val)}/>
            )
        })
        return jsx
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... "  />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" id="button-addon2" onClick={this.props.toggleUserId}>Go</button>
                            </div>
                        </div> 
                        <div className="card p-2">
                            
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  -1">Cari Produk</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Toko</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Toko"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari User</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari User"></input> 

                                <button className="btn btn-info"><i class="fas fa-filter"></i> Filter</button>                               
                            </form>

                        </div>
                    </div>
                    <div className="col-lg-9 mt-4">
                        <div >
                            <Carousel />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        username : state.user.username,
        id: state.user.id
    }
}, {toggleUserId, getCartLength})(Home)