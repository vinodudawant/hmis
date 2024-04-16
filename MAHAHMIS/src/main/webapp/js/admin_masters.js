/* ========== Expense Voucher Groups Master ========== */

function toggleEntryForReasonOfVisist(id)
{
	
	$("#divForReasonEntry").show('slow');
	}
function toggleEntryDiv(id){
	
	if(id=="divForVoucherEdit"){
		$("#divForVoucherEntry").show('slow');
	}else if (id == "divForLedgerHeadEdit"){
		$("#divForLedgerHeadEntry").show('slow');
	}else if (id == "divForReasonEdit"){
		$("#divForReasonEntry").show('slow');
	}
	else if (id == "divForVoucherEntry"){
		getNextId("voucherFrom");
		$("#divForVoucherEntry").toggle('slow');
	}else if (id == "divForLedgerHeadEntry"){
		getNextId("ledgerHeadFrom");
		$("#divForLedgerHeadEntry").toggle('slow');
	}else if (id == "divForReasonEntry"){
		
		$("#divForReasonEntry").show('slow');
		getNextId("reasonOfVisitFrom");
		
	}	
}

function saveVoucherMaster() {
	
	var voucherId = $("#voucherid").val();
	var voucherName = $("#vouchername").val();
	
	if (voucherName == null || voucherName == "" || voucherName == undefined) {
			alert("Please enter Voucher Name.");
			$("#vouchername").val("");
			return false;
		}

	var inputs = [];
	inputs.push('voucher_ID=' + voucherId);
	inputs.push('voucherName=' + voucherName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savevouchermaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			resetVoucherMaster();
			defaultViewVoucher("onload");
			toggleEntryDiv("divForVoucherEntry");
		}
	});
}

function resetVoucherMaster() {
	
	$("#vouchername").val("");
}

function getNextId(callFrom) {
	var inputs = [];
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getnextid",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "voucherFrom")
				$("#voucherid").val(r);
			else if(callFrom == "ledgerHeadFrom")
				$("#lid").val(r);
			else if(callFrom == "reasonOfVisitFrom")
				$("#reasonofvisitid").val(r);
		}
	});
}

function defaultViewVoucher(callFrom){
	var inputs = [];
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getallvouchers",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(callFrom == "ledgerHead") {
				setVoucherList(r);
			} else {
				setVoucherTemp(r,'defaultViewVoucher');
			}
		}
	});
}

function setVoucherTemp(response, callFrom) {

	var divContent="";
	if(callFrom == 'search')
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.voucher_id+"</td>"
		+ "<td class='col-md-1 center'>"+response.voucher_name+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editVoucher("+response.voucher_id+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteVoucher("+response.voucher_id+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}
	else if(response.voucherList.length > 0)
	{
		for(var i = 0; i < response.voucherList.length; i++)
		{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.voucherList[i].voucher_id+"</td>"
			+ "<td class='col-md-1 center'>"+response.voucherList[i].voucher_name+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editVoucher("+response.voucherList[i].voucher_id+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteVoucher("+response.voucherList[i].voucher_id+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}
	else
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '5'>No record found...</td>"
	}
	$("#voucherDetails").html(divContent);
}

function deleteVoucher(id) {

	var r = confirm("Are you sure you want to delete voucher.");
	
	if(!r)
	{
		return false;
	}
	else
	{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/admin/deletevoucher/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r)
				{
					alert("Voucher deleted.");
				}
				
				resetVoucherMaster();
				defaultViewVoucher("onload");
			}
		});
	}
}

function editVoucher(id) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editvoucher/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			toggleEntryDiv("divForVoucherEdit");
			$("#vouchername").val(r.voucher_name);
			$("#voucherid").val(r.voucher_id);
		}
	});
}

