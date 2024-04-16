function FetchAdmissionNote() 
{
	var pid = $("#pt_Id").val();
	var treatmentId = $("#tid").val(); 
	var inputs = [];
	
	// inputs.push('action=fetchPatientAdmissionNote');
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pid=' + pid);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/IpdAuto_Summary/fetchPatientAdmissionNote",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
		
		CKEDITOR.instances['adNote'].setData(r.listTreatment[0].notes);
		/*ajaxResponse = r;
		//var obj = eval('(' + ajaxResponse + ')');
		
		if (r.treatmentList.length > 0)
 			{
				var myObj = obj.treatmentList[0];	
					alert(myObj);
					CKEDITOR.instances['adNote'].setData(r.notes);
			}*/
		}
			
		
	});
}

function diagosListOPD() {
	var inputs = [];
	var treatmentId = $("#tr_Id").val();
	
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/IpdAuto_Summary/lisofDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setProvisinalDataToDiagonosisTable(r);
			setConfirmDataToDiagonosisTable(r);
		}
	});
}

function setProvisinalDataToDiagonosisTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		if(r[i].diagnoType == "Provisional"){
		htm = htm + '<tr> ' + " <td class='col-md-1-1 center'>" + index + '</td>' 
				+ "<td class='col-md-2-1 center'>"+ r[i].diagoName + "</td>" 
				+ "<td class='col-md-2-1 center'>" + r[i].diagndesc + "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].icd10_code+ "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].date + "</td>" 
				+ "<td class='col-md-1-1 center'>" + r[i].diagnoType + "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].dignosisBy + "</td>"
				+ "<td class='col-md-2-1 center'>"+ r[i].comment + "</td>"
				/*+ '<td class="col-md-1-1 center"><input  name="diagotablecheckbox"  value="' + r[i].id+ '" id="nt' + r[i].id
				+ '" type="checkbox"  style="cursor: pointer" /></td>'*/
				+ '</tr>';
		index++;
		}
	}
	if (r.length == 0) {
		htm = htm
				+ "<tr><td colspan='8' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}

	$("#assesmentContentProvisionalDischarge").html(htm);

}

function setConfirmDataToDiagonosisTable(r){
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		if(r[i].diagnoType == "Confirmed"){
		htm = htm + '<tr> ' + " <td class='col-md-1-1 center'>" + index + '</td>' 
				+ "<td class='col-md-2-1 center'>"+ r[i].diagoName + "</td>" 
				+ "<td class='col-md-2-1 center'>" + r[i].diagndesc + "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].icd10_code+ "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].date + "</td>" 
				+ "<td class='col-md-1-1 center'>" + r[i].diagnoType + "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].dignosisBy + "</td>"
				+ "<td class='col-md-2-1 center'>"+ r[i].comment + "</td>"
				/*+ '<td class="col-md-1-1 center"><input  name="diagotablecheckbox"  value="' + r[i].id+ '" id="nt' + r[i].id
				+ '" type="checkbox"  style="cursor: pointer" /></td>'*/
				+ '</tr>';
		index++;
		}
	}
	if (r.length == 0) {
		htm = htm
				+ "<tr><td colspan='8' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}

	$("#assesmentContentConfirmaedDischarge").html(htm);
}


