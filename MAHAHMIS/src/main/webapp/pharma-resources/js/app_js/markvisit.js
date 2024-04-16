
 /***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: fetching all patient details from markvisit view
 **********/ 

function fetchVisitingPatient1() {
	// alert("hi");
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
 		url 	: "ehat/markvisit/getMarkVisitList",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
  			 setTempMarkVisit(r);
  			  
		}
	});
}
 
/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: setting  details on tempelate
 **********/ 
function setTempMarkVisit(r) {
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Edit</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bill History</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Delete</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Mark Visit</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Print Card</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Common Advance</div></th>"
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
var index = 1;	
var Mrn= 1010101111;
for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
	var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
	 
	var a="";
	var edit1="";
	
	if(r.lstRegviewDto[i].tFlag=="Y"){				//setting dynamic td on ui
		 
		    a=a+" class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button class='btn btn-xs btn-primary editUserAccess' data-target='' data-toggle='modal' value='MARK'  ><i class='fa fa-times'></i></button>"
 		  
	}if(r.lstRegviewDto[i].tFlag=="N")				//setting dynamic td on ui
		{
 		a=a+"class='col-sm-1-1 center'><button data-toggle='modal' data-target='#ICDCodePopUp' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"mark\")' value='MARK' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-check'></i></button>"
 		}
	if(r.lstRegviewDto[i].sponsorchargesSlaveId=="" ||r.lstRegviewDto[i].sponsorchargesSlaveId==null || r.lstRegviewDto[i].sponsorchargesSlaveId==undefined ||r.lstRegviewDto[i].sponsorchargesSlaveId==0){
  		edit1=edit1+"class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' id='btnEdit' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"edit\")'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		
 	}else{
  		edit1=edit1+"class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' id='btnEdit' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"edit\"),updateChargesMasterSlave("+r.lstRegviewDto[i].sponsorchargesSlaveId+"),fetchSuperCatogoiresSlave("+r.lstRegviewDto[i].sponsorchargesSlaveId+")'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
 	}
		
		htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstRegviewDto[i].fName+" "+r.lstRegviewDto[i].mName+" "+r.lstRegviewDto[i].lName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.lstRegviewDto[i].ptId+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"view\")'  id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>"	
		+ "</td>"
		+ "<td "+edit1+"</td>"
		
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-info' onclick='viewBillHistory("+ r.lstRegviewDto[i].ptId+")'>"
		+ "<i class='fa fa-file-text-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete' disabled = 'disabled' onclick='deletePatient("+ r.lstRegviewDto[i].ptId+","+ r.lstRegviewDto[i].ttId+")'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td "+a+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='Print'  value='PRINT' onclick='PrintCardFunction("+ r.lstRegviewDto[i].ptId+")'><i class='fa fa-print' class='edit'></button>"
		+ "</td>" 
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-primary' value='COMMONAD' onclick='printCard("+ r.lstRegviewDto[i].ptId+")'><i class='fa fa-print' class='edit'></button>"
		+ "</td>"
		+ "</tr>" + "</tbody>" + "</table>" + "</div>";
 index++;
Mrn++;
}

$("#container").html(htm);
$("#allPatInfo").html(r);
//$("#ehatTable").html(htm);
}
 
/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: get details based on patient id  
 **********/ 
function setVisitingPatientDetails1(pi,callFrom) {
 	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		 "ptid" : pi,
 			},
		url 	: "ehat/markvisit/getPatientDetails",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			console.log(r);
  			setRegDetails(r,callFrom);
 	}
	});
}
 
/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: to get doctor name from db
 **********/ 
