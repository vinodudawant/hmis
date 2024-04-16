
/*@Author : Sudhir jadhav @Date 4jully2016 For NextId*/
function getNextChargesID() {
	//alert("hhhh");
	var inputs = [];
	inputs.push('action=getQuotationNextId');
	inputs.push('tableName=inv_charges_master');
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
			//alert(r);
			$("#txtChargesId").val(r);
		}
	});
}

/*@Author: Sudhir jadhav @Date 4jully2016 For saveChargesMaster*/
function saveChargesMaster() {

	var txtChargesId = $("#txtChargesId").val();
	var txtChargesname = $("#txtChargesname").val();
	// validation 
	if(txtChargesname == ""){
		alert("please enter Charges name");
		$("#txtChargesname").focus();
		return false;
		
	}
	
	if($("#txtChargesname").val().toString().trim().length==0)
	{
		alert("Can not insert empty record");
		$("#txtChargesname").val("");
		$("#txtChargesname").focus();
		return false;
		
	}

/*	if(txtCategoryName != ""){
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(txtCategoryName)) {
			alert("Category name should be of alphabets and digits only with a single space allowed..!");
			$("#txtcategoryname").focus();
			return false;
		}
		
	}*/

	// end
	var status = 'Y';
	var inputs = [];
	inputs.push('action=saveChargesDetail');//saveCategoryDetail
	inputs.push('txtChargesId=' + txtChargesId);
	inputs.push('txtChargesname=' + txtChargesname);
	inputs.push('status=' + status);

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
		    alert("Record saved successfully..!");
			window.location.reload("inventory_special_tax_master.jsp");
		    //alert(r);
		   /* var SaveUpdate = $("#SaveUpdate").val();
			if(SaveUpdate == 'Update')
				{
				alert("Record updated successfully..!");
				}
			else
				{
				alert("Record saved successfully..!");
				}
			
			$("#SaveUpdate").val('0');
		    
			$("#txtcategoryname").val("");
			getNextDocumentId();
			fetchCategoryDetailNew();*/
		}
	});
}


function resetCategoryForm()
{
	$("#txtChargesname").val("");
	getNextChargesID();
	$("#txtChargesname").focus();
}

function fetchChargesDetail() {
	var inputs = [];
	inputs.push('action=fetchChargesDetail');//fetchCategoryDetail
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
			$("#chargesContent").setTemplate(inventoryChargesTemp);
			$("#chargesContent").processTemplate(pobj1);

			$("#chargesAjaxResp").html(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

/* IMP NOte: tamplet use category Dto but it set Charges Details @Date :5jully2016  */
var inventoryChargesTemp = "<table class='table table-striped table-bordered header-fixed cf' style='margin-top: 5px; width: 598px;'>"
		+ "<thead class='cf' style='background: white;'><tr> <th style='height: 21.5px;' class='col-md-1 left'><div>#</div></th>  <th style='height: 21.5px;' class='col-md-1 left'><div>Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 left'><div>Name of Charges</div></th> <th style='height: 21.5px;' class='col-md-1 left'><div>Edit</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 left'><div>Delete</div></th> </tr> </thead>"
		+ "{#foreach $T.CategoryDTO as CategoryDTO}<tr class='left'> <td>{SrNo++}</td><td id='id{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryId}</td><td style='text-align=left' id='desc{$T.CategoryDTO.categoryId}'>{$T.CategoryDTO.categoryName}</td>"
		+ "<td><button id='btnEdit2' class='btn btn-xs btn-success editUserAccess' onclick=\"viewChargesDetail({$T.CategoryDTO.categoryId})\" value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td>"
		+ "<td><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger deleteUserAccess' type='button' onclick=\"deleteChargesDetail({$T.CategoryDTO.categoryId})\" disabled='disabled'><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

function viewChargesDetail(categoryId) {
	/*$("#SaveUpdate").val('Update');*/
	if (categoryId == null || categoryId == "") {
		alert("Plz enter Category Id");
		$("#byName").focus();
		return false;
	}
	var obj = $("#chargesAjaxResp").html();
	var objChargrs = JSON.parse(obj);
	for ( var i = 0; i < objChargrs.CategoryDTO.length; i++) {
		if (objChargrs.CategoryDTO[i].categoryId == categoryId) {
			$("#txtChargesId").val(objChargrs.CategoryDTO[i].categoryId);
			$("#txtChargesname").val(objChargrs.CategoryDTO[i].categoryName);
		}
	}
}
/******
 * @author     :BILAL
 * @Date       :30-11-2017
 * @Code       :For delete charges master 
 * *******/
function deleteChargesDetail(Id) {
	/*var didConfirm = confirm("Are you sure to delete charges ?");
	if (didConfirm) {
		var inputs = [];
		inputs.push('action=deleteChargesDetail');
		inputs.push('categoryId=' + categoryId);
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
			alert("Category deleted successfully");
			   fetchChargesDetail();

			}
		});
	}*/
	var r = confirm("Are You Sure You Want To Delete Charges Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventory/deletecharges",
			data : {
				"id" : Id
			},
			
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				fetchChargesDetail();
			}

		});
	}
}

function fetchChargesDetailforSearch(byName) {
	/*var byName = $("#byName").val();*/
	if(byName == ""|| byName == null)
		{
		alert("Please Enter Charge Name");
		return false;
		}
	var inputs = [];
	inputs.push('action=fetchChargesDetail');//fetchCategoryDetail
	inputs.push('isEdit=yes');
	inputs.push('chargesName='+byName);
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
			if (pobj1.CategoryDTO.length > 0) 
			{
			$("#chargesContent").setTemplate(inventoryChargesTemp);
			$("#chargesContent").processTemplate(pobj1);
			$("#chargesAjaxResp").html(r);
			}
			else 
			{
				alert("Record not found..!");
				fetchChargesDetail();
				$('#byName').val("");
				$('#byName').focus();
			}
			
			userAccess();
		}
	});
}
