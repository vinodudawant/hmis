/******************************** Autocomplete function for Fetch Item Name Author :sudhir Date:08/09/2016 *****************************/
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

 /*************  Featch All Details for Item GRN History Date :08/09/2016 Author:sudhir *  **/
function getReportForItemWiseGrnHistory() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var txtItemcodeId = $("#txtItemcodeId").val();
	var txtItemName = $("#txtitemName").val();
	//alert(txtItemcodeId);
	if (from == '' || to == '' || txtItemName == '' || txtItemcodeId == 0)
		{
		alert("Please Fill All the Details");
		}
	  else {
		 // return false;
		//var MasterName = "DocumentMaster";
		// alert("from = " + from + " to =" + to + " bedType = " + bedType);
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		
		inputs.push('reportName=ItemWiseGrnHistory');
		inputs.push('txtSubInventoryName=' + txtItemcodeId);
		inputs.push('action=getMrnCompleteReport');
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
				//alert(r);
				var b = r.replace(/"/g, "");
							 
				setViewBtns1(b);
			}
		});

	}
}

function setViewBtns1(ajaxResponse) {

	alert("Report Generated Successfully");
	/*$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");
					*/
	
	var o = [];

	o = ajaxResponse.split('$');
	
	$('#template')
	.html(
			"<button onclick='getReportForItemWiseGrnHistory()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryItemWisePurchaseHistoryReports/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/InventoryItemWisePurchaseHistoryReports/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
	/*
	 * var i = ajaxResponse;
	 * 
	 * var z = []; z = i.split('"');
	 * 
	 * var t = z[1];
	 */

	/*var o = [];

	o = ajaxResponse.split('$');
	$("a[href='sss']").attr('href', '/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/MrnCompleteReports/' + o[0]);
	$("a[href='eee']").attr('href', '/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/MrnCompleteReports/' + o[1]);*/

}

