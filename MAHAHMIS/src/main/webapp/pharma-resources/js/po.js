var count = 1;
var doCount = 0;
var rowCount = 1;
var ajaxResponse;

var defaultViewDistributerTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Distributer ID</div><div style='width: 50%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Distributer Name</div><div style='width: 23%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>New Order</div></div></div>{#foreach $T.distributerList as dl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 9%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divDi{count}' style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.dl.distributor_id} </div> <div style='width: 50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: left;'>{$T.dl.dist_name}</div>  <div style='width: 22.5%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='ORDER' id='btnOrder{count}' onclick='newOrder({$T.dl.distributor_id})' class='edit' /></div></div>{#/for}";

var updateOrderTemp = "<table border=1 cellspacing=0 cellpadding=0 width=95	style='width: 10.750in;' id='tblItems' >{#foreach $T.poitemslist as pili}<tr><td style='width:15%; padding: 2.15pt 5.75pt 2.15pt 5.75pt; height: .2in; text-align: center'>{count++} </td><td style='width: 24%; border-top: none; padding: 2.15pt 5.75pt 2.15pt 5.75pt;'><input style='border-width: 2px; border-color: activeborder;' name='txtMedicine1' type='text' id='txtMedicine{rowCount}' size='44' class='auto' value='{$T.pili.itemName}'> <script>$('.auto').autocomplete('AutoSuggetionServlet?auto=medicineOfDist&did='+ document.form1.txtDid.value);</script></td><td style='width: 15%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input onkeypress='return validateNumbers(event)'; style='border-width: 2px; border-color: activeborder;text-align: right;' name='txtUnitPrice1' type='text' id='txtUnitPrice{rowCount}' size='22' onclick='' value='{$T.pili.unit_price}'></td><td style='width: 1%; border-top: none;padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input onkeypress='return validateNumbers(event)' style='border-width: 2px; border-color: activeborder;text-align: right;' name='txtUnit1' type='text' id='txtUnit{rowCount}' size='22' onchange='setEachTotalForUpdate({rowCount})' value='{$T.pili.unit}'></td><td style='width: 26.4%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input  style='border-width: 2px; border-color: activeborder;text-align: right;' name='total' type='text' id='txtPerMedTotal{rowCount}' name='txtPerMedTotal1' size='22' value='{$T.pili.total}'><input id='itd{rowCount++}' type='hidden' value='{$T.pili.po_items_id}'><td style='width: 26.4%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><INPUT type='checkbox' name='chk' value='{$T.pili.po_items_id}'/></td></td></tr>{#/for}<input id='pno' type='hidden' value='{$T.poitemslist.po_no}'><input id='rowCount' type='hidden' value='{--rowCount}'></table>";

var defaultViewDistributerSendTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Purchase Date</div><div style='width: 23%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Distributer Name</div><div style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Order No.</div><div style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Edit </div> <div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Received </div><div style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Store</div></div></div>{#foreach $T.pomasterList as pol}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divDi{count}' style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pol.po_date}</div> <div style='width: 23.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: left;'> {$T.pol.objdist.dist_name} </div> <div style='width: 8%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pol.po_no}</div> <div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' class='edit' onclick='setTempForOrderUpdate({$T.pol.po_no},{$T.pol.distributor_id})' /></div> <div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='RECEIVED' id='btnRec{count}' class='edit'  onclick='chkOrderRec({$T.pol.po_no})' /></div> <div style='width: 12.7%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='STORE' id='btnStore{count}' class='edit' onclick='setPoStore({$T.pol.po_no}) ' /></div></div>{#/for}";

var receivedOrderTemp = "<table border=1 cellspacing=0 cellpadding=0 width=95	style='width: 10.750in;' id='tblItems'>                    {#foreach $T.poitemslist as pili}<tr><td	style='width: 25pt; padding: 5pt; border-top: none; border-left: none; height: .2in; text-align: center'>{++doCount}</td><td style='width: 190pt; border-top: none; padding: 5pt;'>                                                            <input  style='border-width: 2px; border-color: activeborder;' name='txtMedicine{doCount}' type='text' id='txtMedicine{doCount}' size='40'	class='auto' value='{$T.pili.itemName}'> <script>	$('.auto').autocomplete('AutoSuggetionServlet?auto=medicineOfDist&did='+ document.form1.txtDid.value);</script></td><td	style='width: 50pt; border-top: none; padding: 5pt; height: .2in'><input  style='border-width: 2px; border-color: activeborder;text-align: right;' name='txtUnitPrice{doCount}' type='text' id='txtUnitPrice{doCount}' size='21' onclick='getPrice('txtMedicine{doCount}', 'txtUnitPrice{doCount}')' value='{$T.pili.unit_price}'></td>	<td	style='width: 50pt; border-top: none; padding: 5pt; height: .2in'> <input  style='border-width: 2px; border-color: activeborder;text-align: right;' name='txtSendUnit{doCount}' type='text' id='txtSendUnit{doCount}' size='21' value='{$T.pili.unit}'></td><td	style='width: 50pt; padding: 5pt; height: .2in; border-top: none;'><input  style='border-width: 2px; border-color: activeborder;text-align: right;' type='text' name='txtRecUnit{doCount}' onkeyup='checkRecQty(doCount)' id='txtRecUnit{doCount}' size='20'  value='0'  ></td><td	style='width: 30pt; border-top: none; padding: 5pt; height: .2in'><input   style='border-width: 2px; border-color: activeborder;text-align: right;' type='text' id='txtPerMedTotal{doCount}' name='txtPerMedTotal{doCount}' size='18' value='0' onclick='setEachTotalRec({doCount})'></td><td style='width: 20pt; height: .2in; border-top: none;'><input type='checkbox' id='check{doCount}'></td></tr>{#/for}</table>";

var poStoreTemp = "<table border=1 cellspacing=0 cellpadding=0 width=95	style='width: 10.750in;' id='tblItems'>{#foreach $T.poitemslist as pili}<tr><td style='width: 27pt; padding: 2.15pt 5.75pt 2.15pt 5.75pt; height: .2in; text-align: center'>{++doCount} </td><td style='width: 0.15pt; border-top: none; padding: 2.15pt 5.75pt 2.15pt 5.75pt;'><input style='border-width: 2px; border-color: activeborder;background-color: lightgray;' readonly='readonly' name='txtMedicine{doCount}' type='text' id='txtMedicine{doCount}' size='53' class='auto' value='{$T.pili.itemName}'> </td><td style='width: 74.4pt; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input style='border-width: 2px; border-color: activeborder;text-align;text-align: right;background-color: lightgray;' readonly='readonly' name='txtUnitPrice{doCount}' type='text' id='txtUnitPrice{doCount}' size='22' onclick='' value='{$T.pili.unit_price}'></td><td colspan=2	style='padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input style='border-width: 2px; border-color: activeborder;text-align: right;background-color: lightgray;' readonly='readonly' name='txtUnit{doCount}' type='text' id='txtUnit{doCount}' size='22' onchange='setEachTotal({doCount})' value='{$T.pili.unit}'></td><td style='width: 145pt; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input style='border-width: 2px; border-color: activeborder;text-align: right;background-color: lightgray;' readonly='readonly' name='total{doCount}' type='text' id='txtPerMedTotal{doCount}' name='txtPerMedTotal1' size='22' value='{$T.pili.total}'  ></td></tr>{#/for}</table>";

function chkOrderRec(po_no) {

	var inputs = [];

	inputs.push('action=chkOrderRec');
	inputs.push('po_no=' + po_no);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');

			var z = pobj1.pomasterList.length;

			if (z != 0) {
				alert("Order Is Already Received");
				return false;
			} else {
				setTempForOrderReceived(po_no);
			}
		}
	});

}

