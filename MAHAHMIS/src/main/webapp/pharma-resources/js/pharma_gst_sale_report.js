/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For getting sale report details with gst and igst
 * ******/
function getsaleReportDatawithgst() {

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
		inputs.push('type=' + encodeURIComponent(type+"_"+paytype));
		inputs.push('patientId=' + encodeURIComponent(patientId));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getAllSaleReportWithGST",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				// console.log(r);
				//alert(r.length);
				setSaleDetaisDataWithGST(r);

			}
		});

	}
}
/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For setting sale report details with gst and igst
 * ******/
function setSaleDetaisDataWithGST(r) {
	var divContent = "";
	total = 0;
	var free=0;
	
	var tbillamt        =0 ;
	var tbillamtwithgst =0 ;
	var tdiscount       =0;
	var tnetbillamt     =0;
	var tTaxableamt     =0;
	var tcgstper        =0;
	var tcgstamt        =0;
	var tsgstper        =0;
	var tsgstamt        =0;
	var tigstper        =0;
	var tigstamt        =0;
	var tcessper        =0;
	var tcessamt        =0;
	var tcdamtonper     =0;
	var totalgstAmt     =0;
	var totalGstper     =0;
	var totalfinalbill  =0;
	var totalgstamtaftercd=0;
	
	for ( var i = 0; i < r.length; i++) {
		var gstper =parseFloat(r[i].taxable0);
		//var netAmtwithGST =((parseFloat(r[i].taxable12) * 100) / parseFloat(r[i].taxable0)).toFixed(2);
		//var cdamt    =r[i].cdamt;
		var gstAmt =parseFloat(r[i].taxable12);
		var billAmt =parseFloat(r[i].amount);
		var discount =parseFloat(r[i].discount);
		var cdperc   =r[i].cdperc;
		
		
		if (discount > 0) {
			peramt = parseFloat(((billAmt * discount) / 100));
			tamount = parseFloat(billAmt - peramt);
		} else {
			tamount =  parseFloat(billAmt);
		}
		
		
		var ftotal = parseFloat(tamount - gstAmt);
		var cdamtonper  = parseFloat(((ftotal * cdperc) / 100));
		var ftotalcdamt = ftotal - cdamtonper;
		
		
		//after cd GST amount
		var gstamtaftercd =parseFloat((ftotalcdamt * gstper) /100);
		//final bill amount 
		var finalbill   = ftotalcdamt + gstamtaftercd;
		
		divContent = divContent
				+ '<tr><td>'+ (i + 1)+'</td>'
				+ '<td>'+ r[i].date+'</td>'
			//	+ '<td>'+ r[i].patientSaleTime+'</td>'
				+ '<td>'+ r[i].patientName+'</td>'
				+ '<td>'+ r[i].sponserName+'</td>'
				+ '<td>'+ r[i].receiptNo+'</td>'
				+ '<td>'+ r[i].productName+'</td>'
				+ '<td>'+ r[i].qty1+'</td>'
				+ '<td>'+ r[i].hsnNo+'</td>'
				+ '<td>'+ billAmt.toFixed(2)+'</td>'
				
				+ '<td>'+ discount+'</td>'
				+ '<td>'+ tamount.toFixed(2)+'</td>'
				+ '<td>'+ ftotal.toFixed(2)+'</td>'
				
				/*+ '<td>'+ cdperc+'</td>'
				+ '<td>'+ cdamtonper.toFixed(2)+'</td>'
				+ '<td>'+ ftotalcdamt.toFixed(2)+'</td>'
				+ '<td>'+ gstamtaftercd.toFixed(2) +'</td>'*/
				
				/*+ '<td>'+ gstper +'</td>'
				+ '<td>'+ gstAmt.toFixed(2) +'</td>'*/
				
				+ '<td>'+ (gstper/2).toFixed(2) +'</td>'
				+ '<td>'+ (gstAmt/2).toFixed(2) +'</td>'
				
				+ '<td>'+ (gstper/2).toFixed(2) +'</td>'
				+ '<td>'+ (gstAmt/2).toFixed(2) +'</td>'
				
				+ '<td>'+ free +'</td>'
				+ '<td>'+ free +'</td>'
				
				+ '<td>'+ free +'</td>'
				+ '<td>'+ free +'</td>'
				/*+ '<td>'+finalbill.toFixed(2)+'</td>'*/
				+'</tr>';
				
	   tbillamt        =tbillamt + billAmt ;
	   tdiscount       =tdiscount + discount;
	   tnetbillamt     =tnetbillamt + tamount;
	   tTaxableamt     =tTaxableamt + ftotal;
	   tcgstper        =tcgstper + (gstper/2);
	   tcgstamt        =tcgstamt + (gstAmt/2);
	   tsgstper        =tsgstper + (gstper/2);
	   tsgstamt        =tsgstamt + (gstAmt/2);
	   tigstper        =tigstper + free;
	   tigstamt        =tigstamt + free;
	   tcessper        =tcessper + free;
	   tcessamt        =tcessamt + free;			
	 
	   
	   /*tbillamtwithgst =tbillamtwithgst + ftotalcdamt;
	   tcdamtonper     =tcdamtonper + cdamtonper; 
	   totalgstAmt     =totalgstAmt + gstAmt;
	   totalGstper     =totalGstper + gstper;*/
	   
	   totalfinalbill  =totalfinalbill +finalbill;
	   totalgstamtaftercd=totalgstamtaftercd+gstamtaftercd;
	}
	divContent = divContent
	
	 + '<tr> '
	 + '</tr> '
	 
	 + '<tr> '
	 + '<td colspan="8" align="left">Total</td>'
	 + '<td >'+tbillamt.toFixed(2)+'</td>'
	 
	 + '<td >'+tdiscount.toFixed(2)+'</td>'
	 + '<td >'+tnetbillamt.toFixed(2)+'</td>'
	 
	 + '<td >'+tTaxableamt.toFixed(2)+'</td>'
	 /*+ '<td ></td>'
	 + '<td >'+tcdamtonper.toFixed(2)+'</td>'
	 + '<td >'+tbillamtwithgst.toFixed(2)+'</td>'
	 + '<td >'+totalgstamtaftercd.toFixed(2)+'</td>'*/
	 
	/* + '<td >'+totalGstper +'</td>'
	 + '<td>'+ totalgstAmt.toFixed(2) +'</td>'*/
	 
	 + '<td >0</td>'
	 + '<td >'+tcgstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 
	 + '<td >'+tsgstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tigstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tcessamt.toFixed(2)+'</td>'
	/* + '<td >'+totalfinalbill.toFixed(2)+'</td>'*/
	 + '</tr> '
	 ;
	$("#saledetailswithgst").html(divContent);
	resetAllSale();
	
}


