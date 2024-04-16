
/********************************************
* @author	:Dnyaneshwar Kadam
* @date		: 14-Jan-2020
* @codeFor	: SaveHospitalInformationDeatil
 *******************************************/
function savehospitalinfo() {
	
	
	var sandboxIntegration = $("#sandboxIntegration").val();
	var sandboxIntegrationFlag="";
	if(sandboxIntegration){
		sandboxIntegrationFlag='Y';
	}
	else if(!sandboxIntegration){
		sandboxIntegrationFlag='N';
	}
	
	if(sandboxIntegration){
		
		
		var txtHosName = $("#txtHosName").val();
		var hInfoUnitId = $("#hInfoUnitId").val();
		hInfoUnitId = "HMIS-"+hInfoUnitId;
		var txtInitials = $("#txtInitials").val();
		var inputs = [];	
		inputs.push('txtHosName='+txtHosName);
		inputs.push('hInfoUnitId='+hInfoUnitId);
		inputs.push('txtInitials='+txtInitials);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/sandbox/registerHIP",
			timeout : 1000 * 60 * 5, 
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				//var resultError = JSON.parse(r);
				//alert(obj);
				alertify.success("Register Successfully");
				
				
			}
		});
	}
	//alert($("#sandboxIntegration").val());
	
	var txtSid = $("#hiddenHosId").val();
	var hiddenHosId=$("#hiddenHosId").val();
	if(hiddenHosId == null || hiddenHosId == undefined || hiddenHosId == "")
		{
		hiddenHosId=0;
		}
	var txtHosName = $("#txtHosName").val();
	if (txtHosName == null || txtHosName == "") {
		alert("Please enter Hospital Name");
		txtHosName = "";
		return false;
	}
	var txtInitials = $("#txtInitials").val();

	if (txtInitials == null || txtInitials == "") {
		alert("Please enter Initials");
		SetFocus("txtInitials");
		return false;
	}

	var txtAddress = $("#txtAddress").val();

	if (txtAddress == null || txtAddress == "") {
		alert("Please enter Address");
		SetFocus("txtAddress");
		return false;
	}	
	
	var txtCity = $("#txtCity").val();
	
	if (txtCity == null || txtCity == "") {
		alert("Please enter City");
		SetFocus("txtCity");
		return false;
	}
	
	var stateId = $("#stateId").val();
	if (stateId == null || stateId == "") {
		stateId = "";
	}

	var txtZipCode = $("#txtZipCode").val();
	if (txtZipCode == null || txtZipCode == "") {
		txtZipCode = "";
	}
	var email = $("#email").val();
	if (email == null || email == "") {
		alert("Please Enter  Email Id");
		email = "";
		return false;
	}
	var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!pattern.test(email)) {
		alert("Please Enter Valid Email Id");
		SetFocus("email");
		return false;
	}

	var txtContact = $("#txtContact").val();
	
	if (txtContact == null || txtContact == "") {
		alert("Please enter Contact Number");
		SetFocus("txtContact");
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtContact)) {
		alert("Please enter valid contact number");
		SetFocus("txtContact");
		return false;
	}

	var txtFax = $("#txtFax").val();
	
	if (txtFax == null || txtFax == "") {
		txtFax = "";
	}

	var txtRegCh = $("#txtRegCh").val();

	if (txtRegCh == null || txtRegCh == "") {
		txtRegCh = "";
		alert("Please enter Registration Charges");
		SetFocus("txtRegCh");
		return false;
	}
	
	var txtRegChDiagnostc = $("#txtRegChDiagnostc").val();

	if (txtRegChDiagnostc == null || txtRegChDiagnostc == "") {
		txtRegChDiagnostc = "";
		alert("Please enter Registration Charges");
		SetFocus("txtRegChDiagnostc");
		return false;
	}
	
	
	var txtSerTaxNo = $("#txtSerTaxNo").val();

	if (txtSerTaxNo == null || txtSerTaxNo == "") {
		txtSerTaxNo = "";
		alert("Please enter Service Tax No");
		SetFocus("txtSerTaxNo");
		return false;
		
	}
	
	var txtGstNo = $("#txtGstNo").val();
	
	if (txtGstNo == null || txtGstNo == "") {
		txtGstNo = "";
		alert("Please enter Gst No");
		SetFocus("txtGstNo");
		return false;
	}

	var txtCinNo = $("#txtCinNo").val();
	
	if (txtCinNo == null || txtCinNo == "") {
		txtCinNo = "";
		alert("Please enter CIN No");
		SetFocus("txtCinNo");
		return false;
		
	}

	var txtAppoStrtTime = $("#txtAppoStrtTime").val();
	if (txtAppoStrtTime == null || txtAppoStrtTime == "") {
		txtAppoStrtTime = "";
	}
	
	
	var txtAppoEndTime = $("#txtAppoEndTime").val();
	if (txtAppoEndTime == null || txtAppoEndTime == "") {
		txtAppoEndTime = "";
	}

	var txtAppoDure = $("#txtAppoDure").val();
	if (txtAppoDure == null || txtAppoDure == "") {
		txtAppoDure = "";
	}

	var txtTrmtClsTime = $("#txtTrmtClsTime").val();
	if (txtTrmtClsTime == null || txtTrmtClsTime == "") {
		txtTrmtClsTime = "";
	}
	
	var txtSerTax = $("#txtSerTax").val();
	//alert("in"+txtSerTax);
	if (txtSerTax == null || txtSerTax == "") {
		//alert("Please Enter Service Tax");
		txtSerTax = "";
		
	}
	
	var txtBlDayFrmTime = $("#txtBlDayFrmTime").val();
	
	if (txtBlDayFrmTime == null || txtBlDayFrmTime == "") {
		txtBlDayFrmTime = "";
	}

	var txtBlDayToTime = $("#txtBlDayToTime").val();
	if (txtBlDayToTime == null || txtBlDayToTime == "") {
		txtBlDayToTime = "";
	}

	var DocRdFrmTime = $("#DocRdFrmTime").val();
	if (DocRdFrmTime == null || DocRdFrmTime == "") {
		DocRdFrmTime = "";
	}
	

	var DocRdToTime = $("#DocRdToTime").val();
	if (DocRdToTime == null || DocRdToTime == "") {
		DocRdToTime = "";
	}

	var txtDocFollowUpDays = $("#txtDocFollowUpDays").val();
	if (txtDocFollowUpDays == null || txtDocFollowUpDays == "") {
		txtDocFollowUpDays = "";
	}

	var txtRegFollowUpDays = $("#txtRegFollowUpDays").val();
	if (txtRegFollowUpDays == null || txtRegFollowUpDays == "") {
		txtRegFollowUpDays = "";
	}

	var txtAnestChar = $("#txtAnestChar").val();
	if (txtAnestChar == null || txtAnestChar == "") {
		txtAnestChar = "";
	}

	var txtMLCChr = $("#txtMLCChr").val();
	
	if (txtMLCChr == null || txtMLCChr == "") {
		txtMLCChr = "";
		alert("Please Enter MLC Charges");
		return false;
	}

	var txtInfChr = $("#txtInfChr").val();
	if (txtInfChr == null || txtInfChr == "") {
		txtInfChr = "";
	}
	
	var website = $("#website").val();
	
	if (website == null || website == "") {
		website = "";
	}
	
	var secPNo = $("#secPNo").val();
	
	if (secPNo == null || secPNo == "") {
		secPNo = "";
	}

	var PanNo = $("#PanNo").val();
	
	if (PanNo == null || PanNo == "") {
		PanNo = "";
	}

	var hosRegNo = $("#hosRegNo").val();
	if (hosRegNo == null || hosRegNo == "") {
		hosRegNo = "";
	}
	
	var txtBedRiddenCharges = $("#txtBedRiddenCharges").val();
	
	if (txtBedRiddenCharges == null || txtBedRiddenCharges == "") {
		txtBedRiddenCharges = "";
	}

	var txtServoCharges = $("#txtServoCharges").val();
	
	if (txtServoCharges == null || txtServoCharges == "") {
		txtServoCharges = "";
	}
	
	var txtSurInstruCharges = $("#txtSurInstruCharges").val();
	if (txtSurInstruCharges == null || txtSurInstruCharges == "") {
		txtSurInstruCharges = "";
	}
	
	var surChrtwoHrs = $("#surChrtwoHrs").val();
	if (surChrtwoHrs == null || surChrtwoHrs == "") {
		surChrtwoHrs = "";
	}

	var surChrFourHrs = $("#surChrFourHrs").val();
	if (surChrFourHrs == null || surChrFourHrs == "") {
		surChrFourHrs = "";
	}
	
	var hospitalUnitId = $("#hInfoUnitId").val();
	
	if(hospitalUnitId == 0 || hospitalUnitId === undefined || hospitalUnitId === "undefined" || hospitalUnitId== null || hospitalUnitId === "null"){
		alertify.error("Please Select Unit First..!");
		return false;
	}
var appoStrtTime = $("#txtAppoStrtTime").val();
	
	if(appoStrtTime == 0 || appoStrtTime === undefined || appoStrtTime === "undefined" || appoStrtTime== null || appoStrtTime === "null"){
		alertify.error("Please Select time First..!");
		return false;
	}
	
var appoEndTime = $("#txtAppoEndTime").val();
	
	if(appoEndTime == 0 || appoEndTime === undefined || appoEndTime === "undefined" || appoEndTime== null || appoEndTime === "null"){
		alertify.error("Please Select time First..!");
		return false;
	}
	
var billDayFrmTime = $("#txtBlDayFrmTime").val();
	
	if(billDayFrmTime == 0 || billDayFrmTime === undefined || billDayFrmTime === "undefined" || billDayFrmTime== null || billDayFrmTime === "null"){
		alertify.error("Please Select time First..!");
		return false;
	}
	
var appoDure = $("#txtAppoDure").val();
	
	if(appoDure == 0 || appoDure === undefined || appoDure === "undefined" || appoDure== null || appoDure === "null"){
		alertify.error("Please Select time First..!");
		return false;
	}
