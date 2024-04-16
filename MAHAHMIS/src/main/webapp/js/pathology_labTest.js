/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment 
*******************************************************************************/
function toggleEntryDiv(id){
		$("#"+id).toggle('slow');
}



/******************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for hide show the div (individual and genral radio button)(of pathology_labTest.jsp)
****************************************************************************************************/
function displayGeneralDiv(){
	var normalValues =document.querySelector('input[name="normalValues"]:checked').value;
	$('#templateDiv').hide();
	if (normalValues == 'general') {
		$('#generalDiv').show();
		$('#addRemoveButton').hide();
		$('#valueTypeTable').hide();
		$('#unitToAgeTable').hide();
		$('#labUnitIdGeneralDiv').show();
		$('#machineDiv').hide();
		$('#noteDiv').show();
		$('#clinicalUseDiv').show();
		$('#increasedLevelDiv').show();
		$('#interpretationDiv').show();
		$('#commentsDiv').show();
		$('#biologicalReferenceWithGeneralDiv').show();
	} else {
		$('#generalDiv').hide();
		//$('#addRemoveButton').show();
		$('#valueTypeTable').show();
		//$('#unitToAgeTable').show();
		$('#labUnitIdGeneralDiv').hide();
		$('#biologicalReferenceWithGeneralDiv').hide();
		
		$('#noteDiv').hide();
		$('#clinicalUseDiv').hide();
		$('#increasedLevelDiv').hide();
		$('#interpretationDiv').hide();
		$('#commentsDiv').hide();
		$('#machineDiv').show();
	}
}

/***************************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for hide show the div (parameter and template radio button)(of pathology_labTest.jsp)
**************************************************************************************************************/
function getReportTypeValue(){
	var reportTypeValue =document.querySelector('input[name="reportType"]:checked').value;
	if(reportTypeValue=='byTemplate'){
		$('#addRemoveButton').hide();
		$('#unitToAgeTable').hide();
		$('#normalValuesDiv').hide();
		$('#generalDiv').hide();
		$('#noteDiv').hide();
		$('#clinicalUseDiv').hide();
		$('#increasedLevelDiv').hide();
		$('#interpretationDiv').hide();
		$('#commentsDiv').hide();
		$('#impressionDiv').hide();
		$('#biologicalReferenceWithGeneralDiv').hide();
		$('#labUnitIdGeneralDiv').hide();
		$('#templateDiv').show();
		
		
	}else{
		//$('#addRemoveButton').show();
		//$('#unitToAgeTable').show();
		$('#normalValuesDiv').show();
		$('#generalDiv').show();
		$('#noteDiv').show();
		$('#clinicalUseDiv').show();
		$('#increasedLevelDiv').show();
		$('#interpretationDiv').show();
		$('#commentsDiv').show();
		$('#impressionDiv').show();
		$('#biologicalReferenceWithGeneralDiv').show();
		$('#labUnitIdGeneralDiv').show();
		$('#templateDiv').hide();
	}
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for show the create template model  
*******************************************************************************/
function createTemplateForLabTest(){
	$("#viewLabTestTemplate").modal('show');
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for get All Test method for dropdown 
*******************************************************************************/
function getAllTestMethod(){
	var byName="";
	var callFrom='searchBtn';
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labmethod/getalltestmethods",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Test Method</option>';
			for ( var i = 0; i < r.testMethodlist.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.testMethodlist[i].idtestMethod+'">'+r.testMethodlist[i].methodCode+' - '+r.testMethodlist[i].methodName+'</option>';	
			}	
			$("#testMethodId").html(dropdownList);
			$("#reagentTestMethodId").html(dropdownList);
		}
	});
	
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for get All Unit List for dropdown 
*******************************************************************************/
function getAllUnitList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unittype/getallunittypeslist",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Unit</option>';
			for ( var i = 0; i < r.unitTypeList.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.unitTypeList[i].idunitType+'">'+r.unitTypeList[i].unitName+'</option>';	
			}	
			$("#unitList").html(JSON.stringify(r));
			$("#labUnitId").html(dropdownList);
			$("#labUnitIdGeneral").html(dropdownList);
			//$("#labUnitIdGeneral").select2(dropdownList);
		}
	});
	
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for get All Heading List for dropdown 
*******************************************************************************/
function getAllHeadingList(){
	var pathologyId = $("#pathologyId").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			pathologyId : pathologyId
		},
		url : "ehat/labtest/getAllHeadingList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Heading</option>';
			for ( var i = 0; i < r.lstSubService.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.lstSubService[i].subId+'">'+r.lstSubService[i].codeName+' - '+r.lstSubService[i].categoryName+'</option>';	
			}	
			$("#headingId").html(dropdownList);
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for create row for table
*******************************************************************************/
function createRow(){/*
	var rows = $('#tableBody tr').length;
	rows++;
	divId = "tableBodyRow" + rows;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("tableBody").appendChild(x);
	document.getElementById(divId).innerHTML =

			'<td class="col-md-1 center"><label>'+ rows+ '</label><input class="col-md-1 center" type="checkbox" value="0"  name="tableBodyBox" id="tableBody'+ rows + '"/></td>'

			+ '<td class="col-md-1 center"><input style="width:100%" type="text" id="fromAge'+ rows+ '" ><select id="ageIn'+rows+'"><option value="year">Year</option><option value="month">Month</option><option value="days">Days</option></select></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text"  id="toAge'+ rows+ '"></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="cl'+ rows+ '" ></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="low'+ rows+ '"></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="high'+ rows+ '" ></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="ch'+ rows+ '" ></td>'

			+ '<td class="col-md-1 center"><input   type="checkbox" name="maleCheckbox'+ rows+ '" id="maleCheckbox'+ rows+ '" ></td>'

			+ '<td class="col-md-1 center"><input  type="checkbox" name="femaleCheckbox'+ rows+ '" id="femaleCheckbox'+ rows+ '"></td>'

			+ '<td class="col-md-1 center"><input  type="checkbox" name="othersCheckbox'+ rows+ '" id="othersCheckbox'+ rows+ '" ></td>'

			+ '<td class="col-md-2 center"><select style="width:100%"  type="text" id="idUnit'+ rows+ '" ></select></td>'
	
			+ '<td class="col-md-2 center"><select style="width:100%"  type="text" id="idSpecialCase'+ rows+ '"></select></td></tr>';
	
	//getAllUnitList('row',rows);
	setDropDownUnitList('idUnit'+rows);
	setAllSpecialCase('idSpecialCase'+rows);
*/}

/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for create table body for table
*******************************************************************************/
/*function createStaticTableBody(){
	var divcontent="<tr><td><label class='col-md-1 center' id='sex1'>Male</label></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='lower1'></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='upper1'></td>"
		+"<td><select style='width:80%' class=col-md-1 center' type='text'  id='unit1'></select></td></tr>"
		+"<tr><td><label class='col-md-1 center' id='sex2'>Female</label></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='lower2'></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='upper2'></td>"
		+"<td><select style='width:80%' class=col-md-1 center' type='text'  id='unit2'></select></td></tr>"
		+"<tr><td><label class='col-md-1 center' id='sex3'>Child</label></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='lower3'></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='upper3'></td>"
		+"<td><select style='width:80%' class=col-md-1 center' type='text'  id='unit3'></select></td></tr>"
		+"<tr><td><label class='col-md-1 center' id='sex4'>Neonate</label></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='lower4'></td>"
		+"<td><input style='width:80%' class=col-md-1 center' type='text'  id='upper4'></td>"
		+"<td><select style='width:80%' class=col-md-1 center' type='text'  id='unit4'></select></td></tr>";
		
	$("#valueTypeTableBody").html(divcontent);
}
*/
/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for get values of table
*******************************************************************************/
/*function getValuesOfStaticTable(){
	var table = {labTestNormalValueList : [] };
	var flag="static";
	var totalRows = $('#valueTypeTableBody tr').length;
	for ( var i = 1; i <= totalRows; i++) {
		var sex=$('#sex'+i).text();
		
		var lower = $("#lower" + i).val();
		if (lower=="" || lower==null) {
			alert("Please Enter lower value");
			$("#lower" + i).focus();
			return false;
		}
		
		var upper = $("#upper" + i).val();
		if (upper=="" || upper==null) {
			alert("Please Enter upper value");
			$("#upper" + i).focus();
			return false;
		}
		
		var unit = $("#unit" + i).val();
		if (unit=="" || unit==null) {
			alert("Please Enter unit value");
			$("#unit" + i).focus();
			return false;
		}
		
		table.labTestNormalValueList.push({
			sex : sex,
			lowerValue : lower,
			upperValue : upper,
			idUnit : unit,
			flag : flag
		});
	}
	return table;
}
*/


/******************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for reset Form
****************************************************************************************************/
function resetTestForm(){
	$("#idLabTest").val("0");	
	$("#testName").val("");
	$("#aliesName").val("");
	$("#testCode").val("");
	$("#headingId").select2('val',"-1");
	$("#testMethodId").select2('val',"-1");
	$("#sampleId").select2('val',"-1");
	$("#containerId").select2('val',"-1");
	$("#labUnitId").select2('val',"-1");
	$("#volumeName").val("");
	$("#fasting").val("");
	$("#tat").val("");
	$("#general").val("");
	$('#note').val("");
	$('#clinicalUse').val("");
	$('#increasedLevel').val("");
	$('#interpretation').val("");
	$('#comments').val("");
	$("input[name='reportType'][value='byParameter']").prop("checked",true);
	$("input[name='normalValues'][value='individual']").prop("checked",true);
	$("#nabl").prop('checked', false);
	$("#drugSensitivity").prop('checked', false);
	$("#processTestoutlab").prop('checked', false);
	$("#timeSensitive").prop('checked', false);
	$("#tempratureSensitive").prop('checked', false);
	$("#tempDiv").hide(); 
	$("#minTempratureSensitive").val("");
	$("#maxTempratureSensitive").val("");
	
	$("#timeDiv").hide();
	$("#timeSensitivevalue").val("");
	$("#heightPrerequisite").prop('checked', false);
	$("#weightPrerequisite").prop('checked', false);
	$("#urineVolume").prop('checked', false);
	$("#lmpStatus").prop('checked', false);
	$('#labTestLi').trigger("click");
	
	$("#prerequisite").prop('checked', false);
	$("#reportingDecimal").prop('checked', false);
	$("#reportingDiv").hide();
	$("#reportingDecimalValue").val("");
	
	$("#fromageListHidden").val("");
	$("#machinIdListHidden").val("");
	$("#trendanalysisId").prop('checked', false);
	//$("#applyFormula").prop('checked', false);
	$("#testRerun").prop('checked', false);
	$("#microorganism").prop('checked', false);
	$("#microorganismDiv").hide();
	$("#microorganismCount").val("");
	$("#quantitative").prop('checked', false);
	
	$("#biologicalReferenceChk").prop('checked', false);
	$("#sampleTypeChk").prop('checked', false);
	$("#testMethodChk").prop('checked', false);
	
	$("#nel").prop('checked', true);
	$("#cl").prop('checked', true);
	$("#low").prop('checked', true);
	$("#default").prop('checked', true);
	$("#high").prop('checked', true);
	$("#ch").prop('checked', true);
	$("#neh").prop('checked', true);
	
	displayGeneralDiv();
	
	var tableHeaderRowCount = 1;
	var tableHeader=2;
	var table = document.getElementById('unitToAgeTable');
	var rowCount = table.rows.length;
	for (var i = tableHeader; i < rowCount; i++) {
	    table.deleteRow(tableHeader);
	}
	
	var outlabTable = document.getElementById('outlabTable');
	var rowCount = outlabTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		outlabTable.deleteRow(tableHeaderRowCount);
	}
	
	var reagentTable = document.getElementById('reagentTable');
	var rowCount = reagentTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		reagentTable.deleteRow(tableHeaderRowCount);
	}
	
	var generalValuesTable = document.getElementById('generalValuesTable');
	var rowCount = generalValuesTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		generalValuesTable.deleteRow(tableHeaderRowCount);
	}
	getMachineNameWithTestId();
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for get All lab test
*******************************************************************************/
function getAllLabTest(pageNumber){
	var startIndex = 0;
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/labtest/getAllLabTest",
		data	: str + "&reqType=AJAX",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var countAuto = (pageNumber - 1) + '1';
			countAuto = Number(countAuto);
			
			var divContent = "";
			for ( var i = 0; i < r.labTestList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ countAuto + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labTestList[i].testName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labTestList[i].testCode+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editLabTestMaster('"+r.labTestList[i].idTest+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger deleteUserAccess' onclick=deleteLabTestMaster('"+r.labTestList[i].idTest+"')><i class='fa fa-trash-o'></i></button></td></tr>";
				countAuto++;
			}
			
			var numberOfRows="";
			var indexopd=1;
			var opdcount = r.labTestCount;
			var numberOfPages=(opdcount/10);
			var displayPagination=numberOfPages;    
			
			if(pageNumber == 1)
				{
			if(numberOfPages > 5){
			    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			    displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				 if(j == Number(pageNumber-1))
					{
				        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getAllLabTest("+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

					}
					else
					{
				        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getAllLabTest("+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
					}
					indexopd=indexopd+1;
			}
			if(numberOfPages>6){
			    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
			}

			$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
			$('#opdpagenation').html(numberOfRows);
		}
			
			$('#testTableBody').html(divContent);
		}
	});
}

function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getAllLabTest("+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getAllLabTest("+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for delete lab test by id
*******************************************************************************/
function deleteLabTestMaster(id){
	var r = confirm("Are You Sure You Want To Delete this Test ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/labtest/deleteTestById",
		data : {
			testId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "Test Delete Sucessfully");		
			}else{
				alertify.error( "Test Not Deleted.");		
			}
			getAllLabTest();
		}
	});
 	}
}



