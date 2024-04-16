var smplColFlg="N";
var dupTestFlag="N";
var deleteTestSmplColFlg="N";
var risReportFlag="N";
/*-------------------------Package Billing-------------------------------*/


	/**
	 * @author   :Kishor
	 * @date     :20-Sept-2017
	 * @code     :for Reset records of other bill details package billing Ipd Data***/
	function resetAllOpdPackage()
	{		
		$('#servIdPackage').val(0);
		$("#perManualPackage").val("");
		
		$("#ratePackage").val(0);
		$("#doctorNamePackage").val(0);	
		$("#doctorNamePackage").select2('val',0);	
		$("#qtyPackage").val(1);
		$("#amountPackage").val(0);
		
		/*$('#billDetailsIdOPD').val(0);
		$("#childsubServiceID").val(0);
		$('#subServiceIdOPD').val(0);	
		$('#servIdPackageOPD').val(0);*/	
		
		$('#queryType').val('insert');
		//$('#otherBillDetailsIdIpd').val("");
		
	/*$("#perManualPackage").prop("disabled", true);
		$("#servIdPackage").prop("disabled", true);
		$("#doctorNamePackage").prop("disabled", true);
		$("#ratePackage").prop("disabled", true);
		$("#qtyPackage").prop("disabled", true);
		$("#addServicePackage").prop("disabled", true);*/
	

}

/*******************************************************************************
 * @Kishor
 * @date 5_Aug_2017 
 * @code This method is used to fetch records of Package Services.
 ******************************************************************************/
function getPackagedataforOpd(pSId,pSubSId,billDetailsId,callFrom,amount, concession) {
	
	getSpecialization("reg","splNamePackageOpd");
	
	var totalpack= amount - concession;
	
	var payFlag= $.trim($("#payFlag"+billDetailsId).text());

	if( payFlag == 'Y'){        // added Rohini for  pkg if paid  do not add test in it 14/09/2023
	
		$("#servIdPackage").attr("disabled", true);
	    $('#perManualPackage').attr("readonly",true);
	}else{
  	   $("#servIdPackage").attr("disabled", false);
       $('#perManualPackage').attr("readonly",false);
	}
	
	$('#billDetailsIdOPD').val(billDetailsId);
	$('#subServiceIdOPD').val(pSubSId);
	$('#servIdPackageOPD').val(pSId);
	$('#totalPackageAmount').text(totalpack);
	$('#amountpack').val(amount);
	$('#concessionpack').val(concession);
	
	$('#queryType').val('insert');
	$("#servIdPackage").val(0); 
	$("#perManualPackage").val('');
	$("#childsubServiceID").val(0);
	$("#ratePackage").val(0);
	$("#doctorNamePackage").val(0);
	$("#doctorNamePackage").select2('val',0);	
	$("#qtyPackage").val(1);
	$("#amountPackage").val(0);
	$('#otherBillDetailsIdOpd').val(0);
	$('#callFromforsavebutton').val(callFrom);
	var sponsorId;
	var chargesSlaveId;
	//alert(callFrom);
	
	if(callFrom=="sponsor")	{
		sponsorId = $("#SponsorsourceTypeId").val();
	    chargesSlaveId = $("#chargesSlaveId").val();
		if (sponsorId >= 1 && chargesSlaveId > 0) {

			sponsorId = $("#SponsorsourceTypeId").val();
			chargesSlaveId = $("#chargesSlaveId").val();

		} else {
			sponsorId = 0;
			chargesSlaveId = 0;
		}
	}
	
	if(callFrom=="general"){
		sponsorId = $("#SponsorsourceTypeId").val();
	    chargesSlaveId = $("#chargesSlaveId").val();
		if (sponsorId >= 1 && chargesSlaveId > 0) {

			sponsorId = $("#SponsorsourceTypeId").val();
			chargesSlaveId = $("#chargesSlaveId").val();
	}else {
		sponsorId = 0;
		chargesSlaveId = 0;
	}
	}
	
	var treatmentId=$('#treatmentId').text();
	var patientId=$('#patientId').text();
	

	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"pSId" : pSId,
			"pSubSId" : pSubSId,
			"sponsorId" : sponsorId,
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : "ehat/billNoble/getPackagedataforOpd",*/
		data : {
			"serviceId" : pSId,
			"subServiceId" : pSubSId,			
			"chargesSlaveId" : chargesSlaveId,
			"treatmentId" : treatmentId,
			"patienttId" : patientId,
			"billDetailsId" : billDetailsId
		},
		url : "ehat/opdbill/getPackagedataforOpd",

		error : function() {
			alert('error');
		},
		
		success : function(pSId,pSubSId) {
			$('#amountPackage').attr('readonly', 'true');
			resetAllOpdPackage();
			getSubservicesOfPackageForOpdTemp(pSId,pSubSId,callFrom);
		}
	});
}

/*******************************************************************************
  * @Kishor
 * @date 5_Aug_2017 
 * @code This method is used to Set records of Package Services.
 ******************************************************************************/
function getSubservicesOfPackageForOpdTemp(r,s,callFrom) {
	//var receiptOf=$('#receiptOf').val();
	var totalamt=0;
	var htm = "";
	 htm= '<thead id="popupheader">'
			+'<tr>'
			+ '<th class="col-md-1 center " style="height : 21.5px;"><div class="TextFont">#</th>'
			
			+ '<th class="col-md-3 center" " style="height: 21.5px;"><div class="TextFont">Pack Service</th>'
			+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Doc Name</th>'
			
			+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Rate</th>'
			+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Qty</th>'
			
			
			
			+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Amount</th>'
			+ '<th class="col-md-2 center" " style="height: 21.5px;"><div class="TextFont">Date Slave</th>'
		
			+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Edit</th>'
			+ '<th class="col-md-1 center" " style="height: 21.5px;"><div class="TextFont">Delete</th>'
			
			
			+ '<th class="col-md-1 center" " style="height: 21.5px;"  ><input type="checkbox" onclick="checkAllinpac(this.id)" id="chk"></th>'
			+ '</tr></thead>';
	 
	var index = 0;
	for ( var i = 0; i < r.listOpdPackageDto.length; i++) {
		var dateTime= new Date(r.listOpdPackageDto[i].createdDateTime).toLocaleDateString('en-GB');
		var dname = r.listOpdPackageDto[i].docName;
		var otherBillDetailsId =r.listOpdPackageDto[i].otherBillDetailsId;
		var docId               =r.listOpdPackageDto[i].docId;
		var childServiceId      =r.listOpdPackageDto[i].childServiceId;
		var otheramt            =r.listOpdPackageDto[i].otherAmount;
		var amt                 =r.listOpdPackageDto[i].amount;
		if (dname == null) {
			dname = "-";
		}
		htm = htm
				
		     
		        +"<tbody  id='packtable'> "
				+ "<tr  id='trli"+(index + 1)+"'>" 
				+"<td class='col-md-1-1 center' style='height: 21.5px;'>"
				+ (index+1)
				+ "</td>"
				
				+"<td class='col-md-3-1 center' id='categoryNameOpdPackage"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ r.listOpdPackageDto[i].categoryName
				+ "</td>" 
				+"<td class='col-md-2-1 center' id='docNameOpdPackage"
				+ (index+1)
				+ "' style='height: 21.5px;'>"
				+ dname
				+ "</td>";
				
				if (callFrom =="sponsor") {
					totalamt =totalamt +otheramt;
					htm = htm
					
					+ "<td class='col-md-1-1 center' id='rateOpdPackage"
					+ (index+1)
					+ "' style='height: 21.5px;'>"
					+ (r.listOpdPackageDto[i].otherRate).toFixed(2)
					+ "</td>"
					
					+ "<td class='col-md-1-1 center' id='quantityOpdPackage"
					+ (index+1)
					+ "' style='height: 21.5px;'>"
					+ r.listOpdPackageDto[i].quantity
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='amountOpdPackage"
					+ (index+1)
					+ "' style='height: 21.5px;'>"
					+ (otheramt).toFixed(2)
					+ "</td>";
				}else{
					totalamt =totalamt +amt;
                    htm = htm
					
					+ "<td class='col-md-1-1 center' id='rateOpdPackage"
					+ (index+1)
					+ "' style='height: 21.5px;'>"
					+ (r.listOpdPackageDto[i].rate).toFixed(2)
					+ "</td>"
					
					+ "<td class='col-md-1-1 center' id='quantityOpdPackage"
					+ (index+1)
					+ "' style='height: 21.5px;'>"
					+ r.listOpdPackageDto[i].quantity
					+ "</td>"
					
					+ "<td class='col-md-2-1 center' id='amountOpdPackage"
					+ (index+1)
					+ "' style='height: 21.5px;'>"
					+ (amt).toFixed(2)
					+ "</td>";
				}
				
				htm = htm
				+ "<td class='col-md-2-1 center' id='dateTimeOpdPackage"
				+ otherBillDetailsId
				+ "' style='height: 21.5px;'>"
				+ dateTime
				+ "</td>";
				
				
		if ((r.listOpdPackageDto[i].paidFlag=="Y")) {
					htm = htm	+	'<td class="col-md-1-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success SlaveBtn'+r.listOpdPackageDto[i].billDetailsId+'" onclick="editOnClickForPackageOPD('+r.listOpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listOpdPackageDto[i].billDetailsId+'></i></button></a></td>';
				
					htm = htm	+	'<td class="col-md-1-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger SlaveBtn'+r.listOpdPackageDto[i].billDetailsId+'" onclick="deleteOnClickForPackageOpd('+r.listOpdPackageDto[i].serviceId+','+r.listOpdPackageDto[i].subServiceId+','+r.listOpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listOpdPackageDto[i].billDetailsId+'></i></button></a></td>';
					
				}else{
					
					if (r.listOpdPackageDto[i].cancle =="Y") {
						htm = htm	+	'<td class="col-md-1-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listOpdPackageDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForPackageOPD('+r.listOpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listOpdPackageDto[i].billDetailsId+'></i></button></a></td>';
						htm = htm	+	'<td class="col-md-1-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger deleteUserAccess SlaveBtn'+r.listOpdPackageDto[i].billDetailsId+'" onclick="deleteOnClickForPackageOpd('+r.listOpdPackageDto[i].serviceId+','+r.listOpdPackageDto[i].subServiceId+','+r.listOpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listOpdPackageDto[i].billDetailsId+'></i></button></a></td>';
						
					}else{
						htm = htm	+	'<td class="col-md-1-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+r.listOpdPackageDto[i].billDetailsId+'"  onclick="editOnClickForPackageOPD('+r.listOpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+r.listOpdPackageDto[i].billDetailsId+'></i></button></a></td>';
						htm = htm	+	'<td class="col-md-1-1 center"><a style="cursor:pointer;"> <button  class="btn btn-xs btn-danger deleteUserAccess SlaveBtn'+r.listOpdPackageDto[i].billDetailsId+'" onclick="deleteOnClickForPackageOpd('+r.listOpdPackageDto[i].serviceId+','+r.listOpdPackageDto[i].subServiceId+','+r.listOpdPackageDto[i].billDetailsId+','+otherBillDetailsId+','+ (index + 1) +',\'sponsor\')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+r.listOpdPackageDto[i].billDetailsId+'></i></button></a></td>';
						
					}			
				}	
		
		
		
		htm = htm  +	'<td class="col-md-2-1" class="only-checkbox" >';
		
		if(r.listOpdPackageDto[i].paidFlag=="N"){
			
			htm = htm +	'<input type="checkbox" class="billSlaveChk'+r.listOpdPackageDto[i].serviceId+'" '
			+' id="chkOpdBill'+ otherBillDetailsId +'" '
			+'name="opdBillCheckboxOpd" value="'+ otherBillDetailsId +'">';
			//onclick="convertToBilling('+r.listOpdPackageDto[i].billDetailsId+','+r.listOpdPackageDto[i].serviceId+', '+otherBillDetailsId+')"
		}else{
			
			htm = htm +	'<input type="checkbox" disabled="disabled" value="'+ r.listOpdPackageDto[i].billDetailsId+'"></td>';
			
		}
		
		
		htm = htm 
				
				+ "<input type='hidden' id='otherBillDetailsIdOpdPackage"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].otherBillDetailsId + "'>"

				+ "<input type='hidden' id='chargesIdOpdPackage"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].chargesId + "'>"
				
				+ "<input type='hidden' id='chargesslave_idOpdPackage"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].chargesSlaveId + "'>"
				
				+ "<input type='hidden' id='serviceIdOpdPackage"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].serviceId + "'>"
				
				+ "<input type='hidden' id='childSubServiceIdOpdPackage"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].childSubServiceId + "'>"
	
				+ "<input type='hidden' id='subServicenameOpdPackage"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].categoryName + "'>"
				
				+ "<input type='hidden' id='rate"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].rate + "'>"
				
				+ "<input type='hidden' class='amountOfPack' id='amount"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].amount + "'>"
				
				+ "<input type='hidden' class='quantityOfPack' id='quantity"+ otherBillDetailsId + "' value='"+ r.listOpdPackageDto[i].quantity + "'>"
				
				+ "<input type='hidden' id='docName"+ otherBillDetailsId + "' value='"+ docId + "'>"
				
				+ "<input type='hidden' id='childServiceId"+ otherBillDetailsId + "' value='"+ childServiceId + "'>"
				
				+ "</tr>"
				+"</tbody>"
				;
				
			
		index++;
	}
    
	$("#packageDiv").html(htm);
	
	totalAmountPackage(totalamt,callFrom);
	userAccess();
}

/**
 * @author   :Bilal
 * @date     :8-Aug-2017
 * @code     :for of records of other bill details package billing opd***/
function editOnClickForPackageOPD(billDetailsId, otherBillDetailsId, cmt){
	//getting values of package on input feilds 
	var sunName            =$("#subServicenameOpdPackage"+otherBillDetailsId).val();
	var rate               =$("#rate"+otherBillDetailsId).val();
	var dockId             =$("#docName" +otherBillDetailsId).val();
	var quantity           =$("#quantity" +otherBillDetailsId).val();
	var amount             =$("#amount" +otherBillDetailsId).val();	
	var serviceId          =parseInt($('#serviceIdOpdPackage'+otherBillDetailsId).val());
    var childSubSerID      =parseInt($("#childSubServiceIdOpdPackage"+otherBillDetailsId).val()); 
    var sponsorID          =parseInt($("#chargesIdOpdPackage"+otherBillDetailsId).val());
    var chargesSlaveID     =parseInt($("#chargesslave_idOpdPackage"+otherBillDetailsId).val());
    var childServiceId     =$("#childServiceId"+otherBillDetailsId).val();
   // var otherBillDetailsId =parseInt($("#otherBillDetailsIdOpdPackage"+otherBillDetailsId).val());
    if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	//setting values of package on input feilds 
    
    
    if(serviceId == '11' || serviceId == '12' || serviceId == '13'){  // addeded Rohini
		
		  var treatmentId=$('#treatmentId').text();
			
			cancelLabTestCheckService(treatmentId,billDetailsId); 
			cancelRisTest(billDetailsId,"");
			
			var sndtolabflag	= $("#sndtolabflag"+billDetailsId).text().trim();	    	
		    var sndtoRisflag = $("#sendToRisId"+billDetailsId).text().trim();
			
			if(cancelTestSmplColFlag=="Y" || risReportFlag=="Y" || sndtolabflag=="Y" || sndtoRisflag=="Y"){
				$("#servIdPackage").attr("disabled", true);//	$('#servIdOpdSponsor').attr("readonly",true); // .select('disable');
			    $('#perManualPackage').attr("readonly",true);
			}			
		   
	  }
	
	$("#servIdPackage").val(childServiceId); 
    //$('#servIdPackage option:not(:selected)').prop('disabled', true);
	$("#perManualPackage").val(sunName);
	$("#childsubServiceID").val(childSubSerID);
	$("#ratePackage").val(rate);
	//$("#doctorNamePackage").val(dockId);
	$("#doctorNamePackage").select2('val',dockId);	
	$("#qtyPackage").val(quantity);
	$("#amountPackage").val(amount);
	$('#queryType').val('update');
	$('#otherBillDetailsIdOpd').val(otherBillDetailsId);
	//setting on hidden feilds to access 
	
	
	
	//$("#otherBillDetailsIdOpd").val(otherBillDetailsId);
	$("#SponsorsourceTypeId").val(sponsorID);
	$("#chargesSlaveId").val(chargesSlaveID);
	$('#billDetailsIdOPD').val(billDetailsId);
	
	
	
	
}

/**
 * @author   :Bilal
 * @date     :8-Aug-2017
 * @code     :for calculate particular amount of package ***/
function calculatePackage() {
	var rate = $("#ratePackage").val();
	var qty = $("#qtyPackage").val();
	var amt =$("#amountPackage").val();
	
	amt = qty*rate;
	$("#amountPackage").val(Math.round(amt));
	
}

/**
 * @author   :Bilal
 * @date     :8-Aug-2017
 * @code     :for update records of opd package billing ***/
function savePackageBillingOPD() {

	/*var serviceId = $("#servIdPackage").val();*/
	var serviceId = $("#servIdPackage option:selected").val();
	var iscombination =  $('#iscombination').val();

	var chargesId      = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
	var callfrom       =$('#saveServiceCallFrom').val();
	//var iscombination =$("#iscombination").val();
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	if (serviceId == 1) {
	}/*else if (serviceId == 2) {
	}
*/
	else {

		var queryType = $('#queryType').val();	
		var doctorId = $("#doctorNamePackage option:selected").val();	
		var patienttId     = $("#pId").val();
		var treatmentId    = $("#tId").val();
		var departmentId   = $("#depdocdeskid").val();
		var billId         = parseInt($("#billNo").html());
		var sourceTypeId   = $("#sourceTypeId").val();
		var serviceId      =$("#servIdPackageOPD").val(); 
		
		var childSubServiceId  =$("#childsubServiceID").val();//childSubSerID
		var rate               =$("#ratePackage").val();	
		var quantity           = $("#qtyPackage").val();
		var amount             = $("#amountPackage").val();
		var billDetailsId      =$("#billDetailsIdOPD").val();
		var otherBillDetailsId =$('#otherBillDetailsIdOpd').val();
		var subServiceId       =$('#subServiceIdOPD').val();
		var receiptOf          =$('#callFromforsavebutton').val();
		/*if (chargesId > 0 && chargesSlaveId > 0 && callfrom2 == "sponsor") {
			getcharges();
		}*/
		 var otherRate =rate;
		 var otherAmount=amount;
		 var otherCoPay=0;
		 var otherConcession=0;
		 var otherPay=otherAmount-otherConcession;
		 
		//var subServiceId = $("#chargesfromConf").val();
		var subservicesname = $("#perManualPackage").val();

		//var servicename = $("#servicename").val();
		var unitId = $("#uId").val();
		var childServiceId =$("#servIdPackage").val();
		if (childServiceId == "" || childServiceId == null || childServiceId == undefined || isNaN(childServiceId)) {
			childServiceId = 0;
		}
		
		/*var tempDate = createdDateTime.split("/");
		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);*/

		if (childSubServiceId == "" || childSubServiceId == null
				|| childSubServiceId == undefined || isNaN(childSubServiceId)) {
			subServiceId = 0;
		}

		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}
		if (unitId == 0) {
			unitid = $("#allunitid").val();
		}

		var serviceDetails = {
				listEhatOtherBillDetailForOpd : []
		};
		serviceDetails.listEhatOtherBillDetailForOpd.push({
			
			otherBillDetailsId : otherBillDetailsId,
			patienttId : patienttId,
			billDetailsId : billDetailsId,
			serviceId : serviceId,
			doctorId : doctorId,
			treatmentId : treatmentId,
			departmentId : departmentId,
			billId : billId,
			sourceTypeId : sourceTypeId,
			rate : rate,

			quantity : quantity,
			amount : amount,

			serviceId         : serviceId,
			childSubServiceId : childSubServiceId,
			unitId            : unitId,
			subServiceId      : subServiceId,
			

			chargesId : chargesId,
			chargesSlaveId : chargesSlaveId,

			iscombination : iscombination,
			childServiceId :childServiceId,
			
			otherRate       : otherRate,
			otherAmount     : otherAmount,
			otherCoPay      : otherCoPay,
			otherPay        : otherPay,
			otherConcession : otherConcession,
			receiptOf       : receiptOf

		});

		serviceDetails = JSON.stringify(serviceDetails);
		
		//call for when assign test that time test send to lab immediatly.
		packageOpdSendToLab(serviceDetails,queryType);
		if(smplColFlg=="Y"){
			alertify.error("Package sample are collected.You can not add or edit Test");
			$('#perManualPackage').val("");
			$('#servIdPackage').val("0");
			$('#doctorNamePackage').val("0");
			$("#ratePackage").val("0");
			$("#qtyPackage").val("1");
			$("#amountPackage").val("0");
			$('#saveServiceCallFrom').val("0");
			return false;
		}else if(dupTestFlag=="Y"){
			alertify.error("You can not add Duplicate Test.");
			$('#perManualPackage').val("");
			$('#servIdPackage').val("0");
			$('#doctorNamePackage').val("0");
			$("#ratePackage").val("0");
			$("#qtyPackage").val("1");
			$("#amountPackage").val("0");
			$('#saveServiceCallFrom').val("0");
			return false;
		}

		var inputs = [];

		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);
		inputs.push("callfrom=" + callfrom);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/savePackage",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {

				if (r > 0) {
					if (r == 1) {
						alert("Service assign Sucessfully");
					} else {
						alert("Service Update Sucessfully");
					}
					 
					$('#perManualPackage').val("");
					$('#servIdPackage').val("0");
					//$('#doctorNamePackage').val("0");
					$("#doctorNamePackage").select2('val',0);

					$("#ratePackage").val("0");
					$("#qtyPackage").val("1");
					$("#amountPackage").val("0");

					
					$('#saveServiceCallFrom').val("0");

				}
			}
		});
		
		$("#servIdPackage").val("0"); 
	    
		$("#perManualPackage").val("");
		
		$("#ratePackage").val("");
		$("#doctorNamePackage").val("0");
		$("#doctorNamePackage").select2('val',0);	
		$("#qtyPackage").val("1");
		$("#amountPackage").val("");
		
		$('#queryType').val("insert");
		$('#otherBillDetailsIdOpd').val("0");
		//$('#subserviceid').val("0");
		var callfrom =$('#receiptOf').val();
		var amountpack= $('#amountpack').val();
		var concessionpack=$('#concessionpack').val();
		//var totalPackage=parseFloat($("#totalPackageAmount").text());
		getPackagedataforOpd(serviceId,subServiceId,billDetailsId,callfrom, amountpack,concessionpack);
	}

	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPay").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');
}

