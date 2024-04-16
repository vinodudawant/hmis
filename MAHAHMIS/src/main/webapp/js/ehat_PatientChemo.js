/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	: Save Patient Chemotherapy
 ***********/ 
function savePatientChemotherapy(callfrom)
{
	 var chemoDate = $("#chemoDate").val();
	    if(chemoDate==""){
	        alert("Please Select Chemo Date!");        
	        return false;
	    }
	    var chemoId = $("#chemoId").val();
	    var patchemoName = $("#iChemotherapyName").val();
	    var patindication = $("#iIndication").val();
	    var patweight = $("#iWeight").val();
	    var patheight = $("#iHeight").val();
	    var patbsa = $("#iBSA").val();
	    var patbloodOrders = $("#iBloodOrders").val();
	    var patallergies = $("#iAllergies").val();
	    var pathistory = $("#iHistory").val();
	    var patfrequency = $("#iFrequency").val();
	    var patnumberOfCycles = $("#iNumberOfCycles").val();
	    var patdose = $("#iDose").val();
	    var patinvestigation = $("#iInvestigation").val();
	    var patdrugOrder = $("#iDrugOrder").val();
	    var patpostMedications = $("#iPostMedications").val();
	    var patpostChemoAdvice = $("#iPostChemoAdvice").val();
	    var patnextBloodDate = $("#nextBloodDate").val();
	    var patnextChemoDate = $("#nextChemoDate").val();
	    var patnextVisitDate = $("#nextVisitDate").val();
	    var patientId = $("#pt_Id").val();
		var treatmentId = $("#tr_Id").val();
	    
	    if(patchemoName == "" || patchemoName == undefined){
	        alert("Please Insert Chemotherapy Name!");
	        return false;
	    }
	    
	    var patChemoDetails={lstPatChemodetails : []};
	    
	    patChemoDetails.lstPatChemodetails.push({
	    	chemoDt : chemoDate,
	    	pChemoId:chemoId,
	    	chemoName : patchemoName,
	    	chemoIndication : patindication,
	    	patWeight : patweight,
	    	patHeight : patheight,
	    	patBsa : patbsa,
	    	patBlodOrd : patbloodOrders,
	    	patAllergies : patallergies,
	    	patHistory : pathistory,
	    	patFreq : patfrequency,
	    	noOfCycle : patnumberOfCycles,
	    	patDose : patdose,
	    	patInvest : patinvestigation,
	    	chemoOrders : patdrugOrder,
	    	postMed : patpostMedications,
	    	chemoAdvice : patpostChemoAdvice,
	    	nextBldDt : patnextBloodDate,
	    	nxtChemoDt : patnextChemoDate,
	    	nxtVisDt : patnextVisitDate,
	    	patId	: patientId,
	    	treatId	: treatmentId,
	    	
	    });
	    
	    patChemoDetails = JSON.stringify(patChemoDetails);
	    
	  var inputs = [];
		inputs.push('patChemoDetails=' + patChemoDetails);
		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			url : "ehat/patientChemo/savePatientChemo",
			data	: str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r == 1){
					alertify.success("Records Saved Sucessfully");
					$("#chemoAuto").val("");
				}else{
					alertify.success("Records Updated Sucessfully");
					$("#chemoAuto").val("");
				}
			}
		});	
	}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Clear Chemotherapy fields
 ***********/ 
function allSetNew(){
	$("#iChemotherapyName").val("");
	$("#iIndication").val("");
	$("#iWeight").val("");
	$("#iHeight").val("");
	$("#iBSA").val("");
	$("#iBloodOrders").val("");
	$("#iAllergies").val("");
	$("#iHistory").val("");
	$("#iFrequency").val("");
	$("#iDose").val("");
	$("#iNumberOfCycles").val("");
	$("#iInvestigation").val("");
	$("#iDoseModification").val("");
	$("#iSideEffect").val("");
	$("#iDrugOrder").val("");
	$("#iPostChemoDrugOrder").val("");
	$("#iPreMedications").val("");
	$("#iPostMedications").val("");
	$("#iPostChemoAdvice").val("");
	$("#chemoId").val(0);
	$("#chemId").val(0);
}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Fetch Patient Chemotherapy
 ***********/ 
