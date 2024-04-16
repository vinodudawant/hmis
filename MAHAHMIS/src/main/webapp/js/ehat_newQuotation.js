var subServIdArray =[];
var quotationIdArray=[];
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 30_Jan_2018
 * @Code Get Service Details
 ******************************************************************************/
function getServiceDetails(callfrom) {
	//var callfrom="genaral";
	var patientId     = $("#pId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"count" : 0,
			//"count" : patientId,
			"callfrom" : callfrom,
			"patientId" : patientId
		},
		url : "ehat/ipdbill/getServiceDetails",
		success : function(r) {
						if (callfrom == "quotaionList") {
							setQuotationNameListTemp(r);
			} else {
				getServiceDetailsTemp(r);
			}
			$('#amount').attr('readonly', 'true');		
			
		}
	});
}

var totAmt=0;
function getServiceDetailsTemp(r){
	
	var setBill="";
	var totAmt=0;
	
	var totqyt=0;
	var treatmentId=$('#treatmentId').text();

	
	for ( var i = 0; i < r.listBillDetailsQuotation.length; i++) {
		
		if(r.listBillDetailsQuotation[i].serviceId==1){
			
		}/*else if(r.listBillDetailsQuotation[i].serviceId==2){
			
		}*/
		else{
						
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'// added by vinod
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillDetailsQuotation[i].serviceId)+')" checked=checked id="chkOpdBillReg'+(r.listBillDetailsQuotation[i].serviceId)+'" name="opdBillCheckboxReg" value="'+ r.listBillDetailsQuotation[i].serviceId+'">'
			+	'</td>'// added by vinod
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'+i+'" onclick="getSubServiceDetailsQt('+i+','+r.listBillDetailsQuotation[i].quotationCount+','+r.listBillDetailsQuotation[i].patientId+','+ r.listBillDetailsQuotation[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillDetailsQuotation[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseCghsTwo'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>SubService Name</th>'
				
			+	'<th>'
			+	'<div class="text-center">Rate</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Qty</div>'
			+	'</th>'
					
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>'
			
			/*+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'*/
			+	'<th style="display:none" class="only-checkbox">Edit</th>'
			
			+	'<th class="only-checkbox">ChB</th>'
					
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceData'+i+'">'
				
			
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center"> '+ r.listBillDetailsQuotation[i].qty +'</div></td>';
			if(r.listBillDetailsQuotation[i].serviceId == 15){
				setBill=setBill 
				+ 	'<td>'// added by vinod
				+	'<div id="tamt'+(r.listBillDetailsQuotation[i].subServiceId)+'" class="text-right">' + (r.listBillDetailsQuotation[i].rate).toFixed(2) +'</div></td>'
				
				+	'</tr>';// added by vinod	
				
				totqyt=totqyt+ r.listBillDetailsQuotation[i].qty;
				totAmt=totAmt+r.listBillDetailsQuotation[i].rate;
			}else{
				setBill=setBill	
				+ 	'<td>'// added by vinod
				+	'<div id="tamt'+(r.listBillDetailsQuotation[i].subServiceId)+'" class="text-right">' + (r.listBillDetailsQuotation[i].amount).toFixed(2) +'</div></td>'
				
				+	'</tr>';// added by vinod	
				
				totqyt=totqyt+ r.listBillDetailsQuotation[i].qty;
				totAmt=totAmt+r.listBillDetailsQuotation[i].amount;
			}
			
		}
	}
	
		$("#totalQtyRunT").text(totqyt);
		$("#totalAmtRunT").text((totAmt).toFixed(2));	
		
		$("#billDetailsRT1").html(setBill);
		
		/*setTimeout(function() {			
			calAdminCharges();
			}, 10);*/
		
		//calAdminCharges();
		//$('#append').val(0);
}


function getSubServiceDetailsQt(i,c,pId,s)
{
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"count" : c,
			"serviceId" : s,
			"patientId" : pId
		},
		url : "ehat/ipdbill/getSubServiceDetailss",
		success : function(r) {
				
			getSubServiceDetailsTempQt(i,r,s);		
			
		}
	});
}

