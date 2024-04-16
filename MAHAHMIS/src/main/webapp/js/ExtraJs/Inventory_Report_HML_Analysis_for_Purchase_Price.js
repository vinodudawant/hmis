 /*************************** show XYZ Analysis  for sales price Author Sudhir Date:30 Dec 2015 ********************************/
function getHMLAnalysisReportforPurchasePrice() {
	
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var reportName ="HMLPurchasePriceReport";
	//var categoryName = $("#txtCategory").val();
	
	if (from != '' && to != '') {
		
		var inputs = [];
		inputs.push('action=getXYZAnalysisReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('reportName=' + reportName);
		
		//inputs.push('categoryName='+ categoryName);
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
			success:function(r) {
				alert("report generated succesfully");
				var b = r.replace(/"/g, "");
				setResultforHMLPurchasePrice(b);
			}
		});
		return true;
} else {
	alert('Please Fill All the Details');
}
}


/*function setResult(result) {
	var splitResult = result.split('$');
	$('#setButtons')
			.html(
					"<button onclick='getPurchaseCategoryDataByItemNameReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hidePopUp()' data-dismiss='modal'>Close</button>");
}*/

function setResultforHMLPurchasePrice(result) {
	var splitResult = result.split('$');
	$('#setButtons')
			.html(
					"<button onclick='getHMLAnalysisReportforPurchasePrice()' class='btn btn-xs btn-success' type='button'>Get"	+ "Report </button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryHMLAnalysisPurchasePriceReport/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryHMLAnalysisPurchasePriceReport/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");
}