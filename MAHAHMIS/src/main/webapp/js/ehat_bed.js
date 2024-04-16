var G = 1;
var S = 1;
var I = 1;

var wardTypeSelectIDUI = "<select id='wardType1' class='form-control input-SmallText' onchange='if (this.selectedIndex) setHallTypeSelectID(this.value),getHallAndBed(this.value);'><option value='0'>--Select--</option>{#foreach $T.htli as htli} <option id='1ht{$T.htli.idht}' value='{$T.htli.idht}'>{$T.htli.htnm}</option>{#/for}</select>";
var wardTypeSelectIDUIBillable = "<select id='wardTypeBillable' class='form-control input-SmallText' onchange='if (this.selectedIndex) setHallTypeSelectIDBillable(this.value);'><option value='0'>--Select--</option>{#foreach $T.htli as htli} <option id='1ht{$T.htli.idht}' value='{$T.htli.idht}'>{$T.htli.htnm}</option>{#/for}</select>";

function showHallofType(idht) {
	var pattype = $("#pattype").val();
	if (pattype == 'R') {
		var pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');

		if (pattype != pobj1.otrBed.bdalfr) {
			// idht = 'onload';
			$("#bedAllocated").val("N");
		} else {
			$("#bedAllocated").val("Y");
		}
	}
	var hallDetailDiv = $("#hallDetailDiv").val();
	hallDetailDiv = eval('(' + hallDetailDiv + ')');
	if (idht == 'onload') {
		idht = hallDetailDiv.htli[0].idht;
	}
	var allBedObj = $("#allBedObj").val();
	pobj = eval('(' + allBedObj + ')');
	for ( var i = 0; i < pobj.hl.length; i++) {
		if (pobj.hl[i].ht == idht) {
			$("#hl" + pobj.hl[i].hi).show();
			var ba = 0;
			var bclean = 0;
			if (pobj.hl[i].bl != undefined) {
				for ( var j = 0; j < pobj.hl[i].bl.length; j++) {
					if (pobj.hl[i].bl[j].ba == "4") {
						ba++;
					}
					if (pobj.hl[i].bl[j].ba == "2") {
						bclean++;
					}
				}
			}

			$("#ba" + pobj.hl[i].hi).html(ba);
			$("#bclean" + pobj.hl[i].hi).html("Bed Cleaning: " + bclean);
		} else {
			$("#hl" + pobj.hl[i].hi).hide();
		}
	}
	for ( var k = 0; k < hallDetailDiv.htli.length; k++) {

		if (hallDetailDiv.htli[k].idht == idht) {
			$("#ht" + hallDetailDiv.htli[k].idht).css("background-color",
					"#436a9d");
			$("#ht" + hallDetailDiv.htli[k].idht).css("color", "white");
		} else {
			$("#ht" + hallDetailDiv.htli[k].idht).css("background-color",
					"white");
			$("#ht" + hallDetailDiv.htli[k].idht).css("color", "orange");
		}
	}
};

var wardTypeSelectIDUIBB = "<select id='wardType2' class='form-control input-SmallText' onchange='if (this.selectedIndex) setHallTypeSelectIDBB(this.value);'><option value='0'>--Select--</option>{#foreach $T.htli as htli} <option id='1ht{$T.htli.idht}' value='{$T.htli.idht}'>{$T.htli.htnm}</option>{#/for}</select>";

function getallHallType(type) {
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
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#hallDetailDiv").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#allhalltype").setTemplate($("#allhalltypeTemp").html());
			$("#allhalltype").processTemplate(pobj1);

			// Abhijit Radke
			$("#wardTypeSelectID").setTemplate(wardTypeSelectIDUI);
			$("#wardTypeSelectID").processTemplate(pobj1);

			// billable bed selection
			$("#wardTypeSelectIDBB").setTemplate(wardTypeSelectIDUIBB);
			$("#wardTypeSelectIDBB").processTemplate(pobj1);

			$("#wardTypeSelectIDBillable").setTemplate(
					wardTypeSelectIDUIBillable);
			$("#wardTypeSelectIDBillable").processTemplate(pobj1);
		}
	});
};

function getBedAva(hallID) {

	var inputs = [];
	inputs.push('action=GetBedAva');
	inputs.push('hallID=' + hallID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BedsServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#allBedObj").val(ajaxResponse);

					var BedsBean = eval('(' + ajaxResponse + ')');

					var allBedsSummaryVar = "<div class='col-md-12-1' style='font-size: 11px; text-decoration: blink; color: red;  padding-top: 5px;'>"
							+ "<div style='float: right;' id='bclean"
							+ BedsBean.hl[0].hi
							+ "'></div>"
							+ "<div style='float: right; margin-right: 2%;' id='ba"
							+ BedsBean.hl[0].hi
							+ "'></div>"
							+ "<div style='float: right;'>Total Beds: "
							+ BedsBean.hl[0].bn
							+ "&nbsp;&nbsp;&nbsp; Available Beds:&nbsp;</div>"
							+ "</div>";

					$("#allBedsSummary").html(allBedsSummaryVar);

					/* Creating and setting Graphical View */
					var bedListGraphView = createGraphicalView(BedsBean);
					$("#allbeds").html(bedListGraphView);

					/* Creating and setting List View */
					var bedList_ListView = createListView(BedsBean);
					$("#allbedsListViewTemp").html(bedList_ListView);

					// to highlight the current patient
					setCommonPatInfoforbed();
				}
			});
};

