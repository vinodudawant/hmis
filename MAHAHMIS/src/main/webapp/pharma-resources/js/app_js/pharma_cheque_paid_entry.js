var totalAmount = 0;
//split function
function myFunction(count) {
	
	if(count == 0) 
	{   
		$("#DivBank").hide();
		$("#divChk").hide();
		$("#divChkDate").hide();
		$('#txtChequeNo').val('');
		$('#searchBank').val('');
		$('#bankId').val(0);
					 
	} 
	else if (count == 1) 
	   {
		$("#DivBank").show();
		$("#divChk").show();
		$("#divChkDate").show();
		
	    }

}

function splitChequePaidEntry(content) {
	
		if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			
			$('#hiddenVendorId').val(arr[1]);
		}
	}
	else{
		$('#hiddenVendorId').val(0);
	}
}
//search function
function searchChequePaid(vendorId) 
{
	var inputs = [];
	inputs.push('vendorId=' + vendorId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/chequePaidEntry/getChequePaidById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() 
		{
			alert('error');
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			$('#txtPartyName').val('');
			}
			$("#hiddenVendorId").val('');
			$('#txtPartyName').val('');
			setTableData(r);
		}
	});
}
function calculate(id) {

	if ($('#selected' + id).is(':checked')) {
		$('#amount' + id).val($('#billAmt' + id).val());
		$('#balance'+id).val(0);
		totalAmount = totalAmount + parseFloat($('#billAmt' + id).val());
		$('#txtAmount').val((totalAmount).toFixed(3));
	} else {
		totalAmount = totalAmount - parseFloat($('#billAmt' + id).val());
		$('#txtAmount').val((totalAmount).toFixed(3));
	}
}

