/* ============ Lab Profile ============ */ 

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: auto-suggestion For Service
 ************/
function autoSuggForService(inputID) {
	var findingName = $("#" + inputID).val();
	var unit = $("#unitId").val();
	var depdocdeskid = 3;
	var serviceid = 11;
	var unitlist="";
	var querytype="all";
	
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
	
		success : function(r) {
			autoCompOnProfileName(r,inputID);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: auto Complete On Profile Name
 ************/
function autoCompOnProfileName(response,id) {
	var myArray = response;// parsing response in JSON format
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:104%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	$("#" + id).mcautocomplete(
			{
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '100px',
					valueField : 'serviceName'
				},{
					name : 'categorycharges',
					width : '100px',
					valueField : 'categorycharges'
				}],

				select : function(event, ui) {
						$('#proNm').val(ui.item.categoryName);
						$("#subservicesname").val(ui.item.categoryName);
						$("#subserviceid").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						$("#categorycharges" ).val(ui.item.categorycharges);
						$("#servId" ).val(ui.item.serviceid);
						$("#proCode" ).val(ui.item.codeName);
						
					//SetFocus("strValue1");
					return false;
				},

				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						
						result = [ {
							'categoryName' : 'NO',
							'serviceName' : 'Match',
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					$('#ui-id-1').css("width", "385px");
				}
			});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: get All Sub-Service(Heading) List
 ************/
function getAllHeadingList(){
	var pathologyId = $("#pathologyId").val();
	jQuery.ajax({
		async : false,
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
			var dropdownList = "<option value='0'>Select Heading</option>";
			for ( var i = 0; i < r.lstSubService.length; i++) {
				dropdownList = dropdownList + "<option value="+r.lstSubService[i].subId+">"+r.lstSubService[i].codeName+" - "+r.lstSubService[i].categoryName+"</option>";	
			}	
			$("#heading").html(dropdownList);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: save lab profile
 ************/
function saveLabProfile() {
	var serviceId = $.trim($("#pathologyId").val());
	var subServiceId =$.trim($("#subserviceid").val());
	var heading = $.trim($("#heading").val());
	var proNm = $.trim($("#proNm").val());
	var proCode = $.trim($("#proCode").val()); 
	var proCharge = $.trim($("#categorycharges").val());
	var idPro = $.trim($("#idPro").val());
	var userId = $.trim($("#userId").val());
	var unitId = $.trim($("#unitId").val());
	var edit = $.trim($("#edit").val());
	var motivatorCash = 0;
	var motivatorSponsored = 0;
	var clinicPercent = 0;
//	var interpretation = $.trim($('#txtInterpretation').val());
//	var comments = $.trim($('#txtComments').val());
	
	var comments = "";
	comments = CKEDITOR.instances['txtComments'].getData();
	
	var interpretation = "";
	interpretation = CKEDITOR.instances['txtInterpretation'].getData();
	
	var dsclchk = "";
	var inptrchk = "";
	var cmtchk = "";
	
	var templatewise = "N";
	var callFrom="N";
	
	if ($("#chkHistopathwise").is(':checked')){
		templatewise ="H"+idPro;
		callFrom="Histopath";
	}
	
	if(interpretation == "")
		interpretation = "-";
	if(comments == "")
		comments = "-";
	
	var sampleId = $.trim($("#sampleId").val());
	var containerId = $.trim($("#containerId").val());
	var labUnitId = $.trim($("#labUnitId").val());
	var volumeName = $.trim($("#volumeName").val());
	var fasting = $.trim($("#fasting").val());
	var tat = $.trim($("#tat").val());
	
	var minTemp = 0;
	var maxTemp = 0;
	var tempSensitivity = "N";
	if(isCheckTempratureSesitive()){
		minTemp = $.trim($("#minTempratureSensitive").val());
		maxTemp = $.trim($("#maxTempratureSensitive").val());
		tempSensitivity = "Y";
	}

	var timeSensitivevalue = 0;
	var timeSensitivity = "N";
	if(isCheckTimeSensitive()){
		timeSensitivevalue = $.trim($("#timeSensitivevalue").val());
		timeSensitivity = "Y";
	}
	
	var drugSensitivity = "N";
	if ($("#drugSensitivity").is(':checked')){
		drugSensitivity = "Y";
	}
	
	var nabl= "N";
	if ($("#nabl").is(':checked')){
		nabl= "Y";
	}
	
	var processTestoutlab= "N";
	if ($("#processTestoutlab").is(':checked')){
		processTestoutlab= "Y";
	}
	
	var isTest = "N";
	if($("#istest").is(':checked')){
		isTest = "Y";
	}

	var applyFormula= "N";
	if ($("#applyFormula").is(':checked')){
		applyFormula= "Y";
	}
	
	//added by kishor for check profile is histopath or not
	var histopathLab= "N";
	if ($("#histopathLab").is(':checked')){
		histopathLab= "Y";
	}
	
	var rows = $('#tb2 tr').length;
	var testNames = [];
	// fetching values from tb2 table
	if(subServiceId == 0 || subServiceId==""){
		alert("Please enter valid service Name");
		$("#proNm").val("");
		return false;
	}
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
	
	
	if( callFrom != "Histopath" ){
		
		if(testNames.length == 0 || testNames == ""){
			alert("Please Drag Test From Left Side Box and Drop it into Right Empty Box!");
			return false;
		}
	}
	
	// Removing duplicate elements from array
	var testLi = [];
	$.each(testNames, function(i, el){
	    if($.inArray(el, testLi) === -1) testLi.push(el);
	});

	if(motivatorCash == "")
	{
		motivatorCash = 0;
	}
	if(motivatorSponsored == "")
	{
		motivatorSponsored = 0;
	}
	if(clinicPercent == "")
	{
		clinicPercent = 0;
	}
	if (heading == "select" || heading==0) {
		alert("Please Select Heading Name!");
		SetFocus("heading");
		return false;
	} else if (proNm == "") {
		alert("Please Enter Lab Profile Name!");
		SetFocus("proNm");
		return false;
	}
	if(sampleId == 0 || sampleId == ""){
		alert("Please Select sample");
		return false;
	}
	
	if(containerId == 0 || containerId == ""){
		alert("Please Select container");
		return false;
	}
	if(labUnitId == 0 || labUnitId == ""){
		alert("Please Select Unit type ");
		return false;
	}
	/*if (volumeName == null || volumeName == "" || volumeName == undefined) {
		alert("Please Enter volume Name");
		return false;
	}*/
	// Checking condition,is request coming from edit button?
	else if (edit == 1) {
		//if(rows == 1 || rows == 0){
		if(rows == 0  &&  callFrom != "Histopath"){
			alert("You can't remove all tests,Please drop minimum one Lab test in Right table!");
			makeDivEmptyt2();
			return false;	
		}	
	}if (edit == 0) {
		if (rows == 1  && callFrom != "Histopath") {
			alert("Please Drag Test From Left Side Box and Drop it into Right Empty Box!");
			makeDivEmptyt2();
			return false;
		}
	}else if (testLi.length < testNames.length) {
		alert("Please Remove Duplicate Element From Right Box!");
		SetFocus("tb1");
		return false;
	}
	
	// Out Lab Details
	var out = JSON.stringify(getOutlabValues());
	// Reagent Details
	var reagent = JSON.stringify(reagentTable());
	
	// =============================================================================
	//	Newly added code for checkboxes
	// =============================================================================	
    if ($("#disclaimercheck").is(":checked") == true)
    {
    	dsclchk = "Y";
    	
    }else{
    	
    	dsclchk = "N";
    }
	
    if ($("#interpretationcheck").is(":checked") == true)
    {
    	inptrchk = "Y";
    	
    }else{
    	
    	inptrchk = "N";
    }
	
    if ($("#commentcheck").is(":checked") == true)
    {
    	cmtchk = "Y";
    	
    }else{
    	
    	cmtchk = "N";
    }
	// =============================================================================
	// =============================================================================
	
	var templateData = "";
	templateData = CKEDITOR.instances['disclaimertxt'].getData();
	
	var inputs = [];
	inputs.push('idprofile=' + idPro);
	inputs.push('isTest=' + isTest);
	inputs.push('unitId=' + unitId);
	inputs.push('profilecreatedBy=' + userId);
	inputs.push('profileName=' + encodeURIComponent(proNm));
	inputs.push('idheadings=' + encodeURIComponent(heading));
	inputs.push('profileCode=' + encodeURIComponent(proCode));
	inputs.push('profileCharges=' + encodeURIComponent(proCharge));
	inputs.push('motivatorCash=' + motivatorCash);
	inputs.push('motivatorSponsored=' + motivatorSponsored);
	inputs.push('clinicPercent=' + clinicPercent);
	inputs.push('serviceID=' + serviceId);
	inputs.push('subServiceID=' + subServiceId);
	inputs.push('interpretationCheck=' + inptrchk);
	inputs.push('profileInterpretation=' + encodeURIComponent(interpretation));
	inputs.push('commentCheck=' + cmtchk);
	inputs.push('profileComments=' + encodeURIComponent(comments)); 
	inputs.push('testList=' + testLi);
	
	inputs.push('idTestSample=' + sampleId);
	inputs.push('idSampleContainer=' + containerId);
	inputs.push('idLabUnit=' + labUnitId);
	inputs.push('volume=' + volumeName);
	inputs.push('fasting=' + fasting);
	inputs.push('turnAroundTime=' + tat);
	inputs.push('tempratureSensitivity=' + tempSensitivity);
	inputs.push('minTemp=' + minTemp);
	inputs.push('maxTemp=' + maxTemp);
	inputs.push('timeSensitivity=' + timeSensitivity);
	inputs.push('timeSensitiveValue=' + timeSensitivevalue);
	inputs.push('drugSensitivity=' + drugSensitivity);
	inputs.push('isNabl=' + nabl);
	inputs.push('processAtOutlab=' + processTestoutlab);
	inputs.push('outLabDetails=' + out);
	inputs.push('reagentDetails=' + reagent);
	inputs.push('applyFormula=' + applyFormula);
	inputs.push('histopathLab=' + histopathLab);
	inputs.push('templateWise=' + templatewise);
	inputs.push('callFrom=' + callFrom);
	inputs.push('disclaimerCheck=' + dsclchk);
	inputs.push('profileDisclaimer=' + encodeURIComponent(templateData));
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/savelabprofiles",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			$("#edit").val("0");
			$("#heading").val("0");
			
			$("#popProfile").modal('hide');
			getProfiles("onload");
			resetLabProfileForm();
			setDragDropTempForTable2(null, "save");
		}
	});
}

function resetLabProfileForm(){
	$("#idPro").val('0');
	$("#byName").val("");
	$("#proNm").val("");
	$("#strValue1").val("");
	$("#txtInterpretation").val("");
	$("#txtComments").val("");
	
	$("#searchId").val("");
	
	$("#heading").val('0');
	$("#labUnitId").val('0');
	$("#containerId").val('0');
	$("#sampleId").val('0');
	
	$("#volumeName").val("");
	$("#fasting").val("");
	$("#tat").val("");
	
	$("#tempratureSensitive").prop('checked', false);
		$('#tempDiv').hide();
		$("#minTempratureSensitive").val('0');
		$("#maxTempratureSensitive").val('0');

	$("#timeSensitive").prop('checked', false);
		$('#timeDiv').hide();
		$("#timeSensitivevalue").val('0');
	
	$("#drugSensitivity").prop('checked', false);
	$("#istest").prop('checked', false);
	$("#nabl").prop('checked', false);
	$("#processTestoutlab").prop('checked', false);
	$("#applyFormula").prop('checked', false);
	$("#histopathLab").prop('checked', false);
	$("#chkHistopathwise").prop('checked', false);
	
	
	var tableHeaderRowCount = 1;
	var outlabTable = document.getElementById('outlabTable');
	var rowCount = outlabTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		outlabTable.deleteRow(tableHeaderRowCount);
	}
}

function closePopupBox(){
	resetLabProfileForm();
	resetReagentForm();
	refreshReagentForm();
	setDragDropTempForTable2(null, "close");
}
/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: get All lab profiles
 ************/
function getProfiles(type,pageNumber) {
	var startIndex = 0;
	var byName = $.trim($("#byName").val());
	if (byName == "" && type == "searchBtn") {
		alert("Please enter profile name to search");
		return false;
	}
	
    $('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/getlabprofiles",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#byName').val("");
			setLabProfileTemp(r,'getLabProfiles',pageNumber);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: template for lab profiles
 ************/
function setLabProfileTemp(response, callFrom, pageNumber){
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	var divContent="";
	if(callFrom == 'autoSearch'){
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.idprofile+"</td>"
		+ "<td class='col-md-1 center'>"+response.profileName+"</td>"
		+ "<td class='col-md-1 center'>"+response.profileCode+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editLabProfile("+response.idprofile+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-danger deleteUserAccess' onclick='deleteLabProfile("+response.idprofile+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}else if(response.profileli.length > 0){
		for(var i = 0; i < response.profileli.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+countAuto+".</td>"
			+ "<td class='col-md-1 center'>"+response.profileli[i].idprofile+"</td>"
			+ "<td class='col-md-1 center'>"+response.profileli[i].profileName+"</td>"
			+ "<td class='col-md-1 center'>"+response.profileli[i].profileCode+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editLabProfile("+response.profileli[i].idprofile+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-danger deleteUserAccess' onclick='deleteLabProfile("+response.profileli[i].idprofile+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
			countAuto++;
		}
		
		var numberOfRows="";
		var indexopd=1;
		var opdcount = response.labProfileCount;
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
			        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getProfiles('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

				}
				else
				{
			        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getProfiles('onload',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
				}
				indexopd=indexopd+1;
		}
		if(numberOfPages>6){
		    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}

		$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
		$('#opdpagenation').html(numberOfRows);
	}
		
	}else{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '6'>No records found...</td>";
	}
	$("#labProfileTableBodyId").html(divContent);
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
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getProfiles('onload',"+j+")><a class='page-link'>"+j+"</a></li>";
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
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getProfiles('onload',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: get test's under Sub-Service(Heading).
 ************/
function featchTeastUnderHeading() {
	var heading = $.trim($("#heading").val());
	var inputs = [];
	inputs.push('headingId=' + heading);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/gettestunderheading",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setDragDropTemp(r);
		}
	});
}

function filterTestsUnderHeading(){
	var headingId = $.trim($("#heading").val());
	var sampleId = $.trim($("#sampleId").val());
	
	if(headingId == 0 || headingId == "" || headingId == undefined){
		alert("First select heading name.");
		return false;
	}
	makeTable2Empty();
	var inputs = [];
	inputs.push('headingId=' + headingId);
	inputs.push('sampleId=' + sampleId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/filtertestsunderheading",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setDragDropTemp(r);
		}
	});
}

