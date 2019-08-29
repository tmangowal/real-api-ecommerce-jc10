import React from 'react';
import './style.css'
import {Link} from 'react-router-dom'

const ProductBox = (props) => {

    return (
        <div className="card col-md-3 m-3" style={{width:'18rem'}}>
            <Link to={"/product-details/" + props.id}>
                <img className="card-img-top img" height='200px' src={props.img} alt="Card" />
            </Link>
            {
                props.discount > 0
                ?
                <div className="discount">{props.discount}%</div>
                :
                null
            }
            <div className="card-body">
                <h4 className="card-text">{props.nama}</h4>
                {
                    props.discount > 0
                    ?
                    <p style={{textDecoration : 'line-through', color:'red'}}>Rp. {new Intl.NumberFormat('id-ID').format(props.harga)}</p>
                    :
                    null
                }
                <p className="card-text">Rp. {new Intl.NumberFormat('id-ID').format(props.harga - (props.harga * (props.discount/100)))}</p>
            </div>
            <div className="card-footer" style={{backgroundColor:'inherit'}}>
                <input type='button' className='d-block btn btn-primary btn-block' value='Add To Cart' />
            </div>
        </div>
    );
};

export default ProductBox;