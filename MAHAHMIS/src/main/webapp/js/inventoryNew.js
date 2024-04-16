function getDispachlist()
{
	var callfrom="";
	var callPartyName=0;
	
	var partyId=$('#partyId').val();
	var letter=$("#byName").val();
	
	
	if($('#allId').is(':checked')){ 
		callfrom="allId";		  
		}
	
	else if($('#pendingId').is(':checked')){ 
		callfrom="pendingId";		  
		} 
	
	else if($('#givenId').is(':checked')){ 
		callfrom="givenId";		  
		}
	
	if(partyId > 0){
		callPartyName=partyId;
	}
	
	//this is use to filter from date to date.
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();
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
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bill Date</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Party Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bill No</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gross Amount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Cash/Credit</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Party Inv.No</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dept.PO no.</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Given</div></th>"
			
						 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
 
htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.listInventoryNewDto.length;i++) {
	
		htm= htm
		+ "<tr id='div123'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_date+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>"+ r.listInventoryNewDto[i].inv_purchase_invoice_master_Supplier_Name+"</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_no+"</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>"+r.listInventoryNewDto[i].inv_purchase_invoice_master_final_total_net_amt+"</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>-</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>-</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>0</td>";
		if(r.listInventoryNewDto[i].dispatch_flag == "Y"){
			htm =htm +	'<td class="only-checkbox center" >'
			+	'<input type="checkbox" disabled id="chkOpdBillReg'+ r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_no+'" name="opdBillCheckboxReg" value="'+ r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_no+'">'
			+	'</td>';
		}else{
			htm =htm +	'<td class="only-checkbox center" >'
			+	'<input type="checkbox" id="chkOpdBillReg'+ r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_no+'" name="opdBillCheckboxReg" value="'+ r.listInventoryNewDto[i].inv_purchase_invoice_master_doc_no+'">'
			+	'</td>';
		}
		
	
		+ "</tr>";	

 		index++;
 	}
	
	$("#dispachNew").html(htm);

}


function saveDispachlist(docIdddd)
{
	var docId =[];
	
	
	$('input[name=opdBillCheckboxReg]:checked').each( function () {
	       
		docId.push(parseInt($(this).val()));
	});
	if(docId.length==0){
		alert("Please select atleast one Party Name");
		return false;
	}	
	var inputs = [];	
	inputs.push("docId="+ encodeURIComponent(docId));
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url : "ehat/InventoryNewController/saveDispachlist",
		data	: str + "&reqType=AJAX",
		//timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
	
			alertify.success("Dispach Saved successfuly");
			//alert(r);
			getDispachlist();
		}
	});
}


function setPartyNameOnload(){
	var callfrom="";
	var callPartyName=0;
	var startDate=0;
	var endDate=0;
	var letter="";
	//var partyId=$('#partyId').val();
	
	if($('#allId').is(':checked')){ 
		callfrom="allId";		  
		}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {"callfrom" : callfrom,
			"callPartyName" : callPartyName,
			"startDate" : startDate,
			"endDate" : endDate,
			"letter" : letter
		},
		url : "ehat/InventoryNewController/getPartyNameForSelectList",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			SetPartyNameOnloadTemp(r);
		}
	});
}
function SetPartyNameOnloadTemp(r){
	var list = "<option value='0'>select</option>";
	for ( var i = 0; i < r.listInventoryNewDto.length; i++) {
		list = list
				+ "<option value='"
				+ r.listInventoryNewDto[i].inv_purchase_invoice_master_Supplier_Id
				+ "'>"
				+ ((r.listInventoryNewDto[i].inv_purchase_invoice_master_Supplier_Name))
				+ "</option>";
	}
	$("#partyId").html(list);
}


function getPartyDetailsfromDate()
{
	var startDate = $('#dob').val();	
	var endDate = $('#dob1').val();
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
	var startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
	
	var dateAr = endDate.split('/');
	var endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
	
	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			
			"startDate" : startDate1,
			"endDate" : endDate2
		},
		url : "ehat/InventoryNewController/getPartyDetailsfromDate",
		success : function(r) {
			SetDispachListTemp(r);
		}
	});
}

// fetch data for hall wise patients
function getWardWisePatientsDetails(){

	var callfrom="";
	
	var letter=$("#byName").val();
	
	
	//this is use to filter from date to date.
	var startDate = ($('#fromDate').val()).split("/");
	var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
	var endDate = ($('#lastDate').val()).split("/");
	var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
	var startDate1=0;
	var endDate2=0;
	
	var wardType=$('#wardTypeHall').val();
	var docListBedWise=$('#docListBedWise').val();
	
	
	if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
			eDate=="" || eDate == null || eDate == isNaN(eDate)){
		sDate=0;
		eDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(sDate);
	    var b = new Date(eDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(sDate==0 || sDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(eDate==0 || eDate==null)
		{
		alert("Please Select End Date");
		return false;
		}

		
		var dateAr = sDate.split('/');
		 startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
		 dateAr = eDate.split('/');
		 endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
	}
	//alert(startDate);
	//alert(endDate);
	
	//alert(wardType);
	//alert(docListBedWise);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {"hallId" : wardType,
				"hallSlaveId" : 0,
				"docId" : docListBedWise,
				"startDate" : sDate,
				"endDate" : eDate,
				"letter" : letter
		},
		url : "ehat/InventoryNewController/getWardWisePatientsDetails",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setTempForHallWise(r);
		}
	});

}

function setTempForHallWise(r){
	
	var bulkTemp="";
	
	var patPrefix = $('#patPrefix').val();
	var patMiddle = $('#patMiddle').val();
	for(var i=0;i<r.listWardWiseDetaisDto.length;i++){
		
		var patId=r.listWardWiseDetaisDto[i].patientId;
		var docId=r.listWardWiseDetaisDto[i].doctorId;
		
		
		var sourceId=r.listWardWiseDetaisDto[i].sourceTypeId;		
		var caseTypeId=r.listWardWiseDetaisDto[i].caseType;
		var PatientType ="";
		var SelfMediclaim ="";
		if(caseTypeId == 1){
			 PatientType ="Hospital";
		}else /*if(caseTypeId == 2)*/{
			 PatientType ="Private";
		}
		
		if(sourceId == 0){
			SelfMediclaim ="Self";
		}else /*if(sourceId == 2)*/{
			SelfMediclaim ="Mediclaim";
		}
		
		bulkTemp=bulkTemp+"<tr>"
		+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
		+ "<td class='center TextFont' style='width: 10%;'>"+r.listWardWiseDetaisDto[i].opdipdno+"</td>"
		+ "<td class='center TextFont' style='width: 5%;'>"+patPrefix+""+patMiddle+""+patId+"</td>"
		+ "<td class='center TextFont' style='width: 15%;'>"+r.listWardWiseDetaisDto[i].patientName+"</td>"		
		+ "<td class='center TextFont' style='width: 15%;'>"+r.listWardWiseDetaisDto[i].bedHall+"</td>"
		+ "<td class='center TextFont' style='width: 15%;'>"+r.listWardWiseDetaisDto[i].docNameStr+"</td>"
		+ "<td class='center TextFont' style='width: 15%;'>"+r.listWardWiseDetaisDto[i].category_name+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+PatientType+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+SelfMediclaim+"</td>"
		+ "<td class='center TextFont' style='width: 6%;'>"+r.listWardWiseDetaisDto[i].addmitDays+"</td>";
	}
	$("#hallWiseData").html(bulkTemp);
	
}

var wardTypeSelectIDUIView = "<option id='' value='0'>--select--</option>";
function getallHallTypeForBedWise(type) {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}
	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');
	inputs.push('corporateId=' + sid);
	inputs.push('type=' + type);

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

		//	$("#hallDetailDiv").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			for ( var i = 0; i < (pobj1.htli.length); i++) {

				wardTypeSelectIDUIView = wardTypeSelectIDUIView
						+ ("<option id='" + (pobj1.htli[i].idht) + "' value='"
								+ (pobj1.htli[i].hallTypeId) + "'>"
								+ (pobj1.htli[i].htnm) + "</option>");

			}

			$("#wardType5").html(wardTypeSelectIDUIView);

		}
	});
};


