/************
* @author	: Badrinath Wagh
* @codeFor	: To set Patient Search Type
 ************/
function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient UHID Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$("#byName").attr("minlength", "10");
		$("#byName").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient AddharNo Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}
}

/************
* @author	: Badrinath Wagh
* @codeFor	: To set Patient Search Type
 ************/
function setPatientSearchType11(){
	
	$("#byName1").val("");
	var patSearchType = $("#patSearchType11").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient UHID Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$("#byName").attr("minlength", "10");
		$("#byName").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient AddharNo Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}
}


/************
* @author	: Badrinath Wagh
* @codeFor	: To get Physical Discharged Of Patient
 ************/
function physicalDischargeToIpd(){
	var date = $("#discharge_date").val();
    var time = $("#discharge_Time").val();
    
    if (date == "" || date == null|| date == undefined ) {
        alert("Please select Date");
        return false;
    }
    if (time == "" || time == null || time == undefined ) {
        alert("Please select Time");
        return false;
    }
    var treatId = $("#tr_Id").val();
    var inputs = [];    
    inputs.push('treatmentId=' + treatId);
    var str = inputs.join('&');
    jQuery.ajax({
        type : "POST",
        url : "ehat/ipdGenFinalBill/physicalDischargeIpd",
        data    : str + "&reqType=AJAX",
        error : function() {
            alert('error');
        },
        success : function(r) {
            if(r == 1){
                alert("Discharged Successfully");
            }
        }
    });    
}

function setIpdPhysDischTemp(res){
//	alert("lstDoctorDto "+JSON.stringify(res));
	var risingFlow = $("#risingFlow").val();
	
	var count=1;
	var ipdqueueTemp = "<div class='col-sm-12' style='margin-top:-21px; height: 350px; max-height: auto;'>"
		+ "<table class='table table-condensed table-stripped cf' style='overflow-x: scroll;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>#</th>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 7%;'>Mrn No</th>"

		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Patient Name</th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 5%;'>Patient ID</th>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;margin-right:1px;'>Mobile No</th>"

		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 3%;'>Age</label></th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 3%;'>Weight</label></th>"
		
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Admission No</label></th>"
		+ "<th class='col-sm-1'style='height: 21.5px; width: 3%;'>Admission Date/Time</label></th>"
		+ "<th class='col-sm-1'style='height: 21.5px; width: 3%;'>Doctor Name</label></th>"
	
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Ward</th>"
    	+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Hall</th>"
    	+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Self/Sponsor</th>"
		+ "<th class='col-sm-1 center' style='height: 21.5px; width: 4%;'>Bed No</th>"
		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Action</th>";

		+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Print</th>"  // hide for some time
		
		 if(risingFlow == "off"){
			 
			 ipdqueueTemp = ipdqueueTemp + "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>View Bill</th>";
		 }
		
		 ipdqueueTemp = ipdqueueTemp + "</tr>";

	
	for(var indx=0;indx<res.lstIpdbillPatients.length;indx++){
		
		var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
		
		var strVale = res.lstIpdbillPatients[indx].doctorId;
		//alert("strVale"+strVale);
		var array = strVale.split(",");
		
		
		var fullName=res.lstIpdbillPatients[indx].patientName;
		var datetime= new Date(res.lstIpdbillPatients[indx].createdDateTime).toLocaleString('en-GB');
		var NoDoct ="No Doctor";
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"+count+"</td>"
		+ "	<td class='col-sm-1' id='mrnno"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].mrnno+"</td>"

		+ "	<td class='col-sm-1' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+fullName+"</td>"
		+ "	<td class='col-sm-1 center' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].pId+"</td>"
		+ "	<td class='col-sm-1' id='divPi"+count+"' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].mobile+"</td>"

		
		+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].patientAge+"</td>"

		+ "	<td class='col-sm-1 center'  style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].weight+"</td>"
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].opdipdno+"</td>"

		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+datetime+"</td>";
		
	
		if (strVale !="") {
			
			if (array.length == 1) {
				for ( var k in array) {

					for ( var g = 0; g < res.lstDoctorDto.length; g++) {

						if (array[k] == 0) {
							ipdqueueTemp = ipdqueueTemp
									+ '<td class="col-sm-1" style="height: 21.5px; width: 3%;">'
									+ NoDoct + '</td>';
								break;
						}
						if (array[k] == res.lstDoctorDto[g].doctor_ID) {
							ipdqueueTemp = ipdqueueTemp
									+ '<td class="col-sm-1" style="height: 21.5px; width: 3%;">'
									+ res.lstDoctorDto[g].doc_name + '</td>';

						}
					}
				}
			} /*else if(array.length > 1) {
				ipdqueueTemp = ipdqueueTemp
						+ '<td class=" col-sm-1" style="height: 21.5px; width: 3%;">'
						+ '<div class="dropdown">'
						+ ' <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">'
						+ '<span class="caret"></span></button>'
						+ '<ul class="dropdown-menu">';
				for ( var k in array) {

					for ( var g = 0; g < res.lstDoctorDto.length; g++) {

						if (array[k] == res.lstDoctorDto[g].doctor_ID) {
							ipdqueueTemp = ipdqueueTemp + '<li>'
									+ res.lstDoctorDto[g].doc_name + '</li>';

						}
					}
				}
				ipdqueueTemp = ipdqueueTemp + '</ul> </div> </td>';
			}*/
			else{
				ipdqueueTemp = ipdqueueTemp 
						+ '<td class="col-sm-1" style="padding:5px;width:10%;"><button style="font-size:10px" onclick="showDoctors2('+indx+');">'
						+ 'Show Doctors <i  style="font-size:15px;color:SteelBlue;"  id="shBillView'+indx+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="ipdList'+indx+'" class="box border" style="display:none;overflow-y: scroll;padding:5px; width:150px;"> '
						+ '<table>' 
						+ '<tr> ' + '<th width="505Px"> Doctor Name  </th> </tr>';
			
				for ( var k in array) {

					for ( var g = 0; g < res.lstDoctorDto.length; g++) {

						if (array[k] == res.lstDoctorDto[g].doctor_ID) {
							ipdqueueTemp = ipdqueueTemp + '<tr><td>' + res.lstDoctorDto[g].doc_name+'</td>'
							+ '</tr>';
									/*+ res.lstDoctorDto[g].doc_name + '</li>';*/

						}
					}
				}
				ipdqueueTemp = ipdqueueTemp +  '</table></div></td>';
			}
			
		}
		else {
			
			ipdqueueTemp = ipdqueueTemp
					+ '<td class=" col-sm-1" style="height: 21.5px; width: 3%;">'+NoDoct+'</td>';

		}
		
		
		ipdqueueTemp = ipdqueueTemp
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].hallTypeName+"</td>"
		+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].hname+"</td>";
		
		if(res.lstIpdbillPatients[indx].sourceTypeId==0)
			{
				ipdqueueTemp = ipdqueueTemp
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>Self</td>";
			}
		else
			{
				ipdqueueTemp = ipdqueueTemp 
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].categoryName+"</td>";
			}
		ipdqueueTemp = ipdqueueTemp 
		+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"+res.lstIpdbillPatients[indx].bedName+"</td>"

		+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"

		+ "<button onclick=viewBedWard("+res.lstIpdbillPatients[indx].treatId+",'"+phyDisFlag+"') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>";
		
		+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
		+ "<button onclick=printIPDFormJsp("+res.lstIpdbillPatients[indx].pId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"  // hide for some time
		
		+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
		+ "<button onclick=viewBillForIPDFinalBill("+res.lstIpdbillPatients[indx].treatId+",'finalBill') class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"
		
		if(risingFlow == "off"){
			
			ipdqueueTemp = ipdqueueTemp + "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"
			+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
			+ count + "' " + "		onclick=gotoBill("+ res.lstIpdbillPatients[indx].treatId +","+ res.lstIpdbillPatients[indx].inCount+",'"+phyDisFlag+"') style='font-size: 10px;' />" 
			+ "	</td>";
		}
				
		ipdqueueTemp = ipdqueueTemp + "</tr>";	
		+ "</thead>"
		+ "</table>"
		+ "</div>";
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
}

/************
* @codeFor	: To get list of Physical Discharge Patient For IPD tab
 ************/
function getPhysicalDischargedPatient(callform){
	$('#callfrom').val("physical");
	var inputs = [];
	 inputs.push("callform="+ callform);
	 inputs.push("wardType="+ 0);
	 inputs.push("hallTypeSelectId="+ 0);
	 inputs.push("ward="+ "-");
	 inputs.push("letter="+ "");
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdGenFinalBill/viewIpdDischargedPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			setIpdPhysDischTemp(r);
		}
	});
}


/************
* @codeFor	: To get list of Physical Discharged Patient For IPD General Bill tab
 ************/
function getPhyDisBillingPatient(callform,id) {
	var startIndex = 0;
	var ward="-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if(id=="hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType=$("#wardType1").val();    
	var hallTypeSelectId=$("#hallTypeSelectID").val();
	
	if(wardType==null){
		
		wardType=0;
	}
	
	if(hallTypeSelectId==null){
		
		hallTypeSelectId=0;
	}
	
	var inputs = [];
	inputs.push("callform="+ callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/viewIpdBillingDischargedPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			//alert(JSON.stringify(r));
			setIpdbillPatientsTemp(r);
		}
	});
}

/************
* @codeFor	: To get list of Physical Discharged Patient For IPD Final Bill Tab
 ************/
/*function getPhyDisPatientsFinalBill(callform,id){

	var ward="-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if(id=="hallTypeSelectID"){
		ward = "bothwise";
	}
	var wardType=$("#wardType1").val();    
	var hallTypeSelectId=$("#hallTypeSelectID").val();
	
	if(wardType==null){
		
		wardType=0;
	}
	
	if(hallTypeSelectId==null){
		
		hallTypeSelectId=0;
	}
	
	var inputs = [];
	inputs.push("callform="+ callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/viewIpdBillingDischargedPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setIpdbillPatientsTempFinalBill(r);
		}
	});
}*/

function searchIPDPatients(inputId,callform){
	var ipdActive=$('#ipdactive').attr('class');
	//var ipdPhyDisch=$('#ipddischarged').attr('class');
	var callform=$('#callfrom').val();
	if(callform=="list"){
		autosuggesstionIpdBillPatients23(inputId, 'search');
	}else if(callform=="physical"){
		autoPhysicalDischargPat(inputId, 'phydis');
	}
	else{
		autosuggesstionIpdBillPatientsBlockWise();
	}
	
}

/************
* @codeFor	: Search For IPD Physical Discharged Patients
 ************/
function autoPhysicalDischargPat(inputId,callform) {/*
	var usertype = "";
	var letter="";
	if (callfrom ="phydis") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	
	var inputs = [];	
	inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('finalBill=' + "all");
	inputs.push('letter=' + letter);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/physicalDischarge/autoPhyDisPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			if(letter=="" || letter==" " ){
				getPhysicalDischargedPatient('IPDDischarge');
			}else{
				setIpdPhysDischTemp(r);
			}
			
		}
	});
*/
	var findingName = $("#" + inputId).val();
	//alert(findingName);
	//return false;
	var inputs = [];
	 inputs.push("callform="+ callform);
	 inputs.push("wardType="+ 0);
	 inputs.push("hallTypeSelectId="+ 0);
	 inputs.push("ward="+ "-");
	 inputs.push("letter="+ findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdGenFinalBill/viewIpdDischargedPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			setIpdPhysDischTemp(r);
		}
	});
	
}

function searchIPDBillPatients(inputId,callform){
	
	var ipdBillPatient=$('#ipdbillpat').attr('class');
	//var ipdBillPhyDisch=$('#ipdbillphydispat').attr('class');
	if(ipdBillPatient=="active"){
		autosuggesstionIpdBillPatTemp(inputId, 'auto');
	}else{
		autoForIpdBillDischargedPat(inputId, 'ipdbillphydis');
	}
	
}

