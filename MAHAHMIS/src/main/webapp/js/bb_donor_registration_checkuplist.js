
/************
* @author	: Akshata Desai
* @date		: 6-May-2021
* @codeFor	: Doctor Details
 ************/
function fetchDoctor(){
	
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
			setAlldoctorMaster(r);
		
			
			$('#doctor_name').val();
			$('#collected_by').val();
			
		}
	});
}
var listofDoctor="";
function setAlldoctorMaster(r){

	
	for ( var int = 1; int < r.listDoctor.length; int++) {
		
		var list=list+'<option value="'+(r.listDoctor[int].user_ID)+'">'+(r.listDoctor[int].doc_name)+'</option>';
		
	}	
	
	$("#doctor_name").html(list);
	$("#collected_by").html(list);
}

function saveCheckuplist(){

	var donorCheckupId = $("#donorCheckupId").val();
	var donor_feeling_good = $("input[name='donor_feeling_good']:checked").val();
	var donor_allergy_record =  $("input[name='allergy_record']:checked").val();
	var donor_previous_health_issue = $("input[name='previous_health_issue']:checked").val();
	var donor_heabit_details= $("#heabit_details").val();
	var donor_weight = $("#weight").val();
	var donor_height = $("#height").val();
	var donor_blood_pressure= $("#blood_pressure").val();
	var donor_temprature= $("#temprature").val();
	var donor_pulse= $("#pulse").val();
	var donor_haemoglobin=$("#haemoglobin").val();
	var donor_doctor_name =$('#doctor_name option:selected').val(); 
	var donor_accept_or_decline=$('#accept_or_decline option:selected').text();
	var donor_checkup_remarks=$("#checkup_remarks").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();
	var donor_treatment_id=$("#donorTreatmentId").val();
	
	var inputs = [];
	inputs.push('donorCheckupId=' + donorCheckupId);
	inputs.push('donorFellingGood=' + donor_feeling_good);
	inputs.push('donorAllergyRecord=' + donor_allergy_record);
	inputs.push('donorPreviousHealthIssue=' + donor_previous_health_issue);
	inputs.push('donorAnyHabit='+donor_heabit_details);
	inputs.push('donorWeight='+donor_weight);
	inputs.push('donorHeight='+donor_height);
	inputs.push('donorBloodPressure='+donor_blood_pressure);
	inputs.push('donorTemprature='+donor_temprature);
	inputs.push('donorPulse='+donor_pulse);
	inputs.push('donorHemoglobin='+donor_haemoglobin);
	inputs.push('donorCheckUpDoneBy='+donor_doctor_name);
	inputs.push('donorCheckUpDoneStatus='+donor_accept_or_decline);
	inputs.push('donorCheckupRemark='+donor_checkup_remarks);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	inputs.push('donorTreatmentId='+donor_treatment_id);
	
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/donor_checkuplist/saveCheckuplist",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Duplicate Data can not be save");
			//alertify.error("Fill all Mandatory feilds");
			return false;
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			getAllBloodDonorsCheckupList();
			ReloadPage();
			clearDonorcheckuplist();
			
		}else{
			alertify.success("Data Updated successfully");
			getAllBloodDonorsCheckupList();
			ReloadPage();
			clearDonorcheckuplist();
			
		}
			
		},		
	})
}

function clearDonorcheckuplist(){
	 $("#title").val();
	 $("#donor_first_name").val();
	 $("#donor_middle_name").val();
	 $("#donor_last_name").val();
     $("#donorCheckupId").val();
     $("input[name='donor_feeling_good']:checked").val();
     $("input[name='allergy_record']:checked").val();
	 $("input[name='previous_health_issue']:checked").val();
	 $("#heabit_details").val();
     $("#weight").val();
	 $("#height").val();
	 $("#blood_pressure").val();
	 $("#temprature").val();
     $("#pulse").val();
	 $("#haemoglobin").val();
	 $('#doctor_name option:selected').val(); 
     $('#accept_or_decline option:selected').text();
 	 $("#checkup_remarks").val();
	 $("#unitId").val();
	 $("#userId").val();
	 $("#donorTreatmentId").val();
}



function saveBloodBagDetails(){
	
	var bloodBagDetailsId = $("#bloodBagDetailsId").val();
	var typeOfBloodBag =$('#type_of_blood_bag option:selected').text();
	var bloodBagDetails =  $('#blood_bag_details option:selected').text();
	var bloodGroup = $('#blood_group option:selected').val();
	var bloodGroupname = $('#blood_group option:selected').text();

	var collectedBy= $('#collected_by option:selected').text();
	var bloodItemName = $('#blood_item_name option:selected').text();
	var volumeOfCollection = $("#volume_of_collection").val();
	var bloodBagDetailsRemarks= $("#blood_bag_details_remarks").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();

	var donor_treatment_id=$("#donorTreatmentId").val();
	var quantity=$("#no_of_barcode").val();
	
	var inputs = [];
	inputs.push('bloodBagDetailsId=' + bloodBagDetailsId);
	inputs.push('typeOfBloodBag=' + typeOfBloodBag);
	inputs.push('bloodBagDetails=' + bloodBagDetails);
	inputs.push('bloodGroup=' + encodeURIComponent(bloodGroup));
	inputs.push('bloodGroupname=' + encodeURIComponent(bloodGroupname));
	inputs.push('collectedBy='+collectedBy);
	inputs.push('bloodItemName='+bloodItemName);
	inputs.push('volumeOfCollection='+volumeOfCollection);
	inputs.push('bloodBagDetailsRemarks='+bloodBagDetailsRemarks);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	inputs.push('donorTreatmentId='+donor_treatment_id);
	inputs.push('quantity='+quantity);
	inputs.push('reactionStatus =' + 'N');
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/donor_checkuplist/saveBloodBagDetails",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Duplicate Data Can not be saved");
			getAllBloodBagMaster();
			clearBloodBag();
		//	location.reload(true);
			clearBloodBag();
	
		},
		success: function(data){
			
			alertify.success("Data Saved successfully");
			var	bagDetailsId=data;
			var	quan=quantity;
			var callfrom='success';
			window.open("bb_barcode_generation_bag_number.jsp?bagDetailsId=" +encodeURIComponent(bagDetailsId)
					+ "&quantity=" + encodeURIComponent(quan)
					+ "&callfrom=" + encodeURIComponent(callfrom));
			getAllBloodBagMaster();	
			//location.reload(true);
			clearBloodBag();
				
		},		
	})
}
//Added By Annapurna
function clearBloodBag(){
	 $("#title").select2('val',0);
	 $("#blood_first_name").val('');
	 $("#blood_middle_name").val('');
	 $("#blood_last_name").val('');
	 $("#type_of_blood_bag").val('');
	 $('#blood_bag_details').val('');
	 $('#blood_group').val('');
     $('#collected_by ').val('');
	 $('#blood_item_name').val('');
	 $('#no_of_barcode ').val('');
	 $('#volume_of_collection ').val('');
	 $("#blood_bag_details_remarks").val('');
	
}
function serachBloodBagDetailsById(value,callform){
	//alert(callform);
	var resultData = [];
	jQuery.ajax({
		async :false,
		type : "POST",
		url : "ehat/donor_checkuplist/serachBloodBagDetailsById",
		data :{
			searchParam : value,
			callform : callform
		},
		error : function() {
			alertify.error('Network Issue');
		},
		
		success : function(r) {
			var template = "";
			var callfrom = "";
			for ( var i = 0; i < r.length; i++) {
				var treatmentId = r[i].donorTreatmentId;
				var arrValue = r[i].bloodBagDetailsId +"-"+r[i].bloodBagDetails+"-"+treatmentId;
				var bloodBagDetailsId = r[i].bloodBagDetailsId;
				resultData.push({
					ID : bloodBagDetailsId,
					Name : arrValue,
					TreamentId : treatmentId
				});
				template = template + '<li data-value="' + bloodBagDetailsId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_blood_name .typeahead").html(template);
				$("#divtext_search_blood_name .typeahead").show();
				
				$("#divtext_search_sample_dispatch .typeahead").html(template);
				$("#divtext_search_sample_dispatch .typeahead").show();
				
				$("#search_blood_number").typeahead({
					source : resultData,
					displayField : 'Name' +" "+'TreamentId',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#search_blood_number").data('typeahead').source = resultData;
			}, 500);
			
		}
	});
	function displayResult(item) {
		
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
		var treatmentId=res[2];
	
		$("#search_blood_number").val(name);	
		getDonorDetailsByTreatmentId(treatmentId,callform);
		getDonorCheckupListDetailsByTreatmentId(treatmentId,callform);
		getPatientDetailsByIdComponentsepration(id);
		getStockListById(id);
		getDiscardStockListById(id);
		
	}
	
}

function getDonorDetailsByTreatmentId(treatmentId,callform){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/donor_checkuplist/getDonorDetailsByTreatmentId",
		data : {
			donorTreatmentId : treatmentId ,
			callform: callform
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(callform =='bloodGroupTesting'){
			if(r.bloodGroupTestingStatus == "Y"){
					alert("Blood Group Testing Done");
				}
				else {
			$('#title').val(r.donorTreatment.donorMaster.patient_title_name);
			$('#title').attr('disabled', 'disabled');
			$('#first_name').val(r.donorTreatment.donorMaster.donorFname);
		    $('#first_name').attr('disabled', 'disabled');
			$('#middle_name').val(r.donorTreatment.donorMaster.donorMname);
		     $('#middle_name').attr('disabled', 'disabled');
			$('#last_name').val(r.donorTreatment.donorMaster.donorLname);
			$('#last_name').attr('disabled', 'disabled');
			
			$('#sample_title').val(r.donorTreatment.donorMaster.title);
			$('#sample_title').attr('disabled', 'disabled');
			$('#sample_first_name').val(r.donorTreatment.donorMaster.donorFname);
			$('#sample_first_name').attr('disabled', 'disabled');
			$('#sample_middle_name').val(r.donorTreatment.donorMaster.donorMname);
			$('#sample_middle_name').attr('disabled', 'disabled');
			$('#sample_last_name').val(r.donorTreatment.donorMaster.donorLname);
			$('#sample_last_name').attr('disabled', 'disabled');

			$('#sampledonorId').val(r.donorTreatment.donorMaster.donorId);
			$('#sampleBloodBagNumber').val(r.bloodBagDetails);
			$('#sampleBloodBagId').val(r.bloodBagDetailsId);
			
			$('#donorTreatmentId').val(r.donorTreatment.donorTreatmentId)
			
			var bloodGroup=r.bloodGroupname;
		
			
			var bloodItemName=r.bloodItemName;
			/*if(bloodItemName==1){
				bloodItemName='Item name1';
			}else{
				bloodItemName='Item name2';
			}*/
			
			  var list = list + "<option value='"+r.bloodBagDetailsId+"' class='un'>" + (r.bloodBagDetails) + "</option>";    
			 $("#type_of_blood_bag_gropu_testing").html(list);
			 
			  var bloodbag = r.typeOfBloodBag;
			  if(bloodbag==""||bloodbag==null||bloodbag==undefined){
				  bloodbag =0;
			  }
			  if(callform!='sample'){
			document.getElementById('bl_type_blood_bag').innerText=bloodbag;
			document.getElementById('bl_blood_bag_no').innerText=r.bloodBagDetails;
			document.getElementById('bl_group').innerText=bloodGroup;
			document.getElementById('bl_blood_item_no').innerText=bloodItemName;
			document.getElementById('bl_volume_collection').innerText=r.volumeOfCollection;
			document.getElementById('bl_remarks').innerText=r.bloodBagDetailsRemarks;
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); 
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;
			document.getElementById('bl_date_collection').innerText=today;
			  }
			
			
		}
	 }
	else if(callform =='sample'){
		if(r.sampleDispatchStatus == "Y"){
					alert("Sample Dispatch Done");
				}
				else {
				$('#title').select2('val',r.donorTreatment.donorMaster.title);
			$('#title').attr('disabled', 'disabled');
			$('#first_name').val(r.donorTreatment.donorMaster.donorFname);
		    $('#first_name').attr('disabled', 'disabled');
			$('#middle_name').val(r.donorTreatment.donorMaster.donorMname);
		     $('#middle_name').attr('disabled', 'disabled');
			$('#last_name').val(r.donorTreatment.donorMaster.donorLname);
			$('#last_name').attr('disabled', 'disabled');
			
			$('#sample_title').val(r.donorTreatment.donorMaster.title);
			$('#sample_title').attr('disabled', 'disabled');
			$('#sample_first_name').val(r.donorTreatment.donorMaster.donorFname);
			$('#sample_first_name').attr('disabled', 'disabled');
			$('#sample_middle_name').val(r.donorTreatment.donorMaster.donorMname);
			$('#sample_middle_name').attr('disabled', 'disabled');
			$('#sample_last_name').val(r.donorTreatment.donorMaster.donorLname);
			$('#sample_last_name').attr('disabled', 'disabled');

			$('#sampledonorId').val(r.donorTreatment.donorMaster.donorId);
			$('#sampleBloodBagNumber').val(r.bloodBagDetails);
			$('#sampleBloodBagId').val(r.bloodBagDetailsId);
			
			$('#donorTreatmentId').val(r.donorTreatment.donorTreatmentId)
			
			var bloodGroup=r.bloodGroupname;
		
			
			var bloodItemName=r.bloodItemName;
			/*if(bloodItemName==1){
				bloodItemName='Item name1';
			}else{
				bloodItemName='Item name2';
			}*/
			
			  var list = list + "<option value='"+r.bloodBagDetailsId+"' class='un'>" + (r.bloodBagDetails) + "</option>";    
			 $("#type_of_blood_bag_gropu_testing").html(list);
			 
			  var bloodbag = r.typeOfBloodBag;
			  if(bloodbag==""||bloodbag==null||bloodbag==undefined){
				  bloodbag =0;
			  }
			  if(callform!='sample'){
			document.getElementById('bl_type_blood_bag').innerText=bloodbag;
			document.getElementById('bl_blood_bag_no').innerText=r.bloodBagDetails;
			document.getElementById('bl_group').innerText=bloodGroup;
			document.getElementById('bl_blood_item_no').innerText=bloodItemName;
			document.getElementById('bl_volume_collection').innerText=r.volumeOfCollection;
			document.getElementById('bl_remarks').innerText=r.bloodBagDetailsRemarks;
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); 
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;
			document.getElementById('bl_date_collection').innerText=today;
			 } 
		}
		
	 }
				else {
			$('#title').select2('val',r.donorTreatment.donorMaster.title);
			$('#title').attr('disabled', 'disabled');
			$('#first_name').val(r.donorTreatment.donorMaster.donorFname);
		    $('#first_name').attr('disabled', 'disabled');
			$('#middle_name').val(r.donorTreatment.donorMaster.donorMname);
		     $('#middle_name').attr('disabled', 'disabled');
			$('#last_name').val(r.donorTreatment.donorMaster.donorLname);
			$('#last_name').attr('disabled', 'disabled');
			
			$('#sample_title').val(r.donorTreatment.donorMaster.title);
			$('#sample_title').attr('disabled', 'disabled');
			$('#sample_first_name').val(r.donorTreatment.donorMaster.donorFname);
			$('#sample_first_name').attr('disabled', 'disabled');
			$('#sample_middle_name').val(r.donorTreatment.donorMaster.donorMname);
			$('#sample_middle_name').attr('disabled', 'disabled');
			$('#sample_last_name').val(r.donorTreatment.donorMaster.donorLname);
			$('#sample_last_name').attr('disabled', 'disabled');

			$('#sampledonorId').val(r.donorTreatment.donorMaster.donorId);
			$('#sampleBloodBagNumber').val(r.bloodBagDetails);
			$('#sampleBloodBagId').val(r.bloodBagDetailsId);
			
			$('#donorTreatmentId').val(r.donorTreatment.donorTreatmentId)
			
			var bloodGroup=r.bloodGroupname;
		
			
			var bloodItemName=r.bloodItemName;
			/*if(bloodItemName==1){
				bloodItemName='Item name1';
			}else{
				bloodItemName='Item name2';
			}*/
			
			  var list = list + "<option value='"+r.bloodBagDetailsId+"' class='un'>" + (r.bloodBagDetails) + "</option>";    
			 $("#type_of_blood_bag_gropu_testing").html(list);
			 
			  var bloodbag = r.typeOfBloodBag;
			  if(bloodbag==""||bloodbag==null||bloodbag==undefined){
				  bloodbag =0;
			  }
			  if(callform!='sample'){
			document.getElementById('bl_type_blood_bag').innerText=bloodbag;
			document.getElementById('bl_blood_bag_no').innerText=r.bloodBagDetails;
			document.getElementById('bl_group').innerText=bloodGroup;
			document.getElementById('bl_blood_item_no').innerText=bloodItemName;
			document.getElementById('bl_volume_collection').innerText=r.volumeOfCollection;
			document.getElementById('bl_remarks').innerText=r.bloodBagDetailsRemarks;
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); 
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;
			document.getElementById('bl_date_collection').innerText=today;
			  }
		}
    }

	});
 }

function getDonorCheckupListDetailsByTreatmentId(treatmentId,callform){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/donor_checkuplist/getDonorCheckupListDetailsByTreatmentId",
		data : {
			donorTreatmentId : treatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=null){
				if(callform!='sample'){
					
				
				 var weight = r.donorWeight;
				  if(weight==""||weight==null||weight==undefined){
					  weight =0;
				  }
				document.getElementById('bl_weight').innerText=+weight+" Kg";
				document.getElementById('bl_height').innerText=r.donorHeight+" Cm";
				document.getElementById('bl_hamoglobin').innerText=r.donorHemoglobin;
				document.getElementById('bl_temprature').innerText=r.donorTemprature;
			}

			}
			
			
		}
	});
}

function saveBloodGroupTesting(){

	var bloodGroupTestingId=$("#bloodGroupTestingId").val();
	var type_of_blood_bag_gropu_testing= $("#type_of_blood_bag_gropu_testing option:selected").text();
	var blood_group_group_testing =$("#blood_group_group_testing option:selected").val();
	var forward_serology = $("input:radio[name=forward_serology]:checked").val();
	var reverse_serology = $("input:radio[name=reverse_serology]:checked").val();
	var blood_group_testing_remark = $("#blood_group_testing_remark").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();
	var donor_treatment_id=$("#donorTreatmentId").val();
	
	var inputs = [];
	inputs.push('bloodGroupTestingId=' + bloodGroupTestingId);
	inputs.push('bloodBagNumber=' + type_of_blood_bag_gropu_testing);
	inputs.push('bloodCellGrouping=' + forward_serology);
	inputs.push('bloodGroup=' + blood_group_group_testing);
	inputs.push('bloodGroup=' + bl_group);
	inputs.push('bloodGroupTestingRemark='+blood_group_testing_remark);
	inputs.push('bloodSerumGrouping='+reverse_serology);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	inputs.push('donorTreatmentId='+donor_treatment_id);
	
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/donor_checkuplist/saveBloodGroupTesting",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			clearBloodGroupTestingForm();
			location.reload(true);
		
			}else{
				alertify.success("Data Updated successfully");
				clearBloodGroupTestingForm();
			location.reload(true);
			}
			getAllBloodGroupTestingList();
			
			clearBloodGroupTestingForm();
		
			
		
		},		
	})
	
	
}
function clearBloodGroupTestingForm(){
	$('#title').select2('val',0);	
	$('#first_name').val("");	
	$('#middle_name').val("");
	$('#last_name').val("");
	$('#blood_group_testing_remark').val("");
	$('#blood_group_group_testing').val("");
	$('#type_of_blood_bag_gropu_testing').val('');
	$("input:radio[name=forward_serology]:checked").val('');
	$("input:radio[name=reverse_serology]:checked").val('');	
	//Added By Annapurna
	$('#bl_type_blood_bag').val('');
	$('#bl_blood_bag_no').val('');
	$('#bl_group').val('');
	$('#bl_blood_item_no').val('');
	$('#bl_volume_collection').val('');
	$('#bl_date_collection').val('');
	$('#bl_remarks').val('');
	$('#bl_weight').val('');
	$('#bl_height').val('');
	$('#bl_hamoglobin').val('');
	$('#bl_temprature').val('');
	
	
	
}


