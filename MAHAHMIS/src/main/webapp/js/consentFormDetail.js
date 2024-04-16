function SavePreAnaesthesiaInfo(){
	
	var tid =$("#tretID").html();
	var pid =$("#patientId").html();
	var idforconsnt =$("#idForconsnt").val();
	var dateconsnt =$("#DateConsnt").val();
	var que1 =$("#que1").val();
	var que2 =$("#que2").val();
	var que3 =$("#que3").val();
	var que5 =$("#que5").val();
	var que6 =$("#que6").val();
	var que7 =$("#que7").val();
	var que8 =$("#que8").val();
	var que9 =$("#que9").val();
	var que10 =$("#que10").val();
	var que11 =$("#que11").val();
	var chkdiabetes = $('input:checkbox[id=chkDiabetes]');
	var chkhighblood = $('input:checkbox[id=chkHighBlood]');
	var chkhrtdisease = $('input:checkbox[id=chkHrtdisease]');
	var chkasthma = $('input:checkbox[id=chkAsthma]');
	var chkangiography = $('input:checkbox[id=chkAngiography]');
	var chkangioplasty = $('input:checkbox[id=chkAngioplasty]');
	var chkbypass = $('input:checkbox[id=chkByPass]');
	var chkjaundice = $('input:checkbox[id=chkJaundice]');
	var chkfever = $('input:checkbox[id=chkFever]');
	
	if(chkdiabetes.is(':checked') == true){
		chkdiabetes = 1;
    }else{
    	chkdiabetes = 0;
    }
	
	if(chkhighblood.is(':checked') == true){
		chkhighblood = 1;
    }else{
    	chkhighblood = 0;
    }
	
	if(chkhrtdisease.is(':checked') == true){
		chkhrtdisease = 1;
    }else{
    	chkhrtdisease = 0;
    }
	
	if(chkasthma.is(':checked') == true){
		chkasthma = 1;
    }else{
    	chkasthma = 0;
    }
	
	if(chkangiography.is(':checked') == true){
		chkangiography = 1;
    }else{
    	chkangiography = 0;
    }
	
	if(chkangioplasty.is(':checked') == true){
		chkangioplasty = 1;
    }else{
    	chkangioplasty = 0;
    }
	
	if(chkbypass.is(':checked') == true){
		chkbypass = 1;
    }else{
    	chkbypass = 0;
    }
	
	if(chkjaundice.is(':checked') == true){
		chkjaundice = 1;
    }else{
    	chkjaundice = 0;
    }

	if(chkfever.is(':checked') == true){
		chkfever = 1;
    }else{
    	chkfever = 0;
    }
	
	/*alert(pid+"<<"+tid+">>"+dateconsnt+">>"+que1+">>"+que2+">>"+que3+">>"+que5+">>"+que6+">>"+que7+">>"+que8+">>"+que9+">>"+que10
			+">>"+que11+">>"+chkdiabetes+">>"+chkhighblood+">>"+chkhrtdisease+">>"+chkasthma+">>"+chkangiography+
			">>"+chkangioplasty+">>"+chkbypass+">>"+chkjaundice+">>"+chkfever);*/
	
	
	var consentDetails = {
    		listConsent : []
        };
	consentDetails.listConsent.push({
		pid: pid,
		tid: tid,
		idforconsnt: idforconsnt,
		dateconsnt: dateconsnt,
		que1: que1,
		que2: que2,
		que3: que3,
		que5: que5,
		que6: que6,
		que7: que7,
		que8: que8,
		que9: que9,
		que10: que10,
		que11: que11,
		chkdiabetes: chkdiabetes,
		chkhighblood: chkhighblood,
		chkhrtdisease: chkhrtdisease,
		chkasthma: chkasthma,
		chkangiography: chkangiography,
		chkangioplasty: chkangioplasty,
		chkbypass: chkbypass,
		chkjaundice: chkjaundice,
		chkfever: chkfever
    	
    });
    
	consentDetails = JSON.stringify(consentDetails);
	var inputs = [];
    inputs.push('consentDetails=' + consentDetails);
    var str = inputs.join('&');

    jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/saveOtConsent",
	
		success : function(r) {
			alert(r);
			fetchPreAnaesthesiaInfo();
		}	
	});
}

function fetchPreAnaesthesiaInfo(){
	
	var tid =$("#tretID").html();
	var pid =$("#patientId").html();
	 var inputs = [];
		inputs.push('pid=' + pid);
		inputs.push('tid=' + tid);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ot/fetchOtConsent",
			
			success : function(response) {
				$("#idForconsnt").val(response.listConsent[0].idforconsnt);
				$("#DateConsnt").val(response.listConsent[0].dateconsnt);
				$("#que1").val(response.listConsent[0].que1);
				$("#que2").val(response.listConsent[0].que2);
				$("#que3").val(response.listConsent[0].que3);
				$("#que5").val(response.listConsent[0].que5);
				$("#que6").val(response.listConsent[0].que6);
				$("#que7").val(response.listConsent[0].que7);
				$("#que8").val(response.listConsent[0].que8);
				$("#que9").val(response.listConsent[0].que9);
				$("#que10").val(response.listConsent[0].que10);
				$("#que11").val(response.listConsent[0].que11);
				
				if(response.listConsent[0].chkdiabetes==1){
					$("#chkDiabetes").prop("checked", "checked");
				}

				if(response.listConsent[0].chkhighblood==1){
					$("#chkHighBlood").prop("checked", "checked");
				}

				if(response.listConsent[0].chkhrtdisease==1){
					$("#chkHrtdisease").prop("checked", "checked");
				}

				if(response.listConsent[0].chkasthma==1){
					$("#chkAsthma").prop("checked", "checked");
				}

				if(response.listConsent[0].chkangiography==1){
					$("#chkAngiography").prop("checked", "checked");
				}

				if(response.listConsent[0].chkangioplasty==1){
					$("#chkAngioplasty").prop("checked", "checked");
				}

				if(response.listConsent[0].chkbypass==1){
					$("#chkByPass").prop("checked", "checked");
				}

				if(response.listConsent[0].chkjaundice==1){
					$("#chkJaundice").prop("checked", "checked");
				}

				if(response.listConsent[0].chkfever==1){
					$("#chkFever").prop("checked", "checked");
				}
				
			}
		});
	}