/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For getting product list report
 * ******/
function getproductData(){

	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];

	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();

	if (hiddencategoryId == "" || hiddencategoryId == null || hiddencategoryId == undefined || isNaN(hiddencategoryId)) {
		hiddencategoryId = 0;
	}
	if (hiddencompanyId == "" || hiddencompanyId == null || hiddencompanyId == undefined || isNaN(hiddencompanyId)) {
		hiddencompanyId = 0;
	}
	if (hiddenProductId == "" || hiddenProductId == null || hiddenProductId == undefined || isNaN(hiddenProductId)) {
		hiddenProductId = 0;
	}
	if (from == "" || from == null || to == '' || to == null) {
		from ="0";
		to ="0";
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
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getproductData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setproductData(r);
				$('#hiddencategoryId').val(0);
				$('#hiddencompanyId').val(0);
				$('#hiddenProductId').val(0);
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting product list report
 * ******/
function setproductData(res){

	var result= ' ';
	
		
	for(var i=0;i<res.lstprod.length;i++){
		
		var productId=res.lstprod[i].productId;
		var strengthName=res.lstprod[i].strengthMaster.strengthName;
		
		var productName=res.lstprod[i].productName;
		var preparationName=res.lstprod[i].preparationMaster.preparationName;
		
		var hsnNo =res.lstprod[i].hsnMaster.hsnNo;
		var catName =res.lstprod[i].categoryMaster.catName;
		var compName =res.lstprod[i].companyMaster.compName;
		var location="-";
		var gst=res.lstprod[i].taxMaster.taxRate;
		var productH1 =res.lstprod[i].productH1;
		var shdH1 ="N";
		var Emergency="N";
		var HighA="N";
		
		
		var drugname=res.lstprod[i].drugMaster.drugName;
		
		if (productH1 == 1 ) {
			 shdH1 ="Y";
		}else{
			 shdH1 ="N";
		}
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+productName+'</td> '
		  + '	<td>'+drugname+'</td> '
		  + '	<td>'+hsnNo+'</td> '
		  + '	<td>'+catName+'</td> '
		  + '	<td>'+compName+'</td> '
		  + '	<td>'+location+'</td> '
		  + '	<td>'+gst+'</td> '
		  + '	<td>'+shdH1+'</td> '
		
		  + '	<td>'+Emergency+'</td> '
		  + '	<td>'+HighA+'</td> '
		  
		  + '</tr> ';
			
	   
			
					  	
	}
		
		

	$("#prodList").html(result);

}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For auto suggestion  product list report
 * ******/
function searchProductList(key){

	var findingName = $("#searchBox1").val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/product/autoSuggestionProductlist",
				timeout : 1000 * 60 * 15,

				error : function(error) {
					alert('error' + error);
				},
				success : function(r) {
					var availableTags = [];
					var resultData = [];

					for (var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + '-'
								+ r[i].shelfMaster.shelfName;
					}

					var template = "";
					for (var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';

					}
					$(".typeahead1").html(template);
					$(".typeahead1").show();

					setTimeout(
							function() {
								$('#searchBox1').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("#searchBox1").data('typeahead1').source = resultData;
							}, 500);
				}
			});
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting hidden product id
 * ******/
function displayResult(item) {
	var content = item.value.split("-");
	$('#hiddenProductId').val(content[0]);
	
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For auto suggestion  company list report
 * ******/
function searchMfg(key) {

	var findingName = $("#searchBox2").val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/company/autoSuggestionCompanyNames",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					
					var availableTags = [];
					var resultData = [];

					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].compName + '_'
								+ r[i].compId + '-' ;
					}

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';

					}
					$(".typeahead2").html(template);
					$(".typeahead2").show();

					setTimeout(function() {
						$('#searchBox2').typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult2,
							scrollBar : true
						});
						$("#searchBox2").data('typeahead').source = resultData;
					}, 500);
				}
			});
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting hidden company id
 * ******/
function displayResult2(item) {
	var content = item.value.split("-");
	$('#hiddencompanyId').val(content[0]);
	
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For auto suggestion  category list report
 * ******/
function searchcategory(key) {

	var findingName = $("#searchBox3").val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/category/autoSuggestionCategoryNames",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					var availableTags = [];
					var resultData = [];

					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].catName + '_' + r[i].catId
								+ '-';
					}

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';

					}
					$(".typeahead3").html(template);
					$(".typeahead3").show();

					setTimeout(function() {
						$('#searchBox3').typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult3,
							scrollBar : true
						});
						$("#searchBox3").data('typeahead').source = resultData;
					}, 500);
				}
			});
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting hidden company id
 * ******/