/************
 *@author	: Bilal
 *@date		: 8-Aug-2017
 *@code		: autosuggestion
 ***********/
function autoSuggetionPackageOPD(inputID) {
	
	var findingName = $("#" + inputID).val();
	var unit = $("#uId").val();
	//var unitlist=listofunit.slice(1); 
	var unitlist="";
	var depdocdeskid = $("#depdocdeskid").val();
	var querytype="all";
	var serviceid= $("#servIdPackage").val(); 
	if (serviceid == "" || serviceid == null || serviceid == undefined || isNaN(serviceid)) {
		serviceid = 0;
	}
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
	
		success : function(r) {
			 console.log(r);
			autoCompPackageBilling(r,inputID);
			
         
				
		}
	});
}


/************
 *@author	: Bilal
 *@date		: 8-Aug-2017
 *@code		: autosuggestion
 ***********/
function autoCompPackageBilling(response,id) {
	
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
							$(ul).css("z-index", "10000000000");
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '100px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '90px',
					valueField : 'serviceName'
				}],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					
				
						
						$('#perManualPackage').val(ui.item.categoryName);
						$("#childsubServiceID").val(ui.item.categoryid);
						$("#servicename").val(ui.item.serviceName);
						$("#servIdPackage" ).val(ui.item.serviceid);
						$("#ratePackage" ).val(ui.item.categorycharges);
						$("#concession" ).val(ui.item.concession);
						
						var rate     =ui.item.categorycharges;
						var quantity =$("#qtyPackage").val();
						var amount=rate*quantity;
						$("#amountPackage" ).val(amount);
						$("#servIdPackage" ).val(ui.item.serviceid);
						$("#iscombination").val(ui.item.iscombination);
						calculatePackage();
					
						if(ui.item.serviceid == 11){  //Added Rohini Ambhore ris test
							
							getPathologyPreDetails(ui.item.serviceid,ui.item.categoryid);						
						
					    }else if(ui.item.serviceid == 12){  
						
						    var isDuplicate = getInvstigationPreDetails(ui.item.serviceid, ui.item.categoryid);
						     if(isDuplicate > 0){
							      alert("Test/Profile Already Added");
							      clearAllFieldsOfOpd();
							      return false;
						}
					}
						
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
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					
					
					
				}
			});
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 10_Aug_2017 
 * @Code Delete data from Package List For opd 
 ******************************************************************************/

function deleteOnClickForPackageOpd(serviceId,subServiceId,billDetailsId,otherBillDetailsId,index,callfrom ) {
	// deleteModule()
	
	var r = confirm("Are You Sure You Want To Delete This Service?");
	if (r == true) {
		
		//call for delete test in lab on 08-March-2018.
		deleteLabPackageTestOPD(otherBillDetailsId);
		
		if(deleteTestSmplColFlg=="Y"){
			alertify.error("Test Sample are collected,You can't delete this Test.");
			return false;
		}
		if(risReportFlag == "Y"){ // Rohini for ris test of package.
			alertify.error("RIS Test Report Are Generated,You can't delete this Test.");
			return false;
		}
		
		jQuery.ajax({
			type : "POST",
			url : "ehat/billNoble/deleteOnClickForPackageOpd",
			data : {
				"billDetailsId" : billDetailsId,
				"otherBillDetailsId" : otherBillDetailsId,
			},
			timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				var callfrom =$('#receiptOf').val();
				var amountpack= $('#amountpack').val();
				var concessionpack=$('#concessionpack').val();
				
				getPackagedataforOpd(serviceId,subServiceId,billDetailsId,callfrom, amountpack,concessionpack);

			}
		});
	}
}


/**@author Bilal
 * @Date 16_Aug_2017
 * @code For total amount  *** */
function totalAmountPackage(total,callFrom) {

//	var total = 0;
	var totalquantity = 0;
	var cmt = 1;
	
	/*$(".amountOfPack").each(function() {
		
		var charges  = parseFloat($(this).val());
		
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		total = total + charges;
		

	});*/
	
   $(".quantityOfPack").each(function() {
		
		var quantity  = parseFloat($(this).val());
		
		if (quantity == "" || quantity == null || quantity == undefined || isNaN(quantity)) {
			charges = 0;
		}
		totalquantity = totalquantity + quantity;
		

	});
	cmt++;
	
	$("#totalAmtPackage").text(total.toFixed(2));
	$("#totalQtyPackage").text(totalquantity);
	//Math.ceil($("#totalAmtPackage").val()); 
	var totalPackage=parseFloat($("#totalPackageAmount").text());
	
	if(total > totalPackage){
		var totalRemaining =   total - totalPackage;
		
		$("#totalRemainingPack").text(totalRemaining.toFixed(2));
	}else{
		$("#totalRemainingPack").text("0");
	}
}

/**@author   :Bilal
 * @date     :21-Aug-2017
 * @code     :for converting services to Billing **/
function convertToBillingOPD(callfrom, treatmentId) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
	var otherBillDetailsIdOpd = [];
	$('input[name=opdBillCheckboxOpd]:checked').each(function() {

		otherBillDetailsIdOpd.push($(this).val());
	});
	  if (otherBillDetailsIdOpd == 0) {
			alert("please select atleast one service to convert");
			return false;
		}
	var inputs = [];

	inputs.push("treatmentId=" + treatmentId);
	inputs.push("otherBillDetailsIdOpd=" + otherBillDetailsIdOpd);
	inputs.push("sponsorId=" + sponsorId);
	inputs.push("chargesSlaveId=" + chargesSlaveId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/billNoble/convertToBillingOPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			alertify.success(r);
		}
	});
	updateBillMasterTotalForOPD();
	
	$("#pack").modal('hide');
	if (sponsorId > 0 && chargesSlaveId > 0) {
		resetAll('sponsor');
	}else{
		resetAll('general');
	}
	clearAllFieldsOfOpd();

}

//For checking All services
/**@author   :Bilal 
 * @date     :27-sep-2017
 * @code     :For checking all in package billing***/
function checkAllinpac(id){
	
	var checkbox = $('input:checkbox[id='+id+']');
	
	if (checkbox.is(':checked') == true) {
		$('input[name=opdBillCheckboxOpd]').each(function() {
			$(this).prop('checked','checked');
			
		});
	}else{
		$('input[name=opdBillCheckboxOpd]').each(function() {
			$(this).removeAttr('checked','checked');
			
		});
	}
	
}

/*----------------------------Previous Billing of Sponsor--------------------------------*/

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 15_Sept_2017
 * @Code Getting Sponsor Opd Sponsor Bill Data By Service
 ******************************************************************************/
function getPatientSponsorOpdSponsorBillAmount(r,callFrom) {
	//alert("Hii");
	var tFlag = "CT";
	jQuery.ajax({
		async : false,
		type : "POST",
		/*data : {
			"callform" : r
		},
		url : "ehat/billNoble/fetchPatientPreviousBillAmount",*/
		data : {
			"tFlag" : tFlag,
			"treatmentId" : r
		},
		url : "ehat/opdbill/fetchPatientBillAmount",
		success : function(r) {
			
			resetAllOpdPackage();
			setBillDetailsTempForOpdSponsorPreviousBill(r,callFrom);	
			$("#saveBillOpdSponsor").prop("disabled", true); //enable for meesha hospital
			$("#perticularOpdSponsor").prop("disabled", true);
			$("#servIdOpdSponsor").prop("disabled", true);
			$("#specialityIdSponsor").prop("disabled", true);
			$("#doctorName").prop("disabled", true); //enable for meesha hospital
			//$("#doctorNameOpdSponsor").prop("disabled", true); //enable for meesha hospital
			$('#doctorNameOpdSponsor').select2("enable", false) 
			$("#rateOpdSponsor").prop("disabled", true);
			$("#qtyOpdSponsor").prop("disabled", true);
			$("#amountOpdSponsor").prop("disabled", true);
			$("#concessionOpdSponsor").prop("disabled", true);
			$("#payOpdSponsor").prop("disabled", true);
			$("#coPayOpdSponsor").prop("disabled", true);
			$("#concessionOpdSponsorOnPerc").prop("disabled", true);
			
			$("#perManualPackage").prop("disabled", true);
			$("#servIdPackage").prop("disabled", true);
			$("#doctorNamePackage").prop("disabled", true); //enable for meesha hospital
			$("#ratePackage").prop("disabled", true);
			$("#qtyPackage").prop("disabled", true);
			$("#addServicePackage").prop("disabled", true); //enable for meesha hospital
			
			
		}
	});
}