function getSubServiceDetailsTempQt(j,t,s)
{
	var setService="";
	var qtyForAdmin=1;
		
	for ( var i = 0; i < t.listBillDetailsQuotation.length; i++) {
		var a=1+i;
		
		var datetime12= new Date(t.listBillDetailsQuotation[i].createdDateTime).toLocaleDateString('en-GB');
		
			setService = setService + '<tr id="tr'+(t.listBillDetailsQuotation[i].quotationId)+'">';

			subServIdArray.push(parseInt(t.listBillDetailsQuotation[i].subServiceId));
			quotationIdArray.push(parseInt(t.listBillDetailsQuotation[i].quotationId));
		setService=setService
		
			
		+ '<td style="display:none;" id="row'+(t.listBillDetailsQuotation[i].quotationId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillDetailsQuotation[i].quotationId)+'"> '+ t.listBillDetailsQuotation[i].quotationId+' </td>';



				setService = setService + '<td id="catName'
						+ (t.listBillDetailsQuotation[i].subServiceId) + '"> '
						+ t.listBillDetailsQuotation[i].subServiceName + ' </td>'
						
						+ '<td class="hide" id="serName'+ a +'"> '
						+ t.listBillDetailsQuotation[i].subServiceName + ' </td>';
			

		setService = setService
		
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillDetailsQuotation[i].quotationId)+'"> '+ t.listBillDetailsQuotation[i].subServiceId+' </td>'
		+	'<td class="hide" id="ssId'+(a)+'"> '+ t.listBillDetailsQuotation[i].subServiceId+' </td>'
		+	'<td class="hide" id="servId'+(a)+'"> '+ t.listBillDetailsQuotation[i].serviceId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillDetailsQuotation[i].quotationId)+'"> '+ t.listBillDetailsQuotation[i].serviceId+' </td>'
						
		+	'<td style="display:none;" id="amt'+(t.listBillDetailsQuotation[i].quotationId)+'"> '+ t.listBillDetailsQuotation[i].amount+' </td>';
		
				
				setService = setService + '<td class="text-center" id="char'+(t.listBillDetailsQuotation[i].subServiceId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillDetailsQuotation[i].quotationId)+'">'+ (t.listBillDetailsQuotation[i].rate).toFixed(2) +'</div>'
				+	'</td>';	
				
				setService = setService + '<td class="hide" id="rate'+(a)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillDetailsQuotation[i].quotationId)+'">'+ (t.listBillDetailsQuotation[i].rate).toFixed(2) +'</div>'
				+	'</td>';
						
		
		
		
		
		if(t.listBillDetailsQuotation[i].serviceId == 15){
			
			setService = setService + '<td id="q'+(t.listBillDetailsQuotation[i].subServiceId)+'">'
			+	'<div class="text-center">'+ qtyForAdmin +'</div>'
			+	'</td>';
			
			setService = setService +
			+ '<td class="hide" id="qty'+(a)+'">'
			+	'<div class="text-center">'+ qtyForAdmin +'</div>'
			+	'</td>'
			
			
			+	'<td class="text-center" id="amt'+(t.listBillDetailsQuotation[i].subServiceId)+'">'
			+	'<div class="text-center">'+ (t.listBillDetailsQuotation[i].rate).toFixed(2) +'</div>'
			+	'</td>'	;
		}else{
			
			setService = setService + '<td id="q'+(t.listBillDetailsQuotation[i].subServiceId)+'">'
			+	'<div class="text-center">'+ t.listBillDetailsQuotation[i].quantity +'</div>'
			+	'</td>';
			
			setService = setService +
			+ '<td class="hide" id="qty'+(a)+'">'
			+	'<div class="text-center">'+ t.listBillDetailsQuotation[i].quantity +'</div>'
			+	'</td>'
			
			+	'<td class="text-center" id="amt'+(t.listBillDetailsQuotation[i].subServiceId)+'">'
			+	'<div class="text-center">'+ (t.listBillDetailsQuotation[i].amount).toFixed(2) +'</div>'
			+	'</td>';
		}
		
		
		+	'<td class="hide" id="amt'+(a)+'">'
		+	'<div class="text-center">'+ (t.listBillDetailsQuotation[i].amount).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td id="dateSub'+(t.listBillDetailsQuotation[i].quotationId)+'">'
		+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
		setService = setService +	'</td>';
		
				setService = setService+	'<td style="display:none" class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  onclick="editOnClickNew('+t.listBillDetailsQuotation[i].quotationId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillDetailsQuotation[i].quotationId+'></i></button></a></td>';
			
		setService = setService + '<td class="only-checkbox" >'
		+	'<input type="checkbox" id="chkOpdBillReg'+ t.listBillDetailsQuotation[i].quotationId+'" name="opdBillCheckboxReg" value="'+ t.listBillDetailsQuotation[i].quotationId+'">'
		+	'</td>';
		setService = setService +	'</td>';
		
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';			
	}

	$("#serviceData"+j).html(setService);

}

