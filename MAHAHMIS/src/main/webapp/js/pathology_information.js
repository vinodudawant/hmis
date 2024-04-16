function getPathologyPreDetails(serviceId, subServiceId) {
	var sex = $('#sex').text();
	var patientId = $('#patientId').text();
	var treatmentId = $('#treatmentId').text();
	var gender = 0;
	if (sex == "Male") {
		gender = 1;
	} else if (sex == "Female") {
		gender = 2;
	} else {
		gender = 3;
	}
	var callfrom = "ABC";

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : {
					"patientId" : encodeURIComponent(patientId),
					"treatmentId" : encodeURIComponent(treatmentId),
					"serviceId" : encodeURIComponent(serviceId),
					"subServiceId" : encodeURIComponent(subServiceId),
					"gender" : encodeURIComponent(gender),
					"callfrom" : encodeURIComponent(callfrom)
				},
				url : "ehat/phlebotomy/getpathologypredetails",
				error : function() {
					alert('Not coneected to server: Please check connections!');
				},
				success : function(r) {

					var heightCount = 0;
					var weightCount = 0;
					var urineVolumeCount = 0;
					var lmpCount = 0;
					var inHouse = 0;
					var outHouse = 0;
					var inOutHouseCount = 0;
					var sampleIdd = 0;

					var sponsorId = $("#SponsorsourceTypeId").val();
					var chargesSlaveId = $("#chargesSlaveId").val();

					if(r.labTestList.length > 0) {

						for ( var i = 0; i < r.labTestList.length; i++) {
							// START histopath test validation
							if (r.labTestList[i].histopathLab == "Y") {
								//alert("hi");

								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									if (sponsorId >= 1 && chargesSlaveId > 0) {
										$('#sampleType').val(r.labTestList[i].sampleId);
										$('#sampleTypeOpdSponsor').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('disabled',
										// 'disabled');
										// $('#sampleTypeOpdSponsor').attr('disabled',
										// 'disabled');
									} else {
										$('#sampleType').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('readonly',
										// 'true');
									}
									$('#histopathLab').val(r.labTestList[i].histopathLab);
									sampleIdd = r.labTestList[i].sampleId;

									var processAtOutlab = (r.labTestList[i].processAtOutlab);
									if(processAtOutlab == "Y") {
										outHouse++;
									} else {
										inHouse++;
									}
								}
								// END histopath test validation
							} else {
								// START LIS test validation
								if(r.labTestList[i].callFrom == "Profile Not Configured In LIS") {
									
									alert("Profile Not Configured In LIS !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								}
								
								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {
									//if(r.labTestList[i].isMatch == "N") {// check
										// already
										// test
										// is
										// present
										// or
										// not

										if(sponsorId >= 1
												&& chargesSlaveId > 0) {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											$('#sampleTypeOpdSponsor').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('disabled',
											// 'disabled');
											// $('#sampleTypeOpdSponsor').attr('disabled',
											// 'disabled');
										} else {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('readonly',
											// 'true');
										}

										sampleIdd = r.labTestList[i].sampleId;

										var processAtOutlab = (r.labTestList[i].processAtOutlab);
										if(processAtOutlab == "Y") {
											outHouse++;
										} else {
											inHouse++;
										}

										var prerequisite = (r.labTestList[i].prerequisite);
										// if (prerequisite == "Y") {
										var height = (r.labTestList[i].height);
										var weight = (r.labTestList[i].weight);
										var urineVolume = (r.labTestList[i].urineVolume);
										var lmpVolume = (r.labTestList[i].lmpStatus);

										if (height == "Y") {
											heightCount++;
										}
										if (weight == "Y") {
											weightCount++;
										}
										if (urineVolume == "Y") {
											urineVolumeCount++;
										}
										if (lmpVolume == "Y") {
											lmpCount++;
										}
										// }

									/*}else {
										// decideDuplicateTestGiven(serviceId,subServiceId);
										alert("Test Already Present !");
										clearAllFieldsOfOpd();
										$("#perticular").focus();

										return false;
									}*/

								}
							}// END LIS test validation
						}

						// setting value of IN House Lab
						if(inHouse > 0 && outHouse > 0) {
							inOutHouseCount = 3;
						} else if (inHouse > 0) {
							inOutHouseCount = 1;
						} else if (outHouse > 0) {
							inOutHouseCount = 2;
						}
						//getBarcodeIdFromSampleWise(sampleIdd, inOutHouseCount);
						//$('#inOutHouseCount').val(inOutHouseCount);// set count
						var profile_outlab_Flag=r.labTestList[0].profile_outlab_Flag;
							if (profile_outlab_Flag == 'Y') {
							$('#inOutHouseCount').val(2);// set count

						} else {
							$('#inOutHouseCount').val(1);// set count
						}
						
						
						
																	// of In Out
																	// House

						generatePrerequisitePopup(heightCount, weightCount,
								urineVolumeCount, lmpCount);// Call For open
															// popup of
															// Prerequisite

					}else {
						alert("Test Not Available For This Gender Type OR Profile Not Configured ! !");
						clearAllFieldsOfIpd();
						heightCount = 0;
						weightCount = 0;
						urineVolumeCount = 0;
						$("#perticular").focus();
						return false;

					}
				}
			});
}

function clearAllFieldsOfIpd(){
	
	// Opd fields
	$('#perticular').val("");
	$('#doctorName').select2('val',0);
	$("#rate").val("0");
	$("#qty").val("1");
	$("#concession").val("0");
	$("#amount").val("0");
	$("#pay").val("0");
	$("#coPay").val("0");
	$("#servId").val("0");
	$('#saveServiceCallFrom').val("0");
	$("#concessionOnPerc").val(0);
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");	
	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPayr").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');	
	$("#narrationBill").val('notnarrationBill');
	$("#narrationidBill").val('');
	$('#queryType').val("insert");
	$('#saveServiceCallFrom').val("0");
	// Ipd Fields
	
	$("#perticularOpdSponsor").val("");
	$("#servIdOpdSponsor").val(0);
	$('#doctorNameOpdSponsor').select2('val',0);
	$("#payOpdSponsor").val('0');
	$("#coPayOpdSponsor").val('0');
	$("#concessionOpdSponsor").val('0');
	$("#rateOpdSponsor").val('0');
	$("#amountOpdSponsor").val('0');
	$("#qtyOpdSponsor").val('1');
	$("#perticularOpdSponsor").removeAttr('readonly');
	$("#payOpdSponsor").removeAttr('readonly');
	$("#coPayOpdSponsor").removeAttr('readonly');
	$("#concessionOpdSponsor").removeAttr('readonly');
	$("#qtyOpdSponsor").removeAttr('readonly');	
	$("#sndtolabflag").val('N');
	
	// added Rohini for inside package
	
	$("#perManualPackage").val("");
	$("#servIdPackage").val(0);
	$("#ratePackage").val('0');
	$("#amountPackage").val('0');
}

/*******************************************************************************
 * @author :Kishor Lokhande
 * @date : 3-March-2020
 * @codeFor : Get Test Sample
 ******************************************************************************/
function ViewTestSampleList(callFrom) {

	var byName = "";
	var callFrom='searchBtn';

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/testsample/getalltestsamples",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setListTestSampleTemp(r);
		}
	});
}

function  setListTestSampleTemp(r){
	var list = "<option value='0'>select</option>";    
	for (var i = 0; i < r.testSamplelist.length; i++) {
		if(((r.testSamplelist[i].sampleName).trim()).toUpperCase() == "PACKAGE"){
			$("#packageDefaultSampleTypeId").val(r.testSamplelist[i].idTestSample);
		}
		
		list = list + "<option value='"+r.testSamplelist[i].idTestSample+"'>" + ((r.testSamplelist[i].sampleName)) + "</option>";    
	}
	$("#sampleType").html(list);
	$("#sampleTypeOpdSponsor").html(list);
	$("#packageSampleTypeId").html(list);
	//$("#txtSelectService").select2();
}