function saveSampleDispatch(){

	var bloodSampleDispatchId=$("#bloodSampleDispatchId").val();
	var title=$("#title").val();
	var title_txt = $('#title option:selected').text();//patienttitle fetched in text	
	var sampleDonorFname=$("#sample_first_name").val();
	var sampleDonorMname=$("#sample_middle_name").val();
	var sampleDonorLname=$("#sample_last_name").val();
	var sampleDonorName =  title_txt +" "+ sampleDonorFname +" "+ sampleDonorMname +" "+ sampleDonorLname;
	var sampleRedCellSerology= $("input:radio[name=red_cell_serology]:checked").val();
	if(sampleRedCellSerology==""||sampleRedCellSerology==undefined||sampleRedCellSerology=="undefined"){
		sampleRedCellSerology=0;
	}
	var sampleTransfusionTransmittedDiseaseLab = $("input:radio[name=transfusion_transmitted_disease_lab]:checked").val();
	if(sampleTransfusionTransmittedDiseaseLab==""||sampleTransfusionTransmittedDiseaseLab==undefined||sampleTransfusionTransmittedDiseaseLab=="undefined"){
		sampleTransfusionTransmittedDiseaseLab=0;
	}
	var sampleComponentSeperation= $("input:radio[name=component_seperation]:checked").val();
	if(sampleComponentSeperation==""||sampleComponentSeperation==undefined||sampleComponentSeperation=="undefined"){
		sampleComponentSeperation=0;
	}
	var sampleDispatchRemarks = $("#sample_dispatch_remarks").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();
	var donor_treatment_id=$("#donorTreatmentId").val();
	var sampledonorId =$("#sampledonorId").val();
	var sampleBloodBagNumber =$("#sampleBloodBagNumber").val();
	
	var sampleItemName= $(':radio[name="red_cell_serology"]:checked, :radio[name="transfusion_transmitted_disease_lab"]:checked,:radio[name="component_seperation"]:checked').length;
	var sampleBloodBagId=$("#sampleBloodBagId").val();
	//return false;
	var inputs = [];
	inputs.push('bloodSampleDispatchId=' + bloodSampleDispatchId);
	inputs.push('sampleDonorName=' + sampleDonorName);
	inputs.push('sampleItemName=' + sampleItemName);
	inputs.push('red_cell_serology=' + sampleRedCellSerology);
	inputs.push('transfusion_trans_disease_lab=' + sampleTransfusionTransmittedDiseaseLab);
	inputs.push('componentSeperation='+sampleComponentSeperation);
	inputs.push('sampleDispatchRemarks='+sampleDispatchRemarks);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	inputs.push('sampleTreatmentId='+donor_treatment_id);
	inputs.push('sampleDonorId='+sampledonorId);
	inputs.push('sampleBloodBagNumber='+sampleBloodBagNumber);
	inputs.push('sampleBloodBagId='+sampleBloodBagId);
	//inputs.push('patient_title_name=' + title_txt);
	inputs.push('ackRemarks='+'N');
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/donor_checkuplist/saveSampleDispatch",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			window.location.reload(true);
			clearSampleDispatch();
			}else{
				alertify.success("Duplicate data");
				window.location.reload(true);
			}
			
			clearSampleDispatch();
			//location.reload(true);
		},		
	})
	
}

function clearSampleDispatch(){
	$('#title').select2('val');
	//$('#sample_title').attr('disabled', false);
	$('#sample_first_name').val('');
	$('#sample_first_name').attr('disabled', false);
	$('#sample_middle_name').val('');
	$('#sample_middle_name').attr('disabled', false);
	$('#sample_last_name').val('');
	$('#sample_last_name').attr('disabled', false);	
	$('#sample_dispatch_remarks').val("");
	$("input:radio[name=red_cell_serology]:checked").val();
	$("input:radio[name=transfusion_transmitted_disease_lab]:checked").val("");	
	$("input:radio[name=component_seperation]:checked").val("");	
	
}

function getSampleDetails(callform){
	//alert("title"+callfrom);
	if(callform=='onload'){
		var date=$("#from_date").val();
		var date1 =date.split('-');
		var formDate = date1[2]+"-"+date1[1]+"-"+date1[0];
		var date2=$("#to_date").val();
		var date3 =date2.split('-');
		var toDate = date3[2]+"-"+date3[1]+"-"+date3[0];
		var sampleStatus=$("#sample_status option:selected").val();
		var sampleSection =$("#sample_section option:selected").val();
		var sampleBloodBagNo=$("#sample_bloodBagNo option:selected").val();
		if(sampleBloodBagNo==undefined||sampleBloodBagNo==""||sampleBloodBagNo=="undefined"){
			sampleBloodBagNo=0;
		}
		
		
	}else{
		//alert("title"+title_txt);
		var date=$("#from_date").val();
		var date1 =date.split('-');
		var formDate = date1[2]+"-"+date1[1]+"-"+date1[0];
		var date2=$("#to_date").val();
		var date3 =date2.split('-');
		var toDate = date3[2]+"-"+date3[1]+"-"+date3[0];
		var sampleSection =$("#sample_section option:selected").val();
		var sampleStatus=$("#sample_status option:selected").val();
		var sampleBloodBagNo=$("#sample_bloodBagNo option:selected").val();
		if(sampleBloodBagNo==undefined||sampleBloodBagNo==""||sampleBloodBagNo=="undefined"){
			sampleBloodBagNo=0;
		}
	}
	
	
	var inputs=[];
	inputs.push('sampleStatus='+encodeURIComponent(sampleStatus));
	inputs.push('formDate='+formDate);
	inputs.push('toDate='+toDate);
	inputs.push('callform='+callform);
	inputs.push('sampleSection='+sampleSection);
	inputs.push('sampleBloodBagNo='+sampleBloodBagNo);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/donor_checkuplist/getSampleDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
		setSampleDetails(r);
		//if(callform!='onload'){
			setSanpleBagDetails(r);
			//$('#sample_bloodBagNo').val();
		//}
		
		}
	});
	
	
	
}

function setSampleDetails(result){
	var r = result;
	var divContent = "";
	total = 0;
	
	divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";

	for ( var i = 0; i < r.length; i++) {
	
		var date=new Date(r[i].createdDate).toLocaleString('en-GB');
		var sampleItemName= r[i].sampleItemName;	
		
		if(sampleItemName==1){
			sampleItemName='Red cell serology';
		}
		
		if(sampleItemName==2){
			sampleItemName='Transfusion Transmitted Disease Lab';
		}
		
		if(sampleItemName==3){
			sampleItemName='Component Seperation';
		}
			redCellSerology='Red cell serology';
			divContent = divContent + "<tr><td><input type='checkbox' name='checkid' id='checkid' onclick='checkRecieve("+r[i].bloodSampleDispatchId+")'/></td><td>"
			+ sampleItemName + "</td><td>" + r[i].sampleDonorName
			+ "</td><td>" + r[i].sampleBloodBagNumber + "</td><td>"+date+"</td>" +"</td>"
			if(sampleItemName == 1){
				if(r[i].sampleDispatchRemarks == "NULL" || r[i].sampleDispatchRemarks == null || r[i].sampleDispatchRemarks == ""){
					divContent =	divContent + "<td><input type='text' placeholder='Remarks' name='remarks' id='remark' /> </td></tr>";
					}else{
						divContent = divContent 	+ "<td>"+r[i].sampleDispatchRemarks+"</td></tr>";
					}
				
			}else{
				if(r[i].sampleDispatchRemarks == "NULL" || r[i].sampleDispatchRemarks == null || r[i].sampleDispatchRemarks == ""){
					divContent =	divContent + "<td><input type='text' placeholder='Remarks' name='remarks' id='remark' /> </td></tr>";
					}else{
						
						divContent = divContent 	+ "<td>"+r[i].sampleDispatchRemarks+"</td></tr>";
					}
				
			}
			
					/*"<td><input type='text' placeholder='Remarks' name='remarks' id='remark' /> </td></tr>";*/
		
	}

	$("#sampleDetails").html(divContent);
}

function setSanpleBagDetails(r){
	var list="<option value='0'>select</option>";
		
		for ( var int = 0; int < r.length; int++) {
			
			list=list+'<option value="'+(r[int].sampleBloodBagId)+'" onclick="getSampleDetails('+r[int].sampleBloodBagId+')">'+(r[int].sampleBloodBagNumber)+'</option>';
			
		}	
		
		$("#sample_bloodBagNo").html(list);
	}

function checkRecieve(checkid){
	$("#bloodSampleDispatchId").val(checkid);
}



function saveSampleAcknowledge(id){
	var bloodDispatchId=$("#bloodSampleDispatchId").val();
	var remarks =$("#remark").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor_checkuplist/saveSampleAcknowledge",
		data : {
			bloodDispatchId : bloodDispatchId,
			sampleStatus : id,
			remarks : remarks,
			ackRemarks : 'Y'
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {	
			alertify.success("Data Saved successfully");
			location.reload(true);
		}
	});
	
}


