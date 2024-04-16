//function start for male autosuggestion 
function autoSuggestionforMalePatient(inputID, typeauto) {
	// alert("male");
	// $(".typeahead2").hide();
	document.getElementById("right-icon").style.display = 'none';
	document.getElementById("warning-icon").style.display = 'none';
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	var inputs = [];

	
	inputs.push('patientName=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/autoSuggestionforMalePatient",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log("reponse", r);
			var availableTags = [];
			if (r.listReg.length == 0) {
				template = "No Matching Found"

			} else {

				ajaxResponse = JSON.stringify(r);
				ajaxResponse = eval('(' + ajaxResponse + ')');
				for (var i = 0; i < ajaxResponse.listReg.length; i++) {

					availableTags.push(ajaxResponse.listReg[i].patientNameivf
							+ "_" + ajaxResponse.listReg[i].patientidivf);
				}

				
				
				var template = "";
				for (var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);

					resultData.push({
						ID : idValue,
						Name : arrValue[0] + "-" + arrValue[1]
					});

					template = template + '<li data-value= "' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0] + "-" + arrValue[1]
							+ '</a></li>';

				}

				$(".typeahead").html(template);
				$(".typeahead").show();

				setTimeout(function() {
					$('#txtPatientName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult2,
						scrollBar : true

					});
					$("#txtPatientName").data('typeahead').source = resultData;
				}, 500);
			}
		}
	});

}
// function end for male autosuggestion
function displayResult2(item) {
	var txtVal1 = $("#txtPatientName").val();

	console.log(item["value"]);

	var itemid = item["value"];
	$('#txtPatientName').val(item.text);
	$("#txtPatientName").val(item.value);
	
	$("#male_ivf_id").val(itemid);
	
	var inputs = [];
	

	//inputs.push('itemid=' + itemid);
	inputs.push('patientId=' + itemid);
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "ehat/ivf/getPatientDataById",
				url : "ehat/ivf/getIvfPatientInfoByPatientId",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					
					
					CheckCoupledOrNot(itemid, "male");
					
					var coupleOrNot = $("#coupleOrNot").val();
					
				if(coupleOrNot == "-"){/*
					
					getStateList(itemid, "male");

					$('#divimg')
							.attr(
									'src',
									'/EhatEnterprise/ehat/ivf/readImage?url='
											+ r.imageName);
					$('#divimg').attr('value', r.imageName);
					var c = $("#p_name").html(r.fName + " " + r.lName);
					var d = $("#dob").html(r.dob);
					$("#mrn").html(r.mrnno);
					$("#w-a-g").html(
							r.patient_weight + "/" + r.age + "/" + r.gender);
					$("#mo").html(r.mobile);
					console.log("reponse", r);
					if (r.tflg == "N") {
						document.getElementById("right-icon").style.display = 'none';
						document.getElementById("warning-icon").style.display = 'block';
					} else {

						document.getElementById("right-icon").style.display = 'block';
						document.getElementById("warning-icon").style.display = 'none';

					}
					$("#m_fname").html(r.fName);
					$("#m_middlename").html(r.mName);
					$("#m_lname").html(r.lName);
					$("#m_mrn").html(r.mrnno);

					$("#dob_for_m_").html(r.dob);
					$("#wag_for_m").html(
							r.patient_weight + "/" + r.age + "/" + r.gender);
					$("#mo_for_m").html(r.mobile);
					$("#email_for_m").html(r.emailId);
					$("#address_for_m").html(r.address);
					var c_id = r.countryId;

					if (c_id == 1) {
						$("#country_for_m").html("India");
					}
					if (c_id == 2) {
						$("#country_for_m").html("Singapore");
					}
					if (c_id == 3) {
						$("#country_for_m").html("Spain");
					}

					if (r.department_id == 1) {
						$("#type_for_m").html("OPD");
					}
					if (r.department_id == 2) {
						$("#type_for_m").html("IPD");
					}
					if (r.department_id == 3) {
						$("#type_for_m").html("Diagnostic");
					}

				*/
					
				
				
				
				

					
					getStateList(itemid, "male");

					$('#divimg')
							.attr('src',		'ehat/ivf/readImage?url='+ r.lstIvfPatientInfo[0].imageName);
					$('#divimg').attr('value', r.lstIvfPatientInfo[0].imageName);
					var c = $("#p_name").html(r.lstIvfPatientInfo[0].firstname + " " + r.lstIvfPatientInfo[0].lastname);
					var d = $("#dob").html(r.lstIvfPatientInfo[0].dob);
					$("#mrn").html(r.lstIvfPatientInfo[0].mrnNo);
					//$("#w-a-g").html(r.lstIvfPatientInfo[0].patient_weight + "/" + r.lstIvfPatientInfo[0].age + "/" + r.lstIvfPatientInfo[0].gender);
					$("#w-a-g").html(r.lstIvfPatientInfo[0].wag);
					$("#mo").html(r.lstIvfPatientInfo[0].mobile);
					console.log("reponse", r);
					if (r.tflg == "N") {
						document.getElementById("right-icon").style.display = 'none';
						document.getElementById("warning-icon").style.display = 'block';
					} else {

						document.getElementById("right-icon").style.display = 'block';
						document.getElementById("warning-icon").style.display = 'none';

					}
					$("#m_fname").html(r.lstIvfPatientInfo[0].firstname);
					$("#m_middlename").html(r.lstIvfPatientInfo[0].middlename);
					$("#m_lname").html(r.lstIvfPatientInfo[0].lastname);
					$("#m_mrn").html(r.lstIvfPatientInfo[0].mrnNo);

					$("#dob_for_m_").html(r.lstIvfPatientInfo[0].dob);
					//$("#wag_for_m").html(r.lstIvfPatientInfo[0].patient_weight + "/" +r.lstIvfPatientInfo[0].age + "/" +r.lstIvfPatientInfo[0].gender);
					$("#wag_for_m").html(r.lstIvfPatientInfo[0].wag );
					$("#mo_for_m").html(r.lstIvfPatientInfo[0].mobile);
					$("#email_for_m").html(r.lstIvfPatientInfo[0].email);
					$("#address_for_m").html(r.lstIvfPatientInfo[0].address);
					
					
					$('#state_for_m').html(r.lstIvfPatientInfo[0].state);
					$('#district_for_m').html(r.lstIvfPatientInfo[0].district);
					$('#city_for_m').html(r.lstIvfPatientInfo[0].city);
					
					
					//var c_id = r.countryId;
					var c_id=1;

					if (c_id == 1) {
						$("#country_for_m").html("India");
					}
					if (c_id == 2) {
						$("#country_for_m").html("Singapore");
					}
					if (c_id == 3) {
						$("#country_for_m").html("Spain");
					}

					if (r.lstIvfPatientInfo[0].departmentId == 1) {
						$("#type_for_m").html("OPD");
					}
					if (r.lstIvfPatientInfo[0].departmentId == 2) {
						$("#type_for_m").html("IPD");
					}
					if (r.lstIvfPatientInfo[0].departmentId == 3) {
						$("#type_for_m").html("Diagnostic");
					}

				
				
				
				
				
				}else{
					alertify.error("This Patient Already Coupled.. \nPlease Select Another Patient");
					$("#txtPatientName").focus();
					return false;
				}
			}

			});

}

// function start for female autosuggestion
function autoSuggestionforFemalePatient(inputID, typeauto, gender) {
	document.getElementById("fright-icon").style.display = 'none';
	document.getElementById("fwarning-icon").style.display = 'none';
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	var inputs = [];

	inputs.push('patientName=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "ehat/ivf/autoSuggestionforFemalePatient",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					console.log("reponse", r);
					var availableTags = [];
					if (r.listReg.length == 0) {
						// alert("NO MATCHING FOUND");

					} else {

						ajaxResponse = JSON.stringify(r);
						ajaxResponse = eval('(' + ajaxResponse + ')');
						for (var i = 0; i < ajaxResponse.listReg.length; i++) {

							availableTags
									.push(ajaxResponse.listReg[i].patientNameivffemale
											+ "_"
											+ ajaxResponse.listReg[i].patientidivffemale);
						}

						var template1 = "";
						for (var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j]).split("_");
							var idValue = (arrValue[1]);

							resultData.push({
								ID : idValue,
								Name : arrValue[0] + "-" + arrValue[1]
							});

							template1 = template1 + '<li data-value= "'
									+ (arrValue[1]) + '" class=""><a href="#">'
									+ arrValue[0] + "-" + arrValue[1] + '</a></li>';

						}

						$(".typeahead2").html(template1);
						$(".typeahead2").show();

						setTimeout(
								function() {
									$('#txtFemaleName').typeahead2({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResultFemale,
										scrollBar : true

									});
									$("#txtFemaleName").data('typeahead2').source = resultData;
								}, 500);
					}
				}
			});

}

// function start for female autosuggestion
function displayResultFemale(item) {
	
	var itemid = item["value"];
	console.log("itemid" + itemid);
	
	CheckCoupledOrNot(itemid, "female");
	
	var coupleOrNot = $("#coupleOrNot").val();
	
 if(coupleOrNot == "-"){	
	getStateList(itemid, "female");
	$('#txtFemaleName').val(item.text);
	$("#txtFemaleName").val(item.value);
	
	$("#female_ivf_id").val(itemid);
	
	

	var inputs = [];

	//inputs.push('itemid=' + itemid);
	inputs.push('patientId=' + itemid);
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "/EhatEnterprise/ehat/ivf/getPatientDataById",
				url : "ehat/ivf/getIvfPatientInfoByPatientId",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					console.log(r);
					$('#femaleImg')
							.attr('src','ehat/ivf/readImage?url='+ r.lstIvfPatientInfo[0].imageName);
					$('#femaleImg').attr('value', r.lstIvfPatientInfo[0].imageName);
					var c = $("#pf_name").html(r.lstIvfPatientInfo[0].firstname + " " + r.lstIvfPatientInfo[0].lastname);
					var d = $("#fdob").html(r.lstIvfPatientInfo[0].dob);
					$("#fmrn").html(r.mrnNo);
					$("#f-w-a-g").html(	r.lstIvfPatientInfo[0].wag);
					$("#fmo").html(r.lstIvfPatientInfo[0].mobile);
					
					if (r.tflg == "N") {
						document.getElementById("fright-icon").style.display = 'none';
						document.getElementById("fwarning-icon").style.display = 'block';
					} else {

						document.getElementById("fright-icon").style.display = 'block';
						document.getElementById("fwarning-icon").style.display = 'none';

					}

					$("#female_fname").html(r.lstIvfPatientInfo[0].firstname);
					$("#female_mname").html(r.lstIvfPatientInfo[0].middlename);
					$("#female_lname").html(r.lstIvfPatientInfo[0].lastname);
					$("#female_mrn").html(r.lstIvfPatientInfo[0].mrnNo);

					$("#female_dob").html(r.lstIvfPatientInfo[0].dob);
					$("#female_wag").html(r.lstIvfPatientInfo[0].wag );
					$("#female_mo").html(r.lstIvfPatientInfo[0].mobile);
					$("#female_email").html(r.lstIvfPatientInfo[0].email);
					$("#female_add").html(r.lstIvfPatientInfo[0].address);
					
					
					
					
					$('#female_state').html(r.lstIvfPatientInfo[0].state);
					$('#female_district').html(r.lstIvfPatientInfo[0].district);
					$('#female_city').html(r.lstIvfPatientInfo[0].city);
				//	var c_id = r.countryId;
					var c_id=1;
					if (c_id == 1) {
						$("#female_country").html("India")
					}
					if (c_id == 2) {
						$("#female_country").html("Singapore")
					}
					if (c_id == 3) {
						$("#female_country").html("Spain")
					}

					if (r.department_id == 1) {
						$("#female_type").html("OPD");
					}
					if (r.department_id == 2) {
						$("#female_type").html("IPD");
					}
					if (r.department_id == 3) {
						$("#female_type").html("Diagnostic");
					}

				}

			});
   }else{
	   alertify.error("This Patient Already Coupled.. \nPlease Select Another Patient");
		$("#txtFemaleName").focus();
		return false;
   }
}


function CheckCoupledOrNot(patientId, gender){
	
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('gender=' + gender);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/checkCoupledOrNot",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
	
		success : function(r) {
			var ajaxResponse = r;
			$("#coupleOrNot").val(ajaxResponse);
		}
	});
}

/* function for getting list of state,city and district */
function getStateList(id, gender) {
	console.log("pid" + " " + id);
	var inputs = [];
	inputs.push('patid=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/list_state",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log("response of list:" + r);
			var s = r;
			var ss = s.toString().split(",");
			console.log("122222222222" + ss[0]);
			if (r.length != 0) {
				if (gender == "male") {
					console.log("122222222222" + ss[0], ss[1], ss[2]);
					console.log("in if");
					$('#state_for_m').html(ss[0]);
					$('#district_for_m').html(ss[1]);
					$('#city_for_m').html(ss[2]);
				} else {
					console.log("in else");
					console.log(ss[0], ss[1], ss[2]);
					$('#female_state').html(ss[0]);
					$('#female_district').html(ss[1]);
					$('#female_city').html(ss[2]);
				}
			}

			if (r.length == 0 && gender == "male") {
				$('#state_for_m').html("");
				$('#district_for_m').html("");
				$('#city_for_m').html("");
			}
			if (r.length == 0 && gender == "female") {
				$('#female_state').html("");
				$('#female_district').html("");
				$('#female_city').html("");
			}
		}
	});
}