function sendToPhlebotomy(departmentId){
	
	var departmentId=$("#deptId").val();
	var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		return false;
	}
	var registeredAt = $("#registeredAt").val();
	
	var flagTest=0;
	var patientId = parseInt($("#patientId").text());
	if ( isNaN(patientId)) {
		patientId=0;
	}
	var treatmentId = parseInt($("#treatmentId").text());
	if ( isNaN(treatmentId)) {
		treatmentId=0;
	}
	
	var businessType = parseInt($("#businessType").val());
	if ( isNaN(businessType)) {
		businessType=0;
	}
	
	var customerType = parseInt($("#customerType").val());
	if ( isNaN(customerType)) {
		customerType=0;
	}
	
	var customerId = parseInt($("#customerId").val());
	if ( isNaN(customerId)) {
		customerId=0;
	}
	
	var regRefDocId = parseInt($("#refDocId").val());
	if ( isNaN(regRefDocId)) {
		regRefDocId = 0;
	}

	var gender = $("#sex").text();
	var subList 	= {	labSampleWiseMasterDtoList : [] };
	var histoList 	= {	lstHistoPathol : [] };
    $('input[name=opdBillCheckbox]:checked').each(function(){
		var bilDetId	=  parseInt($(this).val());
		if ( isNaN(bilDetId)) {
			bilDetId=0;
		}
		//getting service id 
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if ( isNaN(serviceId)) {
			serviceId=0;
		}
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		//getting Doctor id
		var refDocId	= parseInt($("#dId"+bilDetId).text());
		if ( isNaN(refDocId)) {
			refDocId=0;
		}
		
		var sampleTypeId	= parseInt($("#sampleType"+bilDetId).text());
		if ( isNaN(sampleTypeId)) {
			sampleTypeId=0;
		}
		var barCodeId	= $("#barCodeId"+bilDetId).text().trim();
		/*if ( barCodeId == null || barCodeId =="" || barCodeId ==undefined) {
			barCodeId=0;
			alert("Barcode not in proper format");
			return false;
		}*/
		
		var inOutHouse	= parseInt($("#inOutHouse"+bilDetId).text());
		if ( isNaN(inOutHouse)) {
			inOutHouse=0;
		}
		var collectionDate	= $("#collectionDate"+bilDetId).text().trim();
		var collectionTime	= $("#collectionTime"+bilDetId).text().trim();
		var isCombinationFlag = $("#isCombination"+bilDetId).text().trim();
		var histopathLab	= $("#histopathLab"+bilDetId).text().trim();
		if(histopathLab.trim() == "Y"){
			//pusing sub service id into histoList variable
			histoList.lstHistoPathol.push({
				bilDetId		: bilDetId,
				serviceId		: serviceId,
				subServiceId	: subSrvid,
				refdocid		: refDocId,
				//gender          : gender,
				sampleTypeId	: sampleTypeId,
				inOutHouse		: inOutHouse,
				barCode       	: barCodeId,
				businessType    : businessType,
				customerType    : customerType,
				customerId      : customerId,
				collectionDate  : collectionDate,
				collectionTime  : collectionTime
			});	
		}else if(isCombinationFlag == "Y"){
			var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId);

			for(var i = 0; i < response.listOpdPackageDto.length; i++) {
				subList.labSampleWiseMasterDtoList.push({
					bilDetId		: bilDetId,
					serviceId		: 11,
					refdocid		: refDocId,
					gender          : gender,
					inOutHouse		: inOutHouse,
					businessType    : businessType,
					customerType    : customerType,
					customerId      : customerId,
					collectionDate  : collectionDate,
					collectionTime  : collectionTime,

					subServiceId	: response.listOpdPackageDto[i].childSubServiceId,
					sampleTypeId	: response.listOpdPackageDto[i].sampleTypeId,
					barCode       	: response.listOpdPackageDto[i].barcode,
					packageId		: subSrvid
				});
			}
		}else{
			//pusing sub service id into variable
			subList.labSampleWiseMasterDtoList.push({
				bilDetId		: bilDetId,
				serviceId		: serviceId,
				subServiceId	: subSrvid,
				refdocid		: refDocId,
				gender          : gender,
				sampleTypeId	: sampleTypeId,
				inOutHouse		: inOutHouse,
				barCode       	: barCodeId,
				businessType    : businessType,
				customerType    : customerType,
				customerId      : customerId,
				collectionDate  : collectionDate,
				collectionTime  : collectionTime
			});	
		}
		
		
		flagTest=1;
	});
    
    subList = JSON.stringify(subList);
    histoList = JSON.stringify(histoList);
	if(flagTest==0){
		alertify.error("Please Select At Least One Test For Sent To Lab...!");
		return false;
	}
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("histoList=" + histoList);	
	inputs.push("departmentId="+departmentId);
	inputs.push("gender="+gender);
	inputs.push("regRefDocId="+regRefDocId);
	inputs.push("registeredAt="+registeredAt);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/phlebotomy/sendtolab",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alertify.error("Test has been already sent to lab..!");
			}else if(r=="-2"){
				alertify.error("Duplicate test can not be send to lab..!");
			}else if(r=="-3"){
				alertify.error("Only Pathology test are allowed send to lab..!");
			}else if(parseInt(r)>0){
					alertify.success("Test Sent.");
			}else{
				alertify.error("NetWork error...");
			}
		}
	});
}

function sendToPhlebotomySponsor(departmentId){
	
	var departmentId=$("#deptId").val();
	var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		return false;
	}
	var flagTest=0;
	var patientId = parseInt($("#patientId").text());
	if ( isNaN(patientId)) {
		patientId=0;
	}
	var treatmentId = parseInt($("#treatmentId").text());
	if ( isNaN(treatmentId)) {
		treatmentId=0;
	}
	
	var businessType = parseInt($("#businessType").val());
	if ( isNaN(businessType)) {
		businessType=0;
	}
	
	var customerType = parseInt($("#customerType").val());
	if ( isNaN(customerType)) {
		customerType=0;
	}
	
	var customerId = parseInt($("#customerId").val());
	if ( isNaN(customerId)) {
		customerId=0;
	}
	
	var regRefDocId = parseInt($("#refDocId").val());
	if (isNaN(regRefDocId)) {
		regRefDocId = 0;
	}
	
	var gender = $("#sex").text();
	var subList 	= {	labSampleWiseMasterDtoList : [] };
	var histoList 	= {	lstHistoPathol : [] };
    $('input[name=opdBillCheckbox]:checked').each(function(){
		var bilDetId	=  parseInt($(this).val());
		if ( isNaN(bilDetId)) {
			bilDetId=0;
		}
		//getting service id 
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if ( isNaN(serviceId)) {
			serviceId=0;
		}
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		//getting Doctor id
		var refDocId	= parseInt($("#dId"+bilDetId).text());
		if ( isNaN(refDocId)) {
			refDocId=0;
		}
		
		var sampleTypeId	= parseInt($("#sampleTypeOpdSponsorr"+bilDetId).text());
		if ( isNaN(sampleTypeId)) {
			sampleTypeId=0;
		}
		var barCodeId	= $("#barCodeIdOpdSponsor"+bilDetId).text().trim();
		/*if ( barCodeId == null || barCodeId =="" || barCodeId ==undefined) {
			barCodeId=0;
			alert("Barcode not in proper format");
			return false;
		}*/
		
		var inOutHouse	= parseInt($("#inOutHouseOpdSponsor"+bilDetId).text());
		if ( isNaN(inOutHouse)) {
			inOutHouse=0;
		}
		
		var collectionDate	= $("#collectionDateOpdSponsor"+bilDetId).text().trim();
		var collectionTime	= $("#collectionTimeOpdSponsor"+bilDetId).text().trim();
		var isCombinationFlag = $("#isCombination"+bilDetId).text().trim();
		var histopathLab	= $("#histopathLabOpdSponsor"+bilDetId).text().trim();
		
		if(histopathLab.trim() == "Y"){
			//pusing sub service id into histoList variable
			histoList.lstHistoPathol.push({
				bilDetId		: bilDetId,
				serviceId		: serviceId,
				subServiceId	: subSrvid,
				refdocid		: refDocId,
				//gender          : gender,
				sampleTypeId	: sampleTypeId,
				inOutHouse		: inOutHouse,
				barCode       	: barCodeId,
				businessType    : businessType,
				customerType    : customerType,
				customerId      : customerId,
				collectionDate  : collectionDate,
				collectionTime  : collectionTime
			});	
		}else if(isCombinationFlag == "Y"){
			var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId);

			for(var i = 0; i < response.listOpdPackageDto.length; i++) {
				subList.labSampleWiseMasterDtoList.push({
					bilDetId		: bilDetId,
					serviceId		: 11,
					refdocid		: refDocId,
					gender          : gender,
					inOutHouse		: inOutHouse,
					businessType    : businessType,
					customerType    : customerType,
					customerId      : customerId,
					collectionDate  : collectionDate,
					collectionTime  : collectionTime,

					subServiceId	: response.listOpdPackageDto[i].childSubServiceId,
					sampleTypeId	: response.listOpdPackageDto[i].sampleTypeId,
					barCode       	: response.listOpdPackageDto[i].barcode,
					packageId		: subSrvid
				});
			}
		}else{
			//pusing sub service id into variable
			subList.labSampleWiseMasterDtoList.push({
				bilDetId		: bilDetId,
				serviceId		: serviceId,
				subServiceId	: subSrvid,
				refdocid		: refDocId,
				gender          : gender,
				sampleTypeId	: sampleTypeId,
				inOutHouse		: inOutHouse,
				barCode       	: barCodeId,
				businessType    : businessType,
				customerType    : customerType,
				customerId      : customerId,
				collectionDate  : collectionDate,
				collectionTime  : collectionTime
			});	
		}
		
		flagTest=1;
	});
    
    subList = JSON.stringify(subList);
    histoList = JSON.stringify(histoList);
	if(flagTest==0){
		alertify.error("Please Select At Least One Test For Sent To Lab...!");
		return false;
	}
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("histoList=" + histoList);	
	inputs.push("departmentId="+departmentId);
	inputs.push("gender="+gender);
	inputs.push("regRefDocId="+regRefDocId);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/phlebotomy/sendtolab",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alertify.error("Test has been already sent to lab..!");
			}else if(r=="-2"){
				alertify.error("Duplicate test can not be send to lab..!");
			}else if(r=="-3"){
				alertify.error("Only Pathology test are allowed send to lab..!");
			}else if(parseInt(r)>0){
					alertify.success("Tests Sent.");
			}else{
				alertify.error("NetWork error...");
			}
		}
	});
}

/*********************************************************
 * @author Kishor Lokhande
 * @date 5_March_2020
 * @Code This function is use to Open pop up box for prerequisite of test.
 *********************************************************/
function generatePrerequisitePopup(hCount,wCount,uvCount,lmpCount) {

	$('#hieghtPupUp').val($("#pHeight").val());
	$('#weightPupUp').val($("#pWeight").val());
	$('#urineValumePupUp').val($("#uvCount").val());
	$('#lmpDatePupUp').val($("#lmpDate").val());
	//alert(hCount+" "+wCount+" "+uvCount);

	if(hCount > 0){		
		$('#hieghtShowHide').show();
	}
	if(wCount > 0){
		$('#weightShowHide').show();
	}
	if(uvCount > 0){
		
		$('#urineValumeShowHide').show();
		
	}
	if(lmpCount > 0){
		
		$('#lmpDateShowHide').show();
		
	}
	
	if(hCount > 0 || wCount > 0 || uvCount > 0){
		
		$('#prerequisite_Pop_Up').modal("show");
		$('#prerequisite_Pop_Up').modal();
	}
	
	
};


