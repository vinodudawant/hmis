/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function getFinaceDetails(callF,deptId){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var payMode = parseInt($("#payMode").val());	
	var billType = $("input[name='billType']:checked").val();
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("payMode=" + payMode);
	inputs.push("billType=" + billType);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getReceiptFinance",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
	
			setFinaceDetailsTemp(r);
			setFinaceRefundDetailsTemp(r);			
			//getFinaceRefundDetails("hisab",deptId);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function setFinaceDetailsTemp(res){
	
	var temp="";	
	var totcash=0;
	var totcard=0;
	var totcheque=0;
	var totcommonAdvc=0;
	var totmultiple=0;
	var tottotal=0;
	
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		
		var patName=res.listBillReceiptMaster[i].bName;
		var patientId=res.listBillReceiptMaster[i].patientId;
		var cash=res.listBillReceiptMaster[i].totalAmt;
		var card=res.listBillReceiptMaster[i].totalPaid;
		var cheque=res.listBillReceiptMaster[i].totalRemain;
		var commonAdvc=res.listBillReceiptMaster[i].totalDisc;
		var multiple=res.listBillReceiptMaster[i].refundAmt;
		var total=Number(cash)+Number(card)+Number(cheque)+Number(commonAdvc)+Number(multiple);
		
		if(total>0){
			
			temp=temp+"<tr>" +
			"<td style='height: 21.5px;' class='col-md-1 center'>"+(i+1)+"</td>" +
			"<td style='height: 21.5px;' class='numeric col-md-1 center'>"+patientId+"</td>" +
			"<td style='height: 21.5px;' class='numeric col-md-5'>"+patName+"</td>" +
			"<td style='height: 21.5px;' class='numeric col-md-3'>"+parseFloat(total).toFixed(2)+"</td>" +
			"<td style='height: 21.5px;' class='numeric col-md-1'><input type='checkbox' class='recChk' value="+patientId+"></td>" +
			"</tr>";
		}
		
		totcash=Number(totcash)+Number(cash);
		totcard=Number(totcard)+Number(card);
		totcheque=Number(totcheque)+Number(cheque);
		totcommonAdvc=Number(totcommonAdvc)+Number(commonAdvc);
		totmultiple=Number(totmultiple)+Number(multiple);
		tottotal=Number(tottotal)+Number(total);
	}
	
	/*totTemp=totTemp+"<tr>" +
	"<th style='height: 21.5px;' class='col-md-1-1 center'>    </th>" +
	"<th style='height: 21.5px;' class='numeric col-md-1-1 center'></th>" +
	"<th style='height: 21.5px;' class='numeric col-md-4-1'>Total</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcash).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcard).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcheque).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcommonAdvc).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totmultiple).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(tottotal).toFixed(2)+"</th>" +
	"</tr>";*/	
	
	$("#recTot").html(parseFloat(tottotal).toFixed(2));
	$("#totRec").val(parseFloat(tottotal).toFixed(2));
	$("#container").html(temp);	
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function getFinaceRefundDetails(callF,deptId){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());
	var unitId = parseInt($("#unitId").val());
	var payMode = parseInt($("#payMode").val());
	var billType = $("input[name='billType']:checked").val();	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("payMode=" + payMode);
	inputs.push("billType=" + billType);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getRefundFinance",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
	
			setFinaceRefundDetailsTemp(r);										
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function setFinaceRefundDetailsTemp(res){
	
	var temp="";	
	var totcash=0;
	var totcard=0;
	var totcheque=0;
	var totcommonAdvc=0;
	//var totmultiple=0;
	var tottotal=0;
	
	for(var i=0;i<res.listBillRefundMaster.length;i++){
				
		var patName=res.listBillRefundMaster[i].bName;
		var patientId=res.listBillRefundMaster[i].patientId;
		var cash=res.listBillRefundMaster[i].totalAmt;
		var card=res.listBillRefundMaster[i].totalPaid;
		var cheque=res.listBillRefundMaster[i].totalRemain;
		var commonAdvc=res.listBillRefundMaster[i].totalDisc;
		//var multiple=res.listBillRefundMaster[i].refundAmt;
		var total=Number(cash)+Number(card)+Number(cheque)+Number(commonAdvc);
		
		if(total>0){
		
		temp=temp+"<tr>" +
				"<td style='height: 21.5px;' class='col-md-1 center'>"+(i+1)+"</td>" +
				"<td style='height: 21.5px;' class='numeric col-md-1 center'>"+patientId+"</td>" +
				"<td style='height: 21.5px;' class='numeric col-md-5'>"+patName+"</td>" +
				"<td style='height: 21.5px;' class='numeric col-md-3'>"+parseFloat(total).toFixed(2)+"</td>" +
				"<td style='height: 21.5px;' class='numeric col-md-1'><input type='checkbox' class='refChk' value="+patientId+"></td>" +
				"</tr>";
		}
		
		totcash=Number(totcash)+Number(cash);
		totcard=Number(totcard)+Number(card);
		totcheque=Number(totcheque)+Number(cheque);
		totcommonAdvc=Number(totcommonAdvc)+Number(commonAdvc);
		//totmultiple=Number(totmultiple)+Number(multiple);
		tottotal=Number(tottotal)+Number(total);
	}
	
	/*totTemp=totTemp+"<tr>" +
	"<th style='height: 21.5px;' class='col-md-1-1 center'>    </th>" +
	"<th style='height: 21.5px;' class='numeric col-md-1-1 center'></th>" +
	"<th style='height: 21.5px;' class='numeric col-md-4-1'>Total</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcash).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcard).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcheque).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totcommonAdvc).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(totmultiple).toFixed(2)+"</th>" +
	"<th style='height: 21.5px;text-align: right;' class='numeric col-md-1-1'>"+parseFloat(tottotal).toFixed(2)+"</th>" +
	"</tr>";*/	
	
	$("#refTot").html(parseFloat(tottotal).toFixed(2));	
	$("#tableTestVoucharList").html(temp);
	
	var totRec=$("#recTot").html();
	var totRem= Number(totRec) - Number(tottotal);
	$("#remTot").html(parseFloat(totRem).toFixed(2));
	
	$("#totRef").val(parseFloat(tottotal).toFixed(2));	
	var totRec=parseFloat($("#totRec").val()).toFixed(2);
	var totCash=Number(totRec)-Number(tottotal);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function getAllChargesl() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getSponsorList",

		success : function(response) {
			multiSelectchargesinfo(response);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function multiSelectchargesinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName) + '</option>';
	}

	$("#listmstr_select_chargesinfo").html(list);	
	$("#listmstr_select_chargesinfo").select2();	
	
	$("#listmstr_select_payee").html(list);	
	$("#listmstr_select_payee").select2();	
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function setDyanamicDivForChargesinfo(setDiv, getDiv) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();
	var htm= '<li class="select2-search-choice" id="liItmesH'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removech('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="lisH' + (count) + '" type="hidden" value="' + id
			+ '">';
		+'</li>';
		$('#' + setDiv).append(htm);
	
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();// for masters
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		if (liSize == 0) {
			
			fetchChargesSlaveinfo(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo(masterid, selfId);
		}		
	}
	
	$("#compDiv").show();
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function removech(count, id, setDiv) {
	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesH' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		getAllChargesl();
		fetchargesinfo();
	} else {
		var masterid = $("#lisH" + 0).val();
		var selfId = 0;
		
		if (liSize == 0) {
			fetchChargesSlaveinfo(masterid, selfId);
		} else {
			selfId = $("#lisH" + (liSize - 1)).val();
			fetchChargesSlaveinfo(masterid, selfId);
		}		
	}
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function multiSelectSlavechargesinfo(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName)
				+ '</option>';
	}
	
	$("#listmstr_select_chargesinfo").html(list);		
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function fetchChargesSlaveinfo(masterId, selfId) {
	
	masterId =1;
	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/fetcatY",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)

		},
		success : function(response) {
			
			multiSelectSlavechargesinfo(response);			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function getBankMasterList() {
	
	$('.member').hide();
	$('.member2').hide();
	
	jQuery.ajax({
         async : true,
         type : "POST",
         url : "ehat/bill/getBankMasterList",

         success : function(r) {
         	console.log(r);
         	setTempForBanktList(r);//call template
         }
     });
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function setTempForBanktList(r) {   
	
	var list = "<option value='0'>-- Select --</option>";    
	for ( var i = 0; i < r.ltBankMaster.length; i++) {    

		list = list + "<option value='"+r.ltBankMaster[i].bankId+"'>" + (r.ltBankMaster[i].bankName) + "</option>";    
	}   
	$("#bankID").html(list); 		
}

/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function saveFinaceBankDetails(callF){
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var bankID = $("#bankID").val();
	var accNo = $("#accNo").val();	
	var accType = $("#accType").val();	
	
	var inputs = [];	
	inputs.push("userId=" + userId);
	inputs.push("unitId=" + unitId);
	inputs.push("callFrom=" + callF);	
	inputs.push("bankID=" + bankID);
	inputs.push("accNo=" + accNo);	
	inputs.push("accType=" + accType);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/saveFinaceBankDetails",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
	
			if(r>0){
				
				alert('Data Saved Succesfully...');
			}else{
				
				alert('Network Issue!!!');
			}					
		}
	});
}

function fetchFinanceBankDetails(){
	
	jQuery.ajax({
        async : true,
        type : "POST",
        url : "ehat/financeMeesha/getFinBankMasterList",

        success : function(r) {
        	
        	//setTempForBanktList(r);//call template
        }
   });
}


function loadData() {
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var dispatchFlag = 0;
	var vendorId = $("#suplierName").val();
	if (vendorId == "" || vendorId == null || vendorId == undefined
			|| isNaN(vendorId)) {
		vendorId = 0;
	}

	if (from != '' && to != '') {
		var inputs = [];

		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('dispatchFlag=' + dispatchFlag);
		inputs.push('vendorId=' + vendorId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/report/getDayWiseDispatchGRN",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
			
				$("#totalAmount").val('');
				total = 0;
				setPartyResult(r);

			}
		});
		return true;
	} else {
		alertify.error('Please Fill All the Details');
	}

}

function setPartyResult(r) {
	var divContent = "";
	var total = 0;
	$('#totalAmount').val('');

	for ( var i = 0; i < r.length; i++) {
		
		divContent = divContent
				+ "<tr><td class='col-md-1 center' style='height: 21.5px;' id='grnid"
				+ (i + 1)
				+ "'>"
				+ r[i].productId
				+ "</td><td class='col-md-1 center' style='height: 21.5px;'>"
				+ r[i].productCompany

				+ "</td><td class='col-md-3' style='height: 21.5px;'>"
				+ r[i].vendorName
				+ "</td><td align='center'>"
				+ r[i].productPack

				+ "</td> "
				/*+ "</td><td align='right'>"
				+ r[i].type
				
				+ "</td><td align='right'>"
				+ r[i].dispatchFlag*/
				
				/*+ "</td><td align='right'>"
				+ parseInt(r[i].poId)*/
				
				+ "<td class='col-md-1 center' style='height: 21.5px;'>"
				+ parseFloat(r[i].productName).toFixed(2)
				+ "</td><td class='col-md-1 center' style='height: 21.5px;text-align:right'>"
				+ parseFloat(r[i].qty).toFixed(2)
				+ "</td><td class='col-md-1 center' style='height: 21.5px;text-align:right'>"
				+ parseFloat(r[i].mrp).toFixed(2)		
				
				+ "</td><td class='col-md-1 center' style='height: 21.5px;text-align:right'>"
				+ parseFloat(r[i].vouNo).toFixed(2)			

				+ "</td><td class='col-md-1 center' style='height: 21.5px;text-align:right'>"
				+ "<input type='checkbox' class='recChk'></td></tr>";

		total = total + parseFloat(r[i].vouNo);
	}
	$("#container").html(divContent);
	
	$("#recTot").html(total.toFixed(2));
	$("#remTot").html(total.toFixed(2));
}

function checkUncheck(id,slaveClass){
	
	if($('input[id='+id+']').attr('checked')){
		
		$("."+slaveClass+"").prop("checked",true);
		
	}else{
		
		$("."+slaveClass+"").prop("checked",false);
	}
}

function getDispachlist(){
	
	var callfrom="givenId";
	var callPartyName=0;
	
	var partyId=$('#partyId').val();
	var letter="";
	
	if(partyId > 0){
		callPartyName=partyId;
	}
	
	//this is use to filter from date to date.
	var startDate = $('#popup_container2').val();	
	var endDate = $('#popup_container3').val();
	var startDate1=0;
	var endDate2=0;
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate1=0;
		 endDate2=0;
		 
	}else{
		
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!

	    var yyyy = today.getFullYear();
	    if(dd<10){
	        dd='0'+dd;
	    }
	    if(mm<10){
	        mm='0'+mm;
	    }

	    var todays = yyyy +'/'+mm+'/'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#dob').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#dob').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#dob1').val(todays);
	        return false;
	    }
	    
		if(startDate==0 || startDate==null)
		{
			alert("Please Select From Date");
				 
			return false;
		}
		if(endDate==0 || endDate==null)
		{
			alert("Please Select End Date");
			return false;
		}

		
		var dateAr = startDate.split('/');
		 startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
		 dateAr = endDate.split('/');
		 endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];		
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {"callfrom" : callfrom,
			"callPartyName" : callPartyName,
			"startDate" : startDate1,
			"endDate" : endDate2,
			"letter" : letter
		},
		url : "ehat/InventoryNewController/getDispachlist",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			SetDispachListTemp(r);
		}
	});
}