function displayResult3(item) {
	var content = item.value.split("-");
	$('#hiddencategoryId').val(content[0]);
	
}
/*****
 * @author    :BILAL
 * @Date      :12-02-2018
 * @Code      :For getting vendor name
 * ******/
function autosuggetionVendorView(id) {

	var findingName = $("#searchBox4").val();

	var inputs = [];
	inputs.push('findingName=' + findingName);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/vendor/autoSuggestionv",
		timeout : 2000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			console.log(r);
			
			var availableTags = [];
			var resultData = [];

			for ( var i = 0; i < r.lstvendors.length; i++) {
				
				availableTags[i] = r.lstvendors[i].vendorName + '_' + r.lstvendors[i].vendorId
						+ '-';
			}

			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("_");
				var idValue = (arrValue[1]);
				resultData.push({
					ID : idValue,
					Name : arrValue[0]
				});

				template = template + '<li data-value="'
						+ (arrValue[1]) + '" class=""><a href="#">'
						+ arrValue[0] + '</a></li>';

			}
			$(".typeahead4").html(template);
			$(".typeahead4").show();

			setTimeout(function() {
				$('#searchBox4').typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult4,
					scrollBar : true
				});
				$("#searchBox4").data('typeahead').source = resultData;
			}, 500);
		}
	});
	
}
/*****
 * @author    :BILAL
 * @Date      :12-02-2018
 * @Code      :For setting hidden vendor id
 * ******/
function displayResult4(item) {
	var content = item.value.split("-");
	$('#hiddenvendorId').val(content[0]);
	
}

/*******
* @author   :BILAL
* @Date     :23-01-2018
* @Code     :For setting unit list
* *****/
function getAllUnit() {
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "../../pharmacy/report/fetchUnitList",
        error : function() {
            alert('error');
        },
        success : function(r) {
            setTempForUnit(r);
        }
    });
}
/*******
 * @author   :BILAL
 * @Date     :23-01-2018
 * @Code     :For setting unit list
 * *****/
function setTempForUnit(r) {
	var list = "<option value='0'>--Select Unit--</option>";    
    for ( var i = 0; i < r.lstUnit.length; i++) {    

        list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
        }  
    $("#unitId").html(list);
}

/*****
 * @author    :BILAL
 * @Date      :12-02-2018
 * @Code      :For getting purchase details 
 * ******/
function getpurchaseData(){

	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
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
			url : "../../pharmacy/report/getpurchaseData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setpurchasDetaisData(r);
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting product list report
 * ******/
function setpurchasDetaisData(res){

	var result= ' ';
	var tqyt = 0;
	var tfree=0;
	var tmrp=0;
	var tprate=0;
	var tamt=0;
	var tdiscper=0;
	var tgstper=0;
	var tTotal =0;
		
	for(var i=0;i<res.length;i++){
			
		var productName     =res[i].productName;
		var purBillNo       =res[i].purBillNo;
		var purRate         =res[i].purRate;
		//var billDate        =res[i].billDate;		
		var amount          =res[i].amount;
		var rate            =res[i].rate;
		var batchCode       =res[i].batchCode;	
		var qty             =res[i].qty;	
		var vouNo           =res[i].vouNo;
		//var totalLess       =res[i].totalLess;
		var gstamt          =parseFloat(res[i].gstamt);
		var expiryDate      =res[i].expiryDate;
		var vendorName      =res[i].vendorName;
		var type            =res[i].type;
		var free            =0;
		
		var dgstPers = parseFloat(res[i].dgstPers);
		var disc     = parseFloat(res[i].disc);
		
		if (dgstPers == "" || dgstPers == null || dgstPers == undefined || isNaN(dgstPers)) {
			dgstPers = 0;
		}
		if (disc == "" || disc == null || disc == undefined || isNaN(disc)) {
			disc = 0;
		}
		

		var peramt = 0;
		var tamount = 0;
		if (disc > 0) {
			peramt = parseFloat(((amount * disc) / 100));
			tamount = parseFloat(amount - peramt);
		} else {
			tamount = parseFloat(amount);
		}

		var pgsttotal = parseFloat(((tamount * dgstPers) / 100));
		var ftotal = parseFloat(tamount + pgsttotal);
	//	var ftotal = parseFloat(tamount + gstamt);
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+vouNo+'</td> '
		  + '	<td>'+purBillNo+'</td> '
		  + '	<td>'+type+'</td> '
		  + '	<td>'+productName+'</td> '
		  
		  + '	<td>'+batchCode+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+expiryDate+'</td> '
		  + '	<td>'+qty+'</td> '
		
		  + '	<td>'+free+'</td> '
		  + '	<td>'+rate+'</td> '
		  
		  + '	<td>'+purRate+'</td> '
		  + '	<td>'+amount+'</td> '
		  + '	<td>'+disc+'</td> '
		  + '	<td>'+dgstPers+'</td> '
		  
		  + '	<td>'+ftotal.toFixed(2)+'</td> '
		  
		  + '</tr> ';
			
		tqyt = tqyt + parseInt(qty);
		tfree=tfree + free ;
		tmrp=tmrp + parseFloat(rate);
		tprate=tprate + parseFloat(purRate);
		tamt=tamt +  parseFloat(amount);
		tdiscper=tdiscper + parseFloat(disc);
		tgstper=tgstper + parseFloat(dgstPers);
		tTotal=tTotal + parseFloat(ftotal);
		
			
					  	
	}			
	result=result
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
	  +'</tr>';
	$("#purchasedetails").html(result);
	emptydata();
	
}

/*****
 * @author    :BILAL
 * @Date      :26-02-2018
 * @Code      :For getting purchase order details 
 * ******/
function getpurchaseOrderData(){

	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	
	var hiddenvendorId =$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	
	
	
	
	if (hiddenvendorId == "" || hiddenvendorId == null || hiddenvendorId == undefined || isNaN(hiddenvendorId)) {
		hiddenvendorId = 0;
	}
	
	if (unitId == "" || unitId == null || unitId == undefined || isNaN(unitId)) {
		unitId = 0;
	}
	
	if (from == "" || from == null || from == undefined ) {
		from = '0';
	}
	if (to == "" || to == null || to == undefined ) {
		to = '0';
	}
	
		var inputs = [];
		inputs.push('from=' + encodeURIComponent(from));
		inputs.push('to=' + encodeURIComponent(to));
		
		inputs.push('hiddenvendorId=' + encodeURIComponent(hiddenvendorId));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getpurchaseOrderData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setpurchasorderReportDetais(r);
			
				
			}
		});

}

