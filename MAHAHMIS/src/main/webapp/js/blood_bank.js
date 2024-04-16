function saveDonor(){
	//alert("HEllo");
	//var donorType=$("input:radio[name=donor_menu]:checked").val();
	var donorType = $("#text_search_name").val();
	if(donorType==""){
		//if(donorType==""||donorType==undefined ||donorType==null){
		//alert("select donor_type");
		//return false;
		saveNewBloodDoner();
	}else{	
		saveExistingBloodDonor();
	}
}
function saveNewBloodDoner(){
	var title = $('#title').val();
	var title_txt = $('#title option:selected').text();//patienttitle fetched in text
	$('#title').attr('disabled', false);
	var letters = /^[A-Za-z]+$/;
	var txt_first_name = $('#txt_first_name').val();
	var donorId = $('#donorId').val();
	if(txt_first_name==""){
		
		alert("Please enter first name");
		return false;
	}
	
	var txt_middle_name = $('#txt_middle_name').val();
	
	if(txt_middle_name==""){
		//alert("Please enter middle name");
		//return false;
	}
	
	var txt_last_name = $('#txt_last_name').val();

	if(txt_last_name==""){
		alert("Please enter last name");
		return false;
	}

	var txt_birth_date = $('#txt_birth_date').val();
	if(txt_birth_date==""){
		alert("Please enter birth date");
		return false;
	}

	var ta_address = $('#ta_address').val();
	if(ta_address==""){
		alert("Please enter address");
		return false;
	}

	var txt_occupation = $('#txt_occupation').val();
	var txt_contact1 = $('#txt_contact1').val();
	if(txt_contact1==""){
		alert("Please enter contact no");
		return false;
	}
	
	var txt_contact2 = $('#txt_contact2').val();
	var txt_age = $('#txt_age').val();
	if(txt_age==""){
		alert("Please enter age");
		return false;
	}

	var txt_blood_group = $('#txt_blood_group').val();
	if(txt_blood_group==""){
		txt_blood_group=0;
	}

	
	var ra_gender=$("input:radio[name=ra_gender]:checked").val();
	if(ra_gender==""|| ra_gender==undefined){
		alert("Please select gender");
		return false;
	}

	var inputs = [];	
	inputs.push('donorId=' + donorId);
	inputs.push('title=' + title);
	inputs.push('donorFname=' + txt_first_name);
	inputs.push('donorMname=' + txt_middle_name);
	inputs.push('donorLname=' + txt_last_name);
	inputs.push('birthDate=' + txt_birth_date);
	inputs.push('address=' + ta_address);
	inputs.push('contactNumber1=' + txt_contact1);
	inputs.push('contactNumber2=' + txt_contact2);
	inputs.push('occupation=' + txt_occupation);
	inputs.push('age=' + txt_age);
	inputs.push('gender=' + ra_gender);
	inputs.push('remark=' + txt_birth_date);
	inputs.push('bloodGroup=' + txt_blood_group);
	inputs.push('patient_title_name=' + title_txt);
	inputs.push('treatmentFlag=' + 'N');
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveDonor",
		data : str + "&reqType=AJAX",
		async : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
		
			if (data == 1) {
				alert("Donor Saved Sucessfully");
				getBloodDonorDetailsList();
			//	ReloadPage();
				clearDonorForm();
				//location.reload(true);
			
				
			}
			else if (data == 2) {
				alert( "Donor Updated Sucessfully");		
				getBloodDonorDetailsList();
				clearDonorForm();
				//location.reload(true);
			}
			
		}
		
	});	
}
function ReloadPage1(){
	location.reload(true);
}

function clearDonorForm(){
	$('#title').select2('val',0);	
	$('#txt_first_name').val("");	
	$('#txt_middle_name').val("");
	$('#txt_last_name').val("");	
	$('#txt_birth_date').val("");	;
	$('#ta_address').val("");	
	$('#txt_occupation').val("");	
	$('#txt_contact1').val("");	
	$('#txt_contact2').val("");	
	$('#txt_age').val("");
	$('#txt_blood_group').val("");	
	$("input:radio[name=ra_gender]:checked").val('');
	$("input:radio[name=ra_donor_type]:checked").val('');
	 $("input:radio[name=ra_patient_type]:checked").val('');
	 $("input:radio[name=ra_collection]:checked").val('');
	 $('#remarks_ta').val("");	
	 
			
}


function searchDonorByName(value,callfrom){
	var resultData = [];
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/searchDonorByName",
		data :{
			searchName : value ,
			callfrom : callfrom
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.length; j++) {
				var donorName=r[j].donorFname+" "+r[j].donorLname;
				var arrValue = r[j].donorId +"-"+donorName+"-"+r[j].contactNumber1;
				var donorId = r[j].donorId;
				var donorFname = r[j].donorFname;
				resultData.push({
					ID : donorId,
					Name : arrValue
				});
				template = template + '<li data-value="' + donorId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_name .typeahead").html(template);
				$("#divtext_search_name .typeahead").show();
				
				$("#text_search_name").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
			
				
				$("#text_search_name").data('typeahead').source = resultData;
			
				
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
		$("#text_search_name").val(name);	
		getDonorById(id,callfrom);
		
	}
}

function searchExistDonorByName(value,callfrom){
var resultData = [];
jQuery.ajax({
	async : true,
	type : "POST",
	url : "ehat/donor/searchDonorByName",
	data :{
		searchName : value ,
		callfrom : callfrom
	},
	error : function() {
		alertify.error('Network Issue');
	},
	success : function(r) {
		var template = "";
		for ( var j = 0; j < r.length; j++) {
			var donorName=r[j].donorFname+" "+r[j].donorLname;
			var arrValue = r[j].donorId +"-"+donorName+"-"+r[j].contactNumber1;
			var donorId = r[j].donorId;
			var donorFname = r[j].donorFname;
			resultData.push({
				ID : donorId,
				Name : arrValue
			});
			template = template + '<li data-value="' + donorId + '" class=""><a href="#">' + arrValue + '</a></li>';
		}
		
		setTimeout(function() {
			$("#divtext_search_name .typeahead").html(template);
			$("#divtext_search_name .typeahead").show();
			
		
			$("#text_search_name_treatment").typeahead({
				source : resultData,
				displayField : 'Name',
				valueField : 'ID',
				onSelect : displayResult,
				scrollBar : true
			});	
			
			$("#text_search_name_treatment").data('typeahead').source = resultData;
			
		}, 500);
	}
});
function displayResult(item) {
	var res = item.text.split('-');
	var id = res[0];

	var name = res[1];
	$("#text_search_name_treatment").val(name);	
	//getDonorById(id,callfrom);
	getBloodDonorTreatmentDetailsById(id,'callform');
}

}
function getDonorById(id,callfrom){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDonorById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			//toggleExistingRegDiv();
			
			if(r!=null){
				
					var htm="";
					var index=1;

					var datetime= new Date(r.createdDate).toLocaleDateString('en-GB');
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.donorId
					+ '</td>'
					/*+ ' <td class="col-md-1 center">'
					+ r[i].organDonationRegistrationDto.id
					+ '</td>'*/
					+ ' <td class="col-md-1 center">'
					+ r[i].patient_title_name+" "+ r.donorFname +" "+ r.donorMname +" "+ r.donorLname 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+  datetime
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodDonor('
					+ r.donorId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodDonor('
					+ r.donorId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					htm = htm
					+ '</tr>';
					
				
					$("#BloodDonorsListDetails").html(htm);
				
				
				
			
			/*	if(callfrom=='reg'){
					$('#donorId').val(r.donorId);
					$('#title').val(r.title);
					$('#title').attr('disabled', 'disabled');
					$('#txt_first_name').val(r.donorFname);
					$('#txt_first_name').attr('disabled', 'disabled');
					$('#txt_middle_name').val(r.donorMname);
					$('#txt_middle_name').attr('disabled', 'disabled');
					$('#txt_last_name').val(r.donorLname);
					$('#txt_last_name').attr('disabled', 'disabled');
					$('#txt_birth_date').val(r.birthDate);
					$('#txt_birth_date').attr('disabled', 'disabled');
					$('#ta_address').val(r.address);
					$('#ta_address').attr('disabled', 'disabled');
					$('#txt_occupation').val(r.occupation);
					$('#txt_occupation').attr('disabled', 'disabled');
					$('#txt_contact1').val(r.contactNumber1);
					$('#txt_contact1').attr('disabled', 'disabled');
					$('#txt_contact2').val(r.contactNumber2);
					$('#txt_contact2').attr('disabled', 'disabled');
					$('#txt_age').val(r.age);
					$('#txt_age').attr('disabled', 'disabled');
					$('#txt_blood_group').val(r.bloodGroup);
					$('#txt_blood_group').attr('disabled', 'disabled');
					$("input:radio[name='ra_gender'][value='"+r.gender+"']").prop("checked",true);			
					$("input:radio[name='ra_gender']").attr('disabled', 'disabled');
					
					$('#user_title').val(r.title);
					$('#user_title').attr('disabled', 'disabled');
					$('#donor_first_name').val(r.donorFname);
					$('#donor_first_name').attr('disabled', 'disabled');
					$('#donor_middle_name').val(r.donorMname);
					$('#donor_middle_name').attr('disabled', 'disabled');
					$('#donor_last_name').val(r.donorLname);
					$('#donor_last_name').attr('disabled', 'disabled');
					$('#blood_user_title').val(r.title);
					$('#blood_user_title').attr('disabled', 'disabled');
					$('#blood_first_name').val(r.donorFname);
					$('#blood_first_name').attr('disabled', 'disabled');
					$('#blood_middle_name').val(r.donorMname);
					$('#blood_middle_name').attr('disabled', 'disabled');
					$('#blood_last_name').val(r.donorLname);
					$('#blood_last_name').attr('disabled', 'disabled');
					$('#donorTreatmentId').val(r.maxDonorTreatmentId);

				}else if(callfrom=='reaction'){
					$('#donorId').val(r.donorId);
					$('#title').val(r.title);
					$('#title').attr('disabled', 'disabled');
					$('#txt_first_name').val(r.donorFname);
					$('#txt_first_name').attr('disabled', 'disabled');
					$('#txt_middle_name').val(r.donorMname);
					$('#txt_middle_name').attr('disabled', 'disabled');
					$('#txt_last_name').val(r.donorLname);
					$('#txt_last_name').attr('disabled', 'disabled');
					$('#donorTreatmentId').val(r.maxDonorTreatmentId);
					getCheckUpListByTreatmentId('reaction');
					getbagDetailsByTreatmentId(r.maxDonorTreatmentId);
				}*/

			}
	
		}
	});
}


