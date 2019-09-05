import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';
import {Link} from 'react-router-dom'

class ParaSultan extends Component {
    state = {
        data : [],
        isiCart : 0,
        sangSultan: {},
        price: 0
    }

    componentDidMount(){
        this.cariSultan()
    }

    cariSultan = () => {
        let sultan = {
            totalPrice: 0
        };

        Axios.get(urlApi + 'history')
        .then(res => {
            res.data.forEach(val => {
                if(val.totalPrice > sultan.totalPrice){
                    sultan = val
                }
            })
            Axios.get(urlApi + 'users/' + sultan.userId)
            .then(res => {
                this.setState({sangSultan: res.data, price: sultan.totalPrice})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderResult = () => {
        // let totalQty = 0

        // this.state.data.map(val => {
        //     totalQty += parseInt(val.quantity)
        // })

        // return totalQty
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-header border-0 pt-5">
                                <h3>User Tersultan adalah {this.state.sangSultan.username}</h3>
                            </div>
                            <div className="card-body">
                                Total belanjaan tertingginya adalah Rp.{new Intl.NumberFormat('id-ID').format(this.state.price)}
                            </div>
                            <div className="card-footer align-items-center">
                                <h5>Ayo <Link to="/">kalahkan {this.state.sangSultan.username}!</Link></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParaSultan;