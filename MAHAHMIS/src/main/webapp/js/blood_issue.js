function searchpatientDetails(value){
		var resultData = []
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/blood_issue/searchpatientDetails",
			data :{
				searchParam : value
			},
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				var template = "";
				for ( var j = 0; j < r.length; j++) {
					var patientName=r[j].fName+" "+r[j].mName+" "+r[j].lName;
					var arrValue = r[j].patient_ID +"-"+patientName;
					var patientId = r[j].patient_ID;
					var patientFname = r[j].fName;
					resultData.push({
						ID : patientId,
						Name : arrValue
					
					});
					template = template + '<li data-value="' + patientId + '" class=""><a href="#">' + arrValue + '</a></li>';
				}
				
				setTimeout(function() {
					$("#divtext_search_blood_request .typeahead").html(template);
					$("#divtext_search_blood_request .typeahead").show();
					
					$("#search_patient").typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#search_patient").data('typeahead').source = resultData;
				}, 500);
				
			}
		});
		function displayResult(item) {
			
			var res = item.text.split('-');
			var id = res[0];
			var name = res[1];
		
			$("#search_patient").val(name);	
			getPatientDetailsById(id);
			getPatientDetailsByIdBloodrequest(id);
		
			
		}
		
	
}




function getPatientDetailsById(id){
jQuery.ajax({
	async : true,
	type : "POST",
	url : "ehat/blood_issue/getPatientDetailsById",
	data : {
		id : id
	},
	cache : false,
	error : function() {
		alertify.error('Network Issue');
	},
	success : function(r) {
		
		$('#f_name').val(r.fName);
		$('#m_name').val(r.mName);
		$('#l_name').val(r.lName);
		$('#age').val(r.age1);
		$('#height').val(r.height);
		$('#weight').val(r.weight);
		$('#contact1').val(r.mobile);
		$('#contact2').val(r.officeNumber);
		$('#ward_name').val(r.wtType);
		$('#bed_number').val(r.bedNo);
		var bloodGroup=r.bloodGroup;
		if(bloodGroup==1){
			bloodGroup='A+';
		}else if(bloodGroup==2){
			bloodGroup='AB+';
		}else{
			bloodGroup='AB-';
		}
		$('#blood_group').val(bloodGroup)
		gender=r.sex;
		if(gender=='Male'){
			gender=1;
		}else if(gender=='Female'){
			gender=2;
		}else{
			gender=3;
		}
		$("input:radio[name='pa_gender'][value='"+gender+"']").prop("checked",true);	
		$("input:radio[name='pa_gender']").attr('disabled', 'disabled');
	}
});
}

function toggleBloodRequestDiv(){
	$("#bloodRequestfrom").show();
}

function saveBloodRequest(){
	var bloodRequestId=$("#bloodRequestId").val();
	var title=$("#title").val();
	var title_txt = $.trim($('#title option:selected').text());//patienttitle fetched in text
	var fName=$.trim($("#f_name").val());
	var mName=$.trim($("#m_name").val());
	var lName=$.trim($("#l_name").val());
	var patientName=title_txt +" "+fName+" "+mName+" "+lName;
	var contactNo1=$("#contact1").val();
	var contactNo2=$("#contact2").val();
	var age =$("#age").val();
	var pa_gender=$("input:radio[name=pa_gender]:checked").val();
	var blood_group=$("#blood_group").val();
	var blood_group_name = $.trim($('#blood_group option:selected').text());//BloodGroupname fetched in text
	var haemoglobin=$("#haemoglobin").val();
	var height=$("#height").val();
	var weight = $("#weight").val();
	var ward_name=$("#ward_name").val();
	var bed_number=$("#bed_number").val();
	var priority=$("#priority").val();
	var remarks=$("#remarks").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();
	
	
	var listCompObj = {
			listbloodRequestSlave : []
		};
	 var table = document.getElementById("componentTabel");
     var rowCount = table.getElementsByTagName("tr").length;
		for ( var i = 1; i <= rowCount; i++) {
			
             var blood_slave_id=$("#blood_slave_id" + i).val();             
             var plasma_volume = $("#txt_volume_" + i).val();
             var plasma = $("#component_name_" +i).text();  
             
			setlistCompObj(listCompObj,blood_slave_id,plasma_volume,plasma);				
		}
	    
		listCompObj = JSON.stringify(listCompObj);
		
	var inputs = [];
	inputs.push("listCompObj="+ encodeURIComponent(listCompObj));	
	inputs.push('bloodRequestId=' + bloodRequestId);
	inputs.push('patientName=' + patientName);
	inputs.push('contactNo1=' + contactNo1);
	inputs.push('contactNo2=' + contactNo2);
	inputs.push('age='+age);
	inputs.push('gender='+pa_gender);	
	inputs.push('haemoglobin='+haemoglobin);
	inputs.push('height='+height);
	inputs.push('weight='+weight);
	inputs.push('wardName='+ward_name);
	inputs.push('bedNumber='+bed_number);
	inputs.push('bloodGroup='+blood_group);
	inputs.push('priority='+priority);
	inputs.push('remarks='+remarks);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	inputs.push('bloodgroupname='+blood_group_name);
	
	inputs.push('title='+title);//Added By Annapurna
	
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		async: false,
		type :"POST",
		url :"ehat/blood_issue/saveBloodRequest",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			location.reload(true);
			}else{
				alertify.success("Data Updated successfully");
				location.reload(true);
			}
			
		
		},		
	})
}

function setlistCompObj(listCompObj,blood_slave_id,plasma_volume,plasma){
	
	listCompObj.listbloodRequestSlave.push({
		componentId :blood_slave_id,
		componentName : plasma,
		collectionVolume :plasma_volume,
		
	});
	
}

function searchPatientDetailsById(value,callform){
	
	var resultData = []
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/blood_issue/searchPatientDetailsById",
		data :{
			searchParam : value ,
			callform:callform
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.length; j++) {
				var patientName=r[j].patientName;
				var arrValue = r[j].bloodRequestId +"-"+patientName;
				var requestId = r[j].bloodRequestId;
				resultData.push({
					ID : requestId,
					Name : arrValue
				
				});
				template = template + '<li data-value="' + requestId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_sample_dispatch .typeahead").html(template);
				$("#divtext_search_sample_dispatch .typeahead").show();
				
				$("#divtext_search_bloodRequest .typeahead").html(template);
				$("#divtext_search_bloodRequest .typeahead").show();
				

				
				$("#search_request_id").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#search_request_id").data('typeahead').source = resultData;
			}, 500);
			
		}
	});
	function displayResult(item) {
		
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
	
		$("#search_request_id").val(name);	
		getPatientDetailsByRequestId(id,callform);
		getPatientDetailsByIdBloodrequestlist(id);
	}
	

}

//Added By Annapurna
function getPatientDetailsByIdBloodrequestlist(id){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getPatientDetailsByIdBloodrequestlist",
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
				
					
					for ( var i = 0; i < r.lstBloodRequest.length; i++) {
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstBloodRequest[i].bloodRequestId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstBloodRequest[i].patientName
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstBloodRequest[i].bloodgroupname
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.lstBloodRequest[i].priority_name
								+ '</td>'		
								+ '<td class="col-md-1 center">'
								+ '<button class="btn btn-xs btn-success" onclick=editRequestDetails('
								+ r.lstBloodRequest[i].bloodRequestId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ '<td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteRequestDetails('
								+ r.lstBloodRequest[i].bloodRequestId
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
						index++;
				}
				
				$("#bloodRequestetails").html(htm);

		}
	   }
	});
}


