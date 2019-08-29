import React, { Component } from 'react';
import {FavoriteBorderOutlined, Favorite} from '@material-ui/icons'


class ProductDetails extends Component {

    state = {
        product : {
            "id": 1,
            "nama": "Kaos Polos Hitam",
            "harga": 20000,
            "category": "polos",
            "discount": 10,
            "deskripsi": "Kaos Terbaik",
            "img": "https://www.jakartanotebook.com/images/products/99/63/19075/2/kaos-polos-katun-pria-o-neck-size-m-81402b-or-t-shirt-black-24.jpg"
          },
        wishlist : false
    }

    render() {
        var {nama, harga, discount, deskripsi, img} = this.state.product
        return (
            <div className='container mt-3'>
                <div className="row">
                    <div className='col-md-4'>
                        <div className="card" style={{width: '100%'}}>
                            <img className="card-img-top" src={img} alt="Card cap" />
                            <div className="card-body">
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4c4c4c'}}>{nama} &nbsp;{this.state.wishlist ? <Favorite onClick={() => this.setState({wishlist : !this.state.wishlist})} style={{color:'red',fontSize:32, cursor:'pointer'}}/> : <FavoriteBorderOutlined onClick={() => this.setState({wishlist : !this.state.wishlist})} style={{color:'red',fontSize:32, cursor:'pointer'}}/>}</h1>
                        <div style={{backgroundColor:'#D50000', 
                                    width:"50px",
                                    height:'22px',
                                    color:'white',
                                    textAlign:'center',
                                    display: 'inline-block'}}>
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px', 
                                    fontWeight:'600',
                                    color:"#606060", 
                                    marginLeft:'10px',
                                    textDecoration: 'line-through'}}>Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                    fontWeight:'700',
                                    color:'#FF5722',
                                    marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Jumlah</div>
                                <input ref="qty" onChange={this.qtyInputProt} type="number" min={0} className="form-control" style={{width:'60px', marginTop:'10px'}}/>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px', fontSize:'16px', fontWeight:'700', color:'#606060'}}>Catatan Untuk Penjual (Opsional)</div>
                                <input type='text' style={{marginTop:'12px'}} placeholder="Contoh: Warna Putih, Ukuran XL" className='form-control'/>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060', fontStyle:"italic"}}>{deskripsi}
                                </p>
                            </div>
                        </div>
                        
                        {this.props.username === '' ?
                        <div className='row mt-4'>
                            <input disabled type="button"   className='btn border-secondary col-md-2' value="Add To Wishlist"/>
                            <input disabled type="button"  className='btn btn-primary col-md-3' value="Beli Sekarang"/>
                            <input disabled type="button"   className='btn btn-success col-md-3' value="Tambah ke Keranjang"/>
                        </div>
                            :
                        <div className='row mt-4'>
                            <div className="col-md-4">
                                <input  type="button" onClick={this.addToCart} className='btn btn-success btn-block' value="Tambah ke Keranjang"/>
                            </div>
                        </div>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetails;