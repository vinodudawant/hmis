
function fetchAllUnits()
{
	$.ajax({
		async : false,
		url : 'ehat/unit/fetchUnitList',
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Unit-</option>';
			
			for(var i=0; i<r.lstUnit.length; i++)
				htm += '<option value="'+r.lstUnit[i].unitId+'">'+r.lstUnit[i].unitName+"</option>";
			
			$('#unitList').html(htm)
		}
	
	});
}

function fetchAllCustomerTypes()
{
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getalltype',
		type : 'GET',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Type-</option>';
			
			for(var i=0; i<r.tmCmLookupDetLookupList.length; i++)
				htm += '<option value="'+r.tmCmLookupDetLookupList[i].lookup_det_id+'">'+r.tmCmLookupDetLookupList[i].lookup_det_desc_rg+"</option>";
			
			$('#lookupDetIdLay').html(htm)
		}
	
	});
}


function fetchAllStates()
{
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getAllState',
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select State-</option>';
			
			for(var i=0; i<r.stateList.length; i++)
				htm += '<option value="'+r.stateList[i].state_id+'">'+r.stateList[i].state_name+"</option>";
			
			$('#stateFromAddress').html(htm)
		}
	
	});
}

function fetchAllDistrict()
{
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getAllDistrict',
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select District-</option>';
			
			for(var i=0; i<r.districtList.length; i++)
				htm += '<option value="'+r.districtList[i].district_id+'">'+r.districtList[i].district_name+"</option>";
			
			$('#districtFromAddress').html(htm)
		}
	
	});
}

function fetchAllTaluka()
{
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getAllTaluka',
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Taluka-</option>';
			
			for(var i=0; i<r.talukaList.length; i++)
				htm += '<option value="'+r.talukaList[i].taluka_id+'">'+r.talukaList[i].taluka_name+"</option>";
			
			$('#talukaFromAddress').html(htm)
		}
	
	});
}

function fetchAllCity()
{
	$.ajax({
		async : false,
		url : 'ehat/businessCustMaster/getAllTown',
		type : 'POST',
		error() {
			alert('something went wrong....')
		},
		success(r) {
			var htm = '<option value="0">-Select Town-</option>';
			
			for(var i=0; i<r.cityList.length; i++)
				htm += '<option value="'+r.cityList[i].city_id+'">'+r.cityList[i].city_name+"</option>";
			
			$('#townId').html(htm)
		}
	
	});
}

// ====================================
// added from DISHA
// ====================================

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 1-Nov-2019
 * @codeFor : saveTermAndconditionMaster
 ******************************************************************************/

var labId;

function getAllTypeMater() {
	var type=2;
	
	var inputs = [];
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllType",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setLookupDesc(r);
		}
	});
}
			
function setLookupDesc(r){
	var dropList = "<option value='0'>-select-</option>";	
	var defaValue = "";
	var masterId = $("#masterIdd").val();
	for(var i = 0; i < r.tmCmLookupDetLookupList.length; i++) {
		var kitLookup = r.tmCmLookupDetLookupList[i].lookupDetId+"-"+r.tmCmLookupDetLookupList[i].lookupDetDescEn;
		
		if(r.tmCmLookupDetLookupList[i].lookupDetId == masterId && r.tmCmLookupDetLookupList[i].lookupDetDescEn == masterId){
			defaValue = kitLookup;
		}
			
		dropList = dropList + "<option value=" + kitLookup+" data-name="+kitLookup+">" +r.tmCmLookupDetLookupList[i].lookupDetDescEn+"</option>";
	}
	$("#labType").html(dropList);
	$("#labType").select2();	
}	

function saveTermAndconditionMaster() {

	var termConditionId = $("#termConditionId").val();
	var termconditionName = $("#termconditionName").val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	if (termconditionName == "" || termconditionName == null) {
		alert("please enter Term And Condition");
		$("#termconditionName").focus();
		return false;

	}

	var inputs = [];

	inputs.push('termConditionId=' + termConditionId);
	inputs.push('termconditionName=' + termconditionName);
	inputs.push('headingName=' + headingName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/saveTermAndconditionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
			} else if (r == 3) {
				alertify.error("Heading  is Already Present");
			} else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetTermAndconditionMaster();
			getAllInventoryTermAndCondition();
		}
	});
}

function getAllInventoryTermAndCondition() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryTermAndCondition",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTermAndConditionDocTemp(r, "All");
		}
	});
}

function setTermAndConditionDocTemp(r, callFrom) {
	var htm = "";
	var index = 1;
	if (callFrom == "All") {
		for ( var i = 0; i < r.lsttermcondition.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lsttermcondition[i].termConditionId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.lsttermcondition[i].headingName
					+ '</td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster" onclick=editTermAndConditionMasterDoc('
					+ r.lsttermcondition[i].termConditionId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTermAndConditionMasterDoc('
					+ r.lsttermcondition[i].termConditionId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (callFrom === "search") {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.termConditionId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.headingName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster" onclick=editTermAndConditionMasterDoc('
				+ r.termConditionId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTermAndConditionMasterDoc('
				+ r.termConditionId
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		index++;

	}

	$("#termConditionDetails").html(htm);
}

function editTermAndConditionMasterDoc(termconditionId) {
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			$("#termConditionId").val(myOBJECT.termConditionId);
			$("#termconditionName").val(myOBJECT.termconditionName);
			$("#headingName").val(myOBJECT.headingName);
			toggleEntryDiv('divForEdit');
		}
	});
}

function deleteTermAndConditionMasterDoc(termConditionId) {
	var r = confirm("Are You Sure You Want To Unit Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryM/deleteTermAndConditionMasterDoc",
			data : {
				"termConditionId" : termConditionId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				resetTermAndconditionMaster();
			}
		});
	}
}

function resetTermAndconditionMaster() {
	$("#termConditionId").val('0');
	$("#termconditionName").val("");
	$("#headingName").val("");
	$("#termconditionName").focus();
	getAllInventoryTermAndCondition();
	// toggleEntryDiv('divForEntry');
}

function inventoryTermConditionAutoSuggestion(inputID) {
	var resultData = [];
	var headingName = $("#" + inputID).val();

	if (headingName == "" || headingName == null || headingName == "null"
			|| headingName == undefined) {

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		getAllInventoryTermAndCondition();
		return false;
	}

	var inputs = [];
	inputs.push('headingName=' + headingName);
	// inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/inventoryTermConditionAutoSuggestion",
		cache : false,
		success : function(response) {
			if (response.lsttermcondition.length == 0) {
				alertify.error("Data Not Found...!!!");
			}
			var template = "";
			for ( var j = 0; j < response.lsttermcondition.length; j++) {
				var arrValue = response.lsttermcondition[j].termConditionId
						+ "-" + response.lsttermcondition[j].headingName;
				var idValue = response.lsttermcondition[j].termConditionId;
				var headingName = response.lsttermcondition[j].headingName;
				resultData.push({
					ID : idValue,
					Name : headingName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var termConditionId = res[0];
		var termconditionName = res[1];
		getTermConditionMasterByTermId(termConditionId);
		$("input#" + inputID).val(termconditionName);
	}
}

function getTermConditionMasterByTermId(termconditionId) {
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTermAndConditionDocTemp(r, "search");

		}

	});

}

function getTermConditionMasterByTermId1() {
	var termconditionId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(termconditionId)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getTermConditionMasterByTermId(termconditionId);
}

function resetCompanyMaster() {
	$("#companyId").val('0');
	$("#companyName").val("");
	$("#shortName").val("");

}

function getDistrictMasterById() {
	var docId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(docId)) {
		alert("Please Enter Number Only!");
		$("#stateId").focus();
		return false;
	}
	getDocNumberMasterBydistrictId(docId);
}

function getAllHSNList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryItemMaster/loadHSNList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var response = r;
			$.each(response, function() {
				$('#hsnNameId').append(
						'<option value="' + this.hsnName + '">' + this.hsnName
								+ '</option>');
			});
		}
	});
}

function addPartyName() {
	var partyName = $("#partyNameId").val();
	if (partyName == '') {
		alert("Please Party Name");
		return false;
	}
	var add = partyName;
	// var partyid = pid;

	var flag = 1;
	$('#lstBox2').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Tax Is Present In List");
			flag = 0;
		}
	});
	if (flag == 1) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(partyName);
		$("#lstBox2").append(o);
		$("#partyNameId").val("");
	}
}

