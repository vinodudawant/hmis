/************
 * @author	: Vinod Udawant
 * @date		: 18-Nov-2019
 * @codeFor	: Check uncheck all checkbox in table
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntry").show('slow');
	} else {

		$("#divForEntry").toggle('slow');
	}
}
function saveReferToDoc() {
	var did = $("#did").val();
	var dname = $("#dname").val();
	var rfees = $("#rfees").val();
	var refDocPer = $("#refDocPer").val();
	var prefixId = $("#prefix").val();
	var contct = $("#contact").val();
	var address = $("#address").val();
	var mobile = $("#mobile").val();
	var email = $("#email").val();
	var spcl = $("#spcl").val();
	var hname = $("#hname").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();

	var doctorType = $('input[name=typeOfDoctor]:checked').val();

//	prefixId=1;
	
	
	if (prefixId == "select") {
		alert("Select Prefix!!!");
		return false;
	}
	if (dname == "") {
		alert("Doctor Name Must Be Filled Out");
		return false;
	}
	if (rfees == "") {
		alert("Doctor Refer Fees Must Be Filled Out");
		return false;
	}
	if (refDocPer > 100 || refDocPer < 0) {
		alert("Reference Percent range is 0-100.");
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(contct)) {
		alert("Please enter valid contact numbers");
		$("#contact").focus();
		return false;
	}
	if (contct.length < 10 || contct.length > 15) {
		alert("Please Enter Valid Contact No.");
		$("#contact").focus();
		return false;
	}
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email != "") {
		if (!email.match(mailformat)) {
			alert("You have entered an invalid email address!");
			return false;
		}
	}

	if (rfees == null || rfees == "" || rfees == undefined) {
		rfees = 0;
	}
	if (refDocPer == null || refDocPer == "" || refDocPer == undefined) {
		refDocPer = 0;
	}

	var inputs = [];
	inputs.push('channDocId=' + did);
	inputs.push('prefixId=' + prefixId);
	inputs.push('docName=' + dname);
	inputs.push('referFees=' + rfees);
	inputs.push('refDocPer=' + refDocPer);
	inputs.push('specility=' + spcl);
	inputs.push('hospitalName=' + hname);
	inputs.push('contactNo=' + contct);
	inputs.push('mobileNo=' + mobile);
	inputs.push('email=' + email);
	inputs.push('address=' + address);
	inputs.push('doctorType=' + doctorType);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/saverefertodoc",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			}  else {
				alertify.error("Network Issue");
			}
			setExistingDoctorTemp();
			refershChannelDoctorMgmt();

		}
	});

}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : setExistingDoctorTemp()
 ******************************************************************************/
function setExistingDoctorTemp() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/setexistingedctortemp",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			
			

			setchanneldoctorMgmtTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : seticd10CodeMgmtTemplate()
 ******************************************************************************/

