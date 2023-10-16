import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { panierContext } from "../../../App";
import Footer from "../footer/footer";
import NavBar from "../Header/navBar";
import "./loginStyle.css";




const connectionContext=createContext()
const ConnexionProvider=({children})=>{
    let globalData=useContext(panierContext)
    const [UserOnSign,setUserOnSign]=useState({})

    const handleOnChange = (e, nomduchamps) => { // recupere les donne du champs correspondant
        let newNotUser = { ...UserOnSign, [nomduchamps]: e.target.value };
        e.preventDefault();
        setUserOnSign(newNotUser);
      };

      const verifierCompte=(e,donnee)=>{  //verifier le compte et confirme l'identite de l'user
        e.preventDefault()
        for (let index = 0; index < globalData.usersList.length; index++) {
           if(globalData.usersList[index].password===UserOnSign.password && globalData.usersList[index].identifiant===UserOnSign.identifiant){
            globalData.setActualUser(donnee)
        } 
           else{
            console.log('data no match');
           }
        }
       
      }
return <connectionContext.Provider value={{handleOnChange,verifierCompte,UserOnSign}}>
    {children}
</connectionContext.Provider>
}


const InpuWithButton = ({ nom, place, image, type,cle }) => {
    const context=useContext(connectionContext) 
    let ceci = useRef();
    const clique = () => {
    if (type !== "text") {   // lorsqu'on clique sur le bouton l'input change de type pour afficher ou nom sa valeur
      ceci.current.type === "text"
        ? (ceci.current.type = "password")
        : (ceci.current.type = "text");
    }
  };
  
  return (
    <div className="InpuWithButton">
      <label htmlFor="nom">{nom}</label>
      <div className="coteAcote">
        <img src={image} alt="" onClick={() => clique()} />
        {type !== "text" ? (<input type="password" onChange={(e)=>context.handleOnChange(e,cle)} ref={ceci} placeholder={place} /> ) : (
          <input type="text" placeholder={place} onChange={(e)=>context.handleOnChange(e,cle)} />
        )}
      </div>
    </div>
  );
};

export const MainConnectionForm = () => {
    const context=useContext(connectionContext) 
    return <div className="MainConnectionForm">
    <form >
      <InpuWithButton
        nom={"Identifiant"}
        image={"../../../../assets/icones/icone_4.png"}
        type={"text"}
        place={"identifiant"}
        cle={'identifiant'}
      />
      <InpuWithButton
        nom={"Mot de passe"}
        image={"../../../../assets/icones/icone_5.png"}
        type={"password"}
        place={"password"}
        cle={'password'}
      />
      <div className="mdpOublie">
        <p>Mot de passe oublié</p>
        <div className="ligneDroite"></div>
      </div>
      <button onClick={(e)=>context.verifierCompte(e,context.UserOnSign)}>VALIDER</button>
      <div className="mdpOublie">
        <p>Connectez vous avec</p>
        <div className="ligneDroite"></div>
      </div>
    <div className="iconContentForm">
         <img src="../../../../assets/logos/logo_8.png" alt="lock" />
        <img src="../../../../assets/logos/logo_4.2.png" alt="lock" />
        <img src="../../../../assets/logos/logo_7.png" alt="lock" />
    </div>
    </form>
  </div>
};

function Login() {
  return (
    <div className="allMight">
        <div className="loginComponent">
      <NavBar />
      <div className="connexionContent">
        <h3>Connexion</h3>
        <p className="signLink">Vous n’avez pas encore de compte ? <Link to={'/E-SHOP/inscription'}>Inscrivez vous ici</Link></p>
        <ConnexionProvider>
        <MainConnectionForm />
        </ConnexionProvider>
      </div>
      <div className="degrade">
        
    </div>
    </div>
    <Footer/>
    </div>
    
  );
}
export default Login;
