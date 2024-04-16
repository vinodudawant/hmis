/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting list of canteen services 
 * **********/
function getcateenservices(inputId,currrentrow) {

	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/getcateenservices",
		
		success : function(r) {
			
			setcateenservices(r,inputId,currrentrow);
			
		}
	});
} 
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For setting list of CANTEEN services 
 * **********/
function setcateenservices(response,id,currrentrow) {
    
	$("#currentrowcount" ).val(currrentrow);
	var rowcount= currrentrow;//$("#rowcount" ).val();
	var myArray = response;
	
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

	
	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'categoryName',
					width : '150px',
					valueField : 'categoryName'
				},{
					name : 'Rate',
					width : '100px',
					valueField : 'charges'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
						$('#'+id).val(ui.item.categoryName);
						
						var subId =ui.item.subId;
						var serviceId =ui.item.serviceId;
						var codeName =ui.item.codeName;
						var charges  =ui.item.charges;
						
						$("#codeName"+rowcount).val(codeName);
						$("#charges"+rowcount).val(charges);
						$("#serviceid"+rowcount ).val(serviceId);
						$("#subId"+rowcount ).val(subId);
						
						$('#textQty' + rowcount).focus();
						
						calculateAmt(rowcount);
						
						//toCreateRow();
						
					return false;
					
				},

				
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					
					var result;
					if (!data || data.lstSubService.length === 0 || !data.lstSubService
							|| data.lstSubService.length === 0) {
						
						result = [ {
							
							'categoryName' : 'NO',
							'' : 'Match',
							
						} ];
						//toCreateRow();
					} else {
						result = data.lstSubService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}

