/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code This function is use to Refresh the payment.
 ******************************************************************************/
function refreshPayment() {

	$('#outSourcelabId').val('');
	$('#outSourcelabName').val('');
	$('#address').val('');
	$('#contactno').val('');
	$('#contactperson').val('');
	$('#emailId').val('');
	$('#panno').val('');
	$('#gstno').val('');
	getAlloutSourcelist();

}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code This function is use to save the payment.
 ******************************************************************************/

function saveOutSourceLab() {
	var outsourceId = $('#outSourcelabId').val();

	var outSourcelabName = $('#outSourcelabName').val();
	var address = $('#address').val();
	var contactno = $.trim($('#contactno').val());
	var contactperson= $('#contactperson').val();
	var emailId = $.trim($('#emailId').val());
	
	var panno = $('#panno').val();
	var gstno = $('#gstno').val();

	/*alert("labId" + outsourceId);*/
	if (outsourceId == "" || outsourceId == null || outsourceId == undefined) {
		outsourceId = 0;

	}

	if (outSourcelabName == "" || outSourcelabName == "undefined"
			|| outSourcelabName == null) {
		alert("Please Enter lab Name");
		$("#outSourcelabName").focus();
		return false;
	}

	if (address == "" || address == "undefined" || address == null) {
		address = 0;
	}

	/*if (contactno == "" || contactno == "undefined" || contactno == null) {
		alert("Please Enter Contact Number");
		$("#contactno").focus();
		return false;
	}*/

	if (contactperson == "" || contactperson == "undefined"
			|| contactperson == null) {

	}
/*
	if (emailId == "" || emailId == "undefined" || emailId == null) {

	}*/

	if (panno == "" || panno == "undefined" || panno == null) {
		alert("Please Enter Pan Number");
		$("#panno").focus();
		return false;
	}

	if (gstno == "" || gstno == "undefined" || gstno == null) {

	}
	if (contactno == "") {
		alert("Mobile Number must be Entered.");
		return false;
	} else if (contactno !="" && contactno.length !=10) {
		alert(" Only 10 Digit Mobile Number is Allowed.");
		return false;
	} else if (contactno != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactno)) {
			alert("Mobile Number should be of digits only!");
			$("#contactno").focus();
			return false;
		}
	}

	
	
	if (emailId != "") {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (emailId != "") {
			if (emailId.match(mailformat)) {
				// return true;
			} else {
				alert("You have entered an invalid email address!");
				return false;
			}
		}
	}
	
	var inputs = [];
	inputs.push('outSourcelabName=' + outSourcelabName);
	inputs.push('outsourceId=' + outsourceId);
	inputs.push('address=' + address);
	inputs.push('contactno=' + contactno);
	inputs.push('contactperson=' + contactperson);
	inputs.push('emailId=' + emailId);
	inputs.push('panno=' + panno);
	inputs.push('gstno=' + gstno);

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/OutSourceMasterController/save",
		data : str + "&reqType=AJAX",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			/* alertify.success(r); */
			var hideSaveUpdate = $("#hideSaveUpdate").val();
			if (hideSaveUpdate == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");
			}
			/*$("#outSourcelabId").val("0");*/
			getAlloutSourcelist();
			window.location.replace("outSourceTestMaster.jsp");
		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Fetching data
 ******************************************************************************/

function getAlloutSourcelist() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/OutSourceMasterController/fetchOutSourceList",

		success : function(r) {
			setTemplateForOutSourceMasterList(r);// call template
		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForOutSourceMasterList(r) {

	var optionList = "<option></option>";

	var masterModuleBody = '<thead class="cf" style="background: wheat;" id="ehatTHead">'
			+ '<tr>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">#</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">OutSource ID</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Lab Name</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Address</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Contact No</th>'
			+ '<th  class="col-md-1 center" style="display:none">Contact Person</th>'
			+ '<th class="col-md-1 center"style="display:none">Email ID</th>'
			+ '<th class="col-md-1 center"style="display:none">Pan NO</th>'
			+ '<th class="col-md-1 center"style="display:none">GST No</th>'

			+ '<th class="col-md-1 center">Edit</th>'
			+ '<th class="col-md-1 center">Delete</th>'
			+ '<th class="col-md-1 center"></th>' + '</tr></thead>';
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {
         // alert(r.listOutSourceMaster.length);
		masterModuleBody = masterModuleBody
				+

				'<tr>'
				+ '<td id="row'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (int + 1)
				+ '</td>'
				
				+ '<td id="outId'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '</td>'
				
				+ '<td id="outlabName'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.listOutSourceMaster[int].outSourcelabName)
				+ ' </td>'

				+ '<td id="address'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.listOutSourceMaster[int].address)
				+ ' </td>'

				+ '<td id="contactno'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.listOutSourceMaster[int].contactno)
				+ ' </td>'

				+ '<td id="contactperson'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].contactperson)
				+ ' </td>'
				
				+ '<td id="emailId'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].emailId)
				+ ' </td>'

				+ '<td id="panno'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].panno)
				+ ' </td>'

				+ '<td id="gstno'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].gstno)
				+ ' </td>'

				+ '<td  class="col-md-1 center" style="height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.listOutSourceMaster[int].outsourceId
				+ ' onclick="editOutSourcelab('
				+ r.listOutSourceMaster[int].outsourceId
				+ ')"><i class="fa fa-edit"></i></button></td>'

				+ '<td  class="col-md-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
				+ r.listOutSourceMaster[int].outsourceId
				+ ' onclick=deleteOutSourceLab('
				+ r.listOutSourceMaster[int].outsourceId
				+ ') > <i class="fa fa-trash-o"></i></button> </td>'

				/*
				 * + '<td class="col-md-1 center"><button class="btn btn-xs
				 * btn-success openUserAccess" value="OPEN" id=btnOpen10 ' +
				 * r.listOutSourceMaster[int].outsourceId + '
				 * onclick=openOutSourcePopup(' +
				 * r.listOutSourceMaster[int].outsourceId + ') > <i class="fa
				 * fa-check-o"></i></button> </td>'
				 */

				+ '</tr>';

		optionList = optionList + "<option value="
				+ r.listOutSourceMaster[int].outsourceId + ">"
				+ r.listOutSourceMaster[int].outSourcelabName + "</option>";
	}

	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code update master
 ******************************************************************************/