function getDoctorname(drid) {
	//alert("hi");
	var strVale = drid;
	
	var strArr = strVale.split(',');
	for(var i=0; i<strArr.length; i++) 
	{ strArr[i] = parseInt(strArr[i], 10);
	
	drid=strArr[i];}
	
	//alert(drid);
	
	
	var docName="";
 	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		 "drid" : drid,
 			},
		url 	: "ehat/markvisit/getDoctorName",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
 		},
		success : function(r) {
			ajaxResponse = r;
			//$('#doctorId').val(r.lstDoctorDto[0].doc_name);
			
			
			$("#dynamicItem2").select2(r.lstDoctorDto[0].doc_name);
			
			//$("#dynamicItem2").html(r.lstDoctorDto[0].doc_name);
			
			//alert(r.lstDoctorDto[0].doc_name);
			
			/* 
 			var docTemp="";
			docTemp=docTemp		
			+ '<li class="select2-search-choice">' 
			+ '<div>'+docName+'</div>'
			+ '<a tabindex="-1"class="select2-search-choice-close" onclick="return false;" href="#"></a>'
			+ '</li>';
			
			$(".select2-choices").append(docTemp);		*/
		}
	});
	return docName;
}

function getUserNameByUserid(userid,callfrom){
	//alert("hi");
		var inputs = [];
		inputs.push('userid=' + userid);
		var str = inputs.join('&');
		
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/getUserNameByUserid",
		success : function(r) {
			 console.log(r);
 			 $("#createdBy").text(r);
 			 if(callfrom=="edit"){
				 $("#editedBy").text(r);
 			 }
  		},
		error :function(r){
			alert("Network Issue!");
			console.log(r);
		}
	});

	}

/***********
 * @author	: Sagar Kadam
 * @date	: 9-jun-2017
 * @reason	: setting  details on tempelate to show on reg ui
 **********/ 