function SaveCoupleDetails() 
{
	var retVal = confirm("Do you want to Save?");
	if (retVal == true) 
	{
		//var MalePatient = $("#txtPatientName").val();
		var MalePatient = $("#p_name").html();
		if (MalePatient == "" || MalePatient == null) {
			alertify.error("Please Select Male Patient");
			$("#txtPatientName").focus();
			return false;
		}
		
		//var FemalePatient = $("#txtFemaleName").val();
		var FemalePatient = $("#pf_name").html();
		if (FemalePatient == "" || FemalePatient == null) {
			alertify.error("Please Select Female Patient");
			$("#txtFemaleName").focus();
			return false;
		}
		
		var malePatientId = $("#male_ivf_id").val();
		var femalePatientId = $("#female_ivf_id").val();
        var queryType = $("#queryType").val();
        var ivfCoupleId = $("#coupleId").val();
        
        var maleDepartment = $("#type_for_m").html();
		var femaleDepartment = $("#female_type").html();
		
		var maleDept = "";
		var femaleDept = "";
		if(maleDepartment=="OPD"){
			maleDept = "1";
		}else if(maleDepartment=="IPD"){
			maleDept = "2";
		}else{
			maleDept = "3";
		}
		
		if(femaleDepartment=="OPD"){
			femaleDept = "1";
		}else if(femaleDepartment=="IPD"){
			femaleDept = "2";
		}else{
			femaleDept = "3";
		}
       
		var ivfCoupleDetails = {   
				listCouple : []
			};
		ivfCoupleDetails.listCouple.push({
			malePatientId : malePatientId,
			femalePatientId : femalePatientId,
			ivfCoupleId : ivfCoupleId,
			femaleDept : femaleDept,
			maleDept : maleDept
		});
		
		ivfCoupleDetails = JSON.stringify(ivfCoupleDetails);
		
		var inputs = [];
		// General Info
		inputs.push("ivfCoupleDetails=" + ivfCoupleDetails);
		inputs.push("queryType=" + queryType);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str,
			url :  "ehat/ivf/generateCoupleId",
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(queryType == "insert"){
					alert("IVF Couple Id generated Successfully!!!");
				}else{
					alert("IVF Couple Details updated Successfully!!!");
				}
				RefreshAllDetails();
			}
		  });
		}
	
	
}

function RefreshAllDetails(){
	
	$("#txtPatientName").val('');
	$("#txtFemaleName").val('');
	
	//clear Female Details
	$("#female_ivf_id").val('');
	$("#fright-icon").html("");
	$('#femaleImg').attr("src","images/female.png");
    $("#pf_name").html("");
	$("#fdob").html("");
	$("#fmrn").html("");
	$("#f-w-a-g").html("");
	$("#fmo").html("");
	
	$("#female_fname").html("");
	$("#female_mname").html("");
	$("#female_lname").html("");
	$("#female_mrn").html("");

	$("#female_dob").html("");
	$("#female_wag").html("");
	$("#female_mo").html("");
	$("#female_email").html("");
	$("#female_add").html("");
	$("#female_type").html("");
	$("#female_state").html("");
	$("#female_district").html("");
	$("#female_city").html("");
	$("#female_country").html("");
	
	//clear Male Details
	$('#divimg').attr("src","images/male.png");
	$("#right-icon").html("");
    $("#p_name").html("");
    $("#dob").html("");
    $("#mrn").html("");
    $("#w-a-g").html("");
    $("#mo").html("");
	
	$("#m_fname").html("");
	$("#m_middlename").html("");
	$("#m_lname").html("");
	$("#m_mrn").html("");

	$("#dob_for_m_").html("");
	$("#wag_for_m").html("");
	$("#mo_for_m").html("");
	$("#email_for_m").html("");
	$("#address_for_m").html("");
	
	$("#state_for_m").html("");
	$("#city_for_m").html("");
	$("#district_for_m").html("");
	
	$("#country_for_m").html("");
	$("#type_for_m").html("");
	$("#male_ivf_id").val('');
	
	$('#createCouple').val('Create Couple');
}

function fetchIVFCoupleList(coupleFlag,callFrom){
	
	$("#StatusNarration").val("");
	
	var fromDate=$("#fromDate").val();
	
	var toDate=$("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
		"coupleFlag" : coupleFlag,
		"fromDate" : fromDate,
		"toDate" : toDate,
	 			},
 		url 	: "ehat/ivf/getIVFCoupleList",
		/*timeout : 1000 * 60 * 5,*/
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		
		success : function(r) {
			
			ajaxResponse = r;	
			
			var numberOfRows="";
			var index=1;
			var count=ajaxResponse.countCouple;
			var numberOfPages=(count/10);
			var displayPagination=numberOfPages;
			
			if(numberOfPages>5){
				numberOfRows +="<li class='disabled previous'><a><i class='ti-angle-double-left'></i></a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='pagination("+index+")'><a>"+index+"</a></li>";
				index=index+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.round(numberOfPages)+")'><a><i class='ti-angle-double-right' value='Next'></i></a></li>";
			}
			$('#totalNumberOfPages').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#patientRecordPagination').html(numberOfRows);
			
			if(coupleFlag=='Active'){
			  setTempOfActiveCoupleList(r);
			  setTempForBatchList(r,callFrom);
			}else{
				setTempOfPassiveCoupleList(r);
			}
			
			RefreshAllDetails();
		},
		
	});	

	
}


function setTempOfActiveCoupleList(r) {
	
	
	
	
	var htm="";
var index = 1;	
var Passive = "Passive";
var Active = "Active";

for ( var i = 0; i < r.lstCoupleviewDto.length;i++) {
	
	
	var datetime= new Date(r.lstCoupleviewDto[i].createdDateTime).toLocaleString();
	
	htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
	+ "<table class='table table-condensed cf'>"
	+ "<tbody>"
	+ "<td class='col-sm-1-1 center' >"+index+"</td>"
	+ "<td class='col-sm-1-1 center' >"+ r.lstCoupleviewDto[i].coupleID+"</td>"
	+ "<td class='col-sm-1-1 center' >"+r.lstCoupleviewDto[i].coupleNo+"</td>"
	+ "<td class='col-sm-1-1 center' >"+ r.lstCoupleviewDto[i].femalePatientName +"</td>"
	+ "<td class='col-sm-1-1 center' >"+ r.lstCoupleviewDto[i].malePatientName +"</td>"
	+ "<td class='col-sm-1-1 center' >"
	+ "<button id='blockPatView"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setCouplePatientDetails("+r.lstCoupleviewDto[i].coupleID+","+r.lstCoupleviewDto[i].femalePatientId+","+r.lstCoupleviewDto[i].malePatientId+",\"view\")' type='button' id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>"	
	+ "</td>"	
	+ "<td class='col-sm-1-1 center' >";
	
	if(r.lstCoupleviewDto[i].ivfBatchStatus == "not generated"){
		htm = htm + "<button id='blockPatView"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setCouplePatientDetails("+r.lstCoupleviewDto[i].coupleID+","+r.lstCoupleviewDto[i].femalePatientId+","+r.lstCoupleviewDto[i].malePatientId+",\"edit\")' type='button' id='btnVisit' value='edit'><i class='fa fa-eye View'></i></button>"
		          + "</td>"	
		          
	             // + "<td style='height: 21.5px;' class='col-sm-1-1 center'><input type='button' onclick='ShowPopUpNarra("+ r.lstCoupleviewDto[i].coupleID+",\"Passive\")' value='PASSIVE' class='btn btn-xs btn-primary'/>";
	        if(r.lstCoupleviewDto[i].coupleFlag == "Active"){
	        	htm = htm  +"<td>"
			      +"<label class='toggleSwitch nolabel' >"
				        +"<input type='checkbox'   checked  onclick='changeStatus(this.id,"+r.lstCoupleviewDto[i].coupleID+",\"Passive\")'  id='coupleFlag"+index+"'/>"
				        +"<span>"
				          +"<span style='color: #FFF'>Passive</span>"
				          +  "<span>Active</span>"
				        +"</span>"
				       + "<a></a>"
				   + "</label>"
			      +"</td>"
	        }else{
	        	htm = htm +"<td>"
			      +"<label class='toggleSwitch nolabel' onclick='changeStatus(this.id,"+r.lstCoupleviewDto[i].coupleID+",\"Active\")'  id='coupleFlag"+index+"'>"
				        +"<input type='checkbox'    />"
				        +"<span>"
				        +"<span style='color: #FFF'>Passive</span>"
				        +  "<span>Active</span>"
				          
				          
				        +"</span>"
				       + "<a></a>"
				   + "</label>"
			      +"</td>"
	        }
	
	}else{
		htm = htm + "<button id='blockPatView"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal'  type='button' id='btnVisit' disabled='disabled'><i class='fa fa-eye View'></i></button>"
                  + "</td>"		
                  
                //  + "<td style='height: 21.5px;' class='col-sm-1-1 center'><input type='button' class='btn btn-xs btn-primary' value='PASSIVE' disabled='disabled'/>";	
               

		      
		      +"<td>"
		      +"<label class='toggleSwitch nolabel' onclick=''  id='coupleFlag'>"
			        +"<input type='checkbox'  checked   disabled='disabled' />"
			        +"<span>"
			            
			          +  "<span>Active</span>"
			        +"</span>"
			       + "<a></a>"
			   + "</label>"
		      +"</td>"
		    
		      
	
	}
		
	htm = htm + "</td> "
	          + "<td class='col-sm-1-1 center' >"
	          + "<button class='btn btn-xs btn-primary' title='View Bill' type='button'  value='View Bill' onclick='showViewBillPopup("+ r.lstCoupleviewDto[i].femaleTreatId+","+ r.lstCoupleviewDto[i].maleTreatId +","+ r.lstCoupleviewDto[i].femaleDeptId+","+ r.lstCoupleviewDto[i].maleDeptId +")'><i class='fa fa-eye' class='edit'></button>"
	          + "</td>"
	          
	          /*+ "<td class='col-sm-1-1 center' >"
	          + "<button class='btn btn-xs btn-warning' title='View Doctor Desk' type='button'  value='PRINT' onclick='showDoctorDeskPopup("+ r.lstCoupleviewDto[i].femaleTreatId+","+ r.lstCoupleviewDto[i].femaleDoctorId +","+ r.lstCoupleviewDto[i].femaleDeptId+","+ r.lstCoupleviewDto[i].maleTreatId +","+ r.lstCoupleviewDto[i].maleDoctorId+","+ r.lstCoupleviewDto[i].maleDeptId +")'><i class='fa fa-eye' class='edit'></button>"
	          + "</td>"*/
	          
	          + "<td class='col-sm-1-1 center' >"
	          + "<button class='btn btn-xs btn-warning' title='View Doctor Desk' type='button'  value='PRINT' onclick='openIvfDoctorDesk("+ r.lstCoupleviewDto[i].femaleTreatId+","+ r.lstCoupleviewDto[i].femaleIvfTreatId +","+ r.lstCoupleviewDto[i].femalePatientId +")'><i class='fa fa-eye' class='edit'></button>"
	          + "</td>"
	          
	          + "<td class='col-sm-1-1 center' >"
	          + "<button class='btn btn-xs btn-warning' title='View Doctor Desk' type='button'  value='PRINT' onclick='openIvfDoctorDesk("+ r.lstCoupleviewDto[i].maleTreatId+","+ r.lstCoupleviewDto[i].maleIvfTreatId +","+ r.lstCoupleviewDto[i].malePatientId +")'><i class='fa fa-eye' class='edit'></button>"
	          + "</td>"
	          
	          + "</tr>" + "</tbody>" + "</table>" + "</div>";
index++;
}
$("#IVFcontainer").html(htm);
//$("#CamPatId").val(r.lstCoupleviewDto[i].CoupleId);
$("#IVFcontainer").html(htm);
$("#allPatInfo").html(r);
//$("#ehatTable").html(htm);
var maxPatId=Number(r.lstCoupleviewDto[0].coupleID)+Number(1);
$("#maxPatId").val(maxPatId);
$("#IVFcontainer").removeClass("loading");

}

function setTempForBatchList(r,callFrom) {

var htm="";
var index = 1;	
for ( var i = 0; i < r.lstCoupleviewDto.length;i++) {
	
	var datetime= new Date(r.lstCoupleviewDto[i].createdDateTime).toLocaleString();
	
	htm=htm + "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
	        + "<table class='table table-condensed cf'>"
	        + "<tbody><tr>"
	        + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
	        + "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstCoupleviewDto[i].coupleID
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].coupleID+"' id='hiddenCoupleId"+r.lstCoupleviewDto[i].coupleID+"' /></td>"
	        + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.lstCoupleviewDto[i].coupleNo+"</td>"
	        + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.lstCoupleviewDto[i].femalePatientName 
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].femalePatientId+"' id='femalePatientId"+r.lstCoupleviewDto[i].coupleID+"' />" 
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].femaleDeptId+"' id='femaleDeptId"+r.lstCoupleviewDto[i].coupleID+"' />"
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].femaleDoctorId+"' id='femaleDoctorId"+r.lstCoupleviewDto[i].coupleID+"' /></td>"
	        + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.lstCoupleviewDto[i].malePatientName 
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].malePatientId+"' id='malePatientId"+r.lstCoupleviewDto[i].coupleID+"' />" 
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].maleDeptId+"' id='maleDeptId"+r.lstCoupleviewDto[i].coupleID+"' />"
	        + "<input type='hidden' value='"+r.lstCoupleviewDto[i].maleDoctorId+"' id='maleDoctorId"+r.lstCoupleviewDto[i].coupleID+"' /></td>"
	        + "<td class='col-sm-1-1 center' style='height: 21.5px;'>";
	if(r.lstCoupleviewDto[i].ivfBatchStatus == "not generated"){
		htm = htm + "<input type='checkbox' id='coupleCheckbox"+r.lstCoupleviewDto[i].coupleID+"' value='"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' name='coupleCheckbox' type='button' id='btnCouple'>";
	}else {
		htm = htm + "<input type='checkbox' id='coupleCheckbox"+r.lstCoupleviewDto[i].coupleID+"' value='"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' name='coupleCheckbox' type='button' id='btnCouple' disabled='disabled'>";	
	}
	  
    htm = htm + "<input type='hidden' value='"+r.lstCoupleviewDto[i].coupleID+"' id='CoupleIdForBatch'>"
              + "</td>";
              + "</tr>" + "</tbody>" + "</table>" + "</div>";
