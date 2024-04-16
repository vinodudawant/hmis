function getUserListCondition(type) {
	if (type == 'edit') {
		getUserList();
	} else {
		if ($("input[name='storeAuthentication']:checked").val() != null
				&& $("input[name='storeAuthentication']:checked").val() != '') {
			getUserList();

		} else {
			$("#userData").hide('hide');
		}
	}

}

function getUserList() {
/*	var inputs = [];
	inputs.push('action=fetchUser');
	inputs.push('callFrom=' + "UserManagement");
	var str = inputs.join('&');*/
	jQuery
			.ajax({
				async : true,
				type : "GET",
			//	data : str + "&reqType=AJAX",
				url : "../../ehat/users/getUsersList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					//var result = jQuery.parseJSON(r);

					var divContent = "";
					divContent = divContent
							+ "<select id='users' name='users' multiple class='col-md-12-1' onchange='setAuthenticationUsers()'>";
					for ( var i = 0; i < r.length; i++) {
						divContent = divContent + "<option value='"
								+ r[i].user_ID + "'>" + r[i].f_name
								+ " " + r[i].m_name + " "
								+ r[i].l_name + "</option>";
					}
					divContent = divContent + "</select>";
					$("#userData").html(divContent);
					$("#userData").show('show');
				}
			});

}

function setAuthenticationUsers() {
	var foo = [];
	$('#users :selected').each(function(i, selected) {
		foo[i] = $(selected).val();
	});

	if (foo.length > 0)
		$("#storeUserId").val(foo);
	else
		$("#storeUserId").val(0);
}

function resetBankValues() {
	$('#bankMaster').find('input:text').val('');
	$('#bankMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}
function checkValue() {
	var DebitAmt = parseFloat($('#txtDebit').val());
	var CreditAmt = parseFloat($('#txtCredit').val());

	if (DebitAmt > CreditAmt) {
		alert("Debit Amount should be less than Credit Amount!");
		$('#txtDebit').val('');
	}

}
function deleteStore(storeId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();
		alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('storeId=' + storeId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/store/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						// getBankList();
						if (r == true) {
							/*
							 * $('#resultDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
							 * hideResultDiv(); location.reload();
							 */
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}

}
function editStore(storeId) {
	$('#storeId').val($('#storeUserId' + storeId).val());
	$('#txtStoreName').val($('#storeName' + storeId).val());

	var storeUserId = $("#storeUserId" + storeId).val();
	/* var splittedUserId=storeUserId.split(","); */

	var splittedUserId = storeUserId.split(",");
	var authenticate = $('#storeAuthentication' + storeId).val();
	if (parseInt(authenticate) == 1) {
		getUserListCondition('edit');
		$('#txtStoreAuthentication').prop('checked', true);
		$("#userData").show('show');

		for ( var i = 0; i < splittedUserId.length; i++) {
			$("#users option[value='" + splittedUserId[i] + "']").attr({
				"selected" : "true"
			});
		}
	} else {
		$('#txtStoreAuthentication').prop('checked', false);
		$("#userData").hide('hide');

		/* deSelectOptions('users'); */
	}

}

function deSelectOptions(selectBox) {
	var elements = document.getElementById(selectBox).options;
	for ( var i = 0; i < elements.length; i++) {
		elements[i].selected = false;
	}
}

function getBankList() {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/bank/bankList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setTableContent(r);
		}
	});
	return true;
}

function splitContent(content) {
	if (content != "") {
		var arr = content.split("-");

		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}

function searchStoreforMRN(storeId) {
	resetBankValues();

	var inputs = [];
	inputs.push('storeId=' + storeId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/store/getStoreById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == "") {
				alert("Record not found!");
			}
			$("#hiddenId").val('');
			setTableContent(r);
		}
	});
}

// set table content
function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<tr>" + "<td class='col-md-1'>" + (i + 1)
				+ "<input type='hidden' id='storeId" + +r[i].storeId
				+ "'value='" + +r[i].storeId + "'></td>"
				+ "<td class='col-md-2'>" + r[i].storeName
				+ "<input type='hidden' id='storeName" + +r[i].storeId
				+ "' value='" + r[i].storeName + "'>" + "</td>"
				
				+ "<td class='col-md-2'>" + r[i].storeUserId
				+ "<input type='hidden' id='storeUsers" + +r[i].storeId
				+ "' value='" + r[i].storeUserId + "'>" + "</td>"
		
		        +" <td class='col-md-1'> <button id='btnEdit" + r[i].storeId
				+ "' class='btn btn-xs btn-success' onclick='editStoreAuthentication("
				+ r[i].storeId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button></td></tr>";
	}
	$('#divSubStoreMasters').html(divContent);
}