function setRegDetails(r,clfrom) {
 	$('#e1').select2('val', r.lstMarkVisit[0].unitId);
 	$('#prefix').val(r.lstMarkVisit[0].prefix);
	$('#fName').val(r.lstMarkVisit[0].fName);
	$('#mName').val(r.lstMarkVisit[0].mName);
	$('#lName').val(r.lstMarkVisit[0].lName);
	$('#gender').val(r.lstMarkVisit[0].gender);
	$('#dob').val(r.lstMarkVisit[0].dob);
	$('#year').val(r.lstMarkVisit[0].age);
	$('#month').val(r.lstMarkVisit[0].ageMonths);
	$('#days').val(r.lstMarkVisit[0].ageDays);
  	$('#talukaId').val(r.lstMarkVisit[0].talukaId);//locality
	$('#townId').val(r.lstMarkVisit[0].twnId);
	$('#districtId').val(r.lstMarkVisit[0].districtId);//district
	$('#stateId').val(r.lstMarkVisit[0].stateId);
	$('#country').val(r.lstMarkVisit[0].countryId);
	$('#areaCode').val(r.lstMarkVisit[0].areaCode);
	$('#department').val(r.lstMarkVisit[0].deptId);
	$('#mobile').val(r.lstMarkVisit[0].mobile);
 	$('#token').val(r.lstMarkVisit[0].token);
  	$('#sourceType').val(r.lstMarkVisit[0].sourceTypeId);
	$('#sponsorCatId').val(r.lstMarkVisit[0].sponsorCatId);
 	$('#patientCatId').val(r.lstMarkVisit[0].patientCatId);
 	$('#patientId').val(r.lstMarkVisit[0].ptId);
 	$('#count').val(r.lstMarkVisit[0].count);
 	if(r.lstMarkVisit[0].caseType==1){
 		$("#chkHospital").prop('checked',true);
 	}else{
 		$("#chkPrivate").prop('checked',true);
  	}
  	getSponsorRecords("sourceid","slaveid");
	$('#sponsor_select').select2('val', r.lstMarkVisit[0].sponsorchargesSlaveId);  
	$("#refBy").val(r.lstMarkVisit[0].refdocid);
	$("#height").val(r.lstMarkVisit[0].height);
	$("#weight").val(r.lstMarkVisit[0].weight);
	$("#empid").val(r.lstMarkVisit[0].empid);
	$("#tpaid").val(r.lstMarkVisit[0].tpaid);
 	//$("#createdBy").text(r.lstMarkVisit[1].userNmae);
 	var regDate= new Date(r.lstMarkVisit[0].createdDateTime).toLocaleString();
    	if(r.lstMarkVisit[0].updatedBy!=null ){
  	var editedDate= new Date(r.lstMarkVisit[0].updatedDateTime).toLocaleString();	
    getUserNameByUserid(r.lstMarkVisit[0].updatedBy,"edit");
    $("#dateTime").text(editedDate);
 	}
 	$("#regDate").text(regDate);
  	getUserNameByUserid(r.lstMarkVisit[0].createdBy);
 	$("#adharcardNo").val(r.lstMarkVisit[0].adharcardNo);
 	var transSMS=r.lstMarkVisit[0].transSMS;
 	var transEmail=r.lstMarkVisit[0].transEmail;
	var pramoEmail=r.lstMarkVisit[0].pramoEmail;
	var pramoSMS=r.lstMarkVisit[0].pramoSMS;
	var external=r.lstMarkVisit[0].external;
	var emergency=r.lstMarkVisit[0].emergency;
 //alert("adhr-"+r.lstMarkVisit[0].adharcardNo+"tem-"+transEmail+"tsm-"+transSMS+"pem-"+pramoEmail+"psm-"+pramoSMS+"ext-"+external+"emr-"+emergency);
if(transSMS=="Y" || transEmail=="Y" ||pramoEmail=="Y" || pramoSMS=="Y" || emergency=="Y" || external=="Y"){
      	$('#transEmail').prop('checked',true);	
    	$('#transSMS').prop('checked',true);	
     	$('#pramoSMS').prop('checked', true);
     	$('#pramoEmail').prop('checked',true);
     	$('#external').prop('checked', true);
     	$('#emergency').prop('checked', true);
        
    }else{
    	$('#transSMS').prop('checked', false);
    	$('#transEmail').prop('checked', false);	
    	$('#pramoSMS').prop('checked', false);
     	$('#pramoEmail').prop('checked', false);
     	$('#emergency').prop('checked', false);
     	$('#external').prop('checked', false);

     }
	 
	var strVale = r.lstMarkVisit[0].drId;

	var strArr = strVale.split(',');
	
 	$('#doctorName').select2('val', strArr);
	
  	$('#tabs a[href="#account"]').tab('show');//to switch reg tags 
 
	 	if (clfrom == "view") {
  	 		$('#account').find('input, button, select').attr('disabled', 'disabled');//to disable all fields of reg page 
  	 	//	$('#s2id_doctorName').find('input, button, select').attr('disabled', 'disabled');//to disable all fields of reg page 
  	 		//$('button').prop('disabled', true);
	 		//$('#savebuton').find('input, button, select').attr('disabled','disabled');//to disable only personal tag of reg page 
	 		//$( "#savebuton" ).prop( "disabled", true );
	 		$( "#savebuton" ).button({disabled:true});
  	 		
	 		$(".btn-table-add-row").hide();
	 		$('select').select2("enable",false);
  	 		//$('#doctorName').attr('disabled', 'disabled');	
	 	
	 	}
	 	if (clfrom == "mark") {
	 	 		$('#queryType').val("markvisit");
 				$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 				

 	 			$('#personalDetails').find('input, button, select').attr('disabled','disabled');//to disable only personal tag of reg page
 	 			$(".btn-table-add-row").show();
 				//$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
 	 	}
	 	if (clfrom == "edit") {
 	 				$('#queryType').val("update");
	 				$('#account').find('input, button, select').removeAttr("disabled");//to remove disable attributes 
	 				//$('#department').find('input, button, select').attr('disabled','disabled');//to remove disable attributes 
	 				$('#treatmentId').val(r.lstMarkVisit[0].ttId);
	 			 	$('#billId').val(r.lstMarkVisit[0].billId);
	 			 	$(".btn-table-add-row").show();
 	 					} 
	 		 
}

