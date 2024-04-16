
/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 18-3-2021
 * @comment get IVF Patient List On IVF Doctor Desk
 ******************************************************************************/
function getListIVFRegPatientDTO(callFrom,page){
	
	var inputs = [];
	inputs.push("page=" +page);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		
		url : "ehat/ivfdoctordesk/getListIVFRegPatientDTO",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		
			if(page =='current'){
			  setIvfDoctorDeskPatientTemplate(r,callFrom);
			}else{
               setPreviousIvfDoctorDeskPatientTemplate(r,callFrom);
			}
        }
    });	
}

/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 18-3-2021
 * @comment set  IVF Patient Info
 ******************************************************************************/

function setIvfDoctorDeskPatientTemplate(r, callFrom){
	
	var htm = "";
	var rowCount = 0;
	
	if(callFrom == 'dischargeSummary'){
		$("#ivfDischargeSummaryTabelBody").html("");
	
	if (r.getListIVFRegPatientDTO.length > 0) {

		for ( var i = 0; i < r.getListIVFRegPatientDTO.length; i++) {
			rowCount++;
			var date=new Date(r.getListIVFRegPatientDTO[i].createdDateTime).toLocaleString();
			htm = htm
					+ "<tr class='newStudyRowIvfDischargeSummary' id='count"
					+ (rowCount)
					+ "'>"
					
					+ "<td> "+rowCount+"</td>"
					
					+"<td>"+ r.getListIVFRegPatientDTO[i].patientId	+ " </td> "
					
					+"<td>"+ r.getListIVFRegPatientDTO[i].mrnno	+ " </td> "
					
					+"<td>"+ date	+ " </td> "
					
					
					+"<td>"+ r.getListIVFRegPatientDTO[i].patientName	+ " </td> "
					
					+"<td>"+ r.getListIVFRegPatientDTO[i].age+":"+r.getListIVFRegPatientDTO[i].gender	+ " </td> "
					
					
					+ "<td> <button onclick=viewIvfDischargeSummary("+r.getListIVFRegPatientDTO[i].ivf_treat_id+","+r.getListIVFRegPatientDTO[i].treatmentId+") type='button' class='btn btn-xs btn-success'> <i class='fa fa-eye View'></i> </button>"
					+ "</td> "
					
					
					+ "</tr>";
			//rowCount++;
		}
		
		
		$("#ivfDischargeSummaryTabelBody").append(htm);
	  }
	}else{
		
		$("#ivfDoctorDeskTabelBody").html("");
		
		if (r.getListIVFRegPatientDTO.length > 0) {

			for ( var i = 0; i < r.getListIVFRegPatientDTO.length; i++) {
				rowCount++;
				var date=new Date(r.getListIVFRegPatientDTO[i].createdDateTime).toLocaleString();
				htm = htm
						+ "<tr class='newStudyRowIvfDoctorDesk' id='count"
						+ (rowCount)
						+ "'>"
						
						+ "<td> "+rowCount+"</td>"
						
						+"<td>"+ r.getListIVFRegPatientDTO[i].patientId	+ " </td> "
						
						+"<td>"+ r.getListIVFRegPatientDTO[i].mrnno	+ " </td> "
						
						+"<td>"+ date	+ " </td> "
						
						
						+"<td>"+ r.getListIVFRegPatientDTO[i].patientName	+ " </td> "
						
						+"<td>"+ r.getListIVFRegPatientDTO[i].age+":"+r.getListIVFRegPatientDTO[i].gender	+ " </td> "
						
						
						+ "<td> <button onclick=viewIVFDoctorStation("+r.getListIVFRegPatientDTO[i].ivf_treat_id+","+r.getListIVFRegPatientDTO[i].treatmentId+","+r.getListIVFRegPatientDTO[i].patientId+") type='button' class='btn btn-xs btn-success'> <i class='fa fa-eye View'></i> </button>"
						+ "</td> "
						
						
						+ "</tr>";
				//rowCount++;
			}
			
			
			$("#ivfDoctorDeskTabelBody").append(htm);
		  }
	 }
}