function getDocListUnitWiseForHall(){
	var callfrom="doctor";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/registration/getDocListUnitWise",
		success : function(r) {
			setTemplateForgetDocListUnitWiseHall(r);
		}
	});
}

function setTemplateForgetDocListUnitWiseHall(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.lstDoctorDto.length; int++) {
		list=list+'<option value="'+(r.lstDoctorDto[int].doctor_ID)+'">'+(r.lstDoctorDto[int].doc_name)+'</option>';
		
	}	
	$("#docListBedWise").html(list);
}



/************
* @author	: Vinod Udawant
* @date		: 15-Feb-2018
* @codeFor	: Fetch Bill Prefix
*************/
function getBillPrefix(callF,depId){
			
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
		
	var inputs = [];	
	inputs.push("depId=" + depId);
	inputs.push("callFrom=" + callF);		
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/bill/getBillPrefix",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setBillPrefixTemp(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 15-Feb-2018
* @codeFor	: Fetch Bill Prefix
*************/
function setBillPrefixTemp(r){
	
	var len = r.listEhatBillPrefix.length;			
	for(var n=0;n<len;n++){
		
		var lst = r.listEhatBillPrefix[n];
		
	  	// For Patient Id	  	
	  	if(lst.depId==4){
	  			
	  		$("#patPrefix").val(lst.billPrefix);
	  		$("#patMiddle").val(lst.billMiddle);
	  		$("#patSufix").val(lst.billSuffix);  		
	  	}
	}		
}


//fetch data for Discharge patients report
function getDischargePatientsDetails(){
	
	var letter=$("#byName").val();
	
	var callfrom="";
	if($('#allId').is(':checked')){ 
		callfrom="allId";		  
		}
	
	else if($('#mediclaimId').is(':checked')){ 
		callfrom="mediclaimId";		  
		} 
	
	else if($('#selfId').is(':checked')){ 
		callfrom="selfId";		  
		}
	
	
	//this is use to filter from date to date.
	var startDate = ($('#fromDate').val()).split("/");
	var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
	var endDate = ($('#lastDate').val()).split("/");
	var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
	
	var wardType=$('#wardType5').val();
	var docListBedWise=$('#docListBedWise').val();
	
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
	//alert(sponsorF);
	//alert(sponsorL);
	
	if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
			eDate=="" || eDate == null || eDate == isNaN(eDate)){
		 sDate=0;
		 eDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(sDate);
	    var b = new Date(eDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(sDate==0 || sDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(eDate==0 || eDate==null)
		{
		alert("Please Select End Date");
		return false;
		}

		
		var dateAr = sDate.split('/');
		 startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
		 dateAr = eDate.split('/');
		 endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
	}
	//alert(startDate);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {"chargesId" :sponsorF,
				"chargesSlaveId" :sponsorL,
				"typeOf" : callfrom,
				"startDate" : sDate,
				"endDate" : eDate,
				"letter" : letter
		},
		url : "ehat/InventoryNewController/getDischargePatientsDetails",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setTempForDischargePatientsDetails(r);
		}
	});

}

