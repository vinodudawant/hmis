// Complaint master start
function saveComplaints(){

	var complaintId = $("#complaintId").val();
	var complaint = $("#iComplaintName").val();
	var queryType = $("#queryType").val();
	
	if(complaint == "" || complaint == undefined){
		alert("Please Insert Complaint Name!");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=saveComplaint');
	inputs.push('complaintId='+ complaintId);
	inputs.push('complaint='+ complaint);
	inputs.push('queryType='+ queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(r);
			$("#iSubObjTemplateName").val("");
			$("#queryType").val("insert");
			location.reload();
		}
	});
}

var TableComplaintTemplate = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.LiCmp as lc}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{count++}</td>"
	+ "<td class='col-sm-8-1 left' style='height: 21.5px;'>{$T.lc.cmpNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editComplaint({$T.lc.cmpId})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>&nbsp;&nbsp;&nbsp;"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteComplaint({$T.lc.cmpId})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchEMRComplaint(){
	var inputs = [];
	inputs.push('action=fetchEMRComplaint');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#complaintDetails").html(ajaxResponse);
			var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
			$("#iComplaintName").val("");
			count = 1;
			$("#TableComplaint").setTemplate(TableComplaintTemplate);
			$("#TableComplaint").processTemplate(pobj1);
		}
	});
}


function editComplaint(compId){
	var myObj1 = "" ;
	var complaintId = $("#complaintId").val();
	var ajaxResponse = $("#complaintDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.LiCmp.length; i++) {
		if (myArray.LiCmp[i].cmpId == compId) {
			myObj1 = myArray.LiCmp[i];
			break;
		}
	}
	
		$("#title").html("Edit Complaint:");
		$("#iComplaintName").val(myObj1.cmpNM);
		$("#complaintId").val(myObj1.cmpId);
		$("#queryType").val("update");
	
}

function deleteComplaint(compId){

	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteComplaint');
		inputs.push("compId=" + compId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function setAutoComplaint(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	
	var inputs = [];
	inputs.push('auto=' + callFrom);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					
					$("#" + inputID ).html(template);
					$("#" + inputID ).show();
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 00);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#compId").val((item.value).trim());
	}
}

function saveComplaintFinding(type){

	var queryTypeforCmpFind = $("#queryTypeForComplaintFinding").val();
	var queryType = "";
	if(queryTypeforCmpFind == "1"){
		queryType = "insert";
	}else{
		queryType = "update";
	}
	var pId = $("#patientId").text();
	var treatId = $("#tid").val();
	var checkAnswer = [];
	if(type == 'complaint'){
		$.each($('#assignCmpId:checked'), function() {
			var id = $(this).val();
			var name = $("#assignCmpVal_"+id).val();
			var CmpId = $("#CmpId_"+id).val();
			if(CmpId == "" || CmpId == undefined){
				CmpId = 0;
			}
			var new_Cmp = id +"#@#"+name+"#@#"+CmpId; 
			checkAnswer.push(new_Cmp);
		});
		if(checkAnswer == ""){
			alert("Please Select Complaints to Add!");
			return false;
		}
	}else{
		$.each($('#assignFndId:checked'), function() {
			var id = $(this).val();
			var name = $("#assignFndVal_"+id).val();
			var FndId = $("#FndId_"+id).val();
			if(FndId == "" || FndId == undefined){
				FndId = 0;
			}
			var new_Fnd = id +"#@#"+name+"#@#"+FndId; 
			checkAnswer.push(new_Fnd);
		});
		if(checkAnswer == ""){
			alert("Please Select Findings to Add!");
			return false;
		}
	}
	
	var complaint = "";
	var comobj = {
			LiCmp : []
	};
	
	for ( var i = 0; i < checkAnswer.length; i++) {
		if (checkAnswer[i] != "") {
			var cmp_det = checkAnswer[i].split("#@#");
			comobj.LiCmp.push({
				"cmpId" : cmp_det[0],
				"cmpVal" : cmp_det[1],
				"cmpAssId" : cmp_det[2],
			});
		}
	}
	complaint = JSON.stringify(comobj);
	var inputs = [];
	inputs.push('action=saveComplaintFinding');
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	inputs.push('checkAnswer=' + complaint);
	inputs.push('type='+ type);
	inputs.push('queryType='+ queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(r);
			if(type == 'complaint'){
				$('#viewEMRComplaintModal').modal('hide');
			}else{
				$('#viewEMRFindingModal').modal('hide');
			}
			//location.reload();
			FetchEMRAssignedCompFind(0);
		}
	});
}

function sendComplaintToAssign(id){
	var count = $("#cmpCount").val();
	var flag=0;
	$("#assignComplaintBody input:checkbox").map(function(){
		if($(this).val()==id){
			flag=1;
		}
	});
	
	if(flag==1){
		alertify.error("Duplicate entry..!!");
		$("#cmpId_"+id).prop("checked", false);
		return false;
	}

	var $radios = $('input:checkbox[id=cmpId_' +id+ ']');
	if ($radios.is(':checked') == true) {

		var testNm = $("#cmpNm" + id).html();
		var divContent = "<tr>"
						+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"+(count)+".</div></td>"
						+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNm"+(id)+"'><input id='assignCmpVal_"+id+"' type='text' style='width: 100%;' onClick='setIdForCompFind()' value='"+testNm+"' /></td>"
						+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
						+ "<input type='checkbox' id='assignCmpId' value='"+id+"' ></td>"
						+ "<input type='hidden' id='CmpId"+(id)+"' value='"+id+"'></tr>";
						
		$('#assignComplaintBody').append(divContent);
		
		count++;
		$("#cmpCount").val(count);
		$('input:checkbox[id=cmpId_' + id + ']').attr("checked", false);
		$('input:checkbox[id=assignCmpId]').attr("checked", true);
	}
}

function addComplaintToAssign(){
	var id = $("#compId").val();
	var testNm = $("#complaint_byName").val();

	var count = $("#cmpCount").val();
		var divContent = "<tr>"
						+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"+(count)+".</div></td>"
						+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNm"+(id)+"'><input id='assignCmpVal_"+id+"' type='text' style='width: 100%;' onClick='setIdForCompFind()' value='"+testNm+"' /></td>"
						+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
						+ "<input type='checkbox' id='assignCmpId' value='"+id+"' ></td>"
						+ "<input type='hidden' id='CmpId"+(id)+"' value='"+id+"'></tr>";
						
		$('#assignComplaintBody').append(divContent);
		
		count++;
		$("#cmpCount").val(count);
		$('input:checkbox[id=assignCmpId]').attr("checked", true);
		
		$("#compId").val("");
		$("#complaint_byName").val("");
}

