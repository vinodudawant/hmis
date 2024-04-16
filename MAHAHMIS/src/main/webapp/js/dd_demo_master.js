/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function for showing and hiding div
 ******************************************************************************/
var lengthofvitallist = 0;
var lengthofdianosyslist = 0;
var lengthofpreslist = 0;
var lengthofmeasurements = 0;
var sxadvicelengthlist = 0;
var temptypevar = 0;


function displayHideDiv(type) {

	$("#divHide *").css("pointer-events", "");
	$("#callfromforprvTrtmnt").val("cepisode");
	if (type == 'home') {
		$("#divhome").show();
		$("#divHide").hide();
		$("#callfromforprvTrtmnt").val("hometab");
		getVitalsAndValues();
		getSxAdviceList();
		getPrescriptionList();
		showMeasureMents();
	} else {
		
		document.getElementById("copyicon").disabled = false;
		getProcedureTypeList();
		getSxAdviceList();
		getEmrHighRiskFlag();
		$("#sxform").hide();
		$("#divHide").show();
		$("#divhome").hide();
		$("#VitalsList").hide();
		$("#VitalsInfoList").hide();
		$("#measurementsid").hide();
		$("#divideby10").hide();
		hideDiv();
		diagosList();
		showAllList();
		getVitalsAndValues();
		showMeasureMents();
		oncheckVitalSHowHide();
		getPrescriptionList('onload');
		$("#tabledivDigo").show();
		$("#diagosForm").hide();
		fetchComplaint();// done by Akshata
		fetchClinical();// done by Akshata
		fetchForHistory();
		fetchbilldetails();
		getFollowup();// Done by Aksata
		previousPatientHeaderListTreatmentWise(); //Done by Akshata
		fetchInstruction('onload');// By Navnath
		// fetchUnit();
		//if ($("#formFamilyhistory").text().indexOf('OTHER') == 0) {
			//$("#formFamilyhistory").hide();
		//}
	}

}

function setStringTabs(type) {
	//alert(type);
	$("#inputString").val(type);
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function for caclculating bmi
 ******************************************************************************/

function calculateBMI() {
	var weight = $("#wg").val();
	var height = $("#height").val();
	if (height == "") {
		$("#bmi").val("");
	}

	var BMI = finalCalculatedBMI(height, weight);
	$("#bmi").val(BMI);

	var BSA = finalCalculatedBSA(height, weight);
	$("#bsa").val(BSA);

}

function finalCalculatedBMI(height, weight) {

	var BMI = 0;
	var heightInCM = (height / 100);
	BMI = weight / Math.pow(heightInCM, 2);

	if (BMI == "Infinity")
		BMI = 0;

	if (isNaN(BMI))
		BMI = 0;

	return (BMI.toFixed(2));

}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function for caclculating bsa
 ******************************************************************************/

function finalCalculatedBSA(heightInCm, weightInKg) {

	var BSA = 0;
	BSA = ((Math.sqrt((heightInCm * weightInKg))) / 60);

	if (BSA == "Infinity")
		BSA = 0;

	if (isNaN(BSA))
		BSA = 0;

	return (BSA.toFixed(2));

}

function resetVitalForm() {
	$("#weight").val("");
	$("#mm").val("");
	$("#hg").val("");
	$("#tempreture").val("");
	$("#respRate").val("");
	$("#pulse").val("");
	$("#date").val("");
	$("#wg").val("");
	$("#height").val("");
	$("#hcim").val("");
	$("#bmi").val("");
	$("#bsa").val("");

}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get vital list
 ******************************************************************************/

function getVitalList() {
	var inputs = [];
	var treatmentId = 1;
	inputs.push('treatId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/getVitalInfo",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		}
	});

}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function for fetching Vitals
 ******************************************************************************/

function fetchVital(callfrom) {
	var inputs = [];
	if (callfrom == "onload") {
		inputs.push('vitalname=' + callfrom);

	} else {
		inputs.push('vitalname=' + "");
	}

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/fetchwhitetal",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setFetchVital(r);
			if (callfrom == "onload") {
				setDataToTableList(r);
			}
		}
	});
}

function setDataToTableList(r) {
	/*
	 * var content = ""; var index = 1; for (var i = 0; i < r.vitallist.length;
	 * i++) { content = content + " <div class='form-group row'>" + "<label
	 * class='col-sm-3 col-form-label' id='labelid_" + index + "' value='" +
	 * r.vitallist[i].vital_id + "'>" + r.vitallist[i].vitalname + "</label>" + "<div
	 * class='col-sm-4'><input type='text' id='inputBox_" + index + "'
	 * class='form-control' placeholder='" + r.vitallist[i].vitalname + "'>" + "</div></div>";
	 * 
	 * index++; } $("#VitalsList").append(content);
	 */

	var content = "";
	var index = 1;
	for ( var i = 0; i < r.vitallist.length; i++) {
		content = content + " <div class='form-group row'>"
				+ "<label  class='col-sm-3 col-form-label' id='labelid_"
				+ index + "' value='" + r.vitallist[i].vital_id + "'>"
				+ r.vitallist[i].vitalname;

		if (r.vitallist[i].vitalname == "Temperature") {
			content = content + "<span style='font-size:10px;'><a id='signId' "
					+ "onclick='textLinkchange()'>" + String.fromCharCode(176)
					+ "C" + "</a></span>";
		}

		content = content + "</label>";

		content = content
				+ "<div class='col-sm-2'><input type='text' id='inputBox_"
				+ index + "' class='form-control'  placeholder='"
				+ r.vitallist[i].vitalname + "'>"
				+ "<input type='hidden' id='hiddenBox_" + +index
				+ "' value='0' class='form-control'  placeholder='"
				+ r.vitallist[i].vitalname + "'>" + "</div>";

		if (r.vitallist[i].vitalname == "Blood Pressure (mmHg)") {
			content = content
					+ "<div class='col-sm-2'><input type='text' style='margin-top:2%;' id='hg"
					+ index
					+ "' class='form-control'  placeholder='Hg'>"
					+ "<div class='col-sm-4' id='textdiv1'>"
					+ "<p style='font-size:11px;display:inline-block;' id='textid' class='text-success'  onclick='textchange()'>standing</p>"
					+ "</div>" + "</div>";
		}

		if (r.vitallist[i].vitalname == "Temperature") {
			content = content
					+ "<div class='col-sm-4 dropdown'>"
					+ "<select style='font-size:10px;' id='tempType'>"
					+ "<option value='Oral' data-name= 'Oral' >Oral</option>"
					+ "<option value='Auxillary' data-name= 'Auxillary'>Auxillary</option>"
					+ "<option value='Tympanic' data-name= 'Tympanic'>Tympanic</option>"
					+ "<option value='Temporal' data-name= 'Temporal'>Temporal</option>"
					+ "<option value='Rectal' data-name= 'Rectal'>Rectal</option>"
					+ "</select>" + "</div>";
		}

		content = content + "</div>";

		index++;

	}
	$("#VitalsList").append(content);
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to change text on click
 ******************************************************************************/

function textchange(type) {

	var x = document.getElementById("textid");
	if (x.innerHTML === "standing") {
		x.innerHTML = "sitting";
	} else {
		x.innerHTML = "standing";
	}

}

function textLinkchange() {
	var y = document.getElementById("signId");
	// console.log(y.innerHTML);
	if (y.innerHTML == String.fromCharCode(176) + "C") {

		y.innerHTML = String.fromCharCode(176) + "F";
	} else {
		y.innerHTML = String.fromCharCode(176) + "C";
	}

}

function setFetchVital(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.vitallist.length; i++) {
		htm = htm
				+ '<tr> '
				+ " <td class='text-center'>"
				+ index
				+ '</td>'
				+ " <td style='display:none;'>"
				+ "<input type='text' value ='"
				+ r.vitallist[i].vital_id
				+ "' id='col"
				+ i
				+ "'>"
				+ '</td>'
				+ "<td class='text-center'>"
				+ r.vitallist[i].vitalname
				+ "</td>"
				+ '<td class="text-center"><input  name="markCheckbox" class="checkInst" onclick="" value="'
				+ r.vitallist[i].vitalname + "_" + r.vitallist[i].vital_id
				+ '" id="test' + r.vitallist[i].vital_id
				+ '" type="checkbox" style="cursor: pointer" /></td>' + '</tr>';
		index++;
	}
	$("#fetchvitallist").html(htm);

	var length = $("#fetchvitallist tr").length;

	var lengthform = $("#formId .row").length;

	for ( var j = 1; j <= lengthform; j++) {
		for ( var i = 0; i < length; i++) {
			var id = $("#col" + i).val();
			var vitalId = $("#labelid_" + j).attr('value');
			console.log(id, vitalId);
			if (id == vitalId) {
				console.log(i);
				$("#test" + vitalId).prop('disabled', true);
			}

		}

	}

}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function for pusing checkbox value
 ******************************************************************************/

function selectInst() {

	var favorite = [];
	$.each($("input[name='markCheckbox']:checked"), function() {
		favorite.push($(this).val());
	});

	setInstDetailsToRow(favorite);
}

