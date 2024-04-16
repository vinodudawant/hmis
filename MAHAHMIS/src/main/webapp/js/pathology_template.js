function getProfileName(){
	var id= $("#profileId").val();
	var inputs = [];	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "GET",
		url : "ehat/labprofile/getprofilebyid/"+id,
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#profileNameId").val(r.profileName);
		}
	});
}


function getPathologyTemplateListByProfileId(){
	var profileId= $("#profileId").val();
	var inputs = [];	
	
	inputs.push('testId=' + profileId);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/labtest/getPathologyTemplateList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTemplateListToRoutineValue(r)
			
		}
	});
}

function setTemplateListToRoutineValue(r){
	var list="<option value='0' >NewTemplate</option>";
	//var list="";
	for ( var i = 0; i < r.pathologytemplateList.length; i++) {
		list=list+'<option  value="'+(r.pathologytemplateList[i].templateId)+'">'+(r.pathologytemplateList[i].templateName)+'</option>';
	}	
	$("#templateNameId").html(list);
}

function getTemplateDataByTemplateId(){
	var id= $("#templateNameId").val();
	var inputs = [];	
	
	
	if(id == 0 || id == undefined || id=="null" || id =="undefined" || id == null){
		refreshTemplateData();
		return false;
	}
	
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/labtest/getPathologyTemplateById",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		 $("#templateNameId").val(r.templateId);
			
		
			
			CKEDITOR.instances['RiseditorSubjective'].setData(r.templateData);
			
						
			
		}
	});
}



function saveTemplateInfo(callFrom){
    var patientId= $("#patientId").text(); // change by Rohini Ambhore
	//var patientId= $("#patientId11").text();
	var treatmentId= $("#treatmentId").text();
	var gender= $("#sex").text();
	var patientName= $("#patientName").text();
	var masterid= $("#masterid").val();
	var profileName= $("#profileNameId").val();
	var templateId = $("#templateNameId").val();
	var templateName=	$("#templateNameId option:selected").text();
	

	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	var machineId = $("#equipmentId").val();
	var machineName=	$("#equipmentId option:selected").text();
	
	var templateData = "";
		templateData = CKEDITOR.instances['RiseditorSubjective'].getData();
		
		if(templateId == "" || templateId == undefined || templateId == null || templateId==0){
			alertify.alert("Please Select Template First");
			return false;
		}
		
		
		if(profileName == "" || profileName == undefined || profileName == null){
			alertify.alert("Please Select profileName Name");
			return false;
		}
		
		
	if(templateName == "" || templateName == undefined || templateName == null){
		alertify.alert("Please Select Template Name");
		return false;
	}
	else if(templateData == "" || templateData == undefined || templateData == null){
		alertify.alert("Please Enter Template Data");
		return false;
	}
	
	
	if(machineName == "" || machineName == undefined || machineName == null){
		alertify.alert("Please Select machineName ");
		return false;
	}
	
	
	
	var inputs = [];	
	inputs.push('masterId=' + masterid);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('gender=' + gender);
	inputs.push('patientName=' + patientName);
	inputs.push('profileName=' + profileName);
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('callFrom=' +callFrom);
	inputs.push('machineId=' +machineId);
	inputs.push('machineName=' +machineName);
	

	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/phlebotomy/saveTemplateInfo",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r==1){
				//alertify.success("Record Updated Successfully ");
				alert("Record Updated Successfully");
				if(callFrom == "post"){
					//generatePdfOnServer();
				}
				// window.location.href = "pathology_proccessing.jsp";
				 window.location.href = "pathology_authorizatioin.jsp";
			}
			else{
				alertify.error("Network Issue ");
			}
			
		}
	});
}

function getTemplateInfoByMasterId(){
	var masterid= $("#masterid").val();
	var inputs = [];	
	
	inputs.push('masterid=' + masterid);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/phlebotomy/getTemplateInfoByMasterId",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var templateId=r.listtemplateinfo[0].templateId;
			if(templateId > 0){
				
				$("#templateNameId").val(r.listtemplateinfo[0].templateId);
				CKEDITOR.instances['RiseditorSubjective'].setData(r.listtemplateinfo[0].templateData);
				$("#equipmentId").val(r.listtemplateinfo[0].machineId);
			}
			
		}
	});
}



