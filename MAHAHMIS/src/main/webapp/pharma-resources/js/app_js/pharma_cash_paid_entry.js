var totalAmount=0;

function splitCashPaidEntry(content) {
	
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
function resetCashValues() {
	$('#cashPaidEntryForm').find('input:text').val('');
	$('#cashPaidEntryForm').find('input:hidden').val('');
	$('#txtPartyName').val('');
}

//search function
function searchCashPaidEntry(vendorId) 
{
	resetCashValues();
var inputs = [];
inputs.push('vendorId=' + vendorId);
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "../../pharmacy/cashPaidEntry/getCashPaidById",
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
		}
		$("#hiddenVendorId").val('');
		setTableData(r);
	}
});
}
function calculate(id)
{  
	$('#amount'+id).val('');
	if ($('#selected'+id).is(':checked')) 
	{
		$('#amount'+id).val($('#billAmt'+id).val());
		$('#balance'+id).val(0);
		totalAmount=totalAmount+parseFloat($('#billAmt'+id).val());
		$('#txtAmount').val(totalAmount);
	}
	else
	{
		totalAmount=totalAmount-parseFloat($('#billAmt'+id).val());
		$('#txtAmount').val(totalAmount);
	}

}


function setAmt()
{
	$('#txtAmount').val(0);
	
}


function displayBillRecords(number)
{ 
    $('#txtAmount').val('');
	$('#txtAmount').val(0);
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data :{vendorId: number},
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
		var billDate=getDate(r[i].purBillDate); 
		divContent = divContent
				+ "<tr><td><label  class=' input-SmallText'>"
				+ (i+1)
				+ "</label></td>"
				/*+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='type"
				+ r[i].purId
				+ "' value='"
				+ "'></td>"*/
				+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='vouNo"
				+ r[i].purId
				+ "' value='"
				+ r[i].purDocId
				+ "'></td>"
				
				+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='billNo"
				+ r[i].purId
				+ "' value='"
				+ r[i].purBillNo
				+ "'></td>"
				
				
				+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' id='billDate"
				+ r[i].purId
				+ "' value="+billDate+"></td>";
				

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
				
         divContent = divContent+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' readonly='true' id='billAmt"
				+ r[i].purId
				+ "' value='"
				+ r[i].purNetAmt
				+ "'></td>"
				
			
				+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' readonly='true' id='balance"
				+ r[i].purId
				+ "' value='"
				+ "' name='cashPaidSlaves["
				+(i)
				+"].cashPaidBalance'"
				+"></td>"
				
				
				+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' class='form-control input-SmallText' readonly='true' name='cashPaidSlaves["
				+(i)
				+"].cashPaidAmt'"
				+"id='amount"
				+ r[i].purId
				+ "' value='"
				
				+ "'></td>"
					
				
				+"<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text' readonly='true' name='cashPaidSlaves["
				+ (i)
				+ "].cashPaidDiscount'"
				+"class='form-control input-SmallText' id='disc"
				+ r[i].purId
				+ "' value='"
				+ "'>"
				
				+ " <input type='checkbox' id='selected"
				+ r[i].purId
				+ "' name='selectedValues'"
				+" onclick='calculate("+r[i].purId+")'" +
				"value='" 
				+r[i].purId
				+"' >"
				
				+ " <input type='hidden' id='cashPaidSr"
				+ r[i].purId
				+ "' name='cashPaidSlaves["
				+(i)
				+"].cashPaidSr' value='"
				+(i+1)
				+"'>"
				
				+ " <input type='hidden' id='purchaseMaster"
				+ r[i].purId
				+ "' name='cashPaidSlaves["
				+(i)
				+"].purchaseMaster.purId' value='"+r[i].purId+"'" 
				+">"
				
				+"</td>"
				+"</tr>";
				
		
	}

	$('#CashpaidEntryDiv').html(divContent);
}



function toCreateCashPaidDiv(RowCount, currentRowCount) {
	/* console.log("Hi"); */
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
		document.getElementById("CashpaidEntryDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'  style='margin-top: 8px; padding: 0px 4px 0px 4px;'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText ' id='itn"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='aq"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ip"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='il"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='io"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ih"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateCashPaidDiv('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#itn' + rowCount).focus();
	}

}



function splitCashPaidEntryContent(content) 
{ $('#vendorId').val('');
	totalAmount=0;
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorId').val(arr[1]);
			$('#txtAddress').val(arr[2]);
			$('#txtPhone').val(arr[3]);
			displayBillRecords(arr[1],'0');
		}
		
	}
	else{
		$('#vendorId').val(0);
	}
}

function getDate(milliseconds) 
{
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
		var cashPaidEntryDate = getDate(r[i].cashPaidDate);
		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='cashPaidId"
				+ r[i].cashPaidId
				+ "' value='"
				+ r[i].cashPaidId
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='vendorName"
				+ r[i].cashPaidId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].cashPaidAmt
				+ "<input type='hidden' id='cashPaidAmt"
				+ r[i].cashPaidId
				+ "' value='"
				+ r[i].cashPaidAmt
				+ "'></td> <td class='col-md-2 center'>"
				+ cashPaidEntryDate
				+ "<input type='hidden' id='cashPaidDate"
				+ r[i].cashPaidId
				+ "' value='"
				+ cashPaidEntryDate
				+ /*"'></td><td class='col-md-2 center'><a id='btnPrint"
				+ r[i].cashPaidId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/cashPaidEntry/printView?cashPaidId="
				+ r[i].cashPaidId
				+ "'> <i class='fa fa-print'></i> </a></td>"*/
				"'></td><td class='col-md-2 center'><button id='btnPrint"
				+ r[i].cashPaidId
				+ "' class='btn btn-xs btn-success'  onclick='cashPaidPrint("
			    + r[i].cashPaidId
			    + ")'> <i class='fa fa-print'></i> </button></td>"
				+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCashPaidEntry("
				+ r[i].cashPaidId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#divCashPaidList').html(divContent);
}

function deleteCashPaidEntry(cashPaidId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted Succesfully");
	
		var inputs = [];
		inputs.push('cashPaidId=' + cashPaidId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/cashPaidEntry/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						location.reload(true);
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

function cashPaidPrint(cashPaidId) 
{
	  window.open("../../pharmacy/cashPaidEntry/printView?cashPaidId="+cashPaidId+"");
	
}
