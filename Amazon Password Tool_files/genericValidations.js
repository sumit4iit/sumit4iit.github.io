var genericValidationObject = {
    validateSelection : function(fieldID,defaultValue,errorElementBlockID) {
        if($('#'+fieldID).val() == defaultValue)
        {
            $('#'+errorElementBlockID).show();
            return false;
        }
        $('#'+errorElementBlockID).hide();
        return true;
    },
    validateRequiredField : function(fieldID,errorElementBlockID) {
        if(!$('#'+fieldID).val() && $('#'+fieldID).is(':visible'))
        {
            $('#'+errorElementBlockID).show();
            return false;
        }
        $('#'+errorElementBlockID).hide();
        return true;
    },
    validateForUnequalityOfTwoFields : function(field1ID,field2ID,errorElementBlockID) {
        if ($('#' + field1ID).val() && $('#' + field2ID).val())
        {
            if ($('#' + field1ID).val() == $('#' + field2ID).val())
            {
                $('#' + errorElementBlockID).show();
                return false;
            }
        }
        $('#' + errorElementBlockID).hide();
        return true;
    },
    validateForEqualityOfTwoFields : function(field1ID,field2ID,errorElementBlockID) {
        if ($('#' + field1ID).val() && $('#' + field2ID).val())
        {
    		if ($('#' + field1ID).val() != $('#' + field2ID).val())
            {
                $('#' + errorElementBlockID).show();
                return false;
            }            
        }
        $('#' + errorElementBlockID).hide();
        return true;
    },
    validateUserId : function(fieldID,errorElementBlockID) {
    	//allow only lowercase and hyphen
    	if(!/^[a-z-]+$/.test($('#' + fieldID).val())) {
    		$('#' + errorElementBlockID).show();
    		return false;
    	}
    	$('#' + errorElementBlockID).hide();
    	return true;
    },
    validateCheckBox : function(fieldID,errorElementBlockID) {
    	if(!$('#'+fieldID).is(":checked"))
        {
            $('#'+errorElementBlockID).show();
            return false;
        }
        $('#'+errorElementBlockID).hide();
        return true;
    },
    validateTicketId : function(fieldID,errorElementBlockID) {
    	//should be 10 characters with only numbers or E
    	if(!/^[0-9]{10}$/.test($('#' + fieldID).val())) {
    		$('#' + errorElementBlockID).show();
    		return false;
    	}
    	$('#' + errorElementBlockID).hide();
    	return true;
    }
};

var genericValidationForHiding = {
	validateField :function (inputField,errorBlock){
		if ( $(inputField).val() ) {
			$(errorBlock).hide();
		}
	},
	validateFieldNotEqual : function (inputFieldA,inputFieldB,errorBlock){
		if ( $(inputFieldA).val() !=  $(inputFieldB).val()  ) {
			$(errorBlock).hide();
		}
	},
	validateFieldEqual : function (inputFieldA,inputFieldB,errorBlock){
		if ( $(inputFieldA).val() ==  $(inputFieldB).val()  ) {
			$(errorBlock).hide();
		}
	}
};