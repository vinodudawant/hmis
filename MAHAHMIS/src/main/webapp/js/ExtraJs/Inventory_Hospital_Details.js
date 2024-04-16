/******* get next autogenrated id  for Hospital  @author Sudhir @Date 4Aug2016 **/
function getNextHospitalId() {
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_hospital_details');
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


function saveHospitalMaster() {
	var txtId = $("#txtId").val();
	var txtHospitalName = $("#txtHospitalName").val();
	var txtCountry = $("#txtCountry").val();
	var txtState = $("#txtState").val();
	var txtDistrict = $("#txtDistrict").val();
	var txtTaluka = $("#txtTaluka").val();
	var txtPincode = $("#txtPincode").val();
	
	if($("#txtHospitalName").val().toString().trim()==0)
		{
		alert("Can not save empty record");
		 $("#txtHospitalName").val('');
		 $("#txtHospitalName").focus();
		return false;
		}

	var inputs = [];
	inputs.push('action=saveHospitalDetailsforInventory');
	inputs.push('txtId=' + txtId);
	inputs.push('txtHospitalName='+txtHospitalName);
	inputs.push('txtCountry=' + txtCountry);
	inputs.push('txtState=' + txtState);
	
	inputs.push('txtDistrict='+ txtDistrict);
	inputs.push('txtTaluka='+ txtTaluka);
	inputs.push('txtPincode='+ txtPincode);
 
 
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
		//	window.location.reload("Inventory_Hospital_Details.jsp");
			resetHospitalDetailForm();
			getNextHospitalId();
			fetchHospitalDetail();
		}
	});
}


function resetHospitalDetailForm()
{
	$("#byName").val("");
	$("#txtId").val("");
	$("#txtHospitalName").val("");
	$("#txtCountry").val("");
	$("#txtState").val("");
	$("#txtDistrict").val(""); 
	
	$("#txtTaluka").val("");
	$("#txtPincode").val("");
	getNextHospitalId();
	$("#txtHospitalName").focus();
}





function fetchHospitalDetail() {
	var inputs = [];
	inputs.push('action=fetchHospitalDetail');
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
		//	alert(r);
			pobj1 = eval('(' + r + ')');
			SrNo = 1;
			$("#hospitalDetailsContent").setTemplate(inventoryHospitalTemp);
			$("#hospitalDetailsContent").processTemplate(pobj1);

			$("#hospitalDetailsAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}


/* New Inventory Function */
var inventoryHospitalTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Name of Hospital</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.ltinvHospitalDetailDTOs as ltinvHospitalDetailDTOs}<tr class='left'> <td>{SrNo++}</td><td id='id{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}</td><td style='text-align=left' id='desc{$T.ltinvHospitalDetailDTOs.idinvhospitaldetails}'>{$T.ltinvHospitalDetailDTOs.inv_hospital_name}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewHospitalDetail({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteHospitalDetail({$T.ltinvHospitalDetailDTOs.idinvhospitaldetails})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";


function viewHospitalDetail(Id) {
	
	
	var obj = $("#hospitalDetailsAjaxResp").html();
	objHospital = JSON.parse(obj);
	for ( var i = 0; i < objHospital.ltinvHospitalDetailDTOs.length; i++) {
		if (objHospital.ltinvHospitalDetailDTOs[i].idinvhospitaldetails == Id) {
			
			$("#txtId").val(objHospital.ltinvHospitalDetailDTOs[i].idinvhospitaldetails);
			$("#txtHospitalName").val(objHospital.ltinvHospitalDetailDTOs[i].inv_hospital_name);
			$("#txtDistrict").val(objHospital.ltinvHospitalDetailDTOs[i].inv_hospital_district);
			
			$("#txtTaluka").val(objHospital.ltinvHospitalDetailDTOs[i].inv_hospital_taluka);
			$("#txtState").val(objHospital.ltinvHospitalDetailDTOs[i].inv_hospital_state);
			$("#txtPincode").val(objHospital.ltinvHospitalDetailDTOs[i].inv_hospital_pincode);
			
			$("#txtCountry").val(objHospital.ltinvHospitalDetailDTOs[i].inv_hospital_country);
			
			break;
		}
	}
	
}


function fetchHospitalDetailforSearch() 
{
	var Id = $("#byName").val();
	var inputs = [];
	inputs.push('action=fetchHospitalDetail');
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
			$("#hospitalDetailsContent").setTemplate(inventoryHospitalTemp);
			$("#hospitalDetailsContent").processTemplate(pobj1);
			$("#hospitalDetailsAjaxResp").html(r);
			userAccess();
		}
	});
}
/******
 * @author     :BILAL
 * @Date       :30-11-2017
 * @Code       :For delete hospital detail master 
 * *******/
function deleteHospitalDetail(hospitalId)
{
	/*var didConfirm = confirm("Are you sure to delete charges ?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteHospitalDetail');
		inputs.push('hospitalId=' + hospitalId);
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
			fetchHospitalDetail();

			}
		});
	}*/
	
	var r = confirm("Are You Sure You Want To Delete Hospital details?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventory/deletehospital",
			data : {
				"id" : hospitalId
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				fetchHospitalDetail();
			}

		});
	}
}

