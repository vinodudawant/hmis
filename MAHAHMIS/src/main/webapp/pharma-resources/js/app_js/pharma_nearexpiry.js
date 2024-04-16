/*****
 * @author   :Akshata Desai
 * @Date     :21-12-2021
 * @Code     :For  near EXPIRY  product list
 * *******/
function fetchBatchDetailsByExpiry() {
	
	var from = $("#txtDate").val();
	if(from==""||from==null||from==undefined){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();

		from = dd + '/' + mm + '/' + yyyy;
	}
	var to = $("#txtDate").val();
	var callform='all';
	var date1=  from.split('/');
	var date2= date1[2]+'-'+date1[1]+'-'+date1[0];

	if (from != '') {
		var inputs = [];
		inputs.push('from=' + date2);
		inputs.push('to=' + date2);
		inputs.push('callform='+ callform);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getNearExpiryReport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setnearexp(r);

			}
		});
		return true;
	} 
}
/*****
 * @author   :Akshata Desai
 * @Date     :21-12-2021
 * @Code     :For setting template of near EXPIRY  product list
 * *******/
function setnearexp(result) {
	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			$('#nearexpiryp')
					.append(
							"<div class='well well-sm'><strong>Product Name- </strong>"
									+ result[i].productName
									+ "&nbsp;&nbsp;&nbsp;<strong>Batch Code- </strong>"
									+ result[i].batchCode
									+ "&nbsp;&nbsp;&nbsp;<strong>Batch Expiry- </strong>"
									+ result[i].batchExpiry
									+ "</div>");
		}
		$('#loadingImage').hide();

	} else {
		$('#nearexpiryp')
				.append(
						"<div class='well well-sm'><strong>No Product Available</h4></strong>");
		$('#loadingImage').hide();
	}
}

