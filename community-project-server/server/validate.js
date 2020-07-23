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
        if (description.length > 300){
            return false;
        }
        return true;
    }
}