function getDefaultTemplateByProfileId(){
	var profileId= $("#profileId").val();
	var inputs = [];	
	
	inputs.push('profileId=' + profileId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/phlebotomy/getDefaultTemplateByProfileId",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r == "" || r == null){
				alert("Default Template Not Available For this profile.. ");
				return false;
			}
				$("#templateNameId").val(r.templateId);
				CKEDITOR.instances['RiseditorSubjective'].setData(r.templateData);
			
			
		}
	});
}

function generatePdfOnServer(){
	var patientId= $("#patientId").text();
	var treatmentId= $("#treatmentId").text();
	var gender= $("#sex").text();
	var patientName= $("#patientName").text();
	var masterid= $("#masterid").val();
	var pname=patientName.split(" "); 
	
	var PpName=pname[1]+" "+pname[2]+" "+pname[3];
	
		
	var inputs = [];	
	inputs.push('masterId=' + masterid);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('gender=' + gender);
	inputs.push('callFrom=' +"post");
	inputs.push('patientName=' + PpName);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/phlebotomy/generatePdfOnServer",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		}
	});

}


/*********************************************************
 * @author Dayanand khandekar
 * @since 10-03-2020
 * @comment for print templte print with out  header
**********************************************************/
function printTemplateWithoutHeader(){
	
	var treatmentId=$("#treatmentID").val();
	var masterIdd=$("#masterIdd").val();
	var gender=$("#patientgander").val();
	var patientName=$("#patientName").text();
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	var meeshaFlow=$("#meeshaFlow").val();
	var hospitalname=$("#hospitalname").val();
   /* if(meeshaFlow == "on"){
    	window.open("pathology_template_print_auth_wo_header_meehsa.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
    }else {
    		window.open("pathology_template_print_auth_wo_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
    }*/
	
	if(hospitalname == "Meesha"){
		window.open("pathology_template_print_auth_wo_header_meehsa.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else if(hospitalname == "Siddhivinayak"){
		window.open("pathology_template_print_auth_wo_header_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else{
		window.open("pathology_template_print_auth_wo_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}
	
}


/*********************************************************
 * @author Dayanand khandekar
 * @since 27-09-2021
 * @comment for print template with header
**********************************************************/
function printTemplateWithHeader(){
	var treatmentId=$("#treatmentID").val();
	var masterIdd=$("#masterIdd").val();
	var gender=$("#patientgander").val();
	var patientName=$("#patientName").text();
	
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();

	var meeshaFlow=$("#meeshaFlow").val();
	var hospitalname=$("#hospitalname").val();
   
	/*if(meeshaFlow == "on"){
    	window.open("pathology_template_print_with_header_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
    }else{
    	window.open("pathology_template_print_with_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
    }*/
	
	if(hospitalname == "Meesha"){
		window.open("pathology_template_print_with_header_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else if(hospitalname == "Siddhivinayak"){
		window.open("pathology_template_print_with_header_siddhivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}else{
		window.open("pathology_template_print_with_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	}
			
		
		
}
/*********************************************************
 * @author Dayanand khandekar
 * @since 28-09-2021
 * @comment to get list of organism against profile id
**********************************************************/
function getOraganismListByProfileId(){
	var profileId= $("#profileId").val();
	var inputs = [];	
	
	inputs.push('profileId=' + profileId);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/phlebotomy/getOraganismListByProfileId",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOrganismListOnProfileId(r)
			
		}
	});
}

/**
 * @author Rohit Sandbhor
 * @since 28-09-2021
 * @comment to fetch and show organism list
 * @param r
 */
function setOrganismListOnProfileId(r){
	var list="<option value='0' >--Select--</option>";
	for ( var i = 0; i < r.listtemplateinfo.length; i++) {
		list=list+'<option  value="'+(r.listtemplateinfo[i].organismId)+'">'+(r.listtemplateinfo[i].organismName)+'</option>';
	}	
	$("#organismNameId").html(list);
}


/*************************************************************************************
 * @author Rohit Sandbhor
 * @since 29-09-2021
 * @Code This function is use to Set TestName and Profile name against organism name
 ************************************************************************************/
function getProcessingRoutinevalueResultMicrobiology(treatmentId,callFrom){
	var Neutrophils=$("#Neutrophils").val();
	var Lymphocytes=$("#Lymphocytes").val();
	var Eosinophils=$("#Eosinophils").val();
	var Basophils=$("#Basophils").val();
	var Monocytes=$("#Monocytes").val();
	var CbcProfile=$("#CbcProfile").val();
	var mId=$('#masterIdd').val();
	var patientType=$('#patientgander').val();
	var sampleTypeId = $("#sampleTypeId").val();
	var organNameId = "";
	if(callFrom == 'onchange'){
	organNameId = $('#organismNameId').val();
	}else if(callFrom == 'onload'){
	organNameId = 0;
	}
	
    jQuery.ajax({
        async : false,
        type : "POST",
    	data : {
    		"masterid" : mId,
			"treatmentid" : treatmentId,
			"patientType" : patientType,
			"organNameId" : organNameId
		},
		url : "ehat/phlebotomy/getRoutinevalueResultMicrobiology",
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
					
					var str= r.proLi[pk].templateWise;
					var testType="N";
					var microoranismtest = str.startsWith("M");
					if(microoranismtest == true){
						testType="MO";//check type of test,it is micro-oragnism test
					}
					
					
				$("#IdPathologist").select2('val',r.proLi[pk].pathologistId);
				
				$("#kitSpecId").select2('val',r.proLi[pk].kitSpecId);
				
				var SARSCOV2ANTIGEN = $("#SARSCOV2ANTIGEN").val();//profile Id	
				var COVID19RNAAMPLIFICATION = $("#COVID19RNAAMPLIFICATION").val();//profile Id	  				
				var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();	
				var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
				 
	            if(SARSCOV2ANTIGEN==r.proLi[pk].profileId || COVID19RNAAMPLIFICATION == r.proLi[pk].profileId )
	            {	  
	            	$('#kitspecId1').show();
	            	$('#anitId').show();
	            }else
	            {	            		            	
	            	$('#kitspecId').hide();
	            	$('#anitId1').show();
	            }	
				
				
				var collectedatetime=r.proLi[pk].collecteddate;
				if(collectedatetime!=null ){
				collectdate=collectedatetime.split(" ");		
				$("#collectionDate").text(collectdate[0]);	
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
				
				html = html + "<input type='hidden' value='p' id='type" + (testcount1) + "' />";
				html = html + "<input type='hidden' value='"+ r.proLi.length +"' id='proLength' />";
				html = html + "<input type='hidden' value='"+ r.proLi[pk].testli.length +"' id='testLength"+(pk+1)+"' />";
				
				
				html = html + "<div class='col-md-12-3'";
				
				html = html + " style='height: 50px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
				
				html = html + " id='profileId"+(pk+1)+"' data-value='"+ r.proLi[pk].profileId +"'> "+ (sr1++)+" ) "+r.proLi[pk].profileName+" ";				
				
				html = html + " <textarea id='profileIdcomments"+(pk+1)+"' value='' style='float: right; width: 308px; height: 46px;'>"+r.proLi[pk].comments+"</textarea>";
				
				html = html + "<input class='center' id='profileCheckboxId"+(pk+1)+"' name='profileCheckboxId' checked type='checkbox' value='"+r.proLi[pk].sampleWiseMasterId+"-"+(pk+1)+"'/>";
				
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
									  if (r.proLi[pk].testli[ts].testId == Neutrophils || r.proLi[pk].testli[ts].testId == Lymphocytes || r.proLi[pk].testli[ts].testId == Eosinophils ||  r.proLi[pk].testli[ts].testId == Basophils || r.proLi[pk].testli[ts].testId == Monocytes)			 
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
													
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' disabled='disabled'  type='text'></select></td>";
													

												} if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%' disabled='disabled'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
													html = html + "<td class='center' style='font-weight: bold;'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  disabled value=''></td>";
													
												}else
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') id='testresultt" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled' value=''></td>";
													

												}	
		
											}else
												{
												//html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"',"+testType+")></select></td>";
													html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text' disabled value=''></td>";
													
	
												}else
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')  onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"') id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	

												}	

											}

										} else {
											
											//alert("tttttttttttt");
											
										   if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
											{
												
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled'  style='width:100%'  type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled'  style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
													html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  disabled value=''></td>";
													
	
												}else
												{
													 html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')   value='"+(result)+"'></td>";
												}	
																								
											}else
											{
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
													html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  value=''></td>";
													
	
												}else
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus=setFormulaToTestResult("+(pk+1) + (ts+1) +","+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"')   value='"+(result)+"'></td>";	

												}												
											}
										}
									}else
									{										
										if (r.proLi[pk].testli[ts].testresult == null || r.proLi[pk].testli[ts].testresult == "" || r.proLi[pk].testli[ts].testresult == "null") {
											//alert("hhhhhhhhhhhhhhh");
											if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
											{
												
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
													html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  disabled value=''></td>";
													
	
												}else
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  disabled='disabled' value=''></td>";	

												}	
		
											}else
												{
												//html = html + "<td id='testresultt' class='center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+") onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' onfocus='setFormulaToTestResult("+(pk+1) + (ts+1) +")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";	
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
													html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  disabled value=''></td>";
	
												}else
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value=''></td>";
													
												 }

											  }

											} else {
												
												//alert("vvvvvvvvvvvvv");
												
											if(r.proLi[pk].testli[ts].rejecttestflag=="Y")
												{
												if(r.proLi[pk].testli[ts].microorganism=="Y")
												{
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text'></select></td>";	

												}if(r.proLi[pk].testli[ts].testType=="general"){
													//added getGeneralType(this.value) by Rohit on 12-09-2021
													html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' disabled='disabled' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
													html = html + "<td class='center' style='font-weight: bold;'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  disabled value=''></td>";
													
	
												}else
												{
													html = html + "<td id='testresultt'  class='col-md-2 center'><input id='testresultt" + (pk+1) + (ts+1) + "' type='text' disabled='disabled' onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")'   value='"+(result)+"'></td>";	

												}	

												}else
												{
												
													if(r.proLi[pk].testli[ts].microorganism=="Y")
													{
														html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text'></select></td>";	

													}if(r.proLi[pk].testli[ts].testType=="general"){
														//added getGeneralType(this.value) by Rohit on 12-09-2021
														html = html + "<td id='testresultt' class='col-md-2 center'><select id='testresultt"+(pk+1)+(ts+1)+ "' style='width:100%'  type='text' onchange=getGeneralType("+(pk+1)+","+(ts+1)+",this.value),setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"')></select></td>";
														html = html + "<td class='center' style='font-weight: bold;display:none'><input id='generalTypeIdd"+(pk+1)+(ts+1)+"' type='text'  disabled value=''></td>";
		
													}else
													{
														html = html + "<td id='testresultt' class='col-md-2 center'><input onkeyup=setFlagOfCritical("+(pk+1)+","+(ts+1)+",'"+quantitative+"','"+expressionConvert+"','"+testType+"') onkeypress='return validatenumericeAndAplhaNumerice(event,"+r.proLi[pk].testli[ts].provision+")' id='testresultt" + (pk+1) + (ts+1) + "' type='text'  value='"+(result)+"'></td>";	

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
										html = html + "<td style='display:none' id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'></td>";
										html = html + "<td  id='flagId1"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'></td>";
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
											if(testType == "MO"){
												 var  testmicrores=	r.proLi[pk].testli[ts].flagmark;
												 var mresult="";
												 if(testmicrores == "L"){
													 mresult="Resistant";
												 } else  if(testmicrores == "N"){
													 mresult="Intermediate";
												 }else  if(testmicrores == "H"){
													 mresult="Sensitive";
												 }
												html = html + "<td style='display:none' id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-size:15px;font-weight: bold;color:"+color+"'>"+(r.proLi[pk].testli[ts].flagmark)+"</td>";		
												html = html + "<td  id='flagId1"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+mresult+"</td>";
											}else{
												html = html + "<td style='display:none' id='flagId"+ (pk+1) + (ts+1) +"' class='center' style='font-size:15px;font-weight: bold;color:"+color+"'>"+(r.proLi[pk].testli[ts].flagmark)+"</td>";		
												html = html + "<td  id='flagId1"+ (pk+1) + (ts+1) +"' class='center' style='font-weight: bold;'>"+(r.proLi[pk].testli[ts].flagmark)+"</td>";
											}
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
									html = html + "<input type='hidden' value='"+r.proLi[pk].testli[ts].biologicalReferenceInterval +"' id='biologicalreferenceinterval"+ (pk+1) + (ts+1) +"' />";
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
				}	

				
			}
				
				$("#itemMasterRecordsList").html(html);
				getmicroorganismName(r);
				getgradingName(r);
				getGenralValueName(r);		
				
			}			
			
        }
    });  
}

