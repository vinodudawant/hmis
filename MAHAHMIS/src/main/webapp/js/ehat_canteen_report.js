/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For auto patient name 
 * **********/
function autosuggetionCustomer(inputId) {

	var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('findingName=' + findingName);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getcustomerlist",
		
		success : function(r) {
			
			setcateenslave(r,inputId);
			
		}
	});
} 
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting item by services name  
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
			
			setcateenservices(r,inputId);
			
		}
	});
} 
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For setting list of CANTEEN services 
 * **********/
function setcateenservices(response,id,currrentrow) {
    
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
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
						$('#'+id).val(ui.item.categoryName);
						
						var subId =ui.item.subId;
						
						$("#subId").val(subId);
						
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
						
					} else {
						result = data.lstSubService;
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
					
				}
			});
}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting item report   
 * **********/
function getReportitemdata(){
	
	var from = $("#inputFromDate").val();
	var to = $("#inputToDate").val();
	var subId = $("#subId").val();
	
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
			
			setReportItemdata(r);
			
		}
	});

}
/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For setting item report   
 * **********/
function setReportItemdata(res){

	var htm='';
	var finaltotal=0.0;
	var finalgstamt=0.0;
	var finaltotalAMountgst=0.0;
	var index=1;
	for ( var i = 0; i < res.lstmaster.length; i++) {

		//var billId = res.lstmaster[i].billId;
		//var canteenId = res.lstmaster[i].canteenId;
		
		var gstAmt = res.lstmaster[i].gstAmt;
		//var gstper = res.lstmaster[i].gstper;

		//var narration = res.lstmaster[i].narration;
		//var patientName = res.lstmaster[i].patientName;
		//var patientId = res.lstmaster[i].patientId;
		

		var totalAMountgst = res.lstmaster[i].totalAMountgst;
		var totalAMount = res.lstmaster[i].totalAMount;
		var tokenNo = res.lstmaster[i].tokenNo;
		var count = res.lstmaster[i].count;
		
		finaltotal = finaltotal+totalAMount;
		finalgstamt=finalgstamt + gstAmt;
		finaltotalAMountgst=finaltotalAMountgst + totalAMountgst;
	    
	    for(var k=0;k<res.lstmaster[i].ltCanteenSlave.length;k++){
	    	
	    	var amountslave=res.lstmaster[i].ltCanteenSlave[k].amountslave;
	    	var quantity=res.lstmaster[i].ltCanteenSlave[k].quantity;
	    	var rate=res.lstmaster[i].ltCanteenSlave[k].rate;
	    	var subserviceName=res.lstmaster[i].ltCanteenSlave[k].subserviceName;
	    	var gstamtSlave=res.lstmaster[i].ltCanteenSlave[k].gstamtSlave;
	    	var groseamountslave=res.lstmaster[i].ltCanteenSlave[k].groseamountslave;
	    	
	    	
	    	htm =htm 
	    	+'<tr>'
	    	
	    	+'<td>'+index+'</td>'
	    	+'<td>'+count+'</td>'
	    	+'<td>T- '+tokenNo+'</td>'
	    	+'<td>'+subserviceName+'</td>'
	    	+'<td>'+rate+'</td>'
	    	+'<td>'+quantity+'</td>'
	    	
	    	+'<td>'+amountslave+'</td>'
	    	
	    	+'<td>'+gstamtSlave+'</td>'
	    	+'<td>'+groseamountslave+'</td>'
	    	
			+'</tr>';
	    	
	    	index++;
	    	
	    }
	    
	    
	}
	
	htm = htm
	+ '<tr> '
	+'<td colspan="6">Total</td>'
	+'<td >'+finaltotal.toFixed(2)+'</td>'
	+'<td >'+finalgstamt.toFixed(2)+'</td>'
	+'<td >'+finaltotalAMountgst.toFixed(2)+'</td>'
	
	+ '</tr>';
	$('#canteenslaveDetails').html(htm);
	

}



/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For getting item report   
 * **********/
function getReportitemdataforPurchase(){
	
	var from = $("#inputFromDate").val();
	var to = $("#inputToDate").val();
	var subId = $("#subId").val();
	
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
			
			setPurchaseReportItemdata(r);
			
		}
	});

}

/********
 * @author     :BILAL
 * @Date       :17-03-2018
 * @Code       :For setting item report   
 * **********/
