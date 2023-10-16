import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { panierContext } from "../../../App";
import Footer from "../footer/footer";
import NavBar from "../Header/navBar";
import "../LOGIN/loginStyle.css";
import "./inscriptionStyle.css";

const creationContext = createContext();
const CreationProvider = ({ children }) => {
  let allerA=useNavigate()
  let userData = useContext(panierContext);
  const [userInfo, setUserInfo] = useState({});
  const onTape = (e, key) => {
    let newCle = { ...userInfo, [key]: e.target.value };
    setUserInfo(newCle);
  };
  const ajouterUser = (e, valeur) => {
    e.preventDefault();
    let long = Object.keys(userInfo).length;
    let listKey = Object.keys(userInfo);
    if (long === 5) {
      let vide = false;
      for (let index = 0; index < long; index++) {
        if (userInfo[listKey[index]] === "") {
          vide = true;
        }
      }
      if (!vide) {
        let exist = false;
        for (let index = 0; index < userData.usersList.length; index++) {
          if (
            userInfo.identifiant === userData.usersList[index]["identifiant"]
          ) {
            exist = true;
          }
        }
        if (!exist) {
          if(userInfo.password===userInfo.passwordConfirm){
            userData.addNewUser(userInfo)
            userData.setActualUser(userInfo)
            setUserInfo({})
            allerA('/E-SHOP/compt')
          }
          else{
            console.log('No same');
          }
        }
        else{
          console.log('identifiant exist');
        }
      } else {
        console.log("vide");
      }
    }
  };
  return (
    <creationContext.Provider value={{ onTape, userInfo, ajouterUser }}>
      {children}
    </creationContext.Provider>
  );
};

const ChampsSans = ({ nom, place, cle }) => {
  let dataUser = useContext(creationContext);

  return (
    <>
      <label htmlFor={nom}>{nom}</label>
      <input
        className="inputNormal"
        type="text"
        name={nom}
        placeholder={place}
        onChange={(e) => dataUser.onTape(e, cle)}
      />
    </>
  );
};

const ChampsSpecial = ({ nom, cle }) => {
  let dataUser = useContext(creationContext);
  return (
    <>
      <p className="myP">{nom}</p>
      <div className="inputNew">
        <img src="../../../../assets/icones/icone_5.png" alt="lock" />
        <input
          type="text"
          className="myInput"
          placeholder={nom}
          onChange={(e) => dataUser.onTape(e, cle)}
        />
      </div>
    </>
  );
};

const CarteInscription = () => {
  let datadata = useContext(creationContext);
  return (
    <div className="CarteInscription">
      <form>
        <ChampsSans nom={"Nom"} place={"Nom"} cle={"nom"} />
        <ChampsSans nom={"Prenom"} place={"Prenom"} cle={"prenom"} />
        <ChampsSans nom={"Identifiant"} place={"Email"} cle={"identifiant"} />
        <ChampsSpecial nom={"Mot de passe"} cle="password" />
        <ChampsSpecial
          nom={"Confirmer votre mot de passe"}
          cle={"passwordConfirm"}
        />
        <p className="long">
          Je reconnais avoir pris connaissance et j’accepte les termes des
          <a href="#"> conditions générales d’utilisation</a>.
        </p>
        <button onClick={(e) => datadata.ajouterUser(e, datadata.userInfo)}>
          VALIDER
        </button>
      </form>
      <div className="ligneDiv">
        <p className="Pconnect">Connecter vous avec</p>
        <p className="ligneWhite"></p>
      </div>
      <div className="iconsDiv">
        <img src="../../../../assets/logos/logo_8.png" alt="lock" />
        <img src="../../../../assets/logos/logo_4.2.png" alt="lock" />
        <img src="../../../../assets/logos/logo_7.png" alt="lock" />
      </div>
    </div>
  );
};

function Inscription() {
  return (
    <div className="allMight">
      <div className="loginComponent">
        <NavBar />
        <div className="connexionContent">
          <h3>Connexion</h3>
          <p className="signLink">
            Vous avez deja un compte ?
            <Link to={"/E-SHOP/login"}>Connectez vous ici</Link>
          </p>
          <CreationProvider>
            <CarteInscription />
          </CreationProvider>
        </div>
        <div className="degrade"></div>
      </div>
      <Footer />
    </div>
  );
}
export default Inscription;
