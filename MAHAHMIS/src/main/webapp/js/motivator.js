/***********
 * @author	: Touheed Khan
 * @date	: 01-Aug-2016
 * @reason	: Template for motivato vouchar Ui
 **********/
var motivatorRowCount = 1;
var tableMotivatorTemplate =  "{#foreach $T.listmopaydet as li}<tr>"
	+ "<td class='col-md-1 center'><div id='rowcount{$T.li.idmotipaydt}' class='TextFont'>{motivatorRowCount}</div></td>"
	+ "<td class='col-md-1'> <div class='TextFont' id='bilrepid{$T.li.idmotipaydt}'>{$T.li.bilrepid}</div></td>"
	+ "<td class='col-md-1'> <div class='TextFont' id='bilcomid{$T.li.idmotipaydt}'>{$T.li.bilcomid}</div></td>"
	+ "<td class='col-md-3'> <div class='TextFont' id='tname{$T.li.idmotipaydt}'>{$T.li.tname}</div></td>"
	+ "<td class='col-md-1 center'> <div class='TextFont' id='tpaidamt{$T.li.idmotipaydt}'>{$T.li.tpaidamt}</div></td>"
	+ "<td class='col-md-1 center'> <div class='TextFont' id='disontest{$T.li.idmotipaydt}'>{$T.li.disontest}</div></td>"
	+ "<td class='col-md-1 center'> <div class='TextFont' id='motpaidamt{$T.li.idmotipaydt}'>{$T.li.motpaidamt}</div></td>"
	+ "<td class='col-md-1 center'> <div class='TextFont' id='motunpaidamt{$T.li.idmotipaydt}'>{$T.li.motunpaidamt}</div></td>"
	+ "<td class='col-md-1'> <div class='TextFont'><input id='chk{$T.li.idmotipaydt}' type='radio' value='{$T.li.idmotipaydt}' name='motivatorVocharChk' onclick='sendToVoucharList({$T.li.idmotipaydt},{$T.li.tpaidamt},{$T.li.bilcomid},{motivatorRowCount})' style='cursor: pointer;'></div></td>"
	+ "<input id='bilrecpstatus{$T.li.idmotipaydt}' type='hidden' value='{$T.li.bilrecpstatus}'>"
	+ "<input id='motactcut{$T.li.idmotipaydt}' type='hidden' value='{$T.li.motactcut}'>"
	+ "<input id='tactrate{$T.li.idmotipaydt}' type='hidden' value='{$T.li.tactrate}'>"
	+ "<input id='tqty{$T.li.idmotipaydt}' type='hidden' value='{$T.li.tqty}'>"
	+ "{motivatorRowCount++}</tr>{#/for}";		

/***********
 * @author	: Touheed Khan
 * @date	: 01-Aug-2016
 * @reason	: Fetching list of Test related to group id of selected doctor
 **********/
function fetchTestRelatedtToDoctorAndGroupId(callFrom){
	var txtDoctorId			= $("#txtDoctorId").val();
	var txtSelectService	= $("#txtSelectService").val();
	
	var inputs = [];
	inputs.push('action=fetchTestRelatedtToDoctorAndGroupId');
	inputs.push('doctorId='+txtDoctorId);
	inputs.push('groupId='+txtSelectService);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			var data = eval('(' +r + ')');
			if(callFrom == "motivator"){	
				motivatorRowCount = 1;
				$("#tableTestDash").setTemplate(tableMotivatorTemplate);
				$("#tableTestDash").processTemplate(data);
			}
		}
	});
}

/***********
 * @author	: Touheed Khan
 * @date	: 01-Aug-2016
 * @reason	: Adding Reduction value to voucher list
 **********/
function sendToVoucharList(motivatorPayDetId,paidamount,compid,rowcount){
	$("#txtComponentNo").val(compid);
	$("#txtAmount").val(paidamount);
	$("#motivatorPayDetId").val(motivatorPayDetId);
}

/***********
 * @author	: Touheed Khan
 * @date	: 02-Aug-2016
 * @reason	: Adding Row in voucher lis voucher list
 **********/