/*function saveExistingBloodDonor(){
	var donorId=$('#donorId').val();
	var donorTreatmentId = $('#donorTreatmentId').val();
	//var ra_donor_type=$("input:radio[name=ra_donor_type]:checked").val();
	var donorTypeDiv=$('#donorTypeDiv').val();
	//if( donorTypeDiv==undefined ||donorTypeDiv==null || donorTypeDiv==""){
	if( donorTypeDiv==""){
		donorTypeDiv="NA";
		//alert("please select donor_type");
		//return false
	}
	
	var ra_patient_type=$("input:radio[name=ra_patient_type]:checked").val();
	if(ra_patient_type==""){
		alert("Select patient type");
		return false;
	}
	
	var ra_collection=$("input:radio[name=ra_collection]:checked").val();
	if(ra_collection==""){
		alert("Select collection type");
		return false;
	}

	var sel_bloodBagId=$('#sel_bloodBagId').val();
	if(sel_bloodBagId==""){
		sel_bloodBagId=0;
	}
	if(sel_bloodBagId==0){
		alert("Select blood bag details");
		return false;
	}

	var ra_outdoor_details=$('#ra_outdoor_details').val();
	var remarks_ta=$('#remarks_ta').val();
	
	var inputs = [];	
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('donorType=' + ra_donor_type);
	inputs.push('patient_type=' + ra_patient_type);
	inputs.push('collection=' + ra_collection);
	inputs.push('outdoorDetails=' + ra_outdoor_details);
	inputs.push('bloodBagetails=' + sel_bloodBagId);
	inputs.push('remark=' + remarks_ta);
	inputs.push('donorId=' + donorId);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveDonorTreatment",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Donor Treatment Exits');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Donor treatment Saved Sucessfully");
				clearDonorForm();
				clearExitingDonorForm();
				getBloodDonorDetailsList();
			}
			else if (data == 2) {
				alertify.success( "Donor treatment Updated Sucessfully");	
				getBloodDonorDetailsList();
			}
			location.reload(true);
		}
	});	
}
*/
function saveExistingBloodDonor(){
	var donorId=$('#donorId').val();
	var donorTreatmentId = $('#donorTreatmentId').val();
	var ra_donor_type=$("input:radio[name=ra_donor_type]:checked").val();
	if(ra_donor_type==""){
		ra_donor_type="NA";
	}
	
	var ra_patient_type=$("input:radio[name=ra_patient_type]:checked").val();
	if(ra_patient_type==""){
		alert("Select patient type");
		return false;
	}
	
	var ra_collection=$("input:radio[name=ra_collection]:checked").val();
	if(ra_collection==""){
		alert("Select collection type");
		return false;
	}

	var sel_bloodBagId=$('#sel_bloodBagId').val();
	if(sel_bloodBagId==""){
		sel_bloodBagId=0;
	}
	/*if(sel_bloodBagId==0){
		alert("Select blood bag details");
		return false;
	}*/

	var ra_outdoor_details=$('#ra_outdoor_details').val();
	var remarks_ta=$('#remarks_ta').val();
	
	var inputs = [];	
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('donorType=' + ra_donor_type);
	inputs.push('patient_type=' + ra_patient_type);
	inputs.push('collection=' + ra_collection);
	inputs.push('outdoorDetails=' + ra_outdoor_details);
	inputs.push('bloodBagetails=' + sel_bloodBagId);
	inputs.push('remark=' + remarks_ta);
	inputs.push('donorId=' + donorId);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveDonorTreatment",
		data : str + "&reqType=AJAX",
		async : false,
		
		error : function() {
			alertify.error('Donor Treatment Exits');
		},
		success : function(data) {
		//	alert("hiii");
			if (data == 1) {
				alertify.success("Donor treatment Saved Sucessfully");
				//clearDonorForm();
				getBloodDonorDetailsList();
				clearExitingDonorForm();
				window.location.reload(true);
			}
			else if (data == 2) {
				//alert("hiii");
				alertify.success( "Donor treatment Updated Sucessfully");	
				getBloodDonorDetailsList();
				clearExitingDonorForm();
				window.location.reload(true);
			}
		//	location.reload(true);
		}
	});	
}
function clearExitingDonorForm(){
	
	$("input:radio[name=ra_gender]:checked").val();
	$("input:radio[name=ra_donor_type]:checked").val();
	$("input:radio[name=ra_patient_type]:checked").val();
	$("input:radio[name=ra_collection]:checked").val();
	$("#sel_bloodBagId").val();
	$("#remarks_ta").val();
}

function getCheckUpListByTreatmentId(callfrom){
	//alert("Hello");
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		return false;
	}
	jQuery.ajax({
		//async : true,
		type : "POST",
		url : "ehat/donor/getCheckUpByTreatmentId",
		data : {
			id : donorTreatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Duplicate data can not be saved');
		},
		success : function(r) {
			if(r!=null){
			
				if(callfrom=='testregister'){
					document.getElementById('la_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('la_height').innerText=r.donorHeight+" Cm";
					document.getElementById('la_haemoglobin').innerText=r.donorHemoglobin;
					document.getElementById('la_temprature').innerText=r.donorTemprature;
				}else{
					document.getElementById('la_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('la_height').innerText=r.donorHeight+" Cm";
					document.getElementById('la_haemoglobin').innerText=r.donorHemoglobin;
					document.getElementById('la_temprature').innerText=r.donorTemprature;
				}
			}
		}
	});
}


function saveDonorReaction(){
	
	var ra_pain=$("input:radio[name=ra_pain]:checked").val();
	if(ra_pain==""){
		alert("Select pain");
		return false;
	}
	
	
	var ra_allergy_reaction=$("input:radio[name=ra_allergy_reaction]:checked").val();
	if(ra_allergy_reaction==""){
		alert("Select allergy reaction");
		return false;
	}

	
	var ra_outcome=$("input:radio[name=ra_outcome]:checked").val();
	if(ra_outcome==""){
		alert("Select outcome");
		return false;
	}
	var pain_details = $("#pain_details").val();
	var allergy_reaction_details = $("#allergy_reaction_details").val();
	var outcome_details = $("#outcome_details").val();
	var ta_remarks=$("#ta_remarks").val();
	var sel_type_of_blood_bag=$("#sel_bloodBagNumber").val();
	
	if(sel_type_of_blood_bag==""||sel_type_of_blood_bag==null||sel_type_of_blood_bag==undefined){
		alert("Select Bag");
		return false;
	}
	var donorTreatmentId=$("#donorTreatmentId").val();
	var donorReactionId = $("#donorReactionId").val();
	var inputs = [];	
	inputs.push('donorReactionId= ' + donorReactionId);
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('sel_type_of_blood_bag=' + sel_type_of_blood_bag);
	inputs.push('remark=' + ta_remarks);
	inputs.push('outcome=' + ra_outcome);
	inputs.push('pain=' + ra_pain);
	inputs.push('allergyReaction=' + ra_allergy_reaction);
	inputs.push('painDetails=' + pain_details);
	inputs.push('allergyReactionDetails=' + allergy_reaction_details);
	inputs.push('outcomeDetails=' + outcome_details);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveDonorReaction",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Donor Reaction Saved Sucessfully");
				getAllDonorReaction();
				window.location.reload(true);
				cleardonorreaction();
				
			}
			else if (data == 2) {
				alertify.success( "Donor Reaction Updated Sucessfully");
				getAllDonorReaction();
				window.location.reload(true);
				cleardonorreaction();
				
			}else if(data == 3){
				alertify.success( "Duplicate data can not be saved");
				getAllDonorReaction();
				window.location.reload(true);
				cleardonorreaction();
			}
			//location.reload(true);
		}
		
	});	
}
function cleardonorreaction(){
	
	$("#title").select2('val',0);
	$("#txt_first_name").val('');
	$("#txt_middle_name").val('');
	$("#txt_last_name").val('');
	$("#sel_bloodBagNumber").val(0);
 $("#pain_details").val('');
 $("#allergy_reaction_details").val('');
 $("#outcome_details").val('');
 $("#ta_remarks").val('');
 $("#la_typebloodBag").val('');
 $("#la_bloodBagNo").val('');
 $("#la_bloodGroup").val('');
 $("#la_bloodItemNo").val('');
 $("#la_volumeCollection").val('');
 $("#la_dateCollection").val('');
 $("#la_dateCollection").val('');
 $("#la_weight").val('');
 $("#la_height").val('');
 $("#la_haemoglobin").val('');
 $("#la_temprature").val('');

	
}

