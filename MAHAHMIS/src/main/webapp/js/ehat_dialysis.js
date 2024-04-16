function getHomoDailaysisPatient() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/getDialysisPatient",
		success : function(r) {
			setDailysisQueueTemp(r);// call template
		}
	});
}

function setDailysisQueueTemp(res) {

	var count = 0;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>UHID</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Allot Bed</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont'>Cancel Admission</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";

	for ( var indx = 0; indx < res.lstIpdQueue.length; indx++) {

		var fullName = res.lstIpdQueue[indx].patientName;
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				/*+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].pId
				+ "</td>"*/
				
				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.lstIpdQueue[indx].centerPatientId
				+ "</td>"
				
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>IPD/2017/06/166</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='ALLOT BED' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
				+ count
				+ "' "
				+ "	onclick=viewBedWard("+ res.lstIpdQueue[indx].treatId+ ") style='font-size: 12px;' />"
				+ "	</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "	<input type='button' value='Cancel Admission' name='#login-box' class='btn btn-xs btn-success editUserAccess' id='submit' "
				+ "	 onclick='cancelAdmission(" + res.lstIpdQueue[indx].pId
				+ "," + res.lstIpdQueue[indx].treatId + ")' />" + "	</td>"
				+ "	</tr>";

		count = count + 1;
	}
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#container").html(ipdqueueTemp);
}

// added by ajay:22/10/2019 get dialysis patient list with specID=71
function getIpdBillPatientsWithDialysis() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/getIpdBillPatientsWithDialysis",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {

			setDialysisPatient(r);
		}
	});
}

function setDialysisPatient(res) {

	var count = 1;
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
			/*+ "<th class='col-sm-1'style='height: 21.5px; width: 3%;'>Doctor Name</label></th>"*/

			+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Ward</th>"
			+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Hall</th>"
		/*	+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Self/Sponsor</th>"*/
			+ "<th class='col-sm-1 center' style='height: 21.5px; width: 4%;'>Bed No</th>"
			+ "<th class='col-sm-1' style='height: 21.5px; width: 3%;'>Action</th>";
	

	ipdqueueTemp = ipdqueueTemp + "</tr>";

	for ( var indx = 0; indx < res.lstIpdbillPatientsBeds.length; indx++) {
		
		/*var strVale = res.lstIpdbillPatientsBeds[indx].doctorId;
		var array = strVale.split(",");*/
		var fullName = res.lstIpdbillPatientsBeds[indx].patientName;
		var datetime = new Date(res.lstIpdbillPatientsBeds[indx].createdDateTime).toLocaleString('en-GB');
		var NoDoct = "No Doctor";
		
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1' style='height: 21.5px;width: 3%;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-1' id='mrnno"
				+ count
				+ "' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].mrnno
				+ "</td>"

				+ "	<td class='col-sm-1' id='divPi"
				+ count
				+ "' style='height: 21.5px; width: 3%;'>"
				+ fullName
				+ "</td>"
				
				+ "	<td class='col-sm-1 center' id='divPi"
				+ count
				+ "' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].patientID
				+ "</td>"
				
				+ "	<td class='col-sm-1' id='divPi"
				+ count
				+ "' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].mobile
				+ "</td>"

				+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].patientAge
				+ "</td>"

				+ "	<td class='col-sm-1 center'  style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].weight1 + "</td>"
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].opdipdno + "</td>"

				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"
				+ datetime + "</td>"

				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].hallTypeName + "</td>"
				+ "	<td class='col-sm-1' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].hname + "</td>"

				+ "	<td class='col-sm-1 center' style='height: 21.5px; width: 3%;'>"
				+ res.lstIpdbillPatientsBeds[indx].bedname
				+ "</td>"

				+ "<td class='col-sm-1' style='height: 21.5px; width: 2%;'>"

				+ "<button onclick=viewDialysisWard("
				+ res.lstIpdbillPatientsBeds[indx].treatID+",'"+res.lstIpdbillPatientsBeds[indx].treatmentFlag+"') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td>"

		+"</tr>";
		+"</thead>" + "</table>" + "</div>";

		count = count + 1;
	}
	ipdqueueTemp = ipdqueueTemp + "</tbody></table></div>";
	$("#ipdBillPatients").html(ipdqueueTemp);
}

// added by ajay 22/10/2019: show popup on informed consent from on doctor desh
// dialysis advice
function showConsentFromPopup() {

	$("#AddConsentFromPopup").show();
}

// added by ajay 22/10/2019: hide popup on informed consent from on doctor desh
// dialysis advice
function closeConsentFromPopup() {
	$("#AddConsentFromPopup").hide();
}
// added by ajay 22/10/2019s: print popup on informed consent from on doctor
// desh dialysis advice
function printConsentFrom() {

	var treatmentId = $("#tr_Id").val();
	window.open("ehat_haemoDialysisinformedConsentPrint.jsp?tretmentId="
			+ treatmentId);
}

// added by ajay 22/10/2019s: Save dialysis advice doctor desh only opd patient
function saveDialysisAdvice() {

	var dialysisAdviceId = $("#dialysisAdviceId").val();

	var indicationId = $("#indicationId").val();

	if (indicationId == null || indicationId == "") {
		alert("Please Enter indication ");
		return false;
	}

	var dialysisType = $("#dialysisType").val();

	if (dialysisType == null || dialysisType == "") {
		alert("Please Enter dialysis Type");
		return false;
	}

	var frequencyDialysis = $("#frequencyDialysis").val();
	if (frequencyDialysis == null || frequencyDialysis == "") {
		alert("Please Enter frequency Dialysis");
		return false;
	}

	var Note = $("#Note").val();

	if (Note == null || Note == "") {
		alert("Please Enter Note");
		return false;
	}
	var treatmentId = $("#tid").val();

	var pid = $("#pid").val();

	var inputs = [];
	inputs.push('dialysisAdviceId=' + dialysisAdviceId);
	inputs.push('indicationId=' + indicationId);
	inputs.push('dialysisType=' + dialysisType);
	inputs.push('frequencyDialysis=' + frequencyDialysis);
	inputs.push('Note=' + Note);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pid=' + pid);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dialysis/saveDialysisAdvice",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r == 1) {
				alert("Record saved successfully..!");
			} else {
				alert("Record Update successfully..!");
			}
			refreshDialysisAdvice();
			getDialysisAdviceList();
			
		}
	});
}

function getDialysisAdviceList() {

	var treatmentId = $("#tid").val();
	if (treatmentId == null || treatmentId == "") {
	    treatmentId = $("#tr_Id").val();
	}

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId,
		},
		url : "ehat/dialysis/getDialysisAdviceList",

		success : function(r) {

			if (r.listDialysis.length > 0) {
				$('#dialysisAdviceId').val(r.listDialysis[0].dialysisAdviceId);
				$('#indicationId').val(r.listDialysis[0].indicationId);
				$("#dialysisType").val(r.listDialysis[0].dialysisType);
				$("#frequencyDialysis").val(r.listDialysis[0].frequencyDialysis);
				$("#Note").val(r.listDialysis[0].note);

			}
			if (r.listDialysis.length > 0) {
				
				var ufCheckBox = r.listDialysis[0].uf;
				if (ufCheckBox == 'Y') {		
					$("#uf").prop('checked', true);
				} else {
					uf = "N";
				}
				
			}
			
		}
	});
}

function viewDialysisWard(treatmentId,tflag) {

	window.location.href = "ehat_haemoDialysis_ward.jsp?" +"treatmentId="+treatmentId +"&tflag="+tflag;
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 22_OCT_2019
 * @Code add row template in haerecordmodialtsis for ON DIALYSIS ASSESSMENT
 ******************************************************************************/
function createDivForOnDialysisAssesment(callfrom) {
	var count2=0;
	var rows = $('#onDialysisAssesmentBody tr').length;
	// alert(rows);
	rows++;

	divId = "onDialysisAssesmentRow" + rows;

	var x = document.createElement('tr');

	x.setAttribute('id', divId);

	document.getElementById("onDialysisAssesmentBody").appendChild(x);

	document.getElementById(divId).innerHTML =

		'<td><label>' + rows + '</label></td>'

		+ '<td><input type="text" class="center" id="time' + rows+ '" onclick=getTime(this.id)></td>'

		+ '<td><input type="text" class="center" id="tpr' + rows + '"></td>'

		+ '<td><input type="text" class="center" id="bloodPressure' + rows + '"></td>'
		
		+ '<td><input type="text" class="center" id="spo2' + rows + '"></td>'

		+ '<td><input type="text"class="center" id="bloodFlowRate' + rows + '"></td>'

		+ '<td><input type="text" class="center" id="aPressure' + rows + '"></td>'

		+ '<td><input type="text" class="center" id="vPressure' + rows + '"></td>'

		+ '<td><input type="text" class="center" id="temp' + rows + '"></td>'

		+ '<td><input type="text" class="center" id="heparineDose' + rows + '"></td>'

		+ '<td><input type="text" class="center" id="remark' + rows + '"></td>'

		+ '<td><input type="checkbox" value="0"  name="markCheckbox" id="markCheckbox' + rows+ '"/></td>';

	count2++;
}


/*******************************************************************************
 * @author Ganesh Patil
 * @Code get Time 
 ******************************************************************************/

function getTime(id) {
	//alert(id+"time");
	$("#"+id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 10
	});
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 22_OCT_2019
 * @Code remove row template in haerecordmodialtsis for ON DIALYSIS ASSESSMENT
 ******************************************************************************/
function removeDivForOnDialysisAssesment(){
	idList=[];
    $("#onDialysisAssesmentBody").find('input[name="markCheckbox"]').each(function(){
        if($(this).is(":checked")){
        	//alert("ID: "+$('#'+this.id).val());
        	var currentId=$('#'+this.id).val();
        	if(currentId==0){
        		$(this).parents("tr").remove();
        	}else{
        		idList.push(currentId);
        	}	
        }
    });
   
    if(idList.length > 0){
    	var r = confirm("Are You Sure You Want To Delete this row ?");
    	if (r == true) {

    		var inputs = [];

    		inputs.push('idTables=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/dialysis/deleteTableRows",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alert(r);
    				getOnDialysisTableListById();

    			}
    		});

    	}
    }
    
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 22_OCT_2019
 * @Code save haerecordmodialtsis for Pre DIALYSIS ASSESSMENT
 ******************************************************************************/