function getPatientDetailsByRequestId(id,callform){
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/blood_issue/getPatientDetailsByRequestId",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var patientName=r.patientName;
			var ptName=patientName.split(" ");
			var title=ptName[0];
			var fName=ptName[1];
			var mName=ptName[2];
			var lName=ptName[3];
			if(callform=='bloodRequsition'){	
				$('#title').val(title);
				$('#title').attr('disabled', 'disabled');
				$('#br_fname').val(fName);
				$('#br_fname').attr('disabled', 'disabled');
				$('#br_mname').val(mName);
				$('#br_mname').attr('disabled', 'disabled');
				$('#br_lname').val(lName);
				$('#br_lname').attr('disabled', 'disabled');
				$('#br_contactno1').val(r.contactNo1);
				$('#br_contactno1').attr('disabled', 'disabled');
				$('#br_contactno2').val(r.contactNo2);
				$('#br_contactno2').attr('disabled', 'disabled');
				$('#br_age').val(r.age);
				$('#br_age').attr('disabled', 'disabled');
				$('#br_bloodgroup').val(r.bloodgroupname);
				$('#br_bloodgroup').attr('disabled', 'disabled');
				$('#br_haemoglobin').val(r.haemoglobin);
				$('#br_haemoglobin').attr('disabled', 'disabled');
				$('#br_height').val(r.height);
				$('#br_height').attr('disabled', 'disabled');
				$('#br_weight').val(r.weight);
				$('#br_weight').attr('disabled', 'disabled');
				$('#br_wardname').val(r.wardName);
				$('#br_wardname').attr('disabled', 'disabled');
				$('#br_bedno').val(r.bedNumber);
				$('#br_bedno').attr('disabled', 'disabled');
				$("input:radio[name='br_gender'][value='"+r.gender+"']").prop("checked",true);	
				$("input:radio[name='br_gender']").attr('disabled', 'disabled');
				getCrossMatchListByID(id,callform);
				getAllpriority();
				
				}
				else if(callform=='bloodIssue'){
					//$('#user_title').val(title);
					$('#title').val(title);
					$('#title').attr('disabled', 'disabled');
					$('#first_name').val(fName);
					$('#first_name').attr('disabled', 'disabled');
					$('#middle_name').val(mName);
					$('#middle_name').attr('disabled', 'disabled');
					$('#last_name').val(lName);
					$('#last_name').attr('disabled', 'disabled');
					$('#contact1').val(r.contactNo1);
					$('#contact1').attr('disabled', 'disabled');
					$('#contact2').val(r.contactNo2);
					$('#contact2').attr('disabled', 'disabled');
					$('#age').val(r.age);
					$('#age').attr('disabled', 'disabled');
					$('#blood_group').val(r.bloodgroupname);
					$('#blood_group').attr('disabled', 'disabled');
					$('#haemoglobin').val(r.haemoglobin);
					$('#haemoglobin').attr('disabled', 'disabled');
					$('#height').val(r.height);
					$('#height').attr('disabled', 'disabled');
					$('#weight').val(r.weight);
					$('#weight').attr('disabled', 'disabled');
					$('#ward_name').val(r.wardName);
					$('#ward_name').attr('disabled', 'disabled');
					$('#bed_number').val(r.bedNumber);
					$('#bed_number').attr('disabled', 'disabled');
					$("input:radio[name='gender'][value='"+r.gender+"']").prop("checked",true);	
					$("input:radio[name='gender']").attr('disabled', 'disabled');
					getCrossMatchListByID(id,callform);
				    getAllpriority();
				
				}else if(callform=='transfusion'){
				//	$('#tr_title').val(title);
					$('#title').val(title);
					//$('#tr_title').attr('disabled', 'disabled');
					$('#tr_fname').val(fName);
					$('#tr_fname').attr('disabled', 'disabled');
					$('#tr_mname').val(mName);
					$('#tr_mname').attr('disabled', 'disabled');
					$('#tr_lname').val(lName);
					$('#tr_lname').attr('disabled', 'disabled');
					$('#tr_contact1').val(r.contactNo1);
					$('#tr_contact1').attr('disabled', 'disabled');
					$('#tr_contact2').val(r.contactNo2);
					$('#tr_contact2').attr('disabled', 'disabled');
					$('#tr_age').val(r.age);
					$('#tr_age').attr('disabled', 'disabled');
					$('#tr_bloodgroup').val(r.bloodgroupname);
					$('#tr_bloodgroup').attr('disabled', 'disabled');
					$('#tr_haemoglobin').val(r.haemoglobin);
					$('#tr_haemoglobin').attr('disabled', 'disabled');
					$('#tr_height').val(r.height);
					$('#tr_height').attr('disabled', 'disabled');
					$('#tr_weight').val(r.weight);
					$('#tr_weight').attr('disabled', 'disabled');
					$('#tr_wardname').val(r.wardName);
					$('#tr_wardname').attr('disabled', 'disabled');
					$('#tr_bedno').val(r.bedNumber);
					$('#tr_bedno').attr('disabled', 'disabled');
					$("input:radio[name='tr_gender'][value='"+r.gender+"']").prop("checked",true);	
					$("input:radio[name='tr_gender']").attr('disabled', 'disabled');
					$("#bloodRequestId").val(r.bloodRequestId);
				//	getAllCrossMatch(r.bloodRequestId,'transfusion');
					getCrossMatchListByID(id,callform);
				 //   getAllpriority();
					getTransfusionDetails(r.bloodRequestId);
				}
				else{
			
			$('#title').val(title);
			$('#bi_fname').val(fName);
			$('#bi_fname').attr('disabled', 'disabled');
			$('#bi_mname').val(mName);
			$('#bi_mname').attr('disabled', 'disabled');
			$('#bi_lname').val(lName);
			$('#bi_lname').attr('disabled', 'disabled');
			$('#bi_contactno1').val(r.contactNo1);
			$('#bi_contactno1').attr('disabled', 'disabled');
			$('#bi_contactno2').val(r.contactNo2);
			$('#bi_contactno2').attr('disabled', 'disabled');
			$('#bi_age').val(r.age);
			$('#bi_age').attr('disabled', 'disabled');
			$('#bi_bloodgroup').val(r.bloodgroupname);
			$('#bi_bloodgroup').attr('disabled', 'disabled');
			$('#bi_haemoglobin').val(r.haemoglobin);
			$('#bi_haemoglobin').attr('disabled', 'disabled');
			$('#bi_height').val(r.height);
			$('#bi_height').attr('disabled', 'disabled');
			$('#bi_weight').val(r.weight);
			$('#bi_weight').attr('disabled', 'disabled');
			$('#bi_wardname').val(r.wardName);
			$('#bi_wardname').attr('disabled', 'disabled');
			$('#bi_bedno').val(r.bedNumber);
			$('#bi_bedno').attr('disabled', 'disabled');
			$("input:radio[name='bi_gender'][value='"+r.gender+"']").prop("checked",true);	
			$("input:radio[name='bi_gender']").attr('disabled', 'disabled');
			
			$('#bloodRequestId').val(r.bloodRequestId);
			$('#priority').val(r.priority);
			
			$('#title').val(title);
			$('#ti_fname').val(fName);
			$('#ti_fname').attr('disabled', 'disabled');
			$('#ti_mname').val(mName);
			$('#ti_mname').attr('disabled', 'disabled');
			$('#ti_lname').val(lName);
			$('#ti_lname').attr('disabled', 'disabled');
			$('#ti_contactno1').val(r.contactNo1);
			$('#ti_contactno1').attr('disabled', 'disabled');
			$('#ti_contactno2').val(r.contactNo2);
			$('#ti_contactno2').attr('disabled', 'disabled');
			$('#ti_age').val(r.age);
			$('#ti_age').attr('disabled', 'disabled');
			$('#ti_bloodgroup').val(r.bloodgroupname);
			$('#ti_bloodgroup').attr('disabled', 'disabled');
			$('#ti_haemoglobin').val(r.haemoglobin);
			$('#ti_haemoglobin').attr('disabled', 'disabled');
			$('#ti_height').val(r.height);
			$('#ti_height').attr('disabled', 'disabled');
			$('#ti_weight').val(r.weight);
			$('#ti_weight').attr('disabled', 'disabled');
			$('#ti_wardName').val(r.wardName);
			$('#ti_wardName').attr('disabled', 'disabled');
			$('#ti_bedNo').val(r.bedNumber);
			$('#ti_bedNo').attr('disabled', 'disabled');
			$("input:radio[name='ti_gender'][value='"+r.gender+"']").prop("checked",true);	
			$("input:radio[name='ti_gender']").attr('disabled', 'disabled');
			
			
			
			
			
		//	$('#ci_title').val(title);
			$('#title').val(title);
		//	$('#ci_title').attr('disabled', 'disabled');
			$('#ci_fname').val(fName);
			$('#ci_fname').attr('disabled', 'disabled');
			$('#ci_mname').val(mName);
			$('#ci_mname').attr('disabled', 'disabled');
			$('#ci_lname').val(lName);
			$('#ci_lname').attr('disabled', 'disabled');
			$('#ci_contactno1').val(r.contactNo1);
			$('#ci_contactno1').attr('disabled', 'disabled');
			$('#ci_contactno2').val(r.contactNo2);
			$('#ci_contactno2').attr('disabled', 'disabled');
			$('#ci_age').val(r.age);
			$('#ci_age').attr('disabled', 'disabled');
			$('#ci_bloodgroup').val(r.bloodgroupname);
			$('#ci_bloodgroup').attr('disabled', 'disabled');
			$('#ci_haemoglobin').val(r.haemoglobin);
			$('#ci_haemoglobin').attr('disabled', 'disabled');
			$('#ci_height').val(r.height);
			$('#ci_height').attr('disabled', 'disabled');
			$('#ci_weight').val(r.weight);
			$('#ci_weight').attr('disabled', 'disabled');
			$('#ci_wardname').val(r.wardName);
			$('#ci_wardname').attr('disabled', 'disabled');
			$('#ci_bedno').val(r.bedNumber);
			$('#ci_bedno').attr('disabled', 'disabled');
			$("input:radio[name='ci_gender'][value='"+r.gender+"']").prop("checked",true);	
			$("input:radio[name='ci_gender']").attr('disabled', 'disabled');
			var priority=r.priority;
			if(priority==0){
				priority='Urgent';
			}else{
				priority='Planned'
			}
		//	document.getElementById('ci_priority').innerText=priority;
			
			getRequestComponentDetailsByID(r.bloodRequestId);
			
			getAllCrossMatchList(r.bloodRequestId);
				}
		}
	});

}

function saveSampleDispatch(){
	var sampleDispatchId=$("#sampleDispatchId").val();
	var requestId=$("#bloodRequestId").val();
	var priority=$("#priority").val();
	if(priority==0){
		priority='Urgent';
	}else{
		priority='Planned'
	}
	var title=$("#title").val();
	//var title=$("#bi_title").val();
	var fName=$("#bi_fname").val();
	var mName=$("#bi_mname").val();
	var lName=$("#bi_lname").val();
	var patientName=title+" "+fName+" "+mName+" "+lName;
	var wardName=$("#bi_wardname").val();
	var date =$("#bi_date").val();
	var send=$("input[name='send']:checked").val();
	var remarks=$("#remarks").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();
	var inputs = [];
	
	inputs.push('SampleDispatchId=' + sampleDispatchId);
	inputs.push('patientName=' + patientName);
	inputs.push('wardName=' + wardName);
	inputs.push('bloodRequestId=' + requestId);
	inputs.push('priority='+priority);
	inputs.push('date='+date);
	inputs.push('sendStatus='+send);
	inputs.push('remarks='+remarks);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/blood_issue/saveSampleDispatch",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
			
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			
			var requestId=$("#bloodRequestId").val();
			var	ptName=patientName;
			window.open("bb_barcode_print.jsp?requestId=" +encodeURIComponent(requestId)
					+ "&ptName=" + encodeURIComponent(ptName));
			location.reload(true);
			
			}else{
				alertify.success("Data Updated successfully");
				location.reload(true);
			}
			
		
		},		
	})
}

function getDetails(callform){
	if(callform=='onload'){
		var formDate=$("#form_date").val();
		var toDate=$("#to_date").val();
		var status=$("#status option:selected").val();
		var requestNo=$("#request_number").val();
		if(requestNo==undefined||requestNo==""||requestNo=="undefined"){
			requestNo=0;
		}
	}
	else{
		var formDate=$("#form_date").val();
		var toDate=$("#to_date").val();
		var status=$("#status option:selected").val();
		var requestNo=$("#request_number").val();
	}
	var inputs=[];
	inputs.push('status='+encodeURIComponent(status));
	inputs.push('formDate='+formDate);
	inputs.push('toDate='+toDate);
	inputs.push('callform='+callform);
	inputs.push('requestNo='+requestNo);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/blood_issue/getDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			setDetails(r);
			setRequestIdDetails(r);
		
		}
	});
}