/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion for Markvisit  
 ************/

function setAutoCompleteMarkVisit(inputId, callfrom) {
	
	//alert("hi");
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
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: false,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/autoSuggestionMarkVisit",
            timeout : 1000 * 60 * 15,
            cache 	: false,
            success : function(r) {
            	 
            	console.log(r);
               if(callfrom=="search"){
            	  //fetchVisitingPatient1();
            	  setTempMarkVisit(r);
            	   autoCompTableforMarkVisit(r, inputId);    
                }else{
                	autoCompTableforMarkVisit(r, inputId);
                }
             }
        });
    }
 
/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion Template for Markvisit  
 ************/
function autoCompTableforMarkVisit(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id

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
			valueField : 'fName'
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
					&& ui.item.fName != 'Match') {
			
				 
				$('#'+id).val(ui.item.fName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.lstRegviewDto.length);
			var result;
			if (!data || data.lstRegviewDto.length === 0 || !data.lstRegviewDto
					|| data.lstRegviewDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'fName' : 'Record',
					'ptId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.lstRegviewDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 
function commonFuntionForSearch(inputId, callfrom) {
	 
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#txtPName").val();
	}
     var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: false,
            type 	: "POST",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/markvisit/commonFuntionForSearch",
            timeout : 1000 * 60 * 15,
            cache 	: false,
            success : function(r) {
            	alert(r);
               if(callfrom=="search"){
            	   console.log(r);
             	    setTempMarkVisit(r);
                    autoCompTable(r, inputId);    
                }else{
                    autoCompTable(r, inputId);
                }
             }
        });
    }


/*******************************************************************************
 * @author Sagar Kadam
 * @date 12_July_2017
 * @Code Get all Patient records.
 ******************************************************************************/
function getAllPatient(r) {
	// alert("in js");
	var deptId = 1;
	 $("#depId").val(deptId);
	//alert(deptId);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		url : "ehat/registration/getAllRecordsForOPDque1",
		success : function(r) {
			
			$("#appointedpatientDiv").html(r);
			setTempPatientForOPDque1(r);

			 
			 
		}
	});
}
/*******************************************************************************
 * @author Sagar Kadam
 * @date 12_July_2017
 * @Code Template for fetching Patient data.
 ******************************************************************************/

