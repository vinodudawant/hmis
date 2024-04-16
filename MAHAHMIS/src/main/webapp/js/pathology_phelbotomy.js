/*********************************************************
 * @author Ajay s khandare
 * @since 06-03-2020
 * @comment for get PhlebotomyRecord Test 
***********************************************************/
function getPhlebotomyRecord(){
	var inputs = [];
	var emergencyFlag = $("#emergencyFlag").val();
	var callFrom="C";
	var patientType="Y";
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	inputs.push('emergencyFlag=' + emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getphlebotomyRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {

			setPatientTemp(r, "phelbotomyAutoSugg", "");
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"phlebotomy\")'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"phlebotomy\")'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \"phlebotomy\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#phlebotomyNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#phlebotomyNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='phlebotomyPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"phlebotomy\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#phlebotomyPagination').html(numberOfRows);
		}
	});
}

/*********************************************************
 * @author Ajay s khandare
 * @since 06-03-2020
 * @comment for get Phlebotomy Record click on arrow button 
***********************************************************/
function hideShowSampleType(pId,tId) {
	var hideShowStatus = $("#hideShowStatus" + tId).val();
	if (hideShowStatus == 0) {
		$("#imgupdown" + tId).attr('src', "images/up.png");
		$("#patPreOPDBill123" + tId).show();
		$("#hideShowStatus" + tId).val(1);
		getPhlebotomyRecordWithSamplyWise(pId,tId);
	} else {		 
		$("#imgupdown" + tId).attr('src', "images/down.png");
		$("#patPreOPDBill123" + tId).hide();
		$("#hideShowStatus" + tId).val(0);
	}
}
/*********************************************************
 * @author Ajay s khandare
 * @since 06-03-2020
 * @comment for get Phlebotomy Record With Sample 
***********************************************************/
function getPhlebotomyRecordWithSamplyWise(pId,tId)
{
		jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/getPhlebotomyRecordWithSamplyWise",
		data : {
			pId : pId,
			tId : tId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
				for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					divContent = divContent+ '<tr style="height:2px;">'							
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"	
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"			
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename+"</td>"		
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].unitname +"</td>"	
						+ "<td class='col-md-2 center'>"+((r.labSampleWiseMasterDtoList[i].inOutHouse==0) ? "IN LAB" : (r.labSampleWiseMasterDtoList[i].inOutHouse==2) ? "OUT LAB" : "OUT LAB") +"</td>"
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>";	
						
					if(r.labSampleWiseMasterDtoList[i].timeSensitiveValue == 0 || r.labSampleWiseMasterDtoList[i].timeSensitiveValue == null 
							|| r.labSampleWiseMasterDtoList[i].timeSensitiveValue == "null"){
						divContent = divContent+ "<td class='col-md-2 center'>Not Time-Sensitive</td>";
					}else{
						divContent = divContent+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].timeSensitiveValue+"</td>";	  
					}
					if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="H"){
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-warning' id='testType"+(i+1)+"' value='UNHOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\')  ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
						divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td></tr>";
					}else if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="U"){  
						if(r.labSampleWiseMasterDtoList[i].teststatus !="1"){
							divContent = divContent+ "<td class='col-md-1 center'>" 
							 	+ "<input type='button' class='btn btn-xs btn-success' id='testType"+(i+1)+"' value='Accepted'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
							divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td></tr>";
					    }else{
							divContent = divContent+ "<td class='col-md-1 center'>" 
							 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType"+(i+1)+"' value='HOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
							divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' ></td></tr>";
						}
					}
				}
				 $("#td123"+tId).show();
				 $("#phlebotomytabIdDD"+tId).html(divContent);
			}
		}
	}); 
}

/***********************************************************
 * @author Ajay khandare
 * @since  2-03-2020
 * @comment for collection patient
************************************************************/
function collectionPatient() {
	  var meesha="off";
	   var  meeshaFlow=$("#meeshaFlow").val();
	   var  hospitalname=$("#hospitalname").val();
	   if(meeshaFlow == "on"){
		   meesha="on";
	   }
	   
	   var sampleCollectedAt="";
	   if(hospitalname == "Siddhivinayak"){
		   sampleCollectedAt=$("#sampleCollectedAt").val();
	   }
	   
	   var collectionTime=$("#collectionTime").val();
	
	idList = [];
	var callform="Phlebo";
	var currentId;
	$("#phlebotomytabId").find('input[name="testid"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if (currentId != 0) {
				idList.push(currentId);
			} 
		}
	});
	idList = idList.join('-');
	if(idList.length > 0){	
    	var r = confirm("Are You Sure You Want To Collect this Sample/Tests ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(idList));
    		inputs.push('callform=' + encodeURIComponent(callform));  
    		inputs.push('meesha=' + encodeURIComponent(meesha));  	
    		inputs.push('collectionTime=' + encodeURIComponent(collectionTime)); 
    		inputs.push('sampleCollectedAt=' + encodeURIComponent(sampleCollectedAt)); 
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : false,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/phlebotomy/collectionRecord",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alertify.success(r);   				
    				//getPhlebotomyRecord();
    				searchLabTestPatient("phelbotomySearchBtn");
    				//getCountOfRecords();
    			}
    		});
    	}
	}	
}

/***********************************************************
 * @author Ajay khandare
 * @since  2-03-2020
 * @comment for collection patient
************************************************************/
function patientTestHold(idd, id) {
	testtype = $('#' + idd).val();
	var phlebotype = "";
	var r = "";

	if (testtype == "HOLD") {
		phlebotype = "H";
		r = confirm("Are You Sure You Want To Hold this Sample/Tests ?");

	} else {
		phlebotype = "U";
		r = confirm("Are You Sure You Want To UnHold this Sample/Tests ?");

	}
	if (r == true) {
		var inputs = [];
		inputs.push('id=' + encodeURIComponent(id));
		inputs.push('phlebotype=' + encodeURIComponent(phlebotype));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/patientTestHold",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				if (testtype == "HOLD") {
					alertify.error(r);
				}else{
					alertify.success("UnHold Successfully");					
				}
				searchLabTestPatient("phelbotomySearchBtn");
				//getPhlebotomyRecord();
			}
		});
	}

}


/*******************************************************************************
 * @author Ajay s khandare
 * @since 06-03-2020
 * @comment for get PhlebotomyRecord Test
 ******************************************************************************/
function getAccessionRecord(id){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {

			setPatientTemp(r, "accessionTestAutoSugg", "AL");
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='page-item disabled'><a data-toggle='tab'><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li class='page-item active' id="+index+" onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accession\");'><a data-toggle='tab'>"+index+"</a></li>";
				}else{
					numberOfRows +="<li class='page-item' id="+index+" onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accession\");'><a data-toggle='tab'>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='page-item' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \"accession\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#accessionNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#accessionNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accession\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#accessionPagination').html(numberOfRows);
		}
	});
}
/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for set flag Phlebotomy Pending Record Test 
*********************************************************/
function collectionPendingPatient(id){
	var callfrom="Allrecord";
	var meesha="off";
	   var  meeshaFlow=$("#meeshaFlow").val();
	   var  hospitalname=$("#hospitalname").val();
	   if(meeshaFlow == "on"){
		   meesha="on";
	   }
	   var collectionTime=$("#collectionTime").val();
	   
	   var sampleCollectedAt="";
	   if(hospitalname == "Siddhivinayak"){
		   sampleCollectedAt=$("#sampleCollectedAt").val();
	   }
	
   	var r = confirm("Are You Sure You Want To Accept this Sample?");
    if (r == true) {
    	var inputs = [];
    	inputs.push('id=' + encodeURIComponent(id));
    	inputs.push('callform=' + encodeURIComponent(callfrom));
    	inputs.push('meesha=' + encodeURIComponent(meesha));  	
		inputs.push('collectionTime=' + encodeURIComponent(collectionTime));  	
		inputs.push('sampleCollectedAt=' + encodeURIComponent(sampleCollectedAt)); 
    	var str = inputs.join('&');
    	jQuery.ajax({
    		async : false,
    		type : "POST",
    		data : str + "&reqType=AJAX",
    		url : "ehat/phlebotomy/collectionRecord",
    		timeout : 1000 * 60 * 5,
    		catche : false,
    		error : function() {
    			alert('Network Issue!');
    		},
    		success : function(r) {
    			if(r=="Collection Successfully"){
    				alertify.success("Accession Done Successfully");   
    			}
    			searchLabTestPatient("accessionTestSearchBtn");
    			/*getAccessionRecord('all');
    			getAccessionPendingRecord('AP');
    			getCountOfTabs();*/
    		}
    	});
    }	
}

/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for open pop up rejected Test 
*********************************************************/
function rejectedtestPatient(id, sampleId)
{	
    	var r = confirm("Are You Sure You Want To Reject this Tests ?");
    	if (r == true) {   		
    		$("#rejectedTestPopUp").modal('show');
    	}
		
    	getProfileAndTestRecord(id, sampleId);
}
/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for hide popup reject test Record 
*********************************************************/
function hidepopuprejecttest()
{
	$("#rejectedTestPopUp").modal('hide');
}

/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for get Profile And Test Record Test 
*********************************************************/
function getProfileAndTestRecord(id, sampleId){
		jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/getProfileAndTestRecord",
		data : {
			Id : id,	
			outlabId : 0
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
				for ( var pk = 0; pk < r.proLi.length; pk++) {
		        
				html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
				html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
				html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";
			

				for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
					   
					if (r.proLi[pk].testli[ts].tid != 0) {
					
								
									html = html + "<tr style='height:25px'>" ;		
									html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testName)+"("+r.proLi[pk].profileName+")"+"</td>";
									html = html + "<td id='testcode' class='center'>"+(r.proLi[pk].testli[ts].testcode)+"</td>";
									
									
									if (r.proLi[pk].testli[ts].testflag=="Y") {
										
																	
										html = html + "<td class='col-md-2 center'><select style='width:100%'  type='text' id='rejectA"+(pk+1)+(ts+1)+"' disabled='disabled' ></select></td>";
									
										html = html + "<td class='col-md-2 center'><select style='width:100%'  type='text' id='cancleA"+(pk+1)+(ts+1)+"'></select></td>";

										html = html + "<td class='col-md-1 center'><input type='button' class='btn btn-xs btn-success' id='testType' value='UnReject' onclick=rejectedInprofiletest("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].testli[ts].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].testflag+"\',"+(pk+1)+(ts+1)+","+sampleId+")></td></tr>";	
								
									
									} else {
									
										html = html + "<td class='col-md-2 center'><select style='width:100%'  type='text' id='rejectA"+(pk+1)+(ts+1)+"' ></select></td>";
									
										html = html + "<td class='col-md-2 center'><select style='width:100%'  type='text' id='cancleA"+(pk+1)+(ts+1)+"' disabled='disabled'></select></td>";

										html = html  + "<td class='col-md-1 center'><input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick=rejectedInprofiletest("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].testli[ts].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].testflag+"\',"+(pk+1)+(ts+1)+","+sampleId+")></td></tr>";	
									}
									
													
													       					
					}
					
				}	
				
			}
				
				$("#rejectedTestTableBody").html(html);			
				getTestReasonnameReject(r, sampleId);
				getTestReasonnameUnReject(r, sampleId);				
			}						
		}
	});
}
/*******************************************************************************
 * @author Ajay s khandare
 * @since 06-03-2020
 * @comment for get Phlebotomy Pending Record Test
 ******************************************************************************/
function getAccessionPendingRecord(id){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {

			setPatientTemp(r, "accessionTestAutoSugg", "accessionPending");

			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionPending\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionPending\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+",\"accessionPending\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#accessionPendingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#accessionPendingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#accessionPendingJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionPendingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accessionPending\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#accessionPendingPagination').html(numberOfRows);
	}
	});
}
/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for get Phlebotomy Collection Record Test 
*********************************************************/
function getAccessionCollectionPendingRecord(id){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setPatientTemp(r, "accessionTestAutoSugg", "collectionPending");
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+","+Math.ceil(numberOfPages)+", \"collectionPending\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+","+Math.ceil(numberOfPages)+", \"collectionPending\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"collectionPending\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#collectionPendingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#collectionPendingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#collectionPendingJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectionPendingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"collectionPending\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#collectionPendingPagination').html(numberOfRows);
	}
	});
}

/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for get Phlebotomy Done Record Test 
*********************************************************/
function getAccessionDoneRecord(id){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
		
			setPatientTemp(r, "accessionTestAutoSugg", "accessionDone");
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionDone\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionDone\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionDone\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#accessionDoneNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#accessionDoneNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#accessionDoneJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionDonePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accessionDone\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#accessionDonePagination').html(numberOfRows);
	}
	});
}
/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for get Phlebotomy Rejected Record Test 
*********************************************************/
function getAccessionRejectedRecord(id){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
		
			setPatientTemp(r, "accessionTestAutoSugg", "rejectedSample");
			
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"rejectedSample\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"rejectedSample\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \"rejectedSample\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#rejectedSampleNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#rejectedSampleNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#rejectedSampleJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='rejectedSamplePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"rejectedSample\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#rejectedSamplePagination').html(numberOfRows);
	}
	});
}
/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for get rejected In profile Test 
*********************************************************/
function rejectedInprofiletest(masterid,profileid,testid,testflag,id, sampleTypeId){
	callfrom = "";
	var rejectedResion = "";
	
	if (testflag == "N") {
		rejectedResion = $("#rejectA" + id).val();
	} else {
		rejectedResion = $("#cancleA" + id).val();
	}
	if (rejectedResion == "" || rejectedResion == null || rejectedResion == "null" || rejectedResion == undefined || rejectedResion == 0|| rejectedResion == "0") {
		alert("Please Select Reason");
		$("input#" + rejectedResion).focus();
		return false;
	}
	
	var rejectedTestTableBody = $('#rejectedTestTableBody tr').length;
	if (rejectedTestTableBody == 1) {
		alert("Can Not Reject Single Test! Please Reject Sample");
		return false;
	}
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/rejectedInprofiletest",
		data : {
			masterid : masterid,
			profileid : profileid,
			testid : testid,
			testflag : testflag,
			rejectedResion : rejectedResion,
			callfrom : callfrom,
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if (testflag == "Y") {
				alertify.success("UnReject Test Successfully");
			} else {
				alertify.success("Reject Test Successfully");
			}

			//getAccessionRecord('all');
			searchLabTestPatient("accessionTestSearchBtn");
			getProfileAndTestRecord(masterid, sampleTypeId);
		}
	});
}

/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for  reject and Bulk Accession sample in All Record Tab 
*********************************************************/
function AccessionpatientTestRejectAndAccepted(id,tabflag) {

	var callfrom = $("#" + id).val();
	idList = [];
	var currentId;
	var remarks = "";
	if(tabflag=="allrecord"){
		if (callfrom == "BulkAccept") {
		
		}else if(callfrom == "Reject") {
			remarks = $("#testReasonIDList").val();
			if (remarks == "" || remarks == null	|| remarks == undefined || remarks == "0") {
				alert("please select Test Reason");
				return false;
			}	
		}
		
		$("#accessionRecordTableBody").find('input[name="testid"]').each(function() {
			if ($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if (currentId != 0) {
					idList.push(currentId);
				}
			}
		});
		
		idList = idList.join("-");
		
		if (idList.length == 0) {
			alert("Please Select at least One Sample/Test!");
			return false;
		}
	}else if(tabflag="accessionPending"){
		if (callfrom == "BulkAccept") {
			
		} else if (callfrom == "Reject") {
			remarks  = $("#testReasonId").val();
			if (remarks == "" || remarks == null	|| remarks == undefined || remarks == "0") {
				alert("Please select Test Reason");
				return false;
			}
		}
		
		$("#accessionPendingTabId").find('input[name="testidAP"]').each(function() {
			if ($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if (currentId != 0) {
					idList.push(currentId);
				}
			}
		});
		
		if (idList.length == 0) {
			alert("Please Select at least One Sample/Test!");
			return false;
		}
		
		idList = idList.join("-");
	}
	if (idList.length > 0) {
		var r = "";
		if (callfrom == "BulkAccept") {
			r = confirm("Are You Sure You Want To Bulk Accept this Samples/Test ?");
		} else if (callfrom == "Reject") {
			r = confirm("Are You Sure You Want To Reject this Sample/Test ?");
		}

		if (r == true) {
			var inputs = [];
			inputs.push('id=' + encodeURIComponent(idList));
			inputs.push('remarks=' + encodeURIComponent(remarks));
			inputs.push('callfrom=' + encodeURIComponent(callfrom));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/phlebotomy/AccessionpatientTestRejectAndAcccepted",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					if (callfrom == "BulkAccept") {
						alertify.success("Bulk Accession Successfully");
					} else if (callfrom == "Reject") {
						alertify.error("Reject Sample Successfully");
					}
					searchLabTestPatient("accessionTestSearchBtn");
/*					getAccessionRecord('all');
					getAccessionPendingRecord('AP');
					getCountOfTabs();*/
					
					$('#rejectedpopupAllTab').modal("hide");
					$('#rejectedpopupAccessionPendingTab').modal("hide");
				}
			});
		}
	}
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 2-03-2020
 * @comment for get Accession Track Record patient
 ******************************************************************************/
function getAccessionTrackRecord(id)
{
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
		
			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				
					var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
					var statusss="";
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
				
			 divContent = divContent+ '<tr style="height:2px;" >'							
					
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>"
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>"	
						
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"	
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"

							+ "<td class='col-md-2 center'>"+datetime+"</td>"	
							
						    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	

						    + "<td class='col-md-2 center'>"+statusss+"</td>"
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>";
					        
	     divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='View'  ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";				        
			}
				$('#trackRecordTableBody').html(divContent);
			
		}
			
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
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionTrackStatus\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionTrackStatus\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 6){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionTrackStatus\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			$('#accessionTrackStatusNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#accessionTrackStatusPagination').html(numberOfRows);
		}
	});
}

/***********************************************************
 * @author Ajay khandare
 * @since  2-03-2020
 * @comment for get Processing Record patient
************************************************************/
function getProcessingRecord(id)
{
	//alert("ro::");
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAccessionRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
			exportToExcelDateInProcessingTab(r);

			if(id == "AD")
				setPatientTemp(r, "processingAutoSugg", "");
			else if(id == "AAprocessing")
				setPatientTemp(r, "processingAutoSugg", "accessionpatho");
			else if(id == "AA")
				setPatientTemp(r, "authorizationAutoSugg", "");
			else if(id == "AO")
				setPatientTemp(r, "outSourceAutoSugg", "");
			else if(id == "AAP")
				setPatientTemp(r, "reportingAutoSugg", "");
			
			if(id == "AD"){
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
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"processing\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"processing\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.ceil(numberOfPages)+", \"processing\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#processingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#processingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='processingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"processing\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#processingPagination').html(numberOfRows);
			}else if(id == "AA"){
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
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"authorization\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#authorizationNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#authorizationNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='authorizationPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"authorization\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#authorizationPagination').html(numberOfRows);
			}else if(id == "AAP"){
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
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"reporting\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"reporting\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"reporting\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#reportingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#reportingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='reportingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"reporting\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#reportingPagination').html(numberOfRows);
			}else if(id == "AO"){
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
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"outsource\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"outsource\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"outsource\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#outSourceNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#outSourceNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='outsourcePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"outsource\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#outSourcePagination').html(numberOfRows);
			}else if(id == "AAprocessing"){
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
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionpathologist\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionpathologist\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"accessionpathologist\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#accessionPathologistNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#accessionPathologistNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#accessionPathologistJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionpathologistPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accessionpathologist\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#accessionPathologistPagination').html(numberOfRows);
			}
		}
	});
}

function generateBarcodePopup1(id) {
	var data=$("#popupdata"+id).text();
	var divided = data.split("_");
	$("#barcodeId").val(divided[0]);
	$("#pName").val(divided[1]);
	$("#profileName").val(divided[2]);
	$("#tId").val(divided[3]);
	$('#Counter_Batch_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();
};

function generateBarcodePopup2(id) {
	var data=$("#popupdata"+id).text();
	var divided = data.split("_");
	$("#barcodeId").val(divided[0]);
	$("#pName").val(divided[1]);
	$("#profileName").val(divided[2]);
	$("#tId").val(divided[3]);
	$('#Counter_Batch_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();
};

function generateBarcodePopup3(id) {
	var data=$("#popupdata"+id).text();
	var divided = data.split("_");
	$("#barcodeId").val(divided[0]);
	$("#pName").val(divided[1]);
	$("#profileName").val(divided[2]);
	$("#tId").val(divided[3]);
	$('#Counter_Batch_Pop_Up1').modal("show");
	$('#Counter_Batch_Pop_Up1').modal();
};

function generateBarcodePopup4(id) {
	var data=$("#popupdata4"+id).text();
	var divided = data.split("_");
	$("#barcodeId").val(divided[0]);
	$("#pName").val(divided[1]);
	$("#profileName").val(divided[2]);
	$("#tId").val(divided[3]);
	$('#Counter_Batch_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();
};

function generateBarcodePrint11(a) {
	
	var barcodeId=$("#barcodeId").val();
	var pName=$("#pName").val();
	var profileName=$("#profileName").val();
	var tId=$("#tId").val();

	var txtinput=$("#txtBarcodecnt").val();
	if(txtinput==0)
	{
		alertify.error("Please Enter Greater Than Zero");
		return false;
	}	
	var count = 1;
	if ($("#txtBarcodecnt").val() != '' && $("#txtBarcodecnt").val() != null || $("#txtBarcodecnt").val() != 0 || $("#txtBarcodecnt").val() != "0") {
		count = $("#txtBarcodecnt").val();
	}
	if(pName && profileName)
		{
		window.open("pathology_labtest_barcode.jsp?masterId=" + barcodeId + "&count="
				+ count + "&tempPatient="+ pName + "&tempTestName="+ profileName);
		}
	
	$("#txtBarcodecnt").val("");
	$("#barcodeId").val("");
	$("#pName").val("");
	$("#profileName").val("");
	$("#tId").val(0);

	$('#Counter_Batch_Pop_Up').modal("hide");
}

function generateBarcodePrint12(a) {
	
	var barcodeId=$("#barcodeId").val();
	var pName=$("#pName").val();
	var profileName=$("#profileName").val();
	var tId=$("#tId").val();
	
	var count = 1;
	if ($("#txtBarcodecnt1").val() != '' && $("#txtBarcodecnt1").val() != null) {
		count = $("#txtBarcodecnt1").val();
	}
	if(pName && profileName)
		{
		window.open("pathology_labtest_barcode.jsp?masterId=" + barcodeId + "&count="
				+ count + "&tempPatient="+ pName + "&tempTestName="+ profileName);
		}
	
	$("#txtBarcodecnt1").val(1);
	$("#barcodeId").val("");
	$("#pName").val("");
	$("#profileName").val("");
	$("#tId").val(0);

	$('#Counter_Batch_Pop_Up1').modal("hide");
}

/************************************************************
 * @author Ganesh patil
 * @since  2-03-2020
 * @comment for get Count Of Tabs
************************************************************/
function  getCountOfTabs(){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/phlebotomy/getCountOfTabs",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			var divided = r.split(",");
			 $("#subChrgCount").text(divided[0]);
			 $("#chrgCount").text(divided[1]);
			 $("#subCount").text(divided[4]);
			 $("#servCount").text(divided[2]);
			 $("#deptCount").text(divided[3]);
			 
		}
	});
}

/***********************************************************
 * @author Ajay s khandare
 * @since  2-03-2020
 * @comment forward page on routine vale 
************************************************************/
function forwordPageProcessingRoutineValue(masterid, treatmentId, patientId, sampleTypeId, profileId)
{

	 var CovidReportProfileId= $("#CovidReportProfileId").val();
	 var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	 var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	 var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	 var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	 
	 
	 if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)
	{
			window.location.href = "pathology_processing_routineResult.jsp?masterid=" + masterid+"&treatmentId=" + treatmentId+"&patientId=" + patientId+"&sampleTypeId=" + sampleTypeId;	
	}else
	{
		    window.location.href = "pathology_processing_routineResult_Lab.jsp?masterid=" + masterid+"&treatmentId=" + treatmentId+"&patientId=" + patientId+"&sampleTypeId=" + sampleTypeId;	
	}	
}

function getPatientWiseSamples(treatmentId, patientId, sampleTypeId, callFrom){
	var unitId = $("#unitId").val();
	var testStatus = 0;
	
	if(callFrom == "processing"){
		testStatus = 3;
	}else{
		testStatus = 5;
	}
	
	if(patientId == undefined)
		patientId = 0;
	
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('testStatus=' + testStatus);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('callFrom=' + callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getPatientWiseSamples",
		success : function(r) {
			setPatientWiseSamplesDropDown(r, sampleTypeId);
		}
	});
}

function setPatientWiseSamplesDropDown(r, defaultSampleTypeId){
	var dropDownList = ""; //dropDownList	+ "<option value='-1'>Runner Boy</option>";
	var defaultValue = "";
	
	var masterId = $("#masterIdd").val();
	
	for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
		var data = r.labSampleWiseMasterDtoList[i].masterId+"-"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"-"+r.labSampleWiseMasterDtoList[i].profileId;

		if(r.labSampleWiseMasterDtoList[i].sampleTypeId == defaultSampleTypeId && r.labSampleWiseMasterDtoList[i].masterId == masterId){
			defaultValue = data;
		}
		
		dropDownList = dropDownList + "<option value="
				+ data+" data-name="+data+">"
				+r.labSampleWiseMasterDtoList[i].samplename+"</option>";
	}
	$("#patientWiseSamples").html(dropDownList);
	$("#patientWiseSamples").select2();
	
	$("#patientWiseSamples").select2('val', defaultValue);
}

function getRoutineValuesBySampleType(callFrom){
	var value = $("#patientWiseSamples").val();
	var patientId = $("#patientId").text();
	var treatmentId = $("#treatmentId").text();
	
	var data = value.split("-");
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();

	var profileId = data[2].trim();
	
	if(callFrom == "processing"){
		if(CovidReportProfileId == profileId || SARSCOV2ANTIGEN == profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId){
			location.replace("pathology_processing_routineResult.jsp?masterid=" +data[0].trim()+"&treatmentId=" +treatmentId.trim()+"&patientId=" +patientId.trim()+"&sampleTypeId=" +data[1].trim()+"");
		}else{
			location.replace("pathology_processing_routineResult_Lab.jsp?masterid=" +data[0].trim()+"&treatmentId=" +treatmentId.trim()+"&patientId=" +patientId.trim()+"&sampleTypeId=" +data[1].trim()+"");
		}
	}else{
		if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)		{
			//window.location.href = "pathology_authorization_routineResult.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
			location.replace("pathology_authorization_routineResult.jsp?masterid=" +data[0].trim()+"&treatmentId=" +treatmentId.trim()+"&sampleTypeId=" +data[1].trim()+"&profileId="+data[2].trim()+"");
		}else{
			location.replace("pathology_authorization_routineResult_Lab.jsp?masterid=" +data[0].trim()+"&treatmentId=" +treatmentId.trim()+"&sampleTypeId=" +data[1].trim()+"&profileId="+data[2].trim()+"");
		}
	}
}

/***********************************************************
 * @author Ajay s khandare
 * @since  2-03-2020
 * @comment forward page on routine vale 
************************************************************/
function forwordPageProcessingRoutineValueOnPathologist(masterid,treatmentId,patientId,sampleTypeId)
{
	var pathoflag="Y";
	window.location.href = "pathology_processing_routineResult.jsp?masterid=" + masterid+"&treatmentId=" + treatmentId+"&patientId=" + patientId+"&pathoflag='"+pathoflag+"'&sampleTypeId="+sampleTypeId+"";
	
}

/***********************************************************
 * @author Ajay s khandare
 * @since  2-03-2020
 * @comment forward page on routine vale 
************************************************************/
function forwordPageAuthorizedRoutineValue(masterid,treatmentId,patientId,sampleTypeId,profileId){
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)		{
		window.location.href = "pathology_authorization_routineResult.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}else{
		window.location.href = "pathology_authorization_routineResult_Lab.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}	
}

/*********************************************************
 * @author Ajay khandare
 * @date 07_03_2020
 * @Code This function is use to Set patient Information.
 *********************************************************/
function processingPatientinformation(treatmentId)
{
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
			"callform" : treatmentId
		},
        url : "ehat/registration/fetchPatientsRecordByTreatmentId",
        success : function(r) {
        	//alert(JSON.stringify(r));
            if (r.listRegTreBillDto.length > 0) {           
                $('#patientName').text(r.listRegTreBillDto[0].patientName);
                $("#age").text(r.listRegTreBillDto[0].age);
                $("#billNo").text(r.listRegTreBillDto[0].billId);
                $("#corporateid").text(r.listRegTreBillDto[0].categoryName);
                var datetime= new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
                var splitData = datetime.split(",");
                var formatDate = splitData[0].split("/");
                var finalDate = formatDate[1]+"-"+formatDate[0]+"-"+formatDate[2]+","+splitData[1];
                $("#doa").text(finalDate);
                $("#sex").text(r.listRegTreBillDto[0].gender);    
                $("#consultingDoctor").text(r.listRegTreBillDto[0].billId);
                $("#corporate").text(r.listRegTreBillDto[0].docNameChan);
                $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
                $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
                $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
                $("#patientId").text(r.listRegTreBillDto[0].patientId);
                $("#patientId11").text(r.listRegTreBillDto[0].centerPatientId);
                //$("#patientId").text(r.listRegTreBillDto[0].centerPatientId);
                $("#uId").val(r.listRegTreBillDto[0].unitId);
                $("#bill_Id").val(r.listRegTreBillDto[0].billId);
                $("#mobile").text(r.listRegTreBillDto[0].mobile);
                $("#addressheader").text(r.listRegTreBillDto[0].address);              
                $('#patientNameconsent').val(r.listRegTreBillDto[0].patientName);
                $("#addressconsent").val(r.listRegTreBillDto[0].address);
                $("#reletiveconsent").val(r.listRegTreBillDto[0].relativeName);
                $("#digNo").text(r.listRegTreBillDto[0].trcount);
                
                // adding routine value 
                
                $("#patientname").val(r.listRegTreBillDto[0].patientName);              
                $('#patientsex').val(r.listRegTreBillDto[0].gender);
                //alert(r.listRegTreBillDto[0].age+"DD");
               // alert(r.listRegTreBillDto[0].dob+"SSS");
                $("#patientAge").val(r.listRegTreBillDto[0].age);
                $("#address").val(r.listRegTreBillDto[0].address);
                $("#patienttype").text(r.listRegTreBillDto[0].trcount);
                $('#patientgander').val(r.listRegTreBillDto[0].gender);
                $("#addressNew").text(r.listRegTreBillDto[0].address);
                $("#patEmail").val(r.listRegTreBillDto[0].emailId); //Added by kranti for send document email from histopathology
                $("#businessType").val(r.listRegTreBillDto[0].businessType);
                $("#customerId").val(r.listRegTreBillDto[0].customerId);
               
                $("#mobileAuth").val(r.listRegTreBillDto[0].mobile);
               
            }
        }
    });  
}
/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set TestName and Profile name.
 *********************************************************/