index++;
}

$("#BatchContainer").html(htm);
$("#BatchContainer").removeClass("loading");

if(callFrom == 'batch'){
	$("#BatchQueryType").val('insert');
	$('#createBatch').val('Create Batch');
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '-' + mm + '-' + yyyy;

	$("#BatchPickUpDate").val(today);
}
   
}

function setTempOfPassiveCoupleList(r){

var htm="";

var index = 1;	

for ( var i = 0; i < r.lstCoupleviewDto.length;i++) {

var datetime= new Date(r.lstCoupleviewDto[i].createdDateTime).toLocaleString();

htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
+ "<table class='table table-condensed cf'>"
+ "<tbody>"
+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstCoupleviewDto[i].coupleID+"</td>"
+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+r.lstCoupleviewDto[i].coupleNo+"</td>"
+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.lstCoupleviewDto[i].femalePatientName +"</td>"
+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.lstCoupleviewDto[i].malePatientName +"</td>"
+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
+ "<button id='blockPatView"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view' disabled><i class='fa fa-eye View'></i></button>"	
+ "</td>"	
+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
+ "<button id='blockPatView"+r.lstCoupleviewDto[i].coupleID+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view' disabled><i class='fa fa-eye View'></i></button>"	
+ "</td>"			
+ "<td style='height: 21.5px;' class='col-sm-1-1 center'><input type='button' onclick='ShowPopUpNarra("+ r.lstCoupleviewDto[i].coupleID+",\"Active\")' value='ACTIVE' class='btn btn-xs btn-primary'/></td>";
htm=htm+ "</tr>" + "</tbody>" + "</table>" + "</div>";
index++;
}

$("#IVFPassiveContainer").html(htm);
$("#IVFPassiveContainer").removeClass("loading");
}
		
function ShowPopUpNarra(coupleID,coupleFlag){
	
	$("#changeStatusNarration").show('show');
	
	$("#coupleID").val(coupleID);
	$("#coupleFlag").val(coupleFlag);
	fetchNarrationOfCouple(coupleID);
}

function HidePopUpNarra() {
	$("#changeStatusNarration").hide('hide');
}

function fetchNarrationOfCouple(ivfCoupleId){
		jQuery.ajax({
			type : "POST",
			url  : "ehat/ivf/fetchNarrationOfCouple",
			data : {
					"ivfCoupleId" : ivfCoupleId
			},
	     
		   error : function() {
				    alert('error');
			},
		    success : function(response) {
		     	$("#StatusNarration").val(response);
			}
		});
}

function changeStatusOfIvfCouple(){
	
	var coupleID = $("#coupleID").val();
	var coupleFlag = $("#coupleFlag").val();
	
	 var narration = "";
	   narration = $("#StatusNarration").val();
	if (narration == "" || narration == undefined) {
		alert("Please Enter Narration...");
		$("#changeStatusNarration").hide('hide');
	 }else{
	
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
			 "coupleID" : coupleID,
			 "coupleFlag" : coupleFlag,
			 "narration" : narration,
	 			},
			url 	: "ehat/ivf/changeStatusOfIvfCouple",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				//alert('error');
			},
			success : function(r) {
				  alert("Couple Status Change Successfully..");
				  $("#changeStatusNarration").hide('hide');
				  
				 if(coupleFlag != "Active"){
					  fetchIVFCoupleList('Active');
				  }else{
					  fetchIVFCoupleList('Passive');
				  }
				}
		});
	 }
}

function setCouplePatientDetails(coupleID,femaleId,maleId,callFrom){
	
	if(callFrom == "view"){
		$("#createCouple").hide();
		$("#coupleId").val(coupleID);
	}else{
		$("#createCouple").show();
		$("#queryType").val('update');
		$("#coupleId").val(coupleID);
		$('#createCouple').val('Update Couple');
	}
 	
	$('#tabs a[href="#GenerateCouple"]').tab('show');//to switch generateCouple tags 
 			
 		setTimeout(function() {
 			setFemaleDetails(femaleId);
 			setMaleDetails(maleId);
 			getStateList(femaleId, "female");
 			getStateList(maleId, "male");
 		}, 50);
}


//function for set male details
function setMaleDetails(itemid) {
	
	$("#male_ivf_id").val(itemid);
	var inputs = [];

	//inputs.push('itemid=' + itemid);
	inputs.push('patientId=' + itemid);
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "/EhatEnterprise/ehat/ivf/getPatientDataById",
				url : "ehat/ivf/getIvfPatientInfoByPatientId",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					/*
					

					getStateList(itemid, "male");

					$('#divimg')
							.attr(
									'src',
									'/EhatEnterprise/ehat/ivf/readImage?url='
											+ r.imageName);
					$('#divimg').attr('value', r.imageName);
					var c = $("#p_name").html(r.fName + " " + r.lName);
					var d = $("#dob").html(r.dob);
					$("#mrn").html(r.mrnno);
					$("#w-a-g").html(
							r.patient_weight + "/" + r.age + "/" + r.gender);
					$("#mo").html(r.mobile);
					console.log("reponse", r);
					if (r.tflg == "N") {
						document.getElementById("right-icon").style.display = 'none';
						document.getElementById("warning-icon").style.display = 'block';
					} else {

						document.getElementById("right-icon").style.display = 'block';
						document.getElementById("warning-icon").style.display = 'none';

					}
					$("#m_fname").html(r.fName);
					$("#m_middlename").html(r.mName);
					$("#m_lname").html(r.lName);
					$("#m_mrn").html(r.mrnno);

					$("#dob_for_m_").html(r.dob);
					$("#wag_for_m").html(
							r.patient_weight + "/" + r.age + "/" + r.gender);
					$("#mo_for_m").html(r.mobile);
					$("#email_for_m").html(r.emailId);
					$("#address_for_m").html(r.address);
					var c_id = r.countryId;

					if (c_id == 1) {
						$("#country_for_m").html("India");
					}
					if (c_id == 2) {
						$("#country_for_m").html("Singapore");
					}
					if (c_id == 3) {
						$("#country_for_m").html("Spain");
					}

					if (r.department_id == 1) {
						$("#type_for_m").html("OPD");
					}
					if (r.department_id == 2) {
						$("#type_for_m").html("IPD");
					}
					if (r.department_id == 3) {
						$("#type_for_m").html("Diagnostic");
					}

				*/
					
					
					
					$('#divimg')
					.attr('src',		'ehat/ivf/readImage?url='+ r.lstIvfPatientInfo[0].imageName);
			$('#divimg').attr('value', r.lstIvfPatientInfo[0].imageName);
			var c = $("#p_name").html(r.lstIvfPatientInfo[0].firstname + " " + r.lstIvfPatientInfo[0].lastname);
			var d = $("#dob").html(r.lstIvfPatientInfo[0].dob);
			$("#mrn").html(r.lstIvfPatientInfo[0].mrnNo);
			//$("#w-a-g").html(r.lstIvfPatientInfo[0].patient_weight + "/" + r.lstIvfPatientInfo[0].age + "/" + r.lstIvfPatientInfo[0].gender);
			$("#w-a-g").html(r.lstIvfPatientInfo[0].wag);
			$("#mo").html(r.lstIvfPatientInfo[0].mobile);
			console.log("reponse", r);
			if (r.tflg == "N") {
				document.getElementById("right-icon").style.display = 'none';
				document.getElementById("warning-icon").style.display = 'block';
			} else {

				document.getElementById("right-icon").style.display = 'block';
				document.getElementById("warning-icon").style.display = 'none';

			}
			$("#m_fname").html(r.lstIvfPatientInfo[0].firstname);
			$("#m_middlename").html(r.lstIvfPatientInfo[0].middlename);
			$("#m_lname").html(r.lstIvfPatientInfo[0].lastname);
			$("#m_mrn").html(r.lstIvfPatientInfo[0].mrnNo);

			$("#dob_for_m_").html(r.lstIvfPatientInfo[0].dob);
			//$("#wag_for_m").html(r.lstIvfPatientInfo[0].patient_weight + "/" +r.lstIvfPatientInfo[0].age + "/" +r.lstIvfPatientInfo[0].gender);
			$("#wag_for_m").html(r.lstIvfPatientInfo[0].wag );
			$("#mo_for_m").html(r.lstIvfPatientInfo[0].mobile);
			$("#email_for_m").html(r.lstIvfPatientInfo[0].email);
			$("#address_for_m").html(r.lstIvfPatientInfo[0].address);
			
			
			$('#state_for_m').html(r.lstIvfPatientInfo[0].state);
			$('#district_for_m').html(r.lstIvfPatientInfo[0].district);
			$('#city_for_m').html(r.lstIvfPatientInfo[0].city);
			
			
			//var c_id = r.countryId;
			var c_id=1;

			if (c_id == 1) {
				$("#country_for_m").html("India");
			}
			if (c_id == 2) {
				$("#country_for_m").html("Singapore");
			}
			if (c_id == 3) {
				$("#country_for_m").html("Spain");
			}

			if (r.department_id == 1) {
				$("#type_for_m").html("OPD");
			}
			if (r.department_id == 2) {
				$("#type_for_m").html("IPD");
			}
			if (r.department_id == 3) {
				$("#type_for_m").html("Diagnostic");
			}

		
					
				
				}

			});

}