/****************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for search test by Name
******************************************************************************************************/	
function searchTestByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			searchName : value
		},
		url : "ehat/labtest/searchTestByName",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.labTestList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labTestList[i].testName+"</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labTestList[i].testCode+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editLabTestMaster('"+r.labTestList[i].idTest+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteLabTestMaster('"+r.labTestList[i].idTest+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#testTableBody').html(divContent);
		}
	});	
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for create row for Reagent 
*******************************************************************************/
function createReagentRow(){
	var rows = $('#reagentTableBody tr').length;
	rows++;
	divId = "reagentRows" + rows;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("reagentTableBody").appendChild(x);
	document.getElementById(divId).innerHTML ='<td><label class="col-md-1 center">'+ rows+ '</label></td>'

			+ '<td><input class="col-md-1 center" style="width:100%"  type="text" id="idReagent'+ rows+ '" ></td>'
	
			+ '<td><input class="col-md-1 center" style="width:100%" type="text" id="idQuantity'+ rows+ '" ></td>'
	
			+ '<td><input class="col-md-1 center" style="width:100%" type="text" id="idUnitMeasurment'+ rows+ '" ></td>'
			
			+ '<td><input class="col-md-1 center" style="width:100%" type="text" id="idMachineName'+ rows+ '" ></td>'
			
			+ '<td><input class="col-md-1 center" style="width:100%" type="text" id="idTestMethod'+ rows+ '" ></td>'
			
			+ '<td><input class="col-md-1 center" style="width:100%" type="checkbox" value="0"  name="reagentBodyCheckbox" id="reagentBodyCheckbox'+ rows + '"></td>'
			
			+'</tr>';
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Template Using LabTest Id
*******************************************************************************/
function getTemplateForLabTest(value){
	if(value=='-1'){
		$("#labTestTemplateName").val("");
		CKEDITOR.instances['iEditorTestTemplate'].setData("");
		$("#idLabTestTemplates").val("0");
		$("#iImpression").val("");
		return false;
	}
	var idLabTest=$("#idLabTest").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			templateValue : value,
			idLabTest : idLabTest
		},
		url : "ehat/labtest/getTemplateForLabTest",
		cache : false,
		error : function() {
			alertify.error("Error");
		},
		success : function(r) {
				$("#labTestTemplateName").val(r.labTestTemplateList[0].testTemplateName);
				CKEDITOR.instances['iEditorTestTemplate'].setData(r.labTestTemplateList[0].testTemplateText);
				$("#idLabTestTemplates").val(r.labTestTemplateList[0].idlabTestTemplate);
				$("#iImpression").val(r.labTestTemplateList[0].impressions);
				
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get All Special Case List
*******************************************************************************/
function getAllSpecialCase(){
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/specialcase/getAllSpecialCases",
				error : function() {
					alertify.error('Network Issue');
				},
				success : function(r) {
					$("#specialCaseList").html(JSON.stringify(r));
				}
			});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for set All Special Case List
*******************************************************************************/
function setAllSpecialCase(id){
	var ajaxResponse = $("#specialCaseList").html();
	var r = JSON.parse(ajaxResponse);
	var dropdownList='<option value="-1">Select Special Case</option>';
	for ( var i = 0; i < r.specialCaseList.length; i++) {
		dropdownList=dropdownList+'<option value="'+r.specialCaseList[i].idSpecialCase+'">'+r.specialCaseList[i].spacialCaseName+'</option>';	
	}	
	$("#"+id).html(dropdownList);
			
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Reagent List
*******************************************************************************/
function getReagentList(type){
	var inputs = [];
	inputs.push('type=' + encodeURIComponent(type));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/reagentdetails/getAllReagentList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Reagent</option>';
			for ( var i = 0; i < r.lstItemMaster.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.lstItemMaster[i].id+'">'+r.lstItemMaster[i].itemName+'</option>';	
			}	
			$("#reagentId").html(dropdownList);
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Machine/Asset List
*******************************************************************************/
function getMachineList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/reagentdetails/getAllAssetList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Asset</option>';
			for ( var i = 0; i < r.lstItemMaster.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.lstItemMaster[i].id+'">'+r.lstItemMaster[i].itemName+'</option>';	
			}	
			$("#machineName").html(dropdownList);
		}
	});
	
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Reagent values  by id
*******************************************************************************/
function getReagentValues(value){
	if(value=='-1'){
		$('#quantity').val("");
		$('#unitName').val("");
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				id : value
			},
			url : "ehat/reagentdetails/getReagentValues",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor2 == 0 ){
					$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor1);
					$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitOneName);
					}
					else if(r.itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor3 == 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0){
						$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor2);
						$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitTwoName);
					}
					else if(r.itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0){
						$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor3);
						$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitThreeName);
					}
					else if(r.itemPurchaseSlaveDto[0].purchaseUomFactor4 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0){
						$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor4);
						$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitFourName);
					}
			}
		});
	}
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for save Reagent details
*******************************************************************************/
function clearReagentForm(){
	$("#reagentId").val("-1");
	$('#quantity').val("");
	$('#unitName').val("");
	$('#machineName').val("-1");
	$('#reagentTestMethodId').val("-1");
}



/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for save Reagent details
*******************************************************************************/
function saveReagentDetails(){
	var idTest = $('#idLabTest').val();
	if(idTest=="" || idTest==null || idTest==undefined || idTest=="0"){
		return false;
	}
	var reagentId = $("#reagentId").val();
	var quantity = $('#quantity').val();
	var unitName = $('#unitName').val();
	var machineName = $('#machineName').val();
	var reagentTestMethodId = $('#reagentTestMethodId').val();
	var idLabReagentDetails = $("#idLabReagentDetails").val();
	var inputs = [];	
	inputs.push('idReagentDetail='+idLabReagentDetails);
	inputs.push('reagentId=' + reagentId);
	inputs.push('quantity=' + quantity);
	inputs.push('idUnit=' + unitName);
	inputs.push('assestId=' + machineName);
	inputs.push('labTestMethodId=' + reagentTestMethodId);
	inputs.push('labTestId=' + idTest);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/reagentdetails/saveReagentDetails",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Reagent Details Saved Sucessfully");
			}
			else if (data == 2) {
				alertify.success( "Reagent Details Updated Sucessfully");				
			}
			else{
				alertify.error("Oops Some Problem Occurred");
			}
			clearReagentForm();
			getAllReagentByTest();
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get all Reagent details
*******************************************************************************/
function getAllReagentByTest(){
	//alert("In get");
	var idLabTest = $('#idLabTest').val();
	if(idLabTest=='0' || idLabTest==""){
		return false;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/reagentdetails/getAllReagentByTest",
		cache : false,
		data : {
			id : idLabTest
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.labReagentDetailsList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labReagentDetailsList[i].itemMasterReagent.itemName+"</td>";
				
				divContent = divContent	+ "<td class='col-md-1 center'>"+r.labReagentDetailsList[i].quantity+"</td>";
				
				divContent = divContent+ "<td class='col-md-1 center'>"+r.labReagentDetailsList[i].idUnit+"</td>";
				
				divContent = divContent+ "<td class='col-md-1 center'>"+r.labReagentDetailsList[i].itemMasterAsset.itemName+"</td>";
				
				divContent = divContent+ "<td class='col-md-1 center'>"+r.labReagentDetailsList[i].labTestMethod.methodName+"</td>";
				
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteReagentById('"+r.labReagentDetailsList[i].idReagentDetail+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#reagentTableBody').html(divContent);
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for delete Reagent details
*******************************************************************************/
function deleteReagentById(id){
	var idLabTest=$("#idLabTest").val();
	var r = confirm("Are You Sure You Want To Delete this Reagent ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/reagentdetails/deleteReagentById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "Reagent Delete Sucessfully");		
			}else{
				alertify.error( "Reagent Not Deleted.");		
			}
			editLabTestMaster(idLabTest);
		}
	});
 	}
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for delete Reagent details
*******************************************************************************/
function isCheckTempratureSesitive(id){
	
	if($('#'+id).is('checked')){
		$('#tempDiv').show();
	}else{
		$('#tempDiv').hide();
		}
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for remove Outlab Row
*******************************************************************************/
function removeOutlabRow(){
	
	idList=[];
    $("#outlabTableBody").find('input[name="outlabCheckbox"]').each(function(){
        if($(this).is(":checked")){
        	var currentId1=$('#'+this.id).val();
        	if(currentId1==0){
        		$(this).parents("tr").remove();
        	}else{
        		$(this).parents("tr").remove();
        		idList.push(currentId1);
        	}	
        }
    });
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for  Check Temprature Sesitive
*******************************************************************************/
function isCheckTempratureSesitive() {
	if ($("#tempratureSensitive").is(':checked')){
		 $("#tempDiv").show();
		 $("#minTempratureSensitive").val("");
		 $("#maxTempratureSensitive").val("");
	} else{
    	 $("#tempDiv").hide(); 
    	 $("#minTempratureSensitive").val("");
		 $("#maxTempratureSensitive").val("");
    }
    	 
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for Check Time Sensitive
*******************************************************************************/
function isCheckTimeSensitive() {
	if ($("#timeSensitive").is(':checked')){
		  $("#timeDiv").show();
		  $("#timeSensitivevalue").val("");
	} else{
    	  $("#timeDiv").hide(); 
    	  $("#timeSensitivevalue").val("");
    }
      
}




/********************************************************************************
 * @author Ganesh Patil
 * @since 03-03-2020
 * @comment for process at Outlab 
*******************************************************************************/
function processatOutlab() {
	if ($("#processTestoutlab").is(':checked')){
		 $("#outlabli").show();
	} else{
    	 $("#outlabli").hide(); 
    }
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 03-03-2020
 * @comment for save Lab Test Master
*******************************************************************************/
function saveLabTestMaster(){
	var ageTable = {labTestNormalValueList : []};
	var labTest= { labTestList :[]};
	var testTemp={labTestTemplateList :[]};
	var reagent={ reagentList :[]};
	var outlab={ outlabList :[]};
	
	var mt="";
	var callFrom;
	var testRate = 0;
	var motivatorCash = 0;
	var motivatorSponsored = 0;
	var clinicPercent = 0;
	
	//test lab
	var testName = $("#testName").val();
	if(testName==null || testName=="" || testName==undefined){
		alert("Please Enter test Name");
		return false;
	}
	
	var aliesName = $("#aliesName").val();
	if (aliesName == null || aliesName == "" || aliesName == undefined) {
		alert("Please Enter alies Name");
		return false;
	}
		
	var testCode = $("#testCode").val();
	if(testCode==null || testCode=="" || testCode==undefined){
		alert("Please Enter test code");
		return false;
	}
		
	var headingId = $("#headingId").val();
	if(headingId==-1 || headingId==""){
		alert("Please Select Heading");
		return false;
	}
		
	var testMethodId = $("#testMethodId").val();
	if(testMethodId==-1 || testMethodId==""){
		alert("Please Select test Method");
		return false;
	}
	
	/*
	var machineNameId = 1;
	var machineNameId = $("#machineNameId").val();
	if(machineNameId==-1 || machineNameId==""){
		alert("Please Select Machine Name");
		return false;
	}	
	*/	
	var sampleId = $("#sampleId").val();
	if(sampleId==-1 || sampleId==""){
		alert("Please Select sample");
		return false;
	}
		
	var containerId = $("#containerId").val();
	if(containerId==-1 || containerId==""){
		alert("Please Select container");
		return false;
	}
		
	var labUnitId = $("#labUnitId").val();
	if(labUnitId==-1 || labUnitId==""){
		alert("Please Select Unit type ");
		return false;
	}
	
	var volumeName = $("#volumeName").val();
	/*if (volumeName == null || volumeName == "" || volumeName == undefined) {
		alert("Please Enter volume Name");
		//return false;
	}*/
		
    var idProvison = $("#idProvison").val();
	//var decimalRoundOff = $("#decimalRoundOff").val();
		
	var fasting = $("#fasting").val();
	var tat = $("#tat").val();
	
	var microorganism= "N";
	var microorganismCount= "0";
	if ($("#microorganism").is(':checked')){
		microorganism= "Y";
		
		var count = $.trim($("#microorganismCount").val());
		if(count == null || count == "" || count == undefined){
			alert("Please Enter microorganism count.");
			return false;
		}else{
			microorganismCount = count;
		}
	}
	
	var reportingDecimal= "N";
	var reportingDecimalValue= "0";
	if ($("#reportingDecimal").is(':checked')){
		reportingDecimal= "Y";
		
		var decimalValue = $.trim($("#reportingDecimalValue").val());
		if(decimalValue==null || decimalValue=="" || decimalValue==undefined){
			alert("Please Enter decimal value");
			return false;
		}else{
			reportingDecimalValue = decimalValue;
		}
	}
		
	var minTempratureSensitive=$("#minTempratureSensitive").val();
	var maxTempratureSensitive=$("#maxTempratureSensitive").val();
	
	var tempratureSensitive= "N";
	if ($("#tempratureSensitive").is(':checked')){
		tempratureSensitive= "Y";
	}
	
	var quantitative = "N";
	if ($("#quantitative").is(':checked')){
		quantitative= "Y";
	}
	
	var minTempratureSensitive=$("#minTempratureSensitive").val();
	var maxTempratureSensitive=$("#maxTempratureSensitive").val();
	
	var timeSensitive= "N";
	if ($("#timeSensitive").is(':checked')){
		timeSensitive= "Y";
	}
		
	var timeSensitivevalue=$("#timeSensitivevalue").val();
		
	var drugSensitivity= "N";
	if ($("#drugSensitivity").is(':checked')){
		drugSensitivity= "Y";
	}
		
	var nabl= "N";
	if ($("#nabl").is(':checked')){
		nabl= "Y";
	}
		
	var processTestoutlab = "N";
	if ($("#processTestoutlab").is(':checked')){
		processTestoutlab= "Y";
	}
		
	var prerequisite= "N";
	if ($("#prerequisite").is(':checked')){
		prerequisite= "Y";
	}
	
	//Added by Akshay
	var trendanalysisId= "N";
	if ($("#trendanalysisId").is(':checked')){
		trendanalysisId= "Y";
	}
	
	var testRerun= "N";
	if ($("#testRerun").is(':checked')){
		testRerun= "Y";
	}
	    
	var idLabTest = $("#idLabTest").val();	
	var height = "N";
	if ($("#heightPrerequisite").is(':checked')){
		height = "Y";
	}
		
	var weight= "N";
	if ($("#weightPrerequisite").is(':checked')){
		weight= "Y";
	}
		
	var urineVolume= "N";
	if ($("#urineVolume").is(':checked')){
		urineVolume= "Y";
	}
		
	//Added by KishoR
	var lmpStatus= "N";
	if ($("#lmpStatus").is(':checked')){
		lmpStatus= "Y";
	} else{
		lmpStatus= "N";
	}
	
	var biologicalReferenceChk= "N";
	if ($("#biologicalReferenceChk").is(':checked')){
		biologicalReferenceChk= "Y";
	}
	
	var sampleTypeChk= "N";
	if ($("#sampleTypeChk").is(':checked')){
		sampleTypeChk= "Y";
	}
	
	var testMethodChk= "N";
	if ($("#testMethodChk").is(':checked')){
		testMethodChk= "Y";
	}
		
	//Normal Range 
	var general = "-";
	var reportType =document.querySelector('input[name="reportType"]:checked').value;
	if (reportType == "byTemplate") {
		var testTemp = {
			labTestTemplateList : []
		};
		var testEditorTemplate;
		var impression;
		var templateId = $("#templateId").val();
		var idLabTestTemplates;
		var labTestTemplateName;
		callFrom = "template";
		if (templateId == -1) {
			labTestTemplateName = $("#labTestTemplateName").val();
			if (labTestTemplateName == "" || labTestTemplateName == null
					|| labTestTemplateName == undefined) {
				alert("Please enter Test Template Name.");
				return false;
			}

			testEditorTemplate = CKEDITOR.instances["iEditorTestTemplate"]
					.getData();
			impression = $("#iImpression").val();
			idLabTestTemplates = $("#idLabTestTemplates").val();
		} else {
			labTestTemplateName = $("#labTestTemplateName").val();
			testEditorTemplate = CKEDITOR.instances["iEditorTestTemplate"]
					.getData();
			impression = $("#iImpression").val();
			idLabTestTemplates = $("#idLabTestTemplates").val();
		}

		testTemp.labTestTemplateList.push({
			idlabTestTemplate : idLabTestTemplates,
			testTemplateName : labTestTemplateName,
			testTemplateText : testEditorTemplate,
			impressions : impression
		});
		//console.log(JSON.stringify(testTemp));
	} else {
		callFrom = "parameter";
		var normalValues = document.querySelector('input[name="normalValues"]:checked').value;
		if (normalValues == 'individual') {
			var note = $("#note").val();
			var clinicalUse = $("#clinicalUse").val();
			var increasedLevel = $("#increasedLevel").val();
			var interpretation = $("#interpretation").val();
			var comments = $("#comments").val();

			if (getValuesOfTable() == false) {
				// || getValuesOfStaticTable()==false
				return false;
			} else {

			}
		} else {
			normalValues = "general";
			var totalRow = $('#generalValuesTable tbody tr').length;
			if (totalRow == "0" || general == 0) {
				alert("Please enter general");
				$("#general").focus();
				return false;
			}
			
			/*general = $.trim($("#general").val());
			if (general == "" || general == null || general == undefined) {
				alert("Please enter general");
				$("#general").focus();
				return false;
			}*/
		}
	}
		
	var textFlag= "N";
	if ($("#textValues").is(':checked')){
		textFlag= "Y";
	}
		
	
	var note = $("#note").val(); 
	var clinicalUse =$("#clinicalUse").val(); 
	var increasedLevel = $("#increasedLevel").val();
	var interpretation = $("#interpretation").val(); 
	var comments = $("#comments").val();
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	var labUnitIdGeneral=$("#labUnitIdGeneral").val();
	var biologicalReferenceWithGeneral = $("#biologicalReferenceWithGeneral").val(); 
		 
	labTest.labTestList.push({
		unitId : unitId,
		userId : userId,
		idTest : idLabTest,
		testName : testName,
		testCode : testCode,
		clinicPercent : clinicPercent,
		height : height,
		weight : weight,
		urineVolume : urineVolume,
		lmpStatus : lmpStatus,
		normalValueType : normalValues,
		aliesName : aliesName,
		headingId : headingId,
		labTestMethodId : testMethodId,
		//machineNameId :machineNameId,
		sampleId : sampleId,
		containerId : containerId,
		labUnitId : labUnitId,
		volumeName : volumeName,
		fasting : fasting,
		turnAroundTime : tat,
		tempratureSensitive : tempratureSensitive,
		minTemp :minTempratureSensitive,
		maxTemp :maxTempratureSensitive,
		timeSensitive :timeSensitive,
		timeSensitiveValue :timeSensitivevalue,
		drugSensitivity :drugSensitivity,
		isNabl :nabl,
		prerequisite : prerequisite,
		trendanalysisId :trendanalysisId,
		processTestoutlab : processTestoutlab,
		reportValueType : reportType,
		clinicalUse : clinicalUse,
		increasedLevel : increasedLevel,
		testInterpretation : interpretation,
		testComments :comments,
		testNote : note,
		biologicalReferenceWithGeneral : biologicalReferenceWithGeneral,
		motivatorCash : motivatorCash,
		motivatorSponsored : motivatorSponsored,
		provision : idProvison,
		//decimalRoundOff : decimalRoundOff,
		testGeneral : general,
		microorganism : microorganism,
		microorganismCount : microorganismCount,
		reportingDecimal : reportingDecimal,
		reportingDecimalValue : reportingDecimalValue,
		testRerun : testRerun,
		quantitative : quantitative,
		unitIdGenaral : labUnitIdGeneral,
		biologicalReferenceChk : biologicalReferenceChk,
		sampleTypeChk : sampleTypeChk,
		testMethodChk : testMethodChk,
		textFlag : textFlag
		
	});
	
	// Reagent Details
	var reagent = JSON.stringify(reagentTable());
	// Normal Values
	var normal = JSON.stringify(getValuesOfTable());
	
	// Out Lab Details
	var out = JSON.stringify(getOutlabValues());
			
	var test = JSON.stringify(labTest);
	
	var generalValues = JSON.stringify(getGeneralValues());
	
	var inputs = [];
	inputs.push('labTestDetails=' + encodeURIComponent(test));
	inputs.push('reagentDetails=' + reagent);
	inputs.push('normalRangeDetails=' + normal);
	inputs.push('outLabDetails=' + out);
	inputs.push('generalValues=' + encodeURIComponent(generalValues));
			
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labtest/saveLabTest",
		cache : false,
		error : function() {
			alertify.error("Error");
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Lab Test Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "Lab Test Updated Sucessfully");				
			}else if(r==3){
				alertify.error( "Lab Test Name or Test Code already present");	
			}else{
				alertify.success("Lab Test Saved Sucessfully");
			}
			
			$("#labTestModal").modal('hide');
			getAllLabTest();
			resetTestForm();
		}
	});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for set All Unit List for dropdown 
*******************************************************************************/
function setDropDownUnitList(id){
	
	var ajaxResponse = $("#unitList").html();
	var r = JSON.parse(ajaxResponse);
	var dropdownList='<option value="-1">Select Unit</option>';
	for ( var i = 0; i < r.unitTypeList.length; i++) {
		dropdownList=dropdownList+'<option value="'+r.unitTypeList[i].idunitType+'">'+r.unitTypeList[i].unitName+'</option>';	
	}
	$("#"+id).html(dropdownList);
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get All lAB Sample  List
******************************************************************************************************/
function getAllLabSampleList(){
	var byName="";
	var callFrom='searchBtn';
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/testsample/getalltestsamples",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Test Sample</option>';
			for ( var i = 0; i < r.testSamplelist.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.testSamplelist[i].idTestSample+'">'+r.testSamplelist[i].sampleName+'</option>';	
			}	
			$("#sampleId").html(dropdownList);
		}
	});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get All Sample Container List