/*****
 * @author    :BILAL
 * @Date      :26-02-2018
 * @Code      :For setting purchase order list
 * ******/
function setpurchasorderReportDetais(res){

	var result= ' ';
	var tTotalAmt =0;
	var tGstAmt   =0;
		
	for(var i=0;i<res.length;i++){
			
		var poId           =res[i].poId;
		var vendorId       =res[i].type;
		var totalAmount    =res[i].totalAmount;
		var totalVat       =res[i].totalVat;
		var totalNet       =res[i].totalNet;
		var remark         =res[i].chequeNum;	
		var vendorName     =res[i].vendorName;	
		var expiryDate     =res[i].expiryDate;	
		var exp="-";
		
		

		
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+poId+'</td> '
		  + '	<td>'+expiryDate+'</td> '
		  + '	<td>'+totalAmount+'</td> '
		  
		  + '	<td>'+totalVat+'</td> '
		  + '	<td>'+remark+'</td> '
		  
		 
		  + '	<td>'+exp+'</td> '
		  
		  + '</tr> ';
			
	   
		tTotalAmt =tTotalAmt + parseFloat(totalAmount);
		tGstAmt   =tGstAmt + parseFloat(totalVat);	  	
	}		
	
	result=result
	  + '<tr> '
	  +'</tr>'
	  
	  + '<tr> '
	  
	  + '	<td colspan="4">Total</td> '
	  
	  + '	<td>'+tTotalAmt.toFixed(2)+'</td> '
	  + '	<td>'+tGstAmt.toFixed(2)+'</td> '
	  +'</tr>';
	$("#purchaseorderdetails").html(result);
	emptydata();
}




/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For getting purchase details with gst and igst
 * ******/
