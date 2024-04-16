 var SrNoDT=1;
var inventoryABCRangeTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
	+ "<thead class='cf' style='background: white;'><tr><th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th><th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Item A(min)</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>Item A(max)</div></th><th style='height: 21.5px;' class='col-md-2 left'><div>Item B(min)</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Item B(max)</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Item C(min)</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Item C(max)</div></th> <th style='height: 21.5px;' class='col-md-1 center'><div>Edit</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
	+ "{#foreach $T.ltAbcRangeAnalsysDTOs as ltAbcRangeAnalsysDTOs}<tr class='center'><td>{SrNoDT++}</td><td id='id{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}</td><td style='text-align=left' id='desc{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.inv_abc_minrange_item_a}</td>"
	+ "<td style='text-align=left' id='desc{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.inv_abc_maxrange_item_a}</td><td id='desc{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.inv_abc_minrange_item_b}</td><td id='desc{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.inv_abc_maxrange_item_b}</td> <td id='desc{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.inv_abc_minrange_item_c}</td> <td id='desc{$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details}'>{$T.ltAbcRangeAnalsysDTOs.inv_abc_maxrange_item_c}</td> "
	+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewRangeDetail({$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
	+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteRangeDetail({$T.ltAbcRangeAnalsysDTOs.idinv_abcanalysis_details})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>"


function resetABCRangeMasterForm()
{
	$("#txtMinvalueA").val("");
	$("#txtMaxvalueA").val("");
	$("#txtMinvalueB").val("");
	$("#txtMaxvalueB").val("");
	$("#txtMinvalueC").val("");
	$("#txtMaxvalueC").val("");
	getNextABCAnalysisRangeId();
	$("#txtMinvalueA").focus();
	//getNextTaxMasterId();
	
}

function saveABCRangeMaster() {

var txtABCId = $("#txtABCId").val();  
var txtMinvalueA = $("#txtMinvalueA").val();
var txtMaxvalueA = $("#txtMaxvalueA").val();

var txtMinvalueB = $("#txtMinvalueB").val();
var txtMaxvalueB = $("#txtMaxvalueB").val();
var txtMinvalueC = $("#txtMinvalueC").val();
var txtMaxvalueC = $("#txtMaxvalueC").val();

var inputs = [];
inputs.push('action=saveABCRangeDetails');

inputs.push('txtABCId=' + txtABCId);
inputs.push('txtMinvalueA=' + txtMinvalueA);
inputs.push('txtMaxvalueA=' + txtMaxvalueA);
inputs.push('txtMinvalueB=' + txtMinvalueB);

inputs.push('txtMaxvalueB=' + txtMaxvalueB);
inputs.push('txtMinvalueC=' + txtMinvalueC);
inputs.push('txtMaxvalueC=' + txtMaxvalueC);

var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "InventoryServlet",
	timeout : 1000 * 60 * 5,
	catche : false,
	error : function() {
		alert("error");
	},
	success : function(r) {
		
		alert("Record saved successfully..!");
		
		resetABCRangeMasterForm();
		getNextABCAnalysisRangeId();
		window.location.reload("inventory_ABCRange_Analysis_Master.jsp");
		
		/*ajaxResponse = r;
		//alert(r);
		var SaveUpdate = $("#SaveUpdate").val();
		
		if(SaveUpdate == 'Update')
			{
			alert("Record updated successfully..!");
			}
		else
			{
			alert("Record saved successfully..!");
			}
		
		$("#SaveUpdate").val('0');
		$("#txttaxcode").val("");
		$("#txttaxDescription").val("");
		$("#txttaxRate").val("");
		getNextTaxMasterId();
		fetchTaxDetailNew();*/
	}
});
}


/*** fetch Auto Incremented id @Date:11/2/2016 @Author:sudhir ****/  	
function getNextABCAnalysisRangeId() {
	var inputs = [];
	inputs.push('action=txttaxmastercode');
	inputs.push('tableName=inv_abcanalysis_details');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			$("#txtABCId").val(r);
			/*ajaxResponse = r;
			$("#txtABCId").val(r);*/
		}
	});
}

function fetchABCAnalysisRange() {
	var inputs = [];
	var txtABCId =$("#txtABCId").val();
	inputs.push('action=fetchABCAnalysisRange');
	inputs.push('isEdit=no');
	inputs.push('txtABCId='+txtABCId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			pobj1 = eval('(' + r + ')');
			/*SrNoDT=1;*/
			$("#taxContent").setTemplate(inventoryABCRangeTemp);
			$("#taxContent").processTemplate(pobj1);

			$("#abcAnalysisAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function viewRangeDetail(Id)
{
	var obj = $("#abcAnalysisAjaxResp").html();
	objRangeMaster = JSON.parse(obj);
	var ObjRangeDetails = "";
	for(var i=0;i <= objRangeMaster.ltAbcRangeAnalsysDTOs.length;i++)
		{
		if(objRangeMaster.ltAbcRangeAnalsysDTOs[i].idinv_abcanalysis_details === Id)
			{
			ObjRangeDetails =objRangeMaster.ltAbcRangeAnalsysDTOs[i];
			break;
			}
		}
	
	$("#txtMinvalueA").val(ObjRangeDetails.inv_abc_minrange_item_a);
	$("#txtMaxvalueA").val(ObjRangeDetails.inv_abc_maxrange_item_a);
	$("#txtMinvalueB").val(ObjRangeDetails.inv_abc_minrange_item_b);
	
	$("#txtMaxvalueB").val(ObjRangeDetails.inv_abc_maxrange_item_b);
	$("#txtMinvalueC").val(ObjRangeDetails.inv_abc_minrange_item_c);
	$("#txtMaxvalueC").val(ObjRangeDetails.inv_abc_maxrange_item_c);
	$("#txtABCId").val(ObjRangeDetails.idinv_abcanalysis_details);
		
	return false;
}

function deleteRangeDetail(Id)
{
	var r = confirm("Are You Sure You Want To Delete ABC ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventory/deleteabc",
			data : {
				"id" : Id
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				resetABCRangeMasterForm();
				getNextABCAnalysisRangeId();
				window.location.reload("inventory_ABCRange_Analysis_Master.jsp");
				
			}

		});
	}
}