function setInstDetailsToRow(item) {
	var content = "";
	var length = $("#formId .row").length + 1;
	for ( var i = 0; i < item.length; i++) {
		var str = item[i];
		var arr = str.split("_");
		console.log(arr[1]);

		content = content + " <div class='form-group row'>"
				+ "<label  class='col-sm-3 col-form-label' id='labelid_"
				+ length + "' value='" + arr[1] + "'>" + arr[0] + "</label>"
				+ "<div class='col-sm-2'><input type='text' id='inputBox_"
				+ length + "' class='form-control'  placeholder='" + arr[0]
				+ "'>" + "</div></div>";
		length++;
	}

	$("#VitalsInfoList").append(content);
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to save vitals against treatment id
 ******************************************************************************/

/*
 * diagonosis section start
 */

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get autosugesstion for diagonosis section
 ******************************************************************************/

function getDiagoName(id, callform) {
	var resultData = [];
	var inputs = [];
	var diagoName = $("input#" + id).val();
	var radio = $("input:radio[name=diago]:checked").val();
	inputs.push('callform=' + callform);
	inputs.push('diagoName=' + diagoName);
	inputs.push('diagoType=' + radio);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagonosis/diagosAutoSuggestion",
		cache : false,
		success : function(response) {

			if (callform == "diagoname") {
				console.log("diagoname");
				$("#callform").val(callform);
				setResponslistTodiagoName(response, id);
			}

			else if (callform == "diagodesc") {
				console.log("desc");
				$("#callform").val(callform);
				setResponslistTodiagodesc(response, id);
			}

			else {
				console.log("else");
				$("#callform").val(callform);
				setResponslistToIcdCode(response, id);
			}

		}

	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to set response in diagonosis text box
 ******************************************************************************/

function setResponslistTodiagoName(response, id) {

	var resultData = [];
	var template = "";
	for ( var j = 0; j < response.length; j++) {
		var arrValue = response[j].name_L;
		var idValue = response[j].idicd10_L;
		var pname = response[j].name_L;
		// console.log(arrValue + " " + idValue + " " + pname);
		$("#diagoId").val(response[j].idicd10_L);
		resultData.push({
			ID : idValue,
			Name : pname
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}
	setTimeout(function() {
		$("div#diagByName .typeahead").html(template);
		$("div#diagByName .typeahead").show();

		$("input#" + id).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("input#" + id).data('typeahead').source = resultData;
	}, 500);

	function displayResult(item) {
		var id = item.value;
		getDiagonosisById(id);
	}
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to set response in diagonosis description text box
 ******************************************************************************/

function setResponslistTodiagodesc(response, id) {
	var resultData = [];
	var template = "";
	for ( var j = 0; j < response.length; j++) {
		var arrValue = response[j].name_L1;
		var idValue = response[j].idicd10_L;
		var pname = response[j].name_L1;
		console.log(arrValue + " " + idValue + " " + pname);
		// $("#diagoId").val(response[j].idicd10_L);
		resultData.push({
			ID : idValue,
			Name : pname
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}
	setTimeout(function() {
		$("div#diagBydesc .typeahead").html(template);
		$("div#diagBydesc .typeahead").show();

		$("input#" + id).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("input#" + id).data('typeahead').source = resultData;
	}, 500);

	function displayResult(item) {
		var id = item.value;
		getDiagonosisById(id);
	}

}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to set response in diagonosis icd code text box
 ******************************************************************************/

function setResponslistToIcdCode(response, id) {
	var resultData = [];
	var template = "";
	for ( var j = 0; j < response.length; j++) {
		var arrValue = response[j].icd_code_L;
		var idValue = response[j].idicd10_L;
		var pname = response[j].icd_code_L;
		console.log(arrValue + " " + idValue + " " + pname);
		$("#diagoId").val(response[j].idicd10_L);
		resultData.push({
			ID : idValue,
			Name : pname
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}
	setTimeout(function() {
		$("div#diagoByIcd10 .typeahead").html(template);
		$("div#diagoByIcd10 .typeahead").show();

		$("input#" + id).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("input#" + id).data('typeahead').source = resultData;
	}, 500);

	function displayResult(item) {

		var id = item.value;
		getDiagonosisById(id);
	}
}

function getDiagonosisById(id) {
	var callform = $("#callform").val();
	// alert(callform);
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/digoById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (callform == "diagoname") {
				console.log("diagonameById");
				for ( var i = 0; i < r.length; i++) {
					$("#diagodesc").val(r[i].name_L1);
					$("#diagoicd10").val(r[i].icd_code_L);
				}
			}

			if (callform == "diagodesc") {
				console.log("descById");
				for ( var i = 0; i < r.length; i++) {
					$("#diagoname").val(r[i].name_L);
					console.log("diagoicd10" + diagoicd10);
					$("#diagoicd10").val(r[i].icd_code_L);
				}
			}

			if (callform == "diagoicd10") {
				console.log("elseById");
				for ( var i = 0; i < r.length; i++) {
					$("#diagoname").val(r[i].name_L);
					$("#diagodesc").val(r[i].name_L1);
				}
			}

		}
	});
}

function resetDiagoForm() {
	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#tabledivDigo").hide();
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}
	/* forshow hide other tabs on click */
	$("#collapseDiago").slideDown(0);
	$("#divForEntry3").hide();
	$("#diagoname").val("");
	$("#diagodesc").val("");
	$("#diagoicd10").val("");
	$("#diagodate").val("");
	$("#type").val(0);
	$("#comments").val("");
	$("#diagoMasterId").val(0);
	$("#formDivDrug").hide();
	$("#sxform").hide();
	$("#ulwithpreform").hide();
	$("#diagosForm").show();
	$("#divideby10").hide();
	getVitalsAndValues();
	getPrescriptionList();
	// $("#tabledivDigo").show();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#ddinstruction").hide();
	// $("#formClinical").hide();
	// diagosList();
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to save diagonosis data
 ******************************************************************************/

function onSaveDiagonsis() {
	var treatmentId;
	var diagoname = $("#diagoname").val();
	var diagodesc = $("#diagodesc").val();
	var diagoicd10 = $("#diagoicd10").val();
	var diagodate = $("#diagodate").val();
	var type = $("#type").val();
	var comments = $("#comments").val();
	var patientId = $.trim(($("#patientId").val()));
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}

	var diagoMasterId = $("#diagoMasterId").val();

	if (diagoname == "" || diagoname == undefined || diagoname == null) {
		alertify.error("please enter diagonosis name");
		return false;
	}
	else if (diagodesc == "" || diagodesc == undefined || diagodesc == null) {
		alertify.error("please enter description");
		return false;
	}
	else if (diagoicd10 == "" || diagoicd10 == undefined || diagoicd10 == null) {
		alertify.error("please enter icd10 code");
		return false;
	}
	else if (diagodate == "" || diagodate == undefined || diagodate == null) {
		alertify.error("please enter dianosys date");
		return false;
	}
	
	else if (type == "" || type == undefined || type == null || type == 0) {
		alertify.error("please select type");
		return false;
	}
	else if (comments == "" || comments == undefined || comments == null) {
		alertify.error("please enter comment");
		return false;
	}
	/*
	 * inputs.push('patientId =' + parseInt(patientId));
	 * inputs.push('treatmentId =' + parseInt(treatmentId)); inputs.push('id=' +
	 * diagoMasterId); inputs.push('diagoName=' + diagoname);
	 * inputs.push('diagndesc=' + diagodesc); inputs.push('icd10_code=' +
	 * diagoicd10); inputs.push('date=' + diagodate); inputs.push('comment=' +
	 * comments); inputs.push('diagnoType=' + type)
	 */;

	var data = {
		'patientId' : patientId,
		'treatmentId' : treatmentId,
		'id' : diagoMasterId,
		'diagoName' : diagoname,
		'diagndesc' : diagodesc,
		'icd10_code' : diagoicd10,
		'date' : diagodate,
		'comment' : comments,
		'diagnoType' : type
	}

	// var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/savediagonosis",
		data : JSON.stringify(data),
		dataType : 'text',
		contentType : 'application/json; charset=utf-8',
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);

			resetDiagoForm();
			diagosList();
		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get diagonosis list
 ******************************************************************************/

function diagosList() {
	var inputs = [];
	var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}

	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/lisofDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			lengthofdianosyslist = r.length;
			if (r.length == 0) {
				$("#collapseDiago").slideUp(0);
				$("#tabledivDigo").hide();
			} else {
				$("#collapseDiago").slideDown('slow');
				$("#tabledivDigo").show();
			}
			setDataToDiagonosisTable(r);
		}
	});
}

function setDataToDiagonosisTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		htm = htm + '<tr> ' + " <td>" + index + '</td>' + "<td>"
				+ r[i].diagoName + "</td>" + "<td>" + r[i].diagndesc + "</td>"
				+ "<td>" + r[i].date + "</td>" + "<td>" + r[i].icd10_code
				+ "</td>" + "<td>" + r[i].diagnoType + "</td>" + "<td>"
				+ r[i].comment + "</td>"
				+ '<td><input  name="diagotablecheckbox"  value="' + r[i].id
				+ '" id="nt' + r[i].id
				+ '" type="checkbox"  style="cursor: pointer" /></td>'
				+ '</tr>';
		index++;
	}
	if (r.length == 0) {
		htm = htm
				+ "<tr><td colspan='8' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}

	$("#diagonoList").html(htm);

}

function editDiagonosis() {
	var idList = [];
	var inputs = [];
	$("#diagonoList").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}
	else if(idList.length > 1){
		alertify.error("please select only one checkbox");
		return false;
	}

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/getdiagonosisById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for ( var i = 0; i < r.length; i++) {
				$("#diagoname").val(r[i].diagoName);
				$("#diagodesc").val(r[i].diagndesc);
				$("#diagoicd10").val(r[i].icd10_code);
				$("#diagodate").val(r[i].date);
				$("#type").val(r[i].diagnoType);
				$("#comments").val(r[i].comment);
				$("#diagoMasterId").val(r[i].id);
				$("#diagosForm").show();
			}
		}
	});
}

