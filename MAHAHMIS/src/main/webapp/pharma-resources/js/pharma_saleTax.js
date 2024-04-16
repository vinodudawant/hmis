/*******
 * @author    :BILAL
 * @date      :06-03-2018
 * @Code      :For getting sale tax report of pharmacy
 * ********/
function getsaleRep() {

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	var hiddenProductId = $('#hiddenProductId').val();

	var unitId = $('#unitId').val();
	var paytype = $("input:radio[name='purTransType']:checked").val();

	var type = $("input:radio[name='saleTye']:checked").val();
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
				
				setsaleTaxRep(r);

			}
		});

}
}
/*******
 * @author    :BILAL
 * @date      :07-03-2018
 * @Code      :For setting sale tax report of pharmacy
 * ********/
function setsaleTaxRep(res){
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
			tHead = tHead +'<th colspan="2">'+taxName+'</th>';
		}else{
			if(taxRate > 0){
				tHead = tHead
				+'<th colspan="2">'+gstamth+'</th>'
				+'<th colspan="2">'+cgstper+'</th>'
				+'<th colspan="2">'+sgstper+'</th>';
			}else{
				tHead = tHead +'<th colspan="2">'+gstamth+'</th>';
			}
			
		}
		
		
		
	}
	tHead = tHead 
	+'<th colspan="2">IGST Amt</th>'
	+'<th colspan="2">CESS Amt</th>'
	+'</tr>';
	$("#saletaxheader").html(tHead);
	
	
	var  totalbilamt =0;
	var  totaldisTot =0;
	var  toatlsubtotal =0;
	var  totalbilladj  =0;
	var  totaligstamt =0;
	var  cesstotal =0;
	var totalgstmasteramt=0;
	
	var tk = new Array(res.listsale[0].ltgst.length);
	var perc = new Array(res.listsale[0].ltgst.length);
	
	var igsamnts= new Array(res.listsale[0].ltgst.length);
	var slavetotal=new Array(res.listsale[0].ltgst.length);
	var slavedisco=new Array(res.listsale[0].ltgst.length);
	var slavetaxableamt=new Array(res.listsale[0].ltgst.length);
	var ft=0;
	
	var free=0;
	var result= ' ';
	for(var i=0;i<res.listsale.length;i++){
		var patientState =res.listsale[i].patientState;
		var gstmasteramt =res.listsale[i].gstmasteramt;
		var billnumber   =res.listsale[i].vouNo;
		var ipdopdno     =res.listsale[i].ipdopdno;
		var grossAmt     =res.listsale[i].grossAmt;
		var netAmt       =res.listsale[i].netAmt;
		var receiptNo    =res.listsale[i].receiptNo;
		//var cdperc       =res.listsale[i].cdperc;
		//var cdamt        =res.listsale[i].cdamt;
		var patientName  =res.listsale[i].patientName;
		var date         =res.listsale[i].date;
		var type         =res.listsale[i].type;
		var billadj      =grossAmt -netAmt;
		
		result=result
		  + '<tr> '
		  + '	<td colspan="2">'+(i+1)+'</td> '
		  + '	<td colspan="2">'+receiptNo+'</td> '
		  + '	<td colspan="2">'+type+'</td> '
		  + '	<td colspan="2">'+billnumber+'</td> '
		  + '	<td colspan="2">'+date+'</td> '
		  + '	<td colspan="2"></td> '//GST Number
		  + '	<td colspan="2">'+patientState+'</td> '
		  + '	<td colspan="2">'+patientName+'</td> '
		  + '	<td colspan="2">'+ipdopdno+'</td> '
		  + '	<td colspan="2"></td> '
		  + '	<td colspan="2">'+grossAmt+'</td> '
		  + '	<td colspan="2">0</td> '
		  + '	<td colspan="2"></td> '
		  + '	<td colspan="2">'+netAmt+'</td> '
		  + '	<td colspan="2">'+billadj+'</td> ';
		
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
			   if (gggstper == 0) {
					
					result=result  + '	<td colspan="2" class="gst'+gggstper+''+taxId+'" id="gst'+gggstper+''+taxId+'">'+taxableamt+'</td> ';
					
				}else{
					
					result=result  + '	<td colspan="2" class="gst'+gggstper+''+taxId+'" id="gst'+gggstper+''+taxId+'">'+taxableamt+'</td> '
		               + '	<td colspan="2" class="cgst'+gggstper+''+taxId+'" id="cgst'+gggstper+''+taxId+'">'+(gstamtslav/2)+'</td> '
		               + '	<td colspan="2" class="sgst'+gggstper+''+taxId+'" id="sgst'+gggstper+''+taxId+'">'+(gstamtslav/2)+'</td> ';
		         
				}
		   
				
			}
		  
		  
		  
		ft=1;
		
		result=result  +
		+ '	<td colspan="2" class="igstclass" id="igstid'+i+'">'+free+'</td> '
        + '	<td colspan="2" class="cessclass" id="cessid'+i+'">'+free+'</td> '
        + '	<td colspan="2" class="cessclass" id="cessid'+i+'">'+free+'</td> '
		+'</tr>';
		
		
		toatlsubtotal =toatlsubtotal+grossAmt;
		totalbilamt =totalbilamt+ netAmt;
		totaldisTot =totaldisTot+free;
		
		totalbilladj =totalbilladj + billadj;
		totaligstamt =totaligstamt+free;
		cesstotal =cesstotal+free;
		//totalgstmasteramt =totalgstmasteramt +gstmasteramt;
		
	}
	
	
	var totaltaxableamt =0; //totalbilamt - totalgstmasteramt;
	var totaltotalLess=0;
	 //For total amounts of all feilds 
	result=result
	  + '<tr> '
	  + '	<td colspan="20">Total</td> '
	  + '	<td colspan="2">'+toatlsubtotal.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+totaldisTot.toFixed(2)+'</td> '
	  + '	<td colspan="2"></td> '
	  
	  + '	<td colspan="2">'+totalbilamt.toFixed(2)+'</td> '
	  + '	<td colspan="2">'+totalbilladj.toFixed(2)+'</td> '
	 ;
	
		
	for ( var ik = 0; ik < tk.length; ik++) {
		
		var per=perc[ik];
		var amt = tk[ik];
		var totalamt =slavetotal[ik];
		var taxableamt =slavetaxableamt[ik];
		if (per == 0) {
			result=result
			 + '	<td colspan="2">'+taxableamt.toFixed(2)+'</td> ';
		}else{
			result=result
			 + '	<td colspan="2">'+taxableamt.toFixed(2)+'</td> '
			 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> '
			 + '	<td colspan="2">'+(amt/2).toFixed(2)+'</td> ';
		}
		totaltaxableamt = totaltaxableamt + taxableamt;
		totalgstmasteramt =totalgstmasteramt +amt;
	}
	
		result=result
	 + '	<td colspan="2">'+totaligstamt.toFixed(2)+'</td> '
	 + '	<td colspan="2">'+cesstotal.toFixed(2)+'</td> '
	 +'</tr>';
		
		
		//Sale tax register summary
		result=result
		+'<tr>'
		+'<td colspan="31"> </td>'
		
		+'/tr>'
		
		+'<tr>'
		+'<td colspan="31" align="center"><h4>Sale Tax Register Summary</h4> </td>'
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
		   
		 + '	<td colspan="2">'+toatlsubtotal.toFixed(2)+'</td> '
		  + '	<td colspan="2">'+totalgstmasteramt.toFixed(2)+'</td> '
		  + '	<td colspan="2">'+totaltotalLess.toFixed(2)+'</td> '
		  + '	<td colspan="2">'+totaltaxableamt.toFixed(2)+'</td> '
		  + '	<td colspan="2"></td> '
		  + '	<td colspan="2">'+(totalgstmasteramt/2).toFixed(2)+'</td> '
		  
		  + '	<td colspan="2"></td> '
		  + '	<td colspan="2">'+(totalgstmasteramt/2).toFixed(2)+'</td> '
		  
		  + '	<td colspan="2"></td> '
		  + '	<td colspan="2">0</td> '
		  + '	<td colspan="2">0</td> '
		  + '	<td colspan="2">0</td> '
		  + '	<td colspan="2">0</td> '
		  + '	<td colspan="2">0</td> '
		  + '	<td colspan="2">0</td> '
		  
		  + '	<td colspan="2">'+toatlsubtotal.toFixed(2)+'</td> '
		  
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
	    
	    
		
		
		$("#saletaxtablerep").html(result);
		emptydata2();
}
/*******
 * @author    :BILAL
 * @date      :07-03-2018
 * @Code      :For empty input feilds
 * ********/
function emptydata2(){
	$('#emptydata2').val(0);
	$("#searchBox1").val("");
	$("#searchBox2").val("");
	$("#searchBox3").val("");
	$("#searchBox4").val("");
	$('#hiddencategoryId').val(0);
	$('#hiddencompanyId').val(0);
	$('#hiddenProductId').val(0);
	$('#hiddenvendorId').val(0);
	$('#unitId').val(0);
}