function getcateenservicesbycodes(inputId,currrentrow) {

	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/subservice/getcateenservicesbycode",
		
		success : function(r) {
			
			setcateenservicesbycodes(r,inputId,currrentrow);
			
		}
	});
}
function setcateenservicesbycodes(res,id,rowcount){
	if(res.lstSubService.length == 0){
		alert("No records found !!");
		return false;
	}
	$('#subservice'+rowcount).val(res.lstSubService[0].categoryName);
	$("#codeName"+rowcount).val(res.lstSubService[0].codeName);
	$("#charges"+rowcount).val(res.lstSubService[0].charges);
	$("#serviceid"+rowcount ).val(res.lstSubService[0].serviceId);
	$("#subId"+rowcount ).val(res.lstSubService[0].subId);
	
	var qyt =parseInt($('#textQty' + rowcount).val());
	var amt = res.lstSubService[0].charges *qyt;
	$("#textAmount"+rowcount ).val(amt);
	toCreateRow();
	$('#codeName' + (rowcount +1)).focus();
	calculateAmt(rowcount);
	
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For calculating current row amount 
 * **********/
function calculateAmt(rowcount){
	
	
	$('#currentrowcount').val(rowcount);
	
	var rate    =$("#charges"+rowcount).val();
	var textQty =$("#textQty"+rowcount).val();
	
	var amount  =rate * textQty;
	$("#textAmount"+rowcount).val(amount);
	calculatTotal();
	
}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For calculating total amount 
 * **********/
function calculatTotal() {
	
	var totalAmt = 0;

	$(".amtclass").each(
			function() {

				var charges = parseFloat($(this).val());
				if (charges == "" || charges == null || charges == undefined
						|| isNaN(charges)) {
					charges = 0;
				}
				totalAmt = totalAmt + charges;

			});

	$('#totalamount').val(totalAmt);
	$('#totalAMountgst').val(totalAmt);
	calculategst();
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For calculating GST amount 
 * **********/
function calculategst(){
	
	var totalamtwithgst=0;
	var gstper=parseInt($('#gstper').val());
	var totalamt =parseFloat($('#totalamount').val());
	
	var gstAmt=totalamt/100*gstper;
	
	totalamtwithgst = totalamt+gstAmt;
	if (gstper > 0) {
		$('#totalAMountgst').val(totalamtwithgst);
		$('#paidamt').val(totalamtwithgst);
	}else{
		$('#totalAMountgst').val(totalamt);
		$('#paidamt').val(totalamt);
	}
	
	$('#gstamt').val(gstAmt);
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For creating new rows or tr 
 * **********/
function toCreateRow(){
	
	var tableno= $('#tableno').val();
	var rc = $('#ItemInfoTable >tbody >tr').length;
	
	var sn = $("#subservice"+rc).val();
	if(sn!="" && sn!=undefined && sn !=null){
		
		var rowCount= rc + 1;
		
		//onblur="getcateenservicesbycodes(this.id,'+rowCount+');"
		$("#rowcount" ).val(rowCount);
		
			
			 $('#DRRDiv').append('<tr id="remove'+rowCount+'">'
			+'<td>'
			+'<input type="text" id="tableNo'+rowCount+'" name="tableNo'+rowCount+'" readonly="readonly" '
			+'class="form-control input-SmallText # deleteGroup1 # textNoDelete" value="'+tableno+'" maxlength="3" tabindex="-1">'
			+'<input type="hidden" id="canteenslaveId'+rowCount+'" value="0"></td>'
			
			+'<td>'
			+'<input type="text"   id="codeName'+rowCount+'" name="codeName'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo"'
			+' value="" autocomplete="off"></td>'

			+'<td>'
			+'<input type="text" onkeyup="getcateenservices(this.id,'+rowCount+'),toCreateRow();"  id="subservice'+rowCount+'" name="subservice'+rowCount+'" '
			+'class="form-control input-SmallText typeheadCounterPo1" value="" autocomplete="off"></td>'



			+'<td>'
			+'<input type="text" id="charges'+rowCount+'" name="charges'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo" '
			+'autocomplete="off" value="0"></td>'



			+'<td>'
			+'<input type="text" onkeyup=" calculateAmt('+rowCount+');" id="textQty'+rowCount+'" name="textQty'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="1"></td>'
			

			+'<td>'
			+'<input type="text" id="textAmount'+rowCount+'" name="textAmount'+rowCount+'" tabindex="-1"'
			+' class="form-control input-SmallText # deleteGroup1 # textNo amtclass" readonly="readonly" value="0">'
				
			+'<input type="hidden" value="0" id="serviceid'+rowCount+'">'		
			+'<input type="hidden" value="0" id="subId'+rowCount+'">'		
			+'<input type="hidden" value="0" id="billdetailsid'+rowCount+'">'
						
			+'</td>'

			+'<td>'
			+'<input type="checkbox" class="" '
			+'name="deleteGroups" value="'+rowCount+'" id="deleteGroups'+rowCount+'"></td></tr>');
		
			
	}

	
	
}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For saving the canteen details 
 * **********/
function savecanteen(){
	//var rowcount= parseInt($("#rowcount" ).val());
	var rowcount = $('#ItemInfoTable >tbody >tr').length;
	var canteenId=$('#canteenIds').val();	

    var sn = $("#subservice" + rowcount).val();
	if (sn != "" && sn != undefined && sn != null) {
		if (canteenId > 0) {
			rowcount = rowcount + 1;
		}
	}
	
	var billId      =$('#billId').val();
	var patientId	=$('#patientId').val();
	var treatmentId =$('#treatmentId').val();
	
	var patientName	= $('#patientName').val();
	var count=$('#count').val();	
	var gstAmt=$('#gstamt').val();
	var gstper=parseFloat($('#gstper').val());
	var narration='s';
	
	var totalAMount	=$('#totalamount').val();
	var totalAMountgst	=$('#totalAMountgst').val();
	
	//new Fields 
	var ipdeffect='N';
	var id="ipdeffect";
	var checkbox = $('input:checkbox[id=' + id + ']');
	if (checkbox.is(':checked') == true) {
		ipdeffect='Y';
	}else{
		ipdeffect='N';
	}
	
	var paidamt = $('#paidamt').val();
	var paytype = $("input:radio[name='purTransType']:checked").val();

	var cardno = $('#cardno').val();
	var batchno = $('#batchno').val();
	var remainingamt=(totalAMountgst - paidamt);
	
	if (remainingamt == "" || remainingamt == null || remainingamt == undefined ) {
		remainingamt = 0;
	}
	if (cardno == "" || cardno == null || cardno == undefined ) {
		cardno = 0;
	}
	if (batchno == "" || batchno == null || batchno == undefined ) {
		batchno = 0;
	}
	
	if (paytype == "" || paytype == null || paytype == undefined ) {
		paytype = 1;
	}
	
	if (paidamt == "" || paidamt == null || paidamt == undefined ) {
		paidamt = 0;
	}
	if (ipdeffect == "" || ipdeffect == null || ipdeffect == undefined ) {
		ipdeffect = 'N';
	}
	
	if (patientName == "" || patientName == null || patientName == undefined ) {
		patientName = '-';
	}
	if (gstAmt == "" || gstAmt == null || gstAmt == undefined ) {
		gstAmt = 0;
	}
	if (totalAMount == "" || totalAMount == null || totalAMount == undefined ) {
		totalAMount = 0;
	}
	if (totalAMountgst == "" || totalAMountgst == null || totalAMountgst == undefined ) {
		totalAMountgst = 0;
	}
	if (canteenId == "" || canteenId == null || canteenId == undefined ) {
		canteenId = 0;
	}
	
	
	if (count == "" || count == null || count == undefined ) {
		count = 0;
	}
	
	var canteenmaster = {
			lstmaster : []
	};
	
	
	var ltCanteenSlave =[];
	
	var first =$("#subservice1").val();
	if (first == "" || first == null || first == undefined ) {
		alert("Please Insert Item Name For Save!");
		$("#subservice1").focus();
		return false;
	}
	for ( var i = 1; i < rowcount ; i++) {
		
		var canteenslaveId =$('#canteenslaveId'+i).val();
		
		var rate =$("#charges"+i).val();
		var quantity =$("#textQty"+i ).val();
		var amountslave =parseFloat($("#textAmount"+i ).val());
		var subserviceid =$("#subId"+i ).val();
		var serviceid =$("#serviceid"+i ).val();
		var subserviceName =$("#subservice"+i ).val();
		var billdetailsid =$("#billdetailsid"+i ).val();
		
		
		if (canteenslaveId == "" || canteenslaveId == null || canteenslaveId == undefined ) {
			canteenslaveId = 0;
		}
		
		if (subserviceid == "" || subserviceid == null || subserviceid == undefined ) {
			subserviceid = 0;
		}
		if (serviceid == "" || serviceid == null || serviceid == undefined ) {
			serviceid = 0;
		}
		
		if (billdetailsid == "" || billdetailsid == null || billdetailsid == undefined ) {
			billdetailsid = 0;
		}
		
		if (subserviceName == "" || subserviceName == null || subserviceName == undefined ) {
			alert("Please Insert Item Name !");
			$("#subservice"+i ).focus();
			return false;
		}
		
		
		if (quantity == "" || quantity == null || quantity == undefined || quantity == 0 ) {
			alert("Please Insert Qyt (Qyt must be one or greater ) !");
			$("#textQty"+i ).focus();
			return false;
		}
		
		if (rate == "" || rate == null || rate == undefined ) {
			alert("Please Insert Price !");
			$("#charges"+i ).focus();
			return false;
		}
		
		if (amountslave == "" || amountslave == null || amountslave == undefined ) {
			alert("Please Insert AMount !");
			$("#textAmount"+i ).focus();
			return false;
		}
		var gstamtSlave = parseFloat((amountslave * gstper)/100);
		var groseamountslave = parseFloat(gstamtSlave + amountslave);
		
		if (gstamtSlave == "" || gstamtSlave == null || gstamtSlave == undefined ) {
			gstamtSlave = 0.0;
		}
		
		if (groseamountslave == "" || groseamountslave == null || groseamountslave == undefined ) {
			groseamountslave = 0.0;
		}
		
		ltCanteenSlave.push({
			canteenslaveId : canteenslaveId,
			rate : rate,
			quantity: quantity,
			amountslave :amountslave,
			subserviceid : subserviceid,
			serviceid : serviceid,
			subserviceName : subserviceName,
			gstamtSlave    : gstamtSlave,
			groseamountslave : groseamountslave,
			billdetailsid : billdetailsid
		});
		
	}
	
	
	
	
	canteenmaster.lstmaster.push({
		canteenId :canteenId,
		billId    : billId,
		patientId : patientId,
		treatmentId : treatmentId,
		patientName : patientName,
		count       : count,
		gstAmt      :gstAmt,
		gstper      : gstper,
		narration   : narration,
		totalAMount : totalAMount,
		totalAMountgst : totalAMountgst,
		ipdeffect : ipdeffect,
		paidamt : paidamt,
		paytype : paytype,
		cardno   : cardno,
		batchno :batchno,
		remainingamt : remainingamt,
		
		ltCanteenSlave:ltCanteenSlave
	});

	
	
	canteenmaster = JSON.stringify(canteenmaster);

	var inputs = [];

	
	inputs.push('canteenmaster=' +  encodeURIComponent(canteenmaster));
	inputs.push('slavelist=' +  encodeURIComponent(canteenmaster));

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/save",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (canteenId == 0) {
				alert("Saved Successfully");
				printcanteen(r);
			}else if(canteenId > 0){
				alert("Updated Successfully");
				printcanteen(r);
			}
			
			window.location.reload(true);
			
		}
	});

}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For canteen print 
 * **********/
