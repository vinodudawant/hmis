/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For Filteration of data from GRN
 * *****/
function loadData() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var dispatchFlag = $("input:radio[name='dispatchFlag']:checked").val();
	var vendorId = $("#suplierName").val();
	if (vendorId == "" || vendorId == null || vendorId == undefined
			|| isNaN(vendorId)) {
		vendorId = 0;
	}

	if (from != '' && to != '') {
		var inputs = [];

		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('dispatchFlag=' + dispatchFlag);
		inputs.push('vendorId=' + vendorId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../report/getDayWiseDispatchGRN",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
			
				$("#totalAmount").val('');
				total = 0;
				setPartyResult(r);

			}
		});
		return true;
	} else {
		alertify.error('Please Fill All the Details');
	}

}
/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For Filteration of data from GRN setting data on template 
 * *****/
function setPartyResult(r) {
	var divContent = "";
	var total = 0;
	$('#totalAmount').val('');

	for ( var i = 0; i < r.length; i++) {

		divContent = divContent
				+ "<tr><td class='grnclass' id='grnid"
				+ (i + 1)
				+ "'>"
				+ r[i].productId
				+ "</td><td align='center'>"
				+ r[i].productCompany

				+ "</td><td align='center'>"
				+ r[i].vendorName
				+ "</td><td align='center'>"
				+ r[i].productPack

				+ "</td><td align='right'>"
				+ r[i].type
				
				+ "</td><td align='right'>"
				+ r[i].dispatchFlag
				
				+ "</td><td align='right'>"
				+ parseInt(r[i].poId)
				
				+ "</td><td align='right'>"
				+ parseFloat(r[i].productName).toFixed(2)
				+ "</td><td align='right'>"
				+ parseFloat(r[i].qty).toFixed(2)
				+ "</td><td align='right'>"
				+ parseFloat(r[i].mrp).toFixed(2)

			
				
				+ "</td><td align='right'>"
				+ parseFloat(r[i].vouNo).toFixed(2)
				
				

				+ "</td><td align='right'>"
				+ "<input type='checkbox' name ='dispatchgiven' class='dispatchgiven' value='"+ r[i].productId +"'></td></tr>";

		total = total + parseFloat(r[i].vouNo);
	}
	$("#saleData").html(divContent);
	$("#saletableFooter")
			.html(
					"<tr style='font:bold'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td align='center'>Total</td><td align='left'>"
							+ total.toFixed(2) + "</td><td></td></tr>");

}
/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For calculating total amount 
 * *****/
function calculateTotalAmount(amount) {
	if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
			&& amount.length > 0) {
		total = total + parseFloat(amount);
	}
}
/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For fetching all vendor on load 
 * *****/
function getAllVendor() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "../vendor/getVendorList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);

			setVendor(r);
		}
	});
}
/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For fetching all vendor on load and setting it 
 * *****/
function setVendor(r) {
	var list = "<option value='0'>--Select Vendor--</option>";
	for ( var i = 0; i < r.lstvendors.length; i++) {

		list = list + "<option value='" + r.lstvendors[i][1] + "'>"
				+ (r.lstvendors[i][0]) + "</option>";
	}
	$("#suplierName").html(list);
}
/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For checking all pending grn 
 * *****/
function checkAllindispatch(id) {

	var checkbox = $('input:checkbox[id=' + id + ']');

	if (checkbox.is(':checked') == true) {
		$('input[name=dispatchgiven]').each(function() {
			$(this).prop('checked', 'checked');

		});
	} else {
		$('input[name=dispatchgiven]').each(function() {
			$(this).removeAttr('checked', 'checked');

		});
	}
}

/*****
 * @author     :BILAL
 * @Date       :13-12-2017
 * @Code       :For checking all pending grn 
 * *****/
function SendToGRNForFinance() {

	var grnId = [];
	$('input[name=dispatchgiven]:checked').each(function() {

		grnId.push($(this).val());
	});
	if (grnId == 0) {
		alert("please select atleast one GRN to Send to Finance!!");
		return false;
	}
	var dispatchFlag = $("input:radio[name='dispatchFlag']:checked").val();
	if (dispatchFlag == "Y") {
		alert("Already Send to Finance!!");
		return false;
	}
	
	var inputs = [];

	inputs.push("grnId=" + grnId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/purchase/SendToGRNForFinance",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			//alertify.success(r);
			alert(r);
			window.location.reload(true);
		}
	});

}