function setBillableBed() {
	var radBillableBed = $("input[name='radBillableBed']:checked").val();
	if (radBillableBed == "sameBed") {
		$("#divWardType").hide();
		updateBillableBed1();
	} else {
		$("#divWardType").show();
	}
};

function updateBillableBed1() {
	var bedId = $("#bedIDPop").val();
	/*var hallType;
	var patientType = $("#pattype").val();
	var hallTypeSelectIDBB = 0;

	var radBillableBed = $("input[name='radBillableBed']:checked").val();
	if (radBillableBed == "sameBed") {
		hallTypeSelectIDBB = 0;
		hallType = $("#wardType1").val();
	} else {
		hallTypeSelectIDBB = $("#hallTypeSelectIDBB").val();
		hallType = $("#wardType2").val();
	}*/

	/*allocateBed(bedId, hallType, patientType, hallTypeSelectIDBB);*/
	allocateBed(bedId);

	$(".popup").hide();
};

function swapImages(picObject, bedID, ht) {

	$("#bedIDPop").val(bedID);
	
	$(".popup").show();

	//var pobj = $("#divPatId").html();

	/*var pobj1 = eval('(' + pobj + ')');
	var patientType = $("#pattype").val();
	var bedStatus = $("#bedAllocated").val();
	var picObjectValue = picObject.src;
	var bSplit = picObjectValue.split("bed");
	var aSplit = bSplit.slice(1);
	var BedAllocStatus = $("#BedAllocStatus").val();
	if (aSplit == "Empty1.png") {
		if (bedStatus == 'N') {

			$(".popup").show();

			// var r = confirm("You Want To Allocate This Bed.");
			// if (r == true) {
			// picObject.src = "images/bedOcc.png";
			// allocateBed(bedID, ht, patientType);
			// }
			// $(".popup").hide();
		}
		if (BedAllocStatus == 'old') {

			$(".popup").show();
			// var r = confirm("You Want To Allocate This Bed.");
			// if (r == true) {
			// picObject.src = "images/bedOcc.png";
			// allocateBed(bedID, ht, patientType);
			// }
		}
	} else {

		if (bedStatus == 'Y') {
			if (pobj1.oBed.bi == bedID) {

				if (patientType == "R") {
					var p = confirm("You Want To DeAllocate This Bed.");
					if (p == true) {
						picObject.src = "images/bedEmpty1.png";
						deAllocateRelativeBed(bedID, patientType);
					}
				} else {
					var p = confirm("You Want To Shift This Bed. ");
					if (p == true) {
						picObject.src = "images/bedEmpty1.png";
						deAllocateBed(bedID, ht);
					}
				}
			}
		}
	}*/

	$(".exit").click(function() {
		$(".popup").hide();
	});
};