function saveAutoDischargeSummery(){
	var primaryCOD ="-";
	var secondaryCOD ="-";
	var significantCondition ="-";
	//var adNote = $("#adNote").val();
	var adNote = CKEDITOR.instances['adNote'].getData();
	
	if(adNote == ""){
		adNote = "-";
	}
	
	var treatID = $("#treatmentId").val();
	var oprNote = $("#oprNote").val();

	/*var assesmentDetails = $("#assesmentDetails").html();
	var obj = eval('('+assesmentDetails+')');
	var diagnosisString = "";
	if(obj.assessmentList.length>0){
		for(var k = 0; k<obj.assessmentList.length; k++){
			var diag = obj.assessmentList[k];
			var str = diag.diagno_slave_id+"_"+diag.icd10_code+"#"+diag.diagno_type+"-"+diag.date+"@";
			diagnosisString = diagnosisString+str;
			}
	}else{
		diagnosisString = "";
	}*/

	var CPOE_TestDetails = $("#CPOE_TestDetails").html();
	//var testObj = eval('('+CPOE_TestDetails+')');
	var pathologyString = "";
	var investigationString = "";
	/*if(testObj.testDashboard.length>0){
		for(var k = 0; k<testObj.testDashboard.length; k++){
			var test = testObj.testDashboard[k];
			if(test.testType == "Pathology"){
				var strtest = test.id+"_"+test.desciption+"#"+test.testType+"-"+test.date+"@";
				pathologyString = pathologyString + strtest;
			}else{// for Investigation
				var strtest = test.id+"_"+test.desciption+"#"+test.testType+"-"+test.date+"@";
				investigationString = investigationString + strtest;
			}
		}
	}else{
		pathologyString = "";
		investigationString = "";
	}
*/
	/*var previousorder = $("#previousorder").html();
	var med = eval('('+previousorder+')');
	var medString = "";
	if(med.ormali.length>0){
		for(var k = 0; k<med.ormali.length; k++){
			var medobj = med.ormali[k];
			for(var l = 0; l<medobj.ocodrli.length; l++){

			var str = medobj.ocodrli[l].ocdID+"_"+medobj.ocodrli[l].invProdID+"#"+medobj.ocodrli[l].prep+"-"+medobj.ocodrli[l].days+"@";
			medString = medString+str;
			}
		}
	}else{
		medString = "";
	}

	var objorder = $("#objorder").html();
	var med1 = eval('('+objorder+')');
	var prescriptionString = "";
	if(med1.ormali.length>0){
		for(var k = 0; k<med1.ormali.length; k++){
			var medonDis = med1.ormali[k];
			for(var l = 0; l<medonDis.ocodrli.length; l++){

			var str = medonDis.ocodrli[l].ocdID+"_"+medonDis.ocodrli[l].invProdID+"#"+medonDis.ocodrli[l].prep+"-"+medonDis.ocodrli[l].days+"@";
			prescriptionString = prescriptionString+str;
			}
		}
	}else{
		prescriptionString = "";
	}*/

	/** ******AS A TREATEMENT DISCHARGE DATE WITH TIME************ */
	var discharge_dateNew = $("#discharge_date").val();
	var discharge_Time = $("#discharge_Time").val();
	if(discharge_dateNew == "")
		{
		alert("Please select discharge date");
		$("#discharge_date").focus();
		return false;
		}
	if(discharge_Time == "")
	{
		alert("Please select discharge time");
		$("#discharge_Time").focus();
		return false;
	}
	
	if (discharge_dateNew != "") {
		var temp = discharge_dateNew.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
 		var admsndate = $("#dtofadmission").text();  //Added by sagar 
 			var addt = admsndate.split("/");
		var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
 		if (disDate.getTime() < addDate.getTime()) {
			alert("Date should not be before admission date!");
			return false;
		}else{
			discharge_dateNew = temp[2] + "-" + temp[1] + "-" + temp[0] + " "
			+ discharge_Time + ":00";
		}
	}
	
	var discharge_Type = $("#discharge_Type").val();
	if(discharge_Type == "select")
		{
		alert("Please select discharge type!");
		$("#discharge_Type").focus();
		return false;
		}else if(discharge_Type == "Dead"){
			
			primaryCOD = $("#primaryCOD").val();
			secondaryCOD = $("#secondaryCOD").val();
			significantCondition = $("#significantCondition").val();
		}

	/** *****************************extra fileds**************************** */
	/** *******History***************** */
	var  preSympton= $("#preSymp").val();
	var  cliFindings= $("#cliFind").val();
    /** ******special Investigation************* */
	var  specInvest= $("#specInvest").val();
	/** ******feilds Treatment************* */
	var  riskFact= $("#riskFact").val();
	var  complication= $("#complication").val();
	var  treatmentGiven= $("#treatmentGiven").val();

	var inputs = [];
	// inputs.push('action=saveAutoDischargeSummary');
	inputs.push('treatment_ID=' + treatID);
	inputs.push('iddischarge_summery=' +	$("#disSummID").val());
	inputs.push('discharge_date=' +encodeURIComponent(discharge_dateNew));
	inputs.push('discharge_time=' +encodeURIComponent(discharge_Time));
	inputs.push('discharge_type=' +encodeURIComponent(discharge_Type));
	inputs.push('inchargeDr=' +	encodeURIComponent($("#consultDoc").html()));
	// Summary
	inputs.push('adNote=' + encodeURIComponent(adNote));
//	inputs.push('diagnosis='+encodeURIComponent(diagnosisString));
	// History
	inputs.push('pre_symptoms='+ preSympton);
	inputs.push('clinical_finding='+ cliFindings);
	// Investigation
	inputs.push('pathologyItem=' + encodeURIComponent(pathologyString));
	inputs.push('investigation=' +	encodeURIComponent(investigationString));
	inputs.push('spl_investigation='+ specInvest); 
	// Treatment
	inputs.push('risk='+encodeURIComponent(riskFact));
	inputs.push('complications=' +encodeURIComponent(complication)); 
	inputs.push('treatmentGiven=' +	encodeURIComponent(treatmentGiven));
	//inputs.push('medicine_given=' + encodeURIComponent(medString));
	// Operation Note
	inputs.push('oprNote=' + encodeURIComponent(oprNote));
	// Condition At Discharge
	inputs.push('conditionAtDischarge=' +	encodeURIComponent($("#condDisc").val()));
	inputs.push('advisedOnDischarge=' +	encodeURIComponent($("#advDisc").val()));
	// Treatment At Discharge
	//inputs.push('treatment_advised=' +encodeURIComponent(prescriptionString));
	// Cause Of Death By Pooja
	inputs.push('primaryCOD=' +encodeURIComponent(primaryCOD));
	inputs.push('secondaryCOD=' +encodeURIComponent(secondaryCOD));
	inputs.push('significantCondition=' +encodeURIComponent(significantCondition));
	
	/** **********PAEDIATRIC* DEPT****** */
	var PdDeptType = document.getElementById("chkpd").checked;
	var PDDeptNICUType = document.getElementById("chknicupd").checked;
	var paedDept = null;
	if(PdDeptType == true)
		{
		
		//var PdDeptObj = null;
		//var PdDept = $("#idimaging").val();
		/*PdDeptObj={
				"idpaediatric_dept":idimaging,
				"treatment_id": $("#redReflex1").val(),
				"past_history": $("#hips1").val(),
				"general_examination": $("#femorals1").val(),
				"genitals1": $("#genitals1").val(),
				"hernia1": $("#hernia1").val(),
				"headcir1": $("#headcir1").val(),
				"pcother1": $("#pcother1").val(),
				"redReflex2": $("#redReflex2").val(),
				"hips2": $("#hips2").val(),
				"femorals2": $("#femorals2").val(),
				"genitals2": $("#genitals2").val(),
				"hernia2": $("#hernia2").val(),
				"headcir2": $("#headcir2").val(),
				"pcother2": $("#pcother2").val(),
				"treatmentId": treatID
			 };*/
		
		
		
		//inputs.push('paed_dept=' + "PD");
		var idpaediatric_dept = $("#idpaediatric_dept").val();
		inputs.push('idpaediatric_dept=' + idpaediatric_dept);
		inputs.push('treatment_id=' + treatID);
		inputs.push('pastHistory=' + encodeURIComponent($("#pastHistory").val()));
		inputs.push('generalExamination=' + encodeURIComponent($("#generalExamination").val()));
		inputs.push('cvs=' + encodeURIComponent($("#paedcvs").val()));
		inputs.push('rs=' + encodeURIComponent($("#paedrs").val()));
		inputs.push('pa=' + encodeURIComponent($("#paedpa").val()));
		inputs.push('cns=' + encodeURIComponent($("#paedcns").val()));
		inputs.push('ps=' + encodeURIComponent($("#ps").val()));
		inputs.push('plateletCount=' + encodeURIComponent($("#plateletCount").val()));
		inputs.push('urineR=' + encodeURIComponent($("#urineR").val()));
		inputs.push('stoolR=' + encodeURIComponent($("#stoolR").val()));
		inputs.push('bsl=' + encodeURIComponent($("#bsl").val()));
		inputs.push('csf=' + encodeURIComponent($("#csf").val()));
		inputs.push('ott=' + encodeURIComponent($("#ott").val()));
		inputs.push('srcalcium=' + encodeURIComponent($("#srcalcium").val()));
		inputs.push('coombTest=' + encodeURIComponent($("#coombTest").val()));
		inputs.push('pdsrna=' + encodeURIComponent($("#pdsrna").val()));
		inputs.push('pdsrk=' + encodeURIComponent($("#pdsrk").val()));
		inputs.push('pdsrcl=' + encodeURIComponent($("#pdsrcl").val()));
		inputs.push('srBillirubin=' + encodeURIComponent($("#srBillirubin").val()));
		inputs.push('unconj1=' + encodeURIComponent($("#unconj1").val()));
		inputs.push('unconj2=' + encodeURIComponent($("#unconj2").val()));
		inputs.push('x_ray=' + encodeURIComponent($("#pdxray").val()));
		inputs.push('usg=' + encodeURIComponent($("#pdusg").val()));
		inputs.push('ct_mri=' + encodeURIComponent($("#pdctmri").val()));
		inputs.push('tt=' + encodeURIComponent($("#pdtt").val()));
		inputs.push('pdFOther=' + encodeURIComponent($("#pdFOther").val()));

		inputs.push('courseOfRec=' + encodeURIComponent($("#courseOfRec").val()));
		inputs.push('pdManagement=' + encodeURIComponent($("#pdManagement").val()));

		// Checkbox

	    var strchk = "";
	    for ( var i = 1; i <= 11; i++) {
	           chk = ($("#chk" + i)).is(':checked') ? "Y" : "N";
	           strchk = strchk + "," + chk;
	      }

	    paedDept = encodeURIComponent($("input:radio[name='PatientType']:checked").val());
	    inputs.push('immunisationStatus=' + encodeURIComponent(strchk));
		inputs.push('otherVaccines=' + encodeURIComponent($("#otherVaccines").val()));
		inputs.push('anyOtherPoints=' + encodeURIComponent($("#anyOtherPoints").val()));
		inputs.push('followUpAdvise=' + encodeURIComponent($("#followUpAdvise").val()));
		// inputs.push('paedDept=' +
		// encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
		paedDept="PD";
		inputs.push('NicuObj='+"");
		}
	else if(PDDeptNICUType == true)
		{
		/** ****PAEDIATRIC DEPT * NICU***** */ 
		var NicuObj;
		
		// inputs.push('paedDept=' +
		// encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
		paedDept = encodeURIComponent($("input:radio[name='PatientType']:checked").val());
		var babysData = encodeURIComponent($('input:radio[name="babysData"]:checked').val());
		var deliveryData = encodeURIComponent($('input:radio[name="deliveryData"]:checked').val());
		var registration = encodeURIComponent($('input:radio[name="registration"]:checked').val());
		var immunized = encodeURIComponent($('input:radio[name="im"]:checked').val());
		var obsProb = encodeURIComponent($('input:radio[name="obsProb"]:checked').val());
		
		var AdviceOnDescObj = null;
		var idadvice_on_desc = $("#idadvice_on_desc").val();
		AdviceOnDescObj={
			"idadvice_on_desc":idadvice_on_desc,	
			"ropScreen1": $("#ropScreen0").val()+"*"+$("#ropScreen1").val(),
			"hearingScreen1": $("#hearingScreen0").val()+"*"+$("#hearingScreen1").val(),
			"usgBrain1": $("#usgBrain0").val()+"*"+$("#usgBrain1").val(),
			"adother1": $("#adother0").val()+"*"+$("#adother1").val(),
			"ropScreen2": $("#ropScreen2").val(),
			"hearingScreen2": $("#hearingScreen2").val(),
			"usgBrain2": $("#usgBrain2").val(),
			"adother2": $("#adother2").val(),
			"treatmentId": treatID
			};
		
		
		var ImagingObj = null;
		var idimaging = $("#idimaging").val();
			ImagingObj={
				"idimaging":idimaging,
				"redReflex1": $("#redReflex1").val(),
				"hips1": $("#hips1").val(),
				"femorals1": $("#femorals1").val(),
				"genitals1": $("#genitals1").val(),
				"hernia1": $("#hernia1").val(),
				"headcir1": $("#headcir1").val(),
				"pcother1": $("#pcother1").val(),
				"redReflex2": $("#redReflex2").val(),
				"hips2": $("#hips2").val(),
				"femorals2": $("#femorals2").val(),
				"genitals2": $("#genitals2").val(),
				"hernia2": $("#hernia2").val(),
				"headcir2": $("#headcir2").val(),
				"pcother2": $("#pcother2").val(),
				"treatmentId": treatID
			 };
			
			var ElectrolyteObj = null;
			var idelectrolyte = $("#idelectrolyte").val();
			ElectrolyteObj={
				"idelectrolyte":idelectrolyte,	
				"date1": $("#date1").val(),
				"billirubin1": $("#billirubin1").val(),
				"total1": $("#total1").val(),
				"indirect1": $("#indirect1").val(),
				"direct1": $("#direct1").val(),
				"phototherapy1": $("#phototherapy1").val(),
				"date2": $("#date2").val(),
				"billirubin2": $("#billirubin2").val(),
				"total2": $("#total2").val(),
				"indirect2": $("#indirect2").val(),
				"direct2": $("#direct2").val(),
				"phototherapy2": $("#phototherapy2").val(),
				"date3": $("#date3").val(),
				"billirubin3": $("#billirubin3").val(),
				"total3": $("#total3").val(),
				"indirect3": $("#indirect3").val(),
				"direct3": $("#direct3").val(),
				"phototherapy3": $("#phototherapy3").val(),
				"date4": $("#date4").val(),
				"billirubin4": $("#billirubin4").val(),
				"total4": $("#total4").val(),
				"indirect4": $("#indirect4").val(),
				"direct4": $("#direct4").val(),
				"phototherapy4": $("#phototherapy4").val(),
				"treatmentId": treatID
			 };
			
			var VentilationObj = null;
			var idventilation = $("#idventilation").val();
			VentilationObj={
				"idventilation":idventilation,	
				"mode1": $("#mode1").val(),
				"pip1": $("#pip1").val(),
				"peep1": $("#peep1").val(),
				"fio1": $("#fio1").val(),
				"mode2": $("#mode2").val(),
				"pip2": $("#pip2").val(),
				"peep2": $("#peep2").val(),
				"fio2": $("#fio2").val(),
				"treatmentId": treatID
			 };
		var NicuObj = null;
		var idpaediatric_dept_nicu = $("#idpaediatric_dept_nicu").val();
		NicuObj={
			"idpaediatric_dept_nicu":idpaediatric_dept_nicu,	
			"ipdNo":$("#ipdNo").val(),
			"birthWeight":$("#birthWeight").val(),
			"weightOnAdmission" : $("#weightOnAdmission").val(),
			"weightOnDischarge": $("#weightOnDischarge").val(),
			"babysData": babysData,
			"deliveryData": deliveryData,
			"conditionAtBirth": $("#conditionAtBirth").val(),
			"ancAge": $("#ancAge").val(),
			"mbg": $("#mbg").val(),
			"rh": $("#rh").val(),
			"registration": registration,
			"immunized": immunized,
			"serHIV": $("#serHIV").val(),
			"hbsAG": $("#hbsAG").val(),
			"vdrl": $("#vdrl").val(),
			"dm": $("#dm").val(),
			"htn": $("#htn").val(),
			"thyroid": $("#thyroid").val(),
			"fever": $("#fever").val(),
			"medOther": $("#medOther").val(),
			"obsProb": obsProb,
			"courseInHos": $("#courseInHos").val(),
			"fluids": $("#fluids").val(),
			"antibio": $("#antibio").val(),
			"sedation1": $("#sedation1").val(),
			"sedation2": $("#sedation2").val(),
			"duration": $("#duration").val(),
			"organism": $("#organism").val(),
			"sensitive": $("#sensitive").val(),
			"bslmax": $("#bslmax").val(),
			"bslmin": $("#bslmin").val(),
			"electrolyte": $("#electrolyte").val(),
			"srk": $("#srk").val(),
			"srcl": $("#srcl").val(),
			"srca": $("#srca").val(),
			"srmg": $("#srmg").val(),
			"xray": $("#xray").val(),
			"usg": $("#usg").val(),
			"ctmri": $("#ctmri").val(),
			"otherex": $("#otherex").val(),
			"priConsult": $("#priConsult").val(),
			"priConsultDate": $("#priConsultDate").val(),
			"priConsultTime": $("#priConsultTime").val(),
			"hrOPD": $("#hrOPD").val(),
			"hrOPDDate": $("#hrOPDDate").val(),
			"hrOPDTime": $("#hrOPDTime").val(),
			"finalOther": $("#finalOther").val(),
			"treatment_id": treatID,
			listAdviceOnDesc : [AdviceOnDescObj],
			listImaging : [ImagingObj],
			listElectrolyte : [ElectrolyteObj],
			listVentilation : [VentilationObj],

		 };
		
	
		NicuObj = JSON.stringify(NicuObj);
		inputs.push('NicuObj='+encodeURIComponent(NicuObj));
		paedDept="nicuPD";
	}
	else{
		paedDept = "NORMAL";
		inputs.push('NicuObj='+"");
	}
	
	inputs.push('paed_dept=' + paedDept);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//contentType: 'application/json',
		url : "ehat/IpdAuto_Summary/saveAutoDischargeSummery",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			fetchAutoDischargeSummery();
			window.location.reload(true);
			}
		});
}