function setIdForCompFind(){
	$("#queryTypeForComplaintFinding").val(2);
}

function emrComplaintPopUp(){
	$('#viewEMRComplaintModal').modal();
}

//Complaint master end

function sendFindingToAssign(id){
	var count = $("#fndCount").val();
	var flag=0;
	$("#assignFindingBody input:checkbox").map(function(){
		if($(this).val()==id){
			flag=1;
		}
	});
	
	if(flag==1){
		alertify.error("Duplicate entry..!!");
		$("#fndId_"+id).prop("checked", false);
		return false;
	}
	var $radios = $('input:checkbox[id=fndId_' +id+ ']');
	if ($radios.is(':checked') == true) {

		var testNm = $("#fndNM" + id).html();
		var divContent = "<tr>"
						+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"+(count)+".</div></td>"
						+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"+(id)+"'><input id='assignFndVal_"+id+"' type='text' style='width: 100%;' onClick='setIdForCompFind()' value='"+testNm+"' /></td>"
						+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
						+ "<input type='checkbox' id='assignFndId' value='"+id+"' ></td>"
						+ "<input type='hidden' id='FndId"+(id)+"' value='"+id+"'></tr>";
						
		$('#assignFindingBody').append(divContent);
		
		count++;
		$("#fndCount").val(count);
		$('input:checkbox[id=fndId_' + id + ']').attr("checked", false);
		$('input:checkbox[id=assignFndId]').attr("checked", true);
	}
}

function addFindingToAssign(){
	var id = $("#fingId").val();
	var testNm = $("#finding_byName").val();

	var count = $("#fndCount").val();
		var divContent = "<tr>"
						+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"+(count)+".</div></td>"
						+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"+(id)+"'><input id='assignFndVal_"+id+"' type='text' style='width: 100%;' onClick='setIdForCompFind()' value='"+testNm+"' /></td>"
						+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
						+ "<input type='checkbox' id='assignFndId' value='"+id+"' ></td>"
						+ "<input type='hidden' id='FndId"+(id)+"' value='"+id+"'></tr>";
						
		$('#assignFindingBody').append(divContent);
		
		count++;
		$("#fndCount").val(count);
		$('input:checkbox[id=assignFndId]').attr("checked", true);
		
		$("#fingId").val("");
		$("#finding_byName").val("");
}

//Finding master end
function emrFindingPopUp(){
	$('#viewEMRFindingModal').modal();
}

function saveFindings(){

	var findingId = $("#findingId").val();
	var finding = $("#iFindingName").val();
	var queryType = $("#queryType").val();
	
	if(finding == "" || finding == undefined){
		alert("Please Insert Finding Name!");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=saveFinding');
	inputs.push('findingId='+ findingId);
	inputs.push('finding='+ finding);
	inputs.push('queryType='+ queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(r);
			//$("#iSubObjTemplateName").val("");
			$("#queryType").val("insert");
			location.reload();
			
		}
	});
}

var TableFindingTemplate = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.LiCmp as lc}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{count++}</td>"
	+ "<td class='col-sm-8-1 left' style='height: 21.5px;'>{$T.lc.fndNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editFinding({$T.lc.fndId})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>&nbsp;&nbsp;&nbsp;"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteFinding({$T.lc.fndId})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchEMRFinding(){
	var inputs = [];
	inputs.push('action=fetchEMRFinding');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#findingDetails").html(ajaxResponse);
			var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
			$("#iFindingName").val("");
			count = 1;
			$("#TableFinding").setTemplate(TableFindingTemplate);
			$("#TableFinding").processTemplate(pobj1);
		}
	});
}


function editFinding(fndId){
	var myObj1 = "" ;
	var findingId = $("#findingId").val();
	var ajaxResponse = $("#findingDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.LiCmp.length; i++) {
		if (myArray.LiCmp[i].fndId == fndId) {
			myObj1 = myArray.LiCmp[i];
			break;
		}
	}
		$("#title").html("Edit Finding:");
		$("#iFindingName").val(myObj1.fndNM);
		$("#findingId").val(myObj1.fndId);
		$("#queryType").val("update");
}

function deleteFinding(fndId){

	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteFinding');
		inputs.push("fndId=" + fndId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function setAutoFinding(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	
	var inputs = [];
	inputs.push('auto=' + callFrom);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					
					$("#" + inputID ).html(template);
					$("#" + inputID ).show();
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 00);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#fingId").val((item.value).trim());
	}
}
//Finding master end


function saveBodyPart(){
	var bodyPartId = $("#bodyPartId").val();
	var bodyPartName = $("#iBodyPartName").val();
	var queryType = $("#queryType").val();
	if(bodyPartName == "" || bodyPartName == undefined){
		alert("Please Insert Body Part Name!");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=saveBodyPart');
	inputs.push('bodyPartName='+ bodyPartName);
	inputs.push('bodyPartId='+ bodyPartId);
	inputs.push('queryType='+ queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(r);
			$("#iBodyPartName").val("");
			$("#queryType").val("insert");
			location.reload();
		}
	});
}

var SelBodyPartTemplate = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.bodyList as bl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{count++}</td>"
	+ "<td class='col-sm-8-1 center' style='height: 21.5px;'>{$T.bl.bodyNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editBodyPart({$T.bl.bodyId})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>&nbsp;&nbsp;&nbsp;"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteBodyPart({$T.bl.bodyId})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var SelBodyPartTemp = "<option value='0'>Select Body Part</option>{#foreach $T.bodyList as bl}  <option value='{$T.bl.bodyId}'> {$T.bl.bodyNM} </option> {#/for}";

function fetchBodyPart(){
	var inputs = [];
	inputs.push('action=fetchBodyPart');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			var bodyPartName ="";
			var bodyPartId ="";
			$("#bodyPartDetails").html(ajaxResponse);
			var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
			for(var i = 0; i < pobj1.bodyList.length; i++){
				if(pobj1.bodyList[i].bodyId != "" || pobj1.bodyList[i].bodyId != 0){
					bodyPartName = pobj1.bodyList[i].bodyNM; 
					bodyPartId= pobj1.bodyList[i].bodyId;
				}
				$("#bodyPartId").val(bodyPartId);
			}
			$("#iBodyPartName").val("");
			count = 1;
			$("#TableBodyParts").setTemplate(SelBodyPartTemplate);
			$("#TableBodyParts").processTemplate(pobj1);
			
			$("#iBodyPart").setTemplate(SelBodyPartTemp);
			$("#iBodyPart").processTemplate(pobj1);
			
		}
	});
}

