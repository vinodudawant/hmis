/************
* @author	: paras R surywanashi
* @date		: 
* @codeFor	: fetch death Patients  
 ************/
function fetchdeathapatient(callfrom) {
	var fromdate="";
	var todate="";
	
   if(callfrom=="date"){
	   fdate=($("#fromDate").val()).split("/");
	   var fromdate = (fdate[2] + "-" + fdate[1] + "-" + fdate[0]);  // added by sandip
	   tdate=($("#lastDate").val()).split("/");
	   var todate = (tdate[2] + "-" + tdate[1] + "-" + tdate[0]);

    }
	jQuery.ajax({
		async : true,
		type : "POST",
		data	: {
			
			
			  "fromdate":fromdate,
			  "todate":todate,
			   "callfrom":callfrom
			},
		url : "ehat/death/getdeathpatientsList",
		
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setTempMarkVisit11(r);
		}
	});
}
 

function setTempMarkVisit11(r) {

	var htm = "<div  id='exgetdeath' class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;display:none;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;' id='thCenterPatientId'><div class='TextFont'>UHID</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Status</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>District</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Sponsor</div></th>"
			+ "<th class='col-sm-2-1 center' style='height: 21.5px;'><div class='TextFont'>Final Diagnosis</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dead</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Medicine Amount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment Amount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Total </div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Discount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Advance</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Balance</div></th>"


			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;
	var Mrn = 1010101111;
	for ( var i = 0; i < r.lstRegviewDto.length; i++) {

		var datetime = new Date(r.lstRegviewDto[i].createdDateTime)
				.toLocaleString();
		var DeathFlag = r.lstRegviewDto[i].deathFlag;
		var Deathstaus="Alive";
		var datdeath="-";
		if(DeathFlag=="Y"){
			//datdeath= new Date( r.lstRegviewDto[i].deathDate).toLocaleString();
			datdeath=new Date( r.lstRegviewDto[i].deathDate).toLocaleDateString('en-GB');
			//var datetime= new Date(t.listBillNobleServiceDto[i].createdDateTime).toLocaleDateString('en-GB');

			
			//alert("datdeath."+r.lstRegviewDto[i].deathDate);
			
			Deathstaus="Dead";
		}
		var medicineamount =	r.lstRegviewDto[i].medicineamount ;
		
		if(medicineamount > 0 ){
			
		}else{
			medicineamount=0.0;
		}
		var totalkl= medicineamount  + r.lstRegviewDto[i].treamentamount;
		var a = "";
        var disrs=  r.lstRegviewDto[i].treamentamount -  r.lstRegviewDto[i].discount ;
        var balance= (medicineamount +  disrs ) - ( r.lstRegviewDto[i].advancedamount);
		htm = htm
				+ "<div  class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-1-1' style='height: 21.5px;display:none'>"
				+    r.lstRegviewDto[i].ptId 
				+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
				+    r.lstRegviewDto[i].centerPatientId
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+   r.lstRegviewDto[i].patientName 
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ Deathstaus
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].disName
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].age
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+  r.lstRegviewDto[i].sponsername 
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].dignosis
				+ "</td>"
			
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ datdeath
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ medicineamount
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].treamentamount
				+ "</td>"
				
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ totalkl
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].discount
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].advancedamount
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ balance
				+ "</td>"
				 + "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
		Mrn++;
	}

	$("#container").html(htm);
	$("#allPatInfo").html(r);

}
/*---------------------------------------------------------------------------------------------*/

function fetchdeathapatient1(callfrom) {
	var fdate="";
	var todate="";
	
   if(callfrom=="date"){
	   fdate=$("#fromDate").val();
	   todate=$("#lastDate").val();

    }
	jQuery.ajax({
		async : true,
		type : "POST",
		data	: {
			
			
			  "fromdate":fdate,
			  "todate":todate,
			   "callfrom":callfrom
			},
		url : "ehat/death/getdeathpatientsList",
		
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			
			setTempMarkVisit1(r);
		}
	});
}
 

function setTempMarkVisit1(r) {

	var htm = "<div  id='exgetdeath' class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			//+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"
			

			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Status</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>District</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Sponsor</div></th>"
			+ "<th class='col-sm-2-1 center' style='height: 21.5px;'><div class='TextFont'>Final Diagnosis</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dead</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Medicine Amount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment Amount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Total </div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Discount</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Advance</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Balance</div></th>"


			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;
	var Mrn = 1010101111;
	for ( var i = 0; i < r.lstRegviewDto.length; i++) {

		var datetime = new Date(r.lstRegviewDto[i].createdDateTime)
				.toLocaleString();
		var DeathFlag = r.lstRegviewDto[i].deathFlag;
		var Deathstaus="Alive";
		var datdeath="-";
		if(DeathFlag=="Y"){
			//datdeath= new Date( r.lstRegviewDto[i].deathDate).toLocaleString();
			datdeath=new Date( r.lstRegviewDto[i].deathDate).toLocaleDateString('en-GB');
			Deathstaus="Dead";
		}
		var medicineamount =	r.lstRegviewDto[i].medicineamount ;
		
		if(medicineamount > 0 ){
			
		}else{
			medicineamount=0.0;
		}
		var totalkl= medicineamount  + r.lstRegviewDto[i].treamentamount;
		var a = "";
        var disrs=  r.lstRegviewDto[i].treamentamount -  r.lstRegviewDto[i].discount ;
        var balance= (medicineamount +  disrs ) - ( r.lstRegviewDto[i].advancedamount);
		htm = htm
				+ "<div  class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				/*+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
				+    r.lstRegviewDto[i].ptId
				+ "</td>"*/
				
				+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
				+    r.lstRegviewDto[i].centerPatientId
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+   r.lstRegviewDto[i].patientName 
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ Deathstaus
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].disName
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].age
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+  r.lstRegviewDto[i].sponsername 
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].dignosis
				+ "</td>"
			
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ datdeath
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ medicineamount
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].treamentamount
				+ "</td>"
				
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ totalkl
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].discount
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].advancedamount
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ balance
				+ "</td>"
				 + "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
		Mrn++;
	}

	$("#container").html(htm);
	$("#allPatInfo").html(r);

}
/*---------------------------------------------------------------------------------------------*/