function savePartyMaster() {
	var inhouseLabId=0; 
	var businessMasterId = $("#partyMasterId").val();
	var businessMasterName = $("#labName").val();
	var businessMasterCode =$("#labCode").val()
	var businessRegistrationNo=$("#registrationNo").val();
	var businessMasterStatus = $("#masterStatus option:selected").val();
	var type = $("#type").val();
	var lookupDetIdLay=$("#lookupDetIdLay").val();
	var parentBalanceUtilization='N';
	//var parentId=$("#unitList").val();
	var parentId=0;
	
	var businessAvg_Patient_Footfall_Per_Day = $("#Avg_Patient_Footfall_Per_Day").val();
	var businessAvg_Outs_No_Per_Day = $("#Avg_Outs_No_Per_Day").val();
	var unitList = $("#unitList").val();
	
	//added by Rohit on 16-02-2022
	var collectionCentreId = 0;
	
	var onBoardDate = $("#onBoardDate").val();
	
	if(onBoardDate =="" || onBoardDate==null){
		alert("Please select On Board Date");
		return false;
	}
	
	if (lookupDetIdLay ==0){
		alert("Please Select Type...!!!");
		return false;	
	}

	if (businessMasterName == "" || businessMasterName == null) {
		alert("Please Enter Lab Name!!");
		$("#labName").focus();
		return false;
	}
	
	if($.trim(businessMasterCode) == "")
	{
		alert("Please Enter Lab Code!!");
		$("#labCode").focus();
		return false;
	}
	
	if($.trim(businessRegistrationNo) == "")
	{
		alert("Please Enter Registration No!!");
		$("#registrationNo").focus();
		return false;
	}
	
	if($("#masterStatus").val() == "0")
	{
		alert("Please Select Status!!");
		$("#masterStatus").focus();
		return false;
	}
	// ==============================================================
	
	if(type==1){
		inhouseLabId=0;
	}else if(type==2){
		inhouseLabId=unitList;
	}
	//payment info
	var paymentFlag="NA";
	if ($("#prepaid").prop("checked")) {
		paymentFlag="prepaid";
		}
	if ($("#postpaid").prop("checked")) {
		paymentFlag="postpaid";
		}

	var advanceAmount = $("#advanceAmount").val();
	var prePaidDay = $("#prePaidDay").val();
	var reminderOnPrePaidDay = $("#reminderOnPrePaidDay").val();
	var blockOnPrePaidDay = $("#blockOnPrePaidDay").val();
	var reminderOnPercentagePrepaid = $("#reminderOnPercentagePrepaid").val();
	var blockOnpercentagePrepaid = $("#blockOnpercentagePrepaid").val();
	var preFromDate = $("#preFromDate").val();
	var preToDate = $("#preToDate").val();
	var preRemark = $("#preRemark").val();
	var clientPotentialPrepaid = $("#clientFieldPre").val();
	var creditAmount = $("#creditAmount").val();
	var preReason  =$("#prereason").val();
	
	var lookupValue = $("#lookupDetIdLay option:selected").text();
    
	if(advanceAmount==0||advanceAmount==null||advanceAmount=="null"||advanceAmount==undefined||advanceAmount=="undefined" ||advanceAmount==""){
		advanceAmount = 0;
	}
	
	if(prePaidDay==null||prePaidDay=="null"||prePaidDay==undefined||prePaidDay=="undefined" ||prePaidDay==""){
		prePaidDay = 0;
	}
	
	if(reminderOnPercentagePrepaid==null||reminderOnPercentagePrepaid=="null"||reminderOnPercentagePrepaid==undefined||reminderOnPercentagePrepaid=="undefined" ||reminderOnPercentagePrepaid==""){
	    reminderOnPercentagePrepaid = 0.0 ;
	}
	
	if(reminderOnPrePaidDay==null||reminderOnPrePaidDay=="null"||reminderOnPrePaidDay==undefined||reminderOnPrePaidDay=="undefined" ||reminderOnPrePaidDay==""){
		reminderOnPrePaidDay = 0;
	}
	
	if(blockOnPrePaidDay==null||blockOnPrePaidDay=="null"||blockOnPrePaidDay==undefined||blockOnPrePaidDay=="undefined"||blockOnPrePaidDay==""){
		blockOnPrePaidDay = 0;
	}
	
	if(blockOnpercentagePrepaid==null||blockOnpercentagePrepaid=="null"||blockOnpercentagePrepaid==undefined||blockOnpercentagePrepaid=="undefined" ||blockOnpercentagePrepaid==""){
		blockOnpercentagePrepaid = 0.0;
	}

	if(lookupValue !='IHL' && lookupValue !='B2B-B'){
	
	if ($("#prepaid").prop("checked")) {
		paymentFlag="prepaid";
		
		if(prePaidDay==0||prePaidDay==null||prePaidDay=="null"||prePaidDay==undefined||prePaidDay=="undefined" ||prePaidDay==""){
			alert("PrePaid Day  Should Be Greater Than Zero");
			$("#prePaidDay").focus();
			return false;
		}
		
		if(reminderOnPercentagePrepaid==0||reminderOnPercentagePrepaid==null||reminderOnPercentagePrepaid=="null"||reminderOnPercentagePrepaid==undefined||reminderOnPercentagePrepaid=="undefined" ||reminderOnPercentagePrepaid==""){
			alert("Reminder On Percentage Prepaid Day  Should Be Greater Than Zero");
			$("#reminderOnPercentagePrepaid").focus();
			return false;
		}
		
		if(reminderOnPrePaidDay==0||reminderOnPrePaidDay==null||reminderOnPrePaidDay=="null"||reminderOnPrePaidDay==undefined||reminderOnPrePaidDay=="undefined" ||reminderOnPrePaidDay==""){
			alert("Reminder On  Prepaid Day  Should Be Greater Than Zero");
			$("#reminderOnPrePaidDay").focus();
			return false;
		}
		
		if(blockOnPrePaidDay==0||blockOnPrePaidDay==null||blockOnPrePaidDay=="null"||blockOnPrePaidDay==undefined||blockOnPrePaidDay=="undefined"||blockOnPrePaidDay==""){
			alert("Block On  Prepaid Day  Should Be Greater Than Zero");
			$("#blockOnPrePaidDay").focus();
			return false;
		}
		
		if(blockOnpercentagePrepaid==0||blockOnpercentagePrepaid==null||blockOnpercentagePrepaid=="null"||blockOnpercentagePrepaid==undefined||blockOnpercentagePrepaid=="undefined" ||blockOnpercentagePrepaid==""){
			alert("Block On Percentage Prepaid Day  Should Be Greater Than Zero");
			$("#blockOnpercentagePrepaid").focus();
			return false;
		}
		
		if(blockOnpercentagePrepaid<reminderOnPercentagePrepaid){ //added by prayag for ticket_id BD_0118
			alert("reminder on percentage prepaid should be less than block on percentage");
			return false;
		}
		
	
	if(preFromDate!=""){
	var preFromDate = $("#preFromDate").val();
	}
	else{
		preFromDate='';
		alert("Please Enter Pre From Date");
		return false;
	}
	
	if(preToDate!=""){
		 $("#preToDate").val();
	}
	else{
		preToDate='';
		alert("Please Enter Pre To Date");
		return false;
	}
	
if(preToDate<=preFromDate){
	alert(" To Date should be greater than  From Date");
	     return false;
          }

		}
	}
	
	
	var credithAmount = $("#creditAmt").val();
	var creditDay = $("#creditDay").val();
	var remindernPercentagePostPaid = $("#remindernPercentagePostPaid").val();
	var blockOnpercentagePostPaid = $("#blockOnpercentagePostPaid").val();
	var reminderOnCreditDay = $("#reminderOnCreditDay").val();
	var blockOnCreditDay = $("#blockOnCreditDay").val();
	var postFromDate = $("#postFromDate").val();
	var postToDate = $("#postToDate").val();
	var postRemark = $("#postRemark").val();
	var clientPotentialPostpaid = $("#clientField").val();
	var postReason =$("#postreason").val();
	
	if(credithAmount==null||credithAmount=="null"||credithAmount==undefined||credithAmount=="undefined" ||credithAmount==""){
		credithAmount = 0;
		
	}
	
	if(creditDay==null||creditDay=="null"||creditDay==undefined||creditDay=="undefined" ||creditDay==""){
		creditDay=0;
	}
	
	if(remindernPercentagePostPaid==null||remindernPercentagePostPaid=="null"||remindernPercentagePostPaid==undefined||remindernPercentagePostPaid=="undefined" ||remindernPercentagePostPaid==""){
		remindernPercentagePostPaid = 0.0;
	}
	
	
	if(reminderOnCreditDay==null||reminderOnCreditDay=="null"||reminderOnCreditDay==undefined||reminderOnCreditDay=="undefined" ||reminderOnCreditDay==""){
		reminderOnCreditDay =0;
	}
	
	if(blockOnCreditDay==null||blockOnCreditDay=="null"||blockOnCreditDay==undefined||blockOnCreditDay=="undefined" ||blockOnCreditDay==""){
		blockOnCreditDay = 0;
	}
	
	
	if(blockOnpercentagePostPaid==null||blockOnpercentagePostPaid=="null"||blockOnpercentagePostPaid==undefined||blockOnpercentagePostPaid=="undefined" ||blockOnpercentagePostPaid==""){
		blockOnpercentagePostPaid =0.0;
	}
	
	if(lookupValue !='IHL'){
	if ($("#postpaid").prop("checked")) {
		paymentFlag="postpaid";
		
		if(creditDay==0||creditDay==null||creditDay=="null"||creditDay==undefined||creditDay=="undefined" ||creditDay==""){
			alert("Credit Day  Should Be Greater Than Zero");
			$("#creditDay").focus();
			return false;
		}
		
		if(remindernPercentagePostPaid==0||remindernPercentagePostPaid==null||remindernPercentagePostPaid=="null"||remindernPercentagePostPaid==undefined||remindernPercentagePostPaid=="undefined" ||remindernPercentagePostPaid==""){
			alert("Reminder On Percentage PostPaid  Should Be Greater Than Zero");
			$("#remindernPercentagePostPaid").focus();
			return false;
		}
		
		
		if(reminderOnCreditDay==0||reminderOnCreditDay==null||reminderOnCreditDay=="null"||reminderOnCreditDay==undefined||reminderOnCreditDay=="undefined" ||reminderOnCreditDay==""){
			alert("Reminder On Credit  Day  Should Be Greater Than Zero");
			$("#reminderOnCreditDay").focus();
			return false;
		}
		
		if(blockOnCreditDay==0||blockOnCreditDay==null||blockOnCreditDay=="null"||blockOnCreditDay==undefined||blockOnCreditDay=="undefined" ||blockOnCreditDay==""){
			alert("Block On Credit Day  Should Be Greater Than Zero");
			$("#blockOnCreditDay").focus();
			return false;
		}
		
		
		if(blockOnpercentagePostPaid==0||blockOnpercentagePostPaid==null||blockOnpercentagePostPaid=="null"||blockOnpercentagePostPaid==undefined||blockOnpercentagePostPaid=="undefined" ||blockOnpercentagePostPaid==""){
			alert("Block On Percentage   Should Be Greater Than Zero");
			$("#blockOnpercentagePostPaid").focus();
			return false;
		}
		if(blockOnpercentagePostPaid<remindernPercentagePostPaid){//BD_0117
			alert("Reminder on percentage postpaid should be less than block on percentage postpaid");
			return false;
		}
		
		if(blockOnCreditDay<reminderOnCreditDay){ //added by prayag for ticket_id BD_0117
			alert("Reminder on credit day should be less than block on credit day");
			return false;
		}
	
	if(postFromDate!=""){
			var postFromDate = $("#postFromDate").val();
	}else{
		postFromDate = '';
		alert("Please Enter From Date");
		return false;
	}
	
	if(postToDate!=""){
	
	var postToDate = $("#postToDate").val();

	}else{
		postToDate = "";
		alert("Please Enter To Date");
		return false;
	}
	
	if(postToDate<=postFromDate){
	alert(" To Date should be greater than  From Date");
	     return false;
          }

		}
	if (reminderOnPercentagePrepaid != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(reminderOnPercentagePrepaid)) {
			alert("Reminder On Percentage Prepaid rate should be of digits and a decimal point Only!");
			$("#reminderOnPercentagePrepaid").focus();
			return false;
		}
		//issue 0-100 AK_630
		if(reminderOnPercentagePrepaid == 0 || reminderOnPercentagePrepaid >100){
			alert("Reminder On Percentage Prepaid rate will always be greater than 0 and less than 100!");
			$("#reminderOnPercentagePrepaid").focus();
			return false;
		}
	}
	
	
	if (blockOnpercentagePrepaid != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(blockOnpercentagePrepaid)) {
			alert("Block On Percentage Prepaid rate should be of digits and a decimal point Only!");
			$("#blockOnpercentagePrepaid").focus();
			return false;
			
		}//issue 0-100
		if( blockOnpercentagePrepaid == 0 || blockOnpercentagePrepaid >100){
			alert("Block On Percentage Prepaid rate will always be greater than 0 and less than 100!");
			$("#blockOnpercentagePrepaid").focus();
			return false;
		}
	}
	
	if (remindernPercentagePostPaid != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(remindernPercentagePostPaid)) {
			alert("Reminder On Percentage Postpaid rate should be of digits and a decimal point Only!");
			$("#remindernPercentagePostPaid").focus();
			return false;
		}
		if(remindernPercentagePostPaid == 0 || remindernPercentagePostPaid >100){
			alert("Reminder On Percentage Postpaid rate will always be greater than 0 and less than 100!");
			$("#remindernPercentagePostPaid").focus();
			return false;
		}
	}
	
	
	if (blockOnpercentagePostPaid != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(blockOnpercentagePostPaid)) {
			alert("Block On Percentage Postpaid rate should be of digits and a decimal point Only!");
			$("#blockOnpercentagePostPaid").focus();
			return false;
		}//issue 0-100
		if(blockOnpercentagePostPaid == 0 || blockOnpercentagePostPaid >100){
			alert("Block On Percentage Postpaid rate will always be greater than 0 and less than 100!");
			$("#blockOnpercentagePostPaid").focus();
			return false;
		}
	}
	}
	if (businessMasterName == "" || businessMasterName == null) {
		alert("please enter name");
		$("#labName").focus();
		return false;
	}
	//stats info

	
	var labCode=document.getElementById("labCode").value;
	if(labCode==null || labCode==0)	
	
		{
		alert("Please Enter the LabCode");
		$("#labCode").focus();
		return false;
		}
	
	
	var registrationNo=document.getElementById("registrationNo").value;
	if(registrationNo==null || registrationNo==0)	
	
		{
		alert("Please Enter the RegistrationNo");
		$("#registrationNo").focus();
		return false;
		}
	
	if (registrationNo == "" || registrationNo == null) {
		registrationNo = "-";
	}

	var unitList = document.getElementById("unitList");
	/*if (unitList.options[unitList.selectedIndex].value == 0) {
		alert('please select InHouse Lab');
		$("#unitList").focus();
		return false;
	}*/
	
	var status = document.getElementById("masterStatus");
	if (status.options[status.selectedIndex].value == 0) {
		alert('please select status');
		$("#masterStatus").focus();
		return false;
	}

	var genralInfo = $('#GeneralInfoTable tbody tr.newAdded').length;
	if (genralInfo == "" || genralInfo == null || genralInfo == 0) {
		alert("Enter at least One Record In General Info tab ");
		return false;
	}

	var contactInfo = $('#ContactInfoTable tbody tr.newAdded').length;
	if (contactInfo == "" || contactInfo == null || contactInfo == 0) {
		alert("Enter at least One Record In Contact Info tab ");
		return false;
	}
	var addressInfo = $('#AddressInfoTable tbody tr.newAdded').length;
	if (addressInfo == "" || addressInfo == null || addressInfo == 0) {
		alert("Enter at least One Record In Address Info tab ");
		return false;
	}
	
	var unitId = $("#unitList").val();
	if (unitId == 0) {
		alert("Please Select Unit ");
		$("#unitList").focus();
		return false;

	}
	
	/*if(unitList==" "||unitList==null||unitList=="NULL"){
		alert("Please choose the Unit");
		return false;
	}
*/
	// this is for general info
	
	var businessMasterGeneralInfoDtoDetails = {
		businessMasterGeneralInfoDto : []
	};
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {

		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var generalInfoId = $("#generalInfoId" + i).html();
		var generalGstNOId = $("#generalGstNOId" + i).html();
		var generalMobileNoId = $("#generalMobileNoId" + i).html();
		var generalCompanyMailId = $("#generalCompanyMailId" + i).html();
		var generalLandLineNoId = $("#generalLandLineNoId" + i).html();
		var generalWebSiteId = $("#generalWebSiteId" + i).html();
		var generalPanNoId = $("#generalPanNoId" + i).html();

		setGeneralInfoList(businessMasterGeneralInfoDtoDetails, generalGstNOId,
				generalMobileNoId, generalCompanyMailId, generalLandLineNoId,
				generalWebSiteId, generalPanNoId, generalInfoId, userId, unitId);
	}

	businessMasterGeneralInfoDtoDetails = JSON
			.stringify(businessMasterGeneralInfoDtoDetails);
		
		

	// this is for contact details

	var businessMasterContactInfoDtoDetails = {
		businessMasterContactInfoDto : []
	};
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var contactInfoId = $("#contactInfoId" + i).html();
		var contactPersonId = $("#contactPersonId" + i).html();
		var contactDesignationId = $("#contactDesignationId" + i).html();
		var contatcAddressId = $("#contatcAddressId" + i).html();
		var contactGenderId = $("#contactGenderId" + i).html();
		var contactDobId = $("#contactDobId" + i).html();
		var contactPhoneOneId = $("#contactPhoneOneId" + i).html();
		var contactPhoneSecondId = $("#contactPhoneSecondId" + i).html();
		var contactMailId = $("#contactMailId" + i).html();

		setContactInfoList(businessMasterContactInfoDtoDetails, contactPersonId,
				contactDesignationId, contatcAddressId, contactGenderId,
				contactDobId, contactPhoneOneId, contactPhoneSecondId,
				contactMailId, contactInfoId, userId, unitId);
	}

	businessMasterContactInfoDtoDetails = JSON
			.stringify(businessMasterContactInfoDtoDetails);
	
	//this is for marketting info details
	var businessMasterMarketingInfoDetails = {
			businessMasterMarketingInfoDto : []
	};
		var rows = $('#marketingInfoTable tbody tr.newAdded').length;

		for ( var i = 1; i <= rows; i++) {
			var userId = $("#userId").val();
			//var unitId = $("#unitId").val();
			var unitId = $("#unitList").val();
			var marketingInfoId = $("#marketingInfoId" + i).html();
			var marketingPersonId = $("#marketingPersonId" + i).html();
			var marketingPersonTypeId = $("#marketingPersonTypeId" + i).html();
			var marketingPersonRemarkId = $("#marketingPersonRemarkId" + i).html();
			var fromDateId = $("#fromDateId" + i).html();
			var toDateId = $("#toDateId" + i).html();
			setMarketingInfoList(businessMasterMarketingInfoDetails, marketingPersonId,marketingPersonTypeId,
					marketingPersonRemarkId, fromDateId,toDateId, marketingInfoId, userId, unitId);
		}

		businessMasterMarketingInfoDetails = JSON
				.stringify(businessMasterMarketingInfoDetails);
	

	// this is for address details

	var businessMasterAddressInfoDtoDetails = {
		businessMasterAddressInfoDto : []
	};
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var addressInfoId = $("#addressInfoId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();
		var companyCountryId = $("#companyCountryId" + i).html();
		var companyStateId = $("#companyStateId" + i).html();
		var companyTalukaId = $("#companyTalukaId" + i).html();
		var companyCityId = $("#companyCityId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var countryNameId = $("#hiddenCountryNameId" + i).html();
		var stateNameId = $("#hiddenStateNameId" + i).html();
		var districtNameId = $("#hiddenDistrictNameId" + i).html();
		var districtNameIdValue = $("#companyDistrictId" + i).html();
		var talukaNameId = $("#hiddenTalukaNameId" + i).html();
		var cityNameId = $("#hiddenCityNameId" + i).html();
		
		
		if(companyStreetId==null||companyStreetId=="undefined"||companyStreetId==undefined||companyStreetId=="null"){
			companyStreetId=0;
		}
		if(companyPinId==null||companyPinId=="undefined"||companyPinId==undefined||companyPinId=="null"){
			companyPinId=0;
		}
		if(companyCountryId==null||companyCountryId=="undefined"||companyCountryId==undefined||companyCountryId=="null"){
			companyCountryId=0;
		}
		
		if(companyStateId==null||companyStateId=="undefined"||companyStateId==undefined||companyStateId=="null"){
			companyStateId=0;
		}
		
		if(companyTalukaId==null||companyTalukaId=="undefined"||companyTalukaId==undefined||companyTalukaId=="null"){
			companyTalukaId=0;
		}
		
		if(companyCityId==null||companyCityId=="undefined"||companyCityId==undefined||companyCityId=="null"){
			companyCityId=0;
		}
		
		if(companyAddressId==null||companyAddressId=="undefined"||companyAddressId==undefined||companyAddressId=="null"){
			companyAddressId=0;
		}
		
		if(companyAddressId==null||companyAddressId=="undefined"||companyAddressId==undefined||companyAddressId=="null"){
			companyAddressId=0;
		}
		
		if(countryNameId==null||countryNameId=="undefined"||countryNameId==undefined||countryNameId=="null"){
			countryNameId=0;
		}
		
		if(stateNameId==null||stateNameId=="undefined"||stateNameId==undefined||stateNameId=="null"){
			stateNameId=0;
		}
		
		if(districtNameId==null||districtNameId=="undefined"||districtNameId==undefined||districtNameId=="null"){
			districtNameId=0;
		}
		
		if(districtNameIdValue==null||districtNameIdValue=="undefined"||districtNameIdValue==undefined||districtNameIdValue=="null"){
			districtNameIdValue=0;
		}
		
		if(talukaNameId==null||talukaNameId=="undefined"||talukaNameId==undefined||talukaNameId=="null"){
			talukaNameId=0;
		}
		
		if(cityNameId==null||cityNameId=="undefined"||cityNameId==undefined||cityNameId=="null"){
			cityNameId=0;
		}

		setAddressInfoList(businessMasterAddressInfoDtoDetails, 
				companyCityId, companyStreetId, companyPinId, 
				companyCountryId, companyStateId,
				companyTalukaId, companyAddressId, 
				countryNameId, stateNameId, districtNameId, talukaNameId,
				cityNameId, addressInfoId, userId, unitId,districtNameIdValue);
	}

	businessMasterAddressInfoDtoDetails = JSON
			.stringify(businessMasterAddressInfoDtoDetails);
	

	// this is for payment details

	var busienessMasterPaymentInfoDtoDetails = {
			businessMasterPaymentInfoDto : []
	};
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var paymentInfoId = $("#paymentInfoId" + i).html();
		var bankNameId = $("#bankNameId" + i).html();
		var bankIFSCId = $("#bankIFSCId" + i).html();
		var accountHolderNameId = $("#accountHolderNameId" + i).html();
		var accountNumberId = $("#accountNumberId" + i).html();
		var accountCityId = $("#accountCityId" + i).html();
	    var micrCodeId = $("#micrCodeId" + i).html();
		var accountAddressId = $("#accountAddressId" + i).html();
		var paymentTermsId = $("#paymentTermsId" + i).html();
		var creditTermsId = $("#creditTermsId" + i).html();
        var upiId = $("#upiIdId" + i).html(); //added by prayag for DI470
        var branchNameId =$("#branchNameId" + i).html();
		setPaymentInfoList(busienessMasterPaymentInfoDtoDetails, paymentInfoId,
				bankNameId, bankIFSCId, accountHolderNameId, accountNumberId,
				accountCityId,micrCodeId, accountAddressId, paymentTermsId, creditTermsId,upiId,branchNameId,
				userId, unitId);
	}

	busienessMasterPaymentInfoDtoDetails = JSON
			.stringify(busienessMasterPaymentInfoDtoDetails);
	
	// this is for payment details

	var businessMasterTermsAndConditionInfoDtoDetails = {
		termsAndConditionInfoDto : []
	};
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var termsAndConditionNameId = $("#txtTermsAndConditionId" + i).html();
		var termsAndConditionInfoId = $("#termsAndCondId" + i).html();

		setTermsAndConditionInfoList(
				businessMasterTermsAndConditionInfoDtoDetails,
				termsAndConditionInfoId, 
				termsAndConditionNameId, userId, unitId);
	}

	businessMasterTermsAndConditionInfoDtoDetails = JSON
			.stringify(businessMasterTermsAndConditionInfoDtoDetails);
	
	var businessMasterContractInfoDtoDetails = {
		businessMasterContractInfo : []
	};
	var rows = $('#itemContractTableId tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {

		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var slaveId = $("#slaveId" + i).val();
		var contractTypeId = $("#contractId" + i).val();
		var contractType = $("#contractId" + i +" option:selected").text();
		var duration = $("#durationId" + i).val();
		var timePeriod = $("#timePeriodId" + i).val();
		var fromDate = $("#fromDateId" + i).val();
		var toDate = $("#toDateId" + i).val();
		
		setContractInfoList(businessMasterContractInfoDtoDetails, contractTypeId,
				contractType, duration, timePeriod,	fromDate, toDate, userId, unitId, slaveId);
	}

	businessMasterContractInfoDtoDetails = JSON.stringify(businessMasterContractInfoDtoDetails);
	
	var businessMasterUploadDocInfoDtoDetails = {
		businessMasterUploadDocInfo : []
	};
	var rows = $('#uploadDocumentTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {

		var userId = $("#userId").val();
		//var unitId = $("#unitId").val();
		var unitId = $("#unitList").val();
		var slaveId = $("#slaveId" + i).val();
		var docName = $("#tdDocumentName"+i).text();
		var docComment = $("#tdDocComment" + i).text();
		var fileName = $("#tdFileName" + i).text();
		
		setUploadDocInfoList(businessMasterUploadDocInfoDtoDetails, docName,
				docComment, fileName, userId, unitId, slaveId);
	}

	businessMasterUploadDocInfoDtoDetails = JSON.stringify(businessMasterUploadDocInfoDtoDetails);

	var inputs = [];
	var unitname = $("#unitList").find(':selected').text();
	var collectionCentreName = $("#lookupDetIdLay").find(':selected').text();
	inputs.push("id=" + businessMasterId);
	inputs.push("name=" + businessMasterName);
	inputs.push("code="+businessMasterCode);
	inputs.push("regNo=" + businessRegistrationNo);
	inputs.push("status=" + businessMasterStatus);
	inputs.push("paymentFlag=" + paymentFlag);
	inputs.push("advanceAmount=" + advanceAmount);
	inputs.push("prePaidDay=" + prePaidDay);
	inputs.push("creditDay=" + creditDay);
	inputs.push("credithAmount=" + credithAmount);
	inputs.push("prepaidCreditAmount=" + creditAmount);
	inputs.push("type="+type);
	inputs.push("Avg_Patient_Footfall_Per_Day="+businessAvg_Patient_Footfall_Per_Day);
	inputs.push("Avg_Outs_No_Per_Day="+businessAvg_Outs_No_Per_Day);
	inputs.push("reminderOnPercentagePrepaid=" + reminderOnPercentagePrepaid);
	inputs.push("blockOnpercentagePrepaid=" + blockOnpercentagePrepaid);
	inputs.push("preFromDate=" + preFromDate);
	inputs.push("preToDate=" + preToDate);
	inputs.push("preRemark=" + preRemark);
	inputs.push("reminderOnPercentagePostPaid=" + remindernPercentagePostPaid);
	inputs.push("blockOnpercentagePostPaid=" + blockOnpercentagePostPaid);
	inputs.push("reminderOnPrepaidDay=" + reminderOnPrePaidDay);
	inputs.push("blockOnPrepaidDay=" + blockOnPrePaidDay);
	inputs.push("reminderOnCreditDay=" + reminderOnCreditDay);
	inputs.push("blockOnCreditDay=" + blockOnCreditDay);
	inputs.push("postFromDate=" + postFromDate);
	inputs.push("postToDate=" + postToDate);
	inputs.push("postRemark=" + postRemark);
	inputs.push("inhouseLabId=" + inhouseLabId);
	inputs.push("unit=" +$("#unitList").val());
	inputs.push("unitName=" + unitname);
	inputs.push("clientPotentialPrepaid=" + clientPotentialPrepaid);
	inputs.push("clientPotentialPostpaid=" + clientPotentialPostpaid);
	//added by Rohit on 16-02-2022
	inputs.push("collectionCentreId="+collectionCentreId);
	inputs.push("collectionCentreName="+collectionCentreName);
	inputs.push("lookupDetIdLay="+lookupDetIdLay);
	inputs.push("parentId="+parentId);
	inputs.push("onBoardDate="+onBoardDate);
	inputs.push("preReason="+preReason);
	inputs.push("postReason="+postReason);
	inputs.push("parentBalanceUtilization="+parentBalanceUtilization);
	// this is for general info
	inputs.push("businessMasterGeneralInfoDtoList="
			+ encodeURIComponent(businessMasterGeneralInfoDtoDetails));
	// this is for contact Details
	inputs.push("businessMasterContactInfoDtoList="
			+ encodeURIComponent(businessMasterContactInfoDtoDetails));
	// this is for address info
	inputs.push("businessMasterAddressInfoDtoList="
			+ encodeURIComponent(businessMasterAddressInfoDtoDetails));
	// this is for payment info
	inputs.push("businessMasterPaymentInfoDtoList="
			+ encodeURIComponent(busienessMasterPaymentInfoDtoDetails));
	// this is for terms and Conditon info
	inputs.push("businessMasterTermsAndConditionInfoDtoList="
			+ encodeURIComponent(businessMasterTermsAndConditionInfoDtoDetails));
	// this is for Agreement info
	inputs.push("businessMasterContractInfoDtoList="
			+ encodeURIComponent(businessMasterContractInfoDtoDetails));
	// this is for upload docs info
	inputs.push("businessMasterUploadDocInfoDtoList="
			+ encodeURIComponent(businessMasterUploadDocInfoDtoDetails));
	//this is for marketing info details...
	inputs.push("businessMasterMarketingInfoDtoList="+encodeURIComponent(businessMasterMarketingInfoDetails));
	
	var str = inputs.join('&');
	
	  jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/businessCustMaster/saveBusinessCustMaster",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
				success : function(r) {
					response = r;
					if (response == 1) {
						alert("Record saved successfully..!");
						if(type==1){
						onCloseBtnRefrshPage();
						}else{
							onCloseBtnRefrshPage1();
						}
						setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else if (response == 2) {
						alert("Record Updated successfully..!");
						if(type==1){
							onCloseBtnRefrshPage();
							}else{
								onCloseBtnRefrshPage1();
							}
						//onCloseBtnRefrshPage();
						setTimeout(function() {
							window.location.reload();
						}, 1000);
					} else if (response == 3) {
						alertify
								.error("Business Customer Name Already Present In The System...!!!");
					} else {
						alertify.error("Oops something went wrong.....");
					}
					getAllBusinessMasterForPagination();
					getAllBusinessLabMaster();
					$("#txtPartySaveUpdate").val("0");
				}
			});

}

