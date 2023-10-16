import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { panierContext } from '../../../App'
import Footer from '../footer/footer'
import NavBar from '../Header/navBar'
import './commandeStyle.css'



export const Ticket=()=>{
    const panier=useContext(panierContext)
    return <div className='ticket'>
        <div className="titreC">
            <p>Commande</p>
            <button>X</button>
        </div>
        {
            panier.panier.map(item=>{
                return <div className="commandItem" key={item.id}>
                <img src={`../../../.${item.image}`} alt="produit" />
                <div>
                    <p>{item.categorie}</p>
                    <h3>{item.name}</h3>
                    <h1>{item.prix}€  <span>X {item.quantite}</span></h1>
                </div>
            </div>
            })
        }

<ReUse/>
    </div>
}

const ReUse=()=>{
    let panier=useContext(panierContext)
    return <div className='ReUse'>
        <div className="Use"> 
            <input type="text" placeholder='Code promo'/>
            <button>AJOUTER</button>
        </div>
        <div className="Use">
            <div>
                <p>Total</p>
               <h3>{panier.totale}</h3>
            </div>
            <div>
                <p>Réduction</p>
               <h3>-</h3>
            </div>
            <div>
                <p>Taxe</p>
               <h3>-</h3>
            </div>
        </div>
        <div className="non">
            <div>
                <h3>Total</h3>
               <h3>{panier.totale}</h3>
            </div>
        </div>
    </div>
}

const ActionButton=()=>{
    let nav=useNavigate()
    const allerA=(lien)=>{
        nav(lien)
    }
    return <div className='actionButton2'>
        <button className='btn1' onClick={()=>allerA('/E-SHOP/panier')}>REVENIR AU PANIER</button>
        <button className='btn2' onClick={()=>allerA('/E-SHOP/connection')}>VALIDER MON ACHAT</button>
    </div>
}


function Commande(){
    let nav=useNavigate()
    const allerA=(lien)=>{
        nav(lien)
    }
return <div className='commande'>
    <NavBar/>
    <div className="mainComponent">
        <p><span onClick={()=>allerA('/')}>E- shop</span>
         / <span onClick={()=>allerA('/E-SHOP/panier')}>Panier</span>
          / Récapitulatif de la commande</p>
        <Ticket/>
        <ActionButton/>
    </div>
    <Footer/>
</div>
}
export default Commande