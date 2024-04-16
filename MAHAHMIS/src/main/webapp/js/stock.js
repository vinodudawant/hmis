var count = 1;
var w = 1;
var prodId = new Array();
var productNameTemp = '{#foreach $T.product as product}<option value="{$T.product.id}">{$T.product.name}</option>{#/for}';
var StockAdjTemp = '{#foreach $T.StockAdjustmentList as pl}<div style="width: 100%; border-bottom: 1px solid #069;"><div	style="width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div><div	style="width: 19.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.prod.name}</div><div	style="width: 15.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.prod.ingradient}</div><div style="width: 15.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.prod.packing}</div><div	style="width: 15.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.quantity}</div><div	style="width: 9.6%; height: 23px;  border-right: 1px solid #069; padding-top: 3px; text-align: center;">	<input onclick="editStockAdj({$T.pl.stockAdjM.id})" id="btnOper{count}"	style="font-size: 10px;" class="edit"  type="button" value="EDIT" /></div><div style="width: 9.6%; height: 23px;  border-right: 1px solid #069; padding-top: 3px; text-align: center;"><input onclick="deleteStockAdj({$T.pl.stockAdjM.id})" id="btnDelete{count}" class="edit"	style="font-size: 10px;" type="button" value="DELETE" /></div></div>{#/for}';
var StockTemp = "<div style='width: 99%; background-color: #436a9d; padding: 0.5%; font-weight: bold;'><div style='width: 100%;'><div		style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>									<div										style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%;  text-align: center;'>Adjustment</div>									<div										style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Voucher No</div>									<div										style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Date</div><div style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Edit</div>								</div>							</div><div  style='width: 99.80%; height: 90%; overflow-y: auto; border: 0px solid #436a9d;' >{#foreach $T.StockAdjustmentMasterList as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 25.4%; height: 26px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 2px;'>{$T.pl.type}</div><div style='width: 20.6%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 5px;text-align: center;'>{$T.pl.id}</div><div style='width: 12.4%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.date}</div><div style='width: 12.4%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick='editStockAdj({$T.pl.id})' style='font-size: 10px;' type='button' value='VIEW' class='edit' /></div></div>{#/for}</div>";
var editStockTemp = '{#foreach $T.StockAdjustmentList as pl}<div style="width: 100%; border-bottom: 1px solid #069;" id="div{count}"><div	style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 7px;">{count}.</div><div	style="width: 18.5%; height: 23px; text-align:center; border-right: 1px solid #069; padding-left: 0.2%; padding-top: 7px;" name="productName{count}" id="productName{count}">{$T.pl.prod.name}  </div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.8%; padding-top: 7px; text-align:center;" name="ingradient{count}" id="ingradient{count}">{$T.pl.prod.ingradient}</div><div style="width: 14.4%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 7px; text-align:center;" name="packing{count}" id="packing{count}">{$T.pl.prod.packing}</div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align:center;" name="quantity{count}" id="quantity{count}" >{$T.pl.quantity}</div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align:center;" name="expDate{count}" id="expDate{count}" >{$T.pl.prod.expDate}</div></div><input type="hidden" id="productId{count++}" value="{$T.pl.prod.id}"/> </div></div>{#/for}';
var productTemp = '{#foreach $T.product as pl}<div style="width: 100%; border-bottom: 1px solid #069;" id="div{count}"><div	style="width: 5.4%; height:30px;  text-align: center; border-right: 1px solid #069; padding-top: 0px;">{count}.</div><div	style="width: 18.5%; border-right: 1px solid #069; padding-left: 0.2%; padding-top: 0px;"><input style="width: 95%; border: 1px solid #069;" onchange="setSplitIds({count})" class="auto" type="text" name="productName{count}" id="productName{count}" value="{$T.pl.name}"  /></div><div	style="width: 14.5%; border-right: 1px solid #069; padding-left: 0.8%; padding-top: 0px;"><input style="width: 94%; border: 1px solid #069;" type="text" name="ingradient{count}" id="ingradient{count}" value="{$T.pl.ingradient}" readonly="readonly"  /></div><div style="width: 14.4%; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 0px;"><input style="width: 94%; border: 1px solid #069;" type="text" name="packing{count}" id="packing{count}" value="{$T.pl.packing}" readonly="readonly" /></div><div	style="width: 14.5%; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 0px;"><input style="width: 94%; border: 1px solid #069;" type="text" name="quantity{count}" id="quantity{count}" value="{$T.pl.quantity}" onkeypress="return validateNumbers(event)" /></div><div style=" text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox{count}" id="checkbox{count}"/></div></div><input type="hidden" id="productId{count}" value="{$T.pl.id}"/> <input type="hidden" id="level{count}" value="{$T.pl.level}"/><input type="hidden" id="reqId{count++}" value="{$T.pl.form}"/></div></div>{#/for}';
var enqTemp = "<div style='width: 99%; background-color: #436a9d; padding: 0.5%; font-weight: bold;'><div style='width: 100%;'><div		style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>									<div										style='width: 15.4%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Enquiry No</div>									<div										style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Date</div>									<div										style='width:15.4%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Sent To vendors</div><div style='width: 7.2%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>View</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Purchase Order</div><div style='width: 10.2%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Print</div>								</div>							</div><div  style='width: 99.80%; height: 90%; overflow-y: auto; border: 0px solid #436a9d;' >{#foreach $T.enquiry as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 5.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 15.9%; height: 26px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 2px; text-align: center;'>{$T.pl.id}</div><div style='width: 15.6%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 5px;text-align: center;'>{$T.pl.date}</div><div style='width: 15.7%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.vendors}</div><div style='width: 7.8%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick='editEnquiry({$T.pl.id})' style='font-size: 10px;' type='button' value='View' class='edit' /></div><div style='width: 10.6%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick='createPO({$T.pl.id})' style='font-size: 10px;' type='button' value='P Order' class='edit' /></div><div style='width: 10.6%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick='printEnquiry({$T.pl.id})' style='font-size: 10px;' type='button' value='Print' class='edit' /></div></div>{#/for}</div>";
var editEnquiryTemp = '{#foreach $T.enquiry[0].productList as pl}<div style="width: 100%; border-bottom: 1px solid #069;" id="div{count}"><div	style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}.</div><div	style="width: 18.5%; height: 23px; border-right: 1px solid #069; text-align: center; padding-left: 0.2%; padding-top: 5px;text-align: center;" name="productName{count}" id="productName{count}">{$T.pl.name}</div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.8%; padding-top: 5px; text-align: center;" name="ingradient{count}" id="ingradient{count}" >{$T.pl.ingradient}</div><div style="width: 14.4%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="packing{count}" id="packing{count}" >{$T.pl.packing}</div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="quantity{count}" id="quantity{count}">{$T.pl.quantity}</div></div><input type="hidden" id="productId{count++}" value="{$T.pl.id}"/> </div></div>{#/for}';
var orderTemp = "<div style='width: 99%; background-color: #436a9d; padding: 0.5%; font-weight: bold;'><div style='width: 100%;'><div		style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>									<div										style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Purchase Order No</div>									<div										style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Date</div>									<div										style='width:12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Vendor</div><div										style='width:12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Quotation No</div><div										style='width:12%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Quotation Date</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>View</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Print</div>								</div>							</div><div  style='width: 99.80%; height: 90%; overflow-y: auto; border: 0px solid #436a9d;' >{#foreach $T.enquiry as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 5.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 12.6%; height: 26px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 2px;text-align: center;'>{$T.pl.id}</div><div style='width: 12.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 5px;text-align: center;'>{$T.pl.date}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.vendorName}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.quotationNo}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.quotation_date}</div><div style='width: 10.4%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick='editPO({$T.pl.id})' style='font-size: 10px;' type='button' value='View' class='edit' /></div><div style='width: 10.4%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick=' printOrder({$T.pl.id})' style='font-size: 10px;' type='button' value='Print' class='edit' /></div></div>{#/for}</div>";
var editPOTemp = '{#foreach $T.pOMaster[0].productList as pl}<div style="width: 100%; border-bottom: 1px solid #069;" id="div{count}"><div	style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}.</div><div	style="width: 18.5%; height: 23px; border-right: 1px solid #069; text-align: center; padding-left: 0.2%; padding-top: 5px;text-align: center;" name="productName{count}" id="productName{count}">{$T.pl.name}</div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.8%; padding-top: 5px; text-align: center;" name="ingradient{count}" id="ingradient{count}" >{$T.pl.ingradient}</div><div style="width: 14.4%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="packing{count}" id="packing{count}" >{$T.pl.packing}</div><div	style="width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="quantity{count}" id="quantity{count}">{$T.pl.quantity}</div></div><input type="hidden" id="productId{count++}" value="{$T.pl.id}"/> </div></div>{#/for}';
var PETemp = '{#foreach $T.ltVendorDTOs as pl}<div style="width: 100%; border-bottom: 1px solid #069;" id="div{count}"><div	style="width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}.</div><div	style="width: 8.8%; height: 23px; border-right: 1px solid #069; text-align: center; padding-left: 0.2%; padding-top: 5px;text-align: center;" name="vendorId{count}" id="vendorId{count}">{$T.pl.vendorId}</div><div	style="width: 22.8%; height: 23px; border-right: 1px solid #069; padding-left: 0.8%; padding-top: 5px; text-align: center;" name="vendorName{count}" id="vendorName{count}" >{$T.pl.vendorName}</div><div style="width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="vendorMobile{count}" id="vendorMobile{count}" >{$T.pl.vendorMobile}</div><div	style="width: 9.3%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="noOfProduct{count}" id="noOfProduct{count++}">{$T.pl.noOfProduct}</div><div style="width: 13.2%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;"><input onclick="createEnquiry({$T.pl.vendorId})" style="font-size: 10px;" type="button" value="Enquiry" class="edit" /></div></div></div>{#/for}';
var procuctTemp = "{#foreach $T.ltVendorDTOs as tl}<div style='width:100%; height:28px; border-bottom:1px solid #069;'><div style='width:8.3%; height:23px; text-align:center; border-right:1px solid #069; padding-top:5px;'>{count}</div><div style='width:45.2%; text-align:center; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px;' id='divPi2'>{$T.tl.name}</div><div id='' style='width:16%; height:23px; text-align: left; border-right:1px solid #069; padding-left:2.6%; padding-top:5px;'>{$T.tl.ingradient}</div><div id='' style='width:16%; height:23px; text-align: left; border-right:1px solid #069; padding-left:2.6%; padding-top:5px;'>{$T.tl.packing}</div><input type='checkbox' id='checkbox' value='{$T.tl.id}' /><input type='hidden' id='productId{count++}' value='{$T.tl.id}'/></div>{#/for}";
var reqTemp = "{#foreach $T.ltVendorDTOs as tl}<div id='divId{count}' style='width:100%; height:28px; border-bottom:1px solid #069;'><div style='width:6.2%; height:23px; text-align:center; border-right:1px solid #069; padding-top:5px;'>{count}</div><div style='width:45.2%;; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px;' id='divPi2'>{$T.tl.name}</div><div style='width: 26%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'><input type='text' style='width:90%' id='quantity{count}' onkeypress='return validateNumbers(event)' value='{$T.tl.quantity}'></div><div id='utype2' style='width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;'><input type='checkbox' id='assignedCheckbox' name='assignedCheckbox{count}' value='{$T.tl.id}' /></div><input type='hidden' id='reqId{count}' value='{$T.tl.manufacturer}'/><input type='hidden' id='pId{count++}' value='{$T.tl.id}'/></div>{#/for}";
var PETemp1 = '{#foreach $T.ltVendorDTOs as pl}<div style="width: 100%; border-bottom: 1px solid #069;" id="div{count}"><div	style="width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}.</div><div	style="width: 8.8%; height: 23px; border-right: 1px solid #069; text-align: center; padding-left: 0.2%; padding-top: 5px;text-align: center;" name="vendorId{count}" id="vendorId{count}">{$T.pl.vendorId}</div><div	style="width: 22.8%; height: 23px; border-right: 1px solid #069; padding-left: 0.8%; padding-top: 5px; text-align: center;" name="vendorName{count}" id="vendorName{count}" >{$T.pl.vendorName}</div><div style="width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="vendorMobile{count}" id="vendorMobile{count}" >{$T.pl.vendorMobile}</div><div	style="width: 9.3%; height: 23px; border-right: 1px solid #069; padding-left: 0.7%; padding-top: 5px; text-align: center;" name="noOfProduct{count}" id="noOfProduct{count++}">{$T.pl.noOfProduct}</div><div style="width: 13.2%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;"><input onclick="createEnquiryView({$T.pl.vendorId})" style="font-size: 10px;" type="button" value="View" class="edit" /></div></div></div>{#/for}';
var EditEnqTemp = "{#foreach $T.enquiry[0].productList as tl}<div style='width:100%; height:28px; border-bottom:1px solid #069;'><div style='width:6.2%; height:23px; text-align:center; border-right:1px solid #069; padding-top:5px;'>{count}</div><div style='width:45.2%;; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px;' id='divPi2'>{$T.tl.name}</div><div style='width: 26%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'><input type='text' style='width:90%' id='quantity{count}'  value='{$T.tl.quantity}' readonly='readonly'></div><div id='utype2' style='width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;'><input type='checkbox' id='checkbox' value='{$T.tl.id}' /></div><input type='hidden' id='pId{count++}' value='{$T.tl.id}'/></div>{#/for}";
var trolleyTemp = "{#foreach $T.product[0].listProduct as tl}<div style='width:100%; height:28px; border-bottom:1px solid #069;'><div style='width:5.6%; height:23px; text-align:center; border-right:1px solid #069; padding-top:5px;'>{count++}</div><div style='width:17.6%;; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px; text-align: center;'>{$T.tl.name}</div><div style='width:14.2%;; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px; text-align: center;'>{$T.tl.ingradient}</div><div style='width:14.1%; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px; text-align: center;'>{$T.tl.packing}</div><div style='width:14.2%;; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px; text-align: center;'>{$T.tl.requirment}</div><div style='width:14.1%;; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px; text-align: center;'>{$T.tl.quantity}</div>{#/for}";

