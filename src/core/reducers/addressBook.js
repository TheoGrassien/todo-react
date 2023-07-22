const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Empêcher d'avoir des adresses en double */
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "address/remove":
      /** TODO: Écrire un changement d'état qui supprime une adresses de la liste des adresses. */
      return state;
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