/************
* @author	: Vinod Udawant
* @date		: 17-Sept-2020
* @codeFor	: Set customer contract info list
 ************/
function setContractInfoList(businessMasterContractInfoDtoDetails, contractTypeId,
		contractType, duration, timePeriod,	fromDate, toDate, userId, unitId, slaveId) {
	
	businessMasterContractInfoDtoDetails.businessMasterContractInfo.push({
		id : slaveId,
		contractTypeId : contractTypeId,
		contractType : contractType,
		duration : duration,
		timePeriod : timePeriod,
		fromDate : fromDate,
		toDate : toDate,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId
	});
}
/************
* @author	: Vinod Udawant
* @date		: 17-Sept-2020
* @codeFor	: Set customer upload docs info list
 ************/
function setUploadDocInfoList(businessMasterUploadDocInfoDtoDetails, docName,
		docComment, fileName, userId, unitId, slaveId) {
	
	businessMasterUploadDocInfoDtoDetails.businessMasterUploadDocInfo.push({
		id : slaveId,
		docName : docName,
		docComment : docComment,
		fileName : fileName,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId
	});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : set Genearal Info List
 ******************************************************************************/
function setGeneralInfoList(businessMasterGeneralInfoDtoDetails, generalGstNOId,
		generalMobileNoId, generalCompanyMailId, generalLandLineNoId,
		generalWebSiteId, generalPanNoId, generalInfoId, userId, unitId) {
	businessMasterGeneralInfoDtoDetails.businessMasterGeneralInfoDto.push({
		id : generalInfoId,
		mobile : generalMobileNoId,
		landline : generalLandLineNoId,
		website : generalWebSiteId,
		pancardNo : generalPanNoId,
		gstTransactionNo : generalGstNOId,
		mail : generalCompanyMailId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId

	});
}
/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : set Contact Info List
 ******************************************************************************/
function setContactInfoList(businessMasterContactInfoDtoDetails, contactPersonId,
		contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
		contactPhoneOneId, contactPhoneSecondId, contactMailId, contactInfoId,
		userId, unitId) {
	businessMasterContactInfoDtoDetails.businessMasterContactInfoDto.push({
		id : contactInfoId,
		contactName : contactPersonId,
		contactDesignation : contactDesignationId,
		contactAddress : contatcAddressId,
		contactGender : contactGenderId,
		contactDob : contactDobId,
		contactPhoneNumber1 : contactPhoneOneId,
		contactPhoneNumber2 : contactPhoneSecondId,
		contactEmail : contactMailId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId
	});
}

/*******************************************************************************
 * @author : Prayag
 * @date : 20-June-2022
 * @codeFor : set Marketing Info List
 ******************************************************************************/
function setMarketingInfoList(businessMasterMarketingInfoDetails,marketingPersonId,marketingPersonTypeId,
		marketingPersonRemarkId, fromDateId,toDateId, marketingInfoId, userId, unitId) {
	businessMasterMarketingInfoDetails.businessMasterMarketingInfoDto.push({
		id : marketingInfoId,
		marketingPerson : marketingPersonId,
		marketingPersonType : marketingPersonTypeId,
		marketingRemark : marketingPersonRemarkId,
		fromDate : fromDateId,
		toDate : toDateId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId
	});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : set Address Info List
 ******************************************************************************/
function setAddressInfoList(businessMasterAddressInfoDtoDetails, 
		companyCityId, companyStreetId, companyPinId,
		companyCountryId, companyStateId, companyTalukaId,
		companyAddressId,  countryNameId, stateNameId,
		districtNameId, talukaNameId, cityNameId, addressInfoId, userId, unitId,districtNameIdValue) {

	businessMasterAddressInfoDtoDetails.businessMasterAddressInfoDto.push({
		id : addressInfoId,
		countryId : countryNameId,
		stateId : stateNameId,
		districtId : districtNameId,
		talukaId : talukaNameId,
		cityId : cityNameId,
		address : companyAddressId,
		street : companyStreetId,
		country : companyCountryId,
		state : companyStateId,
		districtName : districtNameIdValue,
		talukaName : companyTalukaId,
		city : companyCityId,
		pin : companyPinId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId
	});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : set Payment Info List
 ******************************************************************************/
function setPaymentInfoList(busienessMasterPaymentInfoDtoDetails, paymentInfoId,
		bankNameId, bankIFSCId, accountHolderNameId, accountNumberId,
		accountCityId,micrCodeId, accountAddressId, paymentTermsId, creditTermsId,upiId, branchNameId ,userId,
		unitId) {

	busienessMasterPaymentInfoDtoDetails.businessMasterPaymentInfoDto.push({
		id : paymentInfoId,
		bankName : bankNameId,
		bankIFSC : bankIFSCId,
		accountHolderName : accountHolderNameId,
		accountNumber : accountNumberId,
		accountCity : accountCityId,
		micrCode : micrCodeId,
		accountAddress : accountAddressId,
		paymentTerms : paymentTermsId,
		creditTerms : creditTermsId,
		upiId : upiId,
		branchName :branchNameId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId

	});
}

function setTermsAndConditionInfoList(
		businessMasterTermsAndConditionInfoDtoDetails, termsAndConditionInfoId,
		 termsAndConditionNameId, userId, unitId) {

	businessMasterTermsAndConditionInfoDtoDetails.termsAndConditionInfoDto.push({
		id : termsAndConditionInfoId,
		
		termconditionName : termsAndConditionNameId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId

	});
}

function resetInfoFields(tabType) {
	if (tabType === "generalInfo") {
		$('#generalFormId')[0].reset();
	} else if (tabType === "contactInfo") {
		$('#contactFormId')[0].reset();
	}else if (tabType === "marketingInfo") {
		$('#marketingPersonFormId')[0].reset();
	}
	else if (tabType === "addressInfo") {
		$('#addressFormId')[0].reset();
		$("#countryFromAddress").select2("val", 0);
		$("#stateFromAddress").select2("val", 0);
		$("#districtFromAddress").select2("val", 0);
		$("#talukaFromAddress").select2("val", 0);
		$("#cityFromAddress").select2("val", 0);
	} else if (tabType === "paymentInfo") {
		$('#paymentFormId')[0].reset();
	} else if (tabType === "TermsAndConditionInfo") {
		$('#termsAndConditionsTitle').select2('val', 0);
		$('#termsAndCondition').val('').empty();
	}
}
/**
 * 
 */
function resetAllField() {
	$("#partyMasterId").val(0);
	$('#partyMaterFormId')[0].reset();
	$('#generalFormId')[0].reset();
	$('#contactFormId')[0].reset();
	$('#marketingPersonFormId')[0].reset();
	$('#addressFormId')[0].reset();
	$('#paymentFormId')[0].reset();
	$("#dcfileUploadfrm")[0].reset();
	$("#TermsAndConditionInfoId")[0].reset();
	$("#contractFormId")[0].reset();
	$("#dcfileUploadfrm")[0].reset();
	$("#paymentPrepaidFormId")[0].reset();
	$("#statistisFormId")[0].reset();
	$("#PartyGeneralTableInfoList").empty();
	$("#PartyContactTableInfoList").empty();
	$("#PartyMarketingPersonInfoList").empty();
	$("#PartyAddressTableInfoList").empty();
	$("#itemContractTableBodyId").empty();
	$("#TermsAndConditionInfoTableList").empty();
	$("#itemContractTableBodyId").empty();
	$("#uploadedDocumentTBody").empty();
	$("#PartyPaymentInfoTableList").empty();
};

function getAllBusinessMaster() {
	var type=2;
	
	var inputs = [];
	inputs.push('type=' + type);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessMaster",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//setLookupDesc(r);
			businessMasterTemplate(r, "allBusinessMaster");
			businessMasterTemplate1(r, "allBusinessMaster");
			
			//setlabType();
			/*setTimeout(function() {
				userAccess();
			}, 100);*/
		}
	});
}

function businessMasterTemplate(response, callFrom) {
	var htm = "";
	//var index = 1;
	var active = $("#activePage").val();

	var newactiveIndex = 0;
	var activeIndex = 1;

	if(active == "" || active == 0 || active == undefined || active == "undefined")
	{
		active = 0;
	} else {
		active = parseInt(active - 1);
	}
	
	var radioValue = $("input[name='state']:checked").val();
	
	if (callFrom === "allBusinessMaster") {
		for ( var i = 0; i < response.businessMasterDto.length; i++) {
			if(active == 0)
			{
				activeIndex = (i+1);
			} else {
				
				var numberForm = parseInt(active + '' + (i+1));
				
				if(i == 9)
				{					
					activeIndex = parseInt(newactiveIndex + 1);
					
				} else {
					activeIndex = numberForm;
					
					if(i == 8)
					{
						newactiveIndex = activeIndex;
					}
				}
			}		
			
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ activeIndex
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].regNo
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].paymentFlag
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].unitName
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					activeIndex++;
				
				
		}
	} 
	$("#businessLabMasterList").html(htm);
}

function editBusinessMaster(businessMasterId) {
	
	var inputs = [];
	inputs.push('id=' + businessMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/editBusinessMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			$("#lookupDetIdLay").val(response.lookupDetIdLay).select2();
			$("#parentId").val(response.parentId).select2();
			var lookupDetIdLayforInHouseType = $("#lookupDetIdLay").val();
			var customerNameforInHouseType = response.customerTypeName;
			
			$("#type").val(response.type);
			$("#partyMasterId").val(response.id);
			$("#labName").val(response.name);
			$("#labCode").val(response.code);
			$("#registrationNo").val(response.regNo);
			$("#masterStatus").val(response.status);
			$("#unitList").val(response.unitId).select2();
			$("#masterType").val(response.type);
			$("#Avg_Patient_Footfall_Per_Day").val(response.avg_Patient_Footfall_Per_Day);
			$("#Avg_Outs_No_Per_Day").val(response.avg_Outs_No_Per_Day);
			//$("#creditAmount").val(response.prepaidCreditAmount);
			 precreaditAmount=response.prepaidCreditAmount;
			$("#creditAmount").val(precreaditAmount);
            $("#pbutilization").val(response.parentBalanceUtilization).select2();
      
			/*$("#smsOnPercentagePrepaid").val(response.smsOnPercentagePrepaid);
			$("#blockOnpercentagePrepaid").val(response.blockOnpercentagePrepaid);
			$("#smsOnPercentagePostPaid").val(response.smsOnPercentagePostPaid);
			$("#blockOnpercentagePostPaid").val(response.blockOnpercentagePostPaid);*/
			if(customerNameforInHouseType.includes("In House Lab")){
			$("#unitId").show();
			$("#unitList").val(response.unitId).select2();
			}
			$("#unitList").attr("disabled", "disabled");
			//$("#unitId").attr("disabled", "disabled");
			$("#unitList").val(response.unitId);
			//added by Rohit on 16-02-2022
			$("#collectionCenterList").val(response.collectionCentreId);
			var paymentFlag=response.paymentFlag;
			if(paymentFlag=="prepaid"){
				$('#prepaid').prop('checked', true);
				$('#postpaid').prop('disabled', true);
				$("#prepaidDetails").show();
				$("#postPaidDetaisls").hide();
				$("#reminderOnPercentagePrepaid").val(response.reminderOnPercentagePrepaid);
				$("#blockOnpercentagePrepaid").val(response.blockOnpercentagePrepaid);
				$("#reminderOnPrePaidDay").val(response.reminderOnPrepaidDay);
				$("#blockOnPrePaidDay").val(response.blockOnPrepaidDay);
			    $("#preFromDate").val(response.preFromDate);
				$("#preToDate").val(response.preToDate);
				$("#clientFieldPre").val(response.clientPotentialPrepaid);
                $("#prereason").val(response.preReason)
			}else{
				$('#postpaid').prop('checked', true);
				$('#prepaid').prop('disabled', true);
				$("#postPaidDetaisls").show();
				$("#prepaidDetails").hide();
				$("#remindernPercentagePostPaid").val(response.reminderOnPercentagePostPaid);
				$("#blockOnpercentagePostPaid").val(response.blockOnpercentagePostPaid);
				$("#reminderOnCreditDay").val(response.reminderOnCreditDay);
				$("#blockOnCreditDay").val(response.blockOnCreditDay);
				$("#postFromDate").val(response.postFromDate);
				$("#postToDate").val(response.postToDate);
				$("#clientField").val(response.clientPotentialPostpaid);
			    $("#postreason").val(response.postReason)
				
			}

	        advanceAmount =response.advanceAmount;
			$("#advanceAmount").val(advanceAmount);
			$("#prePaidDay").val(response.prePaidDay);
			credithAmount =response.credithAmount;
			$("#creditAmt").val(credithAmount);
			$("#creditDay").val(response.creditDay);
		    $("#onBoardDate").val(response.onBoardDate); //added by prayag
			setEditBusinessMasterSlaveInfo(response);
		}
	});
}

function checkCreditAmountUpdate(initialValue) {
    var currentCreditAmount = $("#creditAmt").val();
      credithAmount;

    var reasonTextBox = $("#postreasonDIV");
    var postReason =$("#postreason");
    if (currentCreditAmount !== credithAmount) {
        reasonTextBox.show();
        postReason.prop("required", true);

    } else {
        // Hide the new text box
        reasonTextBox.hide();
        postReason.prop("required", false);
    }
}

function checkPreCreditAmountUpdate(initialValues) {
    var currentPreCreditAmount = $("#creditAmount").val();
    var currentAdvancedAmount =$("#advanceAmount").val();
       precreaditAmount ;
     advanceAmount;
    var prereason = $("#prereasonDIV");
    var preReasontext =$("#prereason");
    if (currentPreCreditAmount !== precreaditAmount || currentAdvancedAmount !==advanceAmount ) {
        prereason.show();
        preReasontext.prop("required", true);

    } else {
        // Hide the new text box
        prereason.hide();
        preReasontext.prop("required", false);
    }
  
}


/**
 * 
 * @param response
 */