function setTempForDischargePatientsDetails(r){
	
	var bulkTemp="";
	
	var patPrefix = $('#patPrefix').val();
	var patMiddle = $('#patMiddle').val();
	for(var i=0;i<r.listDischargeAllPatientsDto.length;i++){
		
		var patId=r.listDischargeAllPatientsDto[i].patientId;
		var docId=r.listDischargeAllPatientsDto[i].doctorId;
		var date = new Date(r.listDischargeAllPatientsDto[i].createdDateTime)
		.toLocaleDateString('en-GB');
		var DOD = new Date(r.listDischargeAllPatientsDto[i].dischargeDate)
		.toLocaleDateString('en-GB');
		
		var sourceId=r.listDischargeAllPatientsDto[i].sourceTypeId;		
		var caseTypeId=r.listDischargeAllPatientsDto[i].caseType;
		var PatientType ="";
		var SelfMediclaim ="";
		if(caseTypeId == 1){
			 PatientType ="Hospital";
		}else /*if(caseTypeId == 2)*/{
			 PatientType ="Private";
		}
		
		if(sourceId == 0){
			SelfMediclaim ="Self";
		}else /*if(sourceId == 2)*/{
			SelfMediclaim ="Mediclaim";
		}
		
		bulkTemp=bulkTemp+"<tr>"
		+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
		+ "<td class='center TextFont' style='width: 6%;'>"+patPrefix+""+patMiddle+""+patId+"</td>"
		+ "<td class='center TextFont' style='width: 8%;'>"+r.listDischargeAllPatientsDto[i].opdipdno+"</td>"
		+ "<td class='center TextFont' style='width: 5%;'>"+patPrefix+""+patMiddle+""+patId+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+date+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+DOD+"</td>"
		+ "<td class='center TextFont' style='width: 5%;'>"+r.listDischargeAllPatientsDto[i].billId+"</td>"		
		+ "<td class='center TextFont' style='width: 12%;'>"+r.listDischargeAllPatientsDto[i].patientName+"</td>"
		+ "<td class='center TextFont' style='width: 8%;'>"+r.listDischargeAllPatientsDto[i].mobile+"</td>"
		+ "<td class='center TextFont' style='width: 12%;'>"+r.listDischargeAllPatientsDto[i].category_name+"</td>"		
		+ "<td class='center TextFont' style='width: 12%;'>"+r.listDischargeAllPatientsDto[i].bedHall+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+r.listDischargeAllPatientsDto[i].docNameStr+"</td>"
		+ "<td class='center TextFont' style='width: 6%;'>"+r.listDischargeAllPatientsDto[i].dischargeType+"</td>";
	}
	$("#hallWiseData1").html(bulkTemp);
	
}



