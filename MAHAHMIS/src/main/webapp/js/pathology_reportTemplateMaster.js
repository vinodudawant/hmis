/**
 * 
 */
function resetReportTemplateForm(){
	$("#reportTemlateId").val("0");
	$("#profileId1").select2('val',"0");
	$("#profileId2").select2('val',"0");
	$("#testId").select2('val',"0");
	$("#reportTemplateMasterId").val("0");
	
	//$("#profileId1").select2.css("background-color", "lightblue")
	
	$("input[name='templateFor'][value='profile']").prop("checked",true);
	$("input[name='defaultTemplateFor'][value='All']").prop("checked",true);
	
	hideShowOnCreateTempFor();
	resetDropTable();
}

function hideShowOnCreateTempFor(){
	var value = $("input[type='radio'][name='templateFor']:checked").val();
	if(value == "test"){
		var value1 = $("input[type='radio'][name='defaultTemplateFor']:checked").val();
		if(value1 == "All"){
			$('#testId').select2('enable', false);
		}else{
			$('#testId').select2('enable', true);
		}
		$("#testDiv").show();
		$("#multiProfileDiv").hide();
		$("#singleProfileDiv").show();
	}else{
		$("#testDiv").hide();
		$("#multiProfileDiv").show();
		$("#singleProfileDiv").hide();
	}
	setContentDragDropTemp();
}


/* ***************************
   By Kranti Godse 6 april 2021
  **************************** */

