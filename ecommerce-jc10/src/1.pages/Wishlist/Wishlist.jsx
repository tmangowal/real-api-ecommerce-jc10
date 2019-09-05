import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
import moment from 'moment'
import {Link} from 'react-router-dom'

class Wishlist extends Component {
    state = {
        data: [],
        showDetails: false,
        detailIdx: null
    }

    componentDidMount () {
        this.getDataWishlist()
    }

    getDataWishlist = () => {
        Axios.get(urlApi + 'wishlist?userId=' + this.props.id)
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderWishlist = () => {
        let jsx = this.state.data.map((val, idx) => {
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td><Link to={"product-details/" + val.productId}>{val.productName}</Link></td>
                </tr>
            )
        })

        return jsx
    }

    render() {
        return (
            <div className="container">
                <h2>Wishlist</h2>
                <table className="table mt-3 text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Item Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderWishlist()}
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

export default connect(mapStateToProps)(Wishlist)