function getProcessingRoutinevalueResutl(treatmentId){var Neutrophils=$("#Neutrophils").val();
var Lymphocytes=$("#Lymphocytes").val();
var Eosinophils=$("#Eosinophils").val();
var Basophils=$("#Basophils").val();
var Monocytes=$("#Monocytes").val();
var CbcProfile=$("#CbcProfile").val();
var Bandcells=$("#Bandcells").val();
var mId=$('#masterIdd').val();
var patientType=$('#patientgander').val();
var sampleTypeId = $("#sampleTypeId").val();
jQuery.ajax({
    async : false,
    type : "POST",
	data : {
		"masterid" : mId,
		"treatmentid" : treatmentId,
		"patientType" : patientType	
	},
	url : "ehat/phlebotomy/getRoutinevalueResutl",
    success : function(r) {
    	sr1 = 1;
		testcount1 = 1;
		count1 = 1;
		protestcount1 = 1;
		pkgcount1 = 1;
		pkgprocount1 = 1;
		pkgprotestcount1 = 1;
		pkgtestcount1 = 1;
		procount1 = 1;
		totalcount1 = 1;
		var html = "";
		
		if (r.proLi.length == 0 || r.proLi.length == null) {		
			html = html
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {	
		
			var x = 1;
			
			for ( var pk = 0; pk < r.proLi.length; pk++) {
			
			$("#IdPathologist").select2('val',r.proLi[pk].pathologistId);
			
			$("#kitSpecId").select2('val',r.proLi[pk].kitSpecId);
			
			var SARSCOV2ANTIGEN = $("#SARSCOV2ANTIGEN").val();//profile Id	
			var COVID19RNAAMPLIFICATION = $("#COVID19RNAAMPLIFICATION").val();//profile Id	  				
			var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();	
			var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
			 
            if(SARSCOV2ANTIGEN==r.proLi[pk].profileId || COVID19RNAAMPLIFICATION == r.proLi[pk].profileId )
            {	  
            	//alert("uuuuuuuuuuuu");
            	$('#kitspecId1').show();
            	$('#anitId').show();
            	//$('#kitspecId').hide();
            }else
            {	            		            	
            	$('#kitspecId').show();
            	$('#anitId1').show();
            }	
			
			
			var collectedatetime=r.proLi[pk].collecteddate;
			if(collectedatetime!=null ){
			collectdate=collectedatetime.split(" ");		
			$("#collectionDate").text(collectdate[0]);	
//			$("#collectiontime").text(collectdate[1]);
			var time = collectdate[1];
			time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
			if (time.length > 1) { // If time format correct
			   time = time.slice (1);  // Remove full string match value
			   time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
			   time[0] = +time[0] % 12 || 12; // Adjust hours
			 }
			 var time22 = time.join (''); // return adjusted time or original string
			 var d = new Date("1/1/2013 " + time22); 
		     var collTime = d.getHours() + ':' + d.getMinutes();
		     $("#collectiontime").text(collTime);
			  
			}
			var accpteddatetime=r.proLi[pk].accpteddate;
			if(accpteddatetime!=null ){
				accepteddate=accpteddatetime.split(" ");
				var formattedDate = accepteddate[0].split("-");
				var dd = formattedDate[2];
				var mm = formattedDate[1];
				var year = formattedDate[0];
				var formatDate = dd+"-"+mm+"-"+year;
				$("#accepteddate").text(formatDate);
				var time = accepteddate[1];
				time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
				if (time.length > 1) { // If time format correct
				   time = time.slice (1);  // Remove full string match value
				   time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
				   time[0] = +time[0] % 12 || 12; // Adjust hours
				 }
				 var time22 = time.join (''); // return adjusted time or original string
				 var d = new Date("1/1/2013 " + time22); 
			     var acceptTime = d.getHours() + ':' + d.getMinutes();
				$("#acceptedtime").text(acceptTime);
			}
			
			var proIdForTestLen = r.proLi[pk].profileId;
			
			html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
			html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
			html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />"
			
			html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLengthProWise"+(proIdForTestLen)+"' />"
			html = html + "<input type='hidden' value='"+ proIdForTestLen +"' id='proIdForTestLen"+(pk+1)+"' />";
			
			
			html = html + "<div class='col-md-12-3'";
			// previous code
			/*html = html + " style='height: 50px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
			
			html = html + " id='profileId"+(pk+1)+"' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+r.proLi[pk].profileName+" ";				
			
			html = html + " <textarea id='profileIdcomments"+(pk+1)+"' value='' style='float: right; width: 308px; height: 46px;'>"+r.proLi[pk].comments+"</textarea>";
			
			html = html + "<input class='center' id='profileCheckboxId"+(pk+1)+"' name='profileCheckboxId' checked type='checkbox' value='"+r.proLi[pk].sampleWiseMasterId+"-"+(pk+1)+"'/>";*/
			
			// added code for meesha
             html = html + " style='height: 50px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
			
			html = html + " id='profileId"+(pk+1)+"' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+r.proLi[pk].profileName+" ";				
			
			html = html + " <textarea id='profileIdcomments"+(pk+1)+"' value='' style='float: right; width: 308px; height: 46px;margin-top: 10px;'>"+r.proLi[pk].comments+"</textarea>";
			
			html = html + "<input class='center' id='profileCheckboxId"+(pk+1)+"' name='profileCheckboxId' checked type='checkbox' value='"+r.proLi[pk].sampleWiseMasterId+"-"+(pk+1)+"'/>";
			
			html = html + " <select id='machineIdP"+(pk+1)+"' value='' style=' width: 133px; '></select>";
			
			if (r.proLi[pk].pkgName != "-"&& r.proLi[pk].pkgName != null && r.proLi[pk].pkgName != "") {
				html = html + " - (" + r.proLi[pk].pkgName + ")</div>";
			} else {
				html = html + "</div>";
			}				  
			
			html = html + "</div>";
			
			var testidcheck=[];
			
			for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
			      var isTestIdAbsent = true;	
				if (r.proLi[pk].testli[ts].testId != 0) {
					
					if(testidcheck.length == 0){
						isTestIdAbsent = true;
					}
					for ( var ts1 = 0; ts1 < testidcheck.length; ts1++) {
						
						if(testidcheck[ts1] == r.proLi[pk].testli[ts].testId){
							isTestIdAbsent = false;
							//alert("FFFF");
							break;
						}
					}
					if(isTestIdAbsent)
						testidcheck[testidcheck.length] = r.proLi[pk].testli[ts].testId;
					
					if(isTestIdAbsent){							
								  
						            var a = r.proLi[pk].testli[ts].lowvalue+ "-"+ r.proLi[pk].testli[ts].highvalue+ "-"+ r.proLi[pk].testli[ts].unitname;
									
								    if (r.proLi[pk].testli[ts].highvalue != null|| r.proLi[pk].testli[ts].unitname != null) {
										a = r.proLi[pk].testli[ts].lowvalue+ "-"+ r.proLi[pk].testli[ts].highvalue;
									} else if (r.proLi[pk].testli[ts].lowvalue != null) {
										a = r.proLi[pk].testli[ts].lowvalue;
									} else {
										a = "-";
									}

									var unitname = r.proLi[pk].testli[ts].unitname;

									if (unitname != null) {
										unitname = r.proLi[pk].testli[ts].unitname;
									} else {
										unitname = "-";
									}

									var expression = r.proLi[pk].testli[ts].expression;

								
								if (expression == null || expression == "null") {
										expression = " ";
										
									} else {
										expression = r.proLi[pk].testli[ts].expression;
									}
									
									var expressionConvert="";
									if(expression == ">"){
										expressionConvert = "gt";
									}else if(expression == "<"){
										expressionConvert = "lt";
									}else if(expression == ">="){
										expressionConvert = "gte";
									}else if(expression == "<="){
										expressionConvert = "lte";
									}
									
									var quantitative = r.proLi[pk].testli[ts].quantitative;
									var expressionvalue = "";
									
									if(quantitative != null) {
										
										quantitative = r.proLi[pk].testli[ts].quantitative;
									
										expressionvalue = expression+ r.proLi[pk].testli[ts].defaultvalue;
										
									} else {
										quantitative = "N";
									}
									var result = 0;
									var decimal = 0;
									
								if (r.proLi[pk].testli[ts].testresult == null || r.proLi[pk].testli[ts].testresult == "" || r.proLi[pk].testli[ts].testresult == "null") {
								
								
								}else
								{
								   if(r.proLi[pk].testli[ts].reportingdecimal=="Y")
									{											
										decimal=r.proLi[pk].testli[ts].decimalvalue;

										if(r.proLi[pk].testli[ts].testresult == ""){
											
											result=(r.proLi[pk].testli[ts].testresult);
										}else{
											
											result=(Number(r.proLi[pk].testli[ts].testresult)).toFixed(decimal);
										}
										
										
									}else
									{										
										result=r.proLi[pk].testli[ts].testresult;
									}	
									
								}	
													    
								html = html + "<tr style='height:25px'>" ;			
								html = html + "<td></td>";	
								
								//alert(r.proLi[pk].testli[ts].testType);
							if (r.proLi[pk].profileId == CbcProfile) {
								  if (r.proLi[pk].testli[ts].testId == Neutrophils || r.proLi[pk].testli[ts].testId == Lymphocytes || r.proLi[pk].testli[ts].testId == Eosinophils ||  r.proLi[pk].testli[ts].testId == Basophils || r.proLi[pk].testli[ts].testId == Monocytes || r.proLi[pk].testli[ts].testId ==Bandcells)			 
									 {
									  //alert("DD");
								html = html + "<td id='testnameee"+(pk+1)+(ts+1)+ "' class='center' style='color:red;'>"+(r.proLi[pk].testli[ts].testName)+"</td><input type='hidden' value='"+(r.proLi[pk].testli[ts].testId)+"' id='testIdFlag"+ (pk+1) + (ts+1) +"' /><input type='hidden' value='"+ r.proLi[pk].profileId  +"' id='profileIdFlag"+(pk+1) + (ts+1) +"' />";
									 }else
									{
								html = html + "<td id='testnameee"+(pk+1)+(ts+1)+ "' class='center'>"+(r.proLi[pk].testli[ts].testName)+"</td><input type='hidden' value='"+(r.proLi[pk].testli[ts].testId)+"' id='testIdFlag"+ (pk+1) + (ts+1) +"' /><input type='hidden' value='"+ r.proLi[pk].profileId  +"' id='profileIdFlag"+(pk+1) + (ts+1) +"' />";
	 
									}	 
							}else
							 {									
								html = html + "<td id='testnameee"+(pk+1)+(ts+1)+ "' class='center'>"+(r.proLi[pk].testli[ts].testName)+"</td><input type='hidden' value='"+(r.proLi[pk].testli[ts].testId)+"' id='testIdFlag"+ (pk+1) + (ts+1) +"' /><input type='hidden' value='"+ r.proLi[pk].profileId  +"' id='profileIdFlag"+(pk+1) + (ts+1) +"' />";

							}	
								html = html + "<td id='trendanalysiId' class='center' style='font-weight: bold;'><input type='hidden' id='testnamehidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].testName+"'/><input type='hidden' id='unitnamehidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].unitname+"'/><input type='hidden' id='testIdhidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].testId+"'/><input type='button' class='btn btn-xs btn-success' id='analysisIdTest' value='Analysis' onclick=showTreanAnalysisTest("+(pk+1)+(ts+1)+") ></td>";
								
								if(r.proLi[pk].testli[ts].microorganism=="Y")
								{																			
									
									html = html + "<td class='center' style='font-weight: bold;display: none;'><select id='gretherId"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text'></select></td>";
									
								}else
								{
									html = html + "<td class='center' style='font-weight: bold;display: none;'><input id='gretherId"+(pk+1)+(ts+1)+"' type='text'  value=''></td>";

								}
							
								if(r.proLi[pk].applyformula=="Y")
								{
									
									if (r.proLi[pk].testli[ts].testresult == null || r.proLi[pk].testli[ts].testresult == "" || r.proLi[pk].testli[ts].testresult == "null") {
										
										//alert("SDSSSSS");
										
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' disabled='disabled'  type='text' tabindex=" + x + "'></select></td>";	

											} if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 18-11-2021
												//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' disabled='disabled'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";	
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' disabled='disabled'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') tabindex=" + x + "'></select></td>";
												}
												
												html = html + "<td class='center' style='font-weight: bold;'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' tabindex=" + x + "' disabled value=''></td>";
											}else
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') id='testresultt" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled' tabindex=" + x + "' value=''></td>";	

											}	
	
										}else
											{
											//html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  tabindex=" + x + "' type='text'></select></td>";	

											}if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 12-09-2021
												//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";	
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'   type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') tabindex=" + x + "'></select></td>";
												}
												
												html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' tabindex=" + x + "' disabled value=''></td>";
											}else
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')  onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') id='testresultt" + (pk+1) + (ts+1) + "' type='text' tabindex=" + x + "' value=''></td>";	

											}	

										}

									} else {
										
										//alert("tttttttttttt");
										
									   if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' tabindex=" + x + "' style='width:100%'  type='text'></select></td>";	

											}if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 12-09-2021
												//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled'  style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text' tabindex=" + x + "'   value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled'  style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') tabindex=" + x + "'></select></td>";
												}
												html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' tabindex=" + x + "'  disabled value=''></td>";

											}else
											{
												 html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text' tabindex=" + x + "' disabled='disabled' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')   value='"+(result)+"'></td>";
											}	
																							
										}else
										{
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' tabindex=" + x + "'></select></td>";	

											}if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 12-09-2021
												//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' tabindex=" + x + "' type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
												}
												
												
												html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' tabindex=" + x + "' value=''></td>";

											}else
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "'  tabindex=" + x + "' type='text' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')   value='"+(result)+"'></td>";	

											}												
										}
									}
								}else
								{										
									if (r.proLi[pk].testli[ts].testresult == null || r.proLi[pk].testli[ts].testresult == "" || r.proLi[pk].testli[ts].testresult == "null") {
										
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text' tabindex=" + x + "'></select></td>";	

											}if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 12-09-2021
												//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%' tabindex=" + x + "' type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
												}
												
												html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' tabindex=" + x + "' type='text'  disabled value=''></td>";

											}else
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' id='testresultt" + (pk+1) + (ts+1) + "' type='text' tabindex=" + x + "'  disabled='disabled' value=''></td>";	

											}	
	
										}else
											{
											//html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' tabindex=" + x + "'></select></td>";	

											}if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 12-09-2021
												//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') tabindex=" + x + "'></select></td>";
												}
												html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' tabindex=" + x + "' disabled value=''></td>";

											}else
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' id='testresultt" + (pk+1) + (ts+1) + "' type='text' tabindex=" + x + "' value=''></td>";
												
											 }

										  }

										} else {
											
											
											
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
											{
											if(r.proLi[pk].testli[ts].microorganism=="Y")
											{
												html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  tabindex=" + x + "' type='text'></select></td>";	

											}if(r.proLi[pk].testli[ts].testType=="general"){
												//added getGeneralType(this.value) by Rohit on 12-09-2021
												
												if(r.proLi[pk].testli[ts].textFlag=="Y"){
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
												}else{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') tabindex=" + x + "'></select></td>";
												}
												
												html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' tabindex=" + x + "' disabled value=''></td>";

											}else
											{
												html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text' disabled='disabled' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")'  tabindex=" + x + "' value='"+(result)+"'></td>";	

											}	

											}else
											{
											
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' tabindex=" + x + "' type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													
													//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";	
	
														if(r.proLi[pk].testli[ts].textFlag=="Y"){
															html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  tabindex=" + x + "'  value='"+(result)+"'></td>";
														}else{
															//html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')></select></td>";
															html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') tabindex=" + x + "'></select></td>";
														}
												
												}else
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' id='testresultt" + (pk+1) + (ts+1) + "' type='text' tabindex=" + x + "' value='"+(result)+"'></td>";	

												}	
											
											}

										}

									}	
								
								
								html = html + "<td id='reRunResult"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+r.proLi[pk].testli[ts].testReRunResult +"</td>";		

								if(quantitative=="Y")
								{
									html = html + "<td id='normalId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+expressionvalue+"</td>";		

								}else
								{
									html = html + "<td id='normalId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+a+"</td>";		

								}	
								
								if(r.proLi[pk].testli[ts].testType=="individual"){
									
									html = html + "<td id='unitIds"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+unitname+"</td>";		

								}else
								{
									//alert("DDD"+r.proLi[pk].testli[ts].unitNameGenaral);
									html = html + "<td id='unitIds"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+r.proLi[pk].testli[ts].unitNameGenaral+"</td>";		

								}	
								

								
								
								if (r.proLi[pk].testli[ts].flagmark == "-" || r.proLi[pk].testli[ts].flagmark == null || r.proLi[pk].testli[ts].flagmark == "" || r.proLi[pk].testli[ts].flagmark == "null")
								{						
									html = html + "<td id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'></td>";		
								}else
								{
									var color="";
									if(r.proLi[pk].testli[ts].flagmark == "N"){
										color="green";
									}else if(r.proLi[pk].testli[ts].flagmark == "L" || r.proLi[pk].testli[ts].flagmark == "H"){
										color="orange";
									}else if(r.proLi[pk].testli[ts].flagmark == "CL" || r.proLi[pk].testli[ts].flagmark == "CH"){
										color="red";
									} 
									html = html + "<td id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-size:15px;font-weight: bold;color:"+color+"'>"+(r.proLi[pk].testli[ts].flagmark)+"</td>";		
								}
																
								html = html + "<td id='methodId' class='center'>"+(r.proLi[pk].testli[ts].methodename)+"</td>";				
								
								
								if (r.proLi[pk].testli[ts].testreason == "-" || r.proLi[pk].testli[ts].testreason == null || r.proLi[pk].testli[ts].testreason == "" || r.proLi[pk].testli[ts].testreason == "null")
								{						
									   
									if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
									{
										  html = html + "<td id='reasionid' class='center'><textarea class='form-control' placeholder='Enter test comment' style='width: 142px; height: 45px;' id='reasionid" + (pk+1) + (ts+1) + "'  disabled='disabled'  value=''></textarea></td>";	

									}else											
									{
										  html = html + "<td id='reasionid' class='center'><textarea class='form-control' placeholder='Enter test comment' style='width: 142px; height: 45px;' id='reasionid" + (pk+1) + (ts+1) + "'   value=''></textarea></td>";	

									}	
								}else
								{
									if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
									{
										html = html + "<td id='reasionid' class='center' style='font-weight: bold;'><textarea class='form-control' placeholder='Enter test comments' style='width: 142px; height: 45px;' id='reasionid" + (pk+1) + (ts+1) + "'   disabled='disabled'  value=''>"+r.proLi[pk].testli[ts].testreason+"</textarea></td>";							

									}else
										{
										html = html + "<td id='reasionid' class='center' style='font-weight: bold;'><textarea class='form-control' placeholder='Enter test comments' style='width: 142px; height: 45px;' id='reasionid" + (pk+1) + (ts+1) + "'   value=''>"+r.proLi[pk].testli[ts].testreason+"</textarea></td>";							

										}
								}	
								var authotabId=$("#authotabId").val();
								//alert(authotabId);
								if(authotabId>0)
								{
									/*if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
									{
									    html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-success' id='cancleidpro' value='UnReject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+sampleTypeId+") ></td>";							
									}else
									{
										html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-danger' id='cancleidpro' value='Reject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+sampleTypeId+")></td>";								
									}
									html = html + "<td><input class='center' id='testidCheckbox"+ (pk+1) + (ts+1) +"' name='testidCheckbox'  type='checkbox' value="+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+r.proLi[pk].testli[ts].testReRun+"></td>";								
                                     */

								}else
								{
									if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
									{
									    html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-success' id='cancleidpro' value='UnReject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+sampleTypeId+") ></td>";							
									}else
									{
										html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-danger' id='cancleidpro' value='Reject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+sampleTypeId+")></td>";								
									}

								}	
								var SARSCOV2ANTIGEN = $("#SARSCOV2ANTIGEN").val();//profile Id	
								var COVID19RNAAMPLIFICATION = $("#COVID19RNAAMPLIFICATION").val();//profile Id	  
								var CovidReportProfileId = $("#COVID19RNAAMPLIFICATION").val();//profile Id	  
								var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();	
								var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
								
								
					            if(CovidReportProfileId==r.proLi[pk].profileId || SARSCOV2ANTIGEN==r.proLi[pk].profileId || COVID19RNAAMPLIFICATION == r.proLi[pk].profileId || REALTIMEHEPATITISCVIRUSHCV ==  r.proLi[pk].profileId || REALTIMETRUENAT ==  r.proLi[pk].profileId)
					            {
									html = html + "<td><input class='center' id='testidCheckbox"+ (pk+1) + (ts+1) +"' name='testidCheckbox'  disabled='disabled' type='checkbox' value="+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+r.proLi[pk].testli[ts].testReRun+"></td>";								

					            }else
					            {
									html = html + "<td><input class='center' id='testidCheckbox"+ (pk+1) + (ts+1) +"' name='testidCheckbox'  type='checkbox' value="+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+r.proLi[pk].testli[ts].testReRun+"></td>";								

					            }	
								
								html = html + "<input type='hidden' value='"+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' id='pkgIdproIdtestId"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].rejecttestflag)+"' id='rjflag"+ (pk+1) + (ts+1) +"' />";									
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].nonexistlow)+"' id='nl"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].labcl)+"' id='cl"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].lowvalue)+"' id='l"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].highvalue)+"' id='h"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].labch)+"' id='ch"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].nonexisthigh)+"' id='nh"+ (pk+1) + (ts+1) +"' />";
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].microorganism)+"' id='microorganism"+ (pk+1) + (ts+1) +"' />";

								//html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].testId)+"' id='testIdFlag"+ (pk+1) + (ts+1) +"' />";

								
								    var defaultvalue=0;
								    var decimal=0;
									
									if(r.proLi[pk].testli[ts].reportingdecimal=="Y")
								    {												
											decimal=r.proLi[pk].testli[ts].decimalvalue;												
											defaultvalue=(Number(r.proLi[pk].testli[ts].defaultvalue)).toFixed(decimal);												
									}else
									{								
										    defaultvalue=r.proLi[pk].testli[ts].defaultvalue;
									}	
										
									
								
								
								html = html + "<input type='hidden' value='"+(defaultvalue)+"' id='defaultvalue"+ (pk+1) + (ts+1) +"' />";			
							
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].objFormula)+"' id='formulaForTest"+ (pk+1) + (ts+1) +"' />";									
								html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].testName)+"' id='nameOfTest"+(pk+1) + (ts+1)+"' />";

								
								html = html + "<input type='hidden' value='"+r.proLi[pk].testli.length +"' id='reportTestCount"+ (pk+1) + (ts+1) +"' />";									

								/*html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
								html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";*/
								
					}
			}
				x++;
			}	

			
		}
			
			$("#itemMasterRecordsList").html(html);
			
				
			getmicroorganismName(r);
			getgradingName(r);
			getGenralValueName(r);		
			// set machine name
			setMachineListOnProcessing(r);
			// end machine name
			
		}			
		
    }
});  

}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use set Formula To TestResult.
 *********************************************************/
function setFormulaToTestResult(rowCount,id1,id2,quantitative,expressionConvert) {
	
	var formulaForTest = $("#formulaForTest" + rowCount).val();
	if (formulaForTest != "" && formulaForTest != "undefined" && formulaForTest != "null") {
		formulaForTest = formulaForTest.replace(/\{/g, "$");
		formulaForTest = formulaForTest.replace(/\}/g, "$");
	
		var applFormula = formulaForTest.split("$");
		var expTestIdForm = "";

		for ( var i = 0; i < applFormula.length; i++) {

			var valFieldFinal = '';

			if (i % 2 == 0) {
				
				if (applFormula[i] != "") {
					valFieldFinal = applFormula[i];
				}
			
			} else {				
				var valField = '';
				var proLength = $("#proLength").val();	
           
				for ( var k = 0; k <= proLength; k++) 		
				{
					var profileIdFlag = $("#profileIdFlag"+rowCount).val();
					var proIdForTestLen = $("#proIdForTestLen"+k).val();
					
					if(profileIdFlag == proIdForTestLen){
						
						var testLength = $("#testLength" + k).val();
						for ( var jk = 1; jk <= testLength; jk++) {

							var namei = applFormula[i];
							var name = $.trim($("#nameOfTest" + k + jk).val());
							if (namei == name) {
								matchflag = "Y";
								valField = $("#testresultt" + k + jk).val();
								if (valField == "") {
									alert("Enter Value Of "+ $("#nameOfTest" + k + jk).val()+ " Test.");
									break;
								}
								break;
							}

						}
					}
				}												
				valFieldFinal = valField;				
			}

			//if (valFieldFinal != 0) {			
				expTestIdForm = expTestIdForm + valFieldFinal;				
			//}
		}
		//alert(expTestIdForm);
		var xrr = 0;		
		xrr=parse(expTestIdForm);
		
		if(xrr<0)
		{
			alert(" Result Value in Minus");
			xrr=0;
		}	
		if (xrr != null)
			$("#testresultt" + rowCount).val(xrr.toFixed(2));
			$("#testresultt"+ rowCount).prop('readonly', true);
			
			//alert(quantitative);
			setFlagOfCritical(id1,id2,quantitative,expressionConvert);
	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part.
 *********************************************************/
function parse(string) { // wrapper
	var r = {
		string : string,
		offset : 0
	};
	try {
		var value = parseExpr(r);
		if (r.offset < r.string.length) {
			//r.error = 'Syntax error: junk found at offset ' + r.offset;
			throw 'trailingJunk';
		}
		return value;
	} catch (e) {
		alert(r.error + ' (' + e + '):\n' + r.string.substr(0, r.offset)
				+ '<*>' + r.string.substr(r.offset));
		return;
	}
}
/*********************************************************
 * @author Ajay khandare
  * @date 1_04_2020
 * @Code This function is use  calcalute part.
 *********************************************************/
function parseExpr(r) {
	var stack = [ {
		precedence : 0,
		assoc : 'L'
	} ];
	var op;
	var value = parseVal(r); // first value on the left
	for (;;) {
		op = parseOp(r) || {
			precedence : 0,
			assoc : 'L'
		};
		while (op.precedence < stack[stack.length - 1].precedence
				|| (op.precedence == stack[stack.length - 1].precedence && op.assoc == 'L')) {
			// precedence op is too low, calculate with what we've got on the
			// left, first
			var tos = stack.pop();
			if (!tos.exec)
				return value; // end reached
			// do the calculation ("reduce"), producing a new value
			value = tos.exec(tos.value, value);
		}
		// store on stack and continue parsing ("shift")
		stack.push({
			op : op.op,
			precedence : op.precedence,
			assoc : op.assoc,
			exec : op.exec,
			value : value
		});
		value = parseVal(r); // value on the right
	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part. //operator table
 *********************************************************/
var ops = {
	'+' : {
		op : '+',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l + r;
		}
	},
	'-' : {
		op : '-',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l - r;
		}
	},
	'*' : {
		op : '*',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l * r;
		}
	},
	'/' : {
		op : '/',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			
			if(r != 0)
				return l / r;
			else
				return 0;
		}
	},
	'**' : {
		op : '**',
		precedence : 30,
		assoc : 'R',
		exec : function(l, r) {
			return Math.pow(l, r);
		}
	}
};
/*********************************************************
 * @author Ajay khandare
 * @date 10_03_2020
 * @Code This function is use  calcalute part. //constants or variables
 *********************************************************/
var vars = {
	e : Math.exp(1),
	pi : Math.atan2(1, 1) * 4
};
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  input for parsing var r = { string: '123.45+33*8', offset: 0 };
 * r is passed by reference: any change in r.offset is returned to the caller
 * functions return the parsed/calculated value
 *********************************************************/
function parseVal(r) {
	var startOffset = r.offset;
	var value;
	var m;
	// floating point number
	// example of parsing ("lexing") without aid of regular expressions
	value = 0;
	while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
			&& r.offset < r.string.length)
		r.offset++;
	if (r.string.substr(r.offset, 1) == ".") {
		r.offset++;
		while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
				&& r.offset < r.string.length)
			r.offset++;
	}
	if (r.offset > startOffset) { // did that work?
		// OK, so I'm lazy...
		return parseFloat(r.string.substr(startOffset, r.offset - startOffset));
	} else if (r.string.substr(r.offset, 1) == "+") { // unary plus
		r.offset++;
		return parseVal(r);
	} else if (r.string.substr(r.offset, 1) == "-") { // unary minus
		r.offset++;
		return negate(parseVal(r));
	} else if (r.string.substr(r.offset, 1) == "(") { // expression in parens
		r.offset++; // eat "("
		value = parseExpr(r);
		if (r.string.substr(r.offset, 1) == ")") {
			r.offset++;
			return value;
		}
		r.error = " ";
		//r.error = "Parsing error: ')' expected";
		throw 'parseError';
	} else if (m = /^[a-z_][a-z0-9_]*/i.exec(r.string.substr(r.offset))) { // variable/constant
		// name
		// sorry for the regular expression, but I'm too lazy to manually build
		// a varname lexer
		var name = m[0]; // matched string
		r.offset += name.length;
		if (name in vars)
			return vars[name]; // I know that thing!
		//r.error = "Semantic error: unknown variable '" + name + "'";
		r.error = " ";
		throw 'unknownVar';
	} else {
		if (r.string.length == r.offset) {
			r.error = ' ';
			//r.error = 'Parsing error at end of string: value expected';
			throw 'valueMissing';
		} else {
			r.error = " ";
			//r.error = "Parsing error: unrecognized value";
			throw 'valueNotParsed';
		}
	}
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part. 
 *********************************************************/
function negate(value) {
	return -value;
}
/*********************************************************
 * @author Ajay khandare
 * @date 1_04_2020
 * @Code This function is use  calcalute part. 
 *********************************************************/
function parseOp(r) {
	if (r.string.substr(r.offset, 2) == '**') {
		r.offset += 2;
		return ops['**'];
	}
	if ("+-*/".indexOf(r.string.substr(r.offset, 1)) >= 0)
		return ops[r.string.substr(r.offset++, 1)];
	return null;
}


/*******************************************************************************
 * @author Ajay khandare
 * @date 10_03_2020
 * @Code This function is use to get pathologist name.
 ******************************************************************************/
function getpathologistname() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/phlebotomy/getpathologistname",
		success : function(r) {
			setpathologistnamee(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 10_03_2020
 * @Code This function is use to set pathologist  name.
 *********************************************************/
function setpathologistnamee(r){	
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.phlebotomytableList.length; int++) {
		list=list+'<option value="'+(r.phlebotomytableList[int].pathologyId)+'">'+(r.phlebotomytableList[int].pathologyname)+'</option>';		
	}	
	$("#IdPathologist").html(list);	
	$("#IdPathologist").select2();	
}


/********************************************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for save LabTest RoutineValueResult 
*******************************************************************************/
function saveLabTestRoutineValueResult(id) {
	
	document.getElementById("primeLoader").style.display = "block";
	var statusFlag=$("#"+id).val();
	//var idPathologist=$("#IdPathologist").val();
	var idPathologist=0;
	var kitSpecId=$("#kitSpecId").val();	
	var pIdReporting= $("#pId").val();
	if(pIdReporting == "undefined" || pIdReporting == undefined )
	{
		pIdReporting=0;
	}
	var machineId1=$("#machineId").val();
	if(machineId1 == "undefined" || machineId1 == undefined )
	{
		machineId1="0,0";
	}
	var mId=machineId1.split(" ");
	var Neutrophils=$("#Neutrophils").val();
	var Lymphocytes=$("#Lymphocytes").val();
	var Eosinophils=$("#Eosinophils").val();
	var Basophils=$("#Basophils").val();
	var Monocytes=$("#Monocytes").val();
	var CbcProfile=$("#CbcProfile").val();
	var Bandcells=$("#Bandcells").val();
	var CovidReportProfileId=$("#CovidReportProfileId").val();
	var SARSCoV2RTPCR=$("#SARSCoV2RTPCR").val();
	var CTVALUEFORCONFIRMATORYGENE=$("#CTVALUEFORCONFIRMATORYGENE").val();
	
	
	var testresultadding=0;
	var machineId=mId[0];
	var serialNo=mId[1];
    var flagId="";
    var resultmarge=0;
    var testId=0;
    var profileId=0;
    var counttestaddition=0;
	 if (statusFlag == "AA" || statusFlag == "AAP") {		
			/*if (idPathologist == "" || idPathologist == "undefined" || idPathologist == null || idPathologist == 0|| idPathologist == "0") {
				alert("Please Select Pathologist Name.");
				$("#IdPathologist").focus();
				return false;
			}*/						
	}
	if (statusFlag == "AA") {
		/*if (machineId == "" || machineId == "undefined" || machineId == null
				|| machineId == 0 || machineId == "0") {
			alert("Please Select Machine Name.");
			$("#machineId").focus();
			return false;
		}*/
	} else if (statusFlag == "AAP") {
		machineId=0;
		serialNo=0;
	}	
	
	var checkedMasterIds = [];
	var profileSerialNumbers = [];
	
	$('input[name=profileCheckboxId]:checked').each(function(){
		var checkedValues = this.value;
		var data = checkedValues.split("-");
		checkedMasterIds.push(data[0]);
		profileSerialNumbers.push(data[1]);
		
	});

	if(checkedMasterIds.length <= 0 || profileSerialNumbers.length <= 0){
		alert("Please select atleast one profile.");
		return false;
	}
	// added for update machine id,name and comments
	var phlebotomysampleMastertable = {
			lstSampleMasterlist : []
	};	
	$('input[name=profileCheckboxId]:checked').each(function(){
		var checkedValues = this.value;
		var data = checkedValues.split("-");
		//checkedMasterIds.push(data[0]);
		//profileSerialNumbers.push(data[1]);
		
		
		var machineIdP=$("#machineIdP"+data[1]).val();
		var machineName=$("#machineIdP"+data[1]+"option:selected").text();
		var pComments=$("#profileIdcomments"+data[1]).val();
		
		phlebotomysampleMastertable.lstSampleMasterlist.push({
			"sampleWiseMasterId" : data[0],
			"machineId" : machineIdP,
			"machineName" : "aa",
			"profileComments" : pComments,
			
		});
		
	});
	//end
	
//	return false;
	
	var masterIdd = checkedMasterIds.join();
	
	var proLength = $("#proLength").val();	
	var masterIdd1=$("#masterIdd").val();
	
	var idList = [];
	var profileIdcomments="";	
	
	var phlebotomytableTestsalve = {
			pathologySampleWiseSlaveList : []
	};	
	
	for(var j = 1; j <= proLength; j++){
		var status = false;
		for(var k = 0; k < profileSerialNumbers.length; k++){
			if(j == profileSerialNumbers[k]){
				status = true;
			}
		}
		if(!status){
			continue;
		}
		var testLength = $("#testLength" + j).val();
		profileIdcomments = $("#profileIdcomments" + j).val();
		
		
		for(var i = 1; i <= testLength; i++) {
			var pkgtestId = $("#pkgIdproIdtestId" + j + i).val();

			// code added by ROHIT on 11 Oct 2022
			if(pkgtestId == undefined) {
				//break;
				continue;
			}
			//============================================================
			
			var pkgprofiletestId = pkgtestId.split(",");
			profileId = pkgprofiletestId[0];
			testId = pkgprofiletestId[1];
			var testresult = "";
			var microorganism = $("#microorganism" + j + i).val();
			var expression="";
			var resultint=0;
			if(microorganism=="Y"){
				expression = $("#gretherId"+j+i+" option:selected").text();		
			}else{
				expression = $("#gretherId11" + j + i).val();
			}	
			
			if(statusFlag == "AU") {
				if (microorganism == "Y") {
					testresult = $("#testresultt"+j+i+" option:selected").text();
				} else {
					testresult = $("#testresultt" + j + i).val();
				}

				flagId = $("#flagId" + j + i).text();

				if(flagId == "NE") {
					alert("Non Existant test result has been identified. Please Re-verify!");
					document.getElementById("primeLoader").style.display = "none";	
				}
			} else if (statusFlag == "AA" || statusFlag == "AAP" ) {
				rjflag = $("#rjflag" + j + i).val();

				if(rjflag == "Y") {
					if(microorganism == "Y") {								
						testresult = $("#testresultt"+j+i+" option:selected").text();
					} else {
						testresult = $("#testresultt" + j + i).val();
					}

					if(testresult == "" || testresult == null || testresult == undefined || testresult == " ") {
						testresult = " ";
					}
				} else {
					if(microorganism == "Y") {						
						testresult = $("#testresultt"+j+i+" option:selected").text();
					}else {
						testresult = $("#testresultt" + j + i).val();
					}

					if(testresult == "" || testresult == null || testresult == undefined || testresult == " ") {
						testresult = 0;
						alert("Please Enter Routine value");
						document.getElementById("primeLoader").style.display = "none";	
						return false;
					}

				}
				flagId = $("#flagId" + j + i).text();

				if (flagId == "NE") {
					alert("Non Existant test result has been identified. Please Re-verify");
					document.getElementById("primeLoader").style.display = "none";	
					return false;
				}
							    
				 if (profileId == CbcProfile) {
				    if (testId == Neutrophils || testId == Lymphocytes || testId == Eosinophils ||  testId == Basophils || testId == Monocytes || testId == Bandcells)			 
					 {		
				    	 counttestaddition++;
						 resultint=Number(testresult);		
						 testresultadding=Number(testresultadding)+Number(resultint);
						
						  						
					 }	
				 }   
			}
           // alert(testresult+"D");
			var reasionid = $("#reasionid" + j + i).val();
			var flagId = $("#flagId" + j + i).text();
			phlebotomytableTestsalve.pathologySampleWiseSlaveList.push({
				"profileId" : profileId,
				"testid" : testId,
				"testResult" : testresult,
				"testReason" : reasionid,
				"flagMark" : flagId,
				"expression" : expression,
			});
		}
		
		 if (profileId == CbcProfile) {
			if (counttestaddition==6) {
				var totalTestResult = (testresultadding).toFixed(0);				
				if (totalTestResult != 100) {
					alert("The differential count is not equal to 100%. Please Re-verify!");
					document.getElementById("primeLoader").style.display = "none";	
					return false;
				}
			} /*else {
				alert("Differential Count Must Have All Mandetory Test ");
			}*/

		}
		 
		 if (statusFlag == "AAP" || statusFlag == "AA" || statusFlag=="AU")					
			{
				 if (profileId == CovidReportProfileId) {
					 					
					    var  testr1 = $("#testresultt" + 1 + 1).val(); 																										
						
					    if(testr1=="Not Detected")
					    {
							var  testr12 = $("#testresultt" + 1 + 2).val(); 
							var tes=Number(testr12);
							if(tes<=40)
							{
								alert("Not Detected value should be higher than 40");
								document.getElementById("primeLoader").style.display = "none";	
								return false;
							}	
						}else if(testr1=="Detected")
						{
                            var  testr12 = $("#testresultt" + 1 + 2).val(); 
                          
                            var tes=Number(testr12);
							if(tes>40 || testr12=="NA")
							{
								alert("Detected value should be 40 or less than 40");
								document.getElementById("primeLoader").style.display = "none";	
								return false;
							}	
						}															 
				 }
			}
	}
	//return false;
	
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var phlebotomysamplemasterDtotable = JSON.stringify(phlebotomysampleMastertable);
	var inputs = [];	
	inputs.push('id=' + masterIdd);
	inputs.push('machineId=' + machineId);
	inputs.push('SerialNo=' + serialNo);
	inputs.push('statusFlag=' + statusFlag);
	inputs.push('idPathologist=' + idPathologist);
	inputs.push('kitSpecId=' + kitSpecId);
	inputs.push('pIdReporting=' + pIdReporting);
	inputs.push('profileIdcomments=' + profileIdcomments);
	inputs.push('phlebotomyListTestsalve=' + encodeURIComponent(phlebotomyListTestsalve));
	inputs.push('phlebotomysamplemastertable=' + encodeURIComponent(phlebotomysamplemasterDtotable));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/saveLabTestRoutineValueResult",
		data : str + "&reqType=AJAX",
		success : function(r) {
			
			   if (statusFlag == "AU") {
				     alert("Save Successfully.");
				     window.location.replace("pathology_proccessing.jsp");
			         //document.getElementById("primeLoader").style.display = "none";	
			    }else if(statusFlag == "AA")
			    {
			    	 alert("Sample Save & Authorized Successfully.");	
			         window.location.replace("pathology_proccessing.jsp");
				    // document.getElementById("primeLoader").style.display = "none";	

			    }else if(statusFlag == "AAP"){
			    	 alert(" Sample Authorized & Posted Successfully.");
			    	 window.location.replace("pathology_authorizatioin.jsp");
			    		
			    }
			   document.getElementById("primeLoader").style.display = "none";
				
		}
	});

}