function editLabReportTemplate(id){
	$("#reportTemplateMasterId").val(id);
	$("#reportTemplateModal").modal('show');
	var divContent = "";
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labReportTemplate/editLabReportTemplate/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r.reportTemplateList.length > 0){
				if(r.reportTemplateList[0].templateFor == "profile"){
					setContentDragDropTemp('profile');
					$("input[name='templateFor'][value='profile']").prop("checked",true);
					for(var j = 0; j < r.reportTemplateList[0].labReportTemplateSlaveList.length; j++){
						/*$("#profileId1 option[value="+r.reportTemplateList[0].labReportTemplateSlaveList[j].labProfileDTO.idprofile+"-"+r.reportTemplateList[0].labReportTemplateSlaveList[j].labProfileDTO.autosugeestionDto.subId+"]")
						.css("background-color", "lightblue");*/
					}
				  }else if(r.reportTemplateList[0].templateFor == "test"){
					  setContentDragDropTemp('test');
					$("input[name='templateFor'][value='test']").prop("checked",true);
					if(r.reportTemplateList[0].defaultFor == "All"){
						$("input[name='defaultTemplateFor'][value='All']").prop("checked",true);
						$('#testId').select2('enable', false);
						$("#singleProfileDiv").show();
						$("#profileId2").select2('val',
								r.reportTemplateList[0].labReportTemplateSlaveList[0].labProfileDTO.idprofile+"-"+r.reportTemplateList[0].labReportTemplateSlaveList[0].labProfileDTO.autosugeestionDto.subId);
						$("#testDiv").show();
						$("#multiProfileDiv").hide();
				   }else{
						$("#profileId2").select2('val',
								r.reportTemplateList[0].labReportTemplateSlaveList[0].labProfileDTO.idprofile+"-"+r.reportTemplateList[0].labReportTemplateSlaveList[0].labProfileDTO.autosugeestionDto.subId);
						$("input[name='defaultTemplateFor'][value='Individual']").prop("checked",true);
						$('#testId').select2('enable', true);
						$("#singleProfileDiv").show();
						$("#multiProfileDiv").hide();
						$("#testDiv").show();
					}
				}
				var contents = r.reportTemplateList[0].contents;
				var content  = contents.split(",");
				for(var i=0;i<content.length;i++){
					if(r.reportTemplateList[0].templateFor == "test"){
						if(content[i]=="1"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>1.</td>"
							+ "<td class='col-md-11 center' title='Department Name'>Department Name</td>"
							+ "<input type='hidden' id='tid1' value='1' name='tk' />"
							+"</tr>";
						}else if(content[i]=="2"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>2.</td>"
							+ "<td class='col-md-11 center' title='Test Name'>Test Name</td>"
							+ "<input type='hidden' id='tid2' value='2' name='tk' />"
							+"</tr>";
						}else if(content[i]=="3"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>3.</td>"
							+ "<td class='col-md-11 center' title='Test Method'>Test Method</td>"
							+ "<input type='hidden' id='tid3' value='3' name='tk' />"
							+"</tr>";
						}else if(content[i]=="4"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>4.</td>"
							+ "<td class='col-md-11 center' title='KIT Specification'>KIT Specification</td>"
							+ "<input type='hidden' id='tid4' value='4' name='tk' />"
							+"</tr>";
						}else if(content[i]=="5"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>5.</td>"
							+ "<td class='col-md-11 center' title='Specimen'>Specimen</td>"
							+ "<input type='hidden' id='tid5' value='5' name='tk' />"
							+"</tr>";
						}else if(content[i]=="6"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>6.</td>"
							+ "<td class='col-md-11 center' title='Test Interpretation'>Test Interpretation</td>"
							+ "<input type='hidden' id='tid6' value='6' name='tk' />"
							+"</tr>";
						}else if(content[i]=="7"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>7.</td>"
							+ "<td class='col-md-11 center' title='Test Comments'>Test Comments</td>"
							+ "<input type='hidden' id='tid7' value='7' name='tk' />"
							+"</tr>";
						}else if(content[i]=="8"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>8.</td>"
							+ "<td class='col-md-11 center' title='Test Notes'>Test Notes</td>"
							+ "<input type='hidden' id='tid8' value='8' name='tk' />"
							+"</tr>";
						}else if(content[i]=="9"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>9.</td>"
							+ "<td class='col-md-11 center' title='Result'>Result</td>"
							+ "<input type='hidden' id='tid9' value='9' name='tk' />"
							+"</tr>";
						}else if(content[i]=="10"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>10.</td>"
							+ "<td class='col-md-11 center' title='Unit'>Unit</td>"
							+ "<input type='hidden' id='tid10' value='10' name='tk' />"
							+"</tr>";
						}else if(content[i]=="11"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>11.</td>"
							+ "<td class='col-md-11 center' title='Biological Ref. Interval'>Biological Ref. Interval</td>"
							+ "<input type='hidden' id='tid11' value='11' name='tk' />"
							+"</tr>";
						}else if(content[i]=="12"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>12.</td>"
							+ "<td class='col-md-11 center' title='Graph'>Graph</td>"
							+ "<input type='hidden' id='tid12' value='12' name='tk' />"
							+"</tr>";
						}
					}else{
						if(content[i]=="1"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>1.</td>"
							+ "<td class='col-md-11 center' title='Department Name'>Department Name</td>"
							+ "<input type='hidden' id='tid1' value='1' name='tk' />"
							+"</tr>";
						}else if(content[i]=="2"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>2.</td>"
							+ "<td class='col-md-11 center' title='Profile Name'>Profile Name</td>"
							+ "<input type='hidden' id='tid2' value='2' name='tk' />"
							+"</tr>";
						}else if(content[i]=="3"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>3.</td>"
							+ "<td class='col-md-11 center' title='Test Name'>Test Name</td>"
							+ "<input type='hidden' id='tid3' value='3' name='tk' />"
							+"</tr>";
						}else if(content[i]=="4"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>4.</td>"
							+ "<td class='col-md-11 center' title='Test Method'>Test Method</td>"
							+ "<input type='hidden' id='tid4' value='4' name='tk' />"
							+"</tr>";
						}else if(content[i]=="5"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>5.</td>"
							+ "<td class='col-md-11 center' title='Test KIT Specification'>Test KIT Specification</td>"
							+ "<input type='hidden' id='tid5' value='5' name='tk' />"
							+"</tr>";
						}else if(content[i]=="6"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>6.</td>"
							+ "<td class='col-md-11 center' title='Specimen'>Specimen</td>"
							+ "<input type='hidden' id='tid6' value='6' name='tk' />"
							+"</tr>";	
						}else if(content[i]=="7"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>7.</td>"
							+ "<td class='col-md-11 center' title='Test Interpretation'>Test Interpretation</td>"
							+ "<input type='hidden' id='tid7' value='7' name='tk' />"
							+"</tr>";
					
						}else if(content[i]=="8"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>8.</td>"
							+ "<td class='col-md-11 center' title='Test Comments'>Test Comments</td>"
							+ "<input type='hidden' id='tid8' value='8' name='tk' />"
							+"</tr>";
						}else if(content[i]=="9"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>9.</td>"
							+ "<td class='col-md-11 center' title='Test Notes'>Test Notes</td>"
							+ "<input type='hidden' id='tid9' value='9' name='tk' />"
							+"</tr>";
						}else if(content[i]=="10"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>10.</td>"
							+ "<td class='col-md-11 center' title='Profile Name'>Profile Name</td>"
							+ "<input type='hidden' id='tid10' value='10' name='tk' />"
							+"</tr>";
						}else if(content[i]=="11"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>11.</td>"
							+ "<td class='col-md-11 center' title='Profile KIT Specification'>Profile KIT Specification</td>"
							+ "<input type='hidden' id='tid11' value='11' name='tk' />"
							+"</tr>";
						}else if(content[i]=="12"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>12.</td>"
							+ "<td class='col-md-11 center' title='Profile Interpretation'>Profile Interpretation</td>"
							+ "<input type='hidden' id='tid12' value='12' name='tk' />"
							+"</tr>";
						}else if(content[i]=="13"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>13.</td>"
							+ "<td class='col-md-11 center' title='Profile Comments'>Profile Comments</td>"
							+ "<input type='hidden' id='tid13' value='13' name='tk' />"
							+"</tr>";
						}else if(content[i]=="14"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>14.</td>"
							+ "<td class='col-md-11 center' title='Profile Notes'>Profile Notes</td>"
							+ "<input type='hidden' id='tid14' value='14' name='tk'/>"
							+"</tr>";
						}else if(content[i]=="15"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>15.</td>"
							+ "<td class='col-md-11 center' title='Result'>Result</td>"
							+ "<input type='hidden' id='tid15' value='15' name='tk' />"
							+"</tr>";
						}else if(content[i]=="16"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>16.</td>"
							+ "<td class='col-md-11 center' title='Unit'>Unit</td>"
							+ "<input type='hidden' id='tid16' value='16' name='tk' />"
							+"</tr>";
						}else if(content[i]=="17"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>17.</td>"
							+ "<td class='col-md-11 center' title='Biological Ref. Interval'>Biological Ref. Interval</td>"
							+ "<input type='hidden' id='tid17' value='17' name='tk' />"
							+"</tr>";
						}else if(content[i]=="18"){
							divContent = divContent+"<tr>"
							+ "<td class='col-md-1 center'>18.</td>"
							+ "<td class='col-md-11 center' title='Test Graph'>Test Graph</td>"
							+ "<input type='hidden' id='tid18' value='18' name='tk'/>"
							+"</tr>";
						}
					}
				}
				$("#tb2").html(divContent);
			}
		}
	});
}