function voucherAutoSuggestion(voucherId, type) {
	var resultData = [];
	var voucherName = $("input#" + voucherId).val();

	if (voucherName == "" || voucherName == null || voucherName == "null" || voucherName == undefined) {
		alert("Please enter search value");
		$("input#" + voucherId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(voucherName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/searchvoucher",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.voucherList.length; j++) {

				var arrValue = response.voucherList[j].voucher_id +"-"+response.voucherList[j].voucher_name;
				var idValue = response.voucherList[j].voucher_id;
				var voucherName = response.voucherList[j].voucher_name;
				resultData.push({
					ID : idValue,
					Name : voucherName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + voucherId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + voucherId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var voucherId = res[0];
		var voucherName = res[1];
		getAllVouchersById(voucherId);
		$("input#" + voucherId).val(voucherName);
	}
}

function getAllVouchersById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editvoucher/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setVoucherTemp(response,"search");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function searchVoucher(callFrom) {
	
	var searchText = $("#byName").val();
	
	if (searchText == "" || searchText == null || searchText == "null" || searchText == undefined) {
		alert("Please enter search value");
		$("#byName").focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(searchText));
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/searchvoucher",
		cache : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setVoucherTemp(response,"searchBtn");
		}
	});
}

/* =============== Ledger Heads Master =============== */

function setVoucherList(r){
	var divContent = "";
    divContent = divContent
            + "<select name='vouchername' class='col-md-12'><option value='0'>---Select---</option>";
    for (var i = 0; i < r.voucherList.length; i++) {            
	 			divContent = divContent + "<option value='" + r.voucherList[i].voucher_id + "'  >"
                + r.voucherList[i].voucher_name + "</option>";
    }
    divContent = divContent + "</select>";
    $("#vouchername").html(divContent);
}

function resetLedgerHeadMaster() {
	
	defaultViewVoucher('ledgerHead');
	$("#byName").val("");
	$("#lhname").val("");
}

function saveledgerHeadsMaster() {

	var ledgerHeadName = $("#lhname").val();
		ledgerHeadName = $.trim(ledgerHeadName);
	var ledgerHeadId = $("#lid").val();
	var voucherName = $.trim($('#vouchername').val());

    if (voucherName == "0") {
		alert("Please Select Voucher Group...");
		return false;
	}
	if (ledgerHeadName == "") {
		alert("Please Enter Ledger Head name...");
		return false;
	}
	var inputs = [];
	inputs.push('ledger_head_ID=' + ledgerHeadId);
	inputs.push('voucherId=' + encodeURIComponent(voucherName));
	inputs.push('ledger_head_name=' + encodeURIComponent(ledgerHeadName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/saveledgerhead",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alertify.success(r);
			resetLedgerHeadMaster();
			defaultViewledgerHead("onload");
			toggleEntryDiv("divForLedgerHeadEdit");
		}
	});
}

function defaultViewledgerHead(callFrom) {

	var searchText = $("#byName").val();
	
	var inputs = [];
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchText=' + searchText);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getallledgerheads",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setLedgerHeadTemp(r, 'defaultView');
		}
	});
}

function setLedgerHeadTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch')
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.ledger_head_ID+"</td>"
		+ "<td class='col-md-1 center'>"+response.expenseVoucherGroup.voucher_name+"</td>"
		+ "<td class='col-md-1 center'>"+response.ledger_head_name+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editledgerHead("+response.ledger_head_ID+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteledgerHead("+response.ledger_head_ID+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}
	else if(response.ledger_headList.length > 0)
	{
		for(var i = 0; i < response.ledger_headList.length; i++)
		{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.ledger_headList[i].ledger_head_ID+"</td>"
			+ "<td class='col-md-1 center'>"+response.ledger_headList[i].expenseVoucherGroup.voucher_name+"</td>"
			+ "<td class='col-md-1 center'>"+response.ledger_headList[i].ledger_head_name+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editledgerHead("+response.ledger_headList[i].ledger_head_ID+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deleteledgerHead("+response.ledger_headList[i].ledger_head_ID+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}
	else
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '6'>No record found...</td>"
	}
	$("#ledgerHeadDetails").html(divContent);
}