function deleteDiagonosis() {
	var idList = [];
	var inputs = [];
	$("#diagonoList").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/deleteDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			diagosList();
		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get vital and values and set to coversheet
 ******************************************************************************/

function getVitalsAndValues() {

	var inputs = [];
	var treatmentId;
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	} else {
		if (callfrom == "" || callfrom == undefined) {
			callfrom = 'hometab';
		}
		treatmentId = $("#patientId").val();
	}
	inputs.push('treatId=' + treatmentId);
	inputs.push('callfrom=' + callfrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/getVitalInfo",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			lengthofvitallist = r.length;
			if (r.length == 0) {
				$("#vitalBodyS").hide();
				$("#borderredline").hide();
			} else {
				$("#vitalBodyS").show();
				$("#collapsshowEpisodeTreatmentViseeVitals").slideDown(0);
			}

			setDataToVitalsAndValuesTable(r, callfrom);

			if (callfrom == "graph") {
				setVitalGraphs(r);
			}
		}
	});
}

function setDataToVitalsAndValuesTable(r, callfrom) {

	if (callfrom == 'hometab') {
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {

			htm = htm + '<tr> ' + ' <td class="text-center">' + index
					+ '</td>'

					+ ' <td class="text-center">'

					+ r[i].vitalName + '</td>'

					+ ' <td class="text-center">' + r[i].currentDate
					+ '</td>'

					+ ' <td class="text-center">' + r[i].value + '</td>'

					+ '</tr>';
			index++;
		}
		$("#vitalcoversheet").html(htm);

	}

	else {
		var htm = "";

		htm = "<table class='table table-striped table-bordered'><thead><tr>";

		for ( var j = 0; j < r.length; j++) {

			htm = htm + "<th>" + r[j].vitalName + "</th>";
		}
		htm = htm + "</tr><tbody><tr>";

		for ( var j = 0; j < r.length; j++) {

			htm = htm + "<td>" + r[j].value + "</td>";

		}

		htm = htm
				+ "<td><button class='btn btn-success btn-xs' onclick='editVitals()'><i class='fa fa-pencil'></button></td>";
		htm = htm
				+ "<td><button class='btn btn-danger btn-xs' onclick='deleteVitals()'><i class='fa fa-trash-o'></button></td></tr></table>";

		$("#vitalBodyS").html(htm);
	}

}


function validateNumber(e) {
    const pattern = /^[0-9]$/;
    return pattern.test(e.key );
}

function editVitals() {
	var inputs = [];
	var treatmentId;
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else {
		treatmentId = $("#treatmentId").val();
	}
	inputs.push('callfrom=' + callfrom);
	inputs.push('treatId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/getVitalInfo",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#inputString").val('first');
			$("#VitalsList").html("");
			var content ="";
			var index = 1;
			for ( var i = 0; i < r.length; i++) {
				
				
				/*start*/

				content = content + " <div class='form-group row'>"
						+ "<label  class='col-sm-3 col-form-label' id='labelid_"
						+ index + "' value='" + r[i].vitalId + "'>"
						+ r[i].vitalName;
				
				
				if (r[i].vitalName == "Temperature") {
					var res = r[i].value;
					var strArr = res.split("(");
					var strArr2 = strArr[1].split(")");
					var res = r[i].value;
					var signc=res.split("(").toString().split(")");
					content = content 
					           + "<span style='font-size:10px;'><a id='signId' "
							+ "onclick='textLinkchange()'>" + signc[1].split(",")[1] + "</a></span>";
					
				}

				content = content + "</label>";

				content = content
						+ "<div class='col-sm-2'><input type='text' id='inputBox_"
						+ index + "' class='form-control' value="+calculatevalue(r[i].value,r[i].vitalName)+"  placeholder='"
						+ r[i].vitalName + "'>"
						+ "<input type='hidden' id='hiddenBox_" + +index
						+ "' value="+r[i].id+" class='form-control'  placeholder='"
						+ r[i].vitalName + "'>" + "</div>";

					
				
				if (r[i].vitalName == "Blood Pressure (mmHg)") {
					var res = r[i].value;
					var strArr = res.split("(");
					
					var strArr2 = strArr[1].split(")");

					var mmHg = strArr[0].split("/");

					content = content
							+ "<div class='col-sm-2'><input type='text' style='margin-top:2%;' id='hg"
							+ index
							+ "' class='form-control'  placeholder='Hg' value="+mmHg[1]+">"
							+ "<div class='col-sm-4' id='textdiv1'>"
							+ "<p style='font-size:11px;display:inline-block;' value="+strArr2[0]+" id='textid' class='text-success'  onclick='textchange()'>standing</p>"
							+ "</div>" + "</div>";
				}

				if (r[i].vitalName == "Temperature") {
					var res = r[i].value;
					var strArr = res.split("(");
					var strArr2 = strArr[1].split(")");
					
					$("#inputBox_" + index).val(strArr[0]);
					temptypevar = strArr2[0];
					content = content
							+ "<div class='col-sm-4 dropdown'>"
							+ '<select style="font-size:10px" id="tempType">'
							+ "<option value='Oral' data-name= 'Oral' >Oral</option>"
							+ "<option value='Tympanic' data-name= 'Tympanic'>Tympanic</option>"
							+ "<option value='Temporal' data-name= 'Temporal'>Temporal</option>"
							+ "<option value='Rectal' data-name= 'Rectal'>Rectal</option>"
							+ "</select>" + "</div>";
					
					
				}
				
				
				content = content + "</div>";
				
				index++;

				
				/*end*/
				
				
				
				
				
				
				
				

				/*$("#inputBox_" + index).val(r[i].value);
				if (r[i].vitalName == "Blood Pressure(mmHg)") {
					var res = r[i].value;
					var strArr = res.split("(");
					var strArr2 = strArr[1].split(")");

					var mmHg = strArr[0].split("/");

					console.log(mmHg[0]);
					$("#inputBox_" + index).val(mmHg[0]);
					$("#hg" + index).val(mmHg[1]);

					$("#textid").text(strArr2[0]);
				}
*/
				
			}
			$("#VitalsList").append(content);
			$("#tempType").val(temptypevar);
			$("#btnwithForm").show();
			$('.nav-tabs a[href="#vitalSigns1"]').tab('show');
			$("#ulwithform").show();
			$("#VitalsList").show();
			$("#VitalsInfoList").show();
			$("#measurementsid").show();
			$("#divideby10").show();
		}

	});
}

function calculatevalue(value,name){
	if(name=="Temperature"){
		var res = value;
		var strArr = res.split("(");
		return strArr[0];
	}
	else if(name=="Blood Pressure (mmHg)"){
		var res = value;
		var strArr = res.split("(");
		var mmHg = strArr[0].split("/");
		return mmHg[0];
	} 
	else{
		return value;
	}
}

function deleteVitals() {
	var inputs = [];
	var treatmentId;
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else {
		treatmentId = $("#treatmentId").val();
	}

	inputs.push('id=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/deleteVitalInfoById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getVitalsAndValues();
			alertify.success(r);
			oncheckVitalSHowHide();
		}

	});
}

/*
 * ...............................prescription Section
 * start...................................................................
 */

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to calculate qty on the basis of dosage and duration
 ******************************************************************************/

function calculateQty() {
	var mg = parseFloat($("#mron").val());
	var after = parseFloat($("#after").val());
	var night = parseFloat($("#night").val());
	var eve = parseFloat($("#eve").val());

	if (isNaN(mg)) {
		mg = 0;
	}
	if (isNaN(after)) {
		after = 0;
	}
	if (isNaN(night)) {
		night = 0;
	}
	if (isNaN(eve)) {
		eve = 0;
	}

	console.log(mg, after, night, eve);
	var duration = $("#duration").val();

	var totalQty = (mg + after + night + eve) * duration;
	
	$("#qty").val(totalQty.toFixed(2));

}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get autosuggestion for drugname and prepartion name
 *          maintain in single textbox
 ******************************************************************************/

function getDrugsName(id, callform) {

	var inputs = [];

	var searchName = $("input#" + id).val();

	inputs.push('searchText=' + searchName);
	inputs.push('callform=' + callform);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/prescription/presauto",
		cache : false,
		success : function(response) {
			var resultData = [];
			var template = "";
			for ( var j = 0; j < response.length; j++) {
				var prepValue = response[j].prepName;
				var prepId = response[j].prepId;
				var arrValue = prepValue + "_" + response[j].drugName;
				var idValue = response[j].drugId + "_" + prepId;
				resultData.push({
					ID : idValue,
					Name : arrValue
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#" id="a1">' + arrValue
						+ '</a></li>';
			}
			setTimeout(function() {
				$("div#drugByName .typeahead").html(template);
				$("div#drugByName .typeahead").show();

				$("input#" + id).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + id).data('typeahead').source = resultData;
			}, 500);

			function displayResult(item) {
				// alert(JSON.stringify(item));
				// var id = item.value;//$("#productMasterId").val();
				console.log(item.text);
				$("#a21").val(item.text);
				var res = item.value.split('_');
				var drug_id = res[0];
				var prep_id = res[1];
				getStrAndUnitById(drug_id);
				getRouteById(prep_id);
			}
		}

	});

}
/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get strength and unit on the basis of above drug and
 *          prepartion autosuggestion
 ******************************************************************************/

function getStrAndUnitById(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/prescription/strAndUom",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for ( var i = 0; i < r.length; i++) {
				var drugs = $('#a21').val();
				//alert(drugs);
				drugs = drugs + '_' + r[i].uom + '_' + r[i].strength;
				// alert(drugs);
				$("#callform").val(drugs);
			}

		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get route name on the basis of prep name fetched in
 *          autosuggestion
 ******************************************************************************/

