var validationObject = {
	checkConfirmPassword : function() {
		if($('#confirmPassword').val())
			$('#confirmPwdError').hide();
		$('#confirmPwdMismatchError').hide();
		return genericValidationObject.validateForEqualityOfTwoFields("newPassword", "confirmPassword", "confirmPwdMismatchError");
	},
	
	validateForm : function() {
		$('.form-error').hide();
		var validate = true;
	    
	    validate = genericValidationObject.validateRequiredField("usrId","userNameMissingError") && validate;
	    validate = genericValidationObject.validateUserId("usrId","userNameInvalidError") && validate;
	    validate = genericValidationObject.validateRequiredField("currentPassword","currentPwdError") && validate;
	    validate = genericValidationObject.validateRequiredField("newPassword","newPwdError") && validate;
	    validate = genericValidationObject.validateRequiredField("confirmPassword","confirmPwdError") && validate;
	    validate = genericValidationObject.validateForUnequalityOfTwoFields('currentPassword','newPassword','newPwdSameError') && validate;
	    validate = genericValidationObject.validateForEqualityOfTwoFields('newPassword','confirmPassword','confirmPwdMismatchError') && validate;          
	    if(validate) {
	    	$("#nativeChangeButton").prop("disabled",true);
	    	$("#changeButton").addClass("a-button-disabled");
	    }
	    return validate;
	}	
};

$(document).ready(function(){
	$('#usrId').focus();
});