function fetchChemotherapyPatientDataMaster(Type){
	var tId ="";
	var pId ="";
	var date ="";
	var type = Type.split("_");
	if(type[0] == "DataForPopUp"){
		tId = $("#tr_Id").val();
		pId = $("#pt_Id").val();
		date = $("#PopUpChemoDate_"+type[1]).html();
		Type = "date";
		historyChemotherapyHide();
	}else{
	 tId = $("#tr_Id").val();
	 pId = $("#pt_Id").val();
	 date = $("#chemoDate").val();
	}
	var inputs = [];
	inputs.push('patId=' + pId);
	inputs.push('treatId=' + tId);
	inputs.push('chemoDt=' + date);
	inputs.push('Type=' + Type);
	inputs.push('callFrom=' + Type);
	var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/patientChemo/getPatientChemo",
			error : function() {
				alert('error');
			},
			success : function(r) {
				var ajaxResponse = r;
				if (ajaxResponse != "") {
					$("#chemoId").val(ajaxResponse[0].pChemoId);
					$("#iChemotherapyName").val(ajaxResponse[0].chemoName);$("#iIndication").val(ajaxResponse[0].chemoIndication);
					$("#iWeight").val(ajaxResponse[0].patWeight);$("#iHeight").val(ajaxResponse[0].patHeight);
					$("#iBSA").val(ajaxResponse[0].patBsa);$("#iBloodOrders").val(ajaxResponse[0].patBlodOrd);
					$("#iAllergies").val(ajaxResponse[0].patAllergies);$("#iHistory").val(ajaxResponse[0].patHistory);
					$("#iFrequency").val(ajaxResponse[0].patFreq);$("#iNumberOfCycles").val(ajaxResponse[0].noOfCycle);
					$("#iDose").val(ajaxResponse[0].patDose);$("#iInvestigation").val(ajaxResponse[0].patInvest);
					$("#iDrugOrder").val(ajaxResponse[0].chemoOrders);
					$("#iPostMedications").val(ajaxResponse[0].postMed);
					$("#iPostChemoAdvice").val(ajaxResponse[0].chemoAdvice);
					$("#nextBloodDate").val(ajaxResponse[0].nextBldDt);
					$("#nextChemoDate").val(ajaxResponse[0].nxtChemoDt);
					$("#nextVisitDate").val(ajaxResponse[0].nxtVisDt);
					$("#chemoDate").val(date);
				}else{
					alertify.error("No Data Available For Chemotherapy!");
					//alert("No Data Available For Chemotherapy!");
					allSetNew();
				}
			}
		});
}


/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Save Patient Care Advices
 ***********/ 
function saveCareAdvices()
{
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var CareAdviceId =0; 
	if(($('#idHidddenSupportiveAdvice').val())!=0){
	CareAdviceId = $('#idHidddenSupportiveAdvice').val();
}
	var PallCare = $('#idPalliativeAdvice').val();
	var SuppCare = $('#idSupportiveAdvice').val();
	var PrevCare = $('#idPreventiveAdvice').val();
	var RehabCare = $('#idRehabilitativeAdvice').val();
	var OtherServices = $('#idOtherServices').val();
	var patCareAdvDetails={ lstPatCareAdvicedetails : [] };
	    
	    patCareAdvDetails.lstPatCareAdvicedetails.push({
	    	careAdviceId : CareAdviceId,
	    	patId : patId,
	    	treatId :treatId,
	    	pallCare : PallCare,
	    	suppCare : SuppCare,
	    	prevCare : PrevCare,
	    	rehabCare : RehabCare,
	    	otherServ : OtherServices,
	    	
	    });
	    
	   patCareAdvDetails = JSON.stringify(patCareAdvDetails);
	    
	  var inputs = [];
		inputs.push('patCareAdvDetails=' + patCareAdvDetails);
		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			url : "ehat/patientChemo/savePatientAdvices",
			data	: str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r == 1){
					alertify.success("Records Saved Sucessfully");
				}else{
					alertify.success("Records Updated Sucessfully");
				}
				fetchCareAdvices("Care");
			}
		});	
	}