function setBillDetailsTempForOpdSponsorPreviousBill(r,callFrom){
	
	var setBill="";
	var totAmt=0;
	
	var totqyt=1;
	var treatmentId=$('#treatmentId').text();
	var pharmaId=$("#pharmacyInvoice").val();
	for ( var i = 0; i < r.listBillNobleDto.length; i++) {
		
		if(r.listBillNobleDto[i].serviceId==1){
			
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td style="display:none;"><input type="hidden" id="regBillId" value="'+ r.listBillNobleDto[i].billDetailsId +'"> </td>'

			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'			
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center">1</div></td>'
			+ 	'<td>'
			+	'<div class="text-right mainAddedInTotal" id="tamt'+(r.listBillNobleDto[i].serviceId)+'">' + (r.listBillNobleDto[i].otherAmount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center"><a style="cursor:pointer;display:none;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'sponsor\',\'Yes\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';
			
			
			totAmt=totAmt+r.listBillNobleDto[i].otherAmount;
			
			
		}/*else if(r.listBillNobleDto[i].serviceId==2){
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+ r.listBillNobleDto[i].serviceId+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" onclick="getSubServiceDetailsForPreviousBill('+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseOne'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>Doctor Name</th>'
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>';
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setBill=setBill	
				+	'<th>'
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th>'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}else{
				setBill=setBill	
			+	'<th style="display:none;">'
			+	'<div class="text-center">Disc</div>'
			+	'</th>'
			
			+	'<th style="display:none;">'
			+	'<div class="text-center">Disc Per%</div>'
			+	'</th>';
			}
			setBill=setBill	
			+	'<th>'
			+	'<div class="text-right">Co-Pay</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>'
			+	'<th class="only-checkbox">ChB</th>'
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceDataOpdSponsor2">'
		
			//dynamic inner Temp Added
			
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center">' + r.listBillNobleDto[i].serviceCount +'</div></td>'
			+ 	'<td>'
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].otherAmount).toFixed(2) +'</div></td>'
			
			+	'<td  class="text-center"><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'sponsor\',\'Yes\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=totAmt+r.listBillNobleDto[i].otherAmount;
		}*/else if(r.listBillNobleDto[i].serviceId == pharmaId){}
		else{
			
			
			setBill=setBill	
			
			+	'<tr>'
			+	'<td class="only-checkbox" >'// added by vinod
			+	'<input type="checkbox" onclick="setSlaveChk('+(r.listBillNobleDto[i].serviceId)+')" checked=checked id="chkOpdBillReg'+(r.listBillNobleDto[i].serviceId)+'" name="opdBillCheckboxReg" value="'+ r.listBillNobleDto[i].serviceId+'">'
			+	'</td>'// added by vinod
			+	'<td>'
			+	'<div class="text-left">'
			+	'<div class="panel-group" id="accordion">'
			+	'<div class="panel">'
			+	'<div class="panel-heading">'
			+	'<h3 class="panel-title">'
			+	'<a class="accordion-toggle openAllSlave" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo'+i+'" onclick="getSubServiceDetails1ForDataOpdSponsorPreviousBill('+i+','+treatmentId+','+ r.listBillNobleDto[i].serviceId +')">'
			+	'<div class="row">'
			+	'<div class="col-md-10">' + r.listBillNobleDto[i].serviceName +'</div>'			
			+ 	'<div class="col-md-1">'
			+ 	'<i class="fa fa-chevron-down" id="list'+i+'"></i>'
			+	'</div>'
			+	'</div>'
			+	'</a>'
			+	'</h3>'
			+	'</div>'
			+	'<div id="collapseTwo'+i+'" class="panel-collapse collapse">'
			+	'<div class="panel-body">'
			+	'<table class="table table-hover">'
			+	'<thead>'
			+	'<tr>'
			+	'<th class="only-checkbox">#</th>'
			+	'<th>SubService Name</th>'
			
			+	'<th>Doc Name</th>'
			
			+	'<th>'
			+	'<div class="text-center">Rate</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Qty</div>'
			+	'</th>'
			
			+	'<th>'
			+	'<div class="text-center">Amount</div>'
			+	'</th>';
			
			var concessionFlow=$('#concessionFlow').val();			
			
			if(concessionFlow == "on"){
				setBill=setBill					
				
				+	'<th>'
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th>'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}else{
				setBill=setBill					
				
				+	'<th style="display:none;">'
				+	'<div class="text-center">Disc</div>'
				+	'</th>'
				
				+	'<th style="display:none;">'
				+	'<div class="text-center">Disc Per%</div>'
				+	'</th>';
			}
			setBill=setBill	
			+	'<th>'
			+	'<div class="text-center">Pay</div>'
			+	'</th>'
			

			/*+	'<th>'
			+	'<div class="text-center">Co-Pay</div>'
			+	'</th>'*/
			
			
			+	'<th>'
			+	'<div class="text-right">Date</div>'
			+	'</th>'
			+	'<th class="only-checkbox">Edit</th>'
			+	'<th class="only-checkbox">Cancel</th>';
			
			if(r.listBillNobleDto[i].isCombination=='Y')
			{
			setBill=setBill	+ '<th class="only-checkbox">Pkg</th>';
			}
			setBill=setBill	
			
			+	'<th class="only-checkbox">ChB</th>'
			
			+	'</tr>'
			+	'</thead>'
			+	'<tbody id="serviceDataOpdSponsor1'+i+'">'
				  
			//Dynamic Body
			
			+	'</tbody>'
			+	'</table>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</div>'
			+	'</td>'
			+	'<td><div class="text-center"> '+ r.listBillNobleDto[i].serviceCount +'</div></td>'
			+ 	'<td>'// added by vinod
			+	'<div id="tamt'+(r.listBillNobleDto[i].serviceId)+'" class="text-right">' + (r.listBillNobleDto[i].otherAmount).toFixed(2) +'</div></td>'
		
			+	'<td  class="text-center"><a style="cursor:pointer;"> '
            +'<button class="btn btn-xs btn-success editUserAccess" ' 
            +'  onclick=printOpdServiceWise('+treatmentId+',\'sponsor\',\'Yes\','+ r.listBillNobleDto[i].serviceId +') '
            +'value="EDIT"><i class="fa fa-print"  id=btnServWise'+r.listBillNobleDto[i].serviceId+'></i></button></a> </td>'	
			
			
			+	'</tr>';// added by vinod	
			
			totqyt=totqyt+ r.listBillNobleDto[i].serviceCount;
			totAmt=Number(totAmt)+Number((r.listBillNobleDto[i].otherAmount).toFixed(2));
		}
	}
	
	//alert(totqyt);
	//alert(totAmt);
	//alert(callFrom);
	if(callFrom == "cghs"){
		$("#billDetails").html("");
		$("#sponsor").html("");
		//alert("in chgs");
		$("#totalQtty").text(totqyt);
		$("#totalAmmt").text((totAmt).toFixed(2));
		
		$("#cghsBill").html(setBill);
		
		$("#cghsBill").html(setBill);
	}else if(callFrom == "sponsor"){
		//alert("in sponsor");
		//resetAll("sponsor");
		//getPatientBillotherAmountForSponsor(treatmentId);
		$("#billDetails").html("");
		$("#cghs").html("");
		
		//alert("in chgs");
		$("#totalQtys").text(totqyt);
		$("#totalAmts").text((totAmt).toFixed(2));
		
		$("#sponsor").html(setBill);
	}
	else{
		$("#cghsBill").html("");
		$("#sponsor").html("");
		//alert("in general");
		$("#totalQty").text(totqyt);
		$("#totalAmt").text((totAmt).toFixed(2));
		$("#totAmt").text((totAmt).toFixed(2));
		
		$("#billDetails").html(setBill);
	}
}
function getSubServiceDetailsForPreviousBill(t,s){
	//alert("hiiii");
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/billNoble/getPatientServiceBill",
		success : function(r) {
			
			getSubServiceDetailsTempForPreviousBill(r,s);			
		}
	});
}

function getSubServiceDetailsTempForPreviousBill(t,s)
{
	//alert(t.listBillNobleServiceDto.length);
	var setService="";
	//var treatmentId=$('#treatmentId').text();
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		var datetime= new Date(t.listBillNobleServiceDto[i].createdDateTime).toLocaleDateString('en-GB');
		setService=setService
		+	'<tr>'
		
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'

		+ '<td style="display:none;" id="doc'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'

		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
		+	'<td style="display:none;" id="docId'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+ t.listBillNobleServiceDto[i].docId +'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'

		
		+	'<td style="display:none;"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>'
		
		+	'<td> '+ a +' </td>'
		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docName +' </td>';
		
		// added by vinod
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
			+	'</td>';
			
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].charges)+'">'*/
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].otherRate)+'"></td>';
				
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				/*+   '<input type="hidden" class="notInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+Number(t.listBillNobleServiceDto[i].charges)+'">'*/
				+	'</td>';
				/*+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+(t.listBillNobleServiceDto[i].charges)+'"></td>';*/
				
			}		
		}
		// added by vinod
var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
			+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="consPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
		}else{			
		
		setService = setService
		
		+	'<td style="display:none;" id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concession).toFixed(2) +'</div>'
		+	'</td>'
		
		+	'<td style="display:none;" id="consPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
		+	'</td>';
		}
		
		setService = setService  
		
		+	'<td id="pay'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherPay).toFixed(2) +'</div>'
		+	'</td>'
		
		  +	'<td>'
		+	'<div class="text-right">'+ datetime +'</div>'
		+	'</td>';
		setService = setService +	'</td>';
		
			if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			  /*Change for meesha hospital*/
				/*setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
			
					
			}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y") {
				/*setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
			*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				/* Show for meesha hospital*/
				/*setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button  class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
				
					
			}else{
				/*setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'"  disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="editOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				/* Change for meesha*/
		
				/*setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="editSponsorOnClickForDoctor('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button disabled="disabled" class="btn btn-xs btn-danger editUserAcce SlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button><input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"></a></td>';
					
			}			
		}		
		
		
		
		
	/*	if (t.listBillNobleServiceDto[i].cancle =="Y" || (t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
		} else {
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess billSlaveBtn'+t.listBillNobleServiceDto[i].billDetailsId+'" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
		}*/
			
		setService = setService +	'<td class="only-checkbox" >';
		var abc=0;
		if(t.listBillNobleServiceDto[i].paidFlag=="N"){
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+abc+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}else{
			
			setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
			
		}
		
		
		setService = setService +	'</td>';
				
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';		
		
}
	
	$("#serviceDataOpdSponsor2").html(setService);
}

