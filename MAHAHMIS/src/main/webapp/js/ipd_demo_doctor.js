
function fetchGroupInstructionMasterAutosuggestion(inputId) {
	if ($("#instructionradio1").prop("checked") == true) {
		/* alert("instructionradio1"); */
		var instructionname = $("#" + inputId).val();
		var inputs = [];
		inputs.push('value=' + instructionname);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ddinstruction/fetchgroupinstructionmaster",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				autoSuggestionSeach(r, inputId);
			}
		});
	} else if($("#instructionradio2").prop("checked") == true){
	/* alert("instructionradio2"); */
		var instructionname = $("#" + inputId).val();
		var inputs = [];
		inputs.push('value=' + instructionname);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ddinstruction/fetchgrouptemplateinstructionmaster",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				autoSuggestionTemplateSeach(r, inputId);
			}
		});
	
	}
}

function autoSuggestionSeach(response, inputID) {
	var resultData = [];
	var template = "";
	for (var j = 0; j < response.groupinstructionmasterlist.length; j++) {
		var arrValue = response.groupinstructionmasterlist[j].id + "-"
				+ response.groupinstructionmasterlist[j].englishInstruction;
	
		var idValue = response.groupinstructionmasterlist[j].id;
		var patientName = response.groupinstructionmasterlist[j].englishInstruction;
		resultData.push({
			ID : idValue,
			Name : patientName
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}

	setTimeout(function() {

		$("#div" + inputID + " .typeahead").html(template);
		$("#div" + inputID + " .typeahead").show();
	
		$("#" + inputID).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("#" + inputID).data('typeahead').source = resultData;

	}, 500);

	function displayResult(item) {
	
		var count=$("#instructioncount").val();
		count++;
		$("#instructioncount").val(count);
		var res = item.text.split('-');
		var pQId = res[0];
		var partyName = res[2];
		createNextInput(count);
		$("input#" + inputID).val(partyName);
		$("#ddInstructionButton").show();
	}
}

function autoSuggestionTemplateSeach(response, inputID) {
	var resultData = [];
	var template = "";
	for (var j = 0; j < response.grouptemplatemasterlist.length; j++) {
		var arrValue = response.grouptemplatemasterlist[j].id + "-"
				+ response.grouptemplatemasterlist[j].tempLateName;
	
		var idValue = response.grouptemplatemasterlist[j].id;
		var patientName = response.grouptemplatemasterlist[j].tempLateName;
		resultData.push({
			ID : idValue,
			Name : patientName
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}

	setTimeout(function() {

		$("#div" + inputID + " .typeahead").html(template);
		$("#div" + inputID + " .typeahead").show();
	
		$("#" + inputID).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("#" + inputID).data('typeahead').source = resultData;

	}, 500);

	function displayResult(item) {
	
		var count=$("#instructioncount").val();
		/* count++; */
		$("#instructioncount").val(count);
		var res = item.text.split('-');
		var pQId = res[0];
		var partyName = res[2];
		 fetchTamplateGroup(pQId);
		/* createNextInput(count); */
		$("input#" + inputID).val(partyName);
		$("#ddInstructionButton").show();
	}
}
function fetchTamplateGroup(inputID)
{
	var inputs = [];
	inputs.push('value=' + inputID);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/fetchtamplategroup",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var count=$("#instructioncount").val();
			setInstruction(count,r,"TEMPLATE");
		}
	});

}
function setInstruction(inputID,response,callfrom)
{
	if(inputID == null|| inputID == undefined || inputID == "")
	{
		inputID=0;
	}
	
	var countrow=inputID;
	if(callfrom == 'TEMPLATE')
		{
		for(var j=0;j < response.groupInstructionMaster.length;j++)
			{
			if(countrow == 0)
				{
				inputID++;
				createNextInput(inputID);
				}
			else
				{
				inputID++;
				createNextInput(inputID);
				}
			
			}
		for (var i = 0; i < response.groupInstructionMaster.length; i++)
			{
					$("#instructionname"+countrow).val(response.groupInstructionMaster[i].id+"-"+response.groupInstructionMaster[i].englishInstruction);
					countrow++;
					
			}
		$("#instructioncount").val(inputID);
		}
	else
		{
		createNextInput(inputID);
		}
	
}
function createNextInput(inputID){
	
	var htm = '<tr><td><div class="col-sm-12" id="divinstructionname'+inputID+'"> '
	+'<input type="hidden" id="instructionid'+inputID+'">'
	+'<input type="text" id="instructionname'+inputID+'" class="form-control typeahead" size="70" style="border: none; outline: none;width: 100% placeholder="Instruction" onkeyup="fetchGroupInstructionMasterAutosuggestion(this.id);">'
	+'</div></td></tr>'
	$("#instructiontable").append(htm);
	$("#instructioncount").val(inputID);
	}
function saveInstructionDD()
{
	var obj = 0;
	obj = {
			doctordeskinstructiondtolist : []
	};
	
	var instructioncount= $("#instructioncount").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	var treatmentId="";
	// var patientId= $("#patientId").val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
		// alert(treatmentId);
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
		// alert(treatmentId);
	}
	for(var i=0;i <= instructioncount;i++ )
		{
		var instructionid=$("#instructionid"+i).val();
		if(instructionid == null || instructionid == undefined || instructionid == "")
			{
			instructionid=0;
			}
		
		var instructionname=$("#instructionname"+i).val();
		if(instructionname == null || instructionname == undefined || instructionname == "")
			{
			
			}
			else
			{
				var res= instructionname.split('-');
				var Id= res[0];
				var Name= res[1];
			if ((instructionname != undefined) && (instructionname != "undefined")) {
				obj.doctordeskinstructiondtolist.push({
					"instruction_id":instructionid,
					"id" : Id,
					"instruction_name" : Name,
					"createdBy" : userId,
					"unitId" : unitId,
					"treatment_id" :treatmentId,
					"patientId":patientId
				});
			}
		}
		}
	obj = JSON.stringify(obj);
	var inputs = [];
	inputs.push('obj=' + encodeURIComponent(obj));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/saveinstructiondd",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Saved Sucessfully");				
			}
			else {
				alertify.error("Oops Some Problem Ocured");
			}
			fetchInstruction('onload');
			clearInstruction();
		}
	});
}
function clearInstruction()
{
	var count =0; 
	var instructioncount= $("#instructioncount").val();
	for(var i=0;i < instructioncount;i++)
	{
		$("#instructionname"+i).val("");
		 $("#divinstructionname"+i).remove(); 
		 count++; 
	}
	 $("#divinstructionname"+count).remove();
	 createNextInput('0');
}