/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	: fetch Patient Care Advices
 ***********/ 
function fetchCareAdvices(Type){
	var tId = $("#tr_Id").val();
	var inputs = [];
	inputs.push('treatId=' + tId);
	var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/patientChemo/getPatientCareAdvices",
			error : function() {
				alert('error');
			},
			success : function(r) {
				var ajaxResponse = r;
				if (ajaxResponse != null) {
					$("#idHidddenSupportiveAdvice").val(ajaxResponse[0].careAdviceId);
					$("#idPalliativeAdvice").val(ajaxResponse[0].pallCare);
					$("#idSupportiveAdvice").val(ajaxResponse[0].suppCare);
					$("#idPreventiveAdvice").val(ajaxResponse[0].prevCare);
					$("#idRehabilitativeAdvice").val(ajaxResponse[0].rehabCare);
					$("#idOtherServices").val(ajaxResponse[0].otherServ);
				}else{
					alert("No Data Available For Care Advice!");
				}
			}
		});
}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	: Autosuggesion for Chemo Protocol
 ***********/ 
function getChemoProtocol(inputId, callfrom) {
    var letter="";
    letter=$("#chemoAuto").val();
	//alert("letter"+letter);
     var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async    : false,
            type     : "POST",
            data     : str + "&reqType=AJAX",
            url     : "ehat/patientChemo/getAutoChemoProtocol",
            timeout : 1000 * 60 * 15,
            cache     : false,
            success : function(r) {
                 console.log(r);
                 var jsonConvertedData = JSON.stringify(r);
     			 $("#chemotherapyDetails").html(jsonConvertedData);
                 autoCompTable(r, inputId);    
                
           }
        });
    }

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	: Set Table for Chemo Protocol Autosuggesion
 ***********/ 
function autoCompTable(response, id) {

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
            name : 'Chemo Name',
            width : '100px',
            valueField : 'chemoTheropyName'
        } ],

        // Event handler for when a list item is selected.
        select : function(event, ui) {
            console.log(ui);
            
            var spl = (ui.item.spl = "" ? '' : ui.item.spl);
            if (ui.item.dn != 'No' && ui.item.spl != 'Record'
                    && ui.item.specialisationName != 'Found'
                    && ui.item.chemoTheropyName != 'Match') {
            if(ui.item.fName != 'No Record'){
            	$('#chemoAuto').val(ui.item.chemoTheropyName);
            
            }
            }
            /*
             * This function use for Enter keypress search
             */
           
            //$("#mrnNo").val(101);
            return false;
        },

        // The rest of the options are for configuring the ajax
        // webservice call.
        minLength : 1,
        source : function(request, response) {
            var data = myArray;
            console.log(data);
            console.log(data.lstChemoProto.length);
            var result;
            if (!data || data.lstChemoProto.length === 0 || !data.lstChemoProto
                    || data.lstChemoProto.length === 0) {
                /*
                 * result = [{ label: 'No match found.' }];
                 */
                result = [ {
                    /* 'dn' : 'No', */
                    'chemoAuto' : 'No Record',
                /* 'depNm' : 'Match' */
                } ];
            } else {
                result = data.lstChemoProto;// Response List for All
                // Services
            }
            response(result);
            $('#ui-id-1').css("z-index", "10000000000");
        }
    });
}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	: Assign Chemotherapy Master data
 ***********/ 