function allocateBed(bedID) {// alert("ID="+$("#treatmentId").val());

	var billId=$("#billNo").text();
	var patientId=$("#patientId").text();
	var treatmentId=$("#treatmentId").text();
	var srvMstId=$("#li0").val();
	var bedCharges=500;
	var sourceTypeId=1;
	var unitId=1;
	var userId=1;
	var departmentId=2;
	
	/*var BedAllocStatus = $("#BedAllocStatus").val();
	var DallocBedId = $("#DallocBedId").val();
	var isolation = 0;
	var $radios = $('input:checkbox[id=txtIsolation]');
	if ($radios.is(':checked') == true) {
		isolation = 1;
	}
	if (billableBedType == undefined) {
		billableBedType = 0;
	}*/
	
	var inputs = [];	
	inputs.push('billId=' + billId);
	inputs.push('patienttId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('serviceId=' + srvMstId);
	inputs.push('subServiceId=' + bedID);
	inputs.push('rate=' + bedCharges);
	inputs.push('amount=' + bedCharges);
	inputs.push('sourceTypeId=' + sourceTypeId);	
	inputs.push('unitId=' + unitId);
	inputs.push('departmentId=' + departmentId);
	inputs.push('createdBy=' + userId);
	//inputs.push('createdDateTime=' + departmentId);
	/*inputs.push('patientType=' + patientType);
	inputs.push('tid=' + $("#treatmentId").val());
	inputs.push('BedAllocStatus=' + BedAllocStatus);
	inputs.push('DallocBedId=' + DallocBedId);
	inputs.push('isolation=' + isolation);
	inputs.push('billableBedType=' + billableBedType);*/
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/saveIpdBillDetails",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {

			alert(r);
				/*var ajaxResponse = r;
				var jsObj = eval('(' + ajaxResponse + ')');

				alert((jsObj.msg));

				if ((jsObj.msg) == "Bed Allocated Successfully."
						|| (jsObj.msg) == "Bed Shifted Successfully.") {

					if ((jsObj.msg) == "Bed Shifted Successfully.") {
						var bedAllocated = 'Y';
						var pageIncludeType = 'IPD';
						var callFor = "null";

						var ajaxResponse = (jsObj.pl[0]);
						var myObj = JSON.stringify(ajaxResponse);

						window.location.href = "ehat_IPD_BedWard.jsp?"
								+ "patientId=" + (jsObj.pl[0].pi)
								+ "&treatmentId=" + (jsObj.pl[0].trid)
								+ "&myObj=" + encodeURIComponent(myObj)
								+ "&bedallocated=" + bedAllocated + "&ht="
								+ (jsObj.pl[0].objHall.ht) + "&pattype="
								+ (jsObj.pl[0].otrBed.bdalfr)
								+ "&pageIncludeType=" + pageIncludeType
								+ "&callFor=" + callFor;

					} else if ((jsObj.msg) == "Bed Allocated Successfully.") {

						// window.location =
						// ("IPD_OldPatientDatabase.jsp?moduleName=ipd&patientID="
						// + $("#pid").val());
						window.location = ("ehat_IPD_BedWardDashboard.jsp");
					}

				} else if ((jsObj.msg) == "This Bed Is Already Allocated For Patient."
						|| (jsObj.msg) == "This Bed Is Already Allocated This Patient.") {

					getBedAva('allBed');

					setTimeout(function() {
						showHallofType(ht);
					}, 500);

				}*/
			}
		});

	// document.refresh();
	// window.reload();
};

function deAllocateRelativeBed(bedID, patientType) {

	var inputs = [];
	inputs.push('action=deAllocateBed');
	inputs.push('bedID=' + bedID);
	// inputs.push('tid=' + $("#tid").val());
	inputs.push('tid=' + $("#treatmentId").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BedsServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if (ajaxResponse == "Relative Bed Deallocate Successfully .") {
				window.location = "IPD_OldPatientDatabase.jsp";
			}
		}
	});
};

function deAllocateBed(bedID, ht) {

	/*
	 * var inputs = []; inputs.push('action=deAllocateBed');
	 * inputs.push('bedID=' + bedID); inputs.push('tid=' + $("#tid").val()); var
	 * str = inputs.join('&'); jQuery.ajax({ async : true, type : "POST", data :
	 * str + "&reqType=AJAX", url : "BedsServlet", timeout : 1000 * 60 * 5,
	 * catche : false, error : function() { alert("error"); }, success :
	 * function(r) { ajaxResponse = r; // $("#message").html(ajaxResponse);
	 * concor am5
	 */

	$("#BedAllocStatus").val('old');
	$("#DallocBedId").val(bedID);

	alert("Please Select Another Bed.");
	// getBedAva('allBed');

	setTimeout(function() {
		showHallofType(ht);
	}, 500);

	// $("#bbed" + bedID).hide();
};

function initTemplate() {

}

function deallocateBedAtIPD() {
	// alert("ddddddddddd");
	var r = false;
	var isolation;
	var pattype = $("#pattype").val();
	var $radios = $('input:checkbox[id=txtIsolation]');
	if ($radios.is(':checked') == true) {
		isolation = 1;
		r = confirm("You Want To Isolate This Bed. ");
		if (r == true) {
		} else {
			$("input:checkbox[id=txtIsolation]").attr('checked', false);
		}
	} else {
		isolation = 0;
		r = confirm("You Want To Deisolate This Bed. ");
		if (r == true) {

		} else {
			$("input:checkbox[id=txtIsolation]").attr('checked', true);
		}
	}

	var tid = $("#treatmentId").val();

	if (r == true) {
		var inputs = [];
		inputs.push('action=deallocateBedAtIPD');
		inputs.push('tid=' + tid);
		inputs.push('isolation=' + isolation);
		inputs.push('pattype=' + pattype);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BedsServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				if (isolation == 1) {
					alert("Bed is Isolated Successfully..");
				} else {
					alert("Bed is Deisolated Successfully..");
				}
			}
		});
	}
};

function setHallTypeSelectID(wardID) {
	// alert(wardID);
	var ajaxResponse = $("#allBedObj").val();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].ht == wardID)
			hallTypeString = hallTypeString + "<option id='' value='"
					+ myArray.hl[i].hi + "'>" + myArray.hl[i].hn + "</option>";
	}

	var sample;
	alert(hallTypeString);
	$("#hallTypeSelectID").setTemplate(hallTypeString);
	$("#hallTypeSelectID").processTemplate(sample);
	try {
		$("#selectPackageID").setTemplate(packTemp);
		$("#selectPackageID").processTemplate(sample);
	} catch (e) {
	}
	
};

