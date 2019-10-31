const GeneralData = (state = null, action) => {
    switch(action.type){
        case 'GENERAL_DATA':
        return action.GeneralData;
        break;
    }
    return state;
}
export default GeneralData;
