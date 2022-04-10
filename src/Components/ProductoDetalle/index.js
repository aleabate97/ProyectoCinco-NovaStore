import React from "react"
import {Link} from "react-router-dom"
import { Card, Button } from "react-bootstrap"

const styles = {
    imagen:{
        maxWidth:'300px',
        padding: '10px',
        alignItems: 'center',
    },
    text:{
        padding: '5px',
        margin: '20px'
    },
    button:{
        padding: '5px',
        margin: '20px'
    }
};
function ProductoDetalle (props){
        const {datos} = props
        console.log(props.datos)
        return(
            <Card.Body>
                <h1><Card.Img style={styles.imagen} src={datos.imagen}></Card.Img></h1>
                <h2>{datos.title}</h2>
                    <p style={styles.text}>Precio $ {datos.price}</p>
                    <p style={styles.text}>Descripcion: {datos.description}</p>
                    <p style={styles.text}>N°SKU: {datos.sku}</p>
                    <p style={styles.text}>Stock: {datos.stock}</p>
                <Button style={styles.button} variant="dark" size="lg" as={Link} to={"/"} active>Volver al inicio</Button>
            </Card.Body>
        )    
}

export default ProductoDetalle