function setHallTypeSelectIDBillable(wardID) {

	var ajaxResponse = $("#allBedObj").val();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].ht == wardID)
			hallTypeString = hallTypeString + "<option id='' value='"
					+ myArray.hl[i].hi + "'>" + myArray.hl[i].hn + "</option>";
	}

	var sample;
	$("#hallTypeSelectIDBillable").setTemplate(hallTypeString);
	$("#hallTypeSelectIDBillable").processTemplate(sample);

};

function setHallTypeSelectIDBB(wardID) {

	var ajaxResponse = $("#allBedObj").val();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].ht == wardID)
			hallTypeString = hallTypeString + "<option id='' value='"
					+ myArray.hl[i].hi + "'>" + myArray.hl[i].hn + "</option>";
	}

	var sample;
	$("#hallTypeSelectIDBB").setTemplate(hallTypeString);
	$("#hallTypeSelectIDBB").processTemplate(sample);

};

function setHallBedsUI(hallID) {

	var inputs = [];
	inputs.push('action=GetBedAva');
	inputs.push('hallID=' + hallID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BedsServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var ajaxResponse = r;

					var BedsBean = eval('(' + ajaxResponse + ')');

					if (BedsBean.hl.length > 0) {
						// logic to calculate Beds for Cleaning
						var bclean = 0;
						var bedsAvail = 0;

						var allBedsSummaryVar = "<div class='col-md-12-1' style='font-size: 11px; text-decoration: blink; color: red; padding-top: 5px;'>"
								+ "<div style='float: right;' id='bclean"
								+ BedsBean.hl[0].hi
								+ "'></div>"
								+ "<div style='float: right; margin-right: 2%;' id='ba"
								+ BedsBean.hl[0].hi
								+ "'></div>"
								+ "<div style='float: right;'>Total Beds: "
								+ BedsBean.hl[0].bn
								+ "&nbsp;&nbsp;&nbsp; Available Beds:&nbsp;</div>"
								+ "</div>";

						if (undefined === (BedsBean.hl[0].bl)) {
							alert("No Beds in this Hall...");
							$("#allBedsSummary").html(allBedsSummaryVar);
							$("#bclean" + BedsBean.hl[0].hi).html(
									"&nbsp;Bed Cleaning:&nbsp;" + bclean);
							$("#ba" + BedsBean.hl[0].hi).html(bedsAvail);
							$("#allbeds").html("");
							$("#allbedsListViewTemp").html("");
							return false;
						}

						$.each(BedsBean.hl[0].bl, function(name, bl) {
							if (bl.ba == '2') {
								bclean++;
							} else if (bl.ba == '4') {
								bedsAvail++;
							}
						});

						$("#allBedsSummary").html(allBedsSummaryVar);
						$("#bclean" + BedsBean.hl[0].hi).html(
								"&nbsp;Bed Cleaning:&nbsp;" + bclean);
						$("#ba" + BedsBean.hl[0].hi).html(bedsAvail);

						/* Creating and setting Graphical View */
						var bedListGraphView = createGraphicalView(BedsBean);
						$("#allbeds").html(bedListGraphView);

						/* Creating and setting List View */
						var bedList_ListView = createListView(BedsBean);
						$("#allbedsListViewTemp").html(bedList_ListView);

						// to highlight the current patient
						setCommonPatInfoforbed();
					}
				}// end success[Ajax]

			}); // end Ajax
};