function printcanteen(canteenId){

	window.open("ehat_canteen_print.jsp?canteenId="+canteenId);
	
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For hidding div element 
 * **********/
function hideCanteenDiv(){
	getCanteenlist();
	$("#canteenList").show();
	
	$("#canteendetails").hide(1000);
	$("#canteenList").css({
		'height' : '500px',
		'width' : '100%',
		'overflow-y' : 'scroll',
		'max-height' : 'auto',
		'margin-left' : '0%',
		' margin-top' : '-9%'
	});
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For showing div element 
 * **********/
function showcanteenDiv() {
	
	$("#canteendetails").show(1000);
	$("#canteenList").hide();
	window.location.reload(true);
	
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting list of canteen 
 * **********/
function getCanteenlist(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getlist",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setCanteenlist(r);
			
		}
	});
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For setting template of canteen 
 * **********/
function setCanteenlist(res) {
	var result = '';

	for ( var i = 0; i < res.lstmaster.length; i++) {

		// var billId=res.lstmaster[i].billId;
		var canteenId = res.lstmaster[i].canteenId;
		var count = res.lstmaster[i].count;
		// var gstAmt =res.lstmaster[i].gstAmt;
		// var gstper =res.lstmaster[i].gstper;

		// var narration =res.lstmaster[i].narration;
		var patientName = res.lstmaster[i].patientName;
		// var patientId =res.lstmaster[i].patientId;
		// var totalAMount =res.lstmaster[i].totalAMount;

		var totalAMountgst = res.lstmaster[i].totalAMountgst;
		// var treatmentId =res.lstmaster[i].treatmentId;

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ count
				+ '</td> '
				+ '	<td>'
				+ patientName
				+ '</td> '
				+ '	<td>'
				+ totalAMountgst
				+ '</td> '

				+ '<td><button id="btnEdit" class="btn btn-xs btn-success" onclick="editcanteen('
				+ canteenId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'

				+ '<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="deletecanteen('
				+ canteenId
				+ ')" value="DELETE">'
				+ '<i class="fa fa-trash-o"></i></button></td>'

				

				+ '<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="printcanteen('
				+ canteenId + ')" value="">'
				+ '<i class="fa fa-print"></i></button></td>'

				+ '</tr> ';

	}

	$("#divcanteenList").html(result);
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For edit the canteen details  
 * **********/
function editcanteen(canteenId){
	
	
	//showcanteenDiv();
	$("#canteendetails").show(1000);
	$("#canteenList").hide();
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getlistbyId",
		data : {
			"canteenId"      : parseInt(canteenId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setCanteenonedit(r);
			
		}
	});

}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For delete the canteen details  
 * **********/
function deletecanteen(canteenId){
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/deletebyId",
		data : {
			"canteenId"      : parseInt(canteenId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			alert(r);
			window.location.reload(true);
		}
	});

}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For edit setting templates 
 * **********/