//function for female details
function setFemaleDetails(itemid) {
	
	$("#female_ivf_id").val(itemid);
    var inputs = [];

    //inputs.push('itemid=' + itemid);
	inputs.push('patientId=' + itemid);
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "/EhatEnterprise/ehat/ivf/getPatientDataById",
				url : "ehat/ivf/getIvfPatientInfoByPatientId",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					/*
					
					$('#femaleImg')
							.attr('src',
									'ehat/ivf/readImage?url='
											+ r.imageName);
					$('#femaleImg').attr('value', r.imageName);
					var c = $("#pf_name").html(r.fName + " " + r.lName);
					var d = $("#fdob").html(r.dob);
					$("#fmrn").html(r.mrnno);
					$("#f-w-a-g").html(
							r.patient_weight + "/" + r.age + "/" + r.gender);
					$("#fmo").html(r.mobile);
					console.log("reponse", r);
					if (r.tflg == "N") {
						document.getElementById("fright-icon").style.display = 'none';
						document.getElementById("fwarning-icon").style.display = 'block';
					} else {

						document.getElementById("fright-icon").style.display = 'block';
						document.getElementById("fwarning-icon").style.display = 'none';

					}

					$("#female_fname").html(r.fName);
					$("#female_mname").html(r.mName);
					$("#female_lname").html(r.lName);
					$("#female_mrn").html(r.mrnno);

					$("#female_dob").html(r.dob);
					$("#female_wag").html(
							r.patient_weight + "/" + r.age + "/" + r.gender);
					$("#female_mo").html(r.mobile);
					$("#female_email").html(r.emailId);
					$("#female_add").html(r.address);
					var c_id = r.countryId;

					if (c_id == 1) {
						$("#female_country").html("India")
					}
					if (c_id == 2) {
						$("#female_country").html("Singapore")
					}
					if (c_id == 3) {
						$("#female_country").html("Spain")
					}

					if (r.department_id == 1) {
						$("#female_type").html("OPD");
					}
					if (r.department_id == 2) {
						$("#female_type").html("IPD");
					}
					if (r.department_id == 3) {
						$("#female_type").html("Diagnostic");
					}

				*/
					
					
					

					console.log(r);
					$('#femaleImg')
							.attr('src','ehat/ivf/readImage?url='+ r.lstIvfPatientInfo[0].imageName);
					$('#femaleImg').attr('value', r.lstIvfPatientInfo[0].imageName);
					var c = $("#pf_name").html(r.lstIvfPatientInfo[0].firstname + " " + r.lstIvfPatientInfo[0].lastname);
					var d = $("#fdob").html(r.lstIvfPatientInfo[0].dob);
					$("#fmrn").html(r.mrnNo);
					$("#f-w-a-g").html(	r.lstIvfPatientInfo[0].wag);
					$("#fmo").html(r.lstIvfPatientInfo[0].mobile);
					
					if (r.tflg == "N") {
						document.getElementById("fright-icon").style.display = 'none';
						document.getElementById("fwarning-icon").style.display = 'block';
					} else {

						document.getElementById("fright-icon").style.display = 'block';
						document.getElementById("fwarning-icon").style.display = 'none';

					}

					$("#female_fname").html(r.lstIvfPatientInfo[0].firstname);
					$("#female_mname").html(r.lstIvfPatientInfo[0].middlename);
					$("#female_lname").html(r.lstIvfPatientInfo[0].lastname);
					$("#female_mrn").html(r.lstIvfPatientInfo[0].mrnNo);

					$("#female_dob").html(r.lstIvfPatientInfo[0].dob);
					$("#female_wag").html(r.lstIvfPatientInfo[0].wag );
					$("#female_mo").html(r.lstIvfPatientInfo[0].mobile);
					$("#female_email").html(r.lstIvfPatientInfo[0].email);
					$("#female_add").html(r.lstIvfPatientInfo[0].address);
					
					
					
					
					$('#female_state').html(r.lstIvfPatientInfo[0].state);
					$('#female_district').html(r.lstIvfPatientInfo[0].district);
					$('#female_city').html(r.lstIvfPatientInfo[0].city);
				//	var c_id = r.countryId;
					var c_id=1;
					if (c_id == 1) {
						$("#female_country").html("India")
					}
					if (c_id == 2) {
						$("#female_country").html("Singapore")
					}
					if (c_id == 3) {
						$("#female_country").html("Spain")
					}

					if (r.department_id == 1) {
						$("#female_type").html("OPD");
					}
					if (r.department_id == 2) {
						$("#female_type").html("IPD");
					}
					if (r.department_id == 3) {
						$("#female_type").html("Diagnostic");
					}

				
				
				
				
				}

			});
}


function showViewBillPopup(femalTreatId,maleTreatId,femaleDeptId,maleDeptId) {
	$("#femaleTreatId").val(femalTreatId);
	$("#maleTreatId").val(maleTreatId);
	
	$("#femaleDeptId").val(femaleDeptId);
	$("#maleDeptId").val(maleDeptId);
	
	$("#ViewBillPopup").show('show');
		
}
function hideViewBillPopup() {
	$("#ViewBillPopup").hide('show');
}

function sendingToViewBill() {
	var coupleType = $('input[name="coupleType"]:checked').val();

	var treatId = "";
	var Dept = "";
	
	if(coupleType == "female"){
		 treatId = $("#femaleTreatId").val();	
		 Dept = $("#femaleDeptId").val();
	}else{
		 treatId = $("#maleTreatId").val();
		 Dept = $("#maleDeptId").val();
	}
	
	
	 window.location.href = "ivf_ehat_billing.jsp?" + "treatmentId=" + treatId;
	
/*	if(Dept=="1"){
		 Dept= "opd";
			 setTimeout(function() {
				   window.location.href = "ivf_ehat_billing.jsp?" + "treatmentId=" + treatId;
				}, 50);
	 }else if(Dept=="2"){
		setTimeout(function() {
			 checkBedAllocationStatus(treatId,'ViewBill');
			}, 10);
	 }*/
}



function showDoctorDeskPopup(femaleTreatId,femaleDoctorId,femaleDeptId,maleTreatId,maleDoctorId,maleDeptId) {
	$("#femaleTreatId").val(femaleTreatId);
	$("#maleTreatId").val(maleTreatId);
	
	$("#femaleDoctorId").val(femaleDoctorId);
	$("#maleDoctorId").val(maleDoctorId);
	
	$("#femaleDeptId").val(femaleDeptId);
	$("#maleDeptId").val(maleDeptId);
	
	$("#ViewDoctorDeskPopup").show('show');
		
}
function hideDoctorDeskPopup() {
	$("#ViewDoctorDeskPopup").hide('show');
}

function showCoupleDoctorDesk() {
	var coupleType = $('input[name="coupleType"]:checked').val();
	
	var treatId = "";
	var DoctorId = "";
	var Dept = "";
	if(coupleType == "femaleDoctorDesk"){
		 treatId = $("#femaleTreatId").val();	
		 DoctorId = $("#femaleDoctorId").val();
		 Dept = $("#femaleDeptId").val();
	}else{
		 treatId = $("#maleTreatId").val();
		 DoctorId = $("#maleDoctorId").val();
		 Dept = $("#maleDeptId").val();
	}
	
	if(Dept=="1"){
		 Dept= "opd";
			 setTimeout(function() {
					window.location.href = "IPD_DoctorStation.jsp?treatmentId=" + treatId +"&doctorId="+DoctorId+"&wardFlag="+Dept;
				}, 50);
	 }else if(Dept=="2"){
		
		 setTimeout(function() {
			 checkBedAllocationStatus(treatId,'viewDoctorStation');
			}, 10);
	 }
}

function setCoupleSearchType(callFrom){
	if(callFrom=="active"){
		
		$("#byNameActive").val("");
		var coupleSearchTypeForActive = $("#coupleSearchTypeForActive").val();
		
		if(coupleSearchTypeForActive == 1){
			
			$("#byNameActive").attr("placeholder", "Type Couple Id Here");
			
		}else if(coupleSearchTypeForActive == 2){
			
			$("#byNameActive").attr("placeholder", "Type Female Name Here");
			
		}else if(coupleSearchTypeForActive == 3){
			
			$("#byNameActive").attr("placeholder", "Type Male Name Here");
		}
	}else{
		$("#byNamePassive").val("");
		var coupleSearchTypeForPassive = $("#coupleSearchTypeForPassive").val();
		
		if(coupleSearchTypeForPassive == 1){
			
			$("#byNamePassive").attr("placeholder", "Type Couple Id Here");
			
		}else if(coupleSearchTypeForPassive == 2){
			
			$("#byNamePassive").attr("placeholder", "Type Female Name Here");
			
		}else if(coupleSearchTypeForPassive == 3){
			
			$("#byNamePassive").attr("placeholder", "Type Male Name Here");
		}
	}
	
}

function setAutoCoupleName(inputID,callFrom) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var coupleSearchType = "";
	if(callFrom=="active"){ 
	   coupleSearchType = $("#coupleSearchTypeForActive").val();
	 }else{
		 coupleSearchType = $("#coupleSearchTypeForPassive").val();
	 }
	 
	if(findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('coupleSearchType=' + coupleSearchType);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/autoSuggestionForCoupleDetails",
		cache : false,		
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.lstCoupleviewDto.length; j++) {
				
				var arrValue = r.lstCoupleviewDto[j].coupleID +"-"+r.lstCoupleviewDto[j].femalePatientName +"-"+r.lstCoupleviewDto[j].malePatientName;
				var idValue = r.lstCoupleviewDto[j].coupleID;
				var coupleName = r.lstCoupleviewDto[j].femalePatientName +"-"+r.lstCoupleviewDto[j].malePatientName;
				resultData.push({
					ID : idValue,
					Name : coupleName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResultCouple,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResultCouple(item) {

		var res = item.text.split('-');
		var coupleId = res[0];
		var coupleName = res[1];
		
		$("#" + inputID).val(coupleName);	
		setSearchedCoupleTemp(coupleId,callFrom);
	}
}


function setSearchedCoupleTemp(coupleId,callFrom) {

	if(callFrom=='active'){
	     $("#IVFcontainer").addClass("loading");
	}else{
		 $("#IVFPassiveContainer").addClass("loading");
	}
	
    var inputs = [];
    inputs.push('coupleId=' + coupleId);  
    inputs.push('callFrom=' + callFrom); 
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/ivf/autoSuggestionForCoupleDetails1",
        cache 	: true,
        success : function(r) {
        	if(callFrom=='active'){
        		setTempOfActiveCoupleList(r);  
        	}else{
				setTempOfPassiveCoupleList(r);
			}
        	          	
        }
    });
}


function checkBedAllocationStatus(TreatmentId,CallFrom){
	var  phyDisFlag = "";
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		"TreatmentId" : TreatmentId,
	 			},
 		url 	: "ehat/ivf/getBedAllocatedStatus",
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		
		success : function(r) {
		//setTimeout(function() {
			if(r == "" || r == 0){
				alert("This Patient is not allocate Bed");
			if(CallFrom == "viewDoctorStation"){
				$("#ViewDoctorDeskPopup").hide('hide');
			}else{
				$("#ViewBillPopup").hide('hide');
			}
				return false;
			}else{
				if(CallFrom == "viewDoctorStation"){
				    setTimeout(function() {
					    window.location.href = "IPD_DoctorStation.jsp?" + "treatmentId=" + TreatmentId + "&phyDisFlag=" + phyDisFlag ;
				  }, 10);
			   }else{
				   setTimeout(function() {
					    window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId=" + TreatmentId + "&finalbillIs=generalBill" + "&phyDisFlag=N" ;
				  }, 10);
				   
			   }
			}
		},
		
	});	
}

function showGenerateBatchPopup(){
	$("#ViewGenerateBatchPopup").show('show');
}

function hideGenerateBatchPopup(){
	$("#ViewGenerateBatchPopup").hide('hide');
}

function SaveCoupleBatchDetails(){
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;
	var temp = today.split("/");
	var today1 = new Date(temp[2], temp[1] - 1, temp[0]);
	
	var pickUpDate = $("#BatchPickUpDate").val();
	var addt = pickUpDate.split("/");
	var BatchPickUpDate = new Date(addt[2],addt[1]-1,addt[0]);
	
	if (today1.getTime() > BatchPickUpDate.getTime()) {
			alert("Date should not be before Couple Generate date!");
			return false;
	}else if(today1.getTime() == BatchPickUpDate.getTime()) {
			alert("Pick Up Date should not be current date!");
			return false;
	}else{
	
	var ivfBatchMasterId = $("#ivfBatchId").val();
		
		var ivfBatchMasterDetails = {
				ltivfBatchMaster : []
			};
		
		ivfBatchMasterDetails.ltivfBatchMaster.push({
			ivfBatchMasterId : ivfBatchMasterId	,
			pickUpDate : pickUpDate
		});
		
		var checkCoupleId = [];

		$.each($("input[name='coupleCheckbox']:checked"), function() {
			checkCoupleId.push($(this).val());

		});

		if (checkCoupleId.length == 0) {
			alert("Please select at least one checkbox for generate Batch");
			$("#ViewGenerateBatchPopup").hide('show');
			return false;
		}
		
		var ivfBatchSlaveDetails = {
				ltivfBatchSlave : []
			};
		
		for ( var i = 0; i < checkCoupleId.length; i++) {
			
			if ($("#hiddenCoupleId" + checkCoupleId[i]) != null
					&& $('#hiddenCoupleId' +  checkCoupleId[i]).val() != "") {
				
				var coupleId = $("#hiddenCoupleId" + checkCoupleId[i]).val();
				
				if ($("#hiddenCoupleId" + checkCoupleId[i]).val() != null
						&& $("#hiddenCoupleId" + checkCoupleId[i]).val() != "") {
					coupleId = $("#hiddenCoupleId" + checkCoupleId[i]).val();
				} else {
					alertify.error("Please select Couple");
					$("#hiddenCoupleId" + checkCoupleId[i]).focus();
					return false;
				}
				
				var ivfCoupleId = $("#hiddenCoupleId" + checkCoupleId[i]).val();

				var malePatientID = $("#malePatientId" + checkCoupleId[i]).val();

				var femalePatientID = $("#femalePatientId" + checkCoupleId[i]).val();

				var maleDeptId = $("#maleDeptId" + checkCoupleId[i]).val();

				var femaleDeptId = $("#femaleDeptId" + checkCoupleId[i]).val();

				var femaleDoctorId = $("#femaleDoctorId" + checkCoupleId[i]).val();
				
				var maleDoctorId = $("#maleDoctorId" + checkCoupleId[i]).val();

				ivfBatchSlaveDetails.ltivfBatchSlave.push({
					maleDeptId : maleDeptId,
					femaleDeptId : femaleDeptId,
					femaleDoctorId : femaleDoctorId,
					maleDoctorId : maleDoctorId,
					malePatientID : malePatientID,
					femalePatientID : femalePatientID,
					ivfCoupleId : ivfCoupleId
				});
			}
			
		} 
		    
		        ivfBatchMasterDetails = JSON.stringify(ivfBatchMasterDetails);
				
				ivfBatchSlaveDetails = JSON.stringify(ivfBatchSlaveDetails);
				
				var ivfBatcInsertType = $("#BatchQueryType").val();
				var inputs = [];
				inputs.push('ivfBatchMasterDetails=' + ivfBatchMasterDetails);
				inputs.push('ivfBatchSlaveDetails=' + ivfBatchSlaveDetails);
				inputs.push('ivfBatcInsertType=' + ivfBatcInsertType);
				var str = inputs.join('&');

				jQuery.ajax({
			        async : false,
			        type : "POST",
			        data : str + "&reqType=AJAX",
			        url : "ehat/ivf/generateBatch",
			        error     : function() {
			            alert('Network Issue!!!');
			          },
			    
					success : function(r) {
						ajaxResponse = r;
						if(ivfBatcInsertType == "insert"){
							alert("IVF Batch generated Successfully!!!");
							$("#ViewGenerateBatchPopup").hide('hide');
							fetchIVFCoupleList('Active');
						}else{
							alert("IVF Batch Details updated Successfully!!!");
							$("#ViewGenerateBatchPopup").hide('hide');
							fetchIVFCoupleList('Active');
						}
					}
				});
	 }
}

