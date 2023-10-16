import "./compteStyle.css";
import NavBar from "../Header/navBar";
import { panierContext } from "../../../App";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";




const modificationContext=createContext()
const ModificationProvider=({children})=>{
    let dataGlobale=useContext(panierContext)
    let [valeur,setValeur]=useState({})
    const onChange=(e,cle)=>{
    let newValeur={...valeur,[cle]:e.target.value}
    setValeur(newValeur)
    }

    const modifierUser=()=>{
        let correspond=dataGlobale.usersList.filter((element)=>element.identifiant===dataGlobale.actualUser['identifiant'])
        let newItem=correspond[0]
        newItem.nom=valeur['nom']
        newItem.prenom=valeur['prenom']
        newItem.password=valeur['Npassword']
        // let newList=dataGlobale.usersList.filter((element)=>element.identifiant!==dataGlobale.actualUser['identifiant'])
        // dataGlobale.SetUsersList(newList)
         dataGlobale.deleteUser(newItem.identifiant)
        dataGlobale.SetUsersList([...dataGlobale.usersList,newItem])
        console.log(dataGlobale.usersList)  //// BUG NON SUPPRESSION
    }


    return <modificationContext.Provider value={{valeur,onChange,modifierUser}}>
            {children}
    </modificationContext.Provider>
}


const ContenuCompte=({titre,children})=>{
    return <div className="ContenuCompte">
        <p className="titreCompte">{titre}</p>
        {children}
    </div>
}


const ContenuNormal=(props)=>{
    const dataCompte=useContext(panierContext)
    return <>
            <p>Nom : {dataCompte.actualUser.nom===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.nom}</p>
            <p>Prenom : {dataCompte.actualUser.prenom===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.prenom}</p>
            <p>Mot de passe : {dataCompte.actualUser.password===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.password}</p>
            <p>Email : {dataCompte.actualUser.identifiant===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.identifiant}</p>
            <p>Numero de téléphone : {dataCompte.actualUser.telephone===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.telephone}</p>
            <p>Adresse de livraison : {dataCompte.actualUser.adresse===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.adresse}</p>
            <p>Adresse de facturation : {dataCompte.actualUser.facturation===undefined?' _ _ _ _ _ _ _ _ _':dataCompte.actualUser.facturation}</p>
            <button className="reUseButton2" onClick={()=>props.setIsMod(true)}>MODIFIER</button>
    </>
}


const InputModiff=({label,cle})=>{  
const dataModif=useContext(modificationContext)
return <div><p>{label} :</p>
<input type="text" onChange={(e)=>dataModif.onChange(e,cle)}/>
</div>
}


const ContenuModification=(props)=>{
    const uptade=(e)=>{
        e.preventDefault()
        props.setIsMod(false)
        dataModif.modifierUser()
    }
    const dataGlobal=useContext(panierContext)
    const dataModif=useContext(modificationContext)
    return <>
    <form className="monForm">
    <InputModiff label={'Nom'}  cle={'nom'}/>
    <InputModiff label={'Prenom'} cle={'prenom'}/>
    <p>NOTE : Si vous modifiez votre mot de passe vous devrez vous reconnecter à votre compte 
        avec votre nouveau mot de passe</p>
    <p>Identifiant : {dataGlobal.actualUser['identifiant']}</p>
    <InputModiff label={'Ancien mot de passe'}  cle={'Apassword'}/>
    <InputModiff label={'Nouveau mot de passe'} cle={'Npassword'}/>
    <InputModiff label={'Confirmer votre nouveau mot de passe'} cle={'Cpassword'}/>
    <button className="reUseButton2" onClick={(e)=>uptade(e)}>ENREGISTRER</button>
    </form>
   
    </>
}


function Compte() {
let [isMod,setIsMod]=useState(false)
  return (
    <div>
      <div className="Compte">
        <NavBar />
        <div className="mainPresentation">
          <p className="ident">
            VOTRE IDENTITE <br />
            SECRETE...
          </p>
        </div>
      </div>
      <div className="sectionDuo">
        <div className="navigationSection">
            <p>Mes informations</p>
            <p>Historique des commandes</p>
            <p>Mes avis</p>
            <p>Mes favoris</p>
            <button className="reUseButton">Déconnexion</button>
        </div>
        <div className="contentUser">
            <ModificationProvider>
                <ContenuCompte titre={'Informations personnelles'}>
                {!isMod?<ContenuNormal setIsMod={setIsMod}/>:
                <ContenuModification setIsMod={setIsMod}/>}
                </ContenuCompte>
            </ModificationProvider>
            
            <ContenuCompte titre={'Newsletter'}>
                <p>Abonnez vous à la newsletter ! Ne ratez pas nos offres exceptionnels sur votre article préféré !</p>
                <form >
                    <div>
                    <input type="radio" name="radiobutton" value={true} />
                    <label htmlFor="true">Oui</label></div>
                    <div>
                    <input type="radio" name="radiobutton" value={false} />
                    <label htmlFor="false">Non</label></div>
                    <button className="reUseButton2">ENREGISTRER</button>
                </form>
            </ContenuCompte>
        </div>
      </div>
    </div>
  );
}
export default Compte;
