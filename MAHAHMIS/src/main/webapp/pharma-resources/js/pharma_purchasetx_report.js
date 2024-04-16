/*****
 * @author   :BILAL
 * @Date     :03-03-2018
 * @Code     :For getting purchase tax data 
 * ******/
function getpurchasetaxdata(){

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = $("input:radio[name='purTransTypess']:checked").val();
	
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
				
				setpurchasetaxdata(r);
				
			}
		});

	} 
}


/*****
 * @author    :BILAL
 * @Date      :03-03-2018
 * @Code      :For setting purchase tax report
 * ******/
function setpurchasetaxdata(res){
	
	
	//setting headers of purchase tax report 
	var tHead = '';
	tHead = tHead 
	+'<tr>';
	for(var i=0; i<res.lsttaxmaster.length; i++){
		var taxName=res.lsttaxmaster[i].taxName;
		var taxId  =res.lsttaxmaster[i].taxId;
		var taxRate  =res.lsttaxmaster[i].taxRate;
		var gstamth  ="Pur "+taxRate+ " % Amt";
		var cgstper  ="CGST "+(taxRate/2)+ " %";
		var sgstper  ="SGST "+(taxRate/2)+ " %";
		
		if(taxId == -1 || taxId == "-1"){
			tHead = tHead +'<th colspan="2" >'+taxName+'</th>';
		}else{
			if(taxRate > 0){
				tHead = tHead
				+'<th colspan="2" >'+gstamth+'</th>'
				+'<th colspan="2" >'+cgstper+'</th>'
				+'<th colspan="2" >'+sgstper+'</th>';
			}else{
				tHead = tHead +'<th colspan="2" >'+gstamth+'</th>';
			}
			
		}
		
		
		
	}
	tHead = tHead 
	+'<th colspan="2" >IGST Amt</th>'
	+'<th colspan="2" >CESS Amt</th>'
	+'</tr>';
	$("#purchaseHeader").html(tHead);
	var result= ' ';

	
	var billamtwithoutgst=0;
	var  totalbilamt =0;
	var  totaldisTot =0;
	var  toatlbillAj =0;
	var  totalgrandt =0;
	var  totaligstamt =0;  
	var  cesstotal   =0; 
	var  totaltotalLess =0;
	var  totalgstamt=0;
	var totaltaxableamt =0;
	var tfinaltotalbillamt =0;
	var tk = new Array(res.lstpurc[0].ltgst.length);
	var perc = new Array(res.lstpurc[0].ltgst.length);
	
	var igsamnts= new Array(res.lstpurc[0].ltgst.length);
	var slavetotal=new Array(res.lstpurc[0].ltgst.length);
	var slavedisco=new Array(res.lstpurc[0].ltgst.length);
	var slavetaxableamt=new Array(res.lstpurc[0].ltgst.length);
	var ft=0;
	
	//setting purchase tax body 
	for(var i=0;i<res.lstpurc.length;i++){
		var billamtmaster =res.lstpurc[i].billamtmaster;
		var billNo =res.lstpurc[i].vouNo;
		var purBillNo =res.lstpurc[i].purBillNo;
		var billDate =res.lstpurc[i].billDate;
		var vendorName =res.lstpurc[i].vendorName;
		var gstno =res.lstpurc[i].vatTinNumber;
		var suppAdd =res.lstpurc[i].vendorAddress;
		var invType = "Regular";
		var disTot =res.lstpurc[i].totalLess;
		var billAj = "0";
		var totbilamt =res.lstpurc[i].netbillamtwithgst;
	
		
		var igstAmtmaster      =res.lstpurc[i].igstAmtmaster;
		var gstAmountmaster      =res.lstpurc[i].gstAmountmaster;
		var totalLess            = res.lstpurc[i].totalLess;
		
		var free=0;
		var grandt=Math.round(billamtmaster);
		billAj = grandt-billamtmaster;
		var minusdiscountandamt = billamtmaster -  disTot;
		var finaltotalbillamt =0;
		if (gstAmountmaster > 0) {
			finaltotalbillamt =billamtmaster + gstAmountmaster;
		} else {
			finaltotalbillamt =billamtmaster + igstAmtmaster;
		}
		
		
		result=result
		  + '<tr> '
		  + '	<td colspan="2">'+(i+1)+'</td> '
		  + '	<td colspan="2">'+billNo+'</td> '
		  + '	<td colspan="2">'+purBillNo+'</td> '
		  + '	<td colspan="2">'+billDate+'</td> '
		  + '	<td colspan="2">'+vendorName+'</td> '
		  + '	<td colspan="2">'+gstno+'</td> '
		  + '	<td colspan="2">'+suppAdd+'</td> '
		  + '	<td colspan="2">'+invType+'</td> '
		  + '	<td colspan="2">'+finaltotalbillamt+'</td> '
		  //
		  + '	<td colspan="2">'+disTot+'</td> '
		  + '	<td colspan="2">'+billAj+'</td> '
		  //+ '	<td>'+finaltotalbillamt+'</td> '
		  + '	<td colspan="2">'+totbilamt+'</td> ';
		  
		 billamtwithoutgst=billamtwithoutgst +billamtmaster;
		 totalbilamt =totalbilamt + totbilamt;
		 totaldisTot =totaldisTot + disTot;
	     toatlbillAj =toatlbillAj + billAj;
		 totalgrandt =totalgrandt + totbilamt;
		 totaltaxableamt =totaltaxableamt + minusdiscountandamt;
		 tfinaltotalbillamt =tfinaltotalbillamt +finaltotalbillamt;
		 
		//if master GST amount greater than zero
			
			for ( var k = 0; k < res.lstpurc[i].ltgst.length; k++) {
			  
				   var  gggstper   =res.lstpurc[i].ltgst[k].gstper;
				   var  gstamtslav =res.lstpurc[i].ltgst[k].gstamt;
				   var  taxId      =res.lstpurc[i].ltgst[k].taxId;
				  // var  igstper    =res.lstpurc[i].ltgst[k].igstper;
				   var  igstamt    =res.lstpurc[i].ltgst[k].igstamt;
				   var  totalamt   =res.lstpurc[i].ltgst[k].totalamt;
				   var  discountamt=res.lstpurc[i].ltgst[k].discountamt;
				   var  taxableamt =res.lstpurc[i].ltgst[k].taxableamt;
				   
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
				  
			   if (gstAmountmaster > 0) {
				   
					if (gggstper == 0) {
						
						result=result  + '	<td colspan="2" class="gst'+gggstper+''+taxId+'" id="gst'+gggstper+''+taxId+'">'+totalamt+'</td> ';
						
					}else{
						
						result=result  + '	<td colspan="2" class="gst'+gggstper+''+taxId+'" id="gst'+gggstper+''+taxId+'">'+totalamt+'</td> '
			               + '	<td colspan="2" class="cgst'+gggstper+''+taxId+'" id="cgst'+gggstper+''+taxId+'">'+(gstamtslav/2)+'</td> '
			               + '	<td colspan="2" class="sgst'+gggstper+''+taxId+'" id="sgst'+gggstper+''+taxId+'">'+(gstamtslav/2)+'</td> ';
			         
					}
			   } else{
									if (gggstper == 0) {
										
										result=result  + '	<td colspan="2" class="gst'+gggstper+''+taxId+'" id="gst'+gggstper+''+taxId+'">'+totalamt+'</td> ';
									}else{
										result=result  + '	<td colspan="2" class="gst'+gggstper+''+taxId+'" id="gst'+gggstper+''+taxId+'">'+totalamt+'</td> '
							               + '	<td colspan="2" class="cgst'+gggstper+''+taxId+'" id="cgst'+gggstper+''+taxId+'">'+(free/2)+'</td> '
							               + '	<td colspan="2" class="sgst'+gggstper+''+taxId+'" id="sgst'+gggstper+''+taxId+'">'+(free/2)+'</td> ';
							          
									}		
				  }
					
				}
			  
			ft=1;
		 
		 
		 
		 //if IGST amount greater than zero than whole GST code will be zero 	
		  if (igstAmtmaster > 0) {
			  result=result  + '	<td colspan="2" class="igstclass" id="igstid'+i+'">'+igstAmtmaster+'</td> '
			                 + '	<td colspan="2" class="cessclass" id="cessid'+i+'">'+free +'</td> ';
		  } else {
			  result=result  + '	<td colspan="2" class="igstclass" id="igstid'+i+'">'+free+'</td> '
			                 + '	<td colspan="2" class="cessclass" id="cessid'+i+'">'+free+'</td> ';
		  }
		  result=result
		 
		  
		  
		  + '</tr> ';
			
		  totaligstamt = totaligstamt+igstAmtmaster;
		  totaltotalLess =totaltotalLess + totalLess;
		  totalgstamt= totalgstamt + gstAmountmaster;
		 
	}	
	
	
	 //For total amounts of all feilds 
	result=result
	  + '<tr> '
	  + '	<td colspan="16">Total</td> '
	 // + '	<td>'+billamtwithoutgst.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+tfinaltotalbillamt.toFixed(2)+'</td> '
	  
	  
	  + '	<td colspan="2">'+totaldisTot.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+toatlbillAj.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+totalbilamt.toFixed(2)+'</td> ';
	
		
	for ( var ik = 0; ik < tk.length; ik++) {
		
		var per=perc[ik];
		var amt = tk[ik];
		var totalamt = slavetotal[ik];
		if (per == 0) {
			result=result
			 + '	<td colspan="2" >'+totalamt+'</td> ';
		}else{
			result=result
			 + '	<td colspan="2" >'+totalamt+'</td> '
			 + '	<td colspan="2" >'+amt/2+'</td> '
			 + '	<td colspan="2" >'+amt/2+'</td> ';
		}
	}
	
		result=result
	 + '	<td colspan="2" >'+totaligstamt+'</td> '
	 + '	<td colspan="2" >'+cesstotal+'</td> '
	 +'</tr>';
		
		
	//purchase tax register summary
	result=result
	+'<tr>'
	+'<td colspan="31"> </td>'
	
	+'/tr>'
	
	+'<tr>'
	+'<td colspan="31" align="center"><h4>Purchase Tax Register Summary</h4> </td>'
	+'/tr>'
	+'<tr>'
	+'<th colspan="2">sub Total</th>'
	+'<th colspan="2">Total GST</th>'
	+'<th colspan="2">Item Wise Discount</th>'
	+'<th colspan="2">Taxable Amt</th>'
	+'<th colspan="2">CGST Per</th>'
	+'<th colspan="2">CGST Amt</th>'
	+'<th colspan="2">SGST Per</th>'
	
	+'<th colspan="2">SGST Amt</th>'
	+'<th colspan="2">IGST Per</th>'
	+'<th colspan="2">IGST Amt</th>'
	+'<th colspan="2">CESS Amt</th>'
	
	+'<th colspan="2">Discount</th>'
	+'<th colspan="2">(-)Total Discount</th>'
	+'<th colspan="2">(+)Other Add</th>'
	+'<th colspan="2">(-)Other ded</th>'
	+'<th colspan="2">(=)Bill Amount</th>'
	
	+'/tr>'
	
	
	
	+'<tr>'
	   
	 + '	<td colspan="2">'+tfinaltotalbillamt.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+totalgstamt.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+totaltotalLess.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+totaltaxableamt.toFixed(2)+'</td> '
	  + '	<td colspan="2"></td> '
	  + '	<td colspan="2">'+(totalgstamt/2).toFixed(2)+'</td> '
	  
	  + '	<td colspan="2"></td> '
	  + '	<td colspan="2">'+(totalgstamt/2).toFixed(2)+'</td> '
	  
	  + '	<td colspan="2"></td> '
	  + '	<td colspan="2">'+(totaligstamt).toFixed(2)+'</td> '
	  + '	<td colspan="2">0</td> '
	  + '	<td colspan="2">0</td> '
	  + '	<td colspan="2">0</td> '
	  + '	<td colspan="2">0</td> '
	  + '	<td colspan="2">0</td> '
	  
	  + '	<td colspan="2">'+(totalbilamt).toFixed(2)+'</td> '
	  
	+'</tr>';
	
	
	result=result
	+'<tr>'
	+'<td colspan="31"> </td>'
	
	+'/tr>'
	
	+'<tr>'
	+'<td colspan="31" align="center"><h4>GST Details</h4> </td>'
	+'/tr>'
	+'<tr>'
	+'<th colspan="2">CGST %</th>'
	+'<th colspan="2">CGST Amount</th>'
	+'<th colspan="2">SGST %</th>'
	+'<th colspan="2">SGST Amount</th>'
	+'<th colspan="2">IGST %</th>'
	+'<th colspan="2">IGST Amount</th>'
	+'<th colspan="2">CESS Amount</th>'
	
	+'<th colspan="2">Taxable Amount</th>'
	+'<th colspan="2">Discount Amount</th>'
	
	
	+'/tr>'
	;
	
	
	//For GST details Loop
	var finalcgsttotal=0;
	var finalsgsttotal=0;
	var finaligsttotal=0;
	var finalcesstotal=0;
	var finaltaxabletotal=0;
	var finaldiscounttotal=0;
	
    for ( var ik = 0; ik < tk.length; ik++) {
    	result=result
   	    + '<tr>';
		var per         =perc[ik];
		var amt         = tk[ik];
		var igamt       =igsamnts[ik];
		var cessam      =0;
		var taxableamt  =slavetaxableamt[ik];
		var discountamt =slavedisco[ik];
		
		
			result=result
			 + '	<td colspan="2">'+per/2+'</td> '
			 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
			 + '	<td colspan="2">'+per/2+'</td> '
			 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
			 
			 //igst amount and percentage
			 + '	<td colspan="2">'+per+'</td> '
			 + '	<td colspan="2">'+igamt.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+cessam.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+taxableamt.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+discountamt.toFixed(2)+'</td> '
			 ;
			
			finalcgsttotal =finalcgsttotal+(amt/2);
			finalsgsttotal =finalsgsttotal+(amt/2);
			finaligsttotal =finaligsttotal +igamt ;
			finalcesstotal =finalcesstotal + cessam;
			finaltaxabletotal=finaltaxabletotal + taxableamt;
			finaldiscounttotal=finaldiscounttotal + discountamt;			
		
		result=result
		 + '</tr>';
   }
	
    
    result=result
   
    +'<tr>'
    +'<td colspan="2">Total</td>'
    +'<td colspan="2">'+finalcgsttotal.toFixed(2)+'</td>'
    +'<td colspan="2"></td>'
    
    +'<td colspan="2">'+finalsgsttotal.toFixed(2)+'</td>'
    +'<td colspan="2"></td>'
    
    +'<td colspan="2">'+finaligsttotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+finalcesstotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+finaltaxabletotal.toFixed(2)+'</td>'
    +'<td colspan="2">'+finaldiscounttotal.toFixed(2)+'</td>'
    
	 + '</tr>';
	$("#purchasetaxtable").html(result);
	
	$('#pleaseWait').hide();
	emptydata();
}
/******
 * @author   :BILAL
 * @Date     :05-03-2018
 * @Code     :For geting list of purchase register 
 * *******/