function addRowToVoucharList(){
	
	//counting is there any record to add
	var rowsTableTestDash = $('#tableTestDash tr').length;
	if(rowsTableTestDash == undefined || rowsTableTestDash==0 ){
		alert("There is no record to add in Voucher List!");
		return false;
	}
	//Initializing following variables
	var motivatorPayDetId	= $("#motivatorPayDetId").val();
	var bilrepid			= parseInt($("#bilrepid"+motivatorPayDetId).text());
	var bilcomid 			= parseInt($("#bilcomid"+motivatorPayDetId).text());
	var tname				= $("#tname"+motivatorPayDetId).text();
	var tpaidamt			= parseInt($("#tpaidamt"+motivatorPayDetId).text());
	var disontest			= parseInt($("#disontest"+motivatorPayDetId).text()); 
	var motpaidamt			= parseInt($("#motpaidamt"+motivatorPayDetId).text());
	var motunpaidamt		= parseInt($("#motunpaidamt"+motivatorPayDetId).text());
	var bilrecpstatus		= parseInt($("#bilrecpstatus"+motivatorPayDetId).val());
	var motactcut			= parseInt($("#motactcut"+motivatorPayDetId).val());
	var tactrate			= parseInt($("#tactrate"+motivatorPayDetId).val());
	var tqty				= parseInt($("#tqty"+motivatorPayDetId).val());
	var reduction			= parseInt($("#txtReduction").val());
	
	if(isNaN(reduction)){//if reduction NaN then make it as zero
		reduction=0;
	}else if(reduction<0){//if reduction is less then zero, make it as zero
		reduction=0;
	}
	
	if(reduction > motunpaidamt){//if reduction greater then Motivator unpaid Amount
		alert("Reduction amount Should be Less Or Equal to Motivator Unpaid Amount!");
		SetFocus("txtReduction");
		return false;
	}

	var motivatorPayable	= motunpaidamt -reduction; //motivator business logic, if reduction is given, then amount will less from motivator charges
	if (motivatorPayable<0) {//if motivator payable is less then zero then it shoud be zero
		motivatorPayable=0;
	}
	
	var tableTestVoucharListCount = $('#tableTestVoucharList tr').length;//voucharlist count
	var checkedOrNot  = $('#chk' + motivatorPayDetId).is(":checked"); //is check box is checked
	var isthererow 		= $("#isthererow"+motivatorPayDetId).val();
	if (checkedOrNot == false) { // validating comming record is check or not
		alert("Please check any Radio Button To add in Voucher list.!");
		return flase;
	}
		
		if(isthererow == undefined ){	//if aleardy avlaiable then not add row (if udefined then insert, if given any number then don't insert)
			 $('#tableTestVoucharList').append(
						  '<tr>'  
						+ '<td class="col-md-1 center"><div id="rowcount'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(tableTestVoucharListCount+1)+'</div></td>'
						+ '<td class="col-md-1 center"><div id="bilcomid'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(bilcomid)+'</div></td>'
						+ '<td class="col-md-1 center"><div id="tactrate'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(tactrate)+'</div> </td>'
						+ '<td class="col-md-1 center"><div id="motactcut'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(motactcut)+'</div></td>'
						+ '<td class="col-md-1 center"><div id="tpaidamt'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(tpaidamt)+'</div> </td>'
						+ '<td class="col-md-1 center"> <div id="disontest'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(disontest)+'</div> </td>'
						+ '<td class="col-md-1 center"><div id="reduction'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(reduction)+'</div></td>'
						+ '<td class="col-md-1 center"><div id="motivatorPayable'+(tableTestVoucharListCount+1)+'" class="TextFont">'+(motivatorPayable)+'</div></td>'
						+ '<input id="isthererow'+(motivatorPayDetId)+'" type="hidden" value="'+(motivatorPayDetId)+'">'
						+ '<input id="motivatorPayDetId'+(tableTestVoucharListCount+1)+'" type="hidden" value="'+(motivatorPayDetId)+'">'
						+ '<input id="bilrepid'+(tableTestVoucharListCount+1)+'" type="hidden" value="'+(bilrepid)+'">'
						+ '</tr>'
						);

			 $('#chk'+ motivatorPayDetId).prop("disabled", true);//Making check box disable which was added in voucher list
			 
			 //getting all values
			 var totalAmount	= parseInt($("#txtTotalAmount").val());
			 var totalDiscount	= parseInt($("#txtTotalDiscount").val());
			 var totalMotivation= parseInt($("#txtTotalMotivation").val());
			 var totalReduction	= parseInt($("#txtTotalReduction").val());
			 var tDS			= parseInt($("#txtTDS").val()); 
			 var amountPayable= parseInt($("#txtAmountPayable").val());
			 
			//Business logic for tatotal calculation
			 totalAmount	= 	totalAmount + tpaidamt;
			 totalDiscount	= 	totalDiscount + disontest;
			 totalMotivation=	totalMotivation + motivatorPayable;
			 totalReduction	=	totalReduction + reduction;
			 amountPayable	=	amountPayable + motivatorPayable;
			 
			 $("#txtTotalAmount").val(totalAmount);
			 $("#txtTotalDiscount").val(totalDiscount);
			 $("#txtTotalMotivation").val(totalMotivation);
			 $("#txtTotalReduction").val(totalReduction);
			 $("#txtAmountPayable").val(amountPayable);
			 
			 //Not used variable, may be in future developer need it, so just adding them to hide suggestion from eclips in yellow warning mark
			 console.log( bilrepid+tname+motpaidamt+bilrecpstatus+tqty+tqty+tDS);
			 
		}else{
			alert("Already Added..!");
			 $('#chk'+ motivatorPayDetId).prop("disabled", true);// Making chaeck box disabled which was alerady added
		}
	//cleaning input text fields.
	$("#txtComponentNo").val(""); 
	$("#txtAmount").val("");
	$("#txtReduction").val("");
	
}// end of function addRowToVoucharList();
			