function setDetails(result){
	var r = result;
	var divContent = "";
	total = 0;
	
	divContent = divContent
			+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";

	for ( var i = 0; i < r.length; i++) {
		var sampleStatus= r[i].sampleStatus;
		var date=new Date(r[i].createdDate).toLocaleString('en-GB');
		if(sampleStatus ==1){
			divContent = divContent + "<tr><td>" +r[i].priority+ "</td><td>"
			+ r[i].patientName + "</td><td>" + r[i].bloodRequestId
			+ "</td><td>" + r[i].wardName + "</td><td>"+date+"</td><td><input type='checkbox' name='checkid' id='checkid' onclick='checkRecieve("+r[i].sampleDispatchId+")'/></td><td><input type='text' placeholder='Remarks' name='remarks' id='remarks' /> </td></tr>";
		
		}else{
			divContent = divContent + "<tr><td>" +r[i].priority+ "</td><td>"
			+ r[i].patientName + "</td><td>" + r[i].bloodRequestId
			+ "</td><td>" + r[i].wardName + "</td><td>"+date+"</td><td><input type='checkbox' name='checkid' id='checkid' checked/></td><td>" +r[i].remarks + " </td></tr>";
		
		}
	
	}

	$("#patientSampleDetails").html(divContent);
}
function setRequestIdDetails(result){
	var r = result;
	var divContent = "";
    divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
     for ( var i = 0; i < r.length; i++) {          
    	 divContent = divContent + "<option value='"+r[i].bloodRequestId+"'>"+ r[i].bloodRequestId + "</option>";
        }
    divContent = divContent + "</select>";
        $("#request_number").html(divContent);
}
	

function checkRecieve(checkid){
	$("#patientSampleDispatchId").val(checkid);
}

function savePatientSampleAcknowledge(id){
	var patientSampleDispatchId=$("#patientSampleDispatchId").val();
	var remarks =$("#remarks").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/blood_issue/savePatientSampleAcknowledge",
		data : {
			SampleDispatchId : patientSampleDispatchId,
			sampleStatus : id,
			remarks : remarks
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {	
			alertify.success("Data Saved successfully");
		}
	});
	
}
function getRequestComponentDetailsByID(id){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/blood_issue/getRequestComponentDetailsByID",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setRequestComponentDetails(r);
			setComponentDetailsById(r);
		}
	});
}

function setRequestComponentDetails(result){
	var htm ="";
	var index = 1;
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+result[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center id="available_qty">'+result[i].collectionVolume+'</td>'
			+ '</tr>';
			index++;
		}
		$("#requestComponentDetails").html(htm);
}

function setComponentDetailsById(result){
	var r = result;
	var divContent = "";
    divContent = divContent + "<select><option value='0'> Select Component </option>";
     for ( var i = 0; i < r.length; i++) {          
    	 divContent = divContent + "<option value='"+r[i].componentId+"' onclick='getAllBagDetailsbyComponentId("+r[i].componentId+")'>"+ r[i].componentName + "</option>";
        }
    divContent = divContent + "</select>";
        $("#requested_component").html(divContent);
       // getAllComponentByComponentName(r.componentName);
}
function getAllBagDetailsbyComponentId(componentId){
	//var componentId=$("#componentId").val();
	//var bloodGroup=$("#bloodGroup").val();
	var ci_bloodgroup=$("#ci_bloodgroup").val();	
	var bloodRequestId = $("#bloodRequestId").val();

	var inputs = [];
	inputs.push('componentId=' + componentId);
	inputs.push('bloodGroup=' + encodeURIComponent(ci_bloodgroup));
	inputs.push('bloodRequestId=' + bloodRequestId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getAllBagDetailsbyComponentId",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			setAllbagDetailsByComponentId(r);
			
		}
	});
}
function setAllbagDetailsByComponentId(r){

var divContent = "";
divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
 for ( var i = 0; i < r.lstComponentseperation.length; i++) {          
	 divContent = divContent + "<option value='"+r.lstComponentseperation[i].bloodBagNumber+"' onclick='getAllComponentByComponentName("+r.lstComponentseperation[i].bloodBagNumber+","+r.lstComponentseperation[i].componentSeperationId+")'>"+ r.lstComponentseperation[i].bloodBagDetails + "</option>";
    }
divContent = divContent + "</select>";
    $("#component_select").html(divContent);
}
function getAllComponentByComponentName(bloodBagNumber,componentId){
	
	var inputs = [];
	
	inputs.push('bloodBagNumber=' + bloodBagNumber);
	inputs.push('componentId=' + componentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/blood_issue/getAllComponentByComponentName",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
		
			for(var i=0; i<r.lstComponentseperation.length;i++){
				$('#component_name').val(r.lstComponentseperation[i].componentName);
				$('#component_name').attr('disabled', 'disabled');
				$('#component_volume').val(r.lstComponentseperation[i].volume);
				$('#component_volume').attr('disabled', 'disabled');
				$('#expiry_date').val(r.lstComponentseperation[i].expiryDate);
				$('#expiry_date').attr('disabled', 'disabled');
			}
			
		}
	});
}
function saveCrossMatch(){
	var crossmatchId=$("#crossmatchId").val();
 	// var compId=$("#component_name ").val();
 	var compName=$("#requested_component option:selected").text();
	var bloodBagid=$("#component_select").val();
	var bloodBag =$("#component_select option:selected").text();
	var CompVolume=$("#component_volume").val();
	var reqQty=$("#required_qnty").val();
	var expDate=$("#expiry_date").val();
  //  var compTypeId=$("#compatible_type ").val();
	var compTypeName=$("#compatible_type option:selected ").text();
	var remarks=$("#compatible_remark").val();
	var date=$("#date").val();
	var unit_id =$("#unitId").val();
	var user_id=$("#userId").val();
	var requestId=$("#bloodRequestId").val();
	
	/*if(crossmatchId == 0) {
		var chkcount = validateCrossMatchRecord(compName, bloodBagid, requestId);
		if(chkcount > 0)
			alert("This record is already exist with same component and blood bag please select different bag/component...")

		return false
	}
	*/
	var inputs = [];
	
	inputs.push('crossMatchId=' + crossmatchId);
	inputs.push('componentName=' + compName);
	inputs.push('bloodBagId=' + bloodBagid);
	inputs.push('bloodBag=' + bloodBag);
	inputs.push('componentVolume=' + CompVolume);
	inputs.push('requireQty='+reqQty);
	inputs.push('expiryDate='+expDate);
	
	//inputs.push('compatibleType='+compTypeId);
	inputs.push('compatibleType='+compTypeName);
	
	
	inputs.push('remark='+remarks);
	inputs.push('date='+date);
	inputs.push('unitId='+unit_id);
	inputs.push('createdBy='+user_id);
	inputs.push('bloodRequestId='+requestId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/blood_issue/saveCrossMatch",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
			
		},
		success: function(data){
			//alert(data);
			//if(data==1){
			alertify.success("Data Saved successfully");
              location.reload(true);
			/*}else{
				alertify.success("Data Updated successfully");
			}*/
			
			getAllCrossMatch(data);
		},		
	})
}

function getAllCrossMatchList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getAllCrossMatchList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllCrossMatchList(r,'All');			
		}
	});

	
}

function setAllCrossMatchList(r,callfrom){

	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.length; i++) {
			htm = htm
		    + ' <tr><td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center">'+r[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+r[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'+r[i].requireQty+'</td>'
			+ ' <td class="col-md-1 center">'+r[i].expiryDate+'</td>'
			+ ' <td class="col-md-1 center">'+r[i].compatibleType+'</td>'
			+ ' <td class="col-md-1 center">'+r[i].remark+'</td>'
			+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editCrossMatch('
								+ r[i].crossMatchId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteCrossMatch('
								+ r[i].crossMatchId
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
					
			                   index++;
		}
	
	$("#crossMatchDetails").html(htm);
}


function getCrossMatchListByID(id,callfrom){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('bloodRequestId='+id);
	inputs.push('callfrom='+callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getCrossMatchListByID",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {	
			if(callfrom=='bloodRequsition' || callfrom=='getDataOnedit'){
				setAllCrossMatchResult(r,'bloodRequsition');
				getAllpriority();
			}else if(callfrom=='transfusion'){
				setAllCrossMatchForTransfusion(r);
			}
			else if(callfrom=='bloodIssue' || callfrom=='getDataOneditBloodIssue'){
				setAllCrossMatchMaster1(r,'callfrom');
				//getAllpriority();
			}
			else{
				setAllCrossMatchMaster(r,callfrom);	
			}
				
			
			
		}
	});
}

function setAllCrossMatchResult(r,bloodRequsition){
	var htm ="";
	var index = 1;
 var rowCount=0;
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < r.lstCrossMatch.length; i++) {	
			rowCount++;
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].requireQty+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].expiryDate+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].compatibleType+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstCrossMatch[i].remark+'</td>'
			+ ' <td class="col-md-1 center">'
			+ ' <input type="hidden"   id="crossMatchId' + rowCount + '" value="'+ r.lstCrossMatch[i].crossMatchId + '" >'
			+ '	<input type="text" class="form-control" name="requisition_quantity" id="req_quantity'+rowCount+'" ></td>'
			+ ' <td><select class="form-select" id="priority'+rowCount+'" name="priority"></select></td>'
			+ '</tr>';
			index++;
		}
		$("#bloodRequisitionDetails").html(htm);
		
}