function saveNewQuotation(callfrom){

	var chargesConf=$("#chargesfromConfIpd").val();	
	var adminChargesPer=$("#adminChargesPer").val();
	
	//Added By Bilal for getting proper rates of sponsor and hall
    var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	$("#sponsorid2").val(sponsorId);
	$("#chargesSlaveId2").val(chargesSlaveId);
	var serviceId = $("#serviceid").val();
	
	if (serviceId != 3) {
		
		if (sponsorId > 0 && chargesSlaveId > 0) {
			getchargesipdNew();
		}
	}
	if (chargesConf > 0 ) {
		//chargesConf =chargesConf;
	}else{
		$("#hallId").val(0);
		getchargesipdNew();
		chargesConf=$("#chargesfromConfIpd").val();
		if (chargesConf > 0 ) {
			//chargesConf =chargesConf;
		}else{
			$("#SponsorsourceTypeId").val(0);
			$("#chargesSlaveId").val(0);
			$("#hallId").val(2);
			getchargesipdNew();
			chargesConf=$("#chargesfromConfIpd").val();
		}
	}
		
	var hallId    =	$('#hallId').val();	
	
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
		var queryType = $('#queryType').val();
		//var doctorId = $("#doctorName option:selected").val();
		
		var rate = $("#rate").val();
		var quantity = $("#qty").val();
		var amount = $("#amount").val();
		var createdDateTime = $("#finalDate").val();
		var subServiceId = parseInt($("#subserviceid").val());
		if(subServiceId == -5){
			alert("Please enter valid service Name");		
			return false;
		}
		var count=$('#append').val();
		var qName=$('#qName').val();
		
		
		var ratevalidation = $('#rate').val();
		
		if (ratevalidation == "" || ratevalidation == null || ratevalidation == undefined || ratevalidation == 0 || isNaN(ratevalidation)) {
			ratevalidation = 0;
			alert("Please Enter Rate");
			return false;
		}
		var subServiceName = $("#perticular").val();
		var serviceName = $("#servId option:selected").text();
		var unitId = $("#uId").val();
	
		var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);


		if (subServiceName == "" || subServiceName == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}
		
		var serviceDetails = {
				listBillDetailsQuotation : []
		};
		
		serviceDetails.listBillDetailsQuotation.push({
			unitId : unitId,
			serviceId : serviceId,
			subServiceId : subServiceId,
			subServiceName : subServiceName,
			serviceName : serviceName,
			rate : rate,			
			quantity : quantity,
			amount : amount,			
			sponsorId  : sponsorId,
			chargesSlaveId : chargesSlaveId,	            	           
			hallId     : hallId,
			qtyCount  : count,
			quotationName  : qName
           
		});
		/*alert(serviceDetails.listBillDetailsQuotation[0].serviceName);
		return false;*/
		serviceDetails = JSON.stringify(serviceDetails);

		var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + serviceDetails);
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);
		inputs.push("adminChargesPer=" + adminChargesPer);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdbill/saveQuotationsNew",

			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

			//	if (r > 0) {
				if (r ==1 && queryType == 'insert' ) {
					alertify.success("Service assign Successfully");
				} else if(r ==2 && queryType == 'update' ){
					alertify.success("Service Update Successfully");
				}
				if(count > 0){
				setServicesFromList('general');
				}else{
				getServiceDetails("general");
				}				
				clearAllFields();
				openAllSlave();
				
			}
		});
}

