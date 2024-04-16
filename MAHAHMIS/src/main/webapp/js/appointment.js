var countForAppo = 1;
var countForFollowUp = 1;
var tempForAppo = 1;

var newPatientTemp = "<div style='width: 39%;margin-left:11%;'><div style='width: 100%;margin-bottom:5px;'>Title : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id='title' ><option value='Mr.'>Mr.</option><option value='Mrs.'>Mrs.</option><option value='Miss.'>Miss.</option><option value='Mast.'>Mast.</option><option value='G-B/O.'>G-B/O.</option><option value='B-B/O.'>B-B/O.</option></select></div><div style='width: 100%;margin-bottom:5px;'>First Name : &nbsp;&nbsp;<input type='text' id='txtPName' onkeypress='return validatealphabetic(event)'></input></div><div style='width: 100%;margin-bottom:5px;'>Last Name : &nbsp;&nbsp;<input type='text' id='txtLastName' onkeypress='return validatealphabetic(event)'></input></div></div><div style='width:50%'><div style=' width: 100%;margin-bottom:5px;'>Mobile No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='patMob'  maxlength='10' onkeypress='return validateNumbers(event)' ></input></div> <div style='widht:100%'><label style='float:left'>Details :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label><textarea rows='' cols=''	style='width: 252px; height: 52px;' id='details' ></textarea></div></div>";

var followUpTemp1 = "<div style='width:100%; font-size:11px;'><div style='width:100%; background-color:#eeeeee; color:#333; border:1px solid #b8b8b8; height:21px;'><div style='width:100%;'>                                                            <div style='width:5%; padding-left:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:15px;'>#</div>                                                            <div style='width:30%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:15px;'>Doctor</div>                                                            <div style='width:30%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:15px;'>Patient</div>                                                            <div style='width:09.60%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:15px;text-align:center;'>Time</div>                                                            <div style='width:14%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:15px;'>App. Date</div>                                                       </div>                            			</div>                                        <div style='width:101.5%; height:95px; overflow:auto; overflow-x:hidden;'>                          		                                                                                                    {#foreach $T.liapp as liapp} <div style='width:100%; border:1px solid #b8b8b8; border-top:none;'>                                      <div style='width:6.20%; text-align:center; padding-top:4px; border-right:1px solid #b8b8b8; height:16px;' onclick='setFollowUp({ $T.liapp.apid},{ $T.liapp.patid},{ $T.liapp.tid},this)' id='{countForFollowUp}'>{countForFollowUp}</div>                                      <div style='width:30.50%;  padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:16px;'>{ $T.liapp.docNm}</div>                                      <div style='width:30.60%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:16px;' id='divPatName{countForFollowUp++}'>{ $T.liapp.patNm}</div>                           			  <div style='width:10%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:16px;text-align:center;'>{ $T.liapp.aptf}</div>                                      <div style='width:13.50%; padding-left:1%; padding-right:1%; padding-top:4px; border-right:1px solid #b8b8b8; height:16px;text-align:center;'>{ $T.liapp.appdt}</div></div>         {#/for}                                                                                      </div>                                </div>";
function saveFollowUp() {
	// alert("asd");
	var appoType = $('input:radio[name=radAppType]:checked').val();
	var divTokens = $("#divTokenNo").html();
	var divAppoList = $("#divAppo").html();
	var txtAppoDate = $('#date-pick').val();
	var txtHiddenFollowUp = $("#txtHiddenFollowUp").val();
	txtHiddenFollowUp = txtHiddenFollowUp.split("#");
	var patName = txtHiddenFollowUp[3];
	var patid = txtHiddenFollowUp[1];
	var tid = txtHiddenFollowUp[2];
	var tableid = txtHiddenFollowUp[0];
	var noOfToken = divTokens.split("#");
	var selHosDept = $('#selHosDept :selected').val();
	if (patName == "" || patid == "" || tid == "") {
		alert("Please Select Patient To Save Appointment.");
		return false;
	} else if (divTokens == "") {
		alert("Please Select Timeslot To Save Appointment.");
		return false;
	} else if (noOfToken.length > 2) {
		alert("Please Select Only One Timeslot To Save Appointment.");
		return false;
	}

	var inputs = [];
	inputs.push('action=SaveFollowUp');

	inputs.push('appoType=' + encodeURIComponent(appoType));
	inputs.push('patName=' + encodeURIComponent(patName));

	inputs.push('divTokens=' + encodeURIComponent(divTokens));
	inputs.push('divAppoList=' + encodeURIComponent(divAppoList));
	inputs.push('patid=' + encodeURIComponent(patid));
	inputs.push('tid=' + encodeURIComponent(tid));
	inputs.push('tableid=' + encodeURIComponent(tableid));
	inputs.push('txtAppoDate=' + encodeURIComponent(txtAppoDate));
	inputs.push('deptid=' + encodeURIComponent(selHosDept));
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);

					if (ajaxResponse == "true") {
						window.location.reload();
					} else {
						alert("Patient treatment is already active,so can't start new treatment.");
						window.location.reload();
					}

				}
			});
	// window.location.reload();
	// $("#divAppo").html(ajaxResponse);

}
function hideAppointment() {
	// btn btn-xs btn-danger
	jQuery(".<btn btn-xs btn-danger>").click(function() {
		jQuery(this).parent("tr").hide();
	});
}

function setFollowUp(tableID, patId, tid, obj) {

	var patName = $("#divPatName" + $(obj).html()).html();

	prevDivBackColor = $("#txtHiddenFollowUpBColor").val();

	if (prevDivBackColor != "" && prevDivBackColor != undefined) {
		$("#" + prevDivBackColor).css('background-color', '#EEEEEE');
	}
	$(obj).css('background-color', '#ffa9a9');
	$("#txtHiddenFollowUp").val(
			tableID + "#" + patId + "#" + tid + "#" + patName);
	$("#txtHiddenFollowUpBColor").val($(obj).attr("id"));
	// alert("txtHiddenFollowUp=>" + $("#txtHiddenFollowUp").val());
}

function cancleFollowAppointment(appointmentId) {
	var r = confirm("Do you want to remove appointment?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=SaveFallowAppointmentRemove');
		// alert(appointmentId);
		inputs.push('appid=' + appointmentId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert("Appointment Removed");
				$("#existing" + appointmentId).html("");
				fetchFollowUp();
				/*
				 * setTimeout(function() { fetchFollowUp(); }, 200);
				 * showDoctorAppointments();
				 */
			}
		});
	}

}

function fetchFollowUp(callFrom) {
	countForFollowUp = 1;
	
	var appointmentDate;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		} else {
		appointmentDate = $("#idTourDateDetails").val();
	}
	var inputs = [];
	inputs.push('action=FetchFollowUp');
	inputs.push('txtAppoDate=' + encodeURIComponent(appointmentDate));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {

					pobj = eval('(' + ajaxResponse + ')');

					$("#followUpList").html(ajaxResponse);
					$("#followUpPatientList").html("");

					var divAppo = $("#divAppo").html();
					divAppo = eval('(' + divAppo + ')');

					var date = $("#idTourDateDetails").val();
					var followUpPatientTemplate1 = '<tbody>{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="FollowUp"}{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX" id="existing{$T.liapp.apid}"><td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setFollowUpAppointmentType(),changeAppointmentOfPatient({$T.liapp.apid})" >change</button><td>{ $T.liapp.docNm}<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">{ $T.liapp.appdt}</br>{ $T.liapp.aptf}<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>{#/if}{#/if}{#/for}';
					$("#followUpPatientList").setTemplate(
							followUpPatientTemplate1);
					$("#followUpPatientList").processTemplate(divAppo);

					var temphtmlDate = $("#followUpPatientList").html();

					var myobj = eval('(' + ajaxResponse + ')');
					var followUpPatientTemplate2 = temphtmlDate
							+ '{#foreach $T.liapp as liapp}<tr class="gradeX" id="existing{$T.liapp.apid}"><td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="getPatientDetailsFollowUp({$T.liapp.apid})" >Schedule </br> Appointment</button><td>{ $T.liapp.docNm}<br /><button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancleFollowAppointment({$T.liapp.apid})">cancel</button></td><td class="center">{ $T.liapp.appdt}</br><br/></td></td></tr>{#/for} <tbody>';
					$("#followUpPatientList").setTemplate(
							followUpPatientTemplate2);
					$("#followUpPatientList").processTemplate(myobj);
					
					$('#FollowUpPatientsToday').html(pobj.liapp.length);
				}
			});
}

function fetchReScheduleAppt() {

	countForFollowUp = 1;

	var date = $("#idTourDateDetails").val();

	var inputs = [];
	inputs.push('action=FetchAppointmentsForReSchedule');
	// inputs.push('txtAppoDate=' + encodeURIComponent(txtAppoDate));
	inputs.push('txtAppoDate=' + encodeURIComponent(date));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {

					$("#reScheduleList").html(ajaxResponse);
					$("#reSchedulePatientList").html("");
					var divAppo = eval('(' + ajaxResponse + ')');

					var followUpPatientTemplate1 = '<tbody>{#foreach $T.liapp as liapp}'
							+ '<tr class="gradeX" id="existing{$T.liapp.apid}">'
							+ '<td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br/><div class="divide-10"></div>'
							//+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatient({$T.liapp.apid})" >change</button>'
							+ '{#if $T.liapp.aptyId=="New"}'
							+ '{#if $T.liapp.patid=="0"}'
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfNewPatient({$T.liapp.apid})" >change</button>'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatient({$T.liapp.apid})" >change</button>'
							+ '{#/if}'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatient({$T.liapp.apid})" >change</button>'
							+ '{#/if}'
							+ '</td>'
							+ '<td>{ $T.liapp.docNm}<br/><div class="divide-10"></div>'
							+ '<button class="btn btn-xs btn-danger" type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td>'
							+ '<td class="center">{ $T.liapp.appdt}</br>{ $T.liapp.aptf}<br/><div class="divide-10"></div>'
							+ '{#if $T.liapp.aptyId=="New"}'
							+ '{#if $T.liapp.patid=="0"}'
							+ '<button class="btn btn-xs btn-success"	type="submit" data-toggle="modal" data-target="" onclick="registerPatient({$T.liapp.apid},\'newReg\')" >Register</button>'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-success" onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>'
							+ '{#/if}'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-success" onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>'
							+ '{#/if}</td></tr>{#/for}';
															
					$("#reSchedulePatientList").setTemplate(followUpPatientTemplate1);
					$("#reSchedulePatientList").processTemplate(divAppo);
					
					$('#ReschedulePatientsToday').html(divAppo.liapp.length);
				}
			});

}

var existingPatientTemp = '<div style="float: left; width: 60%">Patient Name &nbsp;&nbsp;&nbsp; <input type="text" style="width: 60%;"	name="txtPName" id="txtPName" class="auto"	onchange="getTreDetailForAppointment()" />	</div>';

function setExistingPatientTemp() {
	var bean;
	$("#appoCommonDiv").setTemplate(existingPatientTemp);
	$("#appoCommonDiv").processTemplate(bean);

	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=PatientNameforAppointment");

}

function getTreDetailForAppointment() {

	setTimeout(function() {
		var pname = $("#txtPName").val();
		var pid = pname.split("_");
		// alert(pid[1]);
		if (pid[1] == undefined) {
			alert("Please Enter Patient Name");
			$("#txtPName").val("");
			return false;
		}
		$("#txtPName").val(pid[0]);
		$("#hidpatId").val(pid[1]);
		var inputs = [];
		inputs.push('action=FetchTreIdForAppointment');
		inputs.push('pid=' + encodeURIComponent(pid[1]));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {

				// alert(ajaxResponse);
				pobj = eval('(' + ajaxResponse + ')');

				if (pobj.lit.length > 0) {
					$("#trid").val(pobj.lit[0].ti);
				} else {
					$("#trid").val(0);
				}

			}
		});

	}, 500);

}

function setNewPatientTemp() {
	var bean;
	$("#appoCommonDiv").setTemplate(newPatientTemp);
	$("#appoCommonDiv").processTemplate(bean);
}

function pad(number, length) {

	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}

	return str;

}
function timeToSeconds(time) {
	time = time.split(':');
	return time[0] * 3600 + time[1] * 60;
}

function getNAslots() {

	var date = $("#date-pick").val();
	var d = date.split("-");
	var fdate = d[2] + "-" + d[1] + "-" + d[0];

	var inputs = [];
	inputs.push('action=getNAslots');
	inputs.push('appodate=' + fdate);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;

					pobj = eval('(' + ajaxResponse + ')');

					for ( var p = 0; p < pobj.liNA.length; p++) {
						var ftime = pobj.liNA[p].ftime;
						var ft = ftime.split(":");
						var fromt = parseFloat(ft[0] + "." + ft[1]);

						var tt = pobj.liNA[p].ttime.split(":");
						var tot = parseFloat(tt[0] + "." + tt[1]);

						while (fromt <= tot) {
							var fromt1 = fromt.toString();
							var f = fromt1.split(".");
							var divId = ("M" + (pobj.liNA[p].ui) + "M" + (f[0]
									+ ":" + f[1]));
							var divID = document.getElementById(divId);
							$(divID).css('background-color', 'red');
							divID.onclick = null;
							if (f[1] == 3) {
								fromt = fromt + 1;
								fromt = fromt + "." + 00;
							} else {
								fromt = f[0] + "." + 30;
							}

						}

					}

				}
			});
}

var timeSlotsTemp = "<div style='width:100px;border:0px solid #b8b8b8 ;'><div style='width:100px;border:1px solid #b8b8b8;height:23px;color: #333; background-color: #EEEEEE;text-align: center;padding-top:4px;'><label style='font-weight: bold;'>Time</label></div>{#foreach $T.liapp[0].arrtime as arrtime}<div  id='{$T.arrtime.aptf}' style='width:100px;height:57px;border:1px solid #b8b8b8;text-align: center;padding-top:20px;'>{$T.arrtime.attemp}</div>{#/for}</div> {#foreach $T.liapp as liapp}   <div id='{countForAppo++}' style='width:4%;'> <div style='width:100%;border:1px solid #b8b8b8;height:23px;color: #333; background-color: #EEEEEE;text-align: center;padding-top:4px;'><label style='font-weight: bold;'>{$T.liapp.objuser.doc_name}</label></div>{#foreach $T.liapp.arrtime as arrtime}<div onclick=swapImagesAdd('{$T.liapp.objuser.ui}','{$T.arrtime.aptf}') id='M{$T.liapp.objuser.ui}M{$T.arrtime.aptf}'  style='width:100%;border:1px solid #b8b8b8;height:75px;padding-top:2px;text-align:center;'> </div>{#/for}</div>{#/for}";

