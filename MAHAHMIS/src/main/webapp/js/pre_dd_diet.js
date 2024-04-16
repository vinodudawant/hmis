/******
	 * @author   :HM00054
	 * @Date     :23-12-2021
	 * @Code     :this method used for get and set diet template on Doctor Desk
	 * *****/
function getDietTemplate(id){
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#Prescription").hide();
	
	//Added By Akshata 
	$("#ddInstructions").hide();
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
	+' onclick="saveOPDDiet();" disabled="true">'
	+'<i class="far fa-save"></i>Save</label>'
	+'<label value="Edit" id="" class="btn" '
	+'style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left:2%;" '
	+'onclick="editOPDDiet();" disabled="true"> '
	+'<i class="fa fa-edit"></i> Edit</label>'
	+'<label value="Delete" '
	+' id="" class="btn" '
	+'style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left:1%;" '
	+'onclick="deleteOPDDiet();" disabled="true">'
	+' <i class="fa fa-trash-o"></i>Delete</label>'
	+'<label style="margin-left:27px;padding-top:0px" onclick="prinOPDDiet();" disabled="true"class="btn">'
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
	
	getOPDDietListByTreatmentId();
	getTemplateListByDepartmentId();
	//getcustomizelist();
}

/******
 * @author   :HM00054
 * @Date     :23-12-2021
 * @Code     :this method used for save opd diet info
 * *****/
function saveOPDDiet(){
	var dietMasterId = $("#dietMasterId").val();

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();

	

	//var userId = $("#userId").val();
	var userId=1;

	//var unitId = $("#unitId").val();
	var unitId=1;
	
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
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdhistory/saveOPDiet",
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

			getOPDDietListByTreatmentId();
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
function getOPDDietListByTreatmentId(){
	
	var treatmentId = $("#tr_Id").val();

//var unitId = $("#unitId").val();

var inputs = [];

inputs.push('treatmentId=' + treatmentId);

//inputs.push('unitId=' + unitId);

var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "ehat/opdhistory/getOPDDietListByTreatmentId",
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
	
	if(res.getListOfOPDDietDTO.length > 0){
		
	for ( var i = 0; i < res.getListOfOPDDietDTO.length; i++) {
		
		
		var dietId  = res.getListOfOPDDietDTO[i].dietMasterId;
		
		result = result
				+ '<tr> '
				
				+ "<td> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden'   id='dietSlaveId" + rowCount + "' value='"
				+ dietId + "' ></td>"
				
				+ '	<td>'
				+res.getListOfOPDDietDTO[i].templateName
				+ '</td> '
				
				+ '	<td>'
				+ res.getListOfOPDDietDTO[i].fromDate
				+ '</td> '

				 +'	<td>'
				+ res.getListOfOPDDietDTO[i].toDate
				+ '</td> '
				
				+'<td><input value="'+rowCount+'"  id="'+dietId+'" disabled="disabled" name="opddietforeditdelete"  type="checkbox" ></td>'

		
				
				
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
function editOPDDiet(){
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
		url : "ehat/opdhistory/editOPDDiet",
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
function deleteOPDDiet(){
	var docId = new Array();
//	var userId		= parseInt($("#userId").val());
	var userId=1;	
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
				url : "ehat/opdhistory/deleteOPDDiet",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
						
					if(r==0){
						alert("Network issue....");
					}else{
						alert("Record Deleted Successfully");
						getOPDDietListByTreatmentId();
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

	inputs.push('departmentId=' + 17);//diet->diet opd
	inputs.push('unitId=' + 1);

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
           
           /* for ( var i = 0; i < r.customizeTemplateList.length; i++){             
	                divContent = divContent + "<option value='" + r.customizeTemplateList[i].idCustomizeTemplate + "'  >"
	                        + r.customizeTemplateList[i].temp_name + "</option>";
            }*/
			
			 for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
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
			CKEDITOR.instances['editorSubObjTreatments'].setData(r.tempdata);
			
		}
	});
	
}

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for print opd diet print
 * *****/
function prinOPDDiet(){
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	 var patientName = $("#patientName").text();
	 var printTitle="OPD DIET";
	 
    
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
	
		
    
    window.open("opd_diet_print.jsp?treatmentId="+treatId+"&dietIds="+docId+"&printTitle="+printTitle+"&patientName="+patientName);
	
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

/******
 * @author   :Dayanand khandekar
 * @Date     :17-12-2021
 * @Code     :this method used for save patient bmi
 * *****/
function saveBMIOPDPatient(){
	var opdBmiMasterId = $("#opdBmiMasterId").val();

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();

	

	//var userId = $("#userId").val();
	var userId=1;

	//var unitId = $("#unitId").val();
	var unitId=1;
	
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
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdhistory/saveOPDPatientBMI",
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

			getOPDBMIListByTreatmentId();
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
function getOPDBMIListByTreatmentId(){
	
	var treatmentId = $("#tr_Id").val();

//var unitId = $("#unitId").val();

var inputs = [];

inputs.push('treatmentId=' + treatmentId);

//inputs.push('unitId=' + unitId);

var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "ehat/opdhistory/getOPDBMIListByTreatmentId",
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
	
	 
	if(res.getListOfOPDBmiDTO.length == 0 ){
		saveBMIDetailsOnLoad();
	}

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
			+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editBMIBSAOPD("+res.getListOfOPDBmiDTO[i].opdBmiMasterId+" )  disabled='disabled'> <i class='fa fa-edit'></i> </button>"
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
function editBMIBSAOPD(opdBmiMasterId){
	
	

var inputs = [];

inputs.push('opdBmiMasterId=' + opdBmiMasterId);

//inputs.push('unitId=' + unitId);


var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/opdhistory/editOPDBMI",
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

function  saveBMIDetailsOnLoad(){
	
	var opdBmiMasterId = $("#opdBmiMasterId").val();

	var treatmentId = $("#tr_Id").val();
	
	var patientId = $("#pt_Id").val();

	var heightWeight=$("#h_w").text();
	
	var height	=0;
		var weight=0;
		var hw=heightWeight.split("/");
	if(heightWeight == " " || heightWeight == "undefined" || heightWeight == "null" || heightWeight == null || heightWeight == undefined){
	
	}else{
		 height	=hw[0];
		 weight	=hw[1];
	}
		

	var userId=1;

	var unitId=1;
	
	var bmi = finalCalculatedBMIOPD(height, weight);
	var bsa = finalCalculatedBSAOPD(height, weight);
	
	var headCM="";
	
	//var bmiDate = $("#BMIDate").val();
	
	var bmiDate=$("#date").val();
	
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
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdhistory/saveOPDPatientBMI",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				//alert("Record Saved Successfully");
			} else if (r == 2) {
				//alert("Record Updated Successfully");
			} else {
				//alert("Network Issue..");
			}

			getOPDBMIListByTreatmentId();
			refreshBMIBSAOPD();
		}
	});
	
}