function setQuotationNameListTemp(r)
{
	var list = "<option value=0>Select</option>";

	for ( var i = 0; i < r.listBillDetailsQuotation.length; i++) {

		list = list + '<option value="' + (r.listBillDetailsQuotation[i].quotationCount)
				+ '">' + (r.listBillDetailsQuotation[i].quotationName) + '</option>';
	}
	$("#qutNameNew").html(list);
	//$("#qutNameNew").select2();
	}

function setServicesFromList(callfrom) {
	var patientId     = $("#pId").val();
	var count=$('#qutNameNew').val();
	var qName=$('#qutNameNew :selected').text();
	
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"count" : count,
			"callfrom" : callfrom,
			"patientId" : patientId
		},
		url : "ehat/ipdbill/getServiceDetails",
		success : function(r) {
						
			getServiceDetailsTemp(r);
			clearAllFields();
			$('#append').val(count);
			$('#qName').val(qName);
			$('#amount').attr('readonly', 'true');		
			openAllSlave();
		}
	});
}

function clearAllFields()
{
	$('#perticular').val("");
	$('#servId').val(0);
	$('#rate').val(0);	
	$('#qty').val(1);
	$('#amount').val(0);
	$('#queryType').val('insert');
	
	//$('#append').val(0);
}

function saveAndDeleteQuotaion(callfrom){
	
var quotationName="-";
var quotationId=0;
var patientId     = $("#pId").val();
	if(callfrom=="save"){
		//Added By Kishor For narration of Bill at the time of edit
		var narrationBill =$("#narrationRunTimeNew").val();
		
		if (narrationBill == "narrationRunTimeNew") {
			setnarationpopupBillNew();
			return false;
		}
		
		var narrationidBill =$('#narrationRunTimeNew').val();
		if (narrationidBill != "" || narrationidBill != null || narrationidBill != undefined) {
			closePopupnarrationBillNew();
		}	
		
		if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
			narrationidBill="-";
		}
		 quotationName =$("#quotationNameNew").val();
		
		if (quotationName == "" || quotationName == null || quotationName == undefined) {
			quotationName="-";
			alert("Enter quotation Name ");
			$("#narrationRunTime").val("narrationRunTimeNew");
			return false;
		}
	}else{
		var tableR = $('#billDetailsRT1 tr').length;
		var count=$('#qutNameNew').val();
		//alert(count);
		if(count > 0){			
			$("#billDetailsRT1").empty();
			$('#qutNameNew').val(0);
			$('#qName').val("-");
			$('#append').val(0);
			$('#wardType2').val(0);			
			$('#days').val(0);
			clearAllFields();
			return false;
		}else if(tableR == 0){			
			$('#qutNameNew').val(0);			
			$('#append').val(0);
			$('#qName').val("-");
			$('#wardType2').val(0);			
			$('#days').val(0);
			clearAllFields();
			return false;
		}
			 quotationName ="-";	
			 
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"quotationName" : quotationName,
			"quotationId" : quotationId,
			"callfrom" : callfrom,
			"patientId" : patientId
		},
		url : "ehat/ipdbill/saveAndDeleteQuotaion",
		success : function(r) {
			if (r ==1) {
				alertify.success("Quotation save Successfully");
				getServiceDetails("quotaionList");
				getServiceDetails("general");
				$("#narrationRunTimeNew").val("narrationRunTimeNew");
			} else if(r ==2){
				alertify.success("Clear Successfully");
				$("#billDetailsRT1").empty();
				
				$("#narrationRunTimeNew").val("narrationRunTimeNew");
			}
					
			clearAllFields();
			
			$("#narrationRunTimeNew").val("narrationRunTimeNew");
		}
	});
}

function setnarationpopupBillNew(){
	
	$("#modal-55").addClass("md-show");
}

function closePopupnarrationBillNew(){
	$("#modal-55").removeClass("md-show");
}