function editOutSourcelab(outsourceId) {
      openOutSourcePopup();
	// alert("EditMasterID"+outsourceId);
	 document.getElementById('outSourcelab').style.height= "600px";
	 document.getElementById('outSourcelab').style.width= "1200px";
	 document.getElementById('outSourcelab').style.left= "121px"; 

	$("#outSourceinhouse").show();
	$("#outSourceTest").show();
	$("#outSourceOuthouse").show();

	
	$('#outSourcelabId').val(outsourceId);
	$('#outSourcelabName').val($('#outlabName' + outsourceId).html());
	$('#address').val($('#address' + outsourceId).html());
	$('#contactno').val($('#contactno' + outsourceId).html());
	$('#contactperson').val($('#contactperson' + outsourceId).html());
	$('#emailId').val($('#emailId' + outsourceId).html());
	$('#panno').val($('#panno' + outsourceId).html());
	$('#gstno').val($('#gstno' + outsourceId).html());
	getAlloutSourceTestlist();
	getpercentagePrevious();
	
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Delete data from temp id
 ******************************************************************************/

function deleteOutSourceLab(outSourcelabId) {
	
	//alert(outSourcelabId);
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Out Source Lab Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/OutSourceMasterController/deleteOutSourceMaster",
			data : {
				"outSourcelabId" : outSourcelabId
			},
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				/* alertify.error(response); */
				alert("Record Deleted successfully..!");
				window.location.replace("outSourceTestMaster.jsp");
			}
		});
	}
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code This function use to auto complete filds
 ******************************************************************************/

function setAutoCompleteForPaymentMaster(inputId, callfrom) {

	// alert(callfrom);
	// var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	// var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/OutSourceMasterController/autoSuggestionOutSourceMasterNames",
				// timeout : 1000 * 60 * 15,
				cache : false,
				success : function(r) {
					// alert(r.listTemp[0].TempName);

					if (callfrom == "search") {

						setTemplateForOutSource(r);

					} else {

					}

				}
			});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 26_March_2019
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForOutSource(r) {

	var optionList = "<option></option>";

	var masterModuleBody = '<thead class="cf" style="background: wheat;" id="ehatTHead">'
			+ '<tr>'
			+ '<th class="col-md-1 center">#</th>'
			+ '<th class="col-md-1 center">OutSource ID</th>'
			+ '<th class="col-md-1 center">Lab Name</th>'
			+ '<th class="col-md-1 center">Address</th>'
			+ '<th class="col-md-1 center">Contact No</th>'
			+ '<th class="col-md-1 center"style="display:none">Email ID</th>'
			+ '<th class="col-md-1 center"style="display:none">Pan NO</th>'
			+ '<th class="col-md-1 center"style="display:none">GST No</th>'

			+ '<th class="col-md-1 center">Edit</th>'
			+ '<th class="col-md-1 center">Delete</th>' + '</tr></thead>';
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {

		masterModuleBody = masterModuleBody
				+

				'<tr>'
				+ '<td id="row'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center">'
				+ (int + 1)
				+ '</td>'
				+ '<td id="outId'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center">'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '</td>'
				+ '<td id="outsourceName'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center">'
				+ (r.listOutSourceMaster[int].outSourcelabName)
				+ ' </td>'

				+ '<td id="address'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center">'
				+ (r.listOutSourceMaster[int].address)
				+ ' </td>'

				+ '<td id="contactno'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center">'
				+ (r.listOutSourceMaster[int].contactno)
				+ ' </td>'

				+ '<td id="emailId'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].emailId)
				+ ' </td>'

				+ '<td id="panno'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].panno)
				+ ' </td>'

				+ '<td id="gstno'
				+ (r.listOutSourceMaster[int].outsourceId)
				+ '" class="col-md-1 center"style="display:none">'
				+ (r.listOutSourceMaster[int].gstno)
				+ ' </td>'

				+ '<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.listOutSourceMaster[int].outSourcelabId
				+ ' onclick="editOutSourcelab('
				+ r.listOutSourceMaster[int].outSourcelabId
				+ ')"><i class="fa fa-edit"></i></button></td>'

				+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
				+ r.listOutSourceMaster[int].outsourceId
				+ ' onclick=deletePayment('
				+ r.listOutSourceMaster[int].outsourceId
				+ ') > <i class="fa fa-trash-o"></i></button> </td>'

				+ '</tr>';

		optionList = optionList + "<option value="
				+ r.listOutSourceMaster[int].outsourceId + ">"
				+ r.listOutSourceMaster[int].outSourcelabName + "</option>";
	}

	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}