/*********************************************************
 * @author Kishor Lokhande
 * @date 5_March_2020
 * @Code This function is use to Open pop up box for Barcode of test.
 *********************************************************/
function generateBarcodePopup() {
	//$("#testName").val(testName);
	//$("#testId").val(id);
	$('#Barcode_Pop_Up').modal("show");
	$('#Barcode_Pop_Up').modal();
}	

/*********************************************************
 * @author Kishor Lokhande
 * @date 8_March_2020
 * @Code This function is use to Save prerequisite in Treatment table.
 *********************************************************/
function SavePrerequisiteInTreatment(){
	
	var hieghtPupUp=$('#hieghtPupUp').val();
	var weightPupUp=$('#weightPupUp').val();
	var urineValumePupUp=$('#urineValumePupUp').val();
	var lmpDatePupUp=$('#lmpDatePupUp').val();
	var tId=$('#treatmentId').text();
	var pId=$('#patientId').val();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"hieghtPupUp" 		: hieghtPupUp,
			"weightPupUp" 		: weightPupUp,
			"urineValumePupUp"	: urineValumePupUp,
			"lmpDatePupUp" 		: lmpDatePupUp,
			"tId" 				: tId,
			"pId" 				: pId
		},
		url : "ehat/phlebotomy/savePrerequisiteInTreatment",
		error 	: function() {
			alert('Not coneected to server: Please check connections!');
		 },
		success : function(r) {
			if(r==1){
				alertify.success("Prerequisite Save Successfully..!");
				$('#prerequisite_Pop_Up').modal("hide");
				getPatientDataByTreatmentId(tId); 
			}else 
				alertify.error("Connection Error..!");
			
		}
	});
	
	
	
}


function decideDuplicateTestGiven(serviceId,subServiceId){
	var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		alertify.error("Test Already Present !");
		clearAllFieldsOfOpd();
		$("#perticular").focus();
		return false;
	}else{

		var sex=$('#sex').text();
		var patientId=$('#patientId').text();
		var treatmentId=$('#treatmentId').text();
		var gender=0;
		if (sex == "Male") {
			gender = 1;
		} else if (sex == "Female") {
			gender = 2;
		}else{
			gender = 3;
		}
		var callfrom = "ABC";
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : {
				"patientId" 	:	patientId,
				"treatmentId" 	: 	treatmentId,
				"serviceId" 	:	serviceId,
				"subServiceId" 	:	subServiceId,
				"gender" 		:	gender,
				"callfrom" 		:	callfrom
			},
			url : "ehat/phlebotomy/getpathologypredetails",
			error 	: function() {
				alert('Not coneected to server: Please check connections!');
			 },
					success : function(r) {

						var heightCount = 0;
						var weightCount = 0;
						var urineVolumeCount = 0;
						var inHouse = 0;
						var outHouse = 0;
						var inOutHouseCount = 0;

						if (r.labTestList.length > 0) {

							for ( var i = 0; i < r.labTestList.length; i++) {

								if (r.labTestList[i].callFrom == "Profile Already Present") {
									alertify.error("Profile Already Present !");
									clearAllFieldsOfOpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									//if (r.labTestList[i].isMatch == "N") {//check already test is present or not
										$('#sampleType').val(r.labTestList[i].sampleId);

										var processAtOutlab = (r.labTestList[i].processAtOutlab);
										if (processAtOutlab == "Y") {
											
											outHouse++;
										}else{
											
											inHouse++;										
										}
										
										var prerequisite = (r.labTestList[i].prerequisite);
										if (prerequisite == "Y") {
											var height = (r.labTestList[i].height);
											var weight = (r.labTestList[i].weight);
											var urineVolume = (r.labTestList[i].urineVolume);
											
											if (height == "Y") {
												heightCount++;
											}
											if (weight == "Y") {
												weightCount++;
											}
											if (urineVolume == "Y") {
												urineVolumeCount++;
											}
											//alert(urineVolumeCount+" "+weightCount+" "+heightCount +" "+outHouse+" "+inHouse);
										}
										
									/*} else {
										decideDuplicateTestGiven(serviceId,subServiceId);
										alertify.error("Test Already Present !");
										clearAllFieldsOfOpd();
										$("#perticular").focus();
										
										heightCount = 0;
										weightCount = 0;
										urineVolumeCount = 0;
										return false; 
									}*/

								}

							}
						
							//setting value of IN House Lab
							if(inHouse > 0 && outHouse > 0){
								inOutHouseCount=3;
							}else if(inHouse > 0){
								inOutHouseCount=1;
							}else if(outHouse > 0){
								inOutHouseCount=2;
							}
							$('#inOutHouseCount').val(inOutHouseCount);//set count of In Out House
							
							//generatePrerequisitePopup(heightCount,weightCount,urineVolumeCount);//Call For open popup of Prerequisite
							
						} else {
							alertify.error("Test Not Available For This Gender Type OR Profile Not Configured ! !");
							clearAllFieldsOfOpd();
							heightCount = 0;
							weightCount = 0;
							urineVolumeCount = 0;
							$("#perticular").focus();
							return false;
				}
			}
		});
	}
}

function getBarcodeIdFromSampleWise(sampleTypeId,inOutHouseCount) {
	var patientId = $('#patientId').text();
	var treatmentId = $('#treatmentId').text();
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
			"patientId" 	: patientId,
			"treatmentId" 	: treatmentId,
			"sampleTypeId" 	: sampleTypeId,
			"inOutHouse" 	: inOutHouseCount
		},
		url : "ehat/phlebotomy/getBarcodeIdFromSampleWise",
		error : function() {
			alert('Not coneected to server: Please check connections!');
		},
		success : function(r) {
			//alert(r);
			if(r == "error" || r=="null" || r==null ||  r==""){
				$('#barcodeNo').attr("disabled", false);
				$('#barcodeNoOpdSponsor').attr("disabled", false);
				$('#barcodeNo').val("");
				$('#barcodeNoOpdSponsor').val("");
			}else{
				$('#barcodeNo').val(r);
				$('#barcodeNo').attr("disabled", true);
				
				$('#barcodeNoOpdSponsor').val(r);
				$('#barcodeNoOpdSponsor').attr("disabled", true);
			}
			
		}

	});

}

function getAllSubservicesUnderPackage(pSId, pSubSId, billDetailsId, depId){
	var response = "";
	var sponsorId = 0;
	var chargesSlaveId = 0;
	var treatmentId=$('#treatmentId').text();
	var patientId=$('#patientId').text();
	
	var urlStr = "";
	if(depId == 2){
		
		urlStr = "ehat/ipdbillmgt/getPackagedataforIpd"
	}else{
		
		urlStr = "ehat/opdbill/getPackagedataforOpd";
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"pSId" : pSId,
			"pSubSId" : pSubSId,
			"sponsorId" : sponsorId,
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : "ehat/billNoble/getPackagedataforOpd",*/
		data : {
			"serviceId" : pSId,
			"subServiceId" : pSubSId,			
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patienttId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : urlStr,
		error : function() {
			alert('error');
		},
		success : function(r) {
			response = r;
		}
	});
	
	return response;
}