function setNarrationBillNew(){

	//var receiptEditSponsor  = $("#receiptEditSponsor").val(); 	
	var narrationidBill =$('#narrationRunTimeNew').val();
	
    if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		$("#narrationRunTimeNew").focus();		
		return false;
	}
    
    $("#narrationRunTimeNew").val('narrationRunTime');
    
	var quotationName =$("#quotationNameNew").val();
	
	if (quotationName == "" || quotationName == null || quotationName == undefined) {
		quotationName="-";
		alert("Enter quotation Name ");
		//$("#narrationRunTime").val('narrationRunTime');
		return false;
	}
	saveAndDeleteQuotaion('save');
		
}



/*******************************************************************************
 * @author : kishor lokhande
 * @date : 1-Jan-2018
 * @code :autosuggestion
 ******************************************************************************/
function setallservautocompleteForQuotationNew(inputID) {
	var listofunit = [];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = $('#servId').val();
	//var treatId=$("#treatId").val();
	
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + 2);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	//inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",

		success : function(r) {
			/*
			 * alert(r.lstSubService[0].categoryName);
			 */
			autoCompForQuotationNew(r, inputID);
			
		}
	});
}


/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 18-May-2017
 * @code :autosuggestion services
 ******************************************************************************/
function autoCompForQuotationNew(response, id) {

	var myArray = response;// parsing response in JSON format
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} 
						 ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							//console.log(ui);
							var categoryid= ui.item.categoryid;
							var sId =ui.item.serviceid;
							$('#categoryidsipd').val(categoryid);
							getchargesipdNew();
							fetchmchargesForQuotation();
							
							$('#perticular').val(ui.item.categoryName);
							
							/*
							 * $("#subservicesname").val(ui.item.categoryName);
							 */$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							
							var rategeneralhall =$("#rategeneral").val();
							if (rategeneralhall > 0) {
								
								$("#rate").val(rategeneralhall);
							} else {
								$("#rate").val(ui.item.categorycharges);
							}
							
							if(sId == 3 && categoryid == -1){							
								//$("#subserviceid").val(hallSlaveIdN);
								var cat=ui.item.categoryName;
								var hallName=$('#s2id_listmstr_select_Hall').text();
								$('#perticular').val(cat+" ("+hallName+")");
								var bed=$("#bedRate").val();
								$("#rate").val(bed);
							}else if(sId == 3 && categoryid == -2){
								var cat=ui.item.categoryName;
								var hallName=$('#s2id_listmstr_select_Hall').text();
								$('#perticular').val(cat+" ("+hallName+")");
								var nursing=$("#nursingRate").val();
								$("#rate").val(nursing);
							}
							//$("#concession").val(ui.item.concession);
							//$("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);
							$("#iscombinationIpd").val(ui.item.iscombination);
							calculatePerticularTotal1();
							$('#rate').focus();
							
							return false;

						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
							console.log(data);
							console.log(data.lstService.length);
							var result;
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
															// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}


/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div**/
function fetchmchargesForQuotation() {
	
	var sponsorId = $("#lis0").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	var categoryid = $("#categoryidsipd").val();
	
	//var hallId = $('#hallIdd').val();hallIDD
	var hallId = $('#lisH0').val();
	var hallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	
	var toDate =$("#toDate").val();
	//alert("toDate???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
    }
	
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
		hallSlaveId = 0;
    }
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	
	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	

	
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/configurationservice/fetchMedicalTeamCharges",
		data : {
			"chargesId"      : parseInt(sponsorId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
		console.log(r);
		if(r.lstConfigurService.length > 0){
			var bedRate=r.lstConfigurService[0].hallCharges;
			var nursingRate=r.lstConfigurService[0].medicalCharges;
			$('#bedRate').val(bedRate);
			$('#nursingRate').val(nursingRate);
		}
		
		}
	});		
}



/************
* @author	: Bilal
* @date		: 09-Sep-2017
* @codeFor	:  sponsor charges ipd
 ************/
function getchargesipdNew(callFrom) {
	
	var sponsorId = $("#lis0").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	var categoryid = $("#categoryidsipd").val();
	
	//var hallId = $('#hallIdd').val();hallIDD
	var hallId = $('#lisH0').val();
	var hallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	
	//For Is combination service id
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	
	var toDate =$("#toDate").val();
	//alert("toDate???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
    }
	
	if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
		hallSlaveId = 0;
    }
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	
	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}

	var inputs = [];