/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For auto suggestion patient name for GST Sale Report 
 * ******/
function autoSuggestionForPateintNameIndentSale1(inputID, typeauto) {

	var typeOfpatient ='diagnosis';
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
				
						// alert(r.length);
						var availableTags = [];
					
								ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

								availableTags
										.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
												+ " "
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
												+ " "
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
												+ "__"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo
												);
							}

						

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("__");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value="'
										+ (arrValue[1]) + '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}
						
							$("#div" + inputID + " .typeahead").html(template);
						

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResultpatient1,
									scrollBar : true,
									

								});
								$("#searchBox5").data('typeahead').source = resultData;
							}, 500);
						
					}
				});

		

	}

}

/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For auto suggestion patient name for GST Sale Report 
 * ******/
function displayResultpatient1(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);

}

function resetAllSale() {
	$("#searchBox1").val("");
	$("#searchBox5").val("");

	$('#hiddenPatientId').val(0);

	$('#hiddenProductId').val(0);

	$('#unitId').val(0);
}

/*****
 * @author    :BILAL
 * @Date      :12-02-2018
 * @Code      :For getting purchase details 
 * ******/
function getsalestockReportitemwise(){

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=0;//$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =0;//$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = "0";
	
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
			url : "../../pharmacy/report/getitemwisemnfsalestockreport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setsalestockReportitemwise(r);
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting product list report
 * ******/
function setsalestockReportitemwise(res){

	var result= ' ';
	/*var tqyt = 0;
	var tfree=0;
	var tmrp=0;
	var tprate=0;
	var tamt=0;
	var tdiscper=0;
	var tgstper=0;
	var tTotal =0;*/
		
	for(var i=0;i<res.length;i++){
		
		//var productId       =res[i].productId;	
		var vendorName      =res[i].vendorName;	
		var productName     =res[i].productName;
		var companyName     =res[i].companyId;
		var purRate         =parseFloat(res[i].purRate);
		
		var stockout          =res[i].stockout;
		var stockin            =res[i].stockin;
		var diff   = stockin - stockout  ;
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+productName+'</td> '
		  + '	<td>'+companyName+'</td> '
		 
		  + '	<td>'+stockout+'</td> '
		  
		  + '	<td>'+stockin+'</td> '
		  + '	<td>'+diff+'</td> '
		  + '	<td>'+stockin+'</td> '
		 
		  
		  + '	<td>'+purRate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  
		  + '	<td>'+purRate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  
		  + '</tr> ';
			
	/*	tqyt = tqyt + parseInt(qty);
		tfree=tfree + free ;
		tmrp=tmrp + parseFloat(rate);
		tprate=tprate + parseFloat(purRate);
		tamt=tamt +  parseFloat(amount);
		tdiscper=tdiscper + parseFloat(disc);
		tgstper=tgstper + parseFloat(dgstPers);
		tTotal=tTotal + parseFloat(ftotal);
	*/	
			
					  	
	}			
	/*result=result
	  + '<tr> '
	  + '</tr> '
	  + '<tr> '
	  + '	<td colspan="8" >Total</td> '
	  + '	<td>'+tqyt+'</td> '
	  
	  + '	<td>'+tfree+'</td> '
	  + '	<td>'+tmrp.toFixed(2)+'</td> '
	  + '	<td>'+tprate.toFixed(2)+'</td> '
	  + '	<td>'+tamt.toFixed(2)+'</td> '
	  + '	<td>'+tdiscper.toFixed(2)+'</td> '
	  + '	<td>'+tgstper.toFixed(2)+'</td> '
	  + '	<td>'+tTotal.toFixed(2)+'</td> '
	  +'</tr>';*/
	$("#itemwisemfgwisesalestock").html(result);
//	emptydata();
	
}

/******
 * @author     :BILAL
 * @date       :13-03-2018
 * @Code       :for sale report with gst full calculations 
 * *********/
function getsaleReportDatawithgstwhole() {

	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];

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
		inputs.push('type=' + encodeURIComponent(type+"_"+paytype));
		inputs.push('patientId=' + encodeURIComponent(patientId));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getAllSaleReportWithGST",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				setSaleDetaisDataWithGSTwhole(r);

			}
		});

	}
}
/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For setting sale report details with gst and igst
 * ******/