function getRouteById(prepId) {
	var inputs = [];
	inputs.push('id=' + prepId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/prescription/getRoute",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var routeListTemp = "";
			routeListTemp = routeListTemp
					+ "<option value='0'>--Select route--</option>";
			for ( var i = 0; i < r.length; i++) {
				routeListTemp = routeListTemp + "<option value="
						+ r[i].route_id + " data-name=" + r[i].routename + ">"
						+ r[i].routename + "</option>";
			}
			$("#route").html(routeListTemp);
			$("#route").select2();
		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get Instruction name from prescription
 ******************************************************************************/

function getInst() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/doctorDesk/getPreDetails",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			var instlistTemp = "";
			instlistTemp = instlistTemp
					+ "<option value='0'>--Select Instruction--</option>";
			for ( var i = 0; i < r.length; i++) {
				instlistTemp = instlistTemp + "<option value=" + r[i].id
						+ " data-name='"+r[i].englishInstruction+"'>"
						+ r[i].englishInstruction + "</option>";
			}
			$("#instruction").html(instlistTemp);
			$("#instruction").select2();
		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to save prescription
 ******************************************************************************/

function onSavePres() {
	var patientId = $("#patientId").val();
	var treatmentId;
	var flag;
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}
	if ($("#callfromcopyTreatment").val() == "copyTreatment") {
		treatmentId = $("#treatmentId").val();
	}

	var drugs = $("#drugs").val();
	var preMasterId = $("#preMasterId").val();
	var mg = $("#mron").val();
	var after = $("#after").val();
	var night = $("#night").val();
	var eve = $("#eve").val();
	var instruction = $("#instruction").val();
	var route = $("#route").val();
	var duration = $("#duration").val();
	var sos = $('#sosflag').is(":checked");

	if (mg == "" || mg == undefined) {
		mg = 0;
	}
	if (after == "" || after == undefined) {
		after = 0;
	}
	if (night == "" || night == undefined) {
		night = 0;
	}
	if (eve == "" || eve == undefined) {
		eve = 0;
	}

	var dosage = mg + "-" + after + "-" + night + "-" + eve;
	var qty = $("#qty").val();

	var instname = $("#instruction").find(':selected').attr('data-name');
	var routeName = $("#route").find(':selected').attr('data-name');

	
	
	if (drugs == undefined || drugs == "" || drugs == null) {
		alertify.error("please enter drugs/prepartion");
		return false;
	}

	if (!sos) {
		if (duration == undefined || duration == "" || duration == 0) {
			alertify.error("please enter duration");
			return false;
		}
		if (qty == undefined || qty == "" || qty == null) {
			alertify.error("please enter doses for qty");
			return false;
		}
		flag = 0;
	} else {
		flag = 1;
	}
	/*
	 * if(route==undefined || route=="" || route==0){ alertify.error("please
	 * enter select route"); return false; }
	 */

	var drugName = $("#callform").val();
	var cdate = $("#VitaltodayDate").val();
	/*
	 * var inputs = []; inputs.push('patientId =' + patientId);
	 * inputs.push('treatmentId =' + treatmentId); inputs.push('id=' +
	 * preMasterId); inputs.push('drugName=' + encodeURIComponent(drugName));
	 * inputs.push('currentdate=' + cdate); console.log(drugName);
	 * inputs.push('treatmentId=' + treatmentId); inputs.push('dosage=' +
	 * dosage); inputs.push('instructionId=' + instruction);
	 * inputs.push('routeName=' + routeName); inputs.push('instructionName=' +
	 * instname); inputs.push('routeId=' + route); inputs.push('duration=' +
	 * duration); inputs.push('qty=' + qty);
	 * 
	 * var str = inputs.join('&');
	 */
	//alert(instname);
	var data = {
		'patientId' : patientId,
		'sosFlag' : flag,
		'treatmentId' : treatmentId,
		'id' : preMasterId,
		'drugName' : drugName,
		'currentdate' : cdate,
		'dosage' : dosage,
		'instructionId' : instruction,
		'routeName' : routeName,
		'instructionName' : instname,
		'routeId' : route,
		'duration' : duration,
		'qty' : qty
	}
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/prescription/savePrescription",
		data : JSON.stringify(data),
		dataType : 'text',
		contentType : 'application/json; charset=utf-8',
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#preMasterId").val(0);
		
			$("#callfromcopyTreatment").val('');
			getPrescriptionList();
			alertify.success(r);
			onResetPres();
		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get prescription list
 ******************************************************************************/

function getPrescriptionList() {
	var inputs = [];
	var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	} else {
		if (callfrom == "" || callfrom == undefined) {
			callfrom = 'hometab';
		}
		treatmentId = $("#patientId").val();
	}
	inputs.push('callfrom=' + callfrom);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/prescription/listOfPresCription",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			lengthofpreslist = r.length;
			if (r.length == 0) {
				$("#collapsePres").slideUp(0);
				$("#drugTable").hide();
			} else {
				$("#collapsePres").slideDown('show');
				$("#drugTable").show();
			}
			setDataToPrsTable(r, callfrom);
		}
	});
}

function calculateStatus(duedate, days) {

	var dateFirst = new Date(duedate);

	dateFirst.setDate(dateFirst.getDate() + days);

	var d1 = new Date(dateFirst);
	console.log("dateFirst" + dateFirst);
	var d2 = new Date();

	console.log(d2.getTime(), d1.getTime());

	if (d2.getTime() <= d1.getTime()) {
		return "active";
	} else if (days == "" || days == undefined || days == null) {
		return "NA";
	}

	else {
		return "inactive";
	}

}

function setDataToPrsTable(r, callfrom) {
	if (callfrom == 'hometab') {
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {

			htm = htm
					+ '<tr> '
					+ ' <td>'
					+ index
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].drugName
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].currentdate
					+ '</td>'
					+ ' <td class="text-center">'
					+ calculateStatus(new Date(r[i].createdDateTime)
							.toLocaleString().split(",")[0], r[i].duration);
			+'</td>' + '</tr>';
			index++;
		}
		if (r.length == 0) {

			htm = htm
					+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
		}
		$("#presTableCoverSheet").html(htm);
	} else {
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td>'
					+ index
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].drugName
					+ '</td>'
					+ ' <td class="text-center" style="font-size:14px;">'
					+ r[i].dosage
					+ '</td>'
					+ ' <td class="text-center">'
					+ showDuration(r[i].duration)
					+ " "
					+ '<b>'
					+ showSosStatus(r[i].sosFlag)
					+ '</b>'
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].instructionName
					+ '</td class="text-center">'
					+ '<td><button class="btn btn-success btn-xs" onclick=onEditPrescription('
					+ r[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ '<td class="text-center"><button class="btn btn-danger btn-xs" onclick=onDeletePrescription('
					+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
		if (r.length == 0) {

			htm = htm
					+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
		}
		$("#presTable").html(htm);
	}
}

function showSosStatus(value) {
	if (value == 1) {
		return "(SOS)";
	} else {
		return "";
	}
}

function showDuration(value){
	if(value==null || value==0.0){
		return 0.0;
	}
	else{
		return value;
	}
		
}


function onEditPrescription(id) {
	showHideDiv();
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/prescription/prescriptionById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getInst();
			for ( var i = 0; i < r.length; i++) {
				var dosage = r[i].dosage;
				var res = dosage.split("-");
				$("#preMasterId").val(r[i].id);
				$("#callform").val(r[i].drugName);
				$("#drugs").val(r[i].drugName);
				$("#mron").val(res[0]);
				$("#after").val(res[2]);
				$("#night").val(res[3]);
				$("#eve").val(res[1]);
				if (r[i].sosFlag == "1") {
					$("#sosflag").prop("checked", true);
				} else {
					$("#sosflag").prop("checked", false);
				}
				$("#instruction").val(r[i].instructionId);
				$("#instruction").select2();
				$("#duration").val(r[i].duration);
				$("#qty").val(r[i].qty);
				// console.log(r[i].routeId);

				$("#route").val(r[i].routeId);
				$("#route").select2();
				$("#formDivDrug").show();
				$("#ulwithpreform").show();
			}
		}
	});
}

/*******************************************************************************
 * @author : Arpit Gupta
 * @codeFor : Function to get all route name on from route master
 ******************************************************************************/

function fetchRouteMaster() {

	var routename = "";
	var inputs = [];
	inputs.push('routename=' + routename);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordeskcontoller/fetchroutemaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var routeListTemp = "";
			routeListTemp = routeListTemp
					+ "<option value='0'>--Select route--</option>";
			for ( var i = 0; i < r.listroutemasters.length; i++) {
				routeListTemp = routeListTemp + "<option value="
						+ r.listroutemasters[i].route_id + " data-name="
						+ r.listroutemasters[i].routename + ">"
						+ r.listroutemasters[i].routename + "</option>";
			}
			$("#route").html(routeListTemp);
			$("#route").select2();
		}
	});
}

function onDeletePrescription(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/prescription/deletePrescription",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			onResetPres();
			getPrescriptionList();
		}
	});
}

function showHideDiv() {
	$("#buttonDiv").toggle();
	$("#formDiv").toggle();
	$("#btnCancel").toggle();

}

function hideDiv() {
	$("#buttonDiv").hide();
	$("#formDiv").hide();
	$("#btnCancel").hide();

}

/*
 * ....................................................coversheet
 * start......................................................
 */

function showMeasureMents() {
	var inputs = [];
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	} else {
		if (callfrom == "" || callfrom == undefined) {
			callfrom = 'hometab';
		}
		treatmentId = $("#patientId").val();
	}
	inputs.push('patortreatid=' + treatmentId);
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/getMeasureMents",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			lengthofmeasurements = r.length;

			if (r.length == 0) {
				$("#meaid").hide();
				$("#borderredline").hide();
			} else {
				$("#meaid").show();
				$("#borderredline").show();
				// /$("#collapsshowEpisodeTreatmentViseeVitals").slideDown('slow');
			}

			setmmToCoverSheet(r, callfrom);
		}
	});

}

