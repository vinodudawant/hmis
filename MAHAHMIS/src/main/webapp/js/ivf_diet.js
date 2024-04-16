/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for get and set diet template on Doctor Desk
	 * *****/
function getDietTemplate(id){
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#Prescription").hide();
	$("#instruct").hide();
	
	var htm='';
	htm =htm
	+'<div style="margin-top: 0px; margin-bottom: 0px; " class="col-md-6-1">'
	+'<div style="margin-top: 9px;" class="col-md-4-1">'
	+'<b>From:</b>'
	+'</div>'
	+'<div style="margin-top: 9px;" class="col-md-6-1">'
	+'	<input id="fromDate"'
	+'	class="form-control input-SmallText" type="text" value=""'
	+'	placeholder="From Date" name="date" readonly="readonly"'
	+'	onchange="checkWithCurrentDate("payAll")"'
	+'	onclick="displayCalendar(document.getElementById(this.id),\'yyyy-mm-dd\',this)">'
	+'</div>'
	+'</div> '
   +'<div style="margin-top: 0px; margin-bottom: 0px; " class="col-md-6-1">'
	+'<div style="margin-top: 9px;" class="col-md-4-1">'
	+'<b>To:</b>'
	+'</div>'
	+'<div style="margin-top: 9px;" class="col-md-6-1">'
	+'	<input id="toDate"'
	+'	class="form-control input-SmallText" type="text" value=""'
	+'	placeholder="To Date" name="date" readonly="readonly"'
	+'	onchange="checkWithCurrentDate(payAll)"'
	+'	onclick="displayCalendar(document.getElementById(this.id),\'yyyy-mm-dd\',this)">'
	+'</div>'
	+'</div> '
	+'<div style="margin-top: 20px; background: #FFE0C2;'
	+' border-bottom: 1px solid orange; border-top: 1px solid orange; '
	+'padding-left: 3px;" class="col-md-12-1">'
	+'<label id="" ' 
	+' class="btn " style="padding-top: 0px; margin-right: 10px; margin-bottom: 0px; " ' 
	+' onclick="saveIVFDiet();">'
	+'<i class="far fa-save"></i>Save</label>'
	+'<label value="Edit" id="" class="btn" '
	+'style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left:2%;" '
	+'onclick="editIVFDiet();"> '
	+'<i class="fa fa-edit"></i> Edit</label>'
	+'<label value="Delete" '
	+' id="" class="btn" '
	+'style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left:1%;" '
	+'onclick="deleteIVFDiet();">'
	+' <i class="fa fa-trash-o"></i>Delete</label>'
	+'<label style="margin-left:27px;padding-top:0px" onclick="prinOPDDiet();" class="btn">'
	+'<i class="fa fa-print"></i>Print</label>'
	+'</div>'
	+'<div'
	+'style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;"'
	+'class="col-md-12-1">'
	+'<div class="tab-content">'
	+'	<div class="tab-pane fade in active">'
	+'	<table border="1"'
	+'	class="table  table-bordered table-striped header-fixed cf">'
	+'	<thead style="background-color: lightgray;">'
	+'		<tr>'
	+'		<th>#</th>'
	+'		<th>Temp Name</th>'
	+'		<th>From</th>'
	+'			<th>To</th>'
	+'			<th>Select</th>'
	+'</tr>'
	+'	</thead>'
	+'<tbody id="opddietDetail">'
	+'	</tbody>'
	+'		</table>'
	+'	</div>'
	+'<input type="hidden" value="0" id="dietMasterId">'
	+'</div>'
	+'</div>';
	$('#dynamicset').html(htm);
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	$("#diets").show();
	
	getIVFDietListByTreatmentId();
	getTemplateListByDepartmentId();
	//getcustomizelist();
}

/******
 * @author   :HM00054
 * @Code     :this method used for save ivf diet info
 * *****/