function printAllDischarge(){
	
var letter=$("#byName").val();
	var chargesId=0;
	var chargesSlaveId=0;
	var callfrom="";
	if($('#allId').is(':checked')){ 
		callfrom="allId";		  
		}
	
	else if($('#mediclaimId').is(':checked')){ 
		callfrom="mediclaimId";		  
		} 
	
	else if($('#selfId').is(':checked')){ 
		callfrom="selfId";		  
		}
	
	
	//this is use to filter from date to date.
	var startDate = ($('#fromDate').val()).split("/");
	var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
	var endDate = ($('#lastDate').val()).split("/");
	var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
	
//	var wardType=$('#wardType5').val();
	//var docListBedWise=$('#docListBedWise').val();
	
	
	if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
			eDate=="" || eDate == null || eDate == isNaN(eDate)){
		 sDate=0;
		 eDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(sDate);
	    var b = new Date(eDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(sDate==0 || sDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(eDate==0 || eDate==null)
		{
		alert("Please Select End Date");
		return false;
		}
		
	}

		window.open("all_discharge_report_print.jsp?typeOf="+callfrom+"&letter="+letter+
				"&fromDate="+sDate+"&toDate="+eDate+"&chargesId="+chargesId+"&chargesSlaveId="+chargesSlaveId);
	
}


function printHallWisePatients(){
	
	var letter=$("#byName").val();
	//this is use to filter from date to date.
	var startDate = ($('#fromDate').val()).split("/");
	var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
	var endDate = ($('#lastDate').val()).split("/");
	var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);

	
	var wardType=$('#wardTypeHall').val();
	var docListBedWise=$('#docListBedWise').val();
	var hallSlaveId=0;
	
	if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
			eDate=="" || eDate == null || eDate == isNaN(eDate)){
		 sDate=0;
		 eDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(sDate);
	    var b = new Date(eDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(sDate==0 || sDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(eDate==0 || eDate==null)
		{
		alert("Please Select End Date");
		return false;
		}
		
	}

			window.open("ehat_ward_wise_report_print.jsp?docId="+docListBedWise+"&letter="+letter+
					"&fromDate="+sDate+"&toDate="+eDate+"&hallId="+wardType+"&hallSlaveId="+hallSlaveId);
		
	}




function getIpdbillingEstimateReport(){
	

	
	//var letter=$("#byName").val();
	var letter="";
	
	var callfrom="";
	
	
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate=0;
		 endDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
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
	//alert(startDate);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {"typeOf" : callfrom,
				"startDate" : startDate,
				"endDate" : endDate,
				"letter" : letter
		},
		url : "ehat/InventoryNewController/getIpdbillingEstimateReport",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setIpdbillingEstimateReportTemp(r);
		}
	});
}
function setIpdbillingEstimateReportTemp(r){
	var temp1="";
	
	var totPer=0;
	var index=0;
	//if(r.listEhatIpdBillFinalEstimateDto.length > 0){
		var q_name="-";
		for(var i=0;i < r.listEhatIpdBillFinalEstimateDto.length;i++){
			//alert(i);
			totPer=Number(totPer)+Number(r.listEhatIpdBillFinalEstimateDto[i].diffInPer);
			
			var DOA=new Date(r.listEhatIpdBillFinalEstimateDto[i].createdDateTime).toLocaleDateString('en-GB');					
			var DOD=new Date(r.listEhatIpdBillFinalEstimateDto[i].dischargeDate).toLocaleDateString('en-GB');
			index=(i+1);
			
			temp1=temp1+ '<tr>'
				+ ' <td style="height: 21.5px;width: 5%">'+index+'</td> '
				+ ' <td style="height: 21.5px;width: 5%">'+r.listEhatIpdBillFinalEstimateDto[i].billId+'</td> '
				+ ' <td style="height: 21.5px;width: 8%">'+r.listEhatIpdBillFinalEstimateDto[i].estimateNo+'</td> '
				+ ' <td style="height: 21.5px;width: 14%">'+r.listEhatIpdBillFinalEstimateDto[i].opdipdno+'</td> '	
				+ ' <td style="height: 21.5px;width: 12%">'+r.listEhatIpdBillFinalEstimateDto[i].patientName+'</td> '
				+ ' <td style="height: 21.5px;width: 8%">'+q_name+'</td> '
				+ ' <td style="height: 21.5px;width: 10%">'+DOA+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+DOD+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+r.listEhatIpdBillFinalEstimateDto[i].quotationAmount+'</td> '	
				+ ' <td style="height: 21.5px;width: 10%">'+r.listEhatIpdBillFinalEstimateDto[i].billAmount+'</td> '		
				+ ' <td style="height: 21.5px;width: 8%">'+r.listEhatIpdBillFinalEstimateDto[i].diffInPer+'</td> '																														
				+' </tr>';	
			}
		var TotAvg=((totPer/index)).toFixed(2);
		//alert(TotAvg);
		if(isNaN(TotAvg)){
			TotAvg=(0.00);
		}
		
		var avg="AVG";
		temp1=temp1+ '<tr>'
		+ ' <th style="height: 21.5px;width: 5%"></th> '
		+ ' <th style="height: 21.5px;width: 5%"></th> '
		+ ' <th style="height: 21.5px;width: 8%"></th> '
		+ ' <th style="height: 21.5px;width: 14%"></th> '	
		+ ' <th style="height: 21.5px;width: 12%"></th> '
		+ ' <th style="height: 21.5px;width: 8%"></th> '
		+ ' <th style="height: 21.5px;width: 10%"></th> '	
		+ ' <th style="height: 21.5px;width: 10%"></th> '	
		+ ' <th style="height: 21.5px;width: 10%"></th> '	
		+ ' <th style="height: 21.5px;width: 10%">'+avg+'</th> '		
		+ ' <th style="height: 21.5px;width: 8%">'+TotAvg+'</th> '																													
	+' </tr>';			
		
		
		$("#container2").html(temp1);
	//}
		
}