function oncheckVitalSHowHide() {
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	} else {
		$("#collapseVitals").slideDown(0);
	}
}

function setmmToCoverSheet(r, callfrom) {
	if (callfrom == 'hometab') {
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {
			htm = htm + '<tr> ' + ' <td>' + index + '</td>' + ' <td>'
					+ r[i].weight + '</td>' + ' <td>' + r[i].height + '</td>'
					+ ' <td>' + r[i].bmi + '</td>' + ' <td>' + r[i].bsa
					+ '</td>' + ' <td>' + r[i].date + '</td>' + '</tr>';
			index++;
		}
		if (r.length == 0) {
			htm = htm
					+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
		}
		$("#coversheetmm").html(htm);
	} else {
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td>'
					+ index
					+ '</td>'
					+ ' <td>'
					+ r[i].weight
					+ '</td>'
					+ ' <td>'
					+ r[i].height
					+ '</td>'
					+ ' <td>'
					+ r[i].date
					+ '</td>'
					+ ' <td>'
					+ r[i].bmi
					+ '</td>'
					+ ' <td>'
					+ r[i].bsa
					+ '</td>'
					+ '<td><button class="btn btn-success btn-xs" onclick=onEditMeasurements('
					+ r[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ '<td><button class="btn btn-danger btn-xs" onclick=onDeleteMeasurements('
					+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
		$("#measurmentstreatmentwise").html(htm);
	}
}

function onEditMeasurements(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/getMeasureMentsById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setStringTabs('second');
			for ( var i = 0; i < r.length; i++) {
				$("#measurementsMasterId").val(r[i].id);
				$("#date").val();
				$("#wg").val(r[i].weight);
				$("#height").val(r[i].height);
				$("#hcim").val(r[i].hcim);
				$("#bmi").val(r[i].bmi);
				$("#bsa").val(r[i].bsa);

				$("#ulwithform").show();
				$("#VitalsList").show();
				$("#VitalsInfoList").show();
				$("#measurementsid").show();
				$("#divideby10").show();
				$('.nav-tabs a[href="#measurements"]').tab('show');
			}
		}
	});
}

function onDeleteMeasurements(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/vtDetails/deleteMeasurmentsById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			showMeasureMents();
			oncheckVitalSHowHide();
		}
	});
}

function showVitalGraphs() {
	getVitalsAndValues("graph");
}
function setVitalGraphs(r) {
	var labelArray = [];
	var valueArray = [];
	for ( var i = 0; i < r.length; i++) {
		labelArray.push(r[i].vitalName);
		valueArray.push(r[i].value);
	}
	console.log(labelArray);
	console.log(valueArray);

	var lineChartData = {
		labels : [ "Total Receipt", "Total Refund", "Total Cash" ],
		datasets : [ {
			fillColor : "rgba(242, 179, 63, 1)",
			strokeColor : "#F2B33F",
			pointColor : "rgba(242, 179, 63, 1)",
			pointStrokeColor : "#fff",
			data : [ 100, 200, 300 ]

		}

		]
	};
	console.log(lineChartData);
	new Chart(document.getElementById("canvas").getContext("2d"))
			.Line(lineChartData);

}

function onSaveVitals() {

	var inputs = [];
	var url = "";
	var treatmentId;
	var patientId = $("#patientId").val();
	console.log("patientId", patientId);

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}

	var type = $("#inputString").val();
	if (type == "second") {
		var date = $("#date").val();
		var wg = $("#wg").val();
		var height = $("#height").val();
		var hcim = $("#hcim").val();
		var bmi = $("#bmi").val();
		var bsa = $("#bsa").val();

		if (wg == "" || wg == undefined || wg == null) {
			alertify.error("please enter weight");
			return false;
		}
		if (height == "" || height == undefined || height == null) {
			alertify.error("please enter height");
			return false;
		}
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('id=' + $("#measurementsMasterId").val());
		inputs.push('date=' + date);
		inputs.push('weight=' + wg);
		inputs.push('height=' + height);
		inputs.push('hcim=' + hcim);
		inputs.push('bmi=' + bmi);
		inputs.push('bsa=' + bsa);

		url = "ehat/vtDetails/savemeasurements";
	} else {

		var onVitalTableList = {
			listOfVitals : []
		};
		var index = 0;
		var favorite = [];
		$.each($("input[name='markCheckbox']:checked"), function() {
			favorite.push($(this).val());
		});
		var length = $("#formId .row").length;

		for ( var i = 0; i < length; i++) {
			index++;
			var vitalId = $("#labelid_" + index).attr('value');
			var vitalName = $("#labelid_" + index).text();
			var values = $("#inputBox_" + index).val();

			if ($("#labelid_" + index).text() == "Blood Pressure (mmHg)") {
				values = values + "/"+" "+ $("#hg" + index).val() +" "+ "("
						+ $("#textid").text() + ")";
			}
			if ($("#labelid_" + index).text() == "Temperature"
					+ document.getElementById("signId").innerHTML) {
				console.log($("#tempType").val() + " " + $("#signId").text());

				// var tempvalue =
				// $("#tempType").find(':selected').attr('data-name');

				values = values +" "+ "(" + $("#tempType").val() + ")" +" "+"("
						+ $("#signId").text() + ")";

			}

			if (values == undefined || values == null || values == 0
					|| values == "") {
				alertify.error("please enter"+" "+ vitalName);
				return false;
			}

			var hiddenId = $("#hiddenBox_" + index).val();
			var cdate = $("#VitaltodayDate").val();
			onVitalTableList.listOfVitals.push({
				"id" : hiddenId,
				"vitalId" : vitalId,
				"value" : values,
				"patientId" : patientId,
				"treatmentId" : treatmentId,
				"currentDate" : cdate,

			});

		}
		onVitalTableList = JSON.stringify(onVitalTableList);
		inputs.push("vitals=" + encodeURIComponent(onVitalTableList));
		url = "ehat/vtDetails/savevitalInfo";
	}

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : url,
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getVitalsAndValues();
			document.getElementById('formId').reset();
			$("#vitalBodyS").show();
			showMeasureMents();
			clearvitalform();
			onResetMeasurements();
		}

	});

}

function clearvitalform(){
	var length = $("#formId .row").length;
     var index =0;
     $("#hg2").val("");
	for ( var i = 0; i < length; i++) {
		index++;
		$("#inputBox_" + index).val("");
	}
	$("#signId").text(String.fromCharCode(176)
			+ "C");
}

function onResetMeasurements() {
	$("#measurementsMasterId").val(0);
	$("#date").val();
	$("#wg").val("");
	clearvitalform();
	$("#height").val("");
	$("#hcim").val("");
	$("#bmi").val("");
	$("#bsa").val("");
}

function showAllList() {
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#VitalsInfoList").show();
	$("#ulwithform").hide();
	$("#btnwithForm").hide();
	// $("#diagosForm").hide();
	$("#tablediv").show();
	$("#formDivDrug").hide();
	// $("#drugTable").show();
	$("#ulwithpreform").hide();
}

function showHideViatls() {
	clearvitalform();
	/* forshow hide other tabs on click */
	$("#VitalsList").html("");
	$("#VitalsInfoList").html("");
	fetchVital('onload');
	if (lengthofvitallist == 0) {
		// $("#collapseVitals").slideUp(0);
		$("#vitalBodyS").hide();
	}

	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}
	/* forshow hide other tabs on click */
	$("#collapseVitals").slideDown(0);
	$("#sxform").hide();
	$("#divideby10").show();
	$("#VitalsList").show();
	$("#VitalsInfoList").show();
	$("#measurementsid").show();
	$("#btnwithForm").show();
	$("#ulwithform").show();
	$("#ulwithpreform").hide();
	$("#formDivDrug").hide();
	$("#diagosForm").hide();
	$("#divForEntry3").hide();
	$("#ddinstruction").hide();

}

function showHidePres() {
	$("#ulwithpreform").show();
	$("#formDivDrug").show();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#divideby10").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
}

function onResetPres() {
	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}
	/* forshow hide other tabs on click */
	$("#collapsePres").slideDown(0);
	$("#drugs").val("");
	$("#mron").val("");
	$("#sosflag").prop("checked", false);
	$("#after").val("");
	$("#night").val("");
	$("#eve").val("");
	$("#instruction").val(0);
	$("#instruction").select2();
	$("#route").val(0);
	$("#route").select2();
	$("#duration").val("");
	$("#qty").val("");
	$("#diagosForm").hide();
	$("#sxform").hide();
	getInst();
	$("#prepMasterId").val(0);
	$("#callform").val("");
	// getPrescriptionList('onload');
	$("#ddinstruction").hide();
	showHidePres();
}

function onclickHistory() {
	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	/* forshow hide other tabs on click */
	$("#collapseHistory").slideDown('slow');
	$("#formHistory").show();
	$("#sxform").hide();
	$("#formDivDrug").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	$("#ddinstruction").hide();
}

function onClickComplaints() {

	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}

	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {

		$("#collapsePres").slideUp(0);
	}

	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	/* forshow hide other tabs on click */
	$("#collapseComplaints").slideDown('slow');
	$("#formComplaints").show();
	$("#divForEntry3").hide();
	// $("#formHistory").hide();
	$("#formDivDrug").hide();
	$("#sxform").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	$("#ddinstruction").hide();
}

