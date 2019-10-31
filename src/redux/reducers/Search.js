const Search = (state = null, action) => {
    switch(action.type){
        case 'SEARCH_DATA':
        return action.SearchProducts;
        break;
    }
    return state;
}
export default Search;