/************
* @codeFor	: Search For IPD General Bill Physical Discharged Patients
 ************/
function autoForIpdBillDischargedPat(inputId,callfrom) {
		var finalBill="generalBill";
		var usertype = "";
		var letter="";
		var startIndex = 0;
		if (callfrom ="search") {
			letter=$("#byName").val();
		}
		var findingName = $("#" + inputId).val();
		
		var inputs = [];	
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		inputs.push('finalBill=' + finalBill);
		inputs.push('startIndex=' + startIndex);
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "ehat/ipdGenFinalBill/autoPhyDisIPDBillPatients",
			timeout : 1000 * 60 * 15,
			cache	: false,
			success : function(r) {
				if(letter=="" || letter==" " ){
					getPhyDisBillingPatient();
				}else{
					setIpdbillPatientsTemp(r);
				}
			}
		});
	}

function searchIPDFinalBillPatients(inputId,callform){
	var ipdFinalBillPatient=$('#ipdfinalbillpat').attr('class');
	//var ipdFinalBillPhyDisch=$('#ipdfinalphydispat').attr('class');
	if(ipdFinalBillPatient=="active"){
		autosuggesstionIpdBillPatTempFinalBill(inputId, 'auto');
	}else{
		autoForIpdFinalBillPhyDisPat(inputId, 'ipdfinalbillphydis');
	}
	
}

/************
* @codeFor	: Search For IPD Final Bill Physical Discharged Patients
 ************/
function autoForIpdFinalBillPhyDisPat(inputId,callfrom) {
		var finalBill="finalBill";
		var usertype = "";
		var letter="";
		
		if (callfrom ="search") {
			letter=$("#byName").val();
			if($("#byid").is(':checked')){
				
				usertype="Y";	
			}else{
				usertype="N";
			}
		}
		var startIndex = 0;
		var findingName = $("#" + inputId).val();
		
		var inputs = [];	
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		inputs.push('finalBill=' + finalBill);
		inputs.push('startIndex=' + startIndex);
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "ehat/ipdGenFinalBill/autoPhyDisIPDBillPatients",
			timeout : 1000 * 60 * 15,
			cache	: false,
			success : function(r) {
				setIpdbillPatientsTempFinalBill(r);
			}
		});
	}

// code for searching of General IPD bill
function searchGeneralIpdBill(callfrom, letter, invoiceflag)
{
	var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null || wardType == "-") {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("letter=" + letter);
	inputs.push("invoiceflag=" + invoiceflag);
	inputs.push("callfrom=" + callfrom);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/searchIpdbillPatients",
		// timeout : 1000 * 60 * 15,
		// cache : false,
		success : function(r) {

			setIpdbillPatientsTemp(r);
		}
	});
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Get for ipd Final bill patients
 ******************************************************************************/

function getIpdBillPatientsFinalBillNew(callform, id, pageNumber) {
	var startIndex = 0;
	/*var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null) {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);*/
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	
	var unit_id = parseInt($("#unitId").val());
	//var callform ='ipd';
	var inputs = [];
	 inputs.push('unit_id=' + unit_id);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setTimeout(function(){
				setIpdbillPatientsTempFinalBill(r,callform,pageNumber);
			}, 50);
		}
	});
}
/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Set ipd Final queue template
 ******************************************************************************/

