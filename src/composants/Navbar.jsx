import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/home/administrateur/vs/React/GSB Project/GSB/src/pages/index.css';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '/home/administrateur/vs/React/GSB Project/GSB/src/context/AuthContext.jsx'; // Assurez-vous du chemin correct
import { useProfile } from '../context/ProfileContext';

const navigation = [
  { name: 'Accueil', href: '/accueil', current: true },
  { name: 'Rapports', href: '/accueil/rapports', current: false },
  { name: 'Medecins', href: '/accueil/medecins', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const { visiteur, logout } = useContext(AuthContext); // Utiliser le contexte pour obtenir visiteur et logout
  const { profileImage } = useProfile('jinx.jpg'); // Utiliser le contexte pour obtenir l'image de profil
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

  const handleLogout = () => {
    logout(); // Appeler la fonction logout du contexte
    navigate('/'); // Rediriger vers la page de connexion
    window.location.reload(); // Rafraîchir la page
  };

  return (
    <Disclosure as="nav" className="relative bg-sky-700">
      <div className="absolute inset-0">
        <img src="jinx-5.gif" alt="Animated Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sky-700 bg-opacity-60 "></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between bg-opacity-10 bg-sky-700 ">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700  dark:hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="GSB"
                src="gsb2.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-zinc-900 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User profile"
                    src={profileImage}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/accueil/profile" // Rediriger vers la page de profil
                      className={classNames(active ? 'bg-gray-100 dark:bg-zinc-900' : '', 'block px-4 py-2 text-sm text-gray-700  dark:text-white')}
                    >
                      Profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={classNames(active ? 'bg-gray-100 dark:bg-zinc-900' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')}
                    > 
                      Settings
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(active ? 'bg-gray-100 dark:bg-zinc-900' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white')}
                    >
                      Logout
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
            {visiteur && ( 
              <span className="text-sm font-medium text-white ml-4"> 
              {visiteur.nom && visiteur.prenom ?  `${visiteur.nom} ${visiteur.prenom}` : 'aaaaa'} 
              </span>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
