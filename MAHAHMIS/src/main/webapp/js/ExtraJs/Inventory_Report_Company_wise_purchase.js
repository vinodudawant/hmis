/***************** show list of company purchase between two dates  Author: Sudhir Date :12/10/2015 *****/
function showPurchasItemsCompanywiseList()
{
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	
	if (from != '' && to != '') {
		var inputs = [];
		inputs.push('action=getPurchaseCompanyList');
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
				$("#Companywisepurchase").show();
				/* setPartyResult(r); */
				setPurchaseCompanyNamesGridData(r);
			}
		});
		return true;
	} else {
		alert('Please Fill All the Details');
	}
}

function hideCategoryWithItems()
{
	$("#Companywisepurchase").hide();
}

/*************************** Set Cagtegory Data into grid format 5/10/2015 ******************************/

function setPurchaseCompanyNamesGridData(result)
{
	var d=$.parseJSON(result);
	
	var data = d;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
                     
            { name: 'party_id', type: 'string'},
            { name: 'mfg_by_name', type: 'string'},
        ],
        localdata: data
    };
	
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    $("#companyData").jqxGrid(
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
            { text: 'Party Id', datafield: 'party_id', hidden: true},
            { text: 'Company Name', datafield: 'mfg_by_name',width: 346},
         
        ]
    });
    
    $("#companyData").bind('rowselect', function (event) {
        var row = event.args.rowindex;
        var datarow = $("#companyData").jqxGrid('getrowdata', row);
        getItemsPurchaseDetailsByCompanyName(datarow['party_id'],datarow['mfg_by_name']);
    });
   
}

/********************** get Items Purchase Details By Company Name Author:Sudhir Date:12/10/2015 ***************/

function getItemsPurchaseDetailsByCompanyName(partyid,partyName) {
	
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	if (partyName != '') {
		var inputs = [];
		inputs.push('action=getItemsPurchaseDetailsByCompanyName');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('partyid=' + partyid);
		inputs.push('partyName=' + partyName);
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
	if (r.ltinvetorypurchaseorderitemmaster.length > 0) {
		divContent = divContent + "";
		for ( var i = 0; i < r.ltinvetorypurchaseorderitemmaster.length; i++) {
			divContent = divContent + "<tr><td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_master_doc_no_fk + "</td><td class='col-md-1-1'>"+ r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_Name + "</td><td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_create_date + "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_master_Supplier_Name + "</td> <td class='col-md-1-1'>"+ r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_doc_Qty + "</td> <td class='col-md-1-1'>"+ r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_unit_price + "</td><td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_trade_discount_per
					+ "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_trade_discount_amount
					+ "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_trade_base_amount + "</td> </td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_tax_code + "</td> </td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_tax_amount + "</td> <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_batch_No + "</td>  <td class='col-md-1-1'>" + r.ltinvetorypurchaseorderitemmaster[i].inv_purchase_order_item_row_amount + "</td>"
					+ "</tr>";
				}
		divContent = divContent + "";
	} else {
			 divContent = divContent + "<b><center>No Record Found</center></b>";
			}
	$("#companyWiseResult").html(divContent);
}


/* **************** get Item Purchase Data By Company Name and Id Report  for pdf and xls Author :sudhir Date:12/10/2015 ******************** */

function getItemPurchaseDataByCompanyNameandIdReport() {
	
	var selectedrowindex = $("#companyData").jqxGrid('getselectedrowindex');
	var datarow = $("#companyData").jqxGrid('getrowdata', selectedrowindex);
	
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	var partyid = datarow['party_id'];
	var partyName = datarow['mfg_by_name'];
	
	if (partyName != '' && partyName.length > 0 && partyid !='')  {
		var inputs = [];
		inputs.push('action=getItemPurchaseDataByCompanyNameandIdReport');
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('partyid='+ partyid);
		inputs.push('partyName='+ partyName);
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
					"<button onclick='getItemPurchaseDataByCompanyNameandIdReport()' class='btn btn-xs btn-success' type='button'>Get"
							+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryCompanyWisePurchase/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
							+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/Inventory/InventoryMajorReports/InventoryCompanyWisePurchase/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
							+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hideCategoryWithItems()' data-dismiss='modal'>Close</button>");
}
