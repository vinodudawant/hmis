/*****
 * @author   :BILAL
 * @Date     :08-03-2018
 * @Code     :For summary doc report 
 * ******/
function getsummarydoc(){
	var summarytype =$("input:radio[name='summarytype']:checked").val();
	if (summarytype == "purchase") {
		summarydocpurchase();
		$("#summardocsaletable tr").remove();
		
	}else if(summarytype == "sale"){
		summarydocsale();
		$("#summardocpurchasetable tr").remove();
	}else{
		summarydocpurchase();
		summarydocsale();
	}
	
	
}
/*****
 * @author   :BILAL
 * @Date     :08-03-2018
 * @Code     :For summary doc report for all sales 
 * ******/
function summarydocsale(){


	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	var hiddenProductId = $('#hiddenProductId').val();

	var unitId = $('#unitId').val();
	var paytype = $("input:radio[name='purTransType']:checked").val();

	var type = "all";//$("input:radio[name='saleTye']:checked").val();
	var patientId = $('#hiddenPatientId').val();

	if (hiddenProductId == "" || hiddenProductId == null
			|| hiddenProductId == undefined || isNaN(hiddenProductId)) {
		hiddenProductId = 0;
	}

	if (unitId == "" || unitId == null || unitId == undefined || isNaN(unitId)) {
		unitId = 0;
	}

	if (from == "" || from == null || from == undefined) {
		from = "0";
	}
	if (to == "" || to == null || to == undefined) {
		to = "0";
	}

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		var inputs = [];
		inputs.push('from=' + encodeURIComponent(from));
		inputs.push('to=' + encodeURIComponent(to));
		inputs.push('hiddenProductId=' + encodeURIComponent(hiddenProductId));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('paytype=' + encodeURIComponent(paytype));
		inputs.push('type=' + encodeURIComponent(type));
		inputs.push('patientId=' + encodeURIComponent(patientId));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../report/getsaletaxData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setsummarydocsale(r);

			}
		});

}

}
/*****
 * @author   :BILAL
 * @Date     :08-03-2018
 * @Code     :For setting summary doc report for all sales 
 * ******/