function printAllIpdEstimate(){

	//var letter=$("#byName").val();
	var letter="";
	
	var callfrom="";
	
	
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
	
	if(startDate=="" || startDate == null || startDate == isNaN(startDate) || 
			endDate=="" || endDate == null || endDate == isNaN(startDate)){
		 startDate=0;
		 endDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(startDate);
	    var b = new Date(endDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
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

			window.open("ehat_ipd_bill_final_estimate_print.jsp?typeOf="+callfrom+"&letter="+letter+
					"&fromDate="+startDate+"&toDate="+endDate);
		
	
}





//fetch data for Discharge patients report
function getSponsorSummaryDetails(){
	
	var letter=$("#byName").val();
	
	var callfrom="";
	if($('#allId').is(':checked')){ 
		callfrom="allId";		  
		}
	
	else if($('#mediclaimId').is(':checked')){ 
		callfrom="mediclaimId";		  
		} 
	
	else if($('#selfId').is(':checked')){ 
		callfrom="selfId";		  
		}
	
	
	//this is use to filter from date to date.
	var startDate = ($('#fromDate').val()).split("/");
	var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
	var endDate = ($('#lastDate').val()).split("/");
	var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
	
	var wardType=$('#wardType5').val();
	var docListBedWise=$('#docListBedWise').val();
	
	
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
	
	/*alert(chargesId);
	alert(chargesSlaveId);*/
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
	//alert(sponsorF);
	//alert(sponsorL);
	
	if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
			eDate=="" || eDate == null || eDate == isNaN(eDate)){
		 sDate=0;
		 eDate=0;
		 
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

	    var todays = yyyy +'-'+mm+'-'+dd;

	    var a = new Date(sDate);
	    var b = new Date(eDate);
	    var c = new Date(todays);
	    
	    if(a.getTime() > c.getTime()) {
	      
	        alert(" start Date should be Today or less than today");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    if(b.getTime() < a.getTime()) {
	        
	        alert(" To date should be greater than equal to From date");
	        $('#fromDate').val(todays);
	        return false;
	    }
	    
	    if(b.getTime() > c.getTime()) {
	        
	        alert("End Date should be Today or less than today");
	        $('#lastDate').val(todays);
	        return false;
	    }
	    
		if(sDate==0 || sDate==null)
			{
			alert("Please Select From Date");
				 
			return false;
			}
		if(eDate==0 || eDate==null)
		{
		alert("Please Select End Date");
		return false;
		}

		
		var dateAr = sDate.split('/');
		 startDate1 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
		 dateAr = eDate.split('/');
		 endDate2 = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
		
	}
	//alert(startDate);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
				/*"chargesId" :sponsorF,
				"chargesSlaveId" :sponsorL,*/
				"chargesId" :chargesId,
				"chargesSlaveId" :chargesSlaveId,
				"typeOf" : callfrom,
				"startDate" : sDate,
				"endDate" : eDate,
				"letter" : letter
		},
		url : "ehat/InventoryNewController/getSponsorSummaryDetails",

		error : function() {
			alert('error');
		},
		
		success : function(r) {
			setTempForSponsorSummaryDetails(r);
		}
	});

}


function setTempForSponsorSummaryDetails(r){
	
	var bulkTemp="";
	var grandTot="";
	var grandtotAmount="";
	var patPrefix = $('#patPrefix').val();
	var patMiddle = $('#patMiddle').val();
	for(var i=0;i<r.listSponsorSummaryDetailsDto.length;i++){
		
		var patId=r.listSponsorSummaryDetailsDto[i].patientId;
		var docId=r.listSponsorSummaryDetailsDto[i].doctorId;
		var departmentId=r.listSponsorSummaryDetailsDto[i].departmentId;
		var date = new Date(r.listSponsorSummaryDetailsDto[i].createdDateTime)
		.toLocaleDateString('en-GB');
		var DOD="";
		if(departmentId == 2){
			 DOD = new Date(r.listSponsorSummaryDetailsDto[i].dischargeDate)
			.toLocaleDateString('en-GB');
		}else{
			 DOD = r.listSponsorSummaryDetailsDto[i].dischargeDate;
		}
		 grandTot = Number(grandTot) + Number(r.listSponsorSummaryDetailsDto[i].amount);
		// grandtotAmount = Number(grandtotAmount) + Number(r.listSponsorSummaryDetailsDto[i].totAmount);
		
		
		bulkTemp=bulkTemp+"<tr>"
		+ "<td class='center TextFont' style='width: 5%;'>"+(i+1)+"</td>"
		+ "<td class='center TextFont' style='width: 5%;'>"+patPrefix+""+patMiddle+""+patId+"</td>"
		+ "<td class='center TextFont' style='width: 8%;'>"+r.listSponsorSummaryDetailsDto[i].opdipdno+"</td>"
		+ "<td class='center TextFont' style='width: 12%;'>"+r.listSponsorSummaryDetailsDto[i].dignoName+"</td>"
		+ "<td class='center TextFont' style='width: 12%;'>"+r.listSponsorSummaryDetailsDto[i].patientName+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+date+"</td>"
		+ "<td class='center TextFont' style='width: 7%;'>"+DOD+"</td>"
		+ "<td class='center TextFont' style='width: 5%;'>"+r.listSponsorSummaryDetailsDto[i].billId+"</td>"
		+ "<td class='center TextFont' style='width: 8%;'>"+DOD+"</td>"
		+ "<td class='center TextFont' style='width: 8%;'>"+r.listSponsorSummaryDetailsDto[i].amount+"</td>"
		+ "<td class='center TextFont' style='width: 12%;'>"+r.listSponsorSummaryDetailsDto[i].totAmount+"</td>";
	}
	bulkTemp=bulkTemp+"<tr>"
	+ "<td class='center TextFont' style='width: 5%;'></td>"
	+ "<td class='center TextFont' style='width: 5%;'></td>"
	+ "<td class='center TextFont' style='width: 8%;'></td>"
	+ "<td class='center TextFont' style='width: 12%;'></td>"
	+ "<td class='center TextFont' style='width: 12%;'></td>"
	+ "<td class='center TextFont' style='width: 7%;'></td>"
	+ "<td class='center TextFont' style='width: 7%;'></td>"
	+ "<td class='center TextFont' style='width: 5%;'></td>"
	+ "<td class='center TextFont' style='width: 8%;'>Grand Total</td>"
	+ "<td class='center TextFont' style='width: 8%;'>"+(Number(grandTot)).toFixed(2)+"</td>"
	+ "<td class='center TextFont' style='width: 12%;'></td>";
	
	$("#hallWiseData1").html(bulkTemp);
	
}



