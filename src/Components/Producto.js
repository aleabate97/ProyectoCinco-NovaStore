import React from "react"
import {Link} from "react-router-dom"
import {Card,Button} from 'react-bootstrap'
import AuthContext from "../Context/AuthContext"
const styles = {
  button:{
    margin:"5px",
    padding: '5px'
  },
  card:{
    padding: '3px',
    margin: '3px',
    textAlign: 'justify'
  }
};
function Producto (props){
        const {datos,handleDelete} = props
        console.log(props.datos)
        return(
            <AuthContext.Consumer>
              {
                context=>
                <Card style={{ width: '18rem' }}>
                  <Card.Body style={styles.card}>
                    <Card.Img src={datos.imagen}></Card.Img>
                    <Card.Title>{datos.title}</Card.Title>
                    <Card.Text>$ {datos.price}</Card.Text>
                    <Card.Text>Stock: {datos.stock}</Card.Text>
                    <Card.Footer className="text-muted"></Card.Footer>
                    <Button style={styles.button} variant="primary" as={Link} to={"/producto/"+datos.id}>Ver detalle</Button>
                    {
                      context.userLogin &&
                      <>
                      <Button style={styles.button} variant="primary" as={Link} to={"/producto/modificar/"+datos.id}>Modificar</Button>
                      <Button style={styles.button} variant="danger" onClick={(event)=>handleDelete(datos.id)}>Eliminar</Button>
                      </>
                    }
                  </Card.Body>
                </Card>
              }
            </AuthContext.Consumer>
        )
}

export default Producto