function setTempPatientForOPDque1(r) {
	 
	var htm = '';
	var count = 0;
	var dept = "";
	dept = "OPD";
	var cnt=0;
	for ( var i = 0; i < r.listRegTreBillDto.length; i++) {
		var strVale = r.listRegTreBillDto[i].doctorId;
		var array = strVale.split(",");
		//alert(array.length+"drid"+array);

		var datetime= new Date(r.listRegTreBillDto[i].createdDateTime).toLocaleString();
		//var date=r.listRegTreBillDto[i].createdDateTime;
		
		htm = htm   + '<tr>'
			 
					+ '<td class="col-md-1-1 center" id="patientId'
					+ r.listRegTreBillDto[i].patientId + '">' + (i + 1)
					+ '</td>'

					+ '<td class="col-md-2-1 center" id="name'
					+ r.listRegTreBillDto[i].patientId + '">'
					+ (r.listRegTreBillDto[i].patientName) + ' </td>'

					+ '<td class="col-md-1-1 center" id="patientId'
					+ r.listRegTreBillDto[i].patientId + '">'
					+ (r.listRegTreBillDto[i].patientId) + '</td>'

					+ '<td class="col-md-1-1 center" id="mobile'
					+ r.listRegTreBillDto[i].patientId + '">'
					+ (r.listRegTreBillDto[i].mobile) + ' </td>'

					+ '<td class="col-md-1-1 center" id="AppDate'
					+ r.listRegTreBillDto[i].patientId + '">' + (datetime)
					+ ' </td>'

					+ '<td class="col-md-1-1 center" id="token'
					+ r.listRegTreBillDto[i].patientId + '">'
					+ (r.listRegTreBillDto[i].token) + ' </td>'
 
					+'<td class="col-md-1-1 center" id="departmentId'
					+ r.listRegTreBillDto[i].patientId
					+ '">'
					+ (dept)
					+ ' </td>';
 			
		if(array.length>1){
		htm = htm
					+ '<td class=" " style="padding:5px"><button style="font-size:12px" onclick="showDoctors('+i+');">'
					+ ' Show Doctors <i  style="font-size:15px;color:SteelBlue ;"  id="shBillView'+i+'" class="fa fa-chevron-circle-down" ></i></button>  <div id="'+i+'" class="box border" style="display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> ' + '<th width="505Px"> Doctor Name  </th> '
					+ ' <th> Select   </th>' + '</tr>';

						for ( var k in array) {
							
						for ( var g = 0; g < r.lstDoctorDto.length; g++) {
							
						if (array[k] == r.lstDoctorDto[g].doctor_ID) {

				htm = htm + '<tr><td>' + r.lstDoctorDto[g].doc_name
							+ '</td>' + '<td> <input type="radio" name="drname'+cnt+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ' + '</td> '
							+ '</tr> '
							+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
										}
									}
								}
				htm = htm + '</table> ' + '</div> </td> '

				+ "<td class='numeric'>"
				+ "<input style='font-size: 10px; width:95%' type='button' value='SEND' id='btnView"
				+ cnt
				+ "' onClick=sendTODoc("
				+ r.listRegTreBillDto[i].patientId
				+ ","
				+ cnt
				+ ") /></td> "

					+ "<td class='numeric '>"
				+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
				+ r.listRegTreBillDto[i].patientId
				+ ","
				+ cnt
				+ ") /></td> "
					 
				+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
				+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
				+ r.listRegTreBillDto[i].treatmentId
				+ ')" type="button"  ></button>' + '</td>'
				+ '</tr>';

		count++;
		cnt++;
		}else{
			htm = htm
			+ ' <td class=" " style="padding:5px"> '
			+ ' <div id="" > '
			+ ' <table > ' + '<tr> ' + '<th width="505Px">  </th> '
			+ ' <th width="505x"> </th>' + '</tr>';

				for ( var k in array) {
					
				for ( var g = 0; g < r.lstDoctorDto.length; g++) {
					
				if (array[k] == r.lstDoctorDto[g].doctor_ID) {

		htm = htm + '<tr><td width="70%">' + r.lstDoctorDto[g].doc_name
					+ '</td>' + '<td> <input type="radio" style="display:none" name="drname'+i+'"  value="'+r.lstDoctorDto[g].doctor_ID+'"checked="checked"> ' + '</td> '
					+ '</tr> '
					+ '<input type="hidden"  id="opddrid'+r.lstDoctorDto[g].doctor_ID+'" value="'+r.lstDoctorDto[g].doctor_ID+'"> ';
								}
							}
						}
		htm = htm + '</table> ' + '</div> </td> '
		

		+ "<td class='numeric'>"
		+ "<input style='font-size: 10px; width:95%' type='button' value='SEND' id='btnView"
		+ count
		+ "' onClick=sendTODoc("
		+ r.listRegTreBillDto[i].patientId
		+ ","
		+ cnt
		+ ") /></td> "

			+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
		+ r.listRegTreBillDto[i].patientId
		+ ","
		+ cnt
		+ ") /></td> "
			 
		+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
		+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
		+ r.listRegTreBillDto[i].treatmentId
		+ ')" type="button"  ></button>' + '</td>'
		+ '</tr>';

count++;
cnt++;
		}
			/*
					+ "<td class='numeric'>"
					+ "<input style='font-size: 10px; width:95%' type='button' value='SEND' id='btnView"
					+ count
					+ "' onClick=sendTODoc("
					+ r.listRegTreBillDto[i].patientId
					+ ","
					+ count
					+ ") /></td> "

 					+ "<td class='numeric '>"
					+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup("
					+ r.listRegTreBillDto[i].patientId
					+ ") /></td> "
 					 
					+ '<td class="col-md-1-1 center" style="height: 21.5px;" >'
					+ '<input id="btnBill2" style="font-size: 10px;" value="BILL" onclick="sendingToBill( '
					+ r.listRegTreBillDto[i].treatmentId
					+ ')" type="button"  ></button>' + '</td>'
					+ '</tr>';

			count++;
			cnt++;*/
		 
	}

	$("#container12").html(htm);

}