/***********
 * @author	: Touheed Khan
 * @date	: 03-Aug-2016
 * @reason	: Saving Motivator List
 **********/
function saveMotivatorVoucherList(callForm){
	
	if (callForm == 'motivator') {//if call from motivator
		
		var byName			= $("#byName").val();
		var payTo			= $("#txtPayTo").val();
		var doctorId		= $("#txtDoctorId").val();
		var voucharNumber	= 0/*parseInt($("#txtVoucharNumber").val())*/;
		var authorisedBy	= parseInt($("#txtAuthorisedBy").val());
		var idService		= parseInt($("#txtSelectService").val());
		var date			= $("#assesmentDate").val();
		var totalAmount		= parseInt($("#txtTotalAmount").val());
		var totalDiscount	= parseInt($("#txtTotalDiscount").val());
		var totalMotivation	= parseInt($("#txtTotalMotivation").val());
		var totalReduction	= parseInt($("#txtTotalReduction").val());
		var tDS				= parseInt($("#txtTDS").val()); 
		var amountPayable	= parseInt($("#txtAmountPayable").val());
		var naration		= $("#txtNaration").val();
		var voucherList 	= {	listmopaydet : [] };
		var vocherDetails 	= {	listmotivatorVoucherDetails : [] };
		
		var tableTestVoucharListCount = $('#tableTestVoucharList tr').length;//voucharlist count 
		
		if(isNaN(authorisedBy)){
			alert("Please Select Authorised By");
			SetFocus("txtAuthorisedBy");
			return false;	
		} 
		if (byName == undefined || byName == "") {
			alert("Give Doctor Name!");
			SetFocus("byName");
			return false;
		}
		if (doctorId == 0 || payTo == "0") {
			alert("Doctor Name is not Valid!");
			SetFocus("byName");
			return false;
		}
		if (payTo == undefined || payTo == "") {
			alert("Give Name for Pay To!");
			SetFocus("txtPayTo");
			return false;
		}
		if (tableTestVoucharListCount==0) {
			alert("There no Record in Voucher List to save!");
			return false;
		}
		
		if (tableTestVoucharListCount != 0) { //if table count greater than zero
			for ( var i = 1; i <= tableTestVoucharListCount; i++) { //fetching data inside voucher test list
				
				//initializing variable
				var bilrepid			= parseInt($("#bilrepid"+i).val());
				var bilcomid			= parseInt($("#bilcomid"+i).text());
				var tactrate			= parseInt($("#tactrate"+i).text());
				var motactcut			= parseInt($("#motactcut"+i).text());
				var tpaidamt			= parseInt($("#tpaidamt"+i).text());
				var disontest			= parseInt($("#disontest"+i).text());
				var reduction			= parseInt($("#reduction"+i).text());
				var motivatorPayable	= parseInt($("#motivatorPayable"+i).text());
				var motivatorPayDetId	= parseInt($("#motivatorPayDetId"+i).val());
				
				//setting values to MotivatorPaymentDetails.java
				voucherList.listmopaydet.push({
					bilrepid		: bilrepid,
					bilcomid		: bilcomid,
					tactrate		: tactrate,
					motactcut		: motactcut,
					tpaidamt		: tpaidamt,
					disontest		: disontest,
					reducamt		: reduction,
					motpaidamt		: motivatorPayable,
					idmotipaydt 	: motivatorPayDetId
				});	
			}//for loop i endfetchOperation
		}//if statemt tableTestVoucharListCount != 0 end
		
		if(voucherList.listmopaydet.length<1)
		{
			alert("NO Data");
			return false;
		}
		
		vocherDetails.listmotivatorVoucherDetails.push({
			date			: date,
			idMotivatorVoucherDetails	: voucharNumber,
			idAuthorisedBy	: authorisedBy,
			doctorName			: byName,
			doctorId		: doctorId,
			payTo			: payTo,
			idService		: idService,
			narration		: naration,
			totalAmount 	: totalAmount,
			totalDiscount 	: totalDiscount,
			totalReduction 	: totalReduction,
			totalMotivation : totalMotivation,
			tds			 	: tDS,
			amountPayable	: amountPayable
			
		});
		
		voucherList = JSON.stringify(voucherList);
		vocherDetails = JSON.stringify(vocherDetails);
		
		
		var inputs = [];
		inputs.push('action=saveMotivatorVoucherList');
		inputs.push("voucherList=" + voucherList);
		inputs.push("vocherDetails=" + encodeURIComponent(vocherDetails));
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				//fetching latest service heading
				fetchTestRelatedtToDoctorAndGroupId('motivator');
				resetMotivatorVouchar('saveButton');
			}
		});
		
	}//if callFrom ='Motivator' end
}//function saveMotivatorVoucherList end
	
/***********
 * @author	: Touheed Khan
 * @date	: 04-Aug-2016
 * @reason	: Reset All Feilds
 **********/
