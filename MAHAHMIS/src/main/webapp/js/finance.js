/************
* @author	: Vinod Udawant
* @date		: 25-Sept-2017
* @codeFor	: Search Daily Cash
 ************/
function getFinaceDetails(callF,deptId){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getReceiptFinance",
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
	var concession=0;
	var tottotal=0;
	
	for(var i=0;i<res.listBillReceiptMaster.length;i++){
		
		var patName=res.listBillReceiptMaster[i].bName;
		var patientId=res.listBillReceiptMaster[i].patientId;
		var cash=res.listBillReceiptMaster[i].totalAmt;
		var card=res.listBillReceiptMaster[i].totalPaid;
		var cheque=res.listBillReceiptMaster[i].totalRemain;
		var commonAdvc=res.listBillReceiptMaster[i].totalDisc;
		var multiple=res.listBillReceiptMaster[i].refundAmt;
		var concession=res.listBillReceiptMaster[i].concession;		//added by sandip
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
		//totconc=Number(totconc)+Number(concession);
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
	$("#conTot").html(parseFloat(concession).toFixed(2));	//added by sandip
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
		url 	: "ehat/finance/getRefundFinance",
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
	var totalconc=0;
	
	for(var i=0;i<res.listBillRefundMaster.length;i++){
				
		var patName=res.listBillRefundMaster[i].bName;
		var patientId=res.listBillRefundMaster[i].patientId;
		var cash=res.listBillRefundMaster[i].totalAmt;
		var card=res.listBillRefundMaster[i].totalPaid;
		var cheque=res.listBillRefundMaster[i].totalRemain;
		var commonAdvc=res.listBillRefundMaster[i].totalDisc;
		var concession=res.listBillRefundMaster[i].concession;
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
		//totalconc=Number(totalconc)+Number(concession);
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
	$("#conTot").val(parseFloat(concession).toFixed(2));
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
		url 	: "ehat/finance/saveFinaceBankDetails",
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
        url : "ehat/finance/getFinBankMasterList",

        success : function(r) {
        	
        	//setTempForBanktList(r);//call template
        	setTempForBank(r);
        }
   });
}

function setTempForBank(r){
	//alert("Hello");
	var index=1;
	var htm="";
	
	for(var i=0;i<r.lstFinanceBankMaster.length;i++){
		//alert(r.lstFinanceBankMaster.length);
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstFinanceBankMaster[i].bankName+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstFinanceBankMaster[i].acc_no+'</td>'	
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editBankMaster('+r.lstFinanceBankMaster[i].id+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteBankMaster('+r.lstFinanceBankMaster[i].id+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#masterModuleBodyNarr").html(htm);
}

function loadData() {
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var dispatchFlag = 0;
	var vendorId = $("#suplierName").val();
	if (vendorId == "" || vendorId == null || vendorId == undefined
			|| isNaN(vendorId)) {
		vendorId = 0;
	}

	if (fromDate != '' && toDate != '') {
		var inputs = [];

		inputs.push('from=' + fromDate);
		inputs.push('to=' + toDate);
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
				//alert("error");
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var deptId = parseInt($("#deptId").val());
	var meeshaFlow = $("#meeshaFlow").val();
	
	//for searching sponsor
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("deptId=" + deptId);
	inputs.push("chargesSlaveId=" +chargesSlaveId);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/fetchPatientsRecords",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(deptId == 1 || deptId == 3){
				var temp="";
				var tempHead="";
				tempHead=tempHead+'<tr>'
				+'<th style="height: 21.5px;width: 5%" >Sr.No.</th>'
				+'<th style="height: 21.5px;width: 10%;display:none;">Patient Id</th>'
				+'<th style="height: 21.5px;width: 10%" id="thCenterPatientId1">UHID</th>'
				+'<th style="height: 21.5px;width: 10%" >OPD No</th>'
				+'<th style="height: 21.5px;width: 18%" >Patient Name</th>'	
				+'<th style="height: 21.5px;width: 10%" >Admit Date</th>	'
				+'<th style="height: 21.5px;width: 10%" >Admit Time</th>	'
				//+'<th style="height: 21.5px;width: 10%" >Discharge Date</th>'	
				+'<th style="height: 21.5px;width: 10%">Consulting Doctor</th>'
				+'<th style="height: 21.5px;width: 10%">Ref. Doctor</th>'
				//+'<th style="height: 21.5px;width: 10%" >Company Name</th>	'
				+'<th style="height: 21.5px;width: 10%" >OPD Bill No</th>'	
				+'<th style="height: 21.5px;width: 15%" >Company Name</th>'	
				+'<th style="height: 21.5px;width: 15%" >Visit Type</th>'	
				+'<th style="height: 21.5px;width: 15%" >User Name</th>'
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
						
						if(r.listRegTreBillDto[i].docName ==null || r.listRegTreBillDto[i].docName =="null" || r.listRegTreBillDto[i].docName =="NULL"){
							
							r.listRegTreBillDto[i].docName="-";
						}
						
						var refDoc = r.listRegTreBillDto[i].refDocPrefix+" "+r.listRegTreBillDto[i].refDoctorName;
						
						if(meeshaFlow == "on"){
							 
							 Bill_ID=r.listRegTreBillDto[i].billId;
						 }
						 else{
							 	Bill_ID=r.listRegTreBillDto[i].billNo;
						 }
						
						temp=temp+ '<tr>'
						+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].centerPatientId+'</td> '
						+' <td style="height: 21.5px;width: 10%;display:none;">'+r.listRegTreBillDto[i].patientId+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '					
						+' <td style="height: 21.5px;width: 18%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
						+' <td style="height: 21.5px;width: 10%" >'+dd[0]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+dd[1]+'</td> '
						//+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].dischargeDate+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+refDoc+'</td>	'
						//+' <td style="height: 21.5px;width: 10%" >'+patType+'</td> '
						+' <td style="height: 21.5px;width: 10%" > '+Bill_ID+'</td>	'
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].categoryName+'</td>	'	
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].visittype+'</td>	'	
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].username+'</td>	'
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
				+'<th style="height: 21.5px;width: 10%;display:none;">Patient Id</th>'
				+'<th style="height: 21.5px;width: 11%" id="thCenterPatientId2">UHID</th>'
				+'<th style="height: 21.5px;width: 10%" >IPD No</th>'
				+'<th style="height: 21.5px;width: 12%" >Patient Name</th>'	
				+'<th style="height: 21.5px;width: 7%" >Admit Date</th>	'
				+'<th style="height: 21.5px;width: 7%" >Admit Time</th>	'
				+'<th style="height: 21.5px;width: 9%" >Discharge Date</th>'	
				+'<th style="height: 21.5px;width: 10%"	>Consulting Doctor</th>'
				+'<th style="height: 21.5px;width: 10%"	>Ref. Doctor</th>'
				+'<th style="height: 21.5px;width: 9%" >Company Name</th>	'
				+'<th style="height: 21.5px;width: 10%" >Ward Type</th>'
				+'<th style="height: 21.5px;width: 15%" >Visit Type</th>'	
				+'<th style="height: 21.5px;width: 15%" >User Name</th>'
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
						
						if(r.listRegTreBillDto[i].docName ==null || r.listRegTreBillDto[i].docName =="null" || r.listRegTreBillDto[i].docName =="NULL"){
							
							r.listRegTreBillDto[i].docName="-";
						}
						
						var refDoc = r.listRegTreBillDto[i].refDocPrefix+" "+r.listRegTreBillDto[i].refDoctorName;
						
						temp=temp+ '<tr>'
						+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].centerPatientId+'</td> '
						+' <td style="height: 21.5px;width: 10%;display:none;" >'+r.listRegTreBillDto[i].patientId+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '					
						+' <td style="height: 21.5px;width: 14%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
						+' <td style="height: 21.5px;width: 7%" >'+dd[0]+'</td> '
						+' <td style="height: 21.5px;width: 7%" >'+dd[1]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].dischargeDate+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+patType+'</td> '
						+' <td style="height: 21.5px;width: 10%" > '+bedName+'</td>	'	
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].visittype+'</td>	'	
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].username+'</td>	'
						+' </tr>';							
					}
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 14%" >Total Admit</th> '	
					+' <th style="height: 21.5px;width: 7%" >'+(r.listRegTreBillDto.length)+'</th> '
					+' <th style="height: 21.5px;width: 7%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 10%" ></th>	'	

					
					+' </tr>';
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 14%" >Total Discharge</th> '	
					+' <th style="height: 21.5px;width: 7%" >'+(dischrgPat)+'</th> '
					+' <th style="height: 21.5px;width: 7%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'																								
					+' </tr>';
					
					var totRem=Number(admitPat)-Number(dischrgPat);
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 14%" >Total Patients</th> '	
					+' <th style="height: 21.5px;width: 7%" >'+totRem+'</th> '
					+' <th style="height: 21.5px;width: 7%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th> '
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
				+'<th style="height: 21.5px;width: 2%" >Sr.No.</th>'
				+'<th style="height: 21.5px;width: 10%;display:none;">Patient Id</th>'
				+'<th style="height: 21.5px;width: 8%" id="thCenterPatientId3">UHID</th>'
				+'<th style="height: 21.5px;width: 10%" >OPD/IPD No</th>'
				+'<th style="height: 21.5px;width: 14%" >Patient Name</th>'	
				+'<th style="height: 21.5px;width: 7%" >Admit Date</th>	'
				+'<th style="height: 21.5px;width: 7%" >Admit Time</th>	'
				+'<th style="height: 21.5px;width: 10%" >Discharge Date</th>'	
				+'<th style="height: 21.5px;width: 10%">Consulting Doctor</th>'	
				+'<th style="height: 21.5px;width: 9%">Ref. Doctor</th>'
				+'<th style="height: 21.5px;width: 11%" >Ward Type</th>	'
				+'<th style="height: 21.5px;width: 10%" >OPD Bill No</th>'	
				+'<th style="height: 21.5px;width: 15%" >Sponser Name</th>'	
				+'<th style="height: 21.5px;width: 15%" >Visit Type</th>'	
				+'<th style="height: 21.5px;width: 15%" >User Name</th>'	

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
						
						if(meeshaFlow == "on"){
							 
							 Bill_ID=r.listRegTreBillDto[i].billId;
						 }
						 else{
							 	Bill_ID=r.listRegTreBillDto[i].billNo;
						 }
						
						if(deptId == 0){
						if(r.listRegTreBillDto[i].departmentId == 1 || r.listRegTreBillDto[i].departmentId == 3){
							
							billNoForAll=Bill_ID;
							
			 			}else{			 			
			 				billNoForAll = "-";						
						}
						}
						
						if(r.listRegTreBillDto[i].dischargeDate==null)
							{
								r.listRegTreBillDto[i].dischargeDate="-";
							}
						
						if(r.listRegTreBillDto[i].docName ==null || r.listRegTreBillDto[i].docName =="null" || r.listRegTreBillDto[i].docName =="NULL"){
							
							r.listRegTreBillDto[i].docName="-";
						}
						
						var refDoc = r.listRegTreBillDto[i].refDocPrefix+" "+r.listRegTreBillDto[i].refDoctorName;
						
						temp=temp+ '<tr>'
						+' <td style="height: 21.5px;width: 2%">'+(i+1)+'</td> '
						+' <td style="height: 21.5px;width: 8%" >'+r.listRegTreBillDto[i].centerPatientId+'</td> '
						+' <td style="height: 21.5px;width: 10%;display:none;" >'+r.listRegTreBillDto[i].patientId+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].trcount+'</td> '					
						+' <td style="height: 21.5px;width: 14%" >'+r.listRegTreBillDto[i].patientName+'</td> '	
						+' <td style="height: 21.5px;width: 7%" >'+dd[0]+'</td> '
						+' <td style="height: 21.5px;width: 7%" >'+dd[1]+'</td> '
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].dischargeDate+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td>	'
						+' <td style="height: 21.5px;width: 10%" >'+refDoc+'</td>	'
						+' <td style="height: 21.5px;width: 11%" >'+bedName+'</td> '
						+' <td style="height: 21.5px;width: 10%" > '+billNoForAll+'</td>	'		
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].categoryName+'</td>	'	
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].visittype+'</td>	'	
						+' <td style="height: 21.5px;width: 15%" > '+r.listRegTreBillDto[i].username+'</td>	'	

						+' </tr>';							
					}
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 14%" >Total Admit</th> '	
					+' <th style="height: 21.5px;width: 7%" >'+(r.listRegTreBillDto.length)+'</th> '
					+' <th style="height: 21.5px;width: 7%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 10%" ></th>	'
					+' <th style="height: 21.5px;width: 11%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					
					
					+' </tr>';
					
					temp=temp+ '<tr>'
					+' <th style="height: 21.5px;width: 5%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'	
					+' <th style="height: 21.5px;width: 14%" >Total Discharge</th> '	
					+' <th style="height: 21.5px;width: 7%" >'+(dischrgPat)+'</th> '
					+' <th style="height: 21.5px;width: 7%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
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
					+' <th style="height: 21.5px;width: 14%" >Total Patients</th> '	
					+' <th style="height: 21.5px;width: 7%" >'+totRem+'</th> '
					+' <th style="height: 21.5px;width: 7%" ></th> '
					+' <th style="height: 21.5px;width: 10%" ></th>	'
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	
	callF=$("#searchType").val();
	
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
		url 	: "ehat/finance/fetchIpdPatientsRecords",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			$("#container").html(" ");
			var temp="";
			var finalTotBill=0,finalTotPaid=0,finalToDisc=0,finalTotBal=0,finalTotRefund=0;
			
			if(r.listRegTreBillDto.length > 0){
				
				for(var i=0;i < r.listRegTreBillDto.length;i++){
											
					var date=new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString('en-GB');					
					var dd=date.split(',');
					
					
					var patType="";
					var catType="";
					
					var totBill = r.listRegTreBillDto[i].totBill;
					var totPaid = r.listRegTreBillDto[i].totPaid;
					var totBal = r.listRegTreBillDto[i].totBal;
					var totrefund = r.listRegTreBillDto[i].totalRefund;
					var totdiscount = r.listRegTreBillDto[i].totDisc;
					
					if(totBal < 0){
						totBal =0;
					}
					
					finalTotBill=Number(finalTotBill)+Number(totBill);
					finalTotPaid=Number(finalTotPaid)+Number(totPaid);
					//finalTotBal=Number(finalTotBal)+Number(totBal);
					finalTotBal=Number(finalTotBal)+Number(totBal);
					finalToDisc=Number(finalToDisc)+Number(totdiscount);
					finalTotRefund=Number(finalTotRefund)+Number(totrefund);
					
					var spId=r.listRegTreBillDto[i].chargesMasterSlaveId;
					
					if(spId > 0){					
						
						patType=r.listRegTreBillDto[i].imageName;
						catType="Sponsor";
		 			}else{
		 				
		 				patType="Self Paying";		
		 				catType="Hospital";
					}
					
					if(r.listRegTreBillDto[i].bedName==null)
						{
							r.listRegTreBillDto[i].bedName="-";
						}
					if(r.listRegTreBillDto[i].address=="null")
					{
						r.listRegTreBillDto[i].address="-";
					}
					
					var refDoc = r.listRegTreBillDto[i].refDocPrefix+" "+r.listRegTreBillDto[i].refDoctorName;
					
					temp=temp+ '<tr> '
					+' <td style="height: 21.5px;width: 5%" >'+(i+1)+'</td> '
					+' <td style="height: 21.5px;width: 5%" >'+r.listRegTreBillDto[i].patientId+'</td> '
					+' <td style="height: 21.5px;width: 5%" >'+r.listRegTreBillDto[i].billNo+'</td> '
					+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].patientName+'</td>	'
					+' <td style="height: 21.5px;width: 7%" >'+catType+'</td> '
					+' <td style="height: 21.5px;width: 12%" >'+patType+'</td> '
					+' <td style="height: 21.5px;width: 11%" >'+r.listRegTreBillDto[i].bedName+'</td>	'
					+' <td style="height: 21.5px;width: 7%" >'+r.listRegTreBillDto[i].trcount+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+dd[0] + " " + dd[1] +'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+r.listRegTreBillDto[i].dischargeDate+'</td> '
					+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].address+'</td>	'
					+' <td style="height: 21.5px;width: 10%" >'+refDoc+'</td>	'
					+' <td style="height: 21.5px;width: 10%" >'+parseFloat(totBill).toFixed(2)+'</td> '
					//+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totBal).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totBal).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totPaid).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 5%" >'+parseFloat(totrefund).toFixed(2)+'</td> '
					+' <td style="height: 21.5px;width: 6%" >'+parseFloat(totdiscount).toFixed(2)+'</td>'
                    +' <td style="height: 21.5px;width: 4%" >No</td> '
                	+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].approveRemark+'</td>	'	
                	+' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].approveBy+'</td>	'
					+' </tr> ';						
				}	
				
				temp=temp+ '<tr> '
				+' <th style="height: 21.5px;width: 5%" ></th> '
				+' <th style="height: 21.5px;width: 5%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 7%" ></th>	'
				+' <th style="height: 21.5px;width: 12%" ></th> '
				+' <th style="height: 21.5px;width: 11%" ></th>	'
				+' <th style="height: 21.5px;width: 7%" ></th>	'
				+' <th style="height: 21.5px;width: 6%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 10%" ></th> '
				+' <th style="height: 21.5px;width: 10%" >Total</th> '
				+' <th style="height: 21.5px;width: 10%" >'+parseFloat(finalTotBill).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalTotBal).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalTotPaid).toFixed(2)+'</th> '
				+' <th style="height: 21.5px;width: 5%" >'+parseFloat(finalTotRefund).toFixed(2)+'</th> ' 
				+' <th style="height: 21.5px;width: 6%" >'+parseFloat(finalToDisc).toFixed(2)+'</th> '
				+' <td style="height: 21.5px;width: 4%" >' +'</td>'																							
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
	$("#deptId").val(3);
	//getDailyCollectionReport("diag");
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
	
	$("#deptId").val(1);
	getDailyCollectionReport("opd");
	//getFinaceDetails('hisab',1);	
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
	
	$("#deptId").val(2);
	getDailyCollectionReport("ipd");
	//getFinaceDetails('hisab',1);	
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
		url 	: "ehat/finance/fetchOpdDiagnoRec",
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/fetchOpdDiagnoPatients",
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
	var meeshaFlow = $("#meeshaFlow").val();
	if(r.lstOpdDiagno.length > 0){
		
		var j=1;
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
			
			var BalAmt = r.lstOpdDiagno[i].remainAmt;
			BalAmt = Number(r.lstOpdDiagno[i].billAmt)-(Number(r.lstOpdDiagno[i].paidAmt)
							+Number(r.lstOpdDiagno[i].concession)+Number(r.lstOpdDiagno[i].discount));
			totPrice=Number(totPrice)+Number(r.lstOpdDiagno[i].price);
			totAmount=Number(totAmount)+Number(r.lstOpdDiagno[i].amount);
			totConcession=Number(totConcession)+Number(r.lstOpdDiagno[i].concession);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');	
			
	/*	var billTime=new Date(r.lstOpdDiagno[i].billDate).toLocaleTimeString('en-GB');
			billDate = billDate +" "+billTime;*/
			
			if(r.lstOpdDiagno[i].sponsorName==null)
				{
					r.lstOpdDiagno[i].sponsorName="-";
				}
			if(r.lstOpdDiagno[i].user==null)
			{
				r.lstOpdDiagno[i].user="-";
			}
			
			 if(meeshaFlow == "on"){
				 
				 Bill_ID=r.lstOpdDiagno[i].billId;
			 }
			 else{
				 	Bill_ID=r.lstOpdDiagno[i].billNo;
			 }
			
			temp=temp+ '<tr>'
				+ ' <td >'+(i+1)+'</td>'
			    + ' <td>'+r.lstOpdDiagno[i].patientId+'</td> '
			    + ' <td >'+r.lstOpdDiagno[i].patientName+'</td> '
				+ ' <td >'+Bill_ID+'</td> '
				+ ' <td >'+billDate+'</td> '
				+ ' <td >'+r.lstOpdDiagno[i].mobile+'</td> '
				+ ' <td >'+r.lstOpdDiagno[i].refDr+'</td> '
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].discount).toFixed(2)+'</td> '
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '		
				//+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(BalAmt).toFixed(2)+'</td> '	
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '
				+ ' <td >'+r.lstOpdDiagno[i].sourceName+'</td> '	
				+ ' <td >'+r.lstOpdDiagno[i].sourceGroup+'</td> '
				+ ' <td >'+r.lstOpdDiagno[i].categoryName+'</td> '					
				+ ' <td >'+r.lstOpdDiagno[i].serviceName+'</td> '						
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].price).toFixed(2)+'</td> '		
				+ ' <td >'+r.lstOpdDiagno[i].qty+'</td> '
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].amount).toFixed(2)+'</td> '		
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].concession).toFixed(2)+'</td> '
				+ ' <td >'+r.lstOpdDiagno[i].treatDr+'</td> '						
				+ ' <td >'+parseFloat(r.lstOpdDiagno[i].cost).toFixed(2)+'</td> '	
				+ ' <td >'+r.lstOpdDiagno[i].sponsorName+'</td> '
				+ ' <td >'+r.lstOpdDiagno[i].user+'</td> '	
				+ ' <td >'+r.lstOpdDiagno[i].unitName+'</td> '
			+' </tr>';	
		}
		
		temp=temp+ '<tr>'
			+ ' <th ></th> '
		    + ' <th></th> '
		    + ' <th ></th> '
			+ ' <th ></th> '			
			+ ' <th ></th> '
			+ ' <th ></th> '
			+ ' <th ></th> '
			+ ' <th ></th> '
			+ ' <th "></th> '	
			+ ' <th ></th> '	
			+ ' <th ></th> '
			+ ' <th ></th> '	
			+ ' <th ></th> '		
			+ ' <th ></th> '		
			+ ' <th >Total</th> '	
			+ ' <th >'+parseFloat(totPrice).toFixed(2)+'</th> '	
			+ ' <th ></th> '		
			+ ' <th>'+parseFloat(totAmount).toFixed(2)+'</th> '		
			+ ' <th >'+parseFloat(totConcession).toFixed(2)+'</th> '		
			+ ' <th ></th> '
			+ ' <th ></th> '
			+ ' <th ></th> '
			+ ' <th ></th> '
			+ ' <th ></th> '
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/fetchOpdDiagnoRec",
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
	var meeshaFlow = $("#meeshaFlow").val();
	if(r.lstOpdDiagnoRec.length > 0){
		
		for(var i=0;i < r.lstOpdDiagnoRec.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagnoRec[i].recAmt);
			
			var billDate=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleDateString('en-GB');	
			var billTime=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleTimeString('en-GB');
			billDate = billDate +" "+billTime;
			
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
			
			if(meeshaFlow == "on"){
				 
				 Bill_ID=r.lstOpdDiagnoRec[i].billId;
			 }
			 else{
				 	Bill_ID=r.lstOpdDiagnoRec[i].billNo;
			 }
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+billDate+'</td> '																	
				+ ' <td style="height: 21.5px;width: 12%">'+r.lstOpdDiagnoRec[i].patientName+'</td> '																			
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagnoRec[i].recAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].payment_mode+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].cardChqNo+'</td> '	
				+ ' <td style="height: 21.5px;width: 12%">'+r.lstOpdDiagnoRec[i].bank+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+Bill_ID+'</td> '	
				+ ' <td style="height: 21.5px;width: 8%">'+billDate+'</td> '		
				+ ' <td style="height: 21.5px;width: 8%">'+r.lstOpdDiagnoRec[i].source+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 10%">'+userName+'</td> ' 
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagnoRec[i].unitName+'</td> ' 
			+ ' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '																	
			+ ' <th style="height: 21.5px;width: 12%">Total</th> '																			
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 12%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
		+' </tr>';		
	}
	$("#container").html(temp);		
}