function fetchIVFBatchedCoupleList(ivfBatchStatus){
	
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		  "ivfBatchStatus" : ivfBatchStatus,
		 	},
		url 	: "ehat/ivf/getIVFBatchedCoupleList",
		/*timeout : 1000 * 60 * 5,*/
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		
		success : function(r) {
			
			ajaxResponse = r;	
			
			var numberOfBatchRows="";
			var index=1;
			var count=ajaxResponse.countBatch;
			var numberOfBatchPages=(count/10);
			var displayPagination=numberOfBatchPages;
			
			if(numberOfBatchPages>5){
				numberOfBatchRows +="<li class='disabled previous'><a><i class='ti-angle-double-left'></i></a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfBatchRows +="<li onclick='pagination("+index+")'><a>"+index+"</a></li>";
				index=index+1;
			}
			if(numberOfBatchPages>6){
				numberOfBatchRows +="<li class='next' onclick='nextPagination("+index+","+Math.round(numberOfBatchPages)+")'><a><i class='ti-angle-double-right' value='Next'></i></a></li>";
			}
			
			if(ivfBatchStatus == "N"){
				$('#totalNumberOfBatchedPages').html("<li><a>No. Of Pages:"+(Math.round(numberOfBatchPages))+"</a></li>");
				$('#BatchedRecordPagination').html(numberOfBatchRows);
			}else{
				$('#totalNumberOfCancelBatchPages').html("<li><a>No. Of Pages:"+(Math.round(numberOfBatchPages))+"</a></li>");
				$('#CancelBatchRecordPagination').html(numberOfBatchRows);
			}
			
			if(ivfBatchStatus == "N"){
				setTempOfBatchedCoupleList(r);
			}else{
				setTempOfCancelBatchedCoupleList(r);
			}
		},
	});	
}

function setTempOfBatchedCoupleList(r){
	
	var htm="";

	var index = 1;	

	for ( var i = 0; i < r.ltivfBatchMaster.length;i++) {

	htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
	+ "<table class='table table-condensed cf'>"
	+ "<tbody>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+index+"</td>"
	+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.ltivfBatchMaster[i].yearMonth+"-"+r.ltivfBatchMaster[i].ivfBatchMasterId+"</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.ltivfBatchMaster[i].pickUpDate+"</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;' onclick='hideShowBatchDetails("+ r.ltivfBatchMaster[i].ivfBatchMasterId+",\"activeBatch\")'>"
	+ "<img src='images/down.png' id='imgupdown"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' />"
	+ "<input type='hidden' id='hideShowStatus"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' value='0' /><input type='hidden' id='patientDOB' value='"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' /></td>"

	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button id='batchEdit"+r.ltivfBatchMaster[i].ivfBatchMasterId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view' onclick='updateIVFBatch("+ r.ltivfBatchMaster[i].ivfBatchMasterId+")'><i class='fa fa-eye View'></i></button>"	
	+ "</td>"	
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button id='batchCancel"+r.ltivfBatchMaster[i].ivfBatchMasterId+"' class='btn btn-xs btn-danger editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='cancel' onclick='ShowPopUpCancelBatch("+ r.ltivfBatchMaster[i].ivfBatchMasterId+")'><i class='fa fa-times-circle'></i></button>"	
	+ "</td>"
	
htm=htm+ "</tr>"

+ "</tbody></table>"
	+ "<tr id='batchedCoupleDetails"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' style='width:0%;float:right'><td style='display:none' id='td"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"'>"
			+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
				+ "<tbody1>"
					+ "<tr>"
					+ "<th style='height: 21.5px;' class='col-md-2 center'>Batch ID</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Batch No.</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Couple ID</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Female Patient</th>"
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Male Patient</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>View Bill</th>"
					+ "<th style='height: 21.5px;' class='col-md-1 center'>View Doctor Desk</th>"
					+ "</tr>"
				+ "</tbody1>"
			+ "</table>"
		+ "</td></tr>";
index++;
	}

	$("#IVFBatchedCoupleContainer").html(htm);
	$("#IVFBatchedCoupleContainer").removeClass("loading");
}

function setTempOfCancelBatchedCoupleList(r){
	
	var htm="";

	var index = 1;	

	for ( var i = 0; i < r.ltivfBatchMaster.length;i++) {

	htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
	+ "<table class='table table-condensed cf'>"
	+ "<tbody>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+index+"</td>"
	+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.ltivfBatchMaster[i].yearMonth+"-"+r.ltivfBatchMaster[i].ivfBatchMasterId+"</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+r.ltivfBatchMaster[i].pickUpDate+"</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;' onclick='hideShowBatchDetails("+ r.ltivfBatchMaster[i].ivfBatchMasterId+",\"cancelBatch\")'>"
	+ "<img src='images/down.png' id='imgupdown"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' />"
	+ "<input type='hidden' id='CancelBatchHideShowStatus"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' value='0' /><input type='hidden' id='BatchIdView' value='"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' /></td>"

htm=htm+ "</tr>"

+ "</tbody></table>"
	+ "<tr id='cancelledbatchDetails"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"' style='width:0%;float:right'><td style='display:none' id='td"+ r.ltivfBatchMaster[i].ivfBatchMasterId+"'>"
			+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
				+ "<tbody1>"
					+ "<tr>"
					+ "<th style='height: 21.5px;' class='col-md-2 center'>Batch ID</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Batch No.</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Couple ID</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Female Patient</th>"
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Male Patient</th>"
					+ "</tr>"
				+ "</tbody1>"
			+ "</table>"
		+ "</td></tr>";
     index++;
	}

	$("#IVFCancelBatchContainer").html(htm);
	$("#IVFCancelBatchContainer").removeClass("loading");
}


function hideShowBatchDetails(count,callfrom) {

	if(callfrom == "activeBatch"){
 	  var hideShowStatus = $("#hideShowStatus" + count).val();

 	   if (hideShowStatus == 0) {

 		  $("#imgupdown" + count).attr('src', "images/up.png");
 		
 			$("#batchedCoupleDetails" + count).show();
 			$("#hideShowStatus" + count).val(1);
 		
 		 BatchedCoupleDetailsList(count,callfrom);

 	} else {
 		 
 		$("#imgupdown" + count).attr('src', "images/down.png");
 		$("#batchedCoupleDetails" + count).hide();
 		$("#hideShowStatus" + count).val(0);
 		
 	  }
	}else{
		  var hideShowStatus = $("#CancelBatchHideShowStatus" + count).val();

	 	   if (hideShowStatus == 0) {

	 		    $("#imgupdown" + count).attr('src', "images/up.png");
	 			$("#cancelledbatchDetails" + count).show();
	 			$("#CancelBatchHideShowStatus" + count).val(1);
	 		BatchedCoupleDetailsList(count,callfrom);

	 	} else {
	 		 
	 		$("#imgupdown" + count).attr('src', "images/down.png");
	 		$("#cancelledbatchDetails" + count).hide();
	 		$("#CancelBatchHideShowStatus" + count).val(0);
	 		
	 	  }
	}
 }

function  BatchedCoupleDetailsList(batchID,callfrom) {
	 var ajaxr="";
	 var ivfCoupleStatus = "";
	 if(callfrom == "activeBatch"){
		 ivfCoupleStatus = "N";
	 }else{
		 ivfCoupleStatus = "Y";
	 }
	 
	
		jQuery.ajax({
			async 	: false,
			type : "POST",
			
			url  : "ehat/ivf/getBatchedCoupleDetails",
			data : {
	   "batchID" : batchID,
	   "ivfCoupleStatus" : ivfCoupleStatus,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			  if(callfrom == "activeBatch"){
				  setTempForBatchedCoupleList(response);
			  }else{
				  setTempForCancelledBatchList(response);
			  }
			  
		    }
		});
	return ajaxr;
}

function setTempForBatchedCoupleList(r1){
	 var htm="";
	 for ( var j = 0; j < r1.lstBatchviewDto.length;j++) {
		  
		 htm=htm + "<tr id='div"+ r1.lstBatchviewDto[j].batchID+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.lstBatchviewDto[j].batchID+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.lstBatchviewDto[j].batchNo+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.lstBatchviewDto[j].coupleID+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.lstBatchviewDto[j].femalePatientName+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.lstBatchviewDto[j].malePatientName+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-1 center'>"
		 htm=htm + "<button class='btn btn-xs btn-success' title='View Bill' type='button'  value='View Bill' onclick='showViewBillPopup("+ r1.lstBatchviewDto[j].femaleTreatId+","+ r1.lstBatchviewDto[j].maleTreatId +","+ r1.lstBatchviewDto[j].femaleDeptId+","+ r1.lstBatchviewDto[j].maleDeptId +")'><i class='fa fa-eye' class='edit'></button>"
		 htm=htm + "</td>"
		 htm=htm + "<td style='height: 21.5px;' class='col-md-1 center'>"
		 htm=htm + "<button class='btn btn-xs btn-warning' title='View Doctor Desk' type='button'  value='PRINT' onclick='showDoctorDeskPopup("+ r1.lstBatchviewDto[j].femaleTreatId+","+ r1.lstBatchviewDto[j].femaleDoctorId +","+ r1.lstBatchviewDto[j].femaleDeptId+","+ r1.lstBatchviewDto[j].maleTreatId +","+ r1.lstBatchviewDto[j].maleDoctorId+","+ r1.lstBatchviewDto[j].maleDeptId +")'><i class='fa fa-eye' class='edit'></button>"
		 htm=htm + "</td>"
		 htm=htm	+ "<input type='hidden' value='"+ r1.lstBatchviewDto[j].batchID+"' id='rowCount' /></tr>";
		 
		 $("#batchedCoupleDetails" + r1.lstBatchviewDto[j].batchID).html(htm);
		 $("#td" + r1.lstBatchviewDto[j].batchID).show();
		}
 }

function setTempForCancelledBatchList(r1){
	 var htm="";
	 for ( var j = 0; j < r1.lstBatchviewDto.length;j++) {
		  
		 htm=htm + "<tr id='div"+ r1.lstBatchviewDto[j].batchID+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.lstBatchviewDto[j].batchID+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.lstBatchviewDto[j].batchNo+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.lstBatchviewDto[j].coupleID+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.lstBatchviewDto[j].femalePatientName+"</td>";
		 htm=htm + "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.lstBatchviewDto[j].malePatientName+"</td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.lstBatchviewDto[j].batchID+"' id='rowCount' /></tr>";
		 
		 $("#cancelledbatchDetails" + r1.lstBatchviewDto[j].batchID).html(htm);
		 $("#td" + r1.lstBatchviewDto[j].batchID).show();
		}
}

function updateIVFBatch(batchID){
  
	        $("#createBatch").show();
			$("#BatchQueryType").val('update');
			$("#ivfBatchId").val(batchID);
			$('#createBatch').val('Update Batch');
		
		$('#tabs a[href="#GenerateBatch"]').tab('show');//to switch generateBatch tags 
	 			
	 		setTimeout(function() {
	 			fetchIVFCoupleList('Active');
	 			getCheckedCouple(batchID,'activeBatch')
	 		}, 50);
}

function getCheckedCouple(batchID,callfrom){
	
	var ajaxr="";
	 var ivfCoupleStatus = "";
	 ivfCoupleStatus = "N";
		jQuery.ajax({
			async 	: false,
			type : "POST",
			url  : "ehat/ivf/getBatchedCoupleDetails",
			data : {
	             "batchID" : batchID,
	             "ivfCoupleStatus" : ivfCoupleStatus,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
				  getCheckedAndEnableCoupleId(ajaxr);
			}
		});
	return ajaxr;
}

function getCheckedAndEnableCoupleId(r1){
	
setTimeout(function() {
	for ( var j = 0; j < r1.lstBatchviewDto.length;j++) {
		
		   $("#coupleCheckbox"+r1.lstBatchviewDto[j].coupleID).prop("disabled", false);
		   $("#coupleCheckbox"+r1.lstBatchviewDto[j].coupleID).prop("checked", true);
		    
		}
   },3500);

   $("#BatchPickUpDate").val(r1.lstBatchviewDto[0].pickUpDate);
}


function ShowPopUpCancelBatch(batchID){
	
	$("#CancelBatchNarration").show('show');
	
	$("#batchID").val(batchID);
}

function HideBatchCancelNarra() {
	$("#CancelBatchNarration").hide('hide');
}


function CancelIVFBatch(){
	
	var ivfBatchMasterId = $("#batchID").val();
	
	 var BatchCancelNarration = "";
	 BatchCancelNarration = $("#CancelNarration").val();
	if (BatchCancelNarration == "" || BatchCancelNarration == undefined) {
		alert("Please Enter Batch Cancel Narration...");
		$("#CancelBatchNarration").hide('hide');
	 }else{
	
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
			 "ivfBatchMasterId" : ivfBatchMasterId,
			 "BatchCancelNarration" : BatchCancelNarration,
	 			},
			url 	: "ehat/ivf/CancelIVFBatch",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				//alert('error');
			},
			success : function(r) {
				  alert("Batch Cancelled...");
				  $("#CancelBatchNarration").hide('hide');
				  fetchIVFBatchedCoupleList('N');
				}
		});
	 }
}