function sendToPhlebotomyFromSave(deparId){

	
	var iscombination=$("#iscombination").val();
	var riscount=0;
	var departmentId=$("#deptId").val();
	/*var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		return false;
	}*/
	var flagTest=0;
	var patientId = parseInt($("#patientId").text());
	if(isNaN(patientId)) {
		patientId=0;
	}
	
	
	var registeredAt = $("#registeredAt").val();
	
	var treatmentId = parseInt($("#treatmentId").text());
	if(isNaN(treatmentId)) {
		treatmentId=0;
	}
	
	var businessType = parseInt($("#businessType").val());
	if(isNaN(businessType)) {
		businessType=0;
	}
	
	var customerType = parseInt($("#customerType").val());
	if(isNaN(customerType)) {
		customerType=0;
	}
	
	var customerId = parseInt($("#customerId").val());
	if(isNaN(customerId)) {
		customerId=0;
	}
	
	var regRefDocId = parseInt($("#refDocId").val());
	if(isNaN(regRefDocId)) {
		regRefDocId = 0;
	}
	
	var gender = $("#sex").text();
	var subList 	= {	labSampleWiseMasterDtoList : [] };
	var histoList 	= {	lstHistoPathol : [] };
	var subListRIS 	= {	subSrvList : [] };// added for RIS Test
    $('input[name=opdBillCheckbox]:checked').each(function(){
    	
    	var bilDetId	=  parseInt($(this).val());
    	var serviceIdForCheck = parseInt($("#sId"+bilDetId).text());
		if(isNaN(serviceIdForCheck)) {
			serviceIdForCheck=0;
		}
		
	//	if(serviceIdForCheck == 11 || serviceIdForCheck == 13){
		if(serviceIdForCheck == 11 || serviceIdForCheck == 13 ||  serviceIdForCheck == 12){ // change by Rohini for ris test to send ris
	    	
			if(isNaN(bilDetId)) {
				bilDetId=0;
			}
			
	    	var sndtolabflag	= $("#sndtolabflag"+bilDetId).text().trim();
	    	
	    	var sndtoRisflag = $("#sendToRisId"+bilDetId).text().trim(); // added rohini  for ris test of package. 
	    	
			if(sndtoRisflag == null || sndtoRisflag =="" || sndtoRisflag ==undefined) {
				sndtoRisflag="N";
			}
	    	
			if(sndtolabflag == null || sndtolabflag =="" || sndtolabflag ==undefined) {
				sndtolabflag="N";
			}
			
			var templateWise = $("#isTemplateWiseTest"+bilDetId).text().trim();
			if(templateWise == null || templateWise =="" || templateWise ==undefined) {
				templateWise="N";
			}
			
			// if(sndtolabflag.trim() == "Y"){
			if(sndtolabflag.trim() == "Y" || sndtoRisflag.trim() == "Y"){ // change Rohini for ris  test and package
				//alert(sndtolabflag);
			}else if(sndtolabflag.trim() == "N"){
				//alert(sndtolabflag);
				//getting service id 
				var serviceId 		= parseInt($("#sId"+bilDetId).text());
				if(isNaN(serviceId)) {
					serviceId=0;
				}
				//getting sub service id
				var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
				if(isNaN(subSrvid)) {
					subSrvid=0;
				}
				//getting Doctor id
				var refDocId	= parseInt($("#dId"+bilDetId).text());
				if(isNaN(refDocId)) {
					refDocId=0;
				}
				
				var sampleTypeId	= parseInt($("#sampleType"+bilDetId).text());
				if(isNaN(sampleTypeId)) {
					sampleTypeId=0;
				}
				var barCodeId	= ($("#barCodeId"+bilDetId).text()).trim();
				/*if(barCodeId == null || barCodeId =="" || barCodeId ==undefined) {
					barCodeId=0;
					alert("Barcode not in proper format");
					return false;
				}*/
				
				if(barCodeId == null || barCodeId.trim() == "" || barCodeId == undefined){
					barCodeId="0";
				}
				
				var inOutHouse	= parseInt($("#inOutHouse"+bilDetId).text());
				if(isNaN(inOutHouse)) {
					inOutHouse=0;
				}
				
				var collectionDate	= $("#collectionDate"+bilDetId).text().trim();
				var collectionTime	= $("#collectionTime"+bilDetId).text().trim();
				var isCombinationFlag = $("#isCombination"+bilDetId).text().trim();
				var histopathLab	= $("#histopathLab"+bilDetId).text().trim();
				
				if(histopathLab.trim() == "Y"){
					//pusing sub service id into histoList variable
					histoList.lstHistoPathol.push({
						bilDetId		: bilDetId,
						serviceId		: serviceId,
						subServiceId	: subSrvid,
						refdocid		: refDocId,
						//gender          : gender,
						sampleTypeId	: sampleTypeId,
						inOutHouse		: inOutHouse,
						barCode       	: barCodeId,
						businessType    : businessType,
						customerType    : customerType,
						customerId      : customerId,
						collectionDate  : collectionDate,
						collectionTime  : collectionTime
					});	
			//	}else if(isCombinationFlag == "Y"){
				}else if(isCombinationFlag == "Y" || (isCombinationFlag == "N" && serviceIdForCheck == 12 )){
					var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId, departmentId);
					
					if(departmentId == 2){
						
						for(var i = 0; i < response.listIpdPackageDto.length; i++) {
							
							if(response.listIpdPackageDto[i].childServiceId == 11){
								
								var templateWise = response.listIpdPackageDto[i].templateWise;
								if(templateWise != "Y"){
									templateWise = "N";
								}
								subList.labSampleWiseMasterDtoList.push({
									bilDetId		: bilDetId,
									serviceId		: 11,
									refdocid		: refDocId,
									gender          : gender,
									inOutHouse		: response.listIpdPackageDto[i].inOutHouse,
									businessType    : businessType,
									customerType    : customerType,
									customerId      : customerId,
									collectionDate  : collectionDate,
									collectionTime  : collectionTime,
			
									subServiceId	: response.listIpdPackageDto[i].childSubServiceId,
									sampleTypeId	: response.listIpdPackageDto[i].sampleTypeId,
									barCode       	: response.listIpdPackageDto[i].barcode,
									packageId		: subSrvid,
									templateWise    : response.listIpdPackageDto[i].templateWise,
								});
							}else if(response.listIpdPackageDto[i].childServiceId == 12){
								
								subListRIS.subSrvList.push({
									bilDetId		: bilDetId,
									serviceId		: 12,
									subSrvid 		: response.listIpdPackageDto[i].childSubServiceId,
									testName		:  response.listIpdPackageDto[i].categoryName,
									totalBillAmt	: response.listIpdPackageDto[i].rate,
									doctorId	: response.listIpdPackageDto[i].docId
								});	
								
								riscount++;
							}
						}
					}else {
						
						for(var i = 0; i < response.listOpdPackageDto.length; i++) {
							
							if(response.listOpdPackageDto[i].childServiceId == 11){
								
								var templateWise = response.listOpdPackageDto[i].templateWise;
								if(templateWise != "Y"){
									templateWise = "N";
								}
								if(response.listOpdPackageDto[i].barcode == ""){
									barCode="0";
								}else{
									barCode= response.listOpdPackageDto[i].barcode;
								}
								
								subList.labSampleWiseMasterDtoList.push({
									bilDetId		: bilDetId,
									serviceId		: 11,
									refdocid		: refDocId,
									gender          : gender,
									inOutHouse		: response.listOpdPackageDto[i].inOutHouse,
									businessType    : businessType,
									customerType    : customerType,
									customerId      : customerId,
									collectionDate  : collectionDate,
									collectionTime  : collectionTime,
			
									subServiceId	: response.listOpdPackageDto[i].childSubServiceId,
									sampleTypeId	: response.listOpdPackageDto[i].sampleTypeId,
									//barCode       	: response.listOpdPackageDto[i].barcode,
									barCode       	: barCode,
									packageId		: subSrvid,
									templateWise    : response.listOpdPackageDto[i].templateWise,
								});
							}else if(response.listOpdPackageDto[i].childServiceId == 12){
								
								subListRIS.subSrvList.push({
									bilDetId		: bilDetId,
									serviceId		: 12,
									subSrvid 		: response.listOpdPackageDto[i].childSubServiceId,
									testName		:  response.listOpdPackageDto[i].categoryName,
									totalBillAmt	: response.listOpdPackageDto[i].rate,
									doctorId	: response.listOpdPackageDto[i].docId
								});	
								
								riscount++;
							}
						}
					}
					
				}else{
					//pusing sub service id into variable
					subList.labSampleWiseMasterDtoList.push({
						bilDetId		: bilDetId,
						serviceId		: serviceId,
						subServiceId	: subSrvid,
						refdocid		: refDocId,
						gender          : gender,
						sampleTypeId	: sampleTypeId,
						inOutHouse		: inOutHouse,
						barCode       	: barCodeId,
						businessType    : businessType,
						customerType    : customerType,
						customerId      : customerId,
						collectionDate  : collectionDate,
						collectionTime  : collectionTime,
						templateWise    : templateWise
					});	
				}
				flagTest=1;
			}
	    }
	});
    subList = JSON.stringify(subList);
    histoList = JSON.stringify(histoList);
    
	if(flagTest==0){
		//alertify.error("Please Select At Least One Test For Sent To Lab...!");
		return false;
	}
	
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("histoList=" + histoList);	
	inputs.push("deptId="+departmentId);
	inputs.push("gender="+gender);
	inputs.push("regRefDocId="+regRefDocId);
	inputs.push("registeredAt="+registeredAt);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/phlebotomy/sendtolab",
		error 	: function() {
			alert('Not coneected to server: Please check connections!');
		},
		success : function(r) {
			
			if(deparId == 1){
				
				if(r=="-1"){
					alertify.error("Test has been already sent to lab..!");
				}else if(r=="-2"){
					alertify.error("Duplicate test can not be send to lab..!");
				}else if(r=="-3"){
					alertify.error("Only Pathology test are allowed send to lab..!");
				}else if(parseInt(r)>0){
						alertify.success("Tests Sent.");
				}else{
					alertify.error("NetWork error...");
				}
			}
			if(riscount > 0){
				if(departmentId ==1){
				sendToRisFromPackage(subListRIS);
				}else if(departmentId ==2){
					
					sendToRisFromPackageIPD(subListRIS);
				}
			}
		}
		
	});
	
	updateDuplicateProfileIds(treatmentId);
	//window.location.reload(true);
}


