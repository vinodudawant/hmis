/*******************************************************************************
 * @author Ganesh Patil
 * @date
 * @Code Get all Diagnostic Patient records.
 ******************************************************************************/
function getAllDignoPat(callfrom) {
	var deptId = 3;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		url : "ehat/registration/getAllRecordsForOPDque1",
		success : function(res) {
			var divContent="";
			if(res.listRegTreBillDto.length>=0){
				
				if(callfrom=="assigntest"){
					for ( var i = 0; i < res.listRegTreBillDto.length; i++) {
						var fullName = res.listRegTreBillDto[i].patientName;
						var patId= res.listRegTreBillDto[i].patientId; 		
						var datetime= new Date(res.listRegTreBillDto[i].createdDateTime).toLocaleString();
						divContent = divContent	+ "<tr>"
								+ "	<td class='col-md-1 center'>"+ (i+1)+ "</td>"
								+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"	+ fullName + "</td>"
								+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"+ patId + "</td>"
								+ "	<td class='col-md-1 center'>"+res.listRegTreBillDto[i].opdipdno+ "</td>"
								+ "	<td class='col-md-1 center'>"+datetime+"</td>"
								
								+ "	<td class='col-md-1 center'><input type='button' value='Add Test' class='btn btn-xs btn-success' id='btnView"
								+ (i+1) + "' " + "onclick=viewDiagnosticsPatientAssignTests2("+ res.listRegTreBillDto[i].treatmentId+ ") />" + "	</td></tr>";
					}
			$('#diagnosticAssignTestBody').html(divContent);
				}else if(callfrom=="bill"){
					for ( var i = 0; i < res.listRegTreBillDto.length; i++) {
						var fullName = res.listRegTreBillDto[i].patientName;
						var patId= res.listRegTreBillDto[i].patientId; 		
						var datetime= new Date(res.listRegTreBillDto[i].createdDateTime).toLocaleString();
						divContent = divContent	+ "<tr>"
								+ "	<td class='col-md-1 center'>"+ (i+1)+ "</td>"
								+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"	+ fullName + "</td>"
								+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"+ patId + "</td>"
								+ "	<td class='col-md-1 center'>"+res.listRegTreBillDto[i].opdipdno+ "</td>"
								+ "	<td class='col-md-1 center'>"+datetime+"</td>"
								
								+ "	<td class='col-md-1 center'><input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnView"
								+ (i+1) + "' " + "onclick=viewBillForDigno("+ res.listRegTreBillDto[i].treatmentId+ ") />" + "	</td></tr>";
					}
				$('#diagnosticBillTestBody').html(divContent);
				}
			
		}
		}
	});
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 
 * @Code for previous Treatment list
 ******************************************************************************/
function getAllRecordsForPrevDigo(callfrom) {
	var searchtext="";
if(callfrom=='search'){
	 searchtext=$("#searchId").val();
	
	if(searchtext=="" || searchtext==null){
		alert("Please Enter text");
		return false;
	}
}
	var inputs = [];
	inputs.push('callfrom=' + callfrom);
	inputs.push('text=' + searchtext);
	var str = inputs.join('&');
	jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/diagnostics/getPreviousDiagnosisPatientList",
				success : function(r) {
					var divContent = "";
					if(r.lstRegviewDto.length > 0){
						for ( var i = 0; i < r.lstRegviewDto.length; i++) {
							divContent = divContent
									+ "<tr id='div123'>"
									+ "<td class='col-md-1 center'>"+ (i + 1)+ "</td>"
									+ "<td class='col-md-1 '>"+ r.lstRegviewDto[i].patientName + "</td>"
									+ "<td class='col-md-1 center'>"+ r.lstRegviewDto[i].mobile	+ "</td>"
									+ "<td class='col-md-1 center'>"+ r.lstRegviewDto[i].ptId	+ "</td>"
									+ "<td class='col-md-1 center'>"+ new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString()	+ "</td>"
									+ "<td class='col-md-1 center' style='width:3%;'><button class='btn btn-xs btn-success' type='button' onclick='viewPreviousTreatments("+r.lstRegviewDto[i].ptId +","+i+")'>View</button><input type='hidden' id='pnamee"+i+"' value='"+r.lstRegviewDto[i].patientName+"'></td>";
									+ "</tr>";
						}
					}else{
						divContent = divContent
						+ "<tr style='color:red; font-size:15px;'><td class='center' colspan='12'>Record Not Found...!!!</td></tr>";	
					}
					
					$("#diagnosticPreviousTreatmentBody").html(divContent);
				}
			});
}




/*******************************************************************************
 * @author Ganesh Patil
 * @date 
 * @Code for view 
 ******************************************************************************/
function viewDiagnosticsPatientAssignTests2(treatmentId){
	window.location.href = "diagnosticPatientTestAssignNew.jsp?" + "treatmentId="+ encodeURIComponent(treatmentId);
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 
 * @Code for view 
 ******************************************************************************/
function viewBillForDigno(treatId){
	window.location = "ehat_billing.jsp?" + "treatmentId=" + treatId;
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Lab Test Current Tab
*******************************************************************************/
function getLabTestResultPatientDashboard(){
	var inputs = [];
	var callFrom="C";
	var patientType =document.querySelector('input[name="currentPatientType"]:checked').value;
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/getAllCurrentLabTestResult",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r.listLabResultMstViewDto.length>=0){
				var divContent = "";
				for ( var i = 0; i < r.listLabResultMstViewDto.length; i++) {
					divContent = divContent+ '<tr style="height:2px;">'
							+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].patientName +"</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].patientId +"</td>";	
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].age +"</td>";			
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].gender+"</td>";		
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].assignDate +"</td>";	
					divContent = divContent 
							+ "<td class='col-md-1 center'>"+((r.listLabResultMstViewDto[i].departmentId==1) ? "OPD" : (r.listLabResultMstViewDto[i].departmentId==2) ? "IPD" : "Diagnosis") +"</td>";	
					divContent = divContent
						+ "<td class='col-md-2 center'>"+r.listLabResultMstViewDto[i].testName +"</td>";	
					/*divContent = divContent+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-success' data-toggle='tooltip' data-placement='bottom' title='View Phlebotomy' onclick=viewPhlebotomy('"+r.listLabResultMstViewDto[i].labrequestId+"','"+r.listLabResultMstViewDto[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
					*/
							/*+ "<td class='col-md-1 center'> fff <i class='fa fa-check' aria-hidden='true'></i></td>";*/	
					divContent = divContent+ " <td class='col-md-1 center'>"
							+ "<button class='btn btn-xs btn-success' data-toggle='tooltip' data-placement='bottom' title='View Phlebotomy' onclick=viewPhlebotomy('"+r.listLabResultMstViewDto[i].labrequestId+"','"+r.listLabResultMstViewDto[i].treatmentId+"')><i class='fa fa-edit'></i></button></td></tr>";
					/*divContent = divContent+ " <td class='col-md-1 center'>"
							+ '<input type="checkbox" value=""  name="currentRecordCheckbox" id="currentRecordCheckbox'+ i + '" onclick="checkPatientId(this.id,'+r.listLabResultMstViewDto[i].patientId+','+r.listLabResultMstViewDto[i].treatmentId+','+r.listLabResultMstViewDto[i].testid+','+r.listLabResultMstViewDto[i].labrequestId+','+r.listLabResultMstViewDto[i].rate+')"/></td>';
							+'</tr>';*/
				}
				$('#currentRecordTableBody').html(divContent);
				//setTempLabTestResultPatientDashboard(r, callFrom);
			
				var numberOfRows = "";
				var index = 1;
				var count = r.noOfPages;
				var numberOfPages = (count/10);
				var displayPagination = numberOfPages;			
				if(numberOfPages > 5){
					numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
					displayPagination=5;
				}
				for(var j = 0; j < displayPagination; j++){
					numberOfRows +="<li onclick='currentRecordPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+index+"</a></li>";
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextCurrentRecordPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#totalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#totalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					//$('#currentRecordJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='currentPageNo' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\");'>Go</button></a></li>");
				}
				$('#patientRecordPagination').html(numberOfRows);
			}
		}
	});
}