function getSubServiceDetails1ForDataOpdSponsorPreviousBill(i,t,s)
{
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : t,
			"call" : s
		},
		url : "ehat/billNoble/getPatientServiceBill",
		success : function(r) {
			
			getSubServiceDetailsTemp1ForOpdSponsorPrevousBill(i,r,s);	
			userAccess();
		}
	});
}

function getSubServiceDetailsTemp1ForOpdSponsorPrevousBill(j,t,s)
{
	var setService="";
	
	for ( var i = 0; i < t.listBillNobleServiceDto.length; i++) {
		var a=1+i;
		var datetime12= new Date(t.listBillNobleServiceDto[i].createdDate).toLocaleDateString('en-GB');
		var possid = t.listBillNobleServiceDto[i].serviceId;
		var dname= t.listBillNobleServiceDto[i].docName;
		
		var netAmt=Number(t.listBillNobleServiceDto[i].otherAmount)-Number(t.listBillNobleServiceDto[i].concession);
		var cghsCode = "("+t.listBillNobleServiceDto[i].cghsCode+")";
		if(cghsCode == "" || cghsCode == "-" || cghsCode=="()" || cghsCode=="(-)"){
			cghsCode="";
		}
		if(dname==null){
			
			dname="-";
		}
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			setService=setService
			+	'<tr bgcolor="lightblue" id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
		}else{
			setService=setService
			+	'<tr id="tr'+(t.listBillNobleServiceDto[i].billDetailsId)+'">';
		}
		setService=setService
		
		
		+ '<td style="display:none;" id="row'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> class="col-md-1 center">'+(i + 1)+'</td>'
			
		
		+	'<td> '+ a +' </td>'
		+	'<td style="display:none;" id="bdId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].billDetailsId+' </td>';

		if(possid == 14){
			
			setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].invName+cghsCode+' </td>';

		}else{
			
			setService=setService +	'<td id="catName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].categoryName+cghsCode+' </td>';

		}

		setService=setService
		
		+	'<td id="doccName'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ dname+' </td>'
		
		+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].subServiceId+' </td>'
		
		+	'<td style="display:none;" id="isServModify'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isModify+' </td>'
		
		+	'<td style="display:none;" id="dId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].docId+' </td>'
		
		+	'<td style="display:none;" id="sId'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].serviceId+' </td>'
				
		+	'<td style="display:none;" id="amt'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].otherAmount+' </td>'
		
		//added Rohini 
		+	'<td style="display:none;" id="collectionDateOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionDate+' </td>'
		+	'<td style="display:none;" id="collectionTimeOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].collectionTime+' </td>'
		+	'<td style="display:none;" id="isTemplateWiseTestSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].templateWise+' </td>'
		+	'<td style="display:none;" id="isCombinationSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].isCombination+' </td>'
		+	'<td style="display:none;" id="histopathLabOpdSponsor'+(t.listBillNobleServiceDto[i].billDetailsId)+'"> '+ t.listBillNobleServiceDto[i].histopathLab+' </td>';
		
		// added by vinod
		if (t.listBillNobleServiceDto[i].cancle =="Y") {
			
			setService = setService +'<td style="display:none;"> '
			+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].charges).toFixed(2) +'</div>'
			+	'</td>'
			+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].otherRate +'</div>'
			+	'</td>';
		
		}else{
			
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+	'</td>'
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}else{
				
				setService = setService + '<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
				+	'<div class="text-center" id="tAmt'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'+ (t.listBillNobleServiceDto[i].otherRate).toFixed(2) +'</div>'
				+	'</td>';
				+   '<td style="display: none;"><input type="hidden" class="addedInTotal billSlave'+s+'" id="tAmtSlave'+(t.listBillNobleServiceDto[i].billDetailsId)+'" value="'+netAmt+'"></td>';
			}			
			
		}// added by vinod
						
		setService = setService + '<td id="q'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ t.listBillNobleServiceDto[i].quantity +'</div>'
		+	'</td>'
		
		+	'<td id="char'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherAmount).toFixed(2) +'</div>'
		+	'</td>';
		
		var concessionFlow=$('#concessionFlow').val();			
		
		if(concessionFlow == "on"){
			setService = setService
			+	'<td id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td id="conOnPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
		}else{
			setService = setService
			+	'<td style="display:none;" id="con'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherConcession).toFixed(2) +'</div>'
			+	'</td>'
			
			+	'<td style="display:none;" id="conOnPerc'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
			+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].concessionOnPerc).toFixed(2) +'</div>'
			+	'</td>';
			
		}
		setService = setService
		+	'<td id="p'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherPay).toFixed(2) +'</div>'
		+	'</td>'
		
		/*+	'<td id="cP'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-center">'+ (t.listBillNobleServiceDto[i].otherCoPay).toFixed(2) +'</div>'
		+	'</td>'*/
		
		+	'<td id="dateSub'+(t.listBillNobleServiceDto[i].billDetailsId)+'">'
		+	'<div class="text-right" id="dateSubservice">'+ datetime12 +'</div>';
		setService = setService +	'</td>';
		
		if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			
			setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
			/* Change for meesha hospital*/
			
			/*setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
			
		}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y" || t.listBillNobleServiceDto[i].isModify=="N") {
/*				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
*/	
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
	
			}else{
/*				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/
				setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess"  disabled="disabled" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				/* Change for Meesha hospital*/
				
				//setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" onclick="editOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
				/*setService = setService+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success" onclick="editSponsorOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';*/

			}
		}	
				
		if ((t.listBillNobleServiceDto[i].paidFlag=="Y")) {
			
			setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
			
		}else{
			
			if (t.listBillNobleServiceDto[i].cancle =="Y") {
/*				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary editUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';
*/	
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-primary deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-refresh"></i></button></a></td>';

				} else {
/*				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger editUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
*/
				setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <input  value="'+ t.listBillNobleServiceDto[i].cancle +'" id=btnCancle'+t.listBillNobleServiceDto[i].billDetailsId+' type="hidden"><button class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled" onclick="cancleOnClick('+t.listBillNobleServiceDto[i].billDetailsId+')" value="EDIT"><i class="fa fa-times"></i></button></a></td>';
	
				}
		}	
		if(t.listBillNobleServiceDto[i].isCombination=='Y')
		{
		setService = setService +	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#pack"  onclick="getPackagedataforOpd('+t.listBillNobleServiceDto[i].serviceId+','+t.listBillNobleServiceDto[i].subServiceId+','+t.listBillNobleServiceDto[i].billDetailsId+',\'general\','+ t.listBillNobleServiceDto[i].amount +','+ t.listBillNobleServiceDto[i].concession +')" value="EDIT"><i class="fa fa-th-list" value="comb" id=btncomb'+t.listBillNobleServiceDto[i].billDetailsId+'></i></button></a></td>';
		}
				
		setService = setService +	'<td class="only-checkbox" >';
		
		var abc=0;
		if(t.listBillNobleServiceDto[i].paidByCashFlag == "Y"){
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+abc+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}else{
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';			
			}
		}else{
			if(t.listBillNobleServiceDto[i].paidFlag=="N"){
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+','+abc+','+t.listBillNobleServiceDto[i].chargesSlaveId+')" checked="checked" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';
				
			}else{
				
				setService = setService +	'<input type="checkbox" class="billSlaveChk'+t.listBillNobleServiceDto[i].serviceId+'" onclick="setTotalPaidbySlave('+t.listBillNobleServiceDto[i].billDetailsId+')" disabled="disabled" id="chkOpdBill'+(t.listBillNobleServiceDto[i].billDetailsId)+'" name="opdBillCheckbox" value="'+ t.listBillNobleServiceDto[i].billDetailsId+'">';			
			}
		}
		
				
		setService = setService +	'</td>';
		
		setService = setService +	'</tr>';
		setService = setService +	'<tr>';			
	}
	
	$("#serviceDataOpdSponsor1"+j).html(setService);
}
/*-------------------------------Cghs Save---------------------------------------------*/

function saveOpdCghs() {
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
			
	var queryType = $('#queryType').val();		
			
	var patientId     = $("#pId").val();
	var treatmentId    = $("#tId").val();
	var departmentId   = $("#depdocdeskid").val();	
	//alert(departmentId);
	//return false;
	var billId         = parseInt($("#billNo").html());	
	var unitId = $("#uId").val();
	

	var tableRows = $('#cghsBillManual tr').length;

	/*if (tableRows == undefined || tableRows == 0) {
		alert("There is no record to add in CGHS List!");
		return false;
	}*/
	
		
	var cghsDetails = {
			listCghs : []
	};
	
	for(var index=1;index <= tableRows;index++){
		var Service = $("#serM"+index).text();
		var packService = $("#packM"+index).text();
		var packser="";
		if (packService == "" || packService == null) {
			packser = "-";
		} else {
			packser = $("#packM" + index).text();
		}
		var date = $("#dateM"+index).text();
		var rate = $("#rateM"+index).text();
		var qty = $("#qtyM"+index).text();
		var con = $("#conM"+index).text();
		var amount = $("#amt"+index).text();
		var pay = $("#payM"+index).text();
		var coPay = $("#cPayM"+index).text();
		var cghsFlag = 'M';
		
		
		cghsDetails.listCghs.push({
			queryType 		: queryType,
			patientId 		: patientId,
			treatmentId 	: treatmentId,
			departmentId 	: departmentId,
			billId			: billId,
			unitId			: unitId,
			serviceName 	: Service,
			packService     :packser,
			//date 			: date,
			rate 			: rate,
			quantity 		: qty,
			concession 		: con,
			amount 			: amount,
			pay 			: pay,
			coPay 			: coPay,
			cghsFlag 		: cghsFlag
			
			});
	}
	
	
	var tableR = $('#cghsBillManualChangeRemains tr').length;
	

	/*if (tableR == undefined || tableR == 0) {
		alert("There is no record to add in CGHS List!");
		return false;
	}*/
	
		
	var cghsDetailsRemain = {
			listCghsRemain : []
	};
	
	for(var i=1;i <= tableR;i++){
		var Service = $("#serR"+i).text();
		var date = $("#dateR"+i).text();
		//var rate = $("#rateM"+i).text();
		var amount = $("#amtR"+i).text();
		var pay = $("#payR"+i).text();
		
		var cghsFlagg = 'R';
		
		
		cghsDetailsRemain.listCghsRemain.push({
			queryType 		: queryType,
			patientId 		: patientId,
			treatmentId 	: treatmentId,
			departmentId 	: departmentId,
			billId			: billId,
			unitId			: unitId,
			serviceName 	: Service,
			//date 			: date,
			amount 			: amount,
			//qty 			: qty,
			//con 			: con,
			//amount 			: amount,
			pay 			: pay,
			//coPay 			: coPay,
			cghsFlag 		: cghsFlagg
			
			});
	}
	cghsDetailsRemain = JSON.stringify(cghsDetailsRemain);
	cghsDetails = JSON.stringify(cghsDetails);
	
	if(cghsDetailsRemain == null || cghsDetailsRemain == undefined){
		alert("Fill Records!!!");
		return false;
	}
	
	if(cghsDetails == null || cghsDetails == undefined){
		alert("No Records!!!");
		return false;
	}
	//alert(cghsDetails);
	//return false;
	var inputs = [];
	
	//inputs.push('action=CghsfetchReports');
	inputs.push('treatmentId=' + treatmentId);	
	inputs.push('departmentId=' + departmentId);
	
	inputs.push("cghsDetails="+ encodeURIComponent(cghsDetails));
	inputs.push("cghsDetailsRemain="+ encodeURIComponent(cghsDetailsRemain));
	inputs.push("queryType=" + queryType);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveIpdCghs",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r);
			alertify.success("Saved succesfully");
			//proFeesDoctorPayment();
			getOpdServiceDetailsForCghs(treatmentId, departmentId);
		}
	});

}


