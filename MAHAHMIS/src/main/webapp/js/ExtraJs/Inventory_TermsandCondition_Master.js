/******* get next autogenrated id  for terms and Condition  @author Sudhir @Date 8Aug2016 **/
function getNexttermsandConditionId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_termsandcondition_master');
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
			ajaxResponse = r;
			$("#txtId").val(r);
		}
	});
}

/*saveTermsandConditionsMaster @Author :Sudhir @Date 8/8/2016***********/
function saveTermsandConditionsMaster() {
	var txtId = $("#txtId").val();
		
	//var termsAndCondition = encodeURIComponent($.trim( $("#txtTermsandCondition").val()));
	var termsAndCondition = $("#txtTermsandCondition").val();
	
	if($("#txtTermsandCondition").val().toString().trim()=="0")
		{
		alert("Can not save empty record");
		$("#txtTermsandCondition").val("");
		$("#txtTermsandCondition").focus();
		}
	
	var inputs = [];
	inputs.push('action=saveTermsandConditionsMaster');
	inputs.push('txtId=' + txtId);
	inputs.push('termsAndCondition='+termsAndCondition);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data :  {txtId:txtId,termsAndCondition:termsAndCondition,action:'saveTermsandConditionsMaster'
			},
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//ajaxResponse = r;
			alert(r);
			/*var txtPurchaseOrderSaveOrUpdate =$("#txtPurchaseOrderSaveOrUpdate").val();
			if(txtPurchaseOrderSaveOrUpdate=='Update')
			{
				alert("Order updated successfully..!");
			}
			else
				{
				alert("Order is saved successfully..!");
				}*/
			
			
			/*$('#Purchase_Order_Form').removeClass('fade');
			$('#Purchase_Order_Form').modal('hide');*/
			
			//window.location.reload("Inventory_TermsandCondition_Master.jsp");
			getNexttermsandConditionId();
			fetchtermsandConditionsDetail();
			$("#txtTermsandCondition").val("");
			$("#txtTermsandCondition").focus();
		}
	});
}


function resetTermsandConditionsForm()
{
	$("#byName").val("");
	$("#txtId").val("");
	$("#txtTermsandCondition").val("");
	$("#txtTermsandCondition").focus();
	getNexttermsandConditionId();
}
 
function fetchtermsandConditionsDetail() {
	var inputs = [];
	inputs.push('action=fetchtermsandConditionsDetail');
	inputs.push('isEdit=no');
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
		/*	var pobj1 = eval('(' + r + ')');*/
			var pobj1 = JSON.parse(r);
			SrNo = 1;
			$("#termsandConditionsDetailsContent").setTemplate(inventorytermsAndConditionTemp);
			$("#termsandConditionsDetailsContent").processTemplate(pobj1);

			$("#termsandConditionsDetailsAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}


/* New Inventory Function */
var inventorytermsAndConditionTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 '><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Terms and Condition </div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltinvHospitalDetailDTOs as ltinvHospitalDetailDTOs}<tr class='left'> <td>{SrNo++}</td><td id='id{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}</td><td style='text-align=left' id='desc{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.termsAndCondition}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewtermsandcdDetail({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteTermsandConditionDetail({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>{#/for}</table>";


/*function viewtermsandcdDetail(Id) {
	//alert(objtermsandCondition);
	var obj = $("#termsandConditionsDetailsAjaxResp").html();
	var objtermsandCondition = JSON.parse(obj);
	var objtermsandCondition = eval('(' + obj + ')');
	console.log(objtermsandCondition);
	objtermsandCondition = JSON.parse(obj);
	for ( var i = 0; i < objtermsandCondition.ltinvHospitalDetailDTOs.length; i++) {
		if (objtermsandCondition.ltinvHospitalDetailDTOs[i].idinvhospitaldetails == Id) {
			
			console.log(objtermsandCondition.ltinvHospitalDetailDTOs[i].termsAndCondition);
			
			$("#txtId").val(objtermsandCondition.ltinvHospitalDetailDTOs[i].idinvhospitaldetails);
			$("#txtTermsandCondition").val(objtermsandCondition.ltinvHospitalDetailDTOs[i].termsAndCondition);
			break;
		}
	}
	
}*/
/***** viewtermsandcdDetail modified @Date 1 Sep2016 @author Sudhir jadhav ***/
function viewtermsandcdDetail(Id) {
	var inputs = [];
	inputs.push('action=fetchtermsandConditionsDetail');
	inputs.push('isEdit=yes');
	inputs.push('id='+ Id);
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
			r = $.parseJSON(r);
			
			 $("#txtId").val(r.ltinvHospitalDetailDTOs[0].idinvhospitaldetails);
			 $("#txtTermsandCondition").val(r.ltinvHospitalDetailDTOs[0].termsAndCondition);

		}
	});
}


function fetchtermsandConditionsDetailforSearch() {
	var Id = $("#byName").val();
	var inputs = [];
	inputs.push('action=fetchtermsandConditionsDetail');
	inputs.push('isEdit=yes');
	inputs.push('id='+ Id);
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
		//	alert(r);
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			$("#termsandConditionsDetailsContent").setTemplate(inventorytermsAndConditionTemp);
			$("#termsandConditionsDetailsContent").processTemplate(pobj1);
			$("#termsandConditionsDetailsAjaxResp").html(r);
			userAccess();
		}
	});
}

function deleteTermsandConditionDetail(Id)
{

	/*var didConfirm = confirm("Are you sure to delete charges ?");
	if (didConfirm) {
		var inputs = [];
		//inputs.push('action=deleteTermAndConditionDetail');
		inputs.push('termsId=' + Id);
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
			alert("Hospital deleted successfully");
			fetchtermsandConditionsDetail();

			}
		});
	}*/
	
	var r = confirm("Are You Sure You Want To Delete Charges Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventory/deleteinventory",
			data : {
				"id" : Id
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				fetchtermsandConditionsDetail();
			}

		});
	}
}