function printSponsorReportOne(){
	
	var letter=$("#byName").val();
		//var chargesId=0;
		//var chargesSlaveId=0;
		var callfrom="";
		if($('#allId').is(':checked')){ 
			callfrom="allId";		  
			}
		
		else if($('#mediclaimId').is(':checked')){ 
			callfrom="mediclaimId";		  
			} 
		
		else if($('#selfId').is(':checked')){ 
			callfrom="selfId";		  
			}
		
		
		//this is use to filter from date to date.
		var startDate = ($('#fromDate').val()).split("/");
		var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
		var endDate = ($('#lastDate').val()).split("/");
		var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
		
//		var wardType=$('#wardType5').val();
		//var docListBedWise=$('#docListBedWise').val();
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
		
		
		if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
				eDate=="" || eDate == null || eDate == isNaN(eDate)){
			 sDate=0;
			 eDate=0;
			 
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

		    var todays = yyyy +'-'+mm+'-'+dd;

		    var a = new Date(sDate);
		    var b = new Date(eDate);
		    var c = new Date(todays);
		    
		    if(a.getTime() > c.getTime()) {
		      
		        alert(" start Date should be Today or less than today");
		        $('#fromDate').val(todays);
		        return false;
		    }
		    if(b.getTime() < a.getTime()) {
		        
		        alert(" To date should be greater than equal to From date");
		        $('#fromDate').val(todays);
		        return false;
		    }
		    
		    if(b.getTime() > c.getTime()) {
		        
		        alert("End Date should be Today or less than today");
		        $('#lastDate').val(todays);
		        return false;
		    }
		    
			if(sDate==0 || sDate==null)
				{
				alert("Please Select From Date");
					 
				return false;
				}
			if(eDate==0 || eDate==null)
			{
			alert("Please Select End Date");
			return false;
			}
			
		}

			window.open("sponsor_report_one_print.jsp?typeOf="+callfrom+"&letter="+letter+
					"&fromDate="+sDate+"&toDate="+eDate+"&chargesId="+chargesId+"&chargesSlaveId="+chargesSlaveId);
		
	}


