import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'

class Cart extends Component {
    state = {
        cartData : []
    }

    componentWillReceiveProps(newProps){
        this.getDataCart(newProps.id)
    }

    getDataCart = (id) => {
        Axios.get(urlApi + 'cart?userId=' + id)
        .then(res => {
            console.log(res)
            this.setState({cartData : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderCart = () => {
        var jsx = this.state.cartData.map(val => {
            return (
                <tr>
                    <td>{val.productName}</td>
                    <td>{val.price - (val.price * (val.discount/100))}</td>
                    <td>{val.quantity}</td>
                    <td>{(val.price - (val.price * (val.discount/100))) * val.quantity}</td>
                    <td>EDIT</td>
                    <td>DELETE</td>
                </tr>
            )
        })

        return jsx
    }

    render() {
        return (
            <div className="container">
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(Cart)