function setCanteenonedit(res) {
	var htm='';
	for ( var i = 0; i < res.lstmaster.length; i++) {

		//var billId = res.lstmaster[i].billId;
		var canteenId = res.lstmaster[i].canteenId;
		var count = res.lstmaster[i].count;
		var gstAmt = res.lstmaster[i].gstAmt;
		var gstper = res.lstmaster[i].gstper;

		//var narration = res.lstmaster[i].narration;
		var patientName = res.lstmaster[i].patientName;
		//var patientId = res.lstmaster[i].patientId;
		var totalAMount = res.lstmaster[i].totalAMount;

		var totalAMountgst = res.lstmaster[i].totalAMountgst;
		//var treatmentId = res.lstmaster[i].treatmentId;
		
		var paytype = res.lstmaster[i].paytype;
		var checkbox = $('input:checkbox[id=' + paytype + ']');
		$('#canteenIds').val(canteenId);
		$('#patientName').val(patientName);
		$('#count').val(count);
		$('#gstamt').val(gstAmt);
		$('#gstper').val(gstper);
		$('#totalamount').val(totalAMount);
	    $('#totalAMountgst').val(totalAMountgst);
	    $('#paidamt').val(totalAMountgst);	
	   // alert(paytype)
	    if(paytype == 2){
	    	//$("#paytype").attr("checked",true); 
	    	$("#rdoCash").prop('checked', false);
	    	$("#rdoCard").prop('checked', false);
	    	$("#rdoCashCredit").prop("checked",true); 
	    	
	    }else if(paytype ==3){
	    	//$('#rdoCard').is(':checked')
	    	$("#rdoCash").prop('checked', false);
	    	$("#rdoCashCredit").prop('checked', false);
	    	$("#rdoCard").prop("checked",true); 
	    }
	    else {
	    	$("#rdoCashCredit").prop('checked', false);
	    	$("#rdoCard").prop('checked', false);
			 $("#rdoCash").prop('checked', true); 
		}
	  
	    var rowCount=1;
	    for(var k=0;k<res.lstmaster[i].ltCanteenSlave.length;k++){
	    	var canteenslaveId=res.lstmaster[i].ltCanteenSlave[k].canteenslaveId;
	    	var amountslave=res.lstmaster[i].ltCanteenSlave[k].amountslave;
	    	var quantity=res.lstmaster[i].ltCanteenSlave[k].quantity;
	    	var rate=res.lstmaster[i].ltCanteenSlave[k].rate;
	    	var serviceid=res.lstmaster[i].ltCanteenSlave[k].serviceid;
	    	
	    	var subserviceName=res.lstmaster[i].ltCanteenSlave[k].subserviceName;
	    	var subserviceid=res.lstmaster[i].ltCanteenSlave[k].subserviceid;
	    	var billdetailsid=res.lstmaster[i].ltCanteenSlave[k].billdetailsid;
	    	
	    	htm =htm 
	    	+'<tr id="remove'+rowCount+'">'
			+'<td>'
			+'<input type="text" id="tableNo'+rowCount+'" name="tableNo'+rowCount+'" readonly="readonly" '
			+'class="form-control input-SmallText # deleteGroup1 # textNoDelete" value="1" maxlength="3">'
			+'<input type="hidden" id="canteenslaveId'+rowCount+'" value="'+canteenslaveId+'"></td>'
			
			+'<td>'
			+'<input type="text" id="codeName'+rowCount+'" name="codeName'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo"'
			+' value="'+subserviceName+'" autocomplete="off"></td>'

			+'<td>'
			+'<input type="text" onkeyup="getcateenservices(this.id),toCreateRow();" id="subservice'+rowCount+'" name="subservice'+rowCount+'" '
			+'class="form-control input-SmallText typeheadCounterPo1" value="'+subserviceName+'" autocomplete="off"></td>'



			+'<td>'
			+'<input type="text" id="charges'+rowCount+'" name="charges'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo" '
			+'autocomplete="off" value="'+rate+'"></td>'



			+'<td>'
			+'<input type="text" onkeyup=" calculateAmt('+rowCount+');" id="textQty'+rowCount+'" name="textQty'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+quantity+'"></td>'
			

			+'<td>'
			+'<input type="text" id="textAmount'+rowCount+'" name="textAmount'+rowCount+'" tabindex="-1"'
			+' class="form-control input-SmallText # deleteGroup1 # textNo amtclass" readonly="readonly" value="'+amountslave+'">'
				
			+'<input type="hidden" value="'+serviceid+'" id="serviceid'+rowCount+'">'		
			+'<input type="hidden" value="'+subserviceid+'" id="subId'+rowCount+'">'
			+'<input type="hidden" value="'+billdetailsid+'" id="billdetailsid'+rowCount+'">'
				
						
			+'</td>'

			+'<td>'
			+'<input type="checkbox" class="" '
			+'name="deleteGroups"  value="'+rowCount+'" id="deleteGroups'+rowCount+'"></td></tr>';
	    	//canteenslaveId1
	    	rowCount++;
	    }
	    
	    
	}
	
	$('#DRRDiv').html(htm);
	
}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For report of canteen details  
 * **********/