function fetchVoucherNo() {

	var inputs = [];
	inputs.push('action=fetchVoucherNo');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			StockBean = eval('(' + ajaxResponse + ')');
			$("#voucherNo").val(StockBean.id);
		}
	});
}
function fetchProductNames() {
	var inputs = [];
	inputs.push('action=fetchProductName');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			otBean = eval('(' + ajaxResponse + ')');
			$("#productName").setTemplate(productNameTemp);
			$("#productName").processTemplate(otBean);
		}
	});
}

function setProductDetails() {
	var inputs = [];
	inputs.push('action=fetchProductDetails');
	inputs.push("productId=" + $('#productName').val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			otBean = eval('(' + ajaxResponse + ')');
			$("#content").val(otBean.ingradient);
			$("#packing").val(otBean.packing);

		}
	});
}

function saveStockAdj(page) {
	var reqId = new Array();
	var rows = $("#RowCount").val();
	var productId = new Array();
	var quantity = new Array();
	var txtBatchCode = new Array();
	var txtExpDate = new Array();
	for ( var t = 1; t <= rows; t++) {
		var tempCode = '0';
		var tempDate = '2014-1-1';
		if ($('#adjustment').val() != 'outward') {
			tempCode = $("#txtBatchCode" + t).val();
			tempDate = $("#hiddenExpDate" + t).val();
		}
		temp = $("#productId" + t).val();
		qnt = $("#quantity" + t).val();
		req = $("#reqId" + t).val();
		maxQnt = $("#maxQnt" + t).val();
		if (temp != undefined || qnt != "") {
			productId.push(temp);
			quantity.push(qnt);
			txtBatchCode.push(tempCode);
			txtExpDate.push(tempDate);
			if (req != undefined) {
				reqId.push(req);
			}
		} else {
			alert("Please Select Product From List / Enter Quantity !");
			return false;
		}
		if ((parseFloat(qnt) > parseFloat(maxQnt))
				&& ($('#adjustment').val() == 'outward')) {
			return false;
		}

	}
	var inputs = [];
	inputs.push('action=saveStockAdj');
	inputs.push('voucherNo=' + encodeURIComponent($('#voucherNo').val()));
	inputs.push('productId=' + encodeURIComponent(productId));
	inputs.push('narration=' + encodeURIComponent($("#narration").val()));
	inputs.push('date=' + encodeURIComponent($("#date-pick").val()));
	inputs.push('quantity=' + encodeURIComponent(quantity));
	inputs.push('reqId=' + encodeURIComponent(reqId));
	inputs.push('adjustment=' + encodeURIComponent($('#adjustment').val()));
	inputs.push('queryType=' + encodeURIComponent($('#queryType').val()));
	inputs.push('txtBatchCode=' + encodeURIComponent(txtBatchCode));
	inputs.push('txtExpDate=' + encodeURIComponent(txtExpDate));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			if (page == 'StockAdj') {
				location.reload();
			} else if (page == 'StockAdjEdit') {
				window.location.href = "StockAdjDatabase.jsp";
			}
		}
	});
}

