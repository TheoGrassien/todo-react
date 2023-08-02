import React from 'react';

import Address from './ui/components/Address/Address';
import AddressBook from './ui/components/AddressBook/AddressBook';
import Button from './ui/components/Button/Button';
import InputText from './ui/components/InputText/InputText';
import Radio from './ui/components/Radio/Radio';
import Section from './ui/components/Section/Section';
import ErrorMessage from './ui/components/ErrorMessage/ErrorMessage';
import Form from './ui/components/Form/Form';
import transformAddress from './core/models/address';
import useAddressBook from './ui/hooks/useAddressBook';
import useForm from './ui/hooks/useForm';

import './App.css';

function App() {
  /**
   * États des champs du formulaire
   * TODO: Écrire un hook personnalisé qui applique les champs du formulaire de manière plus générique :
   * - Le Hook doit exposer un handler sur onChange qui devra être utilisé par tous les composants de type <InputText /> et <Radio />.
   * - Le hook doit exposer toutes les valeurs des champs de texte du formulaire, de la manière suivante ci-après like so: { streetName: '', zipCode: '', ...etc }
   * - Supprimer tous les React.useState individuels
   * - Supprimer tous les handlers onChange individuels, comme handleZipCodeChange par exemple
   */

  // Déclaration des états des champs du formulaire
  const { data, handleChange, setData } = useForm({
    streetName: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    selectedAddress: '',
  });

  const { streetName, zipCode, firstName, lastName, selectedAddress } = data;
  /**
   * États des résultats
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Actions Redux
   */
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    /** TODO: Récupérer les adresses en fonction du nom complet de la rue (streetName) et du code postal (zipCode)
     * - URL d'exemple de l'API : https://api-adresse.data.gouv.fr/search/?q=8 bd du port&postcode=44380&limit=1&autocomplete=1
     * - Documentation de l'API : https://adresse.data.gouv.fr/api-doc/adresse
     * - Gérer les erreurs si elles se produisent (adresse non trouvée par ex.)
     * - Gérer la réponse réussie en mettant à jour les `adresses` dans l'état à l'aide de `setAddresses`
     * - Assurez-vous d'ajouter le numéro de rue (houseNumber) à chaque adresse trouvée dans la réponse à l'aide de la fonction `transformAddress()`
     * - Bonus : Ajouter un état de chargement dans l'interface utilisateur pendant la récupération des adresses pour afficher les adresses suggérées : le JSON renvoyé est dynamique comme montré dans la documentation (bas de page)
     */

    const url = `https://api-adresse.data.gouv.fr/search/?q=${streetName}&postcode=${zipCode}&autocomplete=1`;

    // Appel api
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Vérifier si des adresses ont été trouvées
        if (data.features && data.features.length > 0) {
          // Transformer chaque adresse trouvée
          const addresses = data.features.map((feature) =>
            transformAddress({
              firstName: firstName,
              lastName: lastName,
              city: feature.properties.city,
              housenumber: feature.properties.housenumber,
              lat: feature.geometry.coordinates[1],
              lon: feature.geometry.coordinates[0],
              postcode: feature.properties.postcode,
              street: feature.properties.street,
            })
          );
          // Mettre à jour les adresses
          setAddresses(addresses);
        } else {
          setError('Aucune adresse trouvée.');
        }
      })
      .catch((error) => {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "Aucune adresse selectionnée. Essayez de sélectionner une adresse ou cherchez-en une si vous n'en avez pas."
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };

  const resetForm = () => {
    setData({
      streetName: '',
      zipCode: '',
      firstName: '',
      lastName: '',
      selectedAddress: '',
    });
    setAddresses([]);
    setError(undefined);
  };

  return (
    <main>
      <Section>
        <h1>
          Créez votre propre carnet d'adresses !
          <br />
          <small>
            Entrez une adresse (rue et numéro de rue) et son code postal et
            c'est fini ! 👏
          </small>
        </h1>
        {/* TODO: Créer un composant <Form /> générique pour afficher les lignes du formulaire de l'adresse. Ajoutez une légende et un bouton de soumission du formulaire. */}
        <Form
          onSubmit={handleAddressSubmit}
          legend="🏠 Trouver une adresse"
          submitBtnText="Rechercher"
        >
          <InputText
            name="streetName"
            onChange={handleChange}
            placeholder="Adresse complète"
            value={streetName}
          />
          <InputText
            name="zipCode"
            onChange={handleChange}
            value={zipCode}
            placeholder="Code postal"
          />
        </Form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Créer un composant <Form /> générique pour afficher les lignes du formulaire dédiées aux informations de contact. Légendez et ajouter un bouton "Soumettre". */}
        {selectedAddress && (
          <Form
            onSubmit={handlePersonSubmit}
            legend="✏️ Ajouter des informations personnelles à l'adresse"
            submitBtnText="Add to addressbook"
          >
            <InputText
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              value={firstName}
            />
            <InputText
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              value={lastName}
            />
          </Form>
        )}

        {/* TODO: Créer un composant <ErrorMessage /> pour afficher un message d'erreur. */}
        <ErrorMessage error={error} />

        {/* TODO: Ajouter un bouton pour réinitialiser tous les champs du formulaire. Le bouton doit avoir une apparence différente du bouton primaire par défaut (qui est de classe .primary). Cf. design. */}
        <Button variant="secondary" onClick={resetForm}>
          Réinitialiser tous les champs
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
