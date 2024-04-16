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
function saveHospitaldetails() {
	
	var name = $("#hosname").val().trim();
	var contct =$("#contactno").val().trim();
	if (name == "") {
		alert("Hospital Name is Mandatory");
		SetFocus("hosname");
		return false;
	}
	if (contct == "") {
		alert("Contact Number is Mandatory");
		SetFocus("contactno");
		return false;
	}
	var contctFormt = /^([0-9])*$/;
	if (!contctFormt.test(contct)) {
		alert("Contact Number should be of digits!");
		SetFocus("contactno");
		return false;
	}

	var website = $("#webadd").val();
	var siteformat = /^\w+([\.]?\w+)*(\.\w{2,3})+$/;
	if (website != "") {
		if (website.match(siteformat)) {
		} else {
			alert("You have entered an invalid website address!");
			SetFocus("webadd");
			return false;
		}
	}

	var inputText = $("#emailid").val();

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
		} else {
			alert("You have entered an invalid email address!");
			SetFocus("emailid");
			return false;
		}
	}

	var hosid = $("#hosid").val();
	var hosname = $("#hosname").val();
	var contactno = $("#contactno").val();
	var webadd = $("#webadd").val();
	var emailid = $("#emailid").val();
	var hosadd = $("#hosadd").val();
	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();

	var inputs = [];
	inputs.push('hosId=' + hosid);
	inputs.push('Hos_name=' + hosname);
	inputs.push('contact_no=' + contactno);
	inputs.push('website_add=' + webadd);
	inputs.push('email_id=' + emailid);
	inputs.push('address=' + hosadd);
	
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/savehospitaldetails",
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
			} else if (response == 3) {
				alertify.error("Hospital Name Already Present..!");
			}  
			else {
				alertify.error("Network Issue");
			}
			setExistingHospitalTemp();
			refershChannelHospitalMgmt();

		}
	});

}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : setExistingHospitalTemp()
 ******************************************************************************/
function setExistingHospitalTemp() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/setexistinghospitaltemp",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			
			setchannelhospitalMgmtTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : setchannelhospitalMgmtTemplate()
 ******************************************************************************/

function setchannelhospitalMgmtTemplate(response) {
	

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.hospitalDetailsDTOList.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.hospitalDetailsDTOList[i].hosId
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.hospitalDetailsDTOList[i].hos_name
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ response.hospitalDetailsDTOList[i].contact_no
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ response.hospitalDetailsDTOList[i].email_id
				+ '</td>'
				

				+ ' <td class="col-md-1 center">'
				+ response.hospitalDetailsDTOList[i].website_add
				+ '</td>'
				

				+ ' <td class="col-md-1 center">'
				+ response.hospitalDetailsDTOList[i].address
				+ '</td>'
				

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editChannelHospitalMgmt('
				+ response.hospitalDetailsDTOList[i].hosId
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteChannelHospitalMgmt('
				+ response.hospitalDetailsDTOList[i].hosId
				+ ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#channelhospitalMgmtBody").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : editChannelHospitalMgmt()
 ******************************************************************************/
function editChannelHospitalMgmt(hosId) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('hosId=' + hosId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editchannelhospitalmgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

		 $("#hosid").val(r.hosId);
			 $("#hosname").val(r.hos_name);
			 $("#contactno").val(r.contact_no);
			 $("#webadd").val(r.website_add);
			 $("#emailid").val(r.email_id);
			$("#hosadd").val(r.address);
			
			toggleEntryDiv('divForEntry');
	

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-jan-2020
 * @codeFor	: deleteChannelDoctorMgmt
 ************/

function deleteChannelHospitalMgmt(id) {

	var r = confirm("Are You Sure You Want To Delete Channel Hospital  Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/admin/deletechannelhospitalmgmt",
			data : {
				"hosId" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);

				setExistingHospitalTemp();
			}
		});
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : channelHospitalAutoSuggestion()
 ******************************************************************************/

function channelHospitalAutoSuggestion(inputID) {

	var resultData = [];
	var hospitalName = $("input#" + inputID).val();
	if (hospitalName == "" || hospitalName == null || hospitalName == "null"
			|| hospitalName == undefined) {
		alert("Please enter search value");
		$("input#" + inputID).focus();
		setExistingHospitalTemp();
		return false;
	}
	var inputs = [];
	var unitId = $("#unitId").val();
	inputs.push('hospitalName=' + hospitalName);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/channelhospitalautosuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.hospitalDetailsDTOList.length; j++) {

				var arrValue = response.hospitalDetailsDTOList[j].hosId + "-"
						+ response.hospitalDetailsDTOList[j].hos_name;
				var idValue = response.hospitalDetailsDTOList[j].hosId;
				var hospital_name = response.hospitalDetailsDTOList[j].hos_name;

				resultData.push({
					ID : idValue,
					Name : hospital_name
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
		var hospital_name = res[1];
		getChannelHospitalMgmtById(id);
		$("#" + inputID).val(hospital_name);
	}
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  getChannelHospitalMgmtById 
 ************/
function getChannelHospitalMgmtById(id) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('hosId=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editchannelhospitalmgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			setChannelHospitalTemplateAfterAuto(r);

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  setChannelHospitalTemplateAfterAuto
 ************/
function setChannelHospitalTemplateAfterAuto(response) {
	if (response.hos_name == null || response.hos_name == ""
			|| response.hos_name == "null") {
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
			+ response.hosId
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.hos_name
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ response.contact_no
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ response.email_id
			+ '</td>'
			
			+ ' <td class="col-md-1 center">'
			+ response.website_add
			+ '</td>'
			
			+ ' <td class="col-md-1 center">'
			+ response.address
			+ '</td>'


			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editChannelHospitalMgmt('
			+ response.hosId
			+ ')><i class="fa fa-edit"></i></button></td>'

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteChannelHospitalMgmt('
			+ response.hosId
			+ ')><i class="fa fa-trash-o"></i></button></td>'

			+ '</tr>';

	index++;

	$("#channelhospitalMgmtBody").html(htm);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  getchanelHospitalrMgmtByIdOnClick
 ************/
function getchanelHospitalrMgmtByIdOnClick() {
	var id = $("#channelID").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(id)) {
		alert("Please Enter  ID Only!");
		$("#channelID").focus();
		return false;
	}
	getChannelHospitalMgmtById(id);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  refershChannelHospitalMgmt
 ************/
function refershChannelHospitalMgmt() {
	$("#hosid").val(0);
	 $("#hosname").val("");
	 $("#contactno").val("");
	 $("#webadd").val("");
	 $("#emailid").val("");
	$("#hosadd").val("");
	


}