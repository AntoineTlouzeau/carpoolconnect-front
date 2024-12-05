import logo from "../../assets/image/logos/Logo2_HD.png"
import { Link } from "react-router-dom";
import facebook from "../../assets/Icônes/Icon_Facebook.png"
import instagram from "../../assets/Icônes/Icon_Instagram.png"
import linkedin from "../../assets/Icônes/Icon_Linkedin.png"



const Footer = () => {

    return (
        <footer className="bg-cobalt p-8 w-full text-white">
            <div>
                <div className="flex flex-row pb-10 justify-between">
                    <div>
                        <ul>
                            <li><img src={logo} alt="" className=" sm:h-8 mb-4 " /></li>
                            <li className="font-semibold mb-4">Suivez nous</li>
                            <li>
                                <p className="flex"><img src={facebook} alt="" className="sm:h-5 pr-2 mb-2" />Facebook</p></li>
                            <li>
                                <p className="flex"><img src={instagram} alt="" className="sm:h-5 pr-2 mb-2" />Instagram</p>
                            </li>
                            <li>
                                <p className="flex"><img src={linkedin} alt="" className="sm:h-5 pr-2 mb-2" />LinkedIn</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-2">
                        <ul>
                            <li className="font-semibold mb-4">Upool</li>
                            <li className="mb-2"><Link to="/">Accueil</Link></li>
                            <li className="mb-2"><Link to="/">À Propos</Link></li>
                            <li className="mb-2"><Link to="/">Profil</Link></li>
                            <li className="mb-2"><Link to="/">Trajets</Link></li>
                        </ul>
                    </div>
                    <div className="mt-2">
                        <ul>
                            <li className="font-semibold mb-4">Vous informer</li>
                            <li className="mb-2"><Link to="/">Itinéraires populaires</Link></li>
                            <li className="mb-2"><Link to="/">Aide</Link></li>
                            <li className="mb-2"><Link to="/">Contactez-nous</Link></li>
                            <li className="mb-2"><Link to="/">Abonnement Upool</Link></li>
                        </ul>
                    </div>

                </div>
                <hr className="pb-8" />
                <div className="flex justify-between text-sm">
                    <span>© 2023 - Tous droits réservés.. </span>
                    <span className="underline flex justify-around">
                        <Link to="/" className="pr-2">Politique de confidentialité</Link>
                        <Link to="/" className="pr-2">Conditions d'utilisation</Link>
                        <Link to="/">Paramètre de cookies</Link>
                    </span>

                </div>
            </div>
        </footer>
    )

}

export default Footer;