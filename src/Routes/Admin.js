import React from "react"
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom"
import Menu from '../Components/Menu';
import Footer from '../Components/Footer';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
function Admin (){
        return(
            <>
               <Menu />
                <Switch>
                    <Redirect path="/Home" to="/"/>
                    <Route path="/" exact>
                        <Home />
                    </Route>

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
            </>
        )
}

export default Admin