function printSponsorReportTwo(){
	
	var letter=$("#byName").val();
		//var chargesId=0;
		//var chargesSlaveId=0;
		var callfrom="";
		if($('#allId').is(':checked')){ 
			callfrom="allId";		  
			}
		
		else if($('#mediclaimId').is(':checked')){ 
			callfrom="mediclaimId";		  
			} 
		
		else if($('#selfId').is(':checked')){ 
			callfrom="selfId";		  
			}
		
		
		//this is use to filter from date to date.
		var startDate = ($('#fromDate').val()).split("/");
		var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
		var endDate = ($('#lastDate').val()).split("/");
		var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
		
//		var wardType=$('#wardType5').val();
		//var docListBedWise=$('#docListBedWise').val();
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
		
		
		if(sDate=="" || sDate == null || sDate == isNaN(sDate) || 
				eDate=="" || eDate == null || eDate == isNaN(eDate)){
			 sDate=0;
			 eDate=0;
			 
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

		    var todays = yyyy +'-'+mm+'-'+dd;

		    var a = new Date(sDate);
		    var b = new Date(eDate);
		    var c = new Date(todays);
		    
		    if(a.getTime() > c.getTime()) {
		      
		        alert(" start Date should be Today or less than today");
		        $('#fromDate').val(todays);
		        return false;
		    }
		    if(b.getTime() < a.getTime()) {
		        
		        alert(" To date should be greater than equal to From date");
		        $('#fromDate').val(todays);
		        return false;
		    }
		    
		    if(b.getTime() > c.getTime()) {
		        
		        alert("End Date should be Today or less than today");
		        $('#lastDate').val(todays);
		        return false;
		    }
		    
			if(sDate==0 || sDate==null)
				{
				alert("Please Select From Date");
					 
				return false;
				}
			if(eDate==0 || eDate==null)
			{
			alert("Please Select End Date");
			return false;
			}
			
		}

			window.open("sponsor_report_Two_print.jsp?typeOf="+callfrom+"&letter="+letter+
					"&fromDate="+sDate+"&toDate="+eDate+"&chargesId="+chargesId+"&chargesSlaveId="+chargesSlaveId);
		
	}
	
	
function setCoverHistoryOpdTemp(){
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment Id</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Doctor Investigation</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sub & Obj</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assessment</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>CPOE</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Order Form</div></th>"

			
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
			
			
						 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
//var index = 1;	
 
htm =htm+ "<tbody>"	;
//for ( var i = 0; i < r.listInventoryNewDto.length;i++) {
	
		htm= htm
		+ "<tr id='div123'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>1</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/19-04-2018/14</td>"

		+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Ansari Humera</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>There is body pain.</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>Typhoid fever, unspecified</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>SAMPLE FOR CENTRIFUGE</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>CROSINE</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>19-04-2018</td>"
		
		+ "</tr>";	
		
		htm= htm
		+ "<tr id='div123'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>2</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/19-04-2018/14</td>"

		+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Dane Preeti</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>Major Injury</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>Amebic cystitis</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>SAMPLE COLLECTION BULB</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>WYSOLONE 10MG TAB</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>19-04-2018</td>"
		
		+ "</tr>";	
		
		htm= htm
		+ "<tr id='div123'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>3</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/19-04-2018/14</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Amit Dravid</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>Fracture Hand</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>Syphilitic aortitis</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>X-Ray Chest PA</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>PRONDPS</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>19-04-2018</td>"
		
		+ "</tr>";	

 		//index++;
 //	}
	
	$("#coverHistoryDetailsOpd").html(htm);

}
	


function getWardTypeList(){

	var hallTypeId = $("#wardTypeHall").val();
	
	if(!(hallTypeId >= 0))
		hallTypeId = 0;
	
	var inputs = [];
	inputs.push('hallTypeId=' + encodeURIComponent(hallTypeId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getWardTypeList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setWardTypeList(r,hallTypeId);
		}
	});
}

function setWardTypeList(r,hallTypeId){
	
	var htm = "";
	if(hallTypeId > 0)
		htm = "<option value='0'>-- Select Ward Name --</option>";
	else
		htm = "<option value='0'>-- Select Ward Type --</option>";
	
	for (var i=0;i<r.lstChargesSlave.length;i++)	{
		
		htm = htm + "<option value="+r.lstChargesSlave[i].slaveId+">"+r.lstChargesSlave[i].categoryName+"</option>";
	}
	if(hallTypeId > 0)
		$("#wardName").html(htm);
	else
		$("#wardTypeHall").html(htm);
}