function onclickClinical() {
	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	
	/* forshow hide other tabs on click */
	$("#collapseCilinic").slideDown('slow');
	$("#formClinical").show();
	// $("#formComplaints").hide();
	$("#divForEntry3").hide();
	$("#sxform").hide();
	$("#formDivDrug").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	$("#ddinstruction").hide();
}

function onclickServiceAdvice() {
	// $("#collapseService").collpase('show');
	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}
	/* forshow hide other tabs on click */
	$("#collapseService").slideDown('slow');
	$("#divForEntry3").toggle('slow');
	$("#sxform").hide();
	$("#tcpoeservices").show();
	$("#formDivDrug").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	$("#ddinstruction").hide();
}

function onclickInst() {

	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if (sxadvicelengthlist == 0) {
		$("#collapseSxAdvice").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp(0);
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp(0);
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp(0);
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp(0);
	}
	/* forshow hide other tabs on click */

	$("#divForEntry3").hide();
	$("#sxform").hide();
	$("#formDivDrug").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	

}

function getTreatments() {

	var patientId = $.trim(($("#patientId").val()));
	var inputs = [];
	getSeroflag();
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getTreatments",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#totalvisit").text(r.length);
			setTreatmentsTocoverSheet(r);
			setDatatoTreatmentPopup(r);
		}

	});
}

function setDatatoTreatmentPopup(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ GetFormattedDate(new Date(r[i].createdDateTime),"ddmmyyyy")
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r[i].departmentName
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '<button onclick=copyTreatmentVise('
				+ r[i].treatmentId
				+ ',"complaints") class="btn btn-warning btn-xs"><i class="fa fa-copy"></i> Complaints</button>'
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '<button onclick=copyTreatmentVise('
				+ r[i].treatmentId
				+ ',"prescription") class="btn btn-success btn-xs"><i class="fa fa-copy"></i> Prescription</button>'
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '<button onclick=copyTreatmentVise('
				+ r[i].treatmentId
				+ ',"entiretreatment") class="btn btn-info btn-xs"><i class="fa fa-copy"></i> Entire Treatment</button>'
				+ '</td>'

				+ '</tr>';
		index++;
	}
	$("#treatmentListforpopup").html(htm);
}

function setTreatmentsTocoverSheet(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+  GetFormattedDate(new Date(r[i].createdDateTime),"ddmmyyyy")
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ r[i].departmentName
				+ '</td>'

				+ '<td class="col-md-1 center">'
				+ '<a style="text-decoration:none;cursor:pointer"><img src="ehat-design/img/icon1.png"></a>'
				+ '</td>'

				+ '<td style="text-decoration:none;cursor:pointer"  class="col-md-1 center">'
				+ '<a onclick="showEpisodeTreatmentVise('
				+ r[i].treatmentId
				+ ')" class="text-primary"><img src="ehat-design/img/icon2.png"></a>'
				+ '</td>'

				/*+ '<td style="text-decoration:none;cursor:pointer"  class="col-md-1 center">'
				+ '<a onclick=copyTreatmentVise('
				+ r[i].treatmentId
				+ ',"entireTreatment") style="text-decoration:none;cursor:pointer"><img src="ehat-design/img/icon2.png"></a>'
				+ '</td>'*/

				+ '</tr>';
		index++;
	}
	$("#treatmentList").html(htm);
}

function copyTreatmentVise(tid, type) {
	var inputs = [];
	var treatmentId = $("#treatmentId").val();
	inputs.push('priviousTretamentId=' + tid);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('callfrom=' + type);
	var str = inputs.join('&');
	var confirmation = confirm("Do You Want To Copy this Treatment To Current?");
	if (confirmation == true) {
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/coversheet/copyfromlast",
			data : str + "&reqType=AJAX",
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alertify.success(r);
				displayHideDiv("cepisode");
			}
		});
	}
}

function showEpisodeTreatmentVise(tid) {

	var call = 'privioustreatmentVise';
	$("#callfromforprvTrtmnt").val(call);
	$("#priviousTrtmntId").val(tid);
	$("#divHide").show();
	getEmrHighRiskFlag();
	$("#divhome").hide();
	document.getElementById("copyicon").disabled = true;
	var userType = $("#userType").val();
	console.log("userType", userType);
	getVitalsAndValues();
	showMeasureMents();
	oncheckVitalSHowHide();
	getSxAdviceList();
	vitalstoggleprv();
	getPrescriptionList();
	prestoggleprv();
	diagosList();
	fetchClinical();
	fetchComplaint();
	fetchbilldetails();
	fetchForHistory();
	getFollowup();//Done By Akshata
	getAllNotes();
	previousPatientHeaderListTreatmentWise();//Done By Akshata
	digonosistoggleprv();
	fetchInstruction('previous');// By Navnath
	if (userType == "admin") {
		$("#divHide *").css("pointer-events", "");
	} else {
		$("#divHide >:not(#upperheadrbody)").css("pointer-events", "none");
	}

}

function vitalstoggleprv() {
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#btnwithForm").hide();
	// $("#vitalBodyS").show();
}
function prestoggleprv() {
	$("#ulwithpreform").hide();
	$("#formDivDrug").hide();
	$("#drugTable").show();
}
function digonosistoggleprv() {
	$("#diagosForm").hide();
	$("#tabledivDigo").show();
}

function onSaveAlergyonPopup() {
	var alname = $("#alname").val();
	var altypeid = $("#altype").val();
	var alReactionid = $("#alReaction").val();
	var aldate = $("#aldate").val();
	var notespopup = $("#notespopup").val();
	var altypename = $("#altype").find(':selected').attr('data-name');
	var alReactionname = $("#alReaction").find(':selected').attr('data-name');
	var almasterid = $("#almasterid").val();
	var patientId = $("#patientId").val();
	var d1 = new Date().getTime();
	
	var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
	var arrayDate = aldate.match(pattern);
	var d3 = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
	var d2=d3.getTime();
	if (alname == "" || alname == undefined || alname == null) {
		alertify.error("please enter allergy name");
		return false;
	} else if (altypeid == "" || altypeid == "undefined" || altypeid == 0) {
		alertify.error("please enter allergy type");
		return false;
	} else if (alReactionid == "" || alReactionid == "undefined"
			|| alReactionid == 0) {
		alertify.error("please enter allergy reaction");
		return false;
	} else if (aldate == "" || aldate == "undefined" || aldate == 0) {
		alertify.error("please enter allergy date");
		return false;
	}
	else if(d2>d1){
		alertify.error("fos should be  equal or less than present date");
		return false;
	}
	else if (notespopup == "" || notespopup == "undefined" || notespopup == 0) {
		alertify.error("please enter notes");
		return false;
	}

	
	
	var data = {
		"id" : almasterid,
		"allergyName" : alname,
		"allergyTypeId" : altypeid,
		"allergyReactId" : alReactionid,
		"allergyTypeName" : altypename,
		"allergyReactName" : alReactionname,
		"fos" : aldate,
		"notes" : notespopup,
		"patientId" : patientId
	}

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/saveAllergyonopoup",
		data : JSON.stringify(data),
		dataType : 'text',
		contentType : 'application/json; charset=utf-8',
		error : function() {
			alert('error');
		},
		success : function(r) {
			// $("#md2").modal('hide');
			alertify.success(r);
			onRestAlergy();
		}
	});
}

function onRestAlergy() {
	getAllergies('foreditdel');
	$("#alname").val("");
	$("#altype").val(0);
	$("#alReaction").val(0);
	$("#altype").select2();
	$("#alReaction").select2();
	$("#aldate").val("");
	$("#notespopup").val("");
	$("#almasterid").val(0);
}
function getAllergies(type) {
	var inputs = [];
	var id = $("#patientId").val();
	inputs.push('patId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getAllergyonopoup",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setDatatoAllergyAcco(r, type);
		}
	});
}

function setDatatoAllergyAcco(r, type) {
	if (type == 'foreditdel') {
		var htm = "";
		var index = 1;

		for ( var i = 0; i < r.length; i++) {
			htm = htm + '<tr> ' + ' <td  class="text-center">'
					+ index + '</td>'

					+ ' <td class="text-center">' + r[i].allergyName + '</td>'

					+ ' <td class="text-center">' + r[i].allergyTypeName
					+ '</td>'

					+ ' <td class="text-center">' + r[i].allergyReactName
					+ '</td>'

					+ ' <td class="text-center">' + r[i].fos + '</td>'

					+ ' <td  class=" text-center">' + r[i].notes + '</td>'

					+ '<td class=" text-center"><input  name="allPopuptablecheckbox"  value="'
					+ r[i].id + '" id="all' + r[i].id
					+ '" type="checkbox"  style="cursor: pointer" /></td>'

					+ '</tr>';
			index++;
		}
		if (r.length == 0) {
			htm = htm
					+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
		}
		$("#allPopupList").html(htm);
	} else {
		var htm = "";
		var index = 1;

		for ( var i = 0; i < r.length; i++) {
			htm = htm + '<tr> ' + ' <td  class=" col-md-1 text-center">'
					+ index + '</td>'

					+ ' <td class=" col-md-3 text-center">' + r[i].allergyName
					+ '</td>'

					+ ' <td class=" col-md-3 text-center">' + r[i].fos
					+ '</td>'

					+ ' <td class=" col-md-3 text-center">'
					+ calculateallergysince(r[i].fos);
			+'</td>'

			+ '</tr>';
			index++;
		}
		if (r.length == 0) {
			htm = htm
					+ "<tr><td colspan='6' class='center text-danger'>Sorry No Records To Display</td></tr>";
		}
		$("#coversheetallergy").html(htm);
	}

}