function reportingprintTemplateWiseResult(treatmentId,masterIdd,gender,idtt,profileId){
	var patientName= $("#patientnamee"+idtt).val();
	var patientName1=patientName.split(".");
	
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	var meeshaFlow=$("#meeshaFlow").val();
	var mobileAuth= $("#mobileAuth").val();
	 var hospitalname=$("#hospitalname").val();
	 
	 /*
	if(meeshaFlow == "on" ){
		
		if($("#withheader").is(":checked")){
			window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			//window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
		
		}	
		
		if($("#withgraph").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_graph.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
		if($("#singlegraphRecord").is(":checked")){
			window.open("pathology_routineValueResultLab_PDF_meesha_trend_single_record.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1)+"&mobileAuth="+encodeURIComponent(mobileAuth));
		}
		
		
	}else{
		if($("#withheader").is(":checked")){
		window.open("pathology_template_reporting_print.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
		}
		if($("#withoutheader").is(":checked")){
			//window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
		
		}	
	  }*/
	  
	 if(hospitalname == "Meesha"){
			if($("#withheader").is(":checked")){
				window.open("pathology_template_reporting_print_meesha.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}
			if($("#withoutheader").is(":checked")){
				//window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
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
		   window.open("pathology_patientwise_with_header_siddivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
			
		}
		if($("#withoutheader").is(":checked")){
			  window.open("pathology_patientwise_without_header_siddivinayak.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
			
		
		}
   
   }else{
		if($("#withheader").is(":checked")){
			window.open("pathology_template_reporting_print.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
			}
			if($("#withoutheader").is(":checked")){
				//window.open("pathology_routineValueResultWPDF.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
				window.open("pathology_template_reporting_print_meesha_without_header.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName1));
			
			}	
	}
}
function reportingMicrobiologyPrint(treatmentId,masterIdd,gender,idtt,profileId){
	var patientName= $("#patientnamee"+idtt).val();
	var patientName1=patientName.split(".");
	
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();

	window.open("pathology_microbilogy_template_print.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender)+"&patientName="+encodeURIComponent(patientName1));
	
}

/**
 * @author Rohit Sandbhor
 * @since 07-10-2021
 * @comment added to get the organism name against profile id
 */
function getDefaultOrganNameProcessing(){
	var id= $("#profileId").val();
	
	var inputs = [];	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "GET",
		url : "ehat/labprofile/getDefaultOrganNameProcessing/"+id,
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#organismNameId").val(r.idOrganism);
		}
	});
}


/**
 * @author Rohit Sandbhor
 * @since 07-10-2021
 * @comment added to get the organism name against master id
 */
function getDefaultOrganName(){
	var id= $("#masterIdd").val();
	var inputs = [];	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "GET",
		url : "ehat/labprofile/getDefaultOrganName/"+id,
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#organismNameId").val(r.organismId);
		}
	});
}

function printMicrobilogyWithouHeaderPrint(){
	var treatmentId=$("#treatmentID").val();
	var masterIdd=$("#masterIdd").val();
	var gender=$("#patientgander").val();
	var patientName=$("#patientName").text();
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	window.open("pathology_microbiology_template_witouth_print.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	
}

function  printMicrobilogyWithHeaderPrint(){
	var treatmentId=$("#treatmentID").val();
	var masterIdd=$("#masterIdd").val();
	var gender=$("#patientgander").val();
	var patientName=$("#patientName").text();
	
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	window.open("patology_microbiology_template_wit_header_print.jsp?"+"&treatmentId=" + encodeURIComponent(treatmentId)+"&masterIdd="+ encodeURIComponent(masterIdd)+"&gender="+encodeURIComponent(gender) +"&patientName="+encodeURIComponent(patientName));
	
}


/*********************************************************
 * @author Dayanand khandekar
 * @since 15-10-2021
 * @comment to get list of specimen 
**********************************************************/
function getSpecimenListForProcessingAndAuthorization(){
	var inputs = [];	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "GET",
		url : "ehat/testsample/getAllSpecimenList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setSpecimenListTemplateOnProandAuthPage(r);
		}
	});
}

