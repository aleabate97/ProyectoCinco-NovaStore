import React,{useState,useContext} from "react"
import { useForm } from "react-hook-form";
import FormGroup from "../Components/FormGroup";

import firebase from '../Config/firebase'

import ButtonWithLoading from "../Components/ButtonWithLoading";
import AuthContext from "../Context/AuthContext";
const textStyle ={
    padding: '15px',
    textAlign: 'center'
};
function Login (){
    const { register, handleSubmit,formState:{errors} } = useForm();
    const [loading,setLoading] = useState(false)
    const context = useContext(AuthContext)
    const onSubmit = async (data) => {
        setLoading(true)
        console.log("data",data);
        try{
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email,data.password)
            if(responseUser.user.uid){
                const userInfo = await firebase.db.collection("usuarios")
                .where("userId","==",responseUser.user.uid)
                .get()
                console.log("userInfo",userInfo.docs[0]?.data())
                setLoading(false)
                context.loginUser(userInfo.docs[0]?.data())
            }
        }catch(e){
            console.log("error",e)
            setLoading(false)
        }
    }
    return(
        <div>
            <h1 style={textStyle}>Ingresar</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup label="Email" type="email" register={{...register("email",{required:true})}}  />
                <FormGroup label="Contraseña" type="password" register={{...register("password",{required:true,minLength:2})}}  />
                {errors.password?.type==="required" && <span>El campo es obligatorio</span>}
                {errors.password?.type==="minLength" && <span>Debe completar al menos 6 caracteres</span>}
           
                <ButtonWithLoading loading={loading} type="submit">Ingresar</ButtonWithLoading>
            </form>
        </div>
    )
}

export default Login