******************************************************************************************************/
function getAllSampleContainerList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/samplecontainer/getAllSampleContainer",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Test Sample</option>';
			for ( var i = 0; i < r.sampleContainerList.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.sampleContainerList[i].idSampleConatiner+'">'+r.sampleContainerList[i].conatinerName+'</option>';	
			}	
			$("#containerId").html(dropdownList);
		}
	});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for Validate only numbers
******************************************************************************************************/
function validateDecimal(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 46
			|| (keycode > 34 && keycode < 41)) {

		return true;
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
};

/****************************************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment To Validate Alphabets.
******************************************************************************************************/
function validateNumericOrAlphabet(key) {
	var provisionId = $("#idProvison").val();
	if(provisionId == 1){
		var keycode = (key.which) ? key.which : key.keyCode;
		if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
				|| keycode == 127 || keycode == 13 || keycode == 46
				|| (keycode > 34 && keycode < 41)) {

			return true;
		} else {
			alert("Please Enter Numbers Only!");
			return false;
		}
	}else if(provisionId == 3){
		try {
	        if (window.event) {
	            var charCode = window.event.keyCode;
	        }else if(e){
	            var charCode = e.which;
	        }else{ 
	        	return true; 
	        }
	        
	        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)){
	            return true;
	        }else{
	        	alert("Please Enter Alphabets Only!");
	            return false;
	        }
	    }
	    catch (err) {
	        alert(err.Description);
	    }
	}else
	{
		
	}	
};

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for Validate only numbers
******************************************************************************************************/
function validateNumber(evt){
	 evt = (evt) ? evt : window.event;
	   var charCode = (evt.which) ? evt.which : evt.keyCode;
	   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		   alert("Enter only numbers");
	      return false;
	    }
	    return true;
}