function resetMotivatorVouchar(callFrom){
	if (callFrom == 'motivator' || callFrom == 'saveButton' || callFrom == "cancelbutton") {
		
		$("#txtVoucharNumber").val("");
		$("#txtAuthorisedBy").val("1");
		$("#byName").val("");
		$("#txtDoctorId").val("0");
		$("#txtPayTo").val("");
		$("#txtSelectService").val("0");
		$("#txtNaration").val("");
		$("#tableTestDash").empty();
		$("#tableTestVoucharList").empty();
		$("#txtComponentNo").val(""); 
		$("#txtAmount").val("");
		$("#txtReduction").val("");
		$("#txtTotalAmount").val("0");
		$("#txtTotalDiscount").val("0");
		$("#txtTotalReduction").val("0");
		$("#txtTotalMotivation").val("0");
		$("#txtTDS").val("");
		$("#txtAmountPayable").val("0");
		getNextMotivatorVoucherDetailsId();
		
	}//if
}//function resetMotivatorVouchar end

/***********
 * @author	: Touheed Khan
 * @date	: 05-Aug-2016
 * @reason	: Getting next 
 **********/
function getNextMotivatorVoucherDetailsId() {
	var inputs = [];
	inputs.push('action=getNextMotivatorVoucherDetailsId');
	inputs.push('tableName=ehat_motivator_voucher_details');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#txtVoucharNumber").val(r);
		}
	});
}//function getNextMotivatorVoucherDetailsId end

//Template for current Voucher
var Current ="Current";
var tableCurrentMotivatorVoucher = 1;
var tableCurrentMotivatorVoucherTemplate =  "{#foreach $T.listmotivatorVoucherDetails as li}{#if $T.li.status =='Y'}<tr>"
	+ "<td class='col-md-1 center'><div id='rowcount{$T.li.idMotivatorVoucherDetails}' class='TextFont'>{tableCurrentMotivatorVoucher}</div></td>"
	+ "<td class='col-md-1'> <div class='TextFont' id='idMotivatorVoucherDetails{$T.li.idMotivatorVoucherDetails}'>{$T.li.idMotivatorVoucherDetails}</div></td>"
	+ "<td class='col-md-3'> <div class='TextFont' id='doctorName{$T.li.idMotivatorVoucherDetails}'>{$T.li.doctorName}</div></td>"
	+ "<td class='col-md-3'> <div class='TextFont' id='payTo{$T.li.idMotivatorVoucherDetails}'>{$T.li.payTo}</div></td>"
	+ "<td class='col-md-2'> <div class='TextFont' id='amountPayable{$T.li.idMotivatorVoucherDetails}'>{$T.li.amountPayable}</div></td>"
	+ "<td class='col-md-1 '> <div class='TextFont' id='date{$T.li.idMotivatorVoucherDetails}'>{$T.li.date}</div></td>"
	+ "<td class='col-md-1 '>  <div class='TextFont'> <button class='btn btn-xs btn-success' type='button' onclick='viewMotivatorVoucherDetails({$T.li.idMotivatorVoucherDetails},"+Current+")'><i class='fa fa-eye View'></i></button></div></td>"
	+ "{tableCurrentMotivatorVoucher++}</tr>{#/for}";	


//Template for current Voucher
var Cancel ="Cancel";
var tableCancelMotivatorVoucher = 1;
var tableCancelMotivatorVoucherTemplate =  "{#foreach $T.listmotivatorVoucherDetails as li}{#if $T.li.status =='N'}<tr>"
	+ "<td class='col-md-1 center'><div id='rowcount{$T.li.idMotivatorVoucherDetails}' class='TextFont'>{tableCancelMotivatorVoucher}</div></td>"
	+ "<td class='col-md-1'> <div class='TextFont' id='idMotivatorVoucherDetails{$T.li.idMotivatorVoucherDetails}'>{$T.li.idMotivatorVoucherDetails}</div></td>"
	+ "<td class='col-md-3'> <div class='TextFont' id='doctorName{$T.li.idMotivatorVoucherDetails}'>{$T.li.doctorName}</div></td>"
	+ "<td class='col-md-3'> <div class='TextFont' id='payTo{$T.li.idMotivatorVoucherDetails}'>{$T.li.payTo}</div></td>"
	+ "<td class='col-md-2'> <div class='TextFont' id='amountPayable{$T.li.idMotivatorVoucherDetails}'>{$T.li.cancelNarration}</div></td>"
	+ "<td class='col-md-1 '> <div class='TextFont' id='date{$T.li.idMotivatorVoucherDetails}'>{$T.li.cancel_date_time}</div></td>"
	+ "<td class='col-md-1 '>  <div class='TextFont'> <button class='btn btn-xs btn-success' type='button' onclick='viewMotivatorVoucherDetails({$T.li.idMotivatorVoucherDetails},"+Cancel+")'><i class='fa fa-eye View'></i></button></div></td>"
	+ "{tableCancelMotivatorVoucher++}</tr>{#/for}";	


/***********
 * @author	: Touheed Khan
 * @date	: 05-Aug-2016
 * @reason	: fetching All Generated Vouchers and cancel
 **********/