function saveIVFDiet(){
	var dietMasterId = $("#dietMasterId").val();

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var ivftreatmentId = $("#ivfTreatId").val();

	

	var userId = $("#userId").val();
	//var userId=1;

	var unitId = $("#unitId").val();
	//var unitId=1;
	
	var fromDate = $("#fromDate").val();
	
	var toDate = $("#toDate").val();
	
	var templateID =$('#customizeTemplatesdiet').val();
	if(templateID ==0 || templateID ==null || templateID=="null" || templateID=="undefined" || templateID==undefined){
		templateID=0;
	}
	
	if(templateID ==0){
		alert("Please Select Template");
		return false;
	}
	
	var templateName = $("#customizeTemplatesdiet option:selected").text();
	
	if(templateName ==0 || templateName ==null || templateName=="null" || templateName=="undefined" || templateName==undefined){
		templateName="";
	}
	
	//var templateData = CKEDITOR.instances['editorIVF'].getData();
	var templateData = CKEDITOR.instances['editorSubObjTreatments'].getData();
	
	
	if (fromDate == "" || fromDate == null || fromDate == undefined) {
		alert("Please select from date...");
		return false;
	}
	
	if (toDate == "" || toDate == null || toDate == undefined) {
		alert("Please select To date...");
		return false;
	}
	if(fromDate > toDate){
		alert("Please select the FROM date less than TO date ");
		return false;
	}
	
	if(templateData ==""){
		alert("Please Insert Template Data");
		return false;
	}
	
	
	
	var inputs = [];

	inputs.push('dietMasterId=' + dietMasterId);

	inputs.push('createdBy=' + userId);

	inputs.push('userId=' + userId);

	inputs.push('unitId=' + unitId);

	inputs.push('updatedBy=' + userId);
	
	inputs.push('fromDate=' + fromDate);
	
	inputs.push('toDate=' + toDate);
	
	inputs.push('templateId=' + templateID);
	
	inputs.push('templateName=' + templateName);
	
	inputs.push('templateData=' + templateData);
	
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('ivftreatmentId=' + ivftreatmentId);
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdiet/saveIVFDiet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}

			getIVFDietListByTreatmentId();
			refreshDietData();
		}
	});

}

/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for refreshDietData
 * *****/
function refreshDietData(){
	$("#dietMasterId").val(0);
	$("#fromDate").val(" ");
	$("#toDate").val(" ");
	$("#customizeTemplatesdiet").val(0);

	CKEDITOR.instances['editorSubObjTreatments'].setData('');
}


/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :get Diet list by treatment id
 * *****/
function getIVFDietListByTreatmentId(){
	
	var treatmentId = $("#ivfTreatId").val();

//var unitId = $("#unitId").val();

var inputs = [];

inputs.push('ivftreatmentId=' + treatmentId);

//inputs.push('unitId=' + unitId);

var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "ehat/ivfdiet/getIVFDietListByTreatmentId",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		// 
	},
	success : function(r) {
		
		setDietListForOPDDoctorStation(r);

	}
});
}


/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :set Diet template data for opd Doctor Station
 * *****/
function setDietListForOPDDoctorStation(res){

	var result='';
	var rowCount=1;
	
	if(res.getListOfIVFDietDTO.length > 0){
		
	for ( var i = 0; i < res.getListOfIVFDietDTO.length; i++) {
		
		
		var dietId  = res.getListOfIVFDietDTO[i].dietMasterId;
		
		result = result
				+ '<tr> '
				
				+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='dietSlaveId" + rowCount + "' value='"
				+ dietId + "' ></td>"
				
				+ '	<td>'
				+res.getListOfIVFDietDTO[i].templateName
				+ '</td> '
				
				+ '	<td>'
				+ res.getListOfIVFDietDTO[i].fromDate
				+ '</td> '

				 +'	<td>'
				+ res.getListOfIVFDietDTO[i].toDate
				+ '</td> '
				
				+'<td><input value="'+rowCount+'"  id="'+dietId+'" name="opddietforeditdelete" type="checkbox"></td>'

		
				
				
				+ '</tr> ';
		rowCount++;
				
	}
	$("#opddietDetail").html(result);
	}
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :edit diet object for  opd Doctor Station
 * *****/
function editIVFDiet(){
	var docId = new Array();
	
	$("input[name='opddietforeditdelete']:checked").each(function() {	
		
		
		
		var dietId=$("#dietSlaveId"+$(this).val()).val();
		
		docId.push(dietId);
		
	});
	
	
	
	if(docId.length > 1){
		alert("Please Select Only One Template To edit...");
		return false;
	}
	
	
	
	
	if(docId.length  == 0 )
		{
		alert("please select Template.");
		return false;
		}
	
	
    var inputs = [];
	inputs.push('dietMasterId=' + docId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdiet/editIVFDiet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			$("#dietMasterId").val(r.dietMasterId);
			$("#fromDate").val(r.fromDate);
			$("#toDate").val(r.toDate);
			$("#customizeTemplatesdiet").select2('val',r.templateId);
		
			//CKEDITOR.instances['editorIVF'].setData(r.templateData);
			
			CKEDITOR.instances['editorSubObjTreatments'].setData(r.templateData);
			
		}
	});
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this function used for delete diet info
 * *****/