function showStockAdj() {
	var adjDate = $("#date-pick").val();
	var input = [];

	input.push('action=showStockAdj');
	input.push('adjDate=' + encodeURIComponent(adjDate));
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			count = 1;
			$("#container").setTemplate(StockAdjTemp);
			$("#Adjdata").val(ajaxResponse);
			$("#container").processTemplate(pobj1);
		}
	});
}

function editStockAdj(id) {

	window.location.href = "StockAdjEdit.jsp?" + "voucherNo=" + id;

}

function editStock(id) {
	var input = [];

	input.push('action=fetchDataForEdit');
	input.push('voucherNo=' + encodeURIComponent(id));
	var str = input.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "InventoryServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					pobj1 = eval('(' + ajaxResponse + ')');
					count = 1;
					$("#container").setTemplate(editStockTemp);
					$("#Adjdata").val(ajaxResponse);
					$("#container").processTemplate(pobj1);
					$("#RowCount").val(pobj1.StockAdjustmentList.length);
					$(".auto").autocomplete(
							"AutoSuggetionServlet?auto=productName");
					$("#queryType").val("update");
					$("#voucherNo").val(
							pobj1.StockAdjustmentList[0].stockAdjM.id);
					$("#date-pick").val(
							pobj1.StockAdjustmentList[0].stockAdjM.date);
					$("#narration").val(pobj1.StockAdjustmentList[0].narration);
					// alert(pobj1.StockAdjustmentList[0].stockAdjM.type);
					$(
							"#adjustment option[value="
									+ pobj1.StockAdjustmentList[0].stockAdjM.type
									+ "]").attr("selected", "selected");
					$(
							"#productName option[value="
									+ pobj1.StockAdjustmentList[0].prod.id
									+ "]").attr("selected", "selected");
				}
			});
}