function setIpdbillPatientsTempFinalBill(res, callfrom, pageNumber) {
	var countAuto = (pageNumber - 1) + '0';
	countAuto = Number(countAuto) + 1;
	var count = 1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped table-bordered cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style=''><label class='TextFont' style='padding-left: 2px;'>Patient Name</label></th>"
			+ "<th class='col-md-3-1' style=''><label class='TextFont' style='padding-left: 2px;'>Sponsor Name</label></th>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont' style='padding-left: 2px;'>UHID</label></th>"

			+ "<th class='col-md-1-1' style=''><label class='TextFont' style='padding-left: 2px;'>Mobile No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 2px;'>MRN No</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 2px;'>Bill No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 2px;'>Bill Date</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 2px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 2px;'>View Bill</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "<tbody class='cf'>";
	if($(".activeLink").hasClass('active')){
	if(callfrom != "search")
	{
		for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {
	
			var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;		
			var fullName = res.lstIpdbillPatients[indx].patient_name;
			var categoryName = res.lstIpdbillPatients[indx].category_name;
			var BillDate = moment(res.lstIpdbillPatients[indx].inv_created_date_time).format("DD/MM/YYYY hh:mm");
			//var BillDate = new Date(res.lstIpdbillPatients[indx].inv_created_date_time).toLocaleDateString('en-GB');
			
			ipdqueueTemp = ipdqueueTemp
					+ "<tr>"
					+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
					+ countAuto
					+ "</td>"
					+ "	<td class='col-sm-3-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ fullName
					+ "</td>"
	
					+ "	<td class='col-sm-3-1' id='divSp"
					+ count
					+ "' style='height: 21.5px;'>"
					+ categoryName
					+ "</td>"
	
					+ "	<td class='col-sm-1-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].center_patient_id
					+ "</td>"
	
					+ "	<td class='col-sm-1-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mobile
					+ "</td>"
	
					+ "	<td class='col-sm-2-1 ' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mrnno
					+ "</td>"
	
					+ "	<td class='col-sm-2-1' id='divIc"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].invoice_count
					+ "</td>"
					
					+ "	<td class='col-sm-2-1' id='divIc"
					+ count
					+ "' style='height: 21.5px;'>"
					+ BillDate
					+ "</td>"
					
					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].opdipdno
					+ "</td>"
					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
					+ count + "' " + "		onclick=viewBillForIPDFinalBill("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ",'finalBill','"+phyDisFlag+"') style='font-size: 12px;' />" + "	</td></tr>";
	
			count = count + 1;
			countAuto++;
		}
		
		ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
		$("#ipdBill").html(ipdqueueTemp);
		
	}else{

		for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

			var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
			var fullName = res.lstIpdbillPatients[indx].patient_name;
			var categoryName = res.lstIpdbillPatients[indx].category_name;
			var BillDate = moment(res.lstIpdbillPatients[indx].inv_created_date_time).format("DD/MM/YYYY hh:mm");
			//var BillDate = new Date(res.lstIpdbillPatients[indx].inv_created_date_time).toLocaleDateString('en-GB');
			
			ipdqueueTemp = ipdqueueTemp
					+ "<tr>"
					+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
					+ countAuto
					+ "</td>"
					+ "	<td class='col-sm-3-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ fullName
					+ "</td>"

					// For Sonsor Name
					+ "	<td class='col-sm-3-1' id='divSp"
					+ count
					+ "' style='height: 21.5px;'>"
					+ categoryName
					+ "</td>"

					+ "	<td class='col-sm-1-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].center_patient_id
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mobile
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mrnno
					+ "</td>"
					
					+ "	<td class='col-sm-2-1' id='divIc"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].invoice_count
					+ "</td>"
					
					+ "	<td class='col-sm-2-1' id='divIc"
					+ count
					+ "' style='height: 21.5px;'>"
					+ BillDate
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].opdipdno
					+ "</td>"
					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
					+ count
					+ "' "
					+ "		onclick=viewBillForIPD("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
					+ "	</td>"

					/*+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
					+ count + "' " + "		onclick=printsForPatients("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ") style='font-size: 12px;' />" + "	</td>"*/

					+ "</tr>";

			count = count + 1;
			countAuto++;
		}
		
	}
	
	var numberOfRows="";
	  var indexopd=1;
	  var opdcount = res.finalBillCount;
	  var numberOfPages=(opdcount/10);
	  var displayPagination=numberOfPages;            
	  if(numberOfPages > 5){
	      numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	      displayPagination=5;
	  }
	  for(var j=0;j<displayPagination;j++){
		  if(j == Number(pageNumber-1))
	  		{
	  	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getIpdBillPatientsFinalBillNew('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

	  		}
	  		else
	  		{
	  	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getIpdBillPatientsFinalBillNew('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
	  		}
	  		indexopd=indexopd+1;
	  }
	  if(numberOfPages>6){
	      numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	  }
	 
	  $('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	  $('#opdpagenation').html(numberOfRows);
	 // $("#countopdpage").val(indexopd);
	
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBill").html(ipdqueueTemp);
	}
	
	else if ($(".activeLink1").hasClass('active')){
		if(callfrom != "search")
		{
			for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {
		
				var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;		
				var fullName = res.lstIpdbillPatients[indx].patient_name;
				var categoryName = res.lstIpdbillPatients[indx].category_name;
				var BillDate = moment(res.lstIpdbillPatients[indx].inv_created_date_time).format("DD/MM/YYYY hh:mm");
				//var BillDate = new Date(res.lstIpdbillPatients[indx].inv_created_date_time).toLocaleDateString('en-GB');		
				
				ipdqueueTemp = ipdqueueTemp
						+ "<tr>"
						+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
						+ countAuto
						+ "</td>"
						+ "	<td class='col-sm-3-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ fullName
						+ "</td>"
		
						+ "	<td class='col-sm-3-1' id='divSp"
						+ count
						+ "' style='height: 21.5px;'>"
						+ categoryName
						+ "</td>"
		
						+ "	<td class='col-sm-1-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].center_patient_id
						+ "</td>"
		
						+ "	<td class='col-sm-1-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].mobile
						+ "</td>"
		
						+ "	<td class='col-sm-2-1 ' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].mrnno
						+ "</td>"
		
						+ "	<td class='col-sm-2-1' id='divIc"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].invoice_count
						+ "</td>"
						
						+ "	<td class='col-sm-2-1' id='divIc"
						+ count
						+ "' style='height: 21.5px;'>"
						+ BillDate
						+ "</td>"
						
						+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].opdipdno
						+ "</td>"
						+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
						+ count + "' " + "		onclick=viewBillForIPDFinalBill("
						+ res.lstIpdbillPatients[indx].treatment_id
						+ ",'finalBill','"+phyDisFlag+"') style='font-size: 12px;' />" + "	</td></tr>";
		
				count = count + 1;
				countAuto++;
			}
			
			ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
			$("#ipdBill").html(ipdqueueTemp);
			
		}else{

			for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

				var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
				var fullName = res.lstIpdbillPatients[indx].patient_name;
				var categoryName = res.lstIpdbillPatients[indx].category_name;
				var BillDate = moment(res.lstIpdbillPatients[indx].inv_created_date_time).format("DD/MM/YYYY hh:mm");
				//var BillDate = new Date(res.lstIpdbillPatients[indx].inv_created_date_time).toLocaleDateString('en-GB');
				
				ipdqueueTemp = ipdqueueTemp
						+ "<tr>"
						+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
						+ countAuto
						+ "</td>"
						+ "	<td class='col-sm-3-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ fullName
						+ "</td>"

						// For Sonsor Name
						+ "	<td class='col-sm-3-1' id='divSp"
						+ count
						+ "' style='height: 21.5px;'>"
						+ categoryName
						+ "</td>"

						+ "	<td class='col-sm-1-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].center_patient_id
						+ "</td>"

						+ "	<td class='col-sm-2-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].mobile
						+ "</td>"

						+ "	<td class='col-sm-2-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].mrnno
						+ "</td>"
						
						+ "	<td class='col-sm-2-1' id='divIc"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].invoice_count
						+ "</td>"
						
						+ "	<td class='col-sm-2-1' id='divIc"
						+ count
						+ "' style='height: 21.5px;'>"
						+ BillDate
						+ "</td>"

						+ "	<td class='col-sm-2-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].opdipdno
						+ "</td>"
						+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
						+ count
						+ "' "
						+ "		onclick=viewBillForIPD("
						+ res.lstIpdbillPatients[indx].treatment_id
						+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
						+ "	</td>"

						/*+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
						+ count + "' " + "		onclick=printsForPatients("
						+ res.lstIpdbillPatients[indx].treatment_id
						+ ") style='font-size: 12px;' />" + "	</td>"*/

						+ "</tr>";

				count = count + 1;
				countAuto++;
			}
			
		}
		
		var numberOfRows="";
		  var indexopd=1;
		  var opdcount = res.finBillPhyDisCount;
		  var numberOfPages=(opdcount/10);
		  var displayPagination=numberOfPages;            
		  if(numberOfPages > 5){
		      numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		      displayPagination=5;
		  }
		  for(var j=0;j<displayPagination;j++){
			  if(j == Number(pageNumber-1))
		  		{
		  	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getIpdBillFinalBillPhyDis('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

		  		}
		  		else
		  		{
		  	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getIpdBillFinalBillPhyDis('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
		  		}
		  		indexopd=indexopd+1;
		  }
		  if(numberOfPages>6){
		      numberOfRows +="<li class='next' onclick='nextPaginationForFinPhyDis("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		  }
		 
		  $('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
		  $('#opdpagenation').html(numberOfRows);
		 // $("#countopdpage").val(indexopd);
		
		ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
		$("#ipdBillPatients").html(ipdqueueTemp);
		ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
		$("#ipdBill").html(ipdqueueTemp);
		}
}

function nextPaginationForFinPhyDis(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationForFinPhyDis("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getIpdBillFinalBillPhyDis('onload','-',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationForFinPhyDis("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationForFinPhyDis(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationForFinPhyDis("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getIpdBillFinalBillPhyDis('onload','-',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationForFinPhyDis("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Get for ipd General bill patients
 ******************************************************************************/
function getIpdBillPatients11(callform, id, pageNumber) {

	/*var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null || wardType == "-") {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);*/
	
	var startIndex = 0;
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	
	var unit_id = parseInt($("#unitId").val());
	//var callform ='ipd';
	var inputs = [];
	 inputs.push('unit_id=' + unit_id);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPatients",
		// timeout : 1000 * 60 * 15,
		// cache : false,
		success : function(r) {

			setTimeout(function(){
				setIpdbillPatientsTemp(r,callform,pageNumber);
			}, 50);
		}
	});
}

/*******************************************************************************
 * @codeFor : Set ipd queue template
 ******************************************************************************/
function setIpdbillPatientsTemp(res,callFrom,pageNumber) {
	if($(".activeLink").hasClass('active')){
	var countAuto = (pageNumber - 1) + '0';
	countAuto = Number(countAuto) + 1;
	var count = 1;
	var ipdqueueTemp = "";		
	
	$("#ipdBillPatients").html(" ");
	//$("#ipdBillPatients1").html(" ");
	
//	alert("leng===="+res.lstIpdbillPatients.length);
  if(callFrom != "search"){
	for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

		var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
		var fullName = res.lstIpdbillPatients[indx].patient_name;
		var categoryName = res.lstIpdbillPatients[indx].category_name;
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ countAuto
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"

				// For Sonsor Name
				+ "	<td class='col-sm-3-1' id='divSp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td>"

				+ "	<td class='col-sm-1-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].center_patient_id
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mobile
				+ "</td>"

				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].mrnno
				+ "</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ res.lstIpdbillPatients[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
				+ count
				+ "' "
				+ "		onclick=viewBillForIPD("
				+ res.lstIpdbillPatients[indx].treatment_id
				+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
				+ "	</td>"

				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
				+ count + "' " + "		onclick=printsForPatients("
				+ res.lstIpdbillPatients[indx].treatment_id
				+ ") style='font-size: 12px;' />" + "	</td>"

				+ "</tr>";

		countAuto++;
	}
  }else{

		for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

			var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
			var fullName = res.lstIpdbillPatients[indx].patient_name;
			var categoryName = res.lstIpdbillPatients[indx].category_name;
			ipdqueueTemp = ipdqueueTemp
					+ "<tr>"
					+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
					+ countAuto
					+ "</td>"
					+ "	<td class='col-sm-3-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ fullName
					+ "</td>"

					// For Sonsor Name
					+ "	<td class='col-sm-3-1' id='divSp"
					+ count
					+ "' style='height: 21.5px;'>"
					+ categoryName
					+ "</td>"

					+ "	<td class='col-sm-1-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].center_patient_id
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mobile
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mrnno
					+ "</td>"

					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].opdipdno
					+ "</td>"
					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
					+ count
					+ "' "
					+ "		onclick=viewBillForIPD("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
					+ "	</td>"

					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
					+ count + "' " + "		onclick=printsForPatients("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ") style='font-size: 12px;' />" + "	</td>"

					+ "</tr>";

			count = count + 1;
			countAuto++;
		}
	  
	  
  }
  
  var numberOfRows="";
  var indexopd=1;
  var opdcount = res.genBillCount;
  var numberOfPages=(opdcount/10);
  var displayPagination=numberOfPages; 
  if(pageNumber == 1)
	{
  if(numberOfPages > 5){
      numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
      displayPagination=5;
  }
  for(var j=0;j<displayPagination;j++){
  		if(j == Number(pageNumber-1))
  		{
  	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getIpdBillPatients11('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

  		}
  		else
  		{
  	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getIpdBillPatients11('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
  		}
  		indexopd=indexopd+1;
  }
  if(numberOfPages>5){
      numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages+1)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
  }
 
  $('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
  $('#opdpagenation').html(numberOfRows);
 // $("#countopdpage").val(indexopd);

	}
	$("#ipdBillPatients").html(ipdqueueTemp);
	//$("#ipdBillPatients1").html(ipdqueueTemp);
}
	else if ($(".activeLink1").hasClass('active'))
	{
		var countAuto = (pageNumber - 1) + '0';
		countAuto = Number(countAuto) + 1;
		var count = 1;
		var ipdqueueTemp = "";		
		
	//	$("#ipdBillPatients").html(" ");
		$("#ipdBillPatients1").html(" ");
		
//		alert("leng===="+res.lstIpdbillPatients.length);
	  if(callFrom != "search"){
		for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

			var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
			var fullName = res.lstIpdbillPatients[indx].patient_name;
			var categoryName = res.lstIpdbillPatients[indx].category_name;
			ipdqueueTemp = ipdqueueTemp
					+ "<tr>"
					+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
					+ countAuto
					+ "</td>"
					+ "	<td class='col-sm-3-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ fullName
					+ "</td>"

					// For Sonsor Name
					+ "	<td class='col-sm-3-1' id='divSp"
					+ count
					+ "' style='height: 21.5px;'>"
					+ categoryName
					+ "</td>"

					+ "	<td class='col-sm-1-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].center_patient_id
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mobile
					+ "</td>"

					+ "	<td class='col-sm-2-1' id='divPi"
					+ count
					+ "' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].mrnno
					+ "</td>"

					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ res.lstIpdbillPatients[indx].opdipdno
					+ "</td>"
					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
					+ count
					+ "' "
					+ "		onclick=viewBillForIPD("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
					+ "	</td>"

					+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
					+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
					+ count + "' " + "		onclick=printsForPatients("
					+ res.lstIpdbillPatients[indx].treatment_id
					+ ") style='font-size: 12px;' />" + "	</td>"

					+ "</tr>";

			countAuto++;
		}
	  }else{

			for ( var indx = 0; indx < res.lstIpdbillPatients.length; indx++) {		

				var phyDisFlag = res.lstIpdbillPatients[indx].phyDisFlag;
				var fullName = res.lstIpdbillPatients[indx].patient_name;
				var categoryName = res.lstIpdbillPatients[indx].category_name;
				ipdqueueTemp = ipdqueueTemp
						+ "<tr>"
						+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
						+ countAuto
						+ "</td>"
						+ "	<td class='col-sm-3-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ fullName
						+ "</td>"

						// For Sonsor Name
						+ "	<td class='col-sm-3-1' id='divSp"
						+ count
						+ "' style='height: 21.5px;'>"
						+ categoryName
						+ "</td>"

						+ "	<td class='col-sm-1-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].center_patient_id
						+ "</td>"

						+ "	<td class='col-sm-2-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].mobile
						+ "</td>"

						+ "	<td class='col-sm-2-1' id='divPi"
						+ count
						+ "' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].mrnno
						+ "</td>"

						+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ res.lstIpdbillPatients[indx].opdipdno
						+ "</td>"
						+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success' id='btnDelete"
						+ count
						+ "' "
						+ "		onclick=viewBillForIPD("
						+ res.lstIpdbillPatients[indx].treatment_id
						+ ",'generalBill','"+phyDisFlag+"') style='font-size: 12px;' />"
						+ "	</td>"

						+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
						+ "		<input type='button' value='Print' class='btn btn-xs btn-success' id='btnPrint"
						+ count + "' " + "		onclick=printsForPatients("
						+ res.lstIpdbillPatients[indx].treatment_id
						+ ") style='font-size: 12px;' />" + "	</td>"

						+ "</tr>";

				count = count + 1;
				countAuto++;
			}
		  
		  
	  }
	  
	  var numberOfRows="";
	  var indexopd=1;
	  var opdcount = res.genBillPhyDisCount;
	  var numberOfPages=(opdcount/10);
	  var displayPagination=numberOfPages;            
	  if(numberOfPages > 5){
	      numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
	      displayPagination=5;
	  }
	  for(var j=0;j<displayPagination;j++){
	  		if(j == Number(pageNumber-1))
	  		{
	  	        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=getIpdBillPhyDisPatients('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

	  		}
	  		else
	  		{
	  	        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=getIpdBillPhyDisPatients('onload','-',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
	  		}
	  		indexopd=indexopd+1;
	  }
	  if(numberOfPages>6){
	      numberOfRows +="<li class='next' onclick='nextPaginationForGenPhyDis("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
	  }
	 
	  $('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
	  $('#opdpagenation').html(numberOfRows);
	 // $("#countopdpage").val(indexopd);

	  
	//	$("#ipdBillPatients").html(ipdqueueTemp);
		$("#ipdBillPatients1").html(ipdqueueTemp);
	}
}

function nextPaginationForGenPhyDis(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPaginationForGenPhyDis("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getIpdBillPhyDisPatients('onload','-',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPaginationForGenPhyDis("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPaginationForGenPhyDis(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPaginationForGenPhyDis("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getIpdBillPhyDisPatients('onload','-',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPaginationForGenPhyDis("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=getIpdBillPatients11('onload','-',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=getIpdBillPatients11('onload','-',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


/*******************************************************************************
 * * @author : Badrinath Wagh
 * @codeFor : Autosuggestion For Ipd General Bill patients
 ******************************************************************************/
function getHitOnEnter11(inputID, e)
{
	var callFrom=$("#patSearchType").val();
	
	if(callFrom == 1 || callFrom == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientName(inputID);
		 }
	}else{
		 setAutoPatientName(inputID);
	}

}

function setAutoPatientName(inputID) {
	
	var resultData = [];
	var callFrom=$("#patSearchType").val();
	var searchText = $("#" + inputID).val();
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var unit_id = parseInt($("#unitId").val());
	var startIndex = 0;
	
	if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {
	
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + searchText);
	inputs.push('wardType=' + wardType);
	inputs.push('wardName=' + wardName);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPatients",
		cache : false,
		success : function(response) {
		
		if(callFrom == 1 || callFrom == 3)
		{
			
			if(response.lstIpdbillPatients.length > 0)
			{
				var patId = response.lstIpdbillPatients[0].patient_id;
				setIpdbillPatientsTemp(response,"search",1);
				//getPatientInfoByPatientId(patId);
			}else{
				alert("No data found!!");
				return false;
			}
		}else{
			
			var template = "";
			
			for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
				var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
				var idValue = response.lstIpdbillPatients[j].patient_id;
				var stateName = response.lstIpdbillPatients[j].patient_name;
				//setIpdbillPatientsTemp(response,"search"); //Added By Annapurna
				resultData.push({
					ID : idValue,
					Name : stateName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
	
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();
	
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	}
});

function displayResult(item) {

	var res = item.text.split('-');
	var patId = res[0];
	var stateName = res[1];	
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	getPatientInfoByPatientId(patId);
	$("input#" + inputID).val(patId);
}
}

function getPatientInfoByPatientId(patId){
	var startIndex = 0;
	var fname = patId.split(' ');
	var lname = patId.split(' ');
	patId = fname[1]+" "+lname[3];

	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var unit_id = parseInt($("#unitId").val());

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + patId);
	inputs.push('callFrom=' + 2);
	inputs.push('wardType=' + wardType);
    inputs.push('wardName=' + wardName);
    inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	//alert('str*** '+str);
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPatients",
		cache : false,
		success : function(r) {
			setIpdbillPatientsTemp(r,"search",1);	
		}
	});

	}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Autosuggestion For IPD Final Bill patients
 ******************************************************************************/

function getHitOnEnterFinalBill(inputID, e)
{
	var callFrom=$("#patSearchType").val();
	
	if(callFrom == 1 || callFrom == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientNameFinalBill(inputID);
		 }
	}else{
		setAutoPatientNameFinalBill(inputID);
	}

}


function setAutoPatientNameFinalBill(inputID) {
	
	//alert("DDDDDD")
	
	var callFrom=$("#patSearchType").val();
	//alert(callFrom);
	
	var resultData = [];
var searchText = $("#" + inputID).val();
var wardType = $('#wardTypeHall').val();
var wardName = $('#wardName').val();

if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

//	alert("Please enter search value");
	$("#" + inputID).focus();
	//getIpdQueue();
//	getIpdBillPatients();
	return false;
}

var unit_id = parseInt($("#unitId").val());
var startIndex = 0;

var inputs = [];
inputs.push('unit_id=' + unit_id);
inputs.push('findText=' + searchText);
inputs.push('wardType=' + wardType);
inputs.push('wardName=' + wardName);
inputs.push('callFrom=' + callFrom);
inputs.push('startIndex=' + startIndex);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPatients",
	cache : false,
	success : function(response) {
		
		if(callFrom == 1 || callFrom == 3)
		{
			
			if(response.lstIpdbillPatients.length > 0)
			{
				var patId = response.lstIpdbillPatients[0].patient_id;
				setIpdbillPatientsTempFinalBill(response,"search",1);
				//getPatientInfoByPatientId(patId);
			}else{
				alert("No data found!!");
				return false;
			}
		}else{
			
			var template = "";
			
			for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
				var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
				var idValue = response.lstIpdbillPatients[j].patient_id;
				var stateName = response.lstIpdbillPatients[j].patient_name;
				resultData.push({
					ID : idValue,
					Name : stateName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
	
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();
	
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	}
});

function displayResult(item) {

	var res = item.text.split('-');
	var patId = res[0];
	var stateName = res[1];	
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	getPatientInfoByPatientIdFinalBill(patId);
	$("input#" + inputID).val(patId);
}
}

function getPatientInfoByPatientIdFinalBill(patId){
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();
	var unit_id = parseInt($("#unitId").val());
	var startIndex = 0;

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + patId);
	inputs.push('callFrom=' + 2);
	inputs.push('wardType=' + wardType);
    inputs.push('wardName=' + wardName);
    inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPatients",
		cache : false,
		success : function(r) {
			setIpdbillPatientsTempFinalBill(r,"search",1);	
		}
	});

	}

function printsForPatients(tId) {
	$("#treatIdForPopUp").val(tId);
	$("#PopUpForPrintCaseRecord").show('show');
	// printsForPatientsIdentification(tId);
	// printsForPatientsCaseRecord(tId);
	// window.open("print_for_patient_identification.jsp?"+"treatID="
	// +encodeURIComponent(tId));
	// window.open("print_for_patient_case_record.jsp?"+"treatID="
	// +encodeURIComponent(tId));
}


/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Get for ipd General bill Physical Discharge patients
 ******************************************************************************/
function getIpdBillPhyDisPatients(callform, id, pageNumber) {

	/*var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null || wardType == "-") {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);*/
	
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	var startIndex = 0;
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	
	var unit_id = parseInt($("#unitId").val());
	//var callform ='ipd';
	var inputs = [];
	 inputs.push('unit_id=' + unit_id);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPhyDis",
		// timeout : 1000 * 60 * 15,
		// cache : false,
		success : function(r) {
			setTimeout(function(){
				setIpdbillPatientsTemp(r,callform,pageNumber);
			}, 50);
		}
	});
}