function checkRecQty(count) {
	var rec = parseInt($("#txtRecUnit" + count).val());
	var send = parseInt($("#txtSendUnit" + count).val());

	// var qty= send-rec;
	if (send >= rec) {

	} else {
		alert("Received items should not be greater than send item.")
		$("#txtRecUnit" + count).val("");
	}

}

function setUserName() {
	var inputs = [];
	inputs.push('action=FetchUser');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#requisitioner").val(pobj1.dl[0].dn);

		}
	});
}

function closePO(poNo) {
	// alert(poNo);
	var inputs = [];
	inputs.push('action=ClosePO');
	inputs.push('poNo=' + poNo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			//alert(ajaxResponse);
			//location.reload();
		}
	});

}

function searchDistributor1() {
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by distributor Id or by distributor Name");
	} else if (byName == "" && byId == "") {
		alert("please inserst something for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + value);
		inputs.push('action=SearchDistributor');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.distributerList == 0) {
					alert("Distributer Not Found");
				} else {

					$("#distMangTemp").setTemplate(defaultViewDistributerTemp);
					$("#distMangTemp").processTemplate(pobj1);
				}
			}
		});

	}
}

function searchOrder() {
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by distributor Id or by distributor Name");
	} else if (byName == "" && byId == "") {
		alert("please inserst something for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + value);
		inputs.push('action=SearchOrder');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "POServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				ajaxResponse = r;

				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.pomasterList.length == 0) {
					alert("Distributer Not Found");
				} else {
					$("#distMangTemp").setTemplate(
							defaultViewDistributerSendTemp);
					$("#distMangTemp").processTemplate(pobj1);
				}
			}
		});

	}
}

function sendToStore(po_no) {
	var myObj = $("#divMyObj").html();

	var inputs = [];
	inputs.push('action=SendToStore');
	inputs.push('myObj=' + myObj);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			myObj = ajaxResponse;

			alert(ajaxResponse);
			window.location = "PurchaseOrderSend.jsp";
			// window.location.href = "POStore.jsp?" + "myObj=" + myObj;
		}
	});
	closePO(po_no);
}

function setOnloadPOStore() {

	count = 1;
	var ajaxResponse1 = $("#divMyObj").html();
	// alert($("#divMyObj").html());
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	$("#divRecOrder").setTemplate(poStoreTemp);
	$("#divRecOrder").processTemplate(ajaxResponse1);

	$("#txtSubtotal").val(ajaxResponse1.sub_total);
	$("#txtSalesTax").val(ajaxResponse1.sales_tax);
	$("#txtSalesTaxPer").val(ajaxResponse1.sales_tax_per);
	$("#txtSHHA").val(ajaxResponse1.ship_hand_charg);
	$("#txtOther").val(ajaxResponse1.other);
	$("#txtGrandTotal").val(ajaxResponse1.grand_total);
	// alert(ajaxResponse1.did);

}

function setPoStore(po_no) {
	// alert(po_no);
	var myObj;
	var inputs = [];
	inputs.push('action=FetchParOrderDet');
	inputs.push('po_no=' + po_no);
	inputs.push('po_type=received');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			myObj = ajaxResponse;
			//alert(myObj);
			// alert()
			myEvalObj = eval('(' + myObj + ')');
			var id = myEvalObj.distributor_id;
			// alert(id);
			if (id == 0) {
				alert("Please Receive Order First");
			}
			window.location.href = "POStore.jsp?" + "myObj=" + myObj + "&add="
					+ myEvalObj.objdist.dist_addr + "&req="
					+ myEvalObj.requisitioner + "&podate=" + myEvalObj.po_date
					+ "&shipped=" + myEvalObj.shipped + "&duedate="
					+ myEvalObj.duedate + "&po_no=" + po_no;
		}
	});
}

