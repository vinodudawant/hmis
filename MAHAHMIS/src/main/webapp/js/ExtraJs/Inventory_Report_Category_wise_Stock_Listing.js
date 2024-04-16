/** *************** AutoSuggestion Code for Search Category Name Author :sudhir date 10:10:2015:************** */
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
 
/********************* shows Category wise Items list for purchase Author :Sudhir Date:10/10/2015  modified @Date 27sep2016****************/ 
function showCategoryWiseItemsforStockListing()
{
	var from = '10/10/2016'; //$("#popup_container2").val();
	var to =  '10/10/2016';//$("#popup_container3").val();
	var categoryName = $("#txtCategory").val();
	var typeOfInventory = $('input[name="typeOfCategory"]:checked').val();
	 if(typeOfInventory == undefined)
		 {
		 alert("Please Select First Category Type !");
		 return false;
		 }
	 
	 if(typeOfInventory =="AllCategory")
		 {
		 getReportForAllCategory();
		 return false;
		 }
	 else{
	 
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
				//alert(r);
				alert("report generated succesfully");
				//getStockCategoryDataByItemNameandIdReport();
				var b = r.replace(/"/g, "");
				setResult(b); 
				
				//setCategoryWiseStockResult(r);
				
				//$("#categorywise_purchase_items").show();
				
				//setCategoryWiseItemsGridData(r);

			}
		});
		return true;
	} else {
		alert('Please Fill All the Details');
	}
}
}
/*****************************additonal part by paras @26 sep********************************/
/*fuction for All Cateory wise Stock Report @Date 27/09/2016 @Author Sudhir Jadhav*/

function getReportForAllCategory() {
	var from = '10/10/2016';//$("#popup_container2").val();
	var to = '10/10/2016'; //$("#popup_container3").val();
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		var MasterName = "AllCategorywiseStockReport";
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
							 
				setAllcategorystock(b);
			}
		});

	}
}

/*fuction for All Cateory wise Stock Report @Date 27/09/2016 @Author Sudhir Jadhav*/
function setAllcategorystock(ajaxResponse) {

	alert("Report Generated Successfully");
	 
	/*$('#template')
			.append(
					"&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	/*$('#template').html("&nbsp;&nbsp;<a href='sss' style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='eee' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	var o = [];

	o = ajaxResponse.split('$');
	/*$('#template').html("&nbsp;&nbsp;<a   style='text-decoration: none;'  name='getPDFFile' id='getPDFFile' target=\ '_blank\'  title=\'\' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+o[0]+"'> <input	style=''	type='button' value='View PDF' class='btn btn-xs btn-warning' /></a>&nbsp;<a href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCategoryWisePurchase/"+o[1]+"' name='getPDFFile' style='text-decoration: none;' id='getPDFFile' target=\ '_blank\'  title=\'\'> <input	style=''	type='button' value='View Excel' class='btn btn-xs btn-warning'/></a>");*/
	
	
	$('#template')
	.html(
			"<button onclick='showCategoryWiseItemsforStockListing()' class='btn btn-xs btn-success' type='button'>Get"
					+ "Data</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;'href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCatagoryWiseItemStock/"+o[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCatagoryWiseItemStock/"+o[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
					+ "");
}


function showAndHideCategoryDiv(){
var typeOfCategory = $('input[name="typeOfCategory"]:checked').val();
//alert(typeOfCategory);
if(typeOfCategory == "OnlyCategory")
	{
		$('#txtCategory').attr('value',''); 
		$("#categoryDiv").show();
	
	}

if(typeOfCategory == "AllCategory")
	{
	$('#txtCategory').attr('value',''); 
	$("#categoryDiv").hide();
	}
/*$("#categorychkC").val('OnlyCategory');
$("#allcategorychkC").val('AllCategory');*/
}


/*****************************end additonal part by paras @26 sep********************************/

function hidePopUp()
{
	$("#categorywise_purchase_items").hide();
	
}   


/******************* Set Category Related Items to Templete Author Sudhir Date:10/10/2015 *********************/
/*function setCategoryWiseItemsGridData(result)
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
        getCategoryStockDataByItemNameandId(datarow['item_name'],datarow['item_id']);
    });
   
}*/


/************** Get Item Purchase Data By Category Name Author:sudhir Date:09/10/2015 *********/
/*function getCategoryStockDataByItemNameandId(itemName1,itemId) {
	var itemName = (itemName1.trim());
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	if (itemName != '' && itemId !='' && itemName.length > 0) {
		var inputs = [];
		inputs.push('action=getCategoryStockDataByItemNameandId');
		inputs.push('itemName=' + itemName);
		inputs.push('itemId=' + itemId);
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
				setCategoryWiseStockResult(r);
			}
		});
		return true;
	}
}*/


/************** set category wise Item Purchase Details to templete Author: sudhir Date:10/10/2015 ************* */
function setCategoryWiseStockResult(result) {
	var r = $.parseJSON(result);
	/*var r = result;*/
	var divContent = "";
	total=0;

	if (r.ltbatchstockAllItemsDTO.length > 0) {
		divContent = divContent + "";
		for ( var i = 0; i < r.ltbatchstockAllItemsDTO.length; i++) {
			divContent = divContent + "<tr><td class='col-md-1-1'>" + r.ltbatchstockAllItemsDTO[i].inv_item_code + "</td><td class='col-md-4'>"
					+ r.ltbatchstockAllItemsDTO[i].item_name + "</td><td class='col-md-1-1'>" + r.ltbatchstockAllItemsDTO[i].min_stock + "</td><td class='col-md-1-1'>"
					+ r.ltbatchstockAllItemsDTO[i].max_stock + "</td><td class='col-md-1-1'>" + r.ltbatchstockAllItemsDTO[i].order_stock
					+ "</td> <td class='col-md-1-1'>" + r.ltbatchstockAllItemsDTO[i].inv_item_qty + "</td>"+ "</tr>";
					
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





/* **************** genrate pdf and excel report Author :sudhir Date:10/10/2015 ******************** */

/*function getStockCategoryDataByItemNameandIdReport() {
	var selectedrowindex = $("#categoryData").jqxGrid('getselectedrowindex');
	var datarow = $("#categoryData").jqxGrid('getrowdata', selectedrowindex);
	var from = '10/10/2016'; //$("#popup_container2").val();
	var to = '10/10/2016'; //$("#popup_container3").val();
	
	var item_name = datarow['item_name'];ssssssss
	var item_id = datarow['item_id'];
	var Item_Name1 =(item_name.trim()); 
	if (Item_Name1 != ''&& item_id !='' && Item_Name1.length > 0) {
		var inputs = [];
		inputs.push('action=getStockCategoryDataByItemNameandIdReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('itemName='+ Item_Name1);
		inputs.push('itemId='+ item_id);
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
		//return true;
	}
}*/


function setResult(result) {
 
	var splitResult = result.split('$');
	

/*	$('#setButtons')
			.html(
					"<a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCatagoryWiseItemStock/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style='margin-top:0px'></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCatagoryWiseItemStock/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style='margin-top:0px'></a>"
							+ " ");
	*/
	/******************************chnges by paras suryawanshi @26sep 2016***********************************/	
	
	$('#template')
	.html("<button onclick='showCategoryWiseItemsforStockListing()' class='btn btn-xs btn-success' type='button' id='getCategoryWiseItemsforpurchase'>Get"
			+ "Report</button><a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCatagoryWiseItemStock/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style='margin-top:0px'></a>"
					+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryReportCatagoryWiseItemStock/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style='margin-top:0px'></a>"
					+ " ");
	
	
	
}
 