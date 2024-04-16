/**
 *  added by vishant pawar
 */


/************
* @author	: vishant pawar
* @date		: 27-Oct-2023
* @codeFor	: Get Specialization For dropdown
 ************/
function getSpecialization(callFrom,dropDownId) {
	
	var person = {
        unitId : $("#unitId").val(),
        userId : $("#userId").val(),
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/register/getSpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setSpecialization(r,dropDownId);
        }        
    });
}
/************
* @author	: vishant pawar
* @date		: 27-Oct-2023
* @codeFor	: set Specialization For dropdown
 ************/
function setSpecialization(r,dropDownId){
	
	var htm = "<option value=0>-Select Speciality-</option>";
	for ( var i = 0; i < r.lstSpecialization.length; i++) {

		htm = htm + "<option value="+r.lstSpecialization[i].idhospital_Specialization+">"+r.lstSpecialization[i].specialization_name+"</option>";
	}
	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
}


/************
* @author	: vishant pawar
* @date		: 27-Oct-2023
* @codeFor	: Get all prefix dropdown
 ************/
function getDoctorBySpecialization(callFrom,dropDownId) {
	
	var doctorId = 0;
	if(callFrom == "speciality"){
		
		doctorId = $("#specialityId").val();
		
	}
	
	var person = {
		doctor_id : doctorId,
        unitId : $("#unitId").val(),
        userId : $("#userId").val(),
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDoctorBySpecialization(r,dropDownId);
        }        
    });
}
/************
* @author	: vishant pawar
* @date		: 27-Oct-2023
* @codeFor	: Set all prefix dropdown
 ************/
function setDoctorBySpecialization(r,dropDownId){
	
	var htm = "<option value=0>-Select Doctor-</option>";
	for ( var i = 0; i < r.lstDoctorBySpecialization.length; i++) {

		htm = htm + "<option value="+r.lstDoctorBySpecialization[i].doctor_id+">"+r.lstDoctorBySpecialization[i].doc_name+"</option>";
	}
	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
}


function setCurrantDate()
{
	//doctorDeskPatientCount();
	$("#fromopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toopdDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#ipdfromDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ipdtoDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#fromerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#toerDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
	$("#FormDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	$("#ToDate").val($.datepicker.formatDate('yy-mm-dd', new Date()));
	
}


function disableDocNameInMultiSelect(){
	
	$('#spclwiseDoc').select2('open');
}


/************
* @author	: vishant pawar
* @date		: 27-Oct-2023
* @codeFor	: Set all prefix dropdown
 ************/
function fetchOPDMisReport(){
	
	
	var fromDate  = $("#fromDate").val();
	var toDate  = $("#toDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var specialityId = $('#specialityId').find(":selected").val();
	var doctorId = $('#doctorName').find(":selected").val();
	var searchByMisReport="All";
	
	if(specialityId!=0){
		
		if(doctorId==0){
			searchByMisReport="SpecialityWise";
			
		}
		else{
			searchByMisReport="DoctorWise";
		}
		
		
	}
	
	
	var inputs = [];
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('specialityId=' + specialityId);
	inputs.push('doctorId=' + doctorId);
	inputs.push('searchByMisReport=' + searchByMisReport);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/mis/fetchOPDMisReport",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		
		if(r.list.length==0){
			alertify.error("Record Not Found..")
		}
		else{
			alertify.success("Record Fetch Successfully..")
		}
			
		var htm = "";
		
		var fdate = convertToDateFormat(fromDate);
		var tdate = convertToDateFormat(toDate);
		
		var totalPatient=0;
		var totalAmount=0;
		//var totalDiscount=0;
		

		for(var i =0; i<r.list.length;i++){	
			var srNo = Number((i+1));
			
			htm = htm
					+ '<tr> '
					+ " <td class='col-md-1-1 center' >"
					+ srNo
					+ '</td>'
					
					+ " <td class='col-md-2-1 center' style='width:10%;'>"
					+ fdate
					+ "</td>"
					+ " <td class='col-md-1-1 center' style='width:8%;'>"
					+ tdate
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:20%;'>"
					+ r.list[i].specialityName
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:10%;'>"
					+ r.list[i].doctorName
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].patientCount
					+ "</td>"
					+ " <td class='col-md-2-1 center' style='width:8%;'>"
					+ r.list[i].totalBill
					+ "</td>"
					
					+ '</tr>';
			
			totalPatient = totalPatient + r.list[i].patientCount;
			totalAmount = totalAmount + r.list[i].totalBill;
			
			if(r.list.length==(i+1)){
				htm = htm
				 + '<tr> '
				 + " <td class='col-md-2-1 center' style='width:8%; border: 0;'>"
				 + " "
				 + "</td>"
				 + " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
				 + " "
				 + "</td>"
				 + " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
				 + " "
				 + "</td>"
				 + " <td class='col-md-2-1 center' style=' width:8%; border: 0;'>"
				 + " "
				 + "</td>"
				 + " <td class='col-md-2-1 center' style=' width:8%; border: 0;'><b> Total </b></td>"
				 + " <td class='col-md-2-1 center' style=' width:8%; border: 0;'><b>"+totalPatient+'</b></td>'
				 + " <td class='col-md-2-1 center' style=' width:8%; border: 0;'><b>"+totalAmount+'</b></td>'
				 
				 + ' </tr> '
			}
			
			
			
			$("#setopdmisreportdata").html(htm);
			
		}
		
			
		}
	});
	
	
}

function convertToDateFormat(dateString) {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split("-");
    let dat = d[2] + '/' + d[1] + '/' + d[0];
    return dat;     
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