function editledgerHead(id) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editledgerhead/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			toggleEntryDiv("divForLedgerHeadEdit");
			$("#vouchername").val(r.expenseVoucherGroup.voucher_id);
			$("#lid").val(r.ledger_head_ID);
			$("#lhname").val(r.ledger_head_name);
		}
	});
}

function deleteledgerHead(id) {

	var r = confirm("Are you sure you want to delete ledger head.");
	
	if(!r)
	{
		return false;
	}
	else
	{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/admin/deleteledgerhead/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r)
				{
					alert("Ledger head deleted.");
				}
				
				resetLedgerHeadMaster();
				defaultViewledgerHead("onload");
			}
		});
	}
}

function ledgerHeadAutoSuggestion(ledgerHeadId, type) {
	var resultData = [];
	var ledgerHeadName = $("input#" + ledgerHeadId).val();

	if (ledgerHeadName == "" || ledgerHeadName == null || ledgerHeadName == "null" || ledgerHeadName == undefined) {
		alert("Please enter search value");
		$("input#" + ledgerHeadId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(ledgerHeadName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/getallledgerheads",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.ledgerHeadList.length; j++) {

				var arrValue = response.ledgerHeadList[j].lhID +"-"+response.ledgerHeadList[j].lhName;
				var idValue = response.ledgerHeadList[j].lhID;
				var ledgerHeadName = response.ledgerHeadList[j].lhName;
				resultData.push({
					ID : idValue,
					Name : ledgerHeadName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + ledgerHeadId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + ledgerHeadId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var ledgerHeadId = res[0];
		var ledgerHeadName = res[1];
		getAllLedgerHeadsById(ledgerHeadId);
		$("input#" + ledgerHeadId).val(ledgerHeadName);
	}
}

function getAllLedgerHeadsById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editledgerhead/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setLedgerHeadTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function searchledgerHead(callFrom) {
	defaultViewledgerHead(callFrom);
}

/* ========== Reason Of Visit Master ========== */

function resetReasonMaster() {
	
	getAllModule();
	$("#byName").val("");
	$("#reasonofvisit").val("");
}

function saveReasonOfVisitDetails() {
    var ReasonOfVisitid = $("#reasonofvisitid").val();
    var ReasonOfVisit = $.trim($("#reasonofvisit").val());
    var moduleId = $.trim($("#moduleList").val());
	
    if (ReasonOfVisit == "") {
		alert("Please Enter Reason Of Visit Details...");
		return false;
	}else if (moduleId == "") {
		alert("Please Select Module Name...");
		return false;
	}

	var inputs = [];
	inputs.push('ReasonOfVisit_ID=' + ReasonOfVisitid);
	inputs.push('ReasonOfVisit=' + encodeURIComponent(ReasonOfVisit));
	inputs.push('moduleId=' + moduleId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reasonofvisit/savereasonofvisit",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 alert("error");
		},
		success : function(r) {
			alert(r);
			resetReasonMaster();
			toggleEntryDiv("divForReasonEntry");
			defaultViewReasonOfVisit("text", "masterForm");
		}
	});
}

function defaultViewReasonOfVisit(text, callFrom) {

	var searchText = $("#byName").val();
	
	
	
	var inputs = [];
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchText=' + searchText);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/reasonofvisit/getallreasons",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setReasonOfVisitTemp(r, 'defaultView');
		}
	});
}