function setAllCrossMatchMaster1(result,callfrom){
	var r=result;
	var htm ="";
	var index = 1;
	var r=result;
	if(callfrom =='bloodIssue1'){
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.lstCrossMatch.length; i++) {	
			htm = htm + '<tr> '
		    + ' <td class="col-md-1 center">'+index+'</td>'   
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].requireQty+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].expiryDate+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].compatibleType+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].remark+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editCrossMatch('+result.lstCrossMatch[i].crossMatchId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteCrossMatch('+result.lstCrossMatch[i].crossMatchId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
		$("#crossMatchDetails").html(htm);
	}
else{
		htm = htm
		+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
			for ( var i = 0; i < result.lstCrossMatch.length; i++) {	
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].requPriority+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentName+'</td>'	
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].bloodBag+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentVolume+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].requireQty+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].expiryDate+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].remark+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].compatibleType+'</td>'
				+ '</tr>';
			
			}
			$("#crossResult").html(htm);
			setComponentDataforbloodIssue(result);
	}
}


function setAllCrossMatchMaster(result,callfrom){
	var r=result;
	var htm ="";
	var index = 1;
	var r=result;
	if(callfrom !='bloodIssue'){
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.lstCrossMatch.length; i++) {	
			htm = htm + '<tr> '
		    + ' <td class="col-md-1 center">'+index+'</td>'   
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].requireQty+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].expiryDate+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].compatibleType+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].remark+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editCrossMatch('+result.lstCrossMatch[i].crossMatchId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteCrossMatch('+result.lstCrossMatch[i].crossMatchId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
		$("#crossMatchDetails").html(htm);
	}else{
		htm = htm
		+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
			for ( var i = 0; i < result.lstCrossMatch.length; i++) {	
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].requPriority+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentName+'</td>'	
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].bloodBag+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentVolume+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].requireQty+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].expiryDate+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].remark+'</td>'
				+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].compatibleType+'</td>'
				+ '</tr>';
			
			}
			$("#crossResult").html(htm);
			setComponentDataforbloodIssue(result);
	}
}


function editCrossMatch(id){
var inputs = [];
inputs.push('crossMatchId=' + id);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	url : "ehat/blood_issue/editCrossMatch",
	data : str + "&reqType=AJAX",
	error : function() {
		alert('error');
	},
	success : function(r) {	
		var compatibilityTypeId="";
		var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bb_test_master/getAllCompatibilityType",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
				var divContent = "";
    divContent = divContent + "<select><option value='0'>--Select Compatibility Type--</option>";
     for ( var i = 0; i < r.listCompatibilityType.length; i++) {          
    	 divContent = divContent + "<option value='"+r.listCompatibilityType[i].compatibilityTypeId+"'>"+ r.listCompatibilityType[i].compatibilityType + "</option>";
        }
      compatibilityTypeId=divContent;

		}
	});
	
	
	
		var requstId=r.bloodRequestId;
		$('#bloodRequestId').val(requstId);
		getRequestComponentDetailsByID(requstId);
		getPatientDetailsByRequestId(requstId);
		$('#requested_component').val(r.componentId);
		getAllBagDetailsbyComponentId(r.componentId);
		$('#component_name').val(r.componentName);
		$('#component_volume').val(r.componentVolume);
		$('#expiry_date').val(r.expiryDate);
		$('#required_qnty').val(r.requireQty);
		$('#date').val(r.date);
		$('#compatible_type ').select2('val',r.compatibilityTypeId);
		$('#compatible_remark').val(r.remark);	
		$('#crossmatchId').val(r.crossMatchId);
		$('#component_select').val(r.bloodBagId);
	
}		
	
});
}

function deleteCrossMatch(id){
	var r = confirm("Are You Sure You Want To Delete Blood Group Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/blood_issue/deleteCrossMatch",
			data : {
				"crossMatchId" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllCrossMatchList();
			}
		});
	}
}


function saveBloodRequisiton(){
	var callfrom= $("#callfrom").val();
	var listbloodreq = {
			lstCrossMatch : []
		};
	
	 var table = document.getElementById("bloodRequisitionDetails");
     var rows = table.getElementsByTagName("tr").length;
		
     for ( var i = 1; i <= rows; i++) {
	  var crossMatchId= $("#crossMatchId" +i).val();
         if(callfrom == 'update'){
        	 var crossMatchId=$("#crossMatchId").val();     	
     	}	
         
          var remark=$("#req_remark").val();
          var req_quantity =$("#req_quantity" +i).val();
          if(req_quantity==""||req_quantity=="undefined"||req_quantity==undefined){
        	  req_quantity=0;
          }

          //var req_priority = $("#req_priority" + i).text();
          var priority= $( "#priority"+i).val(); 
          if(priority==""||priority=="undefined"||priority==undefined){
        	  priority=0;
          }
 
        /*  var requPriorityName=$( "#priority"+i ).text();
          var req_quantity =$("#req_quantity" +i).val();
          if(requPriorityName==""||requPriorityName=="undefined"||requPriorityName==undefined){
        	  requPriorityName=0;
          }*/

      		setlistbloodReqObj(listbloodreq,crossMatchId,remark,req_quantity,priority);				
		}
	    
     listbloodreq = JSON.stringify(listbloodreq);
     
     var inputs = [];
		inputs.push("listbloodreq="+ encodeURIComponent(listbloodreq));
		var str1 = inputs.join('&');
		jQuery.ajax({
			async:false,
			type :"POST",
			url :"ehat/blood_issue/saveBloodRequisiton",
			data	: str1 + "&reqType=AJAX",
			error: function(){
				alertify.error("Network issued");
			},
			success: function(data){
				if(data==1){
				alertify.success("Data Saved successfully");
				location.reload(true);
				}else{
					alertify.success("Data Updated successfully");
					location.reload(true);
				}
				
			
			},		
		})
}

function setlistbloodReqObj(listbloodreq,crossMatchId,remark,req_quantity,priority){
	listbloodreq.lstCrossMatch.push({
		crossMatchId :crossMatchId,
		requRemark : remark,
		requisitionQty : req_quantity,
		requPriority : priority 
	
		
	});
}


function editBloodRequisiton(id){
	$("#divForBloodRequisition").show('slow');
				
	getCrossMatchListByID(id, 'getDataOnedit');
	
	setTimeout(function() {
		setDataForeditBloodRequisiton(id)
	}, 50);
}
	
function setDataForeditBloodRequisiton(id)
{

	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
			//inputs.push('bloodRequestId=' + bloodRequestId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/blood_issue/editBloodRequisiton",
			timeout : 10000 * 600* 50,
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
            var patientName = r.patientName;
				var name = patientName.split(' ');
				var title = name[0];
				var fName = name[1];
				var mName = name[2];
				var lName = name[3]; 
               $('#title').val(title);
				$('#br_fname').val(fName);
				$('#br_fname').attr('disabled', 'disabled');
				$('#br_mname').val(mName);
				$('#br_mname').attr('disabled', 'disabled');
				$('#br_lname').val(lName);
				$('#br_lname').attr('disabled', 'disabled');
				$('#br_contactno1').val(r.contactNo1);
				$('#br_contactno1').attr('disabled', 'disabled');
				$('#br_contactno2').val(r.contactNo2);
				$('#br_contactno2').attr('disabled', 'disabled');
				$('#br_age').val(r.age);
				$('#br_age').attr('disabled', 'disabled');
				$('#br_bloodgroup').val(r.bloodgroupname);
				$('#br_bloodgroup').attr('disabled', 'disabled');
				$('#br_haemoglobin').val(r.haemoglobin);
				$('#br_haemoglobin').attr('disabled', 'disabled');
				$('#br_height').val(r.height);
				$('#br_height').attr('disabled', 'disabled');
				$('#br_weight').val(r.weight);
				$('#br_weight').attr('disabled', 'disabled');
				$('#br_wardname').val(r.wardName);
				$('#br_wardname').attr('disabled', 'disabled');
				$('#br_bedno').val(r.bedNumber);
				$('#br_bedno').attr('disabled', 'disabled');
				 $('#req_remark').val(r.remarks);
				$("input:radio[name='br_gender'][value='"+r.gender+"']").prop("checked",true);	
				$("input:radio[name='br_gender']").attr('disabled', 'disabled');

				$("#req_quantity1").val(r.requisitionQty);
				$('#priority1').val(r.requPriority);
			 //   $('#priority1 option:selected').val(r.requPriority);		
				$('#callfrom').val('update');
			}
		});
	}

}

//Added By Annapurna
function deleteBloodRequisiton(id){
	var unitId = $("#unitId").val();
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/blood_issue/deleteBloodRequisiton",
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
					getAllBloodRequisitonList();
				}
			});
		}
	}}

//Added By Annapurna
function getAllBloodRequisitonList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getAllBloodRequisitonList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllBloodRequisitonList(r,"ALL");
		}
	});	
}

function setAllBloodRequisitonList(r,CallFrom){

	var htm = "";
	var index = 1;
	
		
		for ( var i = 0; i < r.length; i++) {
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].crossMatchId
				+'</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].bloodRequestId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].componentName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].bloodBag
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].requPriority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+  r[i].requisitionQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].expiryDate
				+ '</td>'
				+ '<td class="col-md-1 center">'
				+ '<button   class="btn btn-xs  btn-success" onclick=editBloodRequisiton('
				+ r[i].crossMatchId+","+r[i].bloodRequestId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button  class="btn btn-xs btn-danger" onclick=deleteBloodRequisiton('
				+ r[i].crossMatchId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			
			
	}
	
	$("#bloodRequisionList").html(htm);

}


function getBloodRequisitionById(bloodRequestId){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getBloodRequisitionById",
		data : {
			bloodRequestId : bloodRequestId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var htm = "";
	var index = 1;
	
		
		for ( var i = 0; i < r.lstCrossMatch.length; i++) {
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].crossMatchId
				+'</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].bloodRequestId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].componentName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].bloodBag
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].requPriority
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+  r.lstCrossMatch[i].requisitionQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].expiryDate
				+ '</td>'
				+ '<td class="col-md-1 center">'
				+ '<button   class="btn btn-xs  btn-success" onclick=editBloodRequisiton('
				+ r.lstCrossMatch[i].crossMatchId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button  class="btn btn-xs btn-danger" onclick=deleteBloodRequisiton('
				+ r.lstCrossMatch[i].crossMatchId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			
			
	}
	
	$("#bloodRequisionList").html(htm);

            }
	});	
}


