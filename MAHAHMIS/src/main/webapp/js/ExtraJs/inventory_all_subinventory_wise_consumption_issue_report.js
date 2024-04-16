/********************* get All SubInvetory wise Consumption Issues Author :Sudhir Date:03/oct/2015   *****/ 
function getAllSubInvetorywiseConsumptionIssues()
{
	var from = '10/10/2016'; //$("#popup_container2").val();
	var to =  '10/10/2016';//$("#popup_container3").val();
	var allConsumtionIssue = $('input[name="allConsumptionwiseIssue"]:checked').val();
	 if(allConsumtionIssue == undefined)
		 {
		 alert("Please Select option !");
		 return false;
		 }
	 else{
		 
	if (from != '' && to != '' && allConsumtionIssue != '') {
		var MasterName = "AllsubInventorywiseConsumptionissueReport";
		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('MasterName=' + MasterName);
		inputs.push('action=getDocumentListReport');
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
							 
				setAllSubInventorywiseConsumtionIssue(b);
			}
		});		 
	}  
}
}

/*fuction set All SubInventory wise Consumtion Issue Report @Date 3oct2016 @Author Sudhir Jadhav*/
function setAllSubInventorywiseConsumtionIssue(ajaxResponse) {
	alert("Report Generated Successfully");
 	var o = [];
	o = ajaxResponse.split('$');
	
	$('#template')
	.html(
			"<button onclick='getAllSubInvetorywiseConsumptionIssues()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Data</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryAllSubInventorywiseConsumption/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryAllSubInventorywiseConsumption/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
}
  
/*function setResult(result) {
 
	var splitResult = result.split('$');
	

 	*//******************************chnges by Sudhir jadhav @3oct2016***********************************//*	
	
	$('#template')
	.html("<button onclick='showCategoryWiseItemsforStockListing()' class='btn btn-xs btn-success' type='button' id='getCategoryWiseItemsforpurchase'>Get"
			+ "Report</button><a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryAllSubInventorywiseConsumption/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style='margin-top:0px'></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryAllSubInventorywiseConsumption/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style='margin-top:0px'></a>"
					+ " ");
}*/
