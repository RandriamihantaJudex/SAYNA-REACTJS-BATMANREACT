import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { panierContext } from "../../../App";
import { Ticket } from "../commande/commande";
import Footer from "../footer/footer";
import NavBar from "../Header/navBar";
import "./connectionStyle.css";

let ListUsers = [];

export const TicketCommande = () => {
  return (
    <div className="ticketCommande">
      <Ticket />
    </div>
  );
};

export const ChampsSans = ({ nom, place, cle }) => {
  const connexionAction = useContext(userContext);
  return (
    <>
      <label htmlFor={nom}>{nom}</label>
      <input
        type="text"
        name={nom}
        placeholder={place}
        onChange={(e) => connexionAction.notUserHandleChange(e, cle)}
      />
    </>
  );
};

export const Champs = ({ nom, place }) => {
  return (
    <>
      <label htmlFor={nom}>{nom}</label>
      <input type="text" name={nom} placeholder={place} />
    </>
  );
};

const ChampsSignIn = ({ nom, place, cle }) => {
  const connexionAction = useContext(userContext);
  return (
    <>
      <label htmlFor={nom}>{nom}</label>
      <input
        type="text"
        name={nom}
        placeholder={place}
        onChange={(e) => connexionAction.SignInHandleChange(e, cle)}
      />
    </>
  );
};

export const ChampsSpecial = ({ nom }) => {
  const connexionAction = useContext(userContext);
  return (
    <>
      <p className="myP">{nom}</p>
      <div className="inputNew">
        <img src="../../../../assets/icones/icone_5.png" alt="lock" />
        <input
          type="text"
          className="myInput"
          placeholder={nom}
          onChange={(e) => connexionAction.handleChange(e)}
        />
      </div>
    </>
  );
};
const ChampsSpecialSignIn = ({ nom, cle }) => {
  const connexionAction = useContext(userContext);
  return (
    <>
      <p className="myP">{nom}</p>
      <div className="inputNew">
        <img src="../../../../assets/icones/icone_5.png" alt="lock" />
        <input
          type="text"
          className="myInput"
          placeholder={nom}
          onChange={(e) => connexionAction.SignInHandleChange(e, cle)}
        />
      </div>
    </>
  );
};

 const ChampsSpecialEmail = ({ nom, place }) => {
  const connexionAction = useContext(userContext);
  return (
    <>
      <p className="myP">{nom}</p>
      <div className="inputNew">
        <img src="../../../../assets/icones/icone_4.png" alt="lock" />
        <input
          type="text"
          className="myInput"
          placeholder={place}
          onChange={(e) => connexionAction.handleChange(e)}
        />
      </div>
    </>
  );
};

const userContext = createContext();
const UserProvider = ({ children }) => {
  let globaldata=useContext(panierContext)
  let userList = globaldata.usersList;
  const [UserData, setUserData] = useState({ identifiant: "", password: "" });
  const [notUser, setNotUser] = useState({});
  const [SignIn, setSignIn] = useState({});
  let naviger=useNavigate()
    const navigerVers=(lien)=>{
        naviger(lien)
    }

    const versAchatNotUser=(e)=>{
      e.preventDefault()
      globaldata.setOther(notUser)
      navigerVers('/E-SHOP/achat')
    }

  const notUserHandleChange = (e, nomduchamps) => {
    let newNotUser = { ...notUser, [nomduchamps]: e.target.value };
    e.preventDefault();
    setNotUser(newNotUser);
  };
  const SignInHandleChange = (e, nomduchamps) => {
    let newNotUser = { ...SignIn, [nomduchamps]: e.target.value };
    e.preventDefault();
    setSignIn(newNotUser);
  };
  const ConfirmationSignIn = (e) => {
    e.preventDefault();
    let nbrKey = Object.keys(SignIn).length;
    let cle = Object.keys(SignIn);
    let isEmpty = false;
    for (let index = 0; index < cle.length; index++) {
      if (SignIn[cle[index]] === "") {
        isEmpty = true;
      }
    }
    if (nbrKey === 5) {
      if (!isEmpty) {
        if (SignIn.password === SignIn.passwordConfirm) {
          globaldata.addNewUser(SignIn)
          // globaldata.addSetOther("fdfdfdf")
          // console.log(globaldata.other);
          // console.log(SignIn);
           navigerVers("/E-SHOP/achat")
          // globaldata.setittest(SignIn)
        } else {
          console.log("mot de passe different");
        }
      } else {
        console.log("Veuillez remplir tout les champs");
      }
    } else {
      console.log("cas non repertorie");
    }
  };

  const handleChange = (e) => {
    e.target.placeholder === "Email"
      ? setUserData({ ...UserData, identifiant: e.target.value })
      : setUserData({ ...UserData, password: e.target.value });
  };
  const valider = (e) => {
    e.preventDefault();
    for (let index = 0; index < userList.length; index++) {
      if (
        UserData.password === userList[index].password &&
        UserData.identifiant === userList[index].identifiant
      ) {
        globaldata.setActualUser(userList[index])
        navigerVers('/E-SHOP/achat')
      } else {
        console.log("erreur");
      }
    }
  };
  return (
    <userContext.Provider
      value={{
        handleChange,
        valider,
        notUserHandleChange,
        SignInHandleChange,
        ConfirmationSignIn,
        notUser, 
        setNotUser,
        versAchatNotUser
      }}
    >
      {children}
    </userContext.Provider>
  );
};