function editBodyPart(bodyId){
	var myObj1;
	var bodyPartId = $("#bodyPartId").val();
	var ajaxResponse = $("#bodyPartDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.bodyList.length; i++) {

		if (myArray.bodyList[i].bodyId == bodyId) {
			myObj1 = myArray.bodyList[i];
			break;
		}
	}
	if (bodyPartId != "0") {
		$("#title").html("Edit Body Part:");
		$("#iBodyPartName").val(myObj1.bodyNM);
		$("#bodyPartId").val(myObj1.bodyId);
		$("#queryType").val("update");
	}
}

function deleteBodyPart(bodyId){

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
		
		var inputs = [];
		inputs.push('action=deleteBodyPart');
		inputs.push("bodyId=" + bodyId);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function saveSubjectiveObjectiveTempType(){

	var subObjTempTypeId = $("#subObjTempTypeId").val();
	var subObjTempTypeName = $("#iSubObjTempTypeName").val();
	var queryType = $("#queryType").val();
	
	if(subObjTempTypeName == "" || subObjTempTypeName == undefined){
		alert("Please Insert Template Type Name!");
		return false;
	}
	var inputs = [];
	inputs.push('action=saveSubjectiveObjectiveTempType');
	inputs.push('subObjTempTypeName='+ subObjTempTypeName);
	inputs.push('subObjTempTypeId='+ subObjTempTypeId);
	inputs.push('queryType='+ queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(r);
			$("#iSubObjTempTypeName").val("");
			$("#queryType").val("insert");
			location.reload();
		}
	});
}


var SelSubObjTempTypeTemplate = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.subObjTypeL as tl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{count++}</td>"
	+ "<td class='col-sm-8-1 center' style='height: 21.5px;'>{$T.tl.subObjTypeNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editSubObjTempType({$T.tl.subObjTypeId})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>&nbsp;&nbsp;&nbsp;"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteSubObjTempType({$T.tl.subObjTypeId})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var SelTempTypeTemplate = "<option value='0'>Select Template Type</option>{#foreach $T.subObjTypeL as tl}  <option value='{$T.tl.subObjTypeId}'> {$T.tl.subObjTypeNM} </option> {#/for}";

function fetchSubjectiveObjectiveTempType(){
	var inputs = [];
	inputs.push('action=fetchSubjectiveObjectiveTempType');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			var subObjTypeNM ="";
			var subObjTypeId ="";
			$("#subObjTempTypeDetails").html(ajaxResponse);
			var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
			for(var i = 0; i < pobj1.subObjTypeL.length; i++){
				if(pobj1.subObjTypeL[i].subObjTypeId != "" || pobj1.subObjTypeL[i].subObjTypeId != 0){
					subObjTypeNM = pobj1.subObjTypeL[i].subObjTypeNM; 
					subObjTypeId= pobj1.subObjTypeL[i].subObjTypeId;
				}
				$("#subObjTempTypeId").val(subObjTypeId);
			}
			$("#iSubObjTempTypeName").val("");
			count = 1;
			$("#TableSubObjTempType").setTemplate(SelSubObjTempTypeTemplate);
			$("#TableSubObjTempType").processTemplate(pobj1);
			
			$("#iTempType").setTemplate(SelTempTypeTemplate);
			$("#iTempType").processTemplate(pobj1);
		}
	});
}


function editSubObjTempType(subObjTypeId){
	var myObj1;
	var subObjTempId = $("#subObjTempTypeId").val();
	var ajaxResponse = $("#subObjTempTypeDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.subObjTypeL.length; i++) {

		if (myArray.subObjTypeL[i].subObjTypeId == subObjTypeId) {
			myObj1 = myArray.subObjTypeL[i];
			break;
		}
	}
	if (subObjTempId != "0") {
		$("#title").html("Edit Subjective Objective Template Type:");
		$("#iSubObjTempTypeName").val(myObj1.subObjTypeNM);
		$("#subObjTempTypeId").val(myObj1.subObjTypeId);
		$("#queryType").val("update");
	}
}

function deleteSubObjTempType(subObjTypeId){

	var r = confirm("Are you confirm to Delete Record?");

	if (r == true) {
		
		var inputs = [];
		inputs.push('action=deleteSubObjTempType');
		inputs.push("subObjTypeId=" + subObjTypeId);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function saveSubjectiveObjectiveTemplates(){

	var subObjTemplateId = $("#subObjTemplateId").val();
	var SubObjTemplateName = $("#iSubObjTemplateName").val();
	var Specialtity = $("#iSpecialtity").val();
	var BodyPart = $("#iBodyPart").val();
	var TempType = $("#iTempType").val();
	var queryType = $("#queryType").val();
	
	if(SubObjTemplateName == "" || SubObjTemplateName == undefined){
		alert("Please Insert Template Name!");
		return false;
	}
	if(Specialtity == "" || Specialtity == undefined){
		alert("Please Select Specialtity!");
		return false;
	}
	if(BodyPart == 0 || BodyPart == null){
		alert("Please Select Body Part!");
		return false;
	}
	if(TempType == 0 || TempType == null){
		alert("Please Select Template Type!");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=saveSubjectiveObjectiveTemplates');
	inputs.push('SubObjTemplateName='+ SubObjTemplateName);
	inputs.push('Specialtity='+ Specialtity);
	inputs.push('BodyPart='+ BodyPart);
	inputs.push('TempType='+ TempType);
	inputs.push('subObjTemplateId='+ subObjTemplateId);
	inputs.push('queryType='+ queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(r);
			$("#iSubObjTemplateName").val("");
			$("#queryType").val("insert");
			location.reload();
		}
	});
}
function fetchDoctorSpecilizations1(page){

	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < doctorBean.liSplz.length; i++) {

				if (page == 'custTemp') {

					var divDocSpec = eval('(' + ajaxResponse + ')');
					var doctorSpec = "<option value=''>--Select--</option>";

					for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
						doctorSpec = doctorSpec + "<option value='"
								+ divDocSpec.liSplz[int].splzId + "'>"
								+ divDocSpec.liSplz[int].splzNm + "</option>";
						var array_element = divDocSpec.liSplz[int];

					}
					$('#iSpecialtity').html(doctorSpec);
					$('#selDocSpec').html(doctorSpec);
				} else {

					var o = new Option("option text", "value");
					// / jquerify the DOM object 'o' so we can use the html
					// method
					$(o).html(doctorBean.liSplz[i].splzNm);
					$(o).val(doctorBean.liSplz[i].splzId);
					// alert(doctorBean.liSplz[i].splzId);
					// $("#selDocSpec").val(doctorBean.liSplz[i].splzId);
					$("#iSpecialtity").append(o);
					$("#selName").append(o);
				}
			}
		}
	});	
}