/*
 * function hideDispecedpopup1() { $("#closeDispecedpopup").hide(); }
 */

function openOutSourcePopup(outSourcelabId) {
	refreshPayment();
	 document.getElementById('outSourcelab').style.height= "200px";
	 document.getElementById('outSourcelab').style.height= "200px";
	 document.getElementById('outSourcelab').style.width= "1200px";
	 document.getElementById('outSourcelab').style.left= "110px";
	 document.getElementById('outSourcelab').style.right= "50px";
	 document.getElementById('outSourcelab').style.top= "70px";


	$("#outSourceinhouse").hide();
	$("#outSourceTest").hide();
	$("#outSourceOuthouse").hide();
	$("#outSourcelabpopup").modal('show');
	//refreshOutTest();
	
	/* window.open("InhouseAndOutHouseShare.jsp"); */
}
function onCloseBtnRefrshPage() {
	$("#outSourcelabpopup").hide();
	
}

function onCloseBtnRefrshPage1() {
	$("#outSourcelabpopup").hide();
	window.location.replace("labTestPatientDashboard.jsp");

}


function autoSuggestionForSubServiceName(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	var inputs = [];
	inputs.push('testname=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/OutSourceMasterController/fetchSubserviceTest",
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
				for ( var i = 0; i < ajaxResponse.lstSubService.length; i++) {
					availableTags.push(ajaxResponse.lstSubService[i].cn + "~"
							+ ajaxResponse.lstSubService[i].rate + "~"
							+ ajaxResponse.lstSubService[i].testid);
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
                //   alert(template);
				$("#div" + inputID + " .typeahead").html(template);

				if (typeauto != 'onload') {
					$("#div" + inputID + " .typeahead").show();
				}

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
		//alert(JSON.stringify(item));
		//alert(item.value);*/
		$('#' + inputID).val(item.text);
		var testChargesId = (item.value).split("~");
		
		$("#testcharges").val(testChargesId[0]);	
		$("#testId").val(testChargesId[1]);
       
	//	calculatepercentage();

	}

}

function calculatepercentage() {
/*	var inhouseId = $("#inhouseId").val();*/
	var testcharges = $("#testcharges").val();
	var percentage = $("#percentage").val();
/*	var a = Number(percentage) + Number(inhouseId);*/
	var calPer = (Number(testcharges) / Number(100)) * percentage;
	$("#amount").val(testcharges-calPer);
	if(Number(calPer)>Number(testcharges)){
		alert("Discount should not be greater than payable");
		$("#percentage").val(0);
		$("#amount").val(0);
	}else{
		
	}	
}


function calculateAmount(){
	
	var testcharges = $("#testcharges").val();
	   
    var amount = $("#amount").val();
    var testcharges1 = parseFloat(testcharges);
    var amount1 = parseFloat(amount);
    var temp;
    var tempDiv;
    var res;
    

	  if (amount != "") {
		if (testcharges1 >= amount1) {
			temp = testcharges1 - amount1;

			tempDiv = testcharges1 / 100;

			res = temp / tempDiv;
			$("#percentage").val(res);
		} else {
			alert("Discount should not be greater than payable");

			$("#percentage").val(0);
			$("#amount").val(0);
		}
	} else {
		$("#percentage").val(0);
	}
	    

    
}
/*
 * function calculateAmount() {
 * 
 * var testcharges = $("#testcharges").val();
 * 
 * var amount = $("#amount").val(); //var c=
 * Number(testcharges)/Number(amount)*100; var p=0; var per =
 * Number(testcharges)*Number(p)/100;
 * 
 * 
 * var percentage= (Number(testcharges)-Number(amount)/Number(testcharges)*100);
 * var final = percentage-100;
 * 
 * 
 * //percentage= Number(amount)/Number(testcharges)*100;
 * 
 * $("#percentage").val(final); if(Number(final)<Number(amount)){
 * alert("Discount should not be greater than payable");
 * $("#percentage").val(0); $("#amount").val(0); }
 * 
 * 
 * 
 * 
 * 
 * var inhouseId = $("#inhouseId").val(); var testcharges =
 * $("#testcharges").val(); var amount = $("#amount").val(); var
 * a=Number(testcharges)*Number(inhouseId)/100;
 * 
 * var b=Number(testcharges)-Number(a)-Number(amount);
 * 
 * 
 * var a=Number(amount) - Number(inhouseId); //var increase =
 * Number(a)/Number(testcharges)*100; var
 * increase1=Number(b)*100/Number(testcharges); var calamount=
 * (Number(testcharges) * Number(a)) / 100; $("#percentage").val(increase1);
 * if(Number(increase1)<Number(amount)){ alert("Discount should not be greater
 * than payable"); $("#percentage").val(0); $("#amount").val(0); }else{
 *  }
 *  }
 */
function saveOutTestLab() {
	
	
	var outsourceslaveId =$('#outsourceslaveId').val();
	var outsourcemasterid = $('#outSourcelabId').val();
	var testName = $('#testName').val();
	var testId = $('#testId').val();
	var testcharges = $('#testcharges').val();
	var percentage =  $('#percentage').val();
	var amount = $('#amount').val();
	var outSourceRate = $('#outSourceRate').val();
	

	
	
	if (testName == "" || testName == "undefined" || testName == null) {
		alert("Please Enter lab Name");
		$("#testname").focus();
		return false;
	}
	
	

	if (outsourceslaveId == "" || outsourceslaveId == "undefined" || outsourceslaveId == null) {
	
	}


	if (outsourcemasterid == "" || outsourcemasterid == "undefined" || outsourcemasterid == null) {
	
	}

	if (testcharges == "" || testcharges == "undefined" || testcharges == null) {
		testcharges = 0;
	}
	
	if (percentage == "" || percentage == "undefined" || percentage == null) {
		percentage = 0;
	}

	if (amount == "" || amount == "undefined" || amount == null) {

	}

	var inputs = [];
	inputs.push('outsourceslaveId=' + outsourceslaveId);
	inputs.push('outmasterid=' + outsourcemasterid);
	inputs.push('testName=' + testName);
    inputs.push('testcharges=' + testcharges);
	inputs.push('testId=' + testId);
	inputs.push('outtestpercentage=' + percentage);
	inputs.push('amount=' + amount);
	inputs.push('outSourceRate=' + outSourceRate);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/OutSourceMasterController/saveTestlab",
		data : str + "&reqType=AJAX",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
/*			alertify.success(r);*/
			var outsourceslaveId1 = $("#outsourceslaveId").val();
			if (outsourceslaveId1 == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");

			}
			$("#outsourceslaveId").val("0");
		getAlloutSourceTestlist();
		refreshOutTest();

		}
	});
}