function setFlagOfCritical(id, id1, quantitative,expressionConvert) {
	var id3 = id + "" + id1;
	var nl = Number($('#nl' + id3).val());
	var cl = Number($('#cl' + id3).val());
	var l = Number($('#l' + id3).val());
	var h = Number($('#h' + id3).val());
	var ch = Number($('#ch' + id3).val());
	var nh = Number($('#nh' + id3).val());
	if(ch == 0 || ch == ""){
		ch = 9999999999;
	}
	
	var defaultvalue = Number($('#defaultvalue' + id3).val());	
	var testres=$('#testresultt' + id3).val();
	var testResult = Number($('#testresultt' + id3).val());
	let extestResult = ($('#testresultt' + id3).val());
	
	var CovidReportProfileId=$("#CovidReportProfileId").val();
	var profileIdFlag=$("#profileIdFlag"+id3).val();
	
	//var testIdFlag=$("#testIdFlag"+id3).val();
		
	if (quantitative == "Y") {//quantitative means Qualitative in this case
		
		if(expressionConvert == "lt"){// lt = <
			//alert(expressionConvert);
			var flag=Number(defaultvalue-l);
			
			var flag1=Number(defaultvalue+h);
			
			if (flag > testResult ) {// for Negative Value Check	
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.success("Test Result Is Negative!");
			
			}else if(flag1 < testResult ) {// for Positive Value Check			
				$('#flagId' + id3).text("Positive");
				$('#flagId' + id3).css('color', 'red');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Positive!");
			}else
			{

				
				 if(testres=="Not Detected")
				{	
					// alert("jhjhj");			
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");

					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val("NA");
						$('#flagId' + 12).text("Negative");
						$('#flagId' + 12).css('color', 'green');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = true;
					}	
					
				}else if(testres=="Detected")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
					
					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val('');
						$('#flagId' + 12).text("Positive");
						$('#flagId' + 12).css('color', 'red');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = false;
					}	
					
				}else if(testres=="Positive")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
				}else if(testres=="Negative")
				{     //alert("wwwwwwwww");	
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Negative!");
				}else if(testres=="NA")
				{     
					
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Negative!");
				}else
				{
					
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Negative!");
				}	
			
			}	
		}else if(expressionConvert == "lte"){// lt =  <=
		
			// lt = <
			//alert(expressionConvert);
			var flag=Number(defaultvalue-l);
			
			var flag1=Number(defaultvalue+h);
			
			if (flag >= testResult ) {// for Negative Value Check			
				
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.success("Test Result Is Negative!");
			
			}else if(flag1 < testResult ) {// for Positive Value Check
				$('#flagId' + id3).text("Positive");
				$('#flagId' + id3).css('color', 'red');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Positive!");
			}else
			{

				
				 if(testres=="Not Detected")
				{	
					// alert("jhjhj");			
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Negative!");

					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val("NA");
						$('#flagId' + 12).text("Negative");
						$('#flagId' + 12).css('color', 'green');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = true;
					}	
					
				}else if(testres=="Detected")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
					
					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val('');
						$('#flagId' + 12).text("Positive");
						$('#flagId' + 12).css('color', 'red');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = false;
					}	
					
				}else if(testres=="Positive")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
				}else if(testres=="Negative")
				{     //alert("wwwwwwwww");	
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
				}else if(testres=="NA")
				{     
					
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
				}else
				{
					
					//below if-else added by Rohit on 18-11-2021
					if(($('#generalTypeIdd' + id3).val()) === "Abnormal"){
						$('#flagId' + id3).text("Positive");
						$('#flagId' + id3).css('color', 'red');
						$('#flagId' + id3).css('font-size', '14px');
						
						$('#flagId1' + id3).text("Positive");
						$('#flagId1' + id3).css('color', 'red');
						$('#flagId1' + id3).css('font-size', '14px');
						alertify.error("Test Result Is Positive!");
					}
					else{
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
					}
				}	
			
			}	
		
		}else if(expressionConvert == "gt"){// gt = >
			
			
			//alert(expressionConvert);
			var flag=Number(defaultvalue-l);
			
			var flag1=Number(defaultvalue+h);
			
			if (flag > testResult ) {// for Positive Value Check	
				$('#flagId' + id3).text("Positive");
				$('#flagId' + id3).css('color', 'red');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Positive!");
			
			}else if(defaultvalue < testResult ) {// for Negative Value Check			
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.success("Test Result Is Negative!");
			}else{
				
				if(testres=="Not Detected")
				{	
					// alert("jhjhj");			
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");

					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val("NA");
						$('#flagId' + 12).text("Negative");
						$('#flagId' + 12).css('color', 'green');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = true;
					}	
					
				}else if(testres=="Detected")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
					
					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val('');
						$('#flagId' + 12).text("Positive");
						$('#flagId' + 12).css('color', 'red');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = false;
					}	
					
				}else if(testres=="Positive")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
				}else if(testres=="Negative")
				{     //alert("wwwwwwwww");	
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
				}else if(testres=="NA")
				{     
					
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
				}else
				{
					//below if-else added by Rohit on 12-09-2021
					if(($('#generalTypeIdd' + id3).val()) === "Abnormal"){
						$('#flagId' + id3).text("Positive");
						$('#flagId' + id3).css('color', 'red');
						$('#flagId' + id3).css('font-size', '14px');
						alertify.error("Test Result Is Positive!");
					}
					else{
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
					}
				}	
				
			}			
		}else if(expressionConvert == "gte"){// gt = >=
			
			
			//alert(expressionConvert);
			var flag=Number(defaultvalue-l);
			
			var flag1=Number(defaultvalue+h);
			
			if (flag > testResult ) {// for Positive Value Check	
				$('#flagId' + id3).text("Positive");
				$('#flagId' + id3).css('color', 'red');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Positive!");
			
			}else if(defaultvalue <= testResult ) {// for Negative Value Check			
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.success("Test Result Is Negative!");
			}else{
				
				if(testres=="Not Detected")
				{	
					// alert("jhjhj");			
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Negative!");

					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val("NA");
						$('#flagId' + 12).text("Negative");
						$('#flagId' + 12).css('color', 'green');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = true;
					}	
					
				}else if(testres=="Detected")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
					
					if(CovidReportProfileId==profileIdFlag)
					{
						$("#testresultt"+ 12).val('');
						$('#flagId' + 12).text("Positive");
						$('#flagId' + 12).css('color', 'red');
						$('#flagId' + 12).css('font-size', '14px');
						document.getElementById("testresultt"+12).disabled = false;
					}	
					
				}else if(testres=="Positive")
				{
					//alert("jhjhjreter");
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
				}else if(testres=="Negative")
				{     //alert("wwwwwwwww");	
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
				}else if(testres=="NA")
				{     
					
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Negative!");
				}else
				{
					//below if-else added by Rohit on 18-11-2021
					if(($('#generalTypeIdd' + id3).val()) === "Abnormal"){
						$('#flagId' + id3).text("Positive");
						$('#flagId' + id3).css('color', 'red');
						$('#flagId' + id3).css('font-size', '14px');
						alertify.error("Test Result Is Positive!");
					}
					else{
					$('#flagId' + id3).text("Negative");
					$('#flagId' + id3).css('color', 'green');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.success("Test Result Is Negative!");
					}
				}	
				
			}			
		
		}
				
	} else {
		  
		// alert(id3);	
		if (testResult < nl) {// for critical Low Value Check
			// $('#flagId'+id3).text("");
			
			$('#flagId' + id3).text("NE");
			$('#flagId' + id3).css('color', 'black');
			$('#flagId' + id3).css('font-size', '14px');
			alertify.error("Test Result Not Exist Low!");

		}else if (l <= testResult && h >= testResult) {// for Normal Value
													// Check
			$('#flagId' + id3).text("N");
			$('#flagId' + id3).css('color', 'green');
			$('#flagId' + id3).css('font-size', '14px');
		} else if (cl < testResult && l > testResult) {// for Low Value Check
		
			$('#flagId' + id3).text("L");
			$('#flagId' + id3).css('color', 'orange');
			$('#flagId' + id3).css('font-size', '14px');
		}  else if (ch >= testResult && h <= testResult) {// for High Value// Check
			
			$('#flagId' + id3).text("H");
			$('#flagId' + id3).css('color', 'orange');
			$('#flagId' + id3).css('font-size', '14px');
		}else if (testResult >= nl && testResult <= cl) {// for critical Low// Value Check
			$('#flagId' + id3).text("CL");
			$('#flagId' + id3).css('color', 'red');
			$('#flagId' + id3).css('font-size', '14px');
		}  else if (nh >= testResult && ch <= testResult) {// for critical High// Value Check
			
			$('#flagId' + id3).text("CH");
			$('#flagId' + id3).css('color', 'red');
			$('#flagId' + id3).css('font-size', '14px');
		} else if (testResult > nh) {// for critical High Value Check
			
			$('#flagId' + id3).text("NE");
			// $('#flagId'+id3).text("");
			$('#flagId' + id3).css('color', 'black');
			$('#flagId' + id3).css('font-size', '14px');
			alertify.error("Test Result Not Exist High!");
			//$('#testresultt'+id3).focus();
		} else {
			
			//alert(testres);
			if(testres=="Not Detected")
			{	
				// alert("jhjhj");			
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Negative!");

				if(CovidReportProfileId==profileIdFlag)
				{
					$("#testresultt"+ 12).val("NA");
					$('#flagId' + 12).text("Negative");
					$('#flagId' + 12).css('color', 'green');
					$('#flagId' + 12).css('font-size', '14px');
					document.getElementById("testresultt"+12).disabled = true;
				}	
				
			}else if(testres=="Detected")
			{
				//alert("jhjhjreter");
				$('#flagId' + id3).text("Positive");
				$('#flagId' + id3).css('color', 'red');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Positive!");
				
				if(CovidReportProfileId==profileIdFlag)
				{
					$("#testresultt"+ 12).val('');
					$('#flagId' + 12).text("Positive");
					$('#flagId' + 12).css('color', 'red');
					$('#flagId' + 12).css('font-size', '14px');
					document.getElementById("testresultt"+12).disabled = false;
				}	
				
			}else if(testres=="Positive")
			{
				//alert("jhjhjreter");
				$('#flagId' + id3).text("Positive");
				$('#flagId' + id3).css('color', 'red');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.error("Test Result Is Positive!");
			}else if(testres=="Negative")
			{     //alert("wwwwwwwww");	
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.success("Test Result Is Negative!");
			}else if(testres=="NA")
			{     
				//alert("wwwwwwwww");	
				$('#flagId' + id3).text("Negative");
				$('#flagId' + id3).css('color', 'green');
				$('#flagId' + id3).css('font-size', '14px');
				alertify.success("Test Result Is Negative!");
			}else
			{
				//below if-else added by Rohit on 18-11-2021
				if(($('#generalTypeIdd' + id3).val()) === "Abnormal"){
					$('#flagId' + id3).text("Positive");
					$('#flagId' + id3).css('color', 'red');
					$('#flagId' + id3).css('font-size', '14px');
					alertify.error("Test Result Is Positive!");
				}
				else{
					
							var exResult=Number(extestResult.replace(/[&\/\\#,+()$~%'":*?<>={}]/g, ''));
							
							if (exResult < nl) {// for critical Low Value Check
								// $('#flagId'+id3).text("");
								
								$('#flagId' + id3).text("NE");
								$('#flagId' + id3).css('color', 'black');
								$('#flagId' + id3).css('font-size', '14px');
								alertify.error("Test Result Not Exist Low!");
		
							}else if (l <= exResult && h >= exResult) {// for Normal Value
																		// Check
								$('#flagId' + id3).text("N");
								$('#flagId' + id3).css('color', 'green');
								$('#flagId' + id3).css('font-size', '14px');
							} else if (cl < exResult && l > exResult) {// for Low Value Check
							
								$('#flagId' + id3).text("L");
								$('#flagId' + id3).css('color', 'orange');
								$('#flagId' + id3).css('font-size', '14px');
							}  else if (ch >= exResult && h <= exResult) {// for High Value// Check
								
								$('#flagId' + id3).text("H");
								$('#flagId' + id3).css('color', 'orange');
								$('#flagId' + id3).css('font-size', '14px');
							}else if (exResult >= nl && exResult <= cl) {// for critical Low// Value Check
								$('#flagId' + id3).text("CL");
								$('#flagId' + id3).css('color', 'red');
								$('#flagId' + id3).css('font-size', '14px');
							}  else if (nh >= exResult && ch <= exResult) {// for critical High// Value Check
								
								$('#flagId' + id3).text("CH");
								$('#flagId' + id3).css('color', 'red');
								$('#flagId' + id3).css('font-size', '14px');
							} else if (exResult > nh) {// for critical High Value Check
								
								$('#flagId' + id3).text("NE");
								// $('#flagId'+id3).text("");
								$('#flagId' + id3).css('color', 'black');
								$('#flagId' + id3).css('font-size', '14px');
								alertify.error("Test Result Not Exist High!");
								//$('#testresultt'+id3).focus();
							} else{
								$('#flagId' + id3).text("Negative");
								$('#flagId' + id3).css('color', 'green');
								$('#flagId' + id3).css('font-size', '14px');
								alertify.success("Test Result Is Negative!");
							}
					}
			}	
			
		}

	}
}

/*********************************************************
 * @author Kishor Lokhande
 * @date 04_Feb_2020
 * @Code This function is use to Set defaoult routine Value.
 *********************************************************/
function setDefaultRoutineValue(treatmentId){
	var mId=$('#masterIdd').val();
	var patientType=$('#patientgander').val();
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"masterid" : mId,
			"treatmentid" : treatmentId,
			"patientType" : patientType	
		},
		url : "ehat/phlebotomy/getRoutinevalueResutl",
		success : function(r) {        	
			if (r.proLi.length == 0 || r.proLi.length == null) {

			} else {
				for ( var pk = 0; pk < r.proLi.length; pk++) {
					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						if (r.proLi[pk].testli[ts].tid != 0) {
							var id3 = (pk + 1) + "" + (ts + 1);
							var quantitative=r.proLi[pk].testli[ts].quantitative ;
							var expression = r.proLi[pk].testli[ts].expression;
							
							if (expression == null || expression == "null") {
								expression = " ";
								
							} else {
								expression = r.proLi[pk].testli[ts].expression;
							}
							
							var expressionConvert="";
							if(expression == ">"){
								expressionConvert = "gt";
							}else if(expression == "<"){
								expressionConvert = "lt";
							}else if(expression == ">="){
								expressionConvert = "gte";
							}else if(expression == "<="){
								expressionConvert = "lte";
							}
							
							//alert($('#defaultvalue'+id3).val());
							if (r.proLi[pk].testli[ts].lowvalue!=null) {							   
							    $('#testresultt' + id3).val($('#defaultvalue' + id3).val());								
							}else
							{  
								var testresult="-";
								$('#testresultt'+ id3).val(testresult);
							}	
							setFlagOfCritical((pk + 1), (ts + 1),quantitative,expressionConvert);
						}
					}
				}
			}
		}
    });  
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for change Status Of LabReport 
**********************************************************/
function changeStatusOfLabReport(id){
	
	var checkedMasterIds = [];
	//var profileSerialNumbers = [];
	
	$('input[name=profileCheckboxId]:checked').each(function(){
		var checkedValues = this.value;
		var data = checkedValues.split("-");
		checkedMasterIds.push(data[0]);
		//profileSerialNumbers.push(data[1]);
	});

	var masterIdd = checkedMasterIds.join();
	
	var masterIdd1 = $("#masterIdd").val();
	var statusFlag=$("#"+id).val();
	
	jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		masterIdd : masterIdd,
    		statusFlag : statusFlag
		},
		url : "ehat/phlebotomy/changeStatusOfTest",
        success : function(r) {
			  if (statusFlag == "AP") {
				alertify.success("Back To Accession Successfully");
				window.location.replace("pathology_accession.jsp");
			} else if (statusFlag == "AAP"){
				alertify.success("POST Successfully");
				window.location.replace("pathology_authorizatioin.jsp");
			}
        }
    });
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for print Routine Value Result with  header
**********************************************************/
function printRoutineValueResultW(){
	var treatmentId=$("#treatmentID").val();
	var masterIdd=$("#masterIdd").val();
	var gender=$("#patientgander").val();
	var patientName=$("#patientName").text();
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	var profileId= $("#pId").val();

	var inputs = [];
	// inputs.push('treatmentId=' + treatmentId);
	inputs.push('masterId=' + masterIdd);
	var str = inputs;
	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/savePDFCount",
		error : function() {
			alert("error");
		},
		success : function(r) {
			console.log("ajax call exectued")
		}
	});

	var meeshaFlow=$("#meeshaFlow").val();
	var mobileAuth= $("#mobileAuth").val();
	var hospitalname=$("#hospitalname").val();
	
	/*
	if(meeshaFlow == "off" && Siddhivinayak == "off") {
		
	if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)
		{
			window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	
		}else
		{
			window.open("pathology_routineValueResultWLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	
		}	
	}else if(Siddhivinayak == "on" && meeshaFlow == "off"){
		
			window.open("pathology_routineValueResultWLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	
		
	}
	else{
		if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)
		{
			window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	
		}else
		{
		//	window.open("pathology_routineValueResultWLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
		}
	}*/
	
	if(hospitalname == "Meesha"){
		window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else if(hospitalname == "Siddhivinayak"){
		window.open("pathology_routineValueResultWLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else{
		window.open("pathology_routineValueResultWLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}
}

/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for print Routine Value Result with out header
**********************************************************/
function printRoutineValueResult(){
	var treatmentId=$("#treatmentID").val();
	var masterIdd=$("#masterIdd").val();
	var gender=$("#patientgander").val();
	var patientName=$("#patientName").text();
	
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();

	var profileId= $("#pId").val();

	var inputs = [];
	inputs.push('masterId=' + masterIdd);
	var str = inputs;
	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/savePDFCount",
		error : function() {
			alert("error");
		},
		success : function(r) {
			console.log("ajax call exectued")
		}
	});
	var meeshaFlow=$("#meeshaFlow").val();
	var mobileAuth= $("#mobileAuth").val();
	var hospitalname=$("#hospitalname").val();
	
	/*
	if(meeshaFlow == "off" && Siddhivinayak == "off") {
		if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)
		{
			window.open("pathology_routineValueResultPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
		}else
		{		
			window.open("pathology_routineValueResultLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
		}
	}else if(Siddhivinayak == "on" &&   meeshaFlow == "off"){
		window.open("pathology_routineValueResultLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}
	else{
		if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)
		{
			window.open("pathology_routineValueResultPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
		}else
		{		
			//window.open("pathology_routineValueResultLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName));
		}
	}*/
	
	
	if(hospitalname == "Meesha"){
		window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName));
	}else if(hospitalname == "Siddhivinayak"){
		window.open("pathology_routineValueResultLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else{
		window.open("pathology_routineValueResultLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}
}
/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for print Routine Value Result In reporting
**********************************************************/
function reportingprintRoutineValueResult(treatmentId,masterIdd,gender,idtt,profileId){
	var patientName= $("#patientnamee"+idtt).val();
	var patientName1=patientName.split(".");
	
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();

	var inputs = [];
	inputs.push('masterId=' + masterIdd);
	var str = inputs;
	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/savePDFCount",
		error : function() {
			alert("error");
		},
		success : function(r) {
			console.log("ajax call exectued")
		}
	});
	var meeshaFlow=$("#meeshaFlow").val();
	var mobileAuth= $("#mobileAuth").val();
	var hospitalname=$("#hospitalname").val();
	
	/*
	if(meeshaFlow == "off" && Siddhivinayak== "off") {
	if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId){ 
		
		
		if($("#withheader").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			window.open("pathology_routineValueResultWLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}	
		
	}else if(meeshaFlow == "off" && Siddhivinayak == "on" ){
		if($("#withheader").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			window.open("pathology_routineValueResultWLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}	
	}
	else{
		if($("#withheader").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			window.open("pathology_routineValueResultWLab_PDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}	
		
		if($("#withgraph").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_graph.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
		if($("#singlegraphRecord").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_trend_single_record.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
	}
	
	}else{

		if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId){ 
			//alert("dddddddddd");
			if($("#withheader").is(":checked")){
				//window.open("pathology_routineValueResultPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
				//window.open("pathology_routineValueResultLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
				window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}
			if($("#withoutheader").is(":checked")){
				//window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
				window.open("pathology_routineValueResultWLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			}	
			
		}else if(meeshaFlow == "off" && Siddhivinayak == "on" ){
			if($("#withheader").is(":checked")){
				window.open("pathology_routineValueResultLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}
			if($("#withoutheader").is(":checked")){
				window.open("pathology_routineValueResultWLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}	
		}
		else{
			if($("#withheader").is(":checked")){
				//window.open("pathology_routineValueResultLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
				window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}
			if($("#withoutheader").is(":checked")){
				//window.open("pathology_routineValueResultWLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
				window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
			}	
			
			if($("#withgraph").is(":checked")){
				window.open("pathology_routineValueResultLab_PDF_meesha_graph.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			}
			
			if($("#singlegraphRecord").is(":checked")){
				window.open("pathology_routineValueResultLab_PDF_meesha_trend_single_record.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			}
			
		}
		
		
	}
	*/
	
	if(hospitalname == "Meesha"){
		
	
		if($("#withheader").is(":checked")){
			//window.open("pathology_routineValueResultLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			//window.open("pathology_routineValueResultWLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
		}
		
		if($("#withgraph").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_graph.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
		if($("#singlegraphRecord").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_trend_single_record.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
	
	}else if(hospitalname == "Siddhivinayak"){
		if($("#withheader").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			window.open("pathology_routineValueResultWLab_PDF_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		
		if($("#withgraph").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_graph.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
		if($("#singlegraphRecord").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_trend_single_record.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
	}else{
			if($("#withheader").is(":checked")){
				//window.open("pathology_routineValueResultLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
				window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}
			if($("#withoutheader").is(":checked")){
				//window.open("pathology_routineValueResultWLab_PDF_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
				window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
			}
			
			if($("#withgraph").is(":checked")){
				window.open("pathology_routineValueResultLab_PDF_meesha_graph.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			}
			
			if($("#singlegraphRecord").is(":checked")){
				window.open("pathology_routineValueResultLab_PDF_meesha_trend_single_record.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
			}
	}
	
}
/********************************************************
* @author Ajay s khandare
* @since 12-03-2020
* @comment for open pop up email reporting Test 
*********************************************************/
function emailReportingTestPatient(id,treatmentId,masterIdd,eId,pName,gender,reportingPid){	
	/*var patientNameEmail= $("#patientnamee"+id).val();
	var emailId= $("#emailId"+id).val();*/
	
	var pNamee = pName.replace("_"," ");
	var patientNameEmail=pNamee;
	var emailId= eId;
	
	// alert(patientNameEmail);
	$("#patientNameemail").html(patientNameEmail);
	$("#emailTo").val(emailId);
	$("#treatmentID").val(treatmentId);
	$("#masterIdd").val(masterIdd);
	$("#patientgander1").val(gender);
	$("#reportingPid").val(reportingPid);
	
    var r = confirm("Are You Sure You Want To Email this Tests ?");
    if (r == true) {   		
    	$("#emailreportingPopUp").modal('show'); 		   		
    }
}
/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for  email Sending Hide Popup PatinetTest
**********************************************************/
function emailSendingHidePopupPatinetTest()
{
	$("#emailreportingPopUp").modal('hide');  
	$("#patientNameemail").val('');
}
/*********************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for print email Sending Patinet Test reporting
**********************************************************/
function emailSendingPatinetTest()
{
	var treatmentId = $("#treatmentID").val();
	var masterIdd = $("#masterIdd").val();
	var gender = $("#patientgander1").val();
	var reportingPid = $("#reportingPid").val();

	
	var patientName = $("#patientNameemail").text();
	
	var emailTo = $("#emailTo").val();
	if(emailTo == "null" ||emailTo==null ||emailTo==undefined || emailTo=="" ) {
		alert("Please Enter Email ID");
		return false;
	}
	/*if (emailTo != "") {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2-3})+$/;
		if (emailTo != "") {
			if (emailTo.match(mailformat)) {
				// return true;
			} else {
				alert("You have entered an invalid email address!");
				return false;
			}
		}
	}*/
	
	
    var array = emailTo.split(",");		
	for (var i=0;i<array.length;i++){	    
		//alert(array[i]);	     
	     if (array[i] != "") {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (array[i] != "") {
				if (array[i].match(mailformat)) {
					// return true;
				} else {
					alert("You have entered an invalid TO email address!");
					return false;
				}
			}
		}
	     
	}
	
	var emailCC = $("#emailCC").val();
	
	 var array1 = emailCC.split(",");		
		for (var i=0;i<array1.length;i++){	    
			//alert(array[i]);	     
		     if (array1[i] != "") {
				var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (array1[i] != "") {
					if (array1[i].match(mailformat)) {
						// return true;
					} else {
						alert("You have entered an invalid CC email address!");
						return false;
					}
				}
			}
		     
		}		
	var massageId = "";
    var printtype="";
	if ($("#withheader").is(":checked")) {
		printtype="withheader";
	}
    if ($("#withoutheader").is(":checked")) {
    	printtype="withoutheader";
    }
	jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		treatmentId : treatmentId,
    		masterIdd : masterIdd,
    		gender : gender,
    		emailTo : emailTo,
    		emailCC : emailCC,
    		massageId : massageId,
    		printtype : printtype,
    		patientName : patientName,
    		reportingPid :reportingPid
		},
		url : "ehat/phlebotomy/emailSendingPatinetTest",
        success : function(r) {
        	
        		alertify.success("Email Send Successfully");
        		$("#emailTo").val('');
        		$("#emailCC").val('');
        		$("#massageId").val('');
        		$("#patientNameemail").val('');
    			$("#emailreportingPopUp").modal('hide');  
    			
		
        }
    });
}

//Added by kishor for getting collection pending result

function getB2BCollectionRecord(callfrom){
	
	var inputs = [];
	var callFrom="B2BCollection";//B2BCollection
	var patientType="Y";
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getphlebotomyRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
						for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
						if(r.labSampleWiseMasterDtoList[i].collectedFlag == "N" ){
							divContent = divContent+ '<tr style="height:2px;" >'							
							
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>"	
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>"
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"			
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].mobile +"</td>"	
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplenumber +"</td>"
							+ "<td onclick='hideShowSampleType("+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId+")' class='col-md-2 center' style='height: 21.5px;'>"
							+  "<img id='imgupdown9' src='images/down.png'>" 
							+  "<input type='hidden' value='0' id='hideShowStatus"+r.labSampleWiseMasterDtoList[i].treatmentId +"'></td></tr>"
							    
							+ "<tr id='patPreOPDBill123"+r.labSampleWiseMasterDtoList[i].treatmentId +"' style='width:100%;float:right'>" 
							+ "<td style='display:none' id='td123"+r.labSampleWiseMasterDtoList[i].treatmentId +"'>"
							+ ' <table id="ehatTable" class="datatable table  table-bordered">'
							+ '<thead id="ehatTHead">'
							+ '<tr style="background-color: lightblue;">					'								
							+ "<th style='height: 21.5px;' class='col-md-2 center'>Test</th>"
							/*+ "<th style='height: 21.5px;' class='col-md-3 center'>Barcode</th>"*/
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Container Name</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Sample Name</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Unit</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Status</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Date Time</th>"						
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Time Sensitive</th>"		
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Hold/Unhold</th>"	
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"	
							+ '</tr>'
							+ '</thead>'

							+ '<tbody id="phlebotomytabIdDD'+r.labSampleWiseMasterDtoList[i].treatmentId +'">'
							+ '</tbody>'
							+ '</table>'
							+ "</td></tr>";
					
						
				}
						
				}
						$('#phlebotomytabId').html(divContent);
		}
			
			/*var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='ti-angle-double-left'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				numberOfRows +="<li onclick='pagination("+index+", \"phlebotomy\")'><a>"+index+"</a></li>";
				index = index + 1;
			}
			if(numberOfPages > 6){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+","+Math.round(numberOfPages)+", \"phlebotomy\");'><a><i class='ti-angle-double-right' value='Next'></i></a></li>";
			}
			$('#phlebotomyNumberOfPages').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#phlebotomyPagination').html(numberOfRows);*/
		}
	});
}


function getB2BCollectedRecord(callfrom){
	var inputs = [];
	var callFrom="B2BCollection";//B2BCollection
	var patientType="Y";
	inputs.push('patientType=' + patientType);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getphlebotomyRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
						for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
						if(r.labSampleWiseMasterDtoList[i].collectedFlag == "Y" ){
							divContent = divContent+ '<tr style="height:2px;" >'							
							
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>"	
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>"
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"			
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].mobile +"</td>"	
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplenumber +"</td>"
							+ "<td onclick='hideShowSampleType("+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId+")' class='col-md-2 center' style='height: 21.5px;'>"
							+  "<img id='imgupdown9' src='images/down.png'>" 
							+  "<input type='hidden' value='0' id='hideShowStatus"+r.labSampleWiseMasterDtoList[i].treatmentId +"'></td></tr>"
							    
							+ "<tr id='patPreOPDBill123"+r.labSampleWiseMasterDtoList[i].treatmentId +"' style='width:100%;float:right'>" 
							+ "<td style='display:none' id='td123"+r.labSampleWiseMasterDtoList[i].treatmentId +"'>"
							+ ' <table id="ehatTable" class="datatable table  table-bordered">'
							+ '<thead id="ehatTHead">'
							+ '<tr style="background-color: lightblue;">					'								
							+ "<th style='height: 21.5px;' class='col-md-2 center'>Test</th>"
							/*+ "<th style='height: 21.5px;' class='col-md-3 center'>Barcode</th>"*/
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Container Name</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Sample Name</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Unit</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Status</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Date Time</th>"						
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Time Sensitive</th>"		
							
							+ '</tr>'
							+ '</thead>'

							+ '<tbody id="phlebotomytabIdDD'+r.labSampleWiseMasterDtoList[i].treatmentId +'">'
							+ '</tbody>'
							+ '</table>'
							+ "</td></tr>";
					
						
				}
						
				}
						$('#phlebotomytabId').html(divContent);
		}		
		}
	});
}
/********************************************************
* @author Ajay s khandare
* @since 26-03-2020
* @comment for get rejected In profile Test In Routine value 
*********************************************************/
function rejectedInprofiletestInRoutinevalue(id)
{
	var callfrom = $("#" + id).val();
	var r = "";
	var treatmentId = $("#treatmentIddd").val();
	;
	var masterid = "";
	var profileid = "";
	var testid = "";
	var testflag = "";
	var reason = "";
	idList = [];

	masterid = $("#masterid1").val();
	profileid = $("#profileid1").val();
	testid = $("#testid1").val();
	testflag = $("#testflag1").val();
	callfrom = "";

	if (testflag == "N") {
		reason = $("#rejectresion").val();
	} else if (testflag == "Y") {
		reason = $("#unrejectresion").val();
	}

	if(reason == "0"){
		alert("Please choose reason first.");
		return false;
	}
	
	if (testflag == "N") {
		r = confirm("Are You Sure You Want To Reject this Test ?");
	} else if (testflag == "Y") {
		r = confirm("Are You Sure You Want To Unreject this Test ?");
	}
	if (r == true) {
		var inputs = [];
		inputs.push('masterid=' + encodeURIComponent(masterid));
		inputs.push('profileid=' + encodeURIComponent(profileid));
		inputs.push('testid=' + encodeURIComponent(testid));
		inputs.push('testflag=' + encodeURIComponent(testflag));
		inputs.push('rejectedResion=' + encodeURIComponent(reason));
		inputs.push('callfrom=' + encodeURIComponent(callfrom));
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/phlebotomy/rejectedInprofiletest",
			data : str + "&reqType=AJAX",
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if (testflag == "N") {
					alertify.error("Reject Test Successfully");
					$("#rejectedTestPopUpInProcessing").modal('hide');
				} else if (testflag == "Y") {
					alertify.success("UnReject Test Successfully");
					$("#UnrejectedTestPopUpInProcessing").modal('hide');
				}
				getProcessingRoutinevalueResutl(treatmentId);
				//getOutSourceRoutinevalueResutl(treatmentId);
			}
		});
	}
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 26-03-2020
 * @comment In Reject Sample BackToAccession And Delete change flag
 ******************************************************************************/
function InRejectSampleBackToAccessionAndDelete(id) {
	var callfrom=$("#"+id).val();
	idList = [];
	var currentId;
	$("#rejectedSampleTabId").find('input[name="rejectedtestId"]').each(function() {
		if ($(this).is(":checked")) {
		currentId = $('#' + this.id).val();
			if (currentId != 0) {
				idList.push(currentId);
			} 
		}
	});
	
	idList = idList.join('-');
	
	var recollectionReason = $("#recollectionreasonId").val();
	if (recollectionReason == "" || recollectionReason == null	|| recollectionReason == undefined || recollectionReason == "0") {
		alert("please select Test Reason");
		return false;
	}
		
	if(idList.length > 0){	
		var r="";
		if(callfrom=="ReCollection")
			{
	    	 r = confirm("Are You Sure You Want To Re-Collect this Sample ?");	
			}else{				
		     r = confirm("Are You Sure You Want To Delete this Sample ?");
			}
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(idList));
    		inputs.push('remarks=' + encodeURIComponent(recollectionReason));
    		inputs.push('callfrom=' + encodeURIComponent(callfrom));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/phlebotomy/AccessionpatientTestRejectAndAcccepted",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alertify.success(r);   				
    				/*getAccessionRejectedRecord('AR');
					getCountOfTabs();*/
    				searchLabTestPatient("accessionTestSearchBtn");
					$('#rejectedpopupRejectSampleTab').modal("hide");					
    			}
    		});
    	}
	}	
}
/********************************************************
* @author Ajay s khandare
* @since 26-03-2020
* @comment for show popup reject test with Profile Record 
*********************************************************/
function showRejectedprofileandTest(tabflag)
{
	if (tabflag == "allrecord") {
		idList = [];
		var sampleTypeIds = [];
		$("#accessionRecordTableBody").find('input[name="testid"]').each(
				function() {
					if ($(this).is(":checked")) {
						currentId = $('#' + this.id).val();
						if (currentId != 0) {
							idList.push(currentId);
							
							var mId = currentId.replace(/,/g, '_');
							sampleTypeIds.push($("#allSampleTypeId"+mId).val());
						}
					}
				});

		if (idList.length == 0) {
			alert("Please Select at least One Sample/Test!");
			return false;
		} else {
			$("#rejectedpopupAllTab").modal('show');
			getTestReasonname("R", sampleTypeIds.toString());
		}
	} else if (tabflag == "accessionPending") {	
		idList = [];
		var sampleTypeIds = [];
		$("#accessionPendingTabId").find('input[name="testidAP"]').each(
				function() {
					if ($(this).is(":checked")) {
						currentId = $('#' + this.id).val();
						if (currentId != 0) {
							idList.push(currentId);
							
							var mId = currentId.replace(/,/g, '_');
							sampleTypeIds.push($("#apSampleTypeId"+mId).val());
						}
					}
				});

		if (idList.length == 0) {
			alert("Please Select at least One Sample/Test!");
			return false;
		} else {
			$("#rejectedpopupAccessionPendingTab").modal('show');
			getTestReasonname("R", sampleTypeIds.toString());
		}
	}else if (tabflag == "rejectedSampleTab") {
		idList = [];
		var sampleTypeIds = [];
		$("#rejectedSampleTabId").find('input[name="rejectedtestId"]').each(function() {
			if ($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if (currentId != 0) {
					idList.push(currentId);
					
					var mId = currentId.replace(/,/g, '_');
					sampleTypeIds.push($("#arSampleTypeId"+mId).val());
				} 
			}
		});

		if (idList.length == 0) {
			alert("Please Select at least One Sample/Test!");
			return false;
		} else {
			$("#rejectedpopupRejectSampleTab").modal('show');
			getTestReasonname("C", sampleTypeIds.toString());
		}
	}
}

/******************************************************************************
 * @author Ajay s khandare
 * @since 26-03-2020
 * @comment for hide popup reject test with Profile Record
 ******************************************************************************/
function hideRejectedprofileandTest(tabflag)
{
	if (tabflag == "allrecord") {
		$("#rejectedpopupAllTab").modal('hide');
	} else if (tabflag == "accessionPending") {
		$("#rejectedpopupAccessionPendingTab").modal('hide');
	} else if (tabflag == "rejectsample") {
		$("#rejectedpopupRejectSampleTab").modal('hide');
	}
}

/******************************************************************************
 * @author Ajay khandare
 * @since 26-03-2020
 * @comment for Validate only numbers
 ******************************************************************************/
function validatenumericeAndAplhaNumerice(key, pervision) {
	//alert(pervision);
	 if (pervision == "1") {
		var keycode = (key.which) ? key.which : key.keyCode;
		if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
				|| keycode == 127 || keycode == 13 || keycode == 46
				|| (keycode > 34 && keycode < 41)) {

			return true;
		} else {
			alert("Please Enter Numeric Only!");
			return false;
		}
	} else if(pervision == "3"){
		var keycode = (key.which) ? key.which : key.keyCode;
		if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
				|| keycode == 8 || keycode == 9 || keycode == 127 || keycode == 13
				|| (keycode > 34 && keycode < 41)) {
			return true;
		} else {
			alert("Please Enter Alphabets Only!");
			return false;
		}
	}else
	{
		
	}	
};
/********************************************************
* @author Ajay s khandare
* @since 26-03-2020
* @comment for open pop up for reject test with Profile Record in processing area 
*********************************************************/
function showrejectedtestInProcessingArea(masterid,profileid,testid,testflag,sampleTypeId){	
	$("#masterid1").val(masterid);
	$("#profileid1").val(profileid);
	$("#testid1").val(testid);
	$("#testflag1").val(testflag);
	
	if(testflag == "N") {		
		$("#rejectedTestPopUpInProcessing").modal('show');
		getTestReasonname("R", sampleTypeId);
	}else if (testflag == "Y")  {	
		$("#UnrejectedTestPopUpInProcessing").modal('show');	
		getTestReasonname("U", sampleTypeId);
	}else{			
		$("#reCollectionPopUp").modal('show');
		getTestReasonname("C", profileid);
	}   	   	
}
/*******************************************************************************
 * @author Ajay s khandare
 * @since 26-03-2020
 * @comment for hide popup reject test with Profile Record in processing area
 ******************************************************************************/
function hiderejectedtestInProcessingArea(){
	var testflag = $("#testflag1").val();
	
	if(testflag == "N") {
		$("#rejectedTestPopUpInProcessing").modal('hide');
	} else if (testflag == "Y") {
		$("#UnrejectedTestPopUpInProcessing").modal('hide');
	}else{
		$("#reCollectionPopUp").modal('hide');
	}
}
/********************************************************
* @author Ajay s khandare
* @since 26-03-2020
* @comment for open pop up for worlist button click test with Profile Record in processing area 
*********************************************************/
function showWorklistPopupInProcessingArea(){
   $("#worklistpopup").modal('show');
   getdepartmentname();
   getdepartmentWiseWorkList();
}

/********************************************************
* @author Ajay s khandare
* @since 26-03-2020
* @comment for Hide pop up for worlist button click test with Profile Record in processing area 
*********************************************************/
function hideWorklistPopupInProcessingArea(){
   $("#worklistpopup").modal('hide');
}
/*********************************************************
 * @author Ajay khandare
 * @date 26-03-2020
 * @Code This function is use to  get Department name.
 *********************************************************/
function getdepartmentname() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/phlebotomy/getdepartmentname",
		success : function(r) {
			setdepartmentname(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 26-03-2020
 * @Code This function is use to set departmen name.
 *********************************************************/
function setdepartmentname(r){
	
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.labSampleWiseMasterDtoList.length; int++) {
		list=list+'<option value="'+(r.labSampleWiseMasterDtoList[int].headingId)+'">'+(r.labSampleWiseMasterDtoList[int].headingname)+'</option>';		
	}	
	$("#Iddepartment").html(list);	
	$("#Iddepartment").select2();	
}
/*********************************************************
 * @author Ajay khandare
 * @date 26-03-2020
 * @Code This function is use to get departmentWise WorkList
 *********************************************************/
function getdepartmentWiseWorkList()
{
	var Iddepartment = $("#Iddepartment").val();
	var inputs = [];
	inputs.push('Iddepartment=' + encodeURIComponent(Iddepartment));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getdepartmentWiseWorkList",
		error : function() {
			alert("error");
		},
		success : function(r) {				
			exportToExcelDateInProcessingTab(r);
		}		
	});
}