function addStockAdj() {
	fetchVoucherNo();
	$("#queryType").val("insert");
	$("#content").val('');
	$("#packing").val('');
	$("#quantity").val('');
	$("#narration").val('');
	var todays_date = $("#todays_date").val();
	var arrDate = todays_date.split("-");
	var date = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
	$("#date-pick").val(date);
}
function deleteStockAdj(id) {

	var inputs = [];
	inputs.push('action=deleteStockAdj');
	inputs.push('stockMasterId=' + encodeURIComponent(id));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			showStockAdj();
		}
	});

}

function toCreateChkDivStock(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var vendor = $("#vendor").val();
	if (vendor == "") {
		alert("Please Select Vendor !");
		return false;
	}
	var temp = vendor.split("_");
	rowCount++;
	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');

	// $("#"+divId+"").innerHTML = '<div style="width: 100%; height: 28px;
	// border-bottom: 1px solid #069;"><div style="width: 4%; height: 23px;
	// text-align: center; border-right: 1px solid #069; padding-top:
	// 5px;">'+rowCount+'</div><div style="width: 11%; height: 23px;
	// border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;"><input
	// style="width: 90%;" type="text" id="t'+rowCount+'"
	// onmouseover="click2(this)" class="demo" value="" /></div><div
	// style="width: 31.5%; height: 23px; border-right: 1px solid #069;
	// padding-left: 1%; padding-top: 5px;"><input style="width: 90%;"
	// type="text" id="cf'+rowCount+'" value="" /></div><div style="width: 31%;
	// height: 25px; border-right: 1px solid #069; padding-left: 1%;
	// padding-top: 3px;"><input style="width: 90%;" type="text"
	// name="textfield" id="tr'+rowCount+'" value="" /></div><div style="width:
	// 16%; height: 25px; padding-left: 1%; padding-top: 3px;"><select
	// style="width: 90%;" id="rb'+rowCount+'" ><option></option></div><div
	// style="width:4%; height: 25px; padding-left: %; padding-top: 3px;
	// text-align: center;" ><input type="checkbox" name="checkbox'+rowCount+'"
	// id="checkbox'+rowCount+'"/></div></div>';
	document.getElementById("container").appendChild(x);

	document.getElementById(divId).innerHTML = ' <div style="width: 5.4%; height: 30px; text-align: center; border-right: 1px solid #069; padding-top: 0px;">'
			+ rowCount
			+ '</div> <div style="width: 18.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%;"> <input type="text" name="" style="width: 95%; border: 0.2px solid; border-color: #069;" onchange="setSplitProduct('

			+ rowCount
			+ ')" class="auto" id="productName'
			+ rowCount
			+ '" value="" >  </div> <div style="width: 15.3%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width: 90%; border: 1px solid #069;" type="text" readonly="readonly" name="" id="ingradient'
			+ rowCount
			+ '" value=""  /> </div> <div style="width: 15.1%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width: 90%; border: 1px solid #069;" type="text" readonly="readonly" name="" id="packing'
			+ rowCount
			+ '" value="" /> </div> <div style="width: 15.2%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width: 90%; border: 1px solid #069;" type="text" onkeypress="return validateNumbers(event)" id="quantity'
			+ rowCount
			+ '" value="" /> </div>  <div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox'
			+ rowCount
			+ '" id="checkbox'
			+ rowCount
			+ '"/></div><input type="hidden" id="productId'
			+ rowCount
			+ '" /> <input type="hidden" id="level' + rowCount + '" /></div>';
	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=productNameVen&vendorId=" + temp[1]);
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(w);
	// alert(w);
	w++;
}

function batchPopup(rowCount) {
	$("#myform" + rowCount).show(500);

	var d = new Date();
	var dformat = [ d.getFullYear(), d.getMonth() + 1, d.getDate() ].join('-');
	$("#date-pick" + rowCount).val(dformat);

}
function batchClose(rowCount) {
	$("#myform" + rowCount).hide(400);
}
function addToHiddenFields(rowCount) {
	$('#hiddenBatchCode' + rowCount).val($('#txtBatchCode' + rowCount).val());
	$('#hiddenExpDate' + rowCount).val($('#date-pick' + rowCount).val());
	$("#myform" + rowCount).hide(400);
}
var count = 0;
var total = 0;
var box;
var qty;
var subqty;
function showPopup(rowCount) {
	// alert(rowCount+"sdf");
	count = rowCount;
	$("#uomPopup").show(500);
	$("#txtboxqty").val('');
	$("#txtnumQty").val('');
	$("#txtSubQty").val('');
	$(".background_overlay").show();
	if (!$("#uomPopup").is(':visible')) {
		return;
	}
	$("#uomPopup").css({
		left : ($(window).width() - $('#uomPopup').width()) / 2.2,
		top : ($(window).width() - $('#uomPopup').width()) / 3.5,
		position : 'absolute'
	});
	$("#closepopup").click(function() {
		$("#uomPopup").hide(400);
		$(".background_overlay").hide();
	});
	$("#OK").click(function() {

		box = $("#txtboxqty").val();

		qty = $("#txtnumQty").val();
		subqty = $("#txtSubQty").val();

		if (box == "" || box == null) {
			box = '1';
		}
		if (qty == "" || qty == null) {
			qty = '1';
		}
		if (subqty == "" || subqty == null) {
			subqty = '1';
		}
		total = box * qty * subqty;

		$("#quantity" + count).val(total);
		$("#uomPopup").hide(400);
		$(".background_overlay").hide();
	});
}