var tabdivappo = '<div class="container_12 divider">	<div class="grid_4 height400"><table class="fancyTable" id="myTable05" cellpadding="0"	cellspacing="0"><thead>	<tr><th style="width:90px"> Doctor Name  / Time </th>{#foreach $T.liapp as li}<th>{$T.li.objuser.doc_name}</th> {#/for}	</tr></thead><tbody>{#if $T.liapp==""}{#else}{#foreach $T.liapp[0].arrtime as arrtime}<tr><td id="{$T.arrtime.aptf}" align="center" >{$T.arrtime.attemp}</td>{#foreach $T.liapp as liapp}<td class="numeric" onclick=swapImagesAdd("{$T.liapp.objuser.ui}","{$T.arrtime.aptf}") id="M{$T.liapp.objuser.ui}M{$T.arrtime.aptf}"  title="Doctor Name : {$T.liapp.objuser.doc_name}&#13;Timey Slot : {$T.arrtime.attemp}&#13;" ></td>{#/for} </tr>{#/for}{#/if}</tbody></table></div></div>';

function allocateAppointment() {

	var appoTypeAR = $('input:radio[name=radAppoAR]:checked').val();
	var dept = $("#selHosDept :selected").val();
	if (appoTypeAR == 'addAppo') {

		$("#appTyp").show();

	} else if (appoTypeAR == 'removeAppo') {
		$("#appTyp").hide();
	}

	var date = $("#date-pick").val();
	var arrDate = date.split("-");
	var today = new Date();
	var useDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2], 23, 59, 59);
	if (useDate < today || date == "") {
		alert('Please Enter the Correct Date');

		return false;
	} else {

		// alert("hi");
		var inputs = [];
		inputs.push('action=AllocateAppointment');
		inputs.push('appodate=' + $("#date-pick").val());

		inputs.push('deptid=' + dept);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AppointmentServlet",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						// alert(ajaxResponse);
						pobj = eval('(' + ajaxResponse + ')');
						if (pobj.liapp != "") {
							for ( var m = 0; m < pobj.liapp[0].arrtime.length; m++) {

								var arrTime = pobj.liapp[0].arrtime[m].aptf
										.split(":");
								if (arrTime[0] >= 12) {
									if (arrTime[0] > 12) {
										pobj.liapp[0].arrtime[m].attemp = eval((arrTime[0])) - (12);

										pobj.liapp[0].arrtime[m].attemp = pad(
												pobj.liapp[0].arrtime[m].attemp,
												2);
										arrTime[1] = pad(arrTime[1], 2);
										pobj.liapp[0].arrtime[m].attemp = pobj.liapp[0].arrtime[m].attemp
												+ ":" + arrTime[1] + " " + "PM";
									} else {
										arrTime[0] = pad(arrTime[0], 2);
										arrTime[1] = pad(arrTime[1], 2);
										pobj.liapp[0].arrtime[m].attemp = arrTime[0]
												+ ":" + arrTime[1] + " " + "PM";

									}
								} else if (arrTime[0] < 12) {

									arrTime[0] = pad(arrTime[0], 2);
									arrTime[1] = pad(arrTime[1], 2);

									pobj.liapp[0].arrtime[m].attemp = arrTime[0]
											+ ":" + arrTime[1] + " " + "AM";
								}
							}
						}
						$("#timeSlotsTemp").html("");
						// alert(pobj);
						$("#divAppoSlices").setTemplate(tabdivappo);

						$("#divAppoSlices").processTemplate(pobj);

						$("#divAppo").html(ajaxResponse);

						// alert(pobj.liapp[0].arrtime[0].aptf);

						for ( var p = 0; p < pobj.liapp.length; p++) {
							for ( var q = 0; q < pobj.liapp[p].arrtime.length; q++) {
								if (pobj.liapp[p].arrtime[q].st == "red") {
									var divId = ("M"
											+ (pobj.liapp[p].objuser.ui) + "M" + (pobj.liapp[p].arrtime[q].aptf));
									var divID = document.getElementById(divId);
									$(divID).css('background-color', '#EBE9E9');
									divID.onclick = null;
								}
							}
						}

						// code to check before time
						for ( var p = 0; p < pobj.liapp.length; p++) {
							for ( var q = 0; q < pobj.liapp[p].arrtime.length; q++) {
								// var time =
								// (pobj.liapp[p].arrtime[q].attemp).split(" ");
								var time = pobj.liapp[p].arrtime[q].aptf;
								var timesplitbyColon = time.split(":");
								var finalTime = pad(timesplitbyColon[0], 2)
										+ ":" + pad(timesplitbyColon[1], 2);

								var currentTime = formatAMPM(today);
								if (useDate.getDate() == today.getDate()
										&& useDate.getMonth() + 1 == today
												.getMonth() + 1
										&& useDate.getFullYear() == today
												.getFullYear()) {
									if (finalTime < currentTime) {
										var divId = ("M"
												+ (pobj.liapp[p].objuser.ui)
												+ "M" + (pobj.liapp[p].arrtime[q].aptf));
										var divID = document
												.getElementById(divId);
										$(divID).css('background-color',
												'#EBE9E9');
										divID.onclick = null;
									}
								}

								if (pobj.liapp[p].arrtime[q].st == "red") {
									var divId = ("M"
											+ (pobj.liapp[p].objuser.ui) + "M" + (pobj.liapp[p].arrtime[q].aptf));
									var divID = document.getElementById(divId);
									$(divID).css('background-color', '#EBE9E9');
									divID.onclick = null;
								}

							}
						}

						for ( var q = 0; q < pobj.docapp.length; q++) {

							var divId = ("M" + (pobj.docapp[q].docid) + "M" + (pobj.docapp[q].aptf));
							var divID = document.getElementById(divId);

							if (divID != null) {

								// divID.setAttribute("style", "height:auto;");
								var id = "d" + q;
								var x = document.createElement('div');
								x.setAttribute('id', id);
								x
										.setAttribute('onclick',
												"swapRemoveApp('" + id + "',"
														+ pobj.docapp[q].apid
														+ ")");
								x.setAttribute('style',
										'width: 100%;text-align:left;');

								divID.appendChild(x);

								var btn = "";

								if (pobj.docapp[q].aptyId == "Existing"
										&& pobj.docapp[q].mvrflag == "N") {

									btn = "&nbsp;&nbsp;<input type='button' value='MV' style='border-radius: 15px; padding: 0px; margin: 2px;' onclick='registerPatient("
											+ pobj.docapp[q].apid + ",\"mark\")' >";

								} else if (pobj.docapp[q].aptyId == "New"
										&& pobj.docapp[q].mvrflag == "N") {

									btn = "&nbsp;&nbsp;<input type='button' value='R' style='border-radius: 15px; padding: 0px; margin: 2px;' onclick='registerPatient("
											+ pobj.docapp[q].apid + ",\"newReg\")' >";

								}

								document.getElementById(id).innerHTML = "&nbsp;&nbsp;"
										+ pobj.docapp[q].title
										+ ""
										+ pobj.docapp[q].patNm
										+ " "
										+ pobj.docapp[q].lastName + btn;
								$(divID).css('background-color', '#cbffa9');
								$(divID).attr('title',
										'Mobile No : ' + pobj.docapp[q].mobNo);

							}

						}

						$('#myTable05').fixedHeaderTable({
							altClass : 'odd',
							fixedColumns : 1
						});
					}
				});
	}
}

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();

	var strTime = hours + ':' + minutes;
	return strTime;
}

function registerNewPat(appoid) {
	alert(appoid);
	var appoObj = $("#divAppo").html();
	alert(appoObj);

	pobj = eval('(' + appoObj + ')');
	var reqObj = "";
	for ( var p = 0; p < pobj.liapp.length; p++) {
		if (pobj.liapp[p].apid == appoid) {
			reqObj = pobj.liapp[p];
			break;
		}
	}
	reqObj = JSON.stringify(reqObj);

	window.location.href ="PatientServlet?action=NewReg&pagenm=appointment"
		+ "&reqObj=" + reqObj.decodeSpecialChars();
	
	
	
	/*"PatientServlet?action=NewReg&pagenm=appointment"
			+ "&reqObj=" + reqObj.decodeSpecialChars();
*/
}


/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: To get appointment details 
 **********/ 
function registerPatient(appoid,callFrom) {
	
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
			 "appoid" : appoid,
				 
				}, 
		url 	: "ehat/markvisit/getappointmentList",
		timeout : 1000 * 60 * 5,
		cache	: false,
		error	: function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
			$('#AppId').val(appoid);
			
			patid=r.lstAppointment[0].patientId;
			var tCount=r.lstAppointment[0].tCount;
			if(tCount > 0){
				
				alert("Please Close Treatment First");
				
			}else{
				
			
			
			if(callFrom=="newReg"){
			window.location.href ="ehat_reg.jsp?" +"apid="+ encodeURIComponent(appoid)+"&patientApId="+ encodeURIComponent(appoid);}
			if(callFrom=="mark"){
				window.location.href ="ehat_reg.jsp?" +"ptid="+ encodeURIComponent(patid)+"&patientApId="+ encodeURIComponent(appoid);}
			
			setAppTemp(r);
			}
 		}
	});
}
 

/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: setting  tempelate on regester ui
 **********/ 
function setAppTemp(r) {
	 
	$('#prefix').val(r.lstAppointment[0].title);
 	$('#fName').val(r.lstAppointment[0].patientName);
 	$('#lName').val(r.lstAppointment[0].lastName);
	$('#mobile').val(r.lstAppointment[0].mobNo);
	$('#department').val(1);//static value 
	//alert(r.lstAppointment[0].doctorId);
	  
  	$('#doctorName').select2('val',r.lstAppointment[0].doctorId);
	  
}
 /*
function saveVisiteMarkPat(appoid,callFrom) {
	
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
			 "appoid" : appoid,
				 
				}, 
		url 	: "ehat/markvisit/getappointmentList",
		timeout : 1000 * 60 * 5,
		cache	: false,
		error	: function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
			 
			window.location.href ="http://localhost:8080/EhatEnterprise/ehat_reg.jsp?" +"apid="
				+ encodeURIComponent(appoid);
		}
	});
}

function registerNewPat2(appoid) {
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
			 "appoid" : appoid,
				 
				}, 
		url 	: "ehat/markvisit/getappointmentList",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r; 
			setAppTemp(r);
		}
	});
}
 */
 

function swapRemoveApp(divid, appid) {
	var appoTypeAR = $('input:radio[name=radAppoAR]:checked').val();
	if (appoTypeAR == "removeAppo") {
		var divID = document.getElementById(divid);
		var divColor = $(divID).css("backgroundColor");

		if (divColor == "rgb(203, 255, 169)" || divColor == "transparent") {
			$(divID).css('background-color', '#ffa9a9');
			var r = confirm("Are You Confirm To Delete Appointment ");
			if (r == true) {

				var inputs = [];
				inputs.push('action=SaveAppointmentRemove');
				inputs.push('appid=' + appid);
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AppointmentServlet",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						window.location.reload();
					}
				});

			} else {

				$(divID).css('background-color', 'transparent');
			}

		} else {

			$(divID).css('background-color', 'transparent');
		}
	}

}

function swapImagesAdd(userid, timeslots) {
	var appoTypeAR = $('input:radio[name=radAppoAR]:checked').val();
	if (appoTypeAR == "addAppo") {
		vardivID = "M" + userid + "M" + timeslots;

		var divID = document.getElementById(vardivID);

		var divColor = $(divID).css("backgroundColor");

		if (divColor == "rgb(203, 255, 169)" || divColor == "transparent"
				|| divColor == "rgb(214, 224, 239)"
				|| divColor == "rgb(238, 242, 249)") {
			$(divID).css('background-color', '#ffa9a9');
			$("#divTokenNo").html($("#divTokenNo").html() + vardivID + "#");
			// alert($("#divTokenNo").html());
		} else {
			var divTokenNo1 = $("#divTokenNo").html();
			var divTokenNo2 = divTokenNo1.replace(vardivID + '#', '');
			$("#divTokenNo").html(divTokenNo2);
			$(divID).css('background-color', 'transparent');
		}
	}
	// updateAppointments();
}

function saveAppointment() {

	var appoType = $('input:radio[name=radAppType]:checked').val();
	if (appoType == "" || appoType == undefined) {
		alert("Please select any radio button.");
		return false;
	}

	if (appoType == "FollowUp") {

		saveFollowUp();

	} else if (appoType == "Existing" || appoType == "New") {

		updateAppointments();

	}
}

function updateAppointments() {
 
	var appoTypeAR = $('input:radio[name=radAppoAR]:checked').val();

	var appoType = $('input:radio[name=radAppType]:checked').val();

	var divTokens = $("#divTokenNo").html();
	var divAppoList = $("#divAppo").html();
	var trid = $("#trid").val();
	var patid = $("#hidpatId").val();
	var txtAppoDate = $('#date-pick').val();
	var patName = $("#txtPName").val();
	var patLastName = $("#txtLastName").val();
	var title = $("#title").val();

	var patMob = $("#patMob").text();
	 
	 
	var details = $('#details').val();
	var description = $('#new_description').val();

	// alert(description);

	var noOfToken = divTokens.split("#");

	if (title == "select" || title == undefined) {
		alert("Please Select Patient Title To Save Appointment.");
		return false;
	}else if (patName == "" || patName == undefined) {
		alert("Please Enter Patient First Name To Save Appointment.");
		return false;
	} else if (patLastName == "") {
		alert("Please Enter Patient Last Name To Save Appointment.");
		return false;
	} else if (divTokens == "") {
		alert("Please Select Timeslot To Save Appointment.");
		return false;
	} else if (appoType == "New") {
		alert(patMob.length);
		if (patMob == "") {
			alert("Please Enter Patient Mobile No To Save Appointment.");
			return false;
		}

		 if(patMob.length!=10){
			alert("Length of Mobile Number Should 10 Digit !!!");
			return false;
		} 
		else if (noOfToken.length > 2) {
			alert("Please Select Only One Timeslot To Save Appointment.");
			return false;
		}

	} else if (noOfToken.length > 2) {
		alert("Please Select Only One Timeslot To Save Appointment.");
		return false;
	}

	var inputs = [];
	inputs.push('action=SaveAppointmentAdd');
	inputs.push('appoTypeAR=' + appoTypeAR);
	inputs.push('appoType=' + appoType);
	inputs.push('title=' + encodeURIComponent(title));
	inputs.push('patName=' + encodeURIComponent(patName));
	inputs.push('patLastName=' + encodeURIComponent(patLastName));
	inputs.push('patMob=' + encodeURIComponent(patMob));
	inputs.push('details=' + encodeURIComponent(details));
	inputs.push('description=' + encodeURIComponent(description));
	inputs.push('divTokens=' + encodeURIComponent(divTokens));
	inputs.push('divAppoList=' + encodeURIComponent(divAppoList));
	inputs.push('trid=' + trid);
	inputs.push('patid=' + patid);
	inputs.push('txtAppoDate=' + txtAppoDate);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AppointmentServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if (ajaxResponse == "Appointment Saved successfully...") {
				location.reload();
			}
		}
	});

}