/**
 * @author Dayanand khandekar
 * @since 15-10-2021
 * @comments set specimen list on processing and authorization page 
 * @param r
 */
function setSpecimenListTemplateOnProandAuthPage(r){
	var list="<option value='0' >--Select--</option>";
	for ( var i = 0; i < r.lstlabspecimen.length; i++) {
		list=list+'<option  value="'+(r.lstlabspecimen[i].specimenId)+'">'+(r.lstlabspecimen[i].specimenname)+'</option>';
	}	
	$("#specimenNameId").html(list);
}


/*********************************************************
 * @author Dayanand khandekar
 * @since 15-10-2021
 * @comment to get list of growth 
**********************************************************/
function getgrowthListForProcessingAndAuthorization(){
	var inputs = [];	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "GET",
		url : "ehat/testsample/getAllGrowthList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setgrowthListTemplateOnProandAuthPage(r);
		}
	});}


/**
 * @author Dayanand khandekar
 * @since 15-10-2021
 * @comments set growth list on processing and authorization page 
 * @param r
 */
function setgrowthListTemplateOnProandAuthPage(r){
	var list="<option value='0' >--Select--</option>";
	for ( var i = 0; i < r.lstlabgrowth.length; i++) {
		list=list+'<option  value="'+(r.lstlabgrowth[i].growthId)+'">'+(r.lstlabgrowth[i].growthname)+'</option>';
	}	
	$("#growthNameId").html(list);
}

