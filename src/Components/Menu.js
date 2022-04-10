import {Link} from "react-router-dom"
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import AuthContext from "../Context/AuthContext"
const textStyles = {
      margin:"5px",
      padding: '5px',
      fontSize: '20px'
};
function Menu (){
        return(
            <>
                <AuthContext.Consumer>
                    {
                        context=>
                        <>
                            <Navbar bg="dark" expand="lg" variant="dark">
                                <Navbar.Brand href="#home">NovaStore</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                                    {
                                        !context.userLogin &&
                                        <>
                                        <Nav.Link as={Link} to={{pathname:"/registro",state:{facebook:false}}}>Registro</Nav.Link>
                                        <Nav.Link as={Link} to="/ingresar">Ingresar</Nav.Link>
                                        </>
                                    }
                                    {
                                        context.userLogin &&
                                        <>
                                        <NavDropdown title="Producto" id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/producto/alta">Agregar</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link onClick={context.logoutUser}>Salir</Nav.Link>
                                        </>
                                    }
                                </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            {
                                context.userInfo &&
                                <div style={textStyles}>¡Hola {context.userInfo.nombre}, Bienvenido a NovaCenter!</div>
                            }
                        </>
                    }
                </AuthContext.Consumer>
            </>
        )
}

export default Menu