function selects(){  
    var ele=document.getElementsByName('checkid');  
    for(var i=0; i<ele.length; i++){  
        if(ele[i].type=='checkbox')  
            ele[i].checked=true;  
    }  
}  

function serachBloodBagNumberById(value,callform){
	var resultData = [];
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/donor_checkuplist/serachBloodBagDetailsById",
		data :{
			searchParam : value,
			callform:callform
			
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			var template = "";
			for ( var i = 0; i < r.length; i++) {
				var arrValue = r[i].bloodBagDetailsId +"-"+r[i].bloodBagDetails;
				var bloodBagDetailsId = r[i].bloodBagDetailsId;
				resultData.push({
					ID : bloodBagDetailsId,
					Name : arrValue
				
				});
				template = template + '<li data-value="' + bloodBagDetailsId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_bag_number .typeahead").html(template);
				$("#divtext_search_bag_number .typeahead").show();
				
				$("#search_bag_number").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#search_bag_number").data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];		
		$("#search_bag_number").val(name);	
		$("#bagDetailsNo").val(id);
		
	}
	
}

function bagDetailsBarcodePrint(callform,id,quantity){
	
	var bagDetailsId= bagDetailsId=$("#bagDetailsNo").val();
	var quantity= quantity = $("#quantity").val();					
	window.open("bb_barcode_generation_bag_number.jsp?bagDetailsId=" +encodeURIComponent(bagDetailsId)
			+ "&quantity=" + encodeURIComponent(quantity)
			+ "&callform=" + encodeURIComponent(callform));
}

//Uncommented

function getBagDetails(){
	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor_checkuplist/getBagDetails",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setBagDetails(r);			
			$("#blood_bag_no").val();
		}
	});
}

function setBagDetails(result){
	var r=result;
	var list="<option value='0'>select</option>";
	
	for ( var int = 0; int < r.listDonorBloodBagDetails.length; int++) {
		
		list=list+'<option value="'+(r.listDonorBloodBagDetails[int].bloodBagDetailsId)+'">'+(r.listDonorBloodBagDetails[int].bloodBagDetails)+'</option>';
		
	}	
	
	$("#blood_bag_no").html(list);
}


//-----aniket kanse 26 MAY 21
function getBloodGrpDetails(){

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_group_master/getAllBloodGroupMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodGrpDetails(r);			
		}
	});
}

function setBloodGrpDetails(r){
	
	// var list = "";
	var list = "<option value=0 class='un'>SELECT</option>";
	
    for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {  
    	

        list = list + "<option value='"+r.lstBloodGroupMaster[i].bloodGroupId+"' class='un'>" + (r.lstBloodGroupMaster[i].bloodGrouptName) + "</option>";    
    }  
   // list = list + "<option value='-1' class='un'></option>";  
    $("#txt_blood_group").html(list);
    $("#blood_group").html(list);
}

//var setBloodItemsList = '<option value="0">select</option>{#foreach $T.lstBloodItemMaster as cdl}<option value="{$T.cdl.bloodItemId}">{$T.cdl.prefix}{$T.cdl.bloodItemName}</option>{#/for}';

function getBloodItemsDetails(){

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_item/getAllBloodItemMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodItemsDetails(r);		
			
			/*ajaxResponse = r;
			// alert(ajaxResponse);
			prjobj = eval('(' + ajaxResponse + ')');
			$("#blood_item_name").setTemplate(setRefByTemp2);
			$("#blood_item_name").processTemplate(prjobj);
			$("#blood_item_name").select2();*/
		}
	});
}

function setBloodItemsDetails(r){
	
	var list = "<option value=0 class='un'>SELECT</option>";
	
    for ( var i = 0; i < r.lstBloodItemMaster.length; i++) {  

        list = list + "<option value='"+r.lstBloodItemMaster[i].bloodItemId+"' class='un'>" + (r.lstBloodItemMaster[i].bloodItemName) + "</option>";    
    }  
   // list = list + "<option value='-1' class='un'></option>";  
    $("#blood_item_name").html(list);
	
}

function getAllBloodTypeMaster(){
	
	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor_checkuplist/getAllBloodTypeMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setAllTypeMaster(r);
		
			
			$('#type_of_blood_bag').val();
			
			
		}
	});
}

function setAllTypeMaster(r){
	
var list = "<option value=0 class='un'>SELECT</option>";
	
    for ( var i = 0; i < r.lstBloodTypeMaster.length; i++) {  

        list = list + "<option value='"+r.lstBloodTypeMaster[i].bloodTypeId+"' class='un'>" + (r.lstBloodTypeMaster[i].bloodTypeName) + "</option>";    
    }  
   
    $("#type_of_blood_bag").html(list);
	
}


function getAllBloodBagMaster(){
	
	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor_checkuplist/getAllBloodBagMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setAllBagMaster(r);
		
			
			$('#blood_bag_details').val();
			$('#sel_bloodBagId').val();
			
		}
	});
}

function setAllBagMaster(r){
	
var list = "<option value=0 class='un'>SELECT</option>";
	
    for ( var i = 0; i < r.lstBloodBagMaster.length; i++) {  

        list = list + "<option value='"+r.lstBloodBagMaster[i].bloodBagId+"' class='un'>" + (r.lstBloodBagMaster[i].bloodBagtName) + "</option>";    
    }  
   
    $("#blood_bag_details").html(list);
    $("#sel_bloodBagId").html(list);
    $("#sel_bloodBagNumber").html(list);

    
	
}