/** ************************* start app month view ******************* */

var fetchAllDoctorTemp = "<option value='0' >Select</option>{#foreach $T.dl as dl}<option onclick='fetchMonthAppo({$T.dl.ui})' value='{$T.dl.ui}' >{$T.dl.doc_name}</option>{#/for}";

function fetchAllDoctor() {

	var inputs = [];
	inputs.push('action=fetchAllDoctor');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../DoctorServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			// alert(ajaxResponse);
			objc = eval('(' + ajaxResponse + ')');

			$("#selDocNm").setTemplate(fetchAllDoctorTemp);
			$("#selDocNm").processTemplate(objc);
		}
	});

}

function fetchMonthAppo(ui) {

	$('#calendar').html("");

	var inputs = [];
	inputs.push('action=FetchAllAppoDetForDoc');
	inputs.push('ui=' + ui);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../AppointmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

			var aa = [];

			for ( var i = 0; i < pobj.liapp.length; i++) {

				var string1 = pobj.liapp[i].appdt;

				var string2 = pobj.liapp[i].aptf;

				var dte = string1.split("-");

				var tim = string2.split(":");

				var tttt = dte[1] - 1;

				aa[i] = {

					title : pobj.liapp[i].patNm,
					start : new Date(dte[0], tttt, dte[2], tim[0], tim[1]),
					allDay : false

				};
			}

			$('#calendar').fullCalendar({

				theme : true,
				header : {
					left : 'prev,next today',
					center : 'title',
					right : ''// 'month,agendaWeek,agendaDay'
				},
				editable : false,
				events : aa
			});

			/*
			 * var date = new Date(); var d = date.getDate(); var m =
			 * date.getMonth(); var y = date.getFullYear();
			 * 
			 * $('#calendar').fullCalendar({ editable : true, events : [ { title :
			 * 'Lunch', start : new Date(y, m, d, 12, 0), allDay : false }, {
			 * title : 'Lunch', start : new Date(2012, 9, 11, 12, 0), allDay :
			 * false } ] });
			 */

		}
	});

}

function fetchHospitalDepartments() {

	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					// alert(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#selHosDept")
							.setTemplate(
									"<option value='0'>-Select-</option>{#foreach $T.liDep as liDep}<option value='{$T.liDep.depId}'>{$T.liDep.depNm}</option>{#/for}");
					$("#selHosDept").processTemplate(pobj1);

					$("#selHosDeptNew")
							.setTemplate(
									"<option value='0'>-Select-</option>{#foreach $T.liDep as liDep}<option value='{$T.liDep.depId}'>{$T.liDep.depNm}</option>{#/for}");
					$("#selHosDeptNew").processTemplate(pobj1);

				}
			});
}

function getDoctorNameList(callFrom) {

	var unitId = $("#unitId").val();
	var specialisationId = 0;
	
	if (callFrom == "New") {
		specialisationId = $("#selHosDeptNew").val();
	} else {
		specialisationId = $("#selHosDept").val();
	}

	var inputs = [];	
	inputs.push('callFrom=appointment');
	inputs.push('unitId='+unitId);	
	inputs.push('drDeptId='+specialisationId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		data : str + "&reqType=AJAX",
		type : "POST",
		url : "ehat/users/getDoctorListBySpecialization",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var htm = "<option id=0>--Select--</option>";
			for ( var i = 0; i < r.doctorList.length; i++) {
		
				htm = htm + "<option id="+r.doctorList[i].doctor_ID+">"+r.doctorList[i].doc_name+"</option>";
			}

			if (callFrom == "New") {
				
				$("#selDoctorNameNew").html(htm);
			} else {
				
				$("#selDoctorName").html(htm);
			}
		}
	});
}

function getDoctorTimeList(callFrom) {
	var appointmentDate;
	var doctorId;
	var arrDate;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		arrDate = ($("#idNewAppointment").val()).split("/");
		doctorId = $("#selDoctorNameNew").val();

	} else {
		appointmentDate = $("#idTourDateDetails").val();
		arrDate = ($("#idTourDateDetails").val()).split("/");
		doctorId = $("#selDoctorName").val();
	}

	if (appointmentDate == null || appointmentDate == undefined
			|| appointmentDate == "") {
		alert("Please Select Date");
		if (callFrom == "New") {
			$("#selDoctorNameNew").val(0);
		} else {
			$("#selDoctorName").val(0);
		}
		return false;
	}

	var morningStartTime;
	var morningEndTime;
	var afterNoonStartTime;
	var afterNoonEndTime;
	var eveningStartTime;
	var eveningEndTime;
	var morningDuration;
	var afterNoonDuration;
	var eveningDuration;

	var morning;
	var afterNoon;
	var evening;
	var oneTime;

	var date = new Date(arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]);
	var day = date.getDay();
	
	if ((appointmentDate != "" || appointmentDate != null)
			|| (doctorId != "" || doctorId != null || doctorId != 0)) {
	
		if (doctorId == 0) {
			alert("Please Select Doctor Name First");
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){
			    dd='0'+dd
			} 
			if(mm<10){
			    mm='0'+mm
			} 
			var today = dd+'/'+mm+'/'+yyyy;
		
			if (callFrom == "New") {
				$("#idNewAppointment").val(today);
			}else {
				$("#idTourDateDetails").val(today);
			}
			return false;
		}
		
	var inputs = [];
	inputs.push('action=getDoctorTimeList');
	if (callFrom == "New") {
		inputs.push('doctorId=' + $("#selDoctorNameNew").val());
	} else {
		inputs.push('doctorId=' + $("#selDoctorName").val());
	}
	inputs.push('appointmentDate=' + appointmentDate);
	inputs.push('pageName=Appointment');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					//alert(ajaxResponse);
					$("#DocNotAvailable").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');

					if (day == 1) {
						morningStartTime = pobj1.monMorningStart;
						morningEndTime = pobj1.monMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.monAfternoonStart;
						afterNoonEndTime = pobj1.monAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.monEverningStart;
						eveningEndTime = pobj1.monEverningEnd;
						eveningDuration = pobj1.duration;

					} else if (day == 2) {
						morningStartTime = pobj1.tueMorningStart;
						morningEndTime = pobj1.tueMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.tueAfternoonStart;
						afterNoonEndTime = pobj1.tueAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.tueEverningStart;
						eveningEndTime = pobj1.tueEverningEnd;
						eveningDuration = pobj1.duration;

					} else if (day == 3) {
						morningStartTime = pobj1.wedMorningStart;
						morningEndTime = pobj1.wedMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.wedAfternoonStart;
						afterNoonEndTime = pobj1.wedAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.wedEverningStart;
						eveningEndTime = pobj1.wedEverningEnd;
						eveningDuration = pobj1.duration;

					} else if (day == 4) {
						morningStartTime = pobj1.thiMorningStart;
						morningEndTime = pobj1.thiMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.thiAfternoonStart;
						afterNoonEndTime = pobj1.thiAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.thiEverningStart;
						eveningEndTime = pobj1.thiEverningEnd;
						eveningDuration = pobj1.duration;

					} else if (day == 5) {
						morningStartTime = pobj1.friMorningStart;
						morningEndTime = pobj1.friMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.friAfternoonStart;
						afterNoonEndTime = pobj1.friAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.friEverningStart;
						eveningEndTime = pobj1.friEverningEnd;
						eveningDuration = pobj1.duration;

					} else if (day == 6) {
						morningStartTime = pobj1.satMorningStart;
						morningEndTime = pobj1.satMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.satAfternoonStart;
						afterNoonEndTime = pobj1.satAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.satEverningStart;
						eveningEndTime = pobj1.satEverningEnd;
						eveningDuration = pobj1.duration;

					} else if (day == 0) {
						morningStartTime = pobj1.sunMorningStart;
						morningEndTime = pobj1.sunMorningEnd;
						morningDuration = pobj1.duration;

						afterNoonStartTime = pobj1.sunAfternoonStart;
						afterNoonEndTime = pobj1.sunAfternoonEnd;
						afterNoonDuration = pobj1.duration;

						eveningStartTime = pobj1.sunEverningStart;
						eveningEndTime = pobj1.sunEverningEnd;
						eveningDuration = pobj1.duration;
					}

					var timeSlots = [];
					var slotDuration = [];
					var valueTimeSlots = [];
					if (morningStartTime != null
							&& morningStartTime != morningEndTime) {
						morning = "Morning " + morningStartTime + "-"
								+ morningEndTime;
						timeSlots.push(morning);
						slotDuration.push(morningDuration);
						valueTimeSlots.push(morningStartTime + "-"
								+ morningEndTime + "-" + morningDuration);
					}
					if (afterNoonStartTime != null
							&& afterNoonStartTime != afterNoonEndTime) {
						afterNoon = "Afternoon " + afterNoonStartTime + "-"
								+ afterNoonEndTime;
						timeSlots.push(afterNoon);
						slotDuration.push(afterNoonDuration);
						valueTimeSlots.push(afterNoonStartTime + "-"
								+ afterNoonEndTime + "-" + afterNoonDuration);
					}

					if (eveningStartTime != null
							&& eveningStartTime != eveningEndTime) {
						evening = "Evening " + eveningStartTime + "-"
								+ eveningEndTime;
						timeSlots.push(evening);
						slotDuration.push(eveningDuration);
						valueTimeSlots.push(eveningStartTime + "-"
								+ eveningEndTime + "-" + eveningDuration);
					}
					
					if(pobj1.listForDoctorAvailable.length > 0){
						var Duration = pobj1.duration;
						var oneTimeStartTime;
						var oneTimeEndTime;
						for(var z = 0; z < pobj1.listForDoctorAvailable.length; z++){
							oneTimeStartTime = pobj1.listForDoctorAvailable[z].ftime;
							oneTimeEndTime = pobj1.listForDoctorAvailable[z].ttime;
							if (oneTimeStartTime != null
									&& oneTimeStartTime != oneTimeEndTime) {
								oneTime = "One-Time " + oneTimeStartTime + "-"
										+ oneTimeEndTime;
								timeSlots.push(oneTime);
								slotDuration.push(Duration);
								valueTimeSlots.push(oneTimeStartTime + "-"
										+ oneTimeEndTime + "-" + Duration);
							}
						}
					}
					
					if (callFrom == "New") {
						$('#selDoctorTimeNew').empty();
						$('#selDoctorTimeNew').append(
								$('<option>').text('-Select-').val("0"));
						for ( var i = 0; i < timeSlots.length; i++) {
							$('#selDoctorTimeNew').append(
									$('<option>').text(timeSlots[i]).val(
											valueTimeSlots[i]));
						}
					} else {
						$('#selDoctorTime').empty();
						$('#selDoctorTime').append(
								$('<option>').text('-Select-').val("0"));
						for ( var j = 0; j < timeSlots.length; j++) {
							$('#selDoctorTime').append(
									$('<option>').text(timeSlots[j]).val(
											valueTimeSlots[j]));
						}
					}
					if (undefined != pobj1.color) {
						$("#color").val(pobj1.color);
						$("#eventsAppointment").val(pobj1.color);
						$("#eventsAppointment").css("background-color",
								pobj1.color);
					}
					
					
				}
			});
	}
}

/** ************************* End app month view ******************* */

// Common document ready function
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function initTemplate() {

}

// ////////////////////////////////////////////////