function setOpdDiagnoDeletedRecData(r){
	
	var temp="";
	var totAmt=0;
	var meeshaFlow = $("#meeshaFlow").val();
	if(r.lstOpdDiagnoRec.length > 0){
		
		for(var i=0;i < r.lstOpdDiagnoRec.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagnoRec[i].recAmt);
			
			var billDate=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleDateString('en-GB');	
			var billTime=new Date(r.lstOpdDiagnoRec[i].billDate).toLocaleTimeString('en-GB');
			billDate = billDate +" "+billTime;
			
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
			
			var userName=r.lstOpdDiagnoRec[i].deleted_user_name;
			if(userName==null){
				userName="-";
			}
			
			if(meeshaFlow == "on"){
				 
				 Bill_ID=r.lstOpdDiagnoRec[i].billId;
			 }
			 else{
				 	Bill_ID=r.lstOpdDiagnoRec[i].billNo;
			 }
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 2%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagnoRec[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstOpdDiagnoRec[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+billDate+'</td> '																	
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagnoRec[i].recAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].payment_mode+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].cardChqNo+'</td> '	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagnoRec[i].bank+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+Bill_ID+'</td> '	
				+ ' <td style="height: 21.5px;width: 6%">'+billDate+'</td> '		
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].source+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 6%">'+userName+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 7%">'+deletedDate+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 5%">'+userName+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagnoRec[i].deletedRemark+'</td> ' 
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstOpdDiagnoRec[i].unitName+'</td> ' 
			+ ' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 2%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 6%">Total</th> '																	
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 6%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 6%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '
		+' </tr>';		
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
	
	var str = getDateFormat(fromDate, toDate);
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var filterBy = 0;//parseInt($("#sourceType").val());	
	var specialityId=0;
	var docId=0;
	var reasonId=0;
	
/*	if(filterBy == 1){
		
		specialityId = parseInt($("#iConsSpec").val());
	}
	if(filterBy == 2){
		
		docId = parseInt($("#iConsDoc").val());
	}
	if(filterBy == 3){
		
		reasonId = parseInt($("#reasonofvisit").val());
	}*/
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("filterBy=" + filterBy);	
	inputs.push("specialityId=" + specialityId);
	inputs.push("docId=" + docId);
	inputs.push("reasonId=" + reasonId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getBillRegisterReport",
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
			var recTime=new Date(r.lstBillReg[i].recDate).toLocaleTimeString('en-GB');
		//	recDate = recDate + " " + recTime;
			var refDr=r.lstBillReg[i].refDr;
			if(refDr==null){
				refDr="";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].patientid+'</td> '
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].treatment_id+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 6%">'+r.lstBillReg[i].opdipdno+'</td> '  
				+ ' <td style="height: 21.5px;width: 6%">'+r.lstBillReg[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+recDate+'</td> '																																							
				+ ' <td style="height: 21.5px;width: 10%">'+refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].drName+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].serviceName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '								
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].source+'</td> '
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 6%"></th> '																	
			+ ' <th style="height: 21.5px;width: 6%"></th> '																		
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> ' 
			+ ' <th style="height: 21.5px;width: 10%">Total</th> '
			+ ' <th style="height: 21.5px;width: 7%">'+ parseFloat(totAmt).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%">'+ parseFloat(totDisc).toFixed(2)+'</th> ' 
			+ ' <th style="height: 21.5px;width: 5%">'+ parseFloat(totPaid).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 6%">'+ parseFloat(totRem).toFixed(2)+'</th> '			
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 4%"></th> '			
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getOutstandingReport",
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
			
			var recDate=new Date(r.lstBillReg[i].recDate).toLocaleDateString('en-GB');					
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].patientid+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].billId+'</td> '
				+ ' <td style="height: 21.5px;width: 4%">'+r.lstBillReg[i].recNo+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+recDate+'</td> '																		
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].source+'</td> '																		
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td> '   
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].authority+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].userName+'</td> '	
				+ ' <td style="height: 21.5px;width: 15%">'+r.lstBillReg[i].sponsorName+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+r.lstBillReg[i].remark+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].unitName+'</td> '	
			+' </tr>';													
		}
		5
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '																		
			+ ' <th style="height: 21.5px;width: 10%"></th> '																			
			+ ' <th style="height: 21.5px;width: 5%">Total</th> '																		
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totPaid).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totRem).toFixed(2)+'</th> '		
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 15%"></th> '
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getIpdBillStatus",
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
			var totConc = r.listRegTreBillDto[i].totConc;
			var totDisc = r.listRegTreBillDto[i].totDisc;
			var totBal = Number(totBill)-Number(totPaid)-Number(totDisc)-Number(totConc);
			var totAdv = Number(totBill)-Number(totPaid)-Number(totDisc)-Number(totConc);
			
			//var totBal = Number(totBill)-Number(totPaid);
			//var totDisc = r.listRegTreBillDto[i].totDisc;
			//var totAdv = Number(totBal)-Number(totDisc);
			
			
			if(totBal < 0){
				
				totBal=0;
			}
			
			if(totAdv < 0){
				
				totAdv=0;
			}
			
			finalTotBill=Number(finalTotBill)+Number(totBill);			
			finalTotPaid=Number(finalTotPaid)+Number(totPaid);		
			finalTotAdv=Number(finalTotAdv)+Number(totAdv);
			finalTotBal=Number(finalTotBal) + Number(totBal);
						
			if(totBal<0){
				
				totBal=0;
			}
			
			temp=temp+ '<tr> ' +'<td style="height: 21.5px;width: 4%">'+(i+1)+'</td>'
			+ ' <td style="height: 21.5px;width: 5%" >'+r.listRegTreBillDto[i].patient_id+'</td> '
			+ ' <td style="height: 21.5px;width: 15%" >'+r.listRegTreBillDto[i].patientName+'</td> '
			+ ' <td style="height: 21.5px;width: 7%" >'+r.listRegTreBillDto[i].trcount+'</td> '
			+ ' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].docName+'</td> '
			+ ' <td style="height: 21.5px;width: 7%" >'+r.listRegTreBillDto[i].sponsor_name+'</td> '
			+ ' <td style="height: 21.5px;width: 8%" >'+dd[0] + " " + dd[1] +'</td> '
			+ ' <td style="height: 21.5px;width: 15%" >'+r.listRegTreBillDto[i].bedName+'</td> '
			+ ' <td style="height: 21.5px;width: 10%" >'+r.listRegTreBillDto[i].ref_doctor_name+'</td> '
			+ ' <td style="height: 21.5px;width: 7%" >'+parseFloat(totPaid).toFixed(2)+'</td> '																		
			+ ' <td style="height: 21.5px;width: 7%" >'+parseFloat(totBill).toFixed(2)+'</td> '
			+ ' <td style="height: 21.5px;width: 7%" >'+parseFloat(totBal).toFixed(2)+'</td>	'
			+ ' <td style="height: 21.5px;width: 10%" >'+parseFloat(totAdv).toFixed(2)+'</td> '																							
			+ ' </tr> ';						
		}	
		
		
		
		temp=temp+ '<tr> ' + ' <th style="height: 21.5px;width: 4%" ></th> '
		+ ' <th style="height: 21.5px;width: 5%" ></th> '
		+ ' <th style="height: 21.5px;width: 15%" ></th> '	
		+ ' <th style="height: 21.5px;width: 7%" ></th> '
		+ ' <th style="height: 21.5px;width: 10%" ></th> '
		+ ' <th style="height: 21.5px;width: 7%" ></th> '
		+ ' <th style="height: 21.5px;width: 8%" ></th> '
		+ ' <th style="height: 21.5px;width: 15%" ></th> '
		+ ' <th style="height: 21.5px;width: 10%" >Total</th> '																			
		+ ' <th style="height: 21.5px;width: 7%" >'+parseFloat(finalTotPaid).toFixed(2)+'</th> '																		
		+ ' <th style="height: 21.5px;width: 7%" >'+parseFloat(finalTotBill).toFixed(2)+'</th> '
		+ ' <th style="height: 21.5px;width: 7%" >'+parseFloat(finalTotBal).toFixed(2)+'</th>	'
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getIpdWaitingBill",
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
			
			/*temp=temp+ '<tr style="border:none"> '
			+ '<th >UHID</th> '	
			+ '<th >Patient Name</th> '	
			+ '<th >Bill ID</th> '	
			+ '<th >Cash/Credit</th> '	
			+ '<th >Bill Date</th> '																			
			+ '<th >In Time</th> '	
			+ '<th >Bill Time</th> '	
			+ '<th >Time</th> '	
			+ '<th >Ipd No</th> '	
			+ '<th >Company Name[Category Name]</th> '	
			+ ' </tr> ';
			
			temp=temp+ '<tr style="border:none"> '
			+ '<th  ></th> '
			+ '<th  ></th> '
			+ '<th ></th> '
			+ '<th  ></th> '
			+ '<th >'+compDate+'</th> '																			
			+ '<th ></th> '	
			+ '<th ></th> '
			+ '<th  ></th> '
			+ '<th ></th> '	
			+ '<th  ></th> '
			+ ' </tr> ';*/
			
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
				
				if(dd[0]==compDate){
									
					temp=temp+ '<tr> '
					+ '<td >'+r.listRegTreBillDto[i].patientId+'</td> '
					+ '<td  >'+r.listRegTreBillDto[i].patientName+'</td> '
					+ '<td>'+r.listRegTreBillDto[i].invoiceCount+'</td> '
					+ '<td >'+cashCredit+'</td> '
					+ '<td >'+dd[0]+'</td> '																			
					+ '<td >'+dd[1]+'</td> ';
					if(token > 0){
						
						temp=temp + '<td  >'+recDd[1]+'</td> ';
					}else{
						
						temp=temp + '<td  > - </td> ';
					}
					
					temp=temp + '<td  >'+parseFloat(difference).toFixed(2)+'</td> '
					+ '<td  >'+r.listRegTreBillDto[i].trcount+'</td> '	
					+ '<td  >'+patType+' [ '+catType+' ]</td> '
					+ ' </tr> ';				
				}	
				
				totMin=Number(totMin)+Number(difference);
			}
		}		
		if(count > 0){
			
			avg=Number(totMin)/Number(count);
		}
		
		temp=temp+ '<tr style="border:none"> '
		+ '<th></th> '
		+ '<th></th> '
		+ '<th></th> '
		+ '<th></th> '
		+ '<th></th> '																			
		+ '<th></th> '	
		+ '<th>Avg</th> '
		+ '<th>'+parseFloat(avg).toFixed(2)+'</th> '
		+ '<th></th> '		
		+ '<th></th> '
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
		url 	: "ehat/finance/getHeadwiseReport",
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getHeadwiseReport",
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
				+ ' <th style="height: 21.5px;width: 10%" ></th> '
				+ ' <th style="height: 21.5px;width: 25%" ></th> '																		
				+ ' <th style="height: 21.5px;width: 25%" ></th> '	
				+ ' <th style="height: 21.5px;width: 15%" ></th> '		
				+ ' </tr> ';			
			for(var i=0;i < r.lstBillrpt.length;i++){
								
				if(servId==r.lstBillrpt[i].servId){
					
					temp=temp + '<tr> '
					+ ' <td style="height: 21.5px;width: 10%" >'+r.lstBillrpt[i].patient_id+'</td> '
					+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientName+'</td> '
					+ ' <td style="height: 21.5px;width: 10%" >'+r.lstBillrpt[i].ipdno+'</td> '
					+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].patientType+'</td> '																			
					+ ' <td style="height: 21.5px;width: 25%" >'+r.lstBillrpt[i].doctorName+'</td> '
					+ ' <td style="height: 21.5px;width: 15%" >'+parseFloat(r.lstBillrpt[i].charges).toFixed(2)+'</td> '																						
					+ ' </tr> ';	
					
					servTot=Number(servTot)+Number(r.lstBillrpt[i].charges);					
				}					
			}	
			
			temp=temp + '<tr> '
			+ ' <th style="height: 21.5px;width: 10%" ></th> '
			+ ' <th style="height: 21.5px;width: 25%" ></th> '
			+ ' <th style="height: 21.5px;width: 10%" ></th> '
			+ ' <th style="height: 21.5px;width: 25%" ></th> '																			
			+ ' <th style="height: 21.5px;width: 25%" >Total</th> '
			+ ' <th style="height: 21.5px;width: 15%" >'+parseFloat(servTot).toFixed(2)+'</th> '																						
			+ ' </tr> ';
			
			finalTot=Number(finalTot)+Number(servTot);
			
			//$("#container").html(temp);			
		}	
		
		temp=temp + '<tr> '
		+ ' <th style="height: 21.5px;width: 10%" ></th> '
		+ ' <th style="height: 21.5px;width: 25%" ></th> '
		+ ' <th style="height: 21.5px;width: 10%" ></th> '
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getPatientTypeWiseIpdBill",
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
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 8%"></th> '			
			+' <th style="height: 21.5px;width: 8%">Cash</th> '																
			+' <th style="height: 21.5px;width: 25%"></th> '																			
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
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Type :</th> '																
					+' <th style="height: 21.5px;width: 25%">'+r.lstBillReg[i].source+'</th> '																			
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
					+' <th style="height: 21.5px;width: 5%"></th> '	
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Name :</th> '																
					+' <th style="height: 21.5px;width: 25%">'+r.lstBillReg[i].sponsorLeaf+'</th> '																			
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
					+' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].patient_id+'</td> '
					+' <td style="height: 21.5px;width: 8%">'+r.lstBillReg[i].billNo+'</td> '			
					+' <td style="height: 21.5px;width: 8%">'+recDate+'</td> '																
					+' <td style="height: 21.5px;width: 25%">'+r.lstBillReg[i].patientName+'</td> '																			
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
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%"></th> '																
					+' <th style="height: 21.5px;width: 25%"></th> '																			
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
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 8%"></th> '			
			+' <th style="height: 21.5px;width: 8%">Credit</th> '																
			+' <th style="height: 21.5px;width: 25%"></th> '																			
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
					+' <th style="height: 21.5px;width: 5%"></th> '	
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Type :</th> '																
					+' <th style="height: 21.5px;width: 25%">'+r.lstBillReg[i].source+'</th> '																			
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
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%">Company Name :</th> '																
					+' <th style="height: 21.5px;width: 25%">'+r.lstBillReg[i].sponsorLeaf+'</th> '																			
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
					+' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].patient_id+'</td> '
					+' <td style="height: 21.5px;width: 8%">'+r.lstBillReg[i].billNo+'</td> '			
					+' <td style="height: 21.5px;width: 8%">'+recDate+'</td> '																
					+' <td style="height: 21.5px;width: 25%">'+r.lstBillReg[i].patientName+'</td> '																			
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
					+' <th style="height: 21.5px;width: 5%"></th> '
					+' <th style="height: 21.5px;width: 8%"></th> '			
					+' <th style="height: 21.5px;width: 8%"></th> '																
					+' <th style="height: 21.5px;width: 25%"></th> '																			
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getIpdBillDiscountRegister",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setIpdBillDiscountRegister(r);
		}
	});
}