function fetchAllGeneratedVouchers(callFrom){
	$("#tabName").val(callFrom);
	var voucherNo =  $("#byVoucherNo").val();
	if(voucherNo == "" || voucherNo == undefined){
		voucherNo=0;
	}
	if (callFrom == 'Current' || callFrom == 'Cancel' ) {
		var inputs = [];
		inputs.push('action=fetchAllGeneratedVouchers');
		inputs.push('callFrom='+callFrom);
		inputs.push('voucherNo='+voucherNo);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				//alert("error");
			},
			success : function(r) {
				var data = eval('(' + r + ')');
				//for current
				if (callFrom == 'Current'){
					tableCurrentMotivatorVoucher = 1;
					$("#tableCurrentTestDash").setTemplate(tableCurrentMotivatorVoucherTemplate);
					$("#tableCurrentTestDash").processTemplate(data);
					$("#txtCancelNarration").prop("readonly", false);
				}
				//for cancel
				if (callFrom == 'Cancel'){
				tableCancelMotivatorVoucher = 1;
					$("#tableCancelTestDash").setTemplate(tableCancelMotivatorVoucherTemplate);
					$("#tableCancelTestDash").processTemplate(data);
				}
			}
		});
	}
	$("#tabName").val(callFrom);
}//function fetchAllGeneratedVouchers

/***********
 * @author	: Touheed Khan
 * @date	: 08-Aug-2016
 * @reason	: fetching All data of that particular voucher
 **********/
function viewMotivatorVoucherDetails(id,callFrom){

		var inputs = [];
		inputs.push('action=viewMotivatorVoucherDetailsForId');
		inputs.push('callFrom='+callFrom);
		inputs.push('id='+id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				//alert("error");
			},
			success : function(r) {
				var data = eval('(' + r + ')');
				tableCurrentMotivatorVoucher = 1;
				
				if (callFrom=="Current" || callFrom=="Cancel") {
					//for current
					$("#txtVoucharNumber").val(data.idMotivatorVoucherDetails);
					$("#txtAuthorisedBy").val(data.idAuthorisedBy);
					$("#byName").val(data.doctorName);
					$("#txtDoctorId").val(data.doctorId);
					$("#txtPayTo").val(data.payTo);
					$("#txtSelectService").val(data.idService);
					$("#txtNaration").val(data.narration);
					$("#txtTotalAmount").val(data.totalAmount);
					$("#txtTotalDiscount").val(data.totalDiscount);
					$("#txtTotalReduction").val(data.totalReduction);
					$("#txtTotalMotivation").val(data.totalMotivation);
					$("#txtTDS").val(data.tds);
					$("#txtAmountPayable").val(data.amountPayable);
					$("#txtCancelNarration").val(data.cancelNarration);
					
					for ( var int = 0; int < data.listmopaydet.length; int++) {
						
						//	alert(data.listmopaydet[int].bilcomid);
							 $('#tableTestVoucharList').append(
									  '<tr>'  
									+ '<td class="col-md-1 center"><div id="rowcount'+(int+1)+'" class="TextFont">'+(int+1)+'</div></td>'
									+ '<td class="col-md-1 center"><div id="bilrepid'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].bilrepid)+'</div></td>'
									+ '<td class="col-md-1 center"><div id="bilcomid'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].bilcomid)+'</div></td>'
									+ '<td class="col-md-1 center"><div id="tactrate'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].tactrate)+'</div> </td>'
									+ '<td class="col-md-1 center"><div id="motactcut'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].motactcut)+'</div></td>'
									+ '<td class="col-md-1 center"><div id="tpaidamt'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].tpaidamt)+'</div> </td>'
									+ '<td class="col-md-1 center"> <div id="disontest'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].disontest)+'</div> </td>'
									+ '<td class="col-md-1 center"><div id="reduction'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].reducamt)+'</div></td>'
									+ '<td class="col-md-1 center"><div id="motivatorPayable'+(int+1)+'" class="TextFont">'+(data.listmopaydet[int].motpaidamt)+'</div></td>'
									+ '</tr>'
									);
					}
					
				}
			}
		});
	
		
		//show popup
		showPopUpMotivatorVocher(callFrom);
	
}//viewMotivatorVoucherDetails end


/***********
 * @author	: Touheed Khan
 * @date	: 08-Aug-2016
 * @reason	: showing Popup
 **********/
function showPopUpMotivatorVocher(callFrom){
	$("#popUpMotivatorVocher").show('show');
	if(callFrom == 'Cancel'){
		$("#btnPrintVoucher").hide();
		$("#btnCancelVoucher").hide();
		$("#divCancelNa").css("display", "block");
		$("#txtCancelNarration").prop("readonly", true);
	}else{
		$("#btnPrintVoucher").show();
		$("#btnCancelVoucher").show();
		$("#divCancelNa").css("display", "none");
	}
}

/***********
 * @author	: Touheed Khan
 * @date	: 08-Aug-2016
 * @reason	: hiding Popup
 **********/
