import React,{useState,useEffect} from "react"
import { useParams } from "react-router"
import firebase from '../../Config/firebase'
import FormGroup from "../../Components/FormGroup";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import Loading from "../../Components/Loading";
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
const textStyle = {
    textAlign: 'center',
    color: 'blue'
};
function ModificarProducto (){
        const { register, handleSubmit,formState:{errors},setValue } = useForm();
        const navigate = useNavigate()
        const onSubmit = async (data) => {
            console.log("data",data);
            try{
                const document = await firebase.db.doc("productos/"+id)
                .set(data)
                console.log("modificar",document)
            }catch(e){
                console.log("error",e.code)
                if(e.code==="auth/email-already-in-use"){
                    alert("El email esta registrado")
                }
            }
        }
        const [loading,setLoading] = useState(true)
        const {id}=useParams()
        console.log(id)
        useEffect(
            ()=>{
                async function request(){
                    try{
                        const response = await firebase.db.doc("productos/"+id)
                        .get()
                        if(response){
                            setLoading(false)
                            setValue("title",response.data().title)
                            setValue("price",response.data().price)
                            setValue("description",response.data().description)
                            setValue("sku",response.data().sku)
                            setValue("stock",response.data().stock)
                            setValue("imagen",response.data().imagen)
                        }
                    }catch(e){
                    }
                }
                request()
            },[id]
        )
        const handleDelete = async ()=>{
            try{
                const document = await firebase.db.doc("productos/"+id)
                .delete()
                console.log(document)
                navigate("/")
            }catch(e){
            }
        }
        return(
            <Loading active={loading}>
            <>
                <h1 style={textStyle}>Modificar Producto</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup label="Nombre" register={{...register("title",{required:true})}}  />
                    <FormGroup label="Precio" register={{...register("price",{required:true})}}  />
                    <FormGroup label="Descripcion" type="text" register={{...register("description",{required:true})}}  />
                    <FormGroup label="SKU" register={{...register("sku",{required:true})}}  />
                    <FormGroup label="Stock" register={{...register("stock",{required:true})}}  />
                    <FormGroup label="URL Imagen" register={{...register("imagen",{required:true})}}  />
                <div className="d-grid gap-3">    
                    <Button type="submit" variant="primary" size="lg">Guardar</Button>
                    <Button variant="danger" onClick={handleDelete} size="lg">Eliminar</Button>
                    <Button variant="dark" size="lg" as={Link} to={"/"} active>Volver al inicio</Button>
                </div>
                </form>
            </>
            </Loading>
        )
}

export default ModificarProducto