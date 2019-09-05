import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
import moment from 'moment'
import {Link} from 'react-router-dom'

class HistoryComp extends Component {
    state = {
        data: [],
        showDetails: false,
        detailIdx: null
    }

    componentDidMount () {
        this.getDataCart()
    }

    getDataCart = () => {
        Axios.get(urlApi + 'history?userId=' + this.props.id)
        .then(res => {
            console.log(res)
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderHistory = () => {
        let jsx = this.state.data.map((val, idx) => {
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td>{val.time}</td>
                    <td>{val.items.length}</td>
                    <td>{val.totalPrice}</td>
                    <td><input type="button" className="btn btn-primary" onClick={() => this.setState({showDetails: true, detailIdx: idx})} value="See Details"/></td>
                </tr>
            )
        })

        return jsx
    }

    renderDetail = () => {
        let jsx = this.state.data[this.state.detailIdx].items.map((val, idx) => {
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td>{val.productName}</td>
                    <td>{val.quantity}</td>
                    <td>{val.price - (val.price * (val.discount/100))}</td>
                </tr>
            )
        })

        return jsx
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.data.length > 0 ?
                    <>
                        <table className="table mt-3 text-center">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total Price</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderHistory()}
                            </tbody>
                        </table>
                    </>
                    :
                    <div className="mt-3 alert alert-danger">Your History is empty, Let's <Link style={{textDecoration: 'underline', color: 'green'}} to="/">Go Shopping</Link></div>
                }
                {
                    this.state.showDetails ? 
                    <>
                        <h2>Detail {this.state.data[this.state.detailIdx].time}</h2>
                        <table className="table mt-3 text-center">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDetail()}
                            </tbody>
                        </table>
                        <div className="row p-5">
                            <div className="col-4">Received by: {this.state.data[this.state.detailIdx].recipient}</div>
                            <div className="col-4">Address: {this.state.data[this.state.detailIdx].address}</div>
                            <div className="col-4">Postal Code: {this.state.data[this.state.detailIdx].postalCode}</div>
                        </div>
                    </>
                    :
                    null
                }
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

export default connect(mapStateToProps)(HistoryComp)