function getBloodBagIdBySectionId(callfrom){
	if(callfrom=='testregister'){
		var sel_component_seperation=$("#sel_component_seperation").val();
		//alert("--sel_component_seperation---"+sel_component_seperation)
	}else{
		var sel_component_seperation=0;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getBloodBagIdBySectionId",
		data : {
			id : sel_component_seperation
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r.length > 0){
				var divContent = "";
		        divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
		         for ( var i = 0; i < r.length; i++) {          
		        	 divContent = divContent + "<option value='"+r[i].sampleBloodBagId+"'>"+ r[i].sampleBloodBagNumber + "</option>";
		            }
		        divContent = divContent + "</select>";
		            $("#sel_bloodBagNumber").html(divContent);
		          
			}
			
		}
		
	});
}

function getDetailsByBloodBag(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDetailsByBloodBag",
		data : {
			bloodBagId : value
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
				if(r!=0){
					document.getElementById('la_typebloodBag').innerText=" "+r.typeOfBloodBag;
					document.getElementById('la_bloodBagNo').innerText=" "+r.bloodBagDetails;
					document.getElementById('la_bloodGroup').innerText=" "+r.bloodGroupname;
					document.getElementById('la_bloodItemNo').innerText=" "+r.bloodItemName;
					document.getElementById('la_volumeCollection').innerText=" "+r.volumeOfCollection+" ml";
					document.getElementById('la_remarks').innerText=" "+r.bloodBagDetailsRemarks;
					var today = new Date();
					var dd = String(today.getDate()).padStart(2, '0');
					var mm = String(today.getMonth() + 1).padStart(2, '0'); 
					var yyyy = today.getFullYear();

					today = mm + '/' + dd + '/' + yyyy;
					document.getElementById('la_dateCollection').innerText=" "+today;
				}
			}
		});
}


function getDonorByBloodBag(){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	//getTestRegsiterDetails(sel_bloodBagNumber);
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDonorByBloodBagId",
		data : {
			bloodBagId : sel_bloodBagNumber
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=0){
				$('#donorId').val(r.donorId);
				$('#title').select2('val',r.title);
				$('#title').select2('disable');
				$('#txt_first_name').val(r.donorFname);
				$('#txt_first_name').attr('disabled', 'disabled');
				$('#txt_middle_name').val(r.donorMname);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$('#txt_last_name').val(r.donorLname);
				$('#txt_last_name').attr('disabled', 'disabled');
				$('#donorTreatmentId').val(r.maxDonorTreatmentId);
				$('#txt_blood_group').val(r.bloodGroup);
				$('#txt_blood_group').attr('disabled', 'disabled');
				getDonorDetails();
			}
		}
	});
}
function getTestRegsiterDetails(sel_bloodBagNumber){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getTestRegsiterDetails",
		data : {
			bloodBagId : sel_bloodBagNumber
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var htmBody="";
			for ( var i = 0; i < r.length; i++) {
				//alert("---length----"+r.length);
				htmBody = htmBody + "<tr style='height:21px;'>"
				+ "<td class='col-md-1 center' id='test_name_"+(i+1)+"' >" + r[i].test_name + "</td>"
				+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_result_"+(i+1)+"' placeholder='Result'>"+ r[i].test_result +"</td>"
				+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_test_"+(i+1)+"'>"+r[i].date_time+"</td>"
				+ "<td class='col-md-1 center' ><textarea class='form-control' id='reamrk_test_"+(i+1)+"' rows='5'></textarea>"+r[i].remark+"</td>";
			}
		
		
		$("#testRegisterDetailsBody").html(htmBody);
		}
	});
}
function getDonorDetails(){
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		return false;
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getCheckUpByTreatmentId",
		data : {
			id : donorTreatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=null){
					document.getElementById('la_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('la_height').innerText=r.donorHeight+" Cm";
					document.getElementById('la_haemoglobin').innerText=r.donorHemoglobin;
					document.getElementById('la_temprature').innerText=r.donorTemprature;
			}
		}
	});
}




function saveTestRegister(){
	// Added By Annapurna 
	var callfrom= $("#callfrom").val();
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
 	if(callfrom == 'update'){
   	 var sel_bloodBagNumber=$("#bagno1").val(); 
   	
	}
	if(sel_bloodBagNumber==0){
		alert("Select blood Bag");
		return false;
	}
	
	var sel_component_seperation = $("#sel_component_seperation").val();
	
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		alert("Select blood Bag");
		return false;
	}

	var date_of_bag_collection=$("#date_of_bag_collection").val();
	if(date_of_bag_collection==""){
		alert("Select collection date");
		return false;
	}
	var listCompObject = {
			listTestSlave : []
		};
	 var table = document.getElementById("testRegisterDetailsBody");
     var rowCount = table.getElementsByTagName("tr").length;
     
     for ( var i = 1; i <= rowCount; i++) {
			
         var test_slave_id=$("#test_slave_id" + i).val();             
         var test_name = $("#test_name_" + i).text();
         var test_result = $("#txt_result_" +i).val();  
         var date_time =$("#date_time_result_test_" +i).val();
         var remark = $("#reamrk_test_" +i).val();
       //  var remarks = $("#remarks_test_register" +i).val();
		setlistCompObj(listCompObject,test_slave_id,test_name,test_result,date_time,remark);				
	}
    
     listCompObject = JSON.stringify(listCompObject);
	
	var remarks_test_register=$("#remarks_test_register").val();
	var testRegisterId=$("#testRegisterId").val();
	var bloodGroup = $("#txt_blood_group").val();
	var inputs = [];	
	inputs.push('testRegisterId=' + testRegisterId);
	inputs.push("listCompObject="+ encodeURIComponent(listCompObject));
	inputs.push("bloodGroup="+ encodeURIComponent(bloodGroup));
	inputs.push('bloodBagNumber=' + sel_bloodBagNumber);
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('dateOfBagCollection=' + date_of_bag_collection);
	inputs.push('remark=' + remark);
	//inputs.push('remarks=' + remarks_test_register);
	inputs.push('sel_component_seperation=' + sel_component_seperation);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveTestRegister",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Test Register Saved Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success( "Test Register Updated Sucessfully");				
			}else{
				alertify.success( "Duplicate data can not be saved");	
			}
			location.reload(true);
		}
	});	
}
function setlistCompObj(listCompObject,test_slave_id,test_name,test_result,date_time,remark){
	
	listCompObject.listTestSlave.push({
		testSlaveId :test_slave_id,
		testName : test_name,
		testResult :test_result,
		dateTime : date_time,
		remark: remark,
		
	});
	
}