function deleteChequePaidEntry(chequePaidId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted Succesfully");

		var inputs = [];
		inputs.push('chequePaidId=' + chequePaidId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/chequePaidEntry/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//location.reload(true);
						if (r == true) {
							/*$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
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

function displayBillRecords(number) {
	 $('#txtAmount').val('');
		$('#txtAmount').val(0);
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			vendorId : number
		},
		url : "../../pharmacy/purchase/getPendingPurbyVendorId",
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

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var billDate = getDate(r[i].purBillDate);
		divContent = divContent
				+ "<tr><td><label  class=' input-SmallText'>"
				+ (i + 1)
				+ "</label></td>"
				/*
				 * +"<td class='col-md-1' style='height: 21.5px;'>" + " <input
				 * type='text' class='form-control input-SmallText' id='type" +
				 * r[i].purId + "' value='" + "'></td>"
				 */
				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='vouNo"
				+ r[i].purId
				+ "' value='"
				+ r[i].purDocId
				+ "'></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='billNo"
				+ r[i].purId
				+ "' value='"
				+ r[i].purBillNo
				+ "'></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='billDate"
				+ r[i].purId
				+ "' value="
				+ billDate
				+ "></td>";
				
		        if (r[i].purTaxVat5 !="null" && r[i].purTaxVat5 !=null) {
				divContent = divContent + "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='vat"
				+ r[i].purId
				+ "' value='"
				+ r[i].purTaxVat5
				+ "'></td>";
				}
				else
					{
					divContent = divContent + "<td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='text' class='form-control input-SmallText' id='vat"
					+ r[i].purId
					+ "' value=''"
					+"'></td>";
					}
		        divContent = divContent+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' readonly='true' id='billAmt"
				+ r[i].purId
				+ "' value='"
				+ r[i].purNetAmt
				+ "'></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' readonly='true' id='balance"
				+ r[i].purId
				+ "' value='"

				+ "'></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' readonly='true' name='chequePaidSlaves["
				+ (i) + "].chequePaidAmt'" + "id='amount" + r[i].purId
				+ "' value='"

				+ "'></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' readonly='true' name='chequePaidSlaves[" + (i)
				+ "].chequePaidDisc'"
				+ "class='form-control input-SmallText' id='disc" + r[i].purId
				+ "' value='" + "'>" + " <input type='checkbox' id='selected"
				+ r[i].purId + "' name='selectedValues' value='"
				+ r[i].purId + "' onclick='calculate(" + r[i].purId + ")'>"

				+ " <input type='hidden' id='chequePaidSr" + r[i].purId
				+ "' name='chequePaidSlaves[" + (i) + "].chequePaidSr' value='"
				+ (i + 1) + "'>"

				/*+ " <input type='hidden' id='chequePaidSlaveId" + r[i].purId
				+ "' name='chequePaidSlaves[" + (i) + "].chequePaidSlaveId' value='0'>"*/
				
				+ " <input type='hidden' id='purchaseMaster" + r[i].purId
				+ "' name='chequePaidSlaves[" + (i)
				+ "].purchaseMaster.purId' value='" + r[i].purId + "'" + ">"

				+ "</td>" + "</tr>";

	}

	$('#ChquePaidEntryDiv').html(divContent);
}

function toCreateChequeDiv(RowCount, currentRowCount) {

	var currentRow = currentRowCount;
	if (currentRow == undefined) {
		currentRow = 0;
	}

	var j = 1;

	var rowCount = $('#' + RowCount).val();

	if (rowCount == -1) {
		rowCount = 0;
	}
	if (rowCount == currentRow) {

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text'class='form-control input-SmallText' id='textVouType"
				+ rowCount
				+ "' name='textVouType' maxlength='150'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textVouNo"
				+ rowCount
				+ "' name='textVouNo' maxlength='6' onkeypress='return validateNumbers(event)'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textBillNo"
				+ rowCount
				+ "' name='textBillNo' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textBillDate"
				+ rowCount
				+ "' name='textBillDate' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textBillAmount"
				+ rowCount
				+ "' name='textBillAmount' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textBalance"
				+ rowCount
				+ "' name='textBalance' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textAmount"
				+ rowCount
				+ "' name='textAmount' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textDiscount"
				+ rowCount
				+ "' name='textDiscount' maxlength='8' onblur=toCreateChequeDiv('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#textVouType' + rowCount).focus();
	}

}

function splitChequePaidEntryBankContent(content) {
	$('#bankId').val(0);
	if (content != "") {
		var arr = content.split("-");
		$('#searchBank').val(arr[0]);
		if (arr.length > 1) {
			$('#bankId').val(arr[1]);
		}

	} else {
		$('#bankId').val(0);
	}
}

function splitChequePaidEntryContent(content) {
	/*totalAmount=0;
	$('#vendorId').val('');
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorId').val(arr[1]);
			$('#txtAddress1').val(arr[2]);
			$('#txtPhone').val(arr[3]);
			displayBillRecords(arr[1], '0');
		}

	} else {
		$('#vendorId').val(0);
	}*/
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorId').val(arr[1]);
			 displayBillRecords(arr[1], '0');
			 
			jQuery.ajax({
				async : true,
				type : "GET",
				data : {
					"vendorId" : arr[1]
				},
				url : "../../pharmacy/vendoraddress/getAllAddressOfVendor",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					
				    $("#txtAddress1").val(r[0][6]);
				    $("#txtPhone").val(r[0][9]);
				    
				   
					//$("#hiddenVendoraddId").val(r[0][0]);
					
				   
				}
			});
			
			
		
		}
	} else {
		$('#vendorId').val(0);
	}
}

function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}
function setTableData(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var chequePaidDate = getDate(r[i].chequePaidDate);
		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='chequePaidId"
				+ r[i].chequePaidId
				+ "' value='"
				+ r[i].chequePaidId
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='vendorName"
				+ r[i].cashPaidId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].chequePaidAmt
				+ "<input type='hidden' id='chequePaidAmt"
				+ r[i].chequePaidId
				+ "' value='"
				+ r[i].chequePaidAmt
				+ "'></td> <td class='col-md-2 center'>"
				+ chequePaidDate
				+ "<input type='hidden' id='chequePaidDate"
				+ r[i].chequePaidId
				+ "' value='"
				+ chequePaidDate
			/*	+ "'></td><td class='col-md-2 center'><a id='btnPrint"
				+ r[i].chequePaidId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/chequePaidEntry/printView?chequePaidId="
				+ r[i].chequePaidId
				+ "'> <i class='fa fa-print'></i> </a></td>"*/
				+ "'></td><td class='col-md-2 center'><button id='btnPrint"
				+ r[i].chequePaidId
				+ "' class='btn btn-xs btn-success'  onclick='chequePaidPrint("
			    + r[i].chequePaidId
			    + ")'> <i class='fa fa-print'></i> </button></td>"
				+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteChequePaidEntry("
				+ r[i].chequePaidId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divChequePaidList').html(divContent);
}

function chequePaidPrint(chequepaidId) 
{
	  window.open("../../pharmacy/chequePaidEntry/printView?chequePaidId="+chequepaidId+"");
	
}