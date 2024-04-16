setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function saveCounter() {
		
	var txtVouNo = $("#txtVouNo").val();
	
	var searchBox1=$("#searchBox1").val();

	var txtAddress1 = $("#txtAddress1").val();

	var txtPhone = $("#txtPhone").val();

	var txtVouDate = $("#txtVouDate").val();

	var txtAmount = $("#txtAmount").val();

	var txtNarration = $("#txtNarration").val();

	var txtNameMadeBY = $("#txtNameMadeBY").val();

	var vendorId = $("#vendorId").val();
	
	var inputs = [];

	// General Info
	
	inputs.push("txtVouNo=" + txtVouNo);
	inputs.push("searchBox1=" + searchBox1);
	inputs.push("txtAddress1=" + txtAddress1);
	inputs.push("txtPhone=" + txtPhone);
	inputs.push("txtVouDate=" + txtVouDate);
	inputs.push("txtAmount=" + txtAmount);
	inputs.push("txtNarration=" + txtNarration);
	inputs.push("txtNameMadeBY=" + txtNameMadeBY);
	inputs.push("vendorId=" + vendorId);


	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str,
		url : "../../pharmacy/cashReceiptEntry/save",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			alert("Record saved successfully..!");
			
			 window.location.href = "view";
			window
			.open("../../pharmacy/cashReceiptEntry/printView?cashId="+r,'_blank');
			
		}
	});
}

function splitCashReceiptEntryContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorId').val(arr[1]);
			$('#txtAddress1').val(arr[2]);
			$('#txtPhone').val(arr[3]);

		}

	} else {
		$('#vendorId').val(0);
	}
}

function splitCash(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#vendorIdSearch').val(arr[1]);

		}

	} else {
		$('#vendorIdSearch').val(0);
	}
}

function edit(cashReceiptId) {
	
	$('#vendorId').val($('#vendorId' + cashReceiptId).val());
	$('#vendoraddid').val($('#vendoraddid' + cashReceiptId).val());
	$('#cashReceiptId').val($('#cashReceiptId' + cashReceiptId).val());
	$('#txtVouNo').val($('#DocId' + cashReceiptId).val());
	$('#searchBox1').val($('#VendorName' + cashReceiptId).val());
	$('#txtAddress1').val($('#vendorAddress' + cashReceiptId).val());
	$('#txtPhone').val($('#cashVendorPhon' + cashReceiptId).val());
	$('#txtVouDate').val($('#cashReceiptDate' + cashReceiptId).val());
	$('#txtAmount').val($('#cashVendorAmt' + cashReceiptId).val());
	$('#txtNarration').val($('#cashReceiptNarration' + cashReceiptId).val());

	$('#txtNameMadeBY').val($('#cashReceiptMadeBy' + cashReceiptId).val());

}