function showDoctorAppointments(callFrom) {

	var appointmentType = $("#appointmentType").val();
	var color = $("#color").val();

	if (callFrom == "calender1") {
		var doctorId;
		var doctorTim;
		// var now = new Date();
		var date = new Date();
		var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/'
				+ date.getFullYear());
		var startTime;
		var endTime;
		var cuurentHours;
		now.setHours(0, 0, 0, 0);
		var selectedDate;
		var appDate;
		var arrAppDate;
		var startTime;
		var endTime;
		var duration;
		if (appointmentType == "New") {
			doctorId = $("#selDoctorNameNew").val();
			doctorTime = ($("#selDoctorTimeNew").val()).split("-");
			// now = new Date();
			startTime = parseInt(doctorTime[0]);// parseInt($("#startTime").val());
			endTime = parseInt(doctorTime[1]);// parseInt($("#endTime").val());
			cuurentHours = parseInt(now.getHours());
			now.setHours(0, 0, 0, 0);

			var arrSceduleDate = ($("#idNewAppointment").val()).split("/");
			selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
					+ "/" + arrSceduleDate[2]);

			if ((selectedDate < now)) {
				alert('Appointment not availables for previous date,please select another date');
				return false;
			} else if (((startTime >= cuurentHours) && (endTime > cuurentHours))
					|| (selectedDate > now)) {
			}
			appDate = $("#idNewAppointment").val();
			arrAppDate = appDate.split("/");
			startTime = parseInt(doctorTime[0]);
			endTime = parseInt(doctorTime[1]);
			duration = parseInt(doctorTime[2]);

			var events = new Array();
			
			//for doctor not available
			//@Code-By = Kavita Bhangale Date= 25/10/2016
			var na = $("#DocNotAvailable").html();
			na = eval('(' + na + ')');
			
			if (na.liNA.length > 0) {
				for ( var j = 0; j < na.liNA.length; j++) {
					
					var NAReason = 'Doctor Not Available' + ' --- (' + na.liNA[j].nte + ')';
					var arrTempDate = (na.liNA[j].date).split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];

					event = new Object();
					event.title = NAReason;
					event.start = appStartDate + "T" + na.liNA[j].ftime;
					event.end = appStartDate + "T" + na.liNA[j].ttime; 
					event.backgroundColor = Theme.colors.blue;
					event.color = Theme.colors.blue;
					event.allDay = false;
					events.push(event);
				}
			}
			//Kavita code End

			var r = $("#divAppo").html();
			r = eval('(' + r + ')');

			
			for ( var i = 0; i < r.liapp.length; i++) {
				if (r.liapp[i].docid == doctorId) {
					var appStartTime = r.liapp[i].aptf;
					var patientName;
					patientName = r.liapp[i].title + r.liapp[i].patNm + ' '
							+ r.liapp[i].lastName;
					var appTimeStart;
					var tempTime;
					if (appStartTime % 1 != 0) {
						var arrAppStartTime = appStartTime.toString()
								.split('.');
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
					var appTimeEnd = addMinutes(appTimeStart, duration);
					var arrTempDate = (r.liapp[i].appdt).split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]+ "-" + arrTempDate[0];
					// var appStartDate = r.liapp[i].appdt;

					event = new Object();
					event.title = patientName;
					event.start = appStartDate + "T" + appTimeStart;// its a
					// date //
					// string
					event.end = appStartDate + "T" + appTimeEnd; // its a
					// date //
					// string.
					if (color == "yellow") {
						event.backgroundColor = Theme.colors.yellow;
						event.color = Theme.colors.yellow;
					} else if (color == "red") {
						event.backgroundColor = Theme.colors.red;
						event.color = Theme.colors.red;
					} else if (color == "orange") {
						event.backgroundColor = Theme.colors.orange;
						event.color = Theme.colors.orange;
					} else if (color == "pink") {
						event.backgroundColor = Theme.colors.pink;
						event.color = Theme.colors.pink;
					} else if (color == "green") {
						event.backgroundColor = Theme.colors.green;
						event.color = Theme.colors.green;
					}

					event.allDay = false; //
					events.push(event);
				}
			}

			$('#calendar1').html("");
			$('#calendar1')
					.fullCalendar(
							{
								header : {
									left : '',
									center : 'title',
									right : '',
									allDaySlot : false,
								},
								allDaySlot : !0,
								allDayText : "all-day",
								firstHour : startTime,
								slotMinutes : duration,
								defaultEventMinutes : 120,
								axisFormat : "h(:mm)tt",
								timeFormat : {
									agenda : "h:mm{ - h:mm}"
								},
								dragOpacity : {
									agenda : .5
								},
								minTime : startTime,
								maxTime : endTime,
								slotEventOverlap : !0,
								selectable : true,
								selectHelper : true,
								select : function(start, end, allDay) {

									$("#appDateTime").val(start);
									$("#appEndTime").val(end);

									if ($("#appDateTime").val(start) != $(
											"#appEndTime").val(end)) {
										var r = confirm("Do you want to schedule appoinment?");
										if (r == true) {
											scheduleAppointmentOfPatient('New');
										}
									}
									$(".popup").show();
									$(".title").focus();
									$(".submitFrom").click(
											function() {

												var title = $(
														"#selDoctorNameNew")
														.text();

												if (title) {

													calendar.fullCalendar(
															'renderEvent', {
																title : title,
																start : start,
																end : end,
																allDay : allDay
															}, true // make the
													// event
													// "stick"
													);
												}
												$(".popup").hide();
											});

									$(".exit").click(function() {
										// clear all info, unselect events
										// and...
										$(".popup").hide();
									});

									// calendar.fullCalendar('unselect');

								},
								// editable : true//,
								droppable : true
							});
			$('#calendar1').fullCalendar('gotoDate', arrAppDate[2],
					(arrAppDate[1] - 1), arrAppDate[0]);
			$('#calendar1').fullCalendar('addEventSource', events);
		} else {
			doctorId = $("#selDoctorNameNew").val();
			doctorTime = ($("#selDoctorTimeNew").val()).split("-");
			// var now = new Date();
			var date = new Date();
			var now = new Date((date.getMonth() + 1) + '/' + date.getDate()
					+ '/' + date.getFullYear());
			startTime = parseInt(doctorTime[0]);// parseInt($("#startTime").val());
			endTime = parseInt(doctorTime[1]);// parseInt($("#endTime").val());
			cuurentHours = parseInt(now.getHours());
			now.setHours(0, 0, 0, 0);
			var arrSceduleDate = ($("#idNewAppointment").val()).split("/");
			selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
					+ "/" + arrSceduleDate[2]);
			if ((selectedDate < now)) {
				alert('Appointment not availables for previous date,please select another date');
				return false;
			} else if (((startTime >= cuurentHours) && (endTime > cuurentHours))
					|| (selectedDate > now)) {
			}
			appDate = $("#idNewAppointment").val();
			arrAppDate = appDate.split("/");
			startTime = parseInt(doctorTime[0]);
			endTime = parseInt(doctorTime[1]);
			duration = parseInt(doctorTime[2]);
			
			var events = new Array();
			
			//for doctor not available
			//@Code-By = Kavita Bhangale Date= 25/10/2016
			var na = $("#DocNotAvailable").html();
			na = eval('(' + na + ')');
			
			if (na.liNA.length > 0) {
				for ( var j = 0; j < na.liNA.length; j++) {
					
					var NAReason = 'Doctor Not Available' + ' --- (' + na.liNA[j].nte + ')';
					var arrTempDate = (na.liNA[j].date).split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];

					event = new Object();
					event.title = NAReason;
					event.start = appStartDate + "T" + na.liNA[j].ftime;
					event.end = appStartDate + "T" + na.liNA[j].ttime; 
					event.backgroundColor = Theme.colors.blue;
					event.color = Theme.colors.blue;
					event.allDay = false;
					events.push(event);
				}
			}
			//Kavita code End

			var r = $("#divAppo").html();
			r = eval('(' + r + ')');

		
			
			for ( var i = 0; i < r.liapp.length; i++) {
				if (r.liapp[i].docid == doctorId) {
					var appStartTime = r.liapp[i].aptf;
					var patientName;
					patientName = r.liapp[i].title + r.liapp[i].patNm + ' '
							+ r.liapp[i].lastName;
					var appTimeStart;
					var tempTime;
					if (appStartTime % 1 != 0) {
						var arrAppStartTime = appStartTime.toString()
								.split('.');
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
					var appTimeEnd = addMinutes(appTimeStart, duration);
					var arrTempDate = (r.liapp[i].appdt).split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];
					// var appStartDate = r.liapp[i].appdt;
					event = new Object();
					event.title = patientName;
					event.start = appStartDate + "T" + appTimeStart;// its a
					// date //
					// string
					event.end = appStartDate + "T" + appTimeEnd; // its a
					// date //
					// string.
					if (color == "yellow") {
						event.backgroundColor = Theme.colors.yellow;
						event.color = Theme.colors.yellow;
					} else if (color == "red") {
						event.backgroundColor = Theme.colors.red;
						event.color = Theme.colors.red;
					} else if (color == "orange") {
						event.backgroundColor = Theme.colors.orange;
						event.color = Theme.colors.orange;
					} else if (color == "pink") {
						event.backgroundColor = Theme.colors.pink;
						event.color = Theme.colors.pink;
					} else if (color == "green") {
						event.backgroundColor = Theme.colors.green;
						event.color = Theme.colors.green;
					}

					event.allDay = false; //
					events.push(event);
				}
			}

			$('#calendar1').html("");
			$('#calendar1')
					.fullCalendar(
							{
								header : {
									left : '',
									center : 'title',
									right : '',
									allDaySlot : false,
									
								},
								allDaySlot : !0,
								allDayText : "all-day",
								firstHour : startTime,
								slotMinutes : duration,
								defaultEventMinutes : 120,
								axisFormat : "h(:mm)tt",
								timeFormat : {
									agenda : "h:mm{ - h:mm}"
								},
								dragOpacity : {
									agenda : .5
								},
								minTime : startTime,
								maxTime : endTime,
								slotEventOverlap : !0,
								selectable : true,
								selectHelper : true,
								select : function(start, end, allDay) {

									if ($("#patientDetails").html() == ""
											|| $("#patientDetails").html() == null) {
										if ($("#appointmentType").val() != "New") {
											alert("Select Patient");
											return false;
										}
									}

									$("#appDateTime").val(start);
									$("#appEndTime").val(end);

									var r = confirm("Do you want to schedule appoinment?");
									if (r == true) {
										scheduleAppointmentOfPatient();
									}

									// $(".popup").show();
									$(".title").focus();
									$(".submitFrom").click(
											function() {

												var title = $(
														"#selDoctorNameNew")
														.text();

												if (title) {

													calendar.fullCalendar(
															'renderEvent', {
																title : title,
																start : start,
																end : end,
																allDay : allDay
															}, true // make the
													// event
													// "stick"
													);
												}
												$(".popup").hide();
											});

									$(".exit").click(function() {
										// clear all info, unselect events
										// and...
										$(".popup").hide();
									});

									// calendar.fullCalendar('unselect');
								},
								// editable : true//,
								droppable : true
							});
			$('#calendar1').fullCalendar('gotoDate', arrAppDate[2],
					(arrAppDate[1] - 1), arrAppDate[0]);
			$('#calendar1').fullCalendar('addEventSource', events);
		}

	} else {

		var doctorId = $("#selDoctorName").val();
		var doctorTime = ($("#selDoctorTime").val()).split("-");
		// var now = new Date();
		var date = new Date();
		var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/'
				+ date.getFullYear());

		var startTime = parseInt(doctorTime[0]);// parseInt($("#startTime").val());
		var endTime = parseInt(doctorTime[1]);// parseInt($("#endTime").val());
		var cuurentHours = parseInt(now.getHours());
		now.setHours(0, 0, 0, 0);

		var arrSceduleDate = ($("#idTourDateDetails").val()).split("/");
		selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
				+ "/" + arrSceduleDate[2]);

		if ((selectedDate < now)) {
			alert('Appointment not availables for previous date,please select another date');
			return false;
		} else if (((startTime >= cuurentHours) && (endTime > cuurentHours))
				|| (selectedDate > now)) {

		}
		var appDate = $("#idTourDateDetails").val();
		var arrAppDate = appDate.split("/");
		var startTime = parseInt(doctorTime[0]);
		var endTime = parseInt(doctorTime[1]);
		var duration = parseInt(doctorTime[2]);

		var r = $("#divAppo").html();
		r = eval('(' + r + ')');
		
		var na = $("#DocNotAvailable").html();
		na = eval('(' + na + ')');

		var events = new Array();
		var events1 = [];
		
		//for doctor not available
		//@Code-By = Kavita Bhangale Date= 25/10/2016
		if (na.liNA.length > 0) {
			for ( var j = 0; j < na.liNA.length; j++) {
				
				// dateCompare function returns 1 if greater, -1 if less and 0 if the same
				//var checkStartTime = dateCompare(nAstartTime, doctorTime[0]);
				//var checkEndTime = dateCompare(nAendTime, doctorTime[1]);
				
				var NAReason = 'Doctor Not Available' + ' --- (' + na.liNA[j].nte + ')';
				var arrTempDate = (na.liNA[j].date).split("/");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
						+ "-" + arrTempDate[0];

				event = new Object();
				event.title = NAReason;
				event.start = appStartDate + "T" + na.liNA[j].ftime;
				event.end = appStartDate + "T" + na.liNA[j].ttime; 
				event.backgroundColor = Theme.colors.blue;
				event.color = Theme.colors.blue;
				event.allDay = false;
				events1.push(event);
				events.push(event);
			}
		}
		//Kavita code End
		
		//for appointments scheduled
		for ( var i = 0; i < r.liapp.length; i++) {
			if (r.liapp[i].docid == doctorId) {
				var appStartTime = r.liapp[i].aptf;
				var patientName;
				patientName = r.liapp[i].title + r.liapp[i].patNm + ' '
						+ r.liapp[i].lastName;
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
				var appTimeEnd = addMinutes(appTimeStart, duration);
				var arrTempDate = (r.liapp[i].appdt).split("/");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1] + "-"
						+ arrTempDate[0];
				// var appStartDate = r.liapp[i].appdt;

				event = new Object();
				event.title = patientName;
				event.start = appStartDate + "T" + appTimeStart;// its a date //
				// string
				event.end = appStartDate + "T" + appTimeEnd; // its a date //
				// string.
				if (color == "yellow") {
					event.backgroundColor = Theme.colors.yellow;
					event.color = Theme.colors.yellow;
				} else if (color == "red") {
					event.backgroundColor = Theme.colors.red;
					event.color = Theme.colors.red;
				} else if (color == "orange") {
					event.backgroundColor = Theme.colors.orange;
					event.color = Theme.colors.orange;
				} else if (color == "pink") {
					event.backgroundColor = Theme.colors.pink;
					event.color = Theme.colors.pink;
				} else if (color == "green") {
					event.backgroundColor = Theme.colors.green;
					event.color = Theme.colors.green;
				}

				event.allDay = false;
				event.editable = true;
				events1.push(event);
				events.push(event);
			}
		}
		$('#calendar').html("");
		$('#calendar').fullCalendar(
				{
					header : {
						left : '',
						center : 'title',
						right : '',
						allDaySlot : false,
					},
					allDaySlot : !0,
					allDayText : "all-day",
					firstHour : startTime,
					slotMinutes : duration,
					defaultEventMinutes : 120,
					axisFormat : "h(:mm)tt",
					timeFormat : {
						agenda : "h:mm{ - h:mm}"
					},
					dragOpacity : {
						agenda : .5
					},
					minTime : startTime,
					maxTime : endTime,
					slotEventOverlap : !0,
					selectable : true,
					selectHelper : true,
					select : function(start, end, allDay) {
						
						if ($("#patientDetails").html() == ""
								|| $("#patientDetails").html() == null) {
							if ($("#appointmentType").val() != "New" && $("#appointmentType").val() != "ReSchedule") {
								alert("Select Patient");
								return false;
							}
						}
						$("#appDateTime").val(start);
						$("#appEndTime").val(end);
						// var title = prompt('Event Title:');
						$(".popup").show();
						
						$(".title").focus();
						$(".submitFrom").click(function() {
							var title = $("#selDoctorName").text();
							if (title) {

								calendar.fullCalendar('renderEvent', {
									title : title,
									start : start,
									end : end,
									allDay : allDay
								}, true // make the event "stick"
								);
							}
							$(".popup").hide();
						});
						$(".exit").click(function() {
							// clear all info, unselect events and...
							$(".popup").hide();
						});

						// calendar.fullCalendar('unselect');
					},
					// editable : true//,
					droppable : true
				});
		$('#calendar').fullCalendar('gotoDate', arrAppDate[2],(arrAppDate[1] - 1), arrAppDate[0]);
		$('#calendar').fullCalendar('addEventSource', events);
	}
}

// @Code By- Kavita Bhangale, Date- 25-10-2016
function dateCompare(time1, time2) {
	var t1 = new Date();
	var parts = time1.split(":");
	t1.setHours(parts[0], parts[1], parts[2], 0);
	var t2 = new Date();
	parts = time2.split(":");
	t2.setHours(parts[0], parts[1], parts[2], 0);

	// returns 1 if greater, -1 if less and 0 if the same
	if (t1.getTime() > t2.getTime())
		return 1;
	if (t1.getTime() < t2.getTime())
		return -1;
	return 0;
}


function addMinutes(time, minsToAdd) {
	function D(J) {
		return (J < 10 ? '0' : '') + J;
	}
	;
	var piece = time.split(':');
	var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

	return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60) + ':00';
}