var billDayToTime = $("#txtBlDayToTime").val();
	
	if(billDayToTime == 0 || billDayToTime === undefined || billDayToTime === "undefined" || billDayToTime== null || billDayToTime === "null"){
		alertify.error("Please Select time First..!");
		return false;
	}
	

	var surChrBeyondFourHrs = $("#surChrBeyondFourHrs").val();
	
	if (surChrBeyondFourHrs == null || surChrBeyondFourHrs == "") {
		surChrBeyondFourHrs = "";
	}		
	var imageAndAddressPlace=$("input:radio[name=imageAndAddressPlace]:checked").val();
	var logoPath1 = $("#doctorSignName").text();	
	var nabhpath1 = $("#nabhImageLogo").text();
	
	var logopath2="images/Hospital";
	var logoPath = logopath2+'/'+logoPath1;
	
	var nabhPath=logopath2+'/'+nabhpath1;
	
	//Medical Information Master
	var medicalName = $("#txtMedicalName").val();
	/*if (medicalName == null || medicalName == "") {
		alert("Please enter Medical Name");
		medicalName = "";
		return false;
	}*/
	var medicalAddress = $("#txtAddressMedical").val();
	/*if (medicalAddress == null || medicalAddress == "") {
		alert("Please enter Medical Address");
		medicalAddress = "";
		return false;
	}*/	
	var medicalCity = $("#txtCityMedical").val();
	/*if (medicalCity == null || medicalCity == "") {
		alert("Please enter Medical cityName");
		medicalCity = "";
		return false;
	}*/
	var medicalZipCode = $("#txtZipCodeMedical").val();
	var medicalState = $("#medicalState").val();
	var medicalCountry = $("#medicalCountry").val();
		
	var medicalEmail = $("#emailMedical").val();
	/*if (medicalEmail == null || medicalEmail == "") {
		alert("Please enter Medical emailId");
		medicalEmail = "";
		return false;
	}*/
	var medicalContact = $("#txtContactMedical").val();
	/*if (medicalContact == null || medicalContact == "") {
		alert("Please enter Medical Contact No");
		txtContactMedical = "";
		return false;
	}*/
	var alternativeMedicalContact = $("#txtAlternativeContactMedical").val();
	
	var druglicense = $("#txtdruglicense").val();
	/*if (druglicense == null || druglicense == "") {
		alert("Please enter Medical druglicence");
		druglicense = "";
		return false;
	}*/
	var drugLicense1 = $("#txtdruglicense1").val();
	/*if (drugLicense1 == null || drugLicense1 == "") {
		alert("Please enter Medical druglicence1");
		drugLicense1 = "";
		return false;
	}*/
	var medicalGstNo = $("#txtMedicalGstNo").val();
	/*if (medicalGstNo == null || medicalGstNo == "") {
		alert("Please enter GST No for Medical");
		medicalGstNo = "";
		return false;
	}*/
	
	var medLogoPath = $('#pharmacyLogo').text();	
	
	//Pathology Information Master
	var pathologyName = $("#txtpathologyName").val();
	var pathologyAddress = $("#txtAddressPathology").val();	
	var pathologyemail = $("#emailPathology").val();
	var pathologyContact = $("#txtContactPathology").val();
	var pathologyMobile = $("#txtAlternativeContactPathology").val();
	var pathologistName = $("#txtpathologistName").val();
	var pathologistQualification = $("#txtQualification").val();
	var designation = $("#txtDesignation").val();
	var pathologyLogo1 = $('#PathologyLogodis').text();
	
	var pathologylogopath2="images/Hospital";
	var pathologyLogo = pathologylogopath2+"/"+pathologyLogo1;
	
		var listHospitalDetails = {   
				listHospitalDetails : []
		};	
		listHospitalDetails.listHospitalDetails.push({
		  //currencyId : currencyId,
			idhospital : txtSid,
			hospitalName:txtHosName,
			initialsName:txtInitials,
			hospital_initial:txtInitials,
			hospitalCity:txtCity,
			hospitalState :stateId,
			hospitalZip:txtZipCode,
			hospitalEmail:email,
			hospitalAddress:txtAddress,
			hospitalContact : txtContact,
			hospitalFax:txtFax,
			hospitalRegCharges:txtRegCh,
			hospitalRegChargesDiag : txtRegChDiagnostc,
			serviceTax : txtSerTaxNo,
			billDayFrmTime:txtBlDayFrmTime,
			billDayToTime:txtBlDayToTime,
		  /*DocRdFrmTime:DocRdFrmTime,
		    DocRdToTime :DocRdToTime,*/
			anesthetistCharges:txtAnestChar,
		  /*emergencyCharges:txtEmrChr,*/
			infectionCharges:txtInfChr,
			bedRiddenCharges : txtBedRiddenCharges,
			servoCharges:txtServoCharges,
			surInstruCharges:txtServoCharges,
			surChrtwoHrs:surChrtwoHrs,
			surChrFourHrs : surChrFourHrs,
			surChrBeyondFourHrs:surChrBeyondFourHrs,
			mlcCharges:txtMLCChr,
			initials:txtInitials,
			docFollowUpDays:txtDocFollowUpDays,
			regFollowUpDays:txtRegFollowUpDays,
			txtTrmtClsTime:txtTrmtClsTime,
			hosRegNo : hosRegNo,
			txtSerTaxNo:txtSerTax,
		txtGstNo:txtGstNo,
		txtCinNo:txtCinNo,
		website:website,
		secPNo:secPNo,
		panNo:PanNo,
		surgicalInstruCharges:txtSurInstruCharges,
		appoStrtTime:txtAppoStrtTime,
		appoEndTime:txtAppoEndTime,
		appoDure:txtAppoDure,
		hospitalUnitId:hospitalUnitId,
		imageAndAddressPlace:imageAndAddressPlace,
		
		logoPath : logoPath,
		//nabhImagePath : logoPath1,
		//nabh_logo_path : logoPath1,
		nabhImagePath : nabhPath,
		nabh_logo_path : nabhPath,
		filePath : logoPath,
		sandboxIntegrationFlag:sandboxIntegrationFlag,
	
		//medical Information Master
		medicalName:medicalName,
		medicalAddress:medicalAddress,
		medicalCity:medicalCity,
		medicalZipCode:medicalZipCode,
		//medicalState:medicalState,
		//medicalCountry:medicalCountry,
		medicalEmail:medicalEmail,
		medicalContact:medicalContact,
		alternativeMedicalContact:alternativeMedicalContact,
		druglicense:druglicense,
		drugLicense1:drugLicense1,
		medicalGstNo:medicalGstNo,
		medLogoPath:medLogoPath,
		
		
		//pathology Information Master
		 pathologyName:pathologyName,
		 pathologyAddress:pathologyAddress,
		 pathologyemail:pathologyemail,
		pathologyContact:pathologyContact,
		 pathologyMobile:pathologyMobile,
		 pathologistName:pathologistName,
		pathologistQualification:pathologistQualification,
		designation:designation,
		pathologyLogo:pathologyLogo
		
	});
		
		listHospitalDetails = JSON.stringify(listHospitalDetails);
	
	var inputs = [];	
	var hospitalId=$('#hInfoUnitId').val();
	var inputs = [];
    inputs.push('hospitalId='+ encodeURIComponent(hospitalId));
	inputs.push("hospitalInfo=" + encodeURIComponent(listHospitalDetails));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/admin/savehospitalinfo",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r > 1) {
				alertify.success("Record saved successfully..!");
			} else {
				alertify.success("Record Update successfully..!");
			}
			getAllUnitForHospitalInfo();
			getAllStateList();
			getFetchHospitalInfo();
			
			
			
		}
	});
}

function getFetchHospitalInfo() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalinfoadmin",
		success : function(r)
		{		
			//alert(r);
			setFetchHospital(r);			
		}
	});
}
//Added By Annapurna for get unitwiseHospitalInformation
function getHospitalInfo1(){
	
	var hospitalId=$('#hInfoUnitId').val();
	var inputs = [];
inputs.push('hospitalId='+hospitalId);
 var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/gethospitalinfoadmin1",
		success : function(r)
		{		
			//alert(r);
			setFetchHospital(r);			
		}
	});
}

function setFetchHospital(r)
{
	if(r.listHosDetail!=null){
		
	
	for(var i=0;i<r.listHosDetail.length;i++)	
	{	
		$("#hiddenHosId").val(r.listHosDetail[i].idhospital);
		$("#txtHosName").val(r.listHosDetail[i].hn);
		$("#txtInitials").val(r.listHosDetail[i].initialsName);
		$("#txtCity").val(r.listHosDetail[i].hcity);
		$("#stateId").val(r.listHosDetail[i].hs);
		$("#txtZipCode").val(r.listHosDetail[i].hz);
		$("#txtAddress").val(r.listHosDetail[i].ha);
		$("#txtContact").val(r.listHosDetail[i].hcon);
		$("#txtFax").val(r.listHosDetail[i].hx);
		$("#txtRegCh").val(r.listHosDetail[i].hrate);
		$("#txtSerTaxNo").val(r.listHosDetail[i].hrate);
		$("#txtBlDayFrmTime").val(r.listHosDetail[i].bdFrmTim);
		$("#txtBlDayToTime").val(r.listHosDetail[i].bdToTim);
		$("#txtAnestChar").val(r.listHosDetail[i].AnaChar);
		$("#txtInfChr").val(r.listHosDetail[i].infchr);
		$("#txtBedRiddenCharges").val(r.listHosDetail[i].rdCharges);
		$("#txtServoCharges").val(r.listHosDetail[i].serCharges);
		$("#txtSurInstruCharges").val(r.listHosDetail[i].surinstr);
		$("#surChrtwoHrs").val(r.listHosDetail[i].surchrtwhrs);
		$("#surChrFourHrs").val(r.listHosDetail[i].surchrfrhrs);
		$("#surChrBeyondFourHrs").val(r.listHosDetail[i].surchrbyfrhrs);
		$("#txtMLCChr").val(r.listHosDetail[i].mlcChr);
		$("#txtDocFollowUpDays").val(r.listHosDetail[i].docfollowup);
		$("#txtRegFollowUpDays").val(r.listHosDetail[i].regfollowup);
		$("#initials").val(r.listHosDetail[i].initials);
		$("#txtTrmtClsTime").val(r.listHosDetail[i].txtTrmtClsTime);
		$("#hosRegNo").val(r.listHosDetail[i].hosRegNo);
		$("#txtRegChDiagnostc").val(r.listHosDetail[i].hospitalRegChargesDiag);
		$("#txtSerTax").val(r.listHosDetail[i].txtSerTaxNo);
		$("#txtGstNo").val(r.listHosDetail[i].txtGstNo);
		$("#txtCinNo").val(r.listHosDetail[i].txtCinNo);
		$("#website").val(r.listHosDetail[i].website);
		$("#secPNo").val(r.listHosDetail[i].secPNo);
		$("#PanNo").val(r.listHosDetail[i].PanNo);
		$("#email").val(r.listHosDetail[i].em);
		$("#txtAppoStrtTime").val(r.listHosDetail[i].appoStrtTime);
		$("#txtAppoEndTime").val(r.listHosDetail[i].appoEndTime);
		$("#txtAppoDure").val(r.listHosDetail[i].appoDure);
		$("input:radio[name='imageAndAddressPlace'][value='"+r.listHosDetail[i].imageAndAddressPlace+"']").prop("checked",true);
		$("#hInfoUnitId").val(r.listHosDetail[i].hospitalUnitId);
	    
	    if(r.listHosDetail[i].flpt == ''){
	    	$('#doctorSignName').text()
	    }	    
	    else{
	    	var img=(r.listHosDetail[i].flpt).split('/')
	    	$('#doctorSignName').text(img[2]);
	    }
	    
	    if(r.listHosDetail[i].nabh_logo_path == ''){
	    	$('#nabhImageLogo').text()
	    }	    
	    else{
	    	var img=(r.listHosDetail[i].nabh_logo_path).split('/')
	    	$('#nabhImageLogo').text(img[2]);
	    }
	    //for medical Information
	    $("#txtMedicalName" ).val(r.listHosDetail[i].medicalName);
		$("#txtAddressMedical").val(r.listHosDetail[i].medicalAddress);
		$("#txtCityMedical").val(r.listHosDetail[i].medicalCity);
		$("#txtZipCodeMedical").val(r.listHosDetail[i].medicalZipCode);
		$("#emailMedical").val(r.listHosDetail[i].medicalEmail);
		$("#txtContactMedical").val(r.listHosDetail[i].medicalContact);
		$("#txtAlternativeContactMedical").val(r.listHosDetail[i].alternativeMedicalContact);
		$("#txtdruglicense").val(r.listHosDetail[i].druglicense);
		$("#txtdruglicense1").val(r.listHosDetail[i].drugLicense1);
		$("#txtMedicalGstNo").val(r.listHosDetail[i].medicalGstNo);
		$("#pharmacyLogo").val(r.listHosDetail[i].medLogoPath);
		
		//for pathology Information
		
		
		if(r.listHosDetail[i].medLogoPath == ''){
	    	$('#pharmacyLogo').text()
	    }	    
	    else{
	    	var pathoimg=(r.listHosDetail[i].medLogoPath).split('/')
	    	$('#pharmacyLogo').text(img[2]);
	    }
		
		//Pathology Information Master
		 $("#txtpathologyName").val(r.listHosDetail[i].pathologyName);
		  $("#txtAddressPathology").val(r.listHosDetail[i].pathologyAddress);	
		  $("#emailPathology").val(r.listHosDetail[i].pathologyemail);
		  $("#txtContactPathology").val(r.listHosDetail[i].pathologyContact);
		  $("#txtAlternativeContactPathology").val(r.listHosDetail[i].pathologyMobile);
		  $("#txtpathologistName").val(r.listHosDetail[i].pathologistName);
		  $("#txtQualification").val(r.listHosDetail[i].pathologistQualification);
		  $("#txtDesignation").val(r.listHosDetail[i].designation);
		  
		  if(r.listHosDetail[i].pathologyLogo == ''){
		    	$('#PathologyLogodis').text()
		    }	    
		    else{
		    	var pathoimg1=(r.listHosDetail[i].pathologyLogo).split('/')
		    	$('#PathologyLogodis').text(pathoimg1[2]);
		    }
		
		}
	}
	
	else{
		$("#hiddenHosId").val('0');
		$("#txtHosName").val('0');
		$("#txtInitials").val('0');
		$("#txtCity").val('0');
		$("#stateId").val('0');
		$("#txtZipCode").val('0');
		$("#txtAddress").val('0');
		$("#txtContact").val('0');
		$("#txtFax").val('0');
		$("#txtRegCh").val('0');
		$("#txtSerTaxNo").val('0');
		$("#txtBlDayFrmTime").val(" ");
		$("#txtBlDayToTime").val(" ");
		$("#txtAnestChar").val('0');
		$("#txtInfChr").val('0');
		$("#txtBedRiddenCharges").val('0');
		$("#txtServoCharges").val('0');
		$("#txtSurInstruCharges").val('0');
		$("#surChrtwoHrs").val(' ');
		$("#surChrFourHrs").val(' ');
		$("#surChrBeyondFourHrs").val(' ');
		$("#txtMLCChr").val('0');
		$("#txtDocFollowUpDays").val('0');
		$("#txtRegFollowUpDays").val('0');
		$("#initials").val('0');
		$("#txtTrmtClsTime").val('0');
		$("#hosRegNo").val('0');
		$("#txtSerTax").val('0');
		$("#txtGstNo").val('0');
		$("#txtCinNo").val('0');
		$("#website").val('0');
		$("#secPNo").val('0');
		$("#PanNo").val('0');
		$("#email").val(' ');
		$("#txtAppoStrtTime").val(" ");
		$("#txtAppoEndTime").val(" ");
		$("#txtAppoDure").val(" ");
	
		 //for medical Information
	    $("#txtMedicalName" ).val(" ");
		$("#txtAddressMedical").val(" ");
		$("#txtCityMedical").val(" ");
		$("#txtZipCodeMedical").val(" ");
		$("#emailMedical").val(" ");
		$("#txtContactMedical").val(" ");
		$("#txtAlternativeContactMedical").val(" ");
		$("#txtdruglicense").val(' 0');
		$("#txtdruglicense1").val('0');
		$("#txtMedicalGstNo").val('0');
		$("#pharmacyLogo").text('');
		
		//Pathology Information Master
		 $("#txtpathologyName").val(" ");
		  $("#txtAddressPathology").val(" ");	
		  $("#emailPathology").val(" ");
		  $("#txtContactPathology").val('0');
		  $("#txtAlternativeContactPathology").val('0');
		  $("#txtpathologistName").val(" ");
		  $("#txtQualification").val(" ");
		  $("#txtDesignation").val(" ");
		  
         	$('#PathologyLogo').text(' ')
		   
	}
}