/************
* @author	: Vinod Udawant// modify by ajay:15-09-2019 reson: handle null  if value is null and undefind  then display "_"
* @date		: 05-Feb-2018      //
* @codeFor	: Fetch Opd Digno bills
*************/
function setIpdBillDiscountRegister(r){
	
	var temp="";
	var totBill=0;
	var totCon=0;
	let pidArr =[];
	var totBillnew=0;
	
	if(r.lstBillReg.length > 0){
		
		for(var i=0;i < r.lstBillReg.length;i++){
			var conGivenBy = r.lstBillReg[i].conGivenBy;
			
			var conGivenByName;
			if (conGivenBy == null || conGivenBy == undefined) {
				conGivenByName = '-';
			} else {
				conGivenByName = conGivenBy;
			}

			var conCategory = r.lstBillReg[i].conCategory;
			var conCategoryName;
			if (conCategory == null || conCategory == undefined) {
				conCategoryName = '-';
			} else {
				conCategoryName = conCategory;
			}
		                
			
			if (!pidArr.includes(r.lstBillReg[i].patientid)) {
			   
			    totBillnew = Number(totBillnew)+Number(r.lstBillReg[i].totAmt);
			    pidArr = pidArr.concat(r.lstBillReg[i].patientid);
			}
			
			//totBill = Number(totBill)+Number(r.lstBillReg[i].totAmt);
			totCon = Number(totCon)+Number(r.lstBillReg[i].discAmt);
			
			temp=temp+ '<tr>'				
				+' <td style="height: 21.5px;width: 5%">'+(i+1)+'</td> '
				+' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].patientid+'</td> '
				+' <td style="height: 21.5px;width: 9%">'+r.lstBillReg[i].patientName+'</td> '
				+' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].billNo+'</td> '
				+' <td style="height: 21.5px;width: 5%">'+r.lstBillReg[i].recDate+'</td> '
				+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td> '				
				+' <td style="height: 21.5px;width: 7%">'+parseFloat(r.lstBillReg[i].discAmt).toFixed(2)+'</td> '	
				+' <td style="height: 21.5px;width: 9%">'+conGivenByName+'</td> '	
				+' <td style="height: 21.5px;width: 9%">'+conCategoryName+'</td> '
					
				+' <td style="height: 21.5px;width: 9%">'+r.lstBillReg[i].userName+'</td> '	
				+' <td style="height: 21.5px;width: 7%">'+r.lstBillReg[i].remark+'</td>	'
				
				+' <td style="height: 21.5px;width: 9%">'+r.lstBillReg[i].approveduserName+'</td> '	
				+' <td style="height: 21.5px;width: 7%">'+r.lstBillReg[i].approvedRemark+'</td>	'
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'				
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 9%"></th> '
			+' <th style="height: 21.5px;width: 5%"></th> '		
			+' <th style="height: 21.5px;width: 5%"></th> '
			+' <th style="height: 21.5px;width: 7%">'+parseFloat(totBillnew).toFixed(2)+'</th> '				
			+' <th style="height: 21.5px;width: 7%">'+parseFloat(totCon).toFixed(2)+'</th> '	
			+' <th style="height: 21.5px;width: 9%"></th> '	
			+' <th style="height: 21.5px;width: 9%"></th> '
			+' <th style="height: 21.5px;width: 7%"></th>	'	
			+' <th style="height: 21.5px;width: 9%"></th> '	
			+' <th style="height: 21.5px;width: 7%"></th>	'	
			+' <th style="height: 21.5px;width: 9%"></th> '	
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
		url 	: "ehat/finance/getBillEstimateReport",
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var groupId= parseInt($("#fetchGroup").val());
	
	if(groupId==null || groupId==undefined)
		{
			groupId=0;
		}
	
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
		url 	: "ehat/finance/getGroupwiseProfees",
		error 	: function() {
			//alert('Network Issue!!!');
			alert('PLEASE SELECT GROUP...!')
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
			var tdsAmt=r.lstGroupProfess[i].tds;
			var chAmt=r.lstGroupProfess[i].chAmt;
			//var tdsAmt=(Number(totAmt)*Number(tds))/100;
			//var chAmt=Number(totAmt)-Number(tdsAmt);
			
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
			+ ' <th style="height: 21.5px;width: 10%" >'+tdsAmt+'</th> '	
			+ ' <th style="height: 21.5px;width: 10%" >'+chAmt+'</th> '
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getPerformanceReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setPerformanceReport(r);
			var fromDate = ($("#fromDate").val()).split("/");
			var fDate =(fromDate[0] + "/" + fromDate[1] + "/" + fromDate[2]);
			var toDate = ($("#lastDate").val()).split("/");
			var tDate =(toDate[0] + "/" + toDate[1] + "/" + toDate[2]);
			$("#frDate").html(fDate);
			$("#tdDate").html(tDate);
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
				+' <td style="height: 21.5px;width: 4%">'+(i+1)+'</td>'
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillReg[i].patient_id+'</td> '
				+' <td style="height: 21.5px;width: 10%" >OPD</td> '
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillReg[i].regNo+'</td> '																																				
				+' <td style="height: 21.5px;width: 25%" >'+r.lstBillReg[i].patientName+'</td> '	
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].totAmt).toFixed(2)+'</td>	'
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].paidAmt).toFixed(2)+'</td>	'																	
				+' <td style="height: 21.5px;width: 10%" >'+parseFloat(r.lstBillReg[i].remainAmt).toFixed(2)+'</td> '																								
				+' </tr>';
			}else{
				
				temp=temp+ '<tr>'
				+' <td style="height: 21.5px;width: 4%">'+(i+1)+'</td>'
				+' <td style="height: 21.5px;width: 10%" >'+r.lstBillReg[i].patient_id+'</td> '
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
    var callF="ipdbill";
    var fromDate = $("#fromDate").val();
    var toDate = $("#lastDate").val();
    
    var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
    
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
        url     : "ehat/finance/getIpdBreakupReport",
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
        + '<th>Patient Name</th> '
        + '<th>UHID</th> '
        + '<th>Month</th> '
        + '<th>DOA</th> '
        + '<th>DOD</th> '
        + '<th>Type</th> '
        + '<th>IPD No</th> '
        + '<th>Payment Method</th> '
        + '<th>Billing Type</th> '
        + '<th>Consultant</th> '
        + '<th>Paid By Patient</th> '
        + '<th>Paid By Sponsor</th> '
        + '<th>Refund</th> '
        + '<th>Total Receive</th> '
        + '<th>Total Bill</th> '
        + '<th>Operation Name1</th> '
        + '<th>Operation Name2</th> '
        + '<th>Operation Name Other</th> ';
        for(var k=0;k < r.lstIpdBreakup[0].lstOtHeader.length;k++){
            var servName= r.lstIpdBreakup[0].lstOtHeader[k].serviceName;
            tempHead=tempHead + '<th>'+servName+'</th> '
            				  + '<th>'+servName+' Payout</th> ';
        }
        tempHead=tempHead + '<th>Secondary Cons 1</th> '
        + '<th>Secondary Cons 1 Share</th> '
        + '<th>Secondary Cons 2</th> '
        + '<th>Secondary Cons 2 Share</th> '
        + '<th>Secondary Cons 3</th> '
        + '<th>Secondary Cons 3 Share</th> '
        + '<th>Secondary Cons 4</th> '
        + '<th>Secondary Cons 4 Share</th> '
        + '<th>Secondary Cons 5</th> '    
        + '<th>Secondary Cons 5 Share</th> '
        
        + '<th>Secondary Cons Others</th> '    
        + '<th>Secondary Cons Others Share</th> '
        
        + '<th>Ref. By</th> ';          
        for(var k=0;k < r.lstIpdBreakup[0].lstServMaster.length;k++){
            var servName= r.lstIpdBreakup[0].lstServMaster[k].serviceName;
            tempHead=tempHead + '<th>'+servName+'</th> ';
        }
        tempHead=tempHead + '</tr>';
        for(var k=0;k < r.lstIpdBreakup.length;k++){
           /* var regNo = r.lstIpdBreakup[k].regNo;
            var patName =;
            var totBill = r.lstIpdBreakup[k].totBill;
            var company = r.lstIpdBreakup[k].company;
            finalTotBill = Number(finalTotBill) + Number(totBill);*/
        
        	var date2= new Date(r.lstIpdBreakup[k].dod).toLocaleDateString('en-GB');
        	var time2= new Date(r.lstIpdBreakup[k].dod).toLocaleTimeString('en-GB');
        	var date1= new Date(r.lstIpdBreakup[k].doa).toLocaleDateString('en-GB');
        	var time1= new Date(r.lstIpdBreakup[k].doa).toLocaleTimeString('en-GB');
        	var datetime = date1 + " " + time1;
        	var dod = date2 + " " + time2;
        	
            temp=temp+ '<tr> '
            + '<td>'+(k+1)+'</td> '           
            + '<td>'+r.lstIpdBreakup[k].patientName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].patId+'</td> '
            + '<td>'+r.lstIpdBreakup[k].month+'</td> '
            + '<td>'+datetime+'</td> '
            + '<td>'+dod+'</td> '
            + '<td>'+r.lstIpdBreakup[k].type+'</td> '
            + '<td>'+r.lstIpdBreakup[k].opdipdno+'</td> '
            + '<td>'+r.lstIpdBreakup[k].payMethod+'</td> '
            + '<td>'+r.lstIpdBreakup[k].billType+'</td> '
            + '<td>'+r.lstIpdBreakup[k].consultant+'</td> '
            + '<td>'+r.lstIpdBreakup[k].patientPaid+'</td> '
            + '<td>'+r.lstIpdBreakup[k].sposorPaid+'</td> '
            + '<td>'+r.lstIpdBreakup[k].refund+'</td> '
            + '<td>'+r.lstIpdBreakup[k].totReceive+'</td> '
            + '<td>'+r.lstIpdBreakup[k].totBill+'</td> ';
           // + '<td>'+r.lstIpdBreakup[k].otName+'</td> ';
            
            temp = temp + '<td>'+r.lstIpdBreakup[k].lstOtNames[0].serviceName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstOtNames[1].serviceName+'</td> '
           
            + '<td>'+r.lstIpdBreakup[k].othersOtName+'</td> ';
           
            for(var s=0;s < r.lstIpdBreakup[0].lstOtHeader.length;s++){
                var servName = r.lstIpdBreakup[k].lstOtDetails[s].serviceName;
                if(servName == null || servName == 'undefined' || servName == 'null' || servName == ''){
                	servName = '-';
                }
                var serviceCharges = r.lstIpdBreakup[k].lstOtDetails[s].serviceCharges;
                temp=temp + '<td>'+servName+'</td> '
                		  + '<td>'+serviceCharges+'</td> ';
            }
            temp = temp + '<td>'+r.lstIpdBreakup[k].lstDrRound[0].serviceName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[0].serviceCharges+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[1].serviceName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[1].serviceCharges+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[2].serviceName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[2].serviceCharges+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[3].serviceName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[3].serviceCharges+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[4].serviceName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].lstDrRound[4].serviceCharges+'</td> '
            
            + '<td>'+r.lstIpdBreakup[k].drRoundOthers+'</td> '
            + '<td>'+r.lstIpdBreakup[k].docRoundChargeOthers+'</td> '
            
            + '<td>'+r.lstIpdBreakup[k].refBy+'</td> ';               
           
            for(var s=0;s < r.lstIpdBreakup[k].lstServMaster.length;s++){
                var servAmt = r.lstIpdBreakup[k].lstServMaster[s].serviceCharges;
                temp = temp + '<td>'+parseFloat(servAmt).toFixed(2)+'</td> ';
                listService[s] = Number(listService[s]) + Number(servAmt);
            }
            temp=temp+ '</tr>';
        }
        /*tempFooter=tempFooter+ '<tr> '
        + '<th></th> '
        + '<th></th> '
        + '<th></th> '
        + '<th>Totals</th> '
        + '<th>'+parseFloat(finalTotBill).toFixed(2)+'</th> ';
        for(var k=0;k < r.lstIpdBreakup[0].lstServMaster.length;k++){
            tempFooter=tempFooter + '<th>'+parseFloat(listService[k]).toFixed(2)+'</th> ';
        }
        tempFooter=tempFooter + '</tr>';*/
        $("#servHead").html(tempHead);
        $("#container").html(temp);
       /* $("#servFooter").html(tempFooter);*/
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/fetchOpdDiagnoPatientsBillwise",
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
	var totDisc=0;totAmt=0,totPaid=0,totRem=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagno[i].billAmt);
			totPaid=Number(totPaid)+Number(r.lstOpdDiagno[i].paidAmt);
			totRem=Number(totRem)+Number(r.lstOpdDiagno[i].remainAmt);
			totDisc=Number(totDisc)+Number(r.lstOpdDiagno[i].discount);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');	
			var billTime=new Date(r.lstOpdDiagno[i].billDate).toLocaleTimeString('en-GB');	
			billDate = billDate + " " + billTime;
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
				+ ' <td style="height: 21.5px;width: 2%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].billId+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sourceName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].sourceGroup+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].serviceName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+treatDr+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].discount).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '	
																																
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 2%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 7%">Total</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totDisc).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totPaid).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%">'+parseFloat(totRem).toFixed(2)+'</th> '	
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getBillHistory",
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
				/*+' <td style="height: 21.5px;width: 10%;display:none;" >'+r.lstBillHistory[i].centerPatientId+'</td> '*/
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
		url 	: "ehat/finance/getAllTreatments",
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
		url 	: "ehat/finance/generateBillIdTreats",
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getGeneratedBillHistory",
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
				+' <td style="height: 21.5px;width: 10%;"display:none";" >'+r.lstBillHistory[i].patId+'</td> '
				//+' <td style="height: 21.5px;width: 10%" >'+r.lstBillHistory[i].centerPatientId+'</td> '
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
		url 	: "ehat/finance/getBuildTreatments",
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var sponsorId = $("#patTytpe").val();
	var deptId = $("#deptId").val();
	var serviceId = $("#serviceId").val();
	var subServiceId = $("#subServiceId").val();
	var unitId = $("#unitId").val();
	
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
	inputs.push("unitId=" + unitId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/fetchServiceWiseReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
		
			//alert(r.listBillDetails.length);
			var htmHead = "";
			var htmBody = "";
			htmHead = htmHead
			+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
			/*+ "</th><th class='col-md-1' style='display:none;'>Patient-Id"*/
			+ "</th><th  id='thCenterPatientId'>UHID"
			+ "</th><th>Opd / Ipd no"
			+ "</th><th >Patient Name"
			+ "</th><th >Service Name"
			+ "</th><th >Date"
			+ "</th><th >Sub-Service Name"
			+ "</th><th >Doctor Name"
			+ "</th><th >Rate"
			+ "</th><th >Quantity"
			+ "</th><th >Amount"
			+ "</th><th >Concession"
			+ "</th><th >Payable"
			+ "</th><th >Sponsor"
			+ "</th></tr>";
			
			if (r.listBillDetails.length == 0
					|| r.listBillDetails.length == null) {
				// no records.
				htmBody = htmBody
						+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
			} else {

				for ( var i = 0; i < r.listBillDetails.length; i++) {
					
					if(r.listBillDetails[i].serviceName=='Bed' && r.listBillDetails[i].subServiceName==null){
						r.listBillDetails[i].subServiceName = "Nursing Charges";
					}
					
					if(r.listBillDetails[i].subServiceName==null){
						r.listBillDetails[i].subServiceName = "-";
					}
					
					if(r.listBillDetails[i].doctorName==null){
						r.listBillDetails[i].doctorName = "-";
					}
					
					var serviceDate = new Date(r.listBillDetails[i].serviceDate).toLocaleDateString('en-GB');	
					
					htmBody = htmBody
							+ "<tr style='height:21px;'>"
							+ "<td >"
							+ (i + 1)
							+ "</td><td >"
							+ r.listBillDetails[i].patienttId
							+ "</td>"
							/*+"<td class='col-md-1' style='display:none;'>"
							+ r.listBillDetails[i].patienttId
							+ "</td>"*/
							+"<td >"
							+ r.listBillDetails[i].opdIpdNo
							+ "</td><td >"
							+ r.listBillDetails[i].patientName
							+ "</td><td >"
							+ r.listBillDetails[i].serviceName
							+ "</td><td >"
							+ serviceDate
							+ "</td><td >"
							+ r.listBillDetails[i].subServiceName
							+ "</td><td >"
							+ r.listBillDetails[i].doctorName
							+ "</td><td >"
							+ r.listBillDetails[i].rate.toFixed(2)
							+ "</td><td >"
							+ r.listBillDetails[i].quantity.toFixed(2)
							+ "</td><td >"
							+ r.listBillDetails[i].amount.toFixed(2)
							+ "</td><td >"
							+ r.listBillDetails[i].concession.toFixed(2)
							+ "</td><td >"
							+ (r.listBillDetails[i].amount - r.listBillDetails[i].concession).toFixed(2)
							+ "</td><td >"
							+ r.listBillDetails[i].sponsor
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
		url : "ehat/finance/fetchSubServices",
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var departmentId= parseInt($("#search_department").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("departmentId=" + departmentId);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getOpdDeletedServiceBills",
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
	var meeshaFlow = $("#meeshaFlow").val();
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totAmt=Number(totAmt)+Number(r.lstOpdDiagno[i].billAmt);
			totPrice=Number(totPrice)+Number(r.lstOpdDiagno[i].price);
			
			var deletedDateTime = "";
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');		
			var deletedDate=new Date(r.lstOpdDiagno[i].deletedDate).toLocaleDateString('en-GB');
			var deletedTime = new Date(r.lstOpdDiagno[i].deletedDate).toLocaleTimeString('en-GB');
			
			var department=r.lstOpdDiagno[i].departmentId;
			if(department==1)
				departmentName="OPD" ;
			else if(department==2)
				departmentName="IPD" ;
			else if(department==3)
				departmentName="Diagnostic" ;
			
			
			if(deletedDate != "01/01/1970"){
				deletedDateTime = deletedDate + " " + deletedTime;
			}else{
				deletedDateTime = "-";
			}
			
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
			
			if(meeshaFlow == "on"){
				 
				 Bill_ID=r.lstOpdDiagno[i].billId;
			}
			else{
				 	Bill_ID=r.lstOpdDiagno[i].billNo;
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 2%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+Bill_ID+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].serviceName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+treatDr+'</td> '						
				+ ' <td style="height: 21.5px;width: 3%">'+r.lstOpdDiagno[i].qty+'</td> '	
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].price).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 3%">'+parseFloat(r.lstOpdDiagno[i].amount).toFixed(2)+'</td> '		
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].sponsorName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+userName+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].deletedBy+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+deletedDateTime+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].remark+'</td> '	
				+ ' <td style="height: 21.5px;width: 6%">'+r.lstOpdDiagno[i].sourceName+'</td> '				
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].unitName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+departmentName+'</td> '

			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 2%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 3%"></th> '			
			+ ' <th style="height: 21.5px;width: 7%">Total</th> '
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%"></th> '	
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totPrice).toFixed(2)+'</th> '					
			+ ' <th style="height: 21.5px;width: 3%">'+parseFloat(totAmt).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '					
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 6%"></th> '
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var departmentID  =$("#departmentID").val();
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("deptId=" + departmentID);
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getOpdRefundReport",
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
			var billTime=new Date(r.lstOpdDiagno[i].billDate).toLocaleTimeString('en-GB');
			billDate = billDate +" "+billTime;
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+(i+1)+'</td>'
			    + ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].patientId+'</td> '
			    + ' <td style="height: 21.5px;width: 9%">'+r.lstOpdDiagno[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].billNo+'</td> '
				+ ' <td style="height: 21.5px;width: 8%">'+billDate+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].departmentName+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].againstId+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].billAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].paidAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].remainAmt).toFixed(2)+'</td> '				
				+ ' <td style="height: 21.5px;width: 8%">'+r.lstOpdDiagno[i].refGivenBy+'</td> '
				+ ' <td style="height: 21.5px;width: 8%">'+r.lstOpdDiagno[i].refRemark+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].refDr+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+r.lstOpdDiagno[i].user+'</td> '					
				+ ' <td style="height: 21.5px;width: 8%">'+r.lstOpdDiagno[i].unitName+'</td> '
			+' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 3%"></th> '
		    + ' <th style="height: 21.5px;width: 5%"></th> '
		    + ' <th style="height: 21.5px;width: 9%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 8%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '
			+ ' <th style="height: 21.5px;width: 7%">Total</th> '
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totRef).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totRemain).toFixed(2)+'</th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '					
			+ ' <th style="height: 21.5px;width: 7%"></th> '	
			+ ' <th style="height: 21.5px;width: 7%"></th> '					
			+ ' <th style="height: 21.5px;width: 8%"></th> '		
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
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getOpdDiscountReport",
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
	var totalAmt=0,totAmt=0,totPaid=0,totDisc=0,totRemain=0;
	if(r.lstOpdDiagno.length > 0){
		
		for(var i=0;i < r.lstOpdDiagno.length;i++){
				
			totalAmt = Number(totalAmt)+Number(r.lstOpdDiagno[i].totAmt);
			totDisc = Number(totDisc)+Number(r.lstOpdDiagno[i].discAmt);
			totPaid = Number(totPaid)+Number(r.lstOpdDiagno[i].paidAmt);
			totRemain = Number(totRemain)+Number(r.lstOpdDiagno[i].remainAmt);
			
			var billDate=new Date(r.lstOpdDiagno[i].billDate).toLocaleDateString('en-GB');	
			var billTime=new Date(r.lstOpdDiagno[i].billDate).toLocaleTimeString('en-GB');	
			
			billDate = billDate + " " + billTime;
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 3%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 12%">'+r.lstOpdDiagno[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagno[i].rec_id+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+billDate+'</td> '	
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].totAmt).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 6%">'+parseFloat(r.lstOpdDiagno[i].discAmt).toFixed(2)+'</td> '
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
			+ ' <th style="height: 21.5px;width: 3%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 12%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%">Total</th> '			
			+ ' <th style="height: 21.5px;width: 6%">'+parseFloat(totalAmt).toFixed(2)+'</th> '
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
* @date		: 15-May-2019
* @codeFor	: Get Daily Collection Report
 ************/
function getDailyCollectionReport(callF){
	
	$("#opdDiv").hide();
	$("#ipdDiv").hide();
	$("#diagDiv").hide();
	
	var a=$('#byName').val();
	var userId = 0;
	if(a==""||a==null||a==undefined){
		 userId = 0;
	}else{
		 userId = parseInt($("#userId").val());
	}
//	var  fromDate = ($("#fromDate").val()).split("/");
	//var fDate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  
	//var toDate = ($("#lastDate").val()).split("/");
  //  var tDate =(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	//var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var deptId = parseInt($("#deptId").val());	
	var payModeId = parseInt($("#payModeId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("deptId=" + deptId);	
	inputs.push("payModeId=" + payModeId);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getDailyCollectionReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {				
			if(deptId == 0){
				
				$("#opdDiv").show();
				$("#ipdDiv").show();
				$("#diagDiv").show();
				
				setOpdReceiptRefundReport(r);
			//	setIpdReceiptRefundReport(r);
				setDiagReceiptRefundReport(r);
			}else if(deptId == 1){
				
				$("#opdDiv").show();				
				setOpdReceiptRefundReport(r);
			}else if(deptId == 2){
				
				$("#ipdDiv").show();
				setIpdReceiptRefundReport(r);
			}else if(deptId == 3){
				
				$("#diagDiv").show();
				setDiagReceiptRefundReport(r);
			}								
		}
	});
}

