import React, { Component } from 'react';
import Axios from 'axios';
import { urlApi } from '../../3.helpers/database';

class Analytics extends Component {
    state = {
        income : 0,
        transactions: 0
    }

    componentDidMount () {
        let total = 0
        Axios.get(urlApi + 'history')
        .then(res => {
            res.data.forEach(val => {
                total += val.totalPrice
            })
            this.setState({income: total, transactions: res.data.length})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-header border-0 pt-5">
                                <h3>Total Income</h3>
                            </div>
                            <div className="card-body">
                                Total pendapatan dari user belanja adalah Rp. {new Intl.NumberFormat('id-ID').format(this.state.income)}
                            </div>
                            <div className="card-footer align-items-center">
                                Pendapatan dihitung dari {this.state.transactions} transaksi yang berhasil
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analytics;