function  addThemSpe() 

{	
	
	var docName = $("#txtDocSpl").val();
	var unitId = ($("#hInfoUnitId").val());
	
	if(docName==""){
		alert("Please Enter Specialization Name!");
		return false;
		}
	var add = docName + '\n';
	
	var flag = 0;
	$('#selDocSpec').find('option').each(function() {
		if ($(this).html() == docName) {
			alert("Specialization Type Is already Present In List");
			flag = 1;
		}
	});	
	var listHospSpcl1 = { 
			listHospSpcl : []
		};
	
	listHospSpcl1.listHospSpcl.push({
		specializationName:docName,
		
	});
	//alert(JSON.stringify(listHospSpcl));
	listHospSpcl1 = JSON.stringify(listHospSpcl1);
	var inputs = [];
	//unitId:unitId
	inputs.push("hospitalSpecialization=" + encodeURIComponent(listHospSpcl1));
	inputs.push("unitId=" + encodeURIComponent(unitId));
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/admin/savehospitalspcialization",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
		
			success : function(r) {			
				alert(r);
				$("#txtDocSpl").val("");
				getSpecializationInfo();
				//getFetchHospitalSpecializationInfo();																
			}
		});	
	}

function getSpecializationInfo() {
//	var unitId=$('#hInfoUnitId').val();
	var inputs = [];
	//inputs.push('unitId='+unitId);
	 var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationList(r);
		}
	});
}


function setspcializationList(r)
{
	var listspec="";	
	listspec = listspec + "<select class='col-md-12'><option value='0'>--Select --</option>";
	for(var i=0;i<r.hospitalspclgetlist	.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#selDocSpec").html(listspec);
}

function RemoveThemSpl() {
	//alert("RemoveThemSpl");
	var splId = $('#selDocSpec option:selected').val();	
/*alert(splId);
console.log(splId);*/
	var r = confirm("Are You Sure You Want To Delete Record ?");
	if (r == true)
	var inputs = [];	
	inputs.push("hospitalSpecialization=" + encodeURIComponent(splId));
	//alert(specialisationId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/admin/deletehospitalspcialization",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				getSpecializationInfo();
				setspcializationList();			
			}
		});
}

function  addThemDept()  
{
	var docName = $("#txtHosDept").val();
	var unitId = ($("#hInfoUnitId").val());
	//var departmentId = $("#departmentId").val();
	//alert(docName);
	if(docName==""){
		alert("Please Enter Department Name!");
		return false;
		}
	var add = docName + '\n';
	var flag = 0;
	$('#selHosDept').find('option').each(function() {
		if ($(this).html() == docName) {
			flag = 1;
		}
	});
	
	var listDepartments = { 
			liDep : []
	
		};	
	listDepartments.liDep.push({
		departmentName:docName
	});
	//listhospitaldeparment = (listhospitaldeparment);
	//alert(JSON.stringify(listhospitaldeparment));
	var inputs = [];
	inputs.push("hospitalDepartment=" + encodeURIComponent(JSON.stringify(listDepartments)));
	var unitId = ($("#hInfoUnitId").val());
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/admin/savehospitaldepartment",
			data : str + "&reqType=AJAX",
			cache : false,

			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				
				alert(r);	
				var docName = $("#txtHosDept").val("");
				getFetchSaveHospitalDepartment(r);				
			}
		});
}

function getFetchSaveHospitalDepartment(r) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalhospitaldepartmentList",
		success : function(r) {
			//alert(r);
			//alert(json.stringify(r));
			setFetchSaveHospitalDepartment(r);
		}
	});
}

function setFetchSaveHospitalDepartment(r)
{
	
	var listdepartment="";
	listdepartment = listdepartment + "<select class='col-md-12'><option value='0'>--Select--</option>";
	for(var i=0;i<r.listDepartments.length;i++)
	{
		listdepartment=listdepartment+'<option value="'+r.listDepartments[i].departmentId+'">'+r.listDepartments[i].departmentName+'</option>';
		}
	$("#selHosDept").html(listdepartment);
}

function RemoveThemDept() {
	var deptId = $('#selHosDept option:selected').val();
	
	var r = confirm("Are You Sure You Want To Delete Record ?");
	if (r == true)
	var inputs = [];	
	inputs.push("listhospitaldeparment=" + encodeURIComponent(deptId));
	//alert(deptId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/admin/deletehospitalhospitaldepartment",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				
				getFetchSaveHospitalDepartment();
				setFetchSaveHospitalDepartment();				
			}
		});
}

function uploadHospitalLogo() 
{
	var filePath = $("#fileUp").val();
	//alert("filePath :"+filePath);
	if (filePath.length == 0) {
		alert("Please Select File To Upload.");
	} else {

		var arr = [];
		var extension;
		arr = filePath.split(".");
		extension = arr[arr.length - 1];
		
		if(extension == "jpg" || extension == "jpeg" || extension == "tft"
			|| extension == "png" || extension == "JPG" || extension == "JPEG" 
			|| extension == "TFT" || extension == "PNG" || extension == "bmp" || extension == "BMP"){
		}else{
			alert("Please Select Valid Image Format (.jpg, .jpeg, .png, .bmp, .tft) To Upload.");
			return false;
		}
		$("#fileUploadfrm").attr("action",
				"HospitalLogoUpload?filePath=" + filePath);
		setTimeout(function() {
			$("#fileUploadfrm").ajaxForm().submit();
		}, 500);

	}
}
function getAllStateList(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/state/getAllState",
		error : function() {
			alertify.error('Network Issue!!');
		},
		success : function(r) {
			var divContent = "";
	        divContent = divContent + "<select name='State Name' class='col-md-12'><option value='0'>--Select State--</option>";
	         for ( var i = 0; i < r.stateList.length; i++) {          
	        	 divContent = divContent + "<option value='" + r.stateList[i].state_id + "'>"+ r.stateList[i].state_name + "</option>";
	            }
	            divContent = divContent + "</select>";
	            
	            $("#stateId").html(divContent);
	            /*$("#searchStateId").html(divContent);*/
			}
		});
}
/****************************************
* @author	:Dnyaneshwar Kadam
* @date		: 17-Jan-2020
* @codeFor	: SaveHospitalHolidayMaster
 ***************************************/

function toggleForm(id){
	//alert(id);
	$("#"+id).toggle('slow');
}

function resetHospitalHolidayForm(){	
	$('#idHospitalHolidays').val("");
	$('#date').val("");
	$('#reason').val("");
	toggleEntryDiv('holidayForm');
	return false;
}

function saveHospitalHolidayMaster(){
	
var idHospitalHolidays=$('#idHospitalHolidays').val();
	
	var date = $('#date').val();
	if(date=="" || date==null){
		alert("Please Select Date");
		return false;
	}
	
	var reason = $('#reason').val();
	if(reason=="" || reason==null){
		alert("Please Enter Reason");
		return false;
	}
	
	var inputs=[];
	inputs.push("idHospitalHolidays="+idHospitalHolidays);
	inputs.push("date="+date);
	inputs.push("reason="+reason);
	
	//alert(JSON.stringify(inputs));
	
	var str=inputs.join('&');
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/hospitalholiday/savehospitalholidaynew",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				alertify.success(r);
				fetchHospitalHoliday();
			}
		});
}

function fetchHospitalHoliday() {
	//alert("in");
	var selYear = $("#selYear").val();
	// alert(selYear);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"selYear" : selYear
		},
		url : "ehat/hospitalholiday/fetchHospitalHoliday",
		success : function(r) {
			
			var divContent="";
			
			for ( var i = 0; i < r.listHoliday.length; i++) {
				
				divContent = divContent + '<tr>';

				divContent = divContent + "<td class='col-md-1 center'>"
						+ "<label>"+ (i + 1) + "</label></td>";
				divContent = divContent + "<td class='col-md-1 center'>"
						+ " <input type='text'   class='center'  readonly='true' id='date"   + (i + 1) + "' value='" + r.listHoliday[i].date
						+ "' ></td>";
				divContent = divContent + "<td class='col-md-1 center'>"
						+ " <input type='text'   class='center'  readonly='true' id='reason"+ (i + 1) + "' value='" + r.listHoliday[i].reason
						+ "' ></td>";
				divContent = divContent + "<td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-success editUserAccess' onclick='editHospitalHoliday("+r.listHoliday[i].idHospitalHolidays+")'><i class='fa fa-edit'></i></button>"
				+"</td>";
				divContent = divContent + "<td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-danger deleteUserAccess' onclick='deleteHospitalHoliday("+r.listHoliday[i].idHospitalHolidays+")'><i class='fa fa-trash-o'</i></button>"
				+"</td>"
				+ "</tr>";

			}
			$('#hospitalHolidayBody').html(divContent);
		}
	});
}

function editHospitalHoliday(idHospitalHolidays) {
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/hospitalholiday/editHospitalHoliday",
			data : {
				idHospitalHolidays : idHospitalHolidays
				},
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				 $('#idHospitalHolidays').val(r.idHospitalHolidays);
				 $('#date').val(r.date);
				 $('#reason').val(r.reason);
				 $("#holidayForm").toggle('slow');
			}
		});	
}
		
function deleteHospitalHoliday(idHospitalHolidays)
{
	var r = confirm("Are You Sure You Want To Delete Record ?");
	if (r == true)
	var inputs = [];
	inputs.push('idHospitalHolidays=' + idHospitalHolidays);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/hospitalholiday/deleteHospitalHoliday",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				
				fetchHospitalHoliday();
				
			}
		});
	
}

/*****************************************
* @author	:Dnyaneshwar Kadam
* @date		: 17-Jan-2020
* @codeFor	: SaveHospitalOwnerDeatil
 *****************************************/
function toggleForm(id){
	$("#"+id).toggle('slow');
}
function resetHospitalOwnerDetail(){	
	$('#hiddenOwnerId').val("");
	$('#idhospital').val("");
	$('#txtOwnerName').val("");
	$('#txtAddress').val("");
	$('#email').val("");
	$('#txtContact').val("");
	$('#date-pick').val("");
	$('#txtAge').val("");
	$('#txtOPDPer').val("");
	$('#txtIPDPer').val("");
	//toggleEntryDiv('ownerForm');
	return false;
}

function saveHospitalOwnerDetail()
{
var selTitle = $("#selTitle").val();

var idhospital = $("#idhospital").val();
//alert("idhospital"+idhospital);
if (idhospital == null || idhospital == "" || idhospital == undefined) {
	
	idhospital = 0;	
}

if (selTitle == null || selTitle == "") {
	selTitle = "";
}
	var txtOwnerName = $("#txtOwnerName").val();	
	if (txtOwnerName == null || txtOwnerName == "") {
		alert("Please Enter Name");
		txtOwnerName = "";
		return false;
	}

	var txtAddress = $("#txtAddress").val();
	if (txtAddress == null || txtAddress == "") {
		txtAddress = "";
	}
	
	var email = $("#email").val();
	if (email == null || email == "") {
		email = "";
	}
	
	var txtContact = $("#txtContact").val();
	if (txtContact == null || txtContact == "") {
		alert("Please Enter Contact Number");
		txtContact = "";
		return false;
	}
	
	
	var datepick = $("#date-pick").val();
	if (datepick == null || datepick == "") {
		datepick = "";
	}

	var txtAge = $("#txtAge").val();
	if (txtAge == null || txtAge == "") {
		alert("Please Enter Age");
		txtAge = "";
		return false;
	}

	var txtOPDPer = $("#txtOPDPer").val();
	if (txtOPDPer == null || txtOPDPer == "") {
		txtOPDPer = "";
	}
	
	
	var txtIPDPer = $("#txtIPDPer").val();	
	if (txtIPDPer == null || txtIPDPer == "") {
		txtIPDPer = "";
	}

	var idhospitalOwner = $("#hiddenOwnerId").val();

	
	var hospitalOwnerlist = {   
			listHospitalOwner : []
		};
	
	hospitalOwnerlist.listHospitalOwner.push({
		idhospitalOwner : idhospital,
		title : selTitle,
		name : txtOwnerName,
		email : email,
		address : txtAddress,
		contact : txtContact,
		dob : datepick,
		age : txtAge,
		opdPerc : txtOPDPer,
		ipdPerc : txtIPDPer,

	});
	hospitalOwnerlist = JSON.stringify(hospitalOwnerlist);	
	var inputs = [];	
	inputs.push("savehospitalownerdetail=" + encodeURIComponent(hospitalOwnerlist));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/hospitalowner/savehospitalownerdetail",
		data : str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			resetHospitalOwnerDetail();
			getFetchHospitalOwnerDetail();
		}
	});
}

function getFetchHospitalOwnerDetail() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/hospitalowner/getFetchHospitalOwnerDetail",
		success : function(r)
		
		{			
			setFetchHospitalOwnerDetail(r);
		}
	});
}