function setAutoBatchName(inputID,callFrom) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	//alert(findingName);
	var batchSearchType = "";
	if(callFrom=="activeBatch"){ 
		batchSearchType = $("#activeBatchSearch").val();
	 }else{
		 batchSearchType = $("#cancelBatchSearch").val();
	 }
	 
	if(findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('batchSearchType=' + batchSearchType);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/autoSuggestionForBatchDetails",
		cache : false,		
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.ltivfBatchMaster.length; j++) {
				
				var arrValue = r.ltivfBatchMaster[j].ivfBatchMasterId +"-"+r.ltivfBatchMaster[j].pickUpDate;
				var idValue = r.ltivfBatchMaster[j].ivfBatchMasterId;
				var pickUpDate = r.ltivfBatchMaster[j].pickUpDate;
				resultData.push({
					ID : idValue,
					Name : pickUpDate
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResultBatch,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResultBatch(item) {

		var res = item.text.split('-');
		var batchId = res[0];
		var pickUpDate = res[1];
		
		$("#" + inputID).val(pickUpDate);	
		setSearchedBatchTemp(batchId,callFrom);
	}
}


function setSearchedBatchTemp(ivfBatchMasterId,callFrom) {

	if(callFrom=='activeBatch'){
	     $("#IVFBatchedCoupleContainer").addClass("loading");
	}else{
		 $("#IVFCancelBatchContainer").addClass("loading");
	}
	
    var inputs = [];
    inputs.push('ivfBatchMasterId=' + ivfBatchMasterId);  
    inputs.push('callFrom=' + callFrom); 
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/ivf/autoSuggestionForBatchDetails1",
        cache 	: true,
        success : function(r) {
        	if(callFrom=='activeBatch'){
        		setTempOfBatchedCoupleList(r);  
        	}else{
        		setTempOfCancelBatchedCoupleList(r);
			}
        	          	
        }
    });
}


function getIvfQueue(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ivf/viewIVFQueue",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIvfQueuePatientList(r,"All");			
		}
	});
}


function setIvfQueuePatientList(r,callFrom){

	var htm ="";
	var index = 1;
	 if(callFrom === "All"){
				for ( var i = 0; i < r.lstIvfQueue.length; i++) {
			
				htm = htm + '<tr> '
						+ ' <td class="col-md-1 center">'+index+'</td>'
						+ ' <td class="col-md-1 center">'+r.lstIvfQueue[i].patientName+'</td>'
						+ ' <td class="col-md-1 center">'+r.lstIvfQueue[i].gender+'</td>'
						+ ' <td class="col-md-1 center">'+r.lstIvfQueue[i].mobile+'</td>'
						+ ' <td class="col-md-1 center">'+r.lstIvfQueue[i].mrnno+'</td>'	
						+ ' <td class="col-md-1 center">'+r.lstIvfQueue[i].centerPatientId+'</td>'	
						+ ' <td class="col-md-1 center">'+r.lstIvfQueue[i].opdipdno+'</td>'	
						+ ' <td class="col-md-1 center">'
					    + '	<button class="btn btn-xs btn-success" onclick=viewBedWardforIvf('+r.lstIvfQueue[i].treatId+')><i class="fa fa-edit"></i></button></td>'
					    + ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=CancelIVFAdmissionBed('+r.lstIvfQueue[i].treatId+','+r.lstIvfQueue[i].ivfTreatId+','+r.lstIvfQueue[i].pId+')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
					
					index++;
							
						}
	 }else if(callFrom === "ById"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.patientName+'</td>'
			+ ' <td class="col-md-1 center">'+r.gender+'</td>'
			+ ' <td class="col-md-1 center">'+r.mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.centerPatientId+'</td>'	
			+ ' <td class="col-md-1 center">'+r.opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=viewBedWardforIvf('+r.treatId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=CancelIVFAdmissionBed('+r.treatId+','+r.ivfTreatId+','+r.pId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
	 }
			
	$("#ivfBedContainerDetails").html(htm);
}

function setIvfAutoPatientName(inputID,callFrom) {
	var resultData = [];
var searchText = $("#" + inputID).val();
var patSearchType = $("#patSearchType").val();

if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

	alert("Please enter search value");
	$("#" + inputID).focus();
	//getIvfQueue();
	return false;
}

var inputs = [];
inputs.push('searchText=' + searchText);
inputs.push('patSearchType=' + patSearchType);	
inputs.push('callFrom=' + callFrom);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ivf/autoSuggestationIvfQueue",
	cache : false,
	success : function(response) {

		var template = "";
		/*if( response.lstIvfQueue.length == 0){
			alertify.error("Record Not Found.....");
			 $("#" + inputID).val(" ");
			return false;
		}*/
		for ( var j = 0; j < response.lstIvfQueue.length; j++) {
			var arrValue = response.lstIvfQueue[j].treatId +"-"+response.lstIvfQueue[j].patientName;
			var idValue = response.lstIvfQueue[j].treatId;
			var stateName = response.lstIvfQueue[j].patientName;
			resultData.push({
				ID : idValue,
				Name : stateName
			});
			template = template + '<li data-value="' + idValue
					+ '" class=""><a href="#">' + arrValue + '</a></li>';
		}

		setTimeout(function() {
			$("div#documentByName .typeahead").html(template);
			$("div#documentByName .typeahead").show();

			$("input#" + inputID).typeahead({
				source : resultData,
				displayField : 'Name',
				valueField : 'ID',
				onSelect : displayResult,
				scrollBar : true
			});
			$("input#" + inputID).data('typeahead').source = resultData;
		}, 500);
	}
});
function displayResult(item) {

	var res = item.text.split('-');
	var stateId = res[0];
	var stateName = res[1];		
	getIvfQueuePatientByTreatmentId(stateId);
	$("input#" + inputID).val(stateName);
}
}

function getIvfQueuePatientByTreatmentId(treatId){
	var inputs = [];
	inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/getIvfQueuePatientByTreatmentId",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIvfQueuePatientList(r,"ById");			
		}
	});
}

function viewBedWardforIvf(treatId){
	window.location.href = "ivf_Bed_Ward.jsp?treatId=" + treatId;
}

function getIvfPatientDetailsByTreatmentId(r) {
	var deptID=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/ivf/getIvfPatientDetailsByTreatmentId",
		success : function(r) {
			
			// setTempPatientRecords(r);
			//console.log(r);
 			if(r.listIvfTreBillDto[0]!=undefined || r.listIvfTreBillDto[0]!=null){
			 /*****Added By Sagar******/
			var date=new Date(r.listIvfTreBillDto[0].createdDateTime).toLocaleString('en-GB');
			//set hidden date +
			var dd=date.split(',');
  			$("#dtofadmission").text(dd[0]);
  			//set hidden for print +
  			$("#OpdIpdNo").val(r.listIvfTreBillDto[0].trcount);
  			$("#ptName").val(r.listIvfTreBillDto[0].patientName);
  			$("#corporate").text(r.listIvfTreBillDto[0].categoryName);
  			$("#idForDisc").val(r.listIvfTreBillDto[0].chargesMasterSlaveId);
  			$("#isPpn").val(r.listIvfTreBillDto[0].isPpn);
  			$("#numbr").val(r.listIvfTreBillDto[0].numbr);
  			
  			if(r.listIvfTreBillDto[0].isPpn == "Y"){
  				$('#ppn').show();
  				
  				//$("#txtnumber").html(r.listRegTreBillDto[0].numbr);
  				$("#ppnNumber").html(r.listIvfTreBillDto[0].numbr);
  				$('#ppnNumber').show();
  			}
  			
  			
  			$("#DisBillNo").text(r.listIvfTreBillDto[0].invoiceCount);
			
			$("#genInvoiceFlag").val(r.listIvfTreBillDto[0].invoiceFlag);
			$("#DisgenInvoiceFlag").val(r.listIvfTreBillDto[0].invoiceFlag);
			
			var fileName=r.listIvfTreBillDto[0].imageName;	
			$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			   			  
   			//getSponsorRecords(r.listIvfTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
 			
			$("#age").text(r.listIvfTreBillDto[0].age);
			$("#patientName").text(r.listIvfTreBillDto[0].patientName );
			$("#dpatientName").text(r.listIvfTreBillDto[0].patientName );
			$("#centerPatientId").text(r.listIvfTreBillDto[0].centerPatientId);
		    $("#billNo").text(r.listIvfTreBillDto[0].billId);
		    $("#depdocdeskid").val(r.listIvfTreBillDto[0].departmentId);
		    //hidden set 
		    $("#deptid").val(r.listIvfTreBillDto[0].departmentId);
			 
		    dept=r.listIvfTreBillDto[0].departmentId;
		    $("#drid").val(r.listIvfTreBillDto[0].doctorId);
		    $("#pid").val(r.listIvfTreBillDto[0].patientId);
		   
		    //****hidden set for bmi****//
 		   $("#dbirth").val(r.listIvfTreBillDto[0].dob) ;
 		   $("#weight1").val(r.listIvfTreBillDto[0].weight) ;
		   $("#height1").val(r.listIvfTreBillDto[0].height) ;
 
			$("#sex").text(r.listIvfTreBillDto[0].gender);
			deptID =r.listIvfTreBillDto[0].departmentId;
			$("#deptId").val(r.listIvfTreBillDto[0].departmentId);
			$("#pId").val(r.listIvfTreBillDto[0].patientId);
			$("#PiD").val(r.listIvfTreBillDto[0].patientId);			
			$("#bId").val(r.listIvfTreBillDto[0].billId);
			$("#tId").val(r.listIvfTreBillDto[0].treatmentId);
			$("#treatmentId").html(r.listIvfTreBillDto[0].treatmentId);
			$("#sId").val(r.listIvfTreBillDto[0].serviceId);
			//$("#ipdNo").text(r.listRegTreBillDto[0].fName);
			
  			if(r.listIvfTreBillDto[0].sourceTypeId>0){
 				sponsorTypeList(r.listIvfTreBillDto[0].sourceTypeId);
 			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}
  			  $("#ipdNo").text(r.listIvfTreBillDto[0].trcount);
  			$("#ipdNumber").val(r.listIvfTreBillDto[0].trcount);
 			  $("#doa").text(date);
 			  $("#SponsorsourceTypeId").val(r.listIvfTreBillDto[0].sourceTypeId);
			  $("#chargesSlaveId").val(r.listIvfTreBillDto[0].chargesMasterSlaveId);
 			  //hidden field set 
			  $("#pt_Id").val(r.listIvfTreBillDto[0].patientId);
			  $("#bill_Id").val(r.listIvfTreBillDto[0].billId);
			  $("#refDocId").val(r.listIvfTreBillDto[0].refDocId);
			  $("#patientId").text(r.listIvfTreBillDto[0].patientId);			
			  //$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
			  $("#consultingDoctor").text(r.listIvfTreBillDto[0].invoiceCount);
			  
			  $("#prnId").text(r.listIvfTreBillDto[0].patientId);	
			  $("#preBillId").text(r.listIvfTreBillDto[0].invoiceCount);			  
			  
			 var patPrefix=$("#patPrefix").val();
			 var patMiddle=$("#patMiddle").val();
			 var patSufix=$("#patSufix").val();
			 var patIdPrefix=patPrefix+patMiddle+r.listIvfTreBillDto[0].patientId+patSufix;				
	  		 //$("#prnId").text(patIdPrefix);
			 $("#prnId").text(r.listIvfTreBillDto[0].patientId);
			 $("#centerPatientId").text(r.listIvfTreBillDto[0].centerPatientId);
			 $("#centeripdID").text(r.listIvfTreBillDto[0].centerPatientId);
			
			 if(r.listIvfTreBillDto[0].coupleID == null || r.listIvfTreBillDto[0].coupleID == "" || r.listIvfTreBillDto[0].coupleID == undefined || r.listIvfTreBillDto[0].coupleID == "undefined"){
				 $("#coupleId").text(0);
			 }else{
				 $("#coupleId").text(r.listIvfTreBillDto[0].coupleID); 
			 }
			
			 if(r.listIvfTreBillDto[0].batchNo == null || r.listIvfTreBillDto[0].batchNo == "" || r.listIvfTreBillDto[0].batchNo == undefined || r.listIvfTreBillDto[0].batchNo == "undefined"){
				 $("#batchNo").text(0);
			 }else{	
			 
	 			$("#batchNo").text(r.listIvfTreBillDto[0].batchNo);
			 }

			 
			 var billPrefix=$("#billPrefix").val();
		  	 var billMiddle=$("#billMiddle").val();
		  	 var billSufix=$("#billSufix").val();
		  	 var billIdPrefix=billPrefix+billMiddle+r.listIvfTreBillDto[0].invoiceCount+billSufix;
		  	// $("#preBillId").text(billIdPrefix);
		  	$("#refDoctor").text(r.listIvfTreBillDto[0].docNameChan);
		  	$("#tFlag").val(r.listIvfTreBillDto[0].tFlag);

		  	
		  	if(r.listIvfTreBillDto[0].dischargeDate!="-" && r.listIvfTreBillDto[0].dischargeDate!=null && r.listIvfTreBillDto[0].dischargeDate!=""){
		  		var dischargeDate= new Date(r.listIvfTreBillDto[0].dischargeDate).toLocaleString();
			  	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listIvfTreBillDto[0].dischargeTime);
		  	}else{
		  		$("#dod").text("-");
		  	}
		  	$("#physicalDisFlag").val(r.listIvfTreBillDto[0].physicalDisFlag);
		  	 $("#mrn").val(r.listIvfTreBillDto[0].mrnno );	  
 			}
 			
 		}
	});
	return deptID;
}