function setSaleDetaisDataWithGSTwhole(r) {
	var divContent = "";
	total = 0;
	var free=0;
	
	var tbillamt        =0 ;
	var tbillamtwithgst =0 ;
	var tdiscount       =0;
	var tnetbillamt     =0;
	var tTaxableamt     =0;
	var tcgstper        =0;
	var tcgstamt        =0;
	var tsgstper        =0;
	var tsgstamt        =0;
	var tigstper        =0;
	var tigstamt        =0;
	var tcessper        =0;
	var tcessamt        =0;
	var tcdamtonper     =0;
	var totalgstAmt     =0;
	var totalGstper     =0;
	var totalfinalbill  =0;
	var totalgstamtaftercd=0;
	
	for ( var i = 0; i < r.length; i++) {
		var gstper =parseFloat(r[i].taxable0);
		//var netAmtwithGST =((parseFloat(r[i].taxable12) * 100) / parseFloat(r[i].taxable0)).toFixed(2);
		//var cdamt    =r[i].cdamt;
		var gstAmt =parseFloat(r[i].taxable12);
		var billAmt =parseFloat(r[i].amount);
		var discount =parseFloat(r[i].discount);
		var cdperc   =r[i].cdperc;
		
		if (discount > 0) {
			peramt = parseFloat(((billAmt * discount) / 100));
			tamount = parseFloat(billAmt - peramt);
		} else {
			tamount =  parseFloat(billAmt);
		}
		
		var ftotal = parseFloat(tamount - gstAmt);
		
		var cdamtonper  = parseFloat(((ftotal * cdperc) / 100));
		var ftotalcdamt = ftotal - cdamtonper;
		
		
		//after cd GST amount
		var gstamtaftercd =parseFloat((ftotalcdamt * gstper) /100);
		//final bill amount 
		var finalbill   = ftotalcdamt + gstamtaftercd;
		
		divContent = divContent
				+ '<tr><td>'+ (i + 1)+'</td>'
				+ '<td>'+ r[i].date+'</td>'
				+ '<td>'+ r[i].patientSaleTime+'</td>'
				+ '<td>'+ r[i].patientName+'</td>'
				+ '<td>'+ r[i].receiptNo+'</td>'
				+ '<td>'+ r[i].productName+'</td>'
				+ '<td>'+ r[i].taxable55+'</td>'
				+ '<td>'+ billAmt.toFixed(2)+'</td>'
				
				+ '<td>'+ discount.toFixed(2)+'</td>'
				+ '<td>'+ tamount.toFixed(2)+'</td>'
				+ '<td>'+ ftotal.toFixed(2)+'</td>'
				
				+ '<td>'+ cdperc+'</td>'
				+ '<td>'+ cdamtonper.toFixed(2)+'</td>'
				+ '<td>'+ ftotalcdamt.toFixed(2)+'</td>'
				+ '<td>'+ gstamtaftercd.toFixed(2) +'</td>'
				
				+ '<td>'+ gstper +'</td>'
				+ '<td>'+ gstAmt.toFixed(2) +'</td>'
				
				+ '<td>'+ gstper/2 +'</td>'
				+ '<td>'+ (gstAmt/2).toFixed(2) +'</td>'
				
				+ '<td>'+ gstper/2 +'</td>'
				+ '<td>'+ (gstAmt/2).toFixed(2) +'</td>'
				
				+ '<td>'+ free +'</td>'
				+ '<td>'+ free +'</td>'
				
				+ '<td>'+ free +'</td>'
				+ '<td>'+ free +'</td>'
				//+ '<td>'+r[i].patientSaleSlaveRecAmt.toFixed(2)+'</td>'
				
				+ '<td>'+finalbill.toFixed(2)+'</td>'
				+'</tr>';
				
	   tbillamt        =tbillamt + billAmt ;
	   tdiscount       =tdiscount + discount;
	   tnetbillamt     =tnetbillamt + tamount;
	   tTaxableamt     =tTaxableamt + ftotal;
	   tcgstper        =tcgstper + (gstper/2);
	   tcgstamt        =tcgstamt + (gstAmt/2);
	   tsgstper        =tsgstper + (gstper/2);
	   tsgstamt        =tsgstamt + (gstAmt/2);
	   tigstper        =tigstper + free;
	   tigstamt        =tigstamt + free;
	   tcessper        =tcessper + free;
	   tcessamt        =tcessamt + free;			
	 
	   
	   tbillamtwithgst =tbillamtwithgst + ftotalcdamt;
	   tcdamtonper     =tcdamtonper + cdamtonper; 
	   totalgstAmt     =totalgstAmt + gstAmt;
	   totalGstper     =totalGstper + gstper;
	   
	   //alert(finalbill);
	   totalfinalbill  =totalfinalbill + Number(finalbill.toFixed(2));
	   //totalfinalbill  =totalfinalbill + Number(r[i].patientSaleSlaveRecAmt.toFixed(2));
	   
	   totalgstamtaftercd=totalgstamtaftercd+gstamtaftercd;
	}
	
	divContent = divContent
	
	 + '<tr> '
	 + '</tr> '
	 
	 + '<tr> '
	 + '<td colspan="7" align="left">Total</td>'
	 + '<td >'+tbillamt.toFixed(2)+'</td>'
	 
	 + '<td >'+tdiscount.toFixed(2)+'</td>'
	 + '<td >'+tnetbillamt.toFixed(2)+'</td>'
	 
	 + '<td >'+tTaxableamt.toFixed(2)+'</td>'
	 + '<td ></td>'
	 + '<td >'+tcdamtonper.toFixed(2)+'</td>'
	 + '<td >'+tbillamtwithgst.toFixed(2)+'</td>'
	 + '<td >'+totalgstamtaftercd.toFixed(2)+'</td>'
	 
	 + '<td >'+totalGstper +'</td>'
	 + '<td>'+ totalgstAmt.toFixed(2) +'</td>'
	 
	 + '<td >0</td>'
	 + '<td >'+tcgstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 
	 + '<td >'+tsgstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tigstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tcessamt.toFixed(2)+'</td>'
	+ '<td >'+totalfinalbill.toFixed(2)+'</td>'
	 + '</tr> '
	 ;
	$("#saledetailswithgstwhole").html(divContent);
	resetAllSale();
}
