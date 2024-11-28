import { useLocation } from 'react-router-dom';
import '../index.css'
import Medecin from '../../composants/leMedecin';

function Medecins() {

    return (
        <>
    <h1>Page des medecins</h1>
        <Medecin />
        </>
    );
}

export default Medecins;