function getReportdata(){
	
	var from = $("#inputFromDate").val();
	var to = $("#inputToDate").val();
	var subId=0;
	if (from == "" || from == null || from == undefined || to == "" || to == null || to == undefined ) {
		alert("Please select from date and To date");
		return false;
	}
	
	var inputs = [];
	inputs.push('from=' + encodeURIComponent(from));
	inputs.push('to=' + encodeURIComponent(to));
	inputs.push('subId=' + encodeURIComponent(subId));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getlistbyforreport",
		
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setReportdata(r);
			
		}
	});
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :setting template of reports canteen 
 * **********/
function setReportdata(res){
	var result='';
	var finaltotal=0;
	var finaltotalwithgst=0;
	var finalGstAMt=0;
	var finalcgstamt=0;
	for ( var i = 0; i < res.lstmaster.length; i++) {

		// var billId=res.lstmaster[i].billId;
		//var canteenId = res.lstmaster[i].canteenId;
		var count = res.lstmaster[i].count;
		 var gstAmt =res.lstmaster[i].gstAmt;
		 var gstper =res.lstmaster[i].gstper;

		// var narration =res.lstmaster[i].narration;
		var patientName = res.lstmaster[i].patientName;
		// var patientId =res.lstmaster[i].patientId;
		var totalAMount =res.lstmaster[i].totalAMount;

		var totalAMountgst = res.lstmaster[i].totalAMountgst;
		// var treatmentId =res.lstmaster[i].treatmentId;

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ count
				+ '</td> '
				+ '	<td>'
				+ patientName
				+ '</td> '
				+ '	<td>'
				+ totalAMount
				+ '</td> '

				+ '	<td>'
				+ gstper
				+ '</td> '
				
				+ '	<td>'
				+ gstAmt
				+ '</td> '
				
				+ '	<td>'
				+ gstper/2
				+ '</td> '
				
				+ '	<td>'
				+ gstAmt/2
				+ '</td> '
				
				+ '	<td>'
				+ gstper/2
				+ '</td> '
				
				+ '	<td>'
				+ gstAmt/2
				+ '</td> '
				
				
				+ '	<td>'
				+ totalAMountgst
				+ '</td> '
				

				+ '</tr> ';

		finaltotal=finaltotal + totalAMount;
		finaltotalwithgst=finaltotalwithgst+totalAMountgst;
		finalGstAMt=finalGstAMt+gstAmt;
		finalcgstamt =finalcgstamt +(gstAmt/2);
	}
	result = result
	+ '<tr> '
	+'<td colspan="3">Total</td>'
	+'<td >'+finaltotal.toFixed(2)+'</td>'
	+'<td ></td>'
	+'<td >'+finalGstAMt.toFixed(2)+'</td>'
	
	
	+'<td ></td>'
	+'<td >'+finalcgstamt.toFixed(2)+'</td>'
	+'<td ></td>'
	+'<td >'+finalcgstamt.toFixed(2)+'</td>'
	
	
	+'<td >'+finaltotalwithgst.toFixed(2)+'</td>'
	+ '</tr>';
	$("#canteenDetails").html(result);
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :remove tr from positions  
 * **********/
function deleteRow(){
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroups']:checked"), function() {
			favorite.push($(this).val());

		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
			return false;
		}

		for ( var i = 0; i < favorite.length; i++) {

			if ($("#serviceid" + favorite[i]) != null
					&& $('#subId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				
				$("#remove" + favorite[i]).remove();
				
			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
		
		calculatTotal();
	}
	
}
/********
 * @author     :BILAL
 * @Date       :19-03-2018
 * @Code       :chane dine No for each table 
 * **********/
function changeDineNo(){
	var tableno= $('#tableno').val();
	
	var rowcount = $('#ItemInfoTable >tbody >tr').length;
	for ( var i = 1; i <= rowcount ; i++) {
		$("#tableNo"+i).val(tableno);
	}
}
/********
 * @author     :BILAL
 * @Date       :19-03-2018
 * @Code       :auto complete the canteen details 
 * **********/
function autosugetioncanteenList(inputId){
	var findingName = $("#" + inputId).val();
	
	if(findingName.length == 0){
		getCanteenlist();
		return false;
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getlistbyletter",
		
		success : function(r) {
			
			setCanteenlist(r);
			
		}
	});
}
/********
 * @author     :BILAL
 * @Date       :19-03-2018
 * @Code       :auto complete the canteen details 
 * **********/
function viewDiet(){
	
	var callForm = "onload";
   
	var inputs = [];
	inputs.push('callForm=' + callForm);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getDietDataByDate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setDiettext(r);
			
			fetchCustomizeDietTemplateList();
		}
	});
}