function toCreateChkDivStockAdj(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;

	rowCount++;
	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');

	document.getElementById("container").appendChild(x);

	document.getElementById(divId).innerHTML = '<div  style="width: 100%; height: 28px; border-bottom: 1px solid #069;"> <div style="width: 5.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ rowCount
			+ '</div> <div style="width: 18.5%; height: 23px; border-right: 1px solid #069; padding-left: 0.2%; "> <input type="text" name="" style="width: 95%; border: 0.2px solid; border-color: #069;" onchange="setSplitIdWithAddBatch('
			+ rowCount
			+ ')" class="auto" id="productName'
			+ rowCount
			+ '" value="" >  </div> <div style="width: 15.3%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width: 90%; border: 1px solid #069;" type="text" readonly="readonly" name="" id="ingradient'
			+ rowCount
			+ '" value=""  /> </div> <div style="width: 15.1%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width: 90%; border: 1px solid #069;" type="text" readonly="readonly" name="" id="packing'
			+ rowCount
			+ '" value="" /> </div> <div style="width: 15.2%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: %; "> <input style="width: 90%; border: 1px solid #069;" type="text" onkeypress="return validateNumbers(event)" id="quantity'
			+ rowCount
			+ '"  onfocus="showPopup('
			+ rowCount
			+ ')"/> </div> <div style="width: 10%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px;" > <input style=" border: 1px solid #069;" value="Add Batch" class="addBatch" type="button" onClick="batchPopup('
			+ rowCount
			+ ')" id="btnAddBatch'
			+ rowCount
			+ '" value="" /> </div><div style="width:; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"> <input type="checkbox" value="" name="checkbox'
			+ rowCount
			+ '" id="checkbox'
			+ rowCount
			+ '"/></div><div id="panel"><div class="dialog" id="myform'
			+ rowCount
			+ '"><a style="float:right;color:white" id="close'
			+ rowCount
			+ '" onClick="batchClose('
			+ rowCount
			+ ')">X</a><form><label id="valueFromMyButton'
			+ rowCount
			+ '"></label><table style="width:130px;color:white"><tr><td>Batch Code <input style="width: 90%; border: 1px solid #069;" type="text" onkeypress="" id="txtBatchCode'
			+ rowCount
			+ '" value="" /> </td></tr><tr> <td>Expiry Date <input id="date-pick'
			+ rowCount
			+ '" name="date-pick'
			+ rowCount
			+ '" value=""	style="width: 90%;" /></td></tr><tr><td><input type="button" value="Save" class="btnOK" id="btnOK'
			+ rowCount
			+ '" onClick="addToHiddenFields('
			+ rowCount
			+ ')" /></td></tr></table><br /></form></div></div><input type="hidden" id="productId'
			+ rowCount
			+ '" ><input type="hidden" id="hiddenBatchCode'
			+ rowCount
			+ '" ><input type="hidden" id="hiddenExpDate'
			+ rowCount
			+ '" ><input type="hidden" id="maxQnt' + rowCount + '" ></div>';

	$("#RowCount").val(rowCount);
	$(".auto").autocomplete("AutoSuggetionServlet?auto=productName");
	$("#addRowCount").val(w);
	// alert(w);
	w++;

	$("#date-pick" + rowCount).datePicker({
		clickInput : true
	});

	document.getElementById("btnAddBatch" + rowCount).style.visibility = "hidden";
}

function toRemoveDivStock(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var temp = rowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
			temp = temp - 1;
			$("#RowCount").val(temp);
		}
		p++;
	}
}

function setSplitIds(rcount) {

	setTimeout(function() {
		var name = $("#productName" + rcount).val();
		var arr = name.split("_");
		$("#productName" + rcount).val(arr[0]);
		$("#productId" + rcount).val(arr[1]);
		$("#ingradient" + rcount).val(arr[2]);
		$("#packing" + rcount).val(arr[3]);

	}, 500);
}

function setSplitProduct(rcount) {

	setTimeout(function() {
		var name = $("#productName" + rcount).val();
		var arr = name.split("_");
		$("#productName" + rcount).val(arr[0]);
		$("#productId" + rcount).val(arr[1]);
		$("#ingradient" + rcount).val(arr[2]);
		$("#packing" + rcount).val(arr[3]);
		$("#level" + rcount).val(arr[4]);

	}, 500);
}
function setSplitIdWithAddBatch(rcount) {

	setTimeout(
			function() {
				var name = $("#productName" + rcount).val();
				var arr = name.split("_");
				$("#productName" + rcount).val(arr[0]);
				$("#productId" + rcount).val(arr[1]);
				$("#ingradient" + rcount).val(arr[2]);
				$("#packing" + rcount).val(arr[3]);
				if (arr[4] == 0 || $('#adjustment').val() == 'outward') {
					document.getElementById("btnAddBatch" + rcount).style.visibility = "hidden";
				} else {
					document.getElementById("btnAddBatch" + rcount).style.visibility = "visible";
				}
				$("#maxQnt" + rcount).val(arr[5]);

			}, 500);
}

function dispStockAdj(action) {
	count = 1;
	var value = 0;
	var searchBy = "";
	if (action == 'search') {
		var byId = $("#byId").val();

		if (byId == "") {
			alert("please Enter Voucher No !");
		} else {

			searchBy = "byId";
			value = byId;
		}
	} else {
		searchBy = "";
	}
	var inputs = [];
	inputs.push('action=dispStockAdj');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			$("#patobject").html(ajaxResponse);
			if (patientBean.StockAdjustmentMasterList.length == 0) {
				alert("Voucher Not Found");
			} else {
				$("#patobject").html(ajaxResponse);
				$("#container").setTemplate(StockTemp);
				$("#container").processTemplate(patientBean);
			}
		}
	});
}

function fetchEnquiryNo() {
	var inputs = [];
	inputs.push('action=fetchEnquiryNo');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			StockBean = eval('(' + ajaxResponse + ')');

			$("#enquiryNo").val(StockBean.id);
		}
	});

}

function addVendor(type, rowcount) {

	var docid = $("#vendor").val();
	if (docid == "") {
		alert("Please Select Service.");
		return false;
	}
	var name;
	var id;

	var strdocid = docid.split("_");

	if (strdocid.length == 1) {
		alert("Please Select Valid Test");
		return false;
	}

	name = strdocid[0] + "" + '\n';
	id = strdocid[1] + '\n';

	var o = new Option("option text", "value");
	$(o).html(name);
	$(o).val(id);

	$("#vendors").append(o);
	$("#vendor").val("");
}

function removeVendor() {
	$('#vendors' + ' option:selected').remove();
}

function showEnquiryProducts() {

	var input = [];

	input.push('action=showEnquiryProducts');
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			count = 1;
			$("#container").setTemplate(productTemp);
			$("#Adjdata").val(ajaxResponse);
			$("#container").processTemplate(pobj1);
			$("#RowCount").val(pobj1.product.length);
		}
	});
}