function getOpdServiceDetailsForCghs(t, d) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform2" : t,
			"call2" : d
		},
		url : "ehat/ipdbill/getIpdServiceDetailsForCghs",
		success : function(r) {
			// setTempPatientRecords(r);
			// alert(t);
			getOpdServiceDetailsForCghsTemp(r, d);
			//getOpdServiceDetailsForCghsTempR(r, d);
			// setBillDetailsTemp(r);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}
function getOpdServiceDetailsForCghsTemp(t, s) {

	var preBill=$("#preId").val(); 
	var setService = "";
	var setService1 = "";
var remainAmt=0;
var counter1=0;
var counter=0;
	for ( var i = 0; i < t.listCghs.length; i++) {
		
		var datetime12 = new Date(t.listCghs[i].createdDateTime)
				.toLocaleDateString('en-GB');
		var flag = t.listCghs[i].cghsFlag;
		remainAmt =Number(remainAmt) + Number(t.listCghs[i].amount);
		if(flag == 'M'){
			counter1 ++;
			
			setService = setService

			+ '<tr id="tr' + counter1 + '">'
					+ '<td style="display:none;" id="row'
					+ counter1
					+ '"> class="col-md-1 center">' + counter1 + '</td>'
				
					+ '<td style="display:none;" id="amtt'
					+ counter1 + '"> '
					+ t.listCghs[i].amount + ' </td>'
					
					
					+ '<td id="sN'
					+ counter1 + '">'
					+ '<div class="text-center">'+ counter1 + '</div>' + '</td>'
					
					+ '<td id="serM'
					+ counter1 + '">'
					+ '<div class="text-center">'
					+ t.listCghs[i].serviceName + '</div>' + '</td>'
					
					+ '<td id="packM'
					+ counter1 + '">'
					+ '<div class="text-center">'
					+ t.listCghs[i].packService + '</div>' + '</td>'
					
					+ '<td id="dateM' + counter1
					+ '">' + '<div class="text-center" id="dateSubservice">'
					+ datetime12 + '</div>' + '</td>'
					
					+ '<td id="rateM'
					+ counter1 + '">'
					+ '<div class="text-center">'
					+ t.listCghs[i].rate + '</div>' + '</td>'
					
					+ '<td id="qtyM'
					+ counter1 + '">'
					+ '<div class="text-center">'
					+ t.listCghs[i].quantity + '</div>' + '</td>'

					+ '<td id="conM' + counter1
					+ '">' + '<div class="text-center">'
					+ (t.listCghs[i].concession).toFixed(2) + '</div>' + '</td>'			
					

					+ '<td id="amt' + counter1
					+ '">' + '<div class="text-center">'
					+ (t.listCghs[i].amount).toFixed(2) + '</div>' + '</td>'

					+ '<td id="payM' + counter1
					+ '">' + '<div class="text-center">'
					+ (t.listCghs[i].pay).toFixed(2) + '</div>' + '</td>'

					+ '<td id="cPayM' + counter1
					+ '">' + '<div class="text-center">'
					+ (t.listCghs[i].coPay).toFixed(2) + '</div>' + '</td>';
			
			if(preBill=="treatclose")
			{				
			setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  disabled="disabled" onclick="editOnClickForCghsOPD('+ counter1 +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';
			setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" disabled="disabled" onclick="deleteOnClickForCghsOpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
			}
			else
			{
				setService = setService	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  onclick="editOnClickForCghsOPD('+ counter1 +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';
				setService = setService	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" onclick="deleteOnClickForCghsOpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
			}
			
			setService = setService + '</tr>';
		}
		
		else if(flag == 'R'){
			counter ++;
			setService1 = setService1

			+ '<tr id="tr' + counter + '">'
					+ '<td style="display:none;" id="row'
					+ (t.listCghs[i].cghsId)
					+ '"> class="col-md-1 center">' + counter + '</td>'
				
					+ '<td style="display:none;" id="amt'
					+ counter + '"> '
					+ t.listCghs[i].amount + ' </td>'
					
					+ '<td style="display:none;" id="dept'
					+ counter + '"> '
					+ t.listCghs[i].departmentId + ' </td>'
					
					+ '<td style="display:none;" id="cghsid'
					+ counter + '"> '
					+ t.listCghs[i].cghsId + ' </td>'

					+ '<td id="sN'
					+ counter + '">'
					+ '<div class="text-center">'+ counter + '</div>' + '</td>'
					
					+ '<td id="serR'
					+ counter + '">'
					+ '<div class="text-center">'
					+ t.listCghs[i].serviceName + '</div>' + '</td>'
					
					+ '<td id="dateR' + counter
					+ '">' + '<div class="text-center" id="dateSubservice">'
					+ datetime12 + '</div>' + '</td>'
				
					+ '<td id="amtR' + counter
					+ '">' + '<div class="text-center">'
					+ (t.listCghs[i].amount).toFixed(2) + '</div>' + '</td>'

					+ '<td id="payR' + counter
					+ '">' + '<div class="text-center">'
					+ (t.listCghs[i].pay).toFixed(2) + '</div>' + '</td>';
			if(preBill=="treatclose")
			{
				setService1 = setService1	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  disabled="disabled" onclick="editOnClickForCghsOPDRemain('+ counter +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';
				setService1 = setService1	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" disabled="disabled" onclick="deleteOnClickForCghsOpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
			}else
				{
				setService1 = setService1	+	'<td class="col-md-1 center" ><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAccess billSlaveBtn'+t.listCghs[i].cghsId+'"  onclick="editOnClickForCghsOPDRemain('+ counter +')" value="EDIT"><i class="fa fa-edit" value="EDIT" id=btnEdit1'+t.listCghs[i].cghsId+'></i></button></a></td>';
				setService1 = setService1	+	'<td class="col-md-1 center"><a style="cursor:pointer;"> <button class="btn btn-xs btn-success editUserAcce SlaveBtn'+t.listCghs[i].cghsId+'" onclick="deleteOnClickForCghsOpd('+ t.listCghs[i].amount +','+ t.listCghs[i].cghsId +','+ t.listCghs[i].departmentId +')" value="DELETE"><i class="fa fa-trash-o" value="DELETE" id=btnDelete1'+t.listCghs[i].cghsId+'></i></button></a></td>';
				}
				
			
			setService1 = setService1 + '<td class="only-checkbox" >';
			setService1 = setService1 + '</td>';
			setService1 = setService1 + '</tr>';
		}		

	}
	var a = $('#totalAmt').text();
	var c=Number(a)-Number(remainAmt.toFixed(2));
	$("#totalManualRemains").val(c);
	$('#totalManualRemains').attr('readonly', 'true');
	$("#cghsBillManual").html(setService);
	$("#cghsBillManualChangeRemains").html(setService1);

}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_Oct_2017 
 * @Code Delete data from Cghs List For Ipd 
 ******************************************************************************/

function deleteOnClickForCghsOpd(amt,cghsid,depid) {
	
	
	
	var r = confirm("Are You Sure You Want To Delete This Service?");
	if (r == true) {
		var treatmentId    = $("#tId").val();
		//var departmentId   = $("#depdocdeskid").text();		
		var tAmtRemain = $('#totalManualRemains').val();
		
		var deleteAmt = amt;
		var setAmt=Number(tAmtRemain)+Number(deleteAmt);
		jQuery.ajax({
			type : "POST",
			url : "ehat/ipdbill/deleteOnClickForCghsIpd",
			data : {
				"cghsid" : cghsid,
				"depid" : depid,
			},
			timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				//refreshUnitMaster();
				//alert(response);
				alertify.error("Deleted succesfully");
				$('#totalManualRemains').val(setAmt);
				$('#totalManualRemains').attr('readonly', 'true');
				//$("#opdCghsTableM").empty();
				 getOpdServiceDetailsForCghs(treatmentId, depid);
					//resetAllPopUpData();
				
			}
		});
	}
}


//tk