function fetchAutoDischargeSummery() {
	
	var tId = $("#treatmentId").val();
    var inputs = [];
    inputs.push('treatment_ID=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/IpdAuto_Summary/fetchAutoDischargeSummery",
			
			success : function(response) {
				var DischargeDate = response;
				var dischargedate = DischargeDate.dsList[0].discharge_date;
				$("#disSummID").val(response.dsList[0].iddischarge_summery);
				$("#discharge_Type").val(response.dsList[0].discharge_type);
				$("#discharge_Time").val(response.dsList[0].discharge_time);
				$("#disSummID").val(response.dsList[0].iddischarge_summery);
				$("#riskFact").val(response.dsList[0].risk);
				$("#treatmentGiven").val(response.dsList[0].treatmentGiven);
				$("#complication").val(response.dsList[0].complications);
				$("#specInvest").val(response.dsList[0].spl_investigation);
				$("#condDisc").val(response.dsList[0].conditionAtDischarge);
				$("#advDisc").val(response.dsList[0].advisedOnDischarge);
				$("#primaryCOD").val(response.dsList[0].primaryCOD);
				$("#secondaryCOD").val(response.dsList[0].secondaryCOD);
				$("#significantCondition").val(response.dsList[0].significantCondition);
				if(DischargeDate.dsList.length > 0)
					{
					var dischargedate = DischargeDate.dsList[0].discharge_date;
					 
					
					if(dischargedate != "null_null" && dischargedate !="" )
						{
						var newDate1 = dischargedate.split(" ");
						var date = newDate1[0];
						var time = newDate1[1];
						if(dischargedate.includes("/")){
							$("#discharge_date").val(date);
							
							var date=new Date(dischargedate).toLocaleString('en-GB');
							$("#dod").val(date);
						}else{
							var cal_date = date.split("-");
							var dd = cal_date[2];
							var mydate = dd.split(" ");
							var mydate = mydate[0]+"/"+cal_date[1]+"/"+cal_date[0];
							$("#discharge_date").val(mydate);
							var date=new Date(dischargedate).toLocaleString('en-GB');
							$("#dod").text(date);
						}
						
						var cal_time = time.split(":");
						var mytime = cal_time[0]+":"+cal_time[1];
						$("#discharge_Time").val(mytime);
						}else{
						$("#discharge_date").val("");
						$("#discharge_Time").val("");
					}
				}
				
				
				
				var objDiscSum = response;
				
				
				
			var DeptType = objDiscSum.dsList[0].paed_dept;
			if(objDiscSum.dsList[0].paediatricDept!=null){	
				$("#idpaediatric_dept").val(objDiscSum.dsList[0].paediatricDept.idpaediatric_dept);
			}
			
			if(objDiscSum.dsList[0].paediatricDeptNicu!=null){	
				$("#idpaediatric_dept_nicu").val(objDiscSum.dsList[0].paediatricDeptNicu.idpaediatric_dept_nicu);
				
				
				$("#idadvice_on_desc").val(objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].idadvice_on_desc);
				$("#idimaging").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].idimaging);
				$("#idelectrolyte").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].idelectrolyte);
				$("#idventilation").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].idventilation);
				
			}	
		        if(DeptType == "PD")
		    		{ 
		    		    // $("#nicu").hide();
						// $("#paedDept").show();
		        		 
						 document.getElementById("chkpd").checked = true;
						 
						 
						 $("#pastHistory").val(objDiscSum.dsList[0].paediatricDept.pastHistory);
						 $("#generalExamination").val(objDiscSum.dsList[0].paediatricDept.generalExamination);
						 $("#paedcvs").val(objDiscSum.dsList[0].paediatricDept.cvs);
						 $("#paedrs").val(objDiscSum.dsList[0].paediatricDept.rs);
						 $("#paedpa").val(objDiscSum.dsList[0].paediatricDept.pa);
						 $("#paedcns").val(objDiscSum.dsList[0].paediatricDept.cns);
						 $("#ps").val(objDiscSum.dsList[0].paediatricDept.ps);
						 $("#plateletCount").val(objDiscSum.dsList[0].paediatricDept.plateletCount);
						 $("#urineR").val(objDiscSum.dsList[0].paediatricDept.urineR);
						 $("#stoolR").val(objDiscSum.dsList[0].paediatricDept.stoolR);
						 $("#bsl").val(objDiscSum.dsList[0].paediatricDept.bsl);
						 $("#csf").val(objDiscSum.dsList[0].paediatricDept.csf);
						 $("#ott").val(objDiscSum.dsList[0].paediatricDept.ott);
						 $("#srcalcium").val(objDiscSum.dsList[0].paediatricDept.srcalcium);
						 $("#coombTest").val(objDiscSum.dsList[0].paediatricDept.coombTest);
						 $("#pdsrna").val(objDiscSum.dsList[0].paediatricDept.pdsrna);
						 $("#pdsrk").val(objDiscSum.dsList[0].paediatricDept.pdsrk);
						 $("#pdsrcl").val(objDiscSum.dsList[0].paediatricDept.pdsrcl);
						 $("#srBillirubin").val(objDiscSum.dsList[0].paediatricDept.srBillirubin);
						 $("#unconj1").val(objDiscSum.dsList[0].paediatricDept.unconj1);
						 $("#unconj2").val(objDiscSum.dsList[0].paediatricDept.unconj2);
						 $("#pdxray").val(objDiscSum.dsList[0].paediatricDept.x_ray);
						 $("#pdusg").val(objDiscSum.dsList[0].paediatricDept.usg);
						 $("#pdctmri").val(objDiscSum.dsList[0].paediatricDept.ct_mri);
						 $("#pdtt").val(objDiscSum.dsList[0].paediatricDept.tt);
						 $("#pdFOther").val(objDiscSum.dsList[0].paediatricDept.pdFOther);
						 $("#courseOfRec").val(objDiscSum.dsList[0].paediatricDept.courseOfRec);
						 $("#pdManagement").val(objDiscSum.dsList[0].paediatricDept.pdManagement);
						 
						 var arrRL = (objDiscSum.dsList[0].paediatricDept.immunisationStatus).split(",");
	                     for ( var i = 0; i < arrRL.length; i++) {
	                            (arrRL[i+1] == "Y") ? $('input[id=chk' + (i + 1) + ']').attr('checked', true): $('input[id=chk' + (i + 1) + ']').attr('checked',false);

	                     }

						 $("#otherVaccines").val(objDiscSum.dsList[0].paediatricDept.otherVaccines);
						 $("#anyOtherPoints").val(objDiscSum.dsList[0].paediatricDept.anyOtherPoints);
						 $("#followUpAdvise").val(objDiscSum.dsList[0].paediatricDept.followUpAdvise);
		    		
		    		}else if(DeptType == "nicuPD"){
					    // $("#nicu").show();
					    // $("#paedDept").hide();
		    			//set all id in hidden field
						
						
						$("#idimaging").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].idimaging);
						$("#idelectrolyte").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].idelectrolyte);
						$("#idventilation").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].idventilation);
		    			
					 	 document.getElementById("chknicupd").checked = true;
						 $("#duration").val(objDiscSum.dsList[0].paediatricDeptNicu.duration);
						 $("#srcl").val(objDiscSum.dsList[0].paediatricDeptNicu.srcl);
						 $("#usg").val(objDiscSum.dsList[0].paediatricDeptNicu.usg);
						
						 //start Mode Max PIP
						 $("#mode1").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].mode1);
						 $("#mode2").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].mode2);
						 $("#pip1").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].pip1);
						 $("#pip2").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].pip2);
						 $("#peep1").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].peep1);
						 $("#peep2").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].peep2);
						 $("#fio1").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].fio1);
						 $("#fio2").val(objDiscSum.dsList[0].paediatricDeptNicu.listVentilation[0].fio2);
						 
						 //set electrolyte
						 
						 $("#date1").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].date1);
						 $("#date2").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].date2);
						 $("#date3").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].date3);
						 $("#date4").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].date4);
						 $("#billirubin1").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].billirubin1);
						 $("#billirubin2").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].billirubin2);
						 $("#billirubin3").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].billirubin3);
						 $("#billirubin4").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].billirubin4);
						 $("#total1").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].total1);
						 $("#total2").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].total2);
						 $("#total3").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].total3);
						 $("#total4").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].total4);
						 $("#indirect1").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].indirect1);
						 $("#indirect2").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].indirect2);
						 $("#indirect3").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].indirect3);
						 $("#indirect4").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].indirect4);
						 $("#direct1").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].direct1);
						 $("#direct2").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].direct2);
						 $("#direct3").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].direct3);
						 $("#direct4").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].direct4);
						 $("#phototherapy1").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].phototherapy1);
						 $("#phototherapy2").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].phototherapy2);
						 $("#phototherapy3").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].phototherapy3);
						 $("#phototherapy4").val(objDiscSum.dsList[0].paediatricDeptNicu.listElectrolyte[0].phototherapy4);
						 
						 //end Electrolyte
						 
						 
						 //start imaging
						 
						 $("#redReflex1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].redReflex1);
						 $("#redReflex2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].redReflex2);
						 $("#hips1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].hips1);
						 $("#hips2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].hips2);
						 $("#femorals1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].femorals1);
						 $("#femorals2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].femorals2);
						 $("#genitals1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].genitals1);
						 $("#genitals2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].genitals2);
						 $("#hernia1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].hernia1);
						 $("#hernia2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].hernia2);
						 $("#headcir1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].headcir1);
						 $("#headcir2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].headcir2);
						 $("#pcother1").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].pcother1);
						 $("#pcother2").val(objDiscSum.dsList[0].paediatricDeptNicu.listImaging[0].pcother2);
						 
						 //end imaging
						 
						//start Advice On Discharge :
						 var rop = (objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].ropScreen1).split("*");
						 $("#ropScreen0").val(rop[0]);
						 $("#ropScreen1").val(rop[1]);
						 $("#ropScreen2").val(objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].ropScreen2);
						 
						 var hear = (objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].hearingScreen1).split("*");
						 $("#hearingScreen0").val(hear[0]);
						 $("#hearingScreen1").val(hear[1]);
						 $("#hearingScreen2").val(objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].hearingScreen2);
						 
						 var usg = (objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].usgBrain1).split("*");
						 $("#usgBrain0").val(usg[0]);
						 $("#usgBrain1").val(usg[1]);
						 $("#usgBrain2").val(objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].usgBrain2);
						 
						 var ad = (objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].adother1).split("*");
						 $("#adother0").val(ad[0]);
						 $("#adother1").val(ad[1]);
						 $("#adother2").val(objDiscSum.dsList[0].paediatricDeptNicu.listAdviceOnDesc[0].adother2);

						 $("#birthWeight").val(objDiscSum.dsList[0].paediatricDeptNicu.birthWeight);
						 $("#weightOnAdmission").val(objDiscSum.dsList[0].paediatricDeptNicu.weightOnAdmission);
						 $("#weightOnDischarge").val(objDiscSum.dsList[0].paediatricDeptNicu.weightOnDischarge);
						 
						 
						if((null!=objDiscSum.dsList[0].paediatricDeptNicu.babysData) && (objDiscSum.dsList[0].paediatricDeptNicu.babysData != "") && (objDiscSum.dsList[0].paediatricDeptNicu.babysData)!= undefined){
							if("undefined"!=objDiscSum.dsList[0].paediatricDeptNicu.babysData)
							document.getElementById(objDiscSum.dsList[0].paediatricDeptNicu.babysData).checked=true;
						}

						if((null!=objDiscSum.dsList[0].paediatricDeptNicu.deliveryData) && (objDiscSum.dsList[0].paediatricDeptNicu.deliveryData != "") && (objDiscSum.dsList[0].paediatricDeptNicu.deliveryData)!= undefined){
							if("undefined"!=objDiscSum.dsList[0].paediatricDeptNicu.deliveryData)
							document.getElementById(objDiscSum.dsList[0].paediatricDeptNicu.deliveryData).checked=true;
						}
						 
						 $("#conditionAtBirth").val(objDiscSum.dsList[0].paediatricDeptNicu.conditionAtBirth);
						 $("#ancAge").val(objDiscSum.dsList[0].paediatricDeptNicu.ancAge);
						 $("#mbg").val(objDiscSum.dsList[0].paediatricDeptNicu.mbg);
						 $("#rh").val(objDiscSum.dsList[0].paediatricDeptNicu.rh);
						 $("#registration").val(objDiscSum.dsList[0].paediatricDeptNicu.registration);
						 $("#serHIV").val(objDiscSum.dsList[0].paediatricDeptNicu.serHIV);
						 $("#hbsAG").val(objDiscSum.dsList[0].paediatricDeptNicu.hbsAG);
						 $("#vdrl").val(objDiscSum.dsList[0].paediatricDeptNicu.vdrl);
						 $("#dm").val(objDiscSum.dsList[0].paediatricDeptNicu.dm);
						 $("#htn").val(objDiscSum.dsList[0].paediatricDeptNicu.htn);
						 $("#thyroid").val(objDiscSum.dsList[0].paediatricDeptNicu.thyroid);
						 $("#fever").val(objDiscSum.dsList[0].paediatricDeptNicu.fever);
						 $("#medOther").val(objDiscSum.dsList[0].paediatricDeptNicu.medOther);
						 $("#obsProb").val(objDiscSum.dsList[0].paediatricDeptNicu.obsProb);
						 
						 
						 if(null != objDiscSum.dsList[0].paediatricDeptNicu.obsProb && objDiscSum.dsList[0].paediatricDeptNicu.obsProb != "" && (objDiscSum.dsList[0].paediatricDeptNicu.obsProb)!=undefined){
							 if("undefined" !=objDiscSum.dsList[0].paediatricDeptNicu.obsProb)
							 document.getElementById(objDiscSum.dsList[0].paediatricDeptNicu.obsProb).checked=true;
						 }
						 if(null!=objDiscSum.dsList[0].paediatricDeptNicu.registration && objDiscSum.dsList[0].paediatricDeptNicu.registration != "" && (objDiscSum.dsList[0].paediatricDeptNicu.registration)!=undefined){
							if("undefined"!=objDiscSum.dsList[0].paediatricDeptNicu.registration) 
							 document.getElementById(objDiscSum.dsList[0].paediatricDeptNicu.registration).checked=true;
						 }
						 
						 $("#courseInHos").val(objDiscSum.dsList[0].paediatricDeptNicu.courseInHos);
						 $("#fluids").val(objDiscSum.dsList[0].paediatricDeptNicu.fluids);
						 $("#antibio").val(objDiscSum.dsList[0].paediatricDeptNicu.antibio);
						 $("#sedation1").val(objDiscSum.dsList[0].paediatricDeptNicu.sedation1);
						 $("#sedation2").val(objDiscSum.dsList[0].paediatricDeptNicu.sedation2);
						 $("#organism").val(objDiscSum.dsList[0].paediatricDeptNicu.organism);
						 $("#sensitive").val(objDiscSum.dsList[0].paediatricDeptNicu.sensitive);
						 $("#bslmax").val(objDiscSum.dsList[0].paediatricDeptNicu.bslmax);
						 $("#bslmin").val(objDiscSum.dsList[0].paediatricDeptNicu.bslmin);
						 $("#srk").val(objDiscSum.dsList[0].paediatricDeptNicu.srk);
						 $("#electrolyte").val(objDiscSum.dsList[0].paediatricDeptNicu.electrolyte);
						 $("#srca").val(objDiscSum.dsList[0].paediatricDeptNicu.srca);
						 $("#srmg").val(objDiscSum.dsList[0].paediatricDeptNicu.srmg);
						 $("#xray").val(objDiscSum.dsList[0].paediatricDeptNicu.xray);
						 $("#ctmri").val(objDiscSum.dsList[0].paediatricDeptNicu.ctmri);
						 $("#otherex").val(objDiscSum.dsList[0].paediatricDeptNicu.otherex);
						 $("#priConsult").val(objDiscSum.dsList[0].paediatricDeptNicu.priConsult);
						 $("#priConsultDate").val(objDiscSum.dsList[0].paediatricDeptNicu.priConsultDate);
						 $("#priConsultTime").val(objDiscSum.dsList[0].paediatricDeptNicu.priConsultTime);
						 $("#hrOPD").val(objDiscSum.dsList[0].paediatricDeptNicu.hrOPD);
						 $("#hrOPDDate").val(objDiscSum.dsList[0].paediatricDeptNicu.hrOPDDate);
						 $("#hrOPDTime").val(objDiscSum.dsList[0].paediatricDeptNicu.hrOPDTime);
						 $("#finalOther").val(objDiscSum.dsList[0].paediatricDeptNicu.finalOther);
						 
						 if(null!= objDiscSum.dsList[0].paediatricDeptNicu.immunized && objDiscSum.dsList[0].paediatricDeptNicu.immunized != "" && (objDiscSum.dsList[0].paediatricDeptNicu.immunized)!=undefined){					 
							 if("undefined"!=objDiscSum.dsList[0].paediatricDeptNicu.immunized)
							 document.getElementById(objDiscSum.dsList[0].paediatricDeptNicu.immunized).checked=true;
						 }
				    }
		     	
		    /** **********************END VIEW************************ */
			}
		});
}
				
	
				
			
function getAllPrescriptionsByTreatmentId2(tid,unitId){

	var treatmentId = tid; //$.trim($('#tr_Id').val()); 
	var unitID = unitId; //$("#unitId").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptionsNurTemp2(r);
			}
		});
	}	
}