// get formatted date dd/mm/yyyy
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}
function deleteCash(cashId) {

	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	// alert(cashId);
	
		setTimeout(
				function() {
					var inputs = [];
					inputs.push('cashReceiptId=' + cashId);

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "GET",
								data : str + "&reqType=AJAX",
								url : "../../pharmacy/cashReceiptEntry/delete",
								timeout : 1000 * 60 * 5,
								catche : false,
								error : function() {
									alert("error");
								},
								success : function(r) {
									//getCashList();
									if (r == true) {
									/*	$('#msgDiv')
												.html(
														"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
									} else {
										$('#msgDiv')
												.html(
														"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
									}
									window.location.href = "view";
								}
							});
				}, 500);

	} else {
		return false;
	}

}
function getCashList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/cashReceiptEntry/cashReceiptList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setTableContent(r);
		}
	});

	return true;
}
function resetCashValues() {
	$('#CashReceiptMasterForm').find('input:text').val('');
	$('#CashReceiptMasterForm').find('input:hidden').val('');
	$('#searchBox').val('');
}

function searchCash(id,addId) {
	
	resetCashValues();
		var inputs = [];
	inputs.push('vendorId=' + id);
	inputs.push('vendorAddId=' + addId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/cashReceiptEntry/getCashbyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#vendorIdSearch").val('');
			setTableContent(r);

		}
	});

	return true;
}

function setTableContent(result) {
	var r = result;

	var divContent = "";
	for (var i = 0; i < r.length; i++) {
		var cashDate = getDate(r[i].cashReceiptDate);

		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='cashReceiptId"
				+ r[i].cashReceiptId
				+ "' value='"
				+ r[i].cashReceiptId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='VendorName"
				+ r[i].cashReceiptId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].vendorAddress.vendorMobileNumber
				+ "<input type='hidden' id='cashVendorPhon"
				+ r[i].cashReceiptId
				+ "' value='"
				+ r[i].vendorAddress.vendorMobileNumber
				+ "'></td> <td class='col-md-2 center'>"
				+ cashDate
				+ "<input type='hidden' id='cashReceiptDate"
				+ r[i].cashReceiptId
				+ "' value='"
				+ cashDate
				+ "'></td><td style='display: none' id='vendorName'>"
				+ r[i].cashReceiptDocId
				+ "<input type='hidden' id='DocId"
				+ +r[i].cashReceiptId
				+ "'value='"
				+ r[i].cashReceiptDocId
				+ "'>"
				+ "</td><td style='display: none' id='vendorId'>"
				+ r[i].vendorMaster.vendorId
				+ "<input type='hidden' id='vendorId"
				+ +r[i].cashReceiptId
				+ "'value='"
				+ r[i].vendorMaster.vendorId
				+ "'>"
				
				+ "</td><td style='display: none' id='vendoraddid'>"
				+ r[i].vendorAddress.vendorAddressId
				+ "<input type='hidden' id='vendoraddid"
				+ +r[i].cashReceiptId
				+ "'value='"
				+ r[i].vendorAddress.vendorAddressId
				+ "'>"
				
				
				+"</td><td style='display: none' id='txtCredit'>"
				+ r[i].vendorAddress.vendorAddress
				+ "<input type='hidden' id='vendorAddress"
				+ +r[i].cashReceiptId
				+ "'value='"
				+ r[i].vendorAddress.vendorAddress
				+ "'>"
				+ "</td><td style='display: none' id='txtCredit'>"
				+ r[i].cashReceiptNarration
				+ "<input type='hidden' id='cashReceiptNarration"
				+ +r[i].cashReceiptId
				+ "'value='"
				+ r[i].cashReceiptNarration
				+ "'>"
				+ "</td><td style='display: none' id='txtCredit'>"
				+ r[i].cashReceiptMadeBy
				+ "<input type='hidden' id='cashReceiptMadeBy"
				+ +r[i].cashReceiptId
				+ "'value='"
				+ r[i].cashReceiptMadeBy
				+ "'>"
				+ "</td><td class='col-md-2 center'>"
				+ r[i].cashReceiptAmt
				+ "<input type='hidden' id='cashVendorAmt"
				+ r[i].cashReceiptId
				+ "' value='"
				+ r[i].cashReceiptAmt
				+ "'></td> "
				/*+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].cashReceiptId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/cashReceiptEntry/printView?cashId="
				+ r[i].cashReceiptId
				+ "'> <i class='fa fa-print'></i> </a></td>"*/
				+ "<td class='col-md-2 center'><button id='btnPrint"
				+  r[i].cashReceiptId
				+ "' class='btn btn-xs btn-success'  onclick='cashReceiptPrint("
				+  r[i].cashReceiptId
				+ ")' > <i class='fa fa-print'></i> </button></td>"
				+"<td class='col-md-1 center'> <button id='btnEdit"
				+ r[i].cashReceiptId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].cashReceiptId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteCash("
				+ r[i].cashReceiptId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divCashList').html(divContent);
}

function cashReceiptPrint(cashReceiptId) 
{
	  window.open("../../pharmacy/cashReceiptEntry/printView?cashId="+cashReceiptId+"");
	
}
/********
 * @author   :BILAL
 * @Date     :21-12-2017
 * @Code     :For autosuggetion of vendor name and id
 * **********/
function autosuggetionVendorView(id){
	var callFrom='list';
	var findingName = $("#searchBox1").val();
	
		var inputs = [];
		inputs.push('findingName=' + findingName);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/vendor/fetchVendorListwithmultipleAdd",			
			timeout : 2000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				
				
				setCashReceiptEntry(r,id,callFrom) ;
			}
		});
		return true;
	
}

function setCashReceiptEntry(response,id,callFrom) {
    
	var myArray = response;// parsing response in JSON format
	
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});


	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'vendorname',
					width : '150px',
					valueField : 'vendorname'
				},{
					name : 'vendorstate',
					width : '150px',
					valueField : 'vendorstate'
				}],

				select : function(event, ui) {
				
					if (callFrom == 'list') {
						$('#searchBox1').val(ui.item.vendorname);
						$("#txtAddress1").val(ui.item.vendoraddress);
						if (ui.item.vendormobilenum > 0) {
							$("#txtPhone").val(ui.item.vendormobilenum);
						}else{
							$("#txtPhone").val(ui.item.vendorlandline);
						}
						
						$("#vendorId").val(ui.item.vendorid);
						$("#vendoraddid").val(ui.item.vendoraddid);
						
					}else{
						$('#searchBox').val(ui.item.vendorname);
						$("#vendorIdSearch").val(ui.item.vendorid);
						$("#vendorAddIdSearch").val(ui.item.vendoraddid);
					}
						
						
					return false;
					
				},

			
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
				
					console.log(data.lstvendorDetails.length);
					var result;
					if (!data || data.lstvendorDetails.length === 0 || !data.lstvendorDetails
							|| data.lstvendorDetails.length === 0) {
						
						result = [ {
							
							'vendorname' : 'NO',
							'vendorstate' : 'Match',
							
						} ];
					} else {
						result = data.lstvendorDetails;
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}