function setFetchHospitalOwnerDetail(r)
{	
	var index=1;
	var htm="";
			for(var i=1;i<r.listHospitalOwner.length;i++)
				{
				
			htm=htm+ "<tr><td style='height: 15.5px;' class='col-md-1 center'>"+index+"</td>"
			
				+ "<td  class='numeric col-md-2 center'>"+r.listHospitalOwner[i].name+"</td>"
				+ "<td  class='numeric col-md-1 center'>"
				+ "<button class='btn btn-xs btn-success editUserAccess' onclick='editHospitalOwnerDetail("+r.listHospitalOwner[i].idhospitalOwner+")'><i class='fa fa-edit'></i></button>"
				+"</td>"
				+ "<td  class='col-md-1 center'>" 
				+ "<button class='btn btn-xs btn-danger deleteUserAccess' onclick='deleteHospitalOwnerDetail("+r.listHospitalOwner[i].idhospitalOwner+")'><i class='fa fa-trash-o'</i></button>"
				+"</td>"
				+ "</tr>";
			index++;
				}
				$("#hospitalOwnerDetail").html(htm);
}

function editHospitalOwnerDetail(idhospitalOwner) {
	
	var inputs = [];	
	inputs.push("hospitalOwnerlist=" + encodeURIComponent(idhospitalOwner));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/hospitalowner/editHospitalOwnerDetail",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				var myJSON = JSON.stringify(r);
				$("#idhospital").val(r.idhospitalOwner);
				$("#hiddenOwnerId").val(r.idhospitalOwner);
				$("#selTitle").val(r.title);
				$("#txtOwnerName").val(r.name);
				$("#txtAddress").val(r.address);
				$("#email").val(r.email);
				$("#txtContact").val(r.contact);
				$("#date-pick").val(r.dob);
				$("#txtAge").val(r.age);
				$("#txtOPDPer").val(r.opdPerc);
				$("#txtIPDPer").val(r.ipdPerc);
				$("#ownerForm").toggle('slow');
			}
		});	
}
		
function deleteHospitalOwnerDetail(idhospitalOwner)
{
	var r = confirm("Are You Sure You Want To Delete Record ?");
	if (r == true)	
	var inputs = [];	
	inputs.push("savehospitalownerdetail=" + encodeURIComponent(idhospitalOwner));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
			type : "POST",
			url : "ehat/hospitalowner/deletehospitalownerdetail",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				
				getFetchHospitalOwnerDetail();
				
			}
		});
}
/*******************************
* @author	:.........
* @date		: 20-Jan-2020
* @codeFor	:Print Master
 *****************************/
/* For privilege Type in database

Profile = 1
Manually = 2
Role = 3*/

function insertModule(){
	var moduleId = $('#masterModuleId').val();
	if(moduleId=="" || moduleId==null){
		saveModule();
	}
	else{
		updateModule(moduleId);
	}
}

function refreshModuleMaster(){
	$('#masterModuleId').val("");
	$('#moduleName').val("");
	getAllModule();
}

function saveModule(){
	var moduleName = $('#moduleName').val();
	if(moduleName!="" && moduleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "admin/ehat/saveModule",
		data : {
			"moduleName" : moduleName
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshModuleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter module name");
	}
}

function getModuleByModuleId(moduleId){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getModuleByModuleId",
		data : {
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#moduleId').val(response.moduleId);
			$('#masterModuleId').val(response.moduleId);
			$('#moduleName').val(response.moduleName);
		}
	});
}
function updateModule(moduleId){
	var moduleName = $('#moduleName').val();
	if(moduleName!="" && moduleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/updateModule",
		data : {
			"moduleId" : moduleId,
			"moduleName" : moduleName
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshModuleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter module name");
	}
}

function deleteModule(moduleId){
	var r = confirm("Are you sure you want to delete module?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/deleteModule",
		data : {
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshModuleMaster();
			alert(response);
		}
	});
	}
}

function changeModule(){
	var moduleId = $('#moduleList').val();
	getAllSubModuleByModuleId(moduleId);
}

function getAllSubModuleByModuleId(moduleId){
	if(moduleId!="" && moduleId!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getAllSubModuleByModuleId",
		data : {
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var subModuleId = $('#subModuleListSpan').val();
			var selectList = "<option value=''>-Select-</option>";
			if(response.length>0){
				for(var i=0;i<response.length;i++){
					selectList = selectList + "<option value='"+response[i].subModuleId+"'>"+response[i].subModuleName+"</option>";
				}
				$('#subModuleList').html(selectList);
			}
			else{
				$('#subModuleList').html("<option value=''>No sub menu</option>");
			}
			if(subModuleId!="" && subModuleId!=null){
				$('#subModuleList').val(subModuleId);
			}
		}
	});
	}
}

function getAllModule(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/getAllModules",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert(response);
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			var tableBody="";
			var index = 1;
			var selectList = "<option value=''>-Select-</option>";
			var moduleTree = "";
			var moduleBody="";
			var printModuleBody="";
			for(var i=0;i<response.length;i++){
				tableBody = tableBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].moduleId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].moduleName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getModuleByModuleId("+response[i].moduleId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteModule("+response[i].moduleId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
				
				//for module drop down list
				selectList = selectList + "<option value='"+response[i].moduleId+"'>"+response[i].moduleName+"</option>";
			
				//for module tree
				moduleTree = moduleTree +"<li><a>"+response[i].moduleName+"</a><ul id='module_"+response[i].moduleId+"'></ul></li>";
			
				//for module body
				moduleBody = moduleBody +"<tr id='module_"+response[i].moduleId+"'><td>"+response[i].moduleName+"</td><td><input id='moduleView_"+response[i].moduleId+"' class='moduleView viewAll' value='"+response[i].moduleId+"' type='checkbox'></td><td><input id='moduleEdit_"+response[i].moduleId+"' class='moduleEdit editAll' value='"+response[i].moduleId+"' type='checkbox'></td><td><input id='moduleDelete_"+response[i].moduleId+"' class='moduleDelete deleteAll' value='"+response[i].moduleId+"' type='checkbox'></td><td><button id='showmodule_"+response[i].moduleId+"' onclick=toggle('module_"+response[i].moduleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
				+"<tr style='display:none;' class='module_"+response[i].moduleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'><div class='box border blue'><div class='box-body'><table class='table table-striped'>"+
				"<thead><tr><th>Modules</th><th>View</th><th>Create/Edit</th><th>Delete</th><th>On/Off</th><th>Sub-Module</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"'></tbody></table></div></div></td></tr>";
				
				//for print module body
				printModuleBody = printModuleBody +"<tr id='module_"+response[i].moduleId+"'><td>"+response[i].moduleName+"</td><td><button id='showmodule_"+response[i].moduleId+"' onclick=toggle('module_"+response[i].moduleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
				+"<tr style='display:none;' class='module_"+response[i].moduleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='5'><table class='table table-bordered table-condensed'>"+
				"<thead><tr><th>Modules</th><th>Value</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"'></tbody></table></td></tr>";
			}
			if(currentPage=="user_access_module_master"){
				$('#moduleId').val(index);
				$('#moduleName').val("");
				$('#masterModuleBody').html(tableBody);
			}
			else if(currentPage=="user_access_sub_module_master" || currentPage=="adminPrintMaster" || currentPage=="generalForm"){
				
				$('#moduleList').html(selectList);
				$('.moduleTree').html(moduleTree);
			}
			else if(currentPage=="user_access" || currentPage=="user_access_profile_master" || currentPage=="user_access_role_master"){
				$('#moduleBody').html(moduleBody);
			}
			else if(currentPage=="admin_genral_access_print_access_master"){
				$('#moduleBody').html(printModuleBody);
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function getAllSubModule(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/admin/getAllSubModules",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//setTimeout(function(){
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			
			if(currentPage=="user_access_sub_module_master"){
			if(response.length>0){
				$('#subModuleId').val(response.length+1);
			}
			for(var i=0;i<response.length;i++){
				if(response[i].subModId!=null && response[i].subModId!="null" && response[i].subModId!=""){
					$('#module_'+response[i].moduleId+'_'+response[i].subModId).append("<li id='subModule_"+response[i].subModuleId+"' class='moduleLi'><a>"+response[i].subModuleName+"</a><input type='button' class='btn btn-xs btn-primary editUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Edit' onclick='getSubModuleBySubModuleId("+response[i].subModuleId+")' disabled='disabled'><input type='button' class='btn btn-xs btn-danger deleteUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Delete' onclick='deleteSubModule("+response[i].subModuleId+")' disabled='disabled'><ul id='module_"+response[i].moduleId+"_"+response[i].subModuleId+"'></ul></li>");
				}
				else{
					$('#module_'+response[i].moduleId).append("<li id='subModule_"+response[i].subModuleId+"' class='moduleLi'><a>"+response[i].subModuleName+"</a><input type='button' class='btn btn-xs btn-primary editUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Edit' onclick='getSubModuleBySubModuleId("+response[i].subModuleId+")' disabled='disabled'><input type='button' class='btn btn-xs btn-danger deleteUserAccess editSubModuleBtn_"+response[i].subModuleId+"' value='Delete' onclick='deleteSubModule("+response[i].subModuleId+")' disabled='disabled'><ul id='module_"+response[i].moduleId+"_"+response[i].subModuleId+"'></ul></li>");
				}
			}
			
			$('.moduleTree ul').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					$('#'+ulId).remove();
				}
			});
			
			$('.moduleLi').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					var text = $('#'+ulId).find('a').html();
					$('#'+ulId).find('a').replaceWith("<span style='font-size: 1.3em; color: black;'>"+text+"</span>");
				}
			});
			
			var tree = document.querySelectorAll('ul.moduleTree a:not(:last-child)');
			for(var i = 0; i < tree.length; i++){
			    tree[i].addEventListener('click', function(e) {
			        var parent = e.target.parentElement;
			        var classList = parent.classList;
			        if(classList.contains("open")) {
			            classList.remove('open');
			            var opensubs = parent.querySelectorAll(':scope .open');
			            for(var i = 0; i < opensubs.length; i++){
			                opensubs[i].classList.remove('open');
			            }
			        } else {
			            classList.add('open');
			        }
			    });
			}
										$(".moduleLi").hover(
							function() {
								var subModuleId = $(this).attr('id').split("_")[1];
								$('.editSubModuleBtn_'+subModuleId).css("display", "inline");
							},
							function() {
								var subModuleId = $(this).attr('id').split("_")[1];
								$('.editSubModuleBtn_'+subModuleId).css("display", "none");
							});
			}
			else if(currentPage=="user_access" || currentPage=="user_access_profile_master" || currentPage=="user_access_role_master"){
				for(var i=0;i<response.length;i++){
					if(response[i].subModId!=null && response[i].subModId!="null" && response[i].subModId!=""){
						$('#subModuleBody_'+response[i].moduleId+'_'+response[i].subModId).append("<tr id='subModule_"+response[i].subModuleId+"'><td>"+response[i].subModuleName+"</td><td><input id='subModuleView_"+response[i].subModuleId+"' class='subModuleView viewAll moduleView_"+response[i].moduleId+" subModuleView_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleEdit_"+response[i].subModuleId+"' class='subModuleEdit editAll moduleEdit_"+response[i].moduleId+" subModuleEdit_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleDelete_"+response[i].subModuleId+"' class='subModuleDelete deleteAll moduleDelete_"+response[i].moduleId+" subModuleDelete_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleOnOff_"+response[i].subModuleId+"' class='subModuleOnOff viewAll editAll deleteAll moduleView_"+response[i].moduleId+" moduleEdit_"+response[i].moduleId+" moduleDelete_"+response[i].moduleId+" subModuleOnOff_"+response[i].subModId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><button id='showsubModule_"+response[i].subModuleId+"' onclick=toggle('subModule_"+response[i].subModuleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
								+"<tr style='display:none;' class='subModule_"+response[i].subModuleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='6'><div class='box border blue'><div class='box-body'><table class='table table-striped'>"+
								"<thead><tr><th>Modules</th><th>View</th><th>Create/Edit</th><th>Delete</th><th>On/Off</th><th>Sub-Module</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"_"+response[i].subModuleId+"'></tbody></table></div></div></td></tr>");
					}
					else{
						$('#subModuleBody_'+response[i].moduleId).append("<tr id='subModule_"+response[i].subModuleId+"'><td>"+response[i].subModuleName+"</td><td><input id='subModuleView_"+response[i].subModuleId+"' class='subModuleView viewAll moduleView_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleEdit_"+response[i].subModuleId+"' class='subModuleEdit editAll moduleEdit_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleDelete_"+response[i].subModuleId+"' class='subModuleDelete deleteAll moduleDelete_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><input id='subModuleOnOff_"+response[i].subModuleId+"' class='subModuleOnOff viewAll editAll deleteAll moduleView_"+response[i].moduleId+" moduleEdit_"+response[i].moduleId+" moduleDelete_"+response[i].moduleId+"' value='"+response[i].subModuleId+"' type='checkbox' disabled></td><td><button id='showsubModule_"+response[i].subModuleId+"' onclick=toggle('subModule_"+response[i].subModuleId+"') style='padding-right: 20px; padding-left: 20px;' class='btn btn-xs' data-togglehandler='2-fields' data-handlerfor='fields' type='button'><i class='fa fa-chevron-down'></i></button></td></tr>"
								+"<tr style='display:none;' class='subModule_"+response[i].subModuleId+"'><td style='padding-left: 20px; padding-right: 20px;' colspan='6'><div class='box border blue'><div class='box-body'><table class='table table-striped'>"+
								"<thead><tr><th>Modules</th><th>View</th><th>Create/Edit</th><th>Delete</th><th>On/Off</th><th>Sub-Module</th></tr></thead><tbody id='subModuleBody_"+response[i].moduleId+"_"+response[i].subModuleId+"'></tbody></table></div></div></td></tr>");
					}
					if(response[i].subModuleType=="1"){
						$("#subModuleView_"+response[i].subModuleId).removeAttr("disabled");
						$("#subModuleEdit_"+response[i].subModuleId).removeAttr("disabled");
						$("#subModuleDelete_"+response[i].subModuleId).removeAttr("disabled");
						
						$("#subModuleOnOff_"+response[i].subModuleId).removeClass();
					}
					else{
						$("#subModuleOnOff_"+response[i].subModuleId).removeAttr("disabled");
						
						$("#subModuleView_"+response[i].subModuleId).removeClass();
						$("#subModuleEdit_"+response[i].subModuleId).removeClass();
						$("#subModuleDelete_"+response[i].subModuleId).removeClass();
						
					}
				}
				
				$('#moduleBody tbody').map(function(){
					var tableId = this.id;
					var rowCount = $('#'+tableId +' tr').length;
					if(rowCount == 0){
						var removeTable = $('#'+tableId).closest('tr').attr('class');
						$('.'+removeTable).remove();
						$('#'+removeTable).find('button').remove();
					}
				});
			}
		//},350);
		}
	});
}