/*alert(hallId);
alert(hallSlaveId);*/

	if(callFrom == "againNew"){
		var hallSlaveId1=$('#wardType2').val();
		//alert("in"+hallSlaveId1);
		inputs.push('serviceid=' + categoryid);
		inputs.push('sponsorId=' + 0);
		inputs.push('chargesSlaveId=' + 0);
		inputs.push('hallId=' + 2);
		inputs.push('hallSlaveId=' + hallSlaveId1);	
		inputs.push('isComServId=' + 0);
		inputs.push('isComServlastId=' + 0);
	}else{
		//alert("else");
		//alert(hallId);
		inputs.push('serviceid=' + categoryid);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('hallId=' + hallId);
		inputs.push('hallSlaveId=' + hallSlaveId);	
		inputs.push('isComServId=' + isComServId);
		inputs.push('isComServlastId=' + isComServlastId);
	}
	

	//inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsorForQuotation",

		success : function(r) {
			$("#rategeneral").val(r);
			$("#chargesfromConfIpd").val(r);
			console.log(r);
		}
	});
}

function openAllSlave(){
	
	$(".openAllSlave").trigger('click');
	
}


/************
 *@author	: Kishor Lokhande
 *@date		:  06-Feb-2018
 *@code		:get charges of configuration
 ***********/
function getChargesFromConfiguration(){
	//alert("Set");
	$('#billDetailsComparision').empty();
	var treatmentId = $('#treatmentId').text();
	//alert("hi");
	//getPatientBillAmountIpdForComparison(treatmentId,'general');
	//var number = parseFloat($("#number").val());
	//For Service Id
/*	var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();
	*/
	//For Charges Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
		
	//For Hall Wise Id  
	//var HallId =0;
	var HallId = $("#lisH0").val();// chargesId
	var HallSlaveId = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems2 li").length;
	HallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
		
	//For Is combination service id
	//var isComServId =0;
	var isComServId = $("#lisHc0").val();// chargesId
	var isComServlastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId = $("#lisHc" + (liSizeCom - 1)).val();
	
	/*---------------------------------------*/

	if (isComServId == "" || isComServId == null || isComServId == undefined
			|| isNaN(isComServId)) {
		isComServId = 0;
	}
	if (isComServlastId == "" || isComServlastId == null
			|| isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	}
	if (HallSlaveId == "" || HallSlaveId == null || HallSlaveId == undefined) {
		HallSlaveId = 0;
	}
	if (HallId == "" || HallId == null || HallId == undefined) {
		HallId = 0;
	}
	if (chargesId == "" || chargesId == null || chargesId == undefined
			|| isNaN(chargesId)) {
		chargesId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	/*---------------------------------------*/
	
	var servId =[];
	//var subServId =[];
	var tretId=0;
	
	var inputs = [];	
	inputs.push("tretId="+ encodeURIComponent(tretId));
	inputs.push("servId="+ encodeURIComponent(servId));
	inputs.push("subServId="+ encodeURIComponent(subServIdArray));
	inputs.push("chargesSponId="+ encodeURIComponent(chargesId));
	inputs.push("chargesSlaveId="+ encodeURIComponent(chargesSlaveId));
	
	inputs.push("HallId="+ encodeURIComponent(HallId));
	inputs.push("HallSlaveId="+ encodeURIComponent(HallSlaveId));
	
	inputs.push("isComServId="+ encodeURIComponent(isComServId));
	inputs.push("isComServlastId="+ encodeURIComponent(isComServlastId));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url : "ehat/ipdbill/getIpdComparisonPatients",
		data	: str + "&reqType=AJAX",
		cache 	: false,
	
		success : function(r) {
			//setIpdComparisonPatientsTempRunTime(r);
			setTempForChangeRate(r);
		}
	});
}
function setTempForChangeRate(r){
	var setTAmt=0.0;
	for ( var i = 0; i < r.lstServiceConfigurations.length; i++) {
		var ssid=r.lstServiceConfigurations[i].serviceId;
		var rate=parseFloat(r.lstServiceConfigurations[i].charges);
		//alert(rate);
		var qty=parseInt($('#q'+ssid).text());
		var amt =parseFloat((rate * qty).toFixed(2));
		//'<div class="text-center">'+ (t.listBillDetailsQuotation[i].amount).toFixed(2) +'</div>';
		$('#char'+ssid).text(rate);
		$('#amt'+ssid).text(amt);
		var tA=parseFloat($('#tamt'+ssid).text());
		var setAmt=0;
		
		if(amt >= tA){
			setAmt=tA-amt;
			//alert("hi"+setAmt);
			$('#tamt'+ssid).text(amt);
			var getAmt=$('#totalAmtRunT').text();
			 setTAmt=getAmt-setAmt;
			//$('#totalAmtRunT').text(setTAmt.toFixed(2));
		}else{
			setAmt=amt-tA;
			//alert(setAmt);
			$('#tamt'+ssid).text(amt);
			var getAmt=$('#totalAmtRunT').text();
			 setTAmt=getAmt+setAmt;
			
		}
		
		
		
		var amtt=0.0;
		$("#billDetailsRT1 tr").each(function() {

					 var amt = $(this).find('td:eq(11)').text();
					// var Amt = $(this).find('td:eq(7)').text();
					// alert(amt);
		  
		amtt=Number(amtt)+Number(amt);
				});
		//alert(amtt);
		
		$('#totalAmtRunT').text(amtt.toFixed(2));
		
	}
}



