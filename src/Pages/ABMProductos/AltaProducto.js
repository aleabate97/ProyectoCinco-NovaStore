import { useForm } from "react-hook-form";
import FormGroup from "../../Components/FormGroup";
import firebase from '../../Config/firebase'
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button'
//const textStyle = {
//    textAlign: 'center',
//    color: 'red'
//}
const styles = {
    text:{
        textAlign: 'center',
        color: 'red'
    }
};
function AltaProducto (){
    const { register, handleSubmit,formState:{errors} } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log("data",data);
        try{
            const document = await firebase.db.collection("productos")
            .add(data)
            console.log(document)
            navigate("/")
        }catch(e){
            console.log("error",e)
        }
    }
    return(
        <div>
            <h1 style={styles.text}>Agregar Producto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup label="Nombre" register={{...register("title",{required:true})}}  />
                <FormGroup label="Precio" register={{...register("price",{required:true})}}  />
                <FormGroup label="Descripcion" type="text" register={{...register("description",{required:true})}}  />
                <FormGroup label="SKU" register={{...register("sku",{required:true})}}  />
                <FormGroup label="Stock" register={{...register("stock",{required:true})}}  />
                <FormGroup label="URL Imagen" register={{...register("imagen",{required:true})}}  />
            <div className="d-grid gap-2">
                <Button type="submit" variant="primary" size="lg">Guardar</Button>
            </div>
            </form>
        </div>
    )
}

export default AltaProducto