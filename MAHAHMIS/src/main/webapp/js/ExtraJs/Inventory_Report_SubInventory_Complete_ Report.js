
function autoSuggestionForLocation(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();
	// alert("text value is:"+txtVal1);

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchLocationAndNameAtuosugg');
		inputs.push('txtVal=' + txtVal1);
		inputs.push('isEdit=no');
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
						// alert(r);
						// alert(r.length);
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND");

						} else {
							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltSubInventoryDTO.length; i++) {
								availableTags
										.push(ajaxResponse.ltSubInventoryDTO[i].subinventory_name
												+ "_"
												+ ajaxResponse.ltSubInventoryDTO[i].subinventory_Id);
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
									onSelect : displayResult1,
									scrollBar : true

								});

							}, 500);
						}
					}
				});

		function displayResult1(item) {
			$('#' + inputID).val(item.text);

			/*var txtMRNLocationName = $("#txtMRNLocationName").val();
			var inputs = [];
			inputs.push('action=fetchLocationforNameAtuosugg');
			inputs.push('txtVal=' + item.text);
			inputs.push('isEdit=yes');
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(result) {
					// alert(result);
					pobj1 = eval('(' + result + ')');
					$("#sclMRNLocation").setTemplate(selSubInventoryLocation);
					$("#sclMRNLocation").processTemplate(pobj1);

				}
			});*/

		}

	}

}

 /***************************** Featch All Details for SubInventory  Date :16/11/2015 Author:sudhir *********************************/
function getReportForSubInventoryName() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var txtSubInventoryName = $("#txtSubInventoryName").val();
	
	if (from == '' || to == '' || txtSubInventoryName == '')
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
		inputs.push('txtSubInventoryName=' + txtSubInventoryName);
		inputs.push('action=getMrnCompleteReport');
		inputs.push('reportName=MrnCompleteReport');
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
	/*$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");
					*/
	
	var o = [];

	o = ajaxResponse.split('$');
	
	$('#template')
	.html(
			"<button onclick='getReportForSubInventoryName()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/MrnCompleteReports/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMasterReports/MrnCompleteReports/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
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