function getAlloutSourceTestlist() {

	
	
	var outsourcemasterid = $('#outSourcelabId').val();

	if (outsourcemasterid == "" || outsourcemasterid == null || outsourcemasterid == undefined) {
		outsourcemasterid = 0;
	}

			var inputs = [];
		
			inputs.push('outsourcemasterid=' + encodeURIComponent(outsourcemasterid));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/OutSourceMasterController/fetchOutTestSourceList",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					setTemplateForOutSourceSlaveMasterTestList(r);
				}
			});

		}

function setTemplateForOutSourceSlaveMasterTestList(r) {

	var optionList = "<option></option>";

	var masterModuleBody = '<thead class="cf" style="background: wheat;" id="ehatTHead">'
			+ '<tr>'
			+ '<th class="col-md-1 center">#</th>'
			+ '<th class="col-md-1 center">ID</th>'
			+ '<th class="col-md-1 center">Test Name</th>'
			+ '<th class="col-md-1 center">MRP</th>'
			+ '<th class="col-md-1 center">Percentage</th>'
			+ '<th class="col-md-1 center">Amount</th>'
			+ '<th class="col-md-1 center">OutSource Lab MRP</th>'
		
			+ '<th class="col-md-1 center">Edit</th>'
			+ '<th class="col-md-1 center">Delete</th>'
			+ '<th class="col-md-1 center"></th>' + '</tr></thead>';
	for ( var int = 0; int < r.outSourceMasterSlaveList.length; int++) {

		masterModuleBody = masterModuleBody
				+

				'<tr>'
				+ '<td id="row'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (int + 1)
				+ '</td>'
				+ '<td id="outslaveId'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '</td>'
				+ '<td id="outTestName'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (r.outSourceMasterSlaveList[int].testName)
				+ ' </td>'

				+ '<td id="Testmrp'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (r.outSourceMasterSlaveList[int].testcharges)
				+ ' </td>'

				+ '<td id="outpercentage'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (r.outSourceMasterSlaveList[int].outtestpercentage)
				+ ' </td>'

				+ '<td id="outamount'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (r.outSourceMasterSlaveList[int].amount)
				+ ' </td>'
				
				+ '<td id="outSourceRate'
				+ (r.outSourceMasterSlaveList[int].outSalveId)
				+ '" class="col-md-1 center">'
				+ (r.outSourceMasterSlaveList[int].outSourceRate)
				+ ' </td>'
				
				
				
				+ '<td class="col-md-1 center" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.outSourceMasterSlaveList[int].outSalveId
				+ ' onclick="editOutSourceTest('
				+ r.outSourceMasterSlaveList[int].outSalveId
				+ ')"><i class="fa fa-edit"></i></button></td>'
				
				
			    + '<td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
				+ r.outSourceMasterSlaveList[int].outSalveId
				+ ' onclick=deleteOutTestSourceLab('
				+ r.outSourceMasterSlaveList[int].outSalveId
				+ ') > <i class="fa fa-trash-o"></i></button> </td>'

				

				+ '</tr>';

		optionList = optionList + "<option value="
				+ r.outSourceMasterSlaveList[int].outSalveId + ">"
				+ r.outSourceMasterSlaveList[int].testName + "</option>";
	}

	$("#masterModuleBodyNarr1").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}