function setComponentDataforbloodIssue(result){
	var htm ="";
	var index = 1;
	var rowCount=0;
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.lstCrossMatch.length; i++) {	
			rowCount++;
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="componentName'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].componentName+'"></td>'	
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].expiryDate+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstCrossMatch[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'
			+ ' <input type="hidden"   id="crossMatchId' + rowCount + '" value="'+ result.lstCrossMatch[i].crossMatchId + '" >'
			+ ' <input type="hidden"   id="bagId' + rowCount + '" value="'+ result.lstCrossMatch[i].bloodBagId + '" >'
			+ '	<input type="text" class="form-control" name="issue_quantity" id="issue_quantity'+rowCount+'" ></td>'
			+ ' <td><textarea class="form-control" name="reamrk" id="issue_reamrk'+rowCount+'" rows="2"></textarea></td>'
			+ '</tr>';
		
		}
		$("#issueDetails").html(htm);
}

function saveBloodIssue(){
	var listbloodissue = {
			lstCrossMatch : []
		};
	
	 var table = document.getElementById("issueDetails");
     var rows = table.getElementsByTagName("tr").length;
		
     for ( var i = 1; i <= rows; i++) {
          var crossMatchId= $("#crossMatchId" +i).val();
          var bagId =$("#bagId" +i).val();
          var componentName = $("#componentName" +i).val();
          var issue_quantity =$("#issue_quantity" +i).val();
          //alert(issue_quantity);
          if(issue_quantity==""||issue_quantity=="undefined"||issue_quantity==undefined){
        	  alert("Please Enter Issue Quantity");
        	  return false;
          }
          var issue_remark = $("#issue_reamrk" + i).val();
          if(issue_remark==""||issue_remark=="undefined"||issue_remark==undefined){
        	  alert("Please Enter Issue Remark");
        	  return false;
          }
			setlistbloodIssueObj(listbloodissue,crossMatchId,bagId,componentName,issue_quantity,issue_remark);				
		}
	    
     listbloodissue = JSON.stringify(listbloodissue);
     var inputs = [];
		inputs.push("listbloodissue="+ encodeURIComponent(listbloodissue));
		var str1 = inputs.join('&');
		jQuery.ajax({
			type :"POST",
			url :"ehat/blood_issue/saveBloodIssue",
			data	: str1 + "&reqType=AJAX",
			error: function(){
				alertify.error("Network issued");
			},
			success: function(data){
				if(data==1){
				alertify.success("Data Saved successfully");
				location.reload(true);
				}else{
					alertify.success("Data Updated successfully");
					location.reload(true);
					
				}
				
			
			},		
		})
}


function setlistbloodIssueObj(listbloodissue,crossMatchId,bagId,componentName,issue_quantity,issue_remark){
	listbloodissue.lstCrossMatch.push({
		crossMatchId :crossMatchId,
		bloodBagId : bagId,
		componentName : componentName,
		issueQty : issue_quantity,
		issueRemark : issue_remark
		
		
	});
}

function setAllCrossMatchForTransfusion(result){
	var htm ="";
	var index = 1;
	var rowCount=0;
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.lstCrossMatch.length; i++) {	
			rowCount++;
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="componentName'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].componentName+'"></td>'	
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="bagNo'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].bloodBag+'"></td>'
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="expriyDate'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].expiryDate+'"></td>'
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="compvolume'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].componentVolume+'"></td>'
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="issueqty'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].issueQty+'"></td>'
			+ ' <td class="col-md-1 center"><input type="text" class="form-control" id="compatibleType'+rowCount+'" readonly="readonly" value="'+result.lstCrossMatch[i].compatibleType+'"></td>'
			+ '</tr>';
		
		}
		$("#transfusionDetails").html(htm);
}

function addtransfusiuon(){
	var listtranfusion = {
			lstTransfusion : []
		};
	
	 /*var table = document.getElementById("transfusionDetails");
     var rows = table.getElementsByTagName("tr").length;*/

	var rows = $("#transfusionDetails tr").length;
     
     for ( var i = 1; i <= rows; i++) {
         var componentName = $("#componentName" +i).val();
         var bagNo =$("#bagNo" +i).val();
         var expriyDate = $("#expriyDate" + i).val();
         var compvolume = $("#compvolume" + i).val();
         var issueqty = $("#issueqty" + i).val();
         var compatibleType = $("#compatibleType" + i).val();
         var trans_start_time =$("#trans_start_time").val();
         var rate_id =$("#rate_of_transfusion").val();
         var rate_of_transfusion =$("#rate_of_transfusion option:selected").text();
         var trans_end_time =$("#trans_end_time").val();
         var transfusion_quantity= $("#transfusion_quantity").val();
         var requestid=$("#bloodRequestId").val();
         var transfusionId =$("#transfusionId").val();
         
         //Added By Annapurna
         var observation1 =$("#observations1").val();
        var preTransfusion1 =$("#pre_transfusion1").val();
         var postTransfusion1 =$("#pre_transfusion2").val();
         var duringTransfusion1 =$("#pre_transfusion3").val();
         var observation2 =$("#observations2").val();
         var preTransfusion2 =$("#during_transfusion1").val();
         var postTransfusion2 =$("#during_transfusion2").val();
         var duringTransfusion2 =$("#during_transfusion3").val();
         var observation3 =$("#observations3").val();
         var preTransfusion3 =$("#post_transfusion1").val();
         var postTransfusion3 =$("#post_transfusion2").val();
         var duringTransfusion3 =$("#post_transfusion3").val();
         var remark =$("#remark").val();

     	
         
		//	setlisttransfusioneObj(listtranfusion,componentName,bagNo,expriyDate,compvolume,issueqty,compatibleType,trans_start_time,rate_of_transfusion,trans_end_time,transfusion_quantity,requestid,transfusionId,rate_id);	
       //Added By Anapurna
         setlisttransfusioneObj(listtranfusion,componentName,bagNo,expriyDate,compvolume,issueqty,compatibleType,trans_start_time,rate_of_transfusion,trans_end_time,transfusion_quantity,requestid,
        		 transfusionId,rate_id,observation1,preTransfusion1,postTransfusion1,duringTransfusion1,observation2,preTransfusion2,postTransfusion2,duringTransfusion2,observation3,preTransfusion3,postTransfusion3,duringTransfusion3,remark);
	
     }
     
       //Added
     
  //   listobservation = JSON.stringify(listobservation);

     listtranfusion = JSON.stringify(listtranfusion);

     var inputs = [];
		inputs.push("listtranfusion="+ encodeURIComponent(listtranfusion));
	//	inputs.push("listobservation="+ encodeURIComponent(listobservation));
		var str1 = inputs.join('&');
		alert("data"+str1)
	//	return false;
		jQuery.ajax({
			async:"false",
			type :"POST",
			url :"ehat/blood_issue/addtransfusiuon",
			data	: str1 + "&reqType=AJAX",
			error: function(){
				alertify.error("Network issued");
			},
			success: function(data){
				if(data==1){
				alertify.success("Data Saved successfully");
				getTransfusionDetails(data);
				//location.reload(true);
				}else{
					alertify.success("Data Updated successfully");
				}
				location.reload(true);

			
			},		
		})
		
}
//Added By Annapurna
function setlisttransfusioneObj(listtranfusion,componentName,bagNo,expriyDate,compvolume,issueqty,compatibleType,trans_start_time,rate_of_transfusion,trans_end_time,
		transfusion_quantity,requestid,transfusionId,rate_id ,observation1,preTransfusion1,postTransfusion1,duringTransfusion1,observation2,preTransfusion2,postTransfusion2,duringTransfusion2,observation3,preTransfusion3,postTransfusion3,duringTransfusion3,remark)
//function setlisttransfusioneObj(listtranfusion,componentName,bagNo,expriyDate,compvolume,issueqty,compatibleType,trans_start_time,rate_of_transfusion,trans_end_time,transfusion_quantity,requestid,transfusionId,rate_id )
{
	listtranfusion.lstTransfusion.push({
		componentName :componentName,
		bloodBag : bagNo,
		expiryDate : expriyDate,
		componentVolume : compvolume,
		issueQty : issueqty,
		compatibleType : compatibleType,
		startTime : trans_start_time,
		rate : rate_of_transfusion,
		endTime : trans_end_time,
		transQty : transfusion_quantity,
		bloodRequestId : requestid,
		transfusionId : transfusionId,
		rateId : rate_id,
		//Added by Annapurna
		observation1:observation1,
		preTransfusion1:preTransfusion1,
		postTransfusion1:postTransfusion1,
		duringTransfusion1:duringTransfusion1,
		observation2:observation2,
		preTransfusion2:preTransfusion2,
		postTransfusion2:postTransfusion2,
		duringTransfusion2:duringTransfusion2,
		observation3:observation3,
		preTransfusion3:preTransfusion3,
		postTransfusion3:postTransfusion3,
		duringTransfusion3:duringTransfusion3,
		remark:remark
		
		
		
		
	});
}

function getAllBloodTransfusionList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getAllBloodTransfusionList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodTransfusionList(r);			
		}
	});

	
}

function setBloodTransfusionList(r){

	var htm = "";
	var index = 1;
	var result=r;
	
	htm = htm
	
		for ( var i = 0; i < result.length; i++) {	
			htm = htm + '<tr> '
			//var expiryDateSplit =result[i].expiryDate.split('-');
		//	var expiry_date=expiryDateSplit[2]+ "/" +expiryDateSplit[1]+ "/" +expiryDateSplit[0];
	        + ' <td class="col-md-1 center">'+result[i].transfusionId+'</td>'	
            + ' <td class="col-md-1 center">'+result[i].crossMatchId+'</td>'	
            + ' <td class="col-md-1 center">'+result[i].bloodRequestId+'</td>'	
			+ ' <td class="col-md-1 center">'+result[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center">'+result[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+result[i].expiryDate+'</td>'
			+ ' <td class="col-md-1 center">'+result[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'+result[i].issueQty+'</td>'	
			+ ' <td class="col-md-1 center">'+result[i].transQty+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editTransfusionDetail(' +result[i].transfusionId+","+result[i].crossMatchId+","+result[i].bloodRequestId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodTransfusionById('+result[i].transfusionId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>'
			
			
		$("#addedtransfusionDetails").html(htm);
}

}
function getTransfusionDetails(id){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/blood_issue/getTransfusionDetails",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllTransfusionDetails(r);			
		}
	});
}