function deleteIVFDiet(){
	var docId = new Array();
	var userId		= parseInt($("#userId").val());
	//var userId=1;	
	$("input[name='opddietforeditdelete']:checked").each(function() {	
		
		var dietId=$("#dietSlaveId"+$(this).val()).val();
		
		docId.push(dietId);
	});

	
	if(docId.length === 0){
		alert("Please Select Template..");
		return false;
	}

	
	
	   if(docId.length>0){

		 var inputs = [];
			inputs.push('dietMasterIds=' + docId);
			inputs.push('userId=' + userId);
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/ivfdiet/deleteIVFDiet",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
						
					if(r==0){
						alert("Network issue....");
					}else{
						alert("Record Deleted Successfully");
						getIVFDietListByTreatmentId();
					}
				
					
					
					 
				}
			}); 
	   } 
}


/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for getting template list
 * *****/

function getTemplateListByDepartmentId(){


	//var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('departmentId=' + 1);//diet->diet opd
	inputs.push('unitId=' + $('#unitId').val());

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/admin/getTemplateListByDepartmentId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.customizeTemplateList.length; i++){             
	                divContent = divContent + "<option value='" + r.customizeTemplateList[i].idCustomizeTemplate + "'  >"
	                        + r.customizeTemplateList[i].temp_name + "</option>";
            }
           
            $("#customizeTemplatesdiet").html(divContent);
            $("#customizeTemplatesdiet").select2();
            $("#customizeTemplatesdiet").on("change", function () { 
            	getCustomizeTemplatesIDdiet(); 
            });
		}		
	});

	
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for getting template data by id
 * *****/
function getCustomizeTemplatesIDdiet(){
	
	var id = $("#customizeTemplatesdiet").val();
	if(id==""||id==null||id=="null"){
		$("#customizeTemplatesdiet").val(0);
		
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			//$("#idCustomizeTemplateci").val(r.idCustomizeTemplate);
			//$('#customizeTemplateNameci').val(r.temp_name);
			CKEDITOR.instances['editorSubObjTreatments'].setData(r.temp_data);
			
		}
	});
	
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for print opd diet print
 * *****/
function prinOPDDiet(){
	
//	var billId=$("#billNo").text();    
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var ivfTreatId = $("#ivfTreatId").val();

   
   // var deptId = $("#deptid").val();
	var deptId=1;
  ///  var pendFlag = $("#pendingFlag").val();
	 var pendFlag="N"; 
	 var recId=0;
    
	 var docId = new Array();
		
		$("input[name='opddietforeditdelete']:checked").each(function() {	
			
			var dietId=$("#dietSlaveId"+$(this).val()).val();
		
				docId.push(dietId);
			
		});
		
		
		
		var dietId=$('input[name=opddietforeditdelete]:checked').val();
		
		
		if(dietId == undefined || dietId == null || dietId == "")
			{
			alert("please select Template.");
			return false;
			}
	
		
    
    window.open("ivf_diet_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&dietIds="+docId+"&ivfTreatId="+ivfTreatId);
	
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for calculate patient bmi
 * *****/

function caclculatePatientBMI() {
	var weight = $("#weight").val();
	var height = $("#height").val();
	if (height == "") {
		$("#BMI").val("");
	}

	var BMI = finalCalculatedBMIOPD(height, weight);
	$("#BMI").val(BMI);

	var BSA = finalCalculatedBSAOPD(height, weight);
	$("#BSA").val(BSA);

}

function finalCalculatedBMIOPD(height, weight) {

	var BMI = 0;
	var heightInCM = (height / 100);
	BMI = weight / Math.pow(heightInCM, 2);

	if (BMI == "Infinity")
		BMI = 0;

	if (isNaN(BMI))
		BMI = 0;

	return (BMI.toFixed(2));

}

function finalCalculatedBSAOPD(heightInCm, weightInKg) {

	var BSA = 0;
	BSA = ((Math.sqrt((heightInCm * weightInKg))) / 60);

	if (BSA == "Infinity")
		BSA = 0;

	if (isNaN(BSA))
		BSA = 0;

	return (BSA.toFixed(2));

}

function saveBMIIVFPatientOnLoad(){
	
	var treatmentId = $("#ivfTreatId").val();

	var inputs = [];

	inputs.push('ivftreatmentId=' + treatmentId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdiet/getIVFBMIListByTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			
			if(r.getListOfOPDBmiDTO.length == 0){
				var hw=$("#h_w").text();
				var hwArray=hw.split("/");
				
				var height=hwArray[0];
				var weight=hwArray[1];
				
				 $("#weight").val(weight);
				
				$("#height").val(height);
				
				caclculatePatientBMI();
				saveBMIIVFPatient();
				
			}else{
				getIVFBMIListByTreatmentId();
			}

		}
	});
	
}