function getPatientDetails(appointmentId) {
	//alert("hi");
	var autocomplete;
	var patientName;
	var patientId;
	if (appointmentId == 0) {
		autocomplete = $("#autocomplete").val();
		patientName = autocomplete.split("_");
		patientId = patientName[1];
	} else {
		patientId = $("#hidpatId").val();
		//alert("pt id"+patientId);
		patientId = patientId.replace("\n", "");
		patientId = patientId.replace(" ", "");
		// var ajaxResponse=$("#followUpList").html();
		// var pobj = eval('(' + ajaxResponse + ')');
	}
	
	if (patientId != null && patientId != undefined && patientId != "") {
		//alert("higggggggg");
		var inputs = [];
		inputs.push('action=getPatientDetails');
		inputs.push('patientId=' + patientId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AppointmentServlet",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						//console.log(r)
						//alert(ajaxResponse);
						$("#patientDetails").html(ajaxResponse);
						var patientDetails = eval('(' + ajaxResponse + ')');

						var patientDetailTemp = '<label class="TextFont">Patient Id : {$T.pi}</label>'
								+ '<div class="divide-10"></div><label class="TextFont">Patient Name :{ $T.tit} {$T.fn} {$T.ln}</label>'
								+ '<div class="divide-10"></div><label class="TextFont">Patient Mobile Number : {$T.mb}</label>'
								+ '<div class="divide-10"></div><label class="TextFont" id"appSlotTiming"></label>';

						$("#patientDetailsDiv").setTemplate(patientDetailTemp);
						$("#patientDetailsDiv").processTemplate(patientDetails);
					}
				});
	}
}
function getPatientDetailsFollowUp(followUpId) {
	if ($("#idTourDateDetails").val() == ""
			|| $("#idTourDateDetails").val() == null) {
		alert("Please Select Date");
		return false;
	}
	// $("#divPatientSearch").hide();
	$("#divAllPatientList").html("");

	setTimeout(
			function() {
				var patientDetails = $("#patientDetails").html();
				patientDetails = eval('(' + patientDetails + ')');
				var patName = patientDetails.tit + patientDetails.fn + " "
						+ patientDetails.ln;
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>UHID: '
						+ patientDetails.pi
						+ '</th></tr><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ patientDetails.mb
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails)
			}, 200);

	var followUpList = $("followUpList").html();
	followUpList = eval('(' + followUpList + ')');
	var reqObj = "";
	$("#appointmentId").val(followUpId);
	var patientId = 0;
	var doctorId = 0;
	for ( var p = 0; p < pobj.liapp.length; p++) {

		if (pobj.liapp[p].apid == followUpId) {
			reqObj = pobj.liapp[p];
			patientId = reqObj.patid;
			doctorId = reqObj.docid;
			$("#idTourDateDetails").val(reqObj.appdt);
			break;
		}
	}

	if (patientId != null && patientId != undefined && patientId != "") {
		var inputs = [];
		inputs.push('action=getPatientDetails');
		inputs.push('patientId=' + patientId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AppointmentServlet",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						// alert(ajaxResponse);
						$("#patientDetails").html(ajaxResponse);
						var patientDetails = eval('(' + ajaxResponse + ')');

						var patientDetailTemp = '<label class="TextFont">Patient Id : {$T.pi}</label>'
								+ '<div class="divide-10"></div><label class="TextFont">Patient Name :{ $T.tit} {$T.fn} {$T.ln}</label>'
								+ '<div class="divide-10"></div><label class="TextFont">Patient Mobile Number : {$T.mb}</label>'
								+ '<div class="divide-10"></div><label class="TextFont" id"appSlotTiming"></label>';

						$("#patientDetailsDiv").setTemplate(patientDetailTemp);
						$("#patientDetailsDiv").processTemplate(patientDetails);
					}
				});
	}
	$("#appointmentType").val("FollowUpSchedule");

	//setDocNameForRegistration();
	$("#selHosDept").val(reqObj.bid);
	getDoctorNameList();
	setTimeout(function() {
		$("#selDoctorName").val(doctorId);
		getDoctorTimeList();
	}, 500);
	
	/*$("#hidpatId").val(myObj.patid);
	$("#appointmentId").val(myObj.apid);

	$("#idTourDateDetails").val(myObj.appdt);
	$("#selHosDept").val(myObj.bid);
	getDoctorNameList();
	setTimeout(function() {
		$("#selDoctorName").val(myObj.docid);
		setTimeout(function() {
			getDoctorTimeList();
		}, 200);
	}, 200);
	*/
}

function getTimeSlot(callFrom) {
	var appointmentDate;
	var doctorId;
	var arrDate;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		arrDate = ($("#idNewAppointment").val()).split("/");
		// specializationId = $("#selHosDeptNew").val();
		doctorId = $("#selDoctorNameNew").val();

	} else {
		appointmentDate = $("#idTourDateDetails").val();
		arrDate = ($("#idTourDateDetails").val()).split("/");
		// specializationId = $("#selHosDept").val();
		doctorId = $("#selDoctorName").val();
	}

	/*
	 * if (appointmentDate == null || appointmentDate == undefined ||
	 * appointmentDate == "") { alert("Please Select Date"); if (callFrom ==
	 * "New") { $("#selDoctorNameNew").val(0); } else {
	 * $("#selDoctorName").val(0); } return false; }
	 */

	var morningStartTime;
	var morningEndTime;
	var afterNoonStartTime;
	var afterNoonEndTime;
	var eveningStartTime;
	var eveningEndTime;
	var morningDuration;
	var afterNoonDuration;
	var eveningDuration;

	var morning;
	var afterNoon;
	var evening;

	var date = new Date(arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]);
	var day = date.getDay();

	if ((appointmentDate != "" || appointmentDate != null)
			|| (doctorId != "" || doctorId != null || doctorId != 0)) {
	
		if (doctorId == 0) {
			alert("Please Select Doctor Name First");
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){
			    dd='0'+dd
			} 
			if(mm<10){
			    mm='0'+mm
			} 
			var today = dd+'/'+mm+'/'+yyyy;
			if (callFrom == "New") {
				$("#idNewAppointment").val(today);
			} else {
				$("#idTourDateDetails").val(today);
			}
			return false;
		}
		
		var inputs = [];
		inputs.push('action=getTimeSlot');
		if (callFrom == "New") {
			inputs.push('doctorId=' + $("#selDoctorNameNew").val());
		} else {
			inputs.push('doctorId=' + $("#selDoctorName").val());
		}
		
		inputs.push('appointmentDate=' + appointmentDate);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var ajaxResponse = r;
				//alert(ajaxResponse);
				$("#DocNotAvailable").html(ajaxResponse);
				var pobj1 = eval('(' + ajaxResponse + ')');

				if (day == 1) {
					morningStartTime = pobj1.monMorningStart;
					morningEndTime = pobj1.monMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.monAfternoonStart;
					afterNoonEndTime = pobj1.monAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.monEverningStart;
					eveningEndTime = pobj1.monEverningEnd;
					eveningDuration = pobj1.duration;

				} else if (day == 2) {
					morningStartTime = pobj1.tueMorningStart;
					morningEndTime = pobj1.tueMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.tueAfternoonStart;
					afterNoonEndTime = pobj1.tueAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.tueEverningStart;
					eveningEndTime = pobj1.tueEverningEnd;
					eveningDuration = pobj1.duration;

				} else if (day == 3) {
					morningStartTime = pobj1.wedMorningStart;
					morningEndTime = pobj1.wedMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.wedAfternoonStart;
					afterNoonEndTime = pobj1.wedAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.wedEverningStart;
					eveningEndTime = pobj1.wedEverningEnd;
					eveningDuration = pobj1.duration;

				} else if (day == 4) {
					morningStartTime = pobj1.thiMorningStart;
					morningEndTime = pobj1.thiMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.thiAfternoonStart;
					afterNoonEndTime = pobj1.thiAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.thiEverningStart;
					eveningEndTime = pobj1.thiEverningEnd;
					eveningDuration = pobj1.duration;

				} else if (day == 5) {
					morningStartTime = pobj1.friMorningStart;
					morningEndTime = pobj1.friMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.friAfternoonStart;
					afterNoonEndTime = pobj1.friAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.friEverningStart;
					eveningEndTime = pobj1.friEverningEnd;
					eveningDuration = pobj1.duration;

				} else if (day == 6) {
					morningStartTime = pobj1.satMorningStart;
					morningEndTime = pobj1.satMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.satAfternoonStart;
					afterNoonEndTime = pobj1.satAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.satEverningStart;
					eveningEndTime = pobj1.satEverningEnd;
					eveningDuration = pobj1.duration;

				} else if (day == 0) {
					morningStartTime = pobj1.sunMorningStart;
					morningEndTime = pobj1.sunMorningEnd;
					morningDuration = pobj1.duration;

					afterNoonStartTime = pobj1.sunAfternoonStart;
					afterNoonEndTime = pobj1.sunAfternoonEnd;
					afterNoonDuration = pobj1.duration;

					eveningStartTime = pobj1.sunEverningStart;
					eveningEndTime = pobj1.sunEverningEnd;
					eveningDuration = pobj1.duration;
				}

				var timeSlots = [];
				var slotDuration = [];
				var valueTimeSlots = [];
				if (morningStartTime != null
						&& morningStartTime != morningEndTime) {
					morning = "Morning " + morningStartTime + "-"
							+ morningEndTime;
					timeSlots.push(morning);
					slotDuration.push(morningDuration);
					valueTimeSlots.push(morningStartTime + "-"
							+ morningEndTime + "-" + morningDuration);
				}
				if (afterNoonStartTime != null
						&& afterNoonStartTime != afterNoonEndTime) {
					afterNoon = "Afternoon " + afterNoonStartTime + "-"
							+ afterNoonEndTime;
					timeSlots.push(afterNoon);
					slotDuration.push(afterNoonDuration);
					valueTimeSlots.push(afterNoonStartTime + "-"
							+ afterNoonEndTime + "-" + afterNoonDuration);
				}

				if (eveningStartTime != null
						&& eveningStartTime != eveningEndTime) {
					evening = "Evening " + eveningStartTime + "-"
							+ eveningEndTime;
					timeSlots.push(evening);
					slotDuration.push(eveningDuration);
					valueTimeSlots.push(eveningStartTime + "-"
							+ eveningEndTime + "-" + eveningDuration);
				}
				
				if(pobj1.listForDoctorAvailable.length > 0){
					var Duration = pobj1.duration;
					var oneTimeStartTime;
					var oneTimeEndTime;
					for(var z = 0; z < pobj1.listForDoctorAvailable.length; z++){
						oneTimeStartTime = pobj1.listForDoctorAvailable[z].ftime;
						oneTimeEndTime = pobj1.listForDoctorAvailable[z].ttime;
						if (oneTimeStartTime != null
								&& oneTimeStartTime != oneTimeEndTime) {
							oneTime = "One-Time " + oneTimeStartTime + "-"
									+ oneTimeEndTime;
							timeSlots.push(oneTime);
							slotDuration.push(Duration);
							valueTimeSlots.push(oneTimeStartTime + "-"
									+ oneTimeEndTime + "-" + Duration);
						}
					}
				}
				
				if (callFrom == "New") {
					$('#selDoctorTimeNew').empty();
					$('#selDoctorTimeNew').append(
							$('<option>').text('-Select-').val("0"));
					for ( var i = 0; i < timeSlots.length; i++) {
						$('#selDoctorTimeNew').append(
								$('<option>').text(timeSlots[i]).val(
										valueTimeSlots[i]));
					}
				} else {
					$('#selDoctorTime').empty();
					$('#selDoctorTime').append(
							$('<option>').text('-Select-').val("0"));
					for ( var j = 0; j < timeSlots.length; j++) {
						$('#selDoctorTime').append(
								$('<option>').text(timeSlots[j]).val(
										valueTimeSlots[j]));
					}
				}
				if (undefined != pobj1.color) {
					$("#color").val(pobj1.color);
					$("#eventsAppointment").val(pobj1.color);
					$("#eventsAppointment").css("background-color",
							pobj1.color);
				}
			}
		});
		
		//if (callFrom == "Previous") {
			fetchFollowUp(callFrom);
			getAppointedListOfPatient(callFrom);
		//}
	}
}