function setchanneldoctorMgmtTemplate(response) {
	

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.chann_docList.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.chann_docList[i].channDocId
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.chann_docList[i].prefix
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ response.chann_docList[i].docName
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ response.chann_docList[i].referFees
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.chann_docList[i].refDocPer
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess"  data-toggle="modal"  onclick=editChannelDoctorMgmt('
				+ response.chann_docList[i].channDocId
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteChannelDoctorMgmt('
				+ response.chann_docList[i].channDocId
				+ ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#channeldoctorMgmtBody").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : editChannelDoctorMgmt()
 ******************************************************************************/
function editChannelDoctorMgmt(doctorId) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editchanneldoctormgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			$("#did").val(r.channDocId);
			$("#dname").val(r.docName);
			$("#rfees").val(r.referFees);
			$("#refDocPer").val(r.refDocPer);
			$("#prefix").select2('val',r.prefixId);
			$("#contact").val(r.contactNo);
			$("#address").val(r.address);
			$("#mobile").val(r.mobileNo);
			$("#email").val(r.email);
			$("#spcl").val(r.specility);
			$("#hname").val(r.hospitalName);

			if (r.doctorType == "ipd") {
				document.getElementById('chkIpd').checked = true;
			} else if (r.doctorType == "opd") {
				document.getElementById('chkOpd').checked = true;
			} else if (r.doctorType == "diagnosis") {
				document.getElementById('chkDiagnosis').checked = true;
			} else if (r.doctorType == "all") {
				document.getElementById('all').checked = true;
			}
			toggleEntryDiv('divForEntry');

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-jan-2020
 * @codeFor	: deleteChannelDoctorMgmt
 ************/

function deleteChannelDoctorMgmt(id) {

	var r = confirm("Are You Sure You Want To Delete Channel Doctor  Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/admin/deletechanneldoctormgmt",
			data : {
				"doctorId" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);

				setExistingDoctorTemp();
			}
		});
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : channelDoctorAutoSuggestion()
 ******************************************************************************/

function channelDoctorAutoSuggestion(inputID) {

	var resultData = [];
	var doctorName = $("input#" + inputID).val();
//	if (doctorName == "" || doctorName == null || doctorName == "null"
//			|| doctorName == undefined) {
//		alert("Please enter search value");
//		$("input#" + inputID).focus();
//		setExistingDoctorTemp();
//		return false;
//	}
	var inputs = [];
	var unitId = $("#unitId").val();
	inputs.push('doctorName=' + doctorName);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/channeldoctorautosuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.chann_docList.length; j++) {

				var arrValue = response.chann_docList[j].channDocId + "-"
						+ response.chann_docList[j].docName;
				var idValue = response.chann_docList[j].channDocId;
				var docName = response.chann_docList[j].docName;

				resultData.push({
					ID : idValue,
					Name : docName
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
					onSelect : displaySubInventorySearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	//below function to set the search value to search text feild and calling getPackingDetailsById function
	function displaySubInventorySearchResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var docName = res[1];
		getChannelDoctorMgmtById(id);
		$("#" + inputID).val(docName);
	}
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  getChannelDoctorMgmtById 
 ************/
function getChannelDoctorMgmtById(id) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('doctorId=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editchanneldoctormgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			setChannelDoctorTemplateAfterAuto(r);

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  setChannelDoctorTemplateAfterAuto
 ************/
function setChannelDoctorTemplateAfterAuto(response) {
	if (response.docName == null || response.docName == ""
			|| response.cdn == "null") {
		alert("Record Not Found");
		return false;
	}

	var htm = "";
	var index = 1;

	htm = htm
			+ '<tr> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.channDocId
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.prefix
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ response.docName
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ response.referFees
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess"  data-toggle="modal"  onclick=editChannelDoctorMgmt('
			+ response.channDocId
			+ ')><i class="fa fa-edit"></i></button></td>'

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteChannelDoctorMgmt('
			+ response.channDocId
			+ ')><i class="fa fa-trash-o"></i></button></td>'

			+ '</tr>';

	index++;

	$("#channeldoctorMgmtBody").html(htm);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  getchanelDoctorMgmtByIdOnClick
 ************/
function getchanelDoctorMgmtByIdOnClick() {
	var id = $("#channelID").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(id)) {
		alert("Please Enter  ID Only!");
		$("#channelID").focus();
		return false;
	}
	getChannelDoctorMgmtById(id);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  refershChannelDoctorMgmt
 ************/
function refershChannelDoctorMgmt() {
	$("#did").val(0);
	$("#dname").val("");
	$("#rfees").val("");
	$("#refDocPer").val("");
	$("#prefix").select2('val',0);
	$("#contact").val("");
	$("#address").val("");
	$("#mobile").val("");
	$("#email").val("");
	$("#spcl").val("");
	$("#hname").val("");

	document.getElementById('chkIpd').checked = true;

}

function defaultFetchPatientTitle(pagename) {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/getallpatienttitles",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "<option value='0'>select</option>";
	           
            for ( var i = 0; i < r.listPatientTitle.length; i++){             
	                divContent = divContent + "<option value='" + r.listPatientTitle[i].patientTitleID + "'  >"
	                        + r.listPatientTitle[i].patientTitle + "</option>";
            }
           
            $("#prefix").html(divContent);
            $("#prefix").select2();
           
		}		
	});
}