function saveRecPO() {

	var myObj = $("#divMyObj").html();
	var textCount = 1;
	var parsedObj = JSON.parse(myObj);
	// alert(parsedObj.poitemslist[0].total);
	var k = 1;
	for ( var i = 0; i < parsedObj.poitemslist.length; i++) {
		var chk = $('input[name=chk' + k + ']').attr('checked');
		//alert(chk);
		if (!chk) {
			parsedObj.poitemslist[i].itemName = "";

		} else {
			parsedObj.poitemslist[i].unit_price = $("#txtUnitPrice" + (i + 1))
					.val();
			parsedObj.poitemslist[i].unit = $("#txtRecUnit" + (i + 1)).val();
			parsedObj.poitemslist[i].total = $("#txtPerMedTotal" + (i + 1))
					.val();
		}
		k++;
	}
	parsedObj.sub_total = $("#txtSubtotal").val();
	parsedObj.sales_tax = $("#txtSalesTax").val();
	parsedObj.sales_tax_per = $("#txtSalesTaxPer").val();
	parsedObj.other = $("#txtOther").val();
	parsedObj.grand_total = $("#txtGrandTotal").val();
	parsedObj.ship_hand_charg = $("#txtSHHA").val();

	parsedObj = JSON.stringify(parsedObj);

	var myObj;
	var inputs = [];
	inputs.push('action=SaveRecPO');
	inputs.push('myObj=' + parsedObj);
	inputs.push('popup_container3=' + $("#popup_container3").val());
	inputs.push('requisitioner=' + $("#requisitioner").val());
	inputs.push('shipped=' + $("#shipped").val());
	inputs.push('popup_container2=' + $("#popup_container2").val());

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "PurchaseOrderSend.jsp";
		}
	});

}

function setPOReceivedOrder() {

	count = 1;
	doCount = 0;
	var ajaxResponse1 = $("#divMyObj").html();
	// alert($("#divMyObj").html());
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	$("#divRecOrder").setTemplate($("#divRecOrder").html());
	$("#divRecOrder").processTemplate(ajaxResponse1);

	// alert(ajaxResponse1.did);
	/*
	 * $("#txtSubtotal").val(ajaxResponse1.sub_total);
	 * $("#txtSalesTax").val(ajaxResponse1.sales_tax);
	 * $("#txtSalesTaxPer").val(ajaxResponse1.sales_tax_per);
	 * $("#txtSHHA").val(ajaxResponse1.ship_hand_charg);
	 * $("#txtOther").val(ajaxResponse1.other);
	 * $("#txtGrandTotal").val(ajaxResponse1.grand_total);
	 */

}

function setTempForOrderReceived(po_no) {

	var myObj;
	var inputs = [];
	inputs.push('action=FetchParOrderDet');
	inputs.push('po_no=' + po_no);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			myObj = ajaxResponse;
			myEvalObj = eval('(' + myObj + ')');
			// alert("particular full object=>" + ajaxResponse);
			window.location.href = "POPrevOrderRec.jsp?" + "myObj=" + myObj
					+ "&add=" + myEvalObj.objdist.dist_addr + "&req="
					+ myEvalObj.requisitioner + "&podate=" + myEvalObj.po_date
					+ "&shipped=" + myEvalObj.shipped + "&duedate="
					+ myEvalObj.duedate + "&po_no=" + myEvalObj.po_no;
		}
	});
}

function setTempForOrderUpdate(po_no, did) {

	var myObj;
	var inputs = [];
	inputs.push('action=FetchParOrderDet');
	inputs.push('po_no=' + po_no);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			myObj = ajaxResponse;
			//alert(myObj);
			myEvalObj = eval('(' + myObj + ')');
			// alert(myEvalObj.objdist.dist_addr);
			// alert(myEvalObj.duedate);
			window.location.href = "POEditOrder.jsp?" + "myObj=" + myObj
					+ "&add=" + myEvalObj.objdist.dist_name + "&req="
					+ myEvalObj.requisitioner + "&podate=" + myEvalObj.po_date
					+ "&shipped=" + myEvalObj.shipped + "&duedate="
					+ myEvalObj.duedate + "&po_no=" + myEvalObj.po_no;

		}
	});
	//

}