function saveEnquiry() {
	var reqId = new Array();
	var productId = new Array();
	var quantity = new Array();
	var divCount = $("#divCount").val();

	for ( var t = 1; t < divCount; t++) {
		temp = $("#pId" + t).val();
		qnt = $("#quantity" + t).val();
		req = $("#reqId" + t).val();
		if (qnt == "") {
			alert("Please Enter Quantity !");
			return false;
		}
		productId.push(temp);
		quantity.push(qnt);
		if (req != undefined) {
			reqId.push(req);
		}
	}

	var vendors = $("#vendorId").val();
	var inputs = [];
	inputs.push('action=saveEnquiry');
	inputs.push('enquiryNo=' + encodeURIComponent($('#enquiryNo').val()));
	inputs.push('productId=' + encodeURIComponent(productId));
	inputs.push('narration=' + encodeURIComponent(""));
	inputs.push('date=' + encodeURIComponent($("#date-pick").val()));
	inputs.push('quantity=' + encodeURIComponent(quantity));
	inputs.push('vendors=' + encodeURIComponent(vendors));
	inputs.push('reqId=' + encodeURIComponent(reqId));
	inputs.push('queryType=' + encodeURIComponent($('#queryType').val()));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			$("#print").show();
			$("#save").hide();
		}
	});
}

function dispPurchaseEnq(action) {
	count = 1;
	var value = 0;
	var searchBy = "";
	if (action == 'search') {
		var byId = $("#byId").val();

		if (byId == "") {
			alert("please Enter Enquiry No !");
		} else {

			searchBy = "byId";
			value = byId;
		}
	} else {
		searchBy = "";
	}
	var inputs = [];
	inputs.push('action=dispPurchaseEnq');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			patientBean = eval('(' + ajaxResponse + ')');
			$("#patobject").html(ajaxResponse);
			if (patientBean.enquiry.length == 0 && action != 'onload') {
				alert("Enquiry Not Found");
			} else {
				$("#patobject").html(ajaxResponse);
				$("#container").setTemplate(enqTemp);
				$("#container").processTemplate(patientBean);
			}
		}
	});
}

function editEnquiry(id) {
	window.location.href = "EnquiryEdit.jsp?" + "enquiryNo=" + id;
}

function editEnq(id) {
	var input = [];

	input.push('action=fetchDataForEnqEdit');
	input.push('enquiryNo=' + encodeURIComponent(id));
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			count = 1;
			$("#assignTestDiv").setTemplate(EditEnqTemp);
			$("#Adjdata").val(ajaxResponse);
			$("#assignTestDiv").processTemplate(pobj1);
			$("#enquiryNo").val(pobj1.enquiry[0].id);
			$('#date-pick').val(pobj1.enquiry[0].date);
		}
	});
}

function getList() {

	var enqNo = $("#enqNo").val();
	if (enqNo == "") {
		alert("Please Enter Enquiry No !");
		return false;
	}

	var input = [];

	input.push('action=showEnquiryItems');
	input.push('enquiryNo=' + enqNo);
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			count = 1;

			$("#vendor").val(pobj1.product[0].vendor);
			document.getElementById("vendor").disabled = true;
			$("#container").setTemplate(productTemp);
			$("#Adjdata").val(ajaxResponse);
			$("#container").processTemplate(pobj1);
			$("#RowCount").val(pobj1.product.length);
			if (pobj1.product.length == 0) {
				alert("Product Not Found ! ");
			}
		}
	});
}
function fetchOrderNo() {
	var inputs = [];
	inputs.push('action=fetchOrderNo');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			StockBean = eval('(' + ajaxResponse + ')');

			$("#PONo").val(StockBean.id);
		}
	});
}

function saveOrder() {

	var rows = $("#RowCount").val();
	var productId = new Array();
	var quantity = new Array();
	var level = 0;
	for ( var t = 1; t <= rows; t++) {

		temp = $("#productId" + t).val();
		qnt = $("#quantity" + t).val();
		level = $("#level" + t).val();
		if (parseFloat(level) < parseFloat(qnt)) {
			alert("Quantity of " + $("#productName" + t).val()
					+ " is Greater than Max Level !");
			return false;
		}

		if (temp != undefined || qnt != "") {
			productId.push(temp);
			quantity.push(qnt);
		} else {
			alert("Please Add Product / Enter Quantity !");
			return false;
		}
	}
	var enqNumber = $('#enqNo').val();
	if (enqNumber == "") {
		enqNumber = 0;
	}

	var qDate = $("#qDate").val();
	var qNo = $("#qNo").val();
	var vendor = $("#vendor").val();
	if (qDate == "") {
		alert("Please Enter Quotation Date !");
		return false;
	}
	if (qNo == "") {
		alert("Please Enter Quotation No !");
		return false;
	}
	if (vendor == "") {
		alert("Please Select Vendor !");
		return false;
	} else {
		var temp = vendor.split("_");
	}
	var qDt = new Date(qDate);
	var dt = new Date($("#date-pick").val());
	if (dt < qDt) {
		alert("Quotation date should be past date..!");
		return false;
	}

	var inputs = [];
	inputs.push('action=savePO');
	inputs.push('enquiryNo=' + encodeURIComponent(enqNumber));
	inputs.push('PONo=' + encodeURIComponent($('#PONo').val()));
	inputs.push('productId=' + encodeURIComponent(productId));
	inputs.push('narration=' + encodeURIComponent($("#narration").val()));
	inputs.push('date=' + encodeURIComponent($("#date-pick").val()));
	inputs.push('quantity=' + encodeURIComponent(quantity));
	inputs.push('vendor=' + encodeURIComponent(temp[1]));
	inputs.push('qDate=' + encodeURIComponent(qDate));
	inputs.push('qNo=' + encodeURIComponent(qNo));
	inputs.push('queryType=' + encodeURIComponent($('#queryType').val()));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			$("#AddStockAdj").show();
			$("#saveNowbutton").hide();
		}
	});
}