function hidePopUpMotivatorVocher(){
	$("#popUpMotivatorVocher").hide('hide');
	resetMotivatorVouchar("cancelbutton");
	$("#txtCancelNarration").val("");
	$("#divCancelNa").css("display", "none");
	//fetch all generated vouchers
	fetchAllGeneratedVouchers('Current');
}//function hidePopUpMotivatorVocher end


/***********
 * @author	: Touheed Khan
 * @date	: 08-Aug-2016
 * @reason	: cancelling Generated Voucher
 **********/
function cancelGenratedVoucher(callFrom){
	
	if (callFrom=='allgeneratedVoucher') {
		
		if ($('#divCancelNa').css('display') == 'none')
		{
			$("#divCancelNa").css("display", "block");
		}else if ($('#divCancelNa').css('display') == 'block'){
			$("#txtCancelNarration").prop("readonly", false);
			var res = confirm("Confirm to Cancel Generated Voucher Machine Details?");
			if (res == false) {
				$("#divCancelNa").css("display", "none");
				return false;
			}
			
			var id = $("#txtVoucharNumber").val();
			var narration = $("#txtCancelNarration").val();
			
			if(narration == "" || narration == undefined){
				alert("Please type narration!");
				setFocus("txtCancelNarration");
				return false;
			}
			
			var inputs = [];
			inputs.push('action=cancelGenratedVoucher');
			inputs.push('id='+id);
			inputs.push('narration='+narration);
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					//alert("error");
				},
				success : function(r) {
					//alert(r);
					hidePopUpMotivatorVocher();
					//fetch all generated vouchers
					fetchAllGeneratedVouchers('Current');
				}
			});
		}
	}	
}//function cancelGenratedVoucherend

/***********
 * @author	: Touheed Khan
 * @date	: 09-Aug-2016
 * @reason	: comparing with current date
 **********/