function setPOEditOrder(did) {

	// alert("");
	// setInterval(1000);
	delay = 300;
	var ajaxResponse1 = $("#divMyObj").html();
	//alert($("#divMyObj").html());
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	// $("#divRowTbl").setTemplate(updateOrderTemp);
	// $("#divRowTbl").processTemplate(ajaxResponse1);
	// alert(ajaxResponse1.did);
	// var count=document.getElementById("RowCount").value;
	var count = $("#RowCount").val();
	for ( var z = 1; z <= count; z++) {
		var chk = $('input[name=chk' + z + ']').val();
		for ( var i = 0; i < ajaxResponse1.poitemslist.length; i++) {
			if (chk == ajaxResponse1.poitemslist[i].dist_items_id) {
				// $("#txtMedicine" + i).html();
				// $("#txtUnitPrice" + i).val();
				$("#txtUnit" + z).val(ajaxResponse1.poitemslist[i].unit);
				$("#txtPerMedTotal" + z)
						.val(ajaxResponse1.poitemslist[i].total);
				$('input[name=chk' + z + ']').attr('checked', true);
			}
		}
	}
	$("#did").val(ajaxResponse1.distributor_id);

	$("#txtSubtotal").val(ajaxResponse1.sub_total);
	$("#txtSalesTaxPer").val(ajaxResponse1.sales_tax_per);
	$("#txtSalesTax").val(ajaxResponse1.sales_tax);
	$("#txtSHHA").val(ajaxResponse1.ship_hand_charg);
	$("#txtOther").val(ajaxResponse1.other);
	$("#txtGrandTotal").val(ajaxResponse1.grand_total);

	$("#txtTotalRow").val($("#rowCount").val());

}

function defDisplayDistTemp() {

	var inputs = [];
	inputs.push('action=FetchDefSendDist');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			distBean = eval('(' + ajaxResponse + ')');
			$("#distMangTemp").setTemplate(defaultViewDistributerSendTemp);
			$("#distMangTemp").processTemplate(distBean);

		}
	});
}

function deleteRowPO(poItmId) {

	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	// alert(ajaxResponse1);
	var j = 0;
	for ( var i = 1; i <= ajaxResponse1.poitemslist.length; i++) {

		if (ajaxResponse1.poitemslist[j].po_items_id == poItmId) {

			ajaxResponse1.poitemslist[j].itemName = "";

		}
		j++;
	}
	parsedObj = JSON.stringify(ajaxResponse1);
	$("#divMyObj").html(parsedObj);

};