//For Opd
function setOpdReceiptRefundReport(r){
	
	var risingFlow=$("#risingFlow").val();
	var temp="";
	var totAmt=0,totRecAmt=0;
	if(r.lstOpdReceipt.length > 0){
		
		for(var i=0;i < r.lstOpdReceipt.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstOpdReceipt[i].recAmt);
			
			var recDate=new Date(r.lstOpdReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstOpdReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 40px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdReceipt[i].patientId+'</td> '	
				//+ ' <td style="height: 21.5px;width: 10px" >'+r.lstOpdReceipt[i].centerPatientId+'</td> '	

				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdReceipt[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstOpdReceipt[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstOpdReceipt[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstOpdReceipt[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstOpdReceipt[i].docName+'</td> '		
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstOpdReceipt[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstOpdReceipt[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstOpdReceipt[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstOpdReceipt[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Opd Collection</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '			
			+' </tr>';	
		}
	}
	totRecAmt = totAmt;
	$("#opdCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmt=0;;
	if(r.lstOpdRefund.length > 0){
		
		for(var i=0;i < r.lstOpdRefund.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstOpdRefund[i].recAmt);
			
			var recDate=new Date(r.lstOpdRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstOpdRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 20px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdRefund[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstOpdRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstOpdRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstOpdRefund[i].patientName+'</td> '		
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstOpdRefund[i].docName+'</td> '
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstOpdRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstOpdRefund[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstOpdRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstOpdRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Opd Refund</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';		
		}
	}
	totRefAmt = totAmt;
	$("#opdRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmt).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmt).toFixed(2));
	var totCash = Number(totRecAmt) - Number(totRefAmt);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

// For Ipd
function setIpdReceiptRefundReport(r){
	
	var risingFlow=$("#risingFlow").val();
	var temp="";
	var totAmt=0,totRecAmt=0;
	if(r.lstIpdReceipt.length > 0){
		
		for(var i=0;i < r.lstIpdReceipt.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstIpdReceipt[i].recAmt);
			
			var recDate=new Date(r.lstIpdReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstIpdReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 40px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdReceipt[i].patientId+'</td> '	
				//+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdReceipt[i].centerPatientId+'</td> '	

				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdReceipt[i].invoiceCount+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstIpdReceipt[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstIpdReceipt[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdReceipt[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdReceipt[i].docName+'</td> '
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstIpdReceipt[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstIpdReceipt[i].recAmt).toFixed(2)+'</td> '	
				//+ ' <td style="height: 21.5px;width: 65px" >'+r.lstIpdReceipt[i].totalBill+'</td> '
				+ ' <td>'+parseFloat(r.lstIpdReceipt[i].totalBill).toFixed(2)+'</td> '
				+ ' <td>'+parseFloat(r.lstIpdReceipt[i].totalRemain).toFixed(2)+'</td> '
				//+ ' <td style="height: 21.5px;width: 65px" >'+r.lstIpdReceipt[i].totalRemain+'</td> '	
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstIpdReceipt[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstIpdReceipt[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Ipd Collection</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';		
		}
	}
	totRecAmt = totAmt;
	$("#ipdCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmt=0;
	if(r.lstIpdRefund.length > 0){
		
		for(var i=0;i < r.lstIpdRefund.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstIpdRefund[i].recAmt);
			
			var recDate=new Date(r.lstIpdRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstIpdRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 40px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdRefund[i].invoiceCount+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstIpdRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstIpdRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdRefund[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdRefund[i].docName+'</td> '
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstIpdRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstIpdRefund[i].recAmt).toFixed(2)+'</td> '
				+ ' <td>'+parseFloat(r.lstIpdReceipt[i].totalBill).toFixed(2)+'</td> '
				+ ' <td>'+parseFloat(r.lstIpdReceipt[i].totalRemain).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstIpdRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstIpdRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Ipd Refund</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';
		}
	}
	totRefAmt = totAmt;
	$("#ipdRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmt).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmt).toFixed(2));
	var totCash = Number(totRecAmt) - Number(totRefAmt);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

//For Diagnosis
function setDiagReceiptRefundReport(r){
	
	var risingFlow=$("#risingFlow").val();
	var temp="";
	var totAmt=0,totRecAmt=0;
	if(r.lstDiagReceipt.length > 0){
		
		for(var i=0;i < r.lstDiagReceipt.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstDiagReceipt[i].recAmt);
			
			var recDate=new Date(r.lstDiagReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstDiagReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 40px" >'+(i+1)+'</td> '
				//+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].centerPatientId+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].invoiceCount+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstDiagReceipt[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstDiagReceipt[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagReceipt[i].patientName+'</td> '						
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstDiagReceipt[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagReceipt[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagReceipt[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagReceipt[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Diagnosis Collection</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';	
		}
	}
	totRecAmt = totAmt;
	$("#diagCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmt=0;;
	if(r.lstDiagRefund.length > 0){
		
		for(var i=0;i < r.lstDiagRefund.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstDiagRefund[i].recAmt);
			
			var recDate=new Date(r.lstDiagRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstDiagRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 40px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].invoiceCount+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstDiagRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstDiagRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagRefund[i].patientName+'</td> '						
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstDiagRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagRefund[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Diagnosis Refund</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';
		}
	}
	totRefAmt = totAmt;
	$("#diagRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmt).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmt).toFixed(2));
	var totCash = Number(totRecAmt) - Number(totRefAmt);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

function exportToExcel(){
	
	var deptId = parseInt($("#deptId").val());
	
	var divName = "";
	if(deptId == 0){
		
		divName = "tblDailyCashReport";
	}else if(deptId == 1){
		
		divName = "opdDiv";														
	}else if(deptId == 2){
		
		divName = "ipdDiv";	
	}else if(deptId == 3){
		
		divName = "diagDiv";	
	}
	
        //$("[id$=getExcelReportBtn]").click(function(e) {
		$(document).on('click','#getExcelReportBtn',function(e) {
                                                            var result = 'data:application/vnd.ms-excel,' + encodeURIComponent($('div[id$='+divName+']').html());
                                                            var link = document.createElement("a");
                                                            document.body.appendChild(link);
                                                            link.download = "Daily Collection Report.xls"; 
                                                            link.href = result;
                                                            link.click();
                                                            link.None();
                                                            e.None();
                                                        });   
//e.None();
//});
}
/************
* @author	: Vinod Udawant
* @date		: 15-May-2019
* @codeFor	: Get Daily Collection Report
 ************/
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

function setDynamicDatabase(){
	
	var centerId = $("#centerId").val();
	
	var inputs = [];
	inputs.push('action=demo');	
	inputs.push('centerId=' + centerId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DynamicDbServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			
			alert("Database changed succesfully...");
		}
	});
}
/************
* @author   : Vinod Udawant
* @date     : 26-June-2018
* @codeFor  : Fetch Ipd OT
*************/
function getOTReport(){
    
	var callF="operation";
    var fromDate = $("#fromDate").val();
    var toDate = $("#lastDate").val();
    var userId = parseInt($("#userId").val());
    var unitId = parseInt($("#unitId").val());
    
    var searchBy = $("#searchType").val();
    var opId = $("#operationName").val();
    var opCat = $("#opgrade").val();
    var opSpecility = $("#doctorSpeciality").val();
	var doctId=$("#doc_surgeon_name").val();	
	var anesthetistId=$("#doc_anesthetist_name").val();
		
	var theaterId = $("#otTypes").val();
    
    if(opId == null || opId == 'undefined' || opId == 'null' || opId == ''){
    	
    	opId = 0;
    }
    
    if(opCat == null || opCat == 'undefined' || opCat == 'null' || opCat == ''){
    	
    	opCat = 0;
    }

	if(opSpecility == null || opSpecility == 'undefined' || opSpecility == 'null' || opSpecility == ''){
		
		opSpecility = 0;
	}
	
	 if(anesthetistId == null || anesthetistId == 'undefined' || anesthetistId == 'null' || anesthetistId == ''){
    	
    	anesthetistId = 0;
    }
    
    var inputs = [];
    inputs.push("unitId=" + unitId);
    inputs.push("userId=" + userId);
    inputs.push("callFrom=" + callF);
    inputs.push("fromDate=" + fromDate);
    inputs.push("toDate=" + toDate);
    inputs.push("opId=" + opId);
    inputs.push("opCat=" + opCat);
    inputs.push("opSpecility=" + opSpecility);
	if(doctId==null){
		doctId=0;
	}
   if(theaterId==null){
		theaterId=0;
	}
	inputs.push("theaterId=" + theaterId);
	inputs.push("doctorId=" + doctId);
    inputs.push("searchBy=" + searchBy);
    inputs.push("anesthetistId=" + anesthetistId); 
    var str = inputs.join('&');
    jQuery.ajax({
        async   : false,
        type    : "POST",
        data    : str + "&reqType=AJAX",
        url     : "ehat/finance/getOTReport",
        error   : function() {
            alert('Network Issue!!!');
        },
        success : function(r) {   
        	//setOTReport(r);
             setOTReportR(r);  // change and added by Rohini on 10-12-2022
        }
    });
}

/************
* @author   : Vinod Udawant
* @date     : 26-June-2018
* @codeFor  : Fetch Ipd OT
*************/
function setOTReport(r){
    var temp="";
    var tempHead="";
   
    if(r.lstIpdBreakup.length > 0){
       
        tempHead=tempHead+ '<tr> '
        + '<th>Sr No</th> '
        + '<th>UHID</th> '
        + '<th>Patient Name</th> '
        + '<th>Month</th> '
        + '<th>Date</th> '       
        + '<th>Type</th> '
        + '<th>Payment Method</th> '
        + '<th>Billing Type</th> '   
        + '<th>Consultant</th> '   
        + '<th>Total Bill</th> '
        + '<th>Operation Name</th> ';
        for(var k=0;k < r.lstIpdBreakup[0].lstOtHeader.length;k++){
            var servName= r.lstIpdBreakup[0].lstOtHeader[k].serviceName;
            tempHead=tempHead + '<th>'+servName+'</th> '
            				  + '<th>'+servName+' Payout</th> ';
        }
       
        tempHead=tempHead + '</tr>';
        for(var k=0;k < r.lstIpdBreakup.length;k++){
           
        	var datetime= new Date(r.lstIpdBreakup[k].doa).toLocaleDateString('en-GB');
        	
            temp=temp+ '<tr> '
            + '<td>'+(k+1)+'</td> '
            + '<td>'+r.lstIpdBreakup[k].patId+'</td> '
            + '<td>'+r.lstIpdBreakup[k].patientName+'</td> '
            + '<td>'+r.lstIpdBreakup[k].month+'</td> '
            + '<td>'+datetime+'</td> '
            + '<td>'+r.lstIpdBreakup[k].type+'</td> '
            + '<td>'+r.lstIpdBreakup[k].payMethod+'</td> '
            + '<td>'+r.lstIpdBreakup[k].billType+'</td> '  
            + '<td>'+r.lstIpdBreakup[k].consultant+'</td> '  
            + '<td>'+r.lstIpdBreakup[k].totBill+'</td> '
            + '<td>'+r.lstIpdBreakup[k].otName+'</td> ';
            for(var s=0;s < r.lstIpdBreakup[0].lstOtHeader.length;s++){
                var servName = r.lstIpdBreakup[k].lstOtDetails[s].serviceName;
                if(servName == null || servName == 'undefined' || servName == 'null' || servName == ''){
                	
                	servName = 0;
                }
                var serviceCharges = r.lstIpdBreakup[k].lstOtDetails[s].serviceCharges;
                temp=temp + '<td>'+servName+'</td> '
                		  + '<td>'+serviceCharges+'</td> ';
            }            
            temp=temp+ '</tr>';
        }             
    }
    $("#servHead").html(tempHead);
    $("#container").html(temp); 
}

function fetchprocedureCatsedradmin(){

	jQuery.ajax({
		async : false,
		type : "GET",	
		url : "ehat/ot/fetchprocedureCatsedrv",
		timeout : 1000 * 60 * 5,
		cache : false,		
		success : function(r) {
			ajaxResponse = r;		    	 
			$("#opgrade").setTemplate(docfetchprocedureCatsedrvadmin);
		    $("#opgrade").processTemplate(ajaxResponse);  
		    $("#opgrade").select2();			
		}
	});
}

var docfetchprocedureCatsedrvadmin = "<option value='0'>----- Select Category -----</option>{#foreach $T.listProcedureCat as dl}	<option value='{$T.dl.pr_id}'>{$T.dl.pr_name}</option>{#/for}";

var doctorSpecilizationTemp = "<option value='0'>----- Select Speciality -----</option>{#foreach $T.lstSpecialization as spl}<option value='{$T.spl.idhospital_Specialization}'>{$T.spl.specialization_name}</option>{#/for}";

function displaySeach(){
	
	var searchId = $("#searchType").val();
	
	if(searchId == 1){
		
		$("#selOpName").show();
		$("#selOpCat").hide();
		$("#selOpSpec").hide();
		$("#surgeonwise").hide();
		$("#ot_wise").hide();
		$("#anesthetistwise").hide();
		
	}else if(searchId == 2){
		
		$("#selOpName").hide();
		$("#selOpCat").show();
		$("#selOpSpec").hide();
		$("#surgeonwise").hide();
		$("#ot_wise").hide();
		$("#anesthetistwise").hide();
		
	}else if(searchId == 3){
		
		$("#selOpName").hide();
		$("#selOpCat").hide();
		$("#selOpSpec").show();
		$("#ot_wise").hide();
		$("#surgeonwise").hide();
		$("#anesthetistwise").hide();
		
	}
	else if(searchId == 4 || searchId == 6){  
		$("#selOpName").hide();
		$("#selOpCat").hide();
		$("#selOpSpec").hide();
		getDoctorList();
		$("#surgeonwise").show();
		$("#ot_wise").hide();
		$("#anesthetistwise").hide();
		
	}
	else if(searchId == 5){   
		$("#selOpName").hide();
		$("#selOpCat").hide();
		$("#selOpSpec").hide();
		$("#surgeonwise").hide();
		$("#ot_wise").hide();
		getAnesthetistList();
		$("#anesthetistwise").show();
		
	}
	
	else if(searchId == 7){
		$("#selOpName").hide();
		$("#selOpCat").hide();
		$("#selOpSpec").hide();
		getOtType();
		$("#ot_wise").show();
		$("#surgeonwise").hide();
		$("#anesthetistwise").hide();
	}
	
	else{
		
		$("#selOpName").hide();
		$("#selOpCat").hide();
		$("#selOpSpec").hide();
		$("#ot_wise").hide();
		$("#surgeonwise").hide();
		$("#anesthetistwise").hide();
	}
}


/*Name:Abhishek Kumbhar Date:10/07/2019
Code: For Daily Collection Report in Pdf*/

function exportToPdf()
{
	
	var a=$('#byName').val();
	var CAdvanceFlow=$('#CAdvanceFlow').val();	
	var userId = 0;
	if(a==""||a==null||a==undefined){
		 userId = 0;
	}else{
		 userId = parseInt($("#userId").val());
	}
	var fromDate = ($("#fromDate").val()).split("/");
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
	var lastDate = ($("#lastDate").val()).split("/");
	var tdate =(lastDate[2] + "-" + lastDate[1] + "-" + lastDate[0]);
	var fromTime = $("#fromTime").val();
	var toTime = $("#lastTime").val();
	
	if(fromTime=="")
	{
	fromTime= "00:00:00";
	}
	if(toTime=="")
	{
	toTime= "23:59:00";
	}
	
	fdate=fdate+" "+fromTime;
	tdate=tdate+" "+toTime;
	
	var unitId ;
	unitId = parseInt($("#unitId").val());
	var deptId = parseInt($("#deptId").val());	
	var payModeId = parseInt($("#payModeId").val());	
	
	
	
	unitId = parseInt($("#unitId").val());
	if(CAdvanceFlow =="off"){
		setTimeout(function() {
			/*window.open(("DailyCollectionPdf.jsp?"+"&userId="+userId+"&unitId="+unitId+"&fromDate="+fdate+"&lastDate="+tdate+"&deptId="+deptId+"&payModeId="+payModeId));
		}, 300);	*/
			window.open(("DailyCollectionReportPdfNew.jsp?"+"&userId="+userId+"&unitId="+unitId+"&fromDate="+fdate+"&lastDate="+tdate+"&deptId="+deptId+"&payModeId="+payModeId));
			}, 300);	
	}
	else{
		setTimeout(function() {
			window.open(("DailyCollectionReportCAdvancePdfNew.jsp?"+"&userId="+userId+"&unitId="+unitId+"&fromDate="+fdate+"&lastDate="+tdate+"&deptId="+deptId+"&payModeId="+payModeId));
			}, 300);	
	}
	
}

function setFilterType(){
	
	var filterType = $("#filterBy").val();
	
	if(filterType == 1){
		
		$("#divSpeciality").show();
		$("#divConsult").hide();
		$("#divreasonOfVisit").hide();
		$("#iConsSpec").select2();
	}else if(filterType == 2){
		
		$("#divSpeciality").hide();
		$("#divConsult").show();
		$("#divreasonOfVisit").hide();
		$("#iConsDoc").select2();
	}else if(filterType == 3){
		
		$("#divSpeciality").hide();
		$("#divConsult").hide();
		$("#divreasonOfVisit").show();
		$("#reasonofvisit").select2();
	}
}


function setAddReasonOfVisitreg() {
	var inputs = [];
	inputs.push('action=fetchReasonOfVisitDetails');	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;			
			pobj1 = eval('(' + ajaxResponse + ')');
			var html="<option value='0'>---Select reason of visit---</option>";			
			for(var i=0; i< pobj1.ReasonOfVisitDetails.length ;i++){
			html= html +"<option value="+pobj1.ReasonOfVisitDetails[i].ReasonOfVisit+">"+pobj1.ReasonOfVisitDetails[i].ReasonOfVisit+"</option>";
		}
			$("#reasonofvisit").html(html);
		}
	});
}


/*---------------------------------------------------------------*/

/*function getOpdDiagnoRecData(callFrom){
	
	var callF=callFrom;
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());	
	var payMode = parseInt($("#payMode").val());	
		
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
		url 	: "ehat/finance/opdReceiptReport",
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
*/
/*function setOpdDiagnoRecData(r){
	//alert(JSON.stringify(r.listOpdReceiptReportDto));
	var temp="";
	var totAmt=0;
	if(r.listOpdReceiptReportDto.length > 0){
		alert(JSON.stringify(r.listOpdReceiptReportDto));
		for(var i=0;i < r.listOpdReceiptReportDto.length;i++){
				
			totAmt=Number(totAmt)+Number(r.listOpdReceiptReportDto[i].recAmt);
			
			var billDate=new Date(r.listOpdReceiptReportDto[i].billDate).toLocaleDateString('en-GB');	
			var billTime=new Date(r.listOpdReceiptReportDto[i].billDate).toLocaleTimeString('en-GB');
			billDate = billDate +" "+billTime;
			
			var refDr=r.listOpdReceiptReportDto[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			var treatDr=r.listOpdReceiptReportDto[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			
			var userName=r.listOpdReceiptReportDto[i].user;
			if(userName==null){
				userName="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 5%">'+r.listOpdReceiptReportDto[i].rec_id+'</td> '
				+ ' <td style="height: 21.5px;width: 7%">'+billDate+'</td> '																	
				+ ' <td style="height: 21.5px;width: 17%">'+r.listOpdReceiptReportDto[i].patient_name+'</td> '																			
				+ ' <td style="height: 21.5px;width: 7%">'+parseFloat(r.listOpdReceiptReportDto[i].rec_amount).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.listOpdReceiptReportDto[i].pay_mode+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.listOpdReceiptReportDto[i].card_number+'</td> '	
				+ ' <td style="height: 21.5px;width: 5%">'+r.lstOpdDiagnoRec[i].expiry+'</td> '
				+ ' <td style="height: 21.5px;width: 12%">'+r.listOpdReceiptReportDto[i].bank_name+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.listOpdReceiptReportDto[i].bill_id+'</td> '	
				+ ' <td style="height: 21.5px;width: 8%">'+billDate+'</td> '		
				+ ' <td style="height: 21.5px;width: 8%">'+r.listOpdReceiptReportDto[i].source+'</td> ' 	
				+ ' <td style="height: 21.5px;width: 10%">'+userName+'</td> ' 
				+ ' <td style="height: 21.5px;width: 10%">'+r.listOpdReceiptReportDto[i].unit_name+'</td> ' 
			+ ' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '																	
			+ ' <th style="height: 21.5px;width: 17%"></th> '																			
			+ ' <th style="height: 21.5px;width: 7%">'+parseFloat(totAmt).toFixed(2)+'</th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '
			+ ' <th style="height: 21.5px;width: 12%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
			+ ' <th style="height: 21.5px;width: 10%"></th> '	
		+' </tr>';		
	}
	$("#container").html(temp);		
}*/


/************
* @author	: Dayanand khandekar
* @date		: 15-2-2023
* @codeFor	: Get Daily Collection Report For Meesha
 ************/
function getDailyCollectionReportForMeesha(callF){
	
	$("#opdDiv").hide();
	$("#ipdDiv").hide();
	$("#diagDiv").hide();
	
	var a=$('#byName').val();
	var userId = 0;
	if(a==""||a==null||a==undefined){
		 userId = 0;
	}else{
		 userId = parseInt($("#userId").val());
	}
	
	var fromDate = ($("#fromDate").val()).split("/");
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  //added by sandip
	var toDate = ($("#lastDate").val()).split("/");
	var tdate =(toDate[2] + "-" + toDate[1] + "-" + toDate[0]);
	var fromTime = $("#fromTime").val();
	var toTime = $("#lastTime").val();
	
	if(fromTime=="")
	{
	fromTime= "00:00:00";
	}
	if(toTime=="")
	{
	toTime= "23:59:00";
	}
	fdate=fdate+" "+fromTime;
	tdate=tdate+" "+toTime;
	
	//var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val()); 
	var deptId = parseInt($("#deptId").val());	
	var payModeId = parseInt($("#payModeId").val());	
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fdate);	
	inputs.push("toDate=" + tdate);
	inputs.push("deptId=" + deptId);	
	inputs.push("payModeId=" + payModeId);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getDailyCollectionReportForMeesha",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {				
			if(deptId == 0){
				
				$("#opdDiv").show();
				$("#ipdDiv").show();
				$("#diagDiv").show();
				
				setOpdReceiptRefundReportMeesha(r);
				setIpdReceiptRefundReport(r);
			//	setDiagReceiptRefundReport(r);
				setDiagReceiptRefundReportForMeesha(r);
			}else if(deptId == 1){
				
				$("#opdDiv").show();				
				setOpdReceiptRefundReportMeesha(r);
			}else if(deptId == 2){
				
				$("#ipdDiv").show();
				setIpdReceiptRefundReport(r);
			}else if(deptId == 3){
				
				$("#diagDiv").show();
				setDiagReceiptRefundReportForMeesha(r);
			}								
		}
	});
}


//For Opd
function setOpdReceiptRefundReportMeesha(r){
	
	var risingFlow=$("#risingFlow").val();
	var temp="";
	var totAmt=0,totRecAmt=0;
	if(r.lstOpdReceipt.length > 0){
		
		for(var i=0;i < r.lstOpdReceipt.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstOpdReceipt[i].recAmt);
			
			var recDate=new Date(r.lstOpdReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstOpdReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			temp=temp+ '<tr>'
				+ ' <td>'+(i+1)+'</td> '
				//+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdReceipt[i].patientId+'</td> '	
				+ ' <td >'+r.lstOpdReceipt[i].centerPatientId+'</td> '	

				+ ' <td>'+r.lstOpdReceipt[i].invoiceCount+'</td> '	
				+ ' <td >'+r.lstOpdReceipt[i].opdipdno+'</td> '
				+ ' <td>'+r.lstOpdReceipt[i].recNo+'</td> '													
				+ ' <td>'+r.lstOpdReceipt[i].patientName+'</td> '
				+ ' <td>'+r.lstOpdReceipt[i].docName+'</td> '
				+ ' <td>'+recDate+'</th> '												
				+ ' <td>'+r.lstOpdReceipt[i].payMode+'</td> '					
				+ ' <td>'+parseFloat(r.lstOpdReceipt[i].recAmt).toFixed(2)+'</td> '
				+ ' <td>'+parseFloat(r.lstOpdReceipt[i].totalBill).toFixed(2)+'</td> '	
				+ ' <td>'+parseFloat(r.lstOpdReceipt[i].totalRemain).toFixed(2)+'</td> '	
				+ ' <td >'+r.lstOpdReceipt[i].user+'</td> '		
				+ ' <td >'+r.lstOpdReceipt[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td >Opd Collection</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th></th> '
				+ ' <th></th> '	
				+ ' <th></th> '		
				+ ' <th ></th> '			
				+ ' <th ></th> '			
				+ ' <th></th> '						
				+ ' <th></th> '												
				+ ' <th>Total</th> '					
				+ ' <th >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th></th> '		
				+ ' <th ></th> '			
			+' </tr>';	
		}
		
		// set paymode details
		for(var i=0;i < r.lstOpdtotalAmt.length;i++){
			temp=temp+ '<tr>'
			+ ' <th></th> '
			+ ' <th></th> '	
			+ ' <th></th> '		
			+ ' <th ></th> '			
			+ ' <th ></th> '			
			+ ' <th></th> '						
			+ ' <th></th> '												
			+ ' <th>Total  '+r.lstOpdtotalAmt[i].payMode+' </th> '					
			+ ' <th >'+parseFloat(r.lstOpdtotalAmt[i].totalAmount).toFixed(2)+'</th> '												
			+ ' <th></th> '		
			+ ' <th ></th> '			
		+' </tr>';	
		
		}
		
		
	}
	totRecAmt = totAmt;
	$("#opdCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmt=0;;
	if(r.lstOpdRefund.length > 0){
		
		for(var i=0;i < r.lstOpdRefund.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstOpdRefund[i].recAmt);
			
			var recDate=new Date(r.lstOpdRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstOpdRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			temp=temp+ '<tr>'
				+ ' <td  >'+(i+1)+'</td> '
				+ ' <td  >'+r.lstOpdRefund[i].patientId+'</td> '	
				+ ' <td >'+r.lstOpdRefund[i].invoiceCount+'</td> '	
				+ ' <td  >'+r.lstOpdRefund[i].opdipdno+'</td> '
				+ ' <td  >'+r.lstOpdRefund[i].recNo+'</td> '													
				+ ' <td >'+r.lstOpdRefund[i].patientName+'</td> '
				+ ' <td >'+r.lstOpdRefund[i].docName+'</td> '
				+ ' <td  >'+recDate+'</th> '												
				+ ' <td  >'+r.lstOpdRefund[i].payMode+'</td> '					
				+ ' <td  >'+parseFloat(r.lstOpdRefund[i].recAmt).toFixed(2)+'</td> '	
				+ ' <td  >'+parseFloat(r.lstOpdRefund[i].totalBill).toFixed(2)+'</td> '	
				+ ' <td  >'+parseFloat(r.lstOpdRefund[i].totalRemain).toFixed(2)+'</td> '
				+ ' <td  >'+r.lstOpdRefund[i].user+'</td> '		
				+ ' <td  >'+r.lstOpdRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td >Opd Refund</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';		
		}
		
		// set paymode details
		for(var i=0;i < r.lstOpdtotalRefundAmt.length;i++){
			temp=temp+ '<tr>'
			+ ' <th></th> '
			+ ' <th></th> '	
			+ ' <th></th> '		
			+ ' <th ></th> '			
			+ ' <th ></th> '			
			+ ' <th></th> '						
			+ ' <th></th> '												
			+ ' <th>Total  '+r.lstOpdtotalRefundAmt[i].payMode+' </th> '					
			+ ' <th >'+parseFloat(r.lstOpdtotalRefundAmt[i].totalAmount).toFixed(2)+'</th> '												
			+ ' <th></th> '		
			+ ' <th ></th> '			
		+' </tr>';	
		
		}
		
	}
	totRefAmt = totAmt;
	$("#opdRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmt).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmt).toFixed(2));
	var totCash = Number(totRecAmt) - Number(totRefAmt);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

function setDiagReceiptRefundReportForMeesha(r){

	
	var risingFlow=$("#risingFlow").val();
	var temp="";
	var totAmt=0,totRecAmt=0;
	
	if(r.lstDiagReceipt.length > 0){
		
		for(var i=0;i < r.lstDiagReceipt.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstDiagReceipt[i].recAmt);
			
			var recDate=new Date(r.lstDiagReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstDiagReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			temp=temp+ '<tr>'
				+ ' <td >'+(i+1)+'</td> '
				//+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].patientId+'</td> '
				+ ' <td  >'+r.lstDiagReceipt[i].centerPatientId+'</td> '
				+ ' <td  >'+r.lstDiagReceipt[i].invoiceCount+'</td> '	
				+ ' <td >'+r.lstDiagReceipt[i].opdipdno+'</td> '
				+ ' <td >'+r.lstDiagReceipt[i].recNo+'</td> '													
				+ ' <td>'+r.lstDiagReceipt[i].patientName+'</td> '
				+ ' <td>'+r.lstDiagReceipt[i].docName+'</td> '
				+ ' <td >'+recDate+'</th> '												
				+ ' <td  >'+r.lstDiagReceipt[i].payMode+'</td> '					
				+ ' <td >'+parseFloat(r.lstDiagReceipt[i].recAmt).toFixed(2)+'</td> '
				+ ' <td>'+parseFloat(r.lstDiagReceipt[i].totalBill).toFixed(2)+'</td> '	
				+ ' <td >'+parseFloat(r.lstDiagReceipt[i].totalRemain).toFixed(2)+'</td> '
				+ ' <td >'+r.lstDiagReceipt[i].user+'</td> '		
				+ ' <td >'+r.lstDiagReceipt[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td >Diagnosis Collection</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th  ></th> '
				+ ' <th ></th> '	
				+ ' <th ></th> '		
				+ ' <th ></th> '			
				+ ' <th  ></th> '			
				+ ' <th ></th> '						
				+ ' <th ></th> '												
				+ ' <th  >Total</th> '					
				+ ' <th >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th ></th> '		
				+ ' <th ></th> '		
			+' </tr>';	
		}
		
		// set paymode details
		for(var i=0;i < r.lstDiagnototalAmt.length;i++){
			temp=temp+ '<tr>'
			+ ' <th></th> '
			+ ' <th></th> '	
			+ ' <th></th> '		
			+ ' <th ></th> '			
			+ ' <th ></th> '			
			+ ' <th></th> '						
			+ ' <th></th> '												
			+ ' <th>Total  '+r.lstDiagnototalAmt[i].payMode+' </th> '					
			+ ' <th >'+parseFloat(r.lstDiagnototalAmt[i].totalAmount).toFixed(2)+'</th> '												
			+ ' <th></th> '		
			+ ' <th ></th> '			
		+' </tr>';	
		
		}
	}
	totRecAmt = totAmt;
	$("#diagCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmt=0;;
	if(r.lstDiagRefund.length > 0){
		
		for(var i=0;i < r.lstDiagRefund.length;i++){
				
			totAmt = Number(totAmt)+Number(r.lstDiagRefund[i].recAmt);
			
			var recDate=new Date(r.lstDiagRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstDiagRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 40px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].invoiceCount+'</td> '	
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstDiagRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 50px" >'+r.lstDiagRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagRefund[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagRefund[i].docName+'</td> '
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 65px" >'+r.lstDiagRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagRefund[i].recAmt).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagRefund[i].totalBill).toFixed(2)+'</td> '
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagRefund[i].totalRemain).toFixed(2)+'</td> '	
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Diagnosis Refund</td> ';
				}
			+' </tr>';		
		}
		
		if(risingFlow == "off"){
			
			temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 40px" ></th> '
				+ ' <th style="height: 21.5px;width: 45px" ></th> '	
				+ ' <th style="height: 21.5px;width: 45px" ></th> '		
				+ ' <th style="height: 21.5px;width: 90px" ></th> '			
				+ ' <th style="height: 21.5px;width: 50px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 65px" >Total</th> '					
				+ ' <th style="height: 21.5px;width: 65px" >'+parseFloat(totAmt).toFixed(2)+'</th> '												
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
				+ ' <th style="height: 21.5px;width: 100px" ></th> '		
			+' </tr>';
		}
		
		// set paymode details
		for(var i=0;i < r.lstDiagnototalRefundAmt.length;i++){
			temp=temp+ '<tr>'
			+ ' <th></th> '
			+ ' <th></th> '	
			+ ' <th></th> '		
			+ ' <th ></th> '			
			+ ' <th ></th> '			
			+ ' <th></th> '						
			+ ' <th></th> '												
			+ ' <th>Total  '+r.lstDiagnototalRefundAmt[i].payMode+' </th> '					
			+ ' <th >'+parseFloat(r.lstDiagnototalRefundAmt[i].totalAmount).toFixed(2)+'</th> '												
			+ ' <th></th> '		
			+ ' <th ></th> '			
		+' </tr>';	
		
		}
		
	}
	totRefAmt = totAmt;
	$("#diagRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmt).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmt).toFixed(2));
	var totCash = Number(totRecAmt) - Number(totRefAmt);
	$("#totCash").val(parseFloat(totCash).toFixed(2));

	
}


/************
* @author	: Sandip Shinde
* @date		: 21-Apr-2023
* @codeFor	: Fetch Opd Appointment Scheduler Report
*************/
function getOpdAppScheReport(){
	
	//var callF=callFrom;
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var AppType = $("#AppType").val();	
		
	var inputs = [];	
	//inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
	inputs.push("AppType=" + AppType);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/fetchOpdAppSchePatient",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
				
				setOpdAppPatientData(r);
		}
	});
}

function setOpdAppPatientData(r){
	
	var temp="";
	var totAmt=0;
	if(r.length > 0){
		
		for(var i=0;i < r.length;i++){
			
			var patientName = r[i].title+' ' + r[i].patientName +' ' +  r[i].lastName ;
			var recDate=new Date(r[i].apptDate).toLocaleDateString('en-GB');
			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 2%">'+(i+1)+'</td>'
				+ ' <td style="height: 21.5px;width: 4%">'+r[i].patientId+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+recDate+'</td> '
				+ ' <td style="height: 21.5px;width: 8%">'+r[i].apptTimeFrom+'</td> '																			
				+ ' <td style="height: 21.5px;width: 8%">'+r[i].apptTimeTo+'</td> '																			
				+ ' <td style="height: 21.5px;width: 8%">'+r[i].apptTypeId+'</td> '																			
				+ ' <td style="height: 21.5px;width: 9%">'+r[i].docname+'</td> '																			
				+ ' <td style="height: 21.5px;width: 7%">'+r[i].regType+'</td> '
				+ ' <td style="height: 21.5px;width: 8%">'+r[i].mobNo+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r[i].status+'</td> '
				
			+ ' </tr>';													
		}
		
		temp=temp+ '<tr>'
			+ ' <th style="height: 21.5px;width: 2%"></th> '
			+ ' <th style="height: 21.5px;width: 4%"></th> '
			+ ' <th style="height: 21.5px;width: 10%"></th> '
			+ ' <th style="height: 21.5px;width: 5%"></th> '																	
			+ ' <th style="height: 21.5px;width: 8%"></th> '
			+ ' <th style="height: 21.5px;width: 8%"></th> '
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 9%"></th> '
			+ ' <th style="height: 21.5px;width: 7%"></th> '		
			+ ' <th style="height: 21.5px;width: 8%"></th> '	
			+ ' <th style="height: 21.5px;width: 5%"></th> '
		+' </tr>';		
	}
	$("#container").html(temp);		
}


/************
* @author	: Sandip Shinde
* @date		: 17-March-2023
* @codeFor	: IPD Refund Report
 ************/
function getIpdRefundDetails(){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId1").val());
	var unitId = parseInt($("#unitId").val());	
	
	var inputs = [];	

	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("unitId=" + unitId);
	inputs.push("userId=" + userId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getIpdRefundReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setIpdRefundDetailsTemp(r);										
		}
	});
}

/************
* @author	: Sandip Shinde
* @date		: 17-March-2023
* @codeFor	: IPD Refund Report
 ************/
function setIpdRefundDetailsTemp(r){
	
	var temp="";	
	var totcash=0;
	var totcard=0;
	var totcheque=0;
	var totcommonAdvc=0;
	var tottotal=0;
	var TotalBillAmt=0;
	
	for(var i=0;i<r.length;i++){
		
		var patName=r[i].patient_name;
		var patientId=r[i].patient_id;
		var DOA=new Date(r[i].created_date_time).toLocaleDateString('en-GB');
		var cash=r[i].total_amt;
		var card=r[i].total_paid;
		var cheque=r[i].total_remain;
		var commonAdvc=r[i].totalDisc;
		//var total=Number(cash)+Number(card)+Number(cheque)+Number(commonAdvc);
		var total =r[i].actual_amt;
		var TotalBillAmt= Number(TotalBillAmt) +Number(total);
		var tottotal= Number(tottotal)+Number(r[i].total_paid);
		
		
		temp=temp+"<tr>" +'<td style="height: 21.5px;width: 4%">'+(i+1)+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+patientId+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+patName+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+DOA+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+r[i].bill_refund_id+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+r[i].bill_id+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+r[i].receipt_of+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+r[i].pay_name+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+r[i].total_paid+'</td>'
				+	'<td style="height: 21.5px;width: 4%">'+r[i].ref_remark+'</td>' 
				//+	'<td style="height: 21.5px;width: 4%">'+parseFloat(total).toFixed(2)+"</td>"
				+	'<td style="height: 21.5px;width: 4%">'+r[i].actual_amt+"</td>"
				+	"</tr>";
		
	}
	
	
	temp=temp+ '<tr>'
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	+ ' <th style="height: 21.5px;width: 4%">Total</th> '
	+ ' <th style="height: 21.5px;width: 4%">'+parseFloat(tottotal).toFixed(2)+'</th> '
	+ ' <th style="height: 21.5px;width: 4%"></th> '
	//+ ' <th style="height: 21.5px;width: 4%">'+parseFloat(TotalBillAmt).toFixed(2)+'</th> '
	+ ' <th style="height: 21.5px;width: 4%">'+parseFloat(TotalBillAmt).toFixed(2)+'</th> '
	
	$("#ipdRefList").html(temp);
	
}

/************
* @author	: Sandip Shinde
* @date		: 016-March-2023
* @codeFor	: Fetch Ipd Receipts data
*************/
function getIpdRecData(callFrom){
	
	var callF=callFrom;
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId1").val());	
	var unitId = parseInt($("#unitId").val());	
	var payMode = parseInt($("#payMode").val());	
		
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
		url 	: "ehat/finance/fetchIpdRec",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
				setIpdDeletedRecData(r);
		}
	});
}

/************
* @author	: Sandip Shinde
* @date		: 016-March-2023
* @codeFor	: set Ipd Receipts data
*************/
function setIpdDeletedRecData(r){
		
	var temp="";
	var totAmt=0;
	var index = 1;
	var dName;

		for(var i=0;i < r.lstIpdRec.length;i++){
			
			 var departmentname = r.lstIpdRec[i].department_id;
		     if (departmentname == 1) {
				dName = 'OPD';
			}
			 if (departmentname == 2) {
				 dName = 'IPD';
			}
			 if (departmentname == 3) {
				 dName = 'Diagonstics';
			}
			
			totAmt=Number(totAmt)+Number(r.lstIpdRec[i].recAmt);
			
			var billDate=new Date(r.lstIpdRec[i].billDate).toLocaleDateString('en-GB');				
			var deletedDate="-";
			var deletedTime="-";
				
			if(r.lstIpdRec[i].deletedDate != null){
				
				deletedDate = new Date(r.lstIpdRec[i].deletedDate).toLocaleDateString('en-GB');
				deletedTime = new Date(r.lstIpdRec[i].deletedDate).toLocaleTimeString('en-GB');
			}	
			
			deletedDate = deletedDate + " " + deletedTime;
			
			var refDr=r.lstIpdRec[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			var treatDr=r.lstIpdRec[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			
			var userName=r.lstIpdRec[i].user;
			if(userName==null){
				userName="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+index+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].patient_id+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].recNo+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+billDate+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].patientName+'</div></td> '																			
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+parseFloat(r.lstIpdRec[i].recAmt).toFixed(2)+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].payMode+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].cardChqNo+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].bank+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].billId+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+billDate+'</div></td> '		
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].source+'</div></td> ' 
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+userName+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+deletedDate+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].deletedBy+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.lstIpdRec[i].unitName+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+dName+'</div></td> ' 
			+ ' </tr>';	
			index++;
		}
		
		temp=temp+ '<tr>'
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '																	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
        	+ ' <th><div class="col-md-12 col-xs-12 col-sm-12">'+parseFloat(totAmt).toFixed(2)+'</div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
		+' </tr>';		
	
	$("#containerIpd").html(temp);		
}


/************
* @author	: Sandip Shinde
* @date		: 01-Aug-2023
* @codeFor	: daily collection report
*************/
function getRepTime(id) {
	
	$("#"+id).datetimepicker({
		datepicker:false,
		  format:'H:i:00',
		  //step : 1
	});
}


/************
* @author	: Sandip Shinde
* @date		: 0-Aug-2023
* @codeFor	: Discharge Death report
*************/
function searchDischargeDeathPatientList(){
	
	var inputs = [];
	var hospitalName=$("#hospitalName").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var txtType=$("#dischargeType").val();
	
	if ((fromDate == "" && toDate == "") || (toDate == "" ) || (fromDate == "")) {
		alert("Please select both date for search");
		return false;
	}
	
	if(txtType=='0'){
		alert("Please select Type");
		return false;
	}
		
	inputs.push('type='+ txtType);
	inputs.push('fromdate=' + fromDate);
	inputs.push('todate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/finance/searchDischargeDeathPatientList",
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent="";
			if (r.dischargeList.length>0) {
				for (var i = 0; i < r.dischargeList.length; i++) {
					
					var date= new Date(r.dischargeList[i].dischargeDate).toLocaleDateString('en-GB');
					var Time=new Date(r.dischargeList[i].dischargeTime).toLocaleTimeString('en-GB');
					
					var createddate= new Date(r.dischargeList[i].admissionDate).toLocaleDateString('en-GB');
					var createdTime=new Date(r.dischargeList[i].admissionDate).toLocaleTimeString('en-GB');
					
					divContent = divContent + '<tr>'
							+ "<td  class='col-md-1 center'>" + (i + 1)+ "</td>";
					divContent = divContent
							+ "<td  class='col-md-1 center'>"+ r.dischargeList[i].uhId + "</td>";
					divContent = divContent
							+ "<td class='col-md-2 center'>"+ r.dischargeList[i].patientName + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.dischargeList[i].age +"</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.dischargeList[i].gender +"</td>";
					divContent = divContent
							+ "<td class='col-md-2 center'>"+ r.dischargeList[i].address + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+  r.dischargeList[i].phone + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ hospitalName + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ createddate + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'> "+createdTime + "</td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ date +" </td>";
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.dischargeList[i].dischargeTime + "</td>";
					/*divContent = divContent
							+ "<td class='col-md-1 center'>"+  r.dischargeList[i].consDoctor+ "</td>";*/
					divContent = divContent
							+ "<td class='col-md-1 center'>"+ r.dischargeList[i].dischargeType + "</td>";
					
					+ "</tr>";
				}
			} else {
				divContent = divContent
						+ "<tr style='color:red; font-size:15px;'><td class='center' colspan='12'>Record Not Found...!!!</td></tr>";
			}

			$('#dischargeDeathTableBody').html(divContent);

		}
	});

	
}

var operationNameTemp = "<option value='0'>-SELECT-</option>{#foreach $T.ol as ol}<option value='{$T.ol.oi}' >{$T.ol.on}</option>{#/for}";

function getOperationName() {
	
	/*if (rowcount == undefined) {
		var opType = $("#selOTtype").val();
		var department = $("#department").val();
	} else {
		var opType = $("#selOTtype" + rowcount).val();
		var department = $("#department" + rowcount).val();
	}*/
	var opType = $("#selOTtype").val();
	if (opType == "Select") {
		alert("Please Select Operation Type");
		$("#department").val(0);
		return false;
	}
	var inputs = [];
	inputs.push('opType=' + encodeURIComponent(opType));
	inputs.push('department=' + 2);
	inputs.push('action=fetchOperationName');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/otdata/fetchOperationName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			// alert(ajaxResponse);
			objc = eval( ajaxResponse );
			$("#selOTName").setTemplate(operationNameTemp);
			$("#selOTName").processTemplate(objc);
			/*if (rowcount == undefined) {
				$("#selOTName").setTemplate(operationNameTemp);
				$("#selOTName").processTemplate(objc);
			} else {
				$("#selOTName" + rowcount).setTemplate(operationNameTemp);
				$("#selOTName" + rowcount).processTemplate(objc);
				$("#selOTName" + rowcount).val(oid);
			}*/

		}
	});

}

function fetchGroupMasterListforReport(callFrom){

	var letter="";
	if(callFrom == "search"){
	 letter= $("#byName3").val();
	}else{
		$("#byName3").val("");
	}	


		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"callFrom" : callFrom,
				"letter" : letter
			},
			url : "ehat/profees/fetchGroupMasterList",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				//alert(r.listGroupMaster.length);
				var list = "<option>--Select--</option>";
				for ( var i = 0; i < r.listGroupMaster.length; i++) {
					
					list = list + '<option value="' + (r.listGroupMaster[i].groupMasterId)
					+ '">' + (r.listGroupMaster[i].groupName) + '</option>';
				}
				$("#fetchGroup").html(list);
				$("#fetchGroup").select2();
			}
		});
	}
/************
* @author	: Annapurna Jamnor
* @date		: 23-Nov-2023
* @codeFor	: Get Daily Collection ReportNew
 ************/
function getDailyCollectionReportNew(callF){
	
	$("#opdDiv").hide();
	$("#ipdDiv").hide();
	$("#diagDiv").hide();
	$("#commonAdvDiv").hide();
	
	var a=$('#byName').val();
	var userId = 0;
	if(a==""||a==null||a==undefined){
		 userId = 0;
	}else{
		 userId = parseInt($("#userId").val());
	}
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	var fromTime = $("#fromTime").val();
	var toTime = $("#lastTime").val();
	
	 var fromDate1 =fromDate;
      var fromDate2=toDate
  
	const myarray =fromDate1.split("/");
	var date=myarray[2]+"-"+myarray[1]+"-"+myarray[0];
	fromDate = date;
	
	
	
	const myarray1 =fromDate2.split("/");
	var date2=myarray1[2]+"-"+myarray1[1]+"-"+myarray1[0];
	toDate = date2;
	
	
	if(toTime==""){
		toTime='23:59:59'
	}
	if(fromTime==""){
		fromTime='00:00:00'
	}

	fromDate=fromDate+" "+fromTime;
	toDate=toDate+" "+toTime;
	
	//var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var deptId = parseInt($("#deptId").val());	
	var payModeId = parseInt($("#payModeId").val());
	
	var inputs = [];	
	inputs.push("unitId=" + unitId);
	inputs.push("deptId=" + deptId);
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("deptId=" + deptId);	
	inputs.push("payModeId=" + payModeId);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getDailyCollectionReportNew",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
				
			if(r.lstOpdReceipt == null && r.lstIpdReceipt == null && r.lstDiagReceipt == null
					&& r.lstDiagRefund == null && r.lstIpdRefund == null && r.lstOpdRefund == null){
			if(r.lstOpdReceipt.length == 0 && r.lstIpdReceipt.length == 0 && r.lstDiagReceipt.length == 0
				&& r.lstDiagRefund.length == 0 && r.lstIpdRefund.length == 0
				&& r.lstOpdRefund.length == 0
				&& r.lstCommonAdvReceipt.length == 0 &&  r.lstCommonAdvRefund.length  == 0 && hospName =='namco'  ){
					alert("Report Not found.");
			} else if(r.lstOpdReceipt.length == 0 && r.lstIpdReceipt.length == 0 && r.lstDiagReceipt.length == 0
						&& r.lstDiagRefund.length == 0 && r.lstIpdRefund.length == 0
						&& r.lstOpdRefund.length == 0 && hospName !='namco')
					{
					alert("Report Not found.");
					}
			}

				
			if(deptId == 0){
			var hospName = $("#hospName").val();	
				$("#opdDiv").show();
				$("#ipdDiv").show();
				$("#diagDiv").show();									
				setOpdReceiptRefundReportNew(r);
				setIpdReceiptRefundReportNew(r);
				setDiagReceiptRefundReportNew(r);
				setTotalCountReceiptRefund(r);
				
			}else if(deptId == 1){
				
				$("#ipdDiv").hide();
				$("#diagDiv").hide();	
				$("#opdDiv").show();				
				setOpdReceiptRefundReportNew(r);
				setTotalCountReceiptRefund(r);
			}else if(deptId == 2){

				$("#opdDiv").hide();
				$("#diagDiv").hide();	
				$("#ipdDiv").show();
				setIpdReceiptRefundReportNew(r);
				setTotalCountReceiptRefund(r);
			}else if(deptId == 3){

				$("#opdDiv").hide();
				$("#ipdDiv").hide();	
				$("#diagDiv").show();
				setDiagReceiptRefundReportNew(r);
				setTotalCountReceiptRefund(r);
			}
				
		}
	});
}
function setOpdReceiptRefundReportNew(r){
	
	var risingFlow=$("#risingFlow").val();
	var hospName = $("#hospName").val();
	var CAdvanceFlow = $("#CAdvanceFlow").val();
	var temp="";
	var totAmt=0,totRecAmtOpd=0;
	var totalCashAmtOpd=0,totalCardAmtOpd=0,totalNetBankAmtOpd=0,totalGoPayAmtOpd=0;totalPhonePayAmtOpd=0,totalPayTMAmtOpd=0,totalChequeAmtOpd=0,totalCAdvanceOpd=0,totalRTGSAmtOpd=0;
	if(r.lstOpdReceipt.length > 0){
		
		for(var i=0;i < r.lstOpdReceipt.length;i++){
			
			if(CAdvanceFlow =="on"){		
				if(r.lstOpdReceipt[i].payMode!='CAdvance'){			
			   totAmt = Number(totAmt)+Number(r.lstOpdReceipt[i].recAmt);
             }
			}else{
				totAmt = Number(totAmt)+Number(r.lstOpdReceipt[i].recAmt);
			}
			
			var recDate=new Date(r.lstOpdReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstOpdReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;
			if(r.lstOpdReceipt[i].payMode.trim()=="Cash"){
				totalCashAmtOpd=Number(totalCashAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}else if(r.lstOpdReceipt[i].payMode.trim()=="Card"){
				totalCardAmtOpd=Number(totalCardAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}else if(r.lstOpdReceipt[i].payMode.trim()=="UPI"){
				totalNetBankAmtOpd=Number(totalNetBankAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}	else if(r.lstOpdReceipt[i].payMode.trim()=="GPay"){
				totalGoPayAmtOpd=Number(totalGoPayAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
	 		}
			else if(r.lstOpdReceipt[i].payMode.trim()=="Paytm"){
				totalPayTMAmtOpd=Number(totalPayTMAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}else if(r.lstOpdReceipt[i].payMode.trim()=="Phone Pay"){
				totalPhonePayAmtOpd=Number(totalPhonePayAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}else if(r.lstOpdReceipt[i].payMode.trim()=="CAdvance"){
				totalCAdvanceOpd=Number(totalCAdvanceOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}else if(r.lstOpdReceipt[i].payMode.trim()=="RTGS/NEFT"){
				totalRTGSAmtOpd=Number(totalRTGSAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}else if(r.lstOpdReceipt[i].payMode=="Cheque"){
				totalChequeAmtOpd=Number(totalChequeAmtOpd)+Number(r.lstOpdReceipt[i].recAmt);
			}			
			temp=temp+ '<tr>'		
			+ ' <td style="height: 21.5px;width: 30px" >'+(i+1)+'</td> '
			+ ' <td style="height: 21.5px;width: 35px" >'+r.lstOpdReceipt[i].patientId+'</td> '	
			+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdReceipt[i].billId+'</td> '	
			+ ' <td style="height: 21.5px;width: 80px" >'+r.lstOpdReceipt[i].opdipdno+'</td> '
			+ ' <td style="height: 21.5px;width: 40px" >'+r.lstOpdReceipt[i].recNo+'</td> '													
			+ ' <td style="height: 21.5px;" >'+r.lstOpdReceipt[i].patientName+'</td> '	
            + ' <td style="height: 21.5px;" >'+r.lstOpdReceipt[i].docName+'</td> '						
			+ ' <td style="height: 21.5px;">'+recDate+'</th> '												
			+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdReceipt[i].payMode+'</td> '					
			+ ' <td style="height: 21.5px;" >'+parseFloat(r.lstOpdReceipt[i].recAmt).toFixed(2)+'</td> '												
			+ ' <td style="height: 21.5px;" >'+r.lstOpdReceipt[i].user+'</td> '		
			+ ' <td style="height: 21.5px;width: 90px" >'+r.lstOpdReceipt[i].remark+'</td> ';
			
			
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;" >Opd Collection</td> ';
				}
			+' </tr>';		
		}
				  
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" " ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total Cheque</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalChequeAmtOpd).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total Card</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalCardAmtOpd).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total UPI</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalNetBankAmtOpd).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total Cash</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalCashAmtOpd).toFixed(2)+'</th> '			
	+' </tr>';
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total PayTM</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPayTMAmtOpd).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total GooglePay</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalGoPayAmtOpd).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total PhonePay</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPhonePayAmtOpd).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total RTGS</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalRTGSAmtOpd).toFixed(2)+'</th> '			
	+' </tr>';
		
		temp=temp+ '<tr>'

		temp=temp
		+ ' <th style="height: 21.5px;width: 30px" " ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total CAdvance</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalCAdvanceOpd).toFixed(2)+'</th> '
	temp=temp
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 90px" ></th> '												
		+ ' <th style="height: 21.5px;width: 45px" ></th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totAmt).toFixed(2)+'</th> '		
	+' </tr>';	
	}
	totRecAmtOpd = totAmt;
	sessionStorage.setItem("totRecAmtOpd", totRecAmtOpd);

	sessionStorage.setItem("totalCashAmtOpd", totalCashAmtOpd);
	sessionStorage.setItem("totalCardAmtOpd", totalCardAmtOpd);
	sessionStorage.setItem("totalNetBankAmtOpd", totalNetBankAmtOpd);
	sessionStorage.setItem("totalGoPayAmtOpd", totalGoPayAmtOpd);
	sessionStorage.setItem("totalPhonePayAmtOpd", totalPhonePayAmtOpd);
	sessionStorage.setItem("totalPayTMAmtOpd", totalPayTMAmtOpd);
	sessionStorage.setItem("totalChequeAmtOpd", totalChequeAmtOpd);
	sessionStorage.setItem("totalCAdvanceOpd", totalCAdvanceOpd);
	sessionStorage.setItem("totalRTGSAmtOpd", totalRTGSAmtOpd);
	
	$("#opdCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmtOpd=0;
	var totalCashAmtOpdRef=0,totalCardAmtOpdRef=0,totalNetBankAmtOpdRef=0,totalGoPayAmtOpdRef=0;totalPhonePayAmtOpdRef=0,totalPayTMAmtOpdRef=0,totalChequeAmtOpdRef=0,totalCAdvanceOpdRef=0,totalRTGSAmtOpdRef=0;
	if(r.lstOpdRefund.length > 0){
		
		for(var i=0;i < r.lstOpdRefund.length;i++){
			if(CAdvanceFlow =="on"){		
				if(r.lstOpdRefund[i].payMode!='CAdvance'){			
			   totAmt = Number(totAmt)+Number(r.lstOpdRefund[i].recAmt);
             }
			}else{
				totAmt = Number(totAmt)+Number(r.lstOpdRefund[i].recAmt); 
			}								
			var recDate=new Date(r.lstOpdRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstOpdRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			
			
			if(r.lstOpdRefund[i].payMode.trim()=="Cash"){
				totalCashAmtOpdRef=Number(totalCashAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="Card"){
				totalCardAmtOpdRef=Number(totalCardAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="UPI"){
				
				totalNetBankAmtOpdRef=Number(totalNetBankAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="GPay"){
				totalGoPayAmtOpdRef=Number(totalGoPayAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="Paytm"){
				totalPayTMAmtOpdRef=Number(totalPayTMAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="Phone Pay"){
				totalPhonePayAmtOpdRef=Number(totalPhonePayAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="CAdvance"){
				totalCAdvanceOpdRef=Number(totalCAdvanceOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="RTGS/NEFT"){
				totalRTGSAmtOpdRef=Number(totalRTGSAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}else if(r.lstOpdRefund[i].payMode.trim()=="Cheque"){
				totalChequeAmtOpdRef=Number(totalChequeAmtOpdRef)+Number(r.lstOpdRefund[i].recAmt);
			}

			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 30px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 35px" >'+r.lstOpdRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdRefund[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 80px" >'+r.lstOpdRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstOpdRefund[i].patientName+'</td> '	
                + ' <td style="height: 21.5px;width: 150px" >'+r.lstOpdRefund[i].docName+'</td> '						
				+ ' <td style="height: 21.5px;width: 80px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstOpdRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstOpdRefund[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstOpdRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstOpdRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Opd Refund</td> ';
				}
			+' </tr>';		
		}
				
				temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 30px" " ></th> '
				+ ' <th style="height: 21.5px;width: 35px" >Total Cheque</th> '
				+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalChequeAmtOpdRef).toFixed(2)+'</th> '	
				+ ' <th style="height: 21.5px;width: 80px" ></th> '		
				+ ' <th style="height: 21.5px;width: 45px" >Total Card</th> '			
				+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalCardAmtOpdRef).toFixed(2)+'</th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 80px" >Total UPI</th> '												
				+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalNetBankAmtOpdRef).toFixed(2)+'</th> '					
				+ ' <th style="height: 21.5px;width: 65px" ></th> '												
				+ ' <th style="height: 21.5px;width: 100px" >Total Cash</th> '		
				+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalCashAmtOpdRef).toFixed(2)+'</th> '			
			+' </tr>';
				
				temp=temp+ '<tr>'
				+ ' <th style="height: 21.5px;width: 30px" ></th> '
				+ ' <th style="height: 21.5px;width: 35px" >Total PayTM</th> '
				+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPayTMAmtOpdRef).toFixed(2)+'</th> '	
				+ ' <th style="height: 21.5px;width: 80px" ></th> '		
				+ ' <th style="height: 21.5px;width: 45px" >Total GooglePay</th> '			
				+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalGoPayAmtOpdRef).toFixed(2)+'</th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 80px" >Total PhonePay</th> '												
				+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPhonePayAmtOpdRef).toFixed(2)+'</th> '					
				+ ' <th style="height: 21.5px;width: 65px" ></th> '												
				+ ' <th style="height: 21.5px;width: 100px" >Total RTGS</th> '		
				+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalRTGSAmtOpdRef).toFixed(2)+'</th> '			
			+' </tr>';
				
				temp=temp+ '<tr>'

				temp=temp
				+ ' <th style="height: 21.5px;width: 30px" " ></th> '
				+ ' <th style="height: 21.5px;width: 35px" >Total CAdvance</th> '
				+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalCAdvanceOpdRef).toFixed(2)+'</th> '
			temp=temp
				+ ' <th style="height: 21.5px;width: 80px" ></th> '		
				+ ' <th style="height: 21.5px;width: 45px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '			
				+ ' <th style="height: 21.5px;width: 150px" ></th> '						
				+ ' <th style="height: 21.5px;width: 90px" ></th> '												
				+ ' <th style="height: 21.5px;width: 45px" ></th> '					
				+ ' <th style="height: 21.5px;width: 65px" ></th> '												
				+ ' <th style="height: 21.5px;width: 100px" >Total</th> '		
				+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totAmt).toFixed(2)+'</th> '		
			+' </tr>';

	}
	
	totRefAmtOpd = totAmt;
	sessionStorage.setItem("totRefAmtOpd", totRefAmtOpd);

	sessionStorage.setItem("totalCashAmtOpdRef", totalCashAmtOpdRef);
	sessionStorage.setItem("totalCardAmtOpdRef", totalCardAmtOpdRef);
	sessionStorage.setItem("totalNetBankAmtOpdRef", totalNetBankAmtOpdRef);
	sessionStorage.setItem("totalGoPayAmtOpdRef", totalGoPayAmtOpdRef);
	sessionStorage.setItem("totalPhonePayAmtOpdRef", totalPhonePayAmtOpdRef);
	sessionStorage.setItem("totalPayTMAmtOpdRef", totalPayTMAmtOpdRef);
	sessionStorage.setItem("totalChequeAmtOpdRef", totalChequeAmtOpdRef);
	sessionStorage.setItem("totalCAdvanceOpdRef", totalCAdvanceOpdRef);
	sessionStorage.setItem("totalRTGSAmtOpdRef", totalRTGSAmtOpdRef);
  	
	$("#opdRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmtOpd).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmtOpd).toFixed(2));
	var totCash = Number(totRecAmtOpd) - Number(totRefAmtOpd);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

// For Ipd
function setIpdReceiptRefundReportNew(r){
	
	var risingFlow=$("#risingFlow").val();
	var hospName = $("#hospName").val();
	var CAdvanceFlow = $("#CAdvanceFlow").val();
	
	var temp="";
	var totAmt=0,totRecAmtIpd=0;
	var totalCashAmtIpd=0,totalCardAmtIpd=0,totalNetBankAmtIpd=0,totalGoPayAmtIpd=0;totalPhonePayAmtIpd=0,totalPayTMAmtIpd=0,totalCAdvanceIpd=0,totalChequeAmtIpd=0,totalRTGSAmtIpd=0;
	if(r.lstIpdReceipt.length > 0){
		
		for(var i=0;i < r.lstIpdReceipt.length;i++){
				
			    if(CAdvanceFlow =="on"){	
					if(r.lstIpdReceipt[i].payMode!='CAdvance'){			
						   totAmt = Number(totAmt)+Number(r.lstIpdReceipt[i].recAmt);
					}
				}else{
					totAmt = Number(totAmt)+Number(r.lstIpdReceipt[i].recAmt);
				}
			
			var recDate=new Date(r.lstIpdReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstIpdReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			if(r.lstIpdReceipt[i].payMode.trim()=="Cash"){
				totalCashAmtIpd=Number(totalCashAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="Card"){
				totalCardAmtIpd=Number(totalCardAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="UPI"){
				totalNetBankAmtIpd=Number(totalNetBankAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="GPay"){
				totalGoPayAmtIpd=Number(totalGoPayAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="Paytm"){
				totalPayTMAmtIpd=Number(totalPayTMAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="Phone Pay"){
				totalPhonePayAmtIpd=Number(totalPhonePayAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="CAdvance"){
				totalCAdvanceIpd=Number(totalCAdvanceIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="RTGS/NEFT"){
				totalRTGSAmtIpd=Number(totalRTGSAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}else if(r.lstIpdReceipt[i].payMode.trim()=="Cheque"){
				totalChequeAmtIpd=Number(totalChequeAmtIpd)+Number(r.lstIpdReceipt[i].recAmt);
			}

			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 30px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 35px" >'+r.lstIpdReceipt[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdReceipt[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 80px" >'+r.lstIpdReceipt[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdReceipt[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdReceipt[i].patientName+'</td> '										
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdReceipt[i].docName+'</td> '
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdReceipt[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstIpdReceipt[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstIpdReceipt[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstIpdReceipt[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Ipd Collection</td> ';
				}
			+' </tr>';		
		}
			
					temp=temp+ '<tr>'
					+ ' <th style="height: 21.5px;width: 30px" ></th> '
					+ ' <th style="height: 21.5px;width: 35px" >Total Cheque</th> '
					+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalChequeAmtIpd).toFixed(2)+'</th> '	
					+ ' <th style="height: 21.5px;width: 80px" ></th> '		
					+ ' <th style="height: 21.5px;width: 45px" >Total Card</th> '			
					+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalCardAmtIpd).toFixed(2)+'</th> '			
					+ ' <th style="height: 21.5px;width: 150px" ></th> '						
					+ ' <th style="height: 21.5px;width: 80px" >Total UPI</th> '												
					+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalNetBankAmtIpd).toFixed(2)+'</th> '					
					+ ' <th style="height: 21.5px;width: 65px" ></th> '												
					+ ' <th style="height: 21.5px;width: 100px" >Total Cash</th> '		
					+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalCashAmtIpd).toFixed(2)+'</th> '					
				+' </tr>';
					
					temp=temp+ '<tr>'
					+ ' <th style="height: 21.5px;width: 30px" ></th> '
					+ ' <th style="height: 21.5px;width: 35px" >Total PayTM</th> '
					+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPayTMAmtIpd).toFixed(2)+'</th> '	
					+ ' <th style="height: 21.5px;width: 80px" ></th> '		
					+ ' <th style="height: 21.5px;width: 45px" >Total GooglePay</th> '			
					+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalGoPayAmtIpd).toFixed(2)+'</th> '			
					+ ' <th style="height: 21.5px;width: 150px" ></th> '						
					+ ' <th style="height: 21.5px;width: 80px" >Total PhonePay</th> '												
					+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPhonePayAmtIpd).toFixed(2)+'</th> '					
					+ ' <th style="height: 21.5px;width: 65px" ></th> '												
					+ ' <th style="height: 21.5px;width: 100px" >Total RTGS</th> '		
					+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalRTGSAmtIpd).toFixed(2)+'</th> '				
				+' </tr>';
					
					temp=temp+ '<tr>'

					temp=temp
					+ ' <th style="height: 21.5px;width: 30px" ></th> '
					+ ' <th style="height: 21.5px;width: 35px" >Total CAdvance</th> '
					+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalCAdvanceIpd).toFixed(2)+'</th> '	
					temp=temp
					+ ' <th style="height: 21.5px;width: 80px" ></th> '		
					+ ' <th style="height: 21.5px;width: 45px" ></th> '			
					+ ' <th style="height: 21.5px;width: 150px" ></th> '			
					+ ' <th style="height: 21.5px;width: 150px" ></th> '						
					+ ' <th style="height: 21.5px;width: 90px" ></th> '					
					+ ' <th style="height: 21.5px;width: 45px" ></th> '
					+ ' <th style="height: 21.5px;width: 65px" ></th> '
					+ ' <th style="height: 21.5px;width: 100px" >Total</th> '		
					+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totAmt).toFixed(2)+'</th> '		
				+' </tr>';

	}
	totRecAmtIpd = totAmt;
	sessionStorage.setItem("totRecAmtIpd", totRecAmtIpd);

	sessionStorage.setItem("totalCashAmtIpd", totalCashAmtIpd);
	sessionStorage.setItem("totalCardAmtIpd", totalCardAmtIpd);
	sessionStorage.setItem("totalNetBankAmtIpd", totalNetBankAmtIpd);
	sessionStorage.setItem("totalGoPayAmtIpd", totalGoPayAmtIpd);
	sessionStorage.setItem("totalPhonePayAmtIpd", totalPhonePayAmtIpd);
	sessionStorage.setItem("totalPayTMAmtIpd", totalPayTMAmtIpd);
	sessionStorage.setItem("totalChequeAmtIpd", totalChequeAmtIpd);
	sessionStorage.setItem("totalCAdvanceIpd", totalCAdvanceIpd);
	sessionStorage.setItem("totalRTGSAmtIpd", totalRTGSAmtIpd);
		
	$("#ipdCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmtIpd=0;
	var totalCashAmtIpdRef=0,totalCardAmtIpdRef=0,totalNetBankAmtIpdRef=0,totalGoPayAmtIpdRef=0;totalPhonePayAmtIpdRef=0,totalPayTMAmtIpdRef=0,totalChequeAmtIpdRef=0,totalCAdvanceIpdRef=0,totalRTGSAmtIpdRef=0;
	if(r.lstIpdRefund.length > 0){
		
		for(var i=0;i < r.lstIpdRefund.length;i++){
			
			if(CAdvanceFlow =="on"){	
				if(r.lstIpdRefund[i].payMode!="CAdvance"){
			        totAmt = Number(totAmt)+Number(r.lstIpdRefund[i].recAmt);
			     }
			}else{
				totAmt = Number(totAmt)+Number(r.lstIpdRefund[i].recAmt);
			}
			
			
			var recDate=new Date(r.lstIpdRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstIpdRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;		
			
			if(r.lstIpdRefund[i].payMode.trim()=="Cash"){
				totalCashAmtIpdRef=Number(totalCashAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="Card"){
				totalCardAmtIpdRef=Number(totalCardAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="UPI"){
				totalNetBankAmtIpdRef=Number(totalNetBankAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="GPay"){
				totalGoPayAmtIpdRef=Number(totalGoPayAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="Paytm"){
				totalPayTMAmt=Number(totalPayTMAmt)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="Phone Pay"){
				totalPhonePayAmtIpdRef=Number(totalPhonePayAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode=="CAdvance"){
				totalCAdvanceIpdRef=Number(totalCAdvanceIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="RTGS/NEFT"){
				totalRTGSAmtIpdRef=Number(totalRTGSAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}else if(r.lstIpdRefund[i].payMode.trim()=="Cheque"){
				totalChequeAmtIpdRef=Number(totalChequeAmtIpdRef)+Number(r.lstIpdRefund[i].recAmt);
			}

			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 30px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 35px" >'+r.lstIpdRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdRefund[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 80px" >'+r.lstIpdRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdRefund[i].patientName+'</td> '	
                + ' <td style="height: 21.5px;width: 150px" >'+r.lstIpdRefund[i].docName+'</td> '						
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstIpdRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstIpdRefund[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstIpdRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstIpdRefund[i].remark+'</td> ';
				if(risingFlow == "on"){
					
					temp = temp + ' <td style="height: 21.5px;width: 100px" >Ipd Refund</td> ';
				}
			+' </tr>';		
		}
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" " ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total Cheque</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalChequeAmtIpdRef).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total Card</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalCardAmtIpdRef).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total UPI</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalNetBankAmtIpdRef).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total Cash</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalCashAmtIpdRef).toFixed(2)+'</th> '			
	+' </tr>';
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total PayTM</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPayTMAmtIpdRef).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total GooglePay</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalGoPayAmtIpdRef).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total PhonePay</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPhonePayAmtIpdRef).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total RTGS</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalRTGSAmtIpdRef).toFixed(2)+'</th> '			
	+' </tr>';
		
		temp=temp+ '<tr>'

		temp=temp
		+ ' <th style="height: 21.5px;width: 30px" " ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total CAdvance</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalCAdvanceIpdRef).toFixed(2)+'</th> '
	temp=temp
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 90px" ></th> '												
		+ ' <th style="height: 21.5px;width: 45px" ></th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totAmt).toFixed(2)+'</th> '		
	+' </tr>';	
	}
	totRefAmtIpd = totAmt;
	sessionStorage.setItem("totRefAmtIpd", totRefAmtIpd);

	sessionStorage.setItem("totalCashAmtIpdRef", totalCashAmtIpdRef);
	sessionStorage.setItem("totalCardAmtIpdRef", totalCardAmtIpdRef);
	sessionStorage.setItem("totalNetBankAmtIpdRef", totalNetBankAmtIpdRef);
	sessionStorage.setItem("totalGoPayAmtIpdRef", totalGoPayAmtIpdRef);
	sessionStorage.setItem("totalPhonePayAmtIpdRef", totalPhonePayAmtIpdRef);
	sessionStorage.setItem("totalPayTMAmtIpdRef", totalPayTMAmtIpdRef);
	sessionStorage.setItem("totalChequeAmtIpdRef", totalChequeAmtIpdRef);
	sessionStorage.setItem("totalCAdvanceIpdRef", totalCAdvanceIpdRef);
	sessionStorage.setItem("totalRTGSAmtIpdRef", totalRTGSAmtIpdRef);
			
	$("#ipdRefund").html(temp);
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmtIpd).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmtIpd).toFixed(2));
	var totCash = Number(totRecAmtIpd) - Number(totRefAmtIpd);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

//For Diagnosis
function setDiagReceiptRefundReportNew(r){
	
	var risingFlow=$("#risingFlow").val();
	var hospName = $("#hospName").val();
	var CAdvanceFlow = $("#CAdvanceFlow").val();
	var temp="";
	var totAmt=0,totRecAmtDiag=0;
	var totalCashAmtDiag=0,totalCardAmtDiag=0,totalNetBankAmtDiag=0,totalGoPayAmtDiag=0;totalPhonePayAmtDiag=0,totalPayTMAmtDiag=0,totalChequeAmtDiag=0,totalCAdvanceDiag=0,totalRTGSAmtDiag=0;
	if(r.lstDiagReceipt.length > 0){
		
		for(var i=0;i < r.lstDiagReceipt.length;i++){
				
			if(CAdvanceFlow =="on"){	
				if(r.lstDiagReceipt[i].payMode!='CAdvance'){			
					   totAmt = Number(totAmt)+Number(r.lstDiagReceipt[i].recAmt);
				}
		  }else{	
				totAmt = Number(totAmt)+Number(r.lstDiagReceipt[i].recAmt);
		  }
			var recDate=new Date(r.lstDiagReceipt[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstDiagReceipt[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;	
			
			if(r.lstDiagReceipt[i].payMode.trim()=="Cash"){
				totalCashAmtDiag=Number(totalCashAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="Card"){
				totalCardAmtDiag=Number(totalCardAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="UPI"){
				totalNetBankAmtDiag=Number(totalNetBankAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="GPay"){
				totalGoPayAmtDiag=Number(totalGoPayAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="Paytm"){
				totalPayTMAmtDiag=Number(totalPayTMAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="Phone Pay"){
				totalPhonePayAmtDiag=Number(totalPhonePayAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="CAdvance"){
				totalCAdvanceDiag=Number(totalCAdvanceDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="RTGS/NEFT"){
				totalRTGSAmtDiag=Number(totalRTGSAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}else if(r.lstDiagReceipt[i].payMode.trim()=="Cheque"){
				totalChequeAmtDiag=Number(totalChequeAmtDiag)+Number(r.lstDiagReceipt[i].recAmt);
			}

			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 30px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 35px" >'+r.lstDiagReceipt[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 80px" >'+r.lstDiagReceipt[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagReceipt[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagReceipt[i].docName+'</th> '						
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagReceipt[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagReceipt[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagReceipt[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstDiagReceipt[i].remark+'</td> ';				
			+' </tr>';		
		}
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total Cheque</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalChequeAmtDiag).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total Card</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalCardAmtDiag).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total UPI</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalNetBankAmtDiag).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total Cash</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalCashAmtDiag).toFixed(2)+'</th> '					
	+' </tr>';
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total PayTM</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPayTMAmtDiag).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total GooglePay</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalGoPayAmtDiag).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total PhonePay</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPhonePayAmtDiag).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total RTGS</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalRTGSAmtDiag).toFixed(2)+'</th> '				
	+' </tr>';
		
		temp=temp+ '<tr>'

		temp=temp
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total CAdvance</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalCAdvanceDiag).toFixed(2)+'</th> '	
		temp=temp
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 90px" ></th> '					
		+ ' <th style="height: 21.5px;width: 45px" ></th> '
		+ ' <th style="height: 21.5px;width: 65px" ></th> '
		+ ' <th style="height: 21.5px;width: 100px" >Total</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totAmt).toFixed(2)+'</th> '		
	+' </tr>';	
	}
	totRecAmtDiag = totAmt;
	sessionStorage.setItem("totRecAmtDiag", totRecAmtDiag);

	sessionStorage.setItem("totalCashAmtDiag", totalCashAmtDiag);
	sessionStorage.setItem("totalCardAmtDiag", totalCardAmtDiag);
	sessionStorage.setItem("totalNetBankAmtDiag", totalNetBankAmtDiag);
	sessionStorage.setItem("totalGoPayAmtDiag", totalGoPayAmtDiag);
	sessionStorage.setItem("totalPhonePayAmtDiag", totalPhonePayAmtDiag);
	sessionStorage.setItem("totalPayTMAmtDiag", totalPayTMAmtDiag);
	sessionStorage.setItem("totalChequeAmtDiag", totalChequeAmtDiag);
	sessionStorage.setItem("totalCAdvanceDiag", totalCAdvanceDiag);
	sessionStorage.setItem("totalRTGSAmtDiag", totalRTGSAmtDiag);
	

	$("#diagCollection").html(temp);		
	
	var temp="";
	var totAmt=0,totRefAmtDiag=0;
	var totalCashAmtDiagRef=0,totalCardAmtDiagRef=0,totalNetBankAmtDiagRef=0,totalGoPayAmtDiagRef=0;totalPhonePayAmtDiagRef=0,totalPayTMAmtDiagRef=0,totalChequeAmtDiagRef=0,totalCAdvanceDiagRef=0,totalRTGSAmtDiagRef=0;
	if(r.lstDiagRefund.length > 0){
		
		for(var i=0;i < r.lstDiagRefund.length;i++){
				
			if(CAdvanceFlow == "on"){
				if(r.lstDiagRefund[i].payMode!="CAdvance"){
					totAmt = Number(totAmt)+Number(r.lstDiagRefund[i].recAmt);
				}
			}else{
				totAmt = Number(totAmt)+Number(r.lstDiagRefund[i].recAmt);
			}	
			
			
			var recDate=new Date(r.lstDiagRefund[i].recDate).toLocaleDateString('en-GB');	
			var recTime=new Date(r.lstDiagRefund[i].recDate).toLocaleTimeString('en-GB');			
			recDate = recDate+" "+recTime;
			
			if(r.lstDiagRefund[i].payMode.trim()=="Cash"){
				totalCashAmtDiagRef=Number(totalCashAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="Card"){
				totalCardAmtDiagRef=Number(totalCardAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="UPI"){
				totalNetBankAmtDiagRef=Number(totalNetBankAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="GPay"){
				totalGoPayAmtDiagRef=Number(totalGoPayAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="Paytm"){
				totalPayTMAmtDiagRef=Number(totalPayTMAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="Phone Pay"){
				totalPhonePayAmtDiagRef=Number(totalPhonePayAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="CAdvance"){
				totalCAdvanceDiagRef=Number(totalCAdvanceDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="RTGS/NEFT"){
				totalRTGSAmtDiagRef=Number(totalRTGSAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}else if(r.lstDiagRefund[i].payMode.trim()=="Cheque"){
				totalChequeAmtDiagRef=Number(totalChequeAmtDiagRef)+Number(r.lstDiagRefund[i].recAmt);
			}

			
			temp=temp+ '<tr>'
				+ ' <td style="height: 21.5px;width: 30px" >'+(i+1)+'</td> '
				+ ' <td style="height: 21.5px;width: 35px" >'+r.lstDiagRefund[i].patientId+'</td> '	
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].billId+'</td> '	
				+ ' <td style="height: 21.5px;width: 80px" >'+r.lstDiagRefund[i].opdipdno+'</td> '
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].recNo+'</td> '													
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagRefund[i].patientName+'</td> '	
				+ ' <td style="height: 21.5px;width: 150px" >'+r.lstDiagReceipt[i].docName+'</th> '					
				+ ' <td style="height: 21.5px;width: 90px" >'+recDate+'</th> '												
				+ ' <td style="height: 21.5px;width: 45px" >'+r.lstDiagRefund[i].payMode+'</td> '					
				+ ' <td style="height: 21.5px;width: 65px" >'+parseFloat(r.lstDiagRefund[i].recAmt).toFixed(2)+'</td> '												
				+ ' <td style="height: 21.5px;width: 100px" >'+r.lstDiagRefund[i].user+'</td> '		
				+ ' <td style="height: 21.5px;width: 90px" >'+r.lstDiagRefund[i].remark+'</td> ';
			+' </tr>';		
		}
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total Cheque</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalChequeAmtDiagRef).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total Card</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalCardAmtDiagRef).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total UPI</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalNetBankAmtDiagRef).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total Cash</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalCashAmtDiagRef).toFixed(2)+'</th> '					
	+' </tr>';
		
		temp=temp+ '<tr>'
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total PayTM</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPayTMAmtDiagRef).toFixed(2)+'</th> '	
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" >Total GooglePay</th> '			
		+ ' <th style="height: 21.5px;width: 150px" >'+parseFloat(totalGoPayAmtDiagRef).toFixed(2)+'</th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 80px" >Total PhonePay</th> '												
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalPhonePayAmtDiagRef).toFixed(2)+'</th> '					
		+ ' <th style="height: 21.5px;width: 65px" ></th> '												
		+ ' <th style="height: 21.5px;width: 100px" >Total RTGS</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totalRTGSAmtDiagRef).toFixed(2)+'</th> '				
	+' </tr>';
		
		temp=temp+ '<tr>'

		temp=temp
		+ ' <th style="height: 21.5px;width: 30px" ></th> '
		+ ' <th style="height: 21.5px;width: 35px" >Total CAdvance</th> '
		+ ' <th style="height: 21.5px;width: 45px" >'+parseFloat(totalCAdvanceDiagRef).toFixed(2)+'</th> '	
		temp=temp
		+ ' <th style="height: 21.5px;width: 80px" ></th> '		
		+ ' <th style="height: 21.5px;width: 45px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '			
		+ ' <th style="height: 21.5px;width: 150px" ></th> '						
		+ ' <th style="height: 21.5px;width: 90px" ></th> '					
		+ ' <th style="height: 21.5px;width: 45px" ></th> '
		+ ' <th style="height: 21.5px;width: 65px" ></th> '
		+ ' <th style="height: 21.5px;width: 100px" >Total</th> '		
		+ ' <th style="height: 21.5px;width: 90px" >'+parseFloat(totAmt).toFixed(2)+'</th> '		
	+' </tr>';

	}
	totRefAmtDiag = totAmt;
	sessionStorage.setItem("totRefAmtDiag", totRefAmtDiag);

	sessionStorage.setItem("totalCashAmtDiagRef", totalCashAmtDiagRef);
	sessionStorage.setItem("totalCardAmtDiagRef", totalCardAmtDiagRef);
	sessionStorage.setItem("totalNetBankAmtDiagRef", totalNetBankAmtDiagRef);
	sessionStorage.setItem("totalGoPayAmtDiagRef", totalGoPayAmtDiagRef);
	sessionStorage.setItem("totalPhonePayAmtDiagRef", totalPhonePayAmtDiagRef);
	sessionStorage.setItem("totalPayTMAmtDiagRef", totalPayTMAmtDiagRef);
	sessionStorage.setItem("totalChequeAmtDiagRef", totalChequeAmtDiagRef);
	sessionStorage.setItem("totalCAdvanceDiagRef", totalCAdvanceDiagRef);
	sessionStorage.setItem("totalRTGSAmtDiagRef", totalRTGSAmtDiagRef);
		
	$("#diagRefund").html(temp);	
	
	// for dashboard
	$("#totRec").val(parseFloat(totRecAmtDiag).toFixed(2));
	$("#totRef").val(parseFloat(totRefAmtDiag).toFixed(2));
	var totCash = Number(totRecAmtDiag) - Number(totRefAmtDiag);
	$("#totCash").val(parseFloat(totCash).toFixed(2));
}

function setTotalCountReceiptRefund(r){
	//For Receipt
	var totRecAmtOpd= sessionStorage.getItem("totRecAmtOpd"); 
	var totRecAmtIpd=sessionStorage.getItem("totRecAmtIpd"); 
	var totRecAmtDiag=sessionStorage.getItem("totRecAmtDiag"); 
	//For Refund
	var totRefAmtOpd=sessionStorage.getItem("totRefAmtOpd"); 
	var totRefAmtIpd=sessionStorage.getItem("totRefAmtIpd"); 
	var totRefAmtDiag=sessionStorage.getItem("totRefAmtDiag"); 
	
	//For totalChequeAmt Receipt
	var totalChequeAmtOpd= sessionStorage.getItem("totalChequeAmtOpd"); 
	var totalChequeAmtIpd=sessionStorage.getItem("totalChequeAmtIpd"); 
	var totalChequeAmtDiag=sessionStorage.getItem("totalChequeAmtDiag"); 
	
	//For totalChequeAmt Refund
	var totalChequeAmtOpdRef= sessionStorage.getItem("totalChequeAmtOpdRef"); 
	var totalChequeAmtIpdRef=sessionStorage.getItem("totalChequeAmtIpdRef"); 
	var totalChequeAmtDiagRef=sessionStorage.getItem("totalChequeAmtDiagRef"); 
	
	// for cashAmt Receipt
	var totalCashAmtOpd= sessionStorage.getItem("totalCashAmtOpd"); 
	var totalCashAmtIpd=sessionStorage.getItem("totalCashAmtIpd"); 
	var totalCashAmtDiag=sessionStorage.getItem("totalCashAmtDiag"); 
	
	// for cashAmt Refund
	var totalCashAmtOpdRef= sessionStorage.getItem("totalCashAmtOpdRef"); 
	var totalCashAmtIpdRef=sessionStorage.getItem("totalCashAmtIpdRef"); 
	var totalCashAmtDiagRef=sessionStorage.getItem("totalCashAmtDiagRef"); 
	
	// for totalCardAmt Receipt
	var totalCardAmtOpd= sessionStorage.getItem("totalCardAmtOpd"); 
	var totalCardAmtIpd=sessionStorage.getItem("totalCardAmtIpd"); 
	var totalCardAmtDiag=sessionStorage.getItem("totalCardAmtDiag"); 
	
	// for totalCardAmt Refund
	var totalCardAmtOpdRef= sessionStorage.getItem("totalCardAmtOpdRef"); 
	var totalCardAmtIpdRef=sessionStorage.getItem("totalCardAmtIpdRef"); 
	var totalCardAmtDiagRef=sessionStorage.getItem("totalCardAmtDiagRef"); 
	
	// for totalNetBankAmt Receipt
	var totalNetBankAmtOpd= sessionStorage.getItem("totalNetBankAmtOpd"); 
	var totalNetBankAmtIpd=sessionStorage.getItem("totalNetBankAmtIpd"); 
	var totalNetBankAmtDiag=sessionStorage.getItem("totalNetBankAmtDiag"); 
	
	// for totalNetBankAmt Refund
	var totalNetBankAmtOpdRef= sessionStorage.getItem("totalNetBankAmtOpdRef"); 
	var totalNetBankAmtIpdRef=sessionStorage.getItem("totalNetBankAmtIpdRef"); 
	var totalNetBankAmtDiagRef=sessionStorage.getItem("totalNetBankAmtDiagRef"); 
	
	// for totalGoPayAmt Receipt
	var totalGoPayAmtOpd= sessionStorage.getItem("totalGoPayAmtOpd"); 
	var totalGoPayAmtIpd=sessionStorage.getItem("totalGoPayAmtIpd"); 
	var totalGoPayAmtDiag=sessionStorage.getItem("totalGoPayAmtDiag"); 
	
	// for totalGoPayAmt Refund
	var totalGoPayAmtOpdRef= sessionStorage.getItem("totalGoPayAmtOpdRef"); 
	var totalGoPayAmtIpdRef=sessionStorage.getItem("totalGoPayAmtIpdRef"); 
	var totalGoPayAmtDiagRef=sessionStorage.getItem("totalGoPayAmtDiagRef");  
	
	// for totalPhonePayAmt Receipt
	var totalPhonePayAmtOpd= sessionStorage.getItem("totalPhonePayAmtOpd"); 
	var totalPhonePayAmtIpd=sessionStorage.getItem("totalPhonePayAmtIpd"); 
	var totalPhonePayAmtDiag=sessionStorage.getItem("totalPhonePayAmtDiag"); 
	
	// for totalPhonePayAmt Refund
	var totalPhonePayAmtOpdRef= sessionStorage.getItem("totalPhonePayAmtOpdRef"); 
	var totalPhonePayAmtIpdRef=sessionStorage.getItem("totalPhonePayAmtIpdRef"); 
	var totalPhonePayAmtDiagRef=sessionStorage.getItem("totalPhonePayAmtDiagRef"); 
	
	// for totalPhonePayAmt Receipt
	var totalPhonePayAmtOpd= sessionStorage.getItem("totalPhonePayAmtOpd"); 
	var totalPhonePayAmtIpd=sessionStorage.getItem("totalPhonePayAmtIpd"); 
	var totalPhonePayAmtDiag=sessionStorage.getItem("totalPhonePayAmtDiag"); 
	
	// for totalPhonePayAmt Refund
	var totalPhonePayAmtOpdRef= sessionStorage.getItem("totalPhonePayAmtOpdRef"); 
	var totalPhonePayAmtIpdRef=sessionStorage.getItem("totalPhonePayAmtIpdRef"); 
	var totalPhonePayAmtDiagRef=sessionStorage.getItem("totalPhonePayAmtDiagRef"); 
	
	// for totalPayTMAmt Receipt
	var totalPayTMAmtOpd= sessionStorage.getItem("totalPayTMAmtOpd"); 
	var totalPayTMAmtIpd=sessionStorage.getItem("totalPayTMAmtIpd"); 
	var totalPayTMAmtDiag=sessionStorage.getItem("totalPayTMAmtDiag"); 
	
	// for totalPayTMAmt Refund
	var totalPayTMAmtOpdRef= sessionStorage.getItem("totalPayTMAmtOpdRef"); 
	var totalPayTMAmtIpdRef=sessionStorage.getItem("totalPayTMAmtIpdRef"); 
	var totalPayTMAmtDiagRef=sessionStorage.getItem("totalPayTMAmtDiagRef"); 
	
	// for totalRTGSAmt Receipt
	var totalRTGSAmtOpd= sessionStorage.getItem("totalRTGSAmtOpd"); 
	var totalRTGSAmtIpd=sessionStorage.getItem("totalRTGSAmtIpd"); 
	var totalRTGSAmtDiag=sessionStorage.getItem("totalRTGSAmtDiag"); 
	
	// for totalRTGSAmt Refund
	var totalRTGSAmtOpdRef= sessionStorage.getItem("totalRTGSAmtOpdRef"); 
	var totalRTGSAmtIpdRef=sessionStorage.getItem("totalRTGSAmtIpdRef"); 
	var totalRTGSAmtDiagRef=sessionStorage.getItem("totalRTGSAmtDiagRef"); 
	
	// for totalCAdvance Receipt
	var totalCAdvanceOpd= sessionStorage.getItem("totalCAdvanceOpd"); 
	var totalCAdvanceIpd=sessionStorage.getItem("totalCAdvanceIpd"); 
	var totalCAdvanceDiag=sessionStorage.getItem("totalCAdvanceDiag");
	
	// for totalCAdvance Refund
	var totalCAdvanceOpdRef= sessionStorage.getItem("totalCAdvanceOpdRef"); 
	var totalCAdvanceIpdRef=sessionStorage.getItem("totalCAdvanceIpdRef"); 
	var totalCAdvanceDiagRef=sessionStorage.getItem("totalCAdvanceDiagRef");

	var totalCollection=0 , totalRecCollection=0 ,totalRefund=0 ,totalcashAmt=0,totalCardAmt=0,totalNetBankAmt=0,totalGoPayAmt=0;totalPhonePayAmt=0,totalPayTMAmt=0,totalChequeAmt=0,totalCAdvance=0,totalRTGSAmt=0;
 
	//For Receipt Collection
    totalRecCollection= parseFloat(totRecAmtOpd)+ parseFloat(totRecAmtIpd) +  parseFloat(totRecAmtDiag);
    
    totalChequeAmt=parseFloat(totalChequeAmtOpd)+parseFloat(totalChequeAmtIpd)+parseFloat(totalChequeAmtDiag);
    totalCashAmt=parseFloat(totalCashAmtOpd)+parseFloat(totalCashAmtIpd)+parseFloat(totalCashAmtDiag);
    totalCardAmt=parseFloat(totalCardAmtOpd)+parseFloat(totalCardAmtIpd)+parseFloat(totalCardAmtDiag);
    totalNetBankAmt=parseFloat(totalNetBankAmtOpd)+parseFloat(totalNetBankAmtIpd)+parseFloat(totalNetBankAmtDiag);
    totalGoPayAmt=parseFloat(totalGoPayAmtOpd)+parseFloat(totalGoPayAmtIpd)+parseFloat(totalGoPayAmtDiag);
    totalPhonePayAmt=parseFloat(totalPhonePayAmtOpd)+parseFloat(totalPhonePayAmtIpd)+parseFloat(totalPhonePayAmtDiag);
    totalPayTMAmt=parseFloat(totalPayTMAmtOpd)+parseFloat(totalPayTMAmtIpd)+parseFloat(totalPayTMAmtDiag);
    totalRTGSAmt=parseFloat(totalRTGSAmtOpd)+parseFloat(totalRTGSAmtIpd)+parseFloat(totalRTGSAmtDiag);
    totalCAdvance=parseFloat(totalCAdvanceOpd)+parseFloat(totalCAdvanceIpd)+parseFloat(totalCAdvanceDiag);
    
    //For Refund Collection
    totalRefund=parseFloat(totRefAmtOpd)+parseFloat(totRefAmtIpd)+parseFloat(totRefAmtDiag);
	
    totalChequeAmtRef=parseFloat(totalChequeAmtOpdRef)+parseFloat(totalChequeAmtIpdRef)+parseFloat(totalChequeAmtDiagRef);
    totalCashAmtRef=parseFloat(totalCashAmtOpdRef)+parseFloat(totalCashAmtIpdRef)+parseFloat(totalCashAmtDiagRef);
    totalCardAmtRef=parseFloat(totalCardAmtOpdRef)+parseFloat(totalCardAmtIpdRef)+parseFloat(totalCardAmtDiagRef);
    totalNetBankAmtRef=parseFloat(totalNetBankAmtOpdRef)+parseFloat(totalNetBankAmtIpdRef)+parseFloat(totalNetBankAmtDiagRef);
    totalGoPayAmtRef=parseFloat(totalGoPayAmtOpdRef)+parseFloat(totalGoPayAmtIpdRef)+parseFloat(totalGoPayAmtDiagRef);
    totalPhonePayAmtRef=parseFloat(totalPhonePayAmtOpdRef)+parseFloat(totalPhonePayAmtIpdRef)+parseFloat(totalPhonePayAmtDiagRef);
    totalPayTMAmtRef=parseFloat(totalPayTMAmtOpdRef)+parseFloat(totalPayTMAmtIpdRef)+parseFloat(totalPayTMAmtDiagRef);
    totalRTGSAmtRef=parseFloat(totalRTGSAmtOpdRef)+parseFloat(totalRTGSAmtIpdRef)+parseFloat(totalRTGSAmtDiagRef);
    totalCAdvanceRef=parseFloat(totalCAdvanceOpdRef)+parseFloat(totalCAdvanceIpdRef)+parseFloat(totalCAdvanceDiagRef);
  
    // for Total Collection
    totalCollection=parseFloat(totalRecCollection)-parseFloat(totalRefund);
	
    
    $("#totalCollection").text(totalCollection);
	
	//Total Calculation for Receipt
	$("#totalRecCollection").text(totalRecCollection);
	
	$("#totalChequeRec").text(totalChequeAmt);	
	$("#totalCashRec").text(totalCashAmt);
	$("#totalCardRec").text(totalCardAmt);
	$("#totalNetBankRec").text(totalNetBankAmt);
	$("#totalGoPayRec").text(totalGoPayAmt);
	$("#totalPayTMRec").text(totalPayTMAmt);
	$("#totalPhonePayRec").text(totalPhonePayAmt);
	$("#totalRTGSRec").text(totalRTGSAmt);
	$("#totalCAdvanceRec").text(totalCAdvance);
	
	//Total Calculation for Refund
	$("#totalRefAmt").text(totalRefund);
	
	$("#totalChequeRef").text(totalChequeAmtRef);
	$("#totalCashRef").text(totalCashAmtRef);
	$("#totalCardRef").text(totalCardAmtRef);
	$("#totalNetBankRef").text(totalNetBankAmtRef);
	$("#totalGoPayRef").text(totalGoPayAmtRef);
	$("#totalPayTMRef").text(totalPayTMAmtRef);
	$("#totalPhonePayRef").text(totalPhonePayAmtRef);
	$("#totalRTGSRef").text(totalRTGSAmtRef);
	$("#totalCAdvanceRef").text(totalCAdvanceRef);
	
	
	
	
  
}

//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}




function getBusinessReport(){
	
	var callF="";
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
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
		url 	: "ehat/finance/getBusinessReport",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			var OPDBusinessBillAmount = parseInt(r.split(",")[0].split(":")[1]); 
			var OPDBusinessDiscount = parseInt(r.split(",")[1].split(":")[1]);
			var OPDBusinessConcession = parseInt(r.split(",")[2].split(":")[1]);
			var RefundOPDPaidAmount = parseInt(r.split(",")[17].split(":")[1]);
			var OPDBusinessPaidAmount = parseInt(r.split(",")[3].split(":")[1]);
			var OPDBusinessNetAmount=0;
			var OPDBillAmount=0				
			OPDBillAmount = OPDBusinessBillAmount;				
			
			
			OPDBusinessNetAmount =	parseInt(OPDBillAmount) - Math.abs(parseInt(OPDBusinessDiscount) + parseInt(OPDBusinessConcession))
			
			var OpdDues = Math.abs(OPDBusinessNetAmount - OPDBusinessPaidAmount);
			
			
			
			var IPDBusinessBillAmount = parseInt(r.split(",")[4].split(":")[1]); 
			var IPDBusinessDiscount = parseInt(r.split(",")[5].split(":")[1]);
			var IPDBusinessConcession = parseInt(r.split(",")[6].split(":")[1]);
			var RefundIPDPaidAmount = parseInt(r.split(",")[16].split(":")[1]);
			var IPDBusinessPaidAmount = parseInt(r.split(",")[7].split(":")[1]);
			var IPDBusinessNetAmount=0;
			var IPDBillAmount=0;
			
			IPDBusinessNetAmount =	parseInt(IPDBusinessBillAmount) - Math.abs(parseInt(IPDBusinessDiscount)+parseInt(IPDBusinessConcession));
			
			IPDBillAmount = IPDBusinessBillAmount + RefundIPDPaidAmount
			IPDBillAmount = IPDBillAmount - (Math.abs(parseInt(IPDBusinessDiscount)+parseInt(IPDBusinessConcession)));
			var IpdDues = Math.abs(IPDBillAmount - IPDBusinessPaidAmount);
			
			
			var DiagnosticBusinessBillAmount = parseInt(r.split(",")[8].split(":")[1]); 
			var DiagnosticBusinessDiscount = parseInt(r.split(",")[9].split(":")[1]);
			var DiagnosticBusinessConcession = parseInt(r.split(",")[10].split(":")[1]);
			var RefundDiagnosticPaidAmount = parseInt(r.split(",")[18].split(":")[1]);
			var DiagnosticBusinessPaidAmount = parseInt(r.split(",")[11].split(":")[1]);
			var DiagnosticBusinessNetAmount=0;
			var DiagnosticBillAmount = 0;
			
		
				DiagnosticBillAmount = DiagnosticBusinessBillAmount;
			
			
			
			
				DiagnosticBusinessNetAmount =	DiagnosticBillAmount - (Math.abs(parseInt(DiagnosticBusinessDiscount)+parseInt(DiagnosticBusinessConcession)));
			
			var DiagnosticDues = Math.abs(DiagnosticBusinessNetAmount - DiagnosticBusinessPaidAmount);			
			
			var TotalBillAmount = parseInt(r.split(",")[12].split(":")[1]); 
			var TotalDiscount = parseInt(r.split(",")[13].split(":")[1]);
			var TotalConcession = parseInt(r.split(",")[14].split(":")[1]);
			var TotalRefund = parseInt(r.split(",")[19].split(":")[1]);
			var TotalPaid = parseInt(r.split(",")[15].split(":")[1]);
			
			
				
			
			var totalnet = Math.abs(parseInt(OPDBusinessNetAmount) + parseInt(IPDBusinessNetAmount) + parseInt(DiagnosticBusinessNetAmount) );
			var totalduesAmount = OpdDues + IpdDues + DiagnosticDues;

		

			var htm = 
			'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'
			    + '<td style="font-weight: bold;">OPD Business</td>'
			    + '<td>'+OPDBusinessBillAmount+'</td>'
			    + '<td>'+OPDBusinessDiscount+'</td>'
			    + '<td>'+OPDBusinessConcession+'</td>'
			    + '<td>'+OPDBusinessNetAmount+'</td>'			    
			    + '<td>'+OPDBusinessPaidAmount+'</td>'
			    + '<td>'+RefundOPDPaidAmount+'</td>'
			    + '<td>'+OpdDues+'</td>'
			+ '</tr>'
		+'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'+
		    '<td style="font-weight: bold;">IPD Business</td>'+
		    '<td>'+IPDBusinessBillAmount+'</td>'+
		    '<td>'+IPDBusinessDiscount+'</td>'+
		    '<td>'+IPDBusinessConcession+'</td>'+
		    '<td>'+IPDBusinessNetAmount+'</td>'+		    	    
			 '<td>'+IPDBusinessPaidAmount+'</td>'+
			 '<td>'+RefundIPDPaidAmount+'</td>'+	
		    '<td>'+IpdDues+'</td>'+
		'</tr>'+
		'<tr style="background-color: lightyellow; font-size: 16px; border: 2px solid darkgray;">'+
		    '<td style="font-weight: bold;">Diagnostic</td>'+
		    '<td>'+DiagnosticBusinessBillAmount+'</td>'+
		    '<td>'+DiagnosticBusinessDiscount+'</td>'+
		    '<td>'+DiagnosticBusinessConcession+'</td>'+		    
		    '<td>'+DiagnosticBusinessNetAmount+'</td>'+
			 '<td>'+DiagnosticBusinessPaidAmount+'</td>'+
			 '<td>'+RefundDiagnosticPaidAmount+'</td>'+
		    '<td>'+DiagnosticDues+'</td>'+
		'</tr>'+
		'<tr class="table-primary" style="background-color: yellow; font-size: 16px; border: 2px solid darkgray;">'+
		    '<td style="font-weight: bold;">Total</td>'+
		    '<td style="font-weight: bold;">'+TotalBillAmount+'</td>'+
		    '<td style="font-weight: bold;">'+TotalDiscount+'</td>'+
		    '<td style="font-weight: bold;">'+TotalConcession+'</td>'+
		    '<td style="font-weight: bold;">'+totalnet+'</td>'+
		    '<td style="font-weight: bold;">'+TotalPaid+'</td>'+
		    '<td style="font-weight: bold;">'+TotalRefund+'</td>'+
		    '<td style="font-weight: bold;">'+totalduesAmount+'</td>'+
		'</tr>';
	        
	        $("#businessData").html(htm)
		}
	});
}

//Added By Annapurna Deleted Refund Report

function getIpdDeletedRefundData(callFrom){
	
	var callF=callFrom;
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var userId = parseInt($("#userId1").val());	
	var unitId = parseInt($("#unitId").val());	
	var paymode = parseInt($("#payMode").val());	
		
	var inputs = [];	
	inputs.push("unitId=" + unitId);	
	inputs.push("userId=" + userId);
	inputs.push("callFrom=" + callF);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);	
    inputs.push("paymode=" + paymode);	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getIpdDeletedRefundData",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			setIpdDeletedRefundData(r);
		}
	});
}

function setIpdDeletedRefundData(r){
	
	var temp="";
	var totAmt=0;
	var index = 1;
	var dName;

		for(var i=0;i < r.listBillRefundMaster.length;i++){
			
			 var departmentname = r.listBillRefundMaster[i].departmentId;
		     if (departmentname == 1) {
				dName = 'OPD';
			}
			 if (departmentname == 2) {
				 dName = 'IPD';
			}
			 if (departmentname == 3) {
				 dName = 'Diagonstics';
			}
			
			totAmt=Number(totAmt)+Number(r.listBillRefundMaster[i].totalPaid);
			
			var billDate=new Date(r.listBillRefundMaster[i].billDate).toLocaleDateString('en-GB');				
			var deletedDate="-";
			var deletedTime="-";
				
			if(r.listBillRefundMaster[i].deletedDateTime != null){
				
				deletedDate = new Date(r.listBillRefundMaster[i].deletedDateTime).toLocaleDateString('en-GB');
				deletedTime = new Date(r.listBillRefundMaster[i].deletedDateTime).toLocaleTimeString('en-GB');
			}	
			
			deletedDate = deletedDate + " " + deletedTime;
			
			var refDr=r.listBillRefundMaster[i].refDr;
			if(refDr==null){
				refDr="-";
			}
			
			var treatDr=r.listBillRefundMaster[i].treatDr;
			if(treatDr==null){
				treatDr="-";
			}
			
			var userName=r.listBillRefundMaster[i].user;
			if(userName==null){
				userName="-";
			}
			
			temp=temp+ '<tr>'
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+index+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].patientId+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].refundCount+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].patientName+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].invoice_count+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+parseFloat(r.listBillRefundMaster[i].totalPaid).toFixed(2)+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].pay_name+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].bank_name+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].bNumber+'</div></td> '	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].userName+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+deletedDate+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].deleted_user_name+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].remarkDeletedRefund+'</div></td> ' 	
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+r.listBillRefundMaster[i].unit_name+'</div></td> '
				+ ' <td><div class="col-md-12 col-xs-12 col-sm-12">'+dName+'</div></td> ' 
			+ ' </tr>';	
			index++;
		}
		
		temp=temp+ '<tr>'
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '																	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '       
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12">'+parseFloat(totAmt).toFixed(2)+'</div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '	
			+ ' <th><div class="col-md-12 col-xs-12 col-sm-12"></div></th> '
			+' </tr>';		
	
	$("#deletedRefundIpdtable").html(temp);		
}