function saveHaeRecordModialtsisForm() {
	var id_haeRecordModialtsis = $("#id_haeRecordModialtsis").val();
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#pt_Id").val();

	var provisionalDiagnosis = $("#provisionalDiagnosis").val();
	if (provisionalDiagnosis == null || provisionalDiagnosis == "") {
		provisionalDiagnosis = "-";
	}

	var objectiveWeight = $("#objectiveWeight").val();

	if (objectiveWeight == null || objectiveWeight == "") {
		objectiveWeight = "-";
	}

	var preDialysisWeight = $("#preDialysisWeight").val();

	if (preDialysisWeight == null || preDialysisWeight == "") {
		preDialysisWeight = "-";
	}

	var interDialysisWeightGain = $("#interDialysisWeightGain").val();

	if (interDialysisWeightGain == null || interDialysisWeightGain == "") {
		interDialysisWeightGain = "-";
	}

	var bp = $("#bp").val();

	if (bp == null || bp == "") {
		bp = "-";
	}

	var temp = $("#temp").val();

	if (temp == null || temp == "") {
		temp = "-";
	}

	var ufGoals = $("#ufGoals").val();

	if (ufGoals == null || ufGoals == "") {
		ufGoals = "-";
	}

	var duration = $("#duration").val();

	if (duration == null || duration == "") {
		duration = "-";
	}

	var conductivity = $("#conductivity").val();

	if (conductivity == null || conductivity == "") {
		conductivity = "-";
	}
	var dialyser = $("#dialyser").val();

	if (dialyser == null || dialyser == "") {
		dialyser = "-";
	}

	var area = $("#area").val();
	if (area == null || area == "") {
		area = "-";
	}

	var dialyzer = $("#dialyzer").val();

	if (dialyzer == null || dialyzer == "") {
		dialyzer = "-";
	}
	var tubing = $("#tubing").val();

	if (tubing == null || tubing == "") {
		tubing = "-";
	}

	var bonusDose = $("#bonusDose").val();

	if (bonusDose == null || bonusDose == "") {
		bonusDose = "-";
	}

	if ($('[name="uf"]').is(':checked')) {
		uf = "Y";
	} else {
		uf = "N";
	}
	if ($('[name="withUF"]').is(':checked')) {
		withUF = "Y";
	} else {
		withUF = "N";
	}

	if ($('[name="sDialysiswithUF"]').is(':checked')) {
		sDialysiswithUF = "Y";
	} else {
		sDialysiswithUF = "N";
	}
	if ($('[name="isolatedUF"]').is(':checked')) {
		isolatedUF = "Y";
	} else {
		isolatedUF = "N";
	}

	if ($('[name="biocarbonate"]').is(':checked')) {
		biocarbonate = "Y";
	} else {
		biocarbonate = "N";
	}

	if ($('[name="calciumfree"]').is(':checked')) {
		calciumfree = "Y";
	} else {
		calciumfree = "N";
	}

	if ($('[name="potassiumFree"]').is(':checked')) {
		potassiumFree = "Y";
	} else {
		potassiumFree = "N";
	}

	if ($('[name="ns"]').is(':checked')) {
		ns = "Y";
	} else {
		ns = "N";
	}

	if ($('[name="blood"]').is(':checked')) {
		blood = "Y";
	} else {
		blood = "N";
	}

	if ($('[name="regular"]').is(':checked')) {
		regular = "Y";
	} else {
		regular = "N";
	}

	if ($('[name="low"]').is(':checked')) {
		low = "Y";
	} else {
		low = "N";
	}

	if ($('[name="heparinFree"]').is(':checked')) {
		heparinFree = "Y";
	} else {
		heparinFree = "N";
	}
	var preDialysisList = {

		listpreDialysis : []
	};

	preDialysisList.listpreDialysis.push({
		idPreDialysis : id_haeRecordModialtsis,
		treatmentId : treatmentId,
		patientId : patientId,
		provisionalDiagnosis : provisionalDiagnosis,
		objectiveWt : objectiveWeight,
		preDialysis : preDialysisWeight,
		interDialysis : interDialysisWeightGain,
		bp : bp,
		temp : temp,
		uf_goal : ufGoals,
		duration : duration,
		conductivity : conductivity,
		dialyser : dialyser,
		surfaceArea : area,
		dialyzer : dialyzer,
		tubing : tubing,
		uf : uf,
		withUf : withUF,
		sequetialDialysiswithUf : sDialysiswithUF,
		isolatedUf : isolatedUF,
		bicarbonate : biocarbonate,
		calcium : calciumfree,
		potassium : potassiumFree,
		ns : ns,
		blood : blood,
		regular : regular,
		low : low,
		heparine : heparinFree,
		bonusDose : bonusDose
	});

	var postDialysisWt = $("#postDialysisWt").val();

	if (postDialysisWt == null || postDialysisWt == "") {
		postDialysisWt = "-";
	}

	var lossOfWt = $("#lossOfWt").val();

	if (lossOfWt == null || lossOfWt == "") {
		lossOfWt = "-";
	}

	var Postbp = $("#Postbp").val();

	if (Postbp == null || Postbp == "") {
		Postbp = "-";
	}

	var postDialysisList = {
		listpostDialysis : []
	};

	var idPostDialysisAssesment = $("#idPostDialysisAssesment").val();
	postDialysisList.listpostDialysis.push({
		"idPostDialysisAssesment" : idPostDialysisAssesment,
		"treatmentId" : treatmentId,
		"postDialysisWt" : postDialysisWt,
		"lossWt" : lossOfWt,
		"bp" : Postbp,
		"patientId" : patientId,

	});

	// converted to JSON String
	preDialysisList = JSON.stringify(preDialysisList);
	postDialysisList = JSON.stringify(postDialysisList);

	// Added JSON String in Input array
	var inputs = [];
	inputs.push("preDialysis=" + encodeURIComponent(preDialysisList));
	inputs.push("postDialysis=" + encodeURIComponent(postDialysisList));

	// Ajax Call
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/saveHaeRecordModialtsis",
		data : str + "&reqType=AJAX",
		cache : false,

		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			getHomoDailaysisHaeremodialsysis();
			
		}
	});
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 22_OCT_2019
 * @Code save haerecordmodialtsis for On DIALYSIS ASSESSMENT Table
 ******************************************************************************/
function saveOnDialysisTable() {
	var onDialysisTableList = {
		listonDialysisTable : []

	};

	var count = 0;
	var totalRow = $('#onDialysisAssesmentBody tr').length;

	for ( var i = 1; i <= totalRow; i++) {

		count++;

		var idPostDialysisTable = $("#markCheckbox" + count + "").val();

		if (idPostDialysisTable) {

		} else {
			idPostDialysisTable = 0;
		}

		var time = $("#time" + count + "").val();
		if(time==null || time=="" || time==undefined){
			alert("Please Enter Time");
			return false;
		}

		var tpr = $("#tpr" + count + "").val();
		if(tpr==null || tpr=="" || tpr==undefined){
			alert("Please Enter tpr");
			return false;
		}


		var bloodPressure = $("#bloodPressure" + count + "").val();
		if(bloodPressure==null || bloodPressure=="" || bloodPressure==undefined){
			alert("Please Enter blood Pressure");
			return false;
		}

		var spo2 = $("#spo2" + count + "").val();
		if(spo2==null || spo2=="" || spo2==undefined){
			alert("Please Enter spo2");
			return false;
		}

		var bloodFlowRate = $("#bloodFlowRate" + count + "").val();
		if(bloodFlowRate==null || bloodFlowRate=="" || bloodFlowRate==undefined){
			alert("Please Enter blood Flow Rate");
			return false;
		}

		var aPressure = $("#aPressure" + count + "").val();
		if(aPressure==null || aPressure=="" || aPressure==undefined){
			alert("Please Enter aPressure");
			return false;
		}

		var vPressure = $("#vPressure" + count + "").val();
		if(vPressure==null || vPressure=="" || vPressure==undefined){
			alert("Please Enter vPressure");
			return false;
		}

		var temp = $("#temp" + count + "").val();
		if(temp==null || temp=="" || temp==undefined){
			alert("Please Enter temp");
			return false;
		}

		var heparineDose = $("#heparineDose" + count + "").val();
		if(heparineDose==null || heparineDose=="" || heparineDose==undefined){
			alert("Please Enter heparineDose");
			return false;
		}

		var remark = $("#remark" + count + "").val();
		if(remark==null || remark=="" || remark==undefined){
			alert("Please Enter remark");
			return false;
		}

		var startDate = $("#startDate").val();
		if (startDate == null || startDate == "") {
			alert("Please Enter startDate");
			return false;
		}

		var terminateDate = $("#terminateDate").val();

		if (terminateDate == null || terminateDate == "") {
			alert("Please Enter terminateDate");
			return false;
		}

		var preDialysisCollection = $("#preDialysisCollection").val();

		if (preDialysisCollection == null || preDialysisCollection == "") {
			preDialysisCollection = "-";
		}

		var postDialysisCollection = $("#postDialysisCollection").val();

		if (postDialysisCollection == null || postDialysisCollection == "") {
			postDialysisCollection = "-";
		}

		var bloodTransfusions = $("#bloodTransfusions").val();

		if (bloodTransfusions == null || bloodTransfusions == "") {
			bloodTransfusions = "-";
		}

		var medications = $("#medications").val();

		if (medications == null || medications == "") {
			medications = "-";
		}

		var treatmentId = $("#tr_Id").val();
		var patientId = $("#pt_Id").val();
		
		onDialysisTableList.listonDialysisTable.push({
			"idPostDialysisTable" : idPostDialysisTable,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"dialysisStartedAt" : startDate,
			"dialysisTerminatedAt" : terminateDate,
			"time" : time,
			"tpr" : tpr,
			"bloodPressure" : bloodPressure,
			"spo2" : spo2,
			"bloodFlowRate" : bloodFlowRate,
			"aPressure" : aPressure,
			"vPressure" : vPressure,
			"temp" : temp,
			"herapineDose" : heparineDose,
			"remark" : remark,
			"preDialysisCollection" : preDialysisCollection,
			"postDialysisCollection" : postDialysisCollection,
			"bloodTransfusions" : bloodTransfusions,
			"medications" : medications
		});
	}
	onDialysisTableList = JSON.stringify(onDialysisTableList);
	var inputs = [];
	inputs.push("tableDialysis=" + encodeURIComponent(onDialysisTableList));

	// Ajax Call
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/saveOnDialysisTable",
		data : str + "&reqType=AJAX",
		cache : false,

		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			getHomoDailaysisHaeremodialsysis();
			getOnDialysisTableListById();
		}
	});
}

/*******************************************************************************
 * @author Ganesh Patil
 * @date 22_OCT_2019
 * @Code fetch Particular haerecordmodialtsis record using treatmentId
 ******************************************************************************/
function getHomoDailaysisHaeremodialsysis() {
	
	var treatmentId = $("#tr_Id").val();
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : {
					"treatmentId" : treatmentId,
				},
				url : "ehat/dialysis/getDialysisListById",
				success : function(r) {
					if (r.listpreDialysis!=null) {
						$("#provisionalDiagnosis").val(
								r.listpreDialysis[0].provisionalDiagnosis);
						$("#objectiveWeight").val(
								r.listpreDialysis[0].objectiveWt);
						$("#preDialysisWeight").val(
								r.listpreDialysis[0].preDialysis);
						$("#interDialysisWeightGain").val(
								r.listpreDialysis[0].interDialysis);
						$("#bp").val(r.listpreDialysis[0].bp);
						$("#temp").val(r.listpreDialysis[0].temp);
						$("#ufGoals").val(r.listpreDialysis[0].uf_goal);
						$("#duration").val(r.listpreDialysis[0].duration);
						$("#conductivity").val(
								r.listpreDialysis[0].conductivity);
						$("#dialyser").val(r.listpreDialysis[0].dialyser);
						$("#area").val(r.listpreDialysis[0].surfaceArea);
						$("#dialyzer").val(r.listpreDialysis[0].dialyzer);
						$("#tubing").val(r.listpreDialysis[0].tubing);
						$("#bonusDose").val(r.listpreDialysis[0].bonusDose);
						$("#id_haeRecordModialtsis").val(
								r.listpreDialysis[0].idPreDialysis);

						var ufCheckBox = r.listpreDialysis[0].uf;
						if (ufCheckBox == 'Y') {
							
							$("#uf").prop('checked', true);
						} else {
							uf = "N";
						}

						var withUFCheckBox = r.listpreDialysis[0].withUf;
						if (withUFCheckBox == 'Y') {
							
							$("#withUF").prop('checked', true);
						} else {
							withUF = "N";
						}

						var sDialysiswithUFCheckBox = r.listpreDialysis[0].sequetialDialysiswithUf;
						if (sDialysiswithUFCheckBox == 'Y') {
							
							$("#sDialysiswithUF").prop('checked', true);
						} else {
							sDialysiswithUF = "N";
						}

						var isolatedUFCheckBox = r.listpreDialysis[0].isolatedUf;
						if (isolatedUFCheckBox == 'Y') {
							
							$("#isolatedUF").prop('checked', true);
						} else {
							isolatedUF = "N";
						}

						var biocarbonateCheckBox = r.listpreDialysis[0].bicarbonate;
						if (biocarbonateCheckBox == 'Y') {
							
							$("#biocarbonate").prop('checked', true);
						} else {
							biocarbonate = "N";
						}

						var calciumfreeCheckBox = r.listpreDialysis[0].calcium;
						if (calciumfreeCheckBox == 'Y') {
							
							$("#calciumfree").prop('checked', true);
						} else {
							calciumfree = "N";
						}

						var potassiumCheckBox = r.listpreDialysis[0].potassium;
						if (potassiumCheckBox == 'Y') {
							
							$("#potassiumFree").prop('checked', true);
						} else {
							potassiumFree = "N";
						}

						var nsCheckBox = r.listpreDialysis[0].ns;
						if (nsCheckBox == 'Y') {
							
							$("#ns").prop('checked', true);
						} else {
							ns = "N";
						}

						var bloodCheckBox = r.listpreDialysis[0].blood;
						if (bloodCheckBox == 'Y') {
							
							$("#isolatedUF").prop('checked', true);
						} else {
							blood = "N";
						}

						var regulerCheckBox = r.listpreDialysis[0].regular;
						if (regulerCheckBox == 'Y') {
							$("#regular").prop('checked', true);
						} else {
							regular = "N";
						}

						var lowCheckBox = r.listpreDialysis[0].low;
						if (lowCheckBox == 'Y') {
							
							$("#low").prop('checked', true);
						} else {
							low = "N";
						}

						var heparineCheckBox = r.listpreDialysis[0].heparine;
						if (heparineCheckBox == 'Y') {
							
							$("#heparinFree").prop('checked', true);
						} else {
							heparinFree = "N";
						}
					}
					if(r.postDialysisAssesmentList != null){
						// Binding the postDialysisAssesmentList data
						$("#idPostDialysisAssesment").val(r.postDialysisAssesmentList[0].idPostDialysisAssesment);
						$("#postDialysisWt").val(r.postDialysisAssesmentList[0].postDialysisWt);
						$("#lossOfWt").val(r.postDialysisAssesmentList[0].lossWt);
						$("#Postbp").val(r.postDialysisAssesmentList[0].bp);

					}
					
				}
			});
}

