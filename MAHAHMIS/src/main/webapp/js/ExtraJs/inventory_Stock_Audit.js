/*****************total available qty*****************/

function fetchAllBatchStockItems() {
	var inputs = [];
	inputs.push('action=fetchAllAvailableStock');
	inputs.push('isEdit=no');
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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			$("#MRNcontent").setTemplate(inventoryBAtchSTockAllItems);
			$("#MRNcontent").processTemplate(pobj1);
			$("#MRNAjaxResp").html(r);
		}
	});
}
var SrNo = 1;
var inventoryBAtchSTockAllItems = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'>"
	+ "<tr>"
	+ "<th ' class='col-md-1 center'><div>#</div></th>"
	+ "<th ' class='col-md-1 center'><div>Item Id</div></th>"
	+ "<th ' class='col-md-2 center'><div>Item Name</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Reorder Stock</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Max Stock</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Order Stock</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Factor 1</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Factor 2</div></th> "
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Factor 3</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Factor 4</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Available Quantity</div></th> </tr> </thead>"
	+ "{#foreach $T.ltbatchstockAllItemsDTO as ltbatchstockAllItemsDTO}"
	+ "<tr class='center'>"
	+ "<td>{SrNo++}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_item_code}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_batch_item_name}</td>"
	
	+ "<td>{$T.ltbatchstockAllItemsDTO.min_stock}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.max_stock}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.order_stock}</td>"
	
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_item_factor1}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_item_factor2}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_item_factor3}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_item_factor4}</td>"
	+ "<td>{$T.ltbatchstockAllItemsDTO.inv_item_qty}</td</tr>{#/for}</table>";

/*****************search Stock by Item Name  Author: sudhir Date :16/10/2015  ****************/
function fetchMrnItemNameSearchForStockAvaialable() {
	var txtItemnameStock = $('#txtitemName').val();
	var txtItemcodeId = $('#txtItemcodeId').val();
	
	if(txtItemnameStock==""||txtItemnameStock==null)
		{
		alert("Please enter item name first ");
		$("#txtitemName").focus();
		return false;
		
		}
	var inputs = [];
	inputs.push('action=fetchAllAvailableStock');
	inputs.push('isEdit=yes');
	inputs.push('txtItemnameStock=' + txtItemnameStock);
	inputs.push('txtItemcodeId=' + txtItemcodeId);
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
			pobj1 = eval('(' + r + ')');
			objMRN = JSON.parse(r);
			 SrNo = 1;
			if (objMRN.ltbatchstockAllItemsDTO.length > 0) {
				
				$("#MRNcontent").setTemplate(inventoryBAtchSTockAllItems);
				$("#MRNcontent").processTemplate(pobj1);
				
			} else {
				alert("Record not found..!");
				fetchAllBatchStockItems();
			}
			$('#txtitemName').val('');

		}
	});
}
	

function onInventory()
{
	 $("#inventoryStock").css("background-color", "#81A981");
	 $("#inventoryStock").css("color", "white");
	 $("#subInventory").css("color", "black");
	 $("#subInventory").css("background-color", "");
	  
}
function onSubInventory()
{
	 $("#subInventory").css("background-color", "#81A981");
	 $("#subInventory").css("color", "white");
	 $("#inventoryStock").css("color", "black");
	 $("#inventoryStock").css("background-color", "");
}

 


/********************************************fecth stock details by ward name*************************************************/

function fetchSubInventoryStock() {
var txtVal1="-";

	var inputs = [];
	inputs.push('action=fetchLocationAndNameAtuosugg');
	inputs.push('txtVal=' + txtVal1);
	inputs.push('isEdit=all');

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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			objMRN = JSON.parse(r);
			if (objMRN.ltSubInventoryDTO.length > 0)
			{
				
			
				$("#mrnsubStock").setTemplate(inventoryMRNTempStock123);
				$("#mrnsubStock").processTemplate(pobj1);
			//	$("#MRNAjaxRespStock").html(r);
					
						$('#Item_subinvlist').show();
				
				
				 

			}

		}
	});	
  
}

function onCloseBtnRefrshPage() {

	window.location.replace("inventory_Stock_Audit.jsp");

}
var SrNoSubInventory1=1;
var inventoryMRNTempStock123 = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
	+ "<thead class='cf' style='background: white;'>"
	+ "<tr>"
	+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Sr.NO</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>SubInventory ID</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>SubInventory Name</div></th>"

	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>View</div></th>"
	+ "</tr>"
	+ "</thead>"
	+ "{#foreach $T.ltSubInventoryDTO as inventoryMaterialRequestNoteItemInfoSlaveDTO}"
	+ "<tr class='center'>"
	+ "<td>{SrNoSubInventory1++}</td>"
	+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.subinventory_Id}</td>"
	+ "<td id='txtsubid{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.subinventory_Id}'>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.subinventory_name}</td>"
	+ "<td><input type='button' class='btn btn-xs btn-success'  onclick='fetchMaterialRequestNoteStockDetailsForSubInventoryInInventoryStock({$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.subinventory_Id},\"all\")' value='View'></td>"
	+ "</tr>"
	+ "{#/for}</table>";