function fetchWordTypeList() {
	
	var id=1;
	var inputs = [];
	inputs.push('id=' + encodeURIComponent(id));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/wardtypecontroller/fetchwordtypelist",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			setWardType(r);
		}
	});
}
function setWardType(r)
{
	var ajaxResponse = r;
	
	var divContent = "";
	divContent = divContent
			+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstChargesSlave.length; i++) 
	{
		
		/*divContent = divContent + "<option value="+r.lstChargesSlave[i].categoryName+" data-name="+r.lstChargesSlave[i].categoryName+" data-id="+r.lstChargesSlave[i].slaveId+">"
				+ r.lstChargesSlave[i].categoryName + "</option>";*/
		
		divContent=divContent+'<option  value="'+(r.lstChargesSlave[i].slaveId)+'" data-hall_id="'+r.lstChargesSlave[i].slaveId+'" id="'+(r.lstChargesSlave[i].slaveId)+'" data-name="'+r.lstChargesSlave[i].categoryName+'">'+(r.lstChargesSlave[i].categoryName)+'</option>';
	}
	divContent = divContent + "</select>";
	$("#wardTypeHall").html(divContent);	
}


function fetchWordNameList() {
	var hallType=$("#wardTypeHall").val();
	
	var inputs = [];
	inputs.push('hallType=' + hallType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/fetchWordWiseHallList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	    	setWardName(r);
		}
	});
}


function setWardName(r)
{
	var ajaxResponse = r;
	
	
	var divContent = "";
	
	divContent = divContent
			+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstChargesSlave.length; i++) 
	{
		
		/*divContent = divContent + "<option value="+r.lstChargesSlave[i].categoryName+" data-name="+r.lstChargesSlave[i].categoryName+" data-id="+r.lstChargesSlave[i].slaveId+">"
				+ r.lstChargesSlave[i].categoryName + "</option>";*/
		
		divContent=divContent+'<option  value="'+(r.lstChargesSlave[i].slaveId)+'" data-hall_id="'+r.lstChargesSlave[i].slaveId+'" id="'+(r.lstChargesSlave[i].slaveId)+'" data-name="'+r.lstChargesSlave[i].categoryName+'">'+(r.lstChargesSlave[i].categoryName)+'</option>';
	}
	divContent = divContent + "</select>";
	$("#wardName").html(divContent);	
}


function fetchNumberOfBeds(callFrom) {
	var hallId=1;
	if(callFrom === "allBed"){
		hallId=1;
		callFrom = "allBed";
	}else{
	   hallId=$("#wardName").val();
	   callFrom = "HallWise";
	}
	
	var inputs = [];
	inputs.push('hallId=' + hallId);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/fetchHallWiseNumberOfBeds",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			$("#graPicalBedInfo").show();
			createGraphicalView(r);
		}
	});
}

function createGraphicalView(r) {
	
	
	
	var hn=r.hl[0].hn;
	//$("#totalBeds").text(r.hl[0].bn);
	$("#totalBeds").text(r.countTotalBeds);
	$("#AvailableBeds").text(r.countAvailableBeds);
	$("#cleaningBeds").text(r.countCleaningBeds);
	$("#allocatesBeds").text(r.countAllocateBeds);
	
	
	$("#allbeds").html("");
	
	if (r.countTotalBeds > 0) {

		var bedList = "<table class='table'> <tbody class='col-md-12-1' style='margin-top: 0px;'> ";
		var loopCounter = 0;
		// var bedCount = (BedsBean.hl[0].bn);
		var bedCount = r.countTotalBeds;

		var row1 = 0;
		var row2 = 0;
		var row3 = 0;

		if (bedCount > 0 && bedCount <= 10) { // 1 to 10
			row1 = bedCount;

		} else if (bedCount > 10 && bedCount <= 20) {
			row1 = 10;
			row2 = bedCount;

		} else if (bedCount > 20 && bedCount <= 30) {
			row1 = 10;
			row2 = 20;
			row3 = bedCount;

		} else if (bedCount > 30) {
			row1 = (Math.round(bedCount / 3.5) + 1);
			row2 = row1 * 2;
			row3 = row1 * 3;
		}
  
		//$.each(	BedsBean.hl[0].bl,function(name, bl)
			for (var i=0;i<r.hl.length;i++)	{
	
							/*
							 * loopCounter == 0 || loopCounter == 15 ||
							 * loopCounter == 30 || loopCounter == 45
							 */
							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "<tr id='' class=''>";
							}
                   
						for (var j=0;j<r.hl[i].bn;j++)	{
						
							if (r.hl[i].bl[j].bs == '2') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 200px; background-color: orange; border: 1px solid orange;'> "
										+ "<img src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
										/*
										 * + "<img src='images/clean.jpg'
										 * width='100px' height='56px'"
										 */
										+ " onclick='swapImages(this,"
										+ r.hl[i].bl[j].bi
										+ ","
										+r.hl[i]. hall_type
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
										+r.hl[i].bl[j].bdnm + "</label> "
										+ "</div> </td>";

							} else if (r.hl[i].bl[j].bs == '4') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 200px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'> "
										+ "<div style='height: 17px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 33px; width: 148px;'>"
										+ "<img src='images/bedEmpty1.png' width='35px' height='20px'"
										/*
										 * + "<img src='images/bedEmpty.png'
										 * width='60px' height='30px' "
										 */
										+ " onclick='swapImages(this,"
										+ r.hl[i].bl[j].bi
										+ ","
										+ r.hl[i]. hall_type
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
										+ r.hl[i].bl[j].bdnm + "</label></div>"
										+ "</div> </td>";

							} else if (r.hl[i].bl[j].bs  == '3') { // Allocated
								//alert(r.hl[i].bl[j].bdnm);
								var pay="";
								var sourceTypeId=r.hl[i].bl[j].patList[0].sourceTypeId;
								var sponsorName=r.hl[i].bl[j].patList[0].sponsorName;
								if(sourceTypeId==0)
									{
										pay = pay +"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Self Pay</label>";
									}
								else
									{
									pay = pay +"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Sponsor Name:"
										+sponsorName
									+"</label>"
									+"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Sponsor Pay</label>";
									}

								// for Sponsored Patent Type
								var redDot = "";
								
								if (r.hl[i].bl[j].patList[0].objTreatment.specialDiscount != 0) {
									redDot = "<label style='float: right; height: 15px; margin-bottom: 0px;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='border: 2px solid white;'></images></label> ";

									pay = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"
											+r.hl[i].bl[j].patList[0].objTreatment.insuranceCmpny
											+ "</label>";
								}

								// bed allocated to 'patient' or 'relative'
								var bedAllocatedForBedName = "";
								var nameRelative = "";
								var docNameTemp="";
								var docName=r.hl[i].bl[j].patList[0].docName;
								if(docName=="-")
									{
										docNameTemp=docNameTemp
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor Name: "
										+ "--------"
										+ "</label>";
									}
								else{
									var str_array = docName.split(',');
									if(str_array.length==1)
										{
											docNameTemp=docNameTemp
											+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor Name: "
											+ docName
											+ "</label>";
										}
									else{
										var liTemp="";
										for(var j=0;j<str_array.length;j++)
											{
											liTemp=liTemp
											+'<li><a href="#">'+str_array[j]+'</a></li>';
											}
										docNameTemp=docNameTemp
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 21px'>"
										+" <div class='dropdown'>"
									    +" <button class='btn btn-default btn-xs dropdown-toggle' type='button' data-toggle='dropdown'>Show Doctor"
									    +"<span class='caret'></span></button>"
									    +"<ul class='dropdown-menu'>" 
									    +liTemp
									    +"</ul>" 
									    +"</div>"
										+"</label>";
										
									}

								}
							
								// bed allocated to 'patient'
								if (r.hl[i].bl[j].patList[0].objtreatmentbeds.bedAllocatedFor == 'P') {

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 131px; margin-bottom: 0px;'>"
											+ r.hl[i].bl[j].patList[0].prefix
											+ " "
											+ r.hl[i].bl[j].patList[0].fName
											+ " "
											+ r.hl[i].bl[j].patList[0].mName
											+ " "
											+ r.hl[i].bl[j].patList[0].lName
											+ "</label>" + redDot;

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'><img src='images/bedOcc1.png' width='30px' height='25px'"
											+ " onclick='swapImages(this,"
											+ r.hl[i].bl[j].bi
											+ ","
											+ r.hl[i].hall_type
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+r.hl[i].bl[j].bdnm+ "</label></div>";
								} else { // bed allocated to 'relative'

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Relative of: "
										+ r.hl[i].bl[j].patList[0].prefix
										+ " "
										+ r.hl[i].bl[j].patList[0].fName
										+ " "
										+ r.hl[i].bl[j].patList[0].mName
										+ " "
										+ r.hl[i].bl[j].patList[0].lName
											+ "</label>";

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOccRelative.png' width='30px' height='25px' "
											+ " onclick='swapImages(this,"
											+ r.hl[i].bl[j].bi
											+ ","
											+ r.hl[i].hall_type
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+ r.hl[i].bl[j].bdnm + "</label></div>";
								}

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; min-height: 200px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);' id='bbed"
										+  r.hl[i].bl[j].bi
										+ "'> "
										+ nameRelative
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Patient Id: "
										+ r.hl[i].bl[j].patList[0].patientId
										+ "</label> "
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Admited Days: "
										+ r.hl[i].bl[j].patList[0].admitedDays
										+ "</label> "
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>"
										+ r.hl[i].bl[j].patList[0].mrnno
										+ "</label> "
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>"
										+ (((r.hl[i].bl[j].inDateTime).split(" "))[0])
										+ "</label>"
										
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Hall: "
										+ hn
										+ "</label>"
										+docNameTemp
										+ pay
										+ bedAllocatedForBedName + "</div>"
										+ "</td>";
							
							}
			}

							loopCounter++;

							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "</tr>";
							}

						} // end for each function

		bedList = bedList + "</tbody> </table>";
		$("#allbeds").html(bedList);
		//return bedList;

	}
};