function SetDispachListTemp(r){
	 
	var index = 1;	
	var totAmt=0;
 
	var htm= ""	;
	for ( var i = 0; i < r.listInventoryNewDto.length;i++) {
	
		htm= htm
		+ "<tr id='div123'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_date+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-4'>"+ r.listInventoryNewDto[i].inv_purchase_invoice_master_Supplier_Name+"</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_no+"</td>"
		+ "<td style='height: 21.5px;text-align:right' class='col-md-1 center'>"+parseFloat(r.listInventoryNewDto[i].inv_purchase_invoice_master_final_total_net_amt).toFixed(2)+"</td>"
		+ "<td style='height: 21.5px;text-align:right' class='col-md-1'><input type='checkbox' class='recChk'></td>"
		
		+ "</tr>";	

 		index++; 		
 		totAmt=Number(totAmt)+Number(r.listInventoryNewDto[i].inv_purchase_invoice_master_final_total_net_amt);
 		
 	}
	
	$("#container").html(htm);
	$("#recTot").html(parseFloat(totAmt).toFixed(2));
	$("#remTot").html(parseFloat(totAmt).toFixed(2));
}

/************
* @author	: Vinod Udawant
* @date		: 29-Sept-2017
* @codeFor	: Get Patient Data
 ************/
function getPatientData() {
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var deptId = parseInt($("#deptId").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("deptId=" + deptId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchPatientsRecords",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(deptId == 1 || deptId == 3){
				var temp="";
				var tempHead="";
				
				tempHead=tempHead+'<tr>'
				+'<th style="height: 21.5px;width: 5%" >Sr.No.</th>'
				+'<th style="height: 21.5px;width: 10%" >Patient Id</th>'
				+'<th style="height: 21.5px;width: 10%" >OPD No</th>'
				+'<th style="height: 21.5px;width: 18%" >Patient Name</th>'	
				+'<th style="height: 21.5px;width: 10%" >Admit Date</th>	'
				+'<th style="height: 21.5px;width: 10%" >Admit Time</th>	'
				//+'<th style="height: 21.5px;width: 10%" >Discharge Date</th>'	
				+'<th style="height: 21.5px;width: 10%">Consulting Doctor</th>'	
				//+'<th style="height: 21.5px;width: 10%" >Company Name</th>	'
				+'<th style="height: 21.5px;width: 10%" >OPD Bill No</th>'																										
				+'</tr>';
				
				$("#containerHeader").html(tempHead);
				
				
				var dischrgPat=0;
				var admitPat=r.listRegTreBillDto.length;			
					
				if(r.listRegTreBillDto.length > 0){
					
					for(var i=0;i < r.listRegTreBillDto.length;i++){
							
						if(r.listRegTreBillDto[i].dischargeDate != "-"){
							
							dischrgPat=dischrgPat+1;
						}				
						
						var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						var patType="";
						if(r.listRegTreBillDto[0].sourceTypeId>0){
						
							patType = r.listRegTreBillDto[i].imageName;
							
			 			}else{
			 				
			 				patType="Self Paying";						
						}
						
						temp=temp+ '<tr>'
						+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].patientId+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '					
						+' <td style="height: 21.5px;width: 18%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
						+' <td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+dd[1]+'</td> '
						//+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].dischargeDate+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td>	'
						//+' <td style="height: 21.5px;width: 10%" >'+patType+'</td> '
						+' <td style="height: 21.5px;width: 10%" > '+r.listRegTreBillDto[i].billId+'</td>	'																								
						+' </tr>';							
					}
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 18%" >Total Patients</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+(r.listRegTreBillDto.length)+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					//+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					//+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					
					+' </tr>';
					
					/*temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 18%" >Total Discharge</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+(dischrgPat)+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';*/
					
					/*var totRem=Number(admitPat)-Number(dischrgPat);
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 18%" >Total Patients</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+totRem+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					//+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					//+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';*/
					
					$("#container").html(temp);
				}else{
					alert("No Record Found!!!");
					$("#container").empty("");
				}			 
			}else if(deptId == 2){


				var temp="";
				var tempHead="";
				
				tempHead=tempHead+'<tr>'
				+'<th style="height: 21.5px;width: 5%" >Sr.No.</th>'
				+'<th style="height: 21.5px;width: 10%" >Patient Id</th>'
				+'<th style="height: 21.5px;width: 10%" >IPD No</th>'
				+'<th style="height: 21.5px;width: 18%" >Patient Name</th>'	
				+'<th style="height: 21.5px;width: 10%" >Admit Date</th>	'
				+'<th style="height: 21.5px;width: 10%" >Admit Time</th>	'
				+'<th style="height: 21.5px;width: 10%" >Discharge Date</th>'	
				+'<th style="height: 21.5px;width: 10%">Consulting Doctor</th>'	
				+'<th style="height: 21.5px;width: 10%" >Company Name</th>	'
				+'<th style="height: 21.5px;width: 10%" >Ward Type</th>'																										
				+'</tr>';
				
				$("#containerHeader").html(tempHead);
				
				
				var dischrgPat=0;
				var admitPat=r.listRegTreBillDto.length;			
					
				if(r.listRegTreBillDto.length > 0){
					
					for(var i=0;i < r.listRegTreBillDto.length;i++){
							
						if(r.listRegTreBillDto[i].dischargeDate != "-"){
							
							dischrgPat=dischrgPat+1;
						}				
						
						var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						var patType="";
						var bedName="";
						if(r.listRegTreBillDto[i].sourceTypeId>0){
						
							patType = r.listRegTreBillDto[i].imageName;
							
			 			}else{
			 				
			 				patType="Self Paying";						
						}
						
						if(r.listRegTreBillDto[i].bedName == null || r.listRegTreBillDto[i].bedName =="null" || r.listRegTreBillDto[i].bedName =="NULL"){
							
							bedName = "-";
							
			 			}else{
			 				
			 				bedName=r.listRegTreBillDto[i].bedName;						
						}
						
						
						
						temp=temp+ '<tr>'
						+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].patientId+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '					
						+' <td style="height: 21.5px;width: 18%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
						+' <td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+dd[1]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].dischargeDate+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+patType+'</td> '
						+' <td style="height: 21.5px;width: 10%" > '+bedName+'</td>	'																								
						+' </tr>';							
					}
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 18%" >Total Admit</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+(r.listRegTreBillDto.length)+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					
					+' </tr>';
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 18%" >Total Discharge</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+(dischrgPat)+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';
					
					var totRem=Number(admitPat)-Number(dischrgPat);
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 18%" >Total Patients</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+totRem+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';
					
					$("#container").html(temp);
				}else{
					alert("No Record Found!!!");
					$("#container").empty("");
				}			 
			
			
			}else{

				var temp="";
				var tempHead="";
				
				tempHead=tempHead+'<tr>'
				+'<th style="height: 21.5px;width: 5%" >Sr.No.</th>'
				+'<th style="height: 21.5px;width: 10%" >Patient Id</th>'
				+'<th style="height: 21.5px;width: 10%" >OPD/IPD No</th>'
				+'<th style="height: 21.5px;width: 18%" >Patient Name</th>'	
				+'<th style="height: 21.5px;width: 10%" >Admit Date</th>	'
				+'<th style="height: 21.5px;width: 10%" >Admit Time</th>	'
				+'<th style="height: 21.5px;width: 10%" >Discharge Date</th>'	
				+'<th style="height: 21.5px;width: 10%">Consulting Doctor</th>'	
				+'<th style="height: 21.5px;width: 11%" >Ward Type</th>	'
				+'<th style="height: 21.5px;width: 10%" >OPD Bill No</th>'																										
				+'</tr>';
				
				$("#containerHeader").html(tempHead);
				
				
				var dischrgPat=0;
				var admitPat=r.listRegTreBillDto.length;			
					
				if(r.listRegTreBillDto.length > 0){
					
					for(var i=0;i < r.listRegTreBillDto.length;i++){
							
						if(r.listRegTreBillDto[i].dischargeDate != "-"){
							
							dischrgPat=dischrgPat+1;
						}				
						
						var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
						var dd=date.split(',');
						var patType="";
						var bedName="";
						var billNoForAll="";
						
						if(r.listRegTreBillDto[0].sourceTypeId>0){
						
							patType = r.listRegTreBillDto[i].imageName;
							
			 			}else{
			 				
			 				patType="Self Paying";						
						}
						
						if(r.listRegTreBillDto[i].bedName == null || r.listRegTreBillDto[i].bedName =="null" || r.listRegTreBillDto[i].bedName =="NULL"){
							
							bedName = "-";
							
			 			}else{
			 				
			 				bedName=r.listRegTreBillDto[i].bedName;						
						}
						
						if(deptId == 0){
						if(r.listRegTreBillDto[i].departmentId == 1 || r.listRegTreBillDto[i].departmentId == 3){
							
							billNoForAll=r.listRegTreBillDto[i].billId;	
							
			 			}else{			 			
			 				billNoForAll = "-";						
						}
						}
						
						temp=temp+ '<tr>'
						+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].patientId+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '					
						+' <td style="height: 21.5px;width: 18%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
						+' <td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+dd[1]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].dischargeDate+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td>	'
						+' <td style="height: 21.5px;width: 11%" >'+bedName+'</td> '
						+' <td style="height: 21.5px;width: 10%" > '+billNoForAll+'</td>	'																								
						+' </tr>';							
					}
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 18%" >Total Admit</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+(r.listRegTreBillDto.length)+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 11%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					
					+' </tr>';
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 18%" >Total Discharge</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+(dischrgPat)+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 11%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';
					
					var totRem=Number(admitPat)-Number(dischrgPat);
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 18%" >Total Patients</th> '	
					+' <th style="height: 21.5px;width: 10%" >'+totRem+'</th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 11%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';
					
					$("#container").html(temp);
				}else{
					alert("No Record Found!!!");
					$("#container").empty("");
				}			 
			
			}
			
 		}
	});	
}

function sponsorTypeList(callfrom)
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/registration/getSponsorTypeList",
		error:function(r){
			alert(r);
		},
    	success : function(r) {
    		 console.log(r);
    		setTemplateForSponsorTypeList(r,callfrom);   		
		}
	});
}


//@author :Sagar Kadam @date: 17-Jun-2017 @reason : To set Charges master   list
function setTemplateForSponsorTypeList(r,callFrom){

	for ( var int = 0; int < r.lstCharges.length; int++) {
		
		if(callFrom==r.lstCharges[int].chargesId){
			$("#billCategoty").text(r.lstCharges[int].chargesName);
 		}			
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 01-Jan-2017
* @codeFor	: Get Ipd Patient Data
 ************/
function getIpdPatientData() {
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchIpdPatientsRecords",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var temp="";
			var finalTotBill=0,finalTotPaid=0,finalTotBal=0;
			
			if(r.listRegTreBillDto.length > 0){
				
				for(var i=0;i < r.listRegTreBillDto.length;i++){
											
					var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
					var dd=date.split(',');
					var patType="";
					var catType="";
					
					var totBill = r.listRegTreBillDto[i].totBill;
					var totPaid = r.listRegTreBillDto[i].totPaid;
					var totBal = Number(totBill)-Number(totPaid);
					
					finalTotBill=Number(finalTotBill)+Number(totBill);
					finalTotPaid=Number(finalTotPaid)+Number(totPaid);
					finalTotBal=Number(finalTotBal)+Number(totBal);
					
					var spId=r.listRegTreBillDto[i].chargesMasterSlaveId;
					
					if(spId > 0){					
						
						patType=r.listRegTreBillDto[i].imageName;
						catType="Sponsor";
		 			}else{
		 				
		 				patType="Self Paying";		
		 				catType="Hospital";
					}
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;width: 7%" >'+catType+'</td> '
					+' <td style="height: 21.5px;width: 12%" >'+patType+'</td> '
					+' <td style="height: 21.5px;width: 11%" >'+r.listRegTreBillDto[i].bedName+'</td>	'
					+' <td style="height: 21.5px;width: 7%" >'+r.listRegTreBillDto[i].trcount+'</td> '
					+' <td style="height: 21.5px;width: 17%" >'+r.listRegTreBillDto[i].patientName+'</td>	'
					+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].address+'</td>	'				
					+' <td style="height: 21.5px;width: 10%" >'+parseFloat(totBill).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totPaid).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totBal).toFixed(2)+'</td> '	
					+' <td style="height: 21.5px;width: 6%" >'+dd[0]+'</td> '
					+' <td style="height: 21.5px;width: 12%" >No</td> '																							
					+' </tr> ';						
				}	
				
				temp=temp+ '<tr> '
				+' <th style="height: 21.5px;width: 7%" ></th> '
				+' <th style="height: 21.5px;width: 12%" ></th> '
				+' <th style="height: 21.5px;width: 11%" ></th>	'
				+' <th style="height: 21.5px;width: 7%" ></th> '
				+' <th style="height: 21.5px;width: 17%" ></th>	'
				+' <th style="height: 21.5px;width: 10%" ></th>	'				
				+' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotBill).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalTotPaid).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalTotBal).toFixed(2)+'</th> '	
				+' <th style="height: 21.5px;width: 6%" ></th> '
				+' <th style="height: 21.5px;width: 12%" ></th> '																							
				+' </tr> ';	
				
				$("#container").html(temp);
			}			 
 		}
	});	
}

/***********
* @author	: Vinod Udawant
* @date		: 10-Oct-2016
* @codeFor	: Close & Print diagnosis Hisab
************/
function getXML(){
		
	var recTot = $("#recTot").html();	
	var inputs = [];	
	inputs.push('recTot=' + recTot);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "XMLServlet",
		timeout : 1000 * 60 * 6,
		cache	: false,
		success : function(r) {
				
			alert("XML Report Generated succesufully...");
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 25-Oct-2017
* @codeFor	: Fetch profees hisab
*************/
function fetchProFeesHisab(callFrom) {

	var unitId = parseInt($("#unitId").val());
	var userId = parseInt($("#userId").val());	
	var deptId = parseInt($("#deptId").val());;
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var drId = $('#drId').val();
	var fromToRange=0;
	if($("#chkFromTo").is(":checked")){
		
		fromToRange=1;
	}else{
		
		fromToRange=0;
	}
	
	var inputs = [];
	inputs.push("unitId=" + unitId);
	inputs.push("userId=" + userId);
	inputs.push('deptId=' + deptId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('drId=' + drId);
	inputs.push('fromToRange=' + fromToRange);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchProFeesHisab",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			
			setProfeesHisabTemp(r);
		}
	});
}