function setAllTransfusionDetails(result){
	var htm ="";
	var index = 1;
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.lstTransfusion.length; i++) {	
			htm = htm + '<tr> '
		//	var expiryDateSplit = result.lstTransfusion[i].expiryDate.split('-');
		//	var expiry_date=expiryDateSplit[2]+ "/" +expiryDateSplit[1]+ "/" +expiryDateSplit[0];
	        + ' <td class="col-md-1 center">'+result.lstTransfusion[i].transfusionId+'</td>'	
            + ' <td class="col-md-1 center">'+result.lstTransfusion[i].crossMatchId+'</td>'	
            + ' <td class="col-md-1 center">'+result.lstTransfusion[i].bloodRequestId+'</td>'	
			+ ' <td class="col-md-1 center">'+result.lstTransfusion[i].componentName+'</td>'	
			+ ' <td class="col-md-1 center">'+result.lstTransfusion[i].bloodBag+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstTransfusion[i].expiryDate+'</td>' 
			+ ' <td class="col-md-1 center">'+result.lstTransfusion[i].componentVolume+'</td>'
			+ ' <td class="col-md-1 center">'+result.lstTransfusion[i].issueQty+'</td>'	
			+ ' <td class="col-md-1 center">'+result.lstTransfusion[i].transQty+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editTransfusionDetail('+result.lstTransfusion[i].transfusionId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodTransfusionById('+result.lstTransfusion[i].transfusionId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>'
			
			
		$("#addedtransfusionDetails").html(htm);
}
}
function editTransfusionDetail(id,crossMatchId, bloodreqId){
	var inputs = [];
	inputs.push('transfusionId=' + id);
	inputs.push('crossMatchId=' + crossMatchId);
//	inputs.push('bloodRequestId=' + bloodRequestId);
	getCrossMatchListByID(crossMatchId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/editTransfusionDetail",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
	//	var callform=r.bloodRequestId;
		
		
	               	$('#componentName1').val(r.componentName);
					$('#bagNo1').val(r.bloodBag);
					$('#expriyDate1').val(r.expiryDate);					
					$('#compvolume1').val(r.componentVolume);		
					$('#issueqty1').val(r.issueQty);					
					$('#compatibleType1').val(r.compatibleType);
				var patientName = r.patientName;
				var name = patientName.split(' ');
				var title = name[0];
				var first_name = name[1];
				var middle_name = name[2];
				var last_name = name[3]; 
				$('#bloodRequestId').val(r.bloodRequestId);//Added By Annapurna
					$('#title').val(title);
					$('#title').attr('disabled', 'disabled');
					$('#tr_fname').val(first_name);
					$('#tr_fname').attr('disabled', 'disabled');
					$('#tr_mname').val(middle_name);
					$('#tr_mname').attr('disabled', 'disabled');
					$('#tr_lname').val(last_name);
					$('#tr_lname').attr('disabled', 'disabled');
					$('#tr_contact1').val(r.contactNo1);
					$('#tr_contact1').attr('disabled', 'disabled');
					$('#tr_contact2').val(r.contactNo2);
					$('#tr_contact2').attr('disabled', 'disabled');
					$('#tr_age').val(r.age);
					$('#tr_age').attr('disabled', 'disabled');
					$('#tr_bloodgroup').val(r.bloodgroupname);
					$('#tr_bloodgroup').attr('disabled', 'disabled');
					$('#tr_haemoglobin').val(r.haemoglobin);
					$('#tr_haemoglobin').attr('disabled', 'disabled');
					$('#tr_height').val(r.height);
					$('#tr_height').attr('disabled', 'disabled');
					$('#tr_weight').val(r.weight);
					$('#tr_weight').attr('disabled', 'disabled');
					$('#tr_wardname').val(r.wardName);
					$('#tr_wardname').attr('disabled', 'disabled');
					$('#tr_bedno').val(r.bedNumber);
					$('#tr_bedno').attr('disabled', 'disabled');
					$("input:radio[name='tr_gender'][value='"+r.gender+"']").prop("checked",true);	
					$("input:radio[name='tr_gender']").attr('disabled', 'disabled');
					$("#bloodRequestId").val(r.bloodRequestId);
				//	getAllCrossMatch(r.bloodRequestId,'transfusion');
				//	getCrossMatchListByID(id,callform);
		
			$('#trans_start_time').val(r.startTime);
			//$("#rate_of_transfusion").get(0).selectedIndex = r.rate;
			$("#rate_of_transfusion").val(r.rateId);
			$('#trans_end_time').val(r.endTime);
			$('#transfusion_quantity').val(r.transQty);
			$('#transfusionId').val(r.transfusionId);		
		       $("#pre_transfusion1").val(r.preTransfusion1);
		      $("#pre_transfusion2").val(r.preTransfusion2);
		        $("#pre_transfusion3").val(r.preTransfusion3);	     
		        $("#during_transfusion1").val(r.duringTransfusion1);
		      $("#during_transfusion2").val(r.duringTransfusion2);
		        $("#during_transfusion3").val(r.duringTransfusion3);	    
		        $("#post_transfusion1").val(r.postTransfusion1);
		       $("#post_transfusion2").val(r.postTransfusion2);
		       $("#post_transfusion3").val(r.postTransfusion3);
		         $("#remark").val(r.remark);

		
			getCrossMatchListByID(crossMatchId,'transfusion')
	
		}
	});
}

function deleteBloodTransfusionById(id){

	if(id !=undefined && id!=null && id!="" && id!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/blood_issue/deleteBloodTransfusionById",
				data : {
					"id" : id
					
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					
					if(response == 1){
					
					alertify.success("Record deleted successfully");
				}else if(response == 2){
					
					alertify.error("oops Somthing Wrong");
				}
				
					getAllBloodTransfusionList();
					location.reload(true);
				}
			});
		}
	}
}

function saveObservation(){
	var listobservation = {
			lstTransfusionObservation : []
		};
	
	 var table = document.getElementById("observationDetails");
     var rows = table.getElementsByTagName("tr").length;
     
     for ( var i = 1; i <= rows; i++) {
         var observations = $("#observations" +i).val();
         var pre_transfusion =$("#pre_transfusion" +i).val();
         var during_transfusion = $("#during_transfusion" + i).val();
         var post_transfusion = $("#post_transfusion" + i).val();
         var remark = $("#remark").val();
         var requestid=$("#bloodRequestId").val();
         
			setlistObservationObj(listobservation,observations,pre_transfusion,during_transfusion,post_transfusion,remark,requestid);				
		}
     
     listobservation = JSON.stringify(listobservation);
     var inputs = [];
		inputs.push("listobservation="+ encodeURIComponent(listobservation));
		var str1 = inputs.join('&');
		jQuery.ajax({
			type :"POST",
			url :"ehat/blood_issue/saveObservation",
			data	: str1 + "&reqType=AJAX",
			error: function(){
				alertify.error("Network issued");
			},
			success: function(data){
				if(data==1){
				alertify.success("Data Saved successfully");
				location.reload(true);
				}else{
					alertify.success("Data Updated successfully");
					location.reload(true);
				}
				
			
			},		
		})
}

function setlistObservationObj(listobservation,observations,pre_transfusion,during_transfusion,post_transfusion,remark,requestid){
	listobservation.lstTransfusionObservation.push({
		observation :observations,
		preTransfusion : pre_transfusion,
		duringTransfusion : during_transfusion,
		postTransfusion : post_transfusion,
		remark : remark,
		bloodRequestId : requestid
		
		
	});
}

function setAllTransfusionRate(r){
	var divContent = "";
    divContent = divContent + "<select><option value='0'>-- Select --</option>";
     for ( var i = 0; i < r.listRateOfTransfusion.length; i++) {          
    	 divContent = divContent + "<option value='"+r.listRateOfTransfusion[i].transfusionId+"'>"+ r.listRateOfTransfusion[i].transfusion + "</option>";
        }
    divContent = divContent + "</select>";
        $("#rate_of_transfusion").html(divContent);
}

function SetAllProrityDetails(r){
	var divContent = "";
    divContent = divContent + "<select><option value='0'>--Select Priority--</option>";
     for ( var i = 0; i < r.listPriorityMaster.length; i++) {          
    	 divContent = divContent + "<option value='"+r.listPriorityMaster[i].priorityId+"'>"+ r.listPriorityMaster[i].priority + "</option>";
        }
    divContent = divContent + "</select>";
        $("#priority").html(divContent);
        var table = document.getElementById("bloodRequisitionDetails");
        var rows = table.getElementsByTagName("tr").length;
        for(var i=0;i<rows;i++){ 
			
			$('#priority'+(i+1)).html(divContent);
		
		}
        
}
function SetAllTestMastersDetails(result){
	var htm ="";
	var index = 1;
	var rowCount=0;
	htm = htm
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < result.listTestMaster.length; i++) {	
			rowCount++;
			htm = htm + '<tr> '
			+ "<td class='col-md-1 center' ><input type='checkbox'  id='checked_"+(i+1)+"'></td>"
			+ ' <input type="hidden"   id="testId' + rowCount + '" value="'+ result.listTestMaster[i].testMasterId + '" >'
			+ ' <td class="col-md-1 center"><label id="ti_testname'+rowCount+'">'+result.listTestMaster[i].testName+'</td>'	
			+ ' <td><select class="form-select" name="result" id="ti_result'+rowCount+'"><option value="positive">Positive</option><option value="negative">Negative</option></select></td>'
			+ '<td><input type="date" class="form-control" name="date_time" id="ti_date'+rowCount+'"></td>'
			+ '<td><textarea class="form-control" name="remarks" rows="3" id="ti_remark'+rowCount+'"></textarea></td>'
			+ '</tr>';
		
		}
		$("#sampleTestingDetails").html(htm);
}

