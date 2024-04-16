/********
 * @author     :BILAL
 * @Date       :04-04-2018
 * @Code       :For getting list of Purchase item 
 * **********/
function getbyleter(inputId,currrentrow) {

	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getbyleter",
		
		success : function(r) {
			
			setbyleter(r,inputId,currrentrow);
			
		}
	});
} 
/********
 * @author     :BILAL
 * @Date       :04-04-2018
 * @Code       :For setting list of Purchase item 
 * **********/
function setbyleter(response,id,currrentrow) {
    
	$("#currentrowcount" ).val(currrentrow);
	var rowcount= currrentrow;
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
					name : 'itemName',
					width : '150px',
					valueField : 'itemName'
				},{
					name : 'purId',
					width : '100px',
					valueField : 'purId'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
						$('#'+id).val(ui.item.itemName);
						
						var purId =ui.item.purId;
						var selfId =ui.item.selfId;
						
						$("#selfId"+rowcount ).val(selfId);
						$("#itemid"+rowcount ).val(purId);
						
						$('#uom' + rowcount).focus();
						
						calculateAmt(rowcount);
					
					return false;
					
				},

				
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					
					var result;
					if (!data || data.lstmaster.length === 0 || !data.lstmaster
							|| data.lstmaster.length === 0) {
						
						result = [ {
							
							'itemName' : 'NO',
							'' : 'Match',
							
						} ];
						//toCreateRow();
					} else {
						result = data.lstmaster;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
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
	
	var rc = $('#ItemInfoTable >tbody >tr').length;
	
	var sn = $("#itemName"+rc).val();
	if(sn!="" && sn!=undefined && sn !=null){
		
		var rowCount= rc + 1;
		
		//onblur="getcateenservicesbycodes(this.id,'+rowCount+');"
		$("#rowcount" ).val(rowCount);
		
			
			 $('#DRRDiv').append('<tr id="remove'+rowCount+'">'
			+'<td>'
			+ rowCount
			+'<input type="hidden" id="purslaveId'+rowCount+'" value="0">'
			+'<input type="hidden" id="itemid'+rowCount+'" value="0">'
			
			+'</td>'
			
			+'<td>'
			+'<input type="text" onkeyup="getbyleter(this.id,'+rowCount+'),toCreateRow();"  id="itemName'+rowCount+'" name="itemName'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo"'
			+' value="" autocomplete="off"></td>'

			+'<td>'
			+'<input type="text"   id="uom'+rowCount+'" name="uom'+rowCount+'" '
			+'class="form-control input-SmallText typeheadCounterPo1" value="0" autocomplete="off"></td>'



			+'<td>'
			+'<input type="text" id="charges'+rowCount+'" name="charges'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo" '
			+'autocomplete="off" value="0"></td>'



			+'<td>'
			+'<input type="text" onkeyup=" calculateAmt('+rowCount+');" id="textQty'+rowCount+'" name="textQty'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="1"></td>'
			

			+'<td>'
			+'<input type="text" id="textAmount'+rowCount+'" name="textAmount'+rowCount+'" tabindex="-1"'
			+' class="form-control input-SmallText # deleteGroup1 # textNo amtclass" readonly="readonly" value="0">'
				
								
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
function savecanteenpur(){
	
	var rowcount = $('#ItemInfoTable >tbody >tr').length;
	var purchId  =$('#purchId').val();	

    var sn = $("#itemName" + rowcount).val();
	if (sn != "" && sn != undefined && sn != null) {
		if (purchId > 0) {
			rowcount = rowcount + 1;
		}
	}
	
	var purchaseBy	= $('#purchaseBy').val();
	if (purchaseBy == "" && purchaseBy == undefined && purchaseBy == null) {
		alert("Please Insert The buyer name !!");
		 $('#purchaseBy').focus();
		return false;
	}
	var description =$('#description').val();	
	var billNo     =$('#billNo').val();
	
	var gstAmt          =$('#gstamt').val();
	var gstper          =parseFloat($('#gstper').val());
	var totalAMount	    =$('#totalamount').val();
	var totalAMountgst	=$('#totalAMountgst').val();
	var paidamt          = $('#paidamt').val();
	var paytype          = $("input:radio[name='purTransTypess']:checked").val();
	var cardno           = $('#cardno').val();
	var batchno          = $('#batchno').val();
	var remainingamt     =(totalAMountgst - paidamt);
	
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
	
	if (gstAmt == "" || gstAmt == null || gstAmt == undefined ) {
		gstAmt = 0;
	}
	if (totalAMount == "" || totalAMount == null || totalAMount == undefined ) {
		totalAMount = 0;
	}
	if (totalAMountgst == "" || totalAMountgst == null || totalAMountgst == undefined ) {
		totalAMountgst = 0;
	}
	if (purchId == "" || purchId == null || purchId == undefined ) {
		purchId = 0;
	}
	
	var canteenmaster = {
			lstmaster : []
	};
	
	
	var ltCanteenSlave =[];
	
	var first =$("#itemName1").val();
	if (first == "" || first == null || first == undefined ) {
		alert("Please Insert Item Name For Save!");
		$("#itemName1").focus();
		return false;
	}
	for ( var i = 1; i < rowcount ; i++) {
		
		var purslaveId    =$('#purslaveId'+i).val();
		var itemid		  =$('#itemid'+i).val();
		var rate          =$("#charges"+i).val();
		var quantity      =$("#textQty"+i ).val();
		var amountslave   =parseFloat($("#textAmount"+i ).val());
		var itemName      =$("#itemName"+i ).val();
		var uom           =$("#uom"+i ).val();
		
		if (itemid == "" || itemid == null || itemid == undefined ) {
			itemid = 0;
		}
		
		if (itemName == "" || itemName == null || itemName == undefined ) {
			alert("Please Insert Item Name !");
			$("#itemName"+i ).focus();
			return false;
		}
		if (uom == "" || uom == null || uom == undefined ) {
			alert("Please Insert Unit of Magarment !");
			$("#uom"+i ).focus();
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
		var gstamtSlave      = parseFloat((amountslave * gstper)/100);
		var groseamountslave = parseFloat(gstamtSlave + amountslave);
		
		if (gstamtSlave == "" || gstamtSlave == null || gstamtSlave == undefined ) {
			gstamtSlave = 0.0;
		}
		
		if (groseamountslave == "" || groseamountslave == null || groseamountslave == undefined ) {
			groseamountslave = 0.0;
		}
		if (purslaveId == "" || purslaveId == null || purslaveId == undefined ) {
			purslaveId = 0;
		}
		
		ltCanteenSlave.push({
			purslaveId : purslaveId,
			rate : rate,
			quantity: quantity,
			amountslave :amountslave,
			itemid : itemid,
			itemName : itemName,
			gstamtSlave    : gstamtSlave,
			groseamountslave : groseamountslave,
			uom      : uom
		});
		
	}
	
	canteenmaster.lstmaster.push({
		
		purchId : purchId,
		purchaseby : purchaseBy,
		description : description,
		refBillNo : billNo,
		gstAmt : gstAmt,
		gstper : gstper,
		totalAMount : totalAMount,
		totalAMountgst : totalAMountgst,
		paidamt : paidamt,
		paytype : paytype,
		cardno : cardno,
		batchno : batchno,
		remainingamt : remainingamt,
		
		ltCanteenSlave : ltCanteenSlave
	});

	
	
	canteenmaster = JSON.stringify(canteenmaster);

	var inputs = [];
	inputs.push('canteenmaster=' +  encodeURIComponent(canteenmaster));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/savepur",
		error : function() {
			alert('error');
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
 * @Code       :For hidding div element 
 * **********/
function hideCanteenDiv(){
	getCanteenpurlist();
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
function getCanteenpurlist(){
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getpurlist",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setCanteenpurlist(r);
			
		}
	});
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For setting template of canteen 
 * **********/
function setCanteenpurlist(res) {
	var result = '';

	for ( var i = 0; i < res.lstmaster.length; i++) {

		var refBillNo=res.lstmaster[i].refBillNo;
		var purchId = res.lstmaster[i].purchId;
		var purchId = res.lstmaster[i].purchId;	
		var purchaseby = res.lstmaster[i].purchaseby;
		var totalAMountgst = res.lstmaster[i].totalAMountgst;
	

		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ purchId
				+ '</td> '
				
				+ '	<td>'
				+ refBillNo
				+ '</td> '
				
				+ '	<td>'
				+ purchaseby
				+ '</td> '
				+ '	<td>'
				+ totalAMountgst
				+ '</td> '

				+ '<td><button id="btnEdit" class="btn btn-xs btn-success" onclick="editcanteenpur('
				+ purchId
				+ ')" value="EDIT">'
				+ '<i class="fa fa-edit"></i></button></td>'

				+ '<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="deletecanteenpur('
				+ purchId
				+ ')" value="DELETE">'
				+ '<i class="fa fa-trash-o"></i></button></td>'
				
				
				+ '<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="printcanteenpur('
				+ purchId
				+ ')" value="DELETE">'
				+ '<i class="fa fa-print"></i></button></td>'

				

				+ '</tr> ';

	}

	$("#divcanteenList").html(result);
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For delete the canteen details  
 * **********/
function deletecanteenpur(purId){
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/deletepurbyId",
		data : {
			"purId"      : parseInt(purId)
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
 * @Code       :For edit the canteen details  
 * **********/
function editcanteenpur(purchId){
	
	
	//showcanteenDiv();
	$("#canteendetails").show(1000);
	$("#canteenList").hide();
	
 	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getpurlistbyId",
		data : {
			"purchId"      : parseInt(purchId)
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			seteditcanteenpur(r);
			
		}
	});

}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For edit setting templates 
 * **********/
function seteditcanteenpur(res) {
	var htm='';
	for ( var i = 0; i < res.lstmaster.length; i++) {
		
		var refBillNo=res.lstmaster[i].refBillNo;
		var purchId = res.lstmaster[i].purchId;
		//var count = res.lstmaster[i].count;	
		var purchaseby = res.lstmaster[i].purchaseby;
		
		var gstAmt = res.lstmaster[i].gstAmt;
		var gstper = res.lstmaster[i].gstper;

		var description = res.lstmaster[i].description;
		var totalAMount = res.lstmaster[i].totalAMount;
		var totalAMountgst = res.lstmaster[i].totalAMountgst;

		$('#purchId').val(purchId);
		$('#purchaseBy').val(purchaseby);
		$('#billNo').val(refBillNo);
		$('#description').val(description);
		
		$('#gstamt').val(gstAmt);
		$('#gstper').val(gstper);
		$('#totalamount').val(totalAMount);
	    $('#totalAMountgst').val(totalAMountgst);
	    
	    var rowCount=1;
	    for(var k=0;k<res.lstmaster[i].ltCanteenSlave.length;k++){
	    	
	    	var purslaveId  =res.lstmaster[i].ltCanteenSlave[k].purslaveId;
	    	var amountslave =res.lstmaster[i].ltCanteenSlave[k].amountslave;
	    	var quantity    =res.lstmaster[i].ltCanteenSlave[k].quantity;
	    	var rate        =res.lstmaster[i].ltCanteenSlave[k].rate;
	    	var itemid      =res.lstmaster[i].ltCanteenSlave[k].itemid;
	    	var itemName   =res.lstmaster[i].ltCanteenSlave[k].itemName;
	    	var uom        =res.lstmaster[i].ltCanteenSlave[k].uom;
	    	
	    	htm =htm 
	    	+'<tr id="remove'+rowCount+'">'
			+'<td>'
			+rowCount
			+'<input type="hidden" id="purslaveId'+rowCount+'" value="'+purslaveId+'">'
			+'<input type="hidden" id="itemid'+rowCount+'" value="'+itemid+'">'
			+'</td>'
			
			+'<td>'
			+'<input type="text" onkeyup="getbyleter(this.id,'+rowCount+'),toCreateRow();" id="itemName'+rowCount+'" name="itemName'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo"'
			+' value="'+itemName+'" autocomplete="off"></td>'

			+'<td>'
			+'<input type="text"  id="uom'+rowCount+'" name="uom'+rowCount+'" '
			+'class="form-control input-SmallText typeheadCounterPo1" value="'+uom+'" autocomplete="off"></td>'



			+'<td>'
			+'<input type="text" id="charges'+rowCount+'" name="charges'+rowCount+'" class="form-control input-SmallText # deleteGroup1 # textNo" '
			+'autocomplete="off" value="'+rate+'"></td>'



			+'<td>'
			+'<input type="text" onkeyup=" calculateAmt('+rowCount+');" id="textQty'+rowCount+'" name="textQty'+rowCount+'" '
			+'class="form-control input-SmallText # deleteGroup1 # textNo" autocomplete="off" value="'+quantity+'"></td>'
			

			+'<td>'
			+'<input type="text" id="textAmount'+rowCount+'" name="textAmount'+rowCount+'" tabindex="-1"'
			+' class="form-control input-SmallText # deleteGroup1 # textNo amtclass" readonly="readonly" value="'+amountslave+'">'
				
						
			+'</td>'
			+'<td>'
			+'<input type="checkbox" class="" '
			+'name="deleteGroups"  value="'+rowCount+'" id="deleteGroups'+rowCount+'"></td></tr>';
	    	
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
		getCanteenpurlist();
		return false;
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getlistbyletterPur",
		
		success : function(r) {
			
			setCanteenpurlist(r);
			
		}
	});
}
/********
 * @author     :BILAL
 * @Date       :19-03-2018
 * @Code       :auto complete the canteen details 
 * **********/
function viewDiet(){
	
	
	var inputs = [];
	
	
	
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
		}
	});
}

function setDiettext(res){

	if( res.lstDietMaster.length > 0){
	    $('#year_Pop_Up').modal('show');
	}else{
		alertify.success("No Diet Available !!");
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
		var fromDate = res.lstDietMaster[i].fromDate;
		var toDate = res.lstDietMaster[i].toDate;
		var patientName = res.lstDietMaster[i].patientName;
		
		htm = htm
		+  '<tr onclick="setTr('+dietId +')"> '
		+'<td><input name="row" id="rowId'+dietId+'" value="'+dietId+'" checked="true" autofocus="autofocus" type="radio"></td>'
		+ '	<td>'+(i+1)+'</td> '
		+ '	<td >'+patientName+'</td> '
		+ '	<td >'+patientId+'</td> '
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



/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For report of canteen details  
 * **********/
function getPurchaseReportdata(){
	
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
		url : "ehat/canteen/getlistforpurchasereport",
		
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setPurchaseReportdata(r);
			
		}
	});
}





/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :setting template of reports canteen 
 * **********/
function setPurchaseReportdata(res){
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
		var purchaseby = res.lstmaster[i].purchaseby;
		// var patientId =res.lstmaster[i].patientId;
		var totalAMount =res.lstmaster[i].totalAMount;

		var totalAMountgst = res.lstmaster[i].totalAMountgst;
		// var treatmentId =res.lstmaster[i].treatmentId;
		var purchId = res.lstmaster[i].purchId;
		result = result
				+ '<tr> '
				+ '	<td>'
				+ (i + 1)
				+ '</td> '
				+ '	<td>'
				+ purchId
				+ '</td> '
				+ '	<td>'
				+ purchaseby
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
 * @Code       :For canteen print 
 * **********/
function printcanteenpur(purId){

	window.open("ehat_canteen_pur_print.jsp?canteenId="+purId);
	
}