function setProfeesHisabTemp(r){
		
	var temp="";
	var totHosp=0,totPf=0,totPfPaid=0,totFixInc=0;
	for(var i=0;i<r.listVoucher.length;i++){
		
		var hospAmt=r.listVoucher[i].totalHospAmount;
		var pfAmt=r.listVoucher[i].totalPfAmount;
		var pfPaid=r.listVoucher[i].totalPfPaid;
		var fixedIncome=r.listVoucher[i].fixedIncome;
		
		temp=temp + "<tr>" 
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+(i+1)+"</td>" 
		+ "<td style='height: 21.5px;' class='numeric col-md-3'>"+r.listVoucher[i].doctorName+"</td>" 
		/*+ "<td style='height: 21.5px;' class='numeric col-md-2'>"+parseFloat(pfAmt).toFixed(2)+"</td>" 
		+ "<td style='height: 21.5px;' class='numeric col-md-2'>"+parseFloat(hospAmt).toFixed(2)+"</td>"*/ 
		+ "<td style='height: 21.5px;' class='numeric col-md-2'>"+parseFloat(pfPaid).toFixed(2)+"</td>" 
		+ "<td style='height: 21.5px;' class='numeric col-md-3'><input type='checkbox' id='chkFInc"+i+"' onclick='setFixedIncome("+i+")'><input type='text' id='txtfInc"+i+"' class='col-md-9' value='"+parseFloat(fixedIncome).toFixed(2)+"'></td>" 
		+ "<td style='height: 21.5px;' class='numeric col-md-2'>"+parseFloat(pfPaid).toFixed(2)+"</td>" 
		+ "<td style='height: 21.5px;' class='numeric col-md-1'><input type='checkbox' class='recChk' value='0'></td>"
		+ '</tr>';
		
		totHosp=Number(totHosp)+Number(hospAmt);
		totPf=Number(totPf)+Number(pfAmt);
		totPfPaid=Number(totPfPaid)+Number(pfPaid);		
		totFixInc=Number(totFixInc)+Number(fixedIncome);		
	}

	$("#tableTestDash").html(temp);
	//$("#hospTot").html(totHosp);
	$("#hospTot").html(totFixInc);
	$("#pfTot").html(totPf);
	$("#pfPaidTot").html(totPfPaid);	
}

function setFixedIncome(id){
			
	var pfPaid=$('#tblProfees tr:eq('+id+') > td:eq(2)').text();
	var fixInc=$('#txtfInc'+id).val();
	var finalPf=$('#tblProfees tr:eq('+id+') > td:eq(4)').text();
	
	if($("#chkFInc"+id).is(":checked")){
		
		finalPf=Number(finalPf)-Number(fixInc);
		if(finalPf<0){
			finalPf=0.0;
		}
	}else{
		
		finalPf=pfPaid;
	}
		
	$('#tblProfees tr:eq('+id+') > td:eq(4)').text(parseFloat(finalPf).toFixed(2));
	
}

function countProfeesTotals(){
	
	var pfPaid=$('#tblProfees tr:eq('+id+') > td:eq(2)').text();
	var fixInc=$('#txtfInc'+id).val();
	var finalPf=$('#tblProfees tr:eq('+id+') > td:eq(4)').text();
	
	if($("#chkFInc"+id).is(":checked")){
		
		finalPf=Number(finalPf)-Number(fixInc);
		if(finalPf<0){
			finalPf=0.0;
		}
	}else{
		
		finalPf=pfPaid;
	}
		
	$('#tblProfees tr:eq('+id+') > td:eq(4)').text(parseFloat(finalPf).toFixed(2));
	
}

/************
* @author	: Vinod Udawant
* @date		: 06-Feb-2018
* @codeFor	: Create Finance Graphs
*************/
function showGraphs(){
		
	// First Month 
	//$("#fromDate").val(firstFrom);
	//$("#lastDate").val(firstTo);	
	getFinaceDetails('hisab',3);	
	var totRecDiag=$("#totRec").val();
	var totRefDiag=$("#totRef").val();
	var totCashDiag=$("#totCash").val();
	
	var barChartData = {
			labels : ["Total Receipt","Total Refund","Total Cash"],
			datasets : [
				{
					fillColor : "rgba(233, 78, 2, 0.9)",
					strokeColor : "rgba(233, 78, 2, 0.9)",
					highlightFill: "#e94e02",
					highlightStroke: "#e94e02",
					data : [totRecDiag,totRefDiag,totCashDiag]
				},
				{
					fillColor : "rgba(79, 82, 186, 0.9)",
					strokeColor : "rgba(79, 82, 186, 0.9)",
					highlightFill: "#4F52BA",
					highlightStroke: "#4F52BA",
					data : [totRecDiag,totRefDiag,totCashDiag]
				},
				{
					fillColor : "rgba(242, 179, 63, 1)",
					strokeColor : "rgba(242, 179, 63, 1)",
					highlightFill: "#F2B33F",
					highlightStroke: "#F2B33F",
					data : [totRecDiag,totRefDiag,totCashDiag]
				}
			]			
		};	
	
	getFinaceDetails('hisab',1);	
	var totRecOpd=$("#totRec").val();
	var totRefOpd=$("#totRef").val();
	var totCashOpd=$("#totCash").val();
	var lineChartData = {
			labels : ["Total Receipt","Total Refund","Total Cash"],
			datasets : [
				{
					fillColor : "rgba(242, 179, 63, 1)",
					strokeColor : "#F2B33F",
					pointColor : "rgba(242, 179, 63, 1)",
					pointStrokeColor : "#fff",
					data : [totRecOpd,totRefOpd,totCashOpd]

				}
				/*{
					fillColor : "rgba(97, 100, 193, 1)",
					strokeColor : "#6164C1",
					pointColor : "rgba(97, 100, 193,1)",
					pointStrokeColor : "#9358ac",
					data : [totRecOpd,totRefOpd,totCashOpd]

				}*/
			]			
		};
	
	getFinaceDetails('hisab',2);	
	var totRecIpd=$("#totRec").val();
	var totRefIpd=$("#totRef").val();
	var totCashIpd=$("#totCash").val();
	var pieData = [
					{
						value: totRecIpd,
						color:"rgba(233, 78, 2, 1)",
						label: "Total Receipt"
					},
					{
						value : totRefIpd,
						color : "rgba(242, 179, 63, 1)",
						label: "Total Refund"
					},
					{
						value : totCashIpd,
						color : "rgba(88, 88, 88,1)",
						label: "Total Cash"
					},					
					
			];
	
	new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
	new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
	new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData);
	
	var totalRec=Number(totRecDiag)+Number(totRecOpd)+Number(totRecIpd);
	var totalRef=Number(totRefDiag)+Number(totRefOpd)+Number(totRefIpd);
	var totalCash=Number(totCashDiag)+Number(totCashOpd)+Number(totCashIpd);
	
	var htm="<tr><td>Total Receipt</td>" 
			+ "<td>"+totRecDiag+"</td>" 
			+ "<td>"+totRecOpd+"</td> "
			+ "<td>"+totRecIpd+"</td> "
			+ "<td>"+parseFloat(totalRec).toFixed(2)+"</td></tr> "
			+ "<tr><td>Total Refund</td>"
			+ "<td>"+totRefDiag+"</td>" 
			+ "<td>"+totRefOpd+"</td> "
			+ "<td>"+totRefIpd+"</td> "
			+ "<td>"+parseFloat(totalRef).toFixed(2)+"</td></tr> "
			+ "<tr><td>Total Cash</td>"
			+ "<td>"+totCashDiag+"</td>" 
			+ "<td>"+totCashOpd+"</td> "
			+ "<td>"+totCashIpd+"</td> "
			+ "<td>"+parseFloat(totalCash).toFixed(2)+"</td></tr> ";
	
	$("#hisabDetails").html(htm);	
	
}


/*function showGraphs(){
	
	// Current Month 
	var d = new Date();	
	var dd = d.getDate();	
	var mm = ("0" + (d.getMonth() + 1)).slice(-2);
	var yy = d.getFullYear();
	
	//var currentDate=yy+"-"+mm+"-"+dd;
	
	var firstFrom=yy+"-"+mm+"-"+"01";
	var firstTo=yy+"-"+mm+"-"+"30";
	
	var secoundFrom=yy+"-"+(mm-1)+"-"+"01";
	var secoundTo=yy+"-"+(mm-1)+"-"+"30";
	
	var thirdFrom=yy+"-"+(mm-2)+"-"+"01";
	var thirdTo=yy+"-"+(mm-2)+"-"+"30";
	
	var fourthFrom=yy+"-"+(mm-3)+"-"+"01";
	var fourthTo=yy+"-"+(mm-3)+"-"+"30";
	
	// First Month 
	$("#fromDate").val(firstFrom);
	$("#lastDate").val(firstTo);	
	getFinaceDetails('hisab',3);	
	var totRec1=$("#totRec").val();
	var totRef1=$("#totRef").val();
	var totCash1=$("#totCash").val();
	
	// Second Month 
	$("#fromDate").val(secoundFrom);
	$("#lastDate").val(secoundTo);	
	getFinaceDetails('hisab',3);	
	var totRec2=$("#totRec").val();
	var totRef2=$("#totRef").val();
	var totCash2=$("#totCash").val();
	
	// Third Month 
	$("#fromDate").val(thirdFrom);
	$("#lastDate").val(thirdTo);	
	getFinaceDetails('hisab',3);	
	var totRec3=$("#totRec").val();
	var totRef3=$("#totRef").val();
	var totCash3=$("#totCash").val();
	
	// Fourth Month 
	$("#fromDate").val(fourthFrom);
	$("#lastDate").val(fourthTo);	
	getFinaceDetails('hisab',3);	
	var totRec4=$("#totRec").val();
	var totRef4=$("#totRef").val();
	var totCash4=$("#totCash").val();
	
	var firstMonth = getMonthName(mm-1);
	var secondMonth = getMonthName(mm-2);
	var thirdMonth = getMonthName(mm-3);
	var fourthMonth = getMonthName(mm-4);
	
	var barChartData = {
			labels : [firstMonth,secondMonth,thirdMonth,fourthMonth],
			datasets : [
				{
					fillColor : "rgba(233, 78, 2, 0.9)",
					strokeColor : "rgba(233, 78, 2, 0.9)",
					highlightFill: "#e94e02",
					highlightStroke: "#e94e02",
					data : [totRec1,totRec2,totRec3,totRec4]
				},
				{
					fillColor : "rgba(79, 82, 186, 0.9)",
					strokeColor : "rgba(79, 82, 186, 0.9)",
					highlightFill: "#4F52BA",
					highlightStroke: "#4F52BA",
					data : [totRef1,totRef2,totRef3,totRef4]
				},
				{
					fillColor : "rgba(242, 179, 63, 1)",
					strokeColor : "rgba(242, 179, 63, 1)",
					highlightFill: "#F2B33F",
					highlightStroke: "#F2B33F",
					data : [totCash1,totCash2,totCash3,totCash4]
				}
			]			
		};	
	
	var lineChartData = {
			labels : [firstMonth,secondMonth,thirdMonth,fourthMonth],
			datasets : [
				{
					fillColor : "rgba(242, 179, 63, 1)",
					strokeColor : "#F2B33F",
					pointColor : "rgba(242, 179, 63, 1)",
					pointStrokeColor : "#fff",
					data : [70,60,72,61,75,59,80]

				},
				{
					fillColor : "rgba(97, 100, 193, 1)",
					strokeColor : "#6164C1",
					pointColor : "rgba(97, 100, 193,1)",
					pointStrokeColor : "#9358ac",
					data : [50,65,51,67,52,64,50]

				}
			]			
		};
	
	var pieData = [
					{
						value: 90,
						color:"rgba(233, 78, 2, 1)",
						label: "Product 1"
					},
					{
						value : 50,
						color : "rgba(242, 179, 63, 1)",
						label: "Product 2"
					},
					{
						value : 60,
						color : "rgba(88, 88, 88,1)",
						label: "Product 3"
					},
					{
						value : 40,
						color : "rgba(79, 82, 186, 1)",
						label: "Product 4"
					}
					
			];
	
	new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
	new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
	new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData);
}*/

function getMonthName(monthNumber){
	
	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "Aug";
	month[8] = "Sept";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";
	return month[monthNumber];
}

/************
* @author	: Vinod Udawant
* @date		: 06-Feb-2018
* @codeFor	: Create Finance Graphs
*************/
function createGraphs(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchOpdDiagnoRec",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
						
			setGraphTemp(r);		
		}	
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 06-Feb-2018
* @codeFor	: Create Finance Graphs
*************/
function setGraphTemp(res){
	
	
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getOpdDiagnoPatientData(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchOpdDiagnoPatients",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setOpdDiagnoPatientData(r);			
		}
	});
}

