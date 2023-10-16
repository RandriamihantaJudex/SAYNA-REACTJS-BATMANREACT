import { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { panierContext } from "../../../App";
import { Grid, Champs, CheckBox, TicketCommande } from "../connection/connection";
import Footer from "../footer/footer";
import NavBar from "../Header/navBar";
import "./achatStyle.css";

const RadioLivraison = ({ nom, lienImage, modeLivraison, delai, prix }) => {
  return (
    <div className="divRadio">
      <input type="radio" />
      <img src={lienImage} alt="logo" />
      <div>
        <p>{modeLivraison}</p>
        <p>{delai}</p>
        <p>{prix}</p>
      </div>
    </div>
  );
};

const ComponentAchat = () => {
  return (
    <div className="ComponentAchat">
      <p className="paragrapheLine">Livraison</p>
      <p>Choisir une méthode de livraison</p>
      <form>
        <RadioLivraison
          nom={"radio"}
          lienImage={"../../../../assets/logos/chonopast.png"}
          modeLivraison={"Livraison à domicile"}
          delai={"3 à 4 jours ouvrés"}
          prix={"3,95€"}
        />
        <RadioLivraison
          nom={"radio"}
          lienImage={"../../../../assets/logos/colissimo.png"}
          modeLivraison={"Livraison à domicile"}
          delai={"3 à 4 jours ouvrés"}
          prix={"3,95€"}
        />
        <RadioLivraison
          nom={"radio"}
          lienImage={"../../../../assets/logos/relay.png"}
          modeLivraison={"Livraison en point relai"}
          delai={" 6 à 8 jours ouvrés"}
          prix={"Gratuit"}
        />
        <div className="divide2">
            <div><Champs nom={"Nom"} place={"Nom"} /></div>
            <div><Champs nom={"Prénom"} place={"Prénom"} /></div>
        </div>
        <Champs nom={"Adresse"} place={"Adresse"} />
        <div className="divide2">
            <div><Champs nom={"Code postal"} place={"Code postal"} /></div>
            <div><Champs nom={"Ville"} place={"Ville"} /></div>
        </div>
        <select name="Pays" id="pays" >
            <option value="aucune">Pays</option>
            <option value="Madagascar">Madagascar</option>
            <option value="France">France</option>
        </select>
        <Champs nom={"Numéro de téléphone"} place={"Numéro de téléphone"} />
      </form>
      <p className="paragrapheLine paye2">Paiement</p>
      <div className="payementMode">
        <p>Séléctionner un moyen de paiement</p>
        <div className="logoMaster">
            <img src="../../../../assets/logos/E1.png" alt="logo" />
            <img src="../../../../assets/logos/E2.png" alt="logo" />
            <img src="../../../../assets/logos/E3.png" alt="logo" />
            <img src="../../../../assets/logos/E4.png" alt="logo" />
            <img src="../../../../assets/logos/E5.png" alt="logo" />
            
        </div>
      </div>
      <form className="formDome">
        <Champs nom={"Numéro de carte"} place={"Numéro de carte"} />
        <div className="divide2">
            <div><Champs nom={"Date d expiration"} place={"Date d expiration"} /></div>
            <div><Champs nom={"CVV"} place={"CVV"} /></div>
        </div>
        <Champs nom={"Nom sur la carte"} place={"Nom"} />
        <Espace pixel={5}/>
        <CheckBox texte={'L’adresse de facturation est la même que l’adresse de livraison'} nom={'adresse'}/>
        <div className="buttonContent"> <button>VALIDER ET PAYER 58,99€</button></div>
        </form>
    </div>
  );
};


export const Espace=({pixelH,pixelW})=>{
const element=useRef()
setTimeout(() => {
    element.current.style.height=`${pixelH}px`
    element.current.style.width=`${pixelW}px`

}, 100);
return <div ref={element}> </div>
}



const Recipiant=({titre,children})=>{
    return  <div className="recipiant">
    <div>
        <p className="titre">{titre}</p>
        {children}</div>
    <p className="modif">modifier {'>'}</p>
</div>
}



const ComponentAchatAvec=()=>{
  const globaData=useContext(panierContext)
  let naviger=useNavigate()
    const navigerVers=(lien)=>{
        naviger(lien)
    }
    let taille=Object.keys(globaData.other).length
    console.log(taille);
    return taille===0?
    <div className="ComponentAchatAvec">
           <Recipiant titre={`${globaData.actualUser['nom']} ${globaData.actualUser['prenom']}`}>
            <p>2 Imp. Lebouis</p>
            <p>75014 Paris</p>
            <p>France</p>
            <p>06 ** ** ** ** **</p>
           </Recipiant>
           <Recipiant titre={'Méthode de livraison'}>
            <p>Chronopost - livraison à domicile</p>
            <p>2 Imp Lebouis</p>
            <p>75014 Paris</p>
            <p>France</p>
           </Recipiant>
           <Recipiant titre={'Moyen de paiement'}>
            <p>Visa......0000 03/26</p>
    
            <p>{`${globaData.actualUser['nom']} ${globaData.actualUser['prenom']}`}</p>
           </Recipiant>

           <button onClick={()=>navigerVers('/E-SHOP/merci')}>VALIDER ET PAYER {globaData.totale}€</button>
    </div>:<div className="ComponentAchatAvec">
           <Recipiant titre={`${globaData.other['Nom']} ${globaData.other['Prenom']}`}>
            <p>{globaData.other['Adresse']}</p>
            <p>{`${globaData.other['CodePostal']} ${globaData.other['Ville']}`}</p>
            <p>{globaData.other['Pays']}</p>
            <p>{globaData.other['Telephone']}</p>
           </Recipiant>
           <Recipiant titre={'Méthode de livraison'}>
            <p>Chronopost - livraison à domicile</p>
            <p>{globaData.other['Adresse']}</p>
            <p>{`${globaData.other['CodePostal']} ${globaData.other['Ville']}`}</p>
            <p>{globaData.other['Pays']}</p>
           </Recipiant>
           <Recipiant titre={'Moyen de paiement'}>
            <p>Visa......0000 03/26</p>
    
            <p>{`${globaData.other['Nom']} ${globaData.other['Prenom']}`}</p>
           </Recipiant>

           <button onClick={()=>navigerVers('/E-SHOP/merci')}>VALIDER ET PAYER {globaData.totale}€</button>
    </div>
  
}



function Achat() {
  return (
    <div className="Achat">
      <NavBar />
      <div className="achatMain">
        <p>
          E- shop / Panier / Récapitulatif de la commande / Authentification
          /Livraison et paiement
        </p>
        <Grid>
          {/* <ComponentAchat /> */}
          <ComponentAchatAvec/>
          <TicketCommande/>
        </Grid>
        <Footer/>
      </div>
    </div>
  );
}
export default Achat;