function getDeathRecord(){
	
	   window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=iddeath]').html()));
	    e.preventDefault();
}

function getreport(){

	//var letter=$("#byName").val();
	var letter="";
	
	var callfrom="";
	
	
	//this is use to filter from date to date.
	var startDate = ($('#fromDate').val()).split("/");
	var sDate = (startDate[2] + "-" + startDate[1] + "-" + startDate[0]);  // added by sandip
	var endDate = ($('#lastDate').val()).split("/");
	var eDate = (endDate[2] + "-" + endDate[1] + "-" + endDate[0]);
	
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
	callfrom="date";
			window.open("ehat_deathreports_print.jsp?typeOf="+callfrom+" " +
					"&fromDate="+sDate+"&toDate="+eDate);
		
	
}


var operationName = "<option value='0'>-SELECT-</option>{#foreach $T.ol as ol}<option value='{$T.ol.oi}' >{$T.ol.on}</option>{#/for}";

function fetchopshdule() {
	/*if (rowcount == undefined) {
	var opType = $("#selOTtype").val();
	var department = $("#department").val();
} else {
	var opType = $("#selOTtype" + rowcount).val();
	var department = $("#department" + rowcount).val();
}*/
/*var opType = $("#selOTtype").val();
if (opType == "Select") {
	alert("Please Select Operation Type");
	$("#department").val(0);
	return false;
}*/
	var status = $("#status").val();
	
var inputs = [];
inputs.push('status=' + status);
//inputs.push('opType=' + encodeURIComponent(opType));
//inputs.push('department=' + 2);
//inputs.push('action=fetchOperationName');
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "GET",
	data : str + "&reqType=AJAX",
	url : "ehat/ot/fetchOperationName",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		alert("error");
	},
	success : function(r) {
		// alert(ajaxResponse);
		
		setOperationNameTemplate(r);
		//objc = eval('(' + ajaxResponse + ')');

	}
});

}

function setOperationNameTemplate(r)
{
	var list="<option value='0'>--Select--</option>";
	for ( var i = 0; i<r.ol.length; i++) {

		list=list+'<option value="'+(r.ol[i].oi)+'">'+(r.ol[i].on)+'</option>';
	}	
	$("#selOTtypeOT").html(list);

	$("#selOTtypeOT").select2();

}


function getreportsurgery(){
	
	//var letter=$("#byName").val();
	var letter="";
	
	var callfrom="";
	
	
	//this is use to filter from date to date.
	var startDate = $('#fromDate').val();	
	var endDate = $('#lastDate').val();
	var  opname  = $('#selOTtypeOT').val();
	
	/*if(opname==0){
		alert("Please Select Surgery Name!!");
		return false;
	}*/
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
	    
	   /* if(a.getTime() > c.getTime()) {
	      
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
		*/
		
		
	}
	var inputs = [];
	inputs.push('startDate=' +startDate);
	inputs.push('endDate=' + endDate);
	inputs.push('opname=' + opname);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data	: {
			
			
			  "fromdate":startDate,
			  "todate":endDate,
			   "opname":opname
			},
		url : "ehat/ot/getreportsurgery",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var htm ="";
		for(var i=0; i < r.otrepordetails.length;i++){
			
			htm = htm
			+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ (i +1)
			+ "</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+    r.otrepordetails[i].patientid 
			+ "</td>"
			/*+ "<td class='col-sm-1-1 center' style='height: 21.5px;display:none'>"
			+    r.otrepordetails[i].centerPatientId 
			+ "</td>"*/
			+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
			+   r.otrepordetails[i].patientname 
			+ "</td>"
			+ "<td class='col-sm-3-1' style='height: 21.5px;'>"
			+   r.otrepordetails[i].sugeryname 
			+ "</td>"
			+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
			+    r.otrepordetails[i].starttime 
			+ "</td>"
			+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
			+   r.otrepordetails[i].endtime 
			+ "</td>"
			+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
			+   r.otrepordetails[i].otroom 
			+ "</td>"
			+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
			+   r.otrepordetails[i].department 
			+ "</td>"
			+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
			+  r.otrepordetails[i].protype 
			+ "</td>"
		
			+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
			+   r.otrepordetails[i].opdate 
			+ "</td>"
			
			 + "</tr>";

		}
		$("#container").html(htm);
		}
	});
		
	
}