/******************************** Autocomplete function for Fetch Item Name Author :sudhir Date:16/10/2015 *****************************/

function autoSuggest(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];
	$("#txtItemcodeId").val(0);
	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchItemNamesOnlyAutoSuggest');
		inputs.push('txtVal=' + txtVal1);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(r);

							for ( var i = 0; i < ajaxResponse.ltInventoryItemMasterDTOs.length; i++) {
								availableTags
										.push(ajaxResponse.ltInventoryItemMasterDTOs[i].item_name
												+ "_"
												+ ajaxResponse.ltInventoryItemMasterDTOs[i].item_id);
							}

							// availableTags = ajaxResponse.split("\n");

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value= "'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);
							if (typeauto != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true

								});
								
								$('#txtitemName').data('typeahead').source = resultData;

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#' + inputID).val(item.text);
			var arrValue = (inputID).split("_");
			var idValue = (arrValue[1]);
			var currentcode = item.value;
			$("#txtItemcodeId").val(currentcode);


		}
	}

}
 
function getReportForItemWiseCurrentStock() {
	var txtitemName = $("#txtitemName").val();
var txtItemcodeId =	$("#txtItemcodeId").val();
 
if(txtItemcodeId == "0")
	{
	alert("Please Enter Valid Item Name");
	return false;
	}
	
	var from ="10/10/2018";
	var to = txtItemcodeId;
	/* var bedType = $("#bedType").val(); */

/*	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {*/

		var MasterName = "InventoryItemWiseCurrentStock";
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
				setViewItemWiseCurrentStock(b);
			}
		});

	}
/*}*/

function setViewItemWiseCurrentStock(ajaxResponse) {

	alert("Report Generated Successfully");
	var o = [];

	o = ajaxResponse.split('$');
	/*$('#template').html("&nbsp;&nbsp;<a   style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+o[0]+"'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+o[1]+"' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	
	
	$('#template')
	.html(
			"<button onclick='getReportForItemWiseCurrentStock()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryItemWiseCurrentStockReports/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryItemWiseCurrentStockReports/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
	
	  
}