/********************************************************************************
 * @author Ganesh Patil
 * @since 03-03-2020
 * @comment for add Rows For Reagent Table
*******************************************************************************/
function addRowsForReagentTable() {
	var rows = $('#reagentTable tbody tr').length;
	addDynamicRecordsToReagentDetail(rows + 1,rows);
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 03-03-2020
 * @comment for add dynamic Rows For Reagent Table
*******************************************************************************/
function addDynamicRecordsToReagentDetail(id,index) {
	var reagentType;
	if($('input[name="reagentType"]:checked').length === 0) {
		alert("Select Reagent/Consumable Type");
	     return false;
	}else{
	 reagentType =document.querySelector('input[name="reagentType"]:checked').value;
	 }
	
	var reagentId = $("#reagentId").val();
	if(reagentId=='-1' || reagentId==""){
		alert("Select reagent");
	     return false;
	}
	var reagentName= $("#reagentId option:selected").text();
	
	//var machineId = $("#machineName").val();
	/*if(machineId=='-1' || machineId==""){
		alert("Select Machine Name");
	     return false;
	}*/
	//var machineName =$("#machineName option:selected").text();
	
	
	var quantity = $("#quantity").val();
	var unitName= $("#unitName").val();
	var testMethodId= $("#reagentTestMethodId").val();
	if(testMethodId=='-1' || testMethodId==""){
		alert("Select Test method");
	     return false;
	}
	var testMethodName= $("#reagentTestMethodId option:selected").text();
	var htm = "";
	//var index = 1;
	htm = htm
			+ '<tr class="newAddedReagent">'
			+ ' <td class="col-md-1 center"><input type="hidden" id="idLabReagentDetails'+id+'" value="0">'+ (index+1)+ '</td>'
			+ ' <td class="col-md-1 center">'+ reagentName +'<input type="hidden" id="reagentName'+id+'" value="'+reagentId+'"></td>'
			+ ' <td class="col-md-1 center" id="reagentType'+id+'">'+ reagentType +'</td>'
			+ ' <td class="col-md-1 center" id="quantity'+id+'">'+ quantity +'</td>'
			+ ' <td class="col-md-1 center" id="unitName'+id+'">'+ unitName +'</td>'
/*			+ ' <td class="col-md-1 center">'+ machineName +'<input type="hidden" id="machineName'+id+'" value="'+machineId+'"></td>'
*/			+ ' <td class="col-md-1 center">'+ testMethodName +'<input type="hidden"  id="testMethodNameid'+id+'" value="'+testMethodId+'"></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" name="reagentClass" id="deletebtn'+id+'" isNew="true" onclick=deleteReagentDetails('+id+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
	$("#reagentTableBody").append(htm);
	//refreshItemVendorSlaveData();
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 03-03-2020
 * @comment for delete Reagent Details
*******************************************************************************/
function deleteReagentDetails(id){
		$("#reagentTableBody").on('click','#deletebtn' + id + '',function() {
							var isNew = $("#deletebtn" + id).attr('isNew');
							if (isNew != undefined && isNew != null && isNew == "false") {
								
							} else {
								$(this).closest('tr').remove();
							}
						});
}

/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get values reagent Table 
*******************************************************************************/
function reagentTable() {
	var reagentTable = {labReagentDetailsList : []	};

	var count = 0;
	var totalRow = $('#reagentTableBody tr').length;
	for ( var i = 1; i <= totalRow; i++) {

		count++;
		var idLabReagentDetails=$("#idLabReagentDetails" + count +"").val();
		var reagentName = $("#reagentName" + count + "").val();
		var reagentType = $("#reagentType" + count + "").text();
		var quantity = $("#quantity" + count + "").text();
		var unitName = $("#unitName" + count + "").text();
		var machineName = $("#machineName" + count + "").val();
		var testMethodNameid = $("#testMethodNameid" + count + "").val();
		
		reagentTable.labReagentDetailsList.push({
			idReagentDetail : idLabReagentDetails,
			reagentId : reagentName,
			reagentType : reagentType,
			quantity : quantity,
			unitName : unitName,
			assestId : machineName,
			labTestMethodId : testMethodNameid
			
		});
	}
	//console.log(JSON.stringify(reagentTable));
	return reagentTable;
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for delete Reagent details
*******************************************************************************/
function addOutlabRow(){
	var rows = $('#outlabTableBody tr').length;
	rows++;
	divId = "outlabTableBodyRow" + rows;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("outlabTableBody").appendChild(x);
	document.getElementById(divId).innerHTML =

			'<td class="col-md-1 center"><label><input type="hidden" id="idOutlab'+rows+'" value="0">'+ rows+ '</label></td>'

			+ '<td class="col-md-1 center"><select onchange="getOutLabsByLabType('+rows+', 0);" style="width:100%"  type="text" id="type'+ rows+ '"><option value="-1">SELECT Type</option><option value="1">Group Lab</option><option value="2">External Lab</option></select></td>'

			//+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="name'+ rows+ '" ></td>'
			+ '<td class="col-md-1 center"><select style="width:100%"  type="text" id="name'+ rows+ '"><option value="0">Select Type</option></select></td>'

			+ '<td class="col-md-1 center"><input type="checkbox" id="statusCheckbox'+ rows+ '"></td>'
			
			+'<td class="col-md-1 center"><input type="checkbox" value="0"  name="outlabCheckbox" id="outlabCheckbox'+ rows + '"/></td></tr>';
	
	//$('#statusCheckbox' + rows).bootstrapToggle();
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment for get Outlab Values table
*******************************************************************************/
function getOutlabValues(){
	var outlab = {outlabList : []	};

	var count = 0;
	var totalRow = $('#outlabTableBody tr').length;
	for ( var i = 1; i <= totalRow; i++) {
		count++;
		var idOutlab = $("#idOutlab"+count+"").val();
		
		var type = $("#type" + count + "").val();
		if(type==null || type=="" || type==undefined){
			alert("Please Enter  type");
			return false;
		}

		var name = $("#name" + count + "").val();
		if(name==null || name=="" || name==undefined){
			alert("Please Enter name");
			return false;
		}

		if ($("#statusCheckbox" + count + "").prop("checked")) {
			var statusCheckbox = "Active";
		} else {
			var statusCheckbox = "Deactive";
		}
	
		outlab.outlabList.push({
			idOutlab : idOutlab,
			type : type,
			//name : name,
			labId :name,
			labStatus : statusCheckbox,
			
		});
	}
	return outlab;
}



/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for edit lab test by id
*******************************************************************************/
function editLabTestMaster(id){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/labtest/editLabTestById",
		data : {
			labTestId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		if(r!=null){
			$('#testName').val(r.testName);
			$("#testCode").val(r.testCode);
			$("#aliesName").val(r.aliesName);
			
			$("#editResponseSetTestId").val(r);
			
			$('#headingId').select2('val',r.subService.subId);
			$('#testMethodId').select2('val',r.labTestMethod.idtestMethod);
			$('#machineNameId').select2('val',r.labTestMethod.machineNameId);
			$('#sampleId').select2('val',r.labTestSample.idTestSample);
			$('#containerId').select2('val',r.sampleContainer.idSampleConatiner);
			//$("#decimalRoundOff").val(r.decimalRoundOff);
			$("#idProvison").val(r.provision);
			$("#fasting").val(r.fasting);
			$("#tat").val(r.turnAroundTime);
			$("#volumeName").val(r.volumeName);
			setTimeout(function() {
				$('#labUnitId').select2('val',r.labUnit.idunitType);
				
			}, 4000);
			
			//$('#general').val(r.testGeneral);
			var labUnitIdGeneral=r.unitIdGenaral;
			//alert(labUnitIdGeneral);
			$('#labUnitIdGeneral').select2('val',r.unitIdGenaral);
			
			if(r.microorganism=="Y"){
				$("#microorganism").prop('checked', true);
				$('#microorganismDiv').show();
				$("#microorganismCount").val(r.microorganismCount);
			}
			
			if(r.reportingDecimal=="Y"){
				$("#reportingDecimal").prop('checked', true);
				$('#reportingDiv').show();
				$("#reportingDecimalValue").val(r.reportingDecimalValue);
			}
			
			if(r.tempratureSensitive=="Y"){
				$("#tempratureSensitive").prop('checked', true);
				$('#tempDiv').show();
				$("#minTempratureSensitive").val(r.minTemp);
				$("#maxTempratureSensitive").val(r.maxTemp);
			}
			
			if(r.timeSensitive=="Y"){
				$("#timeSensitive").prop('checked', true);
				$('#timeDiv').show();
				$("#timeSensitivevalue").val(r.timeSensitiveValue);
			}
			
			if(r.drugSensitivity=="Y"){
				$("#drugSensitivity").prop('checked', true);
			}

			if(r.isNabl=="Y"){
				$("#nabl").prop('checked', true);
			}
			
			if(r.processTestoutlab=="Y"){
				$("#processTestoutlab").prop('checked', true);
			}
			
			if(r.trendanalysisId=="Y"){
				$("#trendanalysisId").prop('checked', true);
			}
			
			if(r.prerequisite=="Y"){
				$("#prerequisite").prop('checked', true);
			}
			
			if(r.testRerun=="Y"){
				$("#testRerun").prop('checked', true);
			}

			var isQuantitative = false;
			if(r.quantitative=="Y"){
				$("#quantitative").prop('checked', true);
				isQuantitative = true;
				$("#quantitativeMachineId").val("Y");
			}
			if(r.biologicalReferenceChk=="Y"){
				$("#biologicalReferenceChk").prop('checked', true);
			}
			if(r.sampleTypeChk=="Y"){
				$("#sampleTypeChk").prop('checked', true);
			}
			if(r.testMethodChk=="Y"){
				$("#testMethodChk").prop('checked', true);
			}
			
			
			$("#idLabTest").val(r.idTest);
			
			var divContent = "";
			for ( var i = 0; i < r.labReagentDetailsDTO.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'><input type='hidden' id='idLabReagentDetails"+(i+1)+"' value='"+r.labReagentDetailsDTO[i].idReagentDetail+"'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'><input type='hidden' id='reagentName"+(i+1)+"' value='"+r.labReagentDetailsDTO[i].itemMasterReagent.id+"'>"+ r.labReagentDetailsDTO[i].itemMasterReagent.itemName+"</td>";
				
				divContent = divContent	+ "<td class='col-md-1 center' id='reagentType"+(i+1)+"'>"+r.labReagentDetailsDTO[i].reagentType+"</td>";
				
				divContent = divContent	+ "<td class='col-md-1 center' id='quantity"+(i+1)+"'>"+r.labReagentDetailsDTO[i].quantity+"</td>";
				
				divContent = divContent+ "<td class='col-md-1 center' id='unitName"+(i+1)+"'>"+r.labReagentDetailsDTO[i].unitName+"</td>";
				
/*				divContent = divContent+ "<td class='col-md-1 center'><input type='hidden' id='machineName"+(i+1)+"' value='"+ r.labReagentDetailsDTO[i].itemMasterAsset.id+"'>"+r.labReagentDetailsDTO[i].itemMasterAsset.itemName+"</td>";
*/				
				divContent = divContent+ "<td class='col-md-1 center'><input type='hidden'  id='testMethodNameid"+(i+1)+"' value='"+ r.labReagentDetailsDTO[i].labTestMethod.idtestMethod+"'>"+r.labReagentDetailsDTO[i].labTestMethod.methodName+"</td>";
				
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' id='deletebtn"+(i+1)+"' isNew='false' onclick=deleteReagentById('"+r.labReagentDetailsDTO[i].idReagentDetail+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#reagentTableBody').html(divContent);
			
			if(r.height=="Y"){
				$("#heightPrerequisite").prop('checked', true);
			}
			
			if(r.weight=="Y"){
				$("#weightPrerequisite").prop('checked', true);
			}
			
			if(r.urineVolume=="Y"){
				$("#urineVolume").prop('checked', true);
			}
			
			if(r.lmpStatus=="Y"){
				$("#lmpStatus").prop('checked', true);
			}
			
			if(r.textFlag=="Y"){
				$("#textValues").prop('checked', true);
			}else{
				$("#textValues").prop('checked', false);
			}
			
			
			var content="";
			for ( var i = 0; i < r.labOutlabDTO.length; i++) {
				content = content
						+ '<tr>'
						+ "<td  class='col-md-1 center'><input type='hidden' value='"+r.labOutlabDTO[i].idOutlab+"' id='idOutlab"+(i+1)+"'>"+ (i + 1) + "</td>";
				content = content
						+ "<td class='col-md-1 center'><select onchange='getOutLabsByLabType("+(i+1)+", '0');' style='width:100%' id='type"+(i+1)+"'><option value='-1'>SELECT Type</option><option value='1'>Group Lab</option><option value='2'>External Lab</option></select></td>";
				
				content = content	//+ "<td class='col-md-1 center'><input type='type'  id='name"+ (i+1)+ "' value='"+r.labOutlabDTO[i].labType +"'></td>";
				+ '<td class="col-md-1 center"><select style="width:100%"  type="text" id="name'+(i+1)+'"><option value="0">Select Type</option></select></td>';
				
				content = content	+ "<td class='col-md-1 center'><input type='checkbox'  id='statusCheckbox"+ (i+1) +"'></td>";
				
				content = content
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteOutlabById('"+r.labOutlabDTO[i].idOutlab+"')><i class='fa fa-trash-o'></i></button></td></tr>";
				
				
				//$("#statusCheckbox"+(i+1)+"").bootstrapToggle();
				
			}
			$('#outlabTableBody').html(content);
			//$(".newTcheckBox").bootstrapToggle();
			
			var divContentt="";
			var divContent="";
			var dynamicCount=1;
			if(r.reportValueType=='byParameter'){
				$('#note').val(r.testNote);
				$('#clinicalUse').val(r.clinicalUse);
				$('#increasedLevel').val(r.increasedlevel);
				$('#interpretation').val(r.testInterpretation);
				$('#comments').val(r.testComments);	
				$('#biologicalReferenceWithGeneral').val(r.biologicalReferenceWithGeneral);	
				$("input[name='reportType'][value='"+r.reportValueType+"']").prop("checked",true);
				$("input[name='normalValues'][value='"+r.normalValueType+"']").prop("checked",true);
			
				if(r.normalValueType=='individual'){
					
					
					
					for ( var i=0;i < r.labTestNormalValues.length; i++) {
					
						if(r.labTestNormalValues[i].flag=='dynamic'){/*
						
						divContentt = divContentt+ "<tr>";
						
						divContentt = divContentt
						+ "<td  class='col-md-1 center'><label>"+dynamicCount + "</label><input type='hidden' id='idTestNormalValue"+dynamicCount+"' value='"+r.labTestNormalValues[i].idTestNormalValue+"'><input class='col-md-1 center' type='checkbox' value='"+r.labTestNormalValues[i].idTestNormalValue+"'  name='tableBodyBox' id='tableBody"+ dynamicCount + "'/></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input  class='center' id='fromAge"+dynamicCount + "'  value='"+r.labTestNormalValues[i].fromAge +"' onkeypress='return validateDecimal(event)'><select id='ageIn"+dynamicCount+"'><option value='1'>Year</option><option value='2'>Month</option><option value='3'>Days</option></select></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='toAge"+ dynamicCount + "' value='"+r.labTestNormalValues[i].toAge   + "' onkeypress='return validateDecimal(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='nonExistLow"+ dynamicCount + "' value='"+r.labTestNormalValues[i].nonExistLow   + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='cl"+ dynamicCount + "' value='"+r.labTestNormalValues[i].cl   + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='low"+ dynamicCount + "' value='"+r.labTestNormalValues[i].lowerValue + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='defaultValue"+ dynamicCount + "' value='"+r.labTestNormalValues[i].defaultValue + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='high"+ dynamicCount + "' value='"+r.labTestNormalValues[i].upperValue + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='ch"+ dynamicCount + "' value='"+r.labTestNormalValues[i].ch  + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-1 center'>"
						+ "<input type='text' class='center ' id='nonExistHigh"+ dynamicCount + "' value='"+r.labTestNormalValues[i].nonExistHigh+ "' onkeypress='return validateNumericOrAlphabet(event)'></td>";

						if(isQuantitative){
							divContentt = divContentt
								+ "<td class='col-md-1 center'><select style='width:100%;' id='expression"+ dynamicCount+"'><option value='0'>Select</option><option value='>'>></option><option value='<'><</option></select></td>";
						}else{
							divContentt = divContentt
								+ "<td class='col-md-1 center'><select style='width:100%;' disabled id='expression"+ dynamicCount+"'><option value='0'>Select</option><option value='>'>></option><option value='<'><</option></select></td>";
						}
						divContentt = divContentt
						+ "<td class='col-md-2 center'><select  class='center ' id='idGender"+ dynamicCount + "'><option value='-1'>Select Gender</option><option value='1'>Male</option><option value='2'>Female</option><option value='4'>BOTH</option><option value='3'>Transgender</option></select></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-2 center'><select  class='center ' id='idUnit"+ dynamicCount + "'></select></td>";
						
						divContentt = divContentt
						+ "<td class='col-md-2 center'><select  class='center ' id='idSpecialCase"+ dynamicCount + "'></select></td>"
						+ "</tr>";
						dynamicCount++;
					*/}
				}
			}else{
				var htm = "";
				for(var i = 0; i < r.generalValuesList.length; i++) {
					htm = htm
							+ '<tr>'
							+ "<td  class='col-md-1 center'><input type='hidden' id='idGeneralValue"+(i+1)+"' value='"+r.generalValuesList[i].idGeneralValue+"'>"+ (i + 1) + "</td>";

					htm = htm + "<td class='col-md-2 center' colspan='2' id='generalValue"+(i+1)+"'>"+r.generalValuesList[i].testGeneral+"</td>";
					htm = htm + "<td class='col-md-2 center' colspan='2' id='generalType"+(i+1)+"'>"+r.generalValuesList[i].generalType+"</td>";
					
					htm = htm
							+ " <td class='col-md-1 center'>"
							+ "	<button class='btn btn-xs btn-danger' id='deletebtn"+(i+1)+"' isNew='false' onclick=deleteGeneralValueById('"+r.generalValuesList[i].idGeneralValue+"')><i class='fa fa-trash-o'></i></button></td></tr>";
				}

				$('#generalValuesTableBody').html(htm);
			}
				//$('#valueTypeTableBody').html(divContent);	
				$('#tableBody').html(divContentt);
				var st=1;
				var dt=1;
				for ( var i=0;i < r.labTestNormalValues.length; i++) {
						if(r.labTestNormalValues[i].flag=='dynamic'){/*
							setDropDownUnitList("idUnit"+dt);
							setAllSpecialCase("idSpecialCase"+dt);
							$("#ageIn"+dt).val(r.labTestNormalValues[i].ageIn);
							$('#idGender'+dt).val(r.labTestNormalValues[i].sex);
							$('#idUnit'+dt).val(r.labTestNormalValues[i].labUnit.idunitType);
							
							if(r.labTestNormalValues[i].expression != ""){
								$("#expression"+dt).val(r.labTestNormalValues[i].expression);
							}
							if(r.labTestNormalValues[i].labSpecialCasesDTO !=null){
								$('#idSpecialCase'+dt).val(r.labTestNormalValues[i].labSpecialCasesDTO.idSpecialCase);
							}
							
							$('#ageIn'+dt).val(r.labTestNormalValues[i].ageIn );
							dt = Number(dt + 1);
						*/}
				}
				
				for ( var i = 0; i < r.labOutlabDTO.length; i++) {
					$("#type"+(i+1)+"").val(r.labOutlabDTO[i].type);
					
					getOutLabsByLabType(i+1, r.labOutlabDTO[i].type);
					$("#name"+(i+1)+" > [value="+r.labOutlabDTO[i].dto.id+"]").attr("selected",true);
					
					if(r.labOutlabDTO[i].labStatus=='Active'){
					    $("#statusCheckbox" +(i+1)+"").prop("checked",true);
					}else {
						$("#statusCheckbox"+(i+1)+"").prop("checked",false);
					}
				}
			}
			displayGeneralDiv();
			$("#labTestModal").modal('show');
			$('#labTestLi').trigger("click");
			getMachineNameWithTestId();
			
			}
		}
	});
}


function deleteOutlabById(id){
	var idLabTest=$("#idLabTest").val();
	var r = confirm("Are You Sure You Want To Delete this Test ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/labtest/deleteOutlabById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "Outlab Delete Sucessfully");		
			}else{
				alertify.error( "Outlab Not Deleted.");		
			}
			editLabTestMaster(idLabTest);
		}
	});
 	}
}