function setDiettext(res){

	if( res.lstDietMaster.length > 0){
	    $('#year_Pop_Up').modal('show');
	}else{
		alertify.success("No Diet Available !!");
		 //$('#year_Pop_Up').modal('show');
		return false;
	}
	var htm='';
	var temp='';
	for ( var i = 0; i < res.lstDietMaster.length; i++) {
		
		var dietId   = res.lstDietMaster[i].dietId;
		var deptid   = res.lstDietMaster[i].count;
		var dierdata = res.lstDietMaster[i].dierdata;
		/*$('#divTp').html(res.lstDietMaster[i].dierdata);
		var dierdata =$('#divTp').html();
		alert(dierdata);
		*/
		var billId   = res.lstDietMaster[i].billId;
		var treatmentId = res.lstDietMaster[i].treatmentId;
		var patientId = res.lstDietMaster[i].patientId;
		
		var selDocid = res.lstDietMaster[i].selDocid;
		var customizeTempid = res.lstDietMaster[i].customizeTempid;
		var tempName = res.lstDietMaster[i].tempName;
		var fromDate = res.lstDietMaster[i].from_date;
		var toDate = res.lstDietMaster[i].to_date;
		var patientName = res.lstDietMaster[i].patientName;
		
		var BedName = res.lstDietMaster[i].bedName;
		var HName = res.lstDietMaster[i].hname;
		
		htm = htm
		+  '<tr onclick="setTr('+dietId +')"> '
		+'<td><input name="row" id="rowId'+dietId+'" value="'+dietId+'" checked="true" autofocus="autofocus" type="radio"></td>'
		+ '	<td>'+(i+1)+'</td> '
		+ '	<td >'+patientName+'</td> '
		+ '	<td >'+patientId+'</td> '
		+ '	<td >'+BedName+'</td> '
		+ '	<td >'+HName+'</td> '
		+ '	<td >'+tempName+'</td> '
		+ '	<td >'+fromDate+'</td> '
		+ '	<td >'+toDate+'</td> '
		
		+'  <input type="hidden" id="patientId'+dietId+'" value="'+patientId+'">'
		+'  <input type="hidden" id="deptid'+dietId+'" value="'+deptid+'">'
		
		+'  <input type="hidden" id="billId'+dietId+'" value="'+billId+'">'
		
		
		+'  <input type="hidden" id="treatmentId'+dietId+'" value="'+treatmentId+'">'
		+'  <input type="hidden" id="selDocid'+dietId+'" value="'+selDocid+'">'
		+'  <input type="hidden" id="customizeTempid'+dietId+'" value="'+customizeTempid+'">'
		+'  <input type="hidden" id="tempName'+dietId+'" value="'+tempName+'">'
		
		+'  <input type="hidden" id="patientName'+dietId+'" value="'+patientName+'">'
		
		+'</tr>';
		temp = temp
		+'  <div style="display: none;" id="dierdata'+dietId+'" > '+dierdata+'</div>';
		
	}
	
	
	$('#yearData').html(htm);
	$('#divTp').html(temp);
}
function setTr(dietId){
	
	
	$('#year_Pop_Up').modal('hide');
	$('#HSTDiv').removeClass('panel body col-md-12 ');
	$('#HSTDiv').addClass('panel body col-md-6');
	
	$("#DietDiv").show();
	$('#dietData').html($("#dierdata"+dietId).html());
	
	$('#billId').val($("#billId"+dietId).val());
	$('#patientId').val($("#patientId"+dietId).val());
	$('#treatmentId').val($("#treatmentId"+dietId).val());
	
	$('#patientName').val($("#patientName"+dietId).val());
	$('#dietId').val(dietId);
}