function setPurchaseReportItemdata(res){

	var htm='';
	var finaltotal=0.0;
	var finalgstamt=0.0;
	var finaltotalAMountgst=0.0;
	var index =1;
	
	for ( var i = 0; i < res.lstmaster.length; i++) {

		//var billId = res.lstmaster[i].billId;
		//var canteenId = res.lstmaster[i].canteenId;
		
		var gstAmt = res.lstmaster[i].gstAmt;
		//var gstper = res.lstmaster[i].gstper;

		//var narration = res.lstmaster[i].narration;
		//var patientName = res.lstmaster[i].patientName;
		//var patientId = res.lstmaster[i].patientId;
		

		var totalAMountgst = res.lstmaster[i].totalAMountgst;
		var totalAMount = res.lstmaster[i].totalAMount;
		var tokenNo = res.lstmaster[i].tokenNo;
		var count = res.lstmaster[i].count;
		var refBillNo = res.lstmaster[i].refBillNo;
		var purchId = res.lstmaster[i].purchId;	
		
		finaltotal = finaltotal+totalAMount;
		finalgstamt=finalgstamt + gstAmt;
		finaltotalAMountgst=finaltotalAMountgst + totalAMountgst;
		
	    
	    for(var k=0;k<res.lstmaster[i].ltCanteenSlave.length;k++){
	    	
	    	var amountslave=res.lstmaster[i].ltCanteenSlave[k].amountslave;
	    	var quantity=res.lstmaster[i].ltCanteenSlave[k].quantity;
	    	var rate=res.lstmaster[i].ltCanteenSlave[k].rate;
	    	var itemName=res.lstmaster[i].ltCanteenSlave[k].itemName;
	    	var gstamtSlave=res.lstmaster[i].ltCanteenSlave[k].gstamtSlave;
	    	var groseamountslave=res.lstmaster[i].ltCanteenSlave[k].groseamountslave;
	    	
	    	
	    	htm =htm 
	    	+'<tr>'
	    	
	    	+'<td>'+index+'</td>'
	    	+'<td>'+purchId+'</td>'
	    	
	    	+'<td>'+itemName+'</td>'
	    	+'<td>'+rate+'</td>'
	    	+'<td>'+quantity+'</td>'
	    	
	    	+'<td>'+amountslave+'</td>'
	    	
	    	+'<td>'+gstamtSlave+'</td>'
	    	+'<td>'+groseamountslave+'</td>'
	    	
			+'</tr>';
	    	
	    	
	    	index++;
	    	
	    }
	    
	    
	}
	
	htm = htm
	+ '<tr> '
	+'<td colspan="5">Total</td>'
	+'<td >'+finaltotal.toFixed(2)+'</td>'
	+'<td >'+finalgstamt.toFixed(2)+'</td>'
	+'<td >'+finaltotalAMountgst.toFixed(2)+'</td>'
	
	+ '</tr>';
	$('#canteenslaveDetails').html(htm);
	

}



function getDailyDietReportdata(){
	
	var from = $("#inputFromDate").val();
	var to = $("#inputToDate").val();
	
	if (from == "" || from == null || from == undefined || to == "" || to == null || to == undefined ) {
		alert("Please select from date and To date");
		return false;
	}
	
	var inputs = [];
	inputs.push('from=' + encodeURIComponent(from));
	inputs.push('to=' + encodeURIComponent(to));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/canteen/getDailyDietReportdata",
		
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			
			setDailyDirtReportdata(r);
			
		}
	});

}


function setDailyDirtReportdata(res){

	var htm='';
	
	var index=1;
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
		var fromDate = res.lstDietMaster[i].fromDate;
		var toDate = res.lstDietMaster[i].toDate;
		var patientName = res.lstDietMaster[i].patientName;
		
		var BedName = res.lstDietMaster[i].bedName;
		var HName = res.lstDietMaster[i].hname;
	    	
	    	htm =htm 
	    	+'<tr>'
	    	
	    	+'<td>'+index+'</td>'
	    	+'<td>'+patientName+'</td>'
	    	+'<td>'+patientId+'</td>'
	    	+'<td>'+BedName+'</td>'
	    	+'<td>'+HName+'</td>'
	    	+'<td>'+tempName+'</td>'
	    	+'<td>'+fromDate+'</td>'
	    	+'<td>'+toDate+'</td>'
	    	+'</tr>';
	    	
	    	index++;
	}
	
	$('#dailyDietDetails').html(htm);
	

}
