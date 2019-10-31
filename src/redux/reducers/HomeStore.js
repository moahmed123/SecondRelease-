const HomeStore = (state = null, action) => {
    switch(action.type){
        case 'HOME_DATA':
        return action.HomeData;
        break;
    }
    return state;
}
export default HomeStore;