function sendToPhlebotomyFromSaveSponsor(deparId){
	
	var riscount=0;
	
	var departmentId=$("#deptId").val();
	/*var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		return false;
	}*/
	var flagTest=0;
	
	var registeredAt = $("#registeredAt").val();
	
	var patientId = parseInt($("#patientId").text());
	if(isNaN(patientId)) {
		patientId=0;
	}
	var treatmentId = parseInt($("#treatmentId").text());
	if(isNaN(treatmentId)) {
		treatmentId=0;
	}
	
	var businessType = parseInt($("#businessType").val());
	
	
	if(isNaN(businessType)) {
		businessType=0;
	}
	
	var customerType = parseInt($("#customerType").val());
	if(isNaN(customerType)) {
		customerType=0;
	}
	
	var customerId = parseInt($("#customerId").val());
	if(isNaN(customerId)) {
		customerId=0;
	}
	
	var regRefDocId = parseInt($("#refDocId").val());
	if(isNaN(regRefDocId)) {
		regRefDocId = 0;
	}
	
	var gender = $("#sex").text();
	var subList 	= {	labSampleWiseMasterDtoList : [] };
	var histoList 	= {	lstHistoPathol : [] };
	var subListRIS 	= {	subSrvList : [] };// added Rohini Ambhore for RIS Test
    $('input[name=opdBillCheckbox]:checked').each(function(){
    
    	var bilDetId	=  parseInt($(this).val());
    	var serviceIdForCheck = parseInt($("#sId"+bilDetId).text());
		if(isNaN(serviceIdForCheck)) {
			serviceIdForCheck=0;
		}
		
		if(serviceIdForCheck == 11 || serviceIdForCheck == 13){
			
		    if(isNaN(bilDetId)) {
				bilDetId=0;
			}
		    var sndtolabflag	= $("#sndtolabflag"+bilDetId).text();
			if(sndtolabflag == null || sndtolabflag =="" || sndtolabflag ==undefined) {
				sndtolabflag="N";
			}
			
            var sndtoRisflag = $("#sendToRisId"+bilDetId).text().trim(); // added rohini  for ris test of package. 
	    	
			if(sndtoRisflag == null || sndtoRisflag =="" || sndtoRisflag ==undefined) {
				sndtoRisflag="N";
			}
			
			//if(sndtolabflag.trim() == "Y"){
			if(sndtolabflag.trim() == "Y" || sndtoRisflag.trim() == "Y"){ // change Rohini for ris  test and package
				//alert(sndtolabflag);
			}else if(sndtolabflag.trim() == "N"){
				//alert(sndtolabflag);
				//getting service id 
				var serviceId 		= parseInt($("#sId"+bilDetId).text());
				if(isNaN(serviceId)) {
					serviceId=0;
				}
				//getting sub service id
				var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
				if(isNaN(subSrvid)) {
					subSrvid=0;
				}
				//getting Doctor id
				var refDocId	= parseInt($("#dId"+bilDetId).text());
				if(isNaN(refDocId)) {
					refDocId=0;
				}
					
				var sampleTypeId	= parseInt($("#sampleTypeOpdSponsorr"+bilDetId).text());
				if(isNaN(sampleTypeId)) {
					sampleTypeId=0;
				}
				var barCodeId	= $("#barCodeIdOpdSponsor"+bilDetId).text();
				/*if(barCodeId == null || barCodeId =="" || barCodeId ==undefined) {
					barCodeId=0;
					alert("Barcode not in proper format");
					return false;
				}*/
				
				
				if(barCodeId == null || barCodeId.trim() == "" || barCodeId == undefined){
					barCodeId="0";
				}
				
				
				
				var inOutHouse	= parseInt($("#inOutHouseOpdSponsor"+bilDetId).text());
				if ( isNaN(inOutHouse)) {
					inOutHouse=0;
				}
				
				var templateWiseTest = $("#isTemplateWiseTestSponsor"+bilDetId).text().trim();
				if(templateWiseTest == null || templateWiseTest =="" || templateWiseTest ==undefined) {
					templateWiseTest="N";
				}
				
				var collectionDate	= $("#collectionDateOpdSponsor"+bilDetId).text();
				var collectionTime	= $("#collectionTimeOpdSponsor"+bilDetId).text();
				var isCombinationFlag = $("#isCombinationSponsor"+bilDetId).text().trim();
				var histopathLab	= $("#histopathLabOpdSponsor"+bilDetId).text().trim();
				
				if(histopathLab.trim() == "Y"){
					//pusing sub service id into histoList variable
					histoList.lstHistoPathol.push({
						bilDetId		: bilDetId,
						serviceId		: serviceId,
						subServiceId	: subSrvid,
						refdocid		: refDocId,
						//gender          : gender,
						sampleTypeId	: sampleTypeId,
						inOutHouse		: inOutHouse,
						barCode       	: barCodeId,
						businessType    : businessType,
						customerType    : customerType,
						customerId      : customerId,
						collectionDate  : collectionDate,
						collectionTime  : collectionTime
					});	
				}else if(isCombinationFlag == "Y"){
					var response = getAllSubservicesUnderPackage(serviceId, subSrvid, bilDetId, departmentId);
	
					if(departmentId == 2){
						
						for(var i = 0; i < response.listIpdPackageDto.length; i++) {
							
							if(response.listIpdPackageDto[i].childServiceId == 11){
								
								var templateWise = response.listIpdPackageDto[i].templateWise;
								if(templateWise != "Y"){
									templateWise = "N";
								}
								subList.labSampleWiseMasterDtoList.push({
									bilDetId		: bilDetId,
									serviceId		: 11,
									refdocid		: refDocId,
									gender          : gender,
									inOutHouse		: response.listIpdPackageDto[i].inOutHouse,
									businessType    : businessType,
									customerType    : customerType,
									customerId      : customerId,
									collectionDate  : collectionDate,
									collectionTime  : collectionTime,
			
									subServiceId	: response.listIpdPackageDto[i].childSubServiceId,
									sampleTypeId	: response.listIpdPackageDto[i].sampleTypeId,
									barCode       	: response.listIpdPackageDto[i].barcode,
									packageId		: subSrvid,
									templateWise    : response.listIpdPackageDto[i].templateWise,
								});
							}else if(response.listIpdPackageDto[i].childServiceId == 12){
								
								subListRIS.subSrvList.push({
									bilDetId		: bilDetId,
									serviceId		: 12,
									subSrvid 		: response.listIpdPackageDto[i].childSubServiceId,
									testName		:  response.listIpdPackageDto[i].categoryName,
									totalBillAmt	: response.listIpdPackageDto[i].rate,
									doctorId	: response.listIpdPackageDto[i].docId
								});	
								
								riscount++;
							}
						}
					}else {
						
						for(var i = 0; i < response.listOpdPackageDto.length; i++) {
							
							if(response.listOpdPackageDto[i].childServiceId == 11){
								
								var templateWise = response.listOpdPackageDto[i].templateWise;
								if(templateWise != "Y"){
									templateWise = "N";
								}
								var bacrCode="0";
								if(response.listOpdPackageDto[i].barcode == ""){
									bacrCode="0";
								}else{
									bacrCode=response.listOpdPackageDto[i].barcode;
								}
								
								subList.labSampleWiseMasterDtoList.push({
									bilDetId		: bilDetId,
									serviceId		: 11,
									refdocid		: refDocId,
									gender          : gender,
									inOutHouse		: response.listOpdPackageDto[i].inOutHouse,
									businessType    : businessType,
									customerType    : customerType,
									customerId      : customerId,
									collectionDate  : collectionDate,
									collectionTime  : collectionTime,
			
									subServiceId	: response.listOpdPackageDto[i].childSubServiceId,
									sampleTypeId	: response.listOpdPackageDto[i].sampleTypeId,
									//barCode       	: response.listOpdPackageDto[i].barcode,
									barCode       	: bacrCode,
									packageId		: subSrvid,
									templateWise    : response.listOpdPackageDto[i].templateWise,
								});
                              }else if(response.listOpdPackageDto[i].childServiceId == 12){
								
								subListRIS.subSrvList.push({
									bilDetId		: bilDetId,
									serviceId		: 12,
									subSrvid 		: response.listOpdPackageDto[i].childSubServiceId,
									testName		:  response.listOpdPackageDto[i].categoryName,
									totalBillAmt	: response.listOpdPackageDto[i].rate,
									doctorId	: response.listOpdPackageDto[i].docId
								});	
								
								riscount++;
							}
						}
					}
					
				}else{
					//pusing sub service id into variable
					subList.labSampleWiseMasterDtoList.push({
						bilDetId		: bilDetId,
						serviceId		: serviceId,
						subServiceId	: subSrvid,
						refdocid		: refDocId,
						gender          : gender,
						sampleTypeId	: sampleTypeId,
						inOutHouse		: inOutHouse,
						barCode       	: barCodeId,
						businessType    : businessType,
						customerType    : customerType,
						customerId      : customerId,
						collectionDate  : collectionDate,
						collectionTime  : collectionTime,
						templateWise    : templateWiseTest
					});	
				}
				
				flagTest=1;
			}
		}
	});
   // alert(flagTest);
    subList = JSON.stringify(subList);
    histoList = JSON.stringify(histoList);
	if(flagTest==0){
		//alertify.error("Please Select At Least One Test For Sent To Lab...!");
		return false;
	}
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("histoList=" + histoList);	
	inputs.push("deptId="+departmentId);
	inputs.push("gender="+gender);
	inputs.push("regRefDocId="+regRefDocId);
	inputs.push("registeredAt="+registeredAt);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/phlebotomy/sendtolab",
		error 	: function() {
					//alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			
			if(deparId == 1){
				
				if(r=="-1"){
					alertify.error("Test has been already sent to lab..!");
				}else if(r=="-2"){
					alertify.error("Duplicate test can not be send to lab..!");
				}else if(r=="-3"){
					alertify.error("Only Pathology test are allowed send to lab..!");
				}else if(parseInt(r)>0){
						alertify.success("Tests Sent.");
				}else{
					alertify.error("NetWork error...");
				}
			}
			if(riscount > 0){   
				if(departmentId ==1){
					sendToRisFromPackage(subListRIS);
				}			
				else if(departmentId ==2){
					sendToRisFromPackageIPD(subListRIS);
				}
			}
		}
    
	});
	
	updateDuplicateProfileIds(treatmentId);
	//window.location.reload(true);
}