function createGraphicalView(BedsBean) {

	if (BedsBean.hl.length > 0) {

		var bedList = "<table class='table'> <tbody class='col-md-12-1' style='margin-top: 0px;'> ";
		var loopCounter = 0;
		// var bedCount = (BedsBean.hl[0].bn);
		var bedCount = (BedsBean.hl[0].bl.length);

		var row1 = 0;
		var row2 = 0;
		var row3 = 0;

		if (bedCount > 0 && bedCount <= 10) { // 1 to 10
			row1 = bedCount;

		} else if (bedCount > 10 && bedCount <= 20) {
			row1 = 10;
			row2 = bedCount;

		} else if (bedCount > 20 && bedCount <= 30) {
			row1 = 10;
			row2 = 20;
			row3 = bedCount;

		} else if (bedCount > 30) {
			row1 = (Math.round(bedCount / 3.5) + 1);
			row2 = row1 * 2;
			row3 = row1 * 3;
		}

		$.each(	BedsBean.hl[0].bl,function(name, bl) {

							/*
							 * loopCounter == 0 || loopCounter == 15 ||
							 * loopCounter == 30 || loopCounter == 45
							 */
							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "<tr id='' class=''>";
							}

							if (bl.ba == '2') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 100px; background-color: orange; border: 1px solid orange;'> "
										+ "<img src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
										/*
										 * + "<img src='images/clean.jpg'
										 * width='100px' height='56px'"
										 */
										+ " onclick='swapImages(this,"
										+ bl.bi
										+ ","
										+ BedsBean.hl[0].ht
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
										+ bl.bdnm + "</label> "
										+ "</div> </td>";

							} else if (bl.ba == '4') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 100px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'> "
										+ "<div style='height: 17px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 33px; width: 148px;'>"
										+ "<img src='images/bedEmpty1.png' width='35px' height='20px'"
										/*
										 * + "<img src='images/bedEmpty.png'
										 * width='60px' height='30px' "
										 */
										+ " onclick='swapImages(this,"
										+ bl.bi
										+ ","
										+ BedsBean.hl[0].ht
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
										+ bl.bdnm + "</label></div>"
										+ "</div> </td>";

							} else if (bl.ba == '3') {

								// for Sponsored Patent Type
								var redDot = "";
								var pay = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Self Pay</label>";
								if (bl.bpl[0].objTreat.sdic != 0) {
									redDot = "<label style='float: right; height: 15px; margin-bottom: 0px;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='border: 2px solid white;'></images></label> ";

									pay = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"
											+ bl.bpl[0].objTreat.insuCmpny
											+ "</label>";
								}

								// bed allocated to 'patient' or 'relative'
								var bedAllocatedForBedName = "";
								var nameRelative = "";

								// bed allocated to 'patient'
								if (bl.bpl[0].otrBed.bdalfr == 'P') {

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 131px; margin-bottom: 0px;'>"
											+ bl.bpl[0].tit
											+ " "
											+ bl.bpl[0].fn
											+ " "
											+ bl.bpl[0].mn
											+ " "
											+ bl.bpl[0].ln
											+ "</label>" + redDot;

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'><img src='images/bedOcc1.png' width='30px' height='25px'"
											+ " onclick='swapImages(this,"
											+ bl.bi
											+ ","
											+ BedsBean.hl[0].ht
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+ bl.bdnm + "</label></div>";
								} else { // bed allocated to 'relative'

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Relative of: "
											+ bl.bpl[0].tit
											+ " "
											+ bl.bpl[0].fn
											+ " "
											+ bl.bpl[0].mn
											+ " "
											+ bl.bpl[0].ln
											+ "</label>";

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOccRelative.png' width='30px' height='25px' "
											+ " onclick='swapImages(this,"
											+ bl.bi
											+ ","
											+ BedsBean.hl[0].ht
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+ bl.bdnm + "</label></div>";
								}

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 100px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);' id='bbed"
										+ bl.bi
										+ "'> "
										+ nameRelative
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>"
										+ bl.bpl[0].mrNo
										+ "</label> "
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>"
										+ (((bl.inDateTime).split(" "))[0])
										+ "</label>" + pay
										+ bedAllocatedForBedName + "</div>"
										+ "</td>";
							}

							loopCounter++;

							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "</tr>";
							}

						}); // end for each function

		bedList = bedList + "</tbody> </table>";

		return bedList;

	}
};

function createListView(BedsBean) {

	if (BedsBean.hl.length > 0) {

		var bedList = "<div class='col-sm-12-1'>"
				+ "<table class='table table-condensed cf' style='width: 1131px;'>"
				+ "<thead class='cf'>"
				+ "<tr>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>#</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Ward</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Bed No.</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Status</label></th>"
				+ "		<th class='col-md-2-1'><label class='TextFont'>Patient Name</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>MR No.</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Age / Gender</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Bed Alloc. Date</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Discharge Date</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Pay Type</label></th>"
				+ "		<th class='col-md-1-1'><label class='TextFont'>Action</label></th>"
				+ "	</tr>"
				+ "	</thead>"
				+ "</table>"
				+ "</div>"
				+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 328px; max-height: auto;'>"
				+ "	<table class='table table-bordered table-striped table-condensed'>"
				+ "<tbody>";

		var count = 1;

		$
				.each(
						BedsBean.hl[0].bl,
						function(name, bl) {

							bedList = bedList + "<tr>";

							bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
									+ count++ + ".</td>";
							bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
									+ BedsBean.hl[0].hn + "</td>";
							bedList = bedList
									+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
									+ bl.bdnm + "</td>";

							if (bl.ba == '2') { // Cleaning

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: orange; color: white; padding: 5px 3px;'> Cleaning </div>"
										+ " </td>";
								bedList = bedList
										+ "<td class='col-sm-2-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ bl.bi + "," + BedsBean.hl[0].ht
										+ ")' /> " + "</td>";

							} else if (bl.ba == '3') { // Allocated

								var redDot = "";
								if (bl.bpl[0].objTreat.sdic != '0') {
									redDot = "<label style='background: white; float: right;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='padding: 1px; padding-top: 0px;'></images></label> ";
								}

								// for relative
								var relativeSign = "";
								if (bl.bpl[0].otrBed.bdalfr != 'P') {
									relativeSign = "<label style='font-weight: bold; float: right;'> R </label>";
								}

								var dischargeDate = " ------";
								if ((bl.bpl[0].objTreat.treEnd) != undefined) {
									dischargeDate = (bl.bpl[0].objTreat.treEnd);
								}

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: rgb(00, 114, 198); color: white; padding: 5px 3px;' id='bbedListView"
										+ bl.bi + "'> Allocated" + redDot
										+ relativeSign + "</div>" + " </td>";
								bedList = bedList
										+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
										+ bl.bpl[0].tit + " " + bl.bpl[0].fn + " " + bl.bpl[0].mn
										+ " " + bl.bpl[0].ln + "</td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ bl.bpl[0].mrNo + "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ (bl.bpl[0].ag) + "/" + (bl.bpl[0].sx)
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ (((bl.inDateTime).split(" "))[0])
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ dischargeDate + "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ bl.bpl[0].objTreat.insuCmpny
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ bl.bi + "," + BedsBean.hl[0].ht
										+ ")' /> " + "</td>";

							} else if (bl.ba == '4') { // Available

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: rgb(34, 177, 77); color: white; padding: 5px 3px;'> Available </div>"
										+ " </td>";
								bedList = bedList
										+ "<td class='col-sm-2-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'></td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ bl.bi + "," + BedsBean.hl[0].ht
										+ ")' /> " + "</td>";
							}

							bedList = bedList + "</tr>";

						}); // end for each function

		bedList = bedList + "</tbody>" + "</table>" + "</div>";

		return bedList;
	}
};