/*function checktestname(id) {
	alert(id);
	var patientId = $("#testId").val();
	if (pid != patientId && patientId != 0) {
		alertify.error("Please Select Same Patient");
		$("#" + id + "").prop("checked", false);
		$("#patientId").val(patientId);
		return false;
	} else {
		$("#patientId").val(pid);
	}

}*/


function refreshOutTest() {

	$('#outsourceslaveId').val(0);
	//$('#testName').val();
	//$('#testcharges').val(0);
	$('#percentage').val(0);
	$('#amount').val(0);
	$('#outSourceRate').val(0);
	

}

function editOutSourceTest(outsourceslaveId) {
    $('#outsourceslaveId').val(outsourceslaveId);
	$('#testName').val($('#outTestName' + outsourceslaveId).html());
	$('#testcharges').val($('#Testmrp' + outsourceslaveId).html());
	$('#percentage').val($('#outpercentage' + outsourceslaveId).html());
	$('#amount').val($('#outamount' + outsourceslaveId).html());
	$('#outSourceRate').val($('#outSourceRate' + outsourceslaveId).html());
	/*refreshOutTest();*/
	
}


function deleteOutTestSourceLab(outsourceslaveId) {
	

	if (outsourceslaveId == "" || outsourceslaveId == null || outsourceslaveId == undefined) {
		outsourceslaveId = 0;
	}
	var r = confirm("Are You Sure You Want To Delete Out Source Lab Master?");
	if (r == true) {
	
	var inputs = [];
	
	inputs.push('outsourceslaveId=' + encodeURIComponent(outsourceslaveId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/OutSourceMasterController/deleteOutSourceTestMasterslave",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			getAlloutSourceTestlist(r) ;
		
			
		

		}
	});
	
	
}
}

function adding()
{   
	  var inhouseId = $("#outtestInhousepercentage").val();  
	  var outhouseID = $("#outtestOuthousepercentage").val();
	  
	  if(Number(inhouseId)>Number(outhouseID)){
			var r = confirm("InHouse share should not be greater than"+$("#divouthouseId").val());
			if (r == true) {
				 $("#outtestInhousepercentage").val(0);
	        	 return false;
			}else{
				 $("#outtestInhousepercentage").val(0);
				}
			    
		}	
	  
	  
	  
	  
}

function subtract()
{   
	  var inhouseId = $("#outtestInhousepercentage").val();
	  var testcharges = $("#divouthouseId").val();
	  var newNumber = Number(testcharges)-Number(inhouseId);
	  $("#outtestOuthousepercentage").val(newNumber);

	  
}


function autoSuggestionName(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	var inputs = [];
	inputs.push('testname=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/OutSourceMasterController/fetchSubTest",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {

		var availableTags = [];
		if (r.length == 50) {
			alert("NO MATCHING FOUND");

		} else {
			ajaxResponse = r;
			for ( var i = 0; i < ajaxResponse.listout.length; i++) {
				
				availableTags.push(ajaxResponse.listout[i].id + "-"
						+ ajaxResponse.listout[i].name);
			}

			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("-");
				var idValue = (arrValue[1]);
				resultData.push({
					ID : idValue,
					Name : arrValue[0]
				});

				template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue[0]
				+ '</a></li>';
	

			}
			$("#idtest").val(idValue);
			$("#" + inputID ).html(template);
			$("#" + inputID ).show();
			setTimeout(function() {
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
	}
});

function displayResult(item) {
  
$('#' + inputID).val(item.text);
$("#hiddenSubServiceId").val(item.value);
	

}

}