function toggle(id){
	$('.'+id).toggle('slow');
	$('#show'+id).children().toggleClass('fa-chevron-down fa-chevron-up');
}

function insertSubModule(){
	var subModuleId = $('#masterSubModuleId').val();
	if(subModuleId=="" || subModuleId==null){
		saveSubModule();
	}
	else{
		updateSubModule(subModuleId);
	}
}

function refreshSubModuleMaster(){
	$('#masterSubModuleId').val("");
	$('#subModuleName').val("");
	$('#subModuleType').val("1");
	$('#moduleList').val("");
	$('#subModuleList').val("");
	getAllModule();
	getAllSubModule();
}

function saveSubModule(){
	var subModuleName = $('#subModuleName').val();
	var moduleId = $('#moduleList').val();
	var subModId = $('#subModuleList').val();
	var subModuleType = $('#subModuleType').val();
	if(subModuleName=="" || subModuleName==null){
		alert("Please enter sub module name");
	}
	else if(moduleId=="" || moduleId==null){
		alert("Please select module");
	}
	else{
		jQuery.ajax({
			type : "POST",
			url : "ehat/admin/saveSubModule",
			data : {
				"subModuleName" : subModuleName,
				"moduleId" : moduleId,
				"subModId" : subModId,
				"subModuleType" : subModuleType
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshSubModuleMaster();
				alert(response);
				setTimeout(function(){userAccess();},100);
			}
		});
	}
}

function getSubModuleBySubModuleId(subModuleId){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getSubModuleBySubModuleId",
		data : {
			"subModuleId" : subModuleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			getAllSubModuleByModuleId(response.moduleId);
			$('#subModuleId').val(response.subModuleId);
			$('#masterSubModuleId').val(response.subModuleId);
			$('#subModuleName').val(response.subModuleName);
			$('#moduleList').val(response.moduleId);
			$('#subModuleType').val(response.subModuleType);
			if(subModuleId!=response.subModId && response.subModId!=null && response.subModId!="null"){
				$('#subModuleListSpan').val(response.subModId);
			}
			else{
				$('#subModuleListSpan').val(response.subModId);
			}
		}
	});
}

function updateSubModule(subModuleId){
	var subModuleName = $('#subModuleName').val();
	var moduleId = $('#moduleList').val();
	var subModId = $('#subModuleList').val();
	var subModuleType = $('#subModuleType').val();
	if(subModuleName=="" || subModuleName==null){
		alert("Please enter sub module name");
	}
	else if(moduleId=="" || moduleId==null){
		alert("Please select module");
	}
	else{
		jQuery.ajax({
			type : "POST",
			url : "ehat/admin/updateSubModule",
			data : {
				"subModuleId" : subModuleId,
				"subModuleName" : subModuleName,
				"moduleId" : moduleId,
				"subModId" : subModId,
				"subModuleType" : subModuleType
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				refreshSubModuleMaster();
				alert(response);
				setTimeout(function(){userAccess();},100);
			}
		});
	}
}

function deleteSubModule(subModuleId){
	var r = confirm("Are you sure you want to delete sub module?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/deleteSubModule",
		data : {
			"subModuleId" : subModuleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshSubModuleMaster();
			alert(response);
			setTimeout(function(){userAccess();},100);
		}
	});
	}
}

function insertProfile(){
	var profileId = $('#masterProfileId').val();
	if(profileId=="" || profileId==null){
		saveProfile();
	}
	else{
		updateProfile(profileId);
	}
}

function refreshProfileMaster(){
	$('#masterProfileId').val("");
	$('#profileName').val("");
	$('#moduleBody :checkbox').map(function(){
		$('#'+this.id).prop('checked', false);
	});
	getAllProfile();
}

function saveProfile(){
	var profileName = $('#profileName').val();
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(profileName!="" && profileName!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/saveProfile",
		data : {
			"profileName" : profileName,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshProfileMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter profile name");
	}
}

function updateProfile(profileId){
	var profileName = $('#profileName').val();
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(profileName!="" && profileName!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/updateProfile",
		data : {
			"profileId" : profileId,
			"profileName" : profileName,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshProfileMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter profile name");
	}
}

function getProfileByProfileId(profileId){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getProfileByProfileId",
		data : {
			"profileId" : profileId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#profileId').val(response.profileId);
			$('#masterProfileId').val(response.profileId);
			$('#profileName').val(response.profileName);
			$('#moduleBody :checkbox').map(function(){
				$('#'+this.id).prop('checked', false);
			});
			if(response.userModuleAccessView!=null && response.userModuleAccessView!=""){
				var moduleViewAccess=response.userModuleAccessView.split(",");
				for(var i=0;i<moduleViewAccess.length;i++){
					$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessEdit!=null && response.userModuleAccessEdit!=""){
				var moduleEditAccess=response.userModuleAccessEdit.split(",");
				for(var i=0;i<moduleEditAccess.length;i++){
					$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessDelete!=null && response.userModuleAccessDelete!=""){
				var moduleDeleteAccess=response.userModuleAccessDelete.split(",");
				for(var i=0;i<moduleDeleteAccess.length;i++){
					$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessView!=null && response.userSubModuleAccessView!=""){
				var subModuleViewAccess=response.userSubModuleAccessView.split(",");
				for(var i=0;i<subModuleViewAccess.length;i++){
					$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessEdit!=null && response.userSubModuleAccessEdit!=""){
				var subModuleEditAccess=response.userSubModuleAccessEdit.split(",");
				for(var i=0;i<subModuleEditAccess.length;i++){
					$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessDelete!=null && response.userSubModuleAccessDelete!=""){
				var subModuleDeleteAccess=response.userSubModuleAccessDelete.split(",");
				for(var i=0;i<subModuleDeleteAccess.length;i++){
					$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleOnOff!=null && response.userSubModuleOnOff!=""){
				var subModuleOnOffAccess=response.userSubModuleOnOff.split(",");
				for(var i=0;i<subModuleOnOffAccess.length;i++){
					$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
				}
			}
			
		}
	});
}

function deleteProfile(profileId){
	var r = confirm("Are you sure you want to delete profile?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/deleteProfile",
		data : {
			"profileId" : profileId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshProfileMaster();
			alert(response);
		}
	});
	}
}

function getAllProfile(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getAllProfile",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
		
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			var tableBody="";
			var index = 1;
			var profileList = "<option value=''></option>";
			for(var i=0;i<response.length;i++){
				tableBody = tableBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].profileId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].profileName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getProfileByProfileId("+response[i].profileId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteProfile("+response[i].profileId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
			
				profileList = profileList + "<option value='"+response[i].profileId+"'>"+response[i].profileName+"</option>";
			}
			if(currentPage=="user_access_profile_master"){
			$('#profileMasterBody').html(tableBody);
			$('#profileId').val(index);
			}
			if(currentPage=="user_access_role_master"){
				$('#profileList').html(profileList);
				$(function() {
			        $('.chosen-select').chosen();
			        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
			      });
			}
			if(currentPage=="user_access"){
				$('#profileList').html(profileList);
			}
			setTimeout(function(){userAccess();},200);
		}
	});
}

$(document).on('change', '#moduleBody input[type="checkbox"]', function () { 
	var id = $(this).attr('id');
	if ($(this).is(':checked')) {
        $('.'+id).prop("checked",true);
    }
	else{
		$('.'+id).prop("checked",false);
	}
});

function selectAll(value){
	if ($("#"+value).is(':checked')) {
        $('.'+value).prop("checked",true);
    }
	else{
		$('.'+value).prop("checked",false);
	}
}

$(document).on('change', 'input[name="privilegesType"]', function () { 
	var value = $(this).val();
	if (value == "1") {
		$('#profileDiv').show();
		$('#roleTableDiv').hide();
    }
	else{
		 $('#profileDiv').hide();
		 $('#roleTableDiv').show();
		 var profileId = $('#profileList').val();
		 $('#moduleBody :checkbox').map(function(){
			$('#'+this.id).prop('checked', false);
		 });
		 getProfileAccessByProfile(profileId);
	}
});