function resetDropTable() {
	$("#tb2").empty();
	var enableDropdown = "<table  id='table-draggable2' class='table table-striped table-condensed cf'>"
		+ "<tbody class='connectedSortable' id='tb2'>"
		+ "<tr> <th> <th></tr>"
		+ "</tbody></table>";
	
	$("#tb2").html(enableDropdown);
}

function getAllLabProfiles(){
	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "ehat/labReportTemplate/getAllLabProfiles",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setLabProfileDropDown(r);
		}
	});
}

function setLabProfileDropDown(r){
	var dropdownList = "<option value='0'>Select Profile</option>";
	for ( var i = 0; i < r.profileli.length; i++) {
		dropdownList = dropdownList + "<option value="+r.profileli[i].idprofile+"-"+r.profileli[i].autosugeestionDto.subId+">"+r.profileli[i].profileName+"</option>";	
	}	
	$("#profileId1").html(dropdownList);
	$("#profileId2").html(dropdownList);
}

function getAllTestsUnderProfile(){
	var value = $("input[type='radio'][name='templateFor']:checked").val();
	
	var profileIds = "";
	var profileId = 0;
	if(value == "test"){
		profileIds = $("#profileId2").val();
		var data = profileIds.split("-");
		profileId = data[0];
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/labReportTemplate/getAllTestsUnderProfile/"+profileId,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setLabTestsDropDown(r);
			}
		});
	}
}

