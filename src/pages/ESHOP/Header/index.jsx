import NavBar from "./navBar";
import "./style.css";
import "./../../../style/styleGlobale.css";
import { useContext, useState } from "react";
import { listeProduit } from "./variable/variable";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { panierContext } from "../../../App";
import { Ticket } from "../commande/commande";


const categoryList = [
  "bestsellers",
  "Goodies",
  "vetement",
  "Affiches/posters",
  "comics",
  "Multimédia",
  "Équipement",
  "Bijoux",
  "Véhicules",
];
const couleur = [];
const univers = [
  "The Batman",
  "The dark knight rises",
  "Batman V Superman",
  "Batman et Robin",
  "Autres (comics, dessin animés)",
];

const filtreContext = createContext();
const FiltreProvider = ({ children }) => {
  const [produits, setProduits] = useState(listeProduit);
  function changeProduit(value) {
    setProduits(value);
  }
  return (
    <filtreContext.Provider value={{ produits, changeProduit }}>
      {children}
    </filtreContext.Provider>
  );
};

const Presentation = () => {
  return (
    <div className="presentationComponent">
      <p>RECUPERER LE FLOW DE BATMAN AVEC NOTRE E-SHOP !</p>
    </div>
  );
};

const BarBas = () => {
  return (
    <div className="downArrow" >
      <img src="../../../../assets/icones/flèche_down_header.png" alt="arrowDown" />
    </div>
  );
};