function makeTable2Empty() {

	$("#tb2").empty();
	var enableDropdown = "<table  id='table-draggable2' class='table table-striped table-condensed cf'>"
		+ "<tbody class='connectedSortable' id='tb2'>"
		+ "<tr> <th> <th></tr>"
		+ "</tbody></table>";
	
	$("#tb2").html(enableDropdown);
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: template for Drag table.
 ************/
function setDragDropTemp(response){
	var divContent="";
	if(response.labTestList.length > 0){
		for(var i = 0; i < response.labTestList.length; i++){
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-11 center' title='"+response.labTestList[i].testCode+","+response.labTestList[i].testRate+"'>"+response.labTestList[i].testName+"</td>"
			+ "<input type='hidden' id='tid"+response.labTestList[i].idTest+"' value='"+response.labTestList[i].idTest+"' name='tk' />"
			+"</tr>";
		}
	}else{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '2'>No records found...</td>";
	}
	$("#tb1").html(divContent);
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: template for Drop table.
 ************/
function setDragDropTempForTable2(response, callFrom){
	var divContent="";
	if(callFrom == "edit"){
	if(response.length > 0){
		for(var i = 0; i < response.length; i++){
			divContent=divContent+"<tr>";
			if (response[i].labTestDTO == null) {
				//alert("hi");
				divContent=divContent+ "<td></td>"
					+ "<td>"+ response[i].headName+"</td>" 
					+ "<td><input type='hidden' value='"+ response[i].headName +"' name='hd'/>" 
					+ "</td>";
			}else{
				divContent=divContent + "<td class='col-md-1 center'>"+(i+1)+".</td>"
					+ "<td class='col-md-11 center' title='"+response[i].labTestDTO.testCode+","+response[i].labTestDTO.testRate+"'>"+response[i].labTestDTO.testName+"</td>"
					+ "<input type='hidden' id='tid"+response[i].labTestDTO.idTest+"' value='"+response[i].labTestDTO.idTest+"' name='tk' />";
			}
			+"</tr>";
		}
	}else{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '2'>No records found...</td>";
	}
	}else{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '2'>No records found...</td>";
	}
	$("#tb2").html(divContent);
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: delete lab profile
 ************/
function deleteLabProfile(id) {
	var r = confirm("Are you confirm to remove lab profile.");
	
	if(!r){
		return false;
	}else{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/labprofile/deletelabprofile/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r){
					alert("Lab profile deleted.");
				}
				location.reload();
			}
		});
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: edit lab profile
 ************/
function editLabProfile(id) {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/labprofile/getprofilebyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			getAllHeadingList();
			getAllUnitList();
			getAllSampleContainerList();
			getAllLabSampleList();
			//getMachineList();
			getAllTestMethod();
			getReagentList("consumable");
			$("#exampleModalLabel").val("Edit Profile");
			$("#proNm").val(r.profileName);
//			$("#txtInterpretation").val(r.profileInterpretation);
//			$("#txtComments").val(r.profileComments);
			$("#proCode").val(r.profileCode);
			$("#idPro").val(r.idprofile);
			$("#edit").val(1);
			$("#subservicesname").val(r.autosugeestionDto.categoryName);
			$("#subserviceid").val(r.autosugeestionDto.subId);
			$("#servicename").val(r.autosugeestionDto.serviceName);
			$("#serviceid" ).val(r.autosugeestionDto.serviceId);
			$("#categorycharges" ).val(r.autosugeestionDto.charges);
			$("#servId" ).val(r.autosugeestionDto.serviceId);
			$("#proCode" ).val(r.autosugeestionDto.codeName);
//			$("#disclaimertxt").val(r.profileDisclaimer);
			CKEDITOR.instances['txtComments'].setData(r.profileComments);
			CKEDITOR.instances['txtInterpretation'].setData(r.profileInterpretation);

			if (r.histopathLab == "Y") {
				$("#histopathLab").prop('checked', true);
			}
			
			if (r.callFrom == "Histopath") {
				$("#chkHistopathwise").prop('checked', true);
				$("#divProfileTestDrag").hide();
			}else{
				$("#chkHistopathwise").prop('checked', false);
				$("#divProfileTestDrag").show();
			}
			
			setTimeout(function() {
				$("#heading").val(r.subServiceDto.subId);
				featchTeastUnderHeading();
			}, 500);
			
			setTimeout(function() {
				$("#labUnitId").val(r.labUnit.idunitType);
			}, 500);
			
			setTimeout(function() {
				$("#containerId").val(r.sampleContainer.idSampleConatiner);
			}, 500);
			
			setTimeout(function() {
				$("#sampleId").val(r.labTestSample.idTestSample);
				//filterTestsUnderHeading();
			}, 1000);
			
			$("#volumeName").val(r.volume);
			$("#fasting").val(r.fasting);
			$("#tat").val(r.turnAroundTime);
			
			if(r.tempratureSensitivity == "Y"){
				$("#tempratureSensitive").prop('checked', true);
				$('#tempDiv').show();
				$("#minTempratureSensitive").val(r.minTemp);
				$("#maxTempratureSensitive").val(r.maxTemp);
			}
			if(r.timeSensitivity == "Y"){
				$("#timeSensitive").prop('checked', true);
				$('#timeDiv').show();
				$("#timeSensitivevalue").val(r.timeSensitiveValue);
			}
			
			if(r.drugSensitivity == "Y"){
				$("#drugSensitivity").prop('checked', true);
			}else{
				$("#drugSensitivity").prop('checked', false);
			}
				
			if(r.isTest == "Y"){
				$("#istest").prop('checked', true);
			}else{
				$("#istest").prop('checked', false);
			}
			
			if(r.isNabl == "Y"){
				$("#nabl").prop('checked', true);
			}else{
				$("#nabl").prop('checked', false);
			}
			
			if(r.disclaimerCheck == "Y"){
				$("#disclaimercheck").prop('checked', true);
				$("#disclaimer-block").show();
				CKEDITOR.instances['disclaimertxt'].setData(r.profileDisclaimer);
			}else{
				$("#disclaimercheck").prop('checked', false);
				$("#disclaimer-block").hide();
				CKEDITOR.instances['disclaimertxt'].setData("");
			}
			
			if(r.interpretationCheck == "Y"){
				$("#interpretationcheck").prop('checked', true);
				$("#interpretation-block").show();
				CKEDITOR.instances['txtInterpretation'].setData(r.profileDisclaimer);
			}else{
				$("#interpretationcheck").prop('checked', false);
				$("#interpretation-block").hide();
				CKEDITOR.instances['txtInterpretation'].setData("");
			}
			
			if(r.commentCheck == "Y"){
				$("#commentcheck").prop('checked', true);
				$("#comment-block").show();
				CKEDITOR.instances['txtComments'].setData(r.profileDisclaimer);
			}else{
				$("#commentcheck").prop('checked', false);
				$("#comment-block").hide();
				CKEDITOR.instances['txtComments'].setData("");
			}

			if(r.applyFormula=="Y"){
				$("#applyFormula").prop('checked', true);
			}else{
				$("#applyFormula").prop('checked', false);
			}
			
			if(r.processAtOutlab == "Y"){
				$("#processTestoutlab").prop('checked', true);
				
				var content = "";
				content = content + '<button class="btn btn-xs btn-warning editUserAccess" onclick="showOutLabDetails('+r.idprofile+');"><i class="fa fa-eye"></i></button>';
				
			/*	<i style="font-size:15px;cursor: pointer;" data-placement="right" data-toggle="tooltip" data-original-title="View OutLab" class="fa" onclick="showOutLabDetails('+r.idprofile+');">&#xf06e;</i>';*/
				$("#showoutLab").html(content);
			}
			$("#outLabCallFrom").val("update");
			
			var divContent = "";
			for ( var i = 0; i < r.labProfileReagentDetailsDTO.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'><input type='hidden' id='idLabReagentDetails"+(i+1)+"' value='"+r.labProfileReagentDetailsDTO[i].idReagentDetail+"'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'><input type='hidden' id='reagentName"+(i+1)+"' value='"+r.labProfileReagentDetailsDTO[i].itemMasterReagent.id+"'>"+ r.labProfileReagentDetailsDTO[i].itemMasterReagent.itemName+"</td>";
				
				divContent = divContent	+ "<td class='col-md-1 center' id='reagentType"+(i+1)+"'>"+r.labProfileReagentDetailsDTO[i].reagentType+"</td>";
				
				divContent = divContent	+ "<td class='col-md-1 center' id='quantity"+(i+1)+"'>"+r.labProfileReagentDetailsDTO[i].quantity+"</td>";
				
				divContent = divContent+ "<td class='col-md-1 center' id='unitName"+(i+1)+"'>"+r.labProfileReagentDetailsDTO[i].unitName+"</td>";
				
				//divContent = divContent+ "<td class='col-md-1 center'><input type='hidden' id='machineName"+(i+1)+"' value='"+ r.labProfileReagentDetailsDTO[i].itemMasterAsset.id+"'>"+r.labProfileReagentDetailsDTO[i].itemMasterAsset.itemName+"</td>";
				
				divContent = divContent+ "<td class='col-md-1 center'><input type='hidden'  id='testMethodNameid"+(i+1)+"' value='"+ r.labProfileReagentDetailsDTO[i].labTestMethod.idtestMethod+"'>"+r.labProfileReagentDetailsDTO[i].labTestMethod.methodName+"</td>";
				
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' id='deletebtn"+(i+1)+"' isNew='false' onclick=deleteReagentById('"+r.labProfileReagentDetailsDTO[i].idReagentDetail+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#reagentTableBody').html(divContent);
			
			setDragDropTempForTable2(r.labProfileTestCompDTO, "edit");
			//setOutLabTemplate(r);
			$("#popProfile").modal('show');
			$('#labProfileLi').trigger("click");
			getPathologyTemplateList(id);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: lab Profile Auto-Suggestion.
 ************/
function labProfileAutoSuggestion(profileId, type) {
	var startIndex = 0;
	var resultData = [];
	var labProfile = $("input#" + profileId).val();

	if (labProfile == "" || labProfile == null || labProfile == "null" || labProfile == undefined) {
		alert("Please enter search value");
		$("input#" + profileId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(labProfile));
	inputs.push('type=' + type);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/getlabprofiles",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.profileli.length; j++) {
				var arrValue = response.profileli[j].idprofile +"-"+response.profileli[j].profileName;
				var idValue = response.profileli[j].idprofile;
				var labProfile = response.profileli[j].profileName;
				resultData.push({
					ID : idValue,
					Name : labProfile
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + profileId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + profileId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var profileId = res[0];
		var profileName = res[1];
		getProfileById(profileId);
		$("input#" + profileId).val(profileName);
	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: get lab Profile by id.
 ************/
function getProfileById(id) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labprofile/getprofilebyid/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setLabProfileTemp(response,"autoSearch");
			$('#byName').val("");
		}
	});
}

function isCheckTempratureSesitive(id){
	if($('#'+id).is('checked')){
		$('#tempDiv').hide();
		return false;
	}else{
		$('#tempDiv').show();
		return true;
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

function isCheckTimeSensitive() {
	if ($("#timeSensitive").is(':checked')){
		$("#timeDiv").show();
		return true;
	} else{
    	$("#timeDiv").hide();
    	return false;
    }
}

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
			var dropdownList='<option value="0">Select Test Sample</option>';
			for ( var i = 0; i < r.testSamplelist.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.testSamplelist[i].idTestSample+'">'+r.testSamplelist[i].sampleName+'</option>';	
			}	
			$("#sampleId").html(dropdownList);
		}
	});
}

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
			var dropdownList='<option value="0">Select Unit</option>';
			for ( var i = 0; i < r.unitTypeList.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.unitTypeList[i].idunitType+'">'+r.unitTypeList[i].unitName+'</option>';	
			}	
			$("#unitList").html(JSON.stringify(r));
			$("#labUnitId").html(dropdownList);
		}
	});
}

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