function getProfileAccessByProfile(profileId){
	if(profileId!=null && profileId!=""){
		 jQuery.ajax({
				type : "POST",
				url : "ehat/admin/getProfileAccessByProfile",
				data : {
					"profileId" : profileId.toString()
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('#moduleBody :checkbox').map(function(){
						$('#'+this.id).prop('checked', false);
					});
					for(var j=0;j<response.length;j++){
						if(response[j].userModuleAccessView!=null && response[j].userModuleAccessView!=""){
							var moduleViewAccess=response[j].userModuleAccessView.split(",");
							for(var i=0;i<moduleViewAccess.length;i++){
								$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessEdit!=null && response[j].userModuleAccessEdit!=""){
							var moduleEditAccess=response[j].userModuleAccessEdit.split(",");
							for(var i=0;i<moduleEditAccess.length;i++){
								$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessDelete!=null && response[j].userModuleAccessDelete!=""){
							var moduleDeleteAccess=response[j].userModuleAccessDelete.split(",");
							for(var i=0;i<moduleDeleteAccess.length;i++){
								$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessView!=null && response[j].userSubModuleAccessView!=""){
							var subModuleViewAccess=response[j].userSubModuleAccessView.split(",");
							for(var i=0;i<subModuleViewAccess.length;i++){
								$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessEdit!=null && response[j].userSubModuleAccessEdit!=""){
							var subModuleEditAccess=response[j].userSubModuleAccessEdit.split(",");
							for(var i=0;i<subModuleEditAccess.length;i++){
								$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessDelete!=null && response[j].userSubModuleAccessDelete!=""){
							var subModuleDeleteAccess=response[j].userSubModuleAccessDelete.split(",");
							for(var i=0;i<subModuleDeleteAccess.length;i++){
								$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleOnOff!=null && response[j].userSubModuleOnOff!=""){
							var subModuleOnOffAccess=response[j].userSubModuleOnOff.split(",");
							for(var i=0;i<subModuleOnOffAccess.length;i++){
								$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
							}
						}
					}
				}
			});
	 }
}

function getRoleAccessByRole(roleId){
	if(roleId!=null && roleId!=""){
		 jQuery.ajax({
				type : "POST",
				url : "ehat/admin/getRoleAccessByRole",
				data : {
					"roleId" : roleId.toString()
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('#moduleBody :checkbox').map(function(){
						$('#'+this.id).prop('checked', false);
					});
					if(response[0].privilegeType == "1"){
						getProfileAccessByProfile(response[0].profileId);
					}
					else{
					for(var j=0;j<response.length;j++){
						if(response[j].userModuleAccessView!=null && response[j].userModuleAccessView!=""){
							var moduleViewAccess=response[j].userModuleAccessView.split(",");
							for(var i=0;i<moduleViewAccess.length;i++){
								$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessEdit!=null && response[j].userModuleAccessEdit!=""){
							var moduleEditAccess=response[j].userModuleAccessEdit.split(",");
							for(var i=0;i<moduleEditAccess.length;i++){
								$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userModuleAccessDelete!=null && response[j].userModuleAccessDelete!=""){
							var moduleDeleteAccess=response[j].userModuleAccessDelete.split(",");
							for(var i=0;i<moduleDeleteAccess.length;i++){
								$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessView!=null && response[j].userSubModuleAccessView!=""){
							var subModuleViewAccess=response[j].userSubModuleAccessView.split(",");
							for(var i=0;i<subModuleViewAccess.length;i++){
								$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessEdit!=null && response[j].userSubModuleAccessEdit!=""){
							var subModuleEditAccess=response[j].userSubModuleAccessEdit.split(",");
							for(var i=0;i<subModuleEditAccess.length;i++){
								$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleAccessDelete!=null && response[j].userSubModuleAccessDelete!=""){
							var subModuleDeleteAccess=response[j].userSubModuleAccessDelete.split(",");
							for(var i=0;i<subModuleDeleteAccess.length;i++){
								$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
							}
						}
						if(response[j].userSubModuleOnOff!=null && response[j].userSubModuleOnOff!=""){
							var subModuleOnOffAccess=response[j].userSubModuleOnOff.split(",");
							for(var i=0;i<subModuleOnOffAccess.length;i++){
								$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
							}
						}
					}
					}
				}
			});
	 }
}

function insertRole(){
	var roleId = $('#masterRoleId').val();
	if(roleId=="" || roleId==null){
		saveRole();
	}
	else{
		updateRole(roleId);
	}
}

function refreshRoleMaster(){
	$('#masterRoleId').val("");
	$('#roleName').val("");
	$('#moduleBody :checkbox').map(function(){
		$('#'+this.id).prop('checked', false);
	});
	$('#profileList').val("");
	$('.chosen-select').chosen().trigger("chosen:updated");
	$('#privilege_1').prop('checked', true);
	$('#profileDiv').show();
	$('#roleTableDiv').hide();
	getAllRole();
}

function saveRole(){
	var roleName = $('#roleName').val();
	var privilegesType = $('input[name=privilegesType]:checked').val();
	var profileId = $('#profileList').val();
	if(profileId!=null && profileId!=""){
		profileId = profileId.toString();
	}
	else{
		profileId = "";
	}
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(roleName!="" && roleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/saveRole",
		data : {
			"roleName" : roleName,
			"privilegesType" : privilegesType,
			"profileId" : profileId,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter role name");
	}
}

function updateRole(roleId){
	var roleName = $('#roleName').val();
	var privilegesType = $('input[name=privilegesType]:checked').val();
	var profileId = $('#profileList').val();
	if(profileId!=null && profileId!=""){
		profileId = profileId.toString();
	}
	else{
		profileId = "";
	}
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	if(roleName!="" && roleName!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/updateRole",
		data : {
			"roleId" : roleId,
			"roleName" : roleName,
			"privilegesType" : privilegesType,
			"profileId" : profileId,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoleMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter role name");
	}
}

function getRoleByRoleId(roleId){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getRoleByRoleId",
		data : {
			"roleId" : roleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var profileArray = [];
			$('#roleId').val(response.roleId);
			$('#masterRoleId').val(response.roleId);
			$('#roleName').val(response.roleName);
			$('#privilege_'+response.privilegesType).attr("checked","checked");
			$('#moduleBody :checkbox').map(function(){
				$('#'+this.id).prop('checked', false);
			});
			if (response.privilegesType == "1") {
				$('#profileDiv').show();
				$('#roleTableDiv').hide();
		    }
			else{
				 $('#profileDiv').hide();
				 $('#roleTableDiv').show();
			}
			if(response.profileId!=null && response.profileId!=""){
				var profileId=response.profileId.split(",");
				for(var i=0;i<profileId.length;i++){
					profileArray.push(profileId[i]);
				}
			}
			$('#profileList').val(profileArray);
			if(response.userModuleAccessView!=null && response.userModuleAccessView!=""){
				var moduleViewAccess=response.userModuleAccessView.split(",");
				for(var i=0;i<moduleViewAccess.length;i++){
					$('#moduleView_'+moduleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessEdit!=null && response.userModuleAccessEdit!=""){
				var moduleEditAccess=response.userModuleAccessEdit.split(",");
				for(var i=0;i<moduleEditAccess.length;i++){
					$('#moduleEdit_'+moduleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userModuleAccessDelete!=null && response.userModuleAccessDelete!=""){
				var moduleDeleteAccess=response.userModuleAccessDelete.split(",");
				for(var i=0;i<moduleDeleteAccess.length;i++){
					$('#moduleDelete_'+moduleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessView!=null && response.userSubModuleAccessView!=""){
				var subModuleViewAccess=response.userSubModuleAccessView.split(",");
				for(var i=0;i<subModuleViewAccess.length;i++){
					$('#subModuleView_'+subModuleViewAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessEdit!=null && response.userSubModuleAccessEdit!=""){
				var subModuleEditAccess=response.userSubModuleAccessEdit.split(",");
				for(var i=0;i<subModuleEditAccess.length;i++){
					$('#subModuleEdit_'+subModuleEditAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleAccessDelete!=null && response.userSubModuleAccessDelete!=""){
				var subModuleDeleteAccess=response.userSubModuleAccessDelete.split(",");
				for(var i=0;i<subModuleDeleteAccess.length;i++){
					$('#subModuleDelete_'+subModuleDeleteAccess[i]).attr("checked","checked");
				}
			}
			if(response.userSubModuleOnOff!=null && response.userSubModuleOnOff!=""){
				var subModuleOnOffAccess=response.userSubModuleOnOff.split(",");
				for(var i=0;i<subModuleOnOffAccess.length;i++){
					$('#subModuleOnOff_'+subModuleOnOffAccess[i]).attr("checked","checked");
				}
			}
			$('.chosen-select').chosen().trigger("chosen:updated");
			
			if(roleId<11){
				$('#roleName').attr('disabled','disabled');
			}else{
				$('#roleName').removeAttr('disabled');
			}
			
		}
	});
}

function deleteRole(roleId){
	var r = confirm("Are you sure you want to delete role?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/deleteRole",
		data : {
			"roleId" : roleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoleMaster();
			alert(response);
		}
	});
	}
}

function getAllRole(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getAllRole",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			var tableBody="";
			var index = 1;
			var roleList = "<option value=''></option>";
			
			for(var i=0;i<response.length;i++){
				tableBody = tableBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].roleId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].roleName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getRoleByRoleId("+response[i].roleId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button id='deleteRole_"+index+"' class='btn btn-xs btn-success deleteUserAccess' onclick='deleteRole("+response[i].roleId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
				
				roleList = roleList + "<option value='"+response[i].roleId+"'>"+response[i].roleName+"</option>";
			}
			$('#roleMasterBody').html(tableBody);
			$('#roleId').val(index);
			
			if(currentPage=="user_access"){
				$('#roleList').html(roleList);
				$(function() {
			        $('.chosen-select').chosen();
			        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
			    });
				$('#profileList_chosen').hide();
			}
			for(var j=1;j<11;j++){
				$("#deleteRole_"+j).removeClass('deleteUserAccess').prop("disabled", true ).removeAttr("onclick");
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

$(document).on('change', 'input[name="accessType"]', function () { 
	var value = $(this).val();
	if (value == "3") {
		$('#roleDiv').show();
		$('#profileList_chosen').hide();
		$('#tableDiv').hide();
    }
	else if (value == "1"){
		$('#roleDiv').hide();
		$('#profileList_chosen').show();
		$('#tableDiv').hide();
	}
	else if (value == "2"){
		$('#moduleBody :checkbox').map(function(){
			$('#'+this.id).prop('checked', false);
		});
		$('#roleDiv').hide();
		$('#profileList_chosen').hide();
		$('#tableDiv').show();
		var accessType=$('#accessTypeBeforeChange').val();
		if(accessType == "3"){
			var roleId = $('#roleList').val();
			getRoleAccessByRole(roleId);
		}
		else if(accessType == "1"){
			var profileId = $('#profileList').val();
			getProfileAccessByProfile(profileId);
		}
	}
	$('#accessTypeBeforeChange').val(value);
});

function userAccessAutoSuggestion(startIndex){
	var search = $('#searchUser').val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/userAccessAutoSuggestion",
		data : {
			"search" : search,
			"startIndex" : startIndex
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var userTableBody = "";
			if(response.usersList.length > 0){
				$('#start').html(parseInt(startIndex)+1);
				var last="";
				if($('#start').html()!=""){
					last = parseInt($('#start').html())+response.usersList.length-1;
				}
				else{
					last = response.usersList.length;
				}
				$('#last').html(last);
				if(startIndex=="0"){
				var numberOfRows="";
				var index=1;
				var count=response.count;
				var numberOfPages=Math.ceil((count/10));
				var displayPagination=numberOfPages;
				$('#total').html(count);
				if(numberOfPages>5){
					/*numberOfRows +="<li class='disabled'><a	id='userAccessFirst'>First</a></li>"
						+"<li class='disabled'><a onclick='previousPagination("+index+","+Math.round(numberOfPages)+")' id='userAccessPrev'>Previous</a></li>";*/
					displayPagination=5;
				}
				for(var j=0;j<displayPagination;j++){
					numberOfRows +="<li onclick='userAccessAutoSuggestion("+(parseInt(index)-1)+"0)'><a>"+index+"</a></li>";
					index=index+1;
				}
				if(numberOfPages>=6){
					numberOfRows +="<li><a onclick='nextPagination("+index+","+Math.round(numberOfPages)+")' id='userAccessNext'>Next</a></li>"
						 +"<li onclick='userAccessAutoSuggestion("+(parseInt(numberOfPages)-1)+"0)'><a id='userAccessLast'>Last</a></li>";
				}
				$('#userPagination').html(numberOfRows);
			}
			for(var i=0;i<response.usersList.length;i++){
				var first = (response.usersList[i].firstName).substring(0, 1);
				var last = (response.usersList[i].lastName).substring(0, 1);
				userTableBody = userTableBody +"<tr id='user_"+response.usersList[i].userId+"' class='gradeX'><td><span class='badge'>"+first+""+last+"</span> "+response.usersList[i].fullName+"</td><td>"+response.usersList[i].userName+"</td><td class='hidden-xs'>"+response.usersList[i].emailId+"</td><td>"+response.usersList[i].role+"</td></tr>";
			}
			}
			else{
				userTableBody = userTableBody +"<tr><td class='center' colspan='4'><b>No results found...</b></td></tr>";
			}
			$('#userTableBody').html(userTableBody);
			
			if(search == ""){
				$('#paginationDiv').show();
			}
			else{
				$('#paginationDiv').hide();
			}
		}
	});
}

$(document).on('click', '#userPagination li', function () {
	$(this).addClass('active').siblings().removeClass('active');
});

function nextPagination(currentIndex,numberOfPages){
	var numberOfRows ="<li onclick='userAccessAutoSuggestion(0)'><a id='userAccessFirst'>First</a></li>"
		+"<li><a onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='userAccessPrev'>Previous</a></li>";
	var displayPagination=currentIndex+5;
	if(numberOfPages < displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='userAccessAutoSuggestion("+(parseInt(currentIndex)-1)+"0)'><a>"+currentIndex+"</a></li>";
		currentIndex=currentIndex+1;
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +="<li><a onclick='nextPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='userAccessNext'>Next</a></li>"
			 +"<li onclick='userAccessAutoSuggestion("+(parseInt(numberOfPages)-1)+"0)'><a id='userAccessLast'>Last</a></li>";
	}
	$('#userPagination').html(numberOfRows);
}

function previousPagination(currentIndex,numberOfPages){
	var numberOfRows ="";
	var displayPagination=currentIndex-5;
	if(currentIndex > 6){
		numberOfRows ="<li onclick='userAccessAutoSuggestion(0)'><a id='userAccessFirst'>First</a></li>"
			+"<li><a onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")' id='userAccessPrev'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='userAccessAutoSuggestion("+(j-1)+"0)'><a>"+j+"</a></li>";
	}
	numberOfRows +="<li><a onclick='nextPagination("+j+","+Math.round(numberOfPages)+")' id='userAccessNext'>Next</a></li>"
			 +"<li onclick='userAccessAutoSuggestion("+(numberOfPages-1)+"0)'><a id='userAccessLast'>Last</a></li>";
	$('#userPagination').html(numberOfRows);
}

$(document).on('click', '#userTableBody tr', function () {
	var id = $(this).attr("id");
	var userId = id.split("_")[1];
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getUser",
		data : {
			"userId" : userId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(response) {
			window.location.href = "user_access.jsp";
		}
	});
});

function saveUserAccess(){
	var userId = $('#masterUserId').val();
	var privilegesType = $('input[name=accessType]:checked').val();
	var roleId = $('#roleList').val();
	var profileId = $('#profileList').val();
	if(roleId!=null && roleId!=""){
		roleId = roleId.toString();
	}
	if(profileId!=null && profileId!=""){
		profileId = profileId.toString();
	}
	var userModuleAccessView=[];
	var userModuleAccessEdit=[];
	var userModuleAccessDelete=[];
	var userSubModuleAccessView=[];
	var userSubModuleAccessEdit=[];
	var userSubModuleAccessDelete=[];
	var userSubModuleOnOff=[];
	$.each($(".moduleView:checked"), function(){
    	userModuleAccessView.push(this.value);
    });
	$.each($(".moduleEdit:checked"), function(){
		userModuleAccessEdit.push(this.value);
    });
	$.each($(".moduleDelete:checked"), function(){
		userModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleView:checked"), function(){
    	userSubModuleAccessView.push(this.value);
    });
	$.each($(".subModuleEdit:checked"), function(){
		userSubModuleAccessEdit.push(this.value);
    });
	$.each($(".subModuleDelete:checked"), function(){
		userSubModuleAccessDelete.push(this.value);
    });
	$.each($(".subModuleOnOff:checked"), function(){
		userSubModuleOnOff.push(this.value);
    });
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/saveUserAccess",
		data : {
			"userId" : userId,
			"privilegesType" : privilegesType,
			"roleId" : roleId,
			"profileId" : profileId,
			"userModuleAccessView" : userModuleAccessView.toString(),
			"userModuleAccessEdit" : userModuleAccessEdit.toString(),
			"userModuleAccessDelete" : userModuleAccessDelete.toString(),
			"userSubModuleAccessView" : userSubModuleAccessView.toString(),
			"userSubModuleAccessEdit" : userSubModuleAccessEdit.toString(),
			"userSubModuleAccessDelete" : userSubModuleAccessDelete.toString(),
			"userSubModuleOnOff" : userSubModuleOnOff.toString()
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alertify.success(response);
		}
	});
}

function getActiveUserCount(){
jQuery.ajax({
	type : "POST",
	url : "ehat/admin/getActiveUserCount",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(response) {
		$('#loginUsers').html(response);
	}
});
}

function getSoftwareUserCount(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getSoftwareUserCount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#softwareUsers').html(response);
		}
	});
}

function getNewUserCount(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getNewUserCount",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#newUsers').html(response);
		}
	});
}

function getUsersLoginOrNew(type){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getUsersLoginOrNew",
		data : {
			"type" : type
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#userDisplayModal').modal('show');
			var userDisplayBody = "";
			var index = 1;
			if(response.length=="0"){
				userDisplayBody = userDisplayBody +"<tr><td class='center' colspan='6'><b>No users found...</b></td></tr>";
			}
			for(var i=0;i<response.length;i++){
				userDisplayBody = userDisplayBody +"<tr class='gradeX'><td>"+index+"</td><td>"+response[i].fullName+"</td><td>"+response[i].userName+"</td><td class='hidden-xs'>"+response[i].emailId+"</td><td>"+response[i].role+"</td><td class='signIn' style='display: none;'>"+response[i].signInTime+"</td><td class='softwareUser' style='display: none;'>"+response[i].softwareUsed+"</td></tr>";
				index++;
			}
			$('#userDisplayBody').html(userDisplayBody);
			if(type=="new"){
				$('#userDisplayModalTitle').html("New Users");
				$('.signIn').hide();
				$('.softwareUser').show();
			}else if(type=="login"){
				$('#userDisplayModalTitle').html("Login Users");
				$('.signIn').show();
				$('.softwareUser').hide();
			}
		}
	});
}

//For print master
function insertPrint(){
	var printId = $('#masterPrintId').val();
	if(printId=="" || printId==null){
		
		savePrint();
	}
	else{
		updatePrint();
		updatePrint(printId);
	}
}

function refreshPrintMaster(){
	$('#masterPrintId').val("");
	$('#printName').val("");
	$('#moduleList').val("");
	getAllModule();
	getAllPrint();
}

function savePrint(){
	var printName = $('#printName').val();
	var moduleId = $('#moduleList').val();
	
	if(printName == "" || printName == null){
		alert("Please Enter Print Name!!!");
		return false;
	}else if(moduleId == "" || moduleId == null || moduleId == undefined){
		alert("Please Select Module Name!!!");
		return false;
	}else{
		
	jQuery.ajax({
		type : "POST",
		url : "ehat/savePrint",
		data : {
			"printName" : printName,
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
			refreshPrintMaster();
		}
	});
	}
}

function updatePrint(){
	var printId = $('#masterPrintId').val();
	var printName = $('#printName').val();
	var moduleId = $('#moduleList').val();
	if(printName!="" && printName!=null){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/updatePrint",
		data : {
			"printId" : printId,
			"printName" : printName,
			"moduleId" : moduleId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
			refreshPrintMaster();
		}
	});
	}
	else{
		alert("Please enter print name");
	}
}

function getPrintByPrintId(printId){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getPrintByPrintId",
		data : {
			"printId" : printId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#printId').val(response.printId);
			$('#masterPrintId').val(response.printId);
			$('#printName').val(response.printName);
			$('#moduleList').val(response.moduleId);
			$("#printForm").toggle('slow');

		}
	});
}

function deletePrint(printId){
	var r = confirm("Are you sure you want to delete print?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/deletePrint",
		data : {
			"printId" : printId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			alert(response);
			refreshPrintMaster();
		}
	});
	}
}

