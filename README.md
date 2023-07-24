# React Dev Test ⚛️

## Description

Dans ce petit cas pratique, nous évaluerons vos connaissances techniques en React et Redux.

Votre mission sera de terminer autant de TODO que possible. 

Vous les trouverez dans le code source de l'application React. Lorsque vous ouvrirez le dossier `/src` vous trouverez une application destinée aux utilisateurs souhaitant créer leur propre carnet d'adresses (comme montré dans la vidéo ci-dessus). Mais comme mentionné précédemment, il y a quelques TODO à compléter pour que l'application fonctionne comme prévu.

À la fin, l'application devrait ressembler à la vidéo appelée `resultat-attendu.mov` à la racine de ce repo.
Lien direct : [https://streamable.com/2gsz7m](https://streamable.com/2gsz7m)

Pour commencer cette mission, vous devez :

- ⬇️ Cloner ce repo
- 🌲 Créer une branche distincte appelée `feat/todo-exercice`
- 👨‍💻 Ouvrir votre éditeur préféré (le mien est VS Code)
- 🏃🏻‍♂️ Exécuter `npm install` puis `npm start`
- 🔎 Rechercher toutes les chaînes TODO: dans le dossier `/src` et commencez à construire !

> Remarque : Vous trouverez également des TODO Bonus. Ils ne sont pas obligatoires pour terminer cette mission. N'hésitez pas à mettre en valeur vos compétences en programmation 💪

> ⚠️ Important : Si une erreur NodeJs de type "ERR_OSSL_EVP_UNSUPPORTED" apparaît, vous pouvez la résoudre en remplaçant `npm start` par `NODE_OPTIONS=--openssl-legacy-provider npm start`

## TODO's

Voici une liste de tous les TODO pour faciliter un peu les choses :

### Styling
- [ ] Ajouter la police 'Roboto' de Google fonts et l'ajouter en tant que variable CSS globale appelée `--font-primary`.
- [ ] Rendre l'application responsive. Elle l'est déjà en grande partie, mais elle n'est pas optimale pour les écrans plus petits.
- [ ] Créer des styles séparés pour les variantes .primary et .secondary du composant bouton.

### React
- [ ] Écrire un hook personnalisé pour définir les champs de formulaire de manière plus générique.
- [ ] Récupérer les adresses en fonction du numéro de rue (houseNumber) et du nom de la rue (streetName)
- [ ] Créer un composant `<Form />` générique pour afficher les lignes de formulaire, la légende et un bouton d'envoi.
- [ ] Créer un composant `<ErrorMessage />` pour afficher un message d'erreur.
- [ ] Ajouter un bouton pour effacer tous les champs du formulaire. Le bouton doit avoir un aspect différent du bouton primaire par défaut, voir le design.
- [ ] Ajouter des classNames conditionnels pour les variantes `primary` et `secondary` dans le composant `<Button />`. 

### Redux
- [ ] Empêcher les adresses en double.
- [ ] Écrire une mise à jour d'état qui supprime une adresse du tableau des adresses.


## Soumission de la mission

Vous pouvez soumettre votre mission en créant une demande de fusion (merge request) pour votre branche `feat/todo-exercice`. 

C'est tout, bonne chance ! 🚀

> Si vous avez des questions concernant l'exercice ou pendant sa réalisation, veuillez me contacter par email à <a href="mailto:nassym@deplano.fr"> nassym@deplano.fr </a>