/****************************************************
 * @author Ajay khandare
 * @since  2-03-2020
 * @comment for get Processing Record patient export to excel option
****************************************************/
function exportToExcelDateInProcessingTab(r) {
	var masterModuleBody = "";
	
	if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
		masterModuleBody = masterModuleBody
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	} else {
	for ( var int = 0; int < r.labSampleWiseMasterDtoList.length; int++) {
		
		var datetime= new Date(r.labSampleWiseMasterDtoList[int].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
		masterModuleBody = masterModuleBody
				+
				'<tr>'
				+ '<td id="row'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (int + 1)
				+ '</td>'
				+ '<td id="patientId'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.labSampleWiseMasterDtoList[int].patientId)
				+ '</td>'
				
				+ '<td id="barCode'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.labSampleWiseMasterDtoList[int].barCode)
				+ ' </td>'
				
				+ '<td id="patientname'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.labSampleWiseMasterDtoList[int].patientname)
				+ ' </td>/tr>';

			

			/*	+ '<td id="barCode'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.labSampleWiseMasterDtoList[int].barCode)
				+ ' </td><
*/
			/*	+ '<td id="datetime'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '" class="col-md-1 center">'
				+ datetime
				+ ' </td>'
				
				+ '<td id="sampleTypeId'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '" class="col-md-1 center">'
				+ (r.labSampleWiseMasterDtoList[int].sampleTypeId)
				+ ' </td>'

				+ '<td id="docname'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '" class="col-md-1 center">'
				+ (r.labSampleWiseMasterDtoList[int].docname)
				+ ' </td>'

				+ '<td id="profileName'
				+ (r.labSampleWiseMasterDtoList[int].masterId)
				+ '" class="col-md-1 center">'
				+ (r.labSampleWiseMasterDtoList[int].profileName)
				+ ' </td>'
		          
		        + '<td id="headingname'
		        + (r.labSampleWiseMasterDtoList[int].masterId)
	         	+ '" class="col-md-1 center">'
		        + (r.labSampleWiseMasterDtoList[int].headingname)
		        + ' </td></tr>';*/	
	}
	}
	$("#worklistpopupId").html(masterModuleBody);
}
/*********************************************************
 * @author Ajay khandare
 * @date 26-03-2020
 * @Code This function is use to get TreatmentId List.
 *********************************************************/
function getTreatmentIdList(patientId) {
	//var patientId = $("#patientId").val();
	var inputs = [];
	inputs.push('patientId=' + encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getTreatmentIdList",
		error : function() {
			alert("error");
		},
		success : function(r) {				
			setTreatmentIdList(r);
		}		
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 26-03-2020
 * @Code This function is use to set departmen name.
 *********************************************************/
function setTreatmentIdList(r){
	var tretId=$("#treatmentId").text();//Added by kishor
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.labSampleWiseMasterDtoList.length; int++) {
		if(tretId !=r.labSampleWiseMasterDtoList[int].treatmentId){//Added by kishor for ignore current tid
			list=list+'<option value="'+(r.labSampleWiseMasterDtoList[int].treatmentId)+'">'+(r.labSampleWiseMasterDtoList[int].treatmentId)+'</option>';		
		}
	}	
	$("#tId").html(list);	
	$("#tId").select2();	
}

/*********************************************************
 * @author Ajay khandare
 * @since 06-04-2020
 * @Code This function is use to get TreatmentId List.
 *********************************************************/
function getTreatmentIdwiseRoutineValueResult() {
    var tId = $("#tId").val();
  
    if(tId==0)
    {     var treatmentID = $("#treatmentId").text();
    	  getProcessingRoutinevalueResutl(treatmentID);
    }else{
	var inputs = [];
	inputs.push('tId=' + encodeURIComponent(tId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getTreatmentIdwiseRoutineValueResult",
		error : function() {
			alert("error");
		},
		success : function(r) {		
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
				for ( var pk = 0; pk < r.proLi.length; pk++) {
		        
				html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
				html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
				html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";
			
				var testidcheck=[];
				for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
					//alert(testidcheck);
					if (r.proLi[pk].testli[ts].testId != 0) {
						
						if(testidcheck.length == 0){
							isTestIdAbsent = true;
						}
						for ( var ts1 = 0; ts1 < testidcheck.length; ts1++) {
							
							if(testidcheck[ts1] == r.proLi[pk].testli[ts].testId){
								isTestIdAbsent = false;
								
								break;
							}
						}
						if(isTestIdAbsent)
							testidcheck[testidcheck.length] = r.proLi[pk].testli[ts].testId;
						
						if(isTestIdAbsent){
							
							
								    var a=r.proLi[pk].testli[ts].lowvalue +"-"+r.proLi[pk].testli[ts].highvalue+"-"+r.proLi[pk].testli[ts].unitname;
								    if(r.proLi[pk].testli[ts].highvalue!=null || r.proLi[pk].testli[ts].unitname!=null){
										a=r.proLi[pk].testli[ts].lowvalue +"-"+r.proLi[pk].testli[ts].highvalue;
									}else if(r.proLi[pk].testli[ts].lowvalue!=null) {
										 a=r.proLi[pk].testli[ts].lowvalue;
									}else
										{
										a="-";
										}
								    
								    html = html + "<tr style='height:25px'>" ;	
									
									html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testName)+"("+r.proLi[pk].profileName+")"+"</td>";
									html = html + "<td id='trendanalysiId' class='center' style='font-weight: bold;'><input type='hidden' id='testnamehidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].testName+"'/><input type='hidden' id='unitnamehidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].unitname+"'/><input type='hidden' id='testIdhidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].testId+"'/><input type='button' class='btn btn-xs btn-success' id='analysisIdTest' value='Analysis' onclick=showTreanAnalysisTest("+(pk+1)+(ts+1)+") ></td>";
									html = html + "<td id='gretherId' class='center' style='font-weight: bold;'><input id='gretherId" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";

									if (r.proLi[pk].testli[ts].testresult == "-" || r.proLi[pk].testli[ts].testresult == null || r.proLi[pk].testli[ts].testresult == "" || r.proLi[pk].testli[ts].testresult == "null") {
																	
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled' value=''></td>";	
	
										}else
											{
											html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	

											}

									} else {
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
											{
											 html = html + "<td id='testresultt'  class='center'><input disabled='disabled' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testresult)+"'></td>";	

											}else
												{
											html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testresult)+"'></td>";	

											}

									}
													
									html = html + "<td id='normalId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+a+"</td>";		
									
									
									if (r.proLi[pk].testli[ts].flagmark == "-" || r.proLi[pk].testli[ts].flagmark == null || r.proLi[pk].testli[ts].flagmark == "" || r.proLi[pk].testli[ts].flagmark == "null")
									{						
										html = html + "<td id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'></td>";		
									}else
									{
										var color="";
										if(r.proLi[pk].testli[ts].flagmark == "N"){
											color="green";
										}else if(r.proLi[pk].testli[ts].flagmark == "L" || r.proLi[pk].testli[ts].flagmark == "H"){
											color="orange";
										}else if(r.proLi[pk].testli[ts].flagmark == "CL" || r.proLi[pk].testli[ts].flagmark == "CH"){
											color="red";
										} 
										html = html + "<td id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;color:"+color+"'>"+(r.proLi[pk].testli[ts].flagmark)+"</td>";		
									}
																	
									html = html + "<td id='methodId' class='center'>"+(r.proLi[pk].testli[ts].methodename)+"</td>";				
									
									
									if (r.proLi[pk].testli[ts].testreason == "-" || r.proLi[pk].testli[ts].testreason == null || r.proLi[pk].testli[ts].testreason == "" || r.proLi[pk].testli[ts].testreason == "null")
									{						
										   
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											  html = html + "<td id='reasionid' class='center'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text' disabled='disabled'  value=''></td>";	

										}else											
										{
											  html = html + "<td id='reasionid' class='center'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	

										}	
									}else
									{
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											html = html + "<td id='reasionid' class='center' style='font-weight: bold;'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled'  value='"+(r.proLi[pk].testli[ts].testreason)+"'></td>";							

										}else
											{
											html = html + "<td id='reasionid' class='center' style='font-weight: bold;'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testreason)+"'></td>";							

											}
									}	
									if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
									{
									    html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-success' id='cancleidpro' value='UnReject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\') ></td>";							
									}else
									{
										html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-danger' id='cancleidpro' value='Reject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\')></td>";								
									}
									html = html + "<td><input class='center' id='testidCheckbox"+ (pk+1) + (ts+1) +"' name='testidCheckbox'  type='checkbox' value="+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\'></td>";								

									html = html + "<input type='hidden' value='"+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' id='pkgIdproIdtestId"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].rejecttestflag)+"' id='rjflag"+ (pk+1) + (ts+1) +"' />";									
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].nonexistlow)+"' id='nl"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].labcl)+"' id='cl"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].lowvalue)+"' id='l"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].highvalue)+"' id='h"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].labch)+"' id='ch"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].nonexisthigh)+"' id='nh"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].defaultvalue)+"' id='defaultvalue"+ (pk+1) + (ts+1) +"' />";			
								
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].objFormula)+"' id='formulaForTest"+ (pk+1) + (ts+1) +"' />";									
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].testName)+"' id='nameOfTest"+(pk+1) + (ts+1)+"' />";

									
									html = html + "<input type='hidden' value='"+r.proLi[pk].testli.length +"' id='reportTestCount"+ (pk+1) + (ts+1) +"' />";									

									/*html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
									html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";*/
									
					}
				}
				}	

			}
				$("#itemMasterRecordsList").html(html);
			}			
			$('#routinevaluedivId').find('input, button, select').attr('disabled', 'disabled'); 
			$('#btndivId').find('input, button, select').attr('disabled', 'disabled'); 
			$('#reCollectionDivId').find('input, button, select').attr('disabled', 'disabled'); 
			$('#rejectDivId').find('input, button, select').attr('disabled', 'disabled'); 
			
        }		
	});
	
    }
}

/*********************************************************
 * @author Ajay Khandare
 * @since 06-04-2020
 * @comment for print get department Wise WorkList
**********************************************************/
function getdepartmentWiseWorkListPrint()
{
   var Iddepartment = $("#Iddepartment").val();
   var tratmentId11 = $("#tratmentId11").val();
   window.open("pathology_departmentwise_worklist_Print.jsp?"+"&treatmentId=" + encodeURIComponent(tratmentId11)+"&Iddepartment="+ encodeURIComponent(Iddepartment));	
}

/*********************************************************
* @author Ajay s khandare
 * @since 08-04-2020
* @comment for get PhlebotomyRecord Test 
***********************************************************/
function getAllRecollectionRequestBToBAndBToC(id){
	var emergencyFlag = $("#emergencyFlag").val();
	
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getAllRecollectionRequestBToBAndBToC",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var tabId = "";
			if(id == "allBToB")
				tabId = "ALBToB";
			else if(id == "ARBToB")
				tabId = "rejectedSampleBToB";
			else if(id == "PRBToB")
				tabId = "pathoRecollectionBToB";
			else if(id == "allBToC")
				tabId = "ALBToC";
			else if(id == "ARBToC")
				tabId = "rejectedSampleBToC";
			else if(id == "PRBToC")
				tabId = "pathoRecollectionBToC";
			
			setPatientTemp(r, "BTOBRecollection", tabId);
				
			if(id == "allBToB"){
				var numberOfRows = "";
				var index = 1;
				var count = r.rowCount;
				var numberOfPages = (count/10);
				var displayPagination = numberOfPages;			
				
				if(numberOfPages > 5){
					numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
					displayPagination=5;
				}
				for(var j = 0; j < displayPagination; j++){
					if(j == 0){
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"allBToB\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"allBToB\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"allBToB\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#allBToBNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#allBToBNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allBToBPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"allBToB\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#allBToBPagination').html(numberOfRows);
			}else if(id == "ARBToB"){
				var numberOfRows = "";
				var index = 1;
				var count = r.rowCount;
				var numberOfPages = (count/10);
				var displayPagination = numberOfPages;			
				if(numberOfPages > 5){
					numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
					displayPagination=5;
				}
				for(var j = 0; j < displayPagination; j++){
					if(j == 0){
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"ARBToB\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"ARBToB\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"ARBToB\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#ARBToBNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#ARBToBNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#ARBToBJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='ARBToBPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"ARBToB\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
				$('#ARBToBPagination').html(numberOfRows);
			}else if(id == "PRBToB"){
				var numberOfRows = "";
				var index = 1;
				var count = r.rowCount;
				var numberOfPages = (count/10);
				var displayPagination = numberOfPages;			
				if(numberOfPages > 5){
					numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
					displayPagination=5;
				}
				for(var j = 0; j < displayPagination; j++){
					if(j == 0){
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"PRBToB\");'><a>"+index+"</a></li>";
					}else{
						numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"PRBToB\");'><a>"+index+"</a></li>";
					}
					index = index + 1;
				}
				if(numberOfPages > 5){
					numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"PRBToB\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				}
				if(count == 0)
					$('#PRBToBNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
				else{
					$('#PRBToBNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
					$('#PRBToBJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='PRBToBPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"PRBToB\", \"onload\", \"NA\");'>Go</button></a></li>");
				}
			$('#PRBToBPagination').html(numberOfRows);
		}else if(id == "allBToC"){
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"allBToC\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"allBToC\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"allBToC\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#allBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#allBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"allBToC\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#allBToCPagination').html(numberOfRows);
		}else if(id == "ARBToC"){
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"ARBToC\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"ARBToC\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"ARBToC\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#ARBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#ARBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#ARBToCJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='ARBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"ARBToC\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#ARBToCPagination').html(numberOfRows);
		}else if(id == "PRBToC"){
			var numberOfRows = "";
			var index = 1;
			var count = r.rowCount;
			var numberOfPages = (count/10);
			var displayPagination = numberOfPages;			
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
				displayPagination=5;
			}
			for(var j = 0; j < displayPagination; j++){
				if(j == 0){
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"PRBToC\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='pagination("+index+", "+Math.ceil(numberOfPages)+", \"PRBToC\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='nextPagination("+index+", "+Math.ceil(numberOfPages)+", \"PRBToC\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#PRBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#PRBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#PRBToCJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='PRBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"PRBToC\", \"onload\", \"NA\");'>Go</button></a></li>");
			}
			$('#PRBToCPagination').html(numberOfRows);
		}
	}
	});
}
/*********************************************************
* @author Ajay s khandare
 * @since 08-04-2020
* @comment for get testView RecollectionRequest  
***********************************************************/
function gettestViewRecollectionRequest(masterId,treatmentid,patientType){       
	    var recollectionType = $("#recollectionType").val();
		var tabType =  jQuery('#tabId').find('li.active').attr('id');	
	
		jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/gettestViewRecollectionRequest",
		data : {
			masterid : masterId,	
			treatmentid : treatmentid,
			patientType : patientType,
			recollectionType : recollectionType,
			tabType : tabType,
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setTestViewRecollectionRequest(r);
		}
	});
}
/*********************************************************
* @author Ajay s khandare
* @since 08-04-2020
* @comment for set testView RecollectionRequest  
***********************************************************/
function setTestViewRecollectionRequest(r){
	var html = "";   		
	if (r.proLi.length == 0 || r.proLi.length == null) {		
		html = html
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	} else {				
	for ( var pk = 0; pk < r.proLi.length; pk++) {				
		for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {					
			if (r.proLi[pk].testli[ts].tid != 0) {
									
	          html = html + "<tr style='height:25px'>" ;		
			  html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testName)+"("+r.proLi[pk].profileName+")"+"</td></tr>";																												
											       					
			}					
		}	
	}
	
		$("#rejectTestRecollectionpopupId").html(html);
		$('#rejectRecolletiontestPopUp').modal("show");
	}			
	
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to get tEST Reason name.
 ******************************************************************************/
function getTestReasonname(Id, sampleTypeIds) {
	var callform=Id;
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/phlebotomy/getTestReasonName",
		data    : {
			callform : callform,
			sampleTypeId : sampleTypeIds
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setTestReasonName(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to set pathologist  name.
 *********************************************************/
function setTestReasonName(r){	
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.testReasonlist.length; int++) {
		list=list+'<option value="'+(r.testReasonlist[int].idTestreason)+'">'+r.testReasonlist[int].testReasonName+' ~ '+r.testReasonlist[int].labTestSampleType.sampleName+'</option>';		
	}	
	$("#testReasonIDList").html(list);	
	$("#testReasonIDList").select2();
	
	$("#testReasonId").html(list);	
	$("#testReasonId").select2();
	
	$("#rejectresion").html(list);	
	$("#rejectresion").select2();
	
	$("#unrejectresion").html(list);	
	$("#unrejectresion").select2();
		
	$("#recollectionreasonId").html(list);	
	$("#recollectionreasonId").select2();
}


/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to get tEST Reason name.
 ******************************************************************************/
function getTestReasonnameReject(response, sampleTypeId) {
	var callform="R";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/phlebotomy/getTestReasonName",
		data    : {
			callform : callform,
			sampleTypeId : sampleTypeId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setTestReasonNameReject(response,r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to set pathologist  name.
 *********************************************************/
function setTestReasonNameReject(response, r) {

	for ( var pk = 0; pk < response.proLi.length; pk++) {
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {
			
			var list = "<option value='0'>-select-</option>";			
			for ( var int = 0; int < r.testReasonlist.length; int++) {
				list = list + '<option value="'+ (r.testReasonlist[int].idTestreason) + '">'+ (r.testReasonlist[int].testReasonName) + '</option>';
			}
						
			$("#rejectA"+(pk+1)+(ts+1)).html(list);	
			$("#rejectA"+(pk+1)+(ts+1)).select2();
			
			var rejectreason =response.proLi[pk].testli[ts].rejectreason;
			$("#rejectA"+(pk+1)+(ts+1)).select2('val',rejectreason);
			//$("#rejectA"+(pk+1)+(ts+1)).select2();
			
					
		}
	}

}

/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to get tEST Reason name.
 ******************************************************************************/
function getTestReasonnameUnReject(response, sampleTypeId) {
	var callform="U";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/phlebotomy/getTestReasonName",
		data    : {
			callform : callform,
			sampleTypeId : sampleTypeId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setTestReasonNameUnReject(response,r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to set pathologist  name.
 *********************************************************/
function setTestReasonNameUnReject(response, r) {

	for ( var pk = 0; pk < response.proLi.length; pk++) {
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {
			
			var list = "<option value='0'>-select-</option>";			
			for ( var int = 0; int < r.testReasonlist.length; int++) {
				list = list + '<option value="'+ (r.testReasonlist[int].idTestreason) + '">'+ (r.testReasonlist[int].testReasonName) + '</option>';
			}
						
			$("#cancleA"+(pk+1)+(ts+1)).html(list);	
			$("#cancleA"+(pk+1)+(ts+1)).select2();
			
			var unrejectreason =response.proLi[pk].testli[ts].unrejectreason;
			//alert(unrejectreason);
			$("#cancleA"+(pk+1)+(ts+1)).select2('val',unrejectreason);
		}
	}

}

/********************************************************************************
 * @author Ajay khandare
 * @since  15_04_2020
 * @comment for recollection Test
*******************************************************************************/
function recollectionTest(callfrom) {	
	
	var recollectionReason = $("#recollectionreasonId").val();
	if (recollectionReason == "" || recollectionReason == null	|| recollectionReason == undefined || recollectionReason == "0") {
		alert("please select Test Reason");
		return false;
	}
/*	var countcheckbox = 0;
	$.each($('#testidCheckbox:checked'), function() {
		countcheckbox++;
	});
	if (countcheckbox == 0) {
		alert("please select atleast one Test");
		return false;
	}*/
	
	
	var currentId = "";
	var phlebotomytableTestsalve = {
		pathologySampleWiseSlaveList : []
	};
	$("#itemMasterRecordsList").find('input[name="testidCheckbox"]').each(
			function() {

				if ($(this).is(":checked")) {					
					currentId = $('#' + this.id).val();
					var pkgprofiletestId=currentId.split(",");
					var masterId = pkgprofiletestId[0];
					var profileId = pkgprofiletestId[1];
					var testId = pkgprofiletestId[2];
					var testIdflag = pkgprofiletestId[3];
					phlebotomytableTestsalve.pathologySampleWiseSlaveList
							.push({
								"masterIdd" : masterId,
								"profileId" : profileId,
								"testid" : testId,
								"testflag" : testIdflag,
							});
				}
			});
	 if (phlebotomytableTestsalve.pathologySampleWiseSlaveList.length == 0) {
			alert("Please Select at least One Test!");
			return false;
		}
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var r = confirm("Are You Sure You Want To Re-Collect this Sample ?");
	if (r == true) {
		var inputs = [];
		inputs.push('recollectionList=' + encodeURIComponent(phlebotomyListTestsalve));
		inputs.push('recollectionReason=' + encodeURIComponent(recollectionReason));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/processingAreaRecollectionTest",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {				
				alertify.success("ReCollection Test Successfully");
				$("#reCollectionPopUp").modal('hide');	
				var treatmentIddd=$("#treatmentIddd").val();			
				getProcessingRoutinevalueResutl(treatmentIddd);
			}
		});
	}

}

/********************************************************
* @author Ajay s khandare
* @since 22-05-2020
* @comment for unject sample update  Record Test 
*********************************************************/
function  unjectsampleAccessionTab(callfrom,id)
{		 
    	var r = confirm("Are You Sure Want To UnReject this Tests ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(id));
    		inputs.push('callform=' + encodeURIComponent(callfrom));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/phlebotomy/unjectsampleAccessionTab",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) { 				
    				alertify.success(r);       				
    				/*getAccessionRecord('all');
    				getCountOfTabs();*/
    				searchLabTestPatient("accessionTestSearchBtn");
    			}
    		});
    	}
		
}

function displayOnPatholgistView()
{
	var pathoflag = $("#pathoflagId").val();
   	if(pathoflag=="'Y'")
		{

   		$("#saveautoriseBtn").attr({disabled:"true"});
   		$("#backtocurrentBtn").attr({disabled:"true"});		
		$('#routinevaluedivId').find('input, button, select').attr('disabled', 'disabled'); 
		$('#reCollectionDivId').find('input, button, select').attr('disabled', 'disabled'); 
		$('#rejectDivId').find('input, button, select').attr('disabled', 'disabled'); 
		$('#tratmentdivid').find('input, button, select').attr('disabled', 'disabled'); 
		$('#itemMasterRecordsList').closest("tr").find("input").attr("disabled", true);
		$('#routinevaluedivId').closest("tr").find("input").attr("disabled", true);
		
		}

}

/*********************************************************
 * @author Kishor Lokhande
* @since 16-06-2021
 * @Code This function is use to view outsoutsource test result in accesstion
 *********************************************************/
function viewOutSourceTestforResultAccesstion(masterId,patientId,treatmentId) {
	//alert(masterId);
	var r = confirm("Are you sure you want to outsource?");
	if (r == true) {
		$("#masterIdOutsource").val(masterId);
		$("#treatmentIddd").val(treatmentId);
		$("#patientIddd").val(patientId);
		
		getSampleTypeListFromTid(patientId,treatmentId);
		getAllOutLabMaster();		
		
		$("#outSourcelabpopup").modal('show');
	}else{
		$("#outSourcelabpopup").modal('hide');
	}
}

/*********************************************************
 * @author Kishor Lokhande
* @since 16-06-2021
 * @Code This method is to get Sample type list from treatment id
 *********************************************************/
function getSampleTypeListFromTid(patientId,treatmentId) {
var callFrom="";
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"patientId" : patientId,
			"treatmentId" : treatmentId,
			"callFrom" : callFrom
		},
		url : "ehat/phlebotomy/getSampleTypeListFromTid",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<select name='Sample Name' class='col-md-12'><option value='0'>--Select Sample Type--</option>";
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				divContent = divContent + "<option onclick=getProfileAndTestRecordForOutsourced('"+r.labSampleWiseMasterDtoList[i].masterId+"') value='"+ r.labSampleWiseMasterDtoList[i].masterId + "'>"+ r.labSampleWiseMasterDtoList[i].samplename + "</option>";
			}
			divContent = divContent + "</select>";					
				$("#sampleTypeId").html(divContent);
				//$("#sampleTypeId").select2();
		}
	});

	
}


/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for get Profile And Test Record Test 
*********************************************************/
function getProfileAndTestRecordForOutsourced(id){
	
	var outLabId = $("#labCenterId").val();
		jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/getProfileAndTestRecord",
		data : {
			Id : id,
			outlabId : outLabId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
				for ( var pk = 0; pk < r.proLi.length; pk++) {
			        
					html = html + "<tr style='height:25px' bgcolor='#F5F5DC'>" ;	
					html = html + "<td class='center'>"+(pk+1)+"</td>";					
					html = html + "<td id='testname' class='center'>"+(r.proLi[pk].profileName)+"</td>";
					html = html + "<td></td>";
					html = html + "<td></td>";
					html = html + "<td class='center'> <input id='masteridCheckboxOutsource"+ (pk+1) +"' name='masteridCheckboxOutsource'  class='selectallOutsource' type='checkbox' value="+r.proLi[pk].sampleWiseMasterId+"></td>";

					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						   
						if (r.proLi[pk].testli[ts].tid != 0) {
						
							html = html + "<tr style='height:25px'>" ;	
							html = html + "<td></td>";
							html = html + "<td></td>";
							html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testName)+"</td>";
							html = html + "<td id='testcode' class='center'>"+(r.proLi[pk].testli[ts].testcode)+"</td>";
							html = html + "<td></td>";										
														       					
						}
					}	
				}
			}	
			$("#outsourceTestTableBody").html(html);
		}
	});
}

function setProfileForLab(){
	
	var outLabId = $("#labCenterId").val();
	var sampleTypeId = $("#sampleTypeId").val();
		jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/getProfileAndTestRecord",
		data : {
			Id : sampleTypeId,
			outlabId : outLabId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
				for ( var pk = 0; pk < r.proLi.length; pk++) {
			        
					html = html + "<tr style='height:25px' bgcolor='#F5F5DC'>" ;	
					html = html + "<td class='center'>"+(pk+1)+"</td>";					
					html = html + "<td id='testname' class='center'>"+(r.proLi[pk].profileName)+"</td>";
					html = html + "<td></td>";
					html = html + "<td></td>";
					html = html + "<td class='center'> <input id='masteridCheckboxOutsource"+ (pk+1) +"' name='masteridCheckboxOutsource'  class='selectallOutsource' type='checkbox' value="+r.proLi[pk].sampleWiseMasterId+"></td>";

					for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
						   
						if (r.proLi[pk].testli[ts].tid != 0) {
						
							html = html + "<tr style='height:25px'>" ;	
							html = html + "<td></td>";
							html = html + "<td></td>";
							html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testName)+"</td>";
							html = html + "<td id='testcode' class='center'>"+(r.proLi[pk].testli[ts].testcode)+"</td>";
							html = html + "<td></td>";										
														       					
						}
					}	
				}
			}	
			$("#outsourceTestTableBody").html(html);
		}
	});
}

/*********************************************************
 * @author Ajay khandare
* @since 13-06-2020
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
	$("#outSourcelabpopup").modal('show');
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for get all record OutLab Master
 ******************************************************************************/
function getAllOutLabMaster() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/outlabmastercontroller/getalloutlabmaster",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<select name='OutLab Name' class='col-md-12'><option value='0'>--Select OutLab--</option>";
			for ( var i = 0; i < r.outLabMasterDtoList.length; i++) {
				divContent = divContent + "<option value='"	+ r.outLabMasterDtoList[i].id + "'>"+ r.outLabMasterDtoList[i].name + "</option>";
			}
			divContent = divContent + "</select>";					
				$("#labCenterId").html(divContent);
				$("#labCenterId").select2();
		}
	});
}


/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is used send to outsource test.
 *********************************************************/
function sendToOutSourceTestPhlebo() {
	
	var labCenterId = $("#labCenterId").val();
	if (labCenterId == "" || labCenterId == null || labCenterId == 0) {
		alert(" Select Out Lab Name ");
		return false;
	}
	
	var dispatchDate = $('#dispatchDate').val();
	if (dispatchDate == "" || dispatchDate == null || dispatchDate == 0) {
		alert(" Select Dispatch Date ");
		return false;
	}
	
	var dispatchTime = $('#dispatchTime').val();
	if (dispatchTime == "" || dispatchTime == null || dispatchTime == 0) {
		alert(" Select Dispatch Time ");
		return false;
	}
    
	var carrierId = $('#carrierId').val();
	var commentId = $('#CommentId').val();
	idList = [];
	var currentId;
	var inouthouse=3;
	$("#outsourceTestTable").find('input[name="masteridCheckboxOutsource"]').each(function() {
				if ($(this).is(":checked")) {
					currentId = $('#' + this.id).val();
					if (currentId != 0) {
						idList.push(currentId);
					} 
				}
			});
	
	var idListNew=$('#masterIdOutsource').val();
	//alert(idList);
	//return false;
	if(idList.length > 0){	
    	var r = confirm("Are You Sure You Want To OutSource this Sample/Tests ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(idList));	
    		inputs.push('labCenterId=' + encodeURIComponent(labCenterId));	
    		inputs.push('dispatchDate=' + encodeURIComponent(dispatchDate));	
    		inputs.push('dispatchTime=' + encodeURIComponent(dispatchTime));	
    		inputs.push('carrierName=' + encodeURIComponent(carrierId));
    		inputs.push('comment=' + encodeURIComponent(commentId));
    		inputs.push('inouthouse=' + encodeURIComponent(inouthouse));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : false,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/phlebotomy/sendtooutsourcetestphlebo",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alertify.success(r);   				
    				//getPhlebotomyRecord();
    				//$("#outSourcelabpopup").modal('hide');
    				$('#masterIdOutsource').val('0');				
    				clearOutsourcePopUp();
    				var treatmentId = $("#treatmentIddd").val();
    				var patientId = $("#patientIddd").val();
    				getSampleTypeListFromTid(patientId,treatmentId);
    				searchLabTestPatient("accessionTestSearchBtn");
    			}
    		});
    	}
	}else{
		alert("Please select at least one Profile/Test!");
	}	
}

function clearOutsourcePopUp(){
	$('#outsourceTestTableBody').empty();
	$("#sampleTypeId").val(0);
	$("#labCenterId").select2('val',0);
	$('#dispatchDate').val("");
	$('#dispatchTime').val("");
	$('#carrierId').val("");
	$('#CommentId').val("");
	$('#masteridCheckboxOutsource').prop("checked", false);
}

function checkUnckechOutsource(){
	/*$("#masteridCheckboxOutsource").click(function () {
		var status = false;
		if($("#masteridCheckboxOutsource").is(':checked'))
			status = true;
		$('input[type=checkbox]').not(":disabled").prop('checked', status);
	});*/
	
}
/***********************************************************
 * @author Ajay khandare
 * @since  16-06-2020
 * @comment for get Forced OutSource Record patient
************************************************************/
function getForcedOutSourcedRecord(id){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('callfrom=' + encodeURIComponent(id));
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getForcedOutSourcedRecord",
		error : function() {
			alert("error");
		},
		success : function(r) {			
			settemplateForcedOutsource(r);
			
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
					numberOfRows +="<li onclick='outSourcePagination("+index+", "+Math.ceil(numberOfPages)+", \"outsourceforced\");'><a>"+index+"</a></li>";
				}else{
					numberOfRows +="<li onclick='outSourcePagination("+index+", "+Math.ceil(numberOfPages)+", \"outsourceforced\");'><a>"+index+"</a></li>";
				}
				index = index + 1;
			}
			if(numberOfPages > 5){
				numberOfRows +="<li class='next' onclick='outSourceNextPagination("+index+", "+Math.ceil(numberOfPages)+", \"outsourceforced\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}
			if(count == 0)
				$('#outSourceForcedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
			else{
				$('#outSourceForcedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
				$('#outsourceforcedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='pageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForcedOutsource("+Math.ceil(numberOfPages)+", \"outsourceforced\");'>Go</button></a></li>");
			}
			$('#outSourceForcedPagination').html(numberOfRows);
		}
		});
	}
/***********************************************************
 * @author Ajay khandare
 * @since  16-06-2020
 * @comment for Set Forced OutSource Record patient
************************************************************/
function settemplateForcedOutsource(r)
{
	if(r.labSampleWiseMasterDtoList.length>=0){
		var divContent = "";
		var statusss="";
		for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
			var str = r.labSampleWiseMasterDtoList[i].templateWise;
			
			var microbiologywise = str.startsWith("M");
			var histopathwise = str.startsWith("H");
			
			
			var timeSesitiveValue = "";
			var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
			var str = timeValue.replace(/,/g, '');
			if (str > 0) {
				timeSesitiveValue = timeValue;
			}else{
				timeSesitiveValue = "Not Time Sensitive.";
			}
			
		var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
	    $("#patientName").text(patinetname);
	    
	    var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti		
		if(r.labSampleWiseMasterDtoList[i].inOutHouse ==2){
			statusss="ForcedOutSource";
		}else if(r.labSampleWiseMasterDtoList[i].inOutHouse ==3)
		{
			statusss="OutSource";
		}
		
		var printData=r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;
		var detailsData=statusss+"_"+r.labSampleWiseMasterDtoList[i].outlabName+"_"+r.labSampleWiseMasterDtoList[i].dispatchDate+"_"+r.labSampleWiseMasterDtoList[i].dispatchTime+"_"+r.labSampleWiseMasterDtoList[i].carrierId+"_"+r.labSampleWiseMasterDtoList[i].commentId;

		divContent = divContent+ '<tr style="height:2px;" >'							
			
			        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>"
			        
			    	if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y")
					{
			    		divContent = divContent+ "<td class='col-md-2 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>"
						//divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else
					{
						divContent = divContent+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>"
						//divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
			        
					//+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>"	
		divContent = divContent
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"	
					/*+ "<td class='col-md-1 center'></td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"	*/	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"

					+ "<td class='col-md-2 center'>"+datetime+"</td>"	
					
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"
			        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
                    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
				    
			        //+ "<td class='col-md-1 center'>-</td>"
				  
	        divContent = divContent     + "<td class='col-md-1 center'>"+statusss +"</td>";
	        
	        divContent = divContent     + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].outlabName +"</td>"
	        							+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>"
			        + "<td style='display:none' id='popupdata4"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
	       
		   
			divContent = divContent     + "<td class='col-md-1 center'>" 
					+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Details' onclick=OutlabDeatils("+i+") ></td>";	
				    + "<td class='col-md-1 center'></td>";	
			//alert("DDDDDDDD");        
		   divContent = divContent     + " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-info'onclick=viewDocument(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+")><i class='fa fa-cloud-upload'></i></button></td>";				
			    
				    
    		divContent = divContent     + "<td class='col-md-1 center'>" 
			+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' disabled='disabled' onclick=generateBarcodePopup4("+i+") ></td>";	
		    + "<td class='col-md-1 center'></td>";	
						    
				    
		  /*  divContent = divContent     + "<td class='col-md-1 center'>" 
			+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine Value' onclick=forwordPageOutSourceRoutineValue(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'><input type='hidden' id='detailsData"+i+"' value=\'"+detailsData+"\'></td>";
		   
			+ "<td class='col-md-1 center'></td>";*/
		    
		    if(histopathwise == true){
	    		divContent = divContent+ "<td class='col-md-1 center'>" 
				+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageAuthorizedRoutineValueTemplateWiseForOutSource(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+","+r.labSampleWiseMasterDtoList[i].profileId+") ><input type='hidden' id='detailsData"+i+"' value=\'"+detailsData+"\'></td>";	
				+ "<td class='col-md-1 center'></td>";
	    	}else{
	    		 divContent = divContent     + "<td class='col-md-1 center'>" 
	 			+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine Value' onclick=forwordPageOutSourceRoutineValue(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'><input type='hidden' id='detailsData"+i+"' value=\'"+detailsData+"\'></td>";
	 		   
	 			+ "<td class='col-md-1 center'></td>";
	    	}
		    
		    
		    
		}	
	
		$('#proccessingtabId1').html(divContent);
	}

}
/*********************************************************
 * @author Ajay khandare
 * @since 13-06-2020
 * @Code This function is use to view outsoutsource test result
 *********************************************************/
function viewOutSourceTestforResult1(testId) {
	$("#outSourcelabpopup").modal('show');
	getAllOutLabMasterByTestId(testId);
}

function OutlabDeatils(id)
{
	 var detailsData=$('#detailsData'+id).val();
	 var data=detailsData.split("_");
	 $('#outlabtype').val(data[0]);
	 $('#outlabname').val(data[1]);
	 $('#dispatchDate1').val(data[2]);
	 $('#dispatchTime1').val(data[3]);	
	 $('#carrierId1').val(data[4]);
	 $('#CommentId1').val(data[5]);
	$("#outSourcelabpopupDetails").modal('show');
}