function SetAllCompatibilityTypeDetails(r){
	var divContent = "";
    divContent = divContent + "<select><option value='0'>--Select Compatibility Type--</option>";
     for ( var i = 0; i < r.listCompatibilityType.length; i++) {          
    	 divContent = divContent + "<option value='"+r.listCompatibilityType[i].compatibilityTypeId+"'>"+ r.listCompatibilityType[i].compatibilityType + "</option>";
        }
    divContent = divContent + "</select>";
        $("#compatible_type").html(divContent);
}

function getSampleAckDetails(callform)
{
	var formDate=$("#form_date").val();
	var toDate=$("#to_date").val();
	var inputs = [];
	inputs.push('callform=' + callform);
	inputs.push('formDate=' + formDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/blood_issue/getSampleAckDetails",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
				
			
		}
	});
	}

function fetchBloodRequest(){
	window.location.href = "blood_request_list.jsp";
}

function getAllBloodRequestList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/blood_issue/getAllBloodRequestList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodRequestDetails(r,'All');			
		}
	});

	
}

function setAllBloodRequestDetails(r,callfrom){

	var htm = "";
	var index = 1;
	
		
		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodRequestId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].patientName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodgroupname
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].priority_name
					+ '</td>'		
					+ '<td class="col-md-1 center">'
					+ '<button class="btn btn-xs btn-success" onclick=editRequestDetails('
					+ r[i].bloodRequestId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ '<td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteRequestDetails('
					+ r[i].bloodRequestId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
	}
	
	$("#bloodRequestetails").html(htm);

}

function deleteRequestDetails(id){

	if(id !=undefined && id!=null && id!="" && id!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/blood_issue/deleteBloodRequestetail",
				data : {
					"id" : id
					
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllBloodRequestList();
				}
			});
		}
	}

}

function editRequestDetails(id){
	$("#divForBloodRequest").show('slow');
	
	if(id !=undefined && id!=null && id!="" && id!="null"){
		var inputs = [];
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/blood_issue/editRequestDetails",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
			
             var bloodRequestId = r.bloodRequestId;
				var patientName = r.patientName;
				var name = patientName.split(' ');
				var title = name[0];
				var first_name = name[1];
				var middle_name = name[2];
				var last_name = name[3]; 
				$('#bloodRequestId').val(r.bloodRequestId);//Added By Annapurna
				
				$("#title").select2('val',title);
				$('#title').select2('disable');
				$("#f_name").val(first_name);
				$('#f_name').attr('disabled', 'disabled');
				$("#m_name").val(middle_name);
				$('#m_name').attr('disabled', 'disabled');
				$("#l_name").val(last_name);
				$('#l_name').attr('disabled', 'disabled');
				$("#contact1").val(r.contactNo1);
				$('#contact1').attr('disabled', 'disabled');
				$("#contact2").val(r.contactNo2);
				
				$('#blood_group').select2('val',r.bloodGroup)
				//$('select#priority option:selected').val(r.priority);
				$('#priority').select2('val',r.priority);
				
			
				$('#age').val(r.age);
				$('#age').attr('disabled', 'disabled');
				$('#haemoglobin').val(r.haemoglobin);
				$('#height').val(r.height);
				$('#weight').val(r.weight);
				$('#ward_name').val(r.wardName);
				$('#bed_number').val(r.bedNumber);
				$('#remarks').val(r.remarks);
				$("input:radio[name='pa_gender'][value='"+r.gender+"']").prop("checked",true);
			
				for ( var i = 0; i < r.lstBloodRequest.length; i++){
				  //	 alert("r..."+r.lstBloodRequest[i].collection_volume);
					$('#txt_volume_'+(i+1)).val(r.lstBloodRequest[i].collection_volume);//'
				}
			}
		});
	}

}

//Added By Annapurna for Blood Requestipdpatient fetch
function getPatientDetailsByIdBloodrequest(id){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/blood_issue/getPatientDetailsByIdBloodrequest",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			$('#title').select2('val',r.prefix);
			$('#title').select2('disable');
			$('#f_name').val(r.fName);
			$('#f_name').attr('disabled', 'disabled');
			$('#m_name').val(r.mName);
			$('#m_name').attr('disabled', 'disabled');
			$('#l_name').val(r.lName);
			$('#l_name').attr('disabled', 'disabled');
			$('#age').val(r.age1);
			$('#age').attr('disabled', 'disabled');
			$('#height').val(r.height);
			$('#weight').val(r.weight);
			$('#contact1').val(r.mobile);
			$('#contact1').attr('disabled', 'disabled');
			$('#contact2').val(r.officeNumber);
			$('#ward_name').val(r.wtType);
			$('#bed_number').val(r.bedNo);
			
			$('#blood_group').select2('val',r.bloodGroup)
			gender=r.sex;
			if(gender=='Male'){
				gender=1;
			}else if(gender=='Female'){
				gender=2;
			}else{
				gender=3;
			}
			$("input:radio[name='pa_gender'][value='"+gender+"']").prop("checked",true);	
			$("input:radio[name='pa_gender']").attr('disabled', 'disabled');
		}
	});
}
//Added
function getAllSampleTestingList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bloodBank/getAllSampleTestingList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSampleTestingList(r,"ALL");
		}
	});	
	
}

function setAllBloodGroupTestingDetailsList(r,callform){
	
	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.length; i++) {
			var datetime1= new Date(r[i].createdDate).toLocaleString('en-GB');
		//	alert(JSON.stringify());
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodGroupTestingId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].donor_name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r[i].bloodBagNumber
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datetime1
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editBloodGroupTesting('
					+ +r[i].donorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodGroupTesting('
					+ r[i].bloodGroupTestingId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ '</tr>';
			index++;
		}
		$('#BloodDonorGroupTestingListDetails').html(htm);
}


//Added By Annapurna

function getAllBloodRequestSampleDispatchList(){
	
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
		url : "ehat/blood_issue/getAllBloodRequestSampleDispatchList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodRequestSampleDispatchList(r, "All");
		}
	});
}

function setAllBloodRequestSampleDispatchList(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
				for ( var i = 0; i < r.length; i++) {
				var date= new Date(r[i].createdDate).toLocaleDateString('en-GB');
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r[i].sampleDispatchId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r[i].bloodRequestId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ date
						+ '</td>'
						
						+ '</tr>';
				index++;
			
		} 
	}
	$("#bloodrequestdispatchhlist").html(htm);
	
}


function saveSampleTesting(){
	
	var listSampleObj = {
			listSampleTestingSlave : []
		};
	
	 var table = document.getElementById("sampleTestingDetails");
     var rows = table.getElementsByTagName("tr").length;
     var sampletestingid=$("#sampletestingid").val(); 
     var bloodRequestId=$("#bloodRequestId").val(); 
   
     
		for ( var i = 1; i <= rows; i++) {
			 
		//var	sampletest_slave_id= 0; /// $("#sampletest_slave_id").val();
	        var sampletest_slave_id=$("#sampletest_slave_id" + i).val(); 
             var test_name =$("#ti_testname" +i).text();
             var result = $("#ti_result" + i).val();
             var date = $("#ti_date" +i).val();  
             var remark = $("#ti_remark" +i).val();
             
			setlistSampleObj(listSampleObj,sampletestingid,sampletest_slave_id,bloodRequestId,test_name,result,date,remark);				
		}
		 
		listSampleObj = JSON.stringify(listSampleObj);
		
		var inputs = [];
		inputs.push('sampletestingid=' + sampletestingid);
		inputs.push('bloodRequestId=' + bloodRequestId);
	
		inputs.push("listSampleObj="+ encodeURIComponent(listSampleObj));
		var str1 = inputs.join('&');
		
		jQuery.ajax({
			async:false,
			type :"POST",
			url :"ehat/blood_issue/saveSampleTesting",
			data	: str1 + "&reqType=AJAX",
			error: function(){
				alertify.error("Network issue");
			},
			success: function(data){
				if(data==1){
				alertify.success("Data Saved successfully");
              
				}
				else if (data == 2) {
					alertify.success("Data Updated successfully");
					  
				}
				
				  location.reload(true);
			},		
		})
}

function setlistSampleObj(listSampleObj,sampletestingid, sampletest_slave_id,bloodRequestId,test_name,result,date,remark){
	listSampleObj.listSampleTestingSlave.push({
		sampletestingid:sampletestingid,
		sampletest_slave_id : sampletest_slave_id,
		bloodRequestId :bloodRequestId,
		testName : test_name,
		result : result,
		date : date,
		remark :remark
		
	});
}

function getAllBloodRequestSampleTestingList(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getAllBloodRequestSampleTestingList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodRequestSampleTestingList(r, "All");
		}
	});
}