function hideOutlab(){
	if ($("#processTestoutlab").is(':checked')){
		 $("#outlabTable").find('input,select').attr('disabled', false);
	}else{
		$("#outlabTable").find('input,select').attr('disabled', true);
	}
}

function getOutLabsByLabType(row, labType){
	var labTypeId = labType;
	if(labType == 0){
		labTypeId = $("#type"+row).val();
		if(labTypeId == 0 || labTypeId == "" || labTypeId == undefined){
			alert("First select lab type.");
			return false;
		}
	}

	var inputs = [];
	inputs.push('labTypeId=' + labTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labtest/getoutlabsbylabtype",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
					+ "<select name='Lab Type' class='col-md-12'><option value='0'>--Select Lab Type--</option>";
			for ( var i = 0; i < r.outLabMasterDtoList.length; i++) {
				divContent = divContent + "<option value='"							
							+ r.outLabMasterDtoList[i].id + "'>"
						+ r.outLabMasterDtoList[i].name + "</option>";
			}
			divContent = divContent + "</select>";
			$("#name"+row).html(divContent);
		}
	});
}

function validateTest(){
	var testId = 0;
	var testName = "";
	var testCode = "";
	setTimeout(function() {
		testId = $("#idLabTest").val();
		testName = $("#testName").val();
		testCode = $("#testCode").val();

		var inputs = [];
		inputs.push('testId=' + encodeURIComponent(testId));
		inputs.push('testName=' + encodeURIComponent(testName));
		inputs.push('testCode=' + encodeURIComponent(testCode));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/labtest/validateLabTest",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r != "Done"){
					alert(r);
					$("#testName").val("");
					$("#testCode").val("");
				}
			}
		});
	}, 500);
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment for delete Reagent details
*******************************************************************************/
function isCheckReportingDecimal() {
	if ($("#reportingDecimal").is(':checked')){
		 $("#reportingDiv").show();
		 $("#reportingDecimalValue").val("");
	} else{
    	 $("#reportingDiv").hide(); 
    	 $("#reportingDecimalValue").val("");
    }
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment for delete Reagent details
*******************************************************************************/
function isCheckMicroorganism() {
	if ($("#microorganism").is(':checked')){
		 $("#microorganismDiv").show();
		 $("#microorganismCount").val("");
		 
		var ele = document.getElementsByName('normalValues');
		for (var i = 0, len = ele.length; i < len; i++) {
			var r = ele[i];
			if (r.value === 'general') {
				r.checked = true; // set checked
			}
		}
		displayGeneralDiv();
	} else{
    	 $("#microorganismDiv").hide(); 
    	 $("#microorganismCount").val("");
    	 
    	var ele = document.getElementsByName('normalValues');
 		for (var i = 0, len = ele.length; i < len; i++) {
 			var r = ele[i];
 			if (r.value === 'individual') {
 				r.checked = true; // set checked
 			}
 		}
 		displayGeneralDiv();
    }
}

function checkAlternate(callFrom){
	if(callFrom == "quantitative"){
		if ($("#microorganism").is(':checked')){
			alert("Test cannot have micro-organism and quantitative simultaniously.");
			
			$("#quantitative"). prop("checked", false);
			return false;
		}
	}else{
		if ($("#quantitative").is(':checked')){
			alert("Test cannot have micro-organism and quantitative simultaniously.");
			
			$("#microorganism"). prop("checked", false);
			return false;
		}
	}
}

function validateNormalValues(){
	var idLabTest=$("#idLabTest").val();
	if(idLabTest == 0){
		var tableHeaderRowCount = 1;
		var tableHeader=2;
		var table = document.getElementById('unitToAgeTable');
		var rowCount = table.rows.length;
		for (var i = tableHeader; i < rowCount; i++) {
		    table.deleteRow(tableHeader);
		}
	}
}

function addGeneralValues(){
	var data = $.trim($("#general").val());
	//added by Rohit on 18-11-2021
	var dataType = $("#generalType option:selected").text(); 
	if(data != ""){
		var rows = $('#generalValuesTable tbody tr').length;
		addDynamicRecordsToGeneralValues(rows + 1, rows, data,dataType);
	}else{
		alertify.error("Please enter general value.");	
	}
	$("#general").val("");
	$("#generalType").val("");
}

function addDynamicRecordsToGeneralValues(id, index, data,dataType) {
	var htm = "";
	htm = htm
			+ '<tr class="newAddedReagent">'
			+ ' <td class="col-md-1 center"><input type="hidden" id="idGeneralValue'+id+'" value="0">'+ (index+1)+ '</td>'
			+ ' <td class="col-md-2 center" colspan="2" id="generalValue'+id+'">'+ data +'<input type="hidden" id="value'+id+'" value="0"></td>'
			//added by Rohit on 18-11-2021
			+ ' <td class="col-md-2 center" colspan="2" id="generalType'+id+'">'+ dataType +'<input type="hidden" id="value'+id+'" value="0"></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" name="reagentClass" id="deletebtn'+id+'" isNew="true" onclick=deleteGeneralValue('+id+')><i class="fa fa-trash-o"></i></button></td>'
	$("#generalValuesTableBody").append(htm);
}

function getGeneralValues() {
	var generalValuesTable = {generalValuesList : []};

	var count = 0;
	var totalRow = $('#generalValuesTable tbody tr').length;
	for ( var i = 1; i <= totalRow; i++) {
		count++;
		var idGeneralValue = $("#idGeneralValue"+count+"").val();
		var generalValue = $("#generalValue"+count+ "").text();
		//added by Rohit on 18-11-2021
		var generalType = $("#generalType"+count+ "").text();
		generalValuesTable.generalValuesList.push({
			idGeneralValue : idGeneralValue,
			testGeneral : generalValue,
			generalType : generalType
		});
	}
	return generalValuesTable;
}

function deleteGeneralValue(id) {
	$("#generalValuesTable").on('click', '#deletebtn' + id + '', function() {
		var isNew = $("#deletebtn" + id).attr('isNew');
		if (isNew != undefined && isNew != null && isNew == "false") {

		} else {
			$(this).closest('tr').remove();
		}
	});
}

function deleteGeneralValueById(id){
	var idLabTest=$("#idLabTest").val();
	var r = confirm("Are you sure you want to delete this general value ?");
 	if (r) { 
 		jQuery.ajax({
 			async : true,
 			type : "POST",
 			url : "ehat/labtest/deleteGeneralValueById",
 			data : {
 				id : id
 			},
 			cache : false,
 			error : function() {
 				alertify.error('Network Issue');
 			},
 			success : function(r) {
 				if(r==true){
 					alertify.success( "General Value Delete Sucessfully");		
 				}else{
 					alertify.error( "General Value Not Deleted.");		
 				}
 				editLabTestMaster(idLabTest);
 			}
 		});
 	}
}
/*****************************************************************************
 * @author Ganesh patil
 * @since  2-03-2021
 * @comment for get All Machine details
*******************************************************************************/
function getAllMachine(){
	
	var headingId=$("#headingId").val();
	if(headingId==-1)
	{
		alert("Please select Heading Name first");
		return false;
	}	
	var inputs = [];
	inputs.push('searchText=');
	inputs.push('callFrom=onload');
	inputs.push('headingId='+headingId);
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
		success : function(r) {
			var dropdownList='<option value="-1">Select Machine</option>';
			for ( var i = 0; i < r.machineNameList.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.machineNameList[i].machineId+'">'+r.machineNameList[i].machineName+":"+r.machineNameList[i].machineSerialNo+'</option>';	
			}	
			$("#machineId").html(dropdownList);
		}
	});
}

/*****************************************************************************
 * @author Ajay Khandare
 * @since  2-03-2021
 * @comment for hidenormalvalue details
*******************************************************************************/
function hidenormalvalue()
{
	$('#addRemoveButton').hide();
	$('#unitToAgeTable').hide();
	//$('#normalValuesDiv').hide();
}

var machineArray=[];
var fromAgeArray=[];
/********************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment for create row for table
*******************************************************************************/
function createRows(machineId){
	
	
	var provisionId = $("#idProvison").val();
	if(provisionId == 0){
		alert("Select reporting provision first.");
		return false;
	}
	
	var isQuantitative = false;
	var isquantitative="";
	if ($("#quantitative").is(':checked'))
		isQuantitative = true;
	
	var rows = $('#tableBodyDropDown'+machineId+' tr').length;
	//alert("rows : "+rows);
	rows++;
	divId = "tableBodyDropDown"+machineId+""+rows;
	//alert("divId : "+divId);
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	//alert(rows);
	if(rows > 0){
		var fromAge = $('#fromAge'+machineId+""+(rows-1)).val();
		var toAge = $('#toAge'+machineId+""+(rows-1)).val();
		var gender = $('#idGender'+machineId+""+(rows-1)).val();
		var ageIn = $('#ageIn'+machineId+""+(rows-1)).val();
		var idSpecialCase = $('#idSpecialCase'+machineId+""+(rows-1)).val();
		
		fromAgeArray.push(fromAge+":"+toAge+":"+gender+":"+machineId+":"+ageIn+":"+idSpecialCase);
		var dupsId = [];				   
	    var arrMid = fromAgeArray.filter(function(el) {
	      // If it is not a duplicate, return true
	      if (dupsId.indexOf(el) == -1) {
	    	  dupsId.push(el);				       
	        return true;
	      }
	      return false;				      
	    });
	    //alert(arrMid+"arrMid");		
	    
	    $("#fromageListHidden").val(arrMid); 	
	}
	
	document.getElementById("tableBodyDropDown"+machineId).appendChild(x);
	document.getElementById(divId).innerHTML =

		
			  '<td class="col-md-1 center"><label>'+ rows+ '</label><input type="hidden" id="idTestNormalValue'+machineId+""+rows+'" value="0"><input type="checkbox" value="0"  name="tableBodyBox" id="tableBody'+ rows + '"/></td>'

			document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-1 center"><select style="width:100%" onchange="valiDateType('+machineId+""+rows+')"  type="text" id="idGender'+machineId+""+rows+ '" ><option value="-1">Select Gender</option><option value="1">Male</option><option value="2">Female</option><option value="4">BOTH</option><option value="3">Transgender</option></select></td>'

			+ '<td class="col-md-1 center"><input style="width:100%" type="text" id="fromAge'+machineId+""+rows+ '" onkeypress="return validateDecimal(event)" onchange="validateBothType('+machineId+""+rows+','+machineId+')"><select id="ageIn'+machineId+""+rows+ '" ><option value="1">Year</option><option value="2">Month</option><option value="3">Days</option></select></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="toAge'+machineId+""+rows+ '" onkeypress="return validateDecimal(event)" onchange="validateBothType('+machineId+""+rows+','+machineId+')"></td>'
			
			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="nonExistLow'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)"></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="cl'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)"></td>'

			+ '<td class="col-md-1 center"><input style="width:100%"  type="text" id="low'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)" onchange="defaultValueAggregate('+machineId+""+rows+','+machineId+','+isQuantitative+')"></td>'
			
			+ '<td class="center" style="width:100%"><input type="text" id="defaultValue'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)"></td>'

			+ '<td class="center" style="width:100%"><input type="text" id="high'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)" onchange="defaultValueAggregate('+machineId+""+rows+','+machineId+','+isQuantitative+')"></td>'

			+ '<td class="center" style="width:100%"><input type="text" id="ch'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)"></td>'
			
			+ '<td class="center" style="width:100%"><input type="text" id="nonExistHigh'+machineId+""+rows+ '" onkeypress="return validateNumericOrAlphabet(event)"></td>';

	        //changes of greater than or equal to sign made over here
			if(isQuantitative)
				
				//document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-1 center"><select style="width: 100%" id="expression'+machineId+""+rows+ '" ><option value="0">Select</option><option value=">">></option><option value=">=">>=</option><option value="<"><</option><option value="<="><=</option></select></td>'; //<input style="width:100%;" type="text" id="expression'+ rows+'"></td>';
				document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-1 center"><select style="width: 100%" id="expression'+machineId+""+rows+ '" ><option value="0">Select</option><option value=">">></option><option value=">=">≥</option><option value="<"><</option><option value="<=">≤</option></select></td>'; //<input style="width:100%;" type="text" id="expression'+ rows+'"></td>';
			else
				//document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-1 center"><select disabled style="width: 100%" id="expression'+machineId+""+rows+ '" ><option value="0">Select</option><option value=">">></option><option value=">=">>=</option><option value="<"><</option><option value="<="><=</option></select></td>';
				document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-1 center"><select disabled style="width: 100%" id="expression'+machineId+""+rows+ '" ><option value="0">Select</option><option value=">">></option><option value=">=">≥</option><option value="<"><</option><option value="<=">≤</option></select></td>';
			
	            document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-2 center"><select style="width:100%"  type="text" id="idUnit'+machineId+""+rows+ '" ></select></td>';
	
	            document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML + '<td class="col-md-2 center"><select style="width:100%"  type="text" id="idSpecialCase'+machineId+""+rows+ '" ></select></td></tr>';
	
	setDropDownUnitList('idUnit'+machineId+""+rows);
	setAllSpecialCase('idSpecialCase'+machineId+""+rows);
}


/********************************************************************************
 * @author Ganesh Patil
 * @since 
 * @comment remove row 
*******************************************************************************/
function removeRow(machineID){
	var idLabTest=$("#idLabTest").val();
	var count = 1;
	idList=[];
    $("#tableBodyDropDown"+machineID).find('input[name="tableBodyBox"]').each(function(){
        if($(this).is(":checked")){
        	var currentId1=$('#'+this.id).val();   
        	if(currentId1==0 || currentId1==undefined){       	
        		//$(this).parents("tr").remove();
        		var trId = machineID + "" + count;
        		$("#tableBodyDropDown"+trId).remove();
        		//getMachineNameWithTestId();           	
        	}else{
        		idList.push(currentId1);       		
        	}	
        }
        count++;
    });
    if(idList.length > 0){
    	
    	var r = confirm("Are You Sure You Want To Delete this row ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('idTables=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/labtest/deleteLabTestNormalValues",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				if(r==true){
    					alertify.success("Delete Successfully");
    				}else{
    					alertify.error("Failed to Delete");
    				}
    				getMachineNameWithTestId();   				
    			}
    		});

    	}
    }
}