/*********************************************************
 * @author Ajay khandare
 * @date 14_Feb_2020
 * @Code This function is used send to OutSource Tab.
 *********************************************************/
function sendToOutSourceTestOutsourceTab() {
	
	var labCenterId = $("#labCenterId").val();
	var sendoutsource = $("#sendoutsource").val();
	
	if (labCenterId == "" || labCenterId == null || labCenterId == 0) {
		alert(" Select Out Lab Name ");
		return false;
	}
	
	var dispatchDate = $('#dispatchDate').val();
	if (dispatchDate == "" || dispatchDate == null || dispatchDate == 0) {
		alert(" Select Dispatch Date Name ");
		return false;
	}
	
	var dispatchTime = $('#dispatchTime').val();
	if (dispatchTime == "" || dispatchTime == null || dispatchTime == 0) {
		alert(" Select Dispatch Time Name ");
		return false;
	}
	var carrierId = $('#carrierId').val();
	var commentId = $('#CommentId').val();
	var inouthouse=2;
	idList = [];
	idList.push(sendoutsource);				
	if(idList.length > 0){	
    	var r = confirm("Are You Sure You Want To OutSource this Sample/Tests ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(idList));	
    		inputs.push('labCenterId=' + encodeURIComponent(labCenterId));	
    		inputs.push('dispatchDate=' + encodeURIComponent(dispatchDate));	
    		inputs.push('dispatchTime=' + encodeURIComponent(dispatchTime));	
    		inputs.push('carrierName=' + encodeURIComponent(carrierId));
    		inputs.push('comment=' + encodeURIComponent(commentId));
    		inputs.push('inouthouse=' + encodeURIComponent(inouthouse));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/phlebotomy/sendtooutsourcetestphlebo",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alertify.success(r);   				
    				//getProcessingRecord('AO');
    				searchDateWiseOutSourced();
    				$("#outSourcelabpopup").modal('hide');
    			}
    		});
    	}
	}	
}


/***********************************************************
 * @author Ajay s khandare
 * @since  2-03-2020
 * @comment forward page on routine vale 
************************************************************/
function forwordPageOutSourceRoutineValue(masterid,treatmentId,patientId,sampleTypeId)
{
	window.location.href = "pathology_outsource_routinevalue_page.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId="+sampleTypeId;

}
/********************************************************************************
 * @author Ajay Khandare
 * @since 10-03-2020
 * @comment for save LabTest RoutineValueResult 
*******************************************************************************/
function saveLabTestRoutineValueResultOutSource(id)
{	
	var statusFlag=$("#"+id).val();	
	//var idPathologist=$("#IdPathologist").val();
	var idPathologist=1;
	var kitSpecId=1;	
	var pIdReporting= 0;
    //var machineId1=$("#machineId").val();
	
	//var mId=machineId1.split(" ");
	
	var machineId=0;
	var serialNo="";
	var resultmarge=0;
	/*if(idPathologist == null || idPathologist == "0"){
		alert("Please select pathologist.");
		
		return false;
	}*/
	
	if (statusFlag == "AA") {		
			if (idPathologist == "" || idPathologist == "undefined" || idPathologist == null || idPathologist == 0|| idPathologist == "0") {
				alert("Please Select Pathologist Name.");
				$("#IdPathologist").focus();
				return false;
			}
	}
	
	var proLength = $("#proLength").val();	
	var masterIdd=$("#masterIdd").val();
	var phlebotomytableTestsalve = {
			pathologySampleWiseSlaveList : []
		};	
	
	for ( var j = 1; j <= proLength; j++) 		
	{	
	   var testLength = $("#testLength"+j).val();
	   for ( var i = 1; i <= testLength; i++)
		  {
			 var pkgtestId = $("#pkgIdproIdtestId"+j+i).val();	
			 if(pkgtestId==undefined)
				 {
				break;
				 }	
     		 var pkgprofiletestId=pkgtestId.split(",");							
			 var profileId=pkgprofiletestId[0];	
			 var testId=pkgprofiletestId[1];			 
			 var testresult="";
			 if(statusFlag=="AU")
			{
				  testresult = $("#testresultt"+j+i).val();
			} else if (statusFlag == "AA") {

				
				rjflag = $("#rjflag" + j + i).val();
				if (rjflag == "Y") {
					testresult = $("#testresultt" + j + i).val();
					if (testresult == "" || testresult == null || testresult == undefined) {
						testresult = " ";					
					}
					
				}else
				{
					testresult = $("#testresultt" + j + i).val();
					if (testresult == "" || testresult == null || testresult == undefined) {
						testresult = 0;
						alert("Please Enter Routine value");
						return false;
					}	
				}
				
				
				
			}
			
			 var reasionid = $("#reasionid"+j+i).val();
			 var flagId =$("#flagId"+j+i).text();
			 
			 phlebotomytableTestsalve.pathologySampleWiseSlaveList.push({				  							  				 
				    "profileId" : profileId,				
					"testid" : testId,
					"testResult" : testresult,
					"testReason" : reasionid,
					"flagMark" : flagId,	
			});
		}
	}

	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var inputs = [];	
	inputs.push('id=' + masterIdd);
	inputs.push('machineId=' + machineId);
	inputs.push('SerialNo=' + serialNo);
	inputs.push('statusFlag=' + statusFlag);
	inputs.push('idPathologist=' + idPathologist);
	inputs.push('kitSpecId=' + kitSpecId);
	inputs.push('pIdReporting=' + pIdReporting);
	inputs.push('profileIdcomments=' + "-");
	
	inputs.push('phlebotomyListTestsalve=' + phlebotomyListTestsalve);
	inputs.push('phlebotomysamplemastertable=' + encodeURIComponent(""));
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/phlebotomy/saveLabTestRoutineValueResult",
		data : str + "&reqType=AJAX",
		success : function(r) {
			   if (statusFlag == "AU") {
				alertify.success("Save Successfully");
				window.location.replace("pathology_phlebotomy_outsource.jsp");
			    }
    					
				
		}
	});

}

/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment OutSource Patient Auto-Suggestion.
************************************************************/
function outSourcePatientAutoSuggestion(patientId) {

	var tabId =  $("#tabId li.active").attr('id');
     
	var resultData = [];
	
	var patient = $("input#" + patientId).val();

	var patientTypeId = $('#patSearchType').val();
	
	if(patientTypeId == 1 || patientTypeId == 2){
		
	}
	else if(patientTypeId == 0){
		alert("First select patient type.");
		$('#byName').val("");
		return false;
	}

	if (patient == "" || patient == null || patient == "null" || patient == undefined) {
		alert("Please enter search value");
		$("input#" + patientId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patient));
	inputs.push('tabId=' + tabId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/outSourcedPatientAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.labSampleWiseMasterDtoList.length; j++) {
				var arrValue = response.labSampleWiseMasterDtoList[j].patientId +"-"+response.labSampleWiseMasterDtoList[j].patientname;
				var idValue = response.labSampleWiseMasterDtoList[j].patientId;
				var name = response.labSampleWiseMasterDtoList[j].patientname;
				resultData.push({
					ID : idValue,
					Name : name
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

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
		var patientName = res[1];
		getOutSourcePatientById(patId, tabId);
		$("input#" + patientId).val(patientName);
	}
}

/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment OutSource  get Patient ID
************************************************************/
function getOutSourcePatientById(id,tabId) {
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('tabId=' + tabId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getoutsourcepatientbyId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			// setPatientTemp(response, type, tabId);
			if (tabId == "outsource") {
				setoutSourcedTemplate(r);
			} else if (tabId == "forcedOutSource") {
				settemplateForcedOutsource(r);
			}
			$('#byName').val("");
		}
	});
}
function setoutSourcedTemplate(r)
{
	if(r.labSampleWiseMasterDtoList.length>=0){
		var divContent = "";
		for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
			var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
				$("#patientName").text(patinetname);
			var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
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
			} 
			if(r.labSampleWiseMasterDtoList[i].teststatus==2){
				statusss="Accessing Pending";
			}
			if(r.labSampleWiseMasterDtoList[i].teststatus==3){
				statusss="Accepted Done";
			}
			if(r.labSampleWiseMasterDtoList[i].teststatus==4){
				statusss="Sample Rejected";
			}
			if(r.labSampleWiseMasterDtoList[i].teststatus==5){
				statusss="Sample In Authorization";
			}
			if(r.labSampleWiseMasterDtoList[i].teststatus==6){
				statusss="Sample Reported";
			}
			
			var printData=r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;
				
			divContent = divContent+ '<tr style="height:2px;" >'							
	        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>";
	        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
				divContent = divContent	 + "<td class='col-md-2 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>";	
			}else{
				divContent = divContent	 + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/></td>";	
			}
			
	        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"
				+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
				//+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
				+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
				+ "<td class='col-md-2 center'>"+datetime+"</td>"	
				+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
			    + "<td class='col-md-2 center'>"+statusss +"</td>"
			    + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
			    + "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
	        
	        divContent = divContent  + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>";	
	        divContent = divContent  + "<td class='col-md-2 center'>"+timeSesitiveValue +"</td>";
	    	divContent = divContent+ "<td class='col-md-1 center'>" 
				+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' onclick=generateBarcodePopup1("+i+") ></td>";	
			    + "<td class='col-md-1 center'></td>";	
			divContent = divContent+ "<td class='col-md-1 center'>" 
				+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='SendOutSource' onclick=viewOutSourceTestforResult1("+r.labSampleWiseMasterDtoList[i].subServiceId+") ><input type='hidden' id='sendoutsource'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
				+ "<td class='col-md-1 center'></td>";
		}
			$('#proccessingtabId').html(divContent);
	}	
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for get all record OutLab Master
 ******************************************************************************/
function fetchLabNameByType() {	
	var outSourceType = $('#outSourceType').val();
	var inputs = [];
	inputs.push('outSourceType=' + outSourceType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/fetchlabnamebytype",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<select name='OutLab Name' class='col-md-12'><option value='0'>--Select OutLab--</option>";
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				divContent = divContent + "<option value='"	+ r.labSampleWiseMasterDtoList[i].labCenterId + "'>"+ r.labSampleWiseMasterDtoList[i].outlabName + "</option>";
			}
			divContent = divContent + "</select>";					
				$("#outSourceTypeId").html(divContent);
				$("#outSourceTypeId").select2();
		}
	});
}

/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment OutSource  get Patient ID
************************************************************/
function getOutSourceTypeById() {
	
	var outSourceType = $('#outSourceType').val();	
	
	var outSourceTypeId = $('#outSourceTypeId').val();		
	
	var tabId =  $("#tabId li.active").attr('id');
	
	var inputs = [];	
	inputs.push('outSourceType=' + outSourceType);
	inputs.push('outSourceTypeId=' + outSourceTypeId);
	inputs.push('tabId=' + tabId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getoutsourcepatientbyId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (tabId == "outsource") {
				setoutSourcedTemplate(r);
			} else if (tabId == "forcedOutSource") {
				settemplateForcedOutsource(r);
			}
		}
	});
}

/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment To search outSourced  records.
************************************************************/
function searchDateWiseOutSourced(){
	var tabId =  $("#tabId li.active").attr('id');
	var outSourceType =  $.trim($("#outSourceType").val());	
	
	if(tabId == "outsourcelabreport"){
		searchDateWiseOutSourceLabReport();
		
		return false;
	}
	
	var outSourceTypeId =  $.trim($("#outSourceTypeId").val());		
	var txtFdate = $.trim($("#txtFdate").val());		
	var txtTdate = $.trim($("#txtTdate").val());
	var departmentId = $("#departmentId").val();
	var startIndex = 0;
	var searchBy = "";
	var emergencyFlag = $("#emergencyFlag").val();
	
	if (outSourceType == "0" && outSourceTypeId == "0" && txtFdate == "" && txtTdate == "") {
		alert("Please enter something to search");
		return false;
	}
	
	if(outSourceType == 0){
		if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
			$("#outSourceType").val(0);
			$("#txtTdate").val(" ");
			$("#txtFdate").val(" ");
			alert("Please select both date to search");
			return false;
		}else{
			searchBy = "byDate";
		}
	}else if(outSourceType != 0 && outSourceTypeId != 0){
		if(txtFdate == "" && txtTdate == ""){
			searchBy = "byType";
		}else if (txtFdate != "" && txtTdate == "") {
			$("#outSourceType").val(0);
			$("#outSourceTypeId").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate == "" && txtTdate != ""){
			$("#outSourceType").val(0);
			$("#outSourceTypeId").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate != "" && txtTdate != "") {
			searchBy = "byAll";
		}
	}else if(outSourceType != 0 && outSourceTypeId == 0){
		$("#outSourceType").val(0);
		alert("Please select lab name.");
		return false;
	}

	$("#outSourceType").val(outSourceType);
	$("#outSourceTypeId").val(outSourceTypeId);
	$("#fromDate").val(txtFdate);
	$("#toDate").val(txtTdate);
	$("#searchBy").val(searchBy);
	
	var inputs = [];
	inputs.push('outSourceType=' + outSourceType);
	inputs.push('outSourceTypeId=' + outSourceTypeId);
	inputs.push('tabId=' + tabId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('searchBy=' + searchBy);
	inputs.push('startIndex=' + startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('departmentId=' + departmentId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "ehat/pathologysearch/searchDateWiseOutSourced",
		
		// updated by Rohini Ambhore for department search on 20-02-2024
		url : "ehat/pathologysearch/searchDateWiseOutSourcedNew",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (tabId == "outsource") {
				setoutSourcedTemplate(r);
			} else if (tabId == "forcedOutSource") {
				settemplateForcedOutsource(r);
			}
			setPaginationTemplate(r," ", tabId);
		}
	});
}



/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function outSourcePagination(pageNumber, numberOfPages, callFrom){
	var emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('callFrom=' + callFrom);
    inputs.push('startIndex='+startIndex);
    inputs.push('emergencyFlag='+emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getoutsourcepagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
			settemplateForcedOutsource(r);
        	$('#outSourceForcedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function outSourceNextPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="outSourcePreviousPagination('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="outSourcePagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="outSourceNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	$('#outSourceForcedPagination').html(numberOfRows);
	outSourcePagination(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function outSourcePreviousPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="outSourcePreviousPagination('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="outSourcePagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="outSourceNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		$('#outSourceForcedPagination').html(numberOfRows);
		outSourcePagination(displayPagination, numberOfPages, callFrom);
}


/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment To send to phlebotomy in Recollection Request Tab.
************************************************************/
function sendToPhlebotomyRecollection(id,recollectionType,tabId){	
	var r = confirm("Are You Sure You Want To Recollection this Sample?");
	if(r == true) {
		var inputs = [];
		inputs.push('id=' + encodeURIComponent(id));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/sendToPhlebotomyRecollection",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alertify.success(r);  

				if (recollectionType == "B2B") {
					if (tabId == "recollection") {
						getAllRecollectionRequestBToBAndBToC('allBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					} else if (tabId == "reject") {
						getAllRecollectionRequestBToBAndBToC('ARBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					} else if (tabId == "rejectsample") {
						getAllRecollectionRequestBToBAndBToC('PRBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					}

				} else if (recollectionType == "B2C") {
					getSamples('BTOCRecollection');
					/*if (tabId == "recollection") {						
						getAllRecollectionRequestBToBAndBToC('allBToC');
						getRecollectionRecordsCount('BTOCRecollection');
					} else if (tabId == "reject") {
						getAllRecollectionRequestBToBAndBToC('ARBToC');
						getRecollectionRecordsCount('BTOCRecollection');
					} else if (tabId == "rejectTest") {
						getAllRecollectionRequestBToBAndBToC('PRBToC');
						getRecollectionRecordsCount('BTOCRecollection');
					}*/
				}
			}
		});
	}
}

/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment To reject Sample From Recollection in Recollection Request Tab.
************************************************************/
function rejectSampleFromRecollection(id,recollectionType,tabId){
	var r = confirm("Are You Sure You Want To Reject this Sample?");
	if (r == true) {
		var inputs = [];
		inputs.push('id=' + encodeURIComponent(id));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/rejectSampleFromRecollection",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alertify.success(r);  

				if (recollectionType == "B2B") {
					if (tabId == "recollection") {
						getAllRecollectionRequestBToBAndBToC('allBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					} else if (tabId == "reject") {
						getAllRecollectionRequestBToBAndBToC('ARBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					} else if (tabId == "rejectsample") {
						getAllRecollectionRequestBToBAndBToC('PRBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					}

				} else if (recollectionType == "B2C") {
					getSamples('BTOCRecollection');
					/*if (tabId == "recollection") {						
						getAllRecollectionRequestBToBAndBToC('allBToC');
						getRecollectionRecordsCount('BTOCRecollection');
					} else if (tabId == "reject") {
						getAllRecollectionRequestBToBAndBToC('ARBToC');
						getRecollectionRecordsCount('BTOCRecollection');
					} else if (tabId == "rejectTest") {
						getAllRecollectionRequestBToBAndBToC('PRBToC');
						getRecollectionRecordsCount('BTOCRecollection');
					}*/
				}
			}
		});
	}
}

/***********************************************************
 * @author Ajay Khandare
 * @since  17-06-2020
 * @comment To drop Sample From  Recollection Request Tab.
************************************************************/
function dropSampleFromRecollection(id,recollectionType,tabId)
{	
	var r = confirm("Are You Sure You Want To Drop this Sample?");
	if (r == true) {
		var inputs = [];
		inputs.push('id=' + encodeURIComponent(id));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/dropSampleFromRecollection",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alertify.success(r);  

				if (recollectionType == "B2B") {
					if (tabId == "recollection") {
						getAllRecollectionRequestBToBAndBToC('allBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					} else if (tabId == "reject") {
						getAllRecollectionRequestBToBAndBToC('ARBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					} else if (tabId == "rejectsample") {
						getAllRecollectionRequestBToBAndBToC('PRBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					}

				} else if (recollectionType == "B2C") {
					if (tabId == "recollection") {						
						getSamples('BTOCRecollection');
						/*getAllRecollectionRequestBToBAndBToC('allBToC');
						getRecollectionRecordsCount('BTOCRecollection');*/
					} else if (tabId == "reject") {
						getSamples('BTOCRecollection');
						/*getAllRecollectionRequestBToBAndBToC('ARBToC');
						getRecollectionRecordsCount('BTOCRecollection');*/
					} else if (tabId == "rejectTest") {
						getSamples('BTOCRecollection');
						/*getAllRecollectionRequestBToBAndBToC('PRBToC');
						getRecollectionRecordsCount('BTOCRecollection');*/
					}

				}
				
			}
		});
	}
	
}


/*********************************************************
* @author Ajay s khandare
 * @since 08-04-2020
* @comment for get  In Pathologist Recollection Test
***********************************************************/
function getPathologistRecollectionTest(masterId,treatmentid,patientType,viewType)
{       
	    var recollectionType = $("#recollectionType").val();
		var tabType =  jQuery('#tabId').find('li.active').attr('id');	
	
		jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/gettestViewRecollectionRequest",
		data : {
			masterid : masterId,	
			treatmentid : treatmentid,
			patientType : patientType,
			recollectionType : recollectionType,
			tabType : tabType,
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setPathologistRecollectionTest(r,viewType);
		}
	});
}
/*********************************************************
* @author Ajay s khandare
* @since 08-04-2020
* @comment for set testView RecollectionRequest  
***********************************************************/
function setPathologistRecollectionTest(r,viewType)
{
    
	var html = "";   		
	if (r.proLi.length == 0 || r.proLi.length == null) {		
		html = html
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	} else {				
	for ( var pk = 0; pk < r.proLi.length; pk++) {				
		for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {					
			if (r.proLi[pk].testli[ts].tid != 0) {
									
	          html = html + "<tr style='height:25px'>" ;		
			  html = html + "<td class='center'>"+(r.proLi[pk].testli[ts].testName)+"("+r.proLi[pk].profileName+")"+"</td>";																												
			  html = html + "<td class='center'><input class='testCheckBox' id='testidRecollection"+(pk+1) + (ts+1) +"' name='testidRecollection' type='checkbox' value='"+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].testli[ts].profileId+","+r.proLi[pk].testli[ts].testId+"'></td></tr>";     
						       					
			}					
		}	
	}	
	if (viewType == "sendTest") {
			$("#recolletiontestPopUpSendToProcessingId").html(html);
			$('#recolletiontestPopUpSendToProcessing').modal("show");
		} else if(viewType == "rejectTest"){
			$("#rejecTestPopUpPathologistTableList").html(html);
			$('#rejecTestPopUpPathologist').modal("show");
			
		}
		
	}			
	
}
/*********************************************************
* @author Ajay s khandare
* @since 08-04-2020
* @comment for hide popup RecollectionRequest  
***********************************************************/
function hidepopSendToProcessing()
{
	$('#recolletiontestPopUpSendToProcessing').modal("hide");
}
/*********************************************************
* @author Ajay s khandare
* @since 08-04-2020
* @comment for hide popup RejectRequest  
***********************************************************/
function hidepopRejectRequest()
{
	$('#rejecTestPopUpPathologist').modal("hide");
}


/***********************************************************
 * @author Ajay khandare
 * @since  2-03-2020
 * @comment for SendToProcessing Test
************************************************************/
function sendToProcessingTest(id, recollectiontype, tabId) {
	idList = [];
	var callform = "";
	var currentId;
	var masterId = "";
	var profileId = "";
	var testId = "";
	var recollectionflag = "";
	var countcheckbox = 0;
	var phlebotomytableTestsalve = {
		pathologySampleWiseSlaveList : []
	};
	$("#recolletiontestPopUpSendToProcessingId").find(
			'input[name="testidRecollection"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			countcheckbox++;

			var masterIdProfileTestId = currentId.split(",");
			masterId = masterIdProfileTestId[0];
			profileId = masterIdProfileTestId[1];
			testId = masterIdProfileTestId[2];
			recollectionflag = "N";
		}

		phlebotomytableTestsalve.pathologySampleWiseSlaveList.push({
			"masterIdd" : masterId,
			"profileId" : profileId,
			"testid" : testId,
			"recollection" : recollectionflag,
		});
	});
	if (countcheckbox == 0) {
		alert("Please Select at least one Test");
		return false;
	}
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var r = confirm("Are You Sure You Want To ReCollect this Tests ?");
	if (r == true) {
		var inputs = [];
		inputs.push('phlebotomyListTestsalve='
				+ encodeURIComponent(phlebotomyListTestsalve));
		inputs.push('callfrom=' + encodeURIComponent(callform));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/sendToProcessingTest",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alertify.success(r);
				$('#recolletiontestPopUpSendToProcessing').modal("hide");
				if (recollectiontype == "B2B") {
					if (tabId == "recollectTest") {
						getAllRecollectionRequestBToBAndBToC('PRBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					}
				} else if (recollectiontype == "B2C") {
					if (tabId == "recollectTest") {
						getSamples('BTOCRecollection');
						/*getAllRecollectionRequestBToBAndBToC('PRBToC');
						getRecollectionRecordsCount('BTOCRecollection');*/
					}

				}

			}
		});
	}
}

/***********************************************************
 * @author Ajay khandare
 * @since  2-03-2020
 * @comment for Reject Test Request IN ReCollection Tab(pathologist request)
************************************************************/
function rejectTestRequestInPathologistTab(id, recollectiontype, tabId) {
	idList = [];
	var callform = "";
	var currentId;
	var masterId = "";
	var profileId = "";
	var testId = "";
	var testflag = "";
	var countcheckbox = 0;
	var phlebotomytableTestsalve = {
		pathologySampleWiseSlaveList : []
	};
	$("#rejecTestPopUpPathologistTableList").find('input[name="testidRecollection"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			countcheckbox++;

			var masterIdProfileTestId = currentId.split(",");
			masterId = masterIdProfileTestId[0];
			profileId = masterIdProfileTestId[1];
			testId = masterIdProfileTestId[2];
			testflag = "Y";
		}

		phlebotomytableTestsalve.pathologySampleWiseSlaveList.push({
			"masterIdd" : masterId,
			"profileId" : profileId,
			"testid" : testId,
			"testflag" : testflag,
		});
	});
	if (countcheckbox == 0) {
		alert("Please Select at least one Test");
		return false;
	}
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var r = confirm("Are You Sure You Want To Reject this Tests ?");
	if (r == true) {
		var inputs = [];
		inputs.push('phlebotomyListTestsalve='+ encodeURIComponent(phlebotomyListTestsalve));
		inputs.push('callfrom=' + encodeURIComponent(callform));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/rejectTestRequestInPathologistTab",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alertify.success(r);
				$('#rejecTestPopUpPathologist').modal("hide");
				if (recollectiontype == "B2B") {
					if (tabId == "recollectTest") {
						getAllRecollectionRequestBToBAndBToC('PRBToB');
						getRecollectionRecordsCount('BTOBRecollection');
					}
				} else if (recollectiontype == "B2C") {
					if (tabId == "recollectTest") {
						getSamples('BTOCRecollection');
						/*getAllRecollectionRequestBToBAndBToC('PRBToC');
						getRecollectionRecordsCount('BTOCRecollection');*/
					}

				}

			}
		});
	}
}



function showTreanAnalysisTest(id,testId)
{
	var testnamehidden= $("#testnamehidden"+id).val();
	var unitname= $("#unitnamehidden"+id).val();
	var testIdhidden= $("#testIdhidden"+id).val();
	$("#treandAnalysisTestname").text(testnamehidden);
	var patientId = $("#patientId").text();
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/getTestwiseTrendanalysis",
		data : {
			patientId : patientId,	
			testId : testIdhidden,
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setTrenAnalysisView(r,testnamehidden,unitname);
			//loadXChart1111(r,testnamehidden,unitname);
			///HighchartValueSetInTestWise(r,testnamehidden,unitname); used another graph  used this side https://www.tutorialspoint.com/highcharts/highcharts_column_table.htm
		
			//added by kishor for trend analysis graph
			setTempRecordGraph(r,testnamehidden,unitname);	
			}
		});

	
	
}

/*********************************************************
* @author Ajay s khandare
* @since 08-04-2020
* @comment for set test data analysis 
***********************************************************/
function setTrenAnalysisView(r,testnamehidden,unitname)
{
	var unit="";
	if(unitname==null || unitname=="null")
	{
		unit=" ";		
	}else
	{ 
		unit=unitname;	
	}
	var html = "";
	if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
		html = html
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	} else {

		html = html
				+ "	<tr style='background-color: lightblue'><th class='col-sm-3 center'>Test Name</th>";
		for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++)
		{
			var datetime = r.labSampleWiseMasterDtoList[i].collecteddate;
			html = html + "<td id='date' class='center'>" + datetime + "</td>";
		}
		html = html + "</tr>";

		html = html + "<tr style='height:25px'>";
		html = html + "<td id='testname' class='center'>" + testnamehidden+ "</td>";

		for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++)
		{
			if(r.labSampleWiseMasterDtoList[i].testresult!=null || r.labSampleWiseMasterDtoList[i].testresult!=" ")
				
			{
				html = html + "<td id='date' class='center'>"+ r.labSampleWiseMasterDtoList[i].testresult + " "+ unit + "</td>";
			}else
			{
				html = html + "<td id='date' class='center'>-</td>";

			}
			
		}
		html = html + "</tr>";

	}
	$("#trendAnalysisListTable").html(html);
	$('#trendAnalysisDivpopup').modal("show");

}

function loadXChart1111(r,unitname){
	
	//depCountObj = [];
	depRevenueObj = [];
	if(r.labSampleWiseMasterDtoList.length != 0 || r.labSampleWiseMasterDtoList.length != null){
		
		
		for(var i=0;i<r.labSampleWiseMasterDtoList.length;i++){
			var datetime = r.labSampleWiseMasterDtoList[i].collecteddate;
			
			var arrSceduleDate = datetime.split(" ");	
			var datett=arrSceduleDate[0];
			var resultdata= r.labSampleWiseMasterDtoList[i].testresult;
			var result=parseInt(resultdata);
			//alert(result+"DDDresult");
			//alert(resultdata);
	        item = {};
	        item ["x"] = datett;
	        item ["y"] = result;
	        depRevenueObj.push(item);	        
		}
	}
	
	var tt = document.createElement('div'),
	leftOffset = -100;//(~~$('html').css('padding-right').replace('px', '') + ~~$('body').css('margin-right').replace('px', '')),
	topOffset = -32;
	tt.className = 'ex-tooltip';
	document.body.appendChild(tt);

	var data = {
	  "xScale": "time",
	  "yScale": "linear",
	  "main": [
		{
		  "className": ".pizza",
		  "data": depRevenueObj
		}
	  ]
	};
	var opts = {			
	  "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
	  "tickFormatX": function (x) { return d3.time.format('%b %d')(x); },
	  "mouseover": function (d, i) {
	   var pos = $(this).offset();
		//alert(leftOffset);
	   $(tt).text(d3.time.format('%b %d')(d.x) + ': ( result : ' + d.y + ' )')
		  .css({top: topOffset + pos.top, left: pos.left + leftOffset})
		  .show();
	  },
	  "mouseout": function (x) {
		$(tt).hide();
	  }
	};
	var myChart = new xChart('line-dotted', data, '#chart7', opts);
	
}



function setTempRecordGraph(r,testnamehidden,unitname){
	
	
	var vitalType="";
	var vtext="";
	var vname="";
	
		vitalType=testnamehidden;
		vtext="Result "+"("+unitname+")";
		vname=testnamehidden;	
		var dateee = [];
		var resultt = [];
		if(r.labSampleWiseMasterDtoList.length != 0 || r.labSampleWiseMasterDtoList.length != null){
						
			for(var i=0;i<r.labSampleWiseMasterDtoList.length;i++){
				var datetime = r.labSampleWiseMasterDtoList[i].collecteddate;
				
				var arrSceduleDate = datetime.split(" ");	
				var datett=arrSceduleDate[0];
				var resultdata= r.labSampleWiseMasterDtoList[i].testresult;
				var result=parseInt(resultdata);
				
				dateee.push(datetime);
				resultt.push(result);
		        
			}
		}
		
	$('#tempratureContainer').highcharts({
		title: {
            text: vitalType,
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Date & Time'
            },
            categories: dateee
        },
        yAxis: {
            title: {
                text: vtext
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
           /* layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0*/
        },
        series: [{
            name: vname,
            data: resultt
        }]
    });
	//$('#myModalLabel').html(vitalType);
}


/*********************************************************
 * @author Akshay Mache
 * @since 28-07-2020
 * @comment To disable previous date for dispatch date.
**********************************************************/	
function validateDateOutSourceTest()
{
	var date = new Date();
	var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
	
	var arrSceduleDate = ($("#dispatchDate").val()).split("/");	
	var selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]	+ "/" + arrSceduleDate[2]);
	if ((selectedDate < now)) {
		alert('Dispatch date should not be previous date.');
         $("#dispatchDate").val("");
		return false;
	}
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 10_03_2020
 * @Code This function is use to get getmachinename name.
 ******************************************************************************/
function getmachinename() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/phlebotomy/getmachinename",
		success : function(r) {
			setmachinenamee(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 10_03_2020
 * @Code This function is use to set pathologist  name.
 *********************************************************/
function setmachinenamee(r){	
	var list="<option value='0'>-select-</option>";	
	for ( var int = 0; int < r.phlebotomytableList.length; int++) {
		list=list+'<option value="'+(r.phlebotomytableList[int].mId)+'">'+(r.phlebotomytableList[int].machineName)+'</option>';		
	}	
	$("#machineId").html(list);	
	$("#machineId").select2();	
}


/*********************************************************
 * @author Ajay khandare
 * @date 04_Feb_2020
 * @Code This function is use to Set TestName and Profile name.
 *********************************************************/
function getOutSourceRoutinevalueResutl(treatmentId)
{
	var mId=$('#masterIdd').val();
	var patientType=$('#patientgander').val();
	var sampleTypeId = $("#sampleTypeId").val();
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		"masterid" : mId,
			"treatmentid" : treatmentId,
			"patientType" : patientType	
		},
		url : "ehat/phlebotomy/getRoutinevalueResutl",
        success : function(r) {
        	    
			sr1 = 1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
    		var html = "";
    		
			if (r.proLi.length == 0 || r.proLi.length == null) {		
				html = html
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {	
			
				for ( var pk = 0; pk < r.proLi.length; pk++) {
				
				$("#IdPathologist").select2('val',r.proLi[pk].pathologistId);
				
				var collectedatetime=r.proLi[pk].collecteddate;
				collectdate=collectedatetime.split(" ");				
				$("#collectionDate").text(collectdate[0]);	
				$("#collectiontime").text(collectdate[1]);	
				
				//var accpteddatetime=r.proLi[pk].accpteddate;
				//accepteddate=accpteddatetime.split(" ");
				$("#dispatchDate").text(r.proLi[pk].dispatchDate);
				$("#dispatchTime").text(r.proLi[pk].dispatchTime);
				
					
				html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
				html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
				html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";
				
				var testidcheck=[];
				for ( var ts = 0; ts < r.proLi[pk].testli.length; ts++) {
					//alert(testidcheck);
					 var isTestIdAbsent = true;	
					if (r.proLi[pk].testli[ts].testId != 0) {
						
						if(testidcheck.length == 0){
							isTestIdAbsent = true;
						}
						for ( var ts1 = 0; ts1 < testidcheck.length; ts1++) {
							
							if(testidcheck[ts1] == r.proLi[pk].testli[ts].testId){
								isTestIdAbsent = false;
								
								break;
							}
						}
						if(isTestIdAbsent)
							testidcheck[testidcheck.length] = r.proLi[pk].testli[ts].testId;
						
						if(isTestIdAbsent){
							
							
								    var a=r.proLi[pk].testli[ts].lowvalue +"-"+r.proLi[pk].testli[ts].highvalue+"-"+r.proLi[pk].testli[ts].unitname;
								    if(r.proLi[pk].testli[ts].highvalue!=null || r.proLi[pk].testli[ts].unitname!=null){
										a=r.proLi[pk].testli[ts].lowvalue +"-"+r.proLi[pk].testli[ts].highvalue;
									}else if(r.proLi[pk].testli[ts].lowvalue!=null) {
										 a=r.proLi[pk].testli[ts].lowvalue;
									}else
										{
										a="-";
										}
								    
                                    var unitname=r.proLi[pk].testli[ts].unitname;
								    
								    if(unitname!=null){
								    	unitname=r.proLi[pk].testli[ts].unitname;
									}else
									{
										unitname="-";
									}
								    
								    html = html + "<tr style='height:25px'>" ;	
									
									html = html + "<td id='testname' class='center'>"+(r.proLi[pk].testli[ts].testName)+"("+r.proLi[pk].profileName+")"+"</td>";
									html = html + "<td id='trendanalysiId' class='center' style='font-weight: bold;'><input type='hidden' id='testnamehidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].testName+"'/><input type='hidden' id='unitnamehidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].unitname+"'/><input type='hidden' id='testIdhidden"+(pk+1)+(ts+1)+"' value='"+r.proLi[pk].testli[ts].testId+"'/><input type='button' class='btn btn-xs btn-success' id='analysisIdTest' value='Analysis' onclick=showTreanAnalysisTest("+(pk+1)+(ts+1)+") ></td>";
									html = html + "<td id='gretherId' class='center' style='font-weight: bold;'><input id='gretherId" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";

									if (r.proLi[pk].testli[ts].testresult == "-" || r.proLi[pk].testli[ts].testresult == null || r.proLi[pk].testli[ts].testresult == "" || r.proLi[pk].testli[ts].testresult == "null") {
																	
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled' value=''></td>";	
	
										}else
											{
											html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	

											}

									} else {
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
											{
											 html = html + "<td id='testresultt'  class='center'><input disabled='disabled' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testresult)+"'></td>";	

											}else
												{
											html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testresult)+"'></td>";	

											}

									}
													
									html = html + "<td id='normalId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+a+"</td>";		
									
									html = html + "<td id='unitIds"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+unitname+"</td>";		

									if (r.proLi[pk].testli[ts].flagmark == "-" || r.proLi[pk].testli[ts].flagmark == null || r.proLi[pk].testli[ts].flagmark == "" || r.proLi[pk].testli[ts].flagmark == "null")
									{						
										html = html + "<td id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'></td>";		
									}else
									{
										var color="";
										if(r.proLi[pk].testli[ts].flagmark == "N"){
											color="green";
										}else if(r.proLi[pk].testli[ts].flagmark == "L" || r.proLi[pk].testli[ts].flagmark == "H"){
											color="orange";
										}else if(r.proLi[pk].testli[ts].flagmark == "CL" || r.proLi[pk].testli[ts].flagmark == "CH"){
											color="red";
										} 
										html = html + "<td id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-size:15px;font-weight: bold;color:"+color+"'>"+(r.proLi[pk].testli[ts].flagmark)+"</td>";		
									}
																	
									html = html + "<td id='methodId' class='center'>"+(r.proLi[pk].testli[ts].methodename)+"</td>";				
									
									
									if (r.proLi[pk].testli[ts].testreason == "-" || r.proLi[pk].testli[ts].testreason == null || r.proLi[pk].testli[ts].testreason == "" || r.proLi[pk].testli[ts].testreason == "null")
									{						
										   
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											  html = html + "<td id='reasionid' class='center'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text' disabled='disabled'  value=''></td>";	

										}else											
										{
											  html = html + "<td id='reasionid' class='center'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	

										}	
									}else
									{
										if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
										{
											html = html + "<td id='reasionid' class='center' style='font-weight: bold;'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled'  value='"+(r.proLi[pk].testli[ts].testreason)+"'></td>";							

										}else
											{
											html = html + "<td id='reasionid' class='center' style='font-weight: bold;'><input id='reasionid" + (pk+1) + (ts+1) + "' type='text'  value='"+(r.proLi[pk].testli[ts].testreason)+"'></td>";							

											}
									}	
									if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
									{
									    html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-success' id='cancleidpro' value='UnReject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+sampleTypeId+") ></td>";							
									}else
									{
										html = html + "<td id='cancleidpro' class='center' style='font-weight: bold;'><input type='button' class='btn btn-xs btn-danger' id='cancleidpro' value='Reject' onclick=showrejectedtestInProcessingArea("+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\',"+sampleTypeId+")></td>";								
									}
									html = html + "<td><input class='center' id='testidCheckbox"+ (pk+1) + (ts+1) +"' name='testidCheckbox'  type='checkbox' value="+r.proLi[pk].testli[ts].masterid+","+r.proLi[pk].profileId+","+r.proLi[pk].testli[ts].testId+",\'"+r.proLi[pk].testli[ts].rejecttestflag+"\'></td>";								

									html = html + "<input type='hidden' value='"+(r.proLi[pk].profileId)+","+(r.proLi[pk].testli[ts].testId)+"' id='pkgIdproIdtestId"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].rejecttestflag)+"' id='rjflag"+ (pk+1) + (ts+1) +"' />";									
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].nonexistlow)+"' id='nl"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].labcl)+"' id='cl"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].lowvalue)+"' id='l"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].highvalue)+"' id='h"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].labch)+"' id='ch"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].nonexisthigh)+"' id='nh"+ (pk+1) + (ts+1) +"' />";
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].defaultvalue)+"' id='defaultvalue"+ (pk+1) + (ts+1) +"' />";			
								
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].objFormula)+"' id='formulaForTest"+ (pk+1) + (ts+1) +"' />";									
									html = html + "<input type='hidden' value='"+(r.proLi[pk].testli[ts].testName)+"' id='nameOfTest"+(pk+1) + (ts+1)+"' />";

									
									html = html + "<input type='hidden' value='"+r.proLi[pk].testli.length +"' id='reportTestCount"+ (pk+1) + (ts+1) +"' />";									

									/*html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
									html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";*/
									
					}
				}
				}	

			}
				$("#itemMasterRecordsList").html(html);
			}			
			
        }
    });  
}