function setOTReportR(r){
    var temp="";var tempHead="";
    var pid=0; var payMethod="", billType = ""; var sponId=0; var rowCount=0;var ot_procedure=0;
    var date="00-00-000"; var headerlen=0;var otCount = 0;var serviceid=0;var date=0;
                                 // alert('....r.lstIpdBreakup.length11..'+JSON.stringify(r));
    if(r.lstIpdBreakup.length > 0){
         tempHead=tempHead + '<tr> '
                            + '<th>Sr No</th> '
                            + '<th>Patient Name</th> '
        					+ '<th>Patient Id</th> '
        					+ '<th>Month</th> '
        					+ '<th>Date</th> '       
        					+ '<th>Type</th> '
        					+ '<th>Payment Method</th> '
        					+ '<th>Billing Type</th> '   
        					+ '<th>Consultant</th> ' 
        					+ '<th>Total Bill</th> '
	    					+ '<th>OT Name</th> '
        					+ '<th>Operation Name</th> '
         					+ '<th>Operation Specialisation</th> ' 

         
               if(r.lstIpdBreakup[0].lstOtHeader != null){
                  for(var k=0;k < r.lstIpdBreakup[0].lstOtHeader.length;k++){
                        var servName= r.lstIpdBreakup[0].lstOtHeader[k].serviceName;
                        tempHead=tempHead + '<th>'+servName+'</th> '
            				              + '<th>'+servName+' Payout</th> ';
                     }
                }    
        tempHead=tempHead + '</tr>';

    for(var k=1;k < r.lstIpdBreakup.length;k++){          
        	var datetime= new Date(r.lstIpdBreakup[k].crdate).toLocaleDateString('en-GB');
             	
                 sponId=r.lstIpdBreakup[k].chargesslaveid;
                if(sponId > 0){                	
                	payMethod= "SPONSOR";
                }else{  
                	payMethod="SELF PAY";   
				}    
				 if(sponId > 0){                	
                	billType=r.lstIpdBreakup[k].sponsor_name; //"sponsor_name";
                 }else{                   	
                	billType="CASH OPEN BILLING"; 
					} 
    // if(r.lstIpdBreakup[k].patId != pid || date!=datetime && r.lstIpdBreakup[k].count_ot!=otCount){ 
    if(r.lstIpdBreakup[k].patId != pid ||  r.lstIpdBreakup[k].count_ot!=otCount){ 	    
       rowCount++; 
	           pid=r.lstIpdBreakup[k].patId; 
	           otCount=0;
	      if(r.lstIpdBreakup[k].count_ot!=otCount){		     
	            otCount = r.lstIpdBreakup[k].count_ot;
	            date =datetime;
            temp=temp+ '<tr> '		
                     + '<td>'+rowCount+'</td> '	
           			 + '<td>'+r.lstIpdBreakup[k].patientName+'</td> '
         			 + '<td>'+r.lstIpdBreakup[k].patId+'</td> '
           			 + '<td>'+r.lstIpdBreakup[k].monthnm+'</td> '
            		 + '<td>'+datetime+'</td> '
            		 + '<td>IPD </td> '
                     + '<td>'+ payMethod +'</td> '
            		 + '<td>'+billType +'</td> '
            		 + '<td>'+r.lstIpdBreakup[k].consultantdoc+'</td> ' 
                     + '<td>'+r.lstIpdBreakup[k].totalAmt+'</td> '
			         + '<td>'+r.lstIpdBreakup[k].theatername+'</td> '
                     + '<td>'+r.lstIpdBreakup[k].ot_nname+'</td> '
            		 + '<td>'+r.lstIpdBreakup[k].operation_specialisation+'</td> ' 
			
			 var subserviceid=0;
	     for(var p=0;p < r.lstIpdBreakup.length;p++){			
					
	     if(	r.lstIpdBreakup[p].sub_service_id !=subserviceid && r.lstIpdBreakup[p].patId == pid
			        && r.lstIpdBreakup[p].count_ot == otCount ){
		           temp=temp + '<td>'+r.lstIpdBreakup[p].doc_name+'</td> '
                	         + '<td>'+r.lstIpdBreakup[p].tot_amount+'</td> ';
                     subserviceid = 	r.lstIpdBreakup[p].sub_service_id;
                  }
			}  
     
            temp=temp+ '</tr>';
               } 
             }     
        }           
    }
    $("#servHead").html(tempHead);
    $("#container").html(temp); 
    //$("#searchType").val("0");
    $("#operationName").val("0");
    $("#opgrade").val("0");
    $("#doctorSpeciality").val("0");
	$("#doc_surgeon_name").val("0");	
	$("#doc_anesthetist_name").val("0");
	$("#otTypes").val("0");
}


