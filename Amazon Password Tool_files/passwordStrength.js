function passwordStrength() { 			
	var password = $('#newPassword').val();	
	
	if(password == null){
		password = "";
	}		
	
	$('.pwd-strength').hide();
	var score = 0;
	
	if (password.length > 7) score++;
	if ( password.match(/[a-z]/) ) score++; 
	if ( password.match(/[A-Z]/) ) score++;
	if (password.match(/\d+/)) score++;
	if ( password.match(/[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) )	score++;
	if (password.length > 12) score++;
	
	switch(score){
	case 0:
		$('#passwordNotEntered').hide();
		break;
	case 1:
		$('#passwordStrengthVeryWeak').show();		
		break;
	case 2:
		$('#passwordStrengthWeak').show();
		break;
	case 3:
		$('#passwordStrengthMedium').show();
		break;
	case 4:
		$('#passwordStrengthBetter').show();
		break;
	case 5:
		$('#passwordStrengthStrong').show();
		break;
	case 6:
		$('#passwordStrengthStrongest').show();
		break;
	}
}