function jumpToPageForcedOutsource(numberOfPages, callFrom){
	var pageNo = $("#pageNumber").val();
	if(pageNo <= numberOfPages){
		outSourcePagination(pageNo, numberOfPages, callFrom);
	}else{
		alert("Invalid page number.");
	}
	$("#pageNumber").val("");
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Template To show Phlebotomy Patient info.	
************************************************************/
function setPatientTemp(r, type, tabId,pageNumber) {
	

	//alert("response::::"+JSON.stringify(r));
	//alert("type::::"+type);
	//alert("tabId::::"+tabId);
	//alert("pageNumber::::"+pageNumber);
	if(pageNumber == undefined || pageNumber == isNaN || pageNumber == null || pageNumber ==""){
		pageNumber=0;
	}
	/*if(type == "phelbotomyAutoSugg"){
		if(r.labSampleWiseMasterDtoList.length>=0){
			var divContent = "";
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				divContent = divContent+ '<tr style="height:2px;" >';	
				
				if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				    						
				divContent = divContent  	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].datetime +"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"			
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barcodenumber +"</td>"	
					+ "<td class='col-md-3 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplenumber +"</td>"
					+ "<td onclick='hideShowSampleType("+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId+")' class='col-md-2 center' style='height: 21.5px;'>"
					+  "<img id='imgupdown9' src='images/down.png'>" 
					+  "<input type='hidden' value='0' id='hideShowStatus"+r.labSampleWiseMasterDtoList[i].treatmentId +"'></td></tr>"					    
					+ "<tr id='patPreOPDBill123"+r.labSampleWiseMasterDtoList[i].treatmentId +"' style='width:100%;float:right'>" 
					+ "<td style='display:none' id='td123"+r.labSampleWiseMasterDtoList[i].treatmentId +"'>"
					+ ' <table id="ehatTable" class="datatable table  table-bordered">'
					+ '<thead id="ehatTHead">'
					+ '<tr style="background-color: lightblue;">					'								
					+ "<th style='height: 21.5px;' class='col-md-2 center'>Test</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Barcode</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Container Name</th>"
					+ "<th style='height: 21.5px;' class='col-md-3 center'>Sample Name</th>"
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Unit</th>"
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Status</th>"
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Date Time</th>"						
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Time Sensitive(hrs)</th>"		
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Hold/Unhold</th>"	
					+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"	
					+ '</tr>'
					+ '</thead>'
					+ '<tbody id="phlebotomytabIdDD'+r.labSampleWiseMasterDtoList[i].treatmentId +'">'
					+ '</tbody>'
					+ '</table>'
					+ "</td></tr>";
			}
			$('#phlebotomytabId').html(divContent);
		}
		}else */
	
	
	if(type == "appointmentAutoSugg"){
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var pNo = 0;
				if(pageNumber != 0) {
					pNo = (pageNumber - 1);
				}
				var noConcat = Number(pNo + "0");
				var srNo = Number(noConcat+(i+1));
				
				var timeSesitiveValue = "";
				var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
				var str = timeValue.replace(/,/g, '');
				if (str > 0) {
					timeSesitiveValue = timeValue;
				}else{
					timeSesitiveValue = "Not Time Sensitive.";
				}
				
				var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
				var statusss="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
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
				
				divContent = divContent+ '<tr style="height:2px;" >'							
				+ "<td class='col-md-1 center'>"+srNo+"</td>"
		        + "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientId +"</td>"
		        	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].appointmentId+"</td>"
		        	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].unitname +"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+statusss +"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
				    + "<td class='col-md-1 center'>"+((r.labSampleWiseMasterDtoList[i].inOutHouse==0) ? "IN LAB" : (r.labSampleWiseMasterDtoList[i].inOutHouse==2) ? "OUT LAB" : "OUT LAB") +"</td>"
				    + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
		        
		        if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="H"){
					/*divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='testType"+(i+1)+"' value='UNHOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\')  ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
					*/divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td></tr>";
				}else if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="U"){  
					divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' ></td></tr>";
				}
			}
							
		}
		$('#appointmentTabId').html(divContent);
	}else if(type == "phelbotomyAutoSugg" && tabId == "open"){
			
			var divContent = "";
			if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
				// no records.
				divContent = divContent
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
							
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
					var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
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
						divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else{
						divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].unitname +"</td>"*/
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					    + "<td class='col-md-2 center'>"+statusss +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
					    + "<td class='col-md-1 center'>"+((r.labSampleWiseMasterDtoList[i].inOutHouse==0) ? "IN LAB" : (r.labSampleWiseMasterDtoList[i].inOutHouse==2) ? "OUT LAB" : "OUT LAB") +"</td>"
					    + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>"
					    + "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
			        
			        if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="H"){
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-warning' id='testType"+(i+1)+"' value='UNHOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\')  ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
						divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td>";
					}else if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="U"){  
						if(r.labSampleWiseMasterDtoList[i].teststatus !="1"){
							divContent = divContent+ "<td class='col-md-1 center'>" 
								+ "<input type='button' class='btn btn-xs btn-success' id='testType"+(i+1)+"' value='Accepted'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
							divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td>";
						}else{
							divContent = divContent+ "<td class='col-md-1 center'>" 
								+ "<input type='button' class='btn btn-xs btn-danger' id='testType"+(i+1)+"' value='HOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
							divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' ></td>";
						}
					}
			        
			        divContent = divContent+ "<td class='col-md-1 center'>"
					+ "<input type='button' class='btn btn-xs btn-warning' id='btnPrintBarcode"+(i+1)+"' value='print' onclick=generateBarcodePopup1('"+i+"') ></td></tr>";
				}
								
			}
			$('#phlebotomytabId').html(divContent);
			
	}else if(type == "phelbotomyAutoSugg" && tabId == "collected"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
						
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var pNo = 0;
				if (pageNumber != 0) {
					pNo = (pageNumber - 1);
				}
				var noConcat = Number(pNo + "0");
				var srNo = Number(noConcat+(i+1));
				
				var timeSesitiveValue = "";
				var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
				var str = timeValue.replace(/,/g, '');
				if (str > 0) {
					timeSesitiveValue = timeValue;
				}else{
					timeSesitiveValue = "Not Time Sensitive.";
				}
				
				var datetime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
				var statusss="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
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
				
				divContent = divContent+ '<tr style="height:2px;" >'							
				
				+ "<td class='col-md-1 center'>"+srNo+"</td>"
		        + "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].unitname +"</td>"*/
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+statusss +"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
				    + "<td class='col-md-2 center'>"+((r.labSampleWiseMasterDtoList[i].inOutHouse==0) ? "IN LAB" : (r.labSampleWiseMasterDtoList[i].inOutHouse==2) ? "OUT LAB" : "OUT LAB") +"</td>"
				    + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
		        
		        if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="H"){
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='testType"+(i+1)+"' value='UNHOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\')  ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
					divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td></tr>";
				}else if(r.labSampleWiseMasterDtoList[i].phleboteststatus=="U"){  
					if(r.labSampleWiseMasterDtoList[i].teststatus !="1"){
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-success' id='testType"+(i+1)+"' value='Accepted'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
						divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' disabled='disabled'></td></tr>";
					}else{
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-danger' id='testType"+(i+1)+"' value='HOLD' onclick=patientTestHold(this.id,\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
						divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name ='testid' type='checkbox' value='"+r.labSampleWiseMasterDtoList[i].masterId+"' ></td></tr>";
					}
				}
			}		
		}		
		$('#phlebotomyCollectedRecordTableBody').html(divContent);
		
	}else if(type == "accessionTestAutoSugg"){
		if(tabId == "AL"){			
			var divContent = "";
			if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
				// no records.
				divContent = divContent
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {				
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
						
						collectiondatesplit=datetime.split(",");

						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
						
						var datecollectionsplit=datecollection.split("/");
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						var PM = splittedString[2].split(" ");
						
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes(); 
		
					     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr;
					}
					
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
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
					divContent = divContent+ '<tr style="height:2px;" >'							
					+ "<td class='col-md-1 center'>"+srNo+"</td>"
			        + "<td class='col-md-1 center'>"+regdate+"</td>";
			        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
						divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else{
						divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
					
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
			        	//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"	*/
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						//rohit dada
						//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"								
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					    + "<td class='col-md-2 center'>"+statusss +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"					    
				        + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			 
			        var mId = (r.labSampleWiseMasterDtoList[i].masterId).replace(/,/g, '_');
					if(r.labSampleWiseMasterDtoList[i].teststatus =="2"){ 
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
					        
					        divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-primary' id='outsource' value='Outsource' onclick=viewOutSourceTestforResultAccesstion(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId +") ><input type='hidden' id='outsourceId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
		       
						divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick='rejectedtestPatient(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\")' ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						    + "<td class='col-md-1 center'></td>";				        
		        
				        divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='allSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>";
					}else if(r.labSampleWiseMasterDtoList[i].teststatus =="4" && r.labSampleWiseMasterDtoList[i].phleboteststatus == "R"){ 
						var callFrom = "";
					    if(r.labSampleWiseMasterDtoList[i].b2BRejectedFrom == 101){
					    	callFrom = "collection";
					    }else if(r.labSampleWiseMasterDtoList[i].b2BRejectedFrom ==102){
					    	callFrom = "collected";
					    }
					    
						divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' disabled='disabled'  onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
							+ "<td class='col-md-1 center'></td>";
		        
				        divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='UnReject'  onclick='unrejectSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \""+callFrom+"\");' ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";				        
		        
					    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='allSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>"; 
					}else if(r.labSampleWiseMasterDtoList[i].teststatus =="4" && r.labSampleWiseMasterDtoList[i].phleboteststatus == "U"){  
						divContent = divContent+ "<td class='col-md-1 center'>" 
					 		+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' disabled='disabled'  onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
							+ "<td class='col-md-1 center'></td>";
	        
						divContent = divContent+ "<td class='col-md-1 center'>" 
					 		+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='UnReject'  onclick=unjectsampleAccessionTab(\'allrecord\',\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        	+ "<td class='col-md-1 center'></td>";				        
	        
				        divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='allSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>"; 
					}else{
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession'disabled='disabled'  onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
					        
					        divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-primary' id='outsource' value='Outsource' disabled='disabled' onclick=viewOutSourceTestforResultAccesstion(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId +") ><input type='hidden' id='outsourceId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
			        
					    divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' disabled='disabled' onclick=rejectedtestPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";				        
			        
					    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='allSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>";
					}
				}
				
			
			}
			$('#accessionRecordTableBody').html(divContent);
						
		}else if(tabId == "accessionPending"){
			
			var divContent = "";
			if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
				// no records.
				divContent = divContent
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
				
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
					
						collectiondatesplit=datetime.split(",");

						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
						
						var datecollectionsplit=datecollection.split("/");
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						var PM = splittedString[2].split(" ");
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes();
					    
					     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr;
					}
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
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
					
					divContent = divContent+ '<tr style="height:2px;" >'							
					+ "<td class='col-md-1 center'>"+srNo+"</td>"
			        + "<td class='col-md-1 center'>"+regdate +"</td>";
			        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
						divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else{
						divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
					
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
						//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/		
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					    + "<td class='col-md-2 center'>"+statusss +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
					    + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			        
			        var mId = (r.labSampleWiseMasterDtoList[i].masterId).replace(/,/g, '_');
					if(r.labSampleWiseMasterDtoList[i].teststatus =="2"){ 
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
					        divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-primary' id='outsource' value='Outsource' onclick=viewOutSourceTestforResultAccesstion(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId +") ><input type='hidden' id='outsourceId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
			   
						divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick=rejectedtestPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";				        
					    divContent = divContent + "<td><input class='testCheckBox' id='testidAP"+(i+1)+"' name='testidAP' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='apSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>";
					}else if(r.labSampleWiseMasterDtoList[i].teststatus =="4"){ 
					    divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' disabled='disabled'  onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
							+ "<td class='col-md-1 center'></td>";
							
							 divContent = divContent+ "<td class='col-md-1 center'>" 
								+ "<input type='button' class='btn btn-xs btn-primary' id='outsource' value='Outsource' disabled='disabled' onclick=viewOutSourceTestforResultAccesstion(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId +") ><input type='hidden' id='outsourceId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						        + "<td class='col-md-1 center'></td>";
							
				        divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='UnReject'  onclick=unjectsampleAccessionTab(\'allrecord\',\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";				        
			        
						divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='apSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>";
					}else{
						divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession'disabled='disabled'  onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						    + "<td class='col-md-1 center'></td>";
						    
						    divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-primary' id='outsource' value='Outsource' disabled='disabled' onclick=viewOutSourceTestforResultAccesstion(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].patientId +","+r.labSampleWiseMasterDtoList[i].treatmentId +") ><input type='hidden' id='outsourceId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";
					        
					    divContent = divContent+ "<td class='col-md-1 center'>" 
						 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' disabled='disabled' onclick=rejectedtestPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					        + "<td class='col-md-1 center'></td>";				        
					    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='apSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>";
					}
				}
							
			}
			$('#accessionPendingTabId').html(divContent);
								
		}else if(tabId == "collectionPending"){
			
			var divContent = "";
			if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
				// no records.
				divContent = divContent
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {			
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
						  /**************by kranti godse *************************/
						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
						var datecollectionsplit=datecollection.split("/");
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						var PM = splittedString[2].split(" ");
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes();
					    
					     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr;
					}
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
				      	/*********************************************/
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

					divContent = divContent+ '<tr style="height:2px;" >'
					+ "<td class='col-md-1 center'>"+srNo+"</td>"
						+ "<td class='col-md-1 center'>"+regdate +"</td>";
			        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
						divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else{
						divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
					
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
						//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/		
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					    + "<td class='col-md-2 center'>"+statusss+"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
				        + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			           
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' disabled='disabled' id='testType' value='Accession' onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-danger' disabled='disabled' id='testType' value='Reject' onclick=rejectedtestPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";				        
					divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' disabled='disabled' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}
							
			}
			$('#collectionPendingTabId').html(divContent);			
			
		}else if(tabId == "accessionDone"){
			
			
			var divContent = "";
			if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
				// no records.
				divContent = divContent
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {		
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
					
						collectiondatesplit=datetime.split(",");

						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
						
						var datecollectionsplit=datecollection.split("/");
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						var PM = splittedString[2].split(" ");
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes();
					    
					     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr;
					}
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
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

					divContent = divContent+ '<tr style="height:2px;" >'	
					+ "<td class='col-md-1 center'>"+srNo+"</td>"
						+ "<td class='col-md-1 center'>"+regdate +"</td>";
			        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
						divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else{
						divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
					
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
						//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/		
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					    + "<td class='col-md-2 center'>"+statusss +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
						+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			           
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' disabled='disabled' onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";
					divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' disabled='disabled' onclick=rejectedtestPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";				        
					divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' disabled='disabled' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}							
			}
			$('#accessionDoneTabId').html(divContent);
			
		}else if(tabId == "rejectedSample"){
			
			var divContent = "";
			if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
				// no records.
				divContent = divContent
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {				
				for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');
					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
					
						collectiondatesplit=datetime.split(",");

						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
						
						var datecollectionsplit=datecollection.split("/");
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						var PM = splittedString[2].split(" ");
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes();
					    
					     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr;
					}
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
					if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
						statusss="Collection Pending";
					} 
					if(r.labSampleWiseMasterDtoList[i].teststatus==2){
						statusss="Accessing Pending";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==3){
						statusss="Accepted Done";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==4){
						statusss="Sample Rejected";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==5){
						statusss="Sample In Authorization";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==6){
						statusss="Sample Reported";
					}

					divContent = divContent+ '<tr style="height:2px;" >'	
					+ "<td class='col-md-1 center'>"+srNo+"</td>"
						+ "<td class='col-md-1 center'>"+regdate +"</td>";
			        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
						divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}else{
						divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
					}
					
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
						//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/		
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
						+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
						+ "<td class='col-md-2 center'>"+statusss +"</td>"
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
					    + "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			        
			        var mId = (r.labSampleWiseMasterDtoList[i].masterId).replace(/,/g, '_');
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Accession' disabled='disabled' onclick=collectionPendingPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' disabled='disabled' onclick=rejectedtestPatient(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";				        
					divContent = divContent + "<td><input class='testCheckBox' id='rejectedtestId"+(i+1)+"' name='rejectedtestId' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'><input type='hidden' id='arSampleTypeId"+mId+"' value=\'"+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\'/></td></tr>";
				}
				
			
			}
			$('#rejectedSampleTabId').html(divContent);			
		}
	}else if(type == "accessionTrackStatusAutoSugg"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {	
			
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
				var datetime = "-";
				var collectionDateTimes="-";
				var datecollection="-";
				var timecollection="-";
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
				
					collectiondatesplit=datetime.split(",");

					datecollection=collectiondatesplit[0];
					timecollection=collectiondatesplit[1];
					
					var datecollectionsplit=datecollection.split("/");
					var yy=datecollectionsplit[0];
					var mm=datecollectionsplit[1];
					var dd=datecollectionsplit[2];
				     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+timecollection;
				     
				}
				var statusss="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
				if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
					statusss="Collection Pending";
				} 
				if(r.labSampleWiseMasterDtoList[i].teststatus==2 && r.labSampleWiseMasterDtoList[i].inOutHouse == 0){
					statusss="Accessioning Pending";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==3){
					statusss="Accepted Done";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==4){
					statusss="Sample Rejected";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==5){
					statusss="Sample Authorized";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==6){
					statusss="Sample Reported";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==8){
					statusss="OutSourced";
				}
				if(r.labSampleWiseMasterDtoList[i].inOutHouse == 1){
					statusss="OutSource";
				}
				
				divContent = divContent+ '<tr style="height:2px;" >'							
					+ "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
					//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+statusss+"</td>"
			        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>";
					        
				divContent = divContent+ "<td class='col-md-1 center'>" 
					+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='View' onclick=openTrackStatusPopup(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'); ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					+ "<td class='col-md-1 center'></td>";				        
			}
		
		
			
		}
		$('#trackRecordTableBody').html(divContent);
	}
	else if(type == "reportingAutoSugg"){
		if(r.labSampleWiseMasterDtoList.length > 0)
		$("#printCheckBoxCount").val(r.labSampleWiseMasterDtoList.length);
		$("#printTreatmentId").val(0);
		//debugger;
		var tableBody = "";
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			divContent = divContent
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		}else{
			if(tabId == "normal" || tabId == "abnormal" || tabId == "cAbnormal"){
				var emailStatusRadioBtn = "";
				if(tabId == "normal"){
					emailStatusRadioBtn = $("#normalEmailStatus").val();
				}else if(tabId=="abnormal"){
					emailStatusRadioBtn = $("#abnormalEmailStatus").val();
				}else if(tabId=="cAbnormal"){
					emailStatusRadioBtn = $("#cAbnormalEmailStatus").val();
				}
				
				for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					var pNo = 0;
					if (pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var emailStatus = r.labSampleWiseMasterDtoList[i].emailStatus;
					var status = false;
					if(emailStatusRadioBtn == "N"){
						if(emailStatus == "Fail" || emailStatus == "N"){
							status = true;
						}
					}else if(emailStatusRadioBtn == "Y"){
						if(emailStatus == "Success"){
							status = true;
						}
					}
					if(status){
						var timeSesitiveValue = "";
						var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
						var str = timeValue.replace(/,/g, '');

						if (str > 0) {
							timeSesitiveValue = timeValue;
						}else{
							timeSesitiveValue = "Not Time Sensitive.";
						}
						
						var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
						$("#patientName").text(patinetname);
						var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
						var datetime = "-";
						var collectionDateTimes="-";
						var datecollection="-";
						var timecollection="-";
						
						if(dateToCheck == null || dateToCheck == "null"){
							datetime = "-";
						}else{
							datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',second: '2-digit'});
							collectiondatesplit=datetime.split(",");

							datecollection=collectiondatesplit[0];
							timecollection=collectiondatesplit[1];
								
							var datecollectionsplit=datecollection.split("/");
							/*var yy=datecollectionsplit[2];
							var mm=datecollectionsplit[1];
							var dd=datecollectionsplit[0];
							
							collectionDateTimes=dd+"-"+mm+"-"+yy+"  : "+timecollection;
*/
							var yy=datecollectionsplit[0];
							var mm=datecollectionsplit[1];
							var dd=datecollectionsplit[2];
							
							var splittedString=timecollection.split(":");
							var aaa=splittedString.slice(0,-1).join(':');
							//var PM = splittedString[2].split(" ");
							
							var d = new Date(datecollection + timecollection); 
						    var time24hr = d.getHours() + ':' + d.getMinutes(); 
						    collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr+" ";
						   
							
						}
						
						var authorizedDateTime = r.labSampleWiseMasterDtoList[i].authorizeddatetime;
						var authDate = "-";
						var authDateTime = "-";
						var authoDateTimes="-";
						var dateAuth="-";
						var timeAuth="-";
						if(authorizedDateTime == null || authorizedDateTime == "null"){
							authDate = "-";
						}else{
							//authDate = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
							authDateTime = new Date(r.labSampleWiseMasterDtoList[i].authorizeddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',second: '2-digit'});
							authoDateTimes = authDateTime.split(",");

							/*dateAuth=authoDateTimes[0];
							timeAuth=authoDateTimes[1];
								
							var dateAuthSplit=dateAuth.split("/");
							var yy=dateAuthSplit[2];
							var mm=dateAuthSplit[1];
							var dd=dateAuthSplit[0];
							authDate = dd+"-"+mm+"-"+yy+"  : "+timeAuth;*/
							dateAuth=authoDateTimes[0];
							timeAuth=authoDateTimes[1];
							var dateAuthSplit=dateAuth.split("/");
							
							
							var yy=dateAuthSplit[0];
							var mm=dateAuthSplit[1];
							var dd=dateAuthSplit[2];
							
							var splittedString=timeAuth.split(":");
							var aaa=splittedString.slice(0,-1).join(':');
							//var PM = splittedString[2].split(" ");
							
							var d = new Date(dateAuth + timeAuth); 
						    var time24hr = d.getHours() + ':' + d.getMinutes(); 
						    authDate=mm+"-"+yy+"-"+dd+"  : "+time24hr+" ";
						    //alert("aaaaaaaaaaa");
						}
						
						var statusss="";
						var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
						var yy=regdatesplit[0];
						var mm=regdatesplit[1];
						var dd=regdatesplit[2];
						var regdate=dd+"-"+mm+"-"+yy;
						
						if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
							statusss="Collection Pending";
						} 
						if(r.labSampleWiseMasterDtoList[i].teststatus==2){
							statusss="Accessing Pending";
						}
						if(r.labSampleWiseMasterDtoList[i].teststatus==3){
							statusss="Accepted Done";
						}
						if(r.labSampleWiseMasterDtoList[i].teststatus==4){
							statusss="Sample Rejected";
						}
						if(r.labSampleWiseMasterDtoList[i].teststatus==5){
							statusss="Sample In Authorization";
						}
						if(r.labSampleWiseMasterDtoList[i].teststatus==6){
							statusss="Sample Reported";
						}
						
						var printData=r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;
						
						divContent = divContent+ '<tr style="height:2px;" >'
							+ "<td class='col-md-1 center'>"+srNo+"</td>"
				        	+ "<td class='col-md-1 center'>"+regdate +"</td>";
						//divContent = divContent+ "<td class='col-md-1 center'>"+authDate +"</td>";
				        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
							divContent = divContent	 + "<td class='col-md-2 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/><input type='hidden' id='emailId"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].emailId+"'/></td>";	
						}else{
							divContent = divContent	 + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/><input type='hidden' id='emailId"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].emailId+"'/></td>";	
						}
						
				        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
							//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
							/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
							+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"
							+ "<td class='col-md-1 center'>"+authDate +"</td>"
							+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
						    + "<td class='col-md-2 center'>"+statusss +"</td>"
						    + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
						    + "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
							        
			    		//divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			    		//divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"'  name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";	
					    divContent = divContent+ "<td class='col-md-1 center'>"		
							+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingprintRoutineValueResult("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
							+ "<td class='col-md-1 center'></td>";
						divContent = divContent + "<td><i class='fa fa-plus-square'></i></td>";
						if(tabId == "normal"){
							divContent = divContent + "<td><input class='testCheckBox' id='normalTestId"+(i+1)+"' name='normalTest' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";
						}else if(tabId == "abnormal"){
							divContent = divContent + "<td><input class='testCheckBox' id='abnormalTestId"+(i+1)+"' name='abnormalTest' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";
						}else if(tabId == "cAbnormal"){
							divContent = divContent + "<td><input class='testCheckBox' id='cAbnormalTestId"+(i+1)+"' name='cAbnormalTest' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";
						}
						
						var pName = r.labSampleWiseMasterDtoList[i].patientname.trim().replace(/\s+/g, "_");
					    divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-danger' id='Emailid"+(i+1)+"' value='Email' onclick=emailReportingTestPatient("+(i+1)+","+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].emailId+"\',\'"+pName+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+r.labSampleWiseMasterDtoList[i].profileId+")><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
							+ "<td class='col-md-1 center'></td>";
					}
				}
			}else{
				for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
						var str=r.labSampleWiseMasterDtoList[i].templateWise;
					
					
					var microbiology=str.startsWith("M");
					var histopath=str.startsWith("H");
					var pNo = 0;
					if(pageNumber != 0) {
						pNo = (pageNumber - 1);
					}
					var noConcat = Number(pNo + "0");
					var srNo = Number(noConcat+(i+1));
					
					var timeSesitiveValue = "";
					var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
					var str = timeValue.replace(/,/g, '');

					if (str > 0) {
						timeSesitiveValue = timeValue;
					}else{
						timeSesitiveValue = "Not Time Sensitive.";
					}
					
					var barcode = r.labSampleWiseMasterDtoList[i].barCode;
					var barcodeArray = barcode.split(",");
					var commaSeperatedBarcode = "";
					if(barcodeArray.length == 1){
						commaSeperatedBarcode = barcode;
					}else{
						for(var j = 0; j < barcodeArray.length; j++){
							commaSeperatedBarcode = commaSeperatedBarcode + barcodeArray[j] +"\n";
						}
					}
					var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
					$("#patientName").text(patinetname);
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
						collectiondatesplit=datetime.split(",");

						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
							
						var datecollectionsplit=datecollection.split("/");
						/*var yy=datecollectionsplit[2];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[0];
						collectionDateTimes = dd+"-"+mm+"-"+yy+"  : "+timecollection;
						*/
						
						
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						//var PM = splittedString[2].split(" ");
						
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes(); 
					    collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr+" ";
					   
				}
					
					var authorizedDateTime = r.labSampleWiseMasterDtoList[i].authorizeddatetime;
					var authDate = "-";
					var authDateTime = "-";
					var authoDateTimes="-";
					var dateAuth="-";
					var timeAuth="-";
					if(authorizedDateTime == null || authorizedDateTime == "null"){
						authDate = "-";
					}else{
						//authDate = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
						authDateTime = new Date(r.labSampleWiseMasterDtoList[i].authorizeddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
						authoDateTimes = authDateTime.split(",");

						/*dateAuth=authoDateTimes[0];
						timeAuth=authoDateTimes[1];
							
						var dateAuthSplit=dateAuth.split("/");
						var yy=dateAuthSplit[2];
						var mm=dateAuthSplit[1];
						var dd=dateAuthSplit[0];
						
						authDate = dd+"-"+mm+"-"+yy+"  : "+timeAuth;*/
						dateAuth=authoDateTimes[0];
						timeAuth=authoDateTimes[1];
						var dateAuthSplit=dateAuth.split("/");
						
						
						var yy=dateAuthSplit[0];
						var mm=dateAuthSplit[1];
						var dd=dateAuthSplit[2];
						
						var splittedString=timeAuth.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						//var PM = splittedString[2].split(" ");
						
						var d = new Date(dateAuth + timeAuth); 
					    var time24hr = d.getHours() + ':' + d.getMinutes(); 
					    authDate=mm+"-"+yy+"-"+dd+"  : "+time24hr+" ";
						
						
					}
					
					var statusss="";
					var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
					var yy=regdatesplit[0];
					var mm=regdatesplit[1];
					var dd=regdatesplit[2];
					var regdate=dd+"-"+mm+"-"+yy;
					
					if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
						statusss="Collection Pending";
					} 
					if(r.labSampleWiseMasterDtoList[i].teststatus==2){
						statusss="Accessing Pending";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==3){
						statusss="Accepted Done";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==4){
						statusss="Sample Rejected";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==5){
						statusss="Sample In Authorization";
					}
					if(r.labSampleWiseMasterDtoList[i].teststatus==6){
						statusss="Sample Reported";
					}
					
					var printData = r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;

					// alert(r.labSampleWiseMasterDtoList[i].printCount);
					
					// Newly added  code by ROHIT AMBAWADE on 23 Nov 2021 for print color change
					var str_style = " ";
					if(r.labSampleWiseMasterDtoList[i].printCount > 0)
					{
						var str_style = "color: green;";
					}else{
						var str_style = "background: #FFF;color: #121212;";
					}
					// ===========================================================================
					var tempWise = (r.labSampleWiseMasterDtoList[i].templateWise).split(",");
					
					
					var tempWiseCount = 0;
					for (var j=0;j<tempWise.length;j++){
					     if((tempWise[j] != "N") || (tempWise != "N")){
					    	 tempWiseCount = 1;
					     }else{
					    	
					    	 tempWiseCount = 0;
					    	 }
					}
					
					
					
					divContent = divContent+ '<tr style="height:2px;'+str_style+'" >'
						+ "<td class='col-md-1 center'>"+srNo+"</td>"
			        	+ "<td class='col-md-1 center'>"+regdate +"</td>";
			        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
						divContent = divContent	 + "<td class='col-md-2 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/><input type='hidden' id='emailId"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].emailId+"'/></td>";	
					}else{
						divContent = divContent	 + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/><input type='hidden' id='emailId"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].emailId+"'/></td>";	
					}
			        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
						//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
						+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
						/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/		
						+ "<td class='col-md-1 center'>"+commaSeperatedBarcode+"</td>"
						+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"
						+ "<td class='col-md-1 center'>"+authDate +"</td>"
						+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					    + "<td class='col-md-2 center'>"+statusss +"</td>"
					    + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					    + "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
						        
		    		//divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
		    		//divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"'  name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";	
			        if(tabId === "templateTest"){
						  divContent = divContent+ "<td class='col-md-1 center'>"		
							+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingprintTemplateWiseResult("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
						    + "<td class='col-md-1 center'></td>";
					}if(tabId === "patientWise" && tempWiseCount > 0){
						  divContent = divContent+ "<td class='col-md-1 center'>"		
							+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingprintTemplateWiseResult("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
						    + "<td class='col-md-1 center'></td>";
					}else if(histopath == true){
				        divContent = divContent+ "<td class='col-md-1 center'>"		
							+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingprintTemplateWiseResult("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
						    + "<td class='col-md-1 center'></td>";
					}else if(microbiology == true){
				        divContent = divContent+ "<td class='col-md-1 center'>"		
						+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingMicrobiologyPrint("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
					    + "<td class='col-md-1 center'></td>";
				}else{
			        divContent = divContent+ "<td class='col-md-1 center'>"		
					+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingprintRoutineValueResult("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
				    + "<td class='col-md-1 center'></td>";
					}
					divContent = divContent + "<td><i class='fa fa-plus-square'></i></td>";
					//removed disabled from below line of code by Rohit on 18-08-2021 repoting email checkbox button
					//divContent = divContent + "<td><input class='testCheckBox'  id='allTestId"+(i+1)+"' name='allTest' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";
					divContent = divContent + "<td><input class='testCheckBox'  id='allTestId"+(i+1)+"' name='allTest' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'  onclick=checkDistinctTreatment("+(i+1)+",\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\')  ></td>"; 
					divContent = divContent + "<td><input class='testCheckBox'  id='printTreatId"+(i+1)+"' name='printName' type='hidden' value=\'"+r.labSampleWiseMasterDtoList[i].treatmentId+"\' ></td>";
					var pName = r.labSampleWiseMasterDtoList[i].patientname.trim().replace(/\s+/g, "_");
					divContent = divContent+ "<td class='col-md-1 center'>" 
					//removed disabled from Rohit on 18-08-2021 reporting email button
						+ "<input type='button' class='btn btn-xs btn-danger'  id='Emailid"+(i+1)+"' value='Email' onclick=emailReportingTestPatient("+(i+1)+","+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].emailId+"\',\'"+pName+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+r.labSampleWiseMasterDtoList[i].profileId+")><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";
				}
			}
		}
		if(tabId=="normal"){
			tableBody = "reportingNormalTableBody";	
		}else if(tabId=="abnormal"){
			tableBody = "reportingAbnormalTableBody";
		}else if(tabId=="cAbnormal"){
			tableBody = "reportingCAbnormalTableBody";
		}else if(tabId=="templateWise"){
			tableBody = "reportingTemplateWiseTableBody";
		}else if(tabId=="patientWise"){
			tableBody = "reportingPatientWiseTableBody";
		}else if(tabId=="patientPrinttWise"){
			tableBody = "reportingPatientPrintBody";
		}
		else{
			tableBody = "reportingAllTableBody";
		}
		$('#'+tableBody).html(divContent);
	}else if(type == "processingAutoSugg" || type == "authorizationAutoSugg" || type == "outSourceAutoSugg"){
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.var pNo = 0;
			
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				//added by Rohit on 27-09-2021
				var str = r.labSampleWiseMasterDtoList[i].templateWise;
				var microbiologywise = str.startsWith("M");
				var histopathwise = str.startsWith("H");
				
				var pNo = 0;
				if (pageNumber != 0) {
					pNo = (pageNumber - 1);
				}
				var noConcat = Number(pNo + "0");
				var srNo = Number(noConcat+(i+1));
				
				var timeSesitiveValue = "";
				var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
				var str = timeValue.replace(/,/g, '');
				if (str > 0) {
					timeSesitiveValue = timeValue;
				}else{
					timeSesitiveValue = "Not Time Sensitive.";
				}
				
				var patinetname=r.labSampleWiseMasterDtoList[i].patientname+"/ "+r.labSampleWiseMasterDtoList[i].patientage+" "+r.labSampleWiseMasterDtoList[i].patientgander;
					$("#patientName").text(patinetname);
					var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
					var datetime = "-";
					var collectionDateTimes="-";
					var datecollection="-";
					var timecollection="-";
					if(dateToCheck == null || dateToCheck == "null"){
						datetime = "-";
					}else{
						datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  
					
						collectiondatesplit=datetime.split(",");

						datecollection=collectiondatesplit[0];
						timecollection=collectiondatesplit[1];
						
						var datecollectionsplit=datecollection.split("/");
						var yy=datecollectionsplit[0];
						var mm=datecollectionsplit[1];
						var dd=datecollectionsplit[2];
						
						var splittedString=timecollection.split(":");
						var aaa=splittedString.slice(0,-1).join(':');
						//var PM = splittedString[2].split(" ");
						
						var d = new Date(datecollection + timecollection); 
					    var time24hr = d.getHours() + ':' + d.getMinutes(); 
						
					     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+time24hr;
					    // alert("collectionDateTimes"+collectionDateTimes)
					}
				var statusss="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
				if(r.labSampleWiseMasterDtoList[i].teststatus ==1){
					statusss="Collection Pending";
				} 
				if(r.labSampleWiseMasterDtoList[i].teststatus==2){
					statusss="Accessing Pending";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==3){
					statusss="Accepted Done";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==4){
					statusss="Sample Rejected";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==5){
					statusss="Sample In Authorization";
				}
				if(r.labSampleWiseMasterDtoList[i].teststatus==6){
					statusss="Sample Reported";
				}
				
				var printData=r.labSampleWiseMasterDtoList[i].barCode+"_"+r.labSampleWiseMasterDtoList[i].patientname+"_"+r.labSampleWiseMasterDtoList[i].profileName+"_"+r.labSampleWiseMasterDtoList[i].treatmentId;

				// alert(r.labSampleWiseMasterDtoList[0].printCount);
				
				// Newly added  code by ROHIT AMBAWADE on 23 Nov 2021 for print color change
				var str_style = " ";
				if(r.labSampleWiseMasterDtoList[i].printCount > 0)
				{
					var str_style = "color: green;";
				}else if(r.labSampleWiseMasterDtoList[i].printCount == 0){
					var str_style = "background: #FFF;color: #121212;";
				}
				// ===========================================================================
				
				divContent = divContent+ '<tr style="height:2px;'+str_style+'">'		
				+ "<td class='col-md-1 center'>"+srNo+"</td>"
		        	+ "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-2 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/><input type='hidden' id='emailId"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].emailId+"'/></td>";	
				}else{
					divContent = divContent	 + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"<input type='hidden' id='patientnamee"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].patientname+"'/><input type='hidden' id='masterId11' value='"+r.labSampleWiseMasterDtoList[i].masterId+"'/><input type='hidden' id='tratmentId11' value='"+r.labSampleWiseMasterDtoList[i].treatmentId+"'/><input type='hidden' id='patientgander' value='"+r.labSampleWiseMasterDtoList[i].patientgander+"'/><input type='hidden' id='emailId"+(i+1)+"' value='"+r.labSampleWiseMasterDtoList[i].emailId+"'/></td>";	
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"
					//+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"
					/*+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"*/
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+statusss +"</td>"
				    + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
				    + "<td style='display:none' id='popupdata"+i+"' value=\'"+printData+"\'>"+printData+" </td>";
					        
			    if(type == "authorizationAutoSugg"){
			    	//alert("forwordPageAuthorizedRoutineValue::");
			    /*	divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].pathlogistName+"</td>";*/
			    	divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
			    	// removed by ROHIT on 16Oct 2022 for the print barcode button 'disabled='disabled'
			        divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' onclick=generateBarcodePopup1("+i+") ></td>";	
					    + "<td class='col-md-1 center'></td>";   
			    	divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageAuthorizedRoutineValue(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+","+r.labSampleWiseMasterDtoList[i].profileId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";
				        
				        if(tabId=="normal"){        	
			        		   $('#bulkPost').show();
			        		   $('#bulksapmle').show();
			        		   // for covid report only if condition apply
			        		   var CovidReportProfileId= $("#CovidReportProfileId").val();
			        		   var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
			        		   var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
			        		   /*if(CovidReportProfileId==r.labSampleWiseMasterDtoList[i].profileId || SARSCOV2ANTIGEN== r.labSampleWiseMasterDtoList[i].profileId || COVID19RNAAMPLIFICATION == r.labSampleWiseMasterDtoList[i].profileId)
			        			{ 
			        			  //s alert("DDDDD");
								    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 
			        			}else
			        			{
			        				  
								    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' disabled='disabled'  type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 
			        			}	*/
							    divContent = divContent + "<td><input class='testCheckBox allChecked' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 

				       }else{
				    	   $('#bulkPost').hide();
				    	   $('#bulksapmle').hide();
				       }   ;		 
	    		}else if(type == "reportingAutoSugg"){
	    			divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
	    			divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"'  name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";	
			    	divContent = divContent+ "<td class='col-md-1 center'>"		
					+ "<input type='button' class='btn btn-xs btn-primary' id='PDFid' value='PDF' onclick=reportingprintRoutineValueResult("+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+(i+1)+","+r.labSampleWiseMasterDtoList[i].profileId+") ></td>";	
					    + "<td class='col-md-1 center'></td>";
					divContent = divContent + "<td><i class='fa fa-plus-square'></i></td>";    
			    	divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"'  name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td>";    
			    	var pName = r.labSampleWiseMasterDtoList[i].patientname.trim().replace(/\s+/g, "_");
			    	divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-danger' id='Emailid"+(i+1)+"' value='Email' onclick=emailReportingTestPatient("+(i+1)+","+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',\'"+r.labSampleWiseMasterDtoList[i].emailId+"\',\'"+pName+"\',\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\',"+r.labSampleWiseMasterDtoList[i].profileId+")><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";
					    
					if(tabId=="normal"){
						tableBody = "reportingNormalTableBody";	
					}else if(tabId=="abnormal"){
						tableBody = "reportingAbnormalTableBody";
					}else if(tabId=="cAbnormal"){
						tableBody = "reportingCAbnormalTableBody";
					}else{
						tableBody = "reportingAllTableBody";
					}
		    	}else if(type == "processingAutoSugg" && tabId == "accessionpatho"){
		    		
		    		divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].pathlogistName+"</td>";
		    		
		    		divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					
		    		divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' disabled='disabled' onclick=generateBarcodePopup3("+i+") ></td>";	
					    + "<td class='col-md-1 center'></td>";   
					
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageProcessingRoutineValueOnPathologist(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";
						
	
				}else if(type == "outSourceAutoSugg"){
					divContent = divContent  + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>";		    
					divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";	
			    	divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' disabled='disabled' onclick=generateBarcodePopup1("+i+") ></td>";	
					    + "<td class='col-md-1 center'></td>";	
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='SendOutSource' onclick=viewOutSourceTestforResult1() ><input type='hidden' id='sendoutsource'  value='"+r.labSampleWiseMasterDtoList[i].masterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";
				}else{
					divContent = divContent+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='routineId' value='Print Barcode' disabled='disabled' onclick=generateBarcodePopup2("+i+") ></td>";	
				    	+ "<td class='col-md-1 center'></td>";	
				    	if(histopathwise == true){
				    		divContent = divContent+ "<td class='col-md-1 center'>" 
							+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageProcessingRoutineValueTemplateWise(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+","+r.labSampleWiseMasterDtoList[i].profileId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
							+ "<td class='col-md-1 center'></td>";
				    	}else{
				    divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='routineId' value='Routine value' onclick=forwordPageProcessingRoutineValue(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+","+r.labSampleWiseMasterDtoList[i].patientId+","+r.labSampleWiseMasterDtoList[i].sampleTypeId+","+r.labSampleWiseMasterDtoList[i].profileId+") ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";
				    	}
						
						  var CovidReportProfileId= $("#CovidReportProfileId").val();
		        		  var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
		        		  var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
		        		  var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
		        		  var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
		        		  

		        		  if(CovidReportProfileId==r.labSampleWiseMasterDtoList[i].profileId || SARSCOV2ANTIGEN== r.labSampleWiseMasterDtoList[i].profileId || COVID19RNAAMPLIFICATION == r.labSampleWiseMasterDtoList[i].profileId || REALTIMEHEPATITISCVIRUSHCV == r.labSampleWiseMasterDtoList[i].profileId || REALTIMETRUENAT == r.labSampleWiseMasterDtoList[i].profileId)
		        		  {
			        		  divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid'  type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'></td></tr>";
		        		   }else
		        			{
				        	  divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled'  type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'></td></tr>";
		        			}	

						 /*if(r.labSampleWiseMasterDtoList[i].profileId==CovidReportProfileId || r.labSampleWiseMasterDtoList[i].profileId==COVID19RNAAMPLIFICATION || r.labSampleWiseMasterDtoList[i].profileId==SARSCOV2ANTIGEN){
							 divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid'  type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'></td></tr>";
					     }else{
					    	 + "<td class='col-md-1 center'></td>";	
							 // divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\'></td></tr>";
					     }*/
		    	}
			}
		}
		$('#proccessingtabId').html(divContent);
		$('#proccessingtabId1').html(divContent);
	}else if(type == "BTOBRecollection" || type == "BTOCRecollection" ){
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var timeSesitiveValue = "";
				var timeValue = r.labSampleWiseMasterDtoList[i].timeSensitiveValue;
				var str = timeValue.replace(/,/g, '');
				
				if(str > 0) {
					timeSesitiveValue = timeValue;
				}else{
					timeSesitiveValue = "Not Time Sensitive.";
				}

				var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
				var datetime = "-";
				var collectionDateTimes="-";
				var datecollection="-";
				var timecollection="-";
				
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  
				
					collectiondatesplit=datetime.split(",");

					datecollection=collectiondatesplit[0];
					timecollection=collectiondatesplit[1];
					
					var datecollectionsplit=datecollection.split("/");
					var yy=datecollectionsplit[0];
					var mm=datecollectionsplit[1];
					var dd=datecollectionsplit[2];
				     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+timecollection;
				}
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
				
				divContent = divContent+ '<tr style="height:2px;" >'							
					+ "<td class='col-md-1 center'>"+regdate+"</td>";
			        
				if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
					
				divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].patientmobile +"</td>"		
					//+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"	
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode +"</td>"
					+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"	
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
					+ "<td class='col-md-2 center'><input type='button' class='btn btn-xs btn-success' id='rejectedTest' value='Test View' onclick=gettestViewRecollectionRequest(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\') ></td>"	
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"
			     
				if(tabId == "ALBToB") {
					divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].testReasonName + "</td>";
					divContent = divContent	+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					divContent = divContent + "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='SendToPhlebotomy' onclick=sendToPhlebotomyRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2B','recollection')  ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
                        + "<td class='col-md-1 center'></td>";	
                    divContent = divContent + "<td class='col-md-1 center'>" 
                    	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick=rejectSampleFromRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2B','recollection')   ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
                        + "<td class='col-md-1 center'></td>";	                        
                    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";

                    $('#accessionRecordTableBody').html(divContent);	
				} else if(tabId == "rejectedSampleBToB") {
					divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].testReasonName + "</td>";
					divContent = divContent	+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					divContent = divContent + "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='SendToPhlebotomy'  onclick=sendToPhlebotomyRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2B','reject') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
                        + "<td class='col-md-1 center'></td>";
                    
                    divContent = divContent + "<td class='col-md-1 center'>" 
                        + "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Drop' onclick=dropSampleFromRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2B','reject')   ></td>";	
                        + "<td class='col-md-1 center'></td>";		                        
                   	divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";     
						
					$('#rejectedSampleTabId').html(divContent);   
				} else if(tabId == "pathoRecollectionBToB") {
					divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].testReasonName + "</td>";
					divContent = divContent	+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					divContent = divContent + "<td class='col-md-1 center'>" 
				    	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='SendToProcessing' onclick=getPathologistRecollectionTest(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\','sendTest') ></td>";	
				    	+ "<td class='col-md-1 center'></td>";				          
				    divContent = divContent + "<td class='col-md-1 center'>" 
				    	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick=getPathologistRecollectionTest(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\','rejectTest') ></td>";	
				    	+ "<td class='col-md-1 center'></td>";	                           
				    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
						
					$('#pathologyRecolltionId').html(divContent);
				} else if(tabId == "ALBToC") {
					divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].testReasonName + "</td>";
					divContent = divContent	+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
				    divContent = divContent + "<td class='col-md-1 center'>" 
				                            + "<input type='button' class='btn btn-xs btn-success' id='testType' value='SendToPhlebotomy' onclick=sendToPhlebotomyRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2C','recollection')   ></td>";	
				                            + "<td class='col-md-1 center'></td>";	
				                            
				                            
				    divContent = divContent + "<td class='col-md-1 center'>" 
				                            + "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick=rejectSampleFromRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2C','recollection')    ></td>";	
				                            + "<td class='col-md-1 center'></td>";	                        
				                            
				    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
					$('#allRecordBtoC').html(divContent);	      
				} else if(tabId == "rejectedSampleBToC") {
					divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].testReasonName + "</td>";
					divContent = divContent	+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					
					divContent = divContent + "<td class='col-md-1 center'>" 
				                            + "<input type='button' class='btn btn-xs btn-success' id='testType' value='SendToPhlebotomy' onclick=sendToPhlebotomyRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2C','reject')    ></td>";	
				                            + "<td class='col-md-1 center'></td>";	
				   
				   divContent = divContent + "<td class='col-md-1 center'>" 
				                            + "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Drop' onclick=dropSampleFromRecollection(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\','B2C','reject')   ></td>";	
				                            + "<td class='col-md-1 center'></td>";	                        
				                                                   
				    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				      		
					$('#rejectedSampleTabIdBtoC').html(divContent);  
				} else if(tabId == "pathoRecollectionBToC") {
					divContent = divContent	+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].testReasonName + "</td>";
					divContent = divContent	+ "<td class='col-md-1 center'>"+timeSesitiveValue+"</td>";
					divContent = divContent + "<td class='col-md-1 center'>" 
				    	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='SendToProcessing' onclick=getPathologistRecollectionTest(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\','sendTest') ></td>";	
				        + "<td class='col-md-1 center'></td>";				          
				    divContent = divContent + "<td class='col-md-1 center'>" 
				    	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick=getPathologistRecollectionTest(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\',"+r.labSampleWiseMasterDtoList[i].treatmentId+",\'"+r.labSampleWiseMasterDtoList[i].patientgander+"\','rejectTest') ></td>";	
				        + "<td class='col-md-1 center'></td>";	                        
				    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}			 			 			
			}			
		}
		if(tabId == "ALBToB"){
			tableBody = "accessionRecordTableBody";	
		}else if(tabId=="rejectedSampleBToB"){
			tableBody = "rejectedSampleTabId";
		}else if(tabId=="pathoRecollectionBToB"){
			tableBody = "pathologyRecolltionId";
		}else if(tabId=="ALBToC"){
			tableBody = "allRecordBtoC";	
		}else if(tabId=="rejectedSampleBToC"){
			tableBody = "rejectedSampleTabIdBtoC";
		}else if(tabId=="pathoRecollectionBToC"){
			tableBody = "pathologyRecolltionIdBtoC";
		}else{
			tableBody = "pathologyRecolltionIdBtoC";
		}
		$('#'+tableBody).html(divContent);
		//$('#pathologyRecolltionIdBtoC').html(divContent);
	}else if(type == "b2bCollection"){
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var dateToCheck = r.labSampleWiseMasterDtoList[i].collecteddatetime;
				var datetime = "-";
				var collectionDateTimes="-";
				var datecollection="-";
				var timecollection="-";
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime = new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  
				
					collectiondatesplit=datetime.split(",");

					datecollection=collectiondatesplit[0];
					timecollection=collectiondatesplit[1];
					
					var datecollectionsplit=datecollection.split("/");
					var yy=datecollectionsplit[0];
					var mm=datecollectionsplit[1];
					var dd=datecollectionsplit[2];
				     collectionDateTimes=mm+"-"+yy+"-"+dd+"  : "+timecollection;
				}
				var status="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
			    if(r.labSampleWiseMasterDtoList[i].teststatus == 101){
					status="Collection Pending";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus == 102){
					status="Collected";
				}
				divContent = divContent+ '<tr style="height:2px;" >'							
				
		        + "<td class='col-md-1 center'>"+regdate+"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        var ids = [];
		         ids = (r.labSampleWiseMasterDtoList[i].masterId).split(",");

		         divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
		        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'> <input type='text' style='text-align:center;' id='barCode"+ids[0]+"' value="+r.labSampleWiseMasterDtoList[i].barCode+"></td>"
					+ "<td class='col-md-2 center'>"+collectionDateTimes+"</td>"								
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+status+"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"					    
			        //+ "<td class='col-md-1 center'>-</td>";
		 
				if(r.labSampleWiseMasterDtoList[i].teststatus =="101"){ 
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Collect' onclick=collectSample(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";
	       
					divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick='rejectSamplePopup(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \"collection\",\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\")'></td>";	
					    + "<td class='col-md-1 center'></td>";				        
	        
			        //divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus =="4"){  
					divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Collect' disabled='disabled'  onclick=collectSample(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\')><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";
	        
			        divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='Unreject'  onclick='unrejectSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \"collection\");'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";				        
	        
				    //divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 
				}else{
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Collect' disabled='disabled'  onclick=collectSample(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";
		        
				    divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' disabled='disabled' onclick='rejectSamplePopup(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \"collection\",\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\");'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";				        
		        
				    //divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}
			}					
		}
		$('#collectionRecordTableBody').html(divContent);
				
	}else if(type == "b2bCollected"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
			    var datetime= new Date(r.labSampleWiseMasterDtoList[i].runnerCollectedDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti				
			    var status="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
			    if(r.labSampleWiseMasterDtoList[i].teststatus == 101){
					status="Collection Pending";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus == 102){
					status="Collected";
				}
			    
				divContent = divContent+ '<tr style="height:2px;" >'							
			
		        + "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
		        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode+"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].transferedToName+"</td>"
					+ "<td class='col-md-2 center'>"+datetime+"</td>"								
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+status+"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"					    
			        //+ "<td class='col-md-1 center'>-</td>";
		 
				if(r.labSampleWiseMasterDtoList[i].teststatus =="102"){ 
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Submit' onclick=acceptSample(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";
	       
					divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' onclick='rejectSamplePopup(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \"collected\",\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\");'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
					    + "<td class='col-md-1 center'></td>";				        
	        
			        divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus =="4"){  
					divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Submit' disabled='disabled'  onclick=acceptSample(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
						+ "<td class='col-md-1 center'></td>";
	        
			        divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='Unreject'  onclick='unrejectSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \"collected\");'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";				        
	        
				    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>"; 
				}else{
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-success' id='testType' value='Submit' disabled='disabled'  onclick=acceptSample(\'"+r.labSampleWiseMasterDtoList[i].masterId+"\') ><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";
		        
				    divContent = divContent+ "<td class='col-md-1 center'>" 
					 	+ "<input type='button' class='btn btn-xs btn-danger' id='testType' value='Reject' disabled='disabled' onclick='rejectSamplePopup(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \"collected\",\""+r.labSampleWiseMasterDtoList[i].sampleTypeId+"\");'><input type='hidden' id='holdId'  value='"+r.labSampleWiseMasterDtoList[i].sampleWiseMasterId+"'></td>";	
				        + "<td class='col-md-1 center'></td>";				        
		        
				    divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
				}
			}
					
		}
		$('#collectedRecordTableBody').html(divContent);
	}else if(type == "b2bRejected"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var dateToCheck = r.labSampleWiseMasterDtoList[i].runnerCollectedDate;
				var datetime = "-";
				
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime= new Date(r.labSampleWiseMasterDtoList[i].runnerCollectedDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
				}
			    
				var status="";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
			    var callFrom = "";
			    if(r.labSampleWiseMasterDtoList[i].b2BRejectedFrom == 101){
			    	callFrom = "collection";
			    }else if(r.labSampleWiseMasterDtoList[i].b2BRejectedFrom ==102){
			    	callFrom = "collected";
			    }
			    
			    if(r.labSampleWiseMasterDtoList[i].teststatus == 4){
					status="Rejected";
				}
			    
				divContent = divContent+ '<tr style="height:2px;" >'							
		        	+ "<td class='col-md-1 center'>"+regdate+"</td>";
		        
				if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
		        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode+"</td>"
					+ "<td class='col-md-2 center'>"+datetime+"</td>"								
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+status+"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"				    
				    
			    divContent = divContent+ "<td class='col-md-1 center'>" 
					+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='Unreject'  onclick='unrejectSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\", \""+callFrom+"\");'></td>";	
				    + "<td class='col-md-1 center'></td>";				        
				divContent = divContent+ "<td class='col-md-2 center'>" 
					+ "<button value='Delete' class='btn btn-xs btn-danger deleteUserAccess' onclick='dropSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\");'><i class='fa fa-trash-o'></i></td>";	
					+ "<td class='col-md-1 center'></td>";
			}
				
		}
		$('#rejectedRecordTableBody').html(divContent);		
	}else if(type == "b2bAssign"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
		
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
				var dateToCheck = r.labSampleWiseMasterDtoList[i].runnerCollectedDate;
				var datetime = "-";
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime= new Date(r.labSampleWiseMasterDtoList[i].runnerCollectedDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  
				}
			    
				var status = "Assignment Pending";
			    
				divContent = divContent+ '<tr style="height:2px;" >'							
		        	+ "<td class='col-md-1 center'>"+regdate+"</td>";
		        
				if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
		        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode+"</td>"
					+ "<td class='col-md-2 center'>"+datetime+"</td>"								
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+status+"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"	
				    
				divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";				        
			}		
		}
		$('#sampleAssignTableBody').html(divContent);
		
	}else if(type == "b2bAssigned"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		
			$('#sampleAssignedTableBody').html(divContent);

		} else {
			

			var runnerBoysList = [];
			var divContent = "";
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var dateToCheck = r.labSampleWiseMasterDtoList[i].runnerAssignedDate;
				var datetime = "-";
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime= new Date(r.labSampleWiseMasterDtoList[i].runnerAssignedDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
				}

				var runnerCollectedDate = r.labSampleWiseMasterDtoList[i].runnerCollectedDate;
				var collectionDateTime = "-";
				if(runnerCollectedDate == null || runnerCollectedDate == "null"){
					collectionDateTime = "-";
				}else{
					collectionDateTime= new Date(r.labSampleWiseMasterDtoList[i].runnerCollectedDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}); 
				}
				
				var runnerAssigned = r.labSampleWiseMasterDtoList[i].runnerAssignedName;
				var sampleAssignedTo = "-";
				if(runnerAssigned == null || runnerAssigned == "null"){
					sampleAssignedTo = "-";
				}else{
					sampleAssignedTo = r.labSampleWiseMasterDtoList[i].runnerAssignedName;
				}
				var runnerAssignedId = r.labSampleWiseMasterDtoList[i].runnerAssigned;
				runnerBoysList.push(runnerAssignedId+"~"+sampleAssignedTo);
				
				var status="";
			    if(r.labSampleWiseMasterDtoList[i].teststatus == 101){
					status="Collection Pending";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus == 102){
					status="Collected";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus == 4){
					status="Rejected";
				}

				divContent = divContent+ '<tr style="height:2px;" >'							
		        	+ "<td class='col-md-1 center'>"+regdate +"</td>";
		        
				if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
		        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode+"</td>"
					+ "<td class='col-md-2 center'>"+collectionDateTime+"</td>"
					+ "<td class='col-md-2 center'>"+datetime+"</td>"				
					+ "<td class='col-md-2 center'>"+sampleAssignedTo+"</td>"
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+status+"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"	
				
				
				if(r.labSampleWiseMasterDtoList[i].teststatus == 102 || r.labSampleWiseMasterDtoList[i].teststatus == 4){
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='Unassign'  disabled='disabled' onclick='unassignSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\");'></td>";	
						+ "<td class='col-md-1 center'></td>";
				}else{
					divContent = divContent+ "<td class='col-md-1 center'>" 
						+ "<input type='button' class='btn btn-xs btn-warning' id='testType' value='Unassign'  onclick='unassignSample(\""+r.labSampleWiseMasterDtoList[i].masterId+"\");'></td>";	
						+ "<td class='col-md-1 center'></td>";
				}
			}
			$('#sampleAssignedTableBody').html(divContent);
			var uniqueRunnerBoysList = runnerBoysList.filter(function(itm, i, a) {
			    return i == a.indexOf(itm);
			});
			setRunnerBoysFilter(uniqueRunnerBoysList);		
		}				
	}else if(type == "b2bRunnerTransfer"){
		
		var divContent = "";
		if (r.labSampleWiseMasterDtoList.length == 0 || r.labSampleWiseMasterDtoList.length == null) {
			// no records.
			divContent = divContent
					+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
		} else {
			
			for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
				var dateToCheck = r.labSampleWiseMasterDtoList[i].runnerAssignedDate;
				var datetime = "-";
				
				if(dateToCheck == null || dateToCheck == "null"){
					datetime = "-";
				}else{
					datetime = new Date(r.labSampleWiseMasterDtoList[i].runnerAssignedDate).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});  //by kranti
				}

				var runnerAssigned = r.labSampleWiseMasterDtoList[i].runnerAssignedName;
				var sampleAssignedTo = "-";
				if(runnerAssigned == null || runnerAssigned == "null"){
					sampleAssignedTo = "-";
				}else{
					sampleAssignedTo = r.labSampleWiseMasterDtoList[i].runnerAssignedName;
				}
				var regdatesplit=r.labSampleWiseMasterDtoList[i].datetime.split("-");
				var yy=regdatesplit[0];
				var mm=regdatesplit[1];
				var dd=regdatesplit[2];
				var regdate=dd+"-"+mm+"-"+yy;
				var transferedFrom = r.labSampleWiseMasterDtoList[i].transferedFromName;
				var transferedFromName = "-";
				if(transferedFrom == null || transferedFrom == "null"){
					transferedFromName = "-";
				}else{
					transferedFromName = r.labSampleWiseMasterDtoList[i].transferedFromName;
				}
				
				var transferedTo = r.labSampleWiseMasterDtoList[i].transferedToName;
				var transferedToName = "-";
				if(transferedTo == null || transferedTo == "null"){
					transferedToName = "-";
				}else{
					transferedToName = r.labSampleWiseMasterDtoList[i].transferedToName;
				}
				
				var status="";
			    if(r.labSampleWiseMasterDtoList[i].teststatus == 101){
					status="Collection Pending";
				}else if(r.labSampleWiseMasterDtoList[i].teststatus == 102){
					status="Collected";
				}
			    
				divContent = divContent+ '<tr style="height:2px;" >'							
				
		        + "<td class='col-md-1 center'>"+regdate +"</td>";
		        if(r.labSampleWiseMasterDtoList[i].emergencyflag=="Y"){
					divContent = divContent	 + "<td class='col-md-1 center' style='color:red;'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}else{
					divContent = divContent	 + "<td class='col-md-1 center' >"+r.labSampleWiseMasterDtoList[i].patientname +"</td>";
				}
				
		        var ids = [];
		         ids = (r.labSampleWiseMasterDtoList[i].masterId).split(",");

		         divContent = divContent	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerPatientId +"</td>"						
		        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].centerName+"</td>"		
					+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].docname+"</td>"		
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].barCode+"</td>"
					+ "<td class='col-md-2 center'>"+datetime+"</td>"
					+ "<td class='col-md-2 center'>"+sampleAssignedTo+"</td>"
					
					+ "<td class='col-md-2 center'>"+transferedFromName+"</td>"
					+ "<td class='col-md-2 center'>"+transferedToName+"</td>"
					
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].profileName +"</td>"	
				    + "<td class='col-md-2 center'>"+status+"</td>"
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].samplename +"</td>"						  
				    + "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].containername +"</td>"					    
		 
				 var isTransfered = r.labSampleWiseMasterDtoList[i].isTransfered;
		         if(isTransfered == "Y")
		        	 divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' disabled='disabled' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
		         else
		        	 divContent = divContent + "<td><input class='testCheckBox' id='testid"+(i+1)+"' name='testid' type='checkbox' value=\'"+r.labSampleWiseMasterDtoList[i].masterId+"\' ></td></tr>";
			}					
		}
		$('#runnerWiseTableBody').html(divContent);		
	}
}