function getOutlabValues(){
	var outlab = {outlabList : []	};

	if ($("#processTestoutlab").is(':checked')){
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
	}
	return outlab;
}

function isCheckOutSource() {
	var tableHeaderRowCount = 1;
	var outlabTable = document.getElementById('outlabTable');
	var rowCount = outlabTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		outlabTable.deleteRow(tableHeaderRowCount);
	}
	
	/*
	if ($("#processTestoutlab").is(':checked')){
		  $("#outLab").modal('show');
		  return true;
	} else{
    	  $("#outLab").modal('hide');
    	  return false;
    }
    */
}

/*
function hideOutlab(){
	$("#outLab").modal('hide');
}
*/

function closeOutlab(){
	$("#outLab").modal('hide');
	
	var callFrom = $("#outLabCallFrom").val();
	if(callFrom == "save"){
		var tableHeaderRowCount = 1;
		var outlabTable = document.getElementById('outlabTable');
		var rowCount = outlabTable.rows.length;
		for (var i = tableHeaderRowCount; i < rowCount; i++) {
			outlabTable.deleteRow(tableHeaderRowCount);
		}
	}
}

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
		+ '<td class="col-md-1 center"><select style="width:100%"  type="text" id="name'+ rows+ '"><option value="0">Select Type</option></select></td>'
		+ '<td class="col-md-1 center"><input type="checkbox" id="statusCheckbox'+ rows+ '"></td>'
		+'<td class="col-md-1 center"><input type="checkbox" value="0"  name="outlabCheckbox" id="outlabCheckbox'+ rows + '"/></td></tr>';
}

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