function getOutsourceWise(){
	var callfrom="N";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/OutSourceMasterController/getOutSourcelablist",
		success : function(r) {
			setTemplate(r);
		}
	});
}

function setTemplate(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {
		list=list+'<option value="'+(r.listOutSourceMaster[int].outsourceId)+'">'+(r.listOutSourceMaster[int].outSourcelabName)+'</option>';		
	}	
	$("#labCenterID").html(list);
	$("#outsourcelabId").html(list);
}
//added by ajay :4-5-2019 fetch lab name
function getLabNameforTest(){
	var callfrom="N";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/OutSourceMasterController/getOutSourcelablist",
		success : function(r) {
		
			setTemplatelabname1(r);
		}
	});
}
function setTemplatelabname1(r){
	//alert("Hiii");
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {
		list=list+'<option value="'+(r.listOutSourceMaster[int].outsourceId)+'">'+(r.listOutSourceMaster[int].outSourcelabName)+'</option>';
		
	}	
	$("#labId").html(list);
	//$("#hiddenSubServiceId").html(outsourceId);
	
	
	
}
//added by ajay :4-5-2019 fetch group  name
function getGroupNameforTest(groupname){
	
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"groupname" : groupname
		},
		url		: "ehat/OutSourceMasterController/getGroupNameforTest",
		success : function(r) {
			setTemplateGroupName(r);
		}
	});
}


function setTemplateGroupName(r){
	
	var list="<option value='0'>-select-</option>";
	for ( var int = 0; int < r.groupList.length; int++) {
		list=list+'<option value="'+(r.groupList[int].subId)+'">'+(r.groupList[int].categoryName)+'</option>';
		
	}	
	$("#groupId").html(list);
	//$("#hiddenSubServiceId").html(outsourceId);
	
}
//added by ajay :4-5-2019 fetch test  name
function getTestNameforTest(testname){
	
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"testname" : testname
		},
		url		: "ehat/OutSourceMasterController/getTestNameforTest",
		success : function(r) {
			setTemplateTestName(r);
		}
	});
}


function setTemplateTestName(r){
	
	var list="<option value='0'>-select-</option>";
	for ( var int = 0; int < r.testList.length; int++) {
		list=list+'<option value="'+(r.testList[int].subId)+'">'+(r.testList[int].categoryName)+'</option>';
		
	}	
	$("#testId").html(list);
	//$("#hiddenSubServiceId").html(outsourceId);
	
}


//added by ajay :6-5-2019 labname select and get group name 
function setLabforTestNameTest()
{
	var labId = $('#labId').val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"labId" : labId
		},
		url : "ehat/OutSourceMasterController/setLabforTestNameTest",
		success : function(r) {
			setTemp(r);
		}
	});

}



function setTemp(r){
	
	var list="<option value='0'>-select-</option>";
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {
		list=list+'<option value="'+(r.listOutSourceMaster[int].groupId)+'">'+(r.listOutSourceMaster[int].groupName)+'</option>';
		
	}	
	$("#groupId").html(list);
	//$("#hiddenSubServiceId").html(outsourceId);
	
}


//added by ajay :6-5-2019 group name select and get test name 
function setGroupforTestNameTest()
{ 
	var labId = $('#labId').val();
	var groupId = $('#groupId').val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"labId" : labId,
			"groupId" : groupId
		},
		url : "ehat/OutSourceMasterController/setgroupforTestNameTest",
		success : function(r) {
			setTempGroupName(r);
		}
	});

}

function setTempGroupName(r){
	
	var list="<option value='0'>-select-</option>";
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {
		list=list+'<option value="'+(r.listOutSourceMaster[int].groupTestId)+'">'+(r.listOutSourceMaster[int].groupNameTest)+'</option>';
		
	}	
	$("#testId").html(list);
	//$("#hiddenSubServiceId").html(outsourceId);
	
}
//added by Ajay:06-05-2019 get OutsourceSummery Report
function getOutSourceSummeryReport() {

	var labId = $('#labId').val();
	var groupId = $('#groupId').val();
	var testId = $("#testId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();

	if (labId == "" || labId == undefined) {
		labId = 0;
	}
	if (groupId == "" || groupId == undefined) {
		groupId = 1;
	}
	if (testId == "" || testId == undefined) {
		testId = 0;
	}
	
	if (fromDate == "" || fromDate == "undefined" || fromDate == null) {
		alert("Please Select From Date ");
		$("#fromDate").focus();
		return false;
	}
	
	
	if (toDate == "" || toDate == "undefined" || toDate == null) {
		alert("Please Select To Date ");
		$("#toDate").focus();
		return false;
	}

/*	alert("hi...");*/
	var inputs = [];
	inputs.push("labId=" + labId);
	inputs.push("groupId=" + groupId);
	inputs.push("testId=" + testId);
	inputs.push("fromDate=" + fromDate);
	inputs.push("toDate=" + toDate);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/OutSourceMasterController/getOutSourceSummeryReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					// alert(r.listBillDetails.length);
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Test Name"
							+ "</th><th class='col-md-1'>Test Count"
							+ "</th><th class='col-md-1'>Lab Name"
							+ "</th><th class='col-md-1'>OutSource Amount"
							+ "</th><th class='col-md-1'>MRP"
							+ "</th><th class='col-md-1'>OutSource Lab MRP"
							+ "</th><th class='col-md-1'>Difference"
							+ "</th></tr>";

					if (r.listOutSourceMaster.length == 0 || r.listOutSourceMaster.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listOutSourceMaster.length; i++) {

							 var specName = r.listOutSourceMaster[i].outsource_mrp;;
								var mrp;
								if(specName == '' || specName ==undefined ||  specName == null)
									{
									mrp = '-';
									}
								else
									{
									mrp = specName;
									}
							
							
							htmBody = htmBody + "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].testname
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].Test_count.toFixed(2)
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].outSource_lab_name
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].Amount.toFixed(2)
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].MRP.toFixed(2)
									+ "</td><td class='col-md-1'>"
									+  mrp
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].diff.toFixed(2)
									+ "</td></tr>";
						}
					}
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}