function dispPurchaseOrder(action) {
	count = 1;
	var value = 0;
	var searchBy = "";
	if (action == 'search') {
		var byId = $("#byId").val();

		if (byId == "") {
			alert("please Enter Order No !");
		} else {
			searchBy = "byId";
			value = byId;
		}
	} else {
		searchBy = "";
	}
	var inputs = [];
	inputs.push('action=dispPurchaseOrder');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			patientBean = eval('(' + ajaxResponse + ')');
			$("#patobject").html(ajaxResponse);
			if (patientBean.enquiry.length == 0 && action != 'onload') {
				alert("PO Not Found");
			} else {
				$("#patobject").html(ajaxResponse);
				$("#container").setTemplate(orderTemp);
				$("#container").processTemplate(patientBean);
			}
		}
	});
}

function editPO(id) {
	window.location.href = "POEdit.jsp?" + "PONo=" + id;
}

function editPOrder(id) {
	var input = [];
	input.push('action=fetchDataForOrderEdit');
	input.push('PONo=' + encodeURIComponent(id));
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			count = 1;
			$("#container").setTemplate(editPOTemp);
			$("#container").processTemplate(pobj1);
			$("#PONo").val(pobj1.pOMaster[0].id);
			$("#date-pick").val(pobj1.pOMaster[0].date);
			$("#narration").val(pobj1.pOMaster[0].narration);
			$("#vendor").val(pobj1.pOMaster[0].vendorName);
			$("#enqNo").val(id);
			$("#qDate").val(pobj1.pOMaster[0].quotation_date);
			$("#qNo").val(pobj1.pOMaster[0].quotationNo);
			document.getElementById("vendor").disabled = true;
		}
	});
}

function fetchVendors(action, page) {
	var value = 0;
	count = 1;
	var searchBy = "";
	if (action == 'search') {
		var byId = $("#byId").val();
		var byName = $("#byName").val();

		if (byId == "" && byName == "" && action == "search") {
			alert("Please Enter Something for Search");
			return false;
		} else if (byId != "" && byName != "") {
			alert("Please Enter Either Name or Id for Search");
			return false;
		}

		if (byId != "") {
			searchBy = "byId";
			value = $("#byId").val();
		} else if (byName != "") {
			searchBy = "byName";
			value = $("#byName").val();
		}
	} else {
		searchBy = "";
	}
	var inputs = [];
	inputs.push('action=fetchVendorList');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			patientBean = eval('(' + ajaxResponse + ')');
			$("#patobject").html(ajaxResponse);
			if (patientBean.ltVendorDTOs.length == 0) {
				alert("Enquiry Not Found");
			} else {
				$("#patobject").html(ajaxResponse);
				if (page == 'Enquiry') {
					$("#container").setTemplate(PETemp);
				} else {
					$("#container").setTemplate(PETemp1);
				}
				$("#container").processTemplate(patientBean);
			}
		}
	});
}

function createEnquiry(id) {
	window.location = "PurchaseEnquiry.jsp?" + "vendorId=" + id;
}

function createEnquiryView(id) {
	window.location = "EnquiryEdit.jsp?" + "vendorId=" + id;
}

function defaultViewProduct(id) {
	count = 1;

	var inputs = [];
	inputs.push('action=fetchProductList');
	inputs.push('vendorId=' + encodeURIComponent(id));
	inputs.push('value=' + encodeURIComponent(""));
	inputs.push('searchBy=' + encodeURIComponent("byName"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#testDetails").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#vendorId").val(id);
			$("#testDiv").setTemplate(procuctTemp);

			$("#testDiv").processTemplate(pobj1);
		}
	});
}

function searchProduct() {
	count = 1;
	var id = $("#vendorId").val();
	var value = $("#byName").val();

	if (value == "") {
		alert("Please Enter Name !");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchProductList');
	inputs.push('vendorId=' + encodeURIComponent(id));
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('searchBy=' + encodeURIComponent("byName"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#testDetails").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#vendorId").val(id);
			$("#testDiv").setTemplate(procuctTemp);

			$("#testDiv").processTemplate(pobj1);
		}
	});
}

function addProduct() {
	var allVals = [];
	var status = false;
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});
	if (allVals.length == 0) {
		alert("Please Select Product !");
		return false;
	}
	var divCount = $("#divCount").val();

	myArray = JSON.parse($("#testDetails").html());
	for ( var k = 0; k < myArray.ltVendorDTOs.length; k++) {
		if (allVals.length != 0) {
			for ( var j = 0; j < allVals.length; j++) {
				if (myArray.ltVendorDTOs[k].id == allVals[j]) {
					myObj = myArray.ltVendorDTOs[k];
					myObj = JSON.stringify(myObj);
					myObj = JSON.parse(myObj.decodeSpecialChars());

					for ( var t = 0; t < prodId.length; t++) {
						if (prodId[t] == myObj.id) {
							status = true;
						}
					}
					if (!status) {
						var x = document.createElement('div');
						x.setAttribute('id', 'divId' + divCount);
						x
								.setAttribute('style',
										'width:100%; height: 28px; border-bottom: 1px solid #069;');

						document.getElementById("assignTestDiv").appendChild(x);
						document.getElementById('divId' + divCount).innerHTML = '<div style="width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
								+ divCount
								+ '</div><div id="uname2" style="width: 45.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;">'
								+ myObj.name
								+ '</div></div><div style="width: 26%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;"><input type="text" style="width:90%" id="quantity'
								+ divCount
								+ '" onkeypress="return validateNumbers(event)" ></div><div id="utype2" style="width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;"><input id="assignedCheckbox" name="assignedCheckbox'
								+ divCount
								+ '" type="checkbox" value="'
								+ myObj.id
								+ '"><input type="hidden" id="pId'
								+ divCount
								+ '" value="'
								+ myObj.id
								+ '"/></div>';

						var total = $("#divtotalAmt").html();
						prodId.push(myObj.id);
						total = parseFloat(total) + parseFloat(myObj.charges1);
						$("#divtotalAmt").html(total);
						divCount++;
					} else {
						alert("Product Already Present in List !");
					}
				}
			}
		}
	}

	$("#divCount").val(divCount);

	$.each($('#checkbox:checked'), function() {
		$(this).removeAttr('checked');
	});
}

