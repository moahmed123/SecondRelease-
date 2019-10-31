const ContactInfo = (state = null, action) => {
    switch(action.type){
        case 'CONTACT_INFO_RESULT':
        return action.ContactInfoResult;
        break;
    }
    return state;
}
export default ContactInfo;