function saveComponentSeperation(){

	var callfrom= $("#callfrom").val();
	
	var listCompObjectComponent = {
			lstComponentseperation : []
		};
	 var table = document.getElementById("componentSepreationDetails");
     var rowCount = table.getElementsByTagName("tr").length;
     
     for ( var i = 1; i <= rowCount; i++) {
			
         var componentSeperationId=$("#componentSeperationId" + i).val(); 
         if(callfrom == 'update'){
        	 var componentSeperationId=$("#componentSeperationId").val(); 
        	
     	}
         var componentName = $("#component_name_" + i).text();
         if(componentName == "" || componentName == null || componentName =="null"){
        	 alert("Please Enter component Name");
        	 return false;
         }
         var volume = $("#txt_volume_" +i).val();  
         if(volume == "" || volume == null || volume =="null"){
        	 alert("Please Enter volume");
        	 return false;
         }
         var expiryDate =$("#date_time_result_component" +i).val();
         if(expiryDate == "" || expiryDate == null || expiryDate =="null"){
        	 alert("Please Enter Expiry Date");
        	 return false;
         }
         var componentRemark = $("#reamrk_component_" +i).val();
         if(componentRemark == "" || componentRemark == null || componentRemark =="null"){
        	 alert("Please Enter Component Remark");
        	 return false;
         }
        var componentSeperationRemark =$("#remarks_component_seperation").val();
        
     	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
     	if(callfrom == 'update'){
       	 var sel_bloodBagNumber=$("#bagno").val(); 
       	
    	}
    	if(sel_bloodBagNumber==0){
    		alert("Select blood Bag");
    		return false;
    	}
    	
    	var donorTreatmentId=$("#donorTreatmentId").val();
    	if(donorTreatmentId==0){
    		alert("Select blood Bag");
    		return false;
    	}

    	var date_of_bag_collection=$("#date_of_bag_collection").val();
    	if(date_of_bag_collection==""){
    		alert("Select collection date");
    		return false;
    	}
    	
    	var bloodGroup = $("#txt_blood_group").val();
    	
		setlistCompObjectComponent(listCompObjectComponent,componentSeperationId,componentName,volume,expiryDate,componentRemark,componentSeperationRemark,sel_bloodBagNumber,donorTreatmentId,date_of_bag_collection,bloodGroup);				
	}
    
     listCompObjectComponent = JSON.stringify(listCompObjectComponent);

	var inputs = [];	
	inputs.push("listCompObjectComponent="+ encodeURIComponent(listCompObjectComponent));
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveComponentSeperation",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Component Seperation Saved Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success("Component Seperation Updated Sucessfully");				
			}
			location.reload(true);
		}
	});	
}
function setlistCompObjectComponent(listCompObjectComponent,componentSeperationId,componentName,volume,expiryDate,componentRemark,componentSeperationRemark,
		sel_bloodBagNumber,donorTreatmentId,date_of_bag_collection,bloodGroup){
	
	listCompObjectComponent.lstComponentseperation.push({
		componentSeperationId :componentSeperationId,
		componentName : componentName,
		volume :volume,
		expiryDate : expiryDate,
		componentRemark: componentRemark,
		bloodBagNumber: sel_bloodBagNumber,
		donorTreatmentId: donorTreatmentId,
		dateOfBagCollection: date_of_bag_collection,
		componentSeperationRemark: componentSeperationRemark,
		bloodGroup : bloodGroup
	});
	
}
function getBloodBagInComponent(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getBloodBagsInComponent",
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if(r.length > 0){
				var divContent = "";
		        divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
		         for ( var i = 0; i < r.length; i++) {          
		        	 divContent = divContent + "<option value='"+r[i].bloodBagNumber+"'>"+ r[i].bagDetails + "</option>";
		            }
		        divContent = divContent + "</select>";
		            $("#sel_bloodBagNumber").html(divContent);
		            $("#sel_bloodBagNumber").html(divContent);
			}
		}
		
	});

}

function getBloodBagInStock(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getBloodBagsInStocks",
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r.length > 0){
				var divContent = "";
		        divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
		         for ( var i = 0; i < r.length; i++) {          
		        	 divContent = divContent + "<option value='"+r[i].bloodBagNumber+"'>"+ r[i].bagDetails + "</option>";
		            }
		        divContent = divContent + "</select>";
		            $("#sel_bloodBagNumber").html(divContent);
		            $("#sel_bloodBagNumber").html(divContent);
			}
					
		}
		
	});
	
}

function getDonorInfoByBloodBag(callfrom){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDonorByBloodBagId",
		data : {
			bloodBagId : sel_bloodBagNumber
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=0){
				$('#donorId').val(r.donorId);
				$('#title').select2('val',r.title);
				$('#title').select2('disable');
				$('#txt_first_name').val(r.donorFname);
				$('#txt_first_name').attr('disabled', 'disabled');
				$('#txt_middle_name').val(r.donorMname);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$('#txt_last_name').val(r.donorLname);
				$('#txt_last_name').attr('disabled', 'disabled');
				$('#donorTreatmentId').val(r.maxDonorTreatmentId);
				$('#txt_blood_group').val(r.bloodGroup);
				$('#txt_blood_group').attr('disabled', 'disabled');
				getDonorDetails();
				getComponentSeprationById(callfrom);
				//getAllDiscardReasons();
				fetchAuthorisedDoctor();
				
			}
		}
	});
}




function saveStockRegister(){
	var callfrom = $("#callfrom").val();
	 
	var listCompObjectStock = {
			lstStockRegister : []
		};
	 var table = document.getElementById("stockDetails");
     var rowCount = table.getElementsByTagName("tr").length;
     
     for ( var i = 1; i <= rowCount; i++) {
    	 var stockId=$("#stockId" + i).val(); 
         if(callfrom == 'update'){
        	 var stockId=$("#stockId").val(); 
        	
     	}	
         var componentSeperationId=$("#comp_stock_name_" +i).text(); 
         var inward_date=$("#comp_stock_date_time_" +i).val();
         if(inward_date == null || inward_date =="NULL" || inward_date ==" "){
        	 alert("Please Enter Inward Date");
        	 return false;
         }
     	var stock_reamrk=$("#stock_remark").val();
     	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
     	if(callfrom == 'update'){
     		var sel_bloodBagNumber=$("#bagId").val();	
     	}
    	if(sel_bloodBagNumber==0){
    		alert("Select blood Bag");
    		return false;
    	}
    	
    	var donorTreatmentId=$("#donorTreatmentId").val();
    	if(donorTreatmentId==0){
    		alert("Select blood Bag");
    		return false;
    	}

    	var date_of_bag_collection=$("#date_of_bag_collection").val();
    	if(date_of_bag_collection==""){
    		alert("Select collection date");
    		return false;
    	}
		setlistCompObjectStock(listCompObjectStock,componentSeperationId,inward_date,stock_reamrk,sel_bloodBagNumber,donorTreatmentId,date_of_bag_collection,stockId);				
	}
    
     listCompObjectStock = JSON.stringify(listCompObjectStock);
	
	
	

	var inputs = [];	

	inputs.push("listCompObjectStock="+ encodeURIComponent(listCompObjectStock));
	

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveStock",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Stock Saved Sucessfully");
				clearDonorForm();
				location.reload(true);
			}
			else if (data == 2) {
				alertify.success("Stock Updated Sucessfully");	
				location.reload(true);
			}
			
		}
	});	
	
}

function setlistCompObjectStock(listCompObjectStock,componentSeperationId,inward_date,stock_reamrk,sel_bloodBagNumber,donorTreatmentId,date_of_bag_collection,stockId){
	
	listCompObjectStock.lstStockRegister.push({
		compSepId :componentSeperationId,
		inwardDate : inward_date,
		stock_remark :stock_reamrk,
		bagId: sel_bloodBagNumber,
		donorTreatmentId: donorTreatmentId,
		dateOfBagCollection: date_of_bag_collection,
		stockId: stockId
	});
	
}



function getbagDetailsByTreatmentIdd(id){
	//alert("hi");
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getbagDetailsByTreatmentId",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		//getCheckUpListByTreatmentId('reaction');
			setBagDetailsByTreatmentId(r);
			
		}
	});
}

function setBagDetailsByTreatmentId(r){
var list = "<option value=0 class='un'>SELECT</option>";
	
   // for ( var i = 0; i < r.length; i++) {  

        list = list + "<option value='"+r.bloodBagDetailsId+"' class='un' onclick='getCheckUpListByTreatmentId(),getDetailsByBloodBag("+r.bloodBagDetailsId+")'>" + (r.bloodBagDetails) + "</option>";    
    //}  
   
    $("#sel_bloodBagNumber").html(list);
  
}

function getAllTestsDetails(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllTestsMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllTestsDetails(r);
		}
	});
}

function setAllTestsDetails(r){
	
	var htmBody = "";
	if (r.listTestMaster.length == 0 || r.listTestMaster.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.listTestMaster.length; i++) {
			
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' id='test_name_"+(i+1)+"' >" + r.listTestMaster[i].testName + "</td>"
			//+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='test_name"+ r.listTestMaster[i].testName+"'></td>"
		//	+ "<td class='col-md-1 center' ><select class='form-select' id='sel_test_result_test_"+(i+1)+"'></select></td>"
			+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_result_"+(i+1)+"' placeholder='Result'></td>"
			+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_test_"+(i+1)+"'></td>"
			+ "<td class='col-md-1 center' ><textarea class='form-control' id='reamrk_test_"+(i+1)+"' rows='5'></textarea></td>";
		}
	}
	
	$("#testRegisterDetailsBody").html(htmBody);
}


function setAllComponentToStock(r){
	
	var htmBody = "";
	if (r.length == 0 || r.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.length; i++) {
		
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' id='comp_stock_name_"+(i+1)+"' >" + r[i].componentName + "</td>"
			+ "<td class='col-md-1 center' id='comp_stock_volume_"+(i+1)+"' >" + r[i].volume + "</td>"
			//+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='test_name"+ r.listTestMaster[i].testName+"'></td>"
		//	+ "<td class='col-md-1 center' ><select class='form-select' id='sel_test_result_test_"+(i+1)+"'></select></td>"
		//	+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_result_"+(i+1)+"' placeholder='Result'></td>"
			+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='comp_stock_date_time_"+(i+1)+"'></td>";//Added By Annapurna
			var expiryDateSplit = r[i].expiryDate.split('-');
			var expiry_date=expiryDateSplit[2]+ "/" +expiryDateSplit[1]+ "/" +expiryDateSplit[0];
			htmBody +="<td class='col-md-1 center' id='comp_stock_expiry_date_"+(i+1)+"' >" + expiry_date + "</td>"
			//+ "<td class='col-md-1 center' id='comp_stock_expiry_date_"+(i+1)+"' >" + r[i].expiryDate + "</td>"
			//+ "<td class='col-md-1 center' ><textarea class='form-control' id='comp_stock_reamrk"+(i+1)+"' rows='5'></textarea></td>"
			+ "<td class='col-md-1 center' id='comp_stock_reamrk"+(i+1)+"' >" + r[i].componentRemark + "</td>";
		}
	}
	
	$("#stockDetails").html(htmBody);
}