var SelSubObjTemplate = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.subObjTemplateList as tl}"
	+ "<tr>"
	+ "<td class='col-sm-0-1' style='height: 21.5px;'>{count++}</td>"
	+ "<td class='col-sm-3-1 center' style='height: 21.5px;'>{$T.tl.subObjTemplateNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.specialityNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.bodyPartNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.subObjTempTypeNM}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit2' onclick='editSubObjTemplate({$T.tl.subObjTemplateId})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>&nbsp;&nbsp;&nbsp;"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete2' onclick='deleteSubObjTemplate({$T.tl.subObjTemplateId})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchSubjectiveObjectiveTemplates(){
	var inputs = [];
	inputs.push('action=fetchSubjectiveObjectiveTemplates');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			var subObjTemplateNM ="";
			var subObjTemplateId ="";
			$("#subObjTemplateDetails").html(ajaxResponse);
			var pobj1 =JSON.parse(ajaxResponse);
			for(var i = 0; i < pobj1.subObjTemplateList.length; i++){
				if(pobj1.subObjTemplateList[i].subObjTemplateId != "" || pobj1.subObjTemplateList[i].subObjTemplateId != 0){
					subObjTemplateNM = pobj1.subObjTemplateList[i].subObjTemplateNM; 
					subObjTemplateId= pobj1.subObjTemplateList[i].subObjTemplateId;
				}
				$("#subObjTemplateId").val(subObjTemplateId);
			}
			$("#iSubObjTemplateName").val("");
			count = 1;
			$("#TableSubObjTemplate").setTemplate(SelSubObjTemplate);
			$("#TableSubObjTemplate").processTemplate(pobj1);
			
			var Templates = "<option value='0'>--Select--</option>";
			for ( var int = 0; int < pobj1.subObjTemplateList.length; int++) {
				Templates = Templates + "<option value='"
						+ pobj1.subObjTemplateList[int].subObjTemplateId + "'>"
						+ pobj1.subObjTemplateList[int].subObjTemplateNM + "</option>";
				var array_element = pobj1.subObjTemplateList[int];
			}
			$('#txtTemplateType').html(Templates);
		}
	});
}


function editSubObjTemplate(subObjTemplateId){
	var myObj1;
	var subObjTempId = $("#subObjTemplateId").val();
	var ajaxResponse = $("#subObjTemplateDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.subObjTemplateList.length; i++) {

		if (myArray.subObjTemplateList[i].subObjTemplateId == subObjTemplateId) {
			myObj1 = myArray.subObjTemplateList[i];
			break;
		}
	}
	if (subObjTempId != "0") {
		$("#title").html("Edit Subjective Objective Template:");
		$("#iSubObjTemplateName").val(myObj1.subObjTemplateNM);
		$("#iSpecialtity").val(myObj1.spec);
		$("#iBodyPart").val(myObj1.bodyPartId);
		$("#iTempType").val(myObj1.subObjTypeId);
		$("#subObjTemplateId").val(myObj1.subObjTemplateId);
		$("#queryType").val("update");
	}
}

function deleteSubObjTemplate(subObjTemplateId){

	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteSubObjTemplate');
		inputs.push("subObjTemplateId=" + subObjTemplateId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

/*function fetchOncoEmrTemplates(){
	
		var idDocSpec = $("#selDocSpec").val();
		var idBodyPart = $("#iBodyPart").val();
		if(idDocSpec == "" || idDocSpec == undefined){
			idDocSpec=0;
		}
		if(idBodyPart == "" || idBodyPart == undefined){
			idBodyPart=0;
		}
		$("#iOncoEmrTemplates").val(0);
		var inputs = [];
		inputs.push('action=fetchOncoEmrTemplates');
		inputs.push("idDocSpec=" + idDocSpec);
		inputs.push("idBodyPart=" + idBodyPart);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			},
			success : function(r) {
				var ajaxResponse = r;
				var divData = eval('(' + ajaxResponse + ')');
				var Templates = "<option value='0'>--Select--</option>";
				for ( var int = 0; int < divData.subObjTemplateList.length; int++) {
					Templates = Templates + "<option value='"
							+ divData.subObjTemplateList[int].subObjTemplateId + "'>"
							+ divData.subObjTemplateList[int].subObjTemplateNM + "</option>";
					var array_element = divData.subObjTemplateList[int];
				}
				$('#iOncoEmrTemplates').html(Templates);
				//$("#selDocSpec").val(0);
				//$("#iBodyPart").val(0);
			}
		});
}*/

//question master start
function fetchQueMaxID(){
	var inputs = [];
	inputs.push('action=maxIDofEMRQueList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(r) {
			$("#txtQueID").val(r);
		}
	});
}

function InsertEmrQue(queryType, updateFrom){
	
	dynaCountt = $("#dynaCountt").val();
	var txtQueID =$("#txtQueID").val();
	var txtQue = $("#txtQue").val();
	var txtQueType = $("#txtQueType").val();
	var txtTemplateType = $("#txtTemplateType").val();
	if(txtQue == "" || txtQue == undefined ){
		alert("Please Enter Question ");
		return false;
	}
	if(txtTemplateType == 0 || txtTemplateType == undefined ){
		alert("Please Select Template Type");
		return false;
	}
	if(txtQueType == "" || txtQueType == undefined ){
		alert("Please Select Question Type");
		return false;
	}
	var objOpt = 0;
	objOpt = {
		Optli : []
	};

	if(txtQueType == "radio"){
		var count = 0;
		if (dynaCountt == 0) {
			// alert("You can not save empty fields.");
			// return false;
		}
		for ( var i = 1; i <= dynaCountt; i++) {
			count++;
			var txtRadio = $.trim($("#txtRadio" + count + "").val());
			var hiddenId = $("#hiddenId" + count + "").val();
			if (queryType == "insert") {
				if (txtRadio == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtRadio" + count + "").focus());
					return false;
				}
			}
			if (txtRadio != undefined) {
				objOpt.Optli.push({
					"OptName" : txtRadio,
					"idOpt" : hiddenId
				});
			}
		}
		if (queryType == "insert") {
			if (objOpt.Optli.length == 0) {
				alert("You Can Not Save Empty Field");
				return false;
			}
		}
		objOpt = JSON.stringify(objOpt);
		
	}else if(txtQueType == "checkbox"){
		var count = 0;
		if (dynaCountt == 0) {
			// alert("You can not save empty fields.");
			// return false;
		}
		for ( var i = 1; i <= dynaCountt; i++) {
			count++;
			var txtCheckbox = $.trim($("#txtCheckbox" + count + "").val());
			var hiddenId = $("#hiddenId" + count + "").val();
			if (queryType == "insert") {
				if (txtCheckbox == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtCheckbox" + count + "").focus());
					return false;
				}
			}
			if (txtCheckbox != undefined) {
				objOpt.Optli.push({
					"OptName" : txtCheckbox,
					"idOpt" : hiddenId
				});
			}
		}
		if (queryType == "insert") {
			if (objOpt.Optli.length == 0) {
				alert("You Can Not Save Empty Field");
				return false;
			}
		}
		objOpt = JSON.stringify(objOpt);
		
	}else {
		if (dynaCountt == 0) {
			// alert("You can not save empty fields.");
			// return false;
		}
			var textName = $.trim($("#txtText").val());
			var hiddenId = $("#hiddenId").val();
			if (queryType == "insert") {
				if (textName == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtText").focus());
					return false;
				}
			}
			if (textName != undefined) {
				objOpt.Optli.push({
					"OptName" : textName,
					"idOpt" : hiddenId
				});
			}
		
		if (queryType == "insert") {
		if (objOpt.Optli.length == 0) {
			alert("You Can Not Save Empty Field");
			return false;
		}
	}
	objOpt = JSON.stringify(objOpt);
	}
			var inputs = [];
			inputs.push('action=InsertEmrQue');
			inputs.push('queryType=' + queryType);
			inputs.push('txtQueID=' + encodeURIComponent(txtQueID));
			inputs.push('txtQue=' + encodeURIComponent(txtQue));
			inputs.push('txtQueType=' + encodeURIComponent(txtQueType));
			inputs.push('txtTemplateType=' + encodeURIComponent(txtTemplateType));
			inputs.push('objOpt=' + objOpt);
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					if (updateFrom == "admin") {
						alert(r);
						location.reload();
					}
				}
			});
}

var defaultViewEMRQueTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Question</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Question Type</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Template Type</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.Quelist as li}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-2-1 ' style='height: 21.5px;'>{$T.li.Que}</td>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{$T.li.QueType}</td>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{$T.li.tempTypeNM}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onClick='editEMRQueList({$T.li.idQue})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' onClick='deleteEMRQueList({$T.li.idQue})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultEMRQueListView(callFrom,type){

	var byName = "";
	if(type == "search"){
	byName = ($("#byName").val()).trim();
	if(byName == "" || byName == undefined ){
		alert("Please Search By Question!");
		return false;
	}
	}
	var inputs = [];
	inputs.push('action=FetchEMRQueList');
	inputs.push('callFrom=' + callFrom);
	inputs.push('byName=' + byName);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#objEMRQue").html(ajaxResponse);
					if (callFrom == "EMRQuestionMasterDetails" || callFrom == "QuestionMasterDetails") {
						$("#listEMRQueTemp").setTemplate(defaultViewEMRQueTemp);
					    $("#listEMRQueTemp").processTemplate(pobj1);
					}
					count=1;
					}
			});
}

var updateEMRQueHeaderTemp = '<h3>Edit Onco EMR Question</h3>';

var updateEMRQueButtonTemp = '<button class="btn btn-xs btn-success"  data-toggle="tooltip" data-placement="left" title="Save EMR Question" onclick=InsertEmrQue("update","admin") > <i class="fa fa-save"></i></button>';


function editEMRQueList(QueID){

	$("#idRadio").html("");
	$("#idCheckbox").html("");
	$("#idText").html("");
	ajaxResponse = $("#objEMRQue").html();
	var myArray = JSON.parse(ajaxResponse);
	var myObj ;
	for ( var i = 0; i < myArray.Quelist.length; i++) {
		if (myArray.Quelist[i].idQue == QueID) {
			myObj = myArray.Quelist[i];
			break;
		}
	}
	var sample;
	$("#savebtn").setTemplate(updateEMRQueButtonTemp);
	$("#savebtn").processTemplate(sample);

	var sample1;
	$("#headerTag").setTemplate(updateEMRQueHeaderTemp);
	$("#headerTag").processTemplate(sample1);
	
	$("#txtQueID").val(QueID);
	$("#txtTemplateType").val(myObj.tempType);
	$("#txtQue").val(myObj.Que);
	$("#txtQueType").val(myObj.QueType);
	
	var cnt = myObj.Optli.length;
	var type = myObj.QueType;
	if(type == "radio"){
		var templater = $("#idRadio").html();
		var dynaCount = 0;
		for( var i = 0; i < cnt; i++){
			//dynaCount = $("#dynaCountt").val();
			
			var defaultRadioDynaTemp1 = "";
			if(i == 0){
			dynaCount++ ;
			defaultRadioDynaTemp1 = '<div id="idRadioDiv">'
				+ ' <label class="TextFont">Radio Lable:</label>'
				+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" value="'+myObj.Optli[i].OptName+'" id="txtRadio'
				+ dynaCount
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
				+ '<a onClick=addQueAnsField("radio")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[i].idOpt+'"></label></div>';
			}
			if(i > 0){
				dynaCount++ ;
				defaultRadioDynaTemp1 = defaultRadioDynaTemp1 + '<div id="idRadioDiv">'
				+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" value="'+myObj.Optli[i].OptName+'" id="txtRadio'
				+ dynaCount
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
				+ '<a onClick=delQueAnsField("radio")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[i].idOpt+'"></label></div>';
			}
			templater = templater + defaultRadioDynaTemp1;
			$("#idRadio").html(templater);
			$("#dynaCountt").val(dynaCount);
		}
		
	}else if(type == "checkbox"){
		var templater = $("#idCheckbox").html();
		var dynaCount = 0;
		for( var i = 0; i < cnt; i++){
			//dynaCount = $("#dynaCountt").val();
			var defaultCheckboxDynaTemp1 = "";
			if(i == 0){
			dynaCount++ ;
			defaultCheckboxDynaTemp1 = '<div id="idChkDiv">'
			+ '<label class="TextFont">Checkbox Lable:</label>' 
			+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" value="'+myObj.Optli[0].OptName+'" id="txtCheckbox'
			+ dynaCount
			+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
			+ '<a onClick=addQueAnsField("checkbox")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[0].idOpt+'"></label></div>';
			}
			if(i > 0){
			dynaCount++ ;
			defaultCheckboxDynaTemp1 ='<div id="idChkDiv">'
			+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" value="'+myObj.Optli[i].OptName+'" id="txtCheckbox'
			+ dynaCount
			+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
			+ '<a onClick=delQueAnsField("checkbox")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[i].idOpt+'"></label></div>';
			}
			templater = templater + defaultCheckboxDynaTemp1;
			$("#idCheckbox").html(templater);
			$("#dynaCountt").val(dynaCount);
	}
	}else{
		var templater = $("#idText").html();
		var dynaCount = 0;
		for( var i = 0; i < 1; i++){
			//dynaCount = $("#dynaCountt").val();
			var defaultTextDynaTemp1 = "";
			dynaCount++ ;
			defaultTextDynaTemp1 = '<div id="idTxtDiv">'
			+ '<label class="TextFont">Text:</label>' 
			+ '<input type="text" class="form-control input-SmallText" name="txtText" value="'+myObj.Optli[i].OptName+'" id="txtText">'
			+ '<label class="btn" class="form-control input-SmallText" id="dynaCount" value="'+ dynaCount +'">'
			+ '<input type="text" hidden="hidden" id="hiddenId" value="'+myObj.Optli[i].idOpt+'"></label></div>';
			templater = templater + defaultTextDynaTemp1;
			$("#idText").html(templater);
			$("#dynaCountt").val(dynaCount);
	}
	}
}