function checkWithCurrentDate(callFrom){
	var currentDate = $.datepicker.formatDate('yy-mm-dd', new Date());
	var fromDate	= $("#inputFromDate").val();
	
	/*if (currentDate == fromDate) {
		alert("'From Date' can't be equl to Today's Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}else*/ if(fromDate > currentDate) {
		alert("'From Date' can't be Greater than Today's Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	
	if (callFrom == "ReportToMotivator") {
		var toDate	= $("#inputToDate").val();
		if (toDate < fromDate) {
			alert("'To Date' can't be less than 'From Date',but Equal to It!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}
		
	}
	
	//making table empty
	 $('#tableTestVoucharList').empty();
	
}

/***********
 * @author	: Touheed Khan
 * @date	: 09-Aug-2016
 * @reason	: Fetching data between two dates
 **********/
function fetchMotivatorBetweenDate(callFrom){
	//making table empty
	 $('#tableTestVoucharList').empty();
	var fromDate	= $("#inputFromDate").val();
	var toDate		= $("#inputToDate").val();
	var currentDate = $.datepicker.formatDate('yy-mm-dd', new Date());
	
	if (fromDate > toDate) {
		alert("'To Date' Can't be less than From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}else if(toDate >currentDate){
		alert("'To Date' Can't be greater than Today's Date, but Equals to It!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchMotivatorBetweenDate');
	inputs.push('fromDate='+fromDate);
	inputs.push('toDate='+toDate);
	inputs.push('callFrom='+callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		beforeSend: function(){
	        $('#ajaxloaderimg').show();
	    },
	    complete: function(){
	        $('#ajaxloaderimg').hide();
	    },
		error : function() {
			//alert("error");
		},
		success : function(r) {
		
			var data = eval('(' + r + ')');
			/*------------------------For Dynamic Heading--------------------------------------------*/
			if ( data.mainList.length != 2) {
				var html= "<tr>";
				for(var int = 0; int < data.mainList[0].headingList.length; int++){
					
					if(int==0){
						html = html+ '<th class="col-md-2 "><div class="TextFont">'+data.mainList[0].headingList[int]+'</th>';
					}else{
						html = html+ '<th class="col-md-1 center"><div class="TextFont">'+data.mainList[0].headingList[int]+'</th>';
					}
				}
				html = html+"</tr>";
				/*-------------------------For Dynamic Heading End---------------------------------------------*/
				
				for(var int = 1; int < data.mainList.length; int++){
					var docName = data.mainList[int].docName;
					
					if (docName == "Total") {
						html	= html + '<tr>';
						html	= html + '<td class="col-md-2 "><div id="docname'+(int)+'" class="TextFont"><b>'+docName+'</b></div></td>';
						
						for ( var int2 = 0; int2 < data.mainList[int].values.length; int2++) {							
							var amount = data.mainList[int].values[int2];
							html 	= html + '<td class="col-md-1 center"><div id="row'+(int)+'amount'+(int2+1)+'" class="TextFont"><b>'+amount+'</b></div></td>';
						}
						html = html + '</tr>';						
					}else{
						html	= html + '<tr>';
						html	= html + '<td class="col-md-2 "><div id="docname'+(int)+'" class="TextFont">'+docName+'</div></td>';
						
						for ( var int2 = 0; int2 < data.mainList[int].values.length; int2++) {
							
							var amount = data.mainList[int].values[int2];
								
							html 	= html + '<td class="col-md-1 center"><div id="row'+(int)+'amount'+(int2+1)+'" class="TextFont">'+amount+'</div></td>';
						}
						html = html + '</tr>';						
					}
				}
				$("#tableTestVoucharList").html(html);	
			}else{
				var html= "<tr><th class='col-md-1 center'>No Record";
				
				html = html + '</th></tr>';
				$("#tableTestVoucharList").html(html);
			}	
		}	
	});
}


/***********
 * @author	: Touheed Khan
 * @date	: 11-Aug-2016
 * @reason	: Print Data Direactly from UI Div
 **********/
function printData(){
   var divToPrint=document.getElementById("printTable");
   newWin= window.open("");
   newWin.document.write(divToPrint.outerHTML);
   newWin.print();
   newWin.close();
}

/***********
 * @author	: Touheed Khan
 * @date	: 11-Aug-2016
 * @reason	: Export Data Direclty on Excel Using table2excel plugin 
 **********/
function exportData(){
	$("#printTable").table2excel({
		exclude: ".noExl",
		name: "Worksheet Name",
		 filename: "PayAllMatrix"
	});
	
}

/***********
 * @author	: Touheed Khan
 * @date	: 18-Aug-2016
 * @reason	: Print current Motivator voucher 
 **********/
function generatedprintMotivatorVoucher(callFrom){
	//txtVoucharNumber
	var id = $("#txtVoucharNumber").val();
	if (id != 0) {

		window.open("motivatorVoucherPrint.jsp?" + "&id=" + id );
	}
}

/***********
 * @author	: Touheed Khan
 * @date	: 19-Aug-2016
 * @reason	: Pay All 
 **********/
function payAllMotivatorFromToDate(callFrom){
	
	var tableLength = $('#tableTestVoucharList tr').length;

	if (tableLength == 1) {
		alert("No Record to Pay All, Please change the Date!");
		return false;
	}
	var fromDate	= $("#inputFromDate").val();
	var toDate		= $("#inputToDate").val();
	
	if (fromDate == undefined || fromDate == "") {
		alert("Please select from Date!");
		SetFocus("inputFromDate");
		return false;
	}else if(toDate == undefined || toDate == ""){
		alert("Please select To Date!");
		SetFocus("inputToDate");
		return false;
	}

	var res = confirm("Confirm to Pay All Motivators?");
	if (res == false) {
		return false;
	}
	
	var inputs = [];
	inputs.push('action=payAllMotivatorFromToDate');
	inputs.push('fromDate='+fromDate);
	inputs.push('toDate='+toDate);
	inputs.push('callFrom='+callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			alert(r);
			fetchMotivatorBetweenDate('payAll');
		}
	});
}

/***********
 * @author	: Touheed Khan
 * @date	: 19-Aug-2016
 * @reason	: Rest Page 
 **********/
function resetPayallData(){
	window.location.href = "payAllAtTime.jsp";
}

/***********
 * @author	: Touheed Khan
 * @date	: 23-Aug-2016
 * @reason	: Authorised Users List 
 **********/
function fetchAuthorisedBy(callFrom){
	callFrom ="onload";
	
	var inputs = [];
	inputs.push('action=fetchAuthorisedBy');
	inputs.push('callFrom='+callFrom);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			var data = eval('(' + r + ')');
			$("#txtAuthorisedBy").setTemplate(authorisedByListTemplate);
			$("#txtAuthorisedBy").processTemplate(data);
			
		}
	});
	
} 

//@Touheed Template authorised by @date 23-Aug-2016
var authorisedByListTemplate = "{#foreach $T.listDoctor as dpl}" 
		+	"<option value='{$T.dpl.ui}'>{$T.dpl.dn}</option>{#/for}";

/***********
 * @author	: Touheed Khan
 * @date	: 24-Aug-2016
 * @reason	: Motivator Report Fromdate Todate
 **********/
function motivatorReportFromdateTodate(callFrom){
	
	var byName		= $("#byName").val();
	var fromdate	= $("#inputFromDate").val();
	var todate		= $("#inputToDate").val();
	var doctorId	= $("#txtDoctorId").val();
	var idService	= $("#txtSelectServiceReport").val();
	var radioType 	=$('input[name="payType"]:checked').val();
	
	if(byName=="" || byName == undefined){
		alert("Please Type Doctor Name!");
		$("#byName").val("");
		SetFocus("byName");
		return false;
	}else if (doctorId == 0 || doctorId=="" || doctorId == undefined) {
		alert("Enter Doctor Name is not Valid, Please Select Doctor Name Form Suggestion List!");
		$("#byName").val("");
		SetFocus("byName");
		return false;
	}else if (fromdate=="" || fromdate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}else if (todate=="" || todate == undefined) {
		alert("Please Select From Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	
	
	var inputs = [];
	inputs.push('action=motivatorReportFromdateTodate');
	inputs.push('callFrom='+callFrom);
	inputs.push('fromdate='+fromdate);
	inputs.push('todate='+todate);
	inputs.push('doctorId='+doctorId);
	inputs.push('idService='+idService);
	inputs.push('radioType='+radioType);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		beforeSend: function(){
	        $('#ajaxloaderimg').show();
	    },
	    complete: function(){
	        $('#ajaxloaderimg').hide();
	    },
		error : function() {
			//alert("error");
		},
		success : function(r) {
			var data = eval('(' + r + ')');
			var html= '';
			
			html = html + '<tr>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-2" >#</th>';
			html = html + '<th style="height: 21.5px;" class="col-md-2 center" >Date</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-3" >Patient Name</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-6" >Part</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-1" >Discount</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-1" >Reduction</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-1" >Amount</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-2" >Recpt No</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-1" >Year</th>';
			html = html + '<th style="height: 21.5px;" class="TextFont col-md-1" >Paid</th>';
			html = html + ' </tr>';
			
			/*$("#txtAuthorisedBy").setTemplate(authorisedByListTemplate);
			$("#txtAuthorisedBy").processTemplate(data);*/
			for ( var i = 0; i < data.listReportMotivator.length; i++) {
				
				//alert(data.listReportMotivator[i].serviceName); -- Heading Name
				//alert("Length= "+ data.listReportMotivator[i].listReportToMotivatorProperties.length);
				
				//if any service contains more than zero elemnt then it should print on UI
				var serviceInsideLength =  data.listReportMotivator[i].listReportToMotivatorProperties.length;
				
				if(serviceInsideLength>0){
				
					var serviceName = data.listReportMotivator[i].serviceName;
					//alert(serviceName);
					html = html + '<tr>';
					html = html + '<th style="height: 21.5px;" class="col-md-2" >'+serviceName+'</th>';
					html = html + '</tr>';
					
					for(var j = 0 ; j< data.listReportMotivator[i].listReportToMotivatorProperties.length; j++){
						
						var part = data.listReportMotivator[i].listReportToMotivatorProperties[j].part;
						var date = data.listReportMotivator[i].listReportToMotivatorProperties[j].date;
						var discount = data.listReportMotivator[i].listReportToMotivatorProperties[j].discount;
						var paid	= data.listReportMotivator[i].listReportToMotivatorProperties[j].paid;
						var recptNumber = data.listReportMotivator[i].listReportToMotivatorProperties[j].recptNumber;
						var reduction = data.listReportMotivator[i].listReportToMotivatorProperties[j].reduction;
						var unpaidAmount =data.listReportMotivator[i].listReportToMotivatorProperties[j].unpaidAmount;
						var patientName = data.listReportMotivator[i].listReportToMotivatorProperties[j].patientName;
						var year		= data.listReportMotivator[i].listReportToMotivatorProperties[j].year;
						//alert(part+date+discount+paid+recptNumber+reduction+unpaidAmount);
				
						html = html + '<tr>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-2" >'+(j+1)+'</td>';
						html = html + '<td style="height: 21.5px;" class="col-md-2 center" >'+(date)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-3" >'+(patientName)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-6" >'+(part)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-1" >'+(discount)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-1" >'+(reduction)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-1" >'+(unpaidAmount)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-2" >'+(recptNumber)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-1" >'+(year)+'</td>';
						html = html + '<td style="height: 21.5px;" class="TextFont col-md-1" >'+(paid)+'</td>';
						
						html = html + '</tr>';
					}	
				}	
			}
			//html = html + '</th></tr>';
			$("#tableTestVoucharList").html(html);	
			$("#inputTotalamt").val(data.totalAmount);// setting up total amount (amount(unpaid)+paid)
		}
	});
	
}


function resetReportToMotivator(callFrom){
	
	if(callFrom == "reset"){
		$("#byName").val("");
		$("#txtDoctorId").val("0");
		$("#inputFromDate").val("");
		$("#inputToDate").val("");
		$("#txtSelectServiceReport").val("select");
		$("#inputTotalamt").val("");
		$('#tableTestVoucharList').empty();
		$("#radioAll").prop("checked", true);
			
	}else{
		$("#inputFromDate").val("");
		$("#inputToDate").val("");
		$("#txtSelectServiceReport").val("select");
		$("#inputTotalamt").val("");
		$('#tableTestVoucharList').empty();
		$("#radioAll").prop("checked", true);
	}	
}


function searchByVoucherNumber(callFrom){
	var txtSearch = $("#byVoucherNo").val();
	if(txtSearch == "" || txtSearch == null || txtSearch == undefined){
		alert("Insert keyword to search!!!");
		return false;
	}
	var tabName = $("#tabName").val();
	//alert(tabName);
	if (tabName!="") {
		fetchAllGeneratedVouchers(tabName);
	}
	$("#byVoucherNo").val("");
}
	