import React,{useState,useEffect} from "react"
import { useForm } from "react-hook-form";
import FormGroup from "../Components/FormGroup";

import firebase from '../Config/firebase'

import ButtonWithLoading from "../Components/ButtonWithLoading";
import AlertCustom from "../Components/AlertCustom";
const textStyle ={
    padding: '15px',
    textAlign: 'center'
};
function Registro (){

    const { register, handleSubmit,formState:{errors} } = useForm();
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] = useState({variant:"",text:""})
    const onSubmit = async (data) => {
        setLoading(true)
        console.log("data",data);
        try{
            const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email,data.password)
            console.log("user",responseUser.user.uid)
            if(responseUser.user.uid){
                const document = await firebase.db.collection("usuarios")
                .add({
                    nombre:data.nombre,
                    apellido:data.apellido,
                    userId:responseUser.user.uid
                })
                console.log("document",document)
                setLoading(false)
                setAlert({variant:"success",text:"Registro realizado con exito."})
            }
        }catch(e){
            console.log("error",e.code)
            setLoading(false)
            if(e.code=="auth/email-already-in-use"){
                setAlert({variant:"danger",text:"El email pertenece a un usario existente."})
            }
        }
        
    }
    return(
        <div>
            <h1 style={textStyle}>Registrarse</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup label="Nombre" register={{...register("nombre",{required:true})}}  />
                {errors.nombre && <span>El campo es obligatorio</span>}
                <FormGroup label="Apellido" register={{...register("apellido",{required:true})}}  />
                <FormGroup label="Email" type="email" register={{...register("email",{required:true})}}  />
                <FormGroup label="Contraseña" type="password" register={{...register("password",{required:true,minLength:2})}}  />
                {errors.password?.type==="required" && <span>El campo es obligatorio</span>}
                {errors.password?.type==="minLength" && <span>Debe completar al menos 6 caracteres</span>}
           
                <ButtonWithLoading loading={loading} type="submit">Registrarse</ButtonWithLoading>
                <AlertCustom variant={alert.variant} text={alert.text} />
            </form>
        </div>
    )
      
    
    
    
}
export default Registro