function addChemoToAssignOnAuto(Type){
   //alert("HIIIIII");
    var ajaxResponse = $("#chemotherapyDetails").html();
    var myArray = JSON.parse(ajaxResponse);
  
    if (myArray.lstChemoProto.length != 0) {
    	//$("#chemoId").val(myArray.lstChemoProto[0].chemotheropyId);
    	$("#iChemotherapyName").val(myArray.lstChemoProto[0].chemoTheropyName);
		$("#iIndication").val(myArray.lstChemoProto[0].indication);
		$("#iWeight").val(myArray.lstChemoProto[0].weight);$("#iHeight").val(myArray.lstChemoProto[0].height);
		$("#iBSA").val(myArray.lstChemoProto[0].bsa);$("#iBloodOrders").val(myArray.lstChemoProto[0].bloodOrders);
		$("#iAllergies").val(myArray.lstChemoProto[0].allergies);$("#iHistory").val(myArray.lstChemoProto[0].history);
		$("#iFrequency").val(myArray.lstChemoProto[0].frequency);$("#iNumberOfCycles").val(myArray.lstChemoProto[0].noOfCycle);
		$("#iDose").val(myArray.lstChemoProto[0].dose);$("#iInvestigation").val(myArray.lstChemoProto[0].investigation);
		$("#iDrugOrder").val(myArray.lstChemoProto[0].drugOrders);
		$("#iPostMedications").val(myArray.lstChemoProto[0].postMedication);
		$("#iPostChemoAdvice").val(myArray.lstChemoProto[0].advice);
		$("#nextBloodDate").val(ajaxResponse[0].nextBldDt);
		$("#nextChemoDate").val(ajaxResponse[0].nxtChemoDt);
		$("#nextVisitDate").val(ajaxResponse[0].nxtVisDt);
	}

}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Template For Transaction Chemo Order Sheet
 ***********/ 
function setTimeOrderSheet(id){
    $('#'+id).datetimepicker({
         datepicker:false,
         format:'H:i',
         step:15
         });
}
var AssignChemoOrderSheetTemp ="<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='' style='height: 21.5px; width: 3.05%;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-4-1 center' style='height: 21.5px;'><div class='TextFont'>Chemo Protocol</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Start Time</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Stop Time</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sign</div></th>"
	+ "<th class='col-md-4-1 center' style='height: 21.5px;'><div class='TextFont'>Remark</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; height: 425px; max-height: auto;'>"
	+ "<table class='table table-condensed table-bordered table-stripped cf' style='width : 100%;'>"
	+ "<tbody id='OrderDiv'>"
	+ "{#foreach $T.lstPatChemoOrderSheetdetials as lpcosd}"
	+ "<tr id='divD{count}' value='{$T.lpcosd.patOrderId}'>"
	+ "<td  style='height: 21.5px;  width: 3.05%; '>{count}.</td>"
	+ "<td  class='col-sm-4-1' style='height: 21.5px; '>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='' id='drugOrder{count}' value='{$T.lpcosd.chemoOrders}' readonly='readonly' /></td>"
	+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
	+ "<input class='form-control input-SmallText TextFont' name='sttime' id='sttime{count}' value='{$T.lpcosd.startTime}' onclick='setTimeOrderSheet(this.id)' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input class='form-control input-SmallText TextFont' name='sptime' id='sptime{count}' value='{$T.lpcosd.stopTime}' onclick='setTimeOrderSheet(this.id)' /></td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='staffName' id='staffName{count}' value='{$T.lpcosd.signPat}' /></td>"
	+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='Notes' id='Notes{count}' value='{$T.lpcosd.noteDose}' /></td>"
	+ "<input type='hidden' class='form-control input-SmallText TextFont' name='test' id='test{count}' value='{$T.lpcosd.patOrderId}' /></td>"
	+ "</tr>"
	+ "<input type='hidden' value='{count++}' id='drlcnt' />"
	+ "<input type='hidden' value='' id='nid{rowCount}' />"
	+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
	+ "{#/for} "
	+ "<input type='hidden' value='' id='addChemoOrderRowCount' />"
	+ "<input type='hidden' value='{--count}' id='drlRowCount' />"
	+ "<input type='hidden' class='form-control input-SmallText TextFont' name='pid' value='{$T.lpcosd.patId}' /></td>"
	+ "</tbody>" + "</table>" + "</div>";

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Save Chemo Order Sheet from Doctor Desk
 ***********/ 
