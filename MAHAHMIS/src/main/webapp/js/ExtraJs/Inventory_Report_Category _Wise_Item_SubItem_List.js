function showCategoryWithItems()
{
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	
	if (from != '' && to != '') {
		var inputs = [];
		inputs.push('action=featchItemsCategorywise');
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
				$("#CategorywiseItem").show();
				/* setPartyResult(r); */
				setCategoryGridData(r);

			}
		});
		return true;
	} else {
		alert('Please Fill All the Details');
	}
}

function hideCategoryWithItems()
{
	$("#CategorywiseItem").hide();
}



/*************************** Set Cagtegory Data into grid format 5/10/2015 ******************************/

function setCategoryGridData(result)
{
	var d=$.parseJSON(result);
	
	var data = d;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
                     
            { name: 'item_id', type: 'string'},
            { name: 'item_group', type: 'string'},
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
            { text: 'Category Id', datafield: 'item_id', hidden: true},
            { text: 'Category Name', datafield: 'item_group',width: 346},
         
        ]
    });
    
    $("#categoryData").bind('rowselect', function (event) {
        var row = event.args.rowindex;
        var datarow = $("#categoryData").jqxGrid('getrowdata', row);
        getItemsDetailsByCategoryName(datarow['item_group'])
    });
   
}

/********************** Fetch items Details  Category wise Author:Sudhir Date:06/10/2015 ***************/

function getItemsDetailsByCategoryName(CategoryName1) {
	var CategoryName = CategoryName1;
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	if (CategoryName1 != '') {
		var inputs = [];
		inputs.push('CategoryName=' + CategoryName1);
		inputs.push('action=getItemsDetailsByCategoryName');
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
				success:function(r) {
					//alert(r);
			setCategoryWiseItemDetailsResult(r);
			}
		});
		return true;
	}
	else {
		alert('Please Fill All the Details');
	}
}

/************** set category wise Item Details to templet author :sudhir Date:07/10/2015 ************* */ 
function setCategoryWiseItemDetailsResult(result) {
	var r = $.parseJSON(result);
	var divContent = "";
	if (r.ltInventoryItemMasterDTOs.length > 0) {
		divContent = divContent + "";
		for ( var i = 0; i < r.ltInventoryItemMasterDTOs.length; i++) {
			divContent = divContent + "<tr><td class='col-md-1-1'>" + r.ltInventoryItemMasterDTOs[i].item_group + "</td><td class='col-md-1-1'>"+ r.ltInventoryItemMasterDTOs[i].item_name + "</td><td class='col-md-1-1'>" + r.ltInventoryItemMasterDTOs[i].item_type + "</td><td class='col-md-1-1'>"+ r.ltInventoryItemMasterDTOs[i].lead_time + "</td> <td class='col-md-1-1'>"+ r.ltInventoryItemMasterDTOs[i].mfg_by_name + "</td><td class='col-md-1-1'>" + r.ltInventoryItemMasterDTOs[i].min_stock
					+ "</td> <td class='col-md-1-1'>" + r.ltInventoryItemMasterDTOs[i].max_stock
					+ "</td> <td class='col-md-1-1'>" + r.ltInventoryItemMasterDTOs[i].order_stock + "</td>"
					+ "</tr>";
				}
		divContent = divContent + "";
	} else {
			 divContent = divContent + "<b><center>No Record Found</center></b>";
			}
	$("#categoryWiseResult").html(divContent);
}


/* **************** genrate pdf and excel report Author :sudhir Date:7/10/2015 ******************** */

function getCategoryDataByCategoryNameReport() {
	var selectedrowindex = $("#categoryData").jqxGrid('getselectedrowindex');
	var datarow = $("#categoryData").jqxGrid('getrowdata', selectedrowindex);
	
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var categoryName = datarow['item_group'];
	if (categoryName != '' && categoryName.length > 0) {
		var inputs = [];
		inputs.push('action=getCategoryDataByCategoryNameReport');
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
			success:function(r) {
				alert("report generated succesfully");
				var b = r.replace(/"/g, "");
				setResult(b);
			}
		});
		//return true;
	}
}


function setResult(result) {
	var splitResult = result.split('$');
	$('#setButtons')
			.html(
					"<button onclick='getCategoryDataByCategoryNameReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/CategoryWiseItemSubItemListReport/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/CategoryWiseItemSubItemListReport/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hideCategoryWithItems()' data-dismiss='modal'>Close</button>");
}
