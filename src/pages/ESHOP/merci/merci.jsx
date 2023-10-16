import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import NavBar from "../Header/navBar";
import "./merciStyle.css";

function Merci() {
    let naviger=useNavigate()
    const navigerVers=(lien)=>{
        naviger(lien)
    }
  return (
    <div className="merci">
      <NavBar />
      <div className="mainThanks">
        <p>
          E- shop / Panier / Récapitulatif de la commande / Authentification
          /Livraison et paiement / Achat confirmé
        </p>
        <div className="circle">
          <div className="backGround">
            <p className='merciP'>Merci pour votre commande !</p>
            <p className="longText">
              Nous mettons nos meilleurs agents sur le coup en espérant que le
              Joker ne les occupera pas trop ! Retrouvez le détail de votre
              commande ci-dessous et dans le mail de confirmation envoyé à
              l’adresse mail renseignée. Vous n’avez pas reçu le mail ? Renvoyer
              la confirmation d’achat.
            </p>
            <div className="button2">
              <button className="btn1" onClick={()=>navigerVers('/')}>REVENIR A L'ACCUEIL</button>
              <button className="btn2" onClick={()=>navigerVers('/')}>RETOURNER AU CATALOGUE</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Merci;