/********************************************************************************
 * @author Ganesh Patil // adding machine wise functionlity By ajay Khandare
 * @since 07-02-2020
 * @comment for get values of table
*******************************************************************************/
function getValuesOfTable(){
	
	var ageTable = {
			labTestNormalValueList : []
		};
		
	    var flag="dynamic";
		var pattern = /^([0-9])\d*(\.\d+)?$/;	
		var machinIdListHidden = $("#machinIdListHidden").val();	
		
		var machinevalue=machinIdListHidden.split(",");	
		
		for( var j = 0; j <= machinevalue.length; j++)
		{			
			var mahinevalueId=machinevalue[j];
			
			if(mahinevalueId == undefined)
			{
				break;
			}				
			var machineNametableBody = $('#tableBodyDropDown'+mahinevalueId+' tr').length;	
			
			var machineFlag="";			 
			if($('#defaultMachineId'+mahinevalueId).prop("checked") == true){
				    machineFlag="Y";			    	
			}else
			 {
			    	machineFlag="N";
			 }			
			for ( var i = 1; i <= machineNametableBody; i++) {				
										
				var ageIn = $("#ageIn"+ mahinevalueId + i).val();
			
				var idTestNormalValue =$("#idTestNormalValue"+ mahinevalueId + i).val();				
				
				var fromAge = $("#fromAge" + mahinevalueId + i).val();				
				if (!pattern.test(fromAge) || fromAge=="") {
					alert("Please Enter from age in digits");
					$("#fromAge"  + mahinevalueId + i).focus();
					return false;
				}
				var toAge = $("#toAge" + mahinevalueId + i).val();
				if (!pattern.test(toAge) || toAge=="") {
					alert("Please Enter  age in digits");
					$("#toAge" + mahinevalueId + i).focus();
					return false;
				}

				if (parseFloat(fromAge) > parseFloat(toAge)) { 
					alert("From age Should be less than To age");
					$("#fromAge" + mahinevalueId + i).focus();
					return false;
				}
				
				var nonExistLow = $("#nonExistLow" + mahinevalueId + i).val();
				if($("#nel"+ mahinevalueId).is(':checked')){
					if( nonExistLow=="") {
						alert("Please Enter non existant low value in digits");
						$("#nonExistLow" + mahinevalueId + i).focus();
						return false;
					}
				}
				
				var cl = $("#cl" + mahinevalueId + i).val();
				if($("#cl").is(':checked')){
					if( cl=="") {
						alert("Please Enter  cl in digits");
						$("#toAge" + mahinevalueId + i).focus();
						return false;
					}
				}
				
				if(($("#nel"+ mahinevalueId).is(':checked')) && ($("#cl"+ mahinevalueId).is(':checked'))){
					if(parseFloat(nonExistLow) > parseFloat(cl)) {
						alert("Non existant value Should be less than CL"); 
						$("#nonExistLow" + mahinevalueId + i).focus();
						return false;
					}
				}

				var low = $("#low" + mahinevalueId + i).val();
				if($("#low"+ mahinevalueId).is(':checked')){
					if ( low=="") {
						alert("Please Enter low in digits");
						$("#low" + mahinevalueId + i).focus();
						return false;
					}
				}

				var defaultValue = $("#defaultValue" + mahinevalueId + i).val();
				if($("#default"+ mahinevalueId).is(':checked')){
					if( defaultValue=="") {
						alert("Please Enter defaultValue in digits");
						$("defaultValue" + mahinevalueId + i).focus();
						return false;
					}
				}
				
				var high = $("#high" + mahinevalueId + i).val();
				if($("#high"+ mahinevalueId).is(':checked')){
					if( high=="" ) {
						alert("Please Enter high in digits");
						$("#high" + mahinevalueId + i).focus();
						return false;
					}
				}
				
				if(($("#low"+ mahinevalueId).is(':checked')) && ($("#high").is(':checked'))){
					if (parseFloat(low) > parseFloat(high)) {
						alert("Low values Should be less than High Values"); 
						$("#low" + mahinevalueId + i).focus();
						return false;
					}
				}

				var nonExistHigh = $("#nonExistHigh" + mahinevalueId + i).val();
				if($("#neh"+ mahinevalueId).is(':checked')){
					if ( nonExistHigh=="") {
						alert("Please Enter non existant High value in digits");
						$("#nonExistHigh" + mahinevalueId + i).focus();
						return false;
					}
				}
				
				var ch = $("#ch" + mahinevalueId + i).val();
				if($("#ch"+ mahinevalueId).is(':checked')){
					if ( ch=="") {
						alert("Please Enter ch in digits");
						$("#ch" + mahinevalueId + i).focus();
						return false;
					}
				}
				
				if(($("#neh"+ mahinevalueId).is(':checked')) && ($("#ch"+ mahinevalueId).is(':checked'))){
					if (parseFloat(ch) > parseFloat(nonExistHigh)) {
						alert("CH values Should be less than Non existant High"); 
						$("#nonExistHigh" + mahinevalueId + i).focus();
						return false;
					}
				}

				var expression = "";
				if ($("#quantitative").is(':checked')){
					expression = $("#expression" + mahinevalueId + i).val();
					
					if (expression == 0 || expression == "0") {
						alert("Please Select Expression.");
						$("#expression"+ mahinevalueId + i).focus();
						return false;
					}
				}
				
				var idGender = $("#idGender"+ mahinevalueId + i).val();
				if (idGender == "-1" ||idGender==null || idGender=="") {
					alert("Please Select Gender");
					$("#idGender"+ mahinevalueId + i).focus();
					return false;
				}
				
				var unit = $("#idUnit"+ mahinevalueId + i).val();
				if (unit == "-1" ||unit==null || unit=="") {
					alert("Please Select Unit Name for Normal Value");
					$("#idUnit"+ mahinevalueId + i).focus();
					return false;
				}
				
				var specialCase=$('#idSpecialCase'+ mahinevalueId + i).val();
				/*if (specialCase == "-1" ||specialCase==null || specialCase=="") {
					alert("Please Select special Case");
					$("#idSpecialCase"+ mahinevalueId + i).focus();
					//return false;
				}*/
				
				var kitSpecId=$('#kitSpecIdNormalValue'+ mahinevalueId).val();
				var testMethodIdWithNormal=$('#testMethodIdWithNormalValue'+ mahinevalueId).val();
				var noteIdwithNormal=$('#noteIdwithNormalValue'+ mahinevalueId).val();
				var clinicalIdWithNormal=$('#clinicalIdWithNormalvalue'+ mahinevalueId).val();
				var increasedIdWithNormal=$('#increasedIdWithNormalvalue'+ mahinevalueId).val();
				var interpretationWithNormal=$('#interpretationWithNormalvalue'+ mahinevalueId).val();
				var biologicalReferenceWithNormal=$('#biologicalReferenceWithNormalvalue'+ mahinevalueId).val();
				
				var commentsWithNormal=$('#commentsWithNormalvalue'+ mahinevalueId).val();
				
		
				    ageTable.labTestNormalValueList.push({
					idTestNormalValue : idTestNormalValue,
					ageIn : ageIn,
					fromAge : fromAge,
					toAge : toAge,
					nonExistLow : nonExistLow,
					cl : cl,
					lowerValue : low,
					defaultValue : defaultValue,
					upperValue : high,
					ch : ch,
					nonExistHigh : nonExistHigh,
					expression : expression,
					sex : idGender,
					idUnit : unit,
					flag : flag,
					idSpecialCase :specialCase,
					mahinevalueId :mahinevalueId,
					machineFlag :machineFlag,
					kitSpecId :kitSpecId,
					testMethodIdWithNormal :testMethodIdWithNormal,
					noteIdwithNormal :noteIdwithNormal,
					clinicalIdWithNormal :clinicalIdWithNormal,
					increasedIdWithNormal :increasedIdWithNormal,
					interpretationWithNormal :interpretationWithNormal,
					biologicalReferenceWithNormal :biologicalReferenceWithNormal,
					commentsWithNormal :commentsWithNormal,
				});				
			}			
		}		
		return ageTable;
				
}

/********************************************************************************
 * @author Ajay Khandare
 * @since  2-03-2021
 * @comment for add machine name dynamic details
*******************************************************************************/
function addMachineValues(){
	
	var machineId = $("#machineId").val();
	if(machineId==-1)
	{
	  alert("Please Select Machine Name");
	  return false;
	}
	var data=$("#machineId option:selected").text();
	if(data != ""){
		var rows = $('#machineNametable tbody tr').length;
		addDynamicRecordsToMachineValues(rows + 1, data,machineId);
		//rows++;
	}else{
		alertify.error("Please Select Machine Name.");	
	}
}