function getAllPrint(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/getAllPrint",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
			
			if(currentPage=="adminPrintMaster"){
			if(response.length>0){
				$('#printId').val(response.length+1);
			}
			for(var i=0;i<response.length;i++){
				$('#module_'+response[i].moduleId).append("<li id='print_"+response[i].printId+"' class='printLi'><a>"+response[i].printName+"</a><input type='button' class='btn btn-xs btn-primary editUserAccess editPrintBtn_"+response[i].printId+"' value='Edit' onclick='getPrintByPrintId("+response[i].printId+")' diabled='disabled'><input type='button' class='btn btn-xs btn-danger deleteUserAccess editPrintBtn_"+response[i].printId+"' value='Delete' onclick='deletePrint("+response[i].printId+")' diabled='disabled'><ul id='module_"+response[i].moduleId+"_"+response[i].printId+"'></ul></li>");
			}
			
			$('.moduleTree ul').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					$('#'+ulId).remove();
				}
			});
			
			$('.printLi').map(function(){
				var ulId = this.id;
				var rowCount = $('#'+ulId +' li').length;
				if(rowCount == 0){
					var text = $('#'+ulId).find('a').html();
					$('#'+ulId).find('a').replaceWith("<span style='font-size: 1.3em; color: black;'>"+text+"</span>");
				}
			});
			
			var tree = document.querySelectorAll('ul.moduleTree a:not(:last-child)');
			for(var i = 0; i < tree.length; i++){
			    tree[i].addEventListener('click', function(e) {
			        var parent = e.target.parentElement;
			        var classList = parent.classList;
			        if(classList.contains("open")) {
			            classList.remove('open');
			            var opensubs = parent.querySelectorAll(':scope .open');
			            for(var i = 0; i < opensubs.length; i++){
			                opensubs[i].classList.remove('open');
			            }
			        } else {
			            classList.add('open');
			        }
			    });
			}
			
								$(".printLi").hover(
							function() {
								var printId = $(this).attr('id').split("_")[1];
								$('.editPrintBtn_'+printId).css("display", "inline");
							},
							function() {
								var printId = $(this).attr('id').split("_")[1];
								$('.editPrintBtn_'+printId).css("display", "none");
							});
			}
			
			else if(currentPage=="admin_genral_access_print_access_master"){
				for(var i=0;i<response.length;i++){
						$('#subModuleBody_'+response[i].moduleId).append("<tr id='print_"+response[i].printId+"'><td>"+response[i].printName+"</td><td><input onkeyup='validateNumbers(event)' id='printAccess_"+response[i].printId+"' class='printAccess' type='text'></tr>");
				}
				
				$('#moduleBody tbody').map(function(){
					var tableId = this.id;
					var rowCount = $('#'+tableId +' tr').length;
					if(rowCount == 0){
						var removeTable = $('#'+tableId).closest('tr').attr('class');
						$('.'+removeTable).remove();
						$('#'+removeTable).find('button').remove();
					}
				});
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function savePrintAccess(){
	var printAccess = [];
	$('.printAccess').map(function(){
		var value = this.value;
		var id = this.id;
		  if(value!="" && value!=null){
			  printAccess.push(id.split("_")[1]+"_"+value);
		  }
	});
	if(printAccess!=null && printAccess.length>0){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/savePrintAccess",
		data : {
			"printAccess" : printAccess
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
		}
	});
	}
	else{
		alert("Please enter at least one value");
	}
}

function getAllPrintAccess(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getAllPrintAccess",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			for(var i=0;i<response.length;i++){
				$('#printAccess_'+response[i].printId).val(response[i].printAccess);
			}
		}
	});
}

function toggleForm(id){
	$("#"+id).toggle('slow');
}
function refreshPrintMaster(){	
	$('#objUserAccess').val("");
	$('#printId').val("");
	$('#printName').val("");
	$('#moduleList').val("");
	toggleEntryDiv('printForm');
	return false;
}


//End of print master

//For Login History
function getAllUser(){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getAllUser",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var loginHistoryUser = "<option value='0'>All</option>";
			for(var i=0;i<response.length;i++){
				loginHistoryUser +="<option value='"+response[i].userId+"'>"+response[i].fullName+"</option>";
			}
			$('#loginHistoryUser').html(loginHistoryUser);
			
			$(function() {
		        $('.chosen-select').chosen();
		        $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
		    });
		}
	});
}

function getLoginHistory(userId,startIndex){
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getLoginHistory",
		timeout : 1000 * 60 * 5,
		cache : false,
		data : {
			"userId" : userId,
			"startIndex" : startIndex
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			var loginHistoryBody = "";
			if(response.loginHistory.length > 0){
				$('#paginationDiv').show();
				$('#start').html(parseInt(startIndex)+1);
				var last="";
				if($('#start').html()!=""){
					last = parseInt($('#start').html())+response.loginHistory.length-1;
				}
				else{
					last = response.loginHistory.length;
				}
				$('#last').html(last);
				if(startIndex=="0"){
				var numberOfRows="";
				var index=1;
				var count=response.count;
				var numberOfPages=Math.ceil((count/10));
				var displayPagination=numberOfPages;
				$('#total').html(count);
				if(numberOfPages>5){
					/*numberOfRows +="<li class='disabled'><a	id='userAccessFirst'>First</a></li>"
						+"<li class='disabled'><a onclick='previousPagination("+index+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";*/
					displayPagination=5;
				}
				for(var j=0;j<displayPagination;j++){
					numberOfRows +="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(index)-1)+"0)'><a>"+index+"</a></li>";
					index=index+1;
				}
				if(numberOfPages>=6){
					numberOfRows +="<li><a onclick='nextLoginHistoryPagination("+index+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
						 +"<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(numberOfPages)-1)+"0)'><a id='loginHistoryLast'>Last</a></li>";
				}
				$('#userPagination').html(numberOfRows);
			}
			for(var i=0;i<response.loginHistory.length;i++){
				loginHistoryBody = loginHistoryBody +"<tr><td>"+response.loginHistory[i].fullName+"</td><td>"+response.loginHistory[i].remoteIp+"</td><td>"+response.loginHistory[i].signInTime+"</td><td>"+response.loginHistory[i].signOutTime+"</td><td>"+response.loginHistory[i].status+"</td></tr>";
			}
			}
			else{
				loginHistoryBody = loginHistoryBody +"<tr><td class='center' colspan='5'><b>No results found...</b></td></tr>";
				$('#paginationDiv').hide();
			}
			$('#loginHistoryBody').html(loginHistoryBody);
			
		}
	});
}

function nextLoginHistoryPagination(currentIndex,numberOfPages){
	var numberOfRows ="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+",0)'><a id='loginHistoryFirst'>First</a></li>"
		+"<li><a onclick='previousLoginHistoryPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";
	var displayPagination=currentIndex+5;
	if(numberOfPages < displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		numberOfRows +="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(currentIndex)-1)+"0)'><a>"+currentIndex+"</a></li>";
		currentIndex=currentIndex+1;
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +="<li><a onclick='nextLoginHistoryPagination("+currentIndex+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
			 +"<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(parseInt(numberOfPages)-1)+"0)'><a id='loginHistoryLast'>Last</a></li>";
	}
	$('#userPagination').html(numberOfRows);
}

function previousLoginHistoryPagination(currentIndex,numberOfPages){
	var numberOfRows ="";
	var displayPagination=currentIndex-5;
	if(currentIndex > 6){
		numberOfRows ="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+",0)'><a id='loginHistoryFirst'>First</a></li>"
			+"<li><a onclick='previousLoginHistoryPagination("+displayPagination+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		numberOfRows +="<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(j-1)+"0)'><a>"+j+"</a></li>";
	}
	numberOfRows +="<li><a onclick='nextLoginHistoryPagination("+j+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
			 +"<li onclick='getLoginHistory("+$('#loginHistoryUser').val()+","+(numberOfPages-1)+"0)'><a id='loginHistoryLast'>Last</a></li>";
	$('#userPagination').html(numberOfRows);
}