function addHeadingPopup() {
	var heading = $("#heading").val();
	if (heading == "0") {
		alert("Please Select Heading First...!");
		return false;
	}
	$("#ipopHead").modal('show');
}

function addHeadingPopupHide() {
	$("#ipopHead").modal('hide');
}

function addHeadingAsRow(from) {
	var head = $("#headingNamePck").val();
	
	if (head != "") {
		$("#tb2").append(
				"<tr> <td></td> <td>" + head + "</td>"
						+ "<input  type='hidden' name='hd' value='" + head
						+ "'></tr>");
		addHeadingPopupHide();
		$("#headingNamePck").val("");
	} else {
		alert("Please enter heading name");
	}
}

function showOutLabDetails(id){
	$("#outLab").modal('show');
}

function setOutLabTemplate(r){
	var content="";
	for ( var i = 0; i < r.profileOutLabList.length; i++) {
		content = content
				+ '<tr>'
				+ "<td  class='col-md-1 center'><input type='hidden' value='"+r.profileOutLabList[i].idOutlab+"' id='idOutlab"+(i+1)+"'>"+ (i + 1) + "</td>";
		content = content
				+ "<td class='col-md-1 center'><select onchange='getOutLabsByLabType("+(i+1)+", '0');' style='width:100%' id='type"+(i+1)+"'><option value='-1'>SELECT Type</option><option value='1'>Group Lab</option><option value='2'>External Lab</option></select></td>";
		
		content = content 
				+ '<td class="col-md-1 center"><select style="width:100%"  type="text" id="name'+(i+1)+'"><option value="0">Select Type</option></select></td>';
		
		content = content
				+ "<td class='col-md-1 center'><input type='checkbox'  id='statusCheckbox"+ (i+1) +"'></td>";
		
		content = content
				+ " <td class='col-md-1 center'>"
				+ "	<button class='btn btn-xs btn-danger' onclick=deleteOutlabById('"+r.profileOutLabList[i].idOutlab+"')><i class='fa fa-trash-o'></i></button></td></tr>";
	}
	$('#outlabTableBody').html(content);
	
	for ( var i = 0; i < r.profileOutLabList.length; i++) {
		$("#type"+(i+1)+"").val(r.profileOutLabList[i].type);
		
		getOutLabsByLabType(i+1, r.profileOutLabList[i].type);
		$("#name"+(i+1)+" > [value="+r.profileOutLabList[i].dto.id+"]").attr("selected",true);
	
		if(r.profileOutLabList[i].labStatus=='Active'){
		$("#statusCheckbox" +(i+1)+"").prop("checked",true);
		}else {
			$("#statusCheckbox"+(i+1)+"").prop("checked",false);
		}
	}
}