function autoAgeMonthDays(){
	var dob = $("#txt_birth_date").val();
	if (dob != "") {
		var ageString = getAgeYMD(dob);
		// alert(ageString);
		var ageStringArray = ageString.split("___");
		//alert(ageStringArray);
		$("#txt_age").val(ageStringArray[0]+"-"+ageStringArray[1]+"-"+ageStringArray[2]);
		
	}
}

function getAgeYMD(dateString) {

	var date1= dateString.split("-");
	var date2 = date1[2]+"/"+date1[1]+"/"+date1[0];
	var now = new Date();
	var today = new Date(now.getYear(), now.getMonth(), now.getDate());

	var yearNow = now.getYear();
	var monthNow = now.getMonth();
	var dateNow = now.getDate();

	var dob = new Date(date2.substring(6, 10),
			date2.substring(3, 5) - 1, date2.substring(0, 2));

	// alert("dob: " + dob);

	var yearDob = dob.getYear();
	var monthDob = dob.getMonth();
	var dateDob = dob.getDate();
	var age = {};
	var ageString = "0___0___0";
	var seperatorString = "___";

	yearAge = yearNow - yearDob;

	if (monthNow >= monthDob)
		var monthAge = monthNow - monthDob;
	else {
		yearAge--;
		var monthAge = 12 + monthNow - monthDob;
	}

	if (dateNow >= dateDob)
		var dateAge = dateNow - dateDob;
	else {
		monthAge--;
		var dateAge = 31 + dateNow - dateDob;

		if (monthAge < 0) {
			monthAge = 11;
			yearAge--;
		}
	}

	age = {
		years : yearAge,
		months : monthAge,
		days : dateAge
	};

	if ((age.years > 0) && (age.months > 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else
		ageString = "0___0___0";

	// alert("Y___M___D: " + ageString);

	return ageString;

}

function autoGender(){
	var ra_gender=$("#title").val();
	if(ra_gender=="Mr"){
		$("input:radio[name='ra_gender'][value='M']").prop("checked",true);
	}else if(ra_gender=="Mrs" || ra_gender=="Miss"){
		$("input:radio[name='ra_gender'][value='F']").prop("checked",true);
	}else{
		$("input:radio[name='ra_gender'][value='O']").prop("checked",true);
	}
}


function validateContactNumOnly(evt) {
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    alert("Enter Number Only.!!!");
        return false;
    }
    return true;
}

function validateAlphabetsByRegExpression(id){
	var reg = /^[A-Za-z]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only Alphabets!");
		$('#' + id).val("");
		return false;
	}
}

function  getAllDiscardReasons(id){

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllDiscardReasons",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setDiscardReason(r, id);
		}
	});
}

function setDiscardReason(r, id){
	
	var list = "<option value=0 >SELECT</option>";
	
	for ( var i = 0; i < r.listDiscardReason.length; i++) {  
	
	     list = list + "<option value='"+r.listDiscardReason[i].discardReasonId+"'>" + (r.listDiscardReason[i].reasonName) + "</option>";    
	 }  

	$("#" + id).html(list);
	 $('#discard_result"+(i+1)+"').html(divContent);

}



function getBloodDonorDetailsList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor/getBloodDonorDetailsList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#header_search_donor').show();
			$('#header_search_donor_treatment').hide();
			setBloodDonorTreatmentDetailsList(r);
		}
	});	
}

function setBloodDonorTreatmentDetailsList(r){

	var htm = "";
	var index = 1;

		for ( var i = 0; i < r.length; i++) {
			var datetime= new Date(r[i].createdDate).toLocaleDateString('en-GB');
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].donorId
				+ '</td>'
				/*+ ' <td class="col-md-1 center">'
				+ r[i].organDonationRegistrationDto.id
				+ '</td>'*/
				+ ' <td class="col-md-1 center">'
				+ r[i].patient_title_name+" "+ r[i].donorFname +" "+ r[i].donorMname +" "+ r[i].donorLname 
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ datetime 
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=editBloodDonor('
				+ r[i].donorId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodDonor('
				+ r[i].donorId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
				index++;
			}
			
		
	
	$("#BloodDonorsListDetails").html(htm);

}

function editBloodDonor(donorId){
	 $("#DivSubEntry").show('slow');
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var unitId = $("#unitId").val();
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		inputs.push('id=' + donorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/donor/editBloodDonor",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				//toggleRegsitrationDiv();
				//$("input:radio[name='donor_menu'][value='new']").prop("checked",true);
				//$("#donor_menu").attr("checked","checked");
				$('#donorTypeDiv').show();
				$('#patientTypeDiv').show();
				$('#collectionDiv').show();
				$('#RemarksDiv').show();
				$('#saveTreatmentDonor').show();
				$('#donorId').val(r.donorId);	
				$("#title").select2('val',r.title);
				$('#title').select2('disable');
				$("#txt_first_name").val(r.donorFname);
				$('#txt_first_name').attr('disabled', 'disabled');
				$("#txt_middle_name").val(r.donorMname);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$("#txt_last_name").val(r.donorLname);
				$('#txt_last_name').attr('disabled', 'disabled');
				$("#txt_birth_date").val(r.birthDate);			
				$("#ta_address").val(r.address);
				$("#txt_occupation").val(r.occupation);
				$("#txt_contact1").val(r.contactNumber1);
				$("#txt_contact2").val(r.contactNumber2);
				$("#txt_age").val(r.age);
				
				$("input:radio[name='ra_gender'][value='"+r.gender+"']").prop("checked",true);
				
				
				
			}
		});
	}
}


function deleteBloodDonor(donorId){
	var unitId = $("#unitId").val();
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/donor/deleteBloodDonor",
				data : {
					"donorId" : donorId,
					"unitId"  : unitId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getBloodDonorDetailsList();
				}
			});
		}
	}
}


function toggleExistingRegDiv(){
	//$("#existing_donor").show();
//	$("#header_search_donor").hide();
}

function getAllBloodDonorsTreatmentList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getAllBloodDonorsTreatmentList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#header_search_donor').hide();
			$('#header_search_donor_treatment').show();
			setAllBloodDonorTreatmentDetailsList(r,"ALL");
		}
	});	
}

function setAllBloodDonorTreatmentDetailsList(r,CallFrom){
	var htm = "";
	var index = 1;
	if (CallFrom == "search") {
		
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.maxDonorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.donorId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.donorFname +" "+ r.donorMname +" "+ r.donorLname 
					+ '</td>'
					if(r.status == "Y"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button disabled class="btn btn-xs btn-success"  onclick=editBloodDonorTreatment('
					+ r.donorId+","+r.donorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodDonorTreatment('
					+ r.donorId+","+r.donorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					}
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodDonorTreatment('
					+ r.donorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info" onclick=sendBloodDonorToCheckupList('
					+ r.donorId+","+r.donorTreatmentId
					+ ')><i class="fa fa-cloud-upload"></i></button></td>'
					+ '</tr>';
			
		
	}else{
		
		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorMaster.donorId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorMaster.patient_title_name+" "+ r[i].donorMaster.donorFname +" "+ r[i].donorMaster.donorMname +" "+ r[i].donorMaster.donorLname 
					+ '</td>'
					
					if(r[i].checkupStatus == "Y"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button disabled class="btn btn-xs btn-success" onclick=editBloodDonorTreatment('
					+ r[i].donorMaster.donorId
					+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
						htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodDonorTreatment('
					+ r[i].donorMaster.donorId
					+ ')><i class="fa fa-edit"></i></button></td>'
					}
			htm = htm	+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodDonorTreatment('
					+ r[i].donorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info" onclick=sendBloodDonorToCheckupList('
					+ r[i].donorMaster.donorId+","+r[i].donorTreatmentId
					+ ')><i class="fa fa-cloud-upload"></i></button></td>'
					+ '</tr>';
			index++;
	}
	}
	$("#BloodDonorsTreatmentListDetails").html(htm);
}

function editBloodDonorTreatment(donorId,treatmentId){
	 $("#DivSubEntry").show('slow');
	var unitId = $("#unitId").val();
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var inputs = [];
		inputs.push('id=' + donorId);
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/donor/editBloodDonorTreatment",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
			//	toggleRegsitrationDiv();
				$('#donorTypeDiv').show();
				$('#patientTypeDiv').show();
				$('#collectionDiv').show();
				$('#RemarksDiv').show();
				$('#saveTreatmentDonor').show();
				$('#saveDonor').hide();
				$('#donorId').val(r.donorMaster.donorId);
				$('#donorId').attr('disabled', 'disabled');
			$("#title").select2('val',r.donorMaster.title);//added select2
				$('#title').select2('disable');
				$("#txt_first_name").val(r.donorMaster.donorFname);
				$('#txt_first_name').attr('disabled', 'disabled');
				$("#txt_middle_name").val(r.donorMaster.donorMname);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$("#txt_last_name").val(r.donorMaster.donorLname);
				$('#txt_last_name').attr('disabled', 'disabled');
				$("#txt_birth_date").val(r.donorMaster.birthDate);
				$('#txt_birth_date').attr('disabled', 'disabled');
				$("#ta_address").val(r.donorMaster.address);
				$('#ta_address').attr('disabled', 'disabled');	
				$("#txt_occupation").val(r.donorMaster.occupation);
				$('#txt_occupation').attr('disabled', 'disabled');
				$("#txt_contact1").val(r.donorMaster.contactNumber1);
				$('#txt_contact1').attr('disabled', 'disabled');
				$("#txt_contact2").val(r.donorMaster.contactNumber2);
				$('#txt_contact2').attr('disabled', 'disabled');
				$("#txt_age").val(r.donorMaster.age);
				$('#txt_age').attr('disabled', 'disabled');
				$("input:radio[name='ra_gender'][value='"+r.donorMaster.gender+"']").prop("checked",true);				
				$("input:radio[name='ra_donor_type'][value='"+r.donorType+"']").prop("checked",true);
				$("input:radio[name='ra_patient_type'][value='"+r.patient_type+"']").prop("checked",true);
				$("input:radio[name='ra_collection'][value='"+r.collection+"']").prop("checked",true);
				$('#remarks_ta').val(r.remark);
				$('#donorTreatmentId').val(r.donorTreatmentId);
			}
		});
	}

}


function getBloodDonorTreatmentDetailsById(id, callform){

	
	if(id !=undefined && id != null && id != "" && id != "null"){
		
		var inputs = [];
		inputs.push('id=' + id);
		inputs.push('callform=' + callform)
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/donor/getBloodDonorTreatmentDetailsById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				//alert("---before sending to set data----");

		//	alert("hii");
				$('#divCheckupList').show();
				setAllBloodDonorTreatmentDetailsList(r, "search");
				setTimeout(function(){
					$('#title').val(r.patient_title_name);
					$('#title').attr('disabled', 'disabled');
			    
				//$("#title option:selected").val(r. title);
			 //   $('#title').select2('disable');
				$('#donor_first_name').val(r.donorFname);
				$('#donor_first_name').attr('disabled', 'disabled');
				$('#donor_middle_name').val(r.donorMname);
				$('#donor_middle_name').attr('disabled', 'disabled');
				$('#donor_last_name').val(r.donorLname);
				$('#donor_last_name').attr('disabled', 'disabled');
				$('#donorTreatmentId').val(r.maxDonorTreatmentId);
				
					
				}, 1)
				
			}
		});
		
	}
	

}