//added by Ganesh for get On Dialysis Table List By treatment Id
function getOnDialysisTableListById() {
	
	var treatmentId = $("#tr_Id").val();
	
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : {
					"treatmentId" : treatmentId,
				},
				url : "ehat/dialysis/getOnDialysisTableListById",
				success : function(r) {
					if(r.listonDialysisTable!=null){
					// Binding the postDialysisTableList (table) data
				if (r.listonDialysisTable.length > 0) {	
					$("#idPostDialysisTable").val(
							r.listonDialysisTable[0].idPostDialysisTable);
					$("#preDialysisCollection").val(
							r.listonDialysisTable[0].preDialysisCollection);
					$("#postDialysisCollection").val(
							r.listonDialysisTable[0].postDialysisCollection);
					$("#bloodTransfusions").val(
							r.listonDialysisTable[0].bloodTransfusions);
					$("#medications").val(r.listonDialysisTable[0].medications);
					$("#startDate").val(
							r.listonDialysisTable[0].dialysisStartedAt);
					$("#terminateDate").val(
							r.listonDialysisTable[0].dialysisTerminatedAt);
					var divContent = "";
					for ( var i = 0; i < r.listonDialysisTable.length; i++) {
						divContent = divContent
								+ '<tr>'
								+ "<td  class='col-md-1 center' style='height: 21.5px;'>"+ (i + 1) + "</td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text' class='center' id='time"+ (i + 1) + "'  value='"+ r.listonDialysisTable[i].time+ "' onclick='getTime(this.id)' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='tpr"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].tpr + "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='bloodPressure"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].bloodPressure+ "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='spo2"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].spo2 + "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='bloodFlowRate"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].bloodFlowRate+ "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='aPressure"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].aPressure+ "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='vPressure"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].vPressure+ "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='temp"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].temp + "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='heparineDose"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].herapineDose+ "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='remark"+ (i + 1) + "' value='"+ r.listonDialysisTable[i].remark + "' ></td>";
						divContent = divContent
								+ "<td class='col-md-1' style='height: 21.5px;'>"
								+ " <input type='checkbox'  class='form-control input-SmallText' id='markCheckbox"
								+ (i + 1) + "'  value='"+ r.listonDialysisTable[i].idPostDialysisTable+ "' name='markCheckbox' ></td>";

						+'</tr>';
					}

					$('#onDialysisAssesmentBody').html(divContent);
				}
			}
				}
			});

}
// added by Ganesh 31/10/2019
function printHaeRecordModialtsisForm() {
	var treatmentId = $("#tr_Id").val();
	window.open("ehat_Haerecordmodilaltsis_print.jsp?tretmentId="
			+ treatmentId);
}

// added by Dnyaneshwar 23/10/2019: Save dialysis
function saveCarePlan() {
	
	var martialstatus = $("#martialstatus").val();

	if (martialstatus == null || martialstatus == "") {

		martialstatus = "";
	}


	var calllergies = $("#alllergies").val();
	if (calllergies == null || calllergies == "") {
		calllergies = "";
	}

	var cbloodGroup = $("#bloodGroup").val();

	if (cbloodGroup == null || cbloodGroup == "") {
		cbloodGroup = "";
	}

	var estimatedDryWeight = $("#estimatedDryWeight").val();

	if (estimatedDryWeight == null || estimatedDryWeight == "") {
		estimatedDryWeight = "";
	}

	var dateOfInitiationOfDialysis = $("#dateOfInitiationOfDialysis").val();
	
	if (dateOfInitiationOfDialysis == null || dateOfInitiationOfDialysis == "") {

		dateOfInitiationOfDialysis = "";
	}

	var frequencyOfDialysis = $("#FrequencyOfDialysis").val();
	if (frequencyOfDialysis == null || frequencyOfDialysis == "") {
		frequencyOfDialysis = "";
	}

	var primaryRentalDisease1 = $("#primaryRentalDisease1").val();

	if (primaryRentalDisease1 == null || primaryRentalDisease1 == "") {
		primaryRentalDisease1 = "";
	}

	var vasuclaraccessdetails1 = $("#vasuclaraccessdetails1").val();

	if (vasuclaraccessdetails1 == null || vasuclaraccessdetails1 == "") {
		vasuclaraccessdetails1 = "";
	}

	var ironStatues1 = $("#ironStatues1").val();
	
	if (ironStatues1 == null || ironStatues1 == "") {
		ironStatues1 = "";
	}

	var lastBloodTransfusion1 = $("#lastBloodTransfusion1").val();
	if (lastBloodTransfusion1 == null || lastBloodTransfusion1 == "") {
		lastBloodTransfusion1 = "";
	}

	var specialNeedsProblems1 = $("#SpecialNeedsProblems1").val();

	if (specialNeedsProblems1 == null || specialNeedsProblems1 == "") {
		specialNeedsProblems1 = "";
	}

	if ($('#Diabetes').is(":checked")) {
		diabetesMellitus = "Y";// it is checked
	} else {
		diabetesMellitus = "";
	}

	if ($('#CerebroVascularDisease').is(":checked")) {
		cerebroVascularDisease = "Y";// it is checked
	} else {
		cerebroVascularDisease = "";

	}
	if ($('#IschemicHeartDisease').is(":checked")) {
		ischemicHeartDisease = "Y";// it is checked
	} else {
		ischemicHeartDisease = "";
	}

	if ($('#ChronicLungDisease').is(":checked")) {
		chronicLungDisease = "Y";// it is checked
	} else {
		chronicLungDisease = "";

	}
	if ($('#PeripheralVascularDisease').is(":checked")) {
		peripheralVascularDisease = "Y";// it is checked
	} else {
		peripheralVascularDisease = "";

	}
	if ($('#chronicliverdisease').is(":checked")) {
		chronicliverdisease = "Y";// it is checked
	} else {
		chronicliverdisease = "";
	}

	if ($('#tuberclosis').is(":checked")) {
		tuberclosis = "Y";// it is checked
	} else {
		tuberclosis = "";
	}

	var careplanId = $("#careplanId").val();
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#pt_Id").val();

	var inputs = [];

	inputs.push('careplanId=' + careplanId);
	inputs.push('treatmentId=' + treatmentId);	
	inputs.push('patientId=' + patientId);
	inputs.push('martialStatus=' + martialstatus);
	inputs.push('allergies=' + calllergies);
	inputs.push('bloodGroup=' + cbloodGroup);
	inputs.push('estimatedDryWeight=' + estimatedDryWeight);
	inputs.push('dateOfInitiationDialysis=' + dateOfInitiationOfDialysis);
	inputs.push('frequencyOfDialysis=' + frequencyOfDialysis);
	inputs.push('primaryRenalDisease=' + primaryRentalDisease1);
	inputs.push('vascularAccessDetail=' + vasuclaraccessdetails1);
	inputs.push('ironStatus=' + ironStatues1);
	inputs.push('lastBloodTransfusion=' + lastBloodTransfusion1);
	inputs.push('specialNeedsProblems=' + specialNeedsProblems1);
	inputs.push('diabetesMellitus=' + diabetesMellitus);
	inputs.push('cerobroVascularDisease=' + cerebroVascularDisease);
	inputs.push('isChemicHeartDisease=' + ischemicHeartDisease);
	inputs.push('choronicLungDisease=' + chronicLungDisease);
	inputs.push('peripheralVascularDisease=' + peripheralVascularDisease);
	inputs.push('choronicLiverDisease=' + chronicliverdisease);
	inputs.push('tuberculosis=' + tuberclosis);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dialysis/saveHemoDialysisCarePlan",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r == 1) {
				alert("Record saved successfully..!");

				
			} else {
				alert("Record Update successfully..!");
			}
			getListCarePlanDialysis();
		}
	});
}


//added by Dnyaneshwar Get List of Care Plan Dialysis
 function getListCarePlanDialysis() {
	var treatmentId = $("#tr_Id").val();
	
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : {
					"treatmentId" : treatmentId,
				},
				url : "ehat/dialysis/getlistCarePlanDialysis",

				success : function(r) {

					if (r.listCarePlanDialysis.length > 0) {

						$('#careplanId').val(
								r.listCarePlanDialysis[0].careplanId);
						$("#careplanregNo").val(r.listCarePlanDialysis[0].regNo);
						
						$("#name").val(r.listCarePlanDialysis[0].name);
						
						$("#bedNo").val(r.listCarePlanDialysis[0].bedNo);
						
						$('#address').val(r.listCarePlanDialysis[0].address);
						
						$("#martialstatus").val(r.listCarePlanDialysis[0].martialStatus);
						
						$("#phoneNo").val(r.listCarePlanDialysis[0].phoneNo);
						
						$("#dateOfBirthAge").val(r.listCarePlanDialysis[0].dateOfBirth);
						
						$('#alllergies').val(r.listCarePlanDialysis[0].allergies);
						
						$("#bloodGroup").val(r.listCarePlanDialysis[0].bloodGroup);
						
						$("#estimatedDryWeight").val(r.listCarePlanDialysis[0].estimatedDryWeight);
						
						$("#dateOfInitiationOfDialysis").val(r.listCarePlanDialysis[0].dateOfInitiationDialysis);
						
						$('#frequencyOfDialysis').val(r.listCarePlanDialysis[0].frequencyOfDialysis);
						
						$("#primaryRentalDisease1").val(r.listCarePlanDialysis[0].primaryRenalDisease);
						
						$("#vasuclaraccessdetails1").val(r.listCarePlanDialysis[0].vascularAccessDetail);
						
						$("#ironStatues1").val(r.listCarePlanDialysis[0].ironStatus);
						
						$("#lastBloodTransfusion1").val(r.listCarePlanDialysis[0].lastBloodTransfusion);
						
						$('#SpecialNeedsProblems1').val(r.listCarePlanDialysis[0].specialNeedsProblems);
       
						var diabetesMellitus = r.listCarePlanDialysis[0].diabetesMellitus;
                     
						if (diabetesMellitus == 'Y') {
							$("#diabetesMellitus").prop('checked', true);
						} else {
							diabetesMellitus = "N";
						}

					var cerobroVascularDiseaseCheckBox = r.listCarePlanDialysis[0].cerobroVascularDisease;
					if (cerobroVascularDiseaseCheckBox == 'Y') {
					
						$("#cerobroVascularDisease").prop('checked', true);
					} else {
						cerobroVascularDisease = "N";
					}

					var isChemicHeartDiseaseCheckBox = r.listCarePlanDialysis[0].isChemicHeartDisease;
					if (isChemicHeartDiseaseCheckBox == 'Y') {
						
						$("#isChemicHeartDisease").prop('checked', true);
					} else {
						isChemicHeartDisease = "N";
					}

					var peripheralVascularDiseaseCheckBox = r.listCarePlanDialysis[0].peripheralVascularDisease;
					if (peripheralVascularDiseaseCheckBox == 'Y') {
					
						$("#peripheralVascularDisease").prop('checked', true);
					} else {
						peripheralVascularDisease = "N";
					}

					var choronicLiverDiseaseCheckBox = r.listCarePlanDialysis[0].choronicLiverDisease;
					if (choronicLiverDiseaseCheckBox == 'Y') {
						
						$("#choronicLiverDisease").prop('checked', true);
					} else {
						choronicLiverDisease = "N";
					}

					var tuberculosisCheckBox = r.listCarePlanDialysis[0].tuberculosis;
					if (tuberculosisCheckBox == 'Y') {
						
						$("#tuberculosis").prop('checked', true);
					} else {
						tuberculosis = "N";
					}

					var choronicLungDiseaseCheckBox = r.listCarePlanDialysis[0].choronicLungDisease;
					if (choronicLungDiseaseCheckBox == 'Y') {
						
						$("#choronicLungDisease").prop('checked', true);
					} else {
						choronicLungDisease = "N";
					}
				}
				}
			});
}


 
// Added by Dnyaneshwar create and virology and vacccination deatails
 
function createVirologyAndVacccinationDetails(callfrom) {
	var count=0;
	var rows = $('#VirologyAndVacccinationDetailsBody tr').length;
	
	rows++;

	divId = "virologyAndVacccinationDetailsRow" + rows;

	var x = document.createElement('tr');

	x.setAttribute('id', divId);

	document.getElementById("VirologyAndVacccinationDetailsBody")
			.appendChild(x);

	document.getElementById(divId).innerHTML =

	'<td><label>' + rows + '</label></td>'

	+ '<td><input type="text" id="hep_B_vac' + rows+ '" onclick=displayCalendar(document.getElementById("hep_B_vac'+ rows + '"),"dd/mm/yyyy",this)></td>'

			+ '<td><input type="text" id="hbsag' + rows
			+ '" onclick=displayCalendar(document.getElementById("hbsag' + rows
			+ '"),"dd/mm/yyyy",this)></td>'

			+ '<td><input type="text" id="hep_c' + rows
			+ '" onclick=displayCalendar(document.getElementById("hep_c' + rows
			+ '"),"dd/mm/yyyy",this)></td>'

			+ '<td><input type="text" id="hiv' + rows+ '" onclick=displayCalendar(document.getElementById("hiv' + rows+ '"),"dd/mm/yyyy",this)></td>'

			+ '<td><input type="checkbox" value="0"  name="checkboxVVDetails"  id="checkboxVVDetails'+ rows + '"/></td>';

	count++;
}




function createDivBloodTransfusion(callfrom) {
	var count1=0;
	var rows = $('#lastBloodTrasfusionBody tr').length;
	//alert("BT " + rows);
	rows++;

	divId = "lastBloodTrasfusionRow" + rows;

	var x = document.createElement('tr');

	x.setAttribute('id', divId);

	document.getElementById("lastBloodTrasfusionBody").appendChild(x);

	document.getElementById(divId).innerHTML =

	'<td><label>'
			+ rows
			+ '</label></td>'

			+ '<td><input type="text" id="unit'
			+ rows
			+ '"></td>'

			+ '<td><input type="text"  id="blood_transfusion_date'+ rows+ '" onclick=displayCalendar(document.getElementById("blood_transfusion_date'+ rows+ '"),"dd/mm/yyyy",this)></td>'

			+ '<td><input type="checkbox"  value="0"  name="checkboxBloodTransfusion"  id="checkboxBloodTransfusion'+ rows + '"/></td>';

	count1++;
}
/*******************************************************************************
 * @author DyaneshKadam Patil
 * @date 6_Noc_2019
 * @Code save haerecordmodialtsis for Last blood transfusion Table
 ******************************************************************************/