/********************************************************************************
 * @author Akshay Mache
 * @since  13 Feb 2020
 * @comment To set template for Lab Test Current Tab
*******************************************************************************/
function setTempLabTestResultPatientDashboard(r, callFrom){
	if(callFrom == "C") {
		if(r.listLabResultMstViewDto.length>=0){
			var divContent = "";
			for ( var i = 0; i < r.listLabResultMstViewDto.length; i++) {
				divContent = divContent+ '<tr style="height:2px;">'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].patientName +"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].patientId +"</td>";	
				divContent = divContent
						+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].age +"</td>";			
				divContent = divContent
						+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].gender+"</td>";		
				divContent = divContent
						+ "<td class='col-md-1 center'>"+r.listLabResultMstViewDto[i].assignDate +"</td>";	
				divContent = divContent 
						+ "<td class='col-md-1 center'>"+((r.listLabResultMstViewDto[i].departmentId==1) ? "OPD" : (r.listLabResultMstViewDto[i].departmentId==2) ? "IPD" : "Diagnosis") +"</td>";	
				divContent = divContent
					+ "<td class='col-md-2 center'>"+r.listLabResultMstViewDto[i].testName +"</td>";	
				/*divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' data-toggle='tooltip' data-placement='bottom' title='View Phlebotomy' onclick=viewPhlebotomy('"+r.listLabResultMstViewDto[i].labrequestId+"','"+r.listLabResultMstViewDto[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
				*/
						/*+ "<td class='col-md-1 center'> fff <i class='fa fa-check' aria-hidden='true'></i></td>";*/	
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' data-toggle='tooltip' data-placement='bottom' title='View Phlebotomy' onclick=viewPhlebotomy('"+r.listLabResultMstViewDto[i].labrequestId+"','"+r.listLabResultMstViewDto[i].treatmentId+"')><i class='fa fa-edit'></i></button></td></tr>";
				/*divContent = divContent+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value=""  name="currentRecordCheckbox" id="currentRecordCheckbox'+ i + '" onclick="checkPatientId(this.id,'+r.listLabResultMstViewDto[i].patientId+','+r.listLabResultMstViewDto[i].treatmentId+','+r.listLabResultMstViewDto[i].testid+','+r.listLabResultMstViewDto[i].labrequestId+','+r.listLabResultMstViewDto[i].rate+')"/></td>';
						+'</tr>';*/
			}
			$('#currentRecordTableBody').html(divContent);
		}
	}else if(callFrom == "P") {
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		}else{
			for( var i = 0; i < r.phlebotomytableList.length; i++) {				
				var id = r.phlebotomytableList[i].id;
				var sampleName = r.phlebotomytableList[i].samplename;
				var collectionDate = r.phlebotomytableList[i].collectionDate;
				var collectionTime = r.phlebotomytableList[i].collectionTime;
				var collectionCenter = r.phlebotomytableList[i].collectionname;
				
				var patientName = r.phlebotomytableList[i].patientname;
				var patientId = r.phlebotomytableList[i].patientId;
				var age = r.phlebotomytableList[i].age;
				var sex = r.phlebotomytableList[i].gender;
				
				htmBody = htmBody + "<tr style='height:21px;'>"
					+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname +"<input type='hidden' id='patientName"+id+"' value='"+patientName+"'/></td>" 
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId +"<input type='hidden' id='patientId"+id+"' value='"+patientId+"'/></td>"
					+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname +"<input type='hidden' id='age"+id+"' value='"+age+"'/></td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+"<input type='hidden' id='sex"+id+"' value='"+sex+"'/></td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 							
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";
				htmBody = htmBody + "<input type='hidden' value='"+ r.phlebotomytableList.length+"' id='processsArealistLength' />";

				htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
		
				htmBody = htmBody 	+ "<td  class='col-md-1 center'> <button class='btn btn-xs btn-warning' " 
					+'onclick="openBarcodePopup('+id+ ',\'' +sampleName+'\',\'' +collectionDate+'\',\'' +collectionTime+'\',\'' +collectionCenter+'\')" '+"><i class='fa fa-barcode' ></i></button></a> </td>";
				
				if(r.phlebotomytableList[i].teststatus=="P" && r.phlebotomytableList[i].accpetedflag=="Y"){
					htmBody = htmBody+ "<td class='col-md-1 center'>"
			 			+ "<button class='btn btn-xs btn-success'><i class='fa fa-check' aria-hidden='true'style='width:60px;'></i></button></td>";	
				
					htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' disabled='disabled' onclick=editProcessArea('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
				
					htmBody = htmBody+ " <td class='col-md-1 center'>"
				    	+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetch('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
				 
					htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox"  disabled="disabled" value="'+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].treatmentId+'"  name="outsourceCheckbox" id="outsourceCheckbox'+ i + '"   onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';
				}else if(r.phlebotomytableList[i].teststatus=="P" && r.phlebotomytableList[i].accpetedflag=="N"){
					htmBody = htmBody+ "<td class='col-md-1 center'>"
			 			+ "<button class='btn btn-xs btn-danger'><i class='fa fa-times' aria-hidden='true'style='width:60px;'></i></button></td>";	
				
					htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editProcessArea('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-edit'></i></button></td>";
				 
					htmBody = htmBody+ " <td class='col-md-1 center'>"
				    	+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetch('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
				 
					htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value="'+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].treatmentId+'"  name="outsourceCheckbox" id="outsourceCheckbox'+ i + '"   onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';
				}
			}
		}
		$("#diagnosticProcessAreaId").html(htmBody);
	} else if(callFrom == "U") {
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for( var i = 0; i < r.phlebotomytableList.length; i++) {				
				var id = r.phlebotomytableList[i].id;
				var sampleName = r.phlebotomytableList[i].samplename;
				var collectionDate = r.phlebotomytableList[i].collectionDate;
				var collectionTime = r.phlebotomytableList[i].collectionTime;
				var collectionCenter = r.phlebotomytableList[i].collectionname;
				
				var patientName = r.phlebotomytableList[i].patientname;
				var patientId = r.phlebotomytableList[i].patientId;
				var age = r.phlebotomytableList[i].age;
				var sex = r.phlebotomytableList[i].gender;
				
				htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname +"<input type='hidden' id='patientName"+id+"' value='"+patientName+"'/></td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId +"<input type='hidden' id='patientId"+id+"' value='"+patientId+"'/></td>"
						+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname +"<input type='hidden' id='age"+id+"' value='"+age+"'/></td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+"<input type='hidden' id='sex"+id+"' value='"+sex+"'/></td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";	
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
		
				htmBody = htmBody 	+ "<td  class='col-md-1 center'> <button class='btn btn-xs btn-warning' " 
					+'onclick="openBarcodePopup('+id+ ',\'' +sampleName+'\',\'' +collectionDate+'\',\'' +collectionTime+'\',\'' +collectionCenter+'\')" '+"><i class='fa fa-barcode' ></i></button></a> </td>";

				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value="'+r.phlebotomytableList[i].id+'"  name="unauthorisedRecordCheckbox" id="unauthorisedRecordCheckbox'+ i + '"/></td>';
						+'</tr>';				
			}
		}
		$("#diagnosticUnauthorisedBody").html(htmBody);
	}else if(callFrom == "A"){
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
				htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
						+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"  										
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";	
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
		
				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value="'+r.phlebotomytableList[i].treatmentId+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].gender+'" name="authorisedRecordCheckbox" id="authorisedRecordCheckbox'+ i + '" onclick=checktreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';	
				
						//value="'+r.phlebotomytableList[i].treatmentId+'","'+r.phlebotomytableList[i].labrequestId +'","'+r.phlebotomytableList[i].id'","'+r.phlebotomytableList[i].treatmentId+'"
				}
		}
		$("#diagnosticAuthorisedBody").html(htmBody);
	}else if(callFrom == "H"){
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
				htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
						+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"									
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 								
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";
				htmBody = htmBody+ " <td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
		
				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
				/*htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value=""  name="holdRecordCheckbox" id="holdRecordCheckbox'+ i + '"/></td>';*/
						+'</tr>';				
				}
		}
		$("#diagnosticHoldBody").html(htmBody);
	}else if(callFrom == "R"){
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
				htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
						+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"									
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 								
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+"</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>"
						+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].rejectedreason + "</td>";
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
		
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-primary' onclick=changeStatusOfLabReport('recall','"+r.phlebotomytableList[i].id+"')><i class='fa fa-edit'></i></button></td>";
				/*htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value=""  name="recallRecordCheckbox" id="recallRecordCheckbox'+ i + '"/></td>';*/
						+'</tr>';				
				}
		}
		$("#diagnosticRecallBody").html(htmBody);
	}else if(callFrom == "PR"){
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for ( var i = 0; i < r.phlebotomytableList.length; i++) {				
				htmBody = htmBody + "<tr style='height:21px;'>"
						+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname + "<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.phlebotomytableList[i].patientname+"'/></td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId  + "</td>"
						+ "<td class='col-md-1 center'>" + r.phlebotomytableList[i].collectionname + "</td>"										
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionDate+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].collectionTime+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 							
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleQuantity+ "</td>" 
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].sampleUnit+ "</td>"
						+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].containername+ "</td>";	
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
				+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";
		
				htmBody = htmBody+ "<td class='col-md-1 center'>" 
				+ "<input type='button' class='btn btn-xs btn-danger' id='Emailid"+(i+1)+"' value='Email' onclick=emailReportingTestPatient("+(i+1)+","+r.phlebotomytableList[i].treatmentId+","+r.phlebotomytableList[i].labrequestId+",\'"+r.phlebotomytableList[i].id+"\',\'"+r.phlebotomytableList[i].gender+"\')></td>";	
			    + "<td class='col-md-1 center'></td>";		
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-primary' onclick=routineValuefetchOther('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].teststatus+"','"+r.phlebotomytableList[i].accpetedflag+"')><i class='fa fa-edit'></i></button></td>";
								    
			   htmBody = htmBody+ " <td class='col-md-1 center'>"
						+ '<input type="checkbox" value="'+r.phlebotomytableList[i].treatmentId+','+r.phlebotomytableList[i].labrequestId+','+r.phlebotomytableList[i].id+','+r.phlebotomytableList[i].gender+'"  name="previousRecordCheckbox" id="previousRecordCheckbox'+ i + '" onclick=checkPreviousTreatmentId(this.id,'+r.phlebotomytableList[i].treatmentId+')></td>';
						+'</tr>';	    
				}
		}
		$("#previousRecordTableBody").html(htmBody);
	}else if(callFrom == "O"){
		var htmBody = "";
    	if (r.phlebotomytableList.length == 0 || r.phlebotomytableList.length == null) {
			htmBody = htmBody
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		}else {
			for ( var i = 0; i < r.phlebotomytableList.length; i++) {			
				htmBody = htmBody + "<tr style='height:21px;'>"
					+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].dispatchDate + "</td>" 
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].dispactchTime  + "</td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].samplename+ "</td>" 										
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientname+ "</td>"
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].patientId+ "</td>" 
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].age+"</td>" 
					+ "<td class='col-md-1 center' >" + r.phlebotomytableList[i].gender+ "</td>"					
				htmBody = htmBody+ " <td class='col-md-1 center'>"
			    	+ "<button class='btn btn-xs btn-warning' onclick=ShowPhlebotomyTestOnPopup('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId+"')><i class='fa fa-eye'></i></button></td>";				
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-info'onclick=viewDocument('"+r.phlebotomytableList[i].treatmentId+"','"+r.phlebotomytableList[i].outsourcemasterId+"')><i class='fa fa-cloud-upload'></i></button></td>";				
				
				htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-primary' onclick=routineValueOutsourceResult('"+r.phlebotomytableList[i].id+"','"+r.phlebotomytableList[i].labrequestId+"','"+r.phlebotomytableList[i].treatmentId +"','"+r.phlebotomytableList[i].outsourcemasterId+"')><i class='fa fa-edit'></i></button></td>";
				
				/*htmBody = htmBody+ " <td class='col-md-1 center'>"
					+ '<input type="checkbox" value=""  name="outsourceRecordCheckbox" id="outsourceRecordCheckbox'+ i + '"/></td>';
*/						+'</tr>';				
			}
		}
		$("#diagnosticOutSourceBody").html(htmBody);
	}
}