function deleteBloodDonorTreatment(donorTreatmentId){
	var unitId = $("#unitId").val();
	if(donorTreatmentId !=undefined && donorTreatmentId!=null && donorTreatmentId!="" && donorTreatmentId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/donor/deleteBloodDonorTreatment",
				data : {
					"donorTreatmentId" : donorTreatmentId,
					"unitId" : unitId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllBloodDonorsTreatmentList();
				}
			});
		}
	}

}

function sendBloodDonorToCheckupList(donorId,donorTreatmentId){
	window.location.href = "bb_donor_checkuplist.jsp?" + "donorId=" + encodeURIComponent(donorId)+  "&donorTreatmentId=" + encodeURIComponent(donorTreatmentId);
	defaultFetchPatientTitle("checkuplist");
}



function getAllStockList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getAllStockList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllStockList(r,"ALL");
		}
	});	
}

function setAllStockList(r,CallFrom){

	var htm = "";
	var index = 1;
	
		
		for ( var i = 0; i < r.length; i++) {
			if(r[i].stockUsed=='N'){
				
				var expiryDateSplit1 = r[i].expiry_date.split('-');
				var expirydate=expiryDateSplit1[2]+ "/" +expiryDateSplit1[1]+ "/" +expiryDateSplit1[0];		
				var inwardDateSplit =  r[i].inwardDate.split('-');
				var inwarddate=inwardDateSplit[2]+ "/" +inwardDateSplit[1]+ "/" +inwardDateSplit[0];
				htm = htm
				+ '<tr "> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].blood_bag_details
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].compSepId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].volume
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].blood_group
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ expirydate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ inwarddate
				+ '</td>'	
				+ '<td class="col-md-1 center">'
				+ '<button disabled  class="btn btn-xs  btn-success" onclick=editStock('
				+ r[i].stockId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button disabled class="btn btn-xs btn-danger" onclick=deleteStock('
				+ r[i].stockId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			}else{
				
				var expiryDateSplit1 = r[i].expiry_date.split('-');
				var expirydate=expiryDateSplit1[2]+ "/" +expiryDateSplit1[1]+ "/" +expiryDateSplit1[0];		
				var inwardDateSplit =  r[i].inwardDate.split('-');
				var inwarddate=inwardDateSplit[2]+ "/" +inwardDateSplit[1]+ "/" +inwardDateSplit[0];
				htm = htm
				
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].blood_bag_details
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].compSepId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].volume
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].blood_group
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ expirydate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ inwarddate
				+ '</td>'	
				+ '<td class="col-md-1 center">'
				+ '<button class="btn btn-xs btn-success" onclick=editStock('
				+ r[i].stockId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteStock('
				+ r[i].stockId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			}
			
	}
	
	$("#stockAllList").html(htm);

}

function getStockListById(id){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor/getStockListById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		
			var htm = "";
			var index = 1;
			
				
				for ( var i = 0; i < r.lstStockRegister.length; i++) {
					
						var expiryDateSplit1 = r.lstStockRegister[i].expiry_date.split('-');
						var expirydate=expiryDateSplit1[2]+ "/" +expiryDateSplit1[1]+ "/" +expiryDateSplit1[0];		
						var inwardDateSplit =  r.lstStockRegister[i].inwardDate.split('-');
						var inwarddate=inwardDateSplit[2]+ "/" +inwardDateSplit[1]+ "/" +inwardDateSplit[0];
						htm = htm
						+ '<tr "> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].blood_bag_details
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].compSepId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].volume
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].blood_group
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ expirydate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ inwarddate
						+ '</td>'	
						+ '<td class="col-md-1 center">'
						+ '<button disabled  class="btn btn-xs  btn-success" onclick=editStock('
						+ r.lstStockRegister[i].stockId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ '<td class="col-md-1 center">'
						+ '	<button disabled class="btn btn-xs btn-danger" onclick=deleteStock('
						+ r.lstStockRegister[i].stockId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
				}
				$("#stockAllList").html(htm);
		}
	});	
 }

function editStock(id){
	$("#divStockRegister").show('slow');
	var unitId = $("#unitId").val();
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		//inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/donor/editStock",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {

				for(var i=0; i< r.lstStockRegister.length;i++){
				$("#title").select2('val',r.lstStockRegister[0].title);
				$('#title').select2('disable');
				$("#txt_first_name").val(r.lstStockRegister[0].first_name);
				$('#txt_first_name').attr('disabled', 'disabled');
				$("#txt_middle_name").val(r.lstStockRegister[0].middle_name);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$("#txt_last_name").val(r.lstStockRegister[0].last_name);
				$('#txt_last_name').attr('disabled', 'disabled');
				$("#txt_blood_group").val(r.lstStockRegister[0].blood_group);
				$('#txt_blood_group').attr('disabled', 'disabled');
				$("#date_of_bag_collection").val(r.lstStockRegister[0].dateOfBagCollection);
				$('#date_of_bag_collection').attr('disabled', 'disabled');	
				$('#stock_remark').val(r.lstStockRegister[0].stock_remark);
				$('#donorTreatmentId').val(r.lstStockRegister[0].donorTreatmentId);
				$('#bagId').val(r.lstStockRegister[0].bagId);
				$('#stockId').val(r.lstStockRegister[0].stockId);
				$('#callfrom').val('update');
				$('#comp_stock_volume_'+i).attr('disabled', 'disabled');
				 $('#reamrk_test_'+i).attr('disabled', 'disabled');
				
				getDonorDetails();
				var htmBody="";
				htmBody = htmBody + "<tr style='height:21px;'>"
				+ "<td class='col-md-1 center' id='comp_stock_name_"+(i+1)+"' >" +  r.lstStockRegister[0].compSepId + "</td>"
				+ "<td class='col-md-1 center'  id='comp_stock_volume_"+(i+1)+"' >" + r.lstStockRegister[0].volume +"</td>"
				+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='comp_stock_date_time_"+(i+1)+"' value="+ r.lstStockRegister[0].inwardDate+"></td>"
				+ "<td class='col-md-1 center' id='comp_stock_expiry_date_"+(i+1)+"' >" + r.lstStockRegister[0].expiry_date + "</td>"
				+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='reamrk_test_"+(i+1)+"' value="+r.lstStockRegister[0].component_remark+"></td>";
			
				
				$("#stockDetails").html(htmBody);
				}
			}
		});
	}

}

function deleteStock(id){
	var unitId = $("#unitId").val();
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/donor/deleteStock",
				data : {
					"id" : id,
					"unitId" : unitId
				},
				
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllStockList();
				}
			});
		}
	}}