function saveLastBloodtransfusionTable() {

	var blodtransfusionTableList = {
		listbloodTransfusionTable : []

	};
	var count = 0;
	var totalRow = $('#lastBloodTrasfusionBody tr').length;

	for ( var i = 1; i <= totalRow; i++) {
		count++;
		var bloodTransfusionId = $("#checkboxBloodTransfusion" + count + "").val();

		if (bloodTransfusionId) {

		} else {
			bloodTransfusionId = 0;
		}	
		var unit = $("#unit" + count + "").val();	
		var bTDate = $("#blood_transfusion_date" + count + "").val();	
		var treatmentId = $("#tr_Id").val();
		var patientId = $("#pt_Id").val();
		
		blodtransfusionTableList.listbloodTransfusionTable.push({
			"bloodTransfusionId" : bloodTransfusionId,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"unit" : unit,
			"bloodTransfusionDate" : bTDate
		});
	}
	
	bloodTList = JSON.stringify(blodtransfusionTableList);
	
	var inputs = [];
	inputs.push("bloodList=" + encodeURIComponent(bloodTList));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/saveBloodtransfusionList",
		data : str + "&reqType=AJAX",
		cache : false,

		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			getBloodTransfusionListById();
			
		}
	});
}



/*******************************************************************************
 * @author DyaneshKadam Patil
 * @date 6_Noc_2019
 * @Code save haerecordmodialtsis for save Virology Vaccination Table
 ******************************************************************************/
function saveVirologyVaccinationTable() {

	var virologyVaccinationTableList = {
		virologyVaccinationTable : []
	};
	var count = 0;
	
	var totalRow = $('#VirologyAndVacccinationDetailsBody tr').length;
	
	for ( var i = 1; i <= totalRow; i++) {
		count++;
		var virologyVaccinationId = $("#checkboxVVDetails" + count + "").val();
		
		var hep_B_vac = $("#hep_B_vac" + count + "").val();	
		var hbsag = $("#hbsag" + count + "").val();
		var hep_c = $("#hep_c" + count + "").val();
		var hiv = $("#hiv" + count + "").val();
		var treatmentId = $("#tr_Id").val();
		var patientId = $("#pt_Id").val();			
		virologyVaccinationTableList.virologyVaccinationTable.push({
			"virologyVaccinationId" : virologyVaccinationId,
			"treatmentId" : treatmentId,
			"patientId" : patientId,
			"hep_B_vac" : hep_B_vac,
			"hbsag" : hbsag,
			"hep_c" : hep_c,
			"hiv" : hiv
		});
	}
	virologyVaccination = JSON.stringify(virologyVaccinationTableList);
	var inputs = [];
	inputs.push("virologyVaccinationList=" + encodeURIComponent(virologyVaccination));
	// Ajax Call
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/savevirologyVaccinationList",
		data : str + "&reqType=AJAX",
		cache : false,

		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			getVirologyVaccninationListById();
			
		}
	});
}



function getBloodTransfusionListById() {
	var treatmentId = $("#tr_Id").val();
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : {
					"treatmentId" : treatmentId,
				},
				url : "ehat/dialysis/getBloodTransfusionListById",
				success : function(r) {
				
					var divContent = "";
					for ( var i = 0; i < r.listbloodTransfusionTable.length; i++) {
						
						divContent = divContent
								+ '<tr>'
								+ "<td  class='col-md-1 center' style='height: 21.5px;'>"
								+ (i + 1) + "</td>";

						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text' class='center' id='unit"+ (i + 1) + "'  value='"+ r.listbloodTransfusionTable[i].unit+ "'></td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='blood_transfusion_date"+ (i + 1) + "' value='"+ r.listbloodTransfusionTable[i].bloodTransfusionDate + "'onclick=displayCalendar(document.getElementById('blood_transfusion_date"+ (i+1) +"'),'dd/mm/yyyy',this) ></td>";
					
						divContent = divContent
								+ "<td class='col-md-1' style='height: 21.5px;'>"
								+ " <input type='checkbox'  class='form-control input-SmallText' id='checkboxBloodTransfusion"
								+ (i + 1) + "'  value='"
								+ r.listbloodTransfusionTable[i].bloodTransfusionId
								+ "' name='checkboxBloodTransfusion' ></td>";

						+'</tr>';
					}

					$('#lastBloodTrasfusionBody').html(divContent);
				}
			});

}




function getVirologyVaccninationListById() {
	var treatmentId = $("#tr_Id").val();
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : {
					"treatmentId" : treatmentId,
				},
				url : "ehat/dialysis/getVirologyVaccninationListById",
				success : function(r) {
		
					var divContent = "";
					for ( var i = 0; i < r.virologyVaccinationTable.length; i++) {
				
						divContent = divContent
								+ '<tr>'
								+ "<td  class='col-md-1 center' style='height: 21.5px;'>"
								+ (i + 1) + "</td>";
						divContent = divContent
								+ "<td class='col-md-1 center' style='height: 21.5px;'>"
								+ " <input type='text'   class='center' id='hep_B_vac"+ (i + 1) + "' value='"+ r.virologyVaccinationTable[i].hep_B_vac + "' onclick=displayCalendar(document.getElementById('hep_B_vac"+ (i+1) +"'),'dd/mm/yyyy',this)></td>";
						divContent = divContent
						+ "<td class='col-md-1 center' style='height: 21.5px;'>"
						+ " <input type='text'   class='center' id='hbsag"+ (i + 1) + "' value='"+ r.virologyVaccinationTable[i].hbsag + "' onclick=displayCalendar(document.getElementById('hbsag"+ (i+1) +"'),'dd/mm/yyyy',this) ></td>";
						
						divContent = divContent
						+ "<td class='col-md-1 center' style='height: 21.5px;'>"
						+ " <input type='text'   class='center' id='hep_c"+ (i + 1) + "' value='"+ r.virologyVaccinationTable[i].hep_c + "' onclick=displayCalendar(document.getElementById('hep_c"+ (i+1) +"'),'dd/mm/yyyy',this) ></td>";
					
						divContent = divContent
						+ "<td class='col-md-1 center' style='height: 21.5px;'>"
						+ " <input type='text'   class='center' id='hiv"+ (i + 1) + "' value='"+ r.virologyVaccinationTable[i].hiv + "' onclick=displayCalendar(document.getElementById('hiv"+ (i+1) +"'),'dd/mm/yyyy',this) ></td>";
						
						divContent = divContent
								+ "<td class='col-md-1' style='height: 21.5px;'>"
								+ " <input type='checkbox'  class='form-control input-SmallText' id='checkboxVVDetails"
								+ (i + 1) + "'  value='"
								+ r.virologyVaccinationTable[i].virologyVaccinationId
								+ "' name='checkboxVVDetails' ></td>";

						+'</tr>';
					}

					$('#VirologyAndVacccinationDetailsBody').html(divContent);
				}
			});

}


//added by Dyaneshwar 6/11/2019
function printHaemoCarePlanForm() {
	
	var treatmentId = $("#tr_Id").val();
	window.open("ehat_hemodialysisCarePlanPrint.jsp?tretmentId="
			+ treatmentId);
}

/*******************************************************************************
 * @author Dyanesh Patil
 * @date 22_OCT_2019
 * @Code remove row template in haerecordmodialtsis 
 ******************************************************************************/
function removeDivBloodTransfusion() {
	idList=[];
    $("#lastBloodTrasfusionBody").find('input[name="checkboxBloodTransfusion"]').each(function(){
        if($(this).is(":checked")){
        	var currentId1=$('#'+this.id).val();
        	if(currentId1==0){
        		$(this).parents("tr").remove();
        	}else{
        		idList.push(currentId1);
        	}	
        }
    });
   
    if(idList.length > 0){
    	var r = confirm("Are You Sure You Want To Delete this row ?");
    	if (r == true) {

    		var inputs = [];

    		inputs.push('idTables=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/dialysis/deleteForBloodTransfution",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alert(r);
    				getBloodTransfusionListById();
    			}
    		});

    	}
    }	
}



/*******************************************************************************
 * @author Dyanesh Patil
 * @date 22_OCT_2019
 * @Code remove row template in haerecordmodialtsis 
 ******************************************************************************/
function removeVirologyAndVacccinationDetails() {
	idList=[];
    $("#VirologyAndVacccinationDetailsBody").find('input[name="checkboxVVDetails"]').each(function(){
        if($(this).is(":checked")){
        	var currentId2=$('#'+this.id).val();
        	if(currentId2==0){
        		$(this).parents("tr").remove();
        	}else{
        		idList.push(currentId2);
        	}	
        }
    });
    if(idList.length > 0){
    	var r = confirm("Are You Sure You Want To Delete this row ?");
    	if (r == true) {

    		var inputs = [];

    		inputs.push('idTables=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/dialysis/deleteForVirologyVaccination",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alert(r);
    				getVirologyVaccninationListById();

    			}
    		});

    	}
    }
}



/*******************************************************************************
 * @author Ajay khandare
 * @date 25_oct_2019
 * @Code template set upload 
 ******************************************************************************/

function temForuploaddocuments(){
	
	var temp=
	
		
		'<br><div class="divide-10"></div>'
	     +'<div class="box-body col-md-12-1" style="padding-top: 10px; padding-bottom: 0px">'
	     +'<div class="form-group  box border col-md-12-1">'
	     +'<div class="col-md-12-1" style="margin-top: 0px;  padding-left: 3px;">'
	     +'	<div class="col-sm-12-1" style="margin-top: 0px;margin-top: 0px; height: 160px; overflow-y: scroll;" id="divdocDispTable">'
	     +'<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
	     +'<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
	     +'<th class="col-md-2-1" style="height: 21.5px; padding-left: 50px;"><div class="TextFont">Document</div></th>'
	     +'<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Note</div></th>'
	     +'<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Date</div></th>'
	     +'<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View / Delete</div></th>'
	     +'</tr></thead><tbody id="docDispTable"><tr><td colspan="5">No Record Found</td></tr></tbody>'
	     +'</table></div></div></div></div>'
	     ;
	
	$("#fileUploadfrm").show();
	$("#uploadDocumentsBody").html(temp);
	
	
	
}

/*******************************************************************************
 * @author Ajay khandare
  * @date 25_oct_2019
 * @Code  save data upload 
 ******************************************************************************/
function uploadDocumentOnDialysis() {
   
	var upid = $('#upid').val();
	var doc = $('#ifile').val();
	var note = $('#iNotes').val();
	if (note == "" || note == null || note == undefined ) {
		note="-";
	}
	var files = $('#ifile').prop("files");
	
	var doc1 = $.map(files, function(val) {
		return val.name;
	});
	
	var treatmentId = $("#tr_Id").val();
	if (doc == "") {
		alert("Please select file first ");
		return false;
	}

	var inputs = [];
	inputs.push('upid=' + upid);
	inputs.push('filePath=' + doc1);
	inputs.push('note=' + note);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/dialysis/uploadDocumentOnDialysis",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			getuploadDocuments();
			

		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 25_oct_2019
 * @Code  fetch upload 
 ******************************************************************************/
function getuploadDocuments() {

	var treatmentId = $("#tr_Id").val();
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId,
		},
		url : "ehat/dialysis/fetchuploadDocument",
		success : function(r) {
			
			setUploadDocListOnDialysis(r);// call template
		}
	});
}


/*******************************************************************************
 * @author Ajay khandare
 * @date 25_oct_2019
 * @Code template set upload 
 ******************************************************************************/
