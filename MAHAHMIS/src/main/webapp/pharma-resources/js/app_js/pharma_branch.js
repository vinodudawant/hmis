setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function splitBranchContent(content) {
	if (content != "") {
		var arr = content.split("$");
		$('#searchBranch').val(arr[0]);
		if (arr.length > 1) {
		
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}

function resetBranchValues() {
	$('#branchMaster').find('input:text').val('');
	$('#branchMaster').find('input:hidden').val('');
	$('#branchMaster').find('select').val('');
	$('#branchMaster').find('textarea').val('');
	$('#searchBranch').val('');
	//$('#searchBranch').val('');
}

function deleteBranch(branchId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	
		var inputs = [];
		inputs.push('branchId=' + branchId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/branch/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						/*getDoctorsList();*/
						if (r == true) {
						/*	$('#resultDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
							hideResultDiv();
							location.reload();*/
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


function editBranch(branchId)
{
	$('#branchId').val($('#branchId' + branchId).val());
	$('#txtBranchName').val($('#branchName' + branchId).val());
	$('#txtBranchAddress').val($('#branchAddress' + branchId).val());
	
	$('#txtPhone').val($('#branchPhone' + branchId).val());
	$('#txtMobile').val($('#branchMobileNum' + branchId).val());
	$('#txtEmail').val($('#branchEmailId' + branchId).val());
	
	
	var bankCount = parseInt($('#hiddenBankCount' + branchId).val());
	deSelectOptions('selectBank');
	var n = 1;
	while (n <= bankCount) 
	{
		var taxIdVal = '#bankId' + branchId + '' + n;
		
		$("#selectBank option[value='" + $(taxIdVal).val() + "']").prop({
			"selected" : true
		});
		n++;
	}
	
	$('#txtBranchAddress').val($('#branchAddress' + branchId).val());
	
}

function deSelectOptions(selectBox) {
	var elements = document.getElementById(selectBox).options;
	for ( var i = 0; i < elements.length; i++) {
		elements[i].selected = false;
	}
}

/*
function searchBranch(bankId) {
   resetBranchValues();
	
	var inputs = [];
	inputs.push('branchId='+Id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url :"/EhatEnterprise/pharmacy/branch/getBranchById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			}
			setTableContent(r);
		}
	});
}

*/




function searchBranch(Id) {
	resetBranchValues();
	
	var inputs = [];
	inputs.push('branchId='+Id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/branch/getBranchById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Record not found!");
			$('#searchBranch').val('');
		},
		success : function(r) {
			if(r=="")
			{
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
	for (var i = 0; i < r.length; i++) {
		divContent = divContent
				+ "<tr>"
				+ "<td class='col-md-1'>"
				+ (i + 1)
				+ "<input type='hidden' id='branchId"
				+ +r[i].branchId
				+ "'value='"
				+ +r[i].branchId
				+ "'></td>"
				
				+ "<td class='col-md-1'>"
				+ r[i].branchName
				+ "<input type='hidden' id='branchName"
				+ +r[i].branchId
				+ "' value='"
				+ r[i].branchName
				+ "'>"
				+ "</td>"
				
				+ "<td class='col-md-1'>"
				+ r[i].branchAddress
				+ "<input type='hidden' id='branchAddress"
				+ +r[i].branchId
				+ "' value='"
				+ r[i].branchAddress
				+ "'>"
				+ "</td>"
				
				
				+ "<td style='display:none' class='col-md-1 center'>"
				+ r[i].branchPhone
				+ "<input type='hidden' id='branchPhone"
				+ +r[i].branchId
				+ "' value='"
				+ r[i].branchPhone
				+ "'>"
				+ "</td>"
				
				+ "<td class='col-md-1' style='display:none'>"
				+ r[i].branchMobileNum
				+ "<input type='hidden' id='branchMobileNum"
				+ +r[i].branchId
				+ "' value='"
				+ r[i].branchMobileNum
				+ "'>"
				+ "</td>"
				
				+ "<td class='col-md-1' style='display:none'>"
				+ r[i].branchEmailId
				+ "<input type='hidden' id='branchEmailId"
				+ +r[i].branchId
				+ "' value='"
				+ r[i].branchEmailId
				+ "'>"
				+ "</td>"
				
				
				+"<td class='col-md-1'>";
				var bankCount=0;
				for(var j=0;j<r[i].bankMasters.length;j++)
				{
					divContent=divContent
					+r[i].bankMasters[j].bankName
					+ "<input type='hidden' id='bankId"
					+ r[i].branchId+""+(j+1)
					+ "' value='"
					+r[i].bankMasters[j].bankName+'-'+r[i].bankMasters[j].bankId
					+ "'>";
					bankCount=j+1;
					divContent=divContent
					+ "<td style='display:none' class='col-md-1 center'><input type='hidden' id='bankId"
					+ +r[i].bankMasters[j].bankId
					+ "'value='"
					+ +r[i].bankMasters[j].bankId
					+ "'></td>";
					
				}
				
				divContent=divContent
				+"<input type='hidden' id='hiddenBankCount"
				+ r[i].branchId
				+ "' value='"
				+ bankCount
				+ "'>"
				
				+ " <td class='col-md-1'> <button id='btnEdit"
				+ r[i].branchId
				+ "' class='btn btn-xs btn-success' onclick='editBranch("
				+ r[i].branchId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteBranch("
				+ r[i].branchId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divBranchList').html(divContent);
}