function calculateallergysince(date) {
	
	var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
	var arrayDate = date.match(pattern);
	var d1 = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
	var d2 = new Date(GetFormattedDate(new Date()));
	var Difference_In_Time = d2.getTime() - d1.getTime();
	if(d1.getTime()>d2.getTime()){
		return 0;
	}
	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	return Math.round(Difference_In_Days);
}

function GetFormattedDate(date,type) {

	var todayTime = date;

	var month = todayTime.getMonth() + 1;

	var day = todayTime.getDate();

	var year = todayTime.getFullYear();
	
	
	
	if(type=="ddmmyyyy"){
		
		return day + "/" + month + "/" + year;
	}

	return month + "/" + day + "/" + year;
}

function editAlpopup() {
	var idList = [];
	var inputs = [];
	$("#allPopupList").find('input[name="allPopuptablecheckbox"]').each(
			function() {

				if ($(this).is(":checked")) {
					var currentId = $('#' + this.id).val();
					idList.push(currentId);
				}
			});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}
	
	if (idList.length>1) {
		alertify.error("Please check only one checkbox");
		return false;
	}

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getAllergyonopoupbyid",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#hidealfrm").show('slow');
			for ( var i = 0; i < r.length; i++) {
				$("#alname").val(r[i].allergyName);
				$("#altype").val(r[i].allergyTypeId);
				$("#altype").select2();
				$("#alReaction").val(r[i].allergyReactId);
				$("#alReaction").select2();
				$("#aldate").val(r[i].fos);
				$("#notespopup").val(r[i].notes);
				$("#almasterid").val(r[i].id);
			}
		}
	});
}

function deleteAlpopup() {
	var idList = [];
	var inputs = [];
	$("#allPopupList").find('input[name="allPopuptablecheckbox"]').each(
			function() {

				if ($(this).is(":checked")) {
					var currentId = $('#' + this.id).val();
					idList.push(currentId);
				}
			});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/deleteAllergypopupdata",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			onRestAlergy();
		}
	});
}

function showHideAlF() {
	$("#hidealfrm").toggle('slow');
	//$("#tbdiv").css('height', '400px');
}

function updateSeropositive(e1) {
	var flag = e1.value;
	if (e1.value == "1") {
		$("#seropositiveDiv").show();
	} else {
		$("#seropositiveDiv").hide();
	}

	var inputs = [];
	var patientid = $("#patientId").val();
	inputs.push('patid=' + patientid);
	inputs.push('flag=' + flag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/makeseropositive",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
		}
	});
}
function updateEmrHighResk(e2) {
	var treatmentId = "";
	if (e2.value == "1") {
		$("#emrhighriskdiv").show();
	} else {
		$("#emrhighriskdiv").hide();
	}
	var inputs = [];
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {

		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {

		treatmentId = $("#treatmentId").val();
	} else {
		treatmentId = $("#treatmentId").val();
	}
	inputs.push('flag=' + e2.value);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/makeemrhighrisk",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
		}
	});

}

function getEmrHighRiskFlag() {
	var inputs = [];
	var treatmentId = "";
	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {

		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {

		treatmentId = $("#treatmentId").val();
	} else {
		treatmentId = $("#treatmentId").val();
	}
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getemrHighriskflag",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {

			for ( var i = 0; i < r.length; i++) {
				if (r[i].emrHighrisk == 1) {
					$("#emrhighriskdiv").show();
					$("#offemrhighrisk").removeClass('active');
					$("#onemrhighrisk").addClass('active');
				} else {
					$("#offemrhighrisk").addClass('active');
					$("#onemrhighrisk").removeClass('active');
					$("#emrhighriskdiv").hide();
				}

			}

		}
	});
}

function getSeroflag() {
	var inputs = [];
	var patientid = $("#patientId").val();
	inputs.push('patientId=' + patientid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getSeroflag",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r[0].seropositiveFlag == 1) {
				$("#seropositiveDiv").show();
				$("#offseropostive").removeClass('active');
				$("#onseropositive").addClass('active');
			} else {
				$("#seropositiveDiv").hide();
			}
		}
	});
}

function getFolderinfo() {
	var inputs = [];
	var folderId = 3;
	inputs.push('folderId=' + folderId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getFolderInfo",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getDocuments();
			$("#folderid").val(r[0].folderId);
			$("#foldername").val(r[0].folderName);
		}
	});
}

function uploadFile() {

	var folderid = $("#folderid").val();
	var treatmentId = $("#treatmentId").val();
	var patientId = $("#patientId").val();

	var folderName = $("#foldername").val() + "\\PatId-" + patientId
			+ "\\TreatId-" + treatmentId;

	var form = $('#ddfileUploadfrm')[0];
	if (document.getElementById("ddfile").files.length == 0) {
		alertify.error("Please select file");
		return false;
	}

	var data = new FormData();
	var len = document.getElementById("ddfile").files.length;
	for ( var i = 0; i < len; i++) {
		data.append("ifile", document.getElementById("ddfile").files[i]);
	}

	data.append("folderName", folderName);
	console.log(data);
	jQuery.ajax({
		async : false,
		type : "POST",
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		data : data,
		url : "ehat/uploadDoc/uploadDmsDoc",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Network Issue");
		},
		success : function(r) {

		}
	});

}

function savePatientDocument() {

	var doc = $("#ddfile").val();
	var patId = $("#patientId").val();
	var tid = $("#treatmentId").val();
	var folderId = $("#folderid").val();
	var folderName = $("#foldername").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var files = $('#ddfile').prop("files");
	var docPath = "";
	console.log("in savePatientDocument", folderName);
	if (doc == "") {
		alertify.error("Please select file first ");
		return false;
	}
	var docDetails = {
		lstDocUpload : []
	};
	for ( var i = 0; i < files.length; ++i) {
		docPath = folderName + "\\PatId-" + patId + "\\TreatId-" + tid + "\\"
				+ files[i].name;
		console.log("in savePatientDocument", docPath);
		docDetails.lstDocUpload.push({
			patientId : patId,
			treatmentId : tid,
			unitId : unitId,
			deleted : "N",
			docName : files[i].name,
			folderId : folderId,
			docPath : docPath,
			createdBy : userId
		});
	}
	docDetails = JSON.stringify(docDetails);
	var inputs = [];
	inputs.push('docDetails=' + encodeURIComponent(docDetails));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/documentmaster/savePatientDocument",
		cache : false,
		success : function(r) {
			getDocuments();
			$("#ddfile").val('');
			alertify.success("document saved successfully");

		}
	});
}

function getDocuments() {
	var inputs = [];
	var patientid = $("#patientId").val();
	var folderId = 3;
	inputs.push('patientId=' + patientid);
	inputs.push('folderId=' + folderId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/getDocs",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToDocsTable(r);
		}
	});
}

function setDataToDocsTable(r) {
	var htm = "";
	var index = 1;

	for ( var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td  class="text-center">'
				+ index
				+ '</td>'

				+ ' <td class="text-center">'
				+GetFormattedDate(new Date(r[i].createdDateTime),"ddmmyyyy")
				+ '</td>'
				+ ' <td class="text-center"><a data-toggle="modal"  style="cursor:pointer" onclick=setPreviewDoc("'
				+ encodeURIComponent(r[i].docPath) + '")>' + r[i].docName
				+ '</a></td>' + '<td class="text-center"><input  name="docstablecheckbox"  value="'
				+ r[i].docId + '" id="docstablecheckbox' + r[i].docId
				+ '" type="checkbox"  style="cursor: pointer" /></td>'

				+ '</tr>';
		index++;
	}
	$("#documentList").html(htm);
}

function setPreviewDoc(docPath) {
	
	$("#preview").attr("src",
	"");
	$("#preview").attr("border", "1px solid lightgray");
	$("#preview").attr("src",
			'ehat/documentmaster/readDocPath?docPath=' + decodeURI(docPath));
	
	if(docPath.split(".")[1]!='docx' && docPath.split(".")[1]!='xls' && docPath.split(".")[1]!='exe'){
		$("#md3").modal('show');
	}
	
}

function cleariframe(){
	$("#preview").attr("src",
			"");
}

function deleteDocs() {
	var idList = [];
	var inputs = [];
	$("#documentList").find('input[name="docstablecheckbox"]').each(function() {
		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/deletedocs",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getDocuments();
		}
	});
}

/*
 * sxadvice section started author:Arpit Gupta
 */

function proAutoSuggestion(procedureId, callfrom) {
	var resultData = [];
	var procedurename = $("input#" + procedureId).val();
	var inputs = [];

	inputs.push('callfrom=' + callfrom);
	inputs.push('proname=' + procedurename);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ddsxdavice/sxadviceAutoSuggestion",
				cache : false,
				success : function(response) {
					var template = "";
					for ( var j = 0; j < response.length; j++) {
						var arrValue = response[j].procedureName;
						var idValue = response[j].id;
						var pname = response[j].procedureName;

						resultData.push({
							ID : idValue,
							Name : pname
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					setTimeout(
							function() {
								$("div#sxAdviceByName .typeahead").html(
										template);
								$("div#sxAdviceByName .typeahead").show();

								$("input#" + procedureId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + procedureId).data('typeahead').source = resultData;
							}, 500);
				}
			});
	function displayResult(item) {
		var id = item.value;
		getProcedureType(id);
	//	getProcedureGrp(id);
		$("#sxpronameid").val(id);
	}
}

function getProcedureTypeList(){
	var inputs = [];
	var callfrom = "";
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/newOt/getprocedureType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			var alistTemp = "<option value='0'>--select--</option>";
			for ( var i = 0; i < r.length; i++) {
				alistTemp = alistTemp + "<option value=" + r[i].id
						+ " data-name=" + r[i].proName + ">" + r[i].proName
						+ "</option>";
			}
			$("#ddprotype").html(alistTemp);
			$("#ddprotype").select2();
		}
	});
}