function deleteOutlabById(id) {
	var idProfile = $("#idPro").val();
	var r = confirm("Are You Sure You Want To Delete this lab ?");
	if (r == true) {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/labprofile/deleteOutlabById",
			data : {
				id : id
			},
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if (r == true) {
					alertify.success("Outlab Delete Sucessfully");
				} else {
					alertify.error("Outlab Not Deleted.");
				}
				editLabProfile(idProfile);
			}
		});
	}
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment To get Reagent List
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
			if(r.lstItemMaster != null){
				
				for ( var i = 0; i < r.lstItemMaster.length; i++) {
					dropdownList=dropdownList+'<option value="'+r.lstItemMaster[i].id+'">'+r.lstItemMaster[i].itemName+'</option>';	
				}
			}
			$("#reagentId").html(dropdownList);
		}
	});
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment To get Machine/Asset List
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
 * @author Akshay Mache
 * @since 16-07-2020
 * @comment To get All Test method for dropdown 
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
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To get required data on onload. 
*******************************************************************************/
function getRequiredData(){
	$('#labProfileLi').trigger("click");
	getAllHeadingList(); 
	getAllLabSampleList(); 
	getAllUnitList(); 
	getAllSampleContainerList(); 
	featchTeastUnderHeading();
	//getMachineList();
	getAllTestMethod();
	getReagentList("consumable");
	resetReagentForm();
	getAllHeadingListGroupMaster();
	$("#outLabCallFrom").val("save");
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment To get Reagent values  by id
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
				}else if(r.itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor3 == 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0){
					$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor2);
					$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitTwoName);
				}else if(r.itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0){
					$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor3);
					$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitThreeName);
				}else if(r.itemPurchaseSlaveDto[0].purchaseUomFactor4 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0){
					$('#quantity').val(r.itemPurchaseSlaveDto[0].purchaseUomFactor4);
					$('#unitName').val(r.itemPurchaseSlaveDto[0].uomUnitFourName);
				}
			}
		});
	}
}