function setOpdDiagnoPatientData(r){
	
	var temp="";
	var totPrice=0,totAmount=0,totConcession=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totPrice=Number(totPrice)+Number(r.lstOpdDiagno[i].price);
			totAmount=Number(totAmount)+Number(r.lstOpdDiagno[i].amount);
			totConcession=Number(totConcession)+Number(r.lstOpdDiagno[i].concession);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');					
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].billId+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].mobile+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].discount).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].sourceName+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].sourceGroup+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].categoryName+'</td> '					
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].serviceName+'</td> '						
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].price).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].qty+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].amount).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].concession).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].treatDr+'</td> '						
				+ ' <td style="height: 21.5px;width: 2%">'+parseFloat(r.lstOpdDiagno[i].cost).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].sponsorName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].user+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '			
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
			+ ' <th style="height: 21.5px;width: 5%"></th> '		
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totPrice).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '		
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totAmount).toFixed(2)+'</th> '		
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totConcession).toFixed(2)+'</th> '		
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 2%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
		+' </tr>';			
	}	
	$("#container").html(temp);		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno Receipts
*************/
function getOpdDiagnoRecData(callFrom){
	
	var callF=callFrom;
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var payMode = parseInt($("#payModeId").val());	
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("payMode=" + payMode);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchOpdDiagnoRec",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(callFrom == "general"){
				
				setOpdDiagnoRecData(r);
			}else{
				
				setOpdDiagnoDeletedRecData(r);
			}
		}
	});
}

