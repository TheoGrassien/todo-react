import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";

function App() {
  /**
   * États des champs du formulaire
   * TODO: Écrire un hook personnalisé qui applique les champs du formulaire de manière plus générique :
   * - Le Hook doit exposer un handler sur onChange qui devra être utilisé par tous les composants de type <InputText /> et <Radio />.
   * - Le hook doit exposer toutes les valeurs des champs de texte du formulaire, de la manière suivante ci-après like so: { streetName: '', zipCode: '', ...etc }
   * - Supprimer tous les React.useState individuels
   * - Supprimer tous les handlers onChange individuels, comme handleZipCodeChange par exemple
   */
  const [zipCode, setZipCode] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");
  /**
   * États des résultats
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Actions Redux
   */
  const { addAddress } = useAddressBook();

  /**
   * onChange handlers sur les champs de texte
   */
  const handleZipCodeChange = (e) => setZipCode(e.target.value);

  const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);

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

  return (
    <main>
      <Section>
        <h1>
          Créez votre propre carnet d'adresses !
          <br />
          <small>
          Entrez une adresse (rue et numéro de rue) et son code postal et c'est fini ! 👏
          </small>
        </h1>
        {/* TODO: Créer un composant <Form /> générique pour afficher les lignes du formulaire de l'adresse. Ajoutez une légende et un bouton de soumission du formulaire. */}
        <form onSubmit={handleAddressSubmit}>
          <fieldset>
            <legend>🏠 Trouver une adresse</legend>
            <div className="form-row">
              <InputText
                name="streetName"
                onChange={handleZipCodeChange}
                placeholder="Adresse complète"
                value={zipCode}
              />
            </div>
            <div className="form-row">
              <InputText
                name="zipCode"
                onChange={handleHouseNumberChange}
                value={houseNumber}
                placeholder="Code postal"
              />
            </div>
            <Button type="submit">Rechercher</Button>
          </fieldset>
        </form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Créer un composant <Form /> générique pour afficher les lignes du formulaire dédiées aux informations de contact. Légendez et ajouter un bouton "Soumettre". */}
        {selectedAddress && (
          <form onSubmit={handlePersonSubmit}>
            <fieldset>
              <legend>✏️ Ajouter des informations personnelles à l'adresse</legend>
              <div className="form-row">
                <InputText
                  name="firstName"
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
              </div>
              <div className="form-row">
                <InputText
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
              </div>
              <Button type="submit">Add to addressbook</Button>
            </fieldset>
          </form>
        )}

        {/* TODO: Créer un composant <ErrorMessage /> pour afficher un message d'erreur. */}
        {error && <div className="error">{error}</div>}

        {/* TODO: Ajouter un bouton pour réinitialiser tous les champs du formulaire. Le bouton doit avoir une apparence différente du bouton primaire par défaut (qui est de classe .primary). Cf. design. */}
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