function setLabTestsDropDown(r){
	var dropdownList = "<option value='0'>Select Test</option>";
	for(var i = 0; i < r.labProfileTestCompDTO.length; i++) {
		dropdownList = dropdownList + "<option value="+r.labProfileTestCompDTO[i].labTestDTO.idTest+">"+r.labProfileTestCompDTO[i].labTestDTO.testName+"</option>";	
	}	
	$("#testId").html(dropdownList);
}

function setContentDragDropTemp(editType){
	var value = $("input[type='radio'][name='templateFor']:checked").val();

	var divContent = "";
	if(value == "test" || editType == "test"){
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>1.</td>"
			+ "<td class='col-md-11 center' title='Department Name'>Department Name</td>"
			+ "<input type='hidden' id='tid1' value='1' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>2.</td>"
			+ "<td class='col-md-11 center' title='Test Name'>Test Name</td>"
			+ "<input type='hidden' id='tid2' value='2' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>3.</td>"
			+ "<td class='col-md-11 center' title='Test Method'>Test Method</td>"
			+ "<input type='hidden' id='tid3' value='3' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>4.</td>"
			+ "<td class='col-md-11 center' title='KIT Specification'>KIT Specification</td>"
			+ "<input type='hidden' id='tid4' value='4' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>5.</td>"
			+ "<td class='col-md-11 center' title='Specimen'>Specimen</td>"
			+ "<input type='hidden' id='tid5' value='5' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>6.</td>"
			+ "<td class='col-md-11 center' title='Test Interpretation'>Test Interpretation</td>"
			+ "<input type='hidden' id='tid6' value='6' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>7.</td>"
			+ "<td class='col-md-11 center' title='Test Comments'>Test Comments</td>"
			+ "<input type='hidden' id='tid7' value='7' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>8.</td>"
			+ "<td class='col-md-11 center' title='Test Notes'>Test Notes</td>"
			+ "<input type='hidden' id='tid8' value='8' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>9.</td>"
			+ "<td class='col-md-11 center' title='Result'>Result</td>"
			+ "<input type='hidden' id='tid9' value='9' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>10.</td>"
			+ "<td class='col-md-11 center' title='Unit'>Unit</td>"
			+ "<input type='hidden' id='tid10' value='10' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>11.</td>"
			+ "<td class='col-md-11 center' title='Biological Ref. Interval'>Biological Ref. Interval</td>"
			+ "<input type='hidden' id='tid11' value='11' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>12.</td>"
			+ "<td class='col-md-11 center' title='Graph'>Graph</td>"
			+ "<input type='hidden' id='tid12' value='12' name='tk' />"
			+"</tr>";
	}else{
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>1.</td>"
			+ "<td class='col-md-11 center' title='Department Name'>Department Name</td>"
			+ "<input type='hidden' id='tid1' value='1' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>2.</td>"
			+ "<td class='col-md-11 center' title='Profile Name'>Profile Name</td>"
			+ "<input type='hidden' id='tid2' value='2' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>3.</td>"
			+ "<td class='col-md-11 center' title='Test Name'>Test Name</td>"
			+ "<input type='hidden' id='tid3' value='3' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>4.</td>"
			+ "<td class='col-md-11 center' title='Test Method'>Test Method</td>"
			+ "<input type='hidden' id='tid4' value='4' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>5.</td>"
			+ "<td class='col-md-11 center' title='Test KIT Specification'>Test KIT Specification</td>"
			+ "<input type='hidden' id='tid5' value='5' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>6.</td>"
			+ "<td class='col-md-11 center' title='Specimen'>Specimen</td>"
			+ "<input type='hidden' id='tid6' value='6' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>7.</td>"
			+ "<td class='col-md-11 center' title='Test Interpretation'>Test Interpretation</td>"
			+ "<input type='hidden' id='tid7' value='7' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>8.</td>"
			+ "<td class='col-md-11 center' title='Test Comments'>Test Comments</td>"
			+ "<input type='hidden' id='tid8' value='8' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>9.</td>"
			+ "<td class='col-md-11 center' title='Test Notes'>Test Notes</td>"
			+ "<input type='hidden' id='tid9' value='9' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>10.</td>"
			+ "<td class='col-md-11 center' title='Profile Name'>Profile Name</td>"
			+ "<input type='hidden' id='tid10' value='10' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>11.</td>"
			+ "<td class='col-md-11 center' title='Profile KIT Specification'>Profile KIT Specification</td>"
			+ "<input type='hidden' id='tid11' value='11' name='tk' />"
			+"</tr>";
	
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>12.</td>"
			+ "<td class='col-md-11 center' title='Profile Interpretation'>Profile Interpretation</td>"
			+ "<input type='hidden' id='tid12' value='12' name='tk' />"
			+"</tr>";
		
		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>13.</td>"
			+ "<td class='col-md-11 center' title='Profile Comments'>Profile Comments</td>"
			+ "<input type='hidden' id='tid13' value='13' name='tk' />"
			+"</tr>";

		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>14.</td>"
			+ "<td class='col-md-11 center' title='Profile Notes'>Profile Notes</td>"
			+ "<input type='hidden' id='tid14' value='14' name='tk'/>"
			+"</tr>";

		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>15.</td>"
			+ "<td class='col-md-11 center' title='Result'>Result</td>"
			+ "<input type='hidden' id='tid15' value='15' name='tk' />"
			+"</tr>";

		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>16.</td>"
			+ "<td class='col-md-11 center' title='Unit'>Unit</td>"
			+ "<input type='hidden' id='tid16' value='16' name='tk' />"
			+"</tr>";

		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>17.</td>"
			+ "<td class='col-md-11 center' title='Biological Ref. Interval'>Biological Ref. Interval</td>"
			+ "<input type='hidden' id='tid17' value='17' name='tk' />"
			+"</tr>";

		divContent = divContent+"<tr>"
			+ "<td class='col-md-1 center'>18.</td>"
			+ "<td class='col-md-11 center' title='Test Graph'>Test Graph</td>"
			+ "<input type='hidden' id='tid18' value='18' name='tk'/>"
			+"</tr>";
	}
	$("#tb1").html(divContent);
}