function UpdatePO() {

	// var strRowsVal = "";

	// var rowCnt = $("#txtTotalRow").val();
	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');

	/*
	 * for (k = 1; k <= rowCnt; k++) { var ii = $("#txtMedicine" + k).val(); if
	 * (k <= ajaxResponse1.poitemslist.length) {
	 * 
	 * if (ii != undefined) { // alert("got update"); var a = --k; k++;
	 * ajaxResponse1.poitemslist[a].unit_price = $("#txtUnitPrice" + k) .val();
	 * ajaxResponse1.poitemslist[a].unit = $("#txtUnit" + k).val();
	 * ajaxResponse1.poitemslist[a].total = $("#txtPerMedTotal" + k) .val(); }
	 * else { // alert("Not going"); } } else { if (ii != undefined) { //
	 * alert("got insert"); var item_name = $("#txtMedicine" + k).val(); var
	 * item_price = $("#txtUnitPrice" + k).val(); var item_unit = $("#txtUnit" +
	 * k).val(); var item_total = $("#txtPerMedTotal" + k).val(); if (strRowsVal ==
	 * "") { strRowsVal = item_name + "," + item_price + "," + item_unit + "," +
	 * item_total + "#"; } else { strRowsVal = strRowsVal + item_name + "," +
	 * item_price + "," + item_unit + "," + item_total + "#"; } } else { //
	 * alert("Not going"); } } }
	 */
	ajaxResponse1.sales_tax = $("#txtSalesTax").val();
	ajaxResponse1.sales_tax_per = $("#txtSalesTaxPer").val();
	ajaxResponse1.sub_total = $("#txtSubtotal").val();
	ajaxResponse1.ship_hand_charg = $("#txtSHHA").val();
	ajaxResponse1.grand_total = $("#txtGrandTotal").val();
	ajaxResponse1.other = $("#txtOther").val();

	// var ajaxResponse1 = $("#divMyObj").html();
	var noOfRow = $("#RowCount").val();
	var strRowsValues = "";
	var did = $("#txtDid").val();
	var i_total = $("#txtGrandTotal").val();

	for ( var i = 1; i <= noOfRow; i++) {
		var chk = $('input[name=chk' + i + ']').attr('checked');
		if (chk == true) {
			var item_name = $("#txtMedicine" + i).html();
			var item_price = $("#txtUnitPrice" + i).val();
			var item_unit = $("#txtUnit" + i).val();
			var item_total = $("#txtPerMedTotal" + i).val();
			var itemId = $('input[name=chk' + i + ']').val();
			if (item_name != "" && item_price == "") {
				alert("Unit Price Must be filled out");
				return false;
			} else if (item_price != "" && item_unit == "") {
				alert("Unit Must be filled out");
				return false;
			} else if (item_unit != "" && item_total == "") {
				alert("Total Must be filled out");
				return false;
			}

			else if (item_total != "" && i_total == 0) {
				alert("Grand Total Must be filled out");
				return false;
			}
			if (strRowsValues == "") {
				strRowsValues = itemId + "," + item_price + "," + item_unit
						+ "," + item_total + "#";
			} else {
				strRowsValues = strRowsValues + itemId + "," + item_price + ","
						+ item_unit + "," + item_total + "#";

			}

		}

	}

	ajaxResponse1.sales_tax = $("#txtSalesTax").val();
	ajaxResponse1.sales_tax_per = $("#txtSalesTaxPer").val();
	ajaxResponse1.sub_total = $("#txtSubtotal").val();
	ajaxResponse1.ship_hand_charg = $("#txtSHHA").val();
	ajaxResponse1.grand_total = $("#txtGrandTotal").val();
	ajaxResponse1.other = $("#txtOther").val();

	parsedObj = JSON.stringify(ajaxResponse1);

	var inputs = [];
	inputs.push('action=UpdatePO');
	// inputs.push('strRowsValues=' + strRowsValues);
	inputs.push('strRowsValues=' + strRowsValues);
	inputs.push('strRowsVal=' + parsedObj);
	inputs.push('popup_container3=' + $("#popup_container3").val());
	inputs.push('requisitioner=' + $("#requisitioner").val());
	inputs.push('shipped=' + $("#shipped").val());
	inputs.push('popup_container2=' + $("#popup_container2").val());
	// inputs.push('billComp=' + billComp);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "PurchaseOrderSend.jsp";
		}
	});

}