function fetchInstruction(id)
{
	onclickInst();
	var treatmentId='';
	/*
	 * if(id == 'onload') { treatmentId= $("#treatmentId").val();
	 * alert("current"+treatmentId); } else { treatmentId=
	 * $("#priviousTrtmntId").val(); alert("priv"+treatmentId); }
	 */

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
		// alert("priv"+treatmentId);
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
		// alert("current"+treatmentId);
	}
	
	var inputs = [];
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/fetchinstruction",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			clearInstruction();
		var icount=$("#instructioncount").val();
		for(var i=1;i<=icount;i++)
			{
			$("#divinstructionname"+i).remove();
			}
		if(r.doctordeskinstructiondtolist.length == 0)
			{
			$("#ddinstruction").hide();
			}
		else
			{
			$("#ddinstruction").show();
			setInstructionTable(r);
			}
			 
		}
	});
}
function setInstructionTable(r)
{
	var count=1; 
		for ( var i = 0; i < r.doctordeskinstructiondtolist.length; i++) {	
			
			$("#instructionid"+i).val(r.doctordeskinstructiondtolist[i].instruction_id);
			$("#instructionname"+i).val(r.doctordeskinstructiondtolist[i].id+"-"+r.doctordeskinstructiondtolist[i].instruction_name);
			createNextInput(count);
			count++;
		}
		$("#ddInstructionButton").hide();
}
/*function coverShitInformationPatient()
{
	
	var treatmentId=$("#treatmentId").val();
	if(treatmentId == null || treatmentId == undefined || treatmentId == "")
		{
		alert("Please select patient");
		return false;
		}
	var dpid=0;
	var callfrom=$("#callfrom").val();
	if(callfrom =='OPDID' )
		{
		dpid=1;
		}
	else if(callfrom =='IPDID' )
		{
		dpid=2;
		}
	else if(callfrom =='ERID' )
		{
		dpid=-5;
		}
	else if(callfrom =='CLOSEDID' )
		{
		dpid=4;
		}
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	inputs.push('dpid=' + encodeURIComponent(dpid));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ddinstruction/covershitinformationpatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			$("#patientname").text(r.patientName);
			$("#treatmentid").text(" "+r.opdipdno);
			$("#mrnid").text(r.mrnno);
			if(r.categoryName == null || r.categoryName == "null"||r.categoryName == ""||r.categoryName == undefined)
			{
				$("#bill_category").text(" "+"Self");
			}
			else
			{
				$("#bill_category").text(" "+r.categoryName);
			}
			$("#age").text(r.age+"Y/"+r.age_months+"M/"+r.age_days+"D");
			//$("#age").text(r.age);
			var docName=r.docName;
			var res = docName.split(',');
			var dname = res[0];
			$("#doctor_id").text(" "+dname)
			$("#gender").text(" "+r.gender);
			var Doadate = new Date(r.createdDateTime).toLocaleString();
			var prdate=Doadate.split(',');
			var dateD=GetFormattedDate(new Date(prdate[0]),"ddmmyyyy").toLocaleString();
			var date=dateD+","+prdate[1];
			$("#dob").text(date);
			if(r.ref_doc_name == null || r.ref_doc_name == "null"||r.ref_doc_name == ""||r.ref_doc_name == undefined)
				{
				$("#ref_dr_name").text("");	
				}
				else
				{
				$("#ref_dr_name").text(" "+r.ref_doc_name);
				}
			$("#bill_id").text(" "+r.billId);
			$("#pdob").val(" "+r.dob);
			$("#patientId").val(" "+r.patientId);
			if(r.imageName == null || r.imageName == "null"||r.imageName ==""|| r.imageName == undefined)
				{
				
				}
			else
				{
				$('#patientImg').attr('src','pharmacy/pharmacy/readImage?url='+ r.imageName);
				}
			
			
		}
		});
}*/
function coverShitInformationPatientBill() {
	var treatmentId=$("#treatmentId").val();
	var deptID=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : treatmentId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			
			$("#patientname").text(r.listRegTreBillDto[0].patientName);
			$("#treatmentid").text(" "+r.listRegTreBillDto[0].treatmentId);
			$("#mrnid").text(r.listRegTreBillDto[0].centerPatientId);
			if(r.listRegTreBillDto[0].sourceTypeId == null || r.listRegTreBillDto[0].sourceTypeId == "null"||r.listRegTreBillDto[0].sourceTypeId == ""||r.listRegTreBillDto[0].sourceTypeId == undefined)
			{
				$("#bill_category").text(" "+"Self");
			}
			else
			{
				$("#bill_category").text(" "+r.listRegTreBillDto[0].sourceTypeId);
			}
			$("#age").text(r.listRegTreBillDto[0].age);
			//$("#age").text(r.age);
			/*var docName=r.docName;
			var res = docName.split(',');
			var dname = res[0];*/
			$("#doctor_id").text(" "+r.listRegTreBillDto[0].doctorId)
			$("#gender").text(" "+r.listRegTreBillDto[0].gender);
			/*var Doadate = new Date(r.createdDateTime).toLocaleString();
			var prdate=Doadate.split(',');
			var dateD=GetFormattedDate(new Date(prdate[0]),"ddmmyyyy").toLocaleString();
			var date=dateD+","+prdate[1];*/
			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');
			//set hidden date +
			var dd=date.split(',');
			$("#dob").text(dd[0]);
			if(r.listRegTreBillDto[0].docNameChan == null || r.listRegTreBillDto[0].docNameChan == "null"||r.listRegTreBillDto[0].docNameChan == ""||r.listRegTreBillDto[0].docNameChan == undefined)
				{
				$("#ref_dr_name").text("");	
				}
				else
				{
				$("#ref_dr_name").text(" "+r.listRegTreBillDto[0].docNameChan);
				}
			$("#bill_id").text(" "+r.listRegTreBillDto[0].billId);
			//$("#pdob").val(" "+r.dob);
			$("#patientId").val(" "+r.listRegTreBillDto[0].patientId);
			var fileName=r.listRegTreBillDto[0].imageName;	
			if(fileName == null ||fileName == "null"||fileName ==""|| fileName == undefined)
				{
				
				}
			else
				{
				$('#patientImg').attr('src','pharmacy/pharmacy/readImage?url='+ r.imageName);
				}
			
 		}
	});
	return deptID;
}
function getConsultantDrNam(treatmentId) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId
		},
		url : "ehat/registration/getConsultantDrName",
		success : function(r) {
			var doc_name="";
			if(r.lstDoctorDto!=null){
			for ( var i = 0; i < r.lstDoctorDto.length; i++) {
					doc_name=doc_name+","+r.lstDoctorDto[i].doc_name;
				}
			}
			
			$("#previousapp").text(doc_name);
		}
	});
}
function closeImmunizationCharts()
{
	$("#ddchart").hide('slow');	
}