/*********************************************************
 * @author Dayanand khandekar
 * @since 15-10-2021
 * @comment to get list of colony 
**********************************************************/
function colonyListForProcessingAndAuthorization(){
	var inputs = [];	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "GET",
		url : "ehat/testsample/getAllColonyList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var list="<option value='0' >--Select--</option>";
			for ( var i = 0; i < r.lstlabcolony.length; i++) {
				list=list+'<option  value="'+(r.lstlabcolony[i].colonyId)+'">'+(r.lstlabcolony[i].colonyName)+'</option>';
			}	
			$("#colonyId").html(list);
}
	});}




function getPathologyInfo(){
	var masterIdd= $("#masterIdd").val();
	var inputs = [];	
	
	inputs.push('masterId=' + masterIdd);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/phlebotomy/getPathologyInfo",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r.lstpathoingodto.length > 0){
				var specimenId=r.lstpathoingodto[0].specimenId;
				var growthId=r.lstpathoingodto[0].growthId;
				var colonyCountId=r.lstpathoingodto[0].colonyCountId;
				var gramStarinName=r.lstpathoingodto[0].gramStarinName;
				$("#specimenNameId").val(specimenId);
				$("#growthNameId").val(specimenId);
				$("#gramStrainId").val(gramStarinName);
				$("#colonyId").val(colonyCountId);
				$("#commentId").val(r.lstpathoingodto[0].microComments);
			}
			
			
		}
	});
}
// get machine list on pathology template
function getMachineListOnTemplate(){
	
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
			
							
			var htm1="<option value='0'>--Select--</option>";
		    for ( var i = 0; i < rr.machineNameList.length; i++){    
		        htm1 = htm1 + "<option value='"+rr.machineNameList[i].machineId+"'> "+rr.machineNameList[i].machineName+" </option>";
		    }
		    $("#equipmentId").html(htm1);
		   
		  
			
		}
	});

}
//ad by Rohini.
function refreshTemplateData(){
	 $("#templateNameId").val(0);
		$("#labTestTemplateName").val("");
		CKEDITOR.instances['RiseditorSubjective'].setData("");
		
	//	$("#templatedefault").prop('checked', false);
		
				
						
}