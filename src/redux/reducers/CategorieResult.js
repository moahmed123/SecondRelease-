const CategorieResult = (state = null, action) => {
    switch(action.type){
        case 'CATEGORIES_IMAGE_DATA':
        return action.CategoriesResult;
        break;
    }
    return state;
}
export default CategorieResult;