function getProcedureGrpList() {
	var inputs = [];
	var callfrom = "";
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/procedureGrp/getproceduregrp",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var alistTemp = "<option value='0'>--select--</option>";
			for ( var i = 0; i < r.length; i++) {
				alistTemp = alistTemp + "<option value=" + r[i].id
						+ " data-name=" + r[i].proGrpName + ">" + r[i].proGrpName
						+ "</option>";
			}
			$("#ddprogrp").html(alistTemp);
			$("#ddprogrp").select2();
		}
	});
}
function getProcedureType(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ddsxdavice/getprotype",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for(var i=0;i<r.length;i++){
				$("#ddprotype").val(r[i].protypeid);
				$("#ddprotype").select2();
				$("#ddprogrp").val(r[i].progrpid);
				$("#ddprogrp").select2();
			}
		}
	});
}
function getProcedureGrp(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ddsxdavice/getprogrp",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			var alistTemp = "<option value='0'>--select--</option>";
			for ( var i = 0; i < r.length; i++) {
				alistTemp = alistTemp + "<option value=" + r[i].id
						+ " data-name=" + r[i].proGrpName + ">"
						+ r[i].proGrpName + "</option>";
			}
			$("#ddprogrp").html(alistTemp);
			$("#ddprogrp").select2();

		}
	});
}

function onSaveSxAdvice() {
	var ddproName = $("#sxproname").val();
	var sxadvicemasterid = $("#sxadvicemasterid").val();
	var ddprotype = $("#ddprotype").val();
	var ddprogrp = $("#ddprogrp").val();
	var ddprocdate = $("#ddprocdate").val();
	var advicedate = $("#sxadvdate").val();
	var d1 = new Date().getTime();
	var d2 = new Date(ddprocdate).getTime();

	var sxpronameid = $("#sxpronameid").val();
	var patientId = $("#patientId").val();
	var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	}

	if (ddproName == 0 || ddproName == "") {
		alertify.error("please select procedure name");
		return false;
	} else if (ddprotype == 0 || ddprotype == "") {
		alertify.error("please select procedure type");
		return false;
	} else if (ddprogrp == 0 || ddprogrp == "") {
		alertify.error("please select procedure group");
		return false;
	} else if (ddprocdate == 0 || ddprocdate == "" || ddprocdate == undefined) {
		alertify.error("please select procedure date");
		return false;
	}
	if (d2 < d1) {
		alertify.error("date should be greater than present date");
		return false;
	}

	var protypename = $("#ddprotype").find(':selected').attr('data-name');
	var progroupname = $("#ddprogrp").find(':selected').attr('data-name');
	var notesxadvice = $("#notesxadvice").val();
	var sxriskfactor = $("#sxriskfactor").val();

	var data = {
		"id" : sxadvicemasterid,
		"pronameid" : sxpronameid,
		"procedureName" : ddproName,
		"proTypeName" : protypename,
		"proGrpName" : progroupname,
		"procedureTypeId" : ddprotype,
		"procedureGrpId" : ddprogrp,
		"sadviceType" : getcheckboxvalue(),
		"adviceDate" : advicedate,
		"proceduerDate" : ddprocdate,
		"note" : notesxadvice,
		"riskFactor" : sxriskfactor,
		"treatmentId" : treatmentId,
		"patientId" : patientId
	}

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ddsxdavice/savesxadvice",
		data : JSON.stringify(data),
		dataType : 'text',
		contentType : 'application/json; charset=utf-8',
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getSxAdviceList();
			onResetsxfrom();
		}
	});
}

function onResetsxfrom() {
	// clear form start

	$("#sxproname").val("");
	$("#sxpronameid").val('0');
	$("#sxadvicemasterid").val('0');
	$("#ddprotype").val('0');
	$("#ddprogrp").val('0');
	$('#rdical').prop("checked", false);
	$("#palletive").prop("checked", false);
	$("#ddprotype").select2();
	$("#ddprogrp").select2();
	$("#ddprocdate").val("");
	$("#notesxadvice").val("");
	$("#sxriskfactor").val("");
	getProcedureGrpList();
	// hide show start
	$("#collapseSxAdvice").slideDown(0);
	$("#sxform").show();
	$("#formDivDrug").hide();
	$("#ulwithpreform").hide();
	$("#divideby10").hide();
	$("#VitalsList").hide();
	$("#VitalsInfoList").hide();
	$("#measurementsid").hide();
	$("#ulwithform").hide();
	$("#diagosForm").hide();
	$("#btnwithForm").hide();
	$("#ulwithform").hide();
	$("#divForEntry3").hide();
	$("#ddinstruction").hide();

	/* forshow hide other tabs on click */
	if (lengthofvitallist == 0 && lengthofmeasurements == 0) {
		$("#collapseVitals").slideUp(0);
	}
	if (lengthofdianosyslist == 0) {
		$("#collapseDiago").slideUp(0);
	}
	if (lengthofpreslist == 0) {
		$("#collapsePres").slideUp(0);
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofServiceAdvised==0){
		$("#collapseService").slideUp('fast');
	}
	if(lengthofComplaint==0){
		$("#collapseComplaints").slideUp('fast');
	}
	if(lengthofClinical==0){
		$("#collapseCilinic").slideUp('fast');
	}
	if(lenghthofHistory==0){
		$("#collapseHistory").slideUp('fast');
	}

	/* forshow hide other tabs on click */
}

function getcheckboxvalue() {
	var radflag = $('#rdical').is(":checked");
	var pallflag = $("#palletive").is(":checked");
	if (radflag) {
		return "1";
	} else if (pallflag) {
		return "2";
	} else {
		return "0";
	}
}

function getSxAdviceList() {
	var inputs = [];
	var treatmentId;

	var callfrom = $("#callfromforprvTrtmnt").val();
	if (callfrom == 'privioustreatmentVise') {
		treatmentId = $("#priviousTrtmntId").val();
	} else if (callfrom == "cepisode") {
		treatmentId = $("#treatmentId").val();
	} else {
		if (callfrom == "" || callfrom == undefined) {
			callfrom = 'hometab';
		}
		treatmentId = $("#patientId").val();
	}
	inputs.push('callfrom=' + callfrom);
	inputs.push('patorTreatId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ddsxdavice/getsxadvice",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			sxadvicelengthlist = r.length;
			if (r.length == 0) {
				$("#collapseSxAdvice").slideUp(0);
				$("#tabledivsxfrom").hide();
			} else {
				$("#collapseSxAdvice").slideDown(0);
				$("#tabledivsxfrom").show();
			}
			setDataToSxTable(r, callfrom);
		}
	});
}
function setDataToSxTable(r, callfrom) {

	if (callfrom == 'hometab') {

		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {
			htm = htm + '<tr> ' + ' <td  class="text-center">' + index
					+ '</td>' + ' <td class="text-center">'
					+ r[i].procedureName + '</td>'
					+ ' <td class="text-center">'
					+ $("#loggedinUserName").val() + '</td>'
					+ ' <td class="text-center">' + r[i].adviceDate + '</td>'

					+ '</tr>';
			index++;
		}
		$("#retab_sxadvice").html(htm);

	} else {
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td  class=" text-center">'
					+ index
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].procedureName
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].proTypeName
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].proGrpName
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].adviceDate
					+ '</td>'
					+ ' <td class="text-center">'
					+ r[i].proceduerDate
					+ '</td>'
					+ '<td class="text-center"><button class="btn btn-success btn-xs" onclick=onEditSxForm('
					+ r[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ '<td class="text-center"><button class="btn btn-danger btn-xs" onclick=ondeleteSxForm('
					+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'

					+ '</tr>';
			index++;
		}
		$("#sxlist").html(htm);
	}

}

function onEditSxForm(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ddsxdavice/getsxadvicebyid",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#sxform").show();
			for ( var i = 0; i < r.length; i++) {

				$("#sxproname").val(r[i].procedureName);
				$("#sxadvicemasterid").val(r[i].id);
				$("#sxpronameid").val(r[i].pronameid);
				$("#ddprotype").val(r[i].procedureTypeId);
				$("#ddprogrp").val(r[i].procedureGrpId);
				$("#ddprotype").select2();
				$("#ddprogrp").select2();

				if (r[i].sadviceType == "1") {
					$("#palletive").prop("checked", false);
					$('#rdical').prop("checked", true);
				} else if (r[i].sadviceType == "2") {
					$('#rdical').prop("checked", false);
					$("#palletive").prop("checked", true);
				}

				$("#ddprocdate").val(r[i].proceduerDate);
				$("#sxadvdate").val(r[i].adviceDate);
				$("#notesxadvice").val(r[i].note);
				$("#sxriskfactor").val(r[i].riskFactor);
			}
		}
	});
}

function ondeleteSxForm(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ddsxdavice/deletesxadvice",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getSxAdviceList();
		}
	});
}

function fetchInstPatientWise() {
	var inputs = [];
	var patientId = $("#patientId").val();
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/coversheet/fetchinstpatwise",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDatatoGeneralAdvice(r);
		}
	});
}
function setDatatoGeneralAdvice(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		htm = htm + '<tr> ' + ' <td  class="text-center">' + index + '</td>'
				+ ' <td class="text-center">' + r[i].instruction_name + '</td>'
				+ ' <td class="text-center">' + $("#loggedinUserName").val()
				+ '</td>' + ' <td class="text-center">'
				+ new Date(r[i].createdDate).toLocaleString().split(",")[0]
				+ '</td>'

				+ '</tr>';
		index++;
	}
	$("#retab_instlist").html(htm);
}