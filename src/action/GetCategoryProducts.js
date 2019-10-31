import axios from 'axios';

export function GetCategoryProducts( urlStore, Token, categoryId, filterText, start, limit ){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token,
            category_id: categoryId,
            filterText: filterText,
            start: start,
            limit: limit
        })
        .then((response) => {
            dispatch(CategoryProducts(response.data));            
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function CategoryProducts(result){
    return{
        type: 'CATEGORY_PRODUCTS_DATA',
        CategoryProductsData: result
    }
}