function savePO() {
	var flag = 0;
	var noOfRow = $("#RowCount").val();
	var strRowsValues = "";
	var did = $("#txtDid").val();
	var i_total = $("#txtGrandTotal").val();

	for (i = 1; i <= noOfRow; i++) {
		var chk = $('input[name=chk' + i + ']').attr('checked');
		if (chk == true) {
			var item_name = $("#txtMedicine" + i).html();
			var item_price = $("#txtUnitPrice" + i).val();
			var item_unit = $("#txtUnit" + i).val();
			var item_total = $("#txtPerMedTotal" + i).val();
			var itemId = $('input[name=chk' + i + ']').val();
			if (item_name != "" && item_price == "") {
				alert("Unit Price Must be filled out");
				return false;
			} else if (item_price != "" && item_unit == "") {
				alert("Unit Must be filled out");
				return false;
			} else if (item_unit != "" && item_total == "") {
				alert("Total Must be filled out");
				return false;
			}

			else if (item_total != "" && i_total == 0) {
				alert("Grand Total Must be filled out");
				return false;
			}
			if (strRowsValues == "") {
				strRowsValues = itemId + "," + item_price + "," + item_unit
						+ "," + item_total + "#";
			} else {
				strRowsValues = strRowsValues + itemId + "," + item_price + ","
						+ item_unit + "," + item_total + "#";

			}
		}
	}
	if (strRowsValues == "") {
		alert("Please select item first");
		return false;

	} else {
		var inputs = [];
		inputs.push('action=SaveOrder');
		inputs.push('strRowsValues=' + strRowsValues);
		/*
		 * inputs.push('txtSubtotal=' + $("#txtSubtotal").val());
		 * inputs.push('txtSalesTax=' + $("#txtSalesTax").val());
		 * inputs.push('txtSalesTaxPer=' + $("#txtSalesTaxPer").val());
		 * inputs.push('txtSHHA=' + $("#txtSHHA").val());
		 * inputs.push('txtOther=' + $("#txtOther").val());
		 * inputs.push('txtGrandTotal=' + $("#txtGrandTotal").val());
		 */
		inputs.push('did=' + did);
		inputs.push('popup_container3=' + $("#popup_container3").val());
		inputs.push('requisitioner=' + $("#requisitioner").val());
		inputs.push('shipped=' + $("#shipped").val());
		inputs.push('popup_container2=' + $("#popup_container2").val());

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "POServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				window.location = "PurchaseOrderSend.jsp";
			}
		});
	}
}
function setSubTotalForUpdate() {
	var rowCnt = $("#txtTotalRow").val();
	// alert($("#txtRowCount").val());
	var noOfRow = (parseFloat($("#txtRowCount").val()) + 1);
	var subTotal = 0;
	for (i = 1; i <= rowCnt; i++) {
		if ($("#txtPerMedTotal" + i).val() != undefined
				&& $("#txtPerMedTotal" + i).val() != "") {
			var perTotal = $("#txtPerMedTotal" + i).val();
			subTotal = (parseFloat(subTotal) + parseFloat(perTotal));
		}
	}
	// alert(subTotal);
	$("#txtSubtotal").val(subTotal);

}

function setSubTotalStore() {

	// alert($("#txtRowCount").val());
	var subTotal = 0;
	for (i = 1; i <= doCount; i++) {
		var perTotal = $("#txtPerMedTotal" + i).val();
		subTotal = (parseFloat(subTotal) + parseFloat(perTotal));
	}
	// alert(subTotal);
	$("#txtSubtotal").val(subTotal);
}

function setSubTotal() {
	var rowCnt = ($("#txtTotalRow").val() + 1);
	// alert($("#txtRowCount").val());
	var noOfRow = (parseFloat($("#txtRowCount").val()) + 1);
	var subTotal = 0;
	for (i = 1; i <= rowCnt; i++) {
		if ($("#txtPerMedTotal" + i).val() != undefined
				&& $("#txtPerMedTotal" + i).val() != "") {
			var perTotal = $("#txtPerMedTotal" + i).val();
			subTotal = (parseFloat(subTotal) + parseFloat(perTotal));
		}
	}
	// alert(subTotal);
	$("#txtSubtotal").val(subTotal);

}

function setSubTotalForPORec() {
	var subTotal = 0;
	for (i = 1; i <= doCount; i++) {
		var perTotal = $("#txtPerMedTotal" + i).val();
		if (perTotal == "") {
			perTotal = 0;
		}
		subTotal = (parseFloat(subTotal) + parseFloat(perTotal));
	}
	// alert(subTotal);
	$("#txtSubtotal").val(subTotal);

}
function setGrandTotal() {
	var txtSubtotal = $("#txtSubtotal").val();
	var txtSalesTax = $("#txtSalesTax").val();
	var txtSHHA = $("#txtSHHA").val();
	var txtOther = $("#txtOther").val();

	var txtGrandTotal = (parseFloat(txtSubtotal) + parseFloat(txtSalesTax)
			+ parseFloat(txtSHHA) + parseFloat(txtOther));
	$("#txtGrandTotal").val(txtGrandTotal);
}

function setSaleTax() {
	var txtSubtotal = $("#txtSubtotal").val();
	var txtSalesTaxPer = $("#txtSalesTaxPer").val();
	var saleTaxPer = (txtSalesTaxPer / 100) * txtSubtotal;
	$("#txtSalesTax").val(saleTaxPer);
}

function setEachTotalForUpdate(rowcount) {
	item_qty = $("#txtUnit" + rowcount).val();
	item_price = $("#txtUnitPrice" + rowcount).val();
	$("#txtPerMedTotal" + rowcount).val(item_qty * item_price);

}
function setEachTotalRec(countVal) {
	item_qty = $("#txtRecUnit" + countVal).val();
	item_price = $("#txtUnitPrice" + countVal).val();
	$("#txtPerMedTotal" + countVal).val(item_qty * item_price);

}

function setEachTotal(item_qty, item_price, total_price) {
	// var table = document.getElementById("tblItems");
	// var rowCount = table.rows.length;
	/*
	 * if ($("#txtUnit" + rowCount).val() == 0) { alert("Item unit should be
	 * greater than Zero."); } else {
	 */
	item_qty = $("#" + item_qty).val();
	item_price = $("#" + item_price).val();
	$("#" + total_price).val(item_qty * item_price);
	// }
}

function getPrice(item_name, item_price) {
	item_name = $("#" + item_name).val();
	var inputs = [];
	inputs.push('action=FetchPrice');
	inputs.push('item_name=' + item_name);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#" + item_price).val(ajaxResponse);
		}
	});

}
function setDid() {
	var myObj = $("#divDObj").html();
	myObj = eval('(' + myObj + ')');
	$("#txtDid").val(myObj.distributor_id);
	// alert(myObj.did);
	// alert($("#txtDid").val());
}

function defDistDisp() {
	var inputs = [];
	inputs.push('action=FetchDefDist');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "POServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			distBean = eval('(' + ajaxResponse + ')');
			$("#distMangTemp").setTemplate(defaultViewDistributerTemp);
			$("#distMangTemp").processTemplate(distBean);

			/*
			 * doctorBean = eval('(' + ajaxResponse + ')');
			 * $("#divDocName").setTemplate(docNameTemplate);
			 * $("#divDocName").processTemplate(doctorBean); setAppoType();
			 */
		}
	});
};

function newOrder(did) {
	// alert(ajaxResponse);
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.distributerList.length; i++) {
		if (myArray.distributerList[i].distributor_id == did) {
			myObj = myArray.distributerList[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myEvalObj = eval('(' + myObj + ')');
	// alert(myEvalObj.distributor_id);

	// $("#txtadd").val(myEvalObj.distributor_id);
	window.location.href = "PONewOrder.jsp?" + "myObj=" + myObj + "&did="
			+ myEvalObj.distributor_id + "&add=" + myEvalObj.dist_addr;

}

function getDistributorItem(did) {
	$("#search").hide();
	$("#AddDistributer").hide();
	var inputs = [];
	inputs.push('action=updateDist');
	inputs.push('did=' + did);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			distBean = eval('(' + ajaxResponse + ')');
			$("#DistItem").setTemplate($("#DistItem").html());
			$("#DistItem").processTemplate(distBean);
			$("#RowCount1").html(
					distBean.distributerList[0].distItemList.length);
		}
	});
}
// Common document ready function
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function initTemplate() {

}