function changeView(view) {

	if (view == "listView") {

		document.getElementById("allbedsListViewTemp").style.display = "block";
		document.getElementById("allbeds").style.display = "none";
		
		try {
			// Touheed code for show hall beds 19-NOV-2015
			document.getElementById("hallsBeds").style.display = "none";
		} catch (e) {
		}

	} else { // if GraphicalView

		document.getElementById("allbedsListViewTemp").style.display = "none";
		document.getElementById("allbeds").style.display = "block";
		
		try {
			// Touheed code for show hall beds 19-NOV-2015
			document.getElementById("hallsBeds").style.display = "none";
		} catch (e) {
		}

	}

};

function getBillable() {
	var treatmentId = $("#tid").val();

	if (treatmentId == "" || treatmentId == undefined) {
		treatmentId = ($("#tid").html()).trim();
	}

	var inputs = [];
	inputs.push('action=getBillable');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pattype=' + ($("#pattype").val()).trim());
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BedsServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var ajaxResponse = r;
					var bedDetails = eval('(' + ajaxResponse + ')');

					$("#wardType1").val(bedDetails.tbList[0].ht);
					setHallTypeSelectID(bedDetails.tbList[0].ht);

					$("#hallTypeSelectID").val(bedDetails.tbList[0].bty);
					setHallBedsUI(bedDetails.tbList[0].bty);
					getHallAndBed(bedDetails.tbList[0].bty);
					if (bedDetails.tbList[0].bbt == 0
							|| bedDetails.tbList[0].bhn == 0) {
						$("#billableDiv").hide();
					} else {
						$("#wardTypeBillable").val(bedDetails.tbList[0].bhn);
						setHallTypeSelectIDBillable(bedDetails.tbList[0].bhn);
						$("#hallTypeSelectIDBillable").val(
								bedDetails.tbList[0].bbt);
						// setHallBedsUI(bedDetails.tbList[0].bbt);
					}
				}
			});
};

function updateBillableBed() {
	var hallTypeSelectIDBillable = $("#hallTypeSelectIDBillable").val();
	var treatmentId = $("#treatmentId").val();

	var wardTypeBillable = $("#wardTypeBillable").val();
	if (wardTypeBillable == 0) {
		alert("Select Ward Type");
		return false;
	}
	if (hallTypeSelectIDBillable != 0) {
		var inputs = [];
		inputs.push('action=updateBillableBed');
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('hallTypeSelectID=' + hallTypeSelectIDBillable);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BedsServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
			}
		});
	}
};

var wardTypeSelectIDUIView = "<option id='' value='0'>--select--</option>";
function getallHallTypeForView(type) {
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
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			$("#hallDetailDiv").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			for ( var i = 0; i < (pobj1.htli.length); i++) {

				wardTypeSelectIDUIView = wardTypeSelectIDUIView
						+ ("<option id='" + (pobj1.htli[i].idht) + "' value='"
								+ (pobj1.htli[i].idht) + "'>"
								+ (pobj1.htli[i].htnm) + "</option>");

			}

			$("#wardType1").html(wardTypeSelectIDUIView);

		}
	});
};