/********************************************************************************
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To add Rows For Reagent Table
*******************************************************************************/
function addRowsForReagentTable() {
	var rows = $('#reagentTable tbody tr').length;
	addDynamicRecordsToReagentDetail(rows + 1,rows);
	refreshReagentForm();
}

/********************************************************************************
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To add dynamic Rows For Reagent Table
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
	
	var machineId = $("#machineName").val();
	if(machineId=='-1' || machineId==""){
		alert("Select Machine Name");
	     return false;
	}
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
	htm = htm
		+ '<tr class="newAddedReagent">'
		+ ' <td class="col-md-1 center"><input type="hidden" id="idLabReagentDetails'+id+'" value="0">'+ (index+1)+ '</td>'
		+ ' <td class="col-md-1 center">'+ reagentName +'<input type="hidden" id="reagentName'+id+'" value="'+reagentId+'"></td>'
		+ ' <td class="col-md-1 center" id="reagentType'+id+'">'+ reagentType +'</td>'
		+ ' <td class="col-md-1 center" id="quantity'+id+'">'+ quantity +'</td>'
		+ ' <td class="col-md-1 center" id="unitName'+id+'">'+ unitName +'</td>'
		//+ ' <td class="col-md-1 center">'+ machineName +'<input type="hidden" id="machineName'+id+'" value="'+machineId+'"></td>'
		+ ' <td class="col-md-1 center">'+ testMethodName +'<input type="hidden"  id="testMethodNameid'+id+'" value="'+testMethodId+'"></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" name="reagentClass" id="deletebtn'+id+'" isNew="true" onclick=deleteReagentDetails('+id+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
	$("#reagentTableBody").append(htm);
}

/********************************************************************************
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To delete Reagent Details
*******************************************************************************/
function deleteReagentDetails(id){
	var r = confirm("Are You Sure You Want To Delete Reagent Details.");
 	if (r) {
 		$("#reagentTableBody").on('click','#deletebtn' + id + '',function() {
 			var isNew = $("#deletebtn" + id).attr('isNew');
 			if (isNew != undefined && isNew != null && isNew == "false") {
						
 			} else {
 				$(this).closest('tr').remove();
 			}
 		});
 	}
}

/******************************************************************************************************
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To reset Form
****************************************************************************************************/
function resetReagentForm(){
	$("#quantity").val(0);
	$("#unitName").val("");
	
	var tableHeaderRowCount = 1;
	var reagentTable = document.getElementById('reagentTable');
	var rowCount = reagentTable.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		reagentTable.deleteRow(tableHeaderRowCount);
	}
}

