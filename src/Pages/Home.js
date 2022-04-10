import React,{useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from '../Config/firebase'
import CardGroup from 'react-bootstrap/CardGroup'
import Loading from "../Components/Loading"
const textStyle ={
    padding: '15px',
    textAlign: 'center'
};
const cardStyle ={
    margin: '10px',
    alignItems: 'stretch'
};
function Home (){
    const [productos,setProductos] = useState([])
    const [loading,setLoading] = useState(true)
    const [reload,setReload]=useState(true)   
    async function request(){
        try{
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            if(querySnapshot.docs){
                setProductos(querySnapshot.docs)
                setLoading(false)
                setReload(false)
            }
        }catch(e){
        }
    }
    useEffect(
        ()=>{
            if(reload)request()
        },[reload]
    )
    const handleDelete = async (id)=>{
        try{
            console.log("Eliminar",id)
            const document = await firebase.db.doc("productos/"+id)
            .delete()
            console.log(document)
            setReload(true)
        }catch(e){
        }
    }
    return(
        <Loading active={loading}>
            <>
            <h1 style={textStyle}>Listado de nuestros productos</h1>
            <CardGroup style={cardStyle}>
            {productos.map(producto=><Producto key={producto.id} datos={{...producto.data(),id:producto.id}} handleDelete={handleDelete} />)}
            </CardGroup>
            </>
        </Loading>
    )
}

export default Home