/********************************************************************************
 * @author Ajay Khandare
 * @since  2-03-2021
 * @comment for add machine name dynamic details
*******************************************************************************/
function addDynamicRecordsToMachineValues(id,data,machineId) {
	
	var machineNameHidden = $("#machineNameHidden" + machineId).val();    
	if(machineNameHidden==data)
	{
	  alert("This Machine Details Already Added");
	  return false;
	}	
	
	machineArray.push(machineId);
	var dupsId = [];				   
    var arrMid = machineArray.filter(function(el) {
      // If it is not a duplicate, return true
      if (dupsId.indexOf(el) == -1) {
    	  dupsId.push(el);				       
        return true;
      }
      return false;				      
    });
    //alert(arrMid+"arrMid");		
    $("#machinIdListHidden").val(arrMid); 	   
	var htm = "";
	htm = htm
			+ ' <tr  style="height:2px;">'
			
			+ ' <td class="center"><input type="hidden" id="idGeneralValue'+machineId+'" value="0">'+machineId+ '</td>'
			
			+ ' <td class="center" id="machineName'+machineId+'" >'+data+'<input type="hidden" id="machineNameHidden'+machineId+'" value="'+data+'"></td>'
						
			+ ' <td class="center"><input type="radio" id="defaultMachineId'+machineId+'" name="defaultMachineId" value="'+machineId+'" checked="checked"></td>'
			
			+ ' <td class="center"><button class="btn btn-xs btn-danger" onclick="deleteMachinewiseNormalValue('+machineId+')"><i class="fa fa-trash-o"></i></button></td>'
			
			+ ' <td class="center" onclick="hideShowNormalValueType('+machineId+')"  class="col-md-2 center" style="height: 21.5px;"><img id="imgupdown'+machineId+'" src="images/down.png"><input type="hidden" value="0" id="hideShowStatus'+machineId+'"></td></tr>'
	
    
	        + "<tr id='machineDropDownId"+machineId+"' style='width:100%;float:right'>" 
	        + "<td style='display:none' id='tdmachineId"+machineId+"'>"
	        + ' <table id="ehatDropDownTable'+machineId+'" class="datatable table  table-bordered">'
	       
	        + '<thead id="ehatTHeadDropDown'+machineId+'">'
	        	        
	        
	        + '<tr style="background-color: lightblue;">					'								
	       	         
	        + "<th class='col-md-1 center' style='background-color: #A0B0E0;'>#</th>"
	        + "<th class='col-md-1 center' style='background-color: #FF0F0;'>Gender</th>"
			+ "<th class='col-md-2 center' colspan='2' style='background-color: #FFF0F0;'>Age</th>"
			+ "<th class='col-md-6 center' colspan='7' style='background-color: #E0E8F0;'>Normal Values</th>"
			+ "<th class='col-md-1 center' id='exression_th1' style='background-color: #F0FFF0;'>Expression</th>"
			
			+ "<th class='col-md-2 center' style='background-color: #E0E8F0;'>Unit</th>"
			+ "<th class='col-md-2 center' style='background-color: #F0FFF0;'>Special Case</th>" 
			+ '</tr>'
			
			+ '<tr style="background-color: lightblue;">'																			     
			+ "<th class='col-md-1 center' style='background-color: #A0B0E0;'><input type='button' value='+' onclick='createRows("+machineId+")'/>"+"<input type='button' value='-' onclick='removeRow("+machineId+")' /></th>"
			+ "<th class='col-md-1 center' style='background-color: #FF0F0;'></th>"
			+ "<th class='col-md-1 center' style='background-color: #FFF0F0;'>FAge</th>"
			+ "<th class='col-md-1 center' style='background-color: #FFF0F0;'>TAge</th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Non Existant Low <input type='checkbox' id ='nel"+machineId+"' checked='checked'/> </th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>CL <input type='checkbox' id ='cl"+machineId+"' checked='checked'/></th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Low <input type='checkbox' id ='low"+machineId+"' checked='checked'/></th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Default <input type='checkbox' id ='default"+machineId+"' checked='checked'/></th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>High <input type='checkbox' id ='high"+machineId+"' checked='checked'/></th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>CH <input type='checkbox' id ='ch"+machineId+"' checked='checked'/></th>"
			+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Non Existant High <input type='checkbox'  id ='neh"+machineId+"' checked='checked'/></th>"
			+ "<th class='col-md-1 center' style='background-color: #F0FFF0;' id='exression_th2'></th>"
			
			+ "<th class='col-md-2 center' style='background-color: #E0E8F0;'></th>"
			+ "<th class='col-md-2 center' style='background-color: #F0FFF0;'></th>"

			+ '</tr>'	        	    
	       
	        + '</tr>'
	        + '</thead>'

	        + '<tbody id="tableBodyDropDown'+machineId+'">'
	        + '</tbody>'
	       
	        + ' <td class="center" style="display: none" id="kitSpecIdd'+machineId+'"></th>'
	        
	        + ' <td class="center" style="display: none" id="kitSpecId'+machineId+'">Kit Specification<textarea type="text" id="kitSpecIdNormalValue'+machineId+'"  value=""/></th>'

			+ ' <td class="center" style="display: none" id="testMethodIdWithNormalTh'+machineId+'">Test Method<select style="width: 100%" id="testMethodIdWithNormalValue'+machineId+'" ></th>'
	        
			+ ' <td class="center" style="display: none" id="noteIdwithNormalTh'+machineId+'">Note<textarea type="text" id="noteIdwithNormalValue'+machineId+'" value=""/></th>'
			
			+ ' <td class="center" style="display: none" id="clinicalIdWithNormalTh'+machineId+'">Clinical Use<textarea type="text" id="clinicalIdWithNormalvalue'+machineId+'" value=""/></th>'

			+ ' <td class="center" style="display: none" id="increasedIdWithNormalTh'+machineId+'">Increased Level<textarea type="text" id="increasedIdWithNormalvalue'+machineId+'" value=""/></th>'
			
			+ ' <td class="center" style="display: none" id="interpretationWithNormalTh'+machineId+'">Interpretation<textarea type="text" id="interpretationWithNormalvalue'+machineId+'"   value=""/></th>'
			
			+ ' <td class="center" style="display: none" id="biologicalReferenceWithNormalTh'+machineId+'">Biological Reference<textarea type="text" id="biologicalReferenceWithNormalvalue'+machineId+'"   value=""/></th>'


	        + '</table>'
			
	      
			
	        + "</td></tr>";
	        
			$("#machineNametableBody").append(htm);
			alert("This Machine Added");
}
/********************************************************************************
 * @author Ajay Khandare
 * @since  2-03-2021
 * @comment for hideShow NormalValueType details
*******************************************************************************/
function hideShowNormalValueType(mId)
{	
	var hideShowStatus = $("#hideShowStatus"+mId).val();
	if (hideShowStatus == 0) {
		$("#imgupdown" + mId).attr('src', "images/up.png");
		$("#machineDropDownId" + mId).show();
		$("#hideShowStatus" + mId).val(1);
		$("#tdmachineId"+mId).show();
		$("#kitSpecIdd"+mId).show();
		$("#kitSpecId"+mId).show();
		$("#testMethodIdWithNormalTh"+mId).show();
		$("#noteIdwithNormalTh"+mId).show();
		$("#clinicalIdWithNormalTh"+mId).show();
		$("#increasedIdWithNormalTh"+mId).show();
		$("#interpretationWithNormalTh"+mId).show();
		$("#biologicalReferenceWithNormalTh"+mId).show();
		
		setAllTestMethodNormalValue("testMethodIdWithNormalValue"+mId);
		//$("#commentsWithNormalTh"+mId).show();		
		
	} else {		
		$("#imgupdown" + mId).attr('src', "images/down.png");
		$("#machineDropDownId" + mId).hide();
		$("#hideShowStatus" + mId).val(0);
		setAllTestMethodNormalValue("testMethodIdWithNormalValue"+mId);
	}
}
/*******************************************************************************
 * @author Ajay Khandare
 * @since  2-03-2021
 * @comment get MachineName With testId
*******************************************************************************/
function getMachineNameWithTestId()
{
	var idLabTest=$("#idLabTest").val();
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labMachineMasterController/getMachineNameWithTestId/" + idLabTest,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			if(r.machineNameList.length>=0){
				var divContent = "";
				for ( var i = 0; i < r.machineNameList.length; i++) {
					//alert(r.machineNameList[i].machineName);		

					
					machineArray.push(r.machineNameList[i].machineId);
                   // alert(machineArray+"machineArray");				    
				    var dupsId = [];				   
				    var arrMid = machineArray.filter(function(el) {
				      // If it is not a duplicate, return true
				      if (dupsId.indexOf(el) == -1) {
				    	  dupsId.push(el);				       
				        return true;
				      }
				      return false;				      
				    });
				    //alert(arrMid+"arrMid");		
				    $("#machinIdListHidden").val(arrMid); 	
					divContent = divContent+ '<tr style="height:2px;" >';	
					
										
					divContent = divContent  
										
					+ ' <td class="center"><input type="hidden" id="idGeneralValue'+r.machineNameList[i].machineId+'" value="0">'+r.machineNameList[i].machineId+ '</td>'					
					
					+ ' <td class="center" id="machineName'+r.machineNameList[i].machineId+'" >'+r.machineNameList[i].machineName+'<input type="hidden" id="machineNameHidden'+r.machineNameList[i].machineId+'" value="'+r.machineNameList[i].machineName+'"></td>'								
					
					+ ' <td class="center"><input type="radio" id="defaultMachineId'+r.machineNameList[i].machineId+'" name="defaultMachineId" value="'+r.machineNameList[i].machineId+'" ></td>'					
					
					+ ' <td class="center"><button class="btn btn-xs btn-danger" onclick="deleteMachinewiseNormalValue('+r.machineNameList[i].machineId+')"><i class="fa fa-trash-o"></i></button></td>'					
					
					+ ' <td class="center" onclick="hideShowNormalValueType('+r.machineNameList[i].machineId+')"  class="col-md-2 center" style="height: 21.5px;"><img id="imgupdown'+r.machineNameList[i].machineId+'" src="images/down.png"><input type="hidden" value="0" id="hideShowStatus'+r.machineNameList[i].machineId+'"></td></tr>'			
					
					
					
					+ "<tr id='machineDropDownId"+r.machineNameList[i].machineId+"' style='width:100%;float:right'>" 				        
					+ "<td style='display:none' id='tdmachineId"+r.machineNameList[i].machineId+"'>"
					
					
					+ ' <table id="ehatDropDownTable'+r.machineNameList[i].machineId+'" class="datatable table  table-bordered">'				       
					+ '<thead id="ehatTHeadDropDown'+r.machineNameList[i].machineId+'">'				       
					+ '<tr style="background-color: lightblue;">					'												       	         				      
					+ "<th class='col-md-1 center' style='background-color: #A0B0E0;'>#</th>"	
					+ "<th class='col-md-1 center' style='background-color: #FF0F0;'>Gender</th>"		
					+ "<th class='col-md-2 center' colspan='2' style='background-color: #FFF0F0;'>Age</th>"						
					+ "<th class='col-md-6 center' colspan='7' style='background-color: #E0E8F0;'>Normal Values</th>"						
					+ "<th class='col-md-1 center' id='exression_th1' style='background-color: #F0FFF0;'>Expression</th>"													
					+ "<th class='col-md-2 center' style='background-color: #E0E8F0;'>Unit</th>"					
					+ "<th class='col-md-2 center' style='background-color: #F0FFF0;'>Special Case</th>" 						
					+ '</tr>'
											
						
					+ '<tr style="background-color: lightblue;">'																			     						
					+ "<th class='col-md-1 center' style='background-color: #A0B0E0;'><input type='button' value='+' onclick='createRows("+r.machineNameList[i].machineId+")'/>"+"<input type='button' value='-' onclick='removeRow("+r.machineNameList[i].machineId+")'/></th>"
					+ "<th class='col-md-1 center' style='background-color: #FF0F0'></th>"	
					+ "<th class='col-md-1 center' style='background-color: #FFF0F0;'>FAge</th>"						
					+ "<th class='col-md-1 center' style='background-color: #FFF0F0;'>TAge</th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Non Existant Low <input type='checkbox' id ='nel"+r.machineNameList[i].machineId+"' /> </th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>CL <input type='checkbox' id ='cl"+r.machineNameList[i].machineId+"' /></th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Low <input type='checkbox' id ='low"+r.machineNameList[i].machineId+"' /></th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Default <input type='checkbox' id ='default"+r.machineNameList[i].machineId+"' /></th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>High <input type='checkbox' id ='high"+r.machineNameList[i].machineId+"' /></th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>CH <input type='checkbox' id ='ch"+r.machineNameList[i].machineId+"' /></th>"						
					+ "<th class='col-md-1 center' style='background-color: #E0E8F0;'>Non Existant High <input type='checkbox' id ='neh"+r.machineNameList[i].machineId+"' /></th>"					
					+ "<th class='col-md-1 center' style='background-color: #F0FFF0;' id='exression_th2'></th>"					
										
					+ "<th class='col-md-2 center' style='background-color: #E0E8F0;'></th>"						
					+ "<th class='col-md-2 center' style='background-color: #F0FFF0;'></th>"						
					+ '</tr>'	        	    				      			       
					+ '</tr>'				       
					+ '</thead>'				       
					+ '<tbody id="tableBodyDropDown'+r.machineNameList[i].machineId+'">'				        
					+ '</tbody>'	
					
					
					    + ' <th class="center" style="display: none" id="kitSpecIdd'+r.machineNameList[i].machineId+'"></th>'

					    + ' <th class="center" style="display: none" id="kitSpecId'+r.machineNameList[i].machineId+'">Kit Specification<textarea placeholder="Text enter test Note"  id="kitSpecIdNormalValue'+r.machineNameList[i].machineId+'"  >'+r.machineNameList[i].kitSpecId+'</textarea></th>'		

						+ ' <th class="center" style="display: none" id="testMethodIdWithNormalTh'+r.machineNameList[i].machineId+'">Test Method<select style="width: 100%" id="testMethodIdWithNormalValue'+r.machineNameList[i].machineId+'" ></th>'
				        
						+ ' <th class="center" style="display: none" id="noteIdwithNormalTh'+r.machineNameList[i].machineId+'">Note<textarea placeholder="Text enter test Note"  id="noteIdwithNormalValue'+r.machineNameList[i].machineId+'" >'+r.machineNameList[i].noteIdwithNormal+'</textarea></th>'		
						
						+ ' <th class="center" style="display: none" id="clinicalIdWithNormalTh'+r.machineNameList[i].machineId+'">Clinical Use<textarea placeholder="Text enter test Clinical Use"  id="clinicalIdWithNormalvalue'+r.machineNameList[i].machineId+'" >'+r.machineNameList[i].clinicalIdWithNormal+'</textarea></th>'		

						+ ' <th class="center" style="display: none" id="increasedIdWithNormalTh'+r.machineNameList[i].machineId+'">Increased Level<textarea placeholder="Text enter test Increased Level"  id="increasedIdWithNormalvalue'+r.machineNameList[i].machineId+'" >'+r.machineNameList[i].increasedIdWithNormal+'</textarea></th>'		
						
						+ ' <th class="center" style="display: none" id="interpretationWithNormalTh'+r.machineNameList[i].machineId+'">Interpretation<textarea placeholder="Text enter test Interpretation"  id="interpretationWithNormalvalue'+r.machineNameList[i].machineId+'" >'+r.machineNameList[i].interpretationWithNormal+'</textarea></th>'		
						
						+ ' <td class="center" style="display: none" id="biologicalReferenceWithNormalTh'+r.machineNameList[i].machineId+'">Biological Reference<textarea placeholder="Text enter test Biological Reference" id="biologicalReferenceWithNormalvalue'+r.machineNameList[i].machineId+'"  >'+r.machineNameList[i].biologicalReferenceWithNormal+'</textarea></th>'

					+ '</table>'	
					
			      
					+ "</td></tr>";									
					
					
				}
				$('#machineNametableBody').html(divContent);
				
				for ( var j = 0; j < r.machineNameList.length; j++) {					
				  
					if(r.machineNameList[j].machineFlag=="Y")
					{
						// $("#defaultMachineId"+r.machineNameList[i].machineId+"").prop("checked",true);
						document.getElementById("defaultMachineId"+r.machineNameList[j].machineId).checked = true;
					}else
					{												
						//$("#defaultMachineId"+r.machineNameList[i].machineId+"").prop("checked",false);
						document.getElementById("defaultMachineId"+r.machineNameList[j].machineId).checked = false;
					}	
					getNormalValueRangeWithMachineId(r.machineNameList[j].machineId);
					hideShowNormalValueType(r.machineNameList[j].machineId);
				 }
				
			}
		}
	});
}