//added by Ajay:07-05-2019 get Outsource Detailed  Report
function getOutSourceDetailedReport() {

	var labId = $('#labId').val();
	var groupId = $('#groupId').val();
	var testId = $("#testId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();

	if (labId == "" || labId == undefined) {
		labId = 0;
	}
	if (groupId == "" || groupId == undefined) {
		groupId = 1;
	}
	if (testId == "" || testId == undefined) {
		testId = 0;
	}

	
	if (fromDate == "" || fromDate == "undefined" || fromDate == null) {
		alert("Please Enter from Date ");
		$("#fromDate").focus();
		return false;
	}
	
	
	if (toDate == "" || toDate == "undefined" || toDate == null) {
		alert("Please Enter from To ");
		$("#toDate").focus();
		return false;
	}
	var inputs = [];
	inputs.push("labId=" + labId);
	inputs.push("groupId=" + groupId);
	inputs.push("testId=" + testId);
	inputs.push("fromDate=" + fromDate);
	inputs.push("toDate=" + toDate);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/OutSourceMasterController/getOutSourceDetailedReport",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					// alert(r.listBillDetails.length);
					var htmHead = "";
					var htmBody = "";
					htmHead = htmHead
							+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
							+ "</th><th class='col-md-1'>Patient Name"
							+ "</th><th class='col-md-1'>Collect Date"
							+ "</th><th class='col-md-1'>Collection Time"
							+ "</th><th class='col-md-1'>Test Name"
							+ "</th><th class='col-md-1'>Test Count"
							+ "</th><th class='col-md-1'>Group Name"
							+ "</th><th class='col-md-1'>Lab Name"
							+ "</th><th class='col-md-1'>OutSource Amount"
							+ "</th><th class='col-md-1'>MRP"
							+ "</th><th class='col-md-1'>OutSource Lab MRP"
							+ "</th><th class='col-md-1'>Difference"
							+ "</th></tr>";

					if (r.listOutSourceMaster.length == 0 || r.listOutSourceMaster.length == null) {
						// no records.
						htmBody = htmBody
								+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
					} else {

						for ( var i = 0; i < r.listOutSourceMaster.length; i++) {
							var specName = r.listOutSourceMaster[i].outsource_mrp;;
							var mrp;
							if(specName == '' || specName ==undefined ||  specName == null)
								{
								mrp = '-';
								}
							else
								{
								mrp = specName;
								}
						
							htmBody = htmBody + "<tr style='height:21px;'>"
									+ "<td class='col-md-1'>" + (i + 1)
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].patient_name
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].dispatch_Date
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].dispatch_Time
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].testname
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].Test_count
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].groupname
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].outSource_lab_name
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].Amount.toFixed(2)
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].MRP.toFixed(2)
									+ "</td><td class='col-md-1'>"
									+ mrp
									+ "</td><td class='col-md-1'>"
									+ r.listOutSourceMaster[i].diff.toFixed(2)
									+ "</td></tr>";
						}
					}
					$("#tableTestVoucherListHead").html(htmHead);
					$("#tableTestVoucherList").html(htmBody);
				}
			});
}




