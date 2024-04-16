var count = 1;
var j = 1;
var i = 1;

var RisTemplate = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		// + "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.treatmentFlag == 'Y' && $T.pl.groupName != 'Gamma'}"
		+ "{#foreach $T.listRadiologyDTO as pl} {#if $T.pl.groupName != 'Gamma'}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "{#if $T.pl.radUrgentFlag == '3'}"
	//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"
		+ "{#if $T.pl.radUrgentFlag == '2'}"
	//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"
		+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
	//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
		+ "{#if $T.pl.deptId == '1'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '2'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
		+ "{#if $T.pl.deptId == '3'}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
		+ "{#if $T.pl.arrivalTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setArrivalTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idArrivalTime{count}'/>{$T.pl.arrivalTime}</td>{#/if}"
		+ "{#if $T.pl.takenTime == 0}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/></td>"
		+ "{#else}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' checked='checked' style='cursor: pointer' onclick='setTakenTime({count},{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest})' id='idTakenTime{count}'/>{$T.pl.takenTime}</td>{#/if}"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+"{#if $T.pl.reportStatus == 'Y'}"
		+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#else}"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris')><i class='fa fa-check'></i></button>"
		+ "{#/if}"
		+ "</td>"
		+ "</tr>{#/if}{#/for}</tbody></table></div>";

//{#if $T.pl.treatmentFlag == 'N'}{#/if}
var RisTemplate1 = "<div class='col-md-12-1' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
	+ "<tbody>"
	+ "{#foreach $T.listRadiologyDTO as pl}{#if $T.pl.treatmentFlag == 'N' &&  $T.pl.groupName != 'Gamma'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
	+ "{#if $T.pl.radUrgentFlag == '3'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: red'>{$T.pl.uhid}</td>{#/if}"
	+ "{#if $T.pl.radUrgentFlag == '2'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px; background: orange'>{$T.pl.uhid}</td>{#/if}"
	+ "{#if $T.pl.radUrgentFlag == '1' || $T.pl.radUrgentFlag == '0'}"
//	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientId}</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.uhid}</td>{#/if}"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.patientName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.categoryName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.doctorName}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.testName}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.assignedDate}</td>"		//aniket 20/JAN/2022
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.patientGender}</td>"
	+ "{#if $T.pl.deptId == '1'|| $T.pl.deptId == '0'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>OPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '2'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>IPD</td>{#/if}"
	+ "{#if $T.pl.deptId == '3'}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>Diagnosis</td>{#/if}"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.arrivalTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.pl.takenTime}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "{#if $T.pl.reportStatus == 'Y'}"
	+ "<button type='button' class='btn btn-xs btn-warning' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris','previousRec')><i class='fa fa-check'></i></button>"		//aniket kanse 14 DEC 2020 //added previous flag for disabling report creation in previous record
	+ "{#else}"
	+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.patientId},{$T.pl.treatmentId},{$T.pl.idtestRadiology},{$T.pl.idradiologyTest},'Ris','previousRec')><i class='fa fa-check'></i></button>"
	+ "{#/if}"
	
	+ "</td>"
	+ "</tr>{#/if}{#/for}</tbody></table></div>";

var RisTempSearch = "<div class='col-sm-12-1 scroller' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<td class='col-sm-0-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.objTreat.pi}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.tit} {$T.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.sx}</td>"
		+ "<td class='col-sm-0-1 center' style='height: 21.5px;'>{$T.ag}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.objradiology.testName}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.objradiology.grpName}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.objradiology.Instruct}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.objradiology.InvestbodyPart.bodyPartName}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.objradiology.itStatus}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.pl.objTreat.pi},{$T.pl.objTreat.ti})><i class='fa fa-check'></i></button>"
		+ "</td></tr></tbody></table></div>";

var RisTeSearch = "<div class='col-sm-12-1 scroller' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.objTreat.pi}</td>"
		+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>{$T.pl.tit} {$T.fn} {$T.mn} {$T.ln}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.sx}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.ag}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.objradiology.itStatus}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',{$T.objTreat.pi},{$T.objTreat.ti})><i class='fa fa-check'></i></button>"
		+ "</td></tr></tbody></table></div>";

/*function setTemplateRis(type) {
	var TID;
	if (type == "view") {
		TID = $("#TID").html();
	} else {

		TID = " ";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchAllRadiologyDetail');
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var myObj = null;
			if (type == "view") {

				var PID = $("#PID").html();

				var myArray = JSON.parse(ajaxResponse);
				for ( var i = 0; i < myArray.testDashboard.length; i++) {

					if (myArray.testDashboard[i].objTreat.pi == PID) {
						alert("Matched");
						myObj = myArray.testDashboard[i];
						break;
					}
				}
				
				myObj = JSON.stringify(myObj);
				$("#viewtypedata").html();

			} else {
				$("#risdata").html(ajaxResponse);

				var obj = eval('(' + ajaxResponse + ')');

				$("#studTabD").setTemplate(RisTemplate);
				$("#studTabD").processTemplate(obj);
			}
		}
	});
}*/

/*function setTemplateRis(type) {
	var TID;
	if (type == "view") {
		TID = $("#TID").html();
	} else {

		TID = " ";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchAllRadiologyDetail');
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var myObj = null;
			if (type == "view") {

				var PID = $("#PID").html();

				var myArray = JSON.parse(ajaxResponse);
				for ( var i = 0; i < myArray.testDashboard.length; i++) {

					if (myArray.testDashboard[i].objTreat.pi == PID) {
						alert("Matched");
						myObj = myArray.testDashboard[i];
						break;
					}
				}
				
				myObj = JSON.stringify(myObj);
				$("#viewtypedata").html();

			} else {
				$("#risdata").html(ajaxResponse);

				var obj = eval('(' + ajaxResponse + ')');

				$("#studTabD").setTemplate(RisTemplate);
				$("#studTabD").processTemplate(obj);
				
				$("#studTabD1").setTemplate(RisTemplate1);
				$("#studTabD1").processTemplate(obj);
			}
		}
	});
}*/
var TempViewRisBar = '<form role="form" class="form-inline">	<div class="col-md-12-1" style="padding-top: 3px;">		<div class="list-group list-group-margin-bottom col-md-1-1"			style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">			<li class="list-group-item zero-padding col-md-6-1"				style="margin-top: 0px;">{#if $T.img!= ""} <img				alt="Patient Image" class="img-responsive col-md-12-1" name="pImg"				id="pImg"				style="margin-right: 0px; margin-left: 5px; margin-top: 0px;"				src="{$T.img}"> {#/if}{#if $T.img== ""} <img				alt="Patient Image" class="img-responsive col-md-12-1"				style="margin-right: 0px; margin-left: 5px; margin-top: 0px;"				src="images/user1forbill.jpg"> {#/if}			</li>		</div>		<div style="padding-top: 20px" class="col-md-11-1">			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Bill					No </label> <label class="col-md-6-1 TextFont" id="invoiceNo"					for="exampleInputEmail1"></label> <input id="txtRecNo1" value=""					style="display: none">			</div>			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Patient					Id </label> <label id="patid" class="col-md-6-1 TextFont"					for="exampleInputEmail1">{$T.pl[0].objTreat.pi}</label>			</div>			<div class="col-md-3-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Patient					Name </label> <label id="patname" class="col-md-8-1 TextFont"					for="exampleInputEmail1"> {$T.pl[0].fn} {$T.pl[0].ln}</label>			</div>			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Admission					No </label> <label id="ipdno" class="col-md-6-1 TextFont"					for="exampleInputEmail1">{$T.pl[0].objTreat.trCount}</label>			</div>			<div class="col-md-1-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Age </label><label id="" for="exampleInputEmail1" class="col-md-6-1 TextFont">{$T.pl[0].ag}</label>			</div>			<div class="col-md-1-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Gender </label> <label id="" for="exampleInputEmail1" class="col-md-6-1 TextFont">{$T.pl[0].sx}</label>			</div>		</div>		<div style="padding-top: 14px; margin-bottom: -10px;"			class="col-md-11-1">			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-5-1 TextFont" for="exampleInputEmail1">DOA </label> <label id="" for="exampleInputEmail1" class="col-md-6-1 TextFont">{$T.pl[0].objTreat.treStart}</label>			</div>			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">DOD </label> <label id="tEndDate" for="exampleInputEmail1"					class="col-md-6-1 TextFont"></label>			</div>			<div class="col-md-3-1">				<div class="divide-10"></div>				<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Registered					Date </label> <label id="tStartDate" for="exampleInputEmail1"					class="col-md-6-1 TextFont"></label>			</div>		</div>	</div></form>';

var demo = '<div>sdfhsdghsdfhsdgfhsdgsdh</div>';
function settempViewRis() {

	var ajaxResponse = $("#patdet").html();

	pobj1 = eval('(' + ajaxResponse + ')');

	$("#RisPBar").setTemplate(TempViewRisBar);
	$("#RisPBar").processTemplate(pobj1);
};

function uploadRisFile() {

	alert("In File Upload");
	var TID = 19;
	var filePath = $("#Risfile1").val();

	var inputs = [];
	inputs.push('action=uploadrisfile');
	inputs.push('filePath=' + encodeURIComponent(filePath));
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// 
		},
		success : function(r) {
			alert("Upload Successfully...");
			fetchRisImage();
		}
	});
}

function fetchRisImage() {
	alert("In Fetch Image Function");
	count = 1;
	var TID = 19;
	var inputs = [];
	inputs.push('action=fetchRisImage');
	inputs.push('tid' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert("Done");
		}
	});
}

var containerTemplate = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div id='divPi{count}' style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 8%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='VIEW' id='btnView{count}' onClick='passToView(this)'/></div><div style='width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' onclick='passToEdit(this)' /></div><div style='width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deletePatient(this)'/></div><div style='width: 10%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='APPOINTMENT' id='btnAppo{count}' onclick='passToAppo(this)' class='edit' /></div></div>{#/for}";

var patientDocDeskTemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.img}</div><div style='width: 12.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>Age</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.sx}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewDoctorDesk({$T.pl.pi})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div> {#/for}";

var dispTest = "{#foreach $T.testList as tl}<div style='width:100%;overflow: auto;'></div><div style='width: 10%;'><input name='checkbox' id='checkbox' type='checkbox' value='{$T.tl.test_ID}' /></div><div style='width: 80%;'>{$T.tl.tname}</div>{#/for}";

var dispDoctorRMO = "<option value='select'>Select Doctor</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
var rmoDashboard = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.ag}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.wt}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input  style='font-size: 10px;' type='button' onclick='viewPatientDetails('{$T.pl.pi}','{$T.opa.ad}','{$T.pl.opa.di}','{$T.pl.opa.tn}','{$T.pl.opa.paid}')' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";

var testResultsDOcDesk = "{#foreach $T.tlist as li}<div style='width: 100%; height: 13%; border-bottom: 1px solid #85a7d4;'><div style='width: 17%; border-right: 1px solid #85a7d4; height: 100%;'>{$T.li.tname}</div>{#foreach $T.li.listTreatmentTests as rl}<div class='GridborderRight'>{$T.rl.test_report}</div>{#/for}</div>{#/for}";
var dispOperationDoctor = "<option value='select'>Select Doctor</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
var rmoPrevTretemplate = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='div{count}'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 12%; height: 25px; border-right: 1px solid #069;padding-left: 2%; padding-top: 3px; text-align: center;' onclick='hideShowPreTreatment({$T.pl.pi},{count})'  ><img src='images/down.png' id='imgupdown{count++}'/></div></div> {#/for}";
var rmoPrevTreTestTemplate = "{#foreach $T.pl[0].liT as tl}<div style='width:100%;overflow: auto;'></div><div style='width: 10%;'>{#if $T.tl.suggest=='Y'}<input name='checkbox' id='checkbox' type='checkbox' value='{$T.tl.test_ID}' checked='checked' />{#/if}{#if $T.tl.suggest!='Y'}<input name='checkbox' id='checkbox' type='checkbox' value='{$T.tl.test_ID}'>{#/if}</div><div style='width: 80%;'>{$T.tl.tName}</div>{#/for}";

var rmoPrevTretemplateshow = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' ><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 11.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otd.ti}</div><div style='width: 16%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otd.strtm}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick=viewRmoPrevTr('{$T.pl.otd.id}','{$T.pl.otd.ti}','{$T.pl.pi}') style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div> {#/for}";

var patientInfo = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
		+ '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
		+ '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
		+ '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
		+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
		+ '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
		+ '<div style="padding-top: 15px" class="col-md-11-1">'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Patient Id:</label>'
		+ '<label id="" for="exampleInputEmail1"	class="col-md-4-1 TextFont">{$T.pi}</label></div>'

		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont" for="exampleInputEmail1">Patient Name:</label>'
		+ '<label id="" for="exampleInputEmail1"	class="col-md-7-1 TextFont">{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" id ="patno">OPD No:</label>'
		+ '<label id="trCount" for="exampleInputEmail1" class="col-md-4-1 TextFont">{$T.objTreat.trCount}</label></div>'

		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Registered Date:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-6-1 TextFont">{$T.rgDt}</label></div></div>'

		+ '<div style="padding-top: 14px; margin-bottom: -10px;" class="col-md-11-1">'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-6-1 TextFont" >Consulting Doct:</label>'
		+ '{#if $T.trid!="0"}<label class="col-md-6-1 TextFont" id="nameh">{$T.objDoc.dn}</label></div>{#/if}'
		+ '{#if $T.trid=="0"}<label class="col-md-6-1 TextFont">{$T.liBM[0].consFollowup}</label></div>{#/if}'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1" class="col-md-4-1 TextFont">Age:</label>'
		+ '<label id="" class="col-md-4-1 TextFont"	for="exampleInputEmail1">{$T.ag}{$T.agtp}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Gender:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont">{$T.sx}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1" class="col-md-4-1 TextFont">Corporate:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont"> </label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Weight:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont">{$T.wt}&nbsp;&nbsp;Kg</label></div>'

		+ '</div></div></form></div></div></div>'
		+ '{#if $T.trid!="0"}<input type="hidden" id="treatmentId" value="{$T.trid}" />{#/if}'
		+ '{#if $T.trid=="0"}<input type="hidden" id="treatmentId" value="{$T.liBM[0].tid}" />{#/if}';

var patientInfoForDoctorDesk = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
		+ '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
		+ '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
		+ '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
		+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
		+ '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;height:35px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
		+ '<div style="padding-top: 15px" class="col-md-11-1">'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" >Patient Id:</label>'
		+ '<label id="patId" class="col-md-4-1 TextFont">{$T.pi}</label></div>'

		+ '<div class="col-md-4-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont" >Patient Name:</label>'
		+ '<label id="" class="col-md-9-1 TextFont">{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" id ="patno">OPD No:</label>'
		+ '<label id="trCount" class="col-md-8-1 TextFont" >{$T.objTreat.trCount}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont">DOA:</label>'
		+ '<label id="" class="col-md-8-1 TextFont">{$T.objTreat.treStart}&nbsp;{$T.objTreat.int}</label></div>'
		
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont" >Bill Category:</label>'
		+ '<label id="" class="col-md-7-1 TextFont" >{$T.objTreat.billCategory_Name}</label></div>'
		
		+ '</div>'

		+ '<div style="padding-top: 14px; margin-bottom: -10px;" class="col-md-11-1">'
		+ '<div class="col-md-4-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" style="margin-top: -4px;" id = "consultLabel">Consulting Doct:</label>'
		+ '{#if $T.trid!="0"}<label class="col-md-8-1 TextFont" id="nameh" style="margin-top: -4px;">{$T.objDoc.dn}</label></div>{#/if}'
		+ '{#if $T.trid=="0"}<label class="col-md-8-1 TextFont" style="margin-top: -4px;">{$T.liBM[0].consFollowup}</label></div>{#/if}'

		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-2-1 TextFont" style="margin-top: -4px;" class="col-md-3-1 TextFont">Age:</label>'
		+ '<label id="" class="col-md-10-1 TextFont" style="margin-top: -4px;">{$T.ag}&nbsp(YY)&nbsp{$T.month}&nbsp(MM)&nbsp{$T.days}&nbsp(DD)</label></div>'
		
		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" style="margin-top: -4px;" >H / W / G:</label>'
		+ '<label id="HtWtSx" class="col-md-8-1 TextFont" style="margin-top: -4px;">{$T.height}Cm  / {$T.wt}Kg / {$T.sx}</label></div>'
		
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" style="margin-top: -4px;" >Corporate:</label>'
		+ '<input type="hidden" id="patGender" value="{$T.sx}" /><input id="patientDOB" type="hidden" value="{$T.db}"/>'
		+ '<label id="" class="col-md-4-1 TextFont" style="margin-top: -4px;" > </label></div>'
		+ '</div></div></form></div></div></div>'
		+ '{#if $T.trid!="0"}<input type="hidden" id="treatmentId" value="{$T.trid}" />{#/if}'
		+ '{#if $T.trid=="0"}<input type="hidden" id="treatmentId" value="{$T.liBM[0].tid}" />{#/if}';

var patientInfoForPreviousOPDTreatment = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
		+ '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
		+ '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
		+ '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
		+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
		+ '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
		+ '<div style="padding-top: 15px" class="col-md-11-1">'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" >Patient Id:</label>'
		+ '<label id="patId" class="col-md-4-1 TextFont">{$T.pi}</label></div>'

		+ '<div class="col-md-4-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont">Patient Name:</label>'
		+ '<label id="" class="col-md-9-1 TextFont">{$T.tit}{$T.fn}&nbsp;&nbsp;{$T.mn}&nbsp;&nbsp;{$T.ln}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" id ="patno">OPD No:</label>'
		+ '<label id="trCount" class="col-md-7-1 TextFont">{$T.liBM[0].bt}</label></div>'

		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont">DOA:</label>'
		+ '<label id="" class="col-md-8-1 TextFont">{$T.objTreat.treStart}&nbsp;{$T.objTreat.int}</label></div>'
		
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont" >Bill Category:</label>'
		+ '<label id="" class="col-md-7-1 TextFont" >{$T.objTreat.billCategory_Name}</label></div>'
		+ '</div>'

		+ '<div style="padding-top: 14px; margin-bottom: -10px;" class="col-md-11-1">'
		+ '<div class="col-md-4-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" style="margin-top: -4px;">Consulting Doct:</label>'
		+ '<label class="col-md-8-1 TextFont" style="margin-top: -4px;">{$T.liBM[0].consFollowup}</label></div>'

		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-2-1 TextFont" style="margin-top: -4px;" class="col-md-4-1 TextFont">Age:</label>'
		+ '<label id="" class="col-md-10-1 TextFont" style="margin-top: -4px;">{$T.ag}&nbsp(YY)&nbsp{$T.month}&nbsp(MM)&nbsp{$T.days}&nbsp(DD)</label></div>'
		
		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" style="margin-top: -4px;" for="exampleInputEmail1">H / W / G:</label>'
		+ '<label id="HtWtSx" class="col-md-8-1 TextFont" style="margin-top: -4px;">{$T.height}Cm / {$T.wt}Kg / {$T.sx}</label></div>'
		
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" style="margin-top: -4px;">Corporate:</label>'
		+ '<label id="" class="col-md-4-1 TextFont"> </label></div>'
		+ '<input type="hidden" id="patGender" value="{$T.sx}" /><input id="patientDOB" type="hidden" value="{$T.db}"/>'
		+ '</div></div></form></div></div></div>'
		+ '<input type="hidden" id="treatmentId" value="{$T.trid}" />';

var patientInfoIPD = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
		+ '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
		+ '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
		+ '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
		+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
		+ '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
		+ '<div style="padding-top: 15px" class="col-md-11-1"><div class="col-md-2-1">'
		+ '<div class="divide-10"></div><label class="col-md-4-1 TextFont" for="exampleInputEmail1">Rec No:</label>'
		+ '<label id="" class="col-md-4-1 TextFont" for="exampleInputEmail1"></label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Patient Id:</label>'
		+ '<label id="" for="exampleInputEmail1"	class="col-md-4-1 TextFont">{$T.pi}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont" for="exampleInputEmail1">Patient Name:</label>'
		+ '<label id="" for="exampleInputEmail1"	class="col-md-4-1 TextFont">{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label>'
		+ '</div><div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">IPD No:</label>'
		+ '<label id="trCount" for="exampleInputEmail1"	class="col-md-4-1 TextFont">{$T.objTreat.trCount}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1" class="col-md-4-1 TextFont">Age:</label>'
		+ '<label id="" class="col-md-4-1 TextFont"	for="exampleInputEmail1">{$T.ag}&nbsp(YY)&nbsp{$T.month}&nbsp(MM)&nbsp{$T.days}&nbsp(DD)</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Gender:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont">{$T.sx}</label></div></div>'
		+ '<div style="padding-top: 14px; margin-bottom: -10px;"	class="col-md-11-1"><div class="col-md-2-1">'
		+ '<div class="divide-10"></div>'
		+ '<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Consulting Doct:</label>'
		+ '<label id="" for="exampleInputEmail1"	class="col-md-12-1 TextFont">{$T.objDoc.dn}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Registered Date:</label>'
		+ '<label id="" for="exampleInputEmail1"	class="col-md-4-1 TextFont">{$T.rgDt}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont" for="exampleInputEmail1" class="col-md-4-1 TextFont">DOA</label>'
		+ '<label id=""	for="exampleInputEmail1"></label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">DOD:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont"></label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1" class="col-md-4-1 TextFont">Corporate:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont"> </label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Weight:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-4-1 TextFont">{$T.wt}&nbsp;&nbsp;Kg</label>'
		+ '</div></div></div></form></div></div></div><input type="hidden" id="treatmentId" value="{$T.trid}"><input id="patientDOB" type="hidden" value="{$T.db}"/>';

var patientInfoIPDWithoutTreatmentID = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
		+ '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
		+ '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
		+ '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
		+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
		+ '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
		+ '<div style="padding-top: 15px" class="col-md-11-1"><div class="col-md-4-1">'
		+ '<div class="divide-10"></div><label class="col-md-4-1 TextFont" >Consulting Doctor:</label>'
		+ '<label id="consultDoc" class="col-md-8-1 TextFont"></label></div>'
		+ '<div class="col-md-4-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont">Patient Name:</label>'
		+ '<label id="" class="col-md-7-1 TextFont" style="margin-left: 10px;">{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label></div>'
		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont">Registered Date:</label>'
		+ '<label id="" class="col-md-6-1 TextFont">{$T.rgDt}</label></div>'
		+ '<div class="col-md-1-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont">Weight:</label>'
		+ '<label id="" class="col-md-6-1 TextFont" style="margin-left: 5px;">{$T.wt}&nbsp;&nbsp;Kg</label></div>'
		+ '</div>'
		+ '<div style="padding-top: 14px; margin-bottom: -10px;" class="col-md-11-1">'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-5-1 TextFont">Patient Id:</label>'
		+ '<label id="patId" class="col-md-7-1 TextFont">{$T.pi}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont">IPD No:</label>'
		+ '<label id="ipdno" class="col-md-7-1 TextFont">{$T.objTreat.trCount}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-2-1 TextFont">Age:</label>'
		+ '<label id="" class="col-md-10-1 TextFont">{$T.ag}&nbsp(YY)&nbsp{$T.month}&nbsp(MM)&nbsp{$T.days}&nbsp(DD)</label></div>'
		+ '<div class="col-md-1-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont">Gender:</label>'
		+ '<label id="" class="col-md-8-1 TextFont" style="padding-left: 15px">{$T.sx}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont">DOA:</label>'
		+ '<label id="treStartDate" class="col-md-9-1 TextFont">{$T.objTreat.treStart}&nbsp;{$T.objTreat.int}</label></div>'
		+ '<div class="col-md-2-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont">DOD:</label>'
		+ '<label id="dateExpectedDischarge" class="col-md-9-1 TextFont">{$T.objTreat.treEnd}&nbsp;{$T.objTreat.out}</label></div>'
		+ '</div>'
		+ '<div style="padding-top: 24px; margin-bottom: -10px;" class="col-md-11-1">'
		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-3-1 TextFont">Refer-By:</label>'
		+ '<label id="" for="exampleInputEmail1" class="col-md-8-1 TextFont">{$T.rb}</label></div>'
		+ '<div class="col-md-5-1"><div class="divide-10"></div>'
		+ '<label class="col-md-2-1 TextFont">Corporate:</label>'
		+ '<label id="sp_name" for="exampleInputEmail1" class="col-md-8-1 TextFont"></label></div>'
		+ '<div class="col-md-3-1"><div class="divide-10"></div>'
		+ '<label class="col-md-4-1 TextFont">Bill Category:</label>'
		+ '<label id="" class="col-md-8-1 TextFont">{$T.objTreat.billCategory_Name}</label></div>'
		+ '</div>'
		+ '<label id="trCount" class="col-md-8-1 TextFont" hidden="hidden">{$T.objTreat.trCount}</label>'
		+ '</div>'
		+ '<input type="hidden" id="patGender" value="{$T.sx}" />'
		+ '<input id="patientDOB" type="hidden" value="{$T.db}"/>'
		+ '</form></div></div></div>';

function calculateBMI() {
	var weight = $("#weight").val();
	var height = $("#height").val();
	if (height == "") {
		$("#BMI").val("");
	}

	var BMI = finalCalculatedBMI(height, weight);
	$("#BMI").val(BMI);

	var BSA = finalCalculatedBSA(height, weight);
	$("#BSA").val(BSA);

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

function finalCalculatedBSA(heightInCm, weightInKg) {

	var BSA = 0;
	BSA = ((Math.sqrt((heightInCm * weightInKg))) / 60);

	if (BSA == "Infinity")
		BSA = 0;

	if (isNaN(BSA))
		BSA = 0;

	return (BSA.toFixed(2));

}

function saveBMIFromDoctorDesk() {

	// start: code for finalAgeInMonths
	//var patientObj = $("#PreTre").html();
	//var patJsObj = eval('(' + patientObj + ')');

	var dob = $("#dbirth").val(); // added by sagar
	
//	alert("dob"+dob);
	if ((dob == "") || (dob == "undefined")) {
		alert("Please save DOB first...");
		var booleanFlag = confirm("Do you wish to go to patient edit page?");
		if (booleanFlag) {
			window.location.href = "ehat_reg.jsp?bmiPatID="
					+ ($("#pt_Id").val());
		}

		return false;
	}

	// ageString = Y___M___D
	var ageString = getAgeYMD(dob);

	var finalAgeInMonths = 0.00;
	finalAgeInMonths = getAgeInMonths(ageString);
//alert("age in months-"+finalAgeInMonths);
	var pid = $("#pt_Id").val(); //added by sagar
	var tid = $("#tid").val(); //added by sagar
	//var trcount = $("#trCount").html();
	var trcount = $("#trcountBMI").val();    //added by sagar -static
	var weight = ($("#weight").val()).trim();
	var height = ($("#height").val()).trim();
	var HCIM = ($("#HCIM").val()).trim();
	var BMIDate = ($("#BMIDate").val()).trim();
	var patBMI_BSA_ID = ($("#patBMI_BSA_ID").val()).trim();

	if (HCIM == "") {
		HCIM = "0.0";
	}

	// validation----@author---husen
	var pattern = /^[0-9]+\.?[0-9]*$/;

	if (weight == "" || weight == null || weight == undefined) {
		alert("Please enter patient weight.");
		$("#weight").focus();
		return false;
	}

	if (!pattern.test(weight)) {
		alert("Weight should be of digits or a decimal point Only.");
		$("#weight").focus();
		return false;
	}

	if (height == "" || height == null || weight == undefined) {
		alert("Please enter patient weight.");
		$("#height").focus();
		return false;
	}

	if (!pattern.test(height)) {
		alert("Height should be of digits or a decimal point Only!");
		$("#height").focus();
		return false;
	}

	var BMI = finalCalculatedBMI(height, weight);

	var BSA = finalCalculatedBSA(height, weight);
	
	var inputs = [];
	inputs.push('action=saveBMIFromDoctorDesk');
	inputs.push('pid=' + pid);
	inputs.push('tid=' + tid);
	inputs.push('trcount=' + encodeURIComponent(trcount));
	inputs.push('weight=' + encodeURIComponent(weight));
	inputs.push('height=' + encodeURIComponent(height));
	inputs.push('patBMI_BSA_ID=' + encodeURIComponent(patBMI_BSA_ID));
	inputs.push('BMI=' + encodeURIComponent(BMI));
	inputs.push('BSA=' + encodeURIComponent(BSA));
	inputs.push('HCIM=' + encodeURIComponent(HCIM));
	inputs.push('BMIDate=' + encodeURIComponent(BMIDate));
	inputs.push('finalAgeInMonths=' + encodeURIComponent(finalAgeInMonths));
	inputs.push('Callfrom=saveFun');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			var jsObj = eval('(' + ajaxResponse + ')');

			if ((jsObj.msg.split("___")[0]) == "1") {
				// msg: saved successfully
				alert((jsObj.msg.split("___")[1]));

				var myObj = (jsObj.pl[0]);
				var parsedObj = JSON.stringify(myObj);
				$("#PreTre").html(parsedObj);

				setTimeout(function() {
					setPatientInfo(pid, "DoctorDesk");
				}, 500);

			} else if ((jsObj.msg.split("___")[0]) == "0") {
				// msg: error while saving bmi
				alert((jsObj.msg.split("___")[1]));
			}

			viewBMIDetailsFromDoctorDesk("afterLoad");

			// $("#iSubObj").removeClass('active');
			// $("#iSubObj").tab('show');
			// window.location.href = "OPDDoctorsDeskDashboard.jsp";
		}
	});

}

var bmiCount = 1;
var PatientBMIInfo = "{#foreach $T.lsPatientBmi as lsPatientBmi}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center'>{bmiCount}</td>"
		+ "<td class='col-sm-2-1 center'>{$T.lsPatientBmi.patient_treat_count}</td>"
		+ "<td class='col-sm-1-1 center'>{$T.lsPatientBmi.patient_weight}</td>"
		+ "<td class='col-sm-1-1 center'>{$T.lsPatientBmi.patient_height}</td>"
		+ "<td class='col-sm-1-1 center'>{$T.lsPatientBmi.patient_bmi}</td>"
		+ "<td class='col-sm-1-1 center'>{$T.lsPatientBmi.patient_bsa}</td>"
		+ "<td class='col-sm-1-1 center'>{$T.lsPatientBmi.patient_headcim}</td>"
		+ "<td class='col-sm-1-1 center'>{$T.lsPatientBmi.date}</td>"
		+ "<td class='col-sm-1-1 center'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' onclick=editBMIBSA({bmiCount++}) disabled='disabled'> <i class='fa fa-edit'></i> </button>"
		+ "</td>"
		// + "<input type='checkbox' name='BMIBSACheckbox'
		// value='{$T.lsPatientBmi.patient_bmi_id}' style='float: right;'
		// /></td>"
		+ "</tr>" + "{#/for}";

/** *******************************viewBMIFromDoctorDesk**************************************** */

// loadParam = onload || onclick
function viewBMIDetailsFromDoctorDesk(loadParam) {
	//alert("in bmi");
	var todays_date = $("#todays_date").val();
    var arrDate = todays_date.split("-");
    var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
//    alert("date "+date);
    $("#BMIDate").val(date);
	var pid = $("#pt_Id").val();
	$("#pdob").text($("#dbirth").val()); //set dob on modal pop up for BMI
	//alert("hi dob-"+$("#dbirth").val());
	//alert(pid);
	//var pid =  $("#pid").val();
	//alert("iin view bmi"+pid);
	//alert("in bmi pid-" +pid);
	var inputs = [];
	inputs.push('action=saveBMIFromDoctorDesk');
	inputs.push('pid=' + pid);
	inputs.push('Callfrom=fetchFun');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			console.log(r);
			var objbmi = JSON.parse(r);
			$("#PatientBMIInfoTableAjaxResp").html(ajaxResponse);

			// refresh bmi bsa fields.
			refreshBMIBSA();
			

			// if (loadParam != "onload") {
			if (objbmi.lsPatientBmi.length > 0) {
				bmiCount = 1;
				$("#trcountBMI").val(objbmi.lsPatientBmi[0].patient_treat_count);
				$("#PatientBMIInfoTable").setTemplate(PatientBMIInfo);
				$("#PatientBMIInfoTable").processTemplate(objbmi);
			}/*
				 * else { $('#ViewBMIDetailsPopup').removeClass('fade');
				 * $('#ViewBMIDetailsPopup').modal('hide'); alert("No Record
				 * Found...!"); }
				 */
			// }
			
			setTimeout(function(){userAccess();},100);
		}
	});

}

function refreshBMIBSA() {
	$("#patBMI_BSA_ID").val("0");
	$("#weight").val("");
	$("#height").val("");
	$("#HCIM").val("");
	$("#BMI").val("0");
	$("#BSA").val("0");
	var pdob= $("#patientDOB").val();
	$("#pdob").html(pdob);
}

function editBMIBSA(bmiCountTemp) {

	(bmiCountTemp = bmiCountTemp - 1);

	var ajaxResponse = $("#PatientBMIInfoTableAjaxResp").html();
	var objBMIBSA = JSON.parse(ajaxResponse);

	objBMIBSA = objBMIBSA.lsPatientBmi[bmiCountTemp];

	$("#patBMI_BSA_ID").val(objBMIBSA.patient_bmi_id);
	$("#weight").val(objBMIBSA.patient_weight);
	$("#height").val(objBMIBSA.patient_height);
	$("#HCIM").val(objBMIBSA.patient_headcim);
	$("#BMI").val(objBMIBSA.patient_bmi);
	$("#BSA").val(objBMIBSA.patient_bsa);
	$("#BMIDate").val(objBMIBSA.date);

}


function editBMIBSA2(bmiCountTemp) {
 	$("#weight").val($("#weight1").val());
	$("#height").val($("#height1").val());
	 
}



function fetchSymptomsonRMO(specializationId) {

	if (specializationId == "" || specializationId == undefined) {
		specializationId = 1;
	}

	var inputs = [];
	inputs.push('action=fetchAllSym');
	inputs.push('did=' + specializationId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');
			// $("#objsym").html(ajaxResponse);
			count = 1;
			// $("#queryType").val('Update Now');
			// $("#symp").setTemplate(fetchSymptomsTemp);
			// $("#symp").processTemplate(obj);
			for ( var i = 0; i < obj.sml.length; i++) {
				var o = new Option("option text", "value");
				$(o).html(obj.sml[i].sn);
				$(o).val(obj.sml[i].idsym);
				$("#symp").append(o);
			}
		}
	});
}
function setPatientInfoForPreviousTreatment(pid, type, callfrom) {
	if (type == "PreviousOPDTreatment") {
		var patientObj = $("#PreTre").html();
		var pobj1 = eval('(' + patientObj + ')');
		$("#commonPatInfo").setTemplate(patientInfoForPreviousOPDTreatment);
		$("#commonPatInfo").processTemplate(pobj1);
		if (callfrom == "diag") {
			$("#patno").html("DIAG No.");
		}
	}
}

function setPatientInfo(pid, type, callfrom) {
	if (type != "DoctorDesk") {

		var inputs = [];
		inputs.push('action=fetchPatientInfo');
		inputs.push('pid=' + pid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				var ajaxResponse = r;
				var pobj1 = eval('(' + ajaxResponse + ')');
				if (type == "bill") {
					$("#patInfo").val(ajaxResponse);
				}
				if (type == "ipd") {
					// "Previous Treatment for IPDs"
					$("#commonPatInfo").setTemplate(patientInfoIPDWithoutTreatmentID);
					var name = "";
					if(pobj1.sdiscNm != ""){
						name = pobj1.sdiscNm +" ("+pobj1.objTreat.cmpny+")"; 
					}else{
						name = "";
					}
					setTimeout(function(){$("#sp_name").html(name);},100);
				} else {
					$("#commonPatInfo").setTemplate(patientInfoIPD);
				}

				$("#commonPatInfo").processTemplate(pobj1);
				if(pobj1.IPDDoctorList.length > 0){
					var docCount = pobj1.IPDDoctorList.length;
				}			
				var consultdoc = pobj1.objDoc.dn;
				
				if(docCount > 1){
					var title = "";
					for ( var i = 0; i < pobj1.IPDDoctorList.length; i++) {
						var docname = pobj1.IPDDoctorList[i].docName + " -- " + pobj1.IPDDoctorList[i].department;
						if(i != (pobj1.IPDDoctorList.length - 1)){
							//docname = docname + ",";
						}
						title = title + " " + docname;
					}
					consultdoc = consultdoc +"  "+ '<a href="#" style="color:red;" data-toggle="tooltip" data-placement="bottom" title="'+title+'"><i class = "fa fa-plus-circle"></i></a>';
					$("#consultDoc").html(consultdoc);
				}else{
					$("#consultDoc").html(consultdoc);
				}
			}
		});
	} else if (type == "DoctorDesk") {
		var patientObj = $("#PreTre").html();
		var pobj1 = eval('(' + patientObj + ')');
		if(pobj1.EpisdeVisitList!=null){
		$('#trid').val(pobj1.trid);
		}
		if(pobj1.PatientOPDList!=null){
			$('#patientOPDId').val(pobj1.PatientOPDList[0].patientOpdId);
			$('#doctorId').val(pobj1.PatientOPDList[0].doctor_id);
		}
		$("#commonPatInfo").setTemplate(patientInfoForDoctorDesk);
		$("#commonPatInfo").processTemplate(pobj1);
		if (callfrom == "diag") {
			$("#patno").html("DIAG No.");
			$("#consultLabel").html("Reference Doct:");
		} else {
			if ((pobj1.db).trim() == "") {
				$("#patientDOB").html("not saved");
			} else {
				$("#patientDOB").html(pobj1.db);
			}
		}
	} else {
		var patientObj = $("#PreTre").html();
		var pobj1 = eval('(' + patientObj + ')');
		$("#commonPatInfo").setTemplate(patientInfo);
		$("#commonPatInfo").processTemplate(pobj1);
		if (callfrom == "diag") {
			$("#patno").html("DIAG No.");
		}
	}
}

function setPatientInfoPrevDischareSummary(type) {
	if (type == "Previous_Discharge_Summary") {
		/*var patientObj = $("#PreTre").html();
		var pobj1 = eval('(' + patientObj + ')');
		$("#commonPatInfo").setTemplate(patientInfoIPDWithoutTreatmentID);
		$("#commonPatInfo").processTemplate(pobj1);
		
//		var docCount = pobj1.IPDDoctorList.length;
		var consultdoc = pobj1.objDoc.dn;
		
		if(docCount > 1){
			var title = "";
			for ( var i = 0; i < pobj1.IPDDoctorList.length; i++) {
				var docname = pobj1.IPDDoctorList[i].docName + " -- " + pobj1.IPDDoctorList[i].department;
				if(i != (pobj1.IPDDoctorList.length - 1)){
					//docname = docname + ",";
				}
				title = title + " " + docname;
			}
			consultdoc = consultdoc +"  "+ '<a href="#" style="color:red;" data-toggle="tooltip" data-placement="bottom" title="'+title+'"><i class = "fa fa-plus-circle"></i></a>';
			$("#consultDoc").html(consultdoc);
		}else{
			$("#consultDoc").html(consultdoc);
		}*/
	}
}

function callloadPatientTests(datepick) {
	loadTests();
}
/** ************show Topic list****************** */

var fetchTopicTemp = "{#foreach $T.skmli as skmli}<option value={$T.skmli.idskm}>{$T.skmli.knm}</option>{#/for}";

function fetchTopicNm(pageName) {

	var inputs = [];
	inputs.push('action=fetchAllSK');
	inputs.push('pageName=' + pageName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');
			$("#selTopicName").setTemplate(fetchTopicTemp);
			$("#selTopicName").processTemplate(obj);
		}
	});
}

/** ************show previous treatment list****************** */

function hideShowPreTreatment(pid, divid) {
	$("#imgupdown" + divid).attr('src', "images/up.png");

	var prediv = $("#patPreTreat" + divid);
	if (prediv.length == 0) {
		divId = "div" + divid;
		var temp = '<div id="patPreTreat'
				+ divid
				+ '" style="width: 98%;padding-left:0px;" ><div style="width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;"><div style="width: 100%;">	<div		style="width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;">#</div>	<div		style="width: 33%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Patient		Name</div>	<div		style="width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Patient		ID</div>	<div		style="width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Treatment		ID</div>	<div		style="width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Treatment		Date</div>	<div		style="width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">View</div></div></div><div style="width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;" id="preTrecontainer'
				+ divid + '"></div></div>';
		$(temp).insertAfter($('#' + divId));
		setDefaultRMOTreatment(pid, divid);
	} else {
		$("#imgupdown" + divid).attr('src', "images/down.png");
		$('#patPreTreat' + divid).remove();
	}
}
/** *******************End previous treatment************************** */
/** *********Create Division for Prescription*************** */
function createDivPriscription() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	var Medicine = $("#Medicine" + rowCount + "").val();
	var Days = $("#Days" + rowCount + "").val();
	var Qty = $("#Qty" + rowCount + "").val();

	if (Medicine == "" && Days == "" && Qty == "") {
		alert("Please fill the Previously added row");
		return false;
	}
	rowCount++;

	divId = "prescription" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 100%; ');
	document.getElementById("divPrescription").appendChild(x);
	document.getElementById(divId).innerHTML = '<td style="height: 21.5px;" class="col-md-1-1 center"><div	class="TextFont">'
			+ (rowCount)
			+ '</div></td><td style="height: 21.5px;" class="col-md-3-1 center"><div class="TextFont"><input type="text" style="width: 100%" id="Medicine'
			+ (rowCount)
			+ '"class="auto" /></script></div></td><td style="height: 21.5px;"class="numeric col-md-1-1 center"><div	class="TextFont"><input type="checkbox" id="M'
			+ (rowCount)
			+ '"	onclick="calQtyOfPrecription('
			+ (rowCount)
			+ ')" /></div></td><td style="height: 21.5px;"	class="numeric col-md-1-1 center"><div class="TextFont"><input type="checkbox" id="A'
			+ (rowCount)
			+ '"onclick="calQtyOfPrecription('
			+ (rowCount)
			+ ')" /></div></td><td style="height: 21.5px;" class="numeric col-md-1-1 center"><div	class="TextFont"><input type="checkbox" id="E'
			+ (rowCount)
			+ '"	onclick="calQtyOfPrecription('
			+ (rowCount)
			+ ')" /></div></td><td style="height: 21.5px;"class="numeric col-md-1-1 center"><div	class="TextFont"><input type="checkbox" id="N'
			+ (rowCount)
			+ '"	onclick="calQtyOfPrecription('
			+ (rowCount)
			+ ')" /></div></td><td style="height: 21.5px;"	class="numeric col-md-2-1 center"><div	class="TextFont">	<input type="text" style="width: 100%"	id="Instruction'
			+ (rowCount)
			+ '" /></div></td><td style="height: 21.5px;"	class="numeric col-md-1-1 center"><div	class="TextFont"><input type="text" style="width: 100%"	onkeypress="return validateNumbers(event)" id="Days'
			+ (rowCount)
			+ '"	onkeyup="calQtyOfPrecriptionDoctorDesk('
			+ (rowCount)
			+ ');" /></div></td><td style="height: 21.5px;"class="numeric col-md-1-1 center"><div	class="TextFont"><input type="text" style="width: 100%" id="Qty'
			+ (rowCount)
			+ '" /></div></td>	<td style="height: 21.5px; width: 2px;"><input type="checkbox" name="checkbox'
			+ (rowCount)
			+ '" id="checkbox" /></td><input type="hidden" value='
			+ (rowCount) + 'id=' + (rowCount) + ' name=' + (rowCount) + ' />';
	
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

	var medCount = $('#RowCount').val();

	$(("#Medicine" + medCount)).autocomplete({
		source : function(request, response) {
			var findingName = $(("#Medicine" + medCount)).val();
			// var autoType = 'c';
			var auto = 'medicine';
			// var data = 'casualty';
			var inputs = [];
			inputs.push('auto=' + auto);
			inputs.push('q=' + findingName);
			// inputs.push('autoType=' + autoType);
			// inputs.push('data=' + data);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					response(availableTags);
				}
			});
		}
	});
}
/** *********Create Division for Prescription*************** */
function createDivPriscriptionOPD() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	var Medicine = $("#Medicine" + rowCount + "").val();
	var Days = $("#txtDays" + rowCount + "").val();
	var Qty = $("#txtQty" + rowCount + "").val();

	if (Medicine == "" && Days == "" && Qty == "") {
		alert("Please fill the Previously added row");
		return false;
	}

	rowCount++;

	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 100%; ');
	document.getElementById("divPrescription").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; border: 1px solid #b8b8b8; border-top: none;" id="prescription'
			+ (rowCount)
			+ '" ><div    style="width: 4.8%; text-align: center; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 22px;">'
			+ (rowCount)
			+ '</div><div style="width: 30%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="text" style="width: 100%" class="auto" id="Medicine'
			+ rowCount
			+ '"></div><div    style="width: 5.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="checkbox" id="M'
			+ rowCount
			+ '" onclick="calQtyOfPrecriptionDoctorDesk('
			+ rowCount
			+ ')" /></div><div style="width: 5.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"    align="center"> <input type="checkbox" id="A'
			+ rowCount
			+ '" onclick="calQtyOfPrecriptionDoctorDesk('
			+ rowCount
			+ ')"  /></div><div style="width: 4.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="checkbox" id="E'
			+ rowCount
			+ '" onclick="calQtyOfPrecriptionDoctorDesk('
			+ rowCount
			+ ')" /></div><div style="width: 4.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="checkbox" id="N'
			+ rowCount
			+ '" onclick="calQtyOfPrecriptionDoctorDesk('
			+ rowCount
			+ ')" /></div><div style="width: 18.3%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="text" style="width: 100%" id="Instruction'
			+ rowCount
			+ '"> </div><div style="width: 5.2%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center">    <input type="text" style="width: 100%" onkeypress="return validateNumbers(event)" onkeyup="calQtyOfPrecriptionDoctorDesk('
			+ rowCount
			+ ')"  id="Days'
			+ rowCount
			+ '"></div> <div style="width: 4%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="text" style="width: 100%"  onkeypress="return validateNumbers(event)" id="Qty'
			+ rowCount
			+ '"></div>  <div style="padding-top: 4px; height: 22px;" align="center"><input type="checkbox" name="checkbox'
			+ rowCount + '" /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
	$("#strength").val("");
	$("#dose").val("");
	$("#frequency").val("");
	$("#days").val("");
	$("#qty").val("");
	$(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");

}

function calQtyOfPrecriptionDoctorDesk(count) {

	var temp = 0;
	if ($('#M' + count).attr('checked')) {
		++temp;
	}
	if ($('#A' + count).attr('checked')) {
		++temp;
	}
	if ($('#E' + count).attr('checked')) {
		++temp;
	}
	if ($('#N' + count).attr('checked')) {
		++temp;
	}
	var days = $("#Days" + count).val();
	var qty = days * temp;
	$("#Qty" + count).val(qty);

}

/** **************Remove Prescription Division********************** */
function removeDivPriscription(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	// alert(rowCount);
	var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {

		var $radios = $('input:checkbox[name=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#prescription" + n).remove();
		}
	}
	// window.location = "OPDDoctorsDesk2.jsp";
	// window.reload();
}

/** *******************End Prescription Details***************** */
/** *********START RMO Treatment Update************ */

var searchTemp = "<div style='width: 10%;'>Search By:</div>									<div style='width: 8%;'>Patient Name</div>									<div style='width: 12%; padding-left: 2%;'>										<input											style='width: 100%; '											name='byName' type='text' id='byName'	onchange='setSplitId()' class='auto'											onkeypress='return validatealphabetic(event)' />									</div>									<div style='width: 2%; padding-left: 4%;'>or</div>									<div style='width: 7%; padding-left: 2%;'>										<span style='width: 3%;'>Patient ID</span>									</div>									<div style='width: 12%;'>										<input											style='width: 100%; '											name='byId' type='text' id='byId'											onkeypress='return validateNumbers(event)' />									</div>									<div style='width: 12%; text-align: center;'>										<input type='button' value='Search'  class='edit'											onclick=disppatientPreSearch('doc') />									</div>															<div id=' ' style='width: 25%'>									<div style='width: 20px;'>										<input type='radio' name='RadioGroup' value='doctor'											id='doctor' checked='checked'											onclick='viewPrevDocDeskDistinctPatient()' />									</div>									<div style='width: 50px; padding-left: 10px;'>DOCTOR</div>									<div style='width: 20px; padding-left: 10px;'>										<input type='radio' name='RadioGroup' value='rmo' id='rmo'											onclick='setDefaultDistinctRMOTreatment()' />									</div>									<div style='width: 120px; padding-left: 10px;'>RMO</div>								</div>";

var searchRmoTemp = "<div style='width: 10%;'>Search By:</div>									<div style='width: 8%;'>Patient Name</div>									<div style='width: 12%; padding-left: 2%;'>										<input											style='width: 100%;'											name='byName' type='text' id='byName'											onkeypress='return validatealphabetic(event)' />									</div>									<div style='width: 2%; padding-left: 4%;'>or</div>									<div style='width: 7%; padding-left: 2%;'>										<span style='width: 3%;'>Patient ID</span>									</div>									<div style='width: 12%;'>										<input											style='width: 100%; '											name='byId' type='text' id='byId'											onkeypress='return validateNumbers(event)' />									</div>									<div style='width: 12%; text-align: center;'>										<input type='button' value='Search'  class='edit'											onclick=disppatientPreSearch('rmo') />									</div>															<div id=' ' style='width: 25%'>									<div style='width: 20px;'>										<input type='radio' name='RadioGroup' value='doctor'											id='doctor' 											onclick='viewPrevDocDeskDistinctPatient()' />									</div>									<div style='width: 50px; padding-left: 10px;'>DOCTOR</div>									<div style='width: 20px; padding-left: 10px;'>										<input type='radio' name='RadioGroup' value='rmo' id='rmo'				checked='checked'							onclick='setDefaultDistinctRMOTreatment()' />									</div>									<div style='width: 120px; padding-left: 10px;'>RMO</div>								</div>";

function setSearchRmoTemp() {
	var sample;
	$("#search").setTemplate(searchRmoTemp);
	$("#search").processTemplate(sample);
}

function setSearchTemp() {
	var sample;
	$("#search").setTemplate(searchTemp);
	$("#search").processTemplate(sample);
	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=prevoiusTreatmentPatient");
}

function disppatientPreSearch(srchType) {

	count = 1;

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var byTreatId = $("#byTreatId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("please enter Patient Name or ID for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		} else {
			searchBy = "byTreatId";
			value = byTreatId;
		}

		var inputs = [];
		inputs.push('action=searchDefaultRMOTreatment');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('srchType=' + srchType);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
			
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Patient Details Not Found");
				} else {
					if (srchType == "doc") {
						$("#container").setTemplate(
								viewPrevDocDeskPatientDistinctTemp);
					} else {
						$("#container").setTemplate(rmoPrevTretemplate);
					}
					$("#container").processTemplate(patientBean);
					// window.reload();
				}
			}
		});
	}
};

/** *********START RMO Treatment Update************ */

function setDefaultRMOTreatment(pid, divid) {
	setSearchRmoTemp();
	count = 1;
	var inputs = [];
	inputs.push('action=fetchDefaultRMOTreatment');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
	
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#preTrecontainer" + divid).setTemplate(rmoPrevTretemplateshow);
			$("#preTrecontainer" + divid).processTemplate(pobj1);
		}
	});
}

function setDefaultDistinctRMOTreatment() {
	setSearchRmoTemp();
	count = 1;
	var inputs = [];
	inputs.push('action=fetchDistinctRMOTreatment');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
		
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(rmoPrevTretemplate);
			$("#container").processTemplate(pobj1);
		}
	});
}
function viewRmoPrevTr(drRowId, trId, patId) {

	var inputs = [];
	inputs.push('action=fetchPatRMOTreatment');
	inputs.push('drRowId=' + drRowId);
	inputs.push('trId=' + trId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
		
			pobj1 = eval('(' + ajaxResponse + ')');
			pobjpretre = pobj1.pl[0];
			window.location.href = "RMOPrevTer.jsp?myObj=" + ajaxResponse
					+ "&pid=" + patId;
			// pobj1 = eval('(' + ajaxResponse + ')');
			// $("#container").setTemplate(rmoPrevTretemplate);
			// $("#container").processTemplate(pobj1);
		}
	});

}

function loadRMOPrevTre() {

	var myObj = $("#divMyObj").html();

	myObj = JSON.parse(myObj);
	$("#patName").html(myObj.pl[0].fn + " " + myObj.pl[0].ln);
	$("#patID").html(myObj.pl[0].pi);

	$("#Symptoms").html(myObj.pl[0].otd.ps);
	$("#ClinicalFinding").html(myObj.pl[0].otd.cf);
	$("#Investigations").html(myObj.pl[0].otd.si);

	$("#riskFactor").html(myObj.pl[0].otd.rf);
	$("#complications").html(myObj.pl[0].otd.cm);

	$("#rowID").val(myObj.pl[0].otd.id);

	// $("#test").setTemplate(rmoPrevTreTestTemplate);
	// $("#test").processTemplate(myObj);
	var prescription = myObj.pl[0].otd.rpre;

	if (prescription == undefined) {
	} else {
		var prescr = prescription.split("@");
		for ( var i = 1; i < prescr.length; i++) {
			if (i != (prescr.length - 1)) {
				createDivPriscription();
			}
			var med = prescr[i].split("-");
			/*
			 * $("#Medicine" + i).val(med[0]); if (med[1] == 1) { $('input[id=M' +
			 * i + ']').attr('checked', true); } if (med[2] == 1) {
			 * $('input[id=A' + i + ']').attr('checked', true); } if (med[3] ==
			 * 1) { $('input[id=E' + i + ']').attr('checked', true); } if
			 * (med[4] == 1) { $('input[id=N' + i + ']').attr('checked', true); }
			 * 
			 * $("#Instruction" + i).val(med[5]); $("#Days" + i).val(med[6]);
			 * $("#Qty" + i).val(med[7]);
			 */

			var medicineName = "";
			for ( var k = 0; k < med.length - 7; k++) {
				if (k == 0) {
					medicineName = med[k];
				} else {
					medicineName = "" + medicineName + "-" + med[k];
				}
			}
			$("#Medicine" + i).val(medicineName);
			if (med[med.length - 7] == 1) {
				$('input[id=M' + i + ']').attr('checked', true);
			}
			if (med[med.length - 6] == 1) {
				$('input[id=A' + i + ']').attr('checked', true);
			}
			if (med[med.length - 5] == 1) {
				$('input[id=E' + i + ']').attr('checked', true);
			}
			if (med[med.length - 4] == 1) {
				$('input[id=N' + i + ']').attr('checked', true);
			}
			$("#Instruction" + i).val(med[med.length - 3]);
			$("#Days" + i).val(med[med.length - 2]);
			$("#Qty" + i).val(med[med.length - 1]);
		}
	}
	var icdCode = "{#foreach $T.pl[0].otd.icdli as icd}<option value='{$T.icd.icd_code_L}'>{$T.icd.icd_code_L}-{$T.icd.name_L}</option>{#/for}";
	$("#ICDCodeDigno").setTemplate(icdCode);
	$("#ICDCodeDigno").processTemplate(myObj);
	fetchICDTemp();
}

/** *********END RMO Treatment Update************ */
function loadDoctorPretreatment() {

	var PreTreat = $("#PreTre").html();
	pobj = eval('(' + PreTreat + ')');
	myObj = JSON.parse(PreTreat);
	$("#patName").html(myObj.tit + "" + myObj.fn + " " + myObj.ln);
	$("#patID").html(myObj.pi);

	if (pobj.otd.follup == 'DAY') {
		$('input[id=Radio1]').attr('checked', true);
	} else if (pobj.otd.follup == 'WEEK') {
		$('input[id=Radio2]').attr('checked', true);
	} else if (pobj.otd.follup == 'MONTH') {
		$('input[id=Radio3]').attr('checked', true);
	}

	$("#noOf").val(pobj.otd.noof);
	getInstruction();
	var prescription = pobj.otd.pre;
	if (prescription == undefined) {
	} else {
		var prescr = prescription.split("@");
		for ( var i = 1; i < prescr.length; i++) {
			if (i != (prescr.length) && i != 1) {
				createDivPriscriptionOPD();
			}
			var med = prescr[i].split("-");
			/*
			 * $("#Medicine" + i).val(med[0]); if (med[1] == 1) { $('input[id=M' +
			 * i + ']').attr('checked', true); } if (med[2] == 1) {
			 * $('input[id=A' + i + ']').attr('checked', true); } if (med[3] ==
			 * 1) { $('input[id=E' + i + ']').attr('checked', true); } if
			 * (med[4] == 1) { $('input[id=N' + i + ']').attr('checked', true); }
			 * 
			 * $("#Instruction" + i).val(med[5]); $("#Days" + i).val(med[6]);
			 * $("#Qty" + i).val(med[7]);
			 */

			var medicineName = "";
			for ( var k = 0; k < med.length - 7; k++) {
				if (k == 0) {
					medicineName = med[k];
				} else {
					medicineName = "" + medicineName + "-" + med[k];
				}
			}
			$("#Medicine" + i).val(medicineName);
			if (med[med.length - 7] == 1) {
				$('input[id=M' + i + ']').attr('checked', true);
			}
			if (med[med.length - 6] == 1) {
				$('input[id=A' + i + ']').attr('checked', true);
			}
			if (med[med.length - 5] == 1) {
				$('input[id=E' + i + ']').attr('checked', true);
			}
			if (med[med.length - 4] == 1) {
				$('input[id=N' + i + ']').attr('checked', true);
			}
			$("#Instruction" + i).val(med[med.length - 3]);
			$("#Days" + i).val(med[med.length - 2]);
			$("#Qty" + i).val(med[med.length - 1]);
		}
	}

	$("#diagnosis").html(pobj.otd.st);
	$("#note").html(pobj.otd.co);
	var icdCode = "{#foreach $T.otd.icdli as icd}<option value='{$T.icd.icd_code_L}'>{$T.icd.icd_code_L}-{$T.icd.name_L}</option>{#/for}";
	$("#ICDCodeDigno").setTemplate(icdCode);
	$("#ICDCodeDigno").processTemplate(pobj);

	fetchICDTemp();

	setTimeout(function() {
		if (pobj.otd.icd != "") {
			var templateid = pobj.otd.icd;
			var temp = templateid.split(",");
			var index = (temp.length) - 1;
			var tempno = temp[index];
			$("#selTempName").val(tempno);
		}
	}, 500);

	$("#FunType").val("update");

	fetchDataItems(myObj.objTreat.ti);

	if (pobj.otd.topic != "") {
		var arrTopic = [];
		arrTopic = pobj.otd.topic.split(",");
		$('[name=selTopicName]').val(arrTopic);
	}

}

function fetchDataItems(tid) {
	var inputs = [];
	inputs.push('action=fetchDoctorTests');
	inputs.push('trid=' + tid);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// 
				},
				success : function(r) {
					ajaxResponse = r;

					var serviceResponse = eval('(' + ajaxResponse + ')');

					for ( var t = 0; t < serviceResponse.dtl[0].cList.length; t++) {
						var appendValue = "";
						var id = "";
						var o = "";

						appendValue = serviceResponse.dtl[0].cList[t].serviceName;
						id = serviceResponse.dtl[0].cList[t].idCasualtyTreatment
								+ "_1\n";
						o = new Option("option text", "value");
						$(o).html(appendValue);
						$(o).val(id);
						$("#txtEquipmetc1").append(o);
					}

					for ( var t = 0; t < serviceResponse.dtl[0].dList.length; t++) {
						var appendValue = "";
						var id = "";
						var o = "";

						appendValue = serviceResponse.dtl[0].dList[t].serviceName;
						id = serviceResponse.dtl[0].dList[t].idDentalTreatment
								+ "_1\n";
						o = new Option("option text", "value");
						$(o).html(appendValue);
						$(o).val(id);
						$("#txtEquipmeti1").append(o);
					}

					for ( var t = 0; t < serviceResponse.dtl[0].rList.length; t++) {
						var appendValue = "";
						var id = "";
						var o = "";

						appendValue = serviceResponse.dtl[0].rList[t].testName;
						id = serviceResponse.dtl[0].rList[t].radiologyTest
								+ "_1\n";
						o = new Option("option text", "value");
						$(o).html(appendValue);
						$(o).val(id);
						$("#txtEquipmetg1").append(o);
					}

					for ( var t = 0; t < serviceResponse.dtl[0].ttList.length; t++) {
						var appendValue = "";
						var id = "";
						var o = "";

						appendValue = serviceResponse.dtl[0].ttList[t].testName;
						id = serviceResponse.dtl[0].ttList[t].id + "_1\n";
						o = new Option("option text", "value");
						$(o).html(appendValue);
						$(o).val(id);
						$("#txtEquipmetb1").append(o);
					}

					for ( var t = 0; t < serviceResponse.dtl[0].pList.length; t++) {
						var appendValue = "";
						var id = "";
						var o = "";

						appendValue = serviceResponse.dtl[0].pList[t].testName;
						id = serviceResponse.dtl[0].pList[t].testId + "_1\n";
						o = new Option("option text", "value");
						$(o).html(appendValue);
						$(o).val(id);
						$("#txtEquipmetp1").append(o);
					}
				}
			});
}

function disprmoDashboard(pageName, searchType) {
	count = 1;

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	if (byName == " ") {
		byName = "";
	}
	if (byId == " ") {
		byId = "";
	}
	var searchBy;
	var value;
	if (searchType == "onload") {
		searchBy = "onload";
		value = "onload";
		var inputs = [];
		inputs.push('action=ShowDocApp');
		inputs.push('pageName=' + pageName);
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
	
				$("#OPDPatientList").html(ajaxResponse);
				Pbean = eval('(' + ajaxResponse + ')');

				var x = Pbean.pl.length;

				if (x == 0 || x == null) {
					// alert("Their Is No Patient Appointment")
				}
				if (pageName == "OPD_RMO_Dashboard") {
					$("#patDetail").html(ajaxResponse);
					$("#container").setTemplate(rmoDashboard);
					$("#container").processTemplate(Pbean);
				} else if (pageName == "OPDDoctorsDeskDashboard") {

					$("#container").setTemplate(patientDocDeskTemp);
					$("#container").processTemplate(Pbean);
				}

			}

		});
	} else if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("please insert something for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=ShowDocApp');
		inputs.push('pageName=' + pageName);
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
			
				Pbean = eval('(' + ajaxResponse + ')');
				if (pageName == "OPD_RMO_Dashboard") {

					$("#container").setTemplate(rmoDashboard);
				} else if (pageName == "OPDDoctorsDeskDashboard") {

					$("#container").setTemplate(patientDocDeskTemp);
				}
				$("#container").processTemplate(Pbean);
			}
		});
	}
};

function viewPatientDetails(Pid, app_date, doc_id, tn, id) {
	// alert(app_date);
	var patDetail = $("#patDetail").html();

	myArray = JSON.parse(patDetail);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == Pid) {

			myObj = myArray.pl[i];
			app_date = myObj.opa.ad;
			doc_id = myObj.opa.di;
			tn = myObj.opa.tn;
			id = myObj.opa.paid;
			appo_type = myObj.opa.pt;
			pname = myObj.tit + " " + myObj.fn + " " + myObj.ln;
			break;
		}
		;
	}
	window.location.href = 'OPD_RMO.jsp?pid=' + Pid + '&appdate=' + app_date
			+ '&doc=' + doc_id + '&id=' + id + '&pname=' + pname + '&patobj='
			+ JSON.stringify(myObj);

}

// ++++++++Load specific Patient tests on OPDInvestigation page++++++++//
function loadPatientTests(pid, datepick) {
	count = 1;
	var inputs = [];
	inputs.push('action=loadPatientTests');
	inputs.push('pid=' + pid);
	inputs.push('datepick=' + datepick);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(ajaxResponse) {
					TestBean = eval('(' + ajaxResponse + ')');

					for ( var t = 0; t < TestBean.trlist.length; t++) {
						if (TestBean.trlist[t].test_report != "null") {
							$(
									"#T" + TestBean.trlist[t].test_ID + "R"
											+ TestBean.trlist[t].test_count)
									.val(TestBean.trlist[t].test_report);
						}
						$(
								"#hiddenT" + TestBean.trlist[t].test_ID + "R"
										+ TestBean.trlist[t].test_count).val(
								TestBean.trlist[t].id);
					}
					if (TestBean.trlist.length == 0) {
						$("#btnSave").val("Save Now");
					} else {
						$("#btnSave").val("Update");
					}

					$("#divAjaxRepo").html(ajaxResponse);
					$("#date-pick").val(TestBean.trlist[0].time);
					var userType = $("#userType").val();
					if (userType == "admin") {
					} else {
						var testIds = $("#divAllTestIds").html();
						var testIdsArr = testIds.split(",");
						for ( var k = 0; k < testIdsArr.length; k++) {
							for ( var i = 1; i <= 9; i++) {
								var b = $("#T" + testIdsArr[k] + "R" + i).val();

								if (b != "") {

									$("#T" + testIdsArr[k] + "R" + i).attr(
											'readonly', 'readonly');
									$("#T" + testIdsArr[k] + "R" + i)
											.attr('style',
													'background-color:lightgray;width: 80%;border-width: 2px');
								}
							}
						}
					}
				}
			});
};

function loadPatientTestsonDoctorDesk(pid, datepick) {
	var inputs = [];
	inputs.push('action=loadPatientTests');
	inputs.push('pid=' + pid);
	inputs.push('datepick=' + datepick);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			
			TestBean = eval('(' + ajaxResponse + ')');
			$('#TestResult').setTemplate(testResultsDOcDesk);
			$("#TestResult").processTemplate(TestBean);
			// $("#divAjaxRepo").html(ajaxResponse);

		}
	});
};
// ++++++++++Function to load all test on doctorDesk1++++++++++++++//

var commonPatInfoTestOnload = "<div style='width: 100%; height: 1%; background-color: #85a7d4;'></div><div style='width: 100%; height: 99%;'><div id='rightContActual'><div	style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 80%;'><div style='width: 100%;'><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Patient ID</div><div id='PatID' style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.pi}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Treatment ID</div><div id='tid' style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.objTreat.ti}</div></div></div><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 30%; padding-top: 1%; font-weight: bold;'>Patient Name</div><div id='fn' style='width: 70%;  padding-top: 1%; color: #002c67;'>{$T.tit} {$T.fn} {$T.ln}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 40%; padding-top: 1%; font-weight: bold;'>Date of Admission</div><div style='width: 60%; padding-top: 1%; color: #002c67;'>{$T.objTreat.treStart}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{$T.objTreat.int}</div></div></div></div></div></div>";

function setCommonPatInfoTestOnload() {

	var pobj = $("#div1").html();
	pobj1 = eval('(' + pobj + ')');

	$("#commonPatInfo").setTemplate(commonPatInfoTestOnload);
	$("#commonPatInfo").processTemplate(pobj1);
}

var testOnloadTemp = "{#foreach $T.testList as li}<div style='border-bottom: 1px solid #85a7d4;padding-top: 7px;width:18.3%;'  class='GridborderRight'  id='id{j++}'>{$T.li.tname}</div>{#for index=1 to 5}<div style='border-bottom: 1px solid #85a7d4;padding-top: 7px;width: 15%;'  class='GridborderRight' ><input style='width: 90%;' type='text' name='textfield' id='T{$T.li.test_ID}R{$T.index}' value='' onkeypress='checkDateFilled()'/>	<input type='hidden' id='hiddenT{$T.li.test_ID}R{$T.index}' value=''></div>{#/for} {#/for}";

function checkDateFilled() {
	var date = $("#date-pick").val();
	if (date == "") {
		alert("Please select Date First.");
		return false;
	}
}
function loadTests() {
	var date = $("#date-pick").val();
	if (date == "") {
		date = "current";
	}
	var page = $("#page").val();
	pobj = $("#divPatId").html();
	var inputs = [];
	inputs.push('action=loadTest');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {

			TestBean = eval('(' + ajaxResponse + ')');

			$('#test').setTemplate(testOnloadTemp);
			$("#test").processTemplate(TestBean);
			var allTestIds = "";
			for ( var i = 0; i < TestBean.testList.length; i++) {
		
				if (i == 0) {
					allTestIds = TestBean.testList[i].test_ID;
				} else {
					allTestIds = allTestIds + ","
							+ TestBean.testList[i].test_ID;
				}
			}

			$("#divAllTestIds").html(allTestIds);
			if (page != "case") {
				pobj1 = eval('(' + pobj + ')');

				loadPatientTests(pobj1.pi, date);

			} else {
				$("#RTreatment").hide();
				$("#DTreatment").hide();
				$("#prescription").hide();
				$("#patientinfo").hide();
				$("#orderForm").hide();
				$("#NursingChartDate").hide();
				$("#IPD_DICContent").hide();
				$("#orderFormDetails").hide();
				$("#DoctorRoundDate").hide();
				$("#DoctorRoundDetails").hide();
				$("#ReplaceSheet").hide();
				$("#InvestigationChart").hide();
				$("#InvestigationChartDetails").hide();
				$("#OperationNames").hide();
				$("#CommonPatInfo").hide();
				$("#discharge").hide();
				$("#Operation").hide();
				$("#OpearationSummary").hide();
				$("#OperationReport").hide();
				$("#testDetails").show();
				$("#CAPAtContent").hide();
				$("#2DECHO").hide();
				pobj1 = eval('(' + pobj + ')');

				loadPatientTests(pobj1.pi, date);
			}
		}
	});
};

// +++++Function to load all Doctors on doctorDesk1+++++++++++++//
var dispDoctorReg = "<option value='select'>Select Doctor</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
function loadDoctors(pageName, rowcount) {
	var date = $("#date-pick").val();
	var stTime = $("#timeFrom").val();
	var eTime = $("#timeTo").val();
	var inputs = [];
	inputs.push('action=loadDoctor');
	inputs.push('date=' + date);
	inputs.push('stTime=' + stTime);
	inputs.push('eTime=' + eTime);
	inputs.push('pageName=' + pageName);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(ajaxResponse) {
					DoctorBean = eval('(' + ajaxResponse + ')');
					if (pageName == "OPD_RMO") {
						$("#DocContainer").setTemplate(dispDoctorRMO);
						$("#DocContainer").processTemplate(DoctorBean);
					} else if (pageName == "operation") {
						if (rowcount == undefined) {
							$("#selPerBy").setTemplate(dispOperationDoctor);
							$("#selPerBy").processTemplate(DoctorBean);

							$("#selAsstSurgeon").setTemplate(
									dispOperationDoctor);
							$("#selAsstSurgeon").processTemplate(DoctorBean);

							$("#sheet").setTemplate(dispOperationDoctor);
							$("#sheet").processTemplate(DoctorBean);
							$("#docIds").val(ajaxResponse);
							/*
							 * var docName = "";
							 * $('#txtDocName').find('option').each(function() {
							 * docName = docName + $(this).val(); });
							 * 
							 * var docArr = []; docArr = docName.split("\n");
							 * for ( var j = 0; j < DoctorBean.dl.length; j++) {
							 * for ( var i = 0; i < docArr.length; i++) { if
							 * (docArr[i] == DoctorBean.dl[j].di) {
							 * alert("Doctor Is Not Available"); } } }
							 */
						} else {
							$("#selPerBy" + rowcount).setTemplate(
									dispOperationDoctor);
							$("#selPerBy" + rowcount).processTemplate(
									DoctorBean);

							$("#selAsstSurgeon" + rowcount).setTemplate(
									dispOperationDoctor);
							$("#selAsstSurgeon" + rowcount).processTemplate(
									DoctorBean);

							$("#sheet" + rowcount).setTemplate(
									dispOperationDoctor);
							$("#sheet" + rowcount).processTemplate(DoctorBean);
						}
					} else if (pageName == "reg") {
						$("#selectIpdDoc").setTemplate(dispDoctorReg);
						$("#selectIpdDoc").processTemplate(DoctorBean);

					} else if (pageName == "ipdview") {
						$("#docName").setTemplate(dispDoctorReg);
						$("#docName").processTemplate(DoctorBean);

					}
				}
			});
};

// +++++++Function to save RMO treatment+++++++++++++//
function saveOpdRmo(queryType) {
	
	var pid = $("#pid").val();
	var id = $("#id").val();

	var doc = $("#doc").val();
	var date = $("#date").val();
	var Symptoms = $("#Symptoms").val();
	var ClinicalFinding = $("#ClinicalFinding").val();
	var Investigations = $("#Investigations").val();
	var riskFactor = $("#riskFactor").val();
	var complications = $("#complications").val();
	// var checkbox = $("#checkbox").val();
	var DocName = $("#DocContainer").val();

	var prescriptionString = "";
	var i;
	var rowCount = $("#RowCount").val();
	var ICDVals = [];
	$.each($('#ICDCodeDigno option'), function() {
		ICDVals.push($(this).val());
	});

	for (i = 1; i <= rowCount; i++) {

		var txtName = "#Medicine" + i;
		var chkMName = "#M" + i;
		var chkAName = "#A" + i;
		var chkEName = "#E" + i;
		var chkNName = "#N" + i;
		var txtInstruction = "#Instruction" + i;
		var txtDays = "#Days" + i;
		var txtQty = "#Qty" + i;

		var txtValue = $(txtName).val();

		if (txtValue != "" && txtValue != undefined) {

			if (!($(chkMName).attr('checked') || $(chkNName).attr('checked')
					|| $(chkAName).attr('checked') || $(chkEName).attr(
					'checked'))) {

				alert("Please select medicine prescription time");
				return false;

			} else if ($(txtDays).val() == "" || $(txtQty).val() == "") {
				alert("Please Enter Days And Quantity For medicine # No: " + i);
				return false;
			} else {

				prescriptionString = prescriptionString + "@" + txtValue;
				if ($(chkMName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkAName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkEName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkNName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				prescriptionString = prescriptionString + "-"
						+ $(txtInstruction).val() + "-" + $(txtDays).val()
						+ "-" + $(txtQty).val();
			}
		}
	}

	var allValuesString = $("#divAllTestIds").html();
	var allVals = allValuesString.split(",");
	/*
	 * $.each($('#checkbox:checked'), function() { allVals.push($(this).val());
	 * }); alert(allVals);
	 */
	var inputs = [];
	inputs.push('action=OpdRmoSave');
	if (queryType == "update") {
		inputs.push('rowID=' + $("#rowID").val());

	}
	inputs.push('queryType=' + queryType);
	inputs.push('btnValue=RmoSave');
	inputs.push('pid=' + pid);
	inputs.push('id=' + id);
	inputs.push('Symptoms=' + encodeURIComponent(Symptoms));
	inputs.push('ClinicalFinding=' + encodeURIComponent(ClinicalFinding));
	inputs.push('Investigations=' + encodeURIComponent(Investigations));
	inputs.push('riskFactor=' + encodeURIComponent(riskFactor));
	inputs.push('complications=' + encodeURIComponent(complications));

	inputs.push('checkbox=' + allVals);
	inputs.push('DocName=' + DocName);
	inputs.push('prescription=' + prescriptionString);
	inputs.push('doc=' + doc);
	inputs.push('date=' + date);
	inputs.push('icdCode=' + ICDVals);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert('success: ' + ajaxResponse);
			window.location = "OPD_RMO_Dashboard.jsp";
		}
	});
};

function navigateDoctorDesk2() {
	var myObj = $("#div1").html();
	myObj = JSON.parse(myObj);
	var pi = myObj.pi;
	if (myObj.opa == null) {
		// window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi + "&id="
		// + myObj.otd.id + "&updateFlagOn=td&FunType=insert";
		parsedObj = JSON.stringify(myObj);
		window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi
				+ "&id=0&updateFlagOn=direct&FunType=insert&myObj=" + parsedObj;
	} else if (myObj.opa != null) {
		parsedObj = JSON.stringify(myObj);
		window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi + "&id="
				+ myObj.opa.paid + "&updateFlagOn=pa&FunType=insert&myObj="
				+ parsedObj;
	}/*
		 * else{ window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi +
		 * "&FunType=insert"; }
		 */
};

// ++++++++Function to save Doctor Desk treatment+++++++++++++//
function saveDoctorTreatment() {

	var invItem = "";
	$('#txtEquipmetb1').find('option').each(function() {
		invItem = invItem + $(this).val();
	});

	var phyItem = "";
	$('#txtEquipmetg1').find('option').each(function() {
		phyItem = phyItem + $(this).val();
	});

	var dentalItem = "";
	$('#txtEquipmeti1').find('option').each(function() {
		dentalItem = dentalItem + $(this).val();
	});

	var casualtyItem = "";
	$('#txtEquipmetc1').find('option').each(function() {
		casualtyItem = casualtyItem + $(this).val();
	});

	var pathologyItem = "";
	$('#txtEquipmetp1').find('option').each(function() {
		pathologyItem = pathologyItem + $(this).val();
	});

	var topic = $("#selTopicName").val();
	var PreTreat = $("#PreTre").html();

	pobj = eval('(' + PreTreat + ')');
	var tid = 0;
	var FunType = $("#FunType").val();
	if (FunType == "update") {
		var id = pobj.otd.id;
		var pid = $("#pid").html();
		var updateOn = "update";
		tid = pobj.otd.ti;
	} else {
		var id = $("#id").html();
		var pid = $("#pid").html();
		var updateOn = $("#updateOn").html();
	}

	var diagnosis = $("#diagnosis").val();
	var note = $("#note").val();
	var prescriptionString = "";
	var i;

	var noof = $("#noOf").val();
	var fwafter = "";
	for ( var n = 1; n <= 3; n++) {
		if ($('#Radio' + n).is(':checked')) {
			fwafter = $('#Radio' + n).val();
		}
	}
	if (noof != 0 && fwafter == "") {
		alert("Please set Follow-up After");
		return false;
	}
	var rowCount = $("#RowCount").val();

	for (i = 1; i <= rowCount; i++) {

		var txtName = "#Medicine" + i;
		var chkMName = "#M" + i;
		var chkAName = "#A" + i;
		var chkEName = "#E" + i;
		var chkNName = "#N" + i;
		var txtInstruction = "#Instruction" + i;
		var txtDays = "#Days" + i;
		var txtQty = "#Qty" + i;

		var txtValue = $(txtName).val();
		if (txtValue == "") {
			alert("Please Enter Medicene Name");
			// SetFocus("Medicine" + i);
			return false;
		} else if (txtValue != "" && txtValue != undefined) {

			if (!($(chkMName).attr('checked') || $(chkNName).attr('checked')
					|| $(chkAName).attr('checked') || $(chkEName).attr(
					'checked'))) {

				alert("Please select medicine prescription time");
				return false;

			} else if ($(txtDays).val() == "" || $(txtQty).val() == "") {
				alert("Please Enter Days And Quantity For medicine # No: " + i);
				return false;
			} else {

				prescriptionString = prescriptionString + "@" + txtValue;
				if ($(chkMName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkAName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkEName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkNName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				prescriptionString = prescriptionString + "-"
						+ $(txtInstruction).val() + "-" + $(txtDays).val()
						+ "-" + $(txtQty).val();
			}
		}
	}
	var ICDVals = [];

	$.each($('#ICDCodeDigno option'), function() {
		ICDVals.push($(this).val());
	});

	var inputs = [];
	inputs.push('action=SaveDocTreatment');
	inputs.push('pid=' + pid);
	inputs.push('id=' + id);
	inputs.push('tid=' + tid);
	inputs.push('noof=' + noof);
	inputs.push('fwafter=' + fwafter);
	inputs.push('updateFlagOn=' + updateOn);
	inputs.push('diagnosis=' + encodeURIComponent(diagnosis));
	inputs.push('invItem=' + encodeURIComponent(invItem));
	inputs.push('dentalItem=' + encodeURIComponent(dentalItem));
	inputs.push('casualtyItem=' + encodeURIComponent(casualtyItem));
	inputs.push('pathologyItem=' + encodeURIComponent(pathologyItem));
	inputs.push('phyItem=' + encodeURIComponent(phyItem));
	inputs.push('note=' + encodeURIComponent(note));
	inputs.push('FunType=' + FunType);
	inputs.push('prescription=' + prescriptionString);
	inputs.push('icdCode=' + ICDVals);
	inputs.push('topic=' + topic);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			// window.history.go(-2);
			// window.reload();
			// window.location = "OPDDoctorsDeskDashboard.jsp";
		}
	});

};
//modify by sagar...
function showIPDNO() {
	 
	var pobj = $("#ipdNumber").val();
	 
  	$("#ipdNo1").val(pobj);
}
// +++++++++Function to save patient test result +++++++++//
function saveTestResult() {
	var date = $("#date-pick").val();
	var queryType = $("#btnsave").val();
	if (date == "") {
		alert("Please select Date First.");
		return false;
	}
	var pobj = $("#divPatId").html();
	pobj = eval('(' + pobj + ')');
	var trid = pobj.trid;
	var testIds = $("#divAllTestIds").html();

	var testIdsArr = testIds.split(",");

	var testResult = {
		trlist : []
	};

	for ( var k = 0; k < testIdsArr.length; k++) {
		for ( var i = 1; i <= 5; i++) {

			var tresult = $("#T" + testIdsArr[k] + "R" + i).val();
			var id = $("#hiddenT" + testIdsArr[k] + "R" + i).val();
			if (tresult == "") {
				tresult = "null";
			}
			if (id == "") {
				id = 0;
			}
			testResult.trlist.push({
				"id" : id,
				"test_report" : tresult,
				"test_ID" : testIdsArr[k],
				"test_count" : i
			});
		}
	}
	if (testResult.trlist.length == 0) {
		return false;

	} else {

		testResult = JSON.stringify(testResult);
		var inputs = [];
		inputs.push('action=saveTestResult');
		inputs.push('myArray=' + testResult.decodeSpecialChars());
		inputs.push('date=' + date);
		inputs.push('trid=' + trid);
		inputs.push('queryType=' + queryType);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(ajaxResponse1) {
				alert("Tests Result saved");
				window.location = "IpdInvestigationDashboard.jsp";
			}
		});
	}
};

/** ****************End SaveTest Function********* */

$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');

	} catch (e) {
	}
	/*
	 * $('#showhidetrigger').click(function () {
	 * $('#showhidetarget').toggle(400); });
	 */
	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function printDiv1(divName) {
	var hospDetails = $("#hospDetails").html();
	hospDetails = eval('(' + hospDetails + ')');
	var hosp = hospDetails.listHosDetail[0];
	var i;
	var myobj = $("#PreTre").html();
	myObj = JSON.parse(myobj);
	var j;
	var tit;
	var fname;
	var mname;
	var lname;
	var age = myObj.ag + " " + myObj.agtp;
	var weight = myObj.wt + " " + "Kg";
	if (myObj.tit == undefined) {
		tit = "";
	} else {
		tit = myObj.tit;
	}
	if (myObj.fn == undefined) {
		fname = "";
	} else {
		fname = myObj.fn;
	}
	if (myObj.mn == undefined) {
		mname = "";
	} else {
		mname = myObj.mn;
	}
	if (myObj.ln == undefined) {
		lname = "";
	} else {
		lname = myObj.ln;
	}
	var name = tit + " " + fname + " " + mname + " " + lname;
	var mobile;
	if (myObj.mb == undefined) {
		mobile = "";
	} else {
		mobile = myObj.mb;
	}

	var WindowObject = window.open('', ' ', '');
	WindowObject.document
			.writeln('<html><body style="font-size:24px;" ><div style="width:15%;float:left;"><img src="'
					+ hosp.flpt
					+ '" width="200" height="200" alt="" /></div><div style="text-align: center;" id="SRBill"><h1>'
					+ hosp.hn
					+ '</h1>	<b>'
					+ hosp.ha
					+ '-'
					+ hosp.hz
					+ '</b><br></br> <b>Tel:-'
					+ hosp.hcon
					+ '.</b><b>Fax:-'
					+ hosp.hx + '.</b></div></div>');
	WindowObject.document
			.writeln('________________________________________________________________________________________________');

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 1%;"> <div style="width: 60%;  float: left;"><b>Patient Name :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>'
					+ name
					+ '</b></div><div style="width: 40%;  float: left;">Age : <b>'
					+ age
					+ ' </div></div><div style="width: 100%; "> <div style="width: 60%;  padding-top:2%;float: left;">Contact Number :&nbsp;&nbsp;&nbsp; <b>'
					+ mobile
					+ '</b></div><div style="width: 40%;  padding-top:2%;float: left;"><b>Weight : '
					+ weight + ' </b></div></div>');
	WindowObject.document
			.writeln('________________________________________________________________________________________________');

	WindowObject.document
			.writeln('<div style="width: 150%; height: px; padding-top: 0%;">			<div style="width: 100%; float: left;">				<div style="width: 35%; padding-top: 2%;float: left;">					<b>Presenting Symptoms</b>				</div>				<div style="width: 50%;padding-top: 2%;float: left;">					<b>Clinical Finding</b>				</div>				<div					style="width: 35%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;">					<textarea name="impression" cols="60" rows="7" id="impression"						class="" style="border: 0.2px solid;font-weight:bold;">'
					+ $("#Symptoms").val()
					+ '</textarea>				</div>			 								<div					style="width: 50%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;">					<textarea name="impression" cols="60" rows="7"  						class="" style="border: 0.2px solid;font-weight:bold;">'
					+ $("#ClinicalFinding").val()
					+ '</textarea>				</div>				 				<div style="width: 35%;float: left;">					<b>Special Investigation</b>				</div>				 				<div style="width: 50%;float: left;">					<b>Risk Factor</b>				</div>				<div					style="width: 35%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;">					<textarea name="impression" cols="60" rows="7" id="impression"						class="" style="border: 0.2px solid;font-weight:bold;">'
					+ $("#Investigations").val()
					+ '</textarea>				</div>			 				 				<div					style="width: 40%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;">					<textarea name="impression" cols="60" rows="7" id="impression"						class="" style="border: 0.2px solid;font-weight:bold;">'
					+ $("#riskFactor").val()
					+ '</textarea>				</div>				 				<div style="width: 30%;">					<b>Complications</b>				</div>				<div					style="width: 30%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;">					<textarea name="impression" cols="60" rows="7" id="impression"						class="" style="border: 0.2px solid;font-weight:bold;">'
					+ $("#complications").val()
					+ '</textarea>				</div>			</div>		 ');
	var txtName1 = "#Medicine1";
	var txtValue1 = $(txtName1).val();
	if (txtValue1 != "" && txtValue1 != undefined) {
		WindowObject.document
				.writeln('<div style="width:80%; float: left;"><div style="width: 100%; float: left;padding-bottom: 10px;">Prescription :</div><table cellpadding="0" cellspacing="0" style="border: solid 1px;font-size:25px;" width="82%"><tr><td style="border: solid 1px;" align="center" width="5%"><strong># </strong></td><td style="border: solid 1px;width:25%" align="left"><strong>Medicine Name</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Morning</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Afternoon</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Evening</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Night</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Instruction</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Days</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Qty</strong></td></tr>');

		var rowCount = $("#RowCount").val();

		for (i = 1; i <= rowCount; i++) {

			var chkMName = "#M" + i;
			var chkAName = "#A" + i;
			var chkEName = "#E" + i;
			var chkNName = "#N" + i;
			var txtInstruction = "#Instruction" + i;
			var txtDays = "#Days" + i;
			var txtQty = "#Qty" + i;
			var txtName = "#Medicine" + i;
			var txtValue = $(txtName).val();
			if (txtValue != "" && txtValue != undefined) {

				if (!($(chkMName).attr('checked')
						|| $(chkNName).attr('checked')
						|| $(chkAName).attr('checked') || $(chkEName).attr(
						'checked'))) {

					alert("Please select medicine prescription time");
					return false;

				} else if ($(txtDays).val() == "" || $(txtQty).val() == "") {

					alert("Please Enter Days And Quantity For medicine # No: "
							+ i);
					return false;

				} else {

					WindowObject.document
							.writeln('<tr><td  style="border: solid 1px;" align="center">'
									+ i
									+ '</td><td style="border: solid 1px;" align="left" id="Medicine1">'
									+ txtValue + ' </td>');
					if ($(chkMName).attr('checked')) {

						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" src="images/Accept.png" width="15%" height="15%"> </td>');

					} else {
						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" width="0%" height="0%" /> </td>');
					}

					if ($(chkAName).attr('checked')) {

						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" src="images/Accept.png" width="15%" height="15%"> </td>');

					} else {
						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" width="0%" height="0%" /> </td>');
					}

					if ($(chkEName).attr('checked')) {
						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="E1"  src="images/Accept.png" width="15%" height="15%"> </td>');

					} else {
						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="E1" width="0%" height="0%"/> </td>');
					}
					if ($(chkNName).attr('checked')) {
						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="N1"  src="images/Accept.png" width="15%" height="15%">  </td>');

					} else {
						WindowObject.document
								.writeln('<td style="border: solid 1px;" align="center" ><img id="N1" width="0%" height="0%"/ > </td>');
					}

					WindowObject.document
							.writeln('<td  style="border: solid 1px;" align="left">&nbsp;'
									+ $(txtInstruction).val()
									+ '</td><td style="border: solid 1px;"  align="center" id="Medicine1">&nbsp;'
									+ $(txtDays).val()
									+ ' </td><td style="border: solid 1px;" align="center" id="Medicine1">&nbsp;'
									+ $(txtQty).val() + ' </td></tr>');

				}
			}
		}
	}

	WindowObject.document.writeln('</table></div>');

	WindowObject.document.writeln('</div>');
	WindowObject.document.writeln('<body></html>');
	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

	// var printContents = document.getElementById(divName).innerHTML;

	// document.body.innerHTML = printContents;

	// window.print();

	// document.body.innerHTML = originalContents;
}
/** ****************start Doctor Treatment***************************** */
function getInstruction() {

	/*
	 * var radioValue = "";
	 * 
	 * var DAY = $('input:radio[id=DAY]'); var WEEK = $('input:radio[id=WEEK]');
	 * var MONTH = $('input:radio[id=MONTH]');
	 * 
	 * if (DAY.is(':checked') == true) { radioValue = "DAY"; } else if
	 * (WEEK.is(':checked') == true) { radioValue = "WEEK"; } else if
	 * (MONTH.is(':checked') == true) { radioValue = "MONTH"; }
	 */

	var DWMSelect = ($("#DWMSelect").val()).trim();
	if (DWMSelect == "") {
		return false;
	}

	var value = $("#noOf").val();

	if ((value.trim()) == "")
		value = "--";

	$("#divfollow").html(
			"Please do follow up after " + value + " " + DWMSelect
					+ ". Please take prior appointment.");
}

/** **********Follow up end*************************************** */

/** *****************ICD 10 Diagnosis Start********************* */
var icdcodeTemp = '{#foreach $T.icd10_L_List as icd10_L_List}<div 	style="width: 100%; height: 25px; border: 1px solid #b8b8b8; border-top: none;"> <div style="width: 5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{count}</div> <div style="width: 12%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{$T.icd10_L_List.icd_code_L}</div> <div style="width: 73%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{$T.icd10_L_List.name_L}</div> <div style="width: 5.5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;"> <input type="checkbox" id="checkbx" name="checkbox{count++}" value="{$T.icd10_L_List.icd_code_L}-{$T.icd10_L_List.name_L}" style="width: 80%;" /> </div> </div> {#/for}';
function SearchICD10Diagnosis() {
	count = 1;
	var serchTxt = $.trim($("#serchTxt").val());

	if (serchTxt == "") {
		/*
		 * alert("Please Enter Something For Search "); return false;
		 */
		serchTxt = "a";
	}

	var inputs = [];
	inputs.push('action=SearchICD10');
	inputs.push('serchTxt=' + encodeURIComponent(serchTxt));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			ICDbean = eval('(' + ajaxResponse + ')');
			$("#icdDiagnosis").setTemplate(icdcodeTemp);

			$("#icdDiagnosis").processTemplate(ICDbean);
		}
	});
}

function setICD10Diagnosis(icd10code, digno) {

	$.each($('#checkbx:checked'), function() {
		// allVals.push($(this).val());
		var o = new Option("option text", "value");
		$(o).html($(this).val() + '\n');
		$(o).val($(this).val().split("-")[0]);

		$("#ICDCodeDigno").append(o);
		$("#diagnosis").html($("#diagnosis").val() + '' + $(o).html());
	});

	$(".close").click();
	$("#icdDiagnosis").html("");
	fetchICDTemp();

}

/** *****************ICD 10 Diagnosis End********************* */

/** *****************Prescrption Template*************** */

var setPrescriptionICDTemp = '{#foreach $T.tpcli as tpcli}<div style="width: 100%; border: 1px solid #b8b8b8 ;border-top: none;" id="prescription{count}"> 	<div style="width: 4.8%; text-align: center; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 22px;">{count}</div>		<div			style="width: 30%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="text" style="width: 100%" id="Medicine{count}" class="auto" value="{$T.tpcli.medNm}">		</div>		<div			style="width: 5.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="checkbox" id="M{count}"  name="M{count}" />		</div>		<div			style="width: 5.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="checkbox" id="A{count}" name="A{count}" />		</div>		<div			style="width: 4.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="checkbox" id="E{count}" name="E{count}" />		</div>		<div			style="width: 4.1%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="checkbox" id="N{count}" name="N{count}" />		</div>		<div			style="width: 18.3%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="text" style="width: 100%" id="Instruction{count}" value="{$T.tpcli.inst}">		</div>		<div			style="width: 5.2%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"			align="center">			<input type="text" style="width: 100%" id="Days{count}" value="{$T.tpcli.day}">	</div><div	style="width: 4%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"><input type="text" style="width: 100%" id="Qty{count}" value="{$T.tpcli.qty}" readonly="readonly">		</div>		<div style="padding-top: 4px; height: 22px;" align="center">			<input type="checkbox" name="checkbox{count}" id="checkbox" value="{$T.tpcli.idtpc}" />		</div><input type="hidden" value="{$T.tpcli.idtpc}"  id="idtpc{count}" name="idtpc{count}" />		<input type="hidden" value="{count++}"  id="txtRowCount" name="txtRowCount" />	</div>{#/for}	<input type="hidden" value="{--count}" id="addRowCount" /><input type="hidden" value="{count}" id="RowCount" />';

function setPrescTemp(idtm) {

	$("#txtTempName").val($("#selTempName option[value=" + idtm + "]").text());
	$("#idTempMast").val(idtm);

	$("#divTempNm").show();
	$("#divPrescriptionTemp").show();

	count = 1;
	var inputs = [];
	inputs.push('action=fetchTempDetails');
	inputs.push('selTempTyp=' + idtm);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			obj1 = eval('(' + ajaxResponse + ')');

			$("#divPrescription").setTemplate(setPrescriptionICDTemp);
			$("#divPrescription").processTemplate(obj1);

			$('#activeSts:checked').val() == 'true';

			$('input:radio[name="radioStatus"]').filter('[value="Y"]').attr(
					'checked', true);

			for ( var i = 0; i < obj1.tpcli.length; i++) {
				if (obj1.tpcli[i].mor == 1) {
					$('input[name=M' + (i + 1) + ']').attr('checked', true);
				}
				if (obj1.tpcli[i].aft == 1) {
					$('input[name=A' + (i + 1) + ']').attr('checked', true);
				}
				if (obj1.tpcli[i].eve == 1) {
					$('input[name=E' + (i + 1) + ']').attr('checked', true);
				}
				if (obj1.tpcli[i].nig == 1) {
					$('input[name=N' + (i + 1) + ']').attr('checked', true);
				}
			}
			$(".auto").autocomplete("AutoSuggetionServlet?auto=pharmacy");
		}
	});
}

var fetchICDTempName = "{#foreach $T.tml as tml}<option onclick=setPrescTemp('{$T.tml.idtm}') value='{$T.tml.idtm}'>{$T.tml.tmpNm}</option>{#/for}";
function fetchICDTemp() {

	var TempTyp = $("#ICDCodeDigno :selected").val();

	if (TempTyp == "") {

		alert("Please Select ICD10 Code.");

	} else {

		var inputs = [];
		inputs.push('action=fetchAllTempName');
		inputs.push('TempTyp=' + TempTyp);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;

				var obj = eval('(' + ajaxResponse + ')');

				$("#selTempName").setTemplate(fetchICDTempName);
				$("#selTempName").processTemplate(obj);

				/*
				 * var Template = $("#selTempName :selected").val();
				 * setPrescTemp(Template);
				 */
			}
		});

	}

}

/** ************End Prescription Template*************** */

/*
 * Author : nIKHIL; Date : 23/9/2014; purpose : Save/update => prescription tab
 * on OPDDoctorsDesk2.jsp;
 */

function setPrescriptionNameID() {
	var arrayPrepNameID = ($("#name").val()).split("_");
	if (arrayPrepNameID[1] == "" || arrayPrepNameID[1] == undefined) {
		alert("Please Enter valid Prescription name...");
		$("#name").val("");
		$("#medicineID").val("0");
		SetFocus("name");
		// $("#").prop("disabled", "disabled");
		return false;
	}
	$("#name").val(arrayPrepNameID[0]);
	$("#medicineID").val(arrayPrepNameID[1]);

}

function saveUpdatePrescription() {
	var queryType = $("#queryType").val();
//	var treatmentId = $.trim($('#treatmentId').val());
	
	var treatmentId = $.trim($('#tr_Id').val());
	var prep = $.trim($("#prep :selected").val());
	var name = $.trim($("#name").val());
	var medicineID = $.trim($("#medicineID").val());
	var strength = $.trim($("#strength").val());
	var unit = $.trim($("#unit").val());
	var dose = $.trim($("#dose").val());
	/*if(dose == ""){
		dose ="0";
	}*/
	var frequency = $.trim($("#frequency").val());
	var instruction = $.trim($("#instruction").val());
	var route = $.trim($("#route").val());
	var days = $.trim($("#days").val());
	var qty = $.trim($("#qty").val());
	var paediatricsMedicineFlag = $.trim($("#paediatricsMedicineFlag").val());
	var paediatricsMedicineCapacity = ($("#paediatricsMedicineCapacity").val())
			.trim();
	var mor_flag="0";
	var aft_flag="0";
	var eve_flag="0";
	var night_flag="0";
	if(frequency=="" || frequency==null || frequency==undefined){
		alert("Please Select frequency...");
		SetFocus("frequency");
		return false;
	}
	if (prep == "") {
		alert("Please Select Prep...");
		SetFocus("prep");
		return false;
	}
		if ($("#medicineNotAvailableCheckbox").prop("checked")){
			// No need to show validation 
	}else{
		if (medicineID == "0" || medicineID == "undefined" || medicineID == "") {
			alert("Please Enter proper medicine name");
			$("#medicineID").val("0");
			SetFocus("name");
			return false;
		}
		if (name == "") {
			alert("Please Enter proper medicine name");
			SetFocus("name");
			return false;
			}
	}

	if (instruction == "0") {
		// alert("Please Select Instruction...");
		// SetFocus("instruction");
		// return false;
	}

	if (days == "") {
		alert("Please Enter days...");
		SetFocus("days");
		return false;
	}

	if (qty == "") {
		alert("Please Select Quantity...");
		SetFocus("qty");
		return false;
	}
	if (qty != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(qty)) {
			alert("Quantity should be of digits and a decimal point Only!");
			$("#qty").focus();
			return false;
		}
	}
	
	if(document.getElementById('mo').checked){
		//mor_flag = "1";
		mor_flag=$("#tmo").val();
	}
	if(document.getElementById('an').checked){
		//aft_flag = "1";
		aft_flag =$("#tan").val();
	}
	if(document.getElementById('ev').checked){
		//eve_flag = "1";
		eve_flag=$("#tev").val();
	}
	if(document.getElementById('nt').checked){
		//night_flag = "1";
		night_flag=$("#tnt").val();
	}
	
	var dayPrescription = mor_flag+","+aft_flag+","+eve_flag+","+night_flag;
	//alert("daysprescription="+dayPrescription);
	
	var inputs = [];
	inputs.push('action=savePrescription');
	inputs.push('queryType=' + queryType);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('prep=' + prep);
	inputs.push('medicineID=' + medicineID);
	inputs.push('name=' + encodeURIComponent(name));
	inputs.push('strength=' + strength);
	inputs.push('unit=' + unit);
	inputs.push('dose=' + dose);
	inputs.push('frequency=' + frequency);
	inputs.push('instruction=' + instruction);
	inputs.push('route=' + route);
	inputs.push('days=' + days);
	inputs.push('qty=' + qty);
	inputs.push('paediatricsMedicineFlag=' + paediatricsMedicineFlag);
	inputs.push('paediatricsMedicineCapacity=' + paediatricsMedicineCapacity);
	inputs.push('dayPrescription=' + dayPrescription);

	if (queryType == 'update') {
		inputs.push('prescription_id=' + $.trim($('#prescription_id').val()));
	}

	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

	var token = $("#synchronizeToken").val();

	// inputs.push('testType=' + encodeURIComponent(testType));

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// 
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					if (ajaxResponse == "Prescription Name is already present in the database."
							|| ajaxResponse == "Service Name is already present in the database.") {
						SetFocus("tname");
					} else {

						$("#medicineID").val("0");
						$('#prep').prop('disabled', false);
						$('#name').prop('disabled', false);
						$("#prep").val('0');
						$("#name").val('');
						$("#strength").val('');
						$("#dose").val('');
						$("#unit").val('0');
						$("#frequency").val('');
						$("#instruction").val('0');
						$("#route").html('<option value="0">SELECT</option>');
						$("#route").val('0');
						$("#days").val('');
						$("#qty").val('');
						$("#queryType").val('save');
						$("#paediatricsMedicineFlag").val('N');
						$("#paediatricsMedicineCapacity").val("");
						
						$("#mo").prop('checked', false);
						$("#an").prop('checked', false);	
						$("#ev").prop('checked', false);
						$("#nt").prop('checked', false);
						$('#tmo').val('1');
						$('#tan').val('1');
						$('#tev').val('1');
						$('#tnt').val('1');
						$("#tmo").attr('readonly', 'readonly');
						$("#tan").attr('readonly', 'readonly');
						$("#tev").attr('readonly', 'readonly');
						$("#tnt").attr('readonly', 'readonly');
						showPrescriptionTemp();
					}
				}
			});
	// $("#AddTest").show();
}

/*
 * Author : nIKHIL Date : 23/9/2014 purpose : Save/update => prescription tab on
 * OPDDoctorsDesk2.jsp
 */
var prepCount = 0;
var prescriptionCoverSheetContent = "{#foreach $T.prescriptionList as pl}<tr><td class='col-md-1-1 center TextFont'>{++prepCount}.</td>"
		+ "<td class='col-md-5-1 TextFont'>{$T.pl.name}</td>"
		+ "<td class='col-md-1-1 center TextFont'>{$T.pl.frequency}</td>"
		+ "<td class='col-md-2-1 center TextFont'>{$T.pl.days} Days</td>"
		+ "<td class='col-md-1-1 center TextFont'>ACTIVE</td>" + "</tr>{#/for}";

function showPrescriptionTemp() {
	prepCount = 0;
	//var treatmentId = $.trim($('#treatmentId').val());
	var treatmentId = $.trim($('#tr_Id').val()); //added by paras
	var inputs = [];
	inputs.push('action=fetchPrescription');
	inputs.push('treatmentId=' + treatmentId);

	// inputs.push('testType=' + encodeURIComponent(testType));
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#prescriptionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');

					var prescriptionContentTemp = "";
					var instruction = "";
					var prep = "";
					var unit = "";
					var frequency="";
					if (testObj.prescriptionList.length > 0) {
						for ( var int = 0; int < testObj.prescriptionList.length; int++) {

							instruction = "";

							if ((testObj.prescriptionList[int].instruction) != 0) {
								instruction = $(
										"#instruction option[value='"
												+ testObj.prescriptionList[int].instruction
												+ "']").text();
							}

							prep = $(
									"#prep option[value='"
											+ (testObj.prescriptionList[int].prep)
											+ "']").text();

							if ((testObj.prescriptionList[int].unit) != 0) {
								unit = $(
										"#unit option[value='"
												+ (testObj.prescriptionList[int].unit)
												+ "']").text();

							}else{
								unit = "-";
							}
							
							var newchar = '-';
							frequency=testObj.prescriptionList[int].dayPrescription;
							if ( frequency =="0,0,0,0" || frequency==null || frequency=="" || frequency==undefined){
								frequency = testObj.prescriptionList[int].frequency;
							}else{
								frequency = frequency.split(',').join(newchar);	
							}
							
							prescriptionContentTemp = prescriptionContentTemp
									+ "<tr><td class='col-md-1-1 center'>"
									+ ++prepCount
									+ ".</td>"
									+ "<td class='col-md-2-1'>"
									+ (prep)
									+ ". "
									+ testObj.prescriptionList[int].name
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ testObj.prescriptionList[int].strength
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ testObj.prescriptionList[int].dose
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ unit
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ frequency
									+ "</td>"
									+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
									+ instruction
									+ "</td>"
									+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
									+ testObj.prescriptionList[int].days
									+ "</td>"
									+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
									+ testObj.prescriptionList[int].qty
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ "<input name='prepTreatmentMedicineCheckbox' id='"
									+ (testObj.prescriptionList[int].prescription_id)
									+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' /></td>"
									+ "</tr>";
						}
					}

					$('#prescriptionContent').html(prescriptionContentTemp);
					$("#prescription_id").val("0");

					/* for cover sheet opd */
					prepCount = 0;
					$("#prescriptionCoverSheetContent").setTemplate(
							prescriptionCoverSheetContent);
					$("#prescriptionCoverSheetContent")
							.processTemplate(testObj);

				}
			});

	// disableTextBoxes();
	// $("#queryType").val('update');
}

/*
 * Author : nIKHIL; Date : 1/10/2014; Purpose : To enable Text Boxes in
 * prescription tab on OPDDoctorsDesk2.jsp
 */
function enableTextBoxes() {

	$("#prep").val("0");
	$("#name").val('');
	$("#strength").val('');
	$("#unit").val('0');
	$("#dose").val('');
	$("#frequency").val('');
	$("#instruction").val('0');
	$("#route").html('<option value="0">SELECT</option>');
	$("#route").val('0');
	$("#days").val('');
	$("#qty").val('');
	$("#medicineID").val('0');
	$('#OFSlaveID').val('0');
	$("#OFqueryType").val('insert');
	
	$("#mo").prop('checked', false);

	$("#an").prop('checked', false);	

	$("#ev").prop('checked', false);
	
	$("#nt").prop('checked', false);
	
	for ( var i = 1; i < OFCount; i++) {
		$('#checkbox' + i).prop('checked', false);
	}

	// opd
	$("#queryType").val('save');
	$('#prescription_id').val('0');
	for ( var i = 1; i <= prepCount; i++) {
		$('#checbox' + i).prop('checked', false);
	}

	$("#prep,#name,#strength,#dose,#frequency,#instruction,#route,#days,#qty")
			.removeAttr("disabled");

	// paedetric type medicine
	$("#paediatricsMedicineFlag").val('N');

	// used while calculating paedetric medicine quantity if filled from
	// paedetric master
	$("#paediatricsMedicineCapacity").val("");
}

function disableTextBoxes() {
	$("#prep,#name,#strength,#dose,#frequency,#instruction,#route,#days,#qty")
			.attr("disabled", "disabled");
}

function uncheck(chkCount, prescription_id) {
	for ( var i = 1; i <= prepCount; i++) {
		if (i == chkCount)
			continue;
		// var id1 = 'checkbox' + i;
		$('#checbox' + i).prop('checked', false);
	}
	$("#prescription_id").val(prescription_id);

}

/*
 * Author : nIKHIL; Date : 2-10-2014; to edit Prescription on
 * OPDDoctorsDesk2.jsp
 */
function editPrescription() {

	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to Edit...");
		return false;
	}

	var array = new Array();
	var prescription_id = 0;
	var dayPrescription ="";
	// $('#prescriptionTemplateContentDocTable tr').each(function() {
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		array.push($(this).val());
		prescription_id = ($(this).attr('id')).trim();
	});
	// });

	if ((array.length) == 0) {
		alert("Please check the checkbox to edit...");
		return false;
	}

	if ((array.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}

	if (prescription_id == "0" || prescription_id == "") {
		alert("Please check the checkbox...");
		return;
	}

	var selectRouteSelectBox = "<option value='0'>SELECT</option>";

	var ajaxResponse = $("#prescriptionDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.prescriptionList.length; i++) {
		if (myArray.prescriptionList[i].prescription_id == prescription_id) {
			myObj1 = myArray.prescriptionList[i];

			if ($.trim(myObj1.route) != "") {

				var routeDetailsResponse = $("#routeDetails").html();
				var routeDetailsResponseArray = JSON.parse(routeDetailsResponse
						.decodeSpecialChars());

				for ( var i = 0; i < routeDetailsResponseArray.rtlist.length; i++) {
					if (routeDetailsResponseArray.rtlist[i].prepId == myObj1.prep) {

						selectRouteSelectBox += ("<option value='"
								+ (routeDetailsResponseArray.rtlist[i].routeId)
								+ "'>"
								+ (routeDetailsResponseArray.rtlist[i].rtnm) + "</option>");
					}
				}
			}
			break;
		}
	}

	$("#route").html(selectRouteSelectBox);

	$("#prep,#name,#strength,#dose,#frequency,#instruction,#route,#days,#qty")
			.removeAttr("disabled");

	$("#prescription_id").val(prescription_id);
	$("#prep").val(myObj1.prep);
	$("#name").val(myObj1.name);
	$('#prep').prop('disabled', true);
	$('#strength').prop('disabled', true);
	$('#name').prop('disabled', true);
	$("#medicineID").val(myObj1.medicineID);
	$("#strength").val(myObj1.strength);
	$("#unit").val(myObj1.unit);
	$("#dose").val(myObj1.dose);
	$("#frequency").val(myObj1.frequency);
	$("#instruction").val(myObj1.instruction);
	$("#route").val(myObj1.route);
	$("#days").val(myObj1.days);
	$("#qty").val(myObj1.qty);
	$("#paediatricsMedicineFlag").val(myObj1.paediatricsMedicineFlag);
	$("#paediatricsMedicineCapacity").val(myObj1.paediatricsMedicineCapacity);
	
	$("#dayPrescription").val(myObj1.dayPrescription);
	dayPrescription = myObj1.dayPrescription;
	
	$("#mo").prop('checked', false);
	$("#an").prop('checked', false);	
	$("#ev").prop('checked', false);
	$("#nt").prop('checked', false);
	
	var arr =dayPrescription.split(",");
/*	if(arr[0]=="1"){
		$("#mo").prop('checked', true);
	}
	
	if(arr[1]=="1"){
		$("#an").prop('checked', true);
	}
	
	if(arr[2]=="1"){
		$("#ev").prop('checked', true);
	}
	
	if(arr[3]=="1"){
		$("#nt").prop('checked', true);
		
	}*/
	//alert("arr"+arr);
	if(arr[0]!="0"){
		$("#mo").prop('checked', true);
		$("#tmo").removeAttr("readonly");
	}
	
	if(arr[1]!="0"){
		$("#an").prop('checked', true);
		$("#tan").removeAttr("readonly");
	}
	
	if(arr[2]!="0"){
		$("#ev").prop('checked', true);
		$("#tev").removeAttr("readonly");
	}
	
	if(arr[3]!="0"){
		$("#nt").prop('checked', true);
		$("#tnt").removeAttr("readonly");
	}
	$("#tmo").val(arr[0]);
	$("#tan").val(arr[1]);
	$("#tev").val(arr[2]);
	$("#tnt").val(arr[3]);

	if ((myObj1.paediatricsMedicineFlag) == 'Y') {
		$("#paediatricsDocCheckBox").prop("checked", true);
	} else {
		$("#paediatricsDocCheckBox").prop("checked", false);
	}

	$("#queryType").val('update');
	if(myObj1.medicineID=="0"){
		
		$( "#medicineNotAvailableCheckbox").prop('checked', true);
	}
	SetFocus("prep");
}
/*
 * Author : nIKHIL; Date : 2-10-2014; to delete Prescription on
 * OPDDoctorsDesk2.jsp
 */
function deletePrescription() {

	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to delete...");
		return false;
	}

	var prescriptionIDArray = new Array();
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		prescriptionIDArray.push($(this).attr('id'));
	});

	if ((prescriptionIDArray.length) == 0) {
		alert("Please check the checkbox to delete...");
		return false;
	}

	var r = confirm("Please confirm to Delete Record?");
	if (r) {
		var inputs = [];
		inputs.push('action=deletePrescription');
		inputs.push('prescriptionIDArray=' + prescriptionIDArray);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(res) {
				ajaxResponse = res;
				alert(res);
				showPrescriptionTemp();
			}
		});
	}
}
/*
 * Author : nIKHIL; Date : 2-10-2014; Purpose : to enable disale text box for
 * Assessment on OPDDoctorsDesk2.jsp
 */
function enableAsmntTextBoxes(diagno_type) {
	$("#diagnosis").val('');
	$("#diagno_description").val('');
	$("#icd10_code").val('');
	$("#assesmentDate").val('');
	$("#diagno_type").val(diagno_type);
	$("#comment").val('');
	$("#diagno_slave_id").val('0');

	for ( var i = 1; i < flag_count; i++) {
		var id = 'chekbox' + i;
		$('#' + id).prop('checked', false);
	}

	$(
			"#diagnosis,#diagno_description,#assesmentDate,#diagno_type,#diagnosed_by,#comment")
			.removeAttr("disabled");

	$("#queryType").val('insert');
}

function disableAsmntTextBoxes() {
	$("#diagnosis").val('');
	$("#diagno_description").val('');
	$("#icd10_code").val('');
	$("#assesmentDate").val('');
	$("#diagno_type").val('Provisional');
	$("#comment").val('');
	$("#diagno_slave_id").val('0');
	$(
			"#diagnosis,#diagno_description,#icd10_code,#assesmentDate,#diagno_type,#diagnosed_by,#comment")
			.prop("disabled", true);
}

/*
 * Author : nIKHIL; Date : 3-10-2014; Purpose : Auto suggetion text box for
 * Assessment on OPDDoctorsDesk2.jsp
 */
function autoSuggetionDiagnosis() {
	var inputs = [];
	/*
	 * inputs.push('action=patientNameforAppointment');
	 * inputs.push('autocomplete='+$("#autocomplete").val());
	 */
	// var chars = $('#diagnosis').val();
	inputs.push('auto=DiagnosisForAssessment');
	// inputs.push('chars=' + chars);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AutoSuggetionServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			var availableTags = [];
			availableTags = ajaxResponse.split("\n");
			$("#diagnosis").autocomplete({
				source : availableTags
			});
		}
	});
}

/*
 * Author : nIKHIL; Date : 3-10-2014; Purpose : Save Assessment on
 * OPDDoctorsDesk2.jsp
 */
function saveEditAssesmentOPD(callFrom) {

	// var queryType = $("#queryType").val();
	// var icd10_id = $("#icd10_id_forAssmnt").val();
	var diagnosed_By = "";
	if (callFrom == "IPD") {
		diagnosed_By = $("#consultDoc").html();
		if(diagnosed_By == ""){
			diagnosed_By = $("#consultDoc").val();
		}
	} else if (callFrom == "DoctorDesk") {
		diagnosed_By = $("#nameh").html();
	} else {
		diagnosed_By = ""; 
	}
//	var treatmentId = $.trim($('#treatmentId').val());
	var treatmentId =   $("#tr_Id").val();  
	var diagno_slave_id = $.trim($('#diagno_slave_id').val());
	var diagnosis = $.trim($('#diagnosis').val());
	var diagno_description = $.trim($("#diagno_description").val());
	var icd10_code = $.trim($("#icd10_code").val());
	var date = $.trim($("#assesmentDate").val());
	var diagno_type = $.trim($("#diagno_type").val());
	var comment = $.trim($("#comment").val());
	if(treatmentId == ""){
		treatmentId = $.trim($('#tId').val());
	}
	if ((diagnosis == "" || diagnosis == "undefined")) {
		alert("Please enter diagnosis name");
		SetFocus("diagnosis");
		$('#diagnosis').val("");
		$("#diagno_description").val("");
		$("#icd10_code").val("");
		return;
	}

	if (icd10_code == "" || icd10_code == "undefined") {
		alert("Please enter diagnosis name");
		SetFocus("diagnosis");
		$('#diagnosis').val("");
		$("#diagno_description").val("");
		$("#icd10_code").val("");
		return;
	}

	var inputs = [];
	inputs.push('action=saveAssessmentOpd');
	// inputs.push('queryType=' + queryType);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('diagno_slave_id=' + diagno_slave_id);
	inputs.push('diagnosis=' + encodeURIComponent(diagnosis));
	inputs.push('diagno_description=' + encodeURIComponent(diagno_description));
	inputs.push('icd10_code=' + icd10_code);
	inputs.push('date=' + date);
	inputs.push('diagno_type=' + diagno_type);
	inputs.push('comment=' + encodeURIComponent(comment));
	inputs.push('diagnosed_By=' + diagnosed_By);

	// inputs.push('icd10_id=' + icd10_id);
	// if (queryType == 'update') {
	// inputs.push('diagno_slave_id=' + $.trim($('#diagno_slave_id').val()));
	// }
	// inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	// inputs.push('testType=' + encodeURIComponent(testType));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "TreatmentServlet",
		url : "ehat/otdata/saveAssessmentOpd",		
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);

			// $("#deskTabs").tabs("option", "active", 3 );
			$("#diagnosis").val('');
			$("#diagno_description").val('');
			$("#diagnosis").prop("disabled", false);
			$("#diagno_description").prop("disabled", false);
			$("#icd10_code").val('');
			$("#assesmentDate").val('');
			$("#diagno_type").val('Provisional');
			$("#comment").val('');
			$("#queryType").val('insert');
			$('#diagno_slave_id').val('0');
			showAssessmentTemp();
			// location.reload();
			// disableAsmntTextBoxes();
		}

	});

}

/*
 * Author : nIKHIL Date : 6/10/2014; purpose : To show Assessmnet tab on
 * OPDDoctorsDesk2.jsp
 */

var assesmentTempProvisional = "{#foreach $T.assessmentList as al}{#if $T.al.diagno_type=='Provisional'}<tr>"
	+ "<td class='col-md-1-1 center'>{count++}.</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagnosis}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagno_description}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.icd10_code}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.date}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.diagno_type}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagnosed_by}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.comment}</td>"
	+ "<td id='idchkbox' class='mychkbox'>"
	+ "<input id='chekbox{flag_count}' type='checkbox' onclick='uncheckAssmnt({flag_count++},{$T.al.diagno_slave_id})' style='margin-top: 2px;' />"
	+ "</td></tr>{#/if}{#/for}";
var assesmentTempConfirmed = "{#foreach $T.assessmentList as al}{#if $T.al.diagno_type=='Confirmed'}<tr>"
		+ "<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-2-1 center'>{$T.al.diagnosis}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.diagno_description}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.icd10_code}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.date}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.diagno_type}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.diagnosed_by}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.comment}</td>"
		+ "<td id='idchkbox' class='center'>"
		+ "<input id='chekbox{flag_count}' type='checkbox' onclick='uncheckAssmnt({flag_count++},{$T.al.diagno_slave_id})' style='margin-top: 2px;' />"
		+ "</td></tr>{#/if}{#/for}";
var assesmentTempConfirmedPrescription = "{#foreach $T.assessmentList as al}{#if $T.al.diagno_type=='Confirmed'}<tr>"
		+ "<td class='col-md-1-1 center'>{assesTmpConfmedPrescriptionCount++}.</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.diagnosis}</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.icd10_code}</td></tr>{#/if}{#/for}";

var assesmentTempConfirmedPrescriptionRadiotherapy = "{#foreach $T.assessmentList as al}<tr>"
		+ "<td class='col-md-1-1 center'>{assesTmpConfmedPrescriptionCount++}.</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.diagnosis}</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.icd10_code}</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.diagno_type}</td></tr>{#/for}";

var assesmentTempProvisionalForDischargeSummary = "{#foreach $T.assessmentList as al}{#if $T.al.diagno_type=='Provisional'}<tr>"
		+ "<td class='col-md-1-1 center'>{count++}.</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.diagnosis}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.diagno_description}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.icd10_code}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.date}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.diagno_type}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.diagnosed_by}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.comment}</td>"
		+ "<input id='chekbox{flag_count}' type='hidden' value='{$T.al.diagno_slave_id})' />"
		+ "</tr>{#/if}{#/for}";
var assesmentTempConfirmedForDischargeSummary = "{#foreach $T.assessmentList as al}{#if $T.al.diagno_type=='Confirmed'}<tr>"
		+ "<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-2-1 center'>{$T.al.diagnosis}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.diagno_description}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.icd10_code}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.date}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.diagno_type}</td>"
		+ "<td class='col-md-1-1 center'>{$T.al.diagnosed_by}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.comment}</td>"
		+ "<input id='chekbox{flag_count}' type='hidden' value='{$T.al.diagno_slave_id})' />"
		+ "</tr>{#/if}{#/for}";

var assesmentTempPreOpPrep = "{#foreach $T.assessmentList as al}<tr>"
	+ "<td>{count++}.</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagnosis}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagno_description}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.icd10_code}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.date}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagno_type}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagnosed_by}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.comment}</td>"
	+ "<td id='chkboxid' class='center'>"
	+ "<input id='chekbox{flag_count}' type='checkbox' onclick='uncheckAssmnt({flag_count++},{$T.al.diagno_slave_id})' style='margin-top: 2px;' />"
	+ "</td></tr>{#/for}";

var assesmentTempPreOpPrep1 = "{#foreach $T.assessmentList as al}<tr>"
	+ "<td>{count++}.</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagnosis}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagno_description}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.icd10_code}</td>"
	+ "<td class='col-md-1-1 center'>{$T.al.date}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagno_type}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.diagnosed_by}</td>"
	+ "<td class='col-md-2-1 center'>{$T.al.comment}</td>"
	+ "</tr>{#/for}";

var assesTmpConfmedPrescriptionCount = 1;

var docname = "";
function showAssessmentTemp() {

	count = 1;
	flag_count = 1;
	assesTmpConfmedPrescriptionCount = 1;
//	var treatmentId = $.trim($('#treatmentId').val());
	var treatmentId =$("#tr_Id").val();
	if(treatmentId == ""){
		//treatmentId = $.trim($('#tId').val());
		 treatmentId =$("#tr_Id").val();
	}
	var returnType = $("#pageName").val();
	var inputs = [];
//	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipdDischargeSumController/fetchAssessment",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					//alert("diagnosis="+res);
					var ajaxResponse = res;
					$("#assesmentDetails").html(ajaxResponse);
					var testObj = res;//eval('(' + ajaxResponse + ')');

					/*
					 * docname = $("#doctName").val(); alert("doc name
					 * is="+docname); $("#doctNameAgain").val(docname);
					 */
					
					enableAsmntTextBoxes('Provisional');

					count = 1;
					$("#assesmentContentProvisional").setTemplate(
							assesmentTempProvisional);
					$("#assesmentContentProvisional").processTemplate(testObj);

					count = 1;
					$("#assesmentContentConfirmaed").setTemplate(
							assesmentTempConfirmed);
					$("#assesmentContentConfirmaed").processTemplate(testObj);

					// for Prescription DR.Desk
					count = 1;
					$("#assesmentContentConfirmaedPrescription").setTemplate(
							assesmentTempConfirmedPrescription);
					$("#assesmentContentConfirmaedPrescription")
							.processTemplate(testObj);

					// Radiotherapy
					assesTmpConfmedPrescriptionCount = 1;
					$("#assesmentContentConfirmaedPrescriptionRadiotherapy")
							.setTemplate(
									assesmentTempConfirmedPrescriptionRadiotherapy);
					$("#assesmentContentConfirmaedPrescriptionRadiotherapy")
							.processTemplate(testObj);

					// for automatic discharge summary
					$("#assesmentContentProvisionalDischarge").setTemplate(
							assesmentTempProvisionalForDischargeSummary);
					$("#assesmentContentProvisionalDischarge").processTemplate(
							testObj);

					count = 1;
					$("#assesmentContentConfirmaedDischarge").setTemplate(
							assesmentTempConfirmedForDischargeSummary);
					$("#assesmentContentConfirmaedDischarge").processTemplate(
							testObj);
					count = 1;
					if(returnType == "OTOperationDetails"){
						$("#assesmentContentForPreOpPrep").setTemplate(
								assesmentTempPreOpPrep1);
						$("#assesmentContentForPreOpPrep").processTemplate(testObj);
					}else{
						$("#assesmentContentForPreOpPrep").setTemplate(
								assesmentTempPreOpPrep);
						$("#assesmentContentForPreOpPrep").processTemplate(testObj);	
					}
					
					userAccess();
				}
			});

	// disableAsmntTextBoxes();
	// $("#queryType").val('update');
}
/*....................................................................*/

/*function fetchAddIPDHistory() {
count = 1;
flag_count = 1;
assesTmpConfmedPrescriptionCount = 1;
//var treatmentId = $.trim($('#treatmentId').val());
var tretID =$("#tr_Id").val();
//alert("treatmentId="+tretID);
if(treatmentId == ""){
	//treatmentId = $.trim($('#tId').val());
	tretID =$("#tr_Id").val();
}
var returnType = $("#pageName").val();
var inputs = [];
inputs.push('action=fetchAddIPDHistory');
inputs.push('tretID=' + tretID);
var str = inputs.join('&');
jQuery
		.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(res) {
				alert("response="+res);
				var ajaxResponse = res;
				$("#historyDetails").html(ajaxResponse);
				var testObj = eval('(' + ajaxResponse + ')');

				
				 * docname = $("#doctName").val(); alert("doc name
				 * is="+docname); $("#doctNameAgain").val(docname);
				 
				
				enableAsmntTextBoxes('Provisional');

				count = 1;
				$("#assesmentContentProvisional").setTemplate(
						assesmentTempProvisional);
				$("#assesmentContentProvisional").processTemplate(testObj);

				count = 1;
				$("#assesmentContentConfirmaed").setTemplate(
						assesmentTempConfirmed);
				$("#assesmentContentConfirmaed").processTemplate(testObj);

				// for Prescription DR.Desk
				count = 1;
				$("#assesmentContentConfirmaedPrescription").setTemplate(
						assesmentTempConfirmedPrescription);
				$("#assesmentContentConfirmaedPrescription")
						.processTemplate(testObj);

				// Radiotherapy
				assesTmpConfmedPrescriptionCount = 1;
				$("#assesmentContentConfirmaedPrescriptionRadiotherapy")
						.setTemplate(
								assesmentTempConfirmedPrescriptionRadiotherapy);
				$("#assesmentContentConfirmaedPrescriptionRadiotherapy")
						.processTemplate(testObj);

				// for automatic discharge summary
				$("#assesmentContentProvisionalDischarge").setTemplate(
						assesmentTempProvisionalForDischargeSummary);
				$("#assesmentContentProvisionalDischarge").processTemplate(
						testObj);

				count = 1;
				$("#assesmentContentConfirmaedDischarge").setTemplate(
						assesmentTempConfirmedForDischargeSummary);
				$("#assesmentContentConfirmaedDischarge").processTemplate(
						testObj);
				count = 1;
				if(returnType == "OTOperationDetails"){
					$("#assesmentContentForPreOpPrep").setTemplate(
							assesmentTempPreOpPrep1);
					$("#assesmentContentForPreOpPrep").processTemplate(testObj);
				}else{
					$("#assesmentContentForPreOpPrep").setTemplate(
							assesmentTempPreOpPrep);
					$("#assesmentContentForPreOpPrep").processTemplate(testObj);	
				}
				
				userAccess();
			}
		});

// disableAsmntTextBoxes();
// $("#queryType").val('update');
}
*/
/*....................................................................*/

function showAssessmentTemplate(treatID) {

	count = 1;
	flag_count = 1;
	assesTmpConfmedPrescriptionCount = 1;
	var treatmentId = treatID;
	var inputs = [];
	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			var ajaxResponse = res;
			$("#assesmentDetails").html(ajaxResponse);
			var testObj = eval('(' + ajaxResponse + ')');

			$("#assesmentProvisional").setTemplate(assesmentTempProvisional);
			$("#assesmentProvisional").processTemplate(testObj);

			count = 1;
			$("#assesmentConfirmaed").setTemplate(assesmentTempConfirmed);
			$("#assesmentConfirmaed").processTemplate(testObj);

			// for Prescription DR.Desk
			count = 1;
			$("#assesmentContentConfirmaedPrescription").setTemplate(
					assesmentTempConfirmedPrescription);
			$("#assesmentContentConfirmaedPrescription").processTemplate(
					testObj);
			// Radiotherapy
			$("#assesmentContentConfirmaedPrescriptionRadiotherapy")
					.processTemplate(testObj);
		}
	});

	// disableAsmntTextBoxes();saveStudy
	// $("#queryType").val('update');
}

/*
 * Author : nIKHIL Date : 6/10/2014; purpose : To check uncheck list checkbox,
 * Assessmnet tab on OPDDoctorsDesk2.jsp;
 */
function uncheckAssmnt(chkCount, diagno_slave_id) {

	/*
	 * var ajaxResponse = $("#assesmentDetails").html(); var myArray =
	 * JSON.parse(ajaxResponse.decodeSpecialChars());
	 * 
	 * for ( var i = 0; i < myArray.assessmentList.length; i++) {
	 * 
	 * if (myArray.assessmentList[i].diagno_slave_id == diagno_slave_id) {
	 * continue; } else { var id = myArray.assessmentList[i].diagno_slave_id;
	 * $('#' + id).prop('checked', false); } }
	 */

	for ( var i = 1; i < flag_count; i++) {
		if (i == chkCount)
			continue;

		var id = 'chekbox' + i;
		$('#' + id).prop('checked', false);
	}

	$("#diagno_slave_id").val(diagno_slave_id);
}

/*
 * Author : nIKHIL; Date : 7-10-2014; Purpose : to edit Assesment on
 * OPDDoctorsDesk2.jsp
 */
function editAssesment(diagno_type) {

	var diagno_slave_id = $('#diagno_slave_id').val();
	if (diagno_type == "Provisional") {
		if (($("#assesmentContentProvisional").html()) == "") {
			alert("No Data to Edit Provisional Diagnosis");
			return;
		}
		if (diagno_slave_id == '0') {
			alert("Please check the Provisional Diagnosis CheckBox...");
			return;
		}
	} else {
		if (($("#assesmentContentConfirmaed").html()) == "") {
			alert("No Data to Edit Confirmed Diagnosis");
			return;
		}
		if (diagno_slave_id == '0') {
			alert("Please check the Confirmed Diagnosis CheckBox...");
			return;
		}
	}

	var ajaxResponse = $("#assesmentDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());

	for ( var i = 0; i < myArray.assessmentList.length; i++) {

		if (myArray.assessmentList[i].diagno_slave_id == diagno_slave_id) {
			myObj1 = myArray.assessmentList[i];
			break;
		}
	}

	$("#diagnosis").val(myObj1.diagnosis);
	$("#diagno_description").val(myObj1.diagno_description);
	// $('#divdiagnosis :input').prop('disabled', true);
	// $('#divdiagno_description :input').prop('disabled', true);
	// $('#diagnosis').prop('disabled', true);
	// $('#diagno_description').prop('disabled', true);
	document.getElementById("diagnosis").disabled = true;
	document.getElementById("diagno_description").disabled = true;
	/*
	 * $('#prep').prop('disabled', true); $('#name').prop('disabled', true);
	 */

	$("#icd10_code").val(myObj1.icd10_code);
	$("#assesmentDate").val(myObj1.date);
	$("#diagno_type").val(myObj1.diagno_type);
	$("#comment").val(myObj1.comment);
	$("#icd10_id_forAssmnt").val(myObj1.icd10_id);

	$("#queryType").val('update');
	/*
	 * $("#diagnosis,#diagno_description,#assesmentDate,#diagno_type,#comment")
	 * .removeAttr("disabled");
	 */
	SetFocus("diagnosis");
}

/*
 * Author : nIKHIL; Date : 7-10-2014; Purpose : to Delete Assessment on
 * OPDDoctorsDesk2.jsp
 */
function deleteAssessment(diagno_type) {

	var diagno_slave_id = $('#diagno_slave_id').val();
	if (diagno_type == "Provisional") {
		if (($("#assesmentContentProvisional").html()) == "") {
			alert("No Data to Delete Provisional Diagnosis");
			return;
		} else if (diagno_slave_id == '0') {
			alert("Please check the Provisional Diagnosis CheckBox...");
			return;
		}
	} else {
		if (($("#assesmentContentConfirmaed").html()) == "") {
			alert("No Data to Delete Confirmed Diagnosis");
			return;
		} else if (diagno_slave_id == '0') {
			alert("Please check the Confirmed Diagnosis CheckBox...");
			return;
		}
	}

	var r = confirm("Are you sure to delete assessment?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteAssessment');
		inputs.push('diagno_slave_id=' + diagno_slave_id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "TreatmentServlet",
			url : "ehat/otdata/deleteAssessment",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(res) {
				ajaxResponse = res;
				alert(res);
				showAssessmentTemp();
			}
		});
	}
}

// Author : nIKHIL; Date : 7/10/2014;
function setDiagnosisType(diagno_type) {

	var pageType = $('#pageType').val();
	var diagno_slave_id = $('#diagno_slave_id').val();
	if (diagno_type == "Provisional") {
		if (($("#assesmentContentConfirmaed").html()) == "") {
			alert("No Data to move to Provisional Diagnosis");
			return;
		} else if (diagno_slave_id == '0') {
			alert("Please check the Confirmed Diagnosis CheckBox...");
			return;
		}
	} else {
		if (($("#assesmentContentProvisional").html()) == "") {
			alert("No Data to move to Confirmed Diagnosis");
			return;
		} else if (diagno_slave_id == '0') {
			alert("Please check the Provisional Diagnosis CheckBox...");
			return;
		}
	}

	var ajaxResponse = $("#assesmentDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.assessmentList.length; i++) {
		if (myArray.assessmentList[i].diagno_slave_id == diagno_slave_id) {
			myObj1 = myArray.assessmentList[i];
			break;
		}
	}
	$("#diagnosis").val(myObj1.diagnosis);
	$("#diagno_description").val(myObj1.diagno_description);
	$("#icd10_code").val(myObj1.icd10_code);
	$("#assesmentDate").val(myObj1.date);
	$("#diagno_type").val(diagno_type);
	$("#comment").val(myObj1.comment);
	saveEditAssesmentOPD(pageType);
}
// Author : nIKHIL; Date : 15/10/2014;
function getDiagnosisDetails() {

	var diagnosisName = $("#diagnosis").val();

	if (diagnosisName == "" || diagnosisName == undefined) {
		diagnosisName = $("#diagno_description").val();
	}

	var itemNameArr = diagnosisName.split("_");

	if (itemNameArr[2] == undefined) {
		// alert("Please Enter Valid Test...");
		// $("#particulars").val("");
		return false;
	} else {
		$("#diagnosis").val(itemNameArr[0]);
		$("#diagno_description").val(itemNameArr[1]);
		$("#icd10_code").val(itemNameArr[2]);
		$("#icd10_id_forAssmnt").val(itemNameArr[3]);

		// $("#icd10_code").attr("disabled", "disabled");
	}

}

// Author : nIKHIL; Date : 15/10/2014;
function getIcd10_codeDetails() {
	var diagnosisName = $("#icd10_code").val();
	var itemNameArr = diagnosisName.split("_");
	if (itemNameArr[2] == undefined) {
		alert("Please Enter Valid Test...");
		$("#particulars").val("");
		return false;
	} else {
		$("#diagnosis").val(itemNameArr[2]);
		$("#diagno_description").val(itemNameArr[1]);
		$("#icd10_code").val(itemNameArr[0]);
		$("#icd10_id_forAssmnt").val(itemNameArr[3]);

		$("#diagnosis").attr("disabled", "disabled");
	}
}

function saveAllergyAlerts() {

	var allergyName = ($('#allergyName').val()).trim();
	var allergyType = $('#allergyType').val();
	var allergyReaction = $('#allergyReaction').val();
	var allergyDate = $('#allergyDate').val();
	var currentDate = $('#currentDate').val();
	var allergyNotes = ($('#allergyNotes').val()).trim();
	var allergyAlertsSlaveID = $('#allergyAlertsSlaveID').val();
	var pid = $('#pid').html();

	if (pid == "" || pid == undefined || pid == "undefined") {
		pid = $("#pid").val();
	}

	if (pid == "" || pid == undefined || pid == "undefined") {

		alert("Patient ID not fetched properly...");
		return false;
	}

	if (allergyName == "") {
		alert("Please enter Allergy name...");
		SetFocus("allergyName");
		return false;
	} /*else if (allergyName != "") {
		var regexp = /^([a-z-A-Z]+\s?)*$/;
		if (!regexp.test(allergyName)) {
			alert("Allergy Name should be of alphabates only!");
			$('#allergyName').focus();
			return false;
		}
	}*/

	if (allergyDate == "") {
		alert("please select fisrt observed date in the format:ex 'dd/mm/yyyy'");
		$('#allergyName').focus();
		return false;
	}
	/*
	 * if (allergyDate != "") { ValidateDateFormat(allergyDate); } else {
	 * alert("Please enter the date..."); SetFocus("allergyDate"); return; }
	 */

	if (allergyDate != "") {
		// var booleanValue = ValidateDateFormat(allergyDate);
		var booleanValue = checkPrevCurrDate('doctorDesk');
		// if booleanValue = false;
		if (!booleanValue) {
			alert("First observe date should be less than todays!!!");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=saveAllergyAlerts');
	inputs.push('allergyName=' + encodeURIComponent(allergyName));
	inputs.push('allergyType=' + allergyType);
	inputs.push('allergyReaction=' + allergyReaction);
	inputs.push('allergyDate=' + allergyDate);
	inputs.push('allergyNotes=' + allergyNotes);
	inputs.push('pid=' + pid);
	inputs.push('allergyAlertsSlaveID=' + allergyAlertsSlaveID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			alert(res);
			fetchAllergyAlerts();
			$('#allergyName').val('');
			$('#allergyType').val('0');
			$('#allergyReaction').val('0');
			$('#allergyDate').val('');
			$('#allergyNotes').val('');
			$('#allergyAlertsSlaveID').val('0');
			/*
			 * $(
			 * "#allergyName,#allergyType,#allergyReaction,#allergyDate,#allergyNotes")
			 * .attr("disabled", "disabled");
			 */
		}
	});
}

var allergyAlertsCount = 1;
var AllergyAlertsTemp = "{#foreach $T.allergyAlertsDTOList as al}<tr><td class='col-md-1-1 center'>{allergyAlertsCount}.</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.allergyName}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.allergyType}</td>"
		+ "<td class='col-md-2-1 center'>{$T.al.allergyReaction}</td>"
		+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>{$T.al.allergyNotes}</td>"
		+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>{$T.al.allergyDate}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "<input type='checkbox' id='checkbox{allergyAlertsCount}' onclick='unCheckallergyAlerts({allergyAlertsCount++},{$T.al.allergyAlertsSlaveID})' style='margin-top: 2px;' />"
		+ "</td></tr>{#/for}";

var allergyAlertsPrescriptionCount = 1;
var AllergyAlertsPrescriptionTemp = "{#foreach $T.allergyAlertsDTOList as al}<tr><td class='col-md-1-1 center'>{allergyAlertsPrescriptionCount++}.</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.allergyName}</td>"
		+ "<td class='col-md-3-1 center'>{$T.al.allergyType}</td></tr>{#/for}";

var AllergyAlertsCoverSheetTemp = "{#foreach $T.allergyAlertsDTOList as al}<tr><td class='col-md-1-1 TextFont'>{allergyAlertsPrescriptionCount++}.</td>"
		+ "<td class='col-md-8-1 TextFont'>{$T.al.allergyName}</td>"
		+ "<td class='col-md-2-1 TextFont' style='padding-left: 15px;'>{$T.al.allergyDate}</td>"
		+ "</tr>{#/for}";

function fetchAllergyAlerts() {
	
	var pid = $('#pid').html();
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	
	
	if (pid == "" || undefined == pid) {
		pid = $("#pid").val();
	}
	
	if (pid == "" || undefined == pid) {
		
		alert("Patient ID not fetched properly Allergy alerts...");
		return;
	}
	var inputs = [];
	inputs.push('action=fetchAllergyAlerts');
	inputs.push('treatmentId=' + treatmentId);
	//inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "TreatmentServlet",
				//url : "ehat/otdata/fetchAllergyAlerts",
				url : "ehat/opdClinicalEvaluation/fetchAllAllergyAlerts",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#allergyAlertsDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var AllergyAlertsTempHtml = "";
					var AllergyAlertsPrescriptionTempHtml = "";
					var AllergyAlertsCoverSheetHtml = "";

					var allergyTypeText = "";
					var allergyReactionText = "";

					allergyAlertsCount = 1;
					allergyAlertsPrescriptionCount = 1;

					if (testObj.allergyAlertsDTOList.length > 0) {

						for ( var int = 0; int < testObj.allergyAlertsDTOList.length; int++) {

							if ((testObj.allergyAlertsDTOList[int].allergyType) == "0") {
								allergyTypeText = "---";
							} else {
								allergyTypeText = $(
										"#allergyType option[value='"
												+ testObj.allergyAlertsDTOList[int].allergyType
												+ "']").text();
							}

							if ((testObj.allergyAlertsDTOList[int].allergyReaction) == "0") {
								allergyReactionText = "---";
							} else {
								allergyReactionText = $(
										"#allergyReaction option[value='"
												+ testObj.allergyAlertsDTOList[int].allergyReaction
												+ "']").text();
							}
							
							// AllergyAlertsTempHtml
							AllergyAlertsTempHtml = AllergyAlertsTempHtml
									+ "<tr><td class='col-md-1-1 center TextFont'>"
									+ allergyAlertsCount
									+ "</td>"
									+ "<td class='col-md-2-1 center TextFont'>"
									+ testObj.allergyAlertsDTOList[int].allergyName
									+ "</td>"
									+ "<td class='col-md-2-1 center TextFont'>"
									+ allergyTypeText
									+ "</td>"
									+ "<td class='col-md-2-1 center TextFont'>"
									+ allergyReactionText
									+ "</td>"
									+ "<td class='col-md-3-1 center TextFont' style='padding-left: 15px;'>"
									+ testObj.allergyAlertsDTOList[int].allergyNotes
									+ "</td>"
									+ "<td class='col-md-2-1 center TextFont' style='padding-left: 15px;'>"
									+ testObj.allergyAlertsDTOList[int].allergyDate
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ "<input type='checkbox' style='margin-top: 2px;' id='checkbox"+allergyAlertsCount+"'"
									+ " onclick='unCheckallergyAlerts("
									+ (allergyAlertsCount++)
									+ ","
									+ (testObj.allergyAlertsDTOList[int].allergyAlertsSlaveID)
									+ ")' />" + "</td></tr>";
							
							// AllergyAlertsPrescriptionTempHtml
							AllergyAlertsPrescriptionTempHtml = AllergyAlertsPrescriptionTempHtml
									+ "<tr><td class='col-md-2-1 TextFont'>"
									+ (allergyAlertsPrescriptionCount)
									+ "</td>"
									+ "<td class='col-md-7-1 TextFont'>"
									+ testObj.allergyAlertsDTOList[int].allergyName
									+ "</td>"
									+ "<td class='col-md-2-1 TextFont'>"
									+ allergyTypeText + "</td></tr>";

							// AllergyAlertsCoverSheetHtml
							AllergyAlertsCoverSheetHtml = AllergyAlertsCoverSheetHtml
									+ "<tr><td class='col-md-1-1 TextFont'>"
									+ (allergyAlertsPrescriptionCount++)
									+ "</td>"
									+ "<td class='col-md-8-1 TextFont'>"
									+ testObj.allergyAlertsDTOList[int].allergyName
									+ "</td>"
									+ "<td class='col-md-2-1 TextFont' style='padding-left: 15px;'>"
									+ testObj.allergyAlertsDTOList[int].allergyDate
									+ "</td></tr>";
							
							//var aller = (testObj.allergyAlertsDTOList[int].allergyName);		
							
						}
					}
					
					
					
					$("#allergyAlertsSlaveID").val("0");
					$('#allergyAlertsContent').html(AllergyAlertsTempHtml);
					$('#allergyAlertsPrescriptionContent').html(
							AllergyAlertsPrescriptionTempHtml);
					$('#allergyAlertsCoverSheetTemp').html(
							AllergyAlertsCoverSheetHtml);
					
					setTimeout(function(){
						userAccess();
						$("#AlertsAllergiesCloseButton").prop('disabled',false);
					},100);
				}
			});
	
}

function enableAllergyTextBoxes() {
	$('#allergyName').val('');
	$('#allergyType').val('0');
	$('#allergyReaction').val('0');
	$('#allergyDate').val('');
	$('#allergyNotes').val('');
	$('#allergyAlertsSlaveID').val('0');
	$("#allergyName,#allergyType,#allergyReaction,#allergyDate,#allergyNotes")
			.removeAttr("disabled");
	for ( var i = 1; i < allergyAlertsCount; i++) {
		$('#checkbox' + i).prop('checked', false);
	}
	var prevtr = $('#prevtr').val();
	
	if(prevtr=="previousTreatmentOPDER"){
		setTimeout(
				function() {
					$("#Alerts_Allergies *").prop('disabled',true);  //for Alerts_Allergies pop up
		},100);
	}
	
}

function editAllergyAlerts() {
	if (($("#allergyAlertsContent").html()) == "") {
		alert("No Data to Edit Allergy Alerts...");
		return;
	}
	var allergyAlertsSlaveID = $('#allergyAlertsSlaveID').val();
	if (allergyAlertsSlaveID == "0" || allergyAlertsSlaveID == undefined) {
		alert("Please check the checkbox to edit Allergy Alerts...");
		return;
	}
	$("#allergyName,#allergyType,#allergyReaction,#allergyDate,#allergyNotes")
			.removeAttr("disabled");
	var ajaxResponse = $("#allergyAlertsDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());

	for ( var i = 0; i < myArray.allergyAlertsDTOList.length; i++) {
		if (myArray.allergyAlertsDTOList[i].allergyAlertsSlaveID == allergyAlertsSlaveID) {
			myObj1 = myArray.allergyAlertsDTOList[i];
			break;
		}
	}
	$('#allergyName').val(myObj1.allergyName);
	$('#allergyType').val(myObj1.allergyType);
	$('#allergyReaction').val(myObj1.allergyReaction);
	$('#allergyDate').val(myObj1.allergyDate);
	$('#allergyNotes').val(myObj1.allergyNotes);

	SetFocus("allergyName");
}

function deleteAllergyAlerts() {
	if (($("#allergyAlertsContent").html()) == "") {
		alert("No Data to Edit Allergy Alerts...");
		return;
	}
	var allergyAlertsSlaveID = $('#allergyAlertsSlaveID').val();
	if (allergyAlertsSlaveID == 0) {
		alert("Please check the checkbox to delete Allergy Alerts...");
		return;
	}
	var inputs = [];
	inputs.push('action=deleteAllergyAlerts');
	inputs.push('allergyAlertsSlaveID=' + allergyAlertsSlaveID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					ajaxResponse = res;
					alert(res);
					fetchAllergyAlerts();
					$('#allergyName').val('');
					$('#allergyType').val('0');
					$('#allergyReaction').val('0');
					$('#allergyDate').val('');
					$('#allergyNotes').val('');
					$('#allergyAlertsSlaveID').val('0');
					$(
							"#allergyName,#allergyType,#allergyReaction,#allergyDate,#allergyNotes")
							.prop("disabled", true);
				}
			});
}

function unCheckallergyAlerts(rowCount, allergyAlertsSlaveID) {
	for ( var i = 1; i < allergyAlertsCount; i++) {
		if (i == rowCount)
			continue;

		var id = 'checkbox' + i;
		$('#' + id).prop('checked', false);
	}
	$("#allergyAlertsSlaveID").val(allergyAlertsSlaveID);
}

/* new Auto Suggestion Prescription */
function setPrescriptionAutocompleteNameID(inputID, onloadTempVar) {
	try {
		var prep = ($("#prep").val()).trim();
		var findingName = ($("#" + inputID).val()).trim();

		// doc prep template
		if (onloadTempVar == "DoctorDesk_DocTempPopup") {
			$("#medicineIDDoc").val("0");
			prep = ($("#prepDoc").val()).trim();
		}else if(onloadTempVar == "ipd") {
			$("#medicineIDDoca").val("0");
			prep = ($("#prepDoca").val()).trim();
		} else {
			$("#medicineID").val("0");
		}

		// if (prep == 0) {
		// alert("Please select prep.");
		// return false;
		// }

		var parameterFetchMedicine = "NORMAL";
		if ($("#paediatricsDocCheckBox").prop("checked"))
			parameterFetchMedicine = "PAEDIA_DOC_CHECKBOX";

		// var resultData = [];
		var auto = "Prescription";
		var inputs = [];
		inputs.push('auto=' + auto);
		inputs.push('q=' + findingName);
		inputs.push('parameterFetchMedicine=' + parameterFetchMedicine);
		inputs.push('prep=' + prep);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AutoSuggetionServlet",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];
				availableTags = r.split("\n");

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("___");
					var idValue = (arrValue[1]);
					var name = arrValue[0];
					resultData.push({
						ID : idValue,
						Name : name
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';
				}

				$("#divTag" + inputID + " .typeahead").html(template);

				if (onloadTempVar != "onLoad") {
					if ($("#medicineNotAvailableCheckbox").prop("checked")){
						// No need to show autosuggestion 
					}else{
						$("#divTag" + inputID + " .typeahead").show();
					}
				}

				setTimeout(function() {
					$("#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});

					$("#" + inputID).data('typeahead').source = resultData;

				}, 100);

			}
		});

		function displayResult(item) {

			var content = item.value.split("_");
			var strength = $.trim(content[1]);
			var fixed_dose = $.trim(content[4]);
			var strengthSplit = strength.split(" ");
			var strength1 = strengthSplit[0];
			// doc prep template
			if (onloadTempVar == "DoctorDesk_DocTempPopup") {
				$("#medicineIDDoc").val(content[0]);
				$("#strengthDoc").val(strength);
				$("#unitDoc").val(content[2]);
				if (prep == "0") {
					$("#prepDoc").val(content[5]);
				}
				SetFocus("doseDoc");//Touheed by ysk issue enter and select issue solved
			} else if(onloadTempVar == "ipd"){
				$("#medicineIDDoca").val(content[0]);
				$("#strengthDoca").val(strength);
				$("#unitDoca").val(content[2]);
				if (prep == "0") {
					$("#prepDoca").val(content[5]);
				}
				SetFocus("doseDoca");//Touheed by ysk issue enter and select issue solved
			}else {
				var prepipd=parseInt(content[5]);
				$("#medicineID").val(content[0]);
				$("#strength").val(strength);
				$("#unit").val(content[2]);
				if (prep == "0") {
					$("#prep").val(prepipd);
				}
				SetFocus("dose");//Touheed by ysk issue enter and select issue solved
			}

			setTimeout(function() {

				if (((item.text).indexOf("..")) != (-1)) {
					$("#" + inputID).val(((item.text).split("..")[1]).trim());
				}
				// fetch route according to prep ID
				fetchRouteTypeList(onloadTempVar);

			}, 100);
			
			var prepValue = $( "#prep option:selected" ).text();
			prepValue = prepValue.toLocaleLowerCase();
 
			// if (parameterFetchMedicine == "PAEDIA_DOC_CHECKBOX") {
			if ($("#paediatricsDocCheckBox").prop("checked")) {

				$("#paediatricsMedicineFlag").val("Y");
				$("#strength").val(content[9]);

				var frequency = $.trim(content[7]);
				var days = $.trim(content[8]);
				var capacity = $.trim(content[9]);
				try {
					$("#instruction").val(content[6]);
					$("#frequency").val(frequency);
					$("#days").val(days);
				} catch (e) {

				}
				if(fixed_dose == 0){
					fixed_dose = "";
				}
				if (fixed_dose != "") {
					$("#dose").val(fixed_dose);

					if (capacity != "") {
						$("#paediatricsMedicineCapacity").val(capacity);

						var finalQty = (parseFloat(fixed_dose) * parseFloat(frequency) * parseFloat(days)).toFixed(1);
						
						if(prepValue == "syrup" || prepValue == "syr"){
							finalQty = (finalQty / capacity);
							finalQty =  Math.ceil(finalQty);
						}else{
							finalQty =  Math.ceil(finalQty);
						}
						if (finalQty == 0 || isNaN(finalQty)) {
							finalQty = 1;
						}
						$("#qty").val(finalQty);
					} else {
						var finalQty =parseFloat(frequency) * parseFloat(days);
						if(prepValue == "syrup" || prepValue == "syr"){
							finalQty =  1;
							$("#qty").val(finalQty);
						}else{
							$("#qty").val(finalQty);
						}
					}
				} else {
					var strg = strength.split(" ");
					var dosePerDayPerKg = $.trim(content[3]);

					if ((dosePerDayPerKg != "")
							|| (dosePerDayPerKg != "undefined")) {

						var ajaxResponse = $("#PatientBMIInfoTableAjaxResp")
								.html();

						var jsObj = eval('(' + ajaxResponse + ')');

						if ((jsObj != undefined)
								&& ((jsObj.lsPatientBmi.length) > 0)) {

							var jsSpecificObj = jsObj.lsPatientBmi[((jsObj.lsPatientBmi.length) - 1)];
							
							if(jsSpecificObj.patient_weight == 0){
								alert("Please ,Firstly Insert Weight Of The Patient");
								return false;
							}
							// (wt. in kg) * (Dose in mg/Kg/Day).
							var finalDose = (parseFloat((jsSpecificObj.patient_weight) * (dosePerDayPerKg)).toFixed(1));
							
							// divide by frequency for single time dose.

							// Convert the mg dose to mL.
							 if(strg[0] > 0){
								 finalDose = (finalDose / (frequency * strg[0])).toFixed(1);
							 }else{
								 finalDose = (finalDose / (frequency * strg[0]));
							 }
							if(prepValue == "syrup" || prepValue == "syr"){
									finalDose = (finalDose * 2).toFixed() / 2;
							}
						
							if(prepValue == "tablet"){
							 	 var num = finalDose.toString();
							 	 if(num.includes(".")){
								 var checkNumber0 = 0;
								 var checkNumber1 = 0;
								 var floatval = num.split(".");
								 
								 if(floatval[1].length == 1){
									 floatval[1] =  (floatval[1]) + "0";
								 }else if(floatval[1].length >= 2){
									 floatval[1] = (floatval[1].charAt(0)).concat(floatval[1].charAt(1));
								 }
								 
								 if(floatval[1] >= 0 && floatval[1] <= 25){
									 checkNumber0 = 25 - floatval[1] ; 
										checkNumber1 = floatval[1] - 1 ; 
										if(checkNumber0 < checkNumber1){
											finalDose =   parseFloat(floatval[0]) + ".25" ;
										}else{
											finalDose =  floatval[0] ;
										}
									 
								 }else if(floatval[1] > 25 && floatval[1] <= 50){
									 checkNumber0 = 50 - floatval[1] ; 
									checkNumber1 = floatval[1] - 25 ; 
									if(checkNumber0 < checkNumber1){
										finalDose =   parseFloat(floatval[0]) + ".50" ;
									}else{
										finalDose =  floatval[0] + ".25" ;
									}
									 
								 }else if(floatval[1] > 50 && floatval[1] <= 75){
									 checkNumber0 = 75 - floatval[1] ; 
										checkNumber1 = floatval[1] - 50 ; 
										if(checkNumber0 < checkNumber1){
											finalDose =   parseFloat(floatval[0]) + ".75" ;
										}else{
											finalDose =  floatval[0] + ".50" ;
										}
									 
								 }else if(floatval[1] > 75 && floatval[1] <= 99){
									checkNumber0 = 99 - floatval[1] ; 
									checkNumber1 = floatval[1] - 75 ; 
									if(checkNumber0 < checkNumber1){
										finalDose =   parseFloat(floatval[0]) + 1 ;
										
									}else{
										finalDose =  floatval[0] + ".75" ;
									}
								 }
							 	}
							 }
							if(prepValue == "capsule"){
								finalDose =  Math.ceil(finalDose);
							}
							
							 if(isNaN(finalDose)){
								 finalDose = 0;
							 }
							$("#dose").val(finalDose);

							if (capacity != "") {
								$("#paediatricsMedicineCapacity").val(capacity);

								var finalQty = (parseFloat(finalDose) * parseFloat(frequency) * parseFloat(days)).toFixed(1);

										if(prepValue == "syrup" || prepValue == "syr"){
											finalQty = (finalQty / capacity);
											 finalQty =  Math.ceil(finalQty);
										}else{
										     finalQty =  Math.ceil(finalQty);
										}
								if (finalQty == 0 || isNaN(finalQty)) {
									finalQty = 1;
								}
								$("#qty").val(finalQty);

							} else {
								var ds = $("#dose").val();
								var finalQty = parseFloat(frequency)*parseFloat(ds)* parseFloat(days);
								if(prepValue.match("syrup") || prepValue.match("syr")){
									finalQty =  Math.ceil(finalQty);
									if(isNaN(finalQty)){
										finalQty = 1;
									 }
									$("#qty").val(finalQty);
								}
								if(finalQty == 0 || isNaN(finalQty)){
									finalQty == 1;
								}
								$("#qty").val(finalQty);
							}
							
						} else {
							$("#dose").val("0");
						}
					}
				}
				if(prepValue == "nebulization" || prepValue == "sachet" || prepValue == "respules" ){
					$("#qty").val(frequency * days);
				}
			}
			else{
				var dos = $("#dose").val();
				var fs = $("#frequency").val();
				var days = $("#days").val();
				if(dos == "" || dos == 0){
					dos = 1 ;
				} if( fs == "" || fs == 0){
					fs = 1 ;
				} if(days == "" || days == 0){
					days = 1;
				}
				var QuantityForNonPaediatrics = (parseFloat(fs) * parseFloat(dos) * parseFloat(days)).toFixed(1);
				QuantityForNonPaediatrics =  Math.ceil(QuantityForNonPaediatrics);
				if(QuantityForNonPaediatrics == 0 || isNaN(QuantityForNonPaediatrics)){
					QuantityForNonPaediatrics = 1;
				}
				$("#qty").val(QuantityForNonPaediatrics);
				
				if(prepValue == "nebulization" || prepValue == "sachet" || prepValue == "respules"){
					$("#qty").val(fs * days);
				}
			}
			if(prepValue == "injection" || prepValue == "syringe" || prepValue == "drop" || prepValue == "nasal drop" ||
					prepValue == "eye drop" || prepValue == "ear drop" || prepValue == "inhaler" ||
					prepValue == "mouth paint" || prepValue == "lotion" || prepValue == "cream"){
				$("#qty").val(1);
			}
			if(prepValue == "general" || prepValue == "pessaries"){
				$("#qty").val(1);
			}
			if($("#qty").val() == "NaN"){
				$("#qty").val(1);
			}
		}
	} catch (e) {

	}
}

function roundoff(floatval){
	var num = 0;
	num = Math.round(floatval * 10) / 10;
	console.log(num);
}

/* new Auto Suggestion Diagnosis */
function setDiagnosisAutocompleteNameDescpID(inputID, onload) {
	var resultData = [];
	var auto = "DiagnosisForAssessment";
	var findingName = $("#" + inputID).val();
	var data; // 'data=' + 'diagno_description'
	var radio = $("input:radio[name=ICD]:checked").val();  //Added By Pooja @Date:19 Apr 2018
	if (inputID == "diagnosis") {
		data = 'diagnosisName';
	}else if (inputID == "icd10_code") {
		data = 'icd10_code';
	} else {
		data = 'diagno_description';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('q=' + findingName);
	inputs.push('radio=' + radio);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AutoSuggetionServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var availableTags = [];
			availableTags = ajaxResponse.split("\n");
			if (availableTags.length == 0) {
				$("#EditFlag").val(0);
			}
			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("__");
				var idValue = (arrValue[2]);
				resultData.push({
					ID : idValue,
					Name : arrValue[0]
				});

				if (inputID == "diagnosis") { // Diagnosis name
					template = template + '<li data-value="' + arrValue[1]
							+ "_" + arrValue[2] + '" class=""><a href="#">'
							+ arrValue[0] + '</a></li>';
				}else if (inputID == "icd10_code") { //ICD Code
					template = template + '<li data-value="' + arrValue[2]
					+ "_" + arrValue[1] + '" class=""><a href="#">'
					+ arrValue[0] + '</a></li>';
				} else { // Diagnosis Description
					template = template + '<li data-value="' + arrValue[0]
							+ "_" + arrValue[2] + '" class=""><a href="#">'
							+ arrValue[1] + '</a></li>';
				}
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);

				if (onload != "onload") {
					$("#div" + inputID + " .typeahead").show();
				}

				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});

	function displayResult(item) {

		if (inputID == "diagnosis") {
			$("#diagnosis").val((item.text).trim());
			$("#diagno_description").val((item.value).trim().split("_")[0]);
			$("#icd10_code").val((item.value).trim().split("_")[1]);
			$("#EditFlag").val(1);
		}else if (inputID == "icd10_code") {
			
			$("#icd10_code").val((item.value).trim());
			$("#diagno_description").val((item.value).trim().split("_")[0]);			
			$("#diagnosis").val((item.value).trim().split("_")[1]);
			$("#EditFlag").val(1);
		} else {
			$("#diagno_description").val((item.text).trim());
			$("#diagnosis").val((item.value).trim().split("_")[0]);
			$("#icd10_code").val((item.value).trim().split("_")[1]);
			$("#EditFlag").val(1);
		}
		// $("#icd10_code").val((arrItem[1]).trim());

	}
}

// saveFetchParam = SAVE, FETCH
// works for save and fetch
function savefollowUpForPatient(saveFetchParam) {

	// if (saveFetchParam == undefined) {
	// return false;
	// }

	//new
	var PreTre = $("#PreTre").html();
	obj = eval('(' + PreTre + ')');

	var docId =  $("#userdr_id").val();
	var docName = $("#docName").html();
	var patientId = $("#pt_Id").val();
	//var patientName = $("#patientName").val();
	var patientName = $("#pname").text(); //added by sagar
	if(patientName==null||patientName==""){
		patientName =$("#patientName").text();
	}
	//alert(patientName);
	var treatmentId =$("#tr_Id").val();
	var prescriptionDetails = $("#prescriptionDetails").html();
	prescriptionDetails = eval('(' + prescriptionDetails + ')');
	var treatmentDocId =0;
	if(prescriptionDetails==undefined){
		treatmentDocId=0;
	}else{
		treatmentDocId = prescriptionDetails.treatment_doctor_Id;

	}

//old	
	
	/*var PreTre = $("#PreTre").html();
	obj = eval('(' + PreTre + ')');

	var docId = obj.objTreat.docter_id;
	var docName = $("#docName").html();
	var patientId = obj.pi;
	var patientName = obj.tit + "" + obj.fn + " " + obj.ln;
	var treatmentId = obj.trid;
	var prescriptionDetails = $("#prescriptionDetails").html();
	prescriptionDetails = eval('(' + prescriptionDetails + ')');
	var treatmentDocId = prescriptionDetails.treatment_doctor_Id;
*/
	/*
	 * var radioValue = ""; var DAY = $('input:radio[id=DAY]'); var WEEK =
	 * $('input:radio[id=WEEK]'); var MONTH = $('input:radio[id=MONTH]');
	 */
	var DWMSelect = "";
	var numberOf = $("#noOf").val();

	if (saveFetchParam == "SAVE") {

		/*
		 * if (DAY.is(':checked') == true) { radioValue = "DAY"; } else if
		 * (WEEK.is(':checked') == true) { radioValue = "WEEK"; } else if
		 * (MONTH.is(':checked') == true) { radioValue = "MONTH"; }
		 */

		DWMSelect = ($("#DWMSelect").val()).trim();
		if (DWMSelect == "") {
			alert("Please select Follow up: day, week or month...");
			return false;
		}

		if (numberOf == "") {
			return false;
		}

	}

	var inputs = [];
	inputs.push('action=savefollowUpForPatient');
	inputs.push('radioValue=' + DWMSelect);
	inputs.push('numberOf=' + numberOf);
	inputs.push('docId=' + docId);
	inputs.push('docName=' + docName);
	inputs.push('patientId=' + patientId);
	inputs.push('patientName=' + patientName);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('treatmentDocId=' + treatmentDocId);
	inputs.push('saveFetchParam=' + saveFetchParam);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					
				},
				success : function(r) {

					if (saveFetchParam == "SAVE") {
						ajaxResponse = r;
						alert(r);

						savefollowUpForPatient("FETCH");

					} else if (saveFetchParam == "FETCH") {

						var ajaxResponse = r;
						var jsObj = eval('(' + ajaxResponse + ')');

						if ((jsObj.liapp.length) > 0) {

							try {

								$("#DWMSelect").val(
										(jsObj.liapp[0].radioDayWeekMonth));

								$("#noOf").val(
										(jsObj.liapp[0].valueDayWeekMonth));

								$("#divfollow").html("");

								$("#divfollowDate").html(
										"Next follow up on: "
												+ (jsObj.liapp[0].appdt) + ".");

							} catch (e) {

							}
						}
					}
				}
			});
}

	function saveAdvice() {
		var treatmentId = ($("#tr_Id").val()).trim();// added by paras
	
	var adviceQueryType = ($("#adviceQueryType").val()).trim();
	var procedureType = ($("#selOTtype").val()).trim();
	var procedureGroup = ($("#department").val()).trim();
	var procedureName = ($("#selOTName").val()).trim();
	var indicationSurgery = ($("#indicationSurgery").val()).trim();
	var riskFactor1 = ($("#riskFactor1").val()).trim();
	var adviceDate = ($("#adviceDate").val()).trim();
	var radical = "";
	var palliative = "";
	if ($('#idRadical').is(':checked')) {
	    radical = "Y";
	}else{
	    radical = "N";
	}
	if ($('#idPalliative').is(':checked')) {
	    palliative = "Y";
	}else{
	    palliative = "N";
	}
	
	var inputs = [];
	inputs.push('action=saveAdvice');
	inputs.push('adviceQueryType=' + adviceQueryType);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('procedureType=' + procedureType);
	inputs.push('procedureGroup=' + procedureGroup);
	inputs.push('procedureName=' + procedureName);
	inputs.push('indicationSurgery=' + indicationSurgery);
	inputs.push('riskFactor1=' + riskFactor1);
	inputs.push('adviceDate=' + adviceDate);
	inputs.push('radical=' + radical);
	inputs.push('palliative=' + palliative);
	
	if (procedureType == "0" || procedureType == ""
			|| procedureType == undefined) { // update
		alert("Please select procedure type...");
		$("#selOTtype").focus();
		return false;
	}
	
	if (procedureGroup == "0" || procedureGroup == ""
			|| procedureGroup == undefined) { // update
		alert("Please select procedure group...");
		$("#department").focus();
		return false;
	}
	if (procedureName == "0" || procedureName == ""
			|| procedureName == undefined) { // update
		alert("Please select Procedure Name...");
		$("#selOTName").focus();
		return false;
	}
	if (adviceQueryType != "insert") { // update
		var adviceID = ($("#adviceID").val()).trim();
		inputs.push('adviceID=' + adviceID);
	}
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alert(r);
			fetchAdvice();
		}
	});
	newAdvice();}

function newAdvice() {

		$("#adviceQueryType").val("insert");
		$("#testIDDiv").hide();
		$("#adviceID").val("");
		$("#selOTtype").val("0");
		$("#department").val("0");
		$("#selOTName").val("0");
		$("#indicationSurgery").val("");
		$("#riskFactor1").val("");
		$("#idRadical").prop('checked', false);
	    $("#idPalliative").prop('checked', false);
		$("#adviceDate").val($("#currentDateForwardSlash2").val());

		/* todaysDefaultDate declared in OPDDoctorsDesk2.jsp */
		// $("#adviceDate").val($("#currentDate").val());
		//$("#adviceDate").val($("#currentDateForwardSlash").val());
	}


var adviceCount = 1;
var viewAdvicesTemp = "{#foreach $T.adviceDTOList as adviceDTOList}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{adviceCount}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.adviceDTOList.operationName}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.adviceDTOList.adviceDate}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='editAdvice({adviceCount++})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button id='adviceTempButton' class='btn btn-xs btn-success deleteUserAccess' value='DELETE' onClick='deleteAdvice({$T.adviceDTOList.adviceID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}";

var adviceCount = 1;
var viewAdvicesTemp2 = "{#foreach $T.adviceDTOList as adviceDTOList}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{adviceCount}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.adviceDTOList.operationName}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.adviceDTOList.adviceDate}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='editAdvice({adviceCount++})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		 + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		/*+ "<button id='adviceTempButton' class='btn btn-xs btn-success deleteUserAccess' value='DELETE' onClick='deleteAdvice({$T.adviceDTOList.adviceID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" */
		+ "</td>"  
		+ "</tr>"
		+ "{#/for}";

function fetchAdvice(callfrom) {
	adviceCount = 1;
	var inputs = [];
	inputs.push('action=fetchAdvice');
	//inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());
	inputs.push('treatmentId=' + ($("#tr_Id").val()).trim()); //added by paras
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			// alert(r);
			ajaxResponse = r;
			$("#adviceDetails").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			if(callfrom=="previous"){
			$("#viewAdvicesTemp").setTemplate(viewAdvicesTemp2);
			$("#viewAdvicesTemp").processTemplate(obj);
			}else{
				$("#viewAdvicesTemp").setTemplate(viewAdvicesTemp);
				$("#viewAdvicesTemp").processTemplate(obj);
				
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function editAdvice(adviceRowNum) {
	var ajaxResponse = $("#adviceDetails").html();
//	alert("ajaxResponse "+ajaxResponse);
	var myArray = eval('(' + ajaxResponse + ')');
//	alert("radical "+myArray.adviceDTOList[0].radical);
	if(myArray.adviceDTOList[0].radical == "Y"){
		$("#idRadical").attr('checked', true);
	}
	if(myArray.adviceDTOList[0].palliative == "Y"){
		$("#idPalliative").attr('checked', true);
	}
	adviceRowNum = adviceRowNum - 1;
	myObj1 = myArray.adviceDTOList[adviceRowNum];
	
	$("#testIDDiv").show();
	$("#adviceID").val(myObj1.adviceID);
	$("#selOTtype").val(myObj1.procedureType);
	$("#department").val(myObj1.procedureGroup);
	getOperationName();
	setTimeout(function() {
		$("#selOTName").val(myObj1.procedureName);
		
	}, 100);
	$("#indicationSurgery").val(myObj1.indicationSurgery);
	$("#riskFactor1").val(myObj1.riskFactor);
	$("#adviceDate").val(myObj1.adviceDate);
	$("#adviceQueryType").val('update');
}

function deleteAdvice(adviceID) {
	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteAdvice');
		//inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());
		inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());//added by paras
		inputs.push('adviceID=' + adviceID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				alert(r);
				fetchAdvice();
			}
		});
	}
}

/* Start Report Instruction */
function enableAddUpdateReportInstruction() {
	$("#reportInstruction").val("");
	$("#reportInstructionID").val("0");
	$("#reportInstructionHindi").val("");
	$("#reportInstructionMarathi").val("");
	$("#reportInstructionOther1").val("");
	$("#reportInstructionOther2").val("");
	$("#reportInstructionOther3").val("");
	
	$("input[name='checkboxRI']:checked").each(function() {
		$(this).prop("checked", false);
	});
}

function saveReportInstruction() {

	var reportInstructionID = ($('#reportInstructionID').val()).trim();
	var reportInstructionEnglish = ($('#reportInstruction').val()).trim();
	if (reportInstructionEnglish == "") {
		alert("Please enter Instruction ...");
		SetFocus("reportInstruction");
		return;
	}

	var reportInstructionHindi = ($('#reportInstructionHindi').val()).trim();
	var reportInstructionMarathi = ($('#reportInstructionMarathi').val())
			.trim();
	var reportInstructionOther1 = ($('#reportInstructionOther1').val()).trim();
	var reportInstructionOther2 = ($('#reportInstructionOther2').val()).trim();
	var reportInstructionOther3 = ($('#reportInstructionOther3').val()).trim();

	var mandatoryInstFlag = "N";
	if ($("#mandatoryInstFlag").prop("checked"))
		mandatoryInstFlag = "Y";
	var unitId = $("#uids").val();
	var createdBy =  $("#userdr_id").val();
	/*var inputs = [];
	inputs.push('action=saveReportInstruction');
	inputs.push('reportInstructionID=' + reportInstructionID);
	inputs.push('reportInstruction=' + reportInstructionEnglish);
	inputs.push('reportInstructionHindi=' + reportInstructionHindi);
	inputs.push('reportInstructionMarathi=' + reportInstructionMarathi);
	inputs.push('reportInstructionOther1=' + reportInstructionOther1);
	inputs.push('reportInstructionOther2=' + reportInstructionOther2);
	inputs.push('reportInstructionOther3=' + reportInstructionOther3);
	inputs.push('mandatoryInstFlag=' + mandatoryInstFlag);

	var str = inputs.join('&');*/
	var dto ={
		"reportInstructionID":reportInstructionID,
		"reportInstruction":reportInstructionEnglish,
		"reportInstructionHindi":reportInstructionHindi,
		"reportInstructionMarathi":reportInstructionMarathi,
		"reportInstructionOther1":reportInstructionOther1,
		"reportInstructionOther2":reportInstructionOther2,
		"reportInstructionOther3":reportInstructionOther3,
		"mandatoryInstFlag":mandatoryInstFlag,
		"unitId":unitId,
		"createdBy":createdBy
	};
	jQuery.ajax({
		async : true,
		type : "POST",
		data : dto,
		url : " /ehat/ddinstruction/saveIndivisualInstruction", //Changed By Akshata
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			if(res>0)
			{alert("Insturction Saved!")}			
			//fetchReportInstruction();
			getListOfIndivisualInstruction();
			$('#reportInstructionID').val("0");
			$('#reportInstruction').val("");

			$('#reportInstructionHindi').val("");
			$('#reportInstructionMarathi').val("");
			$('#reportInstructionOther1').val("");
			$('#reportInstructionOther2').val("");
			$('#reportInstructionOther3').val("");
			$("#mandatoryInstFlag").prop('checked', false);

		}
	});
}

var reportInstructionCount = 1;
var reportInstructionTemp = "{#foreach $T.reportInstructionDTOList as ril}<tr>"
		+ "<td class='col-md-1-1'>{reportInstructionCount++}.</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstruction}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionHindi}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionMarathi}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionOther1}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionOther2}</td>"
		+ "<td class='col-md-2-1'>{$T.ril.reportInstructionOther3}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "<input name='checkboxRI' id='{$T.ril.reportInstructionID}' type='checkbox' style='cursor: pointer' /></td>"
		+ "</tr>{#/for}";

var reportIndividualTreatmentInstructionTemp = "{#foreach $T.reportInstructionDTOList as ril}<tr>"
		+ "<td class='col-md-1-1 center'>{reportInstructionCount++}.</td>"
		+ "<td class='col-md-10-1'>{$T.ril.reportInstruction}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "{#if $T.ril.mandatoryInstFlag == 'N'}"
		+ "<input name='individualTreatmentInstructionCheckbox' id='ITIC_{$T.ril.reportInstructionID}' value='ITIC_{$T.ril.reportInstruction}' type='checkbox' style='cursor: pointer' />"
		+ "{#else}"
		+ "<input name='individualTreatmentInstructionCheckbox' id='ITIC_{$T.ril.reportInstructionID}' value='ITIC_{$T.ril.reportInstruction}' type='checkbox' disabled='disabled' checked='checked'/>"
		+ "</td>{#/if}</tr>{#/for}";

function fetchReportInstruction() {
	reportInstructionCount = 1;
	var inputs = [];
	inputs.push('action=fetchReportInstruction');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			$("#ReportInstructionDetails").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');

			// Instruction Popup
			$("#ReportInstructionTemp").setTemplate(reportInstructionTemp);
			$("#ReportInstructionTemp").processTemplate(obj);

			reportInstructionCount = 1;
			// Instruction Tab
			$("#TreatmentInstructionTemp").setTemplate(
					reportIndividualTreatmentInstructionTemp);
			$("#TreatmentInstructionTemp").processTemplate(obj);

			// Radiotherapy Instruction pop
			reportInstructionCount = 1;
			$("#TreatmentInstructionTempRadio").setTemplate(
					reportIndividualTreatmentInstructionTemp);
			$("#TreatmentInstructionTempRadio").processTemplate(obj);

			/* To check the CheckBox based on Treatment */
			fetchIndividualTreatmentInstruction();
		}
	});
}

function editReportInstruction() {

	if (($("#ReportInstructionTemp").html()) == "") {
		alert("No Data to Edit Instruction...");
		enableAddUpdateReportInstruction();
		return;
	}

	var reportInstructionID = new Array();
	var tempReportInstructionID = 0;
	$("input[name='instructioneditdelete']:checked").each(function() {//Added By Annapurna
		reportInstructionID.push($(this).val());
		tempReportInstructionID = ($(this).attr('id')).trim();
	});
 
	if ((reportInstructionID.length) == 0) {
		alert("Please check the checkbox to edit Instructions...");
		enableAddUpdateReportInstruction();
		return;
	}

	if (reportInstructionID.length > 1) {
		alert("Please Select Single Checkbox");
		enableAddUpdateReportInstruction();
		return false;
	}

	/*var ajaxResponse = $("#ReportInstructionDetails").html();
	//var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	var myArray = eval('(' + ajaxResponse + ')');
	var obj = "";
	for ( var i = 0; i < myArray.getListOfOPDInstructionDTO.length; i++) {
		if (myArray.getListOfOPDInstructionDTO[i].reportInstructionID == tempReportInstructionID) {
			obj = myArray.getListOfOPDInstructionDTO[i];
			break;
		}
	}*/
	// Added By Annapurna 
	
	var x = reportInstructionID.toString();
	
	//alert("x... "+x)

	$("#reportInstructionID").val($("#instructionSlaveId"+x).val());
	$("#reportInstruction").val($("#reportInstructiondata"+x).val());
	$("#reportInstructionHindi").val($("#reportInstructionHindidata"+x).val());
	$("#reportInstructionMarathi").val($("#reportInstructionMarathidata"+x).val());
	$("#reportInstructionOther1").val($("#reportInstructionOther1data"+x).val());
	$("#reportInstructionOther2").val($("#reportInstructionOther2data"+x).val());
	$("#reportInstructionOther3").val($("#reportInstructionOther3data"+x).val());

	if ((obj.mandatoryInstFlag) == "Y") {
		
		$("#mandatoryInstFlag").prop('checked', true);
	} else {
		$("#mandatoryInstFlag").prop('checked', false);
	}
}

function deleteReportInstruction() {
	

	if (($("#ReportInstructionTemp").html()) == "") {
		alert("No Data to Delete Instruction...");
		return;
	}
	
	//Added By Annapurna
     var reportInstructionIDs = new Array();
	$("input[name='instructioneditdelete']:checked").each(function() {
		reportInstructionIDs.push($("#instructionSlaveId"+$(this).val()).val());
		tempReportInstructionIDs = ($(this).attr('id')).trim();
	});

	/*//commented By Annapurna
	 * var reportInstructionIDs = new Array();
	$("input[name='checkboxRI']:checked").each(function() {
		reportInstructionIDs.push(($(this).attr('id')).trim());
	});
*/
	if ((reportInstructionIDs.length) == 0) {
		alert("Please check the checkbox to delete Instructions...");
		return;
	}
//Added By Annapurna
	 var x = reportInstructionIDs.toString();
		
		alert("x... "+x)
		$("#reportInstructionIDs").val($("#instructionSlaveId"+x).val());
		
		

	// reportInstructionIDs>20,21
	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		/*inputs.push('action=deleteReportInstruction');
		inputs.push('reportInstructionIDs=' + reportInstructionIDs);
		var str = inputs.join('&');*/
		var userId =$("#userId").val();
		//$("#userId").val($("#userdr_id"+x).val());
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				"instructionIds":x,
				"userId":userId	
			},
			url : " ./ehat/ddinstruction/deleteIndivisualInstruction",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				alert("Deleted Instructions!");
	        	//Added By Annapurna
				getIndivisualInstructionList();
				
			}
		});
	}
}
/* End Report Instruction */

/* Start ParentChildAdminInstruction = PCAdminInstruction */
var i = 1;
function createPCAdminInstruction() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtMedicine = $("#txtMedicine" + rowCount + "").val();
		var txtQty = $("#txtQty" + rowCount + "").val();

		if (txtMedicine == "" && txtQty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;
	var divId = "PCAdminInstruction" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("TableBodyPCAdminInstructionTempName").appendChild(
			x);
	document.getElementById(divId).innerHTML = "<td>"
			+ (rowCount)
			+ "</td>"
			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='English' id='txtMedicine"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='Marathi' id='txtMedicineM"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='Hindi' id='txtMedicineH"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='other 1' id='txtMedicine1ol"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='other 2' id='txtMedicine2ol"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-2-1 center'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='other 3' id='txtMedicine3ol"
			+ rowCount + "' /></td>"

			+ "<td class='col-sm-1-1 center'>"
			+ "<input type='checkbox' name='checkboxPCAI" + rowCount
			+ "' /></td>" + "<input type='hidden' value='0'  id='idskco"
			+ rowCount + "' name='idskco" + rowCount + "' />" + "</tr>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

}

function removePCAdminInstruction(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	// var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {
		var $radios = $('input:checkbox[name=checkboxPCAI' + n + ']');
		if ($radios.is(':checked') == true) {
			// allVals.push($radios.val());
			$("#PCAdminInstruction" + n).remove();
			// remVals.push(n);
		}
	}
}

/* ParentChildAdminInstruction OPDDoctorsDesk */
function newTopicPCAdminInstruction() {
	$("#TableBodyPCAdminInstructionTempName").html("");
	$("#selPCAdminInstructionTempName").val(0);
	$("#inputPCAdminInstructionTempName").val("");
	$("#txtTempId").val(0);
	$("#addRowCount").val("0");
	$("#RowCount").val("0");
	createPCAdminInstruction();
	$("#addRowCount").val("1");
	$("#RowCount").val("1");
	$("#btnSave").val("Save Now");
}

function savePCAdminInstruction(pageType) {

	if (pageType == "instructions") {
		// var status = $('input:radio[name=radioStatus]:checked').val();
		var status = "Y";
		if (status == null || status == "") {
			alert("Please Set Instruction Status.");
			return false;
		}
		var queryType = $("#btnSave").val();
		var idTempMast = $("#selPCAdminInstructionTempName").val();
		var tempName = $.trim($("#inputPCAdminInstructionTempName").val());
		if (tempName == null || tempName == "") {
			alert("Please Enter Topic Name.");
			return false;
		}

		var objSKC = 0;
		objSKC = {
			skcli : []
		};

		var rowCount = $("#RowCount").val();
		var count = 0;
		if (rowCount == 0 && status == 'Y') {
			// alert("You can not save empty fields.");
			// return false;
		}

		for ( var i = 1; i <= rowCount; i++) {

			count++;

			var txtMedicine = $.trim($("#txtMedicine" + count + "").val());

			if (queryType != "Update Now") {
				if (txtMedicine == "") {
					alert("You can not save empty field");
					$.trim($("#txtMedicine" + count + "").focus());
					return false;
				}
			}

			var txtMedicineM = $.trim($("#txtMedicineM" + count + "").val());
			var txtMedicineH = $.trim($("#txtMedicineH" + count + "").val());
			var txtMedicine1ol = $
					.trim($("#txtMedicine1ol" + count + "").val());
			var txtMedicine2ol = $
					.trim($("#txtMedicine2ol" + count + "").val());
			var txtMedicine3ol = $
					.trim($("#txtMedicine3ol" + count + "").val());

			var txtidskco = "";
			if (queryType == "Save Now") {
				txtidskco = 0;
			} else {
				txtidskco = $("#idskco" + count + "").val();
			}

			if (txtMedicine != undefined) {
				objSKC.skcli.push({
					"idskco" : txtidskco,
					"itnm" : txtMedicine,
					"idskm" : idTempMast,
					"item_nameM" : txtMedicineM,
					"item_nameH" : txtMedicineH,
					"item_name1ol" : txtMedicine1ol,
					"item_name2ol" : txtMedicine2ol,
					"item_name3ol" : txtMedicine3ol,
				});
			}
		}

		if (queryType != "Update Now") {
			if (objSKC.skcli.length == 0 && status == 'Y') {
				alert("You can not save empty fields.");
				return false;
			}
		}

		objSKC = JSON.stringify(objSKC);
		var inputs = [];
		inputs.push('action=saveSKDetail');
		inputs.push('queryType=' + queryType);
		inputs.push('pageType=' + pageType);
		inputs.push('objSKC=' + objSKC);
		inputs.push('tempName=' + encodeURIComponent(tempName));
		inputs.push('idTempMast=' + idTempMast);
		inputs.push('status=' + status);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				fetchSurgicalKitNm('instructions');
				fetchPCTreatmentInstruction();
			}
		});
	}
}

function refreshPCTreatmentInstruction() {
	$("#PCTreatmentInstructionNameID").val("0");
	$("#PCTreatmentInstructionName").val("");
}

function savePCTreatmentInstruction() {

	var PCTreatmentInstructionNameID = ($("#PCTreatmentInstructionNameID")
			.val()).trim();
//	var treatmentId = ($("#treatmentId").val()).trim();
	var treatmentId = ($("#tr_Id").val()).trim();

	if (PCTreatmentInstructionNameID == "0"
			|| PCTreatmentInstructionNameID == ""
			|| PCTreatmentInstructionNameID == undefined) {
		alert("Please select proper group Instruction...");
		return;
	}

	var alreadyPresent = false;
	$('#Table1PCTreatmentInstructionNameID tr').each(
			function() {
				var buttonValue = $(($(this).find('button[type=button]')))
						.prop('value');

				if (PCTreatmentInstructionNameID == buttonValue) {
					alreadyPresent = true;
				}
			});

	if (alreadyPresent) {
		alert("The Selected Instruction is already present...");
		refreshPCTreatmentInstruction();
		return;
	}

	var inputs = [];
	inputs.push('action=savePCTreatmentInstruction');
	inputs.push('PCTreatmentInstructionNameID=' + PCTreatmentInstructionNameID);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
		
			fetchPCTreatmentInstruction();
		}
	});
}

var Table2PCTICount = 0;
var Table2PCTreatmentInstructionNameIDTemp = "{#foreach $T.treatmentInstructionDTOList as til}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{++Table2PCTICount}.</td>"
		+ "<td class='col-sm-5-1 center' style='height: 21.5px;'>{$T.til.treatmentParentInstructionName}</td>"
		+ "<td class='col-sm-5-1 center' style='height: 21.5px;'>{$T.til.treatmentChildInstructionName}</td>"
		+ "</tr>{#/for}";

/* ParentChildTreatmentInstruction Treatment OPDDoctorsDesk */
function fetchPCTreatmentInstruction() {
	/* Enable Text box and reset ID */
	refreshPCTreatmentInstruction();

	Table2PCTICount = 0;
	var Table1PCTICount = 0;
//	var treatmentId = ($("#treatmentId").val()).trim();
	var treatmentId = ($("#tr_Id").val()).trim();
	var inputs = [];
	inputs.push('action=fetchPCTreatmentInstruction');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var obj = eval('(' + ajaxResponse + ')');

					/* Table1PCTreatmentInstructionNameID Template */
					var tempTreatmentParentInstructionID = 0;
					var Table1PCTreatmentInstructionNameID = "";
					var print = false;

					for ( var rowNum = 0; rowNum < (obj.treatmentInstructionDTOList.length); rowNum++) {

						/* Start Logic of Printing only Once */
						if (tempTreatmentParentInstructionID != (obj.treatmentInstructionDTOList[rowNum].treatmentParentInstructionID)) {
							tempTreatmentParentInstructionID = (obj.treatmentInstructionDTOList[rowNum].treatmentParentInstructionID);
							print = true;
						}

						if (print) {
							Table1PCTreatmentInstructionNameID = Table1PCTreatmentInstructionNameID
									+ "<tr>"
									+ "<td class='col-sm-1-1 center'>"
									+ (++Table1PCTICount)
									+ ".</td>"
									+ "<td class='col-sm-10-1 center'>"
									+ (obj.treatmentInstructionDTOList[rowNum].treatmentParentInstructionName)
									+ "</td>"
									+ "<td class='col-sm-1-1 center'>"
									+ "<button type='button' name='ptDeleteInstruction' class='btn btn-xs btn-danger deleteUserAccess' id='"
									+ (obj.treatmentInstructionDTOList[rowNum].treatmentInstructionID)
									+ "' value='"
									+ (obj.treatmentInstructionDTOList[rowNum].treatmentParentInstructionID)
									+ "' onclick='deletePCTreatmentInstruction(this.id)' disabled>"
									+ "<i class='fa fa-trash-o'></i></button>"
									+ "</td>" + "</tr>";

							print = false;
						}
						/* End Logic of Printing only Once */
					}
					$("#Table1PCTreatmentInstructionNameID").html(
							Table1PCTreatmentInstructionNameID);

					/* Table2PCTreatmentInstructionNameID Template */
					$("#Table2PCTreatmentInstructionNameID").setTemplate(
							Table2PCTreatmentInstructionNameIDTemp);
					$("#Table2PCTreatmentInstructionNameID").processTemplate(
							obj);
					setTimeout(function(){userAccess();},200);
				}
			});
}

function deletePCTreatmentInstruction(PCTreatmentInstructionID) {

	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {

		if (PCTreatmentInstructionID == "" || PCTreatmentInstructionID == "0"
				|| PCTreatmentInstructionID == undefined) {
			alert("ID not defiend properly... Internal Error");
			return;
		}

		var inputs = [];
		inputs.push('action=deletePCTreatmentInstruction');
		inputs.push('PCTreatmentInstructionID=' + PCTreatmentInstructionID);
		//inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());
		inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());

		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				alert(r);
				fetchPCTreatmentInstruction();
			}
		});
	}
}

function setPCTreatmentInstructionAutocomplete(inputID, onloadTempVar) {
	var resultData = [];
	var auto = "DoctorDesk";
	var data = "instruction";
	var findingName = $("#" + inputID).val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					$("#divTag" + inputID + " .typeahead").html(template);

					/*if (onloadTempVar != "onLoad") {
						$("#divTag" + inputID + " .typeahead").show();
					}*/

					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 100);
				}
			});

	function displayResult(item) {
		$("#PCTreatmentInstructionName").val((item.text).trim());
		$("#PCTreatmentInstructionNameID").val((item.value).trim());

	}
}

function saveIndividualTreatmentInstruction() {

	if (($("#TreatmentInstructionTemp").html()) == "") {
		alert("No Data to Save Instruction...");
		return;
	}

	var individualTreatmentInstructionCheckboxIDArray = new Array();

	$('#TreatmentInstructionTemp tr')
			.each(
					function() {
						var individualTreatmentInstructionCheckboxID = $(
								($(this)
										.find('input[name=individualTreatmentInstructionCheckbox]:checked')))
								.attr('id');

						if (individualTreatmentInstructionCheckboxID != undefined
								&& individualTreatmentInstructionCheckboxID != "0"
								&& individualTreatmentInstructionCheckboxID != "") {

							/* id=ITIC_13 */
							individualTreatmentInstructionCheckboxID = (individualTreatmentInstructionCheckboxID
									.split('_')[1]).trim();

							individualTreatmentInstructionCheckboxIDArray
									.push(individualTreatmentInstructionCheckboxID);
						}

					});

	if ((individualTreatmentInstructionCheckboxIDArray.length) == 0) {
		// alert("Please check the checkbox to save Instructions...");
		// return;
	}

	var inputs = [];
	inputs.push('action=saveIndividualTreatmentInstruction');
/*	inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());*/
	inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());
	inputs.push('individualTreatmentInstructionCheckboxIDArray='
			+ individualTreatmentInstructionCheckboxIDArray);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alert(r);
			fetchIndividualTreatmentInstruction();
		}
	});

}

function fetchIndividualTreatmentInstruction() {
	var inputs = [];
	inputs.push('action=fetchIndividualTreatmentInstruction');
/*	inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());*/
	inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					$("#TreatmentInstructionDetails").html(ajaxResponse);
					var obj = eval('(' + ajaxResponse + ')');
					for ( var rowNum = 0; rowNum < (obj.reportInstructionDTOList.length); rowNum++) {

						$('#TreatmentInstructionTemp tr')
								.each(
										function() {
											var individualTreatmentInstructionCheckboxID = $(
													($(this)
															.find('input[name=individualTreatmentInstructionCheckbox]')))
													.prop('id');

											/* id=ITIC_13 */
											individualTreatmentInstructionCheckboxID = (individualTreatmentInstructionCheckboxID
													.split('_')[1]).trim();

											if (individualTreatmentInstructionCheckboxID == (obj.reportInstructionDTOList[rowNum].reportInstructionID)) {
												$(
														'input[id=ITIC_'
																+ (obj.reportInstructionDTOList[rowNum].reportInstructionID)
																+ ']').prop(
														'checked', true);
											}
										});
					}
				}
			});
}

/* End Report Instruction */



function printPrescription(paramPopupOrPrint,callFrom) {
	
	callFrom = $("#pageType").val();
	callFrom1 = $("#callFrom").val();
	hideSummaryPostPopup();
	var depid=$("#depdocdeskid").val();
	var date_pick = $("#OFdate-pick").val();

	if (paramPopupOrPrint == "SHOW_POPUP_PRINT") {
          var html="";
		if(depid==2){
			html=html+'<div style="margin-top: 123px; margin-left: 213px;" class="modal-content col-md-8-1">'
			 +'<div class="modal-header"><button onclick="hideDoctorPrintPopup()" style="margin-top: -5px;; margin-left: 530px" type="button" data-dismiss="modal" aria-label="Close" class="btn btn-xs btn-danger">'
			 +'<i class="fa  fa-undo"></i></button>'
		     +'<button onclick="printPrescription(\'PRINT\');" data-placement="left" data-toggle="tooltip" data-original-title="savepass " "="" style="margin-top: -37px; margin-left: 500px" title="Print" class="btn btn-xs btn-warning">'
			 +'<i class="fa fa-print"></i>'
			 +'</button><h4 style="margin-top: -36px;" id="testHead">'
			 +'<i class="fa fa-print"></i> Print:	</h4></div>'
             +'<div class="modal-body"><div class="col-md-12-1">'
			 +'<div class="col-md-4-1" style="background-color: #ccffeb;">'
			 +'<input type="radio" id="ipdrdio" checked="checked" value="allDoctorStation" name="printType" onclick="ShowLangDiv()"> <b>All</b>'
			 +'</div><div class="col-md-4-1" style="background-color: #ccffeb;">'
			 +'<input type="radio" id="ipdrdio" value="doctorStation" name="printType" onclick="hideLangDiv()"> <b>Doctor Station</b>'
			 +'</div><div class="col-md-2-1" style="background-color: #ccffeb;">'
			 +'<input type="radio" id="Assessment" value="Assessment" name="printType" onclick="hideLangDiv()">'
			 +'<b>Assessment</b></div>'
			 +'<div class="col-md-2-1" style="background-color: #ccffeb;margin-right: 0px; margin-top:-8px;">'
			 +'<input type="radio" id="ipdrdio" value="CPOE" name="printType" onclick="hideLangDiv()">'
			 +'<b>CPOE</b></div><div class="divide-40" style="background-color: #ccffeb;"></div>'
            + '<div class="col-md-4-1" style="background-color: #ccffeb;">'
			 +'<input type="radio" id="ipdrdio" value="orderForm" name="printType" onclick="hideLangDiv()">'		
			 +'<b>Order Form</b></div><div class="col-md-4-1" style="background-color: #ccffeb;">'
			 +	'<input type="radio" id="adminNote" value="adminNote" name="printType" onclick="hideLangDiv()"> <b>Admission Note</b>'
			 +'</div><div class="col-md-2-1" style="background-color: #ccffeb;">'
	         +'<input type="radio" id="ipdrdio" value="SubObj" name="printType" onclick="hideLangDiv()">'
	         +'<b>Sub &amp; Obj</b></div><div class="divide-40" style="background-color: #ccffeb;"></div>'
			 //+'<div style="display: none;" id="allRadio">'
	         +'<div id="allRadio">'
			 +'<div class="col-md-3-1" style="background-color: #ccffeb;">'
			 + '<label class="input-SmallText"> <input type="radio" checked="checked" value="ENGLISH" name="prepInstructionPopup" style="margin-top: 0px; cursor: pointer"> : English'
			 +'</label></div><div class="col-md-4-1" style="background-color: #ccffeb;">'
			 +'<label class="input-SmallText"> <input type="radio" checked="checked" value="MARATHI" name="prepInstructionPopup" style="margin-top: 0px; cursor: pointer"> : Marathi'
			 +'</label></div></div><div class="divide-40" style="background-color: #ccffeb;"></div>'
            +'<div class="divide-40"></div>	</div></div></div>';	
		}else{

			html = html + '<div tabindex="-1" class="modal fade in"  style="display: block;">'
			            +'<div class="modal-dialog"><div style="margin-top: 13%; margin-left: 13%;" class="modal-content col-md-7">'
					    +'<div class="modal-header"><div class="box-title"><h4 class="col-md-8-1">'
						+'<i class="fa fa-calendar"></i> Prescription Instruction Language</h4>'
						+'<div style="float: right;" class="form-group col-md-4-1">'
			            +'<button type="button" onclick="printPrescription(\'PRINT\');" class="btn btn-xs btn-warning">'
						+'<i class="fa fa-print"></i> Print(H/F)</button>'
						+'<button type="button" onclick="printPrescription(\'PRINT(H/F)\');" class="btn btn-xs btn-warning">'
						+'<i class="fa fa-print"></i> Print</button>'
						+'<button onclick="printPrescription(\'HIDE_POPUP_PRINT\');" class="btn btn-xs btn-danger">'
						+'<i class="fa fa-arrows"></i> Close</button></div></div></div>'
	                    +'<div class="modal-body col-md-12-1"><div class="col-md-3-1">'
						+'<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="prepInstructionPopup" value="ENGLISH" checked="checked"> : English'
						+'</label></div><div class="col-md-3-1">'
						+'<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="prepInstructionPopup" value="HINDI"> : Hindi'
						+'</label></div>'
						+'<div class="col-md-3-1">'
						+'<label class="input-SmallText"> <input type="radio" style="margin-top: 0px; cursor: pointer" name="prepInstructionPopup" value="MARATHI"> : Marathi'
						+'</label>'
					    +'</div><div class="col-md-4-1">'
						+'<label class="input-SmallText"> <input type="checkbox" style="margin-top: 0px; cursor: pointer" name="vaccinationFlagCheckboxPrint" id="vaccinationFlagCheckboxPrint"> : Print'
						+'Vaccination chart</label></div><hr></div></div></div></div>';
		}
          
	
		$("#iPrintBill").html(html);
	
		$("#iPrintBill").show();
	} else if (paramPopupOrPrint == "PRINT") {
		if(callFrom1=="null"){
		var editorContent = CKEDITOR.instances['editorSubObjTreatment'].getData();
		}
		else{
			editorContent = "null";
		}
		/*$('#ckEditorData').html(editorContent);
		var ckEditorText = $('#ckEditorData p').text();*/

		var pid = $.trim($("#patId").html());
		var tid = $.trim($('#treatmentId').val());
		
		/*var pid1 = $.trim($("#pid1").html());
		var tid1 = $.trim($("#tid1").html());*/
		var pid1 = $.trim($("#pt_Id").val());
		var tid1 = $.trim($("#tr_Id").val());
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentOPDER";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		
		setTimeout(
				function() {
                   var printType =$("input[name='printType']:checked").val();
					$("#iPrintBill").hide();
					if(depid==1){
						printType="N";
					}
					if(pid1 == "" && tid1 == ""){
						window
							.open(("Opd_presciption.jsp?pid=" + pid + "&callFrom=" + callFrom
									+ "&tid=" + tid + "&instructionLanguage="
									+ instructionLanguage
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)+"&printType="+ printType));
					}
					else{/*
						window
							.open(("OPDPrescriptionPrint.jsp?pid=" + pid1 + "&callFrom=" + callFrom
								+ "&tid=" + tid1 + "&instructionLanguage="
								+ instructionLanguage
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)));
						
					*/
						

						window
							.open(("Opd_presciption.jsp?patID=" + pid1 + "&callFrom=" + callFrom
								+ "&tid=" + tid1 + "&instructionLanguage="
								+ instructionLanguage
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)+"&printType="+ printType +"&date_pick="+date_pick));
						
					}
					//location.reload();
					}, 300);
		
	} 
	else if(paramPopupOrPrint == "PRINT(H/F)"){
		if(callFrom1=="null"){
			var editorContent = CKEDITOR.instances['editorSubObjTreatment'].getData();
			}
			else{
				editorContent = "null";
			}
			/*$('#ckEditorData').html(editorContent);
			var ckEditorText = $('#ckEditorData p').text();*/

			var pid = $.trim($("#patId").html());
			var tid = $.trim($('#treatmentId').val());
			
			/*var pid1 = $.trim($("#pid1").html());
			var tid1 = $.trim($("#tid1").html());*/
			var pid1 = $.trim($("#pt_Id").val());
			var tid1 = $.trim($("#tr_Id").val());
			if(pid1 != "" || tid1 != ""){
				callFrom = "previousTreatmentOPDER";
			}
			
			var instructionLanguage = $(
					"input[name='prepInstructionPopup']:checked").val();
			var pageSize = $(
			"input[name='prepInstructionPaperSizePopup']:checked").val();
			var vaccinationFlagCheckboxPrint = $(
					"input[name='vaccinationFlagCheckboxPrint']:checked").val();

			
			setTimeout(
					function() {
	                   var printType =$("input[name='printType']:checked").val();
						$("#iPrintBill").hide();
						if(depid==1){
							printType="N";
						}
						if(pid1 == "" && tid1 == ""){
							window
								.open(("Opd_presciptionNew.jsp?pid=" + pid + "&callFrom=" + callFrom
										+ "&tid=" + tid + "&instructionLanguage="
										+ instructionLanguage
										+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)+"&printType="+ printType));
						}
						else{/*
							window
								.open(("OPDPrescriptionPrint.jsp?pid=" + pid1 + "&callFrom=" + callFrom
									+ "&tid=" + tid1 + "&instructionLanguage="
									+ instructionLanguage
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)));
							
						*/
							

							window
								.open(("Opd_presciptionNew.jsp?patID=" + pid1 + "&callFrom=" + callFrom
									+ "&tid=" + tid1 + "&instructionLanguage="
									+ instructionLanguage
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)+"&printType="+ printType +"&date_pick="+date_pick));
							
						}
						//location.reload();
						}, 300);
	}
	
	else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
		$("#iPrintBill").hide();
	}
	
}

function fetchVitalCoverSheet() {
	
	var pobj = $("#divPatId").html();
	var pobj1 = eval('(' + pobj + ')');
	var treatmentId = $("#treatmentId").html();
	if(treatmentId=="" || treatmentId==undefined){
		treatmentId =$("#tretID").html();
	}
	var cType = "3"; // vitals
	
	var unitId=1;
	var inputs = [];
	inputs.push('action=defaultChartSlaveView');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
//	inputs.push('cType=' + cType);
//	inputs.push('tid=' + (pobj1.trid));
	/*inputs.push('tid=' + $("#tr_Id").val());*/  //added by paras
	//inputs.push('tid=' + tid);  //Change By Pooja
	var aaa = $("#OFdate-pick").val();
	inputs.push('todayDate=' + $("#OFdate-pick").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
//		url : "AdminServlet",
		url : "ehat/nurshingchart/getIpdVitalList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			//
			var pobj1 = ajaxResponse;
				//eval('(' + ajaxResponse + ')');

			var vitalsCoverSheetHTML = "";
			var timeVitals = "----";
			var description = "----";
			for ( var int = 0; int < (pobj1.lstChartReport.length); int++) {

				timeVitals = "----";
				description = "----";

				if ((pobj1.lstChartReport[int].am8) != "") {
					description = (pobj1.lstChartReport[int].am8);
					timeVitals = "8 am";
				}

				if ((pobj1.lstChartReport[int].am9) != "") {
					description = (pobj1.lstChartReport[int].am9);
					timeVitals = "9 am";
				}

				if ((pobj1.lstChartReport[int].am10) != "") {
					description = (pobj1.lstChartReport[int].am10);
					timeVitals = "10 am";
				}

				if ((pobj1.lstChartReport[int].am11) != "") {
					description = (pobj1.lstChartReport[int].am11);
					timeVitals = "11 am";
				}

				if ((pobj1.lstChartReport[int].am12) != "") {
					description = (pobj1.lstChartReport[int].am12);
					timeVitals = "12 am";
				}

				if ((pobj1.lstChartReport[int].pm1) != "") {
					description = (pobj1.lstChartReport[int].pm1);
					timeVitals = "1 pm";
				}

				if ((pobj1.lstChartReport[int].pm2) != "") {
					description = (pobj1.lstChartReport[int].pm2);
					timeVitals = "2 pm";
				}

				if ((pobj1.lstChartReport[int].pm3) != "") {
					description = (pobj1.lstChartReport[int].pm3);
					timeVitals = "3 pm";
				}

				if ((pobj1.lstChartReport[int].pm4) != "") {
					description = (pobj1.lstChartReport[int].pm4);
					timeVitals = "4 pm";
				}

				if ((pobj1.lstChartReport[int].pm5) != "") {
					description = (pobj1.lstChartReport[int].pm5);
					timeVitals = "5 pm";
				}

				if ((pobj1.lstChartReport[int].pm6) != "") {
					description = (pobj1.lstChartReport[int].pm6);
					timeVitals = "6 pm";
				}

				if ((pobj1.lstChartReport[int].pm7) != "") {
					description = (pobj1.lstChartReport[int].pm7);
					timeVitals = "7 pm";
				}

				if ((pobj1.lstChartReport[int].pm8) != "") {
					description = (pobj1.lstChartReport[int].pm8);
					timeVitals = "8 pm";
				}

				if ((pobj1.lstChartReport[int].pm9) != "") {
					description = (pobj1.lstChartReport[int].pm9);
					timeVitals = "9 pm";
				}

				if ((pobj1.lstChartReport[int].pm10) != "") {
					description = (pobj1.lstChartReport[int].pm10);
					timeVitals = "10 pm";
				}

				if ((pobj1.lstChartReport[int].pm11) != "") {
					description = (pobj1.lstChartReport[int].pm11);
					timeVitals = "11 pm";
				}

				if ((pobj1.lstChartReport[int].pm12) != "") {
					description = (pobj1.lstChartReport[int].pm12);
					timeVitals = "12 pm";
				}

				if ((pobj1.lstChartReport[int].am1) != "") {
					description = (pobj1.lstChartReport[int].am1);
					timeVitals = "1 am";
				}

				if ((pobj1.lstChartReport[int].am2) != "") {
					description = (pobj1.lstChartReport[int].am2);
					timeVitals = "2 am";
				}

				if ((pobj1.lstChartReport[int].am3) != "") {
					description = (pobj1.lstChartReport[int].am3);
					timeVitals = "3 am";
				}

				if ((pobj1.lstChartReport[int].am4) != "") {
					description = (pobj1.lstChartReport[int].am4);
					timeVitals = "4 am";
				}

				if ((pobj1.lstChartReport[int].am5) != "") {
					description = (pobj1.lstChartReport[int].am5);
					timeVitals = "5 am";
				}

				if ((pobj1.lstChartReport[int].am6) != "") {
					description = (pobj1.lstChartReport[int].am6);
					timeVitals = "6 am";
				}

				if ((pobj1.lstChartReport[int].am7) != "") {
					description = (pobj1.lstChartReport[int].am7);
					timeVitals = "7 am";
				}

				vitalsCoverSheetHTML = vitalsCoverSheetHTML
						+ "<tr class='TextFont'><td class='col-md-1-1'>"
						+ (int + 1) + "</td><td class='col-md-7-1'>"
						+ (pobj1.lstChartReport[int].cname) + "</td>"
						+ "<td class='col-md-1-1'>" + timeVitals + "</td>"
						+ "<td class='col-md-2-1'>" + description
						+ "</td></tr>";
			}
			$("#vitalsCoverSheet").html(vitalsCoverSheetHTML);

			// $("#chartAddTemp").setTemplate(defaultChartViewTempNew);
			// $("#chartAddTemp").processTemplate(pobj1);
		}
	});
}

function  getIpdVitalList() {
	var treatmentId=$("#tr_Id").val();
//	var unitId=$("#unitId").val();
//	var todayDate=$("#date-pickn").val();
	var unitId=1;
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var todayDate= dd + '/' + mm + '/' + yyyy;
	var inputs = [];

	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('todayDate=' + todayDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/nurshingchart/getIpdVitalList",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdVitalsTempList(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function setIpdVitalsTempList(r){
	
	   if(r.lstChartReport.length > 0){
		   for(var i=0; i < r.lstChartReport.length;i++  ) {
			   	$("#masterId" + (i + 1)).val(r.lstChartReport[i].id);
				$("#vitalId" + (i + 1)).val(r.lstChartReport[i].vitalId);
				$("#1am" + (i + 1)).val(r.lstChartReport[i].am1);
				$("#2am" + (i + 1)).val(r.lstChartReport[i].am2);
				$("#3am" + (i + 1)).val(r.lstChartReport[i].am3);
				$("#4am" + (i + 1)).val(r.lstChartReport[i].am4);
				$("#5am" + (i + 1)).val(r.lstChartReport[i].am5);
				$("#6am" + (i + 1)).val(r.lstChartReport[i].am6);
				$("#7am" + (i + 1)).val(r.lstChartReport[i].am7);
				$("#8am" + (i + 1)).val(r.lstChartReport[i].am8);
				$("#9am" + (i + 1)).val(r.lstChartReport[i].am9);
			    $("#10am" + (i + 1)).val(r.lstChartReport[i].am10);
				$("#11am" + (i + 1)).val(r.lstChartReport[i].am11);
				$("#12am" + (i + 1)).val(r.lstChartReport[i].am12);

				$("#1pm" + (i + 1)).val(r.lstChartReport[i].pm1);
				$("#2pm" + (i + 1)).val(r.lstChartReport[i].pm2);
				$("#3pm" + (i + 1)).val(r.lstChartReport[i].pm3);
			    $("#4pm" + (i + 1)).val(r.lstChartReport[i].pm4);
				$("#5pm" + (i + 1)).val(r.lstChartReport[i].pm5);
				$("#6pm" + (i + 1)).val(r.lstChartReport[i].pm6);
			     $("#7pm" + (i + 1)).val(r.lstChartReport[i].pm7);
				 $("#8pm" + (i + 1)).val(r.lstChartReport[i].pm8);
				 $("#9pm" + (i + 1)).val(r.lstChartReport[i].pm9);
				 $("#10pm" + (i + 1)).val(r.lstChartReport[i].pm110);
				 $("#11pm" + (i + 1)).val(r.lstChartReport[i].pm11);
				 $("#12pm" + (i + 1)).val(r.lstChartReport[i].pm12);
		   }
	   }
	   
	
	   $("#chartObj").html(JSON.stringify(r));
}

// viewEdit = VIEW(todayDate View)
// viewEdit = EDIT(todayDate Edit)
// viewEdit = VIEWALLDATE(View all vitals irrespective of date)
function vitalsUIDoctorDesk(viewEdit) {
//alert("dd");
	var cType = "3"; // vitals
	//var todaysDefaultDate = $("#todaysDefaultDate").val();
	var todaysDefaultDate = $("#date-pick").val(); //added by sagar
//alert(todaysDefaultDate);
	var inputs = [];
	if (viewEdit === "VIEWALLDATE") {
		todaysDefaultDate = "VIEWALLDATE";
		// alert("Work under progress...");
		// return false;
		/*inputs.push('tid=' + ($('#patId').html()));*/
		inputs.push('tid=' + ($("#pt_Id").val()));
	}else if(viewEdit === "VIEWALLDATEForOT"){
		//var pid = $("#pid").val();
		//inputs.push('tid=' + pid);
		var pid = $("#pt_Id").val();
		inputs.push('tid=' + pid);
		viewEdit = "VIEWALLDATE";
	}
	else{
		/*inputs.push('tid=' + ($("#treatmentId").val()));*/
		inputs.push('tid=' + ($("#tr_Id").val()));
	}
	inputs.push('action=defaultChartSlaveView');
	inputs.push('cType=' + cType);
	inputs.push('date=' + todaysDefaultDate);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
				
					var ajaxResponse = r;
				//	alert(ajaxResponse);
					$("#vitalsDD2").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');

					var opdDD2HtmlVitalsTemplate = "";
					var dateInterval = "";
					var description = "";

					if (viewEdit === "VIEW") {

						for ( var int = 0; int < (pobj1.listReport.length); int++) {

							dateInterval = todaysDefaultDate;
							description = "----";

							if ((pobj1.listReport[int].am8) != "") {
								description = (pobj1.listReport[int].am8);
							}

							opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
									+ "<tr class='TextFont'><td class='col-md-1-1'>"
									+ (int + 1)
									+ "</td><td class='col-md-7-1'>"
									+ (pobj1.listReport[int].cname)
									+ "</td>"
									+ "<td class='col-md-1-1'>"
									+ dateInterval
									+ "</td>"
									+ "<td class='col-md-2-1'><div class='pull-right'>"
									+ description + "</div></td></tr>";

						}
						$("#opdDD2ReadonlyHtmlVitals").html(
								opdDD2HtmlVitalsTemplate);

					} else if (viewEdit === "EDIT") {

						for ( var int = 0; int < (pobj1.listReport.length); int++) {

							description = "";

							if ((pobj1.listReport[int].am8) != "") {
								description = (pobj1.listReport[int].am8);
							}
if(  pobj1.listReport[int].cname =='Bp' || pobj1.listReport[int].cname =='BP' || pobj1.listReport[int].cname =='bP' || pobj1.listReport[int].cname =='blood pressure' || pobj1.listReport[int].cname =='Blood Pressure' || pobj1.listReport[int].cname =='Blood pressure' || pobj1.listReport[int].cname =='blood Pressure' || pobj1.listReport[int].cname =='Bp (Millimeters)' || pobj1.listReport[int].cname =='BP (Millimeters)' || pobj1.listReport[int].cname =='bP (Millimeters)' || pobj1.listReport[int].cname =='blood pressure (Millimeters)' || pobj1.listReport[int].cname =='Blood Pressure (Millimeters)' || pobj1.listReport[int].cname =='Blood pressure (Millimeters)' || pobj1.listReport[int].cname =='blood Pressure (Millimeters)' || pobj1.listReport[int].cname == 'Blood Pressure (Mm of Hg)'){
	opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
	+ "<tr><td>"
	+ (int + 1)
	+ "</td><td>"
	+ (pobj1.listReport[int].cname)
	+ "</td>"
	+ "<td><input name='vitalsDD2SaveInput' maxlength='7' type='text' id='vitals-8am_"
	+ (pobj1.listReport[int].idct)
	+ "' value='" + description
	+ "'  /></td>  Mm of Hg</tr>";
}else{
	opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
	+ "<tr><td>"
	+ (int + 1)
	+ "</td><td>"
	+ (pobj1.listReport[int].cname)
	+ "</td>"
	+ "<td><input name='vitalsDD2SaveInput'  maxlength='20' type='text' id='vitals-8am_"
	+ (pobj1.listReport[int].idct)
	+ "' value='" + description
	+ "'  /></td></tr>";
}
							
						}

						opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
								+ "<td colspan='3' class='center'>"
								+ "<input onclick='saveDD2Vitals()' id='vitalNewclose' class='btn btn-xs btn-primary editUserAccess' type='button' value='Save' disabled='disabled'/></td>";

						$("#vitalNewDiaTableUI").html(opdDD2HtmlVitalsTemplate);

					} else if (viewEdit === "VIEWALLDATE") {
					
						if ((pobj1.listReport.length) > 0) {
							
							var tableTreatment="";
							var tableVitals="";
							var tableBody="";
							var idChartSlave=[];
							var treatmentArr = [];
							for ( var int = 0; int < (pobj1.listReport.length); int++) {
								var found = $.inArray(pobj1.listReport[int].idct+"_"+pobj1.listReport[int].cname, idChartSlave);
								if(found == -1){
									idChartSlave.push(pobj1.listReport[int].idct+"_"+pobj1.listReport[int].cname);
								}
								
								var found1 = $.inArray(pobj1.listReport[int].ti+"_"+pobj1.listReport[int].dt, treatmentArr);
								if(found1 == -1){
									treatmentArr.push(pobj1.listReport[int].ti+"_"+pobj1.listReport[int].dt);
								}
								
							}
							
							tableTreatment += "<tr><td>Treatment ID</td>";
							tableVitals += "<tr><td>Vitals</td>";
							for ( var int = 0; int < treatmentArr.length; int++) {
								var treatmentId = treatmentArr[int].split("_")[0];
								var date = treatmentArr[int].split("_")[1];
								tableTreatment +="<td class='treatment treatmentId_"+treatmentId+"'>"+ treatmentId +"</td>";
								tableVitals +="<td>"+date+"</td>";
							}
							tableTreatment += "</tr>";
							tableVitals +="</tr>";
							
							for ( var int = 0; int < idChartSlave.length; int++) {
								var chartId = idChartSlave[int].split("_")[0];
								var chartName = idChartSlave[int].split("_")[1];
								tableBody += "<tr><td>"+chartName+"</td>";
								for ( var i = 0; i < treatmentArr.length; i++) {
									var treatmentId = treatmentArr[i].split("_")[0];
									var treatmentDate = (treatmentArr[i].split("_")[1]).replace(/\//g, "-");
										tableBody +="<td id="+treatmentId+"_"+chartId+"_"+treatmentDate+"></td>";
								}
								tableBody += "</tr>";
							}
							$("#vitalsVIEWALLDATE").html(tableTreatment + tableVitals + tableBody);
							
							$('.treatment').map(function(){
								var id=$(this).attr('class').split(" ")[1];
								  var idLength=$('.'+id).length;
								  if(idLength>1){
								    $('.'+id).slice(1).remove();
								    $('.'+id).attr("colspan",idLength);
								    $('.'+id).attr('align', 'center');
								  }
							});
							
							for ( var int = 0; int < (pobj1.listReport.length); int++) {
								var date=(pobj1.listReport[int].dt).replace(/\//g, "-");
								$('#'+pobj1.listReport[int].ti+"_"+pobj1.listReport[int].idct+"_"+date).append(pobj1.listReport[int].am8);
							}
							
							// all date chart
							/*var idChartSlave = (pobj1.listReport[0].idct);
							var loopOnce = 1;
							var tableHeader = "<tr><td class='col-md-6-1'>Vitals</td>";
							for ( var int = 0; int < (pobj1.listReport.length); int++) {
								// table header
								if ((tableHeader
										.indexOf(pobj1.listReport[int].dt)) == -1) {

									tableHeader += ("<td>"
											+ (pobj1.listReport[int].dt) + "</td>");
								}
								// chart
								if (idChartSlave != (pobj1.listReport[int].idct)) {

									idChartSlave = (pobj1.listReport[int].idct);
									loopOnce = 1;
									opdDD2HtmlVitalsTemplate += ("</tr>");
									(int--);

								} else {
									if (loopOnce == 1) {
										opdDD2HtmlVitalsTemplate += ("<tr><td class='col-md-6-1'>"
												+ (pobj1.listReport[int].cname)
												+ "</td>"
												+ "<td>"
												+ (pobj1.listReport[int].am8) + "</td>");

										loopOnce = 0;
									} else {

										opdDD2HtmlVitalsTemplate += ("<td>"
												+ (pobj1.listReport[int].am8) + "</td>");
									}
								}
							} // for

							tableHeader += ("</tr>");

							$("#vitalsVIEWALLDATE").html(
									(tableHeader + opdDD2HtmlVitalsTemplate));*/
						} else
							$("#vitalsVIEWALLDATE").html(
									"No Vitals to be displayed...");
					} // \"VIEWALLDATE"
					setTimeout(function(){userAccess();},100);
				} // end:success
			});
}

function saveDD2Vitals() {

	var vitalsID = "";
	var value = "";

	//var tid = ($("#treatmentId").val());
	var tid = ($("#tr_Id").val());
	//var todaysDefaultDate = $("#todaysDefaultDate").val();
	var todaysDefaultDate = $("#date-pick").val(); //added by sagar

	var ajaxResponse = $("#vitalsDD2").html();
	var pobj1 = eval('(' + ajaxResponse + ')');

	var i = 0;
	$("input[name='vitalsDD2SaveInput']").each(function() {

		vitalsID = ($(this).prop('id')).trim();
		value = $("#" + vitalsID).val();
		

		if (value == "") {
			value = "0";
		}

		pobj1.listReport[i].am1 = "";
		pobj1.listReport[i].am2 = "";
		pobj1.listReport[i].am3 = "";
		pobj1.listReport[i].am4 = "";
		pobj1.listReport[i].am5 = "";
		pobj1.listReport[i].am6 = "";
		pobj1.listReport[i].am7 = "";
		pobj1.listReport[i].am8 = value;
		pobj1.listReport[i].am9 = "";
		pobj1.listReport[i].am10 = "";
		pobj1.listReport[i].am11 = "";
		pobj1.listReport[i].am12 = "";

		pobj1.listReport[i].pm1 = "";
		pobj1.listReport[i].pm2 = "";
		pobj1.listReport[i].pm3 = "";
		pobj1.listReport[i].pm4 = "";
		pobj1.listReport[i].pm5 = "";
		pobj1.listReport[i].pm6 = "";
		pobj1.listReport[i].pm7 = "";
		pobj1.listReport[i].pm8 = "";
		pobj1.listReport[i].pm9 = "";
		pobj1.listReport[i].pm10 = "";
		pobj1.listReport[i].pm11 = "";
		pobj1.listReport[i].pm12 = "";
		pobj1.listReport[i].ti = tid;
		pobj1.listReport[i].dt = todaysDefaultDate;

		i++;
	});

	var ajaxRes = JSON.stringify(pobj1);
	var inputs = [];
	inputs.push('action=saveChartReport');
	inputs.push('ajaxRes=' + encodeURIComponent(ajaxRes));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			vitalsUIDoctorDesk("VIEW");
		}
	});
}


function PhysicalDischargeToPatientTempleteWise(callFrom)
{
	if (callFrom == 'IPD') {
		var idIPDdischargeSummary = "0";
		var templateData = "";
		var queryType = $("#queryTypeicf").val();
		var selTempWiseSummary = $("#selTempWiseSummary").val();
		var selTempType = $("#selTempType").val();
		var templateName = $("#customizeTemplateName").val();
		templateData = CKEDITOR.instances['editor1'].getData();
		var date = $("#date").html();

		/** ******AS A TREATEMENT DISCHARGE DATE WITH TIME************ */
    	var discharge_dateNew = $("#discharge_date").val();
		//var discharge_dateNew = $("#discharge_date_note").val();
		var discharge_Time = $("#discharge_Time").val();
 		if (discharge_dateNew == "") {
			alert("Please select discharge date");
			$("#discharge_date").focus();
			return false;
		}
		if (discharge_Time == "") {
			alert("Please select discharge time");
			$("#discharge_Time").focus();
			return false;
		}

		if (discharge_dateNew != "") {
			var temp = discharge_dateNew.split("/");
			var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
			//var admsndate = $("#treStartDate").html();
			var admsndate = $("#dtofadmission").val();  //Added by sagar 
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
		if (discharge_Type == "select") {
			alert("Please select discharge type!");
			$("#discharge_Type").focus();
			return false;
		}

		if (queryType == "update") {
			idIPDdischargeSummary = $("#idIPDdischargeSummary").val();
			templateData = CKEDITOR.instances['viewckeditor1'].getData();
		}
		var treatmentId = $("#tid").val();  //Added by sagar
		var pid = $("#pid").val();

		var inputs = [];
		inputs.push('action=saveIPDSummaryTemplatePhyicalDischarge');
		inputs.push('queryType=' + queryType);
		inputs.push('dischargeDate=' + encodeURIComponent(discharge_dateNew));
		inputs.push('discharge_Type=' + encodeURIComponent(discharge_Type));
		inputs.push('selTempWiseSummary='
				+ encodeURIComponent(selTempWiseSummary));
		inputs.push('selTempType=' + selTempType);
		inputs.push('templateName=' + templateName);
		inputs.push('templateData=' + encodeURIComponent(templateData));
		inputs.push('idIPDdischargeSummary=' + idIPDdischargeSummary);
		inputs.push('date=' + date);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pid=' + pid);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				setTimeout(function() {
					// setNewCustomizeTemp();
					window.location.reload(true);
					// fetchCustomizeTemplateList();
				}, 500);
			}
		});
	}
	
}
function saveIPDDischargeSummaryTemplate(callFrom) {
	if (callFrom == 'IPD') {
		var idIPDdischargeSummary = "0";
		var templateData = "";
		var queryType = $("#queryTypeicf").val();
		var selTempWiseSummary = $("#selTempWiseSummary").val();
		var selTempType = $("#selTempType").val();
		var templateName = $("#customizeTemplateName").val();
		templateData = CKEDITOR.instances['editor1'].getData();
		var date = $("#date").html();

		/** ******AS A TREATEMENT DISCHARGE DATE WITH TIME************ */
		var discharge_dateNew = $("#discharge_date_note").val();
		var discharge_Time = $("#discharge_Time_note").val();
		if (discharge_dateNew == "") {
			alert("Please select discharge date");
			$("#discharge_date").focus();
			return false;
		}
		if (discharge_Time == "") {
			alert("Please select discharge time");
			$("#discharge_Time").focus();
			return false;
		}

		if (discharge_dateNew != "") {
			var temp = discharge_dateNew.split("/");
			var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
			//var admsndate = $("#treStartDate").html();
			var admsndate="21-06-2017";			//Added by Sagar dummy date
			var addt = admsndate.split("/");
			var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
			if (disDate.getTime() < addDate.getTime()) {
				alert("Date should not be before admission date!");
				return false;
			}else{
				discharge_dateNew = temp[2] + "-" + temp[1] + "-" + temp[0] + " "
				+ discharge_Time;
			}
		}

		var discharge_Type = $("#discharge_Type").val();
		if (discharge_Type == "select") {
			alert("Please select discharge type!");
			$("#discharge_Type").focus();
			return false;
		}

		if (queryType == "update") {
			idIPDdischargeSummary = $("#idIPDdischargeSummary").val();
			templateData = CKEDITOR.instances['viewckeditor1'].getData();
		}
		var treatmentId = $("#tid").val(); //Added by Sagar
		var pid = $("#pid").val();

		var inputs = [];
		//inputs.push('action=saveIPDDischargeSummaryTemplate');
		inputs.push('queryType=' + queryType);
		inputs.push('dischargeDate=' + encodeURIComponent(discharge_dateNew));
		inputs.push('discharge_Type=' + encodeURIComponent(discharge_Type));
		inputs.push('selTempWiseSummary='
				+ encodeURIComponent(selTempWiseSummary));
		inputs.push('selTempType=' + selTempType);
		inputs.push('templateName=' + templateName);
		inputs.push('templateData=' + encodeURIComponent(templateData));
		inputs.push('idIPDdischargeSummary=' + idIPDdischargeSummary);
		inputs.push('date=' + date);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pid=' + pid);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "./ehat/ipdhistory/saveIPDDischargeSummaryTemplate",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				setTimeout(function() {

					// setNewCustomizeTemp();
					window.location.reload(true);
					// fetchCustomizeTemplateList();
				}, 500);
			}
		});
	}
}

function fetchIPDDischargeSummaryTemplate(callFrom) {
	if (callFrom == 'IPD') {
		var treatmentId = $("#tid").val(); //Added by sagar
		var pid = $("#pid").val();

		var inputs = [];
		inputs.push('action=fetchIPDDischargeSummaryTemplate');
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pid=' + pid);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "TreatmentServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						
					},
					success : function(r) {
						ajaxResponse = r;
						$("#IPDdischargeSummaryTemplateDiv").html(ajaxResponse);
						//alert(ajaxResponse);
						var tobj = eval('(' + ajaxResponse + ')');
						if (tobj.pattemplist.length > 0) {
							var myObj = tobj.pattemplist[0];
							$("#idIPDdischargeSummary").val(myObj.idpattemp);
							$("#templateName").html(myObj.tempname);
							//alert(myObj.discharge_date);
							
							
						//dd=new Date(disDate);
							//alert(disDate);
					var	disDate=myObj.discharge_date.replace(/\-/g,'/');
						 disDate=disDate.split("_");
						 
							//alert(disDate[0]+"date");
							//alert(disDate[1]+"time");
							
							var cal_date = myObj.discharge_date.split("-");
							//alert(cal_date);
							var new1=cal_date[2].split("_");
							//alert(new1);
							var mydate =new1[0]+"/"+cal_date[1]+"/"+cal_date[0];
							$("#discharge_date_note").val(mydate);
							$("#discharge_Time_note").val(disDate[1]);
							$("#discharge_Time_note").val(disDate[1]);
							 
							CKEDITOR.instances['viewckeditor1']
									.setData(myObj.tempdata);
							$("#discharge_Type").val(myObj.discharge_type);
							$("#queryTypeicf").val("update");
						} else {
							/*var v1=new Date();
							var mth=v1.getMonth()+1;
						var	cal_date=v1.getFullYear()+"-"+mth+"-"+v1.getDate();
						  cal_date = cal_date.split("-");
						var mydate = cal_date[2]+"/"+cal_date[1]+"/"+cal_date[0];
						$("#discharge_date_note").val(mydate);*/
  							alert("No Discharge Summary Template is Saved for this Patient...");
							//$("discharge_date_note").html(v2);
							//$("discharge_Time_note").val(disDate[1]);
							return false;
						}
					}
				});
	}
}

function PrintDischargeNote() {
	var patientobj = $("#divPatId").html();
	var date = $("#date").html();
	var myobj = eval('(' + patientobj + ')');
	/*
	 * window.open("IPDTemplateWiseDischargeSummaryPrint.jsp?" + "patientobj=" +
	 * encodeURIComponent(patientobj) + "&date=" + date) ;
	 */

	WindowObject.document
			.writeln('<div style="width: 100%;height:1050px;"><div style="width: 100%;margin-top:1.4in;"><div	style="width: 65%; border-right: solid 1px black; border-bottom: solid 1px black; float: left; "><div style="width: 98%; padding-left: 5px;">Patient Name : '
					+ myobj.fn
					+ myobj.ln
					+ '</div><div style="width: 98%; padding-left: 5px;">Age&nbsp; / Gender : &nbsp; '
					+ myobj.ag
					+ myobj.agtp
					+ " / "
					+ myobj.sx
					+ '</div>	<div style="width: 98%; padding-left: 5px; padding-top: 20px;">Reference Dr. :&nbsp; '
					+ myobj.obj
					+ '</div></div><div	style="width: 34.5%; border-bottom: solid 1px black; float: left; "><div style="width: 90%; padding-left: 5px;">Collected :&nbsp; '
					+ finalCollectionDate
					+ '&nbsp;'
					+ $("#collectionTime").val()
					+ '</div>	<div style="width: 90%; padding-left: 5px;">');

	WindowObject.document.writeln('Received :&nbsp; ' + finalCollectionOutDate
			+ '&nbsp;' + $("#collTimeOut").val() + '');

	WindowObject.document
			.writeln('</div><div style="width: 90%; padding-left: 5px;">Reported :&nbsp; '
					+ finalReportdueDate
					+ '&nbsp;'
					+ $("#reportDueTime").val()
					+ '</div><div style="width: 90%; padding-left: 5px;">Patient ID:&nbsp; '
					+ $("#patientId").html()
					+ '</div></div></div><div style="width: 100%;padding-top:10%;">');

	WindowObject.document
			.writeln('<div style="width: 100%; margin-top: 25px;height: 30px; border: 0px solid black;"><div	style="width: 2%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Sr.</div>	<div style="width: 40%;padding-left: 1%; font-weight: bold; border-right: 0px solid black;float:left;height: 30px;">Test Name</div>	<div style="width: 15%;padding-left: 1%;  border-right: 0px solid black; font-weight: bold;float:left;height: 30px; ">Test	Result</div><div	style="width: 19%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Normal Values</div><div	style="width: 16%; border: 0px solid #FFF;  padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Method</div></div>');

	var srtstno = 1;

	WindowObject.document
			.writeln('<div	style="width: 100%; height: 28px;float:left;  border-bottom: 0px solid black; padding-top: 0px; border-left: 0px solid black;border-right: 0px solid black;" ><div style="width: 3.1%; height: 23px; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">'
					+ srtstno++
					+ '</div>&nbsp;&nbsp;'
					+ $("#pkgDiv" + i).html() + '</div>');
}

function showPatientAdmissionNote(pageType) {
//	var treatmentId = $("#treatmentId").val();
//	var pid = $("#pid").val();
	
	
	var pid = $("#pt_Id").val();
	var treatmentId = $("#tid").val(); 
	var inputs = [];
	inputs.push('action=fetchPatientAdmissionNote');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pid=' + pid);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
 			var obj = eval('(' + ajaxResponse + ')');
			 
			if (obj.note != "" || obj.note != null) {
				if (pageType == "dischargesummary") {
					//$("#adNote").val(obj.note);					 
					CKEDITOR.instances['adNote'].setData(obj.notes);
				} else if (pageType == "IPD") {
					$("#ipd_adnote").val(obj.notes);
				}
			}
		}
	});
}

// **************Medication Master Code Starts*************
// Kavita Bhangale

var addRouteTypeTemp = "<div class='col-md-12-1 center'>"
		+ "<div class='divide-20'></div><h4>Add Route Type:</h4><div class='divide-20'></div></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-top: 3%;'>"
		+ "<div class='divide-20'></div><div class='col-md-4-1'>Route ID:</div>"
		+ "<div class='col-md-5-1 center'>"
		+ "<input class='col-md-12-1 form-control input-SmallText' name='rtid' id='rtid'  value='{$T.routeId}' readonly='readonly' /></div></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='margin-top:9px;'><div class='divide-20'></div>"
		+ "<div class='col-md-4-1' style='margin-top:4px;'>Preparation:<b style='color: red; padding-left: 3px;'>*</b></div>"
		+ "<div class='col-md-5-1 center' style='margin-top:9px;'>"
		+ "<select class='col-md-12-1 form-control input-SmallText' name='prepname' id='prepname' >"
		+ "</select></div>"
		+ "</div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='margin-top:9px;'><div class='divide-20'></div>"
		+ "<div class='col-md-4-1' style='margin-top:4px;'>Route Name:<b style='color: red; padding-left: 3px;'>*</b></div>"
		+ "<div class='col-md-5-1 center' style='margin-top:9px;'>"
		+ "<input type='text' class='col-md-12-1 form-control input-SmallText' name='rtname' id='rtname' maxlength='150' /></div>"
		+ "</div>" + "<input type='hidden' id='queryType' value='insert' />";

var rtCount = 1;
var RouteMasterTemp = "{#foreach $T.rtlist as rtlist}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{rtCount++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.rtlist.routeId}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.rtlist.rtnm}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.rtlist.prep}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='editRouteType({$T.rtlist.routeId})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' onClick='deleteRouteType({$T.rtlist.routeId})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}";

function setAddMediTemp(pageType) {

	var inputs = [];
	inputs.push('action=fetchRouteMasterID');
	inputs.push('pageType=' + encodeURIComponent(pageType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;

			var myobj = eval('(' + ajaxResponse + ')');
			if (pageType == "RouteType") {
				$("#AddContentBox").setTemplate(addRouteTypeTemp);
				$("#AddContentBox").processTemplate(myobj);
			}
		}
	});
}

function saveRouteType() {

	var routeId = $("#rtid").val();
	var prep = $.trim($('#prepname').val());
	if (prep == "") {
		alert("Please add prescription...");
		return false;
	}
	if (prep == "0") {
		alert("Please Select Preparation...");
		return false;
	}

	var rtname = $.trim($("#rtname").val());
	if (rtname == "") {
		alert("Please specify route name...");
		return false;
	}

	var queryType = $.trim($("#queryType").val());
	var inputs = [];
	inputs.push('action=saveRouteType');
	inputs.push('routeId=' + encodeURIComponent(routeId));
	inputs.push('prep=' + encodeURIComponent(prep));
	inputs.push('rtname=' + encodeURIComponent(rtname));
	inputs.push('queryType=' + encodeURIComponent(queryType));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location.reload();
			fetchPreperationsList('saveRouteType');

		}
	});
}

function fetchAllMedicationMaster(pageType, search) {

	rtCount = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Route Name !");
			setFocus("#searchTest");
			return false;
		}
	}

	var inputs = [];
//	inputs.push('action=fetchAllMedicationMasterList');
	inputs.push('pageType=' + encodeURIComponent(pageType));
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdDischargeSumController/fetchAllMedicationMasterList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			$("#routeDetails").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			if (pageType == "RouteType") {
				$("#MedicationMasterContent").setTemplate(RouteMasterTemp);
				$("#MedicationMasterContent").processTemplate(obj);
				if (searhFlag == "search") {
					$("#byName").val("");
				}
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function editRouteType(routeid) {

	var ajaxResponse = $("#routeDetails").html();
	var myArray = eval('(' + ajaxResponse + ')');
	for ( var i = 0; i < myArray.rtlist.length; i++) {
		if (myArray.rtlist[i].routeId == routeid) {
			obj = myArray.rtlist[i];
			break;
		}
	}

	$("#rtid").val(obj.routeId);
	$("#prepname").val(obj.prepId);
	$("#rtname").val(obj.rtnm);
	$("#queryType").val("update");

}

function deleteRouteType(routeId) {

	var r = confirm("Are you confirm to delete Route Type?");

	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteRouteType');
		inputs.push('routeId=' + encodeURIComponent(routeId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				window.location.reload();
			}
		});
	}
}

var preperationTemp = "<option value='0'>-SELECT-</option>{#foreach $T.rtlist as rtlist}<option value='{$T.rtlist.routeId}'>{$T.rtlist.prep}</option>{#/for}";
function fetchPreperationsList(pageType) {
	var inputs = [];
	inputs.push('action=fetchPreperationsList');
	inputs.push('pageType=' + encodeURIComponent(pageType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		//data : str + "&reqType=AJAX",
		url : "./ehat/ivfDoctorRound/getPreperationsListForIvfDoctorRound",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
	
			//var obj = eval('(' + ajaxResponse + ')');
			var obj =r;
			if (pageType == "RouteType") {
				$("#prepname").setTemplate(preperationTemp);
				$("#prepname").processTemplate(obj);
			} else if (pageType == "DoctorDesk") {
				$("#prep").setTemplate(preperationTemp);
				$("#prep").processTemplate(obj);

				// prep. Doctor Template
				$("#prepDoc").setTemplate(preperationTemp);
				$("#prepDoc").processTemplate(obj);
				
				$("#prepDoca").setTemplate(preperationTemp);
				$("#prepDoca").processTemplate(obj);
			} else if (pageType == "Medicine") {
				$("#prName").setTemplate(preperationTemp);
				$("#prName").processTemplate(obj);
			}
		}
	});
}

var routeTemp = "<option value='0'>-SELECT-</option>{#foreach $T.rtlist as rtlist}"
		+ "<option value='{$T.rtlist.routeId}'>{$T.rtlist.route_name}</option>{#/for}";
function fetchRouteTypeList(pageType) {
	var prep = 0;
	if (pageType == "DoctorDesk_DocTempPopup") {
		prep = $("#prepDoc").val();
	}else if (pageType == "ipd") {
		prep = $("#prepDoca").val();
	} else {
		prep = $("#prep").val();
	}
	if (prep == "0") {
		// alert("Please select prep.");
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchRouteTypeList');
	// no use of pageType
	inputs.push('pageType=' + encodeURIComponent(pageType));
	inputs.push('prep=' + prep);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');
			if (pageType == "DoctorDesk_DocTempPopup") {
				$("#routeDoc").setTemplate(routeTemp);
				$("#routeDoc").processTemplate(obj);
				if (obj.rtlist.length > 0) {
					$("#routeDoc").val(obj.rtlist[0].routeId);
				} else {
					$("#routeDoc").val("0");
				}
			}else if (pageType == "ipd") {
				$("#routeDoca").setTemplate(routeTemp);
				$("#routeDoca").processTemplate(obj);
				if (obj.rtlist.length > 0) {
					$("#routeDoca").val(obj.rtlist[0].routeId);
				} else {
					$("#routeDoca").val("0");
				}
			} else {
				$("#route").setTemplate(routeTemp);
				$("#route").processTemplate(obj);
				if (obj.rtlist.length > 0) {
					$("#route").val(obj.rtlist[0].routeId);
				} else {
					$("#route").val("0");
				}
			}
		}
	});
	
}

function enableDocPrescriptionTemplate() {
	$("#prepDoc").prop("disabled", false);
	$("#medicineNameDoc").prop("disabled", false);
	$("#medicineIDDoc").prop("disabled", false);
	$("#strengthDoc").prop("disabled", false);
	$("#unitDoc").prop("disabled", false);
	$("#doseDoc").prop("disabled", false);
	$("#frequencyDoc").prop("disabled", false);
	$("#instructionDoc").prop("disabled", false);
	$("#routeDoc").prop("disabled", false);
	$("#daysDoc").prop("disabled", false);
	$("#qtyDoc").prop("disabled", false);
	//$("#saveMedDoc").prop("disabled", false);
}

function disableDocPrescriptionTemplate() {
	$("#prepDocTemplateMedicineID").val("0");
	$("#prepDoc").prop("disabled", true);
	$("#medicineNameDoc").prop("disabled", true);
	$("#medicineIDDoc").prop("disabled", true);
	$("#strengthDoc").prop("disabled", true);
	$("#unitDoc").prop("disabled", true);
	$("#doseDoc").prop("disabled", true);
	$("#frequencyDoc").prop("disabled", true);
	$("#instructionDoc").prop("disabled", true);
	$("#routeDoc").prop("disabled", true);
	$("#daysDoc").prop("disabled", true);
	$("#qtyDoc").prop("disabled", true);
	//$("#saveMedDoc").prop("disabled", false);
}

function refreshDocPrescriptionTemplate() {
	$("#docTemplateNameID").val("0");
	$("#docTemplateNameText").val("");
	$("#docOrgTemplateCheckbox").prop("checked", false);
	$("#prescriptionTemplateContentDocTable").html("");
	$("#prescriptionTemplateContentDocHiddenDiv").html("");

	// disable Paeditric checkbox
	$("#paediatricsDocCheckBox").prop("checked", false);

}

function refreshFetchDocPrescriptionTemplate() {
	var docTemplateNameSelectID = ($("#docTemplateNameSelect").val()).trim();
	if (docTemplateNameSelectID == "") {
		disableDocPrescriptionTemplate();
		refreshDocPrescriptionTemplate();
		refreshDocPrescriptionTemplateMedicine();
	} else {
		enableDocPrescriptionTemplate();
		refreshDocPrescriptionTemplateMedicine();
		fetchDocPrescriptionTemplateByID(docTemplateNameSelectID);
	}
}

var docTemplateNameSelect = "<option value=''>New Template</option>"
		+ "{#foreach $T.prisciptionTemplateObjList as ptol}<option value={$T.ptol.templateID}>{$T.ptol.templateName}</option>{#/for}";

var prepDocMyTemplateTable = "{#foreach $T.prisciptionTemplateObjList as ul}"
		+ "{#if $T.ul.myTemplateFlag=='Y'}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' >{count++}.</td>"
		+ "<td class='col-sm-1-1 center' >{$T.ul.templateName}</td>"
		+ "<td class='col-sm-2-1 center' >{$T.ul.userFullName}</td>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-primary editUserAccess' value='Use' onclick='usePrepDocTempForTreatment({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-danger deleteUserAccess' value='DELETE' onClick='deletePrepDocTemp({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td>" + "</tr>{#/if}{#/for}";

var prepDocOrgTemplateTable = "{#foreach $T.prisciptionTemplateObjList as ul}"
		+ "{#if $T.ul.orgTemplateFlag=='Y'}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' >{count++}.</td>"
		+ "<td class='col-sm-1-1 center' >{$T.ul.templateName}</td>"
		+ "<td class='col-sm-2-1 center' >{$T.ul.userFullName}</td>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-primary editUserAccess' value='Use' onclick='usePrepDocTempForTreatment({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' >"
		+ "<button class='btn btn-xs btn-danger deleteUserAccess' value='DELETE' onClick='deletePrepDocTemp({$T.ul.templateID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td>" + "</tr>{#/if}{#/for}";

//For Opd.
function fetchDocPrescriptionTemplateByID(docTemplateNameSelectID) {
	var inputs = [];
	inputs.push('action=fetchDocPrescriptionTemplateByID');
	// 0: fetch all
	inputs.push('docTemplateNameSelectID=' + docTemplateNameSelectID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					var ajaxResponse = r;
					var obj = eval('(' + ajaxResponse + ')');

					if (docTemplateNameSelectID == 0) {

						$("#docTemplateNameSelect").setTemplate(
								docTemplateNameSelect);
						$("#docTemplateNameSelect").processTemplate(obj);

						$("#docTemplateNameText").val("");
						$("#docTemplateNameID").val("0");
						$("#docMyTemplateCheckbox").prop('checked', true);
						$("#docOrgTemplateCheckbox").prop('checked', false);

						count = 1;
						$("#prepDocMyTemplateTable").setTemplate(
								prepDocMyTemplateTable);
						$("#prepDocMyTemplateTable").processTemplate(obj);

						count = 1;
						$("#prepDocOrgTemplateTable").setTemplate(
								prepDocOrgTemplateTable);
						$("#prepDocOrgTemplateTable").processTemplate(obj);

						// save Temp. button
						$("#existingAddReplaceTemplateNameSelect").setTemplate(
								docTemplateNameSelect);
						$("#existingAddReplaceTemplateNameSelect")
								.processTemplate(obj);

					} else {

						$('#prescriptionTemplateContentDocHiddenDiv').html(
								ajaxResponse);

						$("#docTemplateNameText").val(
								obj.prisciptionTemplateObjList[0].templateName);
						$("#docTemplateNameID").val(
								obj.prisciptionTemplateObjList[0].templateID);

						if ((obj.prisciptionTemplateObjList[0].myTemplateFlag) == "Y")
							$("#docMyTemplateCheckbox").prop('checked', true);
						else
							$("#docMyTemplateCheckbox").prop('checked', false);

						if ((obj.prisciptionTemplateObjList[0].orgTemplateFlag) == "Y")
							$("#docOrgTemplateCheckbox").prop('checked', true);
						else
							$("#docOrgTemplateCheckbox").prop('checked', false);

						var prescriptionTemplateContentDocTable = "";
						var instruction = "";
						var prep = "";
						var route = "";
						var unit = "";
						prepCount = 0;
						if ((obj.prisciptionTemplateObjList[0].prisciptionObjList.length) > 0) {

							for ( var int = 0; int < (obj.prisciptionTemplateObjList[0].prisciptionObjList.length); int++) {

								instruction = "";

								if ((obj.prisciptionTemplateObjList[0].prisciptionObjList[int].instruction) != 0) {
									instruction = $(
											"#instructionDoc option[value='"
													+ (obj.prisciptionTemplateObjList[0].prisciptionObjList[int].instruction)
													+ "']").text();
								}

								prep = $(
										"#prepDoc option[value='"
												+ (obj.prisciptionTemplateObjList[0].prisciptionObjList[int].prep)
												+ "']").text();

								if ((obj.prisciptionTemplateObjList[0].prisciptionObjList[int].route) != 0) {
									route = $(
											"#routeDoc option[value='"
													+ (obj.prisciptionTemplateObjList[0].prisciptionObjList[int].route)
													+ "']").text();
								}

								var frequency="";
								var newchar = '-';                            
								frequency=obj.prisciptionTemplateObjList[0].prisciptionObjList[int].dayPrescription; 
								if ( frequency =="0,0,0,0" || frequency==null || frequency=="" || frequency==undefined){
									frequency = obj.prisciptionTemplateObjList[0].prisciptionObjList[int].frequency;                  
									}else{                                
										frequency = frequency.split(',').join(newchar); 
									}
															
								prescriptionTemplateContentDocTable = prescriptionTemplateContentDocTable
										+ "<tr><td class='col-md-1-1 center'>"
										+ (++prepCount)
										+ ".</td>"
										+ "<td class='col-md-4-1'>"
										+ (prep)
										+ ". "
										+ obj.prisciptionTemplateObjList[0].prisciptionObjList[int].name
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.prisciptionTemplateObjList[0].prisciptionObjList[int].strength
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.prisciptionTemplateObjList[0].prisciptionObjList[int].dose
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ frequency
										+ "</td>"

										+ "<td class='col-md-2-1 center'>"
										+ instruction
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ (route)
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.prisciptionTemplateObjList[0].prisciptionObjList[int].days
										+ "</td>"

										+ "<td class='col-md-1-1 center'>"
										+ obj.prisciptionTemplateObjList[0].prisciptionObjList[int].qty
										+ "</td>"

										+ "<td>"
										+ "<input type='checkbox' name='chkboxPrepDocTempMedicine' id='"
										+ (obj.prisciptionTemplateObjList[0].prisciptionObjList[int].prescription_id)
										+ "' style='cursor: pointer;' /></td>"
										+ "</tr>";
							}
						}

						$('#prescriptionTemplateContentDocTable').html(
								prescriptionTemplateContentDocTable);
					}
					
					setTimeout(function(){userAccess();},100);
				}
			});
}

function saveUpdateDocPrescriptionTemplateByID() {

	var docTemplateNameText = ($("#docTemplateNameText").val()).trim();
	if (docTemplateNameText == "") {
		alert("Please enter template name...");
		return false;
	}

	var docTemplateNameID = ($("#docTemplateNameID").val()).trim();
	var docMyTemplateCheckbox = "N";
	if ($("#docMyTemplateCheckbox").prop("checked"))
		docMyTemplateCheckbox = "Y";

	var docOrgTemplateCheckbox = "N";
	if ($("#docOrgTemplateCheckbox").prop("checked"))
		docOrgTemplateCheckbox = "Y";

	var inputs = [];
	inputs.push('action=saveUpdateDocPrescriptionTemplateByID');
	inputs.push('docTemplateNameID=' + docTemplateNameID);
	inputs.push('docTemplateNameText='
			+ encodeURIComponent(docTemplateNameText));
	inputs.push('docMyTemplateCheckbox=' + docMyTemplateCheckbox);
	inputs.push('docOrgTemplateCheckbox=' + docOrgTemplateCheckbox);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alert(r);
			fetchDocPrescriptionTemplateByID("0");

			// on update
			if (docTemplateNameID != 0) {
				setTimeout(function() {
					fetchDocPrescriptionTemplateByID(docTemplateNameID);
					$("#docTemplateNameSelect").val(docTemplateNameID);
				}, 500);
			}
		}
	});
}

function refreshDocPrescriptionTemplateMedicine() {
	$("#prepDocTemplateMedicineID").val("0");
	$("#prepDoc").val("0");
	$("#medicineNameDoc").val("");
	$("#medicineIDDoc").val("0");
	$("#strengthDoc").val("");
	$("#unitDoc").val("0");
	$("#doseDoc").val("");
	$("#frequencyDoc").val("");
	$("#instructionDoc").val("0");
	$("#routeDoc").val("0");
	$("#daysDoc").val("");
	$("#qtyDoc").val("");
	
	$("#mo1").prop('checked', false);
	$("#an1").prop('checked', false);	
	$("#ev1").prop('checked', false);
	$("#nt1").prop('checked', false);
	$("#tmo1").val("1");
	$("#tan1").val("1");
	$("#tev1").val("1");
	$("#tnt1").val("1");
	$("#tmo1").attr('readonly', 'readonly');
	$("#tan1").attr('readonly', 'readonly');
	$("#tev1").attr('readonly', 'readonly');
	$("#tnt1").attr('readonly', 'readonly');
	
	//added by irfan khan 28-sep-2018
	$("#prepDocTemplateMedicineID").removeAttr("disabled");
	$("#prepDoc").removeAttr("disabled");
	$("#medicineNameDoc").removeAttr("disabled");
	$("#medicineIDDoc").removeAttr("disabled");
	$("#strengthDoc").removeAttr("disabled");
	
	$("#unitDoc").removeAttr("disabled");
	$("#doseDoc").removeAttr("disabled");
	$("#frequencyDoc").removeAttr("disabled");
	$("#instructionDoc").removeAttr("disabled");
	$("#routeDoc").removeAttr("disabled");
	$("#daysDoc").removeAttr("disabled");
	$("#qtyDoc").removeAttr("disabled");
	//end irfan

	// $("#prescriptionTemplateContentDocTable").html("");
}

function saveUpdatePrescriptionDocTemplateMedicine() {

	var docTemplateNameID = $.trim($('#docTemplateNameID').val());
	if (docTemplateNameID == "0") {
		alert("Please Select Template...");
		return false;
	}

	// preparation_id for Doc prep. template.
	var prepDocTemplateMedicineID = $.trim($("#prepDocTemplateMedicineID")
			.val());
	var prepDoc = $.trim($("#prepDoc :selected").val());
	var medicineNameDoc = $.trim($("#medicineNameDoc").val());
	var medicineIDDoc = $.trim($("#medicineIDDoc").val());
	var strengthDoc = $.trim($("#strengthDoc").val());
	var unitDoc = $.trim($("#unitDoc").val());
	var doseDoc = $.trim($("#doseDoc").val());
	var frequencyDoc = $.trim($("#frequencyDoc").val());
	var instructionDoc = $.trim($("#instructionDoc").val());
	var routeDoc = $.trim($("#routeDoc").val());
	var daysDoc = $.trim($("#daysDoc").val());
	var qtyDoc = $.trim($("#qtyDoc").val());
	
	var mor_flag="0";
	var aft_flag="0";
	var eve_flag="0";
	var night_flag="0";
	if ($("#medicineNotAvailableCheckboxTemp").prop("checked")){
		
	}else{
		if (medicineIDDoc == "0" || medicineIDDoc == "undefined"
			|| medicineIDDoc == "") {
		alert("Please Enter proper medicine name");
		$("#medicineIDDoc").val("0");
		SetFocus("medicineNameDoc");
		return false;
	}
	if (medicineNameDoc == "") {
		alert("Please Enter proper medicine name");
		SetFocus("medicineNameDoc");
		return false;
	}
	}
	if (prepDoc == "") {
		alert("Please Select Prep...");
		return false;
	}

	
	
	if (instructionDoc == "0") {
		// alert("Please Select Instruction...");
		// SetFocus("instructionDoc");
		// return false;
	}
	if (daysDoc == "") {
		alert("Please Enter days...");
		SetFocus("daysDoc");
		return false;
	}
	if (qtyDoc == "") {
		alert("Please Select Quantity...");
		SetFocus("qtyDoc");
		return false;
	}

	if(document.getElementById('mo1').checked){
		//mor_flag = "1";
		mor_flag=$("#tmo1").val();
	}
	if(document.getElementById('an1').checked){
		//aft_flag = "1";
		aft_flag =$("#tan1").val();
	}
	if(document.getElementById('ev1').checked){
		//eve_flag = "1";
		eve_flag=$("#tev1").val();
	}
	if(document.getElementById('nt1').checked){
		//night_flag = "1";
		night_flag=$("#tnt1").val();
	}
	

	var dayPrescription = mor_flag+","+aft_flag+","+eve_flag+","+night_flag;

	var inputs = [];
	inputs.push('action=saveUpdatePrescriptionDocTemplateMed');
	inputs.push('docTemplateNameID=' + docTemplateNameID);
	inputs.push('prepDocTemplateMedicineID=' + prepDocTemplateMedicineID);
	inputs.push('prepDoc=' + prepDoc);
	inputs.push('medicineIDDoc=' + medicineIDDoc);
	inputs.push('medicineNameDoc=' + medicineNameDoc);
	inputs.push('strengthDoc=' + strengthDoc);
	inputs.push('unitDoc=' + unitDoc);
	inputs.push('doseDoc=' + doseDoc);
	inputs.push('frequencyDoc=' + frequencyDoc);
	inputs.push('instructionDoc=' + instructionDoc);
	inputs.push('routeDoc=' + routeDoc);
	inputs.push('daysDoc=' + daysDoc);
	inputs.push('qtyDoc=' + qtyDoc);
	inputs.push('dayPrescription=' + dayPrescription);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// 
		},
		success : function(r) {
			alert(r);
			refreshDocPrescriptionTemplateMedicine();
			fetchDocPrescriptionTemplateByID(docTemplateNameID);
		}
	});
}

function editDocPrescriptionTemplateMedicine() {

	if (($("#prescriptionTemplateContentDocTable").html()).trim() == "") {
		alert("No Data to Edit Template's Medicine...");
		return false;
	}

	var prescriptionTemplateContentDocTableArray = new Array();
	var prescription_idMedDocTemp = 0;

	// $('#prescriptionTemplateContentDocTable tr').each(function() {
	$("input[name='chkboxPrepDocTempMedicine']:checked").each(function() {
		prescriptionTemplateContentDocTableArray.push($(this).val());
		prescription_idMedDocTemp = ($(this).attr('id')).trim();
	});
	// });

	if ((prescriptionTemplateContentDocTableArray.length) == 0) {
		alert("Please check the checkbox to edit Instructions...");
		return false;
	}

	if ((prescriptionTemplateContentDocTableArray.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}

	var ajaxResponse = $("#prescriptionTemplateContentDocHiddenDiv").html();
	var obj = eval('(' + ajaxResponse + ')');

	for ( var i = 0; i < (obj.prisciptionTemplateObjList[0].prisciptionObjList.length); i++) {
		if ((obj.prisciptionTemplateObjList[0].prisciptionObjList[i].prescription_id) == prescription_idMedDocTemp) {
			obj = (obj.prisciptionTemplateObjList[0].prisciptionObjList[i]);
			break;
		}
	}

	$("#prepDocTemplateMedicineID").val(obj.prescription_id);
	$("#prepDoc").val(obj.prep);
	$("#medicineNameDoc").val(obj.name);
	$("#medicineIDDoc").val(obj.medicineID);
	$("#strengthDoc").val(obj.strength);
	$("#unitDoc").val(obj.unit);
	$("#doseDoc").val(obj.dose);
	$("#frequencyDoc").val(obj.frequency);
	$("#instructionDoc").val(obj.instruction);
	$("#routeDoc").val(obj.route);
	$("#daysDoc").val(obj.days);
	$("#qtyDoc").val(obj.qty);
	
	$("#mo1").prop('checked', false);
	$("#an1").prop('checked', false);	
	$("#ev1").prop('checked', false);
	$("#nt1").prop('checked', false);
	
	var dayPrescription = obj.dayPrescription;
	var arr =dayPrescription.split(",");
	/*if(arr[0]=="1"){
		$("#mo1").prop('checked', true);
	}
	
	if(arr[1]=="1"){
		$("#an1").prop('checked', true);
	}
	
	if(arr[2]=="1"){
		$("#ev1").prop('checked', true);
	}
	
	if(arr[3]=="1"){
		$("#nt1").prop('checked', true);
	}*/
	if(arr[0]!="0"){
		$("#mo1").prop('checked', true);
	
		$("#tmo1").removeAttr("readonly");
	}
	
	if(arr[1]!="0"){
		$("#an1").prop('checked', true);
	
		$("#tan1").removeAttr("readonly");
	}
	
	if(arr[2]!="0"){
		$("#ev1").prop('checked', true);
		
		$("#tev1").removeAttr("readonly");
	}
	
	if(arr[3]!="0"){
		$("#nt1").prop('checked', true);

		$("#tnt1").removeAttr("readonly");
	}
	$("#tmo1").val(arr[0]);
	$("#tev1").val(arr[2]);
	$("#tan1").val(arr[1]);
	$("#tnt1").val(arr[3]);
if(obj.invProdID=="0"){
		
		$( "#medicineNotAvailableCheckboxIPD").prop('checked', true);
	}
}

function calculateQuantity(param) {

	
	//new qtywise
	var mor_flag=0;
	var aft_flag=0;
	var eve_flag=0;
	var night_flag=0;
	if(param=="prepDoc"){
		if(document.getElementById('mo1').checked){
			mor_flag=$("#tmo1").val();
		}
		if(document.getElementById('an1').checked){
			aft_flag =$("#tan1").val();
		}
		if(document.getElementById('ev1').checked){
			eve_flag=$("#tev1").val();
		}
		if(document.getElementById('nt1').checked){
			night_flag=$("#tnt1").val();
		}
		
		
	}if(param=="prepDoca"){
		if(document.getElementById('moa1').checked){
			mor_flag=$("#tmo11").val();
		}
		if(document.getElementById('ana1').checked){
			aft_flag =$("#tan11").val();
		}
		if(document.getElementById('eva1').checked){
			eve_flag=$("#tev11").val();
		}
		if(document.getElementById('nta1').checked){
			night_flag=$("#tnt11").val();
		}
		
		
	}else{
		if(document.getElementById('mo').checked){
			mor_flag=$("#tmo").val();
		}
		if(document.getElementById('an').checked){
			aft_flag =$("#tan").val();
		}
		if(document.getElementById('ev').checked){
			eve_flag=$("#tev").val();
		}
		if(document.getElementById('nt').checked){
			night_flag=$("#tnt").val();
		}
		
	}
	
	//end
	
	var frequency = 0.0;
	var days = 0.0;
	var quantity = 0.0;
	var strength = $("#strength").val();
	var strengthSplit = strength.split(" ");
	var strength1 = strengthSplit[0];
	if (param == "prepDoc") {
		//frequency = $("#frequencyDoc").val();
		//frequency =parseInt(mor_flag) + parseInt(aft_flag) + parseInt(eve_flag) + parseInt(night_flag) ;
	frequency =parseFloat(mor_flag) + parseFloat(aft_flag) + parseFloat(eve_flag) + parseFloat(night_flag) ;

		days = $("#daysDoc").val();
		$("#frequency").val(frequency);
	}else if (param == "prepDoca") {
	//	frequency = $("#frequencyDoca").val();
		frequency =parseFloat(mor_flag) + parseFloat(aft_flag) + parseFloat(eve_flag) + parseFloat(night_flag) ;
		days = $("#daysDoca").val();
		$("#frequency").val(frequency);
		
	} else {
		//frequency = $("#frequency").val();
		frequency =parseFloat(mor_flag) + parseFloat(aft_flag) + parseFloat(eve_flag) + parseFloat(night_flag) ;
		days = $("#days").val();
		$("#frequency").val(frequency);
	}
	if( frequency == "" || frequency == 0){
		frequency = 1 ;
	} if(days == "" || days == 0){
		days = 1 ;
	}
	var prepValue = $( "#prep option:selected" ).text();
	prepValue = prepValue.toLocaleLowerCase();
	
	var preprationQty = $("#preprationQty").val();
	if(preprationQty=="1"){
		$("#qty").val(1);
		return;
	}
	
	if (((($("#paediatricsMedicineCapacity").val()).trim()) != "")
			&& ((($("#paediatricsMedicineFlag").val()).trim()) == "Y")) {
			if(prepValue == "syrup" || prepValue == "syr"){
					var finalDose = ($("#dose").val()).trim();
					if(finalDose == "" && isNaN(finalDose)){
						finalDose = 1;
					}
					var capacity = ($("#paediatricsMedicineCapacity").val()).trim();
			
				//	quantity = (parseFloat(finalDose) * parseFloat(frequency) * parseFloat(days));
					quantity = (parseFloat(frequency) * parseFloat(days));
					//alert("quantity="+quantity);
					quantity = Math.ceil(quantity / capacity);
					if (quantity == 0 && isNaN(quantity)) {
						quantity = 1;
					}
			 }else{
				var finalDose = ($("#dose").val()).trim();
				if(finalDose == ""){
					finalDose = 1;
				}
				var capacity = ($("#paediatricsMedicineCapacity").val()).trim();
	
				//quantity = (parseFloat(finalDose) * parseFloat(frequency) * parseFloat(days));
	
				quantity = (parseFloat(frequency) * parseFloat(days));
				//alert("quantity="+quantity);

				quantity = Math.ceil(quantity);
				 if(isNaN(quantity) && quantity == 0){
					 quantity = 1;
				 }
		}
	} else {
			if(prepValue == "syrup" || prepValue == "syr"){
				var finalDose = ($("#dose").val()).trim();
				if(finalDose == "" || isNaN(finalDose) || finalDose == 0){
					finalDose = 1;
					}
				if (frequency != "" && days != "") {
						if(finalDose == 0 || isNaN(finalDose) || finalDose == 0){
							finalDose = 1;
						}
				//	quantity = frequency * days * parseFloat(finalDose);
						quantity=(parseFloat(frequency) * parseFloat(days));
					//quantity = frequency * days ;
					quantity = Math.ceil(quantity / strength1);
				} else if (frequency != "" && days == "") {
					quantity = 1;
				} else if (days != "" && frequency == "") {
					quantity = 1;
					} else {
					quantity = 1;
			}
				}else{
						var finalDose = 0;
						
						if(param == "prepDoc"){
							finalDose=($("#doseDoc").val()).trim();
						}else{
							finalDose=($("#dose").val()).trim();
						
						
				        }
						
							if(finalDose == "" || isNaN(finalDose) || finalDose == 0){
								finalDose = 1;
								}
							if (frequency != "" && days != "") {
							//	quantity = frequency * days * parseFloat(finalDose);
								//quantity = frequency * days ;
								quantity = (parseFloat(frequency) * parseFloat(days));
							} else if (frequency != "" && days == "") {
						//		quantity = frequency * parseFloat(finalDose);
								quantity = (parseFloat(frequency) * parseFloat(days));
								//quantity = frequency * days ;

							} else if (days != "" && frequency == "") {
							//	quantity = days * parseFloat(finalDose);
								quantity = (parseFloat(frequency) * parseFloat(days));
								//quantity = frequency * days ;

								} else {
								quantity = 1;
						}
							if(quantity == "" && isNaN(quantity)){
								quantity = 1;
								}
							//quantity = Math.ceil(quantity);	
		}
	}
	if(quantity == 0 || isNaN(quantity)){
		quantity = 1;
	}
	if (param == "prepDoc") {
		$("#qtyDoc").val(quantity);
	}if (param == "prepDoca") {
		$("#qtyDoca").val(quantity);
	} else {
		
		$("#qty").val(quantity);
		//$("#qty").val(parseFloat(frequency));
	}
	if(prepValue == "injection" || prepValue == "syringe" || prepValue == "drop" || prepValue == "nasal drop" ||
			prepValue == "eye drop" || prepValue == "ear drop" || prepValue == "inhaler" ||
			prepValue == "mouth paint" || prepValue == "lotion" || prepValue == "cream"){
		$("#qty").val(1);
	}
	if(prepValue == "nebulization" || prepValue == "sachet" || prepValue == "respules"){
		$("#qty").val(frequency * days);
	}
	if(prepValue == "general" || prepValue == "pessaries" ){
		$("#qty").val(1);
	}
	if($("#qty").val() == "NaN"){
		$("#qty").val(1);
	}
	//alert("quantity"+quantity);
	var prepValue1 = $("#prepDoca option:selected").text();
	prepValue1 = prepValue1.toLocaleLowerCase();
	
	if (prepValue1 == "injection" || prepValue1 == "syringe"
			|| prepValue1 == "drop" || prepValue1 == "nasal drop"
			|| prepValue1 == "eye drop" || prepValue1 == "ear drop"
			|| prepValue1 == "inhaler" || prepValue1 == "mouth paint"
			|| prepValue1 == "lotion" || prepValue1 == "cream" || prepValue1 == "liquid" || prepValue1 == "solid") {
		$("#qtyDoca").val(1);
	}
	
	var prepValue2 = $("#prepDoc option:selected").text();
	prepValue2 = prepValue2.toLocaleLowerCase();

	if (prepValue2 == "injection" || prepValue2 == "syringe"
			|| prepValue2 == "drop" || prepValue2 == "nasal drop"
			|| prepValue2 == "eye drop" || prepValue2 == "ear drop"
			|| prepValue2 == "inhaler" || prepValue2 == "mouth paint"
			|| prepValue2 == "lotion" || prepValue2 == "cream" || prepValue2 == "liquid" || prepValue2 == "solid") {
		$("#qtyDoc").val(1);
	}
}

function deleteDocPrescriptionTemplateMedicine() {

	if (($("#prescriptionTemplateContentDocTable").html()).trim() == "") {
		alert("No Data to Edit Template's Medicine...");
		return false;
	}

	var prepTempDocMedIDArray = new Array();
	$("input[name='chkboxPrepDocTempMedicine']:checked").each(function() {
		prepTempDocMedIDArray.push($(this).attr('id'));
	});

	if ((prepTempDocMedIDArray.length) == 0) {
		alert("Please check the checkbox to delete...");
		return false;
	}

	var r = confirm("Please confirm to Delete Record?");
	if (r) {
		var inputs = [];
		inputs.push('action=deleteDocPrescriptionTemplateMedicine');
		inputs.push('prepTempDocMedIDArray=' + prepTempDocMedIDArray);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				alert(r);
				fetchDocPrescriptionTemplateByID($.trim($('#docTemplateNameID')
						.val()));
			}
		});
	}
}

// End:Prescription Doc Templates and medicine

var routeTemp = "<option value='0'>-SELECT-</option>{#foreach $T.rtlist as rtlist}<option value='{$T.rtlist.routeId}'>{$T.rtlist.rtnm}</option>{#/for}";
function fetchUnitTypeList(pageType) {
	var inputs = [];
	inputs.push('action=fetchUnitTypeList');
	inputs.push('pageType=' + encodeURIComponent(pageType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		//data : str + "&reqType=AJAX",
		url : "./ehat/ivfDoctorRound/getUnitTypeListForIvfDoctorRound",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			//var obj = eval('(' + ajaxResponse + ')');
			var obj = r;
			if (pageType == "DoctorDesk" || pageType == "Medicine") {
				$("#unit").setTemplate(routeTemp);
				$("#unit").processTemplate(obj);

				$("#unitDoc").setTemplate(routeTemp);
				$("#unitDoc").processTemplate(obj);
				
				$("#unitDoca").setTemplate(routeTemp);
				$("#unitDoca").processTemplate(obj);
				
				
			}
		}
	});
}

function usePrepDocTempForTreatment(prepTemplateDocID) {
	var inputs = [];

//	var treatmentId = $.trim($('#treatmentId').val());
	var treatmentId = $.trim($('#tr_Id').val());
	inputs.push('action=usePrepDocTempForTreatment');
	inputs.push('prepTemplateDocID=' + prepTemplateDocID);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(ajaxResponse);
			showPrescriptionTemp();
		}
	});
}

//For Ipd.
function deletePrepDocTempIpd(prepTemplateDocID) {
	var inputs = [];
	inputs.push('action=deletePrepDocTemp');
	inputs.push('prepTemplateDocID=' + prepTemplateDocID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(ajaxResponse);
			//fetchDocPrescriptionTemplateByID("0");
			//For Ipd.
			fetchDocOrderformTemplateByID("0");
		}
	});
}

function showHideAddNewUpdateExistingTemplate(selectValue) {

	if (selectValue == "NEW") {
		document.getElementById("newTempDiv").style.display = "block";
		document.getElementById("existingTempDiv").style.display = "none";
	} else if (selectValue == "EXISTING") {
		document.getElementById("newTempDiv").style.display = "none";
		document.getElementById("existingTempDiv").style.display = "block";
	}
}

// parameter = NEW | EXISTING
function saveAddnewOrUpdateExistingTemplate() {

	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to save...");
		return false;
	}

	var prescriptionIDArray = new Array();
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		prescriptionIDArray.push($(this).attr('id'));
	});

	if ((prescriptionIDArray.length) == 0) {
		alert("Please check the checkbox...");
		return false;
	}

	// var newExistingRadio =
	// ($("input[name='addNewUpdateExistingTemplateRadio']:checked").val()).trim();

	var newExistingRadio = ($("#addNewUpdateExistingTemplateSelect").val())
			.trim();

	var templateName = "";
	var templateID = "";
	var myTemplateFlag = "N";
	var orgTemplateFlag = "N";

	if (newExistingRadio == "NEW") {

		templateName = ($("#existingAddReplaceTemplateNameText").val()).trim();

		if (templateName == "") {
			alert("Please enter Template Name...");
			return false;
		}

		var usedForTemplateValue = $("input[name='usedForTemplate']:checked")
				.val();

		if (usedForTemplateValue == "BOTH") {
			myTemplateFlag = "Y";
			orgTemplateFlag = "Y";
		} else if (usedForTemplateValue == "MYTEMPLATE") {
			myTemplateFlag = "Y";
		} else if (usedForTemplateValue == "ORGNTEMPLATE") {
			orgTemplateFlag = "Y";
		}

	} else if (newExistingRadio == "EXISTING") {
		templateID = ($("#existingAddReplaceTemplateNameSelect").val()).trim();

		if (templateID == "") {
			alert("Please select Template Name...");
			return false;
		}

		if (templateID == "undefined") {
			alert("Please select Template Name...");
			return false;
		}

		if (templateID == "0") {
			alert("Please select Template Name...");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=saveAddnewOrUpdateExistingTemplate');
	inputs.push('templateName=' + templateName);
	inputs.push('templateID=' + templateID);
	inputs.push('myTemplateFlag=' + myTemplateFlag);
	inputs.push('orgTemplateFlag=' + orgTemplateFlag);
	inputs.push('prescriptionIDArray=' + prescriptionIDArray);
	inputs.push('newExistingRadio=' + newExistingRadio);
	//inputs.push('treatmentID=' + $.trim($('#treatmentId').val()));
	inputs.push('treatmentID=' + $.trim($('#tr_Id').val()));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
}

// Touheed -- Radiation Master 09-Oct-2015
var getRadiationId = "";
function getNextRadiationId() {

	var inputs = [];
	inputs.push('action=getNextRadiationId');
	// inputs.push('tableName=inv_document_numbering_master');
	inputs.push('tableName=radiation_master');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// 
		},
		success : function(r) {
		
			ajaxResponse = r;
			$("#radiationId").val(r);
			getRadiationId = r;
		}
	});
}

// Touheed 09-oct-2015
function saveRadiation() {

	var radiationId = $("#radiationId").val();
	var radiationName = ($("#radiationName").val()).trim();
	var mould = $("#mould").val();
	var ct = $("#ct").val();
	var planning = $("#planning").val();
	var qa = $("#qa").val();
	var imaging = $("#imaging").val();
	var total = $("#total").val();
	var trtct = $("#trtct").val();
	var finalc = $("#final").val();

	if (radiationName == "") {
		alert("Please enter Radiation Technique Name...");
		return false;
	}

	if (radiationId == getRadiationId) {
		radiationId = "0";

	}

	var inputs = [];
	inputs.push('action=saveRadiation');
	inputs.push('radiationId=' + radiationId);
	inputs.push('radiationName=' + radiationName);
	inputs.push('mould=' + mould);
	inputs.push('ct=' + ct);
	inputs.push('planning=' + planning);
	inputs.push('qa=' + qa);
	inputs.push('imaging=' + imaging);
	inputs.push('total=' + total);
	inputs.push('trtct=' + trtct);
	inputs.push('finalc=' + finalc);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// 
		},
		success : function(r) {
			alert(r);
			location.reload();
			enableAllRadiationcharges("save");
		}
	});
}
// Touheed 09-oct-2015
var countRadiation = 1;
var radiationTemp = "{#foreach $T.radiationList as il}"
		+ "<tr>	<td class='col-md-1-1 center' style='height: 35px;'>{countRadiation++}.</td>	"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.radiationId}</td>"
		+ "<td class='numeric col-md-2-1' style='height: 21.5px;'>{$T.il.radiationName}</td>"
		+ "<td class='numeric col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='editRadiation({$T.il.radiationId})' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success editUserAccess' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>		</button></td>	"
		+ "<td class='numeric col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button	onclick='deleteRadiation({$T.il.radiationId})' id='btnDelete2' class='btn btn-xs btn-success deleteUserAccess' value='DELETE' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>		</button></td></tr>" + "{#/for} ";

// radiotherapy in DoctorDesk's Radiation Thecnique feild
var radiationTherapyTemp = "<option value='0'>-SELECT-</option>{#foreach $T.radiationList as rtlist}<option value='{$T.rtlist.radiationId}'>{$T.rtlist.radiationName}</option>{#/for}";

// Touheed 09-Oct-2015
function fectchRadiationMaster(pageType) {
	var pagetype = pageType;
	var inputs = [];
	inputs.push('action=fectchRadiationMaster');
	inputs.push('pagetype=' + pagetype);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(res) {
			// alert(res);
			countRadiation = 1;
			pobj1 = eval('(' + res + ')');
			// if (pobj1.radiationList.length > 0) {
			$("#radiationMasterContent").setTemplate(radiationTemp);
			$("#radiationMasterContent").processTemplate(pobj1);
			$("#radiationMasterDivAjax").html(res);
			// @Modified by:Touheed @Modified Date:11-Jan-2016 (opdBill.jsp)
			$("#radiationDivAjax").html(res);

			// Select for radiotheropy's radiation feild
			$("#radiationId").setTemplate(radiationTherapyTemp);
			$("#radiationId").processTemplate(pobj1);

			/*
			 * }else { alert("No Radiation...!"); }
			 */
			setTimeout(function(){userAccess();},100);
		}
	});

}
// Touheed 09-oct-2015
function editRadiation(id) {

	var ajaxResponse = $("#radiationMasterDivAjax").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	var obj = "";
	for ( var i = 0; i < myArray.radiationList.length; i++) {
		if (myArray.radiationList[i].radiationId == id) {
			obj = myArray.radiationList[i];
			break;
		}
	}
	$("#radiationHead").html("Edit Radiation Master");
	$("#radiationId").val(obj.radiationId);
	$("#radiationName").val(obj.radiationName);
	$("#mould").val(obj.mould);
	$("#ct").val(obj.ct);
	$("#planning").val(obj.planning);
	$("#qa").val(obj.qa);
	$("#imaging").val(obj.imaging);
	$("#total").val(obj.total);
	$("#trtct").val(obj.trtct);
	$("#final").val(obj.finalc);
}

// Touheed 09-Oct-2015
function deleteRadiation(radiationId) {

	var r = confirm("Are you confirm to delete Radiation Technique?");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteRadiation');
		inputs.push("radiationId=" + radiationId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
				fectchRadiationMaster();
				// getNextRadiationId();
				// $("#radiationName").val("");
			}
		});
	}
}

function searchRadiation() {

	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Radiation Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=fectchRadiationMaster');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// 
		},
		success : function(r) {
			countRadiation = 1;
			ajaxResponse = r;
			$("#byName").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.radiationList.length == 0) {
				alert("Radiation Not Found");
				$('#byName').val("");
			} else {
				$("#radiationMasterContent").setTemplate(radiationTemp);
				$("#radiationMasterContent").processTemplate(pobj1);
				$('#byName').val("");
			}
			userAccess();
		}
	});
}

// Touheed 10-Oct-2015

function saveRadiotherapy(callFrom){
	var neoAdjv = "";
	var adjv = "";
	var radInt = "";
	var radPall = "";
	var branchyTheropy = "";
	var conChemo = "";
	var patientId = $("#pt_Id").val();
	var treatmentId = $("#tr_Id").val();
	var radiotherapyId = $("#radiotherapyId").val();
	var serum_creatine = ($("#serum_creatine").val()).trim();
	var radiationId = $('#radiationId').val();
	var indicationSurgery2 = "";
	var riskFactor = ($("#riskFactor").val()).trim();
	var adviceDate2 = ($("#adviceDate2").val()).trim();
	var instructionsRadio = ($("#instructionsRadio").val()).trim();
	var adviceDateTreatment = ($("#adviceDateTreatment").val()).trim();
	var advSimTime = ($("#advSimTime").val()).trim();
	var advTrtTime = ($("#advTrtTime").val()).trim();
	
	if ($('#idNeoAdjv').is(':checked')) {
		neoAdjv = "Y";
	}else{
		neoAdjv = "N";
	}
	if ($('#idAdjv').is(':checked')) {
		adjv = "Y";
	}else{
		adjv = "N";
	}
	if ($('#idRadInt').is(':checked')) {
		radInt = "Y";
	}else{
		radInt = "N";
	}
	if ($('#idRadPall').is(':checked')) {
		radPall = "Y";
	}else{
		radPall = "N";
	}
	if ($('#idBranchyTheropy').is(':checked')) {
		branchyTheropy = "Y";
	}else{
		branchyTheropy = "N";
	}
	if ($('#idConChemo').is(':checked')) {
		conChemo = "Y";
	}else{
		conChemo = "N";
	}

	if (serum_creatine == "") {
		serum_creatine = "-";
		//alert("Please enter Serum Creatine.");
		//return false;
	}
	if (radiationId == "0") {
		alert("Please select Radiation Technique.");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveRadiotherapy');
	inputs.push('radiotherapyId=' + radiotherapyId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('serum_creatine=' + serum_creatine);
	inputs.push('radiationId=' + radiationId);
	inputs.push('indicationSurgery2=' + indicationSurgery2);
	inputs.push('riskFactor=' + riskFactor);
	inputs.push('adviceDate2=' + adviceDate2);
	inputs.push('instructionsRadio=' + instructionsRadio);
	inputs.push('adviceDateTreatment=' + adviceDateTreatment);
	inputs.push('advSimTime=' + advSimTime);
	inputs.push('advTrtTime=' + advTrtTime);
	inputs.push('neoAdjv=' + neoAdjv);
	inputs.push('adjv=' + adjv);
	inputs.push('radInt=' + radInt);
	inputs.push('radPall=' + radPall);
	inputs.push('branchyTheropy=' + branchyTheropy);
	inputs.push('conChemo=' + conChemo);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alert(r);
			fectchAllRadiotherapy("Function");
			newRadiotherapy();
		}
	});
}

function newRadiotherapy() {/*
	 * $("#adviceQueryType").val("insert"); $("#testIDDiv").hide();
	 */
	$("#serum_creatine").val("");
	$("#radiationId").val("0");
	$("#radiotherapyId").val("0");
	$("#instructionsRadio").val("");
	$("#indicationSurgery2").val("");
	$("#riskFactor").val("");
	$("#adviceDate2").val($("#currentDate").val());
	$("#adviceDateTreatment").val($("#currentDate").val());
	$("#radioHead").html("Add Radiotherapy");
	$("#advSimTime").val("");
	$("#advTrtTime").val("");
	$("#idNeoAdjv").prop('checked', false);
	$("#idAdjv").prop('checked', false);
	$("#idRadInt").prop('checked', false);
	$("#idRadPall").prop('checked', false);
	$("#idBranchyTheropy").prop('checked', false);
	$("#idConChemo").prop('checked', false);}

var countRadiotherapy = 1;
var radiotherapyTemp = "{#foreach $T.radioList as il}"
		+ "<tr>	<td class='col-md-1-1 center' style='height: 35px;'>{countRadiotherapy++}.</td>	"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.serum_creatine}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.radiationName}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.adviceDate2+'-'+$T.il.advSimTime}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.adviceDateTreatment+'-'+$T.il.advTrtTime}</td>"
		+ "<td class='numeric col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='editRadiotherapy({$T.il.radiotherapyId})' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success editUserAccess' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>		</button></td>	"
		+ "<td class='numeric col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button	onclick='deleteRadiotherapy({$T.il.radiotherapyId})' id='btnDelete2' class='btn btn-xs btn-success deleteUserAccess' value='DELETE' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>		</button></td></tr>" + "{#/for} ";

// Touheed 09-Oct-2015
function fectchAllRadiotherapy(pageType) {
	var pagetype = pageType;
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#pt_Id").val();
	var inputs = [];
	inputs.push('action=fectchAllRadiotherapy');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('pagetype=' + pagetype);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
			countRadiotherapy = 1;
			pobj1 = eval('(' + res + ')');
			if (pobj1.radioList.length > 0) {
				$("#viewRadioTemp").setTemplate(radiotherapyTemp);
				$("#viewRadioTemp").processTemplate(pobj1);
				$("#radiotherapyDivAjax").html(res);
				
				setTimeout(function(){userAccess();},100);

			} else {
				$("#viewRadioTemp").empty();
				// alert("No Radiotherapy...!");
			}
		}
	});
	}

// Touheed 10-oct-2015
function editRadiotherapy(id) {
	newRadiotherapy();
	var ajaxResponse = $("#radiotherapyDivAjax").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	var obj = "";
	for ( var i = 0; i < myArray.radioList.length; i++) {
		if (myArray.radioList[i].radiotherapyId == id) {
			obj = myArray.radioList[i];
			break;
		}
	}
	$("#radioHead").html("Edit Radiotherapy");
	$("#radiotherapyId").val(obj.radiotherapyId);
	$("#serum_creatine").val(obj.serum_creatine);
	$("#radiationId").val(obj.radiationId);
	$("#indicationSurgery2").val(obj.indicationSurgery);
	$("#riskFactor").val(obj.riskFactor);
	$("#adviceDate2").val(obj.adviceDate2);
	$("#adviceDateTreatment").val(obj.adviceDateTreatment);
	$("#instructionsRadio").val(obj.instructionsRadio);
	$("#advSimTime").val(obj.advSimTime);
	$("#advTrtTime").val(obj.advTrtTime);
	
	if (obj.neoAdjuvant == "Y") {
		$("#idNeoAdjv").prop('checked', true);
	}
	if (obj.adjuvant == "Y") {
		$("#idAdjv").prop('checked', true);
	}
	if (obj.radicalIntent == "Y") {
		$("#idRadInt").prop('checked', true);
	}
	if (obj.radicalPalliative == "Y") {
		$("#idRadPall").prop('checked', true);
	}
	if (obj.branchyTherapy == "Y") {
		$("#idBranchyTheropy").prop('checked', true);
	}
	if (obj.concomitantChemo == "Y") {
		$("#idConChemo").prop('checked', true);
	}}

// Touheed 09-Oct-2015
function deleteRadiotherapy(radiotherapyId) {

	var treatmentId = $("#tid").val();
	var patientId = $("#pid").val();
	var r = confirm("Are you confirm to delete Radiotherapy?");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteRadiotherapy');
		inputs.push("radiotherapyId=" + radiotherapyId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('patientId=' + patientId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "TreatmentServlet",
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				fectchAllRadiotherapy("function");
				newRadiotherapy();
			}
		});
	}
}

// Radiotherapy instruction
function saveToInstructionRadiotherapy() {

	if (($("#TreatmentInstructionTemp").html()) == "") {
		alert("No Data to Save Instruction...");
		return;
	}

	var individualTreatmentInstructionCheckboxIDArray = new Array();

	$('#TreatmentInstructionTempRadio tr')
			.each(
					function() {
						var individualTreatmentInstructionCheckboxID = $(
								($(this)
										.find('input[name=individualTreatmentInstructionCheckbox]:checked')))
								.attr('value');

						if (individualTreatmentInstructionCheckboxID != undefined
								&& individualTreatmentInstructionCheckboxID != "0"
								&& individualTreatmentInstructionCheckboxID != "") {

							/* id=ITIC_13 */
							individualTreatmentInstructionCheckboxID = (individualTreatmentInstructionCheckboxID
									.split('_')[1]).trim();

							individualTreatmentInstructionCheckboxIDArray
									.push(individualTreatmentInstructionCheckboxID);
						}

					});

	if ((individualTreatmentInstructionCheckboxIDArray.length) == 0) {
		alert("Please check the checkbox to save Instructions...");
		return;
	}

	$("#instructionsRadio").val(individualTreatmentInstructionCheckboxIDArray);
	// $("#iPackage").hide();
	$("#cancel").click();
}

var ImmunizationChartTableOnPopupTemp = "{#foreach $T.vaccineDTOList as vl}<tr>"

		+ "<input type='hidden' id='saveUpdateImmunizationID__{count}' value='{$T.vl.saveUpdateImmunizationID}' />"

		+ "<td class='col-md-1-1 center'>{count++}</td>"

		+ "{#if $T.vl.days=='0' && $T.vl.weeks=='0' && $T.vl.months=='0' && $T.vl.years=='0'}"
		+ "<td class='col-md-1-1 center TextFont' style='background: #E7F3FF;'> At Birth </td>"
		+ "{#/if}"

		+ "{#if $T.vl.days!='0' && $T.vl.weeks=='0' && $T.vl.months=='0' && $T.vl.years=='0'}"
		+ "<td class='col-md-1-1 center TextFont' style='background: #DAEDFF;'> {$T.vl.days} to {$T.vl.maxDays} Days </td>"
		+ "{#/if}"

		+ "{#if $T.vl.days=='0' && $T.vl.weeks!='0' && $T.vl.months=='0' && $T.vl.years=='0'}"
		+ "<td class='col-md-1-1 center TextFont' style='background: #C2E0FF;'> {$T.vl.weeks} to {$T.vl.maxWeeks} Weeks </td>"
		+ "{#/if}"

		+ "{#if $T.vl.days=='0' && $T.vl.weeks=='0' && $T.vl.months!='0' && $T.vl.years=='0'}"
		+ "<td class='col-md-1-1 center TextFont' style='background: #AAD4FF;'> {$T.vl.months} to {$T.vl.maxMonths} Months </td>"
		+ "{#/if}"

		+ "{#if $T.vl.days=='0' && $T.vl.weeks=='0' && $T.vl.months=='0' && $T.vl.years!='0'}"
		+ "<td class='col-md-1-1 center TextFont' style='background: #91C8FF;'> {$T.vl.years} to {$T.vl.maxYears} Years </td>"
		+ "{#/if}"

		+ "<td class='col-md-2-1'> {$T.vl.vaccineName} "
		+ " {#if $T.vl.mandatoryFlag=='Y'} <b style='color: red; padding-left: 3px;'>*</b> {#/if}"
		+ " {#if $T.vl.gender=='ALL'} <sup><i class='fa fa-users'></i></sup>{#/if}"
		+ " {#if $T.vl.gender=='MALE'} <sup><i class='fa fa-male'></i></sup>{#/if}"
		+ " {#if $T.vl.gender=='FEMALE'} <sup><i class='fa fa-female'></i></sup>{#/if}"
		+ "</td>"

		+ "<td class='col-md-1-1 center'>{$T.vl.vaccineFromDate}</td>"
		+ "<td class='col-md-1-1 center'>{$T.vl.vaccineToDate}</td>"

		+ "<td class='col-md-1-1 center'>"
		+ "<input id='vaccineGivenDatePatient__{$T.vl.saveUpdateImmunizationID}' class='col-md-12-1' value='{$T.vl.vaccineGivenDate}'"
		+ " type='text' placeholder='Vaccination date...' style='margin: 0px;' readonly='readonly' /></td>"

		+ "<td class='col-md-1-1 center'>"
		+ "<input id='dueDatePatient__{$T.vl.saveUpdateImmunizationID}' class='col-md-12-1' value='{$T.vl.dueDate}'"
		+ " type='text' placeholder='Due date...' style='margin: 0px;' readonly='readonly' /></td>"

		+ "<td class='col-md-1-1 center'>"
		+ "<input id='vaccineStatusForPatient__{$T.vl.saveUpdateImmunizationID}' class='col-md-12-1' value='{$T.vl.vaccineStatusForPatient}'"
		+ " type='text' placeholder='vaccine status...' style='margin: 0px;' /></td>"

		+ "</tr>{#/for}";

function generateImmunizationChartForPatient() {

	// start: code for finalAgeInMonths
	var patientObj = $("#PreTre").html();
	var patJsObj = eval('(' + patientObj + ')');

	//var dob = (patJsObj.db);
	var dob = $("#dbirth").val();
//alert(dob);
	if ((dob == "") || (dob == "undefined")) {

		alert("Please save DOB first...");

		var booleanFlag = confirm("Do you wish to go to patient edit page?");
		if (booleanFlag) {
			window.location.href = "ehat_reg.jsp?bmiPatID="
					+ ($("#pt_Id").val());
		}
		setTimeout(function() {
			$('#ImmunizationButtonPopup').removeClass('fade');
			$('#ImmunizationButtonPopup').modal('hide');
		}, 20);

		return false;
	}
	var pid = $('#pt_Id').val();
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}
	var inputs = [];
	inputs.push('action=generateImmunizationChartForPatient');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			var jsObj = eval('(' + ajaxResponse + ')');

			count = 1;
			$("#ImmunizationChartTableOnPopup").setTemplate(
					ImmunizationChartTableOnPopupTemp);
			$("#ImmunizationChartTableOnPopup").processTemplate(jsObj);

			setTimeout(function() {
				setVaccineGivenDatePatient(jsObj);
			}, 800);
		}
	});
}

// vaccine status for patient
// vaccination details for patient
function saveUpdateVaccinationPatientTreatment() {

	var objVaccination = 0;
	objVaccination = {
		vaccineDTOList : []
	};

	count = 1;
	var vaccineID;
	var vaccineGivenDate;
	var dueDate;
	var vaccineStatusForPatient;

	$("#ImmunizationChartTableOnPopup tr").each(
			function() {

				vaccineID = $.trim($("#saveUpdateImmunizationID__" + (count++))
						.val());
				vaccineGivenDate = ($.trim($(
						"#vaccineGivenDatePatient__" + vaccineID).val()));
				dueDate = ($.trim($("#dueDatePatient__" + vaccineID).val()));
				vaccineStatusForPatient = ($.trim($(
						"#vaccineStatusForPatient__" + vaccineID).val()));

				if ((vaccineGivenDate != "") || (dueDate != "")
						|| (vaccineStatusForPatient != "")) {

					objVaccination.vaccineDTOList.push({
						"saveUpdateImmunizationID" : vaccineID,
						"vaccineGivenDate" : vaccineGivenDate,
						"dueDate" : dueDate,
						"vaccineStatusForPatient" : vaccineStatusForPatient
					});

				}

			});

	if (objVaccination.vaccineDTOList.length == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	objVaccination = JSON.stringify(objVaccination);

	var pid = $('#pt_Id').val(); //Added by sagar
	if(pid == "" || pid == null){
		pid = $('#patId').html();
	}
	
	var treatmentId = $.trim($('#tr_Id').val());

	var inputs = [];
	inputs.push('action=saveUpdateVaccinationPatientTreatment');
	inputs.push('pid=' + pid);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('objVaccination=' + objVaccination);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alert(r);
		}
	});
}

// Touheed Nove.9.2015
// To show pop on lable click

function toShowPop() {
	$("#iPopup").show();
}

function toHidePop() {
	$("#iPopup").hide();
}

function changeLable() {
	$("#labNil").text("Lung");
}

function changeLableB() {
	$("#labNil").text("Bladder");
}

function changeLableCe() {
	$("#labNil").text("Cervix");
}

function changeLableC() {
	$("#labNil").text("Colo Rectal");
}

function changeLableE() {
	$("#labNil").text("Endometrium");
}

function changeLableLy() {
	$("#labNil").text("Lymphoma");
}

function changeLableP() {
	$("#labNil").text("Prostate");
}

function changeLableOE() {
	$("#labNil").text("Oesophagus");
}

function changeLableR() {
	$("#labNil").text("Renal");
}

// Touheed Code for Radiation master
// Date : 06-Jan-2016
function enableAllRadiationcharges(val) {
	if (val == "save") {
		$("#radiationName").val("");
		$("#mould").val(0);
		$("#ct").val(0);
		$("#planning").val(0);
		$("#qa").val(0);
		$("#imaging").val(0);
		$("#total").val(0);
		$("#trtct").val(0);
		$("#final").val(0);

	} else {
		$("#mould").val(0);
		$("#ct").val(0);
		$("#planning").val(0);
		$("#qa").val(0);
		$("#imaging").val(0);
		$("#total").val(0);
		$("#trtct").val(0);
		$("#final").val(0);
	}
}

// Touheed Code for Radiation master
// Date : 06-Jan-2016
function calculateRadiationCharges() {

	var mould = $("#mould").val();
	var mi = parseFloat(mould);

	var ct = $("#ct").val();
	var c = parseFloat(ct);

	var planning = $("#planning").val();
	var p = parseFloat(planning);

	var qa = $("#qa").val();
	var q = parseFloat(qa);

	var imaging = $("#imaging").val();
	var i = parseFloat(imaging);

	var trtct = $("#trtct").val();
	var tr = parseFloat(trtct);

	if (mould == "") {
		$("#mould").val(0);
	}
	if (ct == "") {
		$("#ct").val(0);
	}
	if (planning == "") {
		$("#planning").val(0);
	}
	if (imaging == "") {
		$("#imaging").val(0);
	}
	if (qa == "") {
		$("#qa").val(0);
	}
	if (trtct == "") {
		$("#trtct").val(0);
	}

	if (mould != "" && ct != "" && planning != "" && qa != "" && imaging != ""
			&& trtct != "") {
		var total = mi + c + p + q + i;
		$("#total").val(total);
		var fi = mi + c + p + q + i + tr;

		$("#final").val(fi);
	}
}

function printImmunizationChart(printOption) {

	var pid = $.trim($('#pid').val());
	var tid = $.trim($('#tid').val());
	var callFrom = $.trim($('#callFrom').val());
	if(callFrom == "null"){
		callFrom = $('#pageType').val();
	}
	setTimeout(
			function() {
				window.open(
						("print_immunization_chart.jsp?pid="
								+ encodeURIComponent(pid) + "&tid="
								+ encodeURIComponent(tid) + "&printOption="
								+ printOption  + "&callFrom="
								+ encodeURIComponent(callFrom))
						);
			}, 300);
}

/* Start uploadDocument Code */
/************
 * @author	: Tushar
 * @codeFor	: Upload Documents
 ***********/
/*function uploadDocument() {
	
				var doc = $("#ifile").val();
				var note = $("#iNotes").val();
				var Tid = $.trim($('#treatmentId').val());
				var PatId = $('#patId').val();
				
				var Tid = $("#tr_Id").val();    // added by paras
				var PatId = $("#pt_Id").val();   // added by paras
				
				
				var inputs = [];
				if (doc == "") {
					alert("Please select file first ");
					return false;
				}
				inputs.push('filePath=' + encodeURIComponent(doc));
				inputs.push('note=' + note);
				inputs.push('tid=' + Tid);
				inputs.push('patId=' + PatId);
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "UploadDocServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						 
					},
					success : function(r) {
						alert("Uploaded Successfully...");
						$("#ifile").val("");
						$("#iNotes").val("");
						fetchDoc();
					}
				});
}
*/
function uploadDocumentdR(){
	 alert("Uploaded Successfully...");    
}
function uploadDocument() {  
	var doc = $("#ifile").val();             
	var note = $("#iNotes").val();               
	var Tid = $.trim($('#treatmentId').html());                
	var PatId = $.trim($('#patientId').html());   
	//Added by tarique aalam
	var files = $('#ifile').prop("files");
	var doc1 = $.map(files, function(val) { return val.name; });
	
	//var Tid = $("#TRTiD").val();    // added by paras
	//var PatId = $("#PiD").val();   // added by paras
	
     var inputs = [];                
     if (doc == "") {   
    	 alert("Please select file first ");   
    	 return false;
     }   
     
 /*    var docs = doc.split("\\");               
     var doc1 = docs[0];  */   
      inputs.push('filePath=' + encodeURIComponent(doc1));                
     inputs.push('note=' + note);                
     inputs.push('tid=' + Tid);               
     inputs.push('patId=' + PatId);               
     var str = inputs.join('&');               
     jQuery.ajax({                   
    	 async : true,                   
    	 type : "POST",                   
    	 data : str + "&reqType=AJAX",                  
    	 url : "UploadDocServlet",                   
    	 timeout : 1000 * 60 * 5,                   
    	 catche : false,                    
    	 error : function() {                                            
    		 
    	 },                   
    	 success : function(r) {                      
    		 alert("Uploaded Successfully...");                     
    		 $("#ifile").val("");                       
    		 $("#iNotes").val("");                       
    		 fetchDoc();                    
    		 }               
    	 });}



/* End Uploadfile Code */

/*Fetching Data*/
function fetchDoc() {
	//alert("fetchdoc")
	//var Tid = $.trim($('#tid').val());  //added by sagar
	var Tid = $.trim($('#tid').val());  //added by sagar
	var patId = $.trim($('#pid').val());// added by sagar
	var inputs = [];
	inputs.push('action=fetchDocuments');
	inputs.push('tid=' + -123);
	inputs.push('patId=' + patId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PopulateDocuments",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setUploadDocList(r);
		}
	});
}

function setUploadDocList(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";
	var prevtre= $('#prevtr').val();
	if(result.length>0){
		//var callFrom = $("#callFrom").val();
		for(var i=0;i<result.length;i++)
		{
			if (prevtre == "previousTreatmentOPDER") {
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result[i].document+"'>"+result[i].document+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result[i].notes+"'>"+result[i].notes+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result[i].date+"'>"+result[i].date+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocuments("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x hidden' style='margin-center: 6px;cursor: pointer;' onclick='delDocument("+(i+1)+")' type='button' disabled=''>  </i></td></tr>";
			}
			else{
			divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
					"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result[i].document+"'>"+result[i].document+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result[i].notes+"'>"+result[i].notes+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"+(i+1)+"' value='"+result[i].date+"'>"+result[i].date+"</td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocuments("+(i+1)+")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
					"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='delDocument("+(i+1)+")' type='button'>  </i></td></tr>"; 
			}
			}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}
/*Delete Rows*/
function delDocument(rowNumber) {

	var hr = $('#hiddenR').val();
	var Tid = $('#tid').val(); //Added by sagar
	var doc = $('#hiddenDocid'+rowNumber).val();
	var date = $('#hiddenDate'+rowNumber).val();
	var inputs = [];
	var r = confirm("Are you sure to delete "+doc+" ?");
	if (r == false) {
		return false;
	}
	inputs.push('hr=' + hr);
	inputs.push('tid=' + Tid);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DelDocServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 
		},
		success : function(r) {
			alert("Deleted Successfully...");
			fetchDoc();
		}
	});

}
/*Reading Data*/
function ReadDocuments(rowNumber) {
	var doc = $("#hiddenDocid"+rowNumber).val();
	var note = $("#hiddenDocnote"+rowNumber).val();
	//$('#ViewDocumemnt').attr("src","ReadDocServlet?fileName="+doc);
	$('#ViewDocumemnt').attr("src","ReadDocOnReg?fileName="+doc);
	$('#viewDocModal').modal('show');
	
	$('#documentComment').html(note);
}
function setDocPopUp(data)
{
	var result=jQuery.parseJSON(data);
	var divContent="";

	if(!result.length == ""){
		divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"+(i+1)+"</div></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><iframe src='ReadDocServlet?fileName="+result[i].document+"' ></iframe></td>" +
			"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'>"+result[i].notes+"</td></tr>"; 
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#ViewDocumemnt").html(divContent);			
}

function setids(){

	var identity = $("#identity").val();
	var IdentifctnNo = $('#IdentifctnNo').val();
	
	$('#identification').val(identity);
	$('#identificationNo').val(IdentifctnNo);
}

/***********
 * @author	: Touheed Khan
 * @date	: 07-OCT-2016
 * @reason	: Except Investigation or Pathology no perticular should insert for ipd and opd patient only
 */
function noEditIfIPDOrOPD(callFrom){
	
	var serviceWiseBillingFlow = $("#serviceWiseBillingFlow").val();
	if (serviceWiseBillingFlow === "on") {//if serviceWiseBillingFlow is on then following code will execute
		
		if(callFrom == "diagnosisBill"){
			//getting patient object from hidden field on jsp
			var details = $("#divPatId").html();
			var pdetails = eval('(' + details + ')');

			var serviceHeading = $("#serviceHeading").val();		
			var referPatient = pdetails.objTreat.rt;
			
			if(referPatient != "diagnosis"){
				
				if(serviceHeading !="investigation" && serviceHeading !="pathology" ){
					
					$("#particulars").prop("readonly", true);
					$("#particularRate").prop("readonly", true);
					$("#particularqty").prop("readonly", true);
					$("#particularConcession").prop("readonly", true);
					$("#fieldName").prop("readonly", true);
					
				}else{
					$("#particulars").prop("readonly", false);
					$("#particularRate").prop("readonly", false);
					$("#particularqty").prop("readonly", false);
					$("#particularConcession").prop("readonly", false);
					$("#fieldName").prop("readonly", false);
				}
				
			}
		}	
	}	
}//end noEditIfIPDOrOPD


/***********
 * @author	: Touheed Khan
 * @date	: 07-OCT-2016
 * @reason	: Request for Closing treament From Opd/IPD button hide or show
 *********/
function doneOPDIPDBilling4CloseTreatment(callFrom){
	
	var serviceWiseBillingFlow = $("#serviceWiseBillingFlow").val();
	if (serviceWiseBillingFlow === "on") {//if serviceWiseBillingFlow is on then following code will execute
		if(callFrom == "diagnosisBill"){
			//getting patient object from hidden field on jsp
			var details = $("#divPatId").html();
			var pdetails = eval('(' + details + ')');	
			var referPatient = pdetails.objTreat.rt;
			
			if(referPatient == "diagnosis"){ //If Patient refer Diagnosis then only Treament Close Button will show
				$("#btnReqstClsTreFrmDiags").hide(); // hide button
			}else{ //OPD or IPD then only Done Button wil Show
				$("#btnCloseTreatment").hide();
			}
		}	
	}else{//else service wise flow is off
		$("#btnReqstClsTreFrmDiags").hide(); //if flow is off then always hide the button
	}	
}//end doneOPDIPDBilling4CloseTreatment

/***********
 * @author	: Touheed Khan
 * @date	: 07-OCT-2016
 * @reason	: Request for Closing treament From Opd/IPD
 *********/
function requestCloseTreatment(callFrom){
	
	//getting patient object from hidden field on jsp
	var details = $("#divPatId").html();
	var pdetails = eval('(' + details + ')');	
	var tretID = pdetails.objTreat.ti;
	var referPatient = pdetails.objTreat.rt;
	
	var r = confirm("Do you want to send request to "+referPatient+" department for close treatment?");
	if (r == false) {
		return false;
	}
	var inputs = [];
	inputs.push('action=requestCloseTreatment');
	inputs.push('callFrom=' + callFrom);
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alert(r);
		}
	});
}


//Tushar Changes for= Popup patient previous treatment @10 Oct 2016
function fetchAllergyAlertsForPrint() {
	
	var pid = $('#pid').html();
		
	if (pid == "" || undefined == pid) {
		pid = $("#pid").val();
	}
	
	if (pid == "" || undefined == pid) {
		alert("Patient ID not fetched properly Allergy alerts...");
		return;
	}
	var inputs = [];
	inputs.push('action=fetchAllergyAlerts');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
				var ajaxResponse = res;
					$("#allergyAlertsDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var divContent="";
					if (testObj.allergyAlertsDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.allergyAlertsDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.allergyAlertsDTOList[int].allergyName+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#alertAllergy").html(divContent);
				}	
			});
}	
function showAssessmentForPrint() {

	count = 1;
	flag_count = 1;
	assesTmpConfmedPrescriptionCount = 1;
	var treatmentId = $('#tid1').html();
	var inputs = [];
	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + 246);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#assesmentDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.assessmentList.length > 0) {
							
						for ( var int = 0; int < testObj.assessmentList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.assessmentList[int].diagnosis+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#conirmDiagno").html(divContent);
				}
			});
}
function fetchPrescriptionForPrint() {
	prepCount = 0;
	//var treatmentId = $('#tid1').html();
	var treatmentId = 239;
	var inputs = [];
	inputs.push('action=fetchPrescription');
	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#prescriptionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.prescriptionList.length > 0) {
							
						for ( var int = 0; int < testObj.prescriptionList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].prepName +"." + testObj.prescriptionList[int].name+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].dose + " " +testObj.prescriptionList[int].instructionName +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].frequency+" Times a Day"+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].days+" Days"+"</td>" 
							+ "<td class='form-group col-md-1-1 '>" + testObj.prescriptionList[int].qty+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#prescription").html(divContent);
				}
			});
}
function fetchTestForPrint() {

	var inputs = [];
	inputs.push('action=fetchTestForDashboard');
	inputs.push('treatmentId=' + $("#tid1").html());
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// 
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(r);
					$("#CPOE_TestDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');		
					
					var divContent="";
					if (testObj.testDashboard.length > 0) {
							
						for ( var int = 0; int < testObj.testDashboard.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].perticuler +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].consultant +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].date+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].desciption+"</td>" 
							+ "<td class='form-group col-md-2-1 '>" + testObj.testDashboard[int].testType+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#cpoeTest").html(divContent);
					
				}
			});
}
function fetchPCTreatmentInstructionForPrint() {
	var treatmentId = $('#tid1').html();
	var inputs = [];
	inputs.push('action=fetchPCTreatmentInstruction');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.treatmentInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.treatmentInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.treatmentInstructionDTOList[int].treatmentChildInstructionName+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#genInst").html(divContent);
					
				}
			});
}
function fetchIndividualTreatmentInstructionForPrint() {
	var inputs = [];
	inputs.push('action=fetchIndividualTreatmentInstruction');
	inputs.push('treatmentId=' + ($("#tid1").html()));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					$("#TreatmentInstructionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');

					var divContent="";
					if (testObj.reportInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.reportInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.reportInstructionDTOList[int].reportInstruction+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#primInst").html(divContent);
					
				}
			});
}
function fetchAdviceForPrint() {
	var inputs = [];
	inputs.push('action=fetchAdvice');
	inputs.push('treatmentId=' + $("#tid1").html());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			// alert(r);
			ajaxResponse = r;
			$("#adviceDetails").html(ajaxResponse);
			var testObj = eval('(' + ajaxResponse + ')');
			
			var divContent="";
			if (testObj.adviceDTOList.length > 0) {
					
				for ( var int = 0; int < testObj.adviceDTOList.length; int++) {
					divContent=divContent + "<tr class='col-md-12-1' style='margin-top: 6px;'><td class='form-group col-md-6-1 '>"+testObj.adviceDTOList[int].operationName+"</td>"+"<td class='form-group col-md-6-1 '>"+testObj.adviceDTOList[int].adviceDate+"</td></tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
			}
			$("#surgeryAdvice").html(divContent);
		}
	});
}
function fectchAllRadiotherapyForPrint() {
	var pagetype = "OPDDoctorDesk2";
	var treatmentId = ($("#tid1").html());
	var patientId = $("#pid1").html();
	
	if(treatmentId == undefined && patientId == undefined ){
		treatmentId = ($("#treatmentId").html());
		patientId = $("#pid").html();
	}
	
	var inputs = [];
	inputs.push('action=fectchAllRadiotherapy');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('pagetype=' + pagetype);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
		
			countRadiotherapy = 1;
			testObj = eval('(' + res + ')');	
			
			var divContent="";
			if (testObj.radioList.length > 0) {
					
				for ( var int = 0; int < testObj.radioList.length; int++) {
					divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-4-1 '>" + testObj.radioList[int].serum_creatine + "</td>"
					+ "<td class='form-group col-md-4-1 '>"+testObj.radioList[int].radiationName + "</td>"
					+ "<td class='form-group col-md-2-1 '>"+testObj.radioList[int].adviceDate2+ "-" +testObj.radioList[int].advSimTime + "</td>" 
					+ "<td class='form-group col-md-2-1 '>"+testObj.radioList[int].adviceDateTreatment+ "-" +testObj.radioList[int].advTrtTime + "</td></tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
			}
			$("#RedioAdvice").html(divContent);
			
			
		}
	});
}

function fetchCKEditorDocterDesk1ForPrint() {
	var inputs = [];
	inputs.push('action=fetchCKEditorDocterDesk1');
	inputs.push('treatmentId=' + $("#tid1").html());
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
						var divContent="";
						if ((testObj.pattemplist.length) > 0) {
					
							for ( var int = 0; int < testObj.pattemplist.length; int++) {
								divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>" + testObj.pattemplist[int].tempdata + "</td></tr>";
							}
						}
						else
						{
							divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
						}
						$("#SubObj").html(divContent);
				}
			});
}


/*******************
 * @Author:  Tushar
 * Date:     14 Oct 2016
 * Code For: set data of Follicular Study 
 * 
 * ************************/
function fetchStudyData() {
	
	//var patId = $('#pid').text();
	var patId =  $("#pt_Id").val(); //added by paras

	var inputs = [];
	inputs.push('action=fetchFollicularAll');
	inputs.push('patId=' + patId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setStudyList(r);
		}
	});
}
function setStudyList(data)
{
	var testObj = eval('(' + data + ')');
	$("#rowId").val(testObj.studyList.length+1);
	$("#StudyDispTable").empty();
	if(testObj.studyList.length>0){
		
		for(var i=0;i<testObj.studyList.length;i++)
		{
			if(testObj.studyList[i].status == "Completed"){
				$("#StudyDispTable").append("<tr id='count"+(i+1)+"'><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' type='hidden' id='rowCount"+(i+1)+"' >"+(i+1)+"</div></td>" +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input disabled='disabled' id='stdt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'stdt" + (i+1) + "\'),\'dd/mm/yyyy\',this) placeholder='Start Date' onchange='setQueryType("+(i+1)+")' /></td> " +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input disabled='disabled' id='endt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'endt" + (i+1) + "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("+(i+1)+")'/></td> " +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select disabled='disabled' style='width: 100%;' id='stdstatus"+(i+1)+"' onchange='setQueryType("+(i+1)+")'><option id='1' value='Running'>Running</option><option id='2' value='Completed'>Completed</option><option id='3' value='Stop'>Stop</option></select></td> " +
						"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"+(i+1)+"' class='btn btn-xs btn-success viewStudyBtn' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("+(i+1)+"),viewStudyTable("+(i+1)+")' onchange='setQueryType("+(i+1)+")'><i class='fa fa-eye'></i></button></td>" +
						"<input type='hidden' value='"+(testObj.studyList[i].studyid)+"' id='studyid"+(i+1)+"' /></tr>"
					);
					$('#stdt'+(i+1)).val(testObj.studyList[i].start_date);
					$('#endt'+(i+1)).val(testObj.studyList[i].end_date);
					$('#stdstatus'+(i+1)).val(testObj.studyList[i].status).attr('selected','selected');
			}
			else{
			
			$("#StudyDispTable").append("<tr id='count"+(i+1)+"'><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' type='hidden' id='rowCount"+(i+1)+"' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='stdt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'stdt" + (i+1) + "\'),\'dd/mm/yyyy\',this) onchange='setQueryType("+(i+1)+"),validateNumberWithSlashByRegEx(stdt"+(i+1)+")'/></td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='endt"+(i+1)+"' onclick=displayCalendar(document.getElementById(\'endt" + (i+1) + "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("+(i+1)+"),validateNumberWithSlashByRegEx(endt"+(i+1)+")'/></td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select style='width: 100%;' id='stdstatus"+(i+1)+"' onchange='setQueryType("+(i+1)+")'><option id='1' value='Running'>Running</option><option id='2' value='Completed'>Completed</option><option id='3' value='Stop'>Stop</option></select></td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddenRv"+(i+1)+"' class='btn btn-xs btn-success viewStudyBtn' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("+(i+1)+"),viewStudyTable("+(i+1)+")' type='button' onchange='setQueryType("+(i+1)+")'><i class='fa fa-eye'></i></button></td>"+
				"<input type='hidden' value='"+(testObj.studyList[i].studyid)+"' id='studyid"+(i+1)+"' /></tr>"
			);
			$('#stdt'+(i+1)).val(testObj.studyList[i].start_date);
			$('#endt'+(i+1)).val(testObj.studyList[i].end_date);
			$('#stdstatus'+(i+1)).val(testObj.studyList[i].status).attr('selected','selected');
			}
		}
		var callFrom = ($("#callFrom").val()).trim();
		if (callFrom == "previousTreatmentOPDER") {
			$("#allTabDivID *").prop("disabled", true);
			$(".viewStudyBtn").prop("disabled", false);
		}
		}
	/*else
	{
		$("#StudyDispTable").append("<th colspan = 5>No Record Found</th>");
	}*/
}

function addComment()
{
	$("#txtComment").val("");
	$("#iCommentBox").modal('show');	
}
function HideCommentPopUp() {
	$("#iCommentBox").modal('hide');
}
function closePopUpbtn(){
	$("#viewStudyTablePopup").modal('hide');
	fetchStudyData();
}

function viewStudyTable(rowCount)
{	
	var inidate = $('#stdt'+(rowCount)).val();
	
	//old
	//var patId = $('#pid').text();
//new	
	var patId = $('#pt_Id').val();
//	var Tid = $('#treatmentId').val();
	var Tid = $('#tr_Id').val();
	var inputs = [];
	inputs.push('action=fetchStudyReport');
	inputs.push('tid=' + Tid);
	inputs.push('patId=' + patId);
	inputs.push('inidate=' + inidate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			setStudyTable(r);
			
		}
	});
	
}
function setStudyTable(data)
{
	$("#studydata").html(data);
	var studyQueryType = $('#studyQueryType').val();
	
	var testObj=jQuery.parseJSON(data);
	$('#viewStudyTablePopup').modal();
	$("#testTable").empty();
	if(testObj.follicularReportList.length>0){
		
		for(var i=0;i<testObj.follicularReportList.length;i++)
		{
			if(studyQueryType == "Completed"){
			$("#testTable").append("<tr id='count"+(i+1)+"'><td style='height: 21.5px;' class='col-md-1-1 center'>"+(i+1)+"</td>" +
				"<td style='height: 21.5px;' class='col-md-1-1 center'><input disabled='disabled' onclick=displayCalendar(document.getElementById(\'date" +(i+1)+ "\'),\'dd/mm/yyyy\',this) class='form-control input-SmallText TextFont' id='date"+(i+1)+"' value='"+testObj.follicularReportList[i].study_date+"' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td style='height: 21.5px;' class='col-md-1-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='days"+(i+1)+"' value='"+testObj.follicularReportList[i].days+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td style='height: 21.5px;' class='col-md-2-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='rtov"+(i+1)+"' value='"+testObj.follicularReportList[i].rtov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td style='height: 21.5px;' class='col-md-2-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='ltov"+(i+1)+"' value='"+testObj.follicularReportList[i].ltov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td style='height: 21.5px;' class='col-md-2-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='endo"+(i+1)+"' value='"+testObj.follicularReportList[i].endo+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
				"<td style='height: 21.5px;' class='col-md-1-1 center'><button type='button' disabled='disabled' id='hiddenstd"+(i+1)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='setQueryType1("+(i+1)+"),toRmvStudyDiv("+(i+1)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" +
				"<button type='button' disabled='disabled' id='hiddencmd"+(i+1)+"' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;' onclick='setQueryType1("+(i+1)+"),addComment("+(i+1)+")' type='button'><i class='fa fa-edit'></i></button></td> "+
				"<input type='hidden' id='studyidR"+(i+1)+"' value='"+(testObj.follicularReportList[i].studyid)+"' /><input type='hidden' id='lmpdateid"+(i+1)+"' value='"+(testObj.follicularReportList[i].lmpdate)+"' /></tr>");
			$('#lmpdt').val(testObj.follicularReportList[i].lmpdate);
			$('#stdyCount').val(i+1);
			$('#stdRowCnt').val(i+1);
			$('#saveStudyRecordbtn').prop('disabled',true);
			$('#closeStudyRecordtbn').prop('disabled',true);
			}
			else{
				$("#testTable").append("<tr id='count"+(i+1)+"'><td style='height: 21.5px;' class='col-md-1-1 center'>"+(i+1)+"</td>" +
						"<td style='height: 21.5px;' class='col-md-1-1 center'><input disabled='disabled' onclick=displayCalendar(document.getElementById(\'date" +(i+1)+ "\'),\'dd/mm/yyyy\',this) class='form-control input-SmallText TextFont' id='date"+(i+1)+"' value='"+testObj.follicularReportList[i].study_date+"' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td style='height: 21.5px;' class='col-md-1-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='days"+(i+1)+"' value='"+testObj.follicularReportList[i].days+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td style='height: 21.5px;' class='col-md-2-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='rtov"+(i+1)+"' value='"+testObj.follicularReportList[i].rtov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td style='height: 21.5px;' class='col-md-2-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='ltov"+(i+1)+"' value='"+testObj.follicularReportList[i].ltov+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td style='height: 21.5px;' class='col-md-2-1 center'><input disabled='disabled' type='text' class='form-control input-SmallText TextFont' id='endo"+(i+1)+"' value='"+testObj.follicularReportList[i].endo+"' onkeypress='return validateNumbers(event)' onchange='setQueryType1("+(i+1)+")'></td> " +
						"<td style='height: 21.5px;' class='col-md-1-1 center'><button type='button' id='hiddenstd"+(i+1)+"' class='btn btn-xs btn-danger deleteBtn ' style='margin-center: 6px;cursor: pointer;' onclick='setQueryType1("+(i+1)+"),toRmvStudyDiv("+(i+1)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" +
						"<button type='button' id='hiddencmd"+(i+1)+"' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;' onclick='setQueryType1("+(i+1)+"),addComment("+(i+1)+")' type='button'><i class='fa fa-edit'></i></button></td> "+
						"<input type='hidden' id='studyidR"+(i+1)+"' value='"+(testObj.follicularReportList[i].studyid)+"' /><input type='hidden' id='lmpdateid"+(i+1)+"' value='"+(testObj.follicularReportList[i].lmpdate)+"' /></tr>");
					$('#lmpdt').val(testObj.follicularReportList[i].lmpdate);
					$('#stdRowCnt').val(i+1);
					$('#stdyCount').val(i+1);
			}
		}
		
	//	var callFrom = ($("#callFrom").val()).trim();
		var callFrom = $("#callFrom").val();
		if (callFrom == "previousTreatmentOPDER") {
			$('#viewStudyTablePopup .btn').prop("disabled",true);
			$("#studyPrintBtn").prop("disabled", false);
			$("#closePopUpbtn").prop("disabled", false);
		}
	}
	/*else
	{
		$("#testTable").append("<th colspan = 5>No Record Found</th>");
	}*/
	setStudyRecordGraph();
}

function setStudyTemp()
{		
/*	var gender = $("#patGender").val();
 * 
*/	
	var gender = $("#sex").text();
	if(gender == "Male" ||gender == 'male'){
		alert("You can not initiate process for Male Patient..");
		return false;
	}
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var date = dd + '/' + mm + '/' + yyyy;
	
			var rowId = $("#rowId").val();
			$('#studyid').val(0);
			if(rowId != 0)
				{
					var rw=rowId -1;
					var hiddenstatus = $("#stdstatus"+(rw)).val();
					
					if(hiddenstatus == "Running"){
						alert("Please Complete Current Running Study First..");
						return false;
					}else if(hiddenstatus == "Stop"){
						alert("Please Complete Current Stoped Study First..");
						return false;
					}
				}
			$("#StudyDispTable").append(
					"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"+(rowId)+"</div></td>" +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='stdt"+(rowId)+"' onclick=displayCalendar(document.getElementById(\'stdt" + (rowId) + "\'),\'dd/mm/yyyy\',this) value='"+date+"' onchange='setQueryType("+(rowId)+"),validateNumberWithSlashByRegEx(stdt"+(rowId)+")'/></td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input id='endt"+(rowId)+"' onclick=displayCalendar(document.getElementById(\'endt" + (rowId) + "\'),\'dd/mm/yyyy\',this) placeholder='End Date' onchange='setQueryType("+(rowId)+"),validateNumberWithSlashByRegEx(endt"+(rowId)+")'/></td> " +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><select style='width: 100%;' id='stdstatus"+(rowId)+"' ><option value='Running' selected='selected'>Running</option><option value='Completed'>Completed</option><option value='Stop'>Stop</option></select></td>" +
					"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button type='button' id='hiddensid"+(rowId)+"' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='setQueryType("+(rowId)+")'><i class='fa fa-eye'></i></button></td></tr>"
			);
			rowId++;
			$('#stdt'+(rowId)).val(date);
			$('#rowId').val(rowId);
			$('#iniproc').val(1);
}

function setQueryType(rowId){
	var queryType = $("#stdstatus"+(rowId)).val();
	$('#studyQueryType').val(queryType);
	var queryType = $("#stdt"+(rowId)).val();
	$('#stdt').val(queryType);
	var studyid = $("#studyid"+(rowId)).val();
	$('#studyid').val(studyid);
	$('#cnt').val(rowId);
	
}
function setQueryType1(rowId){
	var queryType = $("#stdt"+(rowId)).val();
	$('#stdt').val(queryType);
	var studyidR = $("#studyidR"+(rowId)).val();
	$('#studyidR').val(studyidR);
	var date = $("#date"+(rowId)).val();
	$('#date').val(date);
	var days = $("#days"+(rowId)).val();
	$('#days').val(days);
	var rtov = $("#rtov"+(rowId)).val();
	$('#rtov').val(rtov);
	var ltov = $("#ltov"+(rowId)).val();
	$('#ltov').val(ltov);
	var endo = $("#endo"+(rowId)).val();
	$('#endo').val(endo);
	$('#stdRowCnt').val(rowId);
}

/*function saveStudy(){
	var rowId = $("#rowId").val();
	var studyid = $("#studyid").val();
	if(rowId != 0){
	rowId--;
	}
	var iniproc =$("#iniproc").val();
	if(iniproc == 0){
		alert("Please initiate new process first.");
		return false;
		}
	//var patId = $('#pid').text();
	
	var patId =  $("#pt_Id").val();//added by paras
	
	var start_date = $("#stdt"+(rowId)).val();
	if (start_date == "" || start_date == undefined) {
		alert("Please Select Start Date...");
		return false;
	}
	 
	 
	var end_date = $("#endt"+(rowId)).val();
	if (end_date == undefined) {
		alert("Please Select End Date...");
		return false;
	}
	var strdt=new Date(start_date);
	 var d2=new Date(end_date);
	// alert(d2);
	  
	 var curr_date = d2.getDate();
	 curr_date=curr_date-2;
	 var curr_month = d2.getMonth();
	 curr_month=curr_month+3;
	 var curr_year = d2.getFullYear();
//alert(curr_year);
	 //curr_year = curr_year.toString().substr(2,2);

	//alert(curr_year+"/"+curr_month+"/"+curr_date);
	//d2=curr_year+"/"+curr_month+"/"+curr_date;
 	 // alert(d2);
	  //return false;
	    var month = d.getMonth() + 1;
	    var day = d.getDate();
 	    alert("day-"+day+"month-"+month+"yr-"+d.getFullYear());
	   var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/'
	            + (day < 10 ? '0' : '') + day; 
	    
	     //var output =  (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear() ;
//alert("alert op-"+output+"alert d2-"+d2);
	    if (d2 < strdt) {
	    	alert("End Date Should be Greater than Start Date...");
	        return false;
	    }
	end_date=end_date.replace(/\//g, '-');
	start_date=start_date.replace(/\//g, '-');
	//end_date=b.reverse();
  	//comparing to date not be past means it should show future
    var d = start_date;
    var month = start_date.getMonth() + 1;
    var day = start_date.getDate();

   var output = start_date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-'
            + (day < 10 ? '0' : '') + day;
    
   // var output =  (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + start_date.getFullYear() ;

    if (new Date(end_date) < new Date(output)) {
    	alert("End Date Should be Greater than Start Date...");
        return false;
    }
	
	
		if(end_date < start_date){
		alert("End Date Should be Greater than Start Date...");
		return false;
		}
	var firstValue = start_date.split('/');
	var secondValue = end_date.split('/');
    alert(firstValue);
	 var firstDate=new Date();
	 firstDate.setFullYear(firstValue[0],(firstValue[1] - 1 ),firstValue[2]);

	 var secondDate=new Date();
	 secondDate.setFullYear(secondValue[0],(secondValue[1] - 1 ),secondValue[2]);     

	  if (secondDate<firstDate)
	  {
	 alert("End Date Should be Greater than Start Date...");
	   return false;
	  }
	 else
	  {
	    alert("Second Date  is greater than First Date");
	    return false;
	  }
	
	var study_status = $("#stdstatus"+(rowId)).val();
	
	var inputs = [];
	inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			alert("Study Saved Successfully...");
			$("#iStudy").attr("class","active");
			fetchStudyData();
			
		}
	});
}
*/
					
function saveStudy(){
	var rowId = $("#rowId").val();
	var studyid = $("#studyid").val();
	if(rowId != 0){
	rowId--;
	}
	var study_status = $("#stdstatus"+(rowId)).val();
	var hiddenstatus = $("#studyQueryType").val();
	var iniproc = $("#iniproc").val();
	/*if(iniproc == 0){
		alert("Please initiate new process first.");
		return false;
	}*/
	if(hiddenstatus == "Running" && iniproc == 0){
		alert("Please Complete Current Running Study First..");
		return false;
	}else if(hiddenstatus == "Stop" && iniproc == 0){
		alert("Please Complete Current Stoped Study First..");
		return false;
		}
//var patId = $('#pid').text();
	
	var patId =  $("#pt_Id").val();//added by paras
	var start_date = $("#stdt"+(rowId)).val();
	if (start_date == "" || start_date == undefined) {
		alert("Please Select Start Date...");
		return false;
	}
	
	var end_date = $("#endt"+(rowId)).val();
	if (end_date == undefined) {
		alert("Please Select End Date...");
		return false;
	}
	
	if (end_date != "") {
		var temp = end_date.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
		//var start_date = $("#stdt").html();
		var addt = start_date.split("/");
		var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
		if (disDate< addDate) {
			alert("End Date Should be Greater than Start Date...");
			return false;
		}
	}
	/*if(end_date != ""){
		if(end_date < start_date){
		alert("End Date Should be Greater than Start Date...");
		return false;
		}
	}
	*/
	var study_status = $("#stdstatus"+(rowId)).val();
	
	var inputs = [];
	inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			alert("Study Saved Successfully...");
			$("#iStudy").attr("class","active");
			fetchStudyData();
			$("#iniproc").val(0);
		}
	});
}


	
/************
 * @author	: Touheed Khan
 * @date	: 17-Oct-2016
 * @codeFor	: Ref. Doctor Making Null If Service Flow is on and Patient from IPD or OPD
 ***********/
function refDocMakngEmpty(callFrom){
var serBilFlw = 	$("#serviceWiseBillingFlow").val();
	//If service wise Billing is on then the ref doc make empty
	if(serBilFlw == "on"){
		
		if(callFrom == "diagnosisBill"){
			//getting patient object from hidden field on jsp
			var details = $("#divPatId").html();
			var pdetails = eval('(' + details + ')');	
			var referPatient = pdetails.objTreat.rt;
			if(referPatient != "diagnosis"){
				$("#consult_doc").html("");	
			}
		}else if(callFrom == "diagnoPatTesAsig" ){
			//getting object for Patient refer to
			var details = $("#PreTre").html();
			var pdetails = eval('(' + details + ')');
			var referPatient = pdetails.objTreat.rt;
			if(referPatient != "diagnosis"){
				$("#nameh").html("");	
			
			}	
		}else if(callFrom == "preDiagBill"){
			//getting object for Patient refer to
			var details = $("#divPatId").html();
			var pdetails = eval('(' + details + ')');	
			var liBM = pdetails.liBM[0].bt;
			if(liBM.charAt(0) != "D"){
				$("#consult_doc").html("");	
			}
		}
	}
}

function saveStudyRecord() {
	var stdyCount = $("#stdyCount").val();
	var RowCount = $("#stdRowCnt").val();
	var Count = $("#count"+(RowCount)).val();
	if (RowCount == 0) {
		alert("Please Add Row to Insert Follicular Study Details.");
		return false;
	}
	
	var studyid = $('#studyidR').val();
	//var Tid = $('#treatmentId').val();
	//var patId = $('#pid').text();
	var Tid = $('#tr_Id').val();  //added bya paras
	var patId = $('#pt_Id').val();   //added bya paras
	
	var inidate = $('#stdt').val();
	var date = $('#date'+(RowCount)).val();
	var days = $('#days'+(RowCount)).val();
	var rtov = $('#rtov'+(RowCount)).val();
	var ltov = $('#ltov'+(RowCount)).val();
	var endo = $('#endo'+(RowCount)).val();
	var lmpdate = $("#lmpdt").val();
	var studycmt = $("#txtComment"+(Count)).val();
	var cnt = $("#cnt").val();
	if(studycmt == undefined){
		studycmt = "--";
	}
	if(txtComment == "" || txtComment == undefined){
		if(stdyCount == RowCount){
			alert("Please Add Row to Insert Follicular Study Details.");
			return false;
		}
	}
	if ((rtov == "" || rtov == undefined) && (ltov == "" || ltov == undefined ) && (endo == "" || endo == undefined)) {
		alert("Please Enter All Value In Row :" + RowCount);
		return false;
		}
	
	var inputs = [];
	inputs.push('action=saveStudyRecord');
	inputs.push('inidate=' + inidate);
	inputs.push('date=' + date);
	inputs.push('days=' + days);
	inputs.push('rtov=' + rtov);
	inputs.push('ltov=' + ltov);
	inputs.push('endo=' + endo);
	inputs.push('Tid=' + Tid);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	inputs.push('lmpdate=' + lmpdate);
	inputs.push('studycmt=' + studycmt);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(ajaxResponse) {
			alert("Study Record Saved Successfully...");
			HideCommentPopUp();
			viewStudyTable(cnt);
		}
	});

}

function closeStudyRecord(){
	
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var date = dd + '/' + mm + '/' + yyyy;
	
	var rowId = $("#rowId").val();
	var studyid = $("#studyid").val();
	if(studyid != 0){
	rowId--;

	}
//old	
//	var patId = $('#pid').text();
	
	var patId = $('#pt_Id').val();	
 	var start_date = $("#stdt"+(rowId)).val();
	if (start_date == "") {
		alert("Please Select Start Date...");
		return false;
	}
	var end_date = date;
	var study_status = "Completed";
	
	var inputs = [];
	inputs.push('action=saveUpdateStudyByID');
	inputs.push('start_date=' + start_date);
	inputs.push('end_date=' + end_date);
	inputs.push('study_status=' + study_status);
	inputs.push('patId=' + patId);
	inputs.push('studyid=' + studyid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error:');
		},
		success : function(r) {
			ajaxResponse = r;
			alert("Study Closed Successfully...");
			closePopUpbtn();
		}
	});
}

function getDataObj(str){
	var arr= str.split("/");
	return new Date(arr[2], arr[1], arr[0]);
}

function toCreateStudyDiv() {
	
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var tdate = dd + '/' + mm + '/' + yyyy;
	
	var studyQueryType = $('#studyQueryType').val();
	if(studyQueryType == "Completed"){
		alert("This Study is Completed, Please Initiate New Process...");
		return false;
	}
	var rowCount = $("#stdRowCnt").val();
	
	if(rowCount == 0){
		$("#testTable").empty();
	}
	rowCount++;
	var days = "";
	var lmpdate = $("#lmpdt").val();
	if(lmpdate != 0 && lmpdate != "" && lmpdate != "0")
	{	
	var d1= getDataObj(tdate);
	var d2= getDataObj(lmpdate);
	days = (d1-d2)/86400000;
	}else if(days == "NaN"){
		days = "0";
	}
	$('#studyidR').val(0);
	$("#testTable").append("<tr id='count"+(rowCount)+"'><td style='height: 21.5px;' class='col-md-1-1 center'>"+(rowCount)+"</td>" +
			"<td style='height: 21.5px;' class='col-md-1-1 center'><input onkeypress='return checkDate(event)' class='form-control input-SmallText TextFont' id='date"+(rowCount)+"' value='"+tdate+"'></td> " +
			"<td style='height: 21.5px;' class='col-md-1-1 center'><input type='text' class='form-control input-SmallText TextFont' id='days"+(rowCount)+"' value='"+days+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td style='height: 21.5px;' class='col-md-2-1 center'><input type='text' class='form-control input-SmallText TextFont' id='rtov"+(rowCount)+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td style='height: 21.5px;' class='col-md-2-1 center'><input type='text' class='form-control input-SmallText TextFont' id='ltov"+(rowCount)+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td style='height: 21.5px;' class='col-md-2-1 center'><input type='text' class='form-control input-SmallText TextFont' id='endo"+(rowCount)+"' onkeypress='return validateNumbers(event)'></td> " +
			"<td style='height: 21.5px;' class='col-md-1-1 center'><button type='button' id='hiddenstd"+(rowCount)+"' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='toRmvStudyDiv("+(rowCount)+")' type='button'><i class='fa fa-trash-o'></i></button> &nbsp; &nbsp;" +
			"<button type='button' id='hiddencmd"+(i+1)+"' class='btn btn-xs btn-warning' style='margin-center: 6px;cursor: pointer;' onclick='addComment("+(rowId)+")' type='button'><i class='fa fa-edit'></i></button></td></tr>");
	
	new JsDatePick({
		useMode : 2,
		target : "date"+(rowCount),
		/* dateFormat:"%d-%M-%Y", */
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		/* cellColorScheme:"beige", */
		dateFormat : "%d/%m/%Y",
		imgPath : "../img/",
		weekStartDay : 1,
	});
	
	$('#stdRowCnt').val(rowCount);
	
}

function toRmvStudyDiv(RowCount) {

	var hr = $('#hiddenstd').val();
	var date = $('#date'+RowCount).val();
	/*var Tid = $('#treatmentId').val();
	var patid = $('#pid').text();*/
	
	var Tid = $('#tr_Id').val();  //added bya paras
	var patId = $('#pt_Id').val();   //added bya paras
	
	var studyidR = $("#studyidR").val();
	var cnt = $("#cnt").val();
	var inputs = [];
	var r = confirm("Are you sure to Delete Study of Date="+date+" ?");
	if (r == false) {
		return false;
	}
	
	inputs.push('action=DeleteStudyRec');
	inputs.push('hr=' + hr);
	inputs.push('date=' + date);
	inputs.push('Tid=' + Tid);
	inputs.push('patid=' + patId);
	inputs.push('studyidR=' + studyidR);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 
		},
		success : function(r) {
			alert("Deleted Successfully...");
			viewStudyTable(cnt);
		}
	});
}

function printStudyData(paramPopupOrPrint) {
	
	callFrom = $("#callFrom").val();
	if (paramPopupOrPrint == "PRINT") {
		var editorContent = CKEDITOR.instances['editorSubObjTreatment'].getData();
		var pid = $.trim($("#patId").html());
		var tid = $.trim($('#treatmentId').val());
		var inidate = $('#stdt').val();
		var pid1 = $.trim($("#pid1").html());
		var tid1 = $.trim($("#tid1").html());
		
		var instructionLanguage = $(
		"input[name='prepInstructionPopup']:checked").val();
		var pageSize = "standard"; //$("input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
		"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		setTimeout(
				function() {
					
					if(pid1 == "" && tid1 == ""){
						window
							.open(("follicularStudyPrint.jsp?pid=" + pid + "&inidate=" + inidate + "&callFrom=" + callFrom
									+ "&tid=" + tid + "&instructionLanguage="
									+ instructionLanguage
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)));
					}
					else{
						window
							.open(("follicularStudyPrint.jsp?pid=" + pid1 + "&inidate=" + inidate + "&callFrom=" + callFrom
									+ "&tid=" + tid1 + "&instructionLanguage="
									+ instructionLanguage
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)));
						
					}
					}, 300);
		
	} 
}

/*******************
 * @Author:  Tushar Code End 
 * ************************/
//Code by Kavita Date-- 28-Nov-2016 @Function For Convert to IPD Notification generated by doctor
function convertToIPDNotify(callfrom) {

	// getting object for Patient refer to
	var patid = 0;
	var treatid = 0;
	if (callfrom == "DoctorDesk") {
		var details = $("#PreTre").html();
		var pdetails = eval('(' + details + ')');
		patid = pdetails.objTreat.pi;
		treatid = pdetails.objTreat.ti;
	}
	
	var inputs = [];
	var r = confirm("Are you sure to convert the patient to IPD ?");
	if (r == false) {
		return false;
	}
	
	inputs.push('action=convertToIPDNotification');
	inputs.push('treatid=' + treatid);
	inputs.push('patid=' + patid);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			 
		},
		success : function(r) {
			alert(r);
		}
	});

}
/*******************
 * @Author:  Tushar Code for fetching radiotherapy previous data @14 Feb 2017 
 * ************************/

var countRadiotherapy = 1;
var radiotherapyTempPrev = "{#foreach $T.radioList as il}"
		+ "<tr>	<td class='col-md-1-1 center' style='height: 35px;'>{countRadiotherapy++}.</td>	"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.serum_creatine}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.radiationName}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.adviceDate2+'-'+$T.il.advSimTime}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.adviceDateTreatment+'-'+$T.il.advTrtTime}</td>"
		+ "</tr>" + "{#/for} ";

function fectchAllRadiotherapyPrev(){
	var pagetype = pageType;
	var treatmentId = ($("#treatmentId").val()).trim();
	var patientId = $("#patId").html();

	var inputs = [];
	inputs.push('action=fectchAllRadiotherapyPrev');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('pagetype=' + pagetype);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
		
			countRadiotherapy = 1;
			pobj1 = eval('(' + res + ')');
			if (pobj1.radioList.length > 0) {
				$("#viewRadioTempPrev").setTemplate(radiotherapyTempPrev);
				$("#viewRadioTempPrev").processTemplate(pobj1);
				
				setTimeout(function(){userAccess();},100);

			} else {
				 //alert("No Radiotherapy...!");
			}
		}
	});
}
/*******************
 * @Author:  Tushar Code End @14 Feb 2017 
 * ************************/
//Sanjay
function setTemplateRis3(type,flag,doctorId) {
	
	if(flag=="1"){
		$("#curTab").css("background-color", "#00ff80");
		$("#prevTab").css("background-color", "");
		$("#callFromRadio").val("current");
	}else{
		$("#prevTab").css("background-color", "#00ff80");
		$("#curTab").css("background-color", "");
		$("#callFromRadio").val("previous");
		
	}
	$("#pageType").html(flag);
	var tId;
	if (type == "view") {
		tId = $("#TID").html();
	} else {

		tId = " ";
	}
	var inputs = [];
	inputs.push('type=' + type);
	inputs.push('tid=' + tId);
	inputs.push('flag=' + flag);
	inputs.push('doctorId=' + doctorId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/getAllRadiologyDetail",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			count = 1;
			var ajaxRes = r;
			
			//var myObj = null;
			if (type == "view") {
				$("#viewtypedata").html();

			} else {
				
				if(flag==1){
					$("#studTabD").setTemplate(RisTemplate);
					$("#studTabD").processTemplate(ajaxRes);
					$("#studTabD1").hide();
					$("#studTabD").show();
				}else{
					/*$("#studTablet").setTemplate(RisTemplate1);
					$("#studTablet").processTemplate(ajaxRes);*/
					$("#studTabD1").setTemplate(RisTemplate1);
					$("#studTabD1").processTemplate(ajaxRes);
					$("#studTabD").hide();
					$("#studTabD1").show();
				}
				
			}
		}
	});
}


function physicalDischargeToIpdTemplate(){
	var date = $("#discharge_date_note").val();
    var time = $("#discharge_Time_note").val();
    var discharge_Type = $("#discharge_Type").val();
    
    if (date == "" || date == null|| date == undefined ) {
        alert("Please select Date");
        return false;
    }
    if (time == "" || time == null || time == undefined ) {
        alert("Please select Time");
        return false;
    }
    if(discharge_Type=="" || discharge_Type==null ||discharge_Type==undefined || discharge_Type=="select"){
    	 alert("Please select Discharge Type!!!");
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
        //    if(r == 1){
                alert("Discharged Successfully");
           // }
        }
    });    
}
function TemplateSummaryPrintforIpd(callfrom)
{
	// by husen goundi modified @date 18 nov 2015
	var dischargedate = $("#discharge_date_note").val();
	if(dischargedate==undefined){
		dischargedate = $("#discharge_date").val();
	}
	if(dischargedate == ""){
		alert("Please save Template Wise summary then print");
		return false;
	}else{
		
		var discharge_Time = $("#discharge_Time_note").val();
		if(discharge_Time==undefined){
			discharge_Time = $("#discharge_Time").val();
		}
		var timeDate=dischargedate +"  "+ discharge_Time;
		var patID =  $("#pid").val();
		var treatID = $("#tid").val(); //Add
	
		var discharge_Type = $("#discharge_Type").val();


			window.open("IPD_TemplateWise_Print.jsp?"+"patID=" +
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)
					+"&dischargedate="+encodeURIComponent(timeDate) +"&callfrom="+ callfrom );
			
		

		
	}
	
}
function ShowSecondPrintPopUp() {
	$("#NewPopUp").show('show');
}
function hideDoctorPrintPopup(){
	$("#iPrintBill").hide();
}
function ShowLangDiv() {
	$("#allRadio").show();
}

function hideLangDiv() {
	$("#allRadio").hide();
}
//Added By Pooja
function DisSummaryLangPopUp() {
	$("#iPrintDsPopUp").show('show');
}
function hideDisSummaryLangPopUp() {
	$("#iPrintDsPopUp").hide('show');
	$("#NewPopUp").hide('show');
	$("#allRadio").hide('show');
}
function showDischargePrintPopup() {
	$("#AllPrintforDischarge").show('show');
}
function hideDischargePrintPopup(){
	$("#AllPrintforDischarge").hide('show');

	
}

function AutoDischargeSummaryPrint2()
{
	// by Tushr @date 14 july 2017
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		//alert(dischargedate);
		var dischargetime = $("#discharge_Time").val();
		var date = dischargedate.split("/");
		var newdate = date[0]+"-"+date[1]+"-"+date[2] + " " + dischargetime + ":00";
		
		var patID = $("#pt_Id").val();
		var treatID = $("#tr_Id").val();
		var recId = "-5";
		var discharge_Type = $("#discharge_Type").val();
		var callfromipd = $("#callfromipd").val();
		var instructionLanguage = $("input[name='langDSPrint']:checked").val();
		var pendFlag = "receipt";
		window.open("AutoDischargeSummaryPrint2.jsp?" + "patID=" + 
				encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)
				+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type)
				+"&callFor="+encodeURIComponent(callFor)+"&recId="+recId+"&type="+encodeURIComponent(callfromipd)+ "&langInstruction=" + encodeURIComponent(instructionLanguage)+"&pendFlag="+pendFlag);
	}
}
function checkAllBoxes(){
	  if(document.getElementById('checkAll').checked){
	 			$('input[name=printTypeDs]').attr('checked', true);
	 	}else{
	 		
	 			$('input[name=printTypeDs]').attr('checked', false);
	 	} 
}
function showCheckAllLangDiv() {
	$("#allCheckLangRadio").show();
}

function editAssesment1() {

	
//	var treatmentId = $.trim($('#treatmentId').val());
	var diagno_slave_id = $('#diagno_slave_id').val();

	var inputs = [];
//	inputs.push('action=fetchAssessment');
	inputs.push('diagno_slave_id=' + diagno_slave_id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipdDischargeSumController/EditAssessment",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					//alert("diagnosis="+res);
					var ajaxResponse = res;
				//	alert(JSON.stringify(res));
					
					
					
					
					for (var i = 0; i < ajaxResponse.assessmentList.length; i++) {
					   //  var diagnosis = ajaxResponse.assessmentList[i].diagnosis;
					    $("#diagnosis").val(ajaxResponse.assessmentList[i].diagnosis);

						$("#icd10_code").val(ajaxResponse.assessmentList[i].icd10_code);
						$("#assesmentDate").val(ajaxResponse.assessmentList[i].date);
						$("#diagno_type").val(ajaxResponse.assessmentList[i].diagno_type);
						$("#comment").val(ajaxResponse.assessmentList[i].comment);
						$("#icd10_id_forAssmnt").val(ajaxResponse.assessmentList[i].icd10_id);
					    $("#diagno_description").val(ajaxResponse.assessmentList[i].diagno_description);
					    
					}

//					$("#diagnosis").val(myObj1.diagnosis);
//					$("#diagno_description").val(myObj1.diagno_description);
//					// $('#divdiagnosis :input').prop('disabled', true);
//					// $('#divdiagno_description :input').prop('disabled', true);
//					// $('#diagnosis').prop('disabled', true);
//					// $('#diagno_description').prop('disabled', true);
//					document.getElementById("diagnosis").disabled = true;
//					document.getElementById("diagno_description").disabled = true;
//					/*
//					 * $('#prep').prop('disabled', true); $('#name').prop('disabled', true);
//					 */
//
//					$("#icd10_code").val(myObj1.icd10_code);
//					$("#assesmentDate").val(myObj1.date);
//					$("#diagno_type").val(myObj1.diagno_type);
//					$("#comment").val(myObj1.comment);
//					$("#icd10_id_forAssmnt").val(myObj1.icd10_id);
//					
					
				
				}
			});

	// disableAsmntTextBoxes();
	// $("#queryType").val('update');
}