function setAllPrescriptionsNurTemp2(r){
	
	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	
	if (testObj.listOPDPrescriptionDtoSP.length > 0) {
		
		for ( var int = 0; int < testObj.listOPDPrescriptionDtoSP.length; int++) {

			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ "</td>"
					+ "<td class='col-md-3-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].medicineName
					+ "</td>"
					+ "<td class='col-md-2-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].prepName
					+ "</td>"
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].instructionNameForUI
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].days
					+ "</td>"
					+ "</tr>";
		}
	}

	$('#orderFormContentAdministrative').html(prescriptionContentTemp);
//	$("#prescription_id").val("0");

}

var SelOperationDataTemplate = "{#foreach $T.toli as tl}  <option value='{$T.tl.tomid}'> {$T.tl.on} </option> {#/for}";

function fetchOperationsData(){
	var pid =$("#pt_Id").val();
	var tid = $("#tid").val();
	
	var inputs = [];
	
	inputs.push('pid='+ pid);
	inputs.push('tid='+ tid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/IPD_Discharge/fetchOperationsData",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = JSON.stringify(r);
			
			
			var OprnName ="";
			var tomId = 0;
			var pobj1 = JSON.parse(ajaxResponse);//.decodeSpecialChars()
		
			for(var i = 0; i < pobj1.toli.length; i++){
				if(pobj1.toli[i].tomid != "" || pobj1.toli[i].on != tomid){
					//OprnName = pobj1.toli[i].on; 
					tomId= pobj1.toli[i].tomid;
					
				}
				$("#tomId").val(tomId);
				$("#idSelOperationData").setTemplate(SelOperationDataTemplate);
				$("#idSelOperationData").processTemplate(pobj1);
				
			}
			
		}
	});
}