function setEditBusinessMasterSlaveInfo(response) {
	var length = 0;
	if (response.businessMasterGeneralInfoDto.length != 0
			&& response.businessMasterGeneralInfoDto != null
			&& response.businessMasterGeneralInfoDto != "") {

		length = response.businessMasterGeneralInfoDto.length;
		var htm = "";
		var count = 0;
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalGstNOId'
					+ count
					+ '">'
					+ response.businessMasterGeneralInfoDto[i].gstTransactionNo
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalMobileNoId'
					+ count
					+ '">'
					+ response.businessMasterGeneralInfoDto[i].mobile
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalCompanyMailId'
					+ count
					+ '">'
					+ response.businessMasterGeneralInfoDto[i].mail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalLandLineNoId'
					+ count
					+ '">'
					+ response.businessMasterGeneralInfoDto[i].landline
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalWebSiteId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterGeneralInfoDto[i].website
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalPanNoId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterGeneralInfoDto[i].pancardNo
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalInfoId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterGeneralInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterGeneralInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editGeneralInfoPartyMaster('
					+ count
					+ ',\'fromDB\')" '
					+ '><i class="fa fa-edit"></i></button></td>'

					+ '<td class="col-md-1 center"><button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteGeneralPartMaster'
					+ response.businessMasterGeneralInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.businessMasterGeneralInfoDto[i].id
					+ ',\'deleteGeneral\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyGeneralTableInfoList").html(htm);
	}

	if (response.businessMasterContactInfoDto.length != 0
			&& response.businessMasterContactInfoDto != null
			&& response.businessMasterContactInfoDto != "") {
		length = response.businessMasterContactInfoDto.length;
		var count = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPersonId'
					+ count
					+ '">'
					+ response.businessMasterContactInfoDto[i].contactName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDesignationId'
					+ count
					+ '">'
					+ response.businessMasterContactInfoDto[i].contactDesignation
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contatcAddressId'
					+ count
					+ '">'
					+ response.businessMasterContactInfoDto[i].contactAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactGenderId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].contactGender
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDobId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].contactDob
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneOneId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].contactPhoneNumber1
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].contactPhoneNumber2
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactMailId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].contactEmail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactInfoId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center" id="contactInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="conInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="conInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterContactInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteContactPartMaster'
					+ response.businessMasterContactInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.businessMasterContactInfoDto[i].id
					+ ',\'deleteContact\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyContactTableInfoList").html(htm);
	}
	//marketingInfo start
	if (response.businessMasterMarketingInfoDto.length != 0
			&& response.businessMasterMarketingInfoDto != null
			&& response.businessMasterMarketingInfoDto != "") {
		length = response.businessMasterMarketingInfoDto.length;
		var count = 0;
		var htm = ""; 
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="marketingPersonId'
					+ count
					+ '">'
					+ response.businessMasterMarketingInfoDto[i].marketingPerson
					+ '</td>'
					+ ' <td class="col-md-1 center" id="marketingPersonTypeId'
					+ count
					+ '">'
					+ response.businessMasterMarketingInfoDto[i].marketingPersonType
					+ '</td>'

					+ ' <td class="col-md-1 center" id="marketingPersonRemarkId'
					+ count
					+ '">'
					+ response.businessMasterMarketingInfoDto[i].marketingRemark
					+ '</td>'
					+ ' <td class="col-md-1 center" id="fromDateId'
					+ count
					+ '">'
					+ response.businessMasterMarketingInfoDto[i].fromDate
					+ '</td>'
					+ ' <td class="col-md-1 center" id="toDateId'
					+ count
					+ '" >'
					+ response.businessMasterMarketingInfoDto[i].toDate
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="marketingInfoId' //imp
					+ count
					+ '" style="display:none">'
					+ response.businessMasterMarketingInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editMarketingPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editMarketingInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center" id="marketingInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="markInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="markInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterMarketingInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteMarketingPartMaster'
					+ response.businessMasterMarketingInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.businessMasterMarketingInfoDto[i].id
					+ ',\'deleteMarketingPerson\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyMarketingPersonInfoList").html(htm);
	}
	//marketingInfo end
	
	if (response.businessMasterAddressInfoDto.length != 0
			&& response.businessMasterAddressInfoDto != null
			&& response.businessMasterAddressInfoDto != "") {
		length = response.businessMasterAddressInfoDto.length;
		var count = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					/*+ ' <td class="col-md-1 center" id="companyNameId'
					+ count
					+ '">'
					+ response.businessMasterAddressInfoDto[i].companyName
					+ '</td>'*/
					+ ' <td class="col-md-1 center" id="companyCountryId'
					+ count
					+ '">'
					+ response.businessMasterAddressInfoDto[i].country
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCityId'
					+ count
					+ '">'
					+ response.businessMasterAddressInfoDto[i].city
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressId'
					+ count
					+ '" ">'
					+ response.businessMasterAddressInfoDto[i].address
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressTypeId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].addressType
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStreetId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].street
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAreaId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].area
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyPinId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].pin
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStateId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].state
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyDistrictId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].districtName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyTalukaId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].talukaName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].countryId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenStateNameId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].stateId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].districtId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].talukaId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCityNameId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].cityId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId'
					+ count
					+ '" style="display:none">'
					+ response.businessMasterAddressInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
					+ response.businessMasterAddressInfoDto[i].id
					+ '"  onclick="deletePartyMasterSlave('
					+ response.businessMasterAddressInfoDto[i].id
					+ ',\'deleteAddress\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyAddressTableInfoList").html(htm);
	}
	if (response.businessMasterPaymentInfoDto.length != 0
			&& response.businessMasterPaymentInfoDto != null
			&& response.businessMasterPaymentInfoDto != "") {
		length = response.businessMasterPaymentInfoDto.length;
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountHolderNameId'
					+ id
					+ '">'
					+ response.businessMasterPaymentInfoDto[i].accountHolderName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountNumberId'
					+ id
					+ '">'
					+ response.businessMasterPaymentInfoDto[i].accountNumber
					+ '</td>'
					+ ' <td class="col-md-1 center" id="micrCodeId'
					+ id
					+ '">'
					+ response.businessMasterPaymentInfoDto[i].micrCode
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountAddressId'
					+ id
					+ '">'
					+ response.businessMasterPaymentInfoDto[i].accountAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="upiIdId'
					+ id
					+ '">'
					+ response.businessMasterPaymentInfoDto[i].upiId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="bankNameId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].bankName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="bankIFSCId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].bankIFSC
					+ '</td>'
					+ ' <td class="col-md-1 center" id="branchNameId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].branchName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountCityId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].accountCity
					+ '</td>'
					+ ' <td class="col-md-1 center" id="paymentTermsId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].paymentTerms
					+ '</td>'
					+ ' <td class="col-md-1 center" id="creditTermsId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].creditTerms
					+ '</td>'
					+ ' <td class="col-md-1 center" id="paymentInfoId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="payInfoId'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="payInfoNewId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="paymentInfoId'
					+ id
					+ '" style="display:none">'
					+ response.businessMasterPaymentInfoDto[i].id
					+ '</td>'
					
					
					+ ' <td class="col-md-1 center" id="payInfoId1'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editPaymentPartMaster'
					+ id
					+ '" value="'
					+ id
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editPaymentInfoPartyMaster('
					+ id
					+ ')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deletePaymentPartMaster'
					+ response.businessMasterPaymentInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.businessMasterPaymentInfoDto[i].id
					+ ',\'deletePayment\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyPaymentInfoTableList").html(htm);
	}

	if (response.termsAndConditionInfoDto.length != 0
			&& response.termsAndConditionInfoDto != null
			&& response.termsAndConditionInfoDto != "") {
		length = response.termsAndConditionInfoDto.length;
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					/*+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
					+ id
					+ '">'
					+ response.termsAndConditionInfoDto[i].headingName
					+ '</td>'*/
					+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
					+ id
					+ '">'
					+ response.termsAndConditionInfoDto[i].termconditionName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="termsAndCondId'
					+ id
					+ '" style="display:none">'
					+ response.termsAndConditionInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="termsAndCondId1'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
					+ response.termsAndConditionInfoDto[i].id
					+ '" value="'
					+ response.termsAndConditionInfoDto[i].id
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('
					+ id
					+ ')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteTermsAndCondition'
					+ response.termsAndConditionInfoDto[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.termsAndConditionInfoDto[i].id
					+ ',\'deleteTermsAndCondition\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#TermsAndConditionInfoTableList").html(htm);
	}
	
	if (response.businessMasterContractInfo.length != 0	&& response.businessMasterContractInfo != null && response.businessMasterContractInfo != "") {

		length = response.businessMasterContractInfo.length;
		var htm = "";
		var index = 0;
		
		for ( var i = 0; i < length; i++) {
			//added by Rohit on 22-03-2022
			var duration = response.businessMasterContractInfo[i].duration;
			if(response.businessMasterContractInfo[i].duration == null){
				duration = 0;
			}
			
			index++;
			
			htm = "<tr id='multiTr"+index+"' class='newAdded'>"
			+ "<td class='col-md-1 center'><input type='checkbox' class='chkContract' id='checkbox"+index+"' value='"+response.businessMasterContractInfo[i].id+"'></td>"
			+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
			+ "<td class='col-md-1 center' style='display:none'><input type='hidden' id='slaveId"+index+"' value='"+response.businessMasterContractInfo[i].id+"'></td>"
			+ "<td class='col-md-2 center'><select id='contractId"+index+"' class='form-control input-SmallText '><option value='0'>--Select Contract Type--</option></select> </td>"
			+ "<td class='col-md-1 center'><input type='text' id='durationId"+index+"' class='form-control input-SmallText' value='"+duration+"'> </td>"
			+ "<td class='col-md-1 center'><select id='timePeriodId"+index+"' class='form-control input-SmallText '><option value='0' >--Select Type--</option><option value='Year'>Year</option><option value='Month'>Month</option></select></td>"
			+ "<td class='col-md-1 center'><input type='text' id='fromDateId"+index+"' class='form-control input-SmallText ' value='"+response.businessMasterContractInfo[i].fromDate+"'> </td>"
			+ "<td class='col-md-1 center'><input type='text' id='toDateId"+index+"' onclick='getToDate("+index+")' class='form-control input-SmallText ' value='"+response.businessMasterContractInfo[i].toDate+"'> </td>"
			+ "</tr>";		
			
			$("#itemContractTableBodyId").append(htm);
			getCustomerContractType("contractId"+index);
			$("#contractId"+index).val(response.businessMasterContractInfo[i].contractTypeId);
			$("#timePeriodId"+index).val(response.businessMasterContractInfo[i].timePeriod);
			
			$('#fromDateId'+index).datepicker({
				autoclose : true,
				format: 'yyyy-mm-dd'
			});
		}
	}
	
	if (response.businessMasterUploadDocInfo.length != 0	&& response.businessMasterUploadDocInfo != null && response.businessMasterUploadDocInfo != "") {

		length = response.businessMasterUploadDocInfo.length;
		var htm = "";
		var index = 0;
		
		for ( var i = 0; i < length; i++) {
			
			index++;
			
			var docDate = new Date(response.businessMasterUploadDocInfo[i].createdDate).toLocaleDateString('en-GB');
			
			htm = htm + "<tr id='multiTr"+index+"' class='newAdded'>"
			+ "<td class='col-md-1 center'><span id='snum"+index+"'>"+index+"</span></td>"
			+ "<td class='col-md-1 center' style='display:none'><input type='hidden' id='slaveId"+index+"' value='"+response.businessMasterUploadDocInfo[i].id+"'></td>"
			+ "<td class='col-md-2 center' id='tdDocumentName"+index+"'>"+response.businessMasterUploadDocInfo[i].docName+"</td>"
			+ "<td class='col-md-1 center' id='tdDocumentDate"+index+"'>"+docDate+"</td>"
			+ "<td class='col-md-1 center hide' id='tdDocComment"+index+"'>"+response.businessMasterUploadDocInfo[i].docComment+"</td>"
			+ "<td class='col-md-1 center hide' id='tdFileName"+index+"'>"+response.businessMasterUploadDocInfo[i].fileName+"</td>"	
			+ "<td class='col-md-1 center'><a onclick=viewUploadDocInfo('"+encodeURIComponent(response.businessMasterUploadDocInfo[i].fileName)+"') data-toggle='modal' href='#docPreviewModal' class='btn btn-success btn-xs'><i class='fa fa-eye'></i> </a></td>"
			+ "<td class='col-md-1 center'><button onclick='deleteUploadDocInfo("+index+","+response.businessMasterUploadDocInfo[i].id+")' class='btn btn-xs btn-danger'><i class='fa fa-trash-o'></i> </button></td>"
			+ "</tr>";					
		}
		$("#uploadedDocumentTBody").html(htm);	
	}
}
/*******************************************************************************
 * @author : Akshata Desai
 * @date : 05-March-2020
 * @codeFor Delete Business Master
 ******************************************************************************/
function deleteBusinessMaster(businessMasterId) {
	
	var r = confirm("Are You Sure to delete this record");
	if (r == true) {
		
		var inputs = [];
		inputs.push('id=' + businessMasterId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/businessCustMaster/deleteBusinessMaster",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				//getAllBusinessMasterForPagination();
				getAllBusinessLabMaster();
			}
		});
	}
}
/*******************************************************************************
 * @author : Akshata Desai
 * @date : 05-March-2020
 * @codeFor onCloseBtnRefrshPage
 ******************************************************************************/
function onCloseBtnRefrshPage() {
	//window.location.replace("admin_business_cust_master.jsp");
	resetAllField();
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 05-March-2020
 * @codeFor onCloseBtnRefrshPage
 ******************************************************************************/
function onCloseBtnRefrshPage1() {
	//below line uncommentted by Rohit on 22-02-2022
	window.location.replace("b2b_customer_master.jsp");
}
/*******************************************************************************
 * @author : Akshata Desai
 * @date : 05-March-2020
 * @codeFor Autosuggestion for In House lab
 ******************************************************************************/
function getAutoBusinessMaster(businessMasterId) {
	var resultData = [];
	var businessMasterName = $("input#" + businessMasterId).val();

	if (businessMasterName == "" || businessMasterName == null
			|| businessMasterName == "null" || businessMasterName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + businessMasterId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('name=' + businessMasterName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/businessCustMaster/businessMasterAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.businessMasterDto.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.businessMasterDto.length; j++) {
						var arrValue = response.businessMasterDto[j].id + "-"
								+ response.businessMasterDto[j].name;
						var idValue = response.businessMasterDto[j].id;
						var labName = response.businessMasterDto[j].name;
						resultData.push({
							ID : idValue,
							Name : labName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
							function() {
								$("div#partyMasterByName .typeahead").html(
										template);
								$("div#partyMasterByName .typeahead").show();

								$("input#" + businessMasterId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + businessMasterId).data('typeahead').source = resultData;
							}, 500);
				}
			});

	function displayResult(item) {
		var res = item.text.split('-');
		var businessId = res[0];
		var labName = res[1];
		getBusinessMasterById(businessId);
		$("input#" + businessMasterId).val(labName);
	}
}
function getBusinessMasterById(businessId) {

	var inputs = [];
	inputs.push('id=' + businessId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/businessCustMaster/getBusinessMasterById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					businessMasterTemplate(response, "searchPartyMaster");
					businessMasterTemplate1(response, "searchPartyMaster");
					$("#seachPartyMaster").focus();
					$('#seachPartyMaster').val("");
					var businessMaster = response;// JSON.stringify(response);
					var myGenralnfoObj = "";
					for ( var i = 0; i < businessMaster.businessMasterGeneralInfoDto.length; i++) {
						if (businessMaster.businessMasterGeneralInfoDto[i].business_master_id == businessId) {
							myGenralnfoObj = businessMaster.businessMasterGeneralInfoDto[i];
							break;
						}
					}
					$("#grnMobileNo").val(myGenralnfoObj.mobile);
				}
			});
}

// Validation for PAN
function panValidation() {

	var generalPanNo = $("#generalPanNo").val();
	var regExp = /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/;
	if (generalPanNo.length == 10) {
		if (generalPanNo.match(regExp)) {
			alert('PAN match found');
		} else {
			alert("Not a valid PAN number");
			event.preventDefault();
		}
	} else {
		alert('Please enter 10 digits for a valid PAN number');
		event.preventDefault();
	}
}
/**
 * 
 * @param tabType
 */
function addGeneralInfoRows(tabType) {
	if (tabType === "GeneralInfo") {
		var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
		
		if(rows >= 1){
			alert(" Multiple general info can not be saved");
			return false;
		}
		addDynamicRecordsToGeneralInfoTable(rows + 1);
	} else if (tabType === "ContactInfo") {
		var rows = $('#ContactInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToContactInfoTable(rows + 1);
	} else if (tabType === "AddressInfo") {
		var rows = $('#AddressInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToAddressInfoTable(rows + 1);
	} else if (tabType === "paymentInfo") {
		var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToPaymentInfoTable(rows + 1);
	} else if (tabType === "TermsAndConditionInfo") {
		var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToTermsAndConditionInfoTable(rows + 1);
	}
	else if(tabType === "marketingInfo"){
		
		var mp = $("#marketingPerson").val();
		if(mp ==" " || mp =="--Select Name--" || mp ==null){
			alert("Please select marketing person first");
			return false;
		}
		
		var mpType = $("#marketingPersonType").text();
		
		if(mpType ==" " || mpType =="--Select Name--" || mpType ==null){
			alert("Please select marketing person first");
			return false;
		}
		
		var marketingFDate = $("#fromDate").val();
		if(marketingFDate =="" || marketingFDate==null){
			 alert("Please Enter From Date");
			 return false;
	    }
		
		var marketingTDate = $("#toDate").val();
		
		if( marketingTDate==null){
			marketingTDate = "";
		}
		
		
	   /* if(marketingTDate =="" || marketingTDate==null){
			alert("Please Enter To Date");
		  return false;
		}*/
	    
	    /*if(marketingFDate>marketingTDate){
	    	alert("From Date should not be after To Date");
	    	return false;
	    }*/
		    
		var btoday= new Date();
		
		var bday= btoday.getDate();
		
		var bmonth = btoday.getMonth() + 1;
		
		var byear = btoday.getFullYear();
		
		if(bday < 10) {
			bday='0'+bday;
		} 
		if(bmonth < 10) {
			bmonth='0'+bmonth;
		}
		                                               
		btoday = bday + '-' + bmonth + '-' + byear; //format to compare with toDate
		
		var rows = $('#marketingInfoTable tbody tr.newAdded').length;
		var toDateFromTr = $("#toDateId" + rows).html();
		
		/*if(btoday<toDateFromTr){
			alert("Marketing Person already asigned till " +toDateFromTr+ " date");
			return false;
		}
		else{*/
			addDynamicRecordsToMarketingPersonInfoTable(rows + 1);
		//}
		
		//var chkavail = checkIfMarketingPersonAssigned();
	//var rows = $('#marketingInfoTable tbody tr.newAdded').length;
		
		/*if(chkavail > 0)
		{
			alert("Marketing Person already available for this lab!");
			return false;
		}else{
			var rows = $('#marketingInfoTable tbody tr.newAdded').length;
			addDynamicRecordsToMarketingPersonInfoTable(rows + 1);	
		}*/		
	}

}
// this is for add dynamic row in table general information by vishnu
/**
 * 
 */
function addDynamicRecordsToGeneralInfoTable(id) {

	var generalMobileNo = $("#generalMobileNo").val().trim();
	var generalLandLineNo = $("#generalLandLineNo").val();
	var generalWebSite = $("#generalWebSite").val();
	var generalCompanyMail = $("#generalCompanyMail").val();
	var generalGstNO = $("#generalGstNO").val();
	var generalPanNo = $("#generalPanNo").val();

	if (generalMobileNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalMobileNo)) {
			alert("Phone1 should be of digits.!");
			$("#generalMobileNo").focus();
			return false;
		}
	}

	if (generalLandLineNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalLandLineNo)) {
			alert("Phone1 should be of digits.!");
			$("#generalLandLineNo").focus();
			return false;
		}
	}

	if (generalMobileNo == "") {
		alert("Mobile Number Can't Be Blank!");
		$("#generalMobileNo").focus();
		return false;
	}
	
	if(generalMobileNo === "0000000000" ||  generalLandLineNo === "000000000000"){
		alert("Mobile No and Land line Number Should not be Zero...");
		return false;
	}


	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalGstNOId'
			+ id
			+ '">'
			+ generalGstNO
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalMobileNoId'
			+ id
			+ '">'
			+ generalMobileNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalCompanyMailId'
			+ id
			+ '">'
			+ generalCompanyMail
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="generalLandLineNoId'
			+ id
			+ '" ">'
			+ generalLandLineNo
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="generalWebSiteId'
			+ id
			+ '" style="display:none">'
			+ generalWebSite
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalPanNoId'
			+ id
			+ '" style="display:none">'
			+ generalPanNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalInfoId'
			+ 0
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="geneInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			// test1
			+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editGeneralInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id="deleteGeneralPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteGeneral\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyGeneralTableInfoList").append(htm);
	$('#generalFormId')[0].reset();
}

// *******************************************************
// this is for contact info add dynamic row added