function getIpdBillFinalBillPhyDis(callform, id, pageNumber) {

	/*var ward = "-";
	if (id == "wardType1") {
		ward = "wardwise";
	} else if (id == "hallTypeSelectID") {
		ward = "bothwise";
	}
	var wardType = $("#wardType1").val();
	var hallTypeSelectId = $("#hallTypeSelectID").val();

	if (wardType == null) {

		wardType = 0;
	}

	if (hallTypeSelectId == null) {

		hallTypeSelectId = 0;
	}

	var inputs = [];
	inputs.push("callform=" + callform);
	inputs.push("wardType=" + wardType);
	inputs.push("hallTypeSelectId=" + hallTypeSelectId);
	inputs.push("ward=" + ward);*/
	
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	var startIndex = 0;
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var unit_id = parseInt($("#unitId").val());
	//var callform ='ipd';
	var inputs = [];
	 inputs.push('unit_id=' + unit_id);
     inputs.push('findText=' + usertype);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + wardType);
     inputs.push('wardName=' + wardName);
     inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPhyDisPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			setTimeout(function(){
				setIpdbillPatientsTempFinalBill(r,callform,pageNumber);
			}, 50);
		}
	});
}



/*******************************************************************************
 * * @author : Badrinath Wagh
 * @codeFor : Autosuggestion For Ipd General Bill Phy Discharge patients
 ******************************************************************************/