function setUploadDocListOnDialysis(r){
var optionList = "<option></option>";

function convertDate(inputformat)
{
	function pad(s){return (s<10) ? '0' +s:s;}
	var d=new Date(inputformat);
return[pad(d.getDate()),pad(d.getMonth()+1),d.getFullYear()].join('/');
}


var masterModuleBody = '<thead class="cf" style="background: wheat;" id="ehatTHead">'
		+ '<tr>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">#</th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">Documents</th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">Notes</th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">Date</th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">View </th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">Delete </th>'
	
	    + '<th class="col-md-1 center"></th>' + '</tr></thead>';
for ( var int = 0; int < r.listdocumentDialysis.length; int++) {
 
	masterModuleBody = masterModuleBody
			+

			'<tr>'
			+ '<td id="row'
			+ (r.listdocumentDialysis[int].upid)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+ (int + 1)
			+ '</td>'
		
			+ '<td id="documents'
			+ (r.listdocumentDialysis[int].upid)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+ (r.listdocumentDialysis[int].filePath)
			+ ' </td>'

			+ '<td id="note'
			+ (r.listdocumentDialysis[int].upid)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+ (r.listdocumentDialysis[int].note)
			+ ' </td>'

			+ '<td id="date'
			+ (r.listdocumentDialysis[int].upid)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+convertDate(r.listdocumentDialysis[int].date)
			+ ' </td>'
			+ '<td  class="col-md-1 center" style="height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
			+ r.listdocumentDialysis[int].upid
			+ ' onclick="ReadDocumentsOnDialysisupload('
			+ r.listdocumentDialysis[int].upid
			+ ')"><i class="fa fa-edit"></i></button></td>'

			+ '<td  class="col-md-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
			+ r.listdocumentDialysis[int].upid
			+ ' onclick=deleteUploadDocListOnDialysis('
			+ r.listdocumentDialysis[int].upid
			+ ') > <i class="fa fa-trash-o"></i></button> </td>'
			+ '</tr>';

	optionList = optionList + "<option value="
			+ r.listdocumentDialysis[int].upid + ">"
			+ r.listdocumentDialysis[int].filePath + "</option>";
}

$("#masterModuleBodyNarr").html(masterModuleBody);
$("#docDispTable").html(masterModuleBody);
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 25_oct_2019
 * @Code Read data  upload documents
 ******************************************************************************/
function ReadDocumentsOnDialysisupload(upid) {
	var doc = $("#documents" + upid).html();
	var note = $("#note" + upid).html();
	$('#viewDocModal123').modal('show');
	//$('#ViewDocumemnt123').attr("src", "DialysisReadDocument?fileName=" + doc);
	$('#ViewDocumemnt').attr("src","ehat/dialysis/readDailysisimage?fileName="+doc);	
	$('#documentComment').html(note);
}



/*******************************************************************************
 * @author Ajay khandare
  * @date 25_oct_2019
 * @Code deleted upload documents
 ******************************************************************************/
function deleteUploadDocListOnDialysis(upid) {
   var r = confirm("Are You Sure You Want To Delete Upload Documents?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/dialysis/deleteuploadDocument",
			data : {
				"upid" : upid
			},
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				/* alertify.error(response); */
				alert("Record Deleted successfully..!");
				getuploadDocuments();
			}
		});
	}
}




// added by ajay :04/11/2019 : get ward name 
function getwardtypeName()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/getwardtypeName",
		success : function(r) {
			
			setTemplatewardname(r);
		}
	});
}
function setTemplatewardname(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listDialysis.length; int++) {
		list=list+'<option value="'+(r.listDialysis[int].hallId)+'">'+(r.listDialysis[int].wardName)+'</option>';
		
	}	
	$("#wardid").html(list);
	
}

//added by ajay :05-11-2019 get wardtype of bed no..
function getwardtypeNameofBedNo()
{ 
	var wardId = $('#wardid').val();

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
		
			"wardId" : wardId
		},
		url : "ehat/dialysis/getwardtypeNameofBedNo",
		success : function(r) {
			setTempofbedNO(r);
		}
	});

}
//added by ajay :05-11-2019 set wardtype of bed no..
function setTempofbedNO(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.lstIpdbillPatientsBeds.length; int++) {
		list=list+'<option value="'+(r.lstIpdbillPatientsBeds[int].bedname)+'">'+(r.lstIpdbillPatientsBeds[int].bedname)+'</option>';
		
	}	
	$("#bedid").html(list);
	
}

//added by ajay :05-11-2019 Handle Dialysis Scheduler Canlender..
function setDialysisCalenderOnLoad() {
		var todays_date = $("#todays_date").val();
		var arrDate = todays_date.split("-");

		$('#calendar2').html("");
		$('#calendar2').fullCalendar(
				{
					header : {
						left : '',
						center : 'title',
						right : '',
						allDaySlot : false,
					},
					allDaySlot : !0,
					allDayText : "all-day",
					firstHour : "0:0:0",
					slotMinutes : 15,
					defaultEventMinutes : 120,
					axisFormat : "h(:mm)tt",
					timeFormat : {
						agenda : "h:mm{ - h:mm}"
					},
					dragOpacity : {
						agenda : .5
					},
					minTime : "0:0:0",
					maxTime : "23:59:0",
					slotEventOverlap : !0,
					selectable : true,
					selectHelper : true,
					select : function(start, end, allDay) {
						
						$("#startTime").val(start);
						$("#endTime").val(end);
					},
					droppable : true
				});
		$('#calendar2').fullCalendar('gotoDate', arrDate[0], (arrDate[1] - 1),
				arrDate[2]);

	} 
//added by ajay :05-11-2019 get patient Autosuggestion..
function autoSuggestionForPatientNameDialysis(inputID) {
	
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();	
	var inputs = [];
	inputs.push('patiename=' + txtVal1);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dialysis/autoSuggestionPatientNameDialysis",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
		//	alert(JSON.stringify(r));
			var availableTags = [];
			if (r.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				ajaxResponse = r;
				for ( var i = 0; i < ajaxResponse.listDialysis.length; i++) {
					availableTags.push(ajaxResponse.listDialysis[i].patientName + "~"+ ajaxResponse.listDialysis[i].mobile + "~"+ ajaxResponse.listDialysis[i].patientId);
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("~");
					//var arrtest = (availableTags[j]).split("-");
				
					var idValue = (arrValue[0]);
					var testvalue =(arrValue[1]);
					var testId =(arrValue[2]);
					//alert(idValue);
					
					resultData.push({
						ID : idValue,
						testid :testvalue+"~"+testId,
						Name : arrValue[0],
					});

					template = template + '<li data-value= "' + (arrValue[1]) +(arrValue[2])
							+ '" class=""><a href="#">' + arrValue[0]+ arrValue[1]
							+ '</a></li>';

				}
				$("#div" + inputID + " .typeahead").html(template);


				setTimeout(function() {
					$('#' + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
					      valueField : 'testid',
				     	onSelect : displayResult2,
						scrollBar : true

					});

				}, 500);
			}
		}
	});

	function displayResult2(item) {
		$('#' + inputID).val(item.text);
		var testChargesId = (item.value).split("~");
		$("#patMob").val(testChargesId[0]);	
		$("#patientId").val(testChargesId[1]);
 

	}
}
	
//added by ajay :05-11-2019 save patient dialysis scheduler..
function saveDialysisScheduler()
{
	
	var dialysisSchedulerId = $("#dialysisSchedulerId").val();
	
	
	var schedulerDate = $("#schedulerDate").val();	
	if (schedulerDate == null || schedulerDate == "") {
		alert("Please Enter Date ");
		return false;
	}
	
	var wardid = $("#wardid").val();
	
	if (wardid == null || wardid == "") {
		alert("Please Enter dialysis Ward");
		return false;
	}	
	
	var bedid = $("#bedid").val();
	
	if (bedid == null || bedid == "") {
		alert("Please Enter  Dialysis Bed No");
		return false;
	}
	

	var patientId = $("#patientId").val();
	
	if (patientId == null || patientId == "") {
		alert("Please Enter Patient Name");
		return false;
	}
	
	
	var patMob = $("#patMob").val();
	
	if (patMob == null || patMob == "") {
		alert("Please Enter Mobile Number");
		return false;
	}
	var details = $.trim($("#details").val());
	
	var startTime = $("#startTime").val();
	var startTime1 = new Date(startTime).toLocaleTimeString('en-GB');
	var endTime = $("#endTime").val();
	var endTime1 = new Date(endTime).toLocaleTimeString('en-GB');
	
	
	if (startTime1 == "00:00:00" && endTime1 == "00:00:00") {
		alert("Please Select Time");
		return false;
	}
	
	 var SchedulerDialysisList = {
				listDialysis : []
			};
		   
	 SchedulerDialysisList.listDialysis.push({
				"schedulerId":dialysisSchedulerId,
				"schedulerDate":schedulerDate,
				"wardid" : wardid,
				"wardBedId" : bedid,
				"patientId" : patientId,
				"patMob" : patMob,
				"details" : details,
				"startTime" : startTime1,
				"endTime" : endTime1
			
				
			});

	 SchedulerDialysisList = JSON.stringify(SchedulerDialysisList);
	
	
	var inputs = [];
	inputs.push('schedulerDialysisList=' +encodeURIComponent(SchedulerDialysisList));
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dialysis/saveDialysisScheduler",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r == 1) {
				alert("Record saved successfully..!");
			} else {
				alert("Record Update successfully..!");
			}
			
			getPatientNameListAlreadyPresent();
			refreshschedulerfix();
			
		}
	});
}
//added by ajay :05-11-2019 refresh value on dialysis scheduler..
function refreshschedulerfix()
{
	$('#schedulerDate').val(" ");
	$('#wardid').val(" ");
	$('#patinetName').val(" ");
	$('#patMob').val(" ");
	$('#details').val(" ");
	$('#bedid').val(" ");
	$('#endTime').val(" ");
	

}

//added by ajay :05-11-2019 get patient dialysis scheduler..
function getPatientNameListAlreadyPresent()
{ 
	var schedulerDate = $("#schedulerDate").val();	
	
	if (schedulerDate == null || schedulerDate == "") {
		alert("Please select Date ");
		return false;
	}
	var wardId = $('#wardid').val();
	
	if (wardId == null || wardId == "") {
		alert("Please select ward type ");
		return false;
	}
	var wardBedId = $("#bedid").val();
	
	if (wardBedId == null || wardBedId == "") {
		alert("Please select Chair type ");
		return false;
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"schedulerDate" : schedulerDate,
			"wardId" : wardId,
			"wardBedId" : wardBedId,
		},
		url : "ehat/dialysis/getPatientNameListAlreadyPresent",
		success : function(r) {
			setpatientNameListAlreadyPresent(r);
			
		}
	});

}

//added by ajay :06-11-2019 set patientlist dialysis scheduler..
function setpatientNameListAlreadyPresent(r){

	var duration=30;
	var arrTempDate ="";
	var color = "green";
	var events = new Array();
	var appStartTime="";
	var timeStart="";
	var timeStartApp=0;
	var appEndTime="";  
	var schedulerId = "";	
    var schedulerDate = "";
    var wardid = "";
	var wardBedId = "";
	var patientName = "";
    var mobilenumber = "";
	var details = "";
    var patientId = "";	
    var value = "";
	var i=0;
	
	for (  i = 0; i < r.listDialysis.length; i++) {

		    appStartTime = r.listDialysis[i].startTime; 
		    
		    appEndTime = r.listDialysis[i].endTime; 
		  
		    timeStart = appStartTime.substring(0, 2);
		   
		    timeStartApp = parseInt(timeStart);
		    
		  
			if (appStartTime != "" && appEndTime != "") {
			    var tStart = parseTime(appStartTime);
			    var tStop = parseTime(appEndTime);
			    value = (tStop - tStart)/(1000*60);			     
			}
			else {
			        value = "";		        
			}
		   schedulerId = r.listDialysis[i].schedulerId;
		   schedulerDate = r.listDialysis[i].schedulerDate;
		   wardid = r.listDialysis[i].wardid;
		   wardBedId = r.listDialysis[i].wardBedId;
		   patientName = r.listDialysis[i].patientname;
		   mobilenumber = r.listDialysis[i].patMob;
		   details = r.listDialysis[i].details;
		   patientId = r.listDialysis[i].patientId;  
		   var appTimeStart;
		   var tempTime;
	  
		  
		  if (appStartTime % 1 != 0) {
				var arrAppStartTime = appStartTime.toString().split('.');
				if (arrAppStartTime[0] < 10) {
					tempTime = "0" + arrAppStartTime[0];
				} else {
					tempTime = arrAppStartTime[0];
				}
				appTimeStart = tempTime;
			} else {
				if (appStartTime < 10) {
					tempTime = "0" + appStartTime;
				} else {
					tempTime = appStartTime;
				}
				appTimeStart = tempTime;
			}
		  
			var appTimeEnd = addMinutes(appTimeStart, value);
			   
			arrTempDate = (r.listDialysis[i].schedulerDate).split("-");
			
			var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]+ "-" + arrTempDate[0];
		  
			event = new Object();
			
			event.title = patientName;
			event.start = appStartDate + "T" + appTimeStart;// its a	
			event.end = appStartDate + "T" + appTimeEnd; // its a
			
			if (color == "green") {
				event.backgroundColor = Theme.colors.green;
				event.color = Theme.colors.green;
			}
			event.allDay = false; //
			
			event.schedulerId = schedulerId;
			event.schedulerDate = schedulerDate;
			event.wardid = wardid;
			event.wardBedId = wardBedId;
			event.details = details;
			event.patientId = patientId;
			event.mobilenumber = mobilenumber;
			event.appStartTime = appStartTime;
			event.appEndTime = appEndTime;
			
			/*alert(JSON.stringify(event)+"event");*/
			events.push(event);
	}
	
	$('#calendar11').html("");
	$('#calendar11').fullCalendar(
			{
				header : {
					left : '',
					center : 'title',
					right : '',
					allDaySlot : false,
				},
				allDaySlot : !0,
				allDayText : "all-day",
				firstHour : timeStartApp,
				slotMinutes : duration,
				defaultEventMinutes : 120,
				axisFormat : "h(:mm)tt",
				timeFormat : {
					agenda : "h:mm{ - h:mm}"
				},
				dragOpacity : {
					agenda : .5
				},
				minTime : "0:0:0",
				maxTime : "23:59:0",
				slotEventOverlap : !0,
				selectable : true,
				selectHelper : true,
				select : function(start, end, allDay) {
					
					$("#startTime").val(start);
					$("#endTime").val(end);
    				$(".popup").show();
					$(".title").focus();
					$(".submitFrom").click(
					function() {

								
					$(".popup").hide();
					});

					$(".exit").click(function() {
						// clear all info, unselect events
						// and...
						$(".popup").hide();
					});
					// calendar.fullCalendar('unselect');			
				},
				// adding ajay:20/11/2019 for update function if user have change time then click on event then set time then save . user successfully time update
				eventClick: function(calEvent, jsEvent, view) {
		
				var title = prompt('Do you want to Reschedule appoinment?:',				
				calEvent.title, calEvent.schedulerId,
				calEvent.schedulerDate, calEvent.wardid,
				calEvent.wardBedId, calEvent.title,
				calEvent.mobilenumber, calEvent.details,
				calEvent.patientId, calEvent.appStartTime,
				calEvent.appEndTime,{
				buttons : {Ok : true,	Cancel : false}});
				
				var schedulerId1 = "";	
			    var schedulerDate1 = "";
			    var wardid1 = "";
				var wardBedId1 = "";
				var patientName1 = "";
			    var mobilenumber1 = "";
				var details1 = "";
			    var patientId1 = "";
			    var startTime1 = "";
			    var endtIme1 = "";
			    
              	if (title){              
                        title =calEvent.title;
                        schedulerId1 = calEvent.schedulerId;
                        schedulerDate1 = calEvent.schedulerDate;
                        wardid1 =calEvent.wardid;
                        wardBedId1 = calEvent.wardBedId;
                        patientName1 = calEvent.title ;
                        mobilenumber1 =calEvent.mobilenumber;
                        details1 = calEvent.details;
                        patientId1 =calEvent.patientId;
                        startTime1 =calEvent.appStartTime;
                        endtIme1 =calEvent.appEndTime;
						
						$('#dialysisSchedulerId').val(schedulerId1);
						$('#schedulerDate').val(schedulerDate1);
						$('#wardid').val(wardid1);
						$('#bedid').val(wardBedId1);
		    			$('#patinetName').val(patientName1);
						$('#patMob').val(mobilenumber1);
						$('#details').val(details1);
						$('#patientId').val(patientId1);	
						$('#startTime').val(startTime1);
						$('#endTime').val(endtIme1);
              	  }				
			   },
				droppable : true,
			});
	
	$('#calendar11').fullCalendar('gotoDate', arrTempDate[2],(arrTempDate[1] - 1), arrTempDate[0]);
	$('#calendar11').fullCalendar('addEventSource', events);	
	
}