function addDynamicRecordsToContactInfoTable(id) {

	var contactPerson = $("#contactPerson").val();
	var contactDesignation = $("#contactDesignation").val();
	var contatcAddress = $("#contatcAddress").val();
	var contactGender = $("#contactGender").val();
	var contactDob = $("#contactDateofbirth").val();
	var contactPhoneOne = $("#contactPhoneOne").val();
	var contactPhoneSecond = $("#contactPhoneSecond").val();
	var contactMail = $("#contactMail").val();
	if (contactPerson == "") {
		alert("Contact Person name shouldnot  be  empty ..!");
		$("#contactPerson").focus();
		return false;
	}
	
	if (contactDob == ""||contactDob==null||contactDob=="null"||contactDob==undefined||contactDob=="undefined" ) {
		contactDob=0;
	}
	

	if (contactPerson != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(contactPerson)) {
			alert("Contact Person name should be of alphabets only with a single space allowed..!");
			$("#contactPerson").focus();
			return false;
		}
	}

	if (contactPhoneOne != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactPhoneOne)) {
			alert("Phone1 should be of digits.!");
			$("#contactPhoneOne").focus();
			return false;
		}
	}

	if (contactPhoneSecond != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactPhoneSecond)) {
			alert("Phone2 should be of digits.!");
			$("#contactPhoneSecond").focus();
			return false;
		}
	}
	if (contactMail != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(contactMail)) {
			alert('Please Enter valid Email Id');
			$("#contactMail").focus();
			return false;
		}
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPersonId'
			+ id
			+ '">'
			+ contactPerson
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactDesignationId'
			+ id
			+ '">'
			+ contactDesignation
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contatcAddressId'
			+ id
			+ '">'
			+ contatcAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactGenderId'
			+ id
			+ '" style="display:none">'
			+ contactGender
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactDobId'
			+ id
			+ '" style="display:none">'
			+ contactDob
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneOneId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneOne
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneSecond
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactMailId'
			+ id
			+ '" style="display:none">'
			+ contactMail
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId'
			+ 0
			+ '" style="display:none">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			
			
			// testtttttttttttttttt
			+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteContactPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteContact\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();

}

// this is all about dynamic row added in address table

function addDynamicRecordsToAddressInfoTable(id) {

	var companyCountry = $("#countryFromAddress").val();
	var companyState = $("#stateFromAddress").val();
	var companyDistict = $("#districtFromAddress").val();
	var companyTaluka = $("#talukaFromAddress").val();
	var companyCity = $("#cityFromAddress").val();
	var companyStreet = $("#streetFromAddress").val();
	var companyPin = $("#pincodeFromAddress").val();
	var companyAddress = $("#addressFromAddress").val();

	var hiddenCountryName = $("#hiddenCountryFromPartyMaster").val();
	var hiddenStateName = $("#hiddenStateFromPartyMaster").val();
	var hiddenDistrictName = $("#hiddenDistrictFromPartyMaster").val();
	var hiddenTalukaName = $("#hiddenTalukaFromPartyMaster").val();
	var hiddenCityName = $("#hiddenCityFromPartyMaster").val();

	var hiddenCityNameNew = $("#townId option:selected").text();
	var hiddenCountryNameNew = $("#countryFromAddress option:selected").text();
	
	if (companyAddress == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}
	if (hiddenCityName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(hiddenCityName)) {
			alert("City name should be of alphabets only with a single space allowed..!");
			$("#cityFromAddress").focus();
			return false;
		}

	}

	if (companyPin != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(companyPin)) {
			alert("Pin code should be of digits only!");
			$("#pincodeFromAddress").focus();
			return false;
		}
	}

	if (hiddenStateName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(companyState)) {
			alert("State name should be of alphabets only with a single space allowed..!");
			$("#stateFromAddress").focus();
			return false;
		}
	}

	if (companyStreet != "" || companyStreet != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(companyStreet)) {
			alert("Street should be of alphabets and digits only with a single space allowed..!");
			$("#streetFromAddress").focus();
			return false;
		}
	}

	/*if (hiddenCountryName != "" || hiddenCountryName != null) {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(hiddenCountryName)) {
			alert("Country should be of alphabets only with a single space allowed..!");
			$("#countryFromAddress").focus();
			return false;
		}
	}*/
	

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
		/*	+ ' <td class="col-md-1 center" id="companyNameId'
			+ id
			+ '">'
			+ companyName
			+ '</td>'*/
			+ ' <td class="col-md-1 center" id="companyCountryId'
			+ id
			+ '">'
			+ hiddenCountryNameNew
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyCityId'
			+ id
			+ '">'
			+ hiddenCityNameNew
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAddressId'
			+ id
			+ '" ">'
			+ companyAddress
			+ '</td>'
			/*+ ' <td class="col-md-1 center" id="companyAddressTypeId'
			+ id
			+ '" style="display:none">'
			+ companyAddressType
			+ '</td>'*/
			+ ' <td class="col-md-1 center" id="companyStreetId'
			+ id
			+ '" style="display:none">'
			+ companyStreet
			+ '</td>'
			/*+ ' <td class="col-md-1 center" id="companyAreaId'
			+ id
			+ '" style="display:none">'
			+ companyArea
			+ '</td>'*/
			+ ' <td class="col-md-1 center" id="companyPinId'
			+ id
			+ '" style="display:none">'
			+ companyPin
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyStateId'
			+ id
			+ '" style="display:none">'
			+ hiddenStateName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyDistrictId'
			+ id
			+ '" style="display:none">'
			+ hiddenDistrictName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyTalukaId'
			+ id
			+ '" style="display:none">'
			+ hiddenTalukaName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
			+ id
			+ '" style="display:none">'
			+ companyCountry
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenStateNameId'
			+ id
			+ '" style="display:none">'
			+ companyState
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
			+ id
			+ '" style="display:none">'
			+ companyDistict
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
			+ id
			+ '" style="display:none">'
			+ companyTaluka
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenCityNameId'
			+ id
			+ '" style="display:none">'
			+ companyCity
			+ '</td>'
			+ ' <td class="col-md-1 center" id="addressInfoId'
			+ 0
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="addressInfoId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteAddressPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteAddress\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyAddressTableInfoList").append(htm);
	$('#addressFormId')[0].reset();
	$("#countryFromAddress").select2("val", 0);
	$("#stateFromAddress").select2("val", 0);
	$("#districtFromAddress").select2("val", 0);
	$("#talukaFromAddress").select2("val", 0);
	$("#cityFromAddress").select2("val", 0);

	$("#companyNameFromAddress").val("");
	$("#areaFromAddress").val("");
	$("#streetFromAddress").val("");
	$("#pincodeFromAddress").val("");
	$("#addressFromAddress").val("");
	$("#hiddenCountryFromPartyMaster").val("");
	$("#hiddenStateFromPartyMaster").val("");
	$("#hiddenDistrictFromPartyMaster").val("");
	$("#hiddenTalukaFromPartyMaster").val("");
	$("#hiddenCityFromPartyMaster").val("");

}

// this is all about dynamic row added in address table

function addDynamicRecordsToPaymentInfoTable(id) {

	var bankName = $("#bankName").val();
	var bankIfscCode = $("#bankIfscCode").val();
	var accountHolderName = $("#accountHolderName").val();
	var accountNumber = $("#accountNumber").val();
	var cityId = $("#cityId").val();
    var micrCode = $("#micrcode").val();
	var accountAddress = $("#accountAddress").val();
	var paymentTerm = $("#paymentTerm").val();
	var creditTerm = $("#creditTerm").val();
	var upiId = $("#upiId").val();
	var branchName =$("#branchname").val();
	if (bankName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(bankName)) {
			alert("Bank name should be of alphabets only with a single space allowed..!");
			$("#bankName").focus();
			return false;
		}
	}

	if (accountNumber == "" || accountNumber == undefined
			|| accountNumber == null) {
		alert("Account Number code should be of digits only!");
		$("#accountNumber").focus();
		return false;
	}

	if (accountHolderName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(accountHolderName)) {
			alert("Account Person name should be of alphabets only with a single space allowed..!");
			$("#accountHolderName").focus();
			return false;
		}
	}

	if (accountAddress != "" || accountAddress != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(accountAddress)) {
			alert("Address should be of alphabets and digits only with a single space allowed..!");
			$("#accountAddress").focus();
			return false;
		}
	}

	if (bankIfscCode != "" || bankIfscCode != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(bankIfscCode)) {
			alert("IFSC should be of alphabets and digits only with a single space allowed..!");
			$("#bankIfscCode").focus();
			return false;
		}
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountHolderNameId'
			+ id
			+ '">'
			+ accountHolderName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountNumberId'
			+ id
			+ '">'
			+ accountNumber
			+ '</td>'
			+ ' <td class="col-md-1 center" id="micrCodeId'
			+ id
			+ '">'
			+ micrCode
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountAddressId'
			+ id
			+ '">'
			+ accountAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="upiIdId'
			+ id
			+ '">'
			+ upiId
			+ '</td>'
			+ ' <td class="col-md-1 center" id="bankNameId'
			+ id
			+ '" style="display:none">'
			+ bankName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="bankIFSCId'
			+ id
			+ '" style="display:none">'
			+ bankIfscCode
			+ '</td>'
			+ ' <td class="col-md-1 center" id="branchNameId'
			+ id
			+ '" style="display:none">'
			+ branchName
			+ ' <td class="col-md-1 center" id="accountCityId'
			+ id
			+ '" style="display:none">'
			+ cityId
			+ '</td>'
			+ ' <td class="col-md-1 center" id="paymentTermsId'
			+ id
			+ '" style="display:none">'
			+ paymentTerm
			+ '</td>'
			+ ' <td class="col-md-1 center" id="creditTermsId'
			+ id
			+ '" style="display:none">'
			+ creditTerm
			+ '</td>'
			+ ' <td class="col-md-1 center" id="paymentInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="payInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editPaymentPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editPaymentInfoPartyMaster('
			+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deletePaymentPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deletePayment\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyPaymentInfoTableList").append(htm);
	$('#paymentFormId')[0].reset();
}

// this for terms and condtions

function addDynamicRecordsToTermsAndConditionInfoTable(id) {

	/*var termsAndConditionsTitle = $("#termsAndConditionsTitle option:selected")
			.html();
	var termsAndConditionsTitleVal = $(
			"#termsAndConditionsTitle option:selected").val();*/
	var termsAndCondition = $("#termsAndCondition").val();
	
	if(termsAndCondition==="" || termsAndCondition===undefined || termsAndCondition=== null){
		alert("Please Add Condition First...");
		return false;
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
		/*	+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
			+ id
			+ '">'
			+ termsAndConditionsTitle
			+ '</td>'*/
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
			+ id
			+ '">'
			+ termsAndCondition
			+ '</td>'
			+ id
			+ '">'
			+ ' <td class="col-md-1 center" id="termsAndCondId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" type="hidden"  id="termsAndCondId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('
			+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteTermsAndCondition'
			+ id + '" onclick="deletePartyMasterSlave('
			+ id + ',\'deleteTermsAndCondition\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#TermsAndConditionInfoTableList").append(htm);
	$('#termsAndConditionsTitle').select2('val', 0);
	$('#termsAndCondition').val("").empty();

}
//function for marketing Person Info table
function addDynamicRecordsToMarketingPersonInfoTable(id) {
	
	var marketingPerson = $("#marketingPerson option:selected").text();
	var marketingRemark = $("#marketingPersonRemark").val();
	var fromDate = $("#fromDate").val();
	//var toDate = $("#toDate").val();
	var toDate=$("#toDate").val();;
	if (marketingPerson == "") {
		alert("Please select marketing person name!");
		$("#marketingPerson").focus();
		return false;
	}
	
	if (fromDate == ""||fromDate==null||fromDate=="null"||fromDate==undefined||fromDate=="undefined" ) {
		//alert("Please select from date");
		//$("#fromDate").focus();
		//return false;
	}
	
	var marketingPersonType = $("#marketingPersonType option:selected").text();
	
	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="marketingPersonId'
			+ id
			+ '">'
			+ marketingPerson
			+ '</td>'
			+ ' <td class="col-md-1 center" id="marketingPersonTypeId'
			+ id
			+ '">'
			+ marketingPersonType
			+ '</td>'
			+ ' <td class="col-md-1 center" id="marketingPersonRemarkId'
			+ id
			+ '">'
			+ marketingRemark
			+ '</td>'
			+ ' <td class="col-md-1 center" id="fromDateId'
			+ id
			+ '" >'
			+ fromDate
			+ '</td>'
			+ ' <td class="col-md-1 center" id="toDateId'
			+ id
			+ '" >'
			+ toDate
			+ '</td>'
			+ ' <td class="col-md-1 center" id="marketingInfoId'
			+ 0
			+ '" style="display:none">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="marketingInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			// testtttttttttttttttt
			+ ' <td class="col-md-1 center"><input type="hidden" id="editMarketingPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editMarketingInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteMarketingPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteMarketingPerson\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyMarketingPersonInfoList").append(htm);
	$('#marketingPersonFormId')[0].reset();

}
// this is function for edit general inforamation

function editGeneralInfoPartyMaster(id, callFrom) {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var generalInfoId = $("#geneInfoId1" + i).text();
		var geneInfoId = $("#geneInfoId" + i).text();
		var genInfoIdAdd = $("#generalInfoId" + i).text();
		if (generalInfoId == id || genInfoIdAdd == id) {
			$("#geneInfoIdNew").val($("#generalInfoId" + i).html());
			$("#generalMobileNo").val($("#generalMobileNoId" + i).html());
			$("#generalLandLineNo").val($("#generalLandLineNoId" + i).html());
			$("#generalWebSite").val($("#generalWebSiteId" + i).html());
			$("#generalCompanyMail").val($("#generalCompanyMailId" + i).html());
			$("#generalGstNO").val($("#generalGstNOId" + i).html());
			$("#generalPanNo").val($("#generalPanNoId" + i).html());
			$("#updateGeneralInfo").attr('myid', generalInfoId);
			$("#saveGeneralInfo").hide();
			$("#updateGeneralInfo").show();
			if (callFrom == "fromDB") {
				document.getElementById("saveGeneralInfo").style.display = "none";
				$("#updateGeneralInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateGeneralInfo").show();
				$("#saveGeneralInfo").hide();
			}

		}
	}
}

function updateGeneralInfoPartyMaster() {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateGeneralInfo").attr('myid');
		if (id == i) {
			$("#generalInfoId" + i).html($("#geneInfoIdNew").val());
			$("#generalMobileNoId" + i).html($("#generalMobileNo").val());
			$("#generalLandLineNoId" + i).html($("#generalLandLineNo").val());
			$("#generalWebSiteId" + i).html($("#generalWebSite").val());
			$("#generalCompanyMailId" + i).html($("#generalCompanyMail").val());
			$("#generalGstNOId" + i).html($("#generalGstNO").val());
			$("#generalPanNoId" + i).html($("#generalPanNo").val());
			//$("#saveGeneralInfo").show();
			//document.getElementById("saveGeneralInfo").style.display = "block";
			$("#updateGeneralInfo").hide();
			document.getElementById("updateGeneralInfo").style.display = "none";
			//$("#updateGeneralInfo").hide();
			$("#saveGeneralInfo").show();
		}
	}
	resetInfoFields('generalInfo');
}

function editContactInfoPartyMaster(id, callFrom) {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var conInfoId = $("#conInfoId" + i).text();
		var contactInfoId = $("#contactInfoId1" + i).text();
		var conInfoIdAdd = $("#contactInfoId" + i).text();
		if (contactInfoId == id || conInfoIdAdd == id) {
			$("#conInfoIdNew").val($("#contactInfoId" + i).html());
			$("#contactPerson").val($("#contactPersonId" + i).html());
			$("#contactDesignation").val($("#contactDesignationId" + i).html());
			$("#contatcAddress").val($("#contatcAddressId" + i).html());
			$("#contactGender").val($("#contactGenderId" + i).html());
			$("#contactDateofbirth").val($("#contactDobId" + i).html());
			$("#contactPhoneOne").val($("#contactPhoneOneId" + i).html());
			$("#contactPhoneSecond").val($("#contactPhoneSecondId" + i).html());
			$("#contactMail").val($("#contactMailId" + i).html());
			$("#updateContactInfo").attr('updateContactInfoId', contactInfoId);
			if (callFrom == "fromDB") {
				document.getElementById("saveContactInfo").style.display = "none";
				$("#updateContactInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateContactInfo").show();
				$("#saveContactInfo").hide();
			}
		}
	}
}

function updateContactInfoPartyMaster() {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateContactInfo").attr('updateContactInfoId');
		if (i == id) {
			$("#contactInfoId" + i).html($("#conInfoIdNew").val());
			$("#contactPersonId" + i).html($("#contactPerson").val());
			$("#contactDesignationId" + i).html($("#contactDesignation").val());
			$("#contatcAddressId" + i).html($("#contatcAddress").val());
			$("#contactGenderId" + i).html($("#contactGender").val());
			$("#contactDobId" + i).html($("#contactDateofbirth").val());
			$("#contactPhoneOneId" + i).html($("#contactPhoneOne").val());
			$("#contactPhoneSecondId" + i).html($("#contactPhoneSecond").val());
			$("#contactMailId" + i).html($("#contactMail").val());
			$("#saveContactInfo").show();
			$("#updateContactInfo").hide();
		}
	}
	resetInfoFields('contactInfo');
}

function editAddressInfoPartyMaster(id, callFrom) {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId1" + i).text();
		var addInfoId = $("#addInfoId" + i).text();
		var addInfoIdAdd = $("#addressInfoId" + i).text();
		if (id == addressInfoId || id == addInfoIdAdd) {
			$("#addInfoIdNew").val($("#addressInfoId" + id).html());

			$("#countryFromAddress").select2('val',
					$("#hiddenCountryNameId" + id).html());
			
			$("#stateFromAddress").select2('val',
					$("#hiddenStateNameId" + id).html());
			getAllDistrictByStateId('stateFromAddress');

			$("#districtFromAddress").select2('val',
					$("#hiddenDistrictNameId" + id).html());
			getAllTalukaBydDistictId('districtFromAddress');
			$("#talukaFromAddress").select2('val',
					$("#hiddenTalukaNameId" + id).html());
			getAllCityByTalukaId('talukaFromAddress');
			$("#cityFromAddress").select2('val',
					$("#hiddenCityNameId" + id).html());

			$("#streetFromAddress").val($("#companyStreetId" + id).html());
			$("#pincodeFromAddress").val($("#companyPinId" + id).html());
			$("#addressFromAddress").val($("#companyAddressId" + id).html());

			$("#hiddenCountryFromPartyMaster").val(
					$("#companyCountryId" + id).html());
			$("#hiddenStateFromPartyMaster").val(
					$("#companyStateId" + id).html());
			$("#hiddenDistrictFromPartyMaster").val(
					$("#companyDistrictId" + id).html());
			$("#hiddenTalukaFromPartyMaster").val(
					$("#companyTalukaId" + id).html());
			$("#hiddenCityFromPartyMaster")
					.val($("#companyCityId" + id).html());
			$("#updateAddressInfo").attr('updateAddressInfoId', addressInfoId);
			if (callFrom == "fromDB") {
				document.getElementById("saveAddressInfo").style.display = "none";
				$("#updateAddressInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateAddressInfo").show();
				$("#saveAddressInfo").hide();
			}
		}
	}
}