/***********************************************************
 * @author Kishor Lokhande
 * @since  9-06-2020
 * @comment Get count of Normal, AbNormal, Critically AbNormal in Authorized Patient records.
************************************************************/
function getRecordCountForReportingTabIndicator(txtFdate, txtTdate){
    jQuery.ajax({
    	async : true,
    	type : "GET",
    	data : {
			"statusCode" : 6,
			"txtFdate"	: txtFdate,
			"txtTdate"	: txtTdate
		},
    	url : "ehat/phlebotomy/getRecordCountForAuthorizeTabIndicator",
    	
    	catche : false,
    	error : function() {
    		alert('Network Issue!');
    	},
    	success : function(r) {  
    		var data = r.split(",");
    		//alert("data.."+data);
    		/*var cAbnormal = data[0].split("/");
    		var abnormal = data[1].split("/");
    		var normal = data[2].split("/");
    		var all = data[3].split("/");*/
    		
    		
    		$('#cAbnormalTotal').text(data[0]);
    		$('#abnormalTotal').text(data[1]);
    		$('#normalTotal').text(data[2]);
    		$('#allTotal').text(data[3]);
    		$('#patientWiseTotal').text(data[4]);
    	}
    });
}

function getRecordAgainstIndicatorReporting(indicatorType){
	id="AA";
	//alert("indicatorType : "+indicatorType);
	var noOfPages = $("#"+indicatorType).text();
	var startIndex = 0;
	var inputs = [];
	inputs.push('indicatorType=' + encodeURIComponent(indicatorType));
	inputs.push('startIndex='+startIndex);
	inputs.push('statusCode='+6);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getRecordAgainstIndicator",
		error : function() {
			alert("error");
		},
		success : function(r) {	
			var callFromTemp = "reportingAutoSugg";
			var callFrom = "reportingSearchBtn";
			var tabId =  indicatorType;
			setPatientTemp(r, callFromTemp, tabId);
			//setPaginationTemplate(r, callFrom, tabId);
			
			
			var numberOfRows = "";
			var index = 1;
			var count = noOfPages;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='paginationOnIndicatorReporting("+index+", "+Math.ceil(numberOfPages)+", \""+indicatorType+"\")'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='paginationOnIndicatorReporting("+index+", "+Math.ceil(numberOfPages)+", \""+indicatorType+"\")'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 6){
				numberOfRows +="<li class='next' onclick='nextPaginationOnIndicatorReporting("+index+","+Math.ceil(numberOfPages)+", \""+indicatorType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#reportingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#reportingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='reportingPageNumber'/><button class='btn btn-primary btn-xs' onclick='jumpToPageOnIndicatorReporting("+Math.ceil(numberOfPages)+", \""+indicatorType+"\");'>Go</button></a></li>");
			}
			$('#reportingPagination').html(numberOfRows);
		}
	});
}

/***********************************************************
 * @author Kishor Lokhande
 * @since  9-06-2020
 * @comment Get count of Normal, AbNormal, Critically AbNormal in Authorized Patient records.
************************************************************/
function getRecordCountForAuthorizeTabIndicator(txtFdate, txtTdate){
	jQuery.ajax({
    	async : true,
    	type : "GET",
    	data : {
			"statusCode" : 5,
			"txtFdate"	: txtFdate,
			"txtTdate"	: txtTdate
		},
    	url : "ehat/phlebotomy/getRecordCountForAuthorizeTabIndicator",
    	
    	catche : false,
    	error : function() {
    		alert('Network Issue!');
    	},
    	success : function(r) {  
    		
    		var a = r.split(",");
    		
    	//	$('#cAbnormal').text(a[0]);
    	//	$('#abnormal').text(a[1]);
    	//	$('#normal').text(a[2]);
    	//	$('#templateTest').text(a[5]);
    	}
    });
}