/*******************************************************************************
 * @author : kishor lokhande
 * @date : 22-feb-2018
 * @code :autosuggestion
 ******************************************************************************/
function setallservautocompleteForQuotationNewAgain(inputID) {
	var listofunit = [];
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unitlist = "";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype = "all";
	var serviceid = $('#servId').val();
	//var treatId=$("#treatId").val();
	
	var inputs = [];
	inputs.push('unit=' + 1);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + 2);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	//inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",

		success : function(r) {
			/*
			 * alert(r.lstSubService[0].categoryName);
			 */
			autoCompForQuotationNewAgain(r, inputID);
			
		}
	});
}


/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 18-May-2017
 * @code :autosuggestion services
 ******************************************************************************/
function autoCompForQuotationNewAgain(response, id) {

	var myArray = response;// parsing response in JSON format
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						} 
						 ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {

							//console.log(ui);
							var categoryid= ui.item.categoryid;
							var sId =ui.item.serviceid;
							$('#categoryidsipd').val(categoryid);
							getchargesipdNew("againNew");
							fetchmchargesForQuotation();
							
							$('#perticular').val(ui.item.categoryName);
							
							/*
							 * $("#subservicesname").val(ui.item.categoryName);
							 */$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							
							var rategeneralhall =$("#rategeneral").val();
							if (rategeneralhall > 0) {
								
								$("#rate").val(rategeneralhall);
							} else {
								$("#rate").val(ui.item.categorycharges);
							}
							
							if(sId == 3 && categoryid == -1){							
								//$("#subserviceid").val(hallSlaveIdN);
								var cat=ui.item.categoryName;
								var hallName=$('#s2id_listmstr_select_Hall').text();
								$('#perticular').val(cat+" ("+hallName+")");
								var bed=$("#bedRate").val();
								$("#rate").val(bed);
							}else if(sId == 3 && categoryid == -2){
								var cat=ui.item.categoryName;
								var hallName=$('#s2id_listmstr_select_Hall').text();
								$('#perticular').val(cat+" ("+hallName+")");
								var nursing=$("#nursingRate").val();
								$("#rate").val(nursing);
							}
							//$("#concession").val(ui.item.concession);
							//$("#amount").val(ui.item.amount);
							$("#servId").val(ui.item.serviceid);
							$("#iscombinationIpd").val(ui.item.iscombination);
							calculatePerticularTotal1();
							$('#rate').focus();
							
							return false;

						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
							console.log(data);
							console.log(data.lstService.length);
							var result;
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
															// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");

						}
					});
}


function editOnClickNew(id){
	alert(id);
}