function getpurchaseRegisterdata(){


	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = $("input:radio[name='purTransTypess']:checked").val();
	
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
			url : "../report/getpurreg",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setpurchaseregisterdata(r);
				
			}
		});

	} 

}
/******
 * @author   :BILAL
 * @Date     :05-03-2018
 * @Code     :For seting list of purchase register 
 * *******/
function setpurchaseregisterdata(res){

	var result= ' ';
	var finalgrossamt=0;
	var finalnetamt  =0;
	
	//setting purchase register body 
	for(var i=0;i<res.lstpurc.length;i++){
		
		var billDate =res.lstpurc[i].billDate;
		var billamtmaster =res.lstpurc[i].billamtmaster;
		var grnNo =res.lstpurc[i].grnNo;
		var netbillamtwithgst =res.lstpurc[i].netbillamtwithgst;
		var purBillNo =res.lstpurc[i].purBillNo;
		var type =res.lstpurc[i].type;
		var vendorName =res.lstpurc[i].vendorName;
		var vouNo =res.lstpurc[i].vouNo;
		var partyinviceno="CC-"+grnNo;
		
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+billDate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+vouNo+'</td> '
		 
		  + '	<td>'+purBillNo+'</td> '
		  + '	<td>'+billamtmaster+'</td> '
		  + '	<td>'+netbillamtwithgst+'</td> '
		  + '	<td>'+type+'</td> '
		  + '	<td>'+partyinviceno+'</td> '
		  + '	<td></td> '
		  + '</tr> ';
			
		finalgrossamt=finalgrossamt + billamtmaster;
		finalnetamt  =finalnetamt + netbillamtwithgst;
	}	
	
	result=result
	  + '<tr> '
	  +'<td colspan="5"> Total </td>'
	  +'<td > '+finalgrossamt+' </td>'
	  +'<td > '+finalnetamt+' </td>'
	  +'</tr> ';
	

	$("#purchaseregistertable").html(result);
	
	
	emptydata();
}


