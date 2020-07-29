module.exports = {

    validateGivenName: function (givenName) {
        if (givenName.length == 0 || givenName.length > 50) {
            return false;
        }

        return true;
    },

    validateLastName: function (lastName) {
        if (lastName.length == 0 || lastName.length > 50) {
            return false;
        }

        return true;
    },
    
    validatePostcode: function (postcode) {
        if (postcode.toString().charAt(0) != 2 && Number(postcode.length) != 4) {
            return false;
        }
        return true;
    },

    validateDescription: function (description) {
        if (description.length > 500){
            return false;
        }
        return true;
    },

    validateTitle: function (title){
        if(title.length > 100){
            return false;
        }
        return true;
    },

    validateStatus: function (status){
        if(status == 'pending' || status == 'rejected' || status == 'approved'){
            return true;
        }
        return false;
    }

    


}