function GenBillPhydisPat(inputID, e)
{
	var callFrom=$("#patSearchType11").val();
	
	if(callFrom == 1 || callFrom == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientName1(inputID);
		 }
	}else{
		 setAutoPatientName1(inputID);
	}

}

function setAutoPatientName1(inputID) {
	
	var resultData = [];
	var startIndex = 0;
	var callFrom=$("#patSearchType11").val();
	var searchText = $("#" + inputID).val();
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	var unit_id = parseInt($("#unitId").val());
	
	if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {
	
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + searchText);
	inputs.push('wardType=' + wardType);
	inputs.push('wardName=' + wardName);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPhyDis",
		cache : false,
		success : function(response) {
		
		if(callFrom == 1 || callFrom == 3)
		{
			
			if(response.lstIpdbillPatients.length > 0)
			{
				var patId = response.lstIpdbillPatients[0].patient_id;
				setIpdbillPatientsTemp(response,"search",1);
				//getPatientInfoByPatientId(patId);
			}else{
				alert("No data found!!");
				return false;
			}
		}else{
			
			var template = "";
			
			for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
				var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
				var idValue = response.lstIpdbillPatients[j].patient_id;
				var stateName = response.lstIpdbillPatients[j].patient_name;
				resultData.push({
					ID : idValue,
					Name : stateName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
	
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();
	
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	}
});

function displayResult(item) {
	var startIndex = 0;
	var res = item.text.split('-');
	var patId = res[0];
	var stateName = res[1];	
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	getPatientInfoByPatientId1(patId);
	$("input#" + inputID).val(patId);
}
}

function getPatientInfoByPatientId1(patId){
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	var unit_id = parseInt($("#unitId").val());
	var startIndex = 0;

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + patId);
	inputs.push('callFrom=' + 2);
	inputs.push('wardType=' + wardType);
    inputs.push('wardName=' + wardName);
    inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPhyDis",
		cache : false,
		success : function(r) {
			setIpdbillPatientsTemp(r,"search",1);	
		}
	});

	}

