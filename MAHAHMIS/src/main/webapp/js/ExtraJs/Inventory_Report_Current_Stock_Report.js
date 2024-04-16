function showAndHideSubInventoryDiv(){
	var typeOfInventory = $('input[name="typeOfInventory"]:checked').val();
	
	if(typeOfInventory == "SubInventory")
		{
		$("#subInventoryDiv").show();
		}
	
	if(typeOfInventory == "Inventory")
		{
		$("#txtSubInventoryName").val(' '); 
		$("#subInventoryDiv").hide();
		}
	$("#subInventorychkC").val('SubInventory');
	$("#inventorychkC").val('Inventory');
}



function getReportForInventoryCurrentStock() {
	
	var typeOfInventory = $('input[name="typeOfInventory"]:checked').val();
	 
	if(typeOfInventory==undefined)
		{
		alert("Please Select Inventory or SubInventory Option ");
		return false;
		}
	if(typeOfInventory == "SubInventory")
	{
		getReportForSubInventoryCurrentStock();
		return false;
	$("#subInventoryDiv").hide();
	}
	var from = "10/10/2010";
	var to = "10/10/2010";  

		var MasterName ="InventoryCurrentStock";
		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('MasterName=' + MasterName);
		inputs.push('action=getDocumentListReport');
		/* inputs.push('bedType=' + bedType); */
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
				var b = r.replace(/"/g, "");
				$("input:radio").attr("checked", false);
				$("#subInventorychkC").val('SubInventory');
				$("#inventorychkC").val('Inventory');
				setViewBtns1(b);
			}
		});

	}

function setViewBtns1(ajaxResponse) {
	alert("Report Generated Successfully");
	/*$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	var o = [];

	o = ajaxResponse.split('$');
	
	$('#template')
	.html(
			"<button onclick='getReportForInventoryCurrentStock()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryCurrentStockReports/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryCurrentStockReports/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
	 
}





function getReportForSubInventoryCurrentStock() {
	
	var typeOfInventory = $('input[name="typeOfInventory"]:checked').val();
	var from = "10/10/2010";
	
	txtSubInventoryName = $("#txtSubInventoryName").val();
	if(txtSubInventoryName ==" " || txtSubInventoryName == null)
	{
		alert("please Enter SubInventory Name");
		return false;
	}
	var to = txtSubInventoryName;  
		var MasterName ="SubInventoryCurrentStock";
		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('MasterName=' + MasterName);
		inputs.push('action=getDocumentListReport');
		/* inputs.push('bedType=' + bedType); */
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
				var b = r.replace(/"/g, "");
				$("input:radio").attr("checked", false);
				$("#subInventorychkC").val('SubInventory');
				$("#inventorychkC").val('Inventory');
				setViewSubIventoryCurrentStock(b);
			}
		});

	}

function setViewSubIventoryCurrentStock(ajaxResponse) {
	alert("Report Generated Successfully");
	/*$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	var o = [];

	o = ajaxResponse.split('$');
	
	$('#template')
	.html(
			"<button onclick='getReportForInventoryCurrentStock()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryCurrentStockReports/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryCurrentStockReports/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
	 
}