function deleteCghs2(id){
	var len = $("#cghsBillManual tr").length;
	var htm ="";
	$("#tkb").empty();
	for(var i =1; i<=len;i++){
		var serM = $("#serM"+i).text();
		var packM = $("#packM"+i).text();
		var dateM  = $("#dateM"+i).text() ;
		var rateM  = $("#rateM"+i).text();
		var qtyM = $("#qtyM"+i).text();
		var conM = $("#conM"+i).text();
		var amt = $("#amt"+i).text();
		var payM = $("#payM"+i).text();
		var cPayM = $("#cPayM"+i).text();
		
		
		if(i!=id){
			var index = $("#tkb tr").length;
			index++;
			$("#tkb").append(
			'<tr class="cghsclassM" id="cghsId'
			+ index
			+ '"><td class="col-md-1 center" id="inM'+ index + '">'
			+ index 
			+ '</td> <td class="col-md-1 center" id="serM'+ index + '">'
			+ serM
			+ '</td> <td class="col-md-1 center" id="packM'+ index + '">'
			+ packM
			+ '</td> <td class="col-md-1 center" id="dateM'+ index + '">'
			+ dateM
			+ '</td> <td class="col-md-1 center" id="rateM'+ index + '">'
			+ rateM
			+ '</td> <td class="col-md-1 center" id="qtyM'+ index + '">'
			+ qtyM
			+ '</td> <td class="col-md-1 center" id="conM'+ index + '">'
			+ conM
			+ '</td> <td class="col-md-1 center" id="amt'+ index + '">'
			+ amt
			+ '</td> <td class="col-md-1 center" id="payM'+ index + '">'
			+ payM
			+ '</td> <td class="col-md-1 center" id="cPayM'+ index + '">'
			+ cPayM
			+ '</td> <td class="col-md-1 center"><i aria-hidden="true" onclick="deleteCghs2('
			+ index
			+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
			);
			//$("#tkb").append(htm2);

		}
		
	}
	
	var compAmt=$("#amt"+id).html();
	//alert(compAmt);
	var totAmt=$("#totalManualRemains").val();
	//alert(totAmt);
	var totAmttt=Number(totAmt)+Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsId"+id).remove();
	var set1 = $("#tkb").html();
	$("#cghsBillManual").empty();
	$("#cghsBillManual").html(set1);
}


function deleteManualCghs2(id){
	var len = $("#cghsBillManualChangeRemains tr").length;
	var htm ="";
	$("#tkbR").empty();
	for(var i =1; i<=len;i++){
		var serM = $("#serR"+i).text();
		var dateM  = $("#dateR"+i).text() ;
		//var rateM  = $("#rateM"+i).text();
		//var qtyM = $("#qtyM"+i).text();
		//var conM = $("#conM"+i).text();
		var amt = $("#amtR"+i).text();
		var payM = $("#payR"+i).text();
		//var cPayM = $("#cPayM"+i).text();
		
		
		if(i!=id){
			var index = $("#tkbR tr").length;
			index++;
			$("#tkbR").append(
			'<tr class="cghsclassR" id="cghsId'
			+ index
			+ '"><td class="col-md-1 center" id="inR'+ index + '">'
			+ index 
			+ '</td> <td class="col-md-1 center" id="serR'+ index + '">'
			+ serM
			+ '</td> <td class="col-md-1 center" id="dateR'+ index + '">'
			+ dateM
			+ '</td><td class="col-md-1 center" id="amtR'+ index + '">'
			+ amt
			+ '</td> <td class="col-md-1 center" id="payR'+ index + '">'
			+ payM
			+ '</td>  <td class="col-md-1 center"><i aria-hidden="true" onclick="deleteManualCghs2('
			+ index
			+ ')"  style="margin-left;cursor: pointer;" class="fa fa-trash-o fa-1x"></i> </td></tr>'
			);
			//$("#tkb").append(htm2);

		}
		
	}
	
	var compAmt=$("#amtR"+id).html();
	//alert(compAmt);
	var totAmt=$("#totalManualRemains").val();
	//alert(totAmt);
	var totAmttt=Number(totAmt)+Number(compAmt);
	$("#totalManualRemains").val(totAmttt);
	$("#cghsIdR"+id).remove();
	var set1 = $("#tkbR").html();
	$("#cghsBillManualChangeRemains").empty();
	$("#cghsBillManualChangeRemains").html(set1);
}


function editOnClickForCghsOPD(counter)
{	
	var editTotal=0;	
	var totalAmount = parseFloat($("#totalAmmt").text());	
	var tableRows = $('#cghsBillManual tr').length;
	
	for(var index=1;index <= tableRows;index++){
		
		var amount = parseFloat($("#amt"+index).text());		
		editTotal=Number(editTotal)+Number(amount);
	}
	
	var tableR = $('#cghsBillManualChangeRemains tr').length;	
	for(var index=1;index <= tableR;index++){
		
		var amount = parseFloat($("#amtR"+index).text());		
		editTotal=Number(editTotal)+Number(amount);
	}	
	//alert(editTotal);
	$('#editHidden').val(counter);
	$('#perManual').val($('#serM'+counter).text());
	$('#packManual').val($('#packM'+counter).text());
	$('#rateManual').val($('#rateM'+counter).text());	
	$('#qtyManual').val($('#qtyM'+counter).text());	
	$('#concessionManual').val($('#conM'+counter).text());	
	$('#amountManual').val($('#amt'+counter).text());
	$('#payManual').val($('#payM'+counter).text());	
	$('#coPayManual').val($('#cPayM'+counter).text());
	
	//var amtRemain= parseFloat($('#totalManualRemains').val());
	var amountadd=parseFloat($('#amt'+counter).text());
	
	var x=((totalAmount- editTotal) + amountadd).toFixed(2);
	//alert(x);
	//var x=amtRemain+amountadd;
	$("#totalManualRemains").val(x);
	$('#totalManualRemains').attr('readonly', 'true');
	
}

function editOnClickForCghsOPDRemain(counter)
{
	var editTotal=0;	
	var totalAmount = parseFloat($("#totalAmmt").text());	
	var tableRows = $('#cghsBillManual tr').length;
	
			for(var index=1;index <= tableRows;index++)
			{		
				var amount = parseFloat($("#amt"+index).text());		
				editTotal=Number(editTotal)+Number(amount);
			}
	
	var tableR = $('#cghsBillManualChangeRemains tr').length;	
			for(var index=1;index <= tableR;index++)
			{		
				var amount = parseFloat($("#amtR"+index).text());		
				editTotal=Number(editTotal)+Number(amount);
			}
	
	$('#editHiddenR').val(counter);
	$('#SerManualRemains').val($('#serR'+counter).text());	
	$('#amountManualRemains').val($('#amtR'+counter).text());
	$('#payManualRemains').val($('#payR'+counter).text());	
	var amountadd=parseFloat($('#amtR'+counter).text());
	
	var x=((totalAmount- editTotal) + amountadd).toFixed(2);
	$("#totalManualRemains").val(x);
	$('#totalManualRemains').attr('readonly', 'true');
	
}
// 
/*function OpdPreviousRefundedAmountPrintttt()
{
	var treatmentId=$('#treatmentId').text();
	//var treatclose="treatclose";
    window.location = "OpdRefundedAmountPrint.jsp?" + "treatmentId=" + treatmentId;
    
}*/

/*******************************************************************************
 * @Kishor
 * @date 28_Oct_2017 
 * @code This function use for send to Previous Refunded Amountprint jsp.
 ******************************************************************************/ 
function OpdPreviousRefundedAmountPrintttt()
{
		
		var patID = $("#patientId").text();
		var treatID = $("#treatmentId").text();
		var billId		= $("#billNo").text(); ;
		var receiptOf= $("#receiptOf").val();	
		var userId = parseInt($("#userId").val());
		var receiptEditSponsor = $("#receiptEditSponsor").val();
		
		
		window.open("OpdRefundedAmountPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
			"&treatID=" + encodeURIComponent(treatID)+
			"&billId=" + encodeURIComponent(billId) +
			"&receiptOf=" + encodeURIComponent(receiptOf) +
			"&userId=" + encodeURIComponent(userId)+
			"&receiptEditSponsor=" + encodeURIComponent(receiptEditSponsor));
	
	
}


function cghsOpdPrint()
{	
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();
	//var receiptOf= $("#receiptOf").val();	
	//var userId = parseInt($("#userId").val());
	//var receiptEditSponsor = $("#receiptEditSponsor").val();
	
	
	window.open("opdCghsPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
		"&treatID=" + encodeURIComponent(treatID)+
		"&billId=" + encodeURIComponent(billId)+
		"&departmentId=" + encodeURIComponent(departmentId));
	
	}

function cghsRemainOpdPrint()
{
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();
	//var receiptOf= $("#receiptOf").val();	
	//var userId = parseInt($("#userId").val());
	//var receiptEditSponsor = $("#receiptEditSponsor").val();
	
	
	window.open("opdCghsRemainPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
		"&treatID=" + encodeURIComponent(treatID)+
		"&billId=" + encodeURIComponent(billId)+
		"&departmentId=" + encodeURIComponent(departmentId));
	
	}

function PrintDiffOpdCghsAmount()
{
	var totalManualRemains = $('#totalManualRemains').val();
	if(totalManualRemains > 0)
		{
		alert("Remain Amount should be 0");
		return false;			
		}
	var patID = $("#patientId").text();
	var treatID = $("#treatmentId").text();
	var billId		= $("#billNo").text();
	var departmentId   = $("#depdocdeskid").val();

	
	window.open("opdCghsDiffAmountPrint.jsp?"+"patID=" +encodeURIComponent(patID) + 
		"&treatID=" + encodeURIComponent(treatID)+
		"&billId=" + encodeURIComponent(billId)+
		"&departmentId=" + encodeURIComponent(departmentId));
	
}

function clearAllFieldsOfOpd(){
	// Opd fields
	$('#perticular').val("");
	$('#servId').select2('val',0);
	$('#specialityId').select2('val',0);
	$('#doctorName').select2('val',0);
	$("#rate").val("0");
	$("#qty").val("1");
	$("#concession").val("0");
	$("#amount").val("0");
	$("#pay").val("0");
	$("#coPay").val("0");
	//$("#servId").val("0");
	$('#saveServiceCallFrom').val("0");
	$("#concessionOnPerc").val(0);
	$('#queryType').val("insert");
	$('#billDetailsId').val("0");
	$('#subserviceid').val("0");	
	$("#perticular").removeAttr('readonly');
	$("#pay").removeAttr('readonly');
	$("#coPayr").removeAttr('readonly');
	$("#concession").removeAttr('readonly');
	$("#qty").removeAttr('readonly');	
	$("#narrationBill").val('notnarrationBill');
	$("#narrationidBill").val('');
	$('#queryType').val("insert");
	$('#saveServiceCallFrom').val("0");
	// Ipd Fields
	
	$("#perticularOpdSponsor").val("");	
	$('#servIdOpdSponsor').select2('val',0);
	$('#specialityIdSponsor').select2('val',0);
	$('#doctorNameOpdSponsor').select2('val',0);
	$("#payOpdSponsor").val('0');
	$("#coPayOpdSponsor").val('0');
	$("#concessionOpdSponsor").val('0');
	$("#rateOpdSponsor").val('0');
	$("#amountOpdSponsor").val('0');
	$("#qtyOpdSponsor").val('1');
	$("#perticularOpdSponsor").removeAttr('readonly');
	$("#payOpdSponsor").removeAttr('readonly');
	$("#coPayOpdSponsor").removeAttr('readonly');
	$("#concessionOpdSponsor").removeAttr('readonly');
	$("#qtyOpdSponsor").removeAttr('readonly');	
	$("#sndtolabflag").val('N');
	$('#remarkcanceltest').val('');
	$('#idremarkcanceltest').val('0');
	
	$('#remarkdeletereceipt').val('');
	$('#idremarkdeletereceipt').val('0')
	$('#recId').val('0');
	
}