function fetchOperationNames() {
	
	var oprationSelect = "<option value='0'>----- Select Operation -----</option>";
	var inputs = [];
	inputs.push('opType=' + encodeURIComponent(0));
	inputs.push('department=' + encodeURIComponent(0));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/otdata/fetchOperationName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			ajaxResponse = r;
			pobj1 = eval( ajaxResponse );

			for ( var i = 0; i < (pobj1.ol.length); i++) {

				oprationSelect = oprationSelect + ("<option value='"+(pobj1.ol[i].oi)+"'>"+ (pobj1.ol[i].on) +"</option>");
			}

			$("#operationName").html(oprationSelect);	
			$("#operationName").select2();
		}
	});
}


function fetchDoctorSpecilization(type) {

	var instance = {
	        unitId : $("#unitId").val(),
	        userId : $("#userId").val(),
	        callFrom : type
	    }
	jQuery.ajax({
		async : false,
		type : "POST",
		url			: 'ehat/register/getSpecialization',
        dataType	: 'json',
        data		: JSON.stringify(instance),
        contentType	: 'application/json',
        error : function() {
			alert('error');
		},
		success : function(r) {
			
			var htm = "";
			if(r.lstSpecialization.length > 1)
			htm = "<option value=0>--Select--</option>";
			
			for ( var i = 0; i < r.lstSpecialization.length; i++) {

				htm = htm + "<option value="+r.lstSpecialization[i].idhospital_Specialization+">"+r.lstSpecialization[i].specialization_name+"</option>";
			}
			$("#doctorSpeciality").html(htm);
			$("#doctorSpeciality").select2();
			}
		
	});
}