function getpurchaseDatawithgst(){

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
			url : "../../pharmacy/report/getpurchaseData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setpurchasDetaisDataWithGST(r);
				
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting product list report with
 * ******/
function setpurchasDetaisDataWithGST(res){

	var result= ' ';
	
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
	var totalamt=0;
	var totalnetamt=0;
	for(var i=0;i<res.length;i++){
		var netbillamtwithgst =res[i].netbillamtwithgst;
		
		var billamtmaster   =res[i].billamtmaster;
		var hsncode         =res[i].hsncode;
		var productName     =res[i].productName;
		var purBillNo       =res[i].purBillNo;
		var billDate        =res[i].billDate;
		var amount          =res[i].amount;
		var vendorName      =res[i].vendorName;
		
		var igstAmtmaster      =res[i].igstAmtmaster;
		var gstAmountmaster      =res[i].gstAmountmaster;
		
		
		var free            =0;
		var gstamt          = parseFloat(res[i].gstamt);
		
		var dgstPers =  parseFloat(res[i].dgstPers);
		var disc     =  parseFloat(res[i].disc);
		
		if (dgstPers == "" || dgstPers == null || dgstPers == undefined || isNaN(dgstPers)) {
			dgstPers = 0;
		}
		if (disc == "" || disc == null || disc == undefined || isNaN(disc)) {
			disc = 0;
		}
		

		
		var peramt = 0;
		var tamount = 0;
		if (disc > 0) {
			peramt = parseFloat(((amount * disc) / 100));
			tamount = parseFloat(amount - peramt);
		} else {
			tamount =  parseFloat(amount);
		}

		var pgsttotal = parseFloat(((tamount * dgstPers) / 100));
		var ftotal = parseFloat(tamount + pgsttotal);
		
	
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+billDate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+purBillNo+'</td> '
		  + '	<td>'+productName+'</td> '
		  + '	<td>'+hsncode+'</td> '
		  //+ '	<td>'+amount+'</td> '
		  +'<td>'+netbillamtwithgst+'</td>'
		  + '	<td>'+disc+'</td> '
		  + '	<td>'+peramt.toFixed(2)+'</td> '
		  //+ '	<td>'+ftotal.toFixed(2)+'</td> '
		  + '	<td>'+ftotal.toFixed(2)+'</td> '
		 
		  
		  + '	<td>'+tamount+'</td> '
		  ;
		  
		  if (gstAmountmaster > 0) {
			  result=result  + '	<td>'+parseFloat(dgstPers) / 2+'</td> '
			                 + '	<td>'+parseFloat(pgsttotal) / 2+'</td> '
			                 + '	<td>'+parseFloat(dgstPers) / 2+'</td> '
			                 + '	<td>'+parseFloat(pgsttotal) / 2+'</td> ';
		  } else {
			  result=result  + '	<td>'+free+'</td> '
			                 + '	<td>'+free+'</td> '
			                 + '	<td>'+free+'</td> '
			                 + '	<td>'+free+'</td> ';
		  }
		  
		  if (igstAmtmaster > 0) {
			  result=result  + '	<td>'+parseFloat(dgstPers) +'</td> '
			                 + '	<td>'+parseFloat(pgsttotal) +'</td> ';
			  
			  
		  } else {
			  result=result  + '	<td>'+free+'</td> '
			                 + '	<td>'+free+'</td> ';
		  }
		  result=result
		  + '	<td>'+free+'</td> '
          + '	<td>'+free+'</td> '
		  
		  
		  
		  + '</tr> ';
			
	   
		   tbillamt        =tbillamt + billamtmaster ;
		   tbillamtwithgst =tbillamtwithgst + ftotal ;
		   tdiscount       =tdiscount + peramt;
		   tnetbillamt     =tnetbillamt + parseFloat(amount);
		   tTaxableamt     =tTaxableamt + parseFloat(tamount);
		   
		   totalamt=totalamt +parseFloat(amount) ;
		   totalnetamt=totalnetamt +parseFloat(ftotal);
		   
		   if (gstAmountmaster > 0) {
			   tcgstper        =tcgstper + (parseFloat(dgstPers) / 2);
			   tcgstamt        =tcgstamt + (parseFloat(pgsttotal) / 2);
			   tsgstper        =tsgstper + (parseFloat(dgstPers) / 2);
			   tsgstamt        =tsgstamt + (parseFloat(pgsttotal) / 2);
		   }  else{
			   tcgstper        =tcgstper + free;
			   tcgstamt        =tcgstamt + free;
			   tsgstper        =tsgstper + free;
			   tsgstamt        =tsgstamt + free;
		   }
		   if (igstAmtmaster > 0) {
			   tigstper        =tigstper + parseFloat(dgstPers);
			   tigstamt        =tigstamt + parseFloat(pgsttotal);
		   }else{
			   tigstper        =tigstper + free;
			   tigstamt        =tigstamt + free;
		   }
		   
		 
		   tcessper        =tcessper + free;
		   tcessamt        =tcessamt + free;			
				
					  	
	}	
	
	result = result
	
	 + '<tr> '
	 + '</tr> '
	 
	 + '<tr> '
	 + '<td colspan="6" align="left">Total</td>'
     + '<td ></td>'
     + '<td ></td>'
     + '<td >'+tdiscount.toFixed(2)+'</td>'
	 + '<td >'+tbillamtwithgst.toFixed(2)+'</td>'
	 
	 
	
	 
	 + '<td >'+tTaxableamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tcgstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 
	 + '<td >'+tsgstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tigstamt.toFixed(2)+'</td>'
	 + '<td >0</td>'
	 + '<td >'+tcessamt.toFixed(2)+'</td>'
	 + '</tr> '
	 ;
	
	$("#purchasedetailswithgst").html(result);
	emptydata();
}

function emptydata(){
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