/*******
 * @author    :BILAL
 * @Date      :1-11-2017
 * @Code      :For Narration pop up on billing after edit from receipt
 * ******/
function setnarationpopupBill(){
	
	$("#modal-15").addClass("md-show");
}

function closePopupnarrationBill(){
	$("#modal-15").removeClass("md-show");
}

function setNarrationBill(){

	var receiptEditSponsor  = $("#receiptEditSponsor").val(); 	
	var narrationidBill =$('#narrationidBill').val();
	
    if (narrationidBill == "" || narrationidBill == null || narrationidBill == undefined) {
		$("#narrationidBill").focus();		
		return false;
	}
    
   /* var deletenarration =$('narration').val();
    if (deletenarration == "deletemaster") {
		
	}*/
    
    $("#narrationBill").val('notnarrationBill');
	if (receiptEditSponsor == "sponsor") {
		saveServiceToSponsorPatient('saveBillOpdSponsor');
	}else{
		saveServiceToPatient('general');
	}
	
	
}


function printOpdServiceWise(treatId,callfrom,Prev,servId)
{

	var patID = $("#patientId").text();
	var deptId   = $("#depdocdeskid").val();
	
	
	
	window.open("opdServiceWisePrint.jsp?servId=" +encodeURIComponent(servId)
			+ "&treatId=" + encodeURIComponent(treatId)
			+ "&callfrom=" + encodeURIComponent(callfrom)
			+ "&Prev=" + encodeURIComponent(Prev)
			+ "&patID=" + encodeURIComponent(patID)
			+ "&deptId=" + encodeURIComponent(deptId));
	
}
/*******
 * @author    :BILAL
 * @Date      :07-02-2018
 * @Code      :For getting year wsie charges  
 * ********/
function getyearwisecharges(suserviceId){
	var yearwisecharges=0;
	if (suserviceId == "" || suserviceId == null || suserviceId == undefined
			|| isNaN(suserviceId)) {
		suserviceId = 0;
	}
	

	var inputs = [];

	inputs.push('subserviceid=' + suserviceId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getyearwisecharges",

		success : function(res) {
			
			yearwisecharges= res;
			
		}
	});
	return yearwisecharges;
}

function uploadDocumentOpd() {  
	var doc = $("#ifile").val();
	var note = $("#iNotes").val();

	if (doc == "" || doc == undefined) {
		alert("Please select file");
		$('#fileUploadfrm').attr('onsubmit', 'return false;');
	} else {
		alert("File uploaded");
		$('#fileUploadfrm').attr('onsubmit', 'return true;');
	}
}



/* End Uploadfile Code */

/*function uploadDocFromBill() {
	var pid = $("#patientId").text();
	var tid = $("#treatmentId").text();
	var inputs = [];
//	inputs.push('action=UploadDoctordeskServlet');
	inputs.push('PiD='+pid);
	inputs.push('TRTiD='+tid);
	inputs.push('txtNotes='+"bill");
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		enctype : "multipart/form-data",
		contentType: false,
		processData: false,
		method: "POST",
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "UploadDoctordeskServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function(r) {
			alert("error");
			console.log(r);
		},
		success : function(r) {
			//$("#txtVoucharNumber").val(r);
		}
	});
}*/
/************
 * @author	: Laxman Nikam
 * @date	: 13-April-2018
 * @codeFor	: For when assign test that time test send to lab immediatly.
  ************/
 function packageOpdSendToLab(serviceDetails,queryType){
	 var inputs = [];

		// patient details push
		inputs.push("serviceDetails=" + encodeURIComponent(serviceDetails));
		inputs.push("queryType=" + queryType);

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/packageOpdSendToLab",

			error : function() {
				alertify.error('Network Issue!!!');
			},
			success : function(r) {
				if(r=="0")
				{
					smplColFlg="Y";
					dupTestFlag="N";
					return false;
				}
				else if(r=="-1")
				{
					alertify.error("Network error...!");
					return false;
				}else if(r=="1")
				{
					smplColFlg="N";
					dupTestFlag="N";
				}else if(r=="2")
				{
					dupTestFlag="Y";
					smplColFlg="N";
				}

			}
		});
 }

 /************
  * @author	: Laxman Nikam
  * @date	: 14-March-2018
  * @codeFor	: if Test inside package delete from bill,also delete from lab.
   ************/
  function deleteLabPackageTestOPD(otherBillDetailsId){
  	
	  var deptId=1;
  	jQuery.ajax({
  		async : false,
  		type 	: "POST",
  		url 	: "ehat/doctordesk/deleteLabPackageTest",
  		data	: {
  			
  		  "otherBillDetailsId" : otherBillDetailsId,
  		  "deptId" : deptId,
  			
  		},
  		timeout : 1000 * 60 * 5,
  		cache 	: false,
  	
  		success : function(r) {
  			
  			if(r=="0")
  			{
  				//deleteTestSmplColFlg="Y";
  				//return false;
  				
  				deleteTestSmplColFlg="N";
  			}
  			else if(r=="-1")
  			{
  				alert("Network error...!");
  				return false;
  			}else if(r=="1")
  			{
  				deleteTestSmplColFlg="N";
  			}
  			else if(r == "3")   // added by Rohini Ambhore
  			{
  				alert('Accession Done!!! Test cannot be Cancel or delete....');
  				deleteTestSmplColFlg="Y";
  				return false;
  			}
  			else if(r == "8"){ // added by Rohini Ambhore for ris test delete of package
  				risReportFlag = 'N';
  			}
  		}
  		
  	});
  }
  

  //Added by Kishor for multiple sponsor
  
  function getSponsorSanctionAmountForOpd(){
 	var SponsorsourceTypeId = $('#SponsorsourceTypeId').val();
 	var chargesSlaveId = $('#chargesSlaveId').val();
 	 var treatmentId=$('#treatmentId').text();
 	var patientId=$('#patientId').text();
 	//alert(treatmentId +"  "+patientId);
 	
 	if(SponsorsourceTypeId > 0 && chargesSlaveId > 0){
 		
 		jQuery.ajax({
 	 		async : false,
 	 		type 	: "POST",
 	 		url		: "ehat/ipdbill/getSponsorSanctionAmount",
 			 		data : {
 			 	"callfrom" : "opd",
 				"patientId" : patientId,
 				"treatmentId" : treatmentId,
 				"SponsorId" : SponsorsourceTypeId,
 				"chargesSlaveId" : chargesSlaveId
 			},
 	 		cache 	: false,
 	 		success : function(r) {
 	 			//alert(r.listMultipleSponsor[0].sanctionAmt);
 	 			var sanctionAmt = Number(r.listMultipleSponsor[0].sanctionAmt);
 	 			var balanceAmount = Number(r.listMultipleSponsor[0].remSanctionAmt);
 	 			var utilisedAmount = (sanctionAmt - balanceAmount).toFixed(2);
 	 			
 	 			$('#sanctionAmount').text(sanctionAmt.toFixed(2));
 	 			$('#utilisedAmount').text(utilisedAmount);
 	 			$('#balanceAmount').text(balanceAmount.toFixed(2));
 	 			
 	 		}
 	 		
 	 	});
 		
 	}
 	
  }
  

  //This function use for set Sponsor Rate To Self Patient @Kishor
  function setSponsorRateToSelfPatientOPD(){
 	 var r = confirm("Are You Sure You Want To Convert Sponsor Rate?");
 		if (r == true) {
 		var labservicelist = [];
 		var labservicelist1 = [];
 		var servicelist2 = [];
 		var treatmentId = $('#treatId').val();
 		var patientId = parseInt($("#patientId").text());
 		var sponsorId = $("#SponsorsourceTypeId").val();
 		var chargesSlaveId = $("#chargesSlaveId").val();
 		
 		
 		$('input[name=opdBillCheckbox]:checked').each(function() {

 			labservicelist.push(parseInt($(this).val()));
 			var a=parseInt($(this).val());
 			labservicelist1.push(parseInt($("#subserviceid"+a).text()));
 			servicelist2.push(parseInt($("#sId"+a).text()));
 		});

 		/*if (labservicelist.length == 0) {
 			alert("Please check at least One Service to Convert to Sponsor Or Open all Services.");
 			return false;

 		}*/		
 		
 		// note: jQuery's filter params are opposite of javascript's native implementation :(
 		var unique = $.makeArray($(servicelist2).filter(function(i,itm){ 
 		    // note: 'index', not 'indexOf'
 		    return i == $(servicelist2).index(itm);
 		}));
 		
 		var callFrom = "";
 		var deptId = $("#deptId").val();
 		
 		if(deptId == 3){
 			callFrom = "DIAG";
 		}else{
 			callFrom = "OPD";
 		}
 		
 		//alert(labservicelist1);
 		var inputs = [];
 		inputs.push("labservicelist=" + encodeURIComponent(labservicelist1));
 		inputs.push("servicelist=" + encodeURIComponent(unique));
 		inputs.push('treatmentId=' + treatmentId);
 		inputs.push('patientId=' + patientId);
 		inputs.push('sponsorId=' + sponsorId);
 		inputs.push('chargesSlaveId=' + chargesSlaveId);
 		inputs.push('callFrom=' + callFrom);
 		var str = inputs.join('&');
 		jQuery.ajax({
 			async : false,
 			type : "POST",
 			url : "ehat/ipdbill/setSponsorRateToSelfPatient",
 			data : str + "&reqType=AJAX",
 			timeout : 1000 * 60 * 5,
 			cache : false,

 			success : function(r) {

 				// fetchbilldetails();
 				//getPatientBillAmountIpd(treatId);
 				alert(r);
 				window.location.reload(true);
 			}

 		});
 		}
 }