function updateAddressInfoPartyMaster() {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateAddressInfo").attr('updateAddressInfoId');
		if (i == id) {
			$("#addressInfoId" + i).html($("#addInfoIdNew").val());
			$("#companyNameId" + i).html($("#companyNameFromAddress").val());
			$("#hiddenCountryNameId" + i).html($("#countryFromAddress").val());
			$("#hiddenStateNameId" + i).html($("#stateFromAddress").val());
			$("#hiddenDistrictNameId" + i)
					.html($("#districtFromAddress").val());
			$("#hiddenTalukaNameId" + i).html($("#talukaFromAddress").val());
			$("#hiddenCityNameId" + i).html($("#cityFromAddress").val());

			var hiddenCityNameNew = $("#townId option:selected").text();
			var hiddenCountryNameNew = $("#countryFromAddress option:selected").text();
			
			$("#companyCountryId" + i).html(hiddenCityNameNew);
			$("#companyStateId" + i).html(
					$("#hiddenStateFromPartyMaster").val());
			$("#companyDistrictId" + i).html(
					$("#hiddenDistrictFromPartyMaster").val());
			$("#companyTalukaId" + i).html(
					$("#hiddenTalukaFromPartyMaster").val());
			$("#companyCityId" + i).html(hiddenCountryNameNew);

			$("#companyAddressId" + i).html($("#addressFromAddress").val());
			$("#companyStreetId" + i).html($("#streetFromAddress").val());
			$("#companyPinId" + i).html($("#pincodeFromAddress").val());
			$("#companyAreaId" + i).html($("#areaFromAddress").val());

			if ($("#shippingAddress").val() === "ShippingAddress") {
				$("#companyAddressTypeId" + i)
						.html($("#shippingAddress").val());
			} else {
				$("#companyAddressTypeId" + i).html($("#billingAddress").val());
			}
			document.getElementById("saveAddressInfo").style.visibility = "visible";
			$("#saveAddressInfo").show();
			$("#updateAddressInfo").hide();
		}
	}
	resetInfoFields('addressInfo');
}

// this is for payment info
function editPaymentInfoPartyMaster(id) {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var paymentInfoId = $("#payInfoId1" + i).text();
		var payInfoId = $("#payInfoId" + i).text();
		var payInfoIddd = $("#paymentInfoId" + i).text();
		if (id == paymentInfoId || id == payInfoIddd) {
			$("#payInfoIdNew").val($("#paymentInfoId" + id).html());
			$("#bankList").val($("#bankNameId" + i).html());
			$("#bankIfscCode").val($("#bankIFSCId" + i).html());
			$("#accountHolderName").val($("#accountHolderNameId" + i).html());
			$("#accountNumber").val($("#accountNumberId" + i).html());
			$("#micrcode").val($("#micrCodeId" + i).html());
			$("#cityId").val($("#accountCityId" + i).html());
			$("#accountAddress").val($("#accountAddressId" + i).html());
			$("#paymentTerm").val($("#paymentTermsId" + i).html());
			$("#creditTerm").val($("#creditTermsId" + i).html());
			$("#upiId").val($("#upiIdId" + i).html());
			$("#branchname").val($("#branchNameId" + i).html());
			$("#updatePaymentInfo").attr('updatePaymentInfoId', paymentInfoId);
			$("#savePaymentInfo").hide();
			$("#updatePaymentInfo").show();
		}
	}
}

function updatePaymentInfoPartyMaster() {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updatePaymentInfo").attr('updatePaymentInfoId');
		if (i == id) {
			$("#paymentInfoId" + i).html($("#payInfoIdNew").val());
			$("#bankNameId" + i).html($("#bankList option:selected").html());
			$("#bankIFSCId" + i).html($("#bankIfscCode").val());
			$("#accountHolderNameId" + i).html($("#accountHolderName").val());
			$("#accountNumberId" + i).html($("#accountNumber").val());
			$("#micrCodeId" + i).html($("#micrcode").val());
			$("#accountCityId" + i).html($("#cityId").val());
			$("#accountAddressId" + i).html($("#accountAddress").val());
			$("#paymentTermsId" + i).html($("#paymentTerm").val());
			$("#creditTermsId" + i).html($("#creditTerm").val());
			$("#upiIdId" + i).html($("#upiId").val());
			$("#branchNameId" +i).html($("#branchname").val());
			$("#savePaymentInfo").show();
			$("#updatePaymentInfo").hide();
		}
	}
	resetInfoFields('paymentInfo');
}

// this is for terms and Conditions info edit
function editTermsAndConditionInfoPartyMaster(id) {
	/*getTermConditionMaster(id);
	$("#saveTermsAndConditionInfo").hide();
	$("#updateTermsAndConditionInfo").show();*/
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termsAndCondId1 = $("#termsAndCondId1" + i).text();
		var termsAndCondId = $("#termsAndCondId" + i).text();
		if (id == termsAndCondId1 || id == termsAndCondId) {
			//alert($("#txtTermsAndConditionId" + id).html());
			$("#termsAndCondition").val($("#txtTermsAndConditionId" + id).html());
			$("#updateTermsAndConditionInfo").attr('updateTermsAndConditionInfo1', termsAndCondId1);
			
			$("#saveTermsAndConditionInfo").hide();
			$("#updateTermsAndConditionInfo").show();
		}
	}
}

// this is for terms and Conditions update
function updateTermsAndConditionPartyMaster() {
	var terms= $('#termsAndCondition').val();
	if(terms==""){
	//	$("#termsAndCondition").focus();
		alert("Terms & Conditions can not be blank").focus();
		return false;
	}
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termsAndCondId = $("#termsAndCondSlaveId" + i).val();
		var id = $("#updateTermsAndConditionInfo").attr(
				'updateTermsAndConditionInfo1');
		if (i == id) {
			$("#txtTermsAndConditionsTitleId" + i).html(
					$("#termsAndConditionsTitle option:selected").html());
			$("#txtTermsAndConditionId" + i)
					.html($("#termsAndCondition").val());
				
			$("#saveTermsAndConditionInfo").show();
			$("#updateTermsAndConditionInfo").hide();
		}
	}
	
	resetInfoFields('TermsAndConditionInfo');
}
//marketing info edit
function editMarketingInfoPartyMaster(id, callFrom) {
	var rows = $('#marketingInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
	
		var marketingInfoId = $("#marketingInfoId1" + i).text();
		var markInfoIdAdd = $("#marketingInfoId" + i).text();
		if (marketingInfoId == id || markInfoIdAdd == id) {
			$("#markInfoIdNew").val($("#marketingInfoId" + i).html());
			$("#marketingPerson").val($("#marketingPersonId" + i).html());
			$("#marketingPersonType").val($("#marketingPersonTypeId" + i).html());
			$("#marketingPersonRemark").val($("#marketingPersonRemarkId" + i).html());
			$("#fromDate").val($("#fromDateId" + i).html());
			$("#toDate").val($("#toDateId" + i).html());
			
			$("#updateMarketingInfo").attr('updateMarketingInfoId', marketingInfoId);
			if (callFrom == "fromDB") {
				document.getElementById("savemarketingPersonInfo").style.display = "none";
				$("#updateMarketingInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateMarketingInfo").show();
				$("#savemarketingPersonInfo").hide();
			}
		}
	}
}
//marketing info update
function updateMarketingPersonInfoPartyMaster() {
	var rows = $('#marketingInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateMarketingInfo").attr('updateMarketingInfoId');
		if (i == id) {
			$("#marketingInfoId" + i).html($("#markInfoIdNew").val());
			$("#marketingPersonId" + i).html($("#marketingPerson").val());
			$("#marketingPersonTypeId" + i).html($("#marketingPersonType").val());

			$("#marketingPersonRemarkId" + i).html($("#marketingPersonRemark").val());
			$("#fromDateId" + i).html($("#fromDate").val());
			$("#toDateId" + i).html($("#toDate").val());
			$("#savemarketingPersonInfo").show();
			$("#updateMarketingInfo").hide();
		}
	}
	resetInfoFields('marketingInfo');
}//marketing info ends

function getMasterTermsAndCondition() {
	//var unitId = parseInt($("#unitId").val());
	var unitId = parseInt($("#userUnitId").val());
	var inputs = [];		
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');		
	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/inventoryM/getAllInventoryTermAndCondition",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' id='termsAndConditionsTitle' class='col-md-12'><option value='0'>---Select---</option>";

					for ( var i = 0; i < r.lsttermcondition.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lsttermcondition[i].termConditionId
								+ "'  >" + r.lsttermcondition[i].headingName
								+ "</option>";
					}
					divContent = divContent + "</select>";
					$("#termsAndConditionsTitle").html(divContent);
					$("#termsAndConditionsTitle").select2();
				}
			});
}

function getTermConditionMaster(termconditionId) {
	$("#termsAndConditionsSelectedId").val(termconditionId);
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#termsAndCondition").val(r.termconditionName);
			$("#termsAndCondSlaveId" + termconditionId).val(r.termConditionId);
			$('#termsAndConditionsTitle').select2('val', r.termConditionId);
			$("#updateTermsAndConditionInfo").attr('updatetermsAndCondInfoId',
					r.termConditionId);
		}
	});
}