function scheduleAppointmentOfPatient(callFrom) {

	var appointmentDate;
	var patientDetails;
	var appoTypeAR;
	var appoType;
	var details;
	var note;
	var branchId;
	var appointmentId;
	var appDateTime;
	var doctorId;
	var divTokens;
	var divAppoList;
	var trid;
	var patid;
	var txtAppoDate;
	var patName;
	var patLastName;
	var title;
	var patMob;
	var noOfToken;

	var queryType = $("#queryType").val();
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		appoTypeAR = "addAppo";
		appoType = $("#appointmentType").val();
		details = $("#details").val();

		// alert(details);

		note = "";

		branchId = $("#selHosDeptNew").val();
		appointmentId = 0;

		appDateTime = ($("#appDateTime").val()).split(" ");
		// alert(appDateTime);
		doctorId = $("#selDoctorNameNew").val();
		divTokens = "M" + doctorId + "M" + appDateTime[4] + "#";

		divAppoList = $("#divAppo").html();
		trid = 0;
		patid = 0;
		patName = $("#txtPName").val();
		patLastName = $("#txtLastName").val();
		title = $("#title").val();
		patMob = $("#patMob").val();
		noOfToken = divTokens.split("#");
	} else {
		if (queryType == "save") {
			appointmentDate = $("#idNewAppointment").val();
			if (appointmentDate == null || appointmentDate == "") {
				alert("Please Select Appointment Date");
				return false;
			} else if (($("#selHosDeptNew").val()) == "0"
					|| ($("#selHosDeptNew").val()) == undefined) {
				alert("Please Select Speciality");
				return false;
			} else if (($("#selDoctorNameNew").val()) == "0"
					|| ($("#selDoctorNameNew").val()) == undefined) {
				alert("Please Select Doctor");
				return false;
			} else if (($("#selDoctorTimeNew").val()) == "0"
					|| ($("#selDoctorTimeNew").val()) == undefined) {
				alert("Please Select Doctor's Timing");
				return false;
			}

			branchId = $("#selHosDeptNew").val();
			doctorId = $("#selDoctorNameNew").val();

		} else {
			appointmentDate = $("#idTourDateDetails").val();
			if (appointmentDate == null || appointmentDate == "") {
				alert("Please Select Appointment Date");
				return false;
			} else if (($("#selHosDept").val()) == "0"
					|| ($("#selHosDept").val()) == undefined) {
				alert("Please Select Speciality");
				return false;
			} else if (($("#selDoctorName").val()) == "0"
					|| ($("#selDoctorName").val()) == undefined) {
				alert("Please Select Doctor");
				return false;
			} else if (($("#selDoctorTime").val()) == "0"
					|| ($("#selDoctorTime").val()) == undefined) {
				alert("Please Select Doctor's Timing");
				return false;
			}

			branchId = $("#selHosDept").val();
			doctorId = $("#selDoctorName").val();

		}

		patientDetails = $("#patientDetails").html();
		if (patientDetails != "") {
			patientDetails = eval('(' + patientDetails + ')');
		}

		appoTypeAR = "addAppo";
		appoType = $("#appointmentType").val();
		details = $("#new_description").val();// details";

		// alert(details);

		note = $("#textareaNote").val();

		appointmentId = $("#appointmentId").val();

		appDateTime = ($("#appDateTime").val()).split(" ");

		divTokens = "M" + doctorId + "M" + appDateTime[4] + "#";

		divAppoList = $("#divAppo").html();
		trid = 0;
		var myObj = null;
		if (appointmentId == 0) {
			patid = patientDetails.pi;
			patName = patientDetails.fn;
			patLastName = patientDetails.ln;
			title = patientDetails.tit;
			patMob = patientDetails.mb;
		} else {

			if (appoType == "FollowUpSchedule") {
				patid = patientDetails.pi;
				patName = patientDetails.fn;
				patLastName = patientDetails.ln;
				title = patientDetails.tit;
				patMob = patientDetails.mb;
			} else {
				
				if(appoType == "ReSchedule"){
					var pobj = $("#reScheduleList").html();
					pobj = eval('(' + pobj + ')');
					for ( var i = 0; i < pobj.liapp.length; i++) {
						if (pobj.liapp[i].apid == appointmentId) {
							myObj = pobj.liapp[i];
						}
					}
				}else{
					var divAppo = $("#divAppo").html();
					divAppo = eval('(' + divAppo + ')');
					for ( var i = 0; i < divAppo.liapp.length; i++) {
						if (divAppo.liapp[i].apid == appointmentId) {
							myObj = divAppo.liapp[i];
							break;
						}
					}
				}
				
				$("#textareaNote").val(myObj.nt);
				$("#hidpatId").val(myObj.patid);
				patid = myObj.patid;//patid = 0;
				patName = myObj.patNm;
				patLastName = myObj.lastName;
				title = myObj.title;
				patMob = myObj.mobNo;
			}

		}

		noOfToken = divTokens.split("#");
	}

	var arrValidateDateTime = ($("#appDateTime").val()).split(" ");
	var validateStartTime = arrValidateDateTime[4];
	var validateDate = new Date();
	var validateCurrentTime = validateDate.getHours() + ":"
			+ validateDate.getMinutes() + ":" + validateDate.getSeconds();
	var validateCurrentDate = validateDate.getDay() + "/"
			+ (validateDate.getMonth() + 1) + "/" + validateDate.getFullYear();

	var startTime = validateCurrentTime;
	var endTime = validateStartTime;
	var regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
	if (parseInt(endTime.replace(regExp, "$1$2$3")) > parseInt(startTime
			.replace(regExp, "$1$2$3"))) {
		/*
		 * alert("End time is greater"); }
		 * 
		 * if(validateStartTime > validateCurrentTime){
		 */
		var temp1;
		var temp2;
	} else {
		var arrAppoDate = appointmentDate.split("/");
		var dateOne = new Date(arrAppoDate[2], (arrAppoDate[1] - 1),
				arrAppoDate[0]);
		var dateTwo = new Date(validateDate.getFullYear(), validateDate
				.getMonth(), validateDate.getDate());
		if (dateOne <= dateTwo) {
			alert("Please select valid time slot to schedule appointment");
			return false;
		}
	}
	if (title == "select" || title == undefined) {
		alert("Please Select Patient Title To Save Appointment.");
		return false;
	} else if (patName == "" || patName == undefined) {
		alert("Please Enter Patient First Name To Save Appointment.");
		return false;
	} else if (patLastName == "") {
		alert("Please Enter Patient Last Name To Save Appointment.");
		return false;
	} else if (divTokens == "") {
		alert("Please Select Timeslot To Save Appointment.");
		return false;
	} else if (appoType == "New") {
		if (patMob == "") {
			alert("Please Enter Patient Mobile No To Save Appointment.");
			return false;
		}
		else if(patMob.length!=10){
			alert("Length of Mobile Number Should 10 Digit !!!");
			return false;
		} 
		
		
		else if (noOfToken.length > 2) {
			alert("Please Select Only One Timeslot To Save Appointment.");
			return false;
		}
	} else if (noOfToken.length > 2) {
		alert("Please Select Only One Timeslot To Save Appointment.");
		return false;
	}
	if(appoType == "ReSchedule"){
		appoType = myObj.aptyId;
	}
	
	var regType = 'N';//$("#regType").val();

	var inputs = [];
	inputs.push('action=SaveAppointmentAdd');
	inputs.push('appoTypeAR=' + appoTypeAR);
	inputs.push('appoType=' + appoType);
	inputs.push('title=' + encodeURIComponent(title));
	inputs.push('patName=' + encodeURIComponent(patName));
	inputs.push('patLastName=' + encodeURIComponent(patLastName));
	inputs.push('patMob=' + encodeURIComponent(patMob));
	inputs.push('details=' + encodeURIComponent(details));
	inputs.push('divTokens=' + encodeURIComponent(divTokens));
	inputs.push('divAppoList=' + encodeURIComponent(divAppoList));
	inputs.push('trid=' + trid);
	inputs.push('patid=' + patid);
	inputs.push('txtAppoDate=' + appointmentDate);

	inputs.push('branchId=' + branchId);
	inputs.push('appointmentId=' + appointmentId);
	inputs.push('note=' + encodeURIComponent(note));
	inputs.push('regType=' + regType);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AppointmentServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if (ajaxResponse == "Appointment Saved successfully..."
					|| ajaxResponse == "Appointment Updated successfully...") {
				location.reload();
			}
		}
	});
}


function getAppointedListOfPatient(callFrom) {
	var consultantObj;
	var inputs = [];
	inputs.push('action=FetchConsultants');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			
			//console.log(r);
			consultantObj = eval('(' + r + ')');
		}
	});
	
	
	var appointmentDate;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		} else {
		appointmentDate = $("#idTourDateDetails").val();
	}
	
	var inputs = [];
	inputs.push('action=FetchQueue');
	inputs.push('txtAppoDate=' + encodeURIComponent(appointmentDate));
	
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					var html = '';
					var pobj = eval('(' + ajaxResponse + ')');
					$("#divAppo").html(ajaxResponse);

					var date = $("#idTourDateDetails").val();
					var existingPatientTemplate = '<tbody>{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="Existing"}{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX" id="existing{$T.liapp.apid}"><td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setExistingAppointmentType(),changeAppointmentOfPatient({$T.liapp.apid})" >change</button><td>{ $T.liapp.docNm}<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">{ $T.liapp.appdt}</br>{ $T.liapp.aptf}<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>{#/if}{#/if}{#/for} <tbody>';
					$("#existingPatientList").setTemplate(
							existingPatientTemplate);
					$("#existingPatientList").processTemplate(pobj);

					var newPatientTemplate1 = '<tbody>{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="New"}{#if $T.liapp.patid=="0"}{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX" id="new{$T.liapp.apid}"><td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="changeAppointmentOfNewPatient({$T.liapp.apid})" >change</button><td>{ $T.liapp.docNm}<br /><div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">{ $T.liapp.appdt}<br />{ $T.liapp.aptf}</br><div class="divide-10"></div><button class="btn btn-xs btn-success"	type="submit" data-toggle="modal" data-target="" onclick="registerPatient({$T.liapp.apid},\'newReg\')" >Register</button></td></td></tr>{#/if}{#/if}{#/if}{#/for} <tbody>';

					$("#newPatientList").setTemplate(newPatientTemplate1);
					$("#newPatientList").processTemplate(pobj);
					
					var NewCount = 0;
					var ExistingCount = 0;
					for ( var i = 0; i < pobj.liapp.length; i++) {
						if(pobj.liapp[i].aptyId == "New"){
							NewCount++;
						}
						if(pobj.liapp[i].aptyId == "Existing"){
							ExistingCount++;
						}
					}
					
					$('#NewPatientsToday').html(NewCount);
					$('#ExistingPatientsToday').html(ExistingCount);

					/* <Dashboard.jsp Todays Appointment> */
					var count = 1;
					for ( var int = 0; int < consultantObj.listDoctor.length; int++) {
						var Doc_name = consultantObj.listDoctor[int].dn;
						
						for ( var i = 0; i < pobj.liapp.length; i++) {
							
							var docNm1 = pobj.liapp[i].docNm;	
							var pname = pobj.liapp[i].title + pobj.liapp[i].patNm + pobj.liapp[i].lastName;
							var mobNo = pobj.liapp[i].mobNo;
							var aptf = pobj.liapp[i].aptf;
							
							if (docNm1 == Doc_name) {
								
								html = html + '<tr class="gradeX">';
								html = html + '<td class="col-md-1-1" >'+(count)+'</td>';
								html = html + '<td class="col-md-3-1" >'+(docNm1)+'</td>';
								html = html + '<td class="col-md-3-1 " >'+(pname)+'</td>';
								html = html + '<td class="col-md-3-1" >'+(mobNo)+'</td>';
								html = html + '<td class="col-md-2-1" >'+(aptf)+'</td>';
								html = html + '</tr>';
								count++;
							}
						}
					}
					$("#newPatientListDashboard").html(html);
					
					var newPatientTemplate1Dashboard = '{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="New" || $T.liapp.aptyId=="Existing" || $T.liapp.aptyId=="FollowUp"}'
							+ '{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX">'
							+ '<td class="col-md-1-1">{countDash++}</td>'
							+ '<td class="col-md-3-1">{ $T.liapp.docNm}</td>'
							+ '<td class="col-md-3-1">{$T.liapp.title} {$T.liapp.patNm} {$T.liapp.lastName}</td>'
							+ '<td class="col-md-3-1">{ $T.liapp.mobNo}</td>'
							+ '<td class="col-md-2-1">{$T.liapp.aptf}</td></tr>{#/if}{#/if}{#/for}';

					$("#newPatientListDashboard").setTemplate(
							newPatientTemplate1Dashboard);
					$("#newPatientListDashboard").processTemplate(pobj);

					if (count > 0) {
						$("#OPDQueueCount").html((--count));
					}
					/* </Dashboard.jsp Todays Appointment> */
				}
			});
}

function saveVisiteMarkPat(appoid) {
	var appoObj = $("#divAppo").html();
	pobj = eval('(' + appoObj + ')');
	var reqObj = "";
	for ( var p = 0; p < pobj.liapp.length; p++) {

		if (pobj.liapp[p].apid == appoid) {
			reqObj = pobj.liapp[p];
			break;
		}
	}
	var trid = reqObj.tid;
	var patid = reqObj.patid;
	var txtAppoDate = reqObj.appdt;
	var patName = reqObj.patNm + " " + reqObj.lastName;
	var docid = reqObj.docid;

	var inputs = [];
	inputs.push('action=SaveVisiteMarkPat');
	inputs.push('patName=' + encodeURIComponent(patName));
	inputs.push('docid=' + docid);
	inputs.push('trid=' + trid);
	inputs.push('patid=' + patid);
	inputs.push('txtAppoDate=' + txtAppoDate);
	inputs.push('appoid=' + appoid);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AppointmentServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if (ajaxResponse == "Treatment Started Successfully...") {
				location.reload(this);
			}
		}
	});
}

function autoSuggetionPationNames(inputID, onload, callFrom) {

	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "OPD_Appoinment") {
		auto = 'PatientName';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
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
					$("#pathiddenid").val(idValue);
					setTimeout(function() {// alert(template);
						// $("#div" + inputID + " .typeahead").html("");
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

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#byName").val((item.text).trim());
		$("#hidpatId").val(item.value);
		getPatientDetails(item.value);
	}

}

function cancelAppointment(appointmentId) {
	var r = confirm("Do you want to remove appointment?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=SaveAppointmentRemove');
		inputs.push('appid=' + appointmentId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert("Appointment Removed");
				$("#existing" + appointmentId).html("");
				getAppointedListOfPatient();
				setTimeout(function() {
					fetchFollowUp();
				}, 200);
				showDoctorAppointments();
			}
		});
	}
}

function changeAppointmentOfPatient(appointmentId) {

	if ($("#idTourDateDetails").val() == ""
			|| $("#idTourDateDetails").val() == null) {
		alert("Please Select Date");
		return false;
	}
	$("#divAllPatientList").html("");
	var appointmentType = $("#appointmentType").val();
	
	var myObj = null;
	
	if(appointmentType == "ReSchedule"){
		var pobj = $("#reScheduleList").html();
		pobj = eval('(' + pobj + ')');
		for ( var i = 0; i < pobj.liapp.length; i++) {
			if (pobj.liapp[i].apid == appointmentId) {
				myObj = pobj.liapp[i];
			}
		}
	}else{
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].apid == appointmentId) {
				myObj = divAppo.liapp[i];
			}
		}
	}
	
	if (myObj.nt != "") {
		$("#textareaNote").val(myObj.nt);
	} else {
		$("#textareaNote").val(myObj.det);
	}
	//alert(myObj);
	$("#hidpatId").val(myObj.patid);
	getPatientDetails(myObj.apid);
	$("#appointmentId").val(myObj.apid);
	$("#idTourDateDetails").val(myObj.appdt);
	$("#selHosDept").val(myObj.bid);
	getDoctorNameList();
	setTimeout(function() {
		$("#selDoctorName").val(myObj.docid);
		setTimeout(function() {
			getDoctorTimeList();
		}, 200);
	}, 200);

	setTimeout(
			function() {
				var patientDetails = $("#patientDetails").html();
				patientDetails = eval('(' + patientDetails + ')');
				var patName = patientDetails.tit + patientDetails.fn + " "
						+ patientDetails.ln;
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>UHID: '
						+ patientDetails.pi
						+ '</th></tr><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ patientDetails.mb
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails)
			}, 200);
}

function setNewExistingDiv() {
	var value = $('input[name=radios]:checked').val();

	setAppointmentType(value);
	if (value == "New") {
		$("#newPatientDiv").show();
		$("#existingPatientDiv").hide();
	} else {
		$("#existingPatientDiv").show();
		$("#newPatientDiv").hide();
	}
	// alert(value);
}
function setAppointmentType(type) {
	$("#appointmentType").val(type);
}
function setFollowUpAppointmentType() {
	$("#appointmentType").val("FollowUp");
}
function setExistingAppointmentType() {
	$("#appointmentType").val("Existing");
}
function setReScheduleAppointmentType() {
	$("#appointmentType").val("ReSchedule");
}

