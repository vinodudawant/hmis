
// AutoSuggestion Code.............

function setValuesToAutocompleteForSupplierName(inputID, type) {

	var resultData = [];

	$("#hiddenSupplyerId").val(0);
	var txtVal = $('#' + inputID).val();
	if ((type == "onload") || (txtVal != null && txtVal != "")) {

		// alert(inputID + " " + type);

		var inputs = [];

		inputs.push('action=fetchVendorName');

		inputs.push('txtVal=' + txtVal);

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
						// alert("r.length>>" + r.length);
						var availableTags = [];
						if (r.length == 20) {
							
							alert("NO MATCHING FOUND  please select Suppler Name from Auto suggestion drop down list !");
							$("#txtSupplierName").val('');
							$("#txtSupplierName").focus();
							

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(ajaxResponse);

							// alert(ajaxResponse.ltinvetorypurchasecommonmaster.length);
							for ( var i = 0; i < ajaxResponse.ltpartyMaster.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								availableTags
										.push(ajaxResponse.ltpartyMaster[i].party_master_name
												+ "_"
												+ ajaxResponse.ltpartyMaster[i].party_master_id);
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

								template = template + '<li data-value="'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);

							if (type != 'onload') {
								$("#div" + inputID + " .typeahead").show();
							}

							setTimeout(function() {
								$('#txtSupplierName')
										.typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true

										});
								$('#txtSupplierName').data('typeahead').source = resultData;

							}, 500);
						}
					}
				});

		function displayResult(item) {
			$('#hiddenSupplyerId').val(item.value);
			 
		}
	}
}


//   @Date:09:march:2016  @Author :sudhir
function getSupplierWiseExpiryReport() {
 	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	
	var supplyerId = $("#hiddenSupplyerId").val();
	var txtSupplierName = $("#txtSupplierName").val();
	 
	var reportName ="InventoryReportSupplierWiseExpiry";
	if (from != '' && to != '' && supplyerId != '' && supplyerId != '0') {
		 
		var inputs = [];
		inputs.push('action=getSupplierWiseInvoiceListingReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('supplyerId='+ supplyerId);
		inputs.push('txtSupplierName='+ txtSupplierName);
		inputs.push('reportName='+ reportName);
		
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
				//alert(r);
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
	var splitResult = result.split('$');
	$('#setButtons')
			.html(
					"<button onclick='getSupplierWiseExpiryReport()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportSupplierWiseExpiry/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportSupplierWiseExpiry/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");
}


