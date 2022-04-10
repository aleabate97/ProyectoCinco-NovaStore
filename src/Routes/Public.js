import React,{useState,useEffect} from "react"
import {
    Routes,
    Route
  } from "react-router-dom"
import Registro from '../Pages/Registro';
import Login from '../Pages/Login';
import Menu from '../Components/Menu';
import Footer from '../Components/Footer';
import Detalle from '../Pages/Detalle';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import Container from 'react-bootstrap/Container'
import AltaProducto from "../Pages/ABMProductos/AltaProducto";
import ModificarProducto from "../Pages/ABMProductos/ModificarProducto";
import AuthContext from "../Context/AuthContext";
function Public (){
        return(
            <>
               <Menu />
               <Container>
                    <AuthContext.Consumer>
                        {
                            context=>
                            <Routes>
                                <Route path="/registro" element={<Registro />}>
                                </Route>

                                <Route path="/ingresar" element={<Login />}>
                                </Route>

                                <Route path="/producto/alta" element={<AltaProducto />}>
                                </Route>

                                {
                                    context.userLogin &&
                                    <Route path="/producto/modificar/:id" element={<ModificarProducto />}>
                                    </Route>
                                }
                                
                                <Route path="/producto/:id" element={<Detalle />}>
                                </Route>

                                <Route path="/" exact element={<Home />}> 
                                </Route>

                                <Route path="*" element={<NotFound />}>
                                </Route>
                            </Routes>
                        }
                    </AuthContext.Consumer>
                </Container>
                <Footer />
            </>
        )
}

export default Public