function createListView(r) {
	
	$("#totalBeds").text(r.countTotalBeds);
	$("#AvailableBeds").text(r.countAvailableBeds);
	$("#cleaningBeds").text(r.countCleaningBeds);
	$("#allocatesBeds").text(r.countAllocateBeds);
	
	if (r.countTotalBeds > 0) {

		var bedList ="";
		var count = 1;

		/*$
				.each(
						BedsBean.hl[0].bl,
						function(name, bl) */
		//for(var i=0;i<r.countTotalBeds;i++){
		for(var i=0;i<r.hl.length;i++){

		  for(var j=0; j <r.hl[i].bn;j++){				
			bedList = bedList + "<tr>";

							bedList = bedList
									+ "<td class='col-md-1 center' >"
									+ count++ + ".</td>";
							bedList = bedList
									+ "<td class='col-md-1 center' >"
									+r.hl[i].hn + "</td>";
							
					
							bedList = bedList
									+ "<td class='col-md-1 center'>"
									+ r.hl[i].bl[j].bdnm + "</td>";

							if (r.hl[i].bl[j].bs == '2') { // Cleaning

								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<div style='background-color: orange; color: white; padding: 5px 3px;'> Cleaning </div>"
										+ " </td>";
								bedList = bedList
										+ "<td class='col-md-1 center' ></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+r.hl[i].bl[j].bi + "," + r.hall_type
										+ ")' /> " + "</td>";

							} else if (r.hl[i].bl[j].bs == '3') { // Allocated
								
								var pay="";
								var sourceTypeId=r.hl[i].bl[j].patList[0].sourceTypeId;
								var sourceTypeId=0;
								var sponsorName=r.hl[i].bl[j].patList[0].sponsorName;
								if(sourceTypeId==0)
									{
										pay="Self Pay";
									}else
										{
										pay="Sponsor Pay";
										}

								var redDot = "";
								if (r.hl[i].bl[j].patList[0].objTreatment.sdic != '0') {
									redDot = "<label style='background: white; float: right;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='padding: 1px; padding-top: 0px;'></images></label> ";
								}

								// for relative
								var relativeSign = "";
								if (r.hl[i].bl[j].patList[0].objtreatmentbeds.bdalfr != 'P') {
									relativeSign = "<label style='font-weight: bold; float: right;'> R </label>";
								}

								var dischargeDate = " ------";
								if ((r.hl[i].bl[j].patList[0].objTreatment.treEnd) != undefined) {
									dischargeDate = (r.hl[i].bl[j].patList[0].objTreatment.treEnd);
								}

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: rgb(00, 114, 198); color: white; padding: 5px 3px;' id='bbedListView"
										+ r.hl[i].bl[j].bi  + "'> Allocated" + redDot
										+ relativeSign + "</div>" + " </td>";
								bedList = bedList
										+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
										+r.hl[i].bl[j].patList[0].prefix + " " + r.hl[i].bl[j].patList[0].fName + " " + r.hl[i].bl[j].patList[0].mName
										+ " " +r.hl[i].bl[j].patList[0].lName + "</td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ r.hl[i].bl[j].patList[0].mrnno + "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ (r.hl[i].bl[j].patList[0].age) + "/" + (r.hl[i].bl[j].patList[0].gender)
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ (((r.hl[i].bl[j].inDateTime).split(" "))[0])
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ dischargeDate + "</td>";
								
							var insuCmpny = "-";
							if ((r.hl[i].bl[j].patList[0].objTreatment.insuCmpny) != undefined) {
								insuCmpny = r.hl[i].bl[j].patList[0].objTreatment.insuCmpny;
							 }else{
								 insuCmpny = "-";
							 }
							
							    bedList = bedList
							            + "<td class='center col-sm-1-1' style='height: 21.5px;'>"
							            +insuCmpny + "/"
							            + pay
							            + "</td>";
							
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ r.hl[i].bl[j].bi + "," + r.hl[i].hall_type
										+ ")' /> " + "</td>";

							} else if (r.hl[i].bl[j].bs == '4') { // Available

								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<div style='background-color: rgb(34, 177, 77); color: white; padding: 5px 3px;'> Available </div>"
										+ " </td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ r.hl[i].bl[j].bi + "," + r.hl[i].hall_type
										+ ")' /> " + "</td>";
							}

							bedList = bedList + "</tr>";
		              }

						} // end for each function

		bedList = bedList + "</tbody>" + "</table>" ;
		$("#allbedsListViewTemp").html(bedList);
		//return bedList;
	}
};

function createGrapicalListView(){
	
	var callFrom = "HallWise";
	var viewinfo=$("#viewInfo").val();
	
	var hallId=$("#wardName").val();
	
	
	if(hallId ==0){
		alertify.error("Please Select Ward First..");
		return false;
	}
	
	var inputs = [];
	inputs.push('hallId=' + hallId);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/fetchHallWiseNumberOfBeds",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			if(viewinfo == 1){
				
				$("#graPicalBedInfo").show();
				$("#listBedInfo").hide();
				createGraphicalView(r)
			}else if(viewinfo==2){
				$("#graPicalBedInfo").hide();
				$("#listBedInfo").show();
				createListView(r);
			}
			
			
			
			
		}
	});

}


function  swapImages(picObject, bedID, ht) {
	$("#ivfBedAllocationPopUp").show();
	$("#bedId").val(bedID);
	$("#hallType").val(ht);
	
}

function closebedIvfAllocationPopUp(){
	$("#ivfBedAllocationPopUp").hide();
	$("#bedId").val(0);
	$("#hallType").val(0);
}

function allocateBedToIvfPatient(){
	var BedAllocStatus = $("#ivfBedAllocStatus").val();
	var DallocBedId = $("#ivfDallocBedId").val();
	var billableBedType=0;
	var patientType="";
	var isolation = 0;
	var pt_Id = $("#pt_Id").val();
	var bedId=$("#bedId").val();
	var userId=$("#userId").val();
	
	var unitId=$("#unitId").val();
	var treatmentId=$("#treatmentId").text();
	
	var coupleId=$("#coupleId").text();
	var batchNo=$("#batchNo").text();
	
	
	var inputs = [];
	inputs.push('ID=' + 0);
	inputs.push('Treatment_ID=' + treatmentId);
	inputs.push('Bed_ID=' + bedId);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('isolation=' + isolation);
	inputs.push('BedAllocStatus=' + BedAllocStatus);
	inputs.push('DallocBedId=' + DallocBedId);
	inputs.push('billableBedType=' + billableBedType);
	inputs.push('patientType=' + patientType);
	inputs.push('coupleId=' + coupleId);
	inputs.push('batchNo=' + batchNo);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/allocateBedToIvfPatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			var ajaxResponse = r;
			
            if (ajaxResponse == "Bed Allocated Successfully."
				|| ajaxResponse == "Bed Shifted Successfully.") {
 
            	if (ajaxResponse == "Bed Allocated Successfully.") {

				window.location.href = "ivf_ehat_billing.jsp?" + "treatmentId=" + treatmentId; 

			}

		} else if (ajaxResponse == "This Bed Is Already Allocated For Patient."
				|| ajaxResponse == "This Bed Is Already Allocated This Patient.") {

			setTimeout(function() {
				//showHallofType(ht);
			}, 500);

		}
		}
	});

}

function getIVFBillable(){
	var treatmentId = $("#treatmentId").html();

	var inputs = [];
	inputs.push('Treatment_ID=' + treatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/getIVFBillable",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   		//alert(r);
	   		
	   		var ajaxResponse = r;
			//var bedDetails = eval('(' + ajaxResponse + ')');

			$("#wardTypeHall").val(ajaxResponse.list[0].hallType);
			setIVFHallTypeSelectID(ajaxResponse.list[0].hallType);

			$("#wardName").val(ajaxResponse.list[0].bed_type);
			setHallBedsUI(ajaxResponse.list[0].bed_type);
			//getHallAndBed(bedDetails.tbList[0].bty);
			/*if (bedDetails.tbList[0].bbt == 0
					|| bedDetails.tbList[0].bhn == 0) {
				$("#billableDiv").hide();
			} else {
				$("#wardTypeBillable").val(bedDetails.tbList[0].bhn);
				setHallTypeSelectIDBillable(bedDetails.tbList[0].bhn);
				$("#hallTypeSelectIDBillable").val(
						bedDetails.tbList[0].bbt);
				// setHallBedsUI(bedDetails.tbList[0].bbt);
			}*/
		}
	});

}
	
function setIVFHallTypeSelectID(wardID) {
	// alert(wardID);
	var ajaxResponse = $("#allIVFBedObj").val();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].ht == wardID)
			hallTypeString = hallTypeString + "<option id='' value='"
					+ myArray.hl[i].hi + "'>" + myArray.hl[i].hn + "</option>";
	}

	var sample;
	$("#hallTypeSelectID").setTemplate(hallTypeString);
	$("#hallTypeSelectID").processTemplate(sample);

	try {
		$("#selectPackageID").setTemplate(packTemp);
		$("#selectPackageID").processTemplate(sample);
	} catch (e) {
	}

};


function setHallBedsUI(hallID) {

	var inputs = [];
	inputs.push('hallID=' + hallID);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/getIVFHallDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
				success : function(r) {
					var ajaxResponse = r;
					$("#allIVFBedObj").val(ajaxResponse);
					var BedsBean = eval('(' + ajaxResponse + ')');

					if (BedsBean.hl.length > 0) {
						// logic to calculate Beds for Cleaning
						var bclean = 0;
						var bedsAvail = 0;

						var allBedsSummaryVar = "<div class='col-md-12-1' style='font-size: 11px; text-decoration: blink; color: red; padding-top: 5px;'>"
								+ "<div style='float: right;' id='bclean"
								+ BedsBean.hl[0].hi
								+ "'></div>"
								+ "<div style='float: right; margin-right: 2%;' id='ba"
								+ BedsBean.hl[0].hi
								+ "'></div>"
								+ "<div style='float: right;'>Total Beds: "
								+ BedsBean.hl[0].bn
								+ "&nbsp;&nbsp;&nbsp; Available Beds:&nbsp;</div>"
								+ "</div>";

						if (undefined === (BedsBean.hl[0].bl)) {
							alert("No Beds in this Hall...");
							$("#allBedsSummary").html(allBedsSummaryVar);
							$("#bclean" + BedsBean.hl[0].hi).html(
									"&nbsp;Bed Cleaning:&nbsp;" + bclean);
							$("#ba" + BedsBean.hl[0].hi).html(bedsAvail);
							$("#allbeds").html("");
							$("#allbedsListViewTemp").html("");
							return false;
						}

						$.each(BedsBean.hl[0].bl, function(name, bl) {
							if (bl.ba == '2') {
								bclean++;
							} else if (bl.ba == '4') {
								bedsAvail++;
							}
						});

						$("#allBedsSummary").html(allBedsSummaryVar);
						$("#bclean" + BedsBean.hl[0].hi).html(
								"&nbsp;Bed Cleaning:&nbsp;" + bclean);
						$("#ba" + BedsBean.hl[0].hi).html(bedsAvail);

						/* Creating and setting Graphical View */
						var bedListGraphView = createGraphicalView(BedsBean);
						$("#allbeds").html(bedListGraphView);

						/* Creating and setting List View */
						var bedList_ListView = createListView(BedsBean);
						$("#allbedsListViewTemp").html(bedList_ListView);

						// to highlight the current patient
						setCommonPatInfoforbed();
					}
				}// end success[Ajax]

			}); // end Ajax
};


function CancelIVFAdmissionBed(treatId,ivfTreatId,pId) {

	$("#cancelIVFAdmissionPopUp").modal('show');
	$("#trid").val(treatId);
	$("#pid").val(pId);
	$("#ivfTreatId").val(ivfTreatId);

}


function cancelAdmissionOfIVFpatient() {

	var patientId = $("#pid").val();
	var treatmentId = $("#trid").val();
	var ivfTreatId = $("#ivfTreatId").val();
	var narration = $("#narrationid").val();
	var inputs = [];

	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('ivfTreatId=' + ivfTreatId);
	inputs.push('narration=' + narration);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivf/cancelAdmissionOfIvfPatient",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			alert(r);
			$("#cancelIVFAdmissionPopUp").hide();
			window.location.reload(true);
		}
	});

}



function changeStatus(id, coupleID, status){
	//alert("id..."+id +"   "+coupleID);
	
	
	var coupleFlag=status;
	
	//alert("coupleFlag.."+coupleFlag);

	 var narration = ""; 
	
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
			 "coupleID" : coupleID,
			 "coupleFlag" : coupleFlag,
			 "narration" : narration,
	 			},
			url 	: "ehat/ivf/changeStatusOfIvfCouple",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				//alert('error');
			},
			success : function(r) {
				if(r==1){
				  alert("Couple Status Change Successfully..");
				}else{
					alert("Network Issue");
				}

				 fetchIVFCoupleList('Active');
				  
				
				}
		});
	 
	
	
}


function openIvfDoctorDesk(treatmentId,ivfTreatId,patientId){
	
	var preflag="IvfTreatment";
	//window.location.href = "IVF_DoctorStation.jsp?" + "treatmentId=" + TreatmentId  + "&IVF_TreatmentId=" + ivfTreatId +"&preflag="+ preflag ;
	window.location.href = "ivf_doctor_station.jsp?" + "tid=" + treatmentId  + "&IVF_TreatmentId=" + ivfTreatId +"&callfrom="+ "IVF"+"&pid="+ patientId ;
	
}

//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}