function setQueryType(type) {
	$("#queryType").val(type);
	if (type = "save") {
		$("[name=radios]").val([ "New" ]);
		$("#newPatientDiv").show();
		// $("#idTourDateDetails").hide();
		$("#existingPatientDiv").hide();
		$("#appointmentType").val("New");
		$("#appointmentId").val(0);
	}
}

function changeTabToNew() {
	$("#idNewTabAppointment").addClass("active");
	// $("#idTourDateDetails").show();
	$("#idExistingTabAppointment").removeClass("active");
	$("#idFollowUpTabAppointment").removeClass("active");
	$("#appointmentType").val("New");
}

function setPatientIntoList(type) {
	//alert("hi");
	var indexOf = "";
	var patientName = "";
	var doctorName = "" ;
	var patientListSearch = $("#patientListSearch").val();
	patientListSearch = patientListSearch.toLocaleLowerCase();

	if ($("#appointmentType").val() == "New") {
		//alert("ddd");
		var patientListArray = [];
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].aptyId == "New") {
				if(type == "patient"){
					 patientName = divAppo.liapp[i].patNm + " " + divAppo.liapp[i].lastName ;
					patientName = patientName.toLocaleLowerCase();
						 indexOf = (patientName).indexOf(patientListSearch);
				}else{
					doctorName = divAppo.liapp[i].docNm ;
					doctorName = doctorName.toLocaleLowerCase();
					 indexOf = (doctorName).indexOf(patientListSearch);
				}
				if (indexOf > -1) {
					patientListArray.push(divAppo.liapp[i]);
				}
			}
		}
		
		var newPatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArray.length; j++) {
			 
			newPatientTemplate1 = newPatientTemplate1
					+ '<tr class="gradeX" id="new' + patientListArray[j].apid
					+ '">' + '<td>' + patientListArray[j].title + ' '
					+ patientListArray[j].patNm + ' '
					+ patientListArray[j].lastName + '<br />'
					+ '<div class="divide-10"></div>'
					+ '<button class="btn btn-xs btn-primary" type="submit"'
					+ '	data-toggle="modal" data-target=""'
					+ '	onclick="changeAppointmentOfNewPatient('
					+ patientListArray[j].apid + ')">change</button></td>'
					+ '<td>' + patientListArray[j].docNm + '<br />'
					+ '<div class="divide-10"></div>'
					+ '	<button class="btn btn-xs btn-danger" type="submit"'
					+ '		data-toggle="modal" data-target=""'
					+ '		onclick="cancelAppointment('
					+ patientListArray[j].apid + ')">Cancel</button></td>'
					+ '<td class="center">' + patientListArray[j].appdt
					+ '</br>' + patientListArray[j].aptf + '</br>'
					+ '<div class="divide-10"></div>'
					+ '		<button class="btn btn-xs btn-success" type="submit"'
					+ '			data-toggle="modal" data-target=""'
					+ '			onclick="registerPatient(' + patientListArray[j].apid +',\'newReg\')">Register</button></td>'
					+ '</tr>';
			/*
			 * + '<tr class="gradeX" id="new"><td>' +
			 * patientListArray[j].title + ' ' + patientListArray[j].patNm + ' ' +
			 * patientListArray[j].lastName + '<br /><div class="divide-10"></div><button
			 * class="btn btn-xs btn-primary" type="submit" data-toggle="modal"
			 * data-target="" onclick="registerNewPat(' +
			 * patientListArray[j].apid + ')" >Register</button><td>' +
			 * patientListArray[j].docNm + '<br /></td><td class="center">' +
			 * patientListArray[j].appdt + '</br>' + patientListArray[j].aptf + '</br><br /></td></td></tr>';
			 */
		}
		newPatientTemplate1 = newPatientTemplate1 + '</tbody>';

		$("#newPatientList").setTemplate(newPatientTemplate1);
		var temp;
		$("#newPatientList").processTemplate(temp);

	} else if ($("#appointmentType").val() == "Existing") {
		var patientListArray = [];
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].aptyId == "Existing") {
				if(type == "patient"){
				 patientName = divAppo.liapp[i].patNm + " " + divAppo.liapp[i].lastName ;
				patientName = patientName.toLocaleLowerCase();
					 indexOf = (patientName).indexOf(patientListSearch);
				}else{
					doctorName = divAppo.liapp[i].docNm ;
					doctorName = doctorName.toLocaleLowerCase();
					 indexOf = (doctorName).indexOf(patientListSearch);
				}
				if (indexOf > -1) {
					patientListArray.push(divAppo.liapp[i]);
				}
			}
		}

		var existingPatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArray.length; j++) {
			existingPatientTemplate1 = existingPatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArray[j].apid
					+ '"><td>'
					+ patientListArray[j].title
					+ ' '
					+ patientListArray[j].patNm
					+ ' '
					+ patientListArray[j].lastName
					+ '<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setExistingAppointmentType(),changeAppointmentOfPatient('
					+ patientListArray[j].apid
					+ ')" >change</button><td>'
					+ patientListArray[j].docNm
					+ '<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">'
					+ patientListArray[j].appdt
					+ '</br>'
					+ patientListArray[j].aptf
					+ '<br/><div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient('
					+ patientListArray[j].apid + ',\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>';
		}
		existingPatientTemplate1 = existingPatientTemplate1 + '</tbody>';

		$("#existingPatientList").setTemplate(existingPatientTemplate1);
		var temp;
		$("#existingPatientList").processTemplate(temp);

	} else if ($("#appointmentType").val() == "FollowUp") {
		//alert("FollowUp");
		var patientListArray = [];
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].aptyId == "FollowUp") {
				if(type == "patient"){
					 patientName = divAppo.liapp[i].patNm + " " + divAppo.liapp[i].lastName ;
					patientName = patientName.toLocaleLowerCase();
						 indexOf = (patientName).indexOf(patientListSearch);
				}else{
					doctorName = divAppo.liapp[i].docNm ;
					doctorName = doctorName.toLocaleLowerCase();
					 indexOf = (doctorName).indexOf(patientListSearch);
				}
				if (indexOf > -1) {
					patientListArray.push(divAppo.liapp[i]);
				}
			}
		}
		var followUpPatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArray.length; j++) {
			followUpPatientTemplate1 = followUpPatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArray[j].apid
					+ '"><td>'
					+ patientListArray[j].title
					+ ' '
					+ patientListArray[j].patNm
					+ ' '
					+ patientListArray[j].lastName
					+ '<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setExistingAppointmentType(),changeAppointmentOfPatient('
					+ patientListArray[j].apid
					+ ')" >change</button><td>'
					+ patientListArray[j].docNm
					+ '<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">'
					+ patientListArray[j].appdt
					+ '</br>'
					+ patientListArray[j].aptf
					+ '<br/><div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient('
					+ patientListArray[j].apid
					+ ',\"mark\")" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>';
		}

		var followUpList = $("#followUpList").html();
		var pobj = eval('(' + followUpList + ')');
		var patientListArrayFollowUp = [];
		for ( var i = 0; i < pobj.liapp.length; i++) {
			var indexOf = (pobj.liapp[i].patNm).indexOf(patientListSearch);
			if (indexOf > -1) {
				patientListArrayFollowUp.push(pobj.liapp[i]);
			}
		}

		for ( var j = 0; j < patientListArrayFollowUp.length; j++) {
			followUpPatientTemplate1 = followUpPatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArrayFollowUp[j].apid
					+ '"><td>'
					+ patientListArrayFollowUp[j].patNm
					+ '<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="getPatientDetailsFollowUp('
					+ patientListArrayFollowUp[j].apid
					+ ')" >Schedule </br> Appointment</button><td>'
					+ patientListArrayFollowUp[j].docNm
					+ '<br />'
					// added by kishor for add cancle button when search
					+'<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">'
					+ patientListArrayFollowUp[j].appdt
					+ '</br>'
					
					
					+ '</td><td class="center">'
					+ patientListArrayFollowUp[j].appdt
					+ '</br><br /></td></td></tr>';
		}

		followUpPatientTemplate1 = followUpPatientTemplate1 + '</tbody>';

		$("#followUpPatientList").setTemplate(followUpPatientTemplate1);
		var temp;
		$("#followUpPatientList").processTemplate(temp);
	} else if ($("#appointmentType").val() == "ReSchedule") {
		var pobj = $("#reScheduleList").html();
		pobj = eval('(' + pobj + ')');
		var patientListArrayReSchedule = [];
		for ( var i = 0; i < pobj.liapp.length; i++) {
			if(type == "patient"){
				patientName = pobj.liapp[i].patNm + " " + pobj.liapp[i].lastName ;
				patientName = patientName.toLocaleLowerCase();
					 indexOf = (patientName).indexOf(patientListSearch);
			}else{
				doctorName = pobj.liapp[i].docNm ;
				doctorName = doctorName.toLocaleLowerCase();
				 indexOf = (doctorName).indexOf(patientListSearch);
			}
			if (indexOf > -1) {
				patientListArrayReSchedule.push(pobj.liapp[i]);
			}
		}
		
		var reSchedulePatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArrayReSchedule.length; j++) {
			reSchedulePatientTemplate1 = reSchedulePatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArrayReSchedule[j].apid
					+ '"><td>'
					+ patientListArrayReSchedule[j].title
					+ ' '
					+ patientListArrayReSchedule[j].patNm
					+ ' '
					+ patientListArrayReSchedule[j].lastName
					+ '<br /><div class="divide-10"></div>';
			
					if(patientListArrayReSchedule[j].aptyId == "New"){
						if(patientListArrayReSchedule[j].patid == "0"){
							reSchedulePatientTemplate1 = reSchedulePatientTemplate1
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfNewPatient('
							+ patientListArrayReSchedule[j].apid
							+ ')" >change</button>';
						}else{
							reSchedulePatientTemplate1 = reSchedulePatientTemplate1
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatient('
							+ patientListArrayReSchedule[j].apid
							+ ')" >change</button>';
						}
					}else{
						reSchedulePatientTemplate1 = reSchedulePatientTemplate1
						+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatient('
						+ patientListArrayReSchedule[j].apid
						+ ')" >change</button>';
					}
					
					reSchedulePatientTemplate1 = reSchedulePatientTemplate1
						+ '</td><td>'
						+ patientListArrayReSchedule[j].docNm
						+ '<br/><div class="divide-10"></div>'
						+ '<button class="btn btn-xs btn-danger" type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment('
						+ patientListArrayReSchedule[j].apid
						+ ')">cancel</button></td>'
						+ '<td class="center">'
						+ patientListArrayReSchedule[j].appdt
						+ '</br>'
						+ patientListArrayReSchedule[j].aptf
						+ '<br/><div class="divide-10"></div>';
						
						if(patientListArrayReSchedule[j].aptyId == "New"){
														
							if(patientListArrayReSchedule[j].patid == "0"){
								
								reSchedulePatientTemplate1 = reSchedulePatientTemplate1
								+ '<button class="btn btn-xs btn-success"	type="submit" data-toggle="modal" '
								+ ' onclick="registerPatient('+ patientListArrayReSchedule[j].apid + ',\'newReg\')" >Register</button>';
							}else{
								reSchedulePatientTemplate1 = reSchedulePatientTemplate1
								+ '<button class="btn btn-xs btn-success" onclick="registerPatient('
								+ patientListArrayReSchedule[j].apid
								+ ',\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>';
							}
						}else{
							reSchedulePatientTemplate1 = reSchedulePatientTemplate1
							+ '<button class="btn btn-xs btn-success" onclick="registerPatient('
							+ patientListArrayReSchedule[j].apid
							+ ',\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>';
						}
					reSchedulePatientTemplate1 = reSchedulePatientTemplate1
						+ '</td></tr>';
		}
		
		reSchedulePatientTemplate1 = reSchedulePatientTemplate1 + '</tbody>';

		$("#reSchedulePatientList").setTemplate(reSchedulePatientTemplate1);
		var temp;
		$("#reSchedulePatientList").processTemplate(temp);
	}
}

function updateColor() {
	var color = $("#eventsAppointment").val();
	$("#color").val(color);

	showDoctorAppointments('calender');
}

function setAutoAppointmentOfPatient() {
	var dateTime = Date();
	var time = dateTime.split(" ");
	var doctorId = $("#selDoctorNameNew").val();
	var idNewAppointment = $("#idNewAppointment").val();
	dateAppointment = idNewAppointment.split("/");
	/*
	 * var finalDate = dateAppointment[2] + "-" + dateAppointment[0] + "-" +
	 * dateAppointment[1];
	 */
	var finalDate = $("#idNewAppointment").val();
	var divAppo = $("#divAppo").html();
	divAppo = eval('(' + divAppo + ')');

	var timeSlots = $("#selDoctorTimeNew").val();
	var doctorTiming = timeSlots.split("-");
	var doctorStartTime = doctorTiming[0];
	var doctorEndTime = doctorTiming[1];
	var duration = doctorTiming[2];
	var timingArray = [];
	for ( var i = 0; i < 1000; i++) {
		var newTime = addMinutes(doctorStartTime, (duration * i));
		if ((newTime >= doctorStartTime) && (newTime < doctorEndTime)) {
			timingArray.push(newTime);
			// alert(newTime);
		}
		if (newTime > doctorEndTime) {
			break;
		}
	}
	var finalTimingForAppointment = null;

	for ( var j = 0; j < timingArray.length; j++) {
		finalTimingForAppointment = timingArray[j];
		for ( var k = 0; k < divAppo.liapp.length; k++) {
			if ((doctorId == divAppo.liapp[k].docid)
					&& (finalDate == divAppo.liapp[k].appdt)
					&& (timingArray[j] == divAppo.liapp[k].aptf)) {
				timingArray.remove(timingArray[j]);
			}
		}
	}

	/*
	 * for ( var l = 0; l < timingArray.length; l++) {
	 * if(time[4]>timingArray[l]){ timingArray.remove(timingArray[l]); } }
	 */
	if (timingArray.length != 0) {
		finalTimingForAppointment = timingArray[0];
	}

	/*
	 * for ( var j = 0; j < timingArray.length; j++) { finalTimingForAppointment =
	 * timingArray[j]; for ( var k = 0; k < divAppo.liapp.length; k++) { if
	 * ((doctorId == divAppo.liapp[k].docid) && (finalDate ==
	 * divAppo.liapp[k].appdt) && (timingArray[j] == divAppo.liapp[k].aptf)) {
	 * break; } } }
	 */

	// return false;
	if (finalTimingForAppointment != null) {

		var value = $('input[name=radios]:checked').val();

		if (value == "New") {
			var appointmentDate = ($("#idNewAppointment").val()).split("/");

			var appoTypeAR = "addAppo";
			var appoType = $("#appointmentType").val();// 'New';
			var details = $("#details").val();
			note = "";

			var branchId = $("#selHosDeptNew").val();
			var appointmentId = 0;

			// appDateTime = ($("#appDateTime").val()).split(" ");
			var doctorId = $("#selDoctorNameNew").val();
			var divTokens = "M" + doctorId + "M" + finalTimingForAppointment
					+ "#";

			var divAppoList = $("#divAppo").html();
			var trid = 0;
			var patid = 0;
			var txtAppoDate = finalDate;
			var patName = $("#txtPName").val();
			var patLastName = $("#txtLastName").val();
			var title = $("#title").val();
			var patMob = $("#patMob").val();
			var noOfToken = divTokens.split("#");
		} else {

			var branchId = $("#selHosDeptNew").val();

			var patientDetails = $("#patientDetails").html();
			patientDetails = eval('(' + patientDetails + ')');

			var appoTypeAR = "addAppo";
			var appoType = $("#appointmentType").val();
			var details = "details";
			var note = $("#textareaNote").val();

			var appointmentId = $("#appointmentId").val();
			var trid = 0;
			// appDateTime = ($("#appDateTime").val()).split(" ");

			var divTokens = "M" + doctorId + "M" + finalTimingForAppointment
					+ "#";

			var divAppoList = $("#divAppo").html();

			var patid = patientDetails.pi;
			var txtAppoDate = finalDate;
			var patName = patientDetails.fn;
			var patLastName = patientDetails.ln;
			var title = patientDetails.tit;
			var patMob = patientDetails.mob;
			var noOfToken = divTokens.split("#");
		}
		if (title == "" || title == undefined) {
			alert("Please Select Patient Title To Save Appointment.");
			return false;
		}else if (patName == "" || patName == undefined) {
			alert("Please Enter Patient First Name To Save Appointment.");
			return false;
		} else if (patLastName == "") {
			alert("Please Enter Patient Last Name To Save Appointment.");
			return false;
		} else if (divTokens == "") {
			alert("Please Select Timeslot To Save Appointment.");
			return false;
		} else if (appoType == "New") {
			if (patMob == "") {
				alert("Please Enter Patient Mobile No To Save Appointment.");
				return false;
			} else if(patMob.length!=10){
				alert("Length of Mobile Number Should 10 Digit !!!");
				return false;
			} 
			
			else if (noOfToken.length > 2) {
				alert("Please Select Only One Timeslot To Save Appointment.");
				return false;
			}
		} else if (noOfToken.length > 2) {
			alert("Please Select Only One Timeslot To Save Appointment.");
			return false;
		}

		var inputs = [];
		inputs.push('action=SaveAppointmentAdd');
		inputs.push('appoTypeAR=' + appoTypeAR);
		inputs.push('appoType=' + appoType);
		inputs.push('title=' + encodeURIComponent(title));
		inputs.push('patName=' + encodeURIComponent(patName));
		inputs.push('patLastName=' + encodeURIComponent(patLastName));
		inputs.push('patMob=' + encodeURIComponent(patMob));
		inputs.push('details=' + encodeURIComponent(details));
		inputs.push('divTokens=' + encodeURIComponent(divTokens));
		inputs.push('divAppoList=' + encodeURIComponent(divAppoList));
		inputs.push('trid=' + trid);
		inputs.push('patid=' + patid);
		inputs.push('txtAppoDate=' + txtAppoDate);

		inputs.push('branchId=' + branchId);
		inputs.push('appointmentId=' + appointmentId);
		inputs.push('note=' + encodeURIComponent(note));
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AppointmentServlet",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						alert(ajaxResponse);
						if (ajaxResponse == "Appointment Saved successfully..."
								|| ajaxResponse == "Appointment Updated successfully...") {
							location.reload();
						}
					}
				});

	} else {
		alert("Please Select Other Time Slot");
	}

}

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};