/********************************************************************************
 * @author Akshay Mache
 * @since  13 Feb 2020
 * @comment Pagination for Lab Test Current Tab
*******************************************************************************/
function currentRecordPagination(pageNumber, numberOfPages, callFrom, patientType){
	var inputs = [];
	//var callFrom="C";
	//var patientType =document.querySelector('input[name="patientType"]:checked').value;
	var startIndex = (pageNumber-1)+"0";
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
    inputs.push('startIndex='+startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/getLabTestResultPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setTempLabTestResultPatientDashboard(r, callFrom);
	        $('#totalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

function nextCurrentRecordPagination(currentIndex, numberOfPages, callFrom, patientType){
	var displayPagination=currentIndex+5;
	var numberOfRows='';
	numberOfRows +="<li class='previous' onclick='previousCurrentRecordPagination("+currentIndex+", "+Math.round(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	if(numberOfPages < displayPagination){
		displayPagination=numberOfPages+1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +="<li onclick='currentRecordPagination("+j+", "+Math.round(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+j+"</a></li>";
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +="<li class='next' onclick='nextCurrentRecordPagination("+j+", "+Math.round(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	}
	$('#patientRecordPagination').html(numberOfRows);
	pagination(currentIndex, numberOfPages, callFrom, patientType);
}

function previousCurrentRecordPagination(currentIndex, numberOfPages, callFrom, patientType){
	var displayPagination=currentIndex-5;
	var numberOfRows='';
	if(currentIndex > 6){
		numberOfRows +="<li class='previous' onclick='previousCurrentRecordPagination("+displayPagination+", "+Math.round(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +="<li onclick='currentRecordPagination("+j+", "+Math.round(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a>"+j+"</a></li>";
	}
	numberOfRows +="<li class='next' onclick='nextCurrentRecordPagination("+j+", "+Math.round(numberOfPages)+", \""+callFrom+"\", \""+patientType+"\")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	$('#patientRecordPagination').html(numberOfRows);
	pagination(displayPagination, numberOfPages, callFrom, patientType);
}

/********************************************************************************
 * @author Akshay Mache
 * @since  13 Feb 2020
 * @comment Auto-Suggestion for Lab Test Current Tab
*******************************************************************************/
function labPatientAutoSuggestion(patientId, type) {
	var tabId =  jQuery('#tabId').find('li.active').attr('id');
	
	if(tabId != "C")
		return false;
	
	var resultData = [];
	var callFrom = tabId;
	var searchBy = "";
	var fromDate = "";
	var toDate = "";
	
	var patientName = $("input#" + patientId).val();
	var patientType =document.querySelector('input[name="currentPatientType"]:checked').value;
	var patientTypeId = $('#patSearchType').val();
	
	if(patientTypeId == 0){
		alert("First select patient type.");
		$('#searchName').val("");
		return false;
	}else if(patientTypeId == 3){
		alert("Barcode is not available for current records.");
		$('#searchName').val("");
		return false;
	}

	var searchBy = "";
	if(patientTypeId == 1){
		searchBy = "byName";
	}else if(patientTypeId == 2){
		searchBy = "byId";
	}else if(patientTypeId == 4){
		searchBy = "byMobile";
	}
	
	$("#searchBy").val(searchBy);
	
	if (patientName == "" || patientName == null || patientName == "null" || patientName == undefined) {
		alert("Please enter search value");
		$("input#" + patientId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patientName));
	inputs.push('callFrom=' + type);
	inputs.push('patientType=' + patientType);
	inputs.push('callFromTab=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/searchlabtestresult",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.listLabResultMstViewDto.length; j++) {
				var arrValue = "";
				var idValue = "";
				var patientName = "";
				
				if(searchBy == "byMobile"){
					arrValue = response.listLabResultMstViewDto[j].mobile +"-"+response.listLabResultMstViewDto[j].patientName;
					idValue = response.listLabResultMstViewDto[j].mobile;
					patientName = response.listLabResultMstViewDto[j].patientName;
				}else{
					arrValue = response.listLabResultMstViewDto[j].patientId +"-"+response.listLabResultMstViewDto[j].patientName;
					idValue = response.listLabResultMstViewDto[j].patientId;
					patientName = response.listLabResultMstViewDto[j].patientName;
				}
				
				resultData.push({
					ID : idValue,
					Name : patientName
				});
				template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
				setTimeout(function() {
					$("div#documentByName .typeahead").html(template);
					$("div#documentByName .typeahead").show();

					$("input#" + patientId).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + patientId).data('typeahead').source = resultData;
				}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patientId = res[0];
		var patientName = res[1];
		var searchingBy = $("#searchBy").val();
		getPatientById(patientId, callFrom, searchingBy);
		$("input#" + patientId).val(patientName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 13-FEB-2020
* @codeFor	: Get patient By ID
 ************/
function getPatientById(id, callFrom, searchBy) {
	var inputs = [];
	inputs.push('callFromTab=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/getlabtestresultbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setTempLabTestResultPatientDashboard(response, callFrom);
			$("#searchName").focus();
			$('#searchName').val("");
		}
	});
}

/********************************************************************************
 * @author Akshay Mache
 * @since  13 Feb 2020
 * @comment Auto-Suggestion for Lab Test Current Tab
*******************************************************************************/
function labProcessAreaPatientAutoSuggestion(patientId, type) {
	var tabId =  jQuery('#tabId').find('li.active').attr('id');
	
	if(tabId == "C")
		return false;
		
	var resultData = [];
	var callFrom = tabId;
	var searchBy = "";
	var fromDate = "";
	var toDate = "";
	var patientType = "";
	
	var patientName = $("input#" + patientId).val();
	var patientTypeId = $('#patSearchType').val();
	
	if(patientTypeId == 0){
		alert("First select patient type.");
		$('#byName').val("");
		return false;
	}

	var searchBy = "";
	if(patientTypeId == 1){
		searchBy = "byName";
	}else if(patientTypeId == 2){
		searchBy = "byId";
	}else if(patientTypeId == 3){
		searchBy = "byBarcode";
	}else if(patientTypeId == 4){
		searchBy = "byMobile";
	}

	$("#searchBy").val(searchBy);
	
	if(tabId == "P"){
		patientType = document.querySelector('input[name="processPatientType"]:checked').value;
	}else if(tabId == "A"){
		patientType = document.querySelector('input[name="patientType"]:checked').value;
	}

	if (patientName == "" || patientName == null || patientName == "null" || patientName == undefined) {
		alert("Please enter search value");
		$("input#" + patientId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patientName));
	inputs.push('callFrom=' + type);
	inputs.push('patientType=' + patientType);
	inputs.push('callFromTab=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/searchprocessarearesult",
		cache : false,
		success : function(response) {
			var template = "";
			if(response.phlebotomytableList == null){
				template = template + '<li data-value="" class="" value=-1>No Records</li>';
			}else{
				for ( var j = 0; j < response.phlebotomytableList.length; j++) {
					var arrValue = "";
					var idValue = "";
					var patientName = "";
					
					if(searchBy == "byMobile"){
						arrValue = response.phlebotomytableList[j].mobile +"-"+response.phlebotomytableList[j].patientname;
						idValue = response.phlebotomytableList[j].mobile;
						patientName = response.phlebotomytableList[j].patientname;
					}else if(searchBy == "byBarcode"){
						arrValue = response.phlebotomytableList[j].id +"-"+response.phlebotomytableList[j].patientname;
						idValue = response.phlebotomytableList[j].id;
						patientName = response.phlebotomytableList[j].patientname;
					}else{
						arrValue = response.phlebotomytableList[j].patientId +"-"+response.phlebotomytableList[j].patientname;
						idValue = response.phlebotomytableList[j].patientId;
						patientName = response.phlebotomytableList[j].patientname;
					}
					
					resultData.push({
						ID : idValue,
						Name : patientName
					});
					template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue + '</a></li>';
				}
			}
				setTimeout(function() {
					$("div#documentByName .typeahead").html(template);
					$("div#documentByName .typeahead").show();

					$("input#" + patientId).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + patientId).data('typeahead').source = resultData;
				}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patientId = res[0];
		var patientName = res[1];
		var searchingBy = $("#searchBy").val();
		getProcessAreaPatientById(patientId, callFrom, searchingBy);
		$("input#" + patientId).val(patientName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 13-FEB-2020
* @codeFor	: Get patient By ID
 ************/
function getProcessAreaPatientById(id, callFrom, searchBy) {
	var inputs = [];
	inputs.push('callFromTab=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/getprocessarearesultbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setTempLabTestResultPatientDashboard(response, callFrom);
			$("#searchName").focus();
			$('#searchName').val("");
		}
	});
}

/********************************************************************************
 * @author Akshay Mache
 * @since  13 Feb 2020
 * @comment Search Lab Test Current Tab records
*******************************************************************************/
function searchLabTestPatient(type) {
	var tabId =  jQuery('#tabId').find('li.active').attr('id');
	if(tabId != "C")
		return false;
	var callFrom = tabId;
	var searchBy = "";
	var patientType =document.querySelector('input[name="currentPatientType"]:checked').value;
	var strValue = $.trim($("#searchId").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	
	if (strValue == "" && txtFdate == "" && txtTdate == "") {
		alert("Please insert something to search");
		return false;
	}
	if ((txtFdate != "" && txtTdate != "" && strValue != "")) {
		alert("Please insert only id or date for search");
		return false;
	}
	if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
		$("#searchId").val(" ");
		$("#txtTdate").val(" ");
		$("#txtFdate").val(" ");
		alert("Please insert both date for search");
		return false;
	}
	if(strValue != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(strValue)) {
			alert("Please only Digit");
			$("#searchId").focus();
			return false;
		}else{
			searchBy = "id";
		}
	}
	if(txtFdate != "" && txtTdate != "") {
			searchBy = "date";
	}
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(strValue));
	inputs.push('callFrom=' + type);
	inputs.push('patientType=' + patientType);
	inputs.push('callFromTab=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/searchlabtestresult",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(searchBy == "id")
				$("#searchId").val("");
			if(searchBy == "date") {
				$("#txtFdate").val("");
				$("#txtTdate").val("");
			}
			setTempLabTestResultPatientDashboard(r, callFrom);
		}
	});
}

/********************************************************************************
 * @author Akshay Mache
 * @since  13 Feb 2020
 * @comment Search Lab Test Current Tab records
*******************************************************************************/
function searchLabTestProcessAreaPatient(type) {
	var tabId =  jQuery('#tabId').find('li.active').attr('id');
	
	if(tabId == "C")
		return false;

	var callFrom = tabId;
	var searchBy = "";
	var patientType = "";
	var strValue = $.trim($("#searchId").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	
	if(tabId == "P"){
		patientType = document.querySelector('input[name="processPatientType"]:checked').value;
	}else if(tabId == "A"){
		patientType = document.querySelector('input[name="patientType"]:checked').value;
	}
	
	if (strValue == "" && txtFdate == "" && txtTdate == "") {
		alert("Please insert something to search");
		return false;
	}
	if ((txtFdate != "" && txtTdate != "" && strValue != "")) {
		alert("Please insert only id or date for search");
		return false;
	}
	if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
		$("#searchId").val(" ");
		$("#txtTdate").val(" ");
		$("#txtFdate").val(" ");
		alert("Please insert both date for search");
		return false;
	}
	if(strValue != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(strValue)) {
			alert("Please only Digit");
			$("#searchId").focus();
			return false;
		}else{
			searchBy = "id";
		}
	}
	if(txtFdate != "" && txtTdate != "") {
			searchBy = "date";
	}
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(strValue));
	inputs.push('callFrom=' + type);
	inputs.push('patientType=' + patientType);
	inputs.push('callFromTab=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/searchprocessarearesult",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(searchBy == "id")
				$("#searchId").val("");
			if(searchBy == "date") {
				$("#txtFdate").val("");
				$("#txtTdate").val("");
			}
			setTempLabTestResultPatientDashboard(r, callFrom);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 11-04-2019
 * @Code This function is use to view outsoutsource test result
 *********************************************************/
function viewOutSourceTestforResult() {
	var allVals = [];
	$(':checkbox').each(function() {
		if (this.checked == true) {
			allVals.push($(this).val());
		}
	});
	if (allVals.length == 0) {
		alertify.error("Please Select at least one Patient for OutSource");
		return false;
	}
	var r = confirm("Are You Sure You Want To Send To OutSource Test?");
	if (r == true) {
	$("#outSourcelabpopup").modal('show');
	}
}

/*********************************************************
 * @author Ajay khandare
 * @date 11-04-2019
 * @Code This function is use to check patient id 
 *********************************************************/
/*function checkPatientId(id, pid, trtId, testid, labrequestid, rate) {
	var patientId = $("#patientId").val();
	if (pid != patientId && patientId != 0) {
		alertify.error("Please Select Same Patient");
		$("#" + id + "").prop("checked", false);
		$("#patientId").val(patientId);
		return false;
	} else {
		$("#patientId").val(pid);
		$('#treatmentId').val(trtId);
		$('#testid').val(testid);
		$('#labrequestid').val(labrequestid);
		$('#rate').val(rate);
		recordchechbox(id, pid, trtId, testid, labrequestid, rate);
	}

}

var patientArray = [];
var treatmentArray = [];
var testIdArray = [];
var labrequestIdArray = [];
var rateArray = [];
*/
/*********************************************************
 * @author Ajay khandare
 * @date 11-04-2019
 * @Code This function is use to check selected patient id 
 *********************************************************/
/*function recordchechbox(id, pid, trtId, testid, labrequestid, rate) {
	if ($('#' + id).is(':checked')) {

		this.patientArray.push(pid);
		this.treatmentArray.push(trtId);
		this.testIdArray.push(testid);
		this.labrequestIdArray.push(labrequestid);
		this.rateArray.push(rate);
		alert(labrequestid);
		alert(testid);
		alert(rate);
	}*/
/*
	for ( var i = 0; i < patientArray.length; i++) {
		console.log(patientArray[i]);
	}

	for ( var i = 0; i < treatmentArray.length; i++) {
		console.log(treatmentArray[i]);
	}

	for ( var i = 0; i < testIdArray.length; i++) {
		console.log(testIdArray[i]);
	}

	for ( var i = 0; i < labrequestIdArray.length; i++) {
		console.log(labrequestIdArray[i]);
	}
	for ( var i = 0; i < rateArray.length; i++) {
		console.log(rateArray[i]);
	}*/

//}

/*********************************************************
 * @author Ajay khandare
 * @date 11-04-2019
 * @Code This function is use to save outsource to lab test
 *********************************************************/
/*function saveTestOutSourceToLab() {
	var outlabId = $('#outlabId').val();
	var outsourcemasterid = $("#outsourcemasterid").val();
	var treatmentId = $('#treatmentId').val();
	var patientId = $('#patientId').val();
	var dispatchDate = $('#dispatchDate').val();
	var dispatchTime = $('#dispatchTime').val();
	var carrierId = $('#carrierId').val();
	var CommentId = $('#CommentId').val();

	if (treatmentId == 0 || treatmentId == "undefined" || treatmentId == null) {
		alert("Please Select Patient");
		$("#treatmentId").focus();
		return false;
	}
	
	
	var testid = {
		listOutSource : []//do not change please check back-end flow then change value

	};
	testid.listOutSource.push({

		testIdArray : testIdArray,
	});

	var labrequestid = {
		listlabrequestId : [],//do not change please check back-end flow then change value

	};

	labrequestid.listlabrequestId.push({

		labrequestIdArray : labrequestIdArray,
	});

	var labRate = {
		listlabRate : [],//do not change please check back-end flow then change value

	};

	labRate.listlabRate.push({

		rateArray : rateArray,
	});

	testid = JSON.stringify(testid);//do not change please check back-end flow then change value
	labrequestid = JSON.stringify(labrequestid);//do not change please check back-end flow then change value
	labrate = JSON.stringify(labRate);//do not change please check back-end flow then change value
/*	alert("TestiD" + testid);
	alert("LabrequestID" + labrequestid);
	alert("LabRate" + labrate);*/

/*	if (outSourcelabName == "" || outSourcelabName == "undefined"
		|| outSourcelabName == null) {
	alert("Please Enter lab Name");
	$("#outSourcelabName").focus();
	return false;
}
	*/
	
	
/*	var inputs = [];

	inputs.push('outlabId=' + outlabId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('outsourcemasterid=' + outsourcemasterid);
	inputs.push('dispatchDate=' + dispatchDate);
	inputs.push('dispatchTime=' + dispatchTime);
	inputs.push('carrierId=' + carrierId);
	inputs.push('CommentId=' + CommentId);
	inputs.push('labrequestid=' + labrequestid);
	inputs.push('testid=' + testid);
	inputs.push('labrate=' + labrate);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/OutSourceMasterController/saveOutSourceTest",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert("Record saved successfully..!");
		     printOutSource11();
			$('#dispatchDate').val('');
			$('#dispatchTime').val('');
			$('#carrierId').val('');
			$('#CommentId').val('');
		  //   window.location.replace("labTestPatientDashboard.jsp");

		}
	});
}*/
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019  fetch list outsource--------------------------------------------------------------*/

/*function getAllLaboutSourcelist() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/OutSourceMasterController/fetchLabOutsourceList",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r.listlaboutSource.length > 0) {

				$("#patientcontainerOutSource").setTemplate(
						patientcontainerOutSource);
				$("#patientcontainerOutSource").processTemplate(r);

			}
		}
	});
}*/
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019  set template outsource --------------------------------------------------------------*/

/*var count3 = 1;
var patientcontainerOutSource = "<table class='table table-bordered table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dispatch Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dispatch Time </div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>OutSource Lab Name </div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"

		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont' ><button onclick='printOutSource11()' data-placement='left' data-toggle='tooltip' class='btn btn-xs btn-warning' data-original-title='Print'><i class='fa fa-print'></i></button></div></th>"
		+ "<th style='height: 21.5px;' class='numeric col-md-3-1 center'><div class='TextFont'><button data-original-title='Print' class='btn btn-xs btn-warning' data-toggle='tooltip' data-placement='left' onclick='printOutSource11()'><i class='fa fa-print'></i></button></div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.listlaboutSource as lbrsltli}"
		+ "<td class='filterable-cell' align='center'>{count3++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.disdate}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.distime1}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.labname}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.pid}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.patientName}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.age}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.gendar}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.testname}</td>"
		+ "<td class='numeric filterable-cell'><input type='checkbox' style='margin-top: 2px; margin-left: 9px; cursor: pointer;' id='checkboxTest_{count - 1}' value='{$T.lbrsltli.labreqId}' onclick='checkPatientOutSource(this.id,{$T.lbrsltli.pid},{$T.lbrsltli.trtId})'></td>"
		+ "</tr>{#/for}</tbody></table>";*/

/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019- outsource print validate same patient but multiple test accepted-------------------------------------------------------------*/

/*function checkPatientOutSource(id, pid, trtId) {
	var patientId = $("#patientId").val();
	if (pid != patientId && patientId != 0) {
		alertify.error("Please Select Same Patient");
		$("#" + id + "").prop("checked", true);
		$("#patientId").val(patientId);
		return false;
	} else {
		$("#patientId").val(pid);
		$('#treatmentId').val(trtId);

	}

}*/
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019--------------------------------------------------------------*/

/*function printOutSource11() {
	var treatmentId = $.trim($('#treatmentId').val());
	var allVals = [];
	$(':checkbox').each(function() {
		if (this.checked == true) {
			allVals.push($(this).val());
		}
	});
	if (allVals.length == 0) {
		alertify.error("Please Select at least one Patient for Print");
		return false;
	}
	setTimeout(
			function() {
				window
						.open(("outSourceTestPdf.jsp?" + "&allVals="
								+ encodeURIComponent(allVals) + "&treatmentId=" + treatmentId));
			}, 300);
	refreshPatPrevSelTest();

}*/
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/********************************************************************************
 * @author Ajay Khandare
 * @since 
 * @comment for view Phlebotomy 
*******************************************************************************/
function viewPhlebotomy(testmasterId, treatmentId) {

	//window.location.href = "labTestresult.jsp?testmasterId=" + testmasterId + "&treatmentId=" + treatmentId;
	window.location.href = "LabTestPhlebotomy.jsp?testmasterId=" + testmasterId+ "&treatmentId=" + treatmentId;
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for hide Show Sample Container dropdown
*******************************************************************************/
function hideShowSampleContainer(value){
	if(value=='diagnosis'){
		$('#sampleContainerId').show('show');
	}else{
		$('#sampleContainerId').hide('hide');
	}
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Fetch sample container.
 *********************************************************/
function getListsampleContainer() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/diagnostics/getListsampleContainer",
		success : function(r) {
			setTemplatesamplecontainer(r);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set Collection Center.
 *********************************************************/
function setTemplateCollectionCenter(r){		
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.lstCollectionCenterMaster.length; int++) {
		list=list+'<option value="'+(r.lstCollectionCenterMaster[int].id)+'">'+(r.lstCollectionCenterMaster[int].centerName)+'</option>';		
	}	
	$("#containerId").html(list);	
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date
 * @Code search all Diagnostic Patient records.
 ******************************************************************************/
function getAllDignoPatRecWithAutoSugg(inputId,callfrom) {
 	var deptId=3;
	var usertype = "";
	var letter="";
	if ( callfrom == "search") {
		letter=$("#byId").val();
		usertype = "Y";
	}else{		
		letter=$("#searchName").val();
	}
 	var inputs = [];	
 	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
        jQuery.ajax({
        	async	: true,
        	type	: "POST",
        	data	: str + "&reqType=AJAX",
        	url		: "ehat/registration/getAllRecordsDeptwiseWithAuto",
        	timeout : 1000 * 60 * 15,
        	cache	: false,
        	success : function(res) {
        		var divContent="";
    			if(res.listRegTreBillDto.length>=0){
    					for ( var i = 0; i < res.listRegTreBillDto.length; i++) {
    						var fullName = res.listRegTreBillDto[i].patientName;
    						var patId= res.listRegTreBillDto[i].patientId; 		
    						var datetime= new Date(res.listRegTreBillDto[i].createdDateTime).toLocaleString();
    						divContent = divContent	+ "<tr>"
    								+ "	<td class='col-md-1 center'>"+ (i+1)+ "</td>"
    								+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"	+ fullName + "</td>"
    								+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"+ patId + "</td>"
    								+ "	<td class='col-md-1 center'>"+res.listRegTreBillDto[i].opdipdno+ "</td>"
    								+ "	<td class='col-md-1 center'>"+datetime+"</td>"
    					
    					if(callfrom=="Digno"){
    						divContent= divContent + "	<td class='col-md-1 center'><input type='button' value='Add Test' class='btn btn-xs btn-success' id='btnView"
							+ (i+1) + "' " + "onclick=viewDiagnosticsPatientAssignTests2("+ res.listRegTreBillDto[i].treatmentId+ ") />" + "	</td></tr>";
    						
    						$('#diagnosticAssignTestBody').html(divContent);
    					}else if(callfrom=="Bill"){
    						divContent= divContent + "	<td class='col-md-1 center'><input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnView"
							+ (i+1) + "' " + "onclick=viewBillForDigno("+ res.listRegTreBillDto[i].treatmentId+ ") />" + "	</td></tr>";
    						
    						$('#diagnosticBillTestBody').html(divContent);
    					}
    				}
        		$("#byId").val("");
        	}
    	}
        });
}

function getAllPatientRecordsForPrevDigno(inputId, callfrom) {
	var r1="";
	var usertype = "";
	var letter="";
	var sridname="";
	if (callfrom =="search") {

	  sridname = $("#sridnamepr").val();
  	  letter   = $("#byId").val();
  	  usertype=sridname;
	}else{ 
	    	  
	    	 sridname = $("#sridnamepr").val();
	 		 letter=    $("#searchId").val();
	 		 usertype=sridname;
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + 3);
        var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",
		 
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			if(r.lstRegviewDto.length > 0){
				for ( var i = 0; i < r.lstRegviewDto.length; i++) {
					divContent = divContent
							+ "<tr id='div123'>"
							+ "<td class='col-md-1 center'>"+ (i + 1)+ "</td>"
							+ "<td class='col-md-1 '>"+ r.lstRegviewDto[i].patientName + "</td>"
							+ "<td class='col-md-1 center'>"+ r.lstRegviewDto[i].mobile	+ "</td>"
							+ "<td class='col-md-1 center'>"+ r.lstRegviewDto[i].ptId	+ "</td>"
							+ "<td class='col-md-1 center'>"+ new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString()	+ "</td>"
							+ "<td class='col-md-1 center' style='width:3%;'><button class='btn btn-xs btn-success' type='button' onclick=viewPreviousTreatments("+r.lstRegviewDto[i].ptId+","+i+")>View</button><input type='hidden' id='pnamee"+i+"' value='"+r.lstRegviewDto[i].patientName+"'></td>";
							+ "</tr>";
				}
			}else{
				divContent = divContent
				+ "<tr style='color:red; font-size:15px;'><td class='center' colspan='12'>Record Not Found...!!!</td></tr>";	
			}
			
			$("#diagnosticPreviousTreatmentBody").html(divContent);
		}
	});
}



/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get previous patient treatment List
******************************************************************************************************/
function viewPreviousTreatments(id,i){
	var patientName= $("#pnamee"+i).val();
	var deptId=3;
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			patientId : id,
			deptId : deptId
		},
		url : "ehat/billNoble/getPrevPatdetails",
		success : function(r) {
			if(r.listTreatment.length>=0){
				var divContent = "<div class='container'><table class='table table-hover table-bordered table-responsive table-condensed''style='overflow: auto; border: 2;'>"
									+"<thead><tr><th class='col-md-1 center'>#</th><th class='col-md-1 center'>Treatment ID</th><th class='col-md-1 center'>Diagnostic No</th>"
									+"<th class='col-md-2 center'>Patient Name</th><th class='col-md-1 center'>Action</th></tr></thead>";
														
				for ( var i = 0; i < r.listTreatment.length; i++) {
					divContent = divContent+ '<tr>'
							+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listTreatment[i].treatmentId +"</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+r.listTreatment[i].opdipdno +"</td>";			
					divContent = divContent
							+ "<td class='col-md-2 center'>"+patientName+"</td>";		
					divContent = divContent
							+ "<td class='col-md-1 center' style='width:3%;'><button class='btn btn-xs btn-success' type='button' onclick=sendingToPreviousDignoBill("+r.listTreatment[i].treatmentId+")>View</button></td>";
							+"</tr>	";
				}
				divContent = divContent+"</table></div>";
				$('#previousTreatmentTable').html(divContent);
			}

		}
	});
	 $("#previousTreatmentModal").modal();
}

function sendingToPreviousDignoBill(r) {
	 var treatclose="treatclose";
	window.location = "ehat_billing.jsp?" + "treatmentId=" + r
			+ "&treatclose=" + treatclose;
}

function dignoPatRecAutoSugg(patientId, callFrom) {
	var resultData = [];
	var patientName = $("input#" + patientId).val();
	var deptId=3;
	var flag = "Y";
	
	if(callFrom == "prevDiagno")
		flag = "N";
	
	if (patientName == "" || patientName == null || patientName == "null" || patientName == undefined) {
		alert("Please enter search value");
		$("input#" + patientId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patientName));
	inputs.push('deptId=' + deptId);
	inputs.push('flag=' + flag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labresult/dignopatrecautosugg",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.lstRegviewDto.length; j++) {
				var arrValue = response.lstRegviewDto[j].ptId +"-"+response.lstRegviewDto[j].patientName;
				var id = response.lstRegviewDto[j].ptId;
				var name = response.lstRegviewDto[j].patientName;
				resultData.push({
					ID : id,
					Name : name
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + patientId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + patientId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		getDiagnosticPatientById(patId, callFrom);
		$("input#" + patientId).val(patName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: get lab Profile by id.
 ************/
function getDiagnosticPatientById(id, callFrom) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labresult/getdiagnosticpatientbyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setDiagnosticPatientTemp(response, callFrom);
			$('#searchName').val("");
		}
	});
}

function setDiagnosticPatientTemp(response, callFrom){
	var divContent="";
	if(callFrom == "prevDiagno"){
		if(response.lstRegviewDto.length > 0){
			for ( var i = 0; i < response.lstRegviewDto.length; i++) {
				divContent = divContent
					+ "<tr id='div123'>"
					+ "<td class='col-md-1 center'>"+ (i + 1)+ "</td>"
					+ "<td class='col-md-1 '>"+ response.lstRegviewDto[i].patientName + "</td>"
					+ "<td class='col-md-1 center'>"+ response.lstRegviewDto[i].mobile	+ "</td>"
					+ "<td class='col-md-1 center'>"+ response.lstRegviewDto[i].ptId	+ "</td>"
					+ "<td class='col-md-1 center'>"+ new Date(response.lstRegviewDto[i].createdDateTime).toLocaleString()	+ "</td>"
					+ "<td class='col-md-1 center' style='width:3%;'><button class='btn btn-xs btn-success' type='button' onclick='viewPreviousTreatments("+response.lstRegviewDto[i].ptId +","+i+")'>View</button><input type='hidden' id='pnamee"+i+"' value='"+response.lstRegviewDto[i].patientName+"'></td>";
					+ "</tr>";
			}
		}else{
			divContent = divContent
			+ "<tr style='color:red; font-size:15px;'><td class='center' colspan='12'>Record Not Found...!!!</td></tr>";	
		}
		$("#diagnosticPreviousTreatmentBody").html(divContent);
	}else{
		if(response.lstRegviewDto.length >= 0){
			for ( var i = 0; i < response.lstRegviewDto.length; i++) {
				var fullName = response.lstRegviewDto[i].patientName;
				var patId= response.lstRegviewDto[i].ptId; 		
				var datetime= new Date(response.lstRegviewDto[i].createdDateTime).toLocaleString();
				divContent = divContent	+ "<tr>"
						+ "	<td class='col-md-1 center'>"+ (i+1)+ "</td>"
						+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"	+ fullName + "</td>"
						+ "	<td class='col-md-1 center' id='divPi"+ (i+1)+ "'>"+ patId + "</td>"
						+ "	<td class='col-md-1 center'>"+response.lstRegviewDto[i].opdipdno+ "</td>"
						+ "	<td class='col-md-1 center'>"+datetime+"</td>";
			
				if(callFrom=="Digno"){
					divContent= divContent + "	<td class='col-md-1 center'><input type='button' value='Add Test' class='btn btn-xs btn-success' id='btnView"
					+ (i+1) + "' " + "onclick=viewDiagnosticsPatientAssignTests2("+response.lstRegviewDto[i].ttId+ ") />" + "</td></tr>";
				
					$('#diagnosticAssignTestBody').html(divContent);
				}else if(callFrom=="Bill"){
					divContent= divContent + "	<td class='col-md-1 center'><input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnView"
					+ (i+1) + "' " + "onclick=viewBillForDigno("+response.lstRegviewDto[i].ttId+ ") />" + "</td></tr>";
				
					$('#diagnosticBillTestBody').html(divContent);
				}
			}
		}
	}
}

function validateNumber(evt){
	 evt = (evt) ? evt : window.event;
	   var charCode = (evt.which) ? evt.which : evt.keyCode;
	   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		   alert("Enter only numbers");
	      return false;
	    }
	    return true;
}
