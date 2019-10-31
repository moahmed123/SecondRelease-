const SettingsData = (state = null, action) => {
    switch(action.type){
        case 'SETTING_DATA':
        return action.SettingsData;
        break;
    }
    return state;
}
export default SettingsData;