function setOpdDiagnoRecData(r){
	
	var temp="";
	var totAmt=0;
	if(r.lstOpdDiagnoRec.length > 0){
		
		for(var i=0;i < r.lstOpdDiagnoRec.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagnoRec[i].recAmt);
			
			var recDate=new Date(r.lstOpdDiagnoRec[i].recDate).toLocaleDateString('en-GB');	
			var billDate="";
			if(r.lstOpdDiagnoRec[i].billDate==null){
				billDate="-";
			}else{
				billDate=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleDateString('en-GB');
				
			}

			//var billDate=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleDateString('en-GB');	
			
			var refDr=r.lstOpdDiagnoRec[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			var treatDr=r.lstOpdDiagnoRec[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			
			var userName=r.lstOpdDiagnoRec[i].user;
			if(userName==null){
				userName="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+recDate+'</td> '																	
				+ ' <td style="height: 21.5px;width: 17%">'+r.lstOpdDiagnoRec[i].patientName+'</td> '																			
				+ ' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstOpdDiagnoRec[i].recAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].payMode+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].cardChqNo+'</td> '	
				/*+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].expiry+'</td> '*/
				+ ' <td style="height: 21.5px;width: 12%">'+r.lstOpdDiagnoRec[i].bank+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 8%">'+billDate+'</td> '		
				+ ' <td style="height: 21.5px;width: 8%">'+r.lstOpdDiagnoRec[i].source+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 10%">'+userName+'</td> ' 
/*				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagnoRec[i].unitName+'</td> ' 
*/			+ ' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '																	
			+ ' <th style="height: 21.5px;width: 17%"></th> '																			
			+ ' <th style="height: 21.5px;width: 7%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			/*+ ' <th style="height: 21.5px;width: 5%"></th> '*/
			+ ' <th style="height: 21.5px;width: 12%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
/*			+ ' <th style="height: 21.5px;width: 10%"></th> '	
*/		+' </tr>';		
	}
	$("#container").html(temp);		
}

function setOpdDiagnoDeletedRecData(r){
	
	var temp="";
	var totAmt=0;
	if(r.lstOpdDiagnoRec.length > 0){
		
		for(var i=0;i < r.lstOpdDiagnoRec.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagnoRec[i].recAmt);
			
			var recDate=new Date(r.lstOpdDiagnoRec[i].recDate).toLocaleDateString('en-GB');	
			var billDate="";
			if(r.lstOpdDiagnoRec[i].billDate==null){
				billDate="-";
			}else{
				billDate=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleDateString('en-GB');
				
			}
			var deletedDate="-";
			var deletedTime="-";
				
			if(r.lstOpdDiagnoRec[i].deletedDate != null){
				
				deletedDate = new Date(r.lstOpdDiagnoRec[i].deletedDate).toLocaleDateString('en-GB');
				deletedTime = new Date(r.lstOpdDiagnoRec[i].deletedDate).toLocaleTimeString('en-GB');
			}	
			
			deletedDate = deletedDate + " " + deletedTime;
			
			var refDr=r.lstOpdDiagnoRec[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			var treatDr=r.lstOpdDiagnoRec[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			
			var userName=r.lstOpdDiagnoRec[i].user;
			if(userName==null){
				userName="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+recDate+'</td> '																	
				+ ' <td style="height: 21.5px;width: 12%">'+r.lstOpdDiagnoRec[i].patientName+'</td> '																			
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagnoRec[i].recAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].payMode+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].cardChqNo+'</td> '	
				/*+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].expiry+'</td> '*/
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagnoRec[i].bank+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '		
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagnoRec[i].source+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 10%">'+userName+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 7%">'+deletedDate+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagnoRec[i].deletedBy+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagnoRec[i].deletedRemark+'</td> ' 	
/*				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].unitName+'</td> ' 
*/			+ ' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '																	
			+ ' <th style="height: 21.5px;width: 12%"></th> '																			
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			/*+ ' <th style="height: 21.5px;width: 5%"></th> '*/
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
/*			+ ' <th style="height: 21.5px;width: 7%"></th> '	
*/		+' </tr>';		
	}
	$("#container").html(temp);		
}


/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getBillRegisterReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var source = parseInt($("#sourceType").val());	
	var sponsorId=0;
	
	//For Hall Wise Id  
	var sponsorF = $("#lisH0").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItemsinfo li").length;
	sponsorL = $("#lisH" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}
	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("source=" + source);	
	inputs.push("sponsorId=" + sponsorId);
	inputs.push("sponsorF=" + sponsorF);
	inputs.push("sponsorL=" + sponsorL);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getBillRegisterReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setBillRegisterReport(r);
		}
	});
}
/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setBillRegisterReport(r){
	
	var temp="";
	var totAmt=0,totPaid=0,totDisc=0,totRem=0;
	
	if(r.lstBillReg.length > 0){
		
		for(var i=0;i < r.lstBillReg.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstBillReg[i].totAmt);
			totPaid=Number(totPaid)+Number(r.lstBillReg[i].paidAmt);
			totDisc=Number(totDisc)+Number(r.lstBillReg[i].discAmt);
			totRem=Number(totRem)+Number(r.lstBillReg[i].remainAmt);
			
			var recDate=new Date(r.lstBillReg[i].recDate).toLocaleDateString('en-GB');	
			var refDr=r.lstBillReg[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 4%">'+recDate+'</td> '																	
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].mobile+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 18%">'+r.lstBillReg[i].serviceName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].gstAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '				
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].source+'</td> '
				+ ' <td style="height: 21.5px;width: 9%">'+r.lstBillReg[i].sponsorName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstBillReg[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '																	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 18%"></th> '			
			+ ' <th style="height: 21.5px;width: 5%">0</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+ parseFloat(totAmt).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%">'+ parseFloat(totDisc).toFixed(2)+'</th> ' 
			+ ' <th style="height: 21.5px;width: 5%">'+ parseFloat(totPaid).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+ parseFloat(totRem).toFixed(2)+'</th> '			
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 9%"></th> '			
			+ ' <th style="height: 21.5px;width: 7%"></th> '
		+' </tr>';		
	}
	$("#container").html(temp);		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getOutstandingReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getOutstandingReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setOutstandingReport(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setOutstandingReport(r){
	
	var temp="";
	var totAmt=0,totPaid=0,totDisc=0,totRem=0;
	
	if(r.lstBillReg.length > 0){
		
		for(var i=0;i < r.lstBillReg.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstBillReg[i].totAmt);
			totPaid=Number(totPaid)+Number(r.lstBillReg[i].paidAmt);
			totDisc=Number(totDisc)+Number(r.lstBillReg[i].discAmt);
			totRem=Number(totRem)+Number(r.lstBillReg[i].remainAmt);
			
			var billDate=new Date(r.lstBillReg[i].billDate).toLocaleDateString('en-GB');					
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].billNo+'</td> '
				/*+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].recNo+'</td> '*/
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '																		
				+ ' <td style="height: 21.5px;width: 17%">'+r.lstBillReg[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].mobile+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].source+'</td> '																		
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '																				
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].authority+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].userName+'</td> '	
				+ ' <td style="height: 21.5px;width: 13%">'+r.lstBillReg[i].sponsorName+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].remark+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].unitName+'</td> '	
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			/*+ ' <th style="height: 21.5px;width: 4%"></th> '*/
			+ ' <th style="height: 21.5px;width: 5%"></th> '																		
			+ ' <th style="height: 21.5px;width: 17%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '																		
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '																				
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totRem).toFixed(2)+'</th> '		
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 13%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
		+' </tr>';		
	}
	$("#container").html(temp);		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getIpdBillStatus(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getIpdBillStatus",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setIpdBillStatus(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setIpdBillStatus(r){
	
	var temp="";
	var finalTotBill = 0;
	var finalTotPaid = 0;
	var finalTotBal = 0;
	var finalTotAdv = 0;
	if(r.listRegTreBillDto.length > 0){
		
		for(var i=0;i < r.listRegTreBillDto.length;i++){
									
			var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
			var dd=date.split(',');			
			var totBill = r.listRegTreBillDto[i].totBill;
			var totPaid = r.listRegTreBillDto[i].totPaid;
			var totBal = Number(totBill)-Number(totPaid);
			var totDisc = r.listRegTreBillDto[i].totDisc;
			var totAdv = Number(totBal)-Number(totDisc);
			
			if(totBal < 0){
				
				totBal=0;
			}
			
			if(totAdv < 0){
				
				totAdv=0;
			}
			
			finalTotBill=Number(finalTotBill)+Number(totBill);			
			finalTotPaid=Number(finalTotPaid)+Number(totPaid);		
			finalTotAdv=Number(finalTotAdv)+Number(totAdv);		
						
			if(totBal<0){
				
				totBal=0;
			}
			
			temp=temp+ '<tr> '
			+ ' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '
			+ ' <td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '
			+ ' <td style="height: 21.5px;width: 15%" >'+r.listRegTreBillDto[i].bedName+'</td> '																			
			+ ' <td style="height: 21.5px;width: 25%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
			+ ' <td style="height: 21.5px;width: 10%" >'+parseFloat(totPaid).toFixed(2)+'</td> '																		
			+ ' <td style="height: 21.5px;width: 10%" >'+parseFloat(totBill).toFixed(2)+'</td> '
			+ ' <td style="height: 21.5px;width: 10%" >'+parseFloat(totBal).toFixed(2)+'</td>	'
			+ ' <td style="height: 21.5px;width: 10%" >'+parseFloat(totAdv).toFixed(2)+'</td> '																							
			+ ' </tr> ';						
		}	
		
		finalTotBal=Number(finalTotBill) - Number(finalTotPaid);
		
		temp=temp+ '<tr> '
		+ ' <th style="height: 21.5px;width: 10%" ></th> '
		+ ' <th style="height: 21.5px;width: 10%" ></th> '
		+ ' <th style="height: 21.5px;width: 15%" ></th> '																			
		+ ' <th style="height: 21.5px;width: 25%" >Total</th> '	
		+ ' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotPaid).toFixed(2)+'</th> '																		
		+ ' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotBill).toFixed(2)+'</th> '
		+ ' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotBal).toFixed(2)+'</th>	'
		+ ' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotAdv).toFixed(2)+'</th> '																							
		+ ' </tr> ';	
		
		$("#container").html(temp);
	}		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getIpdWaitingBill(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getIpdWaitingBill",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setIpdWaitingBill(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setIpdWaitingBill(r){
	
	var temp="";
	var avg=0,totMin=0,count=0;
	if(r.listRegTreBillDto.length > 0){
				
		for(var k=0;k < r.listRegTreBillDto[0].listDistDates.length;k++){
			
			var compDate=r.listRegTreBillDto[0].listDistDates[k];
			
			temp=temp+ '<tr style="border:none"> '
			+ '<th style="height: 21.5px;width: 10%" ></th> '
			+ '<th style="height: 21.5px;width: 10%" ></th> '
			+ '<th style="height: 21.5px;width: 10%" >'+compDate+'</th> '																			
			+ '<th style="height: 21.5px;width: 7%" ></th> '	
			+ '<th style="height: 21.5px;width: 7%" ></th> '
			+ '<th style="height: 21.5px;width: 5%" ></th> '
			+ '<th style="height: 21.5px;width: 10%" ></th> '	
			+ '<th style="height: 21.5px;width: 19%" ></th> '	
			+ '<th style="height: 21.5px;width: 22%" ></th> '
			+ ' </tr> ';
			
			for(var i=0;i < r.listRegTreBillDto.length;i++){
				
				var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');				
				var recDate=new Date(r.listRegTreBillDto[i].recCreatedDateTime).toLocaleString('en-GB');			
				var token=r.listRegTreBillDto[i].token;				
				var difference=0;				
				if(token > 0){
					
					var sDate=new Date(r.listRegTreBillDto[i].createdDateTime);				
					var eDate=new Date(r.listRegTreBillDto[i].recCreatedDateTime);					
					difference = eDate - sDate; 
					difference = difference / 60 / 1000;
					count++;
				}else{
					
					difference=0;
				}				
				
				var dd=date.split(',');					
				var recDd=recDate.split(',');	
				var totBill = r.listRegTreBillDto[i].totBill;
				var totPaid = r.listRegTreBillDto[i].totPaid;
				var totBal = Number(totBill)-Number(totPaid);
				var cashCredit="Cash";
				if(totBal>0){
					
					cashCredit="Credit";
				}
				
				var patType="";
				var catType="";
					
				if(r.listRegTreBillDto[0].sourceTypeId>0){
				
					patType=r.listRegTreBillDto[i].imageName;
					catType="Sponsor";
	 			}else{
	 				
	 				patType="Self Paying";		
	 				catType="Hospital";
				}
				
				/*temp=temp+ '<tr> '
				+ ' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '
				+ ' <td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '
				+ ' <td style="height: 21.5px;width: 15%" >'+r.listRegTreBillDto[i].bedName+'</td> '																			
				+ ' <td style="height: 21.5px;width: 25%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%" >'+totBill+'</td> '																		
				+ ' <td style="height: 21.5px;width: 10%" >'+totPaid+'</td> '
				+ ' <td style="height: 21.5px;width: 10%" >'+totBal+'</td>	'
				+ ' <td style="height: 21.5px;width: 10%" >'+totBal+'</td> '																							
				+ ' </tr> ';*/	
				
				if(dd[0]==compDate){
									
					temp=temp+ '<tr> '
					+ '<td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].invoiceCount+'</td> '
					+ '<td style="height: 21.5px;width: 10%" >'+cashCredit+'</td> '
					+ '<td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '																			
					+ '<td style="height: 21.5px;width: 7%" >'+dd[1]+'</td> ';
					if(token > 0){
						
						temp=temp + '<td style="height: 21.5px;width: 7%" >'+recDd[1]+'</td> ';
					}else{
						
						temp=temp + '<td style="height: 21.5px;width: 7%" > - </td> ';
					}
					
					temp=temp + '<th style="height: 21.5px;width: 5%" >'+parseFloat(difference).toFixed(2)+'</th> '
					+ '<td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '	
					+ '<td style="height: 21.5px;width: 19%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
					+ '<td style="height: 21.5px;width: 22%" >'+patType+' [ '+catType+' ]</td> '
					+ ' </tr> ';				
				}	
				
				totMin=Number(totMin)+Number(difference);
			}
		}		
		if(count > 0){
			
			avg=Number(totMin)/Number(count);
		}
		
		temp=temp+ '<tr style="border:none"> '
		+ '<th style="height: 21.5px;width: 10%" ></th> '
		+ '<th style="height: 21.5px;width: 10%" ></th> '
		+ '<th style="height: 21.5px;width: 10%" ></th> '																			
		+ '<th style="height: 21.5px;width: 7%" ></th> '	
		+ '<th style="height: 21.5px;width: 7%" >Avg</th> '
		+ '<th style="height: 21.5px;width: 5%" >'+parseFloat(avg).toFixed(2)+'</th> '
		+ '<th style="height: 21.5px;width: 10%" ></th> '	
		+ '<th style="height: 21.5px;width: 19%" ></th> '	
		+ '<th style="height: 21.5px;width: 22%" ></th> '
		+ ' </tr> ';
		
		$("#container").html(temp);
	}		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
/*function getHeadwiseReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getHeadwiseReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setHeadwiseReport(r);
		}
	});
}*/

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
/*function setHeadwiseReport(r){
	
	var temp="";
	if(r.lstBillrpt.length > 0){
		
		for(var i=0;i < r.lstBillrpt.length;i++){
			
			temp=temp+ '<tr> '
			+ ' <td style="height: 21.5px;width: 10%" >'+r.lstBillrpt[i].ipdno+'</td> '
			+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientName+'</td> '
			+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientType+'</td> '																			
			+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].doctorName+'</td>	'
			+ ' <td style="height: 21.5px;width: 15%" >'+r.lstBillrpt[i].charges+'</td>	'																						
			+ ' </tr> ';						
		}	
		
		$("#container").html(temp);
	}		
}*/

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getHeadwiseReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var servId = parseInt($("#servId").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("servId=" + servId);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getHeadwiseReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setHeadwiseReport(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setHeadwiseReport(r){
	
	var temp="";
	var finalTot=0;
	if(r.lstBillrpt.length > 0){
		
		for(var j=0;j < r.lstBillrpt[0].lstServIds.length;j++){
			
			var servId = r.lstBillrpt[0].lstServIds[j];
			var servName = r.lstBillrpt[0].lstServNames[j];
			var servTot=0;
			
			temp=temp + '<tr> '
				+ ' <th style="height: 21.5px;width: 10%" ></th> '
				+ ' <th style="height: 21.5px;width: 25%" >'+servName+'</th> '
				+ ' <th style="height: 21.5px;width: 25%" ></th>	'																		
				+ ' <th style="height: 21.5px;width: 25%" ></th> '	
				+ ' <th style="height: 21.5px;width: 15%" ></th> '		
				+ ' </tr> ';			
			for(var i=0;i < r.lstBillrpt.length;i++){
								
				if(servId==r.lstBillrpt[i].servId){
					
					temp=temp + '<tr> '
					+ ' <td style="height: 21.5px;width: 10%" >'+r.lstBillrpt[i].ipdno+'</td> '
					+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientName+'</td> '
					+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientType+'</td> '																			
					+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].doctorName+'</td>	'
					+ ' <td style="height: 21.5px;width: 15%" >'+parseFloat(r.lstBillrpt[i].charges).toFixed(2)+'</td>	'																						
					+ ' </tr> ';	
					
					servTot=Number(servTot)+Number(r.lstBillrpt[i].charges);					
				}					
			}	
			
			temp=temp + '<tr> '
			+ ' <th style="height: 21.5px;width: 10%" ></th> '
			+ ' <th style="height: 21.5px;width: 25%" ></th> '
			+ ' <th style="height: 21.5px;width: 25%" ></th> '																			
			+ ' <th style="height: 21.5px;width: 25%" >Total</th>	'
			+ ' <th style="height: 21.5px;width: 15%" >'+parseFloat(servTot).toFixed(2)+'</th>	'																						
			+ ' </tr> ';
			
			finalTot=Number(finalTot)+Number(servTot);
			
			//$("#container").html(temp);			
		}	
		
		temp=temp + '<tr> '
		+ ' <th style="height: 21.5px;width: 10%" ></th> '
		+ ' <th style="height: 21.5px;width: 25%" ></th> '
		+ ' <th style="height: 21.5px;width: 25%" ></th> '																			
		+ ' <th style="height: 21.5px;width: 25%" >Final Total</th>	'
		+ ' <th style="height: 21.5px;width: 15%" >'+parseFloat(finalTot).toFixed(2)+'</th>	'																						
		+ ' </tr> ';
		
		$("#container").html(temp);		
	}	
	
	/*var temp="";
	if(r.lstBillrpt.length > 0){
		
		for(var i=0;i < r.lstBillrpt.length;i++){
			
			temp=temp+ '<tr> '
			+ ' <td style="height: 21.5px;width: 10%" >'+r.lstBillrpt[i].ipdno+'</td> '
			+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientName+'</td> '
			+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientType+'</td> '																			
			+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].doctorName+'</td>	'
			+ ' <td style="height: 21.5px;width: 15%" >'+r.lstBillrpt[i].charges+'</td>	'																						
			+ ' </tr> ';						
		}	
		
		$("#container").html(temp);
	}*/		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getPatientTypeWiseIpdBill(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	
	var source = parseInt($("#sourceType").val());	
	//alert("hi"+source);
	if(source == null || isNaN(source)){
		//alert("hi");
		source=0;
	}
	var sponsorId=0;
	
	//For Hall Wise Id  
	var sponsorF = $("#lisH0").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItemsinfo li").length;
	sponsorL = $("#lisH" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}
	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("source=" + source);	
	inputs.push("sponsorId=" + sponsorId);
	inputs.push("sponsorF=" + sponsorF);
	inputs.push("sponsorL=" + sponsorL);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getPatientTypeWiseIpdBill",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setPatientTypeWiseIpdBill(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setPatientTypeWiseIpdBill(r){
	
	var temp="";
	var totAmt=0,totPaid=0,totDisc=0,totRem=0;
	
	if(r.lstBillReg.length > 0){
		
		temp=temp+ '<tr class="noBorder">'
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 8%"></th> '			
			+' <th style="height: 21.5px;width: 8%">Cash</th> '																
			+' <th style="height: 21.5px;width: 30%"></th> '																			
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th>	'	
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th> '	
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th> '																												
		+' </tr>';	
		
		for(var i=0;i < r.lstBillReg.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstBillReg[i].totAmt);
			totPaid=Number(totPaid)+Number(r.lstBillReg[i].paidAmt);
			totDisc=Number(totDisc)+Number(r.lstBillReg[i].discAmt);
			totRem=Number(totRem)+Number(r.lstBillReg[i].remainAmt);
			if(totRem<0){
				
				totRem=0;
			}
			var recDate=new Date(r.lstBillReg[i].billDate).toLocaleDateString('en-GB');	
			var rem = r.lstBillReg[i].remainAmt;
			if(rem<0){
				
				rem=0;
			}
			
			
			if(rem <=0){
							
				temp=temp+ '<tr class="noBorder">'
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Type :</th> '																
					+' <th style="height: 21.5px;width: 30%">'+r.lstBillReg[i].source+'</th> '																			
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th>	'	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '																												
				+' </tr>';	
				
				temp=temp+ '<tr class="noBorder">'
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Name :</th> '																
					+' <th style="height: 21.5px;width: 30%">'+r.lstBillReg[i].sponsorLeaf+'</th> '																			
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th>	'	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '																												
				+' </tr>';	
				
				temp=temp+ '<tr>'
					+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
					+' <td style="height: 21.5px;width: 8%">'+r.lstBillReg[i].billNo+'</td> '			
					+' <td style="height: 21.5px;width: 8%">'+recDate[0]+'</td> '																
					+' <td style="height: 21.5px;width: 30%">'+r.lstBillReg[i].patientName+'</td> '																			
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</td>	'	
					+' <td style="height: 21.5px;width: 7%">0</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '	
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(rem).toFixed(2)+'</td> '																												
				+' </tr>';	
				
				temp=temp+ '<tr class="noBorder">'
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%"></th> '																
					+' <th style="height: 21.5px;width: 30%"></th> '																			
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</th>	'	
					+' <th style="height: 21.5px;width: 7%">0</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</th> '	
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(rem).toFixed(2)+'</th> '																												
				+' </tr>';	
				
			}
		}
		
		temp=temp+ '<tr class="noBorder">'
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 8%"></th> '			
			+' <th style="height: 21.5px;width: 8%">Credit</th> '																
			+' <th style="height: 21.5px;width: 30%"></th> '																			
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th>	'	
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th> '	
			+' <th style="height: 21.5px;width: 7%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th> '																												
		+' </tr>';	
		
		for(var i=0;i < r.lstBillReg.length;i++){
			
			totAmt=Number(totAmt)+Number(r.lstBillReg[i].totAmt);
			totPaid=Number(totPaid)+Number(r.lstBillReg[i].paidAmt);
			totDisc=Number(totDisc)+Number(r.lstBillReg[i].discAmt);
			totRem=Number(totRem)+Number(r.lstBillReg[i].remainAmt);
			if(totRem<0){
				
				totRem=0;
			}
			var recDate=new Date(r.lstBillReg[i].billDate).toLocaleDateString('en-GB');	
			var rem = r.lstBillReg[i].remainAmt;
			if(rem<0){
				
				rem=0;
			}			
			
			if(rem > 0){
								
				temp=temp+ '<tr class="noBorder">'
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Type :</th> '																
					+' <th style="height: 21.5px;width: 30%">'+r.lstBillReg[i].source+'</th> '																			
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th>	'	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '																												
				+' </tr>';	
				
				temp=temp+ '<tr class="noBorder">'
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Name :</th> '																
					+' <th style="height: 21.5px;width: 30%">'+r.lstBillReg[i].sponsorLeaf+'</th> '																			
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th>	'	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '	
					+' <th style="height: 21.5px;width: 7%"></th> '
					+' <th style="height: 21.5px;width: 7%"></th> '																												
				+' </tr>';	
				
				temp=temp+ '<tr>'
					+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
					+' <td style="height: 21.5px;width: 8%">'+r.lstBillReg[i].billNo+'</td> '			
					+' <td style="height: 21.5px;width: 8%">'+recDate[0]+'</td> '																
					+' <td style="height: 21.5px;width: 30%">'+r.lstBillReg[i].patientName+'</td> '																			
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</td>	'	
					+' <td style="height: 21.5px;width: 7%">0</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '	
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 7%">'+parseFloat(rem).toFixed(2)+'</td> '																												
				+' </tr>';	
				
				temp=temp+ '<tr class="noBorder">'
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%"></th> '																
					+' <th style="height: 21.5px;width: 30%"></th> '																			
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</th>	'	
					+' <th style="height: 21.5px;width: 7%">0</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</th> '	
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</th> '
					+' <th style="height: 21.5px;width: 7%">'+parseFloat(rem).toFixed(2)+'</th> '																												
				+' </tr>';	
				
			}		
		}
		
		/*temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 6%"></th> '																	
			+ ' <th style="height: 21.5px;width: 10%"></th> '																		
			+ ' <th style="height: 21.5px;width: 15%"></th> '
			+ ' <th style="height: 21.5px;width: 15%"></th> '
			+ ' <th style="height: 21.5px;width: 7%">0</th> '
			+ ' <th style="height: 21.5px;width: 7%">'+totAmt+'</th> '	
			+ ' <th style="height: 21.5px;width: 7%">'+totDisc+'</th> ' 
			+ ' <th style="height: 21.5px;width: 7%">'+totPaid+'</th> '
			+ ' <th style="height: 21.5px;width: 7%">'+totRem+'</th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '																													
		+' </tr>';*/		
	}
	$("#container").html(temp);		

}


/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getIpdBillDiscountRegister(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getIpdBillDiscountRegister",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setIpdBillDiscountRegister(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setIpdBillDiscountRegister(r){
	
	var temp="";
	var totBill=0;
	var totCon=0;
	
	if(r.lstBillReg.length > 0){
		
		for(var i=0;i < r.lstBillReg.length;i++){
				
			totBill = Number(totBill)+Number(r.lstBillReg[i].totAmt);
			totCon = Number(totCon)+Number(r.lstBillReg[i].discAmt);
			
			temp=temp+ '<tr>'				
				+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
				+' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].billNo+'</td> ' 																																			
				+' <td style="height: 21.5px;width: 20%">'+r.lstBillReg[i].patientName+'</td> '																			
				+' <td style="height: 21.5px;width: 10%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '				
				+' <td style="height: 21.5px;width: 10%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</td> '	
				+' <td style="height: 21.5px;width: 15%">'+r.lstBillReg[i].conGivenBy+'</td> '	
				+' <td style="height: 21.5px;width: 15%">'+r.lstBillReg[i].conCategory+'</td> '
				+' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].remark+'</td>	'	
				+' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].userName+'</td> '				
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'				
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 5%"></th> ' 																																			
			+' <th style="height: 21.5px;width: 20%"></th> '																			
			+' <th style="height: 21.5px;width: 10%">'+parseFloat(totBill).toFixed(2)+'</th> '				
			+' <th style="height: 21.5px;width: 10%">'+parseFloat(totCon).toFixed(2)+'</th> '	
			+' <th style="height: 21.5px;width: 15%"></th> '	
			+' <th style="height: 21.5px;width: 15%"></th> '
			+' <th style="height: 21.5px;width: 10%"></th>	'	
			+' <th style="height: 21.5px;width: 10%"></th> '				
		+' </tr>';			
	}
	$("#container").html(temp);	
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getBillEstimateReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getBillEstimateReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setBillEstimateReport(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setBillEstimateReport(r){
	
	var temp="";
	var totBill=0;
	var totCon=0;
	
	if(r.lstBillReg.length > 0){
		
		for(var i=0;i < r.lstBillReg.length;i++){
				
			totBill = Number(totBill)+Number(r.lstBillReg[i].totAmt);
			totCon = Number(totCon)+Number(r.lstBillReg[i].discAmt);
			
			temp=temp+ '<tr>'				
				+ ' <td style="height: 21.5px;width: 5%">Sr No</td> ' 
				+ ' <td style="height: 21.5px;width: 7%">Bill No</td> '			
				+ ' <td style="height: 21.5px;width: 7%">Estimate No</td> '	
				+ ' <td style="height: 21.5px;width: 7%">Ipd No</td> '																
				+ ' <td style="height: 21.5px;width: 20%">Patient Name</td> '					
				+ ' <td style="height: 21.5px;width: 12%">Diagnosis</td> '																		
				+ ' <td style="height: 21.5px;width: 6%">D.O.A.</td> '
				+ ' <td style="height: 21.5px;width: 6%">D.O.D.</td> '	
				+ ' <td style="height: 21.5px;width: 10%">Estimate For 2 Days</td> '	
				+ ' <td style="height: 21.5px;width: 10%">Actual Bill For 2 Days</td> '	
				+ ' <td style="height: 21.5px;width: 10%">Difference in %</td> '		
			+' </tr>';													
		}		
			
	}
	$("#container").html(temp);	
}

/************
* @author	: Vinod Udawant
* @date		: 12-March-2018
* @codeFor	: Groupwise Profees Report
*************/
function getGroupwiseProfees(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var groupId= parseInt($("#lstGroup").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("groupId=" + groupId);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getGroupwiseProfees",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setGroupwiseProfees(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 12-March-2018
* @codeFor	: Set Groupwise Profees Report
*************/
function setGroupwiseProfees(r){
	
	var temp="";
	var tempDist="";
	var totGroass=0;
	var totCon=0;
	var totHosp=0;
	var netAmt=0;
	var indPerDrAmt=0;
	var distPerDrAmt=0;
	
	var tds=$("#tds").val();
	
	if(r.lstGroupProfess.length > 0){
		
		for(var i=0;i < r.lstGroupProfess.length;i++){
				
			var drName=r.lstGroupProfess[i].doctorName;
			totGroass = Number(totGroass)+Number(r.lstGroupProfess[i].groassAmt);
			totCon = Number(totCon)+Number(r.lstGroupProfess[i].concn);			
			totHosp=Number(totHosp)+Number(r.lstGroupProfess[i].hpDedcn);
			netAmt=Number(netAmt)+Number(r.lstGroupProfess[i].netAmt);
			indPerDrAmt=Number(indPerDrAmt)+Number(r.lstGroupProfess[i].indPerDrAmt);
			distPerDrAmt=Number(distPerDrAmt)+Number(r.lstGroupProfess[i].distPerDrAmt);
			
			temp=temp+ '<tr>'				
				+ ' <td style="height: 21.5px;width: 20%" >'+drName+'</td> '
				+ ' <td style="height: 21.5px;width: 10%" >'+r.lstGroupProfess[i].groassAmt+'</td> '
				+ ' <td style="height: 21.5px;width: 10%" >'+r.lstGroupProfess[i].concn+'</td> '																	
				+ ' <td style="height: 21.5px;width: 15%" >'+r.lstGroupProfess[i].hpDedcn+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%" >'+r.lstGroupProfess[i].netAmt+'</td> '																				
				+ ' <td style="height: 21.5px;width: 15%" >'+r.lstGroupProfess[i].indPerDrAmt+'</td>	'
				+ ' <td style="height: 21.5px;width: 15%" >'+r.lstGroupProfess[i].distPerDrAmt+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%" >'+r.lstGroupProfess[i].netAmt+'</td> '
			+' </tr>';																
		}		
		
		temp=temp+ '<tr>'				
			+ ' <th style="height: 21.5px;width: 20%" >TOTAL TO DISTRUBUTE</th> '
			+ ' <th style="height: 21.5px;width: 10%" >'+totGroass+'</th> '
			+ ' <th style="height: 21.5px;width: 10%" >'+totCon+'</th> '																	
			+ ' <th style="height: 21.5px;width: 15%" >'+totHosp+'</th> '	
			+ ' <th style="height: 21.5px;width: 10%" >'+netAmt+'</th> '																				
			+ ' <th style="height: 21.5px;width: 15%" >'+indPerDrAmt+'</th>	'
			+ ' <th style="height: 21.5px;width: 15%" >'+distPerDrAmt+'</th> '	
			+ ' <th style="height: 21.5px;width: 10%" >'+netAmt+'</th> '
		+' </tr>';
	}
	
	var distIndPerDrAmt=0;
	var distFromDistPerAmt=0;
	var totTatal=0;
	var tdsTatal=0;
	var chTatal=0;
	
	if(r.lstGroupProfess.length > 0){
		
		for(var i=0;i < r.lstGroupProfess.length;i++){
				
			var drName=r.lstGroupProfess[i].doctorName;
			
			distIndPerDrAmt=Number(distIndPerDrAmt)+Number(r.lstGroupProfess[i].indPerDrAmt);
			
			var fromDistPerAmt=Number(distPerDrAmt)*Number(r.lstGroupProfess[i].fromDistPerDr)/100;
			var totAmt=Number(r.lstGroupProfess[i].indPerDrAmt)+Number(fromDistPerAmt);
			
			distFromDistPerAmt=Number(distFromDistPerAmt)+Number(fromDistPerAmt);			
			totTatal=Number(totTatal)+Number(totAmt);
			
			var tdsAmt=(Number(totAmt)*Number(tds))/100;
			var chAmt=Number(totAmt)-Number(tdsAmt);
			
			tdsTatal=Number(tdsTatal)+Number(tdsAmt);
			chTatal=Number(chTatal)+Number(chAmt);
			
			tempDist=tempDist+ '<tr>'				
				+ ' <td style="height: 21.5px;width: 18%" >'+drName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%" >'+r.lstGroupProfess[i].indPerDr+'</td> '
				+ ' <td style="height: 21.5px;width: 15%" >'+r.lstGroupProfess[i].indPerDrAmt+'</td> '
				+ ' <td style="height: 21.5px;width: 15%" >'+r.lstGroupProfess[i].fromDistPerDr+'</td> '
				+ ' <td style="height: 21.5px;width: 15%" >'+fromDistPerAmt+'</td> '
				+ ' <td style="height: 21.5px;width: 10%" >'+totAmt+'</td> '																			
				+ ' <td style="height: 21.5px;width: 10%" >'+tdsAmt+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%" >'+chAmt+'</td> '	
			+' </tr>';																
		}		
		
		tempDist=tempDist+ '<tr>'				
			+ ' <th style="height: 21.5px;width: 18%" >TOTAL</th> '
			+ ' <th style="height: 21.5px;width: 7%" > </th> '
			+ ' <th style="height: 21.5px;width: 15%" >'+distIndPerDrAmt+'</th> '
			+ ' <th style="height: 21.5px;width: 15%" >100</th> '
			+ ' <th style="height: 21.5px;width: 15%" >'+distFromDistPerAmt+'</th> '
			+ ' <th style="height: 21.5px;width: 10%" >'+totTatal+'</th> '																			
			+ ' <th style="height: 21.5px;width: 10%" >'+tdsTatal+'</th> '	
			+ ' <th style="height: 21.5px;width: 10%" >'+chTatal+'</th> '
		+' </tr>';
	}
	$("#container").html(temp);	
	$("#distContainer").html(tempDist);		
}

/************
* @author	: Vinod Udawant
* @date		: 15-March-2018
* @codeFor	: Get dynamic groups
*************/
function fetchDynamicGroupMaster(callFrom){
	var letter="";
	if(callFrom == "search"){
	 letter= $("#byName4").val();
	}else{
		$("#byName4").val("");
	}	
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callFrom" : callFrom,
			"letter" : letter
		},
		url : "ehat/profees/fetchDynamicGroupMasterList",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var htm="<option value='0'>-- Select Group --</option>";	
			
			for ( var i = 0; i < r.listDynamicGroupMaster.length; i++) {
				
				htm = htm +"<option value='"+r.listDynamicGroupMaster[i].dMasterId+"'>"+r.listDynamicGroupMaster[i].dGroupName+"</option>";
			}
			$("#lstGroup").html(htm);
		}
	});
}


//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List onload
function getAllHeadServices() {

	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList2",
		success : function(r) {
			
			//setTempAllService2(r);
			
			var temp="<option value=0>--- Select Service ---</option>";
			for(var i=0;i<r.listService.length;i++){
				
				temp=temp + "<option value="+r.listService[i].serviceId+">"+r.listService[i].serviceName+"</option>";
			}
			
			$("#servId").html(temp);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getPerformanceReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();		
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getPerformanceReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setPerformanceReport(r);
			$("#frDate").html(fromDate);
			$("#tdDate").html(toDate);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function setPerformanceReport(r){
	
	var temp="";
	
	if(r.lstBillReg.length > 0){
		
		for(var i=0;i < r.lstBillReg.length;i++){
			
			var depId=r.lstBillReg[i].depId;
			if(depId==1){
				
				temp=temp+ '<tr>'				
				+' <td style="height: 21.5px;width: 10%" >OPD</td> ' 
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillReg[i].regNo+'</td> '																																				
				+' <td style="height: 21.5px;width: 25%" >'+r.lstBillReg[i].patientName+'</td> '	
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td>	'
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td>	'																	
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '																								
				+' </tr>';
			}else{
				
				temp=temp+ '<tr>'				
				+' <td style="height: 21.5px;width: 10%" >IPD</td> ' 
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillReg[i].regNo+'</td> '																																				
				+' <td style="height: 21.5px;width: 25%" >'+r.lstBillReg[i].patientName+'</td> '	
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td>	'
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td>	'																	
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '																								
				+' </tr>';
			}															
		}		
	}
	$("#container").html(temp);	
}

/************
* @author   : Vinod Udawant
* @date     : 05-April-2018
* @codeFor  : Fetch Ipd Services Breakup
*************/
function getIpdBreakupReport(){
    var callF="";
    var fromDate = $("#fromDate").val();
    var toDate = $("#lastDate").val();
    var userId = parseInt($("#userId").val());
    var unitId = parseInt($("#unitId").val());
    var inputs = [];
    inputs.push("unitId=" + unitId);
    inputs.push("userId=" + userId);
    inputs.push("callFrom=" + callF);
    inputs.push("fromDate=" + fromDate);
    inputs.push("toDate=" + toDate);
    var str = inputs.join('&');
    jQuery.ajax({
        async   : false,
        type    : "POST",
        data    : str + "&reqType=AJAX",
        url     : "ehat/financeMeesha/getIpdBreakupReport",
        error   : function() {
            alert('Network Issue!!!');
        },
        success : function(r) {
            setIpdBreakupReport(r);
        }
    });
}

/************
* @author   : Vinod Udawant
* @date     : 05-April-2018
* @codeFor  : Set Ipd Services Breakup
*************/
function setIpdBreakupReport(r){
    var temp="";
    var tempHead="";
    var tempFooter="";
    var finalTotBill=0;
    if(r.lstIpdBreakup.length > 0){
        var listService = [];
        for(var k=0;k < r.lstIpdBreakup[0].lstServMaster.length;k++){
            listService[k]=0;
        }
        tempHead=tempHead+ '<tr> '
        + '<th>Sr No</th> '
        + '<th>Company</th> '
        + '<th>Bill No</th> '
        + '<th>Patient Name</th> '
        + '<th>Total Bill</th> ';
        for(var k=0;k < r.lstIpdBreakup[0].lstServMaster.length;k++){
            var servName= r.lstIpdBreakup[0].lstServMaster[k].serviceName;
            tempHead=tempHead + '<th>'+servName+'</th> ';
        }
        tempHead=tempHead + '</tr>';
        for(var k=0;k < r.lstIpdBreakup.length;k++){
            var regNo = r.lstIpdBreakup[k].regNo;
            var patName = r.lstIpdBreakup[k].patientName;
            var totBill = r.lstIpdBreakup[k].totBill;
            var company = r.lstIpdBreakup[k].company;
            finalTotBill = Number(finalTotBill) + Number(totBill);
            temp=temp+ '<tr> '
            + '<td>'+(k+1)+'</td> '
            + '<td>'+company+'</td> '
            + '<td>'+regNo+'</td> '
            + '<td>'+patName+'</td> '
            + '<td>'+parseFloat(totBill).toFixed(2)+'</td> ';
            for(var s=0;s < r.lstIpdBreakup[k].lstServMaster.length;s++){
                var servAmt = r.lstIpdBreakup[k].lstServMaster[s].serviceCharges;
                temp = temp + '<td>'+parseFloat(servAmt).toFixed(2)+'</td> ';
                listService[s] = Number(listService[s]) + Number(servAmt);
            }
            temp=temp+ '</tr>';
        }
        tempFooter=tempFooter+ '<tr> '
        + '<th></th> '
        + '<th></th> '
        + '<th></th> '
        + '<th>Totals</th> '
        + '<th>'+parseFloat(finalTotBill).toFixed(2)+'</th> ';
        for(var k=0;k < r.lstIpdBreakup[0].lstServMaster.length;k++){
            tempFooter=tempFooter + '<th>'+parseFloat(listService[k]).toFixed(2)+'</th> ';
        }
        tempFooter=tempFooter + '</tr>';
        $("#servHead").html(tempHead);
        $("#container").html(temp);
        $("#servFooter").html(tempFooter);
    }
}


/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd Digno bills
*************/
function getOpdDiagnoPatientDataBillWISE(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchOpdDiagnoPatientsBillwise",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setOpdDiagnoPatientDataBillwise(r);			
		}
	});
}

function setOpdDiagnoPatientDataBillwise(r){
	
	var temp="";
	var totAmt=0,totPaid=0,totRem=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagno[i].billAmt);
			totPaid=Number(totPaid)+Number(r.lstOpdDiagno[i].paidAmt);
			totRem=Number(totRem)+Number(r.lstOpdDiagno[i].remainAmt);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');					
			var refDr=r.lstOpdDiagno[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			var treatDr=r.lstOpdDiagno[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			var autheriseBy=r.lstOpdDiagno[i].autheriseBy;
			if(autheriseBy== null || autheriseBy=="" || autheriseBy=="null"){
				autheriseBy="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].billId+'</td> '
			/*	+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].billNo+'</td> '*/
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].sourceName+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].sourceGroup+'</td> '		
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].serviceName+'</td> '	
				/*+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].qty+'</td> '	
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].price).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].amount).toFixed(2)+'</td> '		*/
				+ ' <td style="height: 21.5px;width: 7%">'+treatDr+'</td> '		
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].discount).toFixed(2)+'</td> '	
				/*+ ' <td style="height: 21.5px;width: 7%">'+autheriseBy+'</td> '	*/
				//+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].cost).toFixed(2)+'</td> '																														
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			/*+ ' <th style="height: 21.5px;width: 3%"></th> '*/
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totPaid).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totRem).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
		/*	+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '		
			+ ' <th style="height: 21.5px;width: 3%"></th> '	*/	
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			/*+ ' <th style="height: 21.5px;width: 7%"></th> '*/	
		//	+ ' <th style="height: 21.5px;width: 5%"></th> '																														
		+' </tr>';			
	}
	$("#container").html(temp);		
}
function receiptBillPrintBillwise(){

	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var fromDate=$("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	window.open("ehat_opd_diagno_BillWise_receipt.jsp?unitId="+unitId+"&userId="+userId+"&fromDate="+fromDate+"&toDate="+toDate);
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2018
* @codeFor	: Get Bill History
 ************/
function getBillHistory(){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var callF = "-";	
	var patId = 0;
	patId = parseInt($("#patId").val());
	if(patId=="null" || patId==null || patId=="undefined" || isNaN(patId)){
		
		patId=0;
	}

	
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}	
	//alert(sponsorL);
	
	
	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("patId=" + patId);	
	inputs.push("sponsorId=" + sponsorL);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getBillHistory",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			setBillHistory(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2018
* @codeFor	: Set Bill History
 ************/
function setBillHistory(r){
	
	var temp="";
	
	if(r.lstBillHistory.length > 0){
		
		for(var i=0;i < r.lstBillHistory.length;i++){
			
			var regDate=new Date(r.lstBillHistory[i].regDate).toLocaleDateString('en-GB');		
			var patId = r.lstBillHistory[i].patId;
			
			temp=temp+ '<tr>'				
				+' <td style="height: 21.5px;width: 7%" >'+(i+1)+'</td> ' 
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillHistory[i].patId+'</td> '																																				
				+' <td style="height: 21.5px;width: 30%" >'+r.lstBillHistory[i].patientName+'</td> '	
				+' <td style="height: 21.5px;width: 15%" >'+regDate+'</td>	'
				+' <td style="height: 21.5px;width: 40%" > '
				+' <button type="button" onclick="unBilledSavePrint('+r.lstBillHistory[i].patId+')" class="btn btn-xs btn-success" style="height: 21.5px;"><i class="fa fa-print"></i></button> '
				+' <button disabled onclick="billHistoryPrint('+r.lstBillHistory[i].patId+')" class="btn btn-xs btn-success" style="height: 21.5px;"><i class="fa fa-print"></i></button> '
				+' <span id="deptCount" class="badge badge-blue font-11">'+r.lstBillHistory[i].treatCount+'</span>'
				+' <div style="float:right;"> '
				+' 	<div id="accordion" class="panel-group"> '
				+' 		<div class="panel"> '
				+' 			<div class="panel-heading"> '
				+' 				<h3 class="panel-title"> '
				+' 					<a id="printTreats'+patId+'" onclick="getAllTreatments('+patId+')" href="#collapse'+i+'" data-parent="#accordion" data-toggle="collapse" '
				+' 						class="accordion-toggle openAllSlaveIpd collapsed"> '
				+' 						<div class="row"> '			
				+' 							<div class="col-md-1"><i id="list2" class="fa fa-chevron-down"></i></div> '
				+' 						</div></a> '
				+' 				</h3> '
				+' 			</div> '
				+' 			<div class="panel-collapse collapse" id="collapse'+i+'" style="height: 0px;"> '
				+' 				<div class="panel-body"> '
				+' 					<table class="table table-hover"> '
				+' 						<thead> '
				+' 							<tr> '
				+' 								<th>Treat Id</th> '								
				+' 								<th><div class="text-center">Dept</div></th> '
				+' 								<th class="only-checkbox">ChB</th> '
				+' 							</tr> '
				+' 						</thead> '
				+' 						<tbody id="treatData'+patId+'"> '
							
				+' 						</tbody> '
				+' 					</table> '
				+' 				</div> '
				+' 			</div> '
				+' 		</div> '
				+' 	</div> '
				+' </div></td> '
				
				+' </tr>';																	
		}		
	}
	$("#container").html(temp);	
}

function billHistoryPrint(patId){
	
	var treatIdsChecked=[]; 
	
	var className = $('#printTreats'+patId).attr('class');
	
	if(className == "accordion-toggle openAllSlaveIpd collapsed"){
		
		$("#printTreats"+patId).trigger('click');
		
	}
		
	$('input[name=chkTreat'+patId+']:checked').each(function(){
		
		treatIdsChecked.push($(this).val());
	});
	
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}
	
	window.open("bill_history_pdf.jsp?patId="+patId+"&treatIds="+treatIdsChecked+"&sponsorId="+sponsorL);
	return false;	
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2018
* @codeFor	: Get Bill History
 ************/
function getAllTreatments(patId){
		
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var callF = "-";
	
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}	
	//alert(sponsorL);
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("patId=" + patId);	
	inputs.push("sponsorId=" + sponsorL);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getAllTreatments",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			setAllTreatmentsTemp(r,patId);			
		}
	});
}