function fetchStockDetailsByWardNameInInventoryStock(WardName) {

	
	if (WardName == null || WardName == "") {
		alert("Please enter subinventory name");
		$("#txtwardName").focus();
		return false;
	}
	else
	{
	$('#txtwardName').css('border-color', '');	
	var inputs = [];
	inputs.push('action=fetchStockDetailsByWardName');
	inputs.push('isEdit=yes' );
	inputs.push('WardName=' + WardName);

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
			//alert(r);
			pobj1 = eval('(' + r + ')');
			objMRN = JSON.parse(r);
			if (objMRN.inventoryMaterialRequestNoteMasterDTO.length > 0)
			{
				callform="no";
					fetchMaterialRequestNoteStockDetailsForSubInventoryInInventoryStock("0",callform);
					$('#showhideMrnMaintabs').show();
		
				
				 

			} else {	
				 $('#subInventoryStockDiv').hide();
				alert("Record not found Please Enter Vaild Name..!");
				$("#txtwardName").val('');
				$("#txtwardName").focus();
				 
			}

		}
	});	
  }
}



/******************************************* Featch subInventory stock for particular SubInventory *****************************************************/

function fetchMaterialRequestNoteStockDetailsForSubInventoryInInventoryStock(id,callform) {
		//var subinventory = $('#txtwardName').val();
	var subinventory ="";	
	if(callform=="all"){
			
			subinventory =$("#txtsubid"+ id).text();
			$("#Item_subinvlist").hide();
			$('#txtwardName').val(subinventory);

		}else{
			subinventory = $('#txtwardName').val();
		}
	
	    var inputs = [];
		inputs.push('action=fetchMaterialRequestNoteStockDetailsForSubInventory');  
		inputs.push('isEdit=no');
		inputs.push('subinventory=' + subinventory);
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
				objMRN = JSON.parse(r);
				if (objMRN.inventoryMaterialRequestNoteItemInfoSlaveDTO.length > 0)
				{ 
					$("#MRNcontentStock").setTemplate(inventoryMRNTempStock);
					$("#MRNcontentStock").processTemplate(objMRN);
					$("#MRNAjaxRespStock").html(r);
					 

				} else {	
					$('#subInventoryStockDiv').hide();
					alert("Record not found Please Enter Vaild Name..!");
					$("#txtwardName").val('');
					$("#txtwardName").focus();
					 
				}
				
			}
		});
	}

//stock available in SubInventory
var SrNoSubInventory =1;
var inventoryMRNTempStock = "<table class='table table-striped table-bordered header-fixed cf' style='margin: 10px;width: 98%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Sr.NO</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>MRN Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Item Id</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Item Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Issued Date </div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Issued Quantity</div></th>"
		+ "</tr>"
		+ "</thead>"
		+ "{#foreach $T.inventoryMaterialRequestNoteItemInfoSlaveDTO as inventoryMaterialRequestNoteItemInfoSlaveDTO}"
		+ "<tr class='center'>"
		+ "<td>{SrNoSubInventory++}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_id}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_item_code}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_item_name}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.inv_mrn_received_date}</td>"
		+ "<td>{$T.inventoryMaterialRequestNoteItemInfoSlaveDTO.mrn_item_info_slave_fixed_issue_qty_to_subinventory}</td>"
		+ "</tr>"
		+ "{#/for}</table>";



//featch SubInventoryLocation Name
function autoSuggestionForLocation(inputID, typeauto) {
	var resultData = [];

	var txtVal1 = $('#' + inputID).val();

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
					catche : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						 
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
				catche : false,
				error : function() {
					alert('error');
				},
				success : function(result) {
					//alert(result);
					pobj1 = eval('(' + result + ')');
					$("#sclMRNLocation").setTemplate(selSubInventoryLocation);
					$("#sclMRNLocation").processTemplate(pobj1);

				}
			});*/

		}

	}

}


/******************************** Autocomplete function for Fetch Item Name Author :sudhir Date:16/10/2015 *****************************/

function autoSuggest(inputID, typeauto) {
	// alert("hi...."+inputID);autoSuggest(inputID, typeauto)
	var resultData = [];

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

			// featch item sales Details for mrn item name

			/*var inputs = [];
			inputs.push('action=fetchItemSalesDetail');
			inputs.push('itemId=' + currentcode);
			inputs.push('isId=yes');
			var str = inputs.join('&');*/
			// docuemntAjaxResp
			/*jQuery.ajax({
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
					// alert(r);
					pobj1 = eval('(' + r + ')');

					$("#selItemQty_" + idValue).setTemplate(
							selInventorySalesDetailsTemplateforMRN);
					$("#selItemQty_" + idValue).processTemplate(pobj1);

				}
			});*/

		}
	}

}


function expoertexcel(){
	
	var val= $("#invstock").attr("class");

	var div ="MRNcontent";
	if(val=="active"){
		var txtwardName = $("#txtwardName").val();
		if(txtwardName=="" || txtwardName==null || txtwardName==undefined){
			alert("Please Select Subinventory Name!!!");
			return false;
		}
		div="MRNcontentStock";
	}
	window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$='+div+']').html()));
	 e.preventDefault();
				
}



 