//added by ajay :06-11-2019 calculate adding minutes starts time and calculate minutes show slot booking in calender.
function addMinutes(time, minsToAdd) {
	function D(J) {
		return (J < 10 ? '0' : '') + J;
	}
	;
	var piece = time.split(':');
	var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

	return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60) + ':00';
}

//added by ajay :06-11-2019 calculate two difference time in minutes starts_time and end_time  scheduler..
function parseTime(cTime)
	{
	  if (cTime == '') return null;
	  var d = new Date();
	  var time = cTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
	  d.setHours( parseInt(time[1]) + ( ( parseInt(time[1]) < 12 && time[4] ) ? 12 : 0) );
	  d.setMinutes( parseInt(time[3]) || 0 );
	  d.setSeconds(0, 0);
	  return d;
}

//added by ajay :05-11-2019 get patient List dialysis scheduler date Wise..
function getPatientNameListDateWise()
{ 
	var schedulerDate = $("#dschedulerDate").val();		
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"schedulerDate" : schedulerDate,
		},
		url : "ehat/dialysis/getPatientNameListDateWise",
		success : function(r) {
			setpatientNamaeList(r);
		}
	});

}

//added by ajay :05-11-2019 get patient List dialysis scheduler date Wise And Ward type..
function getPatientNameListDateAndWardWise()
{ 
	var schedulerDate = $("#dschedulerDate").val();		
	var wardId = $('#wardid').val();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"schedulerDate" : schedulerDate,
			"wardId" : wardId,
		},
		url : "ehat/dialysis/getPatientNameListDateAndWardWise",
		success : function(r) {
			setpatientNamaeList(r);
		}
	});

}


//added by ajay :05-11-2019 get patient List dialysis scheduler date Wise And Ward type..
function getPatientNameListDateAndWardWiseAndChairType()
{ 
	var schedulerDate = $("#dschedulerDate").val();		
	var wardId = $('#wardid').val();
	var wardBedId = $("#bedid").val();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"schedulerDate" : schedulerDate,
			"wardId" : wardId,
			"wardBedId" : wardBedId,
		},
		url : "ehat/dialysis/getPatientNameListDateAndWardWiseAndChairType",
		success : function(r) {
			setpatientNamaeList(r);
		}
	});

}


//added by ajay :05-11-2019 check current date and greather than date not accepted previous date.
function setpatientNamaeList(r)
{
	var htm ="";
	var index = 1;
		for ( var i = 0; i < r.listDialysis.length; i++){	
				htm = htm + '<tr> '
					+ ' <td class="col-md-1 center">'+index+'</td>'
					+ ' <td class="col-md-1 center">'+r.listDialysis[i].patientId+'</td>'
					+ ' <td class="col-md-1 left">'+r.listDialysis[i].patientname+'</td>'
					+ ' <td class="col-md-1 center">'+ r.listDialysis[i].startTime+'</td>'
					+ ' <td class="col-md-1 center">'+ r.listDialysis[i].endTime+'</td>'
					+ ' <td class="col-md-1 center">'+ r.listDialysis[i].schedulerDate+'</td>'+ '</tr>';					
					index++;
		}
	

$("#companyDocDetails").html(htm);
}
//added by ajay :05-11-2019 check current date and greather than date not accepted previous date.
function validateDateScheduler()
{
	var date = new Date();
	var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/'
			+ date.getFullYear());
	var arrSceduleDate = ($("#schedulerDate").val()).split("-");
	selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]	+ "/" + arrSceduleDate[2]);

	if ((selectedDate < now)) {
		alert('Appointment not availables for previous date,please select another date');
         $("#schedulerDate").val("");
		return false;
	} 
}


//change By Akshata forward page on ehat ipd_bedward and assign dialysis ward 
function viewBedWard(treatId) {

	window.location.href = "ipd_bed_allocation.jsp?treatId=" + treatId;
}

//adding by ajay:11/11/2019 set information on patient 
function setTempateOnPatientinformation()
{

	var treatmentId = $("#tr_Id").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"treatmentId" : treatmentId,
		},
		url : "ehat/dialysis/fetchPatientsRecordByOnDialysisTreatmentId",

		success : function(r) {

			if (r.listRegTreBillDto.length > 0) {
				
				$('#patientName').text(r.listRegTreBillDto[0].patientName);
				$("#age").text(r.listRegTreBillDto[0].age);
				$("#billNo").text(r.listRegTreBillDto[0].billId);
				$("#billCategoty").text(r.listRegTreBillDto[0].categoryName);
				$("#doa").text(r.listRegTreBillDto[0].dob);
				$("#sex").text(r.listRegTreBillDto[0].gender);	
				$("#consultingDoctor").text(r.listRegTreBillDto[0].billId);
				$("#corporate").text(r.listRegTreBillDto[0].docNameChan);
				$("#refDoctor").text(r.listRegTreBillDto[0].docNameChan);
				$("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
				$("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
				$("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
				$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
				$("#uId").val(r.listRegTreBillDto[0].unitId);
				$("#bill_Id").val(r.listRegTreBillDto[0].billId);
				$("#mobile").text(r.listRegTreBillDto[0].mobile);
				$("#addressheader").text(r.listRegTreBillDto[0].address);
				
				
				$('#patientNameconsent').val(r.listRegTreBillDto[0].patientName);
				$("#addressconsent").val(r.listRegTreBillDto[0].address);
				$("#reletiveconsent").val(r.listRegTreBillDto[0].relativeName);
				
			}
		}
	});

	
}

//added by ajay :09/11/2019 : get doctor name and doctor id
function getdoctorName()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dialysis/getdoctorName",
		success : function(r) {
			
			setTemplateDoctorName(r);
		}
	});
}
function setTemplateDoctorName(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listDialysis.length; int++) {
		list=list+'<option value="'+(r.listDialysis[int].doctorId)+'">'+(r.listDialysis[int].doctorname)+'</option>';
		
	}	
	$("#doctorId").html(list);
	
}

//added by ajay :05-11-2019 get testname Autosuggestion..
function autoSuggestionForTestNameDialysis(inputID) {
	
	var txtVal1 = $('#' + inputID).val();	
	var inputs = [];
	inputs.push('testName=' + txtVal1);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dialysis/autoSuggestionForTestNameDialysis",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			autoCompTestnameDialysis(r,inputID);    
		  }
	});
}
//added by ajay :05-11-2019 set template for test ..
function autoCompTestnameDialysis(response,id) {
	
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
					
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
					
				
						if(ui.item.categoryName!="NO"){
							var depdocdeskid = $("#depdocdeskid").val();
						$('#txtautoserviceName').val(ui.item.categoryName);

						$("#subserviceid").val(ui.item.categoryid);

						$("#serviceid" ).val(ui.item.serviceid);
                        var sponsorId = $("#SponsorsourceTypeId").val();
                        var chargesSlaveId = $("#chargesSlaveId").val();
                 
                       
                       if(sponsorId == 0 && chargesSlaveId == 0){
                    	   if(depdocdeskid==2){
                      		 getchargesDR1(2);
                     		var chargesfromConf= $("#chargesfromConf").val();
                     		if(chargesfromConf==0 || chargesfromConf==null){
                     			 $("#chargesubservice" ).val(ui.item.categorycharges); 
                     			 $("#cpoeCharges2").val(ui.item.categorycharges);
                     		}else{
                     			 $("#chargesubservice" ).val(chargesfromConf); 
                     			 $("#cpoeCharges2").val(chargesfromConf);
                     		}
                     	  }else{
                         		 	   $("#chargesubservice" ).val(ui.item.categorycharges);
                                	   $("#cpoeCharges2").val(ui.item.categorycharges); 
                         		 }
                   
                             }else{
                            	 getchargesDR1(2);
                            	 var chargesfromConf= $("#chargesfromConf").val();
                            	 if(depdocdeskid==2){
                            	
                            		if(chargesfromConf==0 || chargesfromConf==null){
                            			if(parseFloat (chargesfromConf)==0.0 || parseFloat(chargesfromConf) ==0 || chargesfromConf ==null || chargesfromConf ==undefined){
                            				if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                                   			 $("#chargesubservice").val(ui.item.categorycharges);

                               			 }else{
                                   			 $("#chargesubservice").val(ui.item.configcharges);

                               			 }
                            			}
                            			$("#cpoeCharges2").val(ui.item.categorycharges);

                            			
                            		}else{
                            			     $("#chargesubservice" ).val(chargesfromConf); 
                                           	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                                			 $("#cpoeCharges2").val(ui.item.categorycharges);

                            			 }else{
                                			 $("#cpoeCharges2").val(ui.item.configcharges);

                            			 }
                            		}
                            	 }else{

                    			     $("#chargesubservice" ).val(chargesfromConf); 
                                   	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
                        			 $("#cpoeCharges2").val(ui.item.categorycharges);

                    			 }else{
                        			 $("#cpoeCharges2").val(ui.item.configcharges);

                    			 }
                    		
                            	 }
                            	
                             }
                      
                   	calculateEmerChrForDocDesskOpd();			
						if($("#uId").val()==0){
							$("#allunitid").val(ui.item.categoryid);
						}
						fetchSuperCatOnDialysis(ui.item.categoryid);
						}
						if($("#serviceid" ).val()==11 || $("#serviceid" ).val()==13){
							$("#cpoesndtolabdiv").show();
						}else{
							$("#cpoesndtolabdiv").hide();
						}
						
						if($("#serviceid" ).val()==12){
							$("#cpoeSendToRisdiv").show();
						}else{
							$("#cpoeSendToRisdiv").hide();
						}
						
						if($("#serviceid" ).val()==18){
							$("#cpoeSendToRaddiv").show();
						}else{
							$("#cpoeSendToRaddiv").hide();
						}
						$("#iscombination" ).val(ui.item.iscombination);
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
						
						result = [ {
						
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
			
				}
			});
}

// added by ajay : 10/11/2019 getting super category name for example any assign test under pathology this pathology are supercatagory name
function fetchSuperCatOnDialysis(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			
			setDyanamicDivForListDialysis('dynamicItem',response);
		}
	});
}
//added by ajay : 10/11/2019 set template super category name for example any assign test under pathology this pathology are supercatagory name
function setDyanamicDivForListDialysis(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count =i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" style="width: 3%" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
	$('#' + setDiv).html(htm);
}

// adding by ajay:11/11/2019....get charges
function getchargesDR1(hallid) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
		
	var	departmentId =  $("#depdocdeskid").val();
	
	var categoryid = $("#subserviceid").val();
	var treatId=$("#tr_Id").val();
	var toDate ="";
	//alert("toDateopd???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}
	
    var hallId=0;
	var hallSlaveId = 0;
   if (departmentId == 2){
		
	   hallId =hallid;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			$("#chargesfromConf").val(r);

		}
	});
	
}