function deletePartyMasterSlave(id, callFrom) {
	var partyMasterId = $("#partyMasterId").val();
	
	var r = confirm("Are You Sure to delete this record");
	if (r) {
		if (callFrom === "deleteGeneral") {
			$("#PartyGeneralTableInfoList")
				.on(
						'click',
						'#deleteGeneralPartMaster' + id + '',
						function() {
							var isNew = $("#deleteGeneralPartMaster" + id)
									.attr('isNew');
							
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								//inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('Callfrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/businessCustMaster/deleteBusinessMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}

						});
		} else if (callFrom === "deleteContact") {
			$("#PartyContactTableInfoList")
				.on(
						'click',
						'#deleteContactPartMaster' + id + '',
						function() {
							var isNew = $("#deleteContactPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								//inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('Callfrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/businessCustMaster/deleteBusinessMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
		}else if (callFrom === "deleteMarketingPerson") {
			$("#PartyMarketingPersonInfoList")
			.on(
					'click',
					'#deleteMarketingPartMaster' + id + '',
					function() {
						var isNew = $("#deleteMarketingPartMaster" + id)
								.attr('isNew');
						if (isNew != undefined && isNew != null
								&& isNew == "false") {
							$(this).closest('tr').remove();
							var inputs = [];
							inputs.push('id=' + id);
							//inputs.push('partyMasterId=' + partyMasterId);
							inputs.push('Callfrom=' + callFrom);
							var str = inputs.join('&');
							jQuery
									.ajax({
										async : true,
										type : "POST",
										url : "ehat/businessCustMaster/deleteBusinessMasterSlave",
										data : str + "&reqType=AJAX",
										error : function() {
											alert('error');
										},
										success : function(response) {
											alert(response);
										}
									});
						} else {
							$(this).closest('tr').remove();
						}
					});
	}else if (callFrom === "deleteAddress") {
			$("#PartyAddressTableInfoList")
				.on(
						'click',
						'#deleteAddressPartMaster' + id + '',
						function() {
							var isNew = $("#deleteAddressPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								//inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('Callfrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/businessCustMaster/deleteBusinessMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
		} else if (callFrom === "deletePayment") {
			$("#PartyPaymentInfoTableList")
				.on(
						'click',
						'#deletePaymentPartMaster' + id + '',
						function() {
							var isNew = $("#deletePaymentPartMaster" + id)
									.attr('isNew');
							
							
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								//inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('Callfrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/businessCustMaster/deleteBusinessMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
		} else if (callFrom === "deleteTermsAndCondition") {
			$("#TermsAndConditionInfoTableList")
				.on(
						'click',
						'#deleteTermsAndCondition' + id + '',
						function() {
							var isNew = $("#deleteTermsAndCondition" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								//inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('Callfrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/businessCustMaster/deleteBusinessMasterSlave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
		}
	}
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getAllStateMaster() {
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllStateMaster",
				error : function() {
					alert('error');
				},
				success : function(r) {

					var divContent = "";
					divContent = divContent
							+ "<select name='State Name' class='col-md-12'><option value='0'>--Select State--</option>";
					for ( var i = 0; i < r.stateList.length; i++) {
						divContent = divContent + "<option value='"
								+ r.stateList[i].state_ID + "'>"
								+ r.stateList[i].stateName + "</option>";
					}
					divContent = divContent + "</select>";
					$("#stateName").html(divContent);
					$("#stateName").select2();
					$("#stateIdPO").html(divContent);
					$("#stateIdPO").select2();
					$("#supplierStateId").html(divContent);
					$("#supplierStateId").select2();

					$("#stateName").html(divContent);
					$("#stateName").select2();
					$("#stateFromAddress").html(divContent);
					$("#stateFromAddress").select2();
					$("#grnSupplierState").html(divContent);
					$("#grnSupplierState").select2();
					$("#purchaseInvoiceSupplierState").html(divContent);
					$("#purchaseInvoiceSupplierState").select2();

				}
			});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : getAllDistrictByStateId()
 ******************************************************************************/
function getAllDistrictByStateId(inputID) {
	var stateId = "";
	var categoryName = $("#" + inputID).attr('data-name');	
	if (categoryName == "getDistrictOnPO") {
		stateId = $('#stateIdPO').val();
		var hiddenStateName = $("#stateIdPO option:selected").text();
		document.getElementById("hiddenStateName").value = hiddenStateName;
	} else if (categoryName == "getDistrictOnManufac") {
		stateId = $("#stateName").val();
	} else if (categoryName == "getDistrictOnGRN") {
		stateId = $('#stateFromAddress').val();
		var hiddenStateName = $("#stateFromAddress option:selected").text();
		document.getElementById("hiddenStateFromAddress").value = hiddenStateName;
	} else if (categoryName == "getDistrictOnPurInv") {
		stateId = $('#stateFromAddress').val();
		var hiddenStateName = $("#stateFromAddress option:selected").text();
		document.getElementById("hiddenStateFromPartyMaster").value = hiddenStateName;
	} else if (categoryName == "getDistrictOnPartyMaster") {
		stateId = $('#stateFromAddress').select2('val');
		var hiddenStateName = $("#stateFromAddress option:selected").text();
		document.getElementById("hiddenStateFromPartyMaster").value = hiddenStateName;
	}
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllDistrictByStateId",
				data : {
					"stateId" : stateId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<option value='0'>--Select District--</option>";
					for ( var i = 0; i < r.districtList.length; i++) {
						divContent = divContent + "<option value='"
								+ r.districtList[i].district_ID + "'>"
								+ r.districtList[i].districtName + "</option>";
					}
					// divContent = divContent + "</select>";
					if (categoryName == "getDistrictOnManufac") {
						$("#distictName").html(divContent);
						$("#distictName").select2();
					} else if (categoryName == "getDistrictOnPO") {
						$("#distictIdPO").html(divContent);
						$("#distictIdPO").select2();
					} else if (categoryName == "getDistrictOnGRN") {
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();
					} else if (categoryName == "getDistrictOnPurInv") {
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();
					} else if (categoryName == "getDistrictOnPartyMaster") {
						document.getElementById("districtFromAddress").innerHTML = divContent;
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();
					}
				}
			});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : getAllTalukaBydDistictId()
 ******************************************************************************/
function getAllTalukaBydDistictId(inputID) {
	var districtId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getTalukaOnPO") {
		districtId = $('#distictIdPO').val();
		var hiddenDistrictName = $("#distictIdPO option:selected").text();
		document.getElementById("hiddenDistrictName").value = hiddenDistrictName;
	} else if (categoryName == "getTalukaOnManufac") {
		districtId = $('#distictName').val();
	} else if (categoryName == "getTalukaOnGRN") {
		districtId = $('#districtFromAddress').val();
		var hiddenDistrictName = $("#districtFromAddress option:selected")
				.text();
		document.getElementById("hiddenDistrictFromAddress").value = hiddenDistrictName;
	} else if (categoryName == "getTalukaOnPurInv") {
		districtId = $('#districtFromAddress').val();
		var hiddenDistrictName = $("#districtFromAddress option:selected")
				.text();
		document.getElementById("hiddenDistrictFromPartyMaster").value = hiddenDistrictName;
	} else if (categoryName == "getTalukaOnPartyMaster") {
		districtId = $('#districtFromAddress').val();
		var hiddenDistrictName = $("#districtFromAddress option:selected")
				.text();
		document.getElementById("hiddenDistrictFromPartyMaster").value = hiddenDistrictName;
	}
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllTalukaBydDistictId",
				data : {
					"districtId" : districtId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='Taluka Name' class='col-md-12'><option value='0'>--Select Taluka--</option>";
					for ( var i = 0; i < r.talukaList.length; i++) {
						divContent = divContent + "<option value='"
								+ r.talukaList[i].taluka_ID + "'>"
								+ r.talukaList[i].talukaName + "</option>";
					}
					divContent = divContent + "</select>";
					if (categoryName == "getTalukaOnManufac") {
						$("#talukaName").html(divContent);
						$("#talukaName").select2();
					} else if (categoryName == "getTalukaOnPO") {
						$("#talukaIdPO").html(divContent);
						$("#talukaIdPO").select2();
					} else if (categoryName == "getTalukaOnGRN") {

						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
					} else if (categoryName == "getTalukaOnPurInv") {

						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
					} else if (categoryName == "getTalukaOnPartyMaster") {
						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
					}

				}
			});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 04-March-2020
 * @codeFor : getAllCityByTalukaId()()
 ******************************************************************************/
function getAllCityByTalukaId(inputID) {
	var talukaId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getCityOnPO") {
		talukaId = $('#talukaIdPO').val();
		var hiddenTalukaName = $("#talukaIdPO option:selected").text();
		document.getElementById("hiddenTalukaName").value = hiddenTalukaName;
	} else if (categoryName == "getCityOnManufac") {
		talukaId = $('#talukaName').val();
	} else if (categoryName == "getCityOnGRN") {
		talukaId = $('#talukaFromAddress').val();
		var hiddenTalukaName = $("#talukaFromAddress option:selected").text();
		document.getElementById("hiddenTalukaFromAddress").value = hiddenTalukaName;
	} else if (categoryName == "getCityOnPurInv") {
		talukaId = $('#talukaFromAddress').val();
		var hiddenTalukaName = $("#talukaFromAddress option:selected").text();
		document.getElementById("hiddenTalukaFromPartyMaster").value = hiddenTalukaName;
	} else if (categoryName == "getCityOnPartyMaster") {
		talukaId = $('#talukaFromAddress').val();
		var hiddenTalukaName = $("#talukaFromAddress option:selected").text();
		document.getElementById("hiddenTalukaFromPartyMaster").value = hiddenTalukaName;
	}

	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllCityByTalukaId",
				data : {
					"talukaId" : talukaId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' class='col-md-12'><option value='0'>---Select City---</option>";

					for ( var i = 0; i < r.cityList.length; i++) {
						divContent = divContent + "<option value='"
								+ r.cityList[i].city_ID + "'  >"
								+ r.cityList[i].cityName + "</option>";
					}
					divContent = divContent + "</select>";

					if (categoryName == "getCityOnPO") {
						$("#cityIdPO").html(divContent);
						$("#cityIdPO").select2();
					} else if (categoryName == "getCityOnManufac") {
						$("#cityName").html(divContent);
						$("#cityName").select2();
					} else if (categoryName == "getCityOnGRN") {
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();
					} else if (categoryName == "getCityOnPurInv") {
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();
					} else if (categoryName == "getCityOnPartyMaster") {
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();
					}
				}
			});
}

function getSelectedCityName(inputID) {

	var cityId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getLocalityOnPartyMaster") {
		cityId = $('#cityFromAddress').val();
		var hiddenCityName = $("#cityFromAddress option:selected").text();
		document.getElementById("hiddenCityFromPartyMaster").value = hiddenCityName;
	} else if (categoryName == "getLocalityOnGRN") {
		cityId = $('#cityFromAddress').val();
		var hiddenCityName = $("#cityFromAddress option:selected").text();
		document.getElementById("hiddenCityFromAddress").value = hiddenCityName;
	} else if (categoryName == "getLocalityOnPurInv") {
		cityId = $('#cityFromAddress').val();
		var hiddenCityName = $("#cityFromAddress option:selected").text();
		document.getElementById("hiddenCityFromPartyMaster").value = hiddenCityName;
	} else {
		var hiddenCityName = $("#cityIdPO option:selected").text();
		document.getElementById("hiddenCityName").value = hiddenCityName;
	}

}

function getSelectedCountryName(inputID) {
	var countryId = "";
	var categoryName = $("#" + inputID).attr('data-name');
	if (categoryName == "getStateOnPartyMaster") {
		countryId = $('#countryFromAddress').val();
		var hiddenCountryName = $("#countryFromAddress option:selected").text();
		document.getElementById("hiddenCountryFromPartyMaster").value = hiddenCountryName;
	} else if (categoryName == "getStateGRN") {
		countryId = $('#countryFromAddress').val();
		var hiddenCountryName = $("#countryFromAddress option:selected").text();
		document.getElementById("hiddenCountryFromAddress").value = hiddenCountryName;
	} else if (categoryName == "getStatePurInv") {
		countryId = $('#countryFromAddress').val();
		var hiddenCountryName = $("#countryFromAddress option:selected").text();
		document.getElementById("hiddenCountryFromPartyMaster").value = hiddenCountryName;
	} else {
		var hiddenCountryName = $("#countryIdPO option:selected").text();
		document.getElementById("hiddenCountryName").value = hiddenCountryName;
	}
}

/*******************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Check uncheck all checkbox in table
 ******************************************************************************/
function toggleEntryDiv(id) {
	if (id == "divForEdit") {
		$("#divForEntry").show('slow');
	} else if (id == "divForEntry") {
		$("#divForEntry").toggle('slow');
	} else if (id == "divForCategory") {
		$("#divForCategory").toggle('slow');
	} else if (id == "divForEditCategory") {
		$("#divForCategory").show('slow');
	}
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 05-March-2020
 * @codeFor : Get Prepaid Details 
 ******************************************************************************/
function getPrepaidDetails(){
	$("#prepaidDetails").show();
	$("#postPaidDetaisls").hide();
//	$("#creditDay").val(0);
//	$("#creditAmt").val(0);
//	$("#remindernPercentagePostPaid").val(0);
//	 $("#blockOnpercentagePostPaid").val(0);
//	 $("#reminderOnCreditDay").val(0);
//	 $("#blockOnCreditDay").val(0);
}
/*******************************************************************************
 * @author : Akshata Desai
 * @date : 05-March-2020
 * @codeFor : Get Postpaid Details 
 ******************************************************************************/
function getPostPaidDetails(){
	$("#prepaidDetails").hide();
	$("#postPaidDetaisls").show();
	/*$("#advanceAmount").val(0);
	$("#prePaidDay").val(0);
	$("#reminderOnPrePaidDay").val(0);
	$("#reminderOnPercentagePrepaid").val(0);
	$("#blockOnpercentagePrepaid").val(0);
	$("#blockOnPrePaidDay").val(0);*/
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 06-March-2020
 * @codeFor : search Autosuggestion for Business Lab Details
 ******************************************************************************/
function getAutoBusinessLabMaster(businessMasterId) {
	var resultData = [];
	var businessMasterName = $("input#" + businessMasterId).val();

	if (businessMasterName == "" || businessMasterName == null
			|| businessMasterName == "null" || businessMasterName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + businessMasterId).focus();
		return false;
	}

	var flag = $("input[name='state']:checked").val();
	var unitId = $("#userUnitId").val()


	var inputs = [];
	inputs.push('name=' + businessMasterName);
	inputs.push('type=' + 2);
	inputs.push('flag=' + flag);
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/businessCustMaster/businessMasterAutoSuggestion",
				cache : false,
				success : function(response) {
					businessLabMasterTemplate(response)
					businessMasterTemplate(response)
					businessMasterTemplate1(response)
					
					if (response.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
	
					for ( var j = 0; j < response.businessMasterDto.length; j++) {
						var arrValue = response.businessMasterDto[j].id + "-"
								+ response.businessMasterDto[j].name;
						var idValue = response.businessMasterDto[j].id;
						var labName = response.businessMasterDto[j].name;
						var unitId = response.businessMasterDto[j].unitId;
						
						var unitName = response.businessMasterDto[j].unitName;
						resultData.push({
							ID : idValue,
							Name : labName,
							unitId : unitId,
							UName : unitName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
							function() {
								$("div#partyMasterByName .typeahead").html(
										template);
								$("div#partyMasterByName .typeahead").show();

								$("input#" + businessMasterId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + businessMasterId).data('typeahead').source = resultData;
							}, 500);
				}
			});////unit_name_id

	function displayResult(item) {
		var res = item.text.split('-');
		var businessId = res[0];
		var labName = res[1];
		//var unitName = res[2];
		getBusinessLabMasterByIdForLab(businessId);
		$("input#" + businessMasterId).val(labName);
	}
}

function getBusinessLabMasterById(businessId) {

	var inputs = [];
	inputs.push('id=' + businessId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/businessCustMaster/getBusinessLabMasterById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					alert(JSON.stringify(response));
					businessMasterTemplate(response, "searchPartyMaster");
					businessMasterTemplate1(response, "searchPartyMaster");
					$("#seachPartyMaster").focus();
					$('#seachPartyMaster').val("");
					var businessMaster = response;// JSON.stringify(response);
					var myGenralnfoObj = "";
					for ( var i = 0; i < response.businessMasterDto.length; i++) {
						if (businessMaster.businessMasterGeneralInfoDto[i].business_master_id == businessId) {
							myGenralnfoObj = businessMaster.businessMasterGeneralInfoDto[i];
							break;
						}
					}
					$("#grnMobileNo").val(myGenralnfoObj.mobile);
				}
			});
}

/*******************************************************************************
 * @author : Akshata Desai
 * @date : 06-March-2020
 * @codeFor : Get all Business Lab Details
 ******************************************************************************/
function getAllBusinessLabMaster() {
	var startIndex=0;
    var type=2;
    var radioValue1 = $("input[name='state']:checked").val();
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('startIndex=' +startIndex);
	inputs.push('radioval=' + radioValue1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessLabMaster",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			businessLabMasterTemplate(r, "allBusinessLabMaster");
			businessMasterTemplate1(r, "allBusinessLabMaster");
			//setPaginationTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

function businessLabMasterTemplate(response, callFrom) {

	var htm = "";
	var index = 1;
	
	var radioValue1 = $("input[name='state']:checked").val();
//===============================================================================//	
	//added by prayag for ticket_id SA_082
	var active = $("#activePage").val();

	var newactiveIndex = 0;
	var activeIndex = 1;

	if(active == "" || active == 0 || active == undefined || active == "undefined")
	{
		active = 0;
	} else {
		active = parseInt(active - 1);
	}
//==============================================================================//	
	if (callFrom === "allBusinessLabMaster") {
		for ( var i = 0; i < response.businessMasterDto.length; i++) {
			//===============code added by prayag
			if(active == 0)
			{
				activeIndex = (i+1);
			} else {
				
				var numberForm = parseInt(active + '' + (i+1));
				
				if(i == 9)
				{					
					activeIndex = parseInt(newactiveIndex + 1);
					
				} else {
					activeIndex = numberForm;
					
					if(i == 8)
					{
						newactiveIndex = activeIndex;
					}
				}
			}
			//=====================================//
			if(radioValue1 == "active"){
				
				if(response.businessMasterDto[i].status == "Active"){
					
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ activeIndex
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].regNo
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].paymentFlag
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].unitName
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					index++;
				}
			}else if(radioValue1 == "inactive"){
				
				if(response.businessMasterDto[i].status == "Inactive"){
					
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ activeIndex
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].regNo
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].paymentFlag
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].unitName
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					index++;
				}
			}else{
				
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ activeIndex
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].regNo
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].paymentFlag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].unitName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				index++;
			}			
		}
	} else if (callFrom === "searchPartyMaster") {

		for ( var i = 0; i < response.businessMasterDto.length; i++) {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].regNo
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].paymentFlag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].unitName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
				+ response.businessMasterDto[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		}
	}
	$("#businessLabMasterList").html(htm);
	
}
function getUnitListForInouseLab(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/registration/getUnitList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var unitlistTemp = "";
			unitlistTemp = unitlistTemp
					+ "<option value='0'>--Select unit--</option>";
			for (var i = 0; i < r.length; i++) {
				unitlistTemp = unitlistTemp + "<option value="
						+ r[i].unitId + " data-name=" + r[i].unitName + ">"
						+ r[i].unitName+"("+r[i].unitCode+")" + "</option>";
			}
			$("#unitList").html(unitlistTemp);
		}
	});
}

//by Akash for lookup of lab type 
function setLookupDesc(r){
	var dropList = "<option value='0'>-select-</option>";	
	var defaValue = "";
	var masterId = $("#masterIdd").val();
	for(var i = 0; i < r.tmCmLookupDetLookupList.length; i++) {
		 labId = r.tmCmLookupDetLookupList[0].lookupDetId;
		var kitID = r.tmCmLookupDetLookupList[i].lookupDetId;
		var kitDesc =r.tmCmLookupDetLookupList[i].lookupDetDescEn;
		var kitDescN =r.tmCmLookupDetLookupList[i].lookupDetValue;
		
		if(r.tmCmLookupDetLookupList[i].lookupDetId == masterId && r.tmCmLookupDetLookupList[i].lookupDetDescEn == masterId){
			defaValue = kitLookup;
		}
			
		dropList = dropList + "<option value=" + kitID+" data-name="+kitDescN+">" +r.tmCmLookupDetLookupList[i].lookupDetDescEn+"</option>";
}
$("#lookupDetIdLay").html(dropList);
$("#lookupDetIdLay").select2();
	
}

///////////////new start
/*
//by Akash for lookup of lab/b2b/cc
function setLookupHierDesc(response){
	var dropList = "<option value='0'>-select-</option>";	
	var defaValue = "";
	var masterId = $("#masterIdd").val();
	for(var i = 0; i < response.tmCmLookupDetHierarchical.length; i++) {
		var kitID = response.tmCmLookupDetHierarchical[i].lookupDetHierId;
		var kitDesc =response.tmCmLookupDetHierarchical[i].lookupDetHierDescEn;
		
		if(response.tmCmLookupDetHierarchical[i].lookupDetHierId == masterId && response.tmCmLookupDetHierarchical[i].lookupDetHierDescEn == masterId){
			defaValue = kitLookup;
		}
			
		dropList = dropList + "<option value=" + kitID+" data-name="+kitID+">" +response.tmCmLookupDetHierarchical[i].lookupDetHierDescEn+"</option>";
}
$("#unitList").html(dropList);
$("#unitList").select2();
	
}
*/

//by Akash for lookup of lab/b2b/cc
function setLookupHierDesc(response){
	var dropList = "<option value='0'>-select-</option>";	
	var defaValue = "";
	var masterId = $("#masterIdd").val();
	for(var i = 0; i < response.businessMasterDto.length; i++) {
		var kitID = response.businessMasterDto[i].id;
		var kitDesc =response.businessMasterDto[i].name;
		var kitDescN =response.businessMasterDto[i].collectionCentreName;
		
		if(response.businessMasterDto[i].id == masterId && response.businessMasterDto[i].name == masterId){
			defaValue = kitLookup;
		}
			
		dropList = dropList + "<option value=" + kitID+" data-name="+kitID+">" +response.businessMasterDto[i].name+"</option>";
}
$("#parentId").html(dropList);
$("#parentId").select2();
	
}

//by Akash for lookup of lab/b2b/cc
var labDropdownURL ="ehat/businessCustMaster/labDropdown";
	 function labDropdown() {
	      //------manish
		   //const lookupDetId = document.getElementById('lookupDetIdLay').value;
			 var lookupDetId =labId;
			 var detCode = $("#lookupDetIdLay option:selected").attr('data-name');
			 
			 if (detCode =='LAB')
			{ //$("#unitId").hide();
				$("#beds").hide();
				$("#Hosptype").hide(); 
				$("#redioBtn").hide();
				 $("#inhouseLab").hide();
				 $("#paymentInfo").show();
			}
			 if (detCode =='HOS')
			 {
				 $("#beds").hide();
				 $("#Hosptype").show();
				 $("#redioBtn").hide();
				 $("#inhouseLab").hide();
				 //$("#unitId").hide();
				 $("#paymentInfo").show();
			 }
			 if (detCode =='CEC')
			 {
				 $("#beds").hide();
				 $("#Hosptype").hide();
				 $("#redioBtn").hide();
				 $("#inhouseLab").hide();
				 //$("#unitId").hide();
				 $("#paymentInfo").show();
			 }
			 if (detCode =='CLI')
			 {
				 //$("#unitId").hide();
				 $("#beds").hide();
				 $("#Hosptype").hide();
				 $("#redioBtn").hide();
				 $("#inhouseLab").hide();
				 $("#paymentInfo").show();
			 }
			 if (detCode =='IHL')
			 {
				 //$("#unitId").show();
				 $("#beds").hide();
				 $("#Hosptype").hide();
				 $("#redioBtn").hide();
				 $("#inhouseLab").hide();
				 $("#paymentInfo").hide();
				 
			 }
			 if (detCode =='B2B-B')
			 {
				 //$("#unitId").show();
				 $("#beds").hide();
				 $("#Hosptype").hide();
				 $("#redioBtn").hide();
				 $("#inhouseLab").hide();
				 $("#paymentInfo").hide();
				 
			 }
			 //-------manish new
		   jQuery.ajax({
				async : false,
				type : "GET",
				url: `${labDropdownURL}?lookupDetId=${lookupDetId}`,					
				catche : false,
	      
	            success: function (response) {
	            	//setLookupDesc(r);
	            	setLookupHierDesc(response);
	              
	            }, error: function () {
	                alert("data not found");
	            }
	        })
	    };
	    function getUnitListForInouseLab(){
	    	jQuery.ajax({
	    		async : false,
	    		type : "GET",
	    		url : "ehat/registration/getUnitList",
	    		catche : false,
	    		error : function() {
	    			alert('error');
	    		},
	    		success : function(r) {
	    			var unitlistTemp = "";
	    			unitlistTemp = unitlistTemp
	    					+ "<option value='0'>--Select unit--</option>";
	    			for (var i = 0; i < r.length; i++) {
	    				unitlistTemp = unitlistTemp + "<option value="
	    						+ r[i].unitId + " data-name=" + r[i].unitName + ">"
	    						+ r[i].unitName+"("+r[i].unitCode+")" + "</option>";
	    			}
	    			$("#unitList").html(unitlistTemp);
	    		}
	    	});
	    }
	    
	    function toggleSwitch(id) {
	    	
	    	var sel = $("#" + id).data('title');
	    	var tog = $("#" + id).data('toggle');
	    	$('#' + tog).prop('value', sel);
	    	$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]')
	    			.removeClass('active').addClass('notActive');
	    	$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass(
	    			'notActive').addClass('active');
	    }
	    ///////////////new end

function getUnitList(){
	//var type = 2;
	var type = 1;
	var inputs = [];
	
	inputs.push('type=' + type);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessMaster",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			
			var unitlistTemp = "";
			unitlistTemp = unitlistTemp
					+ "<option value='0'>--Select Lab--</option>";
			for (var i = 0; i < response.businessMasterDto.length; i++) {
				unitlistTemp = unitlistTemp + "<option value="
						+ response.businessMasterDto[i].id + " data-name=" + response.businessMasterDto[i].name + ">"
						+  response.businessMasterDto[i].name + "</option>";
			}
			$("#unitList").html(unitlistTemp);
		}
	});
	
	/*
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/registration/getUnitList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var unitlistTemp = "";
			unitlistTemp = unitlistTemp
					+ "<option value='0'>--Select unit--</option>";
			for (var i = 0; i < r.length; i++) {
				unitlistTemp = unitlistTemp + "<option value="
						+ r[i].unitId + " data-name=" + r[i].unitName + ">"
						+ r[i].unitName+"("+r[i].unitCode+")" + "</option>";
			}
			$("#unitList").html(unitlistTemp);
		}
	});
}
*/
}

function businessMasterTemplate1(response, callFrom) {
	
	var htm = "";
	var index = 1;
	
	var active = $("#activePage").val();

	var newactiveIndex = 0;
	var activeIndex = 1;

	if(active == "" || active == 0 || active == undefined || active == "undefined")
	{
		active = 0;
	} else {
		active = parseInt(active - 1);
	}
	
	var radioValue = $("input[name='state']:checked").val();
	
	if (callFrom === "allBusinessMaster") {
		for ( var i = 0; i < response.businessMasterDto.length; i++) {
			
			if(active == 0)
			{
				activeIndex = (i+1);
			} else {
				
				var numberForm = parseInt(active + '' + (i+1));
				
				if(i == 9)
				{					
					activeIndex = parseInt(newactiveIndex + 1);
					
				} else {
					activeIndex = numberForm;
					
					if(i == 8)
					{
						newactiveIndex = activeIndex;
					}
				}
			}
			
			if(radioValue == "active"){
				
				if(response.businessMasterDto[i].status == "Active"){
					
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ activeIndex
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].regNo
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					activeIndex++;
				}
			}else if(radioValue == "inactive"){
				
				if(response.businessMasterDto[i].status == "Inactive"){
					
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ activeIndex
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].regNo
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					activeIndex++;
				}
			}else{
				
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ activeIndex
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].regNo
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				activeIndex++;
			}			
		}
	} else if (callFrom === "searchPartyMaster") {

		for ( var i = 0; i < response.businessMasterDto.length; i++) {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].regNo
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].paymentFlag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].unitName
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
				+ response.id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
				+ response.id + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		}

	}
	$("#businessMasterList1").html(htm);
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 124-June-2020
 * @codeFor : getBusinessLabMasterByIdForLab
 ******************************************************************************/

