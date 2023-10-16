import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Header/navBar";
import { listeProduit } from "../Header/variable/variable";
import { useRef, useState } from "react";
import "./styleProduit.css";
import Footer from "../footer/footer";
import { useContext } from "react";
import { panierContext } from "../../../App";

function Produit() {
  const id = useParams();
  let OurProduit = listeProduit.filter((element) => element.id === id.id);
  let [isActive, setIsTrue] = useState(false);

  const Information = () => {
    return (
      <div className="productInformation">
        <div className="star">
          <div className="commentStar">
            <div>
              <Star note={4} />
            </div>
            <p>6 commentaire</p>
          </div>
          <p className="nomArticle">{OurProduit[0].name}</p>
        </div>

        <div className="sectionPrix">
          <h1>{OurProduit[0].prix}$</h1>
          <div>
            <p>En stock</p>
            <button>Taille M</button>
          </div>
        </div>
        <div className="actionButton">
            <BoutonAjout/>
          <button className="love">Love</button>
        </div>
        <div className="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            dignissim elit id turpis scelerisque mollis. Nulla vehicula velit
            augue, ut maximus est porttitor quis. Morbi finibus, nulla non
            consectetur convallis, eros mi sollicitudin metus, id sollicitudin
            nunc ligula eu dui. Curabitur eleifend sagittis mi, a sodales ante
            sagittis sed. Proin sed mauris tristique, dictum ipsum in, interdum
            justo. Curabitur vestibulum nec lectus nec maximus. Suspendisse
            euismod scelerisque velit at sollicitudin. Donec quis accumsan
            neque. Nullam maximus elit sem, ac varius nibh ultrices vitae.
            Curabitur in ipsum nec augue commodo luctus mollis vitae tortor.
            Proin a lacinia tellus, eu viverra odio. Sed quis mi eget massa
            pharetra facilisis in laoreet felis. Fusce ac venenatis lacus. Ut
            tempus elit feugiat tellus ultrices, quis aliquet ipsum placerat
          </p>
        </div>
      </div>
    );
  };

  const BoutonAjout=()=>{
    let dataPanier = useContext(panierContext);
    const addToCart = (item) => {
      dataPanier.addPanier(item);
      setIsTrue(true);
    };
    const deleteToCart = (item) => {
      dataPanier.deletePanier(item);
      setIsTrue(false);
    };
    return <div>
        {!isActive ? (
            <button className="add" onClick={() => addToCart(OurProduit[0])}>
              AJOUTER AU PANIER
            </button>
          ) : (
            <button className="add" onClick={() => deleteToCart(OurProduit[0])}>
              SUPPRIMER DU PANIER
            </button>
          )}
    </div>
  }


  const Supplementaire = () => {
    return (
      <div>
        <div className="reUse">
          <h3>Caracteristique</h3>
          <p>Matériaux :</p>
          <p>Couleur :</p>
          <p>Poids :</p>
          <p>Capacité :--</p>
        </div>
        <div className="reUse">
          <h3>Livraison</h3>
          <p>Livraison à domicile.</p>
          <p>Retrait en point relais.</p>
          <p>Délai de livraison 2-4 jours</p>
        </div>
        <div className="reUse">
          <h2>Commentaires</h2>
          <div className="userComment">
            <div className="noeud">
              <div>
                <Star note={1} />
              </div>
              <p className="userName">ROBBERT</p>
            </div>
            <p>11.24.45</p>
          </div>
          <p className="pComment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            dignissim elit id turpis scelerisque mollis. Nulla vehicula velit
            augue, ut maximus est porttitor quis. Morbi finibus, nulla non
            consectetur convallis, eros mi sollicitudin metus, id sollicitudin
            nunc ligula eu dui.
          </p>
        </div>
        <div className="reUse">
          <div className="userComment">
            <div className="noeud">
              <div>
                <Star note={3} />
              </div>
              <p className="userName">JOHN</p>
            </div>
            <p>11.24.45</p>
          </div>
          <p className="pComment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            dignissim elit id turpis scelerisque mollis. Nulla vehicula velit
            augue, ut maximus est porttitor quis. Morbi finibus, nulla non
            consectetur convallis, eros mi sollicitudin metus, id sollicitudin
            nunc ligula eu dui.
          </p>
        </div>
      </div>
    );
  };

  const ProduitSimilaire = () => {
    let similaire = listeProduit.filter((element) => element.id !== id.id);
    let scroolRef = useRef();
    const next = (e) =>
      e === "droite"
        ? (scroolRef.current.scrollLeft += 310)
        : (scroolRef.current.scrollLeft -= 310);

    return (
      <div className="ProduitSimilaire">
        <p>Produits similaires</p>
        <div className="componentProduct">
          <img
            src=""
            className="gauche"
            alt="gauche"
            onClick={() => next("gauche")}
          />

          <div className="cubeSimilaire" ref={scroolRef}>
            <div className="conteneurScrool">
              {similaire.map((item) => {
                return (
                  <div className="carteSimilaire" key={item.id}>
                    <img src={`../../../.${item.image}`} alt="Produit" />
                    <p>{item.name}</p>
                    <div>
                      <p className="barree">{item.prixDepart}</p>
                      <p>{item.prix}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <img
            src="../../../../assets/icones/icon_flèche_2.png"
            className="gauche"
            alt="droite"
            onClick={() => next("droite")}
          />
        </div>
      </div>
    );
  };

  const Star = ({ note }) => {
    let etoile = useRef();
    const showEtoile = () => {
      for (let index = 0; index < 5; index++) {
        if (note > index) {
          etoile.current.innerHTML +=
            '<img src="../../../../assets/icones/icone_2.png" alt="star" />';
        } else {
          etoile.current.innerHTML +=
            '<img src="../../../../assets/icones/icone_3.png" alt="star" />';
        }
      }
    };
    setTimeout(() => {
      showEtoile();
    }, 100);
    return <div className="starComponent" ref={etoile}></div>;
  };

  let nav = useNavigate();
  const allerA = () => {
    nav("/");
  };
  return (
    <div>
      <NavBar />
      <div className="component">
        <div className="infoNavigation">
          <p>
            <span onClick={() => allerA()}>E-shop</span> / Produit
          </p>
        </div>
        <div className="infoProduit">
          <div className="imageSuggestion">
            <img src={`../../../.${OurProduit[0].image}`} alt="produit" />
            <div className="similaire">
              <img
                src="../../../../assets/images/article_1.png"
                alt="produit"
              />
              <img
                src="../../../../assets/images/article_1.png"
                alt="produit"
              />
              <img
                src="../../../../assets/images/article_1.png"
                alt="produit"
              />
            </div>
          </div>
          <Information />
        </div>
        <Supplementaire />
        <div className="navigation2">
          <div>
            <img
              src="../../../../assets/icones/icon_flèche_1.png"
              alt="fleche"
            />
            <p>
              <span className="ligne">1</span>-2
            </p>
            <img
              src="../../../../assets/icones/icon_flèche_2.png"
              alt="fleche"
            />
          </div>
        </div>
        <ProduitSimilaire />
        <Footer />
      </div>
    </div>
  );
}
export default Produit;