const FormInscription = () => {
  const connexionAction = useContext(userContext);
  return (
    <form>
      <ChampsSignIn nom={"Nom"} place={"Nom"} cle={"nom"} />
      <ChampsSignIn nom={"Prenom"} place={"Prenom"} cle={"prenom"} />
      <ChampsSignIn nom={"Identifiant"} place={"Email"} cle={"email"} />
      <ChampsSpecialSignIn nom={"Mot de passe"} cle={"password"} />
      <ChampsSpecialSignIn
        nom={"Confirmer votre mot de passe"}
        cle={"passwordConfirm"}
      />
      <div className="terme">
        <p className="PTerme">
          Je reconnais avoir pris connaissance et j’accepte les termes des
          conditions générales d utilisation.
        </p>
        <img src="../../../../assets/icones/icone_5.png" alt="lock" />
      </div>
      <button
        className="validerForm"
        onClick={(e) => connexionAction.ConfirmationSignIn(e)}
      >
        VALIDER
      </button>
      <div className="ligneDiv">
        <p className="Pconnect">Connecter vous avec</p>
        <p className="ligneWhite"></p>
      </div>
      <div className="iconsDiv">
        <img src="../../../../assets/logos/logo_8.png" alt="lock" />
        <img src="../../../../assets/logos/logo_4.2.png" alt="lock" />
        <img src="../../../../assets/logos/logo_7.png" alt="lock" />
      </div>
    </form>
  );
};

export const FormConnection = () => {
  const connexionAction = useContext(userContext);
  return (
    <form>
      <ChampsSpecial nom={"Mot de passe"} />
      <ChampsSpecialEmail nom={"Identifiant"} place={"Email"} />
      <div className="ligneDiv">
        <p className="Pconnect">Mot de passe oublié</p>
        <p className="ligneWhite"></p>
      </div>
      <button
        className="validerForm"
        onClick={(e) => connexionAction.valider(e)}
      >
        VALIDER
      </button>
      <div className="ligneDiv">
        <p className="Pconnect">Connecter vous avec</p>
        <p className="ligneWhite"></p>
      </div>
      <div className="iconsDiv">
        <img src="../../../../assets/logos/logo_8.png" alt="lock" />
        <img src="../../../../assets/logos/logo_4.2.png" alt="lock" />
        <img src="../../../../assets/logos/logo_7.png" alt="lock" />
      </div>
    </form>
  );
};

const CarteLogin = () => {
  const [isConnect, setIsConnect] = useState(true);

  const change = (test) => {
    if (test) {
      setIsConnect(!isConnect);
    }
  };
  return (
    <div className="logIn">
      {!isConnect ? (
        <div className="switchMode">
          <button className="btnCourbe" onClick={() => change(false)}>
            Connection
          </button>
          <button className="btnCourbe2" onClick={() => change(true)}>
            Inscription
          </button>
        </div>
      ) : (
        <div className="switchMode">
          <button className="btnCourbe3" onClick={() => change(true)}>
            Connection
          </button>
          <button className="btnCourbe4" onClick={() => change(false)}>
            Inscription
          </button>
        </div>
      )}
      {!!isConnect ? <FormInscription /> : <FormConnection />}
    </div>
  );
};

export const CheckBox = ({ texte, nom }) => {
  return (
    <div className="CheckBox">
      <input type="checkbox" name={nom} className="highFive" />
      <label htmlFor={nom}>{texte}</label>
    </div>
  );
};

const FormSansInscription = () => {
  const localData=useContext(userContext)
  return (
    <form className="FormSansInscription">
      <div className="deuxPartie">
        <div>
          <ChampsSans nom={"Nom"} place={"Nom"} cle={"Nom"} />
        </div>
        <div>
          <ChampsSans nom={"Prenom"} place={"Prenom"} cle={"Prenom"} />
        </div>
      </div>
      <ChampsSans nom={"Email"} place={"Email"} cle={"Email"} />
      <ChampsSans nom={"Adresse"} place={"Adresse"} cle={"Adresse"} />
      <div className="deuxPartie">
        <div>
          <ChampsSans
            nom={"Code postale"}
            place={"Code postale"}
            cle={"CodePostal"}
          />
        </div>
        <div>
          <ChampsSans nom={"ville"} place={"ville"} cle={"Ville"} />
        </div>
      </div>
      <ChampsSans nom={"Pays"} place={"Pays"} cle={"Pays"} />
      <ChampsSans
        nom={"Numéro de téléphone"}
        place={"Numéro de téléphone"}
        cle={"telephone"}
      />
      <CheckBox
        texte={"Sauvegarder ces informations pour un prochain achat"}
        nom={"save"}
      />
      <CheckBox
        texte={"Recevoir les notifications relatives à l achat par SMS"}
        nom={"receive"}
      />
      <button type="submit" className="submitButton" onClick={(e)=>localData.versAchatNotUser(e)}>
        Continuer vers le payement
      </button>
    </form>
  );
};

const Authentification = () => {
  return (
    <div className="Authentification">
      <p>Authentification</p>
      <CarteLogin />
      <div className="divAchat">
        <p>Achat sans inscription</p>
        <img src="../../../../assets/icones/down.PNG" alt="down" />
      </div>
      <p className="labelSaisie">
        Saisissez les informations pour la livraison :
      </p>
      <FormSansInscription />
    </div>
  );
};

export const Grid = ({ children }) => {
  return <div className="grid">{children}</div>;
};

function Connection() {
  return (
    <div className="connection">
      <NavBar />
      <div className="main">
        <p className="navElement">
          E- shop / Panier / Récapitulatif de la commande / Authentification
        </p>
        <Grid>
            <UserProvider>
            <Authentification />
          </UserProvider>
          <TicketCommande />
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
export default Connection;
