/****************************************************************************************************
 * @author Ganesh Patil
 * @since 28/01/2020
 * @comment for save General Voucher Form
******************************************************************************************************/	
function saveGeneralVoucherMaster(){
	var voucherId = $("#voucherId").val();
	
	var generalVoucherName = $("#generalVoucherName").val();	
	if (generalVoucherName == null || generalVoucherName == "") {
		alert("Please enter voucher name.");
		$("#generalVoucherName").focus();		
		return false;
	}	
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var inputs = [];
	inputs.push('voucherID=' + voucherId);
	inputs.push('voucherName=' + generalVoucherName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/generalvoucher/saveGeneralVoucher",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		success : function(r){
			if (r == 1) {
				alertify.success("Voucher Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "Voucher Updated Sucessfully");				
			}else if (r == 3) {				
				alertify.error("Voucher Name is Already Exist");				
			}else {
				alertify.error("Oops Some Problem Ocured");
			}
			resetGeneralVoucherForm();
			getAllGeneralVoucherList();
		}
	});
}


/****************************************************************************************************
 * @author Ganesh Patil
 * @since 28/01/2020
 * @comment for clear General Voucher Form
******************************************************************************************************/	
function resetGeneralVoucherForm(){
	$('#voucherId').val('0');
	$('#generalVoucherName').val("");
}



/****************************************************************************************************
 * @author Ganesh Patil
 * @since 28/01/2020
 * @comment for fetch all General Voucher List
******************************************************************************************************/	
function getAllGeneralVoucherList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/generalvoucher/getAllGeneralVoucher",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.voucherList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.voucherList[i].voucherName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editGeneralVoucherMaster('"+r.voucherList[i].voucherID+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteGeneralVoucherMaster('"+r.voucherList[i].voucherID+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#generalVoucherDetailsBody').html(divContent);
		}
	});	
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 28/01/2020
 * @comment for edit State by id
******************************************************************************************************/	
function editGeneralVoucherMaster(id) {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/generalvoucher/editVoucherById",
		data : {
			voucherId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#generalVoucherName').val(r.voucherName);
		$('#voucherId').val(r.voucherID);
		}
	});

}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 28/01/2020
 * @comment for delete State by id
******************************************************************************************************/	
function deleteGeneralVoucherMaster(id){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/generalvoucher/deleteVoucherById",
		data : {
			voucherId : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( "Voucher Delete Sucessfully");		
			}else{
				alertify.error( "Voucher Not Deleted.");		
			}
			getAllGeneralVoucherList();
		}
	});
}

/****************************************************************************************************
 * @author Ganesh Patil
 * @since 28/01/2020
 * @comment for search voucher by name
******************************************************************************************************/	
function searchVoucherByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/generalvoucher/searchVoucherByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.voucherList.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.voucherList[i].voucherName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editGeneralVoucherMaster('"+r.voucherList[i].voucherID+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteGeneralVoucherMaster('"+r.voucherList[i].voucherID+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#generalVoucherDetailsBody').html(divContent);
		}
		});
}