/********************************************************************************
 * @author Akshay Mache
 * @since 
 * @comment To get reagent details. 
*******************************************************************************/
function reagentTable() {
	var reagentTable = {labProfileReagentDetailsList : []	};

	var count = 0;
	var totalRow = $('#reagentTableBody tr').length;
	for ( var i = 1; i <= totalRow; i++) {

		count++;
		var idLabReagentDetails=$("#idLabReagentDetails" + count +"").val();
		var reagentName = $("#reagentName" + count + "").val();
		var reagentType = $("#reagentType" + count + "").text();
		var quantity = $("#quantity" + count + "").text();
		var unitName = $("#unitName" + count + "").text();
		//var machineName = $("#machineName" + count + "").val();
		var testMethodNameid = $("#testMethodNameid" + count + "").val();
		
		reagentTable.labProfileReagentDetailsList.push({
			idReagentDetail : idLabReagentDetails,
			reagentId : reagentName,
			reagentType : reagentType,
			quantity : quantity,
			unitName : unitName,
			//assestId : machineName,
			labTestMethodId : testMethodNameid
			
		});
	}
	return reagentTable;
}

/******************************************************************************************************
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To reset Reagent Form.
****************************************************************************************************/
function refreshReagentForm(){
	$("#quantity").val(0);
	$("#unitName").val("");
	$("#reagentId").val(-1);
	$("#machineName").val(-1);
	$("#reagentTestMethodId").val(-1);
}

/********************************************************************************
 * @author Akshay Mache
 * @since 17-07-2020
 * @comment To delete Lab Profile Reagent details.
*******************************************************************************/
function deleteReagentById(id){
	var r = confirm("Are You Sure You Want To Delete this Reagent ?");
 	if (r) {
 		var idProfile = $("#idPro").val();
 		jQuery.ajax({
 			async : true,
 			type : "POST",
 			url : "ehat/labprofile/deleteLabProfileReagentById",
 			data : {
 				id : id
 			},
 			cache : false,
 			error : function() {
 				alertify.error('Network Issue');
 			},
 			success : function(r) {
 				if(r){
 					alertify.success( "Reagent Delete Sucessfully");		
 				}else{
 					alertify.error( "Reagent Not Deleted.");		
 				}	
 				editLabProfile(idProfile);
 			}
 		});
 	}
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: lab Profile Auto-Suggestion.
 ************/
function subServiceAutoSuggestion(profileId) {
	var resultData = [];
	var labProfile = $("input#" + profileId).val();

	if (labProfile == "" || labProfile == null || labProfile == "null" || labProfile == undefined) {
		alert("Please enter search value");
		$("input#" + profileId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(labProfile));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labprofile/getallpathologyservices",
		cache : false,
		success : function(response) {
			var availableTags = [];
			if (response.length == 50) {
				alert("NO MATCHING FOUND");
			} else {
				ajaxResponse = response;
				for ( var i = 0; i < ajaxResponse.lstSubService.length; i++) {
					availableTags.push(ajaxResponse.lstSubService[i].subId + "~"
								+ ajaxResponse.lstSubService[i].categoryName + "~"
								+ ajaxResponse.lstSubService[i].codeName+ "~"
								+ ajaxResponse.lstSubService[i].charges);
				}
				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("~");
						
					var idValue = (arrValue[0]);
					var labProfile =(arrValue[1]);
					var codeName =(arrValue[2]);
					var charges =(arrValue[3]);
						
					resultData.push({
						ID : idValue,
						testid :idValue+"~"+codeName+"~"+charges,
						//Name : idValue+"-"+labProfile,
						Name : labProfile,
					});

					template = template + '<li data-value= "'+arrValue[0]+'-'+ arrValue[1]
							+ '" class=""><a href="#">'+arrValue[0]+'-'+ arrValue[1]+'</a></li>';
				}
				
				$("#div" + profileId + " .typeahead").html(template);
				$("#div" + profileId + " .typeahead").show();

				setTimeout(function() {
					$('#' + profileId).typeahead({
						source : resultData,
						displayField : 'Name',
					    valueField : 'testid',
					   	onSelect : displayResult2,
						scrollBar : true
					});
				}, 500);
			}
		}
	});
	function displayResult2(item) {
		$('#' + profileId).val(item.text);
		var testChargesId = (item.value).split("~");
		$("#subserviceid").val(testChargesId[0]);
		$("#proCode").val(testChargesId[1]);
		$("#categorycharges").val(testChargesId[2]);
	}
}

function hideOutlab(){
	if ($("#processTestoutlab").is(':checked')){
		 $("#outlabTable").find('input,select').attr('disabled', false);
	}else{
		$("#outlabTable").find('input,select').attr('disabled', true);
	}
}

function validateProfile(){
	var profileId = 0;
	var profileName = "";
	var subServiceId = 0;
	
	setTimeout(function() {
		var subServiceId = $.trim($("#subserviceid").val());
		var profileName = $.trim($("#proNm").val());
		var profileId = $.trim($("#idPro").val());
	
		if(subServiceId > 0) {
			var inputs = [];
			inputs.push('profileId=' + encodeURIComponent(profileId));
			inputs.push('profileName=' + encodeURIComponent(profileName));
			inputs.push('subServiceId=' + encodeURIComponent(subServiceId));
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "ehat/labprofile/validateLabProfile",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					alert(r);
					$("#proNm").val("");
				}
			});
		}
	}, 500);
}

function searchTestByName(value){
	var headingId = $.trim($("#heading").val());
	var sampleTypeId = $.trim($("#sampleId").val());
	
	if(headingId == 0 || headingId == "" || headingId == undefined){
		alert("Select heading name.");
		$("#searchId").val("");
		return false;
	}
	if(sampleTypeId == 0 || sampleTypeId == "" || sampleTypeId == undefined){
		alert("Select sample type.");
		$("#searchId").val("");
		return false;
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data :{
			searchName : value,
			headingId  : headingId,
			sampleId : sampleTypeId
		},
		url : "ehat/labprofile/searchTestInDragFromTable",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setDragDropTemp(r);
		}
	});	
}