function getBusinessLabMasterByIdForLab(businessId) {
	
	var flag = $("input[name='state']:checked").val();
	var unitId = $("#userUnitId").val()

	var inputs = [];
	inputs.push('id=' + businessId);
		inputs.push('unitId=' + unitId);
		inputs.push('flag=' + flag)

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/businessCustMaster/getBusinessMasterById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					
					businessLabMasterTemplate(response, "searchPartyMaster");
					businessMasterTemplate1(response, "searchPartyMaster");
					
					$("#seachPartyMaster").focus();
					$('#seachPartyMaster').val("");
					var businessMaster = response;// JSON.stringify(response);
					var myGenralnfoObj = "";
					/*for ( var i = 0; i < businessMasterDto.businessMasterGeneralInfoDto.length; i++) {
						if (businessMasterDto.businessMasterGeneralInfoDto[i].business_master_id == businessId) {
							myGenralnfoObj = businessMaster.businessMasterGeneralInfoDto[i];
							break;
						}
					}*/
					for ( var i = 0; i < response.businessMasterDto.length; i++) {
						if (businessMasterDto.businessMasterGeneralInfoDto[i].business_master_id == businessId) {
							myGenralnfoObj = businessMasterDto.businessMasterGeneralInfoDto[i];
							break;
						}
					}

					
					$("#grnMobileNo").val(myGenralnfoObj.mobile);
				}
			});
}


function businessMasterTemplate1(response, callFrom) {
	
	var htm = "";
	var index = 1;
	
	var radioValue = $("input[name='state']:checked").val();
	
	if (callFrom === "allBusinessMaster") {
		for ( var i = 0; i < response.businessMasterDto.length; i++) {
			
			if(radioValue == "active"){
				
				if(response.businessMasterDto[i].status == "Active"){
					
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].paymentFlag
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].unitName
					+ '</td>'
					
					
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					index++;
				}
			}else if(radioValue == "inactive"){
				
				if(response.businessMasterDto[i].status == "Inactive"){
					
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].name
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].code
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].regNo
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].paymentFlag
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].unitName
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
					+ response.businessMasterDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					index++;
				}
			}else{
				
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].regNo
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].paymentFlag
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
					+ response.businessMasterDto[i].unitName
					+ '</td>'
					
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
				+ response.businessMasterDto[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				index++;
			}			
		}
	} else if (callFrom === "searchPartyMaster") {
      				for ( var i = 0; i < response.businessMasterDto.length; i++) {
	
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].name
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].code
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].status
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.businessMasterDto[i].paymentFlag
				+ '</td>'
				
				
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editBusinessMaster('
				+ response.id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deleteBusinessMaster('
				+ response.id + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
      }
	}
	$("#businessLabMasterList1").html(htm);
}

/**
 * @author Rohit Sandbhor
 * @since 16-02-2022
 * @codeFor to get collections center list while generation of lab
 */


function getCollectionCenterList(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/registration/getCollectionCenterList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var collectionCenterTemp = "";
			collectionCenterTemp = collectionCenterTemp
					+ "<option value='0'>--Select Collection Centre--</option>";
			for (var i = 0; i < r.length; i++) {
				collectionCenterTemp = collectionCenterTemp + "<option value="
						+ r[i].id + " data-name=" + r[i].name + ">"
						+ r[i].name+"</option>";
			}
			$("#collectionCenterList").html(collectionCenterTemp);
		}
	});
}

function getAllMarketingPersonsList(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/businessCustMaster/getAllMarkettingPersonsList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var marketingPerson = "";
			marketingPerson = marketingPerson
					+ "<option value=' '>--Select Name--</option>";
			for (var i = 0; i < r.length; i++) {
				
				marketingPerson = marketingPerson + '<option value="'
						 +(r[i].f_name+" "+r[i].m_name+" "+r[i].l_name)+ '">'+r[i].f_name+" "
						+r[i].m_name+" "+r[i].l_name+'</option>';
			}
			$("#marketingPerson").html(marketingPerson);
		}
	});
}


//added by prayag to check if marketing Person assigned to client
function checkIfMarketingPersonAssigned(){
	var businessMasterId = $("#partyMasterId").val();
	var result = 0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"businessMasterId" : businessMasterId
		},
		url : "ehat/businessCustMaster/checkIfMarketingPersonAssigned",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			result = r;
		}
	});
	return result;
}
/*function validateInhouseLab(){
//	var unitList = $("#unitList").val();
//	if()
	
}*/

function fetchCountry()
{
	jQuery.ajax({
		
		type : "GET",
		url : "ehat/country/masters/getAllCountryByCountryname",
		cache : false,
		success : function(r){

			var htm = "";
			
			var indiaCountry = 0;
			var fromRange = 0;
			var toRange = 0;
			
			for ( var i = 0; i < r.lstCountrydto.length; i++) {
				htm = htm + "<option value='"+r.lstCountrydto[i].idCountryPK+"'>"+r.lstCountrydto[i].countryName+"</option>";
					
				if(r.lstCountrydto[i].countryName == "INDIA" || r.lstCountrydto[i].countryName == "India" || r.lstCountrydto[i].countryName == "india")
				{
					indiaCountry = r.lstCountrydto[i].idCountryPK;
					fromRange = r.lstCountrydto[i].fromRange;
					toRange = r.lstCountrydto[i].toRange;					
				}
					
			}
			
			$("#countryFromAddress").html(htm);
			
			$("#countryFromAddress").val(indiaCountry).select2();
			$("#mobileFromRange").val(fromRange);
			$("#mobileToRange").val(toRange);

			$("#mobile").attr('minlength', fromRange);
			$("#mobile").attr('maxlength', toRange);
			
			
			var htm1 = "";
			
			for ( var i = 0; i < r.lstCountrydto.length; i++) {
				htm1 = htm1 + "<div id='fromRange"+r.lstCountrydto[i].idCountryPK+"' >"+r.lstCountrydto[i].fromRange+"</div>";	
				htm1 = htm1 + "<div id='toRange"+r.lstCountrydto[i].idCountryPK+"' >"+r.lstCountrydto[i].toRange+"</div>";					
			}
			 // countryName, countryCode, fromRange, toRange,
			$("#countrydata").html(htm1);

		}
	
	});
}

//added by prayag for ticket_id SA_039
function setPaginationTemplate(r){
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
			numberOfRows +="<li onclick='labMasterPagination("+index+","+Math.ceil(numberOfPages)+");'><a>"+index+"</a></li>";
		}else{
			numberOfRows +="<li onclick='labMasterPagination("+index+","+Math.ceil(numberOfPages)+");'><a>"+index+"</a></li>";
		}
		index = index + 1;
	}
	if(numberOfPages > 5){
		numberOfRows +="<li class='next' onclick='nextLabMasterPagination("+index+","+Math.ceil(numberOfPages)+");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	}
	if(count == 0)
		$('#labMasterNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
	else{
		$('#labMasterNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
		$('#labMasterjumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='labMasterPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='labMasterJumpToPage("+Math.ceil(numberOfPages)+");'>Go</button></a></li>");
	}
	$('#labMasterPagination').html(numberOfRows);
}

function labMasterPagination(pageNumber,numberOfPages){
	$("#activePage").val(pageNumber);
	var radioValue1 = $("input[name='state']:checked").val();
    var type=2;
    var startIndex = (pageNumber - 1) + "0";
    
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('startIndex=' +startIndex);
	inputs.push('radioval=' +radioValue1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessMasterForPagination",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//setLookupDesc(r);
		//	businessMasterTemplate(r, "allBusinessMaster");
			businessLabMasterTemplate(r, "allBusinessLabMaster");
			businessMasterTemplate1(r, "allBusinessMaster");
			//setlabType();
			/*setTimeout(function() {
				userAccess();
			}, 100);*/
			$('#labMasterNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
		}
	});
	
}

function nextLabMasterPagination(currentIndex, numberOfPages){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousLabMasterPagination('+currentIndex+','+Math.round(numberOfPages)+');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="labMasterPagination('+j+', '+Math.round(numberOfPages)+')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="nextLabMasterPagination('+j+','+Math.round(numberOfPages)+')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	$('#labMasterPagination').html(numberOfRows);
	
	labMasterPagination(currentIndex, numberOfPages);
}

function labMasterJumpToPage(numberOfPages){
	var pageNo = 0;
	
	pageNo = $("#labMasterPageNumber").val();
	
	if(pageNo <= numberOfPages){
		labMasterPagination(pageNo,numberOfPages);
	}else{
		alert("Invalid page number.");
	}
	
	$("#labMasterPageNumber").val(0);
}

function previousLabMasterPagination(currentIndex, numberOfPages){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousLabMasterPagination('+displayPagination+','+Math.round(numberOfPages)+')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="labMasterPagination('+j+', '+Math.round(numberOfPages)+')"><a>'+j+'</a></li>';
	}
	numberOfRows +='<li class="next" onclick="nextLabMasterPagination('+j+','+Math.round(numberOfPages)+')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	$('#labMastertPagination').html(numberOfRows);

	labMasterPagination(displayPagination, numberOfPages);
}

function getAllBusinessMasterForPagination(flag){
	var radioValue1 = $("input[name='state']:checked").val();
	var type=2;
	var flag =flag;
	if(flag == undefined || flag == null){
		flag="";
	}else if(flag == "E" ) {
		$("#btnExport").hide();
		$("#btnExporting").show();
	}
	var startIndex=0;
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('startIndex=' +startIndex);
	inputs.push('radioval=' +radioValue1);
	inputs.push('flag=' + flag)
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessMasterForPagination",
		timeout : 1000 * 60 * 5,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {	
		//setLookupDesc(r);
		//	businessMasterTemplate(r, "allBusinessMaster");
			businessLabMasterTemplate(r, "allBusinessLabMaster");
			businessMasterTemplate1(r, "allBusinessMaster");
			setPaginationTemplate(r);
			
			//setlabType();
			/*setTimeout(function() {
				userAccess();
			}, 100);*/
			
			if(flag=="E"){
				$("#btnExporting").show();
				$("#btnExport").hide();
			var tbl = "<table id='runtime'><thead><tr><th style='font-weight:bold; background-color: #92D050'>Sr.No</th><th style='font-weight:bold; background-color: #92D050'>ID</th><th style='font-weight:bold; background-color: #92D050'>Lab Name</th><th style='font-weight:bold; background-color: #92D050'>Lab Code</th><th style='font-weight:bold; background-color: #92D050'>Registration No</th><th style='font-weight:bold; background-color: #92D050'>Payment Type</th><th style='font-weight:bold; background-color: #92D050'>Unit Name</th></tr></thead>";
			tbl = tbl + " <tbody>";
			for (i = 0; i < r.businessMasterDto.length; i++) {
				var activeindex= (i+1);
				tbl = tbl + "<tr><td style='font-weight:bold;'>" + activeindex + "</td><td style='font-weight:bold;'>" + r.businessMasterDto[i].id + "</td><td>" + r.businessMasterDto[i].name + "</td><td>" + r.businessMasterDto[i].code + "</td><td>" + r.businessMasterDto[i].regNo + "</td><td>" + r.businessMasterDto[i].paymentFlag + "</td><td>" + r.businessMasterDto[i].unitName + "</td></tr>";
			}
			tbl = tbl + "</tbody style='font-weight:bold;'></table>";
			$("#runtimeDiv").html(tbl);
			$("#runtime").hide();
			var dt = new Date();
			 var day = dt.getDate();
			 var month = dt.getMonth() + 1;
			 var year = dt.getFullYear();
			
			 var postfix = day + "." + month + "." + year;
			TableToExcel.convert(document.getElementById("runtime"), {
				name: "Business_Lab_Master "+postfix+".xlsx",
				sheet: {
					name: "Sheet1"
				}
			});
			
			}
			$("#btnExporting").hide();
			$("#btnExport").show();
			
		} 
		
	});
	if(flag=="E"){
		setTimeout(function() {
			location.reload();
			
		}, 1000);
	}
	
}


//Function For ExcelExport (BALMUKUND)

function ExcelExport(){
	$("#btnExport").hide();
	$("#btnExporting").show();
	getAllBusinessMasterForPagination("E");
}

//pagination code end

//===================================================================================//
//added by prayag for ticket_id GS_897

function testReminderOnPrepaidDay(id){
	var prePaidDayTest = parseFloat($("#prePaidDay").val());
	var reminderOnPrePaidDayTest = parseFloat($("#reminderOnPrePaidDay").val());
	
	if ($("#prepaid").prop("checked")) {
		
	    if(reminderOnPrePaidDayTest > prePaidDayTest){
		   alert("Reminder on prepaid day cannot be greater than prepaid day");
		   $('#' + id).val("");
		   return false;
	    }
	}
	
}

function testBlockOnPrepaidDay(id){
	var prePaidDayT = parseFloat($("#prePaidDay").val());

	var blockOnPrePaidDayT = parseFloat($("#blockOnPrePaidDay").val());
	
	if ($("#prepaid").prop("checked")) {
		
	    if(blockOnPrePaidDayT > prePaidDayT){
		    alert("Block on prepaid day cannot be greater than prepaid day");
		    $('#' + id).val("");
		    return false;
	    }
	}
	
}
//issue
function testBlockOnPrepaidDayCompare(id){
	var blockOnPrePaidDayT = parseFloat($("#blockOnPrePaidDay").val());
	var reminderOnPrePaidDayTest = parseFloat($("#reminderOnPrePaidDay").val());


	if ($("#prepaid").prop("checked")) {
		if(reminderOnPrePaidDayTest > blockOnPrePaidDayT){
		    alert("Reminder on prepaid day cannot be greater than Block on prepaid day");
		    $('#' + id).val("");
		    return false;
	    }
	}
}//AK_630 
function testReminderOnPercentage(id){
	var reminderOnPercentagePrepaid = parseFloat($("#reminderOnPercentagePrepaid").val());
	var blockOnpercentagePrepaid = parseFloat($("#blockOnpercentagePrepaid").val());
	if ($("#prepaid").prop("checked")) {
	 if(reminderOnPercentagePrepaid > blockOnpercentagePrepaid){
	 alert("Reminder on percentage prepaid cannot be greater than Block on percentage prepaid");
	  $('#' + id).val("");
	    return false;
	 }
  }
	}

function testReminderOnCreditDay(id){

	var creditDayTest = parseFloat($("#creditDay").val());
	var reminderOnCreditDayTest = parseFloat($("#reminderOnCreditDay").val());
	
	if ($("#postpaid").prop("checked")) {
		
	   if(reminderOnCreditDayTest > creditDayTest){
		    alert("Reminder on credit day cannot be greater than credit day");
		    $('#' + id).val("");
		    return false;
       }
	}
	
}

function testBlockOnCreditDay(id){

	var creditDayT = parseFloat($("#creditDay").val());
	var blockOnCreditDayT = parseFloat($("#blockOnCreditDay").val());
	
	if ($("#postpaid").prop("checked")) {
		
	   if(blockOnCreditDayT > creditDayT){
		    alert("Block on credit day cannot be greater than credit day");
		    $('#' + id).val("");
		    return false;
       }
	}
	
}//AK_630
function testReminderOnPercentagePostPaid(id){
	var reminderOnPercentagePostpaid = parseFloat($("#remindernPercentagePostPaid").val());
	var blockOnpercentagePostpaid = parseFloat($("#blockOnpercentagePostPaid").val());
	if ($("#postpaid").prop("checked")) {
	 if(reminderOnPercentagePostpaid > blockOnpercentagePostpaid){
	 alert("Reminder on percentage postpaid cannot be greater than Block on percentage postpaid");
	  $('#' + id).val("");
	    return false;
	 }
  }
	}
	
	/*All unit*/
	function getAllUnitDropdown() {

	
	jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/unit/fetchUnitList",

				success : function(r) {
					console.log(r);
					var unitlistTemp1 = "";
					unitlistTemp1 = unitlistTemp1
							+ "<option value='0'>--Select unit--</option>";
					for (var i = 0; i < r.lstUnit.length; i++) {
						unitlistTemp1 = unitlistTemp1 + "<option value="
								+ r.lstUnit[i].unitId + " data-code=" + r.lstUnit[i].unitCode + ">"
								+ r.lstUnit[i].unitName + "</option>";
								//+ r.lstUnit[i].unitName+"("+r.lstUnit[i].unitCode+")" + "</option>";
					}
					$("#unitList").html(unitlistTemp1).select2();
					
				}
			});
}



function getAllBankName() {

	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/bank/getAllBanks",

				success : function(r) {
					console.log(r);
					var banklistTemp1 = "";
					banklistTemp1 = banklistTemp1
							+ "<option value='0'>--Select bank--</option>";
					for (var i = 0; i < r.ltBankMaster.length; i++) {
						banklistTemp1 = banklistTemp1 + "<option value="
								+ r.ltBankMaster[i].bankId + ">"
								+ r.ltBankMaster[i].bankName + "</option>";
								//+ r.lstUnit[i].unitName+"("+r.lstUnit[i].unitCode+")" + "</option>";
					}
					$("#bankList").html(banklistTemp1).select2();
					
				}
			});
}


$(document).ready(function() {
	getAllBankName()
	})
	
	
function getParentBalanceUtilization(){
		jQuery
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/title/getParentBalanceUtilization",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var dropList = "<option value='0'>--Select --</option>";
					for (var i = 0; i < r.tmCmLookupDetLookupList.length; i++) {
						labId = r.tmCmLookupDetLookupList[0].lookupDetId;
						var kitID = r.tmCmLookupDetLookupList[i].lookupDetId;
						var kitDesc = r.tmCmLookupDetLookupList[i].lookupDetDescEn;
						var kitDescN = r.tmCmLookupDetLookupList[i].lookupDetValue;

						dropList = dropList + "<option value=" + kitDesc
								+ " data-name=" + kitDesc + ">"
								+ r.tmCmLookupDetLookupList[i].lookupDetDescEn
								+ "</option>";
					}
					$("#pbutilization").html(dropList).select2();
				}
			});



	}