function immunizationCharts()
{
	$("#ddchart").show('slow');	
//   var treatmentId = $.trim($('#tr_Id').val()); 
   var patientId = $.trim(($("#pt_Id").val()));
	
	var inputs = [];
	inputs.push('patientId=' + encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/doctordeskchartscontroller/fetchimmunizationmaster",
		url : "ehat/doctordeskchartscontroller/fetchimmunizationmasterOnDoctordesk",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setFetchImmunizationConfig(r);
			fetchImmunizationconPatient();
		}
	});
}
/************************************************/


function setFetchImmunizationConfig(r)
{
	
	var htm ="";
	var index=1;
	var count=0;
	var date=new Date();	
	var date1=new Date(3);	
	var fromdate=new Date();
	var dateString=$("#pdob").val();
	
	
	if(dateString == null || dateString == undefined || dateString == "")
		{
		var dobp=$("#age").text();
		var dobp_year = dobp.split('Y');
		var now=new Date();
		 dateString = new Date(now.getFullYear()-dobp_year[0],now.getMonth(),now.getDay());
		 
		/* alert("BDay:"+dateString); */
		}
	else
		{
		var res=dateString.split('/');
		var days=res[0];
		var month=res[1];
		var year=res[2];
		var date=new Date(month+"/"+days+"/"+year);
		dateString=date;
		/* alert("age:"+date); */
		}
	
	var bdate=dateString;
	var datech=new Date(dateString);
	
		for ( var i = 0; i < r.list.length; i++) {	
			htm = htm +'<tr> '
		+ " <td class='col-md-1 center'>"+index+'</td>'
		if(r.list[i].day == 0 && r.list[i].weeks == 0 && r.list[i].months == 0 &&   r.list[i].year == 0)
		{
		htm = htm + " <td class='col-md-2-1 center'>At Birth</td>"
		}
		else if(r.list[i].day != 0)
		{
		fromdate=bdate.setDate(bdate.getDate() + r.list[i].day );
		var date=new Date(datech);
		dateString=date.setDate(date.getDate() + r.list[i].max_day);  
		
		htm = htm + " <td class='col-md-1 center' style='background: #DAEDFF;'>"+r.list[i].day+" to "+r.list[i].max_day+" days"+"</td>"
		}
	else if(r.list[i].weeks != 0)  
		{	
		fromdate=bdate.setDate(bdate.getDate() + (r.list[i].weeks * 7));
		var date=new Date(datech);
		dateString=date.setDate(date.getDate() + ( r.list[i].max_weeks * 7));
		htm = htm + " <td class='col-md-1 center' style='background: #C2E0FF;'>"+r.list[i].weeks+" to "+r.list[i].max_weeks+" weeks"+"</td>"
		}
	else if(r.list[i].months != 0)
		{
		fromdate=bdate.setDate(bdate.getDate() + (r.list[i].months * 30));
		var date=new Date(datech);
		dateString=date.setDate(date.getDate() + ( r.list[i].max_months * 30));
		htm = htm + " <td class='col-md-1 center' style='background: #AAD4FF;'>"+r.list[i].months+" to "+r.list[i].max_months+" months"+"</td>"
		}
	else if(r.list[i].year != 0)
		{
		fromdate=bdate.setDate(bdate.getDate() + (r.list[i].year * 365));	
		var date=new Date(datech);
		dateString=date.setDate(date.getDate() + ( r.list[i].max_year * 365));
		htm = htm + " <td class='col-md-1 center' style='background: #91C8FF;'>"+r.list[i].year+" to "+r.list[i].max_year+" year"+"</td>"
		}
	
		if(r.list[i].mandatory_flag == 'Y'){
			if(r.list[i].gender == 'ALL')
				{
			htm = htm+ "<td class='col-md-2 center' id='vaccinename"+index+"'>"+r.list[i].vaccine+" <b style='color: red; padding-left: 3px;'>*</b><sup><i class='fa fa-users'></i></sup></td>"
				}
			else if(r.list[i].gender == 'MALE')
				{
				htm = htm+ "<td class='col-md-2 center' id='vaccinename"+index+"'>"+r.list[i].vaccine+" <b style='color: red; padding-left: 3px;'>*</b><sup><i class='fa fa-male'></i></sup></td>"
				}
			else if(r.list[i].gender == 'FEMALE')
				{
				htm = htm+ "<td class='col-md-2 center' id='vaccinename"+index+"'>"+r.list[i].vaccine+" <b style='color: red; padding-left: 3px;'>*</b><sup><i class='fa fa-female'></i></sup></td>"
				}
			}
		else
			{
			if(r.list[i].gender == 'ALL')
			{
		htm = htm+ "<td class='col-md-2 center' id='vaccinename"+index+"'>"+r.list[i].vaccine+" <sup><i class='fa fa-users'></i></sup></td>"
			}
		else if(r.list[i].gender == 'MALE')
			{
			htm = htm+ "<td class='col-md-2 center' id='vaccinename"+index+"'>"+r.list[i].vaccine+" <sup><i class='fa fa-male'></i></sup></td>"
			}
		else if(r.list[i].gender == 'FEMALE')
			{
			htm = htm+ "<td class='col-md-2 center' id='vaccinename"+index+"'>"+r.list[i].vaccine+" <sup><i class='fa fa-female'></i></sup></td>"
			}
			}
		var date1=new Date(fromdate);
		var date2=new Date(dateString);
		htm = htm + " <td class='col-md-1 center' id='fromdate"+index+"'>"
	//	+date1.toLocaleDateString()
		+r.list[i].vaccineFromDate
		+"</td>"
		+ " <td class='col-md-1 center' id='todate"+index+"'>"
		//+date2.toLocaleDateString()
		+r.list[i].vaccineToDate
		+"</td>"
		
		var giDate=new Date(date1);
		var tDate=new Date(date2);
		var millisecondsPerDay = 1000 * 60 * 60 * 24;
		var Difference_In_Time = giDate.getTime() - tDate.getTime(); 
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		var days=Difference_In_Days/2;
		var date4=new Date(giDate);
		date4=date4.setDate(date4.getDate() - (days));
		var date5=new Date(date4);
		//var date5=new Date(date4);
		
		/*htm = htm+ " <td class='col-md-2 center' id='duedate"+index+"'>" 
		+date5.toLocaleDateString()
		+"</td>";*/
		
		
		
		
		htm = htm+ " <td class='col-md-2 center'>"
		
		+'<input type="text" style="width:80%;" class="from-group "   name="givendatename'+index+'"	placeholder="Given Date" 	onclick=datePickerSet('+index+') id="givendate'+index+'" value="">'
		+"</td>";
		
		htm = htm+ " <td class='col-md-2 center'>" 
		
		+'<input type="text" style="width:80%;" class="from-group "   name="duedatename'+index+'"	placeholder="Due Date" 	onclick=datePickerSetDueDate('+index+') id="duedate'+index+'" value="">'
		+"</td>";
		
		
		htm = htm	+ " <td class='col-md-2-1 center'>"
		+'<input type="hidden" id="immunizationmasterid'+index+'" value='+r.list[i].immunizationconfiguration_id+'>'
		+'<input type="hidden" id="immunizationid'+index+'" value="">'
		+'<input type="text" style="width:100%;"  	placeholder="vaccine Status"   id="vaccinestatus'+index+'" value="">'
		
		+"</td>'" 
		
		htm = htm	+ " <td class='col-md-2-1 center'>"
		
		+'<input type="text" style="width:100%;"  	placeholder="vaccine Status"   id="vaccinedetails'+index+'" value="">'
		+"</td>'" 
		
		+"</tr>";		
		/* + '</tr>'; */
		index++;
		count=0;
		var date3=new Date(datech);
		bdate=date3;
		tdate=date3;
		date4=giDate;
		
		}
		$("#setfetchimmunizationconfigcharts").html(htm);
		$("#setimmunizationconfigcount").val(index);

		

}
var isfirst=0;
function datePickerSet(startIndex)
{
	

	 $("#givendate"+startIndex).datepicker({
		 format: "mm/dd/yyyy",
		  autoclose: true
		
		}).on('changeDate', function () {
			
				 setTimeout( function(){ 
			 		    // Do something after 1 second 
			 		 setFromToDate(startIndex);
			 		 
			 		
			 		  }  , 500 );	   
        });
	
}
function setFromToDate(startIndex)
{
	
	if(isfirst <= 0)
		{
		//alert("true first"+isfirst);
		
	
	var givendate=$("#givendate"+startIndex).val();
	//alert("givendate:"+givendate);
	if(givendate == null || givendate == undefined || givendate == "")
	{
		alert("Please Given Select Date.");
		return false;
	}
	var duedate=$("#duedate"+startIndex).text();
	//alert("duedate:"+duedate);
	var giDate=new Date(givendate);
	var duDate=new Date(duedate);
	//alert("giDate:"+giDate);
	//alert("duDate:"+duDate);
	var millisecondsPerDay = 1000 * 60 * 60 * 24;
	var Difference_In_Time = giDate.getTime() - duDate.getTime(); 
	//alert("Difference_In_Time:"+Difference_In_Time);
	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	if(Difference_In_Days < 0)
		{
		isfirst=10;
		$("#givendate"+startIndex).val('');
		alert("Please Select max Given Date.")
		return false;
		}
	//alert("day:"+Difference_In_Days);
	var days=Difference_In_Days/2;
	var count=$("#setimmunizationconfigcount").val();
	startIndex++;
	for(var i=startIndex;i < count;i++)
	{
		var fromdate=$("#fromdate"+i).text();
		var todate=$("#todate"+i).text();
		var duedate=$("#duedate"+i).text();
		var gDate=new Date(fromdate);
		var tdate=new Date(todate);
		var dudate=new Date(duedate);
		gDate=gDate.setDate(gDate.getDate() + (Difference_In_Days));
		tdate=tdate.setDate(tdate.getDate() + (Difference_In_Days));
		dudate=dudate.setDate(dudate.getDate() + (Difference_In_Days));
		var date1=new Date(gDate);
		var date2=new Date(tdate);
		var date3=new Date(dudate);
		
		$("#fromdate"+i).text(date1.toLocaleDateString());
		$("#todate"+i).text(date2.toLocaleDateString());
	    $("#duedate"+i).text(date3.toLocaleDateString());
		/*alert("gievn "+i+":"+date1.toLocaleDateString());
		alert("to "+i+":"+date2.toLocaleDateString());
		alert("due "+i+":"+date3.toLocaleDateString());*/
		
	}
	isfirst='ABC';
	return false;
		}
	else
	{
		//alert("flase first:"+isfirst);
		isfirst=0;
		return false;
	}
}
function toggleEntryDivInstruction() {
	
	$("#formDivDrug").hide();
	$("#divForEntry3").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	$("#ddinstruction").show();
	onclickInst();//added by arpit
}