function setAllBloodRequestSampleTestingList(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		
			for ( var i = 0; i < r.length; i++) {
				var testDate= new Date(r[i].createdDate).toLocaleDateString('en-GB');
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r[i].sampletestingid
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r[i].bloodRequestId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r[i].patientName
						+ '</td>'			
						+ ' <td class="col-md-1 center">'
						+ 	testDate				
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editSampleTesting('
						+ r[i].sampletestingid
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteSampleTesting('
						+ r[i].sampletestingid
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			
		} 
	}
	$("#bloodrequestTestinglist").html(htm);
	
}
function getBloodRequestSampleTesingListById(bloodRequestId){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getBloodRequestSampleTesingListById",
		data : {
			bloodRequestId : bloodRequestId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var htm = "";
			var index = 1;
			if(r !="" && r!=undefined){
				
					for ( var i = 0; i < r.listsampleTesting.length; i++) {
						var testDate= new Date(r.listsampleTesting[i].createdDate).toLocaleDateString('en-GB');
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listsampleTesting[i].sampletestingid
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listsampleTesting[i].bloodRequestId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listsampleTesting[i].patientName
								+ '</td>'			
								+ ' <td class="col-md-1 center">'
								+ 	testDate				
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editSampleTesting('
								+ r.listsampleTesting[i].sampletestingid
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteSampleTesting('
								+ r.listsampleTesting[i].sampletestingid
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
						index++;
					
				} 
			}
			$("#bloodrequestTestinglist").html(htm);
				
			}	});	
}


function editSampleTesting(sampletestingid){
	$("#divForBRSampleTesting").show('slow');
	if(sampletestingid !=undefined && sampletestingid!=null && sampletestingid!="" && sampletestingid!="null"){
		
		var inputs = [];
	
		inputs.push('sampletestingid=' + sampletestingid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/blood_issue/editSampleTesting",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				var patientName = r.patientName;
				var name = patientName.split(' ');
				var title = name[0];
				var first_name = name[1];
				var middle_name = name[2];
				var last_name = name[3]; 
				$('#sampletestingid').val(r.sampletestingid);
				//$('#testRegisterId').val(r.testRegisterId);
				$('#bloodRequestId').val(r.bloodRequestId);	
				$("#title").val(title);
				$('#title').attr('disable');
				$('#ti_fname').val(first_name);
				$('#ti_fname').attr('disabled', 'disabled');
				$('#ti_mname').val(middle_name);
				$('#ti_mname').attr('disabled', 'disabled');
				$('#ti_lname').val(last_name);
				$('#ti_lname').attr('disabled', 'disabled');
				$('#ti_contactno1').val(r.contactNo1);
				$('#ti_contactno1').attr('disabled', 'disabled');
				$('#ti_contactno2').val(r.contactNo2);
				$('#ti_contactno2').attr('disabled', 'disabled');
				$('#ti_age').val(r.age);
				$('#ti_age').attr('disabled', 'disabled');
				$('#ti_bloodgroup').val(r.bloodgroupname);
				$('#ti_bloodgroup').attr('disabled', 'disabled');
				$('#ti_haemoglobin').val(r.haemoglobin);
				$('#ti_haemoglobin').attr('disabled', 'disabled');
				$('#ti_height').val(r.height);
				$('#ti_height').attr('disabled', 'disabled');
				$('#ti_weight').val(r.weight);
				$('#ti_weight').attr('disabled', 'disabled');
				$('#ti_wardName').val(r.wardName);
				$('#ti_wardName').attr('disabled', 'disabled');
				$('#ti_bedNo').val(r.bedNumber);
				$('#ti_bedNo').attr('disabled', 'disabled');
				$("input:radio[name='ti_gender'][value='"+r.gender+"']").prop("checked",true);
			

				var htmBody="";
				for ( var i = 0; i < r.sampleTesting_Slave.length; i++) {
					//alert("---length----"+r.length);
					htmBody = htmBody + "<tr style='height:21px;'>"
					+ "<td class='col-md-1 center' ><input type='checkbox'  id='checked_"+(i+1)+"'></td>"
					+ "<td class='col-md-1 center' id='ti_testname"+(i+1)+"' >" + r.sampleTesting_Slave[i].testName + "</td>"
					+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='ti_result"+(i+1)+"' placeholder='Result' value="+ r.sampleTesting_Slave[i].result +"></td>"
					+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='ti_date"+(i+1)+"' value="+r.sampleTesting_Slave[i].date+"></td>"
					+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='ti_remark"+(i+1)+"' value="+r.sampleTesting_Slave[i].remark+"></td>";
				
				}
				$("#sampleTestingDetails").html(htmBody);

				
			}
		});
	}
}


function deleteSampleTesting(sampletestingid){
	
	if(sampletestingid !=undefined && sampletestingid!=null && sampletestingid!="" && sampletestingid!="null"){
		var r = confirm("Are You Sure You Want To Delete Organ Collection Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/blood_issue/deleteSampleTesting",
				data : {
					"sampletestingid" : sampletestingid
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllBloodRequestSampleTestingList();
				}
			});
		}
	}
	
}

function getAllBloodIssueList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getAllBloodIssueList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodIssue(r,'All');			
		}
	});

	
}

function setAllBloodIssue(r,callfrom){

	var htm = "";
	var index = 1;
	
		
	for ( var i = 0; i < r.length; i++) {
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].crossMatchId
				+'</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].bloodRequestId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].componentName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].bloodBag
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].requireQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+  r[i].requisitionQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].expiryDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].issueQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].issueRemark
				+ '</td>'
				+ '<td class="col-md-1 center">'
				+ '<button   class="btn btn-xs  btn-success" onclick=editBloodIssueDeatils('
				+ r[i].crossMatchId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button  class="btn btn-xs btn-danger" onclick=deleteBloosIssueById('
				+ r[i].crossMatchId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			
			
	}
	
	$("#issueDetailsList").html(htm);


}

function deleteBloosIssueById(id){

	if(id !=undefined && id!=null && id!="" && id!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/blood_issue/deleteBloosIssueById",
				data : {
					"id" : id
					
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					
					if(response == 1){
					
					alertify.success("Record deleted successfully");
				}else if(response == 2){
					
					alertify.error("oops Somthing Wrong");
				}
				
					getAllBloodIssueList();
				}
			});
		}
	}
}

function getBloodIssueById(bloodRequestId){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/blood_issue/getBloodIssueById",
		data : {
			bloodRequestId : bloodRequestId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var htm = "";
	var index = 1;
	
		
		for ( var i = 0; i < r.lstCrossMatch.length; i++) {
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].crossMatchId
				+'</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].bloodRequestId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].componentName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].bloodBag
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].requireQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+  r.lstCrossMatch[i].requisitionQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].expiryDate
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].issueQty
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.lstCrossMatch[i].issueRemark
				+ '</td>'
				+ '<td class="col-md-1 center">'
				+ '<button   class="btn btn-xs  btn-success" onclick=('
				+ r.lstCrossMatch[i].crossMatchId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center">'
				+ '	<button  class="btn btn-xs btn-danger" onclick=deleteBloosIssueById('
				+ r.lstCrossMatch[i].crossMatchId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
			
			
	}
	
	$("#issueDetailsList").html(htm);

            }
	});	
}

function editBloodIssueDeatils(id){
	
	getCrossMatchListByID(id, 'getDataOneditBloodIssue');
	
	setTimeout(function() {
			setDataForeditBloodIssueDeatils(id)
		}, 50);
	}
	
function setDataForeditBloodIssueDeatils(id)
{
var inputs = [];
inputs.push('id=' + id);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	url : "ehat/blood_issue/editBloodIssueDeatils",
	data : str + "&reqType=AJAX",
	error : function() {
		alert('error');
	},
	success : function(r) {	
		  
	    var requstId=r.bloodRequestId;
		$('#bloodRequestId').val(requstId);
		getRequestComponentDetailsByID(requstId);
		$('#crossmatchId').val(r.crossMatchId);
		
		    var patientName = r.patientName;
				var name = patientName.split(' ');
				var title = name[0];
				var fName = name[1];
				var mName = name[2];
				var lName = name[3]; 
		           $('#title').val(title);
					$('#title').attr('disabled', 'disabled');
					$('#first_name').val(fName);
					$('#first_name').attr('disabled', 'disabled');
					$('#middle_name').val(mName);
					$('#middle_name').attr('disabled', 'disabled');
					$('#last_name').val(lName);
					$('#last_name').attr('disabled', 'disabled');
					$('#contact1').val(r.contactNo1);
					$('#contact1').attr('disabled', 'disabled');
					$('#contact2').val(r.contactNo2);
					$('#contact2').attr('disabled', 'disabled');
					$('#age').val(r.age);
					$('#age').attr('disabled', 'disabled');
					$('#blood_group').val(r.bloodgroupname);
					$('#blood_group').attr('disabled', 'disabled');
					$('#haemoglobin').val(r.haemoglobin);
					$('#haemoglobin').attr('disabled', 'disabled');
					$('#height').val(r.height);
					$('#height').attr('disabled', 'disabled');
					$('#weight').val(r.weight);
					$('#weight').attr('disabled', 'disabled');
					$('#ward_name').val(r.wardName);
					$('#ward_name').attr('disabled', 'disabled');
					$('#bed_number').val(r.bedNumber);
					$('#bed_number').attr('disabled', 'disabled');
					$("input:radio[name='gender'][value='"+r.gender+"']").prop("checked",true);	
					$("input:radio[name='gender']").attr('disabled', 'disabled');
		     	$("#issue_quantity1").val(r.issueQty);			
			    $('#issue_reamrk1').val(r.issueRemark);	

                         
        }           
			
	
});
}


function searchDonorRequesterDetailsById(value,callfrom){
	
	var resultData  = [];
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/blood_issue/searchDonorRequesterDetailsById",
		data :{
			searchParam : value ,
			callfrom :callfrom
		},
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.length; j++) {
				var patientName=r[j].patientName;
				var arrValue = r[j].bloodRequestId +"-"+patientName;
				var requestId = r[j].bloodRequestId;
				resultData.push({
					ID : requestId,
					Name : arrValue
				
				});
				template = template + '<li data-value="' + requestId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_bloodRequest .typeahead").html(template);
				$("#divtext_search_bloodRequest .typeahead").show();
				

				
				$("#search_donorrequester_id").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#search_donorrequester_id").data('typeahead').source = resultData;
			}, 500);
			
		}
	});
	function displayResult(item) {
		
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
	
		$("#search_donorrequester_id").val(name);	
		
		
		getBloodRequestSampleTesingListById(id);
			getCrossMatchListByID(id,'crossmatch');
			getCrossMatchListByID(id,'bloodRequsition');
			 getBloodRequisitionById(id);
	     	getBloodIssueById(id);
            getTransfusionDetails(id)
		
	
		
	}
	
}
	
function validateCrossMatchRecord(compName, bloodBagid, requestId)
{	
	var result = 0;
	
	$.ajax({
		async : false,
		type : "POST",
		url : "ehat/blood_issue/validateCrossMatchRecord",
		data : {
			"compName" : compName,
			"bloodBagid" : bloodBagid,
			"bloodrequestId" : requestId
		},
		error() {
			alert("Something went wrong!!")
		},
		success(r) {
			result = r;
		}
	});
	return result;
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