function myFunction(value){
	if (value == 3) {
		$('#cardnodiv').show();
		$('#batchnodiv').show();
		$('#ipdeffect').prop('checked', false);
		
	}else if(value == 2){
		$('#cardnodiv').hide();
		$('#batchnodiv').hide();
		$('#paidamt').val(0);
		$('#ipdeffect').prop('checked','checked');
	}else{
		$('#cardnodiv').hide();
		$('#batchnodiv').hide();
		$('#ipdeffect').prop('checked', false);
	}
}

function setIpdeffect(){
	
	$("#rdoCashCredit").prop("checked", true);
	//$('#ipdeffect').prop('checked', false);
}


function setPatientWiseDietList(templateId) {
	
	var findingName = templateId;
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('fromDate=' + fromDate);
    inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/searchByTemplateName",
		
		success : function(r) {
			setlistTemplateMaster(r);
		}
	});
}


function setlistTemplateMaster(res){
	
	var htm='';
	var temp='';

	for ( var i = 0; i < res.lstDietMaster.length; i++) {

		var dietId   = res.lstDietMaster[i].dietId;
		var deptid   = res.lstDietMaster[i].count;
		var dierdata = res.lstDietMaster[i].dierdata;
		
		var billId   = res.lstDietMaster[i].billId;
		var treatmentId = res.lstDietMaster[i].treatmentId;
		var patientId = res.lstDietMaster[i].patientId;
		
		var selDocid = res.lstDietMaster[i].selDocid;
		var customizeTempid = res.lstDietMaster[i].customizeTempid;
		var tempName = res.lstDietMaster[i].tempName;
		var fromDate = res.lstDietMaster[i].from_date;
		var toDate = res.lstDietMaster[i].to_date;
		var patientName = res.lstDietMaster[i].patientName;
		
		var BedName = res.lstDietMaster[i].bedName;
		var HName = res.lstDietMaster[i].hname;
		
		htm = htm
		+  '<tr onclick="setTr('+dietId +')"> '
		+'<td><input name="row" id="rowId'+dietId+'" value="'+dietId+'" checked="true" autofocus="autofocus" type="radio"></td>'
		+ '	<td>'+(i+1)+'</td> '
		+ '	<td >'+patientName+'</td> '
		+ '	<td >'+patientId+'</td> '
		+ '	<td >'+BedName+'</td> '
		+ '	<td >'+HName+'</td> '
		+ '	<td >'+tempName+'</td> '
		+ '	<td >'+fromDate+'</td> '
		+ '	<td >'+toDate+'</td> '
		
		+'  <input type="hidden" id="patientId'+dietId+'" value="'+patientId+'">'
		+'  <input type="hidden" id="deptid'+dietId+'" value="'+deptid+'">'
		
		+'  <input type="hidden" id="billId'+dietId+'" value="'+billId+'">'
		
		
		+'  <input type="hidden" id="treatmentId'+dietId+'" value="'+treatmentId+'">'
		+'  <input type="hidden" id="selDocid'+dietId+'" value="'+selDocid+'">'
		+'  <input type="hidden" id="customizeTempid'+dietId+'" value="'+customizeTempid+'">'
		+'  <input type="hidden" id="tempName'+dietId+'" value="'+tempName+'">'
		
		+'  <input type="hidden" id="patientName'+dietId+'" value="'+patientName+'">'
		
		+'</tr>';
		temp = temp
		+'  <div style="display: none;" id="dierdata'+dietId+'" > '+dierdata+'</div>';
		
	}
	
	
	$('#yearData').html(htm);
	$('#divTp').html(temp);

}