function showDoctors(count){
	
	//$("#"+count).toggle("toggle");
	
	$("#"+count).toggle('toggle');    
    var curClass=$("#shBillView"+count).attr('class');
    
    if(curClass=="fa fa-chevron-circle-up"){
        
        $("#shBillView"+count).removeClass('fa fa-chevron-circle-up');
        $("#shBillView"+count).addClass('fa fa-chevron-circle-down');
      //  $("#billText").text('Show Bill View');
        
    }else{
        
        $("#shBillView"+count).removeClass('fa fa-chevron-circle-down');
        $("#shBillView"+count).addClass('fa fa-chevron-circle-up');
       // $("#billText").text('Show Receipt View');        
    }    
}
 
/*******************************************************************************
 * @author Sagar kadam
 * @date 14-july_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function AutosuggestionForOPDque1(inputId,callfrom) {
	
	var deptId=1;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		
	var sridname = $("#sridname").val();
      if(sridname=='N'){
    	  usertype=sridname; 
    	  letter=$("#byName").val();
    	  
      }else{
    	  letter=$("#byId").val();
    	  usertype=sridname; 
    	  
      }
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
  ///   inputs.push('callfrom=' + callfrom);
        
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllRecordsDeptwiseWithAuto",
	success : function(r) {
		//setTempPatientRecords(r);

		$("#OPDPatientList").html(r);
		 
			setTempPatientForOPDque1(r);
			AllPatientRecordsAutosuggestioTemp(r,inputId);
		
	}
});}


/************
* @author	: Sagar Kadam
* @date		: 14-july-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function  AutosuggestionForOPDque1Temp(response, id) {
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
			}
			/*
			 * This function use for Enter keypress search
			 */
			 
 			AutosuggestionForOPDque1(id,'search');
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


/*******************************************************************************
 * @author : Sagar Kadam
 * @date : 9-jun-2017
 * @reason : to get doctor name from db
 ******************************************************************************/ 
function getDoctorname22(drid) {
	//alert("hi");
	var strVale = drid;
	
	var strArr = strVale.split(',');
	for(var i=0; i<strArr.length; i++) 
	{ strArr[i] = parseInt(strArr[i], 10);
	
	drid=strArr[i];}
	 
	var docName="";
 	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		 "drid" : drid,
 			},
		url 	: "ehat/markvisit/getDoctorName",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
 		},
		success : function(r) {
			ajaxResponse = r;
			 
			$("#dynamicItem2").select2(r.lstDoctorDto[0].doc_name);
			 
		}
	});
	return docName;
}
 
function clerpi(){
	
	$("#byId").val("");
	$("#sridname").val("N");
	
}
function clerpn(){
	
	$("#byName").val("");
	$("#sridname").val("Y");
	
}
function accurate(){
	if($("#byid").is(':checked')){
		$("#byName").val("");
		$('#byName').attr('onkeyup','return validateNumbers(event)');
		$("#byName").attr("placeholder", "Patient Id");
	}else{
		$("#byName").val("");
		$('#byName').removeAttr('onkeyup','return validateNumbers(event)');
		$("#byName").attr("placeholder", "Name, Mobileno , Adharno");
	}
	
	
	
	
}