//End of Login History
function getLoginHistoryByDateWise(dateSelected,startIndex){
/*	var inputDate=dateSelected.split("/");
	inputDate=inputDate[0]+"-"+inputDate[1]+"-"+inputDate[2];*/
	var inputDate=dateSelected;
	jQuery.ajax({
		type : "POST",
		url : "ehat/admin/getLoginHistoryDateWise",
		timeout : 1000 * 60 * 5,
		cache : false,
		data : {
			"inputDate" : inputDate,
			"startIndex" : startIndex
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
			var loginHistoryBody = "";
			if(response.loginHistory.length > 0){
				$('#paginationDiv').show();
				$('#start').html(parseInt(startIndex)+1);
				var last="";
				if($('#start').html()!=""){
					last = parseInt($('#start').html())+response.loginHistory.length-1;
				}
				else{
					last = response.loginHistory.length;
				}
				$('#last').html(last);
				if(startIndex=="0"){
				var numberOfRows="";
				var index=1;
				var count=response.count;
				var numberOfPages=Math.ceil((count/10));
				var displayPagination=numberOfPages;
				$('#total').html(count);
				if(numberOfPages>5){
					/*numberOfRows +="<li class='disabled'><a	id='userAccessFirst'>First</a></li>"
						+"<li class='disabled'><a onclick='previousPagination("+index+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";*/
					displayPagination=5;
				}
				for(var j=0;j<displayPagination;j++){
					var date=$('#loginDate').val();
					var method='getLoginHistoryByDateWise("'+date+'",'+(parseInt(index)-1)+'0)';
					numberOfRows +="<li onclick="+method+"><a>"+index+"</a></li>";
					index=index+1;
				}
				if(numberOfPages>=6){
					var date=$('#loginDate').val();
					numberOfRows +="<li><a onclick='nextLoginHistoryPaginationDateWise("+index+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
					var method ='getLoginHistoryByDateWise("'+date+'",'+(parseInt(numberOfPages)-1)+'0)';
						 +"<li onclick="+method+"><a id='loginHistoryLast'>Last</a></li>";
				}
				$('#userPagination').html(numberOfRows);
			}
			for(var i=0;i<response.loginHistory.length;i++){
				loginHistoryBody = loginHistoryBody +"<tr><td>"+response.loginHistory[i].fullName+"</td><td>"+response.loginHistory[i].remoteIp+"</td><td>"+response.loginHistory[i].signInTime+"</td><td>"+response.loginHistory[i].signOutTime+"</td><td>"+response.loginHistory[i].status+"</td></tr>";
			}
			}
			else{
				loginHistoryBody = loginHistoryBody +"<tr><td class='center' colspan='5'><b>No results found...</b></td></tr>";
				$('#paginationDiv').hide();
			}
			$('#loginHistoryBody').html(loginHistoryBody);
			
		}
	});
}
function nextLoginHistoryPaginationDateWise(currentIndex,numberOfPages){
	var date=$('#loginDate').val();
	var method2='getLoginHistoryByDateWise("'+date+'",0)';
	var numberOfRows ="<li onclick="+method2+"><a id='loginHistoryFirst'>First</a></li>"
		+"<li><a onclick='previousLoginHistoryPaginationDateWise("+currentIndex+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";
	var displayPagination=currentIndex+5;
	if(numberOfPages < displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j=currentIndex;j<displayPagination;j++){
		var method='getLoginHistoryByDateWise("'+date+'",'+(parseInt(currentIndex)-1)+'0)';
		numberOfRows +="<li onclick="+method+"><a>"+currentIndex+"</a></li>";
		currentIndex=currentIndex+1;
	}
	if(numberOfPages >= displayPagination){
		var method='getLoginHistoryByDateWise("'+date+'",'+(parseInt(numberOfPages)-1)+'0)';
		numberOfRows +="<li><a onclick='nextLoginHistoryPaginationDateWise("+currentIndex+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
			 +"<li onclick="+method+"><a id='loginHistoryLast'>Last</a></li>";
	}
	$('#userPagination').html(numberOfRows);
}

function previousLoginHistoryPaginationDateWise(currentIndex,numberOfPages){
	var date=$('#loginDate').val();
	var numberOfRows ="";
	var displayPagination=currentIndex-5;
	if(currentIndex > 6){
		var method='getLoginHistoryByDateWise("'+date+'",0)';
		numberOfRows ="<li onclick="+method+"><a id='loginHistoryFirst'>First</a></li>"
			+"<li><a onclick='previousLoginHistoryPaginationDateWise("+displayPagination+","+Math.round(numberOfPages)+")' id='loginHistoryPrev'>Previous</a></li>";
	}
	for(var j=displayPagination;j<currentIndex;j++){
		var method='getLoginHistoryByDateWise("'+date+'",'+(j-1)+'0)';
		numberOfRows +="<li onclick="+method+"><a>"+j+"</a></li>";
	}
	var method='getLoginHistoryByDateWise("'+date+'",'+(numberOfPages-1)+'0)';
	numberOfRows +="<li><a onclick='nextLoginHistoryPaginationDateWise("+j+","+Math.round(numberOfPages)+")' id='loginHistoryNext'>Next</a></li>"
			 +"<li onclick="+method+"><a id='loginHistoryLast'>Last</a></li>";
	$('#userPagination').html(numberOfRows);
}

/************
* @author	: Dayanand Khandekar
* @date		: 20-May-2020
* @codeFor	: getSpecializationInfoForUserMgmt
 ************/

function getSpecializationInfoForUserMgmt() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationListForUserMgmt(r);
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 20-May-2020
* @codeFor	: getSpecializationInfoForUserMgmt
 ************/
function setspcializationListForUserMgmt(r)
{
	var listspec="";	
	listspec = listspec + "<select class='col-md-12'><option value='0'>--Select --</option>";
	for(var i=0;i<r.hospitalspclgetlist.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#specialization").html(listspec);
	$("#specialization").select2(); 
	
	$("#specializationName").html(listspec);
	$("#specializationName").select2();  // added by sandip
}

/************
* @author	: Dayanand Khandekar
* @date		: 20-May-2020
* @codeFor	: getFetchSaveHospitalDepartmentForUserMgmt
 ************/
function getFetchSaveHospitalDepartmentForUserMgmt(r) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalhospitaldepartmentList",
		success : function(r) {
			
			setFetchSaveHospitalDepartmentForUserMgmt(r);
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 20-May-2020
* @codeFor	: setFetchSaveHospitalDepartmentForUserMgmt
 ************/
function setFetchSaveHospitalDepartmentForUserMgmt(r)
{
	
	var listdepartment="";
	listdepartment = listdepartment + "<select class='col-md-12'><option value='0'>--Select--</option>";
	for(var i=0;i<r.listDepartments.length;i++)
	{
		listdepartment=listdepartment+'<option value="'+r.listDepartments[i].departmentId+'">'+r.listDepartments[i].departmentName+'</option>';
		}
	$("#departments").html(listdepartment);
	$("#departments").select2();
}


/************
* @author	: Dayanand Khandekar
* @date		: 8-april-2021
* @codeFor	: Get Unit List For Hospital Information
 ************/
function getAllUnitForHospitalInfo() {

    jQuery.ajax({
        async : false,
        type : "POST",
        //url : "ehat/unit/fetchUnitList",
        url : "ehat/unit/getAllUnitListMaster",

        success : function(r) {
        	setUnitListForHospitalInfo(r);
        }
    });
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-april-2021
* @codeFor	: set Unit List For Hospital Information
 ************/
function setUnitListForHospitalInfo(r) {   
	
	var list = "";   
	list = list + "<select name='State Name' class='col-md-12'><option value='0'>--Select Unit--</option>";
    for ( var i = 0; i < r.lstUnit.length; i++) {    

		list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
		}   
	$("#hInfoUnitId").html(list);   
	
}

/************
* @author	: Vishant Pawar
* @date		: 26-december-2022
* @codeFor	: check uncheck sandbox integration flag
 ************/
var checkedradio;
function docheck(thisradio) {
    if (checkedradio == thisradio) {
        thisradio.checked = false;
        checkedradio = false;
        $("#sandboxIntegration").val(false);
    }
    else {
    	checkedradio = thisradio;
    	$("#sandboxIntegration").val(true);
    }
}


/************
* @author	: Annapurna Jamnor
* @date		: 30-Nov-2023
* @codeFor	: gethospitalspcializationListByUnitId
 ************/
function gethospitalspcializationListByUnitId() {
	var unitId=$('#hInfoUnitId').val();
	//alert(hospitalId);
	var inputs = [];
	inputs.push("unitId=" + encodeURIComponent(unitId));
	 var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
		url : "ehat/admin/gethospitalspcializationListByUnitId",
		success : function(r) {
			
			setspcializationListByUnitId(r);
		}
	});
}

function setspcializationListByUnitId(r)
{
	var listspec="";	
	listspec = listspec + "<select class='col-md-12'><option value='0'>--Select --</option>";
	if(r.hospitalspclgetlist!=null){
		for(var i=0;i<r.hospitalspclgetlist	.length;i++)
		{
			listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
		}
	}	
	else{
		
		listspec=listspec+'<option value="'-'"</option>';
		
}
	$("#selDocSpec").html(listspec);
}
/************
* @author	: Annapurna Jamnor
* @date		: 30-Nov-2023
* @codeFor	: getListDepartmentsByUnitId
 ************/
function getListDepartmentsByUnitId() {
	var unitId=$('#hInfoUnitId').val();

	var inputs = [];
	inputs.push("unitId=" + encodeURIComponent(unitId));
	 var str = inputs.join('&');
			
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getListDepartmentsByUnitId",
		success : function(r) {
			
			setFetchSaveHospitalDepartmentByUnitId(r);
		}
	});
}

function setFetchSaveHospitalDepartmentByUnitId(r)
{
	
	var listdepartment="";
	listdepartment = listdepartment + "<select class='col-md-12'><option value='0'>--Select--</option>";
	if(r.listDepartments!=null){
		for(var i=0;i<r.listDepartments.length;i++)
		{
			listdepartment=listdepartment+'<option value="'+r.listDepartments[i].departmentId+'">'+r.listDepartments[i].departmentName+'</option>';
			}
	}
	else{
		
			listdepartment=listdepartment+'<option value="'-'"</option>';
			
	}
	
	$("#selHosDept").html(listdepartment);
}

//Added By Annapurna code For uploadimage
function uploadHospitalLogo() {
	
	 var form = $('#docSignUploadfrm')[0];
	 
	 if( document.getElementById("signature1").files.length == 0 ){
	    alert("Please select file");
	    return false;
	 }
	 var fileName = document.getElementById("signature1").files[0].name;
	 
	
	 var data = new FormData(form);
    jQuery.ajax({                   
   	 async : true,                   
   	 type : "POST",
   	 enctype: 'multipart/form-data',
   	 processData: false,
        contentType: false,
   	 data : data,
   	 url : "ehat/uploadregdoc/uploadHospitalLogo",                   
   	 timeout : 1000 * 60 * 5,                   
   	 catche : false,                    
   	 error : function() {                                            
   		 alert("error");
   	 },                   
   	 success : function(r) {                      

	    	alert("File uploaded successfully.");	
	    $("#doctorSignName").text(fileName);
	    	
   	}
	});
}
//Added By Annapurna ode for Medical Information Checkbox
function checkboxForMedicalInformation(){
	if($('#medicalInformationCheck').prop("checked") == false){
		$("#medicalInfoTable").hide();
	} else {
		$("#medicalInfoTable").show();
		
	}
}

//Added By Annapurna ode for Nabh Logo Checkbox
function checkboxForNabhLogo(){
	if($('#nabhLogoCheck').prop("checked") == false){
		$("#nabhLogoTable").hide();
	} else {
		$("#nabhLogoTable").show();
		
	}
}

//Added By Tushar Jadhav for Pathology Information Checkbox
function checkboxForPathologyInformation(){
	if($('#pathologyInformationCheck').prop("checked") == false){
		$("#pathologyInfoTable").hide();
	} else {
		$("#pathologyInfoTable").show();
		
	}
}

//Added By Annapurna Code For Pharmacy Logo
function uploadMedicalLogo(){
	
	 var form = $('#medicalLogo')[0];
	 
	 if( document.getElementById("pharmaLogo").files.length == 0 ){
	    alert("Please select file");
	    return false;
	 }
	 	 var fileName = document.getElementById("pharmaLogo").files[0].name;

	
	 var data = new FormData(form);
   jQuery.ajax({                   
  	 async : true,                   
  	 type : "POST",
  	 enctype: 'multipart/form-data',
  	 processData: false,
       contentType: false,
  	 data : data,
  	 url : "ehat/uploadregdoc/uploadMedicalLogo",                   
  	 timeout : 1000 * 60 * 5,                   
  	 catche : false,                    
  	 error : function() {                                            
  		 alert("error");
  	 },                   
  	 success : function(r) {                      

	    	alert("File uploaded successfully.");	
	    $("#pharmaLogo").text(fileName);
	    $("#pharmacyLogo").text(fileName);
	    
	    	
  	}
	});
}

//Added By Annapurna Code For NABH Logo
function uploadNabhLogo(){
	
	 var form = $('#nabhImage')[0];
	 
	 if( document.getElementById("nabhLogo").files.length == 0 ){
	    alert("Please select file");
	    return false;
	 }
	 	 var fileName = document.getElementById("nabhLogo").files[0].name;

	
	 var data = new FormData(form);
  jQuery.ajax({                   
 	 async : false,                   
 	 type : "POST",
 	 enctype: 'multipart/form-data',
 	 processData: false,
      contentType: false,
 	 data : data,
 	 url : "ehat/uploadregdoc/uploadNabhLogo",                   
 	 timeout : 1000 * 60 * 5,                   
 	 catche : false,                    
 	 error : function() {                                            
 		 alert("error");
 	 },                   
 	 success : function(r) {                      

	    	alert("File uploaded successfully.");	
	    $("#nabhLogo").text(fileName);
	    $("#nabhImageLogo").text(fileName);
	    
	    	
 	}
	});
}


function uploadPathologyLogo(){
	
	 var form = $('#PathLogo')[0];
	 
	 if( document.getElementById("PathologyLogo").files.length == 0 ){
	    alert("Please select file");
	    return false;
	 }
	 var fileName = document.getElementById("PathologyLogo").files[0].name;
	 
	
	 var data = new FormData(form);
  jQuery.ajax({                   
 	 async : true,                   
 	 type : "POST",
 	 enctype: 'multipart/form-data',
 	 processData: false,
      contentType: false,
 	 data : data,
 	 url : "ehat/uploadregdoc/uploadPathologyLogo",                   
 	 timeout : 1000 * 60 * 5,                   
 	 catche : false,                    
 	 error : function() {                                            
 		 alert("error");
 	 },                   
 	 success : function(r) {                      

	    	alert("File uploaded successfully.");
	    $("#PathologyLogodis").text(fileName);
	    
	    	
 	}
	});
}