/** *************** AutoSuggestion Code for Search Category Name Author :sudhir date 09:10:2015:************** */
function setValuesToAutocompleteForCategoryName(inputID, type) {
	var resultData = [];

	var txtVal = $('#' + inputID).val();
	if ((type == "onload") || (txtVal != null && txtVal != "")) {

		var inputs = [];

		inputs.push('action=fetchCategoryName');

		inputs.push('txtVal=' + txtVal);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var availableTags = [];
						if (r.length == 20) {
							alert("NO MATCHING FOUND  please select Category Name from Auto suggestion drop down list !");
							$("#txtCategory").val('');
							$("#txtCategory").focus();
							

						} else {
							ajaxResponse = eval('(' + r + ')');
							// alert(ajaxResponse);

							// alert(ajaxResponse.ltinvetorypurchasecommonmaster.length);
							for ( var i = 0; i < ajaxResponse.CategoryDTO.length; i++) {
								// alert(ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_Supplier_Name+"_"+ajaxResponse.ltinvetorypurchasecommonmaster[i].inv_purchase_common_master_doc_no);
								availableTags
										.push(ajaxResponse.CategoryDTO[i].categoryName
												+ "_"
												+ ajaxResponse.CategoryDTO[i].categoryId);
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
								$('#txtCategory')
										.typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true

										});
								$('#txtCategory').data('typeahead').source = resultData;

							}, 500);
						}
					}
				});

		function displayResult(item) {
			//$('#txtVendorCode').val(item.value);
			 $("#txtCategory").val(item.text);
			 
		}
	}
}

 /********************* shows Category wise Items list for purchase Author :Sudhir Date:09/10/2015 ****************/ 
function showCategoryWiseItemsforPurchase()
{
	var from = "11/10/2014"; //$("#popup_container2").val();
	var to = "11/10/2017";//$("#popup_container3").val();
	var categoryName = $("#txtCategory").val();
	if (from != '' && to != '' && categoryName != '') {
		
		var inputs = [];
		inputs.push('action=featchItemsListBYCategoryName');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('categoryName='+ categoryName);
		
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
				alert(r);
				$("#categorywise_purchase_items").show();
				setCategoryPurchaseGridData(r);

			}
		});
		return true;
	} else {
		alert('Please Fill All the Details');
	}
}

function hidePopUp()
{
	$("#categorywise_purchase_items").hide();
	
}   
 
/******************* Set Category Related Items to Templete *********************/
function setCategoryPurchaseGridData(result)
{
	var d= $.parseJSON(result);
	var data = d;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
                     
            { name: 'item_id', type: 'string'},
            { name: 'item_name', type: 'string'},
        ],
        localdata: data
    };
	
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    $("#categoryData").jqxGrid(
    {
        width: 346,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        columns: [
            { text: 'Item Id', datafield: 'item_id', hidden: true},
            { text: 'Item Name', datafield: 'item_name',width: 346},
            
        ]
    });
    
    $("#categoryData").bind('rowselect', function (event) {
        var row = event.args.rowindex;
        var datarow = $("#categoryData").jqxGrid('getrowdata', row);
        getItemPurchaseDataByCategoryName(datarow['item_name']);
    });
   
}

/************** Get Item Purchase Data By Category Name Author:sudhir Date:09/10/2015 *********/
function getItemPurchaseDataByCategoryName(itemName1) {

	var itemName = itemName1;
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	/* var indentId = indentId; */
	if (itemName1 != '' && itemName1.length > 0) {
		var inputs = [];
		inputs.push('action=getItemPurchaseDataByCategoryName');
		inputs.push('itemName=' + itemName1);
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		
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
				setCategoryWisePurchaseResult(r);
			}
		});
		return true;
	}
}


/************** set category wise Item Purchase Details to templete Author: sudhir Date:09/10/2015 ************* */
function setCategoryWisePurchaseResult(result) {
	var r = $.parseJSON(result);
	/*var r = result;*/
	var divContent = "";
	total=0;

	if (r.ltinvetorypurchaseorderitemmaster.length > 0) {
		divContent = divContent + "";
		for ( var i = 0; i < r.ltinvetorypurchaseorderitemmaster.length; i++) {
			divContent = divContent + "<tr><td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_master_doc_no_fk + "</td><td class='col-md-4'>"
					+ r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_Name + "</td><td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_create_date + "</td><td class='col-md-1-1'>"
					+ r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_doc_Qty + "</td><td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_unit_price
					+ "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_trade_discount_per + "</td>"
					+ "<td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_trade_discount_amount + "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_trade_base_amount+ "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_tax_amount+ "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_row_amount+ "</td> </tr>";
					
			/*calculateTotalAmount(r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_row_amount);*/
		}
		divContent = divContent + "";
	} else {
		divContent = divContent + "<b><center>No Record Found</center></b>";
	}
/*	$("#totalAmount").val(total.toFixed(3));*/
	$("#categoryWiseResult").html(divContent);
}
/*function calculateTotalAmount(amount) {

	if (parseFloat(amount)!='' && parseFloat(amount)!='null' && amount.length > 0) {
		
		 total = total + parseFloat(amount);
	}
}*/


/* **************** genrate pdf and excel report Author :sudhir Date:9/10/2015 ******************** */

/*function getPurchaseCategoryDataByItemNameReport() {
	var selectedrowindex = $("#categoryData").jqxGrid('getselectedrowindex');
	var datarow = $("#categoryData").jqxGrid('getrowdata', selectedrowindex);
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	
	var item_name = datarow['item_name'];
	var Item_Name1 =(item_name.trim()); 
	if (Item_Name1 != '' && Item_Name1.length > 0) {
		var inputs = [];
		inputs.push('action=getPurchaseCategoryDataByItemNameReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('itemName='+Item_Name1);
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
		//return true;
	}
}*/

//modified function Date:21:12:2015  Author :sudhir
function getPurchaseCategoryDataByItemNameReport() {
	/*var selectedrowindex = $("#categoryData").jqxGrid('getselectedrowindex');
	var datarow = $("#categoryData").jqxGrid('getrowdata', selectedrowindex);*/
	var from = "11/10/2014"; //$("#popup_container2").val();
	var to = "11/10/2017";//$("#popup_container3").val();
	var categoryName = $("#txtCategory").val();
	var  poval ="N";
     if($("#allcategorychkC").is(":checked")){
    	 poval="Y";
    	 
     }
	if (from != '' && to != '' && categoryName != '') {
		
	/*var item_name = datarow['item_name'];
	var Item_Name1 =(item_name.trim()); 
	if (Item_Name1 != '' && Item_Name1.length > 0) {*/
		
		var inputs = [];
		inputs.push('action=getPurchaseCategoryDataByItemNameReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('categoryName='+ categoryName);
		inputs.push('poval='+ poval);
		//inputs.push('itemName='+Item_Name1);
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
				window.location.href = "Inventory_Report_Category _wise_Purchase.jsp";

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

function setResult(result) {
	var splitResult = result.split('$');
	$('#setButtons')
			.html(
					"<button onclick='getPurchaseCategoryDataByItemNameReport()' class='btn btn-xs btn-success' type='button'>Get"	+ "Report </button><a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "");
}