function setCalenderOnLoad() {
	var todays_date = $("#todays_date").val();
	var arrDate = todays_date.split("-");

	$('#calendar').html("");
	$('#calendar').fullCalendar(
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
					if (($("#selHosDept").val()) == "0"
							|| ($("#selHosDept").val()) == undefined) {
						alert("Please Select Speciality");
						return false;
					} else if (($("#selDoctorName").val()) == "0"
							|| ($("#selDoctorName").val()) == undefined) {
						alert("Please Select Doctor");
						return false;
					} else if (($("#selDoctorTime").val()) == "0"
							|| ($("#selDoctorTime").val()) == undefined) {
						alert("Please Select Doctor's Timing");
						return false;
					} else if ($("#patientDetails").html() == ""
							|| $("#patientDetails").html() == null) {
						alert("Select Patient");
						return false;
					}

				},
				droppable : true
			});
	$('#calendar').fullCalendar('gotoDate', arrDate[0], (arrDate[1] - 1),
			arrDate[2]);

}

function clearValuesNewPatient() {
	$("#txtPName").val("");
	$("#txtLastName").val("");
	$("#patMob").val("");
	$("#details").val("");

	$("#selHosDeptNew").val(0);
	$("#selDoctorNameNew").val(0);
	$("#selDoctorTimeNew").val(0);
}

function changeAppointmentOfNewPatient(appointmentId) {

	if ($("#idTourDateDetails").val() == ""
			|| $("#idTourDateDetails").val() == null) {
		alert("Please Select Date");
		return false;
	}

	$("#divAllPatientList").html("");
	var appointmentType = $("#appointmentType").val();
	
	if(appointmentType == "ReSchedule"){
		var pobj = $("#reScheduleList").html();
		pobj = eval('(' + pobj + ')');
		for ( var i = 0; i < pobj.liapp.length; i++) {
			if (pobj.liapp[i].apid == appointmentId) {
				myObj = pobj.liapp[i];
			}
		}
	}else{
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		var myObj = null;
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].apid == appointmentId) {
				myObj = divAppo.liapp[i];
				break;
			}
		}
	}
	
	getPatientDetails(myObj.apid);
	if (myObj.nt != "") {
		$("#textareaNote").val(myObj.nt);
	} else {
		$("#textareaNote").val(myObj.det);
	}
	$("#hidpatId").val(myObj.patid);
	$("#appointmentId").val(myObj.apid);

	$("#idTourDateDetails").val(myObj.appdt);
	$("#selHosDept").val(myObj.bid);
	getDoctorNameList();
	setTimeout(function() {
		$("#selDoctorName").val(myObj.docid);
		setTimeout(function() {
			getDoctorTimeList();
		}, 200);
	}, 200);

	setTimeout(
			function() {
				var patName = myObj.title + myObj.patNm + " " + myObj.lastName;
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ myObj.mobNo
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails)

				var patientDetailTemp = '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Name :'
						+ patName
						+ '</label>'
						+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Mobile Number : '
						+ myObj.mobNo
						+ '</label>'
						+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont" id"appSlotTiming"></label>';

				$("#patientDetailsDiv").html(patientDetailTemp);
			}, 200);
}

function resetOPDScheduler() {
	location.reload(this);
}

function clearSelectList() {
	// getDoctorNameList();
	setTimeout(function() {
		// getDoctorTimeList();
	}, 5000);
	// $("#selHosDept").val(0);
	// $("#selDoctorName").html("");
	// $("#selDoctorTime").html("");
}

function clearValuesExitPatient() {
	$("#new_description").val("");
}

//@Code By : Amol Saware  @Date : 03 Feb 2017 @Code For : Fetch data for patient name to be select from OPD appointment
function setPatientNameForOPDAppointment(inputId){
	var resultData = [];
	var auto = "patientNameForOperation";
	var type = "total"
	var searchBy = inputId;
	var findingName = $("#"+inputId).val();
	var inputs = [];
	inputs.push('action=patientNameForOperation');
	inputs.push('auto=' + auto);
	inputs.push('type=' + type);
	inputs.push('findingName=' + findingName);
	inputs.push('searchBy=' + searchBy);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					autoCompTableForOPDAppointment(r,inputId);
				}
			});
}

//@Code By : Amol Saware  @Date : 03 Feb 2017 @Code For : Set patient name to Auto Suggetion list from name to be select from OPD appointment
function autoCompTableForOPDAppointment(response,id){
	var qty		= id.slice(0,-1); //for dyamic col getting id
	var myArray = $.parseJSON(response);// parsing response in JSON format 
	$.widget('custom.mcautocomplete', $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	    },
	    _renderMenu: function (ul, items) {
	        var self = this,
	            thead;
	        if (this.options.showHeader) {
	            table = $('<div class="ui-widget-header" style="width:100%"></div>');
	            $.each(this.options.columns, function (index, item) {
	                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
	            });
	            table.append('<div style="clear: both;"></div>');
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	        var t = '',
	            result = '';
	        $.each(this.options.columns, function (index, column) {
	            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>';
	        });
	        result = $('<li></li>')
	            .data('ui-autocomplete-item', item)
	            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
	            .appendTo(ul);
	        return result;
	    }
	});
	
	var fldName = "";
	var valField = "";
	var resVal = "";
	
	if(id=="byId"){
		
		fldName = 'Patient Id';
		valField = 'pi';		
		
	}else if(id=="byMobile"){
		
		fldName = 'Patient Id';
		valField = 'mb';
		
	}else{
		
		fldName = 'Patient Name';
		valField = 'fn';		
	}

	
	if(id=="byName"){
		
		
		// Sets up the multicolumn autocomplete widget.
		$("#"+ id).mcautocomplete({
		    // These next two options are what this plugin adds to the autocomplete widget.
		   
			showHeader: true,
		    columns: [{
		        name: 'Patient Name',
		        width: '250px',
		        valueField: 'fn'
		    }],

		    // Event handler for when a list item is selected.
		    select: function (event, ui) {
		    	
		    	if(id=="byId"){
		    				
		    		resVal = ui.item.pi;
		    		
		    	}else if(id=="byMobile"){
		    		
		    		resVal = ui.item.mb;
		    		
		    	}else{
		    		
		    		resVal = ui.item.fn;
		    	}
		    	
		       var mrNo = (ui.item.mrNo = "" ? '-' : ui.item.mrNo);
		       if( resVal !='No Record Found'){
		    	   $('#results').text(resVal ? 'Selected: ' + resVal : 'Nothing selected, input was ' + this.value);
			        $('#hidpatId').val(ui.item.pi);
			        $('#'+id).val(resVal);
			        $('#byId').val(ui.item.pi);
			        $('#byName').val(ui.item.fn);
			        $('#byMobile').val(ui.item.mb);
					getPatientDetails(ui.item.pi);
		       }
		        
		       return false;
		    },

		    // The rest of the options are for configuring the ajax webservice call.
		    minLength: 1,
		    source: function (request, response) {
		    	var data = myArray;
		    	var result;
	         if (!data || data.length === 0 || !data.pl || data.pl.length === 0  ) {
	         	/*result = [{
	                 label: 'No match found.'
	             }];*/
	         	result = [{
	         		valField	: ' No Record Found'
	              }];
	         } else {
	             result = data.pl;//Response List for All Services
	         }
	         response(result);
	       }
		});
		
	}else{
		
		// Sets up the multicolumn autocomplete widget.
		$("#"+ id).mcautocomplete({
		    // These next two options are what this plugin adds to the autocomplete widget.
		   
			showHeader: true,
		    columns: [{
		        name: fldName,
		        width: '250px',
		        valueField: valField
		    },
		    {
		        name: 'Patient Name',
		        width: '250px',
		        valueField: 'fn'
		    }],

		    // Event handler for when a list item is selected.
		    select: function (event, ui) {
		    	
		    	if(id=="byId"){
		    				
		    		resVal = ui.item.pi;
		    		
		    	}else if(id=="byMobile"){
		    		
		    		resVal = ui.item.mb;
		    		
		    	}else{
		    		
		    		resVal = ui.item.fn;
		    	}
		    	
		       var mrNo = (ui.item.mrNo = "" ? '-' : ui.item.mrNo);
		       if( resVal !='No Record Found'){
		    	   $('#results').text(resVal ? 'Selected: ' + resVal : 'Nothing selected, input was ' + this.value);
			        $('#hidpatId').val(ui.item.pi);
			        $('#'+id).val(resVal);
			        $('#byId').val(ui.item.pi);
			        $('#byName').val(ui.item.fn);
			        $('#byMobile').val(ui.item.mb);
					getPatientDetails(ui.item.pi);
		       }
		        
		       return false;
		    },

		    // The rest of the options are for configuring the ajax webservice call.
		    minLength: 1,
		    source: function (request, response) {
		    	var data = myArray;
		    	var result;
	         if (!data || data.length === 0 || !data.pl || data.pl.length === 0  ) {
	         	/*result = [{
	                 label: 'No match found.'
	             }];*/
	         	result = [{
	         		valField	: ' No Record Found'
	              }];
	         } else {
	             result = data.pl;//Response List for All Services
	         }
	         response(result);
	       }
		});
	}
	
}

function getCountForFollowUpAndReschedule(){

	var date = $("#idTourDateDetails").val();
	
	var inputs = [];
	inputs.push('action=GetCountForFollowUpAndReschedule');
	inputs.push('txtAppoDate=' + encodeURIComponent(date));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {
					pobj = eval('(' + ajaxResponse + ')');
					$('#FollowUpPatientsToday').html(pobj.followUpCount);
					$('#ReschedulePatientsToday').html(pobj.rescheduleCount);
				}
			});
}


/*******************************************************************************
 * @author Sagar kadam
 * @date 27_June_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllPatientRecordsForScheduler(inputId,callfrom) {
	
	//var deptId=1;
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
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllRecordsForScheduler",
	success : function(r) {
		//setTempPatientRecords(r);

		$("#OPDPatientList").html(r);
		
		
			//$("#containerIPD").setTemplate(tabipdtempalte);
			//$("#containerIPD").processTemplate(r);
			//getAllPatientRecords();
			setTempPatientRecords(r);
			 autosuggesstionTempForScheduler(r,inputId);
		
	}
});}


/************
* @author	: Sagar Kadam
* @date		: 27-June-2017
* @codeFor	: Autosuggestion Template for Scheduler
 ************/
function  autosuggesstionTempForScheduler(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
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
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
				$("#hidpatId").val(ui.item.patientId);
				getPatientDetails(ui.item.patientId);
				
				
				//$("#patientDetails").val(ui.item.patientId);

				
				
				
			}
			/*
			 * This function use for Enter keypress search
			 */
			
		 
			//getAllPatientRecords2(id,'search');
			getAllPatientRecordsForScheduler(id,'search');
			//setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}