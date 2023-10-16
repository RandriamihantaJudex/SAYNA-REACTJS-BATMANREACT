import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { panierContext } from "../../../App";
import Footer from "../footer/footer";
import NavBar from "../Header/navBar";
import "./panierStyle.css";


const BarNav = () => {
    let nav=useNavigate() 
    const allerA=()=>{
        nav('/')
    }
  return (
    <div className="navG">
      <p><span onClick={()=>allerA()}>E-shop</span>/ Panier</p>
      <img src="../../../../assets/icones/icone_1.png" alt="cart" />
    </div>
  );
};

const PanierItems = () => {
     let dataPanier=useContext(panierContext)
     const plusMoins=(id,operateur)=>{
       dataPanier.modPanier(id,operateur)
     }
     
  return (
    <div>
        {
            dataPanier.panier.map(item=>{
                return  <div className="produit" key={item.id}>
                <img src={`../../../.${item.image}`} alt="produit" />
                <div className="nom">
                  <p>{item.name}</p>
                  <p>Numéro de produit {item.id}</p>
                </div>
                <p className="prix">{item.prix}€</p>
                <div className="delete">
                  <div>
                    <button onClick={()=>plusMoins(item.id,'moins')}>-</button>
                    <p>{item.quantite}</p>
                    <button onClick={()=>plusMoins(item.id,'plus')}>+</button>
                  </div>
                  <button className="btnSupp" onClick={()=>dataPanier.deletePanier(item.id)}>X</button>
                </div>
              </div>
            })
        }
     
    </div>
  );
};

const CommandeBtn=()=>{
  let nav=useNavigate()
    const allerA=(lien)=>{
        nav(lien)
    }
    return <div className="CommandeBtn">
<button >CONTINUER MES ACHATS</button>
<button onClick={()=>allerA('./commande')}>PASSER LA COMMANDE</button>
    </div>
}
function Panier() {
    let dataPanier=useContext(panierContext)
  return (
    <div className="panier">
      <NavBar />
      <div className="MainComponent">
        <BarNav />
        <p className="titre">Récapitulatif du panier</p>
        <PanierItems />
        <div className="calcule">
            <p>SOUS TOTAL</p>
            <p className="total">{dataPanier.totale}€</p>
        </div>
      </div>
      <CommandeBtn/>
      <Footer/>
    </div>
  );
}
export default Panier;