function getAllBloodDonorsCheckupList(){
	
	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor_checkuplist/getAllBloodDonorsCheckupList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
		setAllBloodDonorsCheckupList(r);	
			
		}
	});
}
//Added BY Annapurna
function clearDonorCheckupListForm(){
	$('#title').val();
	$('#title').attr('disabled', false);
	$('#txt_first_name').val("");
	$('#txt_first_name').attr('disabled', false);
	$('#txt_middle_name').val("");
	$('#txt_middle_name').attr('disabled', false);
	$('#txt_last_name').val("");
	$('#txt_last_name').attr('disabled', false);
	$('#txt_birth_date').val("");
	$('#txt_birth_date').attr('disabled', false);
	$('#ta_address').val("");
	$('#ta_address').attr('disabled', false);
	$('#txt_occupation').val("");
	$('#txt_occupation').attr('disabled', false);
	$('#txt_contact1').val("");
	$('#txt_contact1').attr('disabled', false);
	$('#txt_contact2').val("");
	$('#txt_contact2').attr('disabled', false);
	$('#txt_age').val("");
	$('#txt_age').attr('disabled', false);
	$('#txt_blood_group').val("");
	$('#txt_blood_group').attr('disabled', false);
	$("input:radio[name=ra_gender]:checked").val();
	$("input:radio[name='ra_gender']").attr('disabled', false);			
}



function setAllBloodDonorsCheckupList(r){


	var htm = "";
	var index = 1;

		for ( var i = 0; i < r.lstDonorCheckupList.length; i++) {
			var date=new Date(r.lstDonorCheckupList[i].createdDate ).toLocaleString('en-GB');
			//
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstDonorCheckupList[i].donorCheckupId	
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstDonorCheckupList[i].donor_id	
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstDonorCheckupList[i].donor_name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstDonorCheckupList[i].donorCheckUpDoneStatus
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ date
				+ '</td>'
				
				if(r.lstDonorCheckupList[i].collectionStatus == "Y"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button disabled class="btn btn-xs btn-success" onclick=editBloodDonorCheckupList('
					+ r.lstDonorCheckupList[i].donor_treatment_id
					+ ')><i class="fa fa-edit"></i></button></td>'
				}else{
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodDonorCheckupList('
					+ r.lstDonorCheckupList[i].donor_treatment_id
					+ ')><i class="fa fa-edit"></i></button></td>'
				}
				
				htm = htm + ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodDonorCheckupList('
				+ r.lstDonorCheckupList[i].donorCheckupId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				
				//Added By Annapurna
				if(r.lstDonorCheckupList[i].donorCheckUpDoneStatus=="Accept" ){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button   class="btn btn-xs btn-info" onclick=sendBagCollectionList('
					+ r.lstDonorCheckupList[i].donor_id+","+r.lstDonorCheckupList[i].donor_treatment_id
					+ ')><i class="fa fa-cloud-upload"></i></button></td>'		
				}
				else{
					//alert(r.lstDonorCheckupList[i].donorCheckUpDoneStatus);
					htm = htm + ' <td class="col-md-1 center">'
				+ '	<button disabled class="btn btn-xs btn-info" onclick=sendBagCollectionList('
				+ r.lstDonorCheckupList[i].donor_id+","+r.lstDonorCheckupList[i].donor_treatment_id
				+ ')><i class="fa fa-cloud-upload"></i></button></td>'
				}
				+ '</tr>';
				index++;
			}
			
		
	
	$("#BloodDonorsCheckupListDetails").html(htm);


}

function sendBagCollectionList(donorId,donorTreatmentId){
	window.location.href = "bb_blood_bag_collection.jsp?" + "donorId=" + encodeURIComponent(donorId)+  "&donorTreatmentId=" + encodeURIComponent(donorTreatmentId);
	defaultFetchPatientTitle("checkuplist");

	
}

function editBloodDonorCheckupList(donorId){
	$("#divCheckupList").show('slow');

	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var inputs = [];
		inputs.push('id=' + donorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/donor_checkuplist/editBloodDonorCheckupList",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				//toggleCheckUpListDiv();
				
				for(var i=0; i< r.lstDonorCheckupList.length;i++){
				
					$("#title").select2('val',r.lstDonorCheckupList[0].title);
					$('#user_title').attr('disabled','disabled');
					$("#donor_first_name").val(r.lstDonorCheckupList[0].first_name);
					$('#donor_first_name').attr('disabled','disabled');
					$("#donor_middle_name").val(r.lstDonorCheckupList[0].middle_name);
					$('#donor_middle_name').attr('disabled','disabled');
					$("#donor_last_name").val(r.lstDonorCheckupList[0].last_name);
					$('#donor_last_name').attr('disabled','disabled');
					$("#heabit_details").val(r.lstDonorCheckupList[0].donorAnyHabit);
					$('#first_name').attr('disabled','disabled');
					
					$("#weight").val(r.lstDonorCheckupList[0].donorWeight);
					
					
					$("#height").val(r.lstDonorCheckupList[0].donorHeight);
					$("#blood_pressure").val(r.lstDonorCheckupList[0].donorBloodPressure);
					$("#temprature").val(r.lstDonorCheckupList[0].donorTemprature);
					var pulse = r.lstDonorCheckupList[0].donorPulse;
					if(pulse == null || pulse == 'NULL'){
						pulse=0;
					}
					$("#pulse").val(pulse);
					$("#haemoglobin").val(r.lstDonorCheckupList[0].donorHemoglobin);
					$("#doctor_name option[value='"+r.lstDonorCheckupList[0].donorCheckUpDoneBy+"']");
					$("#doctor_name option:selected").text(r.lstDonorCheckupList[0].doc_name);
					//$("#doctor_name").val(r.lstDonorCheckupList[0].doc_name).attr("selected", "selected");;
					$("#accept_or_decline").val(r.lstDonorCheckupList[0].donorCheckUpDoneStatus).attr("selected", "selected");;
					$("#checkup_remarks").val(r.lstDonorCheckupList[0].donorCheckupRemark);
					
					$("input:radio[name='donor_feeling_good'][value='"+r.lstDonorCheckupList[0].donorFellingGood+"']").prop("checked",true);
					$("input:radio[name='allergy_record'][value='"+r.lstDonorCheckupList[0].donorAllergyRecord+"']").prop("checked",true);
					$("input:radio[name='previous_health_issue'][value='"+r.lstDonorCheckupList[0].donorPreviousHealthIssue+"']").prop("checked",true);
					$("#donorCheckupId").val(r.lstDonorCheckupList[0].donorCheckupId);
					$('#donorTreatmentId').val(r.lstDonorCheckupList[0].donorTreatmentId);
					
				}
			}
		});
	}

}

function deleteBloodDonorCheckupList(donorCheckupId){


	if(donorCheckupId !=undefined && donorCheckupId!=null && donorCheckupId!="" && donorCheckupId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/donor/deleteBloodDonorCheckup",
				data : {
					"donorCheckupId" : donorCheckupId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllBloodDonorsCheckupList();
				}
			});
		}
	}
	
}