/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for save patient bmi
 * *****/
function saveBMIIVFPatient(){
	var opdBmiMasterId = $("#opdBmiMasterId").val();

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();
	
	var ivftreatmentId = $("#ivfTreatId").val();

	

	var userId = $("#userId").val();

	var unitId = $("#unitId").val();
	
	var weight = $("#weight").val();
	
	var height = $("#height").val();
	
	var bmi = $("#BMI").val();
	
	var bsa = $("#BSA").val();
	
	var headCM = $("#HCIM").val();
	
	var bmiDate = $("#BMIDate").val();
	
	var inputs = [];

	inputs.push('opdBmiMasterId=' + opdBmiMasterId);

	inputs.push('createdBy=' + userId);
	
	inputs.push('weight=' + weight);
	
	inputs.push('height=' + height);
	
	inputs.push('bmi=' + bmi);
	
	inputs.push('bsa=' + bsa);
	
	inputs.push('headCM=' + headCM);
	
	inputs.push('bmiDate=' + bmiDate);
	
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('ivftreatmentId=' + ivftreatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdiet/saveIVFPatientBMI",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}

			getIVFBMIListByTreatmentId();
			refreshBMIBSAOPD();
		}
	});
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for refresh patient bmi
 * *****/
function refreshBMIBSAOPD() {
	$("#opdBmiMasterId").val(0);
	$("#weight").val("");
	$("#height").val("");
	$("#HCIM").val("");
	$("#BMI").val("0");
	$("#BSA").val("0");
	
}


/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :get OPD BMI list  for opd Doctor Station
 * *****/
function getIVFBMIListByTreatmentId(){
	
	var treatmentId = $("#ivfTreatId").val();

var inputs = [];

inputs.push('ivftreatmentId=' + treatmentId);

//inputs.push('unitId=' + unitId);

var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "ehat/ivfdiet/getIVFBMIListByTreatmentId",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		// 
	},
	success : function(r) {

		
		setOPDBMIListForOPDDoctorStation(r);

	}
});
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :set OPD BMI List  for opd Doctor Station
 * *****/
function setOPDBMIListForOPDDoctorStation(res) {

	var result = '';
	var rowCount = 1;

	if (res.getListOfOPDBmiDTO.length > 0) {

		for (var i = 0; i < res.getListOfOPDBmiDTO.length; i++) {

			result = result + '<tr> '

			+ '	<td class="col-md-1-1 center">' + rowCount + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDBmiDTO[i].weight + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDBmiDTO[i].height + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDBmiDTO[i].bmi + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDBmiDTO[i].bsa + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDBmiDTO[i].headCM + '</td> '

			+ '	<td class="col-md-1-1 center">' + res.getListOfOPDBmiDTO[i].bmiDate + '</td> '
			
			+ '	<td class="col-md-1-1 center">' 
			+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editBMIBSIVF("+res.getListOfOPDBmiDTO[i].opdBmiMasterId+") > <i class='fa fa-edit'></i> </button>"
           + '</td> '

			+ '</tr> ';
			rowCount++;

		}
		$("#PatientBMIInfoTable").html(result);
	}
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for edit patient bmi
 * *****/
function editBMIBSIVF(opdBmiMasterId){
	
	

var inputs = [];

inputs.push('opdBmiMasterId=' + opdBmiMasterId);

//inputs.push('unitId=' + unitId);


var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ivfdiet/editIVFBMI",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		// 
	},
	success : function(r) {

		$("#opdBmiMasterId").val(r.opdBmiMasterId);
		$("#weight").val(r.weight);
		$("#height").val(r.height);
		$("#HCIM").val(r.headCM);
		$("#BMI").val(r.bmi);
		$("#BSA").val(r.bsa);
		$("#BMIDate").val(r.bmiDate);
	}
});
}