function setAllTreatmentsTemp(r,patId){
	
	var temp="";
	
	if(r.listTreatment.length > 0){
		
		for(var i=0;i < r.listTreatment.length;i++){
			
			var dep = "";
			var depId = r.listTreatment[i].departmentId;
			var treatId = r.listTreatment[i].treatmentId;
			var sponsorId = r.listTreatment[i].count;
			var sponsorName = r.listTreatment[i].patientName;
			if(depId == 1){
				
				dep = "Opd";
			}else if(depId == 3){
					
				dep = "Diagnosis";
			}else{
				
				dep = "Ipd";
			}
			
			temp = temp	+' 	<tr> '							
			+' 	<td>'+r.listTreatment[i].treatmentId+'</td> '
			+' 	<td id="bdId443">'+dep+'</td> '
			+' 	<td id="spId443">'+sponsorName+'</td> '
			+' 	<td class="only-checkbox"><input type="checkbox" value="'+treatId+'_'+sponsorId+'" name="chkTreat'+patId+'" checked="checked"></td> '
			+' 	</tr> ';
		}
		
		$("#treatData"+patId).html(temp);
	}
}

function generateBillIdTreats(patId,treatIdsChecked){
		
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var callF = "-";
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("patId=" + patId);
	inputs.push("treatIds=" + treatIdsChecked);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/generateBillIdTreats",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			if(r > 0){
			
				return false;
				//window.open("bill_history_pdf.jsp?patId="+patId+"&treatIds="+treatIdsChecked);
			}else{
				
				alert("Already printed all treatment ids bill");
			}
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2018
* @codeFor	: Get Bill History
 ************/
