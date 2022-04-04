import React, { useEffect, useState } from 'react'
import Axios from 'axios'


import {uuid, word, price} from "minifaker"
import 'minifaker/locales/en'

import {Container, Col, Row} from "reactstrap"
import CartItem from './CartItem'

// const apiKey = "INSERT_YOUR_KEY_HERE"

// const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"

const localUrl = "https://myjson.dit.upm.es/api/bins/bv77"


const BuyPage = ({addInCart}) => {

    const [product, setProduct] = useState([])

    // const fetchPhotos = async () => {
    //     const response = await Axios.get(url, {
    //         header : {
    //             Authorization : apiKey
    //         }
    //     })
    // }

    const fetchPhotos = async () => {
        const {data} = await Axios.get(localUrl)

        const {photos} = data;

        const allProducts = photos.map(photo => ({
        smallImage : photo.src.medium,
        tinyImage : photo.src.tiny,
        productName : word({type : 'noun', locale : "en"}),
        productPrice : price(),
        id : uuid.v4()
    }));

    setProduct(allProducts)
    }


    useEffect(() => {
        fetchPhotos()
    }, [])
    




  return (
    <Container fluid>
            <h1 className='text-success text-center'>
                Buy Page
            </h1>
            <Row>
                {product.map(product => (
                    <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart}/>
                    </Col>
                ))}
            </Row>
    </Container>
  )
}

export default BuyPage