/******
 * @author   :BILAL
 * @Date     :06-03-2018
 * @Code     :For geting list of purchase return or DebitNote 
 * *******/
function getpurchaseReturndata(){


	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = $("input:radio[name='purTransTypess']:checked").val();
	
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
			url : "../report/getpurreturn",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setDebitNotedata(r);
				
			}
		});

	} 

}
/******
 * @author   :BILAL
 * @Date     :06-03-2018
 * @Code     :For seting list of purchase return or debitNote 
 * *******/
function setDebitNotedata(res){

	var result= ' ';
	var finalgrossamt=0;
	var finalnetamt  =0;
	
	//setting purchase register body 
	for(var i=0;i<res.length;i++){
		
		var debitnotid =res[i].debitnotid;
		var vocharNo =res[i].vocharNo;
		var grossamt =res[i].grossamt;
		var netamt =res[i].netamt;
		var naration =res[i].naration;
		var createdDate =res[i].createdDate;
		var vendorName =res[i].vendorName;
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+createdDate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+vocharNo+'</td> '
		 
		  + '	<td>'+debitnotid+'</td> '
		  + '	<td>'+grossamt+'</td> '
		  + '	<td>'+naration+'</td> '
		  
		  + '	<td></td> '
		  + '</tr> ';
			
		finalgrossamt=finalgrossamt + grossamt;
		finalnetamt  =finalnetamt + netamt;
	}	
	
	result=result
	  + '<tr> '
	  +'<td colspan="5"> Total </td>'
	  +'<td > '+finalgrossamt+' </td>'
	  
	  +'</tr> ';
	

	$("#purchasereturntable").html(result);
	
	
	emptydata();
}