function saveInhousePercentage() {
    
	var outSalveId =$('#outSalveId').val();
	var outmasterid = $('#outSourcelabId').val();
	var outtestInhousepercentage = $('#outtestInhousepercentage').val();
	var outtestOuthousepercentage = $('#outtestOuthousepercentage').val();

	var inputs = [];
	inputs.push('outSalveId=' + outSalveId);
	inputs.push('outmasterid=' + outmasterid);
	inputs.push('outtestInhousepercentage=' + outtestInhousepercentage);
    inputs.push('outtestOuthousepercentage=' + outtestOuthousepercentage);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/OutSourceMasterController/saveOutLabInhouse",
		data : str + "&reqType=AJAX",
	
		error : function() {
			alert('error');
		},
		success : function(r) {
	/*	alertify.success(r);
		alert("Record Updated successfully..!");*/
			var outsourceslaveId1 = $("#outSalveId").val();
			if (outsourceslaveId1 == "Update") {
				alert("Record Updated successfully..!");
			} else {
				alert("Record saved successfully..!");

			}
			$("#outsourceslaveId").val("0");
		/*getAlloutSourceTestlist();
		refreshOutTest();*/

		}
	});
}
/*
----------------------------------------------Added by Ajay:4-06-2019  set lab name auto complete outsource --------------------------------------------------------------

function setAutoCompleteForOutSourcelabName(inputId, callfrom) {

	// alert(callfrom);
	// var usertype = "";
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}
	// var findingName = $("#" + inputId).val();

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/OutSourceMasterController/autoSuggestionOutSourceMasterNames",
				// timeout : 1000 * 60 * 15,
				cache : false,
				success : function(r) {
					if (r.listOutSourceMaster.length > 0) {

						$("#patientcontainerOutSource").setTemplate(
								patientcontainerOutSourcelabname);
						$("#patientcontainerOutSource").processTemplate(r);

					}
				}
			});
}*/
//added by ajay :6-5-2019  select lab name 
function getOutsourceWiselabname(){
	var callfrom="N";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/OutSourceMasterController/getOutSourcelablist",
		success : function(r) {
			
			setTemplatelabname(r);
		}
	});
}

function setTemplatelabname(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listOutSourceMaster.length; int++) {
		list=list+'<option value="'+(r.listOutSourceMaster[int].outsourceId)+'">'+(r.listOutSourceMaster[int].outSourcelabName)+'</option>';
		
	}	
	$("#outmasterid").html(list);
	$("#outsourcemasterid").html(list);
	//$("#hiddenSubServiceId").html(outsourceId);
	
	
	
}

   //added by ajay :6-5-2019  select lab name wise get data
  function getOutLabSearch()
{ 
		var outmasterid = $('#outmasterid').val();
		
		jQuery.ajax({
			async : false,
			type : "GET",
			data : {
				"outmasterid" : outmasterid,
			},
			url : "ehat/OutSourceMasterController/LabOutsourceList",
			success : function(r) {
				if (r.listlaboutSource.length > 0) {

					$("#patientcontainerOutSource").setTemplate(
							patientcontainerOutSource);
					$("#patientcontainerOutSource").processTemplate(r);

				}
			}
		});

	}

  
  
  
  function getpercentagePrevious() {

		
		
		var outsourcemasterid = $('#outSourcelabId').val();

		if (outsourcemasterid == "" || outsourcemasterid == null || outsourcemasterid == undefined) {
			outsourcemasterid = 0;
		}

				var inputs = [];
			
				inputs.push('outsourcemasterid=' + encodeURIComponent(outsourcemasterid));
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/OutSourceMasterController/getpercentagePrevious",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert('Network Issue!');
					},
					success : function(r) {
						
						//ajaxResponse = r;
						//pobj1 = eval('(' + ajaxResponse + ')');

						if (r.outSourceMasterSlaveList.length > 0) {
							
						
							$('#outtestInhousepercentage').val(r.outSourceMasterSlaveList[0].outtestInhousepercentage);
							$('#outtestOuthousepercentage').val(r.outSourceMasterSlaveList[0].outtestOuthousepercentage);
						//	$('#outtestInhousepercentage').val(pobj1.outSourceMasterSlaveList[0].outtestInhousepercentage);
					
							
						}
						
						
					}
					
				});

			}
  /*********************************************************
   * @author Ajay Khandare
   * @since 10-03-2020
   * @comment for validate current date to previous date
  **********************************************************/	
  function validateDateOutSourceTest()
  {
  	var date = new Date();
  	var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
  	
  	var arrSceduleDate = ($("#dispatchDate").val()).split("/");	
  	var selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]	+ "/" + arrSceduleDate[2]);
  	if ((selectedDate < now)) {
  		alert('OutSource Test not availables for previous date,please select another date');
           $("#dispatchDate").val("");
  		return false;
  	} 
  }
 /* function setpercentagePrevious(r) {


			
			var list="<option value='0'>-select-</option>";
			
			for ( var int = 0; int < r.outSourceMasterSlaveList.length; int++) {
				list=list+'<option value="'+(r.outSourceMasterSlaveList[int].outsourceId)+'">'+(r.outSourceMasterSlaveList[int].outSourcelabName)+'</option>';
				
			}	
			$("#outtestInhousepercentage").html(list);
			//$("#hiddenSubServiceId").html(outsourceId);
			
			
			
		
	}
*/