function getDoctorList(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllDoctors",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var alistTemp = "";
			alistTemp = alistTemp
					+ "<option value='0'>--Select Doctor--</option>";
			for ( var i = 0; i < r.length; i++) {
				alistTemp = alistTemp + "<option value=" + r[i].doctor_ID
						+ " data-name='"+ r[i].doc_name+"'>"
						+ r[i].doc_name + "</option>";
			}
			$("#doc_surgeon_name").html(alistTemp);
			$("#doc_surgeon_name").select2();

}
	});
}

function getAnesthetistList(){
	
	jQuery.ajax({
		async	: false,
		type: "GET",
		url : "ehat/finance/getAnesthetistList",
		data:  "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			var alistTemp = "";
				alistTemp = alistTemp
						+ "<option value='0'>--Select Doctor--</option>";
				for ( var i = 0; i < r.length; i++) {
					alistTemp = alistTemp + "<option value=" + r[i].doctor_ID
							+ " data-name='"+ r[i].doc_name+"'>"
							+ r[i].doc_name + "</option>";
				}
				$("#doc_anesthetist_name").html(alistTemp);
				$("#doc_anesthetist_name").select2();
		}
	});
}


function getOtType(){
	jQuery.ajax({
			async	: false,
			type: "GET",
			url : "./ehat/otdata/fetchOTName",
			data:  "&reqType=AJAX",
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var alistTemp = "";
					alistTemp = alistTemp
							+ "<option value='0'>--Select Theater--</option>";
					for ( var i = 0; i < r.liot.length; i++) {
						alistTemp = alistTemp + "<option value=" + r.liot[i].otid 
								+ " data-name='"+ r.liot[i].otnm +"'>"
								+ r.liot[i].otnm  + "</option>";
					}
					$("#otTypes").html(alistTemp);
					$("#otTypes").select2();
			}
		});

	}


//by sandip
function editBankMaster(Id){		
	var inputs = [];
	inputs.push('id=' + Id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/finance/editBankMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			
			$('#bankID').val(r.bankId);
			$('#accNo').val(r.accNo);
			$("#accType").val(r.accTypeId);
			$('#id').val(r.id);
			
			
		}
	});
}

//by sandip
function deleteBankMaster(Id){
	var r = confirm("Are You Sure You Want To Delete Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/finance/deleteBankMaster",
			data : {
				"id" : Id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				fetchFinanceBankDetails();
				
			}
		});
	}
}