function deleteEMRQueList(QueID) {

	var r = confirm("Confirm To Delete EMR Question Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteEMRQueList');
		inputs.push('QueID=' + QueID);
		inputs.push();
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function fetchEMRTempalets(emrId){
	//var emrId = 1;
	//$("#emrQueBody").empty();
	var pId = $("#patientId").text();
	var  treatId= $("#tid").val();
	
	var inputs = [];
	inputs.push('action=FetchEMRTemplate');
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	inputs.push('emrId=' + emrId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#oncoEmrQueList").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');
					var result=JSON.parse(ajaxResponse);
					var divContent="";
					var textCount = 1;
						for(var i=0;i<result.Quelist.length;i++)
						{
							if (result.Quelist[i].Quelist.length>0) {
								
							divContent=divContent+"<div class='col-md-12-1' style='margin-top: 10px;'><div class='col-md-1-1'><h5>"+(i+1)+".</h5></div>"
								+ "<div class='col-md-11-1' id='divPi"+(i+1)+"'><h5>"+result.Quelist[i].Quelist[0].Que+"</h5></div></div><input type='hidden' id='QueId"+(i+1)+"' value='"+result.Quelist[i].Quelist[0].Que+"'>"
							
								if(result.Quelist[i].Quelist[0].QueType == "radio" || result.Quelist[i].Quelist[0].QueType == "checkbox"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divCb"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
										var a = 0;
									for ( var k = 0; k < result.Quelist[i].Optli.length; k++) {
											var itopts = result.Quelist[i].Optli[k].optid;
											for ( var j = 0; j < result.Quelist[i].Quelist.length; j++) {
											var idopt = result.Quelist[i].Quelist[j].idOpt;
											var parts = itopts+"".split(",");
										        var itopt = parts[a];
										        if(idopt == itopt){
										        	a++;
										        	if(result.Quelist[i].Quelist[0].QueType == "radio"){
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 50px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.Quelist[i].Quelist[j].idQue+"' checked='true' name='IdRadioAns"+result.Quelist[i].Quelist[j].idQue+"' id='IdRadioAns-"+result.Quelist[i].Optli[j].optid+"' style='margin-top: 10px;  border-top:1pt solid black;'  disabled='disabled' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"
										        	}
										        	else{
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 50px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.Quelist[i].Quelist[j].idQue+"' checked='true' name='IdCheckboxAns"+result.Quelist[i].Quelist[j].idQue+"' id='IdCheckboxAns-"+result.Quelist[i].Optli[j].optid+"' style='margin-top: 10px;' disabled='disabled' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"	
										        	}
											    }else{
													if(result.Quelist[i].Quelist[0].QueType == "radio"){
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 50px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.Quelist[i].Quelist[j].idQue+"' name='IdRadioAns"+result.Quelist[i].Quelist[j].idQue+"' id='IdRadioAns-"+result.Quelist[i].Optli[j].optid+"' style='margin-top: 10px;  border-top:1pt solid black;' disabled='disabled' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"
													}
													else{
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 50px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.Quelist[i].Quelist[j].idQue+"' name='IdCheckboxAns"+result.Quelist[i].Quelist[j].idQue+"' id='IdCheckboxAns-"+result.Quelist[i].Optli[j].optid+"' style='margin-top: 10px;' disabled='disabled' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"	
													}
										        	
												}
											}
										}
										for ( var j = 0; j < result.Quelist[i].Optli.length; j++) {
											if(result.Quelist[i].Quelist == 0){
												if(result.Quelist[i].Quelist[j].QueType == "radio"){
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 50px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.Quelist[i].Quelist[j].idQue+"' name='IdRadioAns"+result.Quelist[i].Quelist[j].idQue+"' id='IdRadioAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' disabled='disabled' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"
												}
												else{
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 50px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.Quelist[i].Quelist[j].idQue+"' name='IdCheckboxAns"+result.Quelist[i].Quelist[j].idQue+"' id='IdCheckboxAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"
												}
												
											}
										}
										
									divContent=divContent+ "</div></div>" 
								}
								else if(result.Quelist[i].Quelist[0].QueType == "text"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divT"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
									for(var l=0;l<result.Quelist[i].Quelist.length;l++){
										divContent=divContent+ "<textarea type='text' class='' name='IdTextAns"+result.Quelist[i].idEmr+"' id='' value='' style='margin-top: 10px; margin-left: 50px; height: 40px; width: 610px;margin-bottom: 05px;' disabled='disabled'>"+result.Quelist[i].txtAns+"</textarea></div></div>" 
									}
									if(result.Quelist[i].Quelist.length == 0){
										divContent=divContent+ "<textarea type='text' class='' name='IdTextAns"+result.Quelist[i].idEmr+"' id='' value='' style='margin-top: 10px; margin-left: 50px; height: 40px; width: 610px;margin-bottom: 05px;'>-</textarea></div></div>"
									}
									textCount++;
								}
							}
							$("#iOncoEmrTemplates").val(result.Quelist[0].tempType);
						}
						
					divContent=divContent+"<input type='hidden' id='emrId' value='"+emrId+"'>";
					var previousTemplate = $("#emrQueBody").html();
					divContent=divContent+previousTemplate;
					$("#emrQueBody").html(divContent);
				}
			});
}

