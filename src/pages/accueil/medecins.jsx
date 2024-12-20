import '../index.css'
import Medecin from '../../composants/leMedecin';


function Medecins() {

    return (
        <>
        <div className="text-gray-500 dark:text-gray-300">
            <br />
            <h1 className='text-center'>Page des medecins</h1>
        <Medecin />
        </div>
        </>
    );
}

export default Medecins;