function getDiscardReasons(id){

	getAllDiscardReasons(id);
}
function fetchAuthorisedDoctor(rowId){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor_checkuplist/fetchDoctor",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setAuthorisedDoctor(r,rowId);
		}
	});
}

function setAuthorisedDoctor(r,rowId){
	
		var divContent = "";
	    divContent = divContent + "<select><option value='0'>--Select--</option>";
	     for ( var i = 0; i < r.listDoctor.length; i++) {          
	    	 divContent = divContent + "<option value='"+r.listDoctor[i].user_ID+"'>"+ r.listDoctor[i].doc_name + "</option>";
	    //	$('#doctor_name'+(i+1)).html(divContent);
	    //	 divContent = divContent + "<option value='"+r.listDoctor[i].doc_name+"'>"+ r.listDoctor[i].doc_name + "</option>";
	        }
	     //$('#doctor_name'+(rowId)).html(divContent);// Added By Annapurna
	     $('#doctor_name'+(rowId)).html(divContent);// Added By Annapurna
	}

function  discReasons(rowId){
	
	//alert("row_id :" + rowId);
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllDiscardReasons",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setdiscReasons(r, rowId);
		}
	});
}

var discardReasonsList = "";
function setdiscReasons(r, rowId){
	
	var divContent = "";
    divContent = divContent + "<select><option value='0'>--Select--</option>";
   
     for ( var i = 0; i < r.listDiscardReason.length; i++) {          
    	divContent = divContent + "<option value='"+r.listDiscardReason[i].discardReasonId+"'>"+ r.listDiscardReason[i].reasonName + "</option>";
    	// divContent = divContent + "<option value='"+r.listDiscardReason[i].reasonName+"'>" + r.listDiscardReason[i].reasonName + "</option>";
        }
    // $("#discard_result"+(rowId)).html(divContent); //Added By Annapurna
     $("#discard_result"+(rowId)).html(divContent); //Added By Annapurna
    //divContent = divContent + "</select>";
      //  var table = document.getElementById("discardDetails");
       // var rows = table.getElementsByTagName("tr").length;
       // for(var i=0;i<rows;i++){ 
}


function getComponentSeprationById(callfrom){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getComponentByBloodBagId",
		data : {
			bloodBagId : sel_bloodBagNumber,
			callfrom : callfrom
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!= 0){
				$("#componentSeperateId").val(r.componentSeperationId);
				$("#plasma_volume").val(r.plasmaVolume);
				$("#plasma_expiry_date").val(r.plasmaExpiryDate);
				$("#plasma_reamrk").val(r.plasmaRemark);
				$("#ffp_volume").val(r.ffpVolume);
				$("#ffp_expiry_date").val(r.ffpExpiryDate);
				$("#ffp_reamrk").val(r.ffpRemark);
				$("#rcell_volume").val(r.rCellVolume);
				$("#rcell_expiry_date").val(r.rCellExpiryDate);
				$("#rcell_reamrk").val(r.rCellRemark);
				setAllComponentToStock(r);
				if(callfrom=='discard'){
					
					var htmBody = "";
					if (r.length == 0 || r.length == null) {
						htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records</th></tr>";
						
					} else {		
						for ( var i = 0; i < r.length; i++) {
							
							htmBody = htmBody + "<tr style='height:21px;'>"
												
						//	+ "<td class='col-md-1 center' ><input type='checkbox'  id='checked_"+(i+1)+"'></td>"
							+ "<td class='col-md-1 center' id='stockId"+(i+1)+"'>" +r[i].stockId+ "</td>"
							+ "<td class='col-md-1 center' id='discard_stock_name_"+(i+1)+"' >" + r[i].componentName + "</td>"
							+ "<td class='col-md-1 center' id='discard_stock_volume_"+(i+1)+"' >" + r[i].volume + "</td>"
							+ "<td class='col-md-1 center' id='discard_stock_inward_date_"+(i+1)+"' >" + r[i].inwardDate + "</td>"
							+ "<td class='col-md-1 center' id='discard_stock_expiry_date_"+(i+1)+"' >" + r[i].expiryDate + "</td>"
							+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='discard_stock_date_time"+(i+1)+"'></td>"
							+" <td><select class='form-select'  id='discard_result"+(i+1)+"' name='discard_result'></select></td>"
							+" <td><select class='form-select' id='doctor_name"+(i+1)+"' name='doctor_name'></select></td>"
							discReasons(i+1);
							fetchAuthorisedDoctor(i+1);
		
						}
						$("#discardDetails").html(htmBody);
					}
	 
					$("#stockDetails").html(htmBody);
					$("#plasma_inward_date").val(r.plasmaInwardDate);
					$("#ffp_inward_date").val(r.ffpInwardDate);
					$("#rcell_inward_date").val(r.rcellInwardDate);
					
					$("#plasma_checkbox").val(r.componentSeperationId);
					$("#ffp_checkbox").val(r.componentSeperationId);
					$("#rcell_checkbox").val(r.componentSeperationId);
					
				}
			}
		}
	});
}

//Function Added By Annapurna for Discard Stock
function getDonorInfoByBloodBagforDcardStock(callfrom){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDonorByBloodBagId",
		data : {
			bloodBagId : sel_bloodBagNumber
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=0){
				$('#donorId').val(r.donorId);
				$('#title').select2('val',r.title);
				$('#title').select2('disable');
				$('#txt_first_name').val(r.donorFname);
				$('#txt_first_name').attr('disabled', 'disabled');
				$('#txt_middle_name').val(r.donorMname);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$('#txt_last_name').val(r.donorLname);
				$('#txt_last_name').attr('disabled', 'disabled');
				$('#donorTreatmentId').val(r.maxDonorTreatmentId);
				$('#txt_blood_group').val(r.bloodGroup);
				$('#txt_blood_group').attr('disabled', 'disabled');
				getDonorDetails();
				getComponentSeprationById(callfrom);
				getAllDiscardReasons();
				fetchAuthorisedDoctor();
				
			}
		}
	});
}