/********************************************************************************
 * @author Dayanand Khandekar
 * @since 21-09-2021
 * @comment for show the create template model  
*******************************************************************************/
function createTemplateForLabTest(){
	/*var profileId=$("#idPro").val();
	if(profileId == 0){
		alert("Please Save Profile First...");
		return false;
	}
	*/
	$("#viewLabTestTemplate").modal('show');
}

/***@author    :Dayanand Khandekar
 * @Date       :20-Sep-2021
 * @code       : for Save Pathology Template***/
function savePathologyTemplate() {
	var templateId = $("#templateId").val();
	var profileId=$("#idPro").val();
	var sampleId = $("#sampleId").val();
	if(sampleId==-1 || sampleId==""){
		sampleId=0;
		
	}
var sampleName=	$("#sampleId option:selected").text();
	
	var headingId = $("#heading").val();
	if(headingId==-1 || headingId==""){
		headingId=0;
		
	}
	var headingName=	$("#heading option:selected").text();
	
	var templateName = $("#labTestTemplateName").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var templateData = "";
		templateData = CKEDITOR.instances['iEditorTestTemplate'].getData();
		
		if(profileId == "" || profileId == undefined || profileId == null || profileId==0){
			alertify.alert("Please Select Profile First");
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
	
	
	var templateDefault="N";
	
	if ($("#templatedefault").is(':checked')){
		templateDefault="Y";
	}
	
	
	var inputs = [];	
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('createdBy=' +userId);
	inputs.push('unitId=' + unitId);
	inputs.push('profileId=' + profileId);
	inputs.push('sampleId=' + sampleId);
	inputs.push('sampleName=' + sampleName);
	inputs.push('headingId=' + headingId);
	inputs.push('headingName=' + headingName);
	inputs.push('templateDefault=' + templateDefault);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/labtest/savePathologyTemplate",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r==1){
				alertify.success("Template Save Successfully ");
				refreshTemplateData();
				getPathologyTemplateList(profileId);
				
			}else if(r==2){
				alertify.success("Template Updated Successfully ");
				refreshTemplateData();
				getPathologyTemplateList(profileId);
				
			}else if(r==3){
				alertify.error("Default  Template Already Present ");
				refreshTemplateData();
				getPathologyTemplateList(profileId);
			}
			else{
				alertify.error("Network Issue ");
			}
			
		}
	});
}

function closeTemplatePopUp(){
	refreshTemplateData();
}

function refreshTemplateData(){
	 $("#templateId").val(0);
		$("#labTestTemplateName").val("");
		CKEDITOR.instances['iEditorTestTemplate'].setData("");
		$("#templatedefault").prop('checked', false);
}

function getPathologyTemplateById(){
	var id= $("#templateId").val();
	var inputs = [];	
	
	if(id == 0 || id == undefined || id=="null" || id =="undefined" || id == null){
		refreshTemplateData();
		return false;
	}
	
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/labtest/getPathologyTemplateById",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		 $("#templateId").val(r.templateId);
			
			$("#labTestTemplateName").val(r.templateName);
			CKEDITOR.instances['iEditorTestTemplate'].setData(r.templateData);
			
			var templateDefault=r.templateDefault;
			if(templateDefault == "Y"){
				$("#templatedefault").prop('checked', true);
			}else{
				$("#templatedefault").prop('checked', false);
			}
			
			
		}
	});

}

function getPathologyTemplateList(profileId){
	
	var inputs = [];	
	
	inputs.push('testId=' + profileId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/labtest/getPathologyTemplateList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 setTemplateList(r)
			
		}
	});
}

function setTemplateList(r){
	var list="<option value='0' >NewTemplate</option>";
	//var list="";
	for ( var i = 0; i < r.pathologytemplateList.length; i++) {
		if(r.pathologytemplateList[i].templateDefault == "Y"){
			list=list+'<option style="background-color:yellow" value="'+(r.pathologytemplateList[i].templateId)+'">'+(r.pathologytemplateList[i].templateName)+'</option>';
			}else{
				list=list+'<option  value="'+(r.pathologytemplateList[i].templateId)+'">'+(r.pathologytemplateList[i].templateName)+'</option>';
			}
	}	
	$("#templateId").html(list);
}

function deletePathologyTemplate(){
	var profileId=$("#idPro").val();
	var id=$("#templateId").val();
	if(id == 0 || id == undefined || id=="null" || id =="undefined" || id == null){
		alertify.error("Please Select Template First.. ");
		refreshTemplateData();
		return false;
	}
	
	
var inputs = [];	
	
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/labtest/deletePathologyTemplate",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 if(r==1){
				 alertify.success("Template Deleted  Successfully ");
				 refreshTemplateData();
				 getPathologyTemplateList(profileId);
				
			 }else{
				 alertify.error("Network Issue.... ");
			 }
			
		}
	});
}

/************
* @author	: Dayanand khandekar
* @date		: 21-10-2021
* @codeFor	:hide test div
 ************/
function hideShowTestDiv(){
	
	if($("#chkHistopathwise").prop('checked') == true){
		
		$("#divProfileTestDrag").hide();
	}else{
		$("#divProfileTestDrag").show();
	}
}

/************
* @author	: Rohit Ambawade
* @date		: 09-11-2021
* @codeFor	: hide and show the disclaimer textarea
 ************/
$(document).ready(function () {
    $("#disclaimercheck").click(function () {
        if ($(this).is(":checked") == true)
            $("#disclaimer-block").show();
        else
        	$("#disclaimer-block").hide();
    });
});

$(document).ready(function () {
    $("#interpretationcheck").click(function () {
        if ($(this).is(":checked") == true)
            $("#interpretation-block").show();
        else
        	$("#interpretation-block").hide();
    });
});

$(document).ready(function () {
    $("#commentcheck").click(function () {
        if ($(this).is(":checked") == true)
            $("#comment-block").show();
        else
        	$("#comment-block").hide();
    });
});