function setPreviousIvfDoctorDeskPatientTemplate(r, callFrom){
	
	var htm = "<div class='col-sm-12-1'>"
		       + "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		       + "<thead>"
		       + "<tr>"
		       + "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		       + "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		       + "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Age/Gender</div></th>"

		       + "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>MRN.No.</div></th>"
		       + "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

		       + "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
		 
		       + "</tr>"
		       + "</thead>	"
		       + "</table></div>";
	
	var index = 1;	
	 
	htm =htm+ "<tbody>"	;
	for ( var i = 0; i < r.getListIVFRegPatientDTO.length;i++) {
		
		var datetime= new Date(r.getListIVFRegPatientDTO[i].createdDateTime).toLocaleString();
	 		
		htm= htm
			+ "<tr id='div"+ r.getListIVFRegPatientDTO[i].patientId+"'>"
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.getListIVFRegPatientDTO[i].patientName+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 '>"+ r.getListIVFRegPatientDTO[i].age+":"+r.getListIVFRegPatientDTO[i].gender+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.getListIVFRegPatientDTO[i].mrnno +"</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>";
			
		htm= htm +	"<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreIvfDoctorDesk("+ r.getListIVFRegPatientDTO[i].patientId+")'>";

		htm= htm 	
			+ "<img src='images/down.png' id='imgupdown"+ r.getListIVFRegPatientDTO[i].patientId+"' />"
			+ "<input type='hidden' id='hideShowStatus"+ r.getListIVFRegPatientDTO[i].patientId+"' value='0' /><input type='hidden' id='patientDOB' value='"+ r.getListIVFRegPatientDTO[i].patientId+"' /></td>"
	 		
			+ "</tr>"
			+ "</tbody></table>"
					+ "<tr id='patPreIvfBill"+ r.getListIVFRegPatientDTO[i].patientId+"' style='width:0%;float:right'><td style='display:none' id='td"+ r.getListIVFRegPatientDTO[i].patientId+"'>"
							+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
								+ "<tbody>"
									+ "<tr>"
									+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
									+ "<th style='height: 21.5px;' class='col-md-2 center'>Ivf Treatment ID</th>"
									+ "<th style='height: 21.5px;' class='col-md-4 center'>Treatment Start Date</th>"
									+ "<th style='height: 21.5px;' class='col-md-2 center'>Patient ID</th>"
									+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
									+ "</tr>"
								+ "</tbody>"
							+ "</table>"
						+ "</td></tr>";

	 		index++;
	 
	 }
  $("#ivfPreviousDoctorDeskTabelBody").html(htm);
}


function hideShowPreIvfDoctorDesk(count) {

	var hideShowStatus = $("#hideShowStatus" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreIvfBill" + count).show();
		$("#hideShowStatus" + count).val(1);
		 closeTreatmentDetailsOfIvfPatient(count);

	} else {
		 
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreIvfBill" + count).hide();
		$("#hideShowStatus" + count).val(0);
		//closeTreatmentDetailsOfPatient(count,callfrom);

	}
}
/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 18-3-2021
 * @comment view  IVF Patient Info on IVF Doctor Station
 ******************************************************************************/
function viewIVFDoctorStation(ivfTreatId, TreatmentId,patientId){

	var preflag="IvfTreatment";
	//window.location.href = "IVF_DoctorStation.jsp?" + "treatmentId=" + TreatmentId  + "&IVF_TreatmentId=" + ivfTreatId +"&preflag="+ preflag ;
	window.location.href = "ivf_doctor_station.jsp?" + "tid=" + TreatmentId  + "&IVF_TreatmentId=" + ivfTreatId +"&callfrom="+ "IVF"+"&pid="+ patientId ;
}


/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 18-3-2021
 * @comment set  IVF Patient Info on IVF Doctor Station
 ******************************************************************************/

function getIvfPatientInfoByIVFTreatId(treatmentId){

	var inputs = [];
	inputs.push("ivftreatmentId=" +treatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		
		url : "ehat/ivfdoctordesk/getIvfPatientInfoByIVFTreatId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			
		 
		  $('#pt_Id').val(r.patientId);
		  $('#pid').val(r.patientId);
		  $('#patientId').text(r.patientId);
		  $('#patientName').text(r.patientName);
		  $('#age').text(r.age);
		  var date=new Date(r.createdDateTime).toLocaleString();
		  $('#doa').text(date);
		  
		  $('#sex').text(r.gender);
		 
		
					          
        }
    });	
}


function  closeTreatmentDetailsOfIvfPatient(patientId ) {
	 //alert("hi");
	 var ajaxr="";
		jQuery.ajax({
			async 	: true,
			type : "POST",
			url  : "ehat/ivfdoctordesk/getPrevIvfPatdetails",
			data : {
	   "patientId" : patientId,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			  setIvfTempForInnerLoopDD(response);
		    	 	 
			}
		});
	return ajaxr;
}