/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment for get NormalValue Range With MachineId
*******************************************************************************/
function getNormalValueRangeWithMachineId(mId)
{
	
	var idLabTest=$("#idLabTest").val();
	var inputs = [];	
	inputs.push('mId=' + mId);
	inputs.push('idLabTest=' + idLabTest);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labMachineMasterController/getNormalValueRangeWithMachineId",
		error : function() {
			alert("error");
		},
		success : function(r) {
			   var quantitativeMachineId=$("#quantitativeMachineId").val();				
				var divContentt = "";
				var dynamicCount=1;
				for(var i = 0; i < r.labTestNormalValueList.length; i++) {					
					if(r.labTestNormalValueList[i].flag=='dynamic'){	

						   fromAgeArray.push(r.labTestNormalValueList[i].fromAge+":"+r.labTestNormalValueList[i].toAge+":"+r.labTestNormalValueList[i].sex+":"+r.labTestNormalValueList[i].mahinevalueId+":"+r.labTestNormalValueList[i].ageIn+":"+r.labTestNormalValueList[i].idspecialcase);
						   var dupsId = [];				   
						   var arrMid = fromAgeArray.filter(function(el) {
						      // If it is not a duplicate, return true
						      if (dupsId.indexOf(el) == -1) {
						    	  dupsId.push(el);				       
						        return true;
						      }
						      return false;				      
						    });
						    //alert(arrMid+"arrMid");		
						    
						    $("#fromageListHidden").val(arrMid); 	
							
						
					divContentt = divContentt+ "<tr id='tableBodyDropDown"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount +"'>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'><label>"+dynamicCount+"</label><input type='hidden' id='idTestNormalValue"+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"' value='"+r.labTestNormalValueList[i].idTestNormalValue+"'><input class='' type='checkbox' value='"+r.labTestNormalValueList[i].idTestNormalValue+"'  name='tableBodyBox' id='tableBody"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"'/></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-2 center'><select  onchange='valiDateType("+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount +")' class='center ' id='idGender"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "'><option value='-1' >Select Gender</option><option value='1'>Male</option><option value='2'>Female</option><option value='4'>BOTH</option><option value='3'>Transgender</option></select></td>";
					
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input  class='center' id='fromAge"+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "'  value='"+r.labTestNormalValueList[i].fromAge +"' onkeypress='return validateDecimal(event)' onchange='validateBothType("+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+","+r.labTestNormalValueList[i].mahinevalueId+")'><select id='ageIn"+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"'><option value='1'>Year</option><option value='2'>Month</option><option value='3'>Days</option></select></td>";
					
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='toAge"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].toAge   + "' onkeypress='return validateDecimal(event)' onchange='validateBothType("+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+","+r.labTestNormalValueList[i].mahinevalueId+")'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='nonExistLow"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].nonExistLow   + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='cl"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].cl   + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='low"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].lowerValue + "' onkeypress='return validateNumericOrAlphabet(event)' onchange='defaultValueAggregate("+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+","+r.labTestNormalValueList[i].mahinevalueId+","+quantitativeMachineId+")'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='defaultValue"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].defaultValue + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='high"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].upperValue + "' onkeypress='return validateNumericOrAlphabet(event)' onchange='defaultValueAggregate("+r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+","+r.labTestNormalValueList[i].mahinevalueId+","+quantitativeMachineId+")'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='ch"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].ch  + "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-1 center'>"
					+ "<input type='text' class='center ' id='nonExistHigh"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "' value='"+r.labTestNormalValueList[i].nonExistHigh+ "' onkeypress='return validateNumericOrAlphabet(event)'></td>";
					
					//changes of greater than or equal to sign made over here
					if(quantitativeMachineId=="Y"){
						divContentt = divContentt
							//+ "<td class='col-md-1 center'><select style='width:100%;' id='expression"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"'><option value='0'>Select</option><option value='>'>></option><option value='>='>>=</option><option value='<'><</option><option value='<='><=</option></select></td>";
						+ "<td class='col-md-1 center'><select style='width:100%;' id='expression"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"'><option value='0'>Select</option><option value='>'> > </option><option value='>='> ≥ </option><option value='<'> < </option><option value='<='> ≤ </option></select></td>";
					}else{
						divContentt = divContentt
							//+ "<td class='col-md-1 center'><select style='width:100%;' disabled id='expression"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"'><option value='0'>Select</option><option value='>'>></option><option value='>='>>=</option><option value='<'><</option><option value='<='><=</option></select></td>";
						+ "<td class='col-md-1 center'><select style='width:100%;' disabled id='expression"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount+"'><option value='0'>Select</option><option value='>'> > </option><option value='>='> ≥ </option><option value='<'> < </option><option value='<='> ≤ </option></select></td>";
					}
					
					divContentt = divContentt
					+ "<td class='col-md-2 center'><select  class='center ' id='idUnit"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "'></select></td>";
					
					divContentt = divContentt
					+ "<td class='col-md-2 center'><select  class='center ' id='idSpecialCase"+ r.labTestNormalValueList[i].mahinevalueId+""+dynamicCount + "'></select></td>"
					+ "</tr>";
													
					dynamicCount++;
				 }				
					$("#tdmachineId"+r.labTestNormalValueList[i].mahinevalueId).show();
					
					$("#tableBodyDropDown"+ r.labTestNormalValueList[i].mahinevalueId).html(divContentt);
			 }		
				var dynamicCountt=1;
				for (var j = 0; j < r.labTestNormalValueList.length; j++) {
                    
					setDropDownUnitListNormalvalue("testMethodIdWithNormalValue"+r.labTestNormalValueList[j].mahinevalueId);					
					setDropDownUnitList("idUnit"+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt)
					setAllSpecialCase("idSpecialCase"+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt);
												
					$("#ageIn"+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt ).val(r.labTestNormalValueList[j].ageIn);	
					
					$("#idGender"+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt ).val(r.labTestNormalValueList[j].sex);	
					
					$("#idUnit"+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt).val(r.labTestNormalValueList[j].unitId);
			
					if(r.labTestNormalValueList[j].expression != ""){					
						$("#expression"+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt ).val(r.labTestNormalValueList[j].expression);
					}					
					if(r.labTestNormalValueList[j].idspecialcase !=null){					
						$('#idSpecialCase'+r.labTestNormalValueList[j].mahinevalueId+""+dynamicCountt ).val(r.labTestNormalValueList[j].idspecialcase);
					}
					
					dynamicCountt++;
				}
				var dynamicCounttt=1;
				for (var k = 0; k < r.labTestNormalValueList.length; k++) {
					
					setAllTestMethodNormalValue("testMethodIdWithNormalValue"+r.labTestNormalValueList[k].mahinevalueId);	
				
					if(r.labTestNormalValueList[k].testMethodIdWithNormal !=null){	
						
					     $("#testMethodIdWithNormalValue"+r.labTestNormalValueList[k].mahinevalueId).val(r.labTestNormalValueList[k].testMethodIdWithNormal);
					}					
					dynamicCounttt++;
				}
		}
	});
}

/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment for get All Test method for dropdown 
*******************************************************************************/
function getAllTestMethodNormalValue(){
	var byName="";
	var callFrom='searchBtn';
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labmethod/getalltestmethods",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="-1">Select Test Method</option>';
			for ( var i = 0; i < r.testMethodlist.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.testMethodlist[i].idtestMethod+'">'+r.testMethodlist[i].methodCode+' - '+r.testMethodlist[i].methodName+'</option>';	
			}	
			$("#methodIdNormalList").html(JSON.stringify(r));
			
		}
	});
	
}
function setAllTestMethodNormalValue(id)
{
	var ajaxResponse = $("#methodIdNormalList").html();
	var r = JSON.parse(ajaxResponse);
	var dropdownList='<option value="-1">Select Test Method</option>';
	
	for ( var i = 0; i < r.testMethodlist.length; i++) {		
		dropdownList=dropdownList+'<option value="'+r.testMethodlist[i].idtestMethod+'">'+r.testMethodlist[i].methodCode+' - '+r.testMethodlist[i].methodName+'</option>';	
	}									
	$("#"+id).html(dropdownList);		
	
}
/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment for set All Unit List for dropdown in Normal Value 
*******************************************************************************/
function setDropDownUnitListNormalvalue(id){
	
	var ajaxResponse = $("#unitList").html();
	var r = JSON.parse(ajaxResponse);
	var dropdownList='<option value="-1">Select Unit</option>';
	for ( var i = 0; i < r.unitTypeList.length; i++) {
		dropdownList=dropdownList+'<option value="'+r.unitTypeList[i].idunitType+'">'+r.unitTypeList[i].unitName+'</option>';	
	}
	$("#idUnit"+id).html(dropdownList);
}
/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment for set Delete in Normal Value 
*******************************************************************************/
function deleteMachinewiseNormalValue(machineId)
{
	var idLabTest=$("#idLabTest").val();
	var r = confirm("Are You Sure You Want To Delete this Machine Data ?");
	if (r == true) {
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/labMachineMasterController/deleteMachinewiseNormalValue",
			data : {
				machineId : machineId,
				idLabTest : idLabTest
			},
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if (r == true) {
					alertify.success("Machine Data Delete Sucessfully");
				} else {
					alertify.error("Machine Data Not Deleted.");
				}
				getMachineNameWithTestId();
			}
		});
	}
}

/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment for set validate BothType in Normal Value 
*******************************************************************************/
function validateBothType(machineId,machineIdDyanamic){
	
	var genderDyanamic = $("#idGender" + machineId).val();
	var ageInDyanamic = $("#ageIn" + machineId).val();
	var idSpecialCaseDyanamic = $("#idSpecialCase" + machineId).val();
	
	if(idSpecialCaseDyanamic == null || idSpecialCaseDyanamic == "" || idSpecialCaseDyanamic == "null" || idSpecialCaseDyanamic == undefined || idSpecialCaseDyanamic == "undefined" || Number(idSpecialCaseDyanamic) < 0)
		idSpecialCaseDyanamic = 0;
	
	if(genderDyanamic == 3){
		return false;
	}
	
	if (genderDyanamic == -1) {
		alert("Please Select Gender Type First");
		$("#fromAge" + machineId).val('');
		$("#toAge" + machineId).val('');
		return false;
	}
	var fromAgeDyanamic = $("#fromAge" + machineId).val();
	var toAgeDyanamic = $("#toAge" + machineId).val();
	
	var count = 1;
	var trLen = $('#tableBodyDropDown1 tr').length;
	$('#tableBodyDropDown1 tr').each(function(){
		
		var trId   = $(this).attr('id');
		var suffix = trId.match(/\d+/);
		
		if(machineId != suffix){
			
			var fromAge       = $("#fromAge"+suffix).val();
			var toAge         = $("#toAge"+suffix).val();
			var gender        = $("#idGender"+suffix).val();
			//var machineid     = fromAgeToAge[3];
			var ageIn         = $("#ageIn"+suffix).val();
			var idSpecialCase = $("#idSpecialCase"+suffix).val();
			
			//if(machineid == machineIdDyanamic){
			if(1 == 1){
				
				if(genderDyanamic == 1 && (gender == 1 || gender == 4)){// Check for Male.
					
					if(idSpecialCaseDyanamic != 0){
						if(fromAgeDyanamic != ""){
							if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic) {						   
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					
						if(toAgeDyanamic != ""){
							if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic){		
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					}else {
						if(fromAgeDyanamic != ""){
							if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic) {						   
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					
						if(toAgeDyanamic != ""){
							if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic){		
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					}
				}else if(genderDyanamic == 2 && (gender == 2 || gender == 4)){// Check for Male.
					
					if(idSpecialCaseDyanamic != 0){
						if(fromAgeDyanamic != ""){
							if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic) {						   
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					
						if(toAgeDyanamic != ""){
							if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic){		
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					}else {
						if(fromAgeDyanamic != ""){
							if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic) {						   
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					
						if(toAgeDyanamic != ""){
							if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic){		
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					}
				}else if(genderDyanamic == 4){// Check for Male.
					
					if(idSpecialCaseDyanamic != 0){
						if(fromAgeDyanamic != ""){
							if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic) {						   
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					
						if(toAgeDyanamic != ""){
							if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic){		
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					}else {
						if(fromAgeDyanamic != ""){
							if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= toAge && ageIn == ageInDyanamic) {						   
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					
						if(toAgeDyanamic != ""){
							if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic){		
								alert("This Details Already Been Added");
								$("#fromAge" + machineId).val('');
								$("#toAge" + machineId).val('');
								return false;
							}
						}
					}
				}
			}	
			count++;
		}
	});
	
	/* var fromageListHidden = $("#fromageListHidden").val();
	 var fromAgeAndToAgeArrayList = fromageListHidden.split(",");
	 
	 for(var j = 0; j <= fromAgeAndToAgeArrayList.length; j++) {

		var fromAgeSplit = fromAgeAndToAgeArrayList[j];
		
		if (fromAgeSplit == undefined) {
			break;
		}
		
		var fromAgeToAge = fromAgeSplit.split(":");
		var fromAge = fromAgeToAge[0];
		var toAge = fromAgeToAge[1];
		var gender = fromAgeToAge[2];
		var machineid = fromAgeToAge[3];
		var ageIn = fromAgeToAge[4];
		var idSpecialCase = fromAgeToAge[5];
		
		if(machineid==machineIdDyanamic){
			
			if(genderDyanamic == 1 && (gender == 1 || gender == 4)){// Check for Male.
				
				if(idSpecialCaseDyanamic != 0){
					if(fromAgeDyanamic != ""){
						if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic) {						   
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				
					if(toAgeDyanamic != ""){
						if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic){		
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				}else {
					if(fromAgeDyanamic != ""){
						if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic) {						   
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				
					if(toAgeDyanamic != ""){
						if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic){		
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				}
			}else if(genderDyanamic == 2 && (gender == 2 || gender == 4)){// Check for Male.
				
				if(idSpecialCaseDyanamic != 0){
					if(fromAgeDyanamic != ""){
						if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic) {						   
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				
					if(toAgeDyanamic != ""){
						if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic){		
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				}else {
					if(fromAgeDyanamic != ""){
						if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic) {						   
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				
					if(toAgeDyanamic != ""){
						if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic){		
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				}
			}else if(genderDyanamic == 4){// Check for Male.
				
				if(idSpecialCaseDyanamic != 0){
					if(fromAgeDyanamic != ""){
						if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic) {						   
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				
					if(toAgeDyanamic != ""){
						if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic && idSpecialCase == idSpecialCaseDyanamic){		
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				}else {
					if(fromAgeDyanamic != ""){
						if(Number(fromAgeDyanamic) >= Number(fromAge) && Number(fromAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic) {						   
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				
					if(toAgeDyanamic != ""){
						if(Number(toAgeDyanamic) >= Number(fromAge) && Number(toAgeDyanamic) <= Number(toAge) && ageIn == ageInDyanamic){		
							alert("This Details Already Been Added");
							$("#fromAge" + machineId).val('');
							$("#toAge" + machineId).val('');
							return false;
						}
					}
				}
			}
		}	
	}*/
}
/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment In normal value when select gender type that time blank value in fromage to toAge
*******************************************************************************/
function valiDateType(machineId)
{
	
	 $("#fromAge" + machineId).val('');
	 $("#toAge" + machineId).val('');
	/*
	var fromAgeDynamic = $("#fromAge" + machineId).val();
	var toAgeDynamic =  $("#toAge" + machineId).val();
	var ageInDynamic =  $("#ageIn" + machineId).val();
	var genderDynamic = $("#idGender" + machineId).val();
	
	var alladding=fromAgeDynamic+":"+toAgeDynamic+":"+genderDynamic+":"+ageInDynamic;
	//alert("alladding : "+alladding);
	
	var previous=0;
	$("select").on('focus', function () {
        // Store the current value on focus and on change
        previous = this.value;
    });
	alert(previous+"previous");
	
    $(function() {
        var prevSelect = '';
        var thisSelect = $("#idGender" + machineId).val();
        $('#idGender'+ machineId).change(function() {
            prevSelect = thisSelect;
            thisSelect = $(this).val();
            alert(prevSelect + ' - ' + thisSelect);
        });
    });
	
	
	var fromageListHidden = $("#fromageListHidden").val();
	
	//alert(fromageListHidden);
	
	var fromAgeAndToAgeArrayList = fromageListHidden.split(",");
	
	for(var i = 0; i < fromAgeAndToAgeArrayList.length; i++) {	
		
		alert(fromAgeAndToAgeArrayList[i]+"KK"+alladding);
		
		if (fromAgeAndToAgeArrayList[i] == alladding ) {
			var spliced = fromAgeSplit.splice(i, 1);		
			alert(spliced);
		}	
	}

*/}
/********************************************************************************
 * @author Ajay S Khandare
 * @since 29-03-2021
 * @comment In set aggregate value in default filed
*******************************************************************************/
function defaultValueAggregate(machineId,dyanamicMachineId,quantitativeMachineId)
{
	//alert(quantitativeMachineId);
	var low = $("#low" + machineId).val();
	var high = $("#high" + machineId).val();	
	if(quantitativeMachineId==false){
		if(high != ""){
			var totalvalue = Number(low) + Number(high);
			var aggregrate = Number(totalvalue)/2;
			//alert(aggregrate);	
			$("#defaultValue" + machineId).val(aggregrate);
		}
	}else if(quantitativeMachineId=="N"){
		if(high != ""){
			var totalvalue = Number(low) + Number(high);
			var aggregrate = Number(totalvalue)/2;
			//alert(aggregrate);	
			$("#defaultValue" + machineId).val(aggregrate);
		}	
	}	
}