function saveLabReportTemplate(){

	var reportTemplateMasterId = $("#reportTemplateMasterId").val();
	var reportTemplateId = $("#reportTemplateId").val();
	var templateFor = $("input[type='radio'][name='templateFor']:checked").val();
	
	var profileIds = 0;
	if(templateFor == "test"){
		profileIds = $("#profileId2").val();
	}else{
		profileIds = $("#profileId1").val();
	}
	
	var defaultTemplateFor = $("input[type='radio'][name='defaultTemplateFor']:checked").val();
	var testId = $("#testId").val();
	var serviceId = $.trim($("#pathologyId").val());
	var userId = $.trim($("#userId").val());
	var unitId = $.trim($("#unitId").val());
	
	var rows = $('#tb2 tr').length;
	//alert("rows : "+rows);
	var testNames = [];
	// fetching values from tb2 table
	$('#tb2 tr')
	.each(
			function() {
				var ptid = $(
						($(this)
								.find('input[name=tk]')))
						.attr('value');
				
				
				var hd = $(
						($(this)
								.find('input[name=hd]')))
						.attr('value');
				if(ptid != undefined){
					testNames.push(ptid);
				}
				
				if(hd != undefined){
					hd = 0+"$"+hd;
					testNames.push(hd);
				}
			});
	
	// Removing duplicate elements from array
	var testList = [];
	$.each(testNames, function(i, el){
	    if($.inArray(el, testList) === -1) testList.push(el);
	});
	
	// Checking condition,is request coming from edit button?
	//alert("profileIds : "+profileIds);
	if(profileIds == 0){
		alert("Please select profile.");
		return false;
	}
	if(defaultTemplateFor == "Individual"){
		if(testId == 0){
			alert("Please select test.");
			return false;
		}
	}
	if(testNames.length == 0 || testNames == ""){
		alert("Please Drag Test From Left Side Box and Drop it into Right Empty Box!");
		return false;
	}
	if(reportTemplateId > 0) {
		if(rows == 0){
			alert("You can't remove all tests,Please drop minimum one Lab test in Right table!");
			makeDivEmptyt2();
			return false;	
		}	
	}
	if(reportTemplateId == 0) {
		if(rows == 1) {
			alert("Please Drag Test From Left Side Box and Drop it into Right Empty Box!");
			makeDivEmptyt2();
			return false;
		}
	}
	if(testList.length < testNames.length) {
		alert("Please Remove Duplicate Element From Right Box!");
		SetFocus("tb1");
		return false;
	}
	
	/*
	alert("profileIds : "+profileIds);
	alert("templateFor : "+templateFor);
	alert("defaultTemplateFor : "+defaultTemplateFor);
	alert("testId : "+testId);
	alert("testNames : "+testNames);
	alert("testList : "+testList);
	*/
	var inputs = [];
		inputs.push('reportTemplateMasterId=' + reportTemplateMasterId);
		inputs.push('reportTemplateId=' + reportTemplateId);
		inputs.push('templateFor=' + templateFor);
		inputs.push('profileIds=' + profileIds);
		inputs.push('defaultFor=' + defaultTemplateFor);
		inputs.push('testId=' + testId);
		inputs.push('unitId=' + unitId);
		inputs.push('createdBy=' + userId);
		inputs.push('serviceId=' + serviceId);
		inputs.push('contents=' + testList);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labReportTemplate/saveLabReportTemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			$("#reportTemplateId").val("0");
			
			$("#reportTemplateModal").modal('hide');
			getAllReportTemplates();
			/*getProfiles("onload");
			resetReportTemplateForm();
			setDragDropTempForTable2(null, "save");*/
		}
	});
}