function setRunnerBoysFilter(uniqueRunnerBoysList){
	var dropDownList = dropDownList	+ "<option value='-1'>Runner Boy</option>";
	for (var i = 0; i < uniqueRunnerBoysList.length; i++) {
		var data = uniqueRunnerBoysList[i].split("~");
		var runnerBoyId = data[0];
		var runnerBoyName = data[1];
		dropDownList = dropDownList + "<option value="
				+ runnerBoyId+" data-name="+runnerBoyId+">"
				+ runnerBoyName+"</option>";
	}
	$("#runnerBoyFilter").html(dropDownList);
	$("#runnerBoyFilter").select2();
}

/********************************************************
* @author Ajay s khandare
* @since 06-03-2020
* @comment for   Bulk Post sample in Autho Record Tab 
*********************************************************/
function bulkPostRecord() {	
   idList = [];
   var currentId;	
   $("#proccessingtabId").find('input[name="testid"]').each(function() {
					if ($(this).is(":checked")) {
						currentId = $('#' + this.id).val();
						if (currentId != 0) {
							idList.push(currentId);
							
						}
					}
				});
   
   idList = idList.join('-');
	if (idList.length == 0) {
		alert("Please Select at least One Sample/Test!");
		return false;
	}
	if (idList.length > 0) {
		var r = "";		
		r = confirm("Are You Sure You Want To Bulk Post this Samples/Test ?");
		if (r == true) {
			var inputs = [];
			inputs.push('id=' + encodeURIComponent(idList));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/phlebotomy/bulkPostRecord",
				timeout : 1000 * 60 * 5,
				catche : false,
				beforeSend : function() {
					$('#ajaxloaderimg').show();
					$('#proccessingtabIdtable').hide();
					$('#bulkPost').hide();					
				},
				complete : function() {
					$('#ajaxloaderimg').hide();
					$('#proccessingtabIdtable').show();
					$('#bulkPost').show();
				},error : function() {
					alert('Network Issue!');
				},
				success : function(r) {					
					alertify.success("Bulk Post Successfully");	
					//getProcessingRecord('AA');
					searchLabTestPatient("authorizationSearchBtn");
					//getRecordCountForAuthorizeTabIndicator();
				}
			});
		}
	}
}
/**********************************************************************************
 * @author Ajay Khandare
 * @date 13_sep_2020
 * @Code This function is open upload Document Popup
 **********************************************************************************/
function viewDocument(outsourceId,treatmentId)
{
	$('#tretId').val(treatmentId);
	$('#slaveId').val(outsourceId);
	$("#uploadDocumentModal").modal('show');
	getOutsourceDocument();
}


/****************************************************************************************************
 * @author Ajay Khandare
 * @date 13_sep_2020
 * @comment for get file value(only name)
******************************************************************************************************/	
function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

/**********************************************************************************
  * @author Ajay Khandare
 * @date 13_sep_2020
 * @Code This function is upload Document
 **********************************************************************************/
function saveOutsourceDocument(){
	var form = $("#outsourcedocumentForm")[0];
	 if( document.getElementsByName("outsourcedocumentForm").length == 0 || $("#uploadedFile").val()==""){
		    alert("Please select file");
		    return false;
		}
	var treatmentId = $('#tretId').val();
	var id = $('#slaveId').val();
	var uploadedFile = getFileValue('uploadedFile');
	 var data = new FormData(form);
	 data.append("documentUpload", uploadedFile);
	 data.append("treatmentId", treatmentId);
	 data.append("id",id);
	 jQuery.ajax({
			async : true,
			type : "POST",
			enctype: 'multipart/form-data',
			url : "ehat/phlebotomy/saveOutsourceDocument",
			data : data,
			processData: false,
	        contentType: false,
	   	 	catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r==2){
					alertify.success("Document Uploaded Successfully");
				}else if(r==1){
					alertify.error("One or more file is duplicate.");
				}else{
					alertify.error("Failed To upload");
				}
				getOutsourceDocument();
				$("#uploadedFile").val("");
			}
		});
}


/****************************************************************************************************
 * @author Ajay Khandare
 * @date 13_sep_2020
 * @comment for get uploaded child Patient document for document tab
******************************************************************************************************/	
function getOutsourceDocument(){
	var treatmentId = $('#tretId').val();
	var id = $('#slaveId').val();
	//alert(id+","+treatmentId);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			treatmentId : treatmentId,
			id : id
			},
		url : "ehat/phlebotomy/getOutsourceDocumentsById",
		success : function(r) {
			var htmBody = "";
	    	if (r.sendToOutSourceDocumentDtoList.length == 0 || r.sendToOutSourceDocumentDtoList.length == null) {
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {
				for ( var i = 0; i < r.sendToOutSourceDocumentDtoList.length; i++) {	
					
					htmBody = htmBody + "<tr>"
							+ "<td class='col-md-1 center'>" + (i + 1)+ "</td>"
							+ "<td class='col-md-1 center'>" +r.sendToOutSourceDocumentDtoList[i].documentpath+ "</td>" ;														
							
							htmBody = htmBody
							+ "<td class='col-md-1 center'>"
							+ "<button class='btn' type='button' id='viewUploadedDocumentId' value='"+r.sendToOutSourceDocumentDtoList[i].documentpath+"' onclick=viewUploadedDocument(this.value,"+r.sendToOutSourceDocumentDtoList[i].outmasterId+")><i class='fa fa-eye' title='View Document'></i></button></td>";
				
					
							htmBody = htmBody
							+ "<td class='col-md-1 center'>"
							+ "<button class='btn' type='button'  id='downloadUploadedDocumentId' value='"+r.sendToOutSourceDocumentDtoList[i].documentpath+"' onclick=downloadUploadedDocument(this.value,"+r.sendToOutSourceDocumentDtoList[i].outmasterId+")><i class='fa fa-download' title='Download Document'></i></button></td>";
				
							
							
							htmBody = htmBody
					+ "<td class='col-md-1 center'>"
					+ "<button class='btn' type='button' id='deleteUploadedDocumentId' value='"+r.sendToOutSourceDocumentDtoList[i].id+"' onclick=deleteOutSourceUploadedDocument(this.value,"+r.sendToOutSourceDocumentDtoList[i].id+")><i class='fa fa-times' title='Delete'></i></button></td></tr>";

				}
			}
						
			$("#outsourceDocumentTableBody").html(htmBody);
		}
	});
}

/**********************************************************************************
 * @author Ajay Khandare
 * @date 13_sep_2020
 * @Code This function is view Document
 **********************************************************************************/
	function viewUploadedDocument(document,treatmentId){
		
		//alert(document+","+treatmentId);
		if(document ==null || document =="" || document ==undefined){
			alert("No File To View First Upload And Save file");
		}else{
			$("#uploadDocumentModal").modal('hide');
			$('#ViewDocumemnt').attr("src","");
			$('#ViewDocumemnt').attr("src","ehat/phlebotomy/readDocuments?treatmentId="+treatmentId+"&fileName="+document);
			$('#viewDocModal').modal('show');
		}
		}
	
	/*********************************************************
	 * @author Ajay khandare
	 * @date 04_Feb_2020
	 * @Code This function is use to delete OutSource UploadedDocument
	 *********************************************************/
	function deleteOutSourceUploadedDocument(id,outmasterId) {
		
		var r = confirm("Are you sure you want to delete this document?");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/phlebotomy/deleteOutSourceUploadedDocument",
				data : {
					"outmasterId" : outmasterId
				},
				 //timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alert("Records Deleted Successfully");
				    getOutsourceDocument();
					/*var treatmentId = $('#tretId').val();
					var id = $('#slaveId').val();	*/	
						
				}
			});
		}
	}
/***************************************************************************
* @author Aksahy Mache
* @date 04_Feb_2020
* * @Code This function is use to unrejectSample
 **************************************************************************/
function unrejectSample(masterIds, callFrom) {
	var testStatus = 0;
	if (callFrom == "collection")
		testStatus = 101;
	else if (callFrom == "collected")
		testStatus = 102;

	var r = confirm("Are you sure you want to unreject this sample?");
	var unitId = $("#unitId").val();
	if (r) {
		var inputs = [];
		inputs.push('masterIds=' + encodeURIComponent(masterIds));
		inputs.push('testStatus=' + encodeURIComponent(testStatus));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/pathologysearch/unrejectB2BSample",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				if (r) {
					alertify.success("Sample unrejected Successfully.");
				} else {
					alertify.error("Something went wrong.");
				}
			}
		});
	}
}
	
/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to get microorganism name.
 ******************************************************************************/
function getmicroorganismName(response) {
	
	for ( var pk = 0; pk < response.proLi.length; pk++) {
		
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {

			if (response.proLi[pk].testli[ts].microorganism == "Y") {

			
				var testId = response.proLi[pk].testli[ts].testId;
				
				jQuery.ajax({
					async : false,
					type : "POST",
					url : "ehat/phlebotomy/getmicroorganismName",
					data : {
						testId : testId
					},
					cache : false,
					error : function() {
						alertify.error('Network Issue');
					},
					success : function(r) {
						// setTestReasonNameReject(response,r);
						setmicroorganismName(response,r,(pk+1)+""+(ts+1));
					}
				});
			}
		}
	}
}	
/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to set microorganism name.
 ******************************************************************************/	
