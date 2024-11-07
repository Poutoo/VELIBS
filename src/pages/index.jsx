import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import './index.css';

async function getVisiteur(leLogin, leMdp) {

    try {
        const response = await api.get('/connexion', {
            params: {
                login: leLogin,
                mdp: leMdp
            },
        });
        return response;
    }
    catch (error) {
        console.log("ERREUR connexion API", error)
    }
    
}

function Index() {
    const loginDev = "dev";
    const passwordDev = "dev";
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

    /*const connection = (event) => {
        event.preventDefault();
        if (login === loginDev && password === passwordDev) {
            setErrorLogin(false);
            navigate('/accueil', {
                state: {
                    login: login,
                    password: password
                }
            });
        } else {
            setErrorLogin(true);
        }
    };*/

    const connection = async (event) => {
        event.preventDefault();
        const response = await getVisiteur(login, password);
        if (response && response.data != null) {
            console.log(response.data);
            setSuccessLogin(true);
            setErrorLogin(false);
            navigate('/accueil', {
                state: {
                    login: login,
                }
            });
        } else {
            setErrorLogin(true);
            setSuccessLogin(false);
            
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Galaxy Swiss Bourdin
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Identifiez-vous
                            </h1>
                            {errorLogin && <div className="bg-red-500 text-white p-4 rounded">Erreur d’authentification</div>}
                            {successLogin && <div className="bg-green-500 text-white p-4 rounded">Authentification réussi</div>}
                            <form className="space-y-4 md:space-y-6" onSubmit={connection}>
                                <div>
                                    <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                                    <input type="text" name="login" value={login} onChange={e => setLogin(e.target.value)} id="login" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="utilisateur" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Index;