function saveImmunizationPatient()
{
//	var treatmentId=$("#treatmentId").val();
//	var patientId=$("#patientId").val();
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var patientId = $.trim($('#pt_Id').val());
	var unitId=$("#unitId").val();
	var userId=$("#uids").val();
	
	var count=$("#setimmunizationconfigcount").val();
	var immpatient = 0;
	immpatient = {
			list : []
	};
	for(var i=1;i < count;i++)
		{
		var immunizationmasterid=$("#immunizationmasterid"+i).val();
		var vaccinename=$("#vaccinename"+i).text();
		var fromdate=$("#fromdate"+i).text();
		var todate=$("#todate"+i).text();
		var givendate=$("#givendate"+i).val();
		var duedate=$("#duedate"+i).val();
		var vaccinestatus=$("#vaccinestatus"+i).val();
		var vaccinedetails=$("#vaccinedetails"+i).val();
		
		
		if(givendate == null  || givendate == undefined || givendate == "")
		{
			givendate="";
		}
		else
		{
			if(duedate == null || duedate == undefined || duedate == "")
			{
				//alert("Please Select Due Date"+i);
				//return false;
				duedate="";
			}
			else
			{
				if(vaccinestatus == null || vaccinestatus == undefined || vaccinestatus == "")
				{
				alert("Please Enter vaccine status");
				return false;
				}
			}
		}
		
		if(vaccinedetails == null || vaccinedetails == "null" || vaccinedetails == undefined || vaccinedetails == "undefined"){
			vaccinedetails="";
		}
		
		var immunizationid=$("#immunizationid"+i).val();
	
		immpatient.list.push({
			"immunizationconfiguration_id" : immunizationmasterid,
			"vaccinename" : vaccinename,
			"fromdate" :fromdate,
			"todate" : todate,
			"givendate" : givendate,
			"duedate" : duedate,
			"vaccinestatus" : vaccinestatus,
			"i_id":immunizationid,
		
			"treatment_id" : treatmentId,
			"patient_id" : patientId,
			"createdBy": userId,
			"unitId":unitId,
			"vaccinedetails" : vaccinedetails
			
		});
		}
	immpatient = JSON.stringify(immpatient);
	/* alert(immpatient); */
	
	var inputs = [];
	inputs.push('immpatient=' + encodeURIComponent(immpatient));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskchartscontroller/saveimmunizationconpatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Saved Sucessfully");				
					
			}
			else {
				alertify.error("Oops Some Problem Ocured");
			}
		}
	});
}

function fetchImmunizationconPatient(){
	
//	var treatmentId=$("#treatmentId").val();
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskchartscontroller/fetchimmunizationconpatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			fetchImmunizationPatientInfo(r);
		}
	});
}

function fetchImmunizationPatientInfo(r)
{
	var index=1;
	var count=$("#setimmunizationconfigcount").val();
	for(var i=0;i < r.list.length;i++)
		{
		$("#immunizationid"+index).val(r.list[i].i_id);
		$("#givendate"+index).val(r.list[i].givendate);
		$("#fromdate"+index).text(r.list[i].fromdate);
	    $("#todate"+index).text(r.list[i].todate);
	
	    $("#duedate"+index).val(r.list[i].duedate);
		$("#vaccinestatus"+index).val(r.list[i].vaccinestatus);
		$("#vaccinedetails"+index).val(r.list[i].vaccinedetails);
		index++;
		}
}
/** ********************************************************************** */

function ddformulapopup() {

	var temp = '<div style="margin-top: 5%; margin-left: 10%; padding: 5px;" class="modal-dialog col-md-12">'
			+ '<div class="modal-content" style="height: 500Px;width: 1173px;">'
			+ '<div style="margin: 0px; padding: 10px;" class="col-md-12">'
			+ '<div style="float: right; padding-right: 6px;"><button type="button" data-dismiss="modal" class="btn btn-xs btn-danger">'
			+ '<i class="fa fa-arrows"></i> Close</button></div></div>'
			+ '<div style="background-color: #EEEEEE; padding: 5px; height: 34px;" class="col-md-12">'
			+ '<div style="margin-top: 20px" class="col-md-12-1"><div class="col-md-1" style="font-weight: bold;">Search'
			+ 'By:</div><div class="col-md-2">Formula Name:</div>'
			+ '<div class="col-md-6 ">'
			+ '<input type="text"  id="byNameIPH" onkeyup="ddcalculateFormula(this.id,\'Search\');" class="form-control input-SmallText " autocomplete="off" style="">'
			+ '</div><div style="text-align: center;" class="col-md-1"><input type="button" onclick="ddcalculateFormula(\'byNameIPH\',\'Search\')" class="btn btn-xs btn-primary" value="search">'
			+ '</div></div><div style="margin: 0px" class="col-md-12"><table style="margin-top: 10px;" class="table table-condensed"><thead>'
			+ '<tr style="background-color:silver"><th class="col-md-1-1 "><div class="TextFont">#</div></th>'
			+ '<th class="col-md-3-1 center"><div class="TextFont">Formula Name</div></th>'
			+ '<th class="col-md-3-1 center"><div class="TextFont">Formula</div></th>'
			+ '<th class="col-md-2-1 center"><div class="TextFont">Answer</div></th>'
			+ '<th class="col-md-3-1 center"><div class="TextFont">Validation</div></th>'
			+ '</tr></thead><tbody id="DRRDivformula"></tbody></table></div>'
		/*
		 * + '<div style="overflow-y: scroll; height: 375px; maxheight: auto;
		 * margin-top: -22px;" class="col-sm-12-1" id="flip-scroll">' + '<table
		 * class="table table-bordered cf">'
		 */
			/*
			 * + '<tr >' +'<td class="col-sm-1-1 "><div class="TextFont">1</td>' +'<td class="col-sm-3-1 ">BMI</td>' +'<td class="col-sm-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >' + '<tr >' +'<td class="col-md-1-1 ">2</td>' +'<td class="col-md-3-1 ">ECG</td>' +'<td class="col-md-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >' + '<tr >' +'<td class="col-md-1-1 ">3</td>' +'<td class="col-md-3-1 ">XRAY</td>' +'<td class="col-md-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >' + '<tr >' +'<td class="col-md-1-1 ">4</td>' +'<td class="col-md-3-1 ">BSA</td>' +'<td class="col-md-5-1 "><input
			 * type="text" id="txtformulaname" class="form-control
			 * input-SmallText"></td>' +'<td class="col-sm-3-1 "></td>' + '</tr >'
			 */
			/*
			 * + '</table></div>
			 */			+'</div></div></div></div>';

	// $("#ddformula").modal("show");
	$("#formulapopupdiv").html(temp);
	$('#formulapopupdiv').modal('show');
	

	ddcalculateFormula("0", "onload");
}

function ddcalculateFormula(id, callfrom) {

	var inputs = [];
	var pid = $("#patientId").val();
	var tid1 = $("#treatmentId").val();
	var letter = "";
	var formulaId = "0";
	if (callfrom == "Search") {
		letter = $("#" + id).val();
	}
	inputs.push('letter=' + letter);
	inputs.push('pid=' + pid);
	inputs.push('tid=' + tid1);
	// push the string to controller
	inputs.push("formulaId=" + formulaId);
	inputs.push("callfrom=" + callfrom);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/formulacontroller/doctordeskcalculateFormula",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if (callfrom == "onload") {
				ddsetTemplateForFormulaDR(r);
			} else {
				ddsetTemplateForFormulaDR(r);
				ddautoCompTableForFormulaDR(r, id);
			}
		}
	});
}

function ddsetTemplateForFormulaDR(r) {

	var formulahtm = "";
	for ( var int = 0; int < r.listFormula.length; int++) {

		formulahtm = formulahtm
				+

				'<tr>'
				+ '<td id="row'
				+ (r.listFormula[int].formulaId)
				+ '" class="col-sm-1-1 center">'
				+ (int + 1)
				+ '</td>'
				+ '<td id="listFormulaName'
				+ (r.listFormula[int].formulaId)
				+ '" class="col-sm-3-1 center">'
				+ (r.listFormula[int].formulaName)
				+ ' </td>'
				+ '<td id="listFormula'
				+ (r.listFormula[int].formulaId)
				+ '" class="col-sm-3-1 center">'
				+ (r.listFormula[int].formula)
				+ ' </td>'
				+ '<td class="col-sm-2-1 center"><input type="text" id="txtFormulaResult"  style="text-align: right"  class="form-control input-SmallText" value="'
				+ (r.listFormula[int].result)
				+ '"></td>'
				+ '<td class="col-md-3-1 center" ><label   class=" control-label"><font color="red">'
				+ (r.listFormula[int].valdation) + ' </font></label></td>'
				+ '</tr>';
	}
	
	$("#DRRDivformula").html(formulahtm);
	
}
function ddautoCompTableForFormulaDR(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
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
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'Formula Name',
					width : '100px',
					valueField : 'formulaName'
				}, /*
					 * { name : 'TempCode', //width : '80px', valueField :
					 * 'TempCode' }
					 */],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
						// $('#results').text(ui.item ? 'Selected: ' +
						// ui.item.dn + ', '+ spl + ', '+
						// ui.item.specialisationName + ', ' + ui.item.depNm:
						// 'Nothing selected, input was ' + this.value);
						// $('#' + id).val(ui.item.dn);
						// $('#userDocId').val(ui.item.ui);
						// $('#selectedObj').html(JSON.stringify(ui.item));
						$('#byNameIPH').val(ui.item.formulaName);
					}
					/*
					 * This function use for Enter keypress search
					 */
					ddcalculateFormula(id, 'Search');

					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					// console.log(data.listFormula.length);
					var result;
					if (!data || data.listFormula.length === 0
							|| !data.listFormula
							|| data.listFormula.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/* 'dn' : 'No', */
							'formulaName' : 'Record Not Found',
							'Formula' : 'Found',
						/* 'depNm' : 'Match' */
						} ];
					} else {
						result = data.listFormula;// Response List for All
						// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

function printImmunizationChart(callFrom){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var printTitle="Vaccination Details";
	
	var unitId = $("#unitId").val();
	var patientName = $("#patientName").text();

	 var instructionLanguage = "MARATHI";
	
	window.open("immunization_print.jsp?treatmentId="+treatmentId+"&instructionLanguage="+instructionLanguage+"&CallFrom="+callFrom+"&unitId="+unitId+"&printTitle="+printTitle+"&patientName="+patientName);
}

function datePickerSetDueDate(startIndex)
{
	

	 $("#duedate"+startIndex).datepicker({
		 format: "mm/dd/yyyy",
		  autoclose: true
		
		}).on('changeDate', function () {
			
				 setTimeout( function(){ 
			 		    // Do something after 1 second 
			 		 //setFromToDate(startIndex);
			 		 
			 		
			 		  }  , 500 );	   
        });
	
}