function searchCheckupDonorByName(value,callfrom){
	var resultData = [];
	jQuery.ajax({
		async : false,
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
				$("#divtext_search_name_checkup .typeahead").html(template);
				$("#divtext_search_name_checkup .typeahead").show();
				
				
				
				$("#text_search_name_checkup").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
			
				
				$("#text_search_name_checkup").data('typeahead').source = resultData;
			
				
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
		$("#text_search_name_checkup").val(name);	
		getDonorByIdCheckup(id,callfrom);
		//getAllBloodDonorsCheckupList();
		getDonorDetailsByIdBloodTesting(id);
		getDonorDetailsByIdTestRegister(id);
		getDonorDetailsByIdOrganDonation(id);
		
	}
}

function getDonorByIdCheckup(id,Callform){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor_checkuplist/getDonorByIdCheckup",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			//alert("hii"+r);
			if(r!=null){
				
					var htm="";
					var index=1;
					for ( var i = 0; i < r.lstDonorCheckupList.length; i++) {
					var datetime= new Date(r.lstDonorCheckupList[i].createdDate).toLocaleDateString('en-GB');
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDonorCheckupList[i].donorCheckupId	
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDonorCheckupList[i].donor_id	
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+  r.lstDonorCheckupList[i].first_name +" "+ r.lstDonorCheckupList[i].middle_name +" "+ r.lstDonorCheckupList[i].last_name 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lstDonorCheckupList[i].donorCheckUpDoneStatus 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datetime
					+ '</td>'
					if(r.lstDonorCheckupList[i].collectionStatus == "Y"){
						htm = htm + ' <td class="col-md-1 center">'
						+ '	<button disabled class="btn btn-xs btn-success" onclick=editBloodDonorCheckupList('
						+ r.lstDonorCheckupList[i].donorTreatmentId	
						+ ')><i class="fa fa-edit"></i></button></td>'
					}else{
						htm = htm + ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editBloodDonorCheckupList('
						+ r.lstDonorCheckupList[i].donorTreatmentId	
						+ ')><i class="fa fa-edit"></i></button></td>'
					}
					
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodDonorCheckupList('
					+ r.lstDonorCheckupList[i].donorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info" onclick=sendBagCollectionList('
					+ r.lstDonorCheckupList[i].donor_id+","+r.lstDonorCheckupList[i].donorTreatmentId	
					+ ')><i class="fa fa-cloud-upload"></i></button></td>'
					
					htm = htm
					+ '</tr>';
					
					}
					$("#BloodDonorsCheckupListDetails").html(htm);
			}
	
		}
	});
}
function clearBag(){
	$('#title').val();
	$('#blood_first_name').val("");
	$('#blood_middle_name').val("");
	$('#blood_last_name').val("");
	
}


function ReloadPage(){
	window.location="bb_donor_checkuplist.jsp?";
}

function getDonorDetailsByIdBloodTesting(id){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bloodBank/getDonorDetailsByIdBloodTesting",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if(r!=null){
				
				var htm = "";
				var index = 1;
								
						for ( var i = 0; i < r.lstBloodGroupTestingDto.length; i++) {
							var datetime1= new Date(r.lstBloodGroupTestingDto[i].createdDate).toLocaleString('en-GB');
						
							htm = htm
									+ '<tr> '
									+ ' <td class="col-md-1 center">'
									+ index
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.lstBloodGroupTestingDto[i].bloodGroupTestingId
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.lstBloodGroupTestingDto[i].donor_id
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.lstBloodGroupTestingDto[i].donorTreatmentId
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.lstBloodGroupTestingDto[i].donor_name
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.lstBloodGroupTestingDto[i].bloodBagNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ datetime1
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-success" onclick=editBloodGroupTesting('
									+ +r.lstBloodGroupTestingDto[i].donorTreatmentId
									+ ')><i class="fa fa-edit"></i></button></td>'
									+ ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodGroupTesting('
									+ r.lstBloodGroupTestingDto[i].bloodGroupTestingId	
									+ ')><i class="fa fa-trash-o"></i></button></td>'
									
									+ '</tr>';
							index++;
						}
						$('#BloodDonorGroupTestingListDetails').html(htm);
			}
		   }
		});
	}


//Added By Annapurna

function getAllSampleDispatchList(){
	
	var unitId = $("#unitId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('lastDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/donor_checkuplist/getAllSampleDispatchList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSampleDispatchList(r, "All");
		}
	});
}

function setAllSampleDispatchList(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		
			for ( var i = 0; i < r.donorSampleDispatchList.length; i++) {
				var sampleItemName1= r.donorSampleDispatchList[i].sampleItemName
				if(sampleItemName1==1){
		        	sampleItemName1='Red cell serology';
		              }
	            	if (sampleItemName1==2){
		             sampleItemName1='Transfusion Transmitted Disease Lab';
		              }	
                   if(sampleItemName1==3){
	                sampleItemName1='Component Seperation';
                         }
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.donorSampleDispatchList[i].bloodSampleDispatchId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.donorSampleDispatchList[i].sampleDonorId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.donorSampleDispatchList[i].sampleDonorName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.donorSampleDispatchList[i].sampleBloodBagNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ sampleItemName1
						
						
						
						+ '</td>'
						+ '</tr>';
				index++;
			
		} 
	}
	$("#dispatchhlist").html(htm);
	
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
				