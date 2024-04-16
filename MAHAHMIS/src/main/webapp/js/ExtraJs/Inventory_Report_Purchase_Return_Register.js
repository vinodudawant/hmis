function getReportPurchaseReturnRegister() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	/* var bedType = $("#bedType").val(); */

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		var MasterName = "InventoryPurchaseReturnRegister";
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
							 
				setViewBtns1(b);
			}
		});

	}
}

function setViewBtns1(ajaxResponse) {

	alert("Report Generated Successfully");
	 
	var o = [];

	o = ajaxResponse.split('$');
	
	
	$('#template')
	.html(
			"<button onclick='getReportPurchaseReturnRegister()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryPurchaseReturnRegister/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryPurchaseReturnRegister/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
	

}