function savePatientOrderSheet(callFrom)
{
	 var chemoDate = $("#chemoDate").val();
	    if(chemoDate==""){
	        alert("Please Select Chemo Date!");        
	        return false;
	    }
	    var orderSheetId = $("#orderSheet").val();
	    var patdrugOrder = $("#iDrugOrder").val();
	    var patientId = $("#pt_Id").val();
		var treatmentId = $("#tr_Id").val();
	    
	    var patOrderSheetDetails={lstPatChemoOrderSheetdetials : []};
	    
	    patOrderSheetDetails.lstPatChemoOrderSheetdetials.push({
		    	chemoDt : chemoDate,
		    	chemoOrders : patdrugOrder,
		    	patId	: patientId,
		    	treatId	: treatmentId,
		    	patOrderId : orderSheetId
		    	
		    });
	    patOrderSheetDetails = JSON.stringify(patOrderSheetDetails);
	    
	  var inputs = [];
		inputs.push('patOrderSheetDetails=' + patOrderSheetDetails);
		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			url : "ehat/patientChemo/savePatientOrderSheet",
			data	: str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				/*if(response == 1){
					alertify.success("Records Saved Sucessfully");
				}else{
					alertify.success("Records Updated Sucessfully");
				}*/
			}
		});	
	}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Fetch Chemo Order Sheet
 ***********/ 
function fetchOrderSheet(callFrom){
	//alert("hii");
	var tId = $("#tr_Id").val();
	var pId = $("#pt_Id").val();
	var date = $("#date-pickForChemo").val();
	var inputs = [];
	inputs.push('patId=' + pId);
	inputs.push('treatId=' + tId);
	inputs.push('chemoDt=' + date);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/patientChemo/getChemoOrderSheet",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#ChemoOrderSheetContent").empty();
			count = 1;
			$("#ChemoOrderSheetContent").setTemplate(AssignChemoOrderSheetTemp);
			$("#ChemoOrderSheetContent").processTemplate(r);
		}
	});
	
}

/************
 *@author	:  Pooja Sukre
 *@date		:  6-Mar-2018
 *@codeFor	:  Update Chemo Order Sheet
 ***********/ 
function ChemoOrderSheetSave(){
	var rowCount = $("#drlRowCount").val();
	//var pid = $("#pid").html();
	var tid = $("#treatmentId").html();
	var datePickForChemo = $("#date-pickForChemo").val();
	if (rowCount == 0) {
		return false;
	} else {
		var OrderString = "";
		if (rowCount != 0) {

			for (var i = 1; i <= rowCount; i++) {
					var assignId = $("#test" + i + "").val();
					var drugOrder = $("#drugOrder" + i + "").val();
					var sttime = $("#sttime" + i + "").val();
					var sptime = $("#sptime" + i + "").val();
					var staffName = $("#staffName" + i + "").val();
					var Notes = $("#Notes" + i + "").val();

					if (sttime == undefined || sttime == "") {
						sttime = "00:00";
					} 
					if (sptime == undefined || sptime == "") {
						sptime = "00:00";
					}
					if (staffName == undefined || staffName == "") {
						staffName = "-";
					}
					if (Notes == undefined || Notes == "") {
						Notes = "-";
					}
						OrderString = OrderString + assignId + "_" + drugOrder + "_" + sttime
								+ "_" + sptime + "_" + staffName + "_" + Notes + "@";
			}
		}
	
		var inputs = [];
		inputs.push('treatId=' + tid);
		inputs.push('chemoDt=' + datePickForChemo);
		inputs.push('OrderString=' + OrderString);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/patientChemo/updateChemoOrderSheet",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r == 0){
					alertify.success("Records Updated Sucessfully");
				}
				
			}
		});
	}
}
function checkDateStatus() {
	var datePickForChemo = $("#chemoDate").val();
	if (datePickForChemo == "") {
		alertify.success("Select Date First!!!");
		return false;
	}
}