function getAllReportTemplates(){
	var unitId = $.trim($("#unitId").val());
	var inputs = [];
		inputs.push('unitId=' + encodeURIComponent(unitId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labReportTemplate/getAllReportTemplates",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
//			alert(JSON.stringify(r));
			setLabReportTemplate(r);
		}
	});
}

function setLabReportTemplate(r){
	var divContent = "";
	if(r.reportTemplateList.length > 0){
		for(var i = 0; i < r.reportTemplateList.length; i++){
			var profileName = "";
			var defaultTests = "-"
			var testName = "-"
			if(r.reportTemplateList[i].templateFor == "profile"){
				for(var j = 0; j < r.reportTemplateList[i].labReportTemplateSlaveList.length; j++){
					if(j == 0){
						profileName = profileName + ""+r.reportTemplateList[i].labReportTemplateSlaveList[j].labProfileDTO.profileName;
					}else{
						profileName = profileName + ","+r.reportTemplateList[i].labReportTemplateSlaveList[j].labProfileDTO.profileName;
					}
				}
			}else{
				profileName = profileName + ""+r.reportTemplateList[i].labReportTemplateSlaveList[0].labProfileDTO.profileName;
				defaultTests = r.reportTemplateList[i].defaultFor;
				if(defaultTests == "Individual")
					testName = r.reportTemplateList[i].labReportTemplateSlaveList[0].labTestDTO.testName;
			}
			
			divContent = divContent
					+ '<tr>'
					+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
			divContent = divContent
					+ "<td class='col-md-2 center'>"+r.reportTemplateList[i].templateFor+"</td>";
			divContent = divContent
					+ "<td class='col-md-2 center'>"+profileName+"</td>";
			divContent = divContent
					+ "<td class='col-md-2 center'>"+defaultTests+"</td>";
			divContent = divContent
					+ "<td class='col-md-2 center'>"+testName+"</td>";
			divContent = divContent+ " <td class='col-md-1 center'>"
					+ "<button class='btn btn-xs btn-success' onclick=editLabReportTemplate('"+r.reportTemplateList[i].reportTemplateMasterId+"')><i class='fa fa-edit'></i></button></td>";
			divContent = divContent
					+ " <td class='col-md-1 center'>"
					+ "	<button class='btn btn-xs btn-danger' onclick=deleteLabReportTemplate('"+r.reportTemplateList[i].reportTemplateMasterId+"')><i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}else{
		divContent = divContent
			+ "<tr style='height:30px; color:red; font-size:15px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	}
	$('#reportTemplateBody').html(divContent);
}