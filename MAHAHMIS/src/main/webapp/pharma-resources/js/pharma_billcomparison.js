function getbillcomparison(){

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = $("input:radio[name='purTransType']:checked").val();
	
	if (hiddencategoryId == "" || hiddencategoryId == null || hiddencategoryId == undefined || isNaN(hiddencategoryId)) {
		hiddencategoryId = 0;
	}
	if (hiddencompanyId == "" || hiddencompanyId == null || hiddencompanyId == undefined || isNaN(hiddencompanyId)) {
		hiddencompanyId = 0;
	}
	if (hiddenProductId == "" || hiddenProductId == null || hiddenProductId == undefined || isNaN(hiddenProductId)) {
		hiddenProductId = 0;
	}
	
	if (hiddenvendorId == "" || hiddenvendorId == null || hiddenvendorId == undefined || isNaN(hiddenvendorId)) {
		hiddenvendorId = 0;
	}
	
	if (unitId == "" || unitId == null || unitId == undefined || isNaN(unitId)) {
		unitId = 0;
	}
	if (paytype == "" || paytype == null || paytype == undefined ) {
		paytype = "00";
	}
	if (from == "" || from == null || from == undefined ) {
		from = "0";
	}
	if (to == "" || to == null || to == undefined ) {
		to = "0";
	}
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		
		var inputs = [];
		inputs.push('from=' + encodeURIComponent(from));
		inputs.push('to=' + encodeURIComponent(to));
		
		inputs.push('hiddencategoryId=' + encodeURIComponent(hiddencategoryId));
		inputs.push('hiddencompanyId=' + encodeURIComponent(hiddencompanyId));
		inputs.push('hiddenProductId=' + encodeURIComponent(hiddenProductId));
		inputs.push('hiddenvendorId=' + encodeURIComponent(hiddenvendorId));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('paytype=' + encodeURIComponent(paytype));
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			/*url : "../report/getpurchaseData",*/
			url : "../billcomparison/getpurchaseData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setbillcomparison(r);
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting product list report
 * ******/
function setbillcomparison(res){

	var result= ' ';
	
		
	for(var i=0;i<res.length;i++){

				
		var productName = res[i].productName;
		var purRate = res[i].purRate;
		var billDate        =res[i].billDate;	
		var rate = res[i].rate;
		var purRateWithGST = res[i].purRateWithGST;
		var vendorName = res[i].vendorName;

		var dgstPers = parseFloat(res[i].dgstPers);
		var disc = parseFloat(res[i].disc);

		if (dgstPers == "" || dgstPers == null || dgstPers == undefined
				|| isNaN(dgstPers)) {
			dgstPers = 0;
		}
		if (disc == "" || disc == null || disc == undefined || isNaN(disc)) {
			disc = 0;
		}
		var diff =	purRateWithGST - purRate ;

		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+billDate+'</td> '
		  + '	<td>'+productName+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+purRate+'</td> '
		  + '	<td>'+purRateWithGST+'</td> '
		  + '	<td>'+rate+'</td> '
		  + '	<td>'+disc+'</td> '
		  + '	<td>'+dgstPers+'</td> '
		  + '	<td>'+diff.toFixed(2)+'</td> '
		  
		    
		  + '</tr> ';
			
		
			
					  	
	}			
	
	$("#billcomparisontable").html(result);
	emptydata();
	
}