//added by ajay : 11/11/2019 send test on billing and lab and ris..
function sendDailysisTest(callfrom)
{
	 
	var	departmentId =  $("#depdocdeskid").val();
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();

	var receiptOf  ="general";
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
    var recSlaveId  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveId == "" || recSlaveId == null || recSlaveId == undefined || isNaN(recSlaveId)) {
		recSlaveId = 0;
	} 
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if(departmentId==2){
		//Call for IPDCpoe.
		saveOnDailysisTest();
		
	}else{
	
	var queryType 	 = "insert";
	var module 	 = "DrDesk";
	//var	patienttId   =  $("#patientId").text();
	var	patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val();  
	var	departmentId =  $("#depdocdeskid").val();
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	if (sponsorId > 0 && chargesSlaveId > 0) {
		receiptOf="sponsor";
		getchargesDR(0);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(2);
			otherRate =	parseFloat($("#chargesubservice").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);
		otherAmount=otherRate *1;
		
	}
	  
	rate =  $("#cpoeCharges2").val();
	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
	var billCat		 = $("#billCat").val();
	var coPay        = 0;
	if(billCat==0)
	{
		coPay=amount;
		
	}
	
	//for sponcer patient pkg.
	if(callfrom =="sponsorpack"){
		callfrom="";
		sponsorId =0;
		chargesSlaveId = 0;
	}else{
		callfrom="DrDesk";
	} 
	var iscombination =$("#iscombination" ).val();

	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();

    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
    var sndToLabFlag='N';
    var	sendToRisFlag = 'N';
    var radiationFlag='N';
    var drdeskflag="-";
    if(departmentId==3){
    	drdeskflag='D';
    }else{
     drdeskflag='Y';
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }
    if($("#cpoesndtolab").is(':checked')){
    	sndToLabFlag='Y';
    	sendToRisFlag='N';
    }
    if($("#cpoeSendToRad").is(':checked')){

        radiationFlag='Y';
    }
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		/*alert("Please Select doctor ");
		return false;*/
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	} 
	
	if($("#cpoeSendToRis").prop("checked")==true){
		sendToRisFlag = 'Y';
		sndToLabFlag='N';
	}
	

	
	var serviceDetails = {
            listBillDetails : []
        };
	serviceDetails.listBillDetails.push({
    	billDetailsId:billDetailsId,
        patienttId : patienttId,
        treatmentId : treatmentId,
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
        doctorId:doctorId,
        urgentflag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        sponsorId  : sponsorId,
        chargesSlaveId : chargesSlaveId,
        iscombination : iscombination,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        receiptOf : receiptOf,
        recSlaveId : recSlaveId,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		rFlag : radiationFlag,
		emrPer : emrPer
    });
    
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    serviceDetails = JSON.stringify(serviceDetails);
    subList = JSON.stringify(subList);
    
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveOpdIpdCpoe",
	
		success : function(r) {
			
			 
		if(r ==1){
			alertify.success("Service assign Successfully");
			if(departmentId==3){
				fetchbilldetailsDigno();		 
 			}else{		
			fetchbilldetails();
 			}
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$("#doctor2").val("0");
			$("#chargesubservice").val("");
			
			$("#servicename").val("");
			    $("#cpoeClinicalNotes").val("");
			   $("#cpoeIns").val("");
			   $('#txtautoserviceName').attr('readonly',false);
			   $('#dynamicItem').html("");
			   $('#cpoeUrgent').attr('checked', false);
			   $("#cpoesndtolabdiv").hide();
			   $('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				
				alert("Package is not Configure Please Configure Package!");
				return false;
			}else if(r ==4){
				var res = confirm("Package is not configure for sponsor. Do you want Default Package?");
				if (res == true) {
					//For opd sponsor patient.
					saveCpoe('sponsorpack');
				}else{
					
					return false;
				}
				
			}else if(r ==6){
				 alert("Package is out of Date Can't save!!!!");
				
			}else if(r ==2){
				 alertify.success("Update successfully...!!!");
				 $('#txtautoserviceName').val("");
				 $("#subservicesname").val("");
				 $("#doctor2").val("0");
				 $("#chargesubservice").val("");
				 $("#servicename").val("");
				 $("#cpoeClinicalNotes").val("");
				 $("#cpoeIns").val("");
				 $('#txtautoserviceName').attr('readonly',false);
				 $('#dynamicItem').html("");
				 $('#cpoeUrgent').attr('checked', false);
				 $("#cpoesndtolabdiv").hide();
				 $('#cpoesndtolab').attr('checked', false);
				 $("#chargesubservice").val(0);
				 $("#cpoeCharges2").val(0);
				 $("#billidservice").val(0);
				
			}
		}	
		
	});
	}
}

//added by ajay : 11/11/2019 hide div in send lab test and Ris And Radition..
function hidedivoninvestigationsheet()
{
	
	$("#cpoeSendToRisdiv").hide();
	$("#cpoeSendToRaddiv").hide();
	$("#cpoesndtolabdiv").hide();

}

//added by ajay : 11/11/2019 send test on billing and lab and ris..
function saveOnDailysisTest(callfrom){ 
	
	var queryType 	 = "insert";
	var module 	 = "OT";
	var	patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val();  
	var	departmentId =  2;
	var billId       =  $("#bill_Id").val();  
	var	sourceTypeId =  1;
	var receiptOf  ="general";
	var rate = 0;
	var otherRate=0;
	var otherAmount=0;
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var sndToLabFlag='N';
	var sendToRisFlag ='N';
	var hallId  =$("#hallId").val();
	
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	if (sponsorId > 0 && chargesSlaveId > 0) {
		getchargesDR(2);
		otherRate = parseFloat($("#chargesfromConf").val());
		if(otherRate== 0 || otherRate== 0.0){
			getchargesDR(0);
			otherRate =	parseFloat($("#chargesfromConf").val());
			}
		if(otherRate== 0 || otherRate== 0.0){
			
			otherRate =	parseFloat($("#chargesubservice").val());
			
		}		
		var emrgancyper=parseFloat($('#emrPer').val());
		var emp=parseFloat(otherRate*emrgancyper/100);
		otherRate = parseFloat(emp + otherRate);		
		otherAmount=otherRate *1;
		
	}
		
	rate =	$("#cpoeCharges2").val();	
	var quantity     =  1;
	var amount       =  rate * 1;  
	
    var recSlaveIdIPD  =0;	//$('#receiptSlaveId').val();	//receipt slave id
	
	if (recSlaveIdIPD == "" || recSlaveIdIPD == null || recSlaveIdIPD == undefined || isNaN(recSlaveIdIPD)) {
		recSlaveIdIPD = 0;
	} 
	
	if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		hallId = 0;
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined || isNaN(sponsorId)) {
		sponsorId = 0;
	}
	
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}
	
	var iscombination =$("#iscombination" ).val();
	var serviceId    =  $("#serviceid" ).val();
	var subServiceId =  $("#subserviceid").val();

	var billDetailsId     = $("#billidservice").val();
    var subservicesname   = $("#txtautoserviceName").val();
    var servicename       = $("#servicename").val();
    var unitId            = $("#uId").val();
    var doctorId          = $("#doctor2").val();                         
    var clinicalNotes     = $("#cpoeClinicalNotes").val();
    var instructions      = $("#cpoeIns").val();
    var urgentflag='N';
    var ot_flag='N';
    var drdeskflag='DL';
    var radiationFlag='N';
    var coPay        = amount;
    
    if(callfrom == "IpdSponsor3"){
    	hallId =2;
    	sponsorId =0;
    	chargesSlaveId =0;
    }else if(callfrom == "IpdSponsor4"){
    	hallId =0;
    	sponsorId =0;
    	chargesSlaveId =0;
    }else{
    callfrom="DrDeskIPD";
    }
    
    if($("#cpoeUrgent").is(':checked')){
    	urgentflag='Y';
    }

    if(serviceId=="11" || serviceId=="13"){
    	 if($("#cpoesndtolab").is(':checked')){
    	    	sndToLabFlag='Y';
    	    	sendToRisFlag = 'N';
    	    }
    }else if(serviceId=="12"){
   
    	if($("#cpoeSendToRis").prop("checked")==true){
    		sendToRisFlag = 'Y';
    		sndToLabFlag='N';
    		
    	}
    }else if(serviceId=="18"){
    	 if($("#cpoeSendToRad").is(':checked')){
           radiationFlag='Y';
       }
    }
  
	
	if (subservicesname == "" ||  subservicesname ==null) {
		alert("Please enter servicename ");
		return false;
	}
	if(unitId ==0){
		unitid = $("#allunitid").val();
	}
	var doctorsel = $("#doctor2 :selected").val();
	
	if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
	//	alert("Please Select doctor ");
	//	return false;
		
	}
	if (clinicalNotes == "" ||  clinicalNotes ==null) {
		clinicalNotes="-";
	}
	if (instructions == "" ||  instructions ==null) {
		instructions="-";
	}
	
	
	
	var serviceDetails = {
			listBillDetailsIpd : []
        };
	serviceDetails.listBillDetailsIpd.push({
		billDetailsId:billDetailsId,
		patienttId : patienttId,
        treatmentId : treatmentId,
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sponsorId,
        chargesSlaveId:chargesSlaveId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
      
        doctorId:doctorId,
        urgentFlag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        ot_flag:ot_flag,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        otherRate : otherRate,
        otherAmount : otherAmount,
        otherPay :otherAmount,
        onBedFlag:"N",
        receiptOf : receiptOf,
        recSlaveIdIPD : recSlaveIdIPD,
        sndToLabFlag : sndToLabFlag,
		sendToRisFlag : sendToRisFlag,
		iscombination : iscombination,
		hallId     : hallId,
		sponsorId  : sponsorId,
		rFlag : radiationFlag,
		emrPer : emrPer
    });
    
	var subList 	= {	subSrvList : [] };
	subList.subSrvList.push({
		serviceId		: serviceId,
		subSrvid 		: subServiceId,
		refDocId		: doctorId,
	});	
    subList = JSON.stringify(subList);
    serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push('subList=' + subList);
	var str = inputs.join('&');	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveOpdIpdCpoe",
	
		success : function(r) {
			
			 
		if(r==1){
			alertify.success("Service assign Sucessfully");
			fetchipddetailsDailysis();
			$('#txtautoserviceName').val("");
			$("#subservicesname").val("");
			$('#dynamicItem').html("");
			$("#servicename").val("");
			$("#cpoeClinicalNotes").val("");
			$("#cpoeIns").val("");
			$('#cpoeUrgent').attr('checked', false);
			$("#cpoesndtolabdiv").hide();
			$("#doctor2").val(0);
			$("#chargesubservice").val(0);
			$("#cpoeCharges2").val(0);
			$("#billidservice").val(0);
			
			//$('#cpoesndtolab').attr('checked', false);
			}else if (r ==3) {
				var res = confirm("Package is not configure for Hall and sponsor. Do you want Default Hall Package?");
				if (res == true) {
					
					saveIPDCpoe('IpdSponsor3');
				}else{
					return false;
				}
			}else if (r == 4) {
				var res = confirm("Package is not configure for Hall and sponsor. Do you want Default Package?");
				if (res == true) {
					
					saveIPDCpoe('IpdSponsor4');
				}else{
					return false;
				}
			}else if (r == 2) {
				alertify.error("Duplicate Test Can not be Saved");
			}else{
				alert("Network Issue!!!!");
			}
		}	
		
	});
	
}
//added by ajay : 11/11/2019 fetch send test on dilaysis in invenstgation sheet..
function fetchipddetailsDailysis(callfrom){
	
	var tID  = $("#tr_Id").val(); 
	if(tID==0){
		
	}
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchipddetailsdrdesknew",
		data	: {
			"tID"        : tID,
			"callform"   :callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			testcountipd = 1;
			if(callfrom=="AutoDischarge"){
				 
				$("#tcpoeservices").setTemplate(servicedetailsipdDialysis);
				$("#tcpoeservices").processTemplate(response);
  			}else{
  				 
			$("#tcpoeservices").setTemplate(servicedetailsipdOnDialysis);
			$("#tcpoeservices").processTemplate(response);
			var jsonConvertedData = JSON.stringify(response);
		    $("#billdetailsnew").html(jsonConvertedData);
  			}
	
		}
		
	});
 }

var servicedetailsipdDialysis = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testcountipd}.</td>'
	+ '<td class="col-md-2-2 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-2-1 center"> {$T.cpoeservice.created_date_time}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
    + '</tr>{testcountipd++}{#/for}';

var servicedetailsipdOnDialysis = '{#foreach $T.cpoeServdetails as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testcountipd}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-1-1 center"> {$T.cpoeservice.created_date_time}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	+ '<td style="display:none;" id="empR{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.emrPer}</td>'
	+ '<td style="display:none;" id="rate{$T.cpoeservice.billipd_id}" class="col-md-2 center">{$T.cpoeservice.rate}</td>'

	+ '{#if $T.cpoeservice.deleted == "N" && $T.cpoeservice.cancel == "N"}'
	
	+ '{#if $T.cpoeservice.paid_flag == "Y"}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: orange;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice disabled " onclick=deleteCpoeServOnDilaysis({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '{#if $T.cpoeservice.paid_flag == "N"}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServOnDilaysis({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'
	
	+'{#/if}'
	
	+ '{#else}'
	
	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testcountipd}" style="width:60px; background-color: red;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv"  type="checkbox" class="btn disabled" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServOnDilaysis({$T.cpoeservice.billipd_id},\'IPD\') ><i class="fa fa-trash-o"></i></button></td>'

	+'{#/if}'
	
	+ '</tr>{testcountipd++}{#/for}';