function setsummarydocsale(res){
	
	
	var lengthofpurchase =res.listsale.length;
	if (lengthofpurchase == 0) {
		$("#summardocsaletable tr").remove();
		return false;
	}
	
	var tk = new Array(res.listsale[0].ltgst.length);
	var perc = new Array(res.listsale[0].ltgst.length);
	
	var igsamnts= new Array(res.listsale[0].ltgst.length);
	var slavetotal=new Array(res.listsale[0].ltgst.length);
	var slavedisco=new Array(res.listsale[0].ltgst.length);
	var slavetaxableamt=new Array(res.listsale[0].ltgst.length);
	var ft=0;
	
	
	var result= ' ';
	for(var i=0;i<res.listsale.length;i++){
		
		
		for ( var k = 0; k < res.listsale[i].ltgst.length; k++) {
			  
			   var  gggstper   =res.listsale[i].ltgst[k].gstper;
			   var  gstamtslav =res.listsale[i].ltgst[k].gstamt;
			   var  taxId      =res.listsale[i].ltgst[k].taxId;
			   var  igstamt    =res.listsale[i].ltgst[k].igstamt;
			   var  totalamt   =res.listsale[i].ltgst[k].totalamt;
			   var  discountamt=res.listsale[i].ltgst[k].discountamt;
			   var  taxableamt =res.listsale[i].ltgst[k].taxableamt;
			   
			   if(ft==0){
					 //putting GST IGST and slave amount in array and discount 	
					 tk[k]             = gstamtslav;
					 igsamnts[k]       =igstamt;
					 slavetotal[k]     =totalamt;
					 slavedisco[k]     =discountamt;
					 slavetaxableamt[k]=taxableamt;
					 
					 perc[k]=gggstper;
				}else{
					
					//GST amount of slave 
					var gstamt= tk[k];
					tk[k] =gstamt+gstamtslav;
					
					//IGST amount of slave 
					var igs=igsamnts[k] ;
					igsamnts[k] =igs + igstamt;
					
					//total amount of slave 
					var tslavetotal=slavetotal[k] ;
					slavetotal[k] =tslavetotal + totalamt;
					
					//discount amount of slave 
					var tslavedisco=slavedisco[k] ;
					slavedisco[k] =tslavedisco + discountamt;
					
					//taxable amount of slave 
					var tslavetaxableamt=slavetaxableamt[k] ;
					slavetaxableamt[k] =tslavetaxableamt + taxableamt;
				}
			   
		   
				
			}
		  
		  
		  
		ft=1;
		
	
		
	}
	
	

		result=result
		
		
		+'<tr>'
		+'<th colspan="12">Sale Summary</th>'
		+'</tr>'
		+'<tr>'
		+'<th colspan="2">Particular</th>'
		+'<th colspan="2">Taxable Amount</th>'
		+'<th colspan="2">CGST Amount</th>'
		+'<th colspan="2">SGST Amount</th>'
		+'<th colspan="2">IGST Amount</th>'
		+'<th colspan="2">CESS Amount</th>'
		
		//+'<th colspan="2">Discount Amount</th>'
		+'<th colspan="2">Total</th>'
		
		+'/tr>'
		;
		
		
		//For GST details Loop
		var finalcgsttotal=0;
		var finalsgsttotal=0;
		var finaligsttotal=0;
		var finalcesstotal=0;
		var finaltaxabletotal=0;
		var finaldiscounttotal=0;
		var totaloftotal =0;
		for ( var ik = 0; ik < tk.length; ik++) {
	    	result=result
	   	    + '<tr>';
			var per         =perc[ik];
			var amt         = tk[ik];
			var igamt       =igsamnts[ik];
			var cessam      =0;
			var taxableamt  =slavetaxableamt[ik];
			var discountamt =slavedisco[ik];
			var total =taxableamt + amt + igamt+cessam;
			 
				result=result
				 + '	<td colspan="2">'+per+'%</td> '
				 + '	<td colspan="2">'+taxableamt.toFixed(2)+'</td> '
				 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
				 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
				 
				 //igst amount and percentage
				
				 + '	<td colspan="2">'+igamt.toFixed(2)+'</td> '
				 + '	<td colspan="2">'+cessam.toFixed(2)+'</td> '
				 +'    <td colspan="2">'+total.toFixed(2)+'</td>'
				// + '	<td colspan="2">'+discountamt.toFixed(2)+'</td> '
				 ;
				
				finalcgsttotal =finalcgsttotal+(amt/2);
				finalsgsttotal =finalsgsttotal+(amt/2);
				finaligsttotal =finaligsttotal +igamt ;
				finalcesstotal =finalcesstotal + cessam;
				finaltaxabletotal=finaltaxabletotal + taxableamt;
				finaldiscounttotal=finaldiscounttotal + discountamt;			
				totaloftotal  = totaloftotal+total;
			result=result
			 + '</tr>';
	   }
		
	    
	    result=result
	   
	    +'<tr>'
	    +'<td colspan="2">Total</td>'
	    +'<td colspan="2">'+finaltaxabletotal.toFixed(2)+'</td>'
	    +'<td colspan="2">'+finalcgsttotal.toFixed(2)+'</td>'
	 
	    
	    +'<td colspan="2">'+finalsgsttotal.toFixed(2)+'</td>'
	   
	    
	    +'<td colspan="2">'+finaligsttotal.toFixed(2)+'</td>'
	    +'<td colspan="2">'+finalcesstotal.toFixed(2)+'</td>'
	   
	   // +'<td colspan="2">'+finaldiscounttotal.toFixed(2)+'</td>'
	    +'<td colspan="2">'+totaloftotal.toFixed(2)+'</td>'
	    
		 + '</tr>';
	    
	    
		
		
		$("#summardocsaletable").html(result);
		
}
/*****
 * @author   :BILAL
 * @Date     :08-03-2018
 * @Code     :For summary doc report of purchase
 * ******/
function summarydocpurchase(){


	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = 3;//$("input:radio[name='purTransTypess']:checked").val();
	
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
		
		$('#pleaseWait').show();
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../report/getpurchasetaxData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setsummarydocpurchase(r);
				
				
			}
		});

	} 

}
/*****
 * @author   :BILAL
 * @Date     :08-03-2018
 * @Code     :For setting tamplate summary doc report of purchase
 * ******/