function getGeneratedBillHistory(){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var callF = "-";
	var patId = 0;
	patId = parseInt($("#patId").val());
	if(patId=="null" || patId==null || patId=="undefined" || isNaN(patId)){
		
		patId=0;
	}
	
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}	
	//alert(sponsorL);
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("patId=" + patId);	
	inputs.push("sponsorId=" + sponsorL);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getGeneratedBillHistory",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			setGeneratedBillHistory(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2018
* @codeFor	: Set Bill History
 ************/
function setGeneratedBillHistory(r){
	
	var temp="";
	
	if(r.lstBillHistory.length > 0){
		
		for(var i=0;i < r.lstBillHistory.length;i++){
			
			var regDate=new Date(r.lstBillHistory[i].regDate).toLocaleDateString('en-GB');		
			var patId = r.lstBillHistory[i].patId;
			
			temp=temp+ '<tr>'				
				+' <td style="height: 21.5px;width: 7%" >'+(i+1)+'</td> ' 
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillHistory[i].patId+'</td> '																																				
				+' <td style="height: 21.5px;width: 30%" >'+r.lstBillHistory[i].patientName+'</td> '	
				+' <td style="height: 21.5px;width: 15%" >'+regDate+'</td>	'
				+' <td style="height: 21.5px;width: 40%" > '
				+' <button type="button" onclick="billedBillPrint('+r.lstBillHistory[i].patId+')" class="btn btn-xs btn-success" style="height: 21.5px;"><i class="fa fa-print"></i></button> '
				+' <button disabled onclick="buildBillHistoryPrint('+r.lstBillHistory[i].patId+')" class="btn btn-xs btn-success" style="height: 21.5px;"><i class="fa fa-print"></i></button> '
				+' <span id="deptCount" class="badge badge-blue font-11">'+r.lstBillHistory[i].treatCount+'</span>'
				+' <div style="float:right;"> '
				+' 	<div id="accordion" class="panel-group"> '
				+' 		<div class="panel"> '
				+' 			<div class="panel-heading"> '
				+' 				<h3 class="panel-title"> '
				+' 					<a id="printTreats'+patId+'" onclick="getBuildTreatments('+patId+')" href="#collapse'+i+'" data-parent="#accordion" data-toggle="collapse" '
				+' 						class="accordion-toggle openAllSlaveIpd collapsed"> '
				+' 						<div class="row"> '			
				+' 							<div class="col-md-1"><i id="list2" class="fa fa-chevron-down"></i></div> '
				+' 						</div></a> '
				+' 				</h3> '
				+' 			</div> '
				+' 			<div class="panel-collapse collapse" id="collapse'+i+'" style="height: 0px;"> '
				+' 				<div class="panel-body"> '
				+' 					<table class="table table-hover"> '
				+' 						<thead> '
				+' 							<tr> '
				+' 								<th>Treat Id</th> '								
				+' 								<th><div class="text-center">Dept</div></th> '
				+' 								<th class="only-checkbox">ChB</th> '
				+' 							</tr> '
				+' 						</thead> '
				+' 						<tbody id="treatData'+patId+'"> '
							
				+' 						</tbody> '
				+' 					</table> '
				+' 				</div> '
				+' 			</div> '
				+' 		</div> '
				+' 	</div> '
				+' </div></td> '
				
				+' </tr>';																	
		}		
	}
	$("#container").html(temp);	
}

function buildBillHistoryPrint(patId){
	
	var treatIdsChecked=[]; 
	
	var className = $('#printTreats'+patId).attr('class');
	
	if(className == "accordion-toggle openAllSlaveIpd collapsed"){
		
		$("#printTreats"+patId).trigger('click');
		
	}
	
	$('input[name=chkTreat'+patId+']:checked').each(function(){
		
		treatIdsChecked.push($(this).val());
	});
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}	
	//alert(sponsorL);
	
	
	window.open("build_bill_history_pdf.jsp?patId="+patId+"&treatIds="+treatIdsChecked+"&sponsorId="+sponsorL);
	return false;
}

/************
* @author	: Vinod Udawant
* @date		: 12-July-2018
* @codeFor	: Get Bill History
 ************/
function getBuildTreatments(patId){
		
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var callF = "-";
	
	//For Hall Wise Id  
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}	
	//alert(sponsorL);
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("patId=" + patId);	
	inputs.push("sponsorId=" + sponsorL);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getBuildTreatments",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			setBuildTreatmentsTemp(r,patId);
		}
	});
}