function fetchCustomizeDietTemplateList() {
	
	var inputs = [];
	//inputs.push('action=fetchCustomizeTemplateList');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getcustomizelist",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var list = "";  
			list = list + "<option value='0'> -SELECT TEMPLATE- </option>";
			
		    for ( var i = 0; i < r.lts.length; i++) {  

		        list = list + "<option value='"+r.lts[i].idCustomizeTemplate+"' class='un'>" + (r.lts[i].temp_name) +"</option>";    
		    }  
		    
		    $("#selCustomizeTemp").html(list);
		    
			//ajaxResponse = r;

			/*$("#customizeTemplateDiv").html(encodeURIComponent(ajaxResponse));
			var obj = eval('(' + ajaxResponse + ')');
			$("#selCustomizeTemp").setTemplate(fetchCustomizeTemp);
			$("#selCustomizeTemp").processTemplate(obj); */
		}
	});
}

/*var fetchCustomizeTemp = "<option value='0' onclick=''>SELECT</option>"
	+ "{#foreach $T.pattemplist as pattemplist}"
	+ "<option onclick='setPatientWiseDietList({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>"
	+ "{#/for}";*/



function setDateWisePatientDietList() {
	var inputs = [];
	var txtFdate = $("#fromDate").val();
	var txtTdate = $("#toDate").val();
	var templateId = $("#selCustomizeTemp").val();
	
	inputs.push('fromdate=' + txtFdate);
	inputs.push('todate=' + txtTdate);
	inputs.push('templateId=' + templateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/searchByDateWiseDietList",
		
		success : function(r) {
			setlistTemplateMaster(r);
		}
	});
}


function printPatientWiseDietList(callFrom){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var templateId = $("#selCustomizeTemp").val();
	if(callFrom == "print"){
		if(templateId != 0 && fromDate != toDate){
			window.open("patient_wise_diet_list.jsp?fromDate=" + fromDate
					  + "&toDate=" + toDate + "&templateId=" + templateId);
		}else if(templateId == 0 || fromDate != toDate){
			window.open("patient_wise_diet_list.jsp?fromDate=" + fromDate
					  + "&toDate=" + toDate +"&templateId=" + templateId);
		}else{
			window.open("patient_wise_diet_list.jsp?templateId=" + templateId);
		}
		
	}else{
		if(templateId != 0 && fromDate != toDate){
			window.open("patient_wise_diet_sticker_list.jsp?fromDate=" + fromDate
					  + "&toDate=" + toDate + "&templateId=" + templateId);
		}else if(templateId == 0 || fromDate != toDate){
			window.open("patient_wise_diet_sticker_list.jsp?fromDate=" + fromDate
					  + "&toDate=" + toDate +"&templateId=" + templateId);
		}else{
			window.open("patient_wise_diet_sticker_list.jsp?templateId=" + templateId);
		}
		
		/*window.open("patient_wise_diet_sticker_list.jsp?fromDate=" + fromDate
				  + "&toDate=" + toDate + "&templateId=" + templateId);*/
	}
	
	
}