// Touheed 18-NOV-2015
// Get Hall and Beds
function getHallAndBed(wardTypeSelectID) {
	if (wardTypeSelectID == 0) {
		var inputs = [];
		inputs.push('action=getHallAndBed');
		inputs.push('wardTypeSelectID=' + wardTypeSelectID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BedsServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var ajaxResponse = r;
				pobj1 = eval('(' + ajaxResponse + ')');
				///alert(r);
				/*
				 * $("#setHallAndBed").setTemplate(packTemp);
				 * $("#setHallAndBed").processTemplate(pobj1);
				 */
				$("#allHallAndBed").html(r);
				createAllGridView();
			}
		});
	} else if (hallTypeSelectIDBillable != 0) {
		var inputs = [];
		inputs.push('action=getHallAndBed');
		inputs.push('wardTypeSelectID=' + wardTypeSelectID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BedsServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var ajaxResponse = r;
				pobj1 = eval('(' + ajaxResponse + ')');
				/*
				 * $("#setHallAndBed").setTemplate(packTemp);
				 * $("#setHallAndBed").processTemplate(pobj1);
				 */
				$("#setHallAndBed").html(r);
			}
		});
	}
};

// Touheed Code for Grid view 19-Nov-2015
function createGridView() {

	var ajaxResponse = $("#setHallAndBed").html();
	pobj1 = eval('(' + ajaxResponse + ')');

	// To hide ListView and if GraphicalView
	document.getElementById("allbeds").style.display = "none";
	document.getElementById("allbedsListViewTemp").style.display = "none";

	/*
	 * var HTML ="<div id='allbeds' class='col-md-11-1' style='overflow-x:
	 * scroll; width: 1100px; max-width: auto; height: 355px;'>"; HTML += "<table
	 * class='table table-bordered' style=' overflow-x: scroll;'><tbody
	 * class='col-md-12-1' style='margin-top: 0px;'>"; for(var j=0;j<pobj1.htli.length;j++) {
	 * HTML +="<tr>"; HTML += "<td class='col-sm-1-1'>"+pobj1.htli[j].htnm+"</td>";
	 * 
	 * for(var k =0;k<pobj1.htli[j].bedList.length;k++){
	 * 
	 * //check bed state==cleaing if(pobj1.htli[j].bedList[k].bs=='2'){ var
	 * bname = pobj1.htli[j].bedList[k].bdnm; HTML += "<td class='col-sm-1-1'>";
	 * HTML +="<div id='' style='width: 150px; height: 100px; background-color:
	 * orange; border: 1px solid orange;'>"; HTML +="<img width='100px'
	 * height='80px' onclick='swapImages(this,448,2)' style='margin-left: 25px;'
	 * src='images/clean1.png'>"; HTML +="<label class='TextFont' style='color:
	 * white; font-size: 10px; margin-left: 46px;'>Bed Name:"+bname+"</label></div>";
	 * HTML +="</td>"; } //check bed state==allocated else
	 * if(pobj1.htli[j].bedList[k].bs=='3'){ var bname =
	 * pobj1.htli[j].bedList[k].bdnm; HTML += "<td class='col-sm-1-1'>"; HTML
	 * +="<div id='' style='margin-top: 0px; height: 33px; width:
	 * 148px;background-color:rgb(00, 114, 198)'>"; HTML +="<img width='30px'
	 * height='25px' onclick='swapImages(this,139,2)'
	 * src='images/bedOcc1.png'>"; HTML +="<label class='TextFont'
	 * style='color: white;'>Bed Name:"+bname+"</label></div>"; HTML +="</td>"; }
	 * //check bed state == deallocated else
	 * if(pobj1.htli[j].bedList[k].bs=='4'){ var bname =
	 * pobj1.htli[j].bedList[k].bdnm; HTML += "<td class='col-sm-1-1'>"; HTML
	 * +="<div id='' style='width: 150px; height: 100px; background-color:
	 * rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'>"; HTML +="<img
	 * width='35px' height='20px' onclick='swapImages(this,606,9)'
	 * src='images/bedEmpty1.png'>"; HTML +="<label class='TextFont'
	 * style='color: white; font-size: 10px; width: 75px'>Bed Name:"+bname+"</label></div>";
	 * HTML +="</td>"; } }
	 * 
	 * HTML += "</tr>"; }
	 * 
	 * HTML +="</tboody></table>"; HTML +="</div>";
	 */

	// Touheed UI for small icon Follwoing code
	var HTML = "<div id='allbeds' class='col-md-11-1' style='overflow-x: scroll; width: 1100px; max-width: auto; height: 355px;'>";
	HTML += "<table class='table table-bordered' style=' overflow-x: scroll;'><tbody class='col-md-12-1' style='margin-top: 0px;'>";
	for ( var j = 0; j < pobj1.htli.length; j++) {
		HTML += "<tr>";
		HTML += "<td class='col-sm-1-1'><B>" + pobj1.htli[j].htnm + "</B></td>";

		if (pobj1.htli[j].bedList.length > 0) {
			for ( var k = 0; k < pobj1.htli[j].bedList.length; k++) {

				// check bed state==cleaing
				if (pobj1.htli[j].bedList[k].bs == '2') {
					var bname = pobj1.htli[j].bedList[k].bdnm;
					HTML += "<td class='col-sm-1-1'>";
					HTML += "<div id='' style='width: 110px; height: 46px; background-color: orange; border: 1px solid orange;'>";
					HTML += "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 0px;'>Bed Name:"
							+ bname + "</label></div>";
					HTML += "</td>";
				}
				// check bed state==allocated
				else if (pobj1.htli[j].bedList[k].bs == '3') {
					var bname = pobj1.htli[j].bedList[k].bdnm;
					var pname = pobj1.htli[j].bedList[k].patientName;
					HTML += "<td class='col-sm-1-1'>";
					HTML += "<div id='' style='margin-top: 0px; height: 46px; width: 103px;background-color:rgb(00, 114, 198)'>";
					HTML += "<label class='TextFont' style='color: white;'>Bed Name:"
							+ bname + "</label><br>";
					HTML += "<label class='TextFont' style='color: white;'>"
							+ pname + "</label></div>";
					HTML += "</td>";
				}
				// check bed state == deallocated
				else if (pobj1.htli[j].bedList[k].bs == '4') {
					var bname = pobj1.htli[j].bedList[k].bdnm;
					HTML += "<td class='col-sm-1-1'>";
					HTML += "<div id='' style='width: 103px; height: 46px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'>";
					HTML += "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name:"
							+ bname + "</label></div>";
					HTML += "</td>";
				}

			}// for
		}// if
		else {
			var tname = pobj1.htli[j].htnm;
			HTML += "<td class='col-sm-12-1'>";
			HTML += "<div id='' style='margin-top: 0px; height: 40px; width: 103px;background-color:#900000'>";
			HTML += "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>No Beds in "
					+ tname + "</label></div>";
			HTML += "</td>";

		}

		HTML += "</tr>";
	}

	HTML += "</tboody></table>";
	HTML += "</div>";

	document.getElementById("hallsBeds").innerHTML = HTML;

	document.getElementById("hallsBeds").style.display = "block";
};