function setIvfTempForInnerLoopDD(r1){
	 //alert("hi");
	 var htm="";
	 for ( var j = 0; j < r1.listIvfTreatment.length;j++) {
		 var date= new Date(r1.listIvfTreatment[j].createdDateTime).toLocaleString();
		  
		 htm=htm+ "<tr id='div"+ r1.listIvfTreatment[j].patientId+"'>";
		 htm=htm	+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listIvfTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listIvfTreatment[j].ivfTreatId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+date+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listIvfTreatment[j].patientId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 center'>";
		/* htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='viewPreIVFDoctorStation("+ r1.listIvfTreatment[j].ivfTreatId+","+ r1.listIvfTreatment[j].treatmentId+","+ r1.listIvfTreatment[j].patientId+")'>";*/
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='viewIVFDoctorStation("+ r1.listIvfTreatment[j].ivfTreatId+","+ r1.listIvfTreatment[j].treatmentId+","+ r1.listIvfTreatment[j].patientId+")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.listIvfTreatment[j].patientId+"' id='rowCount' /></tr>";
		 
		 
		 $("#patPreIvfBill" + r1.listIvfTreatment[j].patientId).html(htm);
		 $("#td" + r1.listIvfTreatment[j].patientId).show();
		}
	
	 
}

function viewPreIVFDoctorStation(ivfTreatId, TreatmentId){
		var preflag="previousIvfTreatment";
		window.location.href = "IVF_DoctorStation.jsp?" + "treatmentId=" + TreatmentId  + "&IVF_TreatmentId=" + ivfTreatId +"&preflag="+ preflag ;
	}

function setIvfAutoPatientName(inputID,callFrom) {
	

	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var callFromPrevIvfDD = "";
	var callFromIvfDD = "";
	if(callFrom == "prevIvfDD"){
		
		callFromPrevIvfDD = "prevIvfDD";
		callFrom = "prevIvf";
	}
	
    if(callFrom == "IvfDD"){
		
    	callFromIvfDD = "IvfDD";
		callFrom = "IvfDoctorDesk";
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdoctordesk/autoSuggestionOfPrevIvfPatient",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
				resultData.push({
					ID : idValue,
					Name : patName
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
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		
        if(callFromIvfDD == "IvfDD"){
			
			setSearchedPatientIvfDDTemp(patId);
		}	 
		if(callFromPrevIvfDD == "prevIvfDD"){
			
			setSearchedPatientPrevIvfDDTemp(patId);
		}		
	}
}

function setSearchedPatientIvfDDTemp(patId){
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
   
    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/ivfdoctordesk/getIvfPatientTreatmentForDD",		
		success : function(r) {
			 
			setIvfDoctorDeskPatientTemplate(r);  		
		}
	});
}


function setSearchedPatientPrevIvfDDTemp(patId){
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
   
    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/ivfdoctordesk/getPreviousIvfPatientTreatment",		
		success : function(r) {
			 
			setPreviousIvfDoctorDeskPatientTemplate(r,'doctorDesk');  		
		}
	});
}



function getPatientOnIvfDoctorDesk(){
	
	var fromDate=$("#fromDate").val();
	var toDate=$("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var page="current";
	 var inputs = [];
	    inputs.push('fromDate=' + fromDate);
	    inputs.push('toDate=' + toDate);
	    inputs.push('page=' + page);
	    var str = inputs.join('&');
		jQuery.ajax({
			async 	: false,
			type 	: "GET",
			data 	: str + "&reqType=AJAX",
	 		url 	: "ehat/ivfdoctordesk/getPatientOnIvfDoctorDesk",		
			success : function(r) {
				 

				
				$("#ivfDoctorDeskTabelBody").html("");
				
				var htm="";
				
				if (r.getListIVFRegPatientDTO.length > 0) {

					for ( var i = 0; i < r.getListIVFRegPatientDTO.length; i++) {
						rowCount++;
						var date=new Date(r.getListIVFRegPatientDTO[i].createdDateTime).toLocaleString();
						htm = htm
								+ "<tr class='newStudyRowIvfDoctorDesk' id='count"
								+ (rowCount)
								+ "'>"
								
								+ "<td> "+rowCount+"</td>"
								
								+"<td>"+ r.getListIVFRegPatientDTO[i].patientId	+ " </td> "
								
								+"<td>"+ r.getListIVFRegPatientDTO[i].mrnno	+ " </td> "
								
								+"<td>"+ date	+ " </td> "
								
								
								+"<td>"+ r.getListIVFRegPatientDTO[i].patientName	+ " </td> "
								
								+"<td>"+ r.getListIVFRegPatientDTO[i].age+":"+r.getListIVFRegPatientDTO[i].gender	+ " </td> "
								
								
								+ "<td> <button onclick=viewIVFDoctorStation("+r.getListIVFRegPatientDTO[i].ivf_treat_id+","+r.getListIVFRegPatientDTO[i].treatmentId+","+r.getListIVFRegPatientDTO[i].patientId+") type='button' class='btn btn-xs btn-success'> <i class='fa fa-eye View'></i> </button>"
								+ "</td> "
								
								
								+ "</tr>";
						//rowCount++;
					}
					
					
					$("#ivfDoctorDeskTabelBody").append(htm);
				  }
			 	
			}
		});
	
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