//added by ajay : 11/11/2019 delete test on dialysis test
function deleteCpoeServOnDilaysis(values,callform){
	var labservicelist ='';
	deleteType="Y";
	if (values=='multiple'){
		$.each($('#chkunserv:checked'), function() {
			labservicelist=labservicelist+","+$(this).val();
		});
		
		 if(labservicelist.length==0){
			   
			   
			   alert("Please check  at least Service to delete");	   
			   return false;
			   
		   }
	}else{
		labservicelist=labservicelist+","+ values;
	}
	
	deleteLabTestCpoe(labservicelist,deleteType,values,callform);
 
	if(deleteTestSmplColFlg=="Y"){
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}
	
	deleteInvTestCpoe(labservicelist,deleteType,values,callform);
	if(risReportFlag=="Y"){
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}
	
	var tk = labservicelist.slice(1); 
	
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/deleteservdetails",
		data	: {
			
		  "labservicelist" : tk,
			"callform":callform
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			
			if(response.indexOf("Delete") != -1){
				alertify.success(response);
			}
			else{
				alertify.error(response);
				return false;
			}
			
			if(callform=="DR"){
			
			
					fetchbilldetails();   //for OPD 
				
				
			}else if(callform=="IPD"){
				
				fetchipddetailsdrdesk();  //for ipd
				
			}else if(callform=="Diagno"){
				
				fetchbilldetailsDigno(); //for Diagno
				
			}
			else {
				fetchipdbilldetails(callform);  //for ot
			}
			
			
		}
		
	});
}

//added by ajay : 11/11/2019 editing test..
function editDialysisTestnew(){
	var id=0;
	$.each($('#chkunserv:checked'), function() {
		id = $(this).val();
		});	
		if(id==0){
			alert("Please Check test to edit!!");
		}else{
			var depid= $("#depdocdeskid").val(); 
			var myArray = JSON.parse($("#billdetailsnew").html());
			if(depid==1){
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billdetailsid == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].instructions);
						$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billdetailsid);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
						fetchSuperCat(myArray.cpoeServdetails[k].categoryid);
					}
				}	
			}else if(depid==3){
				
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billdetailsid == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billdetailsid);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
						fetchSuperCat(myArray.cpoeServdetails[k].categoryid);
					}
				}
				
			}else{
				for ( var k = 0; k < myArray.cpoeServdetails.length; k++) {
					
					if(myArray.cpoeServdetails[k].billipd_id == id){
						$("#cpoeIns").val(myArray.cpoeServdetails[k].instructions);
						$("#cpoeClinicalNotes").val(myArray.cpoeServdetails[k].clinical_notes);
						$("#doctor2").val(myArray.cpoeServdetails[k].doctor_id);
						$("#serviceid").val(myArray.cpoeServdetails[k].serviceid);
						$("#subserviceid").val(myArray.cpoeServdetails[k].categoryid);
						$("#txtautoserviceName").val(myArray.cpoeServdetails[k].categoryName);
						$("#txtautoserviceName").attr('readonly',true);
						$("#billidservice").val(myArray.cpoeServdetails[k].billipd_id);
						$("#chargesubservice").val(myArray.cpoeServdetails[k].rate);
						$("#cpoeCharges2").val(myArray.cpoeServdetails[k].rate);
						
						var emrP =parseFloat(myArray.cpoeServdetails[k].emrPer);
						if(isNaN(emrP))
							{
								emrP=0;
							}
					
							$('#emrPer').val(emrP); 
							if (emrP > 0 || emrP == 0 ) 
								{
									$("#emrChrFlag").prop("checked", true);
									$('#emrPer').css("display","inline");
								}
						fetchSuperCat(myArray.cpoeServdetails[k].categoryid);
					}
				}
			}	
		
		}
}
// adding by ajay:14/11/2019............tab button dialysis scheduler on doctor desh forwardind page on dialysis scheduler
function dialysisScheduler()
{
	var patientId  = $("#pid").val(); 
	window.location.href ="ehat_Dialysis_Scheduler.jsp?patientId="+ patientId;
}
// adding by ajay:14/11/2019.........refresh value dialysis advice
function refreshDialysisAdvice()
{
	$('#indicationId').val("");
	$("#dialysisType").val("");
	$("#frequencyDialysis").val("");
	$("#Note").val("");
}

//adding by ajay:14/11/2019.........getDialysisPatinetDateWise
function getDialysisPatinetDateWise()
{
	
	var mainRes  = $("#fromDate").val(); 
	var res = mainRes.split("-");	
	var fromDate = res[2] + "-" + res[1] + "-" + res[0];
	
	var mainRes  = $("#lastDate").val(); 
	var res1 = mainRes.split("-");	
	var lastDate = res1[2] + "-" + res1[1] + "-" + res1[0];
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/dialysis/getDialysisPatinetDateWise",
		data	: {
			"fromDate"   :fromDate,
			"lastDate"   :lastDate
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			setDialysisPatient(response);
	
		}
		
	});
 }
//adding by ajay:18/11/2019.........saveinformedconsentForm
function saveinformedconsentForm()
{
	var informedId = $("#informedId").val();
	var patientName = $("#patientNameconsent").val();
	var address = $("#addressconsent").val();
	var reletive = $("#reletiveconsent").val();
	var treatmentId = $("#tr_Id").val();
	
	var inputs = [];
	inputs.push('informedId=' + informedId);
	inputs.push('patientName=' + patientName);
	inputs.push('address=' + address);
	inputs.push('reletive=' + reletive);
	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/dialysis/saveinformedconsentForm",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r == 1) {
				alert("Record saved successfully..!");
			} else {
				alert("Record Update successfully..!");
			}
			getinformedconsentForm();
		}
	});
}
//adding by ajay:18/11/2019.........getinformedconsentForm
function getinformedconsentForm()
{
	var treatmentId = $("#tr_Id").val();
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/dialysis/getinformedconsentForm",
		data	: {
			"treatmentId"   :treatmentId,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if (r.listinformedform.length > 0) {
				$('#informedId').val(r.listinformedform[0].informedId);
				$('#patientNameconsent').val(r.listinformedform[0].patientName);
				$("#addressconsent").val(r.listinformedform[0].address);
				$("#reletiveconsent").val(r.listinformedform[0].reletive);


			}
		}
		
	});
 }
//adding by ajay:18/11/2019.........printConsentInformedFrom
function printConsentInformedFrom() {
	
	var treatmentId = $("#tr_Id").val();
	window.open("ehat_haemoDialysisinformedConsentPrint.jsp?tretmentId="
			+ treatmentId);

}
//adding by ajay:18/11/2019.........get patinet Name...
function getpatinetName()
{
	var patientId = $("#patientId1").val();
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/dialysis/getpatinetName",
		data	: {
			"patientId"   :patientId,
			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			
			if (r.lstIpdbillPatientsBeds.length > 0) {
			
				$('#patientId').val(r.lstIpdbillPatientsBeds[0].patientID);
				$('#patinetName').val(r.lstIpdbillPatientsBeds[0].patientName);
				$("#patMob").val(r.lstIpdbillPatientsBeds[0].mobile);	

			}
		}
		
	});
}

// added by ajay:17/12/2019.. this function used search by patient Name
function autoSuggestionpatientNameByDailysis(inputID) {
	
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	var inputs = [];

	inputs.push('patiename=' + txtVal1);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url 	: "ehat/dialysis/autoSuggestionPatientNameByDialysis",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var availableTags = [];
			if (r.length == 20) {
				alert("NO MATCHING FOUND");

			} else {
				ajaxResponse = JSON.stringify(r);
				ajaxResponse = eval('(' + ajaxResponse + ')');
				for ( var i = 0; i < ajaxResponse.listDialysis.length; i++) {
					availableTags.push(ajaxResponse.listDialysis[i].patientName + "_"
							+ ajaxResponse.listDialysis[i].pid);
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value= "'
							+ (arrValue[1]) + '" class=""><a href="#">'
							+ arrValue[0] + '</a></li>';

				}

				$("#div" + inputID + " .typeahead").html(template);
				setTimeout(function() {
					$('#' + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult1,
						scrollBar : true

					});

				}, 500);
			}
		}
	});

	function displayResult1(item) {
		//alert(JSON.stringify(item));
		$('#' + inputID).val(item.text);
		$("#patientIdDialysis").val(item.value);
	}
}

//added by ajay:19/112/2019 show data on previous treatment with dialysis patient
function getDialysisPreviousPatienttDetails()
{
	var patientId =$("#patientIdDialysis").val();
	if(patientId==0)
	{		
     	patientId = $("#patientIdDialysis1").val();
     	
	}

	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/dialysis/getDialysisPreviousPatienttDetails",
		data	: {
			"patientId"   :patientId,			
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			setDialysisPreviousPatientDeatils(r);
		}
		
	});
}

function setDialysisPreviousPatientDeatils(res)
{
	var count = 1;
	var ipdqueueTemp = '';
	ipdqueueTemp = ipdqueueTemp
	+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
	
	if (res.dialysislist.length == 0 || res.dialysislist.length == null) {
		// no records.
		
		ipdqueueTemp = ipdqueueTemp
				+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
	}else{
	
	for ( var indx = 0; indx < res.dialysislist.length; indx++) {
		
		var fullName = res.dialysislist[indx].patientName;
		var datetime = new Date(res.dialysislist[indx].date).toLocaleString('en-GB');
		
		ipdqueueTemp = ipdqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				
				+ "	<td class='col-sm-1 center' id='fullName"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				
				+ "	<td class='col-sm-1 center' id='patientId"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.dialysislist[indx].patientId
				+ "</td>"
				
				+ "	<td class='col-sm-1' id='treatmentId"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.dialysislist[indx].treatmentId
				+ "</td>"
				
				+ "	<td class='col-sm-1' id='date"
				+ count
				+ "' style='height: 21.5px;'>"
				+ datetime
				+ "</td>"
				
				+ "	<td class='col-sm-1' id='preweight"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.dialysislist[indx].preweight
				+ "</td>"

				+ "	<td class='col-sm-1' id='prebp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.dialysislist[indx].prebp
				+ "</td>"
				
				+ "	<td class='col-sm-1 center' id='postwieight"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.dialysislist[indx].postwieight
				+ "</td>"
				
				+ "	<td class='col-sm-1' id='postbp"
				+ count
				+ "' style='height: 21.5px;'>"
				+ res.dialysislist[indx].postbp
				+ "</td>"

				+ "	<td class='col-sm-1' style='height: 21.5px;'>"
				+  res.dialysislist[indx].vp  + "</td>"

				+ "	<td class='col-sm-1' style='height: 21.5px;'>"
				+ res.dialysislist[indx].ap + "</td>"
				
				+ "	<td class='col-sm-1' style='height: 21.5px;'>"
				+ res.dialysislist[indx].bf + "</td>"
	
				+ "	<td class='col-sm-1 center' style='height: 21.5px;'>"
				+ res.dialysislist[indx].dialysisstartTime
				+ "</td>"

				+ "	<td class='col-sm-1 center'  style='height: 21.5px;'>"
				+ res.dialysislist[indx].dialysisendTime + "</td>"
				
				+ "	<td class='col-sm-1' style='height: 21.5px;'>"
				+ res.dialysislist[indx].duration + "</td>"

				
				+ "	<td class='col-sm-1 center' style='height: 21.5px;'>"
				+ res.dialysislist[indx].herapine_dose
				+ "</td>"
				
				+ "	<td class='col-sm-1 center' style='height: 21.5px;'>"
				+ res.dialysislist[indx].remark
				+ "</td>"

				+ "<td class='col-sm-1' style='height: 21.5px;'>"

				+ "<button onclick=previousTreatmentviewDialysisWard("+ res.dialysislist[indx].treatmentId+",'"+res.dialysislist[indx].tflag+"') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "</td></tr>";
		count = count + 1;
	}
	}
	$("#tableTestVoucherList").html(ipdqueueTemp);

}

// added by ajay:19/112/2019 forward details on ehat_haemoDialysis page  with previous treatment
function previousTreatmentviewDialysisWard(treatmentId,tflag)
{
	window.location.href = "ehat_haemoDialysis_ward.jsp?" +"treatmentId="+treatmentId +"&tflag="+tflag;
}

//added by ajay:19/112/2019 hide div on ehat_haemoDialysis page  with previous treatment
function hideDivPreviousTreatmentDeatils()
{
	var tflag = $("#tflag").val();
	if(tflag=="N")
	{
	$('#consentformdiv').find('input, button, select').attr('disabled', 'disabled');
	$('#careplandiv').find('input, button, select').attr('disabled', 'disabled');
	$('#haerecodmodialtsisdiv').find('input, button, select').attr('disabled', 'disabled');
	$('#investigationsheet').find('input, button, select').attr('disabled', 'disabled');
	$('#documenttab').find('input, button, select').attr('disabled', 'disabled');
  }
}