function FetchEMRAssignedCompFind(emrId){
	//var emrId = 1;
	$("#emrQueBody").empty();
	
	var pId = $("#patientId").text(); 
	var treatId = $("#tid").val();
	if(pId == "" || pId == undefined){
		pId = $("#pid").val();
	}
	var inputs = [];
	inputs.push('action=FetchEMRAssignedCompFind');
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	inputs.push('emrId=' + emrId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#oncoEmrAssignCompFindList").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');
					var result=JSON.parse(ajaxResponse);
					var divContent="";
					fetchEMRTempalets(0);
					for(var i=0;i<result.Quelist.length;i++)
					{
						//if(result.Quelist[0].CmpLi[i].type == "complaint"){
							if(result.Quelist[0].CmpLi.length>0){
								divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>Complaints & Clinical Findings :";
								+ "<div class='col-md-12-1' id='divC"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>";
								divContent=divContent+ "<textarea type='text' class='textComplaint"+result.Quelist[0].CmpLi[i].idCC+"' style='margin-top: 10px; margin-left: 50px; height: 200px; width: 610px;margin-bottom: 05px;' disabled='disabled'>";
								for(var l=0;l<result.Quelist[0].CmpLi.length;l++){
									divContent=divContent+" "+result.Quelist[0].CmpLi[l].cmpName+"\n";
								}
								divContent=divContent+"</textarea></div></div>";
								
							}
						/*}else if(result.Quelist[0].CmpLi[i].type == "finding"){
							if(result.Quelist[0].CmpLi.length>0){
								divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>Clinical Findings :";
								+ "<div class='col-md-12-1' id='divC"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>";
								divContent=divContent+ "<textarea type='text' class='textComplaint"+result.Quelist[0].CmpLi[i].idCC+"' style='margin-top: 10px; margin-left: 50px; height: 200px; width: 610px;margin-bottom: 05px;' disabled='disabled'>";
								for(var l=0;l<result.Quelist[0].CmpLi.length;l++){
									divContent=divContent+" "+result.Quelist[0].CmpLi[l].cmpName+"\n";
								}
								divContent=divContent+"</textarea></div></div>";
								
							}
						}*/
					
					}
					divContent=divContent+"<input type='hidden' id='emrId' value='"+emrId+"'>";
					
					var previousTemplate = $("#emrQueBody").html();
					divContent=divContent+previousTemplate;
					$("#emrQueBody").html(divContent);
					
				}
			});
}

function emrQuePopUp(){
	$('#viewEMRQueModal').modal();
}

function setOncoEmrTemplates(type){
	var emrId = 0;
	if(type=="sub"){
		emrId = 1;
	}else if(type=="obj"){
		emrId = 2;
	}
	$("#subobjType").val(type);
	var tempId = $("#iOncoEmrTemplates").val();
	var selDocSpec = $("#selDocSpec").val();
	var iBodyPart = $("#iBodyPart").val();
	var returnType = $("#pageName").val();
	var pId = $("#patientId").text(); 
	var treatId = $("#tid").val();
	if(iBodyPart==""){
		iBodyPart=0;
	}
	var inputs = [];
	inputs.push('action=FetchTemplateData');
	inputs.push('selDocSpec=' + selDocSpec);
	inputs.push('iBodyPart=' + iBodyPart);
	inputs.push('tempId=' + tempId);
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	inputs.push('emrId=' + emrId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#oncoEmrQueList").html(ajaxResponse);
					$("#type").val(type);
					var pobj1 = eval('(' + ajaxResponse + ')');
					var result=JSON.parse(ajaxResponse);
					var divContent="";
					var textCount = 1;
						for(var i=0;i<result.Quelist.length;i++)
						{
							divContent=divContent+"<div class='col-md-12-1' style='margin-top: 10px;'><div class='col-md-1-1'><h5>"+(i+1)+".</h5></div>"
							+ "<div class='col-md-11-1' id='divPi"+(i+1)+"'><h5>"+result.Quelist[i].Que+"</h5></div></div><input type='hidden' id='QueId"+(i+1)+"' value='"+result.Quelist[i].Que+"'>"
							if (result.Quelist[i].Optli.length>0) {
								if(result.Quelist[i].QueType == "radio" || result.Quelist[i].QueType == "checkbox"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divCb"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
										var a = 0;
										for ( var k = 0; k < result.Quelist[i].Emrli.length; k++) {
											var itopts = result.Quelist[i].Emrli[k].optid;
										for ( var j = 0; j < result.Quelist[i].Optli.length; j++) {
											var idopt = result.Quelist[i].Optli[j].idOpt;
											var parts = itopts+"".split(",");
										        var itopt = parts[a];
										        if(idopt == itopt){
										        	a++;
										        	if(result.Quelist[i].QueType == "radio"){
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.Quelist[i].idQue+"' checked='true' name='IdRadioAns"+result.Quelist[i].idQue+"' id='IdRadioAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"
										        	}
										        	else{
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.Quelist[i].idQue+"' checked='true' name='IdCheckboxAns"+result.Quelist[i].idQue+"' id='IdCheckboxAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"	
										        	}
											    	
												}else{
													if(result.Quelist[i].QueType == "radio"){
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.Quelist[i].idQue+"' name='IdRadioAns"+result.Quelist[i].idQue+"' id='IdRadioAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' >&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;"
													}
													else{
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.Quelist[i].idQue+"' name='IdCheckboxAns"+result.Quelist[i].idQue+"' id='IdCheckboxAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;";	
													}
										        	
												}
											}
										}
										for ( var j = 0; j < result.Quelist[i].Optli.length; j++) {
											if(result.Quelist[i].Emrli== 0){
												if(result.Quelist[i].QueType == "radio"){
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.Quelist[i].idQue+"' name='IdRadioAns"+result.Quelist[i].idQue+"' id='IdRadioAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' >&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;";
												}
												else{
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.Quelist[i].idQue+"' name='IdCheckboxAns"+result.Quelist[i].idQue+"' id='IdCheckboxAns-"+result.Quelist[i].Optli[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.Quelist[i].Optli[j].OptName+"</input>&nbsp;&nbsp;";
												}
												
											}
										}
										
									divContent=divContent+ "</div></div>"; 
								}
								else if(result.Quelist[i].QueType == "text"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divT"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>";
									for(var l=0;l<result.Quelist[i].Emrli.length;l++){
										divContent=divContent+ "<textarea type='text' class='textAnswer "+result.Quelist[i].idQue+"' name='IdTextAns"+result.Quelist[i].idQue+"' id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width: 650px;'>"+result.Quelist[i].Emrli[l].txtAns+"</textarea><input type='hidden' id ='ques_id"+textCount+"' val="+result.Quelist[i].idQue+" /></div></div>"; 
									}
									if(result.Quelist[i].Emrli.length == 0){
										divContent=divContent+ "<textarea type='text' class='textAnswer "+result.Quelist[i].idQue+"' name='IdTextAns"+result.Quelist[i].idQue+"' id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width: 650px;'>-</textarea><input type='hidden' id='ques_id"+textCount+"' val="+result.Quelist[i].idQue+" /></div></div>";
									}
									textCount++;
								}
							}
						}
					
					divContent=divContent+"<input type='hidden' id='emrId' value='"+tempId+"'><input type='hidden' id='type' value='"+type+"'>";
					$("#emrQuestionBody").html(divContent);
					emrQuePopUp();
				}
			});
}