function getTreatmentAtDischarge(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $('#unitId').val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/treatmentDischargeController/getAllPrescriptionsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setTreatmentAtDischarge(r);
			}
		});
	}
}
function setTreatmentAtDischarge(r){

	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	$('#prescriptionContent1').html(" ");
	if (testObj.listtreatmentdischarge.length > 0) {
		
		for ( var int = 0; int < testObj.listtreatmentdischarge.length; int++) {

			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ ".</td>"
					+ "<td class='col-md-2-1 center'>"
					/*+ testObj.listtreatmentdischarge[int].prepName
					+ ". "*/
					+ testObj.listtreatmentdischarge[int].medicineName
					+ "</td>"
					+ "<td class='col-md-2-1 center'>"
					+ testObj.listtreatmentdischarge[int].prepName
					+ "</td>"
					/*+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].strength
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].dose
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].unit
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].dayPrescription
					+ "</td>"*/
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listtreatmentdischarge[int].instructionNameForUI
					+ "</td>"
					+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>"
					+ testObj.listtreatmentdischarge[int].days
					+ "</td>"
					/*+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listtreatmentdischarge[int].qty
					+ "</td>"*/
					+ "<td class='col-md-1-1 center'>"
					+ "<input name='prepTreatmentMedicineCheckbox' id='"
					+ (testObj.listtreatmentdischarge[int].prescriptionId)
					+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' /></td>"
					+ "</tr>";
		}
	}

	$('#orderFormContent').html(prescriptionContentTemp);
	$("#prescription_id").val("0");

	/*prepCount = 0;
	$("#prescriptionCoverSheetContent").setTemplate(
			prescriptionCoverSheetContent);
	$("#prescriptionCoverSheetContent")
			.processTemplate(testObj);*/
	
}