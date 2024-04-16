
/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Fetching Next Voucher ID 
 ************/
function setAddVoucherTemp() 
{
	var inputs = [];
	inputs.push('action=fetchVoucherID');
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,		
		success : function(r) {
			ajaxResponse = r;			
			pobj1 = eval('(' + ajaxResponse + ')');
			
			// Create Add new voucher template
			var addVoucherTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
				+ "<div style='padding-top: 0%; padding-left: 8%'><div><h3 id = 'title' >Add Voucher Details:</h3></div>"
				+ "<div class='divide-20'></div>"
				+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
				+ "<div class='divide-20'></div>"
				+ "<label class='TextFont col-md-4-1' for='Service ID'>Voucher ID</label>"
				+ "<input id='voucherid' name='tid' type='text' placeholder='Voucher ID' style='background-color: #ddd;'"
				+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='"+pobj1.voucherID+"'/></div>"
				+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
				+ "<div class='divide-20'></div>"
				+ "<label class='TextFont col-md-4-1' for='Service Name'>Voucher Name<b style='color: red; padding-left: 3px;'>*</b></label>"
				+ "<input id='vouchername' name='tname' type='text' placeholder='Voucher Name' onkeypress='return validatealphabetic(event)'"
				+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
				+ "<input type='hidden' id='queryType' value='insert'>"
				+ "</div></div>";
			$("#specialVoucherContent").html(addVoucherTemp); // Set template in html div 		
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Fetching all/ByName vouchers 
 ************/
function defaultViewVoucher(actionFlag) 
{
	count = 1;
	var searhFlag = $.trim(actionFlag); // searchFlag= onload/search(byName)
	var searchText = $.trim($("#byName").val()); // serachText to search voucher byName
	
	// validate seachText inputBox 
	if (searhFlag == "search") { 
		if (searchText == "") {
			alert("Please Enter voucher Name !");
			setFocus("#byName");
		}
	}	
	var inputs = [];
	inputs.push('action=fetchVouchers');	
	inputs.push('actionFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,
		success : function(res) {

			var ajaxResponse = res;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#voucherDetails").html(ajaxResponse); 
			
			// Create Dynamic table template of vouchers data
			var defaultVoucherViewTemp = "<div class='col-sm-12-1'>"
				+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
				+ "<thead class='cf'>"
				+ "<tr>"
				+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
				+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Voucher ID</div></th>"
				+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Voucher Name</div></th>"
				+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
				+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
				+ "</tr>"
				+ "</thead>	"
				+ "</table></div>"
				+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
				+ "<table class='table table-striped table-condensed cf'>"
				+ "<tbody>";
				for(var count=0;count<pobj1.voucherList.length;count++) // Iterate all fetched list & set values in table
				{
					defaultVoucherViewTemp=defaultVoucherViewTemp+"<tr>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+(count+1)+"</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+pobj1.voucherList[count].voucherID+"</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+pobj1.voucherList[count].voucherName+"</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit2' onclick='editVoucher("+pobj1.voucherList[count].voucherID+")'>"
				+ "<i class='fa fa-edit'></i>"
				+ "</button>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete2' onclick='deleteVoucher("+pobj1.voucherList[count].voucherID+")'>"
				+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>";
				}				
				defaultVoucherViewTemp=defaultVoucherViewTemp+"</tbody>" + "</table>" + "</div>";
			
				$("#voucherContent").html(defaultVoucherViewTemp); // Set table template in html div 
			
			// Set voucher names in dropdown used for General Vouchers 
			$("#selVoucherType").setTemplate("{#foreach $T.voucherList as tl}<option value='{$T.tl.voucherID}' >{$T.tl.voucherName}</option>{#/for}");
			$("#selVoucherType").processTemplate(pobj1);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Save/Update/Delete voucher
 ************/
function saveGeneralVoucherMaster() 
{	
	var queryType = $("#queryType").val();// insert/update/delete
	var voucherId = $("#voucherid").val();
	
	var vouchername = $("#vouchername").val();	
	vouchername = $.trim(vouchername);	
	
	if(queryType!="delete")// Validate voucherName for queryType is other than delete
	{
		if (vouchername == null || vouchername == "") {
			
			alert("Please enter voucher name.");
			$("#vouchername").val("");
			$("#vouchername").focus();		
			return false;
		}		
	}
	var inputs = [];
	inputs.push('action=saveVoucherDetails');
	inputs.push('voucherid=' + voucherId);
	inputs.push('vouchername=' + encodeURIComponent(vouchername));
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		success : function(r) 
		{
			ajaxResponse = r;
			alert(ajaxResponse);
			defaultViewVoucher("onload");
			refreshVoucherView(); // reset all values on page
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Reset all values on page
 ************/
function refreshVoucherView()
{
	$("#vouchername").val("");
	$("#queryType").val("insert");
	setAddVoucherTemp();
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Edit perticular voucher
 ************/
function editVoucher(VoucherId) {
	var myObj1=null;
	var ajaxResponse = $("#voucherDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.voucherList.length; i++) { // Iterate all vouchers 

		if (myArray.voucherList[i].voucherID == VoucherId) { // Check voucherid to be edit is exist 
			myObj1 = myArray.voucherList[i];
			break;
		}
	}	
	$("#title").html("Edit Voucher Details:");
	$("#voucherid").val(myObj1.voucherID);
	$("#vouchername").val(myObj1.voucherName);
	$("#queryType").val("update");	
}

/************
* @author	: Vinod Udawant
* @date		: 24-Nov-2016
* @codeFor	: Delete perticular voucher
 ************/
function deleteVoucher(VoucherId) {
	
	var flag=confirm("Are you confirm to Delete Record?");
	if(flag)
	{
		$("#voucherid").val(VoucherId);	
		$("#queryType").val("delete");	
		saveGeneralVoucherMaster();
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 25-Nov-2016
* @codeFor	: Set dynamic title 
 ************/
function setTitle() {
	
	var voucherType=$("#selVoucherType option:selected").text();	
	$("#title").html(voucherType);
}

/***********
 * @author	: Vinod Udawant
 * @date	: 28-Nov-2016
 * @reason	: Authorised Users List 
 **********/
function fetchAuthorisedBy(callFrom){
	callFrom ="onload";
	
	var inputs = [];
	inputs.push('action=fetchAuthorisedBy');
	inputs.push('callFrom='+callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche	: false,	
		success : function(r) {
			var data = eval('(' + r + ')');
			$("#selAuthorisedBy").setTemplate(authorisedByListTemplate);
			$("#selAuthorisedBy").processTemplate(data);			
		}
	});	
} 

//@Vinod Template authorised by @date 28-Nov-2016
var authorisedByListTemplate = "<option value='0'>--select--</option>{#foreach $T.listDoctor as dpl}" 
		+	"<option value='{$T.dpl.ui}'>{$T.dpl.dn}</option>{#/for}";


/************
* @author	: Vinod Udawant
* @date		: 28-Nov-2016
* @codeFor	: Get Next Voucher Id
 ************/
function getNextVoucherId() 
{
	var selVoucherType=$('#selVoucherType').val();
	var inputs = [];
	inputs.push('action=getNextVoucherId');
	inputs.push('selVoucherType=' + selVoucherType);	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "GeneralVoucherServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		success : function(r){
			var data = eval('(' + r + ')');			
			$("#txtVoucherid").val(data.voucherId);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 28-Nov-2016
* @codeFor	: Save/Delete voucher
 ************/
function saveGeneralVoucher() 
{	
	var queryType = $("#queryType").val();// insert/update/delete
	var selVoucherType = $("#selVoucherType").val();
	var txtVoucherid = $("#txtVoucherid").val();	
	var txtcurrentDate = $("#txtcurrentDate").val();	
	var txtPayTo = $.trim($("#txtPayTo").val());
	var txtAmount =$.trim($("#txtAmount").val());
	var selGroupName = $("#selGroupName").val();
	var selLedgerHead = $("#selLedgerHead").val();
	var selReferedTo = $("#selReferedTo").val();
	var selAuthorisedBy = $("#selAuthorisedBy").val();	
	var txtNarration = $.trim($("#txtNarration").val());
	
	if (txtcurrentDate == null || txtcurrentDate == "") {		
		alert("Please select date.");		
		$("#txtcurrentDate").focus();
		return false;
	}
	if (txtPayTo == null || txtPayTo == "") {		
		alert("Please enter payee name.");
		$("#txtPayTo").focus();
		return false;
	}
	if (txtAmount == null || txtAmount == "") {		
		alert("Please enter voucher amount.");
		$("#txtAmount").focus();
		return false;
	}
    if(selReferedTo=="0") { 
    	alert("Please select reffered person.");
    	$("#selReferedTo").focus();
    	return false;
    }
    if(selAuthorisedBy=="0") { 
    	alert("Please select authorised by.");
    	$("#selAuthorisedBy").focus();
    	return false;
    }
    if (txtNarration == null || txtNarration == "") {		
		alert("Please enter narration.");
		$("#txtNarration").focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('action=saveGeneralVoucher');
	inputs.push('selVoucherType=' + selVoucherType);
	inputs.push('txtVoucherid=' + txtVoucherid);
	inputs.push('txtcurrentDate=' + txtcurrentDate);
	inputs.push('txtPayTo=' + encodeURIComponent(txtPayTo));
	inputs.push('txtAmount=' + txtAmount);
	inputs.push('selGroupName=' + selGroupName);
	inputs.push('selLedgerHead=' + selLedgerHead);
	inputs.push('selReferedTo=' + selReferedTo);
	inputs.push('selAuthorisedBy=' + selAuthorisedBy);
	inputs.push('txtNarration=' + encodeURIComponent(txtNarration));
	inputs.push('queryType=' + queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "GeneralVoucherServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		success : function(r){
			ajaxResponse = r;
			alert(ajaxResponse);
			getNextVoucherId();
			refreshVoucher(); // reset all values on page
			fetchVouchers('onload'); 			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 28-Nov-2016
* @codeFor	: Fetching all/ByName vouchers 
 ************/
function fetchVouchers(callFrom) 
{	
	var searchText = $.trim($("#searchText").val()); // serachText to search voucher byName
	var voucherType= $("#selVoucherType").val();
	var selSearchType= $("#selSearchType").val();
	var tabType= $("#tabType").val();
	
	if (callFrom == "search") { 
		if(selSearchType=="1"){
			if (searchText == "") {
				alert("Please Enter Voucher Id !");
				setFocus("#searchText");
			}
		}else{
			if (searchText == "") {
				alert("Please Enter Payee Name !");
				setFocus("#searchText");
			}
		}		
	}	
	var inputs = [];
	inputs.push('action=fetchGeneralVouchers');	
	inputs.push('callFrom=' + callFrom);
	inputs.push('voucherType=' + voucherType);
	inputs.push('tabType=' + tabType);
	inputs.push('selSearchType=' + selSearchType);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "GeneralVoucherServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,
		success : function(res) {

			var ajaxResponse = res;
			pobj1 = eval('(' + ajaxResponse + ')');			
			var tbody = "";
			
			if(tabType=="N") // If tab type is processed
			{
				for(var count=0;count<pobj1.vouchersList.length;count++) // Create Dynamic table template of processed vouchers data
				{
					tbody=tbody+"<tr>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"+(count+1)+"</td>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"+pobj1.vouchersList[count].voucherId+"</td>"
					+ "<td class='col-md-4-1 center' style='height: 21.5px;'>"+pobj1.vouchersList[count].payTo+"</td>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"+pobj1.vouchersList[count].amount+"</td>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-warning' value='EDIT' id='btnEdit2' onclick='printVoucher("+pobj1.vouchersList[count].voucherId+")'>"
					+ "<i class='fa fa-print'></i>"
					+ "</button>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete2' onclick='cancelVoucher("+pobj1.vouchersList[count].voucherId+")'>"
					+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>";			
				}		
				$("#processedVouchers").html(tbody); // Set table template in table body 
			}
			else // If tab type is cancelled
			{
				for(var count=0;count<pobj1.vouchersList.length;count++) // Create Dynamic table template of cancelled vouchers data
				{
					tbody=tbody+"<tr>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"+(count+1)+"</td>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"+pobj1.vouchersList[count].voucherId+"</td>"
					+ "<td class='col-md-4-1 center' style='height: 21.5px;'>"+pobj1.vouchersList[count].payTo+"</td>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"+pobj1.vouchersList[count].amount+"</td>"
					+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-warning' value='EDIT' id='btnEdit2' onclick='printVoucher("+pobj1.vouchersList[count].voucherId+")'>"
					+ "<i class='fa fa-print'></i>"
					+ "</button></tr>";			
				}		
				$("#cancelledVouchers").html(tbody); // Set table template in table body 
			}		
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 28-Nov-2016
* @codeFor	: Print Voucher
 ************/
function printVoucher(voucherId)
{
	var voucherType= $("#selVoucherType").val(); // Get Id of voucherType
	var voucherName= $("#selVoucherType option[value='"+voucherType+"']").text(); // Get Name of voucherType using ID
	var tabType= $("#tabType").val();
	
	var f = document.getElementById('TheForm');
	f.voucherIdPrint.value = voucherId;	
	f.voucherTypePrint.value = voucherType;
	f.voucherNamePrint.value = voucherName;
	f.tabTypePrint.value = tabType;
	
	window.open('', 'TheWindow');
	f.submit();	
}

/************
* @author	: Vinod Udawant
* @date		: 28-Nov-2016
* @codeFor	: Cancel Voucher
 ************/
function cancelVoucher(voucherId)
{
	var flag=confirm("Are you confirm to Cancel Voucher?");
	if(flag)
	{
		var voucherType= $("#selVoucherType").val();	
		var inputs = [];
		inputs.push('action=cancelVoucher');
		inputs.push('voucherId='+voucherId);
		inputs.push('selVoucherType='+voucherType);	
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "GeneralVoucherServlet",
			timeout : 1000 * 60 * 5,
			catche	: false,		
			success : function(r) {
				alert(r);	
				fetchVouchers('onload'); 
			}
		});	
	}
}

/************
* @author	: Vinod Udawant
* @date		: 29-Nov-2016
* @codeFor	: Reset all values on page
 ************/
function refreshVoucher()
{
	$("#txtcurrentDate").val("");
	$("#txtPayTo").val("");
	$("#txtAmount").val("");
	$("#selLedgerHead").val("");
	$("#selReferedTo").val("");
	$("#selAuthorisedBy").val("");
	$("#txtNarration").val("");
	$("#vouchername").val("");
	$("#queryType").val("insert");	
	$("#tabType").val("N");	
}

/************
* @author	: Vinod Udawant
* @date		: 29-Nov-2016
* @codeFor	: Set hidden field after Change tab
 ************/
function setTabType(status)
{
	$("#tabType").val(status); 
}

/************
* @author	: Vinod Udawant
* @date		: 29-Nov-2016
* @codeFor	: Fetch vouchers List 
 ************/
function fetchVoucherList(voucherType) {
	var inputs = [];
	inputs.push('action=fetchVoucherList');
	inputs.push('voucherType=' + encodeURIComponent(voucherType));
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,
		
		success : function(r) {
			var ajaxResponse = r;			
			var obj = eval('(' + ajaxResponse + ')');
			
			$("#selGroupName").setTemplate(VoucherGroupTemp);
			$("#selGroupName").processTemplate(obj);
		}		
	});
}
// Set dropdown of voucher Group
var VoucherGroupTemp = "<option value='0'>-- Select --</option>{#foreach $T.voucherList as voucherList"
	+ "}<option value='{$T.voucherList.voucher_id}' name='{$T.voucherList.voucher_name}'>{$T.voucherList.voucher_name}</option>{#/for}";

/************
* @author	: Vinod Udawant
* @date		: 29-Nov-2016
* @codeFor	: Set hidden field after Change tab
 ************/
function setLedgerHead(str){
	var inputs = [];
	inputs.push('action=setLedgerHead');
	inputs.push('str=' + str);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache	: false,
		
		success : function(r) {
			var ajaxResponse = r;
			$("#ledgerHead").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			
			$("#selLedgerHead").setTemplate(headListTemp);
			$("#selLedgerHead").processTemplate(obj);			
		}
	});
}
// Set dropdown of ledger head
/*var headListTemp = "{#foreach $T.ledgerHeadList as ledgerHeadList"
	+ "}<option value='{$T.ledgerHeadList.lhID}'>{$T.ledgerHeadList.lhName}</option>{#/for}";*/

var headListTemp = "{#foreach $T.ledgerHeadList as ledgerHeadList"
	+ "}<option value='{$T.ledgerHeadList.lhName}'>{$T.ledgerHeadList.lhName}</option>{#/for}";

/************
* @author	: Vinod Udawant
* @date		: 29-Nov-2016
* @codeFor	: Set hidden field after Change tab
 ************/
function validatePrice() {
	
	var reg = /^[0-9]+$/;
	var amount = $("#txtAmount").val();
	if (amount != "" && !reg.test(amount)) {
		alert("Please Enter Only number!");
		$("#txtAmount").val("");
		return false;
	}
};




//AutoSuggestion for GeneralVoucher
//@uthor - Manisha
//Date - 7 March 2017

function setAutoForGeneralVoucher(inputID, onload, callFrom) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	var auto = '';
	if (callFrom == "GeneralVoucher") {
		auto = 'GeneralVoucher';
	} 
	
	var inputs = [];
	inputs.push('auto=' + auto);
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
		$("#txtDoctorId").val((item.value).trim());
	}
}

function selectVoucherGrp(str1){			
	
	setLedgerHead(str1);
}

/*********************************End*********************************/