// Touheed Code for Grid view 25-Nov-2015
function createAllGridView() {

	var ajaxResponse = $("#allHallAndBed").html();
	pobj1 = eval('(' + ajaxResponse + ')');

	var HTML = "<div id='allbeds' class='col-md-11-1' style='overflow-x: scroll; width: 1175px; max-width: auto; height: 500px;'>";
	HTML += "<table class='table table-bordered' style=' overflow-x: scroll;'><tbody class='col-md-12-1' style='margin-top: 0px;'>";
	for ( var j = 0; j < pobj1.htli.length; j++) {
		HTML += "<tr>";
		HTML += "<td class='col-sm-1-1'><B>" + pobj1.htli[j].htnm + "</B></td>";

		if (pobj1.htli[j].bedList.length > 0) {
			for ( var k = 0; k < pobj1.htli[j].bedList.length; k++) {

				// check bed state==cleaing
				if (pobj1.htli[j].bedList[k].bs == '2') {
					var bname = pobj1.htli[j].bedList[k].bdnm;
					HTML += "<td class='col-sm-1-1'>";
					HTML += "<div id='' style='width: 75px; height: 15px; background-color: orange; border: 1px solid orange;'>";
					HTML += "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 0px;'>Bed Name:"
							+ bname + "</label></div>";
					HTML += "</td>";
				}
				// check bed state==allocated
				else if (pobj1.htli[j].bedList[k].bs == '3') {
					var bname = pobj1.htli[j].bedList[k].bdnm;
					var pname = pobj1.htli[j].bedList[k].patientName;
					HTML += "<td class='col-sm-1-1'>";
					HTML += "<div id='' style='margin-top: 0px; height: 15px; width: 75px;background-color:rgb(00, 114, 198)'>";
					HTML += "<label class='TextFont' style='color: white;' title='"
							+ pname + "'>Bed Name:" + bname + "</label><br>";
					/*
					 * HTML +="<label class='TextFont' style='color:
					 * white;'>"+pname+"</label></div>";
					 */
					HTML += "</td>";
				}
				// check bed state == deallocated
				else if (pobj1.htli[j].bedList[k].bs == '4') {
					var bname = pobj1.htli[j].bedList[k].bdnm;
					HTML += "<td class='col-sm-1-1'>";
					HTML += "<div id='' style='width: 75px; height: 15px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'>";
					HTML += "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name:"
							+ bname + "</label></div>";
					HTML += "</td>";
				}

			}// for
		}// if
		else {
			var tname = pobj1.htli[j].htnm;
			HTML += "<td class='col-sm-12-1'>";
			HTML += "<div id='' style='margin-top: 0px; height: 15px; width: 75px;background-color:#900000'>";
			HTML += "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>No Beds in "
					+ tname + "</label></div>";
			HTML += "</td>";

		}

		HTML += "</tr>";
	}

	HTML += "</tboody></table>";
	HTML += "</div>";

	document.getElementById("allhallsBeds").innerHTML = HTML;
	document.getElementById("allhallsBeds").style.display = "block";

};
