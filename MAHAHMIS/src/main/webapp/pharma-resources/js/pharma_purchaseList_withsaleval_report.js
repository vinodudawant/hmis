/*****
 * @author    :BILAL
 * @Date      :01-03-2018
 * @Code      :For setting purchase list report with sale value 
 * ******/
function getpurchaselistwithsaleval(){

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=0;
	var hiddencompanyId=0;
	var hiddenProductId =0;
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
			url : "../report/getpurchaselistwithsaleval",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				$('#titlesaleval').val("Purchase list Report with sale value From Date- "+from+" To Date- "+to+"");
				setpurchaselistwithsaleval(r);
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :01-03-2018
 * @Code      :For setting purchase list report with sale value 
 * ******/
function setpurchaselistwithsaleval(res){

	var result= ' ';
	
	var tGrnAmt        = 0;
	var tGrnAmtwithgst = 0;
	var tsalebillamt = 0;
	var tprofitamt = 0;
	for(var i=0;i<res.length;i++){
			
		var salebillamtmaster     =parseFloat(res[i].salebillamtmaster);
		var grnNo       =res[i].vouNo;
		var inviceNo         =res[i].purBillNo;
		var inviceDate        =res[i].expiryDate;		
		//var gstAmountmaster          =res[i].gstAmountmaster;
		var billamtmaster            =parseFloat(res[i].billamtmaster);
		var netbillamtwithgst       =parseFloat(res[i].netbillamtwithgst);	
		var billDate             =res[i].billDate;	
		var vendorName           =res[i].vendorName;
		
		//var type            =res[i].type;
		//var free            =0;
		
		var profitAmt = parseFloat(  salebillamtmaster - netbillamtwithgst);
		var profitper = (profitAmt * 100 / netbillamtwithgst).toFixed(2);
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+grnNo+'</td> '
		  + '	<td>'+billDate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+inviceNo+'</td> '
		  
		  + '	<td>'+inviceDate+'</td> '
		  + '	<td>'+billamtmaster+'</td> '
		  + '	<td>'+netbillamtwithgst+'</td> '
		  + '	<td>'+salebillamtmaster+'</td> '
		 
		  + '	<td>'+profitAmt+'</td> '
		  + '	<td>'+profitper+'</td> '
		  
		  
		  + '</tr> ';
			
	   
		tGrnAmt = tGrnAmt + billamtmaster;
		tGrnAmtwithgst =tGrnAmtwithgst+netbillamtwithgst;
		tsalebillamt = tsalebillamt + salebillamtmaster;
		tprofitamt = tprofitamt + profitAmt;			  	
	}	
	result=result
	
	 + '<tr> '
	 + '</tr> '
	 
	 + '<tr> '
	 + '<td colspan="6" align="left">Total</td>'
	 + '<td >'+tGrnAmt+'</td>'
	 + '<td >'+tGrnAmtwithgst+'</td>'
	 
	 + '<td >'+tsalebillamt+'</td>'
	 + '<td >'+tprofitamt+'</td>'
	 + '</tr> '
	 ;
	$("#purchaselistwithsalevaltable").html(result);
	//emptydata();
	
}