const Category = ({ title, list }) => {
  let listChoix = [];
  const element = useContext(filtreContext);
  let nouveauValeur = [];
  const checked = (e) => {
    console.log();
    if (title === "Catégorie") {
      if (e.target.checked === true) {
        listChoix = [...listChoix, e.target.value];
        for (let index = 0; index < listeProduit.length; index++) {
          if (listeProduit[index].categorie === e.target.value) {
            if (nouveauValeur.length === 0) {
              nouveauValeur = listeProduit.filter(
                (filtre) => filtre.categorie === e.target.value
              );
            } else {
              nouveauValeur = [...nouveauValeur, listeProduit[index]];
            }
          }
        }
      } else {
        listChoix = listChoix.filter(
          (element) => element.categorie !== e.target.value
        );
        nouveauValeur = nouveauValeur.filter(
          (element) => element.categorie !== e.target.value
        );
      }
    } else if (title === "Univers") {
      if (e.target.checked === true) {
        listChoix = [...listChoix, e.target.value];
        for (let index = 0; index < listeProduit.length; index++) {
          if (listeProduit[index].univers === e.target.value) {
            if (nouveauValeur.length === 0) {
              nouveauValeur = listeProduit.filter(
                (filtre) => filtre.univers === e.target.value
              );
            } else {
              nouveauValeur = [...nouveauValeur, listeProduit[index]];
            }
          }
        }
      } else {
        listChoix = listChoix.filter(
          (element) => element.univers !== e.target.value
        );
        nouveauValeur = nouveauValeur.filter(
          (element) => element.univers !== e.target.value
        );
      }
    }
    else if (title === "Couleurs") {
      if (e.target.checked === true) {
        listChoix = [...listChoix, e.target.value];
        for (let index = 0; index < listeProduit.length; index++) {
          if (listeProduit[index].couleur === e.target.value) {
            if (nouveauValeur.length === 0) {
              nouveauValeur = listeProduit.filter(
                (filtre) => filtre.couleur === e.target.value
              );
            } else {
              nouveauValeur = [...nouveauValeur, listeProduit[index]];
            }
          }
        }
      } else {
        listChoix = listChoix.filter(
          (element) => element.couleur !== e.target.value
        );
        nouveauValeur = nouveauValeur.filter(
          (element) => element.couleur !== e.target.value
        );
      }
    } 
    else {
      console.log("Autre");
    }
    element.changeProduit(nouveauValeur);
  };
  return (
    <>
      <div className="titre1">
        <p>{title}</p>
        <p>Image</p>
      </div>
      <div className="categoryItem">
        {list.map((item) => {
          return (
            <div key={item} className="componentCategory">
              <div className="checkDiv">
                <input
                  onChange={checked}
                  value={item}
                  type="checkbox"
                  name="category"
                  className="checkBox"
                />
                <label htmlFor="caterory">{item}</label>
              </div>
              <p>(123)</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Filtre = () => {
  const [prixChosen, setPrixChosen] = useState(0);
  const element = useContext(filtreContext);

  const handleChange = (e) => {
    setPrixChosen(e.target.value);
    let lolo = [];
    for (let index = 0; index < listeProduit.length; index++) {
      if (listeProduit[index].prix < e.target.value) {
        lolo = [...lolo, listeProduit[index]];
      }
    }
    element.changeProduit(lolo);
  };

  return (
    <form action="">
      <label htmlFor="prix">Prix</label>
      <input
        className="rangeStyle"
        type="range"
        name="prix"
        min="0"
        value={prixChosen}
        max="200"
        id="prix"
        onChange={handleChange}
      />
      <div className="prixRange">
        <p>0$</p>
        <p>{prixChosen}</p>
        <p>200$</p>
      </div>
      <Category title="Catégorie" list={categoryList} />
      <Category title="Couleur" list={couleur} />
      <Category title="Univers" list={univers} />
    </form>
  );
};
const BoutonAjout=({produit})=>{
  const [isTrue,setIsTrue]=useState(false)
  let dataPanier = useContext(panierContext);
  const addToCart = (item) => {
    dataPanier.addPanier(item);
    setIsTrue(true);
  };
  const deleteToCart = (item) => {
    dataPanier.deletePanier(item);
    setIsTrue(false);
  };
  return <>
   {!isTrue ? (
          <button  onClick={() => addToCart(produit)}>
            AJOUTER AU PANIER
          </button>
        ) : (
          <button  onClick={() => deleteToCart(produit.id)}>
            SUPPRIMER DU PANIER
          </button>
        )}
  </>
}

const ProductCard = ({ item }) => {
  const dataPanier=useContext(panierContext)
  //........ AJOUTER LE PRODUIT EN PANIER 
  const addPanier=(id)=>{
    let newItem
      for (let index = 0; index < listeProduit.length; index++) {
        if(id===listeProduit[index].id){
          newItem=listeProduit[index]
        }
      }
      dataPanier.addPanier(newItem)
  }
  

  const Mybackground = {
    background: `url(${item.image})`,
    backgroundPosition: "center",
    backgroundSize: "104%",
    backgroundRepeat: "no-repeat",
  };
  let nav=useNavigate()
  const lien=(id)=>{
        nav(`E-SHOP/produit/${id}`)
  }
  return (
    <div className="ficheProduct" >
      <div className="imageProduit" onClick={()=>lien(item.id)}>
        <div className="imageDiv" style={Mybackground}>
          <div>
            {item.promo !== false ? (
              <div className="offre">SALE</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="offre">Coeur</div>
        </div>
        <div className="imagePresentation">
          <p>{item.name}</p>
          <div className="deuxP">
            {item.prixDepart !== "" && <p>{item.prixDepart}</p>}
            <p>{item.prix}$</p>
          </div>
        </div>
      </div>
      <BoutonAjout produit={item}/>
    </div>
  );
};

const ProductList = () => {
  const element = useContext(filtreContext);
  return (
    <div className="ProductList">
      <div className="titreComponent">
        <p className="resultat">Resultat:VARIABLE</p>
        <p>Trier par IMAGE</p>
      </div>
      <div className="productConteneur">
        {element.produits.map((item) => {
          return <ProductCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default function Header() {
  let nav=useNavigate()
  const lien=()=>{
        nav(`E-SHOP/panier`)
  }
  return (
    <div className="header">
      <NavBar />
      <Presentation />
      <BarBas />
      <div className="cartDiv"> <img onClick={()=>lien()} src="../../../../assets/icones/icone_1.png" alt="cart" /> </div>
      <div className="titleFilter"> Filtre </div>
      <div className="elementEshop">
        <FiltreProvider>
          <Filtre />
          <ProductList />
        </FiltreProvider>
      </div>
    </div>
  );
}
