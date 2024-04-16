/** 
 * @Code : search Alternate Products
 * @return
 **/
function searchAlternateProduct(id, productName) {

	if (id != "" && id != null && id!=0) {
		var inputs = [];
		inputs.push('productId=' + id);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/getAlternateProductByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						var data = jQuery.parseJSON(r);
						setAlterNateProductContent(data,productName);
						$("#productName").html("Product "+productName);
					}
				});
		return true;
	}
	else
	{
		alert("No product Selected");
	}	
}

/**
 * @Code : search Alternate Drug
 * @return
 **/
function searchAlternateDrug(id, productName) {

	if (id != "" && id != null && id!=0) {
		var inputs = [];
		inputs.push('drugId=' + id);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/getAlternateProductByDrugId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						var data = jQuery.parseJSON(r);
						setAlterNateProductContent(data,productName);
						$("#productName").html("Drug "+productName);
					}
				});
		return true;
	}
	else
	{
		alert("No product Selected");
	}	
}

/**
 * @Code : set Products data
 * @return
 **/
function setAlterNateProductContent(result,productName) {
	var divContent = "";
	for ( var i = 0; i < result.length; i++) {
		divContent = divContent + "<tr><td>" + (i + 1) + "</td><td>"
				+ result[i].productName + "</td><td>" + result[i].packing
				+ "</td><td>" + result[i].unit + "</td><td>"+result[i].companyName+"</td><td>"+result[i].drug+"</td></tr>";
	}

	$("#alternateProductContent").html(divContent);
	
}