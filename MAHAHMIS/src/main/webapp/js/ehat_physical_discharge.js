/************
* @author	: Badrinath Wagh
* @codeFor	: setPatientSearchType
 ************/

function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Id Here");
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
* @author	: Pooja Sukre
* @date		: 3-Apr-2018
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
        url : "ehat/physicalDischarge/physicalDischargeIpd",
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

		/*+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Print</th>"*/  // hide for some time
		
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
		
	/*	+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
		+ "<button onclick=printIPDFormJsp("+res.lstIpdbillPatients[indx].pId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/  // hide for some time
		
	/*	+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"
		+ "<button onclick=viewBillForIPDFinalBill("+res.lstIpdbillPatients[indx].treatId+",'finalBill') class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/
		
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
		url		: "ehat/physicalDischarge/viewIpdDischargedPatients",
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
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/physicalDischarge/viewIpdBillingDischargedPatients",
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
function getPhyDisPatientsFinalBill(callform,id){

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
		url : "ehat/physicalDischarge/viewIpdBillingDischargedPatients",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setIpdbillPatientsTempFinalBill(r);
		}
	});
}

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
* @codeFor	: Serach For IPD Physical Discharged Patients
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
		url		: "ehat/physicalDischarge/viewIpdDischargedPatients",
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
* @codeFor	: Serach For IPD Genaral Bill Physical Discharged Patients
 ************/
function autoForIpdBillDischargedPat(inputId,callfrom) {
		var finalBill="generalBill";
		var usertype = "";
		var letter="";
		if (callfrom ="search") {
			letter=$("#byName").val();
		}
		var findingName = $("#" + inputId).val();
		
		var inputs = [];	
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		inputs.push('finalBill=' + finalBill);
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "ehat/physicalDischarge/autoPhyDisIPDBillPatients",
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
* @codeFor	: Serach For IPD Final Bill Physical Discharged Patients
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

		var findingName = $("#" + inputId).val();
		
		var inputs = [];	
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		inputs.push('letter=' + letter);
		inputs.push('finalBill=' + finalBill);
		var str = inputs.join('&');
		jQuery.ajax({
			async	: false,
			type	: "POST",
			data	: str + "&reqType=AJAX",
			url		: "ehat/physicalDischarge/autoPhyDisIPDBillPatients",
			timeout : 1000 * 60 * 15,
			cache	: false,
			success : function(r) {
				setIpdbillPatientsTempFinalBill(r);
			}
		});
	}