function setBuildTreatmentsTemp(r,patId){
	
	var temp="";
	
	if(r.listTreatment.length > 0){
		
		for(var i=0;i < r.listTreatment.length;i++){
			
			var dep = "";
			var depId = r.listTreatment[i].departmentId;
			var sponsorId = r.listTreatment[i].count;
			var sponsorName = r.listTreatment[i].patientName;
			var treatId = r.listTreatment[i].treatmentId;
			if(depId == 1){
				
				dep = "Opd";
			}else if(depId == 3){
					
				dep = "Diagnosis";
			}else{
				
				dep = "Ipd";
			}
			
			temp = temp	+' 	<tr> '							
			+' 	<td>'+r.listTreatment[i].treatmentId+'</td> '
			+' 	<td id="bdId443">'+dep+'</td> '		
			+' 	<td id="spId443">'+sponsorName+'</td> '
			+' 	<td class="only-checkbox"><input type="checkbox" value="'+treatId+'_'+sponsorId+'" name="chkTreat'+patId+'" checked="checked"></td> '
			+' 	</tr> ';
		}
		
		$("#treatData"+patId).html(temp);
	}
}

/************
* @author	: Irfan khan
* @date		: 11-Sep-2018
* @codeFor	: Service wise report
 ************/
function fetchServiceWiseReport(){
		
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	var sponsorId = $("#patTytpe").val();
	var deptId = $("#deptId").val();
	var serviceId = $("#serviceId").val();
	var subServiceId = $("#subServiceId").val();
	
	if(sponsorId == "" || sponsorId == undefined){
		sponsorId= 0;
	}
	if(deptId == "" || deptId == undefined){
		deptId= 1;
	}
	if(serviceId == "" || serviceId == undefined){
		serviceId= 0;
	}
	if(subServiceId == "" || subServiceId == undefined){
		subServiceId= 0;
	}
	
	var inputs = [];	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("deptId=" + deptId);	
	inputs.push("serviceId=" + serviceId);
	inputs.push("subServiceId=" + subServiceId);
	inputs.push("sponsorId=" + sponsorId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/fetchServiceWiseReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			//alert(r.listBillDetails.length);
			var htmHead = "";
			var htmBody = "";
			htmHead = htmHead
			+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
			+ "</th><th class='col-md-1'>Patient-Id"
			+ "</th><th class='col-md-1'>Opd / Ipd no"
			+ "</th><th class='col-md-1'>Patient Name"
			+ "</th><th class='col-md-1'>Service Name"
			+ "</th><th class='col-md-1'>Sub-Service Name"
			+ "</th><th class='col-md-1'>Doctor Name"
			+ "</th><th class='col-md-1'>Rate"
			+ "</th><th class='col-md-1'>Quantity"
			+ "</th><th class='col-md-1'>Amount"
			+ "</th><th class='col-md-1'>Concession"
			+ "</th><th class='col-md-1'>Payable"
			+ "</th></tr>";
			
			if (r.listBillDetails.length == 0
					|| r.listBillDetails.length == null) {
				// no records.
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {

				for ( var i = 0; i < r.listBillDetails.length; i++) {

					htmBody = htmBody
							+ "<tr style='height:21px;'>"
							+ "<td class='col-md-1'>"
							+ (i + 1)
							+ "</td><td class='col-md-1'>"
							+ r.listBillDetails[i].patienttId
							+ "</td><td class='col-md-1'>"
							+ r.listBillDetails[i].opdIpdNo
							+ "</td><td class='col-md-1'>"
							+ r.listBillDetails[i].patientName
							+ "</td><td class='col-md-1'>"
							+ r.listBillDetails[i].serviceName
							+ "</td><td class='col-md-1'>"
							+ r.listBillDetails[i].subServiceName
							+ "</td><td class='col-md-1'>"
							+ r.listBillDetails[i].doctorName
							+ "</td><td class='col-md-1' align='right'>"
							+ r.listBillDetails[i].rate.toFixed(2)
							+ "</td><td class='col-md-1' align='right'>"
							+ r.listBillDetails[i].quantity.toFixed(2)
							+ "</td><td class='col-md-1' align='right'>"
							+ r.listBillDetails[i].amount.toFixed(2)
							+ "</td><td class='col-md-1' align='right'>"
							+ r.listBillDetails[i].concession.toFixed(2)
							+ "</td><td class='col-md-1' align='right'>"
							+ (r.listBillDetails[i].amount - r.listBillDetails[i].concession).toFixed(2)
							+ "</td></tr>";
						}
					}
			$("#tableTestVoucherListHead").html(htmHead);
			$("#tableTestVoucherList").html(htmBody);
				}
			});
}
//irfan khan 14-sep-2018 fetch subServices
function fetchSubServices() {

	var serviceId = $("#serviceId").val();
	if(serviceId == "" || serviceId == undefined){
		serviceId = 0;
	}

	var inputs = [];
	inputs.push("serviceId=" + serviceId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/financeMeesha/fetchSubServices",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.lstSubService.length);
			var list = "<option value='0'>--Select--</option>";    
		    for ( var i = 0; i < r.lstSubService.length; i++) {    

				list = list + "<option value='"+r.lstSubService[i].subId+"'>" + (r.lstSubService[i].categoryName) + "</option>";    
				}   
			$("#subServiceId").html(list);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 30-Oct-2018
* @codeFor	: Get UnBilled Bill History
 ************/
function unBilledSavePrint(patId){
	
	var treatIdsChecked=[]; 	
	var className = $('#printTreats'+patId).attr('class');
	
	if(className == "accordion-toggle openAllSlaveIpd collapsed"){
		
		$("#printTreats"+patId).trigger('click');	
		return false;
	}
	
	var treatSpMainId = $('input[name=chkTreat'+patId+']:checked:visible:first').val();
	var sptMainValue = treatSpMainId.split("_");
	var spMainId = sptMainValue[1];		

	var count = 0;
	$('input[name=chkTreat'+patId+']:checked').each(function(){
		
		var treatSpId = $(this).val();
		var sptValue = treatSpId.split("_");
		var spId = sptValue[1];
		if(spId == spMainId){
			
			treatIdsChecked.push($(this).val());
		}else{
			
			count++;
		}
			
	});
	
	if(count > 0){
		
		alert("Please selects same sponsor treatments");
		return false;
	}
	
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}
	
	window.open("unbilled_pdf.jsp?patId="+patId+"&treatIds="+treatIdsChecked+"&sponsorId="+sponsorL);
	return false;	
}

/************
* @author	: Vinod Udawant
* @date		: 30-Oct-2018
* @codeFor	: Get Billed Bill History
 ************/
function billedBillPrint(patId){
	
	var treatIdsChecked=[]; 	
	var className = $('#printTreats'+patId).attr('class');
	
	if(className == "accordion-toggle openAllSlaveIpd collapsed"){
		
		$("#printTreats"+patId).trigger('click');	
		return false;
	}
	
	var treatSpMainId = $('input[name=chkTreat'+patId+']:checked:visible:first').val();
	var sptMainValue = treatSpMainId.split("_");
	var spMainId = sptMainValue[1];		

	var count = 0;
	$('input[name=chkTreat'+patId+']:checked').each(function(){
		
		var treatSpId = $(this).val();
		var sptValue = treatSpId.split("_");
		var spId = sptValue[1];
		if(spId == spMainId){
			
			treatIdsChecked.push($(this).val());
		}else{
			
			count++;
		}
			
	});
	
	if(count > 0){
		
		alert("Please selects same sponsor treatments");
		return false;
	}
	
	var sponsorF = $("#lis1").val();// chargesId
	var sponsorL = 0;// static chargesSlaveId
	var liSizeHall = $("#dynamicItems li").length;
	sponsorL = $("#lis" + (liSizeHall - 1)).val();
	
	if(sponsorF=="" || sponsorF==null || sponsorF==""){
		
		sponsorF=0;
	}	
	if(sponsorL=="" || sponsorL==null || sponsorL==""){
		
		sponsorL=0;
	}
	
	window.open("billed_bill_pdf.jsp?patId="+patId+"&treatIds="+treatIdsChecked+"&sponsorId="+sponsorL);
	return false;	
}

/************
* @author	: Vinod Udawant
* @date		: 21-Jan-2019
* @codeFor	: Fetch deleted Opd Digno service bills
*************/
function getOpdDeletedServiceBills(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getOpdDeletedServiceBills",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setOpdDeletedServiceBills(r);			
		}
	});
}

function setOpdDeletedServiceBills(r){
	
	var temp="";
	var totAmt=0,totPrice=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagno[i].billAmt);
			totPrice=Number(totPrice)+Number(r.lstOpdDiagno[i].price);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');		
			var deletedDate=new Date(r.lstOpdDiagno[i].deletedDate).toLocaleDateString('en-GB');
			var deletedTime = new Date(r.lstOpdDiagno[i].deletedDate).toLocaleTimeString('en-GB');
			
			deletedDate = deletedDate + " " + deletedTime;
			
			var refDr=r.lstOpdDiagno[i].refDr;
			if(refDr==null){
				refDr="-";
			}					
			
			var treatDr=r.lstOpdDiagno[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			
			var categoryName=r.lstOpdDiagno[i].categoryName;
			if(categoryName==null){
				categoryName="-";
			}
			
			var userName=r.lstOpdDiagno[i].user;
			if(userName==null){
				userName="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].billId+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].serviceName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+treatDr+'</td> '						
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].qty+'</td> '	
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].price).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].amount).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sponsorName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+userName+'</td> '	
				+ ' <td style="height: 21.5px;width: 6%">'+r.lstOpdDiagno[i].deletedBy+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+deletedDate+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].refRemark+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sourceName+'</td> '				
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '			
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totPrice).toFixed(2)+'</th> '					
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totAmt).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '					
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 6%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
		+' </tr>';			
	}
	$("#container").html(temp);		
}

/************
* @author	: Vinod Udawant
* @date		: 22-Jan-2019
* @codeFor	: Fetch Opd Refund Receipts
*************/
function getOpdRefundReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getOpdRefundReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setOpdRefundReport(r);			
		}
	});
}

function setOpdRefundReport(r){
	
	var temp="";
	var totAmt=0,totRef=0,totRemain=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstOpdDiagno[i].billAmt);
			totRef = Number(totRef)+Number(r.lstOpdDiagno[i].paidAmt);
			totRemain = Number(totRemain)+Number(r.lstOpdDiagno[i].remainAmt);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');	
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].billNo+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 17%">'+r.lstOpdDiagno[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].againstId+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '				
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].refGivenBy+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].refRemark+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].user+'</td> '					
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '			
			+ ' <th style="height: 21.5px;width: 17%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totRef).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totRemain).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '					
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '					
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
		+' </tr>';			
	}
	$("#container").html(temp);		
}
/************
* @author	: Vinod Udawant
* @date		: 22-Jan-2019
* @codeFor	: Fetch Opd Refund Receipts
*************/
function getOpdDiscountReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getOpdDiscountReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setOpdDiscountReport(r);			
		}
	});
}

function setOpdDiscountReport(r){
	
	var temp="";
	var totAmt=0,totPaid=0,totDisc=0,totRemain=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstOpdDiagno[i].billAmt);
			totDisc = Number(totDisc)+Number(r.lstOpdDiagno[i].discount);
			totPaid = Number(totPaid)+Number(r.lstOpdDiagno[i].paidAmt);
			totRemain = Number(totRemain)+Number(r.lstOpdDiagno[i].remainAmt);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');	
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].billNo+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 17%">'+r.lstOpdDiagno[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].discount).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '				
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].refGivenBy+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].refRemark+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagno[i].user+'</td> '					
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '			
			+ ' <th style="height: 21.5px;width: 17%"></th> '				
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totDisc).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totPaid).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totRemain).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '					
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '					
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
		+' </tr>';			
	}
	$("#container").html(temp);		
}

/************
* @author	: Vinod Udawant
* @date		: 05-Feb-2018
* @codeFor	: Fetch Opd package details
*************/
function getPackageReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/financeMeesha/getPackageReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			setPackageReport(r);			
		}
	});
}

function setPackageReport(r){
	
	var temp="";
	var totPrice=0,totAmount=0,totConcession=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totPrice=Number(totPrice)+Number(r.lstOpdDiagno[i].price);
			totAmount=Number(totAmount)+Number(r.lstOpdDiagno[i].amount);
			totConcession=Number(totConcession)+Number(r.lstOpdDiagno[i].concession);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');					
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].billId+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].mobile+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].discount).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sourceName+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sourceGroup+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].categoryName+'</td> '					
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].serviceName+'</td> '						
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].price).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].qty+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].amount).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].concession).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].treatDr+'</td> '						
				+ ' <td style="height: 21.5px;width: 2%">'+parseFloat(r.lstOpdDiagno[i].cost).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sponsorName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].user+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].unitName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].pkgName+'</td> '	
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].pkgAmount+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '			
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '		
			+ ' <th style="height: 21.5px;width: 5%"></th> '		
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totPrice).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '		
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totAmount).toFixed(2)+'</th> '		
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totConcession).toFixed(2)+'</th> '		
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 2%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
		+' </tr>';			
	}	
	$("#container").html(temp);		
}

//added by sandip
function getAllPaymentModes() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/payment/fetchPayList",

		success : function(r) {
			setTempPaymodeTemp(r);//call template
		}
	});
}

function setTempPaymodeTemp(r) {
	
	var list = "<option value='0' class='un'>All</option>";    
    for ( var i = 0; i < r.listPay.length; i++) {  

        list = list + "<option value='"+r.listPay[i].payId+"' class='un'>" + (r.listPay[i].payName) + "</option>";    
    }  
    
    $("#payModeId").html(list);
}