//Added By Annapurna
function saveDiscardStock(){
	
	var callfrom= $("#callfrom").val();// Added By Annapurna 
	
	var listDiscardStockObj = {
			lstStockRegister : []
		};
	 var table = document.getElementById("discardDetails");
     var rowCount = table.getElementsByTagName("tr").length;
  // Added By Annapurna 
     for ( var i = 1; i <= rowCount; i++) {
    	 var stockId=$("#stockId" + i).text(); 
         if(callfrom == 'update'){
        	 var stockId=$("#stockId").val();     	
     	}	
    	 var componentSeperationId=$("#discard_stock_name_" +i).text(); 
         var discard_date=$("#discard_stock_date_time" +i).val();
     	 var authorized=$("#doctor_name"+i).val();
     	 var discardReason=$("#discard_result"+i).val();
     	 var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
    	
    	
    	var donorTreatmentId=$("#donorTreatmentId").val();
    	if(donorTreatmentId==0){
    		//alert("Select blood Bag");
    		//return false;
    	}

    	var date_of_bag_collection=$("#date_of_bag_collection").val();
    	if(date_of_bag_collection==""){
    		alert("Select collection date");
    		return false;
    	}
    	var discardStock_remark=$("#discardStock_remark").val();
		setlistDiscardStockObj(listDiscardStockObj,stockId,componentSeperationId,discard_date,authorized,discardReason,sel_bloodBagNumber,donorTreatmentId,date_of_bag_collection,discardStock_remark);				
	}
    
   var  listDiscardStockObj = JSON.stringify(listDiscardStockObj);
//alert(listDiscardStockObj);
//alert(stockId);
	var inputs = [];
	inputs.push("listDiscardStockObj="+ encodeURIComponent(listDiscardStockObj));
	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/discardStock",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Discard stock Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success("Discard stock Updated Sucessfully");				
			}
			//location.reload(true);
		}
	});	
}
function setlistDiscardStockObj(listDiscardStockObj,stockId,componentSeperationId,discard_date,
		authorized,discard_result,sel_bloodBagNumber,donorTreatmentId,date_of_bag_collection,discardStock_remark){
	
	listDiscardStockObj.lstStockRegister.push({
		stockId:stockId,
		compSepId :componentSeperationId,
		discardDate : discard_date,
		discardReason:discard_result,
		discardby:authorized,
		donorTreatmentId: donorTreatmentId,
		bagId: sel_bloodBagNumber,
		dateOfBagCollection: date_of_bag_collection,
		discardRemark:discardStock_remark,
	});
	
}
//Added By Annapurna
function editDiscardStock(id){
	$("#divDiscardStock").show('slow');
 //	var unitId = $("#unitId").val();
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		//inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/donor/editDiscardStock",
			timeout : 10000 * 600* 50,
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				var discardReason = "";
				var unitId = $("#unitId").val();
				var inputs = [];
				inputs.push('unitId=' + unitId);
				var str = inputs.join('&');
				jQuery.ajax({
					async : false,
					type : "GET",
					url : "ehat/bb_test_master/getAllDiscardReasons",
					data : str + "&reqType=AJAX",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						
						
						var divContent = "";
					    divContent = divContent + "<select><option value='0'>--Select--</option>";
					   
					     for ( var i = 0; i < r.listDiscardReason.length; i++) {          
					    	divContent = divContent + "<option value='"+r.listDiscardReason[i].discardReasonId+"'>"+ r.listDiscardReason[i].reasonName + "</option>";
					     }
					     
					     discardReason = divContent;					    
					}
				});
                var doctorName= "";
				var unitId = $("#unitId").val();
				var inputs = [];
				inputs.push('unitId=' + unitId);
				var str = inputs.join('&');
				jQuery.ajax({
					async : false,
					type : "POST",
					url : "ehat/donor_checkuplist/fetchDoctor",
					data : str + "&reqType=AJAX",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						var divContent = "";
					    divContent = divContent + "<select><option value='0'>--Select--</option>";
					     for ( var i = 0; i < r.listDoctor.length; i++) {          
					    	 divContent = divContent + "<option value='"+r.listDoctor[i].user_ID+"'>"+ r.listDoctor[i].doc_name + "</option>";
					     }
					     doctorName =divContent;
					}
				});
				
				for(var i=0; i<r.lstStockRegister.length; i++){
				$("#title").select2('val',r.lstStockRegister[0].title);
				$('#title').select2('disable');
				$("#txt_first_name").val(r.lstStockRegister[0].first_name);
				$('#txt_first_name').attr('disabled', 'disabled');
				$("#txt_middle_name").val(r.lstStockRegister[0].middle_name);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$("#txt_last_name").val(r.lstStockRegister[0].last_name);
				$('#txt_last_name').attr('disabled', 'disabled');
				$("#txt_blood_group").val(r.lstStockRegister[0].blood_group);
				$('#txt_blood_group').attr('disabled', 'disabled');
				$("#date_of_bag_collection").val(r.lstStockRegister[0].dateOfBagCollection);
				$('#date_of_bag_collection').attr('disabled', 'disabled');	
			    $('#donorTreatmentId').val(r.lstStockRegister[0].donorTreatmentId);
				$('#bagId').val(r.lstStockRegister[0].bagId);
			   
				$('#stockId').val(r.lstStockRegister[0].stockId);
				$('#comp_stock_name_1').val(r.lstStockRegister[0].compSepId);
			    //$('#discard_result1').select2('val',r.lstStockRegister[0].discardReason);
			   // $('#doctor_name1').select2('val',r.lstStockRegister[0].discardby);
			    $('#discardStock_remark').val(r.lstStockRegister[0].discardRemark);
			    
				$('#discard_result1').select2('val',r.lstStockRegister[0].discardReason);
				var bloodGroupName=$('#discard_result1 option:selected').text();	
				
				//$('#bl_group ').text(bloodGroupName);
				$('#callfrom').val('update');		
			    getDonorDetails();
			    var htmBody="";
				htmBody = htmBody + "<tr style='height:21px;'>"
				
			
		     	+ "<td class='col-md-1 center' id='stockId'>" +r.lstStockRegister[0].stockId+ "</td>"
				+ "<td class='col-md-1 center' id='comp_stock_name_"+(i+1)+"' >" +  r.lstStockRegister[0].compSepId + "</td>"
				+ "<td class='col-md-1 center'  id='comp_stock_volume_"+(i+1)+"' >" + r.lstStockRegister[0].volume +"</td>"
				
				+ "<td class='col-md-1 center' id='comp_stock_date_time_"+(i+1)+"' >" + r.lstStockRegister[0].inwardDate + "</td>"
				+ "<td class='col-md-1 center' id='comp_stock_expiry_date_"+(i+1)+"' >" + r.lstStockRegister[0].expiry_date + "</td>"
				+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='discard_stock_date_time"+(i+1)+"' value="+r.lstStockRegister[0].discardDate+"></td>"
				+" <td><select class='form-select'  id='discard_result"+(i+1)+"' name='discard_result'></select></td>"
				+" <td><select class='form-select' id='doctor_name"+(i+1)+"' name='doctor_name'></select></td>"
			
				
				
				}
				
				$("#discardDetails").html(htmBody);
				
                   
				for(var i=0; i<r.lstStockRegister.length; i++){
					//alert("hii"+r.lstStockRegister[i].discardby);
					$("#discard_result"+(i+1)).html(discardReason);
					$("#doctor_name"+(i+1)).html(doctorName);
					$("#discard_result1").val(r.lstStockRegister[i].discardReason);
					$("#doctor_name1").val(r.lstStockRegister[i].discardby);
				}
			}
		});
	}

}

//Added By Annapurna
function deleteDiscardStock(id){
	var unitId = $("#unitId").val();
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/donor/deleteDiscardStock",
				data : {
					"id" : id,
					"unitId" : unitId
				},
				
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDiscardStockList();
				}
			});
		}
	}}

//Added By Annapurna
function getAllDiscardStockList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getAllDiscardStockList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllDiscardStockList(r,"ALL");
		}
	});	
}

function setAllDiscardStockList(r,CallFrom){

	var htm = "";
	var index = 1;
	
		
		for ( var i = 0; i < r.length; i++) {
		//	if(r[i].stockUsed=='Y'){
			//Added By Annapurna	
			var expiry_date1 =	 r[i].expiry_date.split('-');
			var expirydate2=expiry_date1[2]+ "/" +expiry_date1[1]+ "/" +expiry_date1[0];	
			var inwardDate1 =	 r[i].inwardDate.split('-');
			var inwardDate2=inwardDate1[2]+ "/" +inwardDate1[1]+ "/" +inwardDate1[0];	
			
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].stockId
				+ ' <td class="col-md-1 center">'
				+ r[i].blood_bag_details
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].compSepId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].volume
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].blood_group
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ expirydate2
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+  inwardDate2
				+ '</td>'	
				+ '<td class="col-md-1 center">'
				+ '<button   class="btn btn-xs  btn-success" onclick=editDiscardStock('
				+ r[i].stockId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button  class="btn btn-xs btn-danger" onclick=deleteDiscardStock('
				+ r[i].stockId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			
			
	}
	
	$("#discardStockAllList").html(htm);

}

function getDiscardStockListById(id){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor/getDiscardStockListById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var htm = "";
			var index = 1;
			
				
				for ( var i = 0; i < r.lstStockRegister.length; i++) {
					var expiry_date1 =	 r.lstStockRegister[i].expiry_date.split('-');
					var expirydate2=expiry_date1[2]+ "/" +expiry_date1[1]+ "/" +expiry_date1[0];	
					var inwardDate1 =	 r.lstStockRegister[i].inwardDate.split('-');
					var inwardDate2=inwardDate1[2]+ "/" +inwardDate1[1]+ "/" +inwardDate1[0];	
					
						htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].stockId
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].blood_bag_details
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].compSepId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].volume
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstStockRegister[i].blood_group
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ expirydate2
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+  inwardDate2
						+ '</td>'	
						+ '<td class="col-md-1 center">'
						+ '<button   class="btn btn-xs  btn-success" onclick=editDiscardStock('
						+ r.lstStockRegister[i].stockId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ '<td class="col-md-1 center">'
						+ '	<button  class="btn btn-xs btn-danger" onclick=deleteDiscardStock('
						+ r.lstStockRegister[i].stockId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
					
					
			}
			
			$("#discardStockAllList").html(htm);


		}
	});	
}

function toggleRegsitrationDiv(){
	//var donorType=$("input:radio[name=donor_menu]:checked").val();
	if(donorType='new'){
		$("#DivSubEntry").toggle('slow');
	
		$('#saveDonor').show();
	}
}
 
function toggleBloodBagCollectionListDiv(){

	$("#diveForEntryBloodBagCollection").toggle('slow');	
}

function toggleCheckUpListDiv(){
	$("#divCheckupList").toggle('slow');

/*	var list = "<option value="+"0"+">Collected by name</option>";
	$("#collected_by").html(list);
*/}
function toggleDonorReactionDiv(){
	$("#divForReg").toggle('slow');

}
function toggleBloodGroupTesting(){
	$("#divForBloodTesting").toggle('slow');

}

function toggleSampleDispatch(){
	$("#divSampleDispatch").toggle('slow');

}
function toggleTestRegister(){
	$("#divTestRegister").toggle('slow');

}

function toggleComponentSepration(){
	$("#divComponentSeperation").toggle('slow');

}

function toggleStockReg(){
	$("#divStockRegister").toggle('slow');

}

function toggleDiscardStockReg(){
	$("#divDiscardStock").toggle('slow');

}

function toggleBloodRequest(){
	$("#divForBloodRequest").toggle('slow');

}

function toggleBloodRequestSampleDispatch(){
	$("#divForBRSampleDispatch").toggle('slow');

}

function toggleBloodRequestSampleTesting(){
	$("#divForBRSampleTesting").toggle('slow');

}

function toggleBloodRequestCrossMatch(){
	$("#divForRequestCrossMatch").toggle('slow');

}

function toggleBloodRequisition(){
	$("#divForBloodRequisition").toggle('slow');

}

function toggleBloodIssue(){
	$("#divForBloodIssue").toggle('slow');

}

function toggleBloodTransfusion(){
	$("#divForBloodTransfusion").toggle('slow');

}