function getRecordAgainstIndicator(indicatorType){
	//alert("forwordPageAuthorizedRoutineValue::");
	id="AA";
	var noOfPagess = $("#"+indicatorType).text();
	var a=noOfPagess.split("/");
	var noOfPages = a[0];
	var txtFdate = $.trim($("#txtFdate").val());	
	var txtTdate = $.trim($("#txtTdate").val());
	if(noOfPages == 0){
		alert("No Data Available!");
		return false;
	}
	var startIndex = 0;
	var inputs = [];
	inputs.push('indicatorType=' + encodeURIComponent(indicatorType));
	inputs.push('startIndex='+startIndex);
	inputs.push('statusCode='+5);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getRecordAgainstIndicator",
		error : function() {
			alert("error");
		},
		success : function(r) {	
			exportToExcelDateInProcessingTab(r);
			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
				for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					var pNo = 0;
					if (startIndex != 0) {
						pNo = (startIndex - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
				     $("#patientName").text(patinetname);
				       /**************by kranti godse *************************/
				     
				     
				     var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleDateString('en-US', {day: '2-digit', year: 'numeric', month: '2-digit', hour: '2-digit', minute: '2-digit',second: '2-digit'}); 
					var a = datetime.split(",");
					
					datecollection=a[0];
					timecollection=a[1];
					var regdatesplit=datecollection.split("/");
					
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					
					var splittedString=timecollection.split(":");
					var aaa=splittedString.slice(0,-1).join(':');
					//var PM = splittedString[2].split(" ");
					
					var d = new Date(datecollection + timecollection); 
				    var time24hr = d.getHours() + ':' + d.getMinutes(); 
				    var  collDateTime=mm+"-"+yy+"-"+dd+"  : "+time24hr+" ";
					//var regdatesplit=a[0].split("/");
					/*
					var yy=regdatesplit[2];
					var mm=regdatesplit[1];
					var dd=regdatesplit[0];
					var collDateTime = dd+"-"+mm+"-"+yy+"  : "+a[1];*/
					//var collDateTime=""+yy+","+a[1];
					
					  /***************************************/
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
					
					var statusss="";
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
				if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
						statusss="Collection Pending";
				} if(r.labSampleWiseMasterDtoList[i].teststatus==2){
					statusss="Accessing Pending";
				} if(r.labSampleWiseMasterDtoList[i].teststatus==3){
					statusss="Accepted Done";
				} if(r.labSampleWiseMasterDtoList[i].teststatus==4){
					statusss="Sample Rejected";
				}if(r.labSampleWiseMasterDtoList[i].teststatus==5){
					statusss="Sample In Authorization";
				}if(r.labSampleWiseMasterDtoList[i].teststatus==6){
					statusss="Sample Reported";
				}
				
				var printData=r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;
				divContent = divContent+ '<tr style="height:2px;" >'		
				+ "<td class='col-md-1 center'>"+srNo+"</td>"
		        	+ "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>";	
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>";	
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"	
                     //+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
					 + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					+ "<td class='col-md-2 center'>"+collDateTime+"</td>"	
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					+ "<td class='col-md-2 center'>"+statusss +"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					+ "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
			 
		           
		           if(id=="AA"){
		        	   //divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].pathlogistName+"</td>";	
		        	   divContent = divContent  + "<td class='col-md-1 center'>"+timeSesitiveValue +"</td>";
		        	   divContent = divContent+ "<td class='col-md-1 center'>" 
		        	   		+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' disabled='disabled' onclick=generateBarcodePopup1("+i+") ></td>";	
		        	   		+ "<td class='col-md-1 center'></td>";
		        	   
		        	   divContent = divContent+ "<td class='col-md-1 center'>" 
		        	   		+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageAuthorizedRoutineValue(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+","+r.labSampleWiseMasterDtoList[i].profileId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
		        	   		+ "<td class='col-md-1 center'></td>";
		        	   
		           if(indicatorType=="normal"){   
		        		   $('#bulkPost').show();
		        		   $('#bulksapmle').show();
		        		   // for covid report only if condition apply
		        		   var CovidReportProfileId= $("#CovidReportProfileId").val();
		        		   var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
		        		   var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
		        		   
		        		   var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
		        		   var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
		        		   if(CovidReportProfileId==r.labSampleWiseMasterDtoList[i].profileId || SARSCOV2ANTIGEN== r.labSampleWiseMasterDtoList[i].profileId || COVID19RNAAMPLIFICATION == r.labSampleWiseMasterDtoList[i].profileId || REALTIMEHEPATITISCVIRUSHCV == r.labSampleWiseMasterDtoList[i].profileId || REALTIMETRUENAT == r.labSampleWiseMasterDtoList[i].profileId)
		        			{ 
		        			  //s alert("DDDDD");
							    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
		        			}else
		        			{
		        				  
							    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' disabled='disabled'  type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 
		        			}	
						    //   divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 

			       }else{
			    	   $('#bulkPost').hide();
			    	   $('#bulksapmle').hide();
			       }   
 
			        
		    	   }else if(id=="AAP")
		    		{}else if(id=="AAprocessing")
		    		{}else
		    		{}	
           		        		        
			}
			$('#proccessingtabId').html(divContent);
			$('#proccessingtabId1').html(divContent);
		}
			
			var numberOfRows = "";
			var index = 1;
			var count = noOfPages;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='paginationOnIndicator("+index+", "+Math.ceil(numberOfPages)+", \""+indicatorType+"\")'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='paginationOnIndicator("+index+", "+Math.ceil(numberOfPages)+", \""+indicatorType+"\")'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 6){
				numberOfRows +="<li class='next' onclick='nextPaginationOnIndicator("+index+","+Math.ceil(numberOfPages)+", \""+indicatorType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#authorizationNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#authorizationNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='authorizationPageNumber'/><button class='btn btn-primary btn-xs' onclick='jumpToPageOnIndicator("+Math.ceil(numberOfPages)+", \""+indicatorType+"\");'>Go</button></a></li>");
			}
			$('#authorizationPagination').html(numberOfRows);
			
			if(id == "AD"){}else if(id == "AA"){/*
				var numberOfRows = "";
				var index = 1;
				var count = r.rowCount;
				var numberOfPages = (count/10);
				var displayPagination = numberOfPages;			
				if(numberOfPages > 5){
					numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
					displayPagination = 5;
				}
				for(var j = 0; j < displayPagination; j++){
					if(j == 0){
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"authorization\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"authorization\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 6){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"authorization\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#authorizationNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else
					$('#authorizationNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#authorizationPagination').html(numberOfRows);
			*/}else if(id == "AAP"){}else if(id == "AO"){}else if(id == "AAprocessing"){}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function paginationOnIndicatorReporting(pageNumber, numberOfPages, callFrom){
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('indicatorType=' + encodeURIComponent(callFrom));
    inputs.push('startIndex='+startIndex);
    inputs.push('statusCode='+6);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getRecordAgainstIndicator",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setPatientTemp(r, "reportingAutoSugg", callFrom);
	        
        	$('#reportingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}



/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextPaginationOnIndicatorReporting(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousPaginationOnIndicatorReporting('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="paginationOnIndicatorReporting('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages > displayPagination){
		numberOfRows +='<li class="next" onclick="nextPaginationOnIndicatorReporting('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	$('#reportingPagination').html(numberOfRows);
	paginationOnIndicatorReporting(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousPaginationOnIndicatorReporting(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousPaginationOnIndicatorReporting('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="paginationOnIndicatorReporting('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="nextPaginationOnIndicatorReporting('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		$('#reportingPagination').html(numberOfRows);
		paginationOnIndicatorReporting(displayPagination, numberOfPages, callFrom);
}

function jumpToPageOnIndicatorReporting(numberOfPages, callFrom){
	var pageNo = $("#reportingPageNumber").val();
	
	if(pageNo <= numberOfPages){
		paginationOnIndicatorReporting(pageNo, numberOfPages, callFrom);
	}else{
		alert("Invalid page number.");
	}
	$("#reportingPagination").val("0");
}


/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function paginationOnIndicator(pageNumber, numberOfPages, callFrom){
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	var txtFdate = $.trim($("#txtFdate").val());	
	var txtTdate = $.trim($("#txtTdate").val());	
	inputs.push('indicatorType=' + encodeURIComponent(callFrom));
    inputs.push('startIndex='+startIndex);
    inputs.push('statusCode='+5);
    inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getRecordAgainstIndicator",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setPatientTemp(r, "authorizationAutoSugg", callFrom,pageNumber);
	        
        	$('#authorizationNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}
/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextPaginationOnIndicator(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousPaginationOnIndicator('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="paginationOnIndicator('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages > displayPagination){
		numberOfRows +='<li class="next" onclick="nextPaginationOnIndicator('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	$('#authorizationPagination').html(numberOfRows);
	paginationOnIndicator(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousPaginationOnIndicator(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousPaginationOnIndicator('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="paginationOnIndicator('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="nextPaginationOnIndicator('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		$('#authorizationPagination').html(numberOfRows);
		paginationOnIndicator(displayPagination, numberOfPages, callFrom);
}

function jumpToPageOnIndicator(numberOfPages, callFrom){
	var pageNo = $("#authorizationPageNumber").val();
	
	if(pageNo <= numberOfPages){
		paginationOnIndicator(pageNo, numberOfPages, callFrom);
	}else{
		alert("Invalid page number.");
	}
	$("#authorizationPageNumber").val("0");
}

//This function is use to barcode series validation collection at airport wise.
function barcodeValidation(barcodee){
	
	var barcode=$("#"+barcodee).val();
	
	if(barcode != ""){
		if(barcode.length != 14){
			alert("Barcode No should be 14 digit.");
			$("#"+barcodee).val(0);
			$("#"+barcodee).focus();
			return false;
		}else{
			var collectedAt= $("#refDocId").val();
			var codeValidator = barcode.substring(0, 7);
			
			if(collectedAt == 1){//Domestic
				if(codeValidator != "LC00016"){
					//if(codeValidator != "LC01026"){
					$("#"+barcodee).val("");
					alert("Not valid Barcode series");
					$("#"+barcodee).focus();
				}
			}else if(collectedAt == 2){//International Arrival
				if(codeValidator != "LC00019"){
					$("#"+barcodee).val("");
					alert("Not valid Barcode series");
					$("#"+barcodee).focus();
				}
			}else if(collectedAt == 4){//Kalina
				if(codeValidator != "LC00017"){
					$("#"+barcodee).val("");
					alert("Not valid Barcode series");
					$("#"+barcodee).focus();
				}
				
			}else if(collectedAt == 3){//International Departure
				if(codeValidator != "LC00018"){
					$("#"+barcodee).val("");
					alert("Not valid Barcode series");
					$("#"+barcodee).focus();
				}
				
			}
		}
	}else{
		$("#"+barcodee).val(0);
		alert("Not valid Barcode");
		$("#"+barcodee).focus();
	}
	
	
}

/*********************************************************
 * @author Rohit Sandbhor
 * @since 22-09-2021
 * @param indicatorType
 * @returns {Boolean}
 *********************************************************/
function getRecordOnAuthorizationTemplateWise(indicatorType){
	id="AA";
	
	$("#callformforAuthorizationSearch").val('templatetest');  // add by Rohini.
	
	var noOfPagess = $("#"+indicatorType).text();
	var a=noOfPagess.split("/");
	var noOfPages = a[0];
	var txtFdate = $.trim($("#txtFdate").val());	
	var txtTdate = $.trim($("#txtTdate").val());
	/*if(noOfPages == 0){
		alert("No Data Available!");
		return false;
	}*/
	var startIndex = 0;
	var inputs = [];
	inputs.push('indicatorType=' + encodeURIComponent(indicatorType));
	inputs.push('startIndex='+startIndex);
	inputs.push('statusCode='+5);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getRecordAgainstIndicator",
		error : function() {
			alert("error");
		},
		success : function(r) {	
			//exportToExcelDateInProcessingTab(r);
			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
				for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					var pNo = 0;
					if (startIndex != 0) {
						pNo = (startIndex - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
				     $("#patientName").text(patinetname);
				     var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleDateString('en-US', {day: '2-digit', year: 'numeric', month: '2-digit', hour: '2-digit', minute: '2-digit',second: '2-digit'}); 
					var a = datetime.split(",");
					
					datecollection=a[0];
					timecollection=a[1];
					var regdatesplit=datecollection.split("/");
					
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					
					var splittedString=timecollection.split(":");
					var aaa=splittedString.slice(0,-1).join(':');
					
					var d = new Date(datecollection + timecollection); 
				    var time24hr = d.getHours() + ':' + d.getMinutes(); 
				    var  collDateTime=mm+"-"+yy+"-"+dd+"  : "+time24hr+" ";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
					
					var statusss="";
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
				if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
						statusss="Collection Pending";
				} if(r.labSampleWiseMasterDtoList[i].teststatus==2){
					statusss="Accessing Pending";
				} if(r.labSampleWiseMasterDtoList[i].teststatus==3){
					statusss="Accepted Done";
				} if(r.labSampleWiseMasterDtoList[i].teststatus==4){
					statusss="Sample Rejected";
				}if(r.labSampleWiseMasterDtoList[i].teststatus==5){
					statusss="Sample In Authorization";
				}if(r.labSampleWiseMasterDtoList[i].teststatus==6){
					statusss="Sample Reported";
				}
				
				var printData=r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;
				divContent = divContent+ '<tr style="height:2px;" >'		
				+ "<td class='col-md-1 center'>"+srNo+"</td>"
		        	+ "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>";	
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>";	
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"	
					//+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					+ "<td class='col-md-2 center'>"+collDateTime+"</td>"	
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					+ "<td class='col-md-2 center'>"+statusss +"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					+ "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
           		
		        if(id=="AA"){
		        	   //divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].pathlogistName+"</td>";	
		        	   divContent = divContent  + "<td class='col-md-1 center'>"+timeSesitiveValue +"</td>";
		        	   divContent = divContent+ "<td class='col-md-1 center'>" 
		        	   		+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' disabled='disabled' onclick=generateBarcodePopup1("+i+") ></td>";	
		        	   		+ "<td class='col-md-1 center'></td>";
		        	   
		        	   divContent = divContent+ "<td class='col-md-1 center'>" 
		        	   		+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageAuthorizedRoutineValueTemplateWise(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+","+r.labSampleWiseMasterDtoList[i].profileId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
		        	   		+ "<td class='col-md-1 center'></td>";
		        	   
		           if(indicatorType=="normal"){   
		        		   $('#bulkPost').show();
		        		   $('#bulksapmle').show();
		        		   // for covid report only if condition apply
		        		   var CovidReportProfileId= $("#CovidReportProfileId").val();
		        		   var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
		        		   var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
		        		   
		        		   var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
		        		   var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
		        		   if(CovidReportProfileId==r.labSampleWiseMasterDtoList[i].profileId || SARSCOV2ANTIGEN== r.labSampleWiseMasterDtoList[i].profileId || COVID19RNAAMPLIFICATION == r.labSampleWiseMasterDtoList[i].profileId || REALTIMEHEPATITISCVIRUSHCV == r.labSampleWiseMasterDtoList[i].profileId || REALTIMETRUENAT == r.labSampleWiseMasterDtoList[i].profileId)
		        			{ 
		        			  //s alert("DDDDD");
							    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
		        			}else
		        			{
		        				  
							    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' disabled='disabled'  type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 
		        			}	
						    //   divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 

			       }else{
			    	   $('#bulkPost').hide();
			    	   $('#bulksapmle').hide();
			       }   

			        
		    	   }else if(id=="AAP")
		    		{}else if(id=="AAprocessing")
		    		{}else
		    		{}
		        
		        
			}
			$('#proccessingtabId').html(divContent);
			$('#proccessingtabId1').html(divContent);
		}
			
			var numberOfRows = "";
			var index = 1;
			var count = noOfPages;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='paginationOnIndicator("+index+", "+Math.ceil(numberOfPages)+", \""+indicatorType+"\")'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='paginationOnIndicator("+index+", "+Math.ceil(numberOfPages)+", \""+indicatorType+"\")'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 6){
				numberOfRows +="<li class='next' onclick='nextPaginationOnIndicator("+index+","+Math.ceil(numberOfPages)+", \""+indicatorType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#authorizationNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#authorizationNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='authorizationPageNumber'/><button class='btn btn-primary btn-xs' onclick='jumpToPageOnIndicator("+Math.ceil(numberOfPages)+", \""+indicatorType+"\");'>Go</button></a></li>");
			}
			$('#authorizationPagination').html(numberOfRows);
		}
	});
}

/******
 * @author   :HM00054
 * @Code     :this method used for to send the RIS  test from package
 * *****/
function sendToRisFromPackage(subListRIS){
	
	var patientId = parseInt($("#patientId").text());
	var treatmentId = parseInt($("#treatmentId").text());
	subListRIS = JSON.stringify(subListRIS);
	
	var investigationTestUrgentFlag = 0;
	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = $("#idHiddentUrgencyStatus").val();
	}else{
			investigationTestUrgentFlag =  1;
	}

	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = 1;
	}
	
	 var inputs = [];
	    inputs.push("patientId="+patientId);
	    inputs.push("treatmentId=" + treatmentId);
		inputs.push("subList=" + subListRIS);	
		//inputs.push("invesTestFlag="+1);
		inputs.push("invesTestFlag="+investigationTestUrgentFlag); // change by Rohini
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",	
			url 	: "ehat/ris/sendToRis",
			error 	: function() {
						alert('Not coneected to server: Please check connections!');
					 },
			success : function(r) {
				if(r=="-1"){
					alert("Test has been already sent to Ris!");
				}else if(parseInt(r)>0){
						alertify.success("Tests Sent.");
				}else{
						alertify.error("Test has not been sent");
				}
				//window.location.reload(true);
				
				$('#RisStatusPopUp').modal('hide');  // Added by Rohini
			}
		});	
}


function getRecordCountOnAuthorization(){
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	jQuery.ajax({
    	async : false,
    	type : "POST",
    	data : {
			"statusCode" : 5,
			"fromDate"	: txtFdate,
			"toDate"	: txtTdate
		},
    	url : "ehat/phlebotomy/getRecordCountOnAuthorization",
    	
    	catche : false,
    	error : function() {
    		alert('Network Issue!');
    	},
    	success : function(r) {  
    		
    		
    		
    		//$('#cAbnormal').text(r.normalTestCount);
    	//	$('#abnormal').text(a[1]);
    		$('#normal').text(r.normalTestCount);
    		$('#templateTest').text(r.templateTestCount);
    	}
    });
}

// added Rohini for ris test for check duplicate ris test.

function getInvstigationPreDetails(serviceId, subServiceId) {
	var sex = $('#sex').text();
	var patientId = $('#patientId').text();
	var treatmentId = $('#treatmentId').text();
	var gender = 0;
	if (sex == "Male") {
		gender = 1;
	} else if (sex == "Female") {
		gender = 2;
	} else {
		gender = 3;
	}
	var callfrom = "RIS";

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : {
					"patientId" : encodeURIComponent(patientId),
					"treatmentId" : encodeURIComponent(treatmentId),
					"serviceId" : encodeURIComponent(serviceId),
					"subServiceId" : encodeURIComponent(subServiceId),
					"gender" : encodeURIComponent(gender),
					"callfrom" : encodeURIComponent(callfrom)
				},
				url : "ehat/phlebotomy/getInvstigationPreDetails",
				error : function() {
					alert('Not coneected to server: Please check connections!');
				},
				success : function(r) {

					var heightCount = 0;
					var weightCount = 0;
					var urineVolumeCount = 0;
					var lmpCount = 0;
					var inHouse = 0;
					var outHouse = 0;
					var inOutHouseCount = 0;
					var sampleIdd = 0;

					var sponsorId = $("#SponsorsourceTypeId").val();
					var chargesSlaveId = $("#chargesSlaveId").val();

					if(r.labTestList.length > 0) {

						for ( var i = 0; i < r.labTestList.length; i++) {
							// START histopath test validation
							if (r.labTestList[i].histopathLab == "Y") {
								//alert("hi");

								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									if (sponsorId >= 1 && chargesSlaveId > 0) {
										$('#sampleType').val(r.labTestList[i].sampleId);
										$('#sampleTypeOpdSponsor').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('disabled',
										// 'disabled');
										// $('#sampleTypeOpdSponsor').attr('disabled',
										// 'disabled');
									} else {
										$('#sampleType').val(r.labTestList[i].sampleId);
										// $('#sampleType').attr('readonly',
										// 'true');
									}
									$('#histopathLab').val(r.labTestList[i].histopathLab);
									sampleIdd = r.labTestList[i].sampleId;

									var processAtOutlab = (r.labTestList[i].processAtOutlab);
									if(processAtOutlab == "Y") {
										outHouse++;
									} else {
										inHouse++;
									}
								}
								// END histopath test validation
							} else {
								// START LIS test validation
								if(r.labTestList[i].callFrom == "Profile Not Configured In LIS") {
									
									alert("Profile Not Configured In LIS !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								}
								
								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfIpd();
									$("#perticular").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {
									//if(r.labTestList[i].isMatch == "N") {// check
										// already
										// test
										// is
										// present
										// or
										// not

										if(sponsorId >= 1
												&& chargesSlaveId > 0) {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											$('#sampleTypeOpdSponsor').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('disabled',
											// 'disabled');
											// $('#sampleTypeOpdSponsor').attr('disabled',
											// 'disabled');
										} else {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											// $('#sampleType').attr('readonly',
											// 'true');
										}

										sampleIdd = r.labTestList[i].sampleId;

										var processAtOutlab = (r.labTestList[i].processAtOutlab);
										if(processAtOutlab == "Y") {
											outHouse++;
										} else {
											inHouse++;
										}

										var prerequisite = (r.labTestList[i].prerequisite);
										// if (prerequisite == "Y") {
										var height = (r.labTestList[i].height);
										var weight = (r.labTestList[i].weight);
										var urineVolume = (r.labTestList[i].urineVolume);
										var lmpVolume = (r.labTestList[i].lmpStatus);

										if (height == "Y") {
											heightCount++;
										}
										if (weight == "Y") {
											weightCount++;
										}
										if (urineVolume == "Y") {
											urineVolumeCount++;
										}
										if (lmpVolume == "Y") {
											lmpCount++;
										}
										// }

									/*}else {
										// decideDuplicateTestGiven(serviceId,subServiceId);
										alert("Test Already Present !");
										clearAllFieldsOfOpd();
										$("#perticular").focus();

										return false;
									}*/

								}
							}// END LIS test validation
						}

						// setting value of IN House Lab
						if(inHouse > 0 && outHouse > 0) {
							inOutHouseCount = 3;
						} else if (inHouse > 0) {
							inOutHouseCount = 1;
						} else if (outHouse > 0) {
							inOutHouseCount = 2;
						}
						//getBarcodeIdFromSampleWise(sampleIdd, inOutHouseCount);
						$('#inOutHouseCount').val(inOutHouseCount);// set count
																	// of In Out
																	// House

						generatePrerequisitePopup(heightCount, weightCount,
								urineVolumeCount, lmpCount);// Call For open
															// popup of
															// Prerequisite

					}else {
						alert("Test Not Available For This Gender Type OR Profile Not Configured ! !");
						clearAllFieldsOfIpd();
						heightCount = 0;
						weightCount = 0;
						urineVolumeCount = 0;
						$("#perticular").focus();
						return false;

					}
				}
			});
}


function sendToRisFromPackageIPD(subListRIS){
	
	var patientId = parseInt($("#patientId").text());
	var treatmentId = parseInt($("#treatmentId").text());
	subListRIS = JSON.stringify(subListRIS);
	
	var investigationTestUrgentFlag = 0;
	if (investigationTestUrgentFlag == 0) {
		//investigationTestUrgentFlag = $("#idHiddentUrgencyStatus").val();
	}else{
			investigationTestUrgentFlag =  1;
	}

	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = 1;
	}
	
	 var inputs = [];
	    inputs.push("patientId="+patientId);
	    inputs.push("treatmentId=" + treatmentId);
		inputs.push("subList=" + subListRIS);	
		//inputs.push("invesTestFlag="+1);
		inputs.push("invesTestFlag="+investigationTestUrgentFlag); // change by Rohini
		var str = inputs.join('&');	
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data 	: str + "&reqType=AJAX",	
			url 	: "ehat/ris/sendToRis",
			error 	: function() {
						alert('Not coneected to server: Please check connections!');
					 },
			success : function(r) {
				if(r=="-1"){
					alert("Test has been already sent to Ris!");
				}else if(parseInt(r)>0){
						alertify.success("Tests Sent.");
				}else{
						alertify.error("Test has not been sent");
				}
				//window.location.reload(true);
				
				$('#RisStatusPopUp').modal('hide');  // Added by Rohini
			}
		});	
}


function updateDuplicateProfileIds(treatmentId){
	   
	//var  treatmentID=$("#treatId").val();
			var inputs = [];
			inputs.push('treatmentID=' + treatmentId);
			var str = inputs.join('&');
			
			jQuery.ajax({
				async : true,
				type : "POST",
				url : "ehat/pathologyupdateprofile/updateDuplicateProfileIds",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					
				}
			});
		
		


 }