function setReasonOfVisitTemp(response, callFrom) {
	
	var divContent="";
	if(callFrom == 'autoSearch')
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center'>"+1+".</td>"
		+ "<td class='col-md-1 center'>"+response.reasonOfVisit_ID+"</td>"
		+ "<td class='col-md-1'>"+response.reasonOfVisit+"</td>"
		+ "<td class='col-md-1'>"+response.userAccessModuleDto.moduleName+"</td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editReasonOfVisitDetails("+response.reasonOfVisit_ID+")'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-md-1 center'>"
		+ "<button value='Delete'  class='btn btn-xs btn-danger deleteUserAccess' onclick='deleteReasonOfVisitDetails("+response.reasonOfVisit_ID+")'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>";
	}
	else if(response.reasonOfVisitDetails.length > 0)
	{
		for(var i = 0; i < response.reasonOfVisitDetails.length; i++)
		{
			divContent=divContent+"<tr>"
			+ "<td class='col-md-1 center'>"+(i+1)+".</td>"
			+ "<td class='col-md-1 center'>"+response.reasonOfVisitDetails[i].reasonOfVisit_ID+"</td>"
			+ "<td class='col-md-1'>"+response.reasonOfVisitDetails[i].reasonOfVisit+"</td>"
			+ "<td class='col-md-1'>"+response.reasonOfVisitDetails[i].userAccessModuleDto.moduleName+"</td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editReasonOfVisitDetails("+response.reasonOfVisitDetails[i].reasonOfVisit_ID+")'>"
			+ "<i class='fa fa-edit'></i></button></td>"
			+ "<td class='col-md-1 center'>"
			+ "<button value='Delete'  class='btn btn-xs btn-danger deleteUserAccess' onclick='deleteReasonOfVisitDetails("+response.reasonOfVisitDetails[i].reasonOfVisit_ID+")'>"
			+ "<i class='fa fa-trash-o'></i></button></td></tr>";
		}
	}
	else
	{
		divContent=divContent+"<tr>"
		+ "<td class='col-md-1 center' colspan = '6'>No record found...</td>"
	}
	$("#reasonOfVisitDetails").html(divContent);
}

function editReasonOfVisitDetails(id) {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/reasonofvisit/editreason/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			toggleEntryForReasonOfVisist('divForReasonEntry');
			$("#moduleList").val(r.userAccessModuleDto.moduleId);
			$("#reasonofvisitid").val(r.reasonOfVisit_ID);
			$("#reasonofvisit").val(r.reasonOfVisit);
		}
	});
}

function deleteReasonOfVisitDetails(id) {

	var r = confirm("Are you sure you want to delete ledger head.");
	
	if(!r)
	{
		return false;
	}
	else
	{
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/reasonofvisit/deletereason/"+id,
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if(r)
				{
					alert("Reason deleted.");
				}
				resetReasonMaster();
				defaultViewReasonOfVisit("text", "masterForm");
			}
		});
	}
}

function SearchPageOnEnter(reasonId, type) {
	var resultData = [];
	var reasonName = $("input#" + reasonId).val();

	if (reasonName == "" || reasonName == null || reasonName == "null" || reasonName == undefined) {
		alert("Please enter search value");
		$("input#" + reasonId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(reasonName));
	inputs.push('callFrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/reasonofvisit/getallreasons",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.ReasonOfVisitDetails.length; j++) {

				var arrValue = response.ReasonOfVisitDetails[j].ReasonOfVisit_id +"-"+response.ReasonOfVisitDetails[j].reasonOfVisit;
				var idValue = response.ReasonOfVisitDetails[j].ReasonOfVisit_id;
				var reasonName = response.ReasonOfVisitDetails[j].reasonOfVisit;
				resultData.push({
					ID : idValue,
					Name : reasonName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + reasonId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + reasonId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var reasonId = res[0];
		var reasonName = res[1];
		getAllReasonsById(reasonId);
		$("input#" + reasonId).val(reasonName);
	}
}

function getAllReasonsById(id) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/reasonofvisit/editreason/"+id,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setReasonOfVisitTemp(response,"autoSearch");
			$("#byName").focus();
			$('#byName').val("");
		}
	});
}

function searchReasonOfVisit(callFrom) {
	defaultViewReasonOfVisit("text", callFrom);
}