function removeProduct() {

	var allVals = [];
	$.each($('#assignedCheckbox:checked'), function() {
		allVals.push($(this).val());
	});
	if (allVals.length == 0) {
		alert("Please Select Product");
		return false;
	}

	for ( var t = 0; t < allVals.length; t++) {
			for(var i=0; i < prodId.length;i++){
				if(allVals[t] == prodId[i]){
					prodId.splice(i, 1);
				}
				
			}
		
	}

	var testIds = [];
	var divCount = $("#divCount").val();
	var p = 1;
	var q = divCount;
	if (allVals.length != 0) {
		for ( var i = 0; i < q; i++) {

			var $radios = $('input:checkbox[name=assignedCheckbox' + p + ']');
			if ($radios.is(':checked') == true) {
				var testId = $("#idTestSlave" + p).val();
				if (testId != undefined && testId != "") {
					testIds.push(testId);
				}

				var remTotal = $("#patAmt" + p).html();
				var total = $("#divtotalAmt").html();
				total = parseFloat(total) - parseFloat(remTotal);
				// divCount = parseFloat(divCount)-1;
				$("#divtotalAmt").html(total);
				$("#divId" + p).remove();
			}
			p++;
		}
	}
	$("#divCount").val(divCount);
}

function fetchRequirement() {
	var id = $("#vendorId").val();
	count = 1;
	var inputs = [];
	inputs.push('action=fetchReq');
	inputs.push('vendorId=' + encodeURIComponent(id));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#vendorId").val(id);
			$("#assignTestDiv").setTemplate(reqTemp);

			if (pobj1.ltVendorDTOs.length != 0) {
				$("#divCount").val(pobj1.ltVendorDTOs.length + 1);
			}
			$("#assignTestDiv").processTemplate(pobj1);
			for ( var z = 0; z < pobj1.ltVendorDTOs.length; z++) {
				prodId.push(pobj1.ltVendorDTOs[z].id);
			}
		}
	});
}

function createPO(enquiryId) {
	window.location.href = "PurchaseOrder.jsp?enquiryNo=" + enquiryId;
}

function getEnquiryData(enqNo) {
	var input = [];

	input.push('action=showEnquiryItems');
	input.push('enquiryNo=' + enqNo);
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			count = 1;
			$("#container").setTemplate(productTemp);
			$("#Adjdata").val(ajaxResponse);
			$("#container").processTemplate(pobj1);
			$("#RowCount").val(pobj1.product.length);
			$("#enqNo").val(enqNo);
			$("#vendor").val(pobj1.product[0].vendor);

			if (pobj1.product.length == 0) {
				alert("Product Not Found ! ");
			}
		}
	});
}

function printEnquiry(enqId) {
	if (enqId == undefined) {
		enqId = $('#enquiryNo').val();
	}
	window.open("PurchaseEnqPdf.jsp?enquiryId=" + enqId);
}

function fetchTrolly(type) {
	count = 0;
	var strValue = $.trim($("#byName").val());
	if (strValue == "" && type == "search") {
		alert("Please Insert Something For Search.");
		return false;
	}
	var inputs = [];
	inputs.push('action=featchTrollyGRN');
	inputs.push('strValue=' + strValue);
	inputs.push('type=' + type);
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
			$("#prevOPDBillObj").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			if (patientBean.ltTrolleyDTOs.length == 0) {
				if (type != "onload") {
					alert("Trolly not found.");
				}
			} else {
				$("#container").setTemplate($("#temp").html());
				$("#container").processTemplate(patientBean);

				var rowCount = $("#rowCount").val();

				for ( var i = 1; i <= rowCount; i++) {

					$("#TGRN" + i).hide();
				}
			}
		}
	});
}

function hideShowTrolly(count) {

	var hideShowStatus = $("#hideShowStatus" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#TGRN" + count).show();
		$("#hideShowStatus" + count).val(1);
	} else {
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#TGRN" + count).hide();
		$("#hideShowStatus" + count).val(0);
	}
}

function viewGRNNew(grnId, trollyId, aFlag) {
	if (aFlag == '0') {
		window.location.href = "TrollyGRNGen.jsp?grnId=" + grnId + "&trollyId="
				+ trollyId + "&acceptFlag=" + aFlag;
	} else {
		window.location.href = "TrollyGRNView.jsp?grnId=" + grnId;
	}
}

function getGINProducts(grnId, flag) {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchProductsForGRN');
	inputs.push('GRNId=' + encodeURIComponent(grnId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			otBean = eval('(' + ajaxResponse + ')');

			$("#GRNNo").val(grnId);
			$("#qDate").val(otBean.product[0].grnDate);
			if (flag == '1') {
				$("#saveNowbutton").hide();
				document.getElementById("date-pick").disabled = true;
				document.getElementById("qDate").disabled = true;
				document.getElementById("narration").disabled = true;
			}
			$("#container").setTemplate(trolleyTemp);
			$("#container").processTemplate(otBean);
		}
	});
}

function setSplitId() {

	setTimeout(function() {
		var byName = $("#byName").val();
		var arr = byName.split("_");
		$("#byName").val(arr[0]);
	}, 500);

}
function saveTrolleyGRN(grnId) {
	var grnId = $("#GRNNo").val();
	var narration = $("#narration").val();
	var date = $("#date-pick").val();
	var trollyId = $("#trollyId").val();
	var inputs = [];
	inputs.push('action=saveTrolleyGRN');
	inputs.push('grnId=' + encodeURIComponent(grnId));
	inputs.push('date=' + encodeURIComponent(date));
	inputs.push('narration=' + encodeURIComponent(narration));
	inputs.push('trollyId=' + encodeURIComponent(trollyId));
	inputs.push('date=' + encodeURIComponent($("#date-pick").val()));
	inputs.push('queryType=' + encodeURIComponent($('#queryType').val()));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			window.location.href = "TrollyGRN.jsp";
		}
	});
}
function getTrollyGRNData(ginId) {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchProductsForVGRN');
	inputs.push('GRNId=' + encodeURIComponent(ginId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "InventoryServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			otBean = eval('(' + ajaxResponse + ')');

			$("#GRNNo").val(ginId);
			$("#qDate").val(otBean.product[0].grnDate);
			$("#date-pick").val(otBean.product[0].grnDocDate);
			$("#narration").val(otBean.product[0].grnadjDe);

			$("#container").setTemplate(trolleyTemp);
			$("#container").processTemplate(otBean);
		}
	});
}

function printOrder(orderId) {
	if (orderId == undefined) {
		orderId = $('#PONo').val();
	}
	window.open("PurchaseOrderPdf.jsp?orderId=" + orderId);
}