/*******************************************************************************
 * @author : Badrinath Wagh
 * @codeFor : Autosuggestion For IPD Final Bill Physical Discharge patients
 ******************************************************************************/

function FinalBillPhyDisPatients(inputID, e)
{
	var callFrom=$("#patSearchType11").val();
	
	if(callFrom == 1 || callFrom == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientNameFinalBillPhyD(inputID);
		 }
	}else{
		setAutoPatientNameFinalBillPhyD(inputID);
	}

}


function setAutoPatientNameFinalBillPhyD(inputID) {
	
	//alert("DDDDDD")
	
	var callFrom=$("#patSearchType11").val();
	//alert(callFrom);
	
	var resultData = [];
var searchText = $("#" + inputID).val();
var wardType = $('#wardTypeHall1').val();
var wardName = $('#wardName1').val();

if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

//	alert("Please enter search value");
	$("#" + inputID).focus();
	//getIpdQueue();
//	getIpdBillPatients();
	return false;
}

var unit_id = parseInt($("#unitId").val());
var startIndex = 0;

var inputs = [];
inputs.push('unit_id=' + unit_id);
inputs.push('findText=' + searchText);
inputs.push('wardType=' + wardType);
inputs.push('wardName=' + wardName);
inputs.push('callFrom=' + callFrom);
inputs.push('startIndex=' + startIndex);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPhyDisPatients",
	cache : false,
	success : function(response) {
		
		if(callFrom == 1 || callFrom == 3)
		{
			
			if(response.lstIpdbillPatients.length > 0)
			{
				var patId = response.lstIpdbillPatients[0].patient_id;
				setIpdbillPatientsTempFinalBill(response,"search",1);
				//getPatientInfoByPatientId(patId);
			}else{
				alert("No data found!!");
				return false;
			}
		}else{
			
			var template = "";
			
			for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
				var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
				var idValue = response.lstIpdbillPatients[j].patient_id;
				var stateName = response.lstIpdbillPatients[j].patient_name;
				resultData.push({
					ID : idValue,
					Name : stateName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
	
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();
	
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	}
});

function displayResult(item) {

	var res = item.text.split('-');
	var patId = res[0];
	var stateName = res[1];	
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	getPatientInfoByPatientIdFinalBillPhyD(patId);
	$("input#" + inputID).val(patId);
}
}

function getPatientInfoByPatientIdFinalBillPhyD(patId){
	var wardType = $('#wardTypeHall1').val();
	var wardName = $('#wardName1').val();
	var unit_id = parseInt($("#unitId").val());
	var startIndex = 0;

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + patId);
	inputs.push('callFrom=' + 2);
	inputs.push('wardType=' + wardType);
    inputs.push('wardName=' + wardName);
    inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPhyDisPatients",
		cache : false,
		success : function(r) {
			setIpdbillPatientsTempFinalBill(r,"search",1);	
		}
	});

	}

function printsForPatientsIdentification() {
	var tId = $("#treatIdForPopUp").val();

	if (document.getElementById('idCaseRecord').checked) {
		window.open("print_for_patient_identification.jsp?" + "treatID="
				+ encodeURIComponent(tId));
		setTimeout(function() {
			$("#PopUpForPrintCaseRecord").hide('show');
		}, 500);
	}
	if (document.getElementById('idIdentificationSheet').checked) {
		window.open("print_for_patient_case_record.jsp?" + "treatID="
				+ encodeURIComponent(tId));
		setTimeout(function() {
			$("#PopUpForPrintCaseRecord").hide('show');
		}, 500);
	}

}

function closePrintPopup() {
	$("#PopUpForPrintCaseRecord").hide('show');
}