function saveEmrQueAns(){

	var pId = $("#patientId").text(); 
	var treatId = $("#tid").val();
	var type = $("#subobjType").val();
	var emrId = "";
	if(type == "sub"){
		emrId = 1;	
	}else if(type == "obj"){
		emrId = 2;
	}
	var optionChecked = [];
    $('.radioAnswer:checked').map(function(){
    	optionChecked.push((this.id).split("-")[1]+"@"+$(this).attr('class').split(" ")[1]);
    });
    var checkAnswer = [];
    $('.checkAnswer:checked').map(function(){
    	checkAnswer.push((this.id).split("-")[1]+"@"+$(this).attr('class').split(" ")[1]);
    });
    
    var textAnswerLength=$('.textAnswer').length+1;
    var textAnswer=[];
    var questionId = 0;
    for(var i=1;i<textAnswerLength;i++){
    	if(type == "sub"){
    		questionId=$('#IdTextAns-'+i).attr('class').split(" ")[1];
    	}else{
    		questionId=$('#IdTextAns-'+i).attr('class').split(" ")[1];
    		//questionId = $("#ques_id"+i).val();
    	}
    	var text=$('#IdTextAns-'+i).val();
        if(text!=null && text!="" && text!="-"){
            textAnswer.push(questionId+"@"+text+"~");
        }
    }
    
    var inputs = [];
    inputs.push('treatId=' + treatId);
    inputs.push('emrId=' + emrId);
    inputs.push('pId=' + pId);
    inputs.push('optionChecked=' + optionChecked);
    inputs.push('checkAnswer=' + checkAnswer);
    inputs.push('textAnswer=' + encodeURIComponent(textAnswer));
    inputs.push('action=saveEmrQueAns');
    var str = inputs.join('&');
        jQuery.ajax({
            async : true,
            type : "POST",
            data :  str + "&reqType=AJAX",
            url : "AdminServlet",
            timeout : 1000 * 60 * 5,
            catche : false,
            error : function() {
            },
            success : function(r) {
            	alert(r);
            	$('#viewEMRQueModal').modal('hide');
            //	location.reload();
            	//fetchEMRTempalets(emrId);
            	FetchEMRAssignedCompFind(0);
            	
            }
        });
}
//question master end

function addChemoToAssign(){
	$('#viewChemotherapyModal').modal('hide');
	var myObj1;
	var chemoId = $("#chemId").val();
	var ajaxResponse = $("#chemotherapyDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.chemoLi.length; i++) {
		if (myArray.chemoLi[i].chemoId == chemoId) {
			myObj1 = myArray.chemoLi[i];
			break;
		}
	}
	if (chemoId != "0") {
		$("#chemId").val(myObj1.chemoId);
		$("#iChemotherapyName").val(myObj1.chemoNM);$("#iIndication").val(myObj1.ind);
		$("#iWeight").val(myObj1.wgt);$("#iHeight").val(myObj1.hgt);
		$("#iBSA").val(myObj1.bsa);$("#iBloodOrders").val(myObj1.bo);
		$("#iAllergies").val(myObj1.al);$("#iHistory").val(myObj1.hist);
		$("#iFrequency").val(myObj1.frq);$("#iNumberOfCycles").val(myObj1.cy);
		$("#iDose").val(myObj1.dose);$("#iInvestigation").val(myObj1.inv);
		$("#iDoseModification").val(myObj1.dm);$("#iSideEffect").val(myObj1.se);
		$("#iDrugOrder").val(myObj1.dor);$("#iPostChemoDrugOrder").val(myObj1.pcdo);
		$("#iPreMedications").val(myObj1.pd);$("#iPostMedications").val(myObj1.pm);
		$("#iPostChemoAdvice").val(myObj1.pca);
		$("#queryType1").val("insert");
	}

}

function assignFindings(){
	var pId = $("#patientId").text();
	var treatId = $("#tid").val();
	var inputs = [];
	inputs.push('action=FetchAssignedFindings');
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					var result=JSON.parse(ajaxResponse);
					var divContent="";
					var countf = 1;
						for(var i=0;i<result.Quelist[0].CmpLi.length;i++)
						{	
							if(result.Quelist[0].CmpLi[i].type == "finding"){
							divContent = "<tr>"
								+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"+countf+".</div></td>"
								+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='fndNM"+result.Quelist[0].CmpLi[i].idC+"'><input id='assignFndVal_"+result.Quelist[0].CmpLi[i].idCC+"' type='text' style='width: 100%;' value='"+result.Quelist[0].CmpLi[i].cmpName+"' /></td>"
								+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
								+ "<input type='checkbox' id='assignFndId' value='"+result.Quelist[0].CmpLi[i].idCC+"' ></td>"
								+ "<input type='hidden' id='FndId_"+(result.Quelist[0].CmpLi[i].idCC)+"' value='"+result.Quelist[0].CmpLi[i].idCC+"'></tr>";
							$('#assignFindingBody').append(divContent);			
							countf++;
							}
						}	
						$('input:checkbox[id=assignFndId]').attr("checked", true);
				}
			});
}

function assignComplaints(){
	var pId = $("#patientId").text();
	var treatId = $("#tid").val();
	
	var inputs = [];
	inputs.push('action=FetchAssignedFindings');
	inputs.push('pId=' + pId);
	inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					var result=JSON.parse(ajaxResponse);
					var divContent="";
					var countc = 1;
						for(var i=0;i<result.Quelist[0].CmpLi.length;i++)
						{	
							if(result.Quelist[0].CmpLi[i].type == "complaint"){
							divContent = "<tr>"
								+ "<td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>"+countc+".</div></td>"
								+ "<td class='col-md-5-1' style='height: 21.5px;' align = 'left' id='cmpNM"+result.Quelist[0].CmpLi[i].idC+"'><input id='assignCmpVal_"+result.Quelist[0].CmpLi[i].idCC+"' type='text' onClick='setIdForCompFind()' style='width: 100%;' value='"+result.Quelist[0].CmpLi[i].cmpName+"' /></td>"
								+ "<td class='col-md-1-1' style='height: 21.5px;' align = 'center' >"
								+ "<input type='checkbox' id='assignCmpId' value='"+result.Quelist[0].CmpLi[i].idCC+"' ></td>"
								+ "<input type='hidden' id='CmpId_"+(result.Quelist[0].CmpLi[i].idCC)+"' value='"+result.Quelist[0].CmpLi[i].idCC+"'></tr>";
							$('#assignComplaintBody').append(divContent);			
							countc++;
							}
						}	
						if(result.Quelist[0].CmpLi.length > 0){
							$("#queryTypeForComplaintFinding").val(0);
						}else{
							$("#queryTypeForComplaintFinding").val(1);
						}
						$('input:checkbox[id=assignCmpId]').attr("checked", true);
				}
			});
}