function setsummarydocpurchase(res){
	var lengthofpurchase =res.lstpurc.length;
	if (lengthofpurchase == 0) {
		$("#summardocpurchasetable tr").remove();
		return false;
	}
	var result= ' ';	
	var tk = new Array(res.lstpurc[0].ltgst.length);
	var perc = new Array(res.lstpurc[0].ltgst.length);
	
	var igsamnts= new Array(res.lstpurc[0].ltgst.length);
	var slavetotal=new Array(res.lstpurc[0].ltgst.length);
	var slavedisco=new Array(res.lstpurc[0].ltgst.length);
	var slavetaxableamt=new Array(res.lstpurc[0].ltgst.length);
	var ft=0;
	
	//setting purchase tax body 
	for ( var i = 0; i < res.lstpurc.length; i++) {

		for ( var k = 0; k < res.lstpurc[i].ltgst.length; k++) {

			var gggstper = res.lstpurc[i].ltgst[k].gstper;
			var gstamtslav = res.lstpurc[i].ltgst[k].gstamt;
			//var taxId = res.lstpurc[i].ltgst[k].taxId;
			var igstamt = res.lstpurc[i].ltgst[k].igstamt;
			var totalamt = res.lstpurc[i].ltgst[k].totalamt;
			var discountamt = res.lstpurc[i].ltgst[k].discountamt;
			var taxableamt = res.lstpurc[i].ltgst[k].taxableamt;

			if (ft == 0) {
				// putting GST IGST and slave amount in array and discount
				tk[k] = gstamtslav;
				igsamnts[k] = igstamt;
				slavetotal[k] = totalamt;
				slavedisco[k] = discountamt;
				slavetaxableamt[k] = taxableamt;

				perc[k] = gggstper;
			} else {

				// GST amount of slave
				var gstamt = tk[k];
				tk[k] = gstamt + gstamtslav;

				// IGST amount of slave
				var igs = igsamnts[k];
				igsamnts[k] = igs + igstamt;

				// total amount of slave
				var tslavetotal = slavetotal[k];
				slavetotal[k] = tslavetotal + totalamt;

				// discount amount of slave
				var tslavedisco = slavedisco[k];
				slavedisco[k] = tslavedisco + discountamt;

				// taxable amount of slave
				var tslavetaxableamt = slavetaxableamt[k];
				slavetaxableamt[k] = tslavetaxableamt + taxableamt;
			}

		}

		ft = 1;

	}	
	
	
	
	result=result
	+'<tr>'
	+'<th colspan="12">Purchase Summary</th>'
	+'</tr>'
	+'<tr>'
	+'<th colspan="2">Particular</th>'
	+'<th colspan="2">Taxable Amount</th>'
	+'<th colspan="2">CGST Amount</th>'
	+'<th colspan="2">SGST Amount</th>'
	+'<th colspan="2">IGST Amount</th>'
	+'<th colspan="2">CESS Amount</th>'
	
	//+'<th colspan="2">Discount Amount</th>'
	+'<th colspan="2">Total</th>'
	
	+'/tr>'
	;
	
	
	//For GST details Loop
	var finalcgsttotal=0;
	var finalsgsttotal=0;
	var finaligsttotal=0;
	var finalcesstotal=0;
	var finaltaxabletotal=0;
	var finaldiscounttotal=0;
	var totaloftotal =0;
    for ( var ik = 0; ik < tk.length; ik++) {
    	result=result
   	    + '<tr>';
		var per         =perc[ik];
		var amt         = tk[ik];
		var igamt       =igsamnts[ik];
		var cessam      =0;
		var taxableamt  =slavetaxableamt[ik];
		var discountamt =slavedisco[ik];
		
		var total=taxableamt + amt + igamt + cessam;
			result=result
			 + '	<td colspan="2">'+per+'%</td> '
			 + '	<td colspan="2">'+taxableamt.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
			 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
			 
			 //igst amount and percentage
			 + '	<td colspan="2">'+igamt.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+cessam.toFixed(2)+'</td> '
			
			// + '	<td colspan="2">'+discountamt.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+total.toFixed(2)+'</td> '
			 ;
			
			finalcgsttotal =finalcgsttotal+(amt/2);
			finalsgsttotal =finalsgsttotal+(amt/2);
			finaligsttotal =finaligsttotal +igamt ;
			finalcesstotal =finalcesstotal + cessam;
			finaltaxabletotal=finaltaxabletotal + taxableamt;
			finaldiscounttotal=finaldiscounttotal + discountamt;			
			totaloftotal  = totaloftotal+total;
		result=result
		 + '</tr>';
   }
	
    
    result=result
   
    +'<tr>'
    +'<td colspan="2">Total</td>'
    +'<td colspan="2">'+finaltaxabletotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+finalcgsttotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+finalsgsttotal.toFixed(2)+'</td>'
   
    
    +'<td colspan="2">'+finaligsttotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+finalcesstotal.toFixed(2)+'</td>'
   // +'<td colspan="2">'+finaldiscounttotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+totaloftotal.toFixed(2)+'</td>'
    
	 + '</tr>';
	$("#summardocpurchasetable").html(result);
	
	
	
}