function setmicroorganismName(response,r,Id) {
	for ( var pk = 0; pk < response.proLi.length; pk++) {
		
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {
			
			if (response.proLi[pk].testli[ts].microorganism == "Y") {
			var list = "<option value='0'>-select-</option>";			
			for ( var i = 0; i < r.microorganismsList.length; i++) {
				list = list + '<option value="'+ (r.microorganismsList[i].microorganismName) + '">'+ (r.microorganismsList[i].microorganismName) + '</option>';
			}
			
			$("#gretherId"+Id).html(list);
			$("#gretherId"+Id).select2();			
			var expression =response.proLi[pk].testli[ts].expressionResult;
			$("#gretherId"+(pk+1)+(ts+1)).select2('val',expression);
			}
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to get gradingName name.
 ******************************************************************************/
function getgradingName(response) {
	
	for ( var pk = 0; pk < response.proLi.length; pk++) {
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {

			if (response.proLi[pk].testli[ts].microorganism == "Y") {
				alert("kkkk");
				var testId = response.proLi[pk].testli[ts].testId;
				
				
				jQuery.ajax({
					async : false,
					type : "POST",
					url : "ehat/phlebotomy/getgradingName",
					data : {
						testId : testId
					},
					cache : false,
					error : function() {
						alertify.error('Network Issue');
					},
					success : function(r) {
						// setTestReasonNameReject(response,r);
						setgradingName(response,r,(pk+1)+""+(ts+1));
					}
				});
			}
		}
	}
}	
/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to set gradingName name.
 ******************************************************************************/	
function setgradingName(response,r,Id) {
	
	for ( var pk = 0; pk < response.proLi.length; pk++) {
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {
			if (response.proLi[pk].testli[ts].microorganism == "Y") {
			var list = "<option value='0'>-select-</option>";			
			for ( var i = 0; i < r.gradingsList.length; i++) {
				list = list + '<option value="'+ (r.gradingsList[i].labGradingName) + '">'+ (r.gradingsList[i].labGradingName) + '</option>';
			}					
			$("#testresultt"+Id).html(list);
			$("#testresultt"+Id).select2();					
			var testresultt1 =response.proLi[pk].testli[ts].testresult;
			$("#testresultt"+(pk+1)+(ts+1)).select2('val',testresultt1);
			}
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is click on all select in Authorization Record
 ******************************************************************************/
function selectCheckBoxPackWise(id) {
	$("#bulksapmle").click(function(){
	    $('input:checkbox').prop('checked', this.checked);
	});
}

/********************************************************************************
 * @author Ajay khandare
 * @since  15_04_2020
 * @comment for recollection Test
*******************************************************************************/
function reRunTestResult(callfrom) {

	var phlebotomytableTestsalve = {
		pathologySampleWiseSlaveList : []
	};		
	var proLength = $("#proLength").val();	
	for ( var j = 1; j <= proLength; j++) 		
	{
		var testLength = $("#testLength" + j).val();
		
		for ( var i = 1; i <= testLength; i++) {
			
			if ($("#testidCheckbox" + j + i).is(":checked")) {
				
			 var currentId =  $("#testidCheckbox" + j + i).val();		
			 var pkgprofiletestId = currentId.split(",");
		     var masterId = pkgprofiletestId[0];
			 var profileId = pkgprofiletestId[1];
			 var testId = pkgprofiletestId[2];
			 var testIdflag = pkgprofiletestId[3];
			 var testIdReRunFlag = pkgprofiletestId[4];
			 var testresult="";
			 var microorganism = $("#microorganism" + j + i).val();
			 var testName ="";
			 testName= $("#testnameee" + j + i).text();
			 if(testIdReRunFlag=="Y"){
				 
				 if (microorganism == "Y") {								
						testresult = $("#testresultt"+j+i+" option:selected").text();						
					  } else {
						testresult = $("#testresultt" + j + i).val();						
					}
								
			phlebotomytableTestsalve.pathologySampleWiseSlaveList.push({
				"masterIdd" : masterId,
				"profileId" : profileId,
				"testid" : testId,
				"testflag" : testIdflag,
				"reRunFlag" : testIdReRunFlag,
				"testResult" : testresult,
			  });
			 }else{
				alert("This Test Not Applicable For Re-Run Process:" +testName);
			}
		    
			} 
		}
	}
	 if (phlebotomytableTestsalve.pathologySampleWiseSlaveList.length == 0) {
			alert("Please Select at least One Test!");
			return false;
		}
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var r = confirm("Are You Sure You Want To Re-Run this Test ?");
	if (r == true) {
		var inputs = [];
		inputs.push('reRunTestResultList='+ encodeURIComponent(phlebotomyListTestsalve));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/phlebotomy/reRunTestResult",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alertify.success("Re-Run Test Successfully");
				var treatmentIddd = $("#treatmentIddd").val();
				getProcessingRoutinevalueResutl(treatmentIddd);
			}
		});
	}
}


function showPatientPreviousHistory(treatmentId){
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/showPatientPreviousHistory",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setPatientHistory(r);
		}
	});
}

function setPatientHistory(r){
	var tableBodyHtml = "";
	var headerHtml = headerHtml + "<tr><th class='col-md-5 center'>Patient Id : "+r.patientId+"</th><th class='col-md-5 center'>Treatment Id : "+r.treatmentId+"</th></tr>";
	if (r.patientHistory == "null" || r.patientHistory == null || r.patientHistory == "") {	
		tableBodyHtml = tableBodyHtml
				+ "<tr style='height:30px; color:red; font-size:20px;'><th class='center' colspan='12'>No History...!!!</th></tr>";
	}else{			
		tableBodyHtml = tableBodyHtml + "<tr>" ;		
		tableBodyHtml = tableBodyHtml + "<td colspan='2'>"+r.patientHistory+"</td></tr>";																												
	}
	$("#patientHistoryTHead").html(headerHtml);
	$("#patientHistoryTableBody").html(tableBodyHtml);
	$("#patientHistoryPopup").modal('show');
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to get multi General value  name.
 ******************************************************************************/
function getGenralValueName(response) {

	for ( var pk = 0; pk < response.proLi.length; pk++) {
		for ( var ts = 0; ts < response.proLi[pk].testli.length; ts++) {

			if (response.proLi[pk].testli[ts].testType == "general") {
				
				var testId = response.proLi[pk].testli[ts].testId;
				
				
				jQuery.ajax({
					async : false,
					type : "POST",
					url : "ehat/phlebotomy/getGenralValueName",
					data : {
						testId : testId
					},
					cache : false,
					error : function() {
						alertify.error('Network Issue');
					},
					success : function(r) {
						// setTestReasonNameReject(response,r);
						setGenralName(response,r,(pk+1)+""+(ts+1));
					}
				});
			}
		}
	}
}	
/*******************************************************************************
 * @author Ajay khandare
 * @date 15_04_2020
 * @Code This function is use to set gradingName name.
 ******************************************************************************/	
function setGenralName(response,r,Id) {
	
	var nondetected="";
	
	var CovidReportProfileId = $("#CovidReportProfileId").val();//profile Id	
	var SARSCoV2RTPCR = $("#SARSCoV2RTPCR").val();//testID
	var CTVALUEFORCONFIRMATORYGENE = $("#CTVALUEFORCONFIRMATORYGENE").val();// TestID

	var COVID19RNAAMPLIFICATION = $("#COVID19RNAAMPLIFICATION").val();//profile Id
	var SARSCOV2 = $("#SARSCOV2").val();//testID
	
	var SARSCOV2ANTIGEN = $("#SARSCOV2ANTIGEN").val();//profile Id
	var SARSCOV2ANTIGENTest = $("#SARSCOV2ANTIGENTest").val();// TestID
	
	var REALTIMEHEPATITISCVIRUSHCV = $("#REALTIMEHEPATITISCVIRUSHCV").val();//profile Id
	var REALTIMEHEPATITISCVIRUSHCVTestId = $("#REALTIMEHEPATITISCVIRUSHCVTestId").val();// TestID
	
	var REALTIMETRUENAT = $("#REALTIMETRUENAT").val();//profile Id
	var REALTIMETRUENATTestId = $("#REALTIMETRUENATTestId").val();// TestID
	
	
	for ( var pk = 0; pk < response.proLi.length; pk++) {
		
		for (var ts = 0; ts < response.proLi[pk].testli.length; ts++) {

			if (response.proLi[pk].testli[ts].testType=="general") {
			
			var list = " ";			
			for (var i = 0; i < r.generalValuesList.length; i++) {
						           		        	  
		        	     if(response.proLi[pk].profileId==CovidReportProfileId){
							
		        		   if (response.proLi[pk].testli[ts].testId == SARSCoV2RTPCR) {
		        		    	
							 list = list + '<option selected value="'+ (r.generalValuesList[i].testGeneral)+ '">'+ (r.generalValuesList[i].testGeneral)+ '</option>';
							   
							    var flagmark =response.proLi[pk].testli[ts].flagmark;
							    if(flagmark == "null" || flagmark == null || flagmark=="" || flagmark=="undefined" ){
									
								    $('#flagId' + (pk+1)+(ts+1)).text("Negative");
									$('#flagId' + (pk+1)+(ts+1)).css('color', 'green');
									$('#flagId' + (pk+1)+(ts+1)).css('font-size', '14px');
									//alertify.error("Test Result Is Negative!");
									
								}else
								{
									$("#flagId" + (pk + 1) + (ts + 1)).val(flagmark);
									
								}
							  
		        		    }																					
						}else if(response.proLi[pk].profileId==COVID19RNAAMPLIFICATION){
							
			        		   if (response.proLi[pk].testli[ts].testId == SARSCOV2) {
			        		    	
								 list = list + '<option selected value="'+ (r.generalValuesList[i].testGeneral)+ '">'+ (r.generalValuesList[i].testGeneral)+ '</option>';
								   
								    var flagmark =response.proLi[pk].testli[ts].flagmark;
								    if(flagmark == "null" || flagmark == null || flagmark=="" || flagmark=="undefined" ){
										
									    $('#flagId' + (pk+1)+(ts+1)).text("Negative");
										$('#flagId' + (pk+1)+(ts+1)).css('color', 'green');
										$('#flagId' + (pk+1)+(ts+1)).css('font-size', '14px');
									//	alertify.error("Test Result Is Negative!");
										
									}else
									{
										$("#flagId" + (pk + 1) + (ts + 1)).val(flagmark);
									}
								  
			        		    }																					
						}else if(response.proLi[pk].profileId==SARSCOV2ANTIGEN){
							
			        		   if (response.proLi[pk].testli[ts].testId == SARSCOV2ANTIGENTest) {
			        		    	
								 list = list + '<option selected value="'+ (r.generalValuesList[i].testGeneral)+ '">'+ (r.generalValuesList[i].testGeneral)+ '</option>';
								   
								    var flagmark =response.proLi[pk].testli[ts].flagmark;
								    if(flagmark == "null" || flagmark == null || flagmark=="" || flagmark=="undefined" ){
										
									    $('#flagId' + (pk+1)+(ts+1)).text("Negative");
										$('#flagId' + (pk+1)+(ts+1)).css('color', 'green');
										$('#flagId' + (pk+1)+(ts+1)).css('font-size', '14px');
										//alertify.error("Test Result Is Negative!");
										
									}else
									{
										$("#flagId" + (pk + 1) + (ts + 1)).val(flagmark);
									}
								  
			        		    }																					
						} else if(response.proLi[pk].profileId==REALTIMEHEPATITISCVIRUSHCV){
							
			        		   if (response.proLi[pk].testli[ts].testId == REALTIMEHEPATITISCVIRUSHCVTestId) {
			        		    	
								 list = list + '<option selected value="'+ (r.generalValuesList[i].testGeneral)+ '">'+ (r.generalValuesList[i].testGeneral)+ '</option>';
								   
								    var flagmark =response.proLi[pk].testli[ts].flagmark;
								    if(flagmark == "null" || flagmark == null || flagmark=="" || flagmark=="undefined" ){
										
									    $('#flagId' + (pk+1)+(ts+1)).text("Negative");
										$('#flagId' + (pk+1)+(ts+1)).css('color', 'green');
										$('#flagId' + (pk+1)+(ts+1)).css('font-size', '14px');
										//alertify.error("Test Result Is Negative!");
										
									}else
									{
										$("#flagId" + (pk + 1) + (ts + 1)).val(flagmark);
										
									}
								  
			        		    }																					
							}else if(response.proLi[pk].profileId==REALTIMETRUENAT){
								
				        		   if (response.proLi[pk].testli[ts].testId == REALTIMETRUENATTestId) {
				        		    	
									 list = list + '<option selected value="'+ (r.generalValuesList[i].testGeneral)+ '">'+ (r.generalValuesList[i].testGeneral)+ '</option>';
									   
									    var flagmark =response.proLi[pk].testli[ts].flagmark;
									    if(flagmark == "null" || flagmark == null || flagmark=="" || flagmark=="undefined" ){
											
										    $('#flagId' + (pk+1)+(ts+1)).text("Negative");
											$('#flagId' + (pk+1)+(ts+1)).css('color', 'green');
											$('#flagId' + (pk+1)+(ts+1)).css('font-size', '14px');
											//alertify.error("Test Result Is Negative!");
											
										}else
										{
											$("#flagId" + (pk + 1) + (ts + 1)).val(flagmark);
											
										}
									  
				        		    }																					
								}else
						{
								
							list = list + '<option value="'+ (r.generalValuesList[i].testGeneral) + '" selected >'+ (r.generalValuesList[i].testGeneral)+ '</option>';
						}
					
			}
		      
			
			 $("#testresultt"+Id).html(list);	
			$("#testresultt" + Id).val("Negative");
			$("#testresultt" + Id).val("Not Detected");
			 
			   var testresultt1 =response.proLi[pk].testli[ts].testresult;			
			   if (response.proLi[pk].profileId == CovidReportProfileId) {
				 
					if (response.proLi[pk].testli[ts].testId == SARSCoV2RTPCR) {
						
						if (testresultt1 == "null" || testresultt1 == null || testresultt1=="" || testresultt1=="undefined" ) {							
							
						}else
						{							
							$("#testresultt" + (pk + 1) + (ts + 1)).val(testresultt1);							
						}	
					}
				 }else if (response.proLi[pk].profileId == COVID19RNAAMPLIFICATION) {
					
					if (response.proLi[pk].testli[ts].testId == SARSCOV2) {
						
						if (testresultt1 == "null" || testresultt1 == null || testresultt1=="" || testresultt1=="undefined" ) {							
						
							$("#testresultt" + (pk + 1) + (ts + 1)).val("Not Detected");
						
						}else
						{				
							$("#testresultt" + (pk + 1) + (ts + 1)).val(testresultt1);							
						}	
					}
				}else if (response.proLi[pk].profileId == SARSCOV2ANTIGEN) {
				
					if (response.proLi[pk].testli[ts].testId == SARSCOV2ANTIGENTest) {
						
						if (testresultt1 == "null" || testresultt1 == null || testresultt1=="" || testresultt1=="undefined" ) {							
							
							$("#testresultt" + (pk + 1) + (ts + 1)).val("Negative");
						
						}else
						{							
							$("#testresultt" + (pk + 1) + (ts + 1)).val(testresultt1);							
						}	
					}
				}  else  {
				
					if (testresultt1 == "null" || testresultt1 == null || testresultt1=="" || testresultt1=="undefined" ) {							
							
							$("#testresultt" + (pk + 1) + (ts + 1)).val("Negative");
						
						}else
						{							
							$("#testresultt" + (pk + 1) + (ts + 1)).val(testresultt1);							
						}						
				}  			
			}else
			{
				 if(response.proLi[pk].profileId==CovidReportProfileId){
					 if(response.proLi[pk].testli[ts].testId == CTVALUEFORCONFIRMATORYGENE){
							
							var testresultt1 =response.proLi[pk].testli[ts].testresult;
							//alert(testresultt1+"testresultt1");
							if(testresultt1=="" || testresultt1==undefined || testresultt1=="undefined")
							{
								
								$("#testresultt"+(pk+1)+(ts+1)).val("NA");
								document.getElementById("testresultt"+(pk+1)+(ts+1)).disabled = true;								
								$('#flagId' + (pk+1)+(ts+1)).text("Negative");
								$('#flagId' + (pk+1)+(ts+1)).css('color', 'green');
								$('#flagId' + (pk+1)+(ts+1)).css('font-size', '14px');
							}else
							{
								if(testresultt1 == "NA")
								{
									$("#testresultt"+(pk + 1)+(ts + 1)).val(testresultt1);
									document.getElementById("testresultt"+(pk+1)+(ts+1)).disabled = true;
								}else
								{
									$("#testresultt"+(pk + 1)+(ts + 1)).val(testresultt1);
								}	
														
							}					
					 }
				}
			}
		}
	}
}
/*******************************************************************************
 * @author Ajay s khandare
 * @since 06-03-2020
 * @comment for Bulk Post sample in Autho Record Tab
 ******************************************************************************/
function bulkAuthoriseRecord() {	
   idList = [];
   var currentId;	
   $("#proccessingtabId").find('input[name="testid"]').each(function() {
					if ($(this).is(":checked")) {
						currentId = $('#' + this.id).val();
						if (currentId != 0) {
							idList.push(currentId);
							
						}
					}
				});
   
   idList = idList.join('-');
  
   
	if (idList.length == 0) {
		alert("Please Select at least One Sample/Test!");
		return false;
	}
	if (idList.length > 0) {
		var r = "";		
		r = confirm("Are You Sure You Want To Bulk send to authorise this Samples/Test ?");
		if (r == true) {
			var inputs = [];
			inputs.push('id=' + encodeURIComponent(idList));
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/phlebotomy/bulkAuthoriseRecord",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {					
					alertify.success(r);	
					//getProcessingRecord('AD');
					searchLabTestPatient("processingSearchBtn");
					//getRecordCountForAuthorizeTabIndicator();
				}
			});
		}
	}

}
/********************************************************
* @author Ajay s khandare
* @since 15-06-2020
* @comment for  export to excel 
*********************************************************/
function exportToExcelworkList(){
	var fromDate = $("#txtFdate").val();
	var toDate = $("#txtTdate").val();
	
	$("#workListDiv").table2excel({
		filename: "WorkList("+fromDate+" To "+toDate+").xls" 
	});
}

/********************************************************************************
 * @author Rohit
 *******************************************************************************/
function saveLabTestRoutineValueResultRegeneratePDF(id) {
	document.getElementById("primeLoader").style.display = "block";
	var statusFlag=$("#"+id).val();
	//var idPathologist=$("#IdPathologist").val();
	var idPathologist=0;
	var kitSpecId=$("#kitSpecId").val();	
	var pIdReporting= $("#pId").val();
	if(pIdReporting == "undefined" || pIdReporting == undefined )
	{
		pIdReporting=0;
	}
	var machineId1=$("#machineId").val();
	if(machineId1 == "undefined" || machineId1 == undefined )
	{
		machineId1="0,0";
	}
	var mId=machineId1.split(" ");
	var Neutrophils=$("#Neutrophils").val();
	var Lymphocytes=$("#Lymphocytes").val();
	var Eosinophils=$("#Eosinophils").val();
	var Basophils=$("#Basophils").val();
	var Monocytes=$("#Monocytes").val();
	var CbcProfile=$("#CbcProfile").val();
	var Bandcells=$("#Bandcells").val();
	var CovidReportProfileId=$("#CovidReportProfileId").val();
	var SARSCoV2RTPCR=$("#SARSCoV2RTPCR").val();
	var CTVALUEFORCONFIRMATORYGENE=$("#CTVALUEFORCONFIRMATORYGENE").val();
	
	
	var testresultadding=0;
	var machineId=mId[0];
	var serialNo=mId[1];
    var flagId="";
    var resultmarge=0;
    var testId=0;
    var profileId=0;
    var counttestaddition=0;
	 if (statusFlag == "AA" || statusFlag == "AAP") {		
			/*if (idPathologist == "" || idPathologist == "undefined" || idPathologist == null || idPathologist == 0|| idPathologist == "0") {
				alert("Please Select Pathologist Name.");
				$("#IdPathologist").focus();
				return false;
			}*/						
	}
	if (statusFlag == "AA") {
		/*if (machineId == "" || machineId == "undefined" || machineId == null
				|| machineId == 0 || machineId == "0") {
			alert("Please Select Machine Name.");
			$("#machineId").focus();
			return false;
		}*/
	} else if (statusFlag == "AAP") {
		machineId=0;
		serialNo=0;
	}	
	
	var checkedMasterIds = [];
	var profileSerialNumbers = [];
	
	$('input[name=profileCheckboxId]:checked').each(function(){
		var checkedValues = this.value;
		var data = checkedValues.split("-");
		checkedMasterIds.push(data[0]);
		profileSerialNumbers.push(data[1]);
	});

	if(checkedMasterIds.length <= 0 || profileSerialNumbers.length <= 0){
		alert("Please select atleast one profile.");
		return false;
	}
	
	var masterIdd = checkedMasterIds.join();
	
	var proLength = $("#proLength").val();	
	var masterIdd1=$("#masterIdd").val();
	
	var idList = [];
	var profileIdcomments="";	
	var phlebotomytableTestsalve = {
			pathologySampleWiseSlaveList : []
	};	
	
	for(var j = 1; j <= proLength; j++){
		var status = false;
		for(var k = 0; k < profileSerialNumbers.length; k++){
			if(j == profileSerialNumbers[k]){
				status = true;
			}
		}
		if(!status){
			continue;
		}
		var testLength = $("#testLength" + j).val();
		profileIdcomments = $("#profileIdcomments" + j).val();
		
		for(var i = 1; i <= testLength; i++) {
			var pkgtestId = $("#pkgIdproIdtestId" + j + i).val();
			if(pkgtestId == undefined) {
				break;
			}
			var pkgprofiletestId = pkgtestId.split(",");
			profileId = pkgprofiletestId[0];
			testId = pkgprofiletestId[1];
			var testresult = "";
			var microorganism = $("#microorganism" + j + i).val();
			var expression="";
			var resultint=0;
			if(microorganism=="Y"){
				expression = $("#gretherId"+j+i+" option:selected").text();		
			}else{
				expression = $("#gretherId11" + j + i).val();
			}	
			
			if(statusFlag == "AU") {
				if (microorganism == "Y") {
					testresult = $("#testresultt"+j+i+" option:selected").text();
				} else {
					testresult = $("#testresultt" + j + i).val();
				}

				flagId = $("#flagId" + j + i).text();

				if(flagId == "NE") {
					alert("Non Existant test result has been identified. Please Re-verify!");
					document.getElementById("primeLoader").style.display = "none";	
				}
			} else if (statusFlag == "AA" || statusFlag == "AAP" ) {
				rjflag = $("#rjflag" + j + i).val();

				if(rjflag == "Y") {
					if(microorganism == "Y") {								
						testresult = $("#testresultt"+j+i+" option:selected").text();
					} else {
						testresult = $("#testresultt" + j + i).val();
					}

					if(testresult == "" || testresult == null || testresult == undefined || testresult == " ") {
						testresult = " ";
					}
				} else {
					if(microorganism == "Y") {						
						testresult = $("#testresultt"+j+i+" option:selected").text();
					}else {
						testresult = $("#testresultt" + j + i).val();
					}
					if(testresult == "" || testresult == null || testresult == undefined || testresult == " ") {
						testresult = 0;
						alert("Please Enter Routine value");
						document.getElementById("primeLoader").style.display = "none";	
						return false;
					}

				}
				flagId = $("#flagId" + j + i).text();

				if (flagId == "NE") {
					alert("Non Existant test result has been identified. Please Re-verify");
					document.getElementById("primeLoader").style.display = "none";	
					return false;
				}
							    
				 if (profileId == CbcProfile) {
				    if (testId == Neutrophils || testId == Lymphocytes || testId == Eosinophils ||  testId == Basophils || testId == Monocytes || testId == Bandcells)			 
					 {		
				    	 counttestaddition++;
						 resultint=Number(testresult);		
						 testresultadding=Number(testresultadding)+Number(resultint);
						  						
					 }	
				 }   
			}
           // alert(testresult+"D");
			var reasionid = $("#reasionid" + j + i).val();
			var flagId = $("#flagId" + j + i).text();
			phlebotomytableTestsalve.pathologySampleWiseSlaveList.push({
				"profileId" : profileId,
				"testid" : testId,
				"testResult" : testresult,
				"testReason" : reasionid,
				"flagMark" : flagId,
				"expression" : expression,
			});
		}
		
		 if (profileId == CbcProfile) {
			if (counttestaddition==6) {
				var totalTestResult = (testresultadding).toFixed(0);				
				if (totalTestResult != 100) {
					alert("The differential count is not equal to 100%. Please Re-verify!");
					document.getElementById("primeLoader").style.display = "none";	
					return false;
				}
			} /*else {
				alert("Differential Count Must Have All Mandetory Test ");
			}*/

		}
		 
		 if (statusFlag == "AAP" || statusFlag == "AA" || statusFlag=="AU")					
			{
				 if (profileId == CovidReportProfileId) {
					 					
					    var  testr1 = $("#testresultt" + 1 + 1).val(); 																										
						
					    if(testr1=="Not Detected")
					    {
							var  testr12 = $("#testresultt" + 1 + 2).val(); 
							var tes=Number(testr12);
							if(tes<=40)
							{
								alert("Not Detected value should be higher than 40");
								document.getElementById("primeLoader").style.display = "none";	
								return false;
							}	
						}else if(testr1=="Detected")
						{
                            var  testr12 = $("#testresultt" + 1 + 2).val(); 
                          
                            var tes=Number(testr12);
							if(tes>40 || testr12=="NA")
							{
								alert("Detected value should be 40 or less than 40");
								document.getElementById("primeLoader").style.display = "none";	
								return false;
							}	
						}															 
				 }
			}
	}
	//return false;
	var phlebotomyListTestsalve = JSON.stringify(phlebotomytableTestsalve);
	var inputs = [];	
	inputs.push('id=' + masterIdd);
	inputs.push('machineId=' + machineId);
	inputs.push('SerialNo=' + serialNo);
	inputs.push('statusFlag=' + statusFlag);
	inputs.push('idPathologist=' + idPathologist);
	inputs.push('kitSpecId=' + kitSpecId);
	inputs.push('pIdReporting=' + pIdReporting);
	inputs.push('profileIdcomments=' + profileIdcomments);
	inputs.push('phlebotomyListTestsalve=' + encodeURIComponent(phlebotomyListTestsalve));
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/phlebotomy/saveLabTestRoutineValueResultRegeneratePDF",
		data : str + "&reqType=AJAX",
		success : function(r) {
			
			   if (statusFlag == "AU") {
				     alert("Save Successfully.");
				     window.location.replace("pathology_proccessing.jsp");
			         //document.getElementById("primeLoader").style.display = "none";	
			    }else if(statusFlag == "AA")
			    {
			    	 alert("Sample Save & Authorized Successfully.");	
			         window.location.replace("pathology_proccessing.jsp");
				    // document.getElementById("primeLoader").style.display = "none";	

			    }else if(statusFlag == "AAP"){
			    	 alert(" Sample Authorized & Posted Successfully.");
			    	 window.location.replace("pathology_authorizatioin.jsp");
			    		
			    }
			   document.getElementById("primeLoader").style.display = "none";
				
		}
	});

}

/***********************************************************
 * @author Ajay s khandare
 * @since  2-03-2020
 * @comment forward page on routine vale 
************************************************************/
function forwordPageAuthorizedRoutineValueRegeneratePDF(masterid,treatmentId,patientId,sampleTypeId,profileId){
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)		{
		window.location.href = "pathology_authorization_routineResult.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}else{
		window.location.href = "pathology_authorization_routineResult_Lab.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}	
}

/***********************************************************
 * @author Rohit Sandbhor
 * @since  17-09-2021
 * @comment this function is to create to manipulate with microbiological tests 
************************************************************/
function forwordPageProcessingRoutineValueTemplateWise(masterid, treatmentId, patientId, sampleTypeId, profileId)
{
	 var CovidReportProfileId= $("#CovidReportProfileId").val();
	 var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	 var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	 var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	 var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	 
	 
	 if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)
	{
			window.location.href = "pathology_processing_routineResult.jsp?masterid=" + masterid+"&treatmentId=" + treatmentId+"&patientId=" + patientId+"&sampleTypeId=" + sampleTypeId;	
	}else
	{
		    window.location.href = "pathology_processing_templatewise_lab.jsp?masterid=" + masterid+"&treatmentId=" + treatmentId+"&patientId=" + patientId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;	
	}	
}


/***********************************************************
 * @author Rohit Sandbhor
 * @since  22-09-2021
 * @comment forward page on routine value for template wise test 
************************************************************/
function forwordPageAuthorizedRoutineValueTemplateWise(masterid,treatmentId,patientId,sampleTypeId,profileId){
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)		{
		window.location.href = "pathology_authorization_routineResult.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}else{
		window.location.href = "pathology_authorization_templatewise_lab.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}	
}

/**
 * @author Rohit Sandbhor
 * @since 12-09-2021
 * @param id
 * @param id1
 * @param value
 */
function getGeneralType(id, id1,value){
	var id3 = id + "" + id1;
	var generalValue = $("#testresultt"+id3).val();
	var inputs = [];
	inputs.push('generalValue=' + generalValue);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/phlebotomy/getGeneralType",
		data : str + "&reqType=AJAX",
		error : function() {
		//	alert('error');
		},
		success : function(response) {
			$("#generalTypeIdd"+id3).val(response);
		}
	});
}

function PrintLabBarcode(barcode){
	
	window.open("ehat_lab_barcode.jsp?barcode="+barcode);
}





/*********************************************************
 * @author Rohit Ambawade
 * @since 11-10-2022
 * @comment for the template wise test to change the status
**********************************************************/
function changeStatusOfLabReportForTemplateWise(id){
	
	var masterIdd1 = $("#masterIdd").val();
	var statusFlag=$("#"+id).val();
	
	jQuery.ajax({
        async : true,
        type : "POST",
    	data : {
    		masterIdd : masterIdd1,
    		statusFlag : statusFlag
		},
		url : "ehat/phlebotomy/changeStatusOfTest",
        success : function(r) {
			  if (statusFlag == "AP") {
				alertify.success("Back To Accession Successfully");
				window.location.replace("pathology_accession.jsp");
			} else if (statusFlag == "AAP"){
				alertify.success("POST Successfully");
				window.location.replace("pathology_authorizatioin.jsp");
			}
        }
    });
}

function hideTabForMeesha(){
	var meeshaFlow=$("#meeshaFlow").val();
	if(meeshaFlow == "on" ){
		$("#abnormalDiv").hide();
		$("#cabnormalDiv").hide();
		document.getElementById("rejectId").disabled = true; 
	}else{
		$("#abnormalDiv").hide();
		$("#cabnormalDiv").hide();
		document.getElementById("rejectId").disabled = true; 
	//	$("#abnormalDiv").show();
		//$("#cabnormalDiv").show();
		//document.getElementById("rejectId").disabled = false; 
	}
}

function hideTabOnReportForMeesha(){
	var meeshaFlow=$("#meeshaFlow").val();
	if(meeshaFlow == "on" ){
		$("#normalTabLi").hide();
		$("#abnormalTabLi").hide();
		$("#cAbnormalTabLi").hide();
		$("#templateTestTabLi").hide();
		
	}else{
		$("#normalTabLi").hide();
		$("#abnormalTabLi").hide();
		$("#cAbnormalTabLi").hide();
		$("#templateTestTabLi").hide();
		//$("#normalTabLi").show();
		//$("#abnormalTabLi").show();
		//$("#cAbnormalTabLi").show();
		//$("#templateTestTabLi").show();
	}
}

function setMachineListOnProcessing(r){
	
		var headingId=0;
		var inputs = [];
		inputs.push('searchText=' + encodeURIComponent(""));
		inputs.push('callFrom=' + "onload");
		inputs.push('headingId=' + headingId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/labMachineMasterController/getallMachines",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(rr) {
				
								var count=1;
				var htm1="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < rr.machineNameList.length; i++){    
			        htm1 = htm1 + "<option value='"+rr.machineNameList[i].machineId+"'> "+rr.machineNameList[i].machineName+" </option>";
			    }
			    for ( var pk1 = 0; pk1 < r.proLi.length; pk1++) {
					    $("#machineIdP"+count).html(htm1);
					    count++;
			    }
			   var  index=1;
			    if(r.proLi.length > 0){
				    for ( var pk = 0; pk < r.proLi.length; pk++) {
				    	$("#machineIdP"+index).val(r.proLi[pk].machineId);
				    	index++;
				    }
			    }
			  
				
			}
		});
	
}

function checkDistinctTreatment(index,gender){
	var idList = [];
	var currentId;
	var patientName= $("#patientnamee"+index).val();
	var patientName1=patientName.split(".");
	var printTreatId= $("#printTreatId"+index).val();
	var printCheckBoxCount=$("#printCheckBoxCount").val();
	var uncheckcount=0;
		$('#reportingPatientPrintBody').find('input[name="allTest"]').each(function() {
			
			if($(this).is(":checked")) {
				
				currentId = $('#' + this.id).val();
				var printTreatmentId=$("#printTreatmentId").val();
				
				if(printTreatmentId == 0){
					$("#printTreatmentId").val(printTreatId);
					$("#printPatientName").val(patientName1);
					$("#printPatientGeneder").val(gender);
				}else if(printTreatId > 0){
					if(printTreatmentId != printTreatId ){
						alert("please Select Same Treatment  ");
						//$(this).prop("checked",false);
						$('#' + this.id).prop("checked",false);
						return false;
					}
				}
				
			}else {
				uncheckcount++;
				
			}
			
			
		});
		
	    if(printCheckBoxCount == uncheckcount){
	    	$("#printTreatmentId").val(0);
	    	$("#printPatientName").val(patientName1);
			$("#printPatientGeneder").val(gender);
	    }
}

function printPartientReport(){
	var idList = [];
	var currentId;
	var printTreatmentId=$("#printTreatmentId").val();
	var printPatientName=$("#printPatientName").val();
	var printPatientGeneder=$("#printPatientGeneder").val();
	var mobileAuth= $("#mobileAuth").val();
	if(printTreatmentId == 0 || printTreatmentId == null || printTreatmentId == "" || printTreatmentId == undefined || printTreatmentId == "undefined"){
		alert("Please Select at one Record ");
		return false;
	}
	
	$('#reportingPatientPrintBody').find('input[name="allTest"]').each(function() {
		
		if($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if(currentId != 0) {
				idList.push(currentId);
			}
		}
		
		
	});
	var headrFlag="Y";
	
	if($("#withheader").is(":checked")){
		var headrFlag="Y";
	}
	if($("#withoutheader").is(":checked")){
		var headrFlag="N";
	}	
	
	var hospitalname=$("#hospitalname").val();
	if(hospitalname == "Siddhivinayak"){
	      window.open("pathology_report_print_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(printTreatmentId)+"&masterIdd="+ encodeURIComponent(idList)+"&gender="+encodeURIComponent(printPatientGeneder)+"&patientName="+encodeURIComponent(printPatientName)+"&mobileAuth="+encodeURIComponent(mobileAuth)+"&headrFlag="+encodeURIComponent(headrFlag));
	}else{
		window.open("pathology_report_print.jsp?"+"&treatmentId=" + encodeURIComponent(printTreatmentId)+"&masterIdd="+ encodeURIComponent(idList)+"&gender="+encodeURIComponent(printPatientGeneder)+"&patientName="+encodeURIComponent(printPatientName)+"&mobileAuth="+encodeURIComponent(mobileAuth)+"&headrFlag="+encodeURIComponent(headrFlag));
	}
}

function getAllOutLabMasterByTestId(testId) {
	
	var inputs = [];
	inputs.push('testId=' + testId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/outlabmastercontroller/getAllOutLabMasterByTestId",
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<select name='OutLab Name' class='col-md-12'><option value='0'>--Select OutLab--</option>";
			for ( var i = 0; i < r.outLabMasterDtoList.length; i++) {
				divContent = divContent + "<option value='"	+ r.outLabMasterDtoList[i].id + "'>"+ r.outLabMasterDtoList[i].name + "</option>";
			}
			divContent = divContent + "</select>";					
				$("#labCenterId").html(divContent);
				$("#labCenterId").select2();
		}
	});
}

function downloadUploadedDocument(documentname,treatmentId){
	
	//alert(document+","+treatmentId);
	if(documentname ==null || documentname =="" || documentname ==undefined){
		alert("No File To download First Upload And Save file");
	}else{
		
		
		const url = "ehat/phlebotomy/readDocuments?treatmentId="+treatmentId+"&fileName="+documentname;
		const link = document.createElement('a');
		link.href = url;
		link.download = documentname;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	
		 
	}
	}




function convertReportingToAutorization(){
	var idList = [];
	var currentId=0;
	$('#reportingAllTableBody').find('input[name="allTest"]').each(function() {
		
		if($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if(currentId != 0) {
				idList.push(currentId);
			}
		}
		
		
	});
	
$('#reportingPatientWiseTableBody').find('input[name="allTest"]').each(function() {
		
		if($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if(currentId != 0) {
				idList.push(currentId);
			}
		}
		
		
	});
	

$('#reportingPatientPrintBody').find('input[name="allTest"]').each(function() {
	
	if($(this).is(":checked")) {
		currentId = $('#' + this.id).val();
		if(currentId != 0) {
			idList.push(currentId);
		}
	}
	
	
});

	
	if(idList.length == 0){
		
		alert("Select at least one Record For Back to Authorize");
		return false;
	}
	var masterIdd = idList.join();
	
	jQuery.ajax({
        async : false,
        type : "POST",
    	data : {
    		masterIdd : masterIdd,
    		testSatus : 5
		},
		url : "ehat/phlebotomy/convertReportingToAutorization",
        success : function(r) {
			 if(r ==1){
				 alert("Record Converted Successfully");
				 searchReportingPatient("reportingSearchBtn");
			 }else{
				alert("Network Issue"); 
			 }
        }
    });

	
}
