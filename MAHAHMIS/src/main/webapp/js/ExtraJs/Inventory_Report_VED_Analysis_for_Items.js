 /*************************** get VED Analysis Report for Items  Author Sudhir Date: 1 feb 2016 ********************************/
function getVEDAnalysisReport() {
	
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var reportName ="VEDAnalysisReportForItem";
	if (from != '' && to != '') {
		
		var inputs = [];
		inputs.push('action=getXYZAnalysisReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('reportName=' + reportName);
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
				setResult(b);
			}
		});
		return true;
} else {
	alert('Please Fill All the Details');
}
}

 

function setResult(result) {
	var o = [];
	o = result.split('$');
	
	$('#template')
	.html(
			"<button onclick='